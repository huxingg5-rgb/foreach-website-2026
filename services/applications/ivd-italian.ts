import type { Metadata } from 'next';
import type { ApplicationDocument } from '@/data/applications/analytical-documents/types';
import { getApplicationIndexData } from '@/data/applications/application-index-locales';
import { reviewDomains } from '@/data/applications/english-review';
import { addClinicalDegassingReview } from '@/data/applications/english-locales/degassing-review';
import { addEnglishTaskParagraphLinks } from '@/data/applications/english-locales/task-contextual-links';
import { getIvdProductLinkImages, getIvdProductLinkImageScales } from '@/data/applications/ivd-locales/product-card-images';
import { ivdDocumentHref, localizeIvdHref } from '@/data/applications/ivd-locales/routes';
import { italianIvdArticleDescriptions, italianIvdExtraLabels, italianIvdRelatedTitles, italianIvdUi, italianIvdVideoCopy } from '@/data/applications/ivd-locales/it';
import { getRelatedResourcesText } from '@/data/resources/related-resources/related-resources.intl';
import { getItalianDraftLink, isLocalizedItalianDraftPath, italianEnglishFallbackSuffix } from '@/lib/i18n/draft-languages';
import { getCanonicalUrl } from '@/lib/seo/site-url';
import { getIvdBreadcrumbs, getIvdNavigation, getIvdQueryTargets, getLocalizedIvdDocument, getLocalizedIvdResources } from './ivd-localized';

const dictionaryLoaders: Readonly<Record<string, (() => Promise<{ default: Readonly<Record<string, string>> }>) | undefined>> = {
  '': () => import('@/data/applications/ivd-locales/it/ivd-hub.json'),
  'guide-clinical': () => import('@/data/applications/ivd-locales/it/guide-clinical.json'),
  'molecular-switching': () => import('@/data/applications/ivd-locales/it/molecular-switching.json'),
  'molecular-fluidic-valves': () => import('@/data/applications/ivd-locales/it/molecular-fluidic-valves.json'),
  'molecular-fluidic-connections': () => import('@/data/applications/ivd-locales/it/molecular-fluidic-connections.json'),
  'molecular-fluid-monitoring': () => import('@/data/applications/ivd-locales/it/molecular-fluid-monitoring.json'),
  'molecular-wash': () => import('@/data/applications/ivd-locales/it/molecular-wash.json'),
  'molecular-lysis': () => import('@/data/applications/ivd-locales/it/molecular-lysis.json'),
  'molecular-pipetting-pumps': () => import('@/data/applications/ivd-locales/it/molecular-pipetting-pumps.json'),
  'molecular-syringe-pumps': () => import('@/data/applications/ivd-locales/it/molecular-syringe-pumps.json'),
  'molecular-diaphragm-pumps': () => import('@/data/applications/ivd-locales/it/molecular-diaphragm-pumps.json'),
  'coagulation-switching': () => import('@/data/applications/ivd-locales/it/coagulation-switching.json'),
  'coagulation-fluidic-valves': () => import('@/data/applications/ivd-locales/it/coagulation-fluidic-valves.json'),
  'coagulation-fluidic-connections': () => import('@/data/applications/ivd-locales/it/coagulation-fluidic-connections.json'),
  'coagulation-fluid-monitoring': () => import('@/data/applications/ivd-locales/it/coagulation-fluid-monitoring.json'),
  'coagulation-sample': () => import('@/data/applications/ivd-locales/it/coagulation-sample.json'),
  'coagulation-reagent': () => import('@/data/applications/ivd-locales/it/coagulation-reagent.json'),
  'coagulation-cleaning': () => import('@/data/applications/ivd-locales/it/coagulation-cleaning.json'),
  'coagulation-probes': () => import('@/data/applications/ivd-locales/it/coagulation-probes.json'),
  'coagulation-syringe-pumps': () => import('@/data/applications/ivd-locales/it/coagulation-syringe-pumps.json'),
  'coagulation-piston-pumps': () => import('@/data/applications/ivd-locales/it/coagulation-piston-pumps.json'),
  'coagulation-diaphragm-pumps': () => import('@/data/applications/ivd-locales/it/coagulation-diaphragm-pumps.json'),
  'hematology-fluidic-valves': () => import('@/data/applications/ivd-locales/it/hematology-fluidic-valves.json'),
  'hematology-channel': () => import('@/data/applications/ivd-locales/it/hematology-channel.json'),
  'hematology-fluidic-connections': () => import('@/data/applications/ivd-locales/it/hematology-fluidic-connections.json'),
  'hematology-fluid-monitoring': () => import('@/data/applications/ivd-locales/it/hematology-fluid-monitoring.json'),
  'hematology-sample': () => import('@/data/applications/ivd-locales/it/hematology-sample.json'),
  'hematology-dilution': () => import('@/data/applications/ivd-locales/it/hematology-dilution.json'),
  'hematology-cleaning': () => import('@/data/applications/ivd-locales/it/hematology-cleaning.json'),
  'hematology-probes': () => import('@/data/applications/ivd-locales/it/hematology-probes.json'),
  'hematology-syringe-pumps': () => import('@/data/applications/ivd-locales/it/hematology-syringe-pumps.json'),
  'hematology-piston-pumps': () => import('@/data/applications/ivd-locales/it/hematology-piston-pumps.json'),
  'hematology-diaphragm-pumps': () => import('@/data/applications/ivd-locales/it/hematology-diaphragm-pumps.json'),
  'immunoassay-reagent': () => import('@/data/applications/ivd-locales/it/immunoassay-reagent.json'),
  'immunoassay-sample': () => import('@/data/applications/ivd-locales/it/immunoassay-sample.json'),
  'immunoassay-switching': () => import('@/data/applications/ivd-locales/it/immunoassay-switching.json'),
  'immunoassay-fluidic-valves': () => import('@/data/applications/ivd-locales/it/immunoassay-fluidic-valves.json'),
  'immunoassay-fluidic-connections': () => import('@/data/applications/ivd-locales/it/immunoassay-fluidic-connections.json'),
  'immunoassay-fluid-monitoring': () => import('@/data/applications/ivd-locales/it/immunoassay-fluid-monitoring.json'),
  'immunoassay-probes': () => import('@/data/applications/ivd-locales/it/immunoassay-probes.json'),
  'immunoassay-syringe-pumps': () => import('@/data/applications/ivd-locales/it/immunoassay-syringe-pumps.json'),
  'immunoassay-piston-pumps': () => import('@/data/applications/ivd-locales/it/immunoassay-piston-pumps.json'),
  'immunoassay-bead-wash': () => import('@/data/applications/ivd-locales/it/immunoassay-bead-wash.json'),
  'immunoassay-diaphragm-pumps': () => import('@/data/applications/ivd-locales/it/immunoassay-diaphragm-pumps.json'),
  'piston-sample-transfer': () => import('@/data/applications/ivd-locales/it/piston-sample-transfer.json'),
  'piston-reagent-dispensing': () => import('@/data/applications/ivd-locales/it/piston-reagent-dispensing.json'),
  'clinical-syringe-pumps': () => import('@/data/applications/ivd-locales/it/clinical-syringe-pumps.json'),
  'clinical-probes': () => import('@/data/applications/ivd-locales/it/clinical-probes.json'),
  'clinical-piston-pumps': () => import('@/data/applications/ivd-locales/it/clinical-piston-pumps.json'),
  'clinical-switching': () => import('@/data/applications/ivd-locales/it/clinical-switching.json'),
  'clinical-fluidic-valves': () => import('@/data/applications/ivd-locales/it/clinical-fluidic-valves.json'),
  'clinical-fluidic-connections': () => import('@/data/applications/ivd-locales/it/clinical-fluidic-connections.json'),
  'clinical-fluid-monitoring': () => import('@/data/applications/ivd-locales/it/clinical-fluid-monitoring.json'),
  'clinical-cleaning': () => import('@/data/applications/ivd-locales/it/clinical-cleaning.json'),
  'clinical-diaphragm-pumps': () => import('@/data/applications/ivd-locales/it/clinical-diaphragm-pumps.json'),
  'guide-molecular': () => import('@/data/applications/ivd-locales/it/guide-molecular.json'),
  'guide-coagulation': () => import('@/data/applications/ivd-locales/it/guide-coagulation.json'),
  'guide-hematology': () => import('@/data/applications/ivd-locales/it/guide-hematology.json'),
  'guide-immunoassay': () => import('@/data/applications/ivd-locales/it/guide-immunoassay.json'),
};

export function italianIvdHref(slug = '') {
  return ivdDocumentHref('en', slug).replace(/^\/en\//, '/it/');
}

export function getItalianIvdStaticParams() {
  return Object.keys(dictionaryLoaders)
    .filter(slug => slug && isLocalizedItalianDraftPath(italianIvdHref(slug)))
    .map(slug => ({ locale: 'it', segments: italianIvdHref(slug).split('/').filter(Boolean).slice(3) }));
}

export function hasItalianIvdDocument(slug = '') {
  return Boolean(dictionaryLoaders[slug]) && isLocalizedItalianDraftPath(italianIvdHref(slug));
}

const textFields = new Set([
  'title', 'navLabel', 'seoTitle', 'description', 'eyebrow', 'label', 'text',
  'caption', 'note', 'tocLabel', 'viewDetails', 'alt', 'highlight',
  'headers', 'nodes', 'keywords', 'items', 'rows',
]);

function draftLink(href: string) {
  return getItalianDraftLink(localizeIvdHref(href, 'en'));
}

function localizeDocument<T>(value: T, copy: Readonly<Record<string, string>>, slug: string, field = ''): T {
  if (field === 'references') return value;
  if (typeof value === 'string') {
    if (!value.trim() || !textFields.has(field)) return value;
    const translated = copy[value];
    if (!translated) throw new Error('Missing Italian IVD translation in ' + (slug || 'hub') + ': ' + value);
    return translated as T;
  }
  if (Array.isArray(value)) return value.map(item => localizeDocument(item, copy, slug, field)) as T;
  if (!value || typeof value !== 'object') return value;
  const item = Object.fromEntries(Object.entries(value).map(([key, child]) => [key, localizeDocument(child, copy, slug, key)]));
  if (typeof item.href !== 'string') return item as T;
  const destination = draftLink(item.href);
  item.href = destination.href;
  if (destination.hrefLang) item.hrefLang = destination.hrefLang;
  if (destination.hrefLang === 'en') {
    if (typeof item.text === 'string') item.title = (item.title || item.text) + italianEnglishFallbackSuffix;
    else if (typeof item.label === 'string') item.label += italianEnglishFallbackSuffix;
  }
  return item as T;
}

async function loadCopy(slug: string) {
  const load = dictionaryLoaders[slug];
  if (!load) throw new Error('No reviewed Italian IVD copy: ' + slug);
  return (await load()).default;
}

export async function getItalianIvdDocument(slug = '') {
  const [english, copy] = await Promise.all([getLocalizedIvdDocument('en', slug), loadCopy(slug)]);
  const document = localizeDocument(addEnglishTaskParagraphLinks(addClinicalDegassingReview(english), 'ivd'), copy, slug);
  return {
    ...document,
    references: document.references.map(reference => {
      if (!reference.href.startsWith('/en/')) {
        const title = italianIvdExtraLabels[reference.title];
        return title ? { ...reference, title } : reference;
      }
      const target = draftLink(reference.href);
      const title = copy[reference.title] ?? italianIvdExtraLabels[reference.title] ?? reference.title;
      return {
        ...reference,
        href: target.href,
        hrefLang: target.hrefLang,
        title: title + (target.hrefLang === 'en' ? italianEnglishFallbackSuffix : ''),
      };
    }),
  };
}

export async function getItalianIvdPresentation(document: ApplicationDocument) {
  const guideSlug = italianIvdHref(document.slug).split('/').filter(Boolean)[3] ?? '';
  const [source, currentCopy, hubCopy, guideCopy] = await Promise.all([
    getLocalizedIvdDocument('en', document.slug), loadCopy(document.slug), loadCopy(''), loadCopy(guideSlug),
  ]);
  const [navigation, breadcrumbs] = await Promise.all([getIvdNavigation('en', source), getIvdBreadcrumbs('en', source)]);
  const copyLabel = (label: string) => currentCopy[label] ?? guideCopy[label] ?? hubCopy[label] ?? italianIvdExtraLabels[label] ?? italianIvdRelatedTitles[label] ?? label;
  const navigationLink = (item: { label: string; href: string }) => {
    const target = draftLink(item.href);
    return { label: copyLabel(item.label) + (target.hrefLang === 'en' ? italianEnglishFallbackSuffix : ''), href: target.href, hrefLang: target.hrefLang };
  };
  const remap = <T,>(map: Readonly<Record<string, T>>) => Object.fromEntries(Object.entries(map).map(([href, item]) => [draftLink(href).href, item]));
  const resources = getLocalizedIvdResources('en', source);
  const videoLibraryHref = draftLink('/en/resources/installation-guide/').href;
  return {
    article: document,
    href: italianIvdHref(document.slug),
    ui: italianIvdUi,
    navigation: {
      overview: navigationLink(navigation.overview),
      groups: navigation.groups.map(group => {
        const overview = navigationLink(group.overview);
        return { ...group, label: overview.label, overview, children: group.children.map(navigationLink) };
      }),
    },
    breadcrumbs: breadcrumbs.map(item => item.href ? navigationLink({ ...item, href: item.href }) : { label: document.navLabel, href: undefined }),
    queryTargets: Object.fromEntries(Object.entries(getIvdQueryTargets('en')).map(([key, target]) => [
      key, { ...target, href: draftLink(target.href).href },
    ])),
    productLinkCards: {
      imagesByHref: remap(getIvdProductLinkImages('en')),
      imageScalesByHref: remap(getIvdProductLinkImageScales('en')),
      viewDetails: getRelatedResourcesText('it').viewDetails,
    },
    resources: {
      ...resources,
      uiLocale: 'it' as const,
      videoLocale: 'it' as const,
      videoLibraryHref,
      products: resources.products.map(product => {
        const target = draftLink(product.href);
        const title = copyLabel(product.title);
        return { ...product, title, imageAlt: title, href: target.href, destinationLanguage: target.hrefLang };
      }),
      articles: resources.articles.map(article => {
        const target = draftLink('/en/resources/technical-articles/' + article.slug + '/');
        return {
          ...article,
          title: copyLabel(article.title),
          summary: italianIvdArticleDescriptions[article.summary] ?? article.summary,
          href: target.href,
          destinationLanguage: target.hrefLang,
          contentLanguage: 'it' as const,
        };
      }),
      videos: resources.videos.map(guide => ({
        ...guide,
        ...italianIvdVideoCopy[guide.id],
        detailHref: guide.detailHref ? draftLink(guide.detailHref).href : undefined,
      })),
    },
  };
}

export function getItalianIvdMetadata(document: ApplicationDocument): Metadata {
  const canonical = getCanonicalUrl(italianIvdHref(document.slug));
  const image = { url: reviewDomains.ivd.image, width: 1920, height: 800, alt: getApplicationIndexData('it').copy.heroImageAlt };
  return {
    title: { absolute: document.seoTitle },
    description: document.description,
    keywords: [...document.keywords],
    robots: { index: false, follow: true },
    alternates: { canonical },
    openGraph: { title: document.seoTitle, description: document.description, type: 'website', siteName: 'FOREACH', url: canonical, locale: 'it_IT', images: [image] },
    twitter: { card: 'summary_large_image', title: document.seoTitle, description: document.description, images: [image] },
  };
}
