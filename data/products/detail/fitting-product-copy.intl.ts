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

export function getFittingModelTopic(data: DetailRecord, locale: string) {
  if ((locale !== "zh" && locale !== "en") || !isFittingProductCopyData(data)) return undefined;
  const model = String(data.foreachModel || data.model || "");
  const en = locale === "en";

  if (model === "F-PE-60-32-PP-N" || model === "F-PE-100-32-PP-N") {
    const grade = model === "F-PE-60-32-PP-N" ? "40–60 μm" : "80–100 μm";
    return {
      title: en ? "Inline Liquid Filter for Instrument Fluidics" : "仪器液路管路过滤器",
      description: en
        ? `${model} captures particles using ${grade} HDPE filter media in a PP housing. Both barbs fit 3.2 mm ID tubing. Check pressure drop at the required flow rate.`
        : `${model} 采用 ${grade} HDPE 滤材和 PP 壳体，用于拦截仪器液路中的颗粒。两端适配 3.2 mm 内径软管，选型时核对目标流量下的压降。`,
    };
  }
  if (model === "CV-BE-32-PP-N") {
    return {
      title: en ? "Barbed Diaphragm Check Valve" : "软管倒刺膜片式单向阀",
      description: en
        ? `${model} limits reverse flow with an EPDM diaphragm in a PP housing. Both barbs fit 3.2 mm ID tubing. Follow the flow arrow and verify forward opening and reverse sealing in the installed line.`
        : `${model} 采用 PP 壳体和 EPDM 膜片，限制液体反向流动。两端适配 3.2 mm 内径软管。按箭头方向安装，并核对实际液路的正向开启与反向密封。`,
    };
  }
  if (model === "PMU-M12-U28-20-PP-N") {
    return {
      title: en ? "Female-Threaded Bulkhead Union" : "穿板二通内螺纹接头",
      description: en
        ? `${model} connects two threaded fluid lines through an instrument panel. It uses M12×1.5 mounting threads, two 1/4-28 UNF female fluid ports and a 2.0 mm bore.`
        : `${model} 用于固定穿过仪器面板的螺纹液路。采用 M12×1.5 安装螺纹，两端液路接口均为 1/4-28 UNF 内螺纹，内部通径为 2.0 mm。`,
    };
  }
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
