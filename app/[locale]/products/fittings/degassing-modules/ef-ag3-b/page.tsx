import { withPublishedTranslationMetadata } from "@/lib/seo/published-translation-metadata";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductDetailClient from "@/components/products/detail/ProductDetailClient";
import { DegassingModuleSelection, DegassingModuleDelivery } from "@/components/products/detail/DegassingModuleContent";
import {
  degassingModuleLocales,
  getDegassingModuleCopy,
  getDegassingModuleLanguageAlternates,
  getDegassingModulePageData,
  getDegassingModulePath,
  isDegassingModuleLocale,
  isItalianDegassingModulePublished,
  isHindiDegassingModulePublished,
} from "@/data/products/detail/degassing-module-locales";
import { degassingModuleZh } from "@/data/products/detail/degassing-module.zh";
import { buildProductSocialMetadata } from "@/lib/seo/product-social-metadata";
import { languageDraftsEnabled } from "@/lib/i18n/draft-languages";
import { getCanonicalUrl } from "@/lib/seo/site-url";
import "@/app/products/products.css";

type Props = { params: Promise<{ locale: string }> };
export const dynamicParams = false;
export function generateStaticParams() {
  return [...degassingModuleLocales, ...(languageDraftsEnabled ? ["de"] : []), ...(isItalianDegassingModulePublished() ? ["it"] : []), ...(isHindiDegassingModulePublished() ? ["hi"] : [])].map(locale => ({ locale }));
}

async function getPageMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isDegassingModuleLocale(locale)) return {};
  const copy = getDegassingModuleCopy(locale);
  const canonical = getDegassingModulePath(locale);
  const social = buildProductSocialMetadata({
    data: { mainImage: degassingModuleZh.gallery[0].src, mainImageAlt: copy.galleryAlts[0] },
    title: copy.seoTitle,
    description: copy.description,
    canonicalUrl: canonical,
  });
  return {
    title: { absolute: copy.seoTitle },
    description: copy.description,
    ...social,
    ...((locale === "de" || locale === "it" || locale === "hi") ? {
      alternates: { canonical: getCanonicalUrl(canonical) },
      robots: { index: false, follow: true },
      openGraph: { ...social.openGraph, locale: locale === "it" ? "it_IT" : locale === "hi" ? "hi_IN" : "de_DE" },
    } : { alternates: { canonical, languages: getDegassingModuleLanguageAlternates() } }),
  };
}

export default async function DegassingModuleLocalePage({ params }: Props) {
  const { locale } = await params;
  if (!isDegassingModuleLocale(locale)) notFound();
  const copy = getDegassingModuleCopy(locale);
  const localized = {
    title: copy.name,
    description: copy.introduction,
    imageAlt: copy.galleryAlts[0],
    faqs: [],
  };
  const germanDetail = locale === "de" ? localized : undefined;
  const draftDetail = locale === "it" || locale === "hi" ? { locale, copy: localized } as const : undefined;
  return (
    <ProductDetailClient data={getDegassingModulePageData(locale)} customerCategoryMode="fitting-zh" germanDetail={germanDetail} localizedDetail={draftDetail}
      customerCategoryContent={{
        selection: <DegassingModuleSelection locale={locale} key="selection" />,
        delivery: <DegassingModuleDelivery locale={locale} key="delivery" />,
      }} />
  );
}

export const generateMetadata = withPublishedTranslationMetadata("/products/fittings/degassing-modules/ef-ag3-b/", getPageMetadata);
