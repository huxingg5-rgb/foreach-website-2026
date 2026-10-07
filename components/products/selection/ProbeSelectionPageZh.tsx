import { Suspense } from "react";
import type { Metadata } from "next";
import ProductPageSkeleton from "@/components/common/ProductPageSkeleton";
import ProductSelectionClient from "./ProductSelectionClient";
import { probeIntrosZh, probeOverviewHeadingZh, probeOverviewParagraphsZh, getProbeSelectionPathZh } from "@/data/products/selection/probe-selection.zh";
import "@/app/products/products.css";

export function getProbeSelectionMetadataZh(productTypeId?: string): Metadata {
  const intro = productTypeId ? probeIntrosZh[productTypeId] : undefined;
  const canonical = getProbeSelectionPathZh(productTypeId);
  return {
    title: { absolute: `${intro?.title || probeOverviewHeadingZh} | 恒永达` },
    description: (intro?.paragraphs || probeOverviewParagraphsZh)[0],
    alternates: {
      canonical,
      languages: { "zh-CN": canonical, "en-US": `/en${canonical}`, "x-default": canonical },
    },
  };
}

export default function ProbeSelectionPageZh({ productTypeId }: { productTypeId?: string }) {
  return <Suspense fallback={<ProductPageSkeleton variant="selection" />}>
    <ProductSelectionClient locale="zh" initialCategoryId="needles" initialProductTypeId={productTypeId} />
  </Suspense>;
}
