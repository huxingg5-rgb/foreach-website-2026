/* =========================================================
   page.tsx
   恒永达官网｜实验室自动化应用领域外语页面入口

   文件路径：
   app/[locale]/applications/lab-automation/page.tsx

   说明：
   1. 外语路径：/en/applications/lab-automation 等
   2. 当前外语内容先复用中文占位，后续再补正式翻译
   3. generateStaticParams 用于静态导出
========================================================= */

import type { Metadata } from "next";

import LabAutomationApplicationClient from "@/components/applications/lab-automation/LabAutomationApplicationClient";
import { getLabAutomationApplicationPageData } from "@/services/applications/lab-automation/getLabAutomationApplicationPageData";

import "@/app/applications/lab-automation/lab-automation-application.css";

const ENABLED_LOCALES = ["en", "es", "fr", "ko", "ru"] as const;

type LabAutomationApplicationLocalePageProps = {
  params: Promise<{
    locale: string;
  }>;
};

export function generateStaticParams() {
  return ENABLED_LOCALES.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title: "Laboratory Automation Applications｜FOREACH",
  description:
    "FOREACH provides pumps, valves, fittings, tubing, sensors and fluidic system support for laboratory automation systems.",
};

export default async function LabAutomationApplicationLocalePage({
  params,
}: LabAutomationApplicationLocalePageProps) {
  const { locale } = await params;
  const data = getLabAutomationApplicationPageData(locale);

  return <LabAutomationApplicationClient data={data} />;
}