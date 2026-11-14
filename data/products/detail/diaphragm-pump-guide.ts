import { getDiaphragmPumpReferenceModel } from "./diaphragm-pump-reference-models";
import { DIAPHRAGM_PUMP_SERIES_SLUGS } from "./diaphragm-pump-routes";

/** Verified against the local Chinese specification sheets, pp.3–6:
 * DPL30 PS-150B-2412-00001 A04; DPL60 PS-150B-2412-00002 A02;
 * DPL30H PS-150B-2504-00001 A00; DPGL800 PS-150B-2506-00001 A00.
 * Free flow, pressure and suction are separate ratings, not a combined duty point.
 * Materials follow the configuration tables (DPL60 p.6), not a generic material row.
 */
export type DiaphragmPumpGuide = {
  slug: string;
  model: string;
  series: "DPL30" | "DPL60" | "DPL30H" | "DPGL800";
  motor: "brushed" | "brushless" | "series";
  gasLiquid: boolean;
  highPressure: boolean;
  flow: string;
  pressure: string;
  suction?: string;
  life: string;
};

export function getDiaphragmPumpGuide(slug: string): DiaphragmPumpGuide | undefined {
  const reference = getDiaphragmPumpReferenceModel(slug);
  if (!reference && !DIAPHRAGM_PUMP_SERIES_SLUGS.some(value => value === slug)) return undefined;
  const series = slug.startsWith("dpgl800") ? "DPGL800" : slug.startsWith("dpl30h") ? "DPL30H" : slug.startsWith("dpl60") ? "DPL60" : "DPL30";
  const motor = reference ? reference.copyKey.endsWith("-brushed") ? "brushed" : "brushless" : series === "DPGL800" ? "brushless" : "series";
  return {
    slug, model: reference?.model || series, series, motor,
    gasLiquid: series === "DPGL800", highPressure: series === "DPL30H",
    flow: series === "DPGL800" ? "6 L/min" : series === "DPL60" ? "600 mL/min" : "300 mL/min",
    pressure: series === "DPGL800" ? "30 kPa / <−90 kPa" : series === "DPL30H" ? "600 kPa" : "100 kPa",
    suction: series === "DPGL800" ? undefined : series === "DPL30" ? "6 mH₂O" : "3 mH₂O",
    life: motor === "brushed" ? "3,000 h" : motor === "brushless" ? "10,000 h" : "3,000 h / 10,000 h",
  };
}
