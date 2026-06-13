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

export type ProductSpecItem = {
  label: string;
  value: string;
};

export type ProductDetailZhRecord = {
  category: ProductDetailCategory;
  slug: string;
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
   * FAQ 第一版只预留，不渲染。
   */
  faqKey?: string;

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