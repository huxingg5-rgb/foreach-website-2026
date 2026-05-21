/* =========================================================
   page.tsx
   恒永达官网｜多语言关于恒永达页面

   路径：
   /en/about/foreach
   /es/about/foreach
   /fr/about/foreach
   /ko/about/foreach
   /ru/about/foreach

   说明：
   1. 这个文件负责生成多语言访问路径
   2. 页面主体复用中文页面里的 AboutForeachClient 组件
   3. AboutForeachClient.tsx 内部已经能根据 URL 第一段识别语言
   4. 所以这里不需要再传 locale 参数
========================================================= */

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import AboutForeachClient from "@/app/about/foreach/AboutForeachClient";

/* 官网当前支持的非中文语言 */
const ABOUT_FOREACH_LOCALES = ["en", "es", "fr", "ko", "ru"] as const;

type AboutForeachLocale = (typeof ABOUT_FOREACH_LOCALES)[number];

type LocaleAboutForeachPageProps = {
  params: Promise<{
    locale: string;
  }>;
};

/* 多语言 SEO 文案 */
const metadataMap: Record<
  AboutForeachLocale,
  {
    title: string;
    description: string;
  }
> = {
  en: {
    title: "About FOREACH｜FOREACH Technology",
    description:
      "FOREACH focuses on microfluidic core components and fluidic system solutions for IVD, life sciences, high-end analytical instruments, synthetic biology, and laboratory automation.",
  },
  es: {
    title: "Sobre FOREACH｜FOREACH Technology",
    description:
      "FOREACH se centra en componentes centrales de microfluídica y soluciones de sistemas fluídicos para IVD, ciencias de la vida, instrumentos analíticos de alta gama, biología sintética y automatización de laboratorio.",
  },
  fr: {
    title: "À propos de FOREACH｜FOREACH Technology",
    description:
      "FOREACH se concentre sur les composants clés de microfluidique et les solutions de systèmes fluidiques pour l’IVD, les sciences de la vie, les instruments analytiques haut de gamme, la biologie synthétique et l’automatisation de laboratoire.",
  },
  ko: {
    title: "FOREACH 소개｜FOREACH Technology",
    description:
      "FOREACH는 IVD, 생명과학, 고급 분석기기, 합성생물학 및 실험실 자동화를 위한 미세유체 핵심 부품과 유체 시스템 솔루션에 집중합니다.",
  },
  ru: {
    title: "О FOREACH｜FOREACH Technology",
    description:
      "FOREACH специализируется на ключевых компонентах микрофлюидики и решениях жидкостных систем для IVD, наук о жизни, высококлассных аналитических приборов, синтетической биологии и лабораторной автоматизации.",
  },
};

/* 生成静态多语言路径 */
export function generateStaticParams() {
  return ABOUT_FOREACH_LOCALES.map((locale) => ({
    locale,
  }));
}

/* 生成当前语言页面的 SEO 信息 */
export async function generateMetadata({
  params,
}: LocaleAboutForeachPageProps): Promise<Metadata> {
  const { locale } = await params;

  if (!isAboutForeachLocale(locale)) {
    return {};
  }

  return {
    title: metadataMap[locale].title,
    description: metadataMap[locale].description,
  };
}

/* 多语言关于恒永达页面 */
export default async function LocaleAboutForeachPage({
  params,
}: LocaleAboutForeachPageProps) {
  const { locale } = await params;

  if (!isAboutForeachLocale(locale)) {
    notFound();
  }

  return <AboutForeachClient />;
}

/* 判断当前 URL 语言是否允许访问 */
function isAboutForeachLocale(locale: string): locale is AboutForeachLocale {
  return ABOUT_FOREACH_LOCALES.includes(locale as AboutForeachLocale);
} 