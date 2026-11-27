import type { Metadata } from "next";
import type { LocaleCode } from "@/lib/i18n";
import { getContactInquiryData } from "@/data/contact-cooperation/inquiry-modal";
import { getFaqCategories } from "./faq-taxonomy.intl";
import { getFaqItems } from "./faq.intl";
import { faqLocales, faqPath, faqTitles, faqUi } from "./faq.ui";
import { germanFaqCopy, germanFaqTitle, germanFaqUi } from "./faq.de";
import { hindiFaqCopy, hindiFaqTitle, hindiFaqUi } from "./faq.hi";
import { italianFaqCopy, italianFaqTitle, italianFaqUi } from "./faq.it";
import { getDraftHrefForEnglish, getHindiDraftLink, getItalianDraftLink, hindiEnglishFallbackSuffix, isLocalizedGermanDraftPath, italianEnglishFallbackSuffix } from "@/lib/i18n/draft-languages";
import { germanFittingDraftPathPattern } from "@/data/products/detail/german-fitting-draft-routes";

const productOption: Record<string, readonly [number, number]> = {
  piston: [0, 3], diaphragm: [0, 0], syringe: [0, 1], pipetting: [0, 2],
  rotary: [1, 2], solenoid: [1, 0], "high-pressure-valve": [1, 3],
  bubble: [2, 1], pressure: [2, 0], probes: [2, 3], tubing: [2, 3], fittings: [2, 3],
};

// Server-side assembly sends only the active locale to the interactive client.
export function getFaqPageData(locale: LocaleCode | "de" | "it" | "hi") {
  const ui = locale === "de" ? germanFaqUi : locale === "it" ? italianFaqUi : locale === "hi" ? hindiFaqUi : faqUi[locale];
  const source = getContactInquiryData(locale);
  const contactData = source;
  const categories = getFaqCategories(locale);
  const items = locale === "de" || locale === "it" || locale === "hi" ? getFaqItems("en").map(item => {
    const copy = (locale === "de" ? germanFaqCopy : locale === "it" ? italianFaqCopy : hindiFaqCopy)[item.id];
    if (!copy) throw new Error("Missing FAQ translation: " + locale + "/" + item.id);
    const [question, ...answer] = copy;
    const category = categories.find(group => group.key === item.category)!;
    const child = category.children.find(group => group.key === item.subcategory)!;
    return {
      ...item, question, answer, tags: [category.label, child.label],
      links: item.links.map(link => {
        const draftHref = getDraftHrefForEnglish(link.href, "de");
        const label = link.href === "/en/contact/" ? ui.contact : ui.readMore;
        if (locale === "it") {
          const translated = getItalianDraftLink(link.href);
          return {
            href: translated.href,
            hrefLang: translated.hrefLang,
            label: label + (translated.hrefLang === "en" ? italianEnglishFallbackSuffix : ""),
          };
        }
        if (locale === "hi") {
          const translated = getHindiDraftLink(link.href);
          return {
            href: translated.href,
            hrefLang: translated.hrefLang,
            label: label + (translated.hrefLang === "en" ? hindiEnglishFallbackSuffix : ""),
          };
        }
        if (isLocalizedGermanDraftPath(draftHref.split(/[?#]/, 1)[0], germanFittingDraftPathPattern)) {
          return { href: draftHref, label };
        }
        return { href: link.href, label: `${label} (Englisch)`, hrefLang: "en" };
      }),
    };
  }) : getFaqItems(locale);
  return {
    locale, ui, title: locale === "de" ? germanFaqTitle : locale === "it" ? italianFaqTitle : locale === "hi" ? hindiFaqTitle : faqTitles[locale], path: locale === "de" || locale === "it" || locale === "hi" ? "/" + locale + "/resources/faq/" : faqPath(locale),
    categories, items, contactData,
    productTypeByCategory: Object.fromEntries(Object.entries(productOption).map(([key, [group, option]]) => [key, source.form.productGroups[group].options[option]])),
    requestTypes: { technical: source.form.requestTypes[2], support: source.form.requestTypes[4] },
  };
}
export type FaqPageData = ReturnType<typeof getFaqPageData>;

export function getFaqMetadata(locale: LocaleCode | "de" | "it" | "hi"): Metadata {
  if (locale === "hi") {
    const title = hindiFaqTitle + " | FOREACH";
    const description = hindiFaqUi.description;
    const url = "/hi/resources/faq/";
    return {
      title: { absolute: title }, description,
      alternates: { canonical: url }, robots: { index: false },
      openGraph: { title, description, url, locale: "hi_IN", type: "website" },
      twitter: { card: "summary", title, description },
    };
  }
  if (locale === "de") {
    const title = `${germanFaqTitle} | FOREACH`;
    const description = germanFaqUi.description;
    const url = "/de/resources/faq/";
    return {
      title: { absolute: title }, description,
      alternates: { canonical: url }, robots: { index: false },
      openGraph: { title, description, url, locale: "de_DE", type: "website" },
      twitter: { card: "summary", title, description },
    };
  }
  if (locale === "it") {
    const title = italianFaqTitle + " | FOREACH";
    const description = italianFaqUi.description;
    const url = "/it/resources/faq/";
    return {
      title: { absolute: title }, description,
      alternates: { canonical: url }, robots: { index: false },
      openGraph: { title, description, url, locale: "it_IT", type: "website" },
      twitter: { card: "summary", title, description },
    };
  }
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
