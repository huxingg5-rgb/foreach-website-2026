"use client";

/* =========================================================
   FittingReplacementDetail.tsx
   恒永达官网｜Q20 接头替代查询详情页组件

   文件路径：
   components/resources/fitting-replacement/FittingReplacementDetail.tsx

   作用：
   1. 展示单个 Q20 接头替代查询详情
   2. 左侧显示产品图
   3. 右侧显示参数表
   4. 使用全局选型清单
   5. 支持加入清单
   6. 支持添加 / 取消图纸需求
   7. 2D 图纸预览区已抽离为 FittingReplacementDrawingPreview
   8. FAQ 单独抽离为 FittingReplacementFaq
   9. 型号解析逻辑已抽离到 fittingReplacementModelParser.ts
   10. 详情页固定文案从 data.detailText 读取，支持多语言
   11. Q20 路径、清单来源、产品名称、图纸路径统一从系列配置读取
========================================================= */

import { useMemo } from "react";

import { Breadcrumb } from "@/components/common/breadcrumb";
import { useSelectionCart } from "@/components/selection-cart/SelectionCartProvider";

import type {
  FittingModelRule,
  FittingReplacementI18nText,
} from "@/data/resources/fitting-replacement/fitting-replacement.types";

import {
  Q20_FITTING_REPLACEMENT_SERIES_CONFIG,
  getFittingReplacementDetailHref,
  getFittingReplacementDrawingPdfHref,
} from "@/data/resources/fitting-replacement/fitting-replacement-series.config";

import type { FittingReplacementDetailPageData } from "@/services/resources/getFittingReplacementDetailData";

import {
  getParsedFittingField,
  parseFittingModelWithRules,
} from "@/services/resources/fitting-replacement/fittingReplacementModelParser";

import FittingReplacementDrawingPreview from "./FittingReplacementDrawingPreview";
import FittingReplacementFaq from "./FittingReplacementFaq";

/* 当前详情页暂时使用 Q20 系列配置 */
const SERIES_CONFIG = Q20_FITTING_REPLACEMENT_SERIES_CONFIG;

/* 支持语言 */
type FittingReplacementLocale = "zh" | "en" | "es" | "fr" | "ko" | "ru";

interface FittingReplacementDetailProps {
  data: FittingReplacementDetailPageData;
}

/* =========================================================
   从面包屑判断当前语言

   说明：
   1. 中文页面 href 通常是 /
   2. 外语页面 href 通常是 /en、/fr 等
   3. 这里只服务详情页型号解析字段的多语言展示
========================================================= */
function getLocaleFromBreadcrumbs(
  breadcrumbs: FittingReplacementDetailPageData["breadcrumbs"]
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
  text: FittingReplacementI18nText | undefined,
  locale: FittingReplacementLocale
) {
  if (!text) return "-";

  return text[locale] || text.en || text.zh || "-";
}

/* =========================================================
   详情页组件
========================================================= */
export default function FittingReplacementDetail({
  data,
}: FittingReplacementDetailProps) {
  const { product, modelRules, breadcrumbs, detailText } = data;

  const { addItem, getItem, removeItem, toggleDrawingNeed } = useSelectionCart();

  const locale = useMemo(() => {
    return getLocaleFromBreadcrumbs(breadcrumbs);
  }, [breadcrumbs]);

  /* 当前型号对应的 2D PDF 图纸路径 */
  const drawingPdfHref = getFittingReplacementDrawingPdfHref(
    product.foreachModel,
    SERIES_CONFIG.seriesKey
  );

  /* PDF 预览路径 */
  const drawingPdfPreviewHref = `${drawingPdfHref}#toolbar=0&navpanes=0&scrollbar=1`;

  /* =========================================================
     面包屑显示层清理

     说明：
     1. 详情页面包屑已由 service 根据 locale 生成
     2. 这里只做兼容性过滤
  ========================================================= */
  const normalizedBreadcrumbs = useMemo(() => {
    return breadcrumbs.filter((item) => {
      return item.label !== "选型支持";
    });
  }, [breadcrumbs]);

  /* 当前产品在全局清单中的状态 */
  const currentCartItem = getItem(
    SERIES_CONFIG.sourceType,
    product.productCode
  );

  const currentProductNeedDrawing = Boolean(currentCartItem?.needDrawing);

  /* 当前型号解析结果 */
  const parsedFields = useMemo(() => {
    return parseFittingModelWithRules(product.foreachModel, modelRules);
  }, [product.foreachModel, modelRules]);

  function getParsedField(fieldKey: FittingModelRule["fieldKey"]) {
    return getParsedFittingField(parsedFields, fieldKey);
  }

  const compactRows: Array<
    [FittingModelRule["fieldKey"], FittingModelRule["fieldKey"] | null]
  > = [
      ["tubeOrThread", "gender"],
      ["panelMount", "valved"],
      ["shape", "housingMaterial"],
      ["sealingRingMaterial", null],
    ];

  /* =========================================================
     生成当前产品写入清单的数据

     说明：
     1. 避免“加入清单”和“添加图纸”两处重复写一大段
     2. needDrawing 由按钮行为决定
  ========================================================= */
  function createCurrentProductCartItem(needDrawing: boolean) {
    return {
      sourceType: SERIES_CONFIG.sourceType,
      sourceLabel: SERIES_CONFIG.sourceLabel,
      productName: SERIES_CONFIG.productName,
      productCode: product.productCode,
      foreachModel: product.foreachModel,
      competitorModels: product.competitorModels,
      quantity: 1,
      needDrawing,
      imagePath: product.imagePath,
      detailHref: getFittingReplacementDetailHref(
        product.productCode,
        SERIES_CONFIG.seriesKey,
        locale
      ),
    };
  }

  /* =========================================================
     切换当前产品清单状态

     说明：
     1. 未加入清单时，点击加入清单
     2. 已加入清单时，点击取消加入清单
     3. 如果该产品已标记需要图纸，取消清单时也会一起移除图纸需求
  ========================================================= */
  function handleToggleCart() {
    if (currentCartItem) {
      removeItem(currentCartItem.id);
      return;
    }

    addItem(createCurrentProductCartItem(false));
  }

  function handleToggleCurrentProductDrawingNeed() {
    if (currentCartItem) {
      toggleDrawingNeed(currentCartItem.id, !currentProductNeedDrawing);
      return;
    }

    addItem(createCurrentProductCartItem(true));
  }

  return (
    <div className="fitting-replacement-detail-page">
      <main className="frd-main">
        <div className="frd-container">
          <Breadcrumb
            items={normalizedBreadcrumbs}
            ariaLabel={locale === "zh" ? "面包屑导航" : "Breadcrumb"}
          />

          <section className="frd-detail-section">
            <div className="frd-detail-layout">
              <div className="frd-product-visual">
                <img
                  src={product.imagePath}
                  alt={product.foreachModel}
                  onError={(event) => {
                    event.currentTarget.style.display = "none";
                  }}
                />
              </div>

              <div className="frd-info-area">
                <div className="frd-title-block">
                  <h2>{product.foreachModel}</h2>
                </div>

                <table className="frd-compact-table">
                  <tbody>
                    <tr className="frd-head-row">
                      <td className="frd-label">
                        {detailText.tableLabels.productCode}
                      </td>
                      <td className="frd-value" colSpan={3}>
                        {product.productCode}
                      </td>
                    </tr>

                    <tr>
                      <td className="frd-label">
                        {detailText.tableLabels.compatibleModels}
                      </td>
                      <td className="frd-value" colSpan={3}>
                        {product.competitorModels.join(" / ") || "-"}
                      </td>
                    </tr>

                    {compactRows.map(([leftKey, rightKey]) => {
                      const leftField = getParsedField(leftKey);
                      const rightField = rightKey
                        ? getParsedField(rightKey)
                        : null;

                      return (
                        <tr key={`${leftKey}-${rightKey || "empty"}`}>
                          <td className="frd-label">
                            {getLocalizedText(leftField?.fieldName, locale)}
                          </td>

                          <td className="frd-value">
                            {getLocalizedText(leftField?.meaning, locale)}
                          </td>

                          {rightField ? (
                            <>
                              <td className="frd-label">
                                {getLocalizedText(
                                  rightField.fieldName,
                                  locale
                                )}
                              </td>

                              <td className="frd-value">
                                {getLocalizedText(rightField.meaning, locale)}
                              </td>
                            </>
                          ) : (
                            <td className="frd-empty" colSpan={2} />
                          )}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>

                <div className="frd-detail-action-row">
                  <button
                    className={
                      currentCartItem
                        ? "frd-add-button is-added"
                        : "frd-add-button"
                    }
                    type="button"
                    onClick={handleToggleCart}
                  >
                    {currentCartItem
                      ? detailText.actions.addedToCart
                      : detailText.actions.addToCart}
                  </button>

                  <button
                    className={
                      currentProductNeedDrawing
                        ? "frd-drawing-toggle-button is-active"
                        : "frd-drawing-toggle-button"
                    }
                    type="button"
                    onClick={handleToggleCurrentProductDrawingNeed}
                  >
                    {currentProductNeedDrawing
                      ? detailText.actions.addedDrawing
                      : detailText.actions.addDrawing}
                  </button>
                </div>
              </div>
            </div>
          </section>

          <FittingReplacementDrawingPreview
            drawingPdfPreviewHref={drawingPdfPreviewHref}
            productModel={product.foreachModel}
            text={detailText.drawingPreview}
          />

          <FittingReplacementFaq text={detailText.faq} />
        </div>
      </main>
    </div>
  );
}
