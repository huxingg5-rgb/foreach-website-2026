import type { LocaleCode } from '@/data/languages';
import { getEnabledLocaleCodes } from '@/data/languages';
import { getLocalizedSiteHref } from '@/lib/seo/site-url';
import { getInkjetFiltrationPage } from './industrial-inkjet-filtration';
import { inkjetChildPagesZh, inkjetOverviewPageZh, type InkjetApplicationPage } from './industrial-inkjet-printing.zh';
import type { InkjetLocale, InkjetRouteKey } from './inkjet-guide-navigation';
import routes from './industrial-inkjet-routes.json';
import en from './inkjet-guide-locales/en.json';
import es from './inkjet-guide-locales/es.json';
import fr from './inkjet-guide-locales/fr.json';
import ko from './inkjet-guide-locales/ko.json';
import ru from './inkjet-guide-locales/ru.json';

const translations: Record<InkjetLocale, Record<string, string>> = { en, es, fr, ko, ru };
export const inkjetLocales = getEnabledLocaleCodes().filter((locale): locale is InkjetLocale => locale !== 'zh-CN');
export const inkjetRouteKeys = Object.keys(routes) as InkjetRouteKey[];
const templates = new Map([inkjetOverviewPageZh, ...inkjetChildPagesZh].map(page => [page.href, page]));

export function isInkjetLocale(value: string): value is InkjetLocale {
  return inkjetLocales.some(locale => locale === value);
}

export function getInkjetRouteKey(href: string) {
  const english = getLocalizedSiteHref(href, 'en');
  return inkjetRouteKeys.find(key => routes[key] === english);
}

export function getInkjetPageHref(locale: LocaleCode, key: InkjetRouteKey) {
  return getLocalizedSiteHref(routes[key], locale);
}

function translate<T>(value: T, locale: InkjetLocale): T {
  if (typeof value === 'string') {
    // The SV10 installation video is English-only. Its translated family pages cover port and valve configurations.
    if (locale !== 'en' && value === '/en/resources/installation-guide/sv10-solenoid-valve-overview/') {
      return getLocalizedSiteHref('/products/valves/solenoid-valves/', locale) as T;
    }
    if (value.startsWith('/en/')) return getLocalizedSiteHref(value, locale) as T;
    if (!/[\u3400-\u9fff]/u.test(value)) return value;
    const text = translations[locale][value];
    if (!text) throw new Error(`Missing inkjet translation for ${locale}: ${value}`);
    return text as T;
  }
  if (Array.isArray(value)) return value.map(item => translate(item, locale)) as T;
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, translate(item, locale)])) as T;
  }
  return value;
}

export function getLocalizedInkjetPage(locale: InkjetLocale, key: InkjetRouteKey): InkjetApplicationPage {
  if (key === 'inkFiltration') return getInkjetFiltrationPage(locale);
  const source = templates.get(routes[key]);
  if (!source) throw new Error(`Missing industrial inkjet page: ${key}`);
  const page = translate({ ...source, document: { ...source.document, seoTitle: '' } }, locale);
  page.document.seoTitle = page.document.title + ' | FOREACH';
  return { ...page, contentLocale: locale };
}
