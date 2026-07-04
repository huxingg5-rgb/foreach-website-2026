/* =========================================================
   page.tsx
   恒永达官网｜多语言产品中心选型页入口

   文件路径：
   app/[locale]/products/page.tsx

   说明：
   1. 外语产品中心路径：
      /en/products
      /es/products
      /fr/products
      /ko/products
      /ru/products
   2. 中文默认路径不加 /zh-CN，中文产品中心为 /products
   3. 当前外语产品中心使用 ProductSelectionClient 渲染
   4. 产品卡片详情链接目前统一跳转到中文正式详情页：
      /products/pumps/plunger-pumps/[slug]
   5. 后续如果新增外语产品详情页，再单独增加：
      app/[locale]/products/pumps/plunger-pumps/[slug]/page.tsx
========================================================= */

import { Suspense } from "react";
import { notFound } from "next/navigation";

import ProductPageSkeleton from "@/components/common/ProductPageSkeleton";
import ProductSelectionClient from "@/components/products/selection/ProductSelectionClient";

type ProductSelectionLocale = "en" | "es" | "fr" | "ko" | "ru";
import "@/app/products/products.css";

const PRODUCT_LOCALES = ["en", "es", "fr", "ko", "ru"] as const;

type ProductLocale = (typeof PRODUCT_LOCALES)[number];

type ProductsLocalePageProps = {
  params: Promise<{
    locale: string;
  }>;
};

export function generateStaticParams() {
  return PRODUCT_LOCALES.map((locale) => ({
    locale,
  }));
}

export default async function ProductsLocalePage({
  params,
}: ProductsLocalePageProps) {
  const { locale } = await params;

  if (!PRODUCT_LOCALES.includes(locale as ProductLocale)) {
    notFound();
  }
const productSelectionLocale =
    locale === "en" ||
    locale === "es" ||
    locale === "fr" ||
    locale === "ko" ||
    locale === "ru"
      ? (locale as ProductSelectionLocale)
      : "en";

  return (
    <Suspense fallback={<ProductPageSkeleton variant="selection" />}>
      <ProductSelectionClient locale={productSelectionLocale} />
    </Suspense>
  );
}
