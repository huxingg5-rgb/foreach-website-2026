import { rotaryValveArticles } from "./rotary-valve-articles.zh";
import type { TechnicalArticleLocale } from "./technical-articles.types";
import en from "./rotary-valve-locales/en.json";
import es from "./rotary-valve-locales/es.json";
import fr from "./rotary-valve-locales/fr.json";
import ko from "./rotary-valve-locales/ko.json";
import ru from "./rotary-valve-locales/ru.json";

type ForeignLocale = Exclude<TechnicalArticleLocale, "zh-CN">;
type Dictionary = { sourceHash: string; chineseLinkSuffix: string; strings: Record<string, string> };
const dictionaries: Record<ForeignLocale, Dictionary> = { en, es, fr, ko, ru };
const han = /[\u3400-\u9fff]/;
const untranslatedHplcPath = "/resources/technical-articles/how-does-an-hplc-injection-valve-work/";
const sourceStrings: string[] = [];
const sourceIds = new Map<string, string>();

// IDs follow the first occurrence in the complete Chinese article contract.
// Reject stale dictionaries when that source changes; never silently mix languages.
function collectStrings(value: unknown): void {
  if (typeof value === "string") {
    if (han.test(value) && !sourceIds.has(value)) {
      sourceStrings.push(value);
      sourceIds.set(value, `t${String(sourceStrings.length).padStart(3, "0")}`);
    }
  } else if (Array.isArray(value)) {
    value.forEach(collectStrings);
  } else if (value && typeof value === "object") {
    Object.values(value).forEach(collectStrings);
  }
}
collectStrings(rotaryValveArticles);
let sourceHash = 0x811c9dc5;
for (const character of JSON.stringify(sourceStrings)) {
  sourceHash = Math.imul(sourceHash ^ character.charCodeAt(0), 0x01000193) >>> 0;
}
const expectedHash = sourceHash.toString(16).padStart(8, "0");
const cache = new Map<ForeignLocale, typeof rotaryValveArticles>();

function localize(value: unknown, locale: ForeignLocale, dictionary: Dictionary): unknown {
  if (typeof value === "string") {
    const id = sourceIds.get(value);
    return id ? dictionary.strings[id] : value;
  }
  if (Array.isArray(value)) return value.map(item => localize(item, locale, dictionary));
  if (!value || typeof value !== "object") return value;
  const result: Record<string, unknown> = Object.fromEntries(
    Object.entries(value).map(([key, item]) => [key, localize(item, locale, dictionary)]),
  );
  for (const key of ["href", "productsHref"]) {
    const path = result[key];
    if (typeof path !== "string") continue;
    if (path === untranslatedHplcPath) {
      // This related article currently has only a Chinese route.
      if (typeof result.label === "string") result.label += dictionary.chineseLinkSuffix;
    } else if (/^\/(?:products\/|resources\/technical-articles\/)/.test(path)) {
      result[key] = `/${locale}${path}`;
    }
  }
  if (typeof result.src === "string") {
    result.src = result.src.replace(/(rotary-selector-(?:10|16|24)-channels)\.svg$/, `$1.${locale}.svg`);
  }
  return result;
}

export function getRotaryValveArticles(locale: TechnicalArticleLocale): typeof rotaryValveArticles {
  if (locale === "zh-CN") return rotaryValveArticles;
  const existing = cache.get(locale);
  if (existing) return existing;
  const dictionary = dictionaries[locale];
  if (dictionary.sourceHash !== expectedHash || Object.keys(dictionary.strings).length !== sourceStrings.length) {
    throw new Error(`Rotary valve translations need updating for ${locale}: source ${expectedHash}`);
  }
  for (const id of sourceIds.values()) {
    const translation = dictionary.strings[id];
    if (!translation?.trim() || han.test(translation)) {
      throw new Error(`Incomplete rotary valve translation: ${locale}/${id}`);
    }
  }
  const articles = localize(rotaryValveArticles, locale, dictionary) as typeof rotaryValveArticles;
  cache.set(locale, articles);
  return articles;
}
