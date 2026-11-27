import type { Metadata } from "next";
import { getHistoryPageText, SUPPORTED_HISTORY_LOCALES, type HistoryPageLocale, type SupportedHistoryLocale } from "@/data/historyMilestones";
import { getCanonicalUrl } from "@/lib/seo/site-url";

const openGraphLocales: Record<SupportedHistoryLocale, string> = {
  "zh-CN": "zh_CN", en: "en_US", es: "es_ES", fr: "fr_FR", ko: "ko_KR", ru: "ru_RU",
};

export function getHistoryMetadata(locale: HistoryPageLocale): Metadata {
  const text = getHistoryPageText(locale);
  const languages = Object.fromEntries(SUPPORTED_HISTORY_LOCALES.map(language => [
    language,
    getCanonicalUrl(`${language === "zh-CN" ? "" : `/${language}`}/about/history/`),
  ]));
  const image = { url: "/images/about/about-banner-desktop.webp", alt: text.topBannerAriaLabel };
  const draft = locale === "de" || locale === "it" || locale === "hi";
  const canonical = draft ? getCanonicalUrl("/" + locale + "/about/history/") : languages[locale];

  return {
    title: text.metadataTitle,
    description: text.metadataDescription,
    ...(draft ? { robots: { index: false, follow: true } } : {}),
    alternates: draft ? { canonical } : {
      canonical,
      languages: { ...languages, "x-default": languages["zh-CN"] },
    },
    openGraph: {
      type: "website",
      title: text.metadataTitle,
      description: text.metadataDescription,
      url: canonical,
      siteName: "FOREACH",
      locale: locale === "de" ? "de_DE" : locale === "it" ? "it_IT" : locale === "hi" ? "hi_IN" : openGraphLocales[locale],
      alternateLocale: draft ? undefined : SUPPORTED_HISTORY_LOCALES.filter(language => language !== locale).map(language => openGraphLocales[language]),
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
