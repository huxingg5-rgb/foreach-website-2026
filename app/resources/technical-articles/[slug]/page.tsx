/* =========================================================
   page.tsx
   恒永达官网｜中文技术文章详情页入口

   页面路径：
   /resources/technical-articles/[slug]
========================================================= */

import type { Metadata } from "next";
import { notFound } from "next/navigation";

import TechnicalArticleDetail from "@/components/resources/technical-articles/TechnicalArticleDetail";
import { getTechnicalArticlesPageData } from "@/services/resources/technical-articles/getTechnicalArticlesPageData";
import {
  getTechnicalArticleData,
  getTechnicalArticleSlugs,
} from "@/services/resources/technical-articles/getTechnicalArticleData";

import "../technical-articles.css";

interface TechnicalArticleDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export function generateStaticParams() {
  return getTechnicalArticleSlugs("zh-CN").map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({
  params,
}: TechnicalArticleDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getTechnicalArticleData("zh-CN", slug);

  if (!article) {
    return {};
  }

  return {
    title: `${article.seoTitle ?? article.title}｜技术文章｜FOREACH 恒永达`,
    description: article.seoDescription ?? article.summary,
  };
}

export default async function TechnicalArticleDetailPage({
  params,
}: TechnicalArticleDetailPageProps) {
  const { slug } = await params;

  const pageData = getTechnicalArticlesPageData("zh-CN");
  const article = getTechnicalArticleData("zh-CN", slug);

  if (!article) {
    notFound();
  }

  return <TechnicalArticleDetail pageData={pageData} article={article} />;
}