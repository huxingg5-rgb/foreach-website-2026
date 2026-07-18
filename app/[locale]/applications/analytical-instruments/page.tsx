/* =========================================================
   page.tsx
   恒永达官网｜分析仪器应用领域外语页面入口
========================================================= */

import type { Metadata } from "next";

import ApplicationEnglishClient from "@/components/applications/ApplicationEnglishClient";
import FrenchIndustryApplicationClient from "@/components/applications/FrenchIndustryApplicationClient";
import RussianIndustryApplicationClient from "@/components/applications/RussianIndustryApplicationClient";
import SpanishIndustryApplicationClient from "@/components/applications/SpanishIndustryApplicationClient";
import AnalyticalInstrumentsApplicationClient from "@/components/applications/analytical-instruments/AnalyticalInstrumentsApplicationClient";
import { createEnglishApplicationData } from "@/data/applications/application-english";
import { createFrenchApplicationMetadata } from "@/data/applications/application-french-metadata";
import { createRussianApplicationMetadata } from "@/data/applications/application-russian-metadata";
import { createSpanishApplicationMetadata } from "@/data/applications/application-spanish-metadata";
import { getAnalyticalInstrumentsApplicationPageData } from "@/services/applications/analytical-instruments/getAnalyticalInstrumentsApplicationPageData";

import "@/app/applications/analytical-instruments/analytical-instruments-application.css";
import "@/app/applications/ivd/ivd-application.css";

const ENABLED_LOCALES = ["en", "es", "fr", "ko", "ru"] as const;

type AnalyticalInstrumentsApplicationLocalePageProps = {
  params: Promise<{
    locale: string;
  }>;
};

export function generateStaticParams() {
  return ENABLED_LOCALES.map((locale) => ({ locale }));
}

const defaultMetadata: Metadata = {
  title: "Analytical Instruments Applications｜FOREACH",
  description:
    "FOREACH provides pumps, valves, fittings, tubing, sensors and fluidic system support for analytical instruments.",
};

export async function generateMetadata({
  params,
}: AnalyticalInstrumentsApplicationLocalePageProps): Promise<Metadata> {
  const { locale } = await params;

  if (locale === "es") {
    return createSpanishApplicationMetadata("analytical-instruments");
  }

  if (locale === "fr") {
    return createFrenchApplicationMetadata("analytical-instruments");
  }

  if (locale === "ru") {
    return createRussianApplicationMetadata("analytical-instruments");
  }

  return defaultMetadata;
}

export default async function AnalyticalInstrumentsApplicationLocalePage({
  params,
}: AnalyticalInstrumentsApplicationLocalePageProps) {
  const { locale } = await params;
  const data = getAnalyticalInstrumentsApplicationPageData(locale);

  if (locale === "en") {
    return (
      <ApplicationEnglishClient
        data={createEnglishApplicationData("analytical-instruments", data)}
      />
    );
  }

  if (locale === "es") {
    return (
      <SpanishIndustryApplicationClient
        data={data}
        pageClassName="analytical-instruments-page"
        applicationTabsAria="Tipos de instrumentos analíticos"
      />
    );
  }

  if (locale === "fr") {
    return (
      <FrenchIndustryApplicationClient
        data={data}
        pageClassName="analytical-instruments-page"
        applicationTabsAria="Types d’instruments analytiques"
      />
    );
  }

  if (locale === "ru") {
    return (
      <RussianIndustryApplicationClient
        data={data}
        pageClassName="analytical-instruments-page"
        applicationTabsAria="Типы аналитических приборов"
      />
    );
  }

  return <AnalyticalInstrumentsApplicationClient data={data} />;
}
