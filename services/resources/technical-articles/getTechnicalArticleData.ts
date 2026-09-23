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

export type TechnicalArticlePagerItem = {
  title: string;
  href: string;
  date?: string;
};

/** Use the public article order and keep both navigation targets in this locale. */
export function getTechnicalArticlePagerData(
  locale: TechnicalArticleLocale,
  currentSlug: string,
): {
  previousArticle: TechnicalArticlePagerItem | null;
  nextArticle: TechnicalArticlePagerItem | null;
} {
  const { articles } = getTechnicalArticlesPageData(locale);
  const index = articles.findIndex((article) => article.slug === currentSlug);
  const prefix = locale === "zh-CN" ? "" : `/${locale}`;
  const toPagerItem = (
    article: ClassifiedTechnicalArticleItem | undefined,
  ): TechnicalArticlePagerItem | null => article ? {
    title: article.title,
    href: `${prefix}/resources/technical-articles/${article.slug}/`,
    date: article.date,
  } : null;

  if (index < 0) {
    return { previousArticle: null, nextArticle: null };
  }

  return {
    previousArticle: toPagerItem(articles[index - 1]),
    nextArticle: toPagerItem(articles[index + 1]),
  };
}
