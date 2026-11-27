import { applyPipettingPumpIntroduction } from "./pipetting-pump-introductions.locales";
import { applyPipettingPumpFaq } from "./pipetting-pump-faq.locales";
import { localizeProductDetailData } from "./product-detail.intl";
import copy from "./pipetting-pump-content.de.json";
import type { GermanProductDetailContent } from "./product-detail-content.de";

const german: Readonly<Record<string, string>> = copy;
export function germanPipettingText(value: string): string {
  return german[value] ?? value;
}
function translate(value: unknown): unknown {
  if (typeof value === "string") return germanPipettingText(value);
  if (Array.isArray(value)) return value.map(translate);
  if (value && typeof value === "object") return Object.fromEntries(Object.entries(value).map(([key, text]) => [key, translate(text)]));
  return value;
}

const fields = [
  "h1Title", "name", "title", "productName", "model", "specs", "specifications", "specList", "technicalSpecifications",
  "specificationGroups", "pipettingIntroductionParagraphs", "commonApplications", "applicationDetails", "faqs", "faq",
  "faqItems", "faqList", "detailFaqs", "imageAlt", "imageAltEn", "mainImageAlt", "additionalImageAlts",
] as const;

export function getGermanPipettingDetail(data: Record<string, any>) {
  const english = applyPipettingPumpFaq(applyPipettingPumpIntroduction(localizeProductDetailData(data), "en"), "en");
  if (!english.h1Title || !english.pipettingIntroductionParagraphs) return undefined;
  const detail = { ...english, __locale: "de" } as Record<string, any>;
  for (const field of fields) if (english[field] !== undefined) detail[field] = translate(english[field]);
  const title = detail.h1Title;
  detail.description = detail.pipettingIntroductionParagraphs.join("\n\n");
  const presentation: GermanProductDetailContent = {
    title,
    description: detail.description,
    imageAlt: detail.imageAlt,
    faqs: detail.faqs,
    bottomCta: {
      title: "Pipettiermodule für Ihr automatisiertes System",
      description: "Geben Sie Arbeitsvolumina, Flüssigkeiten, Pipettenspitzen, Gefäße, Erkennungsbedarf, Kommunikationsschnittstelle und den verfügbaren Einbauraum an. Das FOREACH-Engineeringteam unterstützt Sie bei der Auswahl einer passenden Konfiguration.",
      buttonText: "Technische Beratung anfragen",
      href: "/de/contact/",
    },
  };
  return { data: detail, presentation };
}
