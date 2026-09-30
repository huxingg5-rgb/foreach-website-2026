import type { TechnicalArticleLocale } from "./technical-articles.types";
import en from "./valve-engineering-locales/en.json";
import es from "./valve-engineering-locales/es.json";
import fr from "./valve-engineering-locales/fr.json";
import ko from "./valve-engineering-locales/ko.json";
import ru from "./valve-engineering-locales/ru.json";

type ForeignLocale = Exclude<TechnicalArticleLocale, "zh-CN">;
type Dictionary = { sourceHash: string; strings: Record<string, string> };
const dictionaries: Record<ForeignLocale, Dictionary> = { en, es, fr, ko, ru };
const han = /[\u3400-\u9fff]/;

// Use the same complete-article dictionary contract as the rotary valve articles.
// Passing the source avoids a circular import with the article registry.
export function localizeValveEngineeringArticles<T>(source: readonly T[], locale: ForeignLocale): readonly T[] {
  const strings: string[] = [];
  const ids = new Map<string, string>();
  function collect(value: unknown): void {
    if (typeof value === "string") {
      if (han.test(value) && !ids.has(value)) {
        strings.push(value);
        ids.set(value, `t${String(strings.length).padStart(3, "0")}`);
      }
    } else if (Array.isArray(value)) value.forEach(collect);
    else if (value && typeof value === "object") Object.values(value).forEach(collect);
  }
  collect(source);
  let hash = 0x811c9dc5;
  for (const character of JSON.stringify(strings)) {
    hash = Math.imul(hash ^ character.charCodeAt(0), 0x01000193) >>> 0;
  }
  const expectedHash = hash.toString(16).padStart(8, "0");
  const dictionary = dictionaries[locale];
  if (dictionary.sourceHash !== expectedHash || Object.keys(dictionary.strings).length !== strings.length) {
    throw new Error(`Valve engineering translations need updating for ${locale}: source ${expectedHash}`);
  }
  for (const id of ids.values()) {
    if (!dictionary.strings[id]?.trim() || han.test(dictionary.strings[id])) {
      throw new Error(`Incomplete valve engineering translation: ${locale}/${id}`);
    }
  }
  function localize(value: unknown): unknown {
    if (typeof value === "string") {
      const id = ids.get(value);
      return id ? dictionary.strings[id] : value;
    }
    if (Array.isArray(value)) return value.map(localize);
    if (!value || typeof value !== "object") return value;
    const result: Record<string, unknown> = Object.fromEntries(
      Object.entries(value).map(([key, item]) => [key, localize(item)]),
    );
    for (const key of ["href", "productsHref"]) {
      const path = result[key];
      if (typeof path === "string" && /^\/(?:products\/|resources\/technical-articles\/)/.test(path)) {
        result[key] = `/${locale}${path}`;
      }
    }
    return result;
  }
  return localize(source) as readonly T[];
}
