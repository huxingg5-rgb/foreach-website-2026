import { en } from "./en";
import { es } from "./es";
import { fr } from "./fr";
import { ko } from "./ko";
import { ru } from "./ru";
import type { TechnicalArticleLocale } from "../technical-articles.types";
import type { QuickDisconnectTranslation } from "./shared";

export const quickDisconnectTranslations: Record<Exclude<TechnicalArticleLocale, "zh-CN">, QuickDisconnectTranslation> = { en, es, fr, ko, ru };
