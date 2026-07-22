export type SiteSearchModule =
  | "products"
  | "compatible-models"
  | "datasheets";

export interface SiteSearchItem {
  id: string;
  module: SiteSearchModule;
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
