"use client";

/* =========================================================
   FittingReplacementDrawingPreview.tsx
   恒永达官网｜接头详情页 2D 图纸预览组件

   文件路径：
   components/resources/fitting-replacement/FittingReplacementDrawingPreview.tsx

   作用：
   1. 展示详情页 2D 图纸预览区域
   2. 默认只显示“点击预览图纸”封面
   3. 用户点击后再加载 PDF iframe
   4. 不显示下载按钮
   5. 不显示新窗口打开按钮
   6. 通过 #toolbar=0 尽量隐藏浏览器 PDF 工具栏
   7. 从 FittingReplacementDetail.tsx 中抽离，保持详情页结构清晰

   注意：
   1. 这里只是隐藏下载入口，不是真正防下载
   2. public 目录下的 PDF 仍然可以被知道链接的人访问
   3. 如果后续要真正防下载，应改成图片预览 + 询盘后发送 PDF
========================================================= */

import { useEffect, useState } from "react";

import LoadingProgress from "@/components/common/LoadingProgress";

/* PDF 图纸预览加载遮罩兜底时间 */
const DRAWING_PREVIEW_LOADING_TIME = 1200;

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

  /* PDF 加载遮罩 */
  const [isDrawingLoading, setIsDrawingLoading] = useState(false);

  /* =========================================================
     点击预览后显示加载遮罩

     说明：
     1. 点击后 iframe 才挂载
     2. iframe onLoad 后关闭加载层
     3. 兜底 1.2 秒后也会关闭加载层
  ========================================================= */
  useEffect(() => {
    if (!isDrawingPreviewVisible) return;

    setIsDrawingLoading(true);

    const loadingTimer = window.setTimeout(() => {
      setIsDrawingLoading(false);
    }, DRAWING_PREVIEW_LOADING_TIME);

    return () => {
      window.clearTimeout(loadingTimer);
    };
  }, [isDrawingPreviewVisible, drawingPdfPreviewHref]);

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

            <em>如需图纸文件，请添加至清单列表</em>
          </button>
        ) : (
          <iframe
            key={drawingPdfPreviewHref}
            src={drawingPdfPreviewHref}
            className="frd-drawing-object is-visible"
            title={`${productModel} 2D PDF drawing`}
            loading="eager"
            onLoad={() => {
              setIsDrawingLoading(false);
            }}
          />
        )}
      </div>
    </section>
  );
} 