import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import ProductPageSkeleton from "@/components/common/ProductPageSkeleton";
import ProductSelectionClient from "@/components/products/selection/ProductSelectionClient";
import { englishProductDetailRoutes } from "@/data/products/product-detail-routes.generated";
import luerDetailsJson from "@/data/products/generated/fittings/luer-fittings/detail/index.json";
import {
  resolveCategoryRoute,
  resolveProductTypeRoute,
  resolveSeriesRoute,
} from "@/data/products/selection/product-route-map";
import type { ProductRouteInitialFilters } from "@/data/products/selection/product-route-map";

import ProductDetailRoutePage from "@/app/products/[category]/[slug]/page";
import ProductsSeriesRoutePage from "@/app/products/[category]/[slug]/[seriesSlug]/page";
import {
  HARD_TUBE_TARGET_LOCALES,
  isHardTubeTargetLocale,
} from "@/data/products/detail/hard-tube-fitting-detail.intl";
import { getTargetProductMetadataCopy } from "@/data/products/detail/product-detail.target.intl";
import BarbedFittingDetailPage from "@/app/products/fittings/barbed-fittings/[slug]/page";
import BulkheadBarbedFittingDetailPage from "@/app/products/fittings/bulkhead-barbed-fittings/[slug]/page";
import CheckValveDetailPage from "@/app/products/fittings/check-valves/[slug]/page";
import FilterDetailPage from "@/app/products/fittings/filters/[slug]/page";
import QuickConnectFittingDetailPage from "@/app/products/fittings/quick-connect-fittings/[slug]/page";
import QuickConnectQ20Page from "@/app/products/fittings/quick-connect-fittings/q20/page";
import QuickConnectQ40Page from "@/app/products/fittings/quick-connect-fittings/q40/page";
import QuickConnectQ60Page from "@/app/products/fittings/quick-connect-fittings/q60/page";
import DiaphragmPumpDetailPage from "@/app/products/pumps/diaphragm-pumps/[slug]/page";
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
  ];

const targetOnlySelectionRoutes = [
  ["control"],
  ["fittings", "check-valves"],
] as const;

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

export function generateStaticParams() {
  const englishParams = allEnglishProductDetailRoutes.map((segments) => ({
    locale: "en",
    segments: [...segments],
  }));
  const targetLocaleParams = allEnglishProductDetailRoutes
    .flatMap((segments) =>
      HARD_TUBE_TARGET_LOCALES.map((locale) => ({
        locale,
        segments: [...segments],
      })),
    );
  const targetOnlySelectionParams = targetOnlySelectionRoutes.flatMap((segments) =>
    HARD_TUBE_TARGET_LOCALES.map((locale) => ({
      locale,
      segments: [...segments],
    })),
  );

  return [...englishParams, ...targetLocaleParams, ...targetOnlySelectionParams];
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

  const exists = allEnglishProductDetailRoutes.some(
    (route) => route.join("/") === routeKey
  );

  const targetOnlyExists = isHardTubeTargetLocale(locale) && targetOnlySelectionRoutes.some(
    (route) => route.join("/") === routeKey,
  );

  return (exists && (locale === "en" || isHardTubeTargetLocale(locale))) || targetOnlyExists;
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

export async function generateMetadata({
  params,
}: ProductLocaleRoutePageProps): Promise<Metadata> {
  const { locale, segments } = await params;

  if (!routeExists(locale, segments)) {
    return {};
  }

  const title = getRouteTitle(segments);
  const productModel = isHardTubeTargetLocale(locale)
    ? String(segments.at(-1) || title).toUpperCase()
    : title;
  const canonicalPath = `/${locale}/products/${segments.join("/")}/`;
  const englishPath = `/en/products/${segments.join("/")}/`;
  const isDetailRoute = segments.length >= 2;
  const targetMetadata = isHardTubeTargetLocale(locale)
    ? getTargetProductMetadataCopy(segments, locale)
    : null;
  const metadataTitle = targetMetadata?.title || `${title} | FOREACH`;
  const description = targetMetadata?.description || (isDetailRoute
    ? `Explore ${title} specifications, materials, interfaces, model configurations, and fluidic applications from FOREACH.`
    : `Explore FOREACH ${title} for precision fluid handling in IVD, life science, analytical instrumentation, and laboratory automation.`);
  const keywords = Array.from(
    new Set([
      title,
      productModel,
      "FOREACH",
      "precision fluid handling",
      "microfluidic components",
      "fluidic systems",
      ...(targetMetadata?.keywords || []),
      ...(isDetailRoute ? ["product specifications", "model configurations"] : []),
    ])
  );

  return {
    title: metadataTitle,
    description,
    keywords,
    alternates: {
      canonical: canonicalPath,
      languages: {
        "en-US": englishPath,
        ...(locale === "es" ? { "es-ES": canonicalPath } : {}),
        ...(locale === "fr" ? { "fr-FR": canonicalPath } : {}),
        ...(locale === "ko" ? { "ko-KR": canonicalPath } : {}),
        ...(locale === "ru" ? { "ru-RU": canonicalPath } : {}),
      },
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      type: "website",
      locale:
        locale === "es" ? "es_ES" :
        locale === "fr" ? "fr_FR" :
        locale === "ko" ? "ko_KR" :
        locale === "ru" ? "ru_RU" : "en_US",
      url: canonicalPath,
      siteName: "FOREACH",
      title: metadataTitle,
      description,
    },
    twitter: {
      card: "summary",
      title: metadataTitle,
      description,
    },
  };
}

export default async function ProductLocaleRoutePage({
  params,
}: ProductLocaleRoutePageProps) {
  const { locale, segments } = await params;

  if (!routeExists(locale, segments)) {
    notFound();
  }

  const [category, slug, seriesSlug] = segments;

  if (segments.length === 1) {
    if (category === "control" && isHardTubeTargetLocale(locale)) {
      return renderSelectionPage({
        locale,
        categoryId: "control",
      });
    }

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
    if (
      category === "fittings" &&
      slug === "check-valves" &&
      isHardTubeTargetLocale(locale)
    ) {
      return renderSelectionPage({
        locale,
        categoryId: "fittings",
        productTypeId: "check-valves",
      });
    }

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

    if (slug === "diaphragm-pumps") {
      return DiaphragmPumpDetailPage({ params: detailParams });
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
