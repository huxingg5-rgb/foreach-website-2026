import { withPublishedTranslationMetadata } from "@/lib/seo/published-translation-metadata";
/* =========================================================
   page.tsx
   恒永达官网｜关于我们 / 研发与制造能力 多语言页面入口

   页面路径：
   /en/about/research-manufacturing
   /es/about/research-manufacturing
   /fr/about/research-manufacturing
   /ko/about/research-manufacturing
   /ru/about/research-manufacturing

   文件路径：
   app/[locale]/about/research-manufacturing/page.tsx

   说明：
   1. 这个文件负责非中文多语言页面入口
   2. 中文页面不走 /zh，中文走 /about/research-manufacturing
   3. 页面主体内容由 components/about/ResearchManufacturingPageContent 渲染
   4. 多语言文案和 SEO 数据来自 data/about-research-manufacturing.ts
========================================================= */

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { languageDraftsEnabled } from "@/lib/i18n/draft-languages";
import { draftAboutMetadata } from "@/lib/seo/german-about-metadata";

import ResearchManufacturingPageContent from "@/components/about/ResearchManufacturingPageContent";
import {
  getResearchManufacturingSeo,
  isResearchManufacturingRouteLocale,
  RESEARCH_MANUFACTURING_ROUTE_LOCALES,
} from "@/data/about-research-manufacturing";

type PageProps = {
  params: Promise<{
    locale: string;
  }>;
};

/* =========================================================
   生成静态多语言路径
========================================================= */
export function generateStaticParams() {
  return [
    ...RESEARCH_MANUFACTURING_ROUTE_LOCALES.map((locale) => ({ locale })),
    ...(languageDraftsEnabled ? [{ locale: "de" }, { locale: "it" }, { locale: "hi" }] : []),
  ];
}

/* =========================================================
   多语言页面 SEO 信息
========================================================= */
async function getPageMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (languageDraftsEnabled && (locale === "de" || locale === "it" || locale === "hi")) {
    const seo = getResearchManufacturingSeo(locale);
    return draftAboutMetadata(locale, "/about/research-manufacturing/", seo.title, seo.description);
  }

  if (!isResearchManufacturingRouteLocale(locale)) {
    notFound();
  }

  const seo = getResearchManufacturingSeo(locale);

  return {
    title: seo.title,
    description: seo.description,
    alternates: {
      canonical: `/${locale}/about/research-manufacturing`,
    },
  };
}

/* =========================================================
   多语言研发与制造能力页面
========================================================= */
export default async function LocaleResearchManufacturingPage({
  params,
}: PageProps) {
  const { locale } = await params;
  if (languageDraftsEnabled && (locale === "de" || locale === "it" || locale === "hi")) return <ResearchManufacturingPageContent locale={locale} />;

  if (!isResearchManufacturingRouteLocale(locale)) {
    notFound();
  }

  return <ResearchManufacturingPageContent locale={locale} />;
}

export const generateMetadata = withPublishedTranslationMetadata("/about/research-manufacturing/", getPageMetadata);
