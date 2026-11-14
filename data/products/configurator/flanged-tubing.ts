import { fepTubingVariants } from "./fep-tubing";
import { getAssemblyEntryPreset } from "./tubing-assembly-entry";
import { assemblyAccessory, assemblyFamilies, assemblyFittingAccessories, assemblyTubes, compatibleAssemblyFittings, getAssemblyFitting, getAssemblyTube, type AssemblyConnection } from "./tubing-assembly-catalog";

// The customer confirmed FL/FL6 omit the hard-tube H prefix: HFL/HFL6.
// Catalog records define the actual bore, thread, material, color and accessory.
export type FlangedEnd = {
  series: string;
  thread: string;
  material: string;
  color: string;
  washer: string;
  stop: "无" | "O 型圈" | "硅胶管";
  connection?: AssemblyConnection;
  fittingModel?: string;
  accessoryCode?: string;
};

export type FlangedTubingChoice = {
  mode: "single" | "double";
  tubeModel: string;
  length: string;
  tolerance: string;
  a: FlangedEnd;
  b: FlangedEnd;
  freeEnd: "卡箍" | "针" | "其他";
  freeEndNote: string;
  labelA: boolean;
  labelB: boolean;
  textA: string;
  textB: string;
  application: string;
  notes: string;
  company?: string;
  contact?: string;
  customerPart?: string;
};

export const flangedFepTubes = fepTubingVariants.map(v => ({
  model: v.model,
  inner: Number(v.attributes.innerDiameter),
  outer: Number(v.attributes.outerDiameter),
}));

export function defaultFlangedTubingChoice(): FlangedTubingChoice {
  const end = selectAssemblyConnection({ series: "HFL", thread: "1/4-28 UNF", material: "PVDF", color: "本色", washer: "SUS", stop: "无" }, "翻边", 1.6);
  return {
    mode: "double", tubeModel: "BFT03002", length: "", tolerance: "5",
    a: { ...end }, b: { ...end }, freeEnd: "其他", freeEndNote: "",
    labelA: false, labelB: false, textA: "", textB: "", application: "", notes: "",
  };
}

export const endConnection = (end: FlangedEnd): AssemblyConnection => end.connection || "翻边";
/** Published assembly material pages and the tube catalogs specify FEP/PTFE/PFA.
 * PFA has only three OD 1.6 mm rows. Every row still needs matching end hardware;
 * the other raw tube catalogs do not imply fitting/process approval. */
export const assemblyVerifiedTubeMaterials = ["FEP","PTFE","PFA"] as const;
export function compatibleAssemblyTubes(value: FlangedTubingChoice) {
  const ends=value.mode==="double"?[value.a,value.b]:[value.a];
  return assemblyTubes.filter(tube => assemblyVerifiedTubeMaterials.some(material=>material===tube.material) && ends.every(end => {
    const rows=compatibleAssemblyFittings(tube.outer,{connection:endConnection(end),
      ...(end.series?{family:canonicalAssemblySeries(end.series)}:{}),...(end.thread?{thread:end.thread}:{}),
      ...(end.material?{material:end.material}:{}),...(end.color?{color:end.color}:{})});
    return rows.some(f=>assemblyFittingAccessories(f,endConnection(end),tube.outer).length>0);
  }));
}
// Retained only to recognize historical shortened series names.
export const legacyFlangedOuterDiameters = [...new Set(flangedFepTubes.map(t => t.outer))];
export const isLegacyFlangedEnd = (end: FlangedEnd) => !end.fittingModel && ["FL", "FL6"].includes(end.series) && endConnection(end) === "翻边";
export const canonicalAssemblySeries = (series: string) => series === "FL" ? "HFL" : series === "FL6" ? "HFL6" : series;
/** HSF and HSF6 are distinct parts, including in historical saved records. */
export function assemblyRingIdentityConflict(end: FlangedEnd) {
  const fitting = getAssemblyFitting(end.fittingModel), series = canonicalAssemblySeries(end.series);
  return Boolean(fitting && [series, fitting.family].every(family => family === "HSF" || family === "HSF6") && series !== fitting.family);
}
function clearAssemblyFitting(end: FlangedEnd): FlangedEnd {
  return { ...end, fittingModel: "", accessoryCode: "", washer: "" };
}
export function selectAssemblyFitting(end: FlangedEnd, model: string, outer: number): FlangedEnd {
  const f = getAssemblyFitting(model);
  if (!f || !f.outerDiameters.includes(outer)) return clearAssemblyFitting(end);
  const connection = f.connections.includes(endConnection(end)) ? endConnection(end) : f.connection;
  const accessories = assemblyFittingAccessories(f, connection, outer);
  const accessory = accessories.find(a => a.productCode === end.accessoryCode) || accessories.find(a => a.material === end.washer) || accessories[0];
  return { ...end, connection, series: f.family, fittingModel: f.model, thread: f.thread, material: f.material, color: f.color,
    accessoryCode: accessory?.productCode || "", washer: accessory?.material || "" };
}
/** Resolve old names without changing their requested port, color or FL6 material. */
export function resolveAssemblyEndAlias(end: FlangedEnd, outer: number): FlangedEnd {
  const series = canonicalAssemblySeries(end.series);
  if (series === end.series || endConnection(end) !== "翻边") return end;
  // FL never exposed material, so its old free-text values were not specifications.
  const material = end.series === "FL" ? "" : end.material.trim();
  const desired = { ...end, series, material, fittingModel: "", accessoryCode: "" };
  const candidates = compatibleAssemblyFittings(outer, { connection: "翻边", family: series, thread: end.thread, color: end.color,
    ...(material ? { material } : {}) });
  return candidates[0] ? selectAssemblyFitting(desired, candidates[0].model, outer) : desired;
}
export type AssemblyEndFinish = Pick<FlangedEnd, "material" | "color">;
/** Material and color are one catalog finish, while the mating thread stays independent. */
export function assemblyEndFinishes(end: FlangedEnd, outer: number): AssemblyEndFinish[] {
  const rows = compatibleAssemblyFittings(outer, { connection: endConnection(end), family: canonicalAssemblySeries(end.series), thread: end.thread });
  return rows.filter((f, index) => rows.findIndex(other => other.material === f.material && other.color === f.color) === index)
    .map(({ material, color }) => ({ material, color }));
}
export function assemblyEndFinishLabel({ material, color }: AssemblyEndFinish): string {
  const displayColor = color === "本色" && !["PEEK", "SUS"].includes(material) ? "白色" : color;
  return `${material}（${displayColor}）`;
}
export function selectAssemblyEndFinish(end: FlangedEnd, finish: AssemblyEndFinish, outer: number): FlangedEnd {
  end = resolveAssemblyEndAlias(end, outer);
  const candidates = compatibleAssemblyFittings(outer, { connection: endConnection(end), family: end.series, thread: end.thread, ...finish });
  const selected = candidates.find(f => f.model === end.fittingModel) || candidates[0];
  return selected ? selectAssemblyFitting(end, selected.model, outer) : clearAssemblyFitting({ ...end, ...finish });
}
export function selectAssemblyEndAttribute(end: FlangedEnd, key: "series" | "thread" | "material" | "color", value: string, outer: number): FlangedEnd {
  end = resolveAssemblyEndAlias(end, outer);
  if (key === "series") value = canonicalAssemblySeries(value);
  const desired = { ...end, [key]: value };
  let candidates = compatibleAssemblyFittings(outer, { connection: endConnection(end), family: desired.series });
  for (const attribute of ["thread", "material", "color"] as const) {
    const exact = candidates.filter(f => f[attribute] === desired[attribute]);
    if (exact.length) candidates = exact;
    else if (attribute === key) return clearAssemblyFitting(desired);
  }
  return candidates[0] ? selectAssemblyFitting(desired, candidates[0].model, outer) : clearAssemblyFitting(desired);
}
/** Changing tubing cannot silently substitute a different mating thread or material. */
export function reconcileAssemblyEnd(end: FlangedEnd, outer: number): FlangedEnd {
  if (assemblyRingIdentityConflict(end)) return clearAssemblyFitting(end);
  const fitting = getAssemblyFitting(end.fittingModel);
  // Preserve unsupported saved connections for correction, not substitution.
  if (fitting && !fitting.connections.includes(endConnection(end))) return { ...end };
  if (canonicalAssemblySeries(end.series) !== end.series) return resolveAssemblyEndAlias(end, outer);
  const candidates = compatibleAssemblyFittings(outer, { connection: endConnection(end), family: end.series });
  const matching = candidates.find(f => f.thread === end.thread && f.material === end.material && f.color === end.color);
  if (matching) return selectAssemblyFitting(end, matching.model, outer);
  const next = clearAssemblyFitting(end);
  if (!candidates.some(f => f.thread === next.thread)) next.thread = "";
  if (!candidates.some(f => f.thread === next.thread && f.material === next.material)) next.material = "";
  if (!candidates.some(f => f.thread === next.thread && f.material === next.material && f.color === next.color)) next.color = "";
  return next;
}
export function selectAssemblyConnection(end: FlangedEnd, connection: AssemblyConnection, outer: number): FlangedEnd {
  const candidates = compatibleAssemblyFittings(outer, { connection });
  const preferredFamily = connection === "卡环" ? "HSF6" : "HFL";
  // A compatible nut may support either a ring kit or a flange washer. Keep
  // that nut and port when only the sealing method changes.
  const selected = candidates.find(f=>f.model===end.fittingModel) || candidates.find(f => f.family === preferredFamily && f.thread === "1/4-28 UNF" && f.color === "本色") || candidates[0];
  return selected ? selectAssemblyFitting({ ...end, connection }, selected.model, outer) : clearAssemblyFitting({ ...end, connection, series: "", thread: "", material: "", color: "" });
}
export function defaultAssemblyChoice(entrySlug: string): FlangedTubingChoice {
  const value = defaultFlangedTubingChoice();
  const preset = getAssemblyEntryPreset(entrySlug);
  if (!preset) throw new Error(`未配置的管组件入口：${entrySlug}`);
  const tube = assemblyTubes.find(t => t.material === preset.material && t.color === preset.color && t.outer === 1.6);
  if (!tube) throw new Error(`当前入口缺少对应管材：${preset.material} · ${preset.color}`);
  value.tubeModel = tube.key;
  value.a = selectAssemblyConnection(value.a, preset.connection, tube.outer); value.b = { ...value.a };
  return value;
}
/** Diameter errors block output. These additional notes cover engineering review. */
export function assemblyCompatibilityWarnings(v: FlangedTubingChoice): string[] {
  const tube = getAssemblyTube(v.tubeModel); if (!tube) return [];
  const ends = v.mode === "double" ? [["A", v.a], ["B", v.b]] as const : [["A", v.a]] as const;
  return ends.flatMap(([side, e]) => {
    const f = getAssemblyFitting(e.fittingModel), accessory = assemblyAccessory(e.fittingModel, e.accessoryCode), connection=endConnection(e);
    return [
      f && !f.outerDiameters.includes(tube.outer) ? `${side} 端 ${f.model} 不适配 OD ${tube.outer} mm，必须重新匹配。` : "",
      f && connection !== "卡环" && (!accessory || !accessory.tubeOuterDiameters.includes(tube.outer)) ? `${side} 端${connection === "翻边" ? "垫片" : "卡箍"}必须与 OD ${tube.outer} mm 配套。` : "",
      f && connection === "卡环" && (!accessory || !accessory.tubeOuterDiameters.includes(tube.outer)) ? `${side} 端卡环压套及密封垫圈的对应规格待补充。` : "",
      f && !f.cadUrl && !f.drawingUrl ? `${side} 端 ${f.model} 的对应外形图纸待补充。` : "",
      !f && !assemblyVerifiedTubeMaterials.some(material => material === tube.material) ? `${side} 端 ${tube.material} 管的${endConnection(e)}连接工艺需确认。` : "",
      f && ["PVC", "TPU", "PEEK"].includes(tube.material) ? `${side} 端 ${tube.material} 管的${f.connection}连接工艺及夹持适配需确认。` : "",
    ].filter(Boolean);
  });
}

export function assemblySizeError(v: FlangedTubingChoice): string | null {
  v = normalizeFlangedChoice(v);
  const tube = getAssemblyTube(v.tubeModel);
  if (!tube) return "请选择有效的管材与管径组合。";
  if (!assemblyVerifiedTubeMaterials.some(material=>material===tube.material)) return "当前管材暂无所选连接方式的配套记录，请选择可配套的管材。";
  const ends = v.mode === "double" ? [["A", v.a], ["B", v.b]] as const : [["A", v.a]] as const;
  for (const [side, end] of ends) {
    const f = getAssemblyFitting(end.fittingModel);
    if (!f || !f.outerDiameters.includes(tube.outer)) return `${side} 端请选择适配管外径 OD ${tube.outer} mm 的接头。`;
    if (!f.connections.includes(endConnection(end))) return `${side} 端 ${f.model} 暂无${endConnection(end)}连接的已确认配套，请重新选择连接方式或接头。`;
    const accessory = assemblyAccessory(end.fittingModel, end.accessoryCode);
    if (!assemblyFittingAccessories(f,endConnection(end),tube.outer).some(a=>a.productCode===accessory?.productCode)) return `${side} 端请选择适配 OD ${tube.outer} mm 的${endConnection(end) === "翻边" ? "垫片" : endConnection(end) === "卡环" ? "卡环套件" : "卡箍"}。`;
  }
  return null;
}

// Hidden controls must never leak previous values into the BOM or request.
export function normalizeFlangedChoice(value: FlangedTubingChoice): FlangedTubingChoice {
  const outer = getAssemblyTube(value.tubeModel)?.outer;
  const end = (e: FlangedEnd): FlangedEnd => {
    if (outer !== undefined) e = resolveAssemblyEndAlias(e, outer);
    // Retain the requested series but clear conflicting hardware. Never turn
    // an HSF choice into HSF6 (or vice versa) from a stale fittingModel.
    if (assemblyRingIdentityConflict(e)) return clearAssemblyFitting(e);
    const f = getAssemblyFitting(e.fittingModel);
    // Reading, copying or validating a saved choice must not change its
    // sealing method or replace an explicitly selected incompatible part.
    if (f && !f.connections.includes(endConnection(e))) return { ...e };
    if (f && outer !== undefined && f.outerDiameters.includes(outer) && e.accessoryCode
      && !assemblyFittingAccessories(f,endConnection(e),outer).some(a=>a.productCode===e.accessoryCode)) return { ...e };
    if (f && outer !== undefined && f.outerDiameters.includes(outer) && (f.connection==="卡环" || f.connections.length>1)) return selectAssemblyFitting(e, f.model, outer);
    return f ? { ...e, connection: f.connections.includes(endConnection(e)) ? endConnection(e) : f.connection, series: f.family, thread: f.thread, material: f.material, color: f.color } : { ...e, material: e.material.trim() };
  };
  return { ...value, a: end(value.a), b: value.mode === "double" ? end(value.b) : defaultFlangedTubingChoice().b,
    length: value.length.trim(), tolerance: value.tolerance.trim(),
    textA: value.labelA ? value.textA.trim() : "", textB: value.labelB ? value.textB.trim() : "",
    freeEnd: value.mode === "single" ? value.freeEnd : "其他",
    freeEndNote: value.mode === "single" ? value.freeEndNote.trim() : "",
    application: value.application.trim(), notes: value.notes.trim(), company: (value.company || "").trim(), contact: (value.contact || "").trim(), customerPart: (value.customerPart || "").trim() };
}

export function validateFlangedChoice(v: FlangedTubingChoice, options: { allowSizeMismatch?: boolean; allowLegacyMaterial?: boolean } = {}): string | null {
  if (!options.allowSizeMismatch && (v.mode === "double" ? [v.a, v.b] : [v.a]).some(assemblyRingIdentityConflict)) return "HSF 与 HSF6 是不同系列，请重新选择对应接头型号。";
  v = normalizeFlangedChoice(v);
  if (!getAssemblyTube(v.tubeModel)) return "请选择有效的管材与管径组合。";
  if (!options.allowSizeMismatch) { const sizeError = assemblySizeError(v); if (sizeError) return sizeError; }
  for (const e of v.mode === "double" ? [v.a, v.b] : [v.a]) {
    const fitting = getAssemblyFitting(e.fittingModel);
    if (e.fittingModel && (!fitting || fitting.family !== e.series || (!options.allowSizeMismatch && !fitting.connections.includes(endConnection(e))))) return "请选择有效的接头型号。";
    if (!e.fittingModel && (!options.allowSizeMismatch || !assemblyFamilies(endConnection(e)).includes(e.series))) return "请选择与管径、螺纹及材质颜色匹配的接头。";
    if (!options.allowSizeMismatch && e.accessoryCode && !assemblyAccessory(e.fittingModel, e.accessoryCode)) return "请选择与接头系列配套的部件。";
  }
  if (!v.length.trim() || !Number.isFinite(Number(v.length)) || Number(v.length) <= 0) return "请填写大于 0 的成品长度（mm）。";
  if (!v.tolerance.trim() || !Number.isFinite(Number(v.tolerance)) || Number(v.tolerance) < 0) return "请填写不小于 0 的长度公差（mm）。";
  if (v.labelA && !v.textA.trim()) return "请填写 A 侧管标文本，或取消该管标。";
  if (v.labelB && !v.textB.trim()) return "请填写 B 侧管标文本，或取消该管标。";
  return null;
}

export function describeFlangedEndFinish(end: FlangedEnd) {
  return [getAssemblyFitting(end.fittingModel)?.material || end.material.trim(), end.color].filter(Boolean).join(" · ");
}

export function describeFlangedEnd(end: FlangedEnd) {
  return end.fittingModel ? `${endConnection(end)} · ${end.fittingModel} · ${describeFlangedEndFinish(end)}` : `${end.series} · ${end.thread} · ${describeFlangedEndFinish(end)}`;
}

export function flangedTubingBom(v: FlangedTubingChoice) {
  v = normalizeFlangedChoice(v);
  const tube = getAssemblyTube(v.tubeModel);
  const rows = [{ part: "管材", specification: `${tube?.material} · ${tube?.color}${tube?.hardness ? ` · 硬度 ${tube.hardness}` : ""} · ${tube?.model} · ID ${tube?.inner ?? "—"} × OD ${tube?.outer ?? "—"} mm · L ${v.length || "待填写"} mm${v.tolerance ? ` ±${v.tolerance} mm` : ""}`, quantity: "1 根" }];
  const ends: [string, FlangedEnd][] = v.mode === "double" ? [["A", v.a], ["B", v.b]] : [["A", v.a]];
  ends.forEach(([side, end]) => {
    rows.push({ part: `${side} 端接头`, specification: describeFlangedEnd(end), quantity: "1 件" });
    const accessory = assemblyAccessory(end.fittingModel, end.accessoryCode);
    if (endConnection(end) === "卡环") rows.push({ part: `${side} 端卡环组件`, specification: accessory ? `${accessory.model} · ${accessory.materialLabel} · OD ${tube?.outer} mm` : `压套及密封垫圈 · 对应规格待补充`, quantity: "1 套" });
    else rows.push({ part: `${side} 端${endConnection(end) === "翻边" ? "垫片" : "卡箍"}`, specification: accessory ? `${accessory.model} · ${accessory.material} · ${accessory.color}` : end.fittingModel ? "型号待确认" : `${end.washer} · 与翻边及端口配套`, quantity: "1 件" });
    if (end.stop !== "无") rows.push({ part: `${side} 侧限位件`, specification: end.stop, quantity: "1 件" });
  });
  if (v.mode === "single") rows.push({ part: "B 端", specification: `自由管端${v.freeEndNote ? ` · ${v.freeEndNote.trim()}` : ""}`, quantity: "—" });
  if (v.labelA) rows.push({ part: "A 侧管标", specification: v.textA.trim() || "文本待填写", quantity: "1 处" });
  if (v.labelB) rows.push({ part: "B 侧管标", specification: v.textB.trim() || "文本待填写", quantity: "1 处" });
  return rows;
}

export function flangedTubingSummary(value: FlangedTubingChoice) {
  const v = normalizeFlangedChoice(value);
  return [`${getAssemblyTube(v.tubeModel)?.material} 管组件 · 定制配置需求`, v.mode === "double" ? "管端形式：双端" : "管端形式：单端（A 端）",
    ...flangedTubingBom(v).map(row => `${row.part}：${row.specification} · ${row.quantity}`),
    v.company ? `公司：${v.company}` : "", v.contact ? `联系人：${v.contact}` : "", v.customerPart ? `客户零件号：${v.customerPart}` : "",
    v.application ? `应用机型：${v.application}` : "", v.notes ? `特殊要求：${v.notes}` : "",
    ...assemblyCompatibilityWarnings(v), "长度测量基准、端口配套及完整装配需按图确认；组件型号及物料编码待确认。"].filter(Boolean).join("\n");
}

// An internal cart identity only; never present this as a manufactured part number.
export function flangedChoiceCartId(choice: FlangedTubingChoice) {
  const text = JSON.stringify(normalizeFlangedChoice(choice));
  return `custom:flanged-fep:${encodeURIComponent(text)}`;
}
