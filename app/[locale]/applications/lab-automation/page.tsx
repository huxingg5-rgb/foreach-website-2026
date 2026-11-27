import { withPublishedTranslationMetadata } from "@/lib/seo/published-translation-metadata";
import { notFound } from 'next/navigation';
import EnglishReviewPage, { germanReviewMetadata, reviewMetadata } from '@/components/applications/EnglishReviewPage';
import { isLocalizedHindiDraftPath, isLocalizedItalianDraftPath, languageDraftsEnabled } from '@/lib/i18n/draft-languages';
import { hindiApplicationMetadata } from '@/services/applications/hindi-application';
import hindiCopy from '@/data/applications/hindi-hub-locales/lab-automation.json';
import { italianApplicationMetadata } from '@/services/applications/italian-review';
import italianCopy from '@/data/applications/italian-hub-locales/lab-automation.json';
import germanCopy from '@/data/applications/german-hub-locales/lab-automation.json';
import { getReviewHub } from '@/data/applications/english-review';
import InternationalApplicationPage from '@/components/applications/InternationalApplicationPage';
import { isApplicationTranslationLocale, localizedApplicationStaticParams, localizedApplicationAlternates } from '@/data/applications/international-locales/routes';
import { getLocalizedApplicationDocument, getLocalizedApplicationMetadata } from '@/services/applications/international-localized';

type Props = { params: Promise<{ locale: string }> };
const href = '/en/applications/lab-automation/';
const hasItalian = () => isLocalizedItalianDraftPath('/it/applications/lab-automation/');
const hasHindi = () => isLocalizedHindiDraftPath('/hi/applications/lab-automation/');
export const dynamicParams = false;
export function generateStaticParams() { return ['en', 'es', 'fr', 'ko', 'ru', ...(languageDraftsEnabled ? ['de'] : []), ...(hasItalian() ? ['it'] : []), ...(hasHindi() ? ['hi'] : [])].map(locale => ({ locale })); }
async function getPageMetadata({ params }: Props) {
  const { locale } = await params;
  if (languageDraftsEnabled && locale === 'de') return germanReviewMetadata(getReviewHub('lab-automation'), 'lab-automation', germanCopy);
  if (locale === 'hi' && hasHindi()) return hindiApplicationMetadata(reviewMetadata(getReviewHub('lab-automation'), 'lab-automation'), hindiCopy, href);
  if (locale === 'it' && hasItalian()) return italianApplicationMetadata(reviewMetadata(getReviewHub('lab-automation'), 'lab-automation'), italianCopy, href);
  if (locale === 'en') return { ...reviewMetadata(getReviewHub('lab-automation'), 'lab-automation'), alternates: localizedApplicationAlternates('en', 'lab-automation') };
  if (!isApplicationTranslationLocale(locale)) notFound();
  return getLocalizedApplicationMetadata(locale, 'lab-automation', await getLocalizedApplicationDocument(locale, 'lab-automation'));
}
export default async function Page({ params }: Props) {
  const { locale } = await params;
  if (languageDraftsEnabled && locale === 'de') return <EnglishReviewPage kind="lab-automation" germanCopy={germanCopy} />;
  if (locale === 'hi' && hasHindi()) return <EnglishReviewPage kind="lab-automation" hindiCopy={hindiCopy} />;
  if (locale === 'it' && hasItalian()) return <EnglishReviewPage kind="lab-automation" italianCopy={italianCopy} />;
  if (locale === 'en') return <EnglishReviewPage kind="lab-automation" />;
  if (!isApplicationTranslationLocale(locale)) notFound();
  return <InternationalApplicationPage locale={locale} kind="lab-automation" document={await getLocalizedApplicationDocument(locale, 'lab-automation')} />;
}

export const generateMetadata = withPublishedTranslationMetadata("/applications/lab-automation/", getPageMetadata);
