import type { DiaphragmPumpEngineeringArticleCopy, EngineeringArticleBlock, EngineeringArticleSection } from "../diaphragm-pump-engineering-article.types";

export const p = (text: string): EngineeringArticleBlock => ({ type: "paragraph", text });
export const h = (title: string): EngineeringArticleBlock => ({ type: "subheading", title });
export const f = (expression: string): EngineeringArticleBlock => ({ type: "formula", expression });
export const table = (headers: string[], rows: string[][]): EngineeringArticleBlock => ({ type: "table", headers, rows });

// Every translation supplies its own complete copy; no runtime translation or Chinese fallback.
export function createRplTranslation(input: {
  title: string;
  description: string;
  coverAlt: string;
  lead: [string, string];
  sections: [EngineeringArticleSection, EngineeringArticleSection, EngineeringArticleSection, EngineeringArticleSection, EngineeringArticleSection];
  cta: DiaphragmPumpEngineeringArticleCopy["cta"];
}): DiaphragmPumpEngineeringArticleCopy {
  return {
    metadata: {
      title: input.title,
      seoTitle: input.title,
      seoDescription: input.description,
      coverImage: "/images/products/pumps/valveless-pumps/foreach-rpl-p635-valveless-pump.webp",
      coverAlt: input.coverAlt,
    },
    deck: input.lead[0],
    leadBlocks: input.lead.map(p),
    sections: input.sections,
    faqTitle: input.sections[4].title,
    faqItems: [], // FAQ is rendered in section 05, not twice.
    cta: input.cta,
  };
}
