import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import ProductSelectionClient from "./ProductSelectionClient";
import ProductPageSkeleton from "@/components/common/ProductPageSkeleton";
import { getTubingMaterialCopy } from "@/data/products/tubing/content";
import { getTubingSelectionPath, isTubingMaterial } from "@/data/products/selection/tubing-selection-routes";
import "@/app/products/products.css";

export function getTubingSelectionMetadata(material: string, locale: string): Metadata {
  const copy = getTubingMaterialCopy(material, locale);
  if (!isTubingMaterial(material) || !copy) notFound();
  const path = getTubingSelectionPath(locale, material);
  const title = `${copy.h1} | FOREACH`;
  const description = copy.intro[0];
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path },
    // These one-card selection views support navigation; material details remain indexable.
    robots: { index: false, follow: true },
    openGraph: { title, description, url: path, type: "website" },
    twitter: { title, description },
  };
}

export default function TubingSelectionPage({ material, locale }: { material: string; locale: "zh" | "en" }) {
  if (!isTubingMaterial(material)) notFound();
  return (
    <Suspense fallback={<ProductPageSkeleton variant="selection" />}>
      <ProductSelectionClient key={`${locale}:${material}`} locale={locale} initialCategoryId="tubing" initialProductTypeId={material} />
    </Suspense>
  );
}
