import type { Metadata } from "next";

const locales = ["en", "es", "fr", "ko", "ru"];
export const DEFAULT_SOCIAL_IMAGE = "/images/home/home-hero-final-banner.webp";
export function buildInternationalPageMetadata({ locale, path, title, description, image = DEFAULT_SOCIAL_IMAGE }: { locale: string; path: string; title: string; description?: string; image?: string }): Metadata {
  const cleanTitle = title.replace(/｜/g, " | ").replace(/\s*\|\s*(?:Foreach Technology|Foreach|FOREACH)$/i, "").trim();
  const finalTitle = `${cleanTitle} | FOREACH`;
  const canonical = `/${locale}${path}`;
  return {
    title: { absolute: finalTitle }, description,
    alternates: { canonical, languages: { "zh-CN": path, "x-default": path, ...Object.fromEntries(locales.map(language => [language, `/${language}${path}`])) } },
    openGraph: { type: "website", siteName: "FOREACH", title: finalTitle, description, url: canonical, locale: ({ en: "en_US", es: "es_ES", fr: "fr_FR", ko: "ko_KR", ru: "ru_RU" } as Record<string,string>)[locale], images: [image] },
    twitter: { card: "summary_large_image", title: finalTitle, description, images: [image] },
  };
}
