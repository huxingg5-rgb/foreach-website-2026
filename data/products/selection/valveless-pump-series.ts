import type { Metadata } from "next";
import { getValvelessLocaleCopy } from "../detail/valveless-pump-locales";
import { valvelessPumpIntroZh } from "./valveless-pump-copy.zh";
import { getValvelessPumpLanguageAlternates, getValvelessPumpPath } from "./valveless-pump-routes";

export const valvelessPumpSeries = [
  { slug: "rpl", filterValue: "RPL 无阀泵", copyKey: "single" },
  { slug: "drpl", filterValue: "DRPL 双头无阀泵", copyKey: "dual" },
] as const;

export function getValvelessPumpSeries(slug: string) {
  return valvelessPumpSeries.find(series => series.slug === slug);
}

export function getValvelessPumpSeriesMetadata(locale: string, slug: string): Metadata | undefined {
  const series = getValvelessPumpSeries(slug);
  const localized = locale === "zh" ? valvelessPumpIntroZh : getValvelessLocaleCopy(locale);
  if (!series || !localized) return undefined;
  const copy = localized[series.copyKey];
  const title = `${copy.title} | FOREACH`;
  const description = copy.paragraphs[0].replace(/\[([^\]]+)\]\([^)]*\)/g, "$1");
  const path = getValvelessPumpPath(locale, series.slug);
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path, languages: getValvelessPumpLanguageAlternates(series.slug) },
    openGraph: { type: "website", title, description, url: path, siteName: "FOREACH" },
    twitter: { card: "summary", title, description },
  };
}
