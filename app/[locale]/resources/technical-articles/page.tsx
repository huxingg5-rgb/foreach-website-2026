/* =========================================================
   page.tsx
   恒永达官网｜外语技术文章列表页入口

   页面路径：
   /en/resources/technical-articles
   /es/resources/technical-articles
   /fr/resources/technical-articles
   /ko/resources/technical-articles
   /ru/resources/technical-articles
========================================================= */

import type { Metadata } from "next";
import { notFound } from "next/navigation";

import TechnicalArticlesClient from "@/components/resources/technical-articles/TechnicalArticlesClient";
import { getTechnicalArticlesPageData } from "@/services/resources/technical-articles/getTechnicalArticlesPageData";

import "@/app/resources/technical-articles/technical-articles.css";

import type { TechnicalArticleLocale } from "@/data/resources/technical-articles/technical-articles.types";

const SUPPORTED_LOCALES: TechnicalArticleLocale[] = ["en", "es", "fr", "ko", "ru"];

interface TechnicalArticlesIntlPageProps {
  params: Promise<{
    locale: TechnicalArticleLocale;
  }>;
}

export function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locale) => ({
    locale,
  }));
}

export async function generateMetadata({ params }: TechnicalArticlesIntlPageProps): Promise<Metadata> {
  const { locale } = await params;
  const pageData = getTechnicalArticlesPageData(locale);
  const sectionLabels: Record<TechnicalArticleLocale, string> = {
    "zh-CN": "资源中心", en: "Resources", es: "Recursos", fr: "Ressources", ko: "자료", ru: "Ресурсы",
  };
  const metadata = locale === "en"
    ? { title: "Technical Articles｜Resources｜FOREACH", description: "FOREACH technical articles about product selection, material compatibility, tubing connections, sealing methods and microfluidic system applications." }
    : { title: `${pageData.hero.title}｜${sectionLabels[locale]}｜FOREACH`, description: pageData.hero.description };
  return locale === "en" ? metadata : { ...metadata, openGraph: metadata };
}

export default async function TechnicalArticlesIntlPage({
  params,
}: TechnicalArticlesIntlPageProps) {
  const { locale } = await params;

  if (!SUPPORTED_LOCALES.includes(locale)) {
    notFound();
  }

  const pageData = getTechnicalArticlesPageData(locale);

  return <TechnicalArticlesClient pageData={pageData} />;
}
