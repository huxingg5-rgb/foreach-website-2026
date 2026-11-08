import manifest from "./remaining-fitting-cad-manifest.json";
import { getStandaloneFittingCadAssets } from "./standalone-fitting-cad-assets";
import type { FittingCadFinish } from "./flat-bottom-fitting-cad-assets";

type Product = {
  model: string;
  productCode: string;
  viewerId: string;
  finish: string;
  drawingPdfUrl: string;
};
const products = manifest.products as Record<string, Record<string, Product>>;
const geometries = manifest.geometries as Record<string, { model3dUrl: string }>;

/** Exact reviewed model/drawing pairs for the Chinese remaining-fitting pages. */
export function getRemainingFittingCadAssets(productTypeId: string, slug: string) {
  const product = products[productTypeId]?.[String(slug || "").trim().toLowerCase()];
  if (!product) return undefined;
  const model3dUrl = geometries[product.viewerId]?.model3dUrl
    || getStandaloneFittingCadAssets(productTypeId, slug)?.model3dUrl;
  if (!model3dUrl) return undefined;
  return {
    model: product.model,
    productCode: product.productCode,
    viewerId: product.viewerId,
    model3dUrl,
    drawingPdfUrl: product.drawingPdfUrl,
    fittingFinish: product.finish as FittingCadFinish,
  };
}
