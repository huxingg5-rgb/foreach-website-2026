import { endConnection, normalizeFlangedChoice, resolveAssemblyEndAlias, type FlangedEnd, type FlangedTubingChoice } from "./flanged-tubing";
import { assemblyFittingAccessories, getAssemblyFitting, getAssemblyTube } from "./tubing-assembly-catalog";

export type AssemblyPreviewEnd = FlangedEnd & {
  enabled: boolean; cadUrl?: string; exteriorSourceModel?: string;
  accessoryCadUrl?: string; accessoryColor?: string; accessoryMissing?: boolean;
};
export type AssemblyPreviewConfig = {
  mode: string; inner: number; outer: number; tubeColor: string; tubeMaterial: string;
  labelA: boolean; labelB: boolean; a: AssemblyPreviewEnd; b: AssemblyPreviewEnd;
};

/** Warm-up and the visible preview must resolve the same catalog parts. */
export function assemblyPreviewConfig(input: FlangedTubingChoice): AssemblyPreviewConfig {
  const choice = normalizeFlangedChoice(input), tube = getAssemblyTube(choice.tubeModel)!;
  const renderEnd = (end: FlangedEnd): AssemblyPreviewEnd => {
    const fitting = getAssemblyFitting(end.fittingModel);
    const accessory = assemblyFittingAccessories(fitting, endConnection(end), tube.outer).find(a => a.productCode === end.accessoryCode);
    const enabled = Boolean(fitting?.family === end.series && accessory);
    const preview = enabled ? assemblyPreviewAsset(end, tube.outer) : null;
    const exterior = enabled && !preview ? assemblyExteriorPreviewAsset(end, tube.outer) : null;
    return { ...end, enabled, connection: endConnection(end), cadUrl: preview?.url || exterior?.url, exteriorSourceModel: exterior?.sourceModel,
      accessoryCadUrl: enabled && accessory?.tubeOuterDiameters.includes(tube.outer) ? accessory.cadUrl : undefined, accessoryColor: accessory?.color,
      accessoryMissing: Boolean(enabled && accessory?.tubeOuterDiameters.includes(tube.outer) && !accessory.cadUrl) };
  };
  return { mode: choice.mode, inner: tube.inner, outer: tube.outer, tubeColor: tube.color, tubeMaterial: tube.material,
    labelA: choice.labelA, labelB: choice.labelB, a: renderEnd(choice.a), b: renderEnd(choice.b) };
}

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
