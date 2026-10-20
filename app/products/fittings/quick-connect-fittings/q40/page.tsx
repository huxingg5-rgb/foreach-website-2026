import type { Metadata } from "next";
import type { ComponentProps } from "react";
import { notFound } from "next/navigation";

import ProductDetailClient from "@/components/products/detail/ProductDetailClient";
import QuickConnectRelatedArticles from "@/components/products/detail/QuickConnectRelatedArticles";
import type { TechnicalArticleLocale } from "@/data/resources/technical-articles/technical-articles.types";
import {
  getQuickConnectSeriesDetailData,
  getQuickConnectSeriesMetadata,
} from "@/data/products/detail/getQuickConnectSeriesDetailData";

const SERIES =
  "Q40";

export const metadata: Metadata =
  getQuickConnectSeriesMetadata(
    SERIES
  );

export default function QuickConnectSeriesDetailPage({ renderLocale = "zh-CN" }: { renderLocale?: TechnicalArticleLocale }) {
  const data =
    getQuickConnectSeriesDetailData(
      SERIES
    );

  if (
    !data
  ) {
    notFound();
  }

  return (
    <ProductDetailClient
      afterContent={<QuickConnectRelatedArticles model={SERIES} locale={renderLocale} />}
      data={
        data as ComponentProps<typeof ProductDetailClient>["data"]
      }
    />
  );
}
