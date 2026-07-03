/* =========================================================
   page.tsx
   恒永达官网｜中文产品详情页 / 产品分类页复用动态路由

   路由说明：
   1. /products/{category}/{slug}
      - 如果 slug 命中 product-route-map.ts，则显示产品分类页
      - 否则继续按原逻辑显示产品详情页
   2. 这样可以保留原产品详情页，同时支持：
      /products/pumps/plunger-pumps
========================================================= */

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import ProductPageSkeleton from "@/components/common/ProductPageSkeleton";
import ProductDetailClient from "@/components/products/detail/ProductDetailClient";
import ProductSelectionClient from "@/components/products/selection/ProductSelectionClient";

import {
  getProductTypeRouteParams,
  resolveProductTypeRoute,
} from "@/data/products/selection/product-route-map";

import {
  getAllProductDetailRouteParams,
  getProductDetailPageData,
} from "@/services/products/detail/getProductDetailPageData";

import "../../products.css";

type ProductDetailRoutePageProps = {
  params: Promise<{
    category: string;
    slug: string;
  }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  const detailParams = getAllProductDetailRouteParams();
  const productTypeParams = getProductTypeRouteParams();

  return [...productTypeParams, ...detailParams];
}

export async function generateMetadata({
  params,
}: ProductDetailRoutePageProps): Promise<Metadata> {
  const { category, slug } = await params;
  const productTypeRoute = resolveProductTypeRoute(category, slug);

  if (productTypeRoute) {
    return {
      title: productTypeRoute.title,
      description: productTypeRoute.description,
    };
  }

  const pageData = getProductDetailPageData({
    category,
    slug,
  });

  if (!pageData) {
    return {};
  }

  return {
    title: `${slug} | FOREACH`,
  };
}

export default async function ProductDetailRoutePage({
  params,
}: ProductDetailRoutePageProps) {
  const { category, slug } = await params;
  const productTypeRoute = resolveProductTypeRoute(category, slug);

  if (productTypeRoute) {
    return (
      <Suspense fallback={<ProductPageSkeleton variant="selection" />}>
        <ProductSelectionClient
          locale="zh"
          initialCategoryId={productTypeRoute.categoryId}
          initialProductTypeId={productTypeRoute.productTypeId}
        />
      </Suspense>
    );
  }

  const pageData = getProductDetailPageData({
    category,
    slug,
  });

  if (!pageData) {
    notFound();
  }

  return <ProductDetailClient data={pageData} />;
}
