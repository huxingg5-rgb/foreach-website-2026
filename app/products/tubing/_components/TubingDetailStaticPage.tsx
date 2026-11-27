import type { ComponentType, ReactNode } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import ProductDetailClient from "@/components/products/detail/ProductDetailClient";
import TubingDeliveryContent from "@/components/products/detail/TubingDeliveryContent";
import TubingSelectionContent from "@/components/products/detail/TubingSelectionContent";
import { tubingSelectionProfiles, type TubingGuideMaterial } from "@/data/products/tubing/selection-guides.zh";
import {
  PvcTubingSelectionContent,
} from "@/components/products/detail/PvcTubingDetailContent";
import tubingDetailData from "@/data/products/generated/tubing/detail/index.json";
import { buildProductSocialMetadata } from "@/lib/seo/product-social-metadata";
import { getTubingMaterialCopy } from "@/data/products/tubing/content";
import { localizeProductDetailData } from "@/data/products/detail/product-detail.intl";
import { germanProductSpecLabel, germanProductSpecValue } from "@/data/products/detail/product-detail-ui.de";
import { getTubingAlternates } from "@/data/products/tubing/metadata";
import { tubingText } from "@/data/products/tubing/detail-locales";
import { getTubingGalleryData } from "@/data/products/tubing/gallery";
import { getTpuSelectionGuideData } from "@/data/products/tubing/tpu-selection-guide";

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

const tubingSpecLabelsDe: Record<string,string> = {
  "Density (g/cm³)": "Dichte (g/cm³)",
  "Tensile Strength (MPa)": "Zugfestigkeit (MPa)",
  "Flexural Strength (MPa)": "Biegefestigkeit (MPa)",
  "Dielectric Strength (kV/mm)": "Durchschlagsfestigkeit (kV/mm)",
  "Water Absorption (%)": "Wasseraufnahme (%)",
  "Operating Temperature (℃)": "Betriebstemperatur (℃)",
  "Coefficient of Thermal Expansion (cm/cm/°C)": "Wärmeausdehnungskoeffizient (cm/cm/°C)",
  "Melting Temperature (°C)": "Schmelztemperatur (°C)",
  "Low-Temperature Brittleness (°C)": "Kälteversprödung (°C)",
  "Hardness (Shore D)": "Härte (Shore D)",
  "Hardness (Shore)": "Härte (Shore)",
  "Hardness (Shore A)": "Härte (Shore A)"
};

const records = tubingDetailData as TubingDetailRecord[];

const ProductDetailView = ProductDetailClient as unknown as ComponentType<{
  data: ReturnType<typeof toClientData>;
  afterContent?: ReactNode;
  germanDetail?: Parameters<typeof ProductDetailClient>[0]["germanDetail"];
  localizedDetail?: Parameters<typeof ProductDetailClient>[0]["localizedDetail"];
  customerCategoryMode?: "tubing-zh" | "tubing";
  customerCategoryContent?: Partial<Record<"product" | "selection" | "delivery", ReactNode>>;
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
  const german = locale === "de";
  const italian = locale === "it";
  const hindi = locale === "hi";
  const specs = (en || german || italian || hindi ? localizeProductDetailData(detail).specs : detail.specs) || [];
  const authored = copy ? {
    __locale: locale,
    tubingAuthoredContent: true,
    title: copy.h1,
    name: copy.h1,
    h1Title: copy.h1,
    pageTitle: copy.h1,
    displayModel: hindi ? "आकार चुनें" : german ? "Größe auswählen" : italian ? "Seleziona una misura" : en ? "Select a Size" : "请选择尺寸",
    description: copy.intro.join(" "),
    shortDescription: copy.intro[0],
    tubingIntroductionParagraphs: copy.intro,
    commonApplications: copy.applications,
    features: copy.features,
    sellingPoints: copy.features,
    advantages: copy.features,
    imageAlt: copy.imageAlt,
    alt: copy.imageAlt,
    specs: german ? specs.map(item => ({label:tubingSpecLabelsDe[item.label] || germanProductSpecLabel(item.label, false, item.value), value:germanProductSpecValue(item.label, item.value)}))
      : italian || hindi ? specs.map(item => ({ label: tubingText(item.label, locale), value: tubingText(item.value, locale) })) : specs,
    applicationDetails: {
      tabLabel: hindi ? "अनुप्रयोग" : italian ? "Applicazioni" : en ? "Applications" : "应用与连接",
      title: hindi ? "ट्यूब और फिटिंग चुनना" : italian ? "Scelta di tubi e raccordi" : en ? "Tubing Selection and Connections" : "管材选型与连接",
      intro: [],
      items: [
        { title: hindi ? "चयन के बिंदु" : italian ? "Criteri di scelta" : en ? "Selection Considerations" : "选型要点", paragraphs: copy.features },
        { title: hindi ? "काम के लिए उपयुक्तता" : italian ? "Valutazione dell’applicazione" : en ? "Application Evaluation" : "应用评估", paragraphs: copy.applications },
      ],
      selectionNote: { title: hindi ? "फिटिंग की संगतता" : italian ? "Compatibilità dei raccordi" : en ? "Fitting Compatibility" : "接头匹配", paragraphs: [copy.connections] },
    },
    faq: copy.faqs,
    faqs: copy.faqs,
    faqItems: copy.faqs,
    detailFaqs: copy.faqs,
    bottomCtaTitle: copy.ctaTitle,
    bottomCtaDesc: copy.ctaDescription,
    bottomCtaButton: hindi ? "इंजीनियर से संपर्क करें" : german ? "Technische Beratung anfragen" : italian ? "Contatta un tecnico" : en ? "Contact an Engineer" : "联系工程师",
    bottomCtaHref: german || italian || hindi ? `/${locale}/contact/` : en ? "/en/contact/" : "/contact/",
    customInquiryHref: german || italian || hindi ? `/${locale}/contact/` : en ? "/en/contact/" : "/contact/",
    contactHref: german || italian || hindi ? `/${locale}/contact/` : en ? "/en/contact/" : "/contact/",
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
    ...getTubingGalleryData(detail.slug, locale),
    ...(detail.slug === "tpu-tubing"
      ? { tpuSelectionGuide: getTpuSelectionGuideData() }
      : {}),
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
    if (locale === "de" || locale === "it" || locale === "hi") {
      const canonical = `/${locale}/products/tubing/${slug}/details/`;
      const social = buildProductSocialMetadata({data:{...detail,imageAlt:copy.imageAlt},title:copy.seoTitle,
        description:copy.seoDescription,canonicalUrl:canonical});
      return {...social,title:{absolute:copy.seoTitle},description:copy.seoDescription,alternates:{canonical},
        robots:{index:false,follow:true},openGraph:{...social.openGraph,locale:locale === "hi" ? "hi_IN" : locale === "de" ? "de_DE" : "it_IT"}};
    }
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

export default function TubingDetailStaticPage({
  slug,
  locale = "zh",
  afterContent,
}: {
  slug: string;
  locale?: string;
  afterContent?: ReactNode;
}) {
  const detail = findDetail(slug);

  if (!detail) {
    notFound();
  }

  const useTpuSections = slug === "tpu-tubing";
  const usePvcSections = slug === "pvc-tubing";
  const clientData = toClientData(detail, locale);
  const useTubingSections = ["zh", "zh-CN", "en", "es", "fr", "ko", "ru", "de", "it", "hi"].includes(locale);
  const german = locale === "de" ? getTubingMaterialCopy(slug, locale) : undefined;
  const germanDetail = german ? {title:german.h1,description:german.intro.join(" "),faqs:slug === "pvc-tubing" ? [] : german.faqs,imageAlt:german.imageAlt,
    bottomCta:{title:german.ctaTitle,description:german.ctaDescription,buttonText:"Technische Beratung anfragen",href:"/de/contact/"}} : undefined;
  const draftLocale = locale === "hi" || locale === "it" ? locale : undefined;
  const draft = draftLocale ? getTubingMaterialCopy(slug, draftLocale) : undefined;
  const localizedDetail: Parameters<typeof ProductDetailClient>[0]["localizedDetail"] = draft && draftLocale ? {
    locale: draftLocale,
    copy: {
      title: draft.h1,
      description: draft.intro.join(" "),
      faqs: slug === "pvc-tubing" ? [] : draft.faqs,
      imageAlt: draft.imageAlt,
      bottomCta: { title: draft.ctaTitle, description: draft.ctaDescription, buttonText: draftLocale === "hi" ? "इंजीनियर से संपर्क करें" : "Contatta un tecnico", href: "/" + draftLocale + "/contact/" },
    },
  } : undefined;
  const guideMaterial = Object.keys(tubingSelectionProfiles).find(material => slug === `${material}-tubing`) as TubingGuideMaterial | undefined;

  return (
    <div data-tubing-detail-page="true">
      <ProductDetailView
        data={clientData}
        germanDetail={germanDetail}
        localizedDetail={localizedDetail}
        afterContent={afterContent}
        customerCategoryMode={useTubingSections ? "tubing" : undefined}
        customerCategoryContent={useTubingSections ? {
          selection: usePvcSections ? <PvcTubingSelectionContent locale={locale} />
            : useTpuSections ? undefined : guideMaterial ? <TubingSelectionContent material={guideMaterial} locale={locale} /> : undefined,
          delivery: <TubingDeliveryContent locale={locale} />,
        } : undefined}
      />
    </div>
  );
}
