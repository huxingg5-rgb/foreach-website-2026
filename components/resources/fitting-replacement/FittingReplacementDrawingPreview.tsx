"use client";

/* =========================================================
   FittingReplacementDrawingPreview.tsx
   恒永达官网｜全局 2D 图纸预览组件

   规则：
   1. 桌面端继续使用 iframe 内嵌 PDF
   2. 手机端使用 PDF.js 将 PDF 绘制到 Canvas
   3. 手机端完全不挂载 iframe、object 或 embed
   4. 后续所有复用本组件的 2D PDF 自动获得相同能力
========================================================= */

import { useEffect, useState } from "react";

import LoadingProgress from "@/components/common/LoadingProgress";
import MobilePdfCanvasViewer from "@/components/common/MobilePdfCanvasViewer";

const DRAWING_PREVIEW_LOADING_TIME = 1200;
const MOBILE_PDF_MEDIA_QUERY = "(max-width: 760px)";

interface FittingReplacementDrawingPreviewText {
  readonly title: string;
  readonly iframeTitle?: string;
  readonly loadingLabel: string;
  readonly previewButton: string;
  readonly description: string;
}

interface FittingReplacementDrawingPreviewProps {
  drawingPdfPreviewHref: string;
  productModel: string;
  text: FittingReplacementDrawingPreviewText;
}

type ViewerMode = "pending" | "mobile" | "desktop";

export default function FittingReplacementDrawingPreview({
  drawingPdfPreviewHref,
  productModel,
  text,
}: FittingReplacementDrawingPreviewProps) {
  const [isDrawingPreviewVisible, setIsDrawingPreviewVisible] = useState(false);
  const [isDrawingLoading, setIsDrawingLoading] = useState(true);
  const [viewerMode, setViewerMode] = useState<ViewerMode>("pending");

  useEffect(() => {
    const mediaQuery = window.matchMedia(MOBILE_PDF_MEDIA_QUERY);
    const updateViewerMode = () => {
      setViewerMode(mediaQuery.matches ? "mobile" : "desktop");
    };

    updateViewerMode();

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", updateViewerMode);
      return () => mediaQuery.removeEventListener("change", updateViewerMode);
    }

    mediaQuery.addListener(updateViewerMode);
    return () => mediaQuery.removeListener(updateViewerMode);
  }, []);

  useEffect(() => {
    setIsDrawingPreviewVisible(false);
    setIsDrawingLoading(true);
  }, [drawingPdfPreviewHref]);

  useEffect(() => {
    if (
      viewerMode !== "desktop" ||
      !isDrawingPreviewVisible ||
      !isDrawingLoading
    ) {
      return;
    }

    const loadingTimer = window.setTimeout(() => {
      setIsDrawingLoading(false);
    }, DRAWING_PREVIEW_LOADING_TIME);

    return () => window.clearTimeout(loadingTimer);
  }, [isDrawingLoading, isDrawingPreviewVisible, viewerMode]);

  const containsChinese = /[\u3400-\u9fff]/.test(
    `${text.loadingLabel}${text.previewButton}${text.description}`,
  );

  const mobileErrorLabel = containsChinese
    ? "图纸加载失败，请刷新页面后重试"
    : "Unable to load the drawing. Refresh the page and try again.";

  const mobilePageLabel = containsChinese ? "页" : "page";

  return (
    <section className="frd-drawing-section">
      <div className="frd-drawing-viewer">
        {viewerMode === "desktop" ? (
          <>
            <LoadingProgress
              active={isDrawingPreviewVisible && isDrawingLoading}
              label={text.loadingLabel}
            />

            <iframe
              key={drawingPdfPreviewHref}
              src={drawingPdfPreviewHref}
              className="frd-drawing-object is-visible"
              title={text.iframeTitle ?? `${productModel} 2D PDF drawing`}
              loading="eager"
              onLoad={() => {
                setIsDrawingLoading(false);
              }}
            />
          </>
        ) : null}

        {viewerMode === "mobile" && isDrawingPreviewVisible ? (
          <MobilePdfCanvasViewer
            pdfUrl={drawingPdfPreviewHref}
            documentTitle={productModel}
            loadingLabel={text.loadingLabel}
            errorLabel={mobileErrorLabel}
            pageLabel={mobilePageLabel}
          />
        ) : null}

        {viewerMode === "pending" && isDrawingPreviewVisible ? (
          <LoadingProgress active label={text.loadingLabel} />
        ) : null}

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
