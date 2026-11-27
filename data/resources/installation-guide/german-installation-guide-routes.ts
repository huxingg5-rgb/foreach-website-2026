export const germanInstallationGuideSlugs = [
  "sv10-solenoid-valve-overview",
  "youtube-piston-pump-liquid-dispensing",
  "youtube-flexible-tubing-laboratory-fluid-lines",
  "youtube-quick-connect-sealing-compatibility",
  "youtube-quick-connect-coupling-types",
  "youtube-f-ss-water-circulation-filter",
  "youtube-thread-to-barb-fittings",
  "youtube-rigid-tubing-fittings",
  "youtube-syringe-installation",
  "youtube-q60-quick-fitting",
  "youtube-female-thread-conversion",
  "youtube-bubble-detection-module",
  "youtube-dpl30-vs-dpl30h",
  "youtube-dpgl800-vacuum-test",
  "youtube-dpl-series-introduction",
  "youtube-lld-liquid-level-detection",
  "youtube-about-foreach",
  "youtube-dpl60-brushed-pressure-test",
  "youtube-dpl60-brushed-flow-rate-test",
  "youtube-dpl60-brushless-flow-rate-test",
  "youtube-dpl30-brushed-pressure-test",
  "youtube-dpl30-brushless-pressure-test",
  "youtube-dpl30-brushless-flow-rate-test",
  "youtube-dpl30-brushed-flow-rate-test",
  "youtube-five-wire-brushless-control-wires",
  "youtube-two-wire-brushless-diaphragm-pump",
  "youtube-diaphragm-pump-hose-barb-protection",
  "youtube-diaphragm-pump-placement-stability",
  "youtube-diaphragm-installation",
  "youtube-800-series-gas-liquid",
  "youtube-brushed-vs-brushless-lifespan",
  "youtube-60-series-pressure",
  "youtube-motor-selection",
  "youtube-30h-series-pressure",
  "youtube-diaphragm-selection",
];

export const installationGuidePageSize = 6;
const pages = Math.ceil(germanInstallationGuideSlugs.length / installationGuidePageSize);
const base = "/resources/installation-guide/";

export const germanInstallationGuidePreviewPaths = [
  base,
  ...Array.from({ length: pages - 1 }, (_, index) => base + "page/" + (index + 2) + "/"),
  ...germanInstallationGuideSlugs.map(slug => base + slug + "/"),
];
