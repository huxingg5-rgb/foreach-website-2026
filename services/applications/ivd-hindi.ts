import type { Metadata } from 'next';
import type { ApplicationDocument } from '@/data/applications/analytical-documents/types';
import { getApplicationIndexData } from '@/data/applications/application-index-locales';
import { reviewDomains } from '@/data/applications/english-review';
import { addClinicalDegassingReview } from '@/data/applications/english-locales/degassing-review';
import { addEnglishTaskParagraphLinks } from '@/data/applications/english-locales/task-contextual-links';
import { getIvdProductLinkImages, getIvdProductLinkImageScales } from '@/data/applications/ivd-locales/product-card-images';
import { ivdDocumentHref, localizeIvdHref } from '@/data/applications/ivd-locales/routes';
import { hindiIvdUi } from '@/data/applications/ivd-locales/hi';
import { getRelatedResourcesText } from '@/data/resources/related-resources/related-resources.intl';
import { getHindiDraftLink, hindiEnglishFallbackSuffix, isLocalizedHindiDraftPath } from '@/lib/i18n/draft-languages';
import { getCanonicalUrl } from '@/lib/seo/site-url';
import { getIvdBreadcrumbs, getIvdNavigation, getIvdQueryTargets, getLocalizedIvdDocument, getLocalizedIvdResources } from './ivd-localized';
import { getHindiApplicationResources, localizeHindiApplication, type HindiApplicationCopy } from './hindi-application';

const dictionaryLoaders: Readonly<Record<string, (() => Promise<{ default: HindiApplicationCopy }>) | undefined>> = {
  '': () => import('@/data/applications/ivd-locales/hi/ivd-hub.json'),
  'guide-clinical': () => import('@/data/applications/ivd-locales/hi/guide-clinical.json'),
  'clinical-diaphragm-pumps': () => import('@/data/applications/ivd-locales/hi/clinical-diaphragm-pumps.json'),
  'clinical-cleaning': () => import('@/data/applications/ivd-locales/hi/clinical-cleaning.json'),
  'clinical-fluidic-valves': () => import('@/data/applications/ivd-locales/hi/clinical-fluidic-valves.json'),
  'clinical-switching': () => import('@/data/applications/ivd-locales/hi/clinical-switching.json'),
  'clinical-fluid-monitoring': () => import('@/data/applications/ivd-locales/hi/clinical-fluid-monitoring.json'),
  'clinical-fluidic-connections': () => import('@/data/applications/ivd-locales/hi/clinical-fluidic-connections.json'),
  'clinical-probes': () => import('@/data/applications/ivd-locales/hi/clinical-probes.json'),
  'clinical-piston-pumps': () => import('@/data/applications/ivd-locales/hi/clinical-piston-pumps.json'),
  'clinical-syringe-pumps': () => import('@/data/applications/ivd-locales/hi/clinical-syringe-pumps.json'),
  'piston-sample-transfer': () => import('@/data/applications/ivd-locales/hi/piston-sample-transfer.json'),
  'piston-reagent-dispensing': () => import('@/data/applications/ivd-locales/hi/piston-reagent-dispensing.json'),
  'guide-immunoassay': () => import('@/data/applications/ivd-locales/hi/guide-immunoassay.json'),
  'immunoassay-diaphragm-pumps': () => import('@/data/applications/ivd-locales/hi/immunoassay-diaphragm-pumps.json'),
  'immunoassay-bead-wash': () => import('@/data/applications/ivd-locales/hi/immunoassay-bead-wash.json'),
  'guide-hematology': () => import('@/data/applications/ivd-locales/hi/guide-hematology.json'),
  'hematology-diaphragm-pumps': () => import('@/data/applications/ivd-locales/hi/hematology-diaphragm-pumps.json'),
  'hematology-cleaning': () => import('@/data/applications/ivd-locales/hi/hematology-cleaning.json'),
  'guide-coagulation': () => import('@/data/applications/ivd-locales/hi/guide-coagulation.json'),
  'coagulation-diaphragm-pumps': () => import('@/data/applications/ivd-locales/hi/coagulation-diaphragm-pumps.json'),
  'coagulation-cleaning': () => import('@/data/applications/ivd-locales/hi/coagulation-cleaning.json'),
  'guide-molecular': () => import('@/data/applications/ivd-locales/hi/guide-molecular.json'),
  'molecular-diaphragm-pumps': () => import('@/data/applications/ivd-locales/hi/molecular-diaphragm-pumps.json'),
  'molecular-wash': () => import('@/data/applications/ivd-locales/hi/molecular-wash.json'),
  'molecular-pipetting-pumps': () => import('@/data/applications/ivd-locales/hi/molecular-pipetting-pumps.json'),
  'molecular-syringe-pumps': () => import('@/data/applications/ivd-locales/hi/molecular-syringe-pumps.json'),
  'molecular-lysis': () => import('@/data/applications/ivd-locales/hi/molecular-lysis.json'),
  'molecular-fluid-monitoring': () => import('@/data/applications/ivd-locales/hi/molecular-fluid-monitoring.json'),
  'immunoassay-fluid-monitoring': () => import('@/data/applications/ivd-locales/hi/immunoassay-fluid-monitoring.json'),
  'hematology-fluid-monitoring': () => import('@/data/applications/ivd-locales/hi/hematology-fluid-monitoring.json'),
  'coagulation-fluid-monitoring': () => import('@/data/applications/ivd-locales/hi/coagulation-fluid-monitoring.json'),
  'molecular-fluidic-connections': () => import('@/data/applications/ivd-locales/hi/molecular-fluidic-connections.json'),
  'immunoassay-fluidic-connections': () => import('@/data/applications/ivd-locales/hi/immunoassay-fluidic-connections.json'),
  'hematology-fluidic-connections': () => import('@/data/applications/ivd-locales/hi/hematology-fluidic-connections.json'),
  'coagulation-fluidic-connections': () => import('@/data/applications/ivd-locales/hi/coagulation-fluidic-connections.json'),
  'molecular-fluidic-valves': () => import('@/data/applications/ivd-locales/hi/molecular-fluidic-valves.json'),
  'immunoassay-fluidic-valves': () => import('@/data/applications/ivd-locales/hi/immunoassay-fluidic-valves.json'),
  'hematology-fluidic-valves': () => import('@/data/applications/ivd-locales/hi/hematology-fluidic-valves.json'),
  'coagulation-fluidic-valves': () => import('@/data/applications/ivd-locales/hi/coagulation-fluidic-valves.json'),
  'molecular-switching': () => import('@/data/applications/ivd-locales/hi/molecular-switching.json'),
  'immunoassay-switching': () => import('@/data/applications/ivd-locales/hi/immunoassay-switching.json'),
  'hematology-channel': () => import('@/data/applications/ivd-locales/hi/hematology-channel.json'),
  'coagulation-switching': () => import('@/data/applications/ivd-locales/hi/coagulation-switching.json'),
  'immunoassay-piston-pumps': () => import('@/data/applications/ivd-locales/hi/immunoassay-piston-pumps.json'),
  'hematology-piston-pumps': () => import('@/data/applications/ivd-locales/hi/hematology-piston-pumps.json'),
  'coagulation-piston-pumps': () => import('@/data/applications/ivd-locales/hi/coagulation-piston-pumps.json'),
  'immunoassay-sample': () => import('@/data/applications/ivd-locales/hi/immunoassay-sample.json'),
  'hematology-sample': () => import('@/data/applications/ivd-locales/hi/hematology-sample.json'),
  'coagulation-sample': () => import('@/data/applications/ivd-locales/hi/coagulation-sample.json'),
  'immunoassay-probes': () => import('@/data/applications/ivd-locales/hi/immunoassay-probes.json'),
  'hematology-probes': () => import('@/data/applications/ivd-locales/hi/hematology-probes.json'),
  'coagulation-probes': () => import('@/data/applications/ivd-locales/hi/coagulation-probes.json'),
  'immunoassay-syringe-pumps': () => import('@/data/applications/ivd-locales/hi/immunoassay-syringe-pumps.json'),
  'hematology-syringe-pumps': () => import('@/data/applications/ivd-locales/hi/hematology-syringe-pumps.json'),
  'coagulation-syringe-pumps': () => import('@/data/applications/ivd-locales/hi/coagulation-syringe-pumps.json'),
  'immunoassay-reagent': () => import('@/data/applications/ivd-locales/hi/immunoassay-reagent.json'),
  'hematology-dilution': () => import('@/data/applications/ivd-locales/hi/hematology-dilution.json'),
  'coagulation-reagent': () => import('@/data/applications/ivd-locales/hi/coagulation-reagent.json'),
};

function hindiIvdHref(slug = '') {
  return ivdDocumentHref('en', slug).replace(/^\/en\//, '/hi/');
}

export function hasHindiIvdDocument(slug = '') {
  return Boolean(dictionaryLoaders[slug]) && isLocalizedHindiDraftPath(hindiIvdHref(slug));
}

export function getHindiIvdStaticParams() {
  return Object.keys(dictionaryLoaders)
    .filter(slug => slug && hasHindiIvdDocument(slug))
    .map(slug => ({ locale: 'hi', segments: hindiIvdHref(slug).split('/').filter(Boolean).slice(3) }));
}

function draftLink(href: string) {
  return getHindiDraftLink(localizeIvdHref(href, 'en'));
}

async function loadCopy(slug: string) {
  const load = dictionaryLoaders[slug];
  if (!load) throw new Error('No reviewed Hindi IVD copy: ' + (slug || 'hub'));
  return (await load()).default;
}

function translate(copy: HindiApplicationCopy, text: string, slug: string) {
  const translated = copy[text];
  if (translated) return translated;
  throw new Error(`Missing Hindi IVD translation in ${slug || 'hub'}: ${text}`);
}

export async function getHindiIvdDocument(slug = '') {
  const [english, copy] = await Promise.all([getLocalizedIvdDocument('en', slug), loadCopy(slug)]);
  const source = addEnglishTaskParagraphLinks(addClinicalDegassingReview(english), 'ivd');
  return localizeHindiApplication(source, text => translate(copy, text, slug), draftLink);
}

export async function getHindiIvdPresentation(document: ApplicationDocument) {
  const slug = document.slug;
  const [source, copy] = await Promise.all([getLocalizedIvdDocument('en', slug), loadCopy(slug)]);
  const [navigation, breadcrumbs] = await Promise.all([getIvdNavigation('en', source), getIvdBreadcrumbs('en', source)]);
  const label = (text: string) => translate(copy, text, slug);
  const navigationLink = (item: { label: string; href: string }) => {
    const target = draftLink(item.href);
    return { label: label(item.label) + (target.hrefLang === 'en' ? hindiEnglishFallbackSuffix : ''), href: target.href, hrefLang: target.hrefLang };
  };
  const remap = <T,>(map: Readonly<Record<string, T>>) => Object.fromEntries(Object.entries(map).map(([href, item]) => [draftLink(href).href, item]));
  const resources = getLocalizedIvdResources('en', source);
  return {
    article: document,
    href: hindiIvdHref(slug),
    ui: hindiIvdUi,
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
      viewDetails: getRelatedResourcesText('hi').viewDetails,
    },
    resources: getHindiApplicationResources(resources, label, draftLink),
  };
}

export function getHindiIvdMetadata(document: ApplicationDocument): Metadata {
  const canonical = getCanonicalUrl(hindiIvdHref(document.slug));
  const image = { url: reviewDomains.ivd.image, width: 1920, height: 800, alt: getApplicationIndexData('hi').copy.heroImageAlt };
  return {
    title: { absolute: document.seoTitle },
    description: document.description,
    keywords: [...document.keywords],
    robots: { index: false, follow: true },
    alternates: { canonical },
    openGraph: { title: document.seoTitle, description: document.description, type: 'website', siteName: 'FOREACH', url: canonical, locale: 'hi_IN', images: [image] },
    twitter: { card: 'summary_large_image', title: document.seoTitle, description: document.description, images: [image] },
  };
}
