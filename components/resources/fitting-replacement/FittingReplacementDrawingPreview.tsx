"use client";

/* =========================================================
   公共 2D 图纸预览组件

   桌面端：
   继续使用 iframe 在线预览。

   手机端：
   使用 PDF.js 绘制 Canvas，
   不挂载 PDF iframe、object 或 embed。
========================================================= */

import {
  useEffect,
  useState,
} from "react";

import LoadingProgress from "@/components/common/LoadingProgress";
import MobilePdfCanvasViewer from "@/components/common/MobilePdfCanvasViewer";

const DRAWING_PREVIEW_LOADING_TIME =
  1200;

const MOBILE_PDF_MEDIA_QUERY =
  "(max-width: 760px)";

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

type ViewerMode =
  | "pending"
  | "mobile"
  | "desktop";

export default function FittingReplacementDrawingPreview({
  drawingPdfPreviewHref,
  productModel,
  text,
}: FittingReplacementDrawingPreviewProps) {
  const [
    isDrawingPreviewVisible,
    setIsDrawingPreviewVisible,
  ] = useState(false);

  const [
    isDrawingLoading,
    setIsDrawingLoading,
  ] = useState(true);

  const [
    viewerMode,
    setViewerMode,
  ] = useState<ViewerMode>(
    "pending"
  );

  useEffect(() => {
    const mediaQuery =
      window.matchMedia(
        MOBILE_PDF_MEDIA_QUERY
      );

    const updateViewerMode =
      () => {
        setViewerMode(
          mediaQuery.matches
            ? "mobile"
            : "desktop"
        );
      };

    updateViewerMode();

    if (
      typeof mediaQuery.addEventListener ===
      "function"
    ) {
      mediaQuery.addEventListener(
        "change",
        updateViewerMode
      );

      return () => {
        mediaQuery.removeEventListener(
          "change",
          updateViewerMode
        );
      };
    }

    mediaQuery.addListener(
      updateViewerMode
    );

    return () => {
      mediaQuery.removeListener(
        updateViewerMode
      );
    };
  }, []);

  useEffect(() => {
    const resetTimer =
      window.setTimeout(() => {
        setIsDrawingPreviewVisible(
          false
        );

        setIsDrawingLoading(
          true
        );
      }, 0);

    return () => {
      window.clearTimeout(
        resetTimer
      );
    };
  }, [drawingPdfPreviewHref]);

  useEffect(() => {
    if (
      viewerMode !== "desktop" ||
      !isDrawingPreviewVisible ||
      !isDrawingLoading
    ) {
      return;
    }

    const timer =
      window.setTimeout(() => {
        setIsDrawingLoading(
          false
        );
      }, DRAWING_PREVIEW_LOADING_TIME);

    return () => {
      window.clearTimeout(timer);
    };
  }, [
    isDrawingLoading,
    isDrawingPreviewVisible,
    viewerMode,
  ]);

  const containsChinese =
    /[\u3400-\u9fff]/.test(
      `${text.loadingLabel}${text.previewButton}${text.description}`
    );

  const errorLabel =
    containsChinese
      ? "图纸加载失败，请刷新页面后重试"
      : "Unable to load the drawing. Refresh the page and try again.";

  const pageLabel =
    containsChinese
      ? "页"
      : "page";

  const retryLabel =
    containsChinese
      ? "重新加载"
      : "Try again";

  return (
    <section className="frd-drawing-section">
      <div
        className="frd-drawing-viewer"
        data-mobile-canvas-active={
          viewerMode === "mobile" &&
          isDrawingPreviewVisible
            ? "true"
            : undefined
        }
        style={
          viewerMode === "mobile" &&
          isDrawingPreviewVisible
            ? {
                height: "auto",
                minHeight: 0,
                border: 0,
                background: "transparent",
                overflow: "visible",
              }
            : undefined
        }
      >
        {viewerMode === "desktop" ? (
          <>
            <LoadingProgress
              active={
                isDrawingPreviewVisible &&
                isDrawingLoading
              }
              label={
                text.loadingLabel
              }
            />

            <iframe
              key={
                drawingPdfPreviewHref
              }
              src={
                drawingPdfPreviewHref
              }
              className="frd-drawing-object is-visible"
              title={
                text.iframeTitle ??
                `${productModel} 2D PDF drawing`
              }
              loading="eager"
              onLoad={() => {
                setIsDrawingLoading(
                  false
                );
              }}
            />
          </>
        ) : null}

        {viewerMode === "mobile" &&
        isDrawingPreviewVisible ? (
          <MobilePdfCanvasViewer
            pdfUrl={
              drawingPdfPreviewHref
            }
            documentTitle={
              productModel
            }
            loadingLabel={
              text.loadingLabel
            }
            errorLabel={
              errorLabel
            }
            retryLabel={
              retryLabel
            }
            pageLabel={
              pageLabel
            }
          />
        ) : null}

        {viewerMode === "pending" &&
        isDrawingPreviewVisible ? (
          <LoadingProgress
            active
            label={
              text.loadingLabel
            }
          />
        ) : null}

        {!isDrawingPreviewVisible ? (
          <button
            className="frd-drawing-preview-card"
            type="button"
            onClick={() => {
              setIsDrawingPreviewVisible(
                true
              );
            }}
          >
            <span
              className="frd-drawing-play-icon"
              aria-hidden="true"
            />

            <strong>
              {text.previewButton}
            </strong>

            <em>
              {text.description}
            </em>
          </button>
        ) : null}
      </div>
    </section>
  );
}
