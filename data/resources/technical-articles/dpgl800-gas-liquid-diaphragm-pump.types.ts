import type { TechnicalArticleLocale } from "./technical-articles.types";

export type Dpgl800TableRow = readonly string[];
export type Dpgl800Step = readonly [string, string];

export type Dpgl800ArticleCopy = {
  metadata: {
    title: string;
    seoTitle: string;
    seoDescription: string;
    coverAlt: string;
  };
  section1: {
    title: string;
    paragraphs: readonly string[];
  };
  section2: {
    title: string;
    intro: string;
    headers: Dpgl800TableRow;
    rows: readonly Dpgl800TableRow[];
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
    headers: Dpgl800TableRow;
    rows: readonly Dpgl800TableRow[];
  };
  section5: {
    title: string;
    paragraphs: readonly string[];
    figureAlt: string;
    figureCaption: string;
    notice: string;
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
    dpl60Prefix: string;
    dpl60Label: string;
    dpl60Suffix: string;
  };
  section8: {
    title: string;
    paragraphs: readonly string[];
    figureAlt: string;
    figureCaption: string;
    headers: Dpgl800TableRow;
    rows: readonly Dpgl800TableRow[];
  };
  section9: {
    title: string;
    intro: string;
    modelCode: string;
    modelCodeDescription: string;
    headers: Dpgl800TableRow;
    rows: readonly Dpgl800TableRow[];
    exampleTitle: string;
    exampleText: string;
    standardModelsTitle: string;
    standardModelsIntro: string;
    standardModelHeaders: Dpgl800TableRow;
    standardModelRows: readonly Dpgl800TableRow[];
    notice: string;
  };
  section10: {
    title: string;
    steps: readonly Dpgl800Step[];
  };
  section11: {
    title: string;
    intro: string;
    headers: Dpgl800TableRow;
    rows: readonly Dpgl800TableRow[];
  };
  conclusion: {
    title: string;
    paragraphs: readonly string[];
  };
  internalLinks: {
    productPrefix: string;
    productLabel: string;
    productSuffix: string;
    categoryPrefix: string;
    categoryLabel: string;
    categorySuffix: string;
  };
};

export type Dpgl800ArticleCopyMap = Record<
  TechnicalArticleLocale,
  Dpgl800ArticleCopy
>;
