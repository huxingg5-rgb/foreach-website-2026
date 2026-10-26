// Public configuration pages only. Neutral series pages keep their existing
// resource behavior; 2D drawings remain managed by the detail-route adapter.
const models: Record<string, string> = {
  "dpl30-db": "DPL30-DB",
  "dpl30-bb": "DPL30-BB",
  "dpl60-db": "DPL60-DB",
  "dpl60-bb": "DPL60-BB",
  "dpl30h-ds": "DPL30H-DS",
  "dpl30h-bs": "DPL30H-BS",
  "dpgl800-bs": "DPGL800-BS",
};

export function getDiaphragmPumpCadAssets(slug: string) {
  if (!Object.prototype.hasOwnProperty.call(models, slug)) return undefined;

  return {
    model: models[slug],
    viewerId: slug,
    model3dUrl: `/models/products/pumps/diaphragm-pumps/cad/${slug}.fcad.gz`,
  };
}
