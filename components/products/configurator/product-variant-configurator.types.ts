export type ProductConfiguratorValue =
  | string
  | number;

export type ProductConfiguratorLocale =
  | "zh"
  | "en"
  | "es"
  | "fr"
  | "ko"
  | "ru";

export type ProductConfiguratorSelection =
  Record<string, ProductConfiguratorValue>;

export type ProductConfiguratorDimension = {
  key: string;
  label: string;
  unit?: string;
  precision?: number;
  columns?: 1 | 2 | 3 | 4;
  order?: ProductConfiguratorValue[];
};

export type ProductConfiguratorVariant = {
  id: string;
  model: string;
  productCode: string;
  attributes: ProductConfiguratorSelection;
  result?: Record<
    string,
    ProductConfiguratorValue
  >;
};

export type ProductConfiguratorFixedRow = {
  label: string;
  value: string;
};

export type ProductConfiguratorResultRow = {
  key: string;
  label: string;
  unit?: string;
  precision?: number;
};

export type ProductConfiguratorUiText = {
  closeAriaLabel: string;
  currentSelection: string;
  finalModel: string;
  productCode: string;
  configuration: string;
  selectionHint: string;
  matchedModel: string;
  noMatchedModel: string;
  copyModel: string;
  copied: string;
  addToList: string;
  addedToList: string;
  confirmAndReturn: string;
  defaultNoticeTitle: string;
  defaultNotice: string;
};

export type ProductConfiguratorConfig = {
  id: string;
  title: string;
  description?: string;
  productName: string;
  showProductNameInSelection?: boolean;

  /*
   * true：首次打开时不默认选中任何规格。
   */
  emptyInitialSelection?: boolean;

  /*
   * false：必须由用户逐项选择，
   * 不自动补齐后续规格。
   */
  autoSelectFollowingDimensions?: boolean;

  /*
   * 未选择任何规格时显示的文字。
   */
  emptySelectionText?: string;
  uiText?: Partial<ProductConfiguratorUiText>;

  /*
   * 相同筛选条件匹配多个型号时，
   * 显示具体型号选择区域。
   */
  variantChoiceLabel?: string;
  variantChoiceHint?: string;

  dimensions: ProductConfiguratorDimension[];
  variants: ProductConfiguratorVariant[];
  defaultVariantId?: string;
  fixedSummaryRows?: ProductConfiguratorFixedRow[];
  resultSummaryRows?: ProductConfiguratorResultRow[];
  noticeTitle?: string;
  notice?: string;
};

export type ProductVariantConfiguratorProps = {
  open: boolean;
  config: ProductConfiguratorConfig;
  locale?: ProductConfiguratorLocale;
  value?: ProductConfiguratorVariant | null;
  onClose: () => void;
  onConfirm: (
    variant: ProductConfiguratorVariant
  ) => void;

  /*
   * 判断某个具体型号是否已经加入清单。
   * 每个商品编码独立判断。
   */
  isVariantSelected?: (
    variant: ProductConfiguratorVariant
  ) => boolean;

  /*
   * 添加或移除当前匹配型号。
   * 执行后不关闭选型弹窗。
   */
  onToggleVariant?: (
    variant: ProductConfiguratorVariant
  ) => void;
};
