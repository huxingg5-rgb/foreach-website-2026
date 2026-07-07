import { notFound } from "next/navigation";
import type { ComponentType } from "react";
import type { Metadata } from "next";
import ProductDetailClient from "@/components/products/detail/ProductDetailClient";

import detailsJson from "@/data/products/generated/pumps/pipetting-pumps/detail/index.json";

export const dynamicParams = false;

type PageParams = {
  slug: string;
};

type PageProps = {
  params: Promise<PageParams>;
};

type SpecItem = {
  label?: string;
  name?: string;
  title?: string;
  value?: string;
  content?: string;
};

type FaqItem = {
  question?: string;
  answer?: string;
};

type DetailRecord = {
  slug: string;
  model: string;
  name?: string;
  title?: string;
  description?: string;
  category?: string;
  productId?: string;
  productTypeId?: string;
  productTypeSlug?: string;
  seriesId?: string;
  seriesSlug?: string;
  advantages?: string[];
  commonApplications?: string[];
  modelDisplay?: string;
  displayModel?: string;
  foreachModel?: string;
  mainImage?: string;
  image?: string;
  heroImage?: string;
  additionalImages?: string[];
  showConfigurator?: boolean;
  showDatasheetRequest?: boolean;
  showDrawingRequest?: boolean;
  show3DRequest?: boolean;
  detailHref?: string;
  selectionHref?: string;
  specSeriesKey?: string;
  model3dUrl?: string;
  drawing2dUrl?: string;
  drawingPdfUrl?: string;
  resources?: {
    model3dUrl?: string;
    drawing2dUrl?: string;
  };
  specs?: SpecItem[];
  specifications?: SpecItem[];
  specificationGroups?: Array<{
    title: string;
    items: SpecItem[];
  }>;
  faqs?: FaqItem[];
  seo?: {
    title?: string;
    description?: string;
  };
};

const details = detailsJson as DetailRecord[];

const ProductDetailView = ProductDetailClient as unknown as ComponentType<{
  data: any;
}>;

function getText(value: unknown) {
  return String(value || "").trim();
}

function normalizeSlug(value: unknown) {
  const parts = getText(value).split("/").filter(Boolean);
  return parts.length > 0 ? parts[parts.length - 1] : "";
}

function findDetail(slug: string) {
  const targetSlug = normalizeSlug(slug);

  return details.find((item) => {
    return normalizeSlug(item.slug) === targetSlug;
  });
}

function normalizeSpecs(detail: DetailRecord) {
  const specs = Array.isArray(detail.specs)
    ? detail.specs
    : Array.isArray(detail.specifications)
      ? detail.specifications
      : [];

  return specs
    .map((item) => {
      const label = getText(item.label || item.name || item.title);
      const value = getText(item.value || item.content);

      return {
        label,
        name: label,
        title: label,
        value,
        content: value,
      };
    })
    .filter((item) => item.label && item.value);
}

function normalizeFaqs(detail: DetailRecord) {
  const faqs = Array.isArray(detail.faqs) ? detail.faqs : [];

  return faqs
    .map((item) => ({
      question: getText(item.question),
      answer: getText(item.answer),
    }))
    .filter((item) => item.question && item.answer);
}

function toClientData(detail: DetailRecord) {
  const specs = normalizeSpecs(detail);
  const faqs = normalizeFaqs(detail);
  const mainImage = detail.mainImage || detail.image || detail.heroImage || "";

  return {
    ...detail,
    category: "pumps",
    slug: detail.slug,
    productId: detail.productId || `pipetting-${detail.slug}`,
    model: detail.model,
    name: detail.name || detail.title || detail.model,
    title: detail.title || detail.model,
    description: detail.description || "",
    advantages: Array.isArray(detail.advantages) ? detail.advantages : [],
    commonApplications: Array.isArray(detail.commonApplications)
      ? detail.commonApplications
      : [],
    additionalImages: Array.isArray(detail.additionalImages)
      ? detail.additionalImages
      : [],
    mainImage,
    image: mainImage,
    heroImage: mainImage,
    imageCard: mainImage,
    showConfigurator: Boolean(detail.showConfigurator),
    showDatasheetRequest: Boolean(detail.showDatasheetRequest),
    showDrawingRequest: Boolean(detail.showDrawingRequest),
    show3DRequest: Boolean(detail.show3DRequest),
    specSeriesKey: detail.specSeriesKey || detail.slug,
    specs,
    specifications: specs,
    specificationGroups: [
      {
        title: "技术参数",
        items: specs,
      },
    ],
    faqs,
    detailHref: detail.detailHref || `/products/pumps/pipetting-pumps/${detail.slug}`,
    href: detail.detailHref || `/products/pumps/pipetting-pumps/${detail.slug}`,
    selectionHref: detail.selectionHref || "/products/pumps/pipetting-pumps",
    modelDisplay: detail.modelDisplay || detail.model,
    displayModel: detail.displayModel || detail.model,
    foreachModel: detail.foreachModel || detail.model,
    productCode: detail.model,
    model3dUrl: detail.model3dUrl || detail.resources?.model3dUrl || "",
    drawing2dUrl: detail.drawing2dUrl || detail.resources?.drawing2dUrl || "",
    drawingPdfUrl: detail.drawingPdfUrl || detail.drawing2dUrl || detail.resources?.drawing2dUrl || "",
    resources: {
      model3dUrl: detail.model3dUrl || detail.resources?.model3dUrl || "",
      drawing2dUrl: detail.drawing2dUrl || detail.resources?.drawing2dUrl || "",
    },
  };
}

export function generateStaticParams() {
  return details.map((item) => ({
    slug: normalizeSlug(item.slug),
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const detail = findDetail(slug);

  if (!detail) {
    return {};
  }

  return {
    title: detail.seo?.title || `${detail.model} | FOREACH`,
    description: detail.seo?.description || detail.description || "",
  };
}

export default async function PipettingPumpDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const detail = findDetail(slug);

  if (!detail) {
    notFound();
  }

  return <ProductDetailView data={toClientData(detail)} />;
}