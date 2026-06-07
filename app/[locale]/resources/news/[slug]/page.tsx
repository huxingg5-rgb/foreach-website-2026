/* =========================================================
   page.tsx
   恒永达官网｜外语公司新闻详情页入口

   页面路径：
   /en/resources/news/[slug]
   /es/resources/news/[slug]
   /fr/resources/news/[slug]
   /ko/resources/news/[slug]
   /ru/resources/news/[slug]

   说明：
   1. 外语页面第一版统一使用英文新闻数据
   2. 支持静态导出
   3. 中文新闻详情页不走这里
========================================================= */

import type { Metadata } from "next";
import { notFound } from "next/navigation";

import NewsArticleClient from "@/components/resources/news/NewsArticleClient";
import { getNewsPageData } from "@/services/resources/news/getNewsPageData";
import {
  getNewsArticleData,
  getNewsSlugs,
} from "@/services/resources/news/getNewsArticleData";

import "@/app/resources/news/news.css";

import type { NewsLocale } from "@/data/resources/news/news.types";

const SUPPORTED_LOCALES: NewsLocale[] = ["en", "es", "fr", "ko", "ru"];

interface NewsIntlArticlePageProps {
  params: Promise<{
    locale: NewsLocale;
    slug: string;
  }>;
}

export function generateStaticParams() {
  return SUPPORTED_LOCALES.flatMap((locale) =>
    getNewsSlugs(locale).map((slug) => ({
      locale,
      slug,
    }))
  );
}

export async function generateMetadata({
  params,
}: NewsIntlArticlePageProps): Promise<Metadata> {
  const { locale, slug } = await params;

  if (!SUPPORTED_LOCALES.includes(locale)) {
    return {};
  }

  const article = getNewsArticleData(locale, slug);

  if (!article) {
    return {};
  }

  return {
    title: `${article.seoTitle ?? article.title}｜News｜FOREACH`,
    description: article.seoDescription ?? article.summary,
  };
}

export default async function NewsIntlArticlePage({
  params,
}: NewsIntlArticlePageProps) {
  const { locale, slug } = await params;

  if (!SUPPORTED_LOCALES.includes(locale)) {
    notFound();
  }

  const pageData = getNewsPageData(locale);
  const article = getNewsArticleData(locale, slug);

  if (!article) {
    notFound();
  }

  return <NewsArticleClient pageData={pageData} article={article} />;
} 