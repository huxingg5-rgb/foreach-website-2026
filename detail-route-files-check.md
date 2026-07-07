# 柱塞泵与隔膜泵详情页路由文件检查

## 1. 查找详情页 page.tsx 文件路径


FullName                                                                              
--------                                                                              
F:\WebsiteProjects\foreach-website-2026\app\products\pumps\diaphragm-pumps\[slug]\p...
F:\WebsiteProjects\foreach-website-2026\app\products\pumps\plunger-pumps\[slug]\pag...




---

## 2. 柱塞泵详情页路由文件

import { getPumpSeriesProductDetailAdapter } from "@/services/products/adapters/getPumpSeriesProductDetailAdapter";
import nodePath from "node:path";
import nodeFs from "node:fs";
import { notFound } from "next/navigation";
import type { ComponentType } from "react";
import ProductDetailClient from "@/components/products/detail/ProductDetailClient";
import * as plungerPumpDetailModule from "@/data/products/detail/plunger-pump-detail.generated";
import { selectionProducts } from "@/data/products/selection/product-selection.generated";

export const dynamicParams = false;

type PageParams = {
  slug: string;
};

type PageProps = {
  params: Promise<PageParams>;
};

type DetailRecord = Record<string, any>;

const ProductDetailView = ProductDetailClient as unknown as ComponentType<{
  data: any;
}>;

const LEGACY_SLUG_ALIASES: Record<string, string> = {
  "ea-standard-piston-pumps": "ea-100-pmma",
  "ea-standard-plunger-pumps": "ea-100-pmma",
  "sm-micro-piston-pumps": "sm-50-pmma",
  "sm-micro-plunger-pumps": "sm-50-pmma",
  "sm-miniature-piston-pumps": "sm-50-pmma",
  "sm-miniature-plunger-pumps": "sm-50-pmma",
  "tm-ultra-micro-piston-pumps": "tm-50-pmma",
  "tm-ultra-micro-plunger-pumps": "tm-50-pmma",
};

function isRecord(value: unknown): value is DetailRecord {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function getText(value: unknown) {
  return String(value || "").trim();
}

function normalizeSlug(value: unknown) {
  const parts = getText(value).split("/").filter(Boolean);
  return parts.length > 0 ? parts[parts.length - 1] : "";
}

function normalizeModelToSlug(value: unknown) {
  return getText(value)
    .toLowerCase()
    .replace(/渭/g, "u")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function looksLikeDetailRecord(value: unknown): value is DetailRecord {
  if (!isRecord(value)) return false;

  return Boolean(
    value.model ||
      value.slug ||
      value.detailSlug ||
      value.specifications ||
      value.description
  );
}

function collectDetailRecords(value: unknown, output: DetailRecord[]) {
  if (Array.isArray(value)) {
    value.forEach((item) => collectDetailRecords(item, output));
    return;
  }

  if (!isRecord(value)) {
    return;
  }

  if (looksLikeDetailRecord(value)) {
    output.push(value);
    return;
  }

  Object.values(value).forEach((item) => collectDetailRecords(item, output));
}

function getDetailList(): DetailRecord[] {
  const records: DetailRecord[] = [];

  Object.values(plungerPumpDetailModule).forEach((value) => {
    collectDetailRecords(value, records);
  });

  const map = new Map<string, DetailRecord>();

  records.forEach((item) => {
    const slug = getRecordSlug(item);

    if (slug && !map.has(slug)) {
      map.set(slug, item);
    }
  });

  return Array.from(map.values());
}

function getRecordSlug(item: DetailRecord) {
  return (
    normalizeSlug(item.slug) ||
    normalizeSlug(item.detailSlug) ||
    normalizeModelToSlug(item.model) ||
    normalizeModelToSlug(item.productId)
  );
}

function resolveLegacySlug(slug: string) {
  const cleanSlug = normalizeSlug(slug);
  return LEGACY_SLUG_ALIASES[cleanSlug] || cleanSlug;
}

function getDetailBySlug(slug: string) {
  const targetSlug = resolveLegacySlug(slug);

  return getDetailList().find((item) => {
    const candidates = [
      getRecordSlug(item),
      normalizeSlug(item.slug),
      normalizeSlug(item.detailSlug),
      normalizeModelToSlug(item.model),
      normalizeModelToSlug(item.productId),
    ].filter(Boolean);

    return candidates.includes(targetSlug);
  });
}

function normalizeSpecs(detail: DetailRecord) {
  const specs = Array.isArray(detail.specifications)
    ? detail.specifications
    : [];

  return specs
    .filter(isRecord)
    .map((item) => {
      const label = getText(item.label || item.name || item.title);
      const value = getText(item.value || item.content);

      return {
        label,
        name: label,
        title: label,
        value,
        content: value,
      };
    })
    .filter((item) => item.label && item.value);
}

function normalizeFaqs(detail: DetailRecord) {
  const faqs = Array.isArray(detail.faqs) ? detail.faqs : [];

  return faqs
    .filter(isRecord)
    .map((item) => ({
      question: getText(item.question),
      answer: getText(item.answer),
    }))
    .filter((item) => item.question && item.answer);
}

function getSeriesCommonApplications(seriesCode: string) {
  const code = seriesCode.toUpperCase();

  if (code === "SM") {
    return [
      "寰噺鍒嗛厤",
      "灏忓瀷鍖栨恫璺泦鎴?,
      "绱у噾鍨嬭澶囨恫浣撳鐞?,
      "妯″潡鍖栨恫璺泦鎴?,
    ];
  }

  if (code === "TM") {
    return [
      "瓒呭井閲忔恫浣撳鐞?,
      "绌洪棿鍙楅檺璁惧闆嗘垚",
      "灏忎綋绉恫璺ā鍧?,
      "浣庡閲忓弽搴旀恫澶勭悊",
    ];
  }

  return [
    "寰噺娑蹭綋鍚告帓",
    "璇曞墏鍒嗛厤",
    "鍙嶅簲娑茶浆绉?,
    "鑷姩鍖栧垎鏋愪华鍣ㄦ恫璺泦鎴?,
  ];
}


function normalizeKey(value: unknown) {
  return getText(value)
    .toLowerCase()
    .replace(/渭/g, "u")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function findSelectionImageByDetail(detail: DetailRecord) {
  const detailKeys = [
    detail.model,
    detail.productId,
    detail.slug,
    detail.detailSlug,
  ]
    .map(normalizeKey)
    .filter(Boolean);

  const matchedProduct = selectionProducts.find((product) => {
    const productKeys = [
      product.cardTitle?.en,
      product.cardTitle?.zh,
      product.productId,
      product.detailSlug,
    ]
      .map(normalizeKey)
      .filter(Boolean);

    return productKeys.some((key) => detailKeys.includes(key));
  });

  return getText(matchedProduct?.imageCard);
}

function getImagePath(detail: DetailRecord) {
  const existing = getText(
    detail.image ||
      detail.imageCard ||
      detail.heroImage ||
      detail.imageUrl
  );

  if (existing) {
    return existing;
  }

  const selectionImage = findSelectionImageByDetail(detail);

  if (selectionImage) {
    return selectionImage;
  }

  return "";
}



function getCapacityAssetCode(capacity: string) {
  const numberText = getText(capacity).match(/\d+/)?.[0];

  if (!numberText) {
    return "";
  }

  const value = Number(numberText);

  if (!Number.isFinite(value)) {
    return "";
  }

  return String(value).padStart(4, "0") + "UL";
}

function getPrivateAssetFileNames(detail: DetailRecord) {
  const seriesCode = getText(detail.seriesCode).toUpperCase();
  const capacityCode = getCapacityAssetCode(getText(detail.capacity));

  if (!seriesCode || !capacityCode) {
    return {
      drawing2dFileName: "",
      model3dFileName: "",
    };
  }

  return {
    drawing2dFileName: seriesCode + "-" + capacityCode + ".pdf",
    model3dFileName: seriesCode + "-" + capacityCode + ".glb",
  };
}




function makeAssetRequestUrl(model: string, assetType: "2d" | "3d") {
  const subject =
    assetType === "2d"
      ? "Request 2D Drawing - " + model
      : "Request 3D Model - " + model;

  return "/contact?subject=" + encodeURIComponent(subject);
}




function getCapacityFileCodeCandidates(seriesUpper: string, capacity: string) {
  const capacityText = getText(capacity).toLowerCase().replace(/\s+/g, "");
  const numberText = capacityText.match(/\d+(\.\d+)?/)?.[0] || "";
  const value = Number(numberText);

  if (!numberText || !Number.isFinite(value)) {
    return [];
  }

  if (capacityText.includes("ml")) {
    const ulCode = String(Math.round(value * 1000)).padStart(4, "0") + "UL";
    const mlCode = String(Math.round(value)).padStart(4, "0") + "ML";

    return [
      seriesUpper + "-" + ulCode,
      seriesUpper + "-" + mlCode,
    ];
  }

  const ulCode = String(Math.round(value)).padStart(4, "0") + "UL";

  return [
    seriesUpper + "-" + ulCode,
  ];
}

function pickExistingPublicAssetUrl(
  seriesCode: string,
  folderName: string,
  extension: ".pdf" | ".glb",
  fileCodeCandidates: string[]
) {
  for (const fileCode of fileCodeCandidates) {
    const fileName = fileCode + extension;

    const filePath = nodePath.join(
      process.cwd(),
      "public",
      "assets",
      "products",
      seriesCode,
      folderName,
      fileName
    );

    if (nodeFs.existsSync(filePath)) {
      return (
        "/assets/products/" +
        seriesCode +
        "/" +
        folderName +
        "/" +
        fileName
      );
    }
  }

  return "";
}

function getPublicAssetUrls(detail: DetailRecord) {
  const seriesCode = getText(detail.seriesCode).toLowerCase();
  const seriesUpper = getText(detail.seriesCode).toUpperCase();
  const fileCodeCandidates = getCapacityFileCodeCandidates(
    seriesUpper,
    getText(detail.capacity)
  );

  if (!seriesCode || !seriesUpper || fileCodeCandidates.length === 0) {
    return {
      drawing2dUrl: "",
      model3dUrl: "",
    };
  }

  return {
    drawing2dUrl: pickExistingPublicAssetUrl(
      seriesCode,
      "2d-drawings",
      ".pdf",
      fileCodeCandidates
    ),
    model3dUrl: pickExistingPublicAssetUrl(
      seriesCode,
      "3d-models",
      ".glb",
      fileCodeCandidates
    ),
  };
}





function adaptToProductDetailClientData(detail: DetailRecord) {
  const model = getText(detail.model || detail.name || detail.title);
  const slug = getRecordSlug(detail);
  const seriesName = getText(detail.seriesName || detail.series);
  const seriesCode = getText(detail.seriesCode);
  const capacity = getText(detail.capacity);
  const pumpHeadMaterial = getText(
    detail.pumpHeadMaterial || detail.material
  );
  const description = getText(
    detail.description || detail.summary || detail.intro || detail.overview
  );
  const image = getImagePath(detail);
  const specifications = normalizeSpecs(detail);
  const faqs = normalizeFaqs(detail);
  const assetFiles = getPrivateAssetFileNames(detail);
  const publicAssetUrls = getPublicAssetUrls(detail);

  const applicationItems =
    seriesCode.toUpperCase() === "SM"
      ? [
          "寰噺鍒嗛厤",
          "灏忓瀷鍖栨恫璺泦鎴?,
          "绱у噾鍨嬭澶囨恫浣撳鐞?,
          "妯″潡鍖栨恫璺泦鎴?,
        ]
      : seriesCode.toUpperCase() === "TM"
        ? [
            "瓒呭井閲忔恫浣撳鐞?,
            "绌洪棿鍙楅檺璁惧闆嗘垚",
            "灏忎綋绉恫璺ā鍧?,
            "浣庡閲忓弽搴旀恫澶勭悊",
          ]
        : [
            "寰噺娑蹭綋鍚告帓",
            "璇曞墏鍒嗛厤",
            "鍙嶅簲娑茶浆绉?,
            "鑷姩鍖栧垎鏋愪华鍣ㄦ恫璺泦鎴?,
          ];

  return {
    ...detail,

    id: getText(detail.productId) || slug,
    productId: getText(detail.productId) || slug,
    slug,
    detailSlug: slug,

    name: model,
    title: model,
    model,
    productName: model,
    productCode: model,

    series: seriesName,
    seriesName,
    seriesCode,
    category: "pumps",
    categoryId: "pumps",
    productType: "plunger-pump",
    productTypeId: "plunger-pump",

    capacity,
    pumpHeadMaterial,
    material: pumpHeadMaterial,

    description,
    summary: description,
    intro: description,
    productIntro: description,
    overview: description,

    advantages: description ? [description] : [],
    commonApplications: applicationItems,
    applications: applicationItems,
    applicationScenarios: applicationItems,

    image,
    imageUrl: image,
    imageCard: image,
    heroImage: image,
    mainImage: image,
    coverImage: image,
    imageAlt: model,

    images: image ? [{ src: image, alt: model }] : [],
    additionalImages: [],
    galleryImages: image ? [image] : [],

    productImages: image
      ? {
          main: {
            src: image,
            alt: model,
          },
        }
      : undefined,

    specifications,
    specs: specifications,
    specList: specifications,
    technicalSpecifications: specifications,
    specGroups: [
      {
        title: "鎶€鏈弬鏁?,
        items: specifications,
      },
    ],

    faqs,

    resources: {
      drawing2dRequestOnly: false,
      model3dRequestOnly: false,
      drawing2dFileName: assetFiles.drawing2dFileName,
      model3dFileName: assetFiles.model3dFileName,
      drawing2dUrl: publicAssetUrls.drawing2dUrl,
      model3dUrl: publicAssetUrls.model3dUrl,
    },

    drawing2dRequestOnly: false,
    model3dRequestOnly: false,
    drawing2dFileName: assetFiles.drawing2dFileName,
    model3dFileName: assetFiles.model3dFileName,

    model3dUrl: publicAssetUrls.model3dUrl,
    drawing2dUrl: publicAssetUrls.drawing2dUrl,
    drawingPdfUrl: publicAssetUrls.drawing2dUrl,

    model3dHref: publicAssetUrls.model3dUrl,
    drawing2dHref: publicAssetUrls.drawing2dUrl,
    drawingHref: publicAssetUrls.drawing2dUrl,
    partDrawingUrl: publicAssetUrls.drawing2dUrl,
    partDrawingHref: publicAssetUrls.drawing2dUrl,

    model3dText: "鏌ョ湅 3D 妯″瀷",
    drawing2dText: "鏌ョ湅 2D 鍥剧焊",
    drawingText: "鏌ョ湅闆朵欢鍥?,
    partDrawingText: "鏌ョ湅闆朵欢鍥?,

    breadcrumbs: [
      { label: "浜у搧涓績", href: "/products" },
      { label: "娉?, href: "/products/pumps" },
      { label: "鏌卞娉?, href: "/products/pumps/plunger-pumps" },
      { label: model, href: "/products/pumps/plunger-pumps/" + slug },
    ],
  };
}





function getPreferredProductDetailData(slug: string) {
  const dbData = getPumpSeriesProductDetailAdapter(slug, "zh");

  if (dbData) {
    return dbData;
  }

  const legacyDetail = getDetailBySlug(slug);

  if (!legacyDetail) {
    return null;
  }

  return adaptToProductDetailClientData(legacyDetail);
}

export function generateStaticParams() {
  const detailParams = getDetailList()
    .map((item) => getRecordSlug(item))
    .filter(Boolean)
    .map((slug) => ({ slug }));

  const legacyParams = Object.keys(LEGACY_SLUG_ALIASES).map((slug) => ({
    slug,
  }));

  return [...detailParams, ...legacyParams];
}

export async function generateMetadata({ params }: PageProps) {
  const resolvedParams = await params;
  const data = getPreferredProductDetailData(resolvedParams.slug);

  if (!data) {
    return {
      title: "Plunger Pump Detail | FOREACH",
    };
  }

  const pageData = data as any;
  const title =
    getText(pageData.seoTitle || pageData.metaTitle || pageData.model || pageData.title) ||
    "Plunger Pump";

  const description = getText(
    pageData.seoDescription ||
      pageData.metaDescription ||
      pageData.description ||
      pageData.summary
  );

  return {
    title: title.includes("FOREACH") ? title : `${title} | FOREACH`,
    description,
  };
}

export default async function PlungerPumpDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  const data = getPreferredProductDetailData(resolvedParams.slug);

  if (!data) {
    notFound();
  }

  return <ProductDetailView data={data} />;
}

---

## 3. 隔膜泵详情页路由文件

import fs from "fs";
import path from "path";
import Link from "next/link";
import { notFound } from "next/navigation";
import "../diaphragm-pump-detail.css";

import detailsJson from "@/data/products/generated/pumps/diaphragm-pumps/detail/index.json";

type Params = Promise<{
  slug: string;
}>;

type DiaphragmMedia = {
  resourceId?: string;
  version?: string;
  displayName?: string;
  resourceType?: string;
  pagePosition?: string;
  fileName?: string;
  path?: string;
  fullPath?: string;
  alt?: string;
  caption?: string;
  sourcePdfPage?: string;
  status?: string;
};

type DiaphragmSpec = {
  tableName?: string;
  parameter?: string;
  value?: string;
  note?: string;
};

type DiaphragmModelConfig = {
  itemCode?: string;
  model?: string;
  category?: string;
  motorType?: string;
  voltage?: string;
  connectionType?: string;
  portDirection?: string;
  diaphragm?: string;
  valvePlate?: string;
  pumpHead?: string;
  detailSlug?: string;
  reservedModelSlug?: string;
  note?: string;
};

type DiaphragmFaq = {
  question?: string;
  answer?: string;
  seoDirection?: string;
};

type DiaphragmDetail = {
  seriesId: string;
  slug: string;
  category?: string;
  title?: string;
  displayName?: string;
  path?: string;
  description?: string;
  commonApplications?: string;
  modelDisplay?: string;
  modelButtonText?: string;
  status?: string;
  seo?: {
    title?: string;
    description?: string;
    pageTitle?: string;
    path?: string;
  };
  specifications?: DiaphragmSpec[];
  modelConfigurations?: DiaphragmModelConfig[];
  faqs?: DiaphragmFaq[];
  media?: DiaphragmMedia[];
};

const details = detailsJson as DiaphragmDetail[];

function findDetail(slug: string) {
  return details.find((item) => item.slug === slug);
}

function publicSrcFromFullPath(fullPath?: string) {
  const value = String(fullPath || "").replaceAll("\\", "/");

  if (!value) return "";

  if (value.startsWith("public/")) {
    return "/" + value.slice("public/".length);
  }

  if (value.startsWith("/public/")) {
    return value.replace(/^\/public\//, "/");
  }

  return value.startsWith("/") ? value : "/" + value;
}

function existingPublicSrc(media?: DiaphragmMedia) {
  if (!media?.fullPath) return "";

  const diskPath = path.join(process.cwd(), media.fullPath);

  if (!fs.existsSync(diskPath)) {
    return "";
  }

  return publicSrcFromFullPath(media.fullPath);
}

function findMainImage(detail: DiaphragmDetail) {
  return detail.media?.find((item) => item.resourceType?.includes("主图"));
}

function groupSpecs(specs: DiaphragmSpec[]) {
  return specs.reduce<Record<string, DiaphragmSpec[]>>((acc, item) => {
    const key = item.tableName || "规格参数";
    acc[key] = acc[key] || [];
    acc[key].push(item);
    return acc;
  }, {});
}

function splitApplications(value?: string) {
  return String(value || "")
    .split(/[、,，]/)
    .map((item) => item.trim())
    .filter(Boolean);
}

export function generateStaticParams() {
  return details.map((item) => ({
    slug: item.slug,
  }));
}

export async function generateMetadata({ params }: { params: Params }) {
  const { slug } = await params;
  const detail = findDetail(slug);

  if (!detail) {
    return {
      title: "隔膜泵详情 | FOREACH",
    };
  }

  return {
    title: detail.seo?.title || `${detail.title} | FOREACH`,
    description: detail.seo?.description || detail.description || "",
  };
}

export default async function DiaphragmPumpDetailPage({
  params,
}: {
  params: Params;
}) {
  const { slug } = await params;
  const detail = findDetail(slug);

  if (!detail) {
    notFound();
  }

  const mainImage = findMainImage(detail);
  const mainImageSrc = existingPublicSrc(mainImage);
  const applications = splitApplications(detail.commonApplications);
  const specsByTable = groupSpecs(detail.specifications || []);

  return (
    <main className="diaphragm-detail-page">
      <div className="diaphragm-detail-inner">
        <nav className="diaphragm-breadcrumb" aria-label="Breadcrumb">
          <Link href="/products">产品中心</Link>
          <span>/</span>
          <Link href="/products/pumps">泵</Link>
          <span>/</span>
          <Link href="/products/pumps/diaphragm-pumps">隔膜泵</Link>
          <span>/</span>
          <span>{detail.title}</span>
        </nav>

        <section className="diaphragm-hero">
          <div className="diaphragm-hero-media">
            {mainImageSrc ? (
              <img
                src={mainImageSrc}
                alt={mainImage?.alt || detail.title || "Diaphragm pump"}
              />
            ) : (
              <div className="diaphragm-media-placeholder">
                <strong>{detail.title}</strong>
                <span>主图待放置</span>
                <br />
                <span>{mainImage?.fileName}</span>
              </div>
            )}
          </div>

          <div className="diaphragm-hero-copy">
            <div className="diaphragm-kicker">{detail.category || "隔膜泵"}</div>
            <h1 className="diaphragm-title">{detail.title}</h1>
            <p className="diaphragm-desc">{detail.description}</p>

            <div className="diaphragm-model-line">
              <strong>型号：</strong>
              <span>{detail.modelDisplay || `${detail.seriesId} 标准型号`}</span>
              <a className="diaphragm-primary-link" href="#model-configuration">
                {detail.modelButtonText || "型号配置"}
              </a>
            </div>
          </div>
        </section>

        {applications.length > 0 && (
          <section className="diaphragm-section">
            <h2 className="diaphragm-section-title">常见应用</h2>
            <ul className="diaphragm-applications">
              {applications.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        )}

        <section className="diaphragm-section" id="specifications">
          <h2 className="diaphragm-section-title">规格参数</h2>

          {Object.entries(specsByTable).map(([tableName, rows]) => (
            <div key={tableName}>
              <h3 className="diaphragm-subtitle">{tableName}</h3>
              <div className="diaphragm-table-wrap">
                <table className="diaphragm-table">
                  <thead>
                    <tr>
                      <th>参数</th>
                      <th>规格值</th>
                      <th>备注</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((row, index) => (
                      <tr key={`${tableName}-${row.parameter}-${index}`}>
                        <td>{row.parameter}</td>
                        <td>{row.value}</td>
                        <td>{row.note}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </section>

        <section className="diaphragm-section" id="model-configuration">
          <h2 className="diaphragm-section-title">型号配置</h2>
          <div className="diaphragm-table-wrap">
            <table className="diaphragm-table">
              <thead>
                <tr>
                  <th>商品编码</th>
                  <th>产品型号</th>
                  <th>电机类型</th>
                  <th>电压</th>
                  <th>连接方式</th>
                  <th>膜片</th>
                  <th>阀片</th>
                  <th>泵头</th>
                </tr>
              </thead>
              <tbody>
                {(detail.modelConfigurations || []).map((item) => (
                  <tr key={`${item.itemCode}-${item.model}`}>
                    <td>{item.itemCode}</td>
                    <td>{item.model}</td>
                    <td>{item.motorType}</td>
                    <td>{item.voltage}</td>
                    <td>{item.connectionType}</td>
                    <td>{item.diaphragm}</td>
                    <td>{item.valvePlate}</td>
                    <td>{item.pumpHead}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {(detail.media || []).length > 0 && (
          <section className="diaphragm-section">
            <h2 className="diaphragm-section-title">图纸与资源</h2>
            <div className="diaphragm-media-list">
              {(detail.media || []).map((item) => (
                <div className="diaphragm-media-item" key={item.resourceId}>
                  <strong>{item.resourceType}</strong>
                  <span>{item.caption || item.displayName}</span>
                  <span>{item.fileName}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {(detail.faqs || []).length > 0 && (
          <section className="diaphragm-section">
            <h2 className="diaphragm-section-title">常见问题</h2>
            {(detail.faqs || []).map((item) => (
              <div className="diaphragm-faq" key={item.question}>
                <h3>{item.question}</h3>
                <p>{item.answer}</p>
              </div>
            ))}
          </section>
        )}
      </div>
    </main>
  );
}

---

## 4. 两个详情页是否引用 ProductDetailClient


### F:\WebsiteProjects\foreach-website-2026\app\products\pumps\plunger-pumps\[slug]\page.tsx Line 1

import { getPumpSeriesProductDetailAdapter } from "@/services/products/adapters/getPumpSeriesProductDetailAdapter";
import nodePath from "node:path";
import nodeFs from "node:fs";
import { notFound } from "next/navigation";
import type { ComponentType } from "react";
import ProductDetailClient from "@/components/products/detail/ProductDetailClient";
import * as plungerPumpDetailModule from "@/data/products/detail/plunger-pump-detail.generated";
import { selectionProducts } from "@/data/products/selection/product-selection.generated";

export const dynamicParams = false;

type PageParams = {
  slug: string;

### F:\WebsiteProjects\foreach-website-2026\app\products\pumps\plunger-pumps\[slug]\page.tsx Line 6

import { getPumpSeriesProductDetailAdapter } from "@/services/products/adapters/getPumpSeriesProductDetailAdapter";
import nodePath from "node:path";
import nodeFs from "node:fs";
import { notFound } from "next/navigation";
import type { ComponentType } from "react";
import ProductDetailClient from "@/components/products/detail/ProductDetailClient";
import * as plungerPumpDetailModule from "@/data/products/detail/plunger-pump-detail.generated";
import { selectionProducts } from "@/data/products/selection/product-selection.generated";

export const dynamicParams = false;

type PageParams = {
  slug: string;
};

type PageProps = {
  params: Promise<PageParams>;
};

### F:\WebsiteProjects\foreach-website-2026\app\products\pumps\plunger-pumps\[slug]\page.tsx Line 7

import nodePath from "node:path";
import nodeFs from "node:fs";
import { notFound } from "next/navigation";
import type { ComponentType } from "react";
import ProductDetailClient from "@/components/products/detail/ProductDetailClient";
import * as plungerPumpDetailModule from "@/data/products/detail/plunger-pump-detail.generated";
import { selectionProducts } from "@/data/products/selection/product-selection.generated";

export const dynamicParams = false;

type PageParams = {
  slug: string;
};

type PageProps = {
  params: Promise<PageParams>;
};


### F:\WebsiteProjects\foreach-website-2026\app\products\pumps\plunger-pumps\[slug]\page.tsx Line 22

  params: Promise<PageParams>;
};

type DetailRecord = Record<string, any>;

const ProductDetailView = ProductDetailClient as unknown as ComponentType<{
  data: any;
}>;

const LEGACY_SLUG_ALIASES: Record<string, string> = {
  "ea-standard-piston-pumps": "ea-100-pmma",
  "ea-standard-plunger-pumps": "ea-100-pmma",
  "sm-micro-piston-pumps": "sm-50-pmma",
  "sm-micro-plunger-pumps": "sm-50-pmma",
  "sm-miniature-piston-pumps": "sm-50-pmma",
  "sm-miniature-plunger-pumps": "sm-50-pmma",
  "tm-ultra-micro-piston-pumps": "tm-50-pmma",
  "tm-ultra-micro-plunger-pumps": "tm-50-pmma",

### F:\WebsiteProjects\foreach-website-2026\app\products\pumps\plunger-pumps\[slug]\page.tsx Line 28

  data: any;
}>;

const LEGACY_SLUG_ALIASES: Record<string, string> = {
  "ea-standard-piston-pumps": "ea-100-pmma",
  "ea-standard-plunger-pumps": "ea-100-pmma",
  "sm-micro-piston-pumps": "sm-50-pmma",
  "sm-micro-plunger-pumps": "sm-50-pmma",
  "sm-miniature-piston-pumps": "sm-50-pmma",
  "sm-miniature-plunger-pumps": "sm-50-pmma",
  "tm-ultra-micro-piston-pumps": "tm-50-pmma",
  "tm-ultra-micro-plunger-pumps": "tm-50-pmma",
};

function isRecord(value: unknown): value is DetailRecord {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}


### F:\WebsiteProjects\foreach-website-2026\app\products\pumps\plunger-pumps\[slug]\page.tsx Line 30


const LEGACY_SLUG_ALIASES: Record<string, string> = {
  "ea-standard-piston-pumps": "ea-100-pmma",
  "ea-standard-plunger-pumps": "ea-100-pmma",
  "sm-micro-piston-pumps": "sm-50-pmma",
  "sm-micro-plunger-pumps": "sm-50-pmma",
  "sm-miniature-piston-pumps": "sm-50-pmma",
  "sm-miniature-plunger-pumps": "sm-50-pmma",
  "tm-ultra-micro-piston-pumps": "tm-50-pmma",
  "tm-ultra-micro-plunger-pumps": "tm-50-pmma",
};

function isRecord(value: unknown): value is DetailRecord {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function getText(value: unknown) {
  return String(value || "").trim();

### F:\WebsiteProjects\foreach-website-2026\app\products\pumps\plunger-pumps\[slug]\page.tsx Line 32

  "ea-standard-piston-pumps": "ea-100-pmma",
  "ea-standard-plunger-pumps": "ea-100-pmma",
  "sm-micro-piston-pumps": "sm-50-pmma",
  "sm-micro-plunger-pumps": "sm-50-pmma",
  "sm-miniature-piston-pumps": "sm-50-pmma",
  "sm-miniature-plunger-pumps": "sm-50-pmma",
  "tm-ultra-micro-piston-pumps": "tm-50-pmma",
  "tm-ultra-micro-plunger-pumps": "tm-50-pmma",
};

function isRecord(value: unknown): value is DetailRecord {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function getText(value: unknown) {
  return String(value || "").trim();
}


### F:\WebsiteProjects\foreach-website-2026\app\products\pumps\plunger-pumps\[slug]\page.tsx Line 34

  "sm-micro-piston-pumps": "sm-50-pmma",
  "sm-micro-plunger-pumps": "sm-50-pmma",
  "sm-miniature-piston-pumps": "sm-50-pmma",
  "sm-miniature-plunger-pumps": "sm-50-pmma",
  "tm-ultra-micro-piston-pumps": "tm-50-pmma",
  "tm-ultra-micro-plunger-pumps": "tm-50-pmma",
};

function isRecord(value: unknown): value is DetailRecord {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function getText(value: unknown) {
  return String(value || "").trim();
}

function normalizeSlug(value: unknown) {
  const parts = getText(value).split("/").filter(Boolean);

### F:\WebsiteProjects\foreach-website-2026\app\products\pumps\plunger-pumps\[slug]\page.tsx Line 91

}

function getDetailList(): DetailRecord[] {
  const records: DetailRecord[] = [];

  Object.values(plungerPumpDetailModule).forEach((value) => {
    collectDetailRecords(value, records);
  });

  const map = new Map<string, DetailRecord>();

  records.forEach((item) => {
    const slug = getRecordSlug(item);

    if (slug && !map.has(slug)) {
      map.set(slug, item);
    }
  });

### F:\WebsiteProjects\foreach-website-2026\app\products\pumps\plunger-pumps\[slug]\page.tsx Line 122

function resolveLegacySlug(slug: string) {
  const cleanSlug = normalizeSlug(slug);
  return LEGACY_SLUG_ALIASES[cleanSlug] || cleanSlug;
}

function getDetailBySlug(slug: string) {
  const targetSlug = resolveLegacySlug(slug);

  return getDetailList().find((item) => {
    const candidates = [
      getRecordSlug(item),
      normalizeSlug(item.slug),
      normalizeSlug(item.detailSlug),
      normalizeModelToSlug(item.model),
      normalizeModelToSlug(item.productId),
    ].filter(Boolean);

    return candidates.includes(targetSlug);

### F:\WebsiteProjects\foreach-website-2026\app\products\pumps\plunger-pumps\[slug]\page.tsx Line 402






function adaptToProductDetailClientData(detail: DetailRecord) {
  const model = getText(detail.model || detail.name || detail.title);
  const slug = getRecordSlug(detail);
  const seriesName = getText(detail.seriesName || detail.series);
  const seriesCode = getText(detail.seriesCode);
  const capacity = getText(detail.capacity);
  const pumpHeadMaterial = getText(
    detail.pumpHeadMaterial || detail.material
  );
  const description = getText(
    detail.description || detail.summary || detail.intro || detail.overview
  );
  const image = getImagePath(detail);

### F:\WebsiteProjects\foreach-website-2026\app\products\pumps\plunger-pumps\[slug]\page.tsx Line 461

    series: seriesName,
    seriesName,
    seriesCode,
    category: "pumps",
    categoryId: "pumps",
    productType: "plunger-pump",
    productTypeId: "plunger-pump",

    capacity,
    pumpHeadMaterial,
    material: pumpHeadMaterial,

    description,
    summary: description,
    intro: description,
    productIntro: description,
    overview: description,


### F:\WebsiteProjects\foreach-website-2026\app\products\pumps\plunger-pumps\[slug]\page.tsx Line 462

    seriesName,
    seriesCode,
    category: "pumps",
    categoryId: "pumps",
    productType: "plunger-pump",
    productTypeId: "plunger-pump",

    capacity,
    pumpHeadMaterial,
    material: pumpHeadMaterial,

    description,
    summary: description,
    intro: description,
    productIntro: description,
    overview: description,

    advantages: description ? [description] : [],

### F:\WebsiteProjects\foreach-website-2026\app\products\pumps\plunger-pumps\[slug]\page.tsx Line 545

    partDrawingText: "查看零件图",

    breadcrumbs: [
      { label: "产品中心", href: "/products" },
      { label: "泵", href: "/products/pumps" },
      { label: "柱塞泵", href: "/products/pumps/plunger-pumps" },
      { label: model, href: "/products/pumps/plunger-pumps/" + slug },
    ],
  };
}





function getPreferredProductDetailData(slug: string) {
  const dbData = getPumpSeriesProductDetailAdapter(slug, "zh");


### F:\WebsiteProjects\foreach-website-2026\app\products\pumps\plunger-pumps\[slug]\page.tsx Line 546


    breadcrumbs: [
      { label: "产品中心", href: "/products" },
      { label: "泵", href: "/products/pumps" },
      { label: "柱塞泵", href: "/products/pumps/plunger-pumps" },
      { label: model, href: "/products/pumps/plunger-pumps/" + slug },
    ],
  };
}





function getPreferredProductDetailData(slug: string) {
  const dbData = getPumpSeriesProductDetailAdapter(slug, "zh");

  if (dbData) {

### F:\WebsiteProjects\foreach-website-2026\app\products\pumps\plunger-pumps\[slug]\page.tsx Line 556





function getPreferredProductDetailData(slug: string) {
  const dbData = getPumpSeriesProductDetailAdapter(slug, "zh");

  if (dbData) {
    return dbData;
  }

  const legacyDetail = getDetailBySlug(slug);

  if (!legacyDetail) {
    return null;
  }

  return adaptToProductDetailClientData(legacyDetail);

### F:\WebsiteProjects\foreach-website-2026\app\products\pumps\plunger-pumps\[slug]\page.tsx Line 562


  if (dbData) {
    return dbData;
  }

  const legacyDetail = getDetailBySlug(slug);

  if (!legacyDetail) {
    return null;
  }

  return adaptToProductDetailClientData(legacyDetail);
}

export function generateStaticParams() {
  const detailParams = getDetailList()
    .map((item) => getRecordSlug(item))
    .filter(Boolean)

### F:\WebsiteProjects\foreach-website-2026\app\products\pumps\plunger-pumps\[slug]\page.tsx Line 568


  if (!legacyDetail) {
    return null;
  }

  return adaptToProductDetailClientData(legacyDetail);
}

export function generateStaticParams() {
  const detailParams = getDetailList()
    .map((item) => getRecordSlug(item))
    .filter(Boolean)
    .map((slug) => ({ slug }));

  const legacyParams = Object.keys(LEGACY_SLUG_ALIASES).map((slug) => ({
    slug,
  }));


### F:\WebsiteProjects\foreach-website-2026\app\products\pumps\plunger-pumps\[slug]\page.tsx Line 571

  }

  return adaptToProductDetailClientData(legacyDetail);
}

export function generateStaticParams() {
  const detailParams = getDetailList()
    .map((item) => getRecordSlug(item))
    .filter(Boolean)
    .map((slug) => ({ slug }));

  const legacyParams = Object.keys(LEGACY_SLUG_ALIASES).map((slug) => ({
    slug,
  }));

  return [...detailParams, ...legacyParams];
}


### F:\WebsiteProjects\foreach-website-2026\app\products\pumps\plunger-pumps\[slug]\page.tsx Line 590

  const resolvedParams = await params;
  const data = getPreferredProductDetailData(resolvedParams.slug);

  if (!data) {
    return {
      title: "Plunger Pump Detail | FOREACH",
    };
  }

  const pageData = data as any;
  const title =
    getText(pageData.seoTitle || pageData.metaTitle || pageData.model || pageData.title) ||
    "Plunger Pump";

  const description = getText(
    pageData.seoDescription ||
      pageData.metaDescription ||
      pageData.description ||

### F:\WebsiteProjects\foreach-website-2026\app\products\pumps\plunger-pumps\[slug]\page.tsx Line 597

  }

  const pageData = data as any;
  const title =
    getText(pageData.seoTitle || pageData.metaTitle || pageData.model || pageData.title) ||
    "Plunger Pump";

  const description = getText(
    pageData.seoDescription ||
      pageData.metaDescription ||
      pageData.description ||
      pageData.summary
  );

  return {
    title: title.includes("FOREACH") ? title : `${title} | FOREACH`,
    description,
  };

### F:\WebsiteProjects\foreach-website-2026\app\products\pumps\plunger-pumps\[slug]\page.tsx Line 612

    title: title.includes("FOREACH") ? title : `${title} | FOREACH`,
    description,
  };
}

export default async function PlungerPumpDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  const data = getPreferredProductDetailData(resolvedParams.slug);

  if (!data) {
    notFound();
  }

  return <ProductDetailView data={data} />;
}

### F:\WebsiteProjects\foreach-website-2026\app\products\pumps\diaphragm-pumps\[slug]\page.tsx Line 5

import fs from "fs";
import path from "path";
import Link from "next/link";
import { notFound } from "next/navigation";
import "../diaphragm-pump-detail.css";

import detailsJson from "@/data/products/generated/pumps/diaphragm-pumps/detail/index.json";

type Params = Promise<{
  slug: string;
}>;

type DiaphragmMedia = {
  resourceId?: string;
  version?: string;
  displayName?: string;
  resourceType?: string;

### F:\WebsiteProjects\foreach-website-2026\app\products\pumps\diaphragm-pumps\[slug]\page.tsx Line 7

import path from "path";
import Link from "next/link";
import { notFound } from "next/navigation";
import "../diaphragm-pump-detail.css";

import detailsJson from "@/data/products/generated/pumps/diaphragm-pumps/detail/index.json";

type Params = Promise<{
  slug: string;
}>;

type DiaphragmMedia = {
  resourceId?: string;
  version?: string;
  displayName?: string;
  resourceType?: string;
  pagePosition?: string;
  fileName?: string;

### F:\WebsiteProjects\foreach-website-2026\app\products\pumps\diaphragm-pumps\[slug]\page.tsx Line 13


type Params = Promise<{
  slug: string;
}>;

type DiaphragmMedia = {
  resourceId?: string;
  version?: string;
  displayName?: string;
  resourceType?: string;
  pagePosition?: string;
  fileName?: string;
  path?: string;
  fullPath?: string;
  alt?: string;
  caption?: string;
  sourcePdfPage?: string;
  status?: string;

### F:\WebsiteProjects\foreach-website-2026\app\products\pumps\diaphragm-pumps\[slug]\page.tsx Line 28

  caption?: string;
  sourcePdfPage?: string;
  status?: string;
};

type DiaphragmSpec = {
  tableName?: string;
  parameter?: string;
  value?: string;
  note?: string;
};

type DiaphragmModelConfig = {
  itemCode?: string;
  model?: string;
  category?: string;
  motorType?: string;
  voltage?: string;

### F:\WebsiteProjects\foreach-website-2026\app\products\pumps\diaphragm-pumps\[slug]\page.tsx Line 35

  parameter?: string;
  value?: string;
  note?: string;
};

type DiaphragmModelConfig = {
  itemCode?: string;
  model?: string;
  category?: string;
  motorType?: string;
  voltage?: string;
  connectionType?: string;
  portDirection?: string;
  diaphragm?: string;
  valvePlate?: string;
  pumpHead?: string;
  detailSlug?: string;
  reservedModelSlug?: string;

### F:\WebsiteProjects\foreach-website-2026\app\products\pumps\diaphragm-pumps\[slug]\page.tsx Line 43

  category?: string;
  motorType?: string;
  voltage?: string;
  connectionType?: string;
  portDirection?: string;
  diaphragm?: string;
  valvePlate?: string;
  pumpHead?: string;
  detailSlug?: string;
  reservedModelSlug?: string;
  note?: string;
};

type DiaphragmFaq = {
  question?: string;
  answer?: string;
  seoDirection?: string;
};

### F:\WebsiteProjects\foreach-website-2026\app\products\pumps\diaphragm-pumps\[slug]\page.tsx Line 51

  detailSlug?: string;
  reservedModelSlug?: string;
  note?: string;
};

type DiaphragmFaq = {
  question?: string;
  answer?: string;
  seoDirection?: string;
};

type DiaphragmDetail = {
  seriesId: string;
  slug: string;
  category?: string;
  title?: string;
  displayName?: string;
  path?: string;

### F:\WebsiteProjects\foreach-website-2026\app\products\pumps\diaphragm-pumps\[slug]\page.tsx Line 57

  question?: string;
  answer?: string;
  seoDirection?: string;
};

type DiaphragmDetail = {
  seriesId: string;
  slug: string;
  category?: string;
  title?: string;
  displayName?: string;
  path?: string;
  description?: string;
  commonApplications?: string;
  modelDisplay?: string;
  modelButtonText?: string;
  status?: string;
  seo?: {

### F:\WebsiteProjects\foreach-website-2026\app\products\pumps\diaphragm-pumps\[slug]\page.tsx Line 75

    title?: string;
    description?: string;
    pageTitle?: string;
    path?: string;
  };
  specifications?: DiaphragmSpec[];
  modelConfigurations?: DiaphragmModelConfig[];
  faqs?: DiaphragmFaq[];
  media?: DiaphragmMedia[];
};

const details = detailsJson as DiaphragmDetail[];

function findDetail(slug: string) {
  return details.find((item) => item.slug === slug);
}

function publicSrcFromFullPath(fullPath?: string) {

### F:\WebsiteProjects\foreach-website-2026\app\products\pumps\diaphragm-pumps\[slug]\page.tsx Line 76

    description?: string;
    pageTitle?: string;
    path?: string;
  };
  specifications?: DiaphragmSpec[];
  modelConfigurations?: DiaphragmModelConfig[];
  faqs?: DiaphragmFaq[];
  media?: DiaphragmMedia[];
};

const details = detailsJson as DiaphragmDetail[];

function findDetail(slug: string) {
  return details.find((item) => item.slug === slug);
}

function publicSrcFromFullPath(fullPath?: string) {
  const value = String(fullPath || "").replaceAll("\\", "/");

### F:\WebsiteProjects\foreach-website-2026\app\products\pumps\diaphragm-pumps\[slug]\page.tsx Line 77

    pageTitle?: string;
    path?: string;
  };
  specifications?: DiaphragmSpec[];
  modelConfigurations?: DiaphragmModelConfig[];
  faqs?: DiaphragmFaq[];
  media?: DiaphragmMedia[];
};

const details = detailsJson as DiaphragmDetail[];

function findDetail(slug: string) {
  return details.find((item) => item.slug === slug);
}

function publicSrcFromFullPath(fullPath?: string) {
  const value = String(fullPath || "").replaceAll("\\", "/");


### F:\WebsiteProjects\foreach-website-2026\app\products\pumps\diaphragm-pumps\[slug]\page.tsx Line 78

    path?: string;
  };
  specifications?: DiaphragmSpec[];
  modelConfigurations?: DiaphragmModelConfig[];
  faqs?: DiaphragmFaq[];
  media?: DiaphragmMedia[];
};

const details = detailsJson as DiaphragmDetail[];

function findDetail(slug: string) {
  return details.find((item) => item.slug === slug);
}

function publicSrcFromFullPath(fullPath?: string) {
  const value = String(fullPath || "").replaceAll("\\", "/");

  if (!value) return "";

### F:\WebsiteProjects\foreach-website-2026\app\products\pumps\diaphragm-pumps\[slug]\page.tsx Line 81

  modelConfigurations?: DiaphragmModelConfig[];
  faqs?: DiaphragmFaq[];
  media?: DiaphragmMedia[];
};

const details = detailsJson as DiaphragmDetail[];

function findDetail(slug: string) {
  return details.find((item) => item.slug === slug);
}

function publicSrcFromFullPath(fullPath?: string) {
  const value = String(fullPath || "").replaceAll("\\", "/");

  if (!value) return "";

  if (value.startsWith("public/")) {
    return "/" + value.slice("public/".length);

### F:\WebsiteProjects\foreach-website-2026\app\products\pumps\diaphragm-pumps\[slug]\page.tsx Line 103

  }

  return value.startsWith("/") ? value : "/" + value;
}

function existingPublicSrc(media?: DiaphragmMedia) {
  if (!media?.fullPath) return "";

  const diskPath = path.join(process.cwd(), media.fullPath);

  if (!fs.existsSync(diskPath)) {
    return "";
  }

  return publicSrcFromFullPath(media.fullPath);
}

function findMainImage(detail: DiaphragmDetail) {

### F:\WebsiteProjects\foreach-website-2026\app\products\pumps\diaphragm-pumps\[slug]\page.tsx Line 115

  }

  return publicSrcFromFullPath(media.fullPath);
}

function findMainImage(detail: DiaphragmDetail) {
  return detail.media?.find((item) => item.resourceType?.includes("主图"));
}

function groupSpecs(specs: DiaphragmSpec[]) {
  return specs.reduce<Record<string, DiaphragmSpec[]>>((acc, item) => {
    const key = item.tableName || "规格参数";
    acc[key] = acc[key] || [];
    acc[key].push(item);
    return acc;
  }, {});
}


### F:\WebsiteProjects\foreach-website-2026\app\products\pumps\diaphragm-pumps\[slug]\page.tsx Line 119


function findMainImage(detail: DiaphragmDetail) {
  return detail.media?.find((item) => item.resourceType?.includes("主图"));
}

function groupSpecs(specs: DiaphragmSpec[]) {
  return specs.reduce<Record<string, DiaphragmSpec[]>>((acc, item) => {
    const key = item.tableName || "规格参数";
    acc[key] = acc[key] || [];
    acc[key].push(item);
    return acc;
  }, {});
}

function splitApplications(value?: string) {
  return String(value || "")
    .split(/[、,，]/)
    .map((item) => item.trim())

### F:\WebsiteProjects\foreach-website-2026\app\products\pumps\diaphragm-pumps\[slug]\page.tsx Line 120

function findMainImage(detail: DiaphragmDetail) {
  return detail.media?.find((item) => item.resourceType?.includes("主图"));
}

function groupSpecs(specs: DiaphragmSpec[]) {
  return specs.reduce<Record<string, DiaphragmSpec[]>>((acc, item) => {
    const key = item.tableName || "规格参数";
    acc[key] = acc[key] || [];
    acc[key].push(item);
    return acc;
  }, {});
}

function splitApplications(value?: string) {
  return String(value || "")
    .split(/[、,，]/)
    .map((item) => item.trim())
    .filter(Boolean);

### F:\WebsiteProjects\foreach-website-2026\app\products\pumps\diaphragm-pumps\[slug]\page.tsx Line 135

    .split(/[、,，]/)
    .map((item) => item.trim())
    .filter(Boolean);
}

export function generateStaticParams() {
  return details.map((item) => ({
    slug: item.slug,
  }));
}

export async function generateMetadata({ params }: { params: Params }) {
  const { slug } = await params;
  const detail = findDetail(slug);

  if (!detail) {
    return {
      title: "隔膜泵详情 | FOREACH",

### F:\WebsiteProjects\foreach-website-2026\app\products\pumps\diaphragm-pumps\[slug]\page.tsx Line 157

    title: detail.seo?.title || `${detail.title} | FOREACH`,
    description: detail.seo?.description || detail.description || "",
  };
}

export default async function DiaphragmPumpDetailPage({
  params,
}: {
  params: Params;
}) {
  const { slug } = await params;
  const detail = findDetail(slug);

  if (!detail) {
    notFound();
  }

  const mainImage = findMainImage(detail);

### F:\WebsiteProjects\foreach-website-2026\app\products\pumps\diaphragm-pumps\[slug]\page.tsx Line 175

  const mainImageSrc = existingPublicSrc(mainImage);
  const applications = splitApplications(detail.commonApplications);
  const specsByTable = groupSpecs(detail.specifications || []);

  return (
    <main className="diaphragm-detail-page">
      <div className="diaphragm-detail-inner">
        <nav className="diaphragm-breadcrumb" aria-label="Breadcrumb">
          <Link href="/products">产品中心</Link>
          <span>/</span>
          <Link href="/products/pumps">泵</Link>
          <span>/</span>
          <Link href="/products/pumps/diaphragm-pumps">隔膜泵</Link>
          <span>/</span>
          <span>{detail.title}</span>
        </nav>

        <section className="diaphragm-hero">

### F:\WebsiteProjects\foreach-website-2026\app\products\pumps\diaphragm-pumps\[slug]\page.tsx Line 176

  const applications = splitApplications(detail.commonApplications);
  const specsByTable = groupSpecs(detail.specifications || []);

  return (
    <main className="diaphragm-detail-page">
      <div className="diaphragm-detail-inner">
        <nav className="diaphragm-breadcrumb" aria-label="Breadcrumb">
          <Link href="/products">产品中心</Link>
          <span>/</span>
          <Link href="/products/pumps">泵</Link>
          <span>/</span>
          <Link href="/products/pumps/diaphragm-pumps">隔膜泵</Link>
          <span>/</span>
          <span>{detail.title}</span>
        </nav>

        <section className="diaphragm-hero">
          <div className="diaphragm-hero-media">

### F:\WebsiteProjects\foreach-website-2026\app\products\pumps\diaphragm-pumps\[slug]\page.tsx Line 177

  const specsByTable = groupSpecs(detail.specifications || []);

  return (
    <main className="diaphragm-detail-page">
      <div className="diaphragm-detail-inner">
        <nav className="diaphragm-breadcrumb" aria-label="Breadcrumb">
          <Link href="/products">产品中心</Link>
          <span>/</span>
          <Link href="/products/pumps">泵</Link>
          <span>/</span>
          <Link href="/products/pumps/diaphragm-pumps">隔膜泵</Link>
          <span>/</span>
          <span>{detail.title}</span>
        </nav>

        <section className="diaphragm-hero">
          <div className="diaphragm-hero-media">
            {mainImageSrc ? (

### F:\WebsiteProjects\foreach-website-2026\app\products\pumps\diaphragm-pumps\[slug]\page.tsx Line 182

        <nav className="diaphragm-breadcrumb" aria-label="Breadcrumb">
          <Link href="/products">产品中心</Link>
          <span>/</span>
          <Link href="/products/pumps">泵</Link>
          <span>/</span>
          <Link href="/products/pumps/diaphragm-pumps">隔膜泵</Link>
          <span>/</span>
          <span>{detail.title}</span>
        </nav>

        <section className="diaphragm-hero">
          <div className="diaphragm-hero-media">
            {mainImageSrc ? (
              <img
                src={mainImageSrc}
                alt={mainImage?.alt || detail.title || "Diaphragm pump"}
              />
            ) : (

### F:\WebsiteProjects\foreach-website-2026\app\products\pumps\diaphragm-pumps\[slug]\page.tsx Line 187

          <Link href="/products/pumps/diaphragm-pumps">隔膜泵</Link>
          <span>/</span>
          <span>{detail.title}</span>
        </nav>

        <section className="diaphragm-hero">
          <div className="diaphragm-hero-media">
            {mainImageSrc ? (
              <img
                src={mainImageSrc}
                alt={mainImage?.alt || detail.title || "Diaphragm pump"}
              />
            ) : (
              <div className="diaphragm-media-placeholder">
                <strong>{detail.title}</strong>
                <span>主图待放置</span>
                <br />
                <span>{mainImage?.fileName}</span>

### F:\WebsiteProjects\foreach-website-2026\app\products\pumps\diaphragm-pumps\[slug]\page.tsx Line 188

          <span>/</span>
          <span>{detail.title}</span>
        </nav>

        <section className="diaphragm-hero">
          <div className="diaphragm-hero-media">
            {mainImageSrc ? (
              <img
                src={mainImageSrc}
                alt={mainImage?.alt || detail.title || "Diaphragm pump"}
              />
            ) : (
              <div className="diaphragm-media-placeholder">
                <strong>{detail.title}</strong>
                <span>主图待放置</span>
                <br />
                <span>{mainImage?.fileName}</span>
              </div>

### F:\WebsiteProjects\foreach-website-2026\app\products\pumps\diaphragm-pumps\[slug]\page.tsx Line 192

        <section className="diaphragm-hero">
          <div className="diaphragm-hero-media">
            {mainImageSrc ? (
              <img
                src={mainImageSrc}
                alt={mainImage?.alt || detail.title || "Diaphragm pump"}
              />
            ) : (
              <div className="diaphragm-media-placeholder">
                <strong>{detail.title}</strong>
                <span>主图待放置</span>
                <br />
                <span>{mainImage?.fileName}</span>
              </div>
            )}
          </div>

          <div className="diaphragm-hero-copy">

### F:\WebsiteProjects\foreach-website-2026\app\products\pumps\diaphragm-pumps\[slug]\page.tsx Line 195

              <img
                src={mainImageSrc}
                alt={mainImage?.alt || detail.title || "Diaphragm pump"}
              />
            ) : (
              <div className="diaphragm-media-placeholder">
                <strong>{detail.title}</strong>
                <span>主图待放置</span>
                <br />
                <span>{mainImage?.fileName}</span>
              </div>
            )}
          </div>

          <div className="diaphragm-hero-copy">
            <div className="diaphragm-kicker">{detail.category || "隔膜泵"}</div>
            <h1 className="diaphragm-title">{detail.title}</h1>
            <p className="diaphragm-desc">{detail.description}</p>

### F:\WebsiteProjects\foreach-website-2026\app\products\pumps\diaphragm-pumps\[slug]\page.tsx Line 204

                <span>{mainImage?.fileName}</span>
              </div>
            )}
          </div>

          <div className="diaphragm-hero-copy">
            <div className="diaphragm-kicker">{detail.category || "隔膜泵"}</div>
            <h1 className="diaphragm-title">{detail.title}</h1>
            <p className="diaphragm-desc">{detail.description}</p>

            <div className="diaphragm-model-line">
              <strong>型号：</strong>
              <span>{detail.modelDisplay || `${detail.seriesId} 标准型号`}</span>
              <a className="diaphragm-primary-link" href="#model-configuration">
                {detail.modelButtonText || "型号配置"}
              </a>
            </div>
          </div>

### F:\WebsiteProjects\foreach-website-2026\app\products\pumps\diaphragm-pumps\[slug]\page.tsx Line 205

              </div>
            )}
          </div>

          <div className="diaphragm-hero-copy">
            <div className="diaphragm-kicker">{detail.category || "隔膜泵"}</div>
            <h1 className="diaphragm-title">{detail.title}</h1>
            <p className="diaphragm-desc">{detail.description}</p>

            <div className="diaphragm-model-line">
              <strong>型号：</strong>
              <span>{detail.modelDisplay || `${detail.seriesId} 标准型号`}</span>
              <a className="diaphragm-primary-link" href="#model-configuration">
                {detail.modelButtonText || "型号配置"}
              </a>
            </div>
          </div>
        </section>

### F:\WebsiteProjects\foreach-website-2026\app\products\pumps\diaphragm-pumps\[slug]\page.tsx Line 206

            )}
          </div>

          <div className="diaphragm-hero-copy">
            <div className="diaphragm-kicker">{detail.category || "隔膜泵"}</div>
            <h1 className="diaphragm-title">{detail.title}</h1>
            <p className="diaphragm-desc">{detail.description}</p>

            <div className="diaphragm-model-line">
              <strong>型号：</strong>
              <span>{detail.modelDisplay || `${detail.seriesId} 标准型号`}</span>
              <a className="diaphragm-primary-link" href="#model-configuration">
                {detail.modelButtonText || "型号配置"}
              </a>
            </div>
          </div>
        </section>


### F:\WebsiteProjects\foreach-website-2026\app\products\pumps\diaphragm-pumps\[slug]\page.tsx Line 207

          </div>

          <div className="diaphragm-hero-copy">
            <div className="diaphragm-kicker">{detail.category || "隔膜泵"}</div>
            <h1 className="diaphragm-title">{detail.title}</h1>
            <p className="diaphragm-desc">{detail.description}</p>

            <div className="diaphragm-model-line">
              <strong>型号：</strong>
              <span>{detail.modelDisplay || `${detail.seriesId} 标准型号`}</span>
              <a className="diaphragm-primary-link" href="#model-configuration">
                {detail.modelButtonText || "型号配置"}
              </a>
            </div>
          </div>
        </section>

        {applications.length > 0 && (

### F:\WebsiteProjects\foreach-website-2026\app\products\pumps\diaphragm-pumps\[slug]\page.tsx Line 209

          <div className="diaphragm-hero-copy">
            <div className="diaphragm-kicker">{detail.category || "隔膜泵"}</div>
            <h1 className="diaphragm-title">{detail.title}</h1>
            <p className="diaphragm-desc">{detail.description}</p>

            <div className="diaphragm-model-line">
              <strong>型号：</strong>
              <span>{detail.modelDisplay || `${detail.seriesId} 标准型号`}</span>
              <a className="diaphragm-primary-link" href="#model-configuration">
                {detail.modelButtonText || "型号配置"}
              </a>
            </div>
          </div>
        </section>

        {applications.length > 0 && (
          <section className="diaphragm-section">
            <h2 className="diaphragm-section-title">常见应用</h2>

### F:\WebsiteProjects\foreach-website-2026\app\products\pumps\diaphragm-pumps\[slug]\page.tsx Line 212

            <p className="diaphragm-desc">{detail.description}</p>

            <div className="diaphragm-model-line">
              <strong>型号：</strong>
              <span>{detail.modelDisplay || `${detail.seriesId} 标准型号`}</span>
              <a className="diaphragm-primary-link" href="#model-configuration">
                {detail.modelButtonText || "型号配置"}
              </a>
            </div>
          </div>
        </section>

        {applications.length > 0 && (
          <section className="diaphragm-section">
            <h2 className="diaphragm-section-title">常见应用</h2>
            <ul className="diaphragm-applications">
              {applications.map((item) => (
                <li key={item}>{item}</li>

### F:\WebsiteProjects\foreach-website-2026\app\products\pumps\diaphragm-pumps\[slug]\page.tsx Line 220

            </div>
          </div>
        </section>

        {applications.length > 0 && (
          <section className="diaphragm-section">
            <h2 className="diaphragm-section-title">常见应用</h2>
            <ul className="diaphragm-applications">
              {applications.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        )}

        <section className="diaphragm-section" id="specifications">
          <h2 className="diaphragm-section-title">规格参数</h2>


### F:\WebsiteProjects\foreach-website-2026\app\products\pumps\diaphragm-pumps\[slug]\page.tsx Line 221

          </div>
        </section>

        {applications.length > 0 && (
          <section className="diaphragm-section">
            <h2 className="diaphragm-section-title">常见应用</h2>
            <ul className="diaphragm-applications">
              {applications.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        )}

        <section className="diaphragm-section" id="specifications">
          <h2 className="diaphragm-section-title">规格参数</h2>

          {Object.entries(specsByTable).map(([tableName, rows]) => (

### F:\WebsiteProjects\foreach-website-2026\app\products\pumps\diaphragm-pumps\[slug]\page.tsx Line 222

        </section>

        {applications.length > 0 && (
          <section className="diaphragm-section">
            <h2 className="diaphragm-section-title">常见应用</h2>
            <ul className="diaphragm-applications">
              {applications.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        )}

        <section className="diaphragm-section" id="specifications">
          <h2 className="diaphragm-section-title">规格参数</h2>

          {Object.entries(specsByTable).map(([tableName, rows]) => (
            <div key={tableName}>

### F:\WebsiteProjects\foreach-website-2026\app\products\pumps\diaphragm-pumps\[slug]\page.tsx Line 230

              ))}
            </ul>
          </section>
        )}

        <section className="diaphragm-section" id="specifications">
          <h2 className="diaphragm-section-title">规格参数</h2>

          {Object.entries(specsByTable).map(([tableName, rows]) => (
            <div key={tableName}>
              <h3 className="diaphragm-subtitle">{tableName}</h3>
              <div className="diaphragm-table-wrap">
                <table className="diaphragm-table">
                  <thead>
                    <tr>
                      <th>参数</th>
                      <th>规格值</th>
                      <th>备注</th>

### F:\WebsiteProjects\foreach-website-2026\app\products\pumps\diaphragm-pumps\[slug]\page.tsx Line 231

            </ul>
          </section>
        )}

        <section className="diaphragm-section" id="specifications">
          <h2 className="diaphragm-section-title">规格参数</h2>

          {Object.entries(specsByTable).map(([tableName, rows]) => (
            <div key={tableName}>
              <h3 className="diaphragm-subtitle">{tableName}</h3>
              <div className="diaphragm-table-wrap">
                <table className="diaphragm-table">
                  <thead>
                    <tr>
                      <th>参数</th>
                      <th>规格值</th>
                      <th>备注</th>
                    </tr>

### F:\WebsiteProjects\foreach-website-2026\app\products\pumps\diaphragm-pumps\[slug]\page.tsx Line 235

        <section className="diaphragm-section" id="specifications">
          <h2 className="diaphragm-section-title">规格参数</h2>

          {Object.entries(specsByTable).map(([tableName, rows]) => (
            <div key={tableName}>
              <h3 className="diaphragm-subtitle">{tableName}</h3>
              <div className="diaphragm-table-wrap">
                <table className="diaphragm-table">
                  <thead>
                    <tr>
                      <th>参数</th>
                      <th>规格值</th>
                      <th>备注</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((row, index) => (
                      <tr key={`${tableName}-${row.parameter}-${index}`}>

### F:\WebsiteProjects\foreach-website-2026\app\products\pumps\diaphragm-pumps\[slug]\page.tsx Line 236

          <h2 className="diaphragm-section-title">规格参数</h2>

          {Object.entries(specsByTable).map(([tableName, rows]) => (
            <div key={tableName}>
              <h3 className="diaphragm-subtitle">{tableName}</h3>
              <div className="diaphragm-table-wrap">
                <table className="diaphragm-table">
                  <thead>
                    <tr>
                      <th>参数</th>
                      <th>规格值</th>
                      <th>备注</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((row, index) => (
                      <tr key={`${tableName}-${row.parameter}-${index}`}>
                        <td>{row.parameter}</td>

### F:\WebsiteProjects\foreach-website-2026\app\products\pumps\diaphragm-pumps\[slug]\page.tsx Line 237


          {Object.entries(specsByTable).map(([tableName, rows]) => (
            <div key={tableName}>
              <h3 className="diaphragm-subtitle">{tableName}</h3>
              <div className="diaphragm-table-wrap">
                <table className="diaphragm-table">
                  <thead>
                    <tr>
                      <th>参数</th>
                      <th>规格值</th>
                      <th>备注</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((row, index) => (
                      <tr key={`${tableName}-${row.parameter}-${index}`}>
                        <td>{row.parameter}</td>
                        <td>{row.value}</td>

### F:\WebsiteProjects\foreach-website-2026\app\products\pumps\diaphragm-pumps\[slug]\page.tsx Line 260

              </div>
            </div>
          ))}
        </section>

        <section className="diaphragm-section" id="model-configuration">
          <h2 className="diaphragm-section-title">型号配置</h2>
          <div className="diaphragm-table-wrap">
            <table className="diaphragm-table">
              <thead>
                <tr>
                  <th>商品编码</th>
                  <th>产品型号</th>
                  <th>电机类型</th>
                  <th>电压</th>
                  <th>连接方式</th>
                  <th>膜片</th>
                  <th>阀片</th>

### F:\WebsiteProjects\foreach-website-2026\app\products\pumps\diaphragm-pumps\[slug]\page.tsx Line 261

            </div>
          ))}
        </section>

        <section className="diaphragm-section" id="model-configuration">
          <h2 className="diaphragm-section-title">型号配置</h2>
          <div className="diaphragm-table-wrap">
            <table className="diaphragm-table">
              <thead>
                <tr>
                  <th>商品编码</th>
                  <th>产品型号</th>
                  <th>电机类型</th>
                  <th>电压</th>
                  <th>连接方式</th>
                  <th>膜片</th>
                  <th>阀片</th>
                  <th>泵头</th>

### F:\WebsiteProjects\foreach-website-2026\app\products\pumps\diaphragm-pumps\[slug]\page.tsx Line 262

          ))}
        </section>

        <section className="diaphragm-section" id="model-configuration">
          <h2 className="diaphragm-section-title">型号配置</h2>
          <div className="diaphragm-table-wrap">
            <table className="diaphragm-table">
              <thead>
                <tr>
                  <th>商品编码</th>
                  <th>产品型号</th>
                  <th>电机类型</th>
                  <th>电压</th>
                  <th>连接方式</th>
                  <th>膜片</th>
                  <th>阀片</th>
                  <th>泵头</th>
                </tr>

### F:\WebsiteProjects\foreach-website-2026\app\products\pumps\diaphragm-pumps\[slug]\page.tsx Line 263

        </section>

        <section className="diaphragm-section" id="model-configuration">
          <h2 className="diaphragm-section-title">型号配置</h2>
          <div className="diaphragm-table-wrap">
            <table className="diaphragm-table">
              <thead>
                <tr>
                  <th>商品编码</th>
                  <th>产品型号</th>
                  <th>电机类型</th>
                  <th>电压</th>
                  <th>连接方式</th>
                  <th>膜片</th>
                  <th>阀片</th>
                  <th>泵头</th>
                </tr>
              </thead>

### F:\WebsiteProjects\foreach-website-2026\app\products\pumps\diaphragm-pumps\[slug]\page.tsx Line 284

                    <td>{item.itemCode}</td>
                    <td>{item.model}</td>
                    <td>{item.motorType}</td>
                    <td>{item.voltage}</td>
                    <td>{item.connectionType}</td>
                    <td>{item.diaphragm}</td>
                    <td>{item.valvePlate}</td>
                    <td>{item.pumpHead}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {(detail.media || []).length > 0 && (
          <section className="diaphragm-section">
            <h2 className="diaphragm-section-title">图纸与资源</h2>

### F:\WebsiteProjects\foreach-website-2026\app\products\pumps\diaphragm-pumps\[slug]\page.tsx Line 295

            </table>
          </div>
        </section>

        {(detail.media || []).length > 0 && (
          <section className="diaphragm-section">
            <h2 className="diaphragm-section-title">图纸与资源</h2>
            <div className="diaphragm-media-list">
              {(detail.media || []).map((item) => (
                <div className="diaphragm-media-item" key={item.resourceId}>
                  <strong>{item.resourceType}</strong>
                  <span>{item.caption || item.displayName}</span>
                  <span>{item.fileName}</span>
                </div>
              ))}
            </div>
          </section>
        )}

### F:\WebsiteProjects\foreach-website-2026\app\products\pumps\diaphragm-pumps\[slug]\page.tsx Line 296

          </div>
        </section>

        {(detail.media || []).length > 0 && (
          <section className="diaphragm-section">
            <h2 className="diaphragm-section-title">图纸与资源</h2>
            <div className="diaphragm-media-list">
              {(detail.media || []).map((item) => (
                <div className="diaphragm-media-item" key={item.resourceId}>
                  <strong>{item.resourceType}</strong>
                  <span>{item.caption || item.displayName}</span>
                  <span>{item.fileName}</span>
                </div>
              ))}
            </div>
          </section>
        )}


### F:\WebsiteProjects\foreach-website-2026\app\products\pumps\diaphragm-pumps\[slug]\page.tsx Line 297

        </section>

        {(detail.media || []).length > 0 && (
          <section className="diaphragm-section">
            <h2 className="diaphragm-section-title">图纸与资源</h2>
            <div className="diaphragm-media-list">
              {(detail.media || []).map((item) => (
                <div className="diaphragm-media-item" key={item.resourceId}>
                  <strong>{item.resourceType}</strong>
                  <span>{item.caption || item.displayName}</span>
                  <span>{item.fileName}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {(detail.faqs || []).length > 0 && (

### F:\WebsiteProjects\foreach-website-2026\app\products\pumps\diaphragm-pumps\[slug]\page.tsx Line 299

        {(detail.media || []).length > 0 && (
          <section className="diaphragm-section">
            <h2 className="diaphragm-section-title">图纸与资源</h2>
            <div className="diaphragm-media-list">
              {(detail.media || []).map((item) => (
                <div className="diaphragm-media-item" key={item.resourceId}>
                  <strong>{item.resourceType}</strong>
                  <span>{item.caption || item.displayName}</span>
                  <span>{item.fileName}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {(detail.faqs || []).length > 0 && (
          <section className="diaphragm-section">
            <h2 className="diaphragm-section-title">常见问题</h2>

### F:\WebsiteProjects\foreach-website-2026\app\products\pumps\diaphragm-pumps\[slug]\page.tsx Line 310

            </div>
          </section>
        )}

        {(detail.faqs || []).length > 0 && (
          <section className="diaphragm-section">
            <h2 className="diaphragm-section-title">常见问题</h2>
            {(detail.faqs || []).map((item) => (
              <div className="diaphragm-faq" key={item.question}>
                <h3>{item.question}</h3>
                <p>{item.answer}</p>
              </div>
            ))}
          </section>
        )}
      </div>
    </main>
  );

### F:\WebsiteProjects\foreach-website-2026\app\products\pumps\diaphragm-pumps\[slug]\page.tsx Line 311

          </section>
        )}

        {(detail.faqs || []).length > 0 && (
          <section className="diaphragm-section">
            <h2 className="diaphragm-section-title">常见问题</h2>
            {(detail.faqs || []).map((item) => (
              <div className="diaphragm-faq" key={item.question}>
                <h3>{item.question}</h3>
                <p>{item.answer}</p>
              </div>
            ))}
          </section>
        )}
      </div>
    </main>
  );
}

### F:\WebsiteProjects\foreach-website-2026\app\products\pumps\diaphragm-pumps\[slug]\page.tsx Line 313


        {(detail.faqs || []).length > 0 && (
          <section className="diaphragm-section">
            <h2 className="diaphragm-section-title">常见问题</h2>
            {(detail.faqs || []).map((item) => (
              <div className="diaphragm-faq" key={item.question}>
                <h3>{item.question}</h3>
                <p>{item.answer}</p>
              </div>
            ))}
          </section>
        )}
      </div>
    </main>
  );
}
