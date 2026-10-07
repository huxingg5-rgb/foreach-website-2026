import type { ComponentType } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import ProductDetailClient from "@/components/products/detail/ProductDetailClient";
import tubingDetailData from "@/data/products/generated/tubing/detail/index.json";
import { buildProductSocialMetadata } from "@/lib/seo/product-social-metadata";
import { getTubingMaterialCopy } from "@/data/products/tubing/content";
import { localizeProductDetailData } from "@/data/products/detail/product-detail.intl";
import { getTubingAlternates } from "@/data/products/tubing/metadata";

type FaqItem = {
  question?: string;
  answer?: string;
  q?: string;
  a?: string;
};

type TubingDetailRecord = {
  slug: string;
  title: string;
  name?: string;
  model?: string;
  h1Title?: string;
  pageTitle?: string;
  displayModel?: string;
  description: string;
  image?: string;
  mainImage?: string;
  imagePath?: string;
  additionalImages?: string[];
  images?: string[];
  thumbnails?: string[];
  commonApplications?: string[];
  features?: string[];
  specs?: { label: string; value: string }[];
  faq?: FaqItem[];
  faqs?: FaqItem[];
  faqItems?: FaqItem[];
  detailFaqs?: FaqItem[];
  bottomCtaTitle?: string;
  bottomCtaDesc?: string;
  bottomCtaButton?: string;
  bottomCtaHref?: string;
};

const records = tubingDetailData as TubingDetailRecord[];

const ProductDetailView = ProductDetailClient as unknown as ComponentType<{
  data: any;
}>;

function findDetail(slug: string) {
  return records.find((item) => item.slug === slug);
}

function getFaqItems(detail: TubingDetailRecord) {
  const raw = Array.isArray(detail.faq)
    ? detail.faq
    : Array.isArray(detail.faqs)
      ? detail.faqs
      : Array.isArray(detail.faqItems)
        ? detail.faqItems
        : Array.isArray(detail.detailFaqs)
          ? detail.detailFaqs
          : [];

  return raw
    .map((item) => ({
      question: item.question || item.q || "",
      answer: item.answer || item.a || "",
      q: item.question || item.q || "",
      a: item.answer || item.a || "",
    }))
    .filter((item) => item.question && item.answer);
}

function toClientData(detail: TubingDetailRecord, locale: string) {
  const image = detail.image || "/images/products/common/product-placeholder.svg";
  const images = Array.isArray(detail.images) && detail.images.length > 0 ? detail.images : [image];
  const faqItems = getFaqItems(detail);

  const copy = getTubingMaterialCopy(detail.slug, locale);
  const en = locale === "en";
  const authored = copy ? {
    __locale: locale,
    tubingAuthoredContent: true,
    title: copy.h1,
    name: copy.h1,
    h1Title: copy.h1,
    pageTitle: copy.h1,
    displayModel: en ? "Select a Size" : "请选择尺寸",
    description: copy.intro.join(" "),
    shortDescription: copy.intro[0],
    tubingIntroductionParagraphs: copy.intro,
    commonApplications: copy.applications,
    features: copy.features,
    sellingPoints: copy.features,
    advantages: copy.features,
    imageAlt: copy.imageAlt,
    alt: copy.imageAlt,
    specs: (en ? localizeProductDetailData(detail).specs : detail.specs) || [],
    applicationDetails: {
      tabLabel: en ? "Applications" : "应用与连接",
      title: en ? "Tubing Selection and Connections" : "管材选型与连接",
      intro: [],
      items: [
        { title: en ? "Selection Considerations" : "选型要点", paragraphs: copy.features },
        { title: en ? "Application Evaluation" : "应用评估", paragraphs: copy.applications },
      ],
      selectionNote: { title: en ? "Fitting Compatibility" : "接头匹配", paragraphs: [copy.connections] },
    },
    faq: copy.faqs,
    faqs: copy.faqs,
    faqItems: copy.faqs,
    detailFaqs: copy.faqs,
    bottomCtaTitle: copy.ctaTitle,
    bottomCtaDesc: copy.ctaDescription,
    bottomCtaButton: en ? "Contact an Engineer" : "联系工程师",
    bottomCtaHref: en ? "/en/contact/" : "/contact/",
    customInquiryHref: en ? "/en/contact/" : "/contact/",
    contactHref: en ? "/en/contact/" : "/contact/",
  } : {};

  return {
    ...detail,

    title: detail.title,
    name: detail.name || detail.title,
    model: detail.model || detail.title,
    h1Title: detail.h1Title || detail.title,
    pageTitle: detail.pageTitle || detail.title,
    displayModel: detail.displayModel || "按材质与尺寸选型",

    productCategory: "tubing",
    productType: "tubing",
    productTypeLabel: "管路系列",
    category: "tubing",
    detailMode: "material_selection",

    image,
    mainImage: detail.mainImage || image,
    imagePath: detail.imagePath || image,
    alt: detail.title,
    imageAlt: detail.title,
    additionalImages: Array.isArray(detail.additionalImages) ? detail.additionalImages : [],
    images,
    thumbnails: Array.isArray(detail.thumbnails) ? detail.thumbnails : images,

    description: detail.description,
    shortDescription: detail.description,

    commonApplications: Array.isArray(detail.commonApplications)
      ? detail.commonApplications
      : [],

    features: Array.isArray(detail.features) ? detail.features : [],
    sellingPoints: Array.isArray(detail.features) ? detail.features : [],
    advantages: Array.isArray(detail.features) ? detail.features : [],

    specsTitle: "规格",
    specTitle: "规格",
    specificationTitle: "规格",
    specs: Array.isArray(detail.specs) ? detail.specs : [],

    faq: faqItems,
    faqs: faqItems,
    faqItems,
    detailFaqs: faqItems,

    bottomCtaTitle: detail.bottomCtaTitle,
    bottomCtaDesc: detail.bottomCtaDesc,
    bottomCtaButton: detail.bottomCtaButton,
    bottomCtaHref: detail.bottomCtaHref,

    showCustomInquiryCta: true,
    customInquiryHref: detail.bottomCtaHref || "/contact",
    contactHref: detail.bottomCtaHref || "/contact",
    ...authored,
  };
}

export function getTubingMetadata(slug: string, locale = "zh"): Metadata {
  const detail = findDetail(slug);

  if (!detail) {
    return {
      title: "管路系列 | Foreach Technology",
    };
  }
  const copy = getTubingMaterialCopy(slug, locale);
  if (copy) {
    const alternates = getTubingAlternates(slug, locale);
    return {
      title: { absolute: copy.seoTitle },
      description: copy.seoDescription,
      alternates,
      ...buildProductSocialMetadata({
        data: { ...detail, imageAlt: copy.imageAlt },
        title: copy.seoTitle,
        description: copy.seoDescription,
        canonicalUrl: alternates.canonical,
      }),
    };
  }

  return {
    title: `${detail.title} | Foreach Technology 管路系列`,
    description: detail.description,
    ...buildProductSocialMetadata({
      data: detail,
      title: detail.title,
      description: detail.description,
      canonicalUrl: `/products/tubing/${slug}/`,
    }),
  };
}

export default function TubingDetailStaticPage({ slug, locale = "zh" }: { slug: string; locale?: string }) {
  const detail = findDetail(slug);

  if (!detail) {
    notFound();
  }

  return (
    <div data-tubing-detail-page="true">
      <ProductDetailView data={toClientData(detail, locale)} />
    </div>
  );
}
