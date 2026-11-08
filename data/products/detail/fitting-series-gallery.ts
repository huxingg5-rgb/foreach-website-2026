import registry from "./fitting-series-photos.generated.json";
import { getDescriptiveFittingImageUrl } from "./fitting-image-description";

type Product = Record<string, unknown>;
type Donor = { model: string; family: string; material: string; color: string; photos: string[] };
const seriesPhotos = registry as Record<string, Donor[]>;

export function isFittingSeriesPhoto(src: string): boolean {
  return /^\/images\/products\/fittings\/[^/]+\/photos\/[^/]+\.webp$/.test(src) ||
    src === "/images/resources/technical-articles/quick-disconnect-fitting/quick-disconnect-fittings-photo.webp";
}

export function getFittingSeriesKey(product: Product): string | null {
  const type = String(product.productTypeId || "");
  if (!["barbed-fittings", "bulkhead-barbed-fittings", "check-valves", "female-thread-adapters", "filters", "hard-tube-fittings", "luer-fittings", "quick-connect-fittings", "thread-to-barbed-fittings"].includes(type)) return null;
  const model = String(product.foreachModel || product.model || "").trim().toUpperCase();
  if (!model) return null;
  const family = model.split("-")[0];
  // Public hard-tube selection series group HN/HNF, HF6/HFL6, etc. together.
  // Barbed fittings retain equal/reducing and straight/elbow/tee/Y boundaries.
  const series = type === "hard-tube-fittings" ? product.specSeriesKey || product.seriesId || family
    : type === "barbed-fittings" ? product.productName || product.name || product.seriesName || family
    : type === "quick-connect-fittings" ? model.match(/^Q(?:20|40|60)/)?.[0] || family
    : product.seriesCode || family;
  return `${type}:${String(series)}`;
}

export function getFittingSeriesAttribute(product: Product, labels: string[]): string {
  const specs = Array.isArray(product.specs) ? product.specs as { label?: unknown; value?: unknown }[] : [];
  return String(specs.find(row => labels.includes(String(row.label)))?.value || "").trim().toUpperCase();
}

/** Fill a missing real-photo gallery from a published model in the same public
 * series. Existing galleries, model renderings, dimensions and materials stay
 * intact. Prefer the same body family, then matching material and colour. */
export function getFittingSeriesGallery(product: Product): {
  additionalImages?: string[];
  additionalImageAlts?: string[];
  sharedFittingPhotoSources?: string[];
  sharedFittingPhotoDonor?: string;
} {
  const key = getFittingSeriesKey(product);
  if (!key) return {};
  const images = Array.isArray(product.additionalImages) ? product.additionalImages.filter((src): src is string => typeof src === "string" && Boolean(src)) : [];
  if (images.some(src => isFittingSeriesPhoto(getDescriptiveFittingImageUrl(src)))) return {};
  const candidates = seriesPhotos[key];
  if (!candidates?.length) return {};
  const family = String(product.foreachModel || product.model).trim().toUpperCase().split("-")[0];
  const material = getFittingSeriesAttribute(product, ["材质", "主体材质", "壳体材质", "外壳材质"]);
  const color = getFittingSeriesAttribute(product, ["颜色"]);
  const score = (donor: Donor) => (donor.family === family ? 8 : 0) + (material && donor.material === material ? 4 : 0) + (color && donor.color === color ? 1 : 0);
  const donor = candidates.slice().sort((a, b) => score(b) - score(a) || b.photos.length - a.photos.length)[0];
  const existing = new Set(images.map(getDescriptiveFittingImageUrl));
  const photos = donor.photos.filter(src => !existing.has(src));
  if (!photos.length) return {};
  const alts = Array.isArray(product.additionalImageAlts) ? product.additionalImageAlts : [];
  return {
    additionalImages: [...images, ...photos],
    additionalImageAlts: [...images.map((_, i) => String(alts[i] || "")), ...photos.map((_, i) => `同系列接头实拍参考图 ${i + 1}`)],
    sharedFittingPhotoSources: photos,
    sharedFittingPhotoDonor: donor.model,
  };
}
