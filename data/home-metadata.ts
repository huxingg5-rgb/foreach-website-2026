import type { LocaleCode } from "@/lib/i18n";

export const homeMetadata: Record<Exclude<LocaleCode, "zh-CN"> | "de" | "it" | "hi", { title: string; description: string; ogLocale: string }> = {
  en: {
    title: "Fluidic Components for OEM Instruments | FOREACH",
    description: "Explore FOREACH pumps, valves, probes, sensors, tubing and fittings for instruments and industrial equipment, with guides to component selection and integration.",
    ogLocale: "en_US",
  },
  hi: {
    title: "OEM उपकरणों के लिए फ्लुइडिक घटक | FOREACH",
    description: "उपकरणों और औद्योगिक सिस्टम के लिए FOREACH के पंप, वाल्व, प्रोब, सेंसर, ट्यूब और फिटिंग देखें। घटकों के चयन और इंटीग्रेशन की गाइड पढ़ें।",
    ogLocale: "hi_IN",
  },
  it: {
    title: "Componenti fluidici per strumenti OEM | FOREACH",
    description: "Scopri pompe, valvole, sonde, sensori, tubi e raccordi FOREACH per strumenti e apparecchiature industriali, con guide per la scelta e l’integrazione dei componenti.",
    ogLocale: "it_IT",
  },
  de: {
    title: "Fluidikkomponenten für OEM-Geräte | FOREACH",
    description: "Pumpen, Ventile, Sonden, Sensoren, Schläuche und Fluidik-Fittings von FOREACH für Instrumente und Industrieanlagen. Mit Leitfäden zur Auswahl und Integration.",
    ogLocale: "de_DE",
  },
  es: {
    title: "Componentes fluídicos para instrumentos OEM | FOREACH",
    description: "Explore las bombas, válvulas, sondas, sensores, tubos y racores de FOREACH para instrumentos y equipos industriales. Consulte las guías de selección e integración.",
    ogLocale: "es_ES",
  },
  fr: {
    title: "Composants fluidiques pour instruments OEM | FOREACH",
    description: "Découvrez les pompes, vannes, sondes, capteurs, tubes et raccords FOREACH pour instruments et équipements industriels, ainsi que nos guides de choix et d’intégration.",
    ogLocale: "fr_FR",
  },
  ko: {
    title: "OEM 기기용 유체 부품 | FOREACH",
    description: "계측 기기와 산업 장비용 FOREACH 펌프, 밸브, 프로브, 센서, 튜브 및 피팅을 살펴보고 적용 가이드에서 부품 선정과 시스템 통합 방법을 확인하세요.",
    ogLocale: "ko_KR",
  },
  ru: {
    title: "Компоненты для жидкостных систем OEM-приборов | FOREACH",
    description: "Насосы, клапаны, зонды, датчики, трубки и фитинги FOREACH для приборов и промышленного оборудования. Руководства по выбору компонентов и их интеграции.",
    ogLocale: "ru_RU",
  },
};
