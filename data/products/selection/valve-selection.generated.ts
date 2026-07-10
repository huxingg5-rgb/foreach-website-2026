/* =========================================================
   valve-selection.generated.ts
   FOREACH 官网｜阀系列产品中心卡片数据

   说明：
   1. 阀系列产品类型分为：旋转阀 / 高压阀 / 电磁阀
   2. productTypeId 使用中文，用于前台筛选显示
   3. productTypeSlug / detailSlug / routeSlug / slug 使用英文，用于路由
   4. 避免生成 /products/valves/undefined
========================================================= */

import type { ProductSelectionProduct } from "./product-selection.types";

export const valveFilterLabels = [
  "旋转阀",
  "高压阀",
  "电磁阀",
] as const;

const valveProducts = [
  {
    id: "mrv3-ceramic-rotary-valve",
    slug: "rotary-valves",
    imageCard: "/images/products/valves/rotary-valves/foreach-rotary-valve-main.webp",

    detailSlug: "rotary-valves",
    routeSlug: "rotary-valves",
    seriesSlug: "rotary-valves",
    productTypeSlug: "rotary-valves",

    productId: "mrv3-ceramic-rotary-valve",
    productCode: "MRV3",
    code: "MRV3",

    categoryId: "valves",
    categoryLabel: "阀系列",

    productTypeId: "旋转阀",
    productTypeLabel: "旋转阀",

    model: "MRV3 陶瓷多通道旋转阀",
    title: "MRV3 陶瓷多通道旋转阀",
    name: "MRV3 陶瓷多通道旋转阀",
    productName: "MRV3 陶瓷多通道旋转阀",

    cardTitle: {
      zh: "MRV3 陶瓷多通道旋转阀",
      en: "MRV3 Ceramic Multi-channel Rotary Valve",
      es: "Válvula rotativa cerámica multicanal MRV3",
      fr: "Valve rotative céramique multicanal MRV3",
      ko: "MRV3 세라믹 멀티채널 로터리 밸브",
      ru: "Керамический многоканальный поворотный клапан MRV3",
    },

    cardSubtitle: {
      zh: "10 / 16 / 24 通道可选\n耐压 0.7MPa，内容积低至 2.9μL\n适用于多试剂、多清洗液路径切换",
      en: "10 / 16 / 24 channels available\n0.7MPa pressure rating, internal volume down to 2.9μL\nFor multi-reagent and wash path switching",
      es: "10 / 16 / 24 canales disponibles\nPresión nominal 0.7MPa, volumen interno hasta 2.9μL\nPara conmutación de múltiples reactivos y rutas de lavado",
      fr: "10 / 16 / 24 canaux disponibles\nPression nominale 0.7MPa, volume interne jusqu'à 2.9μL\nPour commutation de réactifs multiples et circuits de lavage",
      ko: "10 / 16 / 24 채널 선택 가능\n정격 압력 0.7MPa, 내부 체적 최소 2.9μL\n다중 시약 및 세척 경로 전환용",
      ru: "Доступны 10 / 16 / 24 канала\nНоминальное давление 0.7MPa, внутренний объем до 2.9μL\nДля переключения реагентов и промывочных трактов",
    },

    image: "/images/products/valves/rotary-valves/foreach-rotary-valve-main.webp",
    imagePath: "/images/products/valves/rotary-valves/foreach-rotary-valve-main.webp",
    imageUrl: "/images/products/valves/rotary-valves/foreach-rotary-valve-main.webp",
    imageAlt: "MRV3 陶瓷多通道旋转阀",

    subtitle: "10 / 16 / 24 通道可选，适用于多试剂和清洗路径切换",
    description:
      "MRV3 陶瓷多通道旋转阀用于自动化分析仪器中的多通道流路切换、试剂选择、样本分配和清洗路径管理。",

    summary:
      "10 / 16 / 24 通道可选，耐压 0.7MPa，内容积低至 2.9μL。",

    tags: ["多通道切换", "0.7MPa", "低内容积"],

    specs: [
      { label: "通道数量", value: "10 / 16 / 24" },
      { label: "通道直径", value: "1.2 / 1.0 / 0.5mm" },
      { label: "内容积", value: "15.8 / 10 / 2.9μL" },
    ],

    filter01: "旋转阀",
    filter02: "多通道切换",
    filter03: "0.7MPa",
    filter04: "定制配置",

    filters: {
      filter01: "旋转阀",
      filter02: "多通道切换",
      filter03: "0.7MPa",
      filter04: "定制配置",
    },

    href: "/products/valves/rotary-valves",
    detailHref: "/products/valves/rotary-valves",
    selectionHref: "/products",
    sourceType: "valve-selection",
  },

  {
    id: "hp-3-position-7-port-high-pressure-valve",
    slug: "high-pressure-valves",
    imageCard: "/images/products/valves/high-pressure-valves/foreach-high-pressure-valve-main.webp",

    detailSlug: "high-pressure-valves",
    routeSlug: "high-pressure-valves",
    seriesSlug: "high-pressure-valves",
    productTypeSlug: "high-pressure-valves",

    productId: "hp-3-position-7-port-high-pressure-valve",
    productCode: "HP",
    code: "HP",

    categoryId: "valves",
    categoryLabel: "阀系列",

    productTypeId: "高压阀",
    productTypeLabel: "高压阀",

    model: "HP 三位七通高压阀",
    title: "HP 三位七通高压阀",
    name: "HP 三位七通高压阀",
    productName: "HP 三位七通高压阀",

    cardTitle: {
      zh: "HP 三位七通高压阀",
      en: "HP Three-position Seven-port High-pressure Valve",
      es: "Válvula de alta presión HP de tres posiciones y siete puertos",
      fr: "Valve haute pression HP trois positions sept ports",
      ko: "HP 3위치 7포트 고압 밸브",
      ru: "Высоконапорный клапан HP на три положения и семь портов",
    },

    cardSubtitle: {
      zh: "三位七通高压流路控制\n25MPa，10-32UNF 接口\n适用于 HPLC 自动进样与排气场景",
      en: "Three-position seven-port high-pressure flow control\n25MPa, 10-32UNF port\nFor HPLC autosampling and venting",
      es: "Control de flujo de alta presión de tres posiciones y siete puertos\n25MPa, puerto 10-32UNF\nPara automuestreo HPLC y ventilación",
      fr: "Contrôle de débit haute pression trois positions sept ports\n25MPa, port 10-32UNF\nPour autosampling HPLC et purge",
      ko: "3위치 7포트 고압 유로 제어\n25MPa, 10-32UNF 포트\nHPLC 자동 샘플링 및 배기용",
      ru: "Высоконапорное управление потоком: три положения, семь портов\n25MPa, порт 10-32UNF\nДля автосамплинга HPLC и выпуска воздуха",
    },

    image: "/images/products/valves/high-pressure-valves/foreach-high-pressure-valve-main.webp",
    imagePath: "/images/products/valves/high-pressure-valves/foreach-high-pressure-valve-main.webp",
    imageUrl: "/images/products/valves/high-pressure-valves/foreach-high-pressure-valve-main.webp",
    imageAlt: "HP 三位七通高压阀",

    subtitle: "三位七通高压流路控制，适用于 HPLC 自动进样与排气场景",
    description:
      "HP 三位七通高压阀用于 HPLC 自动进样、高压流路切换、系统排气和分析仪器高压液路模块。",

    summary:
      "三位七通结构，最大工作压力 25MPa，接口 10-32UNF。",

    tags: ["25MPa", "三位七通", "HPLC"],

    specs: [
      { label: "最大工作压力", value: "25MPa" },
      { label: "接口规格", value: "10-32UNF" },
      { label: "内体积", value: "0.8μL" },
    ],

    filter01: "高压阀",
    filter02: "高压控制",
    filter03: "25MPa",
    filter04: "定制配置",

    filters: {
      filter01: "高压阀",
      filter02: "高压控制",
      filter03: "25MPa",
      filter04: "定制配置",
    },

    href: "/products/valves/high-pressure-valves",
    detailHref: "/products/valves/high-pressure-valves",
    selectionHref: "/products",
    sourceType: "valve-selection",
  },

  {
    id: "6010-solenoid-valve",
    slug: "solenoid-valves",
    imageCard: "/images/products/valves/solenoid-valves/foreach-solenoid-valve-main.webp",

    detailSlug: "solenoid-valves",
    routeSlug: "solenoid-valves",
    seriesSlug: "solenoid-valves",
    productTypeSlug: "solenoid-valves",

    productId: "6010-solenoid-valve",
    productCode: "6010",
    code: "6010",

    categoryId: "valves",
    categoryLabel: "阀系列",

    productTypeId: "电磁阀",
    productTypeLabel: "电磁阀",

    model: "6010 系列电磁阀",
    title: "6010 系列电磁阀",
    name: "6010 系列电磁阀",
    productName: "6010 系列电磁阀",

    cardTitle: {
      zh: "6010 系列电磁阀",
      en: "6010 Series Solenoid Valve",
      es: "Válvula solenoide serie 6010",
      fr: "Électrovanne série 6010",
      ko: "6010 시리즈 솔레노이드 밸브",
      ru: "Электромагнитный клапан серии 6010",
    },

    cardSubtitle: {
      zh: "2通 / 3通摆臂隔膜阀\n-75kPa~0.25MPa，CV 0.03\n支持基板型、螺纹型和倒刺型配置",
      en: "2-port / 3-port rocker diaphragm valve\n-75kPa to 0.25MPa, CV 0.03\nPanel, threaded and barbed configurations",
      es: "Válvula de diafragma basculante de 2 / 3 puertos\n-75kPa a 0.25MPa, CV 0.03\nConfiguraciones de panel, rosca y espiga",
      fr: "Valve à membrane à bascule 2 / 3 ports\n-75kPa à 0.25MPa, CV 0.03\nConfigurations panneau, filetée et cannelée",
      ko: "2포트 / 3포트 로커 다이어프램 밸브\n-75kPa~0.25MPa, CV 0.03\n패널형, 나사형 및 바브형 구성",
      ru: "Коромысловый мембранный клапан 2-порт / 3-порт\nот -75kPa до 0.25MPa, CV 0.03\nПанельная, резьбовая и штуцерная конфигурации",
    },

    image: "/images/products/valves/solenoid-valves/foreach-solenoid-valve-main.webp",
    imagePath: "/images/products/valves/solenoid-valves/foreach-solenoid-valve-main.webp",
    imageUrl: "/images/products/valves/solenoid-valves/foreach-solenoid-valve-main.webp",
    imageAlt: "6010 系列电磁阀",

    subtitle: "2通 / 3通摆臂隔膜阀，适用于试剂通断与阀组集成",
    description:
      "6010 系列电磁阀用于自动化分析仪器中的试剂通断、清洗液控制、废液控制和阀组集成。",

    summary:
      "2通 / 3通结构可选，压力范围 -75kPa~0.25MPa，CV 0.03。",

    tags: ["通断控制", "CV 0.03", "2通 / 3通"],

    specs: [
      { label: "使用压力范围", value: "-75kPa~0.25MPa" },
      { label: "孔口直径", value: "1.4mm" },
      { label: "流量系数CV", value: "0.03" },
    ],

    filter01: "电磁阀",
    filter02: "通断控制",
    filter03: "-75kPa~0.25MPa",
    filter04: "定制配置",

    filters: {
      filter01: "电磁阀",
      filter02: "通断控制",
      filter03: "-75kPa~0.25MPa",
      filter04: "定制配置",
    },

    href: "/products/valves/solenoid-valves",
    detailHref: "/products/valves/solenoid-valves",
    selectionHref: "/products",
    sourceType: "valve-selection",
  },
] as const;

export const valveSelectionProducts =
  valveProducts as unknown as ProductSelectionProduct[];
