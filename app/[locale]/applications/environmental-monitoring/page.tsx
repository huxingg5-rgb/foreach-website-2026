import { withPublishedTranslationMetadata } from "@/lib/seo/published-translation-metadata";
import { notFound } from 'next/navigation';
import EnglishReviewPage, { germanReviewMetadata, reviewMetadata } from '@/components/applications/EnglishReviewPage';
import { isLocalizedHindiDraftPath, isLocalizedItalianDraftPath, languageDraftsEnabled } from '@/lib/i18n/draft-languages';
import germanCopy from '@/data/applications/german-hub-locales/environmental-monitoring.json';
import { getReviewHub } from '@/data/applications/english-review';
import { hindiApplicationMetadata } from '@/services/applications/hindi-application';
import hindiCopy from '@/data/applications/hindi-hub-locales/environmental-monitoring.json';
import { italianApplicationMetadata } from '@/services/applications/italian-review';
import italianCopy from '@/data/applications/italian-hub-locales/environmental-monitoring.json';
import InternationalApplicationPage from '@/components/applications/InternationalApplicationPage';
import { isApplicationTranslationLocale, localizedApplicationStaticParams, localizedApplicationAlternates } from '@/data/applications/international-locales/routes';
import { getLocalizedApplicationDocument, getLocalizedApplicationMetadata } from '@/services/applications/international-localized';

type Props = { params: Promise<{ locale: string }> };
const href = '/en/applications/environmental-monitoring/';
const hasItalian = () => isLocalizedItalianDraftPath('/it/applications/environmental-monitoring/');
const hasHindi = () => isLocalizedHindiDraftPath('/hi/applications/environmental-monitoring/');
export const dynamicParams = false;
export function generateStaticParams() { return ['en', 'es', 'fr', 'ko', 'ru', ...(languageDraftsEnabled ? ['de'] : []), ...(hasItalian() ? ['it'] : []), ...(hasHindi() ? ['hi'] : [])].map(locale => ({ locale })); }
async function getPageMetadata({ params }: Props) {
  const { locale } = await params;
  if (languageDraftsEnabled && locale === 'de') return germanReviewMetadata(getReviewHub('environmental-monitoring'), 'environmental-monitoring', germanCopy);
  if (locale === 'hi' && hasHindi()) return hindiApplicationMetadata(reviewMetadata(getReviewHub('environmental-monitoring'), 'environmental-monitoring'), hindiCopy, href);
  if (locale === 'it' && hasItalian()) return italianApplicationMetadata(reviewMetadata(getReviewHub('environmental-monitoring'), 'environmental-monitoring'), italianCopy, href);
  if (locale === 'en') return { ...reviewMetadata(getReviewHub('environmental-monitoring'), 'environmental-monitoring'), alternates: localizedApplicationAlternates('en', 'environmental-monitoring') };
  if (!isApplicationTranslationLocale(locale)) notFound();
  return getLocalizedApplicationMetadata(locale, 'environmental-monitoring', await getLocalizedApplicationDocument(locale, 'environmental-monitoring'));
}
export default async function Page({ params }: Props) {
  const { locale } = await params;
  if (languageDraftsEnabled && locale === 'de') return <EnglishReviewPage kind="environmental-monitoring" germanCopy={germanCopy} />;
  if (locale === 'hi' && hasHindi()) return <EnglishReviewPage kind="environmental-monitoring" hindiCopy={hindiCopy} />;
  if (locale === 'it' && hasItalian()) return <EnglishReviewPage kind="environmental-monitoring" italianCopy={italianCopy} />;
  if (locale === 'en') return <EnglishReviewPage kind="environmental-monitoring" />;
  if (!isApplicationTranslationLocale(locale)) notFound();
  return <InternationalApplicationPage locale={locale} kind="environmental-monitoring" document={await getLocalizedApplicationDocument(locale, 'environmental-monitoring')} />;
}

export const generateMetadata = withPublishedTranslationMetadata("/applications/environmental-monitoring/", getPageMetadata);
