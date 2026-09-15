/* =========================================================
   getTechnicalArticleData.ts
   恒永达官网｜技术文章详情页数据服务层

   说明：
   1. 根据 slug 获取技术文章详情
   2. 支持中文与外语页面
   3. 提供静态导出需要的 slug 列表
   4. 后期接 CMS / 后台时，优先改这里
========================================================= */

import { getTechnicalArticlesPageData } from "./getTechnicalArticlesPageData";

import type {
  ClassifiedTechnicalArticleItem,
  TechnicalArticleLocale,
} from "@/data/resources/technical-articles/technical-articles.types";

export function getTechnicalArticleData(
  locale: TechnicalArticleLocale,
  slug: string
): ClassifiedTechnicalArticleItem | null {
  const pageData = getTechnicalArticlesPageData(locale);

  return pageData.articles.find((article) => article.slug === slug) ?? null;
}

export function getTechnicalArticleSlugs(
  locale: TechnicalArticleLocale
): string[] {
  const pageData = getTechnicalArticlesPageData(locale);

  return pageData.articles.map((article) => article.slug);
}
