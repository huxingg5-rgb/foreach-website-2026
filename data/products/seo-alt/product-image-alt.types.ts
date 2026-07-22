/* =========================================================
   product-image-alt.types.ts
   FOREACH 官网｜产品图片 SEO ALT 通用类型

   说明：
   1. 所有产品图片 ALT 生成规则共用这个类型
   2. 不直接绑定某一个产品类，方便后续扩展到泵、阀、接头、传感器等
   3. 这里不写具体文案，只定义数据结构
========================================================= */

export type ProductCategoryId =
  | "pumps"
  | "valves"
  | "fittings"
  | "tubing"
  | "sensors"
  | string;

export type ProductImageAltInput = {
  /** 产品大类，例如 pumps / valves / fittings */
  categoryId?: ProductCategoryId;

  /** 产品类型，例如 plunger-pumps / diaphragm-pumps */
  productTypeId?: string;

  /** 页面型号，例如 EA-100-PMMA */
  productId: string;

  /** 系列代码，例如 EA / SM / TM */
  seriesCode?: string;

  /** 系列名称，例如 EA 常规柱塞泵 */
  seriesName?: string;

  /** 标称容量，单位统一使用 µL，例如 100 / 2500 / 10000 */
  capacityUl?: number | string | null;

  /** 材质代码，例如 PMMA / PEEK */
  materialCode?: string | null;

  /** 材质名称，例如 PMMA pump head */
  materialName?: string | null;

  /**
   * 英文应用场景短语
   * 注意：这里建议传英文，不建议在 ALT 生成函数里自动翻译中文
   * 示例：
   * ["low-volume reagent dispensing", "sample handling"]
   */
  applicationPhrases?: string[];

  /**
   * 后续从 Excel / CMS 生成时可传入完整自定义 ALT
   * 一旦传入，会优先使用它
   */
  customAlt?: string;
};
