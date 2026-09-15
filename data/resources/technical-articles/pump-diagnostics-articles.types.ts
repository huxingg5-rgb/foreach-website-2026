import type { TechnicalArticleLocale } from "./technical-articles.types";

export const pumpDiagnosticsSlugs = [
  "piston-pump-air-bubbles-dispensing-error",
  "piston-pump-viscous-liquid-aspiration-speed",
  "piston-pump-dispensing-drift-diagnosis",
  "miniature-diaphragm-pump-pulsation-damper-validation",
  "miniature-liquid-diaphragm-pump-cavitation-diagnosis",
  "diaphragm-pump-flow-meter-totalizer-error",
] as const;

export type DiagnosticsDraft = {
  title: string;
  seo: string;
  description: string;
  deck: string;
  sections: { title: string; paragraphs: string[] }[];
  formula: { section: number; expression: string; note: string };
  table: { section: number; headers: string[]; rows: string[][] };
  diagram: string;
  faq: { question: string; answer: string }[];
  links: string[];
};

export type DiagnosticsLocaleUi = {
  faq: string;
  references: string;
  related: string;
  cta: string;
  description: string;
  contact: string;
  products: string;
  referenceLabels: string[];
};

export type DiagnosticsUi = Record<TechnicalArticleLocale, DiagnosticsLocaleUi>;
