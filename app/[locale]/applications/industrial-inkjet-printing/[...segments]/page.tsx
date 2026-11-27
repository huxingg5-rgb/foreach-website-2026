import { withPublishedTranslationMetadata } from "@/lib/seo/published-translation-metadata";
import { notFound } from 'next/navigation';
import IndustrialInkjetReviewPage, { getInkjetPageMetadata } from '@/components/applications/IndustrialInkjetReviewPage';
import { getInkjetRouteKey, getLocalizedInkjetPage, inkjetLocales, inkjetRouteKeys, isInkjetLocale } from '@/data/applications/industrial-inkjet-localized';
import hindiInkjetNavigation from '@/data/applications/hindi-inkjet-child-locales/navigation.json';
import hindiInkjetHub from '@/data/applications/hindi-hub-locales/industrial-inkjet-printing.json';
import { italianInkjetExtra } from '@/data/applications/industrial-inkjet-hub.it';
import type { InkjetRouteKey } from '@/data/applications/inkjet-guide-navigation';
import routes from '@/data/applications/industrial-inkjet-routes.json';
import { germanInkjetChildEdition } from '@/data/applications/german-inkjet-child-locales/manifest';
import { getDraftHrefForEnglish, getItalianDraftLink, isLocalizedHindiDraftPath, isLocalizedItalianDraftPath, languageDraftsEnabled } from '@/lib/i18n/draft-languages';
import { getHindiApplicationTranslation, localizeHindiApplication, type HindiApplicationCopy } from '@/services/applications/hindi-application';
import { translateGermanApplication } from '@/services/applications/german-review';
import { translateItalianApplication, type ItalianApplicationCopy } from '@/services/applications/italian-review';

type Props = { params: Promise<{ locale: string; segments: string[] }> };

const italianChildCopyLoaders: Partial<Record<InkjetRouteKey, () => Promise<{ default: ItalianApplicationCopy }>>> = {
  flowControlGuide: () => import('@/data/applications/italian-inkjet-child-locales/flowControlGuide.json'),
  inkFiltration: () => import('@/data/applications/italian-inkjet-child-locales/inkFiltration.json'),
  cleaningFluidSwitching: () => import('@/data/applications/italian-inkjet-child-locales/cleaningFluidSwitching.json'),
  connectionGuide: () => import('@/data/applications/italian-inkjet-child-locales/connectionGuide.json'),
  fixedInkLines: () => import('@/data/applications/italian-inkjet-child-locales/fixedInkLines.json'),
  inkTankQuickDisconnects: () => import('@/data/applications/italian-inkjet-child-locales/inkTankQuickDisconnects.json'),
  supply: () => import('@/data/applications/italian-inkjet-child-locales/supply.json'),
  recirculation: () => import('@/data/applications/italian-inkjet-child-locales/recirculation.json'),
  cleaning: () => import('@/data/applications/italian-inkjet-child-locales/cleaning.json'),
  guide: () => import('@/data/applications/italian-inkjet-child-locales/guide.json'),
};

const hindiChildCopyLoaders: Partial<Record<InkjetRouteKey, () => Promise<{ default: HindiApplicationCopy }>>> = {
  fixedInkLines: () => import('@/data/applications/hindi-inkjet-child-locales/fixedInkLines.json'),
  cleaningFluidSwitching: () => import('@/data/applications/hindi-inkjet-child-locales/cleaningFluidSwitching.json'),
  inkTankQuickDisconnects: () => import('@/data/applications/hindi-inkjet-child-locales/inkTankQuickDisconnects.json'),
  connectionGuide: () => import('@/data/applications/hindi-inkjet-child-locales/connectionGuide.json'),
  inkFiltration: () => import('@/data/applications/hindi-inkjet-child-locales/inkFiltration.json'),
  flowControlGuide: () => import('@/data/applications/hindi-inkjet-child-locales/flowControlGuide.json'),
  supply: () => import('@/data/applications/hindi-inkjet-child-locales/supply.json'),
  recirculation: () => import('@/data/applications/hindi-inkjet-child-locales/recirculation.json'),
  cleaning: () => import('@/data/applications/hindi-inkjet-child-locales/cleaning.json'),
  guide: () => import('@/data/applications/hindi-inkjet-child-locales/guide.json'),
};

function hasHindiCopy(key: InkjetRouteKey) {
  return Boolean(hindiChildCopyLoaders[key]) &&
    isLocalizedHindiDraftPath(getDraftHrefForEnglish(routes[key], 'hi'));
}

function hasItalianCopy(key: InkjetRouteKey) {
  return Boolean(italianChildCopyLoaders[key]) &&
    isLocalizedItalianDraftPath(getDraftHrefForEnglish(routes[key], 'it'));
}

export const dynamicParams = false;

export function generateStaticParams() {
  return inkjetRouteKeys.filter(key => key !== 'hub').flatMap(key => {
    const segments = routes[key].slice(routes.hub.length, -1).split('/');
    const locales = [
      ...inkjetLocales,
      ...(languageDraftsEnabled && germanInkjetChildEdition.keys.includes(key) ? ['de'] : []),
      ...(hasItalianCopy(key) ? ['it'] : []),
      ...(hasHindiCopy(key) ? ['hi'] : []),
    ];
    return locales.map(locale => ({ locale, segments }));
  });
}

async function loadPage(params: Props['params']) {
  const { locale, segments } = await params;
  const key = getInkjetRouteKey(routes.hub + segments.join('/') + '/');
  if (!key || key === 'hub') notFound();
  if (locale === 'de' && languageDraftsEnabled && germanInkjetChildEdition.keys.includes(key)) {
    const edition = await germanInkjetChildEdition.loadCopy?.();
    if (!edition) notFound();
    const germanCopy = edition.default;
    const source = getLocalizedInkjetPage('en', key);
    return {
      page: {
        ...source,
        document: translateGermanApplication(source.document, germanCopy),
        contactDescription: translateGermanApplication(source.contactDescription, germanCopy),
      },
      germanCopy,
    };
  }
  if (locale === 'it' && hasItalianCopy(key)) {
    const edition = await italianChildCopyLoaders[key]?.();
    if (!edition) notFound();
    const italianCopy = { ...italianInkjetExtra, ...edition.default };
    const page = getLocalizedInkjetPage('en', key);
    const document = translateItalianApplication(page.document, italianCopy);
    return {
      page: {
        ...page,
        document: {
          ...document,
          references: page.document.references.map(reference => {
            const title = italianCopy[reference.title] ?? reference.title;
            if (!reference.href.startsWith('/en/')) return { ...reference, title };
            const target = getItalianDraftLink(reference.href);
            return { ...reference, title, href: target.href, hrefLang: target.hrefLang };
          }),
        },
        contactDescription: translateItalianApplication(page.contactDescription, italianCopy),
      },
      italianCopy,
    };
  }
  if (locale === 'hi' && hasHindiCopy(key)) {
    const edition = await hindiChildCopyLoaders[key]?.();
    if (!edition) notFound();
    const hindiCopy = { ...hindiInkjetHub, ...hindiInkjetNavigation, ...edition.default };
    const page = getLocalizedInkjetPage('en', key);
    const translate = (text: string) => getHindiApplicationTranslation(hindiCopy, text, page.document.slug);
    return {
      page: {
        ...page,
        document: localizeHindiApplication(page.document, translate),
        contactDescription: page.contactDescription ? translate(page.contactDescription) : undefined,
      },
      hindiCopy,
    };
  }
  if (!isInkjetLocale(locale)) notFound();
  return { page: getLocalizedInkjetPage(locale, key) };
}

async function getPageMetadata({ params }: Props) {
  const { page, germanCopy, italianCopy, hindiCopy } = await loadPage(params);
  return getInkjetPageMetadata(page, Boolean(germanCopy), Boolean(italianCopy), Boolean(hindiCopy));
}

export default async function Page({ params }: Props) {
  return <IndustrialInkjetReviewPage {...await loadPage(params)} />;
}

export const generateMetadata = withPublishedTranslationMetadata("/applications/industrial-inkjet-printing/[...segments]/", getPageMetadata);
