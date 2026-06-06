"use client";

/* =========================================================
   FittingReplacementDetail.tsx
   恒永达官网｜Q20 接头型号替代详情页组件

   文件路径：
   components/resources/fitting-replacement/FittingReplacementDetail.tsx

   作用：
   1. 展示单个 Q20 接头替代详情
   2. 左侧显示产品图
   3. 右侧显示紧凑参数表
   4. 使用全局选型清单
   5. 支持加入清单
   6. 支持添加 / 取消图纸需求
   7. 2D 图纸预览区已抽离为 FittingReplacementDrawingPreview
   8. FAQ 单独抽离为组件
   9. 型号解析逻辑已抽离到 fittingReplacementModelParser.ts
   10. Q20 路径、清单来源、产品名称、图纸路径统一从系列配置读取

   注意：
   1. 这次只改数据引用方式
   2. 不改样式
   3. 不改页面结构
========================================================= */

import { useMemo } from "react";

import { Breadcrumb } from "@/components/common/breadcrumb";
import { useSelectionCart } from "@/components/selection-cart/SelectionCartProvider";

import type { FittingModelRule } from "@/data/resources/fitting-replacement/fitting-replacement.types";

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

interface FittingReplacementDetailProps {
  data: FittingReplacementDetailPageData;
}

export default function FittingReplacementDetail({
  data,
}: FittingReplacementDetailProps) {
  const { product, modelRules, breadcrumbs } = data;

  const { addItem, getItem, toggleDrawingNeed } = useSelectionCart();

  /* 当前型号对应的 2D PDF 图纸路径 */
  const drawingPdfHref = getFittingReplacementDrawingPdfHref(
    product.foreachModel,
    SERIES_CONFIG.seriesKey
  );

  /* PDF 预览路径 */
  const drawingPdfPreviewHref = `${drawingPdfHref}#toolbar=0&navpanes=0&scrollbar=1`;

  /* =========================================================
     面包屑显示层清理
  ========================================================= */
  const normalizedBreadcrumbs = useMemo(() => {
    return breadcrumbs
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
        SERIES_CONFIG.seriesKey
      ),
    };
  }

  function handleAddToCart() {
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
        <div className="frp-container">

          <Breadcrumb items={data.breadcrumbs} />

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
                      <td className="frd-label">商品编码</td>
                      <td className="frd-value" colSpan={3}>
                        {product.productCode}
                      </td>
                    </tr>

                    <tr>
                      <td className="frd-label">兼容编码</td>
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
                            {leftField?.fieldName.zh || "-"}
                          </td>

                          <td className="frd-value">
                            {leftField?.meaning.zh || "-"}
                          </td>

                          {rightField ? (
                            <>
                              <td className="frd-label">
                                {rightField.fieldName.zh}
                              </td>

                              <td className="frd-value">
                                {rightField.meaning.zh}
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
                    onClick={handleAddToCart}
                  >
                    {currentCartItem ? "已加入清单" : "加入清单"}
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
                    {currentProductNeedDrawing ? "已添加图纸" : "添加图纸"}
                  </button>
                </div>
              </div>
            </div>
          </section>

          <FittingReplacementDrawingPreview
            drawingPdfPreviewHref={drawingPdfPreviewHref}
            productModel={product.foreachModel}
          />

          <FittingReplacementFaq />
        </div>
      </main>
    </div>
  );
} 