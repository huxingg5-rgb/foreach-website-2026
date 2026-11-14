import { Children, cloneElement, isValidElement, type ReactElement, type ReactNode } from "react";
import { diaphragmHref, diaphragmText } from "@/data/products/detail/diaphragm-pump-ui.intl";
import { normalizeDiaphragmPumpLocale } from "@/data/products/detail/diaphragm-pump-routes";

function plainText(node: ReactNode): string | undefined {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (node == null || typeof node === "boolean") return "";
  if (!Array.isArray(node)) return undefined;
  const parts = node.map(plainText);
  return parts.every(part => part !== undefined) ? parts.join("") : undefined;
}

/** Localize presentation only, using the same authored layout in every language. */
export function diaphragmView(node: ReactNode, locale: string): ReactNode {
  if (normalizeDiaphragmPumpLocale(locale) === "zh") return node;
  const text = plainText(node);
  if (text !== undefined) return diaphragmText(text, locale);
  if (Array.isArray(node)) return Children.toArray(node).map(child => diaphragmView(child, locale));
  if (!isValidElement(node)) return node;
  const element = node as ReactElement<Record<string, unknown>>;
  if (element.props.translate === "no") return node;
  const props: Record<string, unknown> = {};
  for (const key of ["children", "title", "alt", "caption", "placeholder", "aria-label"]) {
    if (element.props[key] !== undefined) props[key] = diaphragmView(element.props[key] as ReactNode, locale);
  }
  // ReferenceRows owns its markup; translate its display data before it renders.
  if (Array.isArray(element.props.rows)) {
    props.rows = element.props.rows.map(row => Array.isArray(row) ? row.map(value => typeof value === "string" ? diaphragmText(value, locale) : value) : row);
  }
  if (typeof element.props.href === "string") props.href = diaphragmHref(element.props.href, locale);
  return cloneElement(element, props);
}
