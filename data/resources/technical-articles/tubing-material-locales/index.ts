import en from "./en.json";
import es from "./es.json";
import fr from "./fr.json";
import ko from "./ko.json";
import ru from "./ru.json";
import { getTubingLanguagePath } from "@/data/products/selection/tubing-selection-routes";
import type { TechnicalArticleLocale } from "../technical-articles.types";

const dictionaries: Record<Exclude<TechnicalArticleLocale, "zh-CN">, Record<string, string>> = { en, es, fr, ko, ru };

/** The Chinese article owns facts and structure; translations supply presentation only. */
export function localizeTubingArticle<T>(value: T, locale: TechnicalArticleLocale): T {
  if (locale === "zh-CN") return value;
  if (typeof value === "string") {
    if (/[\u3400-\u9fff]/.test(value)) {
      const translated = dictionaries[locale][value];
      if (!translated) throw new Error(`Missing tubing article translation (${locale}): ${value}`);
      return translated as T;
    }
    // Material filter and product-detail routes differ between language versions.
    const tubingPath = getTubingLanguagePath(value, locale);
    if (tubingPath) return tubingPath as T;
    if (/^\/(?:products|resources)(?:\/|$)/.test(value)) return `/${locale}${value}` as T;
    return value;
  }
  if (Array.isArray(value)) return value.map(item => localizeTubingArticle(item, locale)) as T;
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, localizeTubingArticle(item, locale)])) as T;
  }
  return value;
}
