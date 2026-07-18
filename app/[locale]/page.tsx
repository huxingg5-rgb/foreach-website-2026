import "@/app/contact/contact.css";
/* ================================
   app/[locale]/page.tsx
   澶氳瑷€棣栭〉鍏ュ彛

   瀵瑰簲璺緞锛?
   /en
   /es
   /fr
   /ko
   /ru

   璇存槑锛?
   1. 涓枃棣栭〉涓嶈蛋杩欓噷锛屼腑鏂囬椤佃蛋 app/page.tsx
   2. 杩欎釜鏂囦欢璐熻矗澶栬棣栭〉
   3. 鍥犱负 next.config.ts 浣跨敤 output: "export"
   4. 鎵€浠ヨ繖閲屽繀椤绘彁渚?generateStaticParams
================================ */

import type { Metadata } from "next";
import { notFound } from "next/navigation";

import HomePageContent from "@/components/home/HomePageContent";
import {
  getEnabledLanguages,
  type LocaleCode,
} from "@/data/languages";

/* ================================
   绂佹鏈煡璇█璺緞

   璇存槑锛?
   1. 鍙厑璁?generateStaticParams 閲屽０鏄庣殑璇█璁块棶
   2. /en銆?es銆?fr銆?ko銆?ru 鍙互璁块棶
   3. /abc 杩欑鏃犳晥璺緞杩涘叆 404
================================ */

export const dynamicParams = false;

/* ================================
   鏍规嵁 URL 閲岀殑 locale 鍙傛暟鍖归厤鐪熷疄璇█

   涓句緥锛?
   1. routeSegment = "en" -> 杩斿洖 "en"
   2. routeSegment = "es" -> 杩斿洖 "es"
   3. routeSegment = "zh" -> 杩斿洖 null锛屽洜涓轰腑鏂囬粯璁よ矾寰勬槸 /
================================ */

function getLocaleFromRouteSegment(routeSegment: string): LocaleCode | null {
  const matchedLanguage = getEnabledLanguages().find((language) => {
    if (language.isDefault) {
      return false;
    }

    const segment = language.href.replace(/^\/+/, "");

    return segment === routeSegment;
  });

  return matchedLanguage?.code ?? null;
}

/* ================================
   鐢熸垚闈欐€佸璇█棣栭〉璺緞

   璇存槑锛?
   1. 杩欓噷鍏堝啓姝?5 涓璇矾寰?
   2. 涓嶅厛渚濊禆 getEnabledLanguages()
   3. 杩欐牱瀵?output: "export" 鏇寸ǔ瀹?
================================ */

export function generateStaticParams() {
  return [
    { locale: "en" },
    { locale: "es" },
    { locale: "fr" },
    { locale: "ko" },
    { locale: "ru" },
  ];
}

/* ================================
   椤甸潰鍙傛暟绫诲瀷

   璇存槑锛?
   褰撳墠椤圭洰浣跨敤 Next.js 鏂扮増鏈紝params 鎸?Promise 鍐欐硶澶勭悊銆?
================================ */

type LocalePageProps = {
  params: Promise<{
    locale: string;
  }>;
};

const homeMetadata: Record<
  Exclude<LocaleCode, "zh-CN">,
  { title: string; description: string; openGraphLocale: string }
> = {
  en: {
    title: "FOREACH | Microfluidic Components and Fluidic Solutions",
    description:
      "FOREACH develops pumps, valves, probes, fittings, tubing, sensors, and control modules for IVD, life sciences, analytical instruments, synthetic biology, and laboratory automation.",
    openGraphLocale: "en_US",
  },
  es: {
    title: "FOREACH | Componentes microfluídicos y soluciones fluídicas",
    description:
      "FOREACH desarrolla bombas, válvulas, sondas, conexiones, tubos, sensores y módulos de control para IVD, ciencias de la vida, instrumentación analítica, biología sintética y automatización de laboratorio.",
    openGraphLocale: "es_ES",
  },
  fr: {
    title: "FOREACH | Composants microfluidiques et solutions fluidiques",
    description:
      "FOREACH développe des pompes, vannes, sondes, raccords, tubes, capteurs et modules de contrôle pour l’IVD, les sciences de la vie, l’instrumentation analytique, la biologie synthétique et l’automatisation de laboratoire.",
    openGraphLocale: "fr_FR",
  },
  ko: {
    title: "FOREACH | 미세유체 부품 및 유체 시스템 솔루션",
    description:
      "FOREACH는 IVD, 생명과학, 분석 장비, 합성생물학 및 실험실 자동화를 위한 펌프, 밸브, 프로브, 피팅, 튜빙, 센서와 제어 모듈을 개발합니다.",
    openGraphLocale: "ko_KR",
  },
  ru: {
    title: "FOREACH | Компоненты и решения для микрофлюидных систем",
    description:
      "FOREACH разрабатывает насосы, клапаны, пробоотборные иглы, фитинги, трубки, датчики и модули управления для IVD, наук о жизни, аналитических приборов, синтетической биологии и лабораторной автоматизации.",
    openGraphLocale: "ru_RU",
  },
};

const homeLanguageLinks = {
  "zh-CN": "https://www.foreachtek.com/",
  en: "https://www.foreachtek.com/en/",
  es: "https://www.foreachtek.com/es/",
  fr: "https://www.foreachtek.com/fr/",
  ko: "https://www.foreachtek.com/ko/",
  ru: "https://www.foreachtek.com/ru/",
};

export async function generateMetadata({
  params,
}: LocalePageProps): Promise<Metadata> {
  const { locale } = await params;

  const currentLocale = getLocaleFromRouteSegment(locale);

  if (!currentLocale || currentLocale === "zh-CN") {
    return {};
  }

  const currentMetadata = homeMetadata[currentLocale];
  const canonical = homeLanguageLinks[currentLocale];

  return {
    title: currentMetadata.title,
    description: currentMetadata.description,
    alternates: {
      canonical,
      languages: homeLanguageLinks,
    },
    openGraph: {
      title: currentMetadata.title,
      description: currentMetadata.description,
      url: canonical,
      locale: currentMetadata.openGraphLocale,
      type: "website",
    },
  };
}

/* ================================
   澶氳瑷€棣栭〉椤甸潰缁勪欢
================================ */

export default async function LocalePage({ params }: LocalePageProps) {
  const { locale } = await params;

  const currentLocale = getLocaleFromRouteSegment(locale);

  if (!currentLocale) {
    notFound();
  }

  return <HomePageContent locale={currentLocale} />;
}
