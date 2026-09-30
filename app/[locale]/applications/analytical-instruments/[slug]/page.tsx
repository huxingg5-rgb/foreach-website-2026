import type { Metadata } from "next";
import { notFound } from "next/navigation";
import AnalyticalApplicationDocument from "@/components/applications/analytical-documents/AnalyticalApplicationDocument";
import AnalyticalInstrumentsLandingShell from "@/components/applications/analytical-instruments/AnalyticalInstrumentsLandingShell";
import { createEnglishApplicationData } from "@/data/applications/application-english";
import { analyticalDocuments, getAnalyticalDocumentMetadata } from "@/data/applications/analytical-documents/registry";
import { isLiquidChromatographySlug } from "@/data/applications/analytical-documents/liquid-chromatography";
import { createAnalyticalDocumentMetadata, createAnalyticalDocumentSchema, getEnglishAnalyticalDocument } from "@/services/applications/analytical-documents";
import { getAnalyticalInstrumentsApplicationPageData } from "@/services/applications/analytical-instruments/getAnalyticalInstrumentsApplicationPageData";

import "@/app/applications/analytical-instruments/analytical-instruments-application.css";
import "@/app/applications/ivd/ivd-application.css";

type Props = { params: Promise<{ locale: string; slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return analyticalDocuments.filter((document) => document.slug).map(({ slug }) => ({ locale: "en", slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const document = getAnalyticalDocumentMetadata(slug);
  if (locale !== "en" || !document || !slug) notFound();
  return createAnalyticalDocumentMetadata(document);
}

export default async function AnalyticalDocumentPage({ params }: Props) {
  const { locale, slug } = await params;
  if (locale !== "en") notFound();
  const document = await getEnglishAnalyticalDocument(slug);
  if (!document || !slug) notFound();
  const landingData = createEnglishApplicationData(
    "analytical-instruments",
    getAnalyticalInstrumentsApplicationPageData(locale),
  );
  if (isLiquidChromatographySlug(slug)) {
    landingData.hero = {
      ...landingData.hero,
      title: "Fluid Handling for",
      highlight: "Liquid Chromatography",
      description: "Pump selection for autosampler metering, needle washing, waste removal and method-specific post-column reagent dosing.",
    };
    // Keep the shared three-level application breadcrumb; the sidebar owns task depth.
    landingData.cta = {
      title: "Discuss your liquid chromatography fluid path",
      description: "Share the liquid, required dose or flow, pressure in each operating state, cycle time and acceptance criteria so we can evaluate a suitable configuration.",
      buttonLabel: "Contact Us",
      href: "/en/contact/",
    };
  }
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(createAnalyticalDocumentSchema(document)).replace(/</g, "\\u003c") }} />
    <AnalyticalInstrumentsLandingShell data={landingData}>
      <AnalyticalApplicationDocument document={document} embedded />
    </AnalyticalInstrumentsLandingShell>
  </>;
}
