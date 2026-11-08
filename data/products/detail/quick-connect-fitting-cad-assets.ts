import manifest from "./quick-connect-fitting-cad-manifest.json";

type QuickConnectCadManifest = {
  products: Record<string, {
    model: string;
    viewerId: string;
    drawingPdfUrl: string;
    gender: "P" | "S";
    housingMaterial: string;
    series: string;
  }>;
  geometries: Record<string, {
    model3dUrl: string;
  }>;
};

export type QuickConnectFittingCadAssets = {
  model: string;
  viewerId: string;
  model3dUrl: string;
  drawingPdfUrl: string;
  gender: "P" | "S";
  housingMaterial: string;
  series: string;
};

const quickConnectManifest = manifest as QuickConnectCadManifest;

/** Resolve only the reviewed exact-model STEP/PDF export. */
export function getQuickConnectFittingCadAssets(
  slug: string,
): QuickConnectFittingCadAssets | undefined {
  const product = quickConnectManifest.products[slug.trim().toLowerCase()];
  if (!product) return undefined;

  const geometry = quickConnectManifest.geometries[product.viewerId];
  if (!geometry?.model3dUrl) return undefined;

  return {
    model: product.model,
    viewerId: product.viewerId,
    model3dUrl: geometry.model3dUrl,
    drawingPdfUrl: product.drawingPdfUrl,
    gender: product.gender,
    housingMaterial: product.housingMaterial,
    series: product.series,
  };
}
