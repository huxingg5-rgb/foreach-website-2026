import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import ProductPageSkeleton from "@/components/common/ProductPageSkeleton";
import ProductSelectionClient from "@/components/products/selection/ProductSelectionClient";
import { englishProductDetailRoutes } from "@/data/products/product-detail-routes.generated";
import {
  getDiaphragmPumpCategoryCopy,
  getDiaphragmPumpReferenceModel,
} from "@/data/products/detail/diaphragm-pump-reference-models";
import {
  DIAPHRAGM_PUMP_SERIES_SLUGS,
  getDiaphragmPumpLanguageAlternates,
  getDiaphragmPumpPath,
  isDiaphragmPumpFinalSegments,
  migrateDiaphragmPumpRouteSegments,
  normalizeDiaphragmPumpLocale,
} from "@/data/products/detail/diaphragm-pump-routes";
import { siteSearchIndex } from "@/data/search/site-search-index.generated";
import luerDetailsJson from "@/data/products/generated/fittings/luer-fittings/detail/index.json";
import {
  isPublishedFittingDetailRoute,
} from "@/data/products/selection/fitting-publication.generated";
import {
  resolveCategoryRoute,
  resolveProductTypeRoute,
  resolveSeriesRoute,
} from "@/data/products/selection/product-route-map";
import type { ProductRouteInitialFilters } from "@/data/products/selection/product-route-map";
import { isSupportedLocale, type LocaleCode } from "@/lib/i18n";

import ProductDetailRoutePage from "@/app/products/[category]/[slug]/page";
import ProductsSeriesRoutePage from "@/app/products/[category]/[slug]/[seriesSlug]/page";
import BarbedFittingDetailPage from "@/app/products/fittings/barbed-fittings/[slug]/page";
import BulkheadBarbedFittingDetailPage from "@/app/products/fittings/bulkhead-barbed-fittings/[slug]/page";
import CheckValveDetailPage from "@/app/products/fittings/check-valves/[slug]/page";
import FilterDetailPage from "@/app/products/fittings/filters/[slug]/page";
import QuickConnectFittingDetailPage from "@/app/products/fittings/quick-connect-fittings/[slug]/page";
import QuickConnectQ20Page from "@/app/products/fittings/quick-connect-fittings/q20/page";
import QuickConnectQ40Page from "@/app/products/fittings/quick-connect-fittings/q40/page";
import QuickConnectQ60Page from "@/app/products/fittings/quick-connect-fittings/q60/page";
import DiaphragmPumpDetailPage, {
  getDiaphragmPumpMetadata,
} from "@/components/products/diaphragm-pumps/DiaphragmPumpDetailRoute";
import PipettingPumpDetailPage from "@/app/products/pumps/pipetting-pumps/[slug]/page";
import PlungerPumpDetailPage from "@/app/products/pumps/plunger-pumps/[slug]/page";
import SyringePumpDetailPage from "@/app/products/pumps/syringe-pumps/[slug]/page";
import ValvelessPumpDetailPage from "@/app/products/pumps/valveless-pumps/[slug]/page";
import ProbeDetailPage from "@/app/products/probes/[slug]/page";
import TubingDetailStaticPage from "@/app/products/tubing/_components/TubingDetailStaticPage";
import ValveDetailPage from "@/app/products/valves/[slug]/page";

import "@/app/products/products.css";

type ProductLocaleRoutePageProps = {
  params: Promise<{
    locale: string;
    segments: string[];
  }>;
};


/* LUER_ENGLISH_DETAIL_ROUTES_START */

/*
 * 英文 catch-all 路由设置了 dynamicParams = false，
 * 所以所有鲁尔详情型号必须提前加入静态参数清单。
 */
type LuerEnglishDetailRoute = {
  slug?: string;
};

const luerEnglishProductDetailRoutes =
  (
    luerDetailsJson as
      LuerEnglishDetailRoute[]
  )
    .map((detail) =>
      String(
        detail.slug || ""
      )
        .trim()
        .toLowerCase()
    )
    .filter(Boolean)
    .map((detailSlug) => [
      "fittings",
      "luer-fittings",
      detailSlug,
    ]);

const allEnglishProductDetailRoutes:
  string[][] = [
    ...englishProductDetailRoutes.map(
      (segments) => [
        ...segments,
      ]
    ),
    ...luerEnglishProductDetailRoutes,
  ].filter((segments) => {
    const [category, productTypeId, slug] = segments;

    if (
      category !== "fittings" ||
      segments.length !== 3
    ) {
      return true;
    }

    if (
      productTypeId === "quick-connect-fittings" &&
      ["q20", "q40", "q60"].includes(slug)
    ) {
      return true;
    }

    return isPublishedFittingDetailRoute(
      productTypeId,
      slug
    );
  });

/* LUER_ENGLISH_DETAIL_ROUTES_END */

const ROUTE_TITLES: Record<string, string> = {
  control: "Control Modules",
  fittings: "Fittings",
  probes: "Probes and Needles",
  pumps: "Pumps",
  tubing: "Tubing",
  valves: "Valves",
  "barbed-fittings": "Barbed Fittings",
  "bulkhead-barbed-fittings": "Bulkhead Barbed Fittings",
  "check-valves": "Check Valves",
  "diaphragm-pumps": "Diaphragm Pumps",
  "miniature-diaphragm-pumps": "Miniature Diaphragm Pumps",
  "female-thread-adapters": "Female Thread Adapters",
  filters: "Inline Filters",
  "hard-tube-fittings": "Hard Tube Fittings",
  "luer-fittings": "Luer Fittings",
  "pipetting-pumps": "Pipetting Pumps",
  "plunger-pumps": "Plunger Pumps",
  "quick-connect-fittings": "Quick-Connect Fittings",
  "syringe-pumps": "Syringe Pumps",
  "thread-to-barbed-fittings": "Thread-to-Barb Fittings",
  "valveless-pumps": "Valveless Piston Pumps",
};

export const dynamicParams = false;

const INTERNATIONAL_PRODUCT_LOCALES: LocaleCode[] = ["en", "es", "fr", "ko", "ru"];

function getProductRoutesForLocale(_locale: LocaleCode | string) {
  return migrateDiaphragmPumpRouteSegments(allEnglishProductDetailRoutes);
}

export function generateStaticParams() {
  return INTERNATIONAL_PRODUCT_LOCALES.flatMap((locale) =>
    getProductRoutesForLocale(locale).map((segments) => ({
      locale,
      segments: [...segments],
    })),
  );
}

function titleFromSlug(slug: string) {
  return slug
    .split("-")
    .filter(Boolean)
    .map((part) => {
      if (/\d/.test(part) || part.length <= 4) {
        return part.toUpperCase();
      }

      return `${part[0]?.toUpperCase() ?? ""}${part.slice(1)}`;
    })
    .join(" ");
}

function getRouteTitle(segments: string[]) {
  const lastSegment = segments.at(-1) ?? "products";

  return ROUTE_TITLES[lastSegment] || titleFromSlug(lastSegment);
}

function routeExists(locale: string, segments: string[]) {
  const routeKey = segments.join("/");

  return getProductRoutesForLocale(locale).some(
    (route) => route.join("/") === routeKey
  );
}

function renderSelectionPage({
  locale,
  categoryId,
  productTypeId,
  initialFilters,
}: {
  locale: string;
  categoryId: string;
  productTypeId?: string;
  initialFilters?: ProductRouteInitialFilters;
}) {
  return (
    <Suspense fallback={<ProductPageSkeleton variant="selection" />}>
      <ProductSelectionClient
        locale={locale as "en" | "es" | "fr" | "ko" | "ru"}
        initialCategoryId={categoryId}
        initialProductTypeId={productTypeId}
        initialFilters={initialFilters}
      />
    </Suspense>
  );
}

async function getDiaphragmPumpRouteMetadata(
  locale: LocaleCode,
  segments: string[],
): Promise<Metadata | null> {
  if (!isDiaphragmPumpFinalSegments(segments)) return null;

  const childSlug = segments[2] || "";
  const reference = getDiaphragmPumpReferenceModel(childSlug);
  const isSeries = DIAPHRAGM_PUMP_SERIES_SLUGS.includes(childSlug as never);

  if (reference || isSeries) {
    return getDiaphragmPumpMetadata({
      params: Promise.resolve({ slug: childSlug }),
      locale,
    });
  }

  const normalizedLocale = normalizeDiaphragmPumpLocale(locale);
  const copy = getDiaphragmPumpCategoryCopy(normalizedLocale);
  const heading = childSlug === "liquid-diaphragm-pumps"
    ? copy.liquid
    : childSlug === "gas-liquid-diaphragm-pumps"
      ? copy.gasLiquid
      : copy.parent;
  const isLiquidCategory = childSlug === "liquid-diaphragm-pumps";
  const isGasLiquidCategory = childSlug === "gas-liquid-diaphragm-pumps";
  const title = childSlug
    ? normalizedLocale === "zh" && (isLiquidCategory || isGasLiquidCategory)
      ? `${heading}｜FOREACH`
      : `${heading} | FOREACH`
    : copy.seoTitle;
  const description = isLiquidCategory
    ? copy.liquidSeoDescription || copy.seoDescription
    : isGasLiquidCategory
      ? copy.gasLiquidSeoDescription || copy.seoDescription
      : copy.seoDescription;
  const canonicalPath = getDiaphragmPumpPath(
    normalizedLocale,
    childSlug || undefined,
  );

  return {
    title,
    description,
    keywords: [heading, "FOREACH", "miniature diaphragm pump"],
    alternates: {
      canonical: canonicalPath,
      languages: getDiaphragmPumpLanguageAlternates(childSlug || undefined),
    },
    robots: { index: true, follow: true },
    openGraph: {
      type: "website",
      locale: normalizedLocale,
      url: canonicalPath,
      siteName: "FOREACH",
      title,
      description,
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
  };
}

export async function generateMetadata({
  params,
}: ProductLocaleRoutePageProps): Promise<Metadata> {
  const { locale, segments } = await params;

  if (
    segments[0] === "pumps" &&
    segments[1] === "miniature-diaphragm-pumps" &&
    segments[2] === "gas-diaphragm-pumps"
  ) {
    notFound();
  }

  if (!isSupportedLocale(locale) || locale === "zh-CN" || !routeExists(locale, segments)) {
    return {};
  }

  const diaphragmMetadata = await getDiaphragmPumpRouteMetadata(
    locale as LocaleCode,
    segments,
  );

  if (diaphragmMetadata) return diaphragmMetadata;

  const title = getRouteTitle(segments);
  const canonicalPath = `/${locale}/products/${segments.join("/")}/`;
  const isDetailRoute = segments.length >= 2;
  const description = isDetailRoute
    ? `Explore ${title} specifications, materials, interfaces, model configurations, and fluidic applications from FOREACH.`
    : `Explore FOREACH ${title} for precision fluid handling in IVD, life science, analytical instrumentation, and laboratory automation.`;
  const keywords = Array.from(
    new Set([
      title,
      "FOREACH",
      "precision fluid handling",
      "microfluidic components",
      "fluidic systems",
      ...(isDetailRoute ? ["product specifications", "model configurations"] : []),
    ])
  );
  const productPath = `/products/${segments.join("/")}`;
  const socialImagePath = siteSearchIndex.find(
    (item) =>
      item.module === "products" &&
      item.href.replace(/\/$/, "") === productPath,
  )?.image;
  const socialImage = socialImagePath
    ? new URL(socialImagePath, "https://www.foreachtek.com").toString()
    : undefined;

  return {
    title: `${title} | FOREACH`,
    description,
    keywords,
    alternates: {
      canonical: canonicalPath,
      languages: {
        "en-US": `/en/products/${segments.join("/")}/`,
        "es": `/es/products/${segments.join("/")}/`,
        "fr": `/fr/products/${segments.join("/")}/`,
        "ko": `/ko/products/${segments.join("/")}/`,
        "ru": `/ru/products/${segments.join("/")}/`,
      },
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      url: canonicalPath,
      siteName: "FOREACH",
      title: `${title} | FOREACH`,
      description,
      ...(socialImage
        ? { images: [{ url: socialImage, alt: title }] }
        : {}),
    },
    twitter: {
      card: "summary",
      title: `${title} | FOREACH`,
      description,
      ...(socialImage ? { images: [socialImage] } : {}),
    },
  };
}

export default async function ProductLocaleRoutePage({
  params,
}: ProductLocaleRoutePageProps) {
  const { locale, segments } = await params;

  if (!isSupportedLocale(locale) || locale === "zh-CN" || !routeExists(locale, segments)) {
    notFound();
  }

  const [category, slug, seriesSlug] = segments;

  if (segments.length === 1) {
    const categoryRoute = resolveCategoryRoute(category);

    if (!categoryRoute) {
      notFound();
    }

    return renderSelectionPage({
      locale,
      categoryId: categoryRoute.categoryId,
    });
  }

  if (segments.length === 2) {
    const productTypeRoute = resolveProductTypeRoute(category, slug);

    if (productTypeRoute) {
      return renderSelectionPage({
        locale,
        categoryId: productTypeRoute.categoryId,
        productTypeId: productTypeRoute.productTypeId,
      });
    }

    if (category === "valves") {
      return ValveDetailPage({ params: Promise.resolve({ slug }) });
    }

    if (category === "probes") {
      return ProbeDetailPage({ params: Promise.resolve({ slug }) });
    }

    if (category === "tubing") {
      return <TubingDetailStaticPage slug={slug} />;
    }

    return ProductDetailRoutePage({
      params: Promise.resolve({ category, slug }),
    });
  }

  if (segments.length !== 3) {
    notFound();
  }

  if (
    category === "fittings" &&
    slug === "quick-connect-fittings"
  ) {
    if (seriesSlug === "q20") {
      return <QuickConnectQ20Page />;
    }

    if (seriesSlug === "q40") {
      return <QuickConnectQ40Page />;
    }

    if (seriesSlug === "q60") {
      return <QuickConnectQ60Page />;
    }
  }

  const seriesRoute = resolveSeriesRoute(category, slug, seriesSlug);

  if (seriesRoute) {
    return renderSelectionPage({
      locale,
      categoryId: seriesRoute.categoryId,
      productTypeId: seriesRoute.productTypeId,
      initialFilters: seriesRoute.initialFilters,
    });
  }

  if (category === "pumps") {
    const detailParams = Promise.resolve({ slug: seriesSlug });

    if (slug === "plunger-pumps") {
      return PlungerPumpDetailPage({ params: detailParams });
    }

    if (slug === "miniature-diaphragm-pumps") {
      return DiaphragmPumpDetailPage({
        params: detailParams,
        locale: locale as LocaleCode,
      });
    }

    if (slug === "pipetting-pumps") {
      return PipettingPumpDetailPage({ params: detailParams });
    }

    if (slug === "syringe-pumps") {
      return SyringePumpDetailPage({ params: detailParams });
    }

    if (slug === "valveless-pumps") {
      return ValvelessPumpDetailPage({ params: detailParams });
    }
  }

  if (category === "fittings") {
    const detailParams = Promise.resolve({ slug: seriesSlug });

    if (slug === "barbed-fittings") {
      return BarbedFittingDetailPage({ params: detailParams });
    }

    if (slug === "quick-connect-fittings") {
      return QuickConnectFittingDetailPage({ params: detailParams });
    }

    if (slug === "bulkhead-barbed-fittings") {
      return BulkheadBarbedFittingDetailPage({ params: detailParams });
    }

    if (slug === "filters") {
      return FilterDetailPage({ params: detailParams });
    }

    if (slug === "check-valves") {
      return CheckValveDetailPage({ params: detailParams });
    }
  }

  return ProductsSeriesRoutePage({
    params: Promise.resolve({ category, slug, seriesSlug }),
  });
}
