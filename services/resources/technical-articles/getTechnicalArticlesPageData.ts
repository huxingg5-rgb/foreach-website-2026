/* =========================================================
   getTechnicalArticlesPageData.ts
   恒永达官网｜技术文章列表页数据服务层

   说明：
   1. 当前阶段读取本地静态数据
   2. 中文页面读取中文数据
   3. 外语页面统一读取英文数据
   4. DPL30 多语言文章由独立数据文件统一注入
   5. 后期接 CMS / 后端 / 数据库时，优先改这个文件
========================================================= */

import {
  dpl30ArticleSlug,
  getDpl30TechnicalArticle,
} from "@/data/resources/technical-articles/dpl30-liquid-diaphragm-pump.article";
import { technicalArticlesIntlData } from "@/data/resources/technical-articles/technical-articles.intl";
import { localizeTechnicalArticles } from "@/data/resources/technical-articles/technical-articles.translations";
import type {
  TechnicalArticleLocale,
  TechnicalArticlesPageData,
} from "@/data/resources/technical-articles/technical-articles.types";
import { technicalArticlesZhData } from "@/data/resources/technical-articles/technical-articles.zh";

function isChineseLocale(locale: TechnicalArticleLocale) {
  return locale === "zh-CN";
}

function getLocalePrefix(locale: TechnicalArticleLocale) {
  if (isChineseLocale(locale)) {
    return "";
  }

  return `/${locale}`;
}

function getLocalizedIntlTechnicalArticlesData(
  locale: TechnicalArticleLocale,
): TechnicalArticlesPageData {
  const prefix = getLocalePrefix(locale);

  return {
    ...technicalArticlesIntlData,
    locale,
    breadcrumbs: [
      { label: "Home", href: prefix },
      { label: "Resources", href: `${prefix}/resources` },
      { label: "Technical Articles" },
    ],
    bottomBanner: {
      ...technicalArticlesIntlData.bottomBanner,
      actions: technicalArticlesIntlData.bottomBanner.actions.map((action) => {
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

/**
 * DPL30 is maintained in one multilingual source instead of being copied into
 * the Chinese, English, and translated article arrays. Replacing a possible
 * duplicate also ensures the card summary always follows the first paragraph
 * of the localized article body.
 */
function withDpl30Article(
  locale: TechnicalArticleLocale,
  pageData: TechnicalArticlesPageData,
): TechnicalArticlesPageData {
  const dpl30Article = getDpl30TechnicalArticle(locale);

  return {
    ...pageData,
    locale,
    articles: [
      dpl30Article,
      ...pageData.articles.filter(
        (article) => article.slug !== dpl30ArticleSlug,
      ),
    ],
  };
}

export function getTechnicalArticlesPageData(
  locale: TechnicalArticleLocale,
): TechnicalArticlesPageData {
  if (isChineseLocale(locale)) {
    return withDpl30Article(locale, technicalArticlesZhData);
  }

  if (locale !== "en") {
    return withDpl30Article(
      locale,
      localizeTechnicalArticles(locale, technicalArticlesIntlData),
    );
  }

  return withDpl30Article(
    locale,
    getLocalizedIntlTechnicalArticlesData(locale),
  );
}
