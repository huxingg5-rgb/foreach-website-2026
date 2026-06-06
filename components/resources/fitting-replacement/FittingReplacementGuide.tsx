"use client";

/* =========================================================
   FittingReplacementGuide.tsx
   恒永达官网｜接头选型指引组件

   文件路径：
   components/resources/fitting-replacement/FittingReplacementGuide.tsx

   作用：
   1. 展示接头选型指引
   2. 根据客户选择条件筛选匹配产品
   3. 匹配结果使用 ProductBasicCard 公共卡片
   4. 支持查看详情
   5. 支持加入全局选型清单
   6. Q20 路径、清单来源、产品名称统一从系列配置读取

   注意：
   1. 本组件只负责首页“接头选型指引”Tab
   2. 不影响详情页
   3. 不使用 frd- 类名
========================================================= */

import { useMemo, useState } from "react";

import { ProductBasicCard } from "@/components/common/product-card";
import { useSelectionCart } from "@/components/selection-cart/SelectionCartProvider";

import type {
  FittingModelRule,
  FittingReplacementPageData,
  FittingReplacementProduct,
} from "@/data/resources/fitting-replacement/fitting-replacement.types";

import {
  Q20_FITTING_REPLACEMENT_SERIES_CONFIG,
  getFittingReplacementDetailHref,
} from "@/data/resources/fitting-replacement/fitting-replacement-series.config";

import {
  getFittingProductDisplayName,
  getParsedFittingField,
  parseFittingModelWithRules,
} from "@/services/resources/fitting-replacement/fittingReplacementModelParser";

/* 当前选型指引暂时使用 Q20 系列配置 */
const SERIES_CONFIG = Q20_FITTING_REPLACEMENT_SERIES_CONFIG;

interface FittingReplacementGuideProps {
  data: FittingReplacementPageData;
}

const GUIDE_STEPS: Array<{
  fieldKey: FittingModelRule["fieldKey"];
  title: string;
  description: string;
}> = [
  {
    fieldKey: "tubeOrThread",
    title: "选择管路尺寸或螺纹",
    description: "根据当前管路外径或螺纹接口选择，例如 1/16 英寸管路。",
  },
  {
    fieldKey: "gender",
    title: "选择公母端",
    description: "根据连接对象选择公端或母端，确保两端接口可以配合。",
  },
  {
    fieldKey: "panelMount",
    title: "选择是否穿板",
    description: "如果接头需要固定在面板或外壳上，请选择穿板结构。",
  },
  {
    fieldKey: "valved",
    title: "选择是否带阀",
    description: "带阀结构可在断开时减少液体泄漏或空气进入。",
  },
  {
    fieldKey: "shape",
    title: "选择接头形状",
    description: "根据安装空间选择直通、弯头或其它结构。",
  },
  {
    fieldKey: "housingMaterial",
    title: "选择外壳材质",
    description: "根据液体兼容性、强度和成本要求选择外壳材质。",
  },
  {
    fieldKey: "sealingRingMaterial",
    title: "选择密封圈材质",
    description: "根据试剂、溶剂和温度要求选择密封圈材质。",
  },
];

type SelectedGuideCodes = Partial<
  Record<FittingModelRule["fieldKey"], string>
>;

function getDetailHref(product: FittingReplacementProduct) {
  return getFittingReplacementDetailHref(
    product.productCode,
    SERIES_CONFIG.seriesKey
  );
}

function openDetailInNewTab(product: FittingReplacementProduct) {
  window.open(getDetailHref(product), "_blank", "noopener,noreferrer");
}

function getRulesByFieldKey(
  rules: FittingModelRule[],
  fieldKey: FittingModelRule["fieldKey"]
) {
  return rules
    .filter((rule) => {
      return rule.fieldKey === fieldKey;
    })
    .sort((a, b) => {
      return a.code.localeCompare(b.code);
    });
}

function isProductMatchedBySelectedCodes(
  product: FittingReplacementProduct,
  modelRules: FittingModelRule[],
  selectedCodes: SelectedGuideCodes
) {
  const parsedFields = parseFittingModelWithRules(
    product.foreachModel,
    modelRules
  );

  return Object.entries(selectedCodes).every(([fieldKey, selectedCode]) => {
    if (!selectedCode) {
      return true;
    }

    const matchedField = getParsedFittingField(
      parsedFields,
      fieldKey as FittingModelRule["fieldKey"]
    );

    return matchedField?.code === selectedCode;
  });
}

export default function FittingReplacementGuide({
  data,
}: FittingReplacementGuideProps) {
  const [selectedCodes, setSelectedCodes] = useState<SelectedGuideCodes>({});

  const { addItem, getItem } = useSelectionCart();

  const selectedCount = Object.values(selectedCodes).filter(Boolean).length;

  const matchedProducts = useMemo(() => {
    if (selectedCount === 0) {
      return [];
    }

    return data.products
      .filter((product) => {
        return isProductMatchedBySelectedCodes(
          product,
          data.modelRules,
          selectedCodes
        );
      })
      .slice(0, 8);
  }, [data.products, data.modelRules, selectedCodes, selectedCount]);

  function handleToggleOption(
    fieldKey: FittingModelRule["fieldKey"],
    code: string
  ) {
    setSelectedCodes((prev) => {
      const next: SelectedGuideCodes = {
        ...prev,
      };

      if (next[fieldKey] === code) {
        delete next[fieldKey];
        return next;
      }

      next[fieldKey] = code;
      return next;
    });
  }

  function handleClearSelection() {
    setSelectedCodes({});
  }

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
    <section className="frg-guide-section">
      <div className="frp-container">
        <div className="frg-guide-head">
          <div>
            <h2>接头选型指引</h2>
            <p>
              按照管路尺寸、接口形式、安装方式、阀结构和材质逐步选择，系统会自动筛选匹配型号。
            </p>
          </div>

          <button
            className="frg-clear-button"
            type="button"
            disabled={selectedCount === 0}
            onClick={handleClearSelection}
          >
            清空选择
          </button>
        </div>

        <div className="frg-step-list">
          {GUIDE_STEPS.map((step, index) => {
            const rules = getRulesByFieldKey(data.modelRules, step.fieldKey);

            if (rules.length === 0) {
              return null;
            }

            return (
              <div className="frg-step-item" key={step.fieldKey}>
                <div className="frg-step-title">
                  <span>{String(index + 1).padStart(2, "0")}</span>

                  <div>
                    <h3>{step.title}</h3>
                    <p>{step.description}</p>
                  </div>
                </div>

                <div className="frg-option-row">
                  {rules.map((rule) => {
                    const isActive = selectedCodes[step.fieldKey] === rule.code;

                    return (
                      <button
                        className={
                          isActive
                            ? "frg-option-button is-active"
                            : "frg-option-button"
                        }
                        type="button"
                        key={`${rule.fieldKey}-${rule.code}`}
                        onClick={() => {
                          handleToggleOption(step.fieldKey, rule.code);
                        }}
                      >
                        <strong>{rule.meaning.zh}</strong>
                        <span>{rule.code}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        <div className="frg-result-section">
          <div className="frg-result-head">
            <div>
              <h2>匹配结果</h2>

              {selectedCount === 0 ? (
                <p>请选择上方条件，系统会自动筛选推荐型号。</p>
              ) : (
                <p>
                  当前已选择 {selectedCount} 个条件，匹配到{" "}
                  {matchedProducts.length} 个型号。
                </p>
              )}
            </div>
          </div>

          {selectedCount === 0 ? (
            <div className="frg-empty-box">
              先从上方选择一个条件，例如管路尺寸或是否带阀。
            </div>
          ) : matchedProducts.length === 0 ? (
            <div className="frg-empty-box">
              暂未找到完全匹配的型号，可以减少筛选条件后再试。
            </div>
          ) : (
            <div className="frp-card-grid">
              {matchedProducts.map((product) => {
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
                          openDetailInNewTab(product);
                        },
                      },
                      {
                        label: currentCartItem ? "已加入清单" : "加入清单",
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
          )}
        </div>
      </div>
    </section>
  );
} 