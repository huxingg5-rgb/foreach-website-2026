import catalog from "../detail/smtp2-configurations.json";
import { getSmtp2VariantCopy } from "../detail/smtp2-variant-content";
import type { ProductSelectionProduct, SelectionLocale } from "./product-selection.types";

export function withSmtp2SelectionConfiguration(product: ProductSelectionProduct): ProductSelectionProduct[] {
  if (product.detailSlug !== "smtp2-1000ul") return [product];
  const locales: SelectionLocale[] = ["zh", "en", "es", "fr", "ko", "ru"];
  return catalog.variants.map((variant, index) => ({
    ...product,
    productId: `pipetting-${variant.model.toLowerCase()}`,
    detailSlug: variant.model.toLowerCase(), reservedConfigSlug: variant.model.toLowerCase(),
    imageCard: variant.cardImage, sortOrder: (product.sortOrder || 10) + index,
    cardTitle: Object.fromEntries(locales.map(locale => [locale, variant.model])) as ProductSelectionProduct["cardTitle"],
    cardSubtitle: Object.fromEntries(locales.map(locale => [locale, getSmtp2VariantCopy(variant.model.toLowerCase(), locale)!.heading])) as ProductSelectionProduct["cardSubtitle"],
    imageAlt: Object.fromEntries(locales.map(locale => [locale, getSmtp2VariantCopy(variant.model.toLowerCase(), locale)!.imageAlt])),
    searchKeywords: Object.fromEntries(locales.map(locale => [locale, `${variant.model} ${variant.adapter} ${variant.lengthMm} mm ${getSmtp2VariantCopy(variant.model.toLowerCase(), locale)!.meta}`])),
    tags: ["1000 μL", variant.adapter, `${variant.lengthMm} mm`, variant.model],
  }));
}
