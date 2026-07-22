/* =========================================================
   getNewsArticleData.ts
   恒永达官网｜公司新闻详情页数据服务层

   说明：
   1. 根据 slug 查找新闻详情
   2. 支持中文与外语页面
   3. 提供 generateStaticParams 所需的 slug 列表
   4. 后期接 CMS 时，优先改这里
========================================================= */

import { getNewsPageData } from "./getNewsPageData";

import type {
  NewsArticle,
  NewsLocale,
} from "@/data/resources/news/news.types";

export function getNewsArticleData(
  locale: NewsLocale,
  slug: string
): NewsArticle | null {
  const pageData = getNewsPageData(locale);

  return pageData.articles.find((article) => article.slug === slug) ?? null;
}

export function getNewsSlugs(locale: NewsLocale): string[] {
  const pageData = getNewsPageData(locale);

  return pageData.articles.map((article) => article.slug);
} 