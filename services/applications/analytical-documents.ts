import type { Metadata } from "next";
import {
  analyticalDocuments,
  analyticalDocumentHref,
  getAnalyticalDocumentMetadata,
  getAnalyticalDocumentTrail,
  type AnalyticalDocumentSlug,
} from "@/data/applications/analytical-documents/registry";
import type { ApplicationDocument, ApplicationDocumentBody, ApplicationDocumentMetadata } from "@/data/applications/analytical-documents/types";
import { getCanonicalUrl, SITE_ORIGIN } from "@/lib/seo/site-url";
import { isLiquidChromatographySlug } from "@/data/applications/analytical-documents/liquid-chromatography";

// Server-only page loading: navigation and search use the small registry, not these bodies.
const establishedLoaders: Partial<Record<AnalyticalDocumentSlug, () => Promise<{ default: ApplicationDocumentBody }>>> = {
  "": () => import("@/data/applications/analytical-documents/en/overview"),
  "piston-pump": () => import("@/data/applications/analytical-documents/en/piston-pump"),
  "piston-sample-transfer": () => import("@/data/applications/analytical-documents/en/piston-sample-transfer"),
  "piston-reagent-dispensing": () => import("@/data/applications/analytical-documents/en/piston-reagent-dispensing"),
  "piston-dilution": () => import("@/data/applications/analytical-documents/en/piston-dilution"),
  "piston-titration": () => import("@/data/applications/analytical-documents/en/piston-titration"),
};

async function loadAdditionalBody(slug: AnalyticalDocumentSlug) {
  if (isLiquidChromatographySlug(slug)) {
    const { liquidChromatographyBodies } = await import("@/data/applications/analytical-documents/en/liquid-chromatography");
    return { default: liquidChromatographyBodies[slug] };
  }
  const { additionalAnalyticalBodies } = await import("@/data/applications/analytical-documents/en/additional-guides");
  const body = additionalAnalyticalBodies[slug];
  if (!body) throw new Error(`Missing English analytical-instrument body for ${slug}`);
  return { default: body };
}

export async function getEnglishAnalyticalDocument(slug: string): Promise<ApplicationDocument | undefined> {
  const metadata = getAnalyticalDocumentMetadata(slug);
  if (!metadata) return undefined;
  const loader = establishedLoaders[metadata.slug];
  const { default: body } = loader ? await loader() : await loadAdditionalBody(metadata.slug);
  return { ...metadata, ...body };
}

export function createAnalyticalDocumentMetadata(document: ApplicationDocumentMetadata): Metadata {
  const canonical = getCanonicalUrl(analyticalDocumentHref(document.slug));
  // Only the industry hub has existing translations. New documents are English-only.
  const languages = document.kind === "hub" ? {
    en: canonical,
    "zh-CN": getCanonicalUrl("/applications/analytical-instruments/"),
    es: getCanonicalUrl("/es/applications/analytical-instruments/"),
    fr: getCanonicalUrl("/fr/applications/analytical-instruments/"),
    ko: getCanonicalUrl("/ko/applications/analytical-instruments/"),
    ru: getCanonicalUrl("/ru/applications/analytical-instruments/"),
  } : { en: canonical };
  return {
    title: document.seoTitle,
    description: document.description,
    alternates: { canonical, languages },
    openGraph: {
      type: document.kind === "hub" ? "website" : "article",
      title: document.seoTitle,
      description: document.description,
      url: canonical,
      locale: "en_US",
      siteName: "FOREACH",
    },
    twitter: { card: "summary", title: document.seoTitle, description: document.description },
  };
}

export function createAnalyticalDocumentSchema(document: ApplicationDocument) {
  const canonical = getCanonicalUrl(analyticalDocumentHref(document.slug));
  const breadcrumbs = document.kind === "hub" || isLiquidChromatographySlug(document.slug) ? [
    { name: "Home", url: getCanonicalUrl("/en/") },
    { name: "Applications", url: getCanonicalUrl("/en/applications/") },
    { name: "Analytical Instruments", url: getCanonicalUrl(analyticalDocumentHref("")) },
  ] : [
    { name: "Home", url: getCanonicalUrl("/en/") },
    ...getAnalyticalDocumentTrail(document.slug).map((entry) => ({
      name: entry.slug ? entry.navLabel : "Analytical instruments",
      url: getCanonicalUrl(analyticalDocumentHref(entry.slug)),
    })),
  ];
  const page = {
    "@type": document.kind === "hub" ? "CollectionPage" : "TechArticle",
    "@id": `${canonical}#page`,
    url: canonical,
    name: document.title,
    headline: document.title,
    description: document.description,
    inLanguage: "en",
    publisher: { "@type": "Organization", name: "FOREACH", url: SITE_ORIGIN },
    mainEntityOfPage: canonical,
    ...(document.kind === "hub" ? {
      mainEntity: {
        "@type": "ItemList",
        itemListElement: analyticalDocuments.filter((item) => item.slug).map((item, index) => ({
          "@type": "ListItem", position: index + 1, name: item.title,
          url: getCanonicalUrl(analyticalDocumentHref(item.slug)),
        })),
      },
    } : {
      articleSection: document.sections.map((section) => section.title),
      citation: document.references.map((reference) => reference.href.startsWith("/") ? getCanonicalUrl(reference.href) : reference.href),
    }),
  };
  return {
    "@context": "https://schema.org",
    "@graph": [page, {
      "@type": "BreadcrumbList", "@id": `${canonical}#breadcrumb`,
      itemListElement: breadcrumbs.map((item, index) => ({ "@type": "ListItem", position: index + 1, name: item.name, item: item.url })),
    }],
  };
}
