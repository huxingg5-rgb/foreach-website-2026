import type { SelectionLocale } from "../selection/product-selection.types";

/** Localize displayed notation only. Model identifiers, interfaces and URLs
 * retain their technical spelling; no numeric value is converted or rounded. */
export function formatPistonPumpDisplayText(text: string, locale: SelectionLocale): string {
  return text.split(/(https?:\/\/[^\s)]+|\]\([^)]*\)|`[^`]+`)/g).map((part) => {
    if (/^(?:https?:\/\/|\]\(|`)/.test(part)) return part;
    let value = part;
    if (locale === "zh") value = value.replace(/\s+Steps?\b/gi, " 步").replace(/\bRPM\b/gi, "转/分钟");
    if (locale === "en") value = value.replace(/\bStep\b/g, "steps").replace(/\bRPM\b/gi, "rpm");
    if (locale === "ko") value = value.replace(/\bRPM\b/gi, "rpm");
    if (locale === "es") value = value.replace(/\bRPM\b/gi, "rpm");
    if (locale === "fr") value = value.replace(/\bRPM\b/gi, "tr/min");
    if (["es", "fr", "ru"].includes(locale)) {
      value = value.replace(/(?<![\p{L}\p{N}_/.,])(\d+)\.(\d+)(?![\p{L}\p{N}_/.,])/gu, "$1,$2");
    }
    if (locale === "es" || locale === "fr") value = value.replace(/(\d)%/g, "$1 %");
    if (locale === "ru") {
      value = value.replace(/[μµ]L\b/g, "мкл").replace(/\bmL\b/g, "мл")
        .replace(/\bmm\b/g, "мм").replace(/\bkPa\b/g, "кПа").replace(/\bMPa\b/g, "МПа")
        .replace(/\bRPM\b/gi, "об/мин").replace(/(\d)%/g, "$1 %");
    }
    return value;
  }).join("");
}

export function formatPistonPumpSpecLabel(label: string, locale: "zh" | "en"): string {
  if (locale !== "en") return label;
  const labels: Record<string, string> = {
    "Fluidic interface": "Fluidic ports",
    "Recommended max speed": "Recommended maximum motor speed",
    "Designed life": "Design life",
  };
  return labels[label] ?? label;
}

