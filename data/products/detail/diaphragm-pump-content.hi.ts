import type { GermanProductDetailContent } from "./product-detail-content.de";
import { hindiProductDetailText } from "./product-detail.hi";
import content from "./diaphragm-pump-content.hi.json";

const hindiContent: Readonly<Record<string, string>> = content;

export function hindiDiaphragmText(text: string) {
  return hindiContent[text] ?? hindiContent[text.trim()] ?? hindiProductDetailText(text);
}

export function translateHindiDiaphragmCopy<T>(value: T): T {
  if (typeof value === "string") return hindiDiaphragmText(value) as T;
  if (Array.isArray(value)) return value.map(translateHindiDiaphragmCopy) as T;
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, translateHindiDiaphragmCopy(item)])) as T;
  }
  return value;
}

const localizedFields = [
  "title", "name", "productName", "productTypeName", "description", "applications", "commonApplications",
  "applicationScenarios", "applicationDetails", "imageAlt", "imageAltEn", "mainImageAlt", "additionalImageAlts",
  "specifications", "specs", "specList", "technicalSpecifications", "specGroups", "faqs", "faq",
  "breadcrumbs", "metaTitle", "metaDescription", "seoTitle", "seoDescription",
] as const;

export function localizeHindiDiaphragmData<T extends Record<string, unknown>>(data: T): T {
  const localized = { ...data } as Record<string, unknown>;
  for (const field of localizedFields) {
    if (data[field] !== undefined) localized[field] = translateHindiDiaphragmCopy(data[field]);
  }
  return localized as T;
}

export function getHindiDiaphragmDetailContent(data: Record<string, unknown>): GermanProductDetailContent {
  const localized = localizeHindiDiaphragmData(data);
  return {
    title: String(localized.name ?? localized.title),
    description: String(localized.description),
    imageAlt: String(localized.imageAlt ?? localized.name),
    faqs: localized.faqs as GermanProductDetailContent["faqs"],
    bottomCta: {
      title: "डायफ्राम पंप चुनने में मदद चाहिए?",
      description: "द्रव, प्रवाह दर, दाब, सेल्फ-प्राइमिंग की ज़रूरत, द्रव के संपर्क वाली सामग्री, पोर्ट का प्रकार और माउंटिंग की जगह बताएँ। FOREACH की तकनीकी टीम कॉन्फ़िगरेशन चुनने में आपकी मदद करेगी।",
      buttonText: "तकनीकी टीम से संपर्क करें",
      href: "/hi/contact/",
    },
  };
}
