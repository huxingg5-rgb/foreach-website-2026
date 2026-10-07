import type { Metadata } from "next";
import { fittingIntroductionLocales } from "@/data/products/selection/fitting-introductions.locales";
import { fittingIntrosZh, fittingOverviewHeadingZh, fittingOverviewParagraphsZh } from "@/data/products/selection/fitting-headings.zh";

/** Keep category metadata aligned with the approved, localized page copy. */
export function getFittingSelectionMetadata(locale: string, productTypeId = "fittings"): Metadata | undefined {
  const language = locale === "zh-CN" ? "zh" : locale;
  const copy = language === "zh"
    ? productTypeId === "fittings"
      ? { title: fittingOverviewHeadingZh, paragraphs: fittingOverviewParagraphsZh }
      : fittingIntrosZh[productTypeId]
    : fittingIntroductionLocales[language as keyof typeof fittingIntroductionLocales]?.[productTypeId];
  if (!copy) return undefined;

  const name = copy.title.split(/[：:]/)[0].trim();
  const title = `${name} | ${language === "zh" ? "恒永达" : "FOREACH"}`;
  // Use a complete opening sentence; do not expose Markdown links in metadata.
  const paragraph = copy.paragraphs[0].replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");
  const description = paragraph.match(/^.*?(?:。|[.!?](?=\s|$))/)?.[0] || paragraph;
  const path = `/products/fittings/${productTypeId === "fittings" ? "" : `${productTypeId}/`}`;
  const canonical = language === "zh" ? path : `/${language}${path}`;
  const languages = {
    "zh-CN": path,
    "en-US": `/en${path}`,
    es: `/es${path}`,
    fr: `/fr${path}`,
    ko: `/ko${path}`,
    ru: `/ru${path}`,
    "x-default": path,
  };
  const ogLocale = { zh: "zh_CN", en: "en_US", es: "es_ES", fr: "fr_FR", ko: "ko_KR", ru: "ru_RU" }[language];
  return {
    title: { absolute: title },
    description,
    alternates: { canonical, languages },
    openGraph: { type: "website", title, description, url: canonical, locale: ogLocale, siteName: language === "zh" ? "恒永达" : "FOREACH" },
    twitter: { card: "summary", title, description },
  };
}
