import { copy as chineseCopy } from "../quick-disconnect-coupling-flow-pressure-drop.zh";
import type { DiaphragmPumpEngineeringArticleCopy } from "../../diaphragm-pump-engineering-article.types";

type FlowTableLabels = { outsideRange: string; flowAtOneBar: string; coefficients: string; steepCurve: string };
const source: DiaphragmPumpEngineeringArticleCopy = chineseCopy;
const tables = source.sections[2].blocks.filter(block => block.type === "table");

/** Numeric curve readings and coefficients are maintained in one source. */
export function getFlowTableRows(series: "q20" | "q40" | "q60", labels: FlowTableLabels) {
  const table = tables[{ q20: 0, q40: 1, q60: 2 }[series]];
  const text: Record<string, string> = {
    "超出曲线": labels.outsideRange,
    "压降 1 bar 时的流量（L/min）": labels.flowAtOneBar,
    "估算 Kv / Cv": labels.coefficients,
    "曲线过陡，不估算": labels.steepCurve,
  };
  return table.rows.map(row => row.map(cell => text[cell] ?? cell));
}
