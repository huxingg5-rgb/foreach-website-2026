import { withPublishedTranslationMetadata } from "@/lib/seo/published-translation-metadata";
import { notFound } from 'next/navigation';
import InternationalApplicationPage from '@/components/applications/InternationalApplicationPage';
import { isApplicationTranslationLocale, localizedApplicationStaticParams, localizedApplicationAlternates } from '@/data/applications/international-locales/routes';
import { getLocalizedApplicationDocument, getLocalizedApplicationMetadata } from '@/services/applications/international-localized';
/* =========================================================
   page.tsx
   恒永达官网｜分析仪器应用领域外语页面入口
========================================================= */

import type { Metadata } from "next";
import { isLocalizedHindiDraftPath, isLocalizedItalianDraftPath, languageDraftsEnabled } from "@/lib/i18n/draft-languages";
import hindiCopy from "@/data/applications/hindi-hub-locales/analytical-instruments.json";
import { getHindiApplicationResources, getHindiApplicationSchema, getHindiApplicationTranslation, hindiApplicationLabels, hindiApplicationMetadata, localizeHindiApplication, translateHindiApplication } from "@/services/applications/hindi-application";
import italianCopy from "@/data/applications/italian-hub-locales/analytical-instruments.json";
import { getItalianApplicationSchema, getItalianReviewResources, italianApplicationLabels, italianApplicationMetadata, translateItalianApplication } from "@/services/applications/italian-review";
import germanCopy from "@/data/applications/german-hub-locales/analytical-instruments.json";
import { germanApplicationLabels, germanApplicationMetadata, getGermanApplicationSchema, getGermanReviewResources, translateGermanApplication } from "@/services/applications/german-review";

import AnalyticalInstrumentsQueryView from "@/components/applications/analytical-instruments/AnalyticalInstrumentsQueryView";
import AnalyticalApplicationDocument from "@/components/applications/analytical-documents/AnalyticalApplicationDocument";
import AnalyticalInstrumentsLandingShell from "@/components/applications/analytical-instruments/AnalyticalInstrumentsLandingShell";
import { analyticalDocuments } from "@/data/applications/analytical-documents/registry";
import { createEnglishApplicationData } from "@/data/applications/application-english";
import { createAnalyticalDocumentMetadata, createAnalyticalDocumentSchema, getEnglishAnalyticalDocument } from "@/services/applications/analytical-documents";
import { getAnalyticalInstrumentsApplicationPageData } from "@/services/applications/analytical-instruments/getAnalyticalInstrumentsApplicationPageData";

import "@/app/applications/analytical-instruments/analytical-instruments-application.css";
import "@/app/applications/ivd/ivd-application.css";

const italianPath = "/it/applications/analytical-instruments/";
const hasItalian = () => isLocalizedItalianDraftPath(italianPath);
const hindiPath = "/hi/applications/analytical-instruments/";
const hasHindi = () => isLocalizedHindiDraftPath(hindiPath);
const ENABLED_LOCALES = ["en", "es", "fr", "ko", "ru"] as const;

type AnalyticalInstrumentsApplicationLocalePageProps = {
  params: Promise<{
    locale: string;
  }>;
};

export function generateStaticParams() {
  return [...ENABLED_LOCALES, ...(languageDraftsEnabled ? ["de"] : []), ...(hasItalian() ? ["it"] : []), ...(hasHindi() ? ["hi"] : [])].map(locale => ({ locale }));
}


async function getPageMetadata({
  params,
}: AnalyticalInstrumentsApplicationLocalePageProps): Promise<Metadata> {
  const { locale } = await params;

  if (languageDraftsEnabled && locale === "de") {
    return germanApplicationMetadata(createAnalyticalDocumentMetadata(analyticalDocuments[0]), "analytical-instruments", germanCopy);
  }

  if (locale === "it" && hasItalian()) {
    return italianApplicationMetadata(createAnalyticalDocumentMetadata(analyticalDocuments[0]), italianCopy, "/en/applications/analytical-instruments/");
  }

  if (locale === "hi" && hasHindi()) {
    return hindiApplicationMetadata(createAnalyticalDocumentMetadata(analyticalDocuments[0]), hindiCopy, "/en/applications/analytical-instruments/");
  }
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
  const german = languageDraftsEnabled && locale === "de";
  const italian = locale === "it" && hasItalian();

  const hindi = locale === "hi" && hasHindi();
  if (locale === "en" || german || italian || hindi) {
    const source = await getEnglishAnalyticalDocument("");
    if (!source) throw new Error("Missing English analytical application overview");
    const data = createEnglishApplicationData("analytical-instruments", getAnalyticalInstrumentsApplicationPageData("en"));
    const translateHindi = (text: string) => getHindiApplicationTranslation(hindiCopy, text, "analytical-instruments");
    const document = german ? translateGermanApplication(source, germanCopy) : italian ? translateItalianApplication(source, italianCopy) : hindi ? localizeHindiApplication(source, translateHindi) : source;
    const landingData = german ? {
      ...data,
      breadcrumb: translateGermanApplication(data.breadcrumb, germanCopy),
      cta: translateGermanApplication(data.cta, germanCopy),
    } : italian ? {
      ...data,
      breadcrumb: translateItalianApplication(data.breadcrumb, italianCopy),
      cta: translateItalianApplication(data.cta, italianCopy),
    } : hindi ? {
      ...data,
      breadcrumb: translateHindiApplication(data.breadcrumb, translateHindi),
      cta: translateHindiApplication(data.cta, translateHindi),
    } : data;
    const schema = german
      ? getGermanApplicationSchema(document, "/de/applications/analytical-instruments/", landingData.breadcrumb)
      : italian ? getItalianApplicationSchema(document, italianPath, landingData.breadcrumb) : hindi ? getHindiApplicationSchema(document, hindiPath, landingData.breadcrumb) : createAnalyticalDocumentSchema(document);
    return (
      <>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
        <AnalyticalInstrumentsQueryView data={landingData} italian={italian} hindi={hindi}>
          <AnalyticalInstrumentsLandingShell data={landingData} showInstrumentNavigation={false} lang={hindi ? "hi-IN" : undefined}
            breadcrumbAriaLabel={german ? "Navigation im Anwendungsbereich" : italian ? "Navigazione tra le applicazioni" : hindi ? "अनुप्रयोगों का नेविगेशन" : undefined}>
            <AnalyticalApplicationDocument document={document} embedded locale={german ? "de" : italian ? "it" : hindi ? "hi-IN" : undefined}
              labels={german ? germanApplicationLabels : italian ? italianApplicationLabels : hindi ? hindiApplicationLabels : undefined}
              italianCopy={italian ? italianCopy : undefined}
              hindiCopy={hindi ? hindiCopy : undefined}
              localizeRelatedResources={german ? resources => getGermanReviewResources(resources, germanCopy) : italian ? resources => getItalianReviewResources(resources, italianCopy) : hindi ? resources => getHindiApplicationResources(resources, translateHindi) : undefined} />
          </AnalyticalInstrumentsLandingShell>
        </AnalyticalInstrumentsQueryView>
      </>
    );
  }

  if (!isApplicationTranslationLocale(locale)) notFound();
  return <InternationalApplicationPage locale={locale} kind="analytical-instruments" document={await getLocalizedApplicationDocument(locale, 'analytical-instruments')} />;
}

export const generateMetadata = withPublishedTranslationMetadata("/applications/analytical-instruments/", getPageMetadata);
