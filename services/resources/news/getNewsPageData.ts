/* =========================================================
   getNewsPageData.ts
   恒永达官网｜公司新闻列表页数据服务层

   文件路径：
   services/resources/news/getNewsPageData.ts

   说明：
   1. 当前阶段读取本地静态数据
   2. 中文页面读取中文数据
   3. 外语页面统一读取英文数据
   4. 这里会根据 locale 自动修正外语页面 href
   5. 后期接 CMS / 后端 / 数据库时，优先改这个文件
========================================================= */

import { newsZhData } from "@/data/resources/news/news.zh";
import { newsIntlData } from "@/data/resources/news/news.intl";
import { localizeNews } from "@/data/resources/news/news.translations";
import { getQualityAndRecognitionArticles } from "@/data/resources/news/news.quality-updates";
import { getAdlm2026OnsiteArticle } from "@/data/resources/news/adlm-2026-onsite";

import type {
  NewsArticle,
  NewsLocale,
  NewsPageData,
} from "@/data/resources/news/news.types";

/* 判断是否为中文 */
function isChineseLocale(locale: NewsLocale) {
  return locale === "zh-CN";
}

/* 生成外语路径前缀 */
function getLocalePrefix(locale: NewsLocale) {
  if (isChineseLocale(locale)) {
    return "";
  }

  return `/${locale}`;
}

/* 给外语页面修正面包屑和 CTA 路径 */
function getLocalizedIntlNewsData(locale: NewsLocale): NewsPageData {
  const prefix = getLocalePrefix(locale);

  return {
    ...newsIntlData,
    locale,

    breadcrumbs: [
      {
        label: "Home",
        href: prefix,
      },
      {
        label: "Resources",
        href: `${prefix}/resources`,
      },
      {
        label: "News",
      },
    ],

    bottomBanner: {
      ...newsIntlData.bottomBanner,
      actions: newsIntlData.bottomBanner.actions.map((action) => {
        if (action.href.startsWith("http")) {
          return action;
        }

        return {
          ...action,
          href: `${prefix}${action.href}`,
        };
      }),
    },
  };
}

/* NEWS_QUALITY_MERGE_HELPER_START */

/*
 * 合并独立维护的专题新闻。
 *
 * 规则：
 * 1. 如果新专题和原新闻 slug 相同，新专题覆盖原文章。
 * 2. 合并完成后按照日期倒序排列。
 * 3. 不修改原来的 news.zh.ts、news.intl.ts 和翻译索引。
 */
function mergeQualityAndRecognitionArticles(
  pageData: NewsPageData,
  locale: NewsLocale
): NewsPageData {
  const supplementalArticles = [
    getAdlm2026OnsiteArticle(locale),
    ...getQualityAndRecognitionArticles(locale),
  ];

  const supplementalSlugs = new Set(
    supplementalArticles.map((article) => article.slug)
  );

  const retainedArticles = pageData.articles.filter(
    (article) => !supplementalSlugs.has(article.slug)
  );

  const articles: NewsArticle[] = [
    ...retainedArticles,
    ...supplementalArticles,
  ].sort((articleA, articleB) => {
    const dateCompare =
      articleB.date.localeCompare(articleA.date);

    if (dateCompare !== 0) {
      return dateCompare;
    }

    return (
      Number(Boolean(articleB.isPinned)) -
      Number(Boolean(articleA.isPinned))
    );
  });

  return {
    ...pageData,
    articles,
  };
}

/* NEWS_QUALITY_MERGE_HELPER_END */

export function getNewsPageData(
  locale: NewsLocale
): NewsPageData {
  if (isChineseLocale(locale)) {
    return mergeQualityAndRecognitionArticles(
      newsZhData,
      locale
    );
  }

  if (locale !== "en") {
    const localizedPageData =
      localizeNews(locale, newsIntlData);

    return mergeQualityAndRecognitionArticles(
      localizedPageData,
      locale
    );
  }

  const englishPageData =
    getLocalizedIntlNewsData(locale);

  return mergeQualityAndRecognitionArticles(
    englishPageData,
    locale
  );
}
