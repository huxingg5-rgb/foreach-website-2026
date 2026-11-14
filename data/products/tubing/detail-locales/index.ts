import messages from "./messages.json";
import { assemblyText } from "@/data/products/configurator/tubing-assembly.intl";
import { fittingLocale, type FittingLocale } from "@/data/products/detail/fitting-ui.intl";

export { fittingLocale as tubingLocale };
const languages = ["zh", "en", "es", "fr", "ko", "ru"] as const;
type Message = readonly [string, string, string, string, string, string];
const rows = messages as unknown as Message[];
const maps = new Map(languages.map((locale, index) => [locale, new Map(rows.map(row => [row[0], row[index]]))]));
const escaped = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const templates = rows.filter(row => /\{\d+\}/.test(row[0]))
  .sort((a, b) => b[0].split(/\{\d+\}/)[0].length - a[0].split(/\{\d+\}/)[0].length
    || b[0].replace(/\{\d+\}/g, "").length - a[0].replace(/\{\d+\}/g, "").length)
  .map(row => ({
    row,
    pattern: new RegExp("^" + row[0].split(/(\{\d+\})/).map(piece => /^\{\d+\}$/.test(piece) ? "(.+?)" : escaped(piece)).join("") + "$"),
  }));
const keys = [...new Set(rows.map(row => row[0]))].filter(key => /\p{Script=Han}/u.test(key) && !/\{\d+\}/.test(key)).sort((a, b) => b.length - a.length);
let matcher: RegExp;

/** Complete reviewed messages, with placeholders for dimensions and model IDs. */
export function tubingText(value: string, locale = "zh"): string {
  const language = fittingLocale(locale);
  if (language === "zh" || !/\p{Script=Han}/u.test(value)) return value;
  const map = maps.get(language)!;
  const exact = map.get(value) || map.get(value.trim().replace(/\s+/g, " "));
  if (exact) return exact;
  for (const { row, pattern } of templates) {
    const match = value.match(pattern);
    if (match) return row[languages.indexOf(language)].replace(/\{(\d+)\}/g, (_, index: string) => tubingText(match[Number(index) + 1], language));
  }
  matcher ||= new RegExp(keys.map(escaped).join("|"), "g");
  return assemblyText(value.replace(matcher, key => map.get(key) || key), language);
}

export function tubingHref(href: string, locale = "zh") {
  const language: FittingLocale = fittingLocale(locale);
  return language !== "zh" && /^\/(products|resources|contact)(\/|$)/.test(href) ? `/${language}${href}` : href;
}

export function tubingHtmlLocale(locale = "zh") {
  const language = fittingLocale(locale);
  return language === "zh" ? "zh-CN" : language;
}
