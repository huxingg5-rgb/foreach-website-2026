import { applyPipettingPumpIntroduction } from "./pipetting-pump-introductions.locales";
import { applyPipettingPumpFaq } from "./pipetting-pump-faq.locales";
import { localizeProductDetailData } from "./product-detail.intl";
import copy from "./pipetting-pump-content.it.json";
import type { GermanProductDetailContent } from "./product-detail-content.de";

const italian: Readonly<Record<string, string>> = copy;

export function italianPipettingText(value: string): string {
  return italian[value] ?? value;
}

function translate(value: unknown): unknown {
  if (typeof value === "string") return italianPipettingText(value);
  if (Array.isArray(value)) return value.map(translate);
  if (value && typeof value === "object") return Object.fromEntries(Object.entries(value).map(([key, text]) => [key, translate(text)]));
  return value;
}

const fields = [
  "h1Title", "name", "title", "productName", "specs", "specifications", "specList", "technicalSpecifications",
  "specificationGroups", "pipettingIntroductionParagraphs", "commonApplications", "applicationDetails", "faqs", "faq",
  "faqItems", "faqList", "detailFaqs", "imageAlt", "imageAltEn", "mainImageAlt", "additionalImageAlts",
] as const;

export function getItalianPipettingDetail(data: Record<string, any>) {
  const english = applyPipettingPumpFaq(applyPipettingPumpIntroduction(localizeProductDetailData(data), "en"), "en");
  if (!english.h1Title || !english.pipettingIntroductionParagraphs) return undefined;
  const detail: Record<string, any> = { ...english, __locale: "it" };
  for (const field of fields) if (english[field] !== undefined) detail[field] = translate(english[field]);
  detail.description = detail.pipettingIntroductionParagraphs.join("\n\n");
  detail.summary = detail.description;
  detail.overview = detail.description;
  const presentation: GermanProductDetailContent = {
    title: detail.h1Title,
    description: detail.description,
    imageAlt: detail.imageAlt,
    faqs: detail.faqs,
    bottomCta: {
      title: "Moduli di pipettaggio per il vostro sistema automatizzato",
      description: "Indicate volumi di lavoro, liquidi, puntali, recipienti, esigenze di rilevamento, interfaccia di comunicazione e spazio disponibile per il montaggio. Il team tecnico FOREACH vi aiuterà a scegliere una configurazione adatta.",
      buttonText: "Invia una richiesta di personalizzazione",
      href: "/it/contact/",
    },
  };
  return { data: detail, presentation };
}
