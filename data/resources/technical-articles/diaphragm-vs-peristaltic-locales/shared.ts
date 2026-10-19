import type { DiaphragmPumpEngineeringArticleCopy, EngineeringArticleBlock } from "../diaphragm-pump-engineering-article.types";
import type { TechnicalArticleLocale } from "../technical-articles.types";

export type ComparisonLocale = Exclude<TechnicalArticleLocale, "zh-CN">;
export type ComparisonTranslation = {
  metadata: Omit<DiaphragmPumpEngineeringArticleCopy["metadata"], "coverImage">;
  deck: string;
  lead: string;
  scopeLabel: string;
  scope: string;
  overview: { title: string; headers: string[]; rows: string[][]; note: string };
  principle: { title: string; paragraphs: string[]; diaphragmAlt: string; diaphragmCaption: string; animationLabel: string; peristalticAlt: string; peristalticCaption: string };
  details: { title: string; groups: { title: string; paragraphs: string[] }[]; linkLabels: [string, string] };
  selection: { title: string; intro: string; diaphragmTitle: string; diaphragmParagraphs: string[]; peristalticTitle: string; peristalticParagraphs: string[]; tableTitle: string; headers: string[]; rows: string[][]; limitsTitle: string; limits: string[] };
  validation: { title: string; steps: string[]; paragraph: string; linkLabels: [string, string, string, string] };
  faqTitle: string;
  faqItems: DiaphragmPumpEngineeringArticleCopy["faqItems"];
  cta: Omit<DiaphragmPumpEngineeringArticleCopy["cta"], "productsHref">;
};

const peristalticImage = "/images/resources/technical-articles/diaphragm-vs-peristaltic/peristaltic-pump-three-stage-no-text.webp";
const productCategory = "/products/pumps/miniature-diaphragm-pumps/liquid-diaphragm-pumps/";
const paragraphs = (texts: string[]): EngineeringArticleBlock[] => texts.map(text => ({ type: "paragraph", text }));

// Use the site's existing localized animation and URL localizer. Text lives only in locale files.
export function createComparisonCopy(locale: ComparisonLocale, t: ComparisonTranslation): DiaphragmPumpEngineeringArticleCopy {
  const animation = `/images/resources/technical-articles/diaphragm-pump-rd/${locale}/diaphragm-pump-working-principle-clean.gif`;
  return {
    metadata: { ...t.metadata, coverImage: "/images/products/pumps/diaphragm-pumps/dpl30h/images/foreach-dpl30h-300ml-min-brushless-diaphragm-liquid-supply-pump.webp" },
    deck: t.deck,
    leadBlocks: [{ type: "paragraph", text: t.lead }, { type: "notice", label: t.scopeLabel, text: t.scope }],
    sections: [
      { title: t.overview.title, blocks: [
        { type: "table", headers: t.overview.headers, rows: t.overview.rows },
        { type: "paragraph", text: t.overview.note },
      ] },
      { title: t.principle.title, blocks: [
        ...paragraphs(t.principle.paragraphs),
        { type: "figure", src: animation, width: 1100, height: 535, alt: t.principle.diaphragmAlt, caption: t.principle.diaphragmCaption },
        { type: "links", items: [{ href: animation, label: t.principle.animationLabel }] },
        { type: "figure", src: peristalticImage, width: 1536, height: 1024, alt: t.principle.peristalticAlt, caption: t.principle.peristalticCaption },
      ] },
      { title: t.details.title, blocks: [
        ...t.details.groups.flatMap((group): EngineeringArticleBlock[] => [{ type: "subheading", title: group.title }, ...paragraphs(group.paragraphs)]),
        { type: "links", items: [
          { href: "/resources/technical-articles/miniature-diaphragm-pump-flow-pulsation-reduction/", label: t.details.linkLabels[0] },
          { href: "/resources/technical-articles/metering-pump-accuracy-repeatability-reagent-dispensing/", label: t.details.linkLabels[1] },
        ] },
      ] },
      { title: t.selection.title, blocks: [
        { type: "paragraph", text: t.selection.intro },
        { type: "subheading", title: t.selection.diaphragmTitle }, ...paragraphs(t.selection.diaphragmParagraphs),
        { type: "subheading", title: t.selection.peristalticTitle }, ...paragraphs(t.selection.peristalticParagraphs),
        { type: "subheading", title: t.selection.tableTitle },
        { type: "table", headers: t.selection.headers, rows: t.selection.rows },
        { type: "subheading", title: t.selection.limitsTitle }, ...paragraphs(t.selection.limits),
      ] },
      { title: t.validation.title, blocks: [
        { type: "list", ordered: true, items: t.validation.steps },
        { type: "paragraph", text: t.validation.paragraph },
        { type: "links", items: [
          { href: productCategory, label: t.validation.linkLabels[0] },
          { href: "/resources/technical-articles/dpl30-liquid-diaphragm-pump-selection-guide/", label: t.validation.linkLabels[1] },
          { href: "/resources/technical-articles/dpl60-liquid-diaphragm-pump-selection-guide/", label: t.validation.linkLabels[2] },
          { href: "/resources/technical-articles/self-priming-miniature-liquid-diaphragm-pump-selection/", label: t.validation.linkLabels[3] },
        ] },
      ] },
    ],
    faqTitle: t.faqTitle, faqItems: t.faqItems,
    cta: { ...t.cta, productsHref: productCategory },
  };
}
