import { flangedTubingSummary, type FlangedTubingChoice } from "./flanged-tubing";
import type { FlangedConfiguration } from "./flanged-tubing-configurations";
import { assemblyText } from "./tubing-assembly.intl";

/** User text is never sent through the UI glossary, including a company or
 * label whose text happens to equal a translated interface label. */
export function protectAssemblyUserText(input: FlangedConfiguration) {
  const record: FlangedConfiguration = { ...input, choice: { ...input.choice } };
  const values: string[] = [];
  let prefix = "UATEXT";
  while (JSON.stringify(input).includes(prefix)) prefix += "X";
  const protect = (value: string) => { if (!value) return value; const key = `${prefix}${values.length}Z`; values.push(value); return key; };
  record.name = protect(record.name);
  for (const key of ["company", "contact", "customerPart", "application", "notes", "freeEndNote", "textA", "textB"] as const) {
    record.choice[key] = protect(record.choice[key] || "");
  }
  const pattern = new RegExp(`${prefix}(\\d+)Z`, "g");
  return { record, restore: (text: string) => text.replace(pattern, (_, index: string) => values[Number(index)]) };
}

export function localizedAssemblySummary(choice: FlangedTubingChoice, locale = "zh") {
  const masked = protectAssemblyUserText({ id: "summary", number: 1, name: "", revision: 1, createdAt: "", updatedAt: "", choice });
  return masked.restore(flangedTubingSummary(masked.record.choice).split("\n").map(line => assemblyText(line, locale)).join("\n"));
}
