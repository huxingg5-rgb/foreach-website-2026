/* =========================================================
   page.tsx
   恒永达官网｜生命科学应用领域外语页面入口

   文件路径：
   app/[locale]/applications/life-science/page.tsx

   说明：
   1. 外语路径：/en/applications/life-science 等
   2. 英文沿用现有页面，西班牙语使用正式本地化内容
   3. generateStaticParams 用于静态导出
========================================================= */

import type { Metadata } from "next";

import ApplicationEnglishClient from "@/components/applications/ApplicationEnglishClient";
import FrenchIndustryApplicationClient from "@/components/applications/FrenchIndustryApplicationClient";
import RussianIndustryApplicationClient from "@/components/applications/RussianIndustryApplicationClient";
import SpanishIndustryApplicationClient, { KOREAN_INDUSTRY_UI_TEXT } from "@/components/applications/SpanishIndustryApplicationClient";
import LifeScienceApplicationClient from "@/components/applications/life-science/LifeScienceApplicationClient";
import { createEnglishApplicationData } from "@/data/applications/application-english";
import { createFrenchApplicationMetadata } from "@/data/applications/application-french-metadata";
import { createRussianApplicationMetadata } from "@/data/applications/application-russian-metadata";
import { createSpanishApplicationMetadata } from "@/data/applications/application-spanish-metadata";
import { createKoreanApplicationMetadata } from "@/data/applications/application-korean-metadata";
import { getLifeScienceApplicationPageData } from "@/services/applications/life-science/getLifeScienceApplicationPageData";

import "@/app/applications/life-science/life-science-application.css";
import "@/app/applications/ivd/ivd-application.css";

const ENABLED_LOCALES = ["en", "es", "fr", "ko", "ru"] as const;

type LifeScienceApplicationLocalePageProps = {
  params: Promise<{
    locale: string;
  }>;
};

export function generateStaticParams() {
  return ENABLED_LOCALES.map((locale) => ({ locale }));
}

const defaultMetadata: Metadata = {
  title: "Life Science Applications｜FOREACH",
  description:
    "FOREACH provides pumps, valves, fittings, tubing, sensors and fluidic system support for life science instruments.",
};

export async function generateMetadata({
  params,
}: LifeScienceApplicationLocalePageProps): Promise<Metadata> {
  const { locale } = await params;

  if (locale === "es") {
    return createSpanishApplicationMetadata("life-science");
  }

  if (locale === "fr") {
    return createFrenchApplicationMetadata("life-science");
  }

  if (locale === "ko") {
    return createKoreanApplicationMetadata("life-science");
  }

  if (locale === "ru") {
    return createRussianApplicationMetadata("life-science");
  }

  return defaultMetadata;
}

export default async function LifeScienceApplicationLocalePage({
  params,
}: LifeScienceApplicationLocalePageProps) {
  const { locale } = await params;
  const data = getLifeScienceApplicationPageData(locale);

  if (locale === "en") {
    return (
      <ApplicationEnglishClient
        data={createEnglishApplicationData("life-science", data)}
      />
    );
  }

  if (locale === "es") {
    return (
      <SpanishIndustryApplicationClient
        data={data}
        pageClassName="life-science-page"
        applicationTabsAria="Tipos de aplicaciones de ciencias de la vida"
      />
    );
  }

  if (locale === "fr") {
    return (
      <FrenchIndustryApplicationClient
        data={data}
        pageClassName="life-science-page"
        applicationTabsAria="Types d’applications en sciences de la vie"
      />
    );
  }

  if (locale === "ko") {
    return (
      <SpanishIndustryApplicationClient
        data={data}
        pageClassName="life-science-page"
        applicationTabsAria="생명과학 응용 유형"
        uiText={KOREAN_INDUSTRY_UI_TEXT}
      />
    );
  }

  if (locale === "ru") {
    return (
      <RussianIndustryApplicationClient
        data={data}
        pageClassName="life-science-page"
        applicationTabsAria="Типы применений в области наук о жизни"
      />
    );
  }

  return <LifeScienceApplicationClient data={data} />;
}
