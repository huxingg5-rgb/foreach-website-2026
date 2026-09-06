import type { Metadata } from "next";
import type { SelectionLocale } from "@/data/products/selection/product-selection.types";
import { getPistonPumpIntroCopy, PISTON_SERIES_SLUGS } from "@/data/products/selection/piston-pump-series-copy";
import { getPumpSeriesProductDetailAdapter } from "./adapters/getPumpSeriesProductDetailAdapter";
import { buildProductSocialMetadata } from "@/lib/seo/product-social-metadata";

const LOCALES: SelectionLocale[] = ["zh", "en", "es", "fr", "ko", "ru"];

export function getPistonPumpMetadata(slug = "", locale: SelectionLocale = "zh"): Metadata | null {
  const series = slug ? PISTON_SERIES_SLUGS[slug] : "category";
  const intro = series ? getPistonPumpIntroCopy(series, locale) : undefined;
  const detail = intro ? null : getPumpSeriesProductDetailAdapter(slug, locale);
  if (!intro && !detail) return null;

  const source = (detail || {}) as Record<string, unknown>;
  const rawTitle = intro?.title || String(source.seoTitle || source.model || "");
  const title = rawTitle.includes("FOREACH") ? rawTitle : `${rawTitle} | FOREACH`;
  const description = intro?.paragraphs[0] || String(source.metaDescription || (Array.isArray(source.advantages) ? source.advantages[0] : "") || "");
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
