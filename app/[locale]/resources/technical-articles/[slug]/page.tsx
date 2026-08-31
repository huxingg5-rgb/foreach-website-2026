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

function getTechnicalArticleLanguageLinks(slug: string) {
  const basePath = `/resources/technical-articles/${slug}/`;

  const languageLinks: Record<string, string> = {
    "zh-CN": basePath,
    en: `/en${basePath}`,
    es: `/es${basePath}`,
    fr: `/fr${basePath}`,
    ko: `/ko${basePath}`,
    ru: `/ru${basePath}`,
  };

  if (
    slug === "brushed-vs-brushless-diaphragm-pump-3000h-10000h" ||
    slug === "life-science-dpl60-600ml-min-diaphragm-pump-selection-guide"
  ) {
    languageLinks["x-default"] = basePath;
  }

  return languageLinks;
}

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

  const seoTitle = article.seoTitle ?? article.title;
  const metaTitle = /FOREACH/i.test(seoTitle)
    ? seoTitle
    : locale === "en"
      ? `${seoTitle}｜Technical Articles｜FOREACH`
      : `${seoTitle}｜FOREACH`;
  const description = article.seoDescription ?? article.summary;
  const canonicalUrl =
    `https://www.foreachtek.com/${locale}/resources/technical-articles/${slug}/`;
  const socialImage = article.coverImage
    ? new URL(article.coverImage, "https://www.foreachtek.com").toString()
    : undefined;

  return {
    title: metaTitle,
    description,
    alternates: {
      canonical: `/${locale}/resources/technical-articles/${slug}/`,
      languages: getTechnicalArticleLanguageLinks(slug),
    },
    openGraph: {
      type: "article",
      url: canonicalUrl,
      title: metaTitle,
      description,
      ...(socialImage
        ? { images: [{ url: socialImage, alt: article.coverAlt ?? article.title }] }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: metaTitle,
      description,
      ...(socialImage ? { images: [socialImage] } : {}),
    },
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
