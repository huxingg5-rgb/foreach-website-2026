import { normalizeDrawingTypes, type CadDrawingType } from "@/data/products/detail/drawing-requirements";
import { defaultFlangedTubingChoice, normalizeFlangedChoice, validateFlangedChoice, type FlangedTubingChoice } from "./flanged-tubing";

export const FLANGED_CONFIGURATION_STORAGE_KEY = "foreach:flanged-tubing-configurations:v1";
export type FlangedConfiguration = {
  id: string; number: number; name: string; revision: number;
  createdAt: string; updatedAt: string; choice: FlangedTubingChoice; drawingTypes?: CadDrawingType[];
};
export type FlangedConfigurationStore = { version: 1; nextNumber: number; activeId: string | null; configurations: FlangedConfiguration[] };
export const emptyFlangedConfigurationStore = (): FlangedConfigurationStore => ({ version: 1, nextNumber: 1, activeId: null, configurations: [] });

function validChoice(value: unknown, readExisting = false): value is FlangedTubingChoice {
  if (!value || typeof value !== "object") return false;
  const v = value as FlangedTubingChoice, defaults = defaultFlangedTubingChoice();
  for (const key of Object.keys(defaults) as (keyof FlangedTubingChoice)[]) {
    if (key === "a" || key === "b") continue;
    if (typeof v[key] !== typeof defaults[key]) return false;
  }
  if (!["single", "double"].includes(v.mode) || !["卡箍", "针", "其他"].includes(v.freeEnd)) return false;
  for (const end of [v.a, v.b]) {
    if (!end || typeof end.series !== "string" || typeof end.thread !== "string" ||
      typeof end.material !== "string" || end.material.length > 40 || typeof end.color !== "string" ||
      typeof end.washer !== "string" || !["无", "O 型圈", "硅胶管"].includes(end.stop)) return false;
    if (end.connection !== undefined && !["翻边", "卡箍", "卡环"].includes(end.connection)) return false;
    for (const key of ["fittingModel", "accessoryCode"] as const) if (end[key] !== undefined && (typeof end[key] !== "string" || end[key]!.length > 80)) return false;
    if (!end.fittingModel && !readExisting) return false;
  }
  if (v.textA.length > 80 || v.textB.length > 80 || v.notes.length > 800 || v.application.length > 120 || v.freeEndNote.length > 300) return false;
  for (const key of ["company", "contact", "customerPart"] as const) if (v[key] !== undefined && (typeof v[key] !== "string" || v[key]!.length > 120)) return false;
  // Retain historical size/material mistakes for editing; all new outputs use
  // strict validation rather than silently discarding these saved records.
  return !validateFlangedChoice(normalizeFlangedChoice(v), { allowSizeMismatch: readExisting, allowLegacyMaterial: readExisting });
}

export function parseFlangedConfigurationStore(raw: string | null): FlangedConfigurationStore {
  if (!raw) return emptyFlangedConfigurationStore();
  const value = JSON.parse(raw) as FlangedConfigurationStore;
  if (value.version !== 1 || !Array.isArray(value.configurations) || value.configurations.length > 100 ||
      !Number.isInteger(value.nextNumber) || value.nextNumber < 1) throw new Error("配置文件格式不正确。");
  const ids = new Set<string>();
  for (const record of value.configurations) {
    if (!record || typeof record.id !== "string" || !/^[a-zA-Z0-9-]{1,80}$/.test(record.id) || ids.has(record.id) ||
        !Number.isInteger(record.number) || record.number < 1 || !Number.isInteger(record.revision) || record.revision < 1 ||
        typeof record.name !== "string" || !record.name.trim() || record.name.length > 40 ||
        !Number.isFinite(Date.parse(record.createdAt)) || !Number.isFinite(Date.parse(record.updatedAt)) || !validChoice(record.choice, true)) throw new Error("已保存配置无法完整读取，请先导出备份后检查。");
    if (record.drawingTypes !== undefined) record.drawingTypes = normalizeDrawingTypes(record.drawingTypes);
    ids.add(record.id);
  }
  return { ...value, activeId: ids.has(value.activeId || "") ? value.activeId : value.configurations[0]?.id || null,
    nextNumber: Math.max(value.nextNumber, ...value.configurations.map(r => r.number + 1), 1) };
}

export function saveFlangedConfiguration(store: FlangedConfigurationStore, choice: FlangedTubingChoice, name: string, editingId: string | null, now = new Date().toISOString(), newId = crypto.randomUUID(), drawings?: CadDrawingType[]): { store: FlangedConfigurationStore; record: FlangedConfiguration } {
  const normalized = normalizeFlangedChoice(choice);
  if (!validChoice(normalized)) throw new Error(validateFlangedChoice(normalized) || "配置参数不完整。");
  if (!name.trim() || name.trim().length > 40) throw new Error("请填写 1-40 字的配置名称。");
  const old = store.configurations.find(r => r.id === editingId);
  if (editingId && !old) throw new Error("此配置已被删除，请关闭后重新创建配置。");
  if (!old && store.configurations.length >= 100) throw new Error("最多可保存 100 个配置，请先导出备份。");
  const drawingTypes = normalizeDrawingTypes(drawings ?? old?.drawingTypes);
  const changed = !old || old.name !== name.trim() || JSON.stringify(old.choice) !== JSON.stringify(normalized) || JSON.stringify(old.drawingTypes || []) !== JSON.stringify(drawingTypes);
  const record: FlangedConfiguration = { id: old?.id || newId, number: old?.number || store.nextNumber, name: name.trim(),
    revision: old ? old.revision + (changed ? 1 : 0) : 1, createdAt: old?.createdAt || now, updatedAt: changed ? now : old!.updatedAt, choice: normalized, drawingTypes };
  return { record, store: { version: 1, nextNumber: old ? store.nextNumber : store.nextNumber + 1, activeId: record.id,
    configurations: old ? store.configurations.map(r => r.id === old.id ? record : r) : [...store.configurations, record] } };
}

export function deleteFlangedConfiguration(store: FlangedConfigurationStore, id: string, expectedRevision: number): FlangedConfigurationStore {
  const record = store.configurations.find(item => item.id === id);
  if (!record) return store;
  if (record.revision !== expectedRevision) throw new Error("此配置已在其他窗口更新，请刷新页面后再删除。");
  const configurations = store.configurations.filter(item => item.id !== id);
  return { ...store, configurations,
    activeId: configurations.some(item => item.id === store.activeId) ? store.activeId : configurations[0]?.id || null };
}

/** Installation details still require the assembly's engineering specification. */
export function flangedDrawingMissingItems(choice: FlangedTubingChoice) {
  const ends = choice.mode === "double" ? [["A", choice.a], ["B", choice.b]] as const : [["A", choice.a]] as const;
  return [
    ...ends.map(([side, end]) => `${side} 端 ${end.series} / ${end.thread} 正式零件图：外形、螺纹长度、通孔、尺寸公差与版本`),
    "管端翻边外径、厚度及端面要求；支撑垫片的内径、外径、厚度及公差",
    ...(ends.some(([, end]) => end.stop !== "无") ? ["限位件规格、轴向安装位置及位置公差"] : []),
    ...(choice.labelA || choice.labelB ? ["管标轴向位置、长度及标识工艺"] : []),
    "成品长度测量基准、检验要求、工程审核与批准",
  ];
}
