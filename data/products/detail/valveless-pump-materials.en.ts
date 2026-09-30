// Scope this terminology pass to English valveless detail text. Never rewrite
// asset paths, identifiers, other pump families or other language versions.
// Polymer name: https://hpp.arkema.com/en/product-families/kynar-fluoropolymer-family/
export function expandValvelessMaterialNames(value: string): string {
  return value
    .replace(/\bpolyvinylidene fluoride\s*\(PVDF\)/gi, "PVDF")
    .replace(/\b(?:alumina|aluminium oxide|aluminum oxide)\s*\(Al(?:₂|2)O(?:₃|3)\)/gi, "Al₂O₃")
    .replace(/\b(?:zirconia|zirconium dioxide)\s*\(ZrO(?:₂|2)\)/gi, "ZrO₂")
    .replace(/\bPVDF\b/g, "polyvinylidene fluoride (PVDF)")
    .replace(/(?<![A-Za-z0-9])(?:Al₂O₃|Al2O3|alumina|aluminium oxide|aluminum oxide)(?![A-Za-z0-9])/gi, "aluminium oxide (Al₂O₃)")
    .replace(/(?<![A-Za-z0-9])(?:ZrO₂|ZrO2|zirconia|zirconium dioxide)(?![A-Za-z0-9])/gi, "zirconium dioxide (ZrO₂)");
}

function expandText(value: unknown): unknown {
  if (typeof value === "string") return expandValvelessMaterialNames(value);
  if (Array.isArray(value)) return value.map(expandText);
  if (!value || typeof value !== "object") return value;
  return Object.fromEntries(Object.entries(value).map(([key, item]) => [key,
    /(?:href|url|path|id|slug|code|image|model)/i.test(key) ? item : expandText(item),
  ]));
}

export function applyValvelessEnglishMaterialNames<T extends { productTypeId?: string; slug?: string }>(data: T, locale: string): T {
  if (locale !== "en" || data.productTypeId !== "valveless-pump" || !["rpl-p4", "rpl-p635", "rpl-p15", "drpl-0109", "drpl-0119"].includes(data.slug || "")) return data;
  const result = { ...data } as T & Record<string, unknown>;
  for (const key of ["description", "advantages", "specs", "specifications", "specificationGroups", "faqs", "faq", "faqItems"]) {
    if (key in result) (result as Record<string, unknown>)[key] = expandText(result[key]);
  }
  return result;
}
