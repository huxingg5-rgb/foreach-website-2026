import { valveOverviewHeadings } from "./valve-overview-headings";

// Shared category H1 copy for all supported languages and page entry points.
export const productOverviewHeadings = {
  pumps: {
    zh: "微型精密流体泵：微量分配、输送与计量",
    en: "Miniature Precision Fluid Handling Pumps: Microdispensing, Transfer and Metering",
    es: "Bombas miniatura de precisión: microdispensación, transferencia y dosificación",
    fr: "Pompes miniatures de précision : microdistribution, transfert et dosage",
    ko: "소형 정밀 유체 펌프: 미량 분주, 이송 및 정량 공급",
    ru: "Миниатюрные прецизионные насосы: микродозирование, перекачивание и дозирование",
  },
  valves: valveOverviewHeadings,
  needles: {
    zh: "定制针与搅拌组件：采样、穿刺取液、清洗与混匀",
    en: "Custom Probe and Mixing Assemblies: Sampling, Liquid Aspiration through Piercing, Washing and Mixing",
    es: "Sondas y conjuntos de mezcla a medida: muestreo, aspiración de líquidos mediante perforación, lavado y mezcla",
    fr: "Sondes et ensembles de mélange sur mesure : prélèvement, aspiration de liquide par perforation, lavage et mélange",
    ko: "맞춤형 프로브 및 교반 부품: 샘플링, 천공을 통한 액체 흡입, 세척 및 혼합",
    ru: "Иглы и смесительные узлы по заказу: отбор проб, забор жидкости через прокол, промывка и перемешивание",
  },
  fittings: {
    zh: "微流体接头：管路连接、接口转换与快速拆装",
    en: "Microfluidic Fittings: Tubing Connections, Port Adaptation and Quick Connection and Disconnection",
    es: "Conectores microfluídicos: conexión de tubos, adaptación de puertos y conexión y desconexión rápidas",
    fr: "Raccords microfluidiques : raccordement des tubes, adaptation des interfaces et connexion et déconnexion rapides",
    ko: "미세유체 피팅: 튜브 연결, 포트 변환 및 빠른 연결·분리",
    ru: "Микрофлюидные фитинги: соединение трубок, переход между портами и быстрое подключение и отсоединение",
  },
  tubing: {
    zh: "流体管路：氟塑料管、PEEK 管与柔性软管",
    en: "Fluidic Tubing: Fluoropolymer, PEEK and Flexible Tubing",
    es: "Tubos para circuitos de fluidos: fluoropolímeros, PEEK y tubos flexibles",
    fr: "Tubes pour circuits fluidiques : fluoropolymères, PEEK et tubes souples",
    ko: "유체 튜브: 불소수지 튜브, PEEK 튜브 및 연질 튜브",
    ru: "Трубки для жидкостных и газовых трактов: фторполимеры, PEEK и гибкие трубки",
  },
  control: {
    zh: "流体检测模块：非接触式气泡检测与液路压力监测",
    en: "Fluid Sensing Modules: Non-Contact Bubble Detection and Fluid-Path Pressure Monitoring",
    es: "Módulos de detección de fluidos: detección de burbujas sin contacto y monitorización de presión del circuito",
    fr: "Modules de détection pour circuits fluidiques : détection de bulles sans contact et surveillance de la pression",
    ko: "유체 감지 모듈: 비접촉식 기포 감지 및 유로 압력 모니터링",
    ru: "Модули контроля жидкостных трактов: бесконтактное обнаружение пузырьков и мониторинг давления",
  },
} as const;

export function getProductOverviewHeading(category: string, locale: string) {
  const headings = productOverviewHeadings[category as keyof typeof productOverviewHeadings];
  const language = locale === "zh-CN" ? "zh" : locale;
  return headings?.[language as keyof typeof productOverviewHeadings.pumps];
}
