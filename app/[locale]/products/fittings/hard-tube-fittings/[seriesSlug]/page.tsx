import { withPublishedTranslationMetadata } from "@/lib/seo/published-translation-metadata";
import HardTubeFittingRelatedArticles from "@/components/products/detail/HardTubeFittingRelatedArticles";
import FittingLocalizedSelectionContent from "@/components/products/detail/FittingLocalizedSelectionContent";
import type {
  Metadata,
} from "next";

import {
  notFound,
} from "next/navigation";

import ProductDetailClient from "@/components/products/detail/ProductDetailClient";
import { buildProductSocialMetadata } from "@/lib/seo/product-social-metadata";
import { getHardTubeSeo } from "@/data/products/detail/hard-tube-seo";
import { getGermanProductDetailContent, getGermanProductDetailMetadata } from "@/data/products/detail/product-detail-content.de";
import { germanHardTubeFittingSlugs } from "@/data/products/detail/hard-tube-fitting-detail.de";
import { isLocalizedHindiDraftPath, isLocalizedItalianDraftPath, languageDraftsEnabled } from "@/lib/i18n/draft-languages";
import { getHindiHardTubeFittingContent, hindiHardTubeFittingSlugs } from "@/data/products/detail/product-detail.hi";
import { getItalianHardTubeFittingContent, italianHardTubeFittingSlugs } from "@/data/products/detail/product-detail.it";
import { getCanonicalUrl } from "@/lib/seo/site-url";

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

function hasHindiDetail(slug: string) {
  return isLocalizedHindiDraftPath("/hi/products/fittings/hard-tube-fittings/" + slug + "/");
}

function hasItalianDetail(slug: string) {
  return isLocalizedItalianDraftPath("/it/products/fittings/hard-tube-fittings/" + slug + "/");
}

export function generateStaticParams() {
  const existing = SUPPORTED_LOCALES.flatMap(
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
  return languageDraftsEnabled
    ? [...existing, ...germanHardTubeFittingSlugs.map(seriesSlug => ({ locale: "de", seriesSlug })),
        ...italianHardTubeFittingSlugs.filter(hasItalianDetail).map(seriesSlug => ({ locale: "it", seriesSlug })),
        ...hindiHardTubeFittingSlugs.filter(hasHindiDetail).map(seriesSlug => ({ locale: "hi", seriesSlug }))]
    : existing;
}

async function getPageMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const {
    locale,
    seriesSlug,
  } = await params;
  const detail = findDetail(seriesSlug);
  const italianDetail = locale === "it" && detail && hasItalianDetail(seriesSlug) ? getItalianHardTubeFittingContent(detail) : undefined;
  const hindiDetail = locale === "hi" && detail && hasHindiDetail(seriesSlug) ? getHindiHardTubeFittingContent(detail) : undefined;
  const draftDetail = italianDetail ?? hindiDetail;
  if (draftDetail && detail) {
    const title = detail.model + " – " + draftDetail.title + " | FOREACH";
    const { description, imageAlt } = draftDetail;
    const url = getCanonicalUrl("/" + locale + "/products/fittings/hard-tube-fittings/" + seriesSlug + "/");
    const social = buildProductSocialMetadata({ data: { ...detail, imageAltEn: imageAlt }, title, description, canonicalUrl: url });
    return { ...social, title: { absolute: title }, description, alternates: { canonical: url }, robots: { index: false, follow: true }, openGraph: { ...social.openGraph, locale: hindiDetail ? "hi_IN" : "it_IT" } };
  }
  if (locale === "de" && detail && languageDraftsEnabled) {
    const metadata = getGermanProductDetailMetadata(`/products/fittings/hard-tube-fittings/${seriesSlug}/`, detail.model);
    if (metadata) return metadata;
  }

  if (
    !isSupportedLocale(
      locale
    )
  ) {
    return {};
  }

  if (!detail) {
    return {};
  }

  const seo = getHardTubeSeo(detail, locale);
  const title = seo?.title || `${detail.model} | Foreach Technology`;
  const description = seo?.description || "";

  return {
    title:
      title,

    description:
      description,

    alternates: {
      canonical:
        `/${locale}/products/fittings/hard-tube-fittings/${detail.slug}`,
    },

    ...buildProductSocialMetadata({
      data: seo ? { ...detail, imageAltEn: seo.imageAlt } : detail,
      title,
      description,
      canonicalUrl: `/${locale}/products/fittings/hard-tube-fittings/${detail.slug}/`,
    }),
  };
}

export default async function LocalizedHardTubeDetailPage({
  params,
}: PageProps) {
  const {
    locale: requestedLocale,
    seriesSlug,
  } = await params;
  const germanDetail = requestedLocale === "de" && languageDraftsEnabled
    ? getGermanProductDetailContent(`/en/products/fittings/hard-tube-fittings/${seriesSlug}/`) : undefined;
  const detail = findDetail(seriesSlug);
  if (!detail) notFound();
  const italianDetail = requestedLocale === "it" && hasItalianDetail(seriesSlug) ? getItalianHardTubeFittingContent(detail) : undefined;
  const hindiDetail = requestedLocale === "hi" && hasHindiDetail(seriesSlug) ? getHindiHardTubeFittingContent(detail) : undefined;
  const contentLocale = italianDetail ? "it" : hindiDetail ? "hi" : undefined;
  const locale = germanDetail || contentLocale ? "en" : requestedLocale;

  if (
    !isSupportedLocale(
      locale
    )
  ) {
    notFound();
  }

  return (
    <ProductDetailClient
      germanDetail={germanDetail}
      localizedDetail={italianDetail ? { locale: "it", copy: italianDetail } : hindiDetail ? { locale: "hi", copy: hindiDetail } : undefined}
      customerCategoryMode="hard-tube-zh"
      customerCategoryContent={{selection:<FittingLocalizedSelectionContent data={{...detail,productTypeId:"hard-tube-fittings"}} locale={locale} germanDraft={!!germanDetail} contentLocale={contentLocale}/>}}
      afterContent={<HardTubeFittingRelatedArticles model={detail.model} locale={locale} germanDraft={!!germanDetail} contentLocale={contentLocale} />}
      data={
        toClientData(
          detail
        ) as any
      }
    />
  );
}

export const generateMetadata = withPublishedTranslationMetadata("/products/fittings/hard-tube-fittings/[seriesSlug]/", getPageMetadata);
