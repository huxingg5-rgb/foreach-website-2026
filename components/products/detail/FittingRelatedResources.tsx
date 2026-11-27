import { getHindiDraftLink } from "@/lib/i18n/draft-languages";
import { hindiHardTubeRelatedArticles } from "@/data/products/detail/hard-tube-related-articles.hi";
import { hindiProductDetailText } from "@/data/products/detail/product-detail.hi";
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
  germanDraft = false,
  contentLocale,
}: {
  productTypeId: string;
  model?: string;
  locale: TechnicalArticleLocale;
  germanDraft?: boolean;
  contentLocale?: "it" | "hi";
}) {
  const relationKeys = getFittingResourceRelationKeys(productTypeId, model);
  if (!relationKeys.length) return null;
  if (locale === "zh-CN") {
    const data = getRelatedResourcesData({ sourceType: "product", sourceSlug: model?.toLowerCase() ?? productTypeId, relationKeys, locale });
    const videos = data.videos.filter(video => isFittingOverviewVideo(video.id));
    return data.articles.length || videos.length
      ? <RelatedResourcesLoader {...data} videos={videos} products={[]} /> : null;
  }
  if (contentLocale === "hi") {
    const data = getRelatedResourcesData({ sourceType: "product", sourceSlug: model?.toLowerCase() ?? productTypeId, relationKeys, locale });
    const articles = data.articles.map(article => {
      const link = getHindiDraftLink(article.href ?? "/en/resources/technical-articles/" + article.slug + "/");
      const copy = hindiHardTubeRelatedArticles[article.slug];
      return { ...article, ...copy, href: link.href, contentLanguage: copy ? "hi" as const : "en" as const, destinationLanguage: link.hrefLang };
    });
    const products = data.products.map(product => {
      const link = getHindiDraftLink(product.href);
      return { ...product, title: hindiProductDetailText(product.title), imageAlt: hindiProductDetailText(product.imageAlt), href: link.href, destinationLanguage: link.hrefLang };
    });
    const videos = data.videos.map(video => ({ ...video, title: hindiProductDetailText(video.title) }));
    if (!articles.length && !products.length && !videos.length) return null;
    return <RelatedResourcesLoader {...data} articles={articles} products={products} videos={videos} uiLocale="hi"
      videoLocale="hi" videoLibraryHref={getHindiDraftLink("/en/resources/installation-guide/").href} />;
  }
  return <RelatedResources
    sourceType="product"
    sourceSlug={model?.toLowerCase() ?? productTypeId}
    relationKeys={relationKeys}
    locale={locale}
    uiLocale={germanDraft ? "de" : contentLocale}
  />;
}
