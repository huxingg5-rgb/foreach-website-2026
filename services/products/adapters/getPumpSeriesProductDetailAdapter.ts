/* =========================================================
   getPumpSeriesProductDetailAdapter.ts
   恒永达官网｜泵系列数据库数据 → 原详情页数据结构适配器

   作用：
   1. 读取泵系列 xlsx 解析后的数据库数据
   2. 转换成 ProductDetailClient 原来需要的 ProductDetailPageData
   3. 保留原详情页组件和原 CSS，不重新设计页面
   4. 当前只服务于泵系列数据库预览，不影响正式详情页
========================================================= */

import type {
  ProductDetailPageData,
  ProductSpecItem,
} from "@/data/products/detail/product-detail.types";
import { getPumpSeriesDetailData } from "@/services/products/getPumpSeriesDetailData";

function toText(value: unknown) {
  return String(value || "").trim();
}

function uniqueList(items: string[]) {
  return Array.from(new Set(items.map(toText).filter(Boolean)));
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

function getDetailImageBlock(content: any) {
  const imageBlocks = Array.isArray(content?.images) ? content.images : [];

  return (
    imageBlocks.find((item: any) => item.imageUsage === "detailImages") ||
    imageBlocks[0] ||
    null
  );
}

function getDetailImages(content: any) {
  const detailImageBlock = getDetailImageBlock(content);
  const images = Array.isArray(detailImageBlock?.images)
    ? detailImageBlock.images
    : [];

  return images.map((item: any) => toText(item.src)).filter(Boolean);
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

function getSpecs(content: any): ProductSpecItem[] {
  const parameters = Array.isArray(content?.parameters)
    ? content.parameters
    : [];

  return parameters
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
    .filter((item: ProductSpecItem) => item.label && item.value);
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

function getFootnotesByPosition(content: any, renderPosition: string) {
  const refs = Array.isArray(content?.footnoteRefs)
    ? content.footnoteRefs
    : [];

  return refs
    .filter((item: any) => toText(item.renderPosition) === renderPosition)
    .flatMap((item: any) => (Array.isArray(item.footnotes) ? item.footnotes : []));
}

function getFaqs(content: any) {
  const faqs = Array.isArray(content?.faqs) ? content.faqs : [];

  return faqs
    .map((item: any) => ({
      question: toText(item.question),
      answer: toText(item.answer),
    }))
    .filter((item: any) => item.question && item.answer);
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

  const content = record.content || {};
  const body = content.body || {};
  const hero = content.hero || {};
  const resources = content.resources || {};

  const images = getDetailImages(content);
  const mainImage = images[0] || null;
  const additionalImages = images.slice(1);

  const modelTitle =
    toText(content.h1) ||
    toText(hero.displayModel) ||
    toText(record.internalModelRef) ||
    toText(record.slug);

  const productName =
    toText(content.title) ||
    toText(content.h1) ||
    toText(record.internalModelRef) ||
    "柱塞泵";

  const showModelCode = hero.showModel !== false;

  const data: ProductDetailPageData & Record<string, any> = {
    category: "pumps",
    slug: toText(record.slug),
    model: modelTitle,
    name: productName,

    advantages: uniqueList(body.advantages || []),
    commonApplications: uniqueList(body.commonApplications || []),

    mainImage,
    additionalImages,

    showConfigurator: false,
    showDatasheetRequest: false,
    showDrawingRequest: Boolean(resources.showDrawing),
    show3DRequest: Boolean(resources.show3D),

    faqKey: "",
    faqs: getFaqs(content),

    specSeriesKey: toText(record.seriesSlug || record.pumpTypeSlug || "pumps"),

    specs: getSpecs(content),

    drawing2dUrl: toText(resources.drawing2dUrl),
    drawingPdfUrl: toText(resources.drawing2dUrl),
    partDrawingUrl: toText(resources.drawing2dUrl),
    model3dUrl: toText(resources.model3dUrl),
    resources,

    detailMode: toText(hero.detailMode),
    showModelCode,
    displayModel: toText(hero.displayModel),
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