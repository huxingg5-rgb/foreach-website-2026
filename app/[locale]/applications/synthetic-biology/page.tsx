/* =========================================================
   page.tsx
   恒永达官网｜合成生物应用领域外语页面入口
========================================================= */

import type { Metadata } from "next";

import ApplicationEnglishClient from "@/components/applications/ApplicationEnglishClient";
import FrenchIndustryApplicationClient from "@/components/applications/FrenchIndustryApplicationClient";
import RussianIndustryApplicationClient from "@/components/applications/RussianIndustryApplicationClient";
import SpanishIndustryApplicationClient from "@/components/applications/SpanishIndustryApplicationClient";
import SyntheticBiologyApplicationClient from "@/components/applications/synthetic-biology/SyntheticBiologyApplicationClient";
import { createEnglishApplicationData } from "@/data/applications/application-english";
import { createFrenchApplicationMetadata } from "@/data/applications/application-french-metadata";
import { createRussianApplicationMetadata } from "@/data/applications/application-russian-metadata";
import { createSpanishApplicationMetadata } from "@/data/applications/application-spanish-metadata";
import { getSyntheticBiologyApplicationPageData } from "@/services/applications/synthetic-biology/getSyntheticBiologyApplicationPageData";

import "@/app/applications/synthetic-biology/synthetic-biology-application.css";
import "@/app/applications/ivd/ivd-application.css";

const ENABLED_LOCALES = ["en", "es", "fr", "ko", "ru"] as const;

type SyntheticBiologyApplicationLocalePageProps = {
  params: Promise<{
    locale: string;
  }>;
};

export function generateStaticParams() {
  return ENABLED_LOCALES.map((locale) => ({ locale }));
}

const defaultMetadata: Metadata = {
  title: "Synthetic Biology Applications｜FOREACH",
  description:
    "FOREACH provides pumps, valves, fittings, tubing, sensors and fluidic system support for synthetic biology systems.",
};

export async function generateMetadata({
  params,
}: SyntheticBiologyApplicationLocalePageProps): Promise<Metadata> {
  const { locale } = await params;

  if (locale === "es") {
    return createSpanishApplicationMetadata("synthetic-biology");
  }

  if (locale === "fr") {
    return createFrenchApplicationMetadata("synthetic-biology");
  }

  if (locale === "ru") {
    return createRussianApplicationMetadata("synthetic-biology");
  }

  return defaultMetadata;
}

export default async function SyntheticBiologyApplicationLocalePage({
  params,
}: SyntheticBiologyApplicationLocalePageProps) {
  const { locale } = await params;
  const data = getSyntheticBiologyApplicationPageData(locale);

  if (locale === "en") {
    return (
      <ApplicationEnglishClient
        data={createEnglishApplicationData("synthetic-biology", data)}
      />
    );
  }

  if (locale === "es") {
    return (
      <SpanishIndustryApplicationClient
        data={data}
        pageClassName="synthetic-biology-page"
        applicationTabsAria="Tipos de sistemas de biología sintética"
      />
    );
  }

  if (locale === "fr") {
    return (
      <FrenchIndustryApplicationClient
        data={data}
        pageClassName="synthetic-biology-page"
        applicationTabsAria="Types de systèmes de biologie synthétique"
      />
    );
  }

  if (locale === "ru") {
    return (
      <RussianIndustryApplicationClient
        data={data}
        pageClassName="synthetic-biology-page"
        applicationTabsAria="Типы систем синтетической биологии"
      />
    );
  }

  return <SyntheticBiologyApplicationClient data={data} />;
}
