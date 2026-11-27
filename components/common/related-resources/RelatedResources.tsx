import "server-only";

import { getRelatedResourcesData } from "@/services/resources/getRelatedResourcesData";
import { getInstallationGuidePageData } from "@/services/resources/installation-guide/getInstallationGuidePageData";
import { getGermanRelatedArticles } from "@/services/resources/technical-articles/getGermanRelatedArticles";
import { getHindiDraftLink, getItalianDraftLink } from "@/lib/i18n/draft-languages";
import { getItalianArticleFields, getItalianTechnicalArticleEdition } from "@/services/resources/technical-articles/getItalianTechnicalArticlesPageData";
import { getHindiTechnicalArticleEdition, getHindiTechnicalArticleFields } from "@/services/resources/technical-articles/getHindiTechnicalArticlesPageData";
import { hindiProductSelectionLabel } from "@/data/products/selection/product-selection.hi";
import RelatedResourcesLoader from "./RelatedResourcesLoader";
import type { RelatedResourcesData, RelatedResourcesProps } from "./related-resources.types";

export type { RelatedResourceSourceType } from "./related-resources.types";

export function localizeItalianRelatedVideos(videos: RelatedResourcesData["videos"]): RelatedResourcesData["videos"] {
  if (!videos.length) return videos;
  const localized = new Map(getInstallationGuidePageData("it").guides.map(guide => [guide.id, guide]));
  return videos.map(video => localized.get(video.id) ?? video);
}

export function localizeHindiRelatedVideos(videos: RelatedResourcesData["videos"]): RelatedResourcesData["videos"] {
  if (!videos.length) return videos;
  const localized = new Map(getInstallationGuidePageData("hi").guides.map(guide => [guide.id, guide]));
  return videos.map(video => {
    const guide = localized.get(video.id) ?? video;
    const detailHref = video.detailHref ? getHindiDraftLink(video.detailHref).href : undefined;
    return { ...guide, title: hindiProductSelectionLabel(guide.title), detailHref };
  });
}

export function localizeItalianRelatedResources(data: RelatedResourcesData): RelatedResourcesData {
  const articles = data.articles.map(article => {
    const destination = getItalianDraftLink(article.href ?? "/en/resources/technical-articles/" + article.slug + "/");
    const edition = destination.hrefLang === "it" ? getItalianTechnicalArticleEdition(article.slug) : undefined;
    const copy = edition ? getItalianArticleFields(edition) : undefined;
    return {
      ...article,
      ...(copy ? { title: copy.title, summary: copy.summary } : {}),
      href: destination.href,
      contentLanguage: copy ? "it" as const : "en" as const,
      destinationLanguage: destination.hrefLang,
    };
  });
  const products = data.products.map(product => {
    const destination = getItalianDraftLink(product.href);
    return { ...product, href: destination.href, destinationLanguage: destination.hrefLang };
  });
  const videos = localizeItalianRelatedVideos(data.videos);
  return { ...data, articles, products, videos, uiLocale: "it", videoLocale: "it" };
}

export function localizeHindiRelatedResources(data: RelatedResourcesData): RelatedResourcesData {
  const articles = data.articles.map(article => {
    const destination = getHindiDraftLink(article.href ?? "/en/resources/technical-articles/" + article.slug + "/");
    const edition = destination.hrefLang === "hi" ? getHindiTechnicalArticleEdition(article.slug) : undefined;
    const copy = edition ? getHindiTechnicalArticleFields(edition) : undefined;
    return {
      ...article,
      ...(copy ? { title: copy.title, summary: copy.summary } : {}),
      href: destination.href,
      contentLanguage: copy ? "hi" as const : "en" as const,
      destinationLanguage: destination.hrefLang,
    };
  });
  const products = data.products.map(product => {
    const destination = getHindiDraftLink(product.href);
    return {
      ...product,
      title: hindiProductSelectionLabel(product.title),
      href: destination.href,
      destinationLanguage: destination.hrefLang,
    };
  });
  return {
    ...data, articles, products,
    uiLocale: "hi", videoLocale: "hi",
    videoLibraryHref: getHindiDraftLink("/en/resources/installation-guide/").href,
    videos: localizeHindiRelatedVideos(data.videos),
  };
}

export default function RelatedResources(props: RelatedResourcesProps) {
  const data = getRelatedResourcesData(props);
  if (!data.videos.length && !data.products.length && !data.articles.length) return null;
  if (props.uiLocale === "it" && props.locale === "en") {
    return <RelatedResourcesLoader key={`it:${props.sourceType}:${props.sourceId || props.sourceSlug}`} {...localizeItalianRelatedResources(data)} />;
  }
  if (props.uiLocale === "hi" && props.locale === "en") {
    return <RelatedResourcesLoader
      key={`hi:${props.sourceType}:${props.sourceId || props.sourceSlug}`}
      {...localizeHindiRelatedResources(data)}
    />;
  }
  const articles = props.uiLocale === "de" && props.locale === "en" ? getGermanRelatedArticles(data.articles) : data.articles;
  return <RelatedResourcesLoader key={`${props.uiLocale ?? props.locale}:${props.sourceType}:${props.sourceId || props.sourceSlug}`} {...data} articles={articles} uiLocale={props.uiLocale ?? data.uiLocale} />;
}
