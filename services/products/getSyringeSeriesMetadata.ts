import type { Metadata } from "next";
import { getSyringeSeriesCopy, getSyringeSeriesPath } from "@/data/products/selection/syringe-pump-series";
export function getSyringeSeriesMetadata(locale: string, index: number): Metadata {
  const copy = getSyringeSeriesCopy(locale, index);
  const canonical = getSyringeSeriesPath(locale, index);
  const title = copy.title + " | FOREACH";
  const languages = Object.fromEntries(["zh", "en", "es", "fr", "ko", "ru"].map(lang => [lang === "zh" ? "zh-CN" : lang === "en" ? "en-US" : lang, getSyringeSeriesPath(lang, index)]));
  return { title: { absolute: title }, description: copy.paragraphs[0], robots: { index: true, follow: true }, alternates: { canonical, languages: { ...languages, "x-default": getSyringeSeriesPath("zh", index) } }, openGraph: { type: "website", title, description: copy.paragraphs[0], url: canonical }, twitter: { card: "summary", title, description: copy.paragraphs[0] } };
}
