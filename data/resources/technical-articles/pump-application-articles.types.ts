import type { DiaphragmPumpEngineeringArticleCopy } from "./diaphragm-pump-engineering-article.types";

export const pumpApplicationArticleSlugs = [
  "clinical-chemistry-piston-pump-100-250-500-ul-selection",
  "diaphragm-pump-multiple-wash-nozzles-flow-balance",
  "diaphragm-pump-flow-drop-reservoir-venting"
] as const;

export type PumpApplicationArticleSlug = (typeof pumpApplicationArticleSlugs)[number];
export type PumpApplicationArticleCopy = DiaphragmPumpEngineeringArticleCopy;
