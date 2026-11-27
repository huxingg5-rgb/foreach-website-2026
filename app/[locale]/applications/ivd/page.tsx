import { withPublishedTranslationMetadata } from "@/lib/seo/published-translation-metadata";
import InternationalApplicationPage from '@/components/applications/InternationalApplicationPage';
import { notFound } from 'next/navigation';
import IvdLocalizedReviewPage from '@/components/applications/IvdLocalizedReviewPage';
import { ivdLocales, isIvdLocale } from '@/data/applications/ivd-locales/routes';
import { getLocalizedIvdDocument, getIvdMetadata } from '@/services/applications/ivd-localized';
import { getGermanIvdHub, getGermanIvdMetadata } from '@/services/applications/ivd-german';
import { getHindiIvdDocument, getHindiIvdMetadata, hasHindiIvdDocument } from '@/services/applications/ivd-hindi';
import { getItalianIvdDocument, getItalianIvdMetadata, hasItalianIvdDocument } from '@/services/applications/ivd-italian';
import { languageDraftsEnabled } from '@/lib/i18n/draft-languages';

type Props = { params: Promise<{ locale: string }> };
export const dynamicParams = false;
export function generateStaticParams() { return [...ivdLocales, ...(languageDraftsEnabled ? ['de'] : []), ...(hasItalianIvdDocument() ? ['it'] : []), ...(hasHindiIvdDocument() ? ['hi'] : [])].map(locale => ({ locale })); }
async function getPageMetadata({ params }: Props) {
  const { locale } = await params;
  if (languageDraftsEnabled && locale === 'de') return getGermanIvdMetadata(await getGermanIvdHub());
  if (locale === 'it' && hasItalianIvdDocument()) return getItalianIvdMetadata(await getItalianIvdDocument());
  if (locale === 'hi' && hasHindiIvdDocument()) return getHindiIvdMetadata(await getHindiIvdDocument());
  if (!isIvdLocale(locale)) notFound();
  return getIvdMetadata(locale, await getLocalizedIvdDocument(locale));
}
export default async function Page({ params }: Props) {
  const { locale } = await params;
  if (languageDraftsEnabled && locale === 'de') return <IvdLocalizedReviewPage locale="de" document={await getGermanIvdHub()} />;
  if (locale === 'it' && hasItalianIvdDocument()) return <IvdLocalizedReviewPage locale="it" document={await getItalianIvdDocument()} />;
  if (locale === 'hi' && hasHindiIvdDocument()) return <IvdLocalizedReviewPage locale="hi" document={await getHindiIvdDocument()} />;
  if (!isIvdLocale(locale)) notFound();
  const document = await getLocalizedIvdDocument(locale);
  if (locale !== 'en') return <InternationalApplicationPage locale={locale} kind="ivd" document={document} />;
  return <IvdLocalizedReviewPage locale={locale} document={document} />;
}

export const generateMetadata = withPublishedTranslationMetadata("/applications/ivd/", getPageMetadata);
