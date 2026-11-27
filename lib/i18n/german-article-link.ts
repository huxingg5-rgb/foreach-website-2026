import { germanFittingDraftPathPattern } from "@/data/products/detail/german-fitting-draft-routes";
import { isTechnicalArticleLocaleAvailable } from "@/data/resources/technical-articles/technical-article-availability";
import { isLocalizedGermanDraftPath } from "./draft-languages";

export function getGermanArticleDestination(englishHref: string) {
  if (!/^\/en(?=\/|[?#]|$)/.test(englishHref)) return { href: englishHref };
  const candidate = englishHref.replace(/^\/en/, "/de");
  return isLocalizedGermanDraftPath(candidate.split(/[?#]/, 1)[0], germanFittingDraftPathPattern)
    ? { href: candidate, destinationLanguage: "de" as const }
    : { href: englishHref, destinationLanguage: "en" as const };
}

export function getGermanArticleContentLink(href: string, label: string) {
  const conditionsHref = "/en/resources/technical-articles/what-is-a-quick-disconnect-fitting/#conditions";
  if (href === "/en/resources/technical-articles/quick-disconnect-coupling-pressure-rating/" || href === conditionsHref) {
    const conditions = getGermanArticleDestination(conditionsHref);
    return { href: conditions.href, hrefLang: conditions.destinationLanguage, label: "Schnellkupplungen: Betriebsdruck, Temperatur und Durchfluss" };
  }
  const destination = getGermanArticleDestination(href);
  const slug = href.split(/[?#]/, 1)[0].match(/^\/en\/resources\/technical-articles\/([^/]+)\/?$/)?.[1];
  if (destination.destinationLanguage === "en" && slug
    && !isTechnicalArticleLocaleAvailable(slug, "en") && isTechnicalArticleLocaleAvailable(slug, "zh-CN")) {
    return { href: href.slice(3), hrefLang: "zh-CN", label: label + " (Chinesisch)" };
  }
  return {
    href: destination.href,
    hrefLang: destination.destinationLanguage,
    label: label + (destination.destinationLanguage === "en" ? " (Englisch)" : ""),
  };
}
