import { de } from "./de";
import { en } from "./en";
import { es } from "./es";
import { fr } from "./fr";
import { ko } from "./ko";
import { ru } from "./ru";
import { buildSamplingProbeSelectionCopy } from "./shared";

export const samplingProbeTranslations = {
  en: buildSamplingProbeSelectionCopy(en, "en"),
  es: buildSamplingProbeSelectionCopy(es, "es"),
  fr: buildSamplingProbeSelectionCopy(fr, "fr"),
  ko: buildSamplingProbeSelectionCopy(ko, "ko"),
  ru: buildSamplingProbeSelectionCopy(ru, "ru"),
};

export const germanSamplingProbeSelectionCopy = buildSamplingProbeSelectionCopy(de, "de");

export const samplingProbeMentions = {
  "zh-CN": ["采样针", "穿刺针", "试剂吸取", "样本分液"],
  en: en.mentions,
  es: es.mentions,
  fr: fr.mentions,
  ko: ko.mentions,
  ru: ru.mentions,
  de: de.mentions,
};

export const samplingProbeProductNames = {
  en: ["Custom Sampling Probes", "Custom Piercing Probes"],
  es: ["Agujas de muestreo personalizadas", "Agujas de perforación personalizadas"],
  fr: ["Aiguilles de prélèvement sur mesure", "Aiguilles de perforation sur mesure"],
  ko: ["맞춤형 샘플링 프로브", "맞춤형 천공 프로브"],
  ru: ["Пробоотборные иглы на заказ", "Иглы для прокалывания на заказ"],
  de: ["Kundenspezifische Probennadeln", "Kundenspezifische Durchstechnadeln"],
} as const;
