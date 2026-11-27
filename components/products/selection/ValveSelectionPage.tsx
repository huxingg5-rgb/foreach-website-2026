import { Suspense } from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ProductPageSkeleton from '@/components/common/ProductPageSkeleton';
import ProductSelectionClient from './ProductSelectionClient';
import { getMrv3Content } from '@/data/products/detail/mrv3-content';
import { getSolenoidContent } from '@/data/products/detail/solenoid-content';
import { getHindiValveSelectionIntro } from '@/data/products/selection/valve-selection.hi';
import { getHpValveIntro } from '@/data/products/selection/hp-valve-intro';
import { getValveSeriesRoute, getValveSelectionPath, normalizeValveLocale, valveLocales } from '@/data/products/selection/valve-routes';
import { getCanonicalUrl } from "@/lib/seo/site-url";
import { buildProductSocialMetadata } from '@/lib/seo/product-social-metadata';
import { languageDraftsEnabled } from '@/lib/i18n/draft-languages';
import { getMrv3SeriesImage } from '@/data/products/selection/mrv3-series-image';
import { getSolenoidSeriesIntroImage } from '@/data/products/detail/solenoid-images';
import '@/app/products/products.css';

export function getValveSelectionMetadata(slug: string, locale: string): Metadata {
  const route = getValveSeriesRoute(slug);
  if (!route) return {};
  if (locale === "hi") {
    const copy = getHindiValveSelectionIntro(slug);
    if (!copy) return {};
    const title = copy.title + " | FOREACH";
    const description = copy.paragraphs[0];
    const canonical = getCanonicalUrl("/hi" + getValveSelectionPath("zh", slug));
    const image = slug === "rotary-valves" ? getMrv3SeriesImage("en")
      : slug === "solenoid-valves" ? getSolenoidSeriesIntroImage("en") : getHpValveIntro("en").image;
    const social = buildProductSocialMetadata({ data: { image: image.src, imageAlt: copy.imageAlt }, title, description, canonicalUrl: canonical });
    return { ...social, title: { absolute: title }, description, alternates: { canonical }, robots: { index: false, follow: true },
      openGraph: { ...social.openGraph, locale: "hi_IN" } };
  }
  if (locale === "it") {
    const copy = getMrv3Content(slug, "it") || getSolenoidContent(slug, "it");
    const hp = getHpValveIntro("it");
    const title = copy?.seoTitle ?? hp.title + " | FOREACH";
    const description = copy?.seoDescription ?? hp.paragraphs[0];
    const canonical = getCanonicalUrl("/it" + getValveSelectionPath("zh", slug));
    const image = slug === "rotary-valves" ? getMrv3SeriesImage("it") : slug === "solenoid-valves" ? getSolenoidSeriesIntroImage("it") : hp.image;
    const social = buildProductSocialMetadata({ data: { image: image.src, imageAlt: image.alt }, title, description, canonicalUrl: canonical });
    return { ...social, title: { absolute: title }, description, alternates: { canonical }, robots: { index: false, follow: true },
      openGraph: { ...social.openGraph, locale: "it_IT" } };
  }
  const language = normalizeValveLocale(locale);
  const germanDraft = locale === "de" && languageDraftsEnabled;
  const active = germanDraft ? "de" : language;
  const copy = getMrv3Content(slug, active) || getSolenoidContent(slug, active);
  const hp = getHpValveIntro(active);
  const title = copy?.seoTitle || hp.title;
  const description = copy?.seoDescription || hp.paragraphs[0];
  if (germanDraft) {
    const image = slug === "rotary-valves" ? getMrv3SeriesImage("de")
      : slug === "solenoid-valves" ? getSolenoidSeriesIntroImage("de") : hp.image;
    const canonical = "/de" + getValveSelectionPath("zh", slug);
    const social = buildProductSocialMetadata({data: {image:image.src, imageAlt:image.alt}, title, description, canonicalUrl:canonical});
    return {...social, title:{absolute:title}, description, alternates:{canonical},
      robots:{index:false, follow:true}, openGraph:{...social.openGraph, locale:"de_DE"}};
  }
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
  return <Suspense fallback={<ProductPageSkeleton variant="selection" />}>
    <ProductSelectionClient key={locale + '/' + slug} locale={normalizeValveLocale(locale === "it" || locale === "hi" ? "en" : locale)} contentLocale={locale === "it" || locale === "hi" ? locale : undefined} initialCategoryId="valves" initialProductTypeId={route.productTypeId} />
  </Suspense>;
}
