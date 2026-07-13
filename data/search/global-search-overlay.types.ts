export type GlobalSearchModule =
  | "products"
  | "compatible-models"
  | "datasheets"
  | "installation-guides"
  | "technical-articles"
  | "material-compatibility"
  | "applications"
  | "news"
  | "pages";

export interface GlobalSearchItem {
  id: string;
  module: GlobalSearchModule;
  title: string;
  subtitle?: string;
  description?: string;
  href: string;
  image?: string;
  keywords: string[];
  model?: string;
  productCode?: string;
  actionLabel?: string;
}
