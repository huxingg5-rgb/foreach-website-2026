import { getControlModuleProductDetailData } from "@/services/products/adapters/getControlModuleProductDetailData";
import { getPistonPumpRedirect } from "@/lib/seo/piston-pump-migration";
import { getPistonPumpMetadata } from "@/services/products/getPistonPumpMetadata";
﻿/* =========================================================
   page.tsx
   恒永达官网｜中文产品类型页 / 旧产品详情页复用动态路由

   文件路径：
   app/products/[category]/[slug]/page.tsx

   路由说明：
   1. /products/{category}/{slug}
   2. 如果 slug 命中 product-route-map.ts，则显示产品类型筛选页
      示例：/products/pumps/piston-pump
   3. 如果 category === "control"，则显示智控模块详情页
      示例：/products/control/abd-air-bubble-detector
   4. 如果没有命中产品类型路由，则继续按旧逻辑显示产品详情页
   5. 这样可以保留原有产品详情页，同时支持新的产品中心 SEO 路径
   6. 柱塞泵具体型号详情页已单独使用：
      /products/pumps/piston-pump/[slug]
========================================================= */

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import ProductPageSkeleton from "@/components/common/ProductPageSkeleton";
import ProductDetailClient from "@/components/products/detail/ProductDetailClient";
import ProductSelectionClient from "@/components/products/selection/ProductSelectionClient";
import { buildProductSocialMetadata } from "@/lib/seo/product-social-metadata";
import { getLocalizedSiteHref } from "@/lib/seo/site-url";
import { VALVELESS_PUMP_LEGACY_CATEGORY_SLUG } from "@/data/products/selection/valveless-pump-routes";

import {
  getProductTypeRouteParams,
  resolveProductTypeRoute,
} from "@/data/products/selection/product-route-map";

import {
  getAllProductDetailRouteParams,
  getProductDetailPageData,
} from "@/services/products/detail/getProductDetailPageData";

import {
  getControlModuleDetailBySlug,
  getControlModuleDetailSlugs,
} from "@/data/products/control-modules/control-module-detail.generated";

import "../../products.css";

type ProductDetailRoutePageProps = {
  params: Promise<{
    category: string;
    slug: string;
  }>;
};

export const dynamicParams = false;

const CONTROL_CATEGORY_ID = "control";

const tubingStaticParams = [
  { category: "tubing", slug: "pvc-tubing" },
  { category: "tubing", slug: "tpu-tubing" },
  { category: "tubing", slug: "fep-tubing" },
  { category: "tubing", slug: "ptfe-tubing" },
  { category: "tubing", slug: "peek-tubing" },
  { category: "tubing", slug: "pfa-tubing" },
];

/* =========================================================
   智控模块静态路由参数

   说明：
   1. 当前项目使用 output: export；
   2. dynamicParams = false 时，所有动态路径必须在 generateStaticParams 中列出；
   3. 所以 ABD / PDM5 详情页必须显式加入静态参数。
========================================================= */
function getControlModuleStaticParams() {
  return getControlModuleDetailSlugs().map((slug) => ({
    category: CONTROL_CATEGORY_ID,
    slug,
  }));
}

export function generateStaticParams() {
  const detailParams = getAllProductDetailRouteParams();

  const productTypeParams = getProductTypeRouteParams();

  const controlModuleParams = getControlModuleStaticParams();

  return [
    ...productTypeParams,
    ...detailParams,
    ...controlModuleParams,
    ...tubingStaticParams,
  ].filter(({ category, slug }) => !getPistonPumpRedirect(`/products/${category}/${slug}/`));
}

export async function generateMetadata({
  params,
}: ProductDetailRoutePageProps): Promise<Metadata> {
  const { category, slug } = await params;
  if (category === "pumps" && slug === VALVELESS_PUMP_LEGACY_CATEGORY_SLUG) {
    notFound();
  }
  if (category === "pumps" && slug === "piston-pump") {
    return getPistonPumpMetadata("", "zh") || {};
  }


  const productTypeRoute = resolveProductTypeRoute(category, slug);

  if (productTypeRoute) {
    if (["diaphragm-pump", "valveless-pump"].includes(productTypeRoute.productTypeId)) {
      const canonicalPath = `/products/${category}/${slug}/`;

      return {
        title: productTypeRoute.title,
        description: productTypeRoute.description,
        alternates: {
          canonical: canonicalPath,
          languages: {
            "zh-CN": canonicalPath,
            "en-US": getLocalizedSiteHref(canonicalPath, "en"),
            es: getLocalizedSiteHref(canonicalPath, "es"),
            fr: getLocalizedSiteHref(canonicalPath, "fr"),
            ko: getLocalizedSiteHref(canonicalPath, "ko"),
            ru: getLocalizedSiteHref(canonicalPath, "ru"),
            "x-default": canonicalPath,
          },
        },
        openGraph: {
          type: "website",
          locale: "zh_CN",
          url: canonicalPath,
          siteName: "Foreach Technology",
          title: productTypeRoute.title,
          description: productTypeRoute.description,
        },
        twitter: {
          card: "summary",
          title: productTypeRoute.title,
          description: productTypeRoute.description,
        },
      };
    }

    return {
      title: productTypeRoute.title,
      description: productTypeRoute.description,
    };
  }

  if (category === CONTROL_CATEGORY_ID) {
    const detail = getControlModuleDetailBySlug(slug);

    if (!detail) {
      return {};
    }

    const pageData = getControlModuleProductDetailData(detail);
    const title = `${detail.title} | Foreach Technology`;
    const description = Array.isArray(detail.intro)
        ? detail.intro.join(" ").slice(0, 160)
        : detail.title;

    return {
      title,
      description,
      ...buildProductSocialMetadata({
        data: pageData,
        title,
        description,
        canonicalUrl: `/products/${category}/${slug}/`,
      }),
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
    title: `${slug} | Foreach Technology`,
    ...buildProductSocialMetadata({
      data: pageData,
      title: `${slug} | Foreach Technology`,
      canonicalUrl: `/products/${category}/${slug}/`,
    }),
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

  if (category === CONTROL_CATEGORY_ID) {
    const controlDetail = getControlModuleDetailBySlug(slug);

    if (!controlDetail) {
      notFound();
    }

    return (
      <ProductDetailClient
        data={getControlModuleProductDetailData(controlDetail)}
      />
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
