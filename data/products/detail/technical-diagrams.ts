const eaLocalizedFigures = new Set([
  "ea-motor-42-four-wire-original-hd", "ea-motor-a-four-wire-original-hd", "ea-motor-b-four-wire-original-hd", "ea-motor-six-wire-original-hd",
  "ea-home-sensor-three-wire-original-hd", "ea-home-sensor-four-wire-original-hd", "ea-home-sensor-five-wire-original-hd", "ea-stroke-positions-hd",
]);

export function getEaDiagramFile(file: string, locale: string) {
  const stem = file.replace(/\.(?:svg|webp)$/, "");
  return ["en", "es", "fr", "ko", "ru"].includes(locale) && eaLocalizedFigures.has(stem)
    ? `localized/${stem}-${locale}.${file.endsWith(".svg") ? "svg" : "webp"}` : file;
}
