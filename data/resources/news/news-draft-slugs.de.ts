export const germanNewsArticleSlugs = [
  "medica-2026",
  "adlm-2026-onsite",
  "adlm-2026-team-departure",
  "quality-manufacturing-capability-2026",
  "adlm-2026",
  "me-supply-chain-expo-2026",
  "guangzhou-high-med-expo-2026",
  "caclp-2026",
  "whx-labs-dubai-2026",
  "specialized-new-conference-2025",
  "medical-device-innovation-2025",
  "gazelle-enterprise-2025",
  "guangming-quality-cultivation-2024",
  "national-little-giant-2024",
  "iso-9001-certification",
  "iso-13485-certification",
  "cmef-icmd-2014",
] as const;

export type GermanNewsArticleSlug = (typeof germanNewsArticleSlugs)[number];
