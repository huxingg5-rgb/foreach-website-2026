import { endConnection, resolveAssemblyEndAlias, type FlangedEnd } from "./flanged-tubing";
import { getAssemblyFitting } from "./tubing-assembly-catalog";

/** Preview and drawing share the resolved catalog identity, with separate renderers. */
export function assemblyPreviewAsset(end: FlangedEnd, outer: number): { url: string; kind: "exact-cad" } | null {
  end = resolveAssemblyEndAlias(end, outer);
  const fitting = getAssemblyFitting(end.fittingModel);
  return fitting?.family === end.series && fitting.connections.includes(endConnection(end)) && fitting.outerDiameters.includes(outer) && fitting.cadUrl
    ? { url: fitting.cadUrl, kind: "exact-cad" } : null;
}

/** User-approved exterior reference for the assembly's visual preview only.
 * Both PEEK bodies are 15.5 mm long, OD 6.4 mm, with 1/4-28 threads. Their
 * bores and local details differ: catalog CAD, saved SKU and 2D remain exact.
 */
export function assemblyExteriorPreviewAsset(end: FlangedEnd, outer: number) {
  end = resolveAssemblyEndAlias(end, outer);
  const fitting = getAssemblyFitting(end.fittingModel);
  if (!fitting || fitting.model !== "HSF6-U28-32-PK-N" || fitting.family !== end.series
    || !fitting.connections.includes(endConnection(end)) || !fitting.outerDiameters.includes(outer) || fitting.cadUrl) return null;
  const reference = getAssemblyFitting("HSF6-U28-16-PK-N");
  return reference?.cadUrl && reference.family === fitting.family && reference.thread === fitting.thread
    && reference.material === fitting.material && reference.color === fitting.color
    ? { url: reference.cadUrl, sourceModel: reference.model, kind: "shared-exterior" as const } : null;
}
