"use client";

/* =========================================================
   FittingReplacementDrawingPreview.tsx
   恒永达官网｜接头详情页 2D 图纸预览组件

   文件路径：
   components/resources/fitting-replacement/FittingReplacementDrawingPreview.tsx

   作用：
   1. 进入详情页后立即加载 2D 图纸 PDF
   2. 默认不直接显示 PDF，只显示“点击预览图纸”封面
   3. 用户点击后再显示已经后台加载的 PDF
   4. 如果 PDF 还没加载完成，点击后显示短暂加载提示
   5. 从 FittingReplacementDetail.tsx 中抽离，保持详情页结构清晰

   注意：
   1. iframe 必须始终渲染
   2. iframe 的 src 必须一开始就有值
   3. 不能点击后才渲染 iframe
   4. 不能使用 display:none 隐藏 iframe，否则浏览器可能不会后台加载 PDF
========================================================= */

import { useEffect, useState } from "react";

import LoadingProgress from "@/components/common/LoadingProgress";

/* PDF 图纸预览加载遮罩时间
   说明：
   1. 如果客户点击预览时 PDF 还没有完成加载，就显示加载层
   2. 兜底 1 秒后关闭加载层，避免 PDF Viewer onLoad 不稳定导致一直转圈
*/
const DRAWING_PREVIEW_LOADING_TIME = 1000;

interface FittingReplacementDrawingPreviewProps {
  /* PDF 预览地址，通常带 #toolbar=0 等参数 */
  drawingPdfPreviewHref: string;

  /* 产品型号，用于 iframe title */
  productModel: string;
}

/* =========================================================
   2D 图纸预览组件
========================================================= */
export default function FittingReplacementDrawingPreview({
  drawingPdfPreviewHref,
  productModel,
}: FittingReplacementDrawingPreviewProps) {
  /* 是否显示 PDF 预览 */
  const [isDrawingPreviewVisible, setIsDrawingPreviewVisible] = useState(false);

  /* PDF 是否已加载完成 */
  const [isDrawingLoaded, setIsDrawingLoaded] = useState(false);

  /* 点击预览后的加载遮罩 */
  const [isDrawingLoading, setIsDrawingLoading] = useState(false);

  /* =========================================================
     点击预览后的加载遮罩控制

     说明：
     1. PDF 页面进入后已经在后台加载
     2. 如果客户点击时已经加载完成，不显示加载层
     3. 如果还没加载完成，显示 LoadingProgress
     4. 1 秒后兜底关闭，避免一直转圈
  ========================================================= */
  useEffect(() => {
    if (!isDrawingPreviewVisible) return;

    if (isDrawingLoaded) {
      setIsDrawingLoading(false);
      return;
    }

    setIsDrawingLoading(true);

    const loadingTimer = window.setTimeout(() => {
      setIsDrawingLoading(false);
    }, DRAWING_PREVIEW_LOADING_TIME);

    return () => {
      window.clearTimeout(loadingTimer);
    };
  }, [isDrawingPreviewVisible, isDrawingLoaded, productModel]);

  return (
    <section className="frd-drawing-section">
      <div className="frd-drawing-head">
        <h2>2D 图纸</h2>
      </div>

      <div className="frd-drawing-viewer">
        <LoadingProgress
          active={isDrawingPreviewVisible && isDrawingLoading}
          label="正在加载 2D 图纸..."
        />

        {/* 
          关键：
          iframe 始终渲染，并且 src 一开始就存在。
          这样 PDF 页面打开后会后台加载。
          但默认通过 CSS 隐藏，客户点击预览后才显示。
        */}
        <iframe
          src={drawingPdfPreviewHref}
          className={
            isDrawingPreviewVisible
              ? "frd-drawing-object is-visible"
              : "frd-drawing-object"
          }
          title={`${productModel} 2D PDF drawing`}
          loading="eager"
          onLoad={() => {
            setIsDrawingLoaded(true);
            setIsDrawingLoading(false);
          }}
        />

        {!isDrawingPreviewVisible ? (
          <button
            className="frd-drawing-preview-card"
            type="button"
            onClick={() => {
              setIsDrawingPreviewVisible(true);
            }}
          >
            <span className="frd-drawing-play-icon" aria-hidden="true" />

            <strong>点击预览图纸</strong>

            <em>如需下载，请添加至清单列表</em>
          </button>
        ) : null}
      </div>
    </section>
  );
} 