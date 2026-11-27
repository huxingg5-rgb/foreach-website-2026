import type { GermanProductDetailContent } from "./product-detail-content.de";
import copy from "./diaphragm-pump-content.de.json";

const german: Readonly<Record<string, string>> = copy;

export function germanDiaphragmText(text: string) {
  return Object.hasOwn(german, text) ? german[text] : text;
}

export function translateGermanDiaphragmCopy<T>(value: T): T {
  if (typeof value === "string") return germanDiaphragmText(value) as T;
  if (Array.isArray(value)) return value.map(translateGermanDiaphragmCopy) as T;
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, translateGermanDiaphragmCopy(item)])) as T;
  }
  return value;
}

const localizedFields = [
  "title", "name", "model", "productName", "productTypeName", "description", "applications", "commonApplications",
  "applicationScenarios", "applicationDetails", "imageAlt", "imageAltEn", "mainImageAlt", "additionalImageAlts",
  "specifications", "specs", "specList", "technicalSpecifications", "specGroups", "faqs", "faq",
  "breadcrumbs", "metaTitle", "metaDescription", "seoTitle", "seoDescription",
] as const;

export function localizeGermanDiaphragmData<T extends Record<string, unknown>>(data: T): T {
  const translated = { ...data } as Record<string, unknown>;
  for (const field of localizedFields) {
    if (data[field] !== undefined) translated[field] = translateGermanDiaphragmCopy(data[field]);
  }
  return translated as T;
}

export function getGermanDiaphragmDetailContent(data: ReturnType<typeof localizeGermanDiaphragmData>): GermanProductDetailContent {
  return {
    title: String(data.name ?? data.title),
    description: String(data.description),
    imageAlt: String(data.imageAlt ?? data.name),
    faqs: data.faqs as GermanProductDetailContent["faqs"],
    bottomCta: {
      title: "Benötigen Sie Unterstützung bei der Auswahl einer Membranpumpe?",
      description: "Geben Sie Medium, Volumenstrom, Druck, Anforderungen an das Selbstansaugen, medienberührte Werkstoffe, Anschlusstyp und Einbauraum an. Das FOREACH-Engineeringteam unterstützt Sie bei der Auswahl einer passenden Ausführung.",
      buttonText: "Technische Beratung anfragen",
      href: "/de/contact/",
    },
  };
}
