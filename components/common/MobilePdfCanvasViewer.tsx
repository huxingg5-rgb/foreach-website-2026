"use client";

import { useEffect, useRef, useState } from "react";

import styles from "./MobilePdfCanvasViewer.module.css";

const PDFJS_VERSION = "4.10.38";
const PDFJS_MODULE_URL = `https://cdn.jsdelivr.net/npm/pdfjs-dist@${PDFJS_VERSION}/build/pdf.min.mjs`;
const PDFJS_WORKER_URL = `https://cdn.jsdelivr.net/npm/pdfjs-dist@${PDFJS_VERSION}/build/pdf.worker.min.mjs`;
const PDFJS_READY_EVENT = "foreach:pdfjs-ready";

type PdfJsModule = {
  GlobalWorkerOptions: {
    workerSrc: string;
  };
  getDocument: (options: Record<string, unknown>) => {
    promise: Promise<any>;
    destroy?: () => Promise<void>;
  };
};

type PdfJsWindow = Window &
  typeof globalThis & {
    __foreachPdfJs?: PdfJsModule;
  };

type MobilePdfCanvasViewerProps = {
  pdfUrl: string;
  documentTitle: string;
  loadingLabel?: string;
  errorLabel?: string;
  pageLabel?: string;
};

type ViewerStatus = "loading" | "ready" | "error";

let pdfJsPromise: Promise<PdfJsModule> | null = null;

function removePdfHash(pdfUrl: string): string {
  const hashIndex = pdfUrl.indexOf("#");
  return hashIndex === -1 ? pdfUrl : pdfUrl.slice(0, hashIndex);
}

function loadPdfJs(): Promise<PdfJsModule> {
  if (pdfJsPromise) {
    return pdfJsPromise;
  }

  pdfJsPromise = new Promise<PdfJsModule>((resolve, reject) => {
    const browserWindow = window as PdfJsWindow;

    if (browserWindow.__foreachPdfJs) {
      resolve(browserWindow.__foreachPdfJs);
      return;
    }

    const handleReady = () => {
      const pdfjs = browserWindow.__foreachPdfJs;

      if (!pdfjs) {
        reject(new Error("PDF.js loaded without exposing its module."));
        return;
      }

      pdfjs.GlobalWorkerOptions.workerSrc = PDFJS_WORKER_URL;
      resolve(pdfjs);
    };

    browserWindow.addEventListener(PDFJS_READY_EVENT, handleReady, {
      once: true,
    });

    const moduleSource = [
      `import * as pdfjs from ${JSON.stringify(PDFJS_MODULE_URL)};`,
      "window.__foreachPdfJs = pdfjs;",
      `window.dispatchEvent(new Event(${JSON.stringify(PDFJS_READY_EVENT)}));`,
    ].join("\n");

    const moduleUrl = URL.createObjectURL(
      new Blob([moduleSource], { type: "text/javascript" }),
    );

    const script = document.createElement("script");
    script.type = "module";
    script.src = moduleUrl;
    script.dataset.foreachPdfjsLoader = "true";

    script.addEventListener(
      "load",
      () => {
        URL.revokeObjectURL(moduleUrl);
      },
      { once: true },
    );

    script.addEventListener(
      "error",
      () => {
        browserWindow.removeEventListener(PDFJS_READY_EVENT, handleReady);
        URL.revokeObjectURL(moduleUrl);
        pdfJsPromise = null;
        reject(new Error("Unable to load PDF.js."));
      },
      { once: true },
    );

    document.head.appendChild(script);
  });

  return pdfJsPromise;
}

export default function MobilePdfCanvasViewer({
  pdfUrl,
  documentTitle,
  loadingLabel = "图纸加载中",
  errorLabel = "图纸加载失败，请刷新页面后重试",
  pageLabel = "页",
}: MobilePdfCanvasViewerProps) {
  const viewerRef = useRef<HTMLDivElement | null>(null);
  const pagesRef = useRef<HTMLDivElement | null>(null);
  const [viewerWidth, setViewerWidth] = useState(0);
  const [status, setStatus] = useState<ViewerStatus>("loading");
  const [progressText, setProgressText] = useState("");

  useEffect(() => {
    const viewer = viewerRef.current;

    if (!viewer) {
      return;
    }

    const updateWidth = () => {
      const nextWidth = Math.floor(viewer.getBoundingClientRect().width);

      if (nextWidth > 0) {
        setViewerWidth((currentWidth) =>
          currentWidth === nextWidth ? currentWidth : nextWidth,
        );
      }
    };

    updateWidth();

    if (typeof ResizeObserver !== "undefined") {
      const observer = new ResizeObserver(updateWidth);
      observer.observe(viewer);
      return () => observer.disconnect();
    }

    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  useEffect(() => {
    const pagesRoot = pagesRef.current;

    if (!pagesRoot || viewerWidth <= 0) {
      return;
    }

    let cancelled = false;
    let loadingTask: any = null;
    let pdfDocument: any = null;
    let activeRenderTask: any = null;

    pagesRoot.replaceChildren();
    setStatus("loading");
    setProgressText("");

    async function renderPdf() {
      try {
        const pdfjs = await loadPdfJs();

        if (cancelled) {
          return;
        }

        loadingTask = pdfjs.getDocument({
          url: removePdfHash(pdfUrl),
          withCredentials: false,
        });

        pdfDocument = await loadingTask.promise;

        if (cancelled) {
          return;
        }

        const totalPages = pdfDocument.numPages;

        for (let pageNumber = 1; pageNumber <= totalPages; pageNumber += 1) {
          if (cancelled) {
            return;
          }

          setProgressText(`${pageNumber} / ${totalPages} ${pageLabel}`);

          const pdfPage = await pdfDocument.getPage(pageNumber);
          const originalViewport = pdfPage.getViewport({ scale: 1 });
          const availableWidth = Math.max(260, viewerWidth - 24);
          const cssScale = availableWidth / originalViewport.width;
          const outputScale = Math.min(window.devicePixelRatio || 1, 2);
          const renderViewport = pdfPage.getViewport({
            scale: cssScale * outputScale,
          });
          const cssWidth = Math.ceil(renderViewport.width / outputScale);
          const cssHeight = Math.ceil(renderViewport.height / outputScale);

          const pageWrapper = document.createElement("article");
          pageWrapper.className = styles.page;
          pageWrapper.setAttribute(
            "aria-label",
            `${documentTitle} ${pageNumber} / ${totalPages} ${pageLabel}`,
          );

          const pageNumberElement = document.createElement("div");
          pageNumberElement.className = styles.pageNumber;
          pageNumberElement.textContent = `${pageNumber} / ${totalPages}`;

          const canvas = document.createElement("canvas");
          canvas.className = styles.canvas;
          canvas.width = Math.ceil(renderViewport.width);
          canvas.height = Math.ceil(renderViewport.height);
          canvas.style.width = `${cssWidth}px`;
          canvas.style.height = `${cssHeight}px`;

          const canvasContext = canvas.getContext("2d", { alpha: false });

          if (!canvasContext) {
            throw new Error("Canvas 2D context is unavailable.");
          }

          pageWrapper.append(pageNumberElement, canvas);
          pagesRoot.appendChild(pageWrapper);

          activeRenderTask = pdfPage.render({
            canvasContext,
            viewport: renderViewport,
          });

          await activeRenderTask.promise;
          activeRenderTask = null;
          pdfPage.cleanup();
        }

        if (!cancelled) {
          setStatus("ready");
          setProgressText("");
        }
      } catch (error) {
        if (!cancelled) {
          console.error("手机端 PDF 图纸渲染失败：", error);
          setStatus("error");
          setProgressText("");
        }
      }
    }

    void renderPdf();

    return () => {
      cancelled = true;

      if (activeRenderTask?.cancel) {
        try {
          activeRenderTask.cancel();
        } catch {
          // 组件卸载时忽略取消错误。
        }
      }

      pagesRoot.replaceChildren();

      if (pdfDocument?.destroy) {
        void pdfDocument.destroy();
      } else if (loadingTask?.destroy) {
        void loadingTask.destroy();
      }
    };
  }, [documentTitle, pageLabel, pdfUrl, viewerWidth]);

  return (
    <div
      ref={viewerRef}
      className={styles.viewer}
      data-mobile-pdf-canvas-viewer="true"
    >
      {status === "loading" ? (
        <div className={styles.status} role="status" aria-live="polite">
          <span className={styles.spinner} aria-hidden="true" />
          <strong>{loadingLabel}</strong>
          {progressText ? <small>{progressText}</small> : null}
        </div>
      ) : null}

      {status === "error" ? (
        <div className={styles.error} role="alert">
          {errorLabel}
        </div>
      ) : null}

      <div
        ref={pagesRef}
        className={styles.pages}
        aria-label={documentTitle}
      />
    </div>
  );
}
