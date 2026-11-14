import { PRODUCT_CATALOG_EN, type ProductDatasheet } from "./product-detail-resources";
import { getSelectionWorkspaceCopy } from "./selection-workspace-copy";

export type ProductResourceDownload = {
  id: string;
  kind: "datasheet" | "catalog";
  label: string;
  href: string;
  download: true | string;
};

/** Keep localized link labels separate from the language of the real resource file. */
export function getProductResourceDownloads(datasheet: ProductDatasheet | null, locale = "en"): ProductResourceDownload[] {
  const language = locale.toLowerCase().split("-")[0];
  if (language === "zh") return [];
  const copy = getSelectionWorkspaceCopy(language);
  const items: ProductResourceDownload[] = [];
  const englishDatasheet = datasheet?.language === "en"
    || (datasheet?.language !== "zh" && datasheet?.file.includes("/datasheets/en/"));

  if (datasheet && englishDatasheet) {
    items.push({ id: datasheet.id, kind: "datasheet", label: copy.datasheet, href: datasheet.file, download: true });
  }
  items.push({ id: PRODUCT_CATALOG_EN.id, kind: "catalog", label: copy.fullCatalog,
    href: PRODUCT_CATALOG_EN.file, download: "FOREACH-Product-Catalog-EN.pdf" });
  return items;
}
