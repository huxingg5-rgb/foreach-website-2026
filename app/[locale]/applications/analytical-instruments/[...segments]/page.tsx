import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import EnglishReviewPage, { reviewMetadata } from '@/components/applications/EnglishReviewPage';
import { getReviewDocument } from '@/services/applications/english-review';
import { getApplicationStaticParams, resolveApplicationRoute } from '@/data/applications/application-routes';
import { getCanonicalUrl } from '@/lib/seo/site-url';
import AnalyticalApplicationDocument from '@/components/applications/analytical-documents/AnalyticalApplicationDocument';
import AnalyticalInstrumentsLandingShell from '@/components/applications/analytical-instruments/AnalyticalInstrumentsLandingShell';
import { createEnglishApplicationData } from '@/data/applications/application-english';
import { createAnalyticalDocumentMetadata, createAnalyticalDocumentSchema } from '@/services/applications/analytical-documents';
import { getAnalyticalInstrumentsApplicationPageData } from '@/services/applications/analytical-instruments/getAnalyticalInstrumentsApplicationPageData';
import '@/app/applications/analytical-instruments/analytical-instruments-application.css';
import '@/app/applications/ivd/ivd-application.css';

type Props = { params: Promise<{ locale: string; segments: string[] }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getApplicationStaticParams('analytical-instruments');
}

async function loadPage(params: Props['params']) {
  const { locale, segments } = await params;
  if (locale !== 'en') notFound();
  const route = resolveApplicationRoute('analytical-instruments', segments);
  if (!route) notFound();
  const document = await getReviewDocument(route.kind, route.slug);
  if (!document) notFound();
  return { route, document, locale };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { route, document } = await loadPage(params);
  if (route.template === 'analytical') return createAnalyticalDocumentMetadata(document);
  return {
    ...reviewMetadata(document),
    alternates: { canonical: getCanonicalUrl(route.path) },
  };
}

export default async function Page({ params }: Props) {
  const { route, document, locale } = await loadPage(params);
  if (route.template === 'analytical') {
    const landingData = createEnglishApplicationData('analytical-instruments', getAnalyticalInstrumentsApplicationPageData(locale));
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
    return <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(createAnalyticalDocumentSchema(document)).replace(/</g, '\\u003c') }} />
      <AnalyticalInstrumentsLandingShell data={landingData}>
        <AnalyticalApplicationDocument document={document} embedded />
      </AnalyticalInstrumentsLandingShell>
    </>;
  }
  return <EnglishReviewPage kind={route.kind} document={document} currentHref={route.path} />;
}

