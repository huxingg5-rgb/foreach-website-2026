/* =========================================================
   datasheets.types.ts
   恒永达官网｜规格书下载模块类型定义

   文件路径：
   data/resources/datasheets.types.ts

   说明：
   1. 这个文件只放类型，不放真实数据
   2. 以后前端静态数据、后端接口数据，都应该遵守这里的类型
   3. 后期接后端时，接口返回字段也尽量按这里来
========================================================= */

/* 官网当前支持的语言 */
export type DatasheetLocale = "zh-CN" | "en" | "es" | "fr" | "ko" | "ru";

/* 规格书分类 */
export type DatasheetCategory =
  | "all"
  | "pump"
  | "valve"
  | "needle"
  | "tubing"
  | "smart";

/* 规格书按钮行为 */
export type DatasheetActionType = "download" | "custom";

/* 页面 SEO */
export type DatasheetsSeo = {
  title: string;
  description: string;
};

/* Banner 区域 */
export type DatasheetsHero = {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
};

/* 面包屑 */
export type DatasheetsBreadcrumb = {
  home: string;
  homeHref?: string;
  resources: string;
  resourcesHref?: string;
  current: string;
};

/* 搜索区域 */
export type DatasheetsSearch = {
  placeholder: string;
  buttonText: string;
};

/* 主内容区 */
export type DatasheetsSection = {
  title: string;
  description: string;
  resultPrefix: string;
  resultSuffix: string;
  emptyTitle: string;
  emptyDescription: string;
};

/* 卡片字段标签 */
export type DatasheetsLabels = {
  language: string;
  version: string;
  update: string;

  /*
     字段分隔符
     说明：
     1. 中文默认可以用 ：
     2. 英文、西语、法语等可以用 :
     3. 不写时组件里默认使用 ：
  */
  fieldSeparator?: string;

  viewProduct: string;
  download: string;
  custom: string;
};

/* 底部联系支持区 */
export type DatasheetsSupport = {
  kicker: string;
  title: string;
  description: string;
  buttonText: string;
  buttonHref: string;
};

/* 页面整体文案 */
export type DatasheetsPageText = {
  /*
     SEO 信息
     说明：
     1. 规格书页面必须有 SEO 标题和描述
     2. 中文、英文、西语、法语、韩语、俄语都应该提供
     3. 后期接后端时，接口也应该返回这个字段
  */
  seo: DatasheetsSeo;

  hero: DatasheetsHero;
  breadcrumb: DatasheetsBreadcrumb;
  search: DatasheetsSearch;
  section: DatasheetsSection;
  labels: DatasheetsLabels;
  support: DatasheetsSupport;
}; 

/* 筛选按钮 */
export type DatasheetFilterOption = {
  label: string;
  value: DatasheetCategory;
};

/* 单个规格书资料 */
export type DatasheetItem = {
  id: string;
  category: DatasheetCategory;

  /*
     缩略图
     说明：
     组件里会读取 item.image 渲染左侧产品图
     所以这里必须有 image 字段
  */
  image: string;

  title: string;
  label: string;
  language: string;
  version: string;
  update: string;
  description: string;
  keywords: string;
  actionType: DatasheetActionType;
  downloadHref: string;

  /*
     产品详情页链接
     说明：
     1. 有些资料可能暂时没有产品详情页
     2. 所以这里做成可选
  */
  productHref?: string;
};

/* 规格书页面最终给组件使用的数据 */
export type DatasheetsPageData = {
  pageText: DatasheetsPageText;
  filterOptions: DatasheetFilterOption[];
  datasheetItems: DatasheetItem[];
}; 