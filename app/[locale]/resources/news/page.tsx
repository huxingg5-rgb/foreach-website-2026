import { withPublishedTranslationMetadata } from "@/lib/seo/published-translation-metadata";
import { buildDraftPageMetadata, buildInternationalPageMetadata } from "@/lib/seo/international-page-metadata";
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
import { languageDraftsEnabled } from "@/lib/i18n/draft-languages";

import "@/app/resources/news/news.css";

import type { NewsLocale, NewsResourceLocale } from "@/data/resources/news/news.types";

const SUPPORTED_LOCALES: NewsLocale[] = ["en", "es", "fr", "ko", "ru"];

interface NewsIntlPageProps {
  params: Promise<{
    locale: NewsResourceLocale;
  }>;
}

export function generateStaticParams() {
  const locales = languageDraftsEnabled ? [...SUPPORTED_LOCALES, "de", "it", "hi"] : SUPPORTED_LOCALES;
  return locales.map((locale) => ({ locale }));
}

async function getPageMetadata({ params }: NewsIntlPageProps): Promise<Metadata> {
  const { locale } = await params;
  if (locale === "hi") {
    if (!languageDraftsEnabled) return {};
    const { hero } = getNewsPageData(locale);
    const title = hero.title + " | FOREACH";
    const canonical = "/hi/resources/news/";
    return {
      title, description: hero.description, alternates: { canonical },
      openGraph: { title, description: hero.description, url: canonical, locale: "hi_IN", siteName: "FOREACH", type: "website" },
      robots: { index: false, follow: true },
    };
  }
  if (locale === "it") {
    if (!languageDraftsEnabled) return {};
    const { hero } = getNewsPageData(locale);
    const title = hero.title + " | FOREACH";
    const canonical = "/it/resources/news/";
    return {
      title, description: hero.description, alternates: { canonical },
      openGraph: { title, description: hero.description, url: canonical, locale: "it_IT", siteName: "FOREACH", type: "website" },
      robots: { index: false, follow: true },
    };
  }
  if (locale === "de") {
    if (!languageDraftsEnabled) return {};
    const { hero } = getNewsPageData(locale);
    return buildDraftPageMetadata({
      locale,
      canonical: "/de/resources/news/",
      title: `${hero.title} | FOREACH`,
      description: hero.description,
    });
  }
  const pageData = getNewsPageData(locale);
  const sectionLabels: Record<NewsLocale, string> = {
    "zh-CN": "资源中心", en: "Resources", es: "Recursos", fr: "Ressources", ko: "자료", ru: "Ресурсы",
  };
  const metadata = locale === "en"
    ? { title: "Company News | FOREACH", description: "Follow Foreach updates in exhibitions, company development, technology innovation, quality systems and important announcements." }
    : { title: `${pageData.hero.title}｜${sectionLabels[locale]}｜Foreach Technology`, description: pageData.hero.description };
  return buildInternationalPageMetadata({ locale, path: "/resources/news/", ...metadata });
}

export default async function NewsIntlPage({ params }: NewsIntlPageProps) {
  const { locale } = await params;

  if (locale === "de" || locale === "it" || locale === "hi" ? !languageDraftsEnabled : !SUPPORTED_LOCALES.includes(locale)) {
    notFound();
  }

  const pageData = getNewsPageData(locale);

  return <NewsListClient pageData={pageData} />;
}

export const generateMetadata = withPublishedTranslationMetadata("/resources/news/", getPageMetadata);
