import {getSolenoidConfiguration, getSolenoidDrawingAsset} from "@/data/products/detail/solenoid-configurations";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ProductDetailClient from "./ProductDetailClient";
import RelatedResourcesLoader from "@/components/common/related-resources/RelatedResourcesLoader";
import { getRelatedResourcesData } from "@/services/resources/getRelatedResourcesData";
import { getSv10RelatedVideo } from "@/data/resources/installation-guide/installation-guide.sv10.en";
import RelatedProducts from "@/components/common/related-resources/RelatedProducts";
import { getTubingAssemblySelectionContent } from "@/data/products/tubing-assemblies/localized";
import { getBarbedSolenoidRelatedProducts } from "@/services/resources/getSolenoidRelatedProducts";
import type { ProductDetailPageData } from "@/data/products/detail/product-detail.types";
import { getSolenoidContent, solenoidBasePath, solenoidLocales } from "@/data/products/detail/solenoid-content";
import { normalizeValveLocale } from "@/data/products/selection/valve-routes";
import valveDetails from "@/data/products/generated/valves/detail/index.json";
import { buildProductSocialMetadata } from "@/lib/seo/product-social-metadata";

export function getSolenoidMetadata(slug: string, locale: string): Metadata {
  const copy = getSolenoidContent(slug, locale);
  if (!copy) return {};
  const basePath = `${solenoidBasePath}${slug === "solenoid-valves" ? "" : `${slug}/`}`;
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
  const asset = configuration?.assets[0];
  const drawingAsset = getSolenoidDrawingAsset(slug);
  const data = {...base, ...copy, mainImage: copy.mainImage || base.image, imageAlt: copy.imageAlt || copy.title,
    additionalImages: copy.additionalImages, additionalImageAlts: copy.additionalImageAlts, thumbnails: [], images: [],
    showDrawingRequest: true, show3DRequest: false, showDatasheetRequest: false,
    drawing2dUrl: drawingAsset ? `/models/valves/6010/${drawingAsset}.png` : "", model3dUrl: asset ? `/models/valves/6010/viewer.html?v=fcadl01-20261026&model=${asset}&lang=${locale}` : "", datasheetUrl: "",
  } as unknown as ProductDetailPageData;
  const language = normalizeValveLocale(locale);
  const resourceLocale = language === "zh" ? "zh-CN" : language;
  const resources = getRelatedResourcesData({sourceType: "product", sourceSlug: slug, relationKeys: ["series:6010"], locale: resourceLocale});
  const overviewVideo = getSv10RelatedVideo(resourceLocale);
  resources.videos = [overviewVideo, ...resources.videos.filter(video => video.id !== overviewVideo.id)];
  const relatedProducts = configuration?.connection === "threaded" ? getTubingAssemblySelectionContent(resourceLocale).cards
    .filter(card => card.productTypeId === "flanged-tubing")
    .map(card => ({
      id: card.productId, title: card.cardTitle, href: card.detailHref!,
      imageSrc: `/images/products/tubing-assemblies/related/${card.productId}-square.webp`,
      imageAlt: card.imageAlt || card.cardTitle,
    })) : configuration?.connection === "barbed" ? getBarbedSolenoidRelatedProducts(resourceLocale) : [];
  return <ProductDetailClient data={data} afterContent={
    <>
    <RelatedResourcesLoader {...resources} />
    <RelatedProducts locale={resourceLocale} products={relatedProducts} />
    </>
  } />;
}
