/* =========================================================
   page.tsx
   恒永达官网｜中文产品类型页入口

   文件路径：
   app/products/[category]/[slug]/page.tsx

   示例路径：
   /products/pumps/plunger-pumps

   说明：
   1. 用于展示某个产品类型的筛选结果，例如柱塞泵
   2. 当前通过 generateStaticParams 静态生成产品类型路径
   3. 页面结构交给 ProductSelectionClient 渲染
   4. 柱塞泵型号卡片会跳转到正式详情页：
      /products/pumps/plunger-pumps/[slug]
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
