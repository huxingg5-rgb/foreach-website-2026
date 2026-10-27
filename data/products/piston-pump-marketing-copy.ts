import catalog from "./piston-pump-marketing-copy.json";
import type { SelectionLocale } from "./selection/product-selection.types";

/** Authored adaptations of the approved Chinese copy, not word-by-word translations.
 * Naming references: KEYTO sampling pumps, IDEX/Lee precision dispense pumps;
 * local terminology: KNF (es/fr), Eppendorf (ko), ProMinent (ru).
 * Competitor specifications are not used. Technical data remains in the detail sources.
 */
const names = {
  dispensing: { zh: "分液泵", en: "Dispensing Pump", es: "Bomba dispensadora", fr: "Pompe de distribution", ko: "분주 펌프", ru: "Насос-дозатор" },
  sampling: { zh: "取样泵", en: "Sampling Pump", es: "Bomba de muestreo", fr: "Pompe de prélèvement", ko: "샘플링 펌프", ru: "Насос для проб" },
  reagent: { zh: "试剂加样泵", en: "Reagent Dispensing Pump", es: "Bomba para reactivos", fr: "Pompe pour réactifs", ko: "시약 분주 펌프", ru: "Насос для реагентов" },
  metering: { zh: "精密计量泵", en: "Precision Metering Pump", es: "Bomba dosificadora de precisión", fr: "Pompe doseuse de précision", ko: "정밀 정량 펌프", ru: "Прецизионный дозирующий насос" },
  dosing: { zh: "定量加液泵", en: "Dosing Pump", es: "Bomba dosificadora", fr: "Pompe doseuse", ko: "정량 주입 펌프", ru: "Дозирующий насос" },
  buffer: { zh: "缓冲液分配泵", en: "Buffer Dispensing Pump", es: "Bomba para soluciones tampón", fr: "Pompe pour solutions tampons", ko: "완충액 분주 펌프", ru: "Насос для буферных растворов" },
} satisfies Record<string, Record<SelectionLocale, string>>;

type MarketingEntry = { role: keyof typeof names } & Record<SelectionLocale, { heading: string; introduction: string }>;
const copyByModel = catalog as Record<string, MarketingEntry>;

export const PISTON_PUMP_MARKETING_MODELS = Object.keys(copyByModel);

export function getPistonPumpMarketingCopy(model: string, locale: SelectionLocale) {
  const key = model.toUpperCase();
  const entry = copyByModel[key];
  if (!entry) return undefined;
  const copy = entry[locale];
  const [, capacity, material] = key.split("-");
  const value = Number(capacity) >= 1000 ? String(Number(capacity) / 1000) : capacity;
  const localizedValue = ["es", "fr", "ru"].includes(locale) ? value.replace(".", ",") : value;
  const unit = locale === "ru" ? (Number(capacity) >= 1000 ? "мл" : "мкл") : (Number(capacity) >= 1000 ? "mL" : "μL");
  const volume = `${localizedValue} ${unit}`;
  const productName = names[entry.role][locale];
  const identity = `${key} · ${productName} · ${volume} · ${material}`;
  return {
    ...copy,
    productName,
    // Keep promotional integration claims out of image descriptions.
    imageAlt: identity,
    seoTitle: `${key} ${volume} ${productName} | Foreach Technology`,
    metaDescription: `${key}${locale === "zh" ? "：" : ": "}${copy.introduction}`,
  };
}
