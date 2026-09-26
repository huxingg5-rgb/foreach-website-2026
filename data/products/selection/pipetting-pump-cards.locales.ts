import type { SelectionLocale } from "./product-selection.types";

// Match the Chinese authored cards: model paragraph followed by a descriptive H3.
const headings: Record<Exclude<SelectionLocale, "zh">, [string, string, string]> = {
  en: [
    "1000 μL programmable air displacement pipetting pump for sample transfer, reagent dispensing and automated pipetting, with liquid level, clog and tip detection",
    "100 μL air displacement pipetting pump for small-volume sample transfer and reagent addition to reaction mixtures, with automatic tip ejection and configurable tip compatibility",
    "500 μL air displacement pipetting pump for sample aliquoting, diluent addition and reagent transfer, with automatic tip ejection and configurable tip compatibility",
  ],
  es: [
    "Bomba de pipeteo programable por desplazamiento de aire de 1000 μL para transferencia de muestras, dispensación de reactivos y pipeteo automatizado, con detección de nivel de líquido, obstrucciones y presencia de punta",
    "Bomba de pipeteo por desplazamiento de aire de 100 μL para transferir muestras de pequeño volumen y añadir líquidos a mezclas de reacción, con expulsión automática de puntas y adaptación a distintos tipos de punta",
    "Bomba de pipeteo por desplazamiento de aire de 500 μL para alicuotado de muestras, adición de diluyente y transferencia de reactivos, con expulsión automática de puntas y adaptación a distintos tipos de punta",
  ],
  fr: [
    "Pompe de pipetage programmable à déplacement d’air de 1000 μL pour le transfert d’échantillons, la distribution de réactifs et le pipetage automatisé, avec détection du niveau de liquide, des obstructions et de la présence d’embout",
    "Pompe de pipetage à déplacement d’air de 100 μL pour le transfert de petits volumes d’échantillons et l’ajout de liquides aux mélanges réactionnels, avec éjection automatique et adaptation des embouts",
    "Pompe de pipetage à déplacement d’air de 500 μL pour l’aliquotage d’échantillons, l’ajout de diluant et le transfert de réactifs, avec éjection automatique et adaptation des embouts",
  ],
  ko: [
    "시료 이송, 시약 분주 및 자동 피펫팅용 1000 μL 프로그래머블 공기 치환식 피펫팅 펌프. 액면, 막힘 및 팁 유무 감지 기능 통합",
    "소량 시료 이송 및 반응 혼합물에 액체를 첨가하기 위한 100 μL 공기 치환식 피펫팅 펌프. 자동 팁 배출 및 팁 사양 맞춤 지원",
    "시료 분할 분주, 희석액 첨가 및 시약 이송용 500 μL 공기 치환식 피펫팅 펌프. 자동 팁 배출 및 팁 사양 맞춤 지원",
  ],
  ru: [
    "Программируемый пипетирующий насос с воздушным вытеснением на 1000 мкл для переноса образцов, дозирования реагентов и автоматического пипетирования, с обнаружением уровня жидкости, засорения и наличия наконечника",
    "Пипетирующий насос с воздушным вытеснением на 100 мкл для переноса малых объёмов образцов и добавления жидкостей в реакционные смеси, с автоматическим сбросом и подбором наконечников",
    "Пипетирующий насос с воздушным вытеснением на 500 мкл для аликвотирования образцов, добавления разбавителя и переноса реагентов, с автоматическим сбросом и подбором наконечников",
  ],
};

const models = [
  ["smtp2-1000ul", "SMTP2-1000 μL"],
  ["smtp4-100ul", "SMTP4-100 μL"],
  ["smtp4-500ul", "SMTP4-500 μL"],
] as const;

export function getPipettingCardCopy(locale: SelectionLocale, slug: string) {
  if (locale === "zh") return undefined;
  const index = models.findIndex(([key]) => key === slug);
  if (index < 0) return undefined;
  return { model: models[index][1], heading: headings[locale][index] };
}
