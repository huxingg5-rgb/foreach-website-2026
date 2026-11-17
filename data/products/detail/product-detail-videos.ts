import library from "./product-detail-videos.generated.json";
import { normalizeRelationKey } from "@/lib/related-resources";

export type ProductVideoLocale = "en" | "es" | "fr" | "ko" | "ru";
export type ProductVideoIdentity = {
  slug?: string;
  model?: string;
  foreachModel?: string;
  productId?: string;
  category?: string;
  productTypeId?: string;
  seriesId?: string;
  specSeriesKey?: string;
  relationKeys?: readonly string[];
};
export type ProductDetailVideo = {
  id: string;
  title: string;
  cover: string;
  kind: "youtube" | "file";
  src: string;
  relationKeys: string[];
  priority: number;
};
const videos = library as Record<ProductVideoLocale, ProductDetailVideo[]>;
const knownSeries = [...new Set(videos.en.flatMap(video => video.relationKeys))]
  .filter(key => key.startsWith("series:"))
  .map(key => key.slice(7));

export function isProductVideoLocale(locale: string): locale is ProductVideoLocale {
  return Object.hasOwn(videos, locale);
}

export function getProductVideoRelationKeys(identity: ProductVideoIdentity, pathname: string) {
  const keys = new Set((identity.relationKeys ?? []).map(normalizeRelationKey));
  const tokens = [identity.slug, identity.model, identity.foreachModel, identity.productId,
    identity.category, identity.productTypeId, identity.seriesId, identity.specSeriesKey,
    ...pathname.split("/").filter(Boolean)]
    .filter((value): value is string => typeof value === "string" && Boolean(value.trim()))
    .map(value => value.trim().toLowerCase().replace(/\s+/g, "-"));
  for (const token of tokens) {
    keys.add(`product:${token}`);
    keys.add(`category:${token}`);
    keys.add(`series:${token}`);
    for (const series of knownSeries) {
      // Q2001 belongs to Q20; DPL30H must not inherit DPL30 demonstrations.
      if (token.startsWith(series) && /^(?:$|[-_]|\d)/.test(token.slice(series.length))) keys.add(`series:${series}`);
    }
    // SV10 retains 6010 as its established video relation in the source library.
    if (token === "solenoid-valves" || /^sv10(?:$|[-_])/.test(token)) keys.add("series:6010");
    if (/^f-ss(?:$|[-_])/.test(token)) keys.add("topic:f-ss-water-circulation");
  }
  return keys;
}

export function getProductDetailVideos(locale: string, identity: ProductVideoIdentity, pathname: string): ProductDetailVideo[] {
  if (!isProductVideoLocale(locale)) return [];
  const keys = getProductVideoRelationKeys(identity, pathname);
  const score = (video: ProductDetailVideo) => Math.max(0, ...video.relationKeys.filter(key => keys.has(key))
    .map(key => key.startsWith("product:") ? 300 : key.startsWith("series:") ? 200 : 100));
  return videos[locale].filter(video => score(video) > 0)
    .sort((first, second) => score(second) - score(first) || second.priority - first.priority);
}

export const productVideoUi = {
  en: { title: "Videos", product: "Product Videos", factory: "Factory Video", company: "Inside FOREACH", empty: "A video for this product is not available yet.", contact: "Contact technical support", play: "Play video", select: "Select video", carousel: "Drag or use the left and right arrow keys to change videos.", previous: "Previous video", next: "Next video" },
  es: { title: "Vídeos", product: "Vídeos del producto", factory: "Vídeo de la fábrica", company: "Conozca FOREACH", empty: "Todavía no hay un vídeo disponible para este producto.", contact: "Contactar con soporte técnico", play: "Reproducir vídeo", select: "Seleccionar vídeo", carousel: "Arrastre o use las flechas izquierda y derecha para cambiar de vídeo.", previous: "Vídeo anterior", next: "Vídeo siguiente" },
  fr: { title: "Vidéos", product: "Vidéos du produit", factory: "Vidéo de l’usine", company: "Découvrez FOREACH", empty: "Aucune vidéo n’est encore disponible pour ce produit.", contact: "Contacter le support technique", play: "Lire la vidéo", select: "Sélectionner la vidéo", carousel: "Faites glisser ou utilisez les flèches gauche et droite pour changer de vidéo.", previous: "Vidéo précédente", next: "Vidéo suivante" },
  ko: { title: "동영상", product: "제품 동영상", factory: "공장 동영상", company: "FOREACH 소개", empty: "이 제품의 동영상은 아직 준비되지 않았습니다.", contact: "기술 지원 문의", play: "동영상 재생", select: "동영상 선택", carousel: "드래그하거나 좌우 방향키로 동영상을 전환하세요.", previous: "이전 동영상", next: "다음 동영상" },
  ru: { title: "Видео", product: "Видео о продукте", factory: "Видео о заводе", company: "Знакомство с FOREACH", empty: "Видео для этого продукта пока недоступно.", contact: "Связаться с технической поддержкой", play: "Воспроизвести видео", select: "Выбрать видео", carousel: "Перетащите или используйте стрелки влево и вправо для переключения видео.", previous: "Предыдущее видео", next: "Следующее видео" },
} as const;
