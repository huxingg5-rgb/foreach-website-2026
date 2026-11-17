import { instrumentInquiryText as text } from "./instrument-inquiry.intl";
import { getSelectionWorkspaceCopy } from "../detail/selection-workspace-copy";

export type InstrumentInquiryFamily = "PDM5" | "ABD" | "SMTP2" | "SMTP4";
export type InstrumentInquiryChoice = Record<string, string>;
export type InstrumentInquiryConfiguration = { version: 1; family: InstrumentInquiryFamily; choice: InstrumentInquiryChoice; requirements: string };
export type InstrumentInquiryField = { key: string; label: string; options: readonly (readonly [string, string])[] };

// PS-110B-2508-00001 A02, pp6–7; PS-110B-2407-00002 A01, p6.
export const pdm5OrderModels = [
  ["0200", "449038"], ["0400", "449040"], ["0700", "449041"], ["1200", "449042"],
] as const;
export const abdOrderModels = [
  ["16", "1.6", "449050"], ["20", "2.0", "449051"], ["25", "2.5", "449052"], ["32", "3.2", "449053"],
  ["40", "4.0", "449058"], ["48", "4.8", "449054"], ["60", "6.0", "449055"], ["64", "6.4", "449056"],
] as const;
// PS-SMTP-011 A08 pp3,5 and PS-130A-2507-00001 001 pp16–18.
export const smtpAdapters = [["0", "LTE008 · 8 mm"], ["1", "LTE045 · 45 mm"], ["2", "LTE072 · 72 mm"]] as const;
export const smtp2OrderModels: Record<string, string> = { "SMTP2-500": "909011", "SMTP2-510": "909018", "SMTP2-520": "909020" };
// The CN SMTP4 ordering row calls 909070 “250UL” but describes SMTP4-210;
// the EN selection chart defines -210 as 100 μL / 45 mm. Keep 909070 unassigned
// until the conflicting capacity/model records are reconciled.
export const smtp4OrderModels: Record<string, string> = {
  "SMTP4-200": "909064", "SMTP4-220": "909078",
  "SMTP4-400": "909069", "SMTP4-410": "909075", "SMTP4-420": "909080", "SMTP4-520": "909089",
};
export function getInstrumentInquiryFamily(slug: string): InstrumentInquiryFamily | undefined {
  if (["pdm5-pressure-sensor", "pdm5"].includes(slug)) return "PDM5";
  if (["abd-air-bubble-detector", "abd"].includes(slug)) return "ABD";
  if (["smtp2-500", "smtp2-510", "smtp2-520", "smtp2-1000ul"].includes(slug)) return "SMTP2";
  if (["smtp4-100ul", "smtp4-250ul", "smtp4-500ul"].includes(slug)) return "SMTP4";
}
export function instrumentInquiryProductName(family: InstrumentInquiryFamily, locale = "zh") {
  return `${family} ${text(family === "PDM5" ? "pdmType" : family === "ABD" ? "abdType" : "smtpType", locale)}`;
}
export function instrumentInquiryNote(family: InstrumentInquiryFamily, locale = "zh") {
  return text(family === "PDM5" ? "pdmNote" : family === "ABD" ? "abdNote" : family === "SMTP2" ? "smtp2Note" : "smtp4Note", locale);
}
export function getInstrumentInquiryFields(family: InstrumentInquiryFamily, locale = "zh"): InstrumentInquiryField[] {
  const t = (key: Parameters<typeof text>[0]) => text(key, locale);
  const unsure = ["unsure", t("unsure")] as const;
  if (family === "PDM5") return [
    { key: "range", label: t("range"), options: [...pdm5OrderModels.map(([code]) => [code, `10–${Number(code)} kPa`] as const), unsure] },
  ];
  if (family === "ABD") return [
    { key: "tubeOd", label: t("tubeOd"), options: [...abdOrderModels.map(([code, od]) => [code, `${od} mm`] as const), unsure] },
  ];
  return [
    ...(family === "SMTP4" ? [{ key: "capacity", label: t("capacity"), options: [...[100, 250, 500, 1000].map(value => [String(value), `${value} μL`] as const), unsure] }] : []),
    { key: "adapter", label: t("adapter"), options: [...smtpAdapters, unsure] },
  ];
}
export function getInstrumentInquiryDefaults(slug: string): InstrumentInquiryConfiguration {
  const family = getInstrumentInquiryFamily(slug);
  if (!family) throw new Error("Unsupported instrument product");
  const choice = Object.fromEntries(getInstrumentInquiryFields(family).map(field => [field.key, "unsure"]));
  if (family === "SMTP2") choice.adapter = slug === "smtp2-510" ? "1" : slug === "smtp2-520" ? "2" : "0";
  if (family === "SMTP4") { choice.capacity = slug.match(/-(\d+)ul$/)?.[1] || "100"; choice.adapter = "0"; }
  return { version: 1, family, choice, requirements: "" };
}
export function normalizeInstrumentInquiry(configuration: InstrumentInquiryConfiguration): InstrumentInquiryConfiguration {
  const choice = Object.fromEntries(getInstrumentInquiryFields(configuration.family).map(field => [field.key,
    field.options.some(([value]) => value === configuration.choice?.[field.key]) ? configuration.choice[field.key] : "unsure"]));
  return { version: 1, family: configuration.family, choice, requirements: String(configuration.requirements || "").trim().slice(0, 2000) };
}
export function validateInstrumentInquiry(configuration: InstrumentInquiryConfiguration, quantity: number) {
  if (!Number.isSafeInteger(quantity) || quantity < 1 || quantity > 1000000) return "quantityError" as const;
  if (getInstrumentInquiryFields(configuration.family).some(field => !field.options.some(([value]) => value === configuration.choice[field.key]))) return "invalid" as const;
  return null;
}
export function resolveInstrumentInquiry(configuration: InstrumentInquiryConfiguration) {
  const { family, choice } = normalizeInstrumentInquiry(configuration);
  let model = family as string, productCode = "";
  if (family === "PDM5") {
    const option = pdm5OrderModels.find(([value]) => value === choice.range);
    if (option) { model = `PDM5-40N-${option[0]}`; productCode = option[1]; }
  } else if (family === "ABD") {
    const option = abdOrderModels.find(([value]) => value === choice.tubeOd);
    if (option) { model = `ABD-06M-V${option[0]}`; productCode = option[2]; }
  } else {
    const capacityCode: Record<string, string> = { "100": "2", "250": "3", "500": "4", "1000": "5" };
    const capacity = family === "SMTP2" ? "1000" : choice.capacity;
    if (capacityCode[capacity] && smtpAdapters.some(([value]) => value === choice.adapter)) {
      model = `${family}-${capacityCode[capacity]}${choice.adapter}0`;
      productCode = (family === "SMTP2" ? smtp2OrderModels : smtp4OrderModels)[model] || "";
    }
  }
  return { model, productCode };
}
export function instrumentInquiryRows(configuration: InstrumentInquiryConfiguration, locale = "zh"): Array<[string, string]> {
  const normalized = normalizeInstrumentInquiry(configuration), copy = getSelectionWorkspaceCopy(locale);
  const { model, productCode } = resolveInstrumentInquiry(normalized);
  const rows: Array<[string, string]> = [[copy.model, model], [copy.productCode, productCode || text("pending", locale)]];
  for (const field of getInstrumentInquiryFields(normalized.family, locale)) rows.push([field.label, field.options.find(([value]) => value === normalized.choice[field.key])![1]]);
  if (normalized.family === "PDM5") rows.push([text("port", locale), "1/4-28 UNF-2B"], [text("materials", locale), "PEEK / FKM / 316L"], [text("protocol", locale), "I2C · 40N"], [text("voltage", locale), "5 V DC"]);
  if (normalized.family === "ABD") rows.push([text("structure", locale), text("vertical", locale)], [text("protocol", locale), "TTL232 / IO · Modbus RTU · 06M"], [text("voltage", locale), "5 V DC"]);
  if (normalized.family === "SMTP2") rows.push([text("capacity", locale), "1000 μL"], [text("communication", locale), "RS-232 / RS-485 / CAN"], [text("lld", locale), "pLLD / cLLD / hLLD"]);
  if (normalized.family.startsWith("SMTP")) rows.push([text("voltage", locale), "24 V DC"]);
  if (normalized.requirements) rows.push([text("requirements", locale), normalized.requirements]);
  return rows;
}
export function instrumentInquirySummary(configuration: InstrumentInquiryConfiguration, locale = "zh") {
  return [instrumentInquiryProductName(configuration.family, locale), ...instrumentInquiryRows(configuration, locale).map(([label, value]) => `${label}: ${value}`)].join("\n");
}
export function instrumentInquiryCartId(configuration: InstrumentInquiryConfiguration) {
  const identity = JSON.stringify(normalizeInstrumentInquiry(configuration));
  let a = 2166136261, b = 5381;
  for (let i = 0; i < identity.length; i++) { a = Math.imul(a ^ identity.charCodeAt(i), 16777619); b = Math.imul(b, 33) ^ identity.charCodeAt(i); }
  return `instrument-inquiry:${configuration.family}:${(a >>> 0).toString(16)}-${(b >>> 0).toString(16)}`;
}
