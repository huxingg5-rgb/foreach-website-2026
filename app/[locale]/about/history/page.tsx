/* =========================================================
   page.tsx
   恒永达官网｜关于我们 / 发展历程多语言页面入口

   路径：
   /en/about/history
   /es/about/history
   /fr/about/history
   /ko/about/history
   /ru/about/history

   说明：
   1. 这个文件现在只负责多语言页面入口
   2. 页面结构统一放在 components/about/HistoryPageContent.tsx
   3. 页面数据仍然来自 data/historyMilestones.ts
   4. 后期修改历史页面结构，只改 HistoryPageContent.tsx
========================================================= */

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import HistoryPageContent from "@/components/about/HistoryPageContent";
import { getHistoryPageText } from "@/data/historyMilestones";

/* ================================
   多语言历史页支持的语言
   说明：
   1. 中文页面不放在这里
   2. 中文页面使用 /about/history
================================ */
const supportedHistoryLocales = ["en", "es", "fr", "ko", "ru"] as const;

type SupportedHistoryLocale = (typeof supportedHistoryLocales)[number];

/* ================================
   根据 getHistoryPageText 自动推导数据语言类型
================================ */
type HistoryPageLocale = Parameters<typeof getHistoryPageText>[0];

/* ================================
   判断当前 locale 是否支持
================================ */
function isSupportedHistoryLocale(
  locale: string
): locale is SupportedHistoryLocale {
  return supportedHistoryLocales.includes(locale as SupportedHistoryLocale);
}

/* ================================
   多语言链接
   说明：
   用于 SEO hreflang
================================ */
const historyPageLinks = {
  "zh-CN": "/about/history",
  en: "/en/about/history",
  es: "/es/about/history",
  fr: "/fr/about/history",
  ko: "/ko/about/history",
  ru: "/ru/about/history",
};

/* ================================
   页面参数类型
   说明：
   沿用你当前项目 Next.js 的 params Promise 写法
================================ */
type PageProps = {
  params: Promise<{
    locale: string;
  }>;
};

/* ================================
   静态生成多语言路径
================================ */
export function generateStaticParams() {
  return supportedHistoryLocales.map((locale) => ({
    locale,
  }));
}

/* ================================
   多语言页面 SEO 信息
================================ */
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;

  if (!isSupportedHistoryLocale(locale)) {
    return {};
  }

  const pageText = getHistoryPageText(locale as HistoryPageLocale);

  return {
    title: pageText.metadataTitle,
    description: pageText.metadataDescription,
    alternates: {
      canonical: historyPageLinks[locale],
      languages: historyPageLinks,
    },
  };
}

/* ================================
   多语言发展历程页面
   说明：
   页面结构由统一组件 HistoryPageContent 渲染
================================ */
export default async function AboutHistoryLocalePage({ params }: PageProps) {
  const { locale } = await params;

  if (!isSupportedHistoryLocale(locale)) {
    notFound();
  }

  return <HistoryPageContent locale={locale as HistoryPageLocale} />;
} 