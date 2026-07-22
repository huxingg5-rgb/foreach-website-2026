import ApplicationPageSkeleton from "@/components/common/ApplicationPageSkeleton";
import { Suspense } from "react";
/* =========================================================
   page.tsx
   恒永达官网｜外语 IVD 应用领域页入口

   路径：
   /en/applications/ivd
   /es/applications/ivd
   /fr/applications/ivd
   /ko/applications/ivd
   /ru/applications/ivd

   说明：
   1. 中文不走这里，中文走 app/applications/ivd/page.tsx
   2. 外语动态路由需要 generateStaticParams，方便静态导出
   3. 英文沿用现有页面，西/法/韩/俄使用独立本地化内容
========================================================= */

import type { Metadata } from "next";
import { notFound } from "next/navigation";

import ApplicationEnglishClient from "@/components/applications/ApplicationEnglishClient";
import IvdLocalizedApplicationClient from "@/components/applications/ivd/IvdLocalizedApplicationClient";
import { createEnglishApplicationData } from "@/data/applications/application-english";
import { getIvdApplicationPageData } from "@/services/applications/ivd/getIvdApplicationPageData";

import "../../../applications/ivd/ivd-application.css";

const IVD_LOCALES = ["en", "es", "fr", "ko", "ru"] as const;

type IvdLocaleParam = (typeof IVD_LOCALES)[number];

type IvdLocalePageProps = {
  params: Promise<{
    locale: string;
  }>;
};

const IVD_METADATA: Record<
  IvdLocaleParam,
  {
    title: string;
    description: string;
    openGraphLocale: string;
    imageAlt: string;
  }
> = {
  en: {
    title: "IVD Fluidic System Solutions | FOREACH",
    description:
      "FOREACH provides pumps, valves, fittings, tubing and sensors for sample, reagent, washing, waste and monitoring fluidics in IVD instruments.",
    openGraphLocale: "en_US",
    imageAlt: "Fluidic system support for IVD instruments",
  },
  es: {
    title: "Soluciones de circuitos fluídicos para IVD | FOREACH",
    description:
      "Bombas, válvulas, conexiones, tubos y sensores para la aspiración de muestras, dispensación de reactivos, lavado, residuos y monitorización en instrumentos IVD.",
    openGraphLocale: "es_ES",
    imageAlt: "Soluciones de circuitos fluídicos para instrumentos IVD",
  },
  fr: {
    title: "Solutions de circuits fluidiques pour l’IVD | FOREACH",
    description:
      "Pompes, vannes, raccords, tubes et capteurs pour l’aspiration des échantillons, la distribution des réactifs, le lavage, les déchets et la surveillance des instruments IVD.",
    openGraphLocale: "fr_FR",
    imageAlt: "Solutions de circuits fluidiques pour instruments IVD",
  },
  ko: {
    title: "IVD 장비용 정밀 유로 솔루션 | FOREACH",
    description:
      "IVD 장비의 샘플 흡입, 시약 분주, 세척, 폐액 처리 및 유로 모니터링을 위한 펌프, 밸브, 피팅, 튜빙과 센서를 제공합니다.",
    openGraphLocale: "ko_KR",
    imageAlt: "IVD 장비용 정밀 유로 솔루션",
  },
  ru: {
    title: "Решения для жидкостных трактов IVD | FOREACH",
    description:
      "Насосы, клапаны, фитинги, трубки и датчики для аспирации образцов, дозирования реагентов, промывки, удаления отходов и контроля жидкостных трактов приборов IVD.",
    openGraphLocale: "ru_RU",
    imageAlt: "Решения для жидкостных трактов приборов IVD",
  },
};

const IVD_LANGUAGE_LINKS = {
  "zh-CN": "https://www.foreachtek.com/applications/ivd/",
  en: "https://www.foreachtek.com/en/applications/ivd/",
  es: "https://www.foreachtek.com/es/applications/ivd/",
  fr: "https://www.foreachtek.com/fr/applications/ivd/",
  ko: "https://www.foreachtek.com/ko/applications/ivd/",
  ru: "https://www.foreachtek.com/ru/applications/ivd/",
};

export async function generateMetadata({
  params,
}: IvdLocalePageProps): Promise<Metadata> {
  const { locale } = await params;

  if (!isIvdLocale(locale)) {
    return {};
  }

  const pageMetadata = IVD_METADATA[locale];
  const canonical = IVD_LANGUAGE_LINKS[locale];
  const imageUrl =
    "https://www.foreachtek.com/images/applications/ivd/ivd-hero-bg-1920x800-v001.webp";

  return {
    title: pageMetadata.title,
    description: pageMetadata.description,
    alternates: {
      canonical,
      languages: IVD_LANGUAGE_LINKS,
    },
    openGraph: {
      title: pageMetadata.title,
      description: pageMetadata.description,
      url: canonical,
      locale: pageMetadata.openGraphLocale,
      type: "website",
      images: [
        {
          url: imageUrl,
          width: 1920,
          height: 800,
          alt: pageMetadata.imageAlt,
        },
      ],
    },
  };
}

export function generateStaticParams() {
  return IVD_LOCALES.map((locale) => ({
    locale,
  }));
}

function isIvdLocale(locale: string): locale is IvdLocaleParam {
  return IVD_LOCALES.includes(locale as IvdLocaleParam);
}

export default async function IvdLocaleApplicationPage({ params }: IvdLocalePageProps) {
  const { locale } = await params;

  if (!isIvdLocale(locale)) {
    notFound();
  }

  const pageData = getIvdApplicationPageData(locale);

  return (
    <Suspense fallback={<ApplicationPageSkeleton />}>
      {locale === "en" ? (
        <ApplicationEnglishClient
          data={createEnglishApplicationData("ivd", pageData)}
        />
      ) : (
        <IvdLocalizedApplicationClient data={pageData} />
      )}
    </Suspense>
  );
}
