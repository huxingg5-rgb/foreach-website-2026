/* =========================================================
   page.tsx
   FOREACH Website｜Resources｜Foreign Language Resource Center Entry

   文件路径：
   app/[locale]/resources/page.tsx

   页面访问地址：
   /en/resources
   /es/resources
   /fr/resources
   /ko/resources
   /ru/resources

   说明：
   1. 中文资源中心首页走 app/resources/page.tsx
   2. 外语资源中心首页走当前文件
   3. 当前阶段资源中心首页还没有完全独立设计
   4. 所以外语 /resources 暂时直接显示英文规格书下载内容
   5. 这样可以先保证：
      /es/resources
      /fr/resources
      /ko/resources
      /ru/resources
      都不会 404
========================================================= */

import type { Metadata } from "next";
import { notFound } from "next/navigation";

import DatasheetsClient from "@/components/resources/DatasheetsClient";

import type { DatasheetLocale } from "@/data/resources/datasheets.types";
import { getDatasheetsPageData } from "@/services/resources/getDatasheetsPageData";

import "@/app/resources/datasheets/datasheets.css";

/* =========================================================
   当前官网支持的外语语言

   说明：
   1. 中文 zh-CN 不在这里
   2. 中文资源中心路径是 /resources
   3. 外语资源中心路径是 /[locale]/resources
========================================================= */

const SUPPORTED_RESOURCE_LOCALES = ["en", "es", "fr", "ko", "ru"] as const;

type SupportedResourceLocale = (typeof SUPPORTED_RESOURCE_LOCALES)[number];

/* =========================================================
   generateStaticParams

   说明：
   1. output: "export" 静态导出模式必须写
   2. 这里一次性生成所有外语资源中心首页
   3. 避免 /es/resources、/fr/resources、/ko/resources、/ru/resources 报错
========================================================= */

export function generateStaticParams() {
  return SUPPORTED_RESOURCE_LOCALES.map((locale) => ({
    locale,
  }));
}

/* =========================================================
   页面参数类型

   说明：
   当前项目使用 Next.js 新版本写法，params 按 Promise 处理。
========================================================= */

type LocalizedResourcesPageProps = {
  params: Promise<{
    locale: string;
  }>;
};

/* =========================================================
   判断当前 locale 是否为官网支持的外语
========================================================= */

function isSupportedResourceLocale(
  locale: string,
): locale is SupportedResourceLocale {
  return SUPPORTED_RESOURCE_LOCALES.includes(
    locale as SupportedResourceLocale,
  );
}

/* =========================================================
   getForeignResourcesPageText
   生成外语资源中心首页文案

   说明：
   1. 当前阶段复用英文规格书页面文案
   2. 但面包屑和按钮路径要根据 locale 动态变化
   3. /es/resources 的 Home 应该跳 /es
   4. /ru/resources 的联系按钮应该跳 /ru/contact
========================================================= */

const resourcesMetadata = {
  es: {
    title: "Centro de recursos | FOREACH",
    description:
      "Consulte fichas técnicas, herramientas de selección, guías de instalación, compatibilidad de materiales, artículos técnicos y noticias de FOREACH.",
  },
  fr: {
    title: "Centre de ressources | FOREACH",
    description:
      "Consultez les fiches techniques, outils de sélection, guides d’installation, données de compatibilité, articles techniques et actualités FOREACH.",
  },
  ru: {
    title: "Центр ресурсов | FOREACH",
    description:
      "Спецификации, инструменты подбора, руководства по установке, данные о совместимости материалов, технические статьи и новости FOREACH.",
  },
  ko: {
    title: "자료실 | FOREACH",
    description:
      "FOREACH 제품 사양서, 선정 도구, 설치 가이드, 소재 호환성 자료, 기술 문서 및 뉴스를 확인하세요.",
  },
} as const;

const resourcesAccessibilityLabels = {
  es: {
    breadcrumb: "Ruta de navegación",
    categoryFilter: "Filtro de categoría de producto",
    thumbnail: " miniatura",
  },
  fr: {
    breadcrumb: "Fil d’Ariane",
    categoryFilter: "Filtre de catégorie de produits",
    thumbnail: " — miniature",
  },
  ru: {
    breadcrumb: "Навигационная цепочка",
    categoryFilter: "Фильтр по категории продукции",
    thumbnail: " — миниатюра",
  },
  ko: {
    breadcrumb: "경로 탐색",
    categoryFilter: "제품 카테고리 필터",
    thumbnail: " 썸네일",
  },
} as const;

/* =========================================================
   页面 SEO

   说明：
   当前所有外语资源中心首页先统一使用英文 SEO。
========================================================= */

export async function generateMetadata({
  params,
}: LocalizedResourcesPageProps): Promise<Metadata> {
  const { locale } = await params;

  if (!isSupportedResourceLocale(locale)) {
    return {};
  }

  if (locale === "en") {
    return {
      title: "Resources | FOREACH Fluid",
      description:
        "Access FOREACH product datasheets, selection support, installation guides, material compatibility information, FAQs, and company news.",
    };
  }

  const localizedMetadata = resourcesMetadata[locale];

  return {
    ...localizedMetadata,
    openGraph: localizedMetadata,
  };
}

/* =========================================================
   LocalizedResourcesPage
   外语资源中心首页
========================================================= */

export default async function LocalizedResourcesPage({
  params,
}: LocalizedResourcesPageProps) {
  const { locale } = await params;

  if (!isSupportedResourceLocale(locale)) {
    notFound();
  }

  const pageData = await getDatasheetsPageData(locale as DatasheetLocale);

  return (
    <DatasheetsClient
      pageText={pageData.pageText}
      filterOptions={pageData.filterOptions}
      datasheetItems={pageData.datasheetItems}
      accessibilityLabels={
        locale === "en" ? undefined : resourcesAccessibilityLabels[locale]
      }
    />
  );
}
