export const syringeModelRoutes = [
  { model: "hmd3", series: "solenoid-valve-syringe-pumps", legacy: "hmd3-30mm-solenoid-syringe-pump" },
  { model: "hmd6", series: "solenoid-valve-syringe-pumps", legacy: "hmd6-60mm-solenoid-syringe-pump" },
  { model: "hld3", series: "rotary-valve-syringe-pumps", legacy: "hld3-30mm-rotary-valve-syringe-pump" },
  { model: "hld6", series: "rotary-valve-syringe-pumps", legacy: "hld6-60mm-rotary-valve-syringe-pump" },
];
export function getSyringeModelPath(locale: string, legacy: string) {
 const route = syringeModelRoutes.find(r => r.legacy === legacy);
 if (!route) return null;
 return (["zh", "zh-CN", ""].includes(locale) ? "" : "/" + locale) + "/products/pumps/syringe-pumps/" + route.series + "/" + route.model + "/";
}
export function getSyringeModelRedirect(href: string): string | null {
 const match = href.match(/^(\/(?:en\/|es\/|fr\/|ko\/|ru\/)?products\/pumps\/syringe-pumps\/)([^/?#]+)\/?([?#].*)?$/);
 if (!match) return null;
 const route = syringeModelRoutes.find(r => r.legacy === match[2]);
 return route ? match[1] + route.series + "/" + route.model + "/" + (match[3] || "") : null;
}
export function getSyringeModelRedirectEntries() {
 return ["zh", "en", "es", "fr", "ko", "ru"].flatMap(locale => syringeModelRoutes.map(r => ({ source: (locale === "zh" ? "" : "/" + locale) + "/products/pumps/syringe-pumps/" + r.legacy, destination: getSyringeModelPath(locale, r.legacy)!, statusCode: 301 as const })));
}
export function getSyringeModelBreadcrumbs(slug: string, locale: string) {
 const r = syringeModelRoutes.find(r => r.legacy === slug);
 if (!r) return null;
 const lang = locale === "zh-CN" ? "zh" : locale;
 const labels: Record<string, string[]> = { zh: ["首页", "产品中心", "注射泵", "HMD 电磁阀系列", "HLD 旋转阀系列"], en: ["Home", "Products", "Syringe Pumps", "HMD Solenoid Valve Series", "HLD Rotary Valve Series"], es: ["Inicio", "Productos", "Bombas de jeringa", "Serie HMD con electroválvulas", "Serie HLD con válvulas rotativas"], fr: ["Accueil", "Produits", "Pompes à seringue", "Série HMD avec électrovannes", "Série HLD avec vannes rotatives"], ko: ["홈", "제품", "시린지 펌프", "HMD 솔레노이드 밸브 시리즈", "HLD 로터리 밸브 시리즈"], ru: ["Главная", "Продукция", "Шприцевые насосы", "Серия HMD с электромагнитными клапанами", "Серия HLD с поворотными клапанами"] };
 const l = labels[lang] || labels.en, prefix = lang === "zh" ? "" : "/" + lang;
 const base = prefix + "/products/pumps/syringe-pumps/";
 return [{label:l[0],href:prefix+"/"},{label:l[1],href:prefix+"/products/"},{label:l[2],href:base},{label:l[r.model.startsWith("hmd")?3:4],href:base+r.series+"/"},{label:r.model.toUpperCase()}];
}
