import type { TechnicalArticleLocale } from "./technical-articles.types";

export type Dpl30hTableRow = readonly string[];
export type Dpl30hStep = readonly [string, string];

export type Dpl30hArticleCopy = {
  metadata: {
    title: string;
    seoTitle: string;
    seoDescription: string;
    coverAlt: string;
  };
  section1: { title: string; paragraphs: readonly string[] };
  section2: {
    title: string;
    intro: string;
    headers: Dpl30hTableRow;
    rows: readonly Dpl30hTableRow[];
  };
  section3: {
    title: string;
    paragraphs: readonly string[];
    noticeStrong: string;
    noticeText: string;
  };
  section4: {
    title: string;
    intro: string;
    headers: Dpl30hTableRow;
    rows: readonly Dpl30hTableRow[];
  };
  section5: {
    title: string;
    paragraphs: readonly string[];
    headers: Dpl30hTableRow;
    rows: readonly Dpl30hTableRow[];
    dpl30Prefix: string;
    dpl30Label: string;
    dpl30Suffix: string;
  };
  section6: {
    title: string;
    paragraphs: readonly string[];
    figureAlt: string;
    figureCaption: string;
    notice: string;
  };
  section7: {
    title: string;
    paragraphs: readonly string[];
    noticeStrong: string;
    noticeText: string;
  };
  section8: {
    title: string;
    paragraphs: readonly string[];
    brushedFigureAlt: string;
    brushedFigureCaption: string;
    brushlessFigureAlt: string;
    brushlessFigureCaption: string;
    motorHeaders: Dpl30hTableRow;
    motorRows: readonly Dpl30hTableRow[];
    wiringTitle: string;
    wiringIntro: string;
    wiringHeaders: Dpl30hTableRow;
    wiringRows: readonly Dpl30hTableRow[];
    wiringNotes: readonly string[];
  };
  section9: {
    title: string;
    intro: string;
    headers: Dpl30hTableRow;
    rows: readonly Dpl30hTableRow[];
    noticeStrong: string;
    noticeText: string;
  };
  section10: {
    title: string;
    intro: string;
    modelCode: string;
    modelCodeDescription: string;
    headers: Dpl30hTableRow;
    rows: readonly Dpl30hTableRow[];
    standardModelsTitle: string;
    standardModelsIntro: string;
    standardModelHeaders: Dpl30hTableRow;
    standardModelRows: readonly Dpl30hTableRow[];
    notice: string;
    stepsTitle: string;
    steps: readonly Dpl30hStep[];
  };
  conclusion: { title: string; paragraphs: readonly string[] };
  internalLinks: {
    dpl60Prefix: string;
    dpl60Label: string;
    dpl60Suffix: string;
    productPrefix: string;
    productLabel: string;
    productSuffix: string;
    categoryPrefix: string;
    categoryLabel: string;
    categorySuffix: string;
  };
};

export type Dpl30hArticleCopyMap = Record<
  TechnicalArticleLocale,
  Dpl30hArticleCopy
>;
