import manifest from "./fitting-drawing-manifest.json";

const products = manifest.products as Record<string, Record<string, { geometryKey: string; url: string }>>;

/** 2D drawings follow geometry; material and colour variants share the same PDF. */
export function getFittingDrawingHref(family: string, slug: string): string | null {
  return products[family]?.[String(slug || "").trim().toLowerCase()]?.url || null;
}
