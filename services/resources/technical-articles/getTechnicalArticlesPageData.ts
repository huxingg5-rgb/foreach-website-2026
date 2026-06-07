/* =========================================================
   getTechnicalArticlesPageData.ts
   恒永达官网｜技术文章列表页数据服务层

   说明：
   1. 当前阶段读取本地静态数据
   2. 中文页面读取中文数据
   3. 外语页面统一读取英文数据
   4. 后期接 CMS / 后端 / 数据库时，优先改这个文件
========================================================= */

import { technicalArticlesZhData } from "@/data/resources/technical-articles/technical-articles.zh";
import { technicalArticlesIntlData } from "@/data/resources/technical-articles/technical-articles.intl";

import type {
  TechnicalArticleLocale,
  TechnicalArticlesPageData,
} from "@/data/resources/technical-articles/technical-articles.types";

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
  locale: TechnicalArticleLocale
): TechnicalArticlesPageData {
  const prefix = getLocalePrefix(locale);

  return {
    ...technicalArticlesIntlData,
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
        label: "Technical Articles",
      },
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

export function getTechnicalArticlesPageData(
  locale: TechnicalArticleLocale
): TechnicalArticlesPageData {
  if (isChineseLocale(locale)) {
    return technicalArticlesZhData;
  }

  return getLocalizedIntlTechnicalArticlesData(locale);
}