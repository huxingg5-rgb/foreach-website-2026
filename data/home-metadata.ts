import type { LocaleCode } from "@/lib/i18n";

export const homeMetadata: Record<Exclude<LocaleCode, "zh-CN">, { title: string; description: string; ogLocale: string }> = {
  en: {
    title: "Fluidic Components for OEM Instruments | FOREACH",
    description: "Explore FOREACH pumps, valves, probes, sensors and fluidic connections for OEM instruments, with application guides for selection and integration.",
    ogLocale: "en_US",
  },
  es: {
    title: "Foreach Technology | Componentes microfluídicos y soluciones de fluidos",
    description: "Foreach Technology desarrolla bombas, válvulas, sondas, conectores, tubos, sensores y módulos de control para diagnóstico in vitro, ciencias de la vida y automatización de laboratorio.",
    ogLocale: "es_ES",
  },
  fr: {
    title: "Foreach Technology | Composants microfluidiques et solutions fluidiques",
    description: "Foreach Technology développe des pompes, vannes, sondes, raccords, tubes, capteurs et modules de commande pour le diagnostic in vitro, les sciences de la vie et l’automatisation de laboratoire.",
    ogLocale: "fr_FR",
  },
  ko: {
    title: "Foreach Technology | 미세유체 부품 및 유체 시스템 솔루션",
    description: "Foreach Technology는 체외진단, 생명과학, 분석 기기, 합성생물학 및 실험실 자동화를 위한 펌프, 밸브, 프로브, 피팅, 튜브, 센서 및 제어 모듈을 개발합니다.",
    ogLocale: "ko_KR",
  },
  ru: {
    title: "Foreach Technology | Микрофлюидные компоненты и решения",
    description: "Foreach Technology разрабатывает насосы, клапаны, зонды, фитинги, трубки, датчики и модули управления для диагностики in vitro, наук о жизни и автоматизации лабораторий.",
    ogLocale: "ru_RU",
  },
};
