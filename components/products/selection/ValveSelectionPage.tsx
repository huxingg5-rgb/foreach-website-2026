import { Suspense } from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ProductPageSkeleton from '@/components/common/ProductPageSkeleton';
import ProductSelectionClient from './ProductSelectionClient';
import RelatedResources from '@/components/common/related-resources/RelatedResources';
import { getMrv3Content } from '@/data/products/detail/mrv3-content';
import { getSolenoidContent } from '@/data/products/detail/solenoid-content';
import { getHpValveIntro } from '@/data/products/selection/hp-valve-intro';
import { getValveSeriesRoute, getValveSelectionPath, normalizeValveLocale, valveLocales } from '@/data/products/selection/valve-routes';
import { buildProductSocialMetadata } from '@/lib/seo/product-social-metadata';
import '@/app/products/products.css';

export function getValveSelectionMetadata(slug: string, locale: string): Metadata {
  const route = getValveSeriesRoute(slug);
  if (!route) return {};
  const language = normalizeValveLocale(locale);
  const copy = getMrv3Content(slug, language) || getSolenoidContent(slug, language);
  const hp = getHpValveIntro(language);
  const title = copy?.seoTitle || hp.title;
  const description = copy?.seoDescription || hp.paragraphs[0];
  const canonical = getValveSelectionPath(language, slug);
  return {
    title, description, robots:{index:true, follow:true},
    ...buildProductSocialMetadata({data:copy || {image:hp.image.src, imageAlt:hp.image.alt}, title, description, canonicalUrl:canonical}),
    alternates:{canonical, languages:{
      ...Object.fromEntries(valveLocales.map(lang => [lang === 'zh' ? 'zh-CN' : lang, getValveSelectionPath(lang,slug)])),
      'x-default': getValveSelectionPath('zh',slug),
    }},
  };
}
export default function ValveSelectionPage({slug,locale}:{slug:string;locale:string}) {
  const route = getValveSeriesRoute(slug);
  if (!route) notFound();
  return <><Suspense fallback={<ProductPageSkeleton variant="selection" />}>
    <ProductSelectionClient key={locale + '/' + slug} locale={normalizeValveLocale(locale)} initialCategoryId="valves" initialProductTypeId={route.productTypeId} />
  </Suspense>
    {locale === "en" && slug === "solenoid-valves" && <RelatedResources
      sourceType="product" sourceSlug={slug} relationKeys={["series:6010"]} locale="en" />}
  </>;
}
