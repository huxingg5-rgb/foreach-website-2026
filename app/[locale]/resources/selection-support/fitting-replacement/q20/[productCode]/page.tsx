/* =========================================================
   page.tsx
   恒永达官网｜多语言 Q20 接头替代详情页入口

   文件路径：
   app/[locale]/resources/selection-support/fitting-replacement/q20/[productCode]/page.tsx

   页面路径示例：
   /en/resources/selection-support/fitting-replacement/q20/839085
   /es/resources/selection-support/fitting-replacement/q20/839085
   /fr/resources/selection-support/fitting-replacement/q20/839085
   /ko/resources/selection-support/fitting-replacement/q20/839085
   /ru/resources/selection-support/fitting-replacement/q20/839085

   作用：
   1. 作为外语 Q20 接头替代详情页入口
   2. 当前阶段先复用中文 Q20 静态数据
   3. 当前阶段先复用中文详情页组件
   4. 避免外语路径进入详情页时 404
   5. 为后续真正多语言详情页预留结构

   注意：
   1. 中文详情页仍然走：
      app/resources/selection-support/fitting-replacement/q20/[productCode]/page.tsx
   2. 中文默认不加 /zh-CN
   3. 外语页面统一走 /[locale]/...
   4. 如果 next.config.js 使用 output: "export"，
      必须保留 generateStaticParams()
========================================================= */

import type { Metadata } from "next";
import { notFound } from "next/navigation";

import FittingReplacementDetail from "@/components/resources/fitting-replacement/FittingReplacementDetail";

import { Q20_FITTING_REPLACEMENT_SERIES_CONFIG } from "@/data/resources/fitting-replacement/fitting-replacement-series.config";

import {
  getFittingReplacementDetailData,
  getFittingReplacementDetailStaticParams,
} from "@/services/resources/getFittingReplacementDetailData";

/* 复用中文详情页样式，不重新写一套外语 CSS */
import "../../../../../../resources/selection-support/fitting-replacement/fitting-replacement.css";
import "../../../../../../resources/selection-support/fitting-replacement/q20/[productCode]/fitting-replacement-detail.css";

/* =========================================================
   官网当前支持的外语语言

   说明：
   1. 中文不写在这里
   2. 中文页面走 app/resources/...
   3. 外语页面走 app/[locale]/...
========================================================= */
const FITTING_REPLACEMENT_LOCALES = ["en", "es", "fr", "ko", "ru"] as const;

type FittingReplacementLocale = (typeof FITTING_REPLACEMENT_LOCALES)[number];

/* 当前详情页暂时使用 Q20 系列配置 */
const SERIES_CONFIG = Q20_FITTING_REPLACEMENT_SERIES_CONFIG;

/* =========================================================
   页面参数类型

   说明：
   1. 当前项目使用较新的 Next.js 写法
   2. params 按 Promise 处理更稳
========================================================= */
interface FittingReplacementLocaleDetailPageProps {
  params: Promise<{
    locale: string;
    productCode: string;
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
   1. 如果 next.config.js 使用 output: "export"
   2. 外语动态详情页必须提前生成所有：
      locale + productCode
   3. 当前只生成 Q20 商品编码
========================================================= */
export function generateStaticParams() {
  const productParams = getFittingReplacementDetailStaticParams(
    SERIES_CONFIG.seriesKey
  );

  return FITTING_REPLACEMENT_LOCALES.flatMap((locale) => {
    return productParams.map((product) => {
      return {
        locale,
        productCode: product.productCode,
      };
    });
  });
}

/* =========================================================
   多语言详情页 SEO 信息

   说明：
   1. 当前阶段先使用英文 SEO
   2. 页面内容仍然复用中文 Q20 数据
   3. 后续真正做多语言时，可以根据 locale 返回不同语言标题
========================================================= */
export async function generateMetadata({
  params,
}: FittingReplacementLocaleDetailPageProps): Promise<Metadata> {
  const { locale, productCode } = await params;

  if (!isSupportedLocale(locale)) {
    return {
      title: "Fitting Replacement Detail｜FOREACH",
    };
  }

  const pageData = await getFittingReplacementDetailData(
    productCode,
    SERIES_CONFIG.seriesKey
  );

  if (!pageData) {
    return {
      title: "Fitting Replacement Detail｜FOREACH",
    };
  }

  return {
    title: `${pageData.product.foreachModel}｜Fitting Replacement Detail｜FOREACH`,
    description: `View product code, compatible models, and Q20 fitting details for ${pageData.product.foreachModel}.`,
  };
}

/* =========================================================
   多语言 Q20 接头替代详情页

   说明：
   1. 当前先复用中文 Q20 数据
   2. 后续如果接入真正多语言数据，可以改成：
      getFittingReplacementDetailData(
        productCode,
        SERIES_CONFIG.seriesKey,
        locale
      )
   3. 这里不写详情页展示逻辑
   4. 展示逻辑统一交给 FittingReplacementDetail 组件
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
    SERIES_CONFIG.seriesKey
  );

  if (!pageData) {
    notFound();
  }

  return <FittingReplacementDetail data={pageData} />;
} 