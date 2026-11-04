import { flowTranslations } from "./instrument-fluidics/flow-locales";
import { pressureTranslations } from "./instrument-fluidics/pressure-locales";
import { diaphragmOverviewTranslations } from "./instrument-fluidics/diaphragm-overview-locales";
import { copy as flow } from "./instrument-fluidics/quick-disconnect-coupling-flow-pressure-drop.zh";
import { copy as pressure } from "./instrument-fluidics/quick-disconnect-coupling-pressure-rating.zh";
import type { RelatedResourcesData } from "@/components/common/related-resources/related-resources.types";
import { FITTING_PUBLISHED_PRODUCTS } from "@/data/products/selection/fitting-publication.generated";
import { diaphragmPumpSelectionProducts } from "@/data/products/selection/diaphragm-pump-selection.generated";
import { getDiaphragmPumpCardPhoto, getDiaphragmPumpReferenceByProductId } from "@/data/products/detail/diaphragm-pump-reference-models";
import { getDiaphragmPumpPath } from "@/data/products/detail/diaphragm-pump-routes";
import type { EngineeringArticleBlock } from "./diaphragm-pump-engineering-article.types";
import type { TechnicalArticleItem, TechnicalArticleLocale } from "./technical-articles.types";
import { copy as diaphragmOverview } from "./instrument-fluidics/what-is-a-diaphragm-pump.zh";

// Model cards are configuration examples, not the unidentified catalogue test samples.
const definitions = [
  { slug: "quick-disconnect-coupling-flow-pressure-drop", copy: flow, category: "fittings-tubing", series: "q20,q40,q60", date: "2026-10-27",
    models: ["Q2002-PNV-SPPE", "Q2004-PNV-SPPE", "Q4004-PNV-SPPE", "Q4006-PNV-SPPE", "Q6006-SNV-SPPE", "Q6008-PNV-SPPE"], pumpIds: [],
    anchors: ["flow-factors", "read-curves", "flow-tables", "kv-cv-calculation", "valve-pressure-drop", "model-size-codes", "suction-side", "parallel-branches", "fluid-properties", "sample-validation", "further-reading"] },
  { slug: "quick-disconnect-coupling-pressure-rating", copy: pressure, category: "fittings-tubing", series: "q20,q40,q60", date: "2026-10-27",
    models: ["Q6006-SNV-SPPE", "Q6008-PNV-SPPE", "Q6012-SNV-SPPE", "Q4006-PNV-SPPE", "Q2002-PNV-SACN"], pumpIds: [],
    anchors: ["pressure-ratings", "size-vs-pressure", "pressure-vs-drop", "pressure-checks", "temperature", "disconnect-safely", "q60-installation", "sample-validation", "further-reading"] },
  { slug: "what-is-a-diaphragm-pump", copy: diaphragmOverview, category: "pumps-valves", series: "", date: "2026-11-03",
    models: [], pumpIds: ["diaphragm-dpl30-brushless", "diaphragm-dpgl800-ff", "diaphragm-dpl60-brushless"],
    anchors: ["working-principle", "types", "pros-cons", "applications", "selection", "summary"] },
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

// Articles with a full set of translations; every other article here stays Chinese-only.
const translatedArticles = {
  "quick-disconnect-coupling-flow-pressure-drop": flowTranslations,
  "quick-disconnect-coupling-pressure-rating": pressureTranslations,
  "what-is-a-diaphragm-pump": diaphragmOverviewTranslations,
} as const;

function definitionsForLocale(locale: TechnicalArticleLocale) {
  return definitions
    .filter(item => locale === "zh-CN" || item.slug in translatedArticles)
    .map(item => ({ ...item, copy: locale === "zh-CN" ? item.copy
      : translatedArticles[item.slug as keyof typeof translatedArticles]?.[locale] ?? item.copy }));
}

export function getInstrumentFluidicsArticles(locale: TechnicalArticleLocale): TechnicalArticleItem[] {
  return definitionsForLocale(locale).map(item => ({
    id: item.slug, slug: item.slug, category: item.category,
    ...item.copy.metadata, summary: item.copy.deck, date: item.date,
    relationKeys: [...new Set(relationKeys(item))], relationPriority: 150,
    content: [
      { title: "", content: item.copy.leadBlocks.map(blockText).join("\n\n") },
      ...item.copy.sections.map(section => ({ title: section.title, content: section.blocks.map(blockText).join("\n\n") })),
    ],
  }));
}

const pumpNames = {
  en: "miniature diaphragm pump", es: "bomba de diafragma miniatura", fr: "pompe à membrane miniature",
  ko: "소형 다이어프램 펌프", ru: "миниатюрный мембранный насос",
} as const;

const pumpMentions: Record<TechnicalArticleLocale, string[]> = {
  "zh-CN": ["隔膜泵", "仪器液路"], en: ["diaphragm pump", "instrument fluidics"],
  es: ["bomba de diafragma", "circuitos de fluidos de instrumentos"], fr: ["pompe à membrane", "circuits fluidiques d’instruments"],
  ko: ["다이어프램 펌프", "기기 유로"], ru: ["мембранный насос", "жидкостные системы приборов"],
};

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
  // The overview article shows the same card photos as the product category page.
  const useCategoryCards = article.slug === "what-is-a-diaphragm-pump";
  const pumps: RelatedResourcesData["products"] = article.pumpIds.flatMap(id => {
    const product = diaphragmPumpSelectionProducts.find(item => item.productId === id);
    const ref = getDiaphragmPumpReferenceByProductId(id);
    const pumpLocale = locale === "zh-CN" ? "zh" : locale;
    return product && ref && product.imageCard ? [{ id,
      title: locale === "zh-CN" ? `${ref.model} ${ref.localized.zh.cardSubtitle.split("，")[0]}`
        : `${ref.model} ${ref.localized[pumpLocale].cardSubtitle.split(/\s*[|｜]\s*/)[0]}`,
      href: getDiaphragmPumpPath(pumpLocale, ref.slug),
      imageSrc: (useCategoryCards ? getDiaphragmPumpCardPhoto(ref.copyKey) : undefined) ?? `/images/resources/technical-articles/instrument-fluidics/products/${ref.slug}.webp`,
      imageAlt: !useCategoryCards ? `恒永达 ${ref.model} 隔膜泵产品照片，非本文实测样本记录`
        : locale === "zh-CN" ? `恒永达 ${ref.model} 微型隔膜泵` : `FOREACH ${ref.model} — ${pumpNames[locale]}`,
      imageAspectRatio: useCategoryCards && ref.copyKey !== "dpgl800-brushless" ? 4 / 3 : 1 }] : [];
  });
  const products = [...fittings, ...pumps];
  return { ...article, products, sidebarProducts: products.slice(0, 2), footerProducts: products,
    subject: { about: [article.copy.metadata.title], mentions: article.series ? article.series.toUpperCase().split(",") : pumpMentions[locale] },
    navigation: article.copy.sections.map((section, index) => ({ id: article.anchors[index], label: section.title })),
  };
}
