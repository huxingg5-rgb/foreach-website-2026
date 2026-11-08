import manifest from "./luer-cad-manifest.json";

type LuerCadProduct = { model: string; productCode: string; geometryId: string; drawingUrl: string };
const products = manifest.products as Record<string, LuerCadProduct>;
const geometries = manifest.geometries as Record<string, { url: string }>;

/** Exact published Luer model/drawing pairs; the caller applies the locale scope. */
export function getLuerCadAssets(slug: string) {
  const product = products[String(slug || "").trim().toUpperCase()];
  const geometry = product && geometries[product.geometryId];
  if (!product || !geometry) return undefined;
  return { model: product.model, productCode: product.productCode,
    model3dUrl: geometry.url, drawingPdfUrl: product.drawingUrl };
}
