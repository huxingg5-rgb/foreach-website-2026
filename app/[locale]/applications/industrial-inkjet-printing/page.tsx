import { withPublishedTranslationMetadata } from "@/lib/seo/published-translation-metadata";
import { notFound } from 'next/navigation';
import IndustrialInkjetReviewPage, { getInkjetPageMetadata } from '@/components/applications/IndustrialInkjetReviewPage';
import { getLocalizedInkjetPage, inkjetLocales, isInkjetLocale } from '@/data/applications/industrial-inkjet-localized';
import { getGermanInkjetHubPage } from '@/data/applications/industrial-inkjet-hub.de';
import { isLocalizedHindiDraftPath, isLocalizedItalianDraftPath, languageDraftsEnabled } from '@/lib/i18n/draft-languages';

import hindiCopy from '@/data/applications/hindi-hub-locales/industrial-inkjet-printing.json';
import { getHindiApplicationTranslation, localizeHindiApplication } from '@/services/applications/hindi-application';
import italianHub from '@/data/applications/italian-hub-locales/industrial-inkjet-printing.json';
import { italianInkjetExtra } from '@/data/applications/industrial-inkjet-hub.it';
import { translateItalianApplication } from '@/services/applications/italian-review';

type Props = { params: Promise<{ locale: string }> };
const hasHindi = () => isLocalizedHindiDraftPath('/hi/applications/industrial-inkjet-printing/');
const hasItalian = () => isLocalizedItalianDraftPath('/it/applications/industrial-inkjet-printing/');
const italianCopy = { ...italianInkjetExtra, ...italianHub };

export const dynamicParams = false;

export function generateStaticParams() {
  return [...inkjetLocales, ...(languageDraftsEnabled ? ['de'] : []), ...(hasItalian() ? ['it'] : []), ...(hasHindi() ? ['hi'] : [])].map(locale => ({ locale }));
}

async function loadPage(params: Props['params']) {
  const { locale } = await params;
  if (locale === 'de' && languageDraftsEnabled) return { page: getGermanInkjetHubPage(), germanHub: true };
  if (locale === 'hi' && hasHindi()) {
    const page = getLocalizedInkjetPage('en', 'hub');
    const translate = (text: string) => getHindiApplicationTranslation(hindiCopy, text, page.document.slug);
    return { page: { ...page, document: localizeHindiApplication(page.document, translate) }, hindiCopy };
  }
  if (locale === 'it' && hasItalian()) {
    const page = getLocalizedInkjetPage('en', 'hub');
    return { page: { ...page, document: translateItalianApplication(page.document, italianCopy) }, italianCopy };
  }
  if (!isInkjetLocale(locale)) notFound();
  return { page: getLocalizedInkjetPage(locale, 'hub'), germanHub: false };
}

async function getPageMetadata({ params }: Props) {
  const result = await loadPage(params);
  return getInkjetPageMetadata(result.page, result.germanHub, Boolean(result.italianCopy), Boolean(result.hindiCopy));
}

export default async function Page({ params }: Props) {
  return <IndustrialInkjetReviewPage {...await loadPage(params)} />;
}

export const generateMetadata = withPublishedTranslationMetadata("/applications/industrial-inkjet-printing/", getPageMetadata);
