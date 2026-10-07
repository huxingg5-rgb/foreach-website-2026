import { Suspense } from "react";
import type { Metadata } from "next";
import ProductPageSkeleton from "@/components/common/ProductPageSkeleton";
import ProductSelectionClient from "./ProductSelectionClient";
import { controlIntrosZh, controlOverviewHeadingZh, controlOverviewParagraphsZh, getControlSelectionPathZh } from "@/data/products/selection/control-selection.zh";
import "@/app/products/products.css";

export function getControlSelectionMetadataZh(productTypeId?: string): Metadata {
  const intro = productTypeId ? controlIntrosZh[productTypeId] : undefined;
  return {
    title: `${intro?.title || controlOverviewHeadingZh} | FOREACH`,
    description: (intro?.paragraphs || controlOverviewParagraphsZh).join(" "),
    alternates: { canonical: getControlSelectionPathZh(productTypeId) },
  };
}

export default function ControlSelectionPageZh({ productTypeId }: { productTypeId?: string }) {
  return <Suspense fallback={<ProductPageSkeleton variant="selection" />}>
    <ProductSelectionClient locale="zh" initialCategoryId="control" initialProductTypeId={productTypeId} />
  </Suspense>;
}
