/* =========================================================
   page.tsx
   恒永达官网｜生命科学应用领域外语页面入口

   文件路径：
   app/[locale]/applications/life-science/page.tsx

   说明：
   1. 外语路径：/en/applications/life-science 等
   2. 当前外语内容先走中文占位，后续再补正式翻译
   3. generateStaticParams 用于静态导出
========================================================= */

import type { Metadata } from "next";

import LifeScienceApplicationClient from "@/components/applications/life-science/LifeScienceApplicationClient";
import { getLifeScienceApplicationPageData } from "@/services/applications/life-science/getLifeScienceApplicationPageData";

import "@/app/applications/life-science/life-science-application.css";

const ENABLED_LOCALES = ["en", "es", "fr", "ko", "ru"] as const;

type LifeScienceApplicationLocalePageProps = {
  params: Promise<{
    locale: string;
  }>;
};

export function generateStaticParams() {
  return ENABLED_LOCALES.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title: "Life Science Applications｜FOREACH",
  description:
    "FOREACH provides pumps, valves, fittings, tubing, sensors and fluidic system support for life science instruments.",
};

export default async function LifeScienceApplicationLocalePage({
  params,
}: LifeScienceApplicationLocalePageProps) {
  const { locale } = await params;
  const data = getLifeScienceApplicationPageData(locale);

  return <LifeScienceApplicationClient data={data} />;
}