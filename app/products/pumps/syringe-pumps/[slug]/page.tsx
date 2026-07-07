import { notFound } from "next/navigation";
import ProductDetailClient from "@/components/products/detail/ProductDetailClient";
import syringePumpDetails from "@/data/products/generated/pumps/syringe-pumps/detail/index.json";

type Detail = (typeof syringePumpDetails)[number];

function toClientData(detail: Detail) {
  return {
    advantages: (detail as any).advantages || [],
    showConfigurator: Boolean((detail as any).showConfigurator ?? false),
    specSeriesKey: (detail as any).specSeriesKey || "syringe-pumps",
    ...detail,

    category: "pumps",
    productTypeId: "syringe-pump",
    productTypeSlug: "syringe-pumps",
    productTypeName: "注射泵",

    title: detail.h1Title || detail.title,
    h1Title: detail.h1Title || detail.title,
    pageTitle: detail.pageTitle || detail.h1Title || detail.title,
    name: detail.name || detail.title,
    model: detail.model || detail.title,

    modelDisplay: "定制配置请联系我们",
    displayModel: "定制配置请联系我们",

    isCustomOnly: true,
    isCustomInquiry: true,
    detailMode: "custom_inquiry",
    showStandardModelSelector: false,
    showCustomInquiryCta: true,

    showDrawingRequest: true,
    show3DRequest: false,
    showDatasheetRequest: false,

    customInquiryHref: "/contact",
    contactHref: "/contact",
    selectionHref: "/products/pumps/syringe-pumps",
    detailHref: `/products/pumps/syringe-pumps/${detail.slug}`,

    specs: Array.isArray((detail as any).specs)
      ? (detail as any).specs
      : Array.isArray((detail as any).specifications)
        ? (detail as any).specifications
        : [],

    specifications: Array.isArray((detail as any).specifications)
      ? (detail as any).specifications
      : Array.isArray((detail as any).specs)
        ? (detail as any).specs
        : [],

    faq: Array.isArray((detail as any).faq) ? (detail as any).faq : [],
    faqs: Array.isArray((detail as any).faqs)
      ? (detail as any).faqs
      : Array.isArray((detail as any).faq)
        ? (detail as any).faq
        : [],
    faqItems: Array.isArray((detail as any).faqItems)
      ? (detail as any).faqItems
      : Array.isArray((detail as any).faq)
        ? (detail as any).faq
        : [],
    faqList: Array.isArray((detail as any).faqList)
      ? (detail as any).faqList
      : Array.isArray((detail as any).faq)
        ? (detail as any).faq
        : [],

    bottomCta: (detail as any).bottomCta,
    customCta: (detail as any).customCta,
    customInquiryCta: (detail as any).customInquiryCta,
    bottomCustomCta: (detail as any).bottomCustomCta,
    showBottomCta: true,

    additionalImages: Array.isArray(detail.additionalImages) ? detail.additionalImages : [],
    images: Array.isArray(detail.images) ? detail.images : [],
    thumbnails: Array.isArray(detail.thumbnails) ? detail.thumbnails : [],
  };
}

export function generateStaticParams() {
  return (syringePumpDetails as Detail[]).map((detail) => ({
    slug: detail.slug,
  }));
}

export default async function SyringePumpDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const detail = (syringePumpDetails as Detail[]).find((item) => item.slug === slug);

  if (!detail) {
    notFound();
  }

  return <ProductDetailClient data={toClientData(detail) as any} />;
}
