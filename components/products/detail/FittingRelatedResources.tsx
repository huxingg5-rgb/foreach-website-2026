import { isFittingOverviewVideo } from "@/data/resources/installation-guide/fitting-video-relations";
import RelatedResources from "@/components/common/related-resources/RelatedResources";
import { getFittingResourceRelationKeys } from "@/data/products/selection/fitting-resource-relations";
import type { TechnicalArticleLocale } from "@/data/resources/technical-articles/technical-articles.types";
import { getRelatedResourcesData } from "@/services/resources/getRelatedResourcesData";
import RelatedResourcesLoader from "@/components/common/related-resources/RelatedResourcesLoader";

/** Use the same published article relations on every supported locale. */
export default function FittingRelatedResources({
  productTypeId,
  model,
  locale,
}: {
  productTypeId: string;
  model?: string;
  locale: TechnicalArticleLocale;
}) {
  const relationKeys = getFittingResourceRelationKeys(productTypeId, model);
  if (!relationKeys.length) return null;
  if (locale === "zh-CN") {
    const data = getRelatedResourcesData({ sourceType: "product", sourceSlug: model?.toLowerCase() ?? productTypeId, relationKeys, locale });
    const videos = data.videos.filter(video => isFittingOverviewVideo(video.id));
    return data.articles.length || videos.length
      ? <RelatedResourcesLoader {...data} videos={videos} products={[]} /> : null;
  }
  return <RelatedResources
    sourceType="product"
    sourceSlug={model?.toLowerCase() ?? productTypeId}
    relationKeys={relationKeys}
    locale={locale}
  />;
}
