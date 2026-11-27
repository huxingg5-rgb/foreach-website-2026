import type { Metadata } from "next";
import type { ProductDetailPageData } from "@/data/products/detail/product-detail.types";
import copy from "@/data/products/detail/piston-pump.de.json";
import { germanPistonPumpDraftPaths } from "@/lib/i18n/draft-languages";
import { getCanonicalUrl } from "@/lib/seo/site-url";
import { buildProductSocialMetadata } from "@/lib/seo/product-social-metadata";
import { getPumpSeriesProductDetailAdapter } from "./adapters/getPumpSeriesProductDetailAdapter";

type PistonPageData = ProductDetailPageData & Partial<Record<"description" | "customNotice" | "mainImageAlt" | "imageAlt" | "seoTitle" | "metaDescription" | "displayModel", string>>;

const strings: Readonly<Record<string, string>> = copy;

function translate(value: string): string {
  return Object.hasOwn(strings, value) ? strings[value] : value;
}

function translateCopy<T>(value: T): T {
  if (typeof value === "string") return translate(value) as T;
  if (Array.isArray(value)) return value.map(translateCopy) as T;
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, translateCopy(item)])) as T;
  }
  return value;
}

export function getGermanPistonPumpDetail(slug: string) {
  const path = "/products/pumps/piston-pump/" + slug + "/";
  if (!germanPistonPumpDraftPaths.includes(path)) return null;
  const source = getPumpSeriesProductDetailAdapter(slug, "en") as PistonPageData | null;
  if (!source) return null;
  const advantages = source.advantages?.map(translate);
  return {
    ...source,
    // The English adapter uses model for the display heading and keeps the model code separately.
    model: translateCopy(source.model),
    name: translateCopy(source.name),
    advantages,
    description: advantages?.join("\n\n") || source.description || "",
    commonApplications: source.commonApplications?.map(translate),
    applicationAreas: translateCopy(source.applicationAreas),
    applicationDetails: translateCopy(source.applicationDetails),
    customNotice: translateCopy(source.customNotice),
    mainImageAlt: translateCopy(source.mainImageAlt),
    imageAlt: translateCopy(source.imageAlt),
    additionalImageAlts: source.additionalImageAlts?.map(translate),
    seoTitle: translateCopy(source.seoTitle),
    metaDescription: translateCopy(source.metaDescription),
  };
}

export function getGermanPistonPumpMetadata(slug: string): Metadata | undefined {
  const data = getGermanPistonPumpDetail(slug);
  if (!data) return;
  const title = data.seoTitle || String(data.displayModel);
  const description = data.metaDescription || data.description;
  const url = getCanonicalUrl("/de/products/pumps/piston-pump/" + slug + "/");
  const social = buildProductSocialMetadata({ data, title, description, canonicalUrl: url });
  return {
    ...social,
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    robots: { index: false, follow: true },
    openGraph: { ...social.openGraph, locale: "de_DE" },
  };
}
