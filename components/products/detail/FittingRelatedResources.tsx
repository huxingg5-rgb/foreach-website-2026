import RelatedResources from "@/components/common/related-resources/RelatedResources";
import { getFittingResourceRelationKeys } from "@/data/products/selection/fitting-resource-relations";
import type { TechnicalArticleLocale } from "@/data/resources/technical-articles/technical-articles.types";

/** Reuse the existing article/video cards; these new product-page entries are foreign-language only. */
export default function FittingRelatedResources({
  productTypeId,
  model,
  locale,
}: {
  productTypeId: string;
  model?: string;
  locale: TechnicalArticleLocale;
}) {
  if (locale === "zh-CN") return null;
  const relationKeys = getFittingResourceRelationKeys(productTypeId, model);
  if (!relationKeys.length) return null;
  return <RelatedResources
    sourceType="product"
    sourceSlug={model?.toLowerCase() ?? productTypeId}
    relationKeys={relationKeys}
    locale={locale}
  />;
}
