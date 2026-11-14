import type { Metadata } from "next";
import barbed from "@/data/products/generated/fittings/barbed-fittings/detail/index.json";
import bulkhead from "@/data/products/generated/fittings/bulkhead-barbed-fittings/detail/index.json";
import checkValves from "@/data/products/generated/fittings/check-valves/detail/index.json";
import femaleAdapters from "@/data/products/generated/fittings/female-thread-adapters/detail/index.json";
import filters from "@/data/products/generated/fittings/filters/detail/index.json";
import hardTube from "@/data/products/generated/fittings/hard-tube-fittings/detail/index.json";
import luer from "@/data/products/generated/fittings/luer-fittings/detail/index.json";
import quickConnect from "@/data/products/generated/fittings/quick-connect-fittings/detail/index.json";
import threadBarbed from "@/data/products/generated/fittings/thread-to-barbed-fittings/detail/index.json";
import { connectPublishedFittingProduct } from "@/data/products/selection/connectPublishedFittingProduct";
import { applyFittingProductCopy } from "@/data/products/detail/fitting-product-copy.intl";
import { getHardTubeSeo } from "@/data/products/detail/hard-tube-seo";
import { buildProductSocialMetadata } from "./product-social-metadata";

type DetailRecord = Record<string, unknown> & { slug: string; productTypeId?: string; seo?: { title?: string } };
const catalogs: ReadonlyArray<readonly [string, readonly DetailRecord[]]> = [
  ["barbed-fittings", barbed], ["bulkhead-barbed-fittings", bulkhead],
  ["check-valves", checkValves], ["female-thread-adapters", femaleAdapters],
  ["filters", filters], ["hard-tube-fittings", hardTube], ["luer-fittings", luer],
  ["quick-connect-fittings", quickConnect], ["thread-to-barbed-fittings", threadBarbed],
];
const sources = new Map<string, DetailRecord>(catalogs.flatMap(([type, values]) => values.map(detail => [
  `${type}/${detail.slug}`, { ...detail, productTypeId: type },
] as const)));

/** Uses the same Chinese detail record and prose adapter as the visible page.
 * The publication adapter supplies current model IDs and the actual hero image. */
export function getFittingDetailMetadata(locale: string, type: string, slug: string): Metadata | undefined {
  if (!["en", "es", "fr", "ko", "ru"].includes(locale)) return undefined;
  const raw = sources.get(`${type}/${slug.toLowerCase()}`);
  const source = raw && connectPublishedFittingProduct(raw);
  if (!source) return undefined;
  const canonical = `/${locale}/products/fittings/${type}/${source.slug}/`;
  const detail = applyFittingProductCopy(source, source, locale);
  const hardTubeSeo = type === "hard-tube-fittings" ? getHardTubeSeo(source, locale) : undefined;
  const title = String(hardTubeSeo?.title || detail.seo?.title || detail.title);
  const description = String(hardTubeSeo?.description || detail.description || "");
  const social = buildProductSocialMetadata({ data: source, title, description, canonicalUrl: canonical });
  return {
    ...social,
    title: { absolute: title }, description,
    robots: { index: true, follow: true },
    openGraph: {
      ...social.openGraph,
      locale: { en: "en_US", es: "es_ES", fr: "fr_FR", ko: "ko_KR", ru: "ru_RU" }[locale],
      siteName: "FOREACH",
    },
  };
}
