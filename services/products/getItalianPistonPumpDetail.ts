import type { Metadata } from "next";
import type { ProductDetailPageData } from "@/data/products/detail/product-detail.types";
import copy from "@/data/products/detail/piston-pump.it.json";
import { getCanonicalUrl } from "@/lib/seo/site-url";
import { buildProductSocialMetadata } from "@/lib/seo/product-social-metadata";
import { getPumpSeriesProductDetailAdapter } from "./adapters/getPumpSeriesProductDetailAdapter";

type PistonPageData = ProductDetailPageData & Partial<Record<"description" | "customNotice" | "mainImageAlt" | "imageAlt" | "seoTitle" | "metaDescription" | "displayModel", string>>;

export const italianPistonPumpSlugs: readonly string[] = ["ea-100-pmma", "ea-100-peek", "ea-1000-pmma", "ea-1000-peek", "ea-10000-pmma", "ea-10000-peek", "ea-250-pmma", "ea-250-peek", "ea-2500-pmma", "ea-2500-peek", "ea-500-pmma", "ea-500-peek", "ea-5000-pmma", "ea-5000-peek", "sm-50-pmma", "sm-100-pmma", "sm-100-peek", "sm-250-pmma", "sm-250-peek", "sm-500-pmma", "sm-1000-pmma", "tm-50-pmma", "tm-100-pmma", "tm-250-pmma", "tm-500-pmma"];
const content: Readonly<Record<string, string>> = copy.content;

const translate = (text: string) => content[text] ?? text;

function translateCopy<T>(value: T): T {
  if (typeof value === "string") return translate(value) as T;
  if (Array.isArray(value)) return value.map(translateCopy) as T;
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, translateCopy(item)])) as T;
  }
  return value;
}

export function getItalianPistonPumpDetail(slug: string) {
  if (!italianPistonPumpSlugs.includes(slug)) return null;
  const source = getPumpSeriesProductDetailAdapter(slug, "en") as PistonPageData | null;
  if (!source) return null;
  const advantages = source.advantages?.map(translate);
  return {
    ...source,
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

export function getItalianPistonPumpMetadata(slug: string): Metadata | undefined {
  const data = getItalianPistonPumpDetail(slug);
  if (!data) return;
  const title = data.seoTitle || String(data.displayModel);
  const description = data.metaDescription || data.description;
  const url = getCanonicalUrl("/it/products/pumps/piston-pump/" + slug + "/");
  const social = buildProductSocialMetadata({ data, title, description, canonicalUrl: url });
  return {
    ...social,
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    robots: { index: false, follow: true },
    openGraph: { ...social.openGraph, locale: "it_IT" },
  };
}
