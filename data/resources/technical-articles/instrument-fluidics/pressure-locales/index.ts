import { copy as en } from "./en";
import { copy as es } from "./es";
import { copy as fr } from "./fr";
import { copy as ko } from "./ko";
import { copy as ru } from "./ru";
import type { TechnicalArticleLocale } from "../../technical-articles.types";
import type { DiaphragmPumpEngineeringArticleCopy } from "../../diaphragm-pump-engineering-article.types";

export const pressureTranslations: Record<Exclude<TechnicalArticleLocale, "zh-CN">, DiaphragmPumpEngineeringArticleCopy> = { en, es, fr, ko, ru };
