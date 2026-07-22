/* =========================================================
   page.tsx
   恒永达官网｜多语言接头替代查询页面入口

   文件路径：
   app/[locale]/resources/selection-support/fitting-replacement/page.tsx

   页面路径：
   /en/resources/selection-support/fitting-replacement
   /es/resources/selection-support/fitting-replacement
   /fr/resources/selection-support/fitting-replacement
   /ko/resources/selection-support/fitting-replacement
   /ru/resources/selection-support/fitting-replacement

   作用：
   1. 作为外语接头替代查询页面入口
   2. 当前加载 Q20 快插接头数据
   3. 产品数据仍然复用 q20.zh.ts
   4. 首页文案根据 locale 从 q20.page.intl.ts 读取
   5. 后续真正多语言产品字段，可以继续扩展 service
========================================================= */

import type { Metadata } from "next";
import { notFound } from "next/navigation";

import FittingReplacementHome from "@/components/resources/fitting-replacement/FittingReplacementHome";

import { Q20_FITTING_REPLACEMENT_SERIES_CONFIG } from "@/data/resources/fitting-replacement/fitting-replacement-series.config";

import { getFittingReplacementHomeData } from "@/services/resources/getFittingReplacementHomeData";

import "../../../../resources/selection-support/fitting-replacement/fitting-replacement.css";

/* =========================================================
   官网当前支持的外语语言

   说明：
   1. 中文不写在这里
   2. 中文页面走 app/resources/...
   3. 外语页面走 app/[locale]/...
========================================================= */
const FITTING_REPLACEMENT_LOCALES = ["en", "es", "fr", "ko", "ru"] as const;

type FittingReplacementLocale = (typeof FITTING_REPLACEMENT_LOCALES)[number];

/* 当前页面暂时使用 Q20 系列配置 */
const SERIES_CONFIG = Q20_FITTING_REPLACEMENT_SERIES_CONFIG;

/* =========================================================
   页面参数类型
========================================================= */
interface FittingReplacementLocalePageProps {
  params: Promise<{
    locale: string;
  }>;
}

/* =========================================================
   判断是否为支持的外语语言
========================================================= */
function isSupportedLocale(locale: string): locale is FittingReplacementLocale {
  return FITTING_REPLACEMENT_LOCALES.includes(
    locale as FittingReplacementLocale
  );
}

/* =========================================================
   静态导出参数
========================================================= */
export function generateStaticParams() {
  return FITTING_REPLACEMENT_LOCALES.map((locale) => {
    return {
      locale,
    };
  });
}

/* =========================================================
   多语言页面 SEO 信息

   说明：
   1. 当前先根据 locale 返回基础 SEO
   2. 具体页面内容由 service 读取对应语言文案
========================================================= */
export async function generateMetadata({
  params,
}: FittingReplacementLocalePageProps): Promise<Metadata> {
  const { locale } = await params;

  if (!isSupportedLocale(locale)) {
    return {
      title: "Fitting Replacement Search｜FOREACH",
    };
  }

  const pageData = await getFittingReplacementHomeData(
    SERIES_CONFIG.seriesKey,
    locale
  );

  const sectionLabels = {
    en: "Selection Support",
    es: "Asistencia para la selección",
    fr: "Aide à la sélection",
    ko: "선정 지원",
    ru: "Поддержка подбора",
  } as const;
  const metadata = {
    title: `${pageData.banner.title}｜${sectionLabels[locale]}｜FOREACH`,
    description: pageData.banner.description,
  };

  return locale === "en" ? metadata : { ...metadata, openGraph: metadata };
}

/* =========================================================
   多语言接头替代查询页面
========================================================= */
export default async function FittingReplacementLocalePage({
  params,
}: FittingReplacementLocalePageProps) {
  const { locale } = await params;

  if (!isSupportedLocale(locale)) {
    notFound();
  }

  const pageData = await getFittingReplacementHomeData(
    SERIES_CONFIG.seriesKey,
    locale
  );

  return <FittingReplacementHome data={pageData} />;
}
