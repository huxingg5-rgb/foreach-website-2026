import catalog from "./piston-pump-introductions.json";
import type { SelectionLocale } from "../selection/product-selection.types";

type Introduction = [string, string, string];
type LocalizedIntroduction = Record<SelectionLocale, string[]>;

// Authored independently in each locale: application and construction,
// configuration and performance, then customization.
const introductions: Record<string, LocalizedIntroduction> = catalog;

export function getPistonPumpIntroduction(
  model: string,
  locale: SelectionLocale,
): Introduction | undefined {
  const paragraphs = introductions[model.toUpperCase()]?.[locale];
  if (!paragraphs) return undefined;
  if (paragraphs.length !== 3 || paragraphs.some((paragraph) => !paragraph.trim())) {
    throw new Error(`Expected three introduction paragraphs for ${model}/${locale}`);
  }
  return [paragraphs[0], paragraphs[1], paragraphs[2]];
}
