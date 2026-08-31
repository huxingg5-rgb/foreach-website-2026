export const DIAPHRAGM_PUMP_PUBLIC_LOCALES = [
  "zh",
  "en",
  "es",
  "fr",
  "ko",
  "ru",
] as const;

export type DiaphragmPumpPublicLocale =
  (typeof DIAPHRAGM_PUMP_PUBLIC_LOCALES)[number];

export const DIAPHRAGM_PUMP_FINAL_PARENT =
  "miniature-diaphragm-pumps" as const;
export const DIAPHRAGM_PUMP_LEGACY_PARENT = "diaphragm-pumps" as const;

export const DIAPHRAGM_PUMP_FINAL_ROUTE_PREFIX = [
  "pumps",
  DIAPHRAGM_PUMP_FINAL_PARENT,
] as const;

export const DIAPHRAGM_PUMP_LEGACY_ROUTE_PREFIX = [
  "pumps",
  DIAPHRAGM_PUMP_LEGACY_PARENT,
] as const;

export const DIAPHRAGM_PUMP_SUBCATEGORY_SLUGS = [
  "liquid-diaphragm-pumps",
  "gas-liquid-diaphragm-pumps",
  "gas-diaphragm-pumps",
] as const;

export const DIAPHRAGM_PUMP_SERIES_SLUGS = [
  "dpl30-liquid-diaphragm-pump",
  "dpl60-liquid-diaphragm-pump",
  "dpl30h-liquid-diaphragm-pump",
  "dpgl800-gas-liquid-diaphragm-pump",
] as const;

export const DIAPHRAGM_PUMP_REFERENCE_ROUTES = [
  {
    slug: "dpl30-db",
    sourceSeriesSlug: "dpl30-liquid-diaphragm-pump",
    legacySlugs: ["dpl30-24db-ep-ps-liquid-diaphragm-pump"],
  },
  {
    slug: "dpl30-bb",
    sourceSeriesSlug: "dpl30-liquid-diaphragm-pump",
    legacySlugs: ["dpl30-24bb-ep-ps-liquid-diaphragm-pump"],
  },
  {
    slug: "dpl60-db",
    sourceSeriesSlug: "dpl60-liquid-diaphragm-pump",
    legacySlugs: ["dpl60-24db-ep-ps-liquid-diaphragm-pump"],
  },
  {
    slug: "dpl60-bb",
    sourceSeriesSlug: "dpl60-liquid-diaphragm-pump",
    legacySlugs: ["dpl60-24bb-ep-ps-liquid-diaphragm-pump"],
  },
  {
    slug: "dpl30h-ds",
    sourceSeriesSlug: "dpl30h-liquid-diaphragm-pump",
    legacySlugs: ["dpl30h-24ds-ep-ps-liquid-diaphragm-pump"],
  },
  {
    slug: "dpl30h-bs",
    sourceSeriesSlug: "dpl30h-liquid-diaphragm-pump",
    legacySlugs: ["dpl30h-24bs-ep-ps-liquid-diaphragm-pump"],
  },
  {
    slug: "dpgl800-bs",
    sourceSeriesSlug: "dpgl800-gas-liquid-diaphragm-pump",
    legacySlugs: [
      "dpgl800-24bs6-ep-ps-gas-liquid-diaphragm-pump",
      "dpgl800-24bs6-ff-ps-gas-liquid-diaphragm-pump",
    ],
  },
] as const;

export const DIAPHRAGM_PUMP_REFERENCE_SLUGS =
  DIAPHRAGM_PUMP_REFERENCE_ROUTES.map((item) => item.slug);

function normalizeLocale(locale: unknown): DiaphragmPumpPublicLocale {
  const normalized = String(locale || "").trim();

  if (normalized === "zh" || normalized === "zh-CN") return "zh";

  return DIAPHRAGM_PUMP_PUBLIC_LOCALES.includes(
    normalized as DiaphragmPumpPublicLocale,
  )
    ? (normalized as DiaphragmPumpPublicLocale)
    : "en";
}

function normalizeChildSlug(value: unknown) {
  return String(value || "")
    .split(/[?#]/, 1)[0]
    .split("/")
    .filter(Boolean)
    .at(-1)
    ?.toLowerCase() || "";
}

export function normalizeDiaphragmPumpLocale(locale: unknown) {
  return normalizeLocale(locale);
}

export function getDiaphragmPumpLocalePrefix(locale: unknown) {
  const normalizedLocale = normalizeLocale(locale);

  return normalizedLocale === "zh" ? "" : `/${normalizedLocale}`;
}

export function getDiaphragmPumpPath(
  locale: unknown,
  childSlug?: unknown,
  options?: { legacyParent?: boolean; trailingSlash?: boolean },
) {
  const parent = options?.legacyParent
    ? DIAPHRAGM_PUMP_LEGACY_PARENT
    : DIAPHRAGM_PUMP_FINAL_PARENT;
  const child = normalizeChildSlug(childSlug);
  const trailingSlash = options?.trailingSlash !== false;
  const path = `${getDiaphragmPumpLocalePrefix(locale)}/products/pumps/${parent}${
    child ? `/${child}` : ""
  }`;

  return trailingSlash ? `${path}/` : path;
}

export function getDiaphragmPumpLanguageAlternates(childSlug?: unknown) {
  return {
    "zh-CN": getDiaphragmPumpPath("zh", childSlug),
    "en-US": getDiaphragmPumpPath("en", childSlug),
    es: getDiaphragmPumpPath("es", childSlug),
    fr: getDiaphragmPumpPath("fr", childSlug),
    ko: getDiaphragmPumpPath("ko", childSlug),
    ru: getDiaphragmPumpPath("ru", childSlug),
    "x-default": getDiaphragmPumpPath("zh", childSlug),
  };
}

export function isDiaphragmPumpLegacySegments(segments: readonly string[]) {
  return (
    segments[0] === DIAPHRAGM_PUMP_LEGACY_ROUTE_PREFIX[0] &&
    segments[1] === DIAPHRAGM_PUMP_LEGACY_ROUTE_PREFIX[1]
  );
}

export function isDiaphragmPumpFinalSegments(segments: readonly string[]) {
  return (
    segments[0] === DIAPHRAGM_PUMP_FINAL_ROUTE_PREFIX[0] &&
    segments[1] === DIAPHRAGM_PUMP_FINAL_ROUTE_PREFIX[1]
  );
}

export function isDiaphragmPumpPublicPath(value: unknown) {
  const path = String(value || "").split(/[?#]/, 1)[0];

  return /\/(?:[a-z]{2}(?:-[A-Z]{2})?\/)?products\/pumps\/(?:miniature-)?diaphragm-pumps(?:\/|$)/i.test(
    path,
  );
}

export function getDiaphragmPumpReferenceRouteByLegacySlug(slug: unknown) {
  const normalizedSlug = normalizeChildSlug(slug);

  return (
    DIAPHRAGM_PUMP_REFERENCE_ROUTES.find((item) =>
      item.legacySlugs.includes(normalizedSlug as never),
    ) || null
  );
}

export function getDiaphragmPumpReferenceRouteBySlug(slug: unknown) {
  const normalizedSlug = normalizeChildSlug(slug);

  return (
    DIAPHRAGM_PUMP_REFERENCE_ROUTES.find(
      (item) => item.slug === normalizedSlug,
    ) || null
  );
}

export function getDiaphragmPumpFinalRouteSegments() {
  const childSlugs = [
    ...DIAPHRAGM_PUMP_SUBCATEGORY_SLUGS,
    ...DIAPHRAGM_PUMP_SERIES_SLUGS,
    ...DIAPHRAGM_PUMP_REFERENCE_SLUGS,
  ];

  return [
    [...DIAPHRAGM_PUMP_FINAL_ROUTE_PREFIX],
    ...childSlugs.map((slug) => [
      ...DIAPHRAGM_PUMP_FINAL_ROUTE_PREFIX,
      slug,
    ]),
  ];
}

export function migrateDiaphragmPumpRouteSegments(
  routes: readonly (readonly string[])[],
) {
  const retained = routes.filter(
    (segments) =>
      !isDiaphragmPumpLegacySegments(segments) &&
      !isDiaphragmPumpFinalSegments(segments),
  );

  return [
    ...retained.map((segments) => [...segments]),
    ...getDiaphragmPumpFinalRouteSegments(),
  ];
}

export function getDiaphragmPumpRedirectPairs(options?: {
  includeDefensiveReferencePaths?: boolean;
}) {
  const includeDefensiveReferencePaths =
    options?.includeDefensiveReferencePaths === true;
  const categoryChildren = [
    "",
    ...DIAPHRAGM_PUMP_SUBCATEGORY_SLUGS,
    ...DIAPHRAGM_PUMP_SERIES_SLUGS,
  ];

  return DIAPHRAGM_PUMP_PUBLIC_LOCALES.flatMap((locale) => {
    const categoryPairs = categoryChildren.map((childSlug) => ({
      source: getDiaphragmPumpPath(locale, childSlug, { legacyParent: true }),
      destination: getDiaphragmPumpPath(locale, childSlug),
    }));
    const legacyDetailPairs = DIAPHRAGM_PUMP_REFERENCE_ROUTES.flatMap(
      (reference) =>
        reference.legacySlugs.map((legacySlug) => ({
          source: getDiaphragmPumpPath(locale, legacySlug, {
            legacyParent: true,
          }),
          destination: getDiaphragmPumpPath(locale, reference.slug),
        })),
    );
    const shouldIncludeIntermediate =
      includeDefensiveReferencePaths || locale === "zh" || locale === "en";
    const intermediatePairs = shouldIncludeIntermediate
      ? DIAPHRAGM_PUMP_REFERENCE_ROUTES.map((reference) => ({
          source: getDiaphragmPumpPath(locale, reference.slug, {
            legacyParent: true,
          }),
          destination: getDiaphragmPumpPath(locale, reference.slug),
        }))
      : [];

    return [...categoryPairs, ...legacyDetailPairs, ...intermediatePairs];
  });
}
