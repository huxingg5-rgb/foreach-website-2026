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
   3. 当前阶段资源中心首页还没有正式单独设计
   4. 所以这里暂时复用规格书下载页的数据与组件
   5. 后期资源中心首页正式设计完成后，再把这里改成真正的资源中心总览页
   6. 页面数据统一从 service 层获取，后期接后端时这里原则上不用改
========================================================= */

import type { Metadata } from "next"; // 引入 Next.js 页面 SEO 类型
import { notFound } from "next/navigation"; // 引入 404 方法，用于拦截不支持的语言

import DatasheetsClient from "@/components/resources/DatasheetsClient"; // 引入规格书页面客户端组件

import { getDatasheetsPageData } from "@/services/resources/getDatasheetsPageData"; // 从 service 层获取页面数据

import type { DatasheetLocale } from "@/data/resources/datasheets.types"; // 引入规格书语言类型

import "@/app/resources/datasheets/datasheets.css"; // 当前临时复用规格书页面样式

/* =========================================================
   当前外语资源中心入口支持的语言
========================================================= */

const SUPPORTED_FOREIGN_RESOURCE_LOCALES = [
  "en",
  "es",
  "fr",
  "ko",
  "ru",
] as const;

const datasheetAccessibilityLabels = {
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

type SupportedForeignResourceLocale =
  (typeof SUPPORTED_FOREIGN_RESOURCE_LOCALES)[number];

/* =========================================================
   generateStaticParams

   说明：
   1. 如果 next.config.ts 使用 output: "export"，这里必须写
   2. 这里一次性生成所有外语资源中心入口页面
========================================================= */

export function generateStaticParams() {
  return SUPPORTED_FOREIGN_RESOURCE_LOCALES.map((locale) => ({
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
   判断当前语言是否是外语资源中心支持的语言
========================================================= */

function isSupportedForeignResourceLocale(
  locale: string,
): locale is SupportedForeignResourceLocale {
  return SUPPORTED_FOREIGN_RESOURCE_LOCALES.includes(
    locale as SupportedForeignResourceLocale,
  );
}

/* =========================================================
   generateMetadata
   生成外语资源中心首页 SEO

   说明：
   1. 当前阶段先复用规格书页面数据
   2. title 单独改成 Resources，避免和 Datasheets 页面完全重复
========================================================= */

export async function generateMetadata({
  params,
}: LocalizedResourcesPageProps): Promise<Metadata> {
  const { locale } = await params;

  if (!isSupportedForeignResourceLocale(locale)) {
    return {};
  }

  const pageData = await getDatasheetsPageData(locale as DatasheetLocale);

  const metadata = {
    title:
      locale === "en"
        ? "Resources | FOREACH"
        : pageData.pageText.seo.title,
    description: pageData.pageText.seo.description,
  };

  return locale === "en" ? metadata : { ...metadata, openGraph: metadata };
}

/* =========================================================
   LocalizedResourcesPage
   外语资源中心临时入口页

   说明：
   1. 当前阶段暂时复用规格书下载页
   2. 保证 /en/resources、/es/resources、/fr/resources、/ko/resources、/ru/resources 都能访问
   3. 后期真正做资源中心总览页时，只需要替换 return 里的组件
========================================================= */

export default async function LocalizedResourcesPage({
  params,
}: LocalizedResourcesPageProps) {
  const { locale } = await params;

  if (!isSupportedForeignResourceLocale(locale)) {
    notFound();
  }

  const pageData = await getDatasheetsPageData(locale as DatasheetLocale);

  return (
    <DatasheetsClient
      pageText={pageData.pageText}
      filterOptions={pageData.filterOptions}
      datasheetItems={pageData.datasheetItems}
      accessibilityLabels={
        locale === "en" ? undefined : datasheetAccessibilityLabels[locale]
      }
    />
  );
}
