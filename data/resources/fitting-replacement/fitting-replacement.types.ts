/* =========================================================
   fitting-replacement.types.ts
   恒永达官网｜接头型号替代查询数据类型定义

   文件路径：
   data/resources/fitting-replacement/fitting-replacement.types.ts

   作用：
   1. 统一约束 Q20 接头型号替代查询的数据结构
   2. 防止商品编码、型号、竞品编码、图片路径等字段写乱
   3. 后续从 Excel / 后台 / 数据库导入时，也尽量保持同一套字段
   4. 当前先服务中文页面：
      /resources/selection-support/fitting-replacement
========================================================= */

/* =========================================================
   多语言文本
   说明：
   1. 当前页面先做中文
   2. 但型号解析规则后续会服务英文、西语、法语、韩语、俄语
   3. 所以这里先把多语言字段预留好
========================================================= */
export interface FittingReplacementI18nText {
  zh: string; // 中文
  en?: string; // 英文
  es?: string; // 西班牙语
  fr?: string; // 法语
  ko?: string; // 韩语
  ru?: string; // 俄语
}

/* =========================================================
   Q 系列型号解析规则

   示例：
   Q2001-PMV-SPPE
   可以拆成：
   Q20 | 01 | P | M | V | S | PP | E

   注意：
   1. 同一个代码在不同位置可能含义不同
   2. 例如 S 在“公母端”里表示母端
   3. S 在“形状”里表示直通
   4. 所以必须通过 fieldKey / fieldName 来判断含义，不能只看代码本身
========================================================= */
export interface FittingModelRule {
  /* 适用系列，例如 Q20 */
  series: string;

  /* 字段顺序，用于前台展示排序 */
  fieldOrder: number;

  /* 字段唯一标识，代码里使用，建议英文小写 */
  fieldKey:
    | "series"
    | "tubeOrThread"
    | "gender"
    | "panelMount"
    | "valved"
    | "shape"
    | "housingMaterial"
    | "sealingRingMaterial";

  /* 字段名称，例如：管尺寸或螺纹、公母端、是否带阀 */
  fieldName: FittingReplacementI18nText;

  /* 取值位置说明，例如：第2段第1位、第3段中间字符 */
  positionDescription: string;

  /* 代码，例如 Q20、01、P、M、V、S、PP、E */
  code: string;

  /* 代码含义，例如：公端、穿板、EPDM */
  meaning: FittingReplacementI18nText;
}

/* =========================================================
   Q20 产品数据

   说明：
   1. 商品编码是内部唯一 ID
   2. 型号用于解析产品含义
   3. 竞品编码用于客户搜索
   4. 产品图按型号自动匹配
   5. 2D 图纸 PDF 也按型号自动匹配
========================================================= */
export interface FittingReplacementProduct {
  /* 商品编码，例如 839085 */
  productCode: string;

  /* 恒永达型号，例如 Q2001-PMV-SPPE */
  foreachModel: string;

  /* 竞品编码列表，例如 A0018 / B0007 / C0007 */
  competitorModels: string[];

  /* 包装，例如 25pcs/pkg */
  packageText?: string;

  /* 是否显示在首页卡片里 */
  showOnHome: boolean;

  /* 内部备注或前台备注，暂时可为空 */
  note?: string;

  /* 产品图片路径，后续根据型号自动生成 */
  imagePath: string;

  /* 2D 图纸 PDF 路径，后续根据型号自动生成 */
  drawingPdfPath: string;
}

/* =========================================================
   型号解析后的单个字段

   示例：
   字段名称：公母端
   代码：P
   含义：公端
========================================================= */
export interface ParsedFittingModelField {
  fieldOrder: number;
  fieldKey: FittingModelRule["fieldKey"];
  fieldName: FittingReplacementI18nText;
  code: string;
  meaning: FittingReplacementI18nText;
}

/* =========================================================
   页面完整数据
   说明：
   service 层会把这些数据交给组件使用
========================================================= */
export interface FittingReplacementPageData {
  banner: {
    eyebrow: string;
    title: string;
    description: string;
  };

  breadcrumbs: {
    label: string;
    href?: string;
  }[];

  search: {
    placeholder: string;
    buttonText: string;
  };

  products: FittingReplacementProduct[];

  modelRules: FittingModelRule[];
} 