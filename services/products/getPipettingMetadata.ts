import type { Metadata } from "next";
import {getPipettingAlternates, getPipettingCopy, getPipettingPath, type PipettingPageKey} from "@/data/products/selection/pipetting-pump-seo";

export function getPipettingMetadata(locale: string, key: PipettingPageKey = "category"): Metadata {
  const copy = getPipettingCopy(locale, key);
  const canonical = getPipettingPath(locale, key);
  return {
    title: {absolute: copy.seoTitle}, description: copy.description,
    robots: {index: true, follow: true},
    alternates: {canonical, languages: getPipettingAlternates(key)},
    openGraph: {type: "website", title: copy.seoTitle, description: copy.description, url: canonical, locale: ({zh:"zh_CN",en:"en_US",es:"es_ES",fr:"fr_FR",ko:"ko_KR",ru:"ru_RU"} as Record<string,string>)[locale]},
    twitter: {card: "summary", title: copy.seoTitle, description: copy.description}
  };
}
