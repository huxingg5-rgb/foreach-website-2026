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
  return isTubingMaterial(material) ? `${base}selection/${material}/` : base;
}

/** Only migrate valid material filters on the category URL, never detail pages. */
export function getLegacyTubingSelectionTarget(url: URL): string | undefined {
  const match = url.pathname.match(/^\/(en\/)?products\/tubing\/?$/);
  const material = url.searchParams.get("productType") || undefined;
  if (!match || !isTubingMaterial(material)) return undefined;
  const target = new URL(url);
  target.pathname = getTubingSelectionPath(match[1] ? "en" : "zh", material);
  target.searchParams.delete("productType");
  if (target.searchParams.get("category") === "tubing") target.searchParams.delete("category");
  return `${target.pathname}${target.search}${target.hash}`;
}
