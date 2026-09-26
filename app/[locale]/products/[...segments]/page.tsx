import { getPipettingSeriesSlug, getPipettingSeriesKey, migratePipettingSegments, isPipettingModelRoute } from "@/data/products/selection/pipetting-pump-routes";
import { getPipettingModelMetadata } from "@/services/products/getPipettingModelMetadata";
import { syringeModelRoutes } from "@/data/products/selection/syringe-pump-routes";
import { getSyringeModelMetadata } from "@/services/products/getSyringeModelMetadata";
import { getSyringeSeriesIndex, syringeSeriesSlugs } from "@/data/products/selection/syringe-pump-series";
import { getSyringeSeriesMetadata } from "@/services/products/getSyringeSeriesMetadata";
import { getPipettingMetadata } from "@/services/products/getPipettingMetadata";
import { pipettingSeriesSlugs, isPipettingPageKey } from "@/data/products/selection/pipetting-pump-seo";
import { syringePumpIntroLocales } from "@/data/products/selection/syringe-pump-intro.locales";
import { getControlModuleDetailBySlug } from "@/data/products/control-modules/control-module-detail.generated";
import { getControlModuleProductDetailData } from "@/services/products/adapters/getControlModuleProductDetailData";
import { getQuickConnectSeriesDetailData } from "@/data/products/detail/getQuickConnectSeriesDetailData";
import syringePumpDetails from "@/data/products/generated/pumps/syringe-pumps/detail/index.json";
import { getSyringePumpProductDetailData } from "@/services/products/adapters/getSyringePumpProductDetailData";
import { getPistonPumpRedirect } from "@/lib/seo/piston-pump-migration";
import { getPistonPumpMetadata } from "@/services/products/getPistonPumpMetadata";
import { getCompactPumpContent } from "@/data/products/detail/applications/compact-pump-content";
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
import PlungerPumpDetailPage from "@/app/products/pumps/piston-pump/[slug]/page";
import SyringePumpDetailPage from "@/app/products/pumps/syringe-pumps/[slug]/page";
import ValvelessPumpDetailPage from "@/app/products/pumps/valveless-metering-pump/[slug]/page";
import { getValvelessPumpSeoTitle } from "@/data/products/detail/valveless-pump-seo";
import { getValvelessForeignContent, getValvelessLocaleCopy } from "@/data/products/detail/valveless-pump-locales";
import { getValvelessPumpLanguageAlternates, VALVELESS_PUMP_CATEGORY_SLUG_INTL, VALVELESS_PUMP_LEGACY_CATEGORY_SLUG } from "@/data/products/selection/valveless-pump-routes";
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
    ...pipettingSeriesSlugs.map(slug => ["pumps", "pipetting-pumps", slug]),
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
  "piston-pump": "Piston Pump",
  "quick-connect-fittings": "Quick-Connect Fittings",
  "syringe-pumps": "Syringe Pumps",
  "thread-to-barbed-fittings": "Thread-to-Barb Fittings",
  "valveless-pumps": "Valveless Piston Pumps",
};

export const dynamicParams = false;

const INTERNATIONAL_PRODUCT_LOCALES: LocaleCode[] = ["en", "es", "fr", "ko", "ru"];

function getProductRoutesForLocale(_locale: LocaleCode | string) {
  return migrateDiaphragmPumpRouteSegments([...allEnglishProductDetailRoutes, ...syringeSeriesSlugs.map(slug => ["pumps", "syringe-pumps", slug])])
    .map(segments => segments[0] === "pumps" && segments[1] === VALVELESS_PUMP_LEGACY_CATEGORY_SLUG
      ? ["pumps", VALVELESS_PUMP_CATEGORY_SLUG_INTL, ...segments.slice(2)] : segments)
    .map(segments => { const r = segments.length === 3 && segments[0] === "pumps" && segments[1] === "syringe-pumps" ? syringeModelRoutes.find(r => r.legacy === segments[2]) : undefined; return r ? ["pumps", "syringe-pumps", r.series, r.model] : segments; })
    .map(migratePipettingSegments)
    .filter(segments => !getPistonPumpRedirect(`/products/${segments.join("/")}/`));
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
  const title = isLiquidCategory
    ? copy.liquidSeoTitle
    : isGasLiquidCategory
      ? copy.gasLiquidSeoTitle
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
    keywords: [heading, "Foreach Technology", "miniature diaphragm pump"],
    alternates: {
      canonical: canonicalPath,
      languages: getDiaphragmPumpLanguageAlternates(childSlug || undefined),
    },
    robots: { index: true, follow: true },
    openGraph: {
      type: "website",
      locale: normalizedLocale,
      url: canonicalPath,
      siteName: "Foreach Technology",
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

  if (isPipettingModelRoute(segments)) return getPipettingModelMetadata(locale, segments[3]);
  const diaphragmMetadata = await getDiaphragmPumpRouteMetadata(
    locale as LocaleCode,
    segments,
  );

  if (diaphragmMetadata) return diaphragmMetadata;
  if (segments[0] === "pumps" && segments[1] === "pipetting-pumps" && (segments.length === 2 || (segments.length === 3 && getPipettingSeriesKey(segments[2])))) {
    const key = segments[2] ? getPipettingSeriesKey(segments[2])! : "category";
    if (isPipettingPageKey(key)) return getPipettingMetadata(locale, key);
  }
  if (segments[0] === "pumps" && segments[1] === "piston-pump" && segments.length <= 3) {
    const metadata = getPistonPumpMetadata(segments[2] || "", locale);
    if (metadata) return metadata;
  }

  const compactContent = locale === "en" && segments.length === 3 && segments[0] === "pumps" && segments[1] === "piston-pump"
    ? getCompactPumpContent(segments[2], "en") : undefined;
  const isValvelessRoute = segments[0] === "pumps" && (
    (segments.length === 2 && segments[1] === VALVELESS_PUMP_CATEGORY_SLUG_INTL) ||
    (segments.length === 3 && segments[1] === VALVELESS_PUMP_CATEGORY_SLUG_INTL)
  );
  const valvelessContent = isValvelessRoute && segments.length === 3 ? getValvelessForeignContent(segments[2], locale) : undefined;
  const valvelessCategory = isValvelessRoute && segments.length === 2 ? getValvelessLocaleCopy(locale) : undefined;
  const valvelessSeoTitle = valvelessContent ? getValvelessPumpSeoTitle(segments[2], locale)
    : valvelessCategory ? `${valvelessCategory.category.title} | FOREACH` : undefined;
  const title = compactContent ? compactContent.seoTitle.replace(/ \| Foreach(?: Technology)?$/i, "") : getRouteTitle(segments);
  const syringeModel = segments.length === 4 && segments[0] === "pumps" && segments[1] === "syringe-pumps" ? syringeModelRoutes.find(r => r.series === segments[2] && r.model === segments[3]) : undefined;
  if (syringeModel) return getSyringeModelMetadata(locale, syringeModel.legacy);
  const syringeSeriesIndex = segments.length === 3 && segments[0] === "pumps" && segments[1] === "syringe-pumps" ? getSyringeSeriesIndex(segments[2]) : -1;
  if (syringeSeriesIndex >= 0) return getSyringeSeriesMetadata(locale, syringeSeriesIndex);
  const canonicalPath = `/${locale}/products/${segments.join("/")}/`;
  const syringeLocaleCopy = segments.length === 2 && segments[0] === "pumps" && segments[1] === "syringe-pumps" ? syringePumpIntroLocales[locale] : undefined;
  const isEnglishSyringeCategory = locale === "en" && segments.length === 2 && segments[0] === "pumps" && segments[1] === "syringe-pumps";
  const syringeSeoTitle = isEnglishSyringeCategory ? "OEM Syringe Pumps for Automated Liquid Handling | FOREACH" : syringeLocaleCopy?.seoTitle;
  const isDetailRoute = segments.length >= 2;
  const description = syringeLocaleCopy?.description || (isEnglishSyringeCategory ? "Explore FOREACH OEM syringe pumps with solenoid or rotary valves, 30/60 mm strokes and single- or multichannel configurations for automated liquid handling." : undefined) || valvelessContent?.metaDescription || valvelessCategory?.category.metaDescription || compactContent?.metaDescription || (isDetailRoute
    ? `Explore ${title} specifications, materials, interfaces, model configurations, and fluidic applications from Foreach.`
    : `Explore Foreach ${title} for precision fluid handling in IVD, life science, analytical instrumentation, and laboratory automation.`);
  const keywords = Array.from(
    new Set([
      title,
      "Foreach Technology",
      "precision fluid handling",
      "microfluidic components",
      "fluidic systems",
      ...(isDetailRoute ? ["product specifications", "model configurations"] : []),
    ])
  );
  const productPath = `/products/${segments.join("/")}`;
  // These templates share the body's adapter result instead of a search-index image.
  let productImageData: { mainImage?: string } | null = null;
  if (valvelessContent) {
    productImageData = valvelessContent.source;
  } else if (segments.length === 2 && segments[0] === "control") {
    const detail = getControlModuleDetailBySlug(segments[1]);
    if (detail) productImageData = getControlModuleProductDetailData(detail);
  } else if (
    segments.length === 3 &&
    segments[0] === "fittings" &&
    segments[1] === "quick-connect-fittings" &&
    ["q20", "q40", "q60"].includes(segments[2])
  ) {
    productImageData = getQuickConnectSeriesDetailData(segments[2]);
  } else if (
    segments.length === 3 &&
    segments[0] === "pumps" &&
    segments[1] === "syringe-pumps"
  ) {
    const detail = syringePumpDetails.find((item) => item.slug === segments[2]);
    if (detail) productImageData = getSyringePumpProductDetailData(detail);
  }
  const socialImagePath = productImageData ? productImageData.mainImage : siteSearchIndex.find(
    (item) =>
      item.module === "products" &&
      item.href.replace(/\/$/, "") === productPath,
  )?.image;
  const socialImage = socialImagePath
    ? new URL(socialImagePath, "https://www.foreachtek.com").toString()
    : undefined;

  return {
    title: syringeSeoTitle ? { absolute: syringeSeoTitle } : valvelessSeoTitle ? { absolute: valvelessSeoTitle } : compactContent ? { absolute: compactContent.seoTitle } : `${title} | Foreach Technology`,
    description,
    keywords: isValvelessRoute ? [valvelessContent?.model || valvelessCategory?.categoryName || title, getValvelessLocaleCopy(locale)?.categoryName || title, "FOREACH"] : keywords,
    alternates: {
      canonical: canonicalPath,
      languages: isValvelessRoute ? getValvelessPumpLanguageAlternates(segments[2]) : {
        ...((isEnglishSyringeCategory || syringeLocaleCopy) ? { "zh-CN": "/products/pumps/syringe-pumps/", "x-default": "/products/pumps/syringe-pumps/" } : {}),
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
      locale: isValvelessRoute ? ({ en: "en_US", es: "es_ES", fr: "fr_FR", ko: "ko_KR", ru: "ru_RU" }[locale] || "en_US") : "en_US",
      url: canonicalPath,
      siteName: "Foreach Technology",
      title: syringeSeoTitle || valvelessSeoTitle || `${title} | Foreach Technology`,
      description,
      ...(socialImage
        ? { images: [{ url: socialImage, alt: valvelessContent?.imageAlt || valvelessCategory?.category.title || title }] }
        : {}),
    },
    twitter: {
      card: "summary",
      title: syringeSeoTitle || valvelessSeoTitle || `${title} | Foreach Technology`,
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

  if (isPipettingModelRoute(segments)) return PipettingPumpDetailPage({params:Promise.resolve({slug:segments[3]})});
  const syringeModel = segments.length === 4 && segments[0] === "pumps" && segments[1] === "syringe-pumps" ? syringeModelRoutes.find(r => r.series === segments[2] && r.model === segments[3]) : undefined;
  if (syringeModel) return SyringePumpDetailPage({ params: Promise.resolve({ slug: syringeModel.legacy }) });
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
    const productTypeRoute = resolveProductTypeRoute(category, slug, locale);

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

    if (slug === "piston-pump") {
      return PlungerPumpDetailPage({
        params: detailParams,
        locale,
      });
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

    if (slug === VALVELESS_PUMP_CATEGORY_SLUG_INTL) {
      return ValvelessPumpDetailPage({ params: detailParams, renderLocale: locale });
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
