/* =========================================================
   news.types.ts
   恒永达官网｜公司新闻模块类型定义

   说明：
   1. 统一约束新闻列表页、新闻详情页的数据结构
   2. 当前新闻数据先放在本地 data 文件
   3. 后期接 CMS / 后台 / 数据库时，可以沿用这些字段
========================================================= */

export type NewsLocale = "zh-CN" | "en" | "es" | "fr" | "ko" | "ru";

export type NewsCategory = "exhibition" | "company" | "notice";

export interface NewsCategoryOption {
  key: "all" | NewsCategory;
  label: string;
}

export interface NewsBreadcrumbItem {
  label: string;
  href?: string;
}

export interface NewsArticleBlock {
  title: string;
  content: string;
}

export interface NewsArticle {
  id: string;
  slug: string;
  category: NewsCategory;
  title: string;
  summary: string;
  date: string;
  coverImage: string;
  coverAlt?: string;
  content: NewsArticleBlock[];
  seoTitle?: string;
  seoDescription?: string;
  isPinned?: boolean;
}

export interface NewsBottomBannerAction {
  label: string;
  href: string;
}

export interface NewsPageData {
  locale: NewsLocale;

  hero: {
    title: string;
    description: string;
    backgroundImage: string;
  };

  breadcrumbs: NewsBreadcrumbItem[];

  search: {
    placeholder: string;
  };

  categories: NewsCategoryOption[];

  sectionTitle: string;

  articles: NewsArticle[];

  bottomBanner: {
    title: string;
    description: string;
    actions: NewsBottomBannerAction[];
  };
}
