import ApplicationPageSkeleton from "@/components/common/ApplicationPageSkeleton";
import { Suspense } from "react";
/* =========================================================
   page.tsx
   恒永达官网｜外语 IVD 应用领域页入口

   路径：
   /en/applications/ivd
   /es/applications/ivd
   /fr/applications/ivd
   /ko/applications/ivd
   /ru/applications/ivd

   说明：
   1. 中文不走这里，中文走 app/applications/ivd/page.tsx
   2. 外语动态路由需要 generateStaticParams，方便静态导出
   3. 当前外语内容为第一版占位，后续再补正式翻译
========================================================= */

import type { Metadata } from "next";
import { notFound } from "next/navigation";

import IvdApplicationClient from "@/components/applications/ivd/IvdApplicationClient";
import { getIvdApplicationPageData } from "@/services/applications/ivd/getIvdApplicationPageData";

import "../../../applications/ivd/ivd-application.css";

const IVD_LOCALES = ["en", "es", "fr", "ko", "ru"] as const;

type IvdLocaleParam = (typeof IVD_LOCALES)[number];

type IvdLocalePageProps = {
  params: Promise<{
    locale: string;
  }>;
};

export const metadata: Metadata = {
  title: "IVD Fluidic System Solutions｜FOREACH",
  description:
    "FOREACH provides pumps, valves, fittings, tubing and sensors for IVD fluidic systems.",
};

export function generateStaticParams() {
  return IVD_LOCALES.map((locale) => ({
    locale,
  }));
}

function isIvdLocale(locale: string): locale is IvdLocaleParam {
  return IVD_LOCALES.includes(locale as IvdLocaleParam);
}

export default async function IvdLocaleApplicationPage({ params }: IvdLocalePageProps) {
  const { locale } = await params;

  if (!isIvdLocale(locale)) {
    notFound();
  }

  const pageData = getIvdApplicationPageData(locale);

  return (
    <Suspense fallback={<ApplicationPageSkeleton />}>
      <IvdApplicationClient data={pageData} />
    </Suspense>
  );
}