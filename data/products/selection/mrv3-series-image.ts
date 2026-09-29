import type { SelectionLocale } from "./product-selection.types";

const mrv3SeriesImageAlt: Record<SelectionLocale, string> = {
  zh: "FOREACH MRV3 陶瓷多通道旋转选择阀，两种阀头配置及配套电机和控制器",
  en: "FOREACH MRV3 ceramic multi-channel rotary selector valves, showing two valve-head configurations with motors and controllers",
  es: "Válvulas selectoras rotativas cerámicas multicanal FOREACH MRV3, con dos configuraciones de cabezal, motores y controladores",
  fr: "Vannes de sélection rotatives multivoies en céramique FOREACH MRV3, avec deux configurations de tête, moteurs et contrôleurs",
  ko: "FOREACH MRV3 세라믹 다채널 로터리 선택 밸브, 두 가지 밸브 헤드 구성과 모터 및 제어기",
  ru: "Керамические многоканальные роторные клапаны-селекторы FOREACH MRV3: два исполнения клапанной головки с двигателями и контроллерами",
};

export function getMrv3SeriesImage(locale: SelectionLocale) {
  return {
    src: "/images/products/valves/rotary-valves/foreach-mrv3-ceramic-multi-channel-rotary-selector-valves-series.webp",
    alt: mrv3SeriesImageAlt[locale],
  };
}
