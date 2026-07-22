/* =========================================================
   material-compatibility.types.ts
   恒永达官网｜材料兼容页面数据类型

   文件路径：
   data/resources/material-compatibility/material-compatibility.types.ts

   说明：
   1. 统一约束“材料兼容 / 材料特性 / 材质证明”页面的数据结构
   2. 后续中文数据、外语数据、service 数据服务、Client 展示组件都会引用这里
   3. 技术表格内容和界面文案分开管理
   4. 空白兼容性结果使用空字符串 ""，页面中不显示任何符号
========================================================= */

/* =========================================================
   页面 Tab 类型

   compatibility：材料兼容
   features：材料特性
   certification：材质证明
========================================================= */
export type MaterialCompatibilityTab =
  | "compatibility"
  | "features"
  | "certification";

/* =========================================================
   材料列类型

   说明：
   对应材料兼容性表头中的材料字段
========================================================= */
export type MaterialKey =
  | "PEEK"
  | "PPS"
  | "PSU"
  | "PTFE"
  | "ETFE"
  | "PVDF"
  | "PMMA"
  | "POM"
  | "PP";

/* =========================================================
   Banner 数据

   说明：
   1. Banner 高度在页面 CSS 中设置为 520px
   2. 中文页面可不显示 eyebrow / highlight
========================================================= */
export interface MaterialCompatibilityBannerData {
  eyebrow: string;
  title: string;
  highlight: string;
  description: string;
}

/* =========================================================
   顶部三按钮数据
========================================================= */
export interface MaterialCompatibilityTabItem {
  key: MaterialCompatibilityTab;
  label: string;
}

/* =========================================================
   搜索栏文案

   说明：
   搜索栏本身使用 ResourceSearchBar 组件。
========================================================= */
export interface MaterialCompatibilitySearchCopy {
  placeholder: string;
  quickKeywords: string[];
}

/* =========================================================
   材料兼容性表行数据

   name：化学介质名称
   values：各材料对应的兼容性结果

   结果说明：
   +    可耐 / Compatible
   (+)  勉强可耐 / Limited compatibility
   -    不耐 / Not recommended
   ""   原表为空白，页面不显示
========================================================= */
export interface CompatibilityRow {
  name: string;
  values: Record<MaterialKey, string>;
}

/* =========================================================
   材料特性表行数据
========================================================= */
export interface MaterialFeatureRow {
  code: string;
  name: string;
  feature: string;
  temperature: string;
  application: string;
}

/* =========================================================
   材质证明表行数据
========================================================= */
export interface CertificationRow {
  material: string;
  certs: string[];
}

/* =========================================================
   表格标题文案
========================================================= */
export interface MaterialCompatibilityTableCopy {
  title: string;
  description: string;
  note: string;
}

/* =========================================================
   材料特性表头文案
========================================================= */
export interface MaterialCompatibilityFeatureColumns {
  material: string;
  name: string;
  feature: string;
  temperature: string;
  application: string;
}

/* =========================================================
   底部支持 CTA 文案
========================================================= */
export interface MaterialCompatibilitySupportCtaCopy {
  kicker: string;
  title: string;
  description: string;
  buttonText: string;
}

/* =========================================================
   页面 UI 文案

   说明：
   1. 技术数据不放这里
   2. 这里专门放不同语言的界面文案
   3. 外语页面可以翻译这些标题、按钮、提示语
   4. 化学介质名称、材料名称、认证名称仍然可以统一英文技术数据
========================================================= */
export interface MaterialCompatibilityUiCopy {
  breadcrumbAriaLabel: string;
  breadcrumbHome: string;
  breadcrumbResources: string;
  breadcrumbCurrent: string;

  searchButtonText: string;
  recentLabel: string;
  noteLabel: string;

  tableCopy: Record<MaterialCompatibilityTab, MaterialCompatibilityTableCopy>;

  compatibilityTable: {
    chemicalMedium: string;
    emptyText: string;
  };

  featureTable: {
    columns: MaterialCompatibilityFeatureColumns;
    emptyText: string;
  };

  certificationTable: {
    emptyText: string;
  };

  supportCta: MaterialCompatibilitySupportCtaCopy;
}

/* =========================================================
   页面总数据结构

   说明：
   1. service 统一返回这个结构
   2. page.tsx 不直接关心具体数据怎么来
   3. Client 组件只负责展示和筛选
   4. ui 为可选字段，避免旧中文数据立即大改
========================================================= */
export interface MaterialCompatibilityPageData {
  banner: MaterialCompatibilityBannerData;
  tabs: MaterialCompatibilityTabItem[];
  materialColumns: MaterialKey[];
  searchCopy: Record<MaterialCompatibilityTab, MaterialCompatibilitySearchCopy>;
  compatibilityRows: CompatibilityRow[];
  materialFeatureRows: MaterialFeatureRow[];
  certificationColumns: string[];
  certificationRows: CertificationRow[];
  ui?: MaterialCompatibilityUiCopy;
} 