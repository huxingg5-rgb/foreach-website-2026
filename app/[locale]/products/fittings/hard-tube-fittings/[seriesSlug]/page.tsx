import type {
  Metadata,
} from "next";

import {
  notFound,
} from "next/navigation";

import ProductDetailClient from "@/components/products/detail/ProductDetailClient";

import {
  connectPublishedFittingProduct,
} from "@/data/products/selection/connectPublishedFittingProduct";

import hardTubeDetailsJson from "@/data/products/generated/fittings/hard-tube-fittings/detail/index.json";

import "@/app/products/products.css";

type DetailRecord = {
  slug: string;
  model: string;

  title?: string;
  name?: string;
  description?: string;

  sourceType?: string;

  category?: string;
  categoryId?: string;
  categoryLabel?: string;

  productTypeId?: string;
  productTypeName?: string;

  productId?: string;
  productCode?: string;

  mainImage?: string;
  image?: string;
  heroImage?: string;
  imageCard?: string;

  advantages?: string[];
  commonApplications?: string[];

  specs?: Array<{
    label: string;
    value: string;
  }>;

  specifications?: Array<{
    label: string;
    value: string;
  }>;

  faqs?: Array<{
    question: string;
    answer: string;
  }>;

  [key: string]: unknown;
};

type PageProps = {
  params: Promise<{
    locale: string;
    seriesSlug: string;
  }>;
};

const SUPPORTED_LOCALES = [
  "en",
  "es",
  "fr",
  "ko",
  "ru",
] as const;

type SupportedLocale =
  (typeof SUPPORTED_LOCALES)[number];

const PRODUCT_TYPE_NAMES:
  Record<SupportedLocale, string> = {
    en: "High-Pressure Fitting",
    es: "Racor de alta presión",
    fr: "Raccord haute pression",
    ko: "고압 피팅",
    ru: "Фитинг высокого давления",
  };

const hardTubeDetails =
  (
    hardTubeDetailsJson as
      DetailRecord[]
  ).flatMap((detail) => {
    const connected =
      connectPublishedFittingProduct(
        detail as Record<
          string,
          unknown
        >
      );

    if (!connected) {
      return [];
    }

    return [
      connected as DetailRecord,
    ];
  });

export const dynamicParams =
  false;

function isSupportedLocale(
  value: string
): value is SupportedLocale {
  return (
    SUPPORTED_LOCALES as
      readonly string[]
  ).includes(value);
}

function normalizeSegment(
  value: unknown
) {
  return (
    String(value || "")
      .trim()
      .toLowerCase()
      .split("/")
      .filter(Boolean)
      .pop() || ""
  );
}

function findDetail(
  seriesSlug: string
) {
  const targetSlug =
    normalizeSegment(
      seriesSlug
    );

  return (
    hardTubeDetails.find(
      (detail) =>
        normalizeSegment(
          detail.slug
        ) === targetSlug
    ) || null
  );
}

function toClientData(
  detail: DetailRecord
) {
  const mainImage =
    String(
      detail.mainImage ||
      detail.image ||
      detail.heroImage ||
      detail.imageCard ||
      ""
    );

  const specs =
    Array.isArray(
      detail.specs
    )
      ? detail.specs
      : Array.isArray(
            detail.specifications
          )
        ? detail.specifications
        : [];

  const detailHref =
    `/products/fittings/hard-tube-fittings/${detail.slug}`;

  return {
    ...detail,

    sourceType:
      "fitting-detail",

    category:
      "fittings",

    categoryId:
      "fittings",

    categoryLabel:
      detail.categoryLabel ||
      "接头系列",

    productTypeId:
      "hard-tube-fittings",

    productTypeName:
      detail.productTypeName ||
      detail.name ||
      detail.title ||
      "硬管接头",

    name:
      detail.name ||
      detail.title ||
      "硬管接头",

    title:
      detail.title ||
      detail.name ||
      detail.model,

    description:
      detail.description || "",

    mainImage,
    image:
      mainImage,
    heroImage:
      mainImage,
    imageCard:
      mainImage,

    specs,

    specifications:
      specs,

    advantages:
      Array.isArray(
        detail.advantages
      )
        ? detail.advantages
        : [],

    commonApplications:
      Array.isArray(
        detail.commonApplications
      )
        ? detail.commonApplications
        : [],

    faqs:
      Array.isArray(
        detail.faqs
      )
        ? detail.faqs
        : [],

    modelDisplay:
      detail.model,

    displayModel:
      detail.model,

    foreachModel:
      detail.model,

    detailMode:
      "standard_model",

    hideModelAction:
      false,

    showConfigurator:
      false,

    showDatasheetRequest:
      false,

    showDrawingRequest:
      true,

    show3DRequest:
      false,

    detailHref,

    href:
      detailHref,

    selectionHref:
      "/products/fittings/hard-tube-fittings",
  };
}

export function generateStaticParams() {
  return SUPPORTED_LOCALES.flatMap(
    (locale) =>
      hardTubeDetails.map(
        (detail) => ({
          locale,

          seriesSlug:
            normalizeSegment(
              detail.slug
            ),
        })
      )
  );
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const {
    locale,
    seriesSlug,
  } = await params;

  if (
    !isSupportedLocale(
      locale
    )
  ) {
    return {};
  }

  const detail =
    findDetail(
      seriesSlug
    );

  if (!detail) {
    return {};
  }

  const productTypeName =
    PRODUCT_TYPE_NAMES[
      locale
    ];

  return {
    title:
      `${detail.model} ${productTypeName} | FOREACH`,

    description:
      detail.description || "",

    alternates: {
      canonical:
        `/${locale}/products/fittings/hard-tube-fittings/${detail.slug}`,
    },
  };
}

export default async function LocalizedHardTubeDetailPage({
  params,
}: PageProps) {
  const {
    locale,
    seriesSlug,
  } = await params;

  if (
    !isSupportedLocale(
      locale
    )
  ) {
    notFound();
  }

  const detail =
    findDetail(
      seriesSlug
    );

  if (!detail) {
    notFound();
  }

  return (
    <ProductDetailClient
      data={
        toClientData(
          detail
        ) as any
      }
    />
  );
}