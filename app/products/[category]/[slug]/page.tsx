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
  type ControlModuleDetail,
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

/* =========================================================
   智控模块详情数据适配器

   说明：
   1. control-module-detail.generated.ts 是智控模块自己的数据结构；
   2. ProductDetailClient 使用的是统一详情页展示结构；
   3. 这里把智控数据转成 ProductDetailClient 可以直接渲染的字段；
   4. 不新建独立页面，不新建独立样式，继续复用公共详情页。
========================================================= */

const CONTROL_MODULE_DETAIL_IMAGE_MAP: Record<string, string> = {
  "abd-air-bubble-detector": "/images/products/control/foreach-abd-air-bubble-detector.webp",
  "pdm5-pressure-sensor": "/images/products/control/foreach-pdm5-pressure-sensor.webp",
};

function getControlModuleProductDetailData(detail: ControlModuleDetail) {
  const controlModuleMainImage =
    CONTROL_MODULE_DETAIL_IMAGE_MAP[detail.slug] ||
    (detail as any).mainImage ||
    ((detail as any).images && (detail as any).images[0]) ||
    (detail as any).image ||
    "/images/logo/foreach-logo-color.svg";

  const images = Array.isArray(detail.media?.images) ? detail.media.images : [];

  const mainImage = controlModuleMainImage;

  const drawing2dUrl = detail.media?.drawing2d || "";

  const model3dUrl = detail.media?.model3d || "";

  return {
    slug: detail.slug,

    model: detail.title,
    displayModel: detail.title,
    foreachModel: detail.title,
    name: detail.title,
    title: detail.title,

    category: CONTROL_CATEGORY_ID,
    categoryId: CONTROL_CATEGORY_ID,
    productTypeId: "control-module",
    productTypeName: "智控模块",
    seriesName: detail.categoryLabel || "智控系列",
    series: detail.categoryLabel || "智控系列",

    description: Array.isArray(detail.intro) ? detail.intro.join("\n\n") : "",
    advantages: detail.highlights || [],
    commonApplications: detail.applications || [],

    specs: detail.specs || [],
    faqs: detail.faqs || [],

    mainImage,
    imageCard: controlModuleMainImage,
    image: controlModuleMainImage,
    imagePath: controlModuleMainImage,
    imageUrl: controlModuleMainImage,
    heroImage: mainImage,
    additionalImages: [],

    detailHref: `/products/control/${detail.slug}`,
    href: `/products/control/${detail.slug}`,
    selectionHref: "/products",
    modelSelectionHref: "/products",
    contactHref: "/contact",

    primaryButtonText: "提交定制需求",
    primaryButtonHref: "/contact",
    requestHref: "/contact",

    showConfigurator: false,
    showDatasheetRequest: true,
    showDrawingRequest: Boolean(drawing2dUrl),
    show3DRequest: Boolean(model3dUrl),

    drawing2dUrl,
    drawingPdfUrl: drawing2dUrl,
    partDrawingUrl: drawing2dUrl,
    model3dUrl,

    resources: {
      drawing2dUrl,
      model3dUrl,
    },
  } as any;
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
  if (category === "pumps" && slug === "piston-pump") {
    return getPistonPumpMetadata("", "zh") || {};
  }


  const productTypeRoute = resolveProductTypeRoute(category, slug);

  if (productTypeRoute) {
    if (productTypeRoute.productTypeId === "diaphragm-pump") {
      const canonicalPath = `/products/${category}/${slug}/`;

      return {
        title: productTypeRoute.title,
        description: productTypeRoute.description,
        alternates: {
          canonical: canonicalPath,
          languages: {
            "zh-CN": canonicalPath,
            "en-US": `/en${canonicalPath}`,
            es: `/es${canonicalPath}`,
            fr: `/fr${canonicalPath}`,
            ko: `/ko${canonicalPath}`,
            ru: `/ru${canonicalPath}`,
            "x-default": canonicalPath,
          },
        },
        openGraph: {
          type: "website",
          locale: "zh_CN",
          url: canonicalPath,
          siteName: "FOREACH",
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
    const title = `${detail.title} | FOREACH`;
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
    title: `${slug} | FOREACH`,
    ...buildProductSocialMetadata({
      data: pageData,
      title: `${slug} | FOREACH`,
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
