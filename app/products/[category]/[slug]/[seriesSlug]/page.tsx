import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import ProductPageSkeleton from "@/components/common/ProductPageSkeleton";
import ProductSelectionClient from "@/components/products/selection/ProductSelectionClient";
import {
  getSeriesRouteParams,
  resolveSeriesRoute,
} from "@/data/products/selection/product-route-map";

import "../../../products.css";

type ProductsSeriesRoutePageProps = {
  params: Promise<{
    category: string;
    slug: string;
    seriesSlug: string;
  }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return getSeriesRouteParams();
}

export async function generateMetadata({
  params,
}: ProductsSeriesRoutePageProps): Promise<Metadata> {
  const { category, slug, seriesSlug } = await params;
  const route = resolveSeriesRoute(category, slug, seriesSlug);

  if (!route) {
    return {};
  }

  return {
    title: route.title,
    description: route.description,
  };
}

export default async function ProductsSeriesRoutePage({
  params,
}: ProductsSeriesRoutePageProps) {
  const { category, slug, seriesSlug } = await params;
  const route = resolveSeriesRoute(category, slug, seriesSlug);

  if (!route) {
    notFound();
  }

  return (
    <Suspense fallback={<ProductPageSkeleton variant="selection" />}>
      <ProductSelectionClient
        locale="zh"
        initialCategoryId={route.categoryId}
        initialProductTypeId={route.productTypeId}
        initialFilters={route.initialFilters}
      />
    </Suspense>
  );
}
