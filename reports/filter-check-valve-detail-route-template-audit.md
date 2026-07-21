# 接头详情页现有模板检查

生成时间：2026/7/13 09:42:12

## 路由统计

- 接头动态详情路由：2
- 使用 ProductDetailClient：2

## 所有使用 ProductDetailClient 的接头路由

- app/products/fittings/barbed-fittings/[slug]/page.tsx
- app/products/fittings/quick-connect-fittings/[slug]/page.tsx

## ProductDetailClient 参数定义

```tsx
"use client";


import { useSelectionCart } from "@/components/selection-cart/SelectionCartProvider";
import type { SelectionCartItemInput } from "@/components/selection-cart/selection-cart.types";
/* =========================================================
   ProductDetailClient.tsx
   恒永达官网｜中文产品详情页

   重要说明：
   1. 页面结构严格按照用户提供的 HTML 转换。
   2. 未经要求，不调整原始布局、间距、字号与视觉。
   3. 当前明确改动仅包括：
      - 主型号 EA-100-PMMA
      - 添加规格书按钮
      - 申请3D文件按钮
      - 中文不显示保修
      - 主图悬停放大
      - 所有业务按钮只留端口
========================================================= */

import SitePageShell from "@/components/layout/SitePageShell";
import PdfDrawingPreview from "@/components/common/PdfDrawingPreview";
import { useMemo, useState } from "react";

import type { CSSProperties, MouseEvent } from "react";
import type { ProductDetailPageData } from "@/data/products/detail/product-detail.types";
import ProductModelViewer from "./ProductModelViewer";
import styles from "./product-detail.module.css";

type ProductDetailTab = "spec" | "model3d" | "drawing";

type ProductDetailClientProps = {
  data: ProductDetailPageData & Record<string, any>;
};

type ZoomStyle = CSSProperties & {
  "--zoom-x"?: string;
  "--zoom-y"?: string;
};

function getProductDrawingPreviewUrl(slug: string, configuredUrl?: string) {
  const normalizedConfiguredUrl = configuredUrl?.trim();

  if (normalizedConfiguredUrl) {
    return normalizedConfiguredUrl.includes("#")
      ? normalizedConfiguredUrl
      : normalizedConfiguredUrl + "#toolbar=0&navpanes=0&scrollbar=1";
  }

  const normalizedSlug = slug.trim().toLowerCase();
  const match = normalizedSlug.match(/^(ea|sm|tm)-(\d+)/);

  if (!match) {
    return "";
  }

  const seriesCode = match[1];
  const seriesUpper = seriesCode.toUpperCase();
  const capacityCode = String(Number(match[2])).padStart(4, "0") + "UL";

  return (
    "/assets/products/" +
    seriesCode +
    "/2d-drawings/" +
    seriesUpper +
    "-" +
    capacityCode +
    ".pdf#toolbar=0&navpanes=0&scrollbar=1"
  );
}

function isPlungerPumpDisplayModel(value: unknown): boolean {
  const model = String(value || "").trim();

  return /^(EA|SM|TM)-/i.test(model);
}


function isTubingDetailData(data: any): boolean {
  return (
    data?.productCategory === "tubing" ||
    data?.productType === "tubing" ||
    data?.category === "tubing" ||
    data?.detailMode === "material_selection" ||
    (typeof data?.slug === "string" && data.slug.includes("-tubing"))
  );
}

function getDisplayModelText(data: any): string {
  if (isTubingDetailData(data)) {
    return "XXX-XXX-XX-XX";
  }

  if (isCustomInquiryMode(data)) {
    return "定制配置请联系我们";
  }

  return (data as any).displayModel || data.model || "";
}

function isCustomInquiryMode(data: any): boolean {
  
  if (
    isValvelessPumpDetailData(data) ||
    data?.isCustomOnly === true ||
    data?.showCustomInquiryCta === true
  ) {
    return true;
  }
const detailMode = String(
    data?.detailMode ||
      data?.hero?.detailMode ||
      data?.productMode ||
      data?.mode ||
      ""
  ).trim();

  if (
    detailMode === "custom_inquiry" ||
    detailMode === "custom" ||
    detailMode === "customized"
  ) {
    return true;
  }

  if (
    detailMode === "standard_model" ||
    detailMode === "standard" ||
    detailMode === "selection" ||
    detailMode === "configurable"
  ) {
    return false;
```

## 参考路由：app/products/fittings/quick-connect-fittings/[slug]/page.tsx

- generateStaticParams：有
- generateMetadata：有
- notFound：有
- ProductDetailClient：有

```tsx
import type {
  ComponentType,
} from "react";

import type {
  Metadata,
} from "next";

import {
  notFound,
} from "next/navigation";

import ProductDetailClient from "@/components/products/detail/ProductDetailClient";
import detailsJson from "@/data/products/generated/fittings/quick-connect-fittings/detail/index.json";

import "../../../products.css";

type DetailRecord = {
  slug: string;
  model: string;
  name?: string;
  title?: string;
  description?: string;
  seo?: {
    title?: string;
    description?: string;
  };
  [key: string]: unknown;
};

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const details =
  detailsJson as DetailRecord[];

const ProductDetailView =
  ProductDetailClient as unknown as ComponentType<{
    data: any;
  }>;

export const dynamicParams =
  false;

function normalizeSegment(
  value: string
) {
  return String(
    value ||
    ""
  )
    .trim()
    .toLowerCase();
}

function findDetail(
  slug: string
) {
  const target =
    normalizeSegment(
      slug
    );

  return details.find(
    (item) =>
      normalizeSegment(
        item.slug
      ) ===
      target
  );
}

export function generateStaticParams() {
  return details.map(
    (detail) => ({
      slug:
        detail.slug,
    })
  );
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const {
    slug,
  } = await params;

  const detail =
    findDetail(
      slug
    );

  if (
    !detail
  ) {
    return {};
  }

  return {
    title:
      detail.seo?.title ||
      `${detail.model} ${detail.name || detail.title || "快插接头"} | FOREACH`,

    description:
      detail.seo?.description ||
      detail.description,
  };
}

export default async function QuickConnectFittingDetailPage({
  params,
}: PageProps) {
  const {
    slug,
  } = await params;

  const detail =
    findDetail(
      slug
    );

  if (
    !detail
  ) {
    notFound();
  }

  return (
    <ProductDetailView
      data={
        detail
      }
    />
  );
}

```

## 参考路由：app/products/fittings/barbed-fittings/[slug]/page.tsx

- generateStaticParams：有
- generateMetadata：有
- notFound：有
- ProductDetailClient：有

```tsx
import type {
  ComponentType,
} from "react";

import type {
  Metadata,
} from "next";

import {
  notFound,
} from "next/navigation";

import ProductDetailClient from "@/components/products/detail/ProductDetailClient";
import detailsJson from "@/data/products/generated/fittings/barbed-fittings/detail/index.json";

import "../../../products.css";

type DetailRecord = {
  slug: string;
  model: string;
  name?: string;
  title?: string;
  description?: string;
  seo?: {
    title?: string;
    description?: string;
  };
  [key: string]: unknown;
};

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const details =
  detailsJson as DetailRecord[];

const ProductDetailView =
  ProductDetailClient as unknown as ComponentType<{
    data: any;
  }>;

export const dynamicParams =
  false;

function normalizeSegment(
  value: string
) {
  return String(value || "")
    .trim()
    .toLowerCase();
}

function findDetail(
  slug: string
) {
  const target =
    normalizeSegment(slug);

  return details.find(
    (item) =>
      normalizeSegment(
        item.slug
      ) === target
  );
}

export function generateStaticParams() {
  return details.map(
    (detail) => ({
      slug:
        detail.slug,
    })
  );
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const {
    slug,
  } = await params;

  const detail =
    findDetail(slug);

  if (!detail) {
    return {};
  }

  return {
    title:
      detail.seo?.title ||
      detail.model + " " + (detail.name || detail.title || "倒刺接头") + " | FOREACH",

    description:
      detail.seo?.description ||
      detail.description,
  };
}

export default async function BarbedFittingDetailPage({
  params,
}: PageProps) {
  const {
    slug,
  } = await params;

  const detail =
    findDetail(slug);

  if (!detail) {
    notFound();
  }

  return (
    <ProductDetailView
      data={detail}
    />
  );
}

```

## 可能相关的数据适配器

没有找到明显的数据适配器。
