/* =========================================================
   page.tsx
   恒永达官网｜合成生物应用领域外语页面入口
========================================================= */

import type { Metadata } from "next";

import ApplicationEnglishClient from "@/components/applications/ApplicationEnglishClient";
import SyntheticBiologyApplicationClient from "@/components/applications/synthetic-biology/SyntheticBiologyApplicationClient";
import { createEnglishApplicationData } from "@/data/applications/application-english";
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

export const metadata: Metadata = {
  title: "Synthetic Biology Applications｜FOREACH",
  description:
    "FOREACH provides pumps, valves, fittings, tubing, sensors and fluidic system support for synthetic biology systems.",
};

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

  return <SyntheticBiologyApplicationClient data={data} />;
}
