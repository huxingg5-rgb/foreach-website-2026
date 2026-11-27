import { getHindiDraftLink, hindiEnglishFallbackSuffix } from "@/lib/i18n/draft-languages";
import type { TechnicalArticlePrimaryCategory, TechnicalArticleSecondaryCategory, TechnicalArticlesPageData } from "@/data/resources/technical-articles/technical-articles.types";
import type { DiaphragmPumpEngineeringArticleCopy, EngineeringArticleBlock } from "@/data/resources/technical-articles/diaphragm-pump-engineering-article.types";
import waterVsReagent from "@/data/resources/technical-articles/engineering-locales/hi/300-ml-min-micro-liquid-diaphragm-pump-water-vs-reagent.json";
import selfPrimingLoss from "@/data/resources/technical-articles/engineering-locales/hi/300-ml-min-micro-liquid-diaphragm-pump-self-priming-loss.json";
import hindiEpdmPtfeFfkm from "@/data/resources/technical-articles/engineering-locales/hi/300-ml-min-micro-liquid-diaphragm-pump-epdm-ptfe-ffkm.json";
import hindiMotorRunsNoFlow from "@/data/resources/technical-articles/engineering-locales/hi/300-ml-min-micro-liquid-diaphragm-pump-motor-runs-no-flow.json";
import hindi100KpaVs600KpaDiaphragmPumpSelection from "@/data/resources/technical-articles/engineering-locales/hi/100-kpa-vs-600-kpa-diaphragm-pump-selection.json";
import hindi300MlMinDiaphragmPumpFlowMargin from "@/data/resources/technical-articles/engineering-locales/hi/300-ml-min-diaphragm-pump-flow-margin.json";
import hindi300Vs600MlMinDiaphragmPumpSelection from "@/data/resources/technical-articles/engineering-locales/hi/300-vs-600-ml-min-diaphragm-pump-selection.json";
import hindi300Vs600MlMinInkCirculationReturnPumpSelection from "@/data/resources/technical-articles/engineering-locales/hi/300-vs-600-ml-min-ink-circulation-return-pump-selection.json";
import hindiMicroDiaphragmPumpMaterialsSelection from "@/data/resources/technical-articles/engineering-locales/hi/micro-diaphragm-pump-materials-selection.json";
import hindiInkCirculationSupplyReturnPumpDiaphragmPump from "@/data/resources/technical-articles/engineering-locales/hi/ink-circulation-supply-return-pump-diaphragm-pump.json";
import hindiWhiteInkCirculationPumpSelectionSedimentation from "@/data/resources/technical-articles/engineering-locales/hi/white-ink-circulation-pump-selection-sedimentation.json";
import hindiPistonPumpDispensingDriftDiagnosis from "@/data/resources/technical-articles/engineering-locales/hi/piston-pump-dispensing-drift-diagnosis.json";
import hindiPistonPumpAirBubblesDispensingError from "@/data/resources/technical-articles/engineering-locales/hi/piston-pump-air-bubbles-dispensing-error.json";
import hindiPistonPumpViscousLiquidAspirationSpeed from "@/data/resources/technical-articles/engineering-locales/hi/piston-pump-viscous-liquid-aspiration-speed.json";
import hindiMiniatureLiquidDiaphragmPumpCavitationDiagnosis from "@/data/resources/technical-articles/engineering-locales/hi/miniature-liquid-diaphragm-pump-cavitation-diagnosis.json";
import hindiMiniatureDiaphragmPumpPulsationDamperValidation from "@/data/resources/technical-articles/engineering-locales/hi/miniature-diaphragm-pump-pulsation-damper-validation.json";
import hindiDiaphragmPumpFlowMeterTotalizerError from "@/data/resources/technical-articles/engineering-locales/hi/diaphragm-pump-flow-meter-totalizer-error.json";
import { pistonPumpCopyToArticle, type PistonPumpArticleCopy } from "@/data/resources/technical-articles/piston-pump-articles.types";
import hindiPistonBacklash from "@/data/resources/technical-articles/piston-locales/hi/precision-piston-pump-backlash-compensation.json";
import hindiStepperMotor from "@/data/resources/technical-articles/piston-locales/hi/stepper-motor-calculation-selection.json";
import hindiModbusProtocol from "@/data/resources/technical-articles/piston-locales/hi/modbus-protocol-fluid-control.json";
import hindiPistonSelection from "@/data/resources/technical-articles/piston-locales/hi/micro-plunger-pump-selection.json";
import hindiPistonAccuracy from "@/data/resources/technical-articles/piston-locales/hi/piston-pump-accuracy-repeatability-resolution.json";
import hindiPistonHeadMaterials from "@/data/resources/technical-articles/piston-locales/hi/piston-pump-head-material-selection.json";
import hindiPistonMotion from "@/data/resources/technical-articles/piston-locales/hi/piston-pump-acceleration-deceleration-curves.json";
import hindiPtfeTubing from "@/data/resources/technical-articles/selection-locales/hi/what-is-ptfe-tubing.json";
import hindiFepTubing from "@/data/resources/technical-articles/selection-locales/hi/what-is-fep-tubing.json";
import hindiPfaTubing from "@/data/resources/technical-articles/selection-locales/hi/what-is-pfa-tubing.json";
import hindiPvcTubing from "@/data/resources/technical-articles/selection-locales/hi/what-is-pvc-tubing.json";
import hindiMedicalPvcTubing from "@/data/resources/technical-articles/selection-locales/hi/medical-pvc-tubing.json";
import hindiPvcCleaning from "@/data/resources/technical-articles/selection-locales/hi/pvc-tubing-cleaning-fluid-compatibility.json";
import hindiPvcPressure from "@/data/resources/technical-articles/selection-locales/hi/pvc-tubing-pressure-rating-pull-off-force.json";
import hindiTubingConfigurator from "@/data/resources/technical-articles/selection-locales/hi/tubing-assembly-configurator-guide.json";
import hindiProgrammablePipette from "@/data/resources/technical-articles/selection-locales/hi/what-is-a-programmable-pipetting-pump.json";
import hindiProgrammableSyringe from "@/data/resources/technical-articles/selection-locales/hi/what-is-a-programmable-syringe-pump.json";
import hindiRotarySelector from "@/data/resources/technical-articles/selection-locales/hi/how-does-a-rotary-selector-valve-work.json";
import hindiRotaryValveSelection from "@/data/resources/technical-articles/selection-locales/hi/rotary-valve-selection-guide.json";
import hindiRotaryMaterials from "@/data/resources/technical-articles/selection-locales/hi/rotary-valve-wetted-materials-selection.json";
import hindiMeteringAccuracy from "@/data/resources/technical-articles/selection-locales/hi/metering-pump-accuracy-repeatability-reagent-dispensing.json";
import hindiValvelessOverview from "@/data/resources/technical-articles/selection-locales/hi/what-is-a-valveless-metering-pump.json";
import hindiSamplingProbe from "@/data/resources/technical-articles/selection-locales/hi/sampling-probe-selection-guide.json";
import hindiHplcValve from "@/data/resources/technical-articles/selection-locales/hi/how-does-an-hplc-injection-valve-work.json";
import hindiSolenoidValve from "@/data/resources/technical-articles/selection-locales/hi/what-is-a-solenoid-valve.json";
import hindiQuickDisconnectFitting from "@/data/resources/technical-articles/selection-locales/hi/what-is-a-quick-disconnect-fitting.json";
import hindiThreadedBarb from "@/data/resources/technical-articles/selection-locales/hi/threaded-hose-barb-fittings-selection-guide.json";
import hindiFittingMaterials from "@/data/resources/technical-articles/selection-locales/hi/fitting-material-selection-guide.json";
import hindiFemaleThread from "@/data/resources/technical-articles/selection-locales/hi/female-thread-adapters-selection-guide.json";
import hindiVirtualLeaks from "@/data/resources/technical-articles/selection-locales/hi/virtual-leaks-causes-diagnosis-prevention.json";
import hindiQuickDisconnectFlow from "@/data/resources/technical-articles/selection-locales/hi/quick-disconnect-coupling-flow-pressure-drop.json";
import hindiRplSelection from "@/data/resources/technical-articles/selection-locales/hi/rpl-valveless-metering-pump-selection-guide.json";
import hindiPipettingBasics from "@/data/resources/technical-articles/selection-locales/hi/what-is-pipetting.json";
import type { PipettingBasicsWorkflow } from "@/data/resources/technical-articles/what-is-pipetting.article";
import hindiBulkheadBarb from "@/data/resources/technical-articles/selection-locales/hi/what-is-a-bulkhead-barbed-fitting.json";
import hindiBarbedOverview from "@/data/resources/technical-articles/selection-locales/hi/what-is-a-barbed-fitting.json";
import hindiLuerOverview from "@/data/resources/technical-articles/selection-locales/hi/what-is-a-luer-fitting.json";
import hindiInkjetPrinterPumps from "@/data/resources/technical-articles/engineering-locales/hi/inkjet-printer-pumps-micro-diaphragm-pumps.json";
import hindiInkStarvation from "@/data/resources/technical-articles/engineering-locales/hi/ink-starvation-inkjet-troubleshooting.json";
import hindiFluidResistanceGuide from "@/data/resources/technical-articles/engineering-locales/hi/fluid-resistance-calculator-liquid-path-design-guide.json";
import hindiSuctionResistance from "@/data/resources/technical-articles/engineering-locales/hi/suction-vs-discharge-resistance-diaphragm-pump.json";
import hindiCvKv from "@/data/resources/technical-articles/dedicated-locales/hi/cv-kv-correction-for-microfluidics.json";
import hindiCompressionRing from "@/data/resources/technical-articles/selection-locales/hi/what-is-a-compression-ring-fitting.json";
import hindiFlangedAssemblies from "@/data/resources/technical-articles/selection-locales/hi/flanged-tubing-assemblies-selection-guide.json";
import hindiHardTubeFittings from "@/data/resources/technical-articles/selection-locales/hi/hard-tube-fittings-selection-guide.json";
import hindiFerruleFitting from "@/data/resources/technical-articles/selection-locales/hi/what-is-a-ferrule-fitting.json";
import hindiPumpFlowPressure from "@/data/resources/technical-articles/engineering-locales/hi/diaphragm-pump-flow-pressure-curve-guide.json";
import hindiDiaphragmOverview from "@/data/resources/technical-articles/selection-locales/hi/what-is-a-diaphragm-pump.json";
import hindiTubingDiameterPumpFlow from "@/data/resources/technical-articles/engineering-locales/hi/tube-inner-diameter-affects-diaphragm-pump-flow.json";
import hindiHighBackpressureBudget from "@/data/resources/technical-articles/engineering-locales/hi/high-backpressure-fluid-path-pressure-budget.json";
import hindiLifeScienceDpl60 from "@/data/resources/technical-articles/engineering-locales/hi/life-science-dpl60-600ml-min-diaphragm-pump-selection-guide.json";
import hindiDiaphragmOem from "@/data/resources/technical-articles/engineering-locales/hi/foreach-miniature-diaphragm-pump-oem-integration.json";
import hindiBarbedExpansion from "@/data/resources/technical-articles/selection-locales/hi/barbed-fitting-expansion-ratio.json";
import type { RplArticleSectionNavigationItem } from "@/components/resources/technical-articles/articles/RplSelectionArticle";
import type { RelatedResourcesData } from "@/components/common/related-resources/related-resources.types";
import type { ArticleRelatedProduct } from "@/services/resources/technical-articles/getArticleRelatedProducts";
import hindiClinicalChemistryPistonPump100250500UlSelection from "@/data/resources/technical-articles/engineering-locales/hi/clinical-chemistry-piston-pump-100-250-500-ul-selection.json";
import hindiBrushedVsBrushlessDiaphragmPump3000h10000h from "@/data/resources/technical-articles/engineering-locales/hi/brushed-vs-brushless-diaphragm-pump-3000h-10000h.json";
import hindiMicroDiaphragmPumpContinuousDutyLife from "@/data/resources/technical-articles/engineering-locales/hi/micro-diaphragm-pump-continuous-duty-life.json";
import hindiSelfPrimingMiniatureLiquidDiaphragmPumpSelection from "@/data/resources/technical-articles/engineering-locales/hi/self-priming-miniature-liquid-diaphragm-pump-selection.json";
import hindiDiaphragmPumpVsPeristalticPump from "@/data/resources/technical-articles/engineering-locales/hi/diaphragm-pump-vs-peristaltic-pump.json";
import hindiDiaphragmPumpPressureRatingTerms from "@/data/resources/technical-articles/engineering-locales/hi/diaphragm-pump-pressure-rating-terms.json";
import hindiBrushlessWiring from "@/data/resources/technical-articles/dedicated-locales/hi/brushless-diaphragm-pump-2-wire-vs-5-wire.json";
import type { BrushlessWiringArticleCopy } from "@/data/resources/technical-articles/brushless-diaphragm-pump-2-wire-vs-5-wire.types";
import hindiDpl60 from "@/data/resources/technical-articles/dedicated-locales/hi/dpl60-liquid-diaphragm-pump-selection-guide.json";
import type { Dpl60ArticleCopy } from "@/data/resources/technical-articles/dpl60-liquid-diaphragm-pump.types";
import hindiDpl30 from "@/data/resources/technical-articles/dedicated-locales/hi/dpl30-liquid-diaphragm-pump-selection-guide.json";
import type { Dpl30ArticleCopy, Dpl30FaqCopy } from "@/data/resources/technical-articles/dpl30-liquid-diaphragm-pump.types";
import hindiDpl30h from "@/data/resources/technical-articles/dedicated-locales/hi/dpl30h-high-pressure-liquid-diaphragm-pump-selection-guide.json";
import type { Dpl30hArticleCopy } from "@/data/resources/technical-articles/dpl30h-high-pressure-liquid-diaphragm-pump.types";
import hindiDpgl800 from "@/data/resources/technical-articles/dedicated-locales/hi/dpgl800-gas-liquid-diaphragm-pump-selection-guide.json";
import type { Dpgl800ArticleCopy } from "@/data/resources/technical-articles/dpgl800-gas-liquid-diaphragm-pump.types";
import hindiMiniatureDiaphragmPumpFlowPulsationReduction from "@/data/resources/technical-articles/engineering-locales/hi/miniature-diaphragm-pump-flow-pulsation-reduction.json";
import hindiMiniatureDiaphragmPumpNoiseVibrationReduction from "@/data/resources/technical-articles/engineering-locales/hi/miniature-diaphragm-pump-noise-vibration-reduction.json";
import hindiMiniatureDiaphragmPumpBackflowCheckValve from "@/data/resources/technical-articles/engineering-locales/hi/miniature-diaphragm-pump-backflow-check-valve.json";
import hindiDiaphragmPumpFlowDropReservoirVenting from "@/data/resources/technical-articles/engineering-locales/hi/diaphragm-pump-flow-drop-reservoir-venting.json";
import hindiDiaphragmPumpMultipleWashNozzlesFlowBalance from "@/data/resources/technical-articles/engineering-locales/hi/diaphragm-pump-multiple-wash-nozzles-flow-balance.json";
import hindiIvdCleaningWashRinsePumpDiaphragmPump from "@/data/resources/technical-articles/engineering-locales/hi/ivd-cleaning-wash-rinse-pump-diaphragm-pump.json";
import hindiIvdWasteLiquidPumpLiquidVsGasLiquidDiaphragmPump from "@/data/resources/technical-articles/engineering-locales/hi/ivd-waste-liquid-pump-liquid-vs-gas-liquid-diaphragm-pump.json";
import hindiIvdWasteAspirationLiquidPumpVsVacuumPump from "@/data/resources/technical-articles/engineering-locales/hi/ivd-waste-aspiration-liquid-pump-vs-vacuum-pump.json";
import hindiLabLiquidWasteAspirationTroubleshooting from "@/data/resources/technical-articles/engineering-locales/hi/lab-liquid-waste-aspiration-troubleshooting.json";
import { getTechnicalArticlesPageData } from "./getTechnicalArticlesPageData";

const engineeringCopies: Readonly<Record<string, DiaphragmPumpEngineeringArticleCopy>> = {
  "foreach-miniature-diaphragm-pump-oem-integration": hindiDiaphragmOem as DiaphragmPumpEngineeringArticleCopy,
  "life-science-dpl60-600ml-min-diaphragm-pump-selection-guide": hindiLifeScienceDpl60 as DiaphragmPumpEngineeringArticleCopy,
  "tube-inner-diameter-affects-diaphragm-pump-flow": hindiTubingDiameterPumpFlow as DiaphragmPumpEngineeringArticleCopy,
  "high-backpressure-fluid-path-pressure-budget": hindiHighBackpressureBudget as DiaphragmPumpEngineeringArticleCopy,
  "diaphragm-pump-flow-pressure-curve-guide": hindiPumpFlowPressure as DiaphragmPumpEngineeringArticleCopy,
  "inkjet-printer-pumps-micro-diaphragm-pumps": hindiInkjetPrinterPumps as DiaphragmPumpEngineeringArticleCopy,
  "ink-starvation-inkjet-troubleshooting": hindiInkStarvation as DiaphragmPumpEngineeringArticleCopy,
  "fluid-resistance-calculator-liquid-path-design-guide": hindiFluidResistanceGuide as DiaphragmPumpEngineeringArticleCopy,
  "suction-vs-discharge-resistance-diaphragm-pump": hindiSuctionResistance as DiaphragmPumpEngineeringArticleCopy,
  "lab-liquid-waste-aspiration-troubleshooting": hindiLabLiquidWasteAspirationTroubleshooting as DiaphragmPumpEngineeringArticleCopy,
  "ivd-waste-aspiration-liquid-pump-vs-vacuum-pump": hindiIvdWasteAspirationLiquidPumpVsVacuumPump as DiaphragmPumpEngineeringArticleCopy,
  "ivd-waste-liquid-pump-liquid-vs-gas-liquid-diaphragm-pump": hindiIvdWasteLiquidPumpLiquidVsGasLiquidDiaphragmPump as DiaphragmPumpEngineeringArticleCopy,
  "ivd-cleaning-wash-rinse-pump-diaphragm-pump": hindiIvdCleaningWashRinsePumpDiaphragmPump as DiaphragmPumpEngineeringArticleCopy,
  "diaphragm-pump-multiple-wash-nozzles-flow-balance": hindiDiaphragmPumpMultipleWashNozzlesFlowBalance as DiaphragmPumpEngineeringArticleCopy,
  "diaphragm-pump-flow-drop-reservoir-venting": hindiDiaphragmPumpFlowDropReservoirVenting as DiaphragmPumpEngineeringArticleCopy,
  "miniature-diaphragm-pump-backflow-check-valve": hindiMiniatureDiaphragmPumpBackflowCheckValve as DiaphragmPumpEngineeringArticleCopy,
  "miniature-diaphragm-pump-noise-vibration-reduction": hindiMiniatureDiaphragmPumpNoiseVibrationReduction as DiaphragmPumpEngineeringArticleCopy,
  "miniature-diaphragm-pump-flow-pulsation-reduction": hindiMiniatureDiaphragmPumpFlowPulsationReduction as DiaphragmPumpEngineeringArticleCopy,
  "diaphragm-pump-pressure-rating-terms": hindiDiaphragmPumpPressureRatingTerms as DiaphragmPumpEngineeringArticleCopy,
  "diaphragm-pump-vs-peristaltic-pump": hindiDiaphragmPumpVsPeristalticPump as DiaphragmPumpEngineeringArticleCopy,
  "self-priming-miniature-liquid-diaphragm-pump-selection": hindiSelfPrimingMiniatureLiquidDiaphragmPumpSelection as DiaphragmPumpEngineeringArticleCopy,
  "micro-diaphragm-pump-continuous-duty-life": hindiMicroDiaphragmPumpContinuousDutyLife as DiaphragmPumpEngineeringArticleCopy,
  "brushed-vs-brushless-diaphragm-pump-3000h-10000h": hindiBrushedVsBrushlessDiaphragmPump3000h10000h as DiaphragmPumpEngineeringArticleCopy,
  "clinical-chemistry-piston-pump-100-250-500-ul-selection": hindiClinicalChemistryPistonPump100250500UlSelection as DiaphragmPumpEngineeringArticleCopy,
  "diaphragm-pump-flow-meter-totalizer-error": hindiDiaphragmPumpFlowMeterTotalizerError as DiaphragmPumpEngineeringArticleCopy,
  "miniature-diaphragm-pump-pulsation-damper-validation": hindiMiniatureDiaphragmPumpPulsationDamperValidation as DiaphragmPumpEngineeringArticleCopy,
  "miniature-liquid-diaphragm-pump-cavitation-diagnosis": hindiMiniatureLiquidDiaphragmPumpCavitationDiagnosis as DiaphragmPumpEngineeringArticleCopy,
  "piston-pump-viscous-liquid-aspiration-speed": hindiPistonPumpViscousLiquidAspirationSpeed as DiaphragmPumpEngineeringArticleCopy,
  "piston-pump-air-bubbles-dispensing-error": hindiPistonPumpAirBubblesDispensingError as DiaphragmPumpEngineeringArticleCopy,
  "piston-pump-dispensing-drift-diagnosis": hindiPistonPumpDispensingDriftDiagnosis as DiaphragmPumpEngineeringArticleCopy,
  "white-ink-circulation-pump-selection-sedimentation": hindiWhiteInkCirculationPumpSelectionSedimentation as DiaphragmPumpEngineeringArticleCopy,
  "ink-circulation-supply-return-pump-diaphragm-pump": hindiInkCirculationSupplyReturnPumpDiaphragmPump as DiaphragmPumpEngineeringArticleCopy,
  "micro-diaphragm-pump-materials-selection": hindiMicroDiaphragmPumpMaterialsSelection as DiaphragmPumpEngineeringArticleCopy,
  "300-vs-600-ml-min-ink-circulation-return-pump-selection": hindi300Vs600MlMinInkCirculationReturnPumpSelection as DiaphragmPumpEngineeringArticleCopy,
  "300-vs-600-ml-min-diaphragm-pump-selection": hindi300Vs600MlMinDiaphragmPumpSelection as DiaphragmPumpEngineeringArticleCopy,
  "300-ml-min-diaphragm-pump-flow-margin": hindi300MlMinDiaphragmPumpFlowMargin as DiaphragmPumpEngineeringArticleCopy,
  "100-kpa-vs-600-kpa-diaphragm-pump-selection": hindi100KpaVs600KpaDiaphragmPumpSelection as DiaphragmPumpEngineeringArticleCopy,
  "300-ml-min-micro-liquid-diaphragm-pump-motor-runs-no-flow": hindiMotorRunsNoFlow as DiaphragmPumpEngineeringArticleCopy,
  "300-ml-min-micro-liquid-diaphragm-pump-epdm-ptfe-ffkm": hindiEpdmPtfeFfkm as DiaphragmPumpEngineeringArticleCopy,
  "300-ml-min-micro-liquid-diaphragm-pump-self-priming-loss": selfPrimingLoss as DiaphragmPumpEngineeringArticleCopy,
  "300-ml-min-micro-liquid-diaphragm-pump-water-vs-reagent": waterVsReagent as DiaphragmPumpEngineeringArticleCopy,
};

type HindiSelectionEdition = {
  kind: "selection";
  family?: "instrument" | "tubing" | "valve";
  copy: DiaphragmPumpEngineeringArticleCopy & { relatedProductTitles?: { tee: string; elbow: string }; relatedProductLabel?: string };
  navigation?: readonly RplArticleSectionNavigationItem[];
  workflows?: readonly PipettingBasicsWorkflow[];
  footerIntro?: string;
  subject?: { about: readonly string[]; mentions: readonly string[] };
  sources?: readonly string[];
  schemaFaq?: readonly { question: string; answer: string }[];
  modelLinks?: readonly { name: string; href: string }[];
  sidebarProducts?: readonly ArticleRelatedProduct[];
  footerProducts?: RelatedResourcesData["products"];
};

const selectionEditions = new Map<string, HindiSelectionEdition>([
  ["what-is-a-diaphragm-pump", hindiDiaphragmOverview as HindiSelectionEdition],
  ["what-is-a-compression-ring-fitting", hindiCompressionRing as HindiSelectionEdition],
  ["flanged-tubing-assemblies-selection-guide", hindiFlangedAssemblies as HindiSelectionEdition],
  ["hard-tube-fittings-selection-guide", hindiHardTubeFittings as HindiSelectionEdition],
  ["what-is-a-ferrule-fitting", hindiFerruleFitting as HindiSelectionEdition],
  ["what-is-a-bulkhead-barbed-fitting", hindiBulkheadBarb as HindiSelectionEdition],
  ["what-is-a-barbed-fitting", hindiBarbedOverview as HindiSelectionEdition],
  ["what-is-a-luer-fitting", hindiLuerOverview as HindiSelectionEdition],
  ["what-is-a-quick-disconnect-fitting", hindiQuickDisconnectFitting as HindiSelectionEdition],
  ["threaded-hose-barb-fittings-selection-guide", hindiThreadedBarb as HindiSelectionEdition],
  ["fitting-material-selection-guide", hindiFittingMaterials as HindiSelectionEdition],
  ["female-thread-adapters-selection-guide", hindiFemaleThread as HindiSelectionEdition],
  ["virtual-leaks-causes-diagnosis-prevention", hindiVirtualLeaks as HindiSelectionEdition],
  ["quick-disconnect-coupling-flow-pressure-drop", hindiQuickDisconnectFlow as HindiSelectionEdition],
  ["rpl-valveless-metering-pump-selection-guide", hindiRplSelection as HindiSelectionEdition],
  ["what-is-pipetting", hindiPipettingBasics as HindiSelectionEdition],
  ["sampling-probe-selection-guide", hindiSamplingProbe as HindiSelectionEdition],
  ["how-does-an-hplc-injection-valve-work", hindiHplcValve as HindiSelectionEdition],
  ["what-is-a-solenoid-valve", hindiSolenoidValve as HindiSelectionEdition],
  ["how-does-a-rotary-selector-valve-work", hindiRotarySelector as HindiSelectionEdition],
  ["rotary-valve-selection-guide", hindiRotaryValveSelection as HindiSelectionEdition],
  ["rotary-valve-wetted-materials-selection", hindiRotaryMaterials as HindiSelectionEdition],
  ["metering-pump-accuracy-repeatability-reagent-dispensing", hindiMeteringAccuracy as HindiSelectionEdition],
  ["what-is-a-valveless-metering-pump", hindiValvelessOverview as HindiSelectionEdition],
  ["what-is-a-programmable-pipetting-pump", hindiProgrammablePipette as HindiSelectionEdition],
  ["what-is-a-programmable-syringe-pump", hindiProgrammableSyringe as HindiSelectionEdition],
  ["what-is-pvc-tubing", hindiPvcTubing as HindiSelectionEdition],
  ["medical-pvc-tubing", hindiMedicalPvcTubing as HindiSelectionEdition],
  ["pvc-tubing-cleaning-fluid-compatibility", hindiPvcCleaning as HindiSelectionEdition],
  ["pvc-tubing-pressure-rating-pull-off-force", hindiPvcPressure as HindiSelectionEdition],
  ["tubing-assembly-configurator-guide", hindiTubingConfigurator as HindiSelectionEdition],
  ["what-is-ptfe-tubing", hindiPtfeTubing as HindiSelectionEdition],
  ["what-is-fep-tubing", hindiFepTubing as HindiSelectionEdition],
  ["what-is-pfa-tubing", hindiPfaTubing as HindiSelectionEdition],
  ["barbed-fitting-expansion-ratio", hindiBarbedExpansion as HindiSelectionEdition],
]);

const pistonCopies = new Map<string, PistonPumpArticleCopy>([
  ["piston-pump-head-material-selection", hindiPistonHeadMaterials as PistonPumpArticleCopy],
  ["piston-pump-accuracy-repeatability-resolution", hindiPistonAccuracy as PistonPumpArticleCopy],
  ["micro-plunger-pump-selection", hindiPistonSelection as PistonPumpArticleCopy],
  ["modbus-protocol-fluid-control", hindiModbusProtocol as PistonPumpArticleCopy],
  ["stepper-motor-calculation-selection", hindiStepperMotor as PistonPumpArticleCopy],
  ["precision-piston-pump-backlash-compensation", hindiPistonBacklash as PistonPumpArticleCopy],
  ["piston-pump-acceleration-deceleration-curves", hindiPistonMotion as PistonPumpArticleCopy],
]);
const hindiDpl60Copy = hindiDpl60.copy as unknown as Dpl60ArticleCopy;
const dedicatedArticles = new Map<string, HindiDedicatedArticleEdition>([
  ["cv-kv-correction-for-microfluidics", { kind: "cv-kv", copy: hindiCvKv }],
  ["brushless-diaphragm-pump-2-wire-vs-5-wire", { kind: "brushless-wiring", copy: hindiBrushlessWiring as unknown as BrushlessWiringArticleCopy }],
  ["dpl60-liquid-diaphragm-pump-selection-guide", { kind: "standard-diaphragm", copy: hindiDpl60Copy, dpl60Copy: hindiDpl60Copy, faq: hindiDpl60.faq, coverAlt: hindiDpl60.coverAlt }],
  ["dpl30-liquid-diaphragm-pump-selection-guide", { kind: "standard-diaphragm", copy: hindiDpl30.copy as unknown as Dpl30ArticleCopy, faq: hindiDpl30.faq }],
  ["dpl30h-high-pressure-liquid-diaphragm-pump-selection-guide", { kind: "dpl30h", copy: hindiDpl30h as unknown as Dpl30hArticleCopy }],
  ["dpgl800-gas-liquid-diaphragm-pump-selection-guide", { kind: "dpgl800", copy: hindiDpgl800 as unknown as Dpgl800ArticleCopy }],
]);
export const hindiTechnicalArticleSlugs = [...Object.keys(engineeringCopies), ...selectionEditions.keys(), ...pistonCopies.keys(), ...dedicatedArticles.keys()];
export const getHindiEngineeringArticle = (slug: string) => Object.hasOwn(engineeringCopies, slug) ? engineeringCopies[slug] : undefined;
type HindiDedicatedArticleEdition =
  | { kind: "cv-kv"; copy: typeof hindiCvKv }
  | { kind: "brushless-wiring"; copy: BrushlessWiringArticleCopy }
  | { kind: "standard-diaphragm"; copy: Dpl30ArticleCopy; faq: Dpl30FaqCopy; dpl60Copy?: Dpl60ArticleCopy; coverAlt?: string }
  | { kind: "dpl30h"; copy: Dpl30hArticleCopy }
  | { kind: "dpgl800"; copy: Dpgl800ArticleCopy };
export type HindiTechnicalArticleEdition = HindiSelectionEdition | HindiDedicatedArticleEdition
  | { kind: "engineering"; copy: DiaphragmPumpEngineeringArticleCopy }
  | { kind: "piston"; copy: PistonPumpArticleCopy };

export function getHindiTechnicalArticleEdition(slug: string): HindiTechnicalArticleEdition | undefined {
  const copy = getHindiEngineeringArticle(slug);
  if (copy) return { kind: "engineering", copy };
  const piston = pistonCopies.get(slug);
  return piston ? { kind: "piston", copy: piston } : selectionEditions.get(slug) ?? dedicatedArticles.get(slug);
}

export const hindiTechnicalArticlesMetadata = {
  title: "तकनीकी लेख | संसाधन | FOREACH",
  description: "उत्पाद के चयन, सामग्री की संगतता, ट्यूब कनेक्शन, सीलिंग और माइक्रोफ्लुइडिक सिस्टम के उपयोग पर FOREACH के तकनीकी लेख।",
};
export type HindiTechnicalArticlesPageData = Omit<TechnicalArticlesPageData, "locale" | "articles"> & {
  locale: "hi";
  articles: Array<TechnicalArticlesPageData["articles"][number] & { sourceLanguage?: "en" }>;
};

const primaryLabels: Record<TechnicalArticlePrimaryCategory, string> = {
  pumps: "पंप",
  valves: "वाल्व",
  "fittings-tubing": "ट्यूबिंग और फिटिंग",
  "fluid-detection-control": "द्रव का डिटेक्शन और नियंत्रण",
  "general-fluidics": "फ्लुइडिक्स की बुनियाद",
  "applications-solutions": "उपयोग और समाधान",
};

const secondaryLabels: Record<TechnicalArticleSecondaryCategory, string> = {
  "miniature-diaphragm-pumps": "लघु डायाफ्राम पंप",
  "plunger-pumps": "पिस्टन पंप",
  "valveless-metering-pump": "वाल्व-रहित मीटरिंग पंप",
  "syringe-pumps": "सिरिंज पंप",
  "pipetting-pumps": "पिपेटिंग पंप",
  "solenoid-valves": "सोलनॉइड वाल्व",
  "multi-port-valves": "मल्टी-पोर्ट वाल्व",
  "high-pressure-valves": "उच्च-दाब वाल्व",
  "fluid-switching-valves": "द्रव स्विचिंग वाल्व",
  fittings: "फिटिंग",
  "ferrules-connectors": "फ़ेरूल और कनेक्टर",
  "flexible-rigid-tubing": "लचीली और कठोर ट्यूबिंग",
  "tubing-accessories": "ट्यूबिंग की एक्सेसरीज़",
  "pressure-detection-control": "दाब मापन और नियंत्रण",
  "liquid-level-detection": "द्रव स्तर का डिटेक्शन",
  "fluid-state-detection": "द्रव की स्थिति का डिटेक्शन",
  "intelligent-fluid-control": "स्मार्ट द्रव नियंत्रण",
  "flow-operating-point": "प्रवाह और संचालन बिंदु",
  "pressure-backpressure": "दाब और बैक प्रेशर",
  "self-priming-negative-pressure-vacuum": "सेल्फ़-प्राइमिंग, ऋणात्मक दाब और वैक्यूम",
  "tubing-resistance-pressure-drop": "ट्यूबिंग प्रतिरोध और दाब हानि",
  "material-chemical-compatibility": "सामग्री की रासायनिक संगतता",
  "sealing-leakage": "सीलिंग और रिसाव",
  "bubbles-pulsation": "बुलबुले और प्रवाह स्पंदन",
  "lifetime-reliability": "सेवा जीवन और भरोसेमंदी",
  "testing-validation": "परीक्षण और सत्यापन",
  "ivd-medical-devices": "इन विट्रो डायग्नोस्टिक्स और चिकित्सा उपकरण",
  "life-science-synthetic-biology": "जीवन विज्ञान और सिंथेटिक बायोलॉजी",
  "laboratory-automation": "लैब ऑटोमेशन",
  "analytical-instruments": "विश्लेषणात्मक उपकरण",
  "cleaning-waste": "सफ़ाई और अपशिष्ट द्रव",
  "reagent-sample-handling": "अभिकर्मक और नमूना संचालन",
  "printing-inkjet": "इंकजेट प्रिंटिंग",
  "oem-fluidic-systems": "OEM फ्लुइडिक सिस्टम",
};

function getEngineeringSearchText(block: EngineeringArticleBlock): string {
  switch (block.type) {
    case "paragraph": case "notice": return block.text;
    case "subheading": return block.title;
    case "formula": return [block.expression, block.note].filter(Boolean).join(" ");
    case "list": return block.items.join(" ");
    case "table": return [...block.headers, ...block.rows.flat()].join(" ");
    case "figure": return [block.alt, block.caption].filter(Boolean).join(" ");
    case "links": return block.items.map(item => item.label).join(" ");
  }
}

const hindiArticleTags: Readonly<Record<string, string>> = {
  "Stepper Motor": "स्टेपर मोटर",
  "Motion Control": "गति नियंत्रण",
  "Piston pump": "पिस्टन पंप",
  "Piston Pump": "पिस्टन पंप",
  "Flow and operating point": "प्रवाह और संचालन बिंदु",
  "Reagent validation": "अभिकर्मक सत्यापन",
  "Reagent compatibility": "अभिकर्मक की संगतता",
  "Self-priming": "सेल्फ़-प्राइमिंग",
  "Flow": "प्रवाह",
  "Material compatibility": "सामग्री की संगतता",
  "Bubbles": "बुलबुले",
};

export function getHindiTechnicalArticleFields(edition: HindiTechnicalArticleEdition) {
  if (edition.kind === "piston") return pistonPumpCopyToArticle(edition.copy);
  if (edition.kind === "cv-kv") {
    const { metadata, body } = edition.copy;
    return { ...metadata, content: [body.intro, body.assumptions, body.correction, body.channel, body.orifice, body.conclusion]
      .map(section => ({ title: section.title, content: section.paragraphs.join("\n") })) };
  }
  if (edition.kind === "brushless-wiring") {
    const { metadata, deck, conclusion, twoWire, fiveWire, comparison, selection, products, faqItems } = edition.copy;
    return { ...metadata, summary: deck, content: [
      { title: conclusion.title, content: conclusion.text },
      { title: twoWire.title, content: [twoWire.intro, ...twoWire.paragraphs].join("\n") },
      { title: fiveWire.title, content: [fiveWire.intro, ...fiveWire.paragraphs].join("\n") },
      { title: comparison.title, content: comparison.rows.flat().join("\n") },
      { title: selection.title, content: [selection.decision, selection.fixedSpeedCaution, selection.futureControl].join("\n") },
      { title: products.title, content: products.paragraphs.join("\n") },
      ...faqItems.map(item => ({ title: item.question, content: item.answer })),
    ] };
  }
  if (edition.kind === "dpgl800" || edition.kind === "dpl30h" || edition.kind === "standard-diaphragm") {
    const { metadata, section1 } = edition.copy;
    const sections = Object.entries(edition.copy).filter(([key]) => /^section[0-9]+$/.test(key));
    const readText = (value: unknown): string[] => typeof value === "string" ? [value]
      : value && typeof value === "object" ? Object.values(value).flatMap(readText) : [];
    return { ...metadata, ...(edition.kind === "standard-diaphragm" && edition.coverAlt ? { coverAlt: edition.coverAlt } : {}), summary: section1.paragraphs[0], content: [
      ...sections.flatMap(([, section]) => "title" in section ? [{ title: section.title, content: readText(section).join("\n") }] : []),
      ...(edition.kind === "standard-diaphragm" ? edition.faq.items.map(item => ({ title: item.question, content: item.answer })) : []),
    ] };
  }
  return {
    ...edition.copy.metadata,
    summary: edition.copy.deck,
    content: [
      { title: edition.copy.metadata.title, content: edition.copy.leadBlocks.map(getEngineeringSearchText).join("\n") },
      ...edition.copy.sections.map(section => ({ title: section.title, content: section.blocks.map(getEngineeringSearchText).join("\n") })),
      ...edition.copy.faqItems.map(item => ({ title: item.question, content: item.answer })),
    ],
  };
}

export function getHindiTechnicalArticlesPageData(): HindiTechnicalArticlesPageData {
  const source = getTechnicalArticlesPageData("en");
  const contact = getHindiDraftLink("/en/contact/");
  return {
    ...source,
    locale: "hi",
    hero: { ...source.hero, title: "तकनीकी लेख", description: hindiTechnicalArticlesMetadata.description },
    breadcrumbs: [
      { label: "होम", href: getHindiDraftLink("/en/").href },
      { label: "संसाधन", href: getHindiDraftLink("/en/resources/").href },
      { label: "तकनीकी लेख" },
    ],
    search: { placeholder: "विषय, उत्पाद या सामग्री से खोजें" },
    sectionTitle: "तकनीकी लेख",
    bottomBanner: {
      title: "उत्पाद चुनने में तकनीकी मदद चाहिए?",
      description: "द्रव, दाब की रेंज, ट्यूब के आयाम और संचालन की स्थितियाँ बताएँ या अपनी ड्रॉइंग भेजें। FOREACH सही उत्पाद चुनने और उसकी तकनीकी जाँच करने में आपकी मदद करेगा।",
      actions: [{ label: "हमसे संपर्क करें" + (contact.hrefLang === "en" ? hindiEnglishFallbackSuffix : ""), href: contact.href }],
    },
    taxonomy: source.taxonomy.map(group => ({
      ...group, label: primaryLabels[group.key],
      children: group.children.map(child => ({ ...child, label: secondaryLabels[child.key] })),
    })),
    articles: source.articles.map(article => {
      const edition = getHindiTechnicalArticleEdition(article.slug);
      const destination = getHindiDraftLink("/en/resources/technical-articles/" + article.slug + "/");
      if (!edition || destination.hrefLang !== "hi") return { ...article, sourceLanguage: "en" };
      return {
        ...article, ...getHindiTechnicalArticleFields(edition),
        tags: article.tags.map(tag => hindiArticleTags[tag] ?? tag),
      };
    }),
  };
}
