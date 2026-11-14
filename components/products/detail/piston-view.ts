import { Children, cloneElement, isValidElement, type ReactElement, type ReactNode } from "react";
import { pistonHref, pistonLocale, pistonText } from "@/data/products/detail/piston-pump-ui.intl";

/** Piston detail presentation only; state, option values and event handlers stay unchanged. */
export function pistonView(node: ReactNode, locale: string): ReactNode {
  if (pistonLocale(locale) === "zh") return node;
  if (typeof node === "string" || typeof node === "number") return pistonText(String(node), locale);
  if (Array.isArray(node)) return Children.toArray(node).map(child => pistonView(child, locale));
  if (!isValidElement(node)) return node;
  const element = node as ReactElement<Record<string, unknown>>;
  if (element.props.translate === "no") return node;
  const props: Record<string, unknown> = {};
  for (const key of ["children", "actions", "notice", "title", "description", "closeLabel", "alt", "caption", "placeholder", "aria-label", "documentTitle"]) {
    if (element.props[key] !== undefined) props[key] = pistonView(element.props[key] as ReactNode, locale);
  }
  if (typeof element.props.href === "string") props.href = pistonHref(element.props.href, locale);
  return cloneElement(element, props);
}
