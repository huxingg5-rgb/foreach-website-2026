import type { SelectionLocale } from "./product-selection.types";
import { controlModuleCardsZh } from "./control-module-card-copy.zh";

type ControlModuleCardCopy = { model: string; name: string; heading: string };

// Card H3 and detail H1 share the same localized description.
const controlModuleCards: Record<SelectionLocale, Record<string, ControlModuleCardCopy>> = {
  zh: controlModuleCardsZh,
  en: {
    "abd-air-bubble-detector": {
      model: "ABD",
      name: "Air Bubble Detection Module",
      heading: "ABD Air Bubble Detection Module for identifying bubbles, droplets and gas/liquid states in transparent tubing, available in configurations for transparent flexible tubing with outer diameters of 1.6–6.4 mm",
    },
    "pdm5-pressure-sensor": {
      model: "PDM5",
      name: "Pressure Sensing Module",
      heading: "PDM5 Pressure Sensing Module for fluid-path pressure monitoring, with a 10–1200 kPa range, a PEEK flow path and I²C communication",
    },
  },
  es: {
    "abd-air-bubble-detector": {
      model: "ABD",
      name: "Módulo de detección de burbujas de aire",
      heading: "Módulo ABD de detección de burbujas de aire para identificar burbujas, gotas y estados de gas y líquido en tubos transparentes, disponible en configuraciones para tubos flexibles transparentes con diámetros exteriores de 1,6–6,4 mm",
    },
    "pdm5-pressure-sensor": {
      model: "PDM5",
      name: "Módulo de detección de presión",
      heading: "Módulo PDM5 de detección de presión en circuitos de líquidos con un rango de 10–1200 kPa, un conducto interno de PEEK y comunicación I²C",
    },
  },
  fr: {
    "abd-air-bubble-detector": {
      model: "ABD",
      name: "Module de détection de bulles d’air",
      heading: "Module ABD de détection de bulles d’air pour identifier les bulles, les gouttes et les états gaz/liquide dans les tubes transparents, disponible dans des configurations adaptées aux tubes souples transparents de 1,6 à 6,4 mm de diamètre extérieur",
    },
    "pdm5-pressure-sensor": {
      model: "PDM5",
      name: "Module de mesure de pression",
      heading: "Module PDM5 de mesure de pression pour circuits de liquide, avec une plage de 10–1200 kPa, un passage de fluide en PEEK et une communication I²C",
    },
  },
  ko: {
    "abd-air-bubble-detector": {
      model: "ABD",
      name: "기포 감지 모듈",
      heading: "투명 배관 내 기포, 액적 및 기체·액체 상태를 식별하는 ABD 기포 감지 모듈로, 외경 1.6–6.4 mm의 투명 연질 튜브에 맞는 구성을 제공합니다",
    },
    "pdm5-pressure-sensor": {
      model: "PDM5",
      name: "압력 감지 모듈",
      heading: "액체 유로용 10–1200 kPa PDM5 압력 감지 모듈로, PEEK 유로를 사용하고 I²C 통신을 지원합니다",
    },
  },
  ru: {
    "abd-air-bubble-detector": {
      model: "ABD",
      name: "Модуль обнаружения воздушных пузырьков",
      heading: "Модуль обнаружения пузырьков ABD для распознавания пузырьков, капель и состояний «газ/жидкость» в прозрачных трубках, доступный в конфигурациях для прозрачных гибких трубок с наружным диаметром 1,6–6,4 мм",
    },
    "pdm5-pressure-sensor": {
      model: "PDM5",
      name: "Модуль измерения давления",
      heading: "Модуль измерения давления PDM5 в жидкостных системах с диапазоном 10–1200 кПа, проточным каналом из PEEK и поддержкой связи I²C",
    },
  },
};

export function getControlModuleCardCopy(locale: SelectionLocale, slug: string) {
  return controlModuleCards[locale]?.[slug];
}

export function getControlModuleDetailHeading(slug: string, locale: SelectionLocale) {
  const copy = getControlModuleCardCopy(locale, slug);
  return copy ? `FOREACH ${copy.heading}` : undefined;
}
