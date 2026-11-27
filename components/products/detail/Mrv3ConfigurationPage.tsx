import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ProductDetailClient from "./ProductDetailClient";
import { getInstrumentProductSections } from "./InstrumentProductSections";
import RelatedResources from "@/components/common/related-resources/RelatedResources";
import type { ProductDetailPageData } from "@/data/products/detail/product-detail.types";
import { getMrv3Content, mrv3BasePath } from "@/data/products/detail/mrv3-content";
import { mrv3Locales } from "@/data/products/detail/mrv3-locales";
import { normalizeValveLocale } from "@/data/products/selection/valve-routes";
import valveDetails from "@/data/products/generated/valves/detail/index.json";
import { buildProductSocialMetadata } from "@/lib/seo/product-social-metadata";
import { getCanonicalUrl } from "@/lib/seo/site-url";

export function getMrv3Metadata(slug: string, locale: string): Metadata {
  const copy = getMrv3Content(slug, locale);
  if (!copy) return {};
  const basePath = `${mrv3BasePath}${slug === "rotary-valves" ? "" : `${slug}/`}`;
  const path = `${locale === "zh" ? "" : `/${locale}`}${basePath}`;
  if (locale === "it" || locale === "hi") {
    const url = getCanonicalUrl(path);
    const social = buildProductSocialMetadata({ data: copy, title: copy.seoTitle, description: copy.seoDescription, canonicalUrl: url });
    return { ...social, title: { absolute: copy.seoTitle }, description: copy.seoDescription,
      alternates: { canonical: url }, robots: { index: false, follow: true },
      openGraph: { ...social.openGraph, locale: locale === "hi" ? "hi_IN" : "it_IT" } };
  }
  if (locale === "de") return {
    title: { absolute: copy.seoTitle }, description: copy.seoDescription,
    ...buildProductSocialMetadata({ data: copy, title: copy.seoTitle, description: copy.seoDescription, canonicalUrl: path }),
    alternates: { canonical: path },
    robots: { index: false, follow: true },
  };
  return {
    title: copy.seoTitle, description: copy.seoDescription,
    ...buildProductSocialMetadata({ data: copy, title: copy.seoTitle, description: copy.seoDescription, canonicalUrl: path }),
    alternates: {
      canonical: path,
      languages: {
        ...Object.fromEntries(mrv3Locales.map(language => [
          language === "zh" ? "zh-CN" : language,
          `${language === "zh" ? "" : `/${language}`}${basePath}`,
        ])),
        "x-default": basePath,
      },
    },
  };
}

export default function Mrv3ConfigurationPage({ slug, locale }: { slug: string; locale: string }) {
  const copy = getMrv3Content(slug, locale);
  const base = valveDetails.find(item => item.slug === "rotary-valves");
  if (!copy || !base) notFound();
  const data = {
    ...base, ...copy, mainImage: copy.mainImage || base.image, imageAlt: copy.imageAlt || copy.title,
    additionalImages: [], thumbnails: [], images: [],
    showDrawingRequest: true, show3DRequest: false, showDatasheetRequest: false,
    drawing2dUrl: "", model3dUrl: "", datasheetUrl: "",
  } as unknown as ProductDetailPageData;
  const language = normalizeValveLocale(locale);
  const detailCopy = locale === "de" || locale === "it" || locale === "hi" ? {
    title: copy.h1Title,
    description: copy.description,
    faqs: copy.faqs,
    imageAlt: copy.imageAlt,
    bottomCta: { title: copy.bottomCtaTitle, description: copy.bottomCtaDescription,
      buttonText: copy.bottomCtaButtonText, href: copy.bottomCtaHref },
  } : undefined;
  const localizedDetail = (locale === "it" || locale === "hi") && detailCopy ? { locale, copy: detailCopy } as const : undefined;
  return <ProductDetailClient data={data} germanDetail={locale === "de" ? detailCopy : undefined}
    localizedDetail={localizedDetail} {...getInstrumentProductSections(slug, detailCopy ? locale : language)} afterContent={
    <RelatedResources sourceType="product" sourceSlug={slug} relationKeys={["series:mrv3"]}
      locale={detailCopy ? "en" : language === "zh" ? "zh-CN" : language} uiLocale={locale === "hi" || locale === "it" || locale === "de" ? locale : undefined} />
  } />;
}
