import { germanChildApplicationDraftPaths, germanApplicationHubDraftPaths, germanInkjetChildDraftPaths, germanIvdDraftPaths } from "./german-application-draft-paths";
import { germanResourceDraftPaths, isResourcePath } from "./german-resource-draft-paths";
import { italianLocalizedDraftPaths } from "./italian-draft-paths";
import { hindiLocalizedDraftPaths } from "./hindi-draft-paths";
import { solenoidPageConfigurations } from "../../data/products/detail/solenoid-configurations";
import { tubingMaterials } from "../../data/products/selection/tubing-selection-routes";

import { draftLanguages, type DraftLocale } from "./draft-language-identifiers";
import { publishedTranslationBuild } from "./published-translations";

export { draftLanguages, type DraftLocale } from "./draft-language-identifiers";

export const germanFixedDraftPaths = [
  "/",
  "/about/foreach/",
  "/about/research-manufacturing/",
  "/about/quality/",
  "/about/history/",
  "/about/culture/",
  "/contact/",
  "/contact/distributor/",
  "/privacy-policy/",
] as const;

export const germanBarbedDetailPath = "/products/fittings/barbed-fittings/ba-16f-pp-n/";
export const germanHardTubeDetailPath = "/products/fittings/hard-tube-fittings/hfl-m6-16-pv-n/";

export const germanLocalizedProductSelectionPaths: readonly string[] = [
  "/products/pumps/",
  "/products/pumps/piston-pump/",
  "/products/pumps/piston-pump/standard-piston-pump/",
  "/products/pumps/piston-pump/miniature-piston-pump/",
  "/products/pumps/piston-pump/ultra-compact-piston-pump/",
  "/products/pumps/syringe-pumps/",
  "/products/pumps/pipetting-pumps/",
  "/products/pumps/pipetting-pumps/smtp2-programmable-pipetting-module/",
  "/products/pumps/pipetting-pumps/smtp4-pipetting-module/",
  "/products/pumps/syringe-pumps/solenoid-valve-syringe-pumps/",
  "/products/pumps/syringe-pumps/rotary-valve-syringe-pumps/",
  "/products/pumps/valveless-metering-pump/",
  "/products/pumps/valveless-metering-pump/rpl/",
  "/products/pumps/valveless-metering-pump/drpl/",
  "/products/pumps/miniature-diaphragm-pumps/",
  "/products/pumps/miniature-diaphragm-pumps/liquid-diaphragm-pumps/",
  "/products/pumps/miniature-diaphragm-pumps/gas-liquid-diaphragm-pumps/",
  "/products/valves/",
  "/products/valves/rotary-valves/",
  "/products/valves/high-pressure-valves/",
  "/products/valves/solenoid-valves/",
  "/products/probes/",
  "/products/fittings/",
  "/products/tubing/",
  ...tubingMaterials.map(material => `/products/tubing/${material}/`),
  "/products/control/",
  "/products/probes/selection/sampling-probes/",
  "/products/probes/selection/piercing-probes/",
  "/products/probes/selection/wash-probes/",
  "/products/probes/selection/stirring-paddles/",
  "/products/control/air-bubble-detectors/",
  "/products/control/pressure-sensors/",
  "/products/fittings/hard-tube-fittings/",
  "/products/fittings/barbed-fittings/",
  "/products/fittings/thread-to-barbed-fittings/",
  "/products/fittings/luer-fittings/",
  "/products/fittings/quick-connect-fittings/",
  "/products/fittings/female-thread-adapters/",
  "/products/fittings/bulkhead-barbed-fittings/",
  "/products/fittings/filters/",
];

export const germanPipettingPumpDraftPaths: readonly string[] = [
  "/products/pumps/pipetting-pumps/smtp2-programmable-pipetting-module/smtp2-500/",
  "/products/pumps/pipetting-pumps/smtp2-programmable-pipetting-module/smtp2-510/",
  "/products/pumps/pipetting-pumps/smtp2-programmable-pipetting-module/smtp2-520/",
  "/products/pumps/pipetting-pumps/smtp4-pipetting-module/smtp4-100ul/",
  "/products/pumps/pipetting-pumps/smtp4-pipetting-module/smtp4-250ul/",
  "/products/pumps/pipetting-pumps/smtp4-pipetting-module/smtp4-500ul/",
];

export const germanSyringePumpDraftPaths: readonly string[] = [
  "/products/pumps/syringe-pumps/solenoid-valve-syringe-pumps/hmd3/",
  "/products/pumps/syringe-pumps/solenoid-valve-syringe-pumps/hmd6/",
  "/products/pumps/syringe-pumps/rotary-valve-syringe-pumps/hld3/",
  "/products/pumps/syringe-pumps/rotary-valve-syringe-pumps/hld6/",
];

export const germanValvelessPumpDraftPaths: readonly string[] = [
  "/products/pumps/valveless-metering-pump/rpl-p4/",
  "/products/pumps/valveless-metering-pump/rpl-p635/",
  "/products/pumps/valveless-metering-pump/rpl-p15/",
  "/products/pumps/valveless-metering-pump/drpl-0109/",
  "/products/pumps/valveless-metering-pump/drpl-0119/",
];

export const germanControlProductDraftPaths = [
  "/products/control/air-bubble-detectors/abd/",
  "/products/control/pdm5-pressure-sensor/",
] as const;

export const germanDiaphragmPumpDraftPaths: readonly string[] = [
  "/products/pumps/miniature-diaphragm-pumps/dpl30-liquid-diaphragm-pump/",
  "/products/pumps/miniature-diaphragm-pumps/dpl30-db/",
  "/products/pumps/miniature-diaphragm-pumps/dpl30-bb/",
  "/products/pumps/miniature-diaphragm-pumps/dpl60-liquid-diaphragm-pump/",
  "/products/pumps/miniature-diaphragm-pumps/dpl60-db/",
  "/products/pumps/miniature-diaphragm-pumps/dpl60-bb/",
  "/products/pumps/miniature-diaphragm-pumps/dpl30h-liquid-diaphragm-pump/",
  "/products/pumps/miniature-diaphragm-pumps/dpl30h-ds/",
  "/products/pumps/miniature-diaphragm-pumps/dpl30h-bs/",
  "/products/pumps/miniature-diaphragm-pumps/dpgl800-gas-liquid-diaphragm-pump/",
  "/products/pumps/miniature-diaphragm-pumps/dpgl800-bs/",
];

export const germanPistonPumpDraftPaths: readonly string[] = [
  "/products/pumps/piston-pump/ea-100-pmma/",
  "/products/pumps/piston-pump/ea-100-peek/",
  "/products/pumps/piston-pump/ea-250-pmma/",
  "/products/pumps/piston-pump/ea-250-peek/",
  "/products/pumps/piston-pump/ea-500-pmma/",
  "/products/pumps/piston-pump/ea-500-peek/",
  "/products/pumps/piston-pump/ea-1000-pmma/",
  "/products/pumps/piston-pump/ea-1000-peek/",
  "/products/pumps/piston-pump/ea-2500-pmma/",
  "/products/pumps/piston-pump/ea-2500-peek/",
  "/products/pumps/piston-pump/ea-5000-pmma/",
  "/products/pumps/piston-pump/ea-5000-peek/",
  "/products/pumps/piston-pump/ea-10000-pmma/",
  "/products/pumps/piston-pump/ea-10000-peek/",
  "/products/pumps/piston-pump/tm-50-pmma/",
  "/products/pumps/piston-pump/tm-100-pmma/",
  "/products/pumps/piston-pump/tm-250-pmma/",
  "/products/pumps/piston-pump/tm-500-pmma/",
  "/products/pumps/piston-pump/sm-50-pmma/",
  "/products/pumps/piston-pump/sm-100-pmma/",
  "/products/pumps/piston-pump/sm-100-peek/",
  "/products/pumps/piston-pump/sm-250-pmma/",
  "/products/pumps/piston-pump/sm-250-peek/",
  "/products/pumps/piston-pump/sm-500-pmma/",
  "/products/pumps/piston-pump/sm-1000-pmma/",
];

export const germanTubingDetailDraftPaths = [
  "/products/tubing/peek-tubing/details/",
  "/products/tubing/pfa-tubing/details/",
  "/products/tubing/fep-tubing/details/",
  "/products/tubing/ptfe-tubing/details/",
  "/products/tubing/pvc-tubing/details/",
  "/products/tubing/tpu-tubing/details/",
] as const;

export const germanAssemblyDetailDraftPaths = [
  "/products/tubing-assemblies/flanged-tubing/details/",
  "/products/tubing-assemblies/ferrule-kits/details/",
  "/products/tubing-assemblies/retaining-ring-kits/details/",
  "/products/tubing-assemblies/flanged-tubing/details/fep/",
  "/products/tubing-assemblies/flanged-tubing/details/ptfe/",
  "/products/tubing-assemblies/flanged-tubing/details/pfa/",
  "/products/tubing-assemblies/flanged-tubing/details/black-ptfe/",
  "/products/tubing-assemblies/ferrule-kits/details/fep/",
  "/products/tubing-assemblies/ferrule-kits/details/ptfe/",
  "/products/tubing-assemblies/ferrule-kits/details/pfa/",
  "/products/tubing-assemblies/ferrule-kits/details/black-ptfe/",
  "/products/tubing-assemblies/retaining-ring-kits/details/fep/",
  "/products/tubing-assemblies/retaining-ring-kits/details/ptfe/",
  "/products/tubing-assemblies/retaining-ring-kits/details/pfa/",
  "/products/tubing-assemblies/retaining-ring-kits/details/black-ptfe/",
] as const;

export const germanProbeDetailDraftPaths = [
  "/products/probes/sampling-probes/",
  "/products/probes/piercing-probes/",
  "/products/probes/wash-probes/",
  "/products/probes/stirring-paddles/",
] as const;

export const germanHpValveDraftPath = "/products/valves/high-pressure-valves/hp/";

const germanMrv3DraftPaths = ["mrv3-d10", "mrv3-d16", "mrv3-d24"].map(
  model => "/products/valves/rotary-valves/" + model + "/",
);

export const germanLocalizedProductDraftPaths: readonly string[] = [
  ...germanMrv3DraftPaths,
  germanHpValveDraftPath,
  ...germanProbeDetailDraftPaths,
  ...germanTubingDetailDraftPaths,
  ...germanAssemblyDetailDraftPaths,
  ...solenoidPageConfigurations.map(({ slug }) => "/products/valves/solenoid-valves/" + slug + "/"),
  ...germanDiaphragmPumpDraftPaths,
  ...germanValvelessPumpDraftPaths,
  ...germanSyringePumpDraftPaths,
  ...germanPipettingPumpDraftPaths,
  ...germanPistonPumpDraftPaths,
  ...germanControlProductDraftPaths,
  germanBarbedDetailPath,
  germanHardTubeDetailPath,
  "/products/fittings/degassing-modules/ef-ag3-b/",
  "/products/",
  ...germanLocalizedProductSelectionPaths,
  "/products/tubing-assemblies/",
  "/products/tubing-assemblies/flanged-tubing/",
  "/products/tubing-assemblies/retaining-ring-kits/",
  "/products/tubing-assemblies/ferrule-kits/",
];

export const germanLocalizedDraftPaths = [
  ...germanFixedDraftPaths,
  ...germanLocalizedProductDraftPaths,
  ...germanResourceDraftPaths,
  ...germanApplicationHubDraftPaths,
  ...germanChildApplicationDraftPaths,
  ...germanIvdDraftPaths,
  ...germanInkjetChildDraftPaths,
  "/search/",
];

export function isLocalizedGermanDraftPath(pathname: string, fittingPathPattern?: string) {
  if (getDraftLocaleFromPath(pathname) !== "de") return false;
  const relativePath = pathname.slice(3).replace(/\/+$/, "") + "/";
  return germanLocalizedDraftPaths.includes(relativePath)
    || (!!fittingPathPattern && new RegExp("^/(?:" + fittingPathPattern + ")/$").test(relativePath));
}

export function isLocalizedItalianDraftPath(pathname: string) {
  return getDraftLocaleFromPath(pathname) === "it"
    && italianLocalizedDraftPaths.has(pathname.slice(3).replace(/\/+$/, "") + "/");
}

export function isLocalizedHindiDraftPath(pathname: string) {
  return getDraftLocaleFromPath(pathname) === "hi"
    && hindiLocalizedDraftPaths.has(pathname.slice(3).replace(/\/+$/, "") + "/");
}

export function getLocalizedDraftLocale(pathname: string, fittingPathPattern?: string) {
  if (isLocalizedGermanDraftPath(pathname, fittingPathPattern)) return "de";
  if (isLocalizedItalianDraftPath(pathname)) return "it";
  if (isLocalizedHindiDraftPath(pathname)) return "hi";
}

export function isGermanFixedDraftPath(pathname: string) {
  return getDraftLocaleFromPath(pathname) === "de"
    && germanFixedDraftPaths.some(path => pathname.slice(3).replace(/\/+$/, "") + "/" === path);
}

// Preview languages are also included in the website publishing build.
export const languageDraftsEnabled = process.env.NODE_ENV === "development" || publishedTranslationBuild;

export function isDraftLocale(locale: string): locale is DraftLocale {
  return Object.hasOwn(draftLanguages, locale);
}

export function getDraftLocaleFromPath(pathname: string): DraftLocale | undefined {
  if (!languageDraftsEnabled) return;
  const locale = pathname.split("/")[1];
  return locale && isDraftLocale(locale) ? locale : undefined;
}

export function getDraftLinkLocaleFromPath(pathname: string): DraftLocale | undefined {
  const locale = getDraftLocaleFromPath(pathname);
  if (locale === "de" && isResourcePath(pathname.slice(3)) && !isLocalizedGermanDraftPath(pathname)) {
    return undefined;
  }
  return locale;
}

export function isGermanProductDraftPath(pathname: string) {
  return getDraftLocaleFromPath(pathname) === "de"
    && (pathname === "/de/products" || pathname.startsWith("/de/products/"));
}

export function getEnglishDraftSourcePath(pathname: string) {
  const draft = getDraftLocaleFromPath(pathname);
  return draft ? "/en" + pathname.slice(draft.length + 1) : pathname;
}

export function getDraftHrefForEnglish(href: string, draft?: DraftLocale) {
  if (!draft) return href;
  return href.replace(/^\/en(?=\/|[?#]|$)/, "/" + draft);
}

export const italianEnglishFallbackSuffix = " (in inglese)";

type ItalianDraftLink = { href: string; hrefLang?: "it" | "en"; title?: string };

export function getItalianDraftLink(englishHref: string): ItalianDraftLink {
  const italianHref = getDraftHrefForEnglish(englishHref, "it");
  if (italianHref === englishHref) return { href: englishHref };

  return isLocalizedItalianDraftPath(italianHref.split(/[?#]/, 1)[0])
    ? { href: italianHref, hrefLang: "it" }
    : { href: englishHref, hrefLang: "en", title: "Pagina in inglese" };
}

export const hindiEnglishFallbackSuffix = " (अंग्रेज़ी में)";

type HindiDraftLink = { href: string; hrefLang?: "hi" | "en"; title?: string };

export function getHindiDraftLink(englishHref: string): HindiDraftLink {
  const hindiHref = getDraftHrefForEnglish(englishHref, "hi");
  if (hindiHref === englishHref) return { href: englishHref };

  return isLocalizedHindiDraftPath(hindiHref.split(/[?#]/, 1)[0])
    ? { href: hindiHref, hrefLang: "hi" }
    : { href: englishHref, hrefLang: "en", title: "पेज अंग्रेज़ी में है" };
}

export const germanEnglishFallbackSuffix = " (Englisch)";

type GermanDraftLink = { href: string; hrefLang?: "de" | "en"; title?: string };

export function getGermanDraftLink(englishHref: string, fittingPathPattern?: string): GermanDraftLink {
  const germanHref = getDraftHrefForEnglish(englishHref, "de");
  if (germanHref === englishHref) return { href: englishHref };

  return isLocalizedGermanDraftPath(germanHref.split(/[?#]/, 1)[0], fittingPathPattern)
    ? { href: germanHref, hrefLang: "de" }
    : { href: englishHref, hrefLang: "en", title: "Seite auf Englisch" };
}
