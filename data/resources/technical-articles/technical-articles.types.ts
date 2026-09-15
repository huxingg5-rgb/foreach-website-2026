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

export type TechnicalArticlePrimaryCategory =
  | "pumps"
  | "valves"
  | "fittings-tubing"
  | "fluid-detection-control"
  | "general-fluidics"
  | "applications-solutions";

export type TechnicalArticleSecondaryCategory =
  | "miniature-diaphragm-pumps"
  | "plunger-pumps"
  | "syringe-pumps"
  | "pipetting-pumps"
  | "solenoid-valves"
  | "multi-port-valves"
  | "high-pressure-valves"
  | "fluid-switching-valves"
  | "fittings"
  | "ferrules-connectors"
  | "flexible-rigid-tubing"
  | "tubing-accessories"
  | "pressure-detection-control"
  | "liquid-level-detection"
  | "fluid-state-detection"
  | "intelligent-fluid-control"
  | "flow-operating-point"
  | "pressure-backpressure"
  | "self-priming-negative-pressure-vacuum"
  | "tubing-resistance-pressure-drop"
  | "material-chemical-compatibility"
  | "sealing-leakage"
  | "bubbles-pulsation"
  | "lifetime-reliability"
  | "testing-validation"
  | "ivd-medical-devices"
  | "life-science-synthetic-biology"
  | "laboratory-automation"
  | "analytical-instruments"
  | "cleaning-waste"
  | "reagent-sample-handling"
  | "printing-inkjet"
  | "oem-fluidic-systems";

export interface TechnicalArticleBreadcrumbItem {
  label: string;
  href?: string;
}

export interface TechnicalArticleTaxonomySecondary {
  key: TechnicalArticleSecondaryCategory;
  label: string;
}

export interface TechnicalArticleTaxonomyPrimary {
  key: TechnicalArticlePrimaryCategory;
  label: string;
  children: TechnicalArticleTaxonomySecondary[];
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

export interface ClassifiedTechnicalArticleItem extends TechnicalArticleItem {
  primaryCategory: TechnicalArticlePrimaryCategory;
  secondaryCategory: TechnicalArticleSecondaryCategory;
  tags: string[];
  relatedProducts: string[];
}

export interface TechnicalArticleBottomAction {
  label: string;
  href: string;
}

export interface TechnicalArticlesSourcePageData {
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

  sectionTitle: string;

  articles: TechnicalArticleItem[];

  bottomBanner: {
    title: string;
    description: string;
    actions: TechnicalArticleBottomAction[];
  };
}

export interface TechnicalArticlesPageData
  extends Omit<TechnicalArticlesSourcePageData, "articles"> {
  taxonomy: TechnicalArticleTaxonomyPrimary[];
  articles: ClassifiedTechnicalArticleItem[];
}
