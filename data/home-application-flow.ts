// data/home-application-flow.ts
// 首页第二屏「应用领域 × 核心部件」数据配置文件
//
// 说明：
// 1. 这个文件专门管理首页第二屏的文字、标签和图片路径
// 2. HomeApplicationFlowSection.tsx 只负责页面结构、滚动动画和交互
// 3. 后期要修改第二屏文案、图片、标签，只优先改这个文件
// 4. 当前支持语言：zh-CN / en / es / fr / ko / ru
// 5. 如果某个语言没有写，getHomeFlowText 会自动回退到中文

import type { LocaleCode } from "@/lib/i18n";

/* ================================
   多语言文本类型

   说明：
   1. Partial 表示不是每种语言都必须填写
   2. 但正式上线前，建议主要页面文字尽量补齐 6 种语言
================================ */
export type HomeFlowText = Partial<Record<LocaleCode, string>>;

/* ================================
   标签类型
================================ */
export type HomeFlowTag = {
  key: string; // 标签唯一标识
  label: HomeFlowText; // 标签文字，支持多语言
};

/* ================================
   PC 端应用卡片类型

   说明：
   className 用于控制 PC 端漂浮卡片的位置。
================================ */
export type HomeFlowApplicationCard = {
  key: string;
  className: "medical" | "synbio" | "lab" | "analysis" | "ivd";
  title: HomeFlowText;
  description: HomeFlowText;
  image: string;
  imageAlt: HomeFlowText;
  tags: HomeFlowTag[];
};

/* ================================
   手机端应用卡片类型

   说明：
   手机端不需要 className，因为手机端不使用 PC 漂浮定位。
================================ */
export type HomeFlowMobileApplicationCard = {
  key: string;
  title: HomeFlowText;
  description: HomeFlowText;
  image: string;
  imageAlt: HomeFlowText;
  tags: HomeFlowTag[];
};

/* ================================
   底部流程卡片类型
================================ */
export type HomeFlowProcessCard = {
  key: string;
  title: HomeFlowText;
  description: HomeFlowText;
};

/* ================================
   PC 端应用卡片：生命科学
================================ */
const lifeScienceCard: HomeFlowApplicationCard = {
  key: "life-science",
  className: "medical",
  title: {
    "zh-CN": "生命科学",
    en: "Life Sciences",
    es: "Ciencias de la vida",
    fr: "Sciences de la vie",
    ko: "생명과학",
    ru: "Науки о жизни",
  },
  description: {
    "zh-CN": "支持样本制备、微量液体转移、试剂制作与自动化实验流程。",
    en:
      "Sample preparation, micro-volume transfer, reagent handling, and automated workflows.",
    es:
      "Preparación de muestras, transferencia de microlitros, reactivos y flujos automatizados.",
    fr:
      "Préparation d’échantillons, transfert de micro-volumes, réactifs et flux automatisés.",
    ko:
      "시료 준비, 미량 액체 이송, 시약 준비 및 자동화 실험 프로세스를 지원합니다.",
    ru:
      "Подготовка образцов, перенос микролитров, работа с реагентами и автоматизация.",
  },
  image: "/images/home/application-flow/life-science.jpg",
  imageAlt: {
    "zh-CN": "生命科学液路应用场景",
    en: "Fluidic application scenario for life sciences",
    es: "Escenario fluídico para ciencias de la vida",
    fr: "Scénario fluidique pour les sciences de la vie",
    ko: "생명과학 유체 응용 장면",
    ru: "Сценарий применения жидкостных систем в науках о жизни",
  },
  tags: [
    {
      key: "syringe-pump",
      label: {
        "zh-CN": "注射泵",
        en: "Syringe Pump",
        es: "Bomba de jeringa",
        fr: "Pompe seringue",
        ko: "시린지 펌프",
        ru: "Шприцевой насос",
      },
    },
    {
      key: "pipetting-pump",
      label: {
        "zh-CN": "移液泵",
        en: "Pipetting Pump",
        es: "Bomba de pipeteo",
        fr: "Pompe de pipetage",
        ko: "피펫팅 펌프",
        ru: "Дозирующий насос",
      },
    },
    {
      key: "rotary-valve",
      label: {
        "zh-CN": "旋转阀",
        en: "Rotary Valve",
        es: "Válvula rotativa",
        fr: "Vanne rotative",
        ko: "로터리 밸브",
        ru: "Роторный клапан",
      },
    },
    {
      key: "sampling-probe",
      label: {
        "zh-CN": "采样针",
        en: "Sampling Probe",
        es: "Aguja de muestreo",
        fr: "Aiguille de prélèvement",
        ko: "샘플링 프로브",
        ru: "Пробоотборник",
      },
    },
  ],
};

/* ================================
   PC 端应用卡片：合成生物
================================ */
const syntheticBiologyCard: HomeFlowApplicationCard = {
  key: "synthetic-biology",
  className: "synbio",
  title: {
    "zh-CN": "合成生物",
    en: "Synthetic Biology",
    es: "Biología sintética",
    fr: "Biologie synthétique",
    ko: "합성생물학",
    ru: "Синтетическая биология",
  },
  description: {
    "zh-CN": "支持多通道试剂分配、连续流体控制、培养液路与流路切换。",
    en:
      "Multi-channel dispensing, continuous fluid control, culture lines, and flow switching.",
    es:
      "Dosificación multicanal, control continuo, líneas de cultivo y conmutación de flujo.",
    fr:
      "Distribution multicanal, contrôle continu, circuits de culture et commutation fluidique.",
    ko:
      "다채널 시약 분주, 연속 유체 제어, 배양 유로 및 유로 전환을 지원합니다.",
    ru:
      "Многоканальное дозирование, непрерывное управление, контуры культивирования и переключение потоков.",
  },
  image: "/images/home/application-flow/synthetic-biology.jpg",
  imageAlt: {
    "zh-CN": "合成生物液路应用场景",
    en: "Fluidic application scenario for synthetic biology",
    es: "Escenario fluídico para biología sintética",
    fr: "Scénario fluidique pour la biologie synthétique",
    ko: "합성생물학 유체 응용 장면",
    ru: "Сценарий применения жидкостных систем в синтетической биологии",
  },
  tags: [
    {
      key: "multi-channel-pump",
      label: {
        "zh-CN": "多通道泵",
        en: "Multi-channel Pump",
        es: "Bomba multicanal",
        fr: "Pompe multicanal",
        ko: "다채널 펌프",
        ru: "Многоканальный насос",
      },
    },
    {
      key: "rotary-valve",
      label: {
        "zh-CN": "旋转阀",
        en: "Rotary Valve",
        es: "Válvula rotativa",
        fr: "Vanne rotative",
        ko: "로터리 밸브",
        ru: "Роторный клапан",
      },
    },
    {
      key: "solenoid-valve",
      label: {
        "zh-CN": "电磁阀",
        en: "Solenoid Valve",
        es: "Válvula solenoide",
        fr: "Électrovanne",
        ko: "솔레노이드 밸브",
        ru: "Электроклапан",
      },
    },
    {
      key: "tubing-component",
      label: {
        "zh-CN": "管路组件",
        en: "Tubing Components",
        es: "Componentes de tubos",
        fr: "Composants de tubulure",
        ko: "튜빙 구성품",
        ru: "Трубки",
      },
    },
  ],
};

/* ================================
   PC 端应用卡片：实验室自动化
================================ */
const labAutomationCard: HomeFlowApplicationCard = {
  key: "lab-automation",
  className: "lab",
  title: {
    "zh-CN": "实验室自动化",
    en: "Laboratory Automation",
    es: "Automatización de laboratorio",
    fr: "Automatisation de laboratoire",
    ko: "실험실 자동화",
    ru: "Лабораторная автоматизация",
  },
  description: {
    "zh-CN": "面向自动加样、液体转移、废液处理与模块化液路集成。",
    en:
      "Automated dispensing, liquid transfer, waste handling, and modular fluidic integration.",
    es:
      "Dosificación automatizada, transferencia de líquidos, residuos e integración modular.",
    fr:
      "Dosage automatisé, transfert de liquides, gestion des déchets et intégration modulaire.",
    ko:
      "자동 분주, 액체 이송, 폐액 처리 및 모듈형 유체 시스템 통합에 적합합니다.",
    ru:
      "Автоматическое дозирование, перенос жидкостей, обработка отходов и модульная интеграция.",
  },
  image: "/images/home/application-flow/lab-automation.jpg",
  imageAlt: {
    "zh-CN": "实验室自动化液路应用场景",
    en: "Fluidic application scenario for laboratory automation",
    es: "Escenario fluídico para automatización de laboratorio",
    fr: "Scénario fluidique pour l’automatisation de laboratoire",
    ko: "실험실 자동화 유체 응용 장면",
    ru: "Сценарий применения жидкостных систем в лабораторной автоматизации",
  },
  tags: [
    {
      key: "diaphragm-pump",
      label: {
        "zh-CN": "隔膜泵",
        en: "Diaphragm Pump",
        es: "Bomba de diafragma",
        fr: "Pompe à membrane",
        ko: "다이어프램 펌프",
        ru: "Мембранный насос",
      },
    },
    {
      key: "sensor",
      label: {
        "zh-CN": "传感器",
        en: "Sensor",
        es: "Sensor",
        fr: "Capteur",
        ko: "센서",
        ru: "Датчик",
      },
    },
    {
      key: "tubing-component",
      label: {
        "zh-CN": "管路组件",
        en: "Tubing Components",
        es: "Componentes de tubos",
        fr: "Composants de tubulure",
        ko: "튜빙 구성품",
        ru: "Трубки",
      },
    },
  ],
};

/* ================================
   PC 端应用卡片：高端分析仪器
================================ */
const analyticalInstrumentsCard: HomeFlowApplicationCard = {
  key: "analytical-instruments",
  className: "analysis",
  title: {
    "zh-CN": "高端分析仪器",
    en: "High-end Analytical Instruments",
    es: "Instrumentos analíticos",
    fr: "Instruments d’analyse",
    ko: "고급 분석 장비",
    ru: "Аналитические приборы",
  },
  description: {
    "zh-CN": "用于高压进样、流路切换、压力监测和检测前处理。",
    en:
      "High-pressure injection, flow switching, pressure monitoring, and sample pretreatment.",
    es:
      "Inyección a alta presión, conmutación de flujo, control de presión y pretratamiento.",
    fr:
      "Injection haute pression, commutation fluidique, contrôle de pression et prétraitement.",
    ko:
      "고압 주입, 유로 전환, 압력 모니터링 및 검출 전 처리에 사용됩니다.",
    ru:
      "Ввод под высоким давлением, переключение потоков, контроль давления и подготовка проб.",
  },
  image: "/images/home/application-flow/analytical-instruments.jpg",
  imageAlt: {
    "zh-CN": "高端分析仪器液路应用场景",
    en: "Fluidic application scenario for analytical instruments",
    es: "Escenario fluídico para instrumentos analíticos",
    fr: "Scénario fluidique pour les instruments d’analyse",
    ko: "분석 장비 유체 응용 장면",
    ru: "Сценарий применения жидкостных систем в аналитических приборах",
  },
  tags: [
    {
      key: "high-pressure-valve",
      label: {
        "zh-CN": "高压阀",
        en: "High-pressure Valve",
        es: "Válvula de alta presión",
        fr: "Vanne haute pression",
        ko: "고압 밸브",
        ru: "Высоконапорный клапан",
      },
    },
    {
      key: "piston-pump",
      label: {
        "zh-CN": "柱塞泵",
        en: "Piston Pump",
        es: "Bomba de pistón",
        fr: "Pompe à piston",
        ko: "피스톤 펌프",
        ru: "Поршневой насос",
      },
    },
    {
      key: "pressure-sensor",
      label: {
        "zh-CN": "压力传感器",
        en: "Pressure Sensor",
        es: "Sensor de presión",
        fr: "Capteur de pression",
        ko: "압력 센서",
        ru: "Датчик давления",
      },
    },
    {
      key: "peek-tubing",
      label: {
        "zh-CN": "PEEK 管路",
        en: "PEEK Tubing",
        es: "Tubo PEEK",
        fr: "Tube PEEK",
        ko: "PEEK 튜빙",
        ru: "Трубки PEEK",
      },
    },
  ],
};

/* ================================
   PC 端应用卡片：IVD
================================ */
const ivdCard: HomeFlowApplicationCard = {
  key: "ivd",
  className: "ivd",
  title: {
    "zh-CN": "IVD 体外诊断",
    en: "IVD",
    es: "IVD",
    fr: "IVD",
    ko: "IVD",
    ru: "IVD",
  },
  description: {
    "zh-CN": "用于样本处理、试剂分配、清洗废液、流路切换与状态监测。",
    en:
      "Sample processing, reagent dispensing, washing, flow switching, and status monitoring.",
    es:
      "Procesamiento de muestras, dosificación, lavado, conmutación y monitoreo.",
    fr:
      "Traitement des échantillons, dosage, lavage, commutation et surveillance.",
    ko:
      "시료 처리, 시약 분주, 세척, 폐액 처리, 유로 전환 및 상태 모니터링에 사용됩니다.",
    ru:
      "Обработка образцов, дозирование, промывка, переключение потоков и мониторинг.",
  },
  image: "/images/home/application-flow/ivd.jpg",
  imageAlt: {
    "zh-CN": "IVD 体外诊断液路应用场景",
    en: "Fluidic application scenario for IVD",
    es: "Escenario fluídico para IVD",
    fr: "Scénario fluidique pour l’IVD",
    ko: "IVD 유체 응용 장면",
    ru: "Сценарий применения жидкостных систем в IVD",
  },
  tags: [
    {
      key: "solenoid-valve",
      label: {
        "zh-CN": "电磁阀",
        en: "Solenoid Valve",
        es: "Válvula solenoide",
        fr: "Électrovanne",
        ko: "솔레노이드 밸브",
        ru: "Электроклапан",
      },
    },
    {
      key: "bubble-detector",
      label: {
        "zh-CN": "气泡检测器",
        en: "Bubble Detector",
        es: "Detector de burbujas",
        fr: "Détecteur de bulles",
        ko: "기포 감지기",
        ru: "Детектор пузырьков",
      },
    },
    {
      key: "pressure-sensor",
      label: {
        "zh-CN": "压力传感器",
        en: "Pressure Sensor",
        es: "Sensor de presión",
        fr: "Capteur de pression",
        ko: "압력 센서",
        ru: "Датчик давления",
      },
    },
  ],
};

/* ================================
   把 PC 应用卡片转换成手机端应用卡片

   说明：
   手机端不需要 className，所以这里把 className 去掉。
================================ */
function toMobileApplicationCard(
  card: HomeFlowApplicationCard
): HomeFlowMobileApplicationCard {
  return {
    key: card.key,
    title: card.title,
    description: card.description,
    image: card.image,
    imageAlt: card.imageAlt,
    tags: card.tags,
  };
}

/* ================================
   首页第二屏数据
================================ */
export const homeApplicationFlowData = {
  // 第二屏模块 id
  // 对应页面里的 <section id="applications">
  sectionId: "applications",

  /* ================================
     第二屏主标题
  ================================ */
  titleLine1: {
    "zh-CN": "让流体系统",
    en: "Fluidic System",
    es: "Sistema fluídico",
    fr: "Système fluidique",
    ko: "하나의 유체 시스템",
    ru: "Жидкостная",
  },

  titleLine2: {
    "zh-CN": "更简单",
    en: "Simplifies Complex Flow",
    es: "Simplifica flujos complejos",
    fr: "Simplifie les flux complexes",
    ko: "복잡한 유체 흐름을 더 쉽게",
    ru: "система проще",
  },

  description: {
    "zh-CN":
      "面向 IVD、生命科学、合成生物、高端分析仪器与实验室自动化设备，恒永达提供泵、阀、传感器、管路、连接件、采样针等核心液路组合支持。",
    en:
      "FOREACH provides integrated fluidic solutions for IVD, life sciences, synthetic biology, analytical instruments, and laboratory automation—from pumps and valves to sensors, tubing, and connections.",
    es:
      "FOREACH ofrece soluciones fluídicas integradas para IVD, ciencias de la vida, biología sintética, instrumentación analítica y automatización de laboratorios, desde bombas y válvulas hasta sensores y conexiones.",
    fr:
      "FOREACH fournit des solutions fluidiques intégrées pour l’IVD, les sciences de la vie, la biologie synthétique, l’analyse et l’automatisation de laboratoire, des pompes et vannes aux capteurs et raccords.",
    ko:
      "IVD, 생명과학, 합성생물학, 고급 분석 장비 및 실험실 자동화를 위해 FOREACH는 펌프, 밸브, 센서, 튜빙, 피팅, 샘플링 프로브 등 핵심 유체 부품을 포함한 통합 유체 제어 지원을 제공합니다.",
    ru:
      "FOREACH предлагает комплексные жидкостные решения для IVD, наук о жизни, синтетической биологии, аналитических приборов и автоматизации лабораторий — от насосов и клапанов до датчиков и соединений.",
  },

  /* ================================
     第二屏能力标签
  ================================ */
  capabilityTags: [
    {
      key: "precision-pump",
      label: {
        "zh-CN": "精密泵",
        en: "Precision Pumps",
        es: "Bombas de precisión",
        fr: "Pompes de précision",
        ko: "정밀 펌프",
        ru: "Точные насосы",
      },
    },
    {
      key: "fluid-control-valve",
      label: {
        "zh-CN": "流体控制阀",
        en: "Fluid Control Valves",
        es: "Válvulas de control de fluidos",
        fr: "Vannes de contrôle des fluides",
        ko: "유체 제어 밸브",
        ru: "Жидкостные клапаны",
      },
    },
    {
      key: "sensor",
      label: {
        "zh-CN": "传感器",
        en: "Sensors",
        es: "Sensores",
        fr: "Capteurs",
        ko: "센서",
        ru: "Датчики",
      },
    },
    {
      key: "tubing-component",
      label: {
        "zh-CN": "管路组件",
        en: "Tubing Components",
        es: "Componentes de tubos",
        fr: "Composants de tubulure",
        ko: "튜빙 구성품",
        ru: "Трубки",
      },
    },
    {
      key: "fluidic-connection",
      label: {
        "zh-CN": "流体连接",
        en: "Fluidic Connections",
        es: "Conexiones fluídicas",
        fr: "Connexions fluidiques",
        ko: "유체 연결",
        ru: "Соединения",
      },
    },
  ],

  /* ================================
     第二屏按钮
  ================================ */
  actions: {
    applicationsLabel: {
      "zh-CN": "应用领域",
      en: "Applications",
      es: "Aplicaciones",
      fr: "Applications",
      ko: "응용 분야",
      ru: "Области применения",
    },
    productsLabel: {
      "zh-CN": "产品中心",
      en: "Products",
      es: "Productos",
      fr: "Produits",
      ko: "제품",
      ru: "Продукция",
    },
  },

  /* ================================
     第二屏无障碍辅助文案

     说明：
     这些文字普通用户一般看不到，主要给屏幕阅读器使用。
  ================================ */
  ariaLabels: {
    mobileApplications: {
      "zh-CN": "手机端应用场景展示",
      en: "Mobile application showcase",
      es: "Visualización móvil de aplicaciones",
      fr: "Présentation mobile des applications",
      ko: "모바일 응용 분야 표시",
      ru: "Мобильный показ областей применения",
    },
    applicationScreen: {
      "zh-CN": "应用场景展示屏",
      en: "Application showcase screen",
      es: "Pantalla de aplicaciones",
      fr: "Écran de présentation des applications",
      ko: "응용 분야 표시 화면",
      ru: "Экран демонстрации областей применения",
    },
    applicationTabs: {
      "zh-CN": "应用领域切换",
      en: "Application switching",
      es: "Cambio de aplicaciones",
      fr: "Changement d’application",
      ko: "응용 분야 전환",
      ru: "Переключение областей применения",
    },
  },

  /* ================================
     电视机展示区域

     说明：
     MAKE FLOW EASY 属于品牌视觉口号，先保持英文不翻译。
  ================================ */
  tv: {
    image: "/images/home/flow-tv-bg.webp",
    sloganPrefix: "MAKE",
    sloganHighlight: "FLOW",
    sloganSuffix: "EASY",
  },

  /* ================================
     PC 端应用卡片数据

     注意：
     PC 端继续保持 5 个卡片，避免破坏原来的漂浮布局。
  ================================ */
  applicationCards: [
    lifeScienceCard,
    syntheticBiologyCard,
    labAutomationCard,
    analyticalInstrumentsCard,
    ivdCard,
  ] satisfies HomeFlowApplicationCard[],

  /* ================================
     手机端应用按钮数据

     说明：
     1. 手机端显示 5 个按钮
     2. 5 个按钮全部复用 PC 端数据
          3. 以后手机端内容全部从这里读取，不再写在组件里
  ================================ */
  mobileApplicationCards: [
    toMobileApplicationCard(analyticalInstrumentsCard),
    toMobileApplicationCard(lifeScienceCard),
    toMobileApplicationCard(syntheticBiologyCard),
    toMobileApplicationCard(labAutomationCard),
    toMobileApplicationCard(ivdCard),
  ] satisfies HomeFlowMobileApplicationCard[],

  /* ================================
     底部流程卡片数据
  ================================ */
  processCards: [
    {
      key: "sample-processing",
      title: {
        "zh-CN": "样本处理",
        en: "Sample Processing",
        es: "Procesamiento de muestras",
        fr: "Traitement des échantillons",
        ko: "시료 처리",
        ru: "Обработка образцов",
      },
      description: {
        "zh-CN": "样本吸取、转移、混合、预处理与检测前液路控制。",
        en:
          "Sample aspiration, transfer, mixing, pretreatment, and fluidic control before detection.",
        es:
          "Aspiración, transferencia, mezcla, pretratamiento y control antes de la detección.",
        fr:
          "Aspiration, transfert, mélange, prétraitement et contrôle avant détection.",
        ko:
          "시료 흡입, 이송, 혼합, 전처리 및 검출 전 유체 제어.",
        ru:
          "Аспирация, перенос, смешивание, предварительная обработка и контроль перед анализом.",
      },
    },
    {
      key: "reagent-dispensing",
      title: {
        "zh-CN": "试剂分配",
        en: "Reagent Dispensing",
        es: "Distribución de reactivos",
        fr: "Distribution de réactifs",
        ko: "시약 분주",
        ru: "Дозирование реагентов",
      },
      description: {
        "zh-CN": "微量定量、多通道加样、连续供液与稳定分配。",
        en:
          "Micro-volume dosing, multi-channel dispensing, continuous supply, and stable distribution.",
        es:
          "Dosificación de microlitros, dispensación multicanal y distribución estable.",
        fr:
          "Dosage de micro-volumes, distribution multicanal et alimentation stable.",
        ko:
          "미량 정량, 다채널 분주, 연속 공급 및 안정적인 분배.",
        ru:
          "Микродозирование, многоканальная подача и стабильное распределение.",
      },
    },
    {
      key: "fluid-path-switching",
      title: {
        "zh-CN": "流路切换",
        en: "Flow Path Switching",
        es: "Conmutación de flujo",
        fr: "Commutation fluidique",
        ko: "유로 전환",
        ru: "Переключение потоков",
      },
      description: {
        "zh-CN": "多试剂、多样本、多检测通道之间的精准切换。",
        en:
          "Precise switching among multiple reagents, samples, and detection channels.",
        es:
          "Conmutación precisa entre reactivos, muestras y canales de detección.",
        fr:
          "Commutation précise entre réactifs, échantillons et canaux de détection.",
        ko:
          "여러 시약, 시료 및 검출 채널 간의 정밀한 전환.",
        ru:
          "Точное переключение между реагентами, образцами и каналами детекции.",
      },
    },
    {
      key: "status-monitoring",
      title: {
        "zh-CN": "状态检测",
        en: "Status Monitoring",
        es: "Monitoreo de estado",
        fr: "Surveillance d’état",
        ko: "상태 모니터링",
        ru: "Мониторинг состояния",
      },
      description: {
        "zh-CN": "压力、气泡、电导率等关键液路状态监测与反馈。",
        en:
          "Monitoring of pressure, bubbles, conductivity, and other key fluidic states.",
        es:
          "Monitoreo de presión, burbujas, conductividad y otros estados clave.",
        fr:
          "Surveillance de la pression, des bulles, de la conductivité et des états clés.",
        ko:
          "압력, 기포, 전도도 등 주요 유체 상태에 대한 모니터링 및 피드백.",
        ru:
          "Контроль давления, пузырьков, проводимости и других ключевых состояний.",
      },
    },
  ] satisfies HomeFlowProcessCard[],
};

/* ================================
   多语言读取函数

   说明：
   1. 优先读取当前语言
   2. 当前语言没有，就回退中文
   3. 中文没有，就回退英文
   4. 最后返回空字符串
================================ */
export function getHomeFlowText(text: HomeFlowText, locale: LocaleCode) {
  return text[locale] || text["zh-CN"] || text.en || "";
}

/* ================================
   首页第二屏后端接口路径

   说明：
   1. 当前第一阶段默认使用本地 data 数据
   2. 后期如果开启后端接口，可以通过这个函数生成请求地址
   3. HomeApplicationFlowSection.tsx 会调用这个函数，而不是把接口地址写死在组件里
================================ */

export function getHomeApplicationFlowApiPath(locale: LocaleCode) { // 定义首页第二屏后端接口路径生成函数
  return `/api/home/application-flow?locale=${encodeURIComponent(locale)}`; // 根据当前语言生成接口地址，并对语言参数做安全编码
} // getHomeApplicationFlowApiPath 函数结束
