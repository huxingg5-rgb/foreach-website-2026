import type { Metadata } from 'next';
import type { RelatedResourcesData } from '@/components/common/related-resources/related-resources.types';
import type { ApplicationDocument } from '@/data/applications/analytical-documents/types';
import { resolveApplicationHref } from '@/data/applications/application-routes';
import { getDraftHrefForEnglish, getHindiDraftLink, hindiEnglishFallbackSuffix } from '@/lib/i18n/draft-languages';
import { getCanonicalUrl } from '@/lib/seo/site-url';
import { getEnglishApplicationSchema } from './english-localized';

export type HindiApplicationCopy = Readonly<Record<string, string>>;

const textFields = new Set([
  'title', 'navLabel', 'seoTitle', 'description', 'eyebrow', 'label', 'text',
  'caption', 'note', 'tocLabel', 'viewDetails', 'alt', 'highlight', 'headers',
  'nodes', 'keywords', 'items', 'rows', 'buttonLabel', 'imageAlt', 'summary',
  'absolute', 'resourceLabel', 'contactDescription',
]);

export function hindiApplicationLink(href: string) {
  return getHindiDraftLink(resolveApplicationHref(href));
}

export function getHindiApplicationTranslation(copy: HindiApplicationCopy, key: string, slug: string) {
  if (!key.trim()) return key;
  const translated = copy[key];
  if (translated) return translated;
  throw new Error('Missing Hindi application translation in ' + slug + ': ' + key);
}

export function translateHindiApplication<T>(
  value: T,
  translate: (text: string) => string,
  draftLink = hindiApplicationLink,
  field = '',
): T {
  if (field === 'references') return value;
  if (typeof value === 'string') {
    return value.trim() && textFields.has(field) ? translate(value) as T : value;
  }
  if (Array.isArray(value)) return value.map(item => translateHindiApplication(item, translate, draftLink, field)) as T;
  if (!value || typeof value !== 'object') return value;
  const item = Object.fromEntries(Object.entries(value).map(([key, child]) => [
    key, translateHindiApplication(child, translate, draftLink, key),
  ]));
  if (typeof item.href !== 'string') return item as T;
  const destination = draftLink(item.href);
  item.href = destination.href;
  if (destination.hrefLang) item.hrefLang = destination.hrefLang;
  if (destination.hrefLang === 'en') {
    if (typeof item.text === 'string') item.title = (item.title || item.text) + hindiEnglishFallbackSuffix;
    else if (typeof item.label === 'string') item.label += hindiEnglishFallbackSuffix;
    else if (typeof item.buttonLabel === 'string') item.buttonLabel += hindiEnglishFallbackSuffix;
  }
  return item as T;
}

export function localizeHindiApplication(
  source: ApplicationDocument,
  translate: (text: string) => string,
  draftLink = hindiApplicationLink,
): ApplicationDocument {
  return {
    ...translateHindiApplication(source, translate, draftLink),
    references: source.references.map(reference => {
      if (!reference.href.startsWith('/en/')) return reference;
      const target = draftLink(reference.href);
      return {
        ...reference,
        ...target,
        title: translate(reference.title) + (target.hrefLang === 'en' ? hindiEnglishFallbackSuffix : ''),
      };
    }),
  };
}

export function hindiApplicationMetadata(source: Metadata, copy: HindiApplicationCopy, englishHref: string): Metadata {
  const localized = translateHindiApplication(source, title => getHindiApplicationTranslation(copy, title, englishHref));
  const canonical = getCanonicalUrl(getDraftHrefForEnglish(englishHref, 'hi'));
  return {
    ...localized,
    robots: { index: false, follow: true },
    alternates: { canonical },
    openGraph: localized.openGraph ? { ...localized.openGraph, url: canonical, locale: 'hi_IN' } : undefined,
  };
}

export function getHindiApplicationSchema(
  document: ApplicationDocument,
  href: string,
  breadcrumbs: readonly { label: string; href?: string }[],
) {
  const schema = getEnglishApplicationSchema(document, href, breadcrumbs);
  return {
    ...schema,
    '@graph': schema['@graph'].map((entry, index) => index === 0 ? { ...entry, inLanguage: 'hi-IN' } : entry),
  };
}

export function getHindiApplicationResources(
  resources: RelatedResourcesData,
  translate: (text: string) => string,
  draftLink = hindiApplicationLink,
): RelatedResourcesData {
  return {
    ...resources,
    uiLocale: 'hi',
    videoLocale: 'hi',
    videoLibraryHref: draftLink('/en/resources/installation-guide/').href,
    products: resources.products.map(product => {
      const target = draftLink(product.href);
      return {
        ...product, title: translate(product.title), imageAlt: translate(product.imageAlt),
        href: target.href, destinationLanguage: target.hrefLang,
      };
    }),
    articles: resources.articles.map(article => {
      const target = draftLink(article.href ?? '/en/resources/technical-articles/' + article.slug + '/');
      return {
        ...article,
        title: translate(article.title),
        summary: translate(article.summary),
        href: target.href,
        destinationLanguage: target.hrefLang,
        contentLanguage: 'hi',
      };
    }),
    videos: resources.videos.map(guide => ({
      ...guide,
      title: translate(guide.title),
      description: translate(guide.description),
      tags: guide.tags.map(translate),
      detailHref: guide.detailHref ? draftLink(guide.detailHref).href : undefined,
    })),
  };
}

export const hindiApplicationLabels = {
  onThisPage: 'इस पृष्ठ पर',
  references: 'संदर्भ',
  viewReferences: 'संदर्भ देखें',
  related: 'संबंधित मार्गदर्शिकाएँ',
  sources: 'स्रोत',
  reference: 'संदर्भ',
};
