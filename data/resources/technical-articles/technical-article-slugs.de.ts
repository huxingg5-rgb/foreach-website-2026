import { dpgl800ArticleSlug } from "./dpgl800-gas-liquid-diaphragm-pump.article";
import { dpl60ArticleSlug } from "./dpl60-liquid-diaphragm-pump.article";
import { dpl30ArticleSlug } from "./dpl30-liquid-diaphragm-pump.article";
import { dpl30hArticleSlug } from "./dpl30h-high-pressure-liquid-diaphragm-pump.article";
import { cvKvMicrofluidicsSlug } from "./cv-kv-microfluidics.de";
import { samplingProbeSelectionSlug } from "./technical-article-availability";
import { germanBatchEngineeringArticleSlugs } from "./engineering-article-slugs.de";
import { germanBatchTechnicalArticleSlugs } from "./technical-article-batch-slugs.de";

// Only complete, reviewed German article bodies belong in this preview route list.
export const germanTechnicalArticleSlugs: readonly string[] = [
  samplingProbeSelectionSlug,
  cvKvMicrofluidicsSlug,
  dpl30ArticleSlug,
  dpl30hArticleSlug,
  dpl60ArticleSlug,
  dpgl800ArticleSlug,
  "piston-pump-air-bubbles-dispensing-error",
  "piston-pump-viscous-liquid-aspiration-speed",
  "piston-pump-dispensing-drift-diagnosis",
  "miniature-diaphragm-pump-pulsation-damper-validation",
  "miniature-liquid-diaphragm-pump-cavitation-diagnosis",
  "diaphragm-pump-flow-meter-totalizer-error",
  "fluid-resistance-calculator-liquid-path-design-guide",
  "micro-diaphragm-pump-materials-selection",
  "300-ml-min-micro-liquid-diaphragm-pump-motor-runs-no-flow",
  "diaphragm-pump-pressure-rating-terms",
  "piston-pump-head-material-selection",
  "piston-pump-accuracy-repeatability-resolution",
  ...germanBatchEngineeringArticleSlugs,
  ...germanBatchTechnicalArticleSlugs,
];
