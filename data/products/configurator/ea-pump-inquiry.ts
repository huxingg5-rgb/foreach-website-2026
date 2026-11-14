import { pistonText } from "../detail/piston-pump-ui.intl";
import { pistonPumpGuides, type PistonSeries } from "../detail/piston-pump-guide.zh";
import { pumpSeriesRoutes } from "../generated/pumps/pump-series.routes.generated";
import { pumpSeriesSelectionCards } from "../generated/pumps/pump-series.selection.generated";

/** Options express quotation requirements, not confirmed orderable SKUs. */
export const EA_INQUIRY_PILOT_SLUG = "ea-500-pmma";
export const EA_INQUIRY_REFERENCE_MODEL = "EA-500-PMMA";

// Reuse the published routes and the same capacity/drive data as the detail pages.
export const pistonInquiryProducts = pistonPumpGuides.flatMap(guide => {
  const route = pumpSeriesRoutes.find(item => item.routeSlug === guide.slug);
  if (!route?.detailHref) return [];
  const card = pumpSeriesSelectionCards.find(item => item.productId === route.productId);
  return [{ slug: guide.slug, model: guide.model, series: guide.series, capacityUl: guide.capacity, headMaterial: guide.material,
    detailHref: route.detailHref, productId: route.productId, imagePath: card?.cardImage || "", drives: guide.drives }];
});
export const eaInquiryProducts = pistonInquiryProducts.filter(product => product.series === "EA");
export const eaCapacities: ReadonlyArray<readonly [string, string]> = [
  ...Array.from(new Set(eaInquiryProducts.map(product => product.capacityUl))).sort((a, b) => a - b)
    .map(capacity => [String(capacity), `${capacity} μL`] as const),
  ["unsure", "待确认，请协助选择容量"], ["other", "其他，自行填写"],
];
export function getEaInquiryProduct(slug: string | undefined) {
  return pistonInquiryProducts.find(product => product.slug === slug);
}

export const eaHeadMaterials = [
  ["PMMA", "PMMA（聚甲基丙烯酸甲酯）"], ["PEEK", "PEEK（聚醚醚酮）"],
  ["PCTG", "PCTG（共聚聚酯）"], ["PSU", "PSU（聚砜）"],
  ["PVDF", "PVDF（聚偏二氟乙烯）"], ["PPS", "PPS（聚苯硫醚）"],
  ["POM", "POM（聚甲醛）"], ["PET", "PET（聚对苯二甲酸乙二醇酯）"],
  ["unsure", "待确认，请协助选材"], ["other", "其他，自行填写"],
] as const;
export const eaIntegrations = [
  ["EA", "单泵（EA）"], ["EAV", "泵阀一体（EAV）"],
  ["EAD", "泵与控制器一体（EAD）"], ["EAVD", "泵阀控制器一体（EAVD）"],
  ["unsure", "待确认，请协助选型"], ["other", "其他，自行填写"],
] as const;
export const eaOptocouplers = [
  ["unsure", "待确认，请协助匹配"], ["three", "3 线式光耦"],
  ["four", "4 线式光耦"], ["five", "5 线式光耦"],
  ["none", "不需要光耦"], ["other", "其他，自行填写"],
] as const;
export const eaPorts = [["unf", "1/4-28 UNF 平底接口"], ["m6", "M6"], ["unsure", "待确认"], ["other", "其他，自行填写"]] as const;
export const eaMotors = [["1.8", "1.8°"], ["0.9", "0.9°"], ["unsure", "待确认"], ["other", "其他，自行填写"]] as const;
export const eaCommunications = [["unsure", "待确认"], ["rs232", "RS-232"], ["rs485", "RS-485"], ["can", "CAN"], ["other", "其他，自行填写"]] as const;

export type EaPumpInquiryChoice = {
  /** Absent in existing EA drafts and cart entries. Keep their identity when restoring. */
  series?: PistonSeries;
  capacity: string; customCapacity: string;
  headMaterial: string; customHeadMaterial: string;
  integration: string; customIntegration: string;
  optocoupler: string; customOptocoupler: string;
  port: string; customPort: string;
  motor: string; customMotor: string;
  communication: string; customCommunication: string;
  valveRequirements: string;
  requirements: string;
};
type LegacyEaPumpInquiryConfiguration = {
  version: 1;
  referenceModel: typeof EA_INQUIRY_REFERENCE_MODEL;
  capacityUl: 500;
  choice: Omit<EaPumpInquiryChoice, "capacity" | "customCapacity">;
};
export type EaPumpInquiryConfigurationV2 = {
  version: 2;
  referenceModel: string;
  capacityUl: number | null;
  choice: EaPumpInquiryChoice;
};
export type EaPumpInquiryConfiguration = LegacyEaPumpInquiryConfiguration | EaPumpInquiryConfigurationV2;
export const defaultEaPumpInquiryChoice: EaPumpInquiryChoice = {
  series: "EA",
  capacity: "500", customCapacity: "",
  headMaterial: "PMMA", customHeadMaterial: "", integration: "EA", customIntegration: "",
  optocoupler: "unsure", customOptocoupler: "", port: "unf", customPort: "",
  motor: "1.8", customMotor: "", communication: "unsure", customCommunication: "",
  valveRequirements: "", requirements: "",
};
export const getPistonInquirySeries = (choice: Partial<EaPumpInquiryChoice>): PistonSeries =>
  choice.series === "SM" || choice.series === "TM" ? choice.series : "EA";
export const eaHasController = (choice: EaPumpInquiryChoice) => getPistonInquirySeries(choice) === "EA"
  ? ["EAD", "EAVD"].includes(choice.integration)
  : getPistonInquirySeries(choice) === "SM" && ["SMVD", "sm-driver"].includes(choice.integration);
export const eaHasValve = (choice: EaPumpInquiryChoice) => getPistonInquirySeries(choice) === "EA"
  ? ["EAV", "EAVD"].includes(choice.integration)
  : getPistonInquirySeries(choice) === "SM" && ["SMVD", "sm-valve"].includes(choice.integration);

type Options = ReadonlyArray<readonly [string, string]>;
const optional: Options = [["unsure", "待确认"], ["other", "其他，自行填写"]];
const smIntegrations: Options = [
  ["SM", "单泵（SM）"], ["sm-valve", "集成阀配置（需确认）"],
  ["sm-driver", "集成驱动器配置（需确认）"], ["SMVD", "泵阀控制器一体（SMVD）"], ...optional,
];

/**
 * EA: PS-120B-035 A46 / PS-120B-152 A00.
 * SM: PS-120B-013 001 p8; SM 50: PS-120B-030 001 pp2–6 (checked configuration vs alternatives).
 * SMVD: UM-120B-00011 001. TM: PS-120B-147/148/149/150 001, one page each.
 * These are inquiry choices; alternate combinations still require technical confirmation.
 */
export function getPistonInquiryOptions(choice: Partial<EaPumpInquiryChoice>) {
  const series = getPistonInquirySeries(choice);
  const sm50 = series === "SM" && choice.capacity === "50";
  const capacities: Options = [
    ...Array.from(new Set(pistonInquiryProducts.filter(product => product.series === series).map(product => product.capacityUl)))
      .sort((a, b) => a - b).map(capacity => [String(capacity), `${capacity} μL`] as const),
    ["unsure", "待确认，请协助选择容量"], ["other", "其他，自行填写"],
  ];
  const materialCodes = series === "EA" ? ["PMMA", "PEEK", "PCTG", "PSU", "PVDF", "PPS", "POM", "PET"]
    : series === "TM" ? ["PMMA"] : sm50 ? ["PMMA", "PEEK", "PCTG", "PPS", "POM", "PVDF", "PET"] : ["PMMA", "PEEK", "PSU", "POM"];
  return {
    series, capacities,
    headMaterials: eaHeadMaterials.filter(([code]) => materialCodes.includes(code) || code === "unsure" || code === "other"),
    integrations: series === "EA" ? eaIntegrations : series === "SM" ? smIntegrations : [["TM", "单泵（TM）"], ...optional] as Options,
    optocouplers: series === "TM" ? [["tm-akec", "A / K / E / C 光耦"], ...optional] as Options : eaOptocouplers,
    ports: series === "TM" ? [["6-40", "6-40 UNF 接口"], ...optional] as Options
      : sm50 ? [["m6", "M6 平底接口"], ...optional] as Options : eaPorts,
    motorLabel: series === "SM" ? "满行程步数" : "电机步距角",
    note: series === "TM"
      ? "TM 使用 6-40 UNF 接口，1.8° 电机满行程为 2540 步。光耦按 A / K / E / C 接线，限流与上拉电阻需外接；阀与控制器按整机需求另行配套，可在补充需求中填写。"
      : sm50 ? "SM 50 μL 当前配置为 M6 接口、2000 步满行程和 4 线式光耦。其他材质、行程和集成配置需确认，不能仅按步数推定电机版本。"
      : series === "SM" ? "SM 按满行程步数选择运动配置，电机版本与驱动电流另行核对。SMVD 及集成驱动器的通信接口需按配套版本确认。" : "",
  };
}

const dimensions = [
  ["capacity", "customCapacity", "标称容量", eaCapacities],
  ["headMaterial", "customHeadMaterial", "泵头材质", eaHeadMaterials],
  ["integration", "customIntegration", "配置形式", eaIntegrations],
  ["optocoupler", "customOptocoupler", "光耦", eaOptocouplers],
  ["port", "customPort", "液路接口", eaPorts],
  ["motor", "customMotor", "电机步距角", eaMotors],
  ["communication", "customCommunication", "通信接口", eaCommunications],
] as const;

function getDimensions(choice: EaPumpInquiryChoice) {
  const options = getPistonInquiryOptions(choice);
  return dimensions.map(([key, customKey, label, original]) => {
    const values = key === "capacity" ? options.capacities : key === "headMaterial" ? options.headMaterials
      : key === "integration" ? options.integrations : key === "optocoupler" ? options.optocouplers
      : key === "port" ? options.ports : key === "motor" ? getEaMotorOptions(choice) : original;
    return [key, customKey, key === "motor" ? options.motorLabel : label, values] as const;
  });
}

export function getEaPumpInquiryDefaults(slug: string): EaPumpInquiryChoice {
  const product = getEaInquiryProduct(slug);
  if (!product) return { ...defaultEaPumpInquiryChoice };
  return { ...defaultEaPumpInquiryChoice, series: product.series, capacity: String(product.capacityUl), headMaterial: product.headMaterial,
    integration: product.series, motor: product.series === "SM" ? "2000" : "1.8",
    port: product.series === "TM" ? "6-40" : product.series === "SM" && product.capacityUl === 50 ? "m6" : "unf",
    optocoupler: product.series === "TM" ? "tm-akec" : product.series === "SM" && product.capacityUl === 50 ? "four" : "unsure" };
}

export function getEaMotorOptions(choice: Pick<EaPumpInquiryChoice, "capacity" | "series">): Options {
  const series = getPistonInquirySeries(choice);
  const product = pistonInquiryProducts.find(item => item.series === series && String(item.capacityUl) === choice.capacity);
  if (series === "SM") {
    const steps = product ? choice.capacity === "50" ? [1400, 2000, 2400, 4000] : [2000, 2400, 4000] : [];
    return [...steps.map(value => [String(value), `${value} 步 / 满行程`] as const), ...optional];
  }
  return [
    ...(product?.drives.map(drive => [drive.label.replace("°", ""), `${drive.label}（满行程 ${drive.fullSteps} 步）`] as const) || []),
    ["unsure", "待确认"], ["other", "其他，自行填写"],
  ];
}

export function normalizeEaPumpInquiryChoice(choice: Partial<EaPumpInquiryChoice>): EaPumpInquiryChoice {
  const result = { ...defaultEaPumpInquiryChoice, ...choice, series: getPistonInquirySeries(choice) };
  for (const [key, customKey, , options] of getDimensions(result)) {
    if (!options.some(([value]) => value === result[key])) result[key] = "unsure";
    result[customKey] = result[key] === "other" ? String(result[customKey] || "").trim().slice(0, 160) : "";
  }
  if (!getEaMotorOptions(result).some(([value]) => value === result.motor)) result.motor = "unsure";
  if (result.motor !== "other") result.customMotor = "";
  if (!eaHasController(result)) { result.communication = "unsure"; result.customCommunication = ""; }
  result.valveRequirements = eaHasValve(result) ? String(result.valveRequirements || "").trim().slice(0, 500) : "";
  result.requirements = String(result.requirements || "").trim().slice(0, 2000);
  return result;
}

export function validateEaPumpInquiry(choice: Partial<EaPumpInquiryChoice>, quantity: number) {
  if (!Number.isSafeInteger(quantity) || quantity < 1 || quantity > 1000000) return "请填写 1～1,000,000 的整数数量。";
  const normalized = normalizeEaPumpInquiryChoice(choice);
  for (const [key, customKey, label] of getDimensions(normalized)) {
    if (key === "communication" && !eaHasController(normalized)) continue;
    if (choice[key] === "other" && !choice[customKey]?.trim()) return `请填写${label}的具体要求，或选择“待确认”。`;
  }
  return "";
}

/** An exact published page requires capacity, material and the single-pump form to match. */
export function getEaPumpInquiryTarget(choice: Partial<EaPumpInquiryChoice>) {
  const selected = normalizeEaPumpInquiryChoice(choice);
  const series = getPistonInquirySeries(selected);
  if (selected.integration !== series) return undefined;
  return pistonInquiryProducts.find(product => product.series === series && String(product.capacityUl) === selected.capacity && product.headMaterial === selected.headMaterial);
}

export function createEaPumpInquiryConfiguration(choice: Partial<EaPumpInquiryChoice>): EaPumpInquiryConfigurationV2 {
  const selected = normalizeEaPumpInquiryChoice(choice);
  const product = getEaPumpInquiryTarget(selected);
  const series = getPistonInquirySeries(selected);
  const capacity = pistonInquiryProducts.find(item => item.series === series && String(item.capacityUl) === selected.capacity)?.capacityUl ?? null;
  return { version: 2, referenceModel: product?.model || `${series} 系列（配置待确认）`, capacityUl: capacity, choice: selected };
}

export function eaPumpInquiryCapacityLabel(configuration: EaPumpInquiryConfiguration) {
  const choice = normalizeEaPumpInquiryChoice(configuration.choice);
  return choice.capacity === "other" ? choice.customCapacity || "自定义容量待填写"
    : getPistonInquiryOptions(choice).capacities.find(([value]) => value === choice.capacity)?.[1] || "待确认";
}

export function eaPumpInquiryRows(configuration: EaPumpInquiryConfiguration, locale = "zh"): Array<[string, string]> {
  const choice = normalizeEaPumpInquiryChoice(configuration.choice);
  const rows: Array<[string, string]> = [[pistonText("参考型号", locale), pistonText(createEaPumpInquiryConfiguration(choice).referenceModel, locale)]];
  for (const [key, customKey, label, options] of getDimensions(choice)) {
    if (key === "communication" && !eaHasController(choice)) continue;
    const activeOptions = key === "motor" ? getEaMotorOptions(choice) : options;
    rows.push([pistonText(label, locale), choice[key] === "other" ? choice[customKey] || pistonText("自定义要求待填写", locale) : pistonText(activeOptions.find(([value]) => value === choice[key])?.[1] || "待确认", locale)]);
  }
  if (eaHasValve(choice) && choice.valveRequirements) rows.push([pistonText("阀路要求", locale), choice.valveRequirements]);
  if (choice.requirements) rows.push([pistonText("补充需求", locale), choice.requirements]);
  return rows;
}

export function eaPumpInquirySummary(configuration: EaPumpInquiryConfiguration, locale = "zh") {
  return [pistonText(`${getPistonInquirySeries(configuration.choice)} 柱塞泵配置需求（待技术确认）`, locale), ...eaPumpInquiryRows(configuration, locale).map(([key, value]) => `${key}${locale === "zh" ? "：" : ": "}${value}`)].join("\n");
}

/** Includes custom requirements; differing configurations must not merge into one cart item. */
export function eaPumpInquiryCartId(configuration: EaPumpInquiryConfiguration) {
  // Fixed field order also gives legacy EA-500 entries the same identity as new selections.
  const choice = normalizeEaPumpInquiryChoice(configuration.choice);
  const identity = JSON.stringify([...dimensions.flatMap(([key, customKey]) => [choice[key], choice[customKey]]), choice.valveRequirements, choice.requirements]);
  let a = 2166136261, b = 5381;
  for (let index = 0; index < identity.length; index++) {
    a = Math.imul(a ^ identity.charCodeAt(index), 16777619);
    b = Math.imul(b, 33) ^ identity.charCodeAt(index);
  }
  return `pump-selection:${getPistonInquirySeries(choice).toLowerCase()}-inquiry:${(a >>> 0).toString(16)}-${(b >>> 0).toString(16)}`;
}
