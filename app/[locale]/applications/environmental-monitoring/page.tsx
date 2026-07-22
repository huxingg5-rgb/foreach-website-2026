/* =========================================================
   page.tsx
   恒永达官网｜环保监测应用领域外语页面入口
========================================================= */

import type { Metadata } from "next";

import ApplicationEnglishClient from "@/components/applications/ApplicationEnglishClient";
import FrenchIndustryApplicationClient from "@/components/applications/FrenchIndustryApplicationClient";
import RussianIndustryApplicationClient from "@/components/applications/RussianIndustryApplicationClient";
import SpanishIndustryApplicationClient, { KOREAN_INDUSTRY_UI_TEXT } from "@/components/applications/SpanishIndustryApplicationClient";
import EnvironmentalMonitoringApplicationClient from "@/components/applications/environmental-monitoring/EnvironmentalMonitoringApplicationClient";
import { createEnglishApplicationData } from "@/data/applications/application-english";
import { createFrenchApplicationMetadata } from "@/data/applications/application-french-metadata";
import { createRussianApplicationMetadata } from "@/data/applications/application-russian-metadata";
import { createSpanishApplicationMetadata } from "@/data/applications/application-spanish-metadata";
import { createKoreanApplicationMetadata } from "@/data/applications/application-korean-metadata";
import { getEnvironmentalMonitoringApplicationPageData } from "@/services/applications/environmental-monitoring/getEnvironmentalMonitoringApplicationPageData";

import "@/app/applications/environmental-monitoring/environmental-monitoring-application.css";
import "@/app/applications/ivd/ivd-application.css";

const ENABLED_LOCALES = ["en", "es", "fr", "ko", "ru"] as const;

type EnvironmentalMonitoringApplicationLocalePageProps = {
  params: Promise<{
    locale: string;
  }>;
};

export function generateStaticParams() {
  return ENABLED_LOCALES.map((locale) => ({ locale }));
}

const defaultMetadata: Metadata = {
  title: "Environmental Monitoring Applications｜FOREACH",
  description:
    "FOREACH provides pumps, valves, fittings, tubing, sensors and fluidic system support for environmental monitoring systems.",
};

export async function generateMetadata({
  params,
}: EnvironmentalMonitoringApplicationLocalePageProps): Promise<Metadata> {
  const { locale } = await params;

  if (locale === "es") {
    return createSpanishApplicationMetadata("environmental-monitoring");
  }

  if (locale === "fr") {
    return createFrenchApplicationMetadata("environmental-monitoring");
  }

  if (locale === "ko") {
    return createKoreanApplicationMetadata("environmental-monitoring");
  }

  if (locale === "ru") {
    return createRussianApplicationMetadata("environmental-monitoring");
  }

  return defaultMetadata;
}

export default async function EnvironmentalMonitoringApplicationLocalePage({
  params,
}: EnvironmentalMonitoringApplicationLocalePageProps) {
  const { locale } = await params;
  const data = getEnvironmentalMonitoringApplicationPageData(locale);

  if (locale === "en") {
    return (
      <ApplicationEnglishClient
        data={createEnglishApplicationData("environmental-monitoring", data)}
      />
    );
  }

  if (locale === "es") {
    return (
      <SpanishIndustryApplicationClient
        data={data}
        pageClassName="environmental-monitoring-page"
        applicationTabsAria="Tipos de sistemas de monitoreo ambiental"
      />
    );
  }

  if (locale === "fr") {
    return (
      <FrenchIndustryApplicationClient
        data={data}
        pageClassName="environmental-monitoring-page"
        applicationTabsAria="Types de surveillance environnementale"
      />
    );
  }

  if (locale === "ko") {
    return (
      <SpanishIndustryApplicationClient
        data={data}
        pageClassName="environmental-monitoring-page"
        applicationTabsAria="환경 모니터링 장비 유형"
        uiText={KOREAN_INDUSTRY_UI_TEXT}
      />
    );
  }

  if (locale === "ru") {
    return (
      <RussianIndustryApplicationClient
        data={data}
        pageClassName="environmental-monitoring-page"
        applicationTabsAria="Типы оборудования экологического мониторинга"
      />
    );
  }

  return <EnvironmentalMonitoringApplicationClient data={data} />;
}
