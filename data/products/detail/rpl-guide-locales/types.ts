import type { GuideSection } from "../instrument-product-guides.zh";
import type { ValvelessForeignLocale } from "../valveless-locales/types";

export type RplGuideParameters = {
  model: string;
  range: string;
  ceramic: string;
  port: string;
  rinse: boolean;
  testRpm: number;
};
export type RplFigureKey = "cycle" | "components" | "adjustment" | "motor4" | "motor6" | "optical" | "installation" | "position" | "measurement";
export type RplGuideText = {
  productType: string;
  lead: string;
  features: readonly (readonly [string, string])[];
  documents: readonly (readonly [string, string])[];
  sections: Record<string, Pick<GuideSection, "title" | "intro" | "rows" | "steps" | "note">>;
  figures: Record<RplFigureKey, { alt: string; caption: string; legend?: readonly string[] }>;
};
export type RplGuideLocale = ValvelessForeignLocale;
