/** Public URL migrations only. Engineering IDs and image paths stay unchanged. */
export const PISTON_PUMP_MODELS = [
  ...[100, 250, 500, 1000, 2500, 5000, 10000].flatMap(capacity =>
    ["pmma", "peek"].map(material => `ea-${capacity}-${material}`)),
  "sm-50-pmma", "sm-100-pmma", "sm-100-peek", "sm-250-pmma",
  "sm-250-peek", "sm-500-pmma", "sm-1000-pmma",
  "tm-50-pmma", "tm-100-pmma", "tm-250-pmma", "tm-500-pmma",
];

export const PISTON_PUMP_SERIES_ALIASES: Record<string, string> = {
  "ea-standard-piston-pumps": "standard-piston-pump",
  "ea-standard-plunger-pumps": "standard-piston-pump",
  "sm-miniature-piston-pumps": "miniature-piston-pump",
  "sm-micro-piston-pumps": "miniature-piston-pump",
  "sm-micro-plunger-pumps": "miniature-piston-pump",
  "sm-miniature-plunger-pumps": "miniature-piston-pump",
  "tm-ultra-compact-piston-pumps": "ultra-compact-piston-pump",
  "tm-ultra-micro-piston-pumps": "ultra-compact-piston-pump",
  "tm-ultra-micro-plunger-pumps": "ultra-compact-piston-pump",
};

const prefixes = ["", "/en", "/es", "/fr", "/ko", "/ru"];

export function getPistonPumpRedirectEntries() {
  return prefixes.flatMap(prefix => {
    const base = `${prefix}/products/pumps`;
    const target = `${base}/piston-pump`;
    return [
      ...Object.entries(PISTON_PUMP_SERIES_ALIASES).flatMap(([oldSlug, slug]) =>
        ["piston-pump", "plunger-pumps"].map(category => ({
          source: `${base}/${category}/${oldSlug}`,
          destination: `${target}/${slug}/`, statusCode: 301 as const,
        }))),
      ...PISTON_PUMP_MODELS.map(slug => ({
        source: `${base}/${slug}`, destination: `${target}/${slug}/`, statusCode: 301 as const,
      })),
      { source: `${base}/plunger-pumps`, destination: `${target}/`, statusCode: 301 as const },
      { source: `${base}/plunger-pumps/:path+`, destination: `${target}/:path+/`, statusCode: 301 as const },
    ];
  });
}

/** Returns null for canonical URLs and unrelated paths. Preserve query and hash. */
export function getPistonPumpRedirect(href: string): string | null {
  const [, pathname = "", suffix = ""] = /^([^?#]*)(.*)$/.exec(href) || [];
  const parts = pathname.split("/").filter(Boolean);
  const locale = ["en", "es", "fr", "ko", "ru"].includes(parts[0]) ? `/${parts.shift()}` : "";
  if (parts[0] !== "products" || parts[1] !== "pumps") return null;
  const target = `${locale}/products/pumps/piston-pump/`;
  if (parts.length === 3 && PISTON_PUMP_MODELS.includes(parts[2])) return `${target}${parts[2]}/${suffix}`;
  if (!["piston-pump", "plunger-pumps"].includes(parts[2])) return null;
  if (parts.length === 4 && PISTON_PUMP_SERIES_ALIASES[parts[3]]) {
    return `${target}${PISTON_PUMP_SERIES_ALIASES[parts[3]]}/${suffix}`;
  }
  if (parts[2] === "plunger-pumps") return `${target}${parts.slice(3).join("/")}${parts.length > 3 ? "/" : ""}${suffix}`;
  return null;
}
