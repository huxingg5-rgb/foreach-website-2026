import { notFound } from 'next/navigation';
import IndustrialInkjetReviewPage, { getInkjetPageMetadata } from '@/components/applications/IndustrialInkjetReviewPage';
import { getInkjetRouteKey, getLocalizedInkjetPage, inkjetLocales, inkjetRouteKeys, isInkjetLocale } from '@/data/applications/industrial-inkjet-localized';
import routes from '@/data/applications/industrial-inkjet-routes.json';

type Props = { params: Promise<{ locale: string; segments: string[] }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return inkjetRouteKeys.filter(key => key !== 'hub').flatMap(key => {
    const segments = routes[key].slice(routes.hub.length, -1).split('/');
    return inkjetLocales.map(locale => ({ locale, segments }));
  });
}

async function loadPage(params: Props['params']) {
  const { locale, segments } = await params;
  if (!isInkjetLocale(locale)) notFound();
  const key = getInkjetRouteKey(routes.hub + segments.join('/') + '/');
  if (!key || key === 'hub') notFound();
  return getLocalizedInkjetPage(locale, key);
}

export async function generateMetadata({ params }: Props) {
  return getInkjetPageMetadata(await loadPage(params));
}

export default async function Page({ params }: Props) {
  return <IndustrialInkjetReviewPage page={await loadPage(params)} />;
}
