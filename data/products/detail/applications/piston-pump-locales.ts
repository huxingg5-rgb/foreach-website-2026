import content from "./piston-pump-locales.generated.json";
import type { SelectionLocale } from "../../selection/product-selection.types";

export type PistonTargetLocale = Exclude<SelectionLocale, "zh" | "en">;
export type LocalizedPistonContent = (typeof content)["es"]["ea-100-pmma"];

export function getPistonPumpLocalizedContent(slug: string, locale: SelectionLocale): LocalizedPistonContent | undefined {
  if (locale === "zh" || locale === "en") return undefined;
  const records: Record<string, LocalizedPistonContent> = content[locale];
  return records[slug];
}
