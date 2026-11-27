import type { Metadata } from 'next';
import type { RelatedResourcesData } from '@/components/common/related-resources/related-resources.types';
import type { ApplicationDocument } from '@/data/applications/analytical-documents/types';
import { applicationRoutes, resolveApplicationHref, type ApplicationRoute } from '@/data/applications/application-routes';
import type { EnglishApplicationKind } from '@/data/applications/application-english';
import { italianIvdArticleDescriptions, italianIvdRelatedTitles, italianIvdVideoCopy } from '@/data/applications/ivd-locales/it';
import { getDraftHrefForEnglish, getItalianDraftLink, isLocalizedItalianDraftPath, italianEnglishFallbackSuffix } from '@/lib/i18n/draft-languages';
import { getCanonicalUrl } from '@/lib/seo/site-url';
import { getEnglishApplicationSchema } from './english-localized';

export type ItalianApplicationCopy = Readonly<Record<string, string>>;

const italianChildApplicationLoaders: Partial<Record<string, () => Promise<{ default: ItalianApplicationCopy }>>> = {
  "/en/applications/synthetic-biology/guide-biofoundry/": () => import('@/data/applications/italian-review-child-locales/synthetic-biology/guide-biofoundry.json'),
  "/en/applications/synthetic-biology/guide-biofoundry/biofoundry-diaphragm-pumps/": () => import('@/data/applications/italian-review-child-locales/synthetic-biology/biofoundry-diaphragm-pumps.json'),
  "/en/applications/synthetic-biology/guide-biofoundry/biofoundry-fluid-monitoring/": () => import('@/data/applications/italian-review-child-locales/synthetic-biology/biofoundry-fluid-monitoring.json'),
  "/en/applications/synthetic-biology/guide-biofoundry/biofoundry-fluidic-connections/": () => import('@/data/applications/italian-review-child-locales/synthetic-biology/biofoundry-fluidic-connections.json'),
  "/en/applications/synthetic-biology/guide-biofoundry/biofoundry-fluidic-valves/": () => import('@/data/applications/italian-review-child-locales/synthetic-biology/biofoundry-fluidic-valves.json'),
  "/en/applications/synthetic-biology/guide-biofoundry/biofoundry-fluidic-valves/biofoundry-path-management/": () => import('@/data/applications/italian-review-child-locales/synthetic-biology/biofoundry-path-management.json'),
  "/en/applications/synthetic-biology/guide-biofoundry/biofoundry-pipetting-pumps/": () => import('@/data/applications/italian-review-child-locales/synthetic-biology/biofoundry-pipetting-pumps.json'),
  "/en/applications/synthetic-biology/guide-biofoundry/biofoundry-pipetting-pumps/biofoundry-pipetting/": () => import('@/data/applications/italian-review-child-locales/synthetic-biology/biofoundry-pipetting.json'),
  "/en/applications/synthetic-biology/guide-biofoundry/biofoundry-pipetting-pumps/biofoundry-plate/": () => import('@/data/applications/italian-review-child-locales/synthetic-biology/biofoundry-plate.json'),
  "/en/applications/synthetic-biology/guide-biofoundry/biofoundry-syringe-pumps/": () => import('@/data/applications/italian-review-child-locales/synthetic-biology/biofoundry-syringe-pumps.json'),
  "/en/applications/synthetic-biology/guide-biofoundry/biofoundry-syringe-pumps/biofoundry-reagent/": () => import('@/data/applications/italian-review-child-locales/synthetic-biology/biofoundry-reagent.json'),
  "/en/applications/synthetic-biology/guide-bio-process-integration/": () => import('@/data/applications/italian-review-child-locales/synthetic-biology/guide-bio-process-integration.json'),
  "/en/applications/synthetic-biology/guide-bio-process-integration/bio-process-integration-diaphragm-pumps/": () => import('@/data/applications/italian-review-child-locales/synthetic-biology/bio-process-integration-diaphragm-pumps.json'),
  "/en/applications/synthetic-biology/guide-bio-process-integration/bio-process-integration-fluid-monitoring/": () => import('@/data/applications/italian-review-child-locales/synthetic-biology/bio-process-integration-fluid-monitoring.json'),
  "/en/applications/synthetic-biology/guide-bio-process-integration/bio-process-integration-fluidic-connections/": () => import('@/data/applications/italian-review-child-locales/synthetic-biology/bio-process-integration-fluidic-connections.json'),
  "/en/applications/synthetic-biology/guide-bio-process-integration/bio-process-integration-fluidic-valves/": () => import('@/data/applications/italian-review-child-locales/synthetic-biology/bio-process-integration-fluidic-valves.json'),
  "/en/applications/synthetic-biology/guide-bio-process-integration/bio-process-integration-fluidic-valves/bio-process-integration-path-management/": () => import('@/data/applications/italian-review-child-locales/synthetic-biology/bio-process-integration-path-management.json'),
  "/en/applications/synthetic-biology/guide-bio-process-integration/bio-process-integration-syringe-pumps/": () => import('@/data/applications/italian-review-child-locales/synthetic-biology/bio-process-integration-syringe-pumps.json'),
  "/en/applications/synthetic-biology/guide-bio-process-integration/bio-process-integration-valveless-pumps/": () => import('@/data/applications/italian-review-child-locales/synthetic-biology/bio-process-integration-valveless-pumps.json'),
  "/en/applications/synthetic-biology/guide-micro-bioreactor/": () => import('@/data/applications/italian-review-child-locales/synthetic-biology/guide-micro-bioreactor.json'),
  "/en/applications/synthetic-biology/guide-micro-bioreactor/micro-bioreactor-diaphragm-pumps/": () => import('@/data/applications/italian-review-child-locales/synthetic-biology/micro-bioreactor-diaphragm-pumps.json'),
  "/en/applications/synthetic-biology/guide-micro-bioreactor/micro-bioreactor-diaphragm-pumps/micro-bioreactor-waste/": () => import('@/data/applications/italian-review-child-locales/synthetic-biology/micro-bioreactor-waste.json'),
  "/en/applications/synthetic-biology/guide-micro-bioreactor/micro-bioreactor-fluid-monitoring/": () => import('@/data/applications/italian-review-child-locales/synthetic-biology/micro-bioreactor-fluid-monitoring.json'),
  "/en/applications/synthetic-biology/guide-micro-bioreactor/micro-bioreactor-fluidic-connections/": () => import('@/data/applications/italian-review-child-locales/synthetic-biology/micro-bioreactor-fluidic-connections.json'),
  "/en/applications/synthetic-biology/guide-micro-bioreactor/micro-bioreactor-fluidic-valves/": () => import('@/data/applications/italian-review-child-locales/synthetic-biology/micro-bioreactor-fluidic-valves.json'),
  "/en/applications/synthetic-biology/guide-micro-bioreactor/micro-bioreactor-fluidic-valves/micro-bioreactor-switching/": () => import('@/data/applications/italian-review-child-locales/synthetic-biology/micro-bioreactor-switching.json'),
  "/en/applications/synthetic-biology/guide-micro-bioreactor/micro-bioreactor-syringe-pumps/": () => import('@/data/applications/italian-review-child-locales/synthetic-biology/micro-bioreactor-syringe-pumps.json'),
  "/en/applications/synthetic-biology/guide-micro-bioreactor/micro-bioreactor-syringe-pumps/micro-bioreactor-sampling/": () => import('@/data/applications/italian-review-child-locales/synthetic-biology/micro-bioreactor-sampling.json'),
  "/en/applications/synthetic-biology/guide-micro-bioreactor/micro-bioreactor-valveless-pumps/": () => import('@/data/applications/italian-review-child-locales/synthetic-biology/micro-bioreactor-valveless-pumps.json'),
  "/en/applications/synthetic-biology/guide-micro-bioreactor/micro-bioreactor-valveless-pumps/micro-bioreactor-feeding/": () => import('@/data/applications/italian-review-child-locales/synthetic-biology/micro-bioreactor-feeding.json'),
  "/en/applications/synthetic-biology/guide-feeding-control/": () => import('@/data/applications/italian-review-child-locales/synthetic-biology/guide-feeding-control.json'),
  "/en/applications/synthetic-biology/guide-feeding-control/feeding-control-fluid-monitoring/": () => import('@/data/applications/italian-review-child-locales/synthetic-biology/feeding-control-fluid-monitoring.json'),
  "/en/applications/synthetic-biology/guide-feeding-control/feeding-control-fluidic-connections/": () => import('@/data/applications/italian-review-child-locales/synthetic-biology/feeding-control-fluidic-connections.json'),
  "/en/applications/synthetic-biology/guide-feeding-control/feeding-control-fluidic-connections/feeding-control-protection/": () => import('@/data/applications/italian-review-child-locales/synthetic-biology/feeding-control-protection.json'),
  "/en/applications/synthetic-biology/guide-feeding-control/feeding-control-fluidic-valves/": () => import('@/data/applications/italian-review-child-locales/synthetic-biology/feeding-control-fluidic-valves.json'),
  "/en/applications/synthetic-biology/guide-feeding-control/feeding-control-fluidic-valves/feeding-control-switching/": () => import('@/data/applications/italian-review-child-locales/synthetic-biology/feeding-control-switching.json'),
  "/en/applications/synthetic-biology/guide-feeding-control/feeding-control-syringe-pumps/": () => import('@/data/applications/italian-review-child-locales/synthetic-biology/feeding-control-syringe-pumps.json'),
  "/en/applications/synthetic-biology/guide-feeding-control/feeding-control-valveless-pumps/": () => import('@/data/applications/italian-review-child-locales/synthetic-biology/feeding-control-valveless-pumps.json'),
  "/en/applications/synthetic-biology/guide-feeding-control/feeding-control-valveless-pumps/feeding-control-feeding/": () => import('@/data/applications/italian-review-child-locales/synthetic-biology/feeding-control-feeding.json'),
  "/en/applications/synthetic-biology/guide-online-sampling/": () => import('@/data/applications/italian-review-child-locales/synthetic-biology/guide-online-sampling.json'),
  "/en/applications/synthetic-biology/guide-online-sampling/online-sampling-fluid-monitoring/": () => import('@/data/applications/italian-review-child-locales/synthetic-biology/online-sampling-fluid-monitoring.json'),
  "/en/applications/synthetic-biology/guide-online-sampling/online-sampling-fluidic-connections/": () => import('@/data/applications/italian-review-child-locales/synthetic-biology/online-sampling-fluidic-connections.json'),
  "/en/applications/synthetic-biology/guide-online-sampling/online-sampling-fluidic-connections/online-sampling-filtration/": () => import('@/data/applications/italian-review-child-locales/synthetic-biology/online-sampling-filtration.json'),
  "/en/applications/synthetic-biology/guide-online-sampling/online-sampling-fluidic-valves/": () => import('@/data/applications/italian-review-child-locales/synthetic-biology/online-sampling-fluidic-valves.json'),
  "/en/applications/synthetic-biology/guide-online-sampling/online-sampling-fluidic-valves/online-sampling-tube-control/": () => import('@/data/applications/italian-review-child-locales/synthetic-biology/online-sampling-tube-control.json'),
  "/en/applications/synthetic-biology/guide-online-sampling/online-sampling-syringe-pumps/": () => import('@/data/applications/italian-review-child-locales/synthetic-biology/online-sampling-syringe-pumps.json'),
  "/en/applications/synthetic-biology/guide-online-sampling/online-sampling-syringe-pumps/online-sampling-pretreatment/": () => import('@/data/applications/italian-review-child-locales/synthetic-biology/online-sampling-pretreatment.json'),
  "/en/applications/synthetic-biology/guide-online-sampling/online-sampling-syringe-pumps/online-sampling-sample-acquisition/": () => import('@/data/applications/italian-review-child-locales/synthetic-biology/online-sampling-sample-acquisition.json'),
  "/en/applications/life-science/guide-genomics/": () => import('@/data/applications/italian-review-child-locales/life-science/guide-genomics.json'),
  "/en/applications/life-science/guide-genomics/genomics-fluid-monitoring/": () => import('@/data/applications/italian-review-child-locales/life-science/genomics-fluid-monitoring.json'),
  "/en/applications/life-science/guide-genomics/genomics-fluidic-connections/": () => import('@/data/applications/italian-review-child-locales/life-science/genomics-fluidic-connections.json'),
  "/en/applications/life-science/guide-genomics/genomics-fluidic-valves/": () => import('@/data/applications/italian-review-child-locales/life-science/genomics-fluidic-valves.json'),
  "/en/applications/life-science/guide-genomics/genomics-fluidic-valves/genomics-switching/": () => import('@/data/applications/italian-review-child-locales/life-science/genomics-switching.json'),
  "/en/applications/life-science/guide-genomics/genomics-pipetting-pumps/": () => import('@/data/applications/italian-review-child-locales/life-science/genomics-pipetting-pumps.json'),
  "/en/applications/life-science/guide-genomics/genomics-pipetting-pumps/genomics-sample-prep/": () => import('@/data/applications/italian-review-child-locales/life-science/genomics-sample-prep.json'),
  "/en/applications/life-science/guide-genomics/genomics-pipetting-pumps/genomics-wash-elution/": () => import('@/data/applications/italian-review-child-locales/life-science/genomics-wash-elution.json'),
  "/en/applications/life-science/guide-genomics/genomics-syringe-pumps/": () => import('@/data/applications/italian-review-child-locales/life-science/genomics-syringe-pumps.json'),
  "/en/applications/life-science/guide-bio-process/": () => import('@/data/applications/italian-review-child-locales/life-science/guide-bio-process.json'),
  "/en/applications/life-science/guide-bio-process/bio-process-fluid-monitoring/": () => import('@/data/applications/italian-review-child-locales/life-science/bio-process-fluid-monitoring.json'),
  "/en/applications/life-science/guide-bio-process/bio-process-fluidic-connections/": () => import('@/data/applications/italian-review-child-locales/life-science/bio-process-fluidic-connections.json'),
  "/en/applications/life-science/guide-bio-process/bio-process-fluidic-valves/": () => import('@/data/applications/italian-review-child-locales/life-science/bio-process-fluidic-valves.json'),
  "/en/applications/life-science/guide-bio-process/bio-process-syringe-pumps/": () => import('@/data/applications/italian-review-child-locales/life-science/bio-process-syringe-pumps.json'),
  "/en/applications/life-science/guide-bio-process/bio-process-syringe-pumps/bio-process-sampling/": () => import('@/data/applications/italian-review-child-locales/life-science/bio-process-sampling.json'),
  "/en/applications/life-science/guide-bio-process/bio-process-valveless-pumps/": () => import('@/data/applications/italian-review-child-locales/life-science/bio-process-valveless-pumps.json'),
  "/en/applications/life-science/guide-bio-process/bio-process-valveless-pumps/bio-process-feeding/": () => import('@/data/applications/italian-review-child-locales/life-science/bio-process-feeding.json'),
  "/en/applications/life-science/guide-protein/": () => import('@/data/applications/italian-review-child-locales/life-science/guide-protein.json'),
  "/en/applications/life-science/guide-protein/protein-diaphragm-pumps/": () => import('@/data/applications/italian-review-child-locales/life-science/protein-diaphragm-pumps.json'),
  "/en/applications/life-science/guide-protein/protein-fluid-monitoring/": () => import('@/data/applications/italian-review-child-locales/life-science/protein-fluid-monitoring.json'),
  "/en/applications/life-science/guide-protein/protein-fluidic-connections/": () => import('@/data/applications/italian-review-child-locales/life-science/protein-fluidic-connections.json'),
  "/en/applications/life-science/guide-protein/protein-fluidic-valves/": () => import('@/data/applications/italian-review-child-locales/life-science/protein-fluidic-valves.json'),
  "/en/applications/life-science/guide-protein/protein-fluidic-valves/protein-buffer/": () => import('@/data/applications/italian-review-child-locales/life-science/protein-buffer.json'),
  "/en/applications/life-science/guide-protein/protein-pipetting-pumps/": () => import('@/data/applications/italian-review-child-locales/life-science/protein-pipetting-pumps.json'),
  "/en/applications/life-science/guide-protein/protein-syringe-pumps/": () => import('@/data/applications/italian-review-child-locales/life-science/protein-syringe-pumps.json'),
  "/en/applications/life-science/guide-protein/protein-syringe-pumps/protein-sample/": () => import('@/data/applications/italian-review-child-locales/life-science/protein-sample.json'),
  "/en/applications/life-science/guide-cell-culture/": () => import('@/data/applications/italian-review-child-locales/life-science/guide-cell-culture.json'),
  "/en/applications/life-science/guide-cell-culture/cell-culture-diaphragm-pumps/": () => import('@/data/applications/italian-review-child-locales/life-science/cell-culture-diaphragm-pumps.json'),
  "/en/applications/life-science/guide-cell-culture/cell-culture-fluid-monitoring/": () => import('@/data/applications/italian-review-child-locales/life-science/cell-culture-fluid-monitoring.json'),
  "/en/applications/life-science/guide-cell-culture/cell-culture-fluidic-connections/": () => import('@/data/applications/italian-review-child-locales/life-science/cell-culture-fluidic-connections.json'),
  "/en/applications/life-science/guide-cell-culture/cell-culture-fluidic-valves/": () => import('@/data/applications/italian-review-child-locales/life-science/cell-culture-fluidic-valves.json'),
  "/en/applications/life-science/guide-cell-culture/cell-culture-syringe-pumps/": () => import('@/data/applications/italian-review-child-locales/life-science/cell-culture-syringe-pumps.json'),
  "/en/applications/life-science/guide-cell-culture/cell-culture-syringe-pumps/cell-culture-transfer/": () => import('@/data/applications/italian-review-child-locales/life-science/cell-culture-transfer.json'),
  "/en/applications/life-science/guide-cell-culture/cell-culture-valveless-pumps/": () => import('@/data/applications/italian-review-child-locales/life-science/cell-culture-valveless-pumps.json'),
  "/en/applications/life-science/guide-cell-culture/cell-culture-valveless-pumps/cell-culture-media/": () => import('@/data/applications/italian-review-child-locales/life-science/cell-culture-media.json'),
  "/en/applications/life-science/guide-automation/": () => import('@/data/applications/italian-review-child-locales/life-science/guide-automation.json'),
  "/en/applications/life-science/guide-automation/automation-diaphragm-pumps/": () => import('@/data/applications/italian-review-child-locales/life-science/automation-diaphragm-pumps.json'),
  "/en/applications/life-science/guide-automation/automation-diaphragm-pumps/automation-washing/": () => import('@/data/applications/italian-review-child-locales/life-science/automation-washing.json'),
  "/en/applications/life-science/guide-automation/automation-fluid-monitoring/": () => import('@/data/applications/italian-review-child-locales/life-science/automation-fluid-monitoring.json'),
  "/en/applications/life-science/guide-automation/automation-fluidic-connections/": () => import('@/data/applications/italian-review-child-locales/life-science/automation-fluidic-connections.json'),
  "/en/applications/life-science/guide-automation/automation-fluidic-valves/": () => import('@/data/applications/italian-review-child-locales/life-science/automation-fluidic-valves.json'),
  "/en/applications/life-science/guide-automation/automation-pipetting-pumps/": () => import('@/data/applications/italian-review-child-locales/life-science/automation-pipetting-pumps.json'),
  "/en/applications/life-science/guide-automation/automation-pipetting-pumps/automation-pipetting/": () => import('@/data/applications/italian-review-child-locales/life-science/automation-pipetting.json'),
  "/en/applications/life-science/guide-automation/automation-syringe-pumps/": () => import('@/data/applications/italian-review-child-locales/life-science/automation-syringe-pumps.json'),
  "/en/applications/lab-automation/guide-system-integration/": () => import('@/data/applications/italian-review-child-locales/lab-automation/guide-system-integration.json'),
  "/en/applications/lab-automation/guide-system-integration/system-integration-diaphragm-pumps/": () => import('@/data/applications/italian-review-child-locales/lab-automation/system-integration-diaphragm-pumps.json'),
  "/en/applications/lab-automation/guide-system-integration/system-integration-fluid-monitoring/": () => import('@/data/applications/italian-review-child-locales/lab-automation/system-integration-fluid-monitoring.json'),
  "/en/applications/lab-automation/guide-system-integration/system-integration-fluidic-connections/": () => import('@/data/applications/italian-review-child-locales/lab-automation/system-integration-fluidic-connections.json'),
  "/en/applications/lab-automation/guide-system-integration/system-integration-fluidic-valves/": () => import('@/data/applications/italian-review-child-locales/lab-automation/system-integration-fluidic-valves.json'),
  "/en/applications/lab-automation/guide-system-integration/system-integration-fluidic-valves/system-integration-path-management/": () => import('@/data/applications/italian-review-child-locales/lab-automation/system-integration-path-management.json'),
  "/en/applications/lab-automation/guide-system-integration/system-integration-pipetting-pumps/": () => import('@/data/applications/italian-review-child-locales/lab-automation/system-integration-pipetting-pumps.json'),
  "/en/applications/lab-automation/guide-system-integration/system-integration-syringe-pumps/": () => import('@/data/applications/italian-review-child-locales/lab-automation/system-integration-syringe-pumps.json'),
  "/en/applications/lab-automation/guide-sample-prep/": () => import('@/data/applications/italian-review-child-locales/lab-automation/guide-sample-prep.json'),
  "/en/applications/lab-automation/guide-sample-prep/sample-prep-diaphragm-pumps/": () => import('@/data/applications/italian-review-child-locales/lab-automation/sample-prep-diaphragm-pumps.json'),
  "/en/applications/lab-automation/guide-sample-prep/sample-prep-diaphragm-pumps/sample-prep-washing/": () => import('@/data/applications/italian-review-child-locales/lab-automation/sample-prep-washing.json'),
  "/en/applications/lab-automation/guide-sample-prep/sample-prep-fluid-monitoring/": () => import('@/data/applications/italian-review-child-locales/lab-automation/sample-prep-fluid-monitoring.json'),
  "/en/applications/lab-automation/guide-sample-prep/sample-prep-fluidic-connections/": () => import('@/data/applications/italian-review-child-locales/lab-automation/sample-prep-fluidic-connections.json'),
  "/en/applications/lab-automation/guide-sample-prep/sample-prep-fluidic-valves/": () => import('@/data/applications/italian-review-child-locales/lab-automation/sample-prep-fluidic-valves.json'),
  "/en/applications/lab-automation/guide-sample-prep/sample-prep-fluidic-valves/sample-prep-switching/": () => import('@/data/applications/italian-review-child-locales/lab-automation/sample-prep-switching.json'),
  "/en/applications/lab-automation/guide-sample-prep/sample-prep-pipetting-pumps/": () => import('@/data/applications/italian-review-child-locales/lab-automation/sample-prep-pipetting-pumps.json'),
  "/en/applications/lab-automation/guide-sample-prep/sample-prep-pipetting-pumps/sample-prep-pipetting/": () => import('@/data/applications/italian-review-child-locales/lab-automation/sample-prep-pipetting.json'),
  "/en/applications/lab-automation/guide-sample-prep/sample-prep-syringe-pumps/": () => import('@/data/applications/italian-review-child-locales/lab-automation/sample-prep-syringe-pumps.json'),
  "/en/applications/lab-automation/guide-reagent-dispensing/": () => import('@/data/applications/italian-review-child-locales/lab-automation/guide-reagent-dispensing.json'),
  "/en/applications/lab-automation/guide-reagent-dispensing/reagent-dispensing-fluid-monitoring/": () => import('@/data/applications/italian-review-child-locales/lab-automation/reagent-dispensing-fluid-monitoring.json'),
  "/en/applications/lab-automation/guide-reagent-dispensing/reagent-dispensing-fluidic-connections/": () => import('@/data/applications/italian-review-child-locales/lab-automation/reagent-dispensing-fluidic-connections.json'),
  "/en/applications/lab-automation/guide-reagent-dispensing/reagent-dispensing-fluidic-valves/": () => import('@/data/applications/italian-review-child-locales/lab-automation/reagent-dispensing-fluidic-valves.json'),
  "/en/applications/lab-automation/guide-reagent-dispensing/reagent-dispensing-syringe-pumps/": () => import('@/data/applications/italian-review-child-locales/lab-automation/reagent-dispensing-syringe-pumps.json'),
  "/en/applications/lab-automation/guide-reagent-dispensing/reagent-dispensing-valveless-pumps/": () => import('@/data/applications/italian-review-child-locales/lab-automation/reagent-dispensing-valveless-pumps.json'),
  "/en/applications/lab-automation/guide-reagent-dispensing/reagent-dispensing-valveless-pumps/reagent-dispensing-repeated-filling/": () => import('@/data/applications/italian-review-child-locales/lab-automation/reagent-dispensing-repeated-filling.json'),
  "/en/applications/lab-automation/guide-pipetting/": () => import('@/data/applications/italian-review-child-locales/lab-automation/guide-pipetting.json'),
  "/en/applications/lab-automation/guide-pipetting/pipetting-air-displacement-pumps/": () => import('@/data/applications/italian-review-child-locales/lab-automation/pipetting-air-displacement-pumps.json'),
  "/en/applications/lab-automation/guide-pipetting/pipetting-air-displacement-pumps/pipetting-dispensing/": () => import('@/data/applications/italian-review-child-locales/lab-automation/pipetting-dispensing.json'),
  "/en/applications/lab-automation/guide-pipetting/pipetting-air-displacement-pumps/pipetting-single-transfer/": () => import('@/data/applications/italian-review-child-locales/lab-automation/pipetting-single-transfer.json'),
  "/en/applications/lab-automation/guide-pipetting/pipetting-fluid-monitoring/": () => import('@/data/applications/italian-review-child-locales/lab-automation/pipetting-fluid-monitoring.json'),
  "/en/applications/lab-automation/guide-pipetting/pipetting-fluidic-connections/": () => import('@/data/applications/italian-review-child-locales/lab-automation/pipetting-fluidic-connections.json'),
  "/en/applications/lab-automation/guide-pipetting/pipetting-piston-pumps/": () => import('@/data/applications/italian-review-child-locales/lab-automation/pipetting-piston-pumps.json'),
  "/en/applications/lab-automation/guide-pipetting/pipetting-probes/": () => import('@/data/applications/italian-review-child-locales/lab-automation/pipetting-probes.json'),
  "/en/applications/lab-automation/guide-pipetting/pipetting-probes/pipetting-needle-wash/": () => import('@/data/applications/italian-review-child-locales/lab-automation/pipetting-needle-wash.json'),
  "/en/applications/lab-automation/guide-pipetting/pipetting-syringe-pumps/": () => import('@/data/applications/italian-review-child-locales/lab-automation/pipetting-syringe-pumps.json'),
  "/en/applications/lab-automation/guide-microplate/": () => import('@/data/applications/italian-review-child-locales/lab-automation/guide-microplate.json'),
  "/en/applications/lab-automation/guide-microplate/microplate-diaphragm-pumps/": () => import('@/data/applications/italian-review-child-locales/lab-automation/microplate-diaphragm-pumps.json'),
  "/en/applications/lab-automation/guide-microplate/microplate-diaphragm-pumps/microplate-plate-wash/": () => import('@/data/applications/italian-review-child-locales/lab-automation/microplate-plate-wash.json'),
  "/en/applications/lab-automation/guide-microplate/microplate-fluid-monitoring/": () => import('@/data/applications/italian-review-child-locales/lab-automation/microplate-fluid-monitoring.json'),
  "/en/applications/lab-automation/guide-microplate/microplate-fluidic-connections/": () => import('@/data/applications/italian-review-child-locales/lab-automation/microplate-fluidic-connections.json'),
  "/en/applications/lab-automation/guide-microplate/microplate-fluidic-valves/": () => import('@/data/applications/italian-review-child-locales/lab-automation/microplate-fluidic-valves.json'),
  "/en/applications/lab-automation/guide-microplate/microplate-probes/": () => import('@/data/applications/italian-review-child-locales/lab-automation/microplate-probes.json'),
  "/en/applications/lab-automation/guide-microplate/microplate-syringe-pumps/": () => import('@/data/applications/italian-review-child-locales/lab-automation/microplate-syringe-pumps.json'),
  "/en/applications/lab-automation/guide-microplate/microplate-syringe-pumps/microplate-plate-dispensing/": () => import('@/data/applications/italian-review-child-locales/lab-automation/microplate-plate-dispensing.json'),
  "/en/applications/environmental-monitoring/guide-gas-pretreatment/": () => import('@/data/applications/italian-review-child-locales/environmental-monitoring/guide-gas-pretreatment.json'),
  "/en/applications/environmental-monitoring/guide-gas-pretreatment/gas-pretreatment-diaphragm-pumps/": () => import('@/data/applications/italian-review-child-locales/environmental-monitoring/gas-pretreatment-diaphragm-pumps.json'),
  "/en/applications/environmental-monitoring/guide-gas-pretreatment/gas-pretreatment-diaphragm-pumps/gas-pretreatment-absorption/": () => import('@/data/applications/italian-review-child-locales/environmental-monitoring/gas-pretreatment-absorption.json'),
  "/en/applications/environmental-monitoring/guide-gas-pretreatment/gas-pretreatment-diaphragm-pumps/gas-pretreatment-condensate/": () => import('@/data/applications/italian-review-child-locales/environmental-monitoring/gas-pretreatment-condensate.json'),
  "/en/applications/environmental-monitoring/guide-gas-pretreatment/gas-pretreatment-fluidic-connections/": () => import('@/data/applications/italian-review-child-locales/environmental-monitoring/gas-pretreatment-fluidic-connections.json'),
  "/en/applications/environmental-monitoring/guide-gas-pretreatment/gas-pretreatment-fluidic-connections/gas-pretreatment-protection/": () => import('@/data/applications/italian-review-child-locales/environmental-monitoring/gas-pretreatment-protection.json'),
  "/en/applications/environmental-monitoring/guide-gas-pretreatment/gas-pretreatment-fluidic-valves/": () => import('@/data/applications/italian-review-child-locales/environmental-monitoring/gas-pretreatment-fluidic-valves.json'),
  "/en/applications/environmental-monitoring/guide-gas-pretreatment/gas-pretreatment-fluidic-valves/gas-pretreatment-tube-control/": () => import('@/data/applications/italian-review-child-locales/environmental-monitoring/gas-pretreatment-tube-control.json'),
  "/en/applications/environmental-monitoring/guide-sampling-prep/": () => import('@/data/applications/italian-review-child-locales/environmental-monitoring/guide-sampling-prep.json'),
  "/en/applications/environmental-monitoring/guide-sampling-prep/sampling-prep-fluidic-connections/": () => import('@/data/applications/italian-review-child-locales/environmental-monitoring/sampling-prep-fluidic-connections.json'),
  "/en/applications/environmental-monitoring/guide-sampling-prep/sampling-prep-fluidic-connections/sampling-prep-filtration/": () => import('@/data/applications/italian-review-child-locales/environmental-monitoring/sampling-prep-filtration.json'),
  "/en/applications/environmental-monitoring/guide-sampling-prep/sampling-prep-fluidic-connections/sampling-prep-waste/": () => import('@/data/applications/italian-review-child-locales/environmental-monitoring/sampling-prep-waste.json'),
  "/en/applications/environmental-monitoring/guide-sampling-prep/sampling-prep-fluidic-valves/": () => import('@/data/applications/italian-review-child-locales/environmental-monitoring/sampling-prep-fluidic-valves.json'),
  "/en/applications/environmental-monitoring/guide-sampling-prep/sampling-prep-pipetting-pumps/": () => import('@/data/applications/italian-review-child-locales/environmental-monitoring/sampling-prep-pipetting-pumps.json'),
  "/en/applications/environmental-monitoring/guide-sampling-prep/sampling-prep-pipetting-pumps/sampling-prep-transfer/": () => import('@/data/applications/italian-review-child-locales/environmental-monitoring/sampling-prep-transfer.json'),
  "/en/applications/environmental-monitoring/guide-sampling-prep/sampling-prep-syringe-pumps/": () => import('@/data/applications/italian-review-child-locales/environmental-monitoring/sampling-prep-syringe-pumps.json'),
  "/en/applications/environmental-monitoring/guide-sampling-prep/sampling-prep-syringe-pumps/sampling-prep-dilution/": () => import('@/data/applications/italian-review-child-locales/environmental-monitoring/sampling-prep-dilution.json'),
  "/en/applications/environmental-monitoring/guide-system-integration/": () => import('@/data/applications/italian-review-child-locales/environmental-monitoring/guide-system-integration.json'),
  "/en/applications/environmental-monitoring/guide-system-integration/system-integration-diaphragm-pumps/": () => import('@/data/applications/italian-review-child-locales/environmental-monitoring/system-integration-diaphragm-pumps.json'),
  "/en/applications/environmental-monitoring/guide-system-integration/system-integration-fluid-monitoring/": () => import('@/data/applications/italian-review-child-locales/environmental-monitoring/system-integration-fluid-monitoring.json'),
  "/en/applications/environmental-monitoring/guide-system-integration/system-integration-fluidic-connections/": () => import('@/data/applications/italian-review-child-locales/environmental-monitoring/system-integration-fluidic-connections.json'),
  "/en/applications/environmental-monitoring/guide-system-integration/system-integration-fluidic-valves/": () => import('@/data/applications/italian-review-child-locales/environmental-monitoring/system-integration-fluidic-valves.json'),
  "/en/applications/environmental-monitoring/guide-system-integration/system-integration-fluidic-valves/system-integration-path-management/": () => import('@/data/applications/italian-review-child-locales/environmental-monitoring/system-integration-path-management.json'),
  "/en/applications/environmental-monitoring/guide-wastewater/": () => import('@/data/applications/italian-review-child-locales/environmental-monitoring/guide-wastewater.json'),
  "/en/applications/environmental-monitoring/guide-wastewater/wastewater-diaphragm-pumps/": () => import('@/data/applications/italian-review-child-locales/environmental-monitoring/wastewater-diaphragm-pumps.json'),
  "/en/applications/environmental-monitoring/guide-wastewater/wastewater-diaphragm-pumps/wastewater-drainage/": () => import('@/data/applications/italian-review-child-locales/environmental-monitoring/wastewater-drainage.json'),
  "/en/applications/environmental-monitoring/guide-wastewater/wastewater-diaphragm-pumps/wastewater-sampling/": () => import('@/data/applications/italian-review-child-locales/environmental-monitoring/wastewater-sampling.json'),
  "/en/applications/environmental-monitoring/guide-wastewater/wastewater-fluid-monitoring/": () => import('@/data/applications/italian-review-child-locales/environmental-monitoring/wastewater-fluid-monitoring.json'),
  "/en/applications/environmental-monitoring/guide-wastewater/wastewater-fluidic-connections/": () => import('@/data/applications/italian-review-child-locales/environmental-monitoring/wastewater-fluidic-connections.json'),
  "/en/applications/environmental-monitoring/guide-wastewater/wastewater-fluidic-connections/wastewater-filtration/": () => import('@/data/applications/italian-review-child-locales/environmental-monitoring/wastewater-filtration.json'),
  "/en/applications/environmental-monitoring/guide-wastewater/wastewater-fluidic-valves/": () => import('@/data/applications/italian-review-child-locales/environmental-monitoring/wastewater-fluidic-valves.json'),
  "/en/applications/environmental-monitoring/guide-water-quality/": () => import('@/data/applications/italian-review-child-locales/environmental-monitoring/guide-water-quality.json'),
  "/en/applications/environmental-monitoring/guide-water-quality/water-quality-diaphragm-pumps/": () => import('@/data/applications/italian-review-child-locales/environmental-monitoring/water-quality-diaphragm-pumps.json'),
  "/en/applications/environmental-monitoring/guide-water-quality/water-quality-diaphragm-pumps/water-quality-reagent/": () => import('@/data/applications/italian-review-child-locales/environmental-monitoring/water-quality-reagent.json'),
  "/en/applications/environmental-monitoring/guide-water-quality/water-quality-diaphragm-pumps/water-quality-sampling/": () => import('@/data/applications/italian-review-child-locales/environmental-monitoring/water-quality-sampling.json'),
  "/en/applications/environmental-monitoring/guide-water-quality/water-quality-diaphragm-pumps/water-quality-wash-waste/": () => import('@/data/applications/italian-review-child-locales/environmental-monitoring/water-quality-wash-waste.json'),
  "/en/applications/environmental-monitoring/guide-water-quality/water-quality-fluid-monitoring/": () => import('@/data/applications/italian-review-child-locales/environmental-monitoring/water-quality-fluid-monitoring.json'),
  "/en/applications/environmental-monitoring/guide-water-quality/water-quality-fluidic-connections/": () => import('@/data/applications/italian-review-child-locales/environmental-monitoring/water-quality-fluidic-connections.json'),
  "/en/applications/environmental-monitoring/guide-water-quality/water-quality-fluidic-connections/water-quality-protection/": () => import('@/data/applications/italian-review-child-locales/environmental-monitoring/water-quality-protection.json'),
  "/en/applications/environmental-monitoring/guide-water-quality/water-quality-fluidic-valves/": () => import('@/data/applications/italian-review-child-locales/environmental-monitoring/water-quality-fluidic-valves.json'),
  "/en/applications/environmental-monitoring/guide-water-quality/water-quality-fluidic-valves/water-quality-reaction/": () => import('@/data/applications/italian-review-child-locales/environmental-monitoring/water-quality-reaction.json'),
  "/en/applications/analytical-instruments/valveless-pump/": () => import('@/data/applications/italian-review-child-locales/analytical-instruments/valveless-pump.json'),
  "/en/applications/analytical-instruments/valveless-pump/valveless-continuous/": () => import('@/data/applications/italian-review-child-locales/analytical-instruments/valveless-continuous.json'),
  "/en/applications/analytical-instruments/valveless-pump/valveless-dispensing/": () => import('@/data/applications/italian-review-child-locales/analytical-instruments/valveless-dispensing.json'),
  "/en/applications/analytical-instruments/valveless-pump/valveless-proportion/": () => import('@/data/applications/italian-review-child-locales/analytical-instruments/valveless-proportion.json'),
  "/en/applications/analytical-instruments/valveless-pump/valveless-titration/": () => import('@/data/applications/italian-review-child-locales/analytical-instruments/valveless-titration.json'),
  "/en/applications/analytical-instruments/valves/": () => import('@/data/applications/italian-review-child-locales/analytical-instruments/valves.json'),
  "/en/applications/analytical-instruments/valves/valve-diversion/": () => import('@/data/applications/italian-review-child-locales/analytical-instruments/valve-diversion.json'),
  "/en/applications/analytical-instruments/valves/valve-high-pressure/": () => import('@/data/applications/italian-review-child-locales/analytical-instruments/valve-high-pressure.json'),
  "/en/applications/analytical-instruments/valves/valve-multiport/": () => import('@/data/applications/italian-review-child-locales/analytical-instruments/valve-multiport.json'),
  "/en/applications/analytical-instruments/valves/valve-solenoid/": () => import('@/data/applications/italian-review-child-locales/analytical-instruments/valve-solenoid.json'),
  "/en/applications/analytical-instruments/probes/": () => import('@/data/applications/italian-review-child-locales/analytical-instruments/probes.json'),
  "/en/applications/analytical-instruments/probes/probe-mixing/": () => import('@/data/applications/italian-review-child-locales/analytical-instruments/probe-mixing.json'),
  "/en/applications/analytical-instruments/probes/probe-sampling/": () => import('@/data/applications/italian-review-child-locales/analytical-instruments/probe-sampling.json'),
  "/en/applications/analytical-instruments/probes/probe-vessel-washing/": () => import('@/data/applications/italian-review-child-locales/analytical-instruments/probe-vessel-washing.json'),
  "/en/applications/analytical-instruments/probes/probe-washing/": () => import('@/data/applications/italian-review-child-locales/analytical-instruments/probe-washing.json'),
  "/en/applications/analytical-instruments/pipetting-pump/": () => import('@/data/applications/italian-review-child-locales/analytical-instruments/pipetting-pump.json'),
  "/en/applications/analytical-instruments/pipetting-pump/pipette-dilution/": () => import('@/data/applications/italian-review-child-locales/analytical-instruments/pipette-dilution.json'),
  "/en/applications/analytical-instruments/pipetting-pump/pipette-preparation/": () => import('@/data/applications/italian-review-child-locales/analytical-instruments/pipette-preparation.json'),
  "/en/applications/analytical-instruments/pipetting-pump/pipette-transfer/": () => import('@/data/applications/italian-review-child-locales/analytical-instruments/pipette-transfer.json'),
  "/en/applications/analytical-instruments/monitoring/": () => import('@/data/applications/italian-review-child-locales/analytical-instruments/monitoring.json'),
  "/en/applications/analytical-instruments/monitoring/monitor-bubble/": () => import('@/data/applications/italian-review-child-locales/analytical-instruments/monitor-bubble.json'),
  "/en/applications/analytical-instruments/monitoring/monitor-pressure/": () => import('@/data/applications/italian-review-child-locales/analytical-instruments/monitor-pressure.json'),
  "/en/applications/analytical-instruments/syringe-pump/": () => import('@/data/applications/italian-review-child-locales/analytical-instruments/syringe-pump.json'),
  "/en/applications/analytical-instruments/syringe-pump/syringe-dilution/": () => import('@/data/applications/italian-review-child-locales/analytical-instruments/syringe-dilution.json'),
  "/en/applications/analytical-instruments/syringe-pump/syringe-distribution/": () => import('@/data/applications/italian-review-child-locales/analytical-instruments/syringe-distribution.json'),
  "/en/applications/analytical-instruments/syringe-pump/syringe-sampling/": () => import('@/data/applications/italian-review-child-locales/analytical-instruments/syringe-sampling.json'),
  "/en/applications/analytical-instruments/syringe-pump/syringe-sequential/": () => import('@/data/applications/italian-review-child-locales/analytical-instruments/syringe-sequential.json'),
  "/en/applications/analytical-instruments/piston-pump/": () => import('@/data/applications/italian-review-child-locales/analytical-instruments/piston-pump.json'),
  "/en/applications/analytical-instruments/piston-pump/piston-dilution/": () => import('@/data/applications/italian-review-child-locales/analytical-instruments/piston-dilution.json'),
  "/en/applications/analytical-instruments/piston-pump/piston-titration/": () => import('@/data/applications/italian-review-child-locales/analytical-instruments/piston-titration.json'),
  "/en/applications/analytical-instruments/fluidics/": () => import('@/data/applications/italian-review-child-locales/analytical-instruments/fluidics.json'),
  "/en/applications/analytical-instruments/fluidics/fluidics-fittings/": () => import('@/data/applications/italian-review-child-locales/analytical-instruments/fluidics-fittings.json'),
  "/en/applications/analytical-instruments/fluidics/fluidics-protection/": () => import('@/data/applications/italian-review-child-locales/analytical-instruments/fluidics-protection.json'),
  "/en/applications/analytical-instruments/fluidics/fluidics-tubing/": () => import('@/data/applications/italian-review-child-locales/analytical-instruments/fluidics-tubing.json'),
  "/en/applications/analytical-instruments/diaphragm-pump/diaphragm-circulation/": () => import('@/data/applications/italian-review-child-locales/analytical-instruments/diaphragm-circulation.json'),
  "/en/applications/analytical-instruments/diaphragm-pump/diaphragm-gas-liquid/": () => import('@/data/applications/italian-review-child-locales/analytical-instruments/diaphragm-gas-liquid.json'),
  "/en/applications/analytical-instruments/diaphragm-pump/diaphragm-liquid/": () => import('@/data/applications/italian-review-child-locales/analytical-instruments/diaphragm-liquid.json'),
  "/en/applications/analytical-instruments/diaphragm-pump/diaphragm-replenishment/": () => import('@/data/applications/italian-review-child-locales/analytical-instruments/diaphragm-replenishment.json'),
  "/en/applications/analytical-instruments/diaphragm-pump/": () => import('@/data/applications/italian-review-child-locales/analytical-instruments/diaphragm-pump.json'),
  "/en/applications/analytical-instruments/guide-water-quality/": () => import('@/data/applications/italian-review-child-locales/analytical-instruments/guide-water-quality.json'),
  "/en/applications/analytical-instruments/guide-water-quality/water-quality-diaphragm-pumps/": () => import('@/data/applications/italian-review-child-locales/analytical-instruments/water-quality-diaphragm-pumps.json'),
  "/en/applications/analytical-instruments/guide-water-quality/water-quality-fluid-monitoring/": () => import('@/data/applications/italian-review-child-locales/analytical-instruments/water-quality-fluid-monitoring.json'),
  "/en/applications/analytical-instruments/guide-water-quality/water-quality-fluidic-connections/": () => import('@/data/applications/italian-review-child-locales/analytical-instruments/water-quality-fluidic-connections.json'),
  "/en/applications/analytical-instruments/guide-water-quality/water-quality-fluidic-connections/water-quality-protection/": () => import('@/data/applications/italian-review-child-locales/analytical-instruments/water-quality-protection.json'),
  "/en/applications/analytical-instruments/guide-water-quality/water-quality-fluidic-valves/": () => import('@/data/applications/italian-review-child-locales/analytical-instruments/water-quality-fluidic-valves.json'),
  "/en/applications/analytical-instruments/guide-water-quality/water-quality-piston-pumps/": () => import('@/data/applications/italian-review-child-locales/analytical-instruments/water-quality-piston-pumps.json'),
  "/en/applications/analytical-instruments/guide-water-quality/water-quality-piston-pumps/water-quality-reagent/": () => import('@/data/applications/italian-review-child-locales/analytical-instruments/water-quality-reagent.json'),
  "/en/applications/analytical-instruments/guide-water-quality/water-quality-piston-pumps/water-quality-sampling/": () => import('@/data/applications/italian-review-child-locales/analytical-instruments/water-quality-sampling.json'),
  "/en/applications/analytical-instruments/guide-water-quality/water-quality-syringe-pumps/": () => import('@/data/applications/italian-review-child-locales/analytical-instruments/water-quality-syringe-pumps.json'),
  "/en/applications/analytical-instruments/guide-spectroscopy/": () => import('@/data/applications/italian-review-child-locales/analytical-instruments/guide-spectroscopy.json'),
  "/en/applications/analytical-instruments/guide-spectroscopy/spectroscopy-fluid-monitoring/": () => import('@/data/applications/italian-review-child-locales/analytical-instruments/spectroscopy-fluid-monitoring.json'),
  "/en/applications/analytical-instruments/guide-spectroscopy/spectroscopy-fluidic-connections/": () => import('@/data/applications/italian-review-child-locales/analytical-instruments/spectroscopy-fluidic-connections.json'),
  "/en/applications/analytical-instruments/guide-spectroscopy/spectroscopy-fluidic-valves/": () => import('@/data/applications/italian-review-child-locales/analytical-instruments/spectroscopy-fluidic-valves.json'),
  "/en/applications/analytical-instruments/guide-spectroscopy/spectroscopy-fluidic-valves/spectroscopy-switching/": () => import('@/data/applications/italian-review-child-locales/analytical-instruments/spectroscopy-switching.json'),
  "/en/applications/analytical-instruments/guide-spectroscopy/spectroscopy-probes/": () => import('@/data/applications/italian-review-child-locales/analytical-instruments/spectroscopy-probes.json'),
  "/en/applications/analytical-instruments/guide-spectroscopy/spectroscopy-syringe-pumps/": () => import('@/data/applications/italian-review-child-locales/analytical-instruments/spectroscopy-syringe-pumps.json'),
  "/en/applications/analytical-instruments/guide-spectroscopy/spectroscopy-syringe-pumps/spectroscopy-reagent/": () => import('@/data/applications/italian-review-child-locales/analytical-instruments/spectroscopy-reagent.json'),
  "/en/applications/analytical-instruments/guide-spectroscopy/spectroscopy-syringe-pumps/spectroscopy-sampling/": () => import('@/data/applications/italian-review-child-locales/analytical-instruments/spectroscopy-sampling.json'),
  "/en/applications/analytical-instruments/guide-spectroscopy/spectroscopy-valveless-pumps/": () => import('@/data/applications/italian-review-child-locales/analytical-instruments/spectroscopy-valveless-pumps.json'),
  "/en/applications/analytical-instruments/guide-sample-prep/sample-prep-fluidic-connections/": () => import('@/data/applications/italian-review-child-locales/analytical-instruments/sample-prep-fluidic-connections.json'),
  "/en/applications/analytical-instruments/guide-sample-prep/sample-prep-fluidic-connections/sample-prep-filtration/": () => import('@/data/applications/italian-review-child-locales/analytical-instruments/sample-prep-filtration.json'),
  "/en/applications/analytical-instruments/guide-sample-prep/sample-prep-fluidic-valves/": () => import('@/data/applications/italian-review-child-locales/analytical-instruments/sample-prep-fluidic-valves.json'),
  "/en/applications/analytical-instruments/guide-sample-prep/sample-prep-pipetting-pumps/": () => import('@/data/applications/italian-review-child-locales/analytical-instruments/sample-prep-pipetting-pumps.json'),
  "/en/applications/analytical-instruments/guide-sample-prep/sample-prep-pipetting-pumps/sample-prep-extraction/": () => import('@/data/applications/italian-review-child-locales/analytical-instruments/sample-prep-extraction.json'),
  "/en/applications/analytical-instruments/guide-sample-prep/sample-prep-syringe-pumps/": () => import('@/data/applications/italian-review-child-locales/analytical-instruments/sample-prep-syringe-pumps.json'),
  "/en/applications/analytical-instruments/guide-sample-prep/sample-prep-syringe-pumps/sample-prep-dilution/": () => import('@/data/applications/italian-review-child-locales/analytical-instruments/sample-prep-dilution.json'),
  "/en/applications/analytical-instruments/guide-sample-prep/": () => import('@/data/applications/italian-review-child-locales/analytical-instruments/guide-sample-prep.json'),
  "/en/applications/analytical-instruments/guide-lab-analyzer/lab-analyzer-fluid-monitoring/": () => import('@/data/applications/italian-review-child-locales/analytical-instruments/lab-analyzer-fluid-monitoring.json'),
  "/en/applications/analytical-instruments/guide-lab-analyzer/lab-analyzer-fluidic-connections/": () => import('@/data/applications/italian-review-child-locales/analytical-instruments/lab-analyzer-fluidic-connections.json'),
  "/en/applications/analytical-instruments/guide-lab-analyzer/lab-analyzer-fluidic-valves/": () => import('@/data/applications/italian-review-child-locales/analytical-instruments/lab-analyzer-fluidic-valves.json'),
  "/en/applications/analytical-instruments/guide-lab-analyzer/lab-analyzer-fluidic-valves/lab-analyzer-path-management/": () => import('@/data/applications/italian-review-child-locales/analytical-instruments/lab-analyzer-path-management.json'),
  "/en/applications/analytical-instruments/guide-lab-analyzer/lab-analyzer-diaphragm-pumps/": () => import('@/data/applications/italian-review-child-locales/analytical-instruments/lab-analyzer-diaphragm-pumps.json'),
  "/en/applications/analytical-instruments/guide-lab-analyzer/lab-analyzer-piston-pumps/": () => import('@/data/applications/italian-review-child-locales/analytical-instruments/lab-analyzer-piston-pumps.json'),
  "/en/applications/analytical-instruments/guide-lab-analyzer/lab-analyzer-syringe-pumps/": () => import('@/data/applications/italian-review-child-locales/analytical-instruments/lab-analyzer-syringe-pumps.json'),
  "/en/applications/analytical-instruments/guide-lab-analyzer/lab-analyzer-valveless-pumps/": () => import('@/data/applications/italian-review-child-locales/analytical-instruments/lab-analyzer-valveless-pumps.json'),
  "/en/applications/analytical-instruments/guide-lab-analyzer/": () => import('@/data/applications/italian-review-child-locales/analytical-instruments/guide-lab-analyzer.json'),
  "/en/applications/analytical-instruments/liquid-chromatography/lc-post-column-valveless-pumps/": () => import('@/data/applications/italian-review-child-locales/analytical-instruments/lc-post-column-valveless-pumps.json'),
  "/en/applications/analytical-instruments/liquid-chromatography/lc-post-column-valveless-pumps/lc-derivatization-reagent-dosing/": () => import('@/data/applications/italian-review-child-locales/analytical-instruments/lc-derivatization-reagent-dosing.json'),
  "/en/applications/analytical-instruments/liquid-chromatography/lc-needle-wash-diaphragm-pumps/lc-needle-wash-supply/": () => import('@/data/applications/italian-review-child-locales/analytical-instruments/lc-needle-wash-supply.json'),
  "/en/applications/analytical-instruments/liquid-chromatography/lc-needle-wash-diaphragm-pumps/lc-waste-aspiration/": () => import('@/data/applications/italian-review-child-locales/analytical-instruments/lc-waste-aspiration.json'),
  "/en/applications/analytical-instruments/liquid-chromatography/lc-needle-wash-diaphragm-pumps/": () => import('@/data/applications/italian-review-child-locales/analytical-instruments/lc-needle-wash-diaphragm-pumps.json'),
  "/en/applications/analytical-instruments/liquid-chromatography/lc-autosampler-piston-pumps/lc-sample-metering/": () => import('@/data/applications/italian-review-child-locales/analytical-instruments/lc-sample-metering.json'),
  "/en/applications/analytical-instruments/liquid-chromatography/lc-autosampler-piston-pumps/lc-sample-loop-loading/": () => import('@/data/applications/italian-review-child-locales/analytical-instruments/lc-sample-loop-loading.json'),
  "/en/applications/analytical-instruments/liquid-chromatography/lc-autosampler-piston-pumps/": () => import('@/data/applications/italian-review-child-locales/analytical-instruments/lc-autosampler-piston-pumps.json'),
  "/en/applications/analytical-instruments/liquid-chromatography/": () => import('@/data/applications/italian-review-child-locales/analytical-instruments/liquid-chromatography.json'),
};

function isItalianReviewChild(route: ApplicationRoute) {
  return Boolean(italianChildApplicationLoaders[route.path]) &&
    isLocalizedItalianDraftPath(getDraftHrefForEnglish(route.path, 'it'));
}

export function getItalianChildApplicationStaticParams(kind: EnglishApplicationKind) {
  return applicationRoutes.filter(route => route.kind === kind && isItalianReviewChild(route))
    .map(route => ({ locale: 'it', segments: route.path.split('/').filter(Boolean).slice(3) }));
}

export async function getItalianChildApplicationCopy(route: ApplicationRoute) {
  if (!isItalianReviewChild(route)) return undefined;
  return (await italianChildApplicationLoaders[route.path]?.())?.default;
}

export const italianApplicationLabels = {
  onThisPage: 'In questa pagina',
  references: 'Riferimenti',
  viewReferences: 'Visualizza i riferimenti',
  related: 'Guide correlate',
  sources: 'Fonti',
  reference: 'Riferimento',
};

const textFields = new Set([
  'title', 'navLabel', 'seoTitle', 'description', 'eyebrow', 'label', 'text', 'caption', 'note',
  'tocLabel', 'viewDetails', 'alt', 'highlight', 'headers', 'nodes', 'keywords', 'items', 'rows',
  'buttonLabel', 'imageAlt', 'summary', 'absolute',
]);

export function translateItalianApplication<T>(value: T, copy: ItalianApplicationCopy, field = ''): T {
  if (typeof value === 'string') {
    return ((!field || textFields.has(field)) && Object.hasOwn(copy, value) ? copy[value] : value) as T;
  }
  if (Array.isArray(value)) return value.map(item => translateItalianApplication(item, copy, field)) as T;
  if (!value || typeof value !== 'object' || field === 'references') return value;
  const translated = Object.fromEntries(Object.entries(value).map(([key, item]) => [
    key, translateItalianApplication(item, copy, key),
  ]));
  if (typeof translated.href !== 'string') return translated as T;
  const target = getItalianDraftLink(resolveApplicationHref(translated.href));
  if (target.hrefLang === 'en') {
    if (typeof translated.label === 'string') translated.label += italianEnglishFallbackSuffix;
    else if (typeof translated.text === 'string') translated.title = (translated.title || translated.text) + italianEnglishFallbackSuffix;
    else if (typeof translated.buttonLabel === 'string') translated.buttonLabel += italianEnglishFallbackSuffix;
  }
  return { ...translated, href: target.href, hrefLang: target.hrefLang } as T;
}

export function localizeItalianApplicationDocument(document: ApplicationDocument, copy: ItalianApplicationCopy): ApplicationDocument {
  return {
    ...translateItalianApplication(document, copy),
    references: document.references.map(reference => {
      const title = copy[reference.title] ?? reference.title;
      if (!reference.href.startsWith('/en/')) return { ...reference, title };
      const target = getItalianDraftLink(resolveApplicationHref(reference.href));
      return {
        ...reference,
        title: title + (target.hrefLang === 'en' ? italianEnglishFallbackSuffix : ''),
        href: target.href,
        hrefLang: target.hrefLang,
      };
    }),
  };
}

export function italianApplicationMetadata(source: Metadata, copy: ItalianApplicationCopy, englishHref: string): Metadata {
  const localized = translateItalianApplication(source, copy);
  const canonical = getCanonicalUrl(getDraftHrefForEnglish(englishHref, 'it'));
  return {
    ...localized,
    robots: { index: false, follow: true },
    alternates: { canonical },
    openGraph: localized.openGraph ? { ...localized.openGraph, url: canonical, locale: 'it_IT' } : undefined,
  };
}

export function getItalianApplicationSchema(
  document: ApplicationDocument,
  href: string,
  breadcrumbs: readonly { label: string; href?: string }[],
) {
  const schema = getEnglishApplicationSchema(document, href, breadcrumbs);
  return { ...schema, '@graph': schema['@graph'].map((entry, index) => (
    index === 0 ? { ...entry, inLanguage: 'it-IT' } : entry
  )) };
}

export function getItalianReviewResources(resources: RelatedResourcesData, copy: ItalianApplicationCopy): RelatedResourcesData {
  return {
    ...resources,
    uiLocale: 'it',
    videoLocale: 'it',
    videoLibraryHref: getItalianDraftLink('/en/resources/installation-guide/').href,
    products: resources.products.map(product => {
      const target = getItalianDraftLink(product.href);
      const title = translateItalianApplication(product.title, copy);
      const imageAlt = translateItalianApplication(product.imageAlt, copy);
      return { ...product, title, imageAlt, href: target.href, destinationLanguage: target.hrefLang };
    }),
    articles: resources.articles.map(article => {
      const target = getItalianDraftLink(article.href ?? '/en/resources/technical-articles/' + article.slug + '/');
      const title = copy[article.title] ?? italianIvdRelatedTitles[article.title] ?? article.title;
      const summary = copy[article.summary] ?? italianIvdArticleDescriptions[article.summary] ?? article.summary;
      return {
        ...article,
        title,
        summary,
        href: target.href,
        destinationLanguage: target.hrefLang,
        contentLanguage: title === article.title ? 'en' : 'it',
      };
    }),
    videos: resources.videos.map(guide => ({
      ...guide,
      ...italianIvdVideoCopy[guide.id],
      detailHref: guide.detailHref ? getItalianDraftLink(guide.detailHref).href : undefined,
    })),
  };
}
