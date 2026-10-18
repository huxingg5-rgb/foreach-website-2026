import { applicationDocumentHref, applicationRoutes, resolveApplicationHref } from '../application-routes';
import type { EnglishApplicationKind } from '../application-english';
import { normalizeSiteHref } from '@/lib/seo/site-url';
import { getCanonicalUrl } from '@/lib/seo/site-url';

export const applicationTranslationLocales = ['es', 'fr', 'ko', 'ru'] as const;
export type ApplicationTranslationLocale = (typeof applicationTranslationLocales)[number];
export const applicationDocumentLocales = ['en', ...applicationTranslationLocales] as const;
export function isApplicationTranslationLocale(locale: string): locale is ApplicationTranslationLocale {
  return applicationTranslationLocales.includes(locale as ApplicationTranslationLocale);
}
export function localizedApplicationHref(locale: string, kind: EnglishApplicationKind, slug = '') {
  return applicationDocumentHref(kind, slug).replace(/^\/en\//, `/${locale}/`);
}
export function localizeApplicationHref(href: string, locale: string) {
  // These locales expose monitoring modules through the existing category
  // filter; only English has a standalone control-category landing page.
  if (isApplicationTranslationLocale(locale) && /^\/en\/products\/control\/?$/.test(href)) return `/${locale}/products/?category=control`;
  return normalizeSiteHref(resolveApplicationHref(href).replace(/^\/en(?=\/|$)/, `/${locale}`));
}
export function localizedApplicationAlternates(locale: string, kind: EnglishApplicationKind, slug = '') {
  const languages = Object.fromEntries(applicationDocumentLocales.map(language => [language, getCanonicalUrl(localizedApplicationHref(language, kind, slug))]));
  return { canonical: languages[locale], languages: { ...languages, ...(!slug ? { 'zh-CN': getCanonicalUrl(`/applications/${kind}/`) } : {}), 'x-default': languages.en } };
}
export function localizedApplicationStaticParams(kind: EnglishApplicationKind) {
  const base = `/en/applications/${kind}/`;
  return applicationDocumentLocales.flatMap(locale => applicationRoutes.filter(route => route.kind === kind && route.slug).map(route => ({
    locale, segments: route.path.slice(base.length, -1).split('/'),
  })));
}
