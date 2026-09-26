/** One product-center label per locale, shared by visible breadcrumbs and JSON-LD. */
export const PRODUCT_CENTER_BREADCRUMB_LABELS: Record<string, string> = {
  zh: "产品中心",
  en: "Product Center",
  es: "Centro de productos",
  fr: "Centre produits",
  ko: "제품 센터",
  ru: "Центр продуктов",
};

const rootLabelLocales: Record<string, string> = {
  "产品": "zh", "产品中心": "zh",
  "Products": "en", "Product Center": "en",
  "Productos": "es", "Centro de productos": "es",
  "Produits": "fr", "Centre produits": "fr", "Centre de produits": "fr",
  "제품": "ko", "제품 센터": "ko",
  "Продукты": "ru", "Продукция": "ru", "Центр продуктов": "ru",
};

export function normalizeProductBreadcrumbLabel(label: string, href?: string): string {
  if (href) {
    const path = href.replace(/^https?:\/\/[^/]+/, "").split(/[?#]/)[0];
    const root = path.match(/^\/(?:(en|es|fr|ko|ru|zh|zh-CN)\/)?products\/?$/);
    if (root) return PRODUCT_CENTER_BREADCRUMB_LABELS[root[1] === "zh-CN" ? "zh" : root[1] || "zh"];
    return label;
  }
  // The product center itself is the unlinked final crumb on its landing page.
  const locale = rootLabelLocales[label];
  return locale ? PRODUCT_CENTER_BREADCRUMB_LABELS[locale] : label;
}
