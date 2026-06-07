/* =========================================================
   page.tsx
   恒永达官网｜外语公司新闻列表页入口

   页面路径：
   /en/resources/news
   /es/resources/news
   /fr/resources/news
   /ko/resources/news
   /ru/resources/news

   说明：
   1. 外语页面通过 locale 动态路由生成
   2. 当前外语统一读取英文新闻数据
   3. 中文页面不走这里，中文走 app/resources/news/page.tsx
   4. 支持静态导出 generateStaticParams
========================================================= */

import type { Metadata } from "next";
import { notFound } from "next/navigation";

import NewsListClient from "@/components/resources/news/NewsListClient";
import { getNewsPageData } from "@/services/resources/news/getNewsPageData";

import "@/app/resources/news/news.css";

import type { NewsLocale } from "@/data/resources/news/news.types";

const SUPPORTED_LOCALES: NewsLocale[] = ["en", "es", "fr", "ko", "ru"];

interface NewsIntlPageProps {
  params: Promise<{
    locale: NewsLocale;
  }>;
}

export function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locale) => ({
    locale,
  }));
}

export const metadata: Metadata = {
  title: "News｜Resources｜FOREACH",
  description:
    "Follow FOREACH updates in exhibitions, company development, technology innovation, quality systems and important announcements.",
};

export default async function NewsIntlPage({ params }: NewsIntlPageProps) {
  const { locale } = await params;

  if (!SUPPORTED_LOCALES.includes(locale)) {
    notFound();
  }

  const pageData = getNewsPageData(locale);

  return <NewsListClient pageData={pageData} />;
} 