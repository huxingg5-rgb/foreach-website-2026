import details from "@/data/products/generated/fittings/hard-tube-fittings/detail/index.json";
import type { ProductSelectionProduct } from "./product-selection.types";
import { connectPublishedFittingProduct } from "./connectPublishedFittingProduct";

/** Only the four flange-compatible families; ferrule and high-pressure products are excluded. */
export function getFlangedFittingRelationKeys(model: string): string[] {
  const family = model.split("-")[0].toLowerCase();
  return ["hf", "hf6", "hfl", "hfl6"].includes(family) ? [`series:${family}`] : [];
}

export const flangedFittingRelatedProducts: ProductSelectionProduct[] = details.flatMap(detail => {
  const product = connectPublishedFittingProduct(detail);
  if (!product) return [];
  const relationKeys = getFlangedFittingRelationKeys(product.model);
  if (!relationKeys.length) return [];
  const title = Object.fromEntries(["zh", "en", "es", "fr", "ko", "ru"].map(locale => [locale, product.model]));
  return [{
    productId: product.productId, relationKeys, cardTitle: title, imageAlt: title,
    imageCard: product.model === "HFL6-M6-16-PS-B"
      ? "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hfl6-m6-16-ps-b-main.jpg"
      : product.mainImage,
    detailHref: `/products/fittings/hard-tube-fittings/${product.slug}/`,
  }];
});
