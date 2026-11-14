"use client";
import { getDrawingTypes, normalizeDrawingTypes, type CadDrawingType } from "@/data/products/detail/drawing-requirements";
import { useModelDrawingRequirements } from "@/data/products/configurator/model-drawing-requirements";
import { tubingText } from "@/data/products/tubing/detail-locales";
import { assemblyText } from "@/data/products/configurator/tubing-assembly.intl";
import { applyDiaphragmPumpGuideSpecs, getDiaphragmPumpGuideCopy } from "@/data/products/detail/diaphragm-pump-guide.intl";
import { localizedAssemblySummary } from "@/data/products/configurator/tubing-assembly-presentation";
import { fittingView } from "@/components/products/detail/fitting-view";
import { fittingText } from "@/data/products/detail/fitting-ui.intl";
import BottomCtaButton from "@/components/common/BottomCtaButton";
import QuickConnectPreviewNote from "./QuickConnectPreviewNote";
import FittingDeliveryZh from "./FittingDeliveryZh";
import { applyProbeDetailCopy, getLocalizedProbeGuide, probeText } from "@/data/products/detail/probe-guide.intl";
import MobilePdfCanvasViewer from "@/components/common/MobilePdfCanvasViewer";
import { getControlModuleDetailHeading } from "@/data/products/selection/control-module-card-copy";
import { probeControlDetailCopyEn } from "@/data/products/selection/probe-control-selection.en";
import { getProbeControlBreadcrumbsEn } from "@/lib/seo/probe-control-breadcrumbs";
import { productDetailIntrosEn } from "@/data/products/selection/product-introductions.en";
import { getSolenoidContent } from "@/data/products/detail/solenoid-content";
import { getMrv3Content } from "@/data/products/detail/mrv3-content";
import { getSyringeModelBreadcrumbs } from "@/data/products/selection/syringe-pump-routes";

import { applySyringePumpDetailCopy } from "@/data/products/detail/syringe-pump-detail-copy";
import { applyPipettingPumpIntroduction } from "@/data/products/detail/pipetting-pump-introductions.locales";
import { applyPipettingPumpFaq } from "@/data/products/detail/pipetting-pump-faq.locales";
import { getPipettingModelBreadcrumbs } from "@/data/products/selection/pipetting-pump-breadcrumbs";
import { normalizeProductBreadcrumbLabel } from "@/lib/seo/product-breadcrumb-label";
import { getChineseProductPageBreadcrumbs } from "@/lib/seo/chinese-product-breadcrumbs";
import { getFittingDetailBreadcrumbs } from "@/lib/seo/fitting-breadcrumbs";
import { getSiteIdentity, SITE_ORGANIZATION_ID, SITE_WEBSITE_ID } from "@/lib/seo/site-identity";
import { normalizeSiteHref } from "@/lib/seo/site-url";
import { buildProductSpecProperties } from "@/lib/seo/product-spec-properties";
import { getTubingMaterialHeading } from "@/data/products/tubing/headings";
import { getTubingGalleryData } from "@/data/products/tubing/gallery";
import { getTubingIntroductionCopy, getTubingMaterialCopy } from "@/data/products/tubing/content";
import { getBarbedFittingImageAlt } from "@/data/products/detail/barbed-fitting-gallery";
import { getSharedFittingPhotoAlt } from "@/data/products/detail/fitting-series-photo-copy";
import { getThreadToBarbedFittingImageAlt } from "@/data/products/detail/thread-to-barbed-fitting-gallery";
import { getFemaleThreadAdapterImageAlt } from "@/data/products/detail/female-thread-adapter-gallery";
import { getBulkheadBarbedFittingImageAlt } from "@/data/products/detail/bulkhead-barbed-fitting-gallery";
import { getFittingMainImageAlt } from "@/data/products/detail/fitting-image-description";
import {
  quickConnectSupplementaryImage,
  getQuickConnectSupplementaryImageAlt,
} from "@/data/products/detail/quick-connect-gallery";
import { getTubingDetailBreadcrumbs } from "@/data/products/selection/tubing-selection-routes";

import { syringePumpCardsLocales } from "@/data/products/selection/syringe-pump-cards.locales";
import { getValveDetailHeading } from "@/data/products/selection/valve-card-copy";
import { formatProductHeading } from "@/lib/format-product-heading";


import { getChineseProductBreadcrumbs } from "@/data/products/detail/chinese-product-breadcrumbs";
import {
  getProductDetailTitleOverride,
  type ProductDetailTitleLocale,
} from "@/data/products/detail/product-detail-title-overrides";
import {
  applyDiaphragmPumpDetailCopy,
  getDiaphragmPumpCopy,
} from "@/data/products/detail/diaphragm-pump-copy";
import {
  getDiaphragmPumpCategoryCopy,
  getDiaphragmPumpReferenceFromIdentity,
} from "@/data/products/detail/diaphragm-pump-reference-models";
import {
  getDiaphragmPumpPath,
  isDiaphragmPumpPublicPath,
} from "@/data/products/detail/diaphragm-pump-routes";
import { useSelectionCart } from "@/components/selection-cart/SelectionCartProvider";
import { findHardTubeCartBundle, getCartGroups } from "@/components/selection-cart/selection-cart-bundles";
import type { SelectionCartItemInput } from "@/components/selection-cart/selection-cart.types";
import { getEaInquiryProduct, getEaPumpInquiryTarget, getPistonInquirySeries, eaPumpInquiryCapacityLabel, eaPumpInquiryCartId, type EaPumpInquiryConfiguration } from "@/data/products/configurator/ea-pump-inquiry";
import { clearEaPumpInquiryDraft, readEaPumpInquiryDraft, saveEaPumpInquiryDraft, type EaPumpInquiryDraft } from "@/data/products/configurator/ea-pump-inquiry-draft";
import {
  emptyEaPumpConfigurations, readEaPumpConfigurations,
  removeEaPumpConfiguration, saveEaPumpConfigurations, upsertEaPumpConfiguration,
} from "@/data/products/configurator/ea-pump-inquiry-configurations";
import { pistonText } from "@/data/products/detail/piston-pump-ui.intl";
import EaPumpInquirySummary from "./EaPumpInquirySummary";
import TubingConfigurationWorkspace from "./TubingConfigurationWorkspace";
import { useTubingConfigurations } from "@/data/products/configurator/tubing-configurations";
/* =========================================================
   ProductDetailClient.tsx
   恒永达官网｜中文产品详情页

   重要说明：
   1. 页面结构严格按照用户提供的 HTML 转换。
   2. 未经要求，不调整原始布局、间距、字号与视觉。
   3. 当前明确改动仅包括：
      - 主型号 EA-100-PMMA
      - 添加规格书按钮
      - 申请3D文件按钮
      - 中文不显示保修
      - 主图悬停放大
      - 所有业务按钮只留端口
========================================================= */

import SitePageShell from "@/components/layout/SitePageShell";
import PdfDrawingPreview from "@/components/common/PdfDrawingPreview";
import CadRequestModal from "./CadRequestModal";
import PistonCadRequestModal from "./PistonCadRequestModal";
import TubingAssemblyCustomRequestModal from "@/components/products/tubing-assemblies/TubingAssemblyCustomRequestModal";
import { flangedChoiceCartId, flangedTubingSummary, type FlangedTubingChoice } from "@/data/products/configurator/flanged-tubing";
import { getAssemblyEntryPreset } from "@/data/products/configurator/tubing-assembly-entry";
import { createFlangedConfigurationCartItem, snapshotFlangedConfiguration } from "@/data/products/configurator/flanged-tubing-cart";
import type { FlangedConfiguration } from "@/data/products/configurator/flanged-tubing-configurations";
import TubingAssemblySizeTable from "@/components/products/tubing-assemblies/TubingAssemblySizeTable";
import tubingAssemblySpecStyles from "@/components/products/tubing-assemblies/tubing-assembly-specifications.module.css";
import ProductApplicationsPanel from "./ProductApplicationsPanel";
import ProductDatasheetPanel from "./ProductDatasheetPanel";
import ProductResourceDownloads from "./ProductResourceDownloads";
import { ProductDetailActions, ProductDetailActionButton } from "./ProductDetailActions";
import ProductConfigurationWorkspace from "./ProductConfigurationWorkspace";
import DetailSelectionWorkspace from "./DetailSelectionWorkspace";
import { defaultInquiryDrawingTypes, findDefaultInquiryCartItem, getDefaultInquiryCopy, isDefaultInquiryChoice, isSameInquiryDetailHref } from "@/data/products/detail/default-inquiry";
import { getCadRequestCopy, variantCadConfiguration, type CadRequestConfiguration } from "@/data/products/detail/cad-request";
import { useFittingConfigurations, saveFittingConfiguration, removeFittingConfiguration, type FittingConfigurationChoice } from "@/data/products/configurator/fitting-configurations";
import { useDetailConfigurations, saveDetailConfiguration, removeDetailConfiguration } from "@/data/products/configurator/detail-configurations";
import { getSelectionWorkspaceCopy, getSelectionWorkspacePresentation } from "@/data/products/detail/selection-workspace-copy";
import selectionWorkspaceStyles from "@/components/products/tubing-assemblies/FlangedTubingWorkspace.module.css";
import { usePathname, useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { useEffect, useMemo, useRef, useState } from "react";

import type { CSSProperties, MouseEvent, ReactNode } from "react";
import { applyPdm5LocaleCopy } from "@/data/products/detail/pdm5-locales";
import { getAbdGalleryData } from "@/data/products/detail/abd-gallery";
import { localizeProductDetailData } from "@/data/products/detail/product-detail.intl";
import { applyFittingProductCopy } from "@/data/products/detail/fitting-product-copy.intl";
import { applyAbdLocaleCopy } from "@/data/products/detail/abd-locales";
import { getHardTubeSeo } from "@/data/products/detail/hard-tube-seo";
import { applyHpValveDetailCopy } from "@/data/products/detail/hp-content";
import { applyValvelessEnglishMaterialNames } from "@/data/products/detail/valveless-pump-materials.en";
import {
  HARD_TUBE_DETAIL_COPY,
  isHardTubeTargetLocale,
} from "@/data/products/detail/hard-tube-fitting-detail.intl";
import { localizeTargetProductDetailData } from "@/data/products/detail/product-detail.target.intl";
import type {
  ProductApplicationsContent,
  ProductDetailPageData,
} from "@/data/products/detail/product-detail.types";
import {
  getDetailDatasheet,
  getProductDetailResourceCopy,
  isProductDetailResourceLocale,
} from "@/data/products/detail/product-detail-resources";
import {
  trackBeginInquiry,
  trackContactClick,
  trackProductTabSelect,
  trackProductView,
  trackResourceView,
} from "@/lib/analytics/track-event";
import ProductModelViewer from "./ProductModelViewer";
import SolenoidAssets from "./SolenoidAssets";
import ProductCadViewer from "./ProductCadViewer";
import ModelPreviewTrigger from "./ModelPreviewTrigger";
import { getValvelessPumpAssets } from "@/data/products/detail/valveless-pump-assets";
import { getDiaphragmPumpCadAssets } from "@/data/products/detail/diaphragm-pump-cad-assets";
import { getPistonPumpCadAssets } from "@/data/products/detail/piston-pump-cad-assets";
import { getHardTubeFittingCadAssets } from "@/data/products/detail/hard-tube-fitting-cad-assets";
import { isHardTubePlug, applyHardTubePlugCopy } from "@/data/products/detail/hard-tube-plugs";
import { getStandaloneFittingCadAssets } from "@/data/products/detail/standalone-fitting-cad-assets";
import { getRemainingFittingCadAssets } from "@/data/products/detail/remaining-fitting-cad-assets";
import { getQuickConnectFittingCadAssets } from "@/data/products/detail/quick-connect-fitting-cad-assets";
import { getSmtp4CadAssets } from "@/data/products/detail/smtp4-cad-assets";
import { getSmtp2CadAssets } from "@/data/products/detail/smtp2-cad-assets";
import {
  Pump2DFileCheckingDisplay,
  Pump3DFileCheckingDisplay,
  PumpUploadedFileGuard,
  ThreeDFileNotUploadedDisplay,
  TwoDFileNotUploadedDisplay,
} from "./PumpFileUploadDisplay";

/* PVC_TUBING_CONFIGURATOR_INTEGRATION_START */
import {
  ProductVariantConfigurator,
} from "@/components/products/configurator";

import type {
  ProductConfiguratorVariant,
} from "@/components/products/configurator";
import { getSolenoidConfigurator } from "@/data/products/configurator/solenoid-valves";
import { getValvelessPumpConfigurator } from "@/data/products/configurator/valveless-pumps";
import { getDiaphragmPumpConfigurator } from "@/data/products/configurator/diaphragm-pumps";
import { getSolenoidViewConfigurationText } from "@/data/products/configurator/solenoid-valves.i18n";
import HardTubeWasherConfigurator from "@/components/products/configurator/HardTubeWasherConfigurator";
import { getHardTubeAccessoryConfig, getHardTubeAccessory, describeHardTubeAccessory, hardTubeProductCodeText, type HardTubeAccessoryChoice } from "@/data/products/configurator/hard-tube-accessories";
import { getHardTubeAccessoryCopy, getHardTubeAccessoryKindLabel, getHardTubeMaterialLabel, formatHardTubeCopy } from "@/data/products/configurator/hard-tube-accessories.intl";
import QuickConnectPairSelector from "@/components/products/configurator/QuickConnectPairSelector";
import LuerPairSelector from "@/components/products/configurator/LuerPairSelector";
import { isStandaloneFittingType } from "@/data/products/configurator/standalone-fitting-selection";
import LuerAssemblyPreview from "@/components/products/configurator/LuerAssemblyPreview";
import LuerCadViewer from "./LuerCadViewer";
import FittingResourceViewer, { type FittingDrawing, type FittingModelSource } from "./FittingResourceViewer";
import { getLuerRole } from "@/data/products/configurator/luer-combination";
import { getLuerCadAssets } from "@/data/products/detail/luer-cad-assets";
import luerAssemblyStyles from "@/components/products/configurator/LuerAssemblyPreview.module.css";
import { getLuerPairConfig, resolveLuerPair, type LuerPairChoice } from "@/data/products/configurator/luer-pairing";
import { getQuickConnectPairConfig } from "@/data/products/configurator/quick-connect-pairing";
import QuickConnectModelSelector, { type QuickConnectModelRow } from "@/components/products/configurator/QuickConnectModelSelector";
import { localizeQuickConnectDetailData } from "@/data/products/detail/quick-connect-detail.intl";
import { getQuickConnectDrawingHref } from "@/data/products/detail/quick-connect-drawing-assets";
import { getFittingDrawingHref } from "@/data/products/detail/fitting-drawing-assets";

/* PVC_CONFIGURATOR_ENGLISH_START */
import {
  pvcTubingConfigurator,
  pvcTubingConfiguratorEn,
} from "@/data/products/configurator/pvc-tubing";
/* PVC_CONFIGURATOR_ENGLISH_END */
/* PVC_TUBING_CONFIGURATOR_INTEGRATION_END */

/* TPU_TUBING_CONFIGURATOR_INTEGRATION_START */
import {
  tpuTubingConfigurator,
  tpuTubingConfiguratorEn,
} from "@/data/products/configurator/tpu-tubing";
/* TPU_TUBING_CONFIGURATOR_INTEGRATION_END */

/* FEP_TUBING_CONFIGURATOR_INTEGRATION_START */
import {
  fepTubingConfigurator,
  fepTubingConfiguratorEn,
} from "@/data/products/configurator/fep-tubing";
/* FEP_TUBING_CONFIGURATOR_INTEGRATION_END */

/* PTFE_TUBING_CONFIGURATOR_INTEGRATION_START */
import {
  ptfeTubingConfigurator,
  ptfeTubingConfiguratorEn,
} from "@/data/products/configurator/ptfe-tubing";
/* PTFE_TUBING_CONFIGURATOR_INTEGRATION_END */

/* PEEK_TUBING_CONFIGURATOR_INTEGRATION_START */
import {
  peekTubingConfigurator,
  peekTubingConfiguratorEn,
} from "@/data/products/configurator/peek-tubing";
/* PEEK_TUBING_CONFIGURATOR_INTEGRATION_END */

/* PFA_TUBING_CONFIGURATOR_INTEGRATION_START */
import {
  pfaTubingConfigurator,
  pfaTubingConfiguratorEn,
} from "@/data/products/configurator/pfa-tubing";
/* PFA_TUBING_CONFIGURATOR_INTEGRATION_END */

import styles from "./product-detail.module.css";
import assemblyHeadingStyles from "@/components/products/tubing-assemblies/TubingAssemblyHeadings.module.css";

type ProductDetailTab =
  | "spec"
  | "applications"
  | "model3d"
  | "drawing"
  | "datasheet";

type ProductDetailTabLocale = "zh" | "en" | "es" | "fr" | "ko" | "ru";

const MOBILE_PRODUCT_TAB_LABELS: Record<
  ProductDetailTabLocale,
  Record<ProductDetailTab, string>
> = {
  zh: {
    spec: "规格",
    applications: "应用",
    model3d: "3D",
    drawing: "图纸",
    datasheet: "资料",
  },
  en: {
    spec: "Specs",
    applications: "Uses",
    model3d: "3D",
    drawing: "Drawing",
    datasheet: "Sheet",
  },
  es: {
    spec: "Espec.",
    applications: "Usos",
    model3d: "3D",
    drawing: "Plano",
    datasheet: "Ficha",
  },
  fr: {
    spec: "Spéc.",
    applications: "Usages",
    model3d: "3D",
    drawing: "Plan",
    datasheet: "Fiche",
  },
  ko: {
    spec: "사양",
    applications: "용도",
    model3d: "3D",
    drawing: "도면",
    datasheet: "자료",
  },
  ru: {
    spec: "Парам.",
    applications: "Примен.",
    model3d: "3D",
    drawing: "Чертёж",
    datasheet: "Описание",
  },
};

function ProductTabLabel({
  fullLabel,
  shortLabel,
}: {
  fullLabel: string;
  shortLabel: string;
}) {
  return (
    <>
      <span className={styles.tabLabelFull}>{fullLabel}</span>
      <span className={styles.tabLabelShort} aria-hidden="true">
        {shortLabel}
      </span>
    </>
  );
}

type ProductDetailClientProps = {
  data: ProductDetailPageData & Record<string, any>;
  analyticsProductId?: string;
  beforeFaqContent?: ReactNode;
  afterContent?: ReactNode;
  customerCategoryMode?: "quick-connect-zh" | "fitting-zh" | "luer-zh" | "hard-tube-zh" | "tubing-zh" | "tubing" | "tubing-assembly-zh" | "tubing-assembly" | "piston-pump-zh" | "piston-pump" | "diaphragm-pump";
  customerCategoryContent?: Partial<Record<"product" | "selection" | "delivery", ReactNode>>;
};

type CustomerCategoryKey = "product" | "selection" | "delivery";

type ZoomStyle = CSSProperties & {
  "--zoom-x"?: string;
  "--zoom-y"?: string;
};

type ProductTabNavStyle = CSSProperties & {
  "--product-detail-tab-count"?: number;
};

function getProductDrawingPreviewUrl(slug: string, configuredUrl?: string) {
  const normalizedConfiguredUrl = configuredUrl?.trim();

  if (normalizedConfiguredUrl) {
    return normalizedConfiguredUrl.includes("#")
      ? normalizedConfiguredUrl
      : normalizedConfiguredUrl + "#toolbar=0&navpanes=0&scrollbar=1";
  }

  const normalizedSlug = slug.trim().toLowerCase();

  // Q2001 has a published 2D PDF, while its source CAD in the shared
  // delivery folder is encrypted and cannot be used by the web viewer.
  if (normalizedSlug === "q2001-pmv-sacn") {
    return "/downloads/resources/selection-support/fitting-replacement/q20/drawings/Q2001-PMV-SACN.pdf#toolbar=0&navpanes=0&scrollbar=1";
  }

  const match = normalizedSlug.match(/^(ea|sm|tm)-(\d+)/);

  if (!match) {
    return "";
  }

  const seriesCode = match[1];
  const seriesUpper = seriesCode.toUpperCase();
  const capacityCode = String(Number(match[2])).padStart(4, "0") + "UL";

  return (
    "/assets/products/" +
    seriesCode +
    "/2d-drawings/" +
    seriesUpper +
    "-" +
    capacityCode +
    ".pdf#toolbar=0&navpanes=0&scrollbar=1"
  );
}

function isPlungerPumpDisplayModel(value: unknown): boolean {
  const model = String(value || "").trim();

  return /^(EA|SM|TM)-/i.test(model);
}


function isTubingDetailData(data: any): boolean {
  return (
    data?.productCategory === "tubing" ||
    data?.productType === "tubing" ||
    data?.category === "tubing" ||
    data?.detailMode === "material_selection" ||
    (typeof data?.slug === "string" && data.slug.includes("-tubing"))
  );
}

/* PVC_TUBING_DETAIL_DETECT_START */
function isPvcTubingDetailData(
  data: any
): boolean {
  const slug = String(
    data?.slug || ""
  )
    .trim()
    .toLowerCase();

  return (
    isTubingDetailData(data) &&
    slug === "pvc-tubing"
  );
}
/* PVC_TUBING_DETAIL_DETECT_END */

/* TPU_TUBING_DETAIL_DETECT_START */
function isTpuTubingDetailData(
  data: any
): boolean {
  const slug = String(
    data?.slug || ""
  )
    .trim()
    .toLowerCase();

  return (
    isTubingDetailData(data) &&
    slug === "tpu-tubing"
  );
}
/* TPU_TUBING_DETAIL_DETECT_END */

/* FEP_TUBING_DETAIL_DETECT_START */
function isFepTubingDetailData(
  data: any
): boolean {
  const slug = String(
    data?.slug || ""
  )
    .trim()
    .toLowerCase();

  return (
    isTubingDetailData(data) &&
    slug === "fep-tubing"
  );
}
/* FEP_TUBING_DETAIL_DETECT_END */

/* PTFE_TUBING_DETAIL_DETECT_START */
function isPtfeTubingDetailData(
  data: any
): boolean {
  const slug = String(
    data?.slug || ""
  )
    .trim()
    .toLowerCase();

  return (
    isTubingDetailData(data) &&
    slug === "ptfe-tubing"
  );
}
/* PTFE_TUBING_DETAIL_DETECT_END */

/* PEEK_TUBING_DETAIL_DETECT_START */
function isPeekTubingDetailData(
  data: any
): boolean {
  const slug = String(
    data?.slug || ""
  )
    .trim()
    .toLowerCase();

  return (
    isTubingDetailData(data) &&
    slug === "peek-tubing"
  );
}
/* PEEK_TUBING_DETAIL_DETECT_END */

/* PFA_TUBING_DETAIL_DETECT_START */
function isPfaTubingDetailData(
  data: any
): boolean {
  const slug = String(
    data?.slug || ""
  )
    .trim()
    .toLowerCase();

  return (
    isTubingDetailData(data) &&
    slug === "pfa-tubing"
  );
}
/* PFA_TUBING_DETAIL_DETECT_END */

function isFittingDetailData(data: any): boolean {
  const categoryText = [
    data?.sourceType,
    data?.productCategory,
    data?.productType,
    data?.productTypeId,
    data?.productTypeName,
    data?.category,
    data?.categoryId,
    data?.categoryKey,
    data?.series,
    data?.seriesName,
    data?.detailMode,
    data?.slug,
    data?.href,
    data?.detailHref,
  ]
    .map((value) =>
      String(value || "").trim().toLowerCase()
    )
    .filter(Boolean)
    .join(" ");

  const model = String(
    data?.model ||
      data?.displayModel ||
      data?.modelDisplay ||
      data?.foreachModel ||
      ""
  )
    .trim()
    .toUpperCase();

  return (
    categoryText.includes("fitting") ||
    categoryText.includes("connector") ||
    categoryText.includes("quick-connect") ||
    categoryText.includes("hard-tube") ||
    categoryText.includes("luer") ||
    categoryText.includes("barbed") ||
    categoryText.includes("thread-to-barbed") ||
    categoryText.includes("female-thread-adapter") ||
    categoryText.includes("bulkhead-barbed") ||
    categoryText.includes("check-valve") ||
    categoryText.includes("filter") ||
    /^(Q20|Q40|Q60)/.test(model)
  );
}


function getDisplayModelText(data: any): string {
  if (isTubingDetailData(data)) {
    return data?.displayModel || (data?.__locale === "en" ? "Select a Size" : "请选择尺寸");
  }

  if (isHardTubeTargetLocale(String(data?.__locale || ""))) {
    return data?.displayModel || data?.model || "";
  }

  if (isCustomInquiryMode(data)) {
    return data?.__locale === "en"
      ? "Contact us for a custom configuration"
      : "定制配置请联系我们";
  }

  return (data as any).displayModel || data.model || "";
}

function isCustomInquiryMode(data: any): boolean {

  if (
    isValvelessPumpDetailData(data) ||
    data?.isCustomOnly === true ||
    data?.showCustomInquiryCta === true
  ) {
    return true;
  }
const detailMode = String(
    data?.detailMode ||
      data?.hero?.detailMode ||
      data?.productMode ||
      data?.mode ||
      ""
  ).trim();

  if (
    detailMode === "custom_inquiry" ||
    detailMode === "custom" ||
    detailMode === "customized"
  ) {
    return true;
  }

  if (
    detailMode === "standard_model" ||
    detailMode === "standard" ||
    detailMode === "selection" ||
    detailMode === "configurable"
  ) {
    return false;
  }

  if (data?.isCustomInquiry === true) {
    return true;
  }

  if (data?.showConfigurator === true || data?.hasConfigurator === true) {
    return false;
  }

  const displayModel = data?.displayModel || data?.model || "";

  return isPlungerPumpDisplayModel(displayModel);
}

function isHardTubeFittingDetailData(data: any): boolean {
  return (
    data?.sourceType === "fitting-detail" ||
    (
      data?.categoryId === "fittings" &&
      data?.productTypeId === "hard-tube-fittings"
    )
  );
}

function getModelActionText(data: any): string {
  const targetLocale = String(data?.__locale || "");

  if (isHardTubeTargetLocale(targetLocale)) {
    return targetLocale === "es"
      ? "Seleccionar modelo"
      : targetLocale === "fr"
        ? "Sélectionner un modèle"
        : targetLocale === "ko"
          ? "모델 선택"
          : "Выбрать модель";
  }

  if (isTubingDetailData(data)) {
    return data?.__locale === "en" ? "Select a Model" : "选择型号";
  }

  if (data?.__locale === "en") {
    return isCustomInquiryMode(data) ? "Contact Us" : "Select a Model";
  }

  return isCustomInquiryMode(data) ? "联系我们" : "型号选择";
}

function getPistonPumpCategoryLabel(locale: string): string {
  const labels: Record<string, string> = {
    zh: "柱塞泵", "zh-CN": "柱塞泵", en: "Piston Pump",
    es: "Bomba de pistón", fr: "Pompe à piston", ko: "피스톤 펌프", ru: "Поршневой насос",
  };
  return labels[locale] || labels.en;
}

function isPlungerPumpDetailData(data: any): boolean {
  const text = JSON.stringify(data || {}).toLowerCase();

  return (
    text.includes("柱塞泵") ||
    text.includes("plunger pump") ||
    text.includes("plunger-pumps") ||
    text.includes("piston pump") ||
    text.includes("ea-") ||
    text.includes("eas-") ||
    text.includes("sm-") ||
    text.includes("tm-")
  );
}

function isDiaphragmPumpDetailData(data: any): boolean {
  const text = JSON.stringify(data || {}).toLowerCase();

  return (
    text.includes("隔膜泵") ||
    text.includes("diaphragm pump") ||
    text.includes("diaphragm-pump") ||
    text.includes("diaphragm-pumps") ||
    text.includes("dpl30") ||
    text.includes("dpl60") ||
    text.includes("dpl30h") ||
    text.includes("dpgl800")
  );
}


function isPipettingPumpDetailData(data: any): boolean {
  const text = JSON.stringify(data || {}).toLowerCase();

  return (
    text.includes("移液泵") ||
    text.includes("pipetting pump") ||
    text.includes("pipette pump") ||
    text.includes("pipette-pump") ||
    text.includes("pipetting-pumps") ||
    text.includes("smtp2") ||
    text.includes("smtp4")
  );
}

function isValvelessPumpDetailData(data: any): boolean {
  const text = JSON.stringify(data || {}).toLowerCase();

  return (
    text.includes("无阀泵") ||
    text.includes("valveless pump") ||
    text.includes("valveless-pump") ||
    text.includes("valveless-pumps") ||
    text.includes("rpl-p4") ||
    text.includes("rpl-p6.35") ||
    text.includes("rpl-p635") ||
    text.includes("rpl-p15") ||
    text.includes("drpl")
  );
}

function isSyringePumpDetailData(data: any): boolean {
  const text = JSON.stringify(data || {}).toLowerCase();

  return (
    text.includes("注射泵") ||
    text.includes("syringe pump") ||
    text.includes("syringe-pump") ||
    text.includes("syringe-pumps") ||
    text.includes("hmd3") ||
    text.includes("hmd6") ||
    text.includes("hld3") ||
    text.includes("hld6")
  );
}

function isPumpDetailData(data: Record<string, unknown>): boolean {
  return (
    data?.category === "pumps" ||
    data?.productCategory === "pumps"
  );
}


/*
  VALVE_DETAIL_BOTTOM_CTA_20260708

  阀系列详情页复用公共 ProductDetailClient。
  这里单独识别阀系列数据，避免底部 CTA 回退到柱塞泵，或直接不显示。
*/
function isValveDetailData(data: any): boolean {
  return (
    data?.sourceType === "valve-detail" ||
    data?.categoryId === "valves" ||
    data?.category === "valves" ||
    data?.categoryLabel === "阀系列" ||
    data?.productTypeName === "旋转阀" ||
    data?.productTypeName === "高压阀" ||
    data?.productTypeName === "电磁阀"
  );
}

function getValveDetailBottomCta(data: any) {
  if (!isValveDetailData(data)) {
    return null;
  }

  const title =
    data?.bottomCtaTitle ||
    data?.customInquiryTitle ||
    data?.bottomCta?.title ||
    data?.customInquiryCta?.title ||
    "需要确认阀系列定制配置？";

  const desc =
    data?.bottomCtaDescription ||
    data?.customInquiryDescription ||
    data?.bottomCta?.desc ||
    data?.bottomCta?.description ||
    data?.customInquiryCta?.desc ||
    data?.customInquiryCta?.description ||
    "请提供介质类型、压力范围、接口方式、通道数量、安装空间和控制方式，Foreach 可协助确认适合您设备的阀系列配置。";

  const button =
    data?.bottomCtaButtonText ||
    data?.customInquiryButtonText ||
    data?.bottomCta?.button ||
    data?.bottomCta?.buttonText ||
    data?.customInquiryCta?.button ||
    data?.customInquiryCta?.buttonText ||
    "联系工程师确认配置";

  const href =
    data?.bottomCtaHref ||
    data?.customInquiryHref ||
    data?.bottomCta?.href ||
    data?.customInquiryCta?.href ||
    "/contact";

  return {
    title,
    desc,
    description: desc,
    button,
    buttonText: button,
    href,
  };
}


/*
  PROBE_DETAIL_BOTTOM_CTA_20260708

  针系列详情页复用公共 ProductDetailClient。
  这里单独识别针系列数据，避免底部 CTA 回退到其他产品系列，或直接不显示。
*/
function isProbeDetailData(data: any): boolean {
  return (
    data?.sourceType === "probe-detail" ||
    data?.category === "probes" ||
    data?.categoryLabel === "针系列" ||
    data?.productTypeName === "采样针" ||
    data?.productTypeName === "穿刺针" ||
    data?.productTypeName === "清洗针" ||
    data?.productTypeName === "搅拌桨"
  );
}

function getProbeDetailBottomCta(data: any) {
  if (!isProbeDetailData(data)) {
    return null;
  }

  const title =
    data?.bottomCtaTitle ||
    data?.customInquiryTitle ||
    data?.bottomCta?.title ||
    data?.customInquiryCta?.title ||
    "需要确认针系列来图定制方案？";

  const desc =
    data?.bottomCtaDescription ||
    data?.customInquiryDescription ||
    data?.bottomCta?.desc ||
    data?.bottomCta?.description ||
    data?.customInquiryCta?.desc ||
    data?.customInquiryCta?.description ||
    "请提供图纸、样品、针管尺寸、针尖结构、安装空间和目标液体信息，Foreach 可协助确认针系列定制方案。";

  const button =
    data?.bottomCtaButtonText ||
    data?.customInquiryButtonText ||
    data?.bottomCta?.button ||
    data?.bottomCta?.buttonText ||
    data?.customInquiryCta?.button ||
    data?.customInquiryCta?.buttonText ||
    "联系工程师";

  const href =
    data?.bottomCtaHref ||
    data?.customInquiryHref ||
    data?.bottomCta?.href ||
    data?.customInquiryCta?.href ||
    "/contact";

  return {
    title,
    desc,
    description: desc,
    button,
    buttonText: button,
    href,
  };
}


/*
  TUBING_CTA_DATA_ONLY_20260707
  管路详情页复用现有底部 CTA 样式，只提供 CTA 数据，不新增样式。
*/
function getTubingBottomCtaData(data: any) {
  const isTubing =
    data?.productCategory === "tubing" ||
    data?.productType === "tubing" ||
    data?.category === "tubing" ||
    data?.detailMode === "material_selection" ||
    (typeof data?.slug === "string" && data.slug.includes("-tubing"));

  if (!isTubing) {
    return null;
  }

  return {
    title: data?.bottomCtaTitle || "需要评估管路流阻与泵阀匹配？",
    desc:
      data?.bottomCtaDesc ||
      "请提供液体介质、目标流量、管材、内径/外径、管路长度、接头数量、弯折情况、工作温度和压力范围。Foreach 工程师可协助估算管路压降、流体阻力和死体积，并确认管材、接头与泵阀配置是否匹配。",
    button: data?.bottomCtaButton || "联系工程师",
    href: data?.bottomCtaHref || data?.contactHref || "/contact",
  };
}

function getPlungerPumpBottomCta(data: any) {
  if (data.category === "tubing-assemblies") {
    return { title: data.bottomCtaTitle, desc: data.bottomCtaDescription, button: data.bottomCtaButtonText, href: data.bottomCtaHref };
  }
  if (data.valvelessDetailContent === true && data.valvelessPresentation?.bottomCta) {
    return data.valvelessPresentation.bottomCta;
  }
  if (isHardTubeTargetLocale(String(data?.__locale || ""))) {
    return {
      title: data.bottomCtaTitle,
      desc: data.bottomCtaDescription || data.bottomCtaDesc,
      button: data.bottomCtaButtonText || data.bottomCtaButton,
      href: data.bottomCtaHref,
    };
  }

  /* FITTING_BOTTOM_CTA_20260717 */
  if (isFittingDetailData(data)) {
    if (isHardTubeTargetLocale(String(data?.__locale || ""))) {
      return {
        title: data.bottomCtaTitle,
        desc: data.bottomCtaDescription || data.bottomCtaDesc,
        button: data.bottomCtaButtonText || data.bottomCtaButton,
        href: data.bottomCtaHref,
      };
    }

    if (data?.__locale === "en") {
      return {
        title:
          "Fittings for volume orders and custom applications",
        desc:
          "Foreach can support fitting selection, volume supply, and customization based on port type, tube size, material, sealing element, mounting structure, and application conditions.",
        button:
          "Contact Us",
        href:
          "/contact",
      };
    }

    return {
      title:
        "接头支持批量采购与定制",
      desc:
        "恒永达可根据接口形式、管径、材质、密封件、安装结构及应用工况，提供接头选型、批量供货与定制支持。",
      button:
        "联系我们",
      href:
        "/contact",
    };
  }

  const tubingCta = getTubingBottomCtaData(data);

  if (tubingCta) {
    return tubingCta;
  }

  const probeBottomCta = getProbeDetailBottomCta(data);

  if (probeBottomCta) {
    return probeBottomCta;
  }

  const valveBottomCta = getValveDetailBottomCta(data);

  if (valveBottomCta) {
    return valveBottomCta;
  }

  if (isSyringePumpDetailData(data)) {
    if (data?.__locale === "en") {
      return {
        title: "Syringe pumps configured for your fluidic system",
        desc: "Share the syringe size, stroke, channel count, valve arrangement, communication interface, installation space, and fluidic integration requirements. The Foreach engineering team can help confirm a suitable configuration.",
        button: "Submit a Custom Request",
        href: "/en/contact",
      };
    }

    return {
      title: "注射泵可根据您的液路与结构需求进行定制",
      desc: "恒永达可根据您的应用场景、注射器规格、行程平台、通道数量、阀门结构、通讯方式、安装空间和液路集成需求，协助确认适合自动化仪器集成的注射泵配置。",
      button: "提交定制需求",
      href: "/contact",
    };
  }

  if (isValvelessPumpDetailData(data)) {
    if (data.slug === "rpl-p4" && data.rplP4ChineseCopy) {
      return data.rplP4ChineseCopy.bottomCta;
    }
    if (data?.__locale === "en") {
      return {
        title: "Valveless metering pumps configured for your fluidic requirements",
        desc: "Share the target displacement, ratio requirements, fluid compatibility, port type, cleaning requirements, and installation space. The Foreach engineering team can help confirm a suitable configuration.",
        button: "Submit a Custom Request",
        href: "/en/contact",
      };
    }

    return {
      title: "无阀计量泵可根据您的液路需求进行定制",
      desc: "请提供目标加液量或流量、工作节拍、液体成分、背压、接口和安装空间；双液路配液还需提供目标体积比。FOREACH 可协助确认适合设备集成的无阀计量泵配置。",
      button: "提交定制需求",
      href: "/contact",
    };
  }
  if (isPlungerPumpDetailData(data)) {
    if (data?.__locale === "en") {
      return {
        title: "Piston Pump Configured for Your Instrument",
        desc: "Share the target volume, fluid compatibility, port type, control method, installation space, and service-life requirements. The Foreach engineering team can help confirm the pump configuration and wetted materials.",
        button: "Submit a Custom Request",
        href: "/en/contact",
      };
    }

    return {
      title: "柱塞泵可根据您的设备需求进行定制",
      desc: "恒永达可根据您的设备结构、目标容量、液体兼容性、接口方式、控制方式和使用寿命要求，协助确认柱塞泵配置、泵头材质、柱塞材质及液路集成方案，适用于 IVD 分析仪、实验室自动化设备和生命科学仪器中的精密液体处理场景。",
      button: "提交定制需求",
      href: "/contact"
    };
  }

  if (isDiaphragmPumpDetailData(data)) {
    if (data?.__locale === "en") {
      return {
        title: "Need help selecting a diaphragm pump?",
        desc: "Share the fluid, flow rate, pressure, self-priming requirements, wetted materials, port type, and installation space. The Foreach engineering team can help confirm a suitable diaphragm pump configuration.",
        button: "Contact an Engineer",
        href: "/en/contact",
      };
    }

    return {
      title: "不确定如何选择隔膜泵型号？",
      desc: "如果您不确定具体型号，可根据介质类型、流量、耐压、自吸能力、膜片材质、阀片材质、泵头材质、接口方式和安装空间等信息联系我们。恒永达可协助您确认适合自动化仪器液路的隔膜泵配置。",
      button: "联系工程师确认",
      href: "/contact"
    };
  }

  if (isPipettingPumpDetailData(data)) {
    if (data?.__locale === "en") {
      return {
        title: "Need help selecting a pipetting pump?",
        desc: "Share the volume range, tip specification, liquid-level and clog-detection requirements, communication interface, installation space, and control method. The Foreach engineering team can help confirm a suitable configuration.",
        button: "Contact an Engineer",
        href: "/en/contact",
      };
    }

    return {
      title: "不确定如何选择移液泵型号？",
      desc: "如果您不确定具体型号，可根据量程、吸头规格、液面检测方式、堵塞检测需求、通讯接口、安装空间和控制方式等信息联系我们。恒永达可协助您确认适合自动化仪器液体处理模块的移液泵配置。",
      button: "联系工程师确认",
      href: "/contact"
    };
  }
return null;
}

function getModelActionHref(data: any): string {
  if (isTubingDetailData(data)) {
    return data?.modelSelectionHref || "#model-selection";
  }

  if (isCustomInquiryMode(data) || isValvelessPumpDetailData(data)) {
    return data?.customInquiryHref || data?.contactHref || "/contact";
  }
if (isCustomInquiryMode(data)) {
    return (
      data.primaryButtonHref ||
      data.contactHref ||
      data.requestHref ||
      "/contact"
    );
  }

  return (
    data.configuratorHref ||
    data.selectionHref ||
    data.modelSelectionHref ||
    "#model-selection"
  );
}

function localizeInternalHref(value: unknown, localePrefix: string): string {
  const href = String(value || "").trim();

  if (
    !localePrefix ||
    !href.startsWith("/") ||
    href.startsWith("//") ||
    /^\/(?:_next|api|assets|documents|downloads|images|models|pdfjs|search-data|videos)(?:\/|$)/.test(href)
  ) {
    return href;
  }

  const localizedHref = /^\/(?:en|es|fr|ko|ru)(?:\/|$)/.test(href)
    ? href
    : `${localePrefix}${href}`;
  return normalizeSiteHref(localizedHref);
}

const CUSTOM_PRODUCT_CATEGORY_IDS = new Set([
  "tubing-assemblies",
  "pumps",
  "valves",
  "probes",
  "control",
]);

const CUSTOM_PRODUCT_NOTICE_COPY = {
  zh: {
    notice: "该产品为定制品",
    contact: "联系我们",
  },
  en: {
    notice: "This product is custom-made",
    contact: "Contact Us",
  },
  es: {
    notice: "Este producto se fabrica a medida",
    contact: "Contáctenos",
  },
  fr: {
    notice: "Ce produit est fabriqué sur mesure",
    contact: "Nous contacter",
  },
  ko: {
    notice: "이 제품은 맞춤 제작 제품입니다",
    contact: "문의하기",
  },
  ru: {
    notice: "Этот продукт изготавливается на заказ",
    contact: "Связаться с нами",
  },
} as const;

function isCustomProductCategory(
  pathname: string | null,
  data: {
    category?: unknown;
    categoryId?: unknown;
    productCategory?: unknown;
  } | null | undefined,
): boolean {
  const pathSegments = String(pathname || "")
    .split("/")
    .filter(Boolean);
  const productsIndex = pathSegments.indexOf("products");
  const routeCategory =
    productsIndex >= 0
      ? String(pathSegments[productsIndex + 1] || "").toLowerCase()
      : "";
  const dataCategory = String(
    data?.category ||
      data?.categoryId ||
      data?.productCategory ||
      "",
  )
    .trim()
    .toLowerCase();

  return (
    CUSTOM_PRODUCT_CATEGORY_IDS.has(routeCategory) ||
    CUSTOM_PRODUCT_CATEGORY_IDS.has(dataCategory)
  );
}

function isPublishedDiaphragmPumpDetail(
  pathname: string | null,
  data: unknown,
): boolean {
  const record =
    data && typeof data === "object"
      ? (data as Record<string, unknown>)
      : {};
  const productType = String(
    record.productTypeId || record.productType || record.productTypeSlug || "",
  )
    .trim()
    .toLowerCase();

  return (
    isDiaphragmPumpPublicPath(pathname) &&
    (productType === "diaphragm-pump" || productType === "diaphragm-pumps")
  );
}


function PlungerPumpBottomCta({
  data,
  localePrefix,
}: {
  data: any;
  localePrefix: string;
}) {
  const cta = getPlungerPumpBottomCta(data);

  if (!cta) {
    return null;
  }

  return (
    <section
      className={styles.plungerBottomCta}
      data-product-bottom-cta="true"
    >
      <div className={styles.plungerBottomCtaInner}>
        <div className={styles.plungerBottomCtaText}>
          <h2>{cta.title}</h2>
          <p>{cta.desc}</p>
        </div>
        <BottomCtaButton
          className={styles.plungerBottomCtaButton}
          href={localizeInternalHref(cta.href, localePrefix)}
        >
          {cta.button}
        </BottomCtaButton>
      </div>
    </section>
  );
}

const PRODUCT_SITE_ORIGIN = "https://www.foreachtek.com";

const PRODUCT_BREADCRUMB_COPY: Record<
  string,
  { home: string; products: string }
> = {
  "zh-CN": { home: "首页", products: "产品中心" },
  en: { home: "Home", products: "Products" },
  es: { home: "Inicio", products: "Productos" },
  fr: { home: "Accueil", products: "Produits" },
  ko: { home: "홈", products: "제품" },
  ru: { home: "Главная", products: "Продукция" },
};

function toAbsoluteProductUrl(value: unknown) {
  const text = String(value || "").trim();

  if (!text) {
    return "";
  }

  if (/^https?:\/\//i.test(text)) {
    return text;
  }

  return `${PRODUCT_SITE_ORIGIN}${text.startsWith("/") ? text : `/${text}`}`;
}

function getProductPageLocale(pathname: string) {
  const firstSegment = pathname.split("/").filter(Boolean)[0] || "";

  return ["en", "es", "fr", "ko", "ru"].includes(firstSegment)
    ? firstSegment
    : "zh-CN";
}

function getCanonicalProductPageUrl(pathname: string) {
  const absoluteUrl = toAbsoluteProductUrl(pathname || "/");

  return absoluteUrl.endsWith("/") ? absoluteUrl : `${absoluteUrl}/`;
}

function getDiaphragmPumpSchemaModel(pathname: string, fallbackModel: string) {
  const routeSlug = pathname
    .split("?")[0]
    .split("#")[0]
    .split("/")
    .filter(Boolean)
    .at(-1)
    ?.toLowerCase();
  const modelFromRoute = String(routeSlug || "")
    .replace(/-(?:gas-liquid|liquid|gas)-diaphragm-pump$/i, "")
    .toUpperCase()
    .replace(/-(EP|FF)-PS$/i, "-$1/PS")
    .trim();

  if (/^(?:DPL30H?|DPL60|DPGL800)(?:-|$)/.test(modelFromRoute)) {
    return modelFromRoute;
  }

  return fallbackModel
    .replace(/^型号\s*[:：]\s*/u, "")
    .replace(/\s*标准型号\s*$/u, "")
    .replace(/[.,;，。；]+$/u, "")
    .trim();
}

function cleanProductSchemaName(value: unknown) {
  return String(value || "")
    .replace(/\s*[|｜]\s*Foreach(?: Technology)?\s*$/i, "")
    .replace(/\s+/g, " ")
    .trim();
}

function getDiaphragmPumpSchemaName(
  data: Record<string, unknown>,
  pathname: string,
  locale: string,
  productModel: string,
) {
  const localizedTitle =
    locale === "zh-CN"
      ? ""
      : getProductDetailTitleOverride(data, locale, pathname);
  const configuredTitle =
    locale === "zh-CN"
      ? data.seoTitle || data.metaTitle || data.title || data.name || data.model
      : localizedTitle || data.title || data.name || data.model;
  const cleanTitle = cleanProductSchemaName(configuredTitle)
    .replace(/\s*｜\s*恒永达\s*$/u, "")
    .trim();

  if (!productModel || cleanTitle.toUpperCase().includes(productModel.toUpperCase())) {
    return cleanTitle;
  }

  return `${productModel} ${cleanTitle}`.trim();
}

function buildProductPageStructuredData(data: any, pathname: string) {
  const canonicalUrl = getCanonicalProductPageUrl(pathname);
  const defaultProductName = String(
    (data.tubingAuthoredContent ? data.h1Title : undefined) || data.model || data.title || data.name || ""
  ).trim();
  const probeControlCopy = getProductPageLocale(pathname) === "en" && ["probes", "control"].includes(String(data.category))
    ? probeControlDetailCopyEn[String(data.slug || "")] : undefined;
  const description = probeControlCopy?.description || String(data.description || "").trim();
  const productImages = Array.from(
    new Set(
      [
        data.mainImage,
        ...(Array.isArray(data.additionalImages) ? data.additionalImages : []),
      ]
        .map(toAbsoluteProductUrl)
        .filter(Boolean),
    ),
  );
  const rawProductModel = String(
    data.valvelessDetailContent === true ? data.productCode : data.modelDisplay || data.displayModel || data.modelCode || data.model || "",
  ).trim();
  const isDiaphragmPump =
    isDiaphragmPumpPublicPath(pathname) &&
    isDiaphragmPumpDetailData(data);
  const specProperties = (isPumpDetailData(data) || isValveDetailData(data) || data.category === "tubing") && Array.isArray(data.specs)
    ? buildProductSpecProperties(data.specs)
    : [];
  const diaphragmReference = isDiaphragmPump
    ? getDiaphragmPumpReferenceFromIdentity(data)
    : null;
  // A tubing material selector has no single model; displayModel is a UI prompt.
  const isTubingMaterialSelection = isTubingDetailData(data) && data.detailMode === "material_selection";
  const productModel = isTubingMaterialSelection
    ? ""
    : isDiaphragmPump
      ? getDiaphragmPumpSchemaModel(pathname, rawProductModel)
      : rawProductModel;
  const locale = getProductPageLocale(pathname);
  const productName = probeControlCopy?.h1 || (isDiaphragmPump
    ? getDiaphragmPumpSchemaName(data, pathname, locale, productModel)
    : defaultProductName);
  const productSku = String(
    isDiaphragmPump
      ? data.sku || data.internalSku || ""
      : data.sku || data.productCode || "",
  ).trim();
  const faqs: Array<{ question: string; answer: string }> = Array.isArray(data.faqs)
    ? data.faqs
        .map((item: any) => ({
          question: String(item?.question || "").trim(),
          answer: String(item?.answer || "").trim(),
        }))
        .filter((item: { question: string; answer: string }) =>
          item.question && item.answer
        )
    : [];
  const localePrefix = locale === "zh-CN" ? "" : `/${locale}`;
  const breadcrumbCopy =
    PRODUCT_BREADCRUMB_COPY[locale] || PRODUCT_BREADCRUMB_COPY.en;
  const diaphragmCategoryCopy = getDiaphragmPumpCategoryCopy(locale);
  const isPistonPump = pathname.includes("/products/pumps/piston-pump/");
  // Q-series routes collect selectable models.
  const isProductCollectionPage =
    /\/products\/fittings\/quick-connect-fittings\/q(?:20|40|60)\/?$/.test(pathname);
  const compactChineseBreadcrumbs = getPipettingModelBreadcrumbs(String(data.slug || ""), locale) || getSyringeModelBreadcrumbs(String(data.slug || ""), locale) || getChineseProductBreadcrumbs(data, locale);
  const legacyBreadcrumbItems = (data.mrv3AuthoredContent || data.solenoidAuthoredContent || data.hpAuthoredContent) ? [
    { name: breadcrumbCopy.home, item: toAbsoluteProductUrl(`${localePrefix}/`) },
    { name: breadcrumbCopy.products, item: toAbsoluteProductUrl(`${localePrefix}/products/`) },
    { name: data.breadcrumbCategoryLabel, item: toAbsoluteProductUrl(data.breadcrumbCategoryHref) },
    ...(!["rotary-valves", "solenoid-valves"].includes(data.slug) ? [{ name: data.breadcrumbSeriesLabel, item: toAbsoluteProductUrl(data.breadcrumbSeriesHref) }] : []),
    { name: data.breadcrumbLabel, item: canonicalUrl },
  ] : compactChineseBreadcrumbs
    ? compactChineseBreadcrumbs.map((item) => ({name:item.label,item:item.href ? toAbsoluteProductUrl(item.href) : canonicalUrl}))
    : data.valvelessDetailContent === true
    ? [
        { name: breadcrumbCopy.home, item: toAbsoluteProductUrl(`${localePrefix}/`) },
        { name: breadcrumbCopy.products, item: toAbsoluteProductUrl(`${localePrefix}/products/`) },
        ...(locale === "en" ? [{ name: "Pumps", item: toAbsoluteProductUrl("/en/products/pumps/") }] : []),
        { name: data.breadcrumbParentLabel, item: toAbsoluteProductUrl(data.breadcrumbParentHref) },
        { name: data.breadcrumbLabel, item: canonicalUrl },
      ]
    : isDiaphragmPump
    ? [
        {
          name: diaphragmCategoryCopy.home,
          item: toAbsoluteProductUrl(`${localePrefix}/`),
        },
        {
          name: diaphragmCategoryCopy.products,
          item: toAbsoluteProductUrl(`${localePrefix}/products/`),
        },
        {
          name: diaphragmCategoryCopy.parent,
          item: toAbsoluteProductUrl(
            getDiaphragmPumpPath(locale, undefined, { trailingSlash: true }),
          ),
        },
        {
          name: diaphragmReference?.model || productModel || productName,
          item: canonicalUrl,
        },
      ]
    : [
        {
          name: breadcrumbCopy.home,
          item: toAbsoluteProductUrl(`${localePrefix}/`),
        },
        {
          name: breadcrumbCopy.products,
          item: toAbsoluteProductUrl(`${localePrefix}/products/`),
        },
        ...(isPistonPump ? [{
          name: getPistonPumpCategoryLabel(locale),
          item: toAbsoluteProductUrl(`${localePrefix}/products/pumps/piston-pump/`),
        }] : []),
        {
          name: isPistonPump ? productModel : productName,
          item: canonicalUrl,
        },
      ];
  const chineseBreadcrumbItems: ProductDetailPageData["breadcrumbs"] | null = getFittingDetailBreadcrumbs(pathname, locale, String(data.model || data.foreachModel || data.slug || "")) || data.breadcrumbs || getTubingDetailBreadcrumbs(pathname, locale) || getProbeControlBreadcrumbsEn(pathname) || getChineseProductPageBreadcrumbs(pathname, locale, legacyBreadcrumbItems.at(-1)?.name);
  const breadcrumbItems = chineseBreadcrumbItems
    ? chineseBreadcrumbItems.map((item) => ({ name: item.label, item: item.href ? toAbsoluteProductUrl(item.href) : canonicalUrl }))
    : legacyBreadcrumbItems;
  if (String(data.category) === "control" && data.slug === "abd-air-bubble-detector") {
    breadcrumbItems[breadcrumbItems.length - 1] = { ...breadcrumbItems[breadcrumbItems.length - 1], name: "ABD" };
  }
  const organizationId = SITE_ORGANIZATION_ID;
  const websiteId = SITE_WEBSITE_ID;
  const webpageId = `${canonicalUrl}#webpage`;
  const breadcrumbId = `${canonicalUrl}#breadcrumb`;
  const productId = `${canonicalUrl}#product-model`;
  const webPage: Record<string, unknown> = {
    "@type": isProductCollectionPage ? "CollectionPage" : "WebPage",
    "@id": webpageId,
    url: canonicalUrl,
    name: productName,
    inLanguage: locale,
    isPartOf: {
      "@id": websiteId,
    },
    breadcrumb: {
      "@id": breadcrumbId,
    },
    publisher: {
      "@id": organizationId,
    },
    ...(!isProductCollectionPage ? {
      mainEntity: {
        "@id": productId,
      },
    } : {}),
  };

  if (description) {
    webPage.description = description;
  }

  const graph: Record<string, unknown>[] = [
    ...getSiteIdentity(locale)["@graph"],
    {
      "@type": "BreadcrumbList",
      "@id": breadcrumbId,
      itemListElement: breadcrumbItems.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: normalizeProductBreadcrumbLabel(item.name, item.item),
        item: item.item,
      })),
    },
    webPage,
    ...(isProductCollectionPage ? [] : [
      {
        "@type": "ProductModel",
        "@id": productId,
        name: productName,
        url: canonicalUrl,
        ...(description ? { description } : {}),
        ...(productImages.length > 0 ? { image: productImages } : {}),
        brand: {
          "@type": "Brand",
          name: "Foreach Technology",
        },
        manufacturer: {
          "@id": organizationId,
        },
        ...(productModel ? { model: productModel } : {}),
        ...(productSku ? { sku: productSku } : {}),
        ...(specProperties.length > 0 ? { additionalProperty: specProperties } : {}),
        mainEntityOfPage: {
          "@id": webpageId,
        },
      },
    ]),
  ];

  if (faqs.length > 0) {
    graph.push({
      "@type": "FAQPage",
      "@id": `${canonicalUrl}#faq`,
      isPartOf: {
        "@id": webpageId,
      },
      mainEntity: faqs.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    });
  }

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}

/* ===== FOREACH SCOPED PRODUCT DISPLAY TITLE START ===== */

type ProductDetailTargetLocale =
  ProductDetailTitleLocale;

function normalizeProductDisplayTitle(
  value: unknown
): string {
  return String(value || "")
    .replace(/\s+/g, " ")
    .replace(
      /\s*[|｜]\s*Foreach(?: Technology)?\s*$/i,
      ""
    )
    .trim();
}

function getScopedProductDisplayTitle(
  data: any,
  targetLocale: string | null | undefined,
  pathname: string
): string {
  const currentTitle =
    normalizeProductDisplayTitle(
      data?.model
    );

  /*
   * 英文由 data.__locale 判断；
   * 西、法、韩、俄由 targetLocale 判断；
   * 中文保持现有标题，不进入覆盖表。
   */
  const locale =
    targetLocale ||
    (
      data?.__locale === "en"
        ? "en"
        : ""
    );

  const exactTitle =
    getProductDetailTitleOverride(
      data,
      locale,
      pathname
    );

  return exactTitle || currentTitle;
}

/* ===== FOREACH SCOPED PRODUCT DISPLAY TITLE END ===== */

const StandaloneFittingSelector = dynamic(() => import("@/components/products/configurator/StandaloneFittingSelector"), {ssr: false});
const FlangedTubingWorkspace = dynamic(() => import("@/components/products/tubing-assemblies/FlangedTubingWorkspace"), {ssr: false});
const TpuTubingSelectionContent = dynamic(() => import("./TpuTubingSelectionContent"));
const ProbeProductContent = dynamic(() => import("./ProbeDetailContent").then(module => module.ProbeProductContent));
const ProbeSelectionContent = dynamic(() => import("./ProbeDetailContent").then(module => module.ProbeSelectionContent));
const ProbeDeliveryContent = dynamic(() => import("./ProbeDetailContent").then(module => module.ProbeDeliveryContent));
const ProbeCustomInquiryModal = dynamic(() => import("./ProbeCustomInquiryModal"), { ssr: false });
const EaPumpInquiryConfigurator = dynamic(() => import("@/components/products/configurator/EaPumpInquiryConfigurator"), { ssr: false });

export default function ProductDetailClient({
  data: sourceData,
  analyticsProductId: explicitAnalyticsProductId,
  beforeFaqContent,
  afterContent,
  customerCategoryMode,
  customerCategoryContent,
}: ProductDetailClientProps) {
  const pathname = usePathname();
  const router = useRouter();
  const isTubingAssembly = sourceData.category === "tubing-assemblies";
  const isAssemblyChineseReview = isTubingAssembly && sourceData.__reviewLocale === "zh";
  const isEnglishPath = pathname === "/en" || pathname.startsWith("/en/");
  const isEnglish = isEnglishPath && !isAssemblyChineseReview;
  const pathnameLocale = String(pathname || "")
    .split("/")
    .filter(Boolean)[0] || "";
  const targetLocale = isHardTubeTargetLocale(pathnameLocale)
    ? pathnameLocale
    : null;
  const isTargetLanguage = Boolean(targetLocale);
  const isLocalizedDetail = isEnglish || isTargetLanguage;
  const resourceLocale = isProductDetailResourceLocale(pathnameLocale) ? pathnameLocale : "zh";
  const resourceCopy = resourceLocale
    ? getProductDetailResourceCopy(resourceLocale)
    : null;
  const configuratorLocale =
    targetLocale || (isEnglish ? "en" : "zh");
  const mobileTabLabels =
    MOBILE_PRODUCT_TAB_LABELS[
      configuratorLocale as ProductDetailTabLocale
    ] || MOBILE_PRODUCT_TAB_LABELS.zh;
  const localePrefix = isEnglishPath
    ? "/en"
    : targetLocale
      ? `/${targetLocale}`
      : "";
  const data = useMemo(
    () => {
      if (isHardTubePlug(sourceData)) return applyHardTubePlugCopy(sourceData, configuratorLocale);
      const mrv3Copy = sourceData.category === "valves" ? (getMrv3Content(sourceData.slug, configuratorLocale) || getSolenoidContent(sourceData.slug, configuratorLocale)) : null;
      if (mrv3Copy) {
        const mrv3Data: typeof sourceData = { ...sourceData, ...mrv3Copy, category: "valves" };
        return applyDiaphragmPumpDetailCopy(mrv3Data, configuratorLocale);
      }
      const hasLocalizedPistonCopy = (sourceData.tubingAuthoredContent === true || sourceData.eaDetailContent === true || sourceData.compactDetailContent === true || sourceData.valvelessDetailContent === true) && sourceData.__locale === configuratorLocale;
      const isEnglishQuickConnect = sourceData.productTypeId === "quick-connect-fittings" && configuratorLocale === "en";
      let localizedData = hasLocalizedPistonCopy ? sourceData : isEnglishQuickConnect
        ? localizeQuickConnectDetailData(sourceData)
        : targetLocale
        ? localizeTargetProductDetailData(sourceData, targetLocale, pathname || "")
        : isEnglish
        ? sourceData.__locale === "en"
          ? sourceData
          : localizeProductDetailData(sourceData)
        : sourceData;

      localizedData = applyFittingProductCopy(sourceData, localizedData, configuratorLocale);
      localizedData = applyPdm5LocaleCopy(sourceData, localizedData, configuratorLocale);
      localizedData = applyAbdLocaleCopy(sourceData, localizedData, configuratorLocale);
      if (isProbeDetailData(sourceData)) localizedData = applyProbeDetailCopy(localizedData, configuratorLocale);
      // Fitting identities are catalog keys, never sentences to translate.
      // In particular, the generic English prose adapter may add a full stop.
      if (String(sourceData.category) === "fittings" || sourceData.categoryId === "fittings") {
        for (const key of ["slug", "model", "foreachModel", "modelDisplay", "displayModel", "productCode", "productId", "detailHref", "href"] as const) {
          if (sourceData[key] !== undefined) localizedData[key] = sourceData[key];
        }
      }
      localizedData = { ...localizedData, ...getAbdGalleryData(sourceData.slug, configuratorLocale) };

      if (String(sourceData.category) === "tubing") {
        localizedData = { ...localizedData, ...getTubingGalleryData(sourceData.slug, configuratorLocale) };
        const canonicalTubingCopy = getTubingMaterialCopy(sourceData.slug, "zh");
        if (canonicalTubingCopy && configuratorLocale !== "zh") {
          const faqs = canonicalTubingCopy.faqs.map(item => ({
            question: tubingText(item.question, configuratorLocale),
            answer: tubingText(item.answer, configuratorLocale),
          }));
          localizedData = {
            ...localizedData, faq: faqs, faqs, faqItems: faqs, detailFaqs: faqs,
            bottomCtaTitle: tubingText(canonicalTubingCopy.ctaTitle, configuratorLocale),
            bottomCtaDesc: tubingText(canonicalTubingCopy.ctaDescription, configuratorLocale),
            bottomCtaButton: tubingText("联系工程师", configuratorLocale),
          };
        }
        const tubingIntroduction = getTubingIntroductionCopy(sourceData.slug, configuratorLocale);
        if (tubingIntroduction) {
          localizedData = {
            ...localizedData,
            description: tubingIntroduction.intro.join(" "),
            shortDescription: tubingIntroduction.intro[0],
            tubingIntroductionParagraphs: tubingIntroduction.intro,
            commonApplications: tubingIntroduction.applications,
          };
        }
      }

      // HP navigation is already localized by its route; the generic English
      // adapter must not add /en to an /es, /fr, /ko or /ru breadcrumb.
      if (sourceData.hpAuthoredContent) {
        for (const key of ["breadcrumbLabel", "breadcrumbCategoryLabel", "breadcrumbCategoryHref", "breadcrumbSeriesLabel", "breadcrumbSeriesHref", "detailHref", "selectionHref"]) {
          localizedData[key] = sourceData[key];
        }
        localizedData = applyHpValveDetailCopy(localizedData, configuratorLocale);
      }

      // Diaphragm routes already supply localized breadcrumb labels and links.
      if (Array.isArray(sourceData.breadcrumbs) && getDiaphragmPumpCopy(sourceData, configuratorLocale)) {
        localizedData = { ...localizedData, breadcrumbs: sourceData.breadcrumbs };
      }

      return applyDiaphragmPumpGuideSpecs(applyDiaphragmPumpDetailCopy(
        applyPipettingPumpFaq(applyPipettingPumpIntroduction(applySyringePumpDetailCopy(applyValvelessEnglishMaterialNames(localizedData, configuratorLocale), configuratorLocale), configuratorLocale), configuratorLocale),
        configuratorLocale,
      ), configuratorLocale);
    },
    [configuratorLocale, isEnglish, pathname, sourceData, targetLocale]
  );
  const hasAuthoredPistonCopy = sourceData.eaDetailContent === true || sourceData.compactDetailContent === true;
  const useAuthoredPistonCopy = hasAuthoredPistonCopy &&
    sourceData.__locale === configuratorLocale;
  const useAuthoredValvelessCopy = sourceData.valvelessDetailContent === true && sourceData.__locale === configuratorLocale;
  const rawApplicationDetails = (hasAuthoredPistonCopy && !useAuthoredPistonCopy
    ? undefined
    : data.applicationDetails) as
    | ProductApplicationsContent
    | undefined;
  const applicationDetails =
    rawApplicationDetails?.tabLabel &&
    rawApplicationDetails.title &&
    Array.isArray(rawApplicationDetails.items) &&
    rawApplicationDetails.items.length > 0
      ? rawApplicationDetails
      : null;
  const hasApplicationDetails = applicationDetails !== null;
  // Scoped presentation copy: retain Chinese P4 guidance and localize this series only.
  const rplP4Copy = useAuthoredValvelessCopy ? data.valvelessPresentation : configuratorLocale === "zh" && data.slug === "rpl-p4"
    ? data.rplP4ChineseCopy
    : undefined;
  const isDiaphragmPage = isPublishedDiaphragmPumpDetail(pathname, data);
  const diaphragmReference = isDiaphragmPage
    ? getDiaphragmPumpReferenceFromIdentity(data)
    : null;
  const diaphragmCategoryCopy = getDiaphragmPumpCategoryCopy(configuratorLocale);
  const datasheet = getDetailDatasheet(sourceData, configuratorLocale);
  const workspaceCopy = getSelectionWorkspaceCopy(configuratorLocale);
  const isPistonPumpCustomerCategoryPage = customerCategoryMode === "piston-pump" ||
    (customerCategoryMode === "piston-pump-zh" && configuratorLocale === "zh");
  const probeGuide = useMemo(() => isProbeDetailData(sourceData)
    ? getLocalizedProbeGuide(sourceData.slug, configuratorLocale)
    : null, [sourceData, configuratorLocale]);
  const isProbeCustomerCategoryPage = Boolean(probeGuide);
  const isDiaphragmPumpCustomerCategoryPage = customerCategoryMode === "diaphragm-pump";
  const diaphragmGuideCopy = getDiaphragmPumpGuideCopy(configuratorLocale);
  const actionDatasheet = datasheet;
  const hasResourceDownloads = configuratorLocale !== "zh";
  // Piston pumps and localized fittings follow the Chinese information layout:
  // specifications and the shared 2D/3D viewer, without a separate datasheet panel.
  const hasDatasheetTab = Boolean(resourceLocale !== "zh" && !isTubingDetailData(sourceData) && !isTubingAssembly && !isPistonPumpCustomerCategoryPage && !isDiaphragmPumpCustomerCategoryPage && !isProbeCustomerCategoryPage &&
    !(isEnglish && (String(sourceData.category) === "fittings" || sourceData.categoryId === "fittings")));
  const productDetailTabCount =
    (data.productTypeId === "quick-connect-fittings" && !getQuickConnectFittingCadAssets(data.slug) ? 2 : 3) +
    (hasApplicationDetails ? 1 : 0) + (hasDatasheetTab ? 1 : 0);
  const isCadRequestAvailable = Boolean(
    resourceLocale && !isTubingDetailData(sourceData) && sourceData.cadRequestAvailable !== false,
  );
  const pumpFileDisplayLocale = isLocalizedDetail ? "en" : "zh";
  const isPumpDetail = isPumpDetailData(data);
  const rplAssets = data.productTypeId === "valveless-pump" ? getValvelessPumpAssets(data.slug) : undefined;
  const diaphragmCadAssets = isDiaphragmPage ? getDiaphragmPumpCadAssets(data.slug) : undefined;
  const pistonCadAssets = getPistonPumpCadAssets(data.slug);
  const smtp2CadAssets = getSmtp2CadAssets(data.slug);
  const smtp4CadAssets = getSmtp4CadAssets(data.slug);
  const fittingCadAssets = data.productTypeId === "hard-tube-fittings" ? getHardTubeFittingCadAssets(data.slug) : undefined;
  const luerCadAssets = data.productTypeId === "luer-fittings"
    ? getLuerCadAssets(data.slug) : undefined;
  const remainingFittingCadAssets = getRemainingFittingCadAssets(String(data.productTypeId), data.slug);
  const standaloneFittingCadAssets = remainingFittingCadAssets || (["barbed-fittings", "thread-to-barbed-fittings", "female-thread-adapters"].includes(String(data.productTypeId))
    ? getStandaloneFittingCadAssets(String(data.productTypeId), data.slug)
    : undefined);
  const quickConnectCadAssets = data.productTypeId === "quick-connect-fittings" ? getQuickConnectFittingCadAssets(data.slug) : undefined;
  const isQuickConnectFitting = data.productTypeId === "quick-connect-fittings";
  const isQuickConnectSeriesDetail = isQuickConnectFitting && Array.isArray((data as any).modelRows);
  const quickConnectSeriesRows = (isQuickConnectSeriesDetail ? (data as any).modelRows : []) as QuickConnectModelRow[];
  const cadAssets = rplAssets || diaphragmCadAssets || pistonCadAssets || smtp2CadAssets || smtp4CadAssets || fittingCadAssets || quickConnectCadAssets || standaloneFittingCadAssets;
  const model3dUrl = String(
    data.productTypeId === "valveless-pump" ? rplAssets?.model3dUrl || "" :
    luerCadAssets?.model3dUrl || cadAssets?.model3dUrl || data.model3dUrl ||
      data.resources?.model3dUrl ||
      "",
  ).trim();
  const quickConnectDrawingUrl = isQuickConnectFitting
    ? getQuickConnectDrawingHref(data.model || data.foreachModel || data.slug)
    : null;
  const standaloneFittingDrawingUrl = standaloneFittingCadAssets?.drawingPdfUrl || null;
  const drawingPreviewUrl = getProductDrawingPreviewUrl(
    data.slug,
    data.productTypeId === "valveless-pump" ? rplAssets?.drawingPdfUrl || "" :
    luerCadAssets?.drawingPdfUrl || remainingFittingCadAssets?.drawingPdfUrl ||
    getFittingDrawingHref(String(data.productTypeId), data.slug) ||
    quickConnectDrawingUrl ||
    standaloneFittingDrawingUrl ||
    data.drawing2dUrl ||
      data.drawingPdfUrl ||
      data.partDrawingUrl ||
      data.resources?.drawing2dUrl,
  );
  const drawingDocumentUrl = drawingPreviewUrl.split("#", 1)[0];
  const isCustomProduct =
    ((data.mrv3AuthoredContent || data.solenoidAuthoredContent) && isCustomInquiryMode(data)) || isDiaphragmPage || isCustomProductCategory(pathname, data);
  const customProductCopy =
    CUSTOM_PRODUCT_NOTICE_COPY[
      configuratorLocale as keyof typeof CUSTOM_PRODUCT_NOTICE_COPY
    ] || CUSTOM_PRODUCT_NOTICE_COPY.zh;
  const localizedContactHref = localizeInternalHref(
    "/contact",
    localePrefix,
  );


// ===== FOREACH TARGET PRODUCT DISPLAY TITLE START =====
  /*
   * 详情页显示标题：
   * - 中文和英文继续使用原有 data.model；
   * - es / fr / ko / ru 可使用专用完整标题；
   * - 不改变型号选择区域的数据。
   */
  const diaphragmCopy = getDiaphragmPumpCopy(data, configuratorLocale);
  const reviewedIntroductionEn = configuratorLocale === "en" &&
    ["probes", "control"].includes(String(data.category || ""))
    ? productDetailIntrosEn[String(data.slug || "")]
    : undefined;
  const probeControlDetailCopy = reviewedIntroductionEn ? probeControlDetailCopyEn[String(data.slug || "")] : undefined;
  const controlDetailH1 = String(data.category) === "control"
    ? getControlModuleDetailHeading(String(data.slug || ""), configuratorLocale)
    : undefined;
  const displayProductTitle =
    probeControlDetailCopy?.h1 || reviewedIntroductionEn?.title ||
    ((data.tubingAuthoredContent || data.mrv3AuthoredContent || data.solenoidAuthoredContent || data.smtp2Variant || data.smtp4AuthoredContent) ? data.h1Title : undefined) ||
    diaphragmCopy?.title ||
    (useAuthoredPistonCopy || useAuthoredValvelessCopy ? String(data.model || "") : getScopedProductDisplayTitle(
      data,
      targetLocale,
      String(data.model || "")
    ));
  const tubingDetailH1 = String(data.category || "") === "tubing"
    ? getTubingMaterialHeading(String(data.slug || ""), configuratorLocale)?.h1
    : undefined;
  const syringeDetailH1 = pathname?.includes("/products/pumps/syringe-pumps/")
    ? syringePumpCardsLocales[getProductPageLocale(pathname)]?.[String(data.slug || "")]?.heading
    : undefined;
  const valveDetailH1 = pathname?.includes("/products/valves/")
    ? getValveDetailHeading(String(data.slug || ""), configuratorLocale)
    : undefined;
  const inheritedDetailH1 = valveDetailH1 || syringeDetailH1;
  // ===== FOREACH TARGET PRODUCT DISPLAY TITLE END =====
  const structuredData = useMemo(
    () => buildProductPageStructuredData(data, pathname || "/"),
    [data, pathname]
  );
  const copy = targetLocale
    ? HARD_TUBE_DETAIL_COPY[targetLocale]
    : isEnglish
    ? {
        breadcrumb: "Breadcrumb navigation",
        home: "Home",
        products: "Products",
        gallery: "Product gallery",
        thumbnails: "Product thumbnails",
        previous: "Previous image",
        next: "Next image",
        frontView: "Front view",
        sideView: "Side view",
        portDetail: "Port detail",
        applications: "Typical Applications:",
        model: "Model:",
        configurator: "Configure",
        datasheet: "Add Datasheet",
        drawing: "Add Drawing",
        drawingAdded: "Drawing Added",
        request3d: "Request 3D File",
        addToList: "Add to List",
        addedToList: "Added to List",
        tabs: "Product resources",
        specifications: "Specifications",
        model3d: "3D Model",
        technicalDrawing: "Technical Drawing",
        noDrawing: "No public technical drawing is available for this product.",
        completeModels: "Complete Model Numbers",
        foreachModel: "Foreach Model",
        productCode: "Product Code",
        connection: "Tube ID or Thread",
        gender: "Gender",
        mounting: "Mounting Method",
        valved: "Valve Configuration",
        shape: "Shape",
        housingMaterial: "Housing Material",
        faq: "Frequently Asked Questions",
        selectModel: "Select a Model",
        reselect: "Reselect",
        detailSourceLabel: "Product Detail Page",
        no2d: "No 2D Drawing",
        no2dYet: "2D Drawing Not Available Yet",
        requestDrawing: 'To request a 2D drawing for this product, please click “Add Drawing” above.',
        drawingLoading: "Loading drawing...",
        drawingPreview: "Preview Drawing",
        drawingDescription: (model: string) => `View the technical drawing for ${model}.`,
      }
    : {
        breadcrumb: "面包屑导航",
        home: "首页",
        products: "产品中心",
        gallery: "产品图片区域",
        thumbnails: "缩略图区域",
        previous: "上一张",
        next: "下一张",
        frontView: "主视图",
        sideView: "侧视图",
        portDetail: "接口细节",
        applications: "常见应用：",
        model: "型号：",
        configurator: "配置选择",
        datasheet: "添加规格书",
        drawing: "添加图纸",
        drawingAdded: "已添加图纸",
        request3d: "申请3D文件",
        addToList: "加入清单",
        addedToList: "已加入清单",
        tabs: "产品资料切换",
        specifications: "规格",
        model3d: "3D模型",
        technicalDrawing: "零件图",
        noDrawing: "当前产品尚未配置公开零件图。",
        completeModels: "完整型号",
        foreachModel: "恒永达型号",
        productCode: "商品编码",
        connection: "接管内径或螺纹",
        gender: "公母端",
        mounting: "安装方式",
        valved: "阀门配置",
        shape: "形状",
        housingMaterial: "外壳材质",
        faq: "常见问题",
        selectModel: "选择型号",
        reselect: "重新选型",
        detailSourceLabel: "产品详情页",
        no2d: "无2D图纸",
        no2dYet: "2D 图纸暂未上传",
        requestDrawing: '如需该产品的 2D 图纸，请点击上方“添加图纸”按钮提交需求。',
        drawingLoading: "图纸加载中...",
        drawingPreview: "预览图纸",
        drawingDescription: (model: string) => `查看 ${model} 的技术图纸。`,
      };
  const legacyProductBreadcrumbItems = ((data.mrv3AuthoredContent || data.solenoidAuthoredContent || data.hpAuthoredContent) ? [
    { label: copy.home, href: `${localePrefix}/` },
    { label: copy.products, href: `${localePrefix}/products/` },
    { label: data.breadcrumbCategoryLabel, href: data.breadcrumbCategoryHref },
    ...(!["rotary-valves", "solenoid-valves"].includes(data.slug) ? [{ label: data.breadcrumbSeriesLabel, href: data.breadcrumbSeriesHref }] : []),
    { label: String(data.breadcrumbLabel) },
  ] : null) || getPipettingModelBreadcrumbs(String(data.slug || ""), configuratorLocale) || getSyringeModelBreadcrumbs(String(data.slug || ""), configuratorLocale) || getChineseProductBreadcrumbs(data, configuratorLocale) || (useAuthoredValvelessCopy
    ? [
        { label: copy.home, href: `${localePrefix}/` },
        { label: copy.products, href: `${localePrefix}/products/` },
        ...(configuratorLocale === "en" ? [{ label: "Pumps", href: "/en/products/pumps/" }] : []),
        { label: data.breadcrumbParentLabel, href: data.breadcrumbParentHref },
        { label: data.breadcrumbLabel },
      ]
    : isDiaphragmPage
    ? [
        {
          label: diaphragmCategoryCopy.home,
          href: localePrefix ? `${localePrefix}/` : "/",
        },
        {
          label: diaphragmCategoryCopy.products,
          href: localePrefix ? `${localePrefix}/products/` : "/products/",
        },
        {
          label: diaphragmCategoryCopy.parent,
          href: getDiaphragmPumpPath(configuratorLocale),
        },
        {
          label: diaphragmReference?.model || getDisplayModelText(data),
        },
      ]
    : [
        {
          label: copy.home,
          href: localePrefix ? `${localePrefix}/` : "/",
        },
        {
          label: copy.products,
          href: localePrefix ? `${localePrefix}/products/` : "/products/",
        },
        ...(pathname.includes("/products/pumps/piston-pump/") ? [{
          label: getPistonPumpCategoryLabel(configuratorLocale),
          href: `${localePrefix}/products/pumps/piston-pump/`,
        }] : []),
        {
          label: pathname.includes("/products/pumps/piston-pump/")
            ? String(sourceData.modelDisplay || sourceData.displayModel || sourceData.modelCode || data.slug || "").trim()
            : displayProductTitle,
        },
      ]);
  const productBreadcrumbItems = getFittingDetailBreadcrumbs(pathname, configuratorLocale, String(data.model || data.foreachModel || data.slug || "")) || (isQuickConnectFitting ? data.breadcrumbs : sourceData.breadcrumbs) || getTubingDetailBreadcrumbs(pathname || "", configuratorLocale) || getProbeControlBreadcrumbsEn(pathname) || getChineseProductPageBreadcrumbs(
    pathname, configuratorLocale, legacyProductBreadcrumbItems.at(-1)?.label,
  ) || legacyProductBreadcrumbItems;
  if (String(data.category) === "control" && data.slug === "abd-air-bubble-detector") {
    productBreadcrumbItems[productBreadcrumbItems.length - 1] = { ...productBreadcrumbItems[productBreadcrumbItems.length - 1], label: "ABD" };
  }
    const { items: cartItems, addItem, addBundle, getItem, toggleDrawingNeed, setDrawingTypes, removeItem, changeQuantity, openCart } = useSelectionCart();

  const analyticsProductId = String(
    explicitAnalyticsProductId ||
      sourceData.productId ||
      sourceData.productCode ||
      sourceData.slug ||
      sourceData.model ||
      "",
  ).trim();
  const analyticsProductCategory = String(
    sourceData.categoryId ||
      sourceData.category ||
      sourceData.categoryLabel ||
      "",
  ).trim();
  const analyticsProductSeries = String(
    sourceData.seriesId ||
      sourceData.series ||
      sourceData.seriesName ||
      sourceData.specSeriesKey ||
      "",
  ).trim();
  const analyticsLocale = configuratorLocale;
  const productViewKey = analyticsProductId
    ? `${pathname || "/"}|${analyticsProductId}`
    : "";
  const lastProductViewKeyRef = useRef<string | null>(null);

  useEffect(() => {
    if (!productViewKey) return;

    if (lastProductViewKeyRef.current === productViewKey) return;

    trackProductView({
      productId: analyticsProductId,
      productName: displayProductTitle || data.model,
      category: analyticsProductCategory,
      subcategory: data.productTypeId || data.productType,
      series: analyticsProductSeries,
      locale: analyticsLocale,
    });

    lastProductViewKeyRef.current = productViewKey;
  }, [
    analyticsLocale,
    analyticsProductCategory,
    analyticsProductId,
    analyticsProductSeries,
    data.model,
    data.productType,
    data.productTypeId,
    displayProductTitle,
    productViewKey,
  ]);

const [activeTab, setActiveTab] = useState<ProductDetailTab>("spec");
const isTubingCustomerCategoryPage = isTubingDetailData(sourceData) && (customerCategoryMode === "tubing" || (customerCategoryMode === "tubing-zh" && configuratorLocale === "zh"));
const isHardTubeCustomerCategoryPage = customerCategoryMode === "hard-tube-zh";
const isAssemblyCustomerCategoryPage = isTubingAssembly && (
  customerCategoryMode === "tubing-assembly" ||
  (customerCategoryMode === "tubing-assembly-zh" && configuratorLocale === "zh")
);
const isCustomerCategoryPage = customerCategoryMode === "quick-connect-zh" || customerCategoryMode === "fitting-zh" || customerCategoryMode === "luer-zh" || isHardTubeCustomerCategoryPage || isTubingCustomerCategoryPage || isAssemblyCustomerCategoryPage || isPistonPumpCustomerCategoryPage || isDiaphragmPumpCustomerCategoryPage || isProbeCustomerCategoryPage;
// All locales use the shared fitting delivery component; its regional copy is separate.
const showSharedFittingDelivery =
  (String(sourceData.category) === "fittings" || sourceData.categoryId === "fittings");
const hasCustomerCategoryNavigation = isCustomerCategoryPage || showSharedFittingDelivery;
const [activeCustomerCategory, setActiveCustomerCategory] =
  useState<CustomerCategoryKey>("product");
const showCustomerCategoryProductTabs =
  isCustomerCategoryPage && activeCustomerCategory === "product";
const showProductResourceTabs =
  !hasCustomerCategoryNavigation || activeCustomerCategory === "product";
// Keep the hard-tube viewer mounted while the resource panel is hidden by a category switch.
const useSharedFittingResources = !isQuickConnectSeriesDetail &&
  (String(sourceData.category) === "fittings" || sourceData.categoryId === "fittings");
const showFlatProductResources = showCustomerCategoryProductTabs || isHardTubeCustomerCategoryPage || useSharedFittingResources;
const [hasOpenedModel, setHasOpenedModel] = useState(false);
const [openedModelUrl, setOpenedModelUrl] = useState("");
const showModelPreview =
  Boolean(model3dUrl) &&
  openedModelUrl !== model3dUrl &&
  !showFlatProductResources;
const [solenoidVariant, setSolenoidVariant] = useState(0);
  const [isCadRequestOpen, setIsCadRequestOpen] = useState(false);
  const [cadConfigurationId, setCadConfigurationId] = useState<string | null>(null);
  const [cadRequestedModel, setCadRequestedModel] = useState("");
  const [isAssemblyCustomRequestOpen, setIsAssemblyCustomRequestOpen] = useState(false);
  const [isProbeCustomInquiryOpen, setIsProbeCustomInquiryOpen] = useState(false);
  // All published Chinese assembly entries share the workspace and PDF flow, with page-specific defaults.
  const isAssemblyConfigurator = isTubingAssembly && Boolean(getAssemblyEntryPreset(sourceData.slug || ""));
  const [flangedTubingChoice, setFlangedTubingChoice] = useState<FlangedTubingChoice | null>(null);
  const [isFlangedTubingOpen, setIsFlangedTubingOpen] = useState(false);
  const pistonInquiryProduct = getEaInquiryProduct(sourceData.slug);
  const isEaInquiryEnabled = Boolean(pistonInquiryProduct) && isPlungerPumpDetailData(data);
  const [eaConfigurations, setEaConfigurations] = useState(emptyEaPumpConfigurations);
  const [eaExpandedConfigurationId, setEaExpandedConfigurationId] = useState<string | null>(null);
  const [eaPreviewConfigurationId, setEaPreviewConfigurationId] = useState<string | null>(null);
  const [isNewEaConfiguration, setIsNewEaConfiguration] = useState(false);
  const [isEaInquiryOpen, setIsEaInquiryOpen] = useState(false);
  const [eaInquiryDraft, setEaInquiryDraft] = useState<(EaPumpInquiryDraft & { slug: string }) | null>(null);
  const eaPreviewConfiguration = eaConfigurations.configurations.find(item => item.id === eaPreviewConfigurationId);
  const eaInquiryConfiguration = eaPreviewConfiguration?.configuration ?? (eaInquiryDraft?.slug === sourceData.slug ? eaInquiryDraft.configuration : null);
  const eaInquiryQuantity = eaPreviewConfiguration?.quantity ?? (eaInquiryDraft?.slug === sourceData.slug ? eaInquiryDraft.quantity : 1);
  const showEaInquiryWorkspace = isEaInquiryEnabled;
  const [eaInquiryNeedsDrawing, setEaInquiryNeedsDrawing] = useState(false);
  useEffect(() => {
    let draft = isEaInquiryEnabled ? readEaPumpInquiryDraft(sourceData.slug || "") : null;
    if (isEaInquiryEnabled) {
      const collection = readEaPumpConfigurations(draft, sourceData.slug || "");
      setEaConfigurations(collection);
      draft = collection.configurations.find(item => item.id === collection.activeId) ?? null;
    }
    setEaInquiryDraft(draft ? { ...draft, slug: sourceData.slug || "" } : null);
    setEaExpandedConfigurationId(null);
    setEaPreviewConfigurationId(null);
    setIsNewEaConfiguration(false);
    setIsEaInquiryOpen(false);
    setEaInquiryNeedsDrawing(false);
  }, [sourceData.slug, isEaInquiryEnabled]);
  const [flangedNeedDrawing, setFlangedNeedDrawing] = useState(false);
  const flangedConfigurationSummary = flangedTubingChoice ? localizedAssemblySummary(flangedTubingChoice, configuratorLocale) : "";
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [activeThumb, setActiveThumb] = useState(0);
  const thumbViewportRef = useRef<HTMLDivElement | null>(null);
  const [isZooming, setIsZooming] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({
    x: 50,
    y: 50,
  });

  const [isTubingEditorOpen, setIsTubingEditorOpen] = useState(false);
  const isPvcTubingConfiguratorEnabled = isPvcTubingDetailData(data);
  const isTpuTubingConfiguratorEnabled = isTpuTubingDetailData(data);
  const isFepTubingConfiguratorEnabled = isFepTubingDetailData(data);
  const isPtfeTubingConfiguratorEnabled = isPtfeTubingDetailData(data);
  const isPeekTubingConfiguratorEnabled = isPeekTubingDetailData(data);
  const isPfaTubingConfiguratorEnabled = isPfaTubingDetailData(data);
  const isTubingConfiguratorEnabled = isPvcTubingConfiguratorEnabled || isTpuTubingConfiguratorEnabled || isFepTubingConfiguratorEnabled || isPtfeTubingConfiguratorEnabled || isPeekTubingConfiguratorEnabled || isPfaTubingConfiguratorEnabled;
  const tubingConfigurator =
    isPvcTubingConfiguratorEnabled ? (isLocalizedDetail ? pvcTubingConfiguratorEn : pvcTubingConfigurator)
     : isTpuTubingConfiguratorEnabled ? (isLocalizedDetail ? tpuTubingConfiguratorEn : tpuTubingConfigurator)
     : isFepTubingConfiguratorEnabled ? (isLocalizedDetail ? fepTubingConfiguratorEn : fepTubingConfigurator)
     : isPtfeTubingConfiguratorEnabled ? (isLocalizedDetail ? ptfeTubingConfiguratorEn : ptfeTubingConfigurator)
     : isPeekTubingConfiguratorEnabled ? (isLocalizedDetail ? peekTubingConfiguratorEn : peekTubingConfigurator)
     : isPfaTubingConfiguratorEnabled ? (isLocalizedDetail ? pfaTubingConfiguratorEn : pfaTubingConfigurator)
    : undefined;
  const [tubingConfigurations, updateTubingConfigurations] = useTubingConfigurations(
    isTubingConfiguratorEnabled ? String(sourceData.slug) : null, tubingConfigurator?.variants,
  );
  const selectedTubingConfiguration = tubingConfigurations.configurations.find(item => item.id === tubingConfigurations.activeId);
  const selectedTubingVariant = tubingConfigurator?.variants.find(variant => variant.id === selectedTubingConfiguration?.variantId) ?? null;

  const detailModelConfigurator = useMemo(
    () => data.solenoidAuthoredContent
      ? getSolenoidConfigurator(String(data.slug || ""), configuratorLocale)
      : isDiaphragmPage
        ? getDiaphragmPumpConfigurator(String(data.slug || ""), configuratorLocale)
        : isValvelessPumpDetailData(data)
          ? getValvelessPumpConfigurator(String(data.slug || ""), configuratorLocale)
          : undefined,
    [data.solenoidAuthoredContent, data.productTypeId, data.slug, configuratorLocale, isDiaphragmPage],
  );
  const [openDetailModelConfiguratorId, setOpenDetailModelConfiguratorId] = useState<string | null>(null);
  const [detailConfigurations, updateDetailConfigurations] = useDetailConfigurations(detailModelConfigurator?.id ?? null, detailModelConfigurator?.variants);
  const [editingDetailVariantId, setEditingDetailVariantId] = useState<string | null>(null);
  const [newDetailConfiguration, setNewDetailConfiguration] = useState(false);
  const [detailConfigurationRevision, setDetailConfigurationRevision] = useState(0);
  const singleDetailVariant = detailModelConfigurator?.variants.length === 1
    ? detailModelConfigurator.variants[0]
    : null;
  // Resolve against this page's catalog so navigation cannot reuse another product's selection.
  const selectedDetailVariant = singleDetailVariant ?? detailModelConfigurator?.variants.find(
    variant => variant.id === (newDetailConfiguration ? null : editingDetailVariantId ?? detailConfigurations.activeId),
  ) ?? null;
  const isDetailModelConfiguratorEnabled = Boolean(detailModelConfigurator);
  const hardTubeAccessoryConfig = getHardTubeAccessoryConfig(data, configuratorLocale);
  const hardTubeCopy = getHardTubeAccessoryCopy(configuratorLocale);
  const isHardTubeConfiguratorEnabled = Boolean(hardTubeAccessoryConfig);
  const [isHardTubeConfiguratorOpen, setIsHardTubeConfiguratorOpen] = useState(false);
  const [isStandaloneFittingSelectorOpen, setIsStandaloneFittingSelectorOpen] = useState(false);
  const standaloneFittingType = isHardTubePlug(data) ? "hard-tube-plugs"
    : isStandaloneFittingType(data.productTypeId) ? data.productTypeId : null;
  const [hardTubeSelection, setHardTubeSelection] = useState<{ productCode: string; choice: HardTubeAccessoryChoice | null } | null>(null);
  const hardTubeAccessoryChoice = hardTubeSelection?.productCode === hardTubeAccessoryConfig?.productCode
    && (hardTubeSelection?.choice === "none" || getHardTubeAccessory(hardTubeAccessoryConfig, hardTubeSelection?.choice ?? null))
    ? hardTubeSelection?.choice ?? null : null;
  const quickConnectPairConfig = getQuickConnectPairConfig(data, configuratorLocale);
  const isQuickConnectPairingEnabled = Boolean(quickConnectPairConfig);
  const useSharedQuickConnectSelector = isQuickConnectPairingEnabled;
  const [isQuickConnectPairConfiguratorOpen, setIsQuickConnectPairConfiguratorOpen] = useState(false);
  const [quickConnectPairSelection, setQuickConnectPairSelection] = useState<string | null>(() => quickConnectPairConfig?.defaultModel || null);
  const [quickConnectLastPairModel, setQuickConnectLastPairModel] = useState<string | null>(() => quickConnectPairConfig?.defaultModel || null);
  const isQuickConnectSingleSelection = useSharedQuickConnectSelector && quickConnectPairSelection === "none";
  const quickConnectPairOption = quickConnectPairConfig?.options.find(option => option.model === quickConnectPairSelection) || null;
  const quickConnectViewerMate = isQuickConnectSingleSelection ? "none" : quickConnectPairOption?.model.toLowerCase();

  const luerPairConfig = getLuerPairConfig(data, configuratorLocale);
  const isLuerPairingEnabled = Boolean(luerPairConfig);
  const [luerPairSelection, setLuerPairSelection] = useState<LuerPairChoice | null>(() => luerPairConfig?.defaultChoice || null);
  const [showLuerAssembly, setShowLuerAssembly] = useState(true);
  const [isLuerPairSelectorOpen, setIsLuerPairSelectorOpen] = useState(false);
  const [luerDrawingRequest, setLuerDrawingRequest] = useState(false);
  const luerSelectedParts = luerPairConfig && luerPairSelection ? resolveLuerPair(luerPairConfig, luerPairSelection) : null;
  const fittingResourceDrawings: FittingDrawing[] = luerSelectedParts
    ? luerSelectedParts.map(part => ({ role: getLuerRole(part.family), label: part.name, model: part.model, url: part.drawingHref }))
    : quickConnectPairConfig
      ? [{ role: quickConnectPairConfig.baseGender, label: quickConnectPairConfig.baseGender === "P" ? "公端" : "母端", model: quickConnectPairConfig.baseModel, url: drawingPreviewUrl },
        ...(quickConnectPairOption ? [{ role: quickConnectPairOption.genderCode, label: quickConnectPairOption.genderCode === "P" ? "公端" : "母端", model: quickConnectPairOption.model, url: quickConnectPairOption.drawingHref }] : [])]
      : [{ role: "base", label: "零件", model: data.model || data.foreachModel || data.slug, url: drawingPreviewUrl }];
  const fittingResourceModel: FittingModelSource = quickConnectCadAssets
    ? { kind: "cad", props: { modelId: quickConnectCadAssets.viewerId, title: quickConnectCadAssets.model,
        productFamily: "quick-connect", fittingProduct: data.slug, quickConnectMate: quickConnectViewerMate, locale: configuratorLocale } }
    : luerCadAssets
      ? { kind: "luer", parts: luerSelectedParts || [luerCadAssets] }
      : fittingCadAssets || standaloneFittingCadAssets
        ? { kind: "cad", props: { modelId: (fittingCadAssets || standaloneFittingCadAssets)!.viewerId,
            title: (fittingCadAssets || standaloneFittingCadAssets)!.model, productFamily: "fitting",
            fittingFinish: (fittingCadAssets || standaloneFittingCadAssets)!.fittingFinish,
            fittingProduct: fittingCadAssets?.fittingProduct || data.slug,
            fittingAccessory: fittingCadAssets ? hardTubeAccessoryChoice ?? undefined : undefined, locale: configuratorLocale } }
        : model3dUrl ? { kind: "file", slug: data.slug, model: data.model, url: model3dUrl } : null;
  const [isQuickConnectSeriesSelectorOpen, setIsQuickConnectSeriesSelectorOpen] = useState(false);
  const [quickConnectSeriesModelSelection, setQuickConnectSeriesModelSelection] = useState<string | null>(null);

  function openQuickConnectSeriesSelector(model?: string) {
    setQuickConnectSeriesModelSelection(model || quickConnectSeriesRows[0]?.model || null);
    setIsQuickConnectSeriesSelectorOpen(true);
  }

  function confirmQuickConnectSeriesModel(model: string) {
    const row = quickConnectSeriesRows.find(item => item.model === model);
    setQuickConnectSeriesModelSelection(model);
    setIsQuickConnectSeriesSelectorOpen(false);
    const href = localizeInternalHref(
      row?.detailHref || `/products/fittings/quick-connect-fittings/${model.toLowerCase()}`,
      localePrefix,
    );
    window.location.href = href;
  }
  function setHardTubeAccessoryChoice(choice: HardTubeAccessoryChoice | null) {
    if (hardTubeAccessoryConfig) setHardTubeSelection({ productCode: hardTubeAccessoryConfig.productCode, choice });
  }
  const hasConcreteDisplayModel = isDetailModelConfiguratorEnabled
    ? Boolean(selectedDetailVariant?.model)
    : !isCustomProduct && (isTubingConfiguratorEnabled
      ? Boolean(selectedTubingVariant?.model)
      : !isCustomInquiryMode(data) && Boolean(getDisplayModelText(data).trim()));
  const isDetailVariantRequired = (isTubingConfiguratorEnabled && !selectedTubingVariant)
    || (isDetailModelConfiguratorEnabled && !selectedDetailVariant);

  const isFittingCombinationWorkspace = isHardTubeConfiguratorEnabled || isLuerPairingEnabled || isQuickConnectPairingEnabled;
  const isFixedConfigurationWorkspace = !isFittingCombinationWorkspace && !isEaInquiryEnabled && !isDetailModelConfiguratorEnabled
    && !isTubingConfiguratorEnabled && !isAssemblyConfigurator && !isAssemblyCustomerCategoryPage && !isProbeCustomerCategoryPage
    && !isQuickConnectSeriesDetail && hasConcreteDisplayModel && Boolean(isCadRequestAvailable || actionDatasheet);
  const isInquiryResourceWorkspace = !isFittingCombinationWorkspace && !isEaInquiryEnabled && !isDetailModelConfiguratorEnabled
    && !isTubingConfiguratorEnabled && !isAssemblyConfigurator && !isAssemblyCustomerCategoryPage && !isProbeCustomerCategoryPage
    && !isQuickConnectSeriesDetail && isCustomProduct && Boolean(isCadRequestAvailable || actionDatasheet);
  const isAdditionalConfigurationWorkspace = isFittingCombinationWorkspace || isFixedConfigurationWorkspace || isInquiryResourceWorkspace;
  const usesCompactConfigurationLayout = isAdditionalConfigurationWorkspace || isEaInquiryEnabled || isDetailModelConfiguratorEnabled;
  const hasStandaloneProductActions = !isAssemblyConfigurator && !isTubingConfiguratorEnabled;
  const workspacePresentation = getSelectionWorkspacePresentation(configuratorLocale,
    isFittingCombinationWorkspace ? "fittings"
      : isInquiryResourceWorkspace || isProbeCustomerCategoryPage ? "custom"
        : isQuickConnectSeriesDetail || !isCadRequestAvailable ? "model" : "support");
  const [editingFittingConfigurationId, setEditingFittingConfigurationId] = useState<string | null>(null);
  function isValidFittingChoice(value: FittingConfigurationChoice) {
    if (value.kind === "hard-tube") return Boolean(hardTubeAccessoryConfig && (value.choice === "none" || getHardTubeAccessory(hardTubeAccessoryConfig, value.choice)));
    if (value.kind === "quick-connect") return Boolean(quickConnectPairConfig && (value.choice === "none" || quickConnectPairConfig.options.some(option => option.model === value.choice)));
    return Boolean(luerPairConfig && resolveLuerPair(luerPairConfig, value.choice));
  }
  const [fittingConfigurations, updateFittingConfigurations] = useFittingConfigurations(
    hardTubeAccessoryConfig ? `hard-tube:${hardTubeAccessoryConfig.productCode}:${hardTubeAccessoryConfig.model}`
      : luerPairConfig ? `luer:${luerPairConfig.base.productCode}:${luerPairConfig.base.model}`
      : quickConnectPairConfig ? `quick-connect:${quickConnectPairConfig.baseProductCode}:${quickConnectPairConfig.baseModel}` : null,
    isValidFittingChoice);
  const baseModel = String(data.foreachModel || data.model || "");
  const detailCartSourceType = isTubingConfiguratorEnabled ? "tubing-selection" : "pump-selection";
  // Only a concrete product can be the default. Series and custom products still require selection.
  const isDefaultInquiryEnabled = isFittingCombinationWorkspace || isFixedConfigurationWorkspace;
  const defaultInquiryCopy = getDefaultInquiryCopy(configuratorLocale, isFittingCombinationWorkspace);
  const defaultInquiryIdentity = { sourceType: detailCartSourceType,
    productCode: getDetailCartProductCode(), foreachModel: String(data.modelDisplay || data.displayModel || baseModel).trim() } as const;
  const defaultInquiryCartItem = findDefaultInquiryCartItem(cartItems, defaultInquiryIdentity);
  const defaultFittingChoice: FittingConfigurationChoice | undefined = hardTubeAccessoryConfig ? { kind: "hard-tube", choice: "none" }
    : quickConnectPairConfig ? { kind: "quick-connect", choice: "none" }
      : luerPairConfig ? { kind: "luer", choice: { mode: "single" } } : undefined;
  const defaultSavedConfiguration = fittingConfigurations.configurations.find(item => isDefaultInquiryChoice(item.choice));
  const [modelDrawings, saveModelDrawings] = useModelDrawingRequirements(`${standaloneFittingType || data.productTypeId}:${baseModel}`,
    defaultInquiryDrawingTypes(isDefaultInquiryEnabled && isCadRequestAvailable));
  const defaultInquiryDrawings = defaultInquiryDrawingTypes(isCadRequestAvailable,
    defaultInquiryCartItem ?? (defaultFittingChoice ? defaultSavedConfiguration : { drawingTypes: modelDrawings }));
  const editingFittingConfiguration = fittingConfigurations.configurations.find(item => item.id === editingFittingConfigurationId);
  const editingFittingDrawings = isDefaultInquiryEnabled ? defaultInquiryDrawingTypes(isCadRequestAvailable, editingFittingConfiguration)
    : editingFittingConfiguration?.drawingTypes || [];
  const sameDrawings = (item: { drawingTypes?: CadDrawingType[]; needDrawing?: boolean } | undefined, types?: CadDrawingType[]) =>
    Boolean(item && (types === undefined || JSON.stringify(getDrawingTypes(item)) === JSON.stringify(normalizeDrawingTypes(types))));
  function fittingDrawings(choice: FittingConfigurationChoice, request: boolean | CadDrawingType[] = false): CadDrawingType[] {
    if (Array.isArray(request)) return normalizeDrawingTypes(request);
    const saved = fittingConfigurations.configurations.find(item => JSON.stringify(item.choice) === JSON.stringify(choice));
    const types = isDefaultInquiryEnabled ? defaultInquiryDrawingTypes(isCadRequestAvailable, saved) : normalizeDrawingTypes(saved?.drawingTypes);
    return request && !types.length ? ["2d"] : types;
  }
  const baseConfiguration: CadRequestConfiguration = { id: "current", model: baseModel, drawingTypes: modelDrawings, rows: [
    ...(String(data.productCode || "").trim() ? [[workspaceCopy.productCode, String(data.productCode)] as [string, string]] : []),
    ...data.specs.filter(row => row.value !== baseModel && row.value !== String(data.productCode || "")).slice(0, 6)
      .map(row => [row.label, row.value] as [string, string]),
  ] };
  function presentFittingConfiguration(id: string, value: FittingConfigurationChoice, drawingTypes?: CadDrawingType[]): CadRequestConfiguration {
    const rows = [...baseConfiguration.rows];
    if (value.kind === "hard-tube") {
      const accessory = getHardTubeAccessory(hardTubeAccessoryConfig, value.choice);
      if (accessory) rows.push([getHardTubeAccessoryKindLabel(accessory.kind, configuratorLocale),
        `${accessory.model} · ${workspaceCopy.productCode}: ${hardTubeProductCodeText(accessory, hardTubeCopy.pendingCode)} · ${describeHardTubeAccessory(accessory, configuratorLocale)}`]);
      else rows.push([hardTubeCopy.pairing, hardTubeCopy.fittingOnly]);
    } else if (value.kind === "quick-connect") {
      const part = quickConnectPairConfig?.options.find(item => item.model === value.choice);
      rows.push([fittingText("配套接头", configuratorLocale), part
        ? `${part.model} · ${workspaceCopy.productCode}: ${part.productCode}`
        : fittingText("仅当前接头", configuratorLocale)]);
    } else {
      const parts = luerPairConfig ? resolveLuerPair(luerPairConfig, value.choice) : null;
      parts?.slice(1).forEach(part => rows.push([fittingText(part.name, configuratorLocale),
        `${part.model} · ${workspaceCopy.productCode}: ${part.productCode} · ${part.material}`]));
    }
    rows.push([getCadRequestCopy(configuratorLocale).quantity, "1"]);
    return { id, model: baseModel, rows, drawingTypes: normalizeDrawingTypes(drawingTypes) };
  }
  const additionalConfigurations = isFittingCombinationWorkspace
    ? fittingConfigurations.configurations.map(item => presentFittingConfiguration(item.id, item.choice, item.drawingTypes))
    : isFixedConfigurationWorkspace ? [baseConfiguration] : [];
  const workspaceConfigurations = isDefaultInquiryEnabled ? isFittingCombinationWorkspace ? additionalConfigurations.filter(item =>
    !isDefaultInquiryChoice(fittingConfigurations.configurations.find(saved => saved.id === item.id)?.choice)) : [] : additionalConfigurations;
  const defaultInquiryConfiguration: CadRequestConfiguration = {
    ...(defaultFittingChoice ? presentFittingConfiguration("default", defaultFittingChoice, defaultInquiryDrawings) : baseConfiguration),
    id: "default", drawingTypes: defaultInquiryDrawings,
    rows: [...(defaultFittingChoice ? presentFittingConfiguration("default", defaultFittingChoice).rows.slice(0, -1) : baseConfiguration.rows),
      [getCadRequestCopy(configuratorLocale).quantity, String(defaultInquiryCartItem?.quantity || 1)]],
  };
  const cadConfigurations = detailModelConfigurator ? detailConfigurations.variantIds.flatMap(id => {
    const variant = detailModelConfigurator.variants.find(item => item.id === id);
    return variant ? [{ ...variantCadConfiguration(detailModelConfigurator, variant, configuratorLocale), drawingTypes: normalizeDrawingTypes(detailConfigurations.drawingTypes?.[id]) }] : [];
  }) : isDefaultInquiryEnabled ? [{ ...defaultInquiryConfiguration, label: defaultInquiryCopy.defaultLabel },
    ...workspaceConfigurations.map((item, index) => ({ ...item, label: workspaceCopy.configuration(index + 1) }))] : additionalConfigurations;

  function applyFittingConfiguration(value: FittingConfigurationChoice) {
    if (value.kind === "hard-tube") setHardTubeAccessoryChoice(value.choice);
    else if (value.kind === "quick-connect") applyQuickConnectSelection(value.choice);
    else { setLuerPairSelection(value.choice); setShowLuerAssembly(true); }
  }
  function rememberFittingChoice(value: FittingConfigurationChoice, drawingTypes?: CadDrawingType[]) {
    if (!isValidFittingChoice(value)) return;
    updateFittingConfigurations(current => saveFittingConfiguration(current, value, editingFittingConfigurationId, drawingTypes));
    setEditingFittingConfigurationId(null);
  }
  function selectFittingConfiguration(id: string) {
    const item = fittingConfigurations.configurations.find(item => item.id === id);
    if (!item) return;
    updateFittingConfigurations(current => ({ ...current, activeId: id }));
    applyFittingConfiguration(item.choice);
  }
  function deleteFittingConfiguration(id: string) {
    const next = removeFittingConfiguration(fittingConfigurations, id);
    updateFittingConfigurations(() => next);
    setEditingFittingConfigurationId(null);
    const replacement = next.configurations.find(item => item.id === next.activeId);
    if (replacement) applyFittingConfiguration(replacement.choice);
    else if (hardTubeAccessoryConfig) setHardTubeAccessoryChoice(null);
    else if (luerPairConfig) setLuerPairSelection(luerPairConfig.defaultChoice);
    else if (quickConnectPairConfig) applyQuickConnectSelection(quickConnectPairConfig.defaultModel);
  }
  function openAdditionalConfiguration(id?: string) {
    setEditingFittingConfigurationId(id || null);
    if (id) selectFittingConfiguration(id);
    if (standaloneFittingType) setIsStandaloneFittingSelectorOpen(true);
    else if (isHardTubeConfiguratorEnabled) setIsHardTubeConfiguratorOpen(true);
    else if (isLuerPairingEnabled) openLuerPairSelector();
    else if (isQuickConnectPairingEnabled) setIsQuickConnectPairConfiguratorOpen(true);
  }
  function isAdditionalConfigurationAdded(id: string) {
    const saved = fittingConfigurations.configurations.find(item => item.id === id), choice = saved?.choice;
    if (!choice) return sameDrawings(getItem(detailCartSourceType, getDetailCartProductCode()), modelDrawings);
    if (choice.kind === "hard-tube") return isHardTubeSelectionAdded(choice.choice, saved?.drawingTypes);
    if (choice.kind === "quick-connect") return isQuickConnectPairAdded(choice.choice, saved?.drawingTypes);
    return sameDrawings(findLuerPairCartGroup(choice.choice)?.primary, saved?.drawingTypes);
  }
  function addAdditionalConfiguration(id: string, drawing = false) {
    const choice = fittingConfigurations.configurations.find(item => item.id === id)?.choice;
    if (!drawing && isAdditionalConfigurationAdded(id)) { openCart(); return; }
    if (!choice) { if (drawing) handleAddDrawing(); else handleAddList(); return; }
    selectFittingConfiguration(id);
    if (drawing) {
      const existing = choice.kind === "hard-tube" && choice.choice !== "none"
        ? findHardTubeCartBundle(cartItems, hardTubeAccessoryConfig!, choice.choice)?.primary
        : choice.kind === "quick-connect" && choice.choice !== "none"
          ? findQuickConnectPairCartGroup(choice.choice)?.primary
          : choice.kind === "luer" ? findLuerPairCartGroup(choice.choice)?.primary
          : getItem(detailCartSourceType, getDetailCartProductCode());
      if (existing) { toggleDrawingNeed(existing.id, true); return; }
    }
    if (choice.kind === "hard-tube") addHardTubeSelection(choice.choice, drawing);
    else if (choice.kind === "quick-connect") addQuickConnectPair(choice.choice, drawing);
    else addLuerSelection(choice.choice, drawing);
  }

  const realImages = useMemo(() => {
    const images: string[] = [];

    if (data.mainImage) {
      images.push(data.mainImage);
    }

    data.additionalImages.forEach((image) => {
      if (image && !images.includes(image)) {
        images.push(image);
      }
    });

    return images;
  }, [data.additionalImages, data.mainImage]);

  const hasRealImages = realImages.length > 0;
  const activeRealImage = hasRealImages
    ? realImages[Math.min(activeThumb, realImages.length - 1)]
    : null;
  const hardTubeSeo = useMemo(
    () => getHardTubeSeo(sourceData, configuratorLocale),
    [sourceData, configuratorLocale],
  );
  const productImageAlt = String(
    getFittingMainImageAlt(data, configuratorLocale) ||
      hardTubeSeo?.imageAlt ||
      (data as any).imageAltEn ||
      (data as any).mainImageAlt ||
      (data as any).imageAlt ||
      displayProductTitle ||
      `${data.model || ""} ${data.name || ""}`,
  )
    .replace(/\s+/g, " ")
    .trim();
  const sourceAdditionalImageAlts = hardTubeSeo?.additionalImageAlts || data.additionalImageAlts;
  const additionalImageAlts = Array.isArray(sourceAdditionalImageAlts)
    ? sourceAdditionalImageAlts.map((alt: unknown) =>
        String(alt || "")
          .replace(/\s+/g, " ")
          .trim(),
      )
    : [];
  const galleryViewLabels = [copy.frontView, copy.sideView, copy.portDetail];
  const getProductImageAlt = (index: number) => {
    const barbedImageAlt = getBarbedFittingImageAlt(realImages[index], configuratorLocale);
    if (barbedImageAlt) {
      return barbedImageAlt;
    }
    const threadToBarbedImageAlt = getThreadToBarbedFittingImageAlt(realImages[index], configuratorLocale);
    if (threadToBarbedImageAlt) {
      return threadToBarbedImageAlt;
    }
    const femaleThreadAdapterImageAlt = getFemaleThreadAdapterImageAlt(realImages[index], configuratorLocale);
    if (femaleThreadAdapterImageAlt) {
      return femaleThreadAdapterImageAlt;
    }
    const bulkheadBarbedImageAlt = getBulkheadBarbedFittingImageAlt(realImages[index], configuratorLocale);
    if (bulkheadBarbedImageAlt) {
      return bulkheadBarbedImageAlt;
    }
    const sharedPhotoAlt = getSharedFittingPhotoAlt(sourceData.sharedFittingPhotoSources, realImages[index], configuratorLocale);
    if (sharedPhotoAlt) return sharedPhotoAlt;
    if (realImages[index] === quickConnectSupplementaryImage) {
      return getQuickConnectSupplementaryImageAlt(configuratorLocale);
    }
    if (index === 0) {
      return productImageAlt;
    }

    const explicitAlt = additionalImageAlts[index - 1];

    if (explicitAlt) {
      return explicitAlt;
    }

    const viewLabel = galleryViewLabels[index] || String(index + 1);
    return `${productImageAlt} - ${viewLabel}`;
  };

  /*
   * 正式数据中：
   * 只有主图且没有附属图时，不显示缩略图栏。
   *
   * 当前测试数据尚未连接选型主图，因此保留 HTML 原型中的
   * 三个 SVG 缩略图，便于核对版式。
   */
  const showThumbnailRow = hasRealImages ? realImages.length > 0 : true;
  const zoomStyle: ZoomStyle = {
    "--zoom-x": `${zoomPosition.x}%`,
    "--zoom-y": `${zoomPosition.y}%`,
  };

  const runtimeDataForSectionTitle = data as any;
  const sectionTitleMap =
    runtimeDataForSectionTitle.sectionTitleMap &&
    typeof runtimeDataForSectionTitle.sectionTitleMap === "object"
      ? runtimeDataForSectionTitle.sectionTitleMap
      : {};

  function getDbSectionTitle(sectionKey: string, fallback: string) {
    const value = sectionTitleMap[sectionKey];

    return typeof value === "string" && value.trim()
      ? value.trim()
      : fallback;
  }
  function handleMainImageMove(event: MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();

    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;

    setZoomPosition({
      x: Math.max(0, Math.min(100, x)),
      y: Math.max(0, Math.min(100, y)),
    });
  }

  useEffect(() => {
    const viewport = thumbViewportRef.current;
    const activeThumbnail = viewport?.querySelector<HTMLElement>(
      `[data-product-thumb-index="${activeThumb}"]`,
    );

    if (!viewport || !activeThumbnail) {
      return;
    }

    const viewportRect = viewport.getBoundingClientRect();
    const thumbnailRect = activeThumbnail.getBoundingClientRect();
    const isFullyVisible =
      thumbnailRect.left >= viewportRect.left &&
      thumbnailRect.right <= viewportRect.right;

    if (isFullyVisible) {
      return;
    }

    const targetScrollLeft =
      viewport.scrollLeft +
      thumbnailRect.left -
      viewportRect.left -
      (viewport.clientWidth - thumbnailRect.width) / 2;

    viewport.scrollTo({
      left: Math.max(0, targetScrollLeft),
      behavior: "smooth",
    });
  }, [activeThumb, realImages.length]);

  function handlePreviousThumb() {
    if (isLuerPairingEnabled) setShowLuerAssembly(false);
    if (hasRealImages) {
      setActiveThumb((current) =>
        current === 0 ? realImages.length - 1 : current - 1,
      );
      return;
    }

    setActiveThumb((current) => (current === 0 ? 2 : current - 1));
  }

  function handleNextThumb() {
    if (isLuerPairingEnabled) setShowLuerAssembly(false);
    if (hasRealImages) {
      setActiveThumb((current) =>
        current === realImages.length - 1 ? 0 : current + 1,
      );
      return;
    }

    setActiveThumb((current) => (current === 2 ? 0 : current + 1));
  }

  function getDetailCartProductCode() {
    if (isDetailModelConfiguratorEnabled) return selectedDetailVariant?.productCode || "";
    // NC and NO share a family model name, but must remain distinct selections.
    if (data.solenoidAuthoredContent && data.slug) return String(data.slug);
    if (
      isTubingConfiguratorEnabled
    ) {
      return (
        selectedTubingVariant
          ?.productCode || ""
      );
    }

    return String(
      analyticsProductId ||
        data.productCode ||
        data.productId ||
        data.modelDisplay ||
        data.displayModel ||
        data.foreachModel ||
        data.model ||
        data.slug ||
        ""
    ).trim();
  }

  function createDetailCartItem(
    needDrawing: boolean,
    variantOverride?: ProductConfiguratorVariant,
    requestedDrawings?: CadDrawingType[],
  ): SelectionCartItemInput {
    const activeTubingVariant =
      variantOverride ||
      selectedTubingVariant;
    const activeDetailVariant = variantOverride || selectedDetailVariant;

    const productCode =
      isDetailModelConfiguratorEnabled
        ? activeDetailVariant?.productCode || ""
        : isTubingConfiguratorEnabled
        ? activeTubingVariant
            ?.productCode || ""
        : getDetailCartProductCode();

    const modelText =
      isDetailModelConfiguratorEnabled
        ? activeDetailVariant?.model || ""
        : data.solenoidAuthoredContent
        ? `${data.modelName} · ${data.cardName}`
        : isTubingConfiguratorEnabled
        ? activeTubingVariant?.model ||
          ""
        : String(
            data.modelDisplay ||
              data.displayModel ||
              data.foreachModel ||
              data.model ||
              data.title ||
              productCode
          ).trim();

    const productName = isPlungerPumpDetailData(data)
      ? isEnglish
        ? "Piston Pump"
        : "柱塞泵"
      : String(
          data.productTypeName ||
            data.productTypeLabel ||
            data.seriesName ||
            data.series ||
            (isDiaphragmPumpDetailData(data)
              ? isEnglish
                ? "Diaphragm Pump"
                : "隔膜泵"
              : isPipettingPumpDetailData(data)
                ? isEnglish
                  ? "Pipetting Pump"
                  : "移液泵"
                : isEnglish
                  ? "Product"
                  : "产品")
        ).trim();

    const resolvedProductName =
      isDetailModelConfiguratorEnabled
        ? isDiaphragmPage
          ? diaphragmCategoryCopy.parent
          : isValvelessPumpDetailData(data) ? "无阀计量泵" : "微型隔膜电磁阀"
        : isPvcTubingConfiguratorEnabled
        ? isEnglish
          ? "PVC Tubing"
          : "PVC 管"
        : isTpuTubingConfiguratorEnabled
          ? isEnglish
            ? "TPU Tubing"
            : "TPU 管"
        : isFepTubingConfiguratorEnabled
          ? isEnglish
            ? "FEP Tubing"
            : "FEP 管"
        : isPtfeTubingConfiguratorEnabled
          ? isEnglish
            ? "PTFE Tubing"
            : "PTFE 管"
          : productName;

    const fallbackDetailHref = data.slug
      ? isPlungerPumpDetailData(data)
        ? `/products/pumps/piston-pump/${data.slug}`
        : isDiaphragmPumpDetailData(data)
          ? getDiaphragmPumpPath("zh", data.slug, { trailingSlash: false })
          : isPipettingPumpDetailData(data)
            ? `/products/pumps/pipetting-pumps/${data.slug}`
            : isTubingDetailData(data)
              ? `/products/tubing/${data.slug}`
              : ""
      : "";

    const drawingTypes = normalizeDrawingTypes(requestedDrawings ?? (variantOverride
      ? detailConfigurations.drawingTypes?.[variantOverride.id] : modelDrawings));
    if (needDrawing && !drawingTypes.length) drawingTypes.push("2d");
    return {
      sourceType:
        detailCartSourceType,
      sourceLabel: copy.detailSourceLabel,
      productName:
        resolvedProductName,
      productCode,
      foreachModel: modelText,
      competitorModels: [],
      quantity: 1,
      needDrawing: drawingTypes.length > 0, drawingTypes,
      ...(isDefaultInquiryEnabled ? { inquiryMode: "product" as const } : {}),
      imagePath:
        data.imageCard ||
        data.image ||
        data.imageUrl ||
        data.mainImage ||
        data.heroImage ||
        "",
      detailHref:
        (String(sourceData.category) === "fittings" || sourceData.categoryId === "fittings")
          ? localizeInternalHref(String(data.detailHref || data.href || ""), localePrefix)
          : data.detailHref ||
        data.href ||
        (isLocalizedDetail && fallbackDetailHref
          ? `${localePrefix}${fallbackDetailHref}`
          : fallbackDetailHref),
    };
  }


  const currentDetailCartItem =
    isEaInquiryEnabled
      ? eaInquiryConfiguration ? findEaInquiryCartItem(eaInquiryConfiguration) : undefined
      : isAssemblyConfigurator
      ? flangedTubingChoice ? cartItems.find(item => item.id === flangedChoiceCartId(flangedTubingChoice)) : undefined
      : isHardTubeConfiguratorEnabled && hardTubeAccessoryChoice && hardTubeAccessoryChoice !== "none"
      ? findHardTubeCartBundle(cartItems, hardTubeAccessoryConfig!, hardTubeAccessoryChoice)?.primary
      : getItem(
      detailCartSourceType,
      getDetailCartProductCode()
    );
  const isDetailProductSelected = isLuerPairingEnabled
    ? Boolean(luerPairSelection && findLuerPairCartGroup(luerPairSelection))
    : isHardTubeConfiguratorEnabled
    ? hardTubeAccessoryChoice !== null && isHardTubeSelectionAdded(hardTubeAccessoryChoice)
    : isQuickConnectPairingEnabled
      ? isQuickConnectSingleSelection ? Boolean(currentDetailCartItem) : Boolean(quickConnectPairOption && isQuickConnectPairAdded(quickConnectPairOption.model))
      : Boolean(currentDetailCartItem);
  const isDetailDrawingSelected = isLuerPairingEnabled
    ? Boolean(luerPairSelection && findLuerPairCartGroup(luerPairSelection)?.items.some(item => item.needDrawing))
    : isHardTubeConfiguratorEnabled && hardTubeAccessoryChoice && hardTubeAccessoryChoice !== "none"
    ? Boolean(findHardTubeCartBundle(cartItems, hardTubeAccessoryConfig!, hardTubeAccessoryChoice)?.items.some(item => item.needDrawing))
    : isQuickConnectPairingEnabled && quickConnectPairOption
      ? Boolean(findQuickConnectPairCartGroup(quickConnectPairOption.model)?.items.some(item => item.needDrawing))
      : Boolean(currentDetailCartItem?.needDrawing);

  function findLuerPairCartGroup(choice: LuerPairChoice) {
    if (!luerPairConfig) return undefined;
    const parts = resolveLuerPair(luerPairConfig, choice);
    if (!parts) return undefined;
    return getCartGroups(cartItems).find(group =>
      group.primary.sourceType === detailCartSourceType
      && group.primary.productCode === luerPairConfig.base.productCode
      && group.primary.foreachModel === luerPairConfig.base.model
      && (parts.length > 1 || !group.primary.bundleId)
      && group.items.length === parts.length
      && group.items.every(item => parts.some(part => part.productCode === item.productCode && part.model === item.foreachModel)));
  }

  function addLuerSelection(choice: LuerPairChoice, request: boolean | CadDrawingType[] = false) {
    if (!luerPairConfig) return;
    const parts = resolveLuerPair(luerPairConfig, choice);
    if (!parts) return;
    const drawings = fittingDrawings({ kind: "luer", choice }, request);
    rememberFittingChoice({ kind: "luer", choice }, drawings);
    setLuerPairSelection(choice); setShowLuerAssembly(true);
    const existing = findLuerPairCartGroup(choice);
    if (existing) { setDrawingTypes(existing.primary.id, drawings); return; }
    const primary = createDetailCartItem(drawings.length > 0, undefined, drawings);
    if (parts.length === 1) { addItem(primary); return; }
    addBundle(primary, parts.slice(1).map(part => ({
      sourceType: detailCartSourceType, sourceLabel: copy.detailSourceLabel,
      productName: fittingText(part.name, configuratorLocale), productCode: part.productCode, foreachModel: part.model,
      competitorModels: [], quantity: 1, needDrawing: drawings.length > 0, drawingTypes: drawings,
      imagePath: part.imagePath, detailHref: localizeInternalHref(part.detailHref, localePrefix),
    })));
  }

  function openLuerPairSelector(needDrawing = false) {
    setLuerDrawingRequest(needDrawing);
    setIsLuerPairSelectorOpen(true);
  }

  function isHardTubeSelectionAdded(choice: HardTubeAccessoryChoice, drawings?: CadDrawingType[]) {
    if (!hardTubeAccessoryConfig) return false;
    return sameDrawings(choice === "none" ? findDefaultInquiryCartItem(cartItems, defaultInquiryIdentity)
      : findHardTubeCartBundle(cartItems, hardTubeAccessoryConfig, choice)?.primary, drawings);
  }

  function findQuickConnectPairCartGroup(model: string) {
    const option = quickConnectPairConfig?.options.find(item => item.model === model);
    if (!option || !quickConnectPairConfig) return undefined;
    return getCartGroups(cartItems).find(group =>
      group.primary.productCode === getDetailCartProductCode()
        && group.primary.foreachModel === quickConnectPairConfig.baseModel
        && group.accessories.some(item => item.productCode === option.productCode
          && item.foreachModel === option.model
          && isSameInquiryDetailHref(item.detailHref, option.detailHref))
    );
  }

  function isQuickConnectPairAdded(model: string, drawings?: CadDrawingType[]) {
    return sameDrawings(useSharedQuickConnectSelector && model === "none" ? findDefaultInquiryCartItem(cartItems, defaultInquiryIdentity)
      : findQuickConnectPairCartGroup(model)?.primary, drawings);
  }

  function applyQuickConnectSelection(model: string) {
    if (model !== "none") setQuickConnectLastPairModel(model);
    setQuickConnectPairSelection(model);
  }

  function addQuickConnectPair(model: string, request: boolean | CadDrawingType[] = false) {
    const candidate: FittingConfigurationChoice = { kind: "quick-connect", choice: model };
    const drawings = fittingDrawings(candidate, request);
    if (isValidFittingChoice(candidate)) rememberFittingChoice(candidate, drawings);
    const config = quickConnectPairConfig;
    if (config && useSharedQuickConnectSelector && model === "none") {
      applyQuickConnectSelection("none");
      const existing = findDefaultInquiryCartItem(cartItems, defaultInquiryIdentity);
      if (!existing) addItem(createDetailCartItem(drawings.length > 0, undefined, drawings));
      else setDrawingTypes(existing.id, drawings);
      return;
    }
    const option = config?.options.find(item => item.model === model);
    if (!config || !option) return;
    applyQuickConnectSelection(option.model);
    const existing = findQuickConnectPairCartGroup(model);
    if (existing) { setDrawingTypes(existing.primary.id, drawings); return; }
    addBundle(createDetailCartItem(drawings.length > 0, undefined, drawings), [{
      sourceType: detailCartSourceType, sourceLabel: copy.detailSourceLabel,
      productName: fittingText(`${config.series} ${option.genderCode === "P" ? "公端" : "母端"}快插接头`, configuratorLocale),
      productCode: option.productCode, foreachModel: option.model, competitorModels: [], quantity: 1,
      needDrawing: drawings.length > 0, drawingTypes: drawings,
      imagePath: option.imagePath, detailHref: localizeInternalHref(option.detailHref, localePrefix),
    }]);
  }

  function addHardTubeSelection(choice: HardTubeAccessoryChoice, request: boolean | CadDrawingType[] = false) {
    if (!hardTubeAccessoryConfig || (choice !== "none" && !getHardTubeAccessory(hardTubeAccessoryConfig, choice))) return;
    const drawings = fittingDrawings({ kind: "hard-tube", choice }, request);
    rememberFittingChoice({ kind: "hard-tube", choice }, drawings);
    setHardTubeAccessoryChoice(choice);
    const existing = choice === "none" ? findDefaultInquiryCartItem(cartItems, defaultInquiryIdentity)
      : findHardTubeCartBundle(cartItems, hardTubeAccessoryConfig, choice)?.primary;
    if (existing) { setDrawingTypes(existing.id, drawings); return; }
    const washer = getHardTubeAccessory(hardTubeAccessoryConfig, choice);
    if (washer) addBundle(createDetailCartItem(drawings.length > 0, undefined, drawings), [{
      sourceType: detailCartSourceType, sourceLabel: hardTubeCopy.source,
      productName: formatHardTubeCopy(hardTubeCopy.accessoryProduct, { material: getHardTubeMaterialLabel(washer.material, configuratorLocale), kind: getHardTubeAccessoryKindLabel(washer.kind, configuratorLocale), model: hardTubeAccessoryConfig.model }),
      productCode: washer.productCode, foreachModel: washer.model, competitorModels: [], quantity: 1,
      needDrawing: drawings.length > 0, drawingTypes: drawings, detailHref: hardTubeAccessoryConfig.detailHref,
    }]);
    else if (choice === "none") addItem(createDetailCartItem(drawings.length > 0, undefined, drawings));
  }

  function toggleDefaultInquirySelection() {
    if (!isDefaultInquiryEnabled) return;
    // The default is the current product alone, independent of saved accessory combinations.
    if (defaultFittingChoice) updateFittingConfigurations(current => saveFittingConfiguration(current, defaultFittingChoice, null, defaultInquiryDrawings));
    else saveModelDrawings(defaultInquiryDrawings);
    if (defaultInquiryCartItem) removeItem(defaultInquiryCartItem.id);
    else addItem(createDetailCartItem(defaultInquiryDrawings.length > 0, undefined, defaultInquiryDrawings));
  }

  function handleOpenConfigurator() {
    if (isQuickConnectSeriesDetail) {
      openQuickConnectSeriesSelector();
      return;
    }
    if (isQuickConnectPairingEnabled) {
      setIsQuickConnectPairConfiguratorOpen(true);
      return;
    }
    console.info("配置选择端口预留", data.slug);
  }

  function handleProductTabChange(nextTab: ProductDetailTab) {
    if (nextTab === activeTab) return;

    setActiveTab(nextTab);
    if (nextTab === "model3d" && !showModelPreview) setHasOpenedModel(true);

    if (!analyticsProductId) return;

    const tabName =
      nextTab === "spec"
        ? "specifications"
        : nextTab === "applications"
          ? "applications"
        : nextTab === "model3d"
          ? "3d"
          : nextTab === "drawing"
            ? "2d"
            : "datasheet";

    trackProductTabSelect({
      tabName,
      productId: analyticsProductId,
      productCategory: analyticsProductCategory,
      productSeries: analyticsProductSeries,
      locale: analyticsLocale,
    });

    const resource =
      nextTab === "model3d" && model3dUrl && data.productTypeId !== "valveless-pump"
        ? {
            url: model3dUrl,
            id: `${analyticsProductId}:model3d`,
            type: "3d_model",
          }
        : nextTab === "drawing" && drawingPreviewUrl
          ? {
              url: drawingPreviewUrl,
              id: `${analyticsProductId}:drawing2d`,
              type: "2d_drawing",
            }
          : nextTab === "datasheet" && datasheet
            ? {
                url: datasheet.file,
                id: `${analyticsProductId}:datasheet:${datasheet.id}`,
                type: "datasheet",
              }
          : null;

    if (!resource) return;

    const fileType = resource.url.split(/[?#]/)[0].split(".").at(-1) || "";
    trackResourceView({
      resourceId: resource.id,
      resourceType: resource.type,
      fileType,
      sourceSection: "product_detail_tabs",
      locale: analyticsLocale,
      productId: analyticsProductId,
    });
  }

  function handleOpenModel() {
    setOpenedModelUrl(model3dUrl);
    setHasOpenedModel(true);
    if (!analyticsProductId) return;
    trackResourceView({
      resourceId: `${analyticsProductId}:model3d`,
      resourceType: "3d_model",
      fileType: model3dUrl.split(/[?#]/)[0].split(".").at(-1) || "unknown",
      sourceSection: "product_detail_3d_preview",
      locale: analyticsLocale,
      productId: analyticsProductId,
    });
  }

  function handleAddDrawing() {
    if (isEaInquiryEnabled) {
      if (currentDetailCartItem) toggleDrawingNeed(currentDetailCartItem.id, !currentDetailCartItem.needDrawing);
      else { openEaInquiryEditor(false, true); }
      return;
    }
    if (isAssemblyConfigurator) {
      setFlangedNeedDrawing(true); setIsFlangedTubingOpen(true);
      return;
    }
    if (isLuerPairingEnabled) {
      if (!luerPairSelection) { openLuerPairSelector(true); return; }
      const group = findLuerPairCartGroup(luerPairSelection);
      if (group) toggleDrawingNeed(group.primary.id, !group.items.some(item => item.needDrawing));
      else addLuerSelection(luerPairSelection, true);
      return;
    }
    if (isHardTubeConfiguratorEnabled && hardTubeAccessoryChoice && hardTubeAccessoryChoice !== "none") {
      const bundle = findHardTubeCartBundle(cartItems, hardTubeAccessoryConfig!, hardTubeAccessoryChoice);
      if (bundle) toggleDrawingNeed(bundle.primary.id, !bundle.items.some(item => item.needDrawing));
      else addHardTubeSelection(hardTubeAccessoryChoice, true);
      return;
    }
    if (isQuickConnectPairingEnabled && !isQuickConnectSingleSelection) {
      if (!quickConnectPairOption) {
        setIsQuickConnectPairConfiguratorOpen(true);
        return;
      }
      const bundle = findQuickConnectPairCartGroup(quickConnectPairOption.model);
      if (bundle) toggleDrawingNeed(bundle.primary.id, !bundle.items.some(item => item.needDrawing));
      else addQuickConnectPair(quickConnectPairOption.model, true);
      return;
    }
    const item = createDetailCartItem(true);

    if (!item.productCode || !item.foreachModel) {
      console.warn("详情页清单参数不完整", data);
      return;
    }

    const existingItem = getItem(
      detailCartSourceType,
      item.productCode
    );

    if (existingItem) {
      toggleDrawingNeed(existingItem.id, !existingItem.needDrawing);
      return;
    }

    addItem(item);
  }

  function saveCadDrawingTypes(id: string, types: CadDrawingType[]) {
    if (isDefaultInquiryEnabled && id === defaultInquiryConfiguration.id) {
      if (defaultFittingChoice) updateFittingConfigurations(current => saveFittingConfiguration(current, defaultFittingChoice, null, types));
      else saveModelDrawings(types);
      if (defaultInquiryCartItem) setDrawingTypes(defaultInquiryCartItem.id, types);
    } else if (detailConfigurations.variantIds.includes(id)) {
      updateDetailConfigurations(current => ({ ...current, drawingTypes: { ...current.drawingTypes, [id]: types } }));
    } else if (fittingConfigurations.configurations.some(item => item.id === id)) {
      updateFittingConfigurations(current => ({ ...current, configurations: current.configurations.map(item => item.id === id ? { ...item, drawingTypes: types } : item) }));
    } else saveModelDrawings(types);
  }

  function handleRequestCad(configurationId?: string) {
    const activeFitting = fittingConfigurations.configurations.find(item => item.id === fittingConfigurations.activeId);
    setCadConfigurationId(configurationId ?? (isEaInquiryEnabled ? eaConfigurations.activeId : isDetailModelConfiguratorEnabled ? detailConfigurations.activeId
      : isDefaultInquiryEnabled && (!activeFitting || isDefaultInquiryChoice(activeFitting.choice)) ? "default" : fittingConfigurations.activeId));
    const selectedPistonModel = eaInquiryConfiguration ? getEaPumpInquiryTarget(eaInquiryConfiguration.choice)?.model : undefined;
    setCadRequestedModel(selectedDetailVariant?.model || selectedPistonModel || String(sourceData.foreachModel || sourceData.model || ""));
    setIsCadRequestOpen(true);

    trackBeginInquiry({
      formId: "product_cad_request_form",
      formType: "cad_request",
      sourceSection: "product_detail",
      locale: analyticsLocale,
      productId: analyticsProductId,
      productCategory: analyticsProductCategory,
    });
  }

  function handleProbeCustomInquiry() {
    trackBeginInquiry({
      formId: "probe_custom_inquiry_form",
      formType: "customization_request",
      sourceSection: "product_detail",
      locale: analyticsLocale,
      productId: analyticsProductId,
      productCategory: analyticsProductCategory,
    });
    setIsProbeCustomInquiryOpen(true);
  }

  function handleAddList() {
    if (isEaInquiryEnabled) {
      if (currentDetailCartItem) openCart();
      else if (eaInquiryConfiguration) addEaInquiry(eaInquiryConfiguration, eaInquiryQuantity, false);
      else { openEaInquiryEditor(); }
      return;
    }
    if (isAssemblyConfigurator) {
      setFlangedNeedDrawing(false); setIsFlangedTubingOpen(true);
      return;
    }
    if (isLuerPairingEnabled) {
      if (!luerPairSelection) openLuerPairSelector();
      else addLuerSelection(luerPairSelection);
      return;
    }
    if (isHardTubeConfiguratorEnabled) {
      if (hardTubeAccessoryChoice === null) setIsHardTubeConfiguratorOpen(true);
      else addHardTubeSelection(hardTubeAccessoryChoice);
      return;
    }
    if (isQuickConnectPairingEnabled) {
      if (isQuickConnectSingleSelection) addQuickConnectPair("none");
      else if (!quickConnectPairOption) setIsQuickConnectPairConfiguratorOpen(true);
      else addQuickConnectPair(quickConnectPairOption.model);
      return;
    }
    const item = createDetailCartItem(false);

    if (!item.productCode || !item.foreachModel) {
      console.warn("详情页清单参数不完整", data);
      return;
    }

    const existingItem = getItem(
      detailCartSourceType,
      item.productCode
    );

    if (existingItem) {
      if (isDetailModelConfiguratorEnabled) return;
      removeItem(existingItem.id);
      return;
    }

    addItem(item);
  }

  function rememberDetailVariant(variant: ProductConfiguratorVariant, editingId: string | null = null, drawingTypes?: CadDrawingType[]) {
    if (!detailModelConfigurator?.variants.some(item => item.id === variant.id)) return;
    updateDetailConfigurations(current => saveDetailConfiguration(current, variant.id, editingId, drawingTypes));
    setEditingDetailVariantId(null);
    setNewDetailConfiguration(false);
    setDetailConfigurationRevision(value => value + 1);
  }

  function handleToggleDetailVariant(variant: ProductConfiguratorVariant, drawingTypes?: CadDrawingType[]) {
    const catalogVariant = detailModelConfigurator?.variants.find(item => item.id === variant.id);
    if (!catalogVariant) return;
    rememberDetailVariant(catalogVariant, newDetailConfiguration ? null : editingDetailVariantId, drawingTypes);
    const types = normalizeDrawingTypes(drawingTypes ?? detailConfigurations.drawingTypes?.[variant.id]);
    const existingItem = getItem(detailCartSourceType, catalogVariant.productCode);
    if (existingItem) { setDrawingTypes(existingItem.id, types); return; }
    addItem({ ...createDetailCartItem(types.length > 0, catalogVariant), drawingTypes: types });
  }

  async function addFlangedTubingChoice(value: FlangedConfiguration) {
    const record = snapshotFlangedConfiguration(value);
    const { prepareFlangedPdfAttachment } = await import("@/components/products/tubing-assemblies/flanged-tubing-attachments");
    const attachment = await prepareFlangedPdfAttachment(record, configuratorLocale);
    addItem(createFlangedConfigurationCartItem(record, attachment, pathname || undefined, data.mainImage || undefined, configuratorLocale));
    setFlangedTubingChoice(record.choice);
  }

  function findEaInquiryCartItem(configuration: EaPumpInquiryConfiguration) {
    const id = eaPumpInquiryCartId(configuration);
    // Match normalized configurations so entries saved by the original EA-500 pilot still work.
    return cartItems.find(item => item.eaPumpConfiguration && eaPumpInquiryCartId(item.eaPumpConfiguration) === id);
  }

  function openEaInquiryEditor(createNew = false, needDrawing = false) {
    // Commit a preview only when the customer starts editing that configuration.
    if (!createNew && eaPreviewConfigurationId) selectEaConfiguration(eaPreviewConfigurationId);
    setIsNewEaConfiguration(createNew);
    setEaInquiryNeedsDrawing(needDrawing);
    setIsEaInquiryOpen(true);
  }

  function selectEaConfiguration(id: string) {
    const saved = eaConfigurations.configurations.find(item => item.id === id);
    if (!saved) return;
    setEaConfigurations(saveEaPumpConfigurations({ ...eaConfigurations, activeId: id }, sourceData.slug || ""));
    saveEaPumpInquiryDraft(sourceData.slug || "", saved.configuration, saved.quantity, saved.drawingTypes);
    setEaInquiryDraft({ ...saved, slug: sourceData.slug || "" });
    setEaPreviewConfigurationId(null);
    setEaExpandedConfigurationId(id);
  }

  function deleteEaConfiguration(id: string) {
    const collection = saveEaPumpConfigurations(removeEaPumpConfiguration(eaConfigurations, id), sourceData.slug || "");
    setEaConfigurations(collection);
    const saved = collection.configurations.find(item => item.id === collection.activeId);
    if (saved) saveEaPumpInquiryDraft(sourceData.slug || "", saved.configuration, saved.quantity, saved.drawingTypes);
    else clearEaPumpInquiryDraft(sourceData.slug || "");
    setEaInquiryDraft(saved ? { ...saved, slug: sourceData.slug || "" } : null);
    setEaExpandedConfigurationId(null);
    setEaPreviewConfigurationId(null);
  }

  function confirmEaInquiry(configuration: EaPumpInquiryConfiguration, quantity: number, addToList: boolean, drawings: CadDrawingType[]) {
    const sourceSlug = sourceData.slug || "";
    const target = getEaPumpInquiryTarget(configuration.choice);
    saveEaPumpInquiryDraft(sourceSlug, configuration, quantity, drawings);
    const saved = readEaPumpInquiryDraft(sourceSlug);
    if (saved) {
      setEaInquiryDraft({ ...saved, slug: sourceSlug });
      const collection = saveEaPumpConfigurations(upsertEaPumpConfiguration(eaConfigurations, saved,
        isNewEaConfiguration ? null : eaConfigurations.activeId), sourceSlug);
      setEaConfigurations(collection);
      setEaExpandedConfigurationId(collection.activeId);
      setEaPreviewConfigurationId(null);
    }
    setIsNewEaConfiguration(false);
    if (addToList || eaInquiryNeedsDrawing) addEaInquiry(configuration, quantity, eaInquiryNeedsDrawing, drawings);
    else {
      const existing = findEaInquiryCartItem(configuration);
      if (existing) changeQuantity(existing.id, quantity);
      setIsEaInquiryOpen(false);
      if (target && target.slug !== sourceSlug) {
        saveEaPumpInquiryDraft(target.slug, configuration, quantity, drawings);
        router.push(localizeInternalHref(target.detailHref, localePrefix));
      }
    }
  }

  function addEaInquiry(configuration: EaPumpInquiryConfiguration, quantity: number, needDrawing: boolean, requestedDrawings?: CadDrawingType[]) {
    const saved = eaConfigurations.configurations.find(item => eaPumpInquiryCartId(item.configuration) === eaPumpInquiryCartId(configuration));
    const drawings = normalizeDrawingTypes(requestedDrawings ?? saved?.drawingTypes, needDrawing);
    const id = eaPumpInquiryCartId(configuration);
    const existing = findEaInquiryCartItem(configuration);
    if (existing) {
      changeQuantity(existing.id, quantity);
      setDrawingTypes(existing.id, drawings);
    } else {
      const target = getEaPumpInquiryTarget(configuration.choice);
      const series = getPistonInquirySeries(configuration.choice);
      addItem({ ...createDetailCartItem(drawings.length > 0, undefined, drawings), id,
        productCode: target?.productId || "", productName: pistonText(`${series} 柱塞泵`, configuratorLocale),
        foreachModel: pistonText(target ? `${target.model}（配置询价）` : `${series} ${eaPumpInquiryCapacityLabel(configuration)}（配置询价）`, configuratorLocale),
        detailHref: target ? localizeInternalHref(target.detailHref, localePrefix) : undefined, imagePath: target?.imagePath || "",
        quantity, eaPumpConfiguration: configuration });
    }
    setIsEaInquiryOpen(false);
    openCart();
  }

  return (
    fittingView(<div data-product-breadcrumb-shell="true" lang={isAssemblyChineseReview ? "zh-CN" : undefined}>
      {isEaInquiryEnabled && isEaInquiryOpen ? <EaPumpInquiryConfigurator
        locale={configuratorLocale}
        productSlug={sourceData.slug || ""}
        initialValue={isNewEaConfiguration ? null : eaInquiryConfiguration}
        initialQuantity={isNewEaConfiguration ? 1 : currentDetailCartItem?.quantity || eaInquiryQuantity}
        initialDrawingTypes={isNewEaConfiguration ? [] : eaPreviewConfiguration?.drawingTypes ?? eaInquiryDraft?.drawingTypes}
        configurationLabel={isNewEaConfiguration || !eaConfigurations.activeId
          ? `新增配置${eaConfigurations.configurations.length + 1}`
          : `修改配置${eaConfigurations.configurations.findIndex(item => item.id === eaConfigurations.activeId) + 1}`}
        onClose={() => { setIsEaInquiryOpen(false); setIsNewEaConfiguration(false); }}
        onConfirm={confirmEaInquiry}
      /> : null}
      {structuredData ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
          }}
        />
      ) : null}

      {isTubingAssembly && isAssemblyCustomRequestOpen ? (
        <TubingAssemblyCustomRequestModal
          key={analyticsProductId}
          locale={configuratorLocale === "zh" ? "zh-CN" : configuratorLocale}
          copyOverride={data.tubingCustomizationCopy}
          productId={analyticsProductId}
          productName={displayProductTitle}
          configurationSummary={isAssemblyConfigurator ? flangedConfigurationSummary : undefined}
          quantity={currentDetailCartItem?.quantity || 1}
          onClose={() => setIsAssemblyCustomRequestOpen(false)}
        />
      ) : null}

      {probeGuide && isProbeCustomInquiryOpen ? (
        <ProbeCustomInquiryModal
          key={`${configuratorLocale}:${analyticsProductId}`}
          locale={configuratorLocale}
          productId={analyticsProductId}
          productName={displayProductTitle}
          drawingFocus={probeGuide.drawingFocus}
          onClose={() => setIsProbeCustomInquiryOpen(false)}
        />
      ) : null}

      {resourceLocale && isCadRequestOpen ? (
        isEaInquiryEnabled ? <PistonCadRequestModal
          locale={resourceLocale}
          productSlug={sourceData.slug}
          savedConfigurations={eaConfigurations.configurations}
          initialConfigurationId={cadConfigurationId}
          onDrawingTypesChange={(id, types) => {
            const collection = { ...eaConfigurations, configurations: eaConfigurations.configurations.map(item => item.id === id ? { ...item, drawingTypes: types } : item) };
            setEaConfigurations(saveEaPumpConfigurations(collection, sourceData.slug || ""));
            const active = collection.configurations.find(item => item.id === collection.activeId);
            if (active) { saveEaPumpInquiryDraft(sourceData.slug || "", active.configuration, active.quantity, active.drawingTypes); setEaInquiryDraft({ ...active, slug: sourceData.slug || "" }); }
          }}
          onClose={() => setIsCadRequestOpen(false)}
        /> :
        <CadRequestModal
          locale={resourceLocale}
          productName={String(
            displayProductTitle || data.productName || data.name || "",
          ).trim()}
          productSeries={String(
            sourceData.seriesName ||
              sourceData.series ||
              sourceData.seriesCode ||
              sourceData.seriesId ||
              "",
          ).trim()}
          configurations={cadConfigurations}
          onDrawingTypesChange={saveCadDrawingTypes}
          initialConfigurationId={cadConfigurationId}
          referenceConfiguration={selectedDetailVariant && detailModelConfigurator
            ? { ...variantCadConfiguration(detailModelConfigurator, selectedDetailVariant, configuratorLocale), drawingTypes: detailConfigurations.drawingTypes?.[selectedDetailVariant.id] || [] } : baseConfiguration}
          productModel={cadRequestedModel || String(
            sourceData.modelDisplay ||
              sourceData.displayModel ||
              sourceData.foreachModel ||
              sourceData.model ||
              "",
          ).trim()}
          onClose={() => setIsCadRequestOpen(false)}
        />
      ) : null}











      {detailModelConfigurator ? (
        <ProductVariantConfigurator
          key={`${detailModelConfigurator.id}:${openDetailModelConfiguratorId === detailModelConfigurator.id}:${newDetailConfiguration}:${editingDetailVariantId ?? detailConfigurations.activeId}`}
          locale={configuratorLocale}
          open={openDetailModelConfiguratorId === detailModelConfigurator.id}
          config={detailModelConfigurator}
          value={selectedDetailVariant}
          drawingRequirements={isCadRequestAvailable}
          initialDrawingTypes={newDetailConfiguration ? [] : detailConfigurations.drawingTypes?.[selectedDetailVariant?.id || ""]}
          isVariantSelected={(variant, drawings) => sameDrawings(getItem(detailCartSourceType, variant.productCode), drawings)}
          onToggleVariant={handleToggleDetailVariant}
          onClose={() => { setOpenDetailModelConfiguratorId(null); setNewDetailConfiguration(false); setEditingDetailVariantId(null); }}
          onConfirm={(variant, drawings) => {
            rememberDetailVariant(variant, newDetailConfiguration ? null : editingDetailVariantId, drawings);
            setOpenDetailModelConfiguratorId(null);
          }}
        />
      ) : null}
      {isHardTubeConfiguratorEnabled && isHardTubeConfiguratorOpen ? (
        <HardTubeWasherConfigurator
          key={hardTubeAccessoryConfig!.productCode}
          config={hardTubeAccessoryConfig!}
          value={hardTubeAccessoryChoice}
          drawingTypes={editingFittingDrawings}
          isAdded={isHardTubeSelectionAdded}
          onAdd={addHardTubeSelection}
          onClose={() => setIsHardTubeConfiguratorOpen(false)}
          onConfirm={(choice, drawings) => {
            rememberFittingChoice({ kind: "hard-tube", choice }, drawings);
            setHardTubeAccessoryChoice(choice);
            setIsHardTubeConfiguratorOpen(false);
          }}
        />
      ) : null}
      {isStandaloneFittingSelectorOpen && standaloneFittingType ? (
        <StandaloneFittingSelector
          locale={configuratorLocale}
          key={`${standaloneFittingType}:${data.model}`}
          productTypeId={standaloneFittingType}
          model={String(data.foreachModel || data.model)}
          sourceType={detailCartSourceType}
          onClose={() => setIsStandaloneFittingSelectorOpen(false)}
          onConfirm={option => {
            setIsStandaloneFittingSelectorOpen(false);
            if (option.model !== String(data.foreachModel || data.model)) router.push(localizeInternalHref(option.detailHref, localePrefix), {scroll: false});
          }}
        />
      ) : null}
      {isLuerPairSelectorOpen && luerPairConfig ? (
        <LuerPairSelector
          locale={configuratorLocale}
          key={luerPairConfig.base.model}
          config={luerPairConfig}
          presentation="compact"
          value={luerPairSelection}
          needDrawing={luerDrawingRequest}
          drawingTypes={editingFittingDrawings}
          onClose={() => setIsLuerPairSelectorOpen(false)}
          isAdded={(choice, drawings) => sameDrawings(findLuerPairCartGroup(choice)?.primary, drawings)}
          onAdd={(choice, drawings) => addLuerSelection(choice, drawings)}
          onConfirm={(choice, drawings) => {
            rememberFittingChoice({ kind: "luer", choice }, drawings);
            setLuerPairSelection(choice);
            setShowLuerAssembly(true);
            if (luerDrawingRequest) addLuerSelection(choice, drawings);
            setIsLuerPairSelectorOpen(false);
          }}
        />
      ) : null}
      {isQuickConnectPairingEnabled && isQuickConnectPairConfiguratorOpen && quickConnectPairConfig ? (
        <QuickConnectPairSelector
          locale={configuratorLocale}
          key={quickConnectPairConfig.baseModel}
          open={isQuickConnectPairConfiguratorOpen}
          config={quickConnectPairConfig}
          presentation={useSharedQuickConnectSelector ? "compact" : "standard"}
          value={quickConnectPairSelection}
          lastPairModel={quickConnectLastPairModel}
          drawingTypes={editingFittingDrawings}
          isAdded={(model, drawings) => isQuickConnectPairAdded(model, drawings)}
          onAdd={(model, drawings) => addQuickConnectPair(model, drawings)}
          onClose={() => setIsQuickConnectPairConfiguratorOpen(false)}
          onConfirm={(model, drawings) => {
            rememberFittingChoice({ kind: "quick-connect", choice: model }, drawings);
            applyQuickConnectSelection(model);
            setIsQuickConnectPairConfiguratorOpen(false);
          }}
        />
      ) : null}
      {isQuickConnectSeriesDetail && isQuickConnectSeriesSelectorOpen ? (
        <QuickConnectModelSelector
          open={isQuickConnectSeriesSelectorOpen}
          series={String(data.seriesName || data.seriesId || data.productCode || "").toUpperCase()}
          rows={quickConnectSeriesRows}
          value={quickConnectSeriesModelSelection}
          locale={configuratorLocale}
          onClose={() => setIsQuickConnectSeriesSelectorOpen(false)}
          onConfirm={confirmQuickConnectSeriesModel}
        />
      ) : null}


<SitePageShell
      breadcrumbAriaLabel={copy.breadcrumb}
      breadcrumbItems={productBreadcrumbItems}
    >
      <main
        className={`${styles.page}${isAssemblyCustomerCategoryPage ? ` ${assemblyHeadingStyles.page}` : ""}`}
        data-product-detail-page="true"
        data-assembly-heading-scope={isAssemblyCustomerCategoryPage || undefined}
        data-authored-piston-detail={hasAuthoredPistonCopy ? "true" : undefined}
      >
      <div className={styles.container}>

        <section className={styles.productTop}>
          <div data-product-gallery="true" className={styles.gallery} aria-label={copy.gallery}>
            {luerPairConfig ? <div className={luerAssemblyStyles.switch} role="group" aria-label="产品预览方式">
              <button type="button" aria-pressed={showLuerAssembly} onClick={() => setShowLuerAssembly(true)}>{luerPairConfig.unifiedSelection && luerPairSelection?.mode === "single" ? luerPairConfig.baseRole === "core" ? "芯子预览" : "单件预览" : "组合预览"}</button>
              <button type="button" aria-pressed={!showLuerAssembly} onClick={() => setShowLuerAssembly(false)}>产品图片</button>
            </div> : null}
            <div data-product-main-stage="true"
              className={[
                styles.mainImage,
                isZooming && !(isLuerPairingEnabled && showLuerAssembly) ? styles.isZooming : "",
              ]
                .filter(Boolean)
                .join(" ")}
              style={zoomStyle}
              onMouseEnter={() => setIsZooming(true)}
              onMouseLeave={() => setIsZooming(false)}
              onMouseMove={handleMainImageMove}
            >
              {luerPairConfig && showLuerAssembly ? <LuerAssemblyPreview locale={configuratorLocale} parts={luerSelectedParts} hero imageOnly assembleCore singleImage={luerPairSelection?.mode === "single"} /> : activeRealImage ? (
                <img data-product-main-image="true"
                  src={activeRealImage}
                  alt={getProductImageAlt(activeThumb)}
                />
              ) : (
                <svg
                  className={styles.pumpSvg}
                  viewBox="0 0 520 310"
                  aria-hidden="true"
                >
                  <g transform="translate(34, 84)">
                    <rect
                      x="0"
                      y="52"
                      width="54"
                      height="20"
                      fill="#ffffff"
                      stroke="#d7dee8"
                      strokeWidth="2"
                    />
                    <rect
                      x="54"
                      y="33"
                      width="72"
                      height="58"
                      fill="#ffffff"
                      stroke="#d7dee8"
                      strokeWidth="2"
                    />
                    <rect
                      x="126"
                      y="16"
                      width="72"
                      height="92"
                      fill="#eef2f7"
                      stroke="#d7dee8"
                      strokeWidth="2"
                    />
                    <rect
                      x="198"
                      y="24"
                      width="62"
                      height="76"
                      fill="#ffffff"
                      stroke="#d7dee8"
                      strokeWidth="2"
                    />
                    <path
                      d="M260 24 L320 24 L342 48 L342 76 L320 100 L260 100 Z"
                      fill="#173368"
                    />
                    <rect
                      x="342"
                      y="38"
                      width="78"
                      height="48"
                      fill="#ffffff"
                      stroke="#d7dee8"
                      strokeWidth="2"
                    />
                    <rect
                      x="420"
                      y="52"
                      width="48"
                      height="20"
                      fill="#ffffff"
                      stroke="#d7dee8"
                      strokeWidth="2"
                    />
                    <rect
                      x="80"
                      y="38"
                      width="9"
                      height="48"
                      fill="#173368"
                    />
                    <rect
                      x="94"
                      y="38"
                      width="9"
                      height="48"
                      fill="#173368"
                    />
                    <line
                      x1="202"
                      y1="24"
                      x2="236"
                      y2="100"
                      stroke="#d7dee8"
                      strokeWidth="4"
                    />
                    <line
                      x1="214"
                      y1="24"
                      x2="248"
                      y2="100"
                      stroke="#d7dee8"
                      strokeWidth="4"
                    />
                  </g>
                </svg>
              )}
            </div>

            {showThumbnailRow ? (
              <div
                data-product-thumb-row="true"
                className={styles.thumbRow}
                aria-label={copy.thumbnails}
              >
                <button
                  className={styles.thumbArrow}
                  type="button"
                  aria-label={copy.previous}
                  onClick={handlePreviousThumb}
                >
                  ‹
                </button>

                <div ref={thumbViewportRef} className={styles.thumbViewport}>
                  {hasRealImages ? (
                    realImages.map((image, index) => (
                      <button
                        key={`${image}-${index}`}
                        data-product-thumb-index={index}
                        className={[
                          styles.thumb,
                          activeThumb === index && !(isLuerPairingEnabled && showLuerAssembly) ? styles.isActive : "",
                        ]
                          .filter(Boolean)
                          .join(" ")}
                        type="button"
                        aria-label={getProductImageAlt(index)}
                        onClick={() => { setActiveThumb(index); if (isLuerPairingEnabled) setShowLuerAssembly(false); }}
                      >
                        <img src={image} alt={getProductImageAlt(index)} />
                      </button>
                    ))
                  ) : (
                    <>
                      <button
                        data-product-thumb-index={0}
                        className={[
                          styles.thumb,
                          activeThumb === 0 ? styles.isActive : "",
                        ]
                          .filter(Boolean)
                          .join(" ")}
                        type="button"
                        aria-label={copy.frontView}
                        onClick={() => setActiveThumb(0)}
                      >
                      <svg viewBox="0 0 120 70" aria-hidden="true">
                        <rect
                          x="18"
                          y="28"
                          width="84"
                          height="16"
                          fill="#ffffff"
                          stroke="#d7dee8"
                          strokeWidth="2"
                        />
                        <path
                          d="M72 20 L94 20 L104 30 L104 40 L94 50 L72 50 Z"
                          fill="#173368"
                        />
                      </svg>
                      </button>

                      <button
                        data-product-thumb-index={1}
                        className={[
                          styles.thumb,
                          activeThumb === 1 ? styles.isActive : "",
                        ]
                          .filter(Boolean)
                          .join(" ")}
                        type="button"
                        aria-label={copy.sideView}
                        onClick={() => setActiveThumb(1)}
                      >
                      <svg viewBox="0 0 120 70" aria-hidden="true">
                        <rect
                          x="26"
                          y="19"
                          width="54"
                          height="32"
                          fill="#ffffff"
                          stroke="#d7dee8"
                          strokeWidth="2"
                        />
                        <rect
                          x="80"
                          y="15"
                          width="18"
                          height="40"
                          fill="#173368"
                        />
                      </svg>
                      </button>

                      <button
                        data-product-thumb-index={2}
                        className={[
                          styles.thumb,
                          activeThumb === 2 ? styles.isActive : "",
                        ]
                          .filter(Boolean)
                          .join(" ")}
                        type="button"
                        aria-label={copy.portDetail}
                        onClick={() => setActiveThumb(2)}
                      >
                      <svg viewBox="0 0 120 70" aria-hidden="true">
                        <circle
                          cx="60"
                          cy="35"
                          r="22"
                          fill="#ffffff"
                          stroke="#d7dee8"
                          strokeWidth="2"
                        />
                        <circle
                          cx="60"
                          cy="35"
                          r="7"
                          fill="#173368"
                        />
                      </svg>
                      </button>
                    </>
                  )}
                </div>

                <button
                  className={styles.thumbArrow}
                  type="button"
                  aria-label={copy.next}
                  onClick={handleNextThumb}
                >
                  ›
                </button>
              </div>
            ) : null}
          </div>

          <div className={styles.productInfo}>
            <div className={styles.titleGroup}>
              <h1 className={styles.productModelTitle}>
                {formatProductHeading(controlDetailH1 || tubingDetailH1 || (inheritedDetailH1 ? `${data.solenoidAuthoredContent ? "" : "FOREACH "}${inheritedDetailH1.replace(/^FOREACH\s+/i, "")}` : displayProductTitle))}
              </h1>
            </div>


            {diaphragmCopy?.introductionParagraphs ? (
              <div className={`${styles.productDesc} ${styles.productDescParagraphs}`} data-diaphragm-description="true">
                {diaphragmCopy.introductionParagraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
              </div>
            ) : Array.isArray(data.abdIntroductionParagraphs) ? (
              <div className={`${styles.productDesc} ${styles.productDescParagraphs}`} data-abd-description="true">
                {data.abdIntroductionParagraphs.map((paragraph: string) => <p key={paragraph}>{paragraph}</p>)}
              </div>
            ) : reviewedIntroductionEn ? (
              <div className={`${styles.productDesc} ${styles.productDescParagraphs}`} data-reviewed-introduction="en">
                {reviewedIntroductionEn.paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
              </div>
            ) : Array.isArray(data.pdm5IntroductionParagraphs) ? (
              <div className={`${styles.productDesc} ${styles.productDescParagraphs}`} data-pdm5-description="true">
                {data.pdm5IntroductionParagraphs.map((paragraph: string) => <p key={paragraph}>{paragraph}</p>)}
              </div>
            ) : configuratorLocale === "zh" && Array.isArray(data.quickConnectIntroductionParagraphsZh) ? (
              <div className={`${styles.productDesc} ${styles.productDescParagraphs}`} data-quick-connect-description="true">
                {data.quickConnectIntroductionParagraphsZh.map((paragraph: string) => <p key={paragraph}>{paragraph}</p>)}
              </div>
            ) : configuratorLocale === "en" && Array.isArray(data.quickConnectIntroductionParagraphsEn) ? (
              <div className={`${styles.productDesc} ${styles.productDescParagraphs}`} data-quick-connect-description="true">
                {data.quickConnectIntroductionParagraphsEn.map((paragraph: string) => <p key={paragraph}>{paragraph}</p>)}
              </div>
            ) : Array.isArray(data.tubingIntroductionParagraphs) ? (
              <div className={`${styles.productDesc} ${styles.productDescParagraphs}`} data-tubing-description="true">
                {data.tubingIntroductionParagraphs.map((paragraph: string, index: number) => <p key={index}>{paragraph}</p>)}
              </div>
            ) : Array.isArray(data.pipettingIntroductionParagraphs) ? (
              <div className={`${styles.productDesc} ${styles.productDescParagraphs}`} data-pipetting-description="true">
                {data.pipettingIntroductionParagraphs.map((paragraph: string, index: number) => <p key={index}>{paragraph}</p>)}
              </div>
            ) : Array.isArray(data.valvelessIntroductionParagraphs) ? (
              <div className={`${styles.productDesc} ${styles.productDescParagraphs}`} data-valveless-description="true" data-valveless-model={data.slug}>
                {data.valvelessIntroductionParagraphs.map((paragraph: string, index: number) => <p key={index}>{paragraph}</p>)}
              </div>
            ) : Array.isArray(data.valveIntroductionParagraphs) ? (
              <div className={`${styles.productDesc} ${styles.productDescParagraphs}`} data-solenoid-description="true">
                {data.valveIntroductionParagraphs.map((paragraph: string, index: number) => <p key={index}>{paragraph}</p>)}
              </div>
            ) : Array.isArray(data.mrv3IntroductionParagraphs) ? (
              <div className={`${styles.productDesc} ${styles.productDescParagraphs}`} data-mrv3-description="true">
                {data.mrv3IntroductionParagraphs.map((paragraph: string, index: number) => <p key={index}>{paragraph}</p>)}
              </div>
            ) : Array.isArray(data.syringeIntroductionParagraphs) ? (
              <div className={`${styles.productDesc} ${styles.productDescParagraphs}`} data-syringe-description="true">
                {data.syringeIntroductionParagraphs.map((paragraph: string, index: number) => <p key={index}>{paragraph}</p>)}
              </div>
            ) : useAuthoredPistonCopy ? (
              <div className={`${styles.productDesc} ${styles.productDescParagraphs}`} data-ea-description="true">
                {data.advantages.map((paragraph: string, index: number) => (
                  <p key={`${index}-${paragraph}`}>{paragraph}</p>
                ))}
              </div>
            ) : (
              <p className={styles.productDesc}>
                {(data as any).description || (Array.isArray(data.advantages) ? data.advantages.join("") : "")}
                {luerPairConfig?.allowCoreAssembly && luerPairConfig.baseRole === "core" ? `搭配 LPT 锁圈，可组成${luerPairConfig.base.family === "LRL" ? "旋转" : "固定"}锁圈公鲁尔接头。` : null}
              </p>
            )}

            {!(data.solenoidAuthoredContent && configuratorLocale === "zh") && (
              <div className={styles.application}>
                <p className={styles.applicationTitle} data-assembly-page-heading={isAssemblyCustomerCategoryPage || undefined}>
                  {(isEnglish || data.solenoidAuthoredContent) && data.applicationAreas?.length
                    ? data.applicationAreasTitle || "Application Areas:"
                    : isLocalizedDetail
                    ? copy.applications
                    : getDbSectionTitle("applications", copy.applications)}
                </p>
                <p className={styles.applicationText}>
                  {(isEnglish || data.solenoidAuthoredContent) && data.applicationAreas?.length
                    ? data.applicationAreas.map((area, index) => (
                        <span key={area.href}>
                          {index > 0 ? ", " : null}
                          <a className={styles.applicationAreaLink} href={area.href}>
                            {area.label}
                          </a>
                        </span>
                      ))
                    : data.commonApplications.join(isLocalizedDetail ? ", " : "、")}
                </p>
              </div>
            )}

            <div id="product-detail-actions" data-configuration-layout={usesCompactConfigurationLayout || undefined} className={styles.operationArea}>
              {!isEaInquiryEnabled && !isDetailModelConfiguratorEnabled && !isTubingConfiguratorEnabled && !isAssemblyCustomerCategoryPage && !isAdditionalConfigurationWorkspace && (hasResourceDownloads || isCadRequestAvailable || isProbeCustomerCategoryPage) ? <div className={`${styles.selectionWorkspaceHeading} ${selectionWorkspaceStyles.workspaceHeading}`}>
                <div><h3>{workspacePresentation.title}</h3><p>{workspacePresentation.description}</p></div>
              </div> : null}
              {!isDetailModelConfiguratorEnabled && !isEaInquiryEnabled && !isTubingConfiguratorEnabled && !isAssemblyCustomerCategoryPage && !isProbeCustomerCategoryPage && !isAdditionalConfigurationWorkspace ? <div
                data-product-model-row="true"
                data-concrete-model={hasConcreteDisplayModel ? "true" : undefined}
                className={styles.modelLine}
              >
                <div className={styles.modelCodeWrap}>
                  <div className={styles.modelCodeText}>
                    {isDetailModelConfiguratorEnabled ? (
                      <>
                        <span className={styles.modelLabel}>{copy.model}</span>
                        <span className={styles.modelCode}>
                          {selectedDetailVariant?.model || detailModelConfigurator?.emptySelectionText}
                        </span>
                      </>
                    ) : isCustomProduct ? (
                      <>
                        <span className={styles.modelLabel}>{copy.model}</span>
                        <span className={styles.modelCode}>
                          {data.smtp2Variant ? data.productCode : customProductCopy.notice}
                        </span>
                      </>
                    ) : (
                      <>
                        <span className={styles.modelLabel}>{copy.model}{hardTubeAccessoryConfig && configuratorLocale !== "zh" ? "\u00a0" : ""}</span>
                        <span
                          className={
                            styles.modelCode
                          }
                        >
                          {hardTubeAccessoryConfig ? hardTubeAccessoryConfig.model : isTubingConfiguratorEnabled
                            ? selectedTubingVariant
                                ?.model ||
                              getDisplayModelText(
                                data
                              )
                            : getDisplayModelText(
                                data
                              )}
                        </span>
                      </>
                    )}
                  </div>
                  <button
                    className={`${styles.button}${useSharedQuickConnectSelector ? ` ${styles.selectionPrimary}` : ""}`}
                    type="button"
                    onClick={() => {
                      if (isEaInquiryEnabled) { openEaInquiryEditor(); return; }
                      if (isAssemblyConfigurator) { setFlangedNeedDrawing(false); setIsFlangedTubingOpen(true); return; }
                      if (standaloneFittingType) { setIsStandaloneFittingSelectorOpen(true); return; }
                      if (isLuerPairingEnabled) { openLuerPairSelector(); return; }
                      if (isHardTubeConfiguratorEnabled) {
                        setIsHardTubeConfiguratorOpen(true);
                        return;
                      }
                      if (isQuickConnectSeriesDetail) {
                        openQuickConnectSeriesSelector();
                        return;
                      }
                      if (isQuickConnectPairingEnabled) {
                        setIsQuickConnectPairConfiguratorOpen(true);
                        return;
                      }
                      if (detailModelConfigurator) {
                        setOpenDetailModelConfiguratorId(detailModelConfigurator.id);
                        return;
                      }
                      if (isTubingAssembly) {
                        trackBeginInquiry({
                          formId: "tubing_assembly_custom_request_form",
                          formType: "customization_request",
                          sourceSection: "product_detail",
                          locale: analyticsLocale,
                          productId: analyticsProductId,
                          productCategory: analyticsProductCategory,
                        });
                        setIsAssemblyCustomRequestOpen(true);
                        return;
                      }
                      if (isCustomProduct || (data.mrv3AuthoredContent || data.solenoidAuthoredContent)) {
                        trackContactClick({
                          contactChannel: "contact_form",
                          sourceSection: "product_detail",
                          locale: analyticsLocale,
                          productId: analyticsProductId,
                        });
                        trackBeginInquiry({
                          formId: "contact_inquiry_form",
                          formType: "product_inquiry",
                          sourceSection: "product_detail",
                          locale: analyticsLocale,
                          productId: analyticsProductId,
                          productCategory: analyticsProductCategory,
                        });
                        window.location.href = localizedContactHref;
                        return;
                      }

                      if (isTubingConfiguratorEnabled) { setIsTubingEditorOpen(true); return; }












                      const href = localizeInternalHref(
                        getModelActionHref(data),
                        localePrefix,
                      );

                      if (isCustomInquiryMode(data)) {
                        trackContactClick({
                          contactChannel: "contact_form",
                          sourceSection: "product_detail",
                          locale: analyticsLocale,
                          productId: analyticsProductId,
                        });
                        trackBeginInquiry({
                          formId: "contact_inquiry_form",
                          formType: "product_inquiry",
                          sourceSection: "product_detail",
                          locale: analyticsLocale,
                          productId: analyticsProductId,
                          productCategory: analyticsProductCategory,
                        });
                        window.location.href = href;
                        return;
                      }

                      window.open(href, "_blank", "noopener,noreferrer");
                    }}
                  >
                    {isEaInquiryEnabled ? eaInquiryConfiguration ? "修改基础选型" : "基础选型" : isAssemblyConfigurator ? assemblyText("管组件定制", configuratorLocale) : (String(sourceData.category) === "fittings" || sourceData.categoryId === "fittings") &&
                      !isCustomProduct && !isCustomInquiryMode(data)
                      ? "搭配选型"
                      : isLuerPairingEnabled
                      ? luerPairSelection ? "重新组合选型" : "组合选型"
                      : isHardTubeConfiguratorEnabled
                      ? hardTubeAccessoryChoice !== null ? hardTubeCopy.reselect : hardTubeCopy.configure
                      : isQuickConnectSeriesDetail
                      ? (configuratorLocale === "zh" ? "点击型号选择" : "Select a model")
                      : isQuickConnectPairingEnabled
                      ? quickConnectPairConfig?.showModelGuidance
                        ? `配合${quickConnectPairConfig.baseGender === "P" ? "母" : "公"}端选型`
                        : quickConnectPairOption
                        ? "重新选择配套接头"
                        : "选择配套接头"
                      : singleDetailVariant
                      ? getSolenoidViewConfigurationText(configuratorLocale)
                      : isDetailModelConfiguratorEnabled
                      ? selectedDetailVariant ? copy.reselect : copy.selectModel
                      : isTubingAssembly
                      ? data.tubingCustomizationCopy?.title ?? (isEnglish ? "Customization Request" : "定制申请")
                      : isCustomProduct || (data.mrv3AuthoredContent || data.solenoidAuthoredContent)
                      ? customProductCopy.contact
                      : isTubingConfiguratorEnabled &&
                          selectedTubingVariant
                        ? copy.reselect
                        : isTargetLanguage
                          ? copy.selectModel
                          : getModelActionText(data)}
                  </button>
                </div>

                {data.showConfigurator && !isCustomProduct ? (
                  <button
                    className={styles.button}
                    type="button"
                    onClick={handleOpenConfigurator}
                  >
                    {copy.configurator}
                  </button>
                ) : null}
              </div> : null}

              {isAdditionalConfigurationWorkspace ? <DetailSelectionWorkspace
                key={sourceData.slug} locale={configuratorLocale} title={workspacePresentation.title}
                configurations={workspaceConfigurations} fixed={isFixedConfigurationWorkspace}
                helperText={isDefaultInquiryEnabled ? defaultInquiryCopy.helper
                  : !additionalConfigurations.length || isFixedConfigurationWorkspace ? workspacePresentation.description : undefined}
                defaultSelection={isDefaultInquiryEnabled ? { label: defaultInquiryCopy.defaultLabel, configuration: defaultInquiryConfiguration,
                  added: Boolean(defaultInquiryCartItem), onToggle: toggleDefaultInquirySelection, cancelLabel: defaultInquiryCopy.cancel,
                  touchHelperText: defaultInquiryCopy.touchHelper } : undefined}
                onSelect={selectFittingConfiguration}
                onNew={isInquiryResourceWorkspace ? () => {
                  trackContactClick({ contactChannel: "contact_form", sourceSection: "product_detail", locale: analyticsLocale, productId: analyticsProductId });
                  trackBeginInquiry({ formId: "contact_inquiry_form", formType: "product_inquiry", sourceSection: "product_detail",
                    locale: analyticsLocale, productId: analyticsProductId, productCategory: analyticsProductCategory });
                  window.location.href = localizedContactHref;
                }
                  : isFittingCombinationWorkspace || standaloneFittingType ? () => openAdditionalConfiguration() : undefined}
                newLabel={isInquiryResourceWorkspace ? customProductCopy.contact : isFixedConfigurationWorkspace ? workspaceCopy.chooseModel : workspaceCopy.add}
                onEdit={isFittingCombinationWorkspace || standaloneFittingType ? id => openAdditionalConfiguration(id) : undefined}
                onDelete={isFittingCombinationWorkspace ? deleteFittingConfiguration : undefined}
                isAdded={isAdditionalConfigurationAdded} onAdd={id => addAdditionalConfiguration(id)}
                onDrawing={data.showDrawingRequest ? id => addAdditionalConfiguration(id, true) : undefined} drawingLabel={copy.drawing}
              /> : null}
              {detailModelConfigurator ? <ProductConfigurationWorkspace
                key={`${detailModelConfigurator.id}:${detailConfigurationRevision}`}
                locale={configuratorLocale} config={detailModelConfigurator}
                canRequestCad={isCadRequestAvailable}
                drawingTypes={detailConfigurations.drawingTypes}
                savedIds={detailConfigurations.variantIds} activeId={detailConfigurations.activeId}
                onSelect={id => { updateDetailConfigurations(current => ({ ...current, activeId: id })); setEditingDetailVariantId(null); setNewDetailConfiguration(false); }}
                onNew={() => { setEditingDetailVariantId(null); setNewDetailConfiguration(true); setOpenDetailModelConfiguratorId(detailModelConfigurator.id); }}
                onEdit={variant => { setNewDetailConfiguration(false); setEditingDetailVariantId(variant.id); setOpenDetailModelConfiguratorId(detailModelConfigurator.id); }}
                onDelete={id => { updateDetailConfigurations(current => removeDetailConfiguration(current, id)); setEditingDetailVariantId(null); }}
                isAdded={variant => Boolean(getItem(detailCartSourceType, variant.productCode))}
                onDrawing={data.showDrawingRequest ? variant => {
                  const existing = getItem(detailCartSourceType, variant.productCode);
                  if (existing) toggleDrawingNeed(existing.id, true);
                  else addItem(createDetailCartItem(true, variant));
                } : undefined}
                drawingLabel={copy.drawing}
                onAdd={variant => {
                  handleToggleDetailVariant(variant, detailConfigurations.drawingTypes?.[variant.id]);
                  openCart();
                }}
              /> : null}
              {tubingConfigurator ? <TubingConfigurationWorkspace
                key={sourceData.slug} config={tubingConfigurator}
                material={String(sourceData.slug).replace(/-tubing$/, "").toUpperCase()} locale={configuratorLocale}
                collection={tubingConfigurations} onChange={updateTubingConfigurations}
                open={isTubingEditorOpen} onOpen={() => setIsTubingEditorOpen(true)} onClose={() => setIsTubingEditorOpen(false)}
                isAdded={variant => Boolean(getItem("tubing-selection", variant.productCode))}
                onAdd={variant => {
                  if (getItem("tubing-selection", variant.productCode)) { openCart(); return; }
                  const item = createDetailCartItem(false, variant);
                  if (item.productCode && item.foreachModel) addItem(item);
                }}
              /> : null}
              {showEaInquiryWorkspace ? <EaPumpInquirySummary
                locale={configuratorLocale}
                series={pistonInquiryProduct!.series}
                configuration={eaInquiryConfiguration} quantity={currentDetailCartItem?.quantity || eaInquiryQuantity}
                showDrawing={Boolean(data.showDrawingRequest)} drawingSelected={isDetailDrawingSelected} addedToList={isDetailProductSelected}
                onEdit={() => openEaInquiryEditor()}
                onDrawing={handleAddDrawing} onAdd={handleAddList}
                savedConfigurations={eaConfigurations.configurations}
                expandedId={eaPreviewConfigurationId ?? eaExpandedConfigurationId}
                pinnedId={eaExpandedConfigurationId} onSelect={selectEaConfiguration}
                onRequestCad={isCadRequestAvailable ? handleRequestCad : undefined}
                onPreview={setEaPreviewConfigurationId}
                onCollapse={() => { setEaPreviewConfigurationId(null); setEaExpandedConfigurationId(null); }}
                onNew={() => openEaInquiryEditor(true)} onDelete={deleteEaConfiguration}
              /> : null}
              {isAssemblyConfigurator ? <FlangedTubingWorkspace locale={configuratorLocale} compact={isAssemblyCustomerCategoryPage} entrySlug={sourceData.slug} open={isFlangedTubingOpen} requestDrawing={flangedNeedDrawing}
                onClose={() => setIsFlangedTubingOpen(false)} onChoiceChange={setFlangedTubingChoice} onAdd={addFlangedTubingChoice} /> : null}
              {(hasResourceDownloads || (hasStandaloneProductActions && (!showEaInquiryWorkspace || (isCadRequestAvailable && resourceCopy)))) ? <ProductDetailActions>
                {hasStandaloneProductActions && data.showDrawingRequest && !showEaInquiryWorkspace && !isDetailModelConfiguratorEnabled && !isProbeCustomerCategoryPage && !isAdditionalConfigurationWorkspace ? (
                  <ProductDetailActionButton
                    disabled={isDetailVariantRequired}
                    aria-pressed={isDetailDrawingSelected}
                    onClick={handleAddDrawing}
                  >
                    {isDetailDrawingSelected ? rplP4Copy?.drawingAdded || copy.drawingAdded : rplP4Copy?.drawing || copy.drawing}
                  </ProductDetailActionButton>
                ) : null}

                {hasStandaloneProductActions && isCadRequestAvailable && resourceCopy && !isProbeCustomerCategoryPage ? (
                  <ProductDetailActionButton
                    aria-haspopup="dialog"
                    onClick={() => handleRequestCad()}
                  >
                    {resourceCopy.requestCad}
                  </ProductDetailActionButton>
                ) : null}

                {hasResourceDownloads ? (
                  <ProductResourceDownloads datasheet={actionDatasheet} locale={configuratorLocale} />
                ) : null}

                {hasStandaloneProductActions && !showEaInquiryWorkspace && !isDetailModelConfiguratorEnabled && !isAdditionalConfigurationWorkspace ? <ProductDetailActionButton
                  disabled={isDetailVariantRequired || ((isDetailModelConfiguratorEnabled || isHardTubeConfiguratorEnabled || isLuerPairingEnabled) && isDetailProductSelected)}
                  aria-pressed={isDetailProductSelected}
                  onClick={handleAddList}
                >
                  {isDetailProductSelected ? copy.addedToList : isLuerPairingEnabled && luerSelectedParts && luerSelectedParts.length > 1 ? "加入组合清单" : copy.addToList}
                </ProductDetailActionButton> : null}
                {hasStandaloneProductActions && isProbeCustomerCategoryPage ? <ProductDetailActionButton
                  aria-haspopup="dialog"
                  aria-expanded={isProbeCustomInquiryOpen}
                  onClick={handleProbeCustomInquiry}
                >
                  {probeText("来图定制", configuratorLocale)}
                </ProductDetailActionButton> : null}
              </ProductDetailActions> : null}
            </div>
          </div>
        </section>

        <section
          id="product-detail-resources"
          className={styles.detailSection}
        >
          {hasCustomerCategoryNavigation ? (
            <nav
              className={styles.customerCategoryNav}
              lang={configuratorLocale}
              aria-label={isTubingCustomerCategoryPage ? tubingText("产品内容分类", configuratorLocale) : isProbeCustomerCategoryPage ? probeText("产品内容分类", configuratorLocale) : isDiaphragmPumpCustomerCategoryPage ? diaphragmGuideCopy.navigation : isPistonPumpCustomerCategoryPage ? pistonText("产品内容分类", configuratorLocale) : isAssemblyCustomerCategoryPage ? assemblyText("产品内容分类", configuratorLocale) : "产品内容分类"}
            >
              {([
                ["product", "产品资料"],
                ["selection", "选型与使用"],
                ["delivery", "交付与售后"],
              ] as Array<[CustomerCategoryKey, string]>).filter(([key]) => key !== "selection" || isCustomerCategoryPage).map(([key, label]) => (
                <button
                  key={key}
                  className={[
                    styles.customerCategoryButton,
                    activeCustomerCategory === key ? styles.isActive : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  type="button"
                  aria-pressed={activeCustomerCategory === key}
                  onClick={() => setActiveCustomerCategory(key)}
                >
                  {isTubingCustomerCategoryPage ? tubingText(label, configuratorLocale) : isProbeCustomerCategoryPage ? probeText(label, configuratorLocale) : isDiaphragmPumpCustomerCategoryPage ? diaphragmGuideCopy.nav[key === "product" ? 0 : key === "selection" ? 1 : 2] : isPistonPumpCustomerCategoryPage ? pistonText(label, configuratorLocale) : isAssemblyCustomerCategoryPage ? assemblyText(label, configuratorLocale) : label}
                </button>
              ))}
            </nav>
          ) : null}
          {showProductResourceTabs && !showFlatProductResources ? (
          <nav
            className={styles.tabNav}
            aria-label={copy.tabs}
            data-has-datasheet-tab={hasDatasheetTab ? "true" : undefined}
            data-has-applications-tab={
              hasApplicationDetails ? "true" : undefined
            }
            style={
              {
                "--product-detail-tab-count": productDetailTabCount,
              } as ProductTabNavStyle
            }
          >
            <button
              className={[
                styles.tabButton,
                activeTab === "spec" ? styles.isActive : "",
              ]
                .filter(Boolean)
                .join(" ")}
              type="button"
              aria-label={copy.specifications}
              onClick={() => handleProductTabChange("spec")}
            >
              <ProductTabLabel
                fullLabel={copy.specifications}
                shortLabel={mobileTabLabels.spec}
              />
            </button>

            {applicationDetails ? (
              <button
                className={[
                  styles.tabButton,
                  activeTab === "applications" ? styles.isActive : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                type="button"
                aria-label={applicationDetails.tabLabel}
                onClick={() => handleProductTabChange("applications")}
              >
                <ProductTabLabel
                  fullLabel={applicationDetails.tabLabel}
                  shortLabel={mobileTabLabels.applications}
                />
              </button>
            ) : null}

            {!isQuickConnectFitting || quickConnectCadAssets ? (
            <button
              className={[
                styles.tabButton,
                activeTab === "model3d" ? styles.isActive : "",
              ]
                .filter(Boolean)
                .join(" ")}
              type="button"
              data-analytics-resource-action="view"
              data-analytics-resource-id={`${analyticsProductId}:model3d`}
              data-analytics-resource-type="3d_model"
              data-analytics-resource-file-type={
                model3dUrl.split(/[?#]/)[0].split(".").at(-1) || "unknown"
              }
              data-analytics-section="product_detail_tabs"
              data-analytics-skip="true"
              aria-label={copy.model3d}
              onClick={() => handleProductTabChange("model3d")}
            >
              <ProductTabLabel
                fullLabel={copy.model3d}
                shortLabel={mobileTabLabels.model3d}
              />
            </button>
            ) : null}

            <button
              className={[
                styles.tabButton,
                activeTab === "drawing" || (showFlatProductResources && isQuickConnectFitting) ? styles.isActive : "",
              ]
                .filter(Boolean)
                .join(" ")}
              type="button"
              aria-label={copy.technicalDrawing}
              onClick={() => handleProductTabChange("drawing")}
            >
              <ProductTabLabel
                fullLabel={copy.technicalDrawing}
                shortLabel={mobileTabLabels.drawing}
              />
            </button>

            {hasDatasheetTab && resourceCopy ? (
              <button
                className={[
                  styles.tabButton,
                  activeTab === "datasheet" ? styles.isActive : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                type="button"
                aria-label={resourceCopy.datasheetTab}
                onClick={() => handleProductTabChange("datasheet")}
              >
                <ProductTabLabel
                  fullLabel={resourceCopy.datasheetTab}
                  shortLabel={mobileTabLabels.datasheet}
                />
              </button>
            ) : null}
          </nav>
          ) : null}

          <div
            className={[
              styles.panelWrap,
              showFlatProductResources ? styles.productResourcePanelsFlat : "",
              !showProductResourceTabs
                ? styles.customerCategoryPanelHidden
                : "",
            ]
              .filter(Boolean)
              .join(" ")}
          >
            <div
              className={[
                styles.panel,
                activeTab === "spec" ? styles.isActive : "",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              <div
                className={[
                  styles.panelBox,
                  styles.specPanelClean,
                ].join(" ")}
              >
                {isTubingAssembly && data.tubingAssemblySizeTable && !isAssemblyCustomerCategoryPage ? (
                  <h2 className={tubingAssemblySpecStyles.sectionTitle}>{data.tubingAssemblyUi?.parameters ?? "组件参数"}</h2>
                ) : null}
                {isTubingCustomerCategoryPage && !customerCategoryContent?.product ? (
                  <h2 className={styles.flatPanelTitle}>{tubingText("材料参数", configuratorLocale)}</h2>
                ) : null}
                {isTubingCustomerCategoryPage && customerCategoryContent?.product ? customerCategoryContent.product
                  : probeGuide ? <ProbeProductContent guide={probeGuide} specs={data.specs} locale={configuratorLocale} /> : <table className={styles.specTable}>
                  <tbody>
                    {data.specs.map((item) => (
                      <tr data-product-spec-row="true" key={`${item.label}-${item.value}`}>
                        <th>
                          <span className={styles.specCellText}>
                            {item.label}
                          </span>
                        </th>
                        <td>
                          <span className={styles.specCellText}>
                            {item.value}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>}
                {isPistonPumpCustomerCategoryPage ? customerCategoryContent?.product : null}
                {isDiaphragmPumpCustomerCategoryPage ? customerCategoryContent?.product : null}
                {isTubingAssembly && data.tubingAssemblySizeTable ? (
                  <TubingAssemblySizeTable data={data.tubingAssemblySizeTable} copy={data.tubingAssemblyUi} />
                ) : null}
                {isAssemblyCustomerCategoryPage ? customerCategoryContent?.product : null}
                {rplP4Copy?.specNotes.map((note: string) => (
                  <p key={note} className={styles.rplP4SpecNote} data-product-spec-note="true">{note}</p>
                ))}
                {configuratorLocale === "zh" && isValvelessPumpDetailData(data) && data.valvelessFlowNote ? (
                  <p className={styles.rplP4SpecNote} data-product-flow-note="true">{data.valvelessFlowNote}</p>
                ) : null}
              </div>
            </div>

            {applicationDetails && !isTubingCustomerCategoryPage && !isAssemblyCustomerCategoryPage && !isPistonPumpCustomerCategoryPage && !isDiaphragmPumpCustomerCategoryPage ? (
              <div
                className={[
                  styles.panel,
                  activeTab === "applications" ? styles.isActive : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                {showFlatProductResources ? (
                  <h3 className={styles.flatPanelTitle}>{applicationDetails.tabLabel}</h3>
                ) : null}
                <ProductApplicationsPanel content={applicationDetails} />
              </div>
            ) : null}

            {!isTubingCustomerCategoryPage && !isAssemblyCustomerCategoryPage && !isProbeCustomerCategoryPage ? (
            <div className={styles.modelDrawingGroup}>
            {useSharedFittingResources || isPistonPumpCustomerCategoryPage || (isDiaphragmPumpCustomerCategoryPage && diaphragmCadAssets) ? (
              <FittingResourceViewer locale={configuratorLocale} key={`${configuratorLocale}:${data.slug}`}
                drawings={isPistonPumpCustomerCategoryPage || isDiaphragmPumpCustomerCategoryPage ? [{
                  role: "pump", label: isDiaphragmPumpCustomerCategoryPage ? diaphragmGuideCopy.drawing : "柱塞泵图纸", model: String(sourceData.displayModel || data.slug), url: drawingPreviewUrl,
                }] : fittingResourceDrawings}
                drawingPreview={(isPistonPumpCustomerCategoryPage || isDiaphragmPumpCustomerCategoryPage) && drawingPreviewUrl ? (
                  <MobilePdfCanvasViewer pdfUrl={drawingPreviewUrl} documentTitle={String(sourceData.displayModel || data.slug)} />
                ) : undefined}
                modelSource={isPistonPumpCustomerCategoryPage && pistonCadAssets ? {
                  kind: "cad", props: {
                    modelId: pistonCadAssets.viewerId,
                    title: String(sourceData.displayModel || data.slug),
                    drawingUrl: drawingPreviewUrl || undefined,
                    headMaterial: pistonCadAssets.headMaterial,
                    locale: configuratorLocale,
                  },
                } : isDiaphragmPumpCustomerCategoryPage && diaphragmCadAssets ? {
                  kind: "cad", props: {
                    modelId: diaphragmCadAssets.viewerId,
                    title: diaphragmCadAssets.model,
                    drawingUrl: drawingPreviewUrl || undefined,
                    locale: configuratorLocale,
                  },
                } : fittingResourceModel} active={showProductResourceTabs} />
            ) : (<>
            {!isQuickConnectFitting || quickConnectCadAssets ? (
            <div
              className={[
                styles.panel,
                activeTab === "model3d" ? styles.isActive : "",
                showFlatProductResources ? styles.isActive : "",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              {!showFlatProductResources ? (
                <h3 className={styles.flatPanelTitle}>{copy.model3d}</h3>
              ) : null}
            <div
                  className={[styles.panelBox, showModelPreview ? styles.modelPreviewGate : ""].filter(Boolean).join(" ")}
                  data-product-model3d-panel="true"
                >
                {showModelPreview ? (
                  <ModelPreviewTrigger
                    model={cadAssets?.model || data.model || data.productCode || data.slug}
                    locale={configuratorLocale}
                    onOpen={handleOpenModel}
                  />
                ) : isHardTubeCustomerCategoryPage && !fittingCadAssets && !model3dUrl ? (
                  <div className={styles.modelViewerFallback} role="status">当前型号暂无公开 3D 模型，请以对应图纸核对结构与尺寸。</div>
                ) : isTubingAssembly && !model3dUrl ? (
                  <div className={styles.modelViewerFallback} role="status">{data.tubingAssemblyUi?.modelUnavailable}</div>
                ) : isQuickConnectFitting && quickConnectCadAssets ? (
                  <ProductCadViewer
                    modelId={quickConnectCadAssets.viewerId}
                    title={quickConnectCadAssets.model}
                    drawingUrl={drawingPreviewUrl || undefined}
                    productFamily="quick-connect"
                    fittingProduct={data.slug}
                    quickConnectMate={quickConnectViewerMate}
                    locale={configuratorLocale}
                    active={showFlatProductResources || activeTab === "model3d"}
                  />
                ) : isLuerPairingEnabled && luerSelectedParts ? (
                  <LuerCadViewer parts={luerSelectedParts} active={showFlatProductResources || activeTab === "model3d"} />
                ) : luerCadAssets ? (
                  <LuerCadViewer parts={[luerCadAssets]} active={showFlatProductResources || activeTab === "model3d"} />
                ) : hasOpenedModel || showFlatProductResources ? (data.solenoidAuthoredContent ? (
                  <SolenoidAssets slug={data.slug} locale={configuratorLocale} mode="3d" active={showFlatProductResources || activeTab === "model3d"} variant={solenoidVariant} onVariant={setSolenoidVariant} />
                ) : cadAssets || showFlatProductResources ? (
                  <ProductCadViewer modelId={cadAssets?.viewerId} title={cadAssets?.model || data.model || data.productCode || data.slug} drawingUrl={drawingPreviewUrl || undefined} productFamily={(fittingCadAssets || standaloneFittingCadAssets) ? "fitting" : undefined} headMaterial={pistonCadAssets?.headMaterial} fittingFinish={(fittingCadAssets || standaloneFittingCadAssets)?.fittingFinish} fittingProduct={fittingCadAssets?.fittingProduct || (standaloneFittingCadAssets ? data.slug : undefined)} fittingAccessory={fittingCadAssets ? hardTubeAccessoryChoice ?? undefined : undefined} locale={configuratorLocale} active={showFlatProductResources || activeTab === "model3d"} />
                ) : isPumpDetail ? (
                  <PumpUploadedFileGuard
                    key={model3dUrl}
                    fileUrl={model3dUrl}
                    loadingFallback={
                      <Pump3DFileCheckingDisplay
                        locale={pumpFileDisplayLocale}
                        title={useAuthoredValvelessCopy ? copy.model3d : undefined}
                      />
                    }
                    missingFallback={
                      <ThreeDFileNotUploadedDisplay
                        locale={pumpFileDisplayLocale}
                        description={rplP4Copy?.modelUnavailable}
                      />
                    }
                  >
                    <ProductModelViewer
                      slug={data.slug}
                      modelName={data.model}
                      modelUrl={model3dUrl}
                      isActive={activeTab === "model3d"}
                      locale={pumpFileDisplayLocale}
                    />
                  </PumpUploadedFileGuard>
                ) : (
                  <ProductModelViewer
                    slug={data.slug}
                    modelName={data.model}
                    key={model3dUrl}
                    modelUrl={model3dUrl}
                    isActive={activeTab === "model3d"}
                    locale={pumpFileDisplayLocale}
                  />
                )) : null}
              </div>
            </div>
            ) : null}

            {!(showFlatProductResources && (quickConnectCadAssets || (isHardTubeCustomerCategoryPage && fittingCadAssets))) ? (
            <div
              className={[
                styles.panel,
                activeTab === "drawing" || (showFlatProductResources && (isQuickConnectFitting || isHardTubeCustomerCategoryPage)) ? styles.isActive : "",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              {!showFlatProductResources || isQuickConnectFitting || isHardTubeCustomerCategoryPage ? (
                <h3 className={styles.flatPanelTitle}>{copy.technicalDrawing}</h3>
              ) : null}
              {data.solenoidAuthoredContent ? (
                activeTab === "drawing" ? <SolenoidAssets slug={data.slug} locale={configuratorLocale} mode="drawing" active variant={solenoidVariant} onVariant={setSolenoidVariant} /> : null
              ) : isPumpDetail ? (
                <PumpUploadedFileGuard
                  key={drawingPreviewUrl}
                  fileUrl={drawingPreviewUrl}
                  renderChildrenWhileChecking={Boolean(resourceLocale)}
                  loadingFallback={
                    <Pump2DFileCheckingDisplay
                      locale={pumpFileDisplayLocale}
                      title={useAuthoredValvelessCopy ? copy.drawingLoading : undefined}
                    />
                  }
                  missingFallback={
                    <TwoDFileNotUploadedDisplay
                      locale={pumpFileDisplayLocale}
                      title={useAuthoredValvelessCopy ? copy.no2dYet : undefined}
                      description={rplP4Copy?.drawingUnavailable}
                    />
                  }
                >
                  <PdfDrawingPreview
                    pdfPreviewUrl={drawingPreviewUrl}
                    previewHref={resourceLocale ? drawingDocumentUrl : undefined}
                    deferDesktopUntilOpen={Boolean(resourceLocale || rplAssets)}
                    previousPageLabel={resourceCopy?.previousPage}
                    nextPageLabel={resourceCopy?.nextPage}
                    previousPageVisibleLabel={resourceCopy?.previousPageShort}
                    nextPageVisibleLabel={resourceCopy?.nextPageShort}
                    documentTitle={rplAssets?.model || data.model}
                    text={
                      isLocalizedDetail
                        ? {
                            title: copy.technicalDrawing,
                            loadingLabel: copy.drawingLoading,
                            previewButton: copy.drawingPreview,
                            description: copy.drawingDescription(rplAssets?.model || data.model),
                          }
                        : undefined
                    }
                  />
                </PumpUploadedFileGuard>
              ) : drawingPreviewUrl ? (
                <PdfDrawingPreview
                  pdfPreviewUrl={drawingPreviewUrl}
                  previewHref={resourceLocale ? drawingDocumentUrl : undefined}
                  deferDesktopUntilOpen={Boolean(resourceLocale)}
                  previousPageLabel={resourceCopy?.previousPage}
                  nextPageLabel={resourceCopy?.nextPage}
                  previousPageVisibleLabel={resourceCopy?.previousPageShort}
                  nextPageVisibleLabel={resourceCopy?.nextPageShort}
                  documentTitle={data.model}
                  text={
                    isLocalizedDetail
                      ? {
                          title: copy.technicalDrawing,
                          loadingLabel: copy.drawingLoading,
                          previewButton: copy.drawingPreview,
                          description: copy.drawingDescription(data.model),
                        }
                      : undefined
                  }
                />
              ) : (
                <div
                  className={[
                    styles.panelBox,
                    styles.noDrawingState,
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  data-product-drawing-empty-state="true"
                >
                  <div className={styles.noDrawingContent}>
                    <h3 className={styles.noDrawingTitle}>
                      {isTubingDetailData(data) ||
                      isProbeDetailData(data)
                        ? copy.no2d
                        : copy.no2dYet}
                    </h3>

                    {!isTubingDetailData(data) &&
                    !isProbeDetailData(data) ? (
                      <p
                        className={
                          styles.noDrawingDescription
                        }
                      >
                        {copy.requestDrawing}
                      </p>
                    ) : null}
                  </div>
                </div>
              )}
            </div>
            ) : null}

            </>)}
            </div>
            ) : null}

            {isQuickConnectFitting && quickConnectCadAssets && (showFlatProductResources || activeTab === "model3d") ? (
              <QuickConnectPreviewNote model={quickConnectCadAssets.model} locale={configuratorLocale} />
            ) : null}

            {hasDatasheetTab && resourceLocale ? (
              <div
                className={[
                  styles.panel,
                  activeTab === "datasheet" ? styles.isActive : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                {showFlatProductResources ? (
                  <h3 className={styles.flatPanelTitle}>{resourceCopy?.datasheetTab}</h3>
                ) : null}
                <div className={styles.panelBox}>
                  <ProductDatasheetPanel
                    datasheet={datasheet}
                    fallbackTitle={String(
                      displayProductTitle || data.model || data.name || "Product",
                    ).trim()}
                    locale={resourceLocale}
                  />
                </div>
              </div>
            ) : null}
          </div>
          {hasCustomerCategoryNavigation && activeCustomerCategory !== "product" && !(isPistonPumpCustomerCategoryPage && activeCustomerCategory === "selection") ? (
            <div className={styles.customerCategoryContent}>
              {activeCustomerCategory === "selection"
                ? (isTubingCustomerCategoryPage && customerCategoryContent?.selection
                  ? customerCategoryContent.selection
                  : isTubingCustomerCategoryPage && data.tpuSelectionGuide
                  ? <TpuTubingSelectionContent
                      key={selectedTubingVariant?.id || "tpu-guide"}
                      guide={data.tpuSelectionGuide}
                      locale={configuratorLocale}
                      selectedProductCode={selectedTubingVariant?.productCode}
                    />
                  : isTubingCustomerCategoryPage && applicationDetails
                  ? <ProductApplicationsPanel content={applicationDetails} />
                  : probeGuide ? <ProbeSelectionContent guide={probeGuide} locale={configuratorLocale} />
                  : isPistonPumpCustomerCategoryPage ? null : customerCategoryContent?.selection)
                : null}
              {activeCustomerCategory === "delivery"
                ? (probeGuide ? <ProbeDeliveryContent guide={probeGuide} locale={configuratorLocale} /> : showSharedFittingDelivery ? <FittingDeliveryZh locale={configuratorLocale} productModel={String(data.model || data.foreachModel || "")} /> : customerCategoryContent?.delivery)
                : null}
            </div>
          ) : null}
        </section>
        {isPistonPumpCustomerCategoryPage ? (
          <div className={styles.customerCategoryContent} hidden={activeCustomerCategory !== "selection"}>
            {customerCategoryContent?.selection}
          </div>
        ) : null}
        {/* QUICK_CONNECT_SERIES_MODEL_TABLE_START */}
        {(!hasCustomerCategoryNavigation || activeCustomerCategory === "product") &&
          Array.isArray((data as any).modelRows) &&
        (data as any).modelRows.length > 0 ? (
          <section
            id="model-selection"
            className={styles.faqSection}
          >
            <div className={styles.faqHeader}>
              <div>
                <h2>
                  {(data as any).modelTableTitle ||
                    copy.completeModels}
                </h2>

                {(data as any).modelTableDescription ? (
                  <p>
                    {(data as any).modelTableDescription}
                  </p>
                ) : null}
              </div>
              {isQuickConnectSeriesDetail ? (
                <button
                  className={styles.button}
                  type="button"
                  onClick={() => openQuickConnectSeriesSelector()}
                >
                  {configuratorLocale === "en" ? "Select a model" : "点击型号选择"}
                </button>
              ) : null}
            </div>

            <div style={{ overflowX: "auto" }}>
              <table className={styles.specTable}>
                <thead>
                  <tr>
                    <th>{copy.foreachModel}</th>
                    <th>{copy.productCode}</th>
                    <th>{copy.connection}</th>
                    <th>{copy.gender}</th>
                    <th>{copy.mounting}</th>
                    <th>{copy.valved}</th>
                    <th>{copy.shape}</th>
                    <th>{copy.housingMaterial}</th>
                  </tr>
                </thead>

                <tbody>
                  {(data as any).modelRows.map(
                    (item: any) => {
                      const rowKey = String(
                        item.productCode ||
                          item.model ||
                          ""
                      ).trim();

                      return (
                        <tr
                          id={rowKey || undefined}
                          key={rowKey}
                        >
                          <td>
                            {isQuickConnectSeriesDetail ? (
                              <button
                                type="button"
                                className={styles.modelSelectionButton}
                                onClick={() => openQuickConnectSeriesSelector(String(item.model || ""))}
                              >
                                {item.model}
                              </button>
                            ) : item.model}
                          </td>
                          <td>{item.productCode}</td>
                          <td>{item.connection}</td>
                          <td>{item.gender}</td>
                          <td>{item.panelMount}</td>
                          <td>{item.valved}</td>
                          <td>{item.shape}</td>
                          <td>{item.housingMaterial}</td>
                        </tr>
                      );
                    }
                  )}
                </tbody>
              </table>
            </div>
          </section>
        ) : null}
        {/* QUICK_CONNECT_SERIES_MODEL_TABLE_END */}

        {beforeFaqContent}

        {data.faqs && data.faqs.length > 0 ? (
          <section className={styles.faqSection}>
            <div className={styles.faqHeader}>
              <h2 data-assembly-page-heading={isAssemblyCustomerCategoryPage || undefined}>
                {isLocalizedDetail
                  ? copy.faq
                  : getDbSectionTitle("faq", copy.faq)}
              </h2>
            </div>

            <div className={styles.faqList}>
              {data.faqs.map((item, index) => {
                const isOpen = openFaqIndex === index;

                return (
                  <article
                    className={[
                      styles.faqItem,
                      isOpen ? styles.faqItemOpen : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                    key={`${item.question}-${index}`}
                  >
                    <button
                      className={styles.faqQuestion}
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() =>
                        setOpenFaqIndex(isOpen ? null : index)
                      }
                    >
                      <span className={styles.faqQuestionText}>
                        {item.question}
                      </span>
                      <span
                        className={styles.faqToggle}
                        aria-hidden="true"
                      >
                        {isOpen ? "−" : "+"}
                      </span>
                    </button>
                    <div
                      className={styles.faqAnswerWrap}
                      aria-hidden={!isOpen}
                    >
                      <p className={styles.faqAnswer}>
                        {item.answer}
                      </p>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        ) : null}

        {afterContent}

        {data.faqs && data.faqs.length > 0 ? (
          <PlungerPumpBottomCta data={data} localePrefix={localePrefix} />
        ) : null}

      </div>
    </main>
    </SitePageShell>
</div>, (String(sourceData.category) === "fittings" || sourceData.categoryId === "fittings") ? configuratorLocale : "zh")
  );
}
