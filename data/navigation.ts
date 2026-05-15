// data/navigation.ts
// 官网顶部导航数据配置文件
//
// 说明：
// 1. SiteHeader.tsx 只负责渲染导航样式
// 2. 具体有哪些导航、下拉菜单、卡片入口，都放在这个文件里
// 3. 后期如果接后台 / CMS，可以把这里的数据替换成接口返回数据
// 4. 当前第一阶段多数 href 先指向首页锚点，避免还没做详情页时出现 404

import type { LocaleCode } from "@/lib/i18n"; // 引入官网语言类型，保证多语言 key 一致

/* ================================
   多语言文本类型
   说明：
   每个导航文字都要支持 6 种语言
================================ */
export type LocalizedText = Record<LocaleCode, string>;

/* ================================
   多语言链接类型
   说明：
   1. 中文默认首页是 /
   2. 英文首页是 /en
   3. 其他语言同理
================================ */
export type LocalizedHref = Record<LocaleCode, string>;

/* ================================
   导航 key 类型
   说明：
   这里列出顶部一级导航的唯一标识
================================ */
export type NavigationKey =
  | "home"
  | "products"
  | "applications"
  | "resources"
  | "about"
  | "contact";

/* ================================
   手机端二级菜单类型
================================ */
export type MobileChildItem = {
  key: string; // 二级菜单唯一标识
  label: LocalizedText; // 二级菜单多语言名称
  href: LocalizedHref; // 二级菜单多语言链接
  order: number; // 排序，数字越小越靠前
  enabled: boolean; // 是否显示
};

/* ================================
   PC mega 下拉左侧分类类型
================================ */
export type MegaCategoryItem = {
  key: string; // 分类唯一标识
  title: LocalizedText; // 分类标题
  description: LocalizedText; // 分类说明
  order: number; // 排序
  enabled: boolean; // 是否显示
};

/* ================================
   PC mega 下拉右侧卡片类型
================================ */
export type MegaCardItem = {
  key: string; // 卡片唯一标识
  title: LocalizedText; // 卡片标题
  description: LocalizedText; // 卡片说明
  href: LocalizedHref; // 卡片链接
  order: number; // 排序
  enabled: boolean; // 是否显示
};

/* ================================
   PC mega 下拉整体类型
================================ */
export type MegaDropdown = {
  heading: LocalizedText; // 右侧内容区标题
  description: LocalizedText; // 右侧内容区说明
  footerText: LocalizedText; // 底部说明文字
  footerLinkLabel: LocalizedText; // 底部按钮文字
  footerHref: LocalizedHref; // 底部按钮链接
  categories: MegaCategoryItem[]; // 左侧分类
  cards: MegaCardItem[]; // 右侧入口卡片
};

/* ================================
   顶部一级导航类型
================================ */
export type NavigationItem = {
  key: NavigationKey; // 一级导航唯一标识
  label: LocalizedText; // 一级导航多语言名称
  href: LocalizedHref; // 一级导航链接
  order: number; // 排序
  enabled: boolean; // 是否显示
  dropdownType?: "none" | "mega"; // 是否有 PC 大下拉
  megaDropdown?: MegaDropdown; // PC 大下拉数据
  mobileChildren?: MobileChildItem[]; // 手机端二级菜单
};

/* ================================
   工具函数：生成首页锚点链接
================================ */
function anchorPath(anchor: string): LocalizedHref {
  return {
    "zh-CN": `/#${anchor}`,
    en: `/en#${anchor}`,
    es: `/es#${anchor}`,
    fr: `/fr#${anchor}`,
    ko: `/ko#${anchor}`,
    ru: `/ru#${anchor}`,
  };
}

/* ================================
   工具函数：生成首页链接
================================ */
function homePath(): LocalizedHref {
  return {
    "zh-CN": "/",
    en: "/en",
    es: "/es",
    fr: "/fr",
    ko: "/ko",
    ru: "/ru",
  };
}

/* ================================
   导航主数据
================================ */
export const navigationItems: NavigationItem[] = [
  {
    key: "home",
    label: {
      "zh-CN": "首页",
      en: "Home",
      es: "Inicio",
      fr: "Accueil",
      ko: "홈",
      ru: "Главная",
    },
    href: homePath(),
    order: 1,
    enabled: true,
    dropdownType: "none",
  },

  {
    key: "products",
    label: {
      "zh-CN": "产品中心",
      en: "Products",
      es: "Productos",
      fr: "Produits",
      ko: "제품",
      ru: "Продукты",
    },
    href: anchorPath("products"),
    order: 2,
    enabled: true,
    dropdownType: "mega",
    megaDropdown: {
      heading: {
        "zh-CN": "产品中心",
        en: "Products",
        es: "Productos",
        fr: "Produits",
        ko: "제품",
        ru: "Продукты",
      },
      description: {
        "zh-CN": "覆盖泵、阀、管路、连接件、采样针和传感器等微流体系统核心零部件。",
        en: "Core components for microfluidic systems, including pumps, valves, tubing, fittings, sampling probes, and sensors.",
        es: "Componentes clave para sistemas microfluídicos, incluidos bombas, válvulas, tubos, conexiones, sondas y sensores.",
        fr: "Composants clés pour systèmes microfluidiques : pompes, vannes, tubes, raccords, sondes et capteurs.",
        ko: "펌프, 밸브, 튜빙, 피팅, 샘플링 프로브 및 센서를 포함한 미세유체 시스템 핵심 부품입니다.",
        ru: "Ключевые компоненты микрофлюидных систем: насосы, клапаны, трубки, фитинги, пробоотборные иглы и датчики.",
      },
      footerText: {
        "zh-CN": "按产品类型、应用场景和系统参数快速了解恒永达产品矩阵。",
        en: "Explore FOREACH products by product type, application, and system requirements.",
        es: "Explore los productos FOREACH por tipo, aplicación y requisitos del sistema.",
        fr: "Découvrez les produits FOREACH par type, application et exigences système.",
        ko: "제품 유형, 적용 분야 및 시스템 요구사항별로 FOREACH 제품을 확인하세요.",
        ru: "Изучите продукты FOREACH по типу, применению и системным требованиям.",
      },
      footerLinkLabel: {
        "zh-CN": "查看全部产品 →",
        en: "View all products →",
        es: "Ver todos los productos →",
        fr: "Voir tous les produits →",
        ko: "전체 제품 보기 →",
        ru: "Все продукты →",
      },
      footerHref: anchorPath("products"),
      categories: [
        {
          key: "pumps",
          title: {
            "zh-CN": "泵类",
            en: "Pumps",
            es: "Bombas",
            fr: "Pompes",
            ko: "펌프",
            ru: "Насосы",
          },
          description: {
            "zh-CN": "隔膜泵、注射泵、移液泵、柱塞泵",
            en: "Diaphragm, syringe, pipetting, and piston pumps",
            es: "Bombas de diafragma, jeringa, pipeteo y pistón",
            fr: "Pompes à membrane, seringue, pipetage et piston",
            ko: "다이어프램, 시린지, 피펫팅, 피스톤 펌프",
            ru: "Мембранные, шприцевые, пипеточные и поршневые насосы",
          },
          order: 1,
          enabled: true,
        },
        {
          key: "valves",
          title: {
            "zh-CN": "阀类",
            en: "Valves",
            es: "Válvulas",
            fr: "Vannes",
            ko: "밸브",
            ru: "Клапаны",
          },
          description: {
            "zh-CN": "电磁阀、夹管阀、旋转阀、高压阀",
            en: "Solenoid, pinch, rotary, and high-pressure valves",
            es: "Válvulas solenoides, de pinza, rotativas y de alta presión",
            fr: "Électrovannes, vannes à pincement, rotatives et haute pression",
            ko: "솔레노이드, 핀치, 로터리, 고압 밸브",
            ru: "Соленоидные, пережимные, роторные и высоконапорные клапаны",
          },
          order: 2,
          enabled: true,
        },
        {
          key: "tubing",
          title: {
            "zh-CN": "管路",
            en: "Tubing",
            es: "Tubos",
            fr: "Tubes",
            ko: "튜빙",
            ru: "Трубки",
          },
          description: {
            "zh-CN": "软管、硬管、液路管线",
            en: "Flexible tubing, rigid tubing, and fluid lines",
            es: "Tubos flexibles, rígidos y líneas fluídicas",
            fr: "Tubes souples, rigides et lignes fluidiques",
            ko: "플렉시블 튜빙, 리지드 튜빙 및 유로 라인",
            ru: "Гибкие и жесткие трубки, жидкостные линии",
          },
          order: 3,
          enabled: true,
        },
        {
          key: "fittings",
          title: {
            "zh-CN": "连接件",
            en: "Fittings",
            es: "Conexiones",
            fr: "Raccords",
            ko: "피팅",
            ru: "Фитинги",
          },
          description: {
            "zh-CN": "接头、转接件、卡环接头、高压连接件",
            en: "Connectors, adapters, ferrule fittings, and high-pressure fittings",
            es: "Conectores, adaptadores y conexiones de alta presión",
            fr: "Connecteurs, adaptateurs, raccords à bague et haute pression",
            ko: "커넥터, 어댑터, 페룰 피팅 및 고압 피팅",
            ru: "Соединители, адаптеры, фитинги и высоконапорные соединения",
          },
          order: 4,
          enabled: true,
        },
        {
          key: "probes",
          title: {
            "zh-CN": "采样针",
            en: "Sampling Probes",
            es: "Sondas de muestreo",
            fr: "Sondes de prélèvement",
            ko: "샘플링 프로브",
            ru: "Пробоотборные иглы",
          },
          description: {
            "zh-CN": "样本针、试剂针、穿刺针、定制针组件",
            en: "Sample probes, reagent probes, piercing probes, and custom probe assemblies",
            es: "Sondas de muestra, reactivo, perforación y conjuntos personalizados",
            fr: "Sondes d’échantillon, de réactif, de perçage et ensembles personnalisés",
            ko: "샘플 프로브, 시약 프로브, 천공 프로브 및 맞춤형 프로브 어셈블리",
            ru: "Пробоотборные, реагентные, прокалывающие и заказные иглы",
          },
          order: 5,
          enabled: true,
        },
        {
          key: "sensors",
          title: {
            "zh-CN": "传感器",
            en: "Sensors",
            es: "Sensores",
            fr: "Capteurs",
            ko: "센서",
            ru: "Датчики",
          },
          description: {
            "zh-CN": "压力传感器、气泡检测器、电导率检测模块",
            en: "Pressure sensors, bubble detectors, and conductivity modules",
            es: "Sensores de presión, detectores de burbujas y módulos de conductividad",
            fr: "Capteurs de pression, détecteurs de bulles et modules de conductivité",
            ko: "압력 센서, 기포 감지기 및 전도도 모듈",
            ru: "Датчики давления, детекторы пузырьков и модули проводимости",
          },
          order: 6,
          enabled: true,
        },
      ],
      cards: [
        {
          key: "pumps-card",
          title: {
            "zh-CN": "泵类产品",
            en: "Pumps",
            es: "Bombas",
            fr: "Pompes",
            ko: "펌프",
            ru: "Насосы",
          },
          description: {
            "zh-CN": "定量、供液、移液与废液处理",
            en: "Metering, supply, pipetting, and waste handling",
            es: "Dosificación, suministro, pipeteo y residuos",
            fr: "Dosage, alimentation, pipetage et déchets",
            ko: "정량, 공급, 피펫팅 및 폐액 처리",
            ru: "Дозирование, подача, пипетирование и отходы",
          },
          href: anchorPath("products"),
          order: 1,
          enabled: true,
        },
        {
          key: "valves-card",
          title: {
            "zh-CN": "阀类产品",
            en: "Valves",
            es: "Válvulas",
            fr: "Vannes",
            ko: "밸브",
            ru: "Клапаны",
          },
          description: {
            "zh-CN": "流路切换、通断控制与高压控制",
            en: "Fluid path switching, on/off control, and high-pressure control",
            es: "Conmutación de flujo y control de alta presión",
            fr: "Commutation fluidique et contrôle haute pression",
            ko: "유로 전환, 개폐 제어 및 고압 제어",
            ru: "Переключение потоков и управление высоким давлением",
          },
          href: anchorPath("products"),
          order: 2,
          enabled: true,
        },
        {
          key: "tubing-card",
          title: {
            "zh-CN": "管路与连接",
            en: "Tubing & Fittings",
            es: "Tubos y conexiones",
            fr: "Tubes et raccords",
            ko: "튜빙 및 피팅",
            ru: "Трубки и фитинги",
          },
          description: {
            "zh-CN": "液路连接、密封与模块化装配",
            en: "Fluidic connection, sealing, and modular assembly",
            es: "Conexión, sellado y montaje modular",
            fr: "Connexion, étanchéité et assemblage modulaire",
            ko: "유체 연결, 밀봉 및 모듈형 조립",
            ru: "Соединение, герметизация и модульная сборка",
          },
          href: anchorPath("products"),
          order: 3,
          enabled: true,
        },
        {
          key: "sensors-card",
          title: {
            "zh-CN": "传感与检测",
            en: "Sensing & Detection",
            es: "Sensado y detección",
            fr: "Détection et mesure",
            ko: "센싱 및 감지",
            ru: "Измерение и контроль",
          },
          description: {
            "zh-CN": "压力、气泡、电导率等液路状态监测",
            en: "Pressure, bubble, and conductivity monitoring",
            es: "Monitoreo de presión, burbujas y conductividad",
            fr: "Surveillance pression, bulles et conductivité",
            ko: "압력, 기포 및 전도도 모니터링",
            ru: "Контроль давления, пузырьков и проводимости",
          },
          href: anchorPath("products"),
          order: 4,
          enabled: true,
        },
      ],
    },
    mobileChildren: [
      {
        key: "mobile-products-pumps",
        label: {
          "zh-CN": "泵类",
          en: "Pumps",
          es: "Bombas",
          fr: "Pompes",
          ko: "펌프",
          ru: "Насосы",
        },
        href: anchorPath("products"),
        order: 1,
        enabled: true,
      },
      {
        key: "mobile-products-valves",
        label: {
          "zh-CN": "阀类",
          en: "Valves",
          es: "Válvulas",
          fr: "Vannes",
          ko: "밸브",
          ru: "Клапаны",
        },
        href: anchorPath("products"),
        order: 2,
        enabled: true,
      },
      {
        key: "mobile-products-tubing",
        label: {
          "zh-CN": "管路",
          en: "Tubing",
          es: "Tubos",
          fr: "Tubes",
          ko: "튜빙",
          ru: "Трубки",
        },
        href: anchorPath("products"),
        order: 3,
        enabled: true,
      },
      {
        key: "mobile-products-fittings",
        label: {
          "zh-CN": "连接件",
          en: "Fittings",
          es: "Conexiones",
          fr: "Raccords",
          ko: "피팅",
          ru: "Фитинги",
        },
        href: anchorPath("products"),
        order: 4,
        enabled: true,
      },
      {
        key: "mobile-products-probes",
        label: {
          "zh-CN": "采样针",
          en: "Sampling Probes",
          es: "Sondas",
          fr: "Sondes",
          ko: "샘플링 프로브",
          ru: "Иглы",
        },
        href: anchorPath("products"),
        order: 5,
        enabled: true,
      },
      {
        key: "mobile-products-sensors",
        label: {
          "zh-CN": "传感器",
          en: "Sensors",
          es: "Sensores",
          fr: "Capteurs",
          ko: "센서",
          ru: "Датчики",
        },
        href: anchorPath("products"),
        order: 6,
        enabled: true,
      },
    ],
  },

  {
    key: "applications",
    label: {
      "zh-CN": "应用领域",
      en: "Applications",
      es: "Aplicaciones",
      fr: "Applications",
      ko: "응용 분야",
      ru: "Сферы",
    },
    href: anchorPath("applications"),
    order: 3,
    enabled: true,
    dropdownType: "mega",
    megaDropdown: {
      heading: {
        "zh-CN": "应用领域",
        en: "Applications",
        es: "Aplicaciones",
        fr: "Applications",
        ko: "응용 분야",
        ru: "Сферы применения",
      },
      description: {
        "zh-CN": "面向 IVD、生命科学、合成生物、高端分析仪器和实验室自动化设备提供液路核心部件支持。",
        en: "Fluidic component support for IVD, life sciences, synthetic biology, analytical instruments, and lab automation.",
        es: "Soporte de componentes fluídicos para IVD, ciencias de la vida, biología sintética, instrumentos analíticos y automatización de laboratorio.",
        fr: "Composants fluidiques pour IVD, sciences de la vie, biologie synthétique, instruments analytiques et automatisation de laboratoire.",
        ko: "IVD, 생명과학, 합성생물학, 분석기기 및 실험실 자동화용 유체 부품 지원.",
        ru: "Компоненты жидкостных систем для IVD, наук о жизни, синтетической биологии, аналитических приборов и лабораторной автоматизации.",
      },
      footerText: {
        "zh-CN": "从应用场景理解液路系统需求，匹配合适的泵、阀、传感器和连接方案。",
        en: "Understand fluidic requirements by application and match the right pumps, valves, sensors, and connections.",
        es: "Comprenda los requisitos fluídicos por aplicación y seleccione bombas, válvulas, sensores y conexiones.",
        fr: "Comprendre les exigences fluidiques par application et choisir les bons composants.",
        ko: "응용 분야별 유체 요구사항을 이해하고 적합한 부품을 선택하세요.",
        ru: "Подберите компоненты по требованиям конкретного применения.",
      },
      footerLinkLabel: {
        "zh-CN": "查看应用领域 →",
        en: "View applications →",
        es: "Ver aplicaciones →",
        fr: "Voir les applications →",
        ko: "응용 분야 보기 →",
        ru: "Смотреть применения →",
      },
      footerHref: anchorPath("applications"),
      categories: [
        {
          key: "ivd",
          title: {
            "zh-CN": "IVD 体外诊断",
            en: "IVD",
            es: "IVD",
            fr: "IVD",
            ko: "IVD",
            ru: "IVD",
          },
          description: {
            "zh-CN": "样本、试剂、清洗和废液液路",
            en: "Sample, reagent, wash, and waste fluidics",
            es: "Fluidos de muestra, reactivo, lavado y residuos",
            fr: "Fluidique échantillon, réactif, lavage et déchets",
            ko: "샘플, 시약, 세척 및 폐액 유로",
            ru: "Жидкостные системы образцов, реагентов, промывки и отходов",
          },
          order: 1,
          enabled: true,
        },
        {
          key: "life-science",
          title: {
            "zh-CN": "生命科学",
            en: "Life Sciences",
            es: "Ciencias de la vida",
            fr: "Sciences de la vie",
            ko: "생명과학",
            ru: "Науки о жизни",
          },
          description: {
            "zh-CN": "实验平台、样本处理和液体控制",
            en: "Experimental platforms, sample handling, and fluid control",
            es: "Plataformas experimentales y manejo de líquidos",
            fr: "Plateformes expérimentales et gestion des liquides",
            ko: "실험 플랫폼, 샘플 처리 및 유체 제어",
            ru: "Экспериментальные платформы и управление жидкостями",
          },
          order: 2,
          enabled: true,
        },
        {
          key: "synthetic-biology",
          title: {
            "zh-CN": "合成生物",
            en: "Synthetic Biology",
            es: "Biología sintética",
            fr: "Biologie synthétique",
            ko: "합성생물학",
            ru: "Синтетическая биология",
          },
          description: {
            "zh-CN": "自动化培养、加样和流体控制",
            en: "Automated culture, dispensing, and fluid control",
            es: "Cultivo automatizado, dosificación y control de fluidos",
            fr: "Culture automatisée, distribution et contrôle fluidique",
            ko: "자동 배양, 분주 및 유체 제어",
            ru: "Автоматизированное культивирование и дозирование",
          },
          order: 3,
          enabled: true,
        },
        {
          key: "analytical-instruments",
          title: {
            "zh-CN": "高端分析仪器",
            en: "Analytical Instruments",
            es: "Instrumentos analíticos",
            fr: "Instruments analytiques",
            ko: "분석기기",
            ru: "Аналитические приборы",
          },
          description: {
            "zh-CN": "高压、微量和高稳定性液路",
            en: "High-pressure, micro-volume, and stable fluidics",
            es: "Fluidos de alta presión, microvolumen y alta estabilidad",
            fr: "Fluidique haute pression, micro-volume et haute stabilité",
            ko: "고압, 미량 및 고안정 유체 시스템",
            ru: "Высоконапорные и микролитровые жидкостные системы",
          },
          order: 4,
          enabled: true,
        },
        {
          key: "lab-automation",
          title: {
            "zh-CN": "实验室自动化",
            en: "Laboratory Automation",
            es: "Automatización de laboratorio",
            fr: "Automatisation de laboratoire",
            ko: "실험실 자동화",
            ru: "Лабораторная автоматизация",
          },
          description: {
            "zh-CN": "多通道移液、分配和系统集成",
            en: "Multi-channel pipetting, dispensing, and system integration",
            es: "Pipeteo multicanal, dispensación e integración",
            fr: "Pipetage multicanal, distribution et intégration",
            ko: "다중 채널 피펫팅, 분주 및 시스템 통합",
            ru: "Многоканальное пипетирование и интеграция систем",
          },
          order: 5,
          enabled: true,
        },
      ],
      cards: [
        {
          key: "application-ivd-card",
          title: {
            "zh-CN": "IVD 体外诊断",
            en: "IVD",
            es: "IVD",
            fr: "IVD",
            ko: "IVD",
            ru: "IVD",
          },
          description: {
            "zh-CN": "样本处理、试剂分配、清洗与废液",
            en: "Sample handling, reagent dispensing, washing, and waste",
            es: "Muestras, reactivos, lavado y residuos",
            fr: "Échantillons, réactifs, lavage et déchets",
            ko: "샘플 처리, 시약 분주, 세척 및 폐액",
            ru: "Образцы, реагенты, промывка и отходы",
          },
          href: anchorPath("applications"),
          order: 1,
          enabled: true,
        },
        {
          key: "application-life-card",
          title: {
            "zh-CN": "生命科学",
            en: "Life Sciences",
            es: "Ciencias de la vida",
            fr: "Sciences de la vie",
            ko: "생명과학",
            ru: "Науки о жизни",
          },
          description: {
            "zh-CN": "微量液体处理和实验流程自动化",
            en: "Micro-volume liquid handling and workflow automation",
            es: "Manejo de microvolúmenes y automatización",
            fr: "Micro-volume et automatisation des flux",
            ko: "미량 액체 처리 및 워크플로 자동화",
            ru: "Микрообъемная обработка жидкостей",
          },
          href: anchorPath("applications"),
          order: 2,
          enabled: true,
        },
        {
          key: "application-analysis-card",
          title: {
            "zh-CN": "高端分析仪器",
            en: "Analytical Instruments",
            es: "Instrumentos analíticos",
            fr: "Instruments analytiques",
            ko: "분석기기",
            ru: "Аналитические приборы",
          },
          description: {
            "zh-CN": "高压阀、传感与稳定液路控制",
            en: "High-pressure valves, sensing, and stable fluidics",
            es: "Válvulas de alta presión y fluidos estables",
            fr: "Vannes haute pression et fluidique stable",
            ko: "고압 밸브, 센싱 및 안정적 유로",
            ru: "Высоконапорные клапаны и стабильная жидкостная система",
          },
          href: anchorPath("applications"),
          order: 3,
          enabled: true,
        },
        {
          key: "application-lab-card",
          title: {
            "zh-CN": "实验室自动化",
            en: "Laboratory Automation",
            es: "Automatización de laboratorio",
            fr: "Automatisation de laboratoire",
            ko: "실험실 자동화",
            ru: "Лабораторная автоматизация",
          },
          description: {
            "zh-CN": "多通道移液、模块化液路与集成支持",
            en: "Multi-channel pipetting, modular fluidics, and integration",
            es: "Pipeteo multicanal e integración fluídica",
            fr: "Pipetage multicanal et intégration fluidique",
            ko: "다중 채널 피펫팅 및 모듈형 유체 통합",
            ru: "Многоканальное пипетирование и интеграция",
          },
          href: anchorPath("applications"),
          order: 4,
          enabled: true,
        },
      ],
    },
    mobileChildren: [
      {
        key: "mobile-application-ivd",
        label: {
          "zh-CN": "IVD 体外诊断",
          en: "IVD",
          es: "IVD",
          fr: "IVD",
          ko: "IVD",
          ru: "IVD",
        },
        href: anchorPath("applications"),
        order: 1,
        enabled: true,
      },
      {
        key: "mobile-application-life",
        label: {
          "zh-CN": "生命科学",
          en: "Life Sciences",
          es: "Ciencias de la vida",
          fr: "Sciences de la vie",
          ko: "생명과학",
          ru: "Науки о жизни",
        },
        href: anchorPath("applications"),
        order: 2,
        enabled: true,
      },
      {
        key: "mobile-application-synbio",
        label: {
          "zh-CN": "合成生物",
          en: "Synthetic Biology",
          es: "Biología sintética",
          fr: "Biologie synthétique",
          ko: "합성생물학",
          ru: "Синтетическая биология",
        },
        href: anchorPath("applications"),
        order: 3,
        enabled: true,
      },
      {
        key: "mobile-application-analysis",
        label: {
          "zh-CN": "高端分析仪器",
          en: "Analytical Instruments",
          es: "Instrumentos analíticos",
          fr: "Instruments analytiques",
          ko: "분석기기",
          ru: "Аналитические приборы",
        },
        href: anchorPath("applications"),
        order: 4,
        enabled: true,
      },
      {
        key: "mobile-application-lab",
        label: {
          "zh-CN": "实验室自动化",
          en: "Lab Automation",
          es: "Automatización",
          fr: "Automatisation",
          ko: "실험실 자동화",
          ru: "Автоматизация",
        },
        href: anchorPath("applications"),
        order: 5,
        enabled: true,
      },
    ],
  },

  {
    key: "resources",
    label: {
      "zh-CN": "资源中心",
      en: "Resources",
      es: "Recursos",
      fr: "Ressources",
      ko: "자료실",
      ru: "Ресурсы",
    },
    href: anchorPath("resources"),
    order: 4,
    enabled: true,
    dropdownType: "mega",
    megaDropdown: {
      heading: {
        "zh-CN": "资源中心",
        en: "Resources",
        es: "Recursos",
        fr: "Ressources",
        ko: "자료실",
        ru: "Ресурсы",
      },
      description: {
        "zh-CN": "获取产品资料、产品目录、认证资质、选型指南、安装说明和技术文章。",
        en: "Access product documents, catalogs, certifications, selection guides, installation instructions, and technical articles.",
        es: "Acceda a documentos, catálogos, certificaciones, guías de selección, instrucciones y artículos técnicos.",
        fr: "Accédez aux documents, catalogues, certifications, guides de sélection, instructions et articles techniques.",
        ko: "제품 자료, 카탈로그, 인증, 선정 가이드, 설치 안내 및 기술 문서를 확인하세요.",
        ru: "Документация, каталоги, сертификаты, руководства по подбору, инструкции и технические статьи.",
      },
      footerText: {
        "zh-CN": "为工程选型、采购评估和系统集成提供可下载资料与技术支持内容。",
        en: "Downloadable resources for engineering selection, purchasing evaluation, and system integration.",
        es: "Recursos descargables para selección técnica, compras e integración.",
        fr: "Ressources téléchargeables pour la sélection, l’évaluation et l’intégration.",
        ko: "엔지니어링 선정, 구매 평가 및 시스템 통합을 위한 자료입니다.",
        ru: "Материалы для инженерного подбора, оценки закупок и интеграции.",
      },
      footerLinkLabel: {
        "zh-CN": "进入资源中心 →",
        en: "Go to resources →",
        es: "Ir a recursos →",
        fr: "Accéder aux ressources →",
        ko: "자료실 보기 →",
        ru: "Перейти к ресурсам →",
      },
      footerHref: anchorPath("resources"),
      categories: [
        {
          key: "downloads",
          title: {
            "zh-CN": "产品资料下载",
            en: "Product Downloads",
            es: "Descargas de productos",
            fr: "Téléchargements produits",
            ko: "제품 자료 다운로드",
            ru: "Загрузка материалов",
          },
          description: {
            "zh-CN": "规格书、图纸、资料包",
            en: "Datasheets, drawings, and document packages",
            es: "Fichas técnicas, planos y documentos",
            fr: "Fiches techniques, plans et documents",
            ko: "사양서, 도면 및 문서 패키지",
            ru: "Спецификации, чертежи и документы",
          },
          order: 1,
          enabled: true,
        },
        {
          key: "catalog",
          title: {
            "zh-CN": "产品目录",
            en: "Product Catalogs",
            es: "Catálogos",
            fr: "Catalogues",
            ko: "제품 카탈로그",
            ru: "Каталоги",
          },
          description: {
            "zh-CN": "综合目录、系列目录",
            en: "General catalogs and series catalogs",
            es: "Catálogos generales y de series",
            fr: "Catalogues généraux et de séries",
            ko: "종합 카탈로그 및 시리즈 카탈로그",
            ru: "Общие и серийные каталоги",
          },
          order: 2,
          enabled: true,
        },
        {
          key: "certifications",
          title: {
            "zh-CN": "认证与资质资料",
            en: "Certifications",
            es: "Certificaciones",
            fr: "Certifications",
            ko: "인증 자료",
            ru: "Сертификаты",
          },
          description: {
            "zh-CN": "质量体系、合规文件、企业资质",
            en: "Quality systems, compliance files, and company qualifications",
            es: "Sistemas de calidad, cumplimiento y cualificaciones",
            fr: "Systèmes qualité, conformité et qualifications",
            ko: "품질 시스템, 규정 준수 자료 및 기업 자격",
            ru: "Системы качества, соответствие и квалификации",
          },
          order: 3,
          enabled: true,
        },
        {
          key: "selection-guide",
          title: {
            "zh-CN": "选型指南",
            en: "Selection Guides",
            es: "Guías de selección",
            fr: "Guides de sélection",
            ko: "선정 가이드",
            ru: "Руководства по подбору",
          },
          description: {
            "zh-CN": "按流量、压力、介质和应用选型",
            en: "Selection by flow, pressure, media, and application",
            es: "Selección por caudal, presión, medio y aplicación",
            fr: "Sélection par débit, pression, fluide et application",
            ko: "유량, 압력, 매체 및 용도별 선정",
            ru: "Подбор по расходу, давлению, среде и применению",
          },
          order: 4,
          enabled: true,
        },
        {
          key: "installation",
          title: {
            "zh-CN": "安装说明",
            en: "Installation Instructions",
            es: "Instrucciones de instalación",
            fr: "Instructions d’installation",
            ko: "설치 안내",
            ru: "Инструкции по установке",
          },
          description: {
            "zh-CN": "安装、连接、维护和注意事项",
            en: "Installation, connection, maintenance, and notes",
            es: "Instalación, conexión, mantenimiento y notas",
            fr: "Installation, connexion, maintenance et remarques",
            ko: "설치, 연결, 유지보수 및 주의사항",
            ru: "Установка, подключение, обслуживание и примечания",
          },
          order: 5,
          enabled: true,
        },
        {
          key: "articles",
          title: {
            "zh-CN": "技术文章 / FAQ",
            en: "Technical Articles / FAQ",
            es: "Artículos técnicos / FAQ",
            fr: "Articles techniques / FAQ",
            ko: "기술 문서 / FAQ",
            ru: "Статьи / FAQ",
          },
          description: {
            "zh-CN": "液路知识、应用说明和常见问题",
            en: "Fluidic knowledge, application notes, and FAQs",
            es: "Conocimiento fluídico, aplicaciones y preguntas frecuentes",
            fr: "Connaissances fluidiques, notes d’application et FAQ",
            ko: "유체 지식, 적용 노트 및 FAQ",
            ru: "Знания о жидкостных системах, применения и FAQ",
          },
          order: 6,
          enabled: true,
        },
      ],
      cards: [
        {
          key: "resources-downloads-card",
          title: {
            "zh-CN": "产品资料下载",
            en: "Product Downloads",
            es: "Descargas",
            fr: "Téléchargements",
            ko: "자료 다운로드",
            ru: "Загрузки",
          },
          description: {
            "zh-CN": "规格书、图纸和产品资料包",
            en: "Datasheets, drawings, and product documents",
            es: "Fichas técnicas, planos y documentos",
            fr: "Fiches techniques, plans et documents",
            ko: "사양서, 도면 및 제품 문서",
            ru: "Спецификации, чертежи и документы",
          },
          href: anchorPath("resources"),
          order: 1,
          enabled: true,
        },
        {
          key: "resources-catalog-card",
          title: {
            "zh-CN": "产品目录",
            en: "Product Catalogs",
            es: "Catálogos",
            fr: "Catalogues",
            ko: "제품 카탈로그",
            ru: "Каталоги",
          },
          description: {
            "zh-CN": "快速了解产品系列和参数范围",
            en: "Explore product series and parameter ranges",
            es: "Consulte series y rangos de parámetros",
            fr: "Voir les séries et plages de paramètres",
            ko: "제품 시리즈 및 파라미터 범위 확인",
            ru: "Серии продуктов и диапазоны параметров",
          },
          href: anchorPath("resources"),
          order: 2,
          enabled: true,
        },
        {
          key: "resources-guide-card",
          title: {
            "zh-CN": "选型指南",
            en: "Selection Guides",
            es: "Guías de selección",
            fr: "Guides de sélection",
            ko: "선정 가이드",
            ru: "Руководства по подбору",
          },
          description: {
            "zh-CN": "帮助工程师快速匹配产品型号",
            en: "Help engineers match product models faster",
            es: "Ayuda a seleccionar modelos adecuados",
            fr: "Aide au choix rapide des modèles",
            ko: "엔지니어의 제품 모델 선정 지원",
            ru: "Помощь инженерам в подборе моделей",
          },
          href: anchorPath("resources"),
          order: 3,
          enabled: true,
        },
        {
          key: "resources-faq-card",
          title: {
            "zh-CN": "技术文章 / FAQ",
            en: "Technical Articles / FAQ",
            es: "Artículos / FAQ",
            fr: "Articles / FAQ",
            ko: "기술 문서 / FAQ",
            ru: "Статьи / FAQ",
          },
          description: {
            "zh-CN": "沉淀液路知识，方便 SEO 和 GEO 抓取",
            en: "Fluidic knowledge for SEO and AI search visibility",
            es: "Conocimiento fluídico para SEO y búsqueda IA",
            fr: "Connaissances fluidiques pour SEO et recherche IA",
            ko: "SEO 및 AI 검색 노출을 위한 유체 지식",
            ru: "Материалы для SEO и AI-поиска",
          },
          href: anchorPath("resources"),
          order: 4,
          enabled: true,
        },
      ],
    },
    mobileChildren: [
      {
        key: "mobile-resources-downloads",
        label: {
          "zh-CN": "产品资料下载",
          en: "Product Downloads",
          es: "Descargas",
          fr: "Téléchargements",
          ko: "자료 다운로드",
          ru: "Загрузки",
        },
        href: anchorPath("resources"),
        order: 1,
        enabled: true,
      },
      {
        key: "mobile-resources-catalog",
        label: {
          "zh-CN": "产品目录",
          en: "Product Catalogs",
          es: "Catálogos",
          fr: "Catalogues",
          ko: "제품 카탈로그",
          ru: "Каталоги",
        },
        href: anchorPath("resources"),
        order: 2,
        enabled: true,
      },
      {
        key: "mobile-resources-certifications",
        label: {
          "zh-CN": "认证与资质资料",
          en: "Certifications",
          es: "Certificaciones",
          fr: "Certifications",
          ko: "인증 자료",
          ru: "Сертификаты",
        },
        href: anchorPath("resources"),
        order: 3,
        enabled: true,
      },
      {
        key: "mobile-resources-guide",
        label: {
          "zh-CN": "选型指南",
          en: "Selection Guides",
          es: "Guías de selección",
          fr: "Guides de sélection",
          ko: "선정 가이드",
          ru: "Подбор",
        },
        href: anchorPath("resources"),
        order: 4,
        enabled: true,
      },
      {
        key: "mobile-resources-installation",
        label: {
          "zh-CN": "安装说明",
          en: "Installation",
          es: "Instalación",
          fr: "Installation",
          ko: "설치 안내",
          ru: "Установка",
        },
        href: anchorPath("resources"),
        order: 5,
        enabled: true,
      },
      {
        key: "mobile-resources-articles",
        label: {
          "zh-CN": "技术文章 / FAQ",
          en: "Articles / FAQ",
          es: "Artículos / FAQ",
          fr: "Articles / FAQ",
          ko: "기술 문서 / FAQ",
          ru: "Статьи / FAQ",
        },
        href: anchorPath("resources"),
        order: 6,
        enabled: true,
      },
    ],
  },

  {
    key: "about",
    label: {
      "zh-CN": "关于我们",
      en: "About Us",
      es: "Sobre nosotros",
      fr: "À propos",
      ko: "회사 소개",
      ru: "О нас",
    },
    href: anchorPath("about"),
    order: 5,
    enabled: true,
    dropdownType: "mega",
    megaDropdown: {
      heading: {
        "zh-CN": "关于我们",
        en: "About FOREACH",
        es: "Sobre FOREACH",
        fr: "À propos de FOREACH",
        ko: "FOREACH 소개",
        ru: "О FOREACH",
      },
      description: {
        "zh-CN": "了解恒永达的公司介绍、研发制造能力、质量体系、企业资质和全球服务能力。",
        en: "Learn about FOREACH, R&D and manufacturing capabilities, quality system, qualifications, and global service.",
        es: "Conozca FOREACH, I+D, fabricación, calidad, cualificaciones y servicio global.",
        fr: "Découvrez FOREACH, ses capacités R&D, fabrication, qualité, qualifications et service mondial.",
        ko: "FOREACH의 회사 소개, 연구개발, 제조, 품질 시스템 및 글로벌 서비스를 확인하세요.",
        ru: "Информация о FOREACH, разработке, производстве, качестве, квалификациях и глобальном сервисе.",
      },
      footerText: {
        "zh-CN": "展示公司实力和长期服务能力，帮助客户建立供应商信任。",
        en: "Present company capabilities and long-term service strength to build supplier trust.",
        es: "Muestre capacidades y servicio a largo plazo para generar confianza.",
        fr: "Présenter les capacités et le service à long terme pour renforcer la confiance.",
        ko: "기업 역량과 장기 서비스 능력을 보여 신뢰를 구축합니다.",
        ru: "Демонстрация возможностей компании и долгосрочного сервиса.",
      },
      footerLinkLabel: {
        "zh-CN": "了解恒永达 →",
        en: "Learn more →",
        es: "Más información →",
        fr: "En savoir plus →",
        ko: "자세히 보기 →",
        ru: "Подробнее →",
      },
      footerHref: anchorPath("about"),
      categories: [
        {
          key: "company-profile",
          title: {
            "zh-CN": "公司介绍",
            en: "Company Profile",
            es: "Perfil de la empresa",
            fr: "Profil de l’entreprise",
            ko: "회사 소개",
            ru: "Профиль компании",
          },
          description: {
            "zh-CN": "企业定位、发展历程与业务方向",
            en: "Positioning, development, and business direction",
            es: "Posicionamiento, desarrollo y dirección",
            fr: "Positionnement, développement et orientation",
            ko: "기업 포지셔닝, 발전 과정 및 사업 방향",
            ru: "Позиционирование, развитие и направления бизнеса",
          },
          order: 1,
          enabled: true,
        },
        {
          key: "rd-manufacturing",
          title: {
            "zh-CN": "研发制造能力",
            en: "R&D & Manufacturing",
            es: "I+D y fabricación",
            fr: "R&D et fabrication",
            ko: "R&D 및 제조",
            ru: "R&D и производство",
          },
          description: {
            "zh-CN": "研发、加工、生产和系统集成能力",
            en: "R&D, machining, production, and system integration",
            es: "I+D, mecanizado, producción e integración",
            fr: "R&D, usinage, production et intégration",
            ko: "R&D, 가공, 생산 및 시스템 통합",
            ru: "Разработка, обработка, производство и интеграция",
          },
          order: 2,
          enabled: true,
        },
        {
          key: "quality-system",
          title: {
            "zh-CN": "质量体系",
            en: "Quality System",
            es: "Sistema de calidad",
            fr: "Système qualité",
            ko: "품질 시스템",
            ru: "Система качества",
          },
          description: {
            "zh-CN": "质量管理、检测流程与稳定交付",
            en: "Quality management, inspection, and stable delivery",
            es: "Gestión de calidad, inspección y entrega estable",
            fr: "Gestion qualité, inspection et livraison stable",
            ko: "품질 관리, 검사 및 안정적 납품",
            ru: "Управление качеством, контроль и стабильные поставки",
          },
          order: 3,
          enabled: true,
        },
        {
          key: "qualifications",
          title: {
            "zh-CN": "企业资质",
            en: "Qualifications",
            es: "Cualificaciones",
            fr: "Qualifications",
            ko: "기업 자격",
            ru: "Квалификации",
          },
          description: {
            "zh-CN": "企业荣誉、认证和知识产权",
            en: "Honors, certifications, and intellectual property",
            es: "Reconocimientos, certificaciones y propiedad intelectual",
            fr: "Distinctions, certifications et propriété intellectuelle",
            ko: "수상, 인증 및 지식재산권",
            ru: "Награды, сертификаты и интеллектуальная собственность",
          },
          order: 4,
          enabled: true,
        },
        {
          key: "global-service",
          title: {
            "zh-CN": "全球服务",
            en: "Global Service",
            es: "Servicio global",
            fr: "Service mondial",
            ko: "글로벌 서비스",
            ru: "Глобальный сервис",
          },
          description: {
            "zh-CN": "海外客户支持与国际市场服务",
            en: "International customer support and global market service",
            es: "Soporte internacional y servicio global",
            fr: "Support international et service mondial",
            ko: "해외 고객 지원 및 글로벌 시장 서비스",
            ru: "Международная поддержка клиентов и сервис",
          },
          order: 5,
          enabled: true,
        },
      ],
      cards: [
        {
          key: "about-company-card",
          title: {
            "zh-CN": "公司介绍",
            en: "Company Profile",
            es: "Perfil de la empresa",
            fr: "Profil de l’entreprise",
            ko: "회사 소개",
            ru: "Профиль компании",
          },
          description: {
            "zh-CN": "了解恒永达的定位、业务和发展方向",
            en: "Understand FOREACH positioning and business direction",
            es: "Conozca el posicionamiento y dirección",
            fr: "Comprendre le positionnement et l’orientation",
            ko: "FOREACH의 포지셔닝과 사업 방향 확인",
            ru: "Позиционирование и направления бизнеса",
          },
          href: anchorPath("about"),
          order: 1,
          enabled: true,
        },
        {
          key: "about-rd-card",
          title: {
            "zh-CN": "研发制造能力",
            en: "R&D & Manufacturing",
            es: "I+D y fabricación",
            fr: "R&D et fabrication",
            ko: "R&D 및 제조",
            ru: "R&D и производство",
          },
          description: {
            "zh-CN": "从产品研发到批量制造的工程能力",
            en: "Engineering capability from R&D to production",
            es: "Capacidad desde I+D hasta producción",
            fr: "Capacité de la R&D à la production",
            ko: "R&D부터 생산까지의 엔지니어링 역량",
            ru: "От разработки до производства",
          },
          href: anchorPath("about"),
          order: 2,
          enabled: true,
        },
        {
          key: "about-quality-card",
          title: {
            "zh-CN": "质量体系",
            en: "Quality System",
            es: "Sistema de calidad",
            fr: "Système qualité",
            ko: "품질 시스템",
            ru: "Система качества",
          },
          description: {
            "zh-CN": "支撑稳定交付和长期合作",
            en: "Support stable delivery and long-term cooperation",
            es: "Apoyo a entregas estables y cooperación",
            fr: "Soutien à la livraison stable et coopération",
            ko: "안정적 납품과 장기 협력 지원",
            ru: "Стабильные поставки и долгосрочное сотрудничество",
          },
          href: anchorPath("about"),
          order: 3,
          enabled: true,
        },
        {
          key: "about-global-card",
          title: {
            "zh-CN": "全球服务",
            en: "Global Service",
            es: "Servicio global",
            fr: "Service mondial",
            ko: "글로벌 서비스",
            ru: "Глобальный сервис",
          },
          description: {
            "zh-CN": "面向全球客户提供销售和技术支持",
            en: "Sales and technical support for global customers",
            es: "Soporte comercial y técnico global",
            fr: "Support commercial et technique mondial",
            ko: "글로벌 고객 대상 영업 및 기술 지원",
            ru: "Продажи и техническая поддержка по всему миру",
          },
          href: anchorPath("about"),
          order: 4,
          enabled: true,
        },
      ],
    },
    mobileChildren: [
      {
        key: "mobile-about-company",
        label: {
          "zh-CN": "公司介绍",
          en: "Company Profile",
          es: "Empresa",
          fr: "Entreprise",
          ko: "회사 소개",
          ru: "Компания",
        },
        href: anchorPath("about"),
        order: 1,
        enabled: true,
      },
      {
        key: "mobile-about-rd",
        label: {
          "zh-CN": "研发制造能力",
          en: "R&D & Manufacturing",
          es: "I+D y fabricación",
          fr: "R&D et fabrication",
          ko: "R&D 및 제조",
          ru: "R&D и производство",
        },
        href: anchorPath("about"),
        order: 2,
        enabled: true,
      },
      {
        key: "mobile-about-quality",
        label: {
          "zh-CN": "质量体系",
          en: "Quality System",
          es: "Calidad",
          fr: "Qualité",
          ko: "품질 시스템",
          ru: "Качество",
        },
        href: anchorPath("about"),
        order: 3,
        enabled: true,
      },
      {
        key: "mobile-about-qualifications",
        label: {
          "zh-CN": "企业资质",
          en: "Qualifications",
          es: "Cualificaciones",
          fr: "Qualifications",
          ko: "기업 자격",
          ru: "Квалификации",
        },
        href: anchorPath("about"),
        order: 4,
        enabled: true,
      },
      {
        key: "mobile-about-global",
        label: {
          "zh-CN": "全球服务",
          en: "Global Service",
          es: "Servicio global",
          fr: "Service mondial",
          ko: "글로벌 서비스",
          ru: "Глобальный сервис",
        },
        href: anchorPath("about"),
        order: 5,
        enabled: true,
      },
    ],
  },

  {
    key: "contact",
    label: {
      "zh-CN": "联系我们",
      en: "Contact Us",
      es: "Contacto",
      fr: "Contact",
      ko: "문의하기",
      ru: "Контакты",
    },
    href: anchorPath("contact"),
    order: 6,
    enabled: true,
    dropdownType: "mega",
    megaDropdown: {
      heading: {
        "zh-CN": "联系我们",
        en: "Contact Us",
        es: "Contacto",
        fr: "Contact",
        ko: "문의하기",
        ru: "Контакты",
      },
      description: {
        "zh-CN": "提交询盘、获取联系方式、查看地址信息，或联系销售支持团队。",
        en: "Submit inquiries, find contact details, view address information, or reach sales support.",
        es: "Envíe consultas, consulte contactos, direcciones o soporte comercial.",
        fr: "Envoyez une demande, consultez les contacts, adresses ou support commercial.",
        ko: "문의 제출, 연락처, 주소 정보 및 영업 지원 확인.",
        ru: "Отправьте запрос, найдите контакты, адрес и поддержку продаж.",
      },
      footerText: {
        "zh-CN": "如果您正在进行产品选型或液路方案评估，可以直接提交需求。",
        en: "Submit your requirements if you are selecting products or evaluating a fluidic solution.",
        es: "Envíe sus requisitos para selección de productos o evaluación de soluciones.",
        fr: "Envoyez vos exigences pour la sélection ou l’évaluation d’une solution fluidique.",
        ko: "제품 선정 또는 유체 솔루션 검토 중이면 요구사항을 제출하세요.",
        ru: "Отправьте требования для подбора продукции или оценки решения.",
      },
      footerLinkLabel: {
        "zh-CN": "提交询盘 →",
        en: "Send inquiry →",
        es: "Enviar consulta →",
        fr: "Envoyer une demande →",
        ko: "문의 보내기 →",
        ru: "Отправить запрос →",
      },
      footerHref: anchorPath("contact"),
      categories: [
        {
          key: "inquiry-form",
          title: {
            "zh-CN": "询盘表单",
            en: "Inquiry Form",
            es: "Formulario de consulta",
            fr: "Formulaire de demande",
            ko: "문의 양식",
            ru: "Форма запроса",
          },
          description: {
            "zh-CN": "提交产品选型和项目需求",
            en: "Submit product selection and project requirements",
            es: "Envíe requisitos de selección y proyecto",
            fr: "Envoyer les besoins de sélection et de projet",
            ko: "제품 선정 및 프로젝트 요구사항 제출",
            ru: "Отправка требований к продукту и проекту",
          },
          order: 1,
          enabled: true,
        },
        {
          key: "contact-info",
          title: {
            "zh-CN": "联系方式",
            en: "Contact Information",
            es: "Información de contacto",
            fr: "Coordonnées",
            ko: "연락처",
            ru: "Контактная информация",
          },
          description: {
            "zh-CN": "电话、邮箱和销售联系入口",
            en: "Phone, email, and sales contact channels",
            es: "Teléfono, correo y canales comerciales",
            fr: "Téléphone, e-mail et contacts commerciaux",
            ko: "전화, 이메일 및 영업 연락 채널",
            ru: "Телефон, e-mail и каналы продаж",
          },
          order: 2,
          enabled: true,
        },
        {
          key: "address",
          title: {
            "zh-CN": "地址信息",
            en: "Address",
            es: "Dirección",
            fr: "Adresse",
            ko: "주소",
            ru: "Адрес",
          },
          description: {
            "zh-CN": "公司地址、地图和到访信息",
            en: "Company address, map, and visit information",
            es: "Dirección, mapa e información de visita",
            fr: "Adresse, carte et informations de visite",
            ko: "회사 주소, 지도 및 방문 정보",
            ru: "Адрес компании, карта и информация для визита",
          },
          order: 3,
          enabled: true,
        },
        {
          key: "sales-support",
          title: {
            "zh-CN": "销售支持入口",
            en: "Sales Support",
            es: "Soporte comercial",
            fr: "Support commercial",
            ko: "영업 지원",
            ru: "Поддержка продаж",
          },
          description: {
            "zh-CN": "选型咨询、资料获取和销售对接",
            en: "Selection consulting, document access, and sales connection",
            es: "Consulta de selección, documentos y ventas",
            fr: "Conseil de sélection, documents et relation commerciale",
            ko: "선정 상담, 자료 요청 및 영업 연결",
            ru: "Консультации, документы и связь с продажами",
          },
          order: 4,
          enabled: true,
        },
      ],
      cards: [
        {
          key: "contact-inquiry-card",
          title: {
            "zh-CN": "询盘表单",
            en: "Inquiry Form",
            es: "Consulta",
            fr: "Demande",
            ko: "문의 양식",
            ru: "Запрос",
          },
          description: {
            "zh-CN": "提交产品型号、应用场景和技术需求",
            en: "Submit product models, applications, and technical requirements",
            es: "Envíe modelos, aplicaciones y requisitos técnicos",
            fr: "Envoyer modèles, applications et besoins techniques",
            ko: "제품 모델, 적용 분야 및 기술 요구사항 제출",
            ru: "Модели, применения и технические требования",
          },
          href: anchorPath("contact"),
          order: 1,
          enabled: true,
        },
        {
          key: "contact-info-card",
          title: {
            "zh-CN": "联系方式",
            en: "Contact Details",
            es: "Contactos",
            fr: "Coordonnées",
            ko: "연락처",
            ru: "Контакты",
          },
          description: {
            "zh-CN": "获取邮箱、电话和业务联系信息",
            en: "Find email, phone, and business contact details",
            es: "Correo, teléfono e información comercial",
            fr: "E-mail, téléphone et contacts commerciaux",
            ko: "이메일, 전화 및 비즈니스 연락처 확인",
            ru: "E-mail, телефон и контакты",
          },
          href: anchorPath("contact"),
          order: 2,
          enabled: true,
        },
        {
          key: "contact-address-card",
          title: {
            "zh-CN": "地址信息",
            en: "Address",
            es: "Dirección",
            fr: "Adresse",
            ko: "주소",
            ru: "Адрес",
          },
          description: {
            "zh-CN": "查看公司地址和到访信息",
            en: "View company address and visit information",
            es: "Ver dirección e información de visita",
            fr: "Voir l’adresse et les informations de visite",
            ko: "회사 주소 및 방문 정보 확인",
            ru: "Адрес и информация для визита",
          },
          href: anchorPath("contact"),
          order: 3,
          enabled: true,
        },
        {
          key: "contact-sales-card",
          title: {
            "zh-CN": "销售支持入口",
            en: "Sales Support",
            es: "Soporte comercial",
            fr: "Support commercial",
            ko: "영업 지원",
            ru: "Поддержка продаж",
          },
          description: {
            "zh-CN": "对接选型、资料、报价和项目支持",
            en: "Selection, documents, quotation, and project support",
            es: "Selección, documentos, cotización y soporte",
            fr: "Sélection, documents, devis et support projet",
            ko: "선정, 자료, 견적 및 프로젝트 지원",
            ru: "Подбор, документы, коммерческое предложение и поддержка",
          },
          href: anchorPath("contact"),
          order: 4,
          enabled: true,
        },
      ],
    },
    mobileChildren: [
      {
        key: "mobile-contact-inquiry",
        label: {
          "zh-CN": "询盘表单",
          en: "Inquiry Form",
          es: "Consulta",
          fr: "Demande",
          ko: "문의 양식",
          ru: "Запрос",
        },
        href: anchorPath("contact"),
        order: 1,
        enabled: true,
      },
      {
        key: "mobile-contact-info",
        label: {
          "zh-CN": "联系方式",
          en: "Contact Details",
          es: "Contactos",
          fr: "Coordonnées",
          ko: "연락처",
          ru: "Контакты",
        },
        href: anchorPath("contact"),
        order: 2,
        enabled: true,
      },
      {
        key: "mobile-contact-address",
        label: {
          "zh-CN": "地址信息",
          en: "Address",
          es: "Dirección",
          fr: "Adresse",
          ko: "주소",
          ru: "Адрес",
        },
        href: anchorPath("contact"),
        order: 3,
        enabled: true,
      },
      {
        key: "mobile-contact-sales",
        label: {
          "zh-CN": "销售支持入口",
          en: "Sales Support",
          es: "Soporte comercial",
          fr: "Support commercial",
          ko: "영업 지원",
          ru: "Продажи",
        },
        href: anchorPath("contact"),
        order: 4,
        enabled: true,
      },
    ],
  },
];

/* ================================
   获取当前可显示导航
   说明：
   1. 过滤 enabled=false 的导航
   2. 按 order 排序
================================ */
export function getVisibleNavigationItems() {
  return navigationItems
    .filter((item) => item.enabled)
    .sort((a, b) => a.order - b.order);
}

/* ================================
   获取当前语言文本
   说明：
   1. 优先返回当前语言
   2. 如果当前语言没有，就回退到英文
   3. 如果英文也没有，就回退到中文
================================ */
export function getLocalizedText(text: LocalizedText, locale: LocaleCode) {
  return text[locale] || text.en || text["zh-CN"];
}

/* ================================
   获取当前语言链接
   说明：
   1. 优先返回当前语言链接
   2. 如果当前语言没有，就回退到英文链接
   3. 如果英文也没有，就回退到中文链接
================================ */
export function getLocalizedHref(href: LocalizedHref, locale: LocaleCode) {
  return href[locale] || href.en || href["zh-CN"];
}