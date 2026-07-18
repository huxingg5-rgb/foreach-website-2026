/* =========================================================
   getPumpSeriesProductDetailAdapter.ts
   恒永达官网｜泵系列数据库数据 → 原详情页数据结构适配器

   说明：
   1. Excel / generated 是正式资料来源
   2. 本文件只做字段映射，不重新创作文案
   3. 中文页面只读取中文正文、中文参数、中文 FAQ
   4. 英文内容保留给未来英文详情页，不进入中文详情页
   5. 图片和 FAQ 增加强兜底，避免前端拿不到数据
========================================================= */

import nodeFs from "node:fs";
import nodePath from "node:path";

import type {
  ProductDetailPageData,
  ProductSpecItem,
} from "@/data/products/detail/product-detail.types";
import { getPumpSeriesDetailData } from "@/services/products/getPumpSeriesDetailData";

function toText(value: unknown) {
  return String(value || "").trim();
}

function uniqueList(items: unknown[]) {
  return Array.from(new Set(items.map(toText).filter(Boolean)));
}

function hasChinese(text: string) {
  return /[\u4e00-\u9fa5]/.test(toText(text));
}

function isMostlyEnglish(text: string) {
  const value = toText(text);

  if (!value) {
    return false;
  }

  const englishChars = (value.match(/[A-Za-z]/g) || []).length;
  const chineseChars = (value.match(/[\u4e00-\u9fa5]/g) || []).length;

  return englishChars > 20 && englishChars > chineseChars * 2;
}

function isEnglishLabel(label: string) {
  const value = toText(label);

  if (!value) {
    return false;
  }

  return /^[A-Za-z][A-Za-z\s%/().-]+$/.test(value);
}

function normalizeFootnotes(items: any[]) {
  return Array.from(
    new Set(
      items
        .map((item: any) => {
          if (typeof item === "string") {
            return toText(item);
          }

          return toText(item?.noteZh || item?.noteEn);
        })
        .filter(Boolean)
    )
  );
}

function getLocalizedContent(record: any, locale: "zh" | "en") {
  const content = record?.content || {};

  if (content?.[locale]) {
    return content[locale];
  }

  return content;
}

function getContentCandidates(record: any, locale: "zh" | "en") {
  const content = record?.content || {};
  const localizedContent = getLocalizedContent(record, locale);

  const candidates = [
    localizedContent,
    content?.[locale],
    content,
    record,
  ].filter(Boolean);

  return Array.from(new Set(candidates));
}

function getFirstObject(candidates: any[], key: string) {
  for (const item of candidates) {
    if (item?.[key] && typeof item[key] === "object") {
      return item[key];
    }
  }

  return {};
}

function getFirstText(candidates: any[], paths: string[][], locale: "zh" | "en") {
  for (const item of candidates) {
    for (const path of paths) {
      let value = item;

      for (const key of path) {
        value = value?.[key];
      }

      const text = toText(value);

      if (!text) {
        continue;
      }

      if (locale === "zh" && isMostlyEnglish(text)) {
        continue;
      }

      return text;
    }
  }

  return "";
}

function getDetailImageBlock(content: any) {
  const imageBlocks = Array.isArray(content?.images) ? content.images : [];

  return (
    imageBlocks.find((item: any) => item.imageUsage === "detailImages") ||
    imageBlocks.find((item: any) => item.imageUsage === "mainImage") ||
    imageBlocks.find((item: any) => item.imageUsage === "detail") ||
    imageBlocks[0] ||
    null
  );
}

function getImagesFromContent(content: any) {
  const detailImageBlock = getDetailImageBlock(content);
  const images = Array.isArray(detailImageBlock?.images)
    ? detailImageBlock.images
    : [];

  return images
    .map((item: any) => toText(item.src || item.url || item.imageUrl))
    .filter(Boolean)
    .filter((src: string) => !src.includes("product-placeholder"));
}

function getProductId(record: any) {
  return toText(record.internalModelRef || record.productId || record.slug).toLowerCase();
}

function getSeriesCode(record: any) {
  const productId = getProductId(record);
  return toText(record.seriesCode || productId.split("-")[0]).toLowerCase();
}

function getCapacityNumber(record: any) {
  const productId = getProductId(record);
  const capacity = toText(record.capacity || productId.split("-")[1]);
  const match = capacity.match(/\d+/);

  return match ? match[0] : "";
}

function getMaterial(record: any) {
  const productId = getProductId(record);
  return toText(record.material || productId.split("-")[2]).toLowerCase();
}

function publicPathExists(webPath: string) {
  const localPath = nodePath.join(
    process.cwd(),
    "public",
    webPath.replace(/^\//, "")
  );

  return nodeFs.existsSync(localPath);
}

function normalizePublicWebPath(value: unknown) {
  const rawPath = toText(value);

  if (!rawPath) {
    return "";
  }

  const pathOnly = rawPath.split("#")[0].split("?")[0];

  const normalizedPath = pathOnly
    .replace(/\\/g, "/")
    .replace(/^\/?public\//i, "/");

  return normalizedPath.startsWith("/")
    ? normalizedPath
    : `/${normalizedPath}`;
}

function getDiaphragmDrawingFallback(record: any) {
  const slug = toText(
    record?.slug ||
      record?.productId ||
      record?.internalModelRef
  ).toLowerCase();

  const fallbackBySlug: Record<string, string> = {
    "dpgl800-gas-liquid-diaphragm-pump":
      "/documents/products/pumps/diaphragm-pumps/dpgl800/drawings/dpgl800-gas-liquid-diaphragm-pump-2d-drawing.pdf",

    "dpgl800-24bs6-ep-ps-gas-liquid-diaphragm-pump":
      "/documents/products/pumps/diaphragm-pumps/dpgl800/drawings/dpgl800-24bs6-ep-ps-gas-liquid-diaphragm-pump-2d-drawing.pdf",

    "dpgl800-24bs6-ff-ps-gas-liquid-diaphragm-pump":
      "/documents/products/pumps/diaphragm-pumps/dpgl800/drawings/dpgl800-24bs6-ff-ps-gas-liquid-diaphragm-pump-2d-drawing.pdf",

    "dpl30-24bb-ep-ps-liquid-diaphragm-pump":
      "/documents/products/pumps/diaphragm-pumps/dpl30/drawings/dpl30-brushed-liquid-diaphragm-pump-2d-drawing.pdf",

    "dpl30-24db-ep-ps-liquid-diaphragm-pump":
      "/documents/products/pumps/diaphragm-pumps/dpl30/drawings/dpl30-brushless-liquid-diaphragm-pump-2d-drawing.pdf",

    "dpl30h-24bs-ep-ps-liquid-diaphragm-pump":
      "/documents/products/pumps/diaphragm-pumps/dpl30h/drawings/dpl30h-brushed-liquid-diaphragm-pump-2d-drawing.pdf",

    "dpl30h-24ds-ep-ps-liquid-diaphragm-pump":
      "/documents/products/pumps/diaphragm-pumps/dpl30h/drawings/dpl30h-brushless-liquid-diaphragm-pump-2d-drawing.pdf",

    "dpl60-24bb-ep-ps-liquid-diaphragm-pump":
      "/documents/products/pumps/diaphragm-pumps/dpl60/drawings/dpl60-brushed-liquid-diaphragm-pump-2d-drawing.pdf",

    "dpl60-24db-ep-ps-liquid-diaphragm-pump":
      "/documents/products/pumps/diaphragm-pumps/dpl60/drawings/dpl60-brushless-liquid-diaphragm-pump-2d-drawing.pdf",
  };

  return fallbackBySlug[slug] || "";
}

function resolveExistingDrawing2dUrl(
  record: any,
  resources: any
) {
  const configuredCandidates = uniqueList([
    resources?.drawing2dUrl,
    resources?.drawingPdfUrl,
    resources?.partDrawingUrl,
    resources?.drawingUrl,
    resources?.drawingPdf,
    resources?.drawing2d,
    record?.drawing2dUrl,
    record?.drawingPdfUrl,
    record?.partDrawingUrl,
    record?.drawingUrl,
    record?.drawingPdf,
    record?.drawing2d,
  ])
    .map(normalizePublicWebPath)
    .filter(Boolean);

  for (const candidate of configuredCandidates) {
    if (publicPathExists(candidate)) {
      return candidate;
    }
  }

  const diaphragmFallback =
    getDiaphragmDrawingFallback(record);

  if (
    diaphragmFallback &&
    publicPathExists(diaphragmFallback)
  ) {
    return diaphragmFallback;
  }

  return "";
}

function resolveFallbackImage(record: any) {
  const seriesCode = getSeriesCode(record);
  const capacity = getCapacityNumber(record);
  const material = getMaterial(record);

  const candidates = [
    `/images/products/pumps/plunger-pump/${seriesCode}/pump-${seriesCode}-${capacity}ul-${material}.webp`,
    `/images/products/pumps/plunger-pump/${seriesCode}/pump-${seriesCode}-${capacity}ul-pmma.webp`,
    `/images/products/pumps/plunger-pump/${seriesCode}/pump-${seriesCode}-${capacity}ul-peek.webp`,
  ].filter((item) => !item.includes("--") && !item.includes("undefined"));

  for (const candidate of candidates) {
    if (publicPathExists(candidate)) {
      return candidate;
    }
  }

  const seriesDir = nodePath.join(
    process.cwd(),
    "public",
    "images",
    "products",
    "pumps",
    "plunger-pump",
    seriesCode
  );

  if (nodeFs.existsSync(seriesDir)) {
    const firstImage = nodeFs
      .readdirSync(seriesDir)
      .filter((name) => /^pump-.*\.webp$/i.test(name))
      .sort()[0];

    if (firstImage) {
      return `/images/products/pumps/plunger-pump/${seriesCode}/${firstImage}`;
    }
  }

  return "/images/products/common/product-placeholder.svg";
}

function getDetailImages(record: any, content: any) {
  const contentImages = getImagesFromContent(content);

  if (contentImages.length > 0) {
    return contentImages;
  }

  const fallbackImage = resolveFallbackImage(record);

  return fallbackImage ? [fallbackImage] : [];
}

function getDetailImageCaption(content: any) {
  const detailImageBlock = getDetailImageBlock(content);
  const images = Array.isArray(detailImageBlock?.images)
    ? detailImageBlock.images
    : [];

  return toText(images[0]?.caption);
}

function getDetailImageFootnotes(content: any) {
  const detailImageBlock = getDetailImageBlock(content);
  const footnotes = Array.isArray(detailImageBlock?.footnotes)
    ? detailImageBlock.footnotes
    : [];

  return normalizeFootnotes(footnotes);
}

function dedupeSpecs(specs: ProductSpecItem[]) {
  const seenByLabel = new Set<string>();

  return specs.filter((item) => {
    const label = toText(item.label);

    if (!label) {
      return false;
    }

    if (seenByLabel.has(label)) {
      return false;
    }

    seenByLabel.add(label);
    return true;
  });
}

function getSpecs(content: any, locale: "zh" | "en"): ProductSpecItem[] {
  const parameters = Array.isArray(content?.parameters)
    ? content.parameters
    : [];

  const specs = parameters
    .map((item: any) => {
      const label = toText(item.paramName);
      const value = [toText(item.paramValue), toText(item.unit)]
        .filter(Boolean)
        .join(" ");

      return {
        label,
        value,
      };
    })
    .filter((item: ProductSpecItem) => {
      if (!item.label || !item.value) {
        return false;
      }

      if (locale === "zh" && isEnglishLabel(item.label)) {
        return false;
      }

      if (locale === "en" && hasChinese(item.label)) {
        return false;
      }

      return true;
    });

  return dedupeSpecs(specs);
}

function getFootnotesByPosition(content: any, renderPosition: string) {
  const refs = Array.isArray(content?.footnoteRefs)
    ? content.footnoteRefs
    : [];

  return refs
    .filter((item: any) => toText(item.renderPosition) === renderPosition)
    .flatMap((item: any) => (Array.isArray(item.footnotes) ? item.footnotes : []));
}

function getParameterFootnotes(content: any) {
  const parameters = Array.isArray(content?.parameters)
    ? content.parameters
    : [];

  const parameterFootnotes = parameters.flatMap((item: any) =>
    Array.isArray(item?.footnotes) ? item.footnotes : []
  );

  const mappedFootnotes = getFootnotesByPosition(content, "parameter_bottom");

  return normalizeFootnotes([...mappedFootnotes, ...parameterFootnotes]);
}

function getResourceFootnotes(content: any) {
  const resources = content?.resources || {};
  const resourceFootnotes = Array.isArray(resources?.footnotes)
    ? resources.footnotes
    : [];

  const mappedFootnotes = getFootnotesByPosition(content, "resource_bottom");

  return normalizeFootnotes([...mappedFootnotes, ...resourceFootnotes]);
}

function getPageFootnotes(content: any) {
  return normalizeFootnotes(getFootnotesByPosition(content, "page_bottom"));
}

function collectFaqsDeep(value: any, result: any[] = []) {
  if (!value) {
    return result;
  }

  if (Array.isArray(value)) {
    const looksLikeFaqArray =
      value.length > 0 &&
      value.every((item) => {
        return item && typeof item === "object" && ("question" in item || "answer" in item);
      });

    if (looksLikeFaqArray) {
      result.push(...value);
    }

    value.forEach((item) => collectFaqsDeep(item, result));
    return result;
  }

  if (typeof value === "object") {
    ["faqs", "faqItems", "faq"].forEach((key) => {
      if (Array.isArray(value[key])) {
        result.push(...value[key]);
      }
    });

    Object.keys(value).forEach((key) => collectFaqsDeep(value[key], result));
  }

  return result;
}


function getSpecLabelForLocaleFilter(spec: unknown): string {
  const item = spec as Record<string, unknown>;

  return toText(
    item.label ||
      item.name ||
      item.title ||
      item.key ||
      item.parameter ||
      item.property ||
      item.specName
  );
}

function shouldHideSpecForLocale(spec: unknown, locale: "zh" | "en"): boolean {
  if (locale !== "zh") {
    return false;
  }

  const label = getSpecLabelForLocaleFilter(spec);

  if (!label) {
    return false;
  }

  if (/[\u4e00-\u9fff]/.test(label)) {
    return false;
  }

  return [
    /^accuracy\b/i,
    /^repeatability\b/i,
    /^dead\s*volume\b/i,
    /^maximum\b/i,
    /^recommended\b/i,
    /^motor\b/i,
    /^lead\b/i,
    /^stroke\b/i,
    /^design\s*life\b/i,
    /^fluid\s*pressure\b/i,
    /^pump\s*head\b/i,
    /^piston\b/i,
    /^liquid\s*interface\b/i,
    /^resolution\b/i,
  ].some((pattern) => pattern.test(label));
}

function filterSpecsByLocale<T>(specs: readonly T[], locale: "zh" | "en"): T[] {
  return specs.filter((spec) => !shouldHideSpecForLocale(spec, locale));
}

function getFaqs(candidates: any[], locale: "zh" | "en") {
  const rawFaqs = collectFaqsDeep(candidates);

  const mapped = rawFaqs
    .map((item: any) => ({
      question: toText(item.question),
      answer: toText(item.answer),
    }))
    .filter((item: any) => {
      if (!item.question || !item.answer) {
        return false;
      }

      if (locale === "zh") {
        return hasChinese(item.question) || hasChinese(item.answer);
      }

      if (locale === "en") {
        return !hasChinese(item.question);
      }

      return true;
    });

  const seen = new Set<string>();

  return mapped.filter((item) => {
    const key = `${item.question}::${item.answer}`;

    if (seen.has(key)) {
      return false;
    }

    seen.add(key);
    return true;
  });
}


function getSectionTitleMap(content: any) {
  const sections = Array.isArray(content?.sections) ? content.sections : [];

  return sections.reduce((map: Record<string, string>, section: any) => {
    const key = toText(section.sectionKey);
    const title = toText(section.headingText);

    if (key && title) {
      map[key] = title;
    }

    return map;
  }, {});
}

function getDetailDescription(candidates: any[], locale: "zh" | "en") {
  const description = getFirstText(
    candidates,
    [
      ["body", "description"],
      ["description"],
      ["seo", "metaDescription"],
      ["hero", "customNotice"],
    ],
    locale
  );

  if (description) {
    return [description];
  }

  const body = getFirstObject(candidates, "body");

  if (Array.isArray(body?.advantages)) {
    const items = uniqueList(body.advantages).filter((item) => {
      if (locale === "zh") {
        return hasChinese(item) && !isMostlyEnglish(item);
      }

      return !hasChinese(item);
    });

    if (items.length > 0) {
      return items;
    }
  }

  return [];
}

function getCommonApplications(candidates: any[], locale: "zh" | "en") {
  const body = getFirstObject(candidates, "body");

  const rawItems = Array.isArray(body?.commonApplications)
    ? body.commonApplications
    : Array.isArray(body?.applications)
      ? body.applications
      : Array.isArray(body?.applicationTags)
        ? body.applicationTags
        : [];

  return uniqueList(rawItems).filter((item) => {
    if (locale === "zh") {
      return hasChinese(item) && !isMostlyEnglish(item);
    }

    return !hasChinese(item);
  });
}

/* =========================================================
   对外方法：获取适配后的原详情页数据
========================================================= */
export function getPumpSeriesProductDetailAdapter(
  slug: string,
  locale: "zh" | "en" = "zh"
): ProductDetailPageData | null {
  const record = getPumpSeriesDetailData(slug, locale);

  if (!record) {
    return null;
  }

  const content = getLocalizedContent(record, locale);
  const candidates = getContentCandidates(record, locale);

  const hero = getFirstObject(candidates, "hero");
  const resources = getFirstObject(candidates, "resources");

  const images = getDetailImages(record, content);
  const mainImage = images[0] || null;
  const additionalImages = images.slice(1);

  const pageTitle =
    toText(content.h1) ||
    toText(content.title) ||
    toText(record.internalModelRef) ||
    toText(record.slug);

  const productName =
    toText(content.title) ||
    toText(content.h1) ||
    toText(record.internalModelRef) ||
    "柱塞泵";

  const displayModel =
    toText(hero.displayModel) ||
    toText(record.internalModelRef) ||
    toText(record.productId) ||
    toText(record.slug);

  const showModelCode = hero.showModel !== false;

  const data: ProductDetailPageData & Record<string, any> = {
    category: "pumps",
    slug: toText(record.slug),

    model: pageTitle,
    name: productName,

    advantages: getDetailDescription(candidates, locale),
    commonApplications: getCommonApplications(candidates, locale),

    mainImage,
    additionalImages,

    showConfigurator: false,
    showDatasheetRequest: false,
    showDrawingRequest: Boolean(resources.showDrawing),
    show3DRequest: Boolean(resources.show3D),

    faqKey: "",
    faqs: getFaqs(candidates, locale),

    specSeriesKey: toText(record.seriesSlug || record.pumpTypeSlug || "pumps"),

    specs: getSpecs(content, locale),

    drawing2dUrl: toText(resources.drawing2dUrl),
    drawingPdfUrl: toText(resources.drawing2dUrl),
    partDrawingUrl: toText(resources.drawing2dUrl),
    model3dUrl: toText(resources.model3dUrl),
    resources,

    detailMode: toText(hero.detailMode),
    showModelCode,
    displayModel,
    customNotice: toText(hero.customNotice),
    sectionTitleMap: getSectionTitleMap(content),

    imageCaption: getDetailImageCaption(content),
    imageFootnotes: getDetailImageFootnotes(content),

    parameterFootnotes: getParameterFootnotes(content),
    resourceFootnotes: getResourceFootnotes(content),
    pageFootnotes: getPageFootnotes(content),
  };

  return data;
}