import { withPublishedTranslationMetadata } from "@/lib/seo/published-translation-metadata";
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

import TechnicalArticleDetail, { GermanTechnicalArticleDetail, ItalianTechnicalArticleDetail } from "@/components/resources/technical-articles/TechnicalArticleDetail";
import HindiEngineeringArticleDetail from "@/components/resources/technical-articles/HindiEngineeringArticleDetail";
import { buildTechnicalArticleStructuredData } from "@/components/resources/technical-articles/TechnicalArticleDetail";
import { getHindiTechnicalArticleEdition, getHindiTechnicalArticleFields, getHindiTechnicalArticlesPageData, hindiTechnicalArticleSlugs } from "@/services/resources/technical-articles/getHindiTechnicalArticlesPageData";
import { getTechnicalArticlesPageData } from "@/services/resources/technical-articles/getTechnicalArticlesPageData";
import { getGermanTechnicalArticlesPageData, type GermanTechnicalArticleCard } from "@/services/resources/technical-articles/getGermanTechnicalArticlesPageData";
import { germanTechnicalArticleSlugs } from "@/data/resources/technical-articles/technical-article-slugs.de";
import { getGermanTechnicalArticleCopy } from "@/services/resources/technical-articles/getGermanTechnicalArticleCopy";
import { getHindiDraftLink, getItalianDraftLink, hindiEnglishFallbackSuffix, italianEnglishFallbackSuffix, languageDraftsEnabled } from "@/lib/i18n/draft-languages";
import { getItalianArticleFields, getItalianTechnicalArticleEdition, getItalianTechnicalArticlesPageData, italianTechnicalArticleSlugs } from "@/services/resources/technical-articles/getItalianTechnicalArticlesPageData"; // Italian preview editions.
import { pistonPumpCopyToArticle } from "@/data/resources/technical-articles/piston-pump-articles.types";
import {
  getTechnicalArticleData,
  getTechnicalArticlePagerData,
  getTechnicalArticleSlugs,
} from "@/services/resources/technical-articles/getTechnicalArticleData";

import "@/app/resources/technical-articles/technical-articles.css";

import type { TechnicalArticleLocale } from "@/data/resources/technical-articles/technical-articles.types";

import "@/app/resources/news/news.css";

const SUPPORTED_LOCALES: TechnicalArticleLocale[] = ["en", "es", "fr", "ko", "ru"];
const TECHNICAL_ARTICLE_LOCALES: TechnicalArticleLocale[] = [
  "zh-CN",
  ...SUPPORTED_LOCALES,
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

  if (availableLanguageLinks["zh-CN"]) {
    availableLanguageLinks["x-default"] = basePath;
  }

  return availableLanguageLinks;
}

interface TechnicalArticleIntlDetailPageProps {
  params: Promise<{
    locale: TechnicalArticleLocale | "de" | "it" | "hi";
    slug: string;
  }>;
}

export function generateStaticParams() {
  return [
    ...SUPPORTED_LOCALES.flatMap((locale) => getTechnicalArticleSlugs(locale).map((slug) => ({ locale, slug }))),
    ...(languageDraftsEnabled ? germanTechnicalArticleSlugs.map((slug) => ({ locale: "de", slug })) : []),
    ...(languageDraftsEnabled ? italianTechnicalArticleSlugs.map((slug) => ({ locale: "it", slug })) : []),
    ...(languageDraftsEnabled ? hindiTechnicalArticleSlugs.map((slug) => ({ locale: "hi", slug })) : []),
  ];
}

function getGermanArticle(slug: string) {
  if (!languageDraftsEnabled || !germanTechnicalArticleSlugs.includes(slug)) return null;
  const edition = getGermanTechnicalArticleCopy(slug);
  const pageData = getGermanTechnicalArticlesPageData();
  const index = pageData.articles.findIndex((item) => item.slug === slug);
  if (!edition || index < 0) return null;
  const localizedFields = edition.kind === "piston"
    ? pistonPumpCopyToArticle(edition.copy)
    : { ...edition.copy.metadata, summary: edition.copy.deck };
  const article = { ...pageData.articles[index], ...localizedFields };
  const toPagerItem = (item: GermanTechnicalArticleCard | undefined) => item ? ({
    title: item.sourceLanguage === "en" ? `${item.title} (Englisch)` : item.title,
    href: `/de/resources/technical-articles/${item.slug}/`,
    date: item.date,
  }) : null;
  return { article, edition, pageData, previousArticle: toPagerItem(pageData.articles[index - 1]), nextArticle: toPagerItem(pageData.articles[index + 1]) };
}

function getItalianArticle(slug: string) {
  if (!languageDraftsEnabled) return null;
  const edition = getItalianTechnicalArticleEdition(slug);
  if (!edition) return null;
  const pageData = getItalianTechnicalArticlesPageData();
  const index = pageData.articles.findIndex(item => item.slug === slug);
  if (index < 0) return null;
  const article = { ...pageData.articles[index], ...getItalianArticleFields(edition) };
  const toPagerItem = (item: (typeof pageData.articles)[number] | undefined) => {
    if (!item) return null;
    const path = getItalianDraftLink("/en/resources/technical-articles/" + item.slug + "/");
    return {
      title: item.title + (path.hrefLang === "en" ? italianEnglishFallbackSuffix : ""),
      href: path.href,
      date: item.date,
    };
  };
  return { article, edition, pageData, previousArticle: toPagerItem(pageData.articles[index - 1]), nextArticle: toPagerItem(pageData.articles[index + 1]) };
}

function getHindiArticle(slug: string) {
  if (!languageDraftsEnabled) return null;
  const edition = getHindiTechnicalArticleEdition(slug);
  if (!edition) return null;
  const pageData = getHindiTechnicalArticlesPageData();
  const index = pageData.articles.findIndex(item => item.slug === slug);
  if (index < 0) return null;
  const article = { ...pageData.articles[index], ...getHindiTechnicalArticleFields(edition) };
  const toPagerItem = (item: (typeof pageData.articles)[number] | undefined) => {
    if (!item) return null;
    const target = getHindiDraftLink("/en/resources/technical-articles/" + item.slug + "/");
    return {
      title: item.title + (target.hrefLang === "en" ? hindiEnglishFallbackSuffix : ""),
      href: target.href,
      date: item.date,
    };
  };
  return { article, edition, pageData, previousArticle: toPagerItem(pageData.articles[index - 1]), nextArticle: toPagerItem(pageData.articles[index + 1]) };
}

async function getPageMetadata({
  params,
}: TechnicalArticleIntlDetailPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  if (locale === "de") {
    const german = getGermanArticle(slug);
    if (!german) return {};
    const { article } = german;
    const seoTitle = article.seoTitle ?? article.title;
    const title = /FOREACH/i.test(seoTitle) ? seoTitle : `${seoTitle} | FOREACH`;
    const description = article.seoDescription ?? article.summary;
    const canonical = `/de/resources/technical-articles/${slug}/`;
    const image = new URL(article.coverImage, "https://www.foreachtek.com").toString();
    return {
      title,
      description,
      alternates: { canonical },
      robots: { index: false, follow: true },
      openGraph: { type: "article", locale: "de_DE", url: canonical, title, description, images: [{ url: image, alt: article.coverAlt ?? article.title }] },
      twitter: { card: "summary_large_image", title, description, images: [image] },
    };
  }

  if (locale === "it") {
    const italian = getItalianArticle(slug);
    if (!italian) return {};
    const { article } = italian;
    const title = article.seoTitle ?? article.title;
    const description = article.seoDescription ?? article.summary;
    const canonical = "/it/resources/technical-articles/" + slug + "/";
    const image = new URL(article.coverImage ?? "/images/logo/foreach-logo-color.svg", "https://www.foreachtek.com").toString();
    return {
      title, description, alternates: { canonical }, robots: { index: false, follow: true },
      openGraph: { type: "article", locale: "it_IT", url: canonical, title, description, images: [{ url: image, alt: article.coverAlt ?? article.title }] },
      twitter: { card: "summary_large_image", title, description, images: [image] },
    };
  }
  if (locale === "hi") {
    const hindi = getHindiArticle(slug);
    if (!hindi) return {};
    const { article } = hindi;
    const title = article.seoTitle ?? article.title;
    const description = article.seoDescription ?? article.summary;
    const canonical = "/hi/resources/technical-articles/" + slug + "/";
    const image = new URL(article.coverImage, "https://www.foreachtek.com").toString();
    return {
      title, description, alternates: { canonical }, robots: { index: false, follow: true },
      openGraph: { type: "article", locale: "hi_IN", url: canonical, title, description, images: [{ url: image, alt: article.coverAlt ?? article.title }] },
      twitter: { card: "summary_large_image", title, description, images: [image] },
    };
  }
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
      ? `${seoTitle}｜Technical Articles｜Foreach Technology`
      : `${seoTitle}｜Foreach Technology`;
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
  if (locale === "de") {
    const german = getGermanArticle(slug);
    if (!german) notFound();
    return <GermanTechnicalArticleDetail {...german} />;
  }

  if (locale === "it") {
    const italian = getItalianArticle(slug);
    if (!italian) notFound();
    return <ItalianTechnicalArticleDetail {...italian} />;
  }
  if (locale === "hi") {
    const hindi = getHindiArticle(slug);
    if (!hindi) notFound();
    const { edition } = hindi;
    const faq = edition.kind === "piston" ? edition.copy.faq : edition.kind === "standard-diaphragm" ? edition.faq.items : edition.kind === "dpgl800" || edition.kind === "dpl30h" || edition.kind === "cv-kv" ? [] : edition.copy.faqItems;
    const subject = edition.kind === "piston" ? edition.copy.subject : edition.kind === "selection" ? edition.subject
      : edition.kind === "dpgl800" ? { about: ["DPGL800 गैस-द्रव डायाफ्राम पंप"], mentions: edition.copy.section9.standardModelRows.map(row => row[1]) }
      : edition.kind === "dpl30h" ? { about: ["DPL30H उच्च-दबाव द्रव डायाफ्राम पंप"], mentions: edition.copy.section10.standardModelRows.map(row => row[1]) }
      : edition.kind === "standard-diaphragm" ? edition.dpl60Copy
        ? { about: ["DPL60 द्रव डायाफ्राम पंप"], mentions: edition.dpl60Copy.section8.standardModelRows.map(row => row[2]) }
        : { about: ["DPL30 द्रव डायाफ्राम पंप"], mentions: ["DPL30-24DB-EP/PS", "DPL30-24BB-EP/PS"] }
      : edition.kind === "brushless-wiring" ? { about: ["ब्रशलेस डायाफ्राम पंप", "2-तार और 5-तार वायरिंग"], mentions: edition.copy.products.cards.map(card => card.model) } : undefined;
    const structuredData = buildTechnicalArticleStructuredData(hindi.pageData, hindi.article, "hi",
      edition.kind === "selection" ? edition.schemaFaq ?? faq : faq, subject, "TechArticle", edition.kind === "selection" ? edition.sources : undefined);
    return <HindiEngineeringArticleDetail {...hindi} structuredData={structuredData} />;
  }
  if (!SUPPORTED_LOCALES.includes(locale)) {
    notFound();
  }

  const pageData = getTechnicalArticlesPageData(locale);
  const article = getTechnicalArticleData(locale, slug);

  if (!article) {
    notFound();
  }

  const { previousArticle, nextArticle } = getTechnicalArticlePagerData(locale, slug);

  return (
    <TechnicalArticleDetail
      pageData={pageData}
      article={article}
      previousArticle={previousArticle}
      nextArticle={nextArticle}
    />
  );
}

export const generateMetadata = withPublishedTranslationMetadata("/resources/technical-articles/[slug]/", getPageMetadata);
