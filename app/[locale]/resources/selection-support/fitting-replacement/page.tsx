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
   2. 让外语资源中心路径先能正常访问
   3. 当前阶段先复用中文 Q20 数据
   4. 当前阶段先复用中文 FittingReplacementHome 组件
   5. 后续真正多语言时，优先改 service / data，不改组件结构

   注意：
   1. 中文页面仍然走：
      app/resources/selection-support/fitting-replacement/page.tsx
   2. 中文默认不加 /zh-CN
   3. 外语页面统一走 /[locale]/...
   4. 如果 next.config.js 使用 output: "export"，
      必须保留 generateStaticParams()
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

   说明：
   1. 当前项目使用较新的 Next.js 写法
   2. params 按 Promise 处理更稳
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

   说明：
   如果 next.config.js 使用 output: "export"，
   外语动态路由必须提前生成所有 locale。
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
   1. 当前阶段先使用英文 SEO
   2. 后续真正做多语言时，可以根据 locale 返回不同语言标题
   3. 页面内容当前仍然复用中文 Q20 数据
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

  return {
    title: `Fitting Replacement Search｜Selection Support｜FOREACH`,
    description: `Search by competitor model, product code, or FOREACH model to find matching ${SERIES_CONFIG.productName} products and model details.`,
  };
}

/* =========================================================
   多语言接头替代查询页面

   说明：
   1. 当前先复用中文 Q20 数据
   2. 后续如果接入真正多语言数据，可以改成：
      getFittingReplacementHomeData(SERIES_CONFIG.seriesKey, locale)
   3. 这里不写搜索、筛选、分页、清单逻辑
========================================================= */
export default async function FittingReplacementLocalePage({
  params,
}: FittingReplacementLocalePageProps) {
  const { locale } = await params;

  if (!isSupportedLocale(locale)) {
    notFound();
  }

  const pageData = await getFittingReplacementHomeData(
    SERIES_CONFIG.seriesKey
  );

  return <FittingReplacementHome data={pageData} />;
} 