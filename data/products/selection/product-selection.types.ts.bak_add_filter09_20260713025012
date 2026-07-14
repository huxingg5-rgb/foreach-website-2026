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

export type LocalizedText =
  | string
  | {
      zh?: string;
      en?: string;
      es?: string;
      fr?: string;
      ko?: string;
      ru?: string;
      [key: string]: string | undefined;
    };

export type ProductSelectionProduct = {
  productId: string;

  categoryId?: string;
  category?: string;
  categorySlug?: string;
  categoryName?: string;
  categoryLabel?: string;

  productTypeId?: string;
  productType?: string;
  productTypeSlug?: string;
  productTypeName?: string;
  productTypeLabel?: string;

  seriesId?: string;
  series?: string;
  seriesSlug?: string;
  seriesName?: string;

  detailSlug?: string;
  routeSlug?: string;
  reservedConfigSlug?: string;
  slug?: string;

  href?: string;
  detailHref?: string;
  productDetailHref?: string;
  selectionHref?: string;

  model?: string;
  title?: any;
  name?: any;
  productName?: any;
  subtitle?: any;
  summary?: any;
  description?: any;
  code?: any;
  productCode?: any;

  cardTitle?: any;
  cardSubtitle?: any;
  cardDescription?: any;

  image?: string;
  imageCard?: string;
  cardImage?: string;
  imagePath?: string;
  imageUrl?: string;
  imageAlt?: any;

  status?: string;
  enabled?: boolean;
  visible?: boolean;
  sort?: number;
  sortOrder?: number;
  order?: number;
  level?: number;
  parentId?: string;
  id?: string;

  filter01?: string;
  filter02?: string;
  filter03?: string;
  filter04?: string;
  filter05?: string;
  filter06?: string;
  filterKey?: string;
  inputType?: string;
  label?: any;

  filters?: Record<string, string | number | boolean | null | undefined>;

  searchKeywords?: any;

  tags?: string[];
  badges?: string[];
  specs?: any[];

  source?: string;
  sourceType?: string;

  needDrawing?: boolean;
  needModel3d?: boolean;

  flowRate?: string;
  pressure?: string;
  motorType?: string;
  serviceLife?: string;

  content?: Record<string, any>;

  [key: string]: any;
};

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
