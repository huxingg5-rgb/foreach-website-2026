import type { Metadata } from "next";
import { getTubingSeriesCopy, tubingSeriesImage } from "./content";
import { SITE_ORIGIN } from "@/lib/seo/site-url";
import { buildProductSocialMetadata } from "@/lib/seo/product-social-metadata";

export function getTubingAlternates(slug = "", locale = "zh") {
  const path = `/products/tubing/${slug ? `${slug}/` : ""}`;
  const localize = (language: string) => `${SITE_ORIGIN}${language === "zh" ? "" : `/${language}`}${path}`;
  return {
    canonical: localize(locale),
    languages: Object.fromEntries([
      ["zh-CN", localize("zh")],
      ...["en", "es", "fr", "ko", "ru"].map((language) => [language, localize(language)]),
      ["x-default", localize("en")],
    ]),
  };
}

const tubingMaterialSeoTemplates = {
  es: {
    openGraphLocale: "es_ES",
    title: (material: string) => `Tubo de ${material} | FOREACH`,
    description: (material: string) =>
      `Consulte las especificaciones y dimensiones de los tubos ${material} de FOREACH. Confirme la compatibilidad con el fluido y las condiciones de uso.`,
  },
  fr: {
    openGraphLocale: "fr_FR",
    title: (material: string) => `Tube en ${material} | FOREACH`,
    description: (material: string) =>
      `Consultez les caractéristiques et dimensions des tubes en ${material} FOREACH. Vérifiez leur compatibilité avec votre fluide et les conditions d’utilisation.`,
  },
  ko: {
    openGraphLocale: "ko_KR",
    title: (material: string) => `${material} 튜브 | FOREACH`,
    description: (material: string) =>
      `FOREACH ${material} 튜브의 재질 특성과 치수를 확인하세요. 사용 유체와 운전 조건에 맞는 튜브를 선택하고 적합성을 검토하세요.`,
  },
  ru: {
    openGraphLocale: "ru_RU",
    title: (material: string) => `Трубка из ${material} | FOREACH`,
    description: (material: string) =>
      `Характеристики и размеры трубок FOREACH из ${material}. Проверьте совместимость с рабочей жидкостью и соответствие условиям эксплуатации.`,
  },
};

export function getTubingMaterialSeoCopy(slug: string, locale: string) {
  const material = ["PVC", "TPU", "FEP", "PTFE", "PEEK", "PFA"].find(
    (code) => slug === `${code.toLowerCase()}-tubing`,
  );
  if (!material || !["es", "fr", "ko", "ru"].includes(locale)) return undefined;

  const template = tubingMaterialSeoTemplates[locale as keyof typeof tubingMaterialSeoTemplates];
  return {
    title: template.title(material),
    description: template.description(material),
    openGraphLocale: template.openGraphLocale,
  };
}

export function getTubingSeriesMetadata(locale = "zh"): Metadata | undefined {
  const copy = getTubingSeriesCopy(locale);
  if (!copy) return undefined;
  const alternates = getTubingAlternates("", locale);
  return {
    title: { absolute: copy.seoTitle },
    description: copy.seoDescription,
    alternates,
    ...buildProductSocialMetadata({
      data: { image: tubingSeriesImage, imageAlt: copy.h1 },
      title: copy.seoTitle,
      description: copy.seoDescription,
      canonicalUrl: alternates.canonical,
    }),
  };
}
