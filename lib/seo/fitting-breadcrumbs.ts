import { PRODUCT_CENTER_BREADCRUMB_LABELS } from "./product-breadcrumb-label";

type Breadcrumb = { label: string; href?: string };
const fittingTypes = new Map<string, { label: string; slug?: string }>([
  ["hard-tube-fittings", { label: "Hard Tube Fittings" }],
  ["barbed-fittings", { label: "Barbed Fittings" }],
  ["thread-to-barbed-fittings", { label: "Thread-to-Barb Fittings" }],
  ["luer-fittings", { label: "Luer Fittings" }],
  ["quick-connect-fittings", { label: "Quick-Connect Fittings" }],
  ["female-thread-adapters", { label: "Female Thread Adapters" }],
  ["bulkhead-barbed-fittings", { label: "Bulkhead Barbed Fittings" }],
  ["filters", { label: "Filters and Check Valves" }],
  // Check valves share the public filters/check-valves selection page.
  ["check-valves", { label: "Filters and Check Valves", slug: "filters" }],
]);

/** One English fitting-detail hierarchy for navigation and BreadcrumbList.
 * Other product families, selectors and locales retain their own adapters. */
export function getFittingDetailBreadcrumbs(
  pathname: string | null,
  locale: string,
  model?: string,
): Breadcrumb[] | null {
  if (locale !== "en" || !pathname || !model?.trim()) return null;
  const parts = pathname.split(/[?#]/)[0].split("/").filter(Boolean);
  if (parts.length !== 5 || parts[0] !== "en" || parts[1] !== "products" || parts[2] !== "fittings") return null;
  const type = fittingTypes.get(parts[3]);
  if (!type || /^q(?:20|40|60)$/.test(parts[4])) return null;
  return [
    { label: "Home", href: "/en/" },
    { label: PRODUCT_CENTER_BREADCRUMB_LABELS.en, href: "/en/products/" },
    { label: "Fittings", href: "/en/products/fittings/" },
    { label: type.label, href: `/en/products/fittings/${type.slug || parts[3]}/` },
    { label: model.trim() },
  ];
}
