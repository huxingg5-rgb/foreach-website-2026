import { withPublishedTranslationMetadata } from "@/lib/seo/published-translation-metadata";
import { localizedApplicationStaticParams } from '@/data/applications/international-locales/routes';
import InternationalApplicationPage from '@/components/applications/InternationalApplicationPage';
import { notFound } from 'next/navigation';
import IvdLocalizedReviewPage from '@/components/applications/IvdLocalizedReviewPage';
import { isIvdLocale } from '@/data/applications/ivd-locales/routes';
import { resolveApplicationRoute } from '@/data/applications/application-routes';
import { getLocalizedIvdDocument, getIvdMetadata } from '@/services/applications/ivd-localized';
import { getGermanIvdMetadata } from '@/services/applications/ivd-german';
import { getGermanIvdDocument } from '@/services/applications/ivd-german-document';
import { getHindiIvdDocument, getHindiIvdMetadata, getHindiIvdStaticParams, hasHindiIvdDocument } from '@/services/applications/ivd-hindi';
import { getItalianIvdDocument, getItalianIvdMetadata, getItalianIvdStaticParams, hasItalianIvdDocument } from '@/services/applications/ivd-italian';
import { languageDraftsEnabled } from '@/lib/i18n/draft-languages';
import { germanIvdDraftDocuments, isGermanIvdDraftSlug } from '@/lib/i18n/german-application-draft-paths';

type Props = { params: Promise<{ locale: string; segments: string[] }> };
export const dynamicParams = false;
export function generateStaticParams() {
  return [
    ...localizedApplicationStaticParams('ivd'),
    ...getItalianIvdStaticParams(),
    ...getHindiIvdStaticParams(),
    ...(languageDraftsEnabled ? Object.values(germanIvdDraftDocuments).map(({ path }) => ({
      locale: 'de', segments: path.split('/').filter(Boolean).slice(2),
    })) : []),
  ];
}
async function loadPage(params: Props['params']) {
  const { locale, segments } = await params;
  const route = resolveApplicationRoute('ivd', segments);
  if (!route) notFound();
  if (locale === 'de' && languageDraftsEnabled) {
    if (!isGermanIvdDraftSlug(route.slug)) notFound();
    return { locale: 'de' as const, document: await getGermanIvdDocument(route.slug) };
  }
  if (locale === 'hi') {
    if (!hasHindiIvdDocument(route.slug)) notFound();
    return { locale: 'hi' as const, document: await getHindiIvdDocument(route.slug) };
  }
  if (locale === 'it') {
    if (!hasItalianIvdDocument(route.slug)) notFound();
    return { locale: 'it' as const, document: await getItalianIvdDocument(route.slug) };
  }
  if (!isIvdLocale(locale)) notFound();
  return { locale, document: await getLocalizedIvdDocument(locale, route.slug) };
}
async function getPageMetadata({ params }: Props) {
  const { locale, document } = await loadPage(params);
  return locale === 'de' ? getGermanIvdMetadata(document) : locale === 'it' ? getItalianIvdMetadata(document) : locale === 'hi' ? getHindiIvdMetadata(document) : getIvdMetadata(locale, document);
}
export default async function Page({ params }: Props) {
  const { locale, document } = await loadPage(params);
  if (locale !== 'en' && locale !== 'de' && locale !== 'it' && locale !== 'hi') return <InternationalApplicationPage locale={locale} kind="ivd" document={document} />;
  return <IvdLocalizedReviewPage locale={locale} document={document} />;
}

export const generateMetadata = withPublishedTranslationMetadata("/applications/ivd/[...segments]/", getPageMetadata);
