import galleryData from "./gallery.json";
import type { SelectionLocale } from "../selection/product-selection.types";

type TubingGalleryImage = {
  src: string;
  alt: Record<SelectionLocale, string>;
};

const galleries: Record<string, TubingGalleryImage[] | undefined> = galleryData;

export function getTubingGallery(slug: string) {
  return galleries[slug];
}

// Size options describe the series, not a measured size of the photographed tube.
export function getTubingGalleryData(slug: string, locale = "zh") {
  const gallery = getTubingGallery(slug);
  if (!gallery?.length) return undefined;
  const language = (locale === "zh-CN" ? "zh" : locale) as SelectionLocale;
  const images = gallery.map((image) => image.src);
  const alts = gallery.map((image) => image.alt[language] || image.alt.en);
  return {
    additionalImages: images,
    additionalImageAlts: alts,
  };
}
