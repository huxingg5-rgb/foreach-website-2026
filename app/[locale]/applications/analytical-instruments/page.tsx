import { notFound } from 'next/navigation';
import InternationalApplicationPage from '@/components/applications/InternationalApplicationPage';
import { isApplicationTranslationLocale, localizedApplicationStaticParams, localizedApplicationAlternates } from '@/data/applications/international-locales/routes';
import { getLocalizedApplicationDocument, getLocalizedApplicationMetadata } from '@/services/applications/international-localized';
/* =========================================================
   page.tsx
   恒永达官网｜分析仪器应用领域外语页面入口
========================================================= */

import type { Metadata } from "next";

import AnalyticalInstrumentsQueryView from "@/components/applications/analytical-instruments/AnalyticalInstrumentsQueryView";
import AnalyticalApplicationDocument from "@/components/applications/analytical-documents/AnalyticalApplicationDocument";
import AnalyticalInstrumentsLandingShell from "@/components/applications/analytical-instruments/AnalyticalInstrumentsLandingShell";
import { analyticalDocuments } from "@/data/applications/analytical-documents/registry";
import { createEnglishApplicationData } from "@/data/applications/application-english";
import { createAnalyticalDocumentMetadata, createAnalyticalDocumentSchema, getEnglishAnalyticalDocument } from "@/services/applications/analytical-documents";
import { getAnalyticalInstrumentsApplicationPageData } from "@/services/applications/analytical-instruments/getAnalyticalInstrumentsApplicationPageData";

import "@/app/applications/analytical-instruments/analytical-instruments-application.css";
import "@/app/applications/ivd/ivd-application.css";

const ENABLED_LOCALES = ["en", "es", "fr", "ko", "ru"] as const;

type AnalyticalInstrumentsApplicationLocalePageProps = {
  params: Promise<{
    locale: string;
  }>;
};

export function generateStaticParams() {
  return ENABLED_LOCALES.map((locale) => ({ locale }));
}


export async function generateMetadata({
  params,
}: AnalyticalInstrumentsApplicationLocalePageProps): Promise<Metadata> {
  const { locale } = await params;

  if (locale === "en") {
    return createAnalyticalDocumentMetadata(analyticalDocuments[0]);
  }

  if (!isApplicationTranslationLocale(locale)) notFound();
  return getLocalizedApplicationMetadata(locale, 'analytical-instruments', await getLocalizedApplicationDocument(locale, 'analytical-instruments'));
}

export default async function AnalyticalInstrumentsApplicationLocalePage({
  params,
}: AnalyticalInstrumentsApplicationLocalePageProps) {
  const { locale } = await params;
  const data = getAnalyticalInstrumentsApplicationPageData(locale);

  if (locale === "en") {
    const document = await getEnglishAnalyticalDocument("");
    if (!document) throw new Error("Missing English analytical application overview");
    const landingData = createEnglishApplicationData("analytical-instruments", data);
    return (
      <>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(createAnalyticalDocumentSchema(document)).replace(/</g, "\\u003c") }} />
        <AnalyticalInstrumentsQueryView data={landingData}>
        <AnalyticalInstrumentsLandingShell data={landingData} showInstrumentNavigation={false}>
          <AnalyticalApplicationDocument document={document} embedded />
        </AnalyticalInstrumentsLandingShell>
        </AnalyticalInstrumentsQueryView>
      </>
    );
  }

  if (!isApplicationTranslationLocale(locale)) notFound();
  return <InternationalApplicationPage locale={locale} kind="analytical-instruments" document={await getLocalizedApplicationDocument(locale, 'analytical-instruments')} />;
}
