import type { LiquidChromatographySlug } from "./liquid-chromatography";
import { PISTON_PRODUCT_LINKS } from "./piston-link-network";
import { getValvelessPumpPath } from "@/data/products/selection/valveless-pump-routes";

// English LC task relations only. Series cards are configuration entry points,
// not a recommendation of the representative image's capacity or materials.
export const LC_PRODUCTS = {
  ea: { label: "EA standard piston-pump configurations", href: PISTON_PRODUCT_LINKS.eaSeries, seriesId: "ea" },
  sm: { label: "SM miniature piston-pump configurations", href: PISTON_PRODUCT_LINKS.smSeries, seriesId: "sm" },
  tm: { label: "TM ultra-compact piston-pump configurations", href: PISTON_PRODUCT_LINKS.tmSeries, seriesId: "tm" },
  dpl30: { label: "DPL30 liquid diaphragm pump", href: "/en/products/pumps/miniature-diaphragm-pumps/dpl30-liquid-diaphragm-pump/", seriesId: "dpl30-liquid-diaphragm-pump" },
  dpl30h: { label: "DPL30H liquid diaphragm pump", href: "/en/products/pumps/miniature-diaphragm-pumps/dpl30h-liquid-diaphragm-pump/", seriesId: "dpl30h-liquid-diaphragm-pump" },
  dpgl800: { label: "DPGL800 gas-liquid diaphragm pump", href: "/en/products/pumps/miniature-diaphragm-pumps/dpgl800-gas-liquid-diaphragm-pump/", seriesId: "dpgl800-gas-liquid-diaphragm-pump" },
  rpl4: { label: "RPL-P4 valveless metering pump", href: getValvelessPumpPath("en", "rpl-p4"), seriesId: "rpl-p4" },
  rpl635: { label: "RPL-P6.35 valveless metering pump", href: getValvelessPumpPath("en", "rpl-p635"), seriesId: "rpl-p635" },
} as const;

type Reading = { sectionId: string; slug: string; anchor: string; text: string };
type TaskResources = { products: readonly (keyof typeof LC_PRODUCTS)[]; readings: readonly Reading[] };
const reading = (sectionId: string, slug: string, anchor: string, text: string): Reading => ({ sectionId, slug, anchor, text });
export const lcArticleHref = (slug: string) => `/en/resources/technical-articles/${slug}/`;

// Each reading is linked within its relevant selection/validation section as
// well as in the shared related-article cards. Do not reuse broad IVD relations.
export const LC_TASK_RESOURCES = {
  "liquid-chromatography": {
    products: ["ea", "dpl30", "dpgl800", "rpl4"],
    readings: [
      reading("product-direction", "micro-plunger-pump-selection", "piston-pump selection guide", "For the metering branch, use the piston-pump selection guide to prepare dose, materials and control requirements. Confirm pressure isolation before treating a dispensing configuration as an autosampler candidate."),
      reading("selection-start", "dpl30-liquid-diaphragm-pump-selection-guide", "DPL30 selection guide", "For a liquid-only wash branch, the DPL30 selection guide explains the product's operating limits. Apply these checks to the installed wash path rather than assuming the free-flow rating is the wash-port delivery rate."),
      reading("selection-start", "rpl-valveless-metering-pump-selection-guide", "RPL selection guide", "If the analytical method requires post-column reagent addition, review the RPL selection guide for displacement, drive and material choices. Suitability still depends on the reagent branch and complete-method validation."),
    ],
  },
  "lc-autosampler-piston-pumps": {
    products: ["ea", "sm", "tm"],
    readings: [
      reading("series-selection", "micro-plunger-pump-selection", "piston-pump selection guide", "Use the piston-pump selection guide to compare the capacity, drive and installation inputs after the pressure boundary is established. TM remains a space-driven option, not a default choice for every autosampler."),
      reading("channel-performance", "piston-pump-accuracy-repeatability-resolution", "accuracy, repeatability and resolution", "Review the distinction between accuracy, repeatability and resolution before converting motor steps into an injection-volume specification. Acceptance must be measured at the working volume with the complete channel."),
      reading("contact-path", "piston-pump-head-material-selection", "pump-head material selection", "For direct sample contact and system-liquid operation, the pump-head material selection guide helps frame the compatibility discussion. Include seals, valves and cleaning exposure, not only the visible pump head."),
    ],
  },
  "lc-sample-metering": {
    products: ["ea", "sm"],
    readings: [
      reading("working-stroke", "piston-pump-accuracy-repeatability-resolution", "accuracy, repeatability and resolution", "Before specifying a short working stroke, compare accuracy, repeatability and resolution. A nominal volume per step does not establish the smallest reliable sample dose."),
      reading("error-diagnosis", "piston-pump-air-bubbles-dispensing-error", "air bubbles and dispensing error", "When delivery varies after priming or idle periods, review air bubbles and dispensing error to plan checks for trapped gas and compressible volume. Confirm the cause before changing capacity or calibration."),
      reading("first-injection", "piston-pump-dispensing-drift-diagnosis", "dispensing-drift diagnosis", "Use the dispensing-drift diagnosis guide to separate gradual drift from first-cycle and intermittent errors, then repeat the checks under the intended injection sequence."),
    ],
  },
  "lc-sample-loop-loading": {
    products: ["ea", "sm"],
    readings: [
      reading("volume-budget", "piston-pump-accuracy-repeatability-resolution", "accuracy, repeatability and resolution", "The guide to accuracy, repeatability and resolution explains why commanded displacement is not sufficient evidence of loaded sample volume. Check the loop, connecting volumes and loading mode together."),
      reading("valve-sequence", "piston-pump-air-bubbles-dispensing-error", "air bubbles and dispensing error", "If loop loading becomes inconsistent after switching or priming, use the guide to air bubbles and dispensing error to investigate gas in the transfer path before increasing the loading volume."),
      reading("loop-pump-selection", "piston-pump-head-material-selection", "pump-head material selection", "Review pump-head material selection with the actual sample or system liquid and wash solvent. The selected head is only one part of the complete wetted-path assessment."),
    ],
  },
  "lc-needle-wash-diaphragm-pumps": {
    products: ["dpl30", "dpl30h", "dpgl800"],
    readings: [
      reading("diaphragm-candidates", "dpl30-liquid-diaphragm-pump-selection-guide", "DPL30 selection guide", "For liquid supply or a suitable liquid-only drain, review the DPL30 selection guide against the actual media, suction conditions and outlet resistance."),
      reading("supply-versus-drain", "dpgl800-gas-liquid-diaphragm-pump-selection-guide", "DPGL800 gas-liquid selection guide", "For mixed air-liquid aspiration, use the DPGL800 gas-liquid selection guide to check the permitted media and duty. Its gas-flow specification is not a liquid drain-rate specification."),
    ],
  },
  "lc-needle-wash-supply": {
    products: ["dpl30", "dpl30h"],
    readings: [
      reading("wash-pump-choice", "dpl30-liquid-diaphragm-pump-selection-guide", "DPL30 selection guide", "Use the DPL30 selection guide to compare the pump configuration with the wash formulation and operating point before increasing pump size or pressure capability."),
      reading("wash-flow-calculation", "dpl30h-high-pressure-liquid-diaphragm-pump-selection-guide", "DPL30H selection guide", "Where the wash circuit has a demonstrated higher-resistance requirement, consult the DPL30H selection guide. Verify achievable flow at that load; maximum pressure and free-flow values are not a simultaneous operating point."),
    ],
  },
  "lc-waste-aspiration": {
    products: ["dpl30", "dpgl800"],
    readings: [
      reading("waste-candidates", "dpgl800-gas-liquid-diaphragm-pump-selection-guide", "DPGL800 gas-liquid selection guide", "Read the DPGL800 gas-liquid selection guide before specifying mixed-media drainage. Confirm the gas-liquid condition, allowable duty and actual suction performance; do not use this candidate for 100% liquid transfer."),
      reading("waste-architecture", "dpl30-liquid-diaphragm-pump-selection-guide", "DPL30 selection guide", "For a suitable liquid-only path, the DPL30 selection guide provides a separate starting point. Evaluate the inlet condition and required drainage rate rather than treating it as interchangeable with a gas-liquid pump."),
    ],
  },
  "lc-post-column-valveless-pumps": {
    products: ["rpl4", "rpl635"],
    readings: [
      reading("rpl-candidates", "rpl-valveless-metering-pump-selection-guide", "RPL selection guide", "The RPL selection guide covers displacement and configuration choices for the separate reagent branch. Use it to prepare an engineering shortlist, not as evidence that a model is validated for every derivatization method."),
      reading("valveless-role", "what-is-a-valveless-metering-pump", "valveless metering-pump principle", "Review the valveless metering-pump principle to understand the pumping mechanism and its boundaries. Valveless operation does not remove the need to measure flow variation, compatibility or detector response."),
    ],
  },
  "lc-derivatization-reagent-dosing": {
    products: ["rpl4", "rpl635"],
    readings: [
      reading("reagent-operating-point", "rpl-valveless-metering-pump-selection-guide", "RPL selection guide", "Use the RPL selection guide to relate the required reagent flow to displacement, speed and configuration. Verify the result at the actual backpressure before accepting a calculated operating point."),
      reading("method-validation", "what-is-a-valveless-metering-pump", "valveless metering-pump principle", "The valveless metering-pump principle provides background for the mechanism. Complete the selection with measurements of delivered flow and the analytical method's baseline, sensitivity and peak-shape requirements."),
    ],
  },
} as const satisfies Record<LiquidChromatographySlug, TaskResources>;
