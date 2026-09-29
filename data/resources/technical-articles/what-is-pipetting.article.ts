import type { DiaphragmPumpEngineeringArticleCopy, EngineeringArticleBlock } from "./diaphragm-pump-engineering-article.types";
import type { TechnicalArticleItem, TechnicalArticleLocale } from "./technical-articles.types";
import zh from "./what-is-pipetting-locales/zh-CN.json";
import en from "./what-is-pipetting-locales/en.json";
import es from "./what-is-pipetting-locales/es.json";
import fr from "./what-is-pipetting-locales/fr.json";
import ko from "./what-is-pipetting-locales/ko.json";
import ru from "./what-is-pipetting-locales/ru.json";

export type PipettingBasicsWorkflow = {
  label: string;
  description: string;
  steps: readonly string[];
};

type PipettingBasicsTranslation = {
  copy: DiaphragmPumpEngineeringArticleCopy;
  navigation: typeof zh.navigation;
  workflows: readonly PipettingBasicsWorkflow[];
  subject: { about: string[]; mentions: string[] };
};

const translations = { "zh-CN": zh, en, es, fr, ko, ru } as Record<TechnicalArticleLocale, PipettingBasicsTranslation>;

export const pipettingBasicsSlug = "what-is-pipetting";
export const pipettingBasicsRelatedProductIds = [
  "pump-ea-500ul-pmma",
  "pipetting-smtp2-1000ul",
  "hld6-60mm-rotary-valve-syringe-pump",
] as const;
export const pipettingBasicsSources = [
  "https://milnepublishing.geneseo.edu/molecular-techniques/front-matter/pipetting/",
  "https://www.itl.nist.gov/div898/software/dataplot/refman2/auxillar/coefvari.htm",
  "https://www.mdpi.com/1420-3049/27/19/6665"
] as const;

export function getPipettingBasicsNavigation(locale: TechnicalArticleLocale) {
  return translations[locale].navigation;
}

export function getPipettingBasicsWorkflows(locale: TechnicalArticleLocale) {
  return translations[locale].workflows;
}

export function getPipettingBasicsSubject(locale: TechnicalArticleLocale) {
  return translations[locale].subject;
}

export function getPipettingBasicsCopy(slug: string, locale: TechnicalArticleLocale): DiaphragmPumpEngineeringArticleCopy | null {
  return slug === pipettingBasicsSlug ? translations[locale].copy : null;
}

function blockText(block: EngineeringArticleBlock): string {
  switch (block.type) {
    case "paragraph": return block.text;
    case "notice": return [block.label, block.text].filter(Boolean).join(" ");
    case "formula": return [block.expression, block.note].filter(Boolean).join(" ");
    case "table": return [block.headers, ...block.rows].map(row => row.join(" | ")).join("\n");
    case "figure": return block.caption;
    case "subheading": return block.title;
    case "list": return block.items.join("\n");
    case "links": return block.items.map(item => `${item.prefix ?? ""}${item.label}${item.suffix ?? ""}`).join("\n");
  }
}

export function getPipettingBasicsArticles(locale: TechnicalArticleLocale): TechnicalArticleItem[] {
  const copy = getPipettingBasicsCopy(pipettingBasicsSlug, locale)!;
  return [{
    id: pipettingBasicsSlug,
    slug: pipettingBasicsSlug,
    category: "applications",
    ...copy.metadata,
    summary: copy.deck,
    date: "2026-09-29",
    relationKeys: ["category:syringe-pumps", "category:pipetting-pumps"],
    relationPriority: 100,
    content: [
      { title: "", content: copy.leadBlocks.map(blockText).join("\n\n") },
      ...copy.sections.map(section => ({ title: section.title, content: section.blocks.map(blockText).join("\n\n") })),
    ],
  }];
}
