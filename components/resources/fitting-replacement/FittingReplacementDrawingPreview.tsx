"use client";

/* =========================================================
   FittingReplacementDrawingPreview.tsx
   恒永达官网｜接头详情页 2D 图纸预览组件

   文件路径：
   components/resources/fitting-replacement/FittingReplacementDrawingPreview.tsx

   作用：
   1. 进入详情页后立即挂载 iframe，让 2D PDF 图纸提前加载
   2. 默认用“点击预览图纸”封面盖住 PDF
   3. 用户点击封面后，仅隐藏封面，不重新加载 PDF
   4. 不显示下载按钮
   5. 文案从详情页 detailText.drawingPreview 传入，支持多语言
========================================================= */

import { useEffect, useState } from "react";

import LoadingProgress from "@/components/common/LoadingProgress";

/* PDF 加载遮罩兜底时间 */
const DRAWING_PREVIEW_LOADING_TIME = 1200;

interface FittingReplacementDrawingPreviewText {
  readonly title: string;
  readonly loadingLabel: string;
  readonly previewButton: string;
  readonly description: string;
}

interface FittingReplacementDrawingPreviewProps {
  drawingPdfPreviewHref: string;
  productModel: string;
  text: FittingReplacementDrawingPreviewText;
}

export default function FittingReplacementDrawingPreview({
  drawingPdfPreviewHref,
  productModel,
  text,
}: FittingReplacementDrawingPreviewProps) {
  const [isDrawingPreviewVisible, setIsDrawingPreviewVisible] = useState(false);
  const [isDrawingLoading, setIsDrawingLoading] = useState(true);

  useEffect(() => {
    if (!isDrawingPreviewVisible || !isDrawingLoading) {
      return;
    }

    const loadingTimer = window.setTimeout(() => {
      setIsDrawingLoading(false);
    }, DRAWING_PREVIEW_LOADING_TIME);

    return () => {
      window.clearTimeout(loadingTimer);
    };
  }, [isDrawingPreviewVisible, isDrawingLoading]);

  return (
    <section className="frd-drawing-section">
<div className="frd-drawing-viewer">
        <LoadingProgress
          active={isDrawingPreviewVisible && isDrawingLoading}
          label={text.loadingLabel}
        />

        {/* 
          PDF iframe 始终挂载：
          1. 页面进入后立即开始加载 PDF
          2. 封面只是盖在上面
          3. 点击封面后隐藏封面，直接看到已加载的 PDF
        */}
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

        {!isDrawingPreviewVisible ? (
          <button
            className="frd-drawing-preview-card"
            type="button"
            onClick={() => {
              setIsDrawingPreviewVisible(true);
            }}
          >
            <span className="frd-drawing-play-icon" aria-hidden="true" />

            <strong>{text.previewButton}</strong>

            <em>{text.description}</em>
          </button>
        ) : null}
      </div>
    </section>
  );
} 