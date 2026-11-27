import { withPublishedTranslationMetadata } from "@/lib/seo/published-translation-metadata";
import { getFittingSelectionMetadata } from "@/lib/seo/fitting-selection-metadata";
import { getFittingDetailMetadata } from "@/lib/seo/fitting-detail-metadata";
import { getProbeControlDetailMetadata } from "@/lib/seo/probe-control-detail-metadata";
import { getFittingMainImageAlt } from "@/data/products/detail/fitting-image-description";
import { migrateControlModuleSegments, getControlModuleDetailSlugFromSegments, getControlModuleLanguageAlternates } from "@/data/products/selection/control-module-routes";
import ValveSelectionPage, {getValveSelectionMetadata} from '@/components/products/selection/ValveSelectionPage';
import HpValveDetailPage, {getHpValveMetadata} from '@/components/products/detail/HpValveDetailPage';
import {getValveSeriesRoute} from '@/data/products/selection/valve-routes';
import { getPipettingSeriesSlug, getPipettingSeriesKey, migratePipettingSegments, isPipettingModelRoute, pipettingModelSlugs } from "@/data/products/selection/pipetting-pump-routes";
import { getHindiSyringeModelMetadata } from "@/data/products/detail/instrument-pumps.hi";
import { getHindiPipettingSelectionCopy, hindiSyringeCategoryDescription, hindiSyringeSelectionCopy } from "@/data/products/selection/instrument-pump-selection.hi";
import { getPipettingModelMetadata } from "@/services/products/getPipettingModelMetadata";
import { syringeModelRoutes } from "@/data/products/selection/syringe-pump-routes";
import { getItalianSyringeModelMetadata } from "@/data/products/detail/syringe-pump-detail.it";
import { italianSyringeCategoryDescription, italianSyringeSelectionCopy } from "@/data/products/selection/syringe-pump-selection.it";
import { getSyringeModelMetadata } from "@/services/products/getSyringeModelMetadata";
import { getSyringeSeriesIndex, syringeSeriesSlugs } from "@/data/products/selection/syringe-pump-series";
import { getSyringeSeriesMetadata } from "@/services/products/getSyringeSeriesMetadata";
import { getPipettingMetadata } from "@/services/products/getPipettingMetadata";
import { getItalianPipettingSelectionCopy } from "@/data/products/selection/pipetting-pump-selection.it";
import { pipettingSeriesSlugs, isPipettingPageKey } from "@/data/products/selection/pipetting-pump-seo";
import { syringePumpIntroLocales } from "@/data/products/selection/syringe-pump-intro.locales";
import { getControlModuleDetailBySlug } from "@/data/products/control-modules/control-module-detail.generated";
import { getPdm5LocaleCopy } from "@/data/products/detail/pdm5-locales";
import { getAbdLocaleCopy } from "@/data/products/detail/abd-locales";
import { getControlModuleProductDetailData } from "@/services/products/adapters/getControlModuleProductDetailData";
import syringePumpDetails from "@/data/products/generated/pumps/syringe-pumps/detail/index.json";
import { getSyringePumpProductDetailData } from "@/services/products/adapters/getSyringePumpProductDetailData";
import { getPistonPumpRedirect } from "@/lib/seo/piston-pump-migration";
import { getPistonPumpMetadata } from "@/services/products/getPistonPumpMetadata";
import { getGermanPistonPumpMetadata } from "@/services/products/getGermanPistonPumpDetail";
import { getCompactPumpContent } from "@/data/products/detail/applications/compact-pump-content";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import ProductPageSkeleton from "@/components/common/ProductPageSkeleton";
import ProductSelectionClient from "@/components/products/selection/ProductSelectionClient";
import { getGermanSyringeSelectionCopy, germanSyringeSelection } from "@/data/products/selection/syringe-pump-selection.de";
import { getGermanSyringeModelHeading } from "@/data/products/detail/syringe-pump-detail.de";
import { italianDiaphragmDetailSlugs } from "@/data/products/detail/diaphragm-pump-content.it";
import { getHindiDiaphragmSelectionCopy } from "@/data/products/selection/diaphragm-pump-selection.hi";
import { getItalianDiaphragmSelectionCopy } from "@/data/products/selection/diaphragm-pump-selection.it";
import { getGermanDiaphragmPumpSelectionCopy } from "@/data/products/selection/diaphragm-pump-selection.de";
import { getGermanProductCategoryContent } from "@/components/products/selection/product-selection-content.de";
import { getGermanProductDetailContent, getGermanProductDetailMetadata, type GermanProductDetailContent } from "@/data/products/detail/product-detail-content.de";
import { germanFittingDraftFamilies, germanFittingDraftPathPattern } from "@/data/products/detail/german-fitting-draft-routes";
import { isLocalizedHindiDraftPath, isLocalizedItalianDraftPath, germanControlProductDraftPaths, germanProbeDetailDraftPaths, germanHpValveDraftPath, germanDiaphragmPumpDraftPaths, germanPistonPumpDraftPaths, germanValvelessPumpDraftPaths, germanSyringePumpDraftPaths, germanPipettingPumpDraftPaths, germanLocalizedProductSelectionPaths, languageDraftsEnabled } from "@/lib/i18n/draft-languages";
import { getItalianQuickConnectFittingContent, italianQuickConnectFittingSlugs } from "@/data/products/detail/quick-connect-detail.it";
import { getItalianFemaleAdapterContent, italianFemaleAdapterSlugs } from "@/data/products/detail/female-adapter-detail.it";
import { getItalianCompactFittingContent, italianCompactFittingSlugs } from "@/data/products/detail/compact-fitting-detail.it";
import { getHindiPistonPumpMetadata } from "@/services/products/getHindiPistonPumpDetail";
import { getItalianPistonPumpMetadata, italianPistonPumpSlugs } from "@/services/products/getItalianPistonPumpDetail";
import { getItalianLuerFittingContent, italianLuerFittingSlugs } from "@/data/products/detail/luer-fitting-detail.it";
import { getItalianThreadToBarbedFittingContent, italianThreadToBarbedFittingSlugs } from "@/data/products/detail/thread-to-barbed-fitting-detail.it";
import { getHindiLuerFittingContent, hindiLuerFittingSlugs } from "@/data/products/detail/luer-fitting-detail.hi";
import { getHindiQuickConnectFittingContent, hindiQuickConnectFittingSlugs } from "@/data/products/detail/quick-connect-detail.hi";
import { getHindiFemaleAdapterContent, hindiFemaleAdapterSlugs } from "@/data/products/detail/female-adapter-detail.hi";
import { getHindiCompactFittingContent, hindiCompactFittingSlugs } from "@/data/products/detail/compact-fitting-detail.hi";
import { getHindiThreadToBarbedFittingContent, hindiThreadToBarbedFittingSlugs } from "@/data/products/detail/thread-to-barbed-fitting-detail.hi";
import { getHindiBarbedFittingContent, hindiBarbedFittingSlugs } from "@/data/products/detail/barbed-fitting-detail.hi";
import { getItalianBarbedFittingContent, italianBarbedFittingSlugs } from "@/data/products/detail/barbed-fitting-detail.it";
import { getHindiProbeTypeIntro, hindiProbeOverview, hindiProbeSelectionSegments } from "@/data/products/selection/probe-selection.hi";
import { hindiProductSelectionIntros } from "@/data/products/selection/product-selection.hi";
import { italianProductSelectionIntros } from "@/data/products/selection/product-selection.it";
import { buildProductSocialMetadata } from "@/lib/seo/product-social-metadata";
import { getCanonicalUrl } from "@/lib/seo/site-url";
import { englishProductDetailRoutes } from "@/data/products/product-detail-routes.generated";
import {
  probeTypesEn,
  controlTypesEn,
  getProbeSelectionPathEn,
  getControlSelectionPathEn,
  probeOverviewHeadingEn,
  probeOverviewParagraphsEn,
  controlOverviewHeadingEn,
  controlOverviewParagraphsEn,
  probeIntrosEn,
  controlIntrosEn,
  probeControlDetailCopyEn,
} from "@/data/products/selection/probe-control-selection.en";
import { getItalianProbeControlTypeIntro, italianProbeControlOverview, italianProbeControlSelectionSegments } from "@/data/products/selection/probe-control-selection.it";
import {
  getDiaphragmPumpCategoryCopy,
  getDiaphragmPumpReferenceModel,
} from "@/data/products/detail/diaphragm-pump-reference-models";
import {
  DIAPHRAGM_PUMP_REFERENCE_SLUGS,
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
import FittingRelatedResources from "@/components/products/detail/FittingRelatedResources";
import ProductDetailClient from "@/components/products/detail/ProductDetailClient";
import { getInstrumentProductSections } from "@/components/products/detail/InstrumentProductSections";
import RelatedResources from "@/components/common/related-resources/RelatedResources";
import DiaphragmPumpDetailPage, {
  getDiaphragmPumpMetadata,
} from "@/components/products/diaphragm-pumps/DiaphragmPumpDetailRoute";
import PipettingPumpDetailPage from "@/app/products/pumps/pipetting-pumps/[slug]/page";
import PlungerPumpDetailPage from "@/app/products/pumps/piston-pump/[slug]/page";
import SyringePumpDetailPage from "@/app/products/pumps/syringe-pumps/[slug]/page";
import ValvelessPumpDetailPage from "@/app/products/pumps/valveless-metering-pump/[slug]/page";
import { getValvelessPumpSeoTitle } from "@/data/products/detail/valveless-pump-seo";
import { valvelessPumpSeries, getValvelessPumpSeries, getValvelessPumpSeriesMetadata } from "@/data/products/selection/valveless-pump-series";
import { getValvelessForeignContent, getValvelessLocaleCopy } from "@/data/products/detail/valveless-pump-locales";
import { getValvelessPumpLanguageAlternates, VALVELESS_PUMP_CATEGORY_SLUG_INTL, VALVELESS_PUMP_LEGACY_CATEGORY_SLUG, VALVELESS_PUMP_MODEL_SLUGS } from "@/data/products/selection/valveless-pump-routes";
import { hindiProbeDetailSlugs, italianProbeDetailSlugs } from "@/data/products/detail/probe-guide.intl";
import ProbeDetailPage from "@/app/products/probes/[slug]/page";
import { getTubingMaterialCopy, getTubingSeriesCopy } from "@/data/products/tubing/content";
import { tubingMaterials, isTubingMaterial } from "@/data/products/selection/tubing-selection-routes";
import TubingSelectionPage, { getTubingSelectionMetadata } from "@/components/products/selection/TubingSelectionPage";
import TubingDetailStaticPage, { getTubingMetadata } from "@/app/products/tubing/_components/TubingDetailStaticPage";
import { getTubingAlternates, getTubingMaterialSeoCopy, getTubingSeriesMetadata } from "@/data/products/tubing/metadata";

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
    ["valves", "high-pressure-valves", "hp"],
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
      return false;
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

const englishProbeControlSelectionRoutes = [
  ["control"],
  ...controlTypesEn.map(type => ["control", type.id]),
  ...probeTypesEn.map(type => ["probes", "selection", type.id]),
];

function getProductRoutesForLocale(locale: LocaleCode | string) {
  return migrateDiaphragmPumpRouteSegments([
    ...allEnglishProductDetailRoutes,
    // Include current pipetting models even before the next exported-route snapshot.
    ...pipettingModelSlugs.filter(model => !allEnglishProductDetailRoutes.some(segments =>
      segments[0] === "pumps" && segments[1] === "pipetting-pumps" && segments.at(-1) === model
    )).map(model => ["pumps", "pipetting-pumps", model]),
    ...syringeSeriesSlugs.map(slug => ["pumps", "syringe-pumps", slug]),
    ...valvelessPumpSeries.map(({ slug }) => ["pumps", VALVELESS_PUMP_CATEGORY_SLUG_INTL, slug]),
    ...(locale === "en" ? englishProbeControlSelectionRoutes : []),
  ])
    .map(segments => segments[0] === "pumps" && segments[1] === VALVELESS_PUMP_LEGACY_CATEGORY_SLUG
      ? ["pumps", VALVELESS_PUMP_CATEGORY_SLUG_INTL, ...segments.slice(2)] : segments)
    .map(segments => { const r = segments.length === 3 && segments[0] === "pumps" && segments[1] === "syringe-pumps" ? syringeModelRoutes.find(r => r.legacy === segments[2]) : undefined; return r ? ["pumps", "syringe-pumps", r.series, r.model] : segments; })
    .map(migrateControlModuleSegments)
    .map(migratePipettingSegments)
    .filter(segments => !getPistonPumpRedirect(`/products/${segments.join("/")}/`));
}

const hindiValveSelectionSegments = [["valves"], ["valves", "rotary-valves"], ["valves", "solenoid-valves"], ["valves", "high-pressure-valves"]];
const isHindiValveSelection = (segments: string[]) =>
  hindiValveSelectionSegments.some(candidate => candidate.join("/") === segments.join("/"));

function isHindiPistonDetail(segments: string[]) {
  return segments.length === 3 && segments[0] === "pumps" && segments[1] === "piston-pump" && !resolveSeriesRoute(segments[0], segments[1], segments[2]);
}

const hindiDiaphragmDetailSlugs: readonly string[] = [...DIAPHRAGM_PUMP_SERIES_SLUGS, ...DIAPHRAGM_PUMP_REFERENCE_SLUGS];

function isHindiDiaphragmDetail(segments: string[]) {
  return isDiaphragmPumpFinalSegments(segments) && hindiDiaphragmDetailSlugs.includes(segments[2]);
}

const hindiPumpSelectionSegments = [
  ["pumps", "syringe-pumps"],
  ...syringeSeriesSlugs.map(slug => ["pumps", "syringe-pumps", slug]),
  ["pumps", "pipetting-pumps"],
  ...["smtp2", "smtp4"].map(key => ["pumps", "pipetting-pumps", getPipettingSeriesSlug(key as "smtp2" | "smtp4")]),
  ["pumps"],
  ["pumps", "piston-pump"],
  ["pumps", "piston-pump", "standard-piston-pump"],
  ["pumps", "piston-pump", "miniature-piston-pump"],
  ["pumps", "piston-pump", "ultra-compact-piston-pump"],
  ["pumps", "miniature-diaphragm-pumps"],
  ["pumps", "miniature-diaphragm-pumps", "liquid-diaphragm-pumps"],
  ["pumps", "miniature-diaphragm-pumps", "gas-liquid-diaphragm-pumps"],
];

const isHindiPumpSelection = (segments: string[]) =>
  hindiPumpSelectionSegments.some(candidate => candidate.join("/") === segments.join("/"));

const hindiFittingSelectionSegments = [["fittings"], ["fittings", "hard-tube-fittings"], ["fittings", "barbed-fittings"], ["fittings", "thread-to-barbed-fittings"], ["fittings", "bulkhead-barbed-fittings"], ["fittings", "filters"], ["fittings", "female-thread-adapters"], ["fittings", "quick-connect-fittings"], ["fittings", "luer-fittings"]];
const isHindiFittingSelection = (segments: string[]) =>
  hindiFittingSelectionSegments.some(candidate => candidate.join("/") === segments.join("/"));

const italianControlDetailSegments = [
  ["control", "air-bubble-detectors", "abd"],
  ["control", "pdm5-pressure-sensor"],
];

function getDraftControlDetail(slug: string | undefined, locale: "hi" | "it"): GermanProductDetailContent | undefined {
  const copy = slug === "abd-air-bubble-detector" ? getAbdLocaleCopy(locale)
    : slug === "pdm5-pressure-sensor" ? getPdm5LocaleCopy(locale) : undefined;
  if (!copy) return undefined;
  const title = slug === "abd-air-bubble-detector" && locale === "it" ? "Rilevatore di bolle d’aria ABD per tubi trasparenti" : copy.name;
  return { title, description: copy.description, faqs: copy.faqs, imageAlt: title };
}

const italianValvelessSelectionSegments = [
  ["pumps", VALVELESS_PUMP_CATEGORY_SLUG_INTL],
  ...valvelessPumpSeries.map(({ slug }) => ["pumps", VALVELESS_PUMP_CATEGORY_SLUG_INTL, slug]),
];

const tubingSelectionSegments = [["tubing"], ...tubingMaterials.map(material => ["tubing", material])];

function isTubingSelectionRoute(segments: string[]) {
  return segments[0] === "tubing" && (segments.length === 1 || (segments.length === 2 && isTubingMaterial(segments[1])));
}

export function generateStaticParams() {
  return [
    ...[...italianValvelessSelectionSegments, ...VALVELESS_PUMP_MODEL_SLUGS.map(slug => ["pumps", VALVELESS_PUMP_CATEGORY_SLUG_INTL, slug])]
      .filter(segments => isLocalizedHindiDraftPath("/hi/products/" + segments.join("/") + "/"))
      .map(segments => ({ locale: "hi", segments })),
    ...pipettingModelSlugs.map(slug => migratePipettingSegments(["pumps", "pipetting-pumps", slug]))
      .filter(segments => isLocalizedHindiDraftPath("/hi/products/" + segments.join("/") + "/"))
      .map(segments => ({ locale: "hi", segments })),
    ...syringeModelRoutes.map(({ series, model }) => ["pumps", "syringe-pumps", series, model])
      .filter(segments => isLocalizedHindiDraftPath("/hi/products/" + segments.join("/") + "/"))
      .map(segments => ({ locale: "hi", segments })),
    ...(isLocalizedHindiDraftPath("/hi/products/valves/high-pressure-valves/hp/") ? [{locale: "hi", segments: ["valves", "high-pressure-valves", "hp"]}] : []),
    ...[...hindiProbeSelectionSegments, ...hindiProbeDetailSlugs.map(slug => ["probes", slug])].filter(segments => isLocalizedHindiDraftPath("/hi/products/" + segments.join("/") + "/"))
      .map(segments => ({ locale: "hi", segments })),
    ...[...italianProbeControlSelectionSegments.filter(segments => segments[0] === "control"), ...italianControlDetailSegments]
      .filter(segments => isLocalizedHindiDraftPath("/hi/products/" + segments.join("/") + "/"))
      .map(segments => ({ locale: "hi", segments })),
    ...hindiValveSelectionSegments.filter(segments => isLocalizedHindiDraftPath("/hi/products/" + segments.join("/") + "/"))
      .map(segments => ({ locale: "hi", segments })),
    ...getProductRoutesForLocale("en").map(segments => [...segments])
      .filter(segments => isHindiPistonDetail(segments) && isLocalizedHindiDraftPath("/hi/products/" + segments.join("/") + "/"))
      .map(segments => ({ locale: "hi", segments })),
    ...hindiDiaphragmDetailSlugs.map(slug => ["pumps", "miniature-diaphragm-pumps", slug])
      .filter(segments => isLocalizedHindiDraftPath("/hi/products/" + segments.join("/") + "/"))
      .map(segments => ({ locale: "hi", segments })),
    ...hindiPumpSelectionSegments.filter(segments => isLocalizedHindiDraftPath("/hi/products/" + segments.join("/") + "/"))
      .map(segments => ({ locale: "hi", segments })),
    ...hindiLuerFittingSlugs.map(slug => ({ locale: "hi", segments: ["fittings", "luer-fittings", slug] }))
      .filter(({ segments }) => isLocalizedHindiDraftPath("/hi/products/" + segments.join("/") + "/")),
    ...hindiQuickConnectFittingSlugs.map(slug => ({ locale: "hi", segments: ["fittings", "quick-connect-fittings", slug] }))
      .filter(({ segments }) => isLocalizedHindiDraftPath("/hi/products/" + segments.join("/") + "/")),
    ...hindiFemaleAdapterSlugs.map(slug => ({ locale: "hi", segments: ["fittings", "female-thread-adapters", slug] }))
      .filter(({ segments }) => isLocalizedHindiDraftPath("/hi/products/" + segments.join("/") + "/")),
    ...Object.entries(hindiCompactFittingSlugs).flatMap(([type, models]) => models.map(slug => ({
      locale: "hi", segments: ["fittings", type, slug],
    }))).filter(({ segments }) => isLocalizedHindiDraftPath("/hi/products/" + segments.join("/") + "/")),
    ...hindiThreadToBarbedFittingSlugs.map(slug => ({ locale: "hi", segments: ["fittings", "thread-to-barbed-fittings", slug] }))
      .filter(({ segments }) => isLocalizedHindiDraftPath("/hi/products/" + segments.join("/") + "/")),
    ...hindiBarbedFittingSlugs.map(slug => ({ locale: "hi", segments: ["fittings", "barbed-fittings", slug] }))
      .filter(({ segments }) => isLocalizedHindiDraftPath("/hi/products/" + segments.join("/") + "/")),
    ...tubingSelectionSegments.filter(segments => isLocalizedHindiDraftPath("/hi/products/" + segments.join("/") + "/"))
      .map(segments => ({ locale: "hi", segments })),
    ...hindiFittingSelectionSegments.filter(segments => isLocalizedHindiDraftPath("/hi/products/" + segments.join("/") + "/"))
      .map(segments => ({ locale: "hi", segments })),
    ...[...italianProbeControlSelectionSegments, ...italianControlDetailSegments, ...italianProbeDetailSlugs.map(slug => ["probes", slug])].filter(segments => isLocalizedItalianDraftPath("/it/products/" + segments.join("/") + "/"))
      .map(segments => ({ locale: "it", segments })),
    ...[["valves"], ["valves", "rotary-valves"], ["valves", "solenoid-valves"], ["valves", "high-pressure-valves"], ["valves", "high-pressure-valves", "hp"]]
      .filter(segments => isLocalizedItalianDraftPath("/it/products/" + segments.join("/") + "/"))
      .map(segments => ({ locale: "it", segments })),
    ...[...italianValvelessSelectionSegments, ...VALVELESS_PUMP_MODEL_SLUGS.map(slug => ["pumps", VALVELESS_PUMP_CATEGORY_SLUG_INTL, slug])].filter(segments => isLocalizedItalianDraftPath("/it/products/" + segments.join("/") + "/"))
      .map(segments => ({ locale: "it", segments })),
    ...tubingSelectionSegments.filter(segments => isLocalizedItalianDraftPath("/it/products/" + segments.join("/") + "/"))
      .map(segments => ({ locale: "it", segments })),
    ...italianDiaphragmDetailSlugs.map(slug => ["pumps", "miniature-diaphragm-pumps", slug])
      .filter(segments => isLocalizedItalianDraftPath("/it/products/" + segments.join("/") + "/"))
      .map(segments => ({ locale: "it", segments })),
    ...pipettingModelSlugs.map(slug => migratePipettingSegments(["pumps", "pipetting-pumps", slug]))
      .filter(segments => isLocalizedItalianDraftPath("/it/products/" + segments.join("/") + "/"))
      .map(segments => ({ locale: "it", segments })),
    ...syringeModelRoutes.map(({ series, model }) => ({ locale: "it", segments: ["pumps", "syringe-pumps", series, model] }))
      .filter(({ segments }) => isLocalizedItalianDraftPath("/it/products/" + segments.join("/") + "/")),
    ...italianPistonPumpSlugs.map(slug => ({ locale: "it", segments: ["pumps", "piston-pump", slug] }))
      .filter(({ segments }) => isLocalizedItalianDraftPath("/it/products/" + segments.join("/") + "/")),
    ...INTERNATIONAL_PRODUCT_LOCALES.flatMap((locale) =>
      getProductRoutesForLocale(locale).map((segments) => ({ locale, segments: [...segments] })),
    ),
    ...Object.entries({
      "barbed-fittings": italianBarbedFittingSlugs,
      "thread-to-barbed-fittings": italianThreadToBarbedFittingSlugs,
      "luer-fittings": italianLuerFittingSlugs,
      ...italianCompactFittingSlugs,
      "quick-connect-fittings": italianQuickConnectFittingSlugs,
      "female-thread-adapters": italianFemaleAdapterSlugs,
    }).flatMap(([type, models]) => models.map(slug => ({
      locale: "it", segments: ["fittings", type, slug],
    }))).filter(({ segments }) => isLocalizedItalianDraftPath("/it/products/" + segments.join("/") + "/")),
    ...[...italianPumpSelectionSegments, ["fittings"], ["fittings", "hard-tube-fittings"], ["fittings", "barbed-fittings"], ["fittings", "thread-to-barbed-fittings"], ["fittings", "luer-fittings"], ["fittings", "bulkhead-barbed-fittings"], ["fittings", "filters"], ["fittings", "female-thread-adapters"], ["fittings", "quick-connect-fittings"]]
      .filter(segments => isLocalizedItalianDraftPath("/it/products/" + segments.join("/") + "/"))
      .map(segments => ({ locale: "it", segments })),
    ...(languageDraftsEnabled ? [...germanLocalizedProductSelectionPaths, germanHpValveDraftPath, ...germanProbeDetailDraftPaths, ...germanControlProductDraftPaths, ...germanDiaphragmPumpDraftPaths, ...germanPistonPumpDraftPaths, ...germanValvelessPumpDraftPaths, ...germanSyringePumpDraftPaths, ...germanPipettingPumpDraftPaths].map((path) => ({
      locale: "de",
      segments: path.slice("/products/".length, -1).split("/"),
    })) : []),
    ...(languageDraftsEnabled ? germanFittingDraftFamilies
      .filter(({ family }) => family !== "hard-tube-fittings")
      .flatMap(({ family, modelSlugs }) => modelSlugs.map(slug => ({
        locale: "de",
        segments: ["fittings", family, slug],
      }))) : []),
  ];
}

function getGermanControlDetail(slug?: string): GermanProductDetailContent | undefined {
  const copy = slug === "abd-air-bubble-detector" ? getAbdLocaleCopy("de")
    : slug === "pdm5-pressure-sensor" ? getPdm5LocaleCopy("de")
    : undefined;
  if (!copy) return undefined;

  const title = slug === "abd-air-bubble-detector" ? "ABD-Luftblasendetektor für transparente Schläuche" : copy.name;
  return { title, description: copy.description, faqs: copy.faqs, imageAlt: title };
}

function getGermanProductSelectionContent(path: string, segments: string[]) {
  if (!languageDraftsEnabled || !germanLocalizedProductSelectionPaths.includes(path)) return;

  const [category, slug, probeTypeId] = segments;
  if (category === "pumps" && slug === "piston-pump") {
    const series = resolveSeriesRoute(category, slug, probeTypeId);
    return getGermanProductCategoryContent(category, "plunger-pump", series?.filterValue);
  }
  if (category === "pumps" && slug === "miniature-diaphragm-pumps") {
    const series = resolveSeriesRoute(category, slug, probeTypeId);
    return getGermanProductCategoryContent(category, "diaphragm-pump", series?.filterValue);
  }
  if (category === "pumps" && slug === VALVELESS_PUMP_CATEGORY_SLUG_INTL) {
    const series = probeTypeId ? getValvelessPumpSeries(probeTypeId) : undefined;
    return getGermanProductCategoryContent(category, "valveless-pump", series?.filterValue);
  }
  if (category === "pumps" && slug === "syringe-pumps") {
    const series = resolveSeriesRoute(category, slug, probeTypeId);
    return getGermanProductCategoryContent(category, "syringe-pump", series?.filterValue);
  }
  if (category === "pumps" && slug === "pipetting-pumps") {
    const series = resolveSeriesRoute(category, slug, probeTypeId);
    return getGermanProductCategoryContent(category, "pipette-pump", series?.filterValue);
  }
  return getGermanProductCategoryContent(category === "probes" ? "needles" : category, category === "probes" ? probeTypeId : slug);
}

function getEnglishProbeControlSelection(segments: string[]) {
  const [category, type, probeType] = segments;
  if (category === "control") {
    if (segments.length === 1) {
      return {
        categoryId: "control",
        productTypeId: undefined,
        title: controlOverviewHeadingEn,
        paragraphs: controlOverviewParagraphsEn,
        canonicalPath: getControlSelectionPathEn(),
      };
    }
    if (segments.length === 2 && controlTypesEn.some(item => item.id === type)) {
      const intro = controlIntrosEn[type];
      return {
        categoryId: "control",
        productTypeId: type,
        title: intro.title,
        paragraphs: intro.paragraphs,
        canonicalPath: getControlSelectionPathEn(type),
      };
    }
  }
  if (category === "probes") {
    if (segments.length === 1) {
      return {
        categoryId: "needles",
        productTypeId: undefined,
        title: probeOverviewHeadingEn,
        paragraphs: probeOverviewParagraphsEn,
        canonicalPath: getProbeSelectionPathEn(),
      };
    }
    if (segments.length === 3 && type === "selection" && probeTypesEn.some(item => item.id === probeType)) {
      const intro = probeIntrosEn[probeType];
      return {
        categoryId: "needles",
        productTypeId: probeType,
        title: intro.title,
        paragraphs: intro.paragraphs,
        canonicalPath: getProbeSelectionPathEn(probeType),
      };
    }
  }
  return undefined;
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
  germanDraft,
  contentLocale,
  categoryId,
  productTypeId,
  initialFilters,
}: {
  locale: string;
  germanDraft?: boolean;
  contentLocale?: "it" | "hi";
  categoryId: string;
  productTypeId?: string;
  initialFilters?: ProductRouteInitialFilters;
}) {
  return (
    <Suspense fallback={<ProductPageSkeleton variant="selection" />}>
      <ProductSelectionClient
        locale={locale as "en" | "es" | "fr" | "ko" | "ru"}
        germanFittingPathPattern={germanDraft ? germanFittingDraftPathPattern : undefined}
        contentLocale={contentLocale}
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
  germanDraft = false,
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
  const german = germanDraft
    ? getGermanDiaphragmPumpSelectionCopy(resolveSeriesRoute(segments[0], segments[1], childSlug)?.filterValue)
    : undefined;
  const heading = german?.title ?? (childSlug === "liquid-diaphragm-pumps"
    ? copy.liquid
    : childSlug === "gas-liquid-diaphragm-pumps"
      ? copy.gasLiquid
      : copy.parent);
  const isLiquidCategory = childSlug === "liquid-diaphragm-pumps";
  const isGasLiquidCategory = childSlug === "gas-liquid-diaphragm-pumps";
  const title = german?.metaTitle ?? (isLiquidCategory
    ? copy.liquidSeoTitle
    : isGasLiquidCategory
      ? copy.gasLiquidSeoTitle
      : copy.seoTitle);
  const description = german?.metaDescription ?? (isLiquidCategory
    ? copy.liquidSeoDescription || copy.seoDescription
    : isGasLiquidCategory
      ? copy.gasLiquidSeoDescription || copy.seoDescription
      : copy.seoDescription);
  const canonicalPath = german
    ? getCanonicalUrl("/de" + getDiaphragmPumpPath("zh", childSlug || undefined))
    : getDiaphragmPumpPath(normalizedLocale, childSlug || undefined);

  return {
    title: german ? { absolute: title } : title,
    description,
    keywords: [heading, "Foreach Technology", german ? "Miniatur-Membranpumpen" : "miniature diaphragm pump"],
    alternates: {
      canonical: canonicalPath,
      ...(german ? {} : { languages: getDiaphragmPumpLanguageAlternates(childSlug || undefined) }),
    },
    robots: { index: !german, follow: true },
    openGraph: {
      type: "website",
      locale: german ? "de_DE" : normalizedLocale,
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

const italianPumpSelectionSegments = [
  ["pumps"],
  ["pumps", "piston-pump"],
  ...italianValvelessSelectionSegments,
  ["pumps", "syringe-pumps"],
  ["pumps", "miniature-diaphragm-pumps"],
  ["pumps", "miniature-diaphragm-pumps", "liquid-diaphragm-pumps"],
  ["pumps", "miniature-diaphragm-pumps", "gas-liquid-diaphragm-pumps"],
  ["pumps", "pipetting-pumps"],
  ...pipettingSeriesSlugs.map(key => ["pumps", "pipetting-pumps", getPipettingSeriesSlug(key)]),
  ...syringeSeriesSlugs.map(slug => ["pumps", "syringe-pumps", slug]),
  ["pumps", "piston-pump", "standard-piston-pump"],
  ["pumps", "piston-pump", "miniature-piston-pump"],
  ["pumps", "piston-pump", "ultra-compact-piston-pump"],
];

function getItalianProductSelectionIntro(segments: string[]) {
  const key = segments.at(-1);
  if (!key) return;
  const selection = getEnglishProbeControlSelection(segments);
  if (selection) return selection.productTypeId
    ? getItalianProbeControlTypeIntro(selection.productTypeId)
    : selection.categoryId === "needles" ? italianProbeControlOverview.needles : italianProbeControlOverview.control;
  if (segments[0] === "pumps") {
    if (!italianPumpSelectionSegments.some(item => item.join("/") === segments.join("/"))) return;
    if (segments[1] === VALVELESS_PUMP_CATEGORY_SLUG_INTL) {
      const copy = getValvelessLocaleCopy("it");
      const series = getValvelessPumpSeries(key);
      return series ? copy[series.copyKey] : copy.category;
    }
    if (segments[1] === "miniature-diaphragm-pumps") return getItalianDiaphragmSelectionCopy(key);
    if (segments[1] === "pipetting-pumps") return getItalianPipettingSelectionCopy(getPipettingSeriesKey(key) ?? "category");
    return segments[1] === "syringe-pumps" ? italianSyringeSelectionCopy[key] : italianProductSelectionIntros[key === "piston-pump" ? "plunger-pump" : key];
  }
  return segments.length <= 2 ? italianProductSelectionIntros[key] : undefined;
}

function getHindiFittingDetail(segments: string[]) {
  const [category, type, model] = segments;
  if (category !== "fittings" || segments.length !== 3) return;
  if (type === "barbed-fittings") return getHindiBarbedFittingContent(model);
  if (type === "thread-to-barbed-fittings") return getHindiThreadToBarbedFittingContent(model);
  if (type === "female-thread-adapters") return getHindiFemaleAdapterContent(model);
  if (type === "quick-connect-fittings") return getHindiQuickConnectFittingContent(model);
  if (type === "luer-fittings") return getHindiLuerFittingContent(model);
  return getHindiCompactFittingContent(type, model);
}

function getItalianFittingDetail(segments: string[]) {
  const [category, type, model] = segments;
  if (category !== "fittings" || segments.length !== 3) return;
  switch (type) {
    case "barbed-fittings": return getItalianBarbedFittingContent(model);
    case "thread-to-barbed-fittings": return getItalianThreadToBarbedFittingContent(model);
    case "luer-fittings": return getItalianLuerFittingContent(model);
    case "female-thread-adapters": return getItalianFemaleAdapterContent(model);
    case "quick-connect-fittings": return getItalianQuickConnectFittingContent(model);
    default: return getItalianCompactFittingContent(type, model);
  }
}

async function getPageMetadata({
  params,
}: ProductLocaleRoutePageProps): Promise<Metadata> {
  const { locale, segments } = await params;
  if (locale === "hi" && segments.join("/") === "valves/high-pressure-valves/hp") {
    return isLocalizedHindiDraftPath("/hi/products/valves/high-pressure-valves/hp/") ? getHpValveMetadata("hi") : {};
  }
  if (locale === "hi" && segments[0] === "probes") {
    const path = "/hi/products/" + segments.join("/") + "/";
    if (!isLocalizedHindiDraftPath(path)) return {};
    if (segments.length === 2) return getProbeControlDetailMetadata("hi", segments) ?? {};
    const selection = getEnglishProbeControlSelection(segments);
    const copy = selection?.productTypeId ? getHindiProbeTypeIntro(selection.productTypeId) : selection ? hindiProbeOverview : undefined;
    if (!copy) return {};
    const title = copy.title + " | FOREACH";
    const description = copy.paragraphs[0];
    const url = getCanonicalUrl(path);
    return { title: { absolute: title }, description, alternates: { canonical: url }, robots: { index: false, follow: true },
      openGraph: { title, description, url, locale: "hi_IN" } };
  }
  if (locale === "hi" && segments[0] === "control") {
    const path = "/hi/products/" + segments.join("/") + "/";
    if (!isLocalizedHindiDraftPath(path)) return {};
    const selection = getEnglishProbeControlSelection(segments);
    const copy = selection ? hindiProductSelectionIntros[selection.productTypeId ?? "control"] : undefined;
    const slug = getControlModuleDetailSlugFromSegments(segments);
    const detailCopy = getDraftControlDetail(slug, "hi");
    const title = (detailCopy?.title ?? copy?.title ?? "द्रव पथ के लिए सेंसर") + " | FOREACH";
    const description = detailCopy?.description ?? copy?.paragraphs[0] ?? "";
    const url = getCanonicalUrl(path);
    const source = detailCopy && slug ? getControlModuleDetailBySlug(slug) : undefined;
    const social = source ? buildProductSocialMetadata({ data: { ...getControlModuleProductDetailData(source), imageAlt: detailCopy?.imageAlt },
      title, description, canonicalUrl: url }) : undefined;
    return { ...social, title: { absolute: title }, description, alternates: { canonical: url }, robots: { index: false, follow: true },
      openGraph: { ...social?.openGraph, title, description, url, locale: "hi_IN" } };
  }
  if (locale === "hi" && isHindiValveSelection(segments)) {
    const path = "/hi/products/" + segments.join("/") + "/";
    if (!isLocalizedHindiDraftPath(path)) return {};
    if (segments[1]) return getValveSelectionMetadata(segments[1], "hi");
    const copy = hindiProductSelectionIntros.valves;
    const title = copy.title + " | FOREACH";
    const description = copy.paragraphs[0];
    const url = getCanonicalUrl(path);
    return { title: { absolute: title }, description, alternates: { canonical: url }, robots: { index: false, follow: true },
      openGraph: { title, description, url, type: "website", locale: "hi_IN" } };
  }
  if (locale === "hi" && isHindiPistonDetail(segments) && isLocalizedHindiDraftPath("/hi/products/" + segments.join("/") + "/")) {
    return getHindiPistonPumpMetadata(segments[2]) ?? {};
  }
  if (locale === "hi" && isHindiDiaphragmDetail(segments) && isLocalizedHindiDraftPath("/hi/products/" + segments.join("/") + "/")) {
    return getDiaphragmPumpMetadata({ params: Promise.resolve({ slug: segments[2] }), locale: "en", hindiDraft: true });
  }
  if (locale === "hi" && segments[0] === "pumps" && segments[1] === VALVELESS_PUMP_CATEGORY_SLUG_INTL) {
    const path = "/hi/products/" + segments.join("/") + "/";
    if (!isLocalizedHindiDraftPath(path)) return {};
    const series = segments[2] ? getValvelessPumpSeriesMetadata("hi", segments[2]) : undefined;
    if (series) return series;
    const detail = segments[2] ? getValvelessForeignContent(segments[2], "hi") : undefined;
    const category = getValvelessLocaleCopy("hi").category;
    const title = (detail?.title ?? category.title) + " | FOREACH";
    const description = detail?.metaDescription ?? category.metaDescription;
    const url = getCanonicalUrl(path);
    const images = detail ? [{ url: getCanonicalUrl(detail.source.mainImage), alt: detail.imageAlt }] : undefined;
    return { title: { absolute: title }, description, alternates: { canonical: url }, robots: { index: false, follow: true },
      openGraph: { title, description, url, type: "website", locale: "hi_IN", ...(images ? { images } : {}) } };
  }
  if (locale === "hi" && segments[0] === "pumps" && segments.length === 4) {
    const path = "/hi/products/" + segments.join("/") + "/";
    if (!isLocalizedHindiDraftPath(path)) return {};
    if (isPipettingModelRoute(segments)) return getPipettingModelMetadata("hi", segments[3]);
    const syringe = segments[1] === "syringe-pumps" && syringeModelRoutes.find(route => route.series === segments[2] && route.model === segments[3]);
    if (syringe) return getHindiSyringeModelMetadata(syringe.legacy, syringe.model);
  }
  if (locale === "hi" && isHindiPumpSelection(segments)) {
    const path = "/hi/products/" + segments.join("/") + "/";
    if (!isLocalizedHindiDraftPath(path)) return {};
    const diaphragm = segments[1] === "miniature-diaphragm-pumps" ? getHindiDiaphragmSelectionCopy(segments[2]) : undefined;
    const key = segments[2] ?? (segments[1] === "piston-pump" ? "plunger-pump" : "pumps");
    const pipetting = segments[1] === "pipetting-pumps" ? getHindiPipettingSelectionCopy(getPipettingSeriesKey(segments[2] ?? "") ?? "category") : undefined;
    const syringe = segments[1] === "syringe-pumps" ? hindiSyringeSelectionCopy[key as keyof typeof hindiSyringeSelectionCopy] : undefined;
    const copy = diaphragm ?? pipetting ?? syringe ?? hindiProductSelectionIntros[key];
    const title = pipetting?.seoTitle ?? copy.title + " | FOREACH";
    const description = diaphragm?.metaDescription ?? pipetting?.description ?? (segments[1] === "syringe-pumps" && !segments[2] ? hindiSyringeCategoryDescription : copy.paragraphs[0]);
    const url = getCanonicalUrl(path);
    return { title: { absolute: title }, description, alternates: { canonical: url }, robots: { index: false, follow: true },
      openGraph: { title, description, url, type: "website", locale: "hi_IN" } };
  }
  if (locale === "hi" && segments[0] === "fittings" && segments.length === 3) {
    const path = "/hi/products/" + segments.join("/") + "/";
    if (!isLocalizedHindiDraftPath(path)) return {};
    const copy = getHindiFittingDetail(segments);
    if (!copy) return {};
    const title = segments[2].toUpperCase() + " – " + copy.title + " | FOREACH";
    const description = copy.description;
    const url = getCanonicalUrl(path);
    return { title: { absolute: title }, description, alternates: { canonical: url }, robots: { index: false, follow: true }, openGraph: { title, description, url, type: "website", locale: "hi_IN" } };
  }
  if (locale === "hi" && isTubingSelectionRoute(segments)) {
    const path = "/hi/products/" + segments.join("/") + "/";
    if (!isLocalizedHindiDraftPath(path)) return {};
    const copy = segments[1] ? getTubingMaterialCopy(segments[1], "hi") : getTubingSeriesCopy("hi");
    if (!copy) return {};
    const url = getCanonicalUrl(path);
    const title = copy.seoTitle;
    const description = copy.seoDescription;
    return { title: { absolute: title }, description, alternates: { canonical: url }, robots: { index: false, follow: true }, openGraph: { title, description, url, type: "website", locale: "hi_IN" } };
  }
  if (locale === "hi" && isHindiFittingSelection(segments)) {
    const path = "/hi/products/" + segments.join("/") + "/";
    if (!isLocalizedHindiDraftPath(path)) return {};
    const copy = hindiProductSelectionIntros[segments.at(-1)!];
    if (!copy) return {};
    const title = copy.title + " | FOREACH";
    const description = copy.paragraphs[0].replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");
    const url = getCanonicalUrl(path);
    return { title: { absolute: title }, description, alternates: { canonical: url }, robots: { index: false, follow: true }, openGraph: { title, description, url, type: "website", locale: "hi_IN" } };
  }
  if (locale === "it") {
    const path = "/products/" + segments.join("/") + "/";
    if (!isLocalizedItalianDraftPath("/it" + path)) return {};
    if (segments[0] === "probes" && segments.length === 2) return getProbeControlDetailMetadata("it", segments) ?? {};
    const controlSlug = getControlModuleDetailSlugFromSegments(segments);
    const control = getDraftControlDetail(controlSlug, "it");
    if (control && controlSlug) {
      const source = getControlModuleDetailBySlug(controlSlug);
      if (!source) return {};
      const title = control.title + " | FOREACH";
      const url = getCanonicalUrl("/it" + path);
      const social = buildProductSocialMetadata({ data: { ...getControlModuleProductDetailData(source), imageAlt: control.imageAlt },
        title, description: control.description, canonicalUrl: url });
      return { ...social, title: { absolute: title }, description: control.description, alternates: { canonical: url },
        robots: { index: false, follow: true }, openGraph: { ...social.openGraph, locale: "it_IT" } };
    }
    if (path === "/products/valves/high-pressure-valves/hp/") return getHpValveMetadata("it");
    if (segments[0] === "valves" && segments.length === 2 && getValveSeriesRoute(segments[1])) {
      return getValveSelectionMetadata(segments[1], "it");
    }
    if (isTubingSelectionRoute(segments)) {
      const copy = segments[1] ? getTubingMaterialCopy(segments[1], "it") : getTubingSeriesCopy("it");
      if (!copy) return {};
      const { seoTitle: title, seoDescription: description } = copy;
      const url = getCanonicalUrl("/it" + path);
      return { title: { absolute: title }, description, alternates: { canonical: url }, robots: { index: false, follow: true },
        openGraph: { title, description, url, type: "website", locale: "it_IT" } };
    }
    if (segments[0] === "pumps" && segments[1] === VALVELESS_PUMP_CATEGORY_SLUG_INTL) {
      const series = segments.length === 3 ? getValvelessPumpSeriesMetadata("it", segments[2]) : undefined;
      if (series) return series;
      const detail = segments.length === 3 ? getValvelessForeignContent(segments[2], "it") : undefined;
      const modelTitle = detail && getValvelessPumpSeoTitle(segments[2], "it");
      if (detail && modelTitle) {
        const url = getCanonicalUrl("/it" + path);
        const description = detail.metaDescription;
        const image = getCanonicalUrl(detail.source.mainImage);
        return { title: { absolute: modelTitle }, description, alternates: { canonical: url },
          robots: { index: false, follow: true },
          openGraph: { title: modelTitle, description, url, type: "website", locale: "it_IT", images: [{ url: image, alt: detail.imageAlt }] },
          twitter: { title: modelTitle, description, card: "summary_large_image", images: [image] } };
      }
      if (segments.length === 2) {
        const copy = getValvelessLocaleCopy("it").category;
        const title = `${copy.title} | FOREACH`;
        const description = copy.metaDescription;
        const url = getCanonicalUrl("/it" + path);
        return { title: { absolute: title }, description, alternates: { canonical: url }, robots: { index: false, follow: true },
          openGraph: { title, description, url, type: "website", locale: "it_IT" } };
      }
    }
    if (segments[0] === "pumps" && segments[1] === "piston-pump" && segments.length === 3) {
      const metadata = getItalianPistonPumpMetadata(segments[2]);
      if (metadata) return metadata;
    }
    const syringe = segments.length === 4 && segments[0] === "pumps" && segments[1] === "syringe-pumps"
      ? syringeModelRoutes.find(route => route.series === segments[2] && route.model === segments[3]) : undefined;
    if (syringe) return getItalianSyringeModelMetadata(syringe.legacy, syringe.model);
    if (isPipettingModelRoute(segments)) return getPipettingModelMetadata("it", segments[3]);
    if (isDiaphragmPumpFinalSegments(segments) && italianDiaphragmDetailSlugs.includes(segments[2])) {
      return getDiaphragmPumpMetadata({ params: Promise.resolve({ slug: segments[2] }), locale: "en", italianDraft: true });
    }
    if (isDiaphragmPumpFinalSegments(segments) && (segments.length === 2 || ["liquid-diaphragm-pumps", "gas-liquid-diaphragm-pumps"].includes(segments[2]))) {
      const copy = getItalianDiaphragmSelectionCopy(segments[2]);
      const url = getCanonicalUrl("/it" + path);
      return {
        title: { absolute: copy.metaTitle }, description: copy.metaDescription, alternates: { canonical: url },
        robots: { index: false, follow: true },
        openGraph: { title: copy.metaTitle, description: copy.metaDescription, url, type: "website", locale: "it_IT" },
      };
    }
    if (segments[0] === "pumps" && segments[1] === "pipetting-pumps" && segments.length <= 3) {
      const copy = getItalianPipettingSelectionCopy(getPipettingSeriesKey(segments[2]) ?? "category");
      const url = getCanonicalUrl("/it" + path);
      return { title: { absolute: copy.seoTitle }, description: copy.description, alternates: { canonical: url },
        robots: { index: false, follow: true },
        openGraph: { title: copy.seoTitle, description: copy.description, url, type: "website", locale: "it_IT" } };
    }
    const model = getItalianFittingDetail(segments);
    const overview = getItalianProductSelectionIntro(segments);
    if (!model && !overview) return {};
    const title = (model ? segments[2].toUpperCase() + " – " + model.title : overview!.title) + " | FOREACH";
    const description = segments.length === 2 && segments[1] === "syringe-pumps" ? italianSyringeCategoryDescription
      : model?.description ?? overview!.paragraphs[0].replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");
    const url = getCanonicalUrl("/it" + path);
    return { title: { absolute: title }, description, alternates: { canonical: url }, robots: { index: false, follow: true }, openGraph: { title, description, url, type: "website", locale: "it_IT" } };
  }
  if (locale === "de") {
    const path = `/products/${segments.join("/")}/`;
    if (languageDraftsEnabled && path === germanHpValveDraftPath) return getHpValveMetadata("de");
    if (germanProbeDetailDraftPaths.some(href => href === path)) {
      const probeMetadata = getProbeControlDetailMetadata("de", segments);
      if (probeMetadata) return probeMetadata;
    }
    if (languageDraftsEnabled && germanDiaphragmPumpDraftPaths.includes(path)) {
      return getDiaphragmPumpMetadata({ params: Promise.resolve({ slug: segments[2] }), locale: "en", germanDraft: true });
    }
    if (languageDraftsEnabled && germanPipettingPumpDraftPaths.includes(path)) return getPipettingModelMetadata("de", segments[3]);
    if (languageDraftsEnabled && germanSyringePumpDraftPaths.includes(path)) {
      const model = syringeModelRoutes.find(item => item.series === segments[2] && item.model === segments[3]);
      const description = model && getGermanSyringeModelHeading(model.legacy);
      if (!model || !description) return {};
      const title = model.model.toUpperCase() + " | " + description + " | FOREACH";
      const url = getCanonicalUrl("/de" + path);
      return {
        title: { absolute: title }, description, alternates: { canonical: url }, robots: { index: false, follow: true },
        openGraph: { type: "website", title, description, url, locale: "de_DE" },
        twitter: { card: "summary", title, description },
      };
    }
    if (languageDraftsEnabled && germanValvelessPumpDraftPaths.includes(path)) {
      const copy = getValvelessForeignContent(segments[2], "de");
      const title = getValvelessPumpSeoTitle(segments[2], "de");
      if (!copy || !title) return {};
      const url = getCanonicalUrl("/de" + path);
      const description = copy.metaDescription;
      const social = buildProductSocialMetadata({ data: { ...copy.source, imageAlt: copy.imageAlt }, title, description, canonicalUrl: url });
      return { ...social, title: { absolute: title }, description, alternates: { canonical: url }, robots: { index: false, follow: true }, openGraph: { ...social.openGraph, locale: "de_DE" } };
    }
    if (languageDraftsEnabled && germanPistonPumpDraftPaths.includes(path)) return getGermanPistonPumpMetadata(segments[2]) ?? {};
    if (languageDraftsEnabled && segments[0] === "fittings" && segments.length === 3) {
      const metadata = getGermanProductDetailMetadata(path, segments[2].toUpperCase());
      if (metadata) return metadata;
    }
    const control = languageDraftsEnabled ? getGermanControlDetail(getControlModuleDetailSlugFromSegments(segments)) : undefined;
    if (control) {
      const title = control.title + " | FOREACH";
      const url = getCanonicalUrl("/de" + path);
      return {
        title: { absolute: title },
        description: control.description,
        alternates: { canonical: url },
        robots: { index: false, follow: true },
        openGraph: { title, description: control.description, url, type: "website", locale: "de_DE" },
      };
    }
    if (languageDraftsEnabled && segments[0] === "valves" && segments.length === 2 && getValveSeriesRoute(segments[1])) {
      return getValveSelectionMetadata(segments[1], "de");
    }
    const content = getGermanProductSelectionContent(path, segments);
    if (content && segments[0] === "pumps" && segments[1] === "pipetting-pumps") {
      return getPipettingMetadata("de", getPipettingSeriesKey(segments[2]) ?? "category");
    }
    if (content && segments[0] === "pumps" && segments[1] === "syringe-pumps") {
      const index = getSyringeSeriesIndex(segments[2]);
      const copy = getGermanSyringeSelectionCopy(index);
      const title = copy.title + " | FOREACH";
      const description = index < 0 ? germanSyringeSelection.category.metaDescription : copy.paragraphs[0];
      const url = getCanonicalUrl("/de" + path);
      return {
        title: { absolute: title }, description, alternates: { canonical: url }, robots: { index: false, follow: true },
        openGraph: { type: "website", title, description, url, locale: "de_DE" },
        twitter: { card: "summary", title, description },
      };
    }
    if (content && segments[0] === "pumps" && segments[1] === VALVELESS_PUMP_CATEGORY_SLUG_INTL) {
      if (segments[2]) return getValvelessPumpSeriesMetadata("de", segments[2]) ?? {};
      const { title: heading, metaDescription: description } = getValvelessLocaleCopy("de").category;
      const title = heading + " | FOREACH";
      const url = getCanonicalUrl("/de" + path);
      return {
        title: { absolute: title }, description, alternates: { canonical: url }, robots: { index: false, follow: true },
        openGraph: { type: "website", title, description, url, siteName: "FOREACH", locale: "de_DE" },
        twitter: { card: "summary", title, description },
      };
    }
    if (content && segments[0] === "pumps" && segments[1] === "piston-pump") {
      return getPistonPumpMetadata(segments[2], "de") ?? {};
    }
    if (content && segments[0] === "pumps" && segments[1] === "miniature-diaphragm-pumps") {
      return (await getDiaphragmPumpRouteMetadata("en", segments, true)) ?? {};
    }
    if (content) {
      const title = content.title + " | FOREACH";
      const description = content.paragraphs[0].replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");
      const url = getCanonicalUrl("/de" + path);
      return {
        title: { absolute: title },
        description,
        alternates: { canonical: url },
        robots: { index: false, follow: true },
        openGraph: { title, description, url, type: "website", locale: "de_DE" },
      };
    }
  }
  if (segments[0] === 'valves' && segments.length === 2 && getValveSeriesRoute(segments[1])) return getValveSelectionMetadata(segments[1],locale);
  if (segments.join('/') === 'valves/high-pressure-valves/hp') return getHpValveMetadata(locale);

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

  if (segments[0] === "fittings" && segments.length <= 2) {
    const metadata = getFittingSelectionMetadata(locale, segments[1]);
    if (metadata) return metadata;
  }

  if (
    segments[0] === "fittings" &&
    segments.length === 3
  ) {
    const metadata = getFittingDetailMetadata(locale, segments[1], segments[2]);
    if (metadata) return metadata;
  }

  const localizedDetailMetadata = getProbeControlDetailMetadata(locale, segments);
  if (localizedDetailMetadata) return localizedDetailMetadata;

  const probeControlSelection = locale === "en" ? getEnglishProbeControlSelection(segments) : undefined;
  if (probeControlSelection) {
    const { title, paragraphs, canonicalPath } = probeControlSelection;
    const seoTitle = title + " | FOREACH";
    const description = paragraphs[0];
    const chinesePath = canonicalPath.replace(/^\/en\//, "/");
    return {
      title: { absolute: seoTitle },
      description,
      alternates: {
        canonical: canonicalPath,
        languages: { "zh-CN": chinesePath, "en-US": canonicalPath, "x-default": chinesePath },
      },
      robots: { index: true, follow: true },
      openGraph: { type: "website", locale: "en_US", url: canonicalPath, siteName: "Foreach Technology", title: seoTitle, description },
      twitter: { card: "summary", title: seoTitle, description },
    };
  }

  if (segments[0] === "tubing" && locale === "en") {
    if (segments.length === 1) return getTubingSeriesMetadata(locale)!;
    if (segments.length === 2) return getTubingSelectionMetadata(segments[1], locale);
  }

  const tubingSeoCopy = segments[0] === "tubing" && segments.length === 2
    ? getTubingMaterialSeoCopy(segments[1], locale)
    : undefined;

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
  const valvelessSeriesMetadata = isValvelessRoute && segments.length === 3
    ? getValvelessPumpSeriesMetadata(locale, segments[2]) : undefined;
  if (valvelessSeriesMetadata) return valvelessSeriesMetadata;
  const valvelessCategory = isValvelessRoute && segments.length === 2 ? getValvelessLocaleCopy(locale) : undefined;
  const valvelessSeoTitle = valvelessContent ? getValvelessPumpSeoTitle(segments[2], locale)
    : valvelessCategory ? `${valvelessCategory.category.title} | FOREACH` : undefined;
  const controlDetailSlug = getControlModuleDetailSlugFromSegments(segments);
  const probeDetailSlug = segments.length === 2 && segments[0] === "probes" ? segments[1] : undefined;
  const pdm5Copy = controlDetailSlug === "pdm5-pressure-sensor" ? getPdm5LocaleCopy(locale) : undefined;
  const detailCopySlug = controlDetailSlug || probeDetailSlug;
  const probeControlDetailCopy = locale === "en" && detailCopySlug
    ? probeControlDetailCopyEn[detailCopySlug] : undefined;
  const title = pdm5Copy?.name || probeControlDetailCopy?.cardTitle || (compactContent ? compactContent.seoTitle.replace(/ \| Foreach(?: Technology)?$/i, "") : getRouteTitle(controlDetailSlug ? ["control", controlDetailSlug] : segments));
  const syringeModel = segments.length === 4 && segments[0] === "pumps" && segments[1] === "syringe-pumps" ? syringeModelRoutes.find(r => r.series === segments[2] && r.model === segments[3]) : undefined;
  if (syringeModel) return getSyringeModelMetadata(locale, syringeModel.legacy);
  const syringeSeriesIndex = segments.length === 3 && segments[0] === "pumps" && segments[1] === "syringe-pumps" ? getSyringeSeriesIndex(segments[2]) : -1;
  if (syringeSeriesIndex >= 0) return getSyringeSeriesMetadata(locale, syringeSeriesIndex);
  const canonicalPath = `/${locale}/products/${segments.join("/")}/`;
  const syringeLocaleCopy = segments.length === 2 && segments[0] === "pumps" && segments[1] === "syringe-pumps" ? syringePumpIntroLocales[locale] : undefined;
  const isEnglishSyringeCategory = locale === "en" && segments.length === 2 && segments[0] === "pumps" && segments[1] === "syringe-pumps";
  const syringeSeoTitle = isEnglishSyringeCategory ? "OEM Syringe Pumps for Automated Liquid Handling | FOREACH" : syringeLocaleCopy?.seoTitle;
  const isDetailRoute = segments.length >= 2;
  const description = pdm5Copy?.description || probeControlDetailCopy?.description || tubingSeoCopy?.description || syringeLocaleCopy?.description || (isEnglishSyringeCategory ? "Explore FOREACH OEM syringe pumps with solenoid or rotary valves, 30/60 mm strokes and single- or multichannel configurations for automated liquid handling." : undefined) || valvelessContent?.metaDescription || valvelessCategory?.category.metaDescription || compactContent?.metaDescription || (isDetailRoute
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
  } else if (controlDetailSlug) {
    const detail = getControlModuleDetailBySlug(controlDetailSlug);
    if (detail) productImageData = getControlModuleProductDetailData(detail);
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
    title: probeControlDetailCopy ? { absolute: probeControlDetailCopy.seoTitle } : tubingSeoCopy ? { absolute: tubingSeoCopy.title } : syringeSeoTitle ? { absolute: syringeSeoTitle } : valvelessSeoTitle ? { absolute: valvelessSeoTitle } : compactContent ? { absolute: compactContent.seoTitle } : `${title} | Foreach Technology`,
    description,
    keywords: pdm5Copy ? ["PDM5", pdm5Copy.name, "I2C", "PEEK", "FOREACH"] : isValvelessRoute ? [valvelessContent?.model || valvelessCategory?.categoryName || title, getValvelessLocaleCopy(locale)?.categoryName || title, "FOREACH"] : keywords,
    alternates: tubingSeoCopy ? getTubingAlternates(segments[1], locale) : {
      canonical: canonicalPath,
      languages: controlDetailSlug
        ? getControlModuleLanguageAlternates(controlDetailSlug)
        : isValvelessRoute ? getValvelessPumpLanguageAlternates(segments[2]) : {
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
      locale: (pdm5Copy ? { en: "en_US", es: "es_ES", fr: "fr_FR", ko: "ko_KR", ru: "ru_RU" }[locale] : undefined) || tubingSeoCopy?.openGraphLocale || (isValvelessRoute ? ({ en: "en_US", es: "es_ES", fr: "fr_FR", ko: "ko_KR", ru: "ru_RU" }[locale] || "en_US") : "en_US"),
      url: canonicalPath,
      siteName: "Foreach Technology",
      title: probeControlDetailCopy?.seoTitle || tubingSeoCopy?.title || syringeSeoTitle || valvelessSeoTitle || `${title} | Foreach Technology`,
      description,
      ...(socialImage
        ? { images: [{ url: socialImage, alt: getFittingMainImageAlt({ mainImage: socialImagePath }, locale) || tubingSeoCopy?.title || valvelessContent?.imageAlt || valvelessCategory?.category.title || title }] }
        : {}),
    },
    twitter: {
      card: "summary",
      title: probeControlDetailCopy?.seoTitle || tubingSeoCopy?.title || syringeSeoTitle || valvelessSeoTitle || `${title} | Foreach Technology`,
      description,
      ...(socialImage ? { images: [socialImage] } : {}),
    },
  };
}

export default async function ProductLocaleRoutePage({
  params,
}: ProductLocaleRoutePageProps) {
  const { locale: requestedLocale, segments } = await params;
  const path = `/products/${segments.join("/")}/`;
  const isGermanDraft = requestedLocale === "de" && languageDraftsEnabled;
  const controlDetailSlug = getControlModuleDetailSlugFromSegments(segments);
  const germanControl = isGermanDraft ? getGermanControlDetail(controlDetailSlug) : undefined;
  const germanDetail = germanControl || (isGermanDraft && segments[0] === "fittings" && segments.length === 3
    ? getGermanProductDetailContent("/en" + path) : undefined);
  const germanPiston = isGermanDraft && germanPistonPumpDraftPaths.includes(path);
  const germanDiaphragm = isGermanDraft && germanDiaphragmPumpDraftPaths.includes(path);
  const germanValveless = isGermanDraft && germanValvelessPumpDraftPaths.includes(path);
  const germanHp = isGermanDraft && path === germanHpValveDraftPath;
  const germanProbe = isGermanDraft && germanProbeDetailDraftPaths.some(href => href === path);
  const germanSyringe = isGermanDraft && germanSyringePumpDraftPaths.includes(path);
  const germanPipetting = isGermanDraft && germanPipettingPumpDraftPaths.includes(path);
  const useGermanDraft = germanPipetting || germanDetail || germanPiston || germanDiaphragm || germanValveless || germanSyringe || germanHp || germanProbe || (isGermanDraft && getGermanProductSelectionContent(path, segments));
  if (requestedLocale === "hi" && path === "/products/valves/high-pressure-valves/hp/" && isLocalizedHindiDraftPath("/hi" + path)) {
    return <HpValveDetailPage locale="hi" />;
  }
  if (requestedLocale === "hi" && segments[0] === "control" && isLocalizedHindiDraftPath("/hi" + path)) {
    const selection = getEnglishProbeControlSelection(segments);
    if (selection) return renderSelectionPage({ locale: "en", contentLocale: "hi", categoryId: "control", productTypeId: selection.productTypeId });
    const copy = getDraftControlDetail(controlDetailSlug, "hi");
    const source = controlDetailSlug ? getControlModuleDetailBySlug(controlDetailSlug) : undefined;
    if (!copy || !source || !controlDetailSlug) notFound();
    return <ProductDetailClient data={{ ...getControlModuleProductDetailData(source), __locale: "hi" }}
      localizedDetail={{ locale: "hi", copy }}
      {...getInstrumentProductSections(controlDetailSlug, "hi")}
      afterContent={<RelatedResources sourceType="product" sourceId={`control-${controlDetailSlug}`} sourceSlug={controlDetailSlug}
        relationKeys={[`series:${controlDetailSlug.split("-")[0]}`]} locale="en" uiLocale="hi" />} />;
  }
  if (requestedLocale === "hi" && segments[0] === "probes" && isLocalizedHindiDraftPath("/hi" + path)) {
    if (segments.length === 2 && hindiProbeDetailSlugs.includes(segments[1])) {
      return ProbeDetailPage({ params: Promise.resolve({ slug: segments[1] }), renderLocale: "en", hindiDraft: true });
    }
    const selection = getEnglishProbeControlSelection(segments);
    if (!selection) notFound();
    return renderSelectionPage({ locale: "en", contentLocale: "hi", categoryId: "needles", productTypeId: selection.productTypeId });
  }
  if (requestedLocale === "hi" && isTubingSelectionRoute(segments) && isLocalizedHindiDraftPath("/hi" + path)) {
    return renderSelectionPage({ locale: "en", contentLocale: "hi", categoryId: "tubing", productTypeId: segments[1] });
  }
  if (requestedLocale === "hi" && isHindiFittingSelection(segments) && isLocalizedHindiDraftPath("/hi" + path)) {
    return renderSelectionPage({ locale: "en", contentLocale: "hi", categoryId: "fittings", productTypeId: segments[1] });
  }
  if (requestedLocale === "hi" && isHindiValveSelection(segments) && isLocalizedHindiDraftPath("/hi" + path)) {
    if (segments[1]) return <ValveSelectionPage slug={segments[1]} locale="hi" />;
    return renderSelectionPage({ locale: "en", contentLocale: "hi", categoryId: "valves" });
  }
  if (requestedLocale === "hi" && isHindiPistonDetail(segments) && isLocalizedHindiDraftPath("/hi" + path)) {
    return PlungerPumpDetailPage({ params: Promise.resolve({ slug: segments[2] }), locale: "en", hindiDraft: true });
  }
  if (requestedLocale === "hi" && isHindiDiaphragmDetail(segments) && isLocalizedHindiDraftPath("/hi" + path)) {
    return DiaphragmPumpDetailPage({ params: Promise.resolve({ slug: segments[2] }), locale: "en", hindiDraft: true });
  }
  if (requestedLocale === "hi" && segments[0] === "pumps" && segments[1] === VALVELESS_PUMP_CATEGORY_SLUG_INTL && isLocalizedHindiDraftPath("/hi" + path)) {
    const series = segments[2] ? getValvelessPumpSeries(segments[2]) : undefined;
    if (segments[2] && !series) return ValvelessPumpDetailPage({ params: Promise.resolve({ slug: segments[2] }), renderLocale: "en", hindiDraft: true });
    return renderSelectionPage({ locale: "en", contentLocale: "hi", categoryId: "pumps", productTypeId: "valveless-pump",
      initialFilters: series ? { filter01: [series.filterValue] } : undefined });
  }
  if (requestedLocale === "hi" && segments[0] === "pumps" && segments.length === 4 && isLocalizedHindiDraftPath("/hi" + path)) {
    if (isPipettingModelRoute(segments)) return PipettingPumpDetailPage({ params: Promise.resolve({ slug: segments[3] }), renderLocale: "en", hindiDraft: true });
    const syringe = segments[1] === "syringe-pumps" && syringeModelRoutes.find(route => route.series === segments[2] && route.model === segments[3]);
    if (syringe) return SyringePumpDetailPage({ params: Promise.resolve({ slug: syringe.legacy }), renderLocale: "en", hindiDraft: true });
  }
  if (requestedLocale === "hi" && isHindiPumpSelection(segments) && isLocalizedHindiDraftPath("/hi" + path)) {
    const [category, slug, child] = segments;
    const type = slug ? resolveProductTypeRoute(category, slug, "en") : undefined;
    const series = child ? resolveSeriesRoute(category, slug, child) : undefined;
    return renderSelectionPage({ locale: "en", contentLocale: "hi", categoryId: "pumps",
      productTypeId: series?.productTypeId ?? type?.productTypeId, initialFilters: series?.initialFilters });
  }
  const italianApproved = requestedLocale === "it" && isLocalizedItalianDraftPath("/it" + path);
  if (italianApproved && path === "/products/valves/high-pressure-valves/hp/") return <HpValveDetailPage locale="it" />;
  if (italianApproved && segments[0] === "valves" && segments.length === 2 && getValveSeriesRoute(segments[1])) {
    return <ValveSelectionPage slug={segments[1]} locale="it" />;
  }
  if (italianApproved && isTubingSelectionRoute(segments)) {
    return renderSelectionPage({ locale: "en", contentLocale: "it", categoryId: "tubing", productTypeId: segments[1] });
  }
  const italianControl = italianApproved ? getDraftControlDetail(controlDetailSlug, "it") : undefined;
  const italianProbe = italianApproved && segments[0] === "probes" && segments.length === 2 && italianProbeDetailSlugs.includes(segments[1]);
  const italianPiston = italianApproved && segments.length === 3 && segments[0] === "pumps" && segments[1] === "piston-pump" && italianPistonPumpSlugs.includes(segments[2]);
  const italianFitting = italianApproved ? getItalianFittingDetail(segments) : undefined;
  const hindiFitting = requestedLocale === "hi" && isLocalizedHindiDraftPath("/hi" + path) ? getHindiFittingDetail(segments) : undefined;
  const italianSyringe = italianApproved && segments.length === 4 && segments[0] === "pumps" && segments[1] === "syringe-pumps"
    && syringeModelRoutes.some(route => route.series === segments[2] && route.model === segments[3]);
  const italianPipetting = italianApproved && isPipettingModelRoute(segments);
  const italianDiaphragm = italianApproved && isDiaphragmPumpFinalSegments(segments) && italianDiaphragmDetailSlugs.includes(segments[2]);
  const italianValveless = italianApproved && segments[0] === "pumps" && segments[1] === VALVELESS_PUMP_CATEGORY_SLUG_INTL
    && segments.length === 3 && VALVELESS_PUMP_MODEL_SLUGS.some(slug => slug === segments[2]);
  const useItalianDraft = italianControl || italianProbe || italianValveless || italianPiston || italianSyringe || italianPipetting || italianDiaphragm || italianFitting || (italianApproved && Boolean(getItalianProductSelectionIntro(segments)));
  const locale = useGermanDraft || useItalianDraft || hindiFitting ? "en" : requestedLocale;

  if (!isSupportedLocale(locale) || locale === "zh-CN" || !routeExists(locale, segments)) {
    notFound();
  }

  const probeControlSelection = locale === "en" ? getEnglishProbeControlSelection(segments) : undefined;
  if (probeControlSelection) {
    const selection = renderSelectionPage({
      locale,
      germanDraft: isGermanDraft,
      contentLocale: useItalianDraft ? "it" : undefined,
      categoryId: probeControlSelection.categoryId,
      productTypeId: probeControlSelection.productTypeId,
    });
    return probeControlSelection.productTypeId === "sampling-probes"
      ? <>{selection}<RelatedResources sourceType="product" sourceId="sampling-probes" relationKeys={["category:sampling-probes"]} locale="en" uiLocale={isGermanDraft ? "de" : useItalianDraft ? "it" : undefined} /></>
      : selection;
  }

  if (segments[0] === 'valves' && segments.length === 2 && getValveSeriesRoute(segments[1])) return <ValveSelectionPage slug={segments[1]} locale={locale} />;
  if (segments.join('/') === 'valves/high-pressure-valves/hp') return <HpValveDetailPage locale={germanHp ? "de" : locale} />;
  if (isPipettingModelRoute(segments)) return PipettingPumpDetailPage({params:Promise.resolve({slug:segments[3]}), renderLocale: locale, germanDraft: germanPipetting, italianDraft: italianPipetting});
  const syringeModel = segments.length === 4 && segments[0] === "pumps" && segments[1] === "syringe-pumps" ? syringeModelRoutes.find(r => r.series === segments[2] && r.model === segments[3]) : undefined;
  if (syringeModel) return SyringePumpDetailPage({ params: Promise.resolve({ slug: syringeModel.legacy }), renderLocale: locale, germanDraft: germanSyringe, italianDraft: italianSyringe });
  const [category, slug, seriesSlug] = segments;
  if (controlDetailSlug) {
      const detail = getControlModuleDetailBySlug(controlDetailSlug);
      if (!detail) notFound();
      const data = getControlModuleProductDetailData(detail);
      return <ProductDetailClient data={italianControl ? { ...data, __locale: "it" } : data} germanDetail={germanControl}
        localizedDetail={italianControl ? { locale: "it", copy: italianControl } : undefined}
        {...getInstrumentProductSections(controlDetailSlug, germanControl ? "de" : italianControl ? "it" : locale)} afterContent={
        <RelatedResources sourceType="product" sourceId={`control-${controlDetailSlug}`} sourceSlug={controlDetailSlug}
          relationKeys={[`series:${controlDetailSlug.split("-")[0]}`]} locale={locale} uiLocale={germanControl ? "de" : italianControl ? "it" : undefined} />
      } />;
  }

  if (segments.length === 1) {
    const categoryRoute = resolveCategoryRoute(category);

    if (!categoryRoute) {
      notFound();
    }

    return renderSelectionPage({
      locale,
      germanDraft: isGermanDraft,
      categoryId: categoryRoute.categoryId,
      contentLocale: useItalianDraft ? "it" : undefined,
    });
  }

  if (segments.length === 2) {
    const productTypeRoute = resolveProductTypeRoute(category, slug, locale);

    if (productTypeRoute) {
      return renderSelectionPage({
        locale,
        germanDraft: isGermanDraft,
        categoryId: productTypeRoute.categoryId,
        contentLocale: useItalianDraft ? "it" : undefined,
        productTypeId: productTypeRoute.productTypeId,
      });
    }

    if (category === "valves") {
      return <ValveSelectionPage slug={slug} locale={locale} />;
    }

    if (category === "probes") {
      return ProbeDetailPage({ params: Promise.resolve({ slug }), renderLocale: locale, germanDraft: germanProbe, italianDraft: italianProbe });
    }

    if (category === "tubing") {
      if (locale === "en") {
        return <TubingSelectionPage material={slug} locale="en" />;
      }
      return <TubingDetailStaticPage slug={slug} locale={locale}
        afterContent={<FittingRelatedResources productTypeId={slug} locale={locale} />}
      />;
    }

    return ProductDetailRoutePage({
      params: Promise.resolve({ category, slug }),
    });
  }

  if (segments.length !== 3) {
    notFound();
  }

  const seriesRoute = resolveSeriesRoute(category, slug, seriesSlug);

  if (seriesRoute) {
    return renderSelectionPage({
      locale,
      germanDraft: isGermanDraft,
      categoryId: seriesRoute.categoryId,
      productTypeId: seriesRoute.productTypeId,
      initialFilters: seriesRoute.initialFilters,
      contentLocale: useItalianDraft ? "it" : undefined,
    });
  }

  if (category === "pumps") {
    const detailParams = Promise.resolve({ slug: seriesSlug });

    if (slug === "piston-pump") {
      return PlungerPumpDetailPage({
        params: detailParams,
        locale,
        germanDraft: germanPiston,
        italianDraft: italianPiston,
      });
    }

    if (slug === "miniature-diaphragm-pumps") {
      return DiaphragmPumpDetailPage({
        params: detailParams,
        locale: locale as LocaleCode,
        germanDraft: germanDiaphragm,
        italianDraft: italianDiaphragm,
      });
    }

    if (slug === "pipetting-pumps") {
      return PipettingPumpDetailPage({ params: detailParams, renderLocale: locale });
    }

    if (slug === "syringe-pumps") {
      return SyringePumpDetailPage({ params: detailParams, renderLocale: locale });
    }

    if (slug === VALVELESS_PUMP_CATEGORY_SLUG_INTL) {
      return ValvelessPumpDetailPage({ params: detailParams, renderLocale: locale, germanDraft: germanValveless, italianDraft: italianValveless });
    }
  }

  if (category === "fittings") {
    const detailParams = Promise.resolve({ slug: seriesSlug });

    if (slug === "barbed-fittings") {
      return BarbedFittingDetailPage({ params: detailParams, renderLocale: locale, germanDetail,
        localizedDetail: hindiFitting ? { locale: "hi", copy: hindiFitting } : italianFitting ? { locale: "it", copy: italianFitting } : undefined });
    }

    if (slug === "quick-connect-fittings") {
      return QuickConnectFittingDetailPage({ params: detailParams, renderLocale: locale, germanDetail,
        localizedDetail: hindiFitting ? { locale: "hi", copy: hindiFitting } : italianFitting ? { locale: "it", copy: italianFitting } : undefined });
    }

    if (slug === "bulkhead-barbed-fittings") {
      return BulkheadBarbedFittingDetailPage({ params: detailParams, renderLocale: locale, germanDetail,
        localizedDetail: hindiFitting ? { locale: "hi", copy: hindiFitting } : italianFitting ? { locale: "it", copy: italianFitting } : undefined });
    }

    if (slug === "filters") {
      return FilterDetailPage({ params: detailParams, renderLocale: locale, germanDetail,
        localizedDetail: hindiFitting ? { locale: "hi", copy: hindiFitting } : italianFitting ? { locale: "it", copy: italianFitting } : undefined });
    }

    if (slug === "check-valves") {
      return CheckValveDetailPage({ params: detailParams, renderLocale: locale, germanDetail,
        localizedDetail: hindiFitting ? { locale: "hi", copy: hindiFitting } : italianFitting ? { locale: "it", copy: italianFitting } : undefined });
    }
  }

  return ProductsSeriesRoutePage({
    params: Promise.resolve({ category, slug, seriesSlug }),
    renderLocale: locale,
    germanDetail,
    localizedDetail: hindiFitting ? { locale: "hi", copy: hindiFitting } : italianFitting ? { locale: "it", copy: italianFitting } : undefined,
  });
}

export const generateMetadata = withPublishedTranslationMetadata("/products/[...segments]/", getPageMetadata);
