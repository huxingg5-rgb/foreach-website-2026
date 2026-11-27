import catalog from "./piston-pump-ui.intl.json";
import germanCopy from "./piston-pump-ui.de.json";
import italianCopy from "./piston-pump.it.json";
import hindiCopy from "./piston-pump.hi.json";
import { hindiProductDetailText } from "./product-detail.hi";
import { getGermanDraftLink, getHindiDraftLink, getItalianDraftLink } from "@/lib/i18n/draft-languages";
import { formatPistonPumpDisplayText } from "./piston-pump-display-locale";
import type { SelectionLocale } from "../selection/product-selection.types";

type ForeignLocale = Exclude<SelectionLocale, "zh">;
const translations: Record<string, Record<ForeignLocale, string>> = catalog;
const normalize = (value: string) => value.replace(/\s+/g, " ").trim();
const escape = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const exact = new Map(Object.entries(translations).map(([source, value]) => [normalize(source), value]));
const templates = Object.entries(translations).filter(([source]) => /\{\d+\}/.test(source))
  .sort(([a], [b]) => b.replace(/\{\d+\}/g, "").length - a.replace(/\{\d+\}/g, "").length)
  .map(([source, value]) => ({
    pattern: new RegExp(`^${normalize(source).split(/\{\d+\}/).map(escape).join("(.*?)")}$`, "u"),
    slots: [...source.matchAll(/\{(\d+)\}/g)].map(match => Number(match[1])), value,
  }));
const phrases = [...exact.entries()].filter(([source]) => /[\u3400-\u9fff]/.test(source) && !/\{\d+\}/.test(source))
  .sort(([a], [b]) => b.length - a.length);
const cache = new Map<string, string>();

export function pistonLocale(value: string): SelectionLocale {
  if (value === "de" || value === "it" || value === "hi") return "en";
  return ["en", "es", "fr", "ko", "ru"].includes(value) ? value as ForeignLocale : "zh";
}

export function italianPistonCardText(english: string) {
  const copy: Readonly<Record<string, string>> = italianCopy.content;
  return copy[english] ?? english;
}

/** Translate authored presentation text only. Never pass customer-entered values here. */
export function pistonText(text: string, localeValue: string): string {
  if (localeValue === "de") return germanPistonText(text);
  if (localeValue === "hi") {
    const english = pistonText(text, "en");
    const copy: Readonly<Record<string, string>> = hindiCopy.specsAndFaq;
    const translated = copy[english.trim()];
    return translated === undefined ? hindiProductDetailText(english) : english.replace(english.trim(), translated);
  }
  if (localeValue === "it") {
    const english = pistonText(text, "en");
    const copy: Readonly<Record<string, string>> = italianCopy.specsAndFaq;
    const translated = copy[english.trim()];
    return translated === undefined ? english : english.replace(english.trim(), translated);
  }
  const locale = pistonLocale(localeValue);
  if (locale === "zh" || !text.trim()) return text;
  const key = `${locale}\0${text}`;
  const cached = cache.get(key);
  if (cached !== undefined) return cached;
  function translate(value: string, depth = 0): string {
    const source = normalize(value);
    const match = exact.get(source)?.[locale as ForeignLocale];
    if (match !== undefined) return match;
    if (source.includes(" / ") && source.includes("；满行程")) {
      return source.split(" / ").map(part => translate(part, depth + 1)).join(" / ");
    }
    if (depth < 8 && /[\u3400-\u9fff]/.test(source)) {
      for (const template of templates) {
        const result = source.match(template.pattern);
        if (!result) continue;
        const captures = new Map(template.slots.map((slot, index) => [slot, translate(result[index + 1], depth + 1)]));
        return template.value[locale as ForeignLocale].replace(/\{(\d+)\}/g, (_, slot: string) => captures.get(Number(slot)) || "");
      }
      // Chinese source also composes specs and FAQ answers from shared, complete phrases.
      // Replace those phrases without translating identifiers, numbers or URLs.
      let composed = source;
      for (const [phrase, values] of phrases) if (composed.includes(phrase)) composed = composed.split(phrase).join(values[locale as ForeignLocale]);
      return composed;
    }
    return source;
  }
  const translated = translate(text)
    .replace(/（/g, " (").replace(/）/g, ")").replace(/；/g, "; ").replace(/：/g, ": ")
    .replace(/。/g, ". ").replace(/、/g, ", ").replace(/，/g, ", ").replace(/～/g, "–");
  // Authored English already distinguishes “Step angle” from numeric “steps”.
  // The legacy numeric formatter pluralizes the capitalized word everywhere.
  let result = locale === "en" ? translated.replace(/\bRPM\b/gi, "rpm") : formatPistonPumpDisplayText(translated, locale);
  if (locale === "en") result = result.replace(/\b1 units\b/g, "1 unit");
  if (locale === "es") result = result.replace(/\b1 unidades\b/g, "1 unidad");
  if (locale === "fr") result = result.replace(/\b1 unités\b/g, "1 unité");
  if (locale === "ru") {
    result = result.replace(/(?<=\d)\s*g\b/g, " г")
      .replace(/(?<![\d.,])(\d+(?:,\d+)?) шагов(?=$|[^\p{L}])/gu, (_, count: string) => {
        const plural = new Intl.PluralRules("ru").select(Number(count.replace(",", ".")));
        return `${count} ${plural === "one" ? "шаг" : plural === "few" || plural === "other" ? "шага" : "шагов"}`;
      });
  }
  const output = `${text.match(/^\s*/)?.[0] || ""}${result}${text.match(/\s*$/)?.[0] || ""}`;
  cache.set(key, output);
  return output;
}

const germanText: Readonly<Record<string, string>> = germanCopy;

const germanTemplates = Object.entries(germanText)
  .filter(([source]) => /\{\d+\}/.test(source))
  .sort(([first], [second]) => second.replace(/\{\d+\}/g, "").length - first.replace(/\{\d+\}/g, "").length)
  .map(([source, value]) => ({
    pattern: new RegExp("^" + normalize(source).split(/\{\d+\}/).map(escape).join("(.*?)") + "$", "u"),
    slots: Array.from(source.matchAll(/\{(\d+)\}/g), match => Number(match[1])),
    value,
  }));

function germanPistonText(text: string, depth = 0): string {
  if (!text.trim()) return text;
  if (Object.hasOwn(germanText, text)) return germanText[text];
  if (depth < 6) {
    for (const template of germanTemplates) {
      const result = normalize(text).match(template.pattern);
      if (!result) continue;
      const captures = new Map(template.slots.map((slot, index) => [slot, germanPistonText(result[index + 1], depth + 1)]));
      return template.value.replace(/\{(\d+)\}/g, (_, slot: string) => captures.get(Number(slot)) ?? "");
    }
  }
  return pistonText(text, "en");
}

export function pistonHref(href: string, localeValue: string): string {
  const locale = pistonLocale(localeValue);
  if (!/^\/(?:products|resources|contact)(?:\/|$|[?#])/.test(href) || locale === "zh") return href;
  const localizedHref = `/${locale}${href}`;
  if (localeValue === "hi") return getHindiDraftLink(localizedHref).href;
  if (localeValue === "it") return getItalianDraftLink(localizedHref).href;
  return localeValue === "de" ? getGermanDraftLink(localizedHref).href : localizedHref;
}
