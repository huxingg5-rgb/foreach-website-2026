/* =========================================================
   page.tsx
   恒永达官网｜中文公司新闻详情页入口

   页面路径：
   /resources/news/[slug]

   说明：
   1. 根据 slug 读取对应新闻详情
   2. 支持静态导出 generateStaticParams
   3. 数据从 service 层获取
========================================================= */

import type { Metadata } from "next";
import { notFound } from "next/navigation";

import NewsArticleClient from "@/components/resources/news/NewsArticleClient";
import { getNewsPageData } from "@/services/resources/news/getNewsPageData";
import {
  getNewsArticleData,
  getNewsSlugs,
} from "@/services/resources/news/getNewsArticleData";

import "../news.css";

interface NewsArticlePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export function generateStaticParams() {
  return getNewsSlugs("zh-CN").map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({
  params,
}: NewsArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getNewsArticleData("zh-CN", slug);

  if (!article) {
    return {};
  }

  return {
    title: `${article.seoTitle ?? article.title}｜公司新闻｜FOREACH 恒永达`,
    description: article.seoDescription ?? article.summary,
  };
}

export default async function NewsArticlePage({
  params,
}: NewsArticlePageProps) {
  const { slug } = await params;

  const pageData = getNewsPageData("zh-CN");
  const article = getNewsArticleData("zh-CN", slug);

  if (!article) {
    notFound();
  }

  return <NewsArticleClient pageData={pageData} article={article} />;
} 