import type { RelatedResourcesData } from "@/components/common/related-resources/related-resources.types";
import type { TechnicalArticleItem, TechnicalArticleLocale } from "@/data/resources/technical-articles/technical-articles.types";
import { getRelatedProductSeriesKey, getRelatedResourcesData } from "@/services/resources/getRelatedResourcesData";
import { getFerruleFittingRelatedProducts } from "@/data/resources/technical-articles/what-is-a-ferrule-fitting.zh";
import { getHardTubeGuideProducts } from "@/data/resources/technical-articles/hard-tube-fittings-related-products";
import { getRplSelectionProducts } from "@/data/resources/technical-articles/rpl-valveless-metering-pump-selection.article";
import { getValvelessMeteringPumpOverviewProducts } from "@/data/resources/technical-articles/what-is-a-valveless-metering-pump.article";
import { pipettingBasicsRelatedProductIds } from "@/data/resources/technical-articles/what-is-pipetting.article";
import { getDiaphragmPumpReferenceByProductId } from "@/data/products/detail/diaphragm-pump-reference-models";

export type ArticleRelatedProduct = RelatedResourcesData["products"][number];

// Explicit comparisons take priority over the default one-card-per-series rule.
// IDs refer to published configurations; no fabricated series/detail URLs.
const articleProductIds: Record<string, readonly string[]> = {
  "100-kpa-vs-600-kpa-diaphragm-pump-selection": ["diaphragm-dpl30-brushed", "diaphragm-dpl30h-brushed"],
  "ivd-waste-liquid-pump-liquid-vs-gas-liquid-diaphragm-pump": ["diaphragm-dpl30-brushed", "diaphragm-dpgl800-ff"],
  "brushed-vs-brushless-diaphragm-pump-3000h-10000h": ["diaphragm-dpl30-brushed", "diaphragm-dpl30-brushless"],
  "piston-pump-head-material-selection": ["pump-ea-500ul-pmma", "pump-ea-500ul-peek"],
  "what-is-pipetting": pipettingBasicsRelatedProductIds,
};

export function getArticleRelatedProducts(article: TechnicalArticleItem, locale: TechnicalArticleLocale): ArticleRelatedProduct[] {
  let products: ArticleRelatedProduct[];
  let explicit = true;
  switch (article.slug) {
    case "what-is-a-ferrule-fitting": products = getFerruleFittingRelatedProducts(locale).products; break;
    case "hard-tube-fittings-selection-guide": {
      const all = getHardTubeGuideProducts(locale).products;
      products = [all[0], all[2]].filter((product): product is ArticleRelatedProduct => Boolean(product));
      break;
    }
    case "metering-pump-accuracy-repeatability-reagent-dispensing":
    case "rpl-valveless-metering-pump-selection-guide":
    case "what-is-a-valveless-metering-pump": {
      const all = article.slug === "what-is-a-valveless-metering-pump"
        ? getValvelessMeteringPumpOverviewProducts(locale) : getRplSelectionProducts(locale);
      products = all.map(product => ({ id: product.name, title: product.name, href: product.href, imageSrc: product.image, imageAlt: product.alt }));
      break;
    }
    default: {
      const ids = articleProductIds[article.slug];
      explicit = Boolean(ids);
      products = getRelatedResourcesData({ sourceType: "article", sourceId: article.id, sourceSlug: article.slug, relationKeys: article.relationKeys, featuredProductIds: ids, locale }).products;
    }
  }

  const seen = new Set<string>();
  const selected = products.filter(product => {
    if (!product.href || !product.imageSrc || !product.title) return false;
    // Use product identity, not translated title parsing, for series deduplication.
    // Explicit editorial selections may intentionally compare variants of one series.
    const key = explicit ? product.href : getRelatedProductSeriesKey(product.id) ?? product.href;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  }).slice(0, 2);
  return selected.map(product => {
    const reference = getDiaphragmPumpReferenceByProductId(product.id);
    if (!reference) return product;
    const copy = reference.localized[locale === "zh-CN" ? "zh" : locale];
    // Show the descriptive product name; the card link still targets the exact model.
    const title = locale === "zh-CN" ? copy.cardSubtitle.split("，")[0] : copy.cardSubtitle;
    return { ...product, title };
  });
}
