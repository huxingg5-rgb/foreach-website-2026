import galleryData from "./gallery.json";
import type { SelectionLocale } from "../selection/product-selection.types";

type TubingGalleryLocale = SelectionLocale | "de" | "it" | "hi";

type TubingGalleryImage = {
  src: string;
  alt: Record<TubingGalleryLocale, string>;
};

const galleries: Record<string, TubingGalleryImage[] | undefined> = galleryData;

export function getTubingGallery(slug: string) {
  return galleries[slug];
}

// Size options describe the series, not a measured size of the photographed tube.
export function getTubingGalleryData(slug: string, locale = "zh") {
  const gallery = getTubingGallery(slug);
  if (!gallery?.length) return undefined;
  const language = (locale === "zh-CN" ? "zh" : locale) as TubingGalleryLocale;
  const images = gallery.map((image) => image.src);
  const alts = gallery.map((image) => image.alt[language] || image.alt.en);
  return {
    additionalImages: images,
    additionalImageAlts: alts,
  };
}
