import { getPipettingPath } from "./pipetting-pump-seo";

const labels: Record<string, [string, string, string]> = {
  zh: ["首页", "产品中心", "移液泵"],
  en: ["Home", "Product Center", "Pipetting Pumps"],
  es: ["Inicio", "Productos", "Bombas de pipeteo"],
  fr: ["Accueil", "Produits", "Pompes de pipetage"],
  ko: ["홈", "제품", "피펫팅 펌프"],
  ru: ["Главная", "Продукты", "Пипетирующие насосы"],
};
const models: Record<string, string> = {
  "smtp2-1000ul": "SMTP2-1000 μL",
  "smtp4-100ul": "SMTP4-100 μL",
  "smtp4-500ul": "SMTP4-500 μL",
};

export function getPipettingCategoryLabel(locale: string) {
  return labels[locale === "zh-CN" ? "zh" : locale]?.[2] || labels.en[2];
}

export function getPipettingModelBreadcrumbs(slug: string, locale: string) {
  if (!models[slug]) return undefined;
  const lang = locale === "zh-CN" ? "zh" : locale;
  const copy = labels[lang];
  if (!copy) return undefined;
  const prefix = lang === "zh" ? "" : `/${lang}`;
  return [
    { label: copy[0], href: `${prefix}/` },
    { label: copy[1], href: `${prefix}/products/` },
    { label: copy[2], href: getPipettingPath(lang) },
    { label: models[slug] },
  ];
}
