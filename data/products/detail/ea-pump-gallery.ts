import photos from "./ea-pump-gallery.json";
import type { SelectionLocale } from "../selection/product-selection.types";

const imageRoot = "/images/products/pumps/plunger-pump/ea/gallery/";

/** Series configuration references; photograph labels do not describe the current SKU. */
export function getEaPumpGallery(
  slug: string,
  locale: SelectionLocale,
  existingImages: string[] = [],
  existingAlts: string[] = [],
): { additionalImages?: string[]; additionalImageAlts?: string[] } {
  if (!/^ea-\d+-(?:pmma|peek)$/i.test(slug)) return {};

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
