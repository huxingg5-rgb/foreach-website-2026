/* =========================================================
   product-detail.types.ts
   恒永达官网｜中文产品详情页数据类型

   适用范围：
   1. 泵
   2. 阀
   3. 针
   4. 智控

   当前第一版：
   1. 只做中文
   2. FAQ 只预留，不显示
   3. 按钮只保留业务端口
========================================================= */

export type ProductDetailCategory =
  | "pumps"
  | "valves"
  | "needles"
  | "controllers";

export type ProductDetailFaqItem = {
  question: string;
  answer: string;
};

export type ProductSpecItem = {
  label: string;
  value: string;
};

export type ProductApplicationItem = {
  title: string;
  paragraphs: string[];
};

export type ProductApplicationSelectionNote = {
  title: string;
  paragraphs: string[];
  articleHref?: string;
  linkText?: string;
};

export type ProductMotorComparisonColumn = {
  title: string;
  paragraphs: string[];
};

export type ProductMotorComparisonContent = {
  title: string;
  brushed: ProductMotorComparisonColumn;
  brushless: ProductMotorComparisonColumn;
  counterpartHref?: string;
  counterpartLinkText?: string;
};

/**
 * 可复用于所有产品详情页的 Applications Tab 内容。
 *
 * 内容必须由服务端按当前页面语言注入，客户端只负责显示与切换，
 * 避免把产品长文交给通用词典自动翻译，也确保静态导出 HTML 含完整正文。
 */
export type ProductApplicationsContent = {
  tabLabel: string;
  title: string;
  intro: string[];
  items: ProductApplicationItem[];
  motorComparison?: ProductMotorComparisonContent;
  selectionNote: ProductApplicationSelectionNote;
};

export type ProductDetailZhRecord = {
  category: ProductDetailCategory;
  slug: string;
  relationKeys?: string[];
  relationPriority?: number;
  model: string;
  name: string;
  advantages: string[];
  commonApplications: string[];

  /**
   * 详情页附属图片。
   * 主图不在这里维护，后续从选型页面基础数据读取。
   * 没有附属图时使用空数组。
   */
  additionalImages: string[];

  showConfigurator: boolean;
  showDatasheetRequest: boolean;
  showDrawingRequest: boolean;
  show3DRequest: boolean;

  /**
   * Optional registry key for a real product datasheet. Runtime locale logic
   * decides whether the resource UI is rendered; Chinese detail pages ignore
   * this field.
   */
  datasheetId?: string;

  /**
   * 可选的产品 Applications 详情内容。
   * 未配置时不显示 Applications Tab；中文页面可继续保持现状。
   */
  applicationDetails?: ProductApplicationsContent;

  /**
   * Defaults to available on non-Chinese product detail pages. Set false only
   * when CAD requests are explicitly unavailable for a product.
   */
  cadRequestAvailable?: boolean;

  /**
   * FAQ 第一版只预留，不渲染。
   */
  faqKey?: string;

  /**
   * FAQ 按产品系列读取。
   * 没有配置 FAQ 时不渲染。
   */
  faqs?: ProductDetailFaqItem[];

  /**
   * 用于关联对应产品系列的规格参数数据。
   */
  specSeriesKey: string;
};

export type ProductDetailPageData = ProductDetailZhRecord & {
  /**
   * 后续从选型页面基础数据读取。
   */
  mainImage: string | null;

  /**
   * 后续由产品系列规格 Excel 生成。
   */
  specs: ProductSpecItem[];
};
