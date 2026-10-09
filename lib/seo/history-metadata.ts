import type { Metadata } from "next";
import { getHistoryPageText, SUPPORTED_HISTORY_LOCALES, type SupportedHistoryLocale } from "@/data/historyMilestones";
import { getCanonicalUrl } from "@/lib/seo/site-url";

const openGraphLocales: Record<SupportedHistoryLocale, string> = {
  "zh-CN": "zh_CN", en: "en_US", es: "es_ES", fr: "fr_FR", ko: "ko_KR", ru: "ru_RU",
};

export function getHistoryMetadata(locale: SupportedHistoryLocale): Metadata {
  const text = getHistoryPageText(locale);
  const languages = Object.fromEntries(SUPPORTED_HISTORY_LOCALES.map(language => [
    language,
    getCanonicalUrl(`${language === "zh-CN" ? "" : `/${language}`}/about/history/`),
  ]));
  const image = { url: "/images/about/about-banner-desktop.webp", alt: text.topBannerAriaLabel };

  return {
    title: text.metadataTitle,
    description: text.metadataDescription,
    alternates: {
      canonical: languages[locale],
      languages: { ...languages, "x-default": languages["zh-CN"] },
    },
    openGraph: {
      type: "website",
      title: text.metadataTitle,
      description: text.metadataDescription,
      url: languages[locale],
      siteName: "FOREACH",
      locale: openGraphLocales[locale],
      alternateLocale: SUPPORTED_HISTORY_LOCALES.filter(language => language !== locale).map(language => openGraphLocales[language]),
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: text.metadataTitle,
      description: text.metadataDescription,
      images: [image],
    },
  };
}
