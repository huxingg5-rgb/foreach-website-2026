import { getIvdRelatedProductCardImage } from '@/data/applications/ivd-locales/product-card-images';
import { linkIvdProductMentions } from '@/data/applications/ivd-locales/product-links';
import { cache } from 'react';
import type { Metadata } from 'next';
import type { ApplicationBlock, ApplicationDocument } from '@/data/applications/analytical-documents/types';
import { getReviewHub, reviewDomains, getReviewQueryLinks } from '@/data/applications/english-review';
import { getReviewDocument } from './english-review';
import { getReviewFooterPlan, reviewProductCards } from '@/data/applications/english-review-resources';
import { getTechnicalArticlesPageData } from '@/services/resources/technical-articles/getTechnicalArticlesPageData';
import type { RelatedResourcesData } from '@/components/common/related-resources/related-resources.types';
import sourceStrings from '@/data/applications/ivd-locales/source-strings.json';
import { ivdLocales, ivdRoutes, ivdDocumentHref, localizeIvdHref, type IvdLocale } from '@/data/applications/ivd-locales/routes';
import { ivdUi, ivdProductLabel, localizeIvdKeyword } from '@/data/applications/ivd-locales/ui';
import { getIvdReadingPlan } from '@/data/applications/ivd-locales/reading';
import { getApplicationIndexData } from '@/data/applications/application-index-locales';
import { getCanonicalUrl } from '@/lib/seo/site-url';
import { refineEnglishApplicationCopy } from './english-localized';
import { withQuickDisconnectArticle } from "./quick-disconnect-resources";

const dictionaryLoaders = {
  en: () => import('@/data/applications/ivd-locales/en.json'),
  es: () => import('@/data/applications/ivd-locales/es.json'),
  fr: () => import('@/data/applications/ivd-locales/fr.json'),
  ko: () => import('@/data/applications/ivd-locales/ko.json'),
  ru: () => import('@/data/applications/ivd-locales/ru.json'),
};
const sourceIndex = new Map(sourceStrings.map((text, index) => [text, String(index)]));
const dictionaryCache = new Map<IvdLocale, Promise<Record<string, string>>>();
function dictionary(locale: IvdLocale) {
  if (!dictionaryCache.has(locale)) dictionaryCache.set(locale, dictionaryLoaders[locale]().then(data => data.default));
  return dictionaryCache.get(locale)!;
}
function translate<T>(value: T, copy: Record<string, string>, locale: IvdLocale): T {
  if (typeof value === 'string') {
    const id = sourceIndex.get(value);
    if (id !== undefined) {
      if (!copy[id]) throw new Error(`Missing IVD translation ${locale}:${id}`);
      return copy[id] as T;
    }
    if (/[\u3400-\u9fff]/u.test(value)) throw new Error(`Untranslated IVD source: ${value}`);
    return localizeIvdHref(value, locale) as T;
  }
  if (Array.isArray(value)) return value.map(item => translate(item, copy, locale)) as T;
  if (value && typeof value === 'object') return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, translate(item, copy, locale)])) as T;
  return value;
}
export const getLocalizedIvdDocument = cache(async (locale: IvdLocale, slug = ''): Promise<ApplicationDocument> => {
  if (locale !== 'en') {
    const { getLocalizedApplicationDocument } = await import('./international-localized');
    return getLocalizedApplicationDocument(locale, 'ivd', slug);
  }
  const original = slug ? await getReviewDocument('ivd', slug) : getReviewHub('ivd');
  if (!original) throw new Error(`Unknown IVD document ${slug}`);
  const localized = translate(original, await dictionary(locale), locale);
  const translated = locale === 'en' ? refineEnglishApplicationCopy(localized, 'ivd') : localized;
  const ui = ivdUi[locale];
  const articles = getTechnicalArticlesPageData(locale).articles;
  const reading = getIvdReadingPlan(original);
  const sections = translated.sections.map(sourceSection => {
    const section = { ...sourceSection, blocks: sourceSection.blocks.map(block => linkIvdProductMentions(block, locale)) };
    const slugs = reading.find(item => item.section === section.id)?.slugs ?? [];
    if (!slugs.length) return section;
    const items = slugs.map(articleSlug => {
      const article = articles.find(item => item.slug === articleSlug);
      if (!article) throw new Error(`Missing local IVD article ${locale}/${articleSlug}`);
      return { label: article.title, href: `/${locale}/resources/technical-articles/${articleSlug}/` };
    });
    return { ...section, blocks: [...section.blocks, { type: 'subheading', title: ui.reading } as ApplicationBlock, { type: 'links', items } as ApplicationBlock] };
  });
  return { ...translated, intro: translated.intro.map(block => linkIvdProductMentions(block, locale)), eyebrow: ui.guide, keywords: translated.keywords.map(keyword => localizeIvdKeyword(locale, keyword)), sections };
});

export async function getIvdNavigation(locale: IvdLocale, document: ApplicationDocument) {
  const current = ivdRoutes.find(route => route.slug === document.slug)!;
  const guidePath = current.path.split('/').slice(0, 5).join('/') + '/';
  const guideRoute = ivdRoutes.find(route => route.path === guidePath);
  const hub = document.slug === '';
  const root = hub ? ivdRoutes.find(route => route.slug === '')! : guideRoute!;
  const children = ivdRoutes.filter(route => route.path.startsWith(root.path) && route.path !== root.path && route.path.slice(root.path.length).split('/').filter(Boolean).length === 1);
  const link = async (slug: string) => ({ label: (await getLocalizedIvdDocument(locale, slug)).navLabel, href: ivdDocumentHref(locale, slug) });
  const groups = await Promise.all(children.map(async route => ({
    id: route.slug, label: (await link(route.slug)).label, overview: await link(route.slug),
    children: hub ? [] : await Promise.all(ivdRoutes.filter(child => child.path.startsWith(route.path) && child.path !== route.path).map(child => link(child.slug))),
  })));
  return { overview: hub ? { label: ivdUi[locale].overview, href: ivdDocumentHref(locale) } : await link(root.slug), groups };
}

export async function getIvdBreadcrumbs(locale: IvdLocale, document: ApplicationDocument) {
  const index = getApplicationIndexData(locale).copy;
  const path = ivdRoutes.find(route => route.slug === document.slug)!.path;
  const trail = ivdRoutes.filter(route => path.startsWith(route.path)).sort((a, b) => a.path.length - b.path.length);
  return [
    { label: index.breadcrumbHome, href: `/${locale}/` },
    { label: index.breadcrumbCurrent, href: `/${locale}/applications/` },
    ...await Promise.all(trail.map(async route => ({
      label: route.slug === '' ? ivdUi[locale].domain : (await getLocalizedIvdDocument(locale, route.slug)).navLabel,
      href: route.slug === document.slug ? undefined : ivdDocumentHref(locale, route.slug),
    }))),
  ];
}

export function getLocalizedIvdResources(locale: IvdLocale, document: ApplicationDocument): RelatedResourcesData {
  const plan = getReviewFooterPlan('ivd', document);
  const allArticles = getTechnicalArticlesPageData(locale).articles;
  const slugs = [...new Set(getIvdReadingPlan(document).flatMap(item => item.slugs))];
  return withQuickDisconnectArticle({
    locale, videos: [],
    products: plan.products.map(key => {
      const card = reviewProductCards[key];
      const title = ivdProductLabel(locale, key);
      return { id: `ivd-${key}`, title, href: localizeIvdHref(card.href, locale), imageSrc: getIvdRelatedProductCardImage(key), imageAlt: title };
    }),
    articles: slugs.slice(0, 4).map(slug => {
      const article = allArticles.find(item => item.slug === slug);
      if (!article) throw new Error(`Missing IVD related article ${locale}/${slug}`);
      return { id: article.id, slug, title: article.title, summary: article.summary, date: article.date, coverImage: article.coverImage };
    }),
  }, "ivd", document);
}
export function getIvdQueryTargets(locale: IvdLocale) {
  return Object.fromEntries(Object.entries(getReviewQueryLinks('ivd')).map(([key, target]) => [key, { ...target, href: localizeIvdHref(target.href, locale) }]));
}
export function getIvdMetadata(locale: IvdLocale, document: ApplicationDocument): Metadata {
  const languages = Object.fromEntries(ivdLocales.map(language => [language, getCanonicalUrl(ivdDocumentHref(language, document.slug))]));
  const image = { url: reviewDomains.ivd.image, width: 1920, height: 800, alt: getApplicationIndexData(locale).copy.heroImageAlt };
  return {
    title: document.seoTitle, description: document.description, keywords: [...document.keywords], robots: { index: true, follow: true },
    alternates: { canonical: languages[locale], languages: { ...languages, ...(!document.slug ? { 'zh-CN': getCanonicalUrl('/applications/ivd/') } : {}), 'x-default': languages.en } },
    openGraph: { title: document.seoTitle, description: document.description, type: 'website', siteName: 'FOREACH', url: languages[locale], locale: { en: 'en_US', es: 'es_ES', fr: 'fr_FR', ko: 'ko_KR', ru: 'ru_RU' }[locale], images: [image] },
    twitter: { card: 'summary_large_image', title: document.seoTitle, description: document.description, images: [image] },
  };
}
