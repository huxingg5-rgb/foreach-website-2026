export type ProductConfiguratorValue =
  | string
  | number;

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

export type ProductConfiguratorConfig = {
  id: string;
  title: string;
  description?: string;
  productName: string;
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
  value?: ProductConfiguratorVariant | null;
  onClose: () => void;
  onConfirm: (
    variant: ProductConfiguratorVariant
  ) => void;
};