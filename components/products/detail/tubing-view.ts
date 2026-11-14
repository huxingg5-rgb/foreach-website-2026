import { cloneElement, isValidElement, type ReactElement, type ReactNode } from "react";
import { tubingHref, tubingLocale, tubingText } from "@/data/products/tubing/detail-locales";

const inlineTags = new Set(["a", "b", "code", "em", "i", "span", "strong"]);

function inlineText(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(inlineText).join("");
  if (isValidElement<{ children?: ReactNode }>(node) && typeof node.type === "string" && inlineTags.has(node.type)) {
    return inlineText(node.props.children);
  }
  return "";
}

/** Chinese prose often omits spaces at inline emphasis boundaries. */
function spaceInlineProse(children: ReactNode): ReactNode {
  if (!Array.isArray(children)) return children;
  return children.flatMap((child, index) => {
    if (index === 0) return [child];
    const previous = inlineText(children[index - 1]);
    const current = inlineText(child);
    return /[\p{L}\p{N}.?!:;%)\]’”]$/u.test(previous) && /^[\p{L}\p{N}]/u.test(current) ? [" ", child] : [child];
  });
}

/** Translate render-time presentation only. Do not visit SKU data, option
 * values, IDs, state or event handlers. Interactive controls keep their keys. */
export function tubingView(node: ReactNode, locale: string): ReactNode {
  if (tubingLocale(locale) === "zh") return node;
  if (typeof node === "string") return tubingText(node, locale);
  if (Array.isArray(node)) {
    const combined: ReactNode[] = [];
    for (const child of node) {
      if ((typeof child === "string" || typeof child === "number") && typeof combined.at(-1) === "string") combined[combined.length - 1] += String(child);
      else combined.push(typeof child === "number" ? String(child) : child);
    }
    return combined.map((child, index) => {
      const translated = tubingView(child, locale);
      return isValidElement(translated) ? cloneElement(translated, { key: translated.key ?? `tubing-${index}` }) : translated;
    });
  }
  if (!isValidElement(node)) return node;
  const element = node as ReactElement<Record<string, unknown>>;
  if (element.props.translate === "no") return node;
  const props: Record<string, unknown> = {};
  for (const key of ["children", "title", "label", "alt", "caption", "placeholder", "aria-label"]) {
    if (element.props[key] !== undefined) props[key] = tubingView(element.props[key] as ReactNode, locale);
  }
  if (element.type === "p") props.children = spaceInlineProse(props.children as ReactNode);
  if (Array.isArray(element.props.headers)) props.headers = element.props.headers.map(header => tubingView(header as ReactNode, locale));
  if (Array.isArray(element.props.rows)) props.rows = element.props.rows.map(row => Array.isArray(row) ? row.map(cell => tubingView(cell as ReactNode, locale)) : row);
  if (typeof element.props.href === "string") props.href = tubingHref(element.props.href, locale);
  return cloneElement(element, props);
}
