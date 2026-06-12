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
   2. 不生成 /zh-CN/products
   3. 当前外语页面先统一读取英文数据
   4. 页面结构严格交给 ProductSelectionClient 渲染
========================================================= */

import { notFound } from "next/navigation";

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

  return <ProductSelectionClient locale={productSelectionLocale} />;
}
