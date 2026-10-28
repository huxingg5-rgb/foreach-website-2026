import { pressureTranslations } from "./instrument-fluidics/pressure-locales";
import { copy as pressure } from "./instrument-fluidics/quick-disconnect-coupling-pressure-rating.zh";
import { flowTranslations } from "./instrument-fluidics/flow-locales";
import { copy as flow } from "./instrument-fluidics/quick-disconnect-coupling-flow-pressure-drop.zh";
import type { RelatedResourcesData } from "@/components/common/related-resources/related-resources.types";
import { FITTING_PUBLISHED_PRODUCTS } from "@/data/products/selection/fitting-publication.generated";
import { diaphragmPumpSelectionProducts } from "@/data/products/selection/diaphragm-pump-selection.generated";
import { getDiaphragmPumpReferenceByProductId } from "@/data/products/detail/diaphragm-pump-reference-models";
import { getDiaphragmPumpPath } from "@/data/products/detail/diaphragm-pump-routes";
import type { EngineeringArticleBlock } from "./diaphragm-pump-engineering-article.types";
import type { TechnicalArticleItem, TechnicalArticleLocale } from "./technical-articles.types";

// Model cards are configuration examples, not the unidentified catalogue test samples.
const definitions = [
  { slug: "quick-disconnect-coupling-pressure-rating", copy: pressure, category: "fittings-tubing", series: "q20,q40,q60",
    models: ["Q6006-SNV-SPPE", "Q6008-PNV-SPPE", "Q6012-SNV-SPPE", "Q4006-PNV-SPPE", "Q2002-PNV-SACN"], pumpIds: [],
    anchors: ["pressure-ratings", "size-vs-pressure", "pressure-vs-drop", "pressure-checks", "temperature", "disconnect-safely", "q60-installation", "sample-validation", "further-reading"] },
  { slug: "quick-disconnect-coupling-flow-pressure-drop", copy: flow, category: "fittings-tubing", series: "q20,q40,q60",
    models: ["Q2002-PNV-SPPE", "Q2004-PNV-SPPE", "Q4004-PNV-SPPE", "Q4006-PNV-SPPE", "Q6006-SNV-SPPE", "Q6008-PNV-SPPE"], pumpIds: [],
    anchors: ["flow-factors", "read-curves", "flow-tables", "kv-cv-calculation", "valve-pressure-drop", "model-size-codes", "suction-side", "parallel-branches", "fluid-properties", "sample-validation", "further-reading"] },
] as const;

function blockText(block: EngineeringArticleBlock): string {
  switch (block.type) {
    case "paragraph": return block.text;
    case "notice": return `${block.label ?? ""} ${block.text}`;
    case "table": return [block.headers, ...block.rows].map(row => row.join(" | ")).join("\n");
    case "figure": return `${block.alt} ${block.caption}`;
    case "formula": return `${block.expression} ${block.note ?? ""}`;
    case "subheading": return block.title;
    case "list": return block.items.join("\n");
    case "links": return block.items.map(item => item.label).join(" · ");
  }
}

function relationKeys(item: Pick<typeof definitions[number], "series" | "pumpIds">): string[] {
  // Relate only to concrete candidate series; do not claim these are tested samples.
  return item.series ? item.series.split(",").map(series => `series:${series}`) : item.pumpIds.flatMap(id => {
    const product = diaphragmPumpSelectionProducts.find(product => product.productId === id);
    return product?.relationKeys?.filter(key => key.startsWith("series:")) ?? [];
  });
}

function definitionsForLocale(locale: TechnicalArticleLocale) {
  return definitions.map(item => ({ ...item, copy: locale === "zh-CN" ? item.copy
    : item.slug === "quick-disconnect-coupling-pressure-rating" ? pressureTranslations[locale]
    : flowTranslations[locale] }));
}

export function getInstrumentFluidicsArticles(locale: TechnicalArticleLocale): TechnicalArticleItem[] {
  return definitionsForLocale(locale).map(item => ({
    id: item.slug, slug: item.slug, category: item.category,
    ...item.copy.metadata, summary: item.copy.deck, date: item.series ? "2026-10-27" : "2026-10-22",
    relationKeys: [...new Set(relationKeys(item))], relationPriority: 150,
    content: [
      { title: "", content: item.copy.leadBlocks.map(blockText).join("\n\n") },
      ...item.copy.sections.map(section => ({ title: section.title, content: section.blocks.map(blockText).join("\n\n") })),
    ],
  }));
}

const couplingNames = {
  en: "quick disconnect coupling", es: "acoplamiento rápido", fr: "raccord rapide",
  ko: "퀵 디스커넥트 커플링", ru: "быстроразъёмное соединение",
} as const;

export function getInstrumentFluidicsArticle(slug: string, locale: TechnicalArticleLocale) {
  const article = definitionsForLocale(locale).find(item => item.slug === slug);
  if (!article) return null;
  const fittings: RelatedResourcesData["products"] = article.models.flatMap(model => {
    const product = FITTING_PUBLISHED_PRODUCTS.find(item => item.foreachModel === model);
    return product ? [{ id: product.productCode, title: model, href: `${locale === "zh-CN" ? "" : `/${locale}`}${product.detailHref}/`,
      imageSrc: `/images/resources/technical-articles/instrument-fluidics/products/${model.toLowerCase()}.webp`, imageAlt: locale === "zh-CN" ? `恒永达 ${model} 快插接头` : `FOREACH ${model} — ${couplingNames[locale]}`, imageAspectRatio: 1 }] : [];
  });
  const pumps: RelatedResourcesData["products"] = article.pumpIds.flatMap(id => {
    const product = diaphragmPumpSelectionProducts.find(item => item.productId === id);
    const ref = getDiaphragmPumpReferenceByProductId(id);
    return product && ref && product.imageCard ? [{ id, title: `${ref.model} ${ref.localized.zh.cardSubtitle.split("，")[0]}`,
      href: getDiaphragmPumpPath("zh", ref.slug), imageSrc: `/images/resources/technical-articles/instrument-fluidics/products/${ref.slug}.webp`,
      imageAlt: `恒永达 ${ref.model} 隔膜泵产品照片，非本文实测样本记录`, imageAspectRatio: 1 }] : [];
  });
  const products = [...fittings, ...pumps];
  return { ...article, products, sidebarProducts: products.slice(0, 2), footerProducts: products,
    subject: { about: [article.copy.metadata.title], mentions: article.series ? article.series.toUpperCase().split(",") : ["隔膜泵", "仪器液路"] },
    navigation: article.copy.sections.map((section, index) => ({ id: article.anchors[index], label: section.title })),
  };
}
