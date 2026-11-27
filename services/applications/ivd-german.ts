import type { Metadata } from 'next';
import { germanIvdDraftDocuments } from '@/lib/i18n/german-application-draft-paths';
import type { ApplicationDocument } from '@/data/applications/analytical-documents/types';
import { getApplicationIndexData } from '@/data/applications/application-index-locales';
import { reviewDomains } from '@/data/applications/english-review';
import { germanIvdUi, getGermanIvdText } from '@/data/applications/ivd-locales/de';
import { getIvdProductLinkImages, getIvdProductLinkImageScales } from '@/data/applications/ivd-locales/product-card-images';
import { ivdDocumentHref, localizeIvdHref } from '@/data/applications/ivd-locales/routes';
import { germanFittingDraftPathPattern } from '@/data/products/detail/german-fitting-draft-routes';
import { germanVideoCopy } from '@/data/resources/installation-guide/video-guide-copy.de';
import { germanEnglishFallbackSuffix, getGermanDraftLink } from '@/lib/i18n/draft-languages';
import { getCanonicalUrl } from '@/lib/seo/site-url';
import { getGermanRelatedArticles } from '@/services/resources/technical-articles/getGermanRelatedArticles';
import { getIvdBreadcrumbs, getIvdNavigation, getIvdQueryTargets, getLocalizedIvdDocument, getLocalizedIvdResources } from './ivd-localized';

export function getGermanIvdLink(href: string) {
  const source = localizeIvdHref(href, 'en').replace(/^\/de(?=\/|$)/, '/en');
  return getGermanDraftLink(source, germanFittingDraftPathPattern);
}

function englishLabel(label: string) {
  return label.endsWith(germanEnglishFallbackSuffix) ? label : label + germanEnglishFallbackSuffix;
}

function linkLabel(label: string, hrefLang?: 'de' | 'en') {
  return hrefLang === 'en' ? englishLabel(label) : label;
}

function localizeGermanIvdLinks<T>(value: T): T {
  if (Array.isArray(value)) return value.map(localizeGermanIvdLinks) as T;
  if (!value || typeof value !== 'object') return value;
  const item = Object.fromEntries(Object.entries(value).map(([key, child]) => [key, localizeGermanIvdLinks(child)]));
  if (typeof item.href === 'string') {
    const destination = getGermanIvdLink(item.href);
    item.href = destination.href;
    item.hrefLang = destination.hrefLang;
    if (typeof item.label === 'string') item.label = linkLabel(item.label, destination.hrefLang);
    else if (typeof item.title === 'string') item.title = linkLabel(item.title, destination.hrefLang);
    else if (typeof item.text === 'string' && destination.hrefLang === 'en') item.title = englishLabel(item.text);
  }
  return item as T;
}

function translateHub<T>(value: T): T {
  if (typeof value === 'string') return getGermanIvdText(value) as T;
  if (Array.isArray(value)) return value.map(translateHub) as T;
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([key, child]) => [key, translateHub(child)])) as T;
  }
  return value;
}

export async function getGermanIvdHub() {
  return translateHub(await getLocalizedIvdDocument('en'));
}

function germanIvdHref(slug: string) {
  return ivdDocumentHref('en', slug).replace(/^\/en\//, '/de/');
}

function localizedLinkMap<T>(map: Readonly<Record<string, T>>): Record<string, T> {
  return Object.fromEntries(Object.entries(map).map(([href, value]) => [getGermanIvdLink(href).href, value]));
}

const germanIvdNavigationLabels = new Map<string, string>(Object.values(germanIvdDraftDocuments).map(({ path, navLabel }) => ['/de' + path, navLabel]));

function navigationLink(item: { label: string; href: string }) {
  const { href, hrefLang } = getGermanIvdLink(item.href);
  const label = germanIvdNavigationLabels.get(href.split(/[?#]/, 1)[0]) ?? getGermanIvdText(item.label);
  return { label: linkLabel(label, hrefLang), href, hrefLang };
}

export async function getGermanIvdPresentation(document: ApplicationDocument) {
  const source = await getLocalizedIvdDocument('en', document.slug);
  const [navigation, breadcrumbs] = await Promise.all([getIvdNavigation('en', source), getIvdBreadcrumbs('en', source)]);
  const resources = getLocalizedIvdResources('en', source);
  return {
    article: localizeGermanIvdLinks(document),
    href: germanIvdHref(document.slug),
    ui: germanIvdUi,
    navigation: {
      overview: navigationLink(navigation.overview),
      groups: navigation.groups.map(group => {
        const overview = navigationLink(group.overview);
        return { ...group, label: overview.label, overview, children: group.children.map(navigationLink) };
      }),
    },
    breadcrumbs: breadcrumbs.map(item => item.href ? navigationLink({ label: item.label, href: item.href }) : { label: document.navLabel, href: undefined }),
    queryTargets: Object.fromEntries(Object.entries(getIvdQueryTargets('en')).map(([key, target]) => [
      key, { ...target, href: getGermanIvdLink(target.href).href },
    ])),
    productLinkCards: {
      imagesByHref: localizedLinkMap(getIvdProductLinkImages('en')),
      imageScalesByHref: localizedLinkMap(getIvdProductLinkImageScales('en')),
      viewDetails: germanIvdUi.productDetails,
    },
    resources: {
      ...resources,
      uiLocale: 'de' as const,
      videoLocale: 'de' as const,
      articles: getGermanRelatedArticles(resources.articles),
      products: resources.products.map(product => {
        const destination = getGermanIvdLink(product.href);
        const title = getGermanIvdText(product.title);
        return { ...product, title, imageAlt: title, href: destination.href, destinationLanguage: destination.hrefLang };
      }),
      videos: resources.videos.map(video => {
        const translated = germanVideoCopy[video.id];
        return {
          ...video,
          ...(translated ? { title: translated.title, description: translated.description } : {}),
          detailHref: video.detailHref ? getGermanIvdLink(video.detailHref).href : undefined,
        };
      }),
    },
  };
}

export function getGermanIvdMetadata(document: ApplicationDocument): Metadata {
  const canonical = getCanonicalUrl(germanIvdHref(document.slug));
  const image = { url: reviewDomains.ivd.image, width: 1920, height: 800, alt: getApplicationIndexData('de').copy.heroImageAlt };
  return {
    title: { absolute: document.seoTitle },
    description: document.description,
    keywords: [...document.keywords],
    robots: { index: false, follow: true },
    alternates: { canonical },
    openGraph: { title: document.seoTitle, description: document.description, type: 'website', siteName: 'FOREACH', url: canonical, locale: 'de_DE', images: [image] },
    twitter: { card: 'summary_large_image', title: document.seoTitle, description: document.description, images: [image] },
  };
}
