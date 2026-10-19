import { applicationDocumentHref } from "@/data/applications/application-routes";
import type { ProductApplicationsContent } from "@/data/products/detail/product-detail.types";
import { PISTON_APPLICATION_GUIDES } from "@/data/applications/analytical-documents/piston-link-network";

type ApplicationGuides = NonNullable<ProductApplicationsContent["relatedGuides"]>;

const analyticalGuide = (slug: string, label: string) => ({
  label,
  href: applicationDocumentHref("analytical-instruments", slug),
});

const syringeSampling = analyticalGuide("syringe-sampling", "Sample aspiration, source identity and delivered volume");
const syringeDilution = analyticalGuide("syringe-dilution", "Standard preparation and over-range sample dilution");
const sequentialAnalysis = analyticalGuide("syringe-sequential", "Sequential injection: liquid segments and source-switching order");

// Exact English routes keep these additions separate from other models, series
// and locales. Each destination describes a duty supported by the named product.
const guidesByProductPath: Readonly<Record<string, ApplicationGuides>> = {
  "/en/products/pumps/piston-pump/": {
    title: "Application guides",
    links: PISTON_APPLICATION_GUIDES,
  },
  "/en/products/pumps/syringe-pumps/": {
    title: "Application guides",
    links: [
      analyticalGuide("syringe-pump", "Compare syringe-pump duties and configurations"),
      syringeSampling,
      analyticalGuide("syringe-distribution", "Multichannel reagent distribution and refill planning"),
      syringeDilution,
      sequentialAnalysis,
    ],
  },
  "/en/products/valves/rotary-valves/": {
    title: "Application guides",
    links: [
      analyticalGuide("valves", "Compare source selection, injection and isolation duties"),
      analyticalGuide("valve-multiport", "MRV3 source selection: port maps and shared-path carryover"),
      sequentialAnalysis,
    ],
  },
  "/en/products/pumps/pipetting-pumps/": {
    title: "Application guides",
    links: [
      analyticalGuide("pipetting-pump", "Air-displacement pipetting: tips, liquid classes and deck geometry"),
      analyticalGuide("pipette-transfer", "Disposable-tip sample aspiration and transfer"),
      analyticalGuide("pipette-dilution", "Tip-based dilution and aliquot distribution"),
      analyticalGuide("pipette-preparation", "Sample preparation: wash addition and target-phase recovery"),
    ],
  },
  "/en/products/pumps/syringe-pumps/rotary-valve-syringe-pumps/hld3/": {
    title: "Application guides for HLD3",
    links: [syringeSampling, syringeDilution, sequentialAnalysis],
  },
  "/en/products/pumps/miniature-diaphragm-pumps/dpl30-liquid-diaphragm-pump/": {
    title: "Application guides for DPL30 liquid transfer",
    links: [
      analyticalGuide("lc-needle-wash-supply", "LC needle-wash liquid supply and carryover verification"),
      analyticalGuide("diaphragm-liquid", "Wash-liquid delivery and priming at installed resistance"),
      analyticalGuide("diaphragm-replenishment", "Working-liquid replenishment and reservoir recovery"),
    ],
  },
  "/en/products/valves/high-pressure-valves/hp/": {
    title: "Application guides for HP sample-loop injection",
    links: [
      analyticalGuide("valve-high-pressure", "Sample-loop loading, injection states and pressure isolation"),
      analyticalGuide("lc-sample-loop-loading", "Coordinate autosampler metering with sample-loop loading"),
    ],
  },
};

export function getEnglishProductApplicationGuides(pathname: string | null | undefined): ApplicationGuides | undefined {
  if (!pathname?.startsWith("/en/products/")) return undefined;
  return guidesByProductPath[pathname.endsWith("/") ? pathname : `${pathname}/`];
}
