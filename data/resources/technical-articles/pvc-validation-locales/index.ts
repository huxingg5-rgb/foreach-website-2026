import en from "./en.json";
import es from "./es.json";
import fr from "./fr.json";
import ko from "./ko.json";
import ru from "./ru.json";
import { pvcCleaningCompatibilityCopy } from "../pvc-tubing-cleaning-fluid-compatibility.zh";
import { pvcPressurePullOffCopy } from "../pvc-tubing-pressure-rating-pull-off-force.zh";
import type { TechnicalArticleLocale } from "../technical-articles.types";
import type { DiaphragmPumpEngineeringArticleCopy } from "../diaphragm-pump-engineering-article.types";

type ForeignLocale = Exclude<TechnicalArticleLocale, "zh-CN">;
type ArticleKind = "compatibility" | "pressure";
const dictionaries: Record<ForeignLocale, Record<string, string>> = { en, es, fr, ko, ru };
const sources = { compatibility: pvcCleaningCompatibilityCopy, pressure: pvcPressurePullOffCopy };
const mentions: Record<ForeignLocale, Record<ArticleKind, string[]>> = {
  en: { compatibility: ["clear PVC tubing", "clear vinyl tubing", "PVC tubing chemical compatibility", "cleaning fluids", "IVD wash lines"], pressure: ["barbed tube fittings", "PVC tubing pressure rating", "burst pressure", "working pressure", "tubing pull-off force"] },
  es: { compatibility: ["tubo de PVC transparente", "compatibilidad química", "líquidos de limpieza", "circuitos IVD"], pressure: ["racores de espiga", "presión del tubo de PVC", "presión de rotura", "fuerza de extracción"] },
  fr: { compatibility: ["tube PVC transparent", "compatibilité chimique", "liquides de nettoyage", "circuit de DIV"], pressure: ["raccords cannelés", "pression du tube PVC", "pression d'éclatement", "force d'arrachement"] },
  ko: { compatibility: ["투명 PVC 튜브", "화학적 호환성", "세척액", "IVD 세척 유로"], pressure: ["바브 피팅", "PVC 튜브 내압", "파열압", "인발력"] },
  ru: { compatibility: ["прозрачная ПВХ-трубка", "химическая совместимость", "моющие растворы", "контур IVD"], pressure: ["штуцер ёлочка", "давление ПВХ-трубки", "давление разрыва", "усилие стягивания"] },
};

/** Preserve canonical structure, measured cells, model identifiers and image assets.
 * Translate every human-readable field; missing text fails instead of falling back to Chinese.
 * The existing tubing localizer resolves locale-specific routes after this step.
 */
function translate<T>(value: T, key: string, locale: ForeignLocale): T {
  if (typeof value === "string") {
    if (!/\p{Script=Han}/u.test(value)) return value;
    const translated = dictionaries[locale][key];
    if (!translated) throw new Error(`Missing PVC validation translation: ${locale}/${key}`);
    return translated as T;
  }
  if (Array.isArray(value)) return value.map((item, index) => translate(item, `${key}.${index}`, locale)) as T;
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([name, item]) => [name, translate(item, `${key}.${name}`, locale)])) as T;
  }
  return value;
}

export function getPvcValidationTranslations(kind: ArticleKind): Record<ForeignLocale, { copy: DiaphragmPumpEngineeringArticleCopy; mentions: string[] }> {
  return Object.fromEntries((Object.keys(dictionaries) as ForeignLocale[]).map(locale => [locale, {
    copy: translate(sources[kind], kind, locale), mentions: mentions[locale][kind],
  }])) as Record<ForeignLocale, { copy: DiaphragmPumpEngineeringArticleCopy; mentions: string[] }>;
}

export const pvcValidationBarbLabels: Record<TechnicalArticleLocale, string> = {
  "zh-CN": "等径直通倒刺接头", en: "Equal straight barbed fitting", es: "Racor de espiga recto igual",
  fr: "Raccord cannelé droit égal", ko: "동경 스트레이트 바브 피팅", ru: "Прямой равнопроходный штуцер",
};
