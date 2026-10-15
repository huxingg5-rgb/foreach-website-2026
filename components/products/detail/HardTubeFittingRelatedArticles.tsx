import RelatedResources from "@/components/common/related-resources/RelatedResources";
import { getFlangedFittingRelationKeys } from "@/data/products/selection/flanged-fitting-related-products";
import { isHardTubeGuideModel } from "@/data/resources/technical-articles/hard-tube-fittings-related-products";
import type { TechnicalArticleLocale } from "@/data/resources/technical-articles/technical-articles.types";

export default function HardTubeFittingRelatedArticles({ model, locale }: { model: string; locale: TechnicalArticleLocale }) {
  const family = model.split("-")[0].toLowerCase();
  const relationKeys = [
    ...getFlangedFittingRelationKeys(model),
    ...(["hn", "hn6", "hnf", "hnf6", "hsf6"].includes(family) ? [`series:${family}`] : []),
    ...(isHardTubeGuideModel(model) ? ["category:hard-tube-fittings"] : []),
  ];
  if (!relationKeys.length) return null;
  return <RelatedResources sourceType="product" sourceSlug={model.toLowerCase()} relationKeys={relationKeys} locale={locale} />;
}
