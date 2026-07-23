/* =========================================================
   getNewsPageData.ts
   恒永达官网｜公司新闻列表页数据服务层

   文件路径：
   services/resources/news/getNewsPageData.ts

   说明：
   1. 当前阶段读取本地静态数据
   2. 中文页面读取中文数据
   3. 英文页面读取英文数据
   4. 西班牙文、法文、韩文、俄文读取本地化数据
   5. 质量体系、企业荣誉与制造能力专题由独立文件补充
   6. 后期接 CMS / 后端 / 数据库时，优先改这个文件
========================================================= */

import { newsZhData } from "@/data/resources/news/news.zh";
import { newsIntlData } from "@/data/resources/news/news.intl";
import { localizeNews } from "@/data/resources/news/news.translations";
import { getQualityAndRecognitionArticles } from "@/data/resources/news/news.quality-updates";

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

/*
 * 合并质量体系、企业荣誉与制造能力专题新闻。
 *
 * 处理规则：
 * 1. 新专题中如存在相同 slug，则覆盖旧文章，避免重复展示。
 * 2. 合并后按发布日期倒序排列，保证列表和上一篇/下一篇顺序一致。
 * 3. 不修改原始 news.zh.ts、news.intl.ts 和翻译索引，降低维护风险。
 */
function mergeQualityAndRecognitionArticles(
  pageData: NewsPageData,
  locale: NewsLocale
): NewsPageData {
  const supplementalArticles = getQualityAndRecognitionArticles(locale);
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
    const dateCompare = articleB.date.localeCompare(articleA.date);

    if (dateCompare !== 0) {
      return dateCompare;
    }

    return Number(Boolean(articleB.isPinned)) - Number(Boolean(articleA.isPinned));
  });

  return {
    ...pageData,
    articles,
  };
}

export function getNewsPageData(locale: NewsLocale): NewsPageData {
  if (isChineseLocale(locale)) {
    return mergeQualityAndRecognitionArticles(newsZhData, locale);
  }

  if (locale !== "en") {
    const localizedPageData = localizeNews(locale, newsIntlData);

    return mergeQualityAndRecognitionArticles(localizedPageData, locale);
  }

  const englishPageData = getLocalizedIntlNewsData(locale);

  return mergeQualityAndRecognitionArticles(englishPageData, locale);
}
