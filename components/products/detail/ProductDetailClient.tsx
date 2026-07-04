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

import SitePageShell from "@/components/layout/SitePageShell";
import PdfDrawingPreview from "@/components/common/PdfDrawingPreview";
import { useMemo, useState } from "react";

import type { CSSProperties, MouseEvent } from "react";
import type { ProductDetailPageData } from "@/data/products/detail/product-detail.types";
import ProductModelViewer from "./ProductModelViewer";
import styles from "./product-detail.module.css";

type ProductDetailTab = "spec" | "model3d" | "drawing";

type ProductDetailClientProps = {
  data: ProductDetailPageData;
};

type ZoomStyle = CSSProperties & {
  "--zoom-x"?: string;
  "--zoom-y"?: string;
};

function getProductDrawingPreviewUrl(slug: string, configuredUrl?: string) {
  const normalizedConfiguredUrl = configuredUrl?.trim();

  if (normalizedConfiguredUrl) {
    return normalizedConfiguredUrl.includes("#")
      ? normalizedConfiguredUrl
      : normalizedConfiguredUrl + "#toolbar=0&navpanes=0&scrollbar=1";
  }

  const normalizedSlug = slug.trim().toLowerCase();
  const match = normalizedSlug.match(/^(ea|sm|tm)-(\d+)/);

  if (!match) {
    return "";
  }

  const seriesCode = match[1];
  const seriesUpper = seriesCode.toUpperCase();
  const capacityCode = String(Number(match[2])).padStart(4, "0") + "UL";

  return (
    "/assets/products/" +
    seriesCode +
    "/2d-drawings/" +
    seriesUpper +
    "-" +
    capacityCode +
    ".pdf#toolbar=0&navpanes=0&scrollbar=1"
  );
}
export default function ProductDetailClient({
  data,
}: ProductDetailClientProps) {
  const [activeTab, setActiveTab] = useState<ProductDetailTab>("spec");
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
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
    ? realImages.length > 0
    : true;
  const zoomStyle: ZoomStyle = {
    "--zoom-x": `${zoomPosition.x}%`,
    "--zoom-y": `${zoomPosition.y}%`,
  };

  const runtimeDataForSectionTitle = data as any;
  const sectionTitleMap =
    runtimeDataForSectionTitle.sectionTitleMap &&
    typeof runtimeDataForSectionTitle.sectionTitleMap === "object"
      ? runtimeDataForSectionTitle.sectionTitleMap
      : {};

  function getDbSectionTitle(sectionKey: string, fallback: string) {
    const value = sectionTitleMap[sectionKey];

    return typeof value === "string" && value.trim()
      ? value.trim()
      : fallback;
  }
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
    <div data-product-breadcrumb-shell="true">
<SitePageShell
      breadcrumbAriaLabel="面包屑导航"
      breadcrumbItems={[
        {
          label: "首页",
          href: "/",
        },
        {
          label: "产品中心",
          href: "/products/",
        },
        {
          label: data.model,
        },
      ]}
    >
      <main className={styles.page} data-product-detail-page="true">
      <div className={styles.container}>
        
        <section className={styles.productTop}>
          <div data-product-gallery="true" className={styles.gallery} aria-label="产品图片区域">
            <div data-product-main-stage="true"
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
                <img data-product-main-image="true"
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
              <div data-product-thumb-row="true" className={styles.thumbRow} aria-label="缩略图区域">
                <button
                  className={styles.thumbArrow}
                  type="button"
                  aria-label="上一张"
                  onClick={handlePreviousThumb}
                >
                  ‹
                </button>

                {hasRealImages ? (
                  realImages.slice(0, 5).map((image, index) => (
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
            </div>

            <p className={styles.productDesc}>
              {data.advantages.join("")}
            </p>

            <div className={styles.application}>
              <p className={styles.applicationTitle}>{getDbSectionTitle("applications", "常见应用：")}</p>
              <p className={styles.applicationText}>
                {data.commonApplications.join("、")}
              </p>
            </div>

            <div className={styles.operationArea}>
              <div data-product-model-row="true" className={styles.modelLine}>
                <div className={styles.modelCodeWrap}>
                  <span className={styles.modelLabel}>型号：</span>
                  <span className={styles.modelCode}>{(data as any).displayModel || data.model}</span>
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

              <div data-product-action-grid="true" className={styles.actionRow}>
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
                      <tr data-product-spec-row="true" key={`${item.label}-${item.value}`}>
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
                <ProductModelViewer
                  slug={data.slug}
                  modelName={data.model}
                  modelUrl={(data as any).model3dUrl || (data as any).resources?.model3dUrl}
                />
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
              {getProductDrawingPreviewUrl(data.slug, (data as any).drawing2dUrl || (data as any).drawingPdfUrl || (data as any).partDrawingUrl || (data as any).resources?.drawing2dUrl) ? (
                <PdfDrawingPreview
                  pdfPreviewUrl={getProductDrawingPreviewUrl(data.slug, (data as any).drawing2dUrl || (data as any).drawingPdfUrl || (data as any).partDrawingUrl || (data as any).resources?.drawing2dUrl)}
                  documentTitle={data.model}
                />
              ) : (
                <div className={styles.panelBox}>
                  当前产品尚未配置公开 2D 零件图。
                </div>
              )}
            </div>
          </div>
        </section>
        {data.faqs && data.faqs.length > 0 ? (
          <section className={styles.faqSection}>
            <div className={styles.faqHeader}>
              <h2>{getDbSectionTitle("faq", "常见问题")}</h2>
            </div>

            <div className={styles.faqList}>
              {data.faqs.map((item, index) => {
                const isOpen = openFaqIndex === index;

                return (
                  <article
                    className={[
                      styles.faqItem,
                      isOpen ? styles.faqItemOpen : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                    key={`${item.question}-${index}`}
                  >
                    <button
                      className={styles.faqQuestion}
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() =>
                        setOpenFaqIndex(isOpen ? null : index)
                      }
                    >
                      <span className={styles.faqQuestionText}>
                        {item.question}
                      </span>
                      <span
                        className={styles.faqToggle}
                        aria-hidden="true"
                      >
                        {isOpen ? "−" : "+"}
                      </span>
                    </button>
                    <div
                      className={styles.faqAnswerWrap}
                      aria-hidden={!isOpen}
                    >
                      <p className={styles.faqAnswer}>
                        {item.answer}
                      </p>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        ) : null}

      </div>
    </main>
    </SitePageShell>
</div>
  );
}