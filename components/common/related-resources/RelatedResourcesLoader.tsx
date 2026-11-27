"use client";

import dynamic from "next/dynamic";
import { Component, useContext, type ReactNode, type ErrorInfo } from "react";
import { ProductDetailVideoContext } from "@/components/products/detail/product-detail-video-context";
import { germanRelatedArticleText, getRelatedResourcesText } from "@/data/resources/related-resources/related-resources.intl";
import type { RelatedResourcesData } from "./related-resources.types";
import styles from "./RelatedResources.module.css";

// Keep SSR cards and SEO links, but catch this optional UI chunk separately from product content.
const RelatedResourcesClient = dynamic(() => import("./RelatedResourcesClient"));

export class RelatedResourcesBoundary extends Component<
  { children: ReactNode; fallback: ReactNode }, { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("Related resources could not load", error, info.componentStack);
  }
  render() { return this.state.failed ? this.props.fallback : this.props.children; }
}

export default function RelatedResourcesLoader(resources: RelatedResourcesData) {
  const productDetailVideosProvided = useContext(ProductDetailVideoContext);
  // Also cover callers that supply their own curated videos and the error fallback.
  const data = resources.locale === "zh-CN" || productDetailVideosProvided ? { ...resources, videos: [] } : resources;
  if (!data.videos.length && !data.products.length && !data.articles.length) return null;
  const ui = getRelatedResourcesText(data.uiLocale ?? data.locale);
  const articleHeading = data.uiLocale !== "it" && data.uiLocale !== "hi" && data.articles.some(article => article.destinationLanguage)
    ? germanRelatedArticleText.heading : ui.relatedArticles;
  const fallbackLanguage = data.uiLocale === "hi" || data.uiLocale === "it" ? data.uiLocale : "de";
  const fallbackLabel = fallbackLanguage === "hi" ? " (अंग्रेज़ी में)" : fallbackLanguage === "it" ? " (in inglese)" : " (Englisch)";
  const videoLibraryFallback = fallbackLanguage !== "de" && data.videoLibraryHref?.startsWith("/en/");
  const prefix = data.locale === "zh-CN" ? "" : `/${data.locale}`;
  const fallback = (
    <aside className={styles.root} data-related-resources-fallback data-related-products-only={data.products.length > 0 && !data.videos.length && !data.articles.length || undefined}>
      {data.articles.length > 0 && <section><h2>{articleHeading}</h2><ul>
        {data.articles.map(article => (
          <li key={article.id}>
            <a
              href={article.href ?? `${prefix}/resources/technical-articles/${article.slug}/`}
              lang={article.contentLanguage ?? (data.uiLocale === "de" ? data.locale : undefined)}
              hrefLang={article.destinationLanguage ?? (data.uiLocale === "de" ? data.locale : undefined)}
            >
              {article.title}
              {article.destinationLanguage === "en" && <span lang={fallbackLanguage}>{fallbackLabel}</span>}
            </a>
          </li>
        ))}
      </ul></section>}
      {data.products.length > 0 && <section data-related-products-section><h2>{ui.relatedProducts}</h2><ul>
        {data.products.map(product => <li key={product.id}><a href={product.href} hrefLang={product.destinationLanguage}>{product.title}{product.destinationLanguage === "en" ? fallbackLabel : null}</a></li>)}
      </ul></section>}
      {data.videos.length > 0 && <a href={data.videoLibraryHref ?? `${data.videoLocale ? `/${data.videoLocale}` : prefix}/resources/installation-guide/`} hrefLang={videoLibraryFallback ? "en" : undefined}>{ui.relatedVideos}{videoLibraryFallback ? fallbackLabel : null}</a>}
    </aside>
  );
  return <RelatedResourcesBoundary fallback={fallback}><RelatedResourcesClient {...data} /></RelatedResourcesBoundary>;
}
