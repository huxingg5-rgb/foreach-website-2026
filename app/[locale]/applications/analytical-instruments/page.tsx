/* =========================================================
   page.tsx
   恒永达官网｜分析仪器应用领域外语页面入口
========================================================= */

import type { Metadata } from "next";

import ApplicationEnglishClient from "@/components/applications/ApplicationEnglishClient";
import AnalyticalApplicationDocument from "@/components/applications/analytical-documents/AnalyticalApplicationDocument";
import AnalyticalInstrumentsLandingShell from "@/components/applications/analytical-instruments/AnalyticalInstrumentsLandingShell";
import FrenchIndustryApplicationClient from "@/components/applications/FrenchIndustryApplicationClient";
import RussianIndustryApplicationClient from "@/components/applications/RussianIndustryApplicationClient";
import SpanishIndustryApplicationClient, { KOREAN_INDUSTRY_UI_TEXT } from "@/components/applications/SpanishIndustryApplicationClient";
import AnalyticalInstrumentsApplicationClient from "@/components/applications/analytical-instruments/AnalyticalInstrumentsApplicationClient";
import { analyticalDocuments } from "@/data/applications/analytical-documents/registry";
import { createEnglishApplicationData } from "@/data/applications/application-english";
import { createAnalyticalDocumentMetadata, createAnalyticalDocumentSchema, getEnglishAnalyticalDocument } from "@/services/applications/analytical-documents";
import { createFrenchApplicationMetadata } from "@/data/applications/application-french-metadata";
import { createRussianApplicationMetadata } from "@/data/applications/application-russian-metadata";
import { createSpanishApplicationMetadata } from "@/data/applications/application-spanish-metadata";
import { createKoreanApplicationMetadata } from "@/data/applications/application-korean-metadata";
import { getAnalyticalInstrumentsApplicationPageData } from "@/services/applications/analytical-instruments/getAnalyticalInstrumentsApplicationPageData";

import "@/app/applications/analytical-instruments/analytical-instruments-application.css";
import "@/app/applications/ivd/ivd-application.css";

const ENABLED_LOCALES = ["en", "es", "fr", "ko", "ru"] as const;

type AnalyticalInstrumentsApplicationLocalePageProps = {
  params: Promise<{
    locale: string;
  }>;
  searchParams: Promise<{
    application?: string | string[];
  }>;
};

export function generateStaticParams() {
  return ENABLED_LOCALES.map((locale) => ({ locale }));
}

const defaultMetadata: Metadata = {
  title: "Analytical Instruments Applications｜Foreach Technology",
  description:
    "Foreach provides pumps, valves, fittings, tubing, sensors and fluidic system support for analytical instruments.",
};

export async function generateMetadata({
  params,
}: AnalyticalInstrumentsApplicationLocalePageProps): Promise<Metadata> {
  const { locale } = await params;

  if (locale === "en") {
    return createAnalyticalDocumentMetadata(analyticalDocuments[0]);
  }

  if (locale === "es") {
    return createSpanishApplicationMetadata("analytical-instruments");
  }

  if (locale === "fr") {
    return createFrenchApplicationMetadata("analytical-instruments");
  }

  if (locale === "ko") {
    return createKoreanApplicationMetadata("analytical-instruments");
  }

  if (locale === "ru") {
    return createRussianApplicationMetadata("analytical-instruments");
  }

  return defaultMetadata;
}

export default async function AnalyticalInstrumentsApplicationLocalePage({
  params,
  searchParams,
}: AnalyticalInstrumentsApplicationLocalePageProps) {
  const { locale } = await params;
  const requestedApplicationParam = (await searchParams).application;
  const requestedApplication = Array.isArray(requestedApplicationParam)
    ? requestedApplicationParam[0]
    : requestedApplicationParam;
  const data = getAnalyticalInstrumentsApplicationPageData(locale);

  if (locale === "en") {
    const hasRequestedApplication = data.applications.some(
      (application) => application.key === requestedApplication,
    );

    if (hasRequestedApplication) {
      return (
        <ApplicationEnglishClient
          key={requestedApplication}
          data={createEnglishApplicationData("analytical-instruments", data)}
        />
      );
    }

    const document = await getEnglishAnalyticalDocument("");
    if (!document) throw new Error("Missing English analytical application overview");
    const landingData = createEnglishApplicationData("analytical-instruments", data);
    return (
      <>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(createAnalyticalDocumentSchema(document)).replace(/</g, "\\u003c") }} />
        <AnalyticalInstrumentsLandingShell data={landingData} showInstrumentNavigation={false}>
          <AnalyticalApplicationDocument document={document} embedded />
        </AnalyticalInstrumentsLandingShell>
      </>
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

  if (locale === "ko") {
    return (
      <SpanishIndustryApplicationClient
        data={data}
        pageClassName="analytical-instruments-page"
        applicationTabsAria="분석 장비 유형"
        uiText={KOREAN_INDUSTRY_UI_TEXT}
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
