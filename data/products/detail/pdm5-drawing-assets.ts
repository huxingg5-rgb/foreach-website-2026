import manifest from "./pdm5-drawing-manifest.json";

/** The PDM5 datasheet outline is shared by its four measuring ranges. */
export function getPdm5DrawingAsset(slug: string, locale: string) {
  if (!["pdm5", "pdm5-pressure-sensor"].includes(slug.toLowerCase())) return undefined;
  return manifest[locale.toLowerCase().split("-")[0] === "zh" ? "zh" : "en"];
}
