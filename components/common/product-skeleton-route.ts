/** Loading boundaries cover both selection and detail pages, including locales. */
export function resolveProductSkeletonRoute(
  pathname: string | null,
  fallback: "selection" | "detail",
  selectionPaths?: readonly string[],
  englishSelectionPaths: readonly string[] = [],
) {
  const match = pathname?.match(/^\/(?:(en|es|fr|ko|ru)\/)?products(?:\/(.*?))?\/?$/);
  const locale = match?.[1] ?? "zh";
  const path = (match?.[2] ?? "").replace(/\/$/, "");
  if (!match || !selectionPaths) return { locale, variant: fallback };
  const segments = path.split("/").filter(Boolean);
  const selection = segments.length < 2
    || selectionPaths.includes(path)
    || (locale === "en" && englishSelectionPaths.includes(path))
    || (segments[0] === "tubing" && segments.length === 2 && (locale === "zh" || locale === "en"))
    || (segments[0] === "tubing-assemblies" && segments.length === 2);
  return { locale, variant: selection ? "selection" as const : "detail" as const };
}
