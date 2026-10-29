import type { Metadata } from "next";
import type { LocaleCode } from "@/lib/i18n";
import { getContactInquiryData } from "@/data/contact-cooperation/inquiry-modal";
import { getFaqCategories } from "./faq-taxonomy.intl";
import { getFaqItems } from "./faq.intl";
import { faqLocales, faqPath, faqTitles, faqUi } from "./faq.ui";

const productOption: Record<string, readonly [number, number]> = {
  piston: [0, 3], diaphragm: [0, 0], syringe: [0, 1], pipetting: [0, 2],
  rotary: [1, 2], solenoid: [1, 0], "high-pressure-valve": [1, 3],
  bubble: [2, 1], pressure: [2, 0], probes: [2, 3], tubing: [2, 3], fittings: [2, 3],
};

// Server-side assembly sends only the active locale to the interactive client.
export function getFaqPageData(locale: LocaleCode) {
  const ui = faqUi[locale];
  const source = getContactInquiryData(locale);
  const contactData = source;
  return {
    locale, ui, title: faqTitles[locale], path: faqPath(locale),
    categories: getFaqCategories(locale), items: getFaqItems(locale), contactData,
    productTypeByCategory: Object.fromEntries(Object.entries(productOption).map(([key, [group, option]]) => [key, source.form.productGroups[group].options[option]])),
    requestTypes: { technical: source.form.requestTypes[2], support: source.form.requestTypes[4] },
  };
}
export type FaqPageData = ReturnType<typeof getFaqPageData>;

export function getFaqMetadata(locale: LocaleCode): Metadata {
  const title = `${faqTitles[locale]} | FOREACH`;
  const description = faqUi[locale].description;
  return {
    title: { absolute: title }, description,
    alternates: {
      canonical: faqPath(locale),
      languages: { ...Object.fromEntries(faqLocales.map(code => [code, faqPath(code)])), "x-default": faqPath("zh-CN") },
    },
    openGraph: { title, description, url: faqPath(locale), type: "website" },
    twitter: { card: "summary", title, description },
  };
}
