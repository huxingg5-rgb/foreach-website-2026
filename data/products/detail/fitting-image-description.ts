import catalog from "./fitting-image-catalog.generated.json";
import photoAliases from "./fitting-photo-url-aliases.generated.json";
import { buildFittingImageAlt, type FittingImageRecord } from "./fitting-image-copy";

const records = catalog as FittingImageRecord[];
const byModel = new Map(records.map(record => [record.model, record]));
const byUrl = new Map(records.flatMap(record => [
  [record.source, record] as const,
  [record.src, record] as const,
]));

/** A registry match is required: never infer sizes or materials from SKU digits. */
export function getFittingMainImageAlt(product: Record<string, unknown>, locale: string): string | undefined {
  const model = String(product.foreachModel || product.model || "").trim().toUpperCase();
  // Some localized adapters format the displayed model with spaces; image URLs
  // remain stable identifiers and also cover selection cards without a model.
  const record = byModel.get(model) || ["mainImage", "imageCard", "image", "imagePath", "imageUrl", "heroImage"]
    .map(key => byUrl.get(String(product[key] || "")))
    .find(Boolean);
  return record ? buildFittingImageAlt(record, locale) : undefined;
}

export function getDescriptiveFittingImageUrl(source: string): string {
  return byUrl.get(source)?.src || (photoAliases as Record<string, string>)[source] || source;
}
