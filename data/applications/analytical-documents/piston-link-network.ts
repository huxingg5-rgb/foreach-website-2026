import { analyticalDocumentHref } from "./registry";
import type { ApplicationLink } from "./types";

export const PISTON_APPLICATION_RELATION_KEYS = [
  "series:ea",
  "series:sm",
  "series:tm",
] as const;

export const PISTON_APPLICATION_GUIDES = [
  {
    label: "Piston-pump application overview",
    href: analyticalDocumentHref("piston-pump"),
  },
  {
    label: "Sample aspiration and transfer",
    href: analyticalDocumentHref("piston-sample-transfer"),
  },
  {
    label: "Reagent and standard dispensing",
    href: analyticalDocumentHref("piston-reagent-dispensing"),
  },
  {
    label: "Dilution, spiking and proportioning",
    href: analyticalDocumentHref("piston-dilution"),
  },
  {
    label: "Incremental titrant dosing",
    href: analyticalDocumentHref("piston-titration"),
  },
] as const satisfies readonly ApplicationLink[];

export const PISTON_PRODUCT_LINKS = {
  category: "/en/products/pumps/piston-pump/",
  eaSeries: "/en/products/pumps/piston-pump/standard-piston-pump/",
  smSeries: "/en/products/pumps/piston-pump/miniature-piston-pump/",
  tmSeries: "/en/products/pumps/piston-pump/ultra-compact-piston-pump/",
  ea100Peek: "/en/products/pumps/piston-pump/ea-100-peek/",
  ea2500Peek: "/en/products/pumps/piston-pump/ea-2500-peek/",
  sm100Pmma: "/en/products/pumps/piston-pump/sm-100-pmma/",
  tm100Pmma: "/en/products/pumps/piston-pump/tm-100-pmma/",
} as const;

export const PISTON_TECHNICAL_ARTICLE_LINKS = {
  selection: "/en/resources/technical-articles/micro-plunger-pump-selection/",
  accuracy:
    "/en/resources/technical-articles/piston-pump-accuracy-repeatability-resolution/",
  materials:
    "/en/resources/technical-articles/piston-pump-head-material-selection/",
  bubbles:
    "/en/resources/technical-articles/piston-pump-air-bubbles-dispensing-error/",
  viscosity:
    "/en/resources/technical-articles/piston-pump-viscous-liquid-aspiration-speed/",
  drift:
    "/en/resources/technical-articles/piston-pump-dispensing-drift-diagnosis/",
  backlash:
    "/en/resources/technical-articles/precision-piston-pump-backlash-compensation/",
  acceleration:
    "/en/resources/technical-articles/piston-pump-acceleration-deceleration-curves/",
} as const;

const pistonApplicationSlugs = new Set(
  PISTON_APPLICATION_GUIDES.map(({ href }) => href.split("/").filter(Boolean).at(-1)),
);

export function isPistonApplicationSlug(slug: string) {
  return pistonApplicationSlugs.has(slug);
}
