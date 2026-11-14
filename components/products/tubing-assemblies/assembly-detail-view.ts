import { Children, cloneElement, isValidElement, type ReactElement, type ReactNode } from "react";
import { assemblyDetailHref, assemblyDetailText } from "@/data/products/tubing-assemblies/detail-localization";
import type { TubingAssemblyLocale } from "@/data/products/tubing-assemblies/locales";

/** Localize authored content without translating component state or model identifiers. */
export function assemblyDetailView(node: ReactNode, locale: TubingAssemblyLocale, figures: readonly unknown[] = []): ReactNode {
  if (locale === "zh-CN") return node;
  const translateChildren = (value: ReactNode): ReactNode => {
    const children: ReactNode[] = [];
    for (const child of Children.toArray(value)) {
      if ((typeof child === "string" || typeof child === "number") && typeof children.at(-1) === "string") children[children.length - 1] += String(child);
      else children.push(typeof child === "number" ? String(child) : child);
    }
    return children.map(child => visit(child));
  };
  const translateValue = (value: unknown): unknown => Array.isArray(value) ? value.map(translateValue) : typeof value === "string" ? assemblyDetailText(value, locale) : isValidElement(value) ? visit(value) : value;
  const visit = (value: ReactNode): ReactNode => {
    if (typeof value === "string") return assemblyDetailText(value, locale);
    if (Array.isArray(value)) return translateChildren(value);
    if (!isValidElement(value)) return value;
    const element = value as ReactElement<Record<string, unknown>>;
    const props: Record<string, unknown> = {};
    for (const key of ["title", "alt", "caption", "aria-label", "headers", "rows"]) {
      if (element.props[key] !== undefined) props[key] = translateValue(element.props[key]);
    }
    if (element.props.children !== undefined) props.children = translateChildren(element.props.children as ReactNode);
    if (typeof element.props.href === "string") props.href = assemblyDetailHref(element.props.href, locale);
    if (figures.includes(element.type)) props.locale = locale;
    return cloneElement(element, props);
  };
  return visit(node);
}
