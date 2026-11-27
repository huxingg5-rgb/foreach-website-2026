import gallery from "./abd-gallery.json";
import type { SelectionLocale } from "../selection/product-selection.types";

const hindiPhotoAlts: Readonly<Record<string, string>> = {
  "91.JPG": "खुले ढक्कनों वाले तीन FOREACH ABD सेंसरों का साइड व्यू, जिसमें ट्यूब की नालियाँ और माउंटिंग होल दिखते हैं",
  "93.JPG": "बंद ढक्कनों वाले तीन FOREACH ABD सेंसरों का तिरछा व्यू, जिसमें विद्युत कनेक्टर और माउंटिंग होल दिखते हैं",
  "92.JPG": "खुले ढक्कनों वाले तीन FOREACH ABD सेंसरों का सामने का व्यू, जिसमें अलग-अलग चौड़ाई की ट्यूब नालियाँ और विद्युत कनेक्टर दिखते हैं",
};

export function getAbdGalleryData(
  slug: string,
  locale: SelectionLocale | "de" | "it" | "hi" = "zh",
): { additionalImages?: string[]; additionalImageAlts?: string[] } {
  if (slug !== "abd-air-bubble-detector") return {};

  return {
    additionalImages: gallery.photos.map(photo => `/images/products/control/${photo.filename}`),
    additionalImageAlts: gallery.photos.map(photo => locale === "hi" ? hindiPhotoAlts[photo.source] ?? photo.alt.en : photo.alt[locale]),
  };
}
