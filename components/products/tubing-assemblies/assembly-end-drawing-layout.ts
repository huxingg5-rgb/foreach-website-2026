import { assemblyAccessory } from "@/data/products/configurator/tubing-assembly-catalog";
import { endConnection, type FlangedEnd } from "@/data/products/configurator/flanged-tubing";
import { assemblyVectorSizeMm, getAssemblyAccessoryVector, getAssemblyFittingVector } from "@/data/products/configurator/tubing-assembly-vectors";

/** One physical scale for the tube, original PDF fitting and CAD accessory.
 * The axial gap is explicitly an exploded-view gap, not an insertion depth. */
export function assemblyEndDrawingLayout(end: FlangedEnd, side: "a" | "b", datum: number, scale = 9.4) {
  const fitting = getAssemblyFittingVector(end.fittingModel);
  const accessory = getAssemblyAccessoryVector(end.fittingModel, end.accessoryCode);
  const fittingMm = assemblyVectorSizeMm(fitting), accessoryMm = assemblyVectorSizeMm(accessory);
  if (!fitting || !fittingMm) return undefined;
  const direction = side === "a" ? 1 : -1;
  const width = fittingMm.width * scale, height = fittingMm.height * scale;
  const accessoryWidth = (accessoryMm?.width || 0) * scale, accessoryHeight = (accessoryMm?.height || 0) * scale;
  // A formed flange remains outside its support washer. Ferrules start at
  // the square-cut tube end, as in the published assembly instructions.
  const flangeOffset = endConnection(end) === "翻边" ? 4 : 0;
  const accessoryOuter = datum + direction * flangeOffset;
  const accessoryX = accessoryOuter + direction * accessoryWidth / 2;
  const gap = 2 * scale;
  const fittingOuter = accessoryOuter + direction * (accessoryWidth + gap);
  return { fitting, accessory, accessoryPart: assemblyAccessory(end.fittingModel, end.accessoryCode), scale, width, height,
    fittingX: fittingOuter + direction * width / 2, fittingOuter,
    accessoryX, accessoryWidth, accessoryHeight, gap,
    innerEdge: fittingOuter + direction * width, mirror: side === "a" };
}
