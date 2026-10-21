import type { DiaphragmPumpEngineeringArticleCopy, EngineeringArticleBlock } from "./diaphragm-pump-engineering-article.types";
import type { TechnicalArticleItem, TechnicalArticleLocale } from "./technical-articles.types";
import { flangedTubingAssembliesCopy } from "./flanged-tubing-assemblies-selection.zh";
import { flangedTubingFaq } from "./flanged-tubing-assemblies-faq.intl";
import { flangedTubingAssembliesSlug } from "./technical-article-availability";
import en from "./flanged-tubing-locales/en.json";
import es from "./flanged-tubing-locales/es.json";
import fr from "./flanged-tubing-locales/fr.json";
import ko from "./flanged-tubing-locales/ko.json";
import ru from "./flanged-tubing-locales/ru.json";

export { flangedTubingAssembliesSlug } from "./technical-article-availability";
export { getFlangedTubingNavigation } from "./flanged-tubing-assemblies-faq.intl";
const translations = { en, es, fr, ko, ru };
export const flangedTubingRelationKeys = ["series:hf", "series:hf6", "series:hfl", "series:hfl6"];
export const flangedTubingRelatedIntro: Record<TechnicalArticleLocale, string> = {
  "zh-CN": "以下为不同管材的法兰翻边管组件，可进入详情页查看对应配置。管径、管长、两端接头、垫片及端口配套需按实际液路和图纸确认。",
  en: "Explore flanged tubing assemblies by tubing material. Each detail page presents the corresponding configuration; confirm tube dimensions, length, end fittings, washers and mating ports against your fluid path and drawings.",
  es: "Explore conjuntos de tubos con reborde según el material. Cada página muestra la configuración correspondiente; confirme dimensiones, longitud, racores de extremo, arandelas y puertos según el circuito y los planos.",
  fr: "Découvrez les assemblages de tubes à collet par matériau. Chaque fiche présente la configuration correspondante ; confirmez dimensions, longueur, raccords d’extrémité, rondelles et ports selon le circuit et les plans.",
  ko: "튜브 재질별 플랜지형 튜빙 어셈블리를 확인할 수 있습니다. 각 상세 페이지에서 해당 구성을 확인하고, 튜브 치수와 길이, 양단 피팅, 와셔 및 연결 포트는 실제 유로와 도면에 맞춰 검토하세요.",
  ru: "Выберите трубную сборку с отбортовкой по материалу трубки. На странице изделия представлена соответствующая конфигурация; размеры и длину трубки, концевые фитинги, шайбы и ответные порты уточняйте по жидкостному тракту и чертежам.",
};

export function getFlangedTubingCopy(locale: TechnicalArticleLocale): DiaphragmPumpEngineeringArticleCopy {
  const copy = locale === "zh-CN" ? flangedTubingAssembliesCopy : translations[locale] as DiaphragmPumpEngineeringArticleCopy;
  return { ...copy, faqItems: flangedTubingFaq[locale] };
}

function blockText(block: EngineeringArticleBlock): string {
  switch (block.type) {
    case "paragraph": return block.text;
    case "notice": return [block.label, block.text].filter(Boolean).join(" ");
    case "formula": return [block.expression, block.note].filter(Boolean).join(" ");
    case "table": return [block.headers, ...block.rows].map(row => row.join(" | ")).join("\n");
    case "figure": return [block.alt, block.caption].join(" ");
    case "subheading": return block.title;
    case "list": return block.items.join("\n");
    case "links": return block.items.map(item => [item.prefix, item.label, item.suffix].filter(Boolean).join("")).join(" ");
  }
}

export function getFlangedTubingAssembliesArticles(locale: TechnicalArticleLocale): TechnicalArticleItem[] {
  const copy = getFlangedTubingCopy(locale);
  return [{
    id: flangedTubingAssembliesSlug, slug: flangedTubingAssembliesSlug,
    category: "fittings-tubing", ...copy.metadata, summary: copy.deck,
    date: "2026-10-12", relationKeys: flangedTubingRelationKeys, relationPriority: 150,
    content: [
      { title: "", content: copy.leadBlocks.map(blockText).join("\n\n") },
      ...copy.sections.map(section => ({ title: section.title, content: section.blocks.map(blockText).join("\n\n") })),
      { title: copy.faqTitle, content: copy.faqItems.map(item => `${item.question}\n${item.answer}`).join("\n\n") },
    ],
  }];
}
