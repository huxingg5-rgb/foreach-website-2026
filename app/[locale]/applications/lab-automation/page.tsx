/* =========================================================
   page.tsx
   恒永达官网｜实验室自动化应用领域外语页面入口

   文件路径：
   app/[locale]/applications/lab-automation/page.tsx

   说明：
   1. 外语路径：/en/applications/lab-automation 等
   2. 英文沿用现有页面，西班牙语使用正式本地化内容
   3. generateStaticParams 用于静态导出
========================================================= */

import type { Metadata } from "next";

import ApplicationEnglishClient from "@/components/applications/ApplicationEnglishClient";
import FrenchIndustryApplicationClient from "@/components/applications/FrenchIndustryApplicationClient";
import RussianIndustryApplicationClient from "@/components/applications/RussianIndustryApplicationClient";
import SpanishIndustryApplicationClient, { KOREAN_INDUSTRY_UI_TEXT } from "@/components/applications/SpanishIndustryApplicationClient";
import LabAutomationApplicationClient from "@/components/applications/lab-automation/LabAutomationApplicationClient";
import { createEnglishApplicationData } from "@/data/applications/application-english";
import { createFrenchApplicationMetadata } from "@/data/applications/application-french-metadata";
import { createRussianApplicationMetadata } from "@/data/applications/application-russian-metadata";
import { createSpanishApplicationMetadata } from "@/data/applications/application-spanish-metadata";
import { createKoreanApplicationMetadata } from "@/data/applications/application-korean-metadata";
import { getLabAutomationApplicationPageData } from "@/services/applications/lab-automation/getLabAutomationApplicationPageData";

import "@/app/applications/lab-automation/lab-automation-application.css";
import "@/app/applications/ivd/ivd-application.css";

const ENABLED_LOCALES = ["en", "es", "fr", "ko", "ru"] as const;

type LabAutomationApplicationLocalePageProps = {
  params: Promise<{
    locale: string;
  }>;
};

export function generateStaticParams() {
  return ENABLED_LOCALES.map((locale) => ({ locale }));
}

const defaultMetadata: Metadata = {
  title: "Laboratory Automation Applications｜FOREACH",
  description:
    "FOREACH provides pumps, valves, fittings, tubing, sensors and fluidic system support for laboratory automation systems.",
};

export async function generateMetadata({
  params,
}: LabAutomationApplicationLocalePageProps): Promise<Metadata> {
  const { locale } = await params;

  if (locale === "es") {
    return createSpanishApplicationMetadata("lab-automation");
  }

  if (locale === "fr") {
    return createFrenchApplicationMetadata("lab-automation");
  }

  if (locale === "ko") {
    return createKoreanApplicationMetadata("lab-automation");
  }

  if (locale === "ru") {
    return createRussianApplicationMetadata("lab-automation");
  }

  return defaultMetadata;
}

export default async function LabAutomationApplicationLocalePage({
  params,
}: LabAutomationApplicationLocalePageProps) {
  const { locale } = await params;
  const data = getLabAutomationApplicationPageData(locale);

  if (locale === "en") {
    return (
      <ApplicationEnglishClient
        data={createEnglishApplicationData("lab-automation", data)}
      />
    );
  }

  if (locale === "es") {
    return (
      <SpanishIndustryApplicationClient
        data={data}
        pageClassName="lab-automation-page"
        applicationTabsAria="Tipos de equipos de automatización de laboratorio"
      />
    );
  }

  if (locale === "fr") {
    return (
      <FrenchIndustryApplicationClient
        data={data}
        pageClassName="lab-automation-page"
        applicationTabsAria="Types d’équipements d’automatisation de laboratoire"
      />
    );
  }

  if (locale === "ko") {
    return (
      <SpanishIndustryApplicationClient
        data={data}
        pageClassName="lab-automation-page"
        applicationTabsAria="실험실 자동화 장비 유형"
        uiText={KOREAN_INDUSTRY_UI_TEXT}
      />
    );
  }

  if (locale === "ru") {
    return (
      <RussianIndustryApplicationClient
        data={data}
        pageClassName="lab-automation-page"
        applicationTabsAria="Типы оборудования для лабораторной автоматизации"
      />
    );
  }

  return <LabAutomationApplicationClient data={data} />;
}
