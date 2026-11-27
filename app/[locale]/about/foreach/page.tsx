import { withPublishedTranslationMetadata } from "@/lib/seo/published-translation-metadata";
import { buildInternationalPageMetadata } from "@/lib/seo/international-page-metadata";
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
   3. 页面把当前路由语言传给 AboutForeachClient
========================================================= */

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import AboutForeachClient from "@/app/about/foreach/AboutForeachClient";
import CompanyPageStructuredData from "@/components/common/CompanyPageStructuredData";
import { languageDraftsEnabled } from "@/lib/i18n/draft-languages";

/* 官网当前支持的非中文语言 */
const ABOUT_FOREACH_LOCALES = ["en", "es", "fr", "ko", "ru"] as const;

type AboutForeachLocale = (typeof ABOUT_FOREACH_LOCALES)[number] | "de" | "it" | "hi";

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
    title: "About Foreach｜Foreach Technology",
    description:
      "Foreach focuses on microfluidic core components and fluidic system solutions for IVD, life sciences, high-end analytical instruments, synthetic biology, and laboratory automation.",
  },
  hi: {
    title: "FOREACH के बारे में | FOREACH",
    description: "IVD, जीवन विज्ञान, उच्च-स्तरीय विश्लेषण उपकरण, सिंथेटिक बायोलॉजी और प्रयोगशाला ऑटोमेशन के लिए मुख्य माइक्रोफ्लुइडिक घटक और फ्लुइडिक सिस्टम समाधान।",
  },
  it: {
    title: "Chi è Foreach | FOREACH",
    description: "Foreach sviluppa componenti per la microfluidica e soluzioni per la diagnostica in vitro, le scienze della vita, la strumentazione analitica, la biologia sintetica e l’automazione di laboratorio.",
  },
  de: {
    title: "Unternehmensprofil | FOREACH",
    description:
      "FOREACH entwickelt mikrofluidische Kernkomponenten und Lösungen für Flüssigkeitskreisläufe in der In-vitro-Diagnostik, den Biowissenschaften, der Geräteanalytik, der synthetischen Biologie und der Laborautomation.",
  },
  es: {
    title: "Sobre Foreach｜Foreach Technology",
    description:
      "Foreach se centra en componentes centrales de microfluídica y soluciones de sistemas fluídicos para IVD, ciencias de la vida, instrumentos analíticos de alta gama, biología sintética y automatización de laboratorio.",
  },
  fr: {
    title: "À propos de Foreach｜Foreach Technology",
    description:
      "Foreach se concentre sur les composants clés de microfluidique et les solutions de systèmes fluidiques pour l’IVD, les sciences de la vie, les instruments analytiques haut de gamme, la biologie synthétique et l’automatisation de laboratoire.",
  },
  ko: {
    title: "Foreach 소개｜Foreach Technology",
    description:
      "Foreach는 IVD, 생명과학, 고급 분석기기, 합성생물학 및 실험실 자동화를 위한 미세유체 핵심 부품과 유체 시스템 솔루션에 집중합니다.",
  },
  ru: {
    title: "О Foreach｜Foreach Technology",
    description:
      "Foreach специализируется на ключевых компонентах микрофлюидики и решениях жидкостных систем для IVD, наук о жизни, высококлассных аналитических приборов, синтетической биологии и лабораторной автоматизации.",
  },
};

/* 生成静态多语言路径 */
export function generateStaticParams() {
  const locales: readonly AboutForeachLocale[] = languageDraftsEnabled
    ? [...ABOUT_FOREACH_LOCALES, "de", "it", "hi"]
    : ABOUT_FOREACH_LOCALES;
  return locales.map((locale) => ({ locale }));
}

/* 生成当前语言页面的 SEO 信息 */
async function getPageMetadata({
  params,
}: LocaleAboutForeachPageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isAboutForeachLocale(locale)) {
    return {};
  }

  const metadata = buildInternationalPageMetadata({ locale, path: "/about/foreach/", ...metadataMap[locale] });
  if (locale !== "de" && locale !== "it" && locale !== "hi") return metadata;

  return {
    ...metadata,
    alternates: { canonical: `/${locale}/about/foreach/` },
    openGraph: { ...metadata.openGraph, locale: locale === "de" ? "de_DE" : locale === "hi" ? "hi_IN" : "it_IT" },
    robots: { index: false, follow: true },
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

  return (
    <>
      <CompanyPageStructuredData
        type="AboutPage"
        path={`/${locale}/about/foreach/`}
        name={metadataMap[locale].title}
        description={metadataMap[locale].description}
        locale={locale}
      />
      <AboutForeachClient initialLocale={locale} />
    </>
  );
}

/* 判断当前 URL 语言是否允许访问 */
function isAboutForeachLocale(locale: string): locale is AboutForeachLocale {
  return locale === "de" || locale === "it" || locale === "hi"
    ? languageDraftsEnabled
    : ABOUT_FOREACH_LOCALES.some((supported) => supported === locale);
}

export const generateMetadata = withPublishedTranslationMetadata("/about/foreach/", getPageMetadata);
