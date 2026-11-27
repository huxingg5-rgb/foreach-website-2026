import { withPublishedTranslationMetadata } from "@/lib/seo/published-translation-metadata";
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import EnglishReviewPage, { germanReviewMetadata, reviewMetadata } from '@/components/applications/EnglishReviewPage';
import { getReviewDocument } from '@/services/applications/english-review';
import { resolveApplicationRoute } from '@/data/applications/application-routes';
import InternationalApplicationPage from '@/components/applications/InternationalApplicationPage';
import { isApplicationTranslationLocale, localizedApplicationStaticParams, localizedApplicationAlternates } from '@/data/applications/international-locales/routes';
import { getLocalizedApplicationDocument, getLocalizedApplicationMetadata } from '@/services/applications/international-localized';
import { getGermanChildApplicationCopy, getGermanChildApplicationStaticParams } from '@/services/applications/german-review';
import { getHindiChildApplicationCopy, getHindiChildApplicationStaticParams } from '@/services/applications/hindi-review-children';
import { hindiApplicationMetadata } from '@/services/applications/hindi-application';
import { getItalianChildApplicationCopy, getItalianChildApplicationStaticParams, italianApplicationMetadata } from '@/services/applications/italian-review';

type Props = { params: Promise<{ locale: string; segments: string[] }> };
export const dynamicParams = false;
export function generateStaticParams() { return [...localizedApplicationStaticParams('environmental-monitoring'), ...getGermanChildApplicationStaticParams('environmental-monitoring'), ...getItalianChildApplicationStaticParams('environmental-monitoring'), ...getHindiChildApplicationStaticParams('environmental-monitoring')]; }
async function loadPage(params: Props['params']) {
  const { locale, segments } = await params;
  if (locale !== 'en' && locale !== 'de' && locale !== 'it' && locale !== 'hi' && !isApplicationTranslationLocale(locale)) notFound();
  const route = resolveApplicationRoute('environmental-monitoring', segments);
  if (!route) notFound();
  const germanCopy = locale === 'de' ? await getGermanChildApplicationCopy(route) : undefined;
  if (locale === 'de' && !germanCopy) notFound();
  const italianCopy = locale === 'it' ? await getItalianChildApplicationCopy(route) : undefined;
  if (locale === 'it' && !italianCopy) notFound();
  const hindiCopy = locale === 'hi' ? await getHindiChildApplicationCopy(route) : undefined;
  if (locale === 'hi' && !hindiCopy) notFound();
  const document = locale === 'en' || locale === 'de' || locale === 'it' || locale === 'hi' ? await getReviewDocument(route.kind, route.slug)
    : await getLocalizedApplicationDocument(locale, route.kind, route.slug);
  if (!document) notFound();
  return { route, document, locale, germanCopy, italianCopy, hindiCopy };
}
async function getPageMetadata({ params }: Props): Promise<Metadata> {
  const { route, document, locale, germanCopy, italianCopy, hindiCopy } = await loadPage(params);
  if (isApplicationTranslationLocale(locale)) return getLocalizedApplicationMetadata(locale, route.kind, document);
  if (germanCopy) return germanReviewMetadata(document, route.kind, germanCopy, route.path);
  if (italianCopy) return italianApplicationMetadata(reviewMetadata(document, route.kind), italianCopy, route.path);
  if (hindiCopy) return hindiApplicationMetadata(reviewMetadata(document, route.kind), hindiCopy, route.path);
  return { ...reviewMetadata(document, route.kind), alternates: localizedApplicationAlternates('en', route.kind, route.slug) };
}
export default async function Page({ params }: Props) {
  const { route, document, locale, germanCopy, italianCopy, hindiCopy } = await loadPage(params);
  if (isApplicationTranslationLocale(locale)) return <InternationalApplicationPage locale={locale} kind={route.kind} document={document} />;
  return <EnglishReviewPage kind={route.kind} document={document} currentHref={route.path} germanCopy={germanCopy} italianCopy={italianCopy} hindiCopy={hindiCopy} />;
}

export const generateMetadata = withPublishedTranslationMetadata("/applications/environmental-monitoring/[...segments]/", getPageMetadata);
