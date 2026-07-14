const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");

const projectRoot = process.cwd();
const componentPath = path.join(
  projectRoot,
  "components",
  "common",
  "PdfDrawingPreview.tsx",
);
const cssPath = path.join(
  projectRoot,
  "components",
  "common",
  "PdfDrawingPreview.module.css",
);
const packageJsonPath = path.join(projectRoot, "package.json");
const publicWorkerPath = path.join(projectRoot, "public", "pdf.worker.min.mjs");

for (const filePath of [componentPath, cssPath, packageJsonPath]) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`未找到文件：${filePath}`);
  }
}

const now = new Date();
const pad = (value) => String(value).padStart(2, "0");
const stamp =
  `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}_` +
  `${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}`;

function backup(filePath) {
  const backupPath = `${filePath}.bak_mobile_pdfjs_${stamp}`;
  fs.copyFileSync(filePath, backupPath);
  console.log(`已备份：${path.relative(projectRoot, backupPath)}`);
}

function ensurePdfJsInstalled() {
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));
  const hasPdfJs =
    Boolean(packageJson.dependencies?.["pdfjs-dist"]) ||
    Boolean(packageJson.devDependencies?.["pdfjs-dist"]);

  if (hasPdfJs && fs.existsSync(path.join(projectRoot, "node_modules", "pdfjs-dist"))) {
    console.log("pdfjs-dist 已安装。");
    return;
  }

  console.log("");
  console.log("正在安装手机端 PDF 在线预览依赖：pdfjs-dist");
  console.log("");

  const npmCommand = process.platform === "win32" ? "npm.cmd" : "npm";
  const result = spawnSync(
    npmCommand,
    ["install", "pdfjs-dist", "--save"],
    {
      cwd: projectRoot,
      stdio: "inherit",
      shell: false,
    },
  );

  if (result.status !== 0) {
    throw new Error(
      "pdfjs-dist 安装失败，尚未修改组件文件。请检查网络或 npm 配置后重试。",
    );
  }
}

function copyPdfWorker() {
  const candidates = [
    path.join(
      projectRoot,
      "node_modules",
      "pdfjs-dist",
      "build",
      "pdf.worker.min.mjs",
    ),
    path.join(
      projectRoot,
      "node_modules",
      "pdfjs-dist",
      "legacy",
      "build",
      "pdf.worker.min.mjs",
    ),
  ];

  const workerSource = candidates.find((candidate) => fs.existsSync(candidate));

  if (!workerSource) {
    throw new Error(
      "已安装 pdfjs-dist，但没有找到 pdf.worker.min.mjs。请检查 node_modules/pdfjs-dist。",
    );
  }

  fs.mkdirSync(path.dirname(publicWorkerPath), { recursive: true });
  fs.copyFileSync(workerSource, publicWorkerPath);

  console.log(
    `已复制 PDF Worker：${path.relative(projectRoot, publicWorkerPath)}`,
  );
}

/* =========================================================
 * 1. 安装依赖并准备 Worker
 * ======================================================= */

ensurePdfJsInstalled();
copyPdfWorker();

/* =========================================================
 * 2. 备份原文件
 * ======================================================= */

backup(componentPath);
backup(cssPath);

/* =========================================================
 * 3. 重写公共 PDF 图纸预览组件
 *
 * PC：
 * - 继续使用浏览器原生 iframe
 * - 只有点击预览按钮后才挂载 iframe
 *
 * 手机：
 * - 完全不挂载 iframe / object / embed
 * - 使用 PDF.js 将 PDF 渲染到 canvas
 * - 因此不会再触发手机浏览器下载界面
 * ======================================================= */

const componentSource = `"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import styles from "./PdfDrawingPreview.module.css";

type PdfDrawingPreviewProps = {
  pdfPreviewUrl: string;
  documentTitle?: string;
};

type ViewportMode = "pending" | "mobile" | "desktop";
type MobileRenderStatus = "idle" | "loading" | "ready" | "error";

function stripPdfFragment(url: string): string {
  return String(url || "").split("#")[0].trim();
}

function getPreviewCopy() {
  if (typeof document === "undefined") {
    return {
      preview: "预览零件图",
      loading: "零件图加载中…",
      failed: "零件图暂时无法在线显示",
      open: "在新窗口打开零件图",
      description: "点击后在线查看 PDF 零件图",
    };
  }

  const language = document.documentElement.lang.toLowerCase();

  if (language.startsWith("en")) {
    return {
      preview: "Preview Drawing",
      loading: "Loading drawing…",
      failed: "The drawing cannot be displayed online right now.",
      open: "Open drawing in a new window",
      description: "Click to preview the PDF drawing online.",
    };
  }

  if (language.startsWith("es")) {
    return {
      preview: "Vista previa del plano",
      loading: "Cargando plano…",
      failed: "El plano no se puede mostrar en línea en este momento.",
      open: "Abrir el plano en una nueva ventana",
      description: "Haga clic para ver el plano PDF en línea.",
    };
  }

  if (language.startsWith("fr")) {
    return {
      preview: "Aperçu du plan",
      loading: "Chargement du plan…",
      failed: "Le plan ne peut pas être affiché en ligne pour le moment.",
      open: "Ouvrir le plan dans une nouvelle fenêtre",
      description: "Cliquez pour prévisualiser le plan PDF en ligne.",
    };
  }

  if (language.startsWith("ko")) {
    return {
      preview: "도면 미리보기",
      loading: "도면을 불러오는 중…",
      failed: "현재 도면을 온라인으로 표시할 수 없습니다.",
      open: "새 창에서 도면 열기",
      description: "PDF 도면을 온라인으로 보려면 클릭하세요.",
    };
  }

  if (language.startsWith("ru")) {
    return {
      preview: "Предпросмотр чертежа",
      loading: "Загрузка чертежа…",
      failed: "Сейчас чертёж невозможно показать онлайн.",
      open: "Открыть чертёж в новом окне",
      description: "Нажмите, чтобы открыть PDF-чертёж онлайн.",
    };
  }

  return {
    preview: "预览零件图",
    loading: "零件图加载中…",
    failed: "零件图暂时无法在线显示",
    open: "在新窗口打开零件图",
    description: "点击后在线查看 PDF 零件图",
  };
}

export default function PdfDrawingPreview({
  pdfPreviewUrl,
  documentTitle = "产品零件图",
}: PdfDrawingPreviewProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const mobilePagesRef = useRef<HTMLDivElement | null>(null);

  const [viewportMode, setViewportMode] =
    useState<ViewportMode>("pending");
  const [isVisible, setIsVisible] = useState(false);
  const [desktopPreviewOpen, setDesktopPreviewOpen] = useState(false);
  const [mobileStatus, setMobileStatus] =
    useState<MobileRenderStatus>("idle");

  const rawPdfUrl = useMemo(
    () => stripPdfFragment(pdfPreviewUrl),
    [pdfPreviewUrl],
  );

  const desktopPdfUrl = useMemo(() => {
    if (!rawPdfUrl) {
      return "";
    }

    return \`\${rawPdfUrl}#toolbar=0&navpanes=0&scrollbar=1\`;
  }, [rawPdfUrl]);

  const copy = getPreviewCopy();

  useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)");

    const updateViewportMode = () => {
      setViewportMode(media.matches ? "mobile" : "desktop");
    };

    updateViewportMode();
    media.addEventListener?.("change", updateViewportMode);

    return () => {
      media.removeEventListener?.("change", updateViewportMode);
    };
  }, []);

  useEffect(() => {
    const root = rootRef.current;

    if (!root) {
      return;
    }

    if (!("IntersectionObserver" in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: "160px 0px",
        threshold: 0.01,
      },
    );

    observer.observe(root);

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (
      viewportMode !== "mobile" ||
      !isVisible ||
      !rawPdfUrl ||
      !mobilePagesRef.current
    ) {
      return;
    }

    let cancelled = false;
    let loadingTask: any = null;
    const renderTasks: any[] = [];
    const pagesContainer = mobilePagesRef.current;

    async function renderPdfForMobile() {
      setMobileStatus("loading");
      pagesContainer.replaceChildren();

      try {
        const pdfjs = await import("pdfjs-dist/legacy/build/pdf.mjs");

        pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

        loadingTask = pdfjs.getDocument({
          url: rawPdfUrl,
          disableAutoFetch: false,
          disableStream: false,
        });

        const pdf = await loadingTask.promise;

        if (cancelled) {
          return;
        }

        const totalPages = Math.min(pdf.numPages, 12);

        for (let pageNumber = 1; pageNumber <= totalPages; pageNumber += 1) {
          if (cancelled) {
            return;
          }

          const page = await pdf.getPage(pageNumber);
          const baseViewport = page.getViewport({ scale: 1 });

          const availableWidth = Math.max(
            280,
            pagesContainer.clientWidth - 24,
          );
          const cssScale = availableWidth / baseViewport.width;
          const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
          const renderViewport = page.getViewport({
            scale: cssScale * pixelRatio,
          });

          const canvas = document.createElement("canvas");
          const context = canvas.getContext("2d", { alpha: false });

          if (!context) {
            throw new Error("Canvas 2D context is unavailable.");
          }

          canvas.className = styles.mobileCanvas;
          canvas.width = Math.ceil(renderViewport.width);
          canvas.height = Math.ceil(renderViewport.height);
          canvas.style.width = \`\${Math.ceil(
            renderViewport.width / pixelRatio,
          )}px\`;
          canvas.style.height = \`\${Math.ceil(
            renderViewport.height / pixelRatio,
          )}px\`;
          canvas.setAttribute(
            "aria-label",
            \`\${documentTitle} — \${pageNumber} / \${pdf.numPages}\`,
          );

          pagesContainer.appendChild(canvas);

          const renderTask = page.render({
            canvasContext: context,
            viewport: renderViewport,
            canvas,
          });

          renderTasks.push(renderTask);
          await renderTask.promise;
        }

        if (!cancelled) {
          setMobileStatus("ready");
        }
      } catch (error) {
        if (!cancelled) {
          console.error("Mobile PDF preview failed:", error);
          setMobileStatus("error");
        }
      }
    }

    void renderPdfForMobile();

    return () => {
      cancelled = true;

      for (const task of renderTasks) {
        try {
          task.cancel();
        } catch {
          // Ignore completed render tasks.
        }
      }

      try {
        loadingTask?.destroy?.();
      } catch {
        // Ignore cleanup errors.
      }
    };
  }, [documentTitle, isVisible, rawPdfUrl, viewportMode]);

  return (
    <div className={styles.scope} ref={rootRef}>
      <section
        className="frd-drawing-section"
        aria-label={\`\${documentTitle} PDF drawing preview\`}
      >
        <div className="frd-drawing-viewer">
          {viewportMode === "pending" ? (
            <div className={styles.previewStatus}>{copy.loading}</div>
          ) : null}

          {viewportMode === "desktop" ? (
            desktopPreviewOpen ? (
              <iframe
                key={desktopPdfUrl}
                src={desktopPdfUrl}
                className="frd-drawing-object is-visible"
                title={\`\${documentTitle} PDF drawing\`}
                loading="lazy"
              />
            ) : (
              <button
                className="frd-drawing-preview-card"
                type="button"
                onClick={() => setDesktopPreviewOpen(true)}
              >
                <span
                  className="frd-drawing-play-icon"
                  aria-hidden="true"
                />
                <strong>{copy.preview}</strong>
                <em>{copy.description}</em>
              </button>
            )
          ) : null}

          {viewportMode === "mobile" ? (
            <div className={styles.mobilePreview}>
              <div
                ref={mobilePagesRef}
                className={styles.mobilePages}
                aria-busy={mobileStatus === "loading"}
              />

              {mobileStatus === "idle" ||
              mobileStatus === "loading" ? (
                <div className={styles.previewStatus}>
                  {copy.loading}
                </div>
              ) : null}

              {mobileStatus === "error" ? (
                <div className={styles.mobileFallback}>
                  <strong>{copy.failed}</strong>
                  <a
                    className={styles.mobileOpenLink}
                    href={rawPdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {copy.open}
                  </a>
                </div>
              ) : null}

              {mobileStatus === "ready" ? (
                <a
                  className={styles.mobileOpenLink}
                  href={rawPdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {copy.open}
                </a>
              ) : null}
            </div>
          ) : null}
        </div>
      </section>
    </div>
  );
}
`;

fs.writeFileSync(componentPath, componentSource, "utf8");
console.log(
  `已修改组件：${path.relative(projectRoot, componentPath)}`,
);

/* =========================================================
 * 4. 追加手机端 PDF.js 样式
 * ======================================================= */

let cssSource = fs.readFileSync(cssPath, "utf8");

const cssStart = "/* MOBILE_PDFJS_PREVIEW_V1_START */";
const cssEnd = "/* MOBILE_PDFJS_PREVIEW_V1_END */";

const cssBlock = `${cssStart}
.previewStatus {
  display: grid;
  min-height: 260px;
  padding: 32px 20px;
  place-items: center;
  color: #52617a;
  font-size: 14px;
  line-height: 1.6;
  text-align: center;
}

.mobilePreview {
  width: 100%;
  min-width: 0;
}

.mobilePages {
  display: grid;
  width: 100%;
  min-width: 0;
  gap: 12px;
  padding: 12px;
}

.mobileCanvas {
  display: block;
  width: 100%;
  max-width: 100%;
  height: auto;
  margin: 0 auto;
  background: #ffffff;
  border: 0;
  box-shadow: none;
}

.mobileFallback {
  display: grid;
  min-height: 260px;
  padding: 32px 20px;
  place-items: center;
  align-content: center;
  gap: 16px;
  color: #173368;
  text-align: center;
}

.mobileFallback strong {
  font-size: 15px;
  line-height: 1.6;
  font-weight: 600;
}

.mobileOpenLink {
  display: inline-flex;
  min-height: 42px;
  margin: 4px auto 16px;
  padding: 0 18px;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(23, 51, 104, 0.26);
  border-radius: 6px;
  background: #ffffff;
  color: #173368;
  font-size: 14px;
  font-weight: 600;
  line-height: 1;
  text-decoration: none;
}

.mobileOpenLink:hover,
.mobileOpenLink:focus-visible {
  border-color: #173368;
  background: #f6f8fb;
}

@media (max-width: 767px) {
  .scope :global(.frd-drawing-section) {
    background: transparent;
  }

  .scope :global(.frd-drawing-viewer) {
    height: auto;
    min-height: 320px;
    overflow: visible;
    border: 1px solid rgba(23, 51, 104, 0.14);
    background: #f6f8fb;
  }

  .previewStatus {
    min-height: 320px;
  }
}
${cssEnd}`;

const cssPattern =
  /\/\* MOBILE_PDFJS_PREVIEW_V1_START \*\/[\s\S]*?\/\* MOBILE_PDFJS_PREVIEW_V1_END \*\//;

if (cssPattern.test(cssSource)) {
  cssSource = cssSource.replace(cssPattern, cssBlock);
} else {
  cssSource = `${cssSource.trimEnd()}\n\n${cssBlock}\n`;
}

fs.writeFileSync(cssPath, cssSource, "utf8");
console.log(`已修改样式：${path.relative(projectRoot, cssPath)}`);

console.log("");
console.log("============================================");
console.log("手机端 PDF 零件图在线预览修复完成。");
console.log("");
console.log("PC 端：");
console.log("- 点击预览后再加载原生 PDF iframe");
console.log("- 保留原来的工具栏隐藏参数");
console.log("");
console.log("手机端：");
console.log("- 不再挂载 iframe / object / embed");
console.log("- 使用 PDF.js 渲染 PDF 页面");
console.log("- 点击“零件图”标签不会再自动进入下载界面");
console.log("");
console.log("已新增：");
console.log("- pdfjs-dist 依赖");
console.log("- public/pdf.worker.min.mjs");
console.log("");
console.log("下一步请运行：npm run build");
console.log("============================================");
