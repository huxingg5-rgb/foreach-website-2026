import type { RelatedResourcesData } from "@/components/common/related-resources/related-resources.types";
import type { LiquidChromatographySlug } from "@/data/applications/analytical-documents/liquid-chromatography";
import { LC_PRODUCTS, LC_TASK_RESOURCES } from "@/data/applications/analytical-documents/liquid-chromatography-resources";
import { pistonPumpRelatedProducts } from "@/data/products/selection/piston-pump-related-products";
import { diaphragmPumpSelectionProducts } from "@/data/products/selection/diaphragm-pump-selection.generated";
import { valvelessPumpSelectionProducts } from "@/data/products/selection/valveless-pump-selection.generated";
import { getTechnicalArticlesPageData } from "@/services/resources/technical-articles/getTechnicalArticlesPageData";

const productSources = [...pistonPumpRelatedProducts, ...diaphragmPumpSelectionProducts, ...valvelessPumpSelectionProducts];

/** Feed the existing site-wide cards; no LC-specific presentation or broad relation-key fallback. */
export function getLiquidChromatographyResources(slug: LiquidChromatographySlug): RelatedResourcesData {
  const relations = LC_TASK_RESOURCES[slug];
  const articleSources = getTechnicalArticlesPageData("en").articles;
  return {
    locale: "en",
    videos: [],
    products: relations.products.map((key) => {
      const product = LC_PRODUCTS[key];
      const source = productSources.find((item) => item.seriesId === product.seriesId && item.imageCard);
      if (!source?.imageCard) throw new Error(`Missing LC product image: ${key}`);
      return {
        id: `lc-series:${key}`, title: product.label.replace(/ configurations$/, ""), href: product.href,
        imageSrc: source.imageCard,
        imageAlt: `${product.label} — representative configuration; select capacity and materials on the product page`,
      };
    }),
    articles: [...new Set(relations.readings.map((item) => item.slug))].map((articleSlug) => {
      const article = articleSources.find((item) => item.slug === articleSlug);
      if (!article) throw new Error(`Missing published English LC reading: ${articleSlug}`);
      const { id, slug, title, summary, date, coverImage } = article;
      return { id, slug, title, summary, date, coverImage };
    }),
  };
}
