import { withPublishedTranslationMetadata } from "@/lib/seo/published-translation-metadata";
import InternationalApplicationPage from '@/components/applications/InternationalApplicationPage';
import { isApplicationTranslationLocale, localizedApplicationStaticParams, localizedApplicationAlternates } from '@/data/applications/international-locales/routes';
import { getLocalizedApplicationDocument, getLocalizedApplicationMetadata } from '@/services/applications/international-localized';
import { getGermanChildApplicationCopy, getGermanChildApplicationStaticParams, germanApplicationLabels, germanApplicationMetadata, getGermanApplicationSchema, getGermanReviewResources, translateGermanApplication } from '@/services/applications/german-review';
import { getItalianChildApplicationCopy, getItalianChildApplicationStaticParams, italianApplicationMetadata, getItalianApplicationSchema, getItalianReviewResources, italianApplicationLabels, localizeItalianApplicationDocument, translateItalianApplication } from '@/services/applications/italian-review';
import { getHindiChildApplicationCopy, getHindiChildApplicationStaticParams } from '@/services/applications/hindi-review-children';
import { getHindiApplicationResources, getHindiApplicationSchema, getHindiApplicationTranslation, hindiApplicationLabels, hindiApplicationMetadata, localizeHindiApplication, translateHindiApplication } from '@/services/applications/hindi-application';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import EnglishReviewPage, { germanReviewMetadata, reviewMetadata } from '@/components/applications/EnglishReviewPage';
import { getReviewDocument } from '@/services/applications/english-review';
import { resolveApplicationRoute } from '@/data/applications/application-routes';
import AnalyticalApplicationDocument from '@/components/applications/analytical-documents/AnalyticalApplicationDocument';
import AnalyticalInstrumentsLandingShell from '@/components/applications/analytical-instruments/AnalyticalInstrumentsLandingShell';
import { createEnglishApplicationData } from '@/data/applications/application-english';
import { getDraftHrefForEnglish } from '@/lib/i18n/draft-languages';
import { createAnalyticalDocumentMetadata, createAnalyticalDocumentSchema } from '@/services/applications/analytical-documents';
import { getAnalyticalInstrumentsApplicationPageData } from '@/services/applications/analytical-instruments/getAnalyticalInstrumentsApplicationPageData';
import '@/app/applications/analytical-instruments/analytical-instruments-application.css';
import '@/app/applications/ivd/ivd-application.css';

type Props = { params: Promise<{ locale: string; segments: string[] }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return [...localizedApplicationStaticParams('analytical-instruments'), ...getGermanChildApplicationStaticParams('analytical-instruments'), ...getItalianChildApplicationStaticParams('analytical-instruments'), ...getHindiChildApplicationStaticParams('analytical-instruments')];
}

async function loadPage(params: Props['params']) {
  const { locale, segments } = await params;
  if (locale !== 'en' && locale !== 'de' && locale !== 'it' && locale !== 'hi' && !isApplicationTranslationLocale(locale)) notFound();
  const route = resolveApplicationRoute('analytical-instruments', segments);
  if (!route) notFound();
  const germanCopy = locale === 'de' ? await getGermanChildApplicationCopy(route) : undefined;
  if (locale === 'de' && !germanCopy) notFound();
  const italianCopy = locale === 'it' ? await getItalianChildApplicationCopy(route) : undefined;
  if (locale === 'it' && !italianCopy) notFound();
  const hindiCopy = locale === 'hi' ? await getHindiChildApplicationCopy(route) : undefined;
  if (locale === 'hi' && !hindiCopy) notFound();
  const document = locale === 'en' || locale === 'de' || locale === 'it' || locale === 'hi' ? await getReviewDocument(route.kind, route.slug)
    : await getLocalizedApplicationDocument(locale, route.kind, route.slug);
  if (!document) notFound();
  return { route, document, locale, germanCopy, italianCopy, hindiCopy };
}

async function getPageMetadata({ params }: Props): Promise<Metadata> {
  const { route, document, locale, germanCopy, italianCopy, hindiCopy } = await loadPage(params);
  if (isApplicationTranslationLocale(locale)) return getLocalizedApplicationMetadata(locale, route.kind, document);
  if (route.template === 'analytical') {
    const metadata = createAnalyticalDocumentMetadata(document);
    return germanCopy ? germanApplicationMetadata(metadata, route.kind, germanCopy, route.path)
      : italianCopy ? italianApplicationMetadata(metadata, italianCopy, route.path)
        : hindiCopy ? hindiApplicationMetadata(metadata, hindiCopy, route.path) : metadata;
  }
  if (germanCopy) return germanReviewMetadata(document, route.kind, germanCopy, route.path);
  if (italianCopy) return italianApplicationMetadata(reviewMetadata(document, route.kind), italianCopy, route.path);
  if (hindiCopy) return hindiApplicationMetadata(reviewMetadata(document, route.kind), hindiCopy, route.path);
  return {
    ...reviewMetadata(document, route.kind),
    alternates: localizedApplicationAlternates('en', route.kind, route.slug),
  };
}

export default async function Page({ params }: Props) {
  const { route, document, locale, germanCopy, italianCopy, hindiCopy } = await loadPage(params);
  if (isApplicationTranslationLocale(locale)) return <InternationalApplicationPage locale={locale} kind={route.kind} document={document} />;
  if (route.template === 'analytical') {
    const landingData = createEnglishApplicationData('analytical-instruments', getAnalyticalInstrumentsApplicationPageData('en'));
    landingData.hero = {
      ...landingData.hero,
      title: 'Fluid Handling for',
      highlight: 'Liquid Chromatography',
      description: 'Pump selection for autosampler metering, needle washing, waste removal and method-specific post-column reagent dosing.',
    };
    landingData.cta = {
      title: 'Discuss your liquid chromatography fluid path',
      description: 'Share the liquid, required dose or flow, pressure in each operating state, cycle time and acceptance criteria so we can evaluate a suitable configuration.',
      buttonLabel: 'Contact Us',
      href: '/en/contact/',
    };
    const translateHindi = hindiCopy ? (text: string) => getHindiApplicationTranslation(hindiCopy, text, route.path) : undefined;
    const localizedDocument = germanCopy ? translateGermanApplication(document, germanCopy)
      : italianCopy ? localizeItalianApplicationDocument(document, italianCopy)
        : translateHindi ? localizeHindiApplication(document, translateHindi) : document;
    const localizedData = germanCopy ? {
      ...landingData,
      breadcrumb: translateGermanApplication(landingData.breadcrumb, germanCopy),
      cta: translateGermanApplication(landingData.cta, germanCopy),
    } : italianCopy ? {
      ...landingData,
      breadcrumb: translateItalianApplication(landingData.breadcrumb, italianCopy),
      cta: translateItalianApplication(landingData.cta, italianCopy),
    } : translateHindi ? {
      ...landingData,
      breadcrumb: translateHindiApplication(landingData.breadcrumb, translateHindi),
      cta: translateHindiApplication(landingData.cta, translateHindi),
    } : landingData;
    const schema = germanCopy
      ? getGermanApplicationSchema(localizedDocument, getDraftHrefForEnglish(route.path, 'de'), localizedData.breadcrumb)
      : italianCopy
        ? getItalianApplicationSchema(localizedDocument, getDraftHrefForEnglish(route.path, 'it'), localizedData.breadcrumb)
        : hindiCopy ? getHindiApplicationSchema(localizedDocument, getDraftHrefForEnglish(route.path, 'hi'), localizedData.breadcrumb)
          : createAnalyticalDocumentSchema(document);
    return <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} />
      <AnalyticalInstrumentsLandingShell data={localizedData} germanCopy={germanCopy} italianCopy={italianCopy}
        hindiCopy={hindiCopy} lang={hindiCopy ? 'hi-IN' : undefined}
        breadcrumbAriaLabel={germanCopy ? 'Navigation im Anwendungsbereich' : italianCopy ? 'Navigazione tra le applicazioni' : hindiCopy ? 'अनुप्रयोगों का नेविगेशन' : undefined}>
        <AnalyticalApplicationDocument document={localizedDocument} embedded locale={germanCopy ? 'de' : italianCopy ? 'it' : hindiCopy ? 'hi-IN' : undefined}
          germanCopy={germanCopy} italianCopy={italianCopy} hindiCopy={hindiCopy} labels={germanCopy ? germanApplicationLabels : italianCopy ? italianApplicationLabels : hindiCopy ? hindiApplicationLabels : undefined}
          localizeRelatedResources={germanCopy ? resources => getGermanReviewResources(resources, germanCopy) : italianCopy ? resources => getItalianReviewResources(resources, italianCopy)
            : translateHindi ? resources => getHindiApplicationResources(resources, translateHindi) : undefined} />
      </AnalyticalInstrumentsLandingShell>
    </>;
  }
  return <EnglishReviewPage kind={route.kind} document={document} currentHref={route.path} germanCopy={germanCopy} italianCopy={italianCopy} hindiCopy={hindiCopy} />;
}

export const generateMetadata = withPublishedTranslationMetadata("/applications/analytical-instruments/[...segments]/", getPageMetadata);
