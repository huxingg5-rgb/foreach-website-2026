export const tubingMaterials = [
  "pvc-tubing", "tpu-tubing", "fep-tubing", "ptfe-tubing", "peek-tubing", "pfa-tubing",
] as const;

export function isTubingMaterial(value: string | undefined): value is typeof tubingMaterials[number] {
  return tubingMaterials.some(material => material === value);
}

export function hasTubingSelectionLocale(locale: string) {
  return locale === "zh" || locale === "en";
}

export function getTubingSelectionPath(locale: string, material?: string) {
  const base = `${locale === "zh" ? "" : `/${locale}`}/products/tubing/`;
  return isTubingMaterial(material) ? `${base}${material}/` : base;
}

/** Only migrate valid material filters on the category URL, never detail pages. */
export function getLegacyTubingSelectionTarget(url: URL): string | undefined {
  const legacy = url.pathname.match(/^\/(en\/)?products\/tubing\/selection\/([^/]+)\/?$/);
  if (legacy && isTubingMaterial(legacy[2])) {
    return getTubingSelectionPath(legacy[1] ? "en" : "zh", legacy[2]) + url.search + url.hash;
  }
  const match = url.pathname.match(/^\/(en\/)?products\/tubing\/?$/);
  const material = url.searchParams.get("productType") || undefined;
  if (!match || !isTubingMaterial(material)) return undefined;
  const target = new URL(url);
  target.pathname = getTubingSelectionPath(match[1] ? "en" : "zh", material);
  target.searchParams.delete("productType");
  if (target.searchParams.get("category") === "tubing") target.searchParams.delete("category");
  return `${target.pathname}${target.search}${target.hash}`;
}

export function getTubingDetailPath(locale: string, material: string) {
  const language = locale === "zh-CN" ? "zh" : locale;
  return `${getTubingSelectionPath(language, material)}${hasTubingSelectionLocale(language) ? "details/" : ""}`;
}

/** Preserve the page role when switching between filter and detail route layouts. */
export function getTubingLanguagePath(pathname: string, targetLocale: string): string | undefined {
  const match = pathname.match(/^\/(?:(en|es|fr|ko|ru)\/)?products\/tubing\/(selection\/)?([^/]+)(\/details)?\/?$/);
  if (!match || !isTubingMaterial(match[3])) return undefined;
  const sourceLocale = match[1] || "zh";
  const isFilter = Boolean(match[2]) || (hasTubingSelectionLocale(sourceLocale) && !match[4]);
  if (!isFilter) return getTubingDetailPath(targetLocale, match[3]);
  return hasTubingSelectionLocale(targetLocale)
    ? getTubingSelectionPath(targetLocale, match[3])
    : `${getTubingSelectionPath(targetLocale)}?productType=${match[3]}`;
}

export function getTubingSelectionRedirects() {
  return ["zh", "en"].flatMap(locale => tubingMaterials.map(material => ({
    source: `${locale === "zh" ? "" : `/${locale}`}/products/tubing/selection/${material}`,
    destination: getTubingSelectionPath(locale, material),
    permanent: true,
  })));
}

export function getTubingDetailBreadcrumbs(pathname: string, locale: string) {
  const match = pathname.match(/^\/(en\/)?products\/tubing\/([^/]+)\/details\/?$/);
  if (!match || !isTubingMaterial(match[2])) return null;
  const en = locale === "en";
  const prefix = en ? "/en" : "";
  return [
    { label: en ? "Home" : "首页", href: `${prefix}/` },
    { label: en ? "Product Center" : "产品中心", href: `${prefix}/products/` },
    { label: en ? "Tubing" : "管路系列", href: `${prefix}/products/tubing/` },
    { label: `${match[2].replace("-tubing", "").toUpperCase()} ${en ? "Tubing" : "管"}`, href: getTubingSelectionPath(en ? "en" : "zh", match[2]) },
    { label: en ? "Product Details" : "产品详情" },
  ];
}
