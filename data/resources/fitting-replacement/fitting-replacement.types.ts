/* =========================================================
   fitting-replacement.types.ts
   恒永达官网｜接头替代查询数据类型定义

   文件路径：
   data/resources/fitting-replacement/fitting-replacement.types.ts

   作用：
   1. 统一约束接头替代查询模块的数据结构
   2. 防止商品编码、型号、竞品编码、图片路径、图纸路径等字段写乱
   3. 当前服务：
      - Q20 快插接头替代查询
      - 中文页面 /resources/selection-support/fitting-replacement
      - 多语言页面 /en/resources/selection-support/fitting-replacement 等
   4. 后续 Q40 / Q60 / 硬管接头 / 倒刺接头 / 鲁尔接头扩展时继续复用
   5. 后续从 Excel / 后台 / 数据库导入时，也尽量保持同一套字段
========================================================= */

/* =========================================================
   多语言文本

   说明：
   1. 型号解析规则会服务中文、英文、西语、法语、韩语、俄语
   2. zh 为主语言
   3. 其他语言如果暂时没有，可以不填
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
   接头型号解析规则

   示例：
   Q2001-PMV-SPPE
   可以拆成：
   Q20 | 01 | P | M | V | S | PP | E

   注意：
   1. 同一个代码在不同位置可能含义不同
   2. 例如 S 在“公母端”里表示母端
   3. S 在“形状”里表示直通
   4. 所以必须通过 fieldKey / fieldName 来判断含义
   5. 不能只看代码本身
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
   接头替代查询产品数据

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
   首页界面文案

   说明：
   1. 用于接头替代查询首页
   2. 解决 Tab、最近搜索、产品替换表、产品卡片按钮等写死中文问题
   3. 由 q20.page.intl.ts 提供多语言内容
   4. 后续 Q40 / Q60 / 硬管 / 倒刺接头也可以复用这个结构
========================================================= */
export interface FittingReplacementHomeText {
  tabs: {
    replace: string;
    guide: string;
  };

  history: {
    label: string;
  };

  guide: {
    title: string;
    description: string;
    clearButton: string;
    resultTitle: string;
    emptyBeforeSelection: string;
    selectedResultTemplate: string;
    noMatchText: string;
  };

  productSection: {
    title: string;
    description: string;

    /*
      计数模板：
      中文示例：当前展示 {start}–{end} / 共 {total} 个型号
      英文示例：Showing {start}–{end} of {total} models
    */
    countTemplate: string;
  };

productCard: {
  productName: string;
  productCode: string;
  foreachModel: string;
  compatibleModels: string;
  viewDetail: string;
  addToCart: string;
  addedToCart: string;
}; 

  emptyResult: {
    title: string;
    description: string;
  };

  pagination: {
    previous: string;
    next: string;
  };
}

/* =========================================================
   页面完整数据

   说明：
   service 层会把这些数据交给组件使用
========================================================= */
export interface FittingReplacementPageData {
  banner: {
    eyebrow?: string;
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

  /* 首页界面多语言文案 */
  homeText?: FittingReplacementHomeText;
} 