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
  useRef,
  useState,
} from "react";

import LoadingProgress from "@/components/common/LoadingProgress";
import MobilePdfCanvasViewer from "@/components/common/MobilePdfCanvasViewer";

const DESKTOP_PDF_LOADING_TIMEOUT_MS =
  15000;

const DESKTOP_PDF_SETTLE_TIME_MS =
  500;

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
  initiallyVisible?: boolean;
  previewHref?: string;
  deferDesktopUntilOpen?: boolean;
  showPreviewDescription?: boolean;
  analyticsResourceId?: string;
  analyticsResourceType?: string;
  analyticsSection?: string;
  previousPageLabel?: string;
  nextPageLabel?: string;
  previousPageVisibleLabel?: string;
  nextPageVisibleLabel?: string;
}

type ViewerMode =
  | "pending"
  | "mobile"
  | "desktop";

export default function FittingReplacementDrawingPreview({
  drawingPdfPreviewHref,
  productModel,
  text,
  initiallyVisible = false,
  previewHref,
  deferDesktopUntilOpen = false,
  showPreviewDescription = true,
  analyticsResourceId = `2d_drawing:${productModel.trim()}`,
  analyticsResourceType = "2d_drawing",
  analyticsSection = "product_drawing_preview",
  previousPageLabel,
  nextPageLabel,
  previousPageVisibleLabel,
  nextPageVisibleLabel,
}: FittingReplacementDrawingPreviewProps) {
  const desktopLoadSettleTimerRef =
    useRef<number | null>(null);

  const [
    isDrawingPreviewVisible,
    setIsDrawingPreviewVisible,
  ] = useState(initiallyVisible);

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

    // 首次进入页面时确定渲染方式，之后不再因 PC 浏览器缩放
    // 或窗口宽度变化卸载 iframe 并切换到手机 Canvas。
    const modeTimer =
      window.setTimeout(() => {
        setViewerMode(
          mediaQuery.matches
            ? "mobile"
            : "desktop"
        );
      }, 0);

    return () => {
      window.clearTimeout(modeTimer);
    };
  }, []);

  useEffect(() => {
    const resetTimer =
      window.setTimeout(() => {
        if (
          desktopLoadSettleTimerRef.current !==
          null
        ) {
          window.clearTimeout(
            desktopLoadSettleTimerRef.current
          );
          desktopLoadSettleTimerRef.current =
            null;
        }

        setIsDrawingPreviewVisible(
          initiallyVisible
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
  }, [drawingPdfPreviewHref, initiallyVisible]);

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
      }, DESKTOP_PDF_LOADING_TIMEOUT_MS);

    return () => {
      window.clearTimeout(timer);
    };
  }, [
    isDrawingLoading,
    isDrawingPreviewVisible,
    viewerMode,
  ]);

  useEffect(() => {
    return () => {
      if (
        desktopLoadSettleTimerRef.current !==
        null
      ) {
        window.clearTimeout(
          desktopLoadSettleTimerRef.current
        );
      }
    };
  }, []);

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

  const resolvedPreviousPageLabel =
    previousPageLabel ||
    (containsChinese
      ? "上一页"
      : "Previous page");

  const resolvedNextPageLabel =
    nextPageLabel ||
    (containsChinese
      ? "下一页"
      : "Next page");

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
        {viewerMode === "desktop" &&
        (!deferDesktopUntilOpen || isDrawingPreviewVisible) ? (
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
                if (
                  desktopLoadSettleTimerRef.current !==
                  null
                ) {
                  window.clearTimeout(
                    desktopLoadSettleTimerRef.current
                  );
                }

                desktopLoadSettleTimerRef.current =
                  window.setTimeout(() => {
                    setIsDrawingLoading(
                      false
                    );
                    desktopLoadSettleTimerRef.current =
                      null;
                  }, DESKTOP_PDF_SETTLE_TIME_MS);
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
            previousPageLabel={
              resolvedPreviousPageLabel
            }
            nextPageLabel={
              resolvedNextPageLabel
            }
            previousPageVisibleLabel={
              previousPageVisibleLabel
            }
            nextPageVisibleLabel={
              nextPageVisibleLabel
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
          previewHref ? (
            <a
              className="frd-drawing-preview-card"
              href={previewHref}
              data-analytics-resource-action="view"
              data-analytics-resource-id={analyticsResourceId}
              data-analytics-resource-type={analyticsResourceType}
              data-analytics-resource-file-type="pdf"
              data-analytics-section={analyticsSection}
              onClick={(event) => {
                event.preventDefault();
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

              {showPreviewDescription && text.description ? (
                <em>
                  {text.description}
                </em>
              ) : null}
            </a>
          ) : (
            <button
              className="frd-drawing-preview-card"
              type="button"
              data-analytics-resource-action="view"
              data-analytics-resource-id={analyticsResourceId}
              data-analytics-resource-type={analyticsResourceType}
              data-analytics-resource-file-type="pdf"
              data-analytics-section={analyticsSection}
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

              {showPreviewDescription && text.description ? (
                <em>
                  {text.description}
                </em>
              ) : null}
            </button>
          )
        ) : null}
      </div>
    </section>
  );
}
