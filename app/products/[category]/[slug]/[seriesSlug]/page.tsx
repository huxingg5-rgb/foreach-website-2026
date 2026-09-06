import type {
  ComponentType,
} from "react";

import type {
  Metadata,
} from "next";

import {
  notFound,
} from "next/navigation";

import {
  Suspense,
} from "react";

import ProductPageSkeleton from "@/components/common/ProductPageSkeleton";
import ProductDetailClient from "@/components/products/detail/ProductDetailClient";
import ProductSelectionClient from "@/components/products/selection/ProductSelectionClient";
import { buildProductSocialMetadata } from "@/lib/seo/product-social-metadata";
import {
  connectPublishedFittingProduct,
} from "@/data/products/selection/connectPublishedFittingProduct";

import {
  getSeriesRouteParams,
  resolveSeriesRoute,
} from "@/data/products/selection/product-route-map";

import hardTubeDetailsJson from "@/data/products/generated/fittings/hard-tube-fittings/detail/index.json";

import threadToBarbedDetailsJson from "@/data/products/generated/fittings/thread-to-barbed-fittings/detail/index.json";

import luerDetailsJson from "@/data/products/generated/fittings/luer-fittings/detail/index.json";

import femaleThreadDetailsJson from "@/data/products/generated/fittings/female-thread-adapters/detail/index.json";

import "../../../products.css";

type ProductsSeriesRoutePageProps = {
  params: Promise<{
    category: string;
    slug: string;
    seriesSlug: string;
  }>;
};

type FittingDetailRecord = {
  slug: string;
  model: string;

  title?: string;
  name?: string;
  description?: string;

  sourceType?: string;
  category?: string;
  categoryId?: string;
  productTypeId?: string;
  productTypeName?: string;

  advantages?: string[];
  commonApplications?: string[];

  mainImage?: string;
  image?: string;
  heroImage?: string;
  imageCard?: string;
  additionalImages?: string[];

  specs?: Array<{
    label: string;
    value: string;
  }>;

  faqs?: Array<{
    question: string;
    answer: string;
  }>;

  seo?: {
    title?: string;
    description?: string;
  };

  [key: string]: unknown;
};

type ResolvedFittingDetail = {
  detail: FittingDetailRecord;
  productTypeId: string;
  fallbackName: string;
};

const hardTubeDetails =
  (hardTubeDetailsJson as FittingDetailRecord[]).flatMap(
    (detail) => {
      const connected =
        connectPublishedFittingProduct(detail);
      return connected ? [connected] : [];
    }
  );

const threadToBarbedDetails =
  (threadToBarbedDetailsJson as FittingDetailRecord[]).flatMap(
    (detail) => {
      const connected =
        connectPublishedFittingProduct(detail);
      return connected ? [connected] : [];
    }
  );

/* LUER_FEMALE_DETAIL_COLLECTIONS_START */

const luerDetails =
  (luerDetailsJson as FittingDetailRecord[]).flatMap(
    (detail) => {
      const connected =
        connectPublishedFittingProduct(detail);
      return connected ? [connected] : [];
    }
  );

const femaleThreadDetails =
  (femaleThreadDetailsJson as FittingDetailRecord[]).flatMap(
    (detail) => {
      const connected =
        connectPublishedFittingProduct(detail);
      return connected ? [connected] : [];
    }
  );

/* LUER_FEMALE_DETAIL_COLLECTIONS_END */

const ProductDetailView =
  ProductDetailClient as unknown as ComponentType<{
    data: any;
  }>;

export const dynamicParams =
  false;

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

function findDetailInCollection(
  details: FittingDetailRecord[],
  seriesSlug: string
) {
  const targetSlug =
    normalizeSegment(seriesSlug);

  return (
    details.find(
      (item) =>
        normalizeSegment(
          item.slug
        ) === targetSlug
    ) || null
  );
}

function findFittingDetail(
  category: string,
  slug: string,
  seriesSlug: string
): ResolvedFittingDetail | null {
  if (category !== "fittings") {
    return null;
  }

  if (
    slug ===
    "hard-tube-fittings"
  ) {
    const detail =
      findDetailInCollection(
        hardTubeDetails,
        seriesSlug
      );

    return detail
      ? {
          detail,
          productTypeId:
            "hard-tube-fittings",
          fallbackName:
            "硬管接头",
        }
      : null;
  }

  if (
    slug ===
    "thread-to-barbed-fittings"
  ) {
    const detail =
      findDetailInCollection(
        threadToBarbedDetails,
        seriesSlug
      );

    return detail
      ? {
          detail,
          productTypeId:
            "thread-to-barbed-fittings",
          fallbackName:
            "螺纹转倒刺接头",
        }
      : null;
  }

  /* LUER_FEMALE_DETAIL_RESOLVE_START */

  if (
    category ===
      "fittings" &&
    slug ===
      "luer-fittings"
  ) {
    const detail =
      findDetailInCollection(
        luerDetails,
        seriesSlug
      );

    return detail
      ? {
          detail,
          productTypeId:
            "luer-fittings",
          fallbackName:
            "鲁尔接头",
        }
      : null;
  }

  if (
    category ===
      "fittings" &&
    slug ===
      "female-thread-adapters"
  ) {
    const detail =
      findDetailInCollection(
        femaleThreadDetails,
        seriesSlug
      );

    return detail
      ? {
          detail,
          productTypeId:
            "female-thread-adapters",
          fallbackName:
            "内螺纹互转接头",
        }
      : null;
  }

  /* LUER_FEMALE_DETAIL_RESOLVE_END */

  return null;
}

function toFittingClientData(
  resolved:
    ResolvedFittingDetail
) {
  const {
    detail,
    productTypeId,
    fallbackName,
  } = resolved;

  const mainImage =
    detail.mainImage ||
    detail.image ||
    detail.heroImage ||
    detail.imageCard ||
    "";

  return {
    ...detail,

    sourceType:
      "fitting-detail",

    category:
      "fittings",

    categoryId:
      "fittings",

    categoryLabel:
      "接头系列",

    productTypeId,

    productTypeName:
      detail.productTypeName ||
      detail.name ||
      fallbackName,

    slug:
      detail.slug,

    model:
      detail.model,

    name:
      detail.name ||
      detail.title ||
      fallbackName,

    title:
      detail.title ||
      detail.name ||
      fallbackName,

    description:
      detail.description || "",

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

    mainImage,
    image:
      mainImage,
    heroImage:
      mainImage,
    imageCard:
      mainImage,

    additionalImages:
      Array.isArray(
        detail.additionalImages
      )
        ? detail.additionalImages
        : [],

    specs:
      Array.isArray(
        detail.specs
      )
        ? detail.specs
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

    detailHref:
      `/products/fittings/${productTypeId}/${detail.slug}`,

    href:
      `/products/fittings/${productTypeId}/${detail.slug}`,

    selectionHref:
      `/products/fittings/${productTypeId}`,
  };
}

export function generateStaticParams() {
  const existingSeriesParams =
    getSeriesRouteParams().filter(
      (item) =>
        !(
          item.category === "pumps" &&
          item.slug === "piston-pump"
        )
    );

  const hardTubeParams =
    hardTubeDetails.map(
      (detail) => ({
        category:
          "fittings",

        slug:
          "hard-tube-fittings",

        seriesSlug:
          normalizeSegment(
            detail.slug
          ),
      })
    );

  const threadToBarbedParams =
    threadToBarbedDetails.map(
      (detail) => ({
        category:
          "fittings",

        slug:
          "thread-to-barbed-fittings",

        seriesSlug:
          normalizeSegment(
            detail.slug
          ),
      })
    );

  const luerParams =
    luerDetails.map(
      (detail) => ({
        category:
          "fittings",

        slug:
          "luer-fittings",

        seriesSlug:
          normalizeSegment(
            detail.slug
          ),
      })
    );

  const femaleThreadParams =
    femaleThreadDetails.map(
      (detail) => ({
        category:
          "fittings",

        slug:
          "female-thread-adapters",

        seriesSlug:
          normalizeSegment(
            detail.slug
          ),
      })
    );

  const routeMap =
    new Map<
      string,
      {
        category: string;
        slug: string;
        seriesSlug: string;
      }
    >();

  [
    ...existingSeriesParams,
    ...hardTubeParams,
    ...threadToBarbedParams,
    ...luerParams,
    ...femaleThreadParams,
  ]
    .filter(
      (item) =>
        Boolean(
          item &&
          item.category &&
          item.slug &&
          item.seriesSlug
        )
    )
    .forEach((item) => {
      const key = [
        item.category,
        item.slug,
        item.seriesSlug,
      ].join("/");

      routeMap.set(
        key,
        item
      );
    });

  return Array.from(
    routeMap.values()
  );
}

export async function generateMetadata({
  params,
}: ProductsSeriesRoutePageProps): Promise<Metadata> {
  const {
    category,
    slug,
    seriesSlug,
  } = await params;

  const fittingDetail =
    findFittingDetail(
      category,
      slug,
      seriesSlug
    );

  if (fittingDetail) {
    const {
      detail,
      fallbackName,
    } = fittingDetail;
    const pageData =
      toFittingClientData(
        fittingDetail
      );
    const title =
      detail.seo?.title ||
      `${detail.model} ${
        detail.name ||
        detail.title ||
        fallbackName
      } | FOREACH`;
    const description =
      detail.seo?.description ||
      detail.description ||
      "";

    return {
      title,
      description,
      ...buildProductSocialMetadata({
        data: pageData,
        title,
        description,
        canonicalUrl: `/products/${category}/${slug}/${seriesSlug}/`,
      }),
    };
  }

  const route =
    resolveSeriesRoute(
      category,
      slug,
      seriesSlug
    );

  if (!route) {
    return {};
  }

  if (route.productTypeId === "diaphragm-pump") {
    const canonicalPath = `/products/${category}/${slug}/${seriesSlug}/`;

    return {
      title: route.title,
      description: route.description,
      alternates: {
        canonical: canonicalPath,
        languages: {
          "zh-CN": canonicalPath,
          "en-US": `/en${canonicalPath}`,
          es: `/es${canonicalPath}`,
          fr: `/fr${canonicalPath}`,
          ko: `/ko${canonicalPath}`,
          ru: `/ru${canonicalPath}`,
          "x-default": canonicalPath,
        },
      },
      openGraph: {
        type: "website",
        locale: "zh_CN",
        url: canonicalPath,
        siteName: "FOREACH",
        title: route.title,
        description: route.description,
      },
      twitter: {
        card: "summary",
        title: route.title,
        description: route.description,
      },
    };
  }

  return {
    title:
      route.title,

    description:
      route.description,
  };
}

export default async function ProductsSeriesRoutePage({
  params,
}: ProductsSeriesRoutePageProps) {
  const {
    category,
    slug,
    seriesSlug,
  } = await params;

  const fittingDetail =
    findFittingDetail(
      category,
      slug,
      seriesSlug
    );

  if (fittingDetail) {
    return (
      <ProductDetailView
        data={
          toFittingClientData(
            fittingDetail
          )
        }
      />
    );
  }

  const route =
    resolveSeriesRoute(
      category,
      slug,
      seriesSlug
    );

  if (!route) {
    notFound();
  }

  return (
    <Suspense
      fallback={
        <ProductPageSkeleton
          variant="selection"
        />
      }
    >
      <ProductSelectionClient
        locale="zh"
        initialCategoryId={
          route.categoryId
        }
        initialProductTypeId={
          route.productTypeId
        }
        initialFilters={
          route.initialFilters
        }
      />
    </Suspense>
  );
}
