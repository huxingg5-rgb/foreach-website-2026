import { notFound } from 'next/navigation';
import EnglishReviewPage, { reviewMetadata } from '@/components/applications/EnglishReviewPage';
import { getReviewHub } from '@/data/applications/english-review';
import InternationalApplicationPage from '@/components/applications/InternationalApplicationPage';
import { isApplicationTranslationLocale, localizedApplicationStaticParams, localizedApplicationAlternates } from '@/data/applications/international-locales/routes';
import { getLocalizedApplicationDocument, getLocalizedApplicationMetadata } from '@/services/applications/international-localized';

type Props = { params: Promise<{ locale: string }> };
export const dynamicParams = false;
export function generateStaticParams() { return ['en', 'es', 'fr', 'ko', 'ru'].map(locale => ({ locale })); }
export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  if (locale === 'en') return { ...reviewMetadata(getReviewHub('synthetic-biology'), 'synthetic-biology'), alternates: localizedApplicationAlternates('en', 'synthetic-biology') };
  if (!isApplicationTranslationLocale(locale)) notFound();
  return getLocalizedApplicationMetadata(locale, 'synthetic-biology', await getLocalizedApplicationDocument(locale, 'synthetic-biology'));
}
export default async function Page({ params }: Props) {
  const { locale } = await params;
  if (locale === 'en') return <EnglishReviewPage kind="synthetic-biology" />;
  if (!isApplicationTranslationLocale(locale)) notFound();
  return <InternationalApplicationPage locale={locale} kind="synthetic-biology" document={await getLocalizedApplicationDocument(locale, 'synthetic-biology')} />;
}
