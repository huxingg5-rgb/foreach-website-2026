import {getSolenoidConfiguration, getSolenoidDrawingPdfUrl, getSolenoidModelAsset} from "@/data/products/detail/solenoid-configurations";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ProductDetailClient from "./ProductDetailClient";
import { getInstrumentProductSections } from "./InstrumentProductSections";
import RelatedResourcesLoader from "@/components/common/related-resources/RelatedResourcesLoader";
import { localizeHindiRelatedResources, localizeItalianRelatedResources } from "@/components/common/related-resources/RelatedResources";
import { getGermanRelatedArticles } from "@/services/resources/technical-articles/getGermanRelatedArticles";
import { getGermanDraftLink, getHindiDraftLink, getItalianDraftLink } from "@/lib/i18n/draft-languages";
import { getRelatedResourcesData } from "@/services/resources/getRelatedResourcesData";
import { getSv10RelatedVideo } from "@/data/resources/installation-guide/installation-guide.sv10.en";
import RelatedProducts from "@/components/common/related-resources/RelatedProducts";
import { getTubingAssemblySelectionContent } from "@/data/products/tubing-assemblies/localized";
import { getGermanTubingAssemblySelectionContent } from "@/data/products/tubing-assemblies/selection.de";
import { getTubingGalleryData } from "@/data/products/tubing/gallery";
import { getBarbedSolenoidRelatedProducts } from "@/services/resources/getSolenoidRelatedProducts";
import type { ProductDetailPageData } from "@/data/products/detail/product-detail.types";
import { getSolenoidContent, solenoidBasePath, solenoidLocales } from "@/data/products/detail/solenoid-content";
import { normalizeValveLocale } from "@/data/products/selection/valve-routes";
import valveDetails from "@/data/products/generated/valves/detail/index.json";
import { buildProductSocialMetadata } from "@/lib/seo/product-social-metadata";
import { getCanonicalUrl } from "@/lib/seo/site-url";
import { getTubingMaterialCopy } from "@/data/products/tubing/content";

export function getSolenoidMetadata(slug: string, locale: string): Metadata {
  const copy = getSolenoidContent(slug, locale);
  if (!copy) return {};
  const basePath = `${solenoidBasePath}${slug === "solenoid-valves" ? "" : `${slug}/`}`;
  if (locale === "it" || locale === "hi") {
    const canonical = getCanonicalUrl(copy.detailHref);
    const social = buildProductSocialMetadata({ data: copy, title: copy.seoTitle, description: copy.seoDescription, canonicalUrl: canonical });
    return { ...social, title: { absolute: copy.seoTitle }, description: copy.seoDescription,
      openGraph: { ...social.openGraph, locale: locale === "hi" ? "hi_IN" : "it_IT" },
      alternates: { canonical }, robots: { index: false, follow: true } };
  }
  if (locale === "de") {
    const social = buildProductSocialMetadata({data: copy, title: copy.seoTitle, description: copy.seoDescription, canonicalUrl: copy.detailHref});
    return { ...social, title: {absolute: copy.seoTitle}, description: copy.seoDescription,
      openGraph: { ...social.openGraph, locale: "de_DE" },
      alternates: {canonical: copy.detailHref}, robots: {index: false, follow: true} };
  }
  return {
    title: copy.seoTitle, description: copy.seoDescription,
    ...buildProductSocialMetadata({data: copy, title: copy.seoTitle, description: copy.seoDescription, canonicalUrl: copy.detailHref}),
    alternates: {canonical: copy.detailHref, languages: {
      ...Object.fromEntries(solenoidLocales.map(language => [language === "zh" ? "zh-CN" : language, `${language === "zh" ? "" : `/${language}`}${basePath}`])),
      "x-default": basePath,
    }},
  };
}

export default function SolenoidConfigurationPage({slug, locale}: {slug: string; locale: string}) {
  const copy = getSolenoidContent(slug, locale);
  const base = valveDetails.find(item => item.slug === "solenoid-valves");
  if (!copy || !base) notFound();
  const configuration = getSolenoidConfiguration(slug);
  const asset = getSolenoidModelAsset(slug);
  const drawingPdfUrl = getSolenoidDrawingPdfUrl(slug, locale);
  const data = {...base, ...copy, mainImage: copy.mainImage || base.image, imageAlt: copy.imageAlt || copy.title,
    additionalImages: copy.additionalImages, additionalImageAlts: copy.additionalImageAlts, thumbnails: [], images: [],
    showDrawingRequest: true, show3DRequest: false, showDatasheetRequest: false,
    drawing2dUrl: drawingPdfUrl || "", model3dUrl: asset ? `/models/valves/6010/viewer.html?v=fcadl01-20261026&model=${asset}&lang=${locale}` : "", datasheetUrl: "",
  } as unknown as ProductDetailPageData;
  const detailCopy = locale === "de" || locale === "it" || locale === "hi" ? {
    title: copy.h1Title, description: copy.description, faqs: copy.faqs, imageAlt: copy.imageAlt,
    bottomCta: {title: copy.bottomCtaTitle, description: copy.bottomCtaDescription,
      buttonText: copy.bottomCtaButtonText, href: copy.bottomCtaHref},
  } : undefined;
  const germanDetail = locale === "de" ? detailCopy : undefined;
  const localizedDetail: Parameters<typeof ProductDetailClient>[0]["localizedDetail"] = (locale === "it" || locale === "hi") && detailCopy ? { locale, copy: detailCopy } : undefined;
  const language = normalizeValveLocale(detailCopy ? "en" : locale);
  const resourceLocale = language === "zh" ? "zh-CN" : language;
  const uiLocale = localizedDetail ? localizedDetail.locale : germanDetail ? "de" : undefined;
  const resources = getRelatedResourcesData({sourceType: "product", sourceSlug: slug, relationKeys: ["series:6010"], locale: resourceLocale, uiLocale});
  if (germanDetail) resources.articles = getGermanRelatedArticles(resources.articles);
  if (resourceLocale !== "zh-CN") {
    const overviewVideo = getSv10RelatedVideo(uiLocale === "hi" ? "en" : uiLocale ?? resourceLocale);
    resources.videos = [overviewVideo, ...resources.videos.filter(video => video.id !== overviewVideo.id)];
  }
  const relatedProducts = configuration?.connection === "threaded" ? (germanDetail
    ? getGermanTubingAssemblySelectionContent() : getTubingAssemblySelectionContent(localizedDetail?.locale ?? resourceLocale)).cards
    .filter(card => card.productTypeId === "flanged-tubing")
    .map(card => ({
      id: card.productId, title: card.cardTitle, href: card.detailHref!,
      imageSrc: `/images/products/tubing-assemblies/related/${card.productId}-square.webp`,
      imageAlt: card.imageAlt || card.cardTitle,
    })) : configuration?.connection === "barbed" ? getBarbedSolenoidRelatedProducts(resourceLocale) : [];
  const productCards = germanDetail ? relatedProducts.map(card => {
    const {href, hrefLang} = getGermanDraftLink(card.href);
    if (card.id === "pvc-tubing") {
      const imageAlt = getTubingGalleryData(card.id, "de")?.additionalImageAlts[0] ?? "PVC-Schläuche";
      return {...card, title: "PVC-Schläuche", imageAlt, href, destinationLanguage: hrefLang};
    }
    return {...card, href, destinationLanguage: hrefLang};
  }) : localizedDetail ? relatedProducts.map(card => {
    const { href, hrefLang } = localizedDetail.locale === "hi" ? getHindiDraftLink(card.href) : getItalianDraftLink(card.href);
    const tubing = card.id === "pvc-tubing" ? getTubingMaterialCopy(card.id, localizedDetail.locale) : undefined;
    return { ...card, href, destinationLanguage: hrefLang,
      ...(tubing ? { title: tubing.cardTitle, imageAlt: tubing.imageAlt } : {}) };
  }) : relatedProducts;
  return <ProductDetailClient data={data} germanDetail={germanDetail} localizedDetail={localizedDetail}
    {...getInstrumentProductSections(slug, uiLocale ?? language)} afterContent={
    <>
    <RelatedResourcesLoader {...(localizedDetail?.locale === "hi" ? localizeHindiRelatedResources(resources) : localizedDetail ? localizeItalianRelatedResources(resources) : resources)} uiLocale={uiLocale} />
    <RelatedProducts locale={resourceLocale} uiLocale={uiLocale} products={productCards} />
    </>
  } />;
}
