import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/seo/site-url";
import { getGermanPipettingSelectionCopy } from "@/data/products/selection/pipetting-pump-selection.de";
import {getPipettingAlternates, getPipettingCopy, getPipettingPath, type PipettingPageKey} from "@/data/products/selection/pipetting-pump-seo";

export function getPipettingMetadata(locale: string, key: PipettingPageKey = "category"): Metadata {
  const german = locale === "de";
  const copy = german ? getGermanPipettingSelectionCopy(key) : getPipettingCopy(locale, key);
  const path = getPipettingPath(locale, key);
  const canonical = german ? getCanonicalUrl(path) : path;
  return {
    title: {absolute: copy.seoTitle}, description: copy.description,
    robots: {index: !german, follow: true},
    alternates: {canonical, ...(german ? {} : {languages: getPipettingAlternates(key)})},
    openGraph: {type: "website", title: copy.seoTitle, description: copy.description, url: canonical, locale: ({zh:"zh_CN",de:"de_DE",en:"en_US",es:"es_ES",fr:"fr_FR",ko:"ko_KR",ru:"ru_RU"} as Record<string,string>)[locale]},
    twitter: {card: "summary", title: copy.seoTitle, description: copy.description}
  };
}
