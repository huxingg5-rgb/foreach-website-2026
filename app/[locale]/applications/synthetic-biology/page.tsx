import { withPublishedTranslationMetadata } from "@/lib/seo/published-translation-metadata";
import { notFound } from 'next/navigation';
import EnglishReviewPage, { germanReviewMetadata, reviewMetadata } from '@/components/applications/EnglishReviewPage';
import { getReviewHub } from '@/data/applications/english-review';
import { syntheticBiologyGermanCopy } from '@/data/applications/synthetic-biology/synthetic-biology-hub.de';
import { isLocalizedHindiDraftPath, isLocalizedItalianDraftPath, languageDraftsEnabled } from '@/lib/i18n/draft-languages';
import { hindiApplicationMetadata } from '@/services/applications/hindi-application';
import hindiCopy from '@/data/applications/hindi-hub-locales/synthetic-biology.json';
import { italianApplicationMetadata } from '@/services/applications/italian-review';
import italianCopy from '@/data/applications/italian-hub-locales/synthetic-biology.json';
import InternationalApplicationPage from '@/components/applications/InternationalApplicationPage';
import { isApplicationTranslationLocale, localizedApplicationStaticParams, localizedApplicationAlternates } from '@/data/applications/international-locales/routes';
import { getLocalizedApplicationDocument, getLocalizedApplicationMetadata } from '@/services/applications/international-localized';

type Props = { params: Promise<{ locale: string }> };
const href = '/en/applications/synthetic-biology/';
const hasItalian = () => isLocalizedItalianDraftPath('/it/applications/synthetic-biology/');
const hasHindi = () => isLocalizedHindiDraftPath('/hi/applications/synthetic-biology/');
export const dynamicParams = false;
export function generateStaticParams() { return ['en', 'es', 'fr', 'ko', 'ru', ...(languageDraftsEnabled ? ['de'] : []), ...(hasItalian() ? ['it'] : []), ...(hasHindi() ? ['hi'] : [])].map(locale => ({ locale })); }
async function getPageMetadata({ params }: Props) {
  const { locale } = await params;
  if (locale === 'de' && languageDraftsEnabled) return germanReviewMetadata(getReviewHub('synthetic-biology'), 'synthetic-biology', syntheticBiologyGermanCopy);
  if (locale === 'hi' && hasHindi()) return hindiApplicationMetadata(reviewMetadata(getReviewHub('synthetic-biology'), 'synthetic-biology'), hindiCopy, href);
  if (locale === 'it' && hasItalian()) return italianApplicationMetadata(reviewMetadata(getReviewHub('synthetic-biology'), 'synthetic-biology'), italianCopy, href);
  if (locale === 'en') return { ...reviewMetadata(getReviewHub('synthetic-biology'), 'synthetic-biology'), alternates: localizedApplicationAlternates('en', 'synthetic-biology') };
  if (!isApplicationTranslationLocale(locale)) notFound();
  return getLocalizedApplicationMetadata(locale, 'synthetic-biology', await getLocalizedApplicationDocument(locale, 'synthetic-biology'));
}
export default async function Page({ params }: Props) {
  const { locale } = await params;
  if (locale === 'de' && languageDraftsEnabled) return <EnglishReviewPage kind="synthetic-biology" germanCopy={syntheticBiologyGermanCopy} />;
  if (locale === 'hi' && hasHindi()) return <EnglishReviewPage kind="synthetic-biology" hindiCopy={hindiCopy} />;
  if (locale === 'it' && hasItalian()) return <EnglishReviewPage kind="synthetic-biology" italianCopy={italianCopy} />;
  if (locale === 'en') return <EnglishReviewPage kind="synthetic-biology" />;
  if (!isApplicationTranslationLocale(locale)) notFound();
  return <InternationalApplicationPage locale={locale} kind="synthetic-biology" document={await getLocalizedApplicationDocument(locale, 'synthetic-biology')} />;
}

export const generateMetadata = withPublishedTranslationMetadata("/applications/synthetic-biology/", getPageMetadata);
