import thumbnails from "./product-card-thumbnails.generated.json";

type ProductCardThumbnail = { src: string; width: number; height: number };
const thumbnailMap: Readonly<Record<string, ProductCardThumbnail>> = thumbnails;

// Listing cards only: preserve Chinese markup and every product's detail image.
export function getProductCardThumbnail(source: string | undefined, locale: string) {
  if (!source || !["en", "es", "fr", "ko", "ru"].includes(locale)) return undefined;
  return thumbnailMap[source];
}
