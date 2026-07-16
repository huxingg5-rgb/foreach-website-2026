/* =========================================================
   page.tsx
   恒永达官网｜分析仪器应用领域外语页面入口
========================================================= */

import type { Metadata } from "next";

import ApplicationEnglishClient from "@/components/applications/ApplicationEnglishClient";
import AnalyticalInstrumentsApplicationClient from "@/components/applications/analytical-instruments/AnalyticalInstrumentsApplicationClient";
import { createEnglishApplicationData } from "@/data/applications/application-english";
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

export const metadata: Metadata = {
  title: "Analytical Instruments Applications｜FOREACH",
  description:
    "FOREACH provides pumps, valves, fittings, tubing, sensors and fluidic system support for analytical instruments.",
};

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

  return <AnalyticalInstrumentsApplicationClient data={data} />;
}
