import type { Metadata } from "next";
import { notFound } from "next/navigation";

import ProductDetailClient from "@/components/products/detail/ProductDetailClient";
import details from "@/data/products/generated/pumps/valveless-pumps/detail/index.json";
import { buildProductSocialMetadata } from "@/lib/seo/product-social-metadata";

type ValvelessPumpDetail = (typeof details)[number];

type ValvelessPumpDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return details.map((detail) => ({
    slug: detail.slug,
  }));
}

function getDetailBySlug(slug: string): ValvelessPumpDetail | null {
  return details.find((detail) => detail.slug === slug) || null;
}

export async function generateMetadata({
  params,
}: ValvelessPumpDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const detail = getDetailBySlug(slug);

  if (!detail) {
    return {};
  }

  return {
    title: detail.seo?.title || `${detail.title} | FOREACH`,
    description: detail.seo?.description || detail.description || detail.title,
    ...buildProductSocialMetadata({
      data: detail,
      title: detail.seo?.title || `${detail.title} | FOREACH`,
      description: detail.seo?.description || detail.description || detail.title,
      canonicalUrl: `/products/pumps/valveless-pumps/${slug}/`,
    }),
  };
}

function toClientData(detail: ValvelessPumpDetail) {
  const mainImage =
    detail.mainImage ||
    detail.image ||
    detail.heroImage ||
    detail.imageCard ||
    "/images/products/products-placeholder.webp";

  const specs = Array.isArray(detail.specs) ? detail.specs : [];
  const faqs = Array.isArray(detail.faqs) ? detail.faqs : [];

  return {
    showConfigurator: Boolean((detail as any).showConfigurator ?? false),
    specSeriesKey: (detail as any).specSeriesKey || "valveless-pumps",
    ...detail,
    category: "pumps",
    slug: detail.slug,
    productId: detail.productId || `valveless-${detail.slug}`,

    model: detail.model,
    name: detail.name || detail.title || detail.model,
    title: detail.title || detail.model,

    description: detail.description || "",
    advantages: Array.isArray(detail.advantages) ? detail.advantages : [],
    commonApplications: Array.isArray(detail.commonApplications)
      ? detail.commonApplications
      : [],

    mainImage,
    image: mainImage,
    heroImage: mainImage,
    imageCard: mainImage,

    additionalImages: Array.isArray((detail as any).additionalImages)
      ? (detail as any).additionalImages
      : [],
    images: Array.isArray((detail as any).images)
      ? (detail as any).images
      : [],
    thumbnails: Array.isArray((detail as any).thumbnails)
      ? (detail as any).thumbnails
      : [],

    specs,
    specifications: Array.isArray(detail.specifications)
      ? detail.specifications
      : specs,
    specificationGroups: Array.isArray(detail.specificationGroups)
      ? detail.specificationGroups
      : [
          {
            title: "技术参数",
            items: specs,
          },
        ],

    faqs,

    detailHref:
      detail.detailHref || `/products/pumps/valveless-pumps/${detail.slug}`,
    href: detail.href || `/products/pumps/valveless-pumps/${detail.slug}`,
    selectionHref: detail.selectionHref || "/products/pumps/valveless-pumps",

    modelDisplay: detail.modelDisplay || "定制配置请联系我们",
    displayModel: detail.displayModel || "定制配置请联系我们",
    foreachModel: detail.foreachModel || detail.productCode || detail.model,
    productCode: detail.productCode || detail.foreachModel || detail.model,

    isCustomOnly: true,
    showStandardModelSelector: false,
    showCustomInquiryCta: true,
    isCustomInquiry: true,
    detailMode: "custom_inquiry",
    productTypeName: "无阀泵",
    showDrawingRequest: true,
    show3DRequest: false,
    showDatasheetRequest: false,
    customInquiryHref: "/contact",
    contactHref: "/contact",

    model3dUrl: detail.model3dUrl || detail.resources?.model3dUrl || "",
    drawing2dUrl: detail.drawing2dUrl || detail.resources?.drawing2dUrl || "",
    drawingPdfUrl:
      detail.drawingPdfUrl ||
      detail.drawing2dUrl ||
      detail.resources?.drawing2dUrl ||
      "",

    imageAltEn:
      detail.imageAltEn ||
      detail.mainImageAlt ||
      detail.imageAlt ||
      `${detail.model} FOREACH valveless pump`,
    imageAlt:
      detail.imageAlt ||
      detail.imageAltEn ||
      detail.mainImageAlt ||
      `${detail.model} FOREACH 无阀泵`,
    mainImageAlt:
      detail.mainImageAlt ||
      detail.imageAltEn ||
      detail.imageAlt ||
      `${detail.model} FOREACH 无阀泵`,
  };
}

export default async function ValvelessPumpDetailPage({
  params,
}: ValvelessPumpDetailPageProps) {
  const { slug } = await params;
  const detail = getDetailBySlug(slug);

  if (!detail) {
    notFound();
  }

  return <ProductDetailClient data={toClientData(detail) as any} />;
}
