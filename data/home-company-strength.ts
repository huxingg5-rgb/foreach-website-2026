// data/home-company-strength.ts
// 首页第三 / 第四屏「公司介绍 + 企业优势」数据配置文件
//
// 说明：
// 1. 这个文件专门管理首页公司介绍、数据卡片、能力轮播、企业优势等文字
// 2. HomeCompanyStrengthSection.tsx 后面只负责布局、动画和渲染
// 3. 当前支持语言：zh-CN / en / es / fr / ko / ru
// 4. 如果某个语言没有写，getHomeCompanyText 会自动回退到中文

import type { LocaleCode } from "@/lib/i18n";

/* ================================
   多语言文本类型
================================ */

export type HomeCompanyText = Partial<Record<LocaleCode, string>>;

/* ================================
   公司数据卡片类型
================================ */

export type HomeCompanyMetric = {
  key: string; // 数据卡片唯一标识
  value: number; // 数字
  suffix: HomeCompanyText; // 数字后缀，例如 + / 类 / h
  label: HomeCompanyText; // 数据说明
};

/* ================================
   公司能力轮播类型
================================ */

export type HomeCompanyHonor = {
  key: string; // 唯一标识
  title: HomeCompanyText; // 能力 / 资质标题
};

/* ================================
   企业优势卡片类型
================================ */

export type HomeCompanyAdvantage = {
  key: string; // 唯一标识
  className:
    | "home-advantage-rd"
    | "home-advantage-manufacturing"
    | "home-advantage-quality"
    | "home-advantage-custom"
    | "home-advantage-service"; // 原有 CSS 类名，不能乱改
  index: string; // 序号，例如 01
  title: HomeCompanyText; // 优势标题
  brief: HomeCompanyText; // 简短说明
  detail: HomeCompanyText; // 详细说明
};

/* ================================
   首页公司实力模块数据
================================ */

export const homeCompanyStrengthData = {
  /* ================================
     第三屏：公司介绍区域
  ================================ */

  about: {
    sectionId: "about",

    title: {
      "zh-CN": "走进恒永达科技",
      en: "ABOUT FOREACH",
      es: "ABOUT FOREACH",
      fr: "ABOUT FOREACH",
      ko: "ABOUT FOREACH",
      ru: "ABOUT FOREACH",
    },

    subtitle: {
      "zh-CN": "研发 制造 销售 售后",
      en: "R&D · Manufacturing · Sales · Service",
      es: "I+D · Fabricación · Ventas · Servicio",
      fr: "R&D · Fabrication · Ventes · Service",
      ko: "R&D · 제조 · 영업 · 서비스",
      ru: "R&D · Производство · Продажи · Сервис",
    },

    videoAriaLabel: {
      "zh-CN": "公司能力展示",
      en: "Company capability showcase",
      es: "Presentación de capacidades de la empresa",
      fr: "Présentation des capacités de l’entreprise",
      ko: "회사 역량 소개",
      ru: "Демонстрация возможностей компании",
    },

    videoPlayAriaLabel: {
      "zh-CN": "播放公司视频",
      en: "Play company video",
      es: "Reproducir video de la empresa",
      fr: "Lire la vidéo de l’entreprise",
      ko: "회사 영상 재생",
      ru: "Воспроизвести видео компании",
    },

    video: { // 公司介绍视频数据，后期可以整体替换为后端接口返回的数据
  src: "/images/home/foreach-company-intro.mp4", // 公司介绍视频地址，当前使用 public 目录下的本地视频
  posterSrc: "/images/home/tv-foreach.png", // 公司介绍视频封面地址，当前使用 public 目录下的本地图片
  posterAlt: { // 公司介绍视频封面图片 alt 文案，方便 SEO 和无障碍识别
    "zh-CN": "恒永达科技公司介绍视频封面", // 中文封面 alt 文案
    en: "FOREACH Technology company introduction video cover", // 英文封面 alt 文案
    es: "Portada del video de presentación de FOREACH Technology", // 西班牙语封面 alt 文案
    fr: "Couverture de la vidéo de présentation de FOREACH Technology", // 法语封面 alt 文案
    ko: "FOREACH Technology 회사 소개 영상 커버", // 韩语封面 alt 文案
    ru: "Обложка видео о компании FOREACH Technology", // 俄语封面 alt 文案
  }, // posterAlt 结束
}, // video 数据结束

    introTitle: {
      "zh-CN": "公司介绍",
      en: "Company Profile",
      es: "Perfil de la empresa",
      fr: "Profil de l’entreprise",
      ko: "회사 소개",
      ru: "Профиль компании",
    },

    introDescription: {
      "zh-CN":
        "恒永达科技（股票代码：874030）成立于 2012 年，是国家级专精特新“小巨人”企业、深圳市瞪羚企业、国家高新技术企业及广东省工程技术研究中心认定单位。公司始终专注于微流体系统核心零部件与液路解决方案，深耕泵、阀、采样针、连接件、橡塑管、驱动器、传感器等关键零部件的研发与制造，产品广泛应用于生命科学、合成生物、高端检测、IVD 和实验室自动化等领域，形成高精度、全场景的微流体解决方案体系，并持续推动高端仪器设备核心流体零部件的国产化替代。",
      en:
        "Founded in 2012, FOREACH Technology focuses on core microfluidic components and fluidic solutions. As a specialized and innovation-driven enterprise, the company develops and manufactures pumps, valves, sampling probes, fittings, tubing, drivers, sensors, and other key fluid control components for life sciences, synthetic biology, high-end testing, IVD, and laboratory automation applications.",
      es:
        "Fundada en 2012, FOREACH Technology se centra en componentes microfluídicos clave y soluciones fluídicas. La empresa desarrolla y fabrica bombas, válvulas, agujas de muestreo, conectores, tubos, controladores, sensores y otros componentes esenciales para ciencias de la vida, biología sintética, pruebas avanzadas, IVD y automatización de laboratorios.",
      fr:
        "Fondée en 2012, FOREACH Technology se concentre sur les composants microfluidiques clés et les solutions fluidiques. L’entreprise développe et fabrique des pompes, vannes, aiguilles de prélèvement, raccords, tubes, contrôleurs, capteurs et autres composants essentiels pour les sciences de la vie, la biologie synthétique, les analyses avancées, l’IVD et l’automatisation de laboratoire.",
      ko:
        "2012년에 설립된 FOREACH Technology는 마이크로플루이딕 핵심 부품과 유체 솔루션에 집중합니다. 펌프, 밸브, 샘플링 프로브, 피팅, 튜빙, 드라이버, 센서 등 핵심 유체 제어 부품을 생명과학, 합성생물학, 고급 검사, IVD 및 실험실 자동화 분야에 제공합니다.",
      ru:
        "Компания FOREACH Technology, основанная в 2012 году, специализируется на ключевых компонентах микрофлюидных систем и жидкостных решениях. Компания разрабатывает и производит насосы, клапаны, пробоотборные иглы, соединители, трубки, драйверы, датчики и другие ключевые компоненты для наук о жизни, синтетической биологии, высокоточных испытаний, IVD и лабораторной автоматизации.",
    },
    
contactButton: {
  "zh-CN": "查看更多",
  en: "Learn More",
  es: "Ver más",
  fr: "En savoir plus",
  ko: "더 보기",
  ru: "Подробнее",
},
  },

  /* ================================
     第三屏：公司数据卡片
  ================================ */

    metrics: [
    {
      key: "microfluidic-experience",
      value: 13,
      suffix: {
        "zh-CN": "+",
        en: "+",
        es: "+",
        fr: "+",
        ko: "+",
        ru: "+",
      },
      label: {
        "zh-CN": "微流体领域经验",
        en: "years of microfluidic experience",
        es: "años de experiencia en microfluídica",
        fr: "ans d’expérience en microfluidique",
        ko: "마이크로플루이딕 분야 경험",
        ru: "лет опыта в микрофлюидике",
      },
    },
    {
      key: "served-customers",
      value: 2500,
      suffix: {
        "zh-CN": "+",
        en: "+",
        es: "+",
        fr: "+",
        ko: "+",
        ru: "+",
      },
      label: {
        "zh-CN": "累计服务客户",
        en: "customers served",
        es: "clientes atendidos",
        fr: "clients servis",
        ko: "누적 고객 수",
        ru: "обслуженных клиентов",
      },
    },
    {
      key: "intellectual-property",
      value: 96,
      suffix: {
        "zh-CN": "项",
        en: " IP rights",
        es: " derechos de PI",
        fr: " droits de PI",
        ko: "건",
        ru: " объектов ИС",
      },
      label: {
        "zh-CN": "知识产权",
        en: "intellectual property rights",
        es: "derechos de propiedad intelectual",
        fr: "droits de propriété intellectuelle",
        ko: "지식재산권",
        ru: "объектов интеллектуальной собственности",
      },
    },
    {
      key: "product-types",
      value: 5000,
      suffix: {
        "zh-CN": "+",
        en: "+",
        es: "+",
        fr: "+",
        ko: "+",
        ru: "+",
      },
      label: {
        "zh-CN": "产品种类",
        en: "product types",
        es: "tipos de productos",
        fr: "types de produits",
        ko: "제품 종류",
        ru: "видов продукции",
      },
    },
  ] satisfies HomeCompanyMetric[],

  /* ================================
     第三屏：公司能力与资质轮播
  ================================ */

  honorsAriaLabel: {
    "zh-CN": "公司能力与资质",
    en: "Company capabilities and qualifications",
    es: "Capacidades y cualificaciones de la empresa",
    fr: "Capacités et qualifications de l’entreprise",
    ko: "회사 역량 및 인증",
    ru: "Возможности и квалификации компании",
  },

  honors: [
    {
      key: "national-high-tech",
      title: {
        "zh-CN": "国家高新技术企业",
        en: "National High-Tech Enterprise",
        es: "Empresa nacional de alta tecnología",
        fr: "Entreprise nationale de haute technologie",
        ko: "국가 첨단기술기업",
        ru: "Национальное высокотехнологичное предприятие",
      },
    },
    {
      key: "engineering-center",
      title: {
        "zh-CN": "广东省工程技术研究中心",
        en: "Guangdong Engineering Technology Research Center",
        es: "Centro de investigación de tecnología de ingeniería de Guangdong",
        fr: "Centre de recherche en technologie d’ingénierie du Guangdong",
        ko: "광둥성 공정기술 연구센터",
        ru: "Инженерно-технологический исследовательский центр провинции Гуандун",
      },
    },
    {
      key: "little-giant",
      title: {
        "zh-CN": "国家级专精特新“小巨人”企业",
        en: "National Specialized and Innovative “Little Giant” Enterprise",
        es: "Empresa nacional especializada e innovadora «Little Giant»",
        fr: "Entreprise nationale spécialisée et innovante « Little Giant »",
        ko: "국가급 전정특신 ‘작은 거인’ 기업",
        ru: "Национальное специализированное инновационное предприятие «Малый гигант»",
      },
    },
    {
      key: "gazelle-enterprise",
      title: {
        "zh-CN": "深圳市瞪羚企业",
        en: "Shenzhen Gazelle Enterprise",
        es: "Empresa gacela de Shenzhen",
        fr: "Entreprise gazelle de Shenzhen",
        ko: "선전시 가젤 기업",
        ru: "Газель-предприятие города Шэньчжэнь",
      },
    },
    {
      key: "iso-13485",
      title: {
        "zh-CN": "ISO 13485 医疗器械质量管理体系",
        en: "ISO 13485 Medical Device Quality Management System",
        es: "Sistema de gestión de calidad de dispositivos médicos ISO 13485",
        fr: "Système de management de la qualité des dispositifs médicaux ISO 13485",
        ko: "ISO 13485 의료기기 품질경영시스템",
        ru: "Система менеджмента качества медицинских изделий ISO 13485",
      },
    },
    {
      key: "iso-9001",
      title: {
        "zh-CN": "ISO 9001 质量管理体系",
        en: "ISO 9001 Quality Management System",
        es: "Sistema de gestión de calidad ISO 9001",
        fr: "Système de management de la qualité ISO 9001",
        ko: "ISO 9001 품질경영시스템",
        ru: "Система менеджмента качества ISO 9001",
      },
    },
  ] satisfies HomeCompanyHonor[],

  /* ================================
     第四屏：企业优势
  ================================ */

  advantagesSection: {
    /*
      第四屏顶部小标题

      说明：
      1. 中文首页不再显示 COMPANY STRENGTH
      2. 这里先保留字段，是为了不破坏组件结构
      3. 后面 CSS 会把这一行隐藏掉
    */
    kicker: {
      "zh-CN": "",
      en: "",
      es: "",
      fr: "",
      ko: "",
      ru: "",
    },

    /*
      第四屏主标题

      中文逻辑：
      不再强调“我们有什么”，而是强调“客户得到什么”。
      这样比单纯写企业实力更有转化价值。
    */
    title: {
      "zh-CN": "让液路系统更稳更可控",
      en: "Making Complex Fluidic Systems More Stable and Controllable",
      es: "Hacemos que los sistemas fluídicos complejos sean más estables y controlables",
      fr: "Rendre les systèmes fluidiques complexes plus stables et maîtrisables",
      ko: "복잡한 유체 시스템을 더 안정적이고 제어 가능하게",
      ru: "Делаем сложные жидкостные системы более стабильными и управляемыми",
    },

    /*
      第四屏副标题

      说明：
      1. 覆盖研发、制造、质量、定制、服务能力
      2. 点出目标行业
      3. 强调长期可靠支持
    */
    description: {
      "zh-CN":
        "围绕研发、制造、质量与定制服务能力，为 IVD、生命科学、高端分析仪器和实验室自动化客户提供长期可靠的流体控制支持。",
      en:
        "Built on R&D, manufacturing, quality control, and customization capabilities, FOREACH provides long-term fluid control support for IVD, life science, analytical instrument, and laboratory automation customers.",
      es:
        "Con capacidades en I+D, fabricación, control de calidad y personalización, FOREACH ofrece soporte fiable de control de fluidos para clientes de IVD, ciencias de la vida, instrumentos analíticos y automatización de laboratorio.",
      fr:
        "Grâce à ses capacités en R&D, fabrication, qualité et personnalisation, FOREACH accompagne durablement les clients des secteurs IVD, sciences de la vie, instruments analytiques et automatisation de laboratoire.",
      ko:
        "연구개발, 제조, 품질 관리 및 맞춤형 서비스 역량을 기반으로 FOREACH는 IVD, 생명과학, 고급 분석기기 및 실험실 자동화 고객에게 장기적이고 안정적인 유체 제어 지원을 제공합니다.",
      ru:
        "Опираясь на возможности НИОКР, производства, контроля качества и индивидуальной разработки, FOREACH обеспечивает долгосрочную поддержку в области управления жидкостными системами для IVD, наук о жизни, аналитических приборов и лабораторной автоматизации.",
    },
  },

  advantages: [
    {
      key: "rd",
      className: "home-advantage-rd",
      index: "01",
      title: {
        "zh-CN": "研发能力",
        en: "R&D Capability",
        es: "Capacidad de I+D",
        fr: "Capacité R&D",
        ko: "R&D 역량",
        ru: "Возможности R&D",
      },
      brief: {
        "zh-CN": "围绕泵、阀、传感器和液路模块持续打磨产品结构。",
        en:
          "Continuously improving product structures around pumps, valves, sensors, and fluidic modules.",
        es:
          "Mejora continua de estructuras de producto alrededor de bombas, válvulas, sensores y módulos fluídicos.",
        fr:
          "Amélioration continue des structures produits autour des pompes, vannes, capteurs et modules fluidiques.",
        ko:
          "펌프, 밸브, 센서 및 유체 모듈을 중심으로 제품 구조를 지속적으로 개선합니다.",
        ru:
          "Постоянная доработка конструкций насосов, клапанов, датчиков и жидкостных модулей.",
      },
      detail: {
        "zh-CN": "支持从样机验证、参数匹配到批量应用的工程化协同。",
        en:
          "Supporting engineering collaboration from prototype validation and parameter matching to mass application.",
        es:
          "Soporte de ingeniería desde validación de prototipos y ajuste de parámetros hasta aplicación en serie.",
        fr:
          "Support d’ingénierie de la validation prototype et de l’adaptation des paramètres jusqu’à l’application en série.",
        ko:
          "시제품 검증, 파라미터 매칭부터 양산 적용까지 엔지니어링 협업을 지원합니다.",
        ru:
          "Инженерное сопровождение от проверки прототипов и подбора параметров до серийного применения.",
      },
    },
    {
      key: "manufacturing",
      className: "home-advantage-manufacturing",
      index: "02",
      title: {
        "zh-CN": "制造交付",
        en: "Manufacturing & Delivery",
        es: "Fabricación y entrega",
        fr: "Fabrication et livraison",
        ko: "제조 및 납품",
        ru: "Производство и поставка",
      },
      brief: {
        "zh-CN": "建立稳定的装配、测试和交付流程。",
        en: "Establishing stable assembly, testing, and delivery processes.",
        es: "Procesos estables de ensamblaje, prueba y entrega.",
        fr: "Processus stables d’assemblage, de test et de livraison.",
        ko: "안정적인 조립, 테스트 및 납품 프로세스를 구축합니다.",
        ru: "Стабильные процессы сборки, испытаний и поставки.",
      },
      detail: {
        "zh-CN": "面向 IVD、生命科学和自动化设备客户提供持续供货支持。",
        en:
          "Providing continuous supply support for IVD, life science, and automation equipment customers.",
        es:
          "Soporte de suministro continuo para clientes de IVD, ciencias de la vida y equipos automatizados.",
        fr:
          "Support d’approvisionnement continu pour les clients IVD, sciences de la vie et équipements automatisés.",
        ko:
          "IVD, 생명과학 및 자동화 장비 고객을 위한 지속적인 공급 지원을 제공합니다.",
        ru:
          "Непрерывная поддержка поставок для клиентов IVD, наук о жизни и автоматизированного оборудования.",
      },
    },
    {
      key: "quality",
      className: "home-advantage-quality",
      index: "03",
      title: {
        "zh-CN": "质量体系",
        en: "Quality System",
        es: "Sistema de calidad",
        fr: "Système qualité",
        ko: "품질 시스템",
        ru: "Система качества",
      },
      brief: {
        "zh-CN": "关注关键尺寸、流量、压力、寿命与一致性。",
        en:
          "Focusing on key dimensions, flow rate, pressure, lifetime, and consistency.",
        es:
          "Enfoque en dimensiones clave, caudal, presión, vida útil y consistencia.",
        fr:
          "Attention portée aux dimensions clés, au débit, à la pression, à la durée de vie et à la constance.",
        ko:
          "핵심 치수, 유량, 압력, 수명 및 일관성에 중점을 둡니다.",
        ru:
          "Контроль ключевых размеров, расхода, давления, срока службы и стабильности.",
      },
      detail: {
        "zh-CN": "用过程管理和测试验证降低客户整机集成风险。",
        en:
          "Reducing customer integration risks through process management and testing validation.",
        es:
          "Reducción del riesgo de integración mediante gestión de procesos y validación de pruebas.",
        fr:
          "Réduction des risques d’intégration grâce à la gestion des processus et à la validation par tests.",
        ko:
          "공정 관리와 테스트 검증을 통해 고객의 장비 통합 리스크를 줄입니다.",
        ru:
          "Снижение рисков интеграции за счет управления процессами и испытательной валидации.",
      },
    },
    {
      key: "custom",
      className: "home-advantage-custom",
      index: "04",
      title: {
        "zh-CN": "定制支持",
        en: "Customization Support",
        es: "Soporte personalizado",
        fr: "Support personnalisé",
        ko: "맞춤 지원",
        ru: "Кастомизация",
      },
      brief: {
        "zh-CN": "可根据空间、接口、介质和控制方式调整方案。",
        en:
          "Solutions can be adjusted according to space, interfaces, media, and control methods.",
        es:
          "Las soluciones pueden ajustarse según espacio, interfaces, medios y métodos de control.",
        fr:
          "Les solutions peuvent être adaptées selon l’espace, les interfaces, les fluides et les méthodes de contrôle.",
        ko:
          "공간, 인터페이스, 매체 및 제어 방식에 따라 솔루션을 조정할 수 있습니다.",
        ru:
          "Решения могут адаптироваться под пространство, интерфейсы, среды и способы управления.",
      },
      detail: {
        "zh-CN": "帮助客户把核心部件更顺畅地嵌入整机液路系统。",
        en:
          "Helping customers integrate core components more smoothly into complete fluidic systems.",
        es:
          "Ayuda a integrar componentes clave con mayor fluidez en sistemas fluídicos completos.",
        fr:
          "Aide à intégrer plus facilement les composants clés dans les systèmes fluidiques complets.",
        ko:
          "핵심 부품을 전체 유체 시스템에 더 원활하게 통합할 수 있도록 지원합니다.",
        ru:
          "Помощь в более плавной интеграции ключевых компонентов в жидкостные системы оборудования.",
      },
    },
    {
      key: "service",
      className: "home-advantage-service",
      index: "05",
      title: {
        "zh-CN": "技术服务",
        en: "Technical Service",
        es: "Servicio técnico",
        fr: "Service technique",
        ko: "기술 서비스",
        ru: "Технический сервис",
      },
      brief: {
        "zh-CN": "从选型、测试到问题定位提供工程支持。",
        en:
          "Providing engineering support from selection and testing to issue diagnosis.",
        es:
          "Soporte de ingeniería desde selección y pruebas hasta diagnóstico de problemas.",
        fr:
          "Support d’ingénierie de la sélection et des tests jusqu’au diagnostic des problèmes.",
        ko:
          "제품 선정, 테스트부터 문제 진단까지 엔지니어링 지원을 제공합니다.",
        ru:
          "Инженерная поддержка от подбора и испытаний до диагностики проблем.",
      },
      detail: {
        "zh-CN": "让产品沟通不止停留在规格表，而是落到真实应用场景。",
        en:
          "Making product communication go beyond datasheets and into real application scenarios.",
        es:
          "Llevando la comunicación del producto más allá de la ficha técnica hacia aplicaciones reales.",
        fr:
          "Faire passer la communication produit au-delà des fiches techniques vers les applications réelles.",
        ko:
          "제품 커뮤니케이션이 사양서에 머물지 않고 실제 응용 현장으로 이어지게 합니다.",
        ru:
          "Перевод коммуникации о продукте от спецификаций к реальным сценариям применения.",
      },
    },
  ] satisfies HomeCompanyAdvantage[],
};

/* ================================
   多语言读取函数

   说明：
   1. 优先读取当前语言
   2. 当前语言没有，就回退中文
   3. 中文没有，就回退英文
   4. 最后返回空字符串
================================ */

export function getHomeCompanyText(text: HomeCompanyText, locale: LocaleCode) {
  return text[locale] || text["zh-CN"] || text.en || "";
}
