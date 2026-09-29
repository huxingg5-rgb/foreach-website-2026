import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ProductDetailClient from "./ProductDetailClient";
import RelatedResources from "@/components/common/related-resources/RelatedResources";
import type { ProductDetailPageData } from "@/data/products/detail/product-detail.types";
import { getSolenoidContent, solenoidBasePath, solenoidLocales } from "@/data/products/detail/solenoid-content";
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
  const data = {...base, ...copy, mainImage: copy.mainImage || base.image, imageAlt: copy.imageAlt || copy.title,
    additionalImages: [], thumbnails: [], images: [],
    showDrawingRequest: true, show3DRequest: false, showDatasheetRequest: false,
    drawing2dUrl: "", model3dUrl: "", datasheetUrl: "",
  } as unknown as ProductDetailPageData;
  return <ProductDetailClient data={data} afterContent={locale === "zh" ? (
    <RelatedResources sourceType="product" sourceSlug={slug} relationKeys={["series:6010"]} locale="zh-CN" />
  ) : undefined} />;
}
