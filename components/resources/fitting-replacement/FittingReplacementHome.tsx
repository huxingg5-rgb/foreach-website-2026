"use client";

/* =========================================================
   FittingReplacementHome.tsx
   恒永达官网｜接头替代查询首页组件

   文件路径：
   components/resources/fitting-replacement/FittingReplacementHome.tsx

   作用：
   1. 展示接头替代查询首页
   2. 支持“产品替换表 / 接头选型指引”Tab 结构
   3. 支持竞品编码 / 商品编码 / 恒永达型号搜索
   4. 支持最近搜索按钮
   5. 默认产品列表每页显示 8 个，避免一次性加载太多图片
   6. 点击“查看详情”后，新标签页打开独立详情页
   7. 搜索到结果后，新标签页打开独立详情页
   8. 首页加入清单后，写入全局选型清单
   9. 产品卡片使用公共组件 ProductBasicCard
   10. 型号解析逻辑已抽离到 fittingReplacementModelParser.ts
   11. Q20 路径、清单来源、产品名称统一从系列配置读取

   注意：
   1. 这个文件是首页组件，不是详情页组件
   2. 详情页样式不在这里改
   3. 后续 Q40 / Q60 只需要扩展系列配置与数据
========================================================= */
import { Breadcrumb } from "@/components/common/breadcrumb";

import { useMemo, useState } from "react";

import { ProductBasicCard } from "@/components/common/product-card";
import { useSelectionCart } from "@/components/selection-cart/SelectionCartProvider";

import type {
  FittingReplacementPageData,
  FittingReplacementProduct,
} from "@/data/resources/fitting-replacement/fitting-replacement.types";

import {
  Q20_FITTING_REPLACEMENT_SERIES_CONFIG,
  getFittingReplacementDetailHref,
} from "@/data/resources/fitting-replacement/fitting-replacement-series.config";

import {
  getFittingProductDisplayName,
  parseFittingModelWithRules,
} from "@/services/resources/fitting-replacement/fittingReplacementModelParser";

import FittingReplacementGuide from "./FittingReplacementGuide";

/* 当前页面暂时使用 Q20 系列配置 */
const SERIES_CONFIG = Q20_FITTING_REPLACEMENT_SERIES_CONFIG;

/* 每页显示 8 个产品，4 列布局时刚好两行 */
const PAGE_SIZE = 8;

/* 最近搜索按钮，后续可以改成真实搜索历史 */
const QUICK_SEARCH_ITEMS = [
  "A0018",
  "B0007",
  "C0007",
  "839085",
  "Q2001-PMV-SPPE",
];

interface FittingReplacementHomeProps {
  data: FittingReplacementPageData;
}

type ActiveTab = "replace" | "guide";

/* =========================================================
   统一搜索关键词
========================================================= */
function normalizeKeyword(value: string) {
  return value.trim().toUpperCase();
}

/* =========================================================
   生成详情页链接

   说明：
   1. 详情页路径不再写死 q20
   2. 统一从系列配置生成
========================================================= */
function getDetailHref(product: FittingReplacementProduct) {
  return getFittingReplacementDetailHref(
    product.productCode,
    SERIES_CONFIG.seriesKey
  );
}

/* =========================================================
   新标签页打开详情页
========================================================= */
function openDetailInNewTab(product: FittingReplacementProduct) {
  window.open(getDetailHref(product), "_blank", "noopener,noreferrer");
}

/* =========================================================
   首页组件
========================================================= */
export default function FittingReplacementHome({
  data,
}: FittingReplacementHomeProps) {
  const [activeTab, setActiveTab] = useState<ActiveTab>("replace");
  const [searchValue, setSearchValue] = useState("");
  const [hasSubmittedSearch, setHasSubmittedSearch] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const { addItem, getItem } = useSelectionCart();

  /* =========================================================
     首页面包屑显示层清理
  ========================================================= */
  const normalizedBreadcrumbs = useMemo(() => {
    return data.breadcrumbs
      .filter((item) => {
        return item.label !== "选型支持";
      })
      .map((item) => {
        if (item.label === "接头型号替代查询") {
          return {
            ...item,
            label: SERIES_CONFIG.sourceLabel,
            href: SERIES_CONFIG.homeHref,
          };
        }

        return item;
      });
  }, [data.breadcrumbs]);

  /* =========================================================
     根据关键词查找产品

     支持：
     1. 商品编码
     2. 恒永达型号
     3. 竞品 / 兼容编码
  ========================================================= */
  function findProductByKeyword(keyword: string) {
    const normalizedKeyword = normalizeKeyword(keyword);

    if (!normalizedKeyword) {
      return null;
    }

    return (
      data.products.find((product) => {
        const productCode = normalizeKeyword(product.productCode);
        const foreachModel = normalizeKeyword(product.foreachModel);
        const competitorModels = product.competitorModels.map((model) => {
          return normalizeKeyword(model);
        });

        return (
          productCode === normalizedKeyword ||
          foreachModel === normalizedKeyword ||
          competitorModels.includes(normalizedKeyword)
        );
      }) || null
    );
  }

  /* =========================================================
     默认首页卡片
  ========================================================= */
  const homeProducts = useMemo(() => {
    return data.products.filter((product) => {
      return product.showOnHome;
    });
  }, [data.products]);

  /* =========================================================
     首页分页
  ========================================================= */
  const totalPages = Math.max(1, Math.ceil(homeProducts.length / PAGE_SIZE));

  const paginatedHomeProducts = useMemo(() => {
    const safeCurrentPage = Math.min(currentPage, totalPages);
    const startIndex = (safeCurrentPage - 1) * PAGE_SIZE;
    const endIndex = startIndex + PAGE_SIZE;

    return homeProducts.slice(startIndex, endIndex);
  }, [homeProducts, currentPage, totalPages]);

  /* =========================================================
     当前搜索结果
  ========================================================= */
  const searchResult = useMemo(() => {
    return findProductByKeyword(searchValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.products, searchValue]);

  function handleOpenDetail(product: FittingReplacementProduct) {
    openDetailInNewTab(product);
  }

  function handleSubmitSearch() {
    const keyword = searchValue.trim();

    if (!keyword) {
      setHasSubmittedSearch(false);
      return;
    }

    setHasSubmittedSearch(true);

    if (searchResult) {
      openDetailInNewTab(searchResult);
    }
  }

  function handleQuickSearch(value: string) {
    const matchedProduct = findProductByKeyword(value);

    setActiveTab("replace");
    setSearchValue(value);
    setHasSubmittedSearch(true);

    if (matchedProduct) {
      openDetailInNewTab(matchedProduct);
    }
  }

  /* =========================================================
     加入全局选型清单

     说明：
     1. sourceType / sourceLabel / productName 不再写死
     2. 统一从系列配置读取
  ========================================================= */
  function handleAddToCart(product: FittingReplacementProduct) {
    const parsedFields = parseFittingModelWithRules(
      product.foreachModel,
      data.modelRules
    );

    addItem({
      sourceType: SERIES_CONFIG.sourceType,
      sourceLabel: SERIES_CONFIG.sourceLabel,
      productName: getFittingProductDisplayName(
        parsedFields,
        SERIES_CONFIG.productName
      ),
      productCode: product.productCode,
      foreachModel: product.foreachModel,
      competitorModels: product.competitorModels,
      quantity: 1,
      needDrawing: false,
      imagePath: product.imagePath,
      detailHref: getDetailHref(product),
    });
  }

  return (
    <div className="fitting-replacement-page">
      <section className="frp-hero">
        <div className="frp-container frp-hero-inner">
          <div>
            <h1 className="frp-hero-title">{data.banner.title}</h1>
            <p className="frp-hero-desc">{data.banner.description}</p>
          </div>
        </div>
      </section>

      <main className="frp-main">
        <div className="frp-container">

          {/* ================================
    面包屑
================================ */}
          <Breadcrumb items={normalizedBreadcrumbs} />

          <div className="frp-tab-bar">
            <button
              className={`frp-tab-button ${activeTab === "replace" ? "active" : ""
                }`}
              type="button"
              onClick={() => {
                setActiveTab("replace");
              }}
            >
              产品替换表
            </button>

            <button
              className={`frp-tab-button ${activeTab === "guide" ? "active" : ""
                }`}
              type="button"
              onClick={() => {
                setActiveTab("guide");
                setSearchValue("");
                setHasSubmittedSearch(false);
              }}
            >
              接头选型指引
            </button>
          </div>
        </div>

        {activeTab === "replace" && (
          <>
            <section className="frp-search-panel">
              <div className="frp-search-row">
                <input
                  className="frp-search-input"
                  value={searchValue}
                  placeholder={data.search.placeholder}
                  onChange={(event) => {
                    setSearchValue(event.target.value);
                    setHasSubmittedSearch(false);
                  }}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      event.preventDefault();
                      handleSubmitSearch();
                    }
                  }}
                />

                <button
                  className="frp-search-button"
                  type="button"
                  onClick={handleSubmitSearch}
                >
                  {data.search.buttonText}
                </button>
              </div>

              <div className="frp-history-row">
                <span className="frp-history-label">最近搜索</span>

                {QUICK_SEARCH_ITEMS.map((item) => {
                  return (
                    <button
                      className={`frp-history-button ${normalizeKeyword(searchValue) === normalizeKeyword(item)
                          ? "active"
                          : ""
                        }`}
                      type="button"
                      key={item}
                      onClick={() => {
                        handleQuickSearch(item);
                      }}
                    >
                      {item}
                    </button>
                  );
                })}
              </div>
            </section>

            <div className="frp-container">
              {hasSubmittedSearch && searchValue && !searchResult ? (
                <section className="frp-empty-result">
                  <strong>暂未找到对应型号</strong>
                  <p>
                    可以提交现用型号、BOM、图纸或样品照片，由工程师进一步确认。
                  </p>
                </section>
              ) : (
                <section className="frp-card-section">
                  <div className="frp-section-head">
                    <div>
                      <h2>产品替换表</h2>
                      <p>可直接查看对应型号，也可以先加入选型清单。</p>
                    </div>

                    <span>
                      当前展示 {(currentPage - 1) * PAGE_SIZE + 1}–
                      {Math.min(currentPage * PAGE_SIZE, homeProducts.length)} /
                      共 {homeProducts.length} 个型号
                    </span>
                  </div>

                  <div className="frp-card-grid">
                    {paginatedHomeProducts.map((product) => {
                      const parsedFields = parseFittingModelWithRules(
                        product.foreachModel,
                        data.modelRules
                      );

                      const currentCartItem = getItem(
                        SERIES_CONFIG.sourceType,
                        product.productCode
                      );

                      return (
                        <ProductBasicCard
                          key={product.productCode}
                          title={getFittingProductDisplayName(
                            parsedFields,
                            SERIES_CONFIG.productName
                          )}
                          imageSrc={product.imagePath}
                          imageAlt={product.foreachModel}
                          metaItems={[
                            {
                              label: "商品编码：",
                              value: product.productCode,
                            },
                            {
                              label: "恒永达型号：",
                              value: product.foreachModel,
                            },
                            {
                              label: "兼容编码：",
                              value: product.competitorModels.join(" / ") || "-",
                            },
                          ]}
                          actions={[
                            {
                              label: "查看详情",
                              onClick: () => {
                                handleOpenDetail(product);
                              },
                            },
                            {
                              label: currentCartItem
                                ? "已加入清单"
                                : "加入清单",
                              isActive: Boolean(currentCartItem),
                              onClick: () => {
                                handleAddToCart(product);
                              },
                            },
                          ]}
                        />
                      );
                    })}
                  </div>

                  {totalPages > 1 && (
                    <div className="frp-pagination">
                      <button
                        type="button"
                        disabled={currentPage === 1}
                        onClick={() => {
                          setCurrentPage((prev) => {
                            return Math.max(1, prev - 1);
                          });
                        }}
                      >
                        上一页
                      </button>

                      <span>
                        {currentPage} / {totalPages}
                      </span>

                      <button
                        type="button"
                        disabled={currentPage === totalPages}
                        onClick={() => {
                          setCurrentPage((prev) => {
                            return Math.min(totalPages, prev + 1);
                          });
                        }}
                      >
                        下一页
                      </button>
                    </div>
                  )}
                </section>
              )}
            </div>
          </>
        )}

        {activeTab === "guide" && <FittingReplacementGuide data={data} />}
      </main>
    </div>
  );
} 