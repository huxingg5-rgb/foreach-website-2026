// Nine selection configurations; the former combined 2-way URLs remain available.
export type SolenoidState = "nc" | "no";
export type SolenoidConfiguration = {
  slug: string;
  key: "two" | "three";
  connection: "base" | "barbed" | "threaded";
  model: string;
  imageSlug: string;
  assets: readonly string[];
  state?: SolenoidState;
};
const threeWay: SolenoidConfiguration[] = [
  {slug: "3-way-base", key: "three", connection: "base", model: "SV10-P-3", imageSlug: "3-way-base", assets: ["base-3"]},
  {slug: "3-way-barbed", key: "three", connection: "barbed", model: "SV10-B16-3", imageSlug: "3-way-barbed", assets: ["barbed-3"]},
  {slug: "3-way-threaded", key: "three", connection: "threaded", model: "SV10-M6/U28-3", imageSlug: "3-way-threaded", assets: ["threaded-3"]},
];
export const solenoidLegacyConfigurations: SolenoidConfiguration[] = [
  {slug: "2-way-base", key: "two", connection: "base", model: "SV10-P-2", imageSlug: "2-way-base", assets: ["base-2nc", "base-2no"]},
  {slug: "2-way-barbed", key: "two", connection: "barbed", model: "SV10-B16-2", imageSlug: "2-way-barbed", assets: []},
  {slug: "2-way-threaded", key: "two", connection: "threaded", model: "SV10-M6/U28-2", imageSlug: "2-way-threaded", assets: ["threaded-2nc", "threaded-2no"]},
];
export const solenoidConfigurations: SolenoidConfiguration[] = [
  ...threeWay,
  ...(["nc", "no"] as const).flatMap(state => solenoidLegacyConfigurations.map(c => ({
    ...c, slug: `2-way-${state}-${c.connection}`, state,
    // The supplied model chart uses 2NC/2NO for base and barbed variants.
    model: c.connection === "threaded" ? c.model : `${c.model}${state.toUpperCase()}`,
    assets: c.assets.filter(asset => asset.endsWith(`2${state}`)),
  }))),
];
export const solenoidPageConfigurations = [...solenoidConfigurations, ...solenoidLegacyConfigurations];
export const getSolenoidConfiguration = (slug: string) => solenoidPageConfigurations.find(c => c.slug === slug);
// Only original drawings actually supplied for these configurations are available.
const originalDrawingAssets = new Set(["base-3", "base-2nc", "base-2no", "threaded-3", "threaded-2nc", "threaded-2no"]);
export function getSolenoidDrawingAsset(slug: string, variant = 0) {
  const c = getSolenoidConfiguration(slug);
  // The original B16 drawing includes the 3-way, 2NC and 2NO views on one sheet.
  if (c?.connection === "barbed") return "barbed-3";
  const id = c?.assets[variant] || c?.assets[0];
  return id && originalDrawingAssets.has(id) ? id : undefined;
}
const names = {
  zh: ["三通基板式", "三通倒刺式", "三通螺纹式", "二通基板式", "二通倒刺式", "二通螺纹式"],
  en: ["3-Way Manifold-Mount", "3-Way Barbed", "3-Way Threaded", "2-Way Manifold-Mount", "2-Way Barbed", "2-Way Threaded"],
  es: ["3 vías, montaje en colector", "3 vías, espiga", "3 vías, conexión roscada", "2 vías, montaje en colector", "2 vías, espiga", "2 vías, conexión roscada"],
  fr: ["3 voies, montage sur collecteur", "3 voies, raccords cannelés", "3 voies, raccordements filetés", "2 voies, montage sur collecteur", "2 voies, raccords cannelés", "2 voies, raccordements filetés"],
  ko: ["3방향 매니폴드 장착형", "3방향 바브형", "3방향 나사 연결형", "2방향 매니폴드 장착형", "2방향 바브형", "2방향 나사 연결형"],
  ru: ["3-ходовой, монтаж на коллектор", "3-ходовой, штуцеры", "3-ходовой, резьбовые порты", "2-ходовой, монтаж на коллектор", "2-ходовой, штуцеры", "2-ходовой, резьбовые порты"],
};
export function solenoidConfigurationName(slug: string, locale: string) {
  const c = getSolenoidConfiguration(slug);
  if (!c) return "SV10";
  const index = (c.key === "three" ? 0 : 3) + ["base", "barbed", "threaded"].indexOf(c.connection);
  const name = (names[locale as keyof typeof names] || names.en)[index];
  const states: Record<string, string[]> = {
    zh: ["常闭", "常开"], en: ["Normally Closed", "Normally Open"],
    es: ["normalmente cerrada", "normalmente abierta"], fr: ["normalement fermée", "normalement ouverte"],
    ko: ["상시 닫힘", "상시 열림"], ru: ["нормально закрытый", "нормально открытый"],
  };
  // The default NC state is explained in specifications, not repeated in display names.
  if (!c.state || c.state === "nc") return name;
  const state = (states[locale] || states.en)[1];
  return locale === "zh" ? name.replace("二通", `二通${state}`) : `${name}, ${state}`;
}
export function matchesSolenoidFilter(slug: string, filter: string) {
  const c = getSolenoidConfiguration(slug);
  return !filter || !c || (filter === "2-way" ? c.key === "two" : filter === "3-way" ? c.key === "three" : c.connection === filter);
}
