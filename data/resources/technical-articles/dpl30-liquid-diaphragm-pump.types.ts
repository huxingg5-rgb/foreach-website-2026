import type { TechnicalArticleLocale } from "./technical-articles.types";

export type Dpl30ThreeColumnRow = readonly [string, string, string];
export type Dpl30TwoColumnRow = readonly [string, string];

export type Dpl30FaqItem = {
  question: string;
  answer: string;
};

export type Dpl30FaqCopy = {
  title: string;
  items: readonly Dpl30FaqItem[];
};

export type Dpl30SpecificationRow = {
  label: string;
  value?: string;
  brushed?: string;
  brushless?: string;
};

export type Dpl30ArticleCopy = {
  metadata: {
    title: string;
    seoTitle: string;
    seoDescription: string;
  };
  diagram: {
    ariaLabel: string;
    suctionTitle: string;
    dischargeTitle: string;
    inletOpen: string;
    outletClosed: string;
    suctionDescription: string;
    inletClosed: string;
    outletOpen: string;
    dischargeDescription: string;
    caption: string;
  };
  section1: {
    title: string;
    paragraphs: readonly string[];
  };
  section2: {
    title: string;
    intro: string;
    headers: Dpl30ThreeColumnRow;
    rows: readonly Dpl30ThreeColumnRow[];
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
    headers: Dpl30ThreeColumnRow;
    rows: readonly Dpl30SpecificationRow[];
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
    intro: string;
    headers: Dpl30ThreeColumnRow;
    rows: readonly Dpl30ThreeColumnRow[];
    epTitle: string;
    epText: string;
    ffTitle: string;
    ffText: string;
    noticeStrong: string;
    noticeText: string;
  };
  section7: {
    title: string;
    intro: string;
    headers: Dpl30ThreeColumnRow;
    rows: readonly Dpl30ThreeColumnRow[];
    afterTable: string;
    brushedTitle: string;
    brushedAlt: string;
    brushedCaption: string;
    brushedText: string;
    brushlessTitle: string;
    brushlessAlt: string;
    brushlessCaption: string;
    brushlessText: string;
  };
  section8: {
    title: string;
    intro: string;
    noticeStrong: string;
    noticeText: string;
    headers: Dpl30ThreeColumnRow;
    rows: readonly Dpl30ThreeColumnRow[];
    exampleTitle: string;
    exampleText: string;
    notice: string;
  };
  section9: {
    title: string;
    steps: readonly Dpl30TwoColumnRow[];
  };
  section10: {
    title: string;
    intro: string;
    headers: Dpl30TwoColumnRow;
    rows: readonly Dpl30TwoColumnRow[];
  };
  section11: {
    title: string;
    paragraphs: readonly string[];
  };
};

export type Dpl30ArticleCopyMap = Record<
  TechnicalArticleLocale,
  Dpl30ArticleCopy
>;
