import syringePumpDetails from "@/data/products/generated/pumps/syringe-pumps/detail/index.json";

type Detail = (typeof syringePumpDetails)[number];

export function getSyringePumpProductDetailData(detail: Detail) {
  return {
    advantages: (detail as any).advantages || [],
    showConfigurator: Boolean((detail as any).showConfigurator ?? false),
    specSeriesKey: (detail as any).specSeriesKey || "syringe-pumps",
    ...detail,

    // Preserve the first image already used by the body and ProductModel.
    // Keep the gallery array and ALT indices intact; the client deduplicates it.
    mainImage: detail.additionalImages.find((image) => Boolean(image)) || "",

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

