import type {
  Dpl30ArticleCopy,
  Dpl30FaqCopy,
  Dpl30ThreeColumnRow,
  Dpl30TwoColumnRow,
} from "./dpl30-liquid-diaphragm-pump.types";
import type { TechnicalArticleLocale } from "./technical-articles.types";

export type Dpl60StandardModelRow = readonly [
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
];

export type Dpl60ArticleCopy = Omit<Dpl30ArticleCopy, "section8"> & {
  section8: Dpl30ArticleCopy["section8"] & {
    exampleHeaders: Dpl30TwoColumnRow;
    exampleRows: readonly Dpl30TwoColumnRow[];
    standardModelsTitle: string;
    standardModelsIntro: string;
    standardModelHeaders: Dpl60StandardModelRow;
    standardModelRows: readonly Dpl60StandardModelRow[];
  };
  internalLinks: {
    dpl30Prefix: string;
    dpl30Label: string;
    dpl30Suffix: string;
    productPrefix: string;
    productLabel: string;
    productSuffix: string;
    categoryPrefix: string;
    categoryLabel: string;
    categorySuffix: string;
  };
};

export type Dpl60ArticleCopyMap = Record<
  TechnicalArticleLocale,
  Dpl60ArticleCopy
>;

export type Dpl60FaqCopyMap = Record<TechnicalArticleLocale, Dpl30FaqCopy>;

export type Dpl60ThreeColumnRow = Dpl30ThreeColumnRow;
