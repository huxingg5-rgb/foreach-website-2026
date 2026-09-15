import type { TechnicalArticleLocale } from "./technical-articles.types";
import { diaphragmPumpRdArticlesZh } from "./diaphragm-pump-rd-articles.zh";
import { diaphragmPumpRdArticlesEn } from "./diaphragm-pump-rd-articles.en";
import { diaphragmPumpRdArticlesEs } from "./diaphragm-pump-rd-articles.es";
import { diaphragmPumpRdArticlesFr } from "./diaphragm-pump-rd-articles.fr";
import { diaphragmPumpRdArticlesKo } from "./diaphragm-pump-rd-articles.ko";
import { diaphragmPumpRdArticlesRu } from "./diaphragm-pump-rd-articles.ru";

export const diaphragmPumpRdArticleSlugs = [
  "self-priming-miniature-liquid-diaphragm-pump-selection",
  "miniature-diaphragm-pump-flow-pulsation-reduction",
  "miniature-diaphragm-pump-noise-vibration-reduction",
  "miniature-diaphragm-pump-backflow-check-valve"
] as const;

export const diaphragmPumpRdArticles = {
  "zh-CN": diaphragmPumpRdArticlesZh,
  "en": diaphragmPumpRdArticlesEn,
  "es": diaphragmPumpRdArticlesEs,
  "fr": diaphragmPumpRdArticlesFr,
  "ko": diaphragmPumpRdArticlesKo,
  "ru": diaphragmPumpRdArticlesRu,
} satisfies Record<TechnicalArticleLocale, unknown>;
