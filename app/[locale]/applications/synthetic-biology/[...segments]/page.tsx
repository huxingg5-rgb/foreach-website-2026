import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import EnglishReviewPage, { reviewMetadata } from '@/components/applications/EnglishReviewPage';
import { getReviewDocument } from '@/services/applications/english-review';
import { getApplicationStaticParams, resolveApplicationRoute } from '@/data/applications/application-routes';
import { getCanonicalUrl } from '@/lib/seo/site-url';

type Props = { params: Promise<{ locale: string; segments: string[] }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getApplicationStaticParams('synthetic-biology');
}

async function loadPage(params: Props['params']) {
  const { locale, segments } = await params;
  if (locale !== 'en') notFound();
  const route = resolveApplicationRoute('synthetic-biology', segments);
  if (!route) notFound();
  const document = await getReviewDocument(route.kind, route.slug);
  if (!document) notFound();
  return { route, document };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { route, document } = await loadPage(params);
  return {
    ...reviewMetadata(document),
    alternates: { canonical: getCanonicalUrl(route.path) },
  };
}

export default async function Page({ params }: Props) {
  const { route, document } = await loadPage(params);
  return <EnglishReviewPage kind={route.kind} document={document} currentHref={route.path} />;
}

