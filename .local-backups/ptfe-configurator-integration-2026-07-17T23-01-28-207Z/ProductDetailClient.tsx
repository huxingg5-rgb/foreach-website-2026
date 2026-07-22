"use client";


import { useSelectionCart } from "@/components/selection-cart/SelectionCartProvider";
import type { SelectionCartItemInput } from "@/components/selection-cart/selection-cart.types";
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
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";

import type { CSSProperties, MouseEvent } from "react";
import { localizeProductDetailData } from "@/data/products/detail/product-detail.intl";
import type { ProductDetailPageData } from "@/data/products/detail/product-detail.types";
import ProductModelViewer from "./ProductModelViewer";

/* PVC_TUBING_CONFIGURATOR_INTEGRATION_START */
import {
  ProductVariantConfigurator,
} from "@/components/products/configurator";

import type {
  ProductConfiguratorVariant,
} from "@/components/products/configurator";

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

import styles from "./product-detail.module.css";

type ProductDetailTab = "spec" | "model3d" | "drawing";

type ProductDetailClientProps = {
  data: ProductDetailPageData & Record<string, any>;
};

type ZoomStyle = CSSProperties & {
  "--zoom-x"?: string;
  "--zoom-y"?: string;
};

function getProductDrawingPreviewUrl(slug: string, configuredUrl?: string) {
  const normalizedConfiguredUrl = configuredUrl?.trim();

  if (normalizedConfiguredUrl) {
    return normalizedConfiguredUrl.includes("#")
      ? normalizedConfiguredUrl
      : normalizedConfiguredUrl + "#toolbar=0&navpanes=0&scrollbar=1";
  }

  const normalizedSlug = slug.trim().toLowerCase();
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
    return "XXX-XXX-XX-XX";
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
  if (isTubingDetailData(data)) {
    return data?.__locale === "en" ? "Select a Model" : "选择型号";
  }

  if (data?.__locale === "en") {
    return isCustomInquiryMode(data) ? "Contact Us" : "Select a Model";
  }

  return isCustomInquiryMode(data) ? "联系我们" : "型号选择";
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
    "请提供介质类型、压力范围、接口方式、通道数量、安装空间和控制方式，FOREACH 可协助确认适合您设备的阀系列配置。";

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
    "请提供图纸、样品、针管尺寸、针尖结构、安装空间和目标液体信息，FOREACH 可协助确认针系列定制方案。";

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
      "请提供液体介质、目标流量、管材、内径/外径、管路长度、接头数量、弯折情况、工作温度和压力范围。FOREACH 工程师可协助估算管路压降、流体阻力和死体积，并确认管材、接头与泵阀配置是否匹配。",
    button: data?.bottomCtaButton || "联系工程师",
    href: data?.bottomCtaHref || data?.contactHref || "/contact",
  };
}

function getPlungerPumpBottomCta(data: any) {
  /* FITTING_BOTTOM_CTA_20260717 */
  if (isFittingDetailData(data)) {
    if (data?.__locale === "en") {
      return {
        title:
          "Fittings for volume orders and custom applications",
        desc:
          "FOREACH can support fitting selection, volume supply, and customization based on port type, tube size, material, sealing element, mounting structure, and application conditions.",
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
        desc: "Share the syringe size, stroke, channel count, valve arrangement, communication interface, installation space, and fluidic integration requirements. The FOREACH engineering team can help confirm a suitable configuration.",
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
    if (data?.__locale === "en") {
      return {
        title: "Valveless pumps configured for your fluidic requirements",
        desc: "Share the target displacement, ratio requirements, fluid compatibility, port type, cleaning requirements, and installation space. The FOREACH engineering team can help confirm a suitable configuration.",
        button: "Submit a Custom Request",
        href: "/en/contact",
      };
    }

    return {
      title: "无阀泵可根据您的液路需求进行定制",
      desc: "恒永达可根据您的应用场景、目标排量、配比要求、液体兼容性、接口方式、清洗口和安装空间，协助确认适合自动化仪器集成的无阀泵配置。",
      button: "提交定制需求",
      href: "/contact",
    };
  }
  if (isPlungerPumpDetailData(data)) {
    if (data?.__locale === "en") {
      return {
        title: "Plunger pumps configured for your instrument",
        desc: "Share the target volume, fluid compatibility, port type, control method, installation space, and service-life requirements. The FOREACH engineering team can help confirm the pump configuration and wetted materials.",
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
        desc: "Share the fluid, flow rate, pressure, self-priming requirements, wetted materials, port type, and installation space. The FOREACH engineering team can help confirm a suitable diaphragm pump configuration.",
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
        desc: "Share the volume range, tip specification, liquid-level and clog-detection requirements, communication interface, installation space, and control method. The FOREACH engineering team can help confirm a suitable configuration.",
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

function localizeInternalHref(value: unknown, isEnglish: boolean): string {
  const href = String(value || "").trim();

  if (
    !isEnglish ||
    !href.startsWith("/") ||
    href.startsWith("/en/") ||
    href === "/en" ||
    href.startsWith("/assets/") ||
    href.startsWith("/images/") ||
    href.startsWith("/_next/") ||
    href.startsWith("/api/")
  ) {
    return href;
  }

  return `/en${href}`;
}


function PlungerPumpBottomCta({
  data,
  isEnglish,
}: {
  data: any;
  isEnglish: boolean;
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
        <a
          className={styles.plungerBottomCtaButton}
          href={localizeInternalHref(cta.href, isEnglish)}
        >
          {cta.button}
        </a>
      </div>
    </section>
  );
}

const PRODUCT_SITE_ORIGIN = "https://www.foreachtek.com";

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

function collectProductImageUrls(data: any) {
  const values: unknown[] = [
    data.mainImage,
    data.imageUrl,
    data.image,
    data.heroImage,
    data.coverImage,
    ...(Array.isArray(data.images) ? data.images : []),
    ...(Array.isArray(data.galleryImages) ? data.galleryImages : []),
  ];

  const urls = values
    .flatMap((value) => {
      if (typeof value === "string") {
        return [value];
      }

      if (value && typeof value === "object") {
        const item = value as Record<string, unknown>;
        return [item.src, item.url, item.path, item.fullPath];
      }

      return [];
    })
    .map(toAbsoluteProductUrl)
    .filter(Boolean);

  return Array.from(new Set(urls));
}

function collectProductSpecifications(data: any) {
  const source = Array.isArray(data.specs)
    ? data.specs
    : Array.isArray(data.specificationGroups)
      ? data.specificationGroups
      : [];
  const rows: Array<{ name: string; value: string }> = [];

  function visit(value: unknown) {
    if (Array.isArray(value)) {
      value.forEach(visit);
      return;
    }

    if (!value || typeof value !== "object") {
      return;
    }

    const item = value as Record<string, unknown>;
    const name = String(
      item.label || item.name || item.title || ""
    ).trim();
    const itemValue = String(
      item.value || item.content || item.text || ""
    ).trim();

    if (name && itemValue) {
      rows.push({ name, value: itemValue });
    }

    Object.entries(item).forEach(([key, child]) => {
      if (!["label", "name", "title", "value", "content", "text"].includes(key)) {
        visit(child);
      }
    });
  }

  visit(source);

  return Array.from(
    new Map(rows.map((row) => [`${row.name}::${row.value}`, row])).values()
  );
}

function buildProductStructuredData(data: any, pathname: string) {
  const canonicalUrl = toAbsoluteProductUrl(pathname || "/");
  const productName = String(
    data.model || data.title || data.name || ""
  ).trim();
  const description = String(data.description || "").trim();
  const imageUrls = collectProductImageUrls(data);
  const applications = Array.isArray(data.commonApplications)
    ? data.commonApplications.filter(Boolean).map(String)
    : [];
  const specifications = collectProductSpecifications(data);
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
  const category = String(
    data.categoryLabel || data.productTypeName || ""
  ).trim();

  const product: Record<string, unknown> = {
    "@type": "Product",
    "@id": `${canonicalUrl}#product`,
    name: productName,
    url: canonicalUrl,
    description,
    brand: {
      "@type": "Brand",
      name: "FOREACH",
    },
    manufacturer: {
      "@type": "Organization",
      name: "Shenzhen FOREACH Technology Co., Ltd.",
      url: PRODUCT_SITE_ORIGIN,
    },
  };

  if (data.productCode || data.seriesCode) {
    product.sku = String(data.productCode || data.seriesCode);
  }

  if (category) {
    product.category = category;
  }

  if (imageUrls.length > 0) {
    product.image = imageUrls;
  }

  if (specifications.length > 0) {
    product.additionalProperty = specifications.map((item) => ({
      "@type": "PropertyValue",
      name: item.name,
      value: item.value,
    }));
  }

  const graph: Record<string, unknown>[] = [
    product,
    {
      "@type": "BreadcrumbList",
      "@id": `${canonicalUrl}#breadcrumb`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: toAbsoluteProductUrl("/en/"),
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Products",
          item: toAbsoluteProductUrl("/en/products/"),
        },
        {
          "@type": "ListItem",
          position: 3,
          name: productName,
          item: canonicalUrl,
        },
      ],
    },
  ];

  if (faqs.length > 0) {
    graph.push({
      "@type": "FAQPage",
      "@id": `${canonicalUrl}#faq`,
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

  if (applications.length > 0) {
    product.keywords = applications.join(", ");
  }

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}

export default function ProductDetailClient({
  data: sourceData,
}: ProductDetailClientProps) {
  const pathname = usePathname();
  const isEnglish = pathname === "/en" || pathname.startsWith("/en/");
  const data = useMemo(
    () =>
      isEnglish
        ? localizeProductDetailData(sourceData)
        : sourceData,
    [isEnglish, sourceData]
  );
  const structuredData = useMemo(
    () =>
      isEnglish
        ? buildProductStructuredData(data, pathname || "/")
        : null,
    [data, isEnglish, pathname]
  );
  const copy = isEnglish
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
        foreachModel: "FOREACH Model",
        productCode: "Product Code",
        connection: "Tube ID or Thread",
        gender: "Gender",
        mounting: "Mounting Method",
        valved: "Valve Configuration",
        shape: "Shape",
        housingMaterial: "Housing Material",
        faq: "Frequently Asked Questions",
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
      };
    const { addItem, getItem, toggleDrawingNeed, removeItem } = useSelectionCart();

const [activeTab, setActiveTab] = useState<ProductDetailTab>("spec");
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [activeThumb, setActiveThumb] = useState(0);
  const [isZooming, setIsZooming] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({
    x: 50,
    y: 50,
  });

  /* PVC_TUBING_CONFIGURATOR_STATE_START */
  const [
    isPvcConfiguratorOpen,
    setIsPvcConfiguratorOpen,
  ] = useState(false);

  const [
    selectedPvcVariant,
    setSelectedPvcVariant,
  ] =
    useState<ProductConfiguratorVariant | null>(
      null
    );

  const isPvcTubingDetail =
    isPvcTubingDetailData(data);

  /*
   * 第一阶段先接入中文PVC管详情页。
   * 避免英文页面暂时显示中文选型内容。
   */
  const isPvcTubingConfiguratorEnabled =
    isPvcTubingDetail;
  /* PVC_TUBING_CONFIGURATOR_STATE_END */

  /* TPU_TUBING_CONFIGURATOR_STATE_START */
  const [
    isTpuConfiguratorOpen,
    setIsTpuConfiguratorOpen,
  ] = useState(false);

  const [
    selectedTpuVariant,
    setSelectedTpuVariant,
  ] =
    useState<ProductConfiguratorVariant | null>(
      null
    );

  const isTpuTubingDetail =
    isTpuTubingDetailData(data);

  const isTpuTubingConfiguratorEnabled =
    isTpuTubingDetail;


  /* FEP_TUBING_CONFIGURATOR_STATE_START */
  const [
    isFepConfiguratorOpen,
    setIsFepConfiguratorOpen,
  ] = useState(false);

  const [
    selectedFepVariant,
    setSelectedFepVariant,
  ] =
    useState<ProductConfiguratorVariant | null>(
      null
    );

  const isFepTubingDetail =
    isFepTubingDetailData(data);

  const isFepTubingConfiguratorEnabled =
    isFepTubingDetail;
  /* FEP_TUBING_CONFIGURATOR_STATE_END */

  const isTubingConfiguratorEnabled =
    isPvcTubingConfiguratorEnabled ||
    isTpuTubingConfiguratorEnabled ||
    isFepTubingConfiguratorEnabled;

  const selectedTubingVariant =
    isPvcTubingConfiguratorEnabled
      ? selectedPvcVariant
      : isTpuTubingConfiguratorEnabled
        ? selectedTpuVariant
        : isFepTubingConfiguratorEnabled
          ? selectedFepVariant
          : null;
  /* TPU_TUBING_CONFIGURATOR_STATE_END */

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

  /*
   * 正式数据中：
   * 只有主图且没有附属图时，不显示缩略图栏。
   *
   * 当前测试数据尚未连接选型主图，因此保留 HTML 原型中的
   * 三个 SVG 缩略图，便于核对版式。
   */
  const showThumbnailRow = hasRealImages
    ? realImages.length > 0
    : true;
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

  function handlePreviousThumb() {
    if (hasRealImages) {
      setActiveThumb((current) =>
        current === 0 ? realImages.length - 1 : current - 1,
      );
      return;
    }

    setActiveThumb((current) => (current === 0 ? 2 : current - 1));
  }

  function handleNextThumb() {
    if (hasRealImages) {
      setActiveThumb((current) =>
        current === realImages.length - 1 ? 0 : current + 1,
      );
      return;
    }

    setActiveThumb((current) => (current === 2 ? 0 : current + 1));
  }

  const detailCartSourceType =
    isTubingConfiguratorEnabled
      ? "tubing-selection"
      : "pump-selection";

  function getDetailCartProductCode() {
    if (
      isTubingConfiguratorEnabled
    ) {
      return (
        selectedTubingVariant
          ?.productCode || ""
      );
    }

    return String(
      data.modelDisplay ||
        data.displayModel ||
        data.foreachModel ||
        data.model ||
        data.productCode ||
        data.slug ||
        ""
    ).trim();
  }

  function createDetailCartItem(
    needDrawing: boolean,
    tubingVariantOverride?: ProductConfiguratorVariant
  ): SelectionCartItemInput {
    const activeTubingVariant =
      tubingVariantOverride ||
      selectedTubingVariant;

    const productCode =
      isTubingConfiguratorEnabled
        ? activeTubingVariant
            ?.productCode || ""
        : getDetailCartProductCode();

    const modelText =
      isTubingConfiguratorEnabled
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
        ? "Plunger Pump"
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
      isPvcTubingConfiguratorEnabled
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
            : productName;

    const fallbackDetailHref = data.slug
      ? isPlungerPumpDetailData(data)
        ? `/products/pumps/plunger-pumps/${data.slug}`
        : isDiaphragmPumpDetailData(data)
          ? `/products/pumps/diaphragm-pumps/${data.slug}`
          : isPipettingPumpDetailData(data)
            ? `/products/pumps/pipetting-pumps/${data.slug}`
            : isTubingDetailData(data)
              ? `/products/tubing/${data.slug}`
              : ""
      : "";

    return {
      sourceType:
        detailCartSourceType,
      sourceLabel: isEnglish ? "Product Detail Page" : "产品详情页",
      productName:
        resolvedProductName,
      productCode,
      foreachModel: modelText,
      competitorModels: [],
      quantity: 1,
      needDrawing,
      imagePath:
        data.imageCard ||
        data.image ||
        data.imageUrl ||
        data.mainImage ||
        data.heroImage ||
        "",
      detailHref:
        data.detailHref ||
        data.href ||
        (isEnglish && fallbackDetailHref
          ? `/en${fallbackDetailHref}`
          : fallbackDetailHref),
    };
  }

  
  const currentDetailCartItem =
    getItem(
      detailCartSourceType,
      getDetailCartProductCode()
    );
  const isDetailProductSelected = Boolean(currentDetailCartItem);
  const isDetailDrawingSelected = Boolean(currentDetailCartItem?.needDrawing);

  function handleOpenConfigurator() {
    console.info("配置选择端口预留", data.slug);
  }

  function handleAddDatasheet() {
    console.info("添加规格书端口预留", data.slug);
  }

  function handleAddDrawing() {
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

  function handleRequest3DFile() {
    console.info("申请3D文件端口预留", data.slug);
  }

  function handleAddList() {
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
      removeItem(existingItem.id);
      return;
    }

    addItem(item);
  }

  function isPvcVariantSelected(
    variant: ProductConfiguratorVariant
  ): boolean {
    return Boolean(
      getItem(
        "tubing-selection",
        variant.productCode
      )
    );
  }

  function handleTogglePvcVariant(
    variant: ProductConfiguratorVariant
  ) {
    const existingItem = getItem(
      "tubing-selection",
      variant.productCode
    );

    if (existingItem) {
      removeItem(existingItem.id);
      return;
    }

    const item = createDetailCartItem(
      false,
      variant
    );

    if (
      !item.productCode ||
      !item.foreachModel
    ) {
      console.warn(
        "PVC管清单参数不完整",
        variant
      );

      return;
    }

    addItem(item);
  }

  function isTpuVariantSelected(
    variant: ProductConfiguratorVariant
  ): boolean {
    return Boolean(
      getItem(
        "tubing-selection",
        variant.productCode
      )
    );
  }

  function handleToggleTpuVariant(
    variant: ProductConfiguratorVariant
  ) {
    const existingItem = getItem(
      "tubing-selection",
      variant.productCode
    );

    if (existingItem) {
      removeItem(existingItem.id);
      return;
    }

    const item = createDetailCartItem(
      false,
      variant
    );

    if (
      !item.productCode ||
      !item.foreachModel
    ) {
      console.warn(
        "TPU管清单参数不完整",
        variant
      );

      return;
    }

    addItem(item);
  }

  function isFepVariantSelected(
    variant: ProductConfiguratorVariant
  ): boolean {
    return Boolean(
      getItem(
        "tubing-selection",
        variant.productCode
      )
    );
  }

  function handleToggleFepVariant(
    variant: ProductConfiguratorVariant
  ) {
    const existingItem = getItem(
      "tubing-selection",
      variant.productCode
    );

    if (existingItem) {
      removeItem(existingItem.id);
      return;
    }

    const item = createDetailCartItem(
      false,
      variant
    );

    if (
      !item.productCode ||
      !item.foreachModel
    ) {
      console.warn(
        "FEP管清单参数不完整",
        variant
      );

      return;
    }

    addItem(item);
  }

  return (
    <div data-product-breadcrumb-shell="true">
      {structuredData ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
          }}
        />
      ) : null}

      {/* PVC_TUBING_CONFIGURATOR_RENDER_START */}
      {isPvcTubingConfiguratorEnabled ? (
        <ProductVariantConfigurator
          open={
            isPvcConfiguratorOpen
          }
          config={
            isEnglish
              ? pvcTubingConfiguratorEn
              : pvcTubingConfigurator
          }
          value={
            selectedPvcVariant
          }
          isVariantSelected={
            isPvcVariantSelected
          }
          onToggleVariant={
            handleTogglePvcVariant
          }
          onClose={() => {
            setIsPvcConfiguratorOpen(
              false
            );
          }}
          onConfirm={(variant) => {
            setSelectedPvcVariant(
              variant
            );

            setIsPvcConfiguratorOpen(
              false
            );
          }}
        />
      ) : null}
      {/* PVC_TUBING_CONFIGURATOR_RENDER_END */}

      {/* TPU_TUBING_CONFIGURATOR_RENDER_START */}
      {isTpuTubingConfiguratorEnabled ? (
        <ProductVariantConfigurator
          open={
            isTpuConfiguratorOpen
          }
          config={
            isEnglish
              ? tpuTubingConfiguratorEn
              : tpuTubingConfigurator
          }
          value={
            selectedTpuVariant
          }
          isVariantSelected={
            isTpuVariantSelected
          }
          onToggleVariant={
            handleToggleTpuVariant
          }
          onClose={() => {
            setIsTpuConfiguratorOpen(
              false
            );
          }}
          onConfirm={(variant) => {
            setSelectedTpuVariant(
              variant
            );

            setIsTpuConfiguratorOpen(
              false
            );
          }}
        />
      ) : null}
      {/* TPU_TUBING_CONFIGURATOR_RENDER_END */}

      {/* FEP_TUBING_CONFIGURATOR_RENDER_START */}
      {isFepTubingConfiguratorEnabled ? (
        <ProductVariantConfigurator
          open={
            isFepConfiguratorOpen
          }
          config={
            isEnglish
              ? fepTubingConfiguratorEn
              : fepTubingConfigurator
          }
          value={
            selectedFepVariant
          }
          isVariantSelected={
            isFepVariantSelected
          }
          onToggleVariant={
            handleToggleFepVariant
          }
          onClose={() => {
            setIsFepConfiguratorOpen(
              false
            );
          }}
          onConfirm={(variant) => {
            setSelectedFepVariant(
              variant
            );

            setIsFepConfiguratorOpen(
              false
            );
          }}
        />
      ) : null}
      {/* FEP_TUBING_CONFIGURATOR_RENDER_END */}

<SitePageShell
      breadcrumbAriaLabel={copy.breadcrumb}
      breadcrumbItems={[
        {
          label: copy.home,
          href: isEnglish ? "/en/" : "/",
        },
        {
          label: copy.products,
          href: isEnglish ? "/en/products/" : "/products/",
        },
        {
          label: data.model,
        },
      ]}
    >
      <main className={styles.page} data-product-detail-page="true">
      <div className={styles.container}>
        
        <section className={styles.productTop}>
          <div data-product-gallery="true" className={styles.gallery} aria-label={copy.gallery}>
            <div data-product-main-stage="true"
              className={[
                styles.mainImage,
                isZooming ? styles.isZooming : "",
              ]
                .filter(Boolean)
                .join(" ")}
              style={zoomStyle}
              onMouseEnter={() => setIsZooming(true)}
              onMouseLeave={() => setIsZooming(false)}
              onMouseMove={handleMainImageMove}
            >
              {activeRealImage ? (
                <img data-product-main-image="true"
                  src={activeRealImage}
                  alt={(data as any).imageAltEn || (data as any).mainImageAlt || (data as any).imageAlt || `${data.model} ${data.name}`}
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
                data-detail-locale={isEnglish ? "en" : "zh"}
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

                {hasRealImages ? (
                  realImages.slice(0, 5).map((image, index) => (
                    <button
                      key={`${image}-${index}`}
                      className={[
                        styles.thumb,
                        activeThumb === index ? styles.isActive : "",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                      type="button"
                      onClick={() => setActiveThumb(index)}
                    >
                      <img src={image} alt="" />
                    </button>
                  ))
                ) : (
                  <>
                    <button
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
              <h1 className={styles.productModelTitle}>{data.model}</h1>
            </div>

            <p className={styles.productDesc}>
              {(data as any).description || (Array.isArray(data.advantages) ? data.advantages.join("") : "")}
            </p>

            <div className={styles.application}>
              <p className={styles.applicationTitle}>
                {isEnglish
                  ? copy.applications
                  : getDbSectionTitle("applications", copy.applications)}
              </p>
              <p className={styles.applicationText}>
                {data.commonApplications.join(isEnglish ? ", " : "、")}
              </p>
            </div>

            <div className={styles.operationArea}>
              <div data-product-model-row="true" className={styles.modelLine}>
                <div className={styles.modelCodeWrap}>
                  <div className={styles.modelCodeText}>
                    <span className={styles.modelLabel}>{copy.model}</span>
                    <span
                      className={
                        styles.modelCode
                      }
                    >
                      {isTubingConfiguratorEnabled
                        ? selectedTubingVariant
                            ?.model ||
                          getDisplayModelText(
                            data
                          )
                        : getDisplayModelText(
                            data
                          )}
                    </span>
                  </div>
                  <button
                    className={styles.button}
                    type="button"
                    onClick={() => {
                      if (
                        isPvcTubingConfiguratorEnabled
                      ) {
                        setIsPvcConfiguratorOpen(
                          true
                        );

                        return;
                      }

                      if (
                        isTpuTubingConfiguratorEnabled
                      ) {
                        setIsTpuConfiguratorOpen(
                          true
                        );

                        return;
                      }

                      
                      if (
                        isFepTubingConfiguratorEnabled
                      ) {
                        setIsFepConfiguratorOpen(
                          true
                        );

                        return;
                      }

                      const href = localizeInternalHref(
                        getModelActionHref(data),
                        isEnglish,
                      );

                      if (isCustomInquiryMode(data)) {
                        window.location.href = href;
                        return;
                      }

                      window.open(href, "_blank", "noopener,noreferrer");
                    }}
                  >
                    {isTubingConfiguratorEnabled &&
                    selectedTubingVariant
                      ? isEnglish
                        ? "Reselect"
                        : "重新选型"
                      : getModelActionText(
                          data
                        )}
                  </button>
                </div>

                {data.showConfigurator ? (
                  <button
                    className={styles.button}
                    type="button"
                    onClick={handleOpenConfigurator}
                  >
                    {copy.configurator}
                  </button>
                ) : null}
              </div>

              <div data-product-action-grid="true" className={styles.actionRow}>
                {data.showDatasheetRequest ? (
                  <button
                    className={styles.button}
                    type="button"
                    onClick={handleAddDatasheet}
                  >
                    {copy.datasheet}
                  </button>
                ) : null}

                {data.showDrawingRequest ? (
                  <button
                    className={styles.button}
                    type="button"
                    disabled={
                      isTubingConfiguratorEnabled &&
                      !selectedTubingVariant
                    }
                    aria-pressed={isDetailDrawingSelected}
                    onClick={handleAddDrawing}
                  >
                    {isDetailDrawingSelected ? copy.drawingAdded : copy.drawing}
                  </button>
                ) : null}

                {data.show3DRequest ? (
                  <button
                    className={styles.button}
                    type="button"
                    onClick={handleRequest3DFile}
                  >
                    {copy.request3d}
                  </button>
                ) : null}

                <button
                  className={styles.button}
                  type="button"
                  disabled={
                    isTubingConfiguratorEnabled &&
                      !selectedTubingVariant
                  }
                  aria-pressed={isDetailProductSelected}
                  onClick={handleAddList}
                >
                  {isDetailProductSelected ? copy.addedToList : copy.addToList}
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.detailSection}>
          <nav className={styles.tabNav} aria-label={copy.tabs}>
            <button
              className={[
                styles.tabButton,
                activeTab === "spec" ? styles.isActive : "",
              ]
                .filter(Boolean)
                .join(" ")}
              type="button"
              onClick={() => setActiveTab("spec")}
            >
              {copy.specifications}
            </button>

            <button
              className={[
                styles.tabButton,
                activeTab === "model3d" ? styles.isActive : "",
              ]
                .filter(Boolean)
                .join(" ")}
              type="button"
              onClick={() => setActiveTab("model3d")}
            >
              {copy.model3d}
            </button>

            <button
              className={[
                styles.tabButton,
                activeTab === "drawing" ? styles.isActive : "",
              ]
                .filter(Boolean)
                .join(" ")}
              type="button"
              onClick={() => setActiveTab("drawing")}
            >
              {copy.technicalDrawing}
            </button>
          </nav>

          <div className={styles.panelWrap}>
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
                <table className={styles.specTable}>
                  <tbody>
                    {data.specs.map((item) => (
                      <tr data-product-spec-row="true" key={`${item.label}-${item.value}`}>
                        <th>{item.label}</th>
                        <td>{item.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div
              className={[
                styles.panel,
                activeTab === "model3d" ? styles.isActive : "",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              <div
                  className={styles.panelBox}
                  data-product-model3d-panel="true"
                >
                <ProductModelViewer
                  slug={data.slug}
                  modelName={data.model}
                  modelUrl={(data as any).model3dUrl || (data as any).resources?.model3dUrl}
                  locale={isEnglish ? "en" : "zh"}
                />
              </div>
            </div>

            <div
              className={[
                styles.panel,
                activeTab === "drawing" ? styles.isActive : "",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              {getProductDrawingPreviewUrl(data.slug, (data as any).drawing2dUrl || (data as any).drawingPdfUrl || (data as any).partDrawingUrl || (data as any).resources?.drawing2dUrl) ? (
                <PdfDrawingPreview
                  pdfPreviewUrl={getProductDrawingPreviewUrl(data.slug, (data as any).drawing2dUrl || (data as any).drawingPdfUrl || (data as any).partDrawingUrl || (data as any).resources?.drawing2dUrl)}
                  documentTitle={data.model}
                  text={
                    isEnglish
                      ? {
                          title: "Technical Drawing",
                          loadingLabel: "Loading drawing...",
                          previewButton: "Preview Drawing",
                          description: `View the technical drawing for ${data.model}.`,
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
                        ? isEnglish
                          ? "No 2D Drawing"
                          : "无2D图纸"
                        : isEnglish
                          ? "2D Drawing Not Available Yet"
                          : "2D 图纸暂未上传"}
                    </h3>

                    {!isTubingDetailData(data) &&
                    !isProbeDetailData(data) ? (
                      <p
                        className={
                          styles.noDrawingDescription
                        }
                      >
                        {isEnglish
                          ? 'To request a 2D drawing for this product, please click “Add Drawing” above.'
                          : '如需该产品的 2D 图纸，请点击上方“添加图纸”按钮提交需求。'}
                      </p>
                    ) : null}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
        {/* QUICK_CONNECT_SERIES_MODEL_TABLE_START */}
        {Array.isArray((data as any).modelRows) &&
        (data as any).modelRows.length > 0 ? (
          <section
            id="model-selection"
            className={styles.faqSection}
          >
            <div className={styles.faqHeader}>
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
                          <td>{item.model}</td>
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

        {data.faqs && data.faqs.length > 0 ? (
<>
<section className={styles.faqSection}>
            <div className={styles.faqHeader}>
              <h2>
                {isEnglish
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

          <PlungerPumpBottomCta data={data} isEnglish={isEnglish} />
          </>
        ) : null}

      </div>
    </main>
    </SitePageShell>
</div>
  );
}
