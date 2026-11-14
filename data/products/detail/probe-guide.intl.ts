import sampling from "./probe-guide.sampling.intl.json";
import piercing from "./probe-guide.piercing.intl.json";
import wash from "./probe-guide.wash.intl.json";
import mixing from "./probe-guide.mixing.intl.json";
import ui from "./probe-detail-ui.intl.json";
import overview from "./probe-overview.intl.json";
import faq from "./probe-faq.intl.json";
import probeDetails from "../generated/probes/detail/index.json";
import { getProbeGuide, type ProbeGuide } from "./probe-guide.zh";
import type { ProductDetailPageData } from "./product-detail.types";

export type ProbeLocale = "zh" | "en" | "es" | "fr" | "ko" | "ru";
const foreignLocales = ["en", "es", "fr", "ko", "ru"] as const;
const catalog: Record<string, string[]> = { ...sampling, ...piercing, ...wash, ...mixing, ...ui, ...overview, ...faq };

export function probeLocale(value: string): ProbeLocale {
  return foreignLocales.find(locale => locale === value) || "zh";
}

export function probeLang(value: string) {
  const locale = probeLocale(value);
  return locale === "zh" ? "zh-CN" : locale;
}

/** Authored copy only. Customer inputs, model identifiers and files are never translated. */
export function probeText(source: string, localeValue: string, values: Record<string, string> = {}): string {
  const locale = probeLocale(localeValue);
  const text = locale === "zh" ? source : catalog[source]?.[foreignLocales.indexOf(locale)] ?? source;
  return text.replace(/\{(\w+)\}/g, (match, key: string) => values[key] ?? match);
}

export function probeHref(href: string, localeValue: string): string {
  const locale = probeLocale(localeValue);
  return locale !== "zh" && /^\/(?:products|resources|contact)(?:\/|$|[?#])/.test(href)
    ? `/${locale}${href}` : href;
}

/** Keep question IDs, source attribution and ordering shared with the Chinese guide. */
export function getLocalizedProbeGuide(slug: string | undefined, localeValue: string): ProbeGuide | null {
  const guide = getProbeGuide(slug);
  if (!guide || probeLocale(localeValue) === "zh") return guide;
  const t = (text: string) => probeText(text, localeValue);
  return {
    ...guide,
    name: t(guide.name), task: t(guide.task), drawingFocus: t(guide.drawingFocus),
    structureNote: t(guide.structureNote), selectionLead: t(guide.selectionLead),
    questions: guide.questions.map(question => ({
      ...question,
      navLabel: t(question.navLabel), title: t(question.title), answer: t(question.answer),
      paragraphs: question.paragraphs.map(t),
      comparison: question.comparison ? {
        headings: question.comparison.headings.map(t) as [string, string, string],
        rows: question.comparison.rows.map(row => row.map(t) as [string, string, string]),
      } : undefined,
      steps: question.steps?.map(step => ({ title: t(step.title), text: t(step.text) })),
      note: question.note ? t(question.note) : undefined,
      link: question.link ? { label: t(question.link.label), href: probeHref(question.link.href, localeValue) } : undefined,
    })),
  };
}

/** Use complete authored sentences for specs and FAQ; the legacy phrase adapter can lose words. */
export function applyProbeDetailCopy<T extends ProductDetailPageData>(data: T, locale: string): T {
  if (probeLocale(locale) === "zh") return data;
  const source = probeDetails.find(detail => detail.slug === data.slug);
  const guide = getLocalizedProbeGuide(data.slug, locale);
  if (!source || !guide) return data;
  const t = (text: string) => probeText(text, locale);
  const specs = source.specs.map(item => ({ label: t(item.label), value: t(item.value) }));
  const faqs = source.faq.map(item => ({ question: t(item.question), answer: t(item.answer), q: t(item.question), a: t(item.answer) }));
  const title = t(source.bottomCtaTitle);
  const description = t(source.bottomCtaDescription);
  const button = t(source.bottomCtaButtonText);
  const href = probeHref("/contact/", locale);
  return {
    ...data, specs, specifications: specs,
    faqs, faq: faqs, faqItems: faqs, detailFaqs: faqs,
    commonApplications: source.commonApplications.map(t),
    imageAlt: guide.name, imageAltEn: guide.name, mainImageAlt: guide.name,
    additionalImageAlts: data.additionalImageAlts?.map((alt, index) => /[\u3400-\u9fff]/.test(alt) ? `${guide.name} — ${index + 2}` : alt),
    bottomCtaTitle: title, bottomCtaDescription: description, bottomCtaDesc: description,
    bottomCtaButtonText: button, bottomCtaHref: href,
    bottomCta: { title, desc: description, description, button, buttonText: button, href },
    customInquiryTitle: title, customInquiryDescription: description, customInquiryButtonText: button, customInquiryHref: href,
    customInquiryCta: { title, desc: description, description, button, buttonText: button, href },
  };
}
