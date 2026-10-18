import InternationalApplicationPage from '@/components/applications/InternationalApplicationPage';
import { notFound } from 'next/navigation';
import IvdLocalizedReviewPage from '@/components/applications/IvdLocalizedReviewPage';
import { ivdLocales, isIvdLocale } from '@/data/applications/ivd-locales/routes';
import { getLocalizedIvdDocument, getIvdMetadata } from '@/services/applications/ivd-localized';

type Props = { params: Promise<{ locale: string }> };
export const dynamicParams = false;
export function generateStaticParams() { return ivdLocales.map(locale => ({ locale })); }
export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  if (!isIvdLocale(locale)) notFound();
  return getIvdMetadata(locale, await getLocalizedIvdDocument(locale));
}
export default async function Page({ params }: Props) {
  const { locale } = await params;
  if (!isIvdLocale(locale)) notFound();
  const document = await getLocalizedIvdDocument(locale);
  if (locale !== 'en') return <InternationalApplicationPage locale={locale} kind="ivd" document={document} />;
  return <IvdLocalizedReviewPage locale={locale} document={document} />;
}
