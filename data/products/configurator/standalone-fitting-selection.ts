import { FITTING_PUBLISHED_PRODUCTS } from "@/data/products/selection/fitting-publication.generated";
import { isHardTubePlug } from "@/data/products/detail/hard-tube-plugs";

export const STANDALONE_FITTING_TYPES = [
  "barbed-fittings", "thread-to-barbed-fittings", "female-thread-adapters",
  "bulkhead-barbed-fittings", "filters", "check-valves",
] as const;
export type StandaloneFittingType = typeof STANDALONE_FITTING_TYPES[number];
// Plugs share the hard-tube catalogue, but use single-part selection rather
// than the washer/ferrule pairing used by through fittings.
export type StandaloneFittingFamily = StandaloneFittingType | "hard-tube-plugs";
export type FittingDimension = { key: string; label: string };
export type StandaloneFittingOption = {
  model: string; productCode: string; name: string; imagePath: string; detailHref: string;
  specs: { label: string; value: string }[];
  attributes: Record<string, string>;
};
export type StandaloneFittingSelection = {
  productTypeId: StandaloneFittingFamily; name: string;
  dimensions: FittingDimension[]; options: StandaloneFittingOption[];
};
type Detail = { model?: string; foreachModel?: string; productCode?: string; name?: string; specs?: { label: string; value: string }[] };

export function isStandaloneFittingType(value: unknown): value is StandaloneFittingType {
  return STANDALONE_FITTING_TYPES.some(type => type === value);
}

const dimension = (key: string, label: string): FittingDimension => ({ key, label });
const productTypeNames: Record<StandaloneFittingFamily, string> = {
  "barbed-fittings": "倒刺接头",
  "thread-to-barbed-fittings": "螺纹转倒刺接头",
  "female-thread-adapters": "内螺纹互转接头",
  "bulkhead-barbed-fittings": "穿板倒刺接头",
  "filters": "过滤器",
  "check-valves": "单向阀",
  "hard-tube-plugs": "堵头",
};
const dimensions: Record<StandaloneFittingFamily, FittingDimension[]> = {
  "thread-to-barbed-fittings": [dimension("family", "接头系列"), dimension("shape", "连接结构"), dimension("seal", "密封方式"), dimension("thread", "螺纹规格"), dimension("tube", "接管内径"), dimension("profile", "倒刺代号"), dimension("material", "材质"), dimension("color", "颜色")],
  "barbed-fittings": [dimension("family", "接头系列"), dimension("shape", "产品结构"), dimension("ports", "接口形式"), dimension("tube1", "接管内径1"), dimension("tube2", "接管内径2"), dimension("tube3", "接管内径3"), dimension("profile", "倒刺代号"), dimension("material", "材质"), dimension("color", "颜色")],
  "female-thread-adapters": [dimension("family", "接头系列"), dimension("shape", "连接结构"), dimension("thread", "螺纹规格"), dimension("bore", "通径"), dimension("material", "材质"), dimension("color", "颜色")],
  "bulkhead-barbed-fittings": [dimension("thread", "螺纹规格"), dimension("tube", "接管内径"), dimension("material", "材质"), dimension("color", "颜色")],
  "filters": [dimension("filterMaterial", "滤网材质"), dimension("accuracy", "过滤精度"), dimension("tube", "接管内径"), dimension("material", "壳体材质"), dimension("color", "颜色")],
  "check-valves": [dimension("seal", "密封类型"), dimension("diaphragm", "膜片材质"), dimension("tube", "接管内径"), dimension("material", "壳体材质"), dimension("color", "颜色")],
  "hard-tube-plugs": [dimension("family", "接头系列"), dimension("thread", "螺纹规格"), dimension("material", "材质"), dimension("color", "颜色")],
};

// The published manifest supplies identity, images and routes. Detail specs are
// authoritative here; old selection portValues do not describe every reducer.
export function buildStandaloneFittingSelection(type: StandaloneFittingFamily, details: Detail[]): StandaloneFittingSelection {
  const isPlugSelection = type === "hard-tube-plugs";
  const published = FITTING_PUBLISHED_PRODUCTS.filter(row =>
    row.productTypeId === (isPlugSelection ? "hard-tube-fittings" : type) && (!isPlugSelection || isHardTubePlug({ model: row.foreachModel })));
  const options = published.flatMap(row => {
    const detail = details.find(item => item.productCode === row.productCode && (item.foreachModel || item.model) === row.foreachModel);
    if (!detail) return [];
    const specs = detail.specs || [];
    const spec = (...labels: string[]) => String(specs.find(item => labels.includes(item.label))?.value || "");
    const fields = row.foreachModel.split("-");
    const profileCodes = fields.slice(type === "thread-to-barbed-fittings" ? 2 : 1, -2)
      .map(code => code.match(/[A-Z]+$/)?.[0] || "未标注");
    const profile = [...new Set(profileCodes)].join(" / ");
    const commonTube = spec("接管内径");
    const ports = spec("接口形式");
    const portCount = /^(\d)通/.exec(ports)?.[1] || (ports === "单端堵头" ? "1" : "");
    const attributes: Record<string, string> = {
      family: fields[0], shape: spec("连接结构", "产品结构"), seal: spec("密封方式", "密封类型"),
      ports, thread: spec("螺纹规格"), bore: spec("通径"), tube: commonTube,
      tube1: spec("接管内径1") || commonTube,
      tube2: spec("接管内径2") || (Number(portCount) >= 2 ? commonTube : ""),
      tube3: spec("接管内径3") || (Number(portCount) >= 3 ? commonTube : ""),
      profile, material: spec("材质", "壳体材质", "主体材质").replace(/^AC$/, "POM").replace(/^PS$/, "PPS"),
      color: spec("颜色"), filterMaterial: spec("滤网材质"), accuracy: spec("过滤精度"), diaphragm: spec("膜片材质"),
    };
    return [{model: row.foreachModel, productCode: row.productCode, name: detail.name || row.productType,
      imagePath: row.imageCard, detailHref: row.detailHref, specs, attributes}];
  });
  let fields = dimensions[type].filter(field => options.some(option => option.attributes[field.key]));
  // Keep separately published models selectable even when their displayed
  // dimensions coincide; never silently collapse one SKU into another.
  const signature = (option: StandaloneFittingOption) => JSON.stringify(fields.map(field => option.attributes[field.key]));
  const counts = new Map<string, number>();
  options.forEach(option => counts.set(signature(option), (counts.get(signature(option)) || 0) + 1));
  if ([...counts.values()].some(count => count > 1)) {
    options.forEach(option => { (option.attributes as Record<string, string>).variant = option.model; });
    fields = [...fields, dimension("variant", "具体型号")];
  }
  return {productTypeId: type, name: productTypeNames[type], dimensions: fields, options};
}

export function getStandaloneDimensionValues(config: StandaloneFittingSelection, selected: StandaloneFittingOption, key: string): string[] {
  const index = config.dimensions.findIndex(field => field.key === key);
  if (index < 0) return [];
  const preceding = config.dimensions.slice(0, index);
  return [...new Set(config.options.filter(option => preceding.every(field => option.attributes[field.key] === selected.attributes[field.key]))
    .map(option => option.attributes[key]).filter(Boolean))].sort((a, b) => a.localeCompare(b, "zh", { numeric: true }));
}

export function pickStandaloneDimension(config: StandaloneFittingSelection, selected: StandaloneFittingOption, key: string, value: string): StandaloneFittingOption {
  const index = config.dimensions.findIndex(field => field.key === key);
  if (index < 0) return selected;
  const preceding = config.dimensions.slice(0, index), following = config.dimensions.slice(index + 1);
  const candidates = config.options.filter(option => option.attributes[key] === value && preceding.every(field => option.attributes[field.key] === selected.attributes[field.key]));
  // Prefer retaining the existing following dimensions in order; ties retain
  // the publication order. Every result is an actual published SKU.
  return candidates.reduce((best, option) => {
    const score = (item: StandaloneFittingOption) => following.reduce((sum, field, i) => sum + (item.attributes[field.key] === selected.attributes[field.key] ? 2 ** (following.length - i) : 0), 0);
    return !best || score(option) > score(best) ? option : best;
  }, undefined as StandaloneFittingOption | undefined) || selected;
}

// Load only the requested family's data after the selector opens.
export async function loadStandaloneFittingSelection(type: StandaloneFittingFamily): Promise<StandaloneFittingSelection> {
  const records = type === "hard-tube-plugs" ? (await import("@/data/products/generated/fittings/hard-tube-fittings/detail/index.json")).default
    : type === "barbed-fittings" ? (await import("@/data/products/generated/fittings/barbed-fittings/detail/index.json")).default
    : type === "thread-to-barbed-fittings" ? (await import("@/data/products/generated/fittings/thread-to-barbed-fittings/detail/index.json")).default
    : type === "female-thread-adapters" ? (await import("@/data/products/generated/fittings/female-thread-adapters/detail/index.json")).default
    : type === "bulkhead-barbed-fittings" ? (await import("@/data/products/generated/fittings/bulkhead-barbed-fittings/detail/index.json")).default
    : type === "filters" ? (await import("@/data/products/generated/fittings/filters/detail/index.json")).default
    : (await import("@/data/products/generated/fittings/check-valves/detail/index.json")).default;
  return buildStandaloneFittingSelection(type, records);
}
