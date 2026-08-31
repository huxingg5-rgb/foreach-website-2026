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

const PRODUCT_TYPE_SPEC_LABELS = new Set([
  "产品类型",
  "产品种类",
  "Product Type",
  "Tipo de producto",
  "Type de produit",
  "제품 유형",
  "Тип продукта",
]);

const MINIATURE_PRODUCT_TYPE_COPY: Record<
  SelectionLocale,
  Record<"liquid" | "highPressure" | "gasLiquid", string>
> = {
  zh: {
    liquid: "微型液体隔膜泵",
    highPressure: "高压微型液体隔膜泵",
    gasLiquid: "微型气液混合隔膜泵",
  },
  en: {
    liquid: "Miniature Liquid Diaphragm Pump",
    highPressure: "High-Pressure Miniature Liquid Diaphragm Pump",
    gasLiquid: "Miniature Gas-Liquid Diaphragm Pump",
  },
  es: {
    liquid: "Bomba de diafragma en miniatura para líquidos",
    highPressure: "Bomba de diafragma en miniatura de alta presión para líquidos",
    gasLiquid: "Bomba de diafragma en miniatura para gas y líquido",
  },
  fr: {
    liquid: "Pompe à membrane miniature pour liquides",
    highPressure: "Pompe à membrane miniature haute pression pour liquides",
    gasLiquid: "Pompe à membrane miniature pour gaz et liquide",
  },
  ko: {
    liquid: "소형 액체 다이어프램 펌프",
    highPressure: "고압 소형 액체 다이어프램 펌프",
    gasLiquid: "소형 기액 혼합 다이어프램 펌프",
  },
  ru: {
    liquid: "Миниатюрный жидкостный мембранный насос",
    highPressure: "Миниатюрный жидкостный мембранный насос высокого давления",
    gasLiquid: "Миниатюрный газожидкостный мембранный насос",
  },
};

function getMiniatureProductType(
  key: DiaphragmPumpCopyKey,
  locale: SelectionLocale,
) {
  const kind = key === "dpgl800-brushless"
    ? "gasLiquid"
    : key.startsWith("dpl30h-")
      ? "highPressure"
      : "liquid";

  return MINIATURE_PRODUCT_TYPE_COPY[locale][kind];
}

function normalizeMiniatureDiaphragmPumpTerm(
  value: string,
  locale: SelectionLocale,
) {
  if (locale === "zh") {
    return value
      .replace(/高压液体隔膜泵/g, "高压微型液体隔膜泵")
      .replace(/(?<!微型)液体隔膜泵/g, "微型液体隔膜泵")
      .replace(/(?<!微型)气液混合隔膜泵/g, "微型气液混合隔膜泵");
  }

  if (locale === "en") {
    return value
      .replace(/(?<!Miniature )Gas-Liquid Diaphragm Pump/g, "Miniature Gas-Liquid Diaphragm Pump")
      .replace(/(?<!miniature )gas-liquid diaphragm pump/g, "miniature gas-liquid diaphragm pump")
      .replace(/High-Pressure Liquid Diaphragm Pump/g, "High-Pressure Miniature Liquid Diaphragm Pump")
      .replace(/high-pressure liquid diaphragm pump/g, "high-pressure miniature liquid diaphragm pump")
      .replace(/(?<!Miniature )(?<!Gas-)Liquid Diaphragm Pump/g, "Miniature Liquid Diaphragm Pump")
      .replace(/(?<!miniature )(?<!gas-)liquid diaphragm pump/g, "miniature liquid diaphragm pump");
  }

  if (locale === "es") {
    return value
      .replace(/Bomba de diafragma(?! en miniatura)/g, "Bomba de diafragma en miniatura")
      .replace(/bomba de diafragma(?! en miniatura)/g, "bomba de diafragma en miniatura");
  }

  if (locale === "fr") {
    return value
      .replace(/Pompe à membrane(?! miniature)/g, "Pompe à membrane miniature")
      .replace(/pompe à membrane(?! miniature)/g, "pompe à membrane miniature");
  }

  if (locale === "ko") {
    return value
      .replace(/고압 액체 다이어프램 펌프/g, "고압 소형 액체 다이어프램 펌프")
      .replace(/(?<!소형 )액체 다이어프램 펌프/g, "소형 액체 다이어프램 펌프")
      .replace(/기체 및 기액 혼합용 다이어프램 펌프/g, "소형 기액 혼합 다이어프램 펌프")
      .replace(/(?<!소형 )기액 혼합 다이어프램 펌프/g, "소형 기액 혼합 다이어프램 펌프")
      .replace(/브러시리스 다이어프램 펌프/g, "브러시리스 소형 기액 혼합 다이어프램 펌프");
  }

  return value
    .replace(
      /Высоконапорный жидкостный мембранный насос/g,
      "Миниатюрный жидкостный мембранный насос высокого давления",
    )
    .replace(
      /высоконапорный жидкостный мембранный насос/g,
      "миниатюрный жидкостный мембранный насос высокого давления",
    )
    .replace(
      /(?<![Мм]иниатюрный )[Жж]идкостный мембранный насос/g,
      (match) => match.startsWith("Ж")
        ? "Миниатюрный жидкостный мембранный насос"
        : "миниатюрный жидкостный мембранный насос",
    )
    .replace(
      /Бесщёточный мембранный насос серии DPGL800 для газа и газожидкостных смесей/g,
      "Миниатюрный газожидкостный мембранный насос серии DPGL800 с бесщёточным двигателем",
    )
    .replace(
      /Бесщёточный мембранный насос FOREACH серии DPGL800/g,
      "Миниатюрный газожидкостный мембранный насос FOREACH серии DPGL800 с бесщёточным двигателем",
    )
    .replace(
      /(?<![Мм]иниатюрный )[Гг]азожидкостный мембранный насос/g,
      (match) => match.startsWith("Г")
        ? "Миниатюрный газожидкостный мембранный насос"
        : "миниатюрный газожидкостный мембранный насос",
    );
}

function normalizeDiaphragmPumpCopy(
  copy: DiaphragmPumpCopy,
  locale: SelectionLocale,
): DiaphragmPumpCopy {
  const normalize = (value: string) =>
    normalizeMiniatureDiaphragmPumpTerm(value, locale);

  return {
    ...copy,
    title: normalize(copy.title),
    intro: normalize(copy.intro),
    breadcrumbs: copy.breadcrumbs.map(normalize),
    faqs: copy.faqs.map((item) => ({
      question: normalize(item.question),
      answer: normalize(item.answer),
    })),
  };
}

function normalizeProductTypeSpecs(value: unknown, productType: string) {
  if (!Array.isArray(value)) return value;

  return value.map((item) => {
    if (!item || typeof item !== "object") return item;

    const record = item as Record<string, unknown>;
    const label = String(record.label || record.parameter || record.name || "");

    return PRODUCT_TYPE_SPEC_LABELS.has(label)
      ? { ...record, value: productType }
      : item;
  });
}

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
  const sourceCopy = key ? DIAPHRAGM_PUMP_COPY[locale]?.[key] || null : null;
  const baseCopy = sourceCopy
    ? normalizeDiaphragmPumpCopy(sourceCopy, locale)
    : null;

  if (!baseCopy) return null;

  const categoryCopy = getDiaphragmPumpCategoryCopy(locale);

  if (!reference) {
    return {
      ...baseCopy,
      breadcrumbs: [
        categoryCopy.home,
        categoryCopy.products,
        categoryCopy.parent,
        baseCopy.title,
      ],
    };
  }

  const localized = reference.localized[locale];

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
  const categoryCopy = getDiaphragmPumpCategoryCopy(locale);
  const productType = getMiniatureProductType(key, locale);
  const specs = normalizeProductTypeSpecs(data.specs, productType);
  const specifications = normalizeProductTypeSpecs(
    data.specifications,
    productType,
  );
  const specList = normalizeProductTypeSpecs(data.specList, productType);
  const technicalSpecifications = normalizeProductTypeSpecs(
    data.technicalSpecifications,
    productType,
  );

  return {
    ...data,
    name: copy.title,
    title: copy.title,
    model: copy.title,
    productName: copy.title,
    productTypeName: categoryCopy.parent,
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
    ...(Array.isArray(data.specs) ? { specs } : {}),
    ...(Array.isArray(data.specifications) ? { specifications } : {}),
    ...(Array.isArray(data.specList) ? { specList } : {}),
    ...(Array.isArray(data.technicalSpecifications)
      ? { technicalSpecifications }
      : {}),
    __diaphragmPumpCopyKey: key,
    ...(reference
      ? {
          referenceModel: reference.model,
          modelDisplay: reference.model,
          displayModel: reference.model,
          foreachModel: reference.model,
          modelCode: reference.model,
          seoTitle: normalizeMiniatureDiaphragmPumpTerm(
            reference.localized[locale].seoTitle,
            locale,
          ),
          seoDescription: normalizeMiniatureDiaphragmPumpTerm(
            reference.localized[locale].seoDescription,
            locale,
          ),
        }
      : {}),
    ...(gallery || {}),
  } as T;
}
