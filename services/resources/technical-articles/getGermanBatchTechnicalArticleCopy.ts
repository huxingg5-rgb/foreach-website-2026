import { brushlessWiringArticleSlug, getBrushlessWiringArticleCopy } from "@/data/resources/technical-articles/brushless-diaphragm-pump-2-wire-vs-5-wire.article";
import {
  getFlangedTubingCopy, getFlangedTubingNavigation, flangedTubingRelatedIntro,
} from "@/data/resources/technical-articles/flanged-tubing-assemblies-selection.article";
import { getFittingAssemblyLinks } from "@/data/resources/technical-articles/fitting-article-relations";
import { getHardTubeFittingsCopy, getHardTubeFittingsNavigation } from "@/data/resources/technical-articles/hard-tube-fittings-selection.zh";
import {
  getMeteringPumpAccuracyRepeatabilityCopy, getMeteringPumpAccuracyRepeatabilityNavigation, getMeteringPumpAccuracyRepeatabilitySubject,
} from "@/data/resources/technical-articles/metering-pump-accuracy-repeatability.article";
import { getProgrammablePipettingCopy, getProgrammablePipettingNavigation } from "@/data/resources/technical-articles/programmable-pipetting-pump.article";
import { getProgrammableSyringeCopy, getProgrammableSyringeNavigation } from "@/data/resources/technical-articles/programmable-syringe-pump.article";
import { getRplSelectionArticleCopy, getRplSelectionFaqItems, getRplSelectionProducts } from "@/data/resources/technical-articles/rpl-valveless-metering-pump-selection.article";
import { getBarbedFittingCopy, getBarbedFittingNavigation, getBarbedFittingSubject } from "@/data/resources/technical-articles/what-is-a-barbed-fitting.zh";
import { getCompressionRingFittingCopy, getCompressionRingFittingNavigation } from "@/data/resources/technical-articles/what-is-a-compression-ring-fitting.zh";
import { getFerruleFittingCopy, getFerruleFittingNavigation } from "@/data/resources/technical-articles/what-is-a-ferrule-fitting.zh";
import { getLuerFittingCopy, getLuerFittingNavigation } from "@/data/resources/technical-articles/what-is-a-luer-fitting.zh";
import { getPipettingBasicsCopy, getPipettingBasicsNavigation, getPipettingBasicsSubject, getPipettingBasicsWorkflows, type PipettingBasicsWorkflow } from "@/data/resources/technical-articles/what-is-pipetting.article";
import { getValvelessMeteringPumpOverviewCopy, getValvelessMeteringPumpOverviewNavigation } from "@/data/resources/technical-articles/what-is-a-valveless-metering-pump.article";
import { getTubingAssemblySelectionContent } from "@/data/products/tubing-assemblies/localized";
import type { DiaphragmPumpEngineeringArticleCopy, EngineeringArticleFaqItem, EngineeringArticleLink } from "@/data/resources/technical-articles/diaphragm-pump-engineering-article.types";
import type { RplArticleSectionNavigationItem } from "@/components/resources/technical-articles/articles/RplSelectionArticle";
import { getConnectorSelectionArticle } from "@/data/resources/technical-articles/connector-selection-articles.article";
import { getInstrumentFluidicsArticle } from "@/data/resources/technical-articles/instrument-fluidics-articles.article";
import { getPistonPumpArticleCopy } from "@/data/resources/technical-articles/piston-pump-articles.article";
import { getTubingMaterialArticle } from "@/data/resources/technical-articles/ptfe-tubing.article";
import { getValveEngineeringArticle } from "@/data/resources/technical-articles/valve-engineering-articles.article";
import { germanBatchTechnicalArticleSlugs } from "@/data/resources/technical-articles/technical-article-batch-slugs.de";
import { germanBatchTechnicalArticleDictionaries } from "@/data/resources/technical-articles/batch-locales/de";
import {
  engineeringArticleTranslationFields,
  getEnglishEngineeringArticleSource,
} from "./getGermanBatchEngineeringArticleCopy";

type TranslationDictionary = Readonly<Record<string, string>>;
const germanFigureSources: Readonly<Partial<Record<string, string>>> = {
  "/images/resources/technical-articles/suction-vs-discharge-resistance-diaphragm-pump/article-figure-en.webp":
    "/images/resources/technical-articles/suction-vs-discharge-resistance-diaphragm-pump/article-figure-de.svg",
  "/images/resources/technical-articles/hard-tube-fittings-selection-guide/flanged-connection-structure-en.webp": "/images/resources/technical-articles/hard-tube-fittings-selection-guide/flanged-connection-structure-de.webp",
  "/images/resources/technical-articles/hard-tube-fittings-selection-guide/ferrule-connection-structure-en.webp": "/images/resources/technical-articles/hard-tube-fittings-selection-guide/ferrule-connection-structure-de.webp",
  "/images/resources/technical-articles/hard-tube-fittings-selection-guide/snap-ring-connection-structure-en.webp": "/images/resources/technical-articles/hard-tube-fittings-selection-guide/snap-ring-connection-structure-de.webp",
  "/images/resources/technical-articles/hard-tube-fittings-selection-guide/ferrule-assembly-en.webp": "/images/resources/technical-articles/hard-tube-fittings-selection-guide/ferrule-assembly-de.webp",
  "/images/resources/technical-articles/hard-tube-fittings-selection-guide/snap-ring-assembly-en.webp": "/images/resources/technical-articles/hard-tube-fittings-selection-guide/snap-ring-assembly-de.webp",
  "/images/resources/technical-articles/hard-tube-fittings-selection-guide/prefabricated-tube-assembly-en.webp": "/images/resources/technical-articles/hard-tube-fittings-selection-guide/prefabricated-tube-assembly-de.webp",
  "/images/resources/technical-articles/ivd-waste-aspiration-pump-selection/ivd-direct-vs-vacuum-aspiration-en.webp":
    "/images/resources/technical-articles/ivd-waste-aspiration-pump-selection/ivd-direct-vs-vacuum-aspiration-de.svg",
  "/images/resources/technical-articles/ivd-waste-aspiration-pump-selection/ivd-waste-pump-decision-tree-en.webp":
    "/images/resources/technical-articles/ivd-waste-aspiration-pump-selection/ivd-waste-pump-decision-tree-de.svg",
  "/images/resources/technical-articles/lab-liquid-waste-aspiration-troubleshooting/waste-aspiration-protection-path-en.webp":
    "/images/resources/technical-articles/lab-liquid-waste-aspiration-troubleshooting/waste-aspiration-protection-path-de.svg",
  "/images/resources/technical-articles/lab-liquid-waste-aspiration-troubleshooting/waste-aspiration-troubleshooting-sequence-en.webp":
    "/images/resources/technical-articles/lab-liquid-waste-aspiration-troubleshooting/waste-aspiration-troubleshooting-sequence-de.svg",
  "/images/resources/technical-articles/instrument-fluidics/what-is-a-diaphragm-pump/diaphragm-pump-working-principle-en.svg": "/images/resources/technical-articles/instrument-fluidics/what-is-a-diaphragm-pump/diaphragm-pump-working-principle-de.svg",
  "/images/resources/technical-articles/instrument-fluidics/what-is-a-diaphragm-pump/dpl30-flow-pressure-curve-en.webp": "/images/resources/technical-articles/instrument-fluidics/what-is-a-diaphragm-pump/dpl30-flow-pressure-curve-de.webp",
  "/images/resources/technical-articles/instrument-fluidics/what-is-a-diaphragm-pump/dpgl800-gas-flow-pressure-curve-en.webp": "/images/resources/technical-articles/instrument-fluidics/what-is-a-diaphragm-pump/dpgl800-gas-flow-pressure-curve-de.webp",
  "/images/resources/technical-articles/female-thread-adapters-selection-guide/catalog-two-way-section-en.webp": "/images/resources/technical-articles/female-thread-adapters-selection-guide/catalog-two-way-section-de.webp",
  "/images/resources/technical-articles/female-thread-adapters-selection-guide/catalog-us-bore-en.webp": "/images/resources/technical-articles/female-thread-adapters-selection-guide/catalog-us-bore-de.webp",
  "/images/resources/technical-articles/female-thread-adapters-selection-guide/catalog-tee-y-channels-en.webp": "/images/resources/technical-articles/female-thread-adapters-selection-guide/catalog-tee-y-channels-de.webp",
  "/images/resources/technical-articles/female-thread-adapters-selection-guide/catalog-pmu-panel-mount-en.webp": "/images/resources/technical-articles/female-thread-adapters-selection-guide/catalog-pmu-panel-mount-de.webp",
  "/images/resources/technical-articles/300-vs-600-ml-min-diaphragm-pump-selection/article-figure-en.webp":
    "/images/resources/technical-articles/300-vs-600-ml-min-diaphragm-pump-selection/article-figure-de.svg",
  "/images/resources/technical-articles/300-ml-min-diaphragm-pump-flow-margin/article-figure-en.webp":
    "/images/resources/technical-articles/300-ml-min-diaphragm-pump-flow-margin/article-figure-de.svg",
  "/images/resources/technical-articles/instrument-fluidics/localized/q20-flow-pressure-drop.en.svg": "/images/resources/technical-articles/instrument-fluidics/localized/q20-flow-pressure-drop.de.svg",
  "/images/resources/technical-articles/instrument-fluidics/localized/q40-flow-pressure-drop.en.svg": "/images/resources/technical-articles/instrument-fluidics/localized/q40-flow-pressure-drop.de.svg",
  "/images/resources/technical-articles/instrument-fluidics/localized/q60-flow-pressure-drop.en.svg": "/images/resources/technical-articles/instrument-fluidics/localized/q60-flow-pressure-drop.de.svg",
  "/images/resources/technical-articles/what-is-a-luer-fitting/fixed-locking-collar-end-view-en.webp": "/images/resources/technical-articles/what-is-a-luer-fitting/fixed-locking-collar-end-view-de.webp",
  "/images/resources/technical-articles/what-is-a-luer-fitting/rotating-locking-collar-end-view-en.webp": "/images/resources/technical-articles/what-is-a-luer-fitting/rotating-locking-collar-end-view-de.webp",
  "/images/resources/technical-articles/what-is-a-luer-fitting/luer-collar-tubing-rotation-comparison-en.webp": "/images/resources/technical-articles/what-is-a-luer-fitting/luer-collar-tubing-rotation-comparison-de.webp",
  "/images/resources/technical-articles/what-is-pipetting/manual-and-automated-pipetting-en.webp": "/images/resources/technical-articles/what-is-pipetting/manual-and-automated-pipetting-de.webp",
  "/images/resources/technical-articles/what-is-pipetting/automatic-pipetting-aspiration-en.svg": "/images/resources/technical-articles/what-is-pipetting/automatic-pipetting-aspiration-de.svg",
  "/images/resources/technical-articles/what-is-pipetting/automatic-pipetting-dispensing-en.svg": "/images/resources/technical-articles/what-is-pipetting/automatic-pipetting-dispensing-de.svg",
  "/images/resources/technical-articles/brushed-vs-brushless-diaphragm-pump-3000h-10000h/article-cover-en.webp":
    "/images/resources/technical-articles/brushed-vs-brushless-diaphragm-pump-3000h-10000h/article-cover-de.svg",
  "/images/resources/technical-articles/brushed-vs-brushless-diaphragm-pump-3000h-10000h/brushed-vs-brushless-commutation-en.webp":
    "/images/resources/technical-articles/brushed-vs-brushless-diaphragm-pump-3000h-10000h/brushed-vs-brushless-commutation-de.svg",
  "/images/resources/technical-articles/brushed-vs-brushless-diaphragm-pump-3000h-10000h/brushed-brushless-lifetime-mechanism-en.webp":
    "/images/resources/technical-articles/brushed-vs-brushless-diaphragm-pump-3000h-10000h/brushed-brushless-lifetime-mechanism-de.svg",
  "/images/resources/technical-articles/brushed-vs-brushless-diaphragm-pump-3000h-10000h/brushed-brushless-selection-flowchart-en.webp":
    "/images/resources/technical-articles/brushed-vs-brushless-diaphragm-pump-3000h-10000h/brushed-brushless-selection-flowchart-de.svg",
  "/images/resources/technical-articles/micro-diaphragm-pump-continuous-duty-life/duty-profile-lifetime-demand-en.webp":
    "/images/resources/technical-articles/micro-diaphragm-pump-continuous-duty-life/duty-profile-lifetime-demand-de.svg",
  "/images/resources/technical-articles/micro-diaphragm-pump-continuous-duty-life/brushed-vs-brushless-commutation-en.webp":
    "/images/resources/technical-articles/micro-diaphragm-pump-continuous-duty-life/brushed-vs-brushless-commutation-de.svg",
  "/images/resources/technical-articles/micro-diaphragm-pump-continuous-duty-life/lifetime-load-factors-en.webp":
    "/images/resources/technical-articles/micro-diaphragm-pump-continuous-duty-life/lifetime-load-factors-de.svg",
  "/images/resources/technical-articles/micro-diaphragm-pump-continuous-duty-life/durability-test-loop-en.webp":
    "/images/resources/technical-articles/micro-diaphragm-pump-continuous-duty-life/durability-test-loop-de.svg",
  "/images/resources/technical-articles/micro-diaphragm-pump-continuous-duty-life/reliability-evidence-levels-en.webp":
    "/images/resources/technical-articles/micro-diaphragm-pump-continuous-duty-life/reliability-evidence-levels-de.svg",
  "/images/resources/technical-articles/micro-diaphragm-pump-continuous-duty-life/b10-weibull-reliability-en.webp":
    "/images/resources/technical-articles/micro-diaphragm-pump-continuous-duty-life/b10-weibull-reliability-de.svg",
  "/images/resources/technical-articles/tubing-assembly-configurator-guide/en/fep-dual-end-configuration.webp": "/images/resources/technical-articles/tubing-assembly-configurator-guide/de/fep-dual-end-configuration.webp",
  "/images/resources/technical-articles/tubing-assembly-configurator-guide/en/fep-dual-end-generated-drawing.webp": "/images/resources/technical-articles/tubing-assembly-configurator-guide/de/fep-dual-end-generated-drawing.webp",
  "/images/resources/technical-articles/flanged-tubing-assemblies-selection-guide/assembly-components-en.svg": "/images/resources/technical-articles/flanged-tubing-assemblies-selection-guide/assembly-components-de.svg",
  "/images/resources/technical-articles/flanged-tubing-assemblies-selection-guide/fitting-front-clearance-en.svg": "/images/resources/technical-articles/flanged-tubing-assemblies-selection-guide/fitting-front-clearance-de.svg",
  "/images/resources/technical-articles/flanged-tubing-assemblies-selection-guide/flanged-sealing-structure-en.svg": "/images/resources/technical-articles/flanged-tubing-assemblies-selection-guide/flanged-sealing-structure-de.svg",
  "/images/resources/technical-articles/flanged-tubing-assemblies-selection-guide/hf-dimensions-en.svg": "/images/resources/technical-articles/flanged-tubing-assemblies-selection-guide/hf-dimensions-de.svg",
  "/images/resources/technical-articles/flanged-tubing-assemblies-selection-guide/hf6-dimensions-en.svg": "/images/resources/technical-articles/flanged-tubing-assemblies-selection-guide/hf6-dimensions-de.svg",
  "/images/resources/technical-articles/what-is-a-bulkhead-barbed-fitting/panel-assembly-engineering-en.svg": "/images/resources/technical-articles/what-is-a-bulkhead-barbed-fitting/panel-assembly-engineering-de.svg",
  "/images/resources/technical-articles/what-is-a-bulkhead-barbed-fitting/tube-barb-bore-engineering-en.svg": "/images/resources/technical-articles/what-is-a-bulkhead-barbed-fitting/tube-barb-bore-engineering-de.svg",
  "/images/resources/technical-articles/diaphragm-pump-flow-pressure-curve-guide/backpressure-flow-mechanisms-en.webp":
    "/images/resources/technical-articles/diaphragm-pump-flow-pressure-curve-guide/backpressure-flow-mechanisms-de.svg",
  "/images/resources/technical-articles/diaphragm-pump-flow-pressure-curve-guide/installed-flow-test-loop-en.webp":
    "/images/resources/technical-articles/diaphragm-pump-flow-pressure-curve-guide/installed-flow-test-loop-de.svg",
  "/images/resources/technical-articles/diaphragm-pump-flow-pressure-curve-guide/pump-system-operating-point-en.webp":
    "/images/resources/technical-articles/diaphragm-pump-flow-pressure-curve-guide/pump-system-operating-point-de.svg",
  "/images/resources/technical-articles/diaphragm-pump-flow-pressure-curve-guide/tube-diameter-pressure-loss-en.webp":
    "/images/resources/technical-articles/diaphragm-pump-flow-pressure-curve-guide/tube-diameter-pressure-loss-de.svg",
  "/images/resources/technical-articles/tube-inner-diameter-affects-diaphragm-pump-flow/article-figure-en.webp":
    "/images/resources/technical-articles/tube-inner-diameter-affects-diaphragm-pump-flow/article-figure-de.svg",
  "/images/resources/technical-articles/high-backpressure-fluid-path-pressure-budget/article-figure-en.webp":
    "/images/resources/technical-articles/high-backpressure-fluid-path-pressure-budget/article-figure-de.svg",
  "/images/resources/technical-articles/100-kpa-vs-600-kpa-diaphragm-pump-selection/article-figure-en.webp":
    "/images/resources/technical-articles/100-kpa-vs-600-kpa-diaphragm-pump-selection/article-figure-de.svg",
  "/images/resources/technical-articles/what-is-a-valveless-metering-pump/valveless-metering-pump-working-cycle-en.webp":
    "/images/resources/technical-articles/what-is-a-valveless-metering-pump/valveless-metering-pump-working-cycle-de.svg",
  "/images/resources/pump-application-guides/inkjet-printer-pumps/inkjet-fluid-path-en.webp":
    "/images/resources/pump-application-guides/inkjet-printer-pumps/inkjet-fluid-path-de.svg",
  "/images/resources/technical-articles/pvc-tubing-pressure-rating-pull-off-force/pull-off-force-1-6mm-original.webp": "/images/resources/technical-articles/pvc-tubing-pressure-rating-pull-off-force/pull-off-force-1-6mm-de.webp",
  "/images/resources/technical-articles/pvc-tubing-pressure-rating-pull-off-force/pull-off-force-3-2mm-original.webp": "/images/resources/technical-articles/pvc-tubing-pressure-rating-pull-off-force/pull-off-force-3-2mm-de.webp",
  "/images/resources/technical-articles/diaphragm-pump-rd/en/diaphragm-pump-working-principle-clean.gif":
    "/images/resources/technical-articles/diaphragm-pump-rd/de/diaphragm-pump-working-principle-clean.webp",
  "/images/resources/technical-articles/legacy-motion-control/acceleration-curve-1.png":
    "/images/resources/technical-articles/legacy-motion-control/acceleration-curve-1-de.svg",
  "/images/resources/technical-articles/legacy-motion-control/acceleration-curve-2.png":
    "/images/resources/technical-articles/legacy-motion-control/acceleration-curve-2-de.svg",
  "/images/resources/technical-articles/legacy-motion-control/acceleration-curve-3.png":
    "/images/resources/technical-articles/legacy-motion-control/acceleration-curve-3-de.svg",
};

const structuralFields = new Set([
  "id", "slug", "href", "src", "date", "dateModified", "locale", "category",
  "series", "model", "modelCode", "productId", "seriesId", "type", "kind", "expression",
  "relationKeys", "sidebarModels", "pumpIds", "assemblyMaterials", "anchors",
  "productIds", "models", "coverImage", "captionHref", "cover", "key", "code",
  "image", "imageSrc", "figureSrc", "poster", "backgroundImage", "sourceHref",
  "sourceModule", "sourceLanguage", "coverHref", "mediaSrc",
]);

function localizeCompleteArticle<T>(
  source: T,
  dictionary: TranslationDictionary,
  shouldTranslate: (value: string, field: string) => boolean,
): T | null {
  let isComplete = true;
  function localize<U>(value: U, field: string): U {
    if ((field === "src" || field === "coverImage" || field === "href") && typeof value === "string") {
      return (germanFigureSources[value] ?? value) as U;
    }
    if (structuralFields.has(field)) return value;
    if (typeof value === "string" && value.trim() && shouldTranslate(value, field)) {
      const german = Object.hasOwn(dictionary, value) ? dictionary[value] : undefined;
      if (german?.trim()) return german as U;
      isComplete = false;
      return value;
    }
    if (Array.isArray(value)) return value.map((item) => localize(item, field)) as U;
    if (!value || typeof value !== "object") return value;
    return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, localize(item, key)])) as U;
  }
  const result = localize(source, "");
  return isComplete ? result : null;
}

const selectionSources = [
  { family: "connector", read: getConnectorSelectionArticle },
  { family: "instrument", read: getInstrumentFluidicsArticle },
  { family: "tubing", read: getTubingMaterialArticle },
  { family: "valve", read: getValveEngineeringArticle },
] as const;

const isPageCopy = (value: string) => !/^(?:\/|https?:\/\/|#|mailto:)/.test(value);

type SelectionEdition = {
  kind: "selection";
  family: "connector" | "instrument" | "tubing" | "valve" | "rpl" | "pipetting";
  copy: DiaphragmPumpEngineeringArticleCopy;
  navigation?: readonly RplArticleSectionNavigationItem[];
  subject?: { about: readonly string[]; mentions: readonly string[] };
  assemblyLinks?: readonly EngineeringArticleLink[];
  footerIntro?: string;
  workflows?: readonly PipettingBasicsWorkflow[];
  modelLinks?: readonly { name: string; href: string }[];
  faq?: readonly EngineeringArticleFaqItem[];
};

const legacyFittingSources = {
  "what-is-a-barbed-fitting": { copy: getBarbedFittingCopy, navigation: getBarbedFittingNavigation, subject: getBarbedFittingSubject },
  "what-is-a-luer-fitting": { copy: getLuerFittingCopy, navigation: getLuerFittingNavigation },
  "what-is-a-ferrule-fitting": { copy: getFerruleFittingCopy, navigation: getFerruleFittingNavigation },
  "what-is-a-compression-ring-fitting": { copy: getCompressionRingFittingCopy, navigation: getCompressionRingFittingNavigation },
  "flanged-tubing-assemblies-selection-guide": { copy: getFlangedTubingCopy, navigation: getFlangedTubingNavigation },
  "hard-tube-fittings-selection-guide": { copy: getHardTubeFittingsCopy, navigation: getHardTubeFittingsNavigation },
};

const legacySelectionSources = {
  "what-is-pipetting": { copy: getPipettingBasicsCopy, navigation: getPipettingBasicsNavigation, subject: getPipettingBasicsSubject },
  "what-is-a-programmable-syringe-pump": { copy: getProgrammableSyringeCopy, navigation: getProgrammableSyringeNavigation },
  "what-is-a-programmable-pipetting-pump": { copy: getProgrammablePipettingCopy, navigation: getProgrammablePipettingNavigation },
  "metering-pump-accuracy-repeatability-reagent-dispensing": { copy: getMeteringPumpAccuracyRepeatabilityCopy, navigation: getMeteringPumpAccuracyRepeatabilityNavigation, subject: getMeteringPumpAccuracyRepeatabilitySubject },
  "what-is-a-valveless-metering-pump": { copy: getValvelessMeteringPumpOverviewCopy, navigation: getValvelessMeteringPumpOverviewNavigation },
};

function englishSpecialtySelection({ slug, dictionary }: { slug: string; dictionary: TranslationDictionary }): SelectionEdition | null {
  const fitting = legacyFittingSources[slug as keyof typeof legacyFittingSources];
  const selection = legacySelectionSources[slug as keyof typeof legacySelectionSources];
  if (fitting) {
    const isFlanged = slug === "flanged-tubing-assemblies-selection-guide";
    const english = {
      copy: fitting.copy("en"),
      navigation: fitting.navigation("en"),
      subject: "subject" in fitting ? fitting.subject("en") : undefined,
      assemblyLinks: getFittingAssemblyLinks(slug, getTubingAssemblySelectionContent("en")),
      footerIntro: isFlanged ? flangedTubingRelatedIntro.en : undefined,
    };
    const translated = localizeCompleteArticle(english, dictionary, isPageCopy);
    return translated ? { kind: "selection", family: "connector", ...translated, faq: translated.copy.faqItems } : null;
  }

  if (selection) {
    const source = selection.copy(slug, "en");
    if (!source) return null;
    const pipetting = slug === "what-is-pipetting";
    const english = {
      copy: source,
      navigation: selection.navigation("en"),
      subject: "subject" in selection ? selection.subject("en") : undefined,
      workflows: pipetting ? getPipettingBasicsWorkflows("en") : undefined,
    };
    const translated = localizeCompleteArticle(english, dictionary, isPageCopy);
    return translated ? { kind: "selection", family: pipetting ? "pipetting" : "rpl", ...translated, faq: translated.copy.faqItems } : null;
  }

  const source = getRplSelectionArticleCopy(slug, "en");
  if (!source) return null;
  const translated = localizeCompleteArticle({
    copy: source,
    modelLinks: getRplSelectionProducts("en"),
    faq: getRplSelectionFaqItems("en"),
  }, dictionary, isPageCopy);
  return translated ? { kind: "selection", family: "rpl", ...translated } : null;
}

export function getGermanBatchTechnicalArticleCopy(slug: string) {
  if (!germanBatchTechnicalArticleSlugs.includes(slug)) return null;
  const dictionary = germanBatchTechnicalArticleDictionaries[slug];
  if (!dictionary) return null;

  if (slug === brushlessWiringArticleSlug) {
    const copy = localizeCompleteArticle(getBrushlessWiringArticleCopy("en"), dictionary, isPageCopy);
    return copy ? { kind: "brushless-wiring" as const, copy } : null;
  }

  const engineering = getEnglishEngineeringArticleSource(slug);
  if (engineering) {
    const copy = localizeCompleteArticle(engineering.copy, dictionary, (_, field) => engineeringArticleTranslationFields.has(field));
    return copy ? { kind: "engineering" as const, copy, showSummary: engineering.showSummary } : null;
  }

  const piston = getPistonPumpArticleCopy(slug, "en");
  if (piston) {
    const copy = localizeCompleteArticle(piston, dictionary, isPageCopy);
    return copy ? { kind: "piston" as const, copy } : null;
  }

  for (const { family, read } of selectionSources) {
    const source = read(slug, "en");
    if (!source) continue;
    const { copy, navigation, subject } = source;
    const translated = localizeCompleteArticle({ copy, navigation, subject }, dictionary, isPageCopy);
    const edition: SelectionEdition | null = translated ? { kind: "selection", family, ...translated, faq: translated.copy.faqItems } : null;
    return edition;
  }

  return englishSpecialtySelection({ slug, dictionary });
}
