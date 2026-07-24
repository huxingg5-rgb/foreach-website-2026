/* =========================================================
   page.tsx
   恒永达官网｜外语技术文章详情页入口

   页面路径：
   /en/resources/technical-articles/[slug]
   /es/resources/technical-articles/[slug]
   /fr/resources/technical-articles/[slug]
   /ko/resources/technical-articles/[slug]
   /ru/resources/technical-articles/[slug]
========================================================= */

import type { Metadata } from "next";
import { notFound } from "next/navigation";

import TechnicalArticleDetail from "@/components/resources/technical-articles/TechnicalArticleDetail";
import { getTechnicalArticlesPageData } from "@/services/resources/technical-articles/getTechnicalArticlesPageData";
import {
  getTechnicalArticleData,
  getTechnicalArticleSlugs,
} from "@/services/resources/technical-articles/getTechnicalArticleData";

import "@/app/resources/technical-articles/technical-articles.css";

import type { TechnicalArticleLocale } from "@/data/resources/technical-articles/technical-articles.types";
import "@/app/resources/news/news.css";

const SUPPORTED_LOCALES: TechnicalArticleLocale[] = ["en", "es", "fr", "ko", "ru"];

interface TechnicalArticleIntlDetailPageProps {
  params: Promise<{
    locale: TechnicalArticleLocale;
    slug: string;
  }>;
}

export function generateStaticParams() {
  return SUPPORTED_LOCALES.flatMap((locale) =>
    getTechnicalArticleSlugs(locale).map((slug) => ({
      locale,
      slug,
    }))
  );
}

export async function generateMetadata({
  params,
}: TechnicalArticleIntlDetailPageProps): Promise<Metadata> {
  const { locale, slug } = await params;

  if (!SUPPORTED_LOCALES.includes(locale)) {
    return {};
  }

  const article = getTechnicalArticleData(locale, slug);

  if (!article) {
    return {};
  }

  return {
    title: locale === "en"
      ? `${article.seoTitle ?? article.title}｜Technical Articles｜FOREACH`
      : `${article.seoTitle ?? article.title}｜FOREACH`,
    description: article.seoDescription ?? article.summary,
    ...(locale === "en" ? {} : { openGraph: { title: `${article.seoTitle ?? article.title}｜FOREACH`, description: article.seoDescription ?? article.summary } }),
  };
}

export default async function TechnicalArticleIntlDetailPage({
  params,
}: TechnicalArticleIntlDetailPageProps) {
  const { locale, slug } = await params;

  if (!SUPPORTED_LOCALES.includes(locale)) {
    notFound();
  }

  const pageData = getTechnicalArticlesPageData(locale);
  const article = getTechnicalArticleData(locale, slug);

  if (!article) {
    notFound();
  }

  return <TechnicalArticleDetail pageData={pageData} article={article} />;
}
