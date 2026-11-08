import {
  quickConnectFittingSelectionProducts,
} from "@/data/products/selection/quick-connect-fitting-selection.generated";
import { getQuickConnectDrawingHref } from "@/data/products/detail/quick-connect-drawing-assets";
import { isPublishedFittingProduct } from "@/data/products/selection/fitting-publication.generated";
import { getQuickConnectFittingCadAssets } from "@/data/products/detail/quick-connect-fitting-cad-assets";
import { describeQuickConnectInstallation, describeQuickConnectValvePair } from "@/data/products/detail/quick-connect-model-guidance";

export type QuickConnectPairOption = {
  model: string;
  productCode: string;
  gender: string;
  genderCode: "P" | "S";
  tubeOrThread: string;
  panelMount: string;
  valved: string;
  housingMaterial: string;
  sealingRingMaterial: string;
  imagePath: string;
  drawingHref: string | null;
  detailHref: string;
  description: string;
  installation?: string;
  valvePair?: string;
};

export type QuickConnectPairConfig = {
  locale: "zh" | "en";
  series: string;
  baseGender: "P" | "S";
  baseModel: string;
  baseProductCode: string;
  baseImagePath: string;
  baseDescription: string;
  showModelGuidance?: boolean;
  baseInstallation?: string;
  defaultModel: string;
  options: QuickConnectPairOption[];
};

type QuickConnectSelectionRow = (typeof quickConnectFittingSelectionProducts)[number];

function slug(model: string) {
  return model.trim().toLowerCase();
}

function rowDescription(row: QuickConnectSelectionRow, locale: "zh" | "en") {
  if (locale === "en") {
    const gender = row.genderCode === "P" ? "Male" : row.genderCode === "S" ? "Female" : row.gender;
    const panelMount = row.panelCode === "M" ? "Panel mount" : row.panelCode === "N" ? "Non-panel" : row.panelMount;
    const valved = row.valvedCode === "V" ? "Valved" : row.valvedCode === "X" ? "Non-valved" : row.valved;
    return `${gender} · ${row.tubeOrThread} · ${panelMount} · ${valved} · ${row.housingMaterial}/${row.sealingRingMaterial}`;
  }
  return `${row.gender} · ${row.tubeOrThread} · ${row.panelMount} · ${row.valved} · ${row.housingMaterial}/${row.sealingRingMaterial}`;
}

function toOption(row: QuickConnectSelectionRow, locale: "zh" | "en"): QuickConnectPairOption {
  const model = String(row.foreachModel || row.model || "").trim();
  return {
    model,
    productCode: String(row.productCode || row.productId || "").trim(),
    gender: String(row.gender || "").trim(),
    genderCode: row.genderCode === "P" ? "P" : "S",
    tubeOrThread: String(row.tubeOrThread || "").trim(),
    panelMount: String(row.panelMount || "").trim(),
    valved: String(row.valved || "").trim(),
    housingMaterial: String(row.housingMaterial || "").trim(),
    sealingRingMaterial: String(row.sealingRingMaterial || "").trim(),
    imagePath: String(row.imageCard || "").trim(),
    drawingHref: getQuickConnectDrawingHref(model),
    detailHref: `/products/fittings/quick-connect-fittings/${slug(model)}`,
    description: rowDescription(row, locale),
  };
}

/**
 * Pair published opposite-gender ends within the same Q20/Q40/Q60 series.
 * Prefer matching material, seal, interface and valve configuration by default;
 * the selector still permits independent specifications on each side.
 */
export function getQuickConnectPairConfig(
  data: {
    model?: string;
    foreachModel?: string;
    productCode?: string;
    productId?: string;
    mainImage?: string | null;
    image?: string | null;
    imageUrl?: string | null;
  },
  locale: string,
): QuickConnectPairConfig | undefined {
  const model = String(data.model || data.foreachModel || "").trim().toUpperCase();
  const base = quickConnectFittingSelectionProducts.find(row => row.foreachModel === model && isPublishedFittingProduct(row));
  if (!base || !/^Q(?:20|40|60)$/.test(base.series || "")) return undefined;
  if (!["zh", "en", "es", "fr", "ko", "ru"].includes(locale)) return undefined;

  const resolvedLocale: "zh" | "en" = locale === "en" ? "en" : "zh";
  const showModelGuidance = locale === "zh" && model !== "Q2001-PMV-SACN";
  const score = (row: QuickConnectSelectionRow) =>
    (getQuickConnectFittingCadAssets(slug(row.foreachModel)) ? 256 : 0) +
    (row.housingMaterial === base.housingMaterial ? 64 : 0) +
    (row.sealingRingMaterial === base.sealingRingMaterial ? 32 : 0) +
    (row.tubeCode === base.tubeCode ? 16 : 0) +
    (row.valvedCode === base.valvedCode ? 8 : 0) +
    (row.panelCode === base.panelCode ? 4 : 0) +
    (row.shapeCode === base.shapeCode ? 2 : 0);
  const options = quickConnectFittingSelectionProducts
    .filter(row => row.series === base.series && row.genderCode !== base.genderCode && row.status === "active" && isPublishedFittingProduct(row))
    .sort((a, b) => score(b) - score(a) || a.foreachModel.localeCompare(b.foreachModel))
    .map(row => ({
      ...toOption(row, resolvedLocale),
      ...(showModelGuidance ? {
        installation: describeQuickConnectInstallation(row),
        valvePair: describeQuickConnectValvePair(model, row.foreachModel),
      } : {}),
    }))
    .filter(option => option.model && option.productCode);
  const defaultModel = options[0]?.model || "";
  if (!defaultModel) return undefined;

  return {
    locale: resolvedLocale,
    series: base.series || "",
    baseGender: base.genderCode === "P" ? "P" : "S",
    baseModel: model,
    baseProductCode: String(data.productCode || data.productId || "").trim(),
    baseImagePath: String(data.mainImage || data.image || data.imageUrl || "").trim(),
    baseDescription: rowDescription(base, resolvedLocale),
    ...(showModelGuidance ? { showModelGuidance: true, baseInstallation: describeQuickConnectInstallation(base) } : {}),
    defaultModel,
    options,
  };
}
