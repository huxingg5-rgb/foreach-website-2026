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

Write-Host ""
Write-Host "Creating the formal product detail page layout..." -ForegroundColor Cyan
Write-Host "Project root: $projectRoot"
Write-Host ""

$clientPath = Join-Path $projectRoot "components\products\detail\ProductDetailClient.tsx"
$cssPath = Join-Path $projectRoot "components\products\detail\product-detail.module.css"
$specsPath = Join-Path $projectRoot "data\products\detail\product-specs.zh.generated.ts"
$servicePath = Join-Path $projectRoot "services\products\detail\getProductDetailPageData.ts"
$pagePath = Join-Path $projectRoot "app\products\[category]\[slug]\page.tsx"

$clientContent = @'
"use client";

/* =========================================================
   ProductDetailClient.tsx
   恒永达官网｜中文产品详情页客户端组件

   第一版功能：
   1. 左侧主图展示
   2. 附属图缩略图切换
   3. 主图鼠标悬停放大
   4. 型号、名称、优势、常见应用
   5. 按字段显示操作按钮
   6. 规格 / 3D模型 / 零件图 Tab
   7. 所有业务按钮仅预留端口
========================================================= */

import { useMemo, useState } from "react";

import type { MouseEvent } from "react";
import type { ProductDetailPageData } from "@/data/products/detail/product-detail.types";

import styles from "./product-detail.module.css";

type ProductDetailTab = "spec" | "model3d" | "drawing";

type ProductDetailClientProps = {
  data: ProductDetailPageData;
};

export default function ProductDetailClient({
  data,
}: ProductDetailClientProps) {
  const galleryImages = useMemo(() => {
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

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<ProductDetailTab>("spec");
  const [zoomPosition, setZoomPosition] = useState({
    x: 50,
    y: 50,
  });
  const [isZooming, setIsZooming] = useState(false);

  const activeImage = galleryImages[activeImageIndex] ?? null;
  const showThumbnails = galleryImages.length > 1;

  function handleImageMouseMove(event: MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();

    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;

    setZoomPosition({
      x: Math.max(0, Math.min(100, x)),
      y: Math.max(0, Math.min(100, y)),
    });
  }

  function handlePreviousImage() {
    setActiveImageIndex((current) => {
      if (galleryImages.length <= 1) {
        return 0;
      }

      return current === 0 ? galleryImages.length - 1 : current - 1;
    });
  }

  function handleNextImage() {
    setActiveImageIndex((current) => {
      if (galleryImages.length <= 1) {
        return 0;
      }

      return current === galleryImages.length - 1 ? 0 : current + 1;
    });
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

  function handleAddInquiry() {
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
                isZooming && activeImage ? styles.mainImageZooming : "",
              ]
                .filter(Boolean)
                .join(" ")}
              onMouseEnter={() => setIsZooming(true)}
              onMouseLeave={() => setIsZooming(false)}
              onMouseMove={handleImageMouseMove}
            >
              {activeImage ? (
                <img
                  className={styles.productImage}
                  src={activeImage}
                  alt={`${data.model} ${data.name}`}
                  style={{
                    transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                  }}
                />
              ) : (
                <div className={styles.imagePlaceholder}>
                  <svg
                    viewBox="0 0 520 310"
                    role="img"
                    aria-label={`${data.model} 产品图占位`}
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
                      <rect x="80" y="38" width="9" height="48" fill="#173368" />
                      <rect x="94" y="38" width="9" height="48" fill="#173368" />
                    </g>
                  </svg>

                  <span>主图将在下一步连接选型页面数据</span>
                </div>
              )}
            </div>

            {showThumbnails ? (
              <div className={styles.thumbnailRow}>
                <button
                  className={styles.thumbnailArrow}
                  type="button"
                  aria-label="上一张产品图"
                  onClick={handlePreviousImage}
                >
                  ‹
                </button>

                <div className={styles.thumbnailList}>
                  {galleryImages.map((image, index) => (
                    <button
                      key={`${image}-${index}`}
                      className={[
                        styles.thumbnail,
                        index === activeImageIndex
                          ? styles.thumbnailActive
                          : "",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                      type="button"
                      onClick={() => setActiveImageIndex(index)}
                      aria-label={`查看第 ${index + 1} 张产品图`}
                    >
                      <img src={image} alt="" />
                    </button>
                  ))}
                </div>

                <button
                  className={styles.thumbnailArrow}
                  type="button"
                  aria-label="下一张产品图"
                  onClick={handleNextImage}
                >
                  ›
                </button>
              </div>
            ) : null}
          </div>

          <div className={styles.productInfo}>
            <div className={styles.titleGroup}>
              <h1>{data.model}</h1>
              <p className={styles.productName}>{data.name}</p>
            </div>

            <div className={styles.infoSection}>
              <h2>产品优势</h2>

              <ul className={styles.advantageList}>
                {data.advantages.map((advantage) => (
                  <li key={advantage}>{advantage}</li>
                ))}
              </ul>
            </div>

            <div className={styles.infoSection}>
              <h2>常见应用</h2>
              <p className={styles.applicationText}>
                {data.commonApplications.join("、")}
              </p>
            </div>

            <div className={styles.operationArea}>
              <div className={styles.modelLine}>
                <div className={styles.modelText}>
                  <span>型号：</span>
                  <strong>{data.model}</strong>
                </div>

                {data.showConfigurator ? (
                  <button
                    className={styles.actionButton}
                    type="button"
                    onClick={handleOpenConfigurator}
                  >
                    配置选择
                  </button>
                ) : null}
              </div>

              <div className={styles.actionGrid}>
                {data.showDatasheetRequest ? (
                  <button
                    className={styles.actionButton}
                    type="button"
                    onClick={handleAddDatasheet}
                  >
                    添加规格书
                  </button>
                ) : null}

                {data.showDrawingRequest ? (
                  <button
                    className={styles.actionButton}
                    type="button"
                    onClick={handleAddDrawing}
                  >
                    添加图纸
                  </button>
                ) : null}

                {data.show3DRequest ? (
                  <button
                    className={styles.actionButton}
                    type="button"
                    onClick={handleRequest3DFile}
                  >
                    申请3D文件
                  </button>
                ) : null}

                <button
                  className={styles.actionButton}
                  type="button"
                  onClick={handleAddInquiry}
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
                activeTab === "spec" ? styles.tabButtonActive : "",
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
                activeTab === "model3d" ? styles.tabButtonActive : "",
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
                activeTab === "drawing" ? styles.tabButtonActive : "",
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
            {activeTab === "spec" ? (
              <div className={styles.specPanel}>
                {data.specs.length > 0 ? (
                  <table className={styles.specTable}>
                    <tbody>
                      {data.specs.map((item) => (
                        <tr key={`${item.label}-${item.value}`}>
                          <th scope="row">{item.label}</th>
                          <td>{item.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className={styles.emptyPanel}>
                    当前规格参数接口已建立，等待接入产品系列规格表。
                  </div>
                )}
              </div>
            ) : null}

            {activeTab === "model3d" ? (
              <div className={styles.resourcePanel}>
                <div className={styles.resourcePlaceholder}>
                  <strong>3D模型预览区域</strong>
                  <span>
                    后续接入当前详情页的轻量 GLB 预览模型；完整工程文件仍通过“申请3D文件”获取。
                  </span>
                </div>
              </div>
            ) : null}

            {activeTab === "drawing" ? (
              <div className={styles.resourcePanel}>
                <div className={styles.resourcePlaceholder}>
                  <strong>零件图预览区域</strong>
                  <span>
                    后续接入当前详情页的 PDF 图纸预览；原始图纸通过资料申请流程获取。
                  </span>
                </div>
              </div>
            ) : null}
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
   恒永达官网｜中文产品详情页第一版样式

   设计要求：
   1. 白色为主
   2. 深蓝品牌色
   3. 荧光青作为交互强调
   4. 不使用投影
   5. 内容区不使用大圆角
   6. 操作按钮使用 8px 圆角
========================================================= */

.page {
  --detail-blue: #173368;
  --detail-blue-dark: #10264f;
  --detail-cyan: #09e9b4;
  --detail-black: #111111;
  --detail-text: #263241;
  --detail-sub: #536274;
  --detail-line: #d8dee8;
  --detail-line-light: #e8edf4;
  --detail-soft: #f4f7fb;

  min-height: 100vh;
  padding: 42px 0 80px;
  background: #ffffff;
  color: var(--detail-black);
}

.container {
  width: min(calc(100% - 96px), 1180px);
  margin: 0 auto;
}

.productTop {
  display: grid;
  grid-template-columns: 430px minmax(0, 1fr);
  gap: 64px;
  align-items: start;
}

.gallery {
  width: 100%;
}

.mainImage {
  position: relative;
  display: flex;
  width: 100%;
  height: 390px;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: #ffffff;
  cursor: zoom-in;
}

.productImage {
  display: block;
  width: 88%;
  height: 88%;
  object-fit: contain;
  transition: transform 180ms ease;
  will-change: transform;
}

.mainImageZooming .productImage {
  transform: scale(1.8);
}

.imagePlaceholder {
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  color: #7c8796;
  font-size: 13px;
  line-height: 1.5;
}

.imagePlaceholder svg {
  display: block;
  width: min(360px, 86%);
  height: auto;
}

.thumbnailRow {
  display: grid;
  height: 96px;
  grid-template-columns: 28px minmax(0, 1fr) 28px;
  gap: 6px;
  margin-top: 12px;
}

.thumbnailList {
  display: grid;
  min-width: 0;
  grid-auto-columns: minmax(96px, 1fr);
  grid-auto-flow: column;
  gap: 6px;
  overflow: hidden;
}

.thumbnailArrow,
.thumbnail {
  border: 1px solid var(--detail-line);
  border-radius: 0;
  background: #ffffff;
  color: var(--detail-blue);
}

.thumbnailArrow {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  font-size: 26px;
  font-weight: 800;
  line-height: 1;
  transition:
    border-color 160ms ease,
    background 160ms ease,
    color 160ms ease;
}

.thumbnailArrow:hover {
  border-color: var(--detail-blue);
  background: var(--detail-blue);
  color: var(--detail-cyan);
}

.thumbnail {
  position: relative;
  display: flex;
  min-width: 0;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: 6px;
}

.thumbnail::after {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  height: 0;
  background: var(--detail-cyan);
  content: "";
  transition: height 160ms ease;
}

.thumbnail:hover,
.thumbnailActive {
  border-color: var(--detail-cyan);
}

.thumbnailActive::after {
  height: 4px;
}

.thumbnail img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.productInfo {
  max-width: 680px;
  padding-top: 8px;
}

.titleGroup {
  padding-bottom: 20px;
  border-bottom: 1px solid var(--detail-line-light);
}

.titleGroup h1 {
  margin: 0;
  color: var(--detail-blue);
  font-size: clamp(34px, 4vw, 46px);
  font-weight: 800;
  letter-spacing: -0.035em;
  line-height: 1.08;
}

.productName {
  margin: 9px 0 0;
  color: var(--detail-black);
  font-size: 23px;
  font-weight: 600;
  line-height: 1.3;
}

.infoSection {
  margin-top: 24px;
}

.infoSection h2 {
  margin: 0;
  color: var(--detail-black);
  font-size: 18px;
  font-weight: 700;
  line-height: 1.45;
}

.advantageList {
  margin: 10px 0 0;
  padding-left: 20px;
}

.advantageList li {
  margin-top: 5px;
  color: var(--detail-text);
  font-size: 16px;
  font-weight: 400;
  line-height: 1.72;
}

.advantageList li:first-child {
  margin-top: 0;
}

.applicationText {
  margin: 8px 0 0;
  color: var(--detail-text);
  font-size: 16px;
  line-height: 1.7;
}

.operationArea {
  margin-top: 38px;
  padding-top: 24px;
  border-top: 1px solid var(--detail-line-light);
}

.modelLine {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
}

.modelText {
  display: flex;
  min-width: 0;
  align-items: baseline;
  gap: 10px;
}

.modelText span {
  flex: 0 0 auto;
  color: var(--detail-black);
  font-size: 20px;
  font-weight: 400;
}

.modelText strong {
  min-width: 0;
  color: var(--detail-black);
  font-size: 24px;
  font-weight: 500;
  letter-spacing: 0.01em;
  line-height: 1.2;
  overflow-wrap: anywhere;
}

.actionGrid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 12px;
  margin-top: 22px;
}

.actionButton {
  min-height: 42px;
  padding: 0 16px;
  border: 1px solid var(--detail-blue);
  border-radius: 8px;
  background: #ffffff;
  color: var(--detail-blue);
  font-size: 15px;
  font-weight: 500;
  line-height: 1.2;
  transition:
    border-color 160ms ease,
    background 160ms ease,
    color 160ms ease;
}

.actionButton:hover {
  border-color: var(--detail-blue);
  background: var(--detail-blue);
  color: var(--detail-cyan);
}

.modelLine .actionButton {
  flex: 0 0 auto;
  min-width: 132px;
}

.detailSection {
  margin-top: 66px;
}

.tabNav {
  display: flex;
  height: 50px;
  align-items: flex-end;
  justify-content: center;
  gap: 72px;
  border-bottom: 1px solid var(--detail-line);
}

.tabButton {
  position: relative;
  height: 50px;
  padding: 0;
  border: 0;
  border-radius: 0;
  background: transparent;
  color: var(--detail-blue);
  font-size: 18px;
  font-weight: 400;
  line-height: 50px;
}

.tabButton::after {
  position: absolute;
  bottom: -1px;
  left: 50%;
  width: 22px;
  height: 2px;
  background: var(--detail-cyan);
  content: "";
  transform: translateX(-50%) scaleX(0);
  transform-origin: center;
  transition: transform 160ms ease;
}

.tabButton:hover,
.tabButtonActive {
  color: var(--detail-cyan);
}

.tabButtonActive::after {
  transform: translateX(-50%) scaleX(1);
}

.panelWrap {
  padding-top: 16px;
}

.specPanel {
  background: #ffffff;
}

.specTable {
  width: 100%;
  border: 1px solid #cbd5e3;
  border-collapse: collapse;
  table-layout: fixed;
}

.specTable tr {
  border-bottom: 1px solid #cbd5e3;
}

.specTable tr:last-child {
  border-bottom: 0;
}

.specTable th,
.specTable td {
  padding: 11px 16px;
  border-right: 1px solid #cbd5e3;
  vertical-align: middle;
  line-height: 1.4;
}

.specTable th:last-child,
.specTable td:last-child {
  border-right: 0;
}

.specTable th {
  width: 280px;
  background: #f3f6fa;
  color: #32445d;
  font-size: 15px;
  font-weight: 500;
  text-align: right;
}

.specTable td {
  background: #ffffff;
  color: var(--detail-blue);
  font-size: 17px;
  font-weight: 600;
  text-align: center;
}

.resourcePanel {
  min-height: 420px;
  border: 1px solid var(--detail-line);
  background: #ffffff;
}

.resourcePlaceholder,
.emptyPanel {
  display: flex;
  min-height: 420px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 40px;
  text-align: center;
}

.resourcePlaceholder strong {
  color: var(--detail-blue);
  font-size: 22px;
  font-weight: 700;
}

.resourcePlaceholder span,
.emptyPanel {
  color: var(--detail-sub);
  font-size: 15px;
  line-height: 1.75;
}

@media (max-width: 1080px) {
  .productTop {
    grid-template-columns: 1fr;
    gap: 38px;
  }

  .gallery {
    max-width: 520px;
  }

  .productInfo {
    max-width: none;
  }
}

@media (max-width: 760px) {
  .page {
    padding: 26px 0 60px;
  }

  .container {
    width: min(calc(100% - 28px), 1180px);
  }

  .mainImage {
    height: 310px;
    cursor: default;
  }

  .mainImageZooming .productImage {
    transform: none;
  }

  .thumbnailRow {
    height: 78px;
  }

  .modelLine {
    align-items: flex-start;
    flex-direction: column;
  }

  .modelText {
    align-items: flex-start;
    flex-direction: column;
    gap: 5px;
  }

  .actionGrid {
    grid-template-columns: 1fr 1fr;
  }

  .actionButton {
    width: 100%;
  }

  .tabNav {
    justify-content: flex-start;
    gap: 34px;
    overflow-x: auto;
    scrollbar-width: none;
  }

  .tabNav::-webkit-scrollbar {
    display: none;
  }

  .tabButton {
    flex: 0 0 auto;
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
    text-align: left;
  }

  .specTable td {
    padding-top: 0;
    text-align: left;
  }

  .resourcePanel,
  .resourcePlaceholder,
  .emptyPanel {
    min-height: 320px;
  }
}

@media (max-width: 460px) {
  .actionGrid {
    grid-template-columns: 1fr;
  }
}
'@

$specsContent = @'
/* =========================================================
   product-specs.zh.generated.ts
   恒永达官网｜中文产品规格参数生成数据

   当前为 EA-100-PMMA 测试数据。
   后续由产品系列规格 Excel 自动生成并覆盖此文件。
========================================================= */

import type { ProductSpecItem } from "./product-detail.types";

export const productSpecsZhGenerated: Record<
  string,
  ProductSpecItem[]
> = {
  "ea-100-pmma": [
    {
      label: "容量",
      value: "100μL",
    },
    {
      label: "分辨率",
      value: "0.05μL / 步",
    },
    {
      label: "全行程步数",
      value: "2000 步",
    },
    {
      label: "螺距",
      value: "1.27mm",
    },
    {
      label: "泵类型",
      value: "柱塞式",
    },
    {
      label: "柱塞",
      value: "陶瓷",
    },
    {
      label: "安装尺寸",
      value: "2×M3×31.8 或 2×M3×42.8",
    },
    {
      label: "进口",
      value: "2 个 1/4-28 UNF 或 2 个 M6 平底端口",
    },
    {
      label: "反冲（返回差异）",
      value: "≤1.0%",
    },
    {
      label: "准确度 100% 范围",
      value: "≤0.5%",
    },
    {
      label: "重复性范围 100%",
      value: "≤0.5%",
    },
    {
      label: "流体压力",
      value: "<0.30MPa",
    },
  ],
};
'@

$serviceContent = @'
/* =========================================================
   getProductDetailPageData.ts
   恒永达官网｜中文产品详情页数据服务层

   当前阶段：
   1. 根据 category + slug 查找详情资料
   2. 读取测试规格参数
   3. 主图暂时返回 null
   4. 下一步从选型页面数据中读取主图
========================================================= */

import { productDetailZhData } from "@/data/products/detail/product-detail.zh";
import { productSpecsZhGenerated } from "@/data/products/detail/product-specs.zh.generated";

import type {
  ProductDetailCategory,
  ProductDetailPageData,
} from "@/data/products/detail/product-detail.types";

export function getProductDetailPageData({
  category,
  slug,
}: {
  category: string;
  slug: string;
}): ProductDetailPageData | null {
  const product = productDetailZhData.find(
    (item) => item.category === category && item.slug === slug,
  );

  if (!product) {
    return null;
  }

  return {
    ...product,

    /**
     * 下一步连接选型页面基础数据。
     */
    mainImage: null,

    specs: productSpecsZhGenerated[slug] ?? [],
  };
}

export function getAllProductDetailRouteParams(): Array<{
  category: ProductDetailCategory;
  slug: string;
}> {
  return productDetailZhData.map((item) => ({
    category: item.category,
    slug: item.slug,
  }));
}
'@

$pageContent = @'
/* =========================================================
   page.tsx
   恒永达官网｜中文产品独立详情页动态路由

   页面示例：
   /products/pumps/ea-100-pmma
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
Write-Utf8NoBomFile -Path $specsPath -Content $specsContent
Write-Utf8NoBomFile -Path $servicePath -Content $serviceContent
Write-Utf8NoBomFile -Path $pagePath -Content $pageContent

$oldRouteCss = Join-Path $projectRoot "app\products\[category]\[slug]\product-detail-route.module.css"

if (Test-Path -LiteralPath $oldRouteCss) {
  $timestamp = Get-Date -Format "yyyyMMdd-HHmmss"
  $backupPath = "$oldRouteCss.$timestamp.bak"
  Copy-Item -LiteralPath $oldRouteCss -Destination $backupPath -Force
  Remove-Item -LiteralPath $oldRouteCss -Force

  Write-Host "Old route CSS was backed up and removed: $backupPath" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Step 2 files were created successfully." -ForegroundColor Cyan
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
