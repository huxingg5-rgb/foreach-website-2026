import type { ProductSpecItem } from "@/data/products/detail/product-detail.types";

/** Preserve the localized labels, values and units shown in the specification table. */
export function buildProductSpecProperties(specs: readonly ProductSpecItem[]) {
  return specs.flatMap(({ label, value }) => {
    const name = label.trim();
    const text = value.trim();
    if (!name || !text) return [];

    return [{ "@type": "PropertyValue" as const, name, value: text }];
  });
}
