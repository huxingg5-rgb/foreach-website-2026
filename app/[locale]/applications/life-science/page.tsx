import { withPublishedTranslationMetadata } from "@/lib/seo/published-translation-metadata";
import { notFound } from 'next/navigation';
import EnglishReviewPage, { germanReviewMetadata, reviewMetadata } from '@/components/applications/EnglishReviewPage';
import { isLocalizedHindiDraftPath, isLocalizedItalianDraftPath, languageDraftsEnabled } from '@/lib/i18n/draft-languages';
import { hindiApplicationMetadata } from '@/services/applications/hindi-application';
import hindiCopy from '@/data/applications/hindi-hub-locales/life-science.json';
import { italianApplicationMetadata } from '@/services/applications/italian-review';
import italianCopy from '@/data/applications/italian-hub-locales/life-science.json';
import germanCopy from '@/data/applications/german-hub-locales/life-science.json';
import { getReviewHub } from '@/data/applications/english-review';
import InternationalApplicationPage from '@/components/applications/InternationalApplicationPage';
import { isApplicationTranslationLocale, localizedApplicationStaticParams, localizedApplicationAlternates } from '@/data/applications/international-locales/routes';
import { getLocalizedApplicationDocument, getLocalizedApplicationMetadata } from '@/services/applications/international-localized';

type Props = { params: Promise<{ locale: string }> };
const href = '/en/applications/life-science/';
const hasItalian = () => isLocalizedItalianDraftPath('/it/applications/life-science/');
const hasHindi = () => isLocalizedHindiDraftPath('/hi/applications/life-science/');
export const dynamicParams = false;
export function generateStaticParams() { return ['en', 'es', 'fr', 'ko', 'ru', ...(languageDraftsEnabled ? ['de'] : []), ...(hasItalian() ? ['it'] : []), ...(hasHindi() ? ['hi'] : [])].map(locale => ({ locale })); }
async function getPageMetadata({ params }: Props) {
  const { locale } = await params;
  if (languageDraftsEnabled && locale === 'de') return germanReviewMetadata(getReviewHub('life-science'), 'life-science', germanCopy);
  if (locale === 'hi' && hasHindi()) return hindiApplicationMetadata(reviewMetadata(getReviewHub('life-science'), 'life-science'), hindiCopy, href);
  if (locale === 'it' && hasItalian()) return italianApplicationMetadata(reviewMetadata(getReviewHub('life-science'), 'life-science'), italianCopy, href);
  if (locale === 'en') return { ...reviewMetadata(getReviewHub('life-science'), 'life-science'), alternates: localizedApplicationAlternates('en', 'life-science') };
  if (!isApplicationTranslationLocale(locale)) notFound();
  return getLocalizedApplicationMetadata(locale, 'life-science', await getLocalizedApplicationDocument(locale, 'life-science'));
}
export default async function Page({ params }: Props) {
  const { locale } = await params;
  if (languageDraftsEnabled && locale === 'de') return <EnglishReviewPage kind="life-science" germanCopy={germanCopy} />;
  if (locale === 'hi' && hasHindi()) return <EnglishReviewPage kind="life-science" hindiCopy={hindiCopy} />;
  if (locale === 'it' && hasItalian()) return <EnglishReviewPage kind="life-science" italianCopy={italianCopy} />;
  if (locale === 'en') return <EnglishReviewPage kind="life-science" />;
  if (!isApplicationTranslationLocale(locale)) notFound();
  return <InternationalApplicationPage locale={locale} kind="life-science" document={await getLocalizedApplicationDocument(locale, 'life-science')} />;
}

export const generateMetadata = withPublishedTranslationMetadata("/applications/life-science/", getPageMetadata);
