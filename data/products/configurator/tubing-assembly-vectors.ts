import vectorParts from "./tubing-assembly-vector-parts.json";
import cadParts from "./tubing-assembly-cad-vectors.json";
import legacyParts from "./flanged-vector-parts.json";
import ringPdfParts from "./tubing-assembly-ring-pdf-vectors.json";
import { assemblyAccessory, getAssemblyFitting } from "./tubing-assembly-catalog";

type Command = [string, ...number[]];
export type AssemblyVectorPart = { width: number; height: number; axisY: number; paths: Command[][]; source: string; strokeWidths?: number[]; bbox?: number[]; viewAsset?: string; viewPadding?: number; sourceSha256?: string };
type VectorPart = AssemblyVectorPart;
const parts = vectorParts as unknown as Record<string, VectorPart>;
const cad = cadParts as unknown as Record<string, VectorPart>;
const ringPdf = ringPdfParts as unknown as Record<string, VectorPart>;
export function getAssemblyFittingVector(model?: string) {
  const fitting = getAssemblyFitting(model);
  return fitting && ((fitting.drawingUrl && ringPdf[fitting.drawingUrl]) || (fitting.preferCadVector && fitting.cadUrl && cad[fitting.cadUrl]) || (fitting.drawingUrl && parts[fitting.drawingUrl]) || (fitting.cadUrl && cad[fitting.cadUrl])) || undefined;
}
export function getAssemblyAccessoryVector(model?: string, code?: string) {
  const accessory = assemblyAccessory(model, code);
  return accessory?.cadUrl ? cad[accessory.cadUrl] : undefined;
}
export function getLegacyFlangedVector(series: string): VectorPart | undefined {
  const source = legacyParts[series as "FL" | "FL6"];
  // The original FL/FL6 trace is the A-end view; normalize to the same B-end
  // direction as the catalog PDFs before assemblyVectorPaths mirrors A.
  return source ? { ...source, paths: source.contours.map(ring => [...ring.map(([x,y],i) => [i ? "L" : "M", source.width-x,y] as Command), ["Z"] as Command]) } : undefined;
}
/** Bake transforms into path coordinates so browser SVG and PDF use identical paths. */
export function assemblyVectorPaths(part: VectorPart, cx: number, cy: number, width: number, height: number, mirror = false) {
  const scale = Math.min(width / part.width, height / part.height), direction = mirror ? -1 : 1;
  return part.paths.map(commands => commands.map(([command, ...coords]) => command + coords.map((v, i) => Number((i % 2 ? cy + (v - part.axisY) * scale : cx + (v - part.width / 2) * scale * direction).toFixed(3))).join(" ")).join(""));
}

/** Preserve the source PDF's line weight when its side view is reduced. */
export function assemblyVectorStrokes(part: VectorPart, width: number, height: number, fallback = .6) {
  const scale = Math.min(width / part.width, height / part.height);
  return part.paths.map((_, index) => part.strokeWidths?.[index] !== undefined ? part.strokeWidths[index] * scale : fallback);
}

/** Prepared native PDF view contains only paths selected from the original PDF. */
export function assemblyOriginalPdfView(part: VectorPart) {
  const box = part.bbox;
  const padding = part.viewPadding;
  return part.source.startsWith("/downloads/products/fittings/2d-drawings/") && part.source.endsWith(".pdf") && part.viewAsset?.startsWith("/assets/products/tubing-assemblies/part-drawing-views/") && padding !== undefined && Number.isFinite(padding) && padding >= 0 && box?.length === 4 && box.every(Number.isFinite) && box[2] > box[0] && box[3] > box[1]
    ? { url: part.viewAsset, box: [0, 0, part.width + padding * 2, part.height + padding * 2] as [number, number, number, number], sourceBox: box, padding } : undefined;
}
