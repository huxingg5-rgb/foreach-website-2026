/* =========================================================
   page.tsx
   恒永达官网｜中文技术文章详情页入口

   页面路径：
   /resources/technical-articles/[slug]

   说明：
   1. 技术文章栏目和 URL 保持不变
   2. 打开后的详情页使用新闻中心同一套组件
   3. 根据当前 slug 自动计算上一篇 / 下一篇
   4. 支持静态导出
========================================================= */

import type { Metadata } from "next";
import { notFound } from "next/navigation";

import TechnicalArticleDetail from "@/components/resources/technical-articles/TechnicalArticleDetail";

import { getTechnicalArticlesPageData } from "@/services/resources/technical-articles/getTechnicalArticlesPageData";

import {
  getTechnicalArticleData,
  getTechnicalArticleSlugs,
} from "@/services/resources/technical-articles/getTechnicalArticleData";
import type { TechnicalArticleLocale } from "@/data/resources/technical-articles/technical-articles.types";

/*
 * 保留技术文章列表页原有样式。
 * 详情页主体实际使用 NewsArticleClient.module.css。
 */
import "../technical-articles.css";

/*
 * 复用新闻详情页的面包屑外层结构。
 */
import "@/app/resources/news/news.css";

/* =========================================================
   中文技术文章语言标识
========================================================= */

const TECHNICAL_ARTICLE_LOCALE =
  "zh-CN" as const;

const TECHNICAL_ARTICLE_LOCALES: TechnicalArticleLocale[] = [
  "zh-CN",
  "en",
  "es",
  "fr",
  "ko",
  "ru",
];

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

  const availableLanguageLinks = Object.fromEntries(
    TECHNICAL_ARTICLE_LOCALES.filter((locale) =>
      getTechnicalArticleData(locale, slug),
    ).map((locale) => [locale, languageLinks[locale]]),
  );

  if (
    slug === "brushed-vs-brushless-diaphragm-pump-3000h-10000h" ||
    slug === "life-science-dpl60-600ml-min-diaphragm-pump-selection-guide"
  ) {
    availableLanguageLinks["x-default"] = basePath;
  }

  return availableLanguageLinks;
}

/* =========================================================
   页面参数
========================================================= */

interface TechnicalArticleDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

/* =========================================================
   上一篇 / 下一篇字段
========================================================= */

type TechnicalPagerItem = {
  title: string;
  href: string;
  date?: string;
};

/* =========================================================
   获取上一篇 / 下一篇
========================================================= */

function getTechnicalArticlePagerData(
  currentSlug: string
): {
  previousArticle: TechnicalPagerItem | null;
  nextArticle: TechnicalPagerItem | null;
} {
  const slugs =
    getTechnicalArticleSlugs(
      TECHNICAL_ARTICLE_LOCALE
    );

  const currentIndex =
    slugs.findIndex(
      (item) => item === currentSlug
    );

  if (currentIndex < 0) {
    return {
      previousArticle: null,
      nextArticle: null,
    };
  }

  const previousSlug =
    currentIndex > 0
      ? slugs[currentIndex - 1]
      : null;

  const nextSlug =
    currentIndex < slugs.length - 1
      ? slugs[currentIndex + 1]
      : null;

  const previousArticleData =
    previousSlug
      ? getTechnicalArticleData(
          TECHNICAL_ARTICLE_LOCALE,
          previousSlug
        )
      : null;

  const nextArticleData =
    nextSlug
      ? getTechnicalArticleData(
          TECHNICAL_ARTICLE_LOCALE,
          nextSlug
        )
      : null;

  return {
    previousArticle:
      previousSlug &&
      previousArticleData
        ? {
            title:
              previousArticleData.title,

            href:
              `/resources/technical-articles/${previousSlug}`,

            date:
              previousArticleData.date,
          }
        : null,

    nextArticle:
      nextSlug &&
      nextArticleData
        ? {
            title:
              nextArticleData.title,

            href:
              `/resources/technical-articles/${nextSlug}`,

            date:
              nextArticleData.date,
          }
        : null,
  };
}

/* =========================================================
   静态导出路径
========================================================= */

export function generateStaticParams() {
  return getTechnicalArticleSlugs(
    TECHNICAL_ARTICLE_LOCALE
  ).map((slug) => ({
    slug,
  }));
}

/* =========================================================
   SEO
========================================================= */

export async function generateMetadata({
  params,
}: TechnicalArticleDetailPageProps): Promise<Metadata> {
  const { slug } = await params;

  const article =
    getTechnicalArticleData(
      TECHNICAL_ARTICLE_LOCALE,
      slug
    );

  if (!article) {
    return {};
  }

  const canonicalUrl =
    `https://www.foreachtek.com/resources/technical-articles/${slug}/`;
  const seoTitle = article.seoTitle ?? article.title;
  const metaTitle = /FOREACH|恒永达/i.test(seoTitle)
    ? seoTitle
    : `${seoTitle}｜技术文章｜FOREACH 恒永达`;
  const socialImage = article.coverImage
    ? new URL(article.coverImage, "https://www.foreachtek.com").toString()
    : undefined;

  return {
    title: metaTitle,

    description:
      article.seoDescription ??
      article.summary,

    alternates: {
      canonical: `/resources/technical-articles/${slug}/`,
      languages: getTechnicalArticleLanguageLinks(slug),
    },

    openGraph: {
      type: "article",
      url: canonicalUrl,
      title: metaTitle,
      description: article.seoDescription ?? article.summary,
      ...(socialImage
        ? { images: [{ url: socialImage, alt: article.coverAlt ?? article.title }] }
        : {}),
    },

    twitter: {
      card: "summary_large_image",
      title: metaTitle,
      description: article.seoDescription ?? article.summary,
      ...(socialImage ? { images: [socialImage] } : {}),
    },
  };
}

/* =========================================================
   中文技术文章详情页
========================================================= */

export default async function TechnicalArticleDetailPage({
  params,
}: TechnicalArticleDetailPageProps) {
  const { slug } = await params;

  const pageData =
    getTechnicalArticlesPageData(
      TECHNICAL_ARTICLE_LOCALE
    );

  const article =
    getTechnicalArticleData(
      TECHNICAL_ARTICLE_LOCALE,
      slug
    );

  if (!article) {
    notFound();
  }

  const {
    previousArticle,
    nextArticle,
  } =
    getTechnicalArticlePagerData(slug);

  return (
    <TechnicalArticleDetail
      pageData={pageData}
      article={article}
      previousArticle={previousArticle}
      nextArticle={nextArticle}
    />
  );
}
