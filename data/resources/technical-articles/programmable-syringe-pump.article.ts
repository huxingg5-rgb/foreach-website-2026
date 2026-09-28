import type { DiaphragmPumpEngineeringArticleCopy, EngineeringArticleBlock } from "./diaphragm-pump-engineering-article.types";
import type { TechnicalArticleItem, TechnicalArticleLocale } from "./technical-articles.types";
import { getSyringeModelPath } from "@/data/products/selection/syringe-pump-routes";
import zh from "./programmable-syringe-pump-locales/zh-CN.json";
import en from "./programmable-syringe-pump-locales/en.json";
import es from "./programmable-syringe-pump-locales/es.json";
import fr from "./programmable-syringe-pump-locales/fr.json";
import ko from "./programmable-syringe-pump-locales/ko.json";
import ru from "./programmable-syringe-pump-locales/ru.json";

export const programmableSyringePumpSlug = "what-is-a-programmable-syringe-pump";
const imageRoot = `/images/resources/technical-articles/${programmableSyringePumpSlug}`;
const coverImage = `${imageRoot}/foreach-programmable-syringe-pump-photo.webp`;
const translations: Record<TechnicalArticleLocale, typeof zh> = { "zh-CN": zh, en, es, fr, ko, ru };
const sectionIds = ["syringe-valve-drive", "dispensing-cycle", "programmable-actions", "ports-and-channels", "hmd-hld-configurations", "instrument-verification"];
const models = ["hmd3-30mm-solenoid-syringe-pump", "hmd6-60mm-solenoid-syringe-pump", "hld3-30mm-rotary-valve-syringe-pump", "hld6-60mm-rotary-valve-syringe-pump"];

export function getProgrammableSyringeSources(locale: TechnicalArticleLocale) {
  return [
    ...models.map(model => getSyringeModelPath(locale, model)!),
    "https://partnering.tecan.com/cavro-xlp-6000-pump-for-oem-liquid-handling",
    "https://partnering.tecan.com/cavro-xmp-6000-pump-for-oem-liquid-handling",
    "https://www.hamiltoncompany.com/oem-components/syringe-pumps/psd4",
    "https://www.hamiltoncompany.com/syringes/syringe-accessories/removable-needle-compression-fittings/priming-kit",
    "https://www.tricontinent.com/en/syringe-pumps-and-rotary-valves/c-series-syringe-pumps/",
  ];
}

export function getProgrammableSyringeNavigation(locale: TechnicalArticleLocale) {
  return sectionIds.map((id, index) => ({ id, label: translations[locale].titles[index] }));
}

export function getProgrammableSyringeCopy(slug: string, locale: TechnicalArticleLocale): DiaphragmPumpEngineeringArticleCopy | null {
  if (slug !== programmableSyringePumpSlug) return null;
  const text = translations[locale];
  const prefix = locale === "zh-CN" ? "" : `/${locale}`;
  const sections = text.paragraphs.map((paragraphs, index) => ({
    title: text.titles[index],
    blocks: paragraphs.map((paragraph): EngineeringArticleBlock => ({ type: "paragraph", text: paragraph })),
  }));
  sections[0].blocks.push({ type: "links", items: [{ href: `${prefix}/resources/technical-articles/what-is-a-programmable-pipetting-pump/`, label: text.links[0] }] });
  sections[1].blocks.splice(1, 0, { type: "list", ordered: true, items: text.steps });
  sections[1].blocks.push({ type: "figure", src: `${imageRoot}/fluid-cycle-${locale}.svg`, alt: text.figureAlts[2], width: 800, height: 540, caption: text.figureCaptions[2] });
  sections[2].blocks.splice(1, 0, { type: "paragraph", text: text.controlCaption }, { type: "table", headers: text.controlHeaders, rows: text.controlRows });
  sections[4].blocks.splice(1, 0, { type: "paragraph", text: text.configCaption }, { type: "table", headers: text.configHeaders, rows: text.configRows });
  sections[4].blocks.push(
    { type: "links", ordered: true, items: models.map((model, index) => ({ href: getSyringeModelPath(locale, model)!, label: text.links[index + 1] })) },
  );
  sections[5].blocks.splice(1, 0, { type: "list", ordered: true, items: text.checks });
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
    cta: { ...text.cta, productsHref: `${prefix}/products/pumps/syringe-pumps/` },
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

export function getProgrammableSyringeArticles(locale: TechnicalArticleLocale): TechnicalArticleItem[] {
  const copy = getProgrammableSyringeCopy(programmableSyringePumpSlug, locale)!;
  return [{
    id: programmableSyringePumpSlug, slug: programmableSyringePumpSlug,
    category: "pumps-valves", ...copy.metadata, summary: copy.deck, date: "2026-09-28",
    relationKeys: ["series:hmd3", "series:hmd6", "series:hld3", "series:hld6", "category:syringe-pumps"], relationPriority: 150,
    content: [
      { title: "", content: copy.leadBlocks.map(blockText).join("\n\n") },
      ...copy.sections.map(section => ({ title: section.title, content: section.blocks.map(blockText).join("\n\n") })),
      { title: copy.faqTitle, content: copy.faqItems.map(item => `${item.question}\n${item.answer}`).join("\n\n") },
    ],
  }];
}
