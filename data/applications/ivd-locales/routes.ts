import { normalizeSiteHref } from '@/lib/seo/site-url';
import { applicationDocumentHref, applicationRoutes, resolveApplicationHref } from '@/data/applications/application-routes';

export const ivdLocales = ['en', 'es', 'fr', 'ko', 'ru'] as const;
export type IvdLocale = (typeof ivdLocales)[number];
export const ivdRoutes = applicationRoutes.filter(route => route.kind === 'ivd');
export function isIvdLocale(locale: string): locale is IvdLocale {
  return ivdLocales.includes(locale as IvdLocale);
}
export function ivdDocumentHref(locale: IvdLocale, slug = '') {
  return applicationDocumentHref('ivd', slug).replace(/^\/en\//, `/${locale}/`);
}
/** Content URLs are resolved before applying the locale, including legacy English aliases. */
export function localizeIvdHref(href: string, locale: IvdLocale): string {
  return normalizeSiteHref(resolveApplicationHref(href).replace(/^\/en(?=\/|$)/, `/${locale}`));
}
/** Preserve existing menu/query links while taking readers directly to the IVD article tree. */
export function resolveLocalizedIvdQuery(href: string): string {
  const match = href.match(/^\/(en|es|fr|ko|ru)\/applications\/ivd\/\?(.*)$/);
  if (!match) return href;
  const query = new URLSearchParams(match[2]);
  const topic = query.get('instrument') ?? query.get('application');
  if (!topic || !['clinical', 'immunoassay', 'hematology', 'coagulation', 'molecular'].includes(topic)) return href;
  const moduleId = query.get('module');
  // Module anchors are retained by the translated overview documents.
  return ivdDocumentHref(match[1] as IvdLocale, `guide-${topic}`) + (moduleId ? `#task-${moduleId}` : '');
}
