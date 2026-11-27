import type { Metadata } from "next";
import type { RelatedResourcesData } from "@/components/common/related-resources/related-resources.types";
import type { ApplicationDocument } from "@/data/applications/analytical-documents/types";
import { resolveApplicationHref, type ApplicationRoute } from "@/data/applications/application-routes";
import { germanChildApplicationEditions } from "@/data/applications/german-child-locales/manifest";
import type { EnglishApplicationKind } from "@/data/applications/application-english";
import { germanFittingDraftPathPattern } from "@/data/products/detail/german-fitting-draft-routes";
import { germanEnglishFallbackSuffix, getDraftHrefForEnglish, getGermanDraftLink, languageDraftsEnabled } from "@/lib/i18n/draft-languages";
import { getCanonicalUrl } from "@/lib/seo/site-url";
import { getInstallationGuidePageData } from "@/services/resources/installation-guide/getInstallationGuidePageData";
import { getGermanRelatedArticles } from "@/services/resources/technical-articles/getGermanRelatedArticles";
import { getEnglishApplicationSchema } from "./english-localized";

export type GermanApplicationCopy = Readonly<Record<string, string>>;

export const germanApplicationLabels = {
  onThisPage: "Auf dieser Seite",
  references: "Referenzen",
  viewReferences: "Referenzen anzeigen",
  related: "Verwandte Leitfäden",
  sources: "Quellen",
  reference: "Referenz",
};

const translatableFields = new Set([
  "title", "navLabel", "seoTitle", "description", "eyebrow", "label", "text", "caption", "note",
  "tocLabel", "viewDetails", "alt", "highlight", "headers", "nodes", "keywords", "items", "rows",
  "buttonLabel", "imageAlt", "summary",
]);

export function getGermanChildApplicationStaticParams(kind: EnglishApplicationKind) {
  if (!languageDraftsEnabled) return [];
  return (germanChildApplicationEditions[kind]?.paths ?? []).map(path => ({
    locale: "de",
    segments: path.split("/").filter(Boolean).slice(3),
  }));
}

export async function getGermanChildApplicationCopy(route: ApplicationRoute) {
  if (!languageDraftsEnabled) return undefined;
  const edition = germanChildApplicationEditions[route.kind];
  return edition?.paths.includes(route.path) ? (await edition.loadCopy()).default : undefined;
}

export function translateGermanApplication<T>(value: T, copy: GermanApplicationCopy, field = ""): T {
  if (typeof value === "string") {
    return ((!field || translatableFields.has(field)) && Object.hasOwn(copy, value) ? copy[value] : value) as T;
  }
  if (Array.isArray(value)) return value.map(item => translateGermanApplication(item, copy, field)) as T;
  if (!value || typeof value !== "object") return value;

  const translated = Object.fromEntries(Object.entries(value).map(([key, item]) => [
    key, translateGermanApplication(item, copy, key),
  ]));
  if (typeof translated.href !== "string") return translated as T;

  const target = getGermanDraftLink(resolveApplicationHref(translated.href), germanFittingDraftPathPattern);
  if (target.hrefLang === "en") {
    if (typeof translated.label === "string") translated.label += germanEnglishFallbackSuffix;
    else if (typeof translated.text === "string") translated.title = target.title;
    else if (typeof translated.title === "string" && !translated.buttonLabel) translated.title += germanEnglishFallbackSuffix;
  }
  return { ...translated, href: target.href, hrefLang: target.hrefLang } as T;
}

export function germanApplicationMetadata(
  source: Metadata,
  kind: EnglishApplicationKind,
  copy: GermanApplicationCopy,
  englishHref = `/en/applications/${kind}/`,
): Metadata {
  const localized = translateGermanApplication(source, copy);
  const canonical = getCanonicalUrl(getDraftHrefForEnglish(englishHref, "de"));
  return {
    ...localized,
    robots: { index: false, follow: true },
    alternates: { canonical },
    openGraph: localized.openGraph ? { ...localized.openGraph, url: canonical, locale: "de_DE" } : undefined,
  };
}

export function getGermanApplicationSchema(
  document: ApplicationDocument,
  href: string,
  breadcrumbs: readonly { label: string; href?: string }[],
) {
  const schema = getEnglishApplicationSchema(document, href, breadcrumbs);
  return { ...schema, "@graph": schema["@graph"].map((entry, index) => (
    index === 0 ? { ...entry, inLanguage: "de-DE" } : entry
  )) };
}

export function getGermanReviewResources(resources: RelatedResourcesData, copy: GermanApplicationCopy) {
  const videos = new Map(getInstallationGuidePageData("de").guides.map(guide => [guide.id, guide]));
  return {
    ...resources,
    uiLocale: "de" as const,
    videoLocale: "de" as const,
    videos: resources.videos.map(guide => videos.get(guide.id) ?? guide),
    articles: getGermanRelatedArticles(resources.articles),
    products: resources.products.map(product => {
      const destination = getGermanDraftLink(product.href, germanFittingDraftPathPattern);
      const title = translateGermanApplication(product.title, copy);
      return {
        ...product,
        title,
        href: destination.href,
        imageAlt: `${title} – Beispielkonfiguration. Wählen Sie Fördervolumen, Werkstoffe und Schnittstellen passend zur Anwendung.`,
        destinationLanguage: destination.hrefLang,
      };
    }),
  };
}
