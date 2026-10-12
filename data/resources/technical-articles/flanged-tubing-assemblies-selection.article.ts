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
export const flangedTubingProductIds = ["809717", "809723", "809421", "809058"];
export const flangedTubingRelationKeys = ["series:hf", "series:hf6", "series:hfl", "series:hfl6"];
export const flangedTubingRelatedIntro: Record<TechnicalArticleLocale, string> = {
  "zh-CN": "以下按 HF、HF6、HFL、HFL6 各列一个代表型号，便于进入产品页查看规格与图纸。它们是选型入口，具体接管外径、材料、垫片和端口配套仍需分别确认。",
  en: "One representative model from each series—HF, HF6, HFL and HFL6—links to specifications and drawings. These are selection starting points; confirm tubing OD, materials, washers and port compatibility for each configuration.",
  es: "Se muestra un modelo representativo de HF, HF6, HFL y HFL6 con acceso a especificaciones y planos. Son puntos de partida; confirme diámetro exterior, materiales, arandelas y puerto para cada configuración.",
  fr: "Un modèle représentatif de HF, HF6, HFL et HFL6 donne accès aux caractéristiques et plans. Ce sont des points de départ : confirmez diamètre extérieur, matériaux, rondelles et port pour chaque configuration.",
  ko: "HF, HF6, HFL, HFL6의 대표 모델을 하나씩 제시합니다. 제품 페이지에서 사양과 도면을 확인할 수 있으며, 각 구성의 튜브 외경, 재질, 와셔 및 포트 적합성은 별도로 확인해야 합니다.",
  ru: "По одному представителю HF, HF6, HFL и HFL6 ведёт к характеристикам и чертежам. Это отправные варианты: отдельно подтвердите наружный диаметр трубки, материалы, шайбы и ответный порт.",
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
