param(
  [switch]$SkipBuild
)

$ErrorActionPreference = "Stop"

function Write-Utf8NoBomFile {
  param(
    [Parameter(Mandatory = $true)]
    [string]$Path,

    [Parameter(Mandatory = $true)]
    [string]$Content
  )

  $directory = Split-Path -Parent $Path

  if (-not (Test-Path -LiteralPath $directory)) {
    New-Item -ItemType Directory -Force -Path $directory | Out-Null
  }

  if (Test-Path -LiteralPath $Path) {
    $timestamp = Get-Date -Format "yyyyMMdd-HHmmss"
    $backupPath = "$Path.$timestamp.bak"
    Copy-Item -LiteralPath $Path -Destination $backupPath -Force
    Write-Host "Backup created: $backupPath" -ForegroundColor Yellow
  }

  $encoding = New-Object System.Text.UTF8Encoding($false)
  [System.IO.File]::WriteAllText($Path, $Content, $encoding)

  Write-Host "Created: $Path" -ForegroundColor Green
}

$projectRoot = (Get-Location).Path

if (-not (Test-Path -LiteralPath (Join-Path $projectRoot "package.json"))) {
  throw "package.json was not found. Run this script from the project root."
}

$clientPath = Join-Path $projectRoot "components\products\detail\ProductDetailClient.tsx"
$cssPath = Join-Path $projectRoot "components\products\detail\product-detail.module.css"
$dataPath = Join-Path $projectRoot "data\products\detail\product-detail.zh.ts"
$pagePath = Join-Path $projectRoot "app\products\[category]\[slug]\page.tsx"

$clientContent = @'
"use client";

/* =========================================================
   ProductDetailClient.tsx
   恒永达官网｜中文产品详情页

   重要说明：
   1. 页面结构严格按照用户提供的 HTML 转换。
   2. 未经要求，不调整原始布局、间距、字号与视觉。
   3. 当前明确改动仅包括：
      - 主型号 EA-100-PMMA
      - 添加规格书按钮
      - 申请3D文件按钮
      - 中文不显示保修
      - 主图悬停放大
      - 所有业务按钮只留端口
========================================================= */

import { useMemo, useState } from "react";

import type { CSSProperties, MouseEvent } from "react";
import type { ProductDetailPageData } from "@/data/products/detail/product-detail.types";

import styles from "./product-detail.module.css";

type ProductDetailTab = "spec" | "model3d" | "drawing";

type ProductDetailClientProps = {
  data: ProductDetailPageData;
};

type ZoomStyle = CSSProperties & {
  "--zoom-x"?: string;
  "--zoom-y"?: string;
};

export default function ProductDetailClient({
  data,
}: ProductDetailClientProps) {
  const [activeTab, setActiveTab] = useState<ProductDetailTab>("spec");
  const [activeThumb, setActiveThumb] = useState(0);
  const [isZooming, setIsZooming] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({
    x: 50,
    y: 50,
  });

  const realImages = useMemo(() => {
    const images: string[] = [];

    if (data.mainImage) {
      images.push(data.mainImage);
    }

    data.additionalImages.forEach((image) => {
      if (image && !images.includes(image)) {
        images.push(image);
      }
    });

    return images;
  }, [data.additionalImages, data.mainImage]);

  const hasRealImages = realImages.length > 0;
  const activeRealImage = hasRealImages
    ? realImages[Math.min(activeThumb, realImages.length - 1)]
    : null;

  /*
   * 正式数据中：
   * 只有主图且没有附属图时，不显示缩略图栏。
   *
   * 当前测试数据尚未连接选型主图，因此保留 HTML 原型中的
   * 三个 SVG 缩略图，便于核对版式。
   */
  const showThumbnailRow = hasRealImages
    ? realImages.length > 1
    : true;

  const zoomStyle: ZoomStyle = {
    "--zoom-x": `${zoomPosition.x}%`,
    "--zoom-y": `${zoomPosition.y}%`,
  };

  function handleMainImageMove(event: MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();

    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;

    setZoomPosition({
      x: Math.max(0, Math.min(100, x)),
      y: Math.max(0, Math.min(100, y)),
    });
  }

  function handlePreviousThumb() {
    if (hasRealImages) {
      setActiveThumb((current) =>
        current === 0 ? realImages.length - 1 : current - 1,
      );
      return;
    }

    setActiveThumb((current) => (current === 0 ? 2 : current - 1));
  }

  function handleNextThumb() {
    if (hasRealImages) {
      setActiveThumb((current) =>
        current === realImages.length - 1 ? 0 : current + 1,
      );
      return;
    }

    setActiveThumb((current) => (current === 2 ? 0 : current + 1));
  }

  function handleOpenConfigurator() {
    console.info("配置选择端口预留", data.slug);
  }

  function handleAddDatasheet() {
    console.info("添加规格书端口预留", data.slug);
  }

  function handleAddDrawing() {
    console.info("添加图纸端口预留", data.slug);
  }

  function handleRequest3DFile() {
    console.info("申请3D文件端口预留", data.slug);
  }

  function handleAddList() {
    console.info("加入清单端口预留", data.slug);
  }

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <section className={styles.productTop}>
          <div className={styles.gallery} aria-label="产品图片区域">
            <div
              className={[
                styles.mainImage,
                isZooming ? styles.isZooming : "",
              ]
                .filter(Boolean)
                .join(" ")}
              style={zoomStyle}
              onMouseEnter={() => setIsZooming(true)}
              onMouseLeave={() => setIsZooming(false)}
              onMouseMove={handleMainImageMove}
            >
              {activeRealImage ? (
                <img
                  src={activeRealImage}
                  alt={`${data.model} ${data.name}`}
                />
              ) : (
                <svg
                  className={styles.pumpSvg}
                  viewBox="0 0 520 310"
                  aria-hidden="true"
                >
                  <g transform="translate(34, 84)">
                    <rect
                      x="0"
                      y="52"
                      width="54"
                      height="20"
                      fill="#ffffff"
                      stroke="#d7dee8"
                      strokeWidth="2"
                    />
                    <rect
                      x="54"
                      y="33"
                      width="72"
                      height="58"
                      fill="#ffffff"
                      stroke="#d7dee8"
                      strokeWidth="2"
                    />
                    <rect
                      x="126"
                      y="16"
                      width="72"
                      height="92"
                      fill="#eef2f7"
                      stroke="#d7dee8"
                      strokeWidth="2"
                    />
                    <rect
                      x="198"
                      y="24"
                      width="62"
                      height="76"
                      fill="#ffffff"
                      stroke="#d7dee8"
                      strokeWidth="2"
                    />
                    <path
                      d="M260 24 L320 24 L342 48 L342 76 L320 100 L260 100 Z"
                      fill="#173368"
                    />
                    <rect
                      x="342"
                      y="38"
                      width="78"
                      height="48"
                      fill="#ffffff"
                      stroke="#d7dee8"
                      strokeWidth="2"
                    />
                    <rect
                      x="420"
                      y="52"
                      width="48"
                      height="20"
                      fill="#ffffff"
                      stroke="#d7dee8"
                      strokeWidth="2"
                    />
                    <rect
                      x="80"
                      y="38"
                      width="9"
                      height="48"
                      fill="#173368"
                    />
                    <rect
                      x="94"
                      y="38"
                      width="9"
                      height="48"
                      fill="#173368"
                    />
                    <line
                      x1="202"
                      y1="24"
                      x2="236"
                      y2="100"
                      stroke="#d7dee8"
                      strokeWidth="4"
                    />
                    <line
                      x1="214"
                      y1="24"
                      x2="248"
                      y2="100"
                      stroke="#d7dee8"
                      strokeWidth="4"
                    />
                  </g>
                </svg>
              )}
            </div>

            {showThumbnailRow ? (
              <div className={styles.thumbRow} aria-label="缩略图区域">
                <button
                  className={styles.thumbArrow}
                  type="button"
                  aria-label="上一张"
                  onClick={handlePreviousThumb}
                >
                  ‹
                </button>

                {hasRealImages ? (
                  realImages.slice(0, 3).map((image, index) => (
                    <button
                      key={`${image}-${index}`}
                      className={[
                        styles.thumb,
                        activeThumb === index ? styles.isActive : "",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                      type="button"
                      onClick={() => setActiveThumb(index)}
                    >
                      <img src={image} alt="" />
                    </button>
                  ))
                ) : (
                  <>
                    <button
                      className={[
                        styles.thumb,
                        activeThumb === 0 ? styles.isActive : "",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                      type="button"
                      aria-label="主视图"
                      onClick={() => setActiveThumb(0)}
                    >
                      <svg viewBox="0 0 120 70" aria-hidden="true">
                        <rect
                          x="18"
                          y="28"
                          width="84"
                          height="16"
                          fill="#ffffff"
                          stroke="#d7dee8"
                          strokeWidth="2"
                        />
                        <path
                          d="M72 20 L94 20 L104 30 L104 40 L94 50 L72 50 Z"
                          fill="#173368"
                        />
                      </svg>
                    </button>

                    <button
                      className={[
                        styles.thumb,
                        activeThumb === 1 ? styles.isActive : "",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                      type="button"
                      aria-label="侧视图"
                      onClick={() => setActiveThumb(1)}
                    >
                      <svg viewBox="0 0 120 70" aria-hidden="true">
                        <rect
                          x="26"
                          y="19"
                          width="54"
                          height="32"
                          fill="#ffffff"
                          stroke="#d7dee8"
                          strokeWidth="2"
                        />
                        <rect
                          x="80"
                          y="15"
                          width="18"
                          height="40"
                          fill="#173368"
                        />
                      </svg>
                    </button>

                    <button
                      className={[
                        styles.thumb,
                        activeThumb === 2 ? styles.isActive : "",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                      type="button"
                      aria-label="接口细节"
                      onClick={() => setActiveThumb(2)}
                    >
                      <svg viewBox="0 0 120 70" aria-hidden="true">
                        <circle
                          cx="60"
                          cy="35"
                          r="22"
                          fill="#ffffff"
                          stroke="#d7dee8"
                          strokeWidth="2"
                        />
                        <circle
                          cx="60"
                          cy="35"
                          r="7"
                          fill="#173368"
                        />
                      </svg>
                    </button>
                  </>
                )}

                <button
                  className={styles.thumbArrow}
                  type="button"
                  aria-label="下一张"
                  onClick={handleNextThumb}
                >
                  ›
                </button>
              </div>
            ) : null}
          </div>

          <div className={styles.productInfo}>
            <div className={styles.titleGroup}>
              <h1 className={styles.productModelTitle}>{data.model}</h1>
              <div className={styles.productName}>{data.name}</div>
            </div>

            <p className={styles.productDesc}>
              {data.advantages.join("")}
            </p>

            <div className={styles.application}>
              <p className={styles.applicationTitle}>常见应用：</p>
              <p className={styles.applicationText}>
                {data.commonApplications.join("、")}
              </p>
            </div>

            <div className={styles.operationArea}>
              <div className={styles.modelLine}>
                <div className={styles.modelCodeWrap}>
                  <span className={styles.modelLabel}>型号：</span>
                  <span className={styles.modelCode}>{data.model}</span>
                </div>

                {data.showConfigurator ? (
                  <button
                    className={styles.button}
                    type="button"
                    onClick={handleOpenConfigurator}
                  >
                    配置选择
                  </button>
                ) : null}
              </div>

              <div className={styles.actionRow}>
                {data.showDatasheetRequest ? (
                  <button
                    className={styles.button}
                    type="button"
                    onClick={handleAddDatasheet}
                  >
                    添加规格书
                  </button>
                ) : null}

                {data.showDrawingRequest ? (
                  <button
                    className={styles.button}
                    type="button"
                    onClick={handleAddDrawing}
                  >
                    添加图纸
                  </button>
                ) : null}

                {data.show3DRequest ? (
                  <button
                    className={styles.button}
                    type="button"
                    onClick={handleRequest3DFile}
                  >
                    申请3D文件
                  </button>
                ) : null}

                <button
                  className={styles.button}
                  type="button"
                  onClick={handleAddList}
                >
                  加入清单
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.detailSection}>
          <nav className={styles.tabNav} aria-label="产品资料切换">
            <button
              className={[
                styles.tabButton,
                activeTab === "spec" ? styles.isActive : "",
              ]
                .filter(Boolean)
                .join(" ")}
              type="button"
              onClick={() => setActiveTab("spec")}
            >
              规格
            </button>

            <button
              className={[
                styles.tabButton,
                activeTab === "model3d" ? styles.isActive : "",
              ]
                .filter(Boolean)
                .join(" ")}
              type="button"
              onClick={() => setActiveTab("model3d")}
            >
              3D模型
            </button>

            <button
              className={[
                styles.tabButton,
                activeTab === "drawing" ? styles.isActive : "",
              ]
                .filter(Boolean)
                .join(" ")}
              type="button"
              onClick={() => setActiveTab("drawing")}
            >
              零件图
            </button>
          </nav>

          <div className={styles.panelWrap}>
            <div
              className={[
                styles.panel,
                activeTab === "spec" ? styles.isActive : "",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              <div
                className={[
                  styles.panelBox,
                  styles.specPanelClean,
                ].join(" ")}
              >
                <table className={styles.specTable}>
                  <tbody>
                    {data.specs.map((item) => (
                      <tr key={`${item.label}-${item.value}`}>
                        <th>{item.label}</th>
                        <td>{item.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div
              className={[
                styles.panel,
                activeTab === "model3d" ? styles.isActive : "",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              <div className={styles.panelBox}>
                <div aria-label="3D 模型预览区域" />
              </div>
            </div>

            <div
              className={[
                styles.panel,
                activeTab === "drawing" ? styles.isActive : "",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              <div className={styles.panelBox}>
                <div aria-label="零件图预览区域" />
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
'@

$cssContent = @'
/* =========================================================
   product-detail.module.css
   恒永达官网｜中文产品详情页

   本文件严格对应用户提供的 HTML 样式。
   除固定顶部导航所需的顶部偏移外，不调整原始设计。
========================================================= */

.page {
  --blue: #173368;
  --blue-dark: #10264f;
  --cyan: #09e9b4;

  --black: #111111;
  --text: #263241;
  --sub: #536274;
  --muted: #7c8796;

  --line: #d8dee8;
  --line-light: #e8edf4;
  --soft: #f7f9fc;
  --soft-blue: #f1f5fa;
  --white: #ffffff;

  --page-width: 1180px;
  --btn-radius: 8px;

  width: 100%;
  min-height: 100vh;

  /*
   * 原 HTML 为 42px。
   * 官网顶部导航为固定定位，因此这里只额外补导航高度，
   * 保留导航下方原本的 42px 间距。
   */
  padding: 138px 0 72px;

  background: #ffffff;
  color: var(--black);
}

.page *,
.page *::before,
.page *::after {
  box-sizing: border-box;
}

.page button {
  font: inherit;
  cursor: pointer;
}

.container {
  width: min(calc(100% - 96px), var(--page-width));
  margin: 0 auto;
}

/* =========================================================
   首屏产品区域
========================================================= */

.productTop {
  display: grid;
  grid-template-columns: 430px minmax(0, 1fr);
  gap: 64px;
  align-items: start;
}

/* =========================================================
   左侧产品图
========================================================= */

.gallery {
  width: 100%;
}

.mainImage {
  width: 100%;
  height: 360px;
  border: 0;
  background: #ffffff;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: zoom-in;
}

.mainImage .pumpSvg,
.mainImage img {
  transform-origin: var(--zoom-x, 50%) var(--zoom-y, 50%);
  transition: transform 0.22s ease;
  will-change: transform;
}

.mainImage.isZooming .pumpSvg,
.mainImage.isZooming img {
  transform: scale(1.55);
}

.mainImage img {
  width: 360px;
  max-width: 86%;
  height: 100%;
  object-fit: contain;
  display: block;
}

.pumpSvg {
  width: 360px;
  max-width: 86%;
  height: auto;
  display: block;
}

.thumbRow {
  margin-top: 12px;
  height: 96px;
  display: grid;
  grid-template-columns: 24px repeat(3, 1fr) 24px;
  gap: 6px;
}

.thumbArrow,
.thumb {
  border: 1px solid var(--line);
  background: #ffffff;
  color: var(--blue);
  padding: 0;
  border-radius: 0;
}

.thumbArrow {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 26px;
  line-height: 1;
  font-weight: 900;
  transition:
    background 0.18s ease,
    color 0.18s ease,
    border-color 0.18s ease;
}

.thumbArrow:hover,
.thumbArrow:active {
  border-color: var(--blue);
  background: var(--blue);
  color: var(--cyan);
}

.thumb {
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  transition:
    border-color 0.18s ease,
    background 0.18s ease;
}

.thumb::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 0;
  background: var(--cyan);
  transition: height 0.18s ease;
}

.thumb.isActive {
  border-color: var(--cyan);
}

.thumb.isActive::after {
  height: 5px;
}

.thumb svg {
  width: 78%;
  height: auto;
  display: block;
}

.thumb img {
  width: 78%;
  height: 78%;
  object-fit: contain;
  display: block;
}

.thumb:hover {
  border-color: var(--cyan);
}

/* =========================================================
   右侧产品信息
========================================================= */

.productInfo {
  padding-top: 8px;
  max-width: 680px;
}

.titleGroup {
  padding-bottom: 18px;
  border-bottom: 1px solid var(--line-light);
}

.productModelTitle {
  margin: 0;
  color: var(--blue);
  font-size: 38px;
  line-height: 1.08;
  font-weight: 900;
  letter-spacing: -0.035em;
}

.productName {
  margin: 8px 0 0;
  color: #111111;
  font-size: 23px;
  line-height: 1.2;
  font-weight: 800;
  letter-spacing: -0.02em;
}

.productDesc {
  margin: 18px 0 0;
  max-width: 640px;
  color: #111111;
  font-size: 17px;
  line-height: 1.72;
  font-weight: 400;
}

.application {
  margin-top: 28px;
}

.applicationTitle {
  margin: 0;
  color: #111111;
  font-size: 18px;
  line-height: 1.4;
  font-weight: 900;
}

.applicationText {
  margin: 8px 0 0;
  color: #111111;
  font-size: 18px;
  line-height: 1.65;
  font-weight: 400;
}

/* =========================================================
   型号与操作区
========================================================= */

.operationArea {
  margin-top: 52px;
  padding-top: 24px;
  border-top: 1px solid var(--line-light);
}

.modelLine {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 18px;
  flex-wrap: wrap;
}

.modelCodeWrap {
  display: flex;
  align-items: baseline;
  gap: 10px;
  min-width: 0;
  white-space: nowrap;
}

.modelLabel {
  color: #111111;
  font-size: 24px;
  line-height: 1.15;
  font-weight: 500;
  white-space: nowrap;
}

.modelCode {
  display: inline-block;
  color: #111111;
  font-size: 28px;
  line-height: 1.15;
  font-weight: 500;
  letter-spacing: 0.01em;
  white-space: nowrap;
  padding: 0;
  border: 0;
  background: transparent;
}

.button {
  height: 42px;
  min-width: 150px;
  padding: 0 22px;
  border: 1px solid var(--blue);
  border-radius: var(--btn-radius);
  background: #ffffff;
  color: var(--blue);
  font-size: 17px;
  line-height: 1;
  font-weight: 500;
  text-align: center;
  transition:
    background 0.18s ease,
    color 0.18s ease,
    border-color 0.18s ease;
}

.button:hover,
.button:active {
  border-color: var(--blue);
  background: var(--blue);
  color: var(--cyan);
}

.actionRow {
  margin-top: 24px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.modelLine .button {
  min-width: 136px;
  width: auto;
  flex: 0 0 auto;
}

/* =========================================================
   下方资料 Tab
========================================================= */

.detailSection {
  margin-top: 64px;
}

.tabNav {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  gap: 68px;
  height: 48px;
  border-bottom: 1px solid var(--line);
}

.tabButton {
  position: relative;
  height: 48px;
  border: 0;
  border-radius: 0;
  background: #ffffff;
  color: var(--blue);
  font-size: 18px;
  line-height: 48px;
  font-weight: 500;
  padding: 0;
}

.tabButton::after {
  content: "";
  position: absolute;
  left: 50%;
  bottom: -1px;
  width: 18px;
  height: 2px;
  background: var(--cyan);
  transform: translateX(-50%) scaleX(0);
  transform-origin: center;
  transition: transform 0.18s ease;
}

.tabButton.isActive {
  color: var(--cyan);
}

.tabButton.isActive::after {
  transform: translateX(-50%) scaleX(1);
}

.tabButton:hover {
  color: var(--cyan);
}

.panelWrap {
  padding-top: 14px;
}

.panel {
  display: none;
}

.panel.isActive {
  display: block;
}

.panelBox {
  min-height: 420px;
  border: 1px solid var(--line);
  background: #ffffff;
  padding: 32px 36px 38px;
}

.specPanelClean {
  min-height: 0;
  border: 0;
  padding: 0;
  background: #ffffff;
}

.specTable {
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
  font-size: 15px;
  border: 1px solid #cbd5e3;
  background: #ffffff;
}

.specTable tr {
  border-bottom: 1px solid #cbd5e3;
}

.specTable tr:last-child {
  border-bottom: 0;
}

.specTable th,
.specTable td {
  border-right: 1px solid #cbd5e3;
  padding: 10px 16px;
  text-align: left;
  line-height: 1.35;
  vertical-align: middle;
}

.specTable th:last-child,
.specTable td:last-child {
  border-right: 0;
}

.specTable th {
  width: 280px;
  color: #32445d;
  font-size: 15px;
  font-weight: 500;
  text-align: right;
  background: #f3f6fa;
  letter-spacing: 0;
}

.specTable td {
  color: var(--blue);
  font-size: 17px;
  font-weight: 700;
  text-align: center;
  letter-spacing: 0.01em;
  background: #ffffff;
}

/* =========================================================
   响应式
========================================================= */

@media (max-width: 1080px) {
  .productTop {
    grid-template-columns: 1fr;
    gap: 38px;
  }

  .gallery {
    max-width: 460px;
  }

  .productInfo {
    max-width: 100%;
  }

  .operationArea {
    margin-top: 40px;
  }

  .tabNav {
    gap: 38px;
  }
}

@media (max-width: 680px) {
  .page {
    /*
     * 原 HTML 为 24px。
     * 同样仅补移动端顶部导航高度。
     */
    padding-top: 104px;
  }

  .container {
    width: min(calc(100% - 28px), var(--page-width));
  }

  .mainImage {
    height: 300px;
    cursor: default;
  }

  .mainImage.isZooming .pumpSvg,
  .mainImage.isZooming img {
    transform: none;
  }

  .pumpSvg {
    width: 300px;
  }

  .thumbRow {
    height: 78px;
  }

  .productModelTitle {
    font-size: 30px;
  }

  .productName {
    font-size: 21px;
  }

  .productDesc,
  .applicationText {
    font-size: 16px;
  }

  .modelLine {
    flex-direction: column;
    align-items: flex-start;
    gap: 18px;
  }

  .modelCodeWrap {
    align-items: flex-start;
    flex-direction: column;
    gap: 6px;
    white-space: normal;
  }

  .modelLabel {
    font-size: 20px;
    font-weight: 500;
  }

  .modelCode {
    font-size: 24px;
    white-space: normal;
  }

  .button {
    width: 100%;
  }

  .actionRow {
    grid-template-columns: 1fr;
    gap: 12px;
  }

  .tabNav {
    justify-content: flex-start;
    gap: 30px;
    overflow-x: auto;
    scrollbar-width: none;
  }

  .tabNav::-webkit-scrollbar {
    display: none;
  }

  .tabButton {
    flex: 0 0 auto;
  }

  .panelBox {
    min-height: 360px;
    padding: 26px 20px;
  }

  .specTable,
  .specTable tbody,
  .specTable tr,
  .specTable th,
  .specTable td {
    display: block;
    width: 100%;
  }

  .specTable th,
  .specTable td {
    border-right: 0;
  }

  .specTable th {
    padding-bottom: 6px;
  }

  .specTable td {
    padding-top: 0;
    font-size: 17px;
  }
}
'@

$dataContent = @'
/* =========================================================
   product-detail.zh.ts
   恒永达官网｜中文产品详情页测试数据

   当前严格对应用户提供的 EA 详情页 HTML。
========================================================= */

import type { ProductDetailZhRecord } from "./product-detail.types";

export const productDetailZhData: ProductDetailZhRecord[] = [
  {
    category: "pumps",
    slug: "ea-100-pmma",

    model: "EA-100-PMMA",
    name: "常规柱塞泵",

    advantages: [
      "适合对安装空间、控制联动和系统稳定性要求更高的自动化液路系统，可用于复杂设备中的定量输送模块。",
    ],

    commonApplications: [
      "IVD 诊断设备",
      "生命科学仪器",
      "实验室自动化",
      "分析仪器",
    ],

    additionalImages: [],

    showConfigurator: true,
    showDatasheetRequest: true,
    showDrawingRequest: true,
    show3DRequest: true,

    faqKey: "ea-conventional-plunger-pump",
    specSeriesKey: "ea-conventional-plunger-pump",
  },
];
'@

$pageContent = @'
/* =========================================================
   page.tsx
   恒永达官网｜中文产品独立详情页动态路由
========================================================= */

import { notFound } from "next/navigation";

import ProductDetailClient from "@/components/products/detail/ProductDetailClient";

import {
  getAllProductDetailRouteParams,
  getProductDetailPageData,
} from "@/services/products/detail/getProductDetailPageData";

type ProductDetailRoutePageProps = {
  params: Promise<{
    category: string;
    slug: string;
  }>;
};

export function generateStaticParams() {
  return getAllProductDetailRouteParams();
}

export default async function ProductDetailRoutePage({
  params,
}: ProductDetailRoutePageProps) {
  const { category, slug } = await params;

  const pageData = getProductDetailPageData({
    category,
    slug,
  });

  if (!pageData) {
    notFound();
  }

  return <ProductDetailClient data={pageData} />;
}
'@

Write-Utf8NoBomFile -Path $clientPath -Content $clientContent
Write-Utf8NoBomFile -Path $cssPath -Content $cssContent
Write-Utf8NoBomFile -Path $dataPath -Content $dataContent
Write-Utf8NoBomFile -Path $pagePath -Content $pageContent

Write-Host ""
Write-Host "The product detail page was restored to the supplied HTML layout." -ForegroundColor Cyan
Write-Host "Test URL: http://localhost:3000/products/pumps/ea-100-pmma"
Write-Host ""

if (-not $SkipBuild) {
  Write-Host "Running npm run build..." -ForegroundColor Cyan
  & npm run build

  if ($LASTEXITCODE -ne 0) {
    throw "Files were created, but npm run build failed. Send the full error output."
  }

  Write-Host ""
  Write-Host "Build passed." -ForegroundColor Green
}
else {
  Write-Host "Build was skipped. Run npm run build manually." -ForegroundColor Yellow
}
