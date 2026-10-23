export type ValvelessForeignLocale = "en" | "es" | "fr" | "ko" | "ru";
export type ValvelessScenario = "reagent" | "titration" | "smallfill" | "midfill" | "largefill" | "buffer" | "continuous" | "dilution" | "preparation" | "batch";
export type ValvelessLocaleCopy = {
  categoryName: string; singleName: string; dualName: string;
  category: { title: string; metaDescription: string; paragraphs: string[] };
  single: { title: string; paragraphs: string[] };
  dual: { title: string; paragraphs: string[] };
  materials: { pvdf: string; alumina: string; zirconia: string };
  cards: { p4: string; p635: string; p15: string; dual9: string; dual19: string };
  introductions: Record<"p4" | "p635" | "p15" | "dual9" | "dual19", {
    title: string; paragraphs: string[]; commonApplications: string[]; metaDescription: string;
  }>;
  intros: { p4: string; p635: string; p15: string; dual: string };
  reagentSetup: { p4: string; p635: string };
  applications: Record<ValvelessScenario, { title: string; paragraphs: string[] }>;
  faqSingle: { question: string; answer: string }[];
  modelFaqs: Record<"p635" | "p15", { question: string; answer: string }[]>;
  faqDual: { question: string; answer: string }[];
  materialDetails: { p4: string; p635: string; p15: string };
  selectionSingle: string; selectionDual: string;
  specs: Record<string, string>;
  customConfiguration: string; metalFitting: string;
  applicationsTab: string; applicationsTitle: string; selectionTitle: string;
  ctaTitle: string; ctaButton: string;
  drawingUnavailable: string; modelUnavailable: string;
  specNotesSingle: string[]; specNotesDual: string[];
};
