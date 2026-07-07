/* =========================================================
   product-selection.types.ts
   产品中心｜选型页数据类型

   说明：
   1. 本文件由脚本生成 / 维护
   2. 产品中心选型页统一使用 filter01 ~ filter08
   3. 前端显示名称由 selection_filter_labels 控制
========================================================= */

export type SelectionLocale = "zh" | "en" | "es" | "fr" | "ko" | "ru";

export type SelectionI18nText = Record<SelectionLocale, string>;

export type SelectionStatus = "active" | "draft" | "hidden";

export type SelectionInputType = "single" | "multiple";

export type SelectionFilterKey =
  | "filter01"
  | "filter02"
  | "filter03"
  | "filter04"
  | "filter05"
  | "filter06"
  | "filter07"
  | "filter08";

export interface ProductSelectionProduct {
  productId: string;
  categoryId: string;
  productTypeId: string;
  seriesId: string;
  cardTitle: {
    zh: string;
    en: string;
  };
  cardSubtitle: {
    zh: string;
    en: string;
  };
  filters: Partial<Record<SelectionFilterKey, string>>;
  imageCard: string;
  detailSlug: string;
  status: SelectionStatus;
  sortOrder: number;
  searchKeywords: {
    zh: string;
    en: string;
  };
}

export interface ProductSelectionFilterLabel {
  categoryId: string;
  productTypeId: string;
  filterKey: SelectionFilterKey;
  label: SelectionI18nText;
  inputType: SelectionInputType;
  sortOrder: number;
  visible: boolean;
}

export interface ProductSelectionTaxonomyItem {
  type: string;
  id: string;
  label: SelectionI18nText;
  sortOrder: number;
}

/* =========================================================
   临时兼容旧产品选型数据文件

   后续旧 data / services 清理完成后，可删除这些宽松类型。
========================================================= */

export type ProductSelectionCategory = Record<string, any>;
export type ProductSelectionPageData = Record<string, any>;
export type ProductSelectionLocale = SelectionLocale;
