import { Suspense } from "react";

import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getGermanBarbedFittingContent } from "@/data/products/detail/barbed-fitting-detail.de";
import { germanFittingDraftFamilies } from "@/data/products/detail/german-fitting-draft-routes";
import { getGermanHardTubeFittingContent } from "@/data/products/detail/hard-tube-fitting-detail.de";
import { getGermanThreadToBarbedFittingContent } from "@/data/products/detail/thread-to-barbed-fitting-detail.de";
import { languageDraftsEnabled } from "@/lib/i18n/draft-languages";

import SiteSearchClient from "@/components/search/SiteSearchClient";
import { getHindiDatasheetsPageData } from "@/data/resources/datasheets.hi";
import { getItalianDatasheetsPageData } from "@/data/resources/datasheets.it";
import { getGermanDatasheetSearchItems } from "@/services/search/getGermanDatasheetSearchItems";

const SEARCH_LOCALES = ["en", "es", "fr", "ko", "ru"];

const germanFittingCopy: Readonly<Record<string, (slug: string) => { title: string } | undefined>> = {
  "hard-tube-fittings": getGermanHardTubeFittingContent,
  "barbed-fittings": getGermanBarbedFittingContent,
  "thread-to-barbed-fittings": getGermanThreadToBarbedFittingContent,
};

function getGermanFittingTitles() {
  return Object.fromEntries(germanFittingDraftFamilies.flatMap(({ family, modelSlugs }) =>
    modelSlugs.flatMap(slug => {
      const copy = germanFittingCopy[family]?.(slug);
      return copy ? [[`/products/fittings/${family}/${slug}`, copy.title] as const] : [];
    }),
  ));
}

export function generateStaticParams() {
  const locales = languageDraftsEnabled ? [...SEARCH_LOCALES, "de", "it", "hi"] : SEARCH_LOCALES;
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (locale === "de" && languageDraftsEnabled) {
    return {
      title: "Website-Suche | FOREACH",
      description: "Produkte, Modelle, kompatible Modelle und Datenblätter von FOREACH suchen.",
      robots: { index: false, follow: true },
    };
  }
  if (locale === "hi" && languageDraftsEnabled) {
    return {
      title: "साइट पर खोजें | FOREACH",
      description: "FOREACH के उत्पाद, मॉडल, संगत मॉडल और डेटाशीट खोजें।",
      robots: { index: false, follow: true },
    };
  }
  if (locale === "it" && languageDraftsEnabled) {
    return {
      title: "Ricerca nel sito | FOREACH",
      description: "Cerca prodotti, modelli, modelli compatibili e schede tecniche di FOREACH.",
      robots: { index: false, follow: true },
    };
  }
  if (!SEARCH_LOCALES.includes(locale)) {
    return {};
  }

  return {
    title: "Search | Foreach Technology",
    description:
      "Search Foreach products, applications, technical resources, and company information.",
    robots: {
      index: false,
      follow: true,
    },
  };
}

export default async function LocaleSearchPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if ((locale === "de" || locale === "it" || locale === "hi") && !languageDraftsEnabled) notFound();
  const germanFittingTitles = locale === "de" ? getGermanFittingTitles() : undefined;
  const germanDatasheetItems = locale === "de" ? getGermanDatasheetSearchItems() : undefined;

  const italianDatasheetItems = locale === "it"
    ? getItalianDatasheetsPageData().datasheetItems
      .filter(item => item.actionType === "download" && item.downloadHref)
      .map(item => ({
        id: "datasheet:" + item.id,
        module: "datasheets" as const,
        title: item.title,
        subtitle: item.label,
        description: item.description,
        href: item.downloadHref,
        image: item.image,
        keywords: [item.title, item.label, item.description, item.keywords],
        actionLabel: "Vedi PDF (in inglese)",
      }))
    : undefined;

  const hindiDatasheetItems = locale === "hi"
    ? getHindiDatasheetsPageData().datasheetItems
      .filter(item => item.actionType === "download" && item.downloadHref)
      .map(item => ({
        id: "datasheet:" + item.id,
        module: "datasheets" as const,
        title: item.title,
        subtitle: item.label,
        description: item.description,
        href: item.downloadHref,
        image: item.image,
        keywords: [item.title, item.label, item.description, item.keywords],
        actionLabel: "PDF देखें (अंग्रेज़ी में)",
      }))
    : undefined;

  return (
    <Suspense fallback={<div style={{ minHeight: "60vh" }} />}>
      <SiteSearchClient
        locale={locale}
        germanFittingTitles={germanFittingTitles}
        germanDatasheetItems={germanDatasheetItems}
        italianDatasheetItems={italianDatasheetItems}
        hindiDatasheetItems={hindiDatasheetItems}
      />
    </Suspense>
  );
}
