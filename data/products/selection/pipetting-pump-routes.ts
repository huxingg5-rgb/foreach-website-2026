import paths from "./pipetting-pump-paths.json";
export const pipettingModelSlugs = ["smtp2-1000ul", "smtp4-100ul", "smtp4-500ul"] as const;
export function getPipettingSeriesSlug(key: "smtp2" | "smtp4") { return paths[key]; }
export function getPipettingSeriesKey(slug: string): "smtp2" | "smtp4" | undefined {
  return slug === paths.smtp2 ? "smtp2" : slug === paths.smtp4 ? "smtp4" : undefined;
}
export function getPipettingModelPath(locale: string, model: string) {
  if (!pipettingModelSlugs.includes(model as typeof pipettingModelSlugs[number])) return undefined;
  return `${["zh", "zh-CN", ""].includes(locale) ? "" : `/${locale}`}/products/pumps/pipetting-pumps/${paths[model as keyof typeof paths]}/`;
}
export function normalizePipettingPath(href: string) {
  return href.replace(/^(\/(?:en\/|es\/|fr\/|ko\/|ru\/)?products\/pumps\/pipetting-pumps\/)([^/?#]+)\/?([?#].*)?$/, (all, base, slug, suffix) => {
    const target = paths[slug as keyof typeof paths];
    return target ? `${base}${target}/${suffix || ""}` : all;
  });
}
export function migratePipettingSegments(segments: string[]) {
  return normalizePipettingPath(`/products/${segments.join("/")}/`).replace(/^\/products\//, "").split("/").filter(Boolean);
}
export function isPipettingModelRoute(segments: string[]) {
  return segments.length === 4 && segments[0] === "pumps" && segments[1] === "pipetting-pumps" &&
    getPipettingModelPath("zh", segments[3]) === `/products/${segments.join("/")}/`;
}
export function getPipettingRedirectEntries() {
  return ["zh", "en", "es", "fr", "ko", "ru"].flatMap(locale => Object.entries(paths).map(([old, target]) => {
    const base = `${locale === "zh" ? "" : `/${locale}`}/products/pumps/pipetting-pumps/`;
    return {source: base + old, destination: base + target + "/", statusCode: 301 as const};
  }));
}
