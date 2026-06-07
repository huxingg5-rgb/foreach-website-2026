/* =========================================================
   page.tsx
   恒永达官网｜多语言接头替代查询 Q20 详情页入口

   文件路径：
   app/[locale]/resources/selection-support/fitting-replacement/q20/[productCode]/page.tsx

   页面路径：
   /en/resources/selection-support/fitting-replacement/q20/[productCode]
   /es/resources/selection-support/fitting-replacement/q20/[productCode]
   /fr/resources/selection-support/fitting-replacement/q20/[productCode]
   /ko/resources/selection-support/fitting-replacement/q20/[productCode]
   /ru/resources/selection-support/fitting-replacement/q20/[productCode]

   作用：
   1. 外语 Q20 接头替代查询详情页入口
   2. 根据 locale 读取详情页多语言文案
   3. 产品数据仍然复用 Q20 静态产品数据
========================================================= */

import type { Metadata } from "next";
import { notFound } from "next/navigation";

import FittingReplacementDetail from "@/components/resources/fitting-replacement/FittingReplacementDetail";

import { Q20_FITTING_REPLACEMENT_SERIES_CONFIG } from "@/data/resources/fitting-replacement/fitting-replacement-series.config";

import {
  getFittingReplacementDetailData,
  getFittingReplacementDetailStaticParams,
} from "@/services/resources/getFittingReplacementDetailData";

import "../../../../../../resources/selection-support/fitting-replacement/q20/[productCode]/fitting-replacement-detail.css";

/* 官网当前支持的外语语言 */
const FITTING_REPLACEMENT_DETAIL_LOCALES = [
  "en",
  "es",
  "fr",
  "ko",
  "ru",
] as const;

type FittingReplacementDetailLocale =
  (typeof FITTING_REPLACEMENT_DETAIL_LOCALES)[number];

/* 当前详情页系列配置 */
const SERIES_CONFIG = Q20_FITTING_REPLACEMENT_SERIES_CONFIG;

interface FittingReplacementLocaleDetailPageProps {
  params: Promise<{
    locale: string;
    productCode: string;
  }>;
}

/* =========================================================
   判断是否为支持语言
========================================================= */
function isSupportedLocale(
  locale: string
): locale is FittingReplacementDetailLocale {
  return FITTING_REPLACEMENT_DETAIL_LOCALES.includes(
    locale as FittingReplacementDetailLocale
  );
}

/* =========================================================
   静态导出路径
========================================================= */
export function generateStaticParams() {
  const productParams = getFittingReplacementDetailStaticParams(
    SERIES_CONFIG.seriesKey
  );

  return FITTING_REPLACEMENT_DETAIL_LOCALES.flatMap((locale) => {
    return productParams.map((product) => {
      return {
        locale,
        productCode: product.productCode,
      };
    });
  });
}

/* =========================================================
   多语言页面 SEO 信息
========================================================= */
export async function generateMetadata({
  params,
}: FittingReplacementLocaleDetailPageProps): Promise<Metadata> {
  const { locale, productCode } = await params;

  if (!isSupportedLocale(locale)) {
    return {
      title: "Fitting Detail｜FOREACH",
    };
  }

  const pageData = await getFittingReplacementDetailData(
    productCode,
    SERIES_CONFIG.seriesKey,
    locale
  );

  if (!pageData) {
    return {
      title: "Fitting Detail｜FOREACH",
    };
  }

  return {
    title: `${pageData.product.foreachModel}｜${SERIES_CONFIG.productName}｜FOREACH`,
    description: `View product code, compatible models, model details, and 2D drawing information for ${pageData.product.foreachModel}.`,
  };
}

/* =========================================================
   多语言 Q20 详情页
========================================================= */
export default async function FittingReplacementLocaleDetailPage({
  params,
}: FittingReplacementLocaleDetailPageProps) {
  const { locale, productCode } = await params;

  if (!isSupportedLocale(locale)) {
    notFound();
  }

  const pageData = await getFittingReplacementDetailData(
    productCode,
    SERIES_CONFIG.seriesKey,
    locale
  );

  if (!pageData) {
    notFound();
  }

  return <FittingReplacementDetail data={pageData} />;
} 