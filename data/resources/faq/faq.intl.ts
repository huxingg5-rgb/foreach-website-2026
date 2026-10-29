import type { LocaleCode } from "@/lib/i18n";
import { getLanguageHref } from "@/lib/i18n/language-switch";
import { reviewedFaqItems, getChineseFaqItems } from "./faq.zh";
import { getFaqCategories } from "./faq-taxonomy.intl";
import { faqSupplements } from "./faq-supplement.locales";
import { faqUi } from "./faq.ui";
import type { FaqItem, ReviewedFaqItem } from "./faq.types";
import { getEaPumpContent } from "@/data/products/detail/applications/ea-pump-content";
import { getPistonPumpLocalizedContent } from "@/data/products/detail/applications/piston-pump-locales";
import { dpl30ArticleFaqCopy } from "../technical-articles/dpl30-liquid-diaphragm-pump.faq";
import { syringePumpFaqLocales } from "@/data/products/detail/syringe-pump-faq.locales";
import { getPipettingFaqs } from "@/data/products/detail/pipetting-pump-faq.locales";
import { getRplSelectionFaqItems } from "../technical-articles/rpl-valveless-metering-pump-selection.article";
import { getRotaryValveArticles } from "../technical-articles/rotary-valve-articles.intl";
import { getBarbedFittingCopy } from "../technical-articles/what-is-a-barbed-fitting.zh";
import { getLuerFittingCopy } from "../technical-articles/what-is-a-luer-fitting.zh";
import { getFerruleFittingCopy } from "../technical-articles/what-is-a-ferrule-fitting.zh";
import { getCompressionRingFittingCopy } from "../technical-articles/what-is-a-compression-ring-fitting.zh";
import { getConnectorSelectionArticle } from "../technical-articles/connector-selection-articles.article";
import tubingContent from "@/data/products/tubing/content.json";

type SourceQuestion = { question: string; answer: string };
function sourceQuestions(item: ReviewedFaqItem, locale: LocaleCode): readonly SourceQuestion[] {
  const productLocale = locale === "zh-CN" ? "zh" : locale;
  switch (item.subcategory) {
    case "piston": return productLocale === "zh" || productLocale === "en"
      ? getEaPumpContent("ea-500-pmma", productLocale)!.faqs
      : getPistonPumpLocalizedContent("ea-500-pmma", productLocale)!.faqs;
    case "diaphragm": return dpl30ArticleFaqCopy[locale].items;
    case "syringe": case "solenoid": return syringePumpFaqLocales[productLocale].map(([question, answer]) => ({ question, answer }));
    case "pipetting": return getPipettingFaqs(locale, "smtp2-1000ul")!;
    case "valveless": return getRplSelectionFaqItems(locale);
    case "rotary": return getRotaryValveArticles(locale)[0].copy.faqItems;
    case "soft-tubing": case "hard-tubing": {
      if (productLocale !== "zh" && productLocale !== "en") throw new Error(`Missing tubing FAQ supplement: ${locale}/${item.id}`);
      return tubingContent.materials[item.subcategory === "soft-tubing" ? "pvc" : "ptfe"][productLocale].faqs;
    }
    case "barbed": return getBarbedFittingCopy(locale).faqItems;
    case "luer": return getLuerFittingCopy(locale).faqItems;
    case "ferrule": return getFerruleFittingCopy(locale).faqItems;
    case "retaining-ring": return getCompressionRingFittingCopy(locale).faqItems;
    default: {
      const slug = item.links[0].href.split("/").filter(Boolean).at(-1)!;
      const article = getConnectorSelectionArticle(slug, locale);
      if (!article) throw new Error(`Missing FAQ source: ${locale}/${item.id}`);
      return article.copy.faqItems;
    }
  }
}

export function getFaqItems(locale: LocaleCode): FaqItem[] {
  if (locale === "zh-CN") return getChineseFaqItems();
  const categories = getFaqCategories(locale);
  return reviewedFaqItems.map(item => {
    const supplemental = faqSupplements[locale][item.id];
    let translated = supplemental;
    if (!translated) {
      const original = sourceQuestions(item, "zh-CN");
      const target = sourceQuestions(item, locale);
      const index = original.findIndex(value => value.question === item.evidence.sourceQuestion);
      // These source arrays share order across the published locales. Fail
      // explicitly if the source contract changes instead of leaking Chinese.
      if (index < 0 || original.length !== target.length || !target[index]?.answer) {
        throw new Error(`FAQ translation mapping changed: ${locale}/${item.id}`);
      }
      translated = { question: target[index].question, answer: [target[index].answer] };
    }
    const category = categories.find(value => value.key === item.category)!;
    const child = category.children.find(value => value.key === item.subcategory)!;
    const model = item.subcategory === "piston" ? "EA" : item.id === "valveless-speed" ? "RPL" : "";
    return {
      id: item.id, category: item.category, subcategory: item.subcategory,
      ...translated,
      question: model && !translated.question.includes(model) ? `${model}: ${translated.question}` : translated.question,
      tags: [category.label, child.label],
      aliases: item.aliases.filter(alias => /^[\x20-\x7e]+$/.test(alias)),
      links: item.links.map(link => ({
        href: getLanguageHref(link.href, locale),
        label: link.href === "/contact/" ? faqUi[locale].contact : faqUi[locale].readMore,
      })),
    };
  });
}
