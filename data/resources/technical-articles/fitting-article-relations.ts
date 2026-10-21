import type { RelatedArticleCard } from "@/components/common/related-resources/related-resources.types";
import type { DiaphragmPumpEngineeringArticleCopy, EngineeringArticleBlock, EngineeringArticleLink } from "./diaphragm-pump-engineering-article.types";
import type { TechnicalArticleItem, TechnicalArticleLocale } from "./technical-articles.types";
import { getTubingAssemblyPath } from "@/data/products/tubing-assemblies.en";
import type { TubingAssemblySelectionContent } from "@/data/products/tubing-assemblies/localized";
import {
  hardTubeFittingsSlug as hard, flangedTubingAssembliesSlug as flanged,
  ferruleFittingSlug as ferrule, compressionRingFittingSlug as ring,
  barbedFittingSlug as barbed, luerFittingSlug as luer,
  quickDisconnectFittingSlug as quick, threadedHoseBarbFittingsSlug as threaded,
  barbedFittingExpansionRatioSlug as expansion, fittingMaterialSelectionSlug as material,
  femaleThreadAdaptersSlug as female, bulkheadBarbedFittingSlug as bulkhead,
} from "./technical-article-availability";

type ArticleEndpoint = readonly [slug: string, sectionId: string];

// Each editorial relationship is declared once, with a relevant section at both
// ends. Product-series matching alone cannot connect comparisons across families.
export const fittingArticleRelations: readonly (readonly [ArticleEndpoint, ArticleEndpoint])[] = [
  [[hard, "structures"], [flanged, "sealing"]],
  [[hard, "structures"], [ferrule, "comparison"]],
  [[hard, "structures"], [ring, "comparison"]],
  [[hard, "selection-example"], [female, "connection"]],
  [[hard, "tubing"], [material, "operating-conditions"]],
  [[flanged, "sealing"], [ferrule, "comparison"]],
  [[flanged, "sealing"], [ring, "comparison"]],
  [[ferrule, "comparison"], [ring, "comparison"]],
  [[barbed, "types"], [threaded, "two-seals"]],
  [[barbed, "profiles"], [expansion, "profiles"]],
  [[barbed, "types"], [bulkhead, "comparison"]],
  [[barbed, "types"], [luer, "connection"]],
  [[barbed, "materials"], [material, "pp-pa-example"]],
  [[quick, "conditions"], [material, "wetted-parts"]],
  [[quick, "panel-mount"], [bulkhead, "comparison"]],
  [[quick, "connection"], [luer, "locking"]],
  [[threaded, "tubing-size"], [expansion, "dimensions"]],
  [[threaded, "installation"], [material, "operating-conditions"]],
  [[threaded, "threads"], [female, "ports-and-sealing"]],
  [[expansion, "tubing-selection"], [material, "pp-pa-example"]],
  [[expansion, "fit-testing"], [bulkhead, "dimensions"]],
];

export const tubingAssemblyArticleSlugs = {
  "flanged-tubing": [flanged, hard],
  "retaining-ring-kits": [ring, hard],
  "ferrule-kits": [ferrule, hard],
} as const;

export function getFittingAssemblyLinks(slug: string, content: TubingAssemblySelectionContent): EngineeringArticleLink[] {
  const prefix = content.locale === "zh-CN" ? "" : `/${content.locale}`;
  return Object.entries(tubingAssemblyArticleSlugs).flatMap(([family, slugs]) => {
    if (!slugs.some(item => item === slug)) return [];
    const familyLink = { href: getTubingAssemblyPath(family).replace(/^\/en/, prefix), label: content.typeNames[family] };
    if (slug === hard) return [familyLink];
    return [familyLink, ...content.cards.filter(card => card.productTypeId === family && card.detailHref)
      .map(card => ({ href: card.detailHref!, label: card.cardTitle }))];
  });
}

export function getFittingArticleRelations(slug: string) {
  return fittingArticleRelations.flatMap(([first, second]) => {
    const [source, target] = first[0] === slug ? [first, second] : [second, first];
    return source[0] === slug ? [{ slug: target[0], sectionId: source[1] }] : [];
  });
}

/** Resolve names and availability from the public list in the current language. */
export function selectFittingArticleCards(articles: readonly TechnicalArticleItem[], slugs: readonly string[]): RelatedArticleCard[] {
  return [...new Set(slugs)].flatMap(slug => {
    const article = articles.find(item => item.slug === slug);
    if (!article) return [];
    const { id, title, summary, date, coverImage } = article;
    return [{ id, slug, title, summary, date, coverImage }];
  });
}

function articleSlugFromHref(href: string) {
  return href.match(/\/resources\/technical-articles\/([^/#?]+)/)?.[1];
}

function blockLinks(block: EngineeringArticleBlock): readonly EngineeringArticleLink[] {
  if (block.type === "links") return block.items;
  if (block.type === "figure" && block.link) return [block.link];
  return [];
}

/** Preserve existing editorial links and anchors, adding only missing destinations. */
export function withFittingArticleLinks(
  copy: DiaphragmPumpEngineeringArticleCopy,
  slug: string,
  locale: TechnicalArticleLocale,
  navigation: readonly { id: string }[],
  articles: readonly TechnicalArticleItem[],
  assemblyLinks: readonly EngineeringArticleLink[] = [],
): DiaphragmPumpEngineeringArticleCopy {
  const existing = new Set([...copy.leadBlocks, ...copy.sections.flatMap(section => section.blocks)]
    .flatMap(blockLinks).map(link => articleSlugFromHref(link.href)).filter(Boolean));
  const prefix = locale === "zh-CN" ? "" : `/${locale}`;
  const relations = getFittingArticleRelations(slug);
  return { ...copy, sections: copy.sections.map((section, index) => {
    const additions: EngineeringArticleLink[] = [];
    for (const relation of relations.filter(item => item.sectionId === navigation[index]?.id)) {
      if (existing.has(relation.slug)) continue;
      const target = articles.find(item => item.slug === relation.slug);
      if (!target) continue;
      additions.push({ href: `${prefix}/resources/technical-articles/${target.slug}/`, label: target.title });
      existing.add(target.slug);
    }
    // The selection/customization section links to the actual assembly catalog,
    // including individual configurations, rather than only its fitting parts.
    const blocks = [...section.blocks];
    if (additions.length) blocks.push({ type: "links", items: additions.map((link, i) => ({ ...link, prefix: i ? " · " : "" })) });
    if (index === copy.sections.length - 1 && assemblyLinks.length) {
      const existingHrefs = new Set(section.blocks.flatMap(blockLinks).map(link => link.href));
      const missing = assemblyLinks.filter(link => !existingHrefs.has(link.href));
      if (missing.length) blocks.push({ type: "links", ordered: true, items: missing });
    }
    return blocks.length === section.blocks.length ? section : { ...section, blocks };
  }) };
}
