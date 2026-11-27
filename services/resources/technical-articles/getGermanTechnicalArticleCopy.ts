import { dpgl800ArticleSlug, type Dpgl800ArticleCopy } from "@/data/resources/technical-articles/dpgl800-gas-liquid-diaphragm-pump.article";
import { dpgl800ArticleDeCopy } from "@/data/resources/technical-articles/dpgl800-gas-liquid-diaphragm-pump.de";
import { dpl60ArticleSlug } from "@/data/resources/technical-articles/dpl60-liquid-diaphragm-pump.article";
import { dpl60ArticleDeCopy, dpl60ArticleDeFaq } from "@/data/resources/technical-articles/dpl60-liquid-diaphragm-pump.de";
import { dpl30ArticleSlug, type Dpl30ArticleCopy, type Dpl30FaqCopy } from "@/data/resources/technical-articles/dpl30-liquid-diaphragm-pump.article";
import { dpl30ArticleDeCopy, dpl30ArticleDeFaq } from "@/data/resources/technical-articles/dpl30-liquid-diaphragm-pump.de";
import { dpl30hArticleSlug, type Dpl30hArticleCopy } from "@/data/resources/technical-articles/dpl30h-high-pressure-liquid-diaphragm-pump.article";
import { dpl30hArticleDeCopy } from "@/data/resources/technical-articles/dpl30h-high-pressure-liquid-diaphragm-pump.de";
import { cvKvMicrofluidicsSlug, germanCvKvMetadata } from "@/data/resources/technical-articles/cv-kv-microfluidics.de";
import { getGermanBatchEngineeringArticleCopy } from "./getGermanBatchEngineeringArticleCopy";
import { getGermanBatchTechnicalArticleCopy } from "./getGermanBatchTechnicalArticleCopy";
import { getPumpDiagnosticsArticleCopy } from "@/data/resources/technical-articles/pump-diagnostics-articles.article";
import { germanFluidResistanceArticle } from "@/data/resources/technical-articles/fluid-resistance-calculator-guide.de";
import {
  germanDiaphragmMaterialsArticle,
  germanMotorRunsNoFlowArticle,
} from "@/data/resources/technical-articles/diaphragm-pump-engineering-articles.de";
import { germanDiaphragmPressureTermsArticle } from "@/data/resources/technical-articles/diaphragm-pump-pressure-rating-terms.de";
import { germanPistonTutorialArticles } from "@/data/resources/technical-articles/technical-article-video-companion-content.de";
import type { DiaphragmPumpEngineeringArticleCopy } from "@/data/resources/technical-articles/diaphragm-pump-engineering-article.types";
import type { PistonPumpArticleCopy } from "@/data/resources/technical-articles/piston-pump-articles.types";
import { germanSamplingProbeSelectionCopy } from "@/data/resources/technical-articles/sampling-probe-selection-locales";
import { samplingProbeSelectionSlug } from "@/data/resources/technical-articles/technical-article-availability";

const engineeringArticles: Partial<Record<string, DiaphragmPumpEngineeringArticleCopy>> = {
  "fluid-resistance-calculator-liquid-path-design-guide": germanFluidResistanceArticle,
  "micro-diaphragm-pump-materials-selection": germanDiaphragmMaterialsArticle,
  "300-ml-min-micro-liquid-diaphragm-pump-motor-runs-no-flow": germanMotorRunsNoFlowArticle,
  "diaphragm-pump-pressure-rating-terms": germanDiaphragmPressureTermsArticle,
};

export type GermanTechnicalArticleEdition =
  | NonNullable<ReturnType<typeof getGermanBatchTechnicalArticleCopy>>
  | { kind: "engineering"; copy: DiaphragmPumpEngineeringArticleCopy; showSummary: boolean }
  | { kind: "piston"; copy: PistonPumpArticleCopy }
  | { kind: "cv-kv"; copy: { metadata: typeof germanCvKvMetadata; deck: string } }
  | { kind: "dpl30h"; copy: Dpl30hArticleCopy & { deck: string } }
  | { kind: "dpgl800"; copy: Dpgl800ArticleCopy & { deck: string } }
  | { kind: "standard-diaphragm"; series: "dpl30"; copy: Dpl30ArticleCopy & { deck: string }; faq: Dpl30FaqCopy }
  | { kind: "standard-diaphragm"; series: "dpl60"; copy: typeof dpl60ArticleDeCopy & { deck: string }; faq: Dpl30FaqCopy };

export function getGermanTechnicalArticleCopy(slug: string): GermanTechnicalArticleEdition | null {
  if (slug === dpgl800ArticleSlug) {
    return {
      kind: "dpgl800",
      copy: { ...dpgl800ArticleDeCopy, deck: dpgl800ArticleDeCopy.section1.paragraphs[0] },
    };
  }
  if (slug === dpl30ArticleSlug) {
    return {
      kind: "standard-diaphragm",
      series: "dpl30",
      copy: { ...dpl30ArticleDeCopy, deck: dpl30ArticleDeCopy.section1.paragraphs[0] },
      faq: dpl30ArticleDeFaq,
    };
  }
  if (slug === dpl60ArticleSlug) {
    return {
      kind: "standard-diaphragm",
      series: "dpl60",
      copy: { ...dpl60ArticleDeCopy, deck: dpl60ArticleDeCopy.section1.paragraphs[0] },
      faq: dpl60ArticleDeFaq,
    };
  }
  if (slug === dpl30hArticleSlug) {
    return {
      kind: "dpl30h",
      copy: { ...dpl30hArticleDeCopy, deck: dpl30hArticleDeCopy.section1.paragraphs[0] },
    };
  }
  if (slug === cvKvMicrofluidicsSlug) {
    return { kind: "cv-kv", copy: { metadata: germanCvKvMetadata, deck: germanCvKvMetadata.summary } };
  }
  if (slug === samplingProbeSelectionSlug) return { kind: "engineering", copy: germanSamplingProbeSelectionCopy, showSummary: false };
  const engineering = engineeringArticles[slug];
  if (engineering) return { kind: "engineering", copy: engineering, showSummary: true };
  const piston = germanPistonTutorialArticles[slug];
  if (piston) return { kind: "piston", copy: piston };
  const diagnostics = getPumpDiagnosticsArticleCopy(slug, "de");
  if (diagnostics) return { kind: "engineering", copy: diagnostics, showSummary: false };
  const batchEdition = getGermanBatchEngineeringArticleCopy(slug);
  return batchEdition ? { kind: "engineering", ...batchEdition } : getGermanBatchTechnicalArticleCopy(slug);
}
