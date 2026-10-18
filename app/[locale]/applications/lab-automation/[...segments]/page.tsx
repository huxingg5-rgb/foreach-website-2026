import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import EnglishReviewPage, { reviewMetadata } from '@/components/applications/EnglishReviewPage';
import { getReviewDocument } from '@/services/applications/english-review';
import { resolveApplicationRoute } from '@/data/applications/application-routes';
import InternationalApplicationPage from '@/components/applications/InternationalApplicationPage';
import { isApplicationTranslationLocale, localizedApplicationStaticParams, localizedApplicationAlternates } from '@/data/applications/international-locales/routes';
import { getLocalizedApplicationDocument, getLocalizedApplicationMetadata } from '@/services/applications/international-localized';

type Props = { params: Promise<{ locale: string; segments: string[] }> };
export const dynamicParams = false;
export function generateStaticParams() { return localizedApplicationStaticParams('lab-automation'); }
async function loadPage(params: Props['params']) {
  const { locale, segments } = await params;
  if (locale !== 'en' && !isApplicationTranslationLocale(locale)) notFound();
  const route = resolveApplicationRoute('lab-automation', segments);
  if (!route) notFound();
  const document = locale === 'en' ? await getReviewDocument(route.kind, route.slug) : await getLocalizedApplicationDocument(locale, route.kind, route.slug);
  if (!document) notFound();
  return { locale, route, document };
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, route, document } = await loadPage(params);
  if (isApplicationTranslationLocale(locale)) return getLocalizedApplicationMetadata(locale, route.kind, document);
  return { ...reviewMetadata(document, route.kind), alternates: localizedApplicationAlternates(locale, route.kind, route.slug) };
}
export default async function Page({ params }: Props) {
  const { locale, route, document } = await loadPage(params);
  if (isApplicationTranslationLocale(locale)) return <InternationalApplicationPage locale={locale} kind={route.kind} document={document} />;
  return <EnglishReviewPage kind={route.kind} document={document} currentHref={route.path} />;
}
