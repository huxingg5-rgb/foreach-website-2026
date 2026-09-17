import { getValvelessForeignContent, getValvelessLocaleCopy } from "./valveless-pump-locales";
import { getValvelessPumpSeoTitle } from "./valveless-pump-seo";
import { getValvelessPumpPath } from "../selection/valveless-pump-routes";

// Server-authored data bypasses generic word translation in ProductDetailClient.
// The original flags controlling custom-product notices, resources and URLs are preserved.
export function applyValvelessPumpLocalizedCopy<T extends { slug?: string; productTypeId?: string }>(data: T, locale: string): T {
  if (data.productTypeId !== "valveless-pump") return data;
  const content = getValvelessForeignContent(data.slug || "", locale);
  const copy = getValvelessLocaleCopy(locale);
  if (!content || !copy) return data;
  const title = `Foreach ${content.cardSummary}`;
  return {
    ...data, __locale: locale, valvelessDetailContent: true,
    model: title, name: title, title,
    description: content.description,
    commonApplications: content.commonApplications,
    applicationDetails: content.applicationDetails, faqs: content.faqs,
    specs: content.specs, specifications: content.specs,
    specificationGroups: [{ title: copy.specs["产品类型"], items: content.specs }],
    productTypeName: copy.categoryName,
    breadcrumbLabel: content.model,
    breadcrumbParentLabel: copy.categoryName,
    breadcrumbParentHref: getValvelessPumpPath(locale),
    detailHref: getValvelessPumpPath(locale, data.slug),
    href: getValvelessPumpPath(locale, data.slug),
    selectionHref: getValvelessPumpPath(locale),
    imageAlt: content.imageAlt, mainImageAlt: content.imageAlt, imageAltEn: content.imageAlt,
    valvelessPresentation: content.presentation,
    // Both models are covered by the approved English series specification.
    ...(["rpl-p635", "rpl-p15"].includes(data.slug || "") ? { datasheetId: "rpl-series-en" } : {}),
    seo: { title: getValvelessPumpSeoTitle(content.source.slug, locale), description: content.metaDescription },
  };
}
