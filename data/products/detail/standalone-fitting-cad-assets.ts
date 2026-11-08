import manifest from "./standalone-fitting-cad-manifest.json";

export type StandaloneFittingFamily =
  | "barbed-fittings"
  | "thread-to-barbed-fittings"
  | "female-thread-adapters";

type StandaloneFittingCadAsset = {
  model: string;
  productCode: string;
  viewerId: string;
  model3dUrl: string;
  drawingPdfUrl?: string | null;
  fittingFinish: "natural" | "black" | "peek" | "steel" | "yellow";
};

const data = manifest as {
  products: Record<StandaloneFittingFamily, Record<string, {
    model: string;
    productCode: string;
    viewerId: string | null;
    finish: StandaloneFittingCadAsset["fittingFinish"];
    drawingPdfUrl?: string | null;
  }>>;
  geometries: Record<string, { model3dUrl: string }>;
};

export function getStandaloneFittingCadAssets(
  productTypeId: string,
  slug: string,
): StandaloneFittingCadAsset | undefined {
  if (!(productTypeId in data.products)) return undefined;
  const family = data.products[productTypeId as StandaloneFittingFamily];
  const product = family?.[String(slug || "").trim().toLowerCase()];
  if (!product?.viewerId) return undefined;
  const geometry = data.geometries[`${productTypeId}:${product.viewerId.replace(`${productTypeId}-`, "")}`]
    || Object.values(data.geometries).find(item => item.model3dUrl.endsWith(`/${product.viewerId}.fcad.gz`));
  if (!geometry?.model3dUrl) return undefined;
  return {
    model: product.model,
    productCode: product.productCode,
    viewerId: product.viewerId,
    model3dUrl: geometry.model3dUrl,
    drawingPdfUrl: product.drawingPdfUrl,
    fittingFinish: product.finish,
  };
}
