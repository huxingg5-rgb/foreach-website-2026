import { Suspense } from "react";
import type { Metadata } from "next";
import ProductPageSkeleton from "@/components/common/ProductPageSkeleton";
import ProductSelectionClient from "./ProductSelectionClient";
import { controlIntrosZh, controlOverviewHeadingZh, controlOverviewParagraphsZh, getControlSelectionPathZh } from "@/data/products/selection/control-selection.zh";
import "@/app/products/products.css";

export function getControlSelectionMetadataZh(productTypeId?: string): Metadata {
  const intro = productTypeId ? controlIntrosZh[productTypeId] : undefined;
  const canonical = getControlSelectionPathZh(productTypeId);
  return {
    title: { absolute: `${intro?.title || controlOverviewHeadingZh} | 恒永达` },
    description: (intro?.paragraphs || controlOverviewParagraphsZh)[0],
    alternates: {
      canonical,
      languages: { "zh-CN": canonical, "en-US": `/en${canonical}`, "x-default": canonical },
    },
  };
}

export default function ControlSelectionPageZh({ productTypeId }: { productTypeId?: string }) {
  return <Suspense fallback={<ProductPageSkeleton variant="selection" />}>
    <ProductSelectionClient locale="zh" initialCategoryId="control" initialProductTypeId={productTypeId} />
  </Suspense>;
}
