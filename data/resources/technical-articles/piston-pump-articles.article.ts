import { pistonPumpArticlesEn } from "./piston-pump-articles.en";
import { pistonPumpArticlesEs } from "./piston-pump-articles.es";
import { pistonPumpArticlesFr } from "./piston-pump-articles.fr";
import { pistonPumpArticlesKo } from "./piston-pump-articles.ko";
import { pistonPumpArticlesRu } from "./piston-pump-articles.ru";
import {
  pistonPumpCopyToArticle,
  type PistonPumpArticleCopy,
  type PistonPumpArticleLocale,
} from "./piston-pump-articles.types";
import type {
  TechnicalArticleItem,
  TechnicalArticleLocale,
} from "./technical-articles.types";

export const pistonPumpArticleSlugs = [
  "piston-pump-head-material-selection",
  "piston-pump-accuracy-repeatability-resolution",
  "micro-plunger-pump-selection",
  "piston-pump-acceleration-deceleration-curves",
  "precision-piston-pump-backlash-compensation",
  "stepper-motor-calculation-selection",
] as const;

export type PistonPumpArticleSlug =
  (typeof pistonPumpArticleSlugs)[number];

const pistonPumpArticlesByLocale: Record<
  PistonPumpArticleLocale,
  readonly PistonPumpArticleCopy[]
> = {
  en: pistonPumpArticlesEn,
  es: pistonPumpArticlesEs,
  fr: pistonPumpArticlesFr,
  ko: pistonPumpArticlesKo,
  ru: pistonPumpArticlesRu,
};

export function isPistonPumpArticleSlug(
  slug: string,
): slug is PistonPumpArticleSlug {
  return (pistonPumpArticleSlugs as readonly string[]).includes(slug);
}

export function getPistonPumpArticleCopy(
  slug: string,
  locale: TechnicalArticleLocale,
): PistonPumpArticleCopy | null {
  if (locale === "zh-CN" || !isPistonPumpArticleSlug(slug)) {
    return null;
  }

  return (
    pistonPumpArticlesByLocale[locale].find(
      (article) => article.slug === slug,
    ) ?? null
  );
}

export function getPistonPumpTechnicalArticles(
  locale: TechnicalArticleLocale,
): TechnicalArticleItem[] {
  if (locale === "zh-CN") {
    return [];
  }

  return pistonPumpArticlesByLocale[locale].map(pistonPumpCopyToArticle);
}
