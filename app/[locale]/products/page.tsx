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
      /products/pumps/piston-pump/[slug]
   5. 后续如果新增外语产品详情页，再单独增加：
      app/[locale]/products/pumps/piston-pump/[slug]/page.tsx
========================================================= */

import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";

import ProductPageSkeleton from "@/components/common/ProductPageSkeleton";
import ProductSelectionClient from "@/components/products/selection/ProductSelectionClient";

type ProductSelectionLocale = "en" | "es" | "fr" | "ko" | "ru";
import "@/app/products/products.css";

const PRODUCT_LOCALES = ["en", "es", "fr", "ko", "ru"] as const;

type ProductLocale = (typeof PRODUCT_LOCALES)[number];

const PRODUCT_METADATA: Record<ProductLocale, Metadata> = {
  en: {
    title: "Precision Fluid Handling Products | FOREACH",
    description:
      "Explore FOREACH pumps, valves, probes and needles, fittings, tubing, sensors, and control modules for precision fluid handling in IVD, analytical instruments, and laboratory automation.",
  },
  es: {
    title: "Productos para el manejo preciso de fluidos | FOREACH",
    description:
      "Explore bombas, válvulas, agujas, conectores, tubos, sensores y módulos de control FOREACH para el manejo preciso de fluidos en IVD, instrumentación analítica y automatización de laboratorios.",
  },
  fr: {
    title: "Produits de gestion précise des fluides | FOREACH",
    description:
      "Découvrez les pompes, vannes, aiguilles, raccords, tubes, capteurs et modules de commande FOREACH pour la gestion précise des fluides en IVD, instrumentation analytique et automatisation de laboratoire.",
  },
  ko: {
    title: "정밀 유체 제어 제품 | FOREACH",
    description:
      "IVD, 분석 장비 및 실험실 자동화를 위한 FOREACH 정밀 유체 제어 펌프, 밸브, 니들, 피팅, 튜브, 센서 및 제어 모듈을 확인하세요.",
  },
  ru: {
    title: "Компоненты для точного управления жидкостями | FOREACH",
    description:
      "Ознакомьтесь с насосами, клапанами, иглами, фитингами, трубками, датчиками и модулями управления FOREACH для IVD, аналитических приборов и лабораторной автоматизации.",
  },
};

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

export async function generateMetadata({
  params,
}: ProductsLocalePageProps): Promise<Metadata> {
  const { locale } = await params;

  if (!PRODUCT_LOCALES.includes(locale as ProductLocale)) {
    return {};
  }

  return PRODUCT_METADATA[locale as ProductLocale];
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
