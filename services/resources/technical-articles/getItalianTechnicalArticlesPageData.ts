import { getTechnicalArticlesPageData } from "./getTechnicalArticlesPageData";
import type {
  ClassifiedTechnicalArticleItem,
  TechnicalArticlePrimaryCategory,
  TechnicalArticleSecondaryCategory,
  TechnicalArticlesPageData,
} from "@/data/resources/technical-articles/technical-articles.types";
import { getItalianDraftLink } from "@/lib/i18n/draft-languages";
import itSelectionWhatIsACompressionRingFitting from "@/data/resources/technical-articles/selection-locales/it/what-is-a-compression-ring-fitting.json";
import itEngineeringWhiteInkCirculationPumpSelectionSedimentation from "@/data/resources/technical-articles/engineering-locales/it/white-ink-circulation-pump-selection-sedimentation.json";
import itEngineeringInkCirculationSupplyReturnPumpDiaphragmPump from "@/data/resources/technical-articles/engineering-locales/it/ink-circulation-supply-return-pump-diaphragm-pump.json";
import itSelectionWhatIsALuerFitting from "@/data/resources/technical-articles/selection-locales/it/what-is-a-luer-fitting.json";
import itSelectionWhatIsABarbedFitting from "@/data/resources/technical-articles/selection-locales/it/what-is-a-barbed-fitting.json";
import itSelectionWhatIsAFerruleFitting from "@/data/resources/technical-articles/selection-locales/it/what-is-a-ferrule-fitting.json";
import itEngineering300Vs600MlMinInkCirculationReturnPumpSelection from "@/data/resources/technical-articles/engineering-locales/it/300-vs-600-ml-min-ink-circulation-return-pump-selection.json";
import itSelectionWhatIsPipetting from "@/data/resources/technical-articles/selection-locales/it/what-is-pipetting.json";
import itSelectionWhatIsAProgrammableSyringePump from "@/data/resources/technical-articles/selection-locales/it/what-is-a-programmable-syringe-pump.json";
import itSelectionWhatIsAProgrammablePipettingPump from "@/data/resources/technical-articles/selection-locales/it/what-is-a-programmable-pipetting-pump.json";
import itSelectionMeteringPumpAccuracyRepeatabilityReagentDispensing from "@/data/resources/technical-articles/selection-locales/it/metering-pump-accuracy-repeatability-reagent-dispensing.json";
import itSelectionWhatIsAValvelessMeteringPump from "@/data/resources/technical-articles/selection-locales/it/what-is-a-valveless-metering-pump.json";
import itSelectionRplValvelessMeteringPumpSelectionGuide from "@/data/resources/technical-articles/selection-locales/it/rpl-valveless-metering-pump-selection-guide.json";
import itEngineeringMiniatureDiaphragmPumpNoiseVibrationReduction from "@/data/resources/technical-articles/engineering-locales/it/miniature-diaphragm-pump-noise-vibration-reduction.json";
import itEngineeringBrushedVsBrushlessDiaphragmPump3000H10000H from "@/data/resources/technical-articles/engineering-locales/it/brushed-vs-brushless-diaphragm-pump-3000h-10000h.json";
import itEngineering300MlMinMicroLiquidDiaphragmPumpSelfPrimingLoss from "@/data/resources/technical-articles/engineering-locales/it/300-ml-min-micro-liquid-diaphragm-pump-self-priming-loss.json";
import itEngineering300MlMinMicroLiquidDiaphragmPumpEpdmPtfeFfkm from "@/data/resources/technical-articles/engineering-locales/it/300-ml-min-micro-liquid-diaphragm-pump-epdm-ptfe-ffkm.json";
import itEngineeringWashNozzleBalance from "@/data/resources/technical-articles/engineering-locales/it/diaphragm-pump-multiple-wash-nozzles-flow-balance.json";
import itEngineeringReservoirVenting from "@/data/resources/technical-articles/engineering-locales/it/diaphragm-pump-flow-drop-reservoir-venting.json";
import itEngineeringSelfPriming from "@/data/resources/technical-articles/engineering-locales/it/self-priming-miniature-liquid-diaphragm-pump-selection.json";
import itEngineeringFlowPulsation from "@/data/resources/technical-articles/engineering-locales/it/miniature-diaphragm-pump-flow-pulsation-reduction.json";
import itEngineeringStoppedBackflow from "@/data/resources/technical-articles/engineering-locales/it/miniature-diaphragm-pump-backflow-check-valve.json";
import itEngineeringPressureRatingTerms from "@/data/resources/technical-articles/engineering-locales/it/diaphragm-pump-pressure-rating-terms.json";
import itEngineeringHighPressureBudget from "@/data/resources/technical-articles/engineering-locales/it/high-backpressure-fluid-path-pressure-budget.json";
import itEngineeringTubingDiameter from "@/data/resources/technical-articles/engineering-locales/it/tube-inner-diameter-affects-diaphragm-pump-flow.json";
import itEngineeringSuctionVsDischarge from "@/data/resources/technical-articles/engineering-locales/it/suction-vs-discharge-resistance-diaphragm-pump.json";
import itEngineeringPressurePlatform from "@/data/resources/technical-articles/engineering-locales/it/100-kpa-vs-600-kpa-diaphragm-pump-selection.json";
import itEngineeringDiaphragmPeristaltic from "@/data/resources/technical-articles/engineering-locales/it/diaphragm-pump-vs-peristaltic-pump.json";
import itEngineeringInkjetPump from "@/data/resources/technical-articles/engineering-locales/it/inkjet-printer-pumps-micro-diaphragm-pumps.json";
import itEngineeringInkStarvation from "@/data/resources/technical-articles/engineering-locales/it/ink-starvation-inkjet-troubleshooting.json";
import itEngineeringFlowPressureCurve from "@/data/resources/technical-articles/engineering-locales/it/diaphragm-pump-flow-pressure-curve-guide.json";
import itEngineeringLifeScienceDpl60 from "@/data/resources/technical-articles/engineering-locales/it/life-science-dpl60-600ml-min-diaphragm-pump-selection-guide.json";
import itEngineeringLabAspiration from "@/data/resources/technical-articles/engineering-locales/it/lab-liquid-waste-aspiration-troubleshooting.json";
import itEngineeringIvdWasteAspiration from "@/data/resources/technical-articles/engineering-locales/it/ivd-waste-aspiration-liquid-pump-vs-vacuum-pump.json";
import itEngineeringIvdCleaning from "@/data/resources/technical-articles/engineering-locales/it/ivd-cleaning-wash-rinse-pump-diaphragm-pump.json";
import itEngineeringIvdWaste from "@/data/resources/technical-articles/engineering-locales/it/ivd-waste-liquid-pump-liquid-vs-gas-liquid-diaphragm-pump.json";
import itEngineeringThreeHundredVsSixHundred from "@/data/resources/technical-articles/engineering-locales/it/300-vs-600-ml-min-diaphragm-pump-selection.json";
import itEngineeringFlowMargin from "@/data/resources/technical-articles/engineering-locales/it/300-ml-min-diaphragm-pump-flow-margin.json";
import copyWaterVsReagent from "@/data/resources/technical-articles/engineering-locales/it/300-ml-min-micro-liquid-diaphragm-pump-water-vs-reagent.json";
import pistonArticle0 from "@/data/resources/technical-articles/piston-locales/it/micro-plunger-pump-selection.json";
import pistonArticle1 from "@/data/resources/technical-articles/piston-locales/it/modbus-protocol-fluid-control.json";
import pistonArticle2 from "@/data/resources/technical-articles/piston-locales/it/piston-pump-acceleration-deceleration-curves.json";
import pistonArticle3 from "@/data/resources/technical-articles/piston-locales/it/precision-piston-pump-backlash-compensation.json";
import pistonArticle4 from "@/data/resources/technical-articles/piston-locales/it/stepper-motor-calculation-selection.json";
import { pistonPumpCopyToArticle, type PistonPumpArticleCopy } from "@/data/resources/technical-articles/piston-pump-articles.types";
import type { RplArticleSectionNavigationItem } from "@/components/resources/technical-articles/articles/RplSelectionArticle";
import type { ArticleRelatedProduct } from "./getArticleRelatedProducts";
import type { RelatedResourcesData } from "@/components/common/related-resources/related-resources.types";
import itSelectionBarbedExpansion from "@/data/resources/technical-articles/selection-locales/it/barbed-fitting-expansion-ratio.json";
import itSelectionFittingMaterial from "@/data/resources/technical-articles/selection-locales/it/fitting-material-selection-guide.json";
import itSelectionThreadToBarb from "@/data/resources/technical-articles/selection-locales/it/threaded-hose-barb-fittings-selection-guide.json";
import itSelectionBulkhead from "@/data/resources/technical-articles/selection-locales/it/what-is-a-bulkhead-barbed-fitting.json";
import itSelectionFemaleThread from "@/data/resources/technical-articles/selection-locales/it/female-thread-adapters-selection-guide.json";
import itSelectionQuickDisconnect from "@/data/resources/technical-articles/selection-locales/it/what-is-a-quick-disconnect-fitting.json";
import itSelectionTubingCleaning from "@/data/resources/technical-articles/selection-locales/it/pvc-tubing-cleaning-fluid-compatibility.json";
import itSelectionTubingPtfe from "@/data/resources/technical-articles/selection-locales/it/what-is-ptfe-tubing.json";
import itSelectionTubingPvc from "@/data/resources/technical-articles/selection-locales/it/what-is-pvc-tubing.json";
import itSelectionTubingAssemblyConfigurator from "@/data/resources/technical-articles/selection-locales/it/tubing-assembly-configurator-guide.json";
import itSelectionDiaphragmOverview from "@/data/resources/technical-articles/selection-locales/it/what-is-a-diaphragm-pump.json";
import itSelectionVirtualLeaks from "@/data/resources/technical-articles/selection-locales/it/virtual-leaks-causes-diagnosis-prevention.json";
import itSelectionTubingMedicalPvc from "@/data/resources/technical-articles/selection-locales/it/medical-pvc-tubing.json";
import itSelectionRotarySelector from "@/data/resources/technical-articles/selection-locales/it/how-does-a-rotary-selector-valve-work.json";
import itSelectionRotaryValve from "@/data/resources/technical-articles/selection-locales/it/rotary-valve-selection-guide.json";
import itSelectionRotaryMaterials from "@/data/resources/technical-articles/selection-locales/it/rotary-valve-wetted-materials-selection.json";
import itSelectionSolenoidValve from "@/data/resources/technical-articles/selection-locales/it/what-is-a-solenoid-valve.json";
import itSelectionHplcValve from "@/data/resources/technical-articles/selection-locales/it/how-does-an-hplc-injection-valve-work.json";
import itSelectionTubingFep from "@/data/resources/technical-articles/selection-locales/it/what-is-fep-tubing.json";
import itSelectionTubingPfa from "@/data/resources/technical-articles/selection-locales/it/what-is-pfa-tubing.json";
import itSelectionTubingPressure from "@/data/resources/technical-articles/selection-locales/it/pvc-tubing-pressure-rating-pull-off-force.json";
import type { PipettingBasicsWorkflow } from "@/data/resources/technical-articles/what-is-pipetting.article";
import type { BrushlessWiringArticleCopy } from "@/data/resources/technical-articles/brushless-diaphragm-pump-2-wire-vs-5-wire.types";
import type { Dpl30hArticleCopy } from "@/data/resources/technical-articles/dpl30h-high-pressure-liquid-diaphragm-pump.types";
import type { Dpl30ArticleCopy, Dpl30FaqCopy } from "@/data/resources/technical-articles/dpl30-liquid-diaphragm-pump.types";
import type { Dpl60ArticleCopy } from "@/data/resources/technical-articles/dpl60-liquid-diaphragm-pump.types";
import itDpl30 from "@/data/resources/technical-articles/dedicated-locales/it/dpl30-liquid-diaphragm-pump-selection-guide.json";
import itDpl60 from "@/data/resources/technical-articles/dedicated-locales/it/dpl60-liquid-diaphragm-pump-selection-guide.json";
import type { Dpgl800ArticleCopy } from "@/data/resources/technical-articles/dpgl800-gas-liquid-diaphragm-pump.types";
import itDpl30h from "@/data/resources/technical-articles/dedicated-locales/it/dpl30h-high-pressure-liquid-diaphragm-pump-selection-guide.json";
import itDpgl800 from "@/data/resources/technical-articles/dedicated-locales/it/dpgl800-gas-liquid-diaphragm-pump-selection-guide.json";
import itBrushlessWiring from "@/data/resources/technical-articles/dedicated-locales/it/brushless-diaphragm-pump-2-wire-vs-5-wire.json";
import itSelectionFlangedTubing from "@/data/resources/technical-articles/selection-locales/it/flanged-tubing-assemblies-selection-guide.json";
import itSelectionHardTubeFittings from "@/data/resources/technical-articles/selection-locales/it/hard-tube-fittings-selection-guide.json";
import reviewedPistonArticle0 from "@/data/resources/technical-articles/engineering-locales/it/clinical-chemistry-piston-pump-100-250-500-ul-selection.json";
import reviewedPistonArticle1 from "@/data/resources/technical-articles/piston-locales/it/piston-pump-accuracy-repeatability-resolution.json";
import reviewedPistonArticle2 from "@/data/resources/technical-articles/piston-locales/it/piston-pump-head-material-selection.json";
import reviewedPistonArticle3 from "@/data/resources/technical-articles/engineering-locales/it/piston-pump-air-bubbles-dispensing-error.json";
import reviewedPistonArticle4 from "@/data/resources/technical-articles/engineering-locales/it/piston-pump-dispensing-drift-diagnosis.json";
import reviewedPistonArticle5 from "@/data/resources/technical-articles/engineering-locales/it/piston-pump-viscous-liquid-aspiration-speed.json";
import itEngineeringReviewedMiniatureDiaphragmPumpPulsationDamperValidation from "@/data/resources/technical-articles/engineering-locales/it/miniature-diaphragm-pump-pulsation-damper-validation.json";
import itEngineeringReviewedMiniatureLiquidDiaphragmPumpCavitationDiagnosis from "@/data/resources/technical-articles/engineering-locales/it/miniature-liquid-diaphragm-pump-cavitation-diagnosis.json";
import itEngineeringReviewedDiaphragmPumpFlowMeterTotalizerError from "@/data/resources/technical-articles/engineering-locales/it/diaphragm-pump-flow-meter-totalizer-error.json";
import itEngineeringReviewed300MlMinMicroLiquidDiaphragmPumpMotorRunsNoFlow from "@/data/resources/technical-articles/engineering-locales/it/300-ml-min-micro-liquid-diaphragm-pump-motor-runs-no-flow.json";
import itEngineeringReviewedMicroDiaphragmPumpMaterialsSelection from "@/data/resources/technical-articles/engineering-locales/it/micro-diaphragm-pump-materials-selection.json";
import italianArticleSamplingProbeSelectionGuide from "@/data/resources/technical-articles/engineering-locales/it/sampling-probe-selection-guide.json";
import italianArticleFluidResistanceCalculatorLiquidPathDesignGuide from "@/data/resources/technical-articles/engineering-locales/it/fluid-resistance-calculator-liquid-path-design-guide.json";
import italianArticleQuickDisconnectCouplingFlowPressureDrop from "@/data/resources/technical-articles/engineering-locales/it/quick-disconnect-coupling-flow-pressure-drop.json";
import italianArticleCvKvCorrectionForMicrofluidics from "@/data/resources/technical-articles/dedicated-locales/it/cv-kv-correction-for-microfluidics.json";
import itEngineeringReviewedMicroDiaphragmPumpContinuousDutyLife from "@/data/resources/technical-articles/engineering-locales/it/micro-diaphragm-pump-continuous-duty-life.json";
import itEngineeringReviewedForeachMiniatureDiaphragmPumpOemIntegration from "@/data/resources/technical-articles/engineering-locales/it/foreach-miniature-diaphragm-pump-oem-integration.json";
import type { DiaphragmPumpEngineeringArticleCopy, EngineeringArticleBlock } from "@/data/resources/technical-articles/diaphragm-pump-engineering-article.types";

export type ItalianTechnicalArticleCard = ClassifiedTechnicalArticleItem & { sourceLanguage?: "en" };
export type ItalianTechnicalArticlesPageData = Omit<TechnicalArticlesPageData, "locale" | "articles"> & {
  locale: "it";
  articles: ItalianTechnicalArticleCard[];
};

const italianEngineeringArticles = new Map<string, DiaphragmPumpEngineeringArticleCopy>([
  ["micro-diaphragm-pump-continuous-duty-life", itEngineeringReviewedMicroDiaphragmPumpContinuousDutyLife as unknown as DiaphragmPumpEngineeringArticleCopy],
  ["foreach-miniature-diaphragm-pump-oem-integration", itEngineeringReviewedForeachMiniatureDiaphragmPumpOemIntegration as unknown as DiaphragmPumpEngineeringArticleCopy],
  ["diaphragm-pump-pressure-rating-terms", itEngineeringPressureRatingTerms as DiaphragmPumpEngineeringArticleCopy],
  ["sampling-probe-selection-guide", italianArticleSamplingProbeSelectionGuide as unknown as DiaphragmPumpEngineeringArticleCopy],
  ["fluid-resistance-calculator-liquid-path-design-guide", italianArticleFluidResistanceCalculatorLiquidPathDesignGuide as unknown as DiaphragmPumpEngineeringArticleCopy],
  ["quick-disconnect-coupling-flow-pressure-drop", italianArticleQuickDisconnectCouplingFlowPressureDrop as unknown as DiaphragmPumpEngineeringArticleCopy],
  ["diaphragm-pump-flow-pressure-curve-guide", itEngineeringFlowPressureCurve as DiaphragmPumpEngineeringArticleCopy],
  ["300-ml-min-micro-liquid-diaphragm-pump-motor-runs-no-flow", itEngineeringReviewed300MlMinMicroLiquidDiaphragmPumpMotorRunsNoFlow as unknown as DiaphragmPumpEngineeringArticleCopy],
  ["micro-diaphragm-pump-materials-selection", itEngineeringReviewedMicroDiaphragmPumpMaterialsSelection as unknown as DiaphragmPumpEngineeringArticleCopy],
  ["life-science-dpl60-600ml-min-diaphragm-pump-selection-guide", itEngineeringLifeScienceDpl60 as DiaphragmPumpEngineeringArticleCopy],
  ["miniature-diaphragm-pump-pulsation-damper-validation", itEngineeringReviewedMiniatureDiaphragmPumpPulsationDamperValidation as unknown as DiaphragmPumpEngineeringArticleCopy],
  ["miniature-liquid-diaphragm-pump-cavitation-diagnosis", itEngineeringReviewedMiniatureLiquidDiaphragmPumpCavitationDiagnosis as unknown as DiaphragmPumpEngineeringArticleCopy],
  ["diaphragm-pump-flow-meter-totalizer-error", itEngineeringReviewedDiaphragmPumpFlowMeterTotalizerError as unknown as DiaphragmPumpEngineeringArticleCopy],
  ["lab-liquid-waste-aspiration-troubleshooting", itEngineeringLabAspiration as DiaphragmPumpEngineeringArticleCopy],
  ["ivd-waste-aspiration-liquid-pump-vs-vacuum-pump", itEngineeringIvdWasteAspiration as DiaphragmPumpEngineeringArticleCopy],
  ["clinical-chemistry-piston-pump-100-250-500-ul-selection", reviewedPistonArticle0 as unknown as DiaphragmPumpEngineeringArticleCopy],
  ["piston-pump-air-bubbles-dispensing-error", reviewedPistonArticle3 as unknown as DiaphragmPumpEngineeringArticleCopy],
  ["piston-pump-dispensing-drift-diagnosis", reviewedPistonArticle4 as unknown as DiaphragmPumpEngineeringArticleCopy],
  ["piston-pump-viscous-liquid-aspiration-speed", reviewedPistonArticle5 as unknown as DiaphragmPumpEngineeringArticleCopy],
  ["high-backpressure-fluid-path-pressure-budget", itEngineeringHighPressureBudget as DiaphragmPumpEngineeringArticleCopy],
  ["ivd-cleaning-wash-rinse-pump-diaphragm-pump", itEngineeringIvdCleaning as DiaphragmPumpEngineeringArticleCopy],
  ["ivd-waste-liquid-pump-liquid-vs-gas-liquid-diaphragm-pump", itEngineeringIvdWaste as DiaphragmPumpEngineeringArticleCopy],
  ["diaphragm-pump-vs-peristaltic-pump", itEngineeringDiaphragmPeristaltic as DiaphragmPumpEngineeringArticleCopy],
  ["inkjet-printer-pumps-micro-diaphragm-pumps", itEngineeringInkjetPump as DiaphragmPumpEngineeringArticleCopy],
  ["ink-starvation-inkjet-troubleshooting", itEngineeringInkStarvation as DiaphragmPumpEngineeringArticleCopy],
  ["tube-inner-diameter-affects-diaphragm-pump-flow", itEngineeringTubingDiameter as DiaphragmPumpEngineeringArticleCopy],
  ["suction-vs-discharge-resistance-diaphragm-pump", itEngineeringSuctionVsDischarge as DiaphragmPumpEngineeringArticleCopy],
  ["100-kpa-vs-600-kpa-diaphragm-pump-selection", itEngineeringPressurePlatform as DiaphragmPumpEngineeringArticleCopy],
  ["300-vs-600-ml-min-diaphragm-pump-selection", itEngineeringThreeHundredVsSixHundred as DiaphragmPumpEngineeringArticleCopy],
  ["300-ml-min-diaphragm-pump-flow-margin", itEngineeringFlowMargin as DiaphragmPumpEngineeringArticleCopy],
  ["self-priming-miniature-liquid-diaphragm-pump-selection", itEngineeringSelfPriming as DiaphragmPumpEngineeringArticleCopy],
  ["miniature-diaphragm-pump-flow-pulsation-reduction", itEngineeringFlowPulsation as DiaphragmPumpEngineeringArticleCopy],
  ["miniature-diaphragm-pump-backflow-check-valve", itEngineeringStoppedBackflow as DiaphragmPumpEngineeringArticleCopy],
  ["diaphragm-pump-multiple-wash-nozzles-flow-balance", itEngineeringWashNozzleBalance as DiaphragmPumpEngineeringArticleCopy],
  ["diaphragm-pump-flow-drop-reservoir-venting", itEngineeringReservoirVenting as DiaphragmPumpEngineeringArticleCopy],
  ["white-ink-circulation-pump-selection-sedimentation", itEngineeringWhiteInkCirculationPumpSelectionSedimentation as DiaphragmPumpEngineeringArticleCopy],
  ["ink-circulation-supply-return-pump-diaphragm-pump", itEngineeringInkCirculationSupplyReturnPumpDiaphragmPump as DiaphragmPumpEngineeringArticleCopy],
  ["300-vs-600-ml-min-ink-circulation-return-pump-selection", itEngineering300Vs600MlMinInkCirculationReturnPumpSelection as DiaphragmPumpEngineeringArticleCopy],
  ["miniature-diaphragm-pump-noise-vibration-reduction", itEngineeringMiniatureDiaphragmPumpNoiseVibrationReduction as DiaphragmPumpEngineeringArticleCopy],
  ["brushed-vs-brushless-diaphragm-pump-3000h-10000h", itEngineeringBrushedVsBrushlessDiaphragmPump3000H10000H as DiaphragmPumpEngineeringArticleCopy],
  ["300-ml-min-micro-liquid-diaphragm-pump-self-priming-loss", itEngineering300MlMinMicroLiquidDiaphragmPumpSelfPrimingLoss as DiaphragmPumpEngineeringArticleCopy],
  ["300-ml-min-micro-liquid-diaphragm-pump-epdm-ptfe-ffkm", itEngineering300MlMinMicroLiquidDiaphragmPumpEpdmPtfeFfkm as DiaphragmPumpEngineeringArticleCopy],
  ["300-ml-min-micro-liquid-diaphragm-pump-water-vs-reagent", copyWaterVsReagent as DiaphragmPumpEngineeringArticleCopy],
]);

const italianPistonArticles = new Map<string, PistonPumpArticleCopy>([
  ["piston-pump-accuracy-repeatability-resolution", reviewedPistonArticle1 as unknown as PistonPumpArticleCopy],
  ["piston-pump-head-material-selection", reviewedPistonArticle2 as unknown as PistonPumpArticleCopy],
  ["micro-plunger-pump-selection", pistonArticle0 as PistonPumpArticleCopy],
  ["modbus-protocol-fluid-control", pistonArticle1 as PistonPumpArticleCopy],
  ["piston-pump-acceleration-deceleration-curves", pistonArticle2 as PistonPumpArticleCopy],
  ["precision-piston-pump-backlash-compensation", pistonArticle3 as PistonPumpArticleCopy],
  ["stepper-motor-calculation-selection", pistonArticle4 as PistonPumpArticleCopy],
]);

type ItalianSelectionArticleEdition = {
  kind: "selection";
  family?: "instrument" | "tubing" | "valve";
  copy: DiaphragmPumpEngineeringArticleCopy & {
    relatedProductTitles?: { tee: string; elbow: string };
    relatedProductLabel?: string;
    subjectAbout?: readonly string[];
  };
  navigation?: readonly RplArticleSectionNavigationItem[];
  workflows?: readonly PipettingBasicsWorkflow[];
  subject?: { about: readonly string[]; mentions: readonly string[] };
  sources?: readonly string[];
  modelLinks?: readonly { name: string; href: string }[];
  schemaFaq?: readonly { question: string; answer: string }[];
  footerIntro?: string;
  sidebarProducts?: readonly ArticleRelatedProduct[];
  footerProducts?: RelatedResourcesData["products"];
};

const italianSelectionArticles = new Map<string, ItalianSelectionArticleEdition>([
  ["what-is-a-diaphragm-pump", itSelectionDiaphragmOverview as ItalianSelectionArticleEdition],
  ["virtual-leaks-causes-diagnosis-prevention", itSelectionVirtualLeaks as ItalianSelectionArticleEdition],
  ["tubing-assembly-configurator-guide", itSelectionTubingAssemblyConfigurator as ItalianSelectionArticleEdition],
  ["what-is-a-solenoid-valve", itSelectionSolenoidValve as ItalianSelectionArticleEdition],
  ["how-does-an-hplc-injection-valve-work", itSelectionHplcValve as ItalianSelectionArticleEdition],
  ["rotary-valve-selection-guide", itSelectionRotaryValve as ItalianSelectionArticleEdition],
  ["rotary-valve-wetted-materials-selection", itSelectionRotaryMaterials as ItalianSelectionArticleEdition],
  ["how-does-a-rotary-selector-valve-work", itSelectionRotarySelector as ItalianSelectionArticleEdition],
  ["what-is-pvc-tubing", itSelectionTubingPvc as ItalianSelectionArticleEdition],
  ["medical-pvc-tubing", itSelectionTubingMedicalPvc as ItalianSelectionArticleEdition],
  ["what-is-fep-tubing", itSelectionTubingFep as ItalianSelectionArticleEdition],
  ["what-is-pfa-tubing", itSelectionTubingPfa as ItalianSelectionArticleEdition],
  ["what-is-ptfe-tubing", itSelectionTubingPtfe as ItalianSelectionArticleEdition],
  ["pvc-tubing-pressure-rating-pull-off-force", itSelectionTubingPressure as ItalianSelectionArticleEdition],
  ["pvc-tubing-cleaning-fluid-compatibility", itSelectionTubingCleaning as ItalianSelectionArticleEdition],
  ["what-is-a-quick-disconnect-fitting", itSelectionQuickDisconnect as ItalianSelectionArticleEdition],
  ["female-thread-adapters-selection-guide", itSelectionFemaleThread as ItalianSelectionArticleEdition],
  ["what-is-a-bulkhead-barbed-fitting", itSelectionBulkhead as ItalianSelectionArticleEdition],
  ["fitting-material-selection-guide", itSelectionFittingMaterial as ItalianSelectionArticleEdition],
  ["threaded-hose-barb-fittings-selection-guide", itSelectionThreadToBarb as ItalianSelectionArticleEdition],
  ["barbed-fitting-expansion-ratio", itSelectionBarbedExpansion as ItalianSelectionArticleEdition],
  ["flanged-tubing-assemblies-selection-guide", itSelectionFlangedTubing as ItalianSelectionArticleEdition],
  ["hard-tube-fittings-selection-guide", itSelectionHardTubeFittings as ItalianSelectionArticleEdition],
  ["what-is-a-compression-ring-fitting", itSelectionWhatIsACompressionRingFitting as ItalianSelectionArticleEdition],
  ["what-is-a-luer-fitting", itSelectionWhatIsALuerFitting as ItalianSelectionArticleEdition],
  ["what-is-a-barbed-fitting", itSelectionWhatIsABarbedFitting as ItalianSelectionArticleEdition],
  ["what-is-a-ferrule-fitting", itSelectionWhatIsAFerruleFitting as ItalianSelectionArticleEdition],
  ["what-is-pipetting", itSelectionWhatIsPipetting as ItalianSelectionArticleEdition],
  ["what-is-a-programmable-syringe-pump", itSelectionWhatIsAProgrammableSyringePump as ItalianSelectionArticleEdition],
  ["what-is-a-programmable-pipetting-pump", itSelectionWhatIsAProgrammablePipettingPump as ItalianSelectionArticleEdition],
  ["metering-pump-accuracy-repeatability-reagent-dispensing", itSelectionMeteringPumpAccuracyRepeatabilityReagentDispensing as ItalianSelectionArticleEdition],
  ["what-is-a-valveless-metering-pump", itSelectionWhatIsAValvelessMeteringPump as ItalianSelectionArticleEdition],
  ["rpl-valveless-metering-pump-selection-guide", itSelectionRplValvelessMeteringPumpSelectionGuide as ItalianSelectionArticleEdition],
]);

type StandardDiaphragmArticleEdition = {
  kind: "standard-diaphragm";
  copy: Dpl30ArticleCopy;
  faq: Dpl30FaqCopy;
  dpl60Copy?: Dpl60ArticleCopy;
  coverAlt?: string;
};

type ItalianDedicatedArticleEdition =
  | StandardDiaphragmArticleEdition
  | { kind: "brushless-wiring"; copy: BrushlessWiringArticleCopy }
  | { kind: "dpl30h"; copy: Dpl30hArticleCopy }
  | { kind: "dpgl800"; copy: Dpgl800ArticleCopy };

const italianDpl60Copy = itDpl60.copy as unknown as Dpl60ArticleCopy;
const italianDedicatedArticles = new Map<string, ItalianDedicatedArticleEdition>([
  ["dpl30-liquid-diaphragm-pump-selection-guide", { kind: "standard-diaphragm", copy: itDpl30.copy as unknown as Dpl30ArticleCopy, faq: itDpl30.faq }],
  ["dpl60-liquid-diaphragm-pump-selection-guide", { kind: "standard-diaphragm", copy: italianDpl60Copy, dpl60Copy: italianDpl60Copy, faq: itDpl60.faq, coverAlt: itDpl60.coverAlt }],
  ["dpl30h-high-pressure-liquid-diaphragm-pump-selection-guide", { kind: "dpl30h", copy: itDpl30h as unknown as Dpl30hArticleCopy }],
  ["dpgl800-gas-liquid-diaphragm-pump-selection-guide", { kind: "dpgl800", copy: itDpgl800 as unknown as Dpgl800ArticleCopy }],
  ["brushless-diaphragm-pump-2-wire-vs-5-wire", { kind: "brushless-wiring", copy: itBrushlessWiring as unknown as BrushlessWiringArticleCopy }],
]);

export const italianTechnicalArticleSlugs = [
  "cv-kv-correction-for-microfluidics",
  ...italianEngineeringArticles.keys(), ...italianPistonArticles.keys(), ...italianSelectionArticles.keys(), ...italianDedicatedArticles.keys(),
];

export type ItalianTechnicalArticleEdition =
  | { kind: "cv-kv"; copy: typeof italianArticleCvKvCorrectionForMicrofluidics }
  | { kind: "engineering"; copy: DiaphragmPumpEngineeringArticleCopy }
  | { kind: "piston"; copy: PistonPumpArticleCopy }
  | ItalianSelectionArticleEdition
  | ItalianDedicatedArticleEdition;

export function getItalianTechnicalArticleEdition(slug: string): ItalianTechnicalArticleEdition | undefined {
  if (slug === "cv-kv-correction-for-microfluidics") return { kind: "cv-kv", copy: italianArticleCvKvCorrectionForMicrofluidics };
  const engineering = italianEngineeringArticles.get(slug);
  if (engineering) return { kind: "engineering", copy: engineering };
  const piston = italianPistonArticles.get(slug);
  return piston ? { kind: "piston", copy: piston } : italianSelectionArticles.get(slug) ?? italianDedicatedArticles.get(slug);
}

function getEngineeringSearchText(block: EngineeringArticleBlock) {
  switch (block.type) {
    case "paragraph": return block.text;
    case "notice": return [block.label, block.text].filter(Boolean).join(" ");
    case "formula": return [block.expression, block.note].filter(Boolean).join(" ");
    case "figure": return block.alt + " " + block.caption;
    case "subheading": return block.title;
    case "table": return [block.headers, ...block.rows].flat().join(" ");
    case "list": return block.items.join(" ");
    case "links": return block.items.map(link => link.label).join(" ");
  }
}

export function getItalianArticleFields(edition: ItalianTechnicalArticleEdition) {
  if (edition.kind === "cv-kv") {
    const { metadata, body } = edition.copy;
    return {
      ...metadata,
      content: [body.intro, body.assumptions, body.correction, body.channel, body.orifice, body.conclusion]
        .map(section => ({ title: section.title, content: section.paragraphs.join("\n") })),
    };
  }
  if (edition.kind === "piston") return pistonPumpCopyToArticle(edition.copy);
  if (edition.kind === "dpl30h" || edition.kind === "dpgl800" || edition.kind === "standard-diaphragm") {
    const { metadata, section1 } = edition.copy;
    return {
      ...metadata,
      ...(edition.kind === "standard-diaphragm" && edition.coverAlt ? { coverAlt: edition.coverAlt } : {}),
      summary: section1.paragraphs[0],
      content: [
        { title: section1.title, content: section1.paragraphs.join("\n") },
        ...(edition.kind === "standard-diaphragm" ? edition.faq.items.map(item => ({ title: item.question, content: item.answer })) : []),
      ],
    };
  }
  if (edition.kind === "brushless-wiring") {
    return {
      ...edition.copy.metadata,
      summary: edition.copy.deck,
      content: [
        { title: edition.copy.conclusion.title, content: edition.copy.conclusion.text },
        { title: edition.copy.twoWire.title, content: [edition.copy.twoWire.intro, ...edition.copy.twoWire.paragraphs].join("\n") },
        { title: edition.copy.fiveWire.title, content: [edition.copy.fiveWire.intro, ...edition.copy.fiveWire.paragraphs].join("\n") },
        ...edition.copy.faqItems.map(item => ({ title: item.question, content: item.answer })),
      ],
    };
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

const primaryLabels: Record<TechnicalArticlePrimaryCategory, string> = {
  pumps: "Pompe",
  valves: "Valvole",
  "fittings-tubing": "Tubi e raccordi",
  "fluid-detection-control": "Rilevamento e controllo dei fluidi",
  "general-fluidics": "Fondamenti di fluidica",
  "applications-solutions": "Applicazioni e soluzioni",
};

const secondaryLabels: Record<TechnicalArticleSecondaryCategory, string> = {
  "miniature-diaphragm-pumps": "Pompe a membrana in miniatura",
  "plunger-pumps": "Pompe a pistone",
  "valveless-metering-pump": "Pompe dosatrici senza valvole",
  "syringe-pumps": "Pompe a siringa",
  "pipetting-pumps": "Pompe per pipettaggio",
  "solenoid-valves": "Elettrovalvole",
  "multi-port-valves": "Valvole a più porte",
  "high-pressure-valves": "Valvole ad alta pressione",
  "fluid-switching-valves": "Valvole di commutazione",
  fittings: "Raccordi",
  "ferrules-connectors": "Ogive e connettori",
  "flexible-rigid-tubing": "Tubi flessibili e rigidi",
  "tubing-accessories": "Accessori per tubi",
  "pressure-detection-control": "Misura e controllo della pressione",
  "liquid-level-detection": "Rilevamento del livello del liquido",
  "fluid-state-detection": "Rilevamento dello stato del fluido",
  "intelligent-fluid-control": "Controllo intelligente dei fluidi",
  "flow-operating-point": "Portata e punto di lavoro",
  "pressure-backpressure": "Pressione e contropressione",
  "self-priming-negative-pressure-vacuum": "Autoadescamento, depressione e vuoto",
  "tubing-resistance-pressure-drop": "Resistenza dei tubi e perdite di carico",
  "material-chemical-compatibility": "Compatibilità chimica dei materiali",
  "sealing-leakage": "Tenuta e perdite",
  "bubbles-pulsation": "Bolle e pulsazioni",
  "lifetime-reliability": "Durata e affidabilità",
  "testing-validation": "Prove e convalida",
  "ivd-medical-devices": "Diagnostica in vitro e dispositivi medici",
  "life-science-synthetic-biology": "Scienze della vita e biologia sintetica",
  "laboratory-automation": "Automazione di laboratorio",
  "analytical-instruments": "Strumentazione analitica",
  "cleaning-waste": "Lavaggio e liquidi di scarto",
  "reagent-sample-handling": "Manipolazione di reagenti e campioni",
  "printing-inkjet": "Stampa a getto d’inchiostro",
  "oem-fluidic-systems": "Sistemi fluidici OEM",
};
const italianArticleTags: Readonly<Record<string, string>> = {
  "Tubing": "Tubi",
  "Cleaning": "Pulizia",
  "Installation": "Installazione",
  "Pull-off force": "Forza di sfilamento",
  "Selection": "Selezione",
  "Precision": "Precisione",
  "Sampling probes": "Sonde di campionamento",
  "Working length": "Lunghezza utile",
  "Side ports": "Fori laterali",
  "Automated analyzers": "Analizzatori automatici",
  "Fittings": "Raccordi",
  "Instrument tubing assemblies": "Gruppi tubo per strumenti",
  "Online configuration": "Configurazione online",
  "2D drawings": "Disegni 2D",
  "Sealing & leakage": "Tenuta e perdite",
  "Quick disconnect fittings": "Raccordi a innesto rapido",
  "Male/female pairing": "Accoppiamento maschio/femmina",
  "Valved": "Con valvola",
  "Threaded hose barb fittings": "Raccordi filettati portagomma",
  "Tubing inner diameter": "Diametro interno del tubo",
  "Face sealing": "Tenuta frontale",
  "Engineering calculation": "Calcolo tecnico",
  "Barb expansion ratio": "Rapporto di espansione sul portagomma",
  "Expansion percentage": "Espansione percentuale",
  "Dimensional tolerances": "Tolleranze dimensionali",
  "Fitting materials": "Materiali dei raccordi",
  "Female thread unions": "Raccordi con filettatura femmina",
  "Straight and branch connections": "Collegamenti diritti e ramificati",
  "PMU bulkhead unions": "Raccordi passaparete PMU",
  "Bore diameter": "Diametro del lume",
  "Bulkhead barbed fittings": "Raccordi passaparete portagomma",
  "Panel mounting": "Montaggio a pannello",
  "Barbed fittings": "Raccordi portagomma",
  "Quality system": "Sistema qualità",
  "Luer fittings": "Raccordi Luer",
  "Flangeless ferrule fittings": "Raccordi a ogiva senza flangia",
  "Compression-ring fittings": "Raccordi ad anello di compressione",
  "Flanged tubing assemblies": "Gruppi tubo flangiati",
  "Fluid switching": "Commutazione del fluido",
  "OEM integration": "Integrazione OEM",
  "Solenoid valve": "Elettrovalvola",
  "High pressure": "Alta pressione",
  "Dosing": "Dosaggio",
  "Pipetting": "Pipettaggio",
  "Manual pipetting": "Pipettaggio manuale",
  "Automated pipetting": "Pipettaggio automatico",
  "Metering pump accuracy": "Accuratezza della pompa dosatrice",
  "Metering pump repeatability": "Ripetibilità della pompa dosatrice",
  "Valveless metering pump": "Pompa dosatrice senza valvole",
  "Working principle": "Principio di funzionamento",
  "Piston pump": "Pompa a pistone",
  "Flow pulsation": "Pulsazioni di portata",
  "Tubing resistance": "Resistenza dei tubi",
  "Fluidic system": "Circuito fluidico",
  "Noise and vibration": "Rumore e vibrazioni",
  "Check valve": "Valvola di non ritorno",
  "Inkjet": "Stampa a getto d’inchiostro",
  "Ink circulation": "Ricircolo dell’inchiostro",
  "Inkjet printer pump": "Pompa per stampanti a getto d’inchiostro",
  "UV ink pump": "Pompa per inchiostro UV",
  "Ink starvation": "Alimentazione insufficiente d’inchiostro",
  "Ink dropout": "Interruzioni nell’erogazione d’inchiostro",
  "Air in ink lines": "Aria nelle linee d’inchiostro",
  "Ink supply pump": "Pompa di alimentazione dell’inchiostro",
  "Ink return pump": "Pompa di ritorno dell’inchiostro",
  "White ink": "Inchiostro bianco",
  "Pigment sedimentation": "Sedimentazione del pigmento",
  "Waste handling": "Gestione degli scarichi",
  "Gas-liquid": "Gas e liquidi",
  "Waste liquid pump": "Pompa per liquidi di scarto",
  "Waste aspiration pump": "Pompa di aspirazione degli scarichi",
  "Wiring & control": "Cablaggio e controllo",
  "Cleaning pump": "Pompa per la pulizia",
  "Wash pump": "Pompa di lavaggio",
  "Rinse pump": "Pompa di risciacquo",
  "Backpressure": "Contropressione",
  "Tubing diameter": "Diametro del tubo",
  "Discharge": "Mandata",
  "Rated pressure": "Pressione nominale",
  "Pressure budget": "Bilancio di pressione",
  "Brushed motor": "Motore a spazzole",
  "Brushless motor": "Motore senza spazzole",
  "Motor life": "Durata del motore",
  "Life science": "Scienze della vita",
  "Pump curve": "Curva della pompa",
  "Continuous duty": "Funzionamento continuo",
  "2-wire": "2 fili",
  "5-wire": "5 fili",
  "Luer lock": "Luer Lock",
  "Luer slip": "Luer Slip",
  "Micro diaphragm pump": "Micropompa a membrana",
  "Liquid pump": "Pompa per liquidi",
  "Reagent dispensing": "Dosaggio di reagenti",
  "Material compatibility": "Compatibilità dei materiali",
  "Self-priming": "Autoadescamento",
  "Testing & validation": "Prove e convalida",
  "Operating point": "Punto di lavoro",
  "Wetted materials": "Materiali a contatto con il fluido",
  "Chemical compatibility": "Compatibilità chimica",
  "Material selection": "Scelta dei materiali",
  "Pressure drop": "Perdita di carico",
  "Suction lift": "Altezza di aspirazione",
  "Suction": "Aspirazione",
  "Pressure": "Pressione",
  "Valve sealing": "Tenuta della valvola",
  "Troubleshooting": "Ricerca guasti",
  "Vacuum": "Vuoto",
  "Flow": "Portata",
  "Flow rate": "Portata",
  IVD: "IVD",
  "300 mL/min": "300 mL/min",
};

export const italianTechnicalArticlesMetadata = {
  title: "Articoli tecnici | Risorse | Foreach Technology",
  description: "Articoli FOREACH sulla scelta dei prodotti, la compatibilità dei materiali, i collegamenti dei tubi, i metodi di tenuta e le applicazioni dei sistemi microfluidici.",
};

export function getItalianTechnicalArticlesPageData(): ItalianTechnicalArticlesPageData {
  const source = getTechnicalArticlesPageData("en");
  return {
    ...source,
    locale: "it",
    hero: { ...source.hero, title: "Articoli tecnici", description: italianTechnicalArticlesMetadata.description },
    breadcrumbs: [
      { label: "Home", href: "/it/" },
      { label: "Risorse", href: "/it/resources/" },
      { label: "Articoli tecnici" },
    ],
    search: { placeholder: "Cerca per argomento, prodotto o materiale" },
    sectionTitle: "Articoli tecnici",
    bottomBanner: {
      title: "Ti serve assistenza tecnica per scegliere un prodotto?",
      description: "Indicaci il fluido, l’intervallo di pressione, le dimensioni dei tubi e le condizioni operative oppure inviaci un disegno. FOREACH ti aiuterà nella scelta e nella verifica tecnica.",
      actions: [{ label: "Contattaci", href: "/it/contact/" }],
    },
    taxonomy: source.taxonomy.map(group => ({
      ...group,
      label: primaryLabels[group.key],
      children: group.children.map(child => ({ ...child, label: secondaryLabels[child.key] })),
    })),
    articles: source.articles.map(article => {
      const translated = getItalianTechnicalArticleEdition(article.slug);
      const destination = getItalianDraftLink("/en/resources/technical-articles/" + article.slug + "/");
      return translated && destination.hrefLang === "it" ? {
        ...article,
        ...getItalianArticleFields(translated),
        tags: article.tags?.map(tag => italianArticleTags[tag] ?? tag),
      } : { ...article, sourceLanguage: "en" };
    }),
  };
}
