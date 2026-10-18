import generated from "./search.generated.json";
import { isTubingAssemblyLocale, type TubingAssemblyLocale } from "./locales";
import type { SiteSearchItem } from "@/data/search/site-search.types";
import { isPublishedAssemblyPath } from "./publication";

// Client search imports only this scoped snapshot, never the full page dictionaries.
const itemsByLocale = generated as Record<TubingAssemblyLocale, SiteSearchItem[]>;

export function getTubingAssemblySearchItems(locale: string): SiteSearchItem[] {
  return isTubingAssemblyLocale(locale) ? itemsByLocale[locale].filter(item => isPublishedAssemblyPath(item.href)) : [];
}

export function isTubingAssemblySearchPath(href: string): boolean {
  return /^(?:\/(?:en|es|fr|ko|ru))?\/products\/tubing-assemblies(?:\/|$)/.test(
    href.split(/[?#]/, 1)[0],
  );
}
