import type { LocaleCode } from '@/lib/i18n';
import type { englishHomeProducts, productGroups } from './home-products.en';

export type HomeProductsLocale = Exclude<LocaleCode, 'zh-CN'>;
export type HomeProductGroup = (typeof productGroups)[number];
export type HomeProduct = (typeof englishHomeProducts)[number] & { imageAlt?: string };
export type HomeProductsCopy = {
  title: string;
  categoriesAriaLabel: string;
  productCenter: string;
  explore: string;
  discuss: string;
  conceptAlt: string;
  conceptLabel: string;
  resultCount: string;
  groups: Record<HomeProductGroup, string>;
  products: Record<string, { name: string; description: string; imageAlt?: string }>;
};
export type HomeProductsSectionData = {
  locale: HomeProductsLocale;
  copy: Omit<HomeProductsCopy, 'products' | 'groups'>;
  groups: { id: HomeProductGroup; label: string }[];
  products: HomeProduct[];
  productCenterHref: string;
};
