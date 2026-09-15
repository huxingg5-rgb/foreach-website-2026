"use client";

import dynamic from "next/dynamic";
import { Component, type ReactNode, type ErrorInfo } from "react";
import { getRelatedResourcesText } from "@/data/resources/related-resources/related-resources.intl";
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

export default function RelatedResourcesLoader(data: RelatedResourcesData) {
  const ui = getRelatedResourcesText(data.locale);
  const prefix = data.locale === "zh-CN" ? "" : `/${data.locale}`;
  const fallback = (
    <aside className={styles.root} data-related-resources-fallback>
      {data.articles.length > 0 && <section><h2>{ui.relatedArticles}</h2><ul>
        {data.articles.map(article => <li key={article.id}><a href={`${prefix}/resources/technical-articles/${article.slug}/`}>{article.title}</a></li>)}
      </ul></section>}
      {data.products.length > 0 && <section><h2>{ui.relatedProducts}</h2><ul>
        {data.products.map(product => <li key={product.id}><a href={product.href}>{product.title}</a></li>)}
      </ul></section>}
      {data.videos.length > 0 && <a href={`${prefix}/resources/installation-guide/`}>{ui.relatedVideos}</a>}
    </aside>
  );
  return <RelatedResourcesBoundary fallback={fallback}><RelatedResourcesClient {...data} /></RelatedResourcesBoundary>;
}
