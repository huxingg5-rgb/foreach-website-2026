import { resolveProductTypeRoute, resolveSeriesRoute } from "@/data/products/selection/product-route-map";

export type ProductBreadcrumbItem = { label: string; href?: string };

const categories: Record<string, string> = {
  pumps: "泵系列", valves: "阀系列", probes: "针系列",
  fittings: "接头系列", tubing: "管路系列", control: "智控系列",
};
const valveTypes: Record<string, string> = {
  "rotary-valves": "旋转阀", "high-pressure-valves": "高压阀", "solenoid-valves": "电磁阀",
};
const probeTypes: Record<string, string> = {
  "sampling-probes": "采样针", "piercing-probes": "穿刺针",
  "wash-probes": "清洗针", "stirring-paddles": "搅拌桨",
};
const controlTypes: Record<string, string> = {
  "air-bubble-detectors": "气泡检测模块", "pressure-sensors": "压力检测模块",
};

/** Shared hierarchy for Chinese product selectors, details and their JSON-LD. */
export function getChineseProductPageBreadcrumbs(
  pathname: string | null,
  locale: string,
  currentLabel?: string,
): ProductBreadcrumbItem[] | null {
  if (!["zh", "zh-CN"].includes(locale) || !pathname) return null;
  const segments = pathname.split(/[?#]/)[0].split("/").filter(Boolean);
  if (segments[0] !== "products") return null;
  const items: ProductBreadcrumbItem[] = [
    { label: "首页", href: "/" }, { label: "产品中心", href: "/products/" },
  ];
  if (segments.length === 1) return [{ label: "首页", href: "/" }, { label: "产品中心" }];
  const category = segments[1];
  if (!categories[category]) return null;
  const base = `/products/${category}/`;
  items.push({ label: categories[category], href: base });
  let currentPath = base;
  const append = (label: string, href: string) => {
    items.push({ label, href });
    currentPath = href;
  };
  const typeSlug = segments[2];
  if (category === "probes") {
    const probeSlug = typeSlug === "selection" ? segments[3] : typeSlug;
    if (probeTypes[probeSlug]) append(probeTypes[probeSlug], `${base}selection/${probeSlug}/`);
  } else if (category === "control") {
    const controlSlug = ({ "abd": "air-bubble-detectors", "abd-air-bubble-detector": "air-bubble-detectors", "pdm5-pressure-sensor": "pressure-sensors" } as Record<string, string>)[typeSlug] || typeSlug;
    if (controlTypes[controlSlug]) append(controlTypes[controlSlug], `${base}${controlSlug}/`);
  } else if (category === "valves") {
    if (valveTypes[typeSlug]) append(valveTypes[typeSlug], `${base}${typeSlug}/`);
  } else if (category !== "tubing" && typeSlug) {
    // The legacy check-valve detail belongs to the filters/check-valves selector.
    const normalizedType = category === "fittings" && typeSlug === "check-valves" ? "filters" : typeSlug;
    const type = resolveProductTypeRoute(category, normalizedType);
    if (type) append(normalizedType === "miniature-diaphragm-pumps" ? "微型隔膜泵" : type.label, `${base}${normalizedType}/`);
    const series = resolveSeriesRoute(category, normalizedType, segments[3]);
    if (series) append(series.label, `${base}${normalizedType}/${segments[3]}/`);
    if (category === "fittings" && normalizedType === "quick-connect-fittings") {
      const qSeries = segments[3]?.match(/^q(20|40|60)/i);
      if (qSeries) append(`Q${qSeries[1]} 系列`, `${base}${normalizedType}/q${qSeries[1]}/`);
    }
  }
  const pagePath = `/${segments.join("/")}/`;
  if (pagePath !== currentPath && currentLabel?.trim()) items.push({ label: currentLabel.trim() });
  // The current page is always text; every preceding crumb points to its landing page.
  const last = items.length - 1;
  items[last] = { label: items[last].label };
  return items;
}
