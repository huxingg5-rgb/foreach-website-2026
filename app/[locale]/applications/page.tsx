import { withPublishedTranslationMetadata } from "@/lib/seo/published-translation-metadata";
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ApplicationIndexPage from '@/components/applications/ApplicationIndexPage';
import { applicationIndexLocales, getApplicationIndexData, isApplicationIndexLocale } from '@/data/applications/application-index-locales';
import { getCanonicalUrl } from '@/lib/seo/site-url';

import { isLocalizedHindiDraftPath, isLocalizedItalianDraftPath, languageDraftsEnabled } from '@/lib/i18n/draft-languages';

type Props = { params: Promise<{ locale: string }> };
const hasItalianIndex = () => isLocalizedItalianDraftPath('/it/applications/');
const hasHindiIndex = () => isLocalizedHindiDraftPath('/hi/applications/');

export const dynamicParams = false;
export function generateStaticParams() {
  return [...applicationIndexLocales, ...(languageDraftsEnabled ? ['de'] : []), ...(hasItalianIndex() ? ['it'] : []), ...(hasHindiIndex() ? ['hi'] : [])].map(locale => ({ locale }));
}

async function getPageMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isApplicationIndexLocale(locale) && !(locale === 'de' && languageDraftsEnabled) && !(locale === 'it' && hasItalianIndex()) && !(locale === 'hi' && hasHindiIndex())) notFound();
  const { copy } = getApplicationIndexData(locale);
  const languages = Object.fromEntries(applicationIndexLocales.map(language => [
    language, getCanonicalUrl(`/${language}/applications/`),
  ]));
  const image = {
    url: '/images/applications/ivd/ivd-hero-bg-1920x800-v001.webp',
    width: 1920, height: 800, alt: copy.heroImageAlt,
  };
  const canonical = getCanonicalUrl(`/${locale}/applications/`);
  return {
    title: copy.seoTitle,
    description: copy.seoDescription,
    robots: { index: locale !== 'de' && locale !== 'it' && locale !== 'hi', follow: true },
    alternates: locale === 'de' || locale === 'it' || locale === 'hi' ? { canonical } : { canonical, languages: { ...languages, 'x-default': languages.en } },
    openGraph: {
      title: copy.seoTitle, description: copy.seoDescription,
      type: 'website', siteName: 'FOREACH', url: canonical,
      locale: { de: 'de_DE', it: 'it_IT', hi: 'hi_IN', en: 'en_US', es: 'es_ES', fr: 'fr_FR', ko: 'ko_KR', ru: 'ru_RU' }[locale],
      images: [image],
    },
    twitter: { card: 'summary_large_image', title: copy.seoTitle, description: copy.seoDescription, images: [image] },
  };
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  if (!isApplicationIndexLocale(locale) && !(locale === 'de' && languageDraftsEnabled) && !(locale === 'it' && hasItalianIndex()) && !(locale === 'hi' && hasHindiIndex())) notFound();
  return <ApplicationIndexPage locale={locale} />;
}

export const generateMetadata = withPublishedTranslationMetadata("/applications/", getPageMetadata);
