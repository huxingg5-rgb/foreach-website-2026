/* =========================================================
   page.tsx
   恒永达官网｜环保监测应用领域外语页面入口
========================================================= */

import type { Metadata } from "next";

import EnvironmentalMonitoringApplicationClient from "@/components/applications/environmental-monitoring/EnvironmentalMonitoringApplicationClient";
import { getEnvironmentalMonitoringApplicationPageData } from "@/services/applications/environmental-monitoring/getEnvironmentalMonitoringApplicationPageData";

import "@/app/applications/environmental-monitoring/environmental-monitoring-application.css";

const ENABLED_LOCALES = ["en", "es", "fr", "ko", "ru"] as const;

type EnvironmentalMonitoringApplicationLocalePageProps = {
  params: Promise<{
    locale: string;
  }>;
};

export function generateStaticParams() {
  return ENABLED_LOCALES.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title: "Environmental Monitoring Applications｜FOREACH",
  description:
    "FOREACH provides pumps, valves, fittings, tubing, sensors and fluidic system support for environmental monitoring systems.",
};

export default async function EnvironmentalMonitoringApplicationLocalePage({
  params,
}: EnvironmentalMonitoringApplicationLocalePageProps) {
  const { locale } = await params;
  const data = getEnvironmentalMonitoringApplicationPageData(locale);

  return <EnvironmentalMonitoringApplicationClient data={data} />;
}