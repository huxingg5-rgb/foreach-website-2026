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
export function getProductResourceDownloads(datasheet: ProductDatasheet | null, locale = "en", options: { includeChinese?: boolean } = {}): ProductResourceDownload[] {
  const language = locale.toLowerCase().split("-")[0];
  if (language === "zh") return [];
  const copy = getSelectionWorkspaceCopy(language);
  const items: ProductResourceDownload[] = [];
  const identifyEnglish = language === "de" || language === "it" || language === "hi";
  const englishDatasheet = datasheet?.language === "en"
    || (datasheet?.language !== "zh" && datasheet?.file.includes("/datasheets/en/"));

  if (datasheet && (englishDatasheet || (language === "zh" && options.includeChinese && datasheet.language === "zh"))) {
    const fileLanguage = datasheet.language === "zh" ? "中文" : "EN";
    items.push({ id: datasheet.id, kind: "datasheet", label: options.includeChinese || identifyEnglish ? `${copy.datasheet} (${fileLanguage})` : copy.datasheet, href: datasheet.file, download: true });
  }
  items.push({ id: PRODUCT_CATALOG_EN.id, kind: "catalog", label: identifyEnglish ? `${copy.fullCatalog} (EN)` : copy.fullCatalog,
    href: PRODUCT_CATALOG_EN.file, download: "FOREACH-Product-Catalog-EN.pdf" });
  return items;
}
