import copyJson from "./diaphragm-pump-copy.generated.json";
import {
  getDiaphragmPumpCategoryCopy,
  getDiaphragmPumpReferenceFromIdentity,
  type DiaphragmPumpReferenceCopyKey,
} from "./diaphragm-pump-reference-models";

import type { SelectionLocale } from "@/data/products/selection/product-selection.types";

export type DiaphragmPumpCopyKey = DiaphragmPumpReferenceCopyKey;

export type DiaphragmPumpCopy = {
  title: string;
  cardParameters: string[];
  intro: string;
  applications: string;
  breadcrumbs: string[];
  faqs: Array<{
    question: string;
    answer: string;
  }>;
};

type CopyByKey = Record<DiaphragmPumpCopyKey, DiaphragmPumpCopy>;
type CopyByLocale = Record<SelectionLocale, CopyByKey>;

const DIAPHRAGM_PUMP_COPY = copyJson as CopyByLocale;

const DPL30_BRUSHED_MAIN_IMAGE =
  "/images/products/pumps/diaphragm-pumps/dpl30/images/dpl30-brushed-liquid-diaphragm-pump-main.webp";

const DPL30_BRUSHED_DETAIL_IMAGES = [
  "/images/products/pumps/diaphragm-pumps/dpl30/images/dpl30-brushed-liquid-diaphragm-pump-barb-port-orientation.webp",
  "/images/products/pumps/diaphragm-pumps/dpl30/images/dpl30-brushed-liquid-diaphragm-pump-rear-mounting-view.webp",
  "/images/products/pumps/diaphragm-pumps/dpl30/images/dpl30-brushed-liquid-diaphragm-pump-side-mounting-view.webp",
  "/images/products/pumps/diaphragm-pumps/dpl30/images/dpl30-brushed-liquid-diaphragm-pump-top-view.webp",
] as const;

const IDENTITY_FIELDS = [
  "productId",
  "id",
  "slug",
  "detailSlug",
  "routeSlug",
  "reservedConfigSlug",
  "seriesId",
  "seriesSlug",
  "model",
  "modelDisplay",
  "title",
  "name",
] as const;

function getIdentityText(value: unknown) {
  if (!value || typeof value !== "object") return String(value || "").toLowerCase();

  const record = value as Record<string, unknown>;

  return IDENTITY_FIELDS.map((field) => String(record[field] || ""))
    .join(" ")
    .toLowerCase();
}

export function getDiaphragmPumpCopyKey(
  value: unknown,
): DiaphragmPumpCopyKey | null {
  const reference = getDiaphragmPumpReferenceFromIdentity(value);

  if (reference) {
    return reference.copyKey;
  }

  const identity = getIdentityText(value);

  if (
    identity.includes("dpgl800") &&
    (
      identity.includes("dpgl800-24bs6") ||
      identity.includes("dpgl800-brushless") ||
      identity.includes("diaphragm-dpgl800-") ||
      identity.includes("dpgl800-gas-liquid-diaphragm-pump")
    )
  ) {
    return "dpgl800-brushless";
  }

  if (identity.includes("dpl30h")) {
    if (
      identity.includes("dpl30h-24ds") ||
      identity.includes("dpl30h-brushed") ||
      identity.includes("diaphragm-dpl30h-brushed") ||
      identity.includes("dpl30h-liquid-diaphragm-pump")
    ) {
      return "dpl30h-brushed";
    }

    if (
      identity.includes("dpl30h-24bs") ||
      identity.includes("dpl30h-brushless") ||
      identity.includes("diaphragm-dpl30h-brushless")
    ) {
      return "dpl30h-brushless";
    }
  }

  if (identity.includes("dpl60")) {
    if (
      identity.includes("dpl60-24db") ||
      identity.includes("dpl60-brushed") ||
      identity.includes("diaphragm-dpl60-brushed") ||
      identity.includes("dpl60-liquid-diaphragm-pump")
    ) {
      return "dpl60-brushed";
    }

    if (
      identity.includes("dpl60-24bb") ||
      identity.includes("dpl60-brushless") ||
      identity.includes("diaphragm-dpl60-brushless")
    ) {
      return "dpl60-brushless";
    }
  }

  if (identity.includes("dpl30")) {
    if (
      identity.includes("dpl30-24db") ||
      identity.includes("dpl30-brushed") ||
      identity.includes("diaphragm-dpl30-brushed") ||
      identity.includes("dpl30-liquid-diaphragm-pump")
    ) {
      return "dpl30-brushed";
    }

    if (
      identity.includes("dpl30-24bb") ||
      identity.includes("dpl30-brushless") ||
      identity.includes("diaphragm-dpl30-brushless")
    ) {
      return "dpl30-brushless";
    }
  }

  return null;
}

export function getDiaphragmPumpCopy(
  value: unknown,
  locale: SelectionLocale,
) {
  const key = getDiaphragmPumpCopyKey(value);
  const reference = getDiaphragmPumpReferenceFromIdentity(value);
  const baseCopy = key ? DIAPHRAGM_PUMP_COPY[locale]?.[key] || null : null;

  if (!baseCopy || !reference) {
    return baseCopy;
  }

  const localized = reference.localized[locale];
  const categoryCopy = getDiaphragmPumpCategoryCopy(locale);

  return {
    ...baseCopy,
    title: localized.h1,
    breadcrumbs: [
      categoryCopy.home,
      categoryCopy.products,
      categoryCopy.parent,
      reference.model,
    ],
  };
}

export function getDiaphragmPumpSeriesSeoDescription(
  value: unknown,
  locale: SelectionLocale,
  seriesTitle: string,
) {
  const copy = getDiaphragmPumpCopy(value, locale);

  if (!copy) return "";

  const separator = locale === "zh" ? "；" : "; ";
  const titleSeparator = locale === "zh"
    ? "："
    : locale === "fr"
      ? " : "
      : ": ";
  const terminator = locale === "zh" ? "。" : ".";

  const sharedParameters = copy.cardParameters.slice(0, 2);

  return `${seriesTitle}${titleSeparator}${sharedParameters.join(separator)}${terminator}`;
}

function getDiaphragmPumpGallery(
  key: DiaphragmPumpCopyKey,
  data: Record<string, unknown>,
) {
  if (key !== "dpl30-brushed") {
    return null;
  }

  const configuredMainImage =
    typeof data.mainImage === "string" && data.mainImage.trim()
      ? data.mainImage.trim()
      : DPL30_BRUSHED_MAIN_IMAGE;
  const additionalImages = [...DPL30_BRUSHED_DETAIL_IMAGES];

  return {
    mainImage: configuredMainImage,
    image: configuredMainImage,
    imageUrl: configuredMainImage,
    heroImage: configuredMainImage,
    coverImage: configuredMainImage,
    additionalImages,
    galleryImages: [configuredMainImage, ...additionalImages],
  };
}

export function applyDiaphragmPumpDetailCopy<
  T extends Record<string, unknown>,
>(data: T, locale: SelectionLocale): T {
  const key = getDiaphragmPumpCopyKey(data);
  const copy = getDiaphragmPumpCopy(data, locale);

  if (!copy || !key) return data;

  const applications = [copy.applications];
  const faqs = copy.faqs.map((item) => ({ ...item }));
  const gallery = getDiaphragmPumpGallery(key, data);
  const reference = getDiaphragmPumpReferenceFromIdentity(data);

  return {
    ...data,
    name: copy.title,
    title: copy.title,
    model: copy.title,
    productName: copy.title,
    ...(locale !== "zh"
      ? {
          imageAlt: copy.title,
          imageAltEn: copy.title,
          mainImageAlt: copy.title,
        }
      : {}),
    description: reference
      ? `${copy.intro} ${reference.localized[locale].introConditionSentence}`
      : copy.intro,
    commonApplications: applications,
    applications,
    applicationScenarios: applications,
    faqs,
    faq: faqs,
    breadcrumbs: copy.breadcrumbs.map((label) => ({ label })),
    __diaphragmPumpCopyKey: key,
    ...(reference
      ? {
          referenceModel: reference.model,
          modelDisplay: reference.model,
          displayModel: reference.model,
          foreachModel: reference.model,
          modelCode: reference.model,
          seoTitle: reference.localized[locale].seoTitle,
          seoDescription: reference.localized[locale].seoDescription,
        }
      : {}),
    ...(gallery || {}),
  } as T;
}
