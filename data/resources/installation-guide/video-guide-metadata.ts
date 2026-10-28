import type { Metadata } from "next";
import type { VideoGuideDetail } from "./video-guide-detail.types";
import { getVideoGuideDetailLocales } from "./video-guide-route-availability";
import { getCanonicalUrl } from "@/lib/seo/site-url";

export function getVideoGuideMetadata(video: VideoGuideDetail): Metadata {
  const url = getCanonicalUrl(video.detailHref);
  const locales = getVideoGuideDetailLocales(video.id);
  const languages = locales ? Object.fromEntries([
    ...locales.map(locale => [locale, getCanonicalUrl(`${locale === "zh-CN" ? "" : `/${locale}`}/resources/installation-guide/${video.id}/`)]),
    ["x-default", getCanonicalUrl(`/en/resources/installation-guide/${video.id}/`)],
  ]) : undefined;
  const ogLocale = { "zh-CN": "zh_CN", en: "en_US", es: "es_ES", fr: "fr_FR", ko: "ko_KR", ru: "ru_RU" }[video.locale];
  return {
    title: video.seoTitle, description: video.description,
    alternates: { canonical: url, ...(languages ? { languages } : {}) },
    openGraph: { title: video.title, description: video.description, url,
      type: "website", locale: ogLocale, images: [{ url: video.thumbnail, alt: video.title }] },
    twitter: { card: "summary_large_image", title: video.title,
      description: video.description, images: [video.thumbnail] },
  };
}
