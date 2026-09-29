import type { SelectionLocale } from "../selection/product-selection.types";

const imageAltByLocale: Record<SelectionLocale, (ways: "2" | "3") => string> = {
  zh: ways => `FOREACH SV10-${ways} ${ways === "2" ? "二通" : "三通"}微型电磁阀，展示螺纹接口和底部密封接口`,
  en: ways => `FOREACH SV10-${ways} ${ways}-way miniature solenoid valve, showing threaded ports and base seals`,
  es: ways => `Electroválvula miniatura FOREACH SV10-${ways} de ${ways} vías, con conexiones roscadas y juntas en la base`,
  fr: ways => `Électrovanne miniature FOREACH SV10-${ways} à ${ways} voies, avec raccords filetés et joints de base`,
  ko: ways => `나사식 포트와 하부 씰을 보여 주는 FOREACH SV10-${ways} ${ways}방향 소형 솔레노이드 밸브`,
  ru: ways => `Миниатюрный ${ways}-ходовой электромагнитный клапан FOREACH SV10-${ways} с резьбовыми портами и уплотнениями основания`,
};

export function getSolenoidConfigurationImage(slug: "2-way" | "3-way", locale: SelectionLocale) {
  return {
    src: `/images/products/valves/solenoid-valves/foreach-6010-${slug}-miniature-solenoid-valve.webp`,
    alt: imageAltByLocale[locale](slug === "2-way" ? "2" : "3"),
  };
}
