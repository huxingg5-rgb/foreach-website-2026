export const draftLanguages = {
  de: { label: "Deutsch", flag: "de", languageTag: "de-DE" },
  it: { label: "Italiano", flag: "it", languageTag: "it-IT" },
  hi: { label: "हिन्दी", flag: "in", languageTag: "hi-IN" },
} as const;

export type DraftLocale = keyof typeof draftLanguages;
