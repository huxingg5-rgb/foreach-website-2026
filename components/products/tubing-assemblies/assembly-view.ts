import { Children, cloneElement, isValidElement, type ReactElement, type ReactNode } from "react";
import { assemblyLocale, assemblyText } from "@/data/products/configurator/tubing-assembly.intl";

/** Same presentation-only approach as fitting-view. Never translate canonical
 * value/config/event props. translate="no" protects user-entered text and SKUs. */
export function assemblyView(node: ReactNode, locale = "zh"): ReactNode {
  if (assemblyLocale(locale) === "zh") return node;
  if (typeof node === "string") return assemblyText(node, locale);
  if (Array.isArray(node)) {
    const combined: ReactNode[] = [];
    for (const child of node) {
      if ((typeof child === "string" || typeof child === "number") && typeof combined.at(-1) === "string") combined[combined.length - 1] += String(child);
      else combined.push(typeof child === "number" ? String(child) : child);
    }
    return Children.toArray(combined).map(child => assemblyView(child, locale));
  }
  if (!isValidElement(node)) return node;
  const element = node as ReactElement<Record<string, unknown>>;
  if (element.props.translate === "no" || element.props["data-assembly-user-text"]) return node;
  const props: Record<string, unknown> = {};
  for (const key of ["children", "actions", "notice", "title", "description", "closeLabel", "alt", "placeholder", "aria-label", "label", "name", "emptyLabel"]) {
    if (element.props[key] !== undefined) props[key] = assemblyView(element.props[key] as ReactNode, locale);
  }
  return cloneElement(element, props);
}
