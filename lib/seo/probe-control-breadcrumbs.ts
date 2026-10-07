import { getControlModuleDetailSlugFromSegments } from "@/data/products/selection/control-module-routes";
import {
  probeTypesEn, controlTypesEn, probeControlDetailCopyEn,
  getProbeSelectionPathEn, getControlSelectionPathEn,
} from "@/data/products/selection/probe-control-selection.en";

type ProductBreadcrumb = { label: string; href?: string };

/** Share the visible navigation hierarchy with the detail-page BreadcrumbList. */
export function getProbeControlBreadcrumbsEn(pathname: string): ProductBreadcrumb[] | undefined {
  const parts = pathname.split("/").filter(Boolean);
  if (parts[0] !== "en" || parts[1] !== "products" || !["probes", "control"].includes(parts[2])) return;
  const isProbe = parts[2] === "probes";
  const root = isProbe ? getProbeSelectionPathEn() : getControlSelectionPathEn();
  const crumbs: ProductBreadcrumb[] = [
    { label: "Home", href: "/en/" },
    { label: "Product Center", href: "/en/products/" },
    { label: isProbe ? "Probes" : "Control", ...(parts.length > 3 ? { href: root } : {}) },
  ];
  if (parts.length === 3) return crumbs;
  if (isProbe) {
    const type = probeTypesEn.find(item => item.id === (parts[3] === "selection" ? parts[4] : parts[3]));
    if (!type) return;
    crumbs.push({ label: type.label, ...(parts[3] !== "selection" ? { href: getProbeSelectionPathEn(type.id) } : {}) });
    if (parts[3] !== "selection") crumbs.push({ label: `Custom ${type.label}` });
  } else {
    const modelSlug = getControlModuleDetailSlugFromSegments(parts.slice(2));
    const type = controlTypesEn.find(item => item.id === parts[3] || item.modelSlug === modelSlug);
    if (!type) return;
    crumbs.push({ label: type.label, ...(type.modelSlug === modelSlug ? { href: getControlSelectionPathEn(type.id) } : {}) });
    if (type.modelSlug === modelSlug) crumbs.push({ label: probeControlDetailCopyEn[type.modelSlug]!.cardTitle });
  }
  return crumbs;
}
