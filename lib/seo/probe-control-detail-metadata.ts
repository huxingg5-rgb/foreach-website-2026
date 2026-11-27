import type { Metadata } from "next";
import probes from "@/data/products/generated/probes/detail/index.json";
import { localizeProbeDetailData } from "@/data/products/detail/probe-detail.target.intl";
import { probeControlDetailCopyEn } from "@/data/products/selection/probe-control-selection.en";
import { getAbdLocaleCopy } from "@/data/products/detail/abd-locales";
import { getControlModuleDetailBySlug } from "@/data/products/control-modules/control-module-detail.generated";
import { getControlModuleProductDetailData } from "@/services/products/adapters/getControlModuleProductDetailData";
import { getControlModuleDetailSlugFromSegments, getControlModuleLanguageAlternates } from "@/data/products/selection/control-module-routes";
import { isHardTubeTargetLocale } from "@/data/products/detail/hard-tube-fitting-detail.intl";
import { germanProbeDetailBody, hindiProbeDetailBody, italianProbeDetailBody } from "@/data/products/detail/probe-guide.intl";
import { languageDraftsEnabled } from "@/lib/i18n/draft-languages";
import { buildProductSocialMetadata } from "./product-social-metadata";
import { getProbeDetailAlternates } from "./probe-detail-alternates";

/** Read the same authored copy as the product body. Keep existing public paths. */
export function getProbeControlDetailMetadata(locale: string, segments: string[]): Metadata | undefined {
  if ((locale === "it" || locale === "hi" || (locale === "de" && languageDraftsEnabled)) && segments.length === 2 && segments[0] === "probes") {
    const source = probes.find(item => item.slug === segments[1]);
    const copy = source && (locale === "de" ? germanProbeDetailBody[source.slug] : locale === "hi" ? hindiProbeDetailBody[source.slug] : italianProbeDetailBody[source.slug]);
    if (!source || !copy) return undefined;
    const canonical = `/${locale}/products/probes/` + source.slug + "/";
    const title = copy.title + " | FOREACH";
    const social = buildProductSocialMetadata({data: {...source, imageAlt: copy.cardTitle},
      title, description: copy.meta, canonicalUrl: canonical});
    return {...social, title:{absolute:title}, description:copy.meta, alternates:{canonical},
      robots:{index:false, follow:true}, openGraph:{...social.openGraph, locale: locale === "de" ? "de_DE" : locale === "hi" ? "hi_IN" : "it_IT"}};
  }
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
