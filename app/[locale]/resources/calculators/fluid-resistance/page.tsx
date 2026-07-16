import type { Metadata } from "next";
import { notFound } from "next/navigation";

import SiteBreadcrumb from "@/components/common/SiteBreadcrumb";
import ResourceSupportCta from "@/components/resources/ResourceSupportCta";
import FluidResistanceCalculator from "@/components/resources/fluid-resistance/FluidResistanceCalculator";
import calculatorStyles from "@/components/resources/fluid-resistance/FluidResistanceCalculator.module.css";

import "@/app/resources/technical-articles/technical-articles.css";

const SUPPORTED_LOCALES = ["en", "es", "fr", "ko", "ru"] as const;

type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];

type FluidResistanceIntlPageProps = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title: "Fluid Resistance Calculator | FOREACH",
  description:
    "Calculate pressure drop or flow rate for multi-segment fluid paths with tubing, valves, fittings and other resistance elements.",
};

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

  return (
    <main className="technicalArticlesPage">
      <section
        className="technicalArticlesHero"
        style={{
          backgroundImage:
            "url(/images/resources/technical-articles/banner/resources-technical-articles-banner-1920x520-v001.webp)",
        }}
      >
        <div className="technicalArticlesHero__inner">
          <h1 className={`technicalArticlesHero__title ${calculatorStyles.heroTitle}`}>
            Flow Resistance Calculator V2.1
          </h1>
          <p className={`technicalArticlesHero__description ${calculatorStyles.heroDescription}`}>
            Multiple fluids | Dynamic rows | Bidirectional calculation | Low-Reynolds-number correction
          </p>
        </div>
      </section>
      <SiteBreadcrumb
        ariaLabel="Breadcrumb"
        variant="bar"
        items={[
          { label: "Home", href: prefix },
          { label: "Resources", href: `${prefix}/resources` },
          { label: "Fluid Resistance Calculator" },
        ]}
      />
      <FluidResistanceCalculator locale={locale} />
      <ResourceSupportCta
        title="Need help reviewing your calculation?"
        description="Contact FOREACH for fluid-path parameter review, product selection or application support. Our engineers can assess the fluid, flow rate, pressure, tubing and component data with you."
        buttonText="Contact Us"
        href={`${prefix}/contact`}
      />
    </main>
  );
}
