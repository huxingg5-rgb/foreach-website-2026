/* =========================================================
   app/products/pumps-db/plunger-pumps/[seriesSlug]/[slug]/page.tsx
   恒永达官网｜泵系列数据库模式预览页

   注意：
   1. 这是数据库模式预览路由
   2. 不影响正式产品详情页
   3. 页面继续使用原 ProductDetailClient 和原 CSS
   4. 数据来源改为泵系列 xlsx 数据库
========================================================= */

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductDetailClient from "@/components/products/detail/ProductDetailClient";
import {
  getPumpSeriesDetailData,
  getPumpSeriesMetadata,
  getPumpSeriesStaticParamsByTypeWithSeries,
} from "@/services/products/getPumpSeriesDetailData";
import { getPumpSeriesProductDetailAdapter } from "@/services/products/adapters/getPumpSeriesProductDetailAdapter";

export const dynamicParams = false;

type RouteParams = {
  seriesSlug: string;
  slug: string;
};

type PageProps = {
  params: Promise<RouteParams> | RouteParams;
};

async function resolveParams(params: PageProps["params"]) {
  return await Promise.resolve(params);
}

export function generateStaticParams() {
  return getPumpSeriesStaticParamsByTypeWithSeries("plunger-pumps");
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await resolveParams(params);
  const metadata = getPumpSeriesMetadata(slug, "zh");

  if (!metadata) {
    return {};
  }

  return metadata as Metadata;
}

export default async function PumpDatabasePreviewPage({ params }: PageProps) {
  const { seriesSlug, slug } = await resolveParams(params);

  const rawData = getPumpSeriesDetailData(slug, "zh");

  if (
    !rawData ||
    rawData.seriesSlug !== seriesSlug ||
    rawData.pumpTypeSlug !== "plunger-pumps"
  ) {
    notFound();
  }

  const adaptedData = getPumpSeriesProductDetailAdapter(slug, "zh");

  if (!adaptedData) {
    notFound();
  }

  return <ProductDetailClient data={adaptedData} />;
}