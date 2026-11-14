import { fepTubingVariants } from "./fep-tubing";
import { ptfeTubingVariants } from "./ptfe-tubing";
import { pfaTubingVariants } from "./pfa-tubing";
import { peekTubingVariants } from "./peek-tubing";
import { pvcTubingVariants } from "./pvc-tubing";
import { tpuTubingVariants } from "./tpu-tubing";
import { hardTubeFittingSelectionProducts } from "../selection/hard-tube-fitting-selection.generated";
import { HARD_TUBE_ACCESSORY_CONFIGS, type HardTubeAccessory } from "./hard-tube-accessories";
import ringKits from "./tubing-assembly-ring-kits.json";
import cadManifest from "../detail/hard-tube-fitting-cad-manifest.json";
import assemblyCadImports from "./tubing-assembly-cad-imports.json";
import hsfNativeCad from "./tubing-assembly-hsf-cad.json";
import drawingManifest from "../detail/fitting-drawing-manifest.json";
import { assemblyRingSpecifications, assemblyRingDrawingRoot } from "./tubing-assembly-ring-specifications";

export type AssemblyConnection = "翻边" | "卡箍" | "卡环";
export const assemblyConnections: AssemblyConnection[] = ["翻边", "卡箍", "卡环"];
export const assemblyFamilyLabel = (family: string) => family === "HSF" ? "HSF · 标准卡环" : family === "HSF6" ? "HSF6 · 紧凑卡环" : family;
export const assemblyTubeMaterials = ["FEP", "PTFE", "PFA", "PEEK", "PVC", "TPU"] as const;
export const assemblyTubes = [fepTubingVariants, ptfeTubingVariants, pfaTubingVariants, peekTubingVariants, pvcTubingVariants, tpuTubingVariants].flatMap((variants, i) => variants.map(v => ({
  key: i === 0 ? v.model : `${assemblyTubeMaterials[i]}:${v.id}`,
  model: v.model, code: v.productCode || "", material: assemblyTubeMaterials[i],
  inner: Number(v.attributes.innerDiameter), outer: Number(v.attributes.outerDiameter),
  color: String(v.attributes.color || (["FEP", "PFA", "PVC"].includes(assemblyTubeMaterials[i]) ? "透明" : "本色")),
  hardness: String(v.attributes.hardness || ""),
})));
export const getAssemblyTube = (key: string) => assemblyTubes.find(t => t.key === key) || assemblyTubes.find(t => t.model === key);
export type AssemblyTube = typeof assemblyTubes[number];
/** Fixed catalog size, displayed as OD × ID in millimetres. */
export const assemblyTubeSizeKey = (tube: AssemblyTube) => `${tube.outer} × ${tube.inner}`;
export function assemblyTubeSizes(material: AssemblyTube["material"], pool: AssemblyTube[] = assemblyTubes): string[] {
  return [...new Set(pool.filter(t => t.material === material).sort((a,b) => a.outer - b.outer || a.inner - b.inner).map(assemblyTubeSizeKey))];
}
export function selectAssemblyTubeSize(current: AssemblyTube, size: string, pool: AssemblyTube[] = assemblyTubes): AssemblyTube | undefined {
  let candidates = pool.filter(t => t.material === current.material && assemblyTubeSizeKey(t) === size);
  for (const attribute of ["color", "hardness"] as const) {
    const exact = candidates.filter(t => t[attribute] === current[attribute]);
    if (exact.length) candidates = exact;
  }
  return candidates.find(t => t.key === current.key) || candidates[0];
}
export function selectAssemblyTubeAttribute(current: AssemblyTube, key: "material" | "outer" | "inner" | "color" | "hardness", value: string, pool: AssemblyTube[] = assemblyTubes): AssemblyTube | undefined {
  const desired = { ...current, [key]: key === "outer" || key === "inner" ? Number(value) : value };
  let candidates = pool.filter(t => t.material === desired.material);
  for (const attribute of ["outer", "inner", "color", "hardness"] as const) {
    const exact = candidates.filter(t => t[attribute] === desired[attribute]);
    if (exact.length) candidates = exact;
    else if (attribute === key) return undefined;
  }
  return candidates.find(t => t.key === current.key) || candidates[0];
}

type CadProduct = { viewerId: string; finish: string; provisionalGeometry?: boolean };
type CadGeometry = { model3dUrl: string; sourcePart?: string };
const cadProducts = cadManifest.products as Record<string, CadProduct>;
const cadGeometries = cadManifest.geometries as Record<string, CadGeometry>;
const cadAccessories = cadManifest.accessories as Record<string, { geometryId: string; finish: string }>;
const supplementalCad = assemblyCadImports as Record<string, CadGeometry>;
const exactHsfCad = hsfNativeCad as Record<string, CadGeometry>;
const drawings = drawingManifest.products["hard-tube-fittings"] as Record<string, { url: string; geometryKey: string }>;
type AssemblyAccessory = Omit<HardTubeAccessory, "kind"> & { kind: HardTubeAccessory["kind"] | "卡环组件"; cadUrl?: string; finish?: string };
export type AssemblyFitting = { model: string; code: string; family: string; connection: AssemblyConnection; connections: AssemblyConnection[];
  thread: string; material: string; color: string; outerDiameters: number[]; image?: string; cadUrl?: string; sourcePart?: string; drawingUrl?: string; preferCadVector?: boolean; accessories: AssemblyAccessory[] };
export function assemblyFittingAccessories(fitting: AssemblyFitting | undefined, connection: AssemblyConnection, outer: number) {
  if (!fitting?.connections.includes(connection) || !fitting.outerDiameters.includes(outer)) return [];
  // WS-27 is an approved catalog part with confirmed dimensions and CAD;
  // only its numeric SKU is pending. Other placeholder parts stay excluded.
  return fitting.accessories.filter(a => (!a.productCodePending || (a.model === "WS-27" && a.productCode === "WS-27")) && a.productCode.trim() && a.tubeOuterDiameters.includes(outer) && a.kind === (connection === "卡环" ? "卡环组件" : connection === "卡箍" ? "卡箍" : "垫片"));
}

/** All published flange/clamp/ring fittings. Pressure unions are a different connection system. */
const catalogFittings: AssemblyFitting[] = hardTubeFittingSelectionProducts.filter(p => ["standard-flat-bottom-fitting", "compact-flat-bottom-fitting", "standard-ferrule-fitting", "compact-ferrule-fitting", "retaining-ring-fitting"].includes(p.seriesId || "")).map(p => {
  const model = p.cardTitle.zh, slug = model.toLowerCase(), family = model.split("-")[0];
  const connection: AssemblyConnection = family.startsWith("HF") ? "翻边" : family.startsWith("HN") ? "卡箍" : "卡环";
  // A different finish may share a drawing only for the identical family,
  // thread and bore key. Provisional cross-thread CAD is never used here.
  const key = model.split("-").slice(0, 3).join("-");
  const config = HARD_TUBE_ACCESSORY_CONFIGS.find(c => c.model === model) || HARD_TUBE_ACCESSORY_CONFIGS.find(c => c.model.split("-").slice(0, 3).join("-") === key);
  const cad = cadProducts[slug] || Object.values(cadProducts).find(c => !c.provisionalGeometry && (c as CadProduct & { model: string }).model?.split("-").slice(0, 3).join("-") === key);
  // Standard HSF bodies have their own exact SKU sources. A missing source
  // must not fall through to generic/compact HSF6 geometry.
  const geometry = family === "HSF" ? exactHsfCad[model]
    : cad && !cad.provisionalGeometry ? cadGeometries[cad.viewerId] : supplementalCad[key];
  const drawing = drawings[slug] || Object.values(drawings).find(d => d.geometryKey === key);
  // A02 p.23 explicitly lists the HSF6 -32 body for 2/2.5/3/3.2 mm
  // tubing, with a distinct CL-1S kit bore for each size.
  const outerDiameters = family === "HSF6" && key.endsWith("-32") ? [2, 2.5, 3, 3.2]
    : config?.tubeOuterDiameters || String(p.filters!.filter03).split("|").map(s => parseFloat(s));
  const accessories: AssemblyAccessory[] = connection === "卡环"
    ? ringKits.filter(kit => kit.model.startsWith("CL-1S-") && kit.tubeOuterDiameters.some(outer => outerDiameters.includes(outer))) as AssemblyAccessory[]
    : (config?.accessories || []).map(a => ({ ...a,
      cadUrl: cadGeometries[cadAccessories[a.productCode]?.geometryId]?.model3dUrl || supplementalCad[a.model.split("-").slice(0, 3).join("-")]?.model3dUrl,
      finish: cadAccessories[a.productCode]?.finish,
    }));
  const connections: AssemblyConnection[] = model === "HFL6-U40-16-PK-N" ? ["翻边","卡环"] : [connection];
  if (model === "HFL6-U40-16-PK-N") accessories.push(...ringKits.filter(kit=>kit.model==="CL-1X-16") as AssemblyAccessory[]);
  return { model, code: p.productId, family, connection, connections, thread: p.filters!.filter02 as string,
    material: p.filters!.filter04 as string, color: p.filters!.filter05 as string,
    outerDiameters,
    image: p.imageCard, cadUrl: geometry?.model3dUrl,
    sourcePart: geometry?.sourcePart,
    drawingUrl: drawing?.url, preferCadVector:model === "HFL6-U40-16-PK-N",
    accessories,
  };
});
export const assemblyFittings: AssemblyFitting[] = [
  ...catalogFittings.filter(f => !assemblyRingSpecifications.some(s => s.model === f.model)),
  ...assemblyRingSpecifications.map((s): AssemblyFitting => {
    const geometry=supplementalCad[s.cadKey], original=catalogFittings.find(f=>f.model===s.model);
    // A02 p.23 confirms HSF6 with CL-1S ring kits. Flange washers are not
    // confirmed for these bodies; do not infer compatibility from the bore.
    return { ...s, family:"HSF6", connection:"卡环", connections:["卡环"], image:original?.image,
      cadUrl:geometry?.model3dUrl, sourcePart:geometry?.sourcePart, preferCadVector:true,
      drawingUrl:assemblyRingDrawingRoot+s.drawingFile,
      accessories:ringKits.filter(k=>k.model.startsWith("CL-1S-") && k.tubeOuterDiameters.some(outer=>s.outerDiameters.includes(outer))) as AssemblyAccessory[],
    };
  }),
];
export const getAssemblyFitting = (model?: string) => assemblyFittings.find(f => f.model === model);
export function compatibleAssemblyFittings(outer: number, filters: Partial<Pick<AssemblyFitting, "connection" | "family" | "thread" | "material" | "color">> = {}) {
  return assemblyFittings.filter(f => f.outerDiameters.includes(outer) && Object.entries(filters).every(([key, value]) => value === undefined || (key === "connection" ? assemblyFittingAccessories(f, value as AssemblyConnection, outer).length > 0 : f[key as keyof typeof filters] === value)));
}
export const assemblyFamilies = (connection: AssemblyConnection, outer?: number) => [...new Set((outer === undefined ? assemblyFittings.filter(f => f.connections.includes(connection)) : compatibleAssemblyFittings(outer, { connection })).map(f => f.family))];
/** Keep published series discoverable without widening their actual tube fit. */
export function assemblyFamilyAvailability(connection: AssemblyConnection, outer: number) {
  return assemblyFamilies(connection).map(family => {
    const fittings = assemblyFittings.filter(f => f.family === family && f.connections.includes(connection));
    const outerDiameters = [...new Set(fittings.flatMap(f => f.outerDiameters.filter(outer => assemblyFittingAccessories(f, connection, outer).length > 0)))].sort((a, b) => a - b);
    return { family, outerDiameters, available: outerDiameters.includes(outer) };
  });
}
export function assemblyAccessory(model?: string, code?: string) {
  return getAssemblyFitting(model)?.accessories.find(a => a.productCode === code);
}
