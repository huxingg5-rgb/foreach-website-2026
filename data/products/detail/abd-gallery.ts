import gallery from "./abd-gallery.json";
import type { SelectionLocale } from "../selection/product-selection.types";

export function getAbdGalleryData(
  slug: string,
  locale: SelectionLocale = "zh",
): { additionalImages?: string[]; additionalImageAlts?: string[] } {
  if (slug !== "abd-air-bubble-detector") return {};

  return {
    additionalImages: gallery.photos.map(photo => `/images/products/control/${photo.filename}`),
    additionalImageAlts: gallery.photos.map(photo => photo.alt[locale]),
  };
}
