import { Suspense } from "react";
import type { Metadata } from "next";
import ProductPageSkeleton from "@/components/common/ProductPageSkeleton";
import ProductSelectionClient from "./ProductSelectionClient";
import { probeIntrosZh, probeOverviewHeadingZh, probeOverviewParagraphsZh, getProbeSelectionPathZh } from "@/data/products/selection/probe-selection.zh";
import "@/app/products/products.css";

export function getProbeSelectionMetadataZh(productTypeId?: string): Metadata {
  const intro = productTypeId ? probeIntrosZh[productTypeId] : undefined;
  return {
    title: `${intro?.title || probeOverviewHeadingZh} | FOREACH`,
    description: (intro?.paragraphs || probeOverviewParagraphsZh).join(" "),
    alternates: { canonical: getProbeSelectionPathZh(productTypeId) },
  };
}

export default function ProbeSelectionPageZh({ productTypeId }: { productTypeId?: string }) {
  return <Suspense fallback={<ProductPageSkeleton variant="selection" />}>
    <ProductSelectionClient locale="zh" initialCategoryId="needles" initialProductTypeId={productTypeId} />
  </Suspense>;
}
