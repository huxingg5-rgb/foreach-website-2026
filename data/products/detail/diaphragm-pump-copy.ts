import copyJson from "./diaphragm-pump-copy.generated.json";

import type { SelectionLocale } from "@/data/products/selection/product-selection.types";

export type DiaphragmPumpCopyKey =
  | "dpl30-brushed"
  | "dpl30-brushless"
  | "dpl60-brushed"
  | "dpl60-brushless"
  | "dpl30h-brushed"
  | "dpl30h-brushless"
  | "dpgl800-brushless";

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
  const identity = getIdentityText(value);

  if (
    identity.includes("dpgl800") &&
    (
      identity.includes("dpgl800-24bs6") ||
      identity.includes("dpgl800-brushless") ||
      identity.includes("diaphragm-dpgl800-")
    )
  ) {
    return "dpgl800-brushless";
  }

  if (identity.includes("dpl30h")) {
    if (
      identity.includes("dpl30h-24ds") ||
      identity.includes("dpl30h-brushed") ||
      identity.includes("diaphragm-dpl30h-brushed")
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
      identity.includes("diaphragm-dpl60-brushed")
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
      identity.includes("diaphragm-dpl30-brushed")
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

  return key ? DIAPHRAGM_PUMP_COPY[locale]?.[key] || null : null;
}

export function applyDiaphragmPumpDetailCopy<
  T extends Record<string, unknown>,
>(data: T, locale: SelectionLocale): T {
  const key = getDiaphragmPumpCopyKey(data);
  const copy = key ? DIAPHRAGM_PUMP_COPY[locale]?.[key] : null;

  if (!copy) return data;

  const applications = [copy.applications];
  const faqs = copy.faqs.map((item) => ({ ...item }));

  return {
    ...data,
    name: copy.title,
    title: copy.title,
    model: copy.title,
    productName: copy.title,
    description: copy.intro,
    commonApplications: applications,
    applications,
    applicationScenarios: applications,
    faqs,
    faq: faqs,
    breadcrumbs: copy.breadcrumbs.map((label) => ({ label })),
    __diaphragmPumpCopyKey: key,
  } as T;
}
