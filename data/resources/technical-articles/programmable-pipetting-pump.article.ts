import type { DiaphragmPumpEngineeringArticleCopy, EngineeringArticleBlock } from "./diaphragm-pump-engineering-article.types";
import type { TechnicalArticleItem, TechnicalArticleLocale } from "./technical-articles.types";
import { getPipettingModelPath } from "@/data/products/selection/pipetting-pump-routes";
import zh from "./programmable-pipetting-pump-locales/zh-CN.json";
import en from "./programmable-pipetting-pump-locales/en.json";
import es from "./programmable-pipetting-pump-locales/es.json";
import fr from "./programmable-pipetting-pump-locales/fr.json";
import ko from "./programmable-pipetting-pump-locales/ko.json";
import ru from "./programmable-pipetting-pump-locales/ru.json";

export const programmablePipettingPumpSlug = "what-is-a-programmable-pipetting-pump";
const imageRoot = `/images/resources/technical-articles/${programmablePipettingPumpSlug}`;
const coverImage = `${imageRoot}/foreach-pipetting-module-cover.png`;
const translations: Record<TechnicalArticleLocale, typeof zh> = { "zh-CN": zh, en, es, fr, ko, ru };
const tableCaptions: Record<TechnicalArticleLocale, [string, string]> = {
  "zh-CN": ["可编程参数与验证项目", "SMTP2 主要参数与集成条件"],
  en: ["Programmable parameters and verification", "SMTP2 parameters and integration conditions"],
  es: ["Parámetros programables y verificación", "Parámetros y condiciones de integración SMTP2"],
  fr: ["Paramètres programmables et vérification", "Paramètres et conditions d’intégration SMTP2"],
  ko: ["프로그래밍 항목과 검증 사항", "SMTP2 매개변수와 통합 조건"],
  ru: ["Программируемые параметры и проверка", "Характеристики и условия интеграции SMTP2"],
};
const sectionIds = ["air-displacement", "programmable-control", "process-detection", "automation-tasks", "performance-checks", "smtp2-capabilities"] as const;
const datasheet = "/downloads/resources/datasheets/en/Pumps/ps-130a-2507-00001-001-en-smtp2-smtp4-pipetting-pump.pdf";

export function getProgrammablePipettingSources(locale: TechnicalArticleLocale) {
  const prefix = locale === "zh-CN" ? "" : `/${locale}`;
  return [
    getPipettingModelPath(locale, "smtp2-1000ul")!,
    `${prefix}/products/pumps/pipetting-pumps/`,
    datasheet,
    "https://partnering.tecan.com/cavro-air-displacement-pipettor-for-oem-liquid-handling",
    "https://www.hamiltoncompany.com/knowledge-base/faq/how-do-i-improve-my-prep-pipetting-results",
    "https://www.eppendorf.com/de-en/lab-academy/pipetting-knowledge-hub/choose-your-solution/",
  ];
}

export function getProgrammablePipettingNavigation(locale: TechnicalArticleLocale) {
  return sectionIds.map((id, index) => ({ id, label: translations[locale].titles[index] }));
}

export function getProgrammablePipettingCopy(slug: string, locale: TechnicalArticleLocale): DiaphragmPumpEngineeringArticleCopy | null {
  if (slug !== programmablePipettingPumpSlug) return null;
  const text = translations[locale];
  const sources = getProgrammablePipettingSources(locale);
  const sections = text.paragraphs.map((paragraphs, index) => ({
    title: text.titles[index],
    blocks: paragraphs.map((paragraph): EngineeringArticleBlock => ({ type: "paragraph", text: paragraph })),
  }));
  sections[1].blocks.push({ type: "paragraph", text: tableCaptions[locale][0] }, { type: "table", headers: text.controlHeaders, rows: text.controlRows });
  sections[4].blocks.splice(1, 0, { type: "list", ordered: true, items: text.steps });
  sections[4].blocks.push({
    type: "figure",
    src: `${imageRoot}/tip-interface-reference${locale === "zh-CN" ? "" : `-${locale}`}.png`,
    alt: text.figureAlts[2],
    width: locale === "zh-CN" ? 812 : 2032,
    height: locale === "zh-CN" ? 310 : 774,
    caption: text.figureCaptions[2],
  });
  sections[5].blocks.splice(1, 0, { type: "paragraph", text: tableCaptions[locale][1] }, { type: "table", headers: text.specHeaders, rows: text.specRows });
  sections[5].blocks.push({ type: "figure", src: `${imageRoot}/smtp2-product-outline.png`, alt: text.figureAlts[1], width: 1254, height: 1254, caption: text.figureCaptions[1] });
  return {
    metadata: { title: text.title, seoTitle: `${text.title} | FOREACH`, seoDescription: text.description, coverImage, coverAlt: text.figureAlts[0] },
    deck: text.deck,
    leadBlocks: [
      { type: "paragraph", text: text.deck },
      { type: "paragraph", text: text.scope },
      { type: "figure", src: coverImage, alt: text.figureAlts[0], width: 1200, height: 800, caption: text.figureCaptions[0] },
    ],
    sections,
    faqTitle: text.faqTitle,
    faqItems: text.faq.map(([question, answer]) => ({ question, answer })),
    cta: { ...text.cta, productsHref: sources[0] },
  };
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
    case "links": return block.items.map(item => item.label).join("\n");
  }
}

export function getProgrammablePipettingArticles(locale: TechnicalArticleLocale): TechnicalArticleItem[] {
  const copy = getProgrammablePipettingCopy(programmablePipettingPumpSlug, locale)!;
  return [{
    id: programmablePipettingPumpSlug, slug: programmablePipettingPumpSlug,
    category: "pumps-valves", ...copy.metadata, summary: copy.deck, date: "2026-09-28",
    relationKeys: ["series:smtp2", "category:pipetting-pumps"], relationPriority: 150,
    content: [
      { title: "", content: copy.leadBlocks.map(blockText).join("\n\n") },
      ...copy.sections.map(section => ({ title: section.title, content: section.blocks.map(blockText).join("\n\n") })),
      { title: copy.faqTitle, content: copy.faqItems.map(item => `${item.question}\n${item.answer}`).join("\n\n") },
    ],
  }];
}
