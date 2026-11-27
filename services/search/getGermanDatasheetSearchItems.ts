import { getGermanProductSearchTerms } from "@/data/search/german-product-search-terms";
import type { SiteSearchItem } from "@/data/search/site-search.types";
import { datasheetsDeData } from "@/data/resources/datasheets.de";

export function getGermanDatasheetSearchItems(): SiteSearchItem[] {
  return datasheetsDeData.datasheetItems
    .filter(item => item.actionType === "download" && item.downloadHref)
    .map(item => ({
      id: `datasheet:${item.id}`,
      module: "datasheets",
      title: item.title,
      subtitle: item.label,
      description: item.description,
      href: item.downloadHref,
      image: item.image,
      keywords: [
        item.title,
        item.label,
        item.description,
        item.keywords,
        ...getGermanProductSearchTerms(item.productHref ?? ""),
      ],
      actionLabel: "PDF ansehen (Englisch)",
    }));
}
