import type { Metadata } from "next";
import { notFound } from "next/navigation";

import SiteBreadcrumb from "@/components/common/SiteBreadcrumb";
import ResourceSupportCta from "@/components/resources/ResourceSupportCta";
import FluidResistanceCalculator from "@/components/resources/fluid-resistance/FluidResistanceCalculator";
import calculatorStyles from "@/components/resources/fluid-resistance/FluidResistanceCalculator.module.css";
import { fluidResistancePageCopy } from "@/data/resources/fluid-resistance/fluid-resistance.intl";

import "@/app/resources/technical-articles/technical-articles.css";

const SUPPORTED_LOCALES = ["en", "es", "fr", "ko", "ru"] as const;

type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];

type FluidResistanceIntlPageProps = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: FluidResistanceIntlPageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isSupportedLocale(locale)) return {};

  const copy = fluidResistancePageCopy[locale];
  const metadata = {
    title: copy.seoTitle,
    description: copy.seoDescription,
  };

  return locale === "en" ? metadata : { ...metadata, openGraph: metadata };
}

function isSupportedLocale(locale: string): locale is SupportedLocale {
  return SUPPORTED_LOCALES.includes(locale as SupportedLocale);
}

export default async function FluidResistanceIntlPage({
  params,
}: FluidResistanceIntlPageProps) {
  const { locale } = await params;

  if (!isSupportedLocale(locale)) {
    notFound();
  }

  const prefix = `/${locale}`;
  const copy = fluidResistancePageCopy[locale];

  return (
    <main className="technicalArticlesPage">
      <section
        className="technicalArticlesHero resource-center-banner"
        style={{
          backgroundImage:
            "url(/images/resources/technical-articles/banner/resources-technical-articles-banner-1920x520-v001.webp)",
        }}
      >
        <div className="technicalArticlesHero__inner resource-center-banner__inner">
          <h1 className={`technicalArticlesHero__title ${calculatorStyles.heroTitle} resource-center-banner__title`}>
            {copy.heroTitle}
          </h1>
          <p className={`technicalArticlesHero__description ${calculatorStyles.heroDescription} resource-center-banner__description`}>
            {copy.heroDescription}
          </p>
        </div>
      </section>
      <SiteBreadcrumb
        ariaLabel={copy.breadcrumbAria}
        variant="bar"
        items={[
          { label: copy.breadcrumbHome, href: prefix },
          { label: copy.breadcrumbResources, href: `${prefix}/resources` },
          { label: copy.breadcrumbCurrent },
        ]}
      />
      <FluidResistanceCalculator locale={locale} />
      <ResourceSupportCta
        title={copy.supportTitle}
        description={copy.supportDescription}
        buttonText={copy.supportButton}
        href={`${prefix}/contact`}
      />
    </main>
  );
}
