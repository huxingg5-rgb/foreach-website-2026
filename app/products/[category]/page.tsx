import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import ProductPageSkeleton from "@/components/common/ProductPageSkeleton";
import ProductSelectionClient from "@/components/products/selection/ProductSelectionClient";
import {
  getCategoryRouteParams,
  resolveCategoryRoute,
} from "@/data/products/selection/product-route-map";

import "../products.css";

type ProductsCategoryRoutePageProps = {
  params: Promise<{
    category: string;
  }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return getCategoryRouteParams();
}

export async function generateMetadata({
  params,
}: ProductsCategoryRoutePageProps): Promise<Metadata> {
  const { category } = await params;
  const route = resolveCategoryRoute(category);

  if (!route) {
    return {};
  }

  return {
    title: route.title,
    description: route.description,
  };
}

export default async function ProductsCategoryRoutePage({
  params,
}: ProductsCategoryRoutePageProps) {
  const { category } = await params;
  const route = resolveCategoryRoute(category);

  if (!route) {
    notFound();
  }

  return (
    <Suspense fallback={<ProductPageSkeleton variant="selection" />}>
      <ProductSelectionClient locale="zh" initialCategoryId={route.categoryId} />
    </Suspense>
  );
}
