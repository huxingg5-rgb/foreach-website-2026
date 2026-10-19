import type { Metadata } from "next";
import type { SelectionLocale } from "@/data/products/selection/product-selection.types";
import { getPistonPumpIntroCopy, PISTON_SERIES_SLUGS } from "@/data/products/selection/piston-pump-series-copy";
import { getPumpSeriesProductDetailAdapter } from "./adapters/getPumpSeriesProductDetailAdapter";
import { buildProductSocialMetadata } from "@/lib/seo/product-social-metadata";
import { EA_PUMP_MODELS } from "@/data/products/detail/applications/ea-pump-content";
import { COMPACT_PUMP_MODELS } from "@/data/products/detail/applications/compact-pump-content";

const LOCALES: SelectionLocale[] = ["zh", "en", "es", "fr", "ko", "ru"];

const ENGLISH_SERIES_DESCRIPTIONS: Record<string, string> = {
  category: "Compare FOREACH EA, SM and TM piston pumps for reagent dosing, sampling and liquid dispensing. Select capacity, wetted materials and fluid connections.",
  ea: "FOREACH EA precision piston pumps offer 50 μL–20 mL capacities for automated dosing and dispensing. Compare materials, ports and integration options.",
  sm: "FOREACH SM miniature piston pumps offer 50 μL–1 mL configurations for reagent dosing and sampling. Compare pump-head materials and fluid connections.",
  tm: "FOREACH TM ultra-compact piston pumps offer 50–500 μL configurations for instrument liquid dosing, with PMMA heads and 6-40 UNF fluid connections.",
};

function getEnglishPistonDescription(slug: string, series: string | undefined) {
  if (series) return ENGLISH_SERIES_DESCRIPTIONS[series];
  if (!EA_PUMP_MODELS.includes(slug) && !COMPACT_PUMP_MODELS.includes(slug)) return undefined;
  const [family, capacity, material] = slug.split("-");
  const microliters = Number(capacity);
  const volume = microliters >= 1000 ? `${microliters / 1000} mL` : `${microliters} μL`;
  const type = family === "sm" ? "miniature piston pump" : family === "tm" ? "ultra-compact piston pump" : "piston pump";
  return `${slug.toUpperCase()} ${type} with ${volume} capacity and a ${material.toUpperCase()} head for instrument liquid dosing. Review wetted materials and integration requirements.`;
}

export function getPistonPumpMetadata(slug = "", locale: SelectionLocale = "zh"): Metadata | null {
  const series = slug ? PISTON_SERIES_SLUGS[slug] : "category";
  const intro = series ? getPistonPumpIntroCopy(series, locale) : undefined;
  const detail = intro ? null : getPumpSeriesProductDetailAdapter(slug, locale);
  if (!intro && !detail) return null;

  const source = (detail || {}) as Record<string, unknown>;
  const rawTitle = intro?.title || String(source.seoTitle || source.model || "");
  const title = rawTitle.includes("Foreach Technology") ? rawTitle : `${rawTitle} | Foreach Technology`;
  const description = (locale === "en" ? getEnglishPistonDescription(slug, series) : undefined)
    || intro?.paragraphs[0] || String(source.metaDescription || (Array.isArray(source.advantages) ? source.advantages[0] : "") || "");
  const path = `/products/pumps/piston-pump/${slug ? `${slug}/` : ""}`;
  const canonical = locale === "zh" ? path : `/${locale}${path}`;
  const languages = Object.fromEntries(LOCALES.map((language) => [
    language === "zh" ? "zh-CN" : language === "en" ? "en-US" : language,
    language === "zh" ? path : `/${language}${path}`,
  ]));
  languages["x-default"] = path;

  return {
    title: { absolute: title },
    description,
    alternates: { canonical, languages },
    ...buildProductSocialMetadata({
      data: intro ? {
        mainImage: "/images/products/pumps/product-types/plunger-pumps/foreach-plunger-pumps-product-type-intro.webp",
        imageAlt: intro.imageAlt,
      } : source,
      title, description, canonicalUrl: canonical,
    }),
  };
}
