import { samplingProbeSelectionCopy as source } from "../sampling-probe-selection.zh";

import type {
  DiaphragmPumpEngineeringArticleCopy,
  EngineeringArticleBlock,
} from "../diaphragm-pump-engineering-article.types";

type SectionLabel = readonly [title: string, toc: string];
type FigureLabel = readonly [alt: string, caption: string];

export type SamplingProbeTranslation = {
  title: string;
  description: string;
  coverAlt: string;
  deck: string;
  lead: string;
  sectionLabels: readonly [SectionLabel, SectionLabel, SectionLabel, SectionLabel, SectionLabel, SectionLabel];
  dimensions: readonly [string, string];
  dimensionsFigure: FigureLabel;
  dimensionHeaders: readonly [string, string, string];
  dimensionRows: readonly (readonly [string, string, string])[];
  boreIntro: string;
  boreFormulas: readonly [string, string, string];
  boreExplanation: string;
  boreHeaders: readonly [string, string, string, string];
  boreExample: readonly [string, string, string];
  boreStepsLabel: string;
  boreSteps: readonly [string, string, string];
  outerDiameter: readonly [string, string, string, string];
  lengthIntro: string;
  lengthTerms: string;
  lengthSteps: readonly [string, string, string, string, string];
  lengthExample: string;
  bendHeading: string;
  bend: readonly [string, string];
  tipIntro: string;
  tipFigure: FigureLabel;
  tips: readonly [string, string, string];
  sideHoleIntro: readonly [string, string];
  sideHoles: readonly [string, string, string, string];
  faqTitle: string;
  faq: readonly (readonly [question: string, answer: string])[];
  cta: readonly [title: string, description: string, contact: string, products: string];
  mentions: readonly [string, string, string, string];
};

const paragraph = (text: string): EngineeringArticleBlock => ({ type: "paragraph", text });
const list = (items: readonly string[], ordered = false): EngineeringArticleBlock => ({ type: "list", items, ordered });

type FigureBlock = Extract<EngineeringArticleBlock, { type: "figure" }>;

function localizedFigure(
  block: FigureBlock,
  [alt, caption]: FigureLabel,
  samplingProbeDiagram: NonNullable<FigureBlock["samplingProbeDiagram"]>,
): FigureBlock {
  return { ...block, alt, caption, samplingProbeDiagram };
}

function requireSourceBlock<B extends EngineeringArticleBlock>(block: B | undefined): B {
  if (!block) throw new Error("A shared sampling-probe source block is missing");
  return block;
}

const sampleProbeBoreTable = requireSourceBlock(source.sections[1].blocks.find((block) => block.type === "table"));
const dimensionsFigure = requireSourceBlock(source.sections[0].blocks.find((block) => block.type === "figure"));
const tipFigure = requireSourceBlock(source.sections[4].blocks.find((block) => block.type === "figure"));
const workingLengthFormula = requireSourceBlock(source.sections[3].blocks.find((block) => block.type === "formula"));
const sideHoleFormula = requireSourceBlock(source.sections[5].blocks.find((block) => block.type === "formula"));

export function buildSamplingProbeSelectionCopy(
  t: SamplingProbeTranslation,
  locale: "en" | "es" | "fr" | "ko" | "ru" | "de",
): DiaphragmPumpEngineeringArticleCopy {
  const [ctaTitle, ctaDescription, contactLabel, productsLabel] = t.cta;
  const decimal = new Intl.NumberFormat(locale, { useGrouping: false, maximumFractionDigits: 2 });
  const rows = sampleProbeBoreTable.rows.map((row) => row.map((cell) => cell.replace(/\d+\.\d+/g, (value) => decimal.format(Number(value)))));
  const sections: readonly (readonly EngineeringArticleBlock[])[] = [
    [...t.dimensions.map(paragraph), localizedFigure(dimensionsFigure, t.dimensionsFigure, "dimensions"),
      { type: "table", headers: t.dimensionHeaders, rows: t.dimensionRows }],
    [paragraph(t.boreIntro), list(t.boreFormulas), paragraph(t.boreExplanation),
      { type: "table", headers: t.boreHeaders, rows }, ...t.boreExample.map(paragraph), paragraph(t.boreStepsLabel), list(t.boreSteps)],
    t.outerDiameter.map(paragraph),
    [paragraph(t.lengthIntro), workingLengthFormula, paragraph(t.lengthTerms), list(t.lengthSteps, true),
      paragraph(t.lengthExample), { type: "subheading", title: t.bendHeading }, ...t.bend.map(paragraph)],
    [paragraph(t.tipIntro), localizedFigure(tipFigure, t.tipFigure, "tips"), list(t.tips)],
    [...t.sideHoleIntro.map(paragraph), sideHoleFormula, ...t.sideHoles.map(paragraph)],
  ];

  return {
    metadata: {
      title: t.title,
      seoTitle: `${t.title} | FOREACH`,
      seoDescription: t.description,
      coverImage: source.metadata.coverImage,
      coverAlt: t.coverAlt,
    },
    deck: t.deck,
    leadBlocks: [paragraph(t.deck), paragraph(t.lead)],
    sections: t.sectionLabels.map(([title, tocLabel], index) => ({ title, tocLabel, blocks: sections[index] })),
    faqTitle: t.faqTitle,
    faqTocLabel: t.faqTitle,
    faqItems: t.faq.map(([question, answer]) => ({ question, answer })),
    cta: { title: ctaTitle, description: ctaDescription, contactLabel, productsLabel, productsHref: locale === "de" ? source.cta.productsHref : `/${locale}${source.cta.productsHref}` },
  };
}
