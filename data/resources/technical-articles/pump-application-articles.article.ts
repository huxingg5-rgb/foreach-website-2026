import { pumpApplicationArticlesRu } from "./pump-application-articles.ru";
import { pumpApplicationArticlesKo } from "./pump-application-articles.ko";
import { pumpApplicationArticlesFr } from "./pump-application-articles.fr";
import { pumpApplicationArticlesEs } from "./pump-application-articles.es";
import type { EngineeringArticleBlock } from "./diaphragm-pump-engineering-article.types";
import type { TechnicalArticleItem, TechnicalArticleLocale } from "./technical-articles.types";
import { pumpApplicationArticlesZh } from "./pump-application-articles.zh";
import { pumpApplicationArticlesEn } from "./pump-application-articles.en";
import { pumpApplicationArticleSlugs, type PumpApplicationArticleCopy, type PumpApplicationArticleSlug } from "./pump-application-articles.types";

export function isPumpApplicationArticleSlug(slug: string): slug is PumpApplicationArticleSlug {
  return pumpApplicationArticleSlugs.some((candidate) => candidate === slug);
}

export function getPumpApplicationArticleCopy(
  slug: string,
  locale: TechnicalArticleLocale,
): PumpApplicationArticleCopy | null {
  if (!isPumpApplicationArticleSlug(slug)) return null;
  if (locale === "zh-CN") return pumpApplicationArticlesZh[slug];
  if (locale === "en") return pumpApplicationArticlesEn[slug];
  if (locale === "es") return pumpApplicationArticlesEs[slug];
  if (locale === "fr") return pumpApplicationArticlesFr[slug];
  if (locale === "ko") return pumpApplicationArticlesKo[slug];
  if (locale === "ru") return pumpApplicationArticlesRu[slug];
  return null;
}

function blockText(block: EngineeringArticleBlock): string {
  switch (block.type) {
    case "paragraph": return block.text;
    case "notice": return [block.label, block.text].filter(Boolean).join(" ");
    case "formula": return [block.expression, block.note].filter(Boolean).join(" ");
    case "table": return [block.headers, ...block.rows].map((row) => row.join(" | ")).join("\n");
    case "figure": return block.caption;
    case "subheading": return block.title;
    case "list": return block.items.join("\n");
    case "links": return block.items.map((item) => item.label).join("\n");
  }
}

export function getPumpApplicationArticles(locale: TechnicalArticleLocale): TechnicalArticleItem[] {
  return pumpApplicationArticleSlugs.flatMap((slug, index) => {
    const copy = getPumpApplicationArticleCopy(slug, locale);
    if (!copy) return [];
    return [{
      id: slug,
      slug,
      category: "applications" as const,
      ...copy.metadata,
      summary: copy.deck,
      date: "2026-09-08",
      relationKeys: index === 0
        ? ["series:ea", "series:sm", "series:tm", "application:ivd"]
        : ["series:dpl30", "series:dpl60", ...(index === 1 ? ["application:ivd"] : [])],
      relationPriority: 125 - index,
      content: [
        { title: "", content: copy.leadBlocks.map(blockText).join("\n") },
        ...copy.sections.map((section) => ({ title: section.title, content: section.blocks.map(blockText).join("\n") })),
        { title: copy.faqTitle, content: copy.faqItems.map((item) => item.question + "\n" + item.answer).join("\n\n") },
      ],
    }];
  });
}

/** Add the new application questions to their existing selection guides. */
export function getPumpApplicationChildArticles(slug: string, locale: TechnicalArticleLocale): TechnicalArticleItem[] {
  const children = getPumpApplicationArticles(locale);
  if (slug === "ivd-cleaning-wash-rinse-pump-diaphragm-pump") return children.slice(1, 2);
  if (slug === "dpl30-liquid-diaphragm-pump-selection-guide" || slug === "dpl60-liquid-diaphragm-pump-selection-guide") return children.slice(1);
  return [];
}
