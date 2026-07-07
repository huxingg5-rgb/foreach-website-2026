import type { ComponentType } from "react";

import { notFound } from "next/navigation";

import ProductDetailClient from "@/components/products/detail/ProductDetailClient";
import probeDetailData from "@/data/products/generated/probes/detail/index.json";

type ProbeDetailRecord = {
  slug: string;
  productTypeId: string;
  productTypeName: string;
  title: string;
  h1Title?: string;
  pageTitle?: string;
  modelName: string;
  seoTitle?: string;
  seoDescription?: string;
  image: string;
  imageAlt?: string;
  description: string;
  commonApplications: string[];
  advantages: string[];
  specsTitle?: string;
  specs: {
    label: string;
    value: string;
  }[];
  faq: {
    question: string;
    answer: string;
  }[];
  bottomCtaTitle?: string;
  bottomCtaDescription?: string;
  bottomCtaButtonText?: string;
  bottomCtaHref?: string;
};

const details = probeDetailData as ProbeDetailRecord[];

const ProductDetailView = ProductDetailClient as unknown as ComponentType<{
  data: any;
}>;

export const dynamicParams = false;

export function generateStaticParams() {
  return [
    { slug: "sampling-probes" },
    { slug: "piercing-probes" },
    { slug: "wash-probes" },
    { slug: "stirring-paddles" },
  ];
}

type ProbeDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

function getDetailBySlug(slug: string) {
  return details.find((item) => item.slug === slug);
}

function toClientData(detail: ProbeDetailRecord) {
  const image = detail.image || "/images/products/common/product-placeholder.svg";

  const faqItems = Array.isArray(detail.faq)
    ? detail.faq.map((item) => ({
        ...item,
        q: item.question,
        a: item.answer,
      }))
    : [];

  return {
    ...detail,

    category: "probes",
    categoryId: "pumps",
    categoryLabel: "针系列",

    productTypeSlug: detail.slug,
    productTypeId: detail.productTypeId,
    productTypeName: detail.productTypeName,
    productTypeLabel: detail.productTypeName,

    slug: detail.slug,

    title: detail.h1Title || detail.pageTitle || detail.title,
    name: detail.h1Title || detail.pageTitle || detail.title,
    productName: detail.h1Title || detail.pageTitle || detail.title,
    model: detail.h1Title || detail.pageTitle || detail.title,
    modelName: detail.modelName || detail.h1Title || detail.pageTitle || detail.title,
    h1Title: detail.h1Title || detail.pageTitle || detail.title,
    pageTitle: detail.pageTitle || detail.h1Title || detail.title,

    description: detail.description,
    summary: detail.description,
    overview: detail.description,

    commonApplications: Array.isArray(detail.commonApplications)
      ? detail.commonApplications
      : [],

    advantages: Array.isArray(detail.advantages) ? detail.advantages : [],
    highlights: Array.isArray(detail.advantages) ? detail.advantages : [],
    features: Array.isArray(detail.advantages) ? detail.advantages : [],

    specsTitle: detail.specsTitle || "定制确认项",
    specTitle: detail.specsTitle || "定制确认项",
    specificationTitle: detail.specsTitle || "定制确认项",
    specs: Array.isArray(detail.specs) ? detail.specs : [],

    faq: faqItems,
    faqs: faqItems,
    faqItems,
    detailFaqs: faqItems,

    isCustomOnly: true,
    isCustomInquiry: true,
    detailMode: "custom_inquiry",
    showStandardModelSelector: false,
    showCustomInquiryCta: true,

    modelDisplay: "来图定制请联系我们",
    displayModel: "来图定制请联系我们",

    contactHref: "/contact",

    showDrawingRequest: true,
    show3DRequest: false,
    showModel3dRequest: false,
    showDatasheetRequest: false,

    drawing2dUrl: "",
    model3dUrl: "",
    datasheetUrl: "",

    image,
    imagePath: image,
    imageUrl: image,
    mainImage: image,
    primaryImage: image,
    productImage: image,
    heroImage: image,
    imageAlt: detail.imageAlt || detail.title,

    additionalImages: [],
    images: [],
    thumbnails: [],

    bottomCtaTitle: detail.bottomCtaTitle,
    bottomCtaDescription: detail.bottomCtaDescription,
    bottomCtaButtonText: detail.bottomCtaButtonText || "联系工程师",
    bottomCtaHref: detail.bottomCtaHref || "/contact",

    bottomCta: {
      title: detail.bottomCtaTitle,
      desc: detail.bottomCtaDescription,
      description: detail.bottomCtaDescription,
      button: detail.bottomCtaButtonText || "联系工程师",
      buttonText: detail.bottomCtaButtonText || "联系工程师",
      href: detail.bottomCtaHref || "/contact",
    },

    customInquiryTitle: detail.bottomCtaTitle,
    customInquiryDescription: detail.bottomCtaDescription,
    customInquiryButtonText: detail.bottomCtaButtonText || "联系工程师",
    customInquiryHref: detail.bottomCtaHref || "/contact",

    customInquiryCta: {
      title: detail.bottomCtaTitle,
      desc: detail.bottomCtaDescription,
      description: detail.bottomCtaDescription,
      button: detail.bottomCtaButtonText || "联系工程师",
      buttonText: detail.bottomCtaButtonText || "联系工程师",
      href: detail.bottomCtaHref || "/contact",
    },

    selectionHref: "/products",
    detailHref: "/products/probes/" + detail.slug,

    sourceType: "probe-detail",
  };
}

export async function generateMetadata({ params }: ProbeDetailPageProps) {
  const { slug } = await params;
  const detail = getDetailBySlug(slug);

  if (!detail) {
    return {
      title: "针系列产品｜恒永达 FOREACH",
    };
  }

  return {
    title: detail.seoTitle || detail.title + "｜" + detail.productTypeName + "｜恒永达 FOREACH",
    description: detail.seoDescription || detail.description,
  };
}

export default async function ProbeDetailPage({ params }: ProbeDetailPageProps) {
  const { slug } = await params;
  const detail = getDetailBySlug(slug);

  if (!detail) {
    notFound();
  }

  return (
    <div data-probe-detail-page="true">
      <style
        dangerouslySetInnerHTML={{
          __html: `
            /*
              PROBE_INQUIRY_BANNER_OFFSET_20PX

              只作用于针系列详情页。
              将底部询盘 banner 轻微上移 20px，
              不影响泵、阀等其他详情页。
            */
            [data-probe-detail-page="true"] [class*="plungerBottomCta"],
            [data-probe-detail-page="true"] [class*="bottomCta"],
            [data-probe-detail-page="true"] [class*="BottomCta"],
            [data-probe-detail-page="true"] [class*="customInquiryCta"],
            [data-probe-detail-page="true"] [class*="CustomInquiryCta"] {
              margin-top: -20px !important;
            }
          `,
        }}
      />
      <ProductDetailView data={toClientData(detail)} />
    </div>
  );
}
