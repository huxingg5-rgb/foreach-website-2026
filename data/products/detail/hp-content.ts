import type { ProductApplicationsContent, ProductDetailFaqItem, ProductSpecItem } from "./product-detail.types";
import { getHpValveIntro } from "../selection/hp-valve-intro";
import type { SelectionLocale } from "../selection/product-selection.types";
import en from "./hp-locales/en.json";
import es from "./hp-locales/es.json";
import fr from "./hp-locales/fr.json";
import ko from "./hp-locales/ko.json";
import ru from "./hp-locales/ru.json";
import de from "./hp-locales/de.json";
import it from "./hp-locales/it.json";
import hi from "./hp-locales/hi.json";

type HpDetailCopy = {
  description: string;
  commonApplications: string[];
  applicationDetails: ProductApplicationsContent;
  faqs: ProductDetailFaqItem[];
  specs: ProductSpecItem[];
  bottomCta: { title: string; description: string; buttonText: string };
};

// Translations of the reviewed HP Chinese detail copy, including its limits.
// Keep complete narratives out of the generic word-by-word translator.
type HpCopyLocale = Exclude<SelectionLocale, "zh"> | "de" | "it" | "hi";
const copies: Record<HpCopyLocale, HpDetailCopy> = { en, es, fr, ko, ru, de, it, hi };
export const germanHpValveCopy = copies.de;
export const italianHpValveCopy = copies.it;
export const hindiHpValveCopy = copies.hi;

export function applyHpValveDetailCopy<T extends Record<string, any>>(data: T, locale: string): T {
  if (!data.hpAuthoredContent || locale === "zh" || !(locale in copies)) return data;
  const language = locale as HpCopyLocale;
  const copy = copies[language];
  const faqs = copy.faqs.map(item => ({ ...item, q: item.question, a: item.answer, title: item.question, content: item.answer }));
  return {
    ...data,
    description: copy.description,
    summary: copy.description,
    overview: copy.description,
    commonApplications: copy.commonApplications,
    applicationDetails: copy.applicationDetails,
    imageAlt: getHpValveIntro(language).image.alt,
    specs: copy.specs,
    bottomCtaTitle: copy.bottomCta.title,
    bottomCtaDescription: copy.bottomCta.description,
    bottomCtaButtonText: copy.bottomCta.buttonText,
    bottomCtaHref: `/${language}/contact/`,
    faqs, faq: faqs, faqItems: faqs, faqList: faqs, detailFaqs: faqs,
  };
}
