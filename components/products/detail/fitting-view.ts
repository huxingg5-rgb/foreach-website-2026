import { Children, cloneElement, isValidElement, type ReactElement, type ReactNode } from "react";
import { fittingLocale, fittingText } from "@/data/products/detail/fitting-ui.intl";

/** Localize only presentation nodes, before React renders them. Never visit
 * config/data/value/event props: their original keys continue to select SKUs.
 * Child components receive locale explicitly and localize their own output. */
export function fittingView(node: ReactNode, locale: string): ReactNode {
  if (fittingLocale(locale) === "zh") return node;
  if (typeof node === "string") return fittingText(node,locale);
  if (Array.isArray(node)) {
    const combined: ReactNode[] = [];
    for (const child of node) {
      if ((typeof child === "string" || typeof child === "number") && typeof combined.at(-1) === "string") combined[combined.length-1] += String(child);
      else combined.push(typeof child === "number" ? String(child) : child);
    }
    return Children.toArray(combined).map(child => fittingView(child,locale));
  }
  if (!isValidElement(node)) return node;
  const element = node as ReactElement<Record<string,unknown>>;
  const props: Record<string,unknown> = {};
  for (const key of ["children","actions","notice","title","description","closeLabel","alt","caption","placeholder","aria-label","documentTitle"]) {
    if (element.props[key] !== undefined) props[key] = fittingView(element.props[key] as ReactNode,locale);
  }
  return cloneElement(element,props);
}
