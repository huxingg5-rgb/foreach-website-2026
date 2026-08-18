import type { TechnicalArticleLocale } from "./technical-articles.types";

export type BrushlessWiringTableRow = readonly [string, string];
export type BrushlessWiringComparisonRow = readonly [string, string, string];

export type BrushlessWiringFaqItem = {
  question: string;
  answer: string;
};

export type BrushlessWiringProductCard = {
  label: string;
  model: "DPL30" | "DPL60" | "DPL30H" | "DPGL800";
  note: string;
  slug:
    | "dpl30-liquid-diaphragm-pump"
    | "dpl60-liquid-diaphragm-pump"
    | "dpl30h-liquid-diaphragm-pump"
    | "dpgl800-gas-liquid-diaphragm-pump";
};

export type BrushlessWiringDiagramCopy = {
  ariaLabel: string;
  twoWireTitle: string;
  twoWireSubtitle: string;
  fiveWireTitle: string;
  fiveWireSubtitle: string;
  motor: string;
  integratedDriver: string;
  controlInterface: string;
  redPower: string;
  blackGround: string;
  optional: string;
  typicalUse: string;
  twoWireUses: readonly [string, string, string];
  fiveWireUses: readonly [string, string, string, string];
  footer: string;
  caption: string;
};

export type BrushlessWiringArticleCopy = {
  metadata: {
    title: string;
    seoTitle: string;
    seoDescription: string;
    coverAlt: string;
  };
  kicker: string;
  deck: string;
  conclusion: {
    title: string;
    label: string;
    text: string;
  };
  twoWire: {
    title: string;
    intro: string;
    headers: readonly [string, string];
    rows: readonly BrushlessWiringTableRow[];
    paragraphs: readonly [string, string];
    figureAlt: string;
    figureCaption: string;
    selectionTitle: string;
    selectionIntro: string;
    selectionItems: readonly string[];
    closing: string;
  };
  fiveWire: {
    title: string;
    intro: string;
    exampleIntro: string;
    headers: readonly [string, string];
    rows: readonly BrushlessWiringTableRow[];
    paragraphs: readonly [string, string];
    figureAlt: string;
    figureCaption: string;
    selectionTitle: string;
    selectionIntro: string;
    selectionItems: readonly string[];
    closing: string;
  };
  diagramSectionTitle: string;
  diagram: BrushlessWiringDiagramCopy;
  comparison: {
    title: string;
    headers: readonly [string, string, string];
    rows: readonly BrushlessWiringComparisonRow[];
    conclusion: string;
  };
  selection: {
    title: string;
    intro: string;
    twoWireTitle: string;
    twoWireIntro: string;
    twoWireLogicTitle: string;
    twoWireLogic: string;
    twoWireClosing: string;
    fiveWireTitle: string;
    fiveWireIntro: string;
    fiveWireLogicTitle: string;
    fiveWireLogic: string;
    fiveWireClosing: string;
    decision: string;
    fixedSpeedCaution: string;
    futureControl: string;
    confusionTitle: string;
    confusionText: string;
  };
  products: {
    title: string;
    intro: string;
    cards: readonly BrushlessWiringProductCard[];
    paragraphs: readonly [string, string, string];
  };
  faqTitle: string;
  faqItems: readonly BrushlessWiringFaqItem[];
  cta: {
    title: string;
    description: string;
    contactLabel: string;
    productsLabel: string;
  };
  sourceNote: string;
};

export type BrushlessWiringArticleCopyMap = Record<
  TechnicalArticleLocale,
  BrushlessWiringArticleCopy
>;
