import { localizedApplicationStaticParams } from '@/data/applications/international-locales/routes';
import InternationalApplicationPage from '@/components/applications/InternationalApplicationPage';
import { notFound } from 'next/navigation';
import IvdLocalizedReviewPage from '@/components/applications/IvdLocalizedReviewPage';
import { isIvdLocale } from '@/data/applications/ivd-locales/routes';
import { resolveApplicationRoute } from '@/data/applications/application-routes';
import { getLocalizedIvdDocument, getIvdMetadata } from '@/services/applications/ivd-localized';

type Props = { params: Promise<{ locale: string; segments: string[] }> };
export const dynamicParams = false;
export function generateStaticParams() {
  return localizedApplicationStaticParams('ivd');
}
async function loadPage(params: Props['params']) {
  const { locale, segments } = await params;
  if (!isIvdLocale(locale)) notFound();
  const route = resolveApplicationRoute('ivd', segments);
  if (!route) notFound();
  return { locale, document: await getLocalizedIvdDocument(locale, route.slug) };
}
export async function generateMetadata({ params }: Props) {
  const { locale, document } = await loadPage(params);
  return getIvdMetadata(locale, document);
}
export default async function Page({ params }: Props) {
  const { locale, document } = await loadPage(params);
  if (locale !== 'en') return <InternationalApplicationPage locale={locale} kind="ivd" document={document} />;
  return <IvdLocalizedReviewPage locale={locale} document={document} />;
}
