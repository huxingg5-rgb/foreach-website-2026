import products from "./hard-tube-accessory-products.generated.json";
import { HARD_TUBE_ACCESSORY_LOCALES, getHardTubeAccessoryCopy, getHardTubeColorLabel, getHardTubeMaterialLabel, type HardTubeAccessoryLocale } from "./hard-tube-accessories.intl";

export type HardTubeAccessoryChoice = string;
export type HardTubeAccessory = {
  productCode: string;
  model: string;
  kind: "垫片" | "卡箍";
  material: string;
  materialLabel: string;
  color: string;
  tubeOuterDiameters: number[];
  outerDiameter?: number;
  innerDiameter?: number;
  height?: number;
  thickness?: number;
  productCodePending?: boolean;
};
export type HardTubeAccessoryConfig = typeof products[number] & {
  locale: HardTubeAccessoryLocale;
  detailHref: string;
  accessoryKind: "垫片" | "卡箍";
  tubeOuterDiameters: number[];
  accessories: HardTubeAccessory[];
};

// FOREACH A02 Chinese catalog: compatibility pp.8,14–16; SKUs pp.12–13,20.
// CL-0 fits HNF/HNF6; CL-0X fits HN/HN6; CL-0E fits HNE/HNE6.
// The CL-0X heading in the p.16 CL-0 table is a catalog typo: use the
// explicit family tables on p.15 and SKU naming/compatibility on p.20.
const washerRows: [string, string][] = [
  ["809215", "WS-46-18-08-SS-N"], ["809216", "WS-46-18-09-PK-N"], ["809217", "WS-46-18-09-PT-N"],
  ["809221", "WS-46-21-08-SS-N"], ["809222", "WS-46-21-09-PK-N"], ["809223", "WS-46-21-09-PT-N"],
  ["809226", "WS-46-26-08-SS-N"], ["809227", "WS-46-26-09-PK-N"], ["809228", "WS-46-26-09-PT-N"],
  ["809229", "WS-46-33-09-SS-N"], ["809230", "WS-46-33-09-PK-N"],
  ["809233", "WS-51-18-08-SS-N"], ["809234", "WS-51-18-09-PK-N"], ["809235", "WS-51-18-09-PT-N"],
  ["809239", "WS-51-21-08-SS-N"], ["809240", "WS-51-21-09-PK-N"], ["809241", "WS-51-21-09-PT-N"],
  ["809244", "WS-51-26-08-SS-N"], ["809245", "WS-51-26-09-PK-N"], ["809246", "WS-51-26-09-PT-N"],
  ["809247", "WS-51-33-09-SS-N"], ["809248", "WS-51-33-09-PK-N"], ["809249", "WS-51-33-09-PT-N"],
];
const ferruleRows: [string, string][] = [
  ["809731", "CL-0X-16-ET-N"], ["809820", "CL-0X-16-PP-N"],
  ["809734", "CL-0X-20-ET-N"], ["809821", "CL-0X-20-PP-N"],
  ["809735", "CL-0X-25-ET-N"], ["809822", "CL-0X-25-PP-N"],
  ["809736", "CL-0X-30-ET-N"], ["809823", "CL-0X-30-PP-N"],
  ["809780", "CL-0X-32-ET-N"], ["809650", "CL-0X-32-ET-Y"], ["809824", "CL-0X-32-PP-N"],
  ["809201", "CL-0-16-ET-N"], ["809202", "CL-0-16-PP-N"],
  ["809205", "CL-0-20-ET-N"], ["809206", "CL-0-20-PP-N"],
  ["809207", "CL-0-25-ET-N"], ["809208", "CL-0-25-PP-N"],
  ["809209", "CL-0-30-ET-N"], ["809210", "CL-0-30-PP-N"],
  ["809203", "CL-0-32-ET-N"], ["809204", "CL-0-32-PP-N"],
  ["809928", "CL-0E-32-ET-N"],
];
const materials: Record<string, string> = { SS: "SUS", PK: "PEEK", PT: "PTFE", ET: "ETFE", PP: "PP" };
const washerTubeSizes: Record<string, number[]> = { "18": [1.6], "21": [2], "26": [2.5], "33": [3, 3.2] };
// CL-0X geometry dimensions are shared by material variants. These values
// are measured from the supplied compact CAD assets; the bore follows the
// catalog tube OD and is kept separate from the outside diameter.
const ferruleDimensions: Record<string, { outerDiameter: number; height: number }> = {
  "16": { outerDiameter: 4.6, height: 5.6 },
  "20": { outerDiameter: 4.8, height: 4.8 },
  "25": { outerDiameter: 4.8, height: 4.8 },
  "30": { outerDiameter: 4.8, height: 4.8 },
  "32": { outerDiameter: 4.8, height: 4.8 },
};
export const HARD_TUBE_ACCESSORIES: HardTubeAccessory[] = [
  // User approved displaying/ordering this catalog series as WS-27 while its
  // numeric SKU is pending. WS-27 is an internal selection key, not a numeric SKU.
  { productCode: "WS-27", model: "WS-27", productCodePending: true, kind: "垫片", material: "SUS", materialLabel: "SUS 不锈钢", color: "本色", tubeOuterDiameters: [1.6], outerDiameter: 2.7, innerDiameter: 1.9, thickness: 0.8 },
  ...washerRows.map(([productCode, model]): HardTubeAccessory => {
    const [, od, id, thickness, materialCode] = model.split("-");
    const material = materials[materialCode];
    return { productCode, model, kind: "垫片", material, materialLabel: material === "SUS" ? "SUS 不锈钢" : material, color: "本色", tubeOuterDiameters: washerTubeSizes[id], outerDiameter: Number(od) / 10, innerDiameter: Number(id) / 10, thickness: Number(thickness) / 10 };
  }),
  ...ferruleRows.map(([productCode, model]): HardTubeAccessory => {
    const [, , tube, materialCode, color] = model.split("-");
    const material = materials[materialCode];
    const dimensions = ferruleDimensions[tube];
    return { productCode, model, kind: "卡箍", material, materialLabel: material, color: color === "Y" ? "黄色" : "本色", tubeOuterDiameters: [Number(tube) / 10], outerDiameter: dimensions?.outerDiameter, innerDiameter: Number(tube) / 10, height: dimensions?.height };
  }),
];

export const HARD_TUBE_ACCESSORY_CONFIGS: HardTubeAccessoryConfig[] = products.map(product => {
  const [family, thread, tubeCode] = product.model.split("-");
  const accessoryKind = family.startsWith("HF") ? "垫片" : "卡箍";
  const tubeOuterDiameters = /^(HF|HF6)$/.test(family)
    ? tubeCode === "20" ? [1.6, 2] : tubeCode === "32" ? [3, 3.2] : [Number(tubeCode) / 10]
    : /^(HN|HN6)$/.test(family) && tubeCode === "32" ? [2, 2.5, 3, 3.2] : [Number(tubeCode) / 10];
  const prefix = accessoryKind === "垫片"
    ? thread === "M6" ? "WS-46-" : thread === "U28" ? "WS-51-" : "WS-27-"
    : /^(HN|HN6)$/.test(family) ? "CL-0X-" : /^(HNE|HNE6)$/.test(family) ? "CL-0E-" : "CL-0-";
  const accessories = HARD_TUBE_ACCESSORIES.filter(item => (item.model.startsWith(prefix) || (prefix === "WS-27-" && item.model === "WS-27")) && item.tubeOuterDiameters.some(diameter => tubeOuterDiameters.includes(diameter)));
  return { ...product, locale: "zh", detailHref: `/products/fittings/hard-tube-fittings/${product.slug}/`, accessoryKind, tubeOuterDiameters, accessories };
});

export function getHardTubeAccessoryConfig(data: { slug?: string; productCode?: string; productTypeName?: string; seriesName?: string; name?: string; specs?: Array<{ label: string; value: string }> }, locale: string): HardTubeAccessoryConfig | undefined {
  if (!HARD_TUBE_ACCESSORY_LOCALES.includes(locale as HardTubeAccessoryLocale)) return undefined;
  const product = HARD_TUBE_ACCESSORY_CONFIGS.find(product => product.productCode === data.productCode && product.slug === data.slug);
  if (!product) return undefined;
  return { ...product, locale: locale as HardTubeAccessoryLocale,
    detailHref: locale === "zh" ? product.detailHref : `/${locale}${product.detailHref}`,
    // Use the same localized product name already shown in the detail page.
    productName: (locale === "en" ? data.specs?.find(row => row.label === "Product Series")?.value : undefined) || data.seriesName || data.name || data.productTypeName || product.productName,
    color: getHardTubeColorLabel(product.color, locale),
  };
}
export function getHardTubeAccessory(config: HardTubeAccessoryConfig | undefined, choice: HardTubeAccessoryChoice | null) {
  return config?.accessories.find(item => item.productCode === choice);
}
export function formatTubeDiameters(diameters: number[]) {
  return `${diameters.map(value => value.toFixed(1)).join(" / ")} mm`;
}
export function describeHardTubeAccessory(item: HardTubeAccessory, locale = "zh") {
  const copy = getHardTubeAccessoryCopy(locale), material = getHardTubeMaterialLabel(item.material, locale);
  return item.kind === "垫片"
    ? `${material} · ${copy.thickness} ${item.thickness} mm`
    : `${material} · ${getHardTubeColorLabel(item.color, locale)} · ${copy.tubeFit} ${formatTubeDiameters(item.tubeOuterDiameters)}`;
}

export function hardTubeProductCodeText(item: { productCode: string; foreachModel?: string; model?: string }, pendingLabel = "待确认") {
  return item.productCode === "WS-27" && (item.foreachModel || item.model) === "WS-27" ? pendingLabel : item.productCode;
}

export function normalizeHardTubeDetailHref(href = "") {
  return href.replace(/^\/(en|es|fr|ko|ru)(?=\/products\/fittings\/hard-tube-fittings\/)/, "");
}

// Allow only an exact catalog accessory, paired with a compatible localized
// detail URL. Unpublished unrelated fittings must not pass this exception.
export function isHardTubeAccessoryCartItem(item: { sourceType: string; productCode: string; foreachModel?: string; detailHref?: string }) {
  if (item.sourceType !== "pump-selection") return false;
  const config = HARD_TUBE_ACCESSORY_CONFIGS.find(product => product.detailHref === normalizeHardTubeDetailHref(item.detailHref));
  return Boolean(config?.accessories.some(accessory => accessory.productCode === item.productCode && accessory.model === item.foreachModel));
}
