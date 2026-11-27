import { getGermanNavigationText } from "@/data/navigation.de";
import { getHindiNavigationText } from "@/data/navigation.hi";
import { getItalianNavigationText } from "@/data/navigation.it";
import { getGermanProductCardText } from "@/data/products/selection/card-copy/product-card-copy.de";
import { getControlModuleCardCopy } from "@/data/products/selection/control-module-card-copy";
import { getControlModulePath, normalizeControlModulePath } from "@/data/products/selection/control-module-routes";
import { controlModuleSelectionProducts } from "@/data/products/selection/control-module-selection.generated";
import type { SiteSearchItem } from "./site-search.types";

const translateAction = {
  en: (text: string) => text,
  de: getGermanNavigationText,
  it: getItalianNavigationText,
  hi: getHindiNavigationText,
};

const hindiAliases: Readonly<Record<string, string[]>> = {
  "pdm5-pressure-sensor": ["दबाव सेंसर", "दाब संवेदक", "दाब संवेदन मॉड्यूल"],
  "abd-air-bubble-detector": ["बुलबुला सेंसर", "बबल डिटेक्टर", "बुलबुले पहचानने वाला सेंसर"],
};

const sourcePaths = new Set(
  controlModuleSelectionProducts.flatMap(({ detailSlug }) =>
    detailSlug ? [getControlModulePath(detailSlug)] : [],
  ),
);

export function isControlModuleSearchDetail(href: string) {
  const pathname = href.split(/[?#]/, 1)[0].replace(/^\/(?:en|de|it|hi)(?=\/)/, "");
  return sourcePaths.has(normalizeControlModulePath(`${pathname.replace(/\/+$/, "")}/`));
}

export function getControlModuleSearchItems(locale: string): SiteSearchItem[] {
  if (locale !== "en" && locale !== "de" && locale !== "it" && locale !== "hi") return [];

  return controlModuleSelectionProducts.flatMap((product) => {
    const slug = product.detailSlug;
    if (!slug) return [];

    const english = getControlModuleCardCopy("en", slug);
    const copy = locale === "de" ? english : getControlModuleCardCopy(locale, slug);
    if (!copy || !english) return [];

    const englishTitle = product.cardTitle.en ?? `${english.model} ${english.name}`;
    const title = locale === "de" ? getGermanNavigationText(englishTitle)
      : locale === "en" ? englishTitle : `${copy.model} ${copy.name}`;
    const description = locale === "de" ? getGermanProductCardText(english.heading) : copy.heading;

    return [{
      id: product.productId,
      module: "products",
      title,
      description,
      href: getControlModulePath(slug, locale),
      image: product.imageCard,
      model: copy.model,
      keywords: [
        title,
        copy.model,
        englishTitle,
        product.searchKeywords?.en ?? "",
        ...(locale === "hi" ? hindiAliases[slug] ?? [] : []),
        ...(locale === "it" && slug === "pdm5-pressure-sensor" ? ["trasduttore di pressione"] : []),
      ],
      actionLabel: translateAction[locale]("View Product"),
    }];
  });
}
