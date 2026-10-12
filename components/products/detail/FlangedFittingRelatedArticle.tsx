import RelatedResources from "@/components/common/related-resources/RelatedResources";
import { getFlangedFittingRelationKeys } from "@/data/products/selection/flanged-fitting-related-products";
import type { TechnicalArticleLocale } from "@/data/resources/technical-articles/technical-articles.types";

export default function FlangedFittingRelatedArticle({ model, locale }: { model: string; locale: TechnicalArticleLocale }) {
  const relationKeys = getFlangedFittingRelationKeys(model);
  if (!relationKeys.length) return null;
  return <RelatedResources sourceType="product" sourceSlug={model.toLowerCase()} relationKeys={relationKeys} locale={locale} />;
}
