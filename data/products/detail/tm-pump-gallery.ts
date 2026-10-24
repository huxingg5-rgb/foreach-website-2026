import photos from "./tm-pump-gallery.json";
import type { SelectionLocale } from "../selection/product-selection.types";

const imageRoot = "/images/products/pumps/plunger-pump/tm/";

/** Shared reference photographs: capacities in ALT describe the photographed pump. */
export function getTmPumpGallery(
  slug: string,
  locale: SelectionLocale,
  existingImages: string[] = [],
  existingAlts: string[] = [],
): { additionalImages?: string[]; additionalImageAlts?: string[] } {
  if (!/^tm-\d+-pmma$/i.test(slug)) return {};

  const sharedImages = new Set(photos.map(photo => imageRoot + photo.filename));
  const additionalImages: string[] = [];
  const additionalImageAlts: string[] = [];
  existingImages.forEach((src, index) => {
    if (!src || sharedImages.has(src) || additionalImages.includes(src)) return;
    additionalImages.push(src);
    additionalImageAlts.push(existingAlts[index] || "");
  });
  for (const photo of photos) {
    additionalImages.push(imageRoot + photo.filename);
    additionalImageAlts.push(photo.alt[locale]);
  }
  return { additionalImages, additionalImageAlts };
}
