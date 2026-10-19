import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ApplicationIndexPage from '@/components/applications/ApplicationIndexPage';
import { applicationIndexLocales, getApplicationIndexData, isApplicationIndexLocale } from '@/data/applications/application-index-locales';
import { getCanonicalUrl } from '@/lib/seo/site-url';

type Props = { params: Promise<{ locale: string }> };

export const dynamicParams = false;
export function generateStaticParams() {
  return applicationIndexLocales.map(locale => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isApplicationIndexLocale(locale)) notFound();
  const { copy } = getApplicationIndexData(locale);
  const languages = Object.fromEntries(applicationIndexLocales.map(language => [
    language, getCanonicalUrl(`/${language}/applications/`),
  ]));
  const image = {
    url: '/images/applications/ivd/ivd-hero-bg-1920x800-v001.webp',
    width: 1920, height: 800, alt: copy.heroImageAlt,
  };
  return {
    title: copy.seoTitle,
    description: copy.seoDescription,
    robots: { index: true, follow: true },
    alternates: { canonical: languages[locale], languages: { ...languages, 'x-default': languages.en } },
    openGraph: {
      title: copy.seoTitle, description: copy.seoDescription,
      type: 'website', siteName: 'FOREACH', url: languages[locale],
      locale: { en: 'en_US', es: 'es_ES', fr: 'fr_FR', ko: 'ko_KR', ru: 'ru_RU' }[locale],
      images: [image],
    },
    twitter: { card: 'summary_large_image', title: copy.seoTitle, description: copy.seoDescription, images: [image] },
  };
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  if (!isApplicationIndexLocale(locale)) notFound();
  return <ApplicationIndexPage locale={locale} />;
}
