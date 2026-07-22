/* =========================================================
   page.tsx
   恒永达官网｜关于我们 / 企业文化多语言页面入口

   路径：
   /en/about/culture
   /es/about/culture
   /fr/about/culture
   /ko/about/culture
   /ru/about/culture

   说明：
   1. 这个文件现在只负责多语言页面入口
   2. 页面结构统一放在 components/about/CulturePageContent.tsx
   3. 页面文案和图片路径统一放在 data/about-culture.ts
========================================================= */

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CulturePageContent from "@/components/about/CulturePageContent";
import {
  aboutCultureLinks,
  isAboutCultureLocale,
  type AboutCultureLocale,
} from "@/data/about-culture";

/* ================================
   企业文化页非中文语言
================================ */
const ABOUT_CULTURE_LOCALES = ["en", "es", "fr", "ko", "ru"] as const;

type LocaleAboutCulturePageProps = {
  params: Promise<{
    locale: string;
  }>;
};

/* ================================
   多语言 SEO 文案
   说明：
   这里先集中放在入口文件里
   后续也可以继续迁移到 data/about-culture.ts
================================ */
const metadataMap: Record<
  (typeof ABOUT_CULTURE_LOCALES)[number],
  {
    title: string;
    description: string;
  }
> = {
  en: {
    title: "Corporate Culture｜FOREACH Technology",
    description:
      "Learn about FOREACH corporate culture, values, team spirit, social responsibility, and long-term commitment to microfluidic technology development.",
  },
  es: {
    title: "Cultura corporativa｜FOREACH Technology",
    description:
      "Conozca la cultura corporativa, los valores, el espíritu de equipo, la responsabilidad social y el compromiso a largo plazo de FOREACH con la tecnología microfluídica.",
  },
  fr: {
    title: "Culture d’entreprise｜FOREACH Technology",
    description:
      "Découvrez la culture d’entreprise, les valeurs, l’esprit d’équipe, la responsabilité sociale et l’engagement à long terme de FOREACH dans la technologie microfluidique.",
  },
  ko: {
    title: "기업 문화｜FOREACH Technology",
    description:
      "FOREACH의 기업 문화, 가치관, 팀워크, 사회적 책임 및 미세유체 기술 발전에 대한 장기적인 노력을 소개합니다.",
  },
  ru: {
    title: "Корпоративная культура｜FOREACH Technology",
    description:
      "Узнайте о корпоративной культуре FOREACH, ценностях, командном духе, социальной ответственности и долгосрочной приверженности развитию микрофлюидных технологий.",
  },
};

/* ================================
   生成静态多语言路径
================================ */
export function generateStaticParams() {
  return ABOUT_CULTURE_LOCALES.map((locale) => ({
    locale,
  }));
}

/* ================================
   生成当前语言页面 SEO 信息
================================ */
export async function generateMetadata({
  params,
}: LocaleAboutCulturePageProps): Promise<Metadata> {
  const { locale } = await params;

  if (!isAboutCultureLocale(locale) || locale === "zh-CN") {
    return {};
  }

  return {
    title: metadataMap[locale].title,
    description: metadataMap[locale].description,
    alternates: {
      canonical: aboutCultureLinks[locale],
      languages: aboutCultureLinks,
    },
  };
}

/* ================================
   多语言企业文化页面
================================ */
export default async function LocaleAboutCulturePage({
  params,
}: LocaleAboutCulturePageProps) {
  const { locale } = await params;

  if (!isAboutCultureLocale(locale) || locale === "zh-CN") {
    notFound();
  }

  return <CulturePageContent locale={locale as AboutCultureLocale} />;
} 