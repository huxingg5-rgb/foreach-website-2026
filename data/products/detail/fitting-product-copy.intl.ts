import { fittingProductCopyRows } from "./fitting-product-copy.rows";
import { getFittingTypeName } from "./fitting-image-copy";
import { fittingLocale, fittingText } from "./fitting-ui.intl";

type DetailRecord = Record<string, unknown>;
const languageIndex = { zh: 0, en: 1, es: 2, fr: 3, ko: 4, ru: 5 } as const;
const hasChinese = (value: string) => /[\u3400-\u9fff]/.test(value);
const exact = new Map(fittingProductCopyRows.map(row => [row[0], row]));
const templates = fittingProductCopyRows
  .filter(row => /\{\d+\}/.test(row[0]))
  .sort((a, b) => b[0].replace(/\{\d+\}/g, "").length - a[0].replace(/\{\d+\}/g, "").length)
  .map(row => {
    const slots: number[] = [];
    const pattern = row[0].split(/(\{\d+\})/).map(part => {
      const slot = /^\{(\d+)\}$/.exec(part);
      if (slot) { slots.push(Number(slot[1])); return "(.+?)"; }
      return part.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    }).join("");
    return { row, slots, pattern: new RegExp(`^${pattern}$`) };
  });

/** Sentence-level authored messages, not word substitution. Unknown source text
 * remains visible to the coverage audit instead of silently losing its facts. */
export function fittingProductText(value: string, localeValue: string): string {
  const locale = fittingLocale(localeValue);
  if (locale === "zh" || !hasChinese(value)) return value;
  const source = value.trim().replace(/\s+/g, " ").replace("主体材质为 ", "主体材质为");
  const row = exact.get(source);
  if (row) return row[languageIndex[locale]];
  const typeName = getFittingTypeName(source, locale);
  if (typeName) return typeName;
  const sentences = source.match(/[^。！？]+[。！？]?/g) || [];
  if (sentences.length > 1) return sentences.map(sentence => fittingProductText(sentence, locale)).join(" ");
  for (const { row, slots, pattern } of templates) {
    const match = pattern.exec(source);
    if (!match) continue;
    const values = new Map(slots.map((slot, index) => [slot, fittingProductText(match[index + 1], locale)]));
    const translated = row[languageIndex[locale]].replace(/\{(\d+)\}/g, (_, slot: string) => values.get(Number(slot)) || "");
    // Equal-size and elbow descriptors share a source message with reducing
    // versions; choose the English article after the localized name is known.
    return locale === "en" ? translated.replace(/\bis a (?=equal\b|elbow\b)/g, "is an ") : translated;
  }
  return fittingText(value, locale);
}

export function isFittingProductCopyData(data: DetailRecord): boolean {
  return data.category === "fittings" || data.categoryId === "fittings";
}

/** sourceData is always the Chinese catalog record; localizedData supplies the
 * existing specification, breadcrumb and resource adapters. Never translate IDs. */
export function applyFittingProductCopy<T extends DetailRecord>(sourceData: T, localizedData: T, localeValue: string): T {
  const locale = fittingLocale(localeValue);
  if (locale === "zh" || !isFittingProductCopyData(sourceData)) return localizedData;
  const translate = (value: unknown): unknown => {
    if (typeof value === "string") return fittingProductText(value, locale);
    if (Array.isArray(value)) return value.map(translate);
    if (value && typeof value === "object") return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, key === "href" ? item : translate(item)]));
    return value;
  };
  const result: DetailRecord = { ...localizedData, __locale: locale };
  for (const key of ["description", "shortDescription", "heroDescription", "name", "title", "displayName", "productName", "productTypeName", "seriesName", "advantages", "commonApplications", "faqs", "faq", "faqItems", "bottomCta", "customInquiryCta"]) {
    if (sourceData[key] !== undefined) result[key] = translate(sourceData[key]);
  }
  const faqs = result.faqs || result.faq;
  if (faqs) result.faqs = result.faq = faqs;
  const cta = result.bottomCta && typeof result.bottomCta === "object" ? result.bottomCta as Record<string, unknown> : null;
  if (cta) {
    cta.href = `/${locale}/contact/`;
    Object.assign(result, {
      bottomCtaTitle: cta.title, bottomCtaDescription: cta.description, bottomCtaDesc: cta.description,
      bottomCtaButtonText: cta.buttonText, bottomCtaButton: cta.buttonText, bottomCtaHref: cta.href,
      customInquiryTitle: cta.title, customInquiryDescription: cta.description,
      customInquiryButtonText: cta.buttonText, customInquiryHref: cta.href,
    });
  }
  const model = String(sourceData.foreachModel || sourceData.model || "");
  const name = String(result.productName || result.name || "");
  const seo = { ...(localizedData.seo && typeof localizedData.seo === "object" ? localizedData.seo : {}), title: `${model} ${name} | FOREACH`, description: String(result.description || "") };
  result.seo = seo;
  result.seoTitle = seo.title;
  result.seoDescription = seo.description;
  // Fallback ALT for fitting types outside the existing photo registry.
  result.imageAlt = result.mainImageAlt = `${model} ${name}`;
  return result as T;
}
