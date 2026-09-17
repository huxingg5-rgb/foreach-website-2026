import { applyValvelessPumpChineseCopy } from "@/data/products/detail/valveless-pump-copy.zh";
import { applyValvelessPumpLocalizedCopy } from "@/data/products/detail/valveless-pump-localized-adapter";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import ProductDetailClient from "@/components/products/detail/ProductDetailClient";
import RelatedResources from "@/components/common/related-resources/RelatedResources";
import { getRplSelectionGuide, rplSelectionModelSlugs, rplSelectionRelationKeys } from "@/data/resources/technical-articles/rpl-selection-links";
import details from "@/data/products/generated/pumps/valveless-pumps/detail/index.json";
import { buildProductSocialMetadata } from "@/lib/seo/product-social-metadata";
import { getValvelessPumpPath, getValvelessPumpLanguageAlternates } from "@/data/products/selection/valveless-pump-routes";

type ValvelessPumpDetail = (typeof details)[number];

type ValvelessPumpDetailPageProps = {
  renderLocale?: string;
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

  // Metadata and body share the reviewed model-specific Chinese copy.
  const metadataDetail = applyValvelessPumpChineseCopy(detail, "zh");
  const title = metadataDetail.seo?.title || `${metadataDetail.title} | Foreach Technology`;
  const description = metadataDetail.seo?.description || metadataDetail.description || metadataDetail.title;
  return {
    title,
    description,
    alternates: {
      canonical: getValvelessPumpPath("zh", slug),
      languages: getValvelessPumpLanguageAlternates(slug),
    },
    ...buildProductSocialMetadata({
      data: metadataDetail,
      title,
      description,
      canonicalUrl: getValvelessPumpPath("zh", slug),
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

    detailHref: getValvelessPumpPath("zh", detail.slug),
    href: getValvelessPumpPath("zh", detail.slug),
    selectionHref: getValvelessPumpPath("zh"),

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
      `${detail.model} Foreach valveless pump`,
    imageAlt:
      detail.imageAlt ||
      detail.imageAltEn ||
      detail.mainImageAlt ||
      `${detail.model} Foreach 无阀泵`,
    mainImageAlt:
      detail.mainImageAlt ||
      detail.imageAltEn ||
      detail.imageAlt ||
      `${detail.model} Foreach 无阀泵`,
  };
}

export default async function ValvelessPumpDetailPage({
  params,
  renderLocale = "zh",
}: ValvelessPumpDetailPageProps) {
  const { slug } = await params;
  const detail = getDetailBySlug(slug);

  if (!detail) {
    notFound();
  }

  const data = renderLocale === "zh"
    ? applyValvelessPumpChineseCopy(toClientData(detail), "zh")
    : applyValvelessPumpLocalizedCopy(toClientData(detail), renderLocale);
  return (
    <ProductDetailClient
      data={data as any}
      afterContent={rplSelectionModelSlugs.includes(slug) ? (
        <RelatedResources
          sourceType="product"
          sourceSlug={slug}
          relationKeys={rplSelectionRelationKeys}
          locale={getRplSelectionGuide(renderLocale).locale}
        />
      ) : undefined}
    />
  );
}
