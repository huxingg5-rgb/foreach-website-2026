import type { LocaleCode } from '@/data/languages';
import { getLocalizedSiteHref } from '@/lib/seo/site-url';
import inkjetRoutes from './industrial-inkjet-routes.json';

export function getInkjetFiltrationHref(locale: LocaleCode) {
  return getLocalizedSiteHref(inkjetRoutes.inkFiltration, locale);
}
