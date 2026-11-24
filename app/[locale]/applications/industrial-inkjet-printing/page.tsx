import { notFound } from 'next/navigation';
import IndustrialInkjetReviewPage, { getInkjetPageMetadata } from '@/components/applications/IndustrialInkjetReviewPage';
import { getLocalizedInkjetPage, inkjetLocales, isInkjetLocale } from '@/data/applications/industrial-inkjet-localized';

type Props = { params: Promise<{ locale: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return inkjetLocales.map(locale => ({ locale }));
}

async function loadPage(params: Props['params']) {
  const { locale } = await params;
  if (!isInkjetLocale(locale)) notFound();
  return getLocalizedInkjetPage(locale, 'hub');
}

export async function generateMetadata({ params }: Props) {
  return getInkjetPageMetadata(await loadPage(params));
}

export default async function Page({ params }: Props) {
  return <IndustrialInkjetReviewPage page={await loadPage(params)} />;
}
