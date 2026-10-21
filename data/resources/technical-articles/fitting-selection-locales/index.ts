import type { TechnicalArticleLocale } from "../technical-articles.types";
import threadedSource from "./threaded.source.json";
import expansionSource from "./expansion.source.json";
import materialsSource from "./materials.source.json";
import threadedEn from "./threaded.en.json";
import threadedEs from "./threaded.es.json";
import threadedFr from "./threaded.fr.json";
import threadedKo from "./threaded.ko.json";
import threadedRu from "./threaded.ru.json";
import expansionEn from "./expansion.en.json";
import expansionEs from "./expansion.es.json";
import expansionFr from "./expansion.fr.json";
import expansionKo from "./expansion.ko.json";
import expansionRu from "./expansion.ru.json";
import materialsEn from "./materials.en.json";
import materialsEs from "./materials.es.json";
import materialsFr from "./materials.fr.json";
import materialsKo from "./materials.ko.json";
import materialsRu from "./materials.ru.json";
import femaleSource from "./female.source.json";
import bulkheadSource from "./bulkhead.source.json";
import femaleEn from "./female.en.json";
import femaleEs from "./female.es.json";
import femaleFr from "./female.fr.json";
import femaleKo from "./female.ko.json";
import femaleRu from "./female.ru.json";
import bulkheadEn from "./bulkhead.en.json";
import bulkheadEs from "./bulkhead.es.json";
import bulkheadFr from "./bulkhead.fr.json";
import bulkheadKo from "./bulkhead.ko.json";
import bulkheadRu from "./bulkhead.ru.json";

type ForeignLocale = Exclude<TechnicalArticleLocale, "zh-CN">;
const sources = { threaded: threadedSource, expansion: expansionSource, materials: materialsSource, female: femaleSource, bulkhead: bulkheadSource };
export type FittingTranslationKey = keyof typeof sources;
const dictionaries: Record<FittingTranslationKey, Record<ForeignLocale, Record<string, string>>> = {
  threaded: { en: threadedEn, es: threadedEs, fr: threadedFr, ko: threadedKo, ru: threadedRu },
  expansion: { en: expansionEn, es: expansionEs, fr: expansionFr, ko: expansionKo, ru: expansionRu },
  materials: { en: materialsEn, es: materialsEs, fr: materialsFr, ko: materialsKo, ru: materialsRu },
  female: { en: femaleEn, es: femaleEs, fr: femaleFr, ko: femaleKo, ru: femaleRu },
  bulkhead: { en: bulkheadEn, es: bulkheadEs, fr: bulkheadFr, ko: bulkheadKo, ru: bulkheadRu },
};

// Keep dimensions, model codes, structure and anchors from the reviewed source.
// A changed Chinese sentence must receive a reviewed translation: never silently
// render a Chinese fallback in a foreign-language article.
export function localizeFittingArticle<T>(key: FittingTranslationKey, value: T, locale: ForeignLocale): T {
  const source = sources[key];
  const dictionary = dictionaries[key][locale];
  const translations = new Map(source.map((text, index) => [text, dictionary[String(index)]]));
  if (Object.keys(dictionary).length !== source.length) {
    throw new Error(`Incomplete fitting translation: ${key}/${locale}`);
  }
  function walk(input: unknown, field = ""): unknown {
    if (typeof input === "string") {
      if (["href", "captionHref", "productsHref"].includes(field) && /^\/(products|resources|applications|contact)(\/|$)/.test(input)) {
        return `/${locale}${input}`;
      }
      if (/\p{Script=Han}/u.test(input)) {
        const translated = translations.get(input);
        if (!translated) throw new Error(`Untranslated ${key}/${locale}/${field}: ${input}`);
        return translated;
      }
      return input.replaceAll("。", ".").replaceAll("；", "; ").replaceAll("～", "–").replaceAll("：", ": ").replaceAll("、", ", ");
    }
    if (Array.isArray(input)) return input.map(item => walk(item, field));
    if (input && typeof input === "object") {
      return Object.fromEntries(Object.entries(input).map(([name, item]) => [name, walk(item, name)]));
    }
    return input;
  }
  return walk(value) as T;
}
