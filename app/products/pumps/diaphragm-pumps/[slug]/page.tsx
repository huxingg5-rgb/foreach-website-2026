import { notFound } from "next/navigation";
import type { ComponentType, ReactNode } from "react";
import RelatedResources from "@/components/common/related-resources/RelatedResources";
import ProductDetailClient from "@/components/products/detail/ProductDetailClient";

import detailsJson from "@/data/products/generated/pumps/diaphragm-pumps/detail/index.json";

export const dynamicParams = false;

type PageParams = {
  slug: string;
};

type PageProps = {
  params: Promise<PageParams>;
  locale?: "zh-CN" | "en" | "es" | "fr" | "ko" | "ru";
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
  datasheetId?: string;
  cadRequestAvailable?: boolean;
  relationKeys?: string[];
  relationPriority?: number;
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
  afterContent?: ReactNode;
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

// DIAPHRAGM_DETAIL_MAIN_IMAGE_MAPPING_START
/*
 * 根据当前隔膜泵详情数据中的型号、路由和标题，
 * 从 media 数组中选择与当前产品对应的主图。
 *
 * 原来的逻辑只取第一个 resourceType 包含“主图”的资源，
 * 同系列同时存在有刷和无刷主图时会出现错配。
 */
function getPreferredDiaphragmMainImageFileName(
  detail: DiaphragmDetail
) {
  const identity = [
    getText(detail.slug),
    getText(detail.path),
    getText(detail.modelDisplay),
    getText(detail.title),
    getText(detail.displayName),
    getText(detail.seriesId),
  ]
    .join(" ")
    .toLowerCase();

  /*
   * DPGL800 的 EP 与 FF 当前共用同一张产品主图。
   * 两种型号的 2D 和 3D 仍分别对应。
   */
  if (identity.includes("dpgl800")) {
    return "dpgl800-gas-liquid-diaphragm-pump-main.webp";
  }

  /*
   * DPL30H 必须放在 DPL30 前面，
   * 否则 dpl30h 会被 dpl30 的判断提前命中。
   */
  if (identity.includes("dpl30h")) {
    if (
      identity.includes("24bs") ||
      identity.includes("brushless") ||
      identity.includes("无刷")
    ) {
      return "dpl30h-brushless-liquid-diaphragm-pump-main.webp";
    }

    if (
      identity.includes("24ds") ||
      identity.includes("brushed") ||
      identity.includes("有刷")
    ) {
      return "dpl30h-brushed-liquid-diaphragm-pump-main.webp";
    }
  }

  if (identity.includes("dpl60")) {
    if (
      identity.includes("24bb") ||
      identity.includes("brushless") ||
      identity.includes("无刷")
    ) {
      return "dpl60-brushless-liquid-diaphragm-pump-main.webp";
    }

    if (
      identity.includes("24db") ||
      identity.includes("brushed") ||
      identity.includes("有刷")
    ) {
      return "dpl60-brushed-liquid-diaphragm-pump-main.webp";
    }
  }

  if (identity.includes("dpl30")) {
    if (
      identity.includes("24bb") ||
      identity.includes("brushless") ||
      identity.includes("无刷")
    ) {
      return "dpl30-brushless-liquid-diaphragm-pump-main.webp";
    }

    if (
      identity.includes("24db") ||
      identity.includes("brushed") ||
      identity.includes("有刷")
    ) {
      return "dpl30-brushed-liquid-diaphragm-pump-main.webp";
    }
  }

  /*
   * 老的系列总览路由可能没有具体电机型号，
   * 这种情况继续使用原来的主图回退逻辑。
   */
  return "";
}

function findPreferredDiaphragmMainImageUrl(
  detail: DiaphragmDetail
) {
  const preferredFileName =
    getPreferredDiaphragmMainImageFileName(detail);

  if (preferredFileName) {
    const preferredMedia = detail.media?.find((item) => {
      const fileName = String(
        item.fileName || ""
      ).toLowerCase();

      const fullPath = String(
        item.fullPath || ""
      )
        .replaceAll("\\", "/")
        .toLowerCase();

      return (
        fileName === preferredFileName ||
        fullPath.endsWith(`/${preferredFileName}`)
      );
    });

    if (preferredMedia) {
      /*
       * 复用页面原有的媒体 URL 转换逻辑，
       * 不另外硬编码网站 URL。
       */
      const preferredDetail: DiaphragmDetail = {
        ...detail,
        media: [preferredMedia],
      };

      const preferredUrl =
        findMediaUrlByType(
          preferredDetail,
          "主图"
        ) ||
        findDiaphragmMediaUrlByPathKeywords(
          preferredDetail,
          ["images"]
        );

      if (preferredUrl) {
        return preferredUrl;
      }
    }
  }

  /*
   * 未识别具体型号或目标媒体不存在时，
   * 保留原有回退逻辑，避免详情页显示空白。
   */
  return (
    findMediaUrlByType(detail, "主图") ||
    findDiaphragmMediaUrlByPathKeywords(
      detail,
      ["images"]
    )
  );
}
// DIAPHRAGM_DETAIL_MAIN_IMAGE_MAPPING_END

// DIAPHRAGM_DETAIL_2D_3D_MAPPING_START
type DiaphragmPreferredAssetKind = "2D" | "3D";

/*
 * 根据详情页当前型号，返回唯一对应的 PDF 或 GLB 文件名。
 *
 * 原逻辑只取 media 数组中第一个 2D 或 3D，
 * 同系列同时收录有刷和无刷资源时会发生错配。
 */
function getPreferredDiaphragmAssetFileName(
  detail: DiaphragmDetail,
  kind: DiaphragmPreferredAssetKind
) {
  const identity = [
    getText(detail.slug),
    getText(detail.path),
    getText(detail.modelDisplay),
    getText(detail.title),
    getText(detail.displayName),
    getText(detail.seriesId),
  ]
    .join(" ")
    .toLowerCase();

  /*
   * DPGL800 必须按照 EP / FF 区分。
   */
  if (identity.includes("dpgl800")) {
    const isFf =
      identity.includes("24bs6-ff") ||
      identity.includes("ff/ps") ||
      identity.includes("-ff-");

    if (isFf) {
      return kind === "2D"
        ? "dpgl800-24bs6-ff-ps-gas-liquid-diaphragm-pump-2d-drawing.pdf"
        : "dpgl800-24bs6-ff-ps-gas-liquid-diaphragm-pump.glb";
    }

    const isEp =
      identity.includes("24bs6-ep") ||
      identity.includes("ep/ps") ||
      identity.includes("-ep-");

    if (isEp) {
      return kind === "2D"
        ? "dpgl800-24bs6-ep-ps-gas-liquid-diaphragm-pump-2d-drawing.pdf"
        : "dpgl800-24bs6-ep-ps-gas-liquid-diaphragm-pump.glb";
    }
  }

  /*
   * DPL30H 必须放在 DPL30 前面，
   * 防止 dpl30h 被误判为 dpl30。
   */
  if (identity.includes("dpl30h")) {
    const isBrushless =
      identity.includes("24bs") ||
      identity.includes("brushless") ||
      identity.includes("无刷");

    if (isBrushless) {
      return kind === "2D"
        ? "dpl30h-brushless-liquid-diaphragm-pump-2d-drawing.pdf"
        : "dpl30h-brushless-liquid-diaphragm-pump.glb";
    }

    const isBrushed =
      identity.includes("24ds") ||
      identity.includes("brushed") ||
      identity.includes("有刷");

    if (isBrushed) {
      return kind === "2D"
        ? "dpl30h-brushed-liquid-diaphragm-pump-2d-drawing.pdf"
        : "dpl30h-brushed-liquid-diaphragm-pump.glb";
    }
  }

  if (identity.includes("dpl60")) {
    const isBrushless =
      identity.includes("24bb") ||
      identity.includes("brushless") ||
      identity.includes("无刷");

    if (isBrushless) {
      return kind === "2D"
        ? "dpl60-brushless-liquid-diaphragm-pump-2d-drawing.pdf"
        : "dpl60-brushless-liquid-diaphragm-pump.glb";
    }

    const isBrushed =
      identity.includes("24db") ||
      identity.includes("brushed") ||
      identity.includes("有刷");

    if (isBrushed) {
      return kind === "2D"
        ? "dpl60-brushed-liquid-diaphragm-pump-2d-drawing.pdf"
        : "dpl60-brushed-liquid-diaphragm-pump.glb";
    }
  }

  if (identity.includes("dpl30")) {
    const isBrushless =
      identity.includes("24bb") ||
      identity.includes("brushless") ||
      identity.includes("无刷");

    if (isBrushless) {
      return kind === "2D"
        ? "dpl30-brushless-liquid-diaphragm-pump-2d-drawing.pdf"
        : "dpl30-brushless-liquid-diaphragm-pump.glb";
    }

    const isBrushed =
      identity.includes("24db") ||
      identity.includes("brushed") ||
      identity.includes("有刷");

    if (isBrushed) {
      return kind === "2D"
        ? "dpl30-brushed-liquid-diaphragm-pump-2d-drawing.pdf"
        : "dpl30-brushed-liquid-diaphragm-pump.glb";
    }
  }

  return "";
}

/*
 * 从当前详情对象的 media 中找到指定文件，
 * 再复用现有 URL 转换逻辑。
 */
function findPreferredDiaphragmAssetUrl(
  detail: DiaphragmDetail,
  kind: DiaphragmPreferredAssetKind
) {
  const preferredFileName =
    getPreferredDiaphragmAssetFileName(
      detail,
      kind
    );

  if (preferredFileName) {
    const preferredMedia = detail.media?.find((item) => {
      const fileName = String(
        item.fileName || ""
      ).toLowerCase();

      const fullPath = String(
        item.fullPath || ""
      )
        .replace(/\\/g, "/")
        .toLowerCase();

      return (
        fileName === preferredFileName ||
        fullPath.endsWith(`/${preferredFileName}`)
      );
    });

    if (preferredMedia) {
      const preferredDetail: DiaphragmDetail = {
        ...detail,
        media: [preferredMedia],
      };

      if (kind === "2D") {
        const preferred2dUrl =
          findMediaUrlByType(
            preferredDetail,
            "2D"
          ) ||
          findMediaUrlByType(
            preferredDetail,
            "零件图"
          ) ||
          findDiaphragmMediaUrlByPathKeywords(
            preferredDetail,
            ["drawings", ".pdf"]
          );

        if (preferred2dUrl) {
          return preferred2dUrl;
        }
      }

      if (kind === "3D") {
        const preferred3dUrl =
          findMediaUrlByType(
            preferredDetail,
            "3D"
          ) ||
          findDiaphragmMediaUrlByPathKeywords(
            preferredDetail,
            ["models", ".glb"]
          );

        if (preferred3dUrl) {
          return preferred3dUrl;
        }
      }
    }
  }

  /*
   * 旧系列总览路由没有具体型号时保留原有回退逻辑。
   */
  if (kind === "2D") {
    return (
      findMediaUrlByType(detail, "2D") ||
      findMediaUrlByType(detail, "零件图") ||
      findDiaphragmMediaUrlByPathKeywords(
        detail,
        ["drawings", ".pdf"]
      )
    );
  }

  return (
    findMediaUrlByType(detail, "3D") ||
    findDiaphragmMediaUrlByPathKeywords(
      detail,
      ["models", ".glb"]
    )
  );
}
// DIAPHRAGM_DETAIL_2D_3D_MAPPING_END

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
    findPreferredDiaphragmMainImageUrl(detail);

  const drawing2dUrl =
    findPreferredDiaphragmAssetUrl(
      detail,
      "2D"
    );

  const model3dUrl =
    findPreferredDiaphragmAssetUrl(
      detail,
      "3D"
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
  const metadataTitle = title.includes("FOREACH") ? title : `${title} | FOREACH`;
  const socialImage = data.mainImage
    ? new URL(data.mainImage, "https://www.foreachtek.com").toString()
    : undefined;

  return {
    title: metadataTitle,
    description,
    openGraph: {
      type: "website",
      title: metadataTitle,
      description,
      ...(socialImage
        ? { images: [{ url: socialImage, alt: data.imageAlt || title }] }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: metadataTitle,
      description,
      ...(socialImage ? { images: [socialImage] } : {}),
    },
  };
}

export default async function DiaphragmPumpDetailPage({
  params,
  locale = "zh-CN",
}: PageProps) {
  const resolvedParams = await params;
  const data = getPreferredProductDetailData(resolvedParams.slug);

  if (!data) {
    notFound();
  }

  return (
    <ProductDetailView
      data={data}
      afterContent={
        <RelatedResources
          key="product-related-resources"
          sourceType="product"
          sourceId={data.id}
          sourceSlug={data.slug}
          relationKeys={data.relationKeys}
          locale={locale}
        />
      }
    />
  );
}
