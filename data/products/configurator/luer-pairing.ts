import { FITTING_PUBLISHED_PRODUCTS, type PublishedFittingProduct } from "@/data/products/selection/fitting-publication.generated";
import { getLuerCadAssets } from "@/data/products/detail/luer-cad-assets";
import previewAssets from "./luer-preview-assets.json";
import { getLuerRole, isLuerCombination, type LuerRole } from "./luer-combination";

export const LUER_PAIR_PILOT_MODEL = "LPS-16-PP-O";
export type LuerPart = {
  model: string; productCode: string; family: string; name: string; tube: string;
  material: string; color: string; colorCode: string; imagePath: string;
  previewImagePath: string | null; detailHref: string; drawingHref: string | null;
};
export type LuerPairChoice = { mode: "single" } | { mode: "core"; maleModel?: string | null; collarModel: string | null } | {
  mode: "pair"; maleModel: string | null; femaleModel: string | null;
  collarModel: string | null; ringModel: string | null; nutModel: string | null;
};
export type LuerCombinationType = "single" | "core" | "panel" | "inline" | "plug";
export type LuerPairConfig = {
  base: LuerPart; baseRole: LuerRole; males: LuerPart[]; females: LuerPart[];
  mates: LuerPart[]; collars: LuerPart[]; rings: LuerPart[]; nuts: LuerPart[];
  allowCoreAssembly: boolean; unifiedSelection: boolean; defaultChoice: LuerPairChoice;
  combinationTypes: LuerCombinationType[];
  defaultPairChoice: Extract<LuerPairChoice, { mode: "pair" }>;
  defaultRing: string; defaultNut: string;
};
const names: Record<string, string> = {
  LPS: "固定锁圈公鲁尔", LPR: "旋转锁圈公鲁尔", LP: "一体式公鲁尔",
  LSL: "固定式公鲁尔芯子", LRL: "旋转式公鲁尔芯子", LS: "普通母鲁尔", PMLS: "穿板母鲁尔",
  LPT: "鲁尔锁圈", LCR: "识别色环", LNS: "固定螺母", LPBL: "公鲁尔堵头",
};
export const LUER_COLOR_NAMES: Record<string, string> = {
  N: "本色", W: "白色", B: "黑色", R: "红色", G: "绿色", U: "蓝色", O: "橙色", Y: "黄色",
};
const colorOrder = ["R", "G", "U", "O", "Y", "B", "W", "N"];
const previews = previewAssets.products as Record<string, { url: string }>;
function toPart(row: PublishedFittingProduct): LuerPart {
  const fields = row.foreachModel.split("-"), family = fields[0], cad = getLuerCadAssets(row.foreachModel);
  const preview = previews[row.foreachModel]?.url || null;
  return {
    model: row.foreachModel, productCode: row.productCode, family, name: names[family],
    tube: ["LPS", "LPR", "LP", "LSL", "LRL", "LS", "PMLS"].includes(family) ? (parseInt(fields.at(-3)!, 10) / 10).toFixed(1) : "",
    material: fields.at(-2)!, color: LUER_COLOR_NAMES[fields.at(-1)!], colorCode: fields.at(-1)!,
    imagePath: preview || row.imageCard, previewImagePath: preview,
    detailHref: row.detailHref, drawingHref: cad?.drawingPdfUrl || null,
  };
}
const published = FITTING_PUBLISHED_PRODUCTS.filter(p => p.productTypeId === "luer-fittings").map(toPart);
const sortedAccessories = (family: string) => published.filter(p => p.family === family).sort((a, b) =>
  colorOrder.indexOf(a.colorCode) - colorOrder.indexOf(b.colorCode));
function preferred(parts: LuerPart[], base: LuerPart, family?: string) {
  const score = (p: LuerPart) => (p.family === family ? 100 : 0) + (p.tube === (base.tube || "1.6") ? 20 : 0)
    + (p.material === base.material ? 5 : 0) + (p.colorCode === base.colorCode ? 2 : 0);
  return [...parts].sort((a, b) => score(b) - score(a))[0];
}

export function getLuerPairConfig(data: { model?: string; foreachModel?: string; productTypeId?: string }, locale: string): LuerPairConfig | undefined {
  if (!["zh", "zh-CN", "en", "es", "fr", "ko", "ru"].includes(locale) || data.productTypeId !== "luer-fittings") return undefined;
  const model = String(data.foreachModel || data.model || "").trim().toUpperCase();
  const base = published.find(p => p.model === model);
  if (!base) return undefined;
  const baseRole = getLuerRole(base.family);
  const males = ["male", "core", "plug"].includes(baseRole) ? [base]
    : baseRole === "collar" ? published.filter(p => getLuerRole(p.family) === "core")
    : published.filter(p => getLuerRole(p.family) === "male" || (["female", "ring", "nut"].includes(baseRole) && p.family === "LPBL"));
  const females = baseRole === "female" ? [base] : published.filter(p =>
    ["ring", "nut"].includes(baseRole) ? p.family === "PMLS" : getLuerRole(p.family) === "female");
  const collars = sortedAccessories("LPT"), rings = sortedAccessories("LCR"), nuts = sortedAccessories("LNS");
  const male = preferred(males, base, baseRole === "collar" ? "LRL" : "LPR");
  const female = preferred(females, base, baseRole === "plug" ? "LS" : "PMLS");
  const defaultRing = (baseRole === "ring" ? base : rings.find(p => p.colorCode === base.colorCode) || preferred(rings, base)).model;
  const defaultNut = (baseRole === "nut" ? base : nuts.find(p => p.model === "LNS-U28-PP-N")!).model;
  const defaultPairChoice: LuerPairConfig["defaultPairChoice"] = {mode: "pair", maleModel: male.model, femaleModel: female.model,
    collarModel: getLuerRole(male.family) === "core" ? (baseRole === "collar" ? base : preferred(collars, base)).model : null,
    ringModel: female.family === "PMLS" ? defaultRing : null, nutModel: female.family === "PMLS" ? defaultNut : null};
  // Every core can be purchased with only its collar. Keep the established
  // default selection and presentation for the other core detail pages.
  const allowCoreAssembly = baseRole === "core" || baseRole === "collar";
  const unifiedSelection = model === "LSL-16-PP-N" || ["collar", "ring", "nut"].includes(baseRole);
  const combinationTypes: LuerCombinationType[] = ["single"];
  if (allowCoreAssembly) combinationTypes.push("core");
  if (females.some(p => p.family === "PMLS")) combinationTypes.push("panel");
  if (females.some(p => p.family === "LS")) combinationTypes.push("inline");
  if (males.some(p => p.family === "LPBL")) combinationTypes.push("plug");
  const defaultChoice: LuerPairChoice = unifiedSelection ? {mode: "single"} : defaultPairChoice;
  const config: LuerPairConfig = {base, baseRole, males, females, mates: baseRole === "female" ? males : females,
    collars, rings, nuts, allowCoreAssembly, unifiedSelection, combinationTypes, defaultChoice, defaultPairChoice, defaultRing, defaultNut};
  return resolveLuerPair(config, defaultChoice) ? config : undefined;
}

/** A02 p58: LPBL seals a female Luer port; it replaces the flowing male end. */
export function getLuerPlugChoice(config: LuerPairConfig): Extract<LuerPairChoice, { mode: "pair" }> | null {
  const plug = preferred(config.males.filter(p => p.family === "LPBL"), config.base);
  return plug ? { ...config.defaultPairChoice, maleModel: plug.model, collarModel: null } : null;
}

/** The current page's SKU remains the primary item, even when it is an accessory. */
export function resolveLuerPair(config: LuerPairConfig, choice: LuerPairChoice): LuerPart[] | null {
  if (choice.mode === "single") return [config.base];
  if (choice.mode === "core") {
    if (!config.allowCoreAssembly) return null;
    const core = config.males.find(p => p.model === (choice.maleModel === undefined && config.baseRole === "core" ? config.base.model : choice.maleModel));
    const collar = config.collars.find(p => p.model === choice.collarModel);
    if (!core || !collar) return null;
    const parts = [core, collar];
    return parts.some(p => p.model === config.base.model) && isLuerCombination(parts)
      ? [config.base, ...parts.filter(p => p.model !== config.base.model)] : null;
  }
  const male = config.males.find(p => p.model === choice.maleModel);
  const female = config.females.find(p => p.model === choice.femaleModel);
  if (!male || !female) return null;
  const parts = [male, female];
  for (const [model, options] of [[choice.collarModel, config.collars], [choice.ringModel, config.rings], [choice.nutModel, config.nuts]] as const) {
    if (!model) continue;
    const part = options.find(p => p.model === model);
    if (!part) return null;
    parts.push(part);
  }
  if (!parts.some(p => p.model === config.base.model) || !isLuerCombination(parts)) return null;
  if (config.unifiedSelection && config.baseRole === "core") return [config.base,
    ...parts.filter(p => p.family === "LPT"),
    ...parts.filter(p => p.model !== config.base.model && p.family !== "LPT")];
  return [config.base, ...parts.filter(p => p.model !== config.base.model)];
}

export function describeLuerPart(part: LuerPart): string {
  return [part.name, part.tube ? `${part.tube} mm 内径软管` : "", part.material, part.color].filter(Boolean).join(" · ");
}
