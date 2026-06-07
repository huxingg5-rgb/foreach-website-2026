/* =========================================================
   page.tsx
   恒永达官网｜接头替代查询 Q20 详情页入口

   文件路径：
   app/resources/selection-support/fitting-replacement/q20/[productCode]/page.tsx

   页面路径：
   /resources/selection-support/fitting-replacement/q20/[productCode]

   作用：
   1. 中文 Q20 接头替代查询详情页入口
   2. 中文页面固定传 locale = zh
   3. 根据商品编码读取产品详情
   4. 渲染 FittingReplacementDetail 客户端组件
========================================================= */

import type { Metadata } from "next";
import { notFound } from "next/navigation";

import FittingReplacementDetail from "@/components/resources/fitting-replacement/FittingReplacementDetail";

import { Q20_FITTING_REPLACEMENT_SERIES_CONFIG } from "@/data/resources/fitting-replacement/fitting-replacement-series.config";

import {
  getFittingReplacementDetailData,
  getFittingReplacementDetailStaticParams,
} from "@/services/resources/getFittingReplacementDetailData";

import "./fitting-replacement-detail.css";

/* 当前详情页系列配置 */
const SERIES_CONFIG = Q20_FITTING_REPLACEMENT_SERIES_CONFIG;

/* 中文详情页语言 */
const PAGE_LOCALE = "zh";

interface FittingReplacementDetailPageProps {
  params: Promise<{
    productCode: string;
  }>;
}

/* =========================================================
   静态导出路径
========================================================= */
export function generateStaticParams() {
  return getFittingReplacementDetailStaticParams(SERIES_CONFIG.seriesKey);
}

/* =========================================================
   页面 SEO 信息
========================================================= */
export async function generateMetadata({
  params,
}: FittingReplacementDetailPageProps): Promise<Metadata> {
  const { productCode } = await params;

  const pageData = await getFittingReplacementDetailData(
    productCode,
    SERIES_CONFIG.seriesKey,
    PAGE_LOCALE
  );

  if (!pageData) {
    return {
      title: "接头详情｜恒永达",
    };
  }

  return {
    title: `${pageData.product.foreachModel}｜${SERIES_CONFIG.productName}｜恒永达`,
    description: `查看 ${pageData.product.foreachModel} 的商品编码、兼容编码、型号解析和 2D 图纸信息。`,
  };
}

/* =========================================================
   中文 Q20 详情页
========================================================= */
export default async function FittingReplacementDetailPage({
  params,
}: FittingReplacementDetailPageProps) {
  const { productCode } = await params;

  const pageData = await getFittingReplacementDetailData(
    productCode,
    SERIES_CONFIG.seriesKey,
    PAGE_LOCALE
  );

  if (!pageData) {
    notFound();
  }

  return <FittingReplacementDetail data={pageData} />;
} 