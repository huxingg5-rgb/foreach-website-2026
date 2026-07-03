import { getPumpSeriesProductDetailAdapter } from "@/services/products/adapters/getPumpSeriesProductDetailAdapter";
import nodePath from "node:path";
import nodeFs from "node:fs";
﻿import { notFound } from "next/navigation";
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
    .replace(/μ/g, "u")
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
      "微量分配",
      "小型化液路集成",
      "紧凑型设备液体处理",
      "模块化液路集成",
    ];
  }

  if (code === "TM") {
    return [
      "超微量液体处理",
      "空间受限设备集成",
      "小体积液路模块",
      "低容量反应液处理",
    ];
  }

  return [
    "微量液体吸排",
    "试剂分配",
    "反应液转移",
    "自动化分析仪器液路集成",
  ];
}


function normalizeKey(value: unknown) {
  return getText(value)
    .toLowerCase()
    .replace(/μ/g, "u")
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
          "微量分配",
          "小型化液路集成",
          "紧凑型设备液体处理",
          "模块化液路集成",
        ]
      : seriesCode.toUpperCase() === "TM"
        ? [
            "超微量液体处理",
            "空间受限设备集成",
            "小体积液路模块",
            "低容量反应液处理",
          ]
        : [
            "微量液体吸排",
            "试剂分配",
            "反应液转移",
            "自动化分析仪器液路集成",
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
        title: "技术参数",
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

    model3dText: "查看 3D 模型",
    drawing2dText: "查看 2D 图纸",
    drawingText: "查看零件图",
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
