import { withPublishedTranslationMetadata } from "@/lib/seo/published-translation-metadata";
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
import { getGermanTechnicalArticlesPageData, germanTechnicalArticlesMetadata } from "@/services/resources/technical-articles/getGermanTechnicalArticlesPageData";
import { getItalianTechnicalArticlesPageData, italianTechnicalArticlesMetadata } from "@/services/resources/technical-articles/getItalianTechnicalArticlesPageData";
import { getHindiTechnicalArticlesPageData, hindiTechnicalArticlesMetadata } from "@/services/resources/technical-articles/getHindiTechnicalArticlesPageData";
import { languageDraftsEnabled } from "@/lib/i18n/draft-languages";

import "@/app/resources/technical-articles/technical-articles.css";

import type { TechnicalArticleLocale } from "@/data/resources/technical-articles/technical-articles.types";

const SUPPORTED_LOCALES: TechnicalArticleLocale[] = ["en", "es", "fr", "ko", "ru"];

interface TechnicalArticlesIntlPageProps {
  params: Promise<{
    locale: TechnicalArticleLocale | "de" | "it" | "hi";
  }>;
}

export function generateStaticParams() {
  return [...SUPPORTED_LOCALES, ...(languageDraftsEnabled ? ["de", "it", "hi"] : [])].map((locale) => ({
    locale,
  }));
}

async function getPageMetadata({ params }: TechnicalArticlesIntlPageProps): Promise<Metadata> {
  const { locale } = await params;
  if (locale === "de") {
    return languageDraftsEnabled ? {
      ...germanTechnicalArticlesMetadata,
      alternates: { canonical: "/de/resources/technical-articles/" },
      robots: { index: false, follow: true },
      openGraph: { ...germanTechnicalArticlesMetadata, locale: "de_DE" },
    } : {};
  }
  if (locale === "it") {
    return languageDraftsEnabled ? {
      ...italianTechnicalArticlesMetadata,
      alternates: { canonical: "/it/resources/technical-articles/" },
      robots: { index: false, follow: true },
      openGraph: { ...italianTechnicalArticlesMetadata, locale: "it_IT" },
    } : {};
  }
  if (locale === "hi") {
    return languageDraftsEnabled ? {
      ...hindiTechnicalArticlesMetadata,
      alternates: { canonical: "/hi/resources/technical-articles/" },
      robots: { index: false, follow: true },
      openGraph: { ...hindiTechnicalArticlesMetadata, locale: "hi_IN" },
    } : {};
  }
  const pageData = getTechnicalArticlesPageData(locale);
  const sectionLabels: Record<TechnicalArticleLocale, string> = {
    "zh-CN": "资源中心", en: "Resources", es: "Recursos", fr: "Ressources", ko: "자료", ru: "Ресурсы",
  };
  const metadata = locale === "en"
    ? { title: "Technical Articles｜Resources｜Foreach Technology", description: "Foreach technical articles about product selection, material compatibility, tubing connections, sealing methods and microfluidic system applications." }
    : { title: `${pageData.hero.title}｜${sectionLabels[locale]}｜Foreach Technology`, description: pageData.hero.description };
  return locale === "en" ? metadata : { ...metadata, openGraph: metadata };
}

export default async function TechnicalArticlesIntlPage({
  params,
}: TechnicalArticlesIntlPageProps) {
  const { locale } = await params;
  if (locale === "de" && languageDraftsEnabled) {
    return <TechnicalArticlesClient pageData={getGermanTechnicalArticlesPageData()} />;
  }
  if (locale === "it" && languageDraftsEnabled) {
    return <TechnicalArticlesClient pageData={getItalianTechnicalArticlesPageData()} />;
  }
  if (locale === "hi" && languageDraftsEnabled) {
    return <TechnicalArticlesClient pageData={getHindiTechnicalArticlesPageData()} />;
  }
  if (locale === "de" || locale === "it" || locale === "hi") notFound();

  if (!SUPPORTED_LOCALES.includes(locale)) {
    notFound();
  }

  const pageData = getTechnicalArticlesPageData(locale);

  return <TechnicalArticlesClient pageData={pageData} />;
}

export const generateMetadata = withPublishedTranslationMetadata("/resources/technical-articles/", getPageMetadata);
