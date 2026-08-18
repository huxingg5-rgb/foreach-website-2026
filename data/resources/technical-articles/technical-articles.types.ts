/* =========================================================
   technical-articles.types.ts
   恒永达官网｜技术文章数据类型定义

   说明：
   1. 统一约束技术文章列表页和详情页数据结构
   2. 当前阶段使用本地静态数据
   3. 后期接 CMS / 后台 / 数据库时，可以沿用这些字段
========================================================= */

export type TechnicalArticleLocale = "zh-CN" | "en" | "es" | "fr" | "ko" | "ru";

export type TechnicalArticleCategory =
  | "fittings-tubing"
  | "pumps-valves"
  | "materials-compatibility"
  | "applications";

export interface TechnicalArticleBreadcrumbItem {
  label: string;
  href?: string;
}

export interface TechnicalArticleCategoryOption {
  key: "all" | TechnicalArticleCategory;
  label: string;
}

export interface TechnicalArticleBlock {
  title: string;
  content: string;
}

export interface TechnicalArticleItem {
  id: string;
  slug: string;
  relationKeys?: string[];
  relationPriority?: number;
  category: TechnicalArticleCategory;
  title: string;
  summary: string;
  date: string;
  coverImage: string;
  coverAlt?: string;
  content: TechnicalArticleBlock[];
  seoTitle?: string;
  seoDescription?: string;
}

export interface TechnicalArticleBottomAction {
  label: string;
  href: string;
}

export interface TechnicalArticlesPageData {
  locale: TechnicalArticleLocale;

  hero: {
    title: string;
    description: string;
    backgroundImage: string;
  };

  breadcrumbs: TechnicalArticleBreadcrumbItem[];

  search: {
    placeholder: string;
  };

  categories: TechnicalArticleCategoryOption[];

  sectionTitle: string;

  articles: TechnicalArticleItem[];

  bottomBanner: {
    title: string;
    description: string;
    actions: TechnicalArticleBottomAction[];
  };
}
