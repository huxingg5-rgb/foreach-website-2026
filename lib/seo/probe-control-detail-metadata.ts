import type { Metadata } from "next";
import probes from "@/data/products/generated/probes/detail/index.json";
import { localizeProbeDetailData } from "@/data/products/detail/probe-detail.target.intl";
import { probeControlDetailCopyEn } from "@/data/products/selection/probe-control-selection.en";
import { getAbdLocaleCopy } from "@/data/products/detail/abd-locales";
import { getControlModuleDetailBySlug } from "@/data/products/control-modules/control-module-detail.generated";
import { getControlModuleProductDetailData } from "@/services/products/adapters/getControlModuleProductDetailData";
import { getControlModuleDetailSlugFromSegments, getControlModuleLanguageAlternates } from "@/data/products/selection/control-module-routes";
import { isHardTubeTargetLocale } from "@/data/products/detail/hard-tube-fitting-detail.intl";
import { buildProductSocialMetadata } from "./product-social-metadata";
import { getProbeDetailAlternates } from "./probe-detail-alternates";

/** Read the same authored copy as the product body. Keep existing public paths. */
export function getProbeControlDetailMetadata(locale: string, segments: string[]): Metadata | undefined {
  if (!["en", "es", "fr", "ko", "ru"].includes(locale)) return undefined;
  const canonical = `/${locale}/products/${segments.join("/")}/`;
  const slug = getControlModuleDetailSlugFromSegments(segments);
  if (slug === "abd-air-bubble-detector") {
    const copy = getAbdLocaleCopy(locale)!;
    const source = getControlModuleProductDetailData(getControlModuleDetailBySlug(slug)!);
    return metadata(source, `${copy.name} | FOREACH`, copy.description, canonical, locale,
      { canonical, languages: getControlModuleLanguageAlternates(slug) });
  }
  if (segments.length !== 2 || segments[0] !== "probes") return undefined;
  const source = probes.find(item => item.slug === segments[1]);
  if (!source) return undefined;
  const foreign = isHardTubeTargetLocale(locale) ? localizeProbeDetailData(source, source, locale) : undefined;
  const english = probeControlDetailCopyEn[source.slug];
  const title = foreign?.seoTitle || english?.seoTitle;
  const description = foreign?.seoDescription || english?.description;
  if (!title || !description) return undefined;
  return metadata(source, title, description, canonical, locale, getProbeDetailAlternates(canonical));
}

function metadata(data: Record<string, unknown>, title: string, description: string, canonicalUrl: string,
  locale: string, alternates: Metadata["alternates"]): Metadata {
  const social = buildProductSocialMetadata({ data, title, description, canonicalUrl });
  return {
    ...social, title: { absolute: title }, description, alternates,
    robots: { index: true, follow: true },
    openGraph: { ...social.openGraph, locale: { en: "en_US", es: "es_ES", fr: "fr_FR", ko: "ko_KR", ru: "ru_RU" }[locale] },
  };
}
