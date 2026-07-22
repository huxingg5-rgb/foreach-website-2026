import type { Metadata } from "next";
import { notFound } from "next/navigation";

import ProductDetailClient from "@/components/products/detail/ProductDetailClient";
import {
  getQuickConnectSeriesDetailData,
  getQuickConnectSeriesMetadata,
} from "@/data/products/detail/getQuickConnectSeriesDetailData";

const SERIES =
  "Q60";

export const metadata: Metadata =
  getQuickConnectSeriesMetadata(
    SERIES
  );

export default function QuickConnectSeriesDetailPage() {
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
      data={
        data as any
      }
    />
  );
}