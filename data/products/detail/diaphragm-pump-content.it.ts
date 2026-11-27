import type { GermanProductDetailContent } from "./product-detail-content.de";
import { italianProductDetailText } from "./product-detail.it";
import content from "./diaphragm-pump-content.it.json";
import ui from "./diaphragm-pump-ui.it.json";

const italianContent: Readonly<Record<string, string>> = content;
const italianUi: Readonly<Record<string, string>> = ui;

export const italianDiaphragmDetailSlugs = [
  "dpl30-liquid-diaphragm-pump", "dpl30-db", "dpl30-bb",
  "dpl60-liquid-diaphragm-pump", "dpl60-db", "dpl60-bb",
  "dpl30h-liquid-diaphragm-pump", "dpl30h-ds", "dpl30h-bs",
  "dpgl800-gas-liquid-diaphragm-pump", "dpgl800-bs",
];

export function italianDiaphragmText(text: string) {
  return italianContent[text] ?? italianUi[text.trim()] ?? italianProductDetailText(text);
}

export function translateItalianDiaphragmCopy<T>(value: T): T {
  if (typeof value === "string") return italianDiaphragmText(value) as T;
  if (Array.isArray(value)) return value.map(translateItalianDiaphragmCopy) as T;
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, translateItalianDiaphragmCopy(item)])) as T;
  }
  return value;
}

const localizedFields = [
  "title", "name", "productName", "productTypeName", "description", "applications", "commonApplications",
  "applicationScenarios", "applicationDetails", "imageAlt", "imageAltEn", "mainImageAlt", "additionalImageAlts",
  "specifications", "specs", "specList", "technicalSpecifications", "specGroups", "faqs", "faq",
  "breadcrumbs", "metaTitle", "metaDescription", "seoTitle", "seoDescription",
] as const;

export function localizeItalianDiaphragmData<T extends Record<string, unknown>>(data: T): T {
  const localized = { ...data } as Record<string, unknown>;
  for (const field of localizedFields) {
    if (data[field] !== undefined) localized[field] = translateItalianDiaphragmCopy(data[field]);
  }
  return localized as T;
}

export function getItalianDiaphragmDetailContent(data: Record<string, unknown>): GermanProductDetailContent {
  const localized = localizeItalianDiaphragmData(data);
  return {
    title: String(localized.name ?? localized.title),
    description: String(localized.description),
    imageAlt: String(localized.imageAlt ?? localized.name),
    faqs: localized.faqs as GermanProductDetailContent["faqs"],
    bottomCta: {
      title: "Vi serve aiuto per scegliere una pompa a membrana?",
      description: "Indicate fluido, portata, pressione, requisiti di autoadescamento, materiali a contatto con il fluido, tipo di attacco e spazio di montaggio. Il team tecnico FOREACH vi aiuterà a scegliere la configurazione.",
      buttonText: "Contatta il team tecnico",
      href: "/it/contact/",
    },
  };
}
