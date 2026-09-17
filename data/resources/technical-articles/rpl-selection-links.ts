import type { TechnicalArticleLocale } from "./technical-articles.types";

// Lightweight link data shared by the category client and server-rendered pages.
export const rplSelectionArticleSlug = "rpl-valveless-metering-pump-selection-guide";
export const rplSelectionRelationKeys = ["series:rpl"] as const;
export const rplSelectionModelSlugs: readonly string[] = ["rpl-p4", "rpl-p635", "rpl-p15"];

const guideLabels: Record<TechnicalArticleLocale, string> = {
  "zh-CN": "查看 RPL 单头无阀计量泵选型指南",
  en: "Read the RPL single-head valveless metering pump selection guide",
  es: "Consultar la guía de selección de bombas dosificadoras sin válvulas RPL de un cabezal",
  fr: "Consulter le guide de sélection des pompes doseuses sans clapet RPL à une tête",
  ko: "RPL 단일 헤드 무밸브 정량펌프 선정 가이드 보기",
  ru: "Руководство по выбору одноголовочных бесклапанных дозирующих насосов RPL",
};

export function getRplSelectionGuide(locale: string) {
  const articleLocale: TechnicalArticleLocale =
    locale === "en" || locale === "es" || locale === "fr" || locale === "ko" || locale === "ru"
      ? locale : "zh-CN";
  const prefix = articleLocale === "zh-CN" ? "" : `/${articleLocale}`;
  return {
    locale: articleLocale,
    href: `${prefix}/resources/technical-articles/${rplSelectionArticleSlug}/`,
    label: guideLabels[articleLocale],
  };
}
