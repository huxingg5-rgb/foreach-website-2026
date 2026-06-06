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
   4. 避免 iframe 在隐藏状态下后台加载 PDF 时，Chrome PDF Viewer 偶发黑屏或报错
   5. 从 FittingReplacementDetail.tsx 中抽离，保持详情页结构清晰

   为什么改成点击后再加载：
   1. PDF 文件本身可以直接打开，说明路径和文件没问题
   2. 问题主要出在隐藏 iframe 预加载时，浏览器 PDF Viewer 不稳定
   3. 点击后再加载 iframe 更稳，也更符合客户“需要时预览”的使用习惯

   注意：
   1. 这个文件只控制 2D 图纸预览逻辑
   2. 不修改详情页整体样式
   3. 不修改 PDF 文件路径生成逻辑
========================================================= */

import { useEffect, useState } from "react";

import LoadingProgress from "@/components/common/LoadingProgress";

/* PDF 图纸预览加载遮罩兜底时间 */
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

  /* PDF 加载遮罩 */
  const [isDrawingLoading, setIsDrawingLoading] = useState(false);

  /* =========================================================
     点击预览后显示加载遮罩

     说明：
     1. 点击后 iframe 才挂载
     2. iframe onLoad 后关闭加载层
     3. 兜底 1 秒后也会关闭加载层，避免 PDF Viewer onLoad 不稳定
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

            <em>如需下载，请添加至清单列表</em>
          </button>
        ) : (
          <iframe
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