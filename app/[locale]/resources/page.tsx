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

import {
  datasheetEnFilterOptions,
  datasheetEnItems,
  datasheetsEnPageText,
} from "@/data/resources/datasheets.en";

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

function getForeignResourcesPageText(locale: SupportedResourceLocale) {
  return {
    ...datasheetsEnPageText,

    breadcrumb: {
      ...datasheetsEnPageText.breadcrumb,
      homeHref: `/${locale}`,

      /*
         注意：
         这里指向当前资源中心首页。
         现在 app/[locale]/resources/page.tsx 已经补齐，
         所以 /es/resources /fr/resources /ko/resources /ru/resources 都能打开。
      */
      resourcesHref: `/${locale}/resources`,
    },

    support: {
      ...datasheetsEnPageText.support,
      buttonHref: `/${locale}/contact?type=datasheet`,
    },
  };
}

/* =========================================================
   getForeignDatasheetItems
   生成外语规格书列表数据

   说明：
   1. 所有外语资源中心首页暂时统一显示英文规格书数据
   2. PDF 下载路径继续使用英文 PDF
   3. 定制类联系入口根据 locale 跳到对应语言联系页
========================================================= */

function getForeignDatasheetItems(locale: SupportedResourceLocale) {
  return datasheetEnItems.map((item) => {
    if (item.actionType === "custom") {
      return {
        ...item,
        downloadHref: `/${locale}/contact?type=custom-probe`,
      };
    }

    return item;
  });
}

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

  return {
    title: "Resources | FOREACH Fluid",
    description:
      "Access FOREACH product datasheets, selection support, installation guides, material compatibility information, FAQs, and company news.",
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

  return (
    <DatasheetsClient
      pageText={getForeignResourcesPageText(locale)}
      filterOptions={datasheetEnFilterOptions}
      datasheetItems={getForeignDatasheetItems(locale)}
    />
  );
}