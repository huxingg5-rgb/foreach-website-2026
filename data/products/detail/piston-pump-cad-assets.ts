import { PISTON_PUMP_MODELS } from "@/lib/seo/piston-pump-migration";

// Full assemblies are filtered separately for transparent PMMA and opaque PEEK.
// Both variants retain the original externally visible surface geometry.
export function getPistonPumpCadAssets(slug: string) {
  if (!PISTON_PUMP_MODELS.includes(slug)) return undefined;
  const viewerId = slug.replace(/-(pmma|peek)$/, "");
  const headMaterial = slug.endsWith("-peek") ? "peek" as const : "pmma" as const;
  return {
    model: viewerId.toUpperCase(),
    viewerId,
    headMaterial,
    model3dUrl: `/models/products/pumps/piston-pumps/cad/${viewerId}${headMaterial === "peek" ? "-peek" : ""}.fcad.gz`,
  };
}
