import checkValves from "@/data/products/generated/fittings/check-valves/detail/index.json";
import filters from "@/data/products/generated/fittings/filters/detail/index.json";
import bulkheadBarbedFittings from "@/data/products/generated/fittings/bulkhead-barbed-fittings/detail/index.json";
import femaleThreadAdapters from "@/data/products/generated/fittings/female-thread-adapters/detail/index.json";
import luerFittings from "@/data/products/generated/fittings/luer-fittings/detail/index.json";
import quickConnectFittings from "@/data/products/generated/fittings/quick-connect-fittings/detail/index.json";
import { connectPublishedFittingProduct } from "@/data/products/selection/connectPublishedFittingProduct";
import { applyFittingProductCopy } from "./fitting-product-copy.intl";
import { localizeProductDetailData } from "./product-detail.intl";
import { localizeQuickConnectDetailData } from "./quick-connect-detail.intl";
import { withRemainingFittingProductSpecs } from "./remaining-fitting-detail.zh";
import { getGermanRemainingFittingText } from "./remaining-fitting-copy.de";
import type { GermanProductDetailContent } from "./product-detail-content.de";

const sourceDetails = {
  "quick-connect-fittings": quickConnectFittings,
  "luer-fittings": luerFittings,
  "female-thread-adapters": femaleThreadAdapters,
  "bulkhead-barbed-fittings": bulkheadBarbedFittings,
  filters,
  "check-valves": checkValves,
};

type FittingDetail = { slug: string; model: string } & Record<string, unknown>;
type EnglishFittingCopy = FittingDetail & {
  name?: string;
  title?: string;
  productName?: string;
  description: string;
  faq?: GermanProductDetailContent["faqs"];
  faqs?: GermanProductDetailContent["faqs"];
  bottomCta?: GermanProductDetailContent["bottomCta"];
};

const publishedDetails = new Map(Object.entries(sourceDetails).map(([family, rows]) => [
  family,
  new Map((rows as FittingDetail[]).flatMap(row => {
    const published = connectPublishedFittingProduct(row);
    return published ? [[published.slug, published] as const] : [];
  })),
]));

export function getGermanRemainingFittingContent(family: string, slug: string): GermanProductDetailContent | undefined {
  const row = publishedDetails.get(family)?.get(slug);
  if (!row) return;

  const source = family === "female-thread-adapters" || family === "bulkhead-barbed-fittings"
    ? withRemainingFittingProductSpecs(row)
    : row;
  const localized = family === "quick-connect-fittings"
    ? localizeQuickConnectDetailData(source)
    : localizeProductDetailData(source);
  const english = applyFittingProductCopy(source, localized, "en") as EnglishFittingCopy;
  const title = getGermanRemainingFittingText(english.productName || english.name || english.title || "");
  const text = getGermanRemainingFittingText;
  const cta = english.bottomCta;

  return {
    title,
    description: text(english.description),
    imageAlt: `${row.model} – ${title}`,
    faqs: (english.faqs ?? english.faq ?? []).map(({ question, answer }) => ({
      question: text(question),
      answer: text(answer),
    })),
    bottomCta: cta ? {
      title: text(cta.title),
      description: text(cta.description),
      buttonText: text(cta.buttonText),
      href: "/de/contact/",
    } : undefined,
  };
}
