import { FITTING_PUBLISHED_PRODUCTS } from "@/data/products/selection/fitting-publication.generated";
import type { RelatedResourcesData } from "@/components/common/related-resources/related-resources.types";
import type { EngineeringArticleBlock } from "./diaphragm-pump-engineering-article.types";
import type { TechnicalArticleItem, TechnicalArticleLocale } from "./technical-articles.types";
import { quickDisconnectFittingSlug, threadedHoseBarbFittingsSlug, barbedFittingExpansionRatioSlug, fittingMaterialSelectionSlug } from "./technical-article-availability";
import { quickDisconnectFittingCopy, quickDisconnectFittingNavigation } from "./quick-disconnect-fitting.zh";
import { threadedHoseBarbFittingsCopy, threadedHoseBarbFittingsNavigation } from "./threaded-hose-barb-fittings.zh";
import { quickDisconnectTranslations } from "./quick-disconnect-fitting-locales";
import { barbedFittingExpansionRatioCopy, barbedFittingExpansionRatioNavigation } from "./barbed-fitting-expansion-ratio.zh";
import { fittingMaterialSelectionCopy, fittingMaterialSelectionNavigation } from "./fitting-material-selection.zh";
import { localizeFittingArticle, type FittingTranslationKey } from "./fitting-selection-locales";
import { fittingCardCopy } from "./fitting-selection-locales/cards";
import { addFittingContextLinks } from "./fitting-article-context-links";
import { fittingArticleImage } from "./fitting-article-images";

const articles = [
  {
    slug: quickDisconnectFittingSlug,
    copy: quickDisconnectFittingCopy,
    navigation: quickDisconnectFittingNavigation,
    relationKeys: ["category:quick-connect-fittings", "series:q20", "series:q40", "series:q60"],
    subject: { about: ["快插接头", "公母端配对", "快插接头阀门配置"], mentions: ["Q20", "Q40", "Q60", "PP", "POM", "EPDM"] },
    sidebarModels: ["Q2001-PNV-SPPE", "Q2001-SMV-SPPE"],
    showFooterProducts: true,
    models: [
      { model: "Q2001-PNV-SPPE", title: "Q20 公端非穿板带阀接头" },
      { model: "Q2001-SMV-SPPE", title: "Q20 母端穿板带阀接头" },
      { model: "Q4004-PNV-SPPE", title: "Q40 公端直通带阀接头" },
      { model: "Q6006-SNV-SPPE", title: "Q60 母端直通带阀接头" },
    ],
  },
  {
    slug: threadedHoseBarbFittingsSlug,
    copy: threadedHoseBarbFittingsCopy,
    navigation: threadedHoseBarbFittingsNavigation,
    relationKeys: ["category:thread-to-barbed-fittings", "series:sa", "series:sal", "series:sb", "series:sbs", "series:sbr", "series:sc"],
    subject: { about: ["螺纹转倒刺接头", "螺纹密封与底面密封", "软管内径匹配"], mentions: ["SA", "SAL", "SB", "SBS", "SBR", "SC", "UNF", "NPT", "M6×1"] },
    sidebarCards: [
      {
        id: "threaded-hose-barb-rotary-fitting",
        title: "旋转螺纹转倒刺接头",
        href: "/products/fittings/thread-to-barbed-fittings/",
        imageSrc: "/images/resources/technical-articles/threaded-hose-barb-fittings-selection-guide/rotary-thread-to-barbed-fitting-square.webp",
        imageAlt: "恒永达旋转螺纹转倒刺接头实拍",
        imageFill: true,
      },
      {
        id: "threaded-hose-barb-fitting",
        title: "螺纹转倒刺接头",
        href: "/products/fittings/thread-to-barbed-fittings/",
        imageSrc: "/images/resources/technical-articles/threaded-hose-barb-fittings-selection-guide/thread-to-barbed-fitting-square.webp",
        imageAlt: "恒永达螺纹转倒刺接头实拍",
        imageFill: true,
      },
    ],
    showFooterProducts: true,
    models: [
      { model: "SA-U28-32D-PP-N", title: "SA 直通螺纹密封接头" },
      { model: "SB-M5-32D-PP-N", title: "SB 直通底面密封接头" },
      { model: "SBS-M6-32D-PP-N", title: "SBS M6 底面密封接头" },
      { model: "SBR-U28-32-PP-N", title: "SBR 可旋转螺纹转倒刺接头" },
    ],
  },
  {
    slug: barbedFittingExpansionRatioSlug,
    copy: barbedFittingExpansionRatioCopy,
    navigation: barbedFittingExpansionRatioNavigation,
    relationKeys: ["category:barbed-fittings", "category:thread-to-barbed-fittings", "category:pvc-tubing", "category:tpu-tubing", "series:ba", "series:bl"],
    subject: { about: ["倒刺接头膨胀比", "软管配合与尺寸公差", "倒刺轮廓"], mentions: ["BL-32F", "BL-32D", "BA-32F", "C/F/D/V/X"] },
    sidebarCards: [
      {
        id: "barbed-y-series-photo",
        title: "Y 型倒刺接头",
        href: "/products/fittings/barbed-fittings/",
        imageSrc: "/images/resources/technical-articles/barbed-fitting-expansion-ratio/y-barbed-fittings-series-square.webp",
        imageAlt: "恒永达不同尺寸的 Y 型倒刺接头实拍",
        imageFill: true,
      },
      {
        id: "barbed-elbow-series-photo",
        title: "L 型倒刺接头",
        href: "/products/fittings/barbed-fittings/",
        imageSrc: "/images/resources/technical-articles/barbed-fitting-expansion-ratio/elbow-barbed-fittings-series-square.webp",
        imageAlt: "恒永达不同尺寸的 L 型倒刺接头实拍",
        imageFill: true,
      },
    ],
    showFooterProducts: true,
    models: [
      { model: "BL-32F-PP-N", title: "F 轮廓 L 型倒刺接头" },
      { model: "BL-32D-PP-N", title: "D 轮廓 L 型倒刺接头" },
      { model: "BA-32F-PP-N", title: "F 轮廓直通倒刺接头" },
      { model: "SA-U28-32D-PP-N", title: "螺纹转倒刺接头" },
    ],
  },
  {
    slug: fittingMaterialSelectionSlug,
    copy: fittingMaterialSelectionCopy,
    navigation: fittingMaterialSelectionNavigation,
    relationKeys: ["category:barbed-fittings", "category:thread-to-barbed-fittings", "category:quick-connect-fittings", "category:hard-tube-fittings", "topic:fitting-materials"],
    subject: { about: ["接头材料选择", "接液材料", "化学相容性"], mentions: ["PP", "PA", "POM", "PVDF", "PEEK", "BA-32F"] },
    // User-supplied group photos represent product categories, not individual SKUs.
    sidebarCards: [
      {
        id: "material-selection-thread-to-barbed-fittings",
        title: "螺纹转倒刺接头",
        href: "/products/fittings/thread-to-barbed-fittings/",
        imageSrc: "/images/resources/technical-articles/fitting-material-selection-guide/thread-to-barbed-fittings-group.webp",
        imageAlt: "恒永达多种规格螺纹转倒刺接头实物合照",
        imageFill: true,
      },
      {
        id: "material-selection-barbed-fittings",
        title: "倒刺接头",
        href: "/products/fittings/barbed-fittings/",
        imageSrc: "/images/resources/technical-articles/fitting-material-selection-guide/barbed-fittings-group.webp",
        imageAlt: "恒永达多种规格直通倒刺接头实物合照",
        imageFill: true,
      },
    ],
    showFooterProducts: true,
    models: [
      { model: "BA-32F-PP-N", title: "PP 本色直通倒刺接头" },
      { model: "BA-32F-PA-W", title: "PA 白色直通倒刺接头" },
      { model: "SA-U28-32D-PP-N", title: "PP 本色螺纹转倒刺接头" },
      { model: "SA-U28-32D-PA-W", title: "PA 白色螺纹转倒刺接头" },
    ],
  },
];

function articlesForLocale(locale: TechnicalArticleLocale) {
  return articles.map((article, articleIndex) => {
    if (locale === "zh-CN") return { ...article, copy: addFittingContextLinks(article.copy, article.slug, locale) };
    if (articleIndex === 0) {
      const translation = quickDisconnectTranslations[locale];
      return {
        ...article,
        copy: addFittingContextLinks(translation, article.slug, locale),
        navigation: article.navigation.map((item, index) => ({ ...item, label: translation.navigationLabels[index] })),
        subject: { ...article.subject, about: [...translation.about] },
        models: article.models.map((item, index) => ({ ...item, title: translation.productTitles[index] })),
      };
    }
    const key = (["threaded", "expansion", "materials"] as const)[articleIndex - 1] as FittingTranslationKey;
    const translated = localizeFittingArticle(key, { copy: article.copy, navigation: article.navigation }, locale);
    const cards = fittingCardCopy[locale];
    const sidebarTitles = key === "threaded" ? cards.threadedSidebar
      : key === "expansion" ? cards.expansionSidebar : cards.materialsSidebar;
    return {
      ...article,
      copy: addFittingContextLinks(translated.copy, article.slug, locale),
      navigation: translated.navigation,
      subject: { ...article.subject, about: [translated.copy.metadata.title] },
      models: article.models.map((item, index) => ({ ...item, title: cards[key][index] })),
      sidebarCards: article.sidebarCards?.map((card, index) => ({
        ...card, href: `/${locale}${card.href}`,
        title: sidebarTitles[index], imageAlt: `${sidebarTitles[index]} — ${key === "threaded" ? cards.threadedPhoto : cards.photo}`,
      })),
    };
  });
}

function blockText(block: EngineeringArticleBlock): string {
  switch (block.type) {
    case "paragraph": return block.text;
    case "notice": return [block.label, block.text].filter(Boolean).join(" ");
    case "formula": return [block.expression, block.note].filter(Boolean).join(" ");
    case "table": return [block.headers, ...block.rows].map(row => row.join(" | ")).join("\n");
    case "figure": return [block.alt, block.caption, ...(block.flowNodes?.map(node => `${node.label}：${node.detail}`) ?? [])].join(" ");
    case "subheading": return block.title;
    case "list": return block.items.join("\n");
    case "links": return block.items.map(item => [item.prefix, item.label, item.suffix].filter(Boolean).join("")).join(" ");
  }
}

export function getConnectorSelectionArticles(locale: TechnicalArticleLocale): TechnicalArticleItem[] {
  return articlesForLocale(locale).map(({ slug, copy, relationKeys }) => ({
    id: slug, slug, category: "fittings-tubing",
    ...copy.metadata, summary: copy.deck, date: "2026-10-20",
    relationKeys, relationPriority: 150,
    content: [
      { title: "", content: copy.leadBlocks.map(blockText).join("\n\n") },
      ...copy.sections.map(section => ({ title: section.title, content: section.blocks.map(blockText).join("\n\n") })),
      { title: copy.faqTitle, content: copy.faqItems.map(item => `${item.question}\n${item.answer}`).join("\n\n") },
    ],
  }));
}

export function getConnectorSelectionArticle(slug: string, locale: TechnicalArticleLocale) {
  const article = articlesForLocale(locale).find(item => item.slug === slug);
  if (!article) return null;
  const products: RelatedResourcesData["products"] = article.models.flatMap(({ model, title }) => {
    const product = FITTING_PUBLISHED_PRODUCTS.find(item => item.foreachModel === model);
    // A later withdrawal must also remove related-product links without breaking the article.
    return product ? [{
      id: product.productCode, title: `${title} ${model}`,
      href: `${locale === "zh-CN" ? "" : `/${locale}`}${product.detailHref}/`, imageSrc: fittingArticleImage(product.imageCard),
      imageAlt: `${locale === "zh-CN" ? "恒永达" : "FOREACH"} ${model} ${title}`,
    }] : [];
  });
  const sidebarProductIds = article.sidebarModels
    ? new Set(FITTING_PUBLISHED_PRODUCTS
      .filter(product => article.sidebarModels?.includes(product.foreachModel))
      .map(product => product.productCode))
    : null;
  const sidebarProducts = article.sidebarCards ?? (sidebarProductIds
    ? products.filter(product => sidebarProductIds.has(product.id))
    : products);
  return { ...article, products, sidebarProducts, footerProducts: article.showFooterProducts ? products : [] };
}
