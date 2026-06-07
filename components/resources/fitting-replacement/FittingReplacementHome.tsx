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
   10. 面包屑使用公共组件 Breadcrumb
   11. 首页界面文案从 data.homeText 读取，支持多语言
   12. 详情页链接根据当前语言生成，避免外语页面跳回中文详情页
   13. Q20 路径、清单来源、产品名称统一从系列配置读取

   注意：
   1. 这个文件是首页组件，不是详情页组件
   2. 详情页样式不在这里改
   3. 后续 Q40 / Q60 只需要扩展系列配置与数据
========================================================= */

import { useMemo, useState } from "react";

import { Breadcrumb } from "@/components/common/breadcrumb";
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
   从面包屑判断当前语言

   说明：
   1. 中文页面返回 zh
   2. 外语页面返回 en / es / fr / ko / ru
   3. 用于生成详情页链接，避免外语页面点击详情后跳回中文
========================================================= */
function getLocaleFromBreadcrumbs(
  breadcrumbs: FittingReplacementPageData["breadcrumbs"]
) {
  const localeHref = breadcrumbs.find((item) => {
    return (
      item.href?.startsWith("/en") ||
      item.href?.startsWith("/es") ||
      item.href?.startsWith("/fr") ||
      item.href?.startsWith("/ko") ||
      item.href?.startsWith("/ru")
    );
  })?.href;

  if (localeHref?.startsWith("/en")) return "en";
  if (localeHref?.startsWith("/es")) return "es";
  if (localeHref?.startsWith("/fr")) return "fr";
  if (localeHref?.startsWith("/ko")) return "ko";
  if (localeHref?.startsWith("/ru")) return "ru";

  return "zh";
}

/* =========================================================
   格式化模板文案

   示例：
   "Showing {start}–{end} of {total} models"
========================================================= */
function formatTemplate(
  template: string,
  values: Record<string, string | number>
) {
  return Object.entries(values).reduce((result, [key, value]) => {
    return result.replaceAll(`{${key}}`, String(value));
  }, template);
}

/* =========================================================
   首页卡片兼容编码显示

   说明：
   1. 首页卡片不展示全部兼容编码
   2. 避免竞品编码太长导致卡片变形
   3. 完整兼容编码在详情页展示
========================================================= */
function formatCompatibleModelsForCard(models: string[]) {
  if (models.length === 0) {
    return "-";
  }

  return models.join(" / ");
}

/* =========================================================
   生成详情页链接

   说明：
   1. 中文页面不加语言前缀
   2. 外语页面加 /en /es /fr /ko /ru 前缀
========================================================= */
function getDetailHref(
  product: FittingReplacementProduct,
  locale: string = "zh"
) {
  return getFittingReplacementDetailHref(
    product.productCode,
    SERIES_CONFIG.seriesKey,
    locale
  );
}

/* =========================================================
   新标签页打开详情页
========================================================= */
function openDetailInNewTab(
  product: FittingReplacementProduct,
  locale: string = "zh"
) {
  window.open(getDetailHref(product, locale), "_blank", "noopener,noreferrer");
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

  const { addItem, getItem, removeItem } = useSelectionCart();

  /* 首页多语言文案 */
  const homeText = data.homeText;

  /* 当前页面语言 */
  const pageLocale = useMemo(() => {
    return getLocaleFromBreadcrumbs(data.breadcrumbs);
  }, [data.breadcrumbs]);

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
    openDetailInNewTab(product, pageLocale);
  }

  function handleSubmitSearch() {
    const keyword = searchValue.trim();

    if (!keyword) {
      setHasSubmittedSearch(false);
      return;
    }

    setHasSubmittedSearch(true);

    if (searchResult) {
      openDetailInNewTab(searchResult, pageLocale);
    }
  }

  function handleQuickSearch(value: string) {
    const matchedProduct = findProductByKeyword(value);

    setActiveTab("replace");
    setSearchValue(value);
    setHasSubmittedSearch(true);
    setCurrentPage(1);

    if (matchedProduct) {
      openDetailInNewTab(matchedProduct, pageLocale);
    }
  }

  /* =========================================================
     加入全局选型清单

     说明：
     1. sourceType / sourceLabel 不再写死
     2. 产品名称优先使用当前语言 productCard.productName
     3. detailHref 根据当前语言生成
  ========================================================= */
  function handleAddToCart(product: FittingReplacementProduct) {
    addItem({
      sourceType: SERIES_CONFIG.sourceType,
      sourceLabel: SERIES_CONFIG.sourceLabel,
      productName:
        homeText?.productCard.productName ?? SERIES_CONFIG.productName,
      productCode: product.productCode,
      foreachModel: product.foreachModel,
      competitorModels: product.competitorModels,
      quantity: 1,
      needDrawing: false,
      imagePath: product.imagePath,
      detailHref: getDetailHref(product, pageLocale),
    });
  }

  /* =========================================================
     切换清单状态
  
     说明：
     1. 未加入清单时，点击加入清单
     2. 已加入清单时，点击取消加入清单
     3. 这样按钮不会只能加入，不能取消
  ========================================================= */
  function handleToggleCart(product: FittingReplacementProduct) {
    const currentCartItem = getItem(
      SERIES_CONFIG.sourceType,
      product.productCode
    );

    if (currentCartItem) {
      removeItem(currentCartItem.id);
      return;
    }

    handleAddToCart(product);
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

          {/* ================================
              Tab 按钮
          ================================ */}
          <div className="frp-tab-bar">
            <button
              className={`frp-tab-button ${activeTab === "replace" ? "active" : ""
                }`}
              type="button"
              onClick={() => {
                setActiveTab("replace");
              }}
            >
              {homeText?.tabs.replace ?? "产品替换表"}
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
              {homeText?.tabs.guide ?? "接头选型指引"}
            </button>
          </div>
        </div>

        {activeTab === "replace" && (
          <>
            {/* ================================
                搜索区
            ================================ */}
            <section className="frp-search-panel">
              <div className="frp-search-row">
                <input
                  className="frp-search-input"
                  type="search"
                  value={searchValue}
                  placeholder={data.search.placeholder}
                  onChange={(event) => {
                    setSearchValue(event.target.value);
                    setHasSubmittedSearch(false);
                  }}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
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
                <span className="frp-history-label">
                  {homeText?.history.label ?? "最近搜索"}
                </span>

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

            <section className="frp-card-section">
              <div className="frp-container">
                {hasSubmittedSearch && !searchResult ? (
                  <div className="frp-empty-result">
                    <strong>
                      {homeText?.emptyResult.title ?? "暂未找到对应型号"}
                    </strong>
                    <p>
                      {homeText?.emptyResult.description ??
                        "可以提交现用型号、BOM、图纸或样品照片，由工程师进一步确认。"}
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="frp-section-head">
                      <div>
                        <h2>
                          {homeText?.productSection.title ?? "产品替换表"}
                        </h2>
                        <p>
                          {homeText?.productSection.description ??
                            "可直接查看对应型号，也可以先加入选型清单。"}
                        </p>
                      </div>

                      <span>
                        {formatTemplate(
                          homeText?.productSection.countTemplate ??
                          "当前展示 {start}–{end} / 共 {total} 个型号",
                          {
                            start: (currentPage - 1) * PAGE_SIZE + 1,
                            end: Math.min(
                              currentPage * PAGE_SIZE,
                              homeProducts.length
                            ),
                            total: homeProducts.length,
                          }
                        )}
                      </span>
                    </div>

                    <div className="frp-card-grid">
                      {paginatedHomeProducts.map((product) => {
                        const currentCartItem = getItem(
                          SERIES_CONFIG.sourceType,
                          product.productCode
                        );

                        return (
                          <ProductBasicCard
                            key={product.productCode}
                            imageSrc={product.imagePath}
                            imageAlt={product.foreachModel}
                            title={
                              homeText?.productCard.productName ??
                              SERIES_CONFIG.productName
                            }
                            metaItems={[
                              {
                                label:
                                  homeText?.productCard.productCode ??
                                  "商品编码：",
                                value: product.productCode,
                              },
                              {
                                label:
                                  homeText?.productCard.foreachModel ??
                                  "恒永达型号：",
                                value: product.foreachModel,
                              },
                              {
                                label:
                                  homeText?.productCard.compatibleModels ??
                                  "兼容编码：",
                                value: formatCompatibleModelsForCard(product.competitorModels),
                              },
                            ]}
                            actions={[
                              {
                                label:
                                  homeText?.productCard.viewDetail ??
                                  "查看详情",
                                onClick: () => {
                                  handleOpenDetail(product);
                                },
                              },
                              {
                                label: currentCartItem
                                  ? homeText?.productCard.addedToCart ??
                                  "已加入清单"
                                  : homeText?.productCard.addToCart ?? "加入清单",
                                isActive: Boolean(currentCartItem),
                                onClick: () => {
                                  handleToggleCart(product);
                                },
                              },
                            ]}
                          />
                        );
                      })}
                    </div>

                    <div className="frp-pagination">
                      <button
                        type="button"
                        disabled={currentPage <= 1}
                        onClick={() => {
                          setCurrentPage((page) => {
                            return Math.max(1, page - 1);
                          });
                        }}
                      >
                        {homeText?.pagination.previous ?? "上一页"}
                      </button>

                      <span>
                        {currentPage} / {totalPages}
                      </span>

                      <button
                        type="button"
                        disabled={currentPage >= totalPages}
                        onClick={() => {
                          setCurrentPage((page) => {
                            return Math.min(totalPages, page + 1);
                          });
                        }}
                      >
                        {homeText?.pagination.next ?? "下一页"}
                      </button>
                    </div>
                  </>
                )}
              </div>
            </section>
          </>
        )}

        {activeTab === "guide" && (
          <section className="frp-guide-panel">
            <div className="frp-container">
              <FittingReplacementGuide data={data} />
            </div>
          </section>
        )}
      </main>
    </div>
  );
} 