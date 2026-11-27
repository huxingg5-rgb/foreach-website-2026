import en from "./detail-locales/en.json";
import de from "./detail-locales/de.json";
import it from "./detail-locales/it.json";
import hi from "./detail-locales/hi.json";
import es from "./detail-locales/es.json";
import fr from "./detail-locales/fr.json";
import ko from "./detail-locales/ko.json";
import ru from "./detail-locales/ru.json";
import { assemblyFamilyGuides, assemblyGuideMaterials } from "./detail-content.zh";
import { getLocalizedAssemblyDetail, translateTubingAssembly } from "./localized";
import { getGermanDraftLink, getHindiDraftLink, getItalianDraftLink } from "@/lib/i18n/draft-languages";
import { getAssemblyReviewDetail, type AssemblyConfiguration, type AssemblyFamily } from "../detail/tubing-assemblies.review.zh";
import type { TubingAssemblyDetailLocale } from "./locales";

type ForeignLocale = Exclude<TubingAssemblyDetailLocale, "zh-CN">;
const dictionaries: Record<ForeignLocale, Record<string, string>> = { en, es, fr, ko, ru, de, it, hi };
const names = new Map<ForeignLocale, Map<string, string>>();
const connectionForms: Record<ForeignLocale, Record<string, string>> = {
  de: { "翻边": "Bördel", "卡箍": "Klemmkonus", "卡环": "Klemmring" },
  hi: { "翻边": "फ्लैंज वाला", "卡箍": "फेरूल वाला", "卡环": "कम्प्रेशन रिंग वाला" },
  it: { "翻边": "flangiato", "卡箍": "con ogiva", "卡环": "con anello di compressione" },
  en: { "翻边": "flanged", "卡箍": "ferrule", "卡环": "compression-ring" },
  es: { "翻边": "con reborde", "卡箍": "con férula", "卡环": "con anillo de compresión" },
  fr: { "翻边": "à collet", "卡箍": "à ferrule", "卡环": "à bague de compression" },
  ko: { "翻边": "플랜지형", "卡箍": "페룰형", "卡环": "압축 링형" },
  ru: { "翻边": "с отбортовкой", "卡箍": "с феррулой", "卡环": "с обжимным кольцом" },
};

function productNames(locale: ForeignLocale) {
  const existing = names.get(locale);
  if (existing) return existing;
  const result = new Map<string, string>();
  for (const family of Object.keys(assemblyFamilyGuides) as AssemblyFamily[]) {
    for (const configuration of [undefined, ...Object.keys(assemblyGuideMaterials)] as (AssemblyConfiguration | undefined)[]) {
      const label = `${configuration ? assemblyGuideMaterials[configuration as keyof typeof assemblyGuideMaterials].name : ""}${assemblyFamilyGuides[family].name}`;
      const translated = locale === "de"
        ? translateTubingAssembly(locale, getAssemblyReviewDetail(family, configuration).title)
        : String(getLocalizedAssemblyDetail(locale, family, configuration).h1Title);
      result.set(label, translated);
      result.set(String(getLocalizedAssemblyDetail("zh-CN", family, configuration).h1Title), translated);
    }
  }
  result.set("FEP 翻边管组件", result.get(getAssemblyReviewDetail("flanged-tubing", "fep").title)!);
  names.set(locale, result);
  return result;
}

const escape = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const patterns = new Map<ForeignLocale, { key: string; pattern: RegExp; variables: string[] }[]>();
function templates(locale: ForeignLocale) {
  const existing = patterns.get(locale);
  if (existing) return existing;
  const result = Object.keys(dictionaries[locale]).filter(key => /\{\d+\}/.test(key))
    .sort((a, b) => b.replace(/\{\d+\}/g, "").length - a.replace(/\{\d+\}/g, "").length)
    .map(key => {
      const variables = [...key.matchAll(/\{(\d+)\}/g)].map(match => match[1]);
      const pattern = new RegExp("^" + key.split(/(\{\d+\})/).map(part => /^\{\d+\}$/.test(part) ? "(.+?)" : escape(part)).join("") + "$");
      return { key, pattern, variables };
    });
  patterns.set(locale, result);
  return result;
}

/** Presentation only: canonical dimensions, SKU values and saved choices stay unchanged. */
export function assemblyDetailText(value: string, locale: TubingAssemblyDetailLocale = "zh-CN"): string {
  if (locale === "zh-CN") return value;
  if (!/[\u3400-\u9fff]/.test(value)) return value.replace(/、/g, ", ").replace(/。/g, ".").replace(/：/g, ": ").replace(/；/g, "; ");
  const source = value.replace(/\s+/g, " ").trim();
  const name = productNames(locale).get(source);
  if (name) return name;
  const exact = dictionaries[locale][source];
  if (exact) return exact;
  for (const template of templates(locale)) {
    const match = source.match(template.pattern);
    if (!match) continue;
    const values = Object.fromEntries(template.variables.map((variable, index) => {
      const part = match[index + 1];
      return [variable, connectionForms[locale][part] ?? assemblyDetailText(part, locale)];
    }));
    return dictionaries[locale][template.key].replace(/\{(\d+)\}/g, (_, variable: string) => values[variable]);
  }
  throw new Error(`Missing assembly detail translation (${locale}): ${source}`);
}

export function assemblyDetailHref(href: string, locale: TubingAssemblyDetailLocale) {
  if (locale === "de" && /^\/(products|resources|contact)(\/|$)/.test(href)) return getGermanDraftLink(`/en${href}`).href;
  if (locale === "hi" && /^\/(products|resources|contact)(\/|$)/.test(href)) return getHindiDraftLink(`/en${href}`).href;
  if (locale === "it" && /^\/(products|resources|contact)(\/|$)/.test(href)) return getItalianDraftLink(`/en${href}`).href;
  return locale !== "zh-CN" && /^\/(products|resources|contact)(\/|$)/.test(href) ? `/${locale}${href}` : href;
}
