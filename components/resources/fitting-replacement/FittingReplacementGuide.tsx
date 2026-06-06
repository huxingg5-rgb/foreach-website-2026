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
   6. 支持首页多语言文案
   7. 详情页链接根据当前语言生成，避免外语页面跳回中文详情页
   8. 卡片兼容编码只显示前 2 个，其余用 +数量 表示
   9. Q20 路径、清单来源、产品名称统一从系列配置读取
========================================================= */

import { useMemo, useState } from "react";

import { ProductBasicCard } from "@/components/common/product-card";
import { useSelectionCart } from "@/components/selection-cart/SelectionCartProvider";

import type {
  FittingModelRule,
  FittingReplacementI18nText,
  FittingReplacementPageData,
  FittingReplacementProduct,
} from "@/data/resources/fitting-replacement/fitting-replacement.types";

import {
  Q20_FITTING_REPLACEMENT_SERIES_CONFIG,
  getFittingReplacementDetailHref,
} from "@/data/resources/fitting-replacement/fitting-replacement-series.config";

import { parseFittingModelWithRules } from "@/services/resources/fitting-replacement/fittingReplacementModelParser";

/* 当前页面暂时使用 Q20 系列配置 */
const SERIES_CONFIG = Q20_FITTING_REPLACEMENT_SERIES_CONFIG;

/* 支持语言 */
type FittingReplacementLocale = "zh" | "en" | "es" | "fr" | "ko" | "ru";

/* 选型指引字段，不包含 series，因为当前页面已经固定为 Q20 */
type GuideFieldKey = Exclude<FittingModelRule["fieldKey"], "series">;

interface FittingReplacementGuideProps {
  data: FittingReplacementPageData;
}

/* =========================================================
   选型字段配置

   说明：
   1. fieldKey 对应 modelRules 里的字段
   2. description 用于每一步说明
   3. 标题优先从 modelRules.fieldName 读取
========================================================= */
const GUIDE_FIELD_CONFIGS: {
  fieldKey: GuideFieldKey;
  description: FittingReplacementI18nText;
}[] = [
  {
    fieldKey: "tubeOrThread",
    description: {
      zh: "选择与管路外径或螺纹规格一致的接口。",
      en: "Select the interface that matches the tube OD or thread specification.",
      es: "Seleccione la interfaz que coincida con el diámetro exterior del tubo o la rosca.",
      fr: "Sélectionnez l’interface correspondant au diamètre extérieur du tube ou au filetage.",
      ko: "튜브 외경 또는 나사 규격에 맞는 인터페이스를 선택하세요.",
      ru: "Выберите интерфейс, соответствующий наружному диаметру трубки или резьбе.",
    },
  },
  {
    fieldKey: "gender",
    description: {
      zh: "选择与现有管路或设备接口匹配的公端或母端。",
      en: "Select the male or female end that matches the existing tubing or device interface.",
      es: "Seleccione el extremo macho o hembra que coincida con la tubería o interfaz existente.",
      fr: "Sélectionnez l’extrémité mâle ou femelle adaptée à la ligne ou à l’interface existante.",
      ko: "기존 배관 또는 장비 인터페이스에 맞는 수형 또는 암형 단자를 선택하세요.",
      ru: "Выберите штуцер с наружным или внутренним соединением, подходящий к существующему интерфейсу.",
    },
  },
  {
    fieldKey: "panelMount",
    description: {
      zh: "如果接头需要固定在面板或外壳上，请选择穿板结构。",
      en: "Select a panel-mount structure if the fitting needs to be fixed to a panel or housing.",
      es: "Seleccione una estructura de montaje en panel si el conector debe fijarse a un panel o carcasa.",
      fr: "Sélectionnez une structure traversante si le raccord doit être fixé sur un panneau ou un boîtier.",
      ko: "피팅을 패널이나 하우징에 고정해야 하는 경우 패널 장착 구조를 선택하세요.",
      ru: "Выберите панельное крепление, если фитинг должен быть закреплен на панели или корпусе.",
    },
  },
  {
    fieldKey: "valved",
    description: {
      zh: "根据断开时是否需要自动截止液路，选择带阀或不带阀结构。",
      en: "Choose a valved or non-valved structure depending on whether the fluid path should shut off when disconnected.",
      es: "Elija una estructura con o sin válvula según si el flujo debe cerrarse al desconectar.",
      fr: "Choisissez une version avec ou sans vanne selon que le circuit doit se fermer lors de la déconnexion.",
      ko: "분리 시 유로를 자동으로 차단해야 하는지에 따라 밸브형 또는 비밸브형 구조를 선택하세요.",
      ru: "Выберите исполнение с клапаном или без него в зависимости от необходимости перекрытия потока при отсоединении.",
    },
  },
  {
    fieldKey: "shape",
    description: {
      zh: "根据管路空间布置，选择直通、弯头等结构形式。",
      en: "Select straight, elbow, or other shapes according to the tubing layout.",
      es: "Seleccione una forma recta, en codo u otra según la disposición de la tubería.",
      fr: "Sélectionnez une forme droite, coudée ou autre selon l’agencement de la ligne.",
      ko: "배관 공간 배치에 따라 직선형, 엘보형 등 구조 형태를 선택하세요.",
      ru: "Выберите прямую, угловую или другую форму в зависимости от компоновки трубопровода.",
    },
  },
  {
    fieldKey: "housingMaterial",
    description: {
      zh: "根据耐化学性、机械强度和应用环境选择外壳材质。",
      en: "Select the housing material based on chemical resistance, mechanical strength, and application environment.",
      es: "Seleccione el material de la carcasa según la resistencia química, la resistencia mecánica y el entorno de aplicación.",
      fr: "Sélectionnez le matériau du corps selon la résistance chimique, la résistance mécanique et l’environnement d’utilisation.",
      ko: "내화학성, 기계적 강도 및 적용 환경에 따라 하우징 재질을 선택하세요.",
      ru: "Выберите материал корпуса с учетом химической стойкости, механической прочности и условий применения.",
    },
  },
  {
    fieldKey: "sealingRingMaterial",
    description: {
      zh: "根据介质兼容性和密封要求选择密封圈材质。",
      en: "Select the sealing ring material based on media compatibility and sealing requirements.",
      es: "Seleccione el material de la junta según la compatibilidad con el medio y los requisitos de sellado.",
      fr: "Sélectionnez le matériau du joint selon la compatibilité avec le fluide et les exigences d’étanchéité.",
      ko: "매체 호환성과 밀봉 요구 사항에 따라 씰링 링 재질을 선택하세요.",
      ru: "Выберите материал уплотнительного кольца с учетом совместимости со средой и требований к герметизации.",
    },
  },
];

/* =========================================================
   从面包屑判断当前语言

   说明：
   1. 中文页面返回 zh
   2. 外语页面返回 en / es / fr / ko / ru
   3. 用于生成详情页链接，避免外语页面点击详情后跳回中文
========================================================= */
function getLocaleFromBreadcrumbs(
  breadcrumbs: FittingReplacementPageData["breadcrumbs"]
): FittingReplacementLocale {
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
   读取多语言文本

   说明：
   1. 优先当前语言
   2. 其次英文
   3. 最后中文
========================================================= */
function getLocalizedText(
  text: FittingReplacementI18nText,
  locale: FittingReplacementLocale
) {
  return text[locale] || text.en || text.zh;
}

/* =========================================================
   格式化选型指引模板文案
========================================================= */
function formatGuideTemplate(
  template: string,
  values: Record<string, string | number>
) {
  return Object.entries(values).reduce((result, [key, value]) => {
    return result.replaceAll(`{${key}}`, String(value));
  }, template);
}

/* =========================================================
   卡片兼容编码显示

   说明：
   1. 卡片只展示前 2 个兼容编码
   2. 其余用 +数量 表示
   3. 完整兼容编码在详情页展示
========================================================= */
function formatCompatibleModelsForCard(models: string[]) {
  if (models.length === 0) {
    return "-";
  }

  if (models.length <= 2) {
    return models.join(" / ");
  }

  return `${models.slice(0, 2).join(" / ")} / +${models.length - 2}`;
}

/* =========================================================
   生成详情页链接
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
   根据 fieldKey 查找产品解析字段
========================================================= */
function getParsedFieldCode(
  product: FittingReplacementProduct,
  modelRules: FittingModelRule[],
  fieldKey: FittingModelRule["fieldKey"]
) {
  const parsedFields = parseFittingModelWithRules(
    product.foreachModel,
    modelRules
  );

  return (
    parsedFields.find((field) => {
      return field.fieldKey === fieldKey;
    })?.code || ""
  );
}

/* =========================================================
   接头选型指引组件
========================================================= */
export default function FittingReplacementGuide({
  data,
}: FittingReplacementGuideProps) {
  const [selectedValues, setSelectedValues] = useState<
    Partial<Record<GuideFieldKey, string>>
  >({});

  const { addItem, getItem } = useSelectionCart();

  const locale = useMemo(() => {
    return getLocaleFromBreadcrumbs(data.breadcrumbs);
  }, [data.breadcrumbs]);

  const guideText = data.homeText?.guide;
  const productCardText = data.homeText?.productCard;

  /* =========================================================
     生成选型步骤

     说明：
     1. 只显示当前数据中存在的字段
     2. 选项来自 modelRules
     3. 标题和选项含义优先使用当前语言
  ========================================================= */
  const guideSteps = useMemo(() => {
    return GUIDE_FIELD_CONFIGS.map((config) => {
      const fieldRules = data.modelRules
        .filter((rule) => {
          return rule.fieldKey === config.fieldKey;
        })
        .sort((a, b) => {
          return a.fieldOrder - b.fieldOrder;
        });

      const firstRule = fieldRules[0];

      if (!firstRule) {
        return null;
      }

      const optionMap = new Map<string, string>();

      fieldRules.forEach((rule) => {
        if (!optionMap.has(rule.code)) {
          optionMap.set(rule.code, getLocalizedText(rule.meaning, locale));
        }
      });

      return {
        fieldKey: config.fieldKey,
        title: getLocalizedText(firstRule.fieldName, locale),
        description: getLocalizedText(config.description, locale),
        options: Array.from(optionMap.entries()).map(([code, label]) => {
          return {
            code,
            label,
          };
        }),
      };
    }).filter(Boolean);
  }, [data.modelRules, locale]);

  const selectedCount = Object.values(selectedValues).filter(Boolean).length;

  /* =========================================================
     匹配产品

     说明：
     1. 未选择条件时不展示产品
     2. 选择条件后，产品必须同时满足所有已选字段
  ========================================================= */
  const matchedProducts = useMemo(() => {
    if (selectedCount === 0) {
      return [];
    }

    return data.products.filter((product) => {
      return Object.entries(selectedValues).every(([fieldKey, code]) => {
        if (!code) {
          return true;
        }

        return (
          getParsedFieldCode(
            product,
            data.modelRules,
            fieldKey as FittingModelRule["fieldKey"]
          ) === code
        );
      });
    });
  }, [data.products, data.modelRules, selectedValues, selectedCount]);

  function handleSelectOption(fieldKey: GuideFieldKey, code: string) {
    setSelectedValues((currentValues) => {
      if (currentValues[fieldKey] === code) {
        const nextValues = {
          ...currentValues,
        };

        delete nextValues[fieldKey];

        return nextValues;
      }

      return {
        ...currentValues,
        [fieldKey]: code,
      };
    });
  }

  function handleClearSelection() {
    setSelectedValues({});
  }

  function handleOpenDetail(product: FittingReplacementProduct) {
    openDetailInNewTab(product, locale);
  }

  function handleAddToCart(product: FittingReplacementProduct) {
    addItem({
      sourceType: SERIES_CONFIG.sourceType,
      sourceLabel: SERIES_CONFIG.sourceLabel,
      productName:
        productCardText?.productName ?? SERIES_CONFIG.productName,
      productCode: product.productCode,
      foreachModel: product.foreachModel,
      competitorModels: product.competitorModels,
      quantity: 1,
      needDrawing: false,
      imagePath: product.imagePath,
      detailHref: getDetailHref(product, locale),
    });
  }

  return (
    <section className="frg-guide-section">
      <div className="frg-guide-head">
        <div>
          <h2>{guideText?.title ?? "接头选型指引"}</h2>
          <p>
            {guideText?.description ??
              "按照管路尺寸、接口形式、安装方式、阀结构和材质逐步选择，系统会自动筛选匹配型号。"}
          </p>
        </div>

        <button
          className="frg-clear-button"
          type="button"
          disabled={selectedCount === 0}
          onClick={handleClearSelection}
        >
          {guideText?.clearButton ?? "清空选择"}
        </button>
      </div>

      <div className="frg-step-list">
        {guideSteps.map((step, index) => {
          if (!step) {
            return null;
          }

          return (
            <section className="frg-step-item" key={step.fieldKey}>
              <div className="frg-step-title">
                <span>{String(index + 1).padStart(2, "0")}</span>

                <div>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </div>

              <div className="frg-option-row">
                {step.options.map((option) => {
                  const isActive =
                    selectedValues[step.fieldKey] === option.code;

                  return (
                    <button
                      className={`frg-option-button ${
                        isActive ? "is-active" : ""
                      }`}
                      type="button"
                      key={`${step.fieldKey}-${option.code}`}
                      onClick={() => {
                        handleSelectOption(step.fieldKey, option.code);
                      }}
                    >
                      <strong>{option.label}</strong>
                      <span>{option.code}</span>
                    </button>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>

      <section className="frg-result-section">
        <div className="frg-result-head">
          <h2>{guideText?.resultTitle ?? "匹配结果"}</h2>

          {selectedCount === 0 ? (
            <p>
              {guideText?.emptyBeforeSelection ??
                "请选择上方条件，系统会自动筛选推荐型号。"}
            </p>
          ) : (
            <p>
              {formatGuideTemplate(
                guideText?.selectedResultTemplate ??
                  "当前已选择 {selectedCount} 个条件，匹配到 {matchCount} 个型号。",
                {
                  selectedCount,
                  matchCount: matchedProducts.length,
                }
              )}
            </p>
          )}
        </div>

        {selectedCount === 0 ? (
          <div className="frg-empty-box">
            {guideText?.emptyBeforeSelection ??
              "请选择上方条件，系统会自动筛选推荐型号。"}
          </div>
        ) : matchedProducts.length === 0 ? (
          <div className="frg-empty-box">
            {guideText?.noMatchText ??
              "暂未找到完全匹配的型号，可以减少筛选条件后再试。"}
          </div>
        ) : (
          <div className="frp-card-grid">
            {matchedProducts.map((product) => {
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
                    productCardText?.productName ??
                    SERIES_CONFIG.productName
                  }
                  metaItems={[
                    {
                      label:
                        productCardText?.productCode ?? "商品编码：",
                      value: product.productCode,
                    },
                    {
                      label:
                        productCardText?.foreachModel ?? "恒永达型号：",
                      value: product.foreachModel,
                    },
                    {
                      label:
                        productCardText?.compatibleModels ?? "兼容编码：",
                      value: formatCompatibleModelsForCard(
                        product.competitorModels
                      ),
                    },
                  ]}
                  actions={[
                    {
                      label: productCardText?.viewDetail ?? "查看详情",
                      onClick: () => {
                        handleOpenDetail(product);
                      },
                    },
                    {
                      label: currentCartItem
                        ? productCardText?.addedToCart ?? "已加入清单"
                        : productCardText?.addToCart ?? "加入清单",
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
      </section>
    </section>
  );
} 