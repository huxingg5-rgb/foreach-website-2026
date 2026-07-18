import { notFound } from "next/navigation";
import type { ComponentType } from "react";
import ProductDetailClient from "@/components/products/detail/ProductDetailClient";

import detailsJson from "@/data/products/generated/pumps/diaphragm-pumps/detail/index.json";

export const dynamicParams = false;

type PageParams = {
  slug: string;
};

type PageProps = {
  params: Promise<PageParams>;
};

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

const ProductDetailView = ProductDetailClient as unknown as ComponentType<{
  data: any;
}>;

function getText(value: unknown) {
  return String(value || "").trim();
}

function normalizeSlug(value: unknown) {
  const parts = getText(value).split("/").filter(Boolean);
  return parts.length > 0 ? parts[parts.length - 1] : "";
}

function findDetail(slug: string) {
  const targetSlug = normalizeSlug(slug);

  return details.find((item) => {
    return normalizeSlug(item.slug) === targetSlug;
  });
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

function shouldUseMedia(media?: DiaphragmMedia) {
  const status = getText(media?.status);

  if (!media?.fullPath) return false;

  /*
   * 不使用 fs.existsSync，避免 Turbopack 全项目扫描。
   * 如果资源索引里明确写了“待 / 缺失 / MISS / 未放置”，前台先不输出，避免破图。
   * 后续真实资源放好后，只需要把资源索引状态改成可用，或清空这些负向状态。
   */
  if (/待|缺失|MISS|未放置|missing/i.test(status)) {
    return false;
  }

  return true;
}

function findMediaByType(detail: DiaphragmDetail, keyword: string) {
  return (detail.media || []).find((item) => {
    return getText(item.resourceType).includes(keyword);
  });
}

function findMediaUrlByType(detail: DiaphragmDetail, keyword: string) {
  const media = findMediaByType(detail, keyword);

  if (!shouldUseMedia(media)) {
    return "";
  }

  return publicSrcFromFullPath(media?.fullPath);
}

function findPreferredDiaphragmMainImageUrl(
  detail: DiaphragmDetail,
  extraIdentity = "",
) {
  /*
   * 只使用当前详情页自身的信息判断版本。
   * 不直接遍历全部 modelConfigurations，
   * 因为系列数据中通常同时包含有刷和无刷型号。
   */
  const pageIdentity = [
    extraIdentity,
    detail.slug,
    detail.path,
    detail.title,
    detail.displayName,
    detail.modelDisplay,
    detail.seo?.title,
    detail.seo?.pageTitle,
    detail.seo?.path,
  ]
    .map((value) => getText(value).toUpperCase())
    .filter(Boolean)
    .join(" ");

  const mainMedia = (detail.media || []).filter((item) => {
    return (
      getText(item.resourceType).includes("主图") &&
      shouldUseMedia(item)
    );
  });

  if (mainMedia.length === 0) {
    return "";
  }

  const wantsBrushless =
    pageIdentity.includes("无刷") ||
    pageIdentity.includes("BRUSHLESS") ||
    pageIdentity.includes("24BB") ||
    pageIdentity.includes("24BS");

  const wantsBrushed =
    !wantsBrushless &&
    (
      pageIdentity.includes("有刷") ||
      pageIdentity.includes("BRUSHED") ||
      pageIdentity.includes("24DB") ||
      pageIdentity.includes("24DS")
    );

  const preferredKeywords = wantsBrushless
    ? ["无刷", "BRUSHLESS", "24BB", "24BS"]
    : wantsBrushed
      ? ["有刷", "BRUSHED", "24DB", "24DS"]
      : [];

  if (preferredKeywords.length > 0) {
    const matchedMedia = mainMedia.find((item) => {
      const mediaIdentity = [
        item.resourceId,
        item.version,
        item.displayName,
        item.fileName,
        item.fullPath,
        item.alt,
        item.caption,
      ]
        .map((value) => getText(value).toUpperCase())
        .filter(Boolean)
        .join(" ");

      return preferredKeywords.some((keyword) => {
        return mediaIdentity.includes(keyword);
      });
    });

    if (matchedMedia?.fullPath) {
      return publicSrcFromFullPath(matchedMedia.fullPath);
    }
  }

  /*
   * 系列通用页面没有明确写有刷或无刷时，
   * 继续使用媒体数组中的第一张主图。
   */
  return publicSrcFromFullPath(mainMedia[0]?.fullPath);
}

function splitApplications(value?: string) {
  return String(value || "")
    .split(/[、,，]/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function normalizeSpecifications(detail: DiaphragmDetail) {
  return (detail.specifications || [])
    .map((item) => {
      const label = getText(item.parameter);
      const value = getText(item.value);
      const note = getText(item.note);

      return {
        label,
        name: label,
        title: label,
        value,
        content: value,
        note,
        remark: note,
      };
    })
    .filter((item) => item.label && item.value);
}


function normalizeSpecGroupTitle(value: unknown) {
  const title = getText(value);

  /*
   * ProductDetailClient 外层已经显示“规格参数”。
   * 如果数据分组标题也叫“规格参数”，页面会出现重复标题。
   * 这里仅针对隔膜泵详情页做显示层归一，不改原始参数数据。
   */
  if (!title || title === "规格参数") {
    return "技术参数";
  }

  return title;
}


function dedupeSpecifications<T extends { label?: string; name?: string; title?: string; value?: string; content?: string; note?: string; remark?: string }>(items: T[]) {
  const seen = new Set<string>();

  return items.filter((item) => {
    const key = [
      item.label || item.name || item.title || "",
      item.value || item.content || "",
      item.note || item.remark || "",
    ]
      .map((value) => String(value).trim())
      .join("||");

    if (!key.replace(/\|/g, "")) {
      return false;
    }

    if (seen.has(key)) {
      return false;
    }

    seen.add(key);
    return true;
  });
}

function groupSpecifications(detail: DiaphragmDetail) {
  const map = new Map<string, DiaphragmSpec[]>();

  (detail.specifications || []).forEach((item) => {
    const key = normalizeSpecGroupTitle(item.tableName);
    const rows = map.get(key) || [];
    rows.push(item);
    map.set(key, rows);
  });

  const groups = Array.from(map.entries()).map(([title, rows]) => ({
    title,
    items: rows
      .map((item) => {
        const label = getText(item.parameter);
        const value = getText(item.value);
        const note = getText(item.note);

        return {
          label,
          name: label,
          title: label,
          value,
          content: value,
          note,
          remark: note,
        };
      })
      .filter((item) => item.label && item.value),
  }));

  return groups.filter((group) => group.items.length > 0);
}

function normalizeFaqs(detail: DiaphragmDetail) {
  return (detail.faqs || [])
    .map((item) => ({
      question: getText(item.question),
      answer: getText(item.answer),
    }))
    .filter((item) => item.question && item.answer);
}

function normalizeModelConfigurations(detail: DiaphragmDetail) {
  return (detail.modelConfigurations || []).map((item) => ({
    itemCode: getText(item.itemCode),
    model: getText(item.model),
    category: getText(item.category),
    motorType: getText(item.motorType),
    voltage: getText(item.voltage),
    connectionType: getText(item.connectionType),
    portDirection: getText(item.portDirection),
    diaphragm: getText(item.diaphragm),
    valvePlate: getText(item.valvePlate),
    pumpHead: getText(item.pumpHead),
    detailSlug: getText(item.detailSlug),
    reservedModelSlug: getText(item.reservedModelSlug),
    note: getText(item.note),
  }));
}

function getSeriesTypeLabel(detail: DiaphragmDetail) {
  const category = getText(detail.category);

  if (category) return category;

  const title = getText(detail.title);

  if (title.includes("气液")) return "气液混合隔膜泵";
  if (title.includes("液体")) return "液体隔膜泵";
  if (title.includes("气体")) return "气体隔膜泵";

  return "隔膜泵";
}

function getModelDisplay(detail: DiaphragmDetail) {
  return (
    getText(detail.modelDisplay) ||
    `${getText(detail.seriesId)} 标准型号`
  );
}

function toPublicAssetHref(value: unknown) {
  const text = getText(value).replaceAll("\\", "/");

  if (!text) return "";

  if (text.startsWith("/public/")) {
    return text.replace(/^\/public/, "");
  }

  if (text.startsWith("public/")) {
    return "/" + text.slice("public/".length);
  }

  return text.startsWith("/") ? text : "/" + text;
}

function findDiaphragmMediaUrlByPathKeywords(detail: DiaphragmDetail, keywords: string[]) {
  const matched = (detail.media || []).find((item) => {
    const text = [
      item.resourceType,
      item.displayName,
      item.caption,
      item.fileName,
      item.path,
      item.fullPath,
      (item as any).url,
    ]
      .map((value) => getText(value).toLowerCase())
      .join(" ");

    return keywords.every((keyword) => text.includes(keyword.toLowerCase()));
  });

  return matched
    ? toPublicAssetHref((matched as any).url || matched.fullPath || matched.path || matched.fileName)
    : "";
}



function findPreferredDiaphragmResourceUrl(
  detail: DiaphragmDetail,
  resourceTypeKeywords: string[],
  extraIdentity = "",
) {
  /*
   * 根据当前详情页的型号、标题、slug 和 SEO 信息，
   * 判断当前页面属于有刷版还是无刷版。
   */
  const pageIdentity = [
    extraIdentity,
    detail.slug,
    detail.path,
    detail.title,
    detail.displayName,
    detail.modelDisplay,
    detail.seo?.title,
    detail.seo?.pageTitle,
    detail.seo?.path,
  ]
    .map((value) => getText(value).toUpperCase())
    .filter(Boolean)
    .join(" ");

  const wantsBrushless =
    pageIdentity.includes("无刷") ||
    pageIdentity.includes("BRUSHLESS") ||
    pageIdentity.includes("24BB") ||
    pageIdentity.includes("24BS");

  const wantsBrushed =
    !wantsBrushless &&
    (
      pageIdentity.includes("有刷") ||
      pageIdentity.includes("BRUSHED") ||
      pageIdentity.includes("24DB") ||
      pageIdentity.includes("24DS")
    );

  const candidates = (detail.media || []).filter((item) => {
    if (!shouldUseMedia(item)) {
      return false;
    }

    const resourceType = getText(
      item.resourceType
    ).toUpperCase();

    return resourceTypeKeywords.some((keyword) => {
      return resourceType.includes(
        keyword.toUpperCase()
      );
    });
  });

  if (candidates.length === 0) {
    return "";
  }

  function getMediaIdentity(item: DiaphragmMedia) {
    return [
      item.resourceId,
      item.version,
      item.displayName,
      item.resourceType,
      item.fileName,
      item.path,
      item.fullPath,
      item.alt,
      item.caption,
    ]
      .map((value) => getText(value).toUpperCase())
      .filter(Boolean)
      .join(" ");
  }

  let selected: DiaphragmMedia | undefined;

  if (wantsBrushless) {
    selected = candidates.find((item) => {
      const identity = getMediaIdentity(item);

      return (
        identity.includes("无刷") ||
        identity.includes("BRUSHLESS") ||
        identity.includes("24BB") ||
        identity.includes("24BS")
      );
    });

    /*
     * 当前页面明确是无刷版时，
     * 找不到无刷文件就返回空值，
     * 不允许错误回退到有刷文件。
     */
    if (!selected) {
      return "";
    }
  } else if (wantsBrushed) {
    selected = candidates.find((item) => {
      const identity = getMediaIdentity(item);

      return (
        identity.includes("有刷") ||
        identity.includes("BRUSHED") ||
        identity.includes("24DB") ||
        identity.includes("24DS")
      );
    });

    /*
     * 当前页面明确是有刷版时，
     * 找不到有刷文件也不跨版本回退。
     */
    if (!selected) {
      return "";
    }
  } else {
    /*
     * 系列通用页面未指定电机版本时，
     * 保留原来的第一项逻辑。
     */
    selected = candidates[0];
  }

  if (!selected) {
    return "";
  }

  return toPublicAssetHref(
    (selected as any).url ||
    selected.fullPath ||
    selected.path ||
    selected.fileName
  );
}

function getCleanDiaphragmModelCode(detail: DiaphragmDetail) {
  const text = [
    detail.modelDisplay,
    detail.modelConfigurations?.[0]?.model,
    detail.title,
    detail.displayName,
    detail.seriesId,
    detail.slug,
  ]
    .map(getText)
    .filter(Boolean)
    .join(" ")
    .toUpperCase();

  const directMatch = text.match(/\b(DPL\d+H?|DPGL\d+)-([A-Z0-9]+)-([A-Z]{2})\/([A-Z]{2})\b/i);

  if (directMatch) {
    return [
      directMatch[1],
      directMatch[2],
      directMatch[3] + "/" + directMatch[4],
    ].join("-").toUpperCase();
  }

  const slugText = getText(detail.slug).toUpperCase();
  const slugMatch = slugText.match(/\b(DPL\d+H?|DPGL\d+)-([A-Z0-9]+)-([A-Z]{2})-([A-Z]{2})\b/i);

  if (slugMatch) {
    return [
      slugMatch[1],
      slugMatch[2],
      slugMatch[3] + "/" + slugMatch[4],
    ].join("-").toUpperCase();
  }

  return getText(detail.modelDisplay || detail.title || detail.displayName)
    .replace(/\s*(高压液体隔膜泵|气液混合隔膜泵|液体隔膜泵|隔膜泵).*$/g, "")
    .trim();
}

function getDiaphragmSeoProductTitle(detail: DiaphragmDetail, cleanModelCode: string, fallbackTitle: string) {
  const sourceText = [
    cleanModelCode,
    detail.modelDisplay,
    detail.title,
    detail.displayName,
    detail.slug,
    detail.seriesId,
    detail.modelConfigurations?.[0]?.motorType,
    detail.category,
  ]
    .map(getText)
    .join(" ")
    .toUpperCase();

  let series = "";

  if (sourceText.includes("DPGL800")) {
    series = "DPGL800";
  } else if (sourceText.includes("DPL30H")) {
    series = "DPL30H";
  } else if (sourceText.includes("DPL60")) {
    series = "DPL60";
  } else if (sourceText.includes("DPL30")) {
    series = "DPL30";
  }

  let motorType = "";

  if (
    sourceText.includes("无刷") ||
    sourceText.includes("BRUSHLESS") ||
    sourceText.includes("24BB") ||
    sourceText.includes("24BS")
  ) {
    motorType = "无刷电机";
  } else if (
    sourceText.includes("有刷") ||
    sourceText.includes("BRUSHED") ||
    sourceText.includes("24DB") ||
    sourceText.includes("24DS")
  ) {
    motorType = "有刷电机";
  }

  let productType = "液体隔膜泵";

  if (sourceText.includes("DPGL800") || sourceText.includes("气液混合") || sourceText.includes("GAS")) {
    productType = "气液混合隔膜泵";
  } else if (sourceText.includes("DPL30H")) {
    productType = "高压液体隔膜泵";
  }

  const parts = [series, motorType, productType].filter(Boolean);

  return parts.length > 0 ? parts.join(" ") : fallbackTitle;
}

function adaptToProductDetailClientData(detail: DiaphragmDetail) {
  const slug = normalizeSlug(detail.slug);
  const title = getText(detail.title || detail.displayName || detail.seriesId);
  const cleanModelCode = getCleanDiaphragmModelCode(detail);
  const seoProductTitle = getDiaphragmSeoProductTitle(detail, cleanModelCode, title);
  const seriesId = getText(detail.seriesId);
  const description = getText(detail.description);
  const applications = splitApplications(detail.commonApplications);
  const specifications = dedupeSpecifications(normalizeSpecifications(detail));
  const specGroups = groupSpecifications(detail);
  const faqs = normalizeFaqs(detail);
  const modelConfigurations = normalizeModelConfigurations(detail);
  const seriesTypeLabel = getSeriesTypeLabel(detail);

  const mainImageUrl =
    findPreferredDiaphragmMainImageUrl(
      detail,
      [cleanModelCode, seoProductTitle].filter(Boolean).join(" "),
    ) ||
    findDiaphragmMediaUrlByPathKeywords(detail, ["images"]);

  const drawing2dUrl =
    findPreferredDiaphragmResourceUrl(
      detail,
      ["2D", "零件图"],
      [cleanModelCode, seoProductTitle]
        .filter(Boolean)
        .join(" "),
    );

  const model3dUrl =
    findPreferredDiaphragmResourceUrl(
      detail,
      ["3D"],
      [cleanModelCode, seoProductTitle]
        .filter(Boolean)
        .join(" "),
    );

  const curveImageUrl =
    findMediaUrlByType(detail, "曲线") ||
    findDiaphragmMediaUrlByPathKeywords(detail, ["curves"]);

  const datasheetUrl =
    findMediaUrlByType(detail, "规格书") ||
    findDiaphragmMediaUrlByPathKeywords(detail, ["datasheets", ".pdf"]);

  return {
    ...detail,

    id: slug,
    productId: slug,
    slug,
    detailSlug: slug,

    name: seoProductTitle,
    title: seoProductTitle,
    model: seoProductTitle,
    productName: seoProductTitle,
    productCode: seriesId,

    series: seriesTypeLabel,
    seriesName: seriesTypeLabel,
    seriesCode: seriesId,

    category: "pumps",
    categoryId: "pumps",
    productType: "diaphragm-pump",
    productTypeId: "diaphragm-pump",
    productTypeName: "隔膜泵",

    description,
    summary: description,
    intro: description,
    productIntro: description,
    overview: description,
    advantages: description ? [description] : [],

    commonApplications: applications,
    applications,
    applicationScenarios: applications,

    modelDisplay: cleanModelCode,
    displayModel: cleanModelCode,
    foreachModel: cleanModelCode,
    modelCode: cleanModelCode,
    modelButtonText: getText(detail.modelButtonText || "型号配置"),
    modelConfigurations,

    image: mainImageUrl,
    imageUrl: mainImageUrl,
    imageCard: mainImageUrl,
    heroImage: mainImageUrl,
    mainImage: mainImageUrl,
    coverImage: mainImageUrl,
    imageAlt: seoProductTitle,

    images: mainImageUrl ? [{ src: mainImageUrl, alt: seoProductTitle }] : [],
    additionalImages: [],
    galleryImages: mainImageUrl ? [mainImageUrl] : [],

    productImages: mainImageUrl
      ? {
          main: {
            src: mainImageUrl,
            alt: seoProductTitle,
          },
        }
      : undefined,

    specifications,
    specs: specifications,
    specList: specifications,
    technicalSpecifications: specifications,
    specGroups,

    faqs,

    resources: {
      drawing2dRequestOnly: false,
      model3dRequestOnly: false,
      drawing2dUrl,
      model3dUrl,
      curveImageUrl,
      datasheetUrl,
    },

    drawing2dRequestOnly: false,
    model3dRequestOnly: false,

    showDatasheetRequest: false,
    showDrawingRequest: Boolean(drawing2dUrl),
    show3DRequest: false,

    model3dUrl,
    drawing2dUrl,
    drawingPdfUrl: drawing2dUrl,

    model3dHref: model3dUrl,
    drawing2dHref: drawing2dUrl,
    drawingHref: drawing2dUrl,
    partDrawingUrl: drawing2dUrl,
    partDrawingHref: drawing2dUrl,

    curveImageUrl,
    datasheetUrl,
    datasheetHref: datasheetUrl,

    model3dText: "查看 3D 模型",
    drawing2dText: "查看 2D 图纸",
    drawingText: "查看零件图",
    partDrawingText: "查看零件图",

    breadcrumbs: [
      { label: "产品中心", href: "/products" },
      { label: "泵", href: "/products/pumps" },
      { label: "隔膜泵", href: "/products/pumps/diaphragm-pumps" },
      { label: seoProductTitle, href: "/products/pumps/diaphragm-pumps/" + slug },
    ],

    seoTitle: getText(detail.seo?.title || seoProductTitle),
    seoDescription: getText(detail.seo?.description || description),
    metaTitle: getText(detail.seo?.title || seoProductTitle),
    metaDescription: getText(detail.seo?.description || description),
  };
}

function getPreferredProductDetailData(slug: string) {
  const detail = findDetail(slug);

  if (!detail) {
    return null;
  }

  return adaptToProductDetailClientData(detail);
}

export function generateStaticParams() {
  return details
    .map((item) => normalizeSlug(item.slug))
    .filter(Boolean)
    .map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const resolvedParams = await params;
  const data = getPreferredProductDetailData(resolvedParams.slug);

  if (!data) {
    return {
      title: "隔膜泵详情 | FOREACH",
    };
  }

  const title =
    getText(data.seoTitle || data.metaTitle || data.model || data.title) ||
    "隔膜泵详情";

  const description = getText(
    data.seoDescription ||
      data.metaDescription ||
      data.description ||
      data.summary
  );

  return {
    title: title.includes("FOREACH") ? title : `${title} | FOREACH`,
    description,
  };
}

export default async function DiaphragmPumpDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  const data = getPreferredProductDetailData(resolvedParams.slug);

  if (!data) {
    notFound();
  }

  return <ProductDetailView data={data} />;
}
