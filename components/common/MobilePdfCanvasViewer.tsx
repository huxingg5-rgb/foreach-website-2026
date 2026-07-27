"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";
import type {
  PDFDocumentLoadingTask,
  PDFDocumentProxy,
  RenderTask,
} from "pdfjs-dist";

import styles from "./MobilePdfCanvasViewer.module.css";

type MobilePdfCanvasViewerProps = {
  pdfUrl: string;
  documentTitle: string;
  loadingLabel?: string;
  errorLabel?: string;
  retryLabel?: string;
  pageLabel?: string;
};

type ViewerStatus =
  | "loading"
  | "ready"
  | "error";

const PDF_LOAD_TIMEOUT_MS = 60000;
const PDF_FETCH_CHUNK_SIZE =
  256 * 1024;
const PDF_RANGE_RETRY_COUNT = 3;
const MAX_PDF_PREVIEW_BYTES =
  64 * 1024 * 1024;

function removePdfHash(
  pdfUrl: string
): string {
  const hashIndex =
    pdfUrl.indexOf("#");

  return hashIndex === -1
    ? pdfUrl
    : pdfUrl.slice(0, hashIndex);
}

function resolveLocalPdfApiUrl(
  pdfUrl: string
): string | null {
  const cleanPdfUrl =
    removePdfHash(pdfUrl);

  if (
    typeof window ===
    "undefined"
  ) {
    return null;
  }

  const hostname =
    window.location.hostname.toLowerCase();

  const isLocalHost =
    hostname === "localhost" ||
    hostname === "127.0.0.1" ||
    hostname === "::1";

  if (!isLocalHost) {
    return null;
  }

  try {
    const resolvedUrl =
      new URL(
        cleanPdfUrl,
        window.location.href
      );

    if (
      resolvedUrl.origin !==
        window.location.origin ||
      !resolvedUrl.pathname
        .toLowerCase()
        .endsWith(".pdf")
    ) {
      return null;
    }

    return (
      "/api/pdf-preview/?path=" +
      encodeURIComponent(
        resolvedUrl.pathname
      )
    );
  }
  catch {
    return null;
  }
}

type LocalPdfPayload = {
  byteLength?: unknown;
  data?: unknown;
};

async function fetchLocalPdfBytes(
  requestUrl: string,
  signal: AbortSignal
): Promise<Uint8Array> {
  const response =
    await fetch(
      requestUrl,
      {
        cache: "no-store",
        credentials:
          "same-origin",
        signal,
      }
    );

  if (!response.ok) {
    throw new Error(
      `Unable to fetch local PDF: ${response.status} ${response.statusText}`
    );
  }

  const payload =
    (await response.json()) as
      LocalPdfPayload;

  if (
    typeof payload.data !==
      "string" ||
    typeof payload.byteLength !==
      "number" ||
    !Number.isSafeInteger(
      payload.byteLength
    ) ||
    payload.byteLength <= 0 ||
    payload.byteLength >
      MAX_PDF_PREVIEW_BYTES
  ) {
    throw new Error(
      "Invalid local PDF payload."
    );
  }

  const binaryText =
    window.atob(payload.data);

  if (
    binaryText.length !==
    payload.byteLength
  ) {
    throw new Error(
      "Incomplete local PDF payload."
    );
  }

  const pdfBytes =
    new Uint8Array(
      payload.byteLength
    );

  for (
    let index = 0;
    index < binaryText.length;
    index += 1
  ) {
    pdfBytes[index] =
      binaryText.charCodeAt(index);
  }

  return pdfBytes;
}

type ParsedContentRange = {
  start: number;
  end: number;
  total: number;
};

function parseContentRange(
  value: string | null
): ParsedContentRange | null {
  if (!value) {
    return null;
  }

  const match =
    /^bytes\s+(\d+)-(\d+)\/(\d+)$/i.exec(
      value.trim()
    );

  if (!match) {
    return null;
  }

  return {
    start: Number(match[1]),
    end: Number(match[2]),
    total: Number(match[3]),
  };
}

async function fetchPdfBytes(
  pdfUrl: string,
  signal: AbortSignal
): Promise<Uint8Array> {
  const cleanPdfUrl =
    removePdfHash(pdfUrl);

  const localPdfApiUrl =
    resolveLocalPdfApiUrl(
      cleanPdfUrl
    );

  if (localPdfApiUrl) {
    try {
      return await fetchLocalPdfBytes(
        localPdfApiUrl,
        signal
      );
    }
    catch (error) {
      if (signal.aborted) {
        throw error;
      }

      console.warn(
        "本地 PDF 文本接口失败，回退到静态资源读取：",
        error
      );
    }
  }

  const requestUrl =
    cleanPdfUrl;

  async function requestRange(
    start: number,
    end: number
  ) {
    let lastError: unknown = null;

    for (
      let attempt = 0;
      attempt <
        PDF_RANGE_RETRY_COUNT;
      attempt += 1
    ) {
      try {
        const response =
          await fetch(
            requestUrl,
            {
              cache: "no-store",
              credentials:
                "same-origin",
              headers: {
                Range:
                  `bytes=${start}-${end}`,
              },
              signal,
            }
          );

        const bytes =
          new Uint8Array(
            await response.arrayBuffer()
          );

        return {
          response,
          bytes,
        };
      }
      catch (error) {
        if (signal.aborted) {
          throw error;
        }

        lastError = error;
      }
    }

    throw (
      lastError ??
      new Error(
        "Unable to read PDF range."
      )
    );
  }

  /*
   * 正式静态资源优先使用 HTTP Range 分段重组，兼容大文件，
   * 并避免移动浏览器直接导航 PDF 时触发下载窗口。
   */
  const firstResult =
    await requestRange(
      0,
      PDF_FETCH_CHUNK_SIZE - 1
    );

  const firstResponse =
    firstResult.response;

  if (firstResponse.status === 200) {
    const fullBytes =
      firstResult.bytes;

    if (
      fullBytes.byteLength >
      MAX_PDF_PREVIEW_BYTES
    ) {
      throw new Error(
        "PDF exceeds the mobile preview size limit."
      );
    }

    return fullBytes;
  }

  if (firstResponse.status !== 206) {
    throw new Error(
      `Unable to fetch PDF: ${firstResponse.status} ${firstResponse.statusText}`
    );
  }

  const firstRange =
    parseContentRange(
      firstResponse.headers.get(
        "Content-Range"
      )
    );

  if (
    !firstRange ||
    firstRange.start !== 0 ||
    firstRange.total <= 0 ||
    firstRange.total >
      MAX_PDF_PREVIEW_BYTES
  ) {
    throw new Error(
      "Invalid PDF range response."
    );
  }

  const pdfBytes =
    new Uint8Array(
      firstRange.total
    );

  const firstChunk =
    firstResult.bytes;

  if (
    firstChunk.byteLength !==
    firstRange.end -
      firstRange.start +
      1
  ) {
    throw new Error(
      "Incomplete first PDF range."
    );
  }

  pdfBytes.set(
    firstChunk,
    firstRange.start
  );

  let nextStart =
    firstRange.end + 1;

  while (
    nextStart <
    firstRange.total
  ) {
    const nextEnd =
      Math.min(
        nextStart +
          PDF_FETCH_CHUNK_SIZE -
          1,
        firstRange.total - 1
      );

    const rangeResult =
      await requestRange(
        nextStart,
        nextEnd
      );

    const response =
      rangeResult.response;

    if (response.status !== 206) {
      throw new Error(
        `Unable to fetch PDF range: ${response.status} ${response.statusText}`
      );
    }

    const contentRange =
      parseContentRange(
        response.headers.get(
          "Content-Range"
        )
      );

    if (
      !contentRange ||
      contentRange.start !==
        nextStart ||
      contentRange.end !==
        nextEnd ||
      contentRange.total !==
        firstRange.total
    ) {
      throw new Error(
        "Unexpected PDF range response."
      );
    }

    const chunk =
      rangeResult.bytes;

    if (
      chunk.byteLength !==
      nextEnd -
        nextStart +
        1
    ) {
      throw new Error(
        "Incomplete PDF range."
      );
    }

    pdfBytes.set(
      chunk,
      nextStart
    );

    nextStart =
      nextEnd + 1;
  }

  return pdfBytes;
}

export default function MobilePdfCanvasViewer({
  pdfUrl,
  documentTitle,
  loadingLabel = "图纸加载中",
  errorLabel = "图纸加载失败，请刷新页面后重试",
  retryLabel = "重新加载",
  pageLabel = "页",
}: MobilePdfCanvasViewerProps) {
  const viewerRef =
    useRef<HTMLDivElement | null>(null);

  const pagesRef =
    useRef<HTMLDivElement | null>(null);

  const [viewerWidth, setViewerWidth] =
    useState(0);

  const [status, setStatus] =
    useState<ViewerStatus>("loading");

  const [progressText, setProgressText] =
    useState("");

  const [retryVersion, setRetryVersion] =
    useState(0);

  useEffect(() => {
    const viewer = viewerRef.current;

    if (!viewer) {
      return;
    }

    const updateWidth = () => {
      const width = Math.floor(
        viewer.getBoundingClientRect().width
      );

      if (width > 0) {
        setViewerWidth((current) =>
          current === width
            ? current
            : width
        );
      }
    };

    updateWidth();

    if (
      typeof ResizeObserver !==
      "undefined"
    ) {
      const observer =
        new ResizeObserver(updateWidth);

      observer.observe(viewer);

      return () => {
        observer.disconnect();
      };
    }

    window.addEventListener(
      "resize",
      updateWidth
    );

    return () => {
      window.removeEventListener(
        "resize",
        updateWidth
      );
    };
  }, []);

  useEffect(() => {
    const pagesRoot = pagesRef.current;

    if (
      !pagesRoot ||
      viewerWidth <= 0
    ) {
      return;
    }

    // 保存经过空值检查的容器引用，供异步渲染流程使用。
    const pagesContainer = pagesRoot;

    let cancelled = false;
    let loadingTask:
      | PDFDocumentLoadingTask
      | null = null;

    let pdfDocument:
      | PDFDocumentProxy
      | null = null;

    let activeRenderTask:
      | RenderTask
      | null = null;
    let fetchTimeoutId: number | null =
      null;

    const fetchAbortController =
      new AbortController();

    pagesContainer.replaceChildren();

    setStatus("loading");
    setProgressText("");

    async function renderPdf() {
      try {
        const pdfjs =
          await import(
            "pdfjs-dist/legacy/build/pdf.mjs"
          );

        pdfjs.GlobalWorkerOptions.workerSrc =
          "/pdfjs/pdf.worker.min.mjs";

        /*
         * 先完整读取 PDF，再交给 PDF.js。
         * 避免手机端或 Next.js 开发服务器处理 Range / 206
         * 分段请求时出现 Partial Content network error。
         */
        fetchTimeoutId =
          window.setTimeout(() => {
            fetchAbortController.abort();
          }, PDF_LOAD_TIMEOUT_MS);

        const pdfBytes =
          await fetchPdfBytes(
            pdfUrl,
            fetchAbortController.signal
          );

        loadingTask =
          pdfjs.getDocument({
            data: pdfBytes,
          });

        pdfDocument =
          await loadingTask.promise;

        if (cancelled) {
          return;
        }

        const totalPages =
          pdfDocument.numPages;

        for (
          let pageNumber = 1;
          pageNumber <= totalPages;
          pageNumber += 1
        ) {
          if (cancelled) {
            return;
          }

          setProgressText(
            `${pageNumber} / ${totalPages} ${pageLabel}`
          );

          const pdfPage =
            await pdfDocument.getPage(
              pageNumber
            );

          const originalViewport =
            pdfPage.getViewport({
              scale: 1,
            });

          // 始终服从手机容器宽度，避免窄屏被最小宽度撑出横向滚动。
          const availableWidth =
            Math.max(
              1,
              viewerWidth - 26
            );

          const cssScale =
            availableWidth /
            originalViewport.width;

          const outputScale =
            Math.min(
              window.devicePixelRatio || 1,
              2
            );

          const renderViewport =
            pdfPage.getViewport({
              scale:
                cssScale *
                outputScale,
            });

          const cssWidth =
            Math.ceil(
              renderViewport.width /
                outputScale
            );

          const cssHeight =
            Math.ceil(
              renderViewport.height /
                outputScale
            );

          const pageElement =
            document.createElement(
              "article"
            );

          pageElement.className =
            styles.page;

          pageElement.setAttribute(
            "aria-label",
            `${documentTitle} ${pageNumber} / ${totalPages} ${pageLabel}`
          );

          const pageNumberElement =
            document.createElement(
              "div"
            );

          pageNumberElement.className =
            styles.pageNumber;

          pageNumberElement.textContent =
            `${pageNumber} / ${totalPages}`;

          const canvas =
            document.createElement(
              "canvas"
            );

          canvas.className =
            styles.canvas;

          canvas.width =
            Math.ceil(
              renderViewport.width
            );

          canvas.height =
            Math.ceil(
              renderViewport.height
            );

          canvas.style.width =
            `${cssWidth}px`;

          canvas.style.height =
            `${cssHeight}px`;

          const canvasContext =
            canvas.getContext(
              "2d",
              {
                alpha: false,
              }
            );

          if (!canvasContext) {
            throw new Error(
              "Canvas 2D context unavailable."
            );
          }

          pageElement.appendChild(
            pageNumberElement
          );

          pageElement.appendChild(
            canvas
          );

          pagesContainer.appendChild(
            pageElement
          );

          activeRenderTask =
            pdfPage.render({
              canvasContext,
              viewport:
                renderViewport,
            });

          await activeRenderTask.promise;

          activeRenderTask = null;

          pdfPage.cleanup();
        }

        if (!cancelled) {
          setStatus("ready");
          setProgressText("");
        }
      }
      catch (error) {
        if (cancelled) {
          return;
        }

        console.error(
          "手机端 PDF 图纸渲染失败：",
          error
        );

        setStatus("error");
        setProgressText("");
      }
      finally {
        if (fetchTimeoutId !== null) {
          window.clearTimeout(
            fetchTimeoutId
          );

          fetchTimeoutId = null;
        }
      }
    }

    void renderPdf();

    return () => {
      cancelled = true;
      fetchAbortController.abort();

      if (fetchTimeoutId !== null) {
        window.clearTimeout(
          fetchTimeoutId
        );
      }

      if (
        activeRenderTask &&
        typeof activeRenderTask.cancel ===
          "function"
      ) {
        try {
          activeRenderTask.cancel();
        }
        catch {
          // 忽略卸载期间的取消错误。
        }
      }

      pagesContainer.replaceChildren();

      if (
        pdfDocument &&
        typeof pdfDocument.destroy ===
          "function"
      ) {
        void pdfDocument.destroy();
      }
      else if (
        loadingTask &&
        typeof loadingTask.destroy ===
          "function"
      ) {
        void loadingTask.destroy();
      }
    };
  }, [
    documentTitle,
    pageLabel,
    pdfUrl,
    retryVersion,
    viewerWidth,
  ]);

  return (
    <div
      ref={viewerRef}
      className={styles.viewer}
      data-mobile-pdf-canvas-viewer="true"
    >
      {status === "loading" ? (
        <div
          className={styles.status}
          role="status"
          aria-live="polite"
        >
          <span
            className={styles.spinner}
            aria-hidden="true"
          />

          <strong>
            {loadingLabel}
          </strong>

          {progressText ? (
            <small>
              {progressText}
            </small>
          ) : null}
        </div>
      ) : null}

      {status === "error" ? (
        <div
          className={styles.error}
          role="alert"
        >
          <p>{errorLabel}</p>

          <button
            type="button"
            onClick={() => {
              setRetryVersion(
                (current) =>
                  current + 1
              );
            }}
          >
            {retryLabel}
          </button>
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
