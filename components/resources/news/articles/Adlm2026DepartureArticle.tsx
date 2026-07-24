import styles from "../NewsArticleClient.module.css";

type SupportedLocale =
  | "zh-CN"
  | "en"
  | "es"
  | "fr"
  | "ko"
  | "ru";

type InformationItem = {
  label: string;
  value: string;
};

type DisplayItem = {
  title: string;
  description: string;
};

type ArticleCopy = {
  introductionTitle: string;
  introductionParagraphs: string[];

  eventInformationTitle: string;
  eventInformation: InformationItem[];

  presentationTitle: string;
  presentationParagraphs: string[];
  presentationLabel: string;
  presentationItems: DisplayItem[];

  applicationTitle: string;
  applicationParagraphs: string[];

  experienceTitle: string;
  experienceParagraphs: string[];

  recognitionTitle: string;
  recognitionParagraph: string;
  recognitionLabel: string;
  recognitionItems: DisplayItem[];
};

export type AdlmSupportCopy = {
  title: string;
  description: string;
  buttonLabel: string;
  href: string;
};

const ARTICLE_COPY: Record<SupportedLocale, ArticleCopy> = {
  "zh-CN": {
    introductionTitle: "恒永达将参加 ADLM 2026",
    introductionParagraphs: [
      "近日，恒永达市场总监一行启程赴美，将参加于 2026 年 7 月 26 日至 30 日在美国加利福尼亚州阿纳海姆举办的 ADLM 2026。",
      "本次展会，恒永达将在 4105 展位与来自体外诊断、生命科学、分析仪器和实验室自动化等领域的客户、工程师及行业伙伴进行现场交流。",
    ],

    eventInformationTitle: "展会信息",
    eventInformation: [
      {
        label: "展会",
        value: "ADLM 2026",
      },
      {
        label: "时间",
        value: "2026 年 7 月 26 日至 30 日",
      },
      {
        label: "地点",
        value: "美国加利福尼亚州阿纳海姆",
      },
      {
        label: "展位",
        value: "4105",
      },
    ],

    presentationTitle:
      "展示微流体核心部件与液路解决方案",
    presentationParagraphs: [
      "展会期间，恒永达将集中展示面向仪器设备应用的微流体核心产品与液路解决方案，覆盖液体输送、精密计量、流路切换、压力监测、气泡检测及流体连接等关键环节。",
    ],
    presentationLabel: "重点展示",
    presentationItems: [
      {
        title: "精密泵",
        description:
          "用于精密计量、液体输送及自动化移液。",
      },
      {
        title: "微型阀",
        description:
          "用于流路切换、通断控制和复杂液路管理。",
      },
      {
        title: "流体连接件与管路",
        description:
          "支持不同管径、螺纹、材料及介质需求。",
      },
      {
        title: "压力与气泡检测",
        description:
          "用于液路状态监测及设备运行判断。",
      },
      {
        title: "定制化液路方案",
        description:
          "提供从产品选型到系统集成的工程支持。",
      },
      {
        title: "材料兼容与替代支持",
        description:
          "协助客户处理材料选择、流体连接及现有产品替代需求。",
      },
    ],

    applicationTitle: "服务多领域仪器应用",
    applicationParagraphs: [
      "围绕体外诊断、生命科学、实验室自动化、分析仪器及相关设备应用，恒永达持续为客户提供微流体核心部件、材料兼容支持、产品选型建议及定制化液路方案。",
      "通过稳定可靠的产品与面向应用的工程支持，恒永达帮助客户提升流体控制精度，简化液路系统集成，并满足仪器小型化、自动化和复杂流路设计需求。",
    ],

    experienceTitle: "长期专注微流体精密控制",
    experienceParagraphs: [
      "恒永达长期专注于微流体精密控制技术的研发与产业化，持续完善泵、阀、针、接头、管路、传感器及液路系统支持能力。",
    ],

    recognitionTitle:
      "专业能力与成长实力获得持续认可",
    recognitionParagraph:
      "凭借在技术研发、产品创新和产业化应用方面的持续积累，恒永达的专业能力、创新能力和成长实力获得进一步认可。",
    recognitionLabel: "企业认可",
    recognitionItems: [
      {
        title: "国家级专精特新“小巨人”企业",
        description:
          "专业化、精细化、特色化和创新能力获得国家级认可。",
      },
      {
        title: "深圳市瞪羚企业",
        description:
          "企业创新能力、成长速度与市场发展实力获得进一步认可。",
      },
    ],
  },

  en: {
    introductionTitle: "Meet FOREACH in Anaheim",
    introductionParagraphs: [
      "FOREACH will participate in ADLM 2026, taking place in Anaheim, California, from July 26 to 30, 2026.",
      "At Booth 4105, our team will meet with instrument manufacturers, engineers, and industry partners to discuss fluid control challenges, component selection, and fluidic system integration.",
    ],

    eventInformationTitle: "Event Information",
    eventInformation: [
      {
        label: "Event",
        value: "ADLM 2026",
      },
      {
        label: "Date",
        value: "July 26–30, 2026",
      },
      {
        label: "Location",
        value: "Anaheim, California, USA",
      },
      {
        label: "Booth",
        value: "4105",
      },
    ],

    presentationTitle: "What We Will Present",
    presentationParagraphs: [
      "Our exhibition portfolio covers critical fluidic functions such as accurate liquid metering, fluid transfer, flow-path switching, pressure monitoring, bubble detection, and reliable fluid connections.",
    ],
    presentationLabel: "Featured Solution",
    presentationItems: [
      {
        title: "Precision Pumps",
        description:
          "For accurate liquid metering, transfer, dispensing, and automated liquid handling.",
      },
      {
        title: "Miniature Valves",
        description:
          "For flow-path switching, shutoff control, and complex fluidic routing.",
      },
      {
        title: "Fluidic Fittings and Tubing",
        description:
          "Options for different tube sizes, threads, materials, and media.",
      },
      {
        title: "Pressure and Bubble Detection",
        description:
          "For monitoring fluidic conditions and instrument operating status.",
      },
      {
        title: "Customized Fluidic Solutions",
        description:
          "Application-focused support from component selection to system integration.",
      },
      {
        title: "Compatibility and Alternative Evaluation",
        description:
          "Support for material compatibility and replacement of existing components.",
      },
    ],

    applicationTitle:
      "Engineering Support for Instrument Applications",
    applicationParagraphs: [
      "FOREACH supports applications in in vitro diagnostics, life science, analytical instruments, and laboratory automation.",
      "Beyond supplying individual components, our engineering team assists customers with material compatibility, product selection, alternative component evaluation, and fluidic system integration.",
    ],

    experienceTitle:
      "Experience in Precision Fluid Control",
    experienceParagraphs: [
      "FOREACH continues to develop and industrialize precision fluid control technologies across pumps, valves, probes, fittings, tubing, sensors, and integrated fluidic solutions.",
      "Our objective is to help instrument developers improve fluid control accuracy, simplify integration, and meet the requirements of compact and increasingly complex systems.",
    ],

    recognitionTitle:
      "Continued Investment in Engineering Capability",
    recognitionParagraph:
      "FOREACH has received recognition in China for specialized innovation and high-growth development, reflecting continued investment in product development, engineering, and manufacturing.",
    recognitionLabel: "Recognition",
    recognitionItems: [
      {
        title:
          "National-Level Specialized and Innovative Enterprise",
        description:
          "Recognition of specialization, engineering focus, and product innovation.",
      },
      {
        title: "Shenzhen Gazelle Enterprise",
        description:
          "Recognition of innovation capability and sustained business growth.",
      },
    ],
  },

  es: {
    introductionTitle:
      "FOREACH estará presente en ADLM 2026",
    introductionParagraphs: [
      "Del 26 al 30 de julio de 2026, FOREACH participará en ADLM 2026 en Anaheim, California.",
      "En el stand 4105, nuestro equipo conversará con fabricantes de instrumentos, ingenieros y socios del sector sobre selección de componentes, compatibilidad de materiales e integración de sistemas fluídicos.",
    ],

    eventInformationTitle: "Información de la exposición",
    eventInformation: [
      {
        label: "Evento",
        value: "ADLM 2026",
      },
      {
        label: "Fecha",
        value: "26–30 de julio de 2026",
      },
      {
        label: "Lugar",
        value: "Anaheim, California, Estados Unidos",
      },
      {
        label: "Stand",
        value: "4105",
      },
    ],

    presentationTitle:
      "Productos y soluciones que presentaremos",
    presentationParagraphs: [
      "Las soluciones expuestas cubren funciones clave como dosificación precisa, transferencia de líquidos, conmutación de circuitos, supervisión de presión, detección de burbujas y conexión de líneas de fluido.",
    ],
    presentationLabel: "Solución destacada",
    presentationItems: [
      {
        title: "Bombas de precisión",
        description:
          "Para dosificación, transferencia de líquidos y automatización de procesos.",
      },
      {
        title: "Válvulas miniatura",
        description:
          "Para conmutación de circuitos y control de rutas fluídicas.",
      },
      {
        title: "Racores y tubos",
        description:
          "Opciones para diferentes diámetros, roscas, materiales y fluidos.",
      },
      {
        title: "Presión y detección de burbujas",
        description:
          "Para supervisar el estado de los circuitos y del instrumento.",
      },
      {
        title: "Soluciones fluídicas personalizadas",
        description:
          "Apoyo desde la selección de componentes hasta la integración.",
      },
      {
        title: "Compatibilidad y productos alternativos",
        description:
          "Asistencia para seleccionar materiales y evaluar alternativas.",
      },
    ],

    applicationTitle:
      "Soporte para diferentes aplicaciones",
    applicationParagraphs: [
      "FOREACH ofrece productos y soporte técnico para diagnóstico in vitro, ciencias de la vida, instrumentos analíticos y automatización de laboratorio.",
      "Nuestro equipo ayuda a los clientes a evaluar productos alternativos, seleccionar materiales compatibles y simplificar la integración de los componentes en sus equipos.",
    ],

    experienceTitle:
      "Experiencia técnica y desarrollo continuo",
    experienceParagraphs: [
      "FOREACH desarrolla tecnologías de control preciso de fluidos y ha creado una gama de productos que incluye bombas, válvulas, sondas, racores, tubos y sensores.",
      "Nuestro trabajo combina componentes fiables con asistencia de ingeniería adaptada a las necesidades de cada proyecto.",
    ],

    recognitionTitle:
      "Especialización, innovación y crecimiento",
    recognitionParagraph:
      "La empresa ha recibido reconocimientos en China por su especialización tecnológica, capacidad de innovación y desarrollo empresarial.",
    recognitionLabel: "Reconocimiento",
    recognitionItems: [
      {
        title:
          "Empresa nacional especializada e innovadora",
        description:
          "Reconocimiento de la especialización y capacidad de desarrollo de productos.",
      },
      {
        title: "Empresa gacela de Shenzhen",
        description:
          "Reconocimiento del crecimiento y la capacidad de innovación.",
      },
    ],
  },

  fr: {
    introductionTitle:
      "FOREACH participera à l’ADLM 2026",
    introductionParagraphs: [
      "Du 26 au 30 juillet 2026, FOREACH participera à l’ADLM 2026 à Anaheim, en Californie.",
      "Au stand 4105, notre équipe échangera avec les fabricants d’instruments, les ingénieurs et les partenaires du secteur autour de la sélection des composants, de la compatibilité des matériaux et de l’intégration des circuits fluidiques.",
    ],

    eventInformationTitle: "Informations sur le salon",
    eventInformation: [
      {
        label: "Salon",
        value: "ADLM 2026",
      },
      {
        label: "Dates",
        value: "Du 26 au 30 juillet 2026",
      },
      {
        label: "Lieu",
        value: "Anaheim, Californie, États-Unis",
      },
      {
        label: "Stand",
        value: "4105",
      },
    ],

    presentationTitle:
      "Composants et solutions présentés",
    presentationParagraphs: [
      "Les solutions présentées répondent aux principales fonctions de dosage, de transfert de liquide, de commutation des circuits, de surveillance de la pression, de détection des bulles et de connexion fluidique.",
    ],
    presentationLabel: "Solution présentée",
    presentationItems: [
      {
        title: "Pompes de précision",
        description:
          "Pour le dosage, le transfert de liquide et l’automatisation.",
      },
      {
        title: "Vannes miniatures",
        description:
          "Pour la commutation et le contrôle des circuits fluidiques.",
      },
      {
        title: "Raccords et tubes",
        description:
          "Pour différents diamètres, filetages, matériaux et fluides.",
      },
      {
        title: "Pression et détection de bulles",
        description:
          "Pour la surveillance du circuit et de l’état de fonctionnement.",
      },
      {
        title: "Solutions fluidiques personnalisées",
        description:
          "Accompagnement de la sélection des composants à l’intégration.",
      },
      {
        title:
          "Compatibilité et solutions de remplacement",
        description:
          "Analyse des matériaux et évaluation de composants alternatifs.",
      },
    ],

    applicationTitle:
      "Accompagnement des applications instrumentales",
    applicationParagraphs: [
      "Nos composants sont destinés au diagnostic in vitro, aux sciences de la vie, aux instruments d’analyse et à l’automatisation de laboratoire.",
      "Notre équipe technique accompagne les clients dans le choix des produits, l’analyse de la compatibilité chimique, l’évaluation de solutions de remplacement et l’intégration des composants.",
    ],

    experienceTitle:
      "Une expertise développée dans le contrôle des fluides",
    experienceParagraphs: [
      "FOREACH développe et industrialise des technologies de contrôle précis des fluides couvrant les pompes, les vannes, les sondes, les raccords, les tubes, les capteurs et les solutions fluidiques intégrées.",
      "Cette approche vise à améliorer la précision du contrôle fluidique et à simplifier l’intégration dans des instruments compacts et complexes.",
    ],

    recognitionTitle:
      "Une capacité technique reconnue",
    recognitionParagraph:
      "L’entreprise a été reconnue en Chine pour sa spécialisation technologique, sa capacité d’innovation et son développement continu.",
    recognitionLabel: "Reconnaissance",
    recognitionItems: [
      {
        title:
          "Entreprise nationale spécialisée et innovante",
        description:
          "Reconnaissance de la spécialisation et de l’innovation technologique.",
      },
      {
        title: "Entreprise gazelle de Shenzhen",
        description:
          "Reconnaissance de la capacité d’innovation et de croissance.",
      },
    ],
  },

  ko: {
    introductionTitle:
      "FOREACH의 ADLM 2026 참가",
    introductionParagraphs: [
      "FOREACH는 2026년 7월 26일부터 30일까지 미국 캘리포니아 애너하임에서 개최되는 ADLM 2026에 참가합니다.",
      "부스 4105에서 체외진단, 생명과학, 분석기기 및 실험실 자동화 장비 제조사와 엔지니어를 만나 유체 제어와 시스템 통합 요구사항을 상담할 예정입니다.",
    ],

    eventInformationTitle: "전시회 정보",
    eventInformation: [
      {
        label: "전시회",
        value: "ADLM 2026",
      },
      {
        label: "일정",
        value: "2026년 7월 26일–30일",
      },
      {
        label: "장소",
        value: "미국 캘리포니아 애너하임",
      },
      {
        label: "부스",
        value: "4105",
      },
    ],

    presentationTitle: "주요 전시 제품",
    presentationParagraphs: [
      "정밀 정량, 액체 이송, 유로 전환, 압력 모니터링, 기포 감지 및 안정적인 유체 연결에 필요한 제품과 솔루션을 전시합니다.",
    ],
    presentationLabel: "주요 제품",
    presentationItems: [
      {
        title: "정밀 펌프",
        description:
          "정밀 정량, 액체 이송 및 자동화된 액체 처리에 적용됩니다.",
      },
      {
        title: "소형 밸브",
        description:
          "유로 전환, 개폐 제어 및 복잡한 유로 관리에 적용됩니다.",
      },
      {
        title: "유체 피팅 및 튜빙",
        description:
          "다양한 튜브 규격, 나사, 재질 및 유체 조건을 지원합니다.",
      },
      {
        title: "압력 및 기포 감지",
        description:
          "유로 상태와 장비 운전 상태를 모니터링합니다.",
      },
      {
        title: "맞춤형 유로 솔루션",
        description:
          "부품 선정부터 시스템 통합까지 기술 지원을 제공합니다.",
      },
      {
        title: "재질 호환성 및 대체품 검토",
        description:
          "재질 검토와 기존 부품의 대체품 선정을 지원합니다.",
      },
    ],

    applicationTitle:
      "장비 적용을 위한 기술 지원",
    applicationParagraphs: [
      "FOREACH는 체외진단, 생명과학, 분석기기 및 실험실 자동화 분야에 필요한 유체 제어 부품을 제공합니다.",
      "개별 부품 공급뿐만 아니라 재질 호환성 검토, 제품 선정, 대체품 검토 및 유로 시스템 통합을 지원합니다.",
    ],

    experienceTitle:
      "정밀 유체 제어 기술 역량",
    experienceParagraphs: [
      "FOREACH는 펌프, 밸브, 프로브, 피팅, 튜빙, 센서 및 유로 솔루션 분야에서 정밀 유체 제어 기술을 지속적으로 개발해 왔습니다.",
      "장비의 소형화, 자동화 및 복잡한 유로 설계 요구사항에 맞춰 필요한 부품과 기술 지원을 제공합니다.",
    ],

    recognitionTitle:
      "기술 전문성과 성장성 인정",
    recognitionParagraph:
      "FOREACH는 기술 전문성, 제품 개발 능력 및 기업 성장성을 바탕으로 중국 내 전문 혁신 기업과 고성장 기업으로 인정받았습니다.",
    recognitionLabel: "기업 인증",
    recognitionItems: [
      {
        title: "중국 국가급 전문·혁신 기업",
        description:
          "전문 기술, 제품 개발 및 혁신 역량을 인정받았습니다.",
      },
      {
        title: "선전시 가젤 기업",
        description:
          "혁신 역량과 지속적인 성장 가능성을 인정받았습니다.",
      },
    ],
  },

  ru: {
    introductionTitle:
      "Участие FOREACH в ADLM 2026",
    introductionParagraphs: [
      "С 26 по 30 июля 2026 года FOREACH примет участие в выставке ADLM 2026 в Анахайме, штат Калифорния.",
      "На стенде 4105 специалисты компании будут обсуждать с производителями приборов и инженерами вопросы выбора компонентов, совместимости материалов и интеграции жидкостных систем.",
    ],

    eventInformationTitle: "Информация о выставке",
    eventInformation: [
      {
        label: "Выставка",
        value: "ADLM 2026",
      },
      {
        label: "Даты",
        value: "26–30 июля 2026 года",
      },
      {
        label: "Место",
        value: "Анахайм, Калифорния, США",
      },
      {
        label: "Стенд",
        value: "4105",
      },
    ],

    presentationTitle:
      "Оборудование и компоненты на стенде",
    presentationParagraphs: [
      "Представленные решения предназначены для точного дозирования, транспортировки жидкости, переключения потоков, контроля давления, обнаружения пузырьков и надежного соединения элементов системы.",
    ],
    presentationLabel: "На стенде",
    presentationItems: [
      {
        title: "Прецизионные насосы",
        description:
          "Для точного дозирования, транспортировки и автоматической подачи жидкости.",
      },
      {
        title: "Миниатюрные клапаны",
        description:
          "Для переключения потоков и управления жидкостными контурами.",
      },
      {
        title: "Фитинги и трубки",
        description:
          "Для различных диаметров, резьб, материалов и рабочих сред.",
      },
      {
        title:
          "Контроль давления и обнаружение пузырьков",
        description:
          "Для контроля состояния жидкостной системы и прибора.",
      },
      {
        title: "Индивидуальные жидкостные решения",
        description:
          "Поддержка от подбора компонентов до интеграции системы.",
      },
      {
        title:
          "Совместимость материалов и подбор аналогов",
        description:
          "Анализ материалов и подбор замены для существующих компонентов.",
      },
    ],

    applicationTitle:
      "Поддержка приборных применений",
    applicationParagraphs: [
      "Решения FOREACH применяются в системах диагностики in vitro, оборудовании для наук о жизни, аналитических приборах и лабораторной автоматизации.",
      "Компания оказывает поддержку при подборе компонентов, анализе химической совместимости материалов, поиске аналогов и интеграции компонентов в существующие системы.",
    ],

    experienceTitle:
      "Опыт в области точного управления жидкостями",
    experienceParagraphs: [
      "FOREACH последовательно развивает технологии точного управления жидкостями, включая насосы, клапаны, зонды, фитинги, трубки, датчики и комплексные жидкостные решения.",
      "Инженерная поддержка помогает заказчикам повысить точность управления потоком и упростить интеграцию компонентов в прибор.",
    ],

    recognitionTitle:
      "Признание технической специализации",
    recognitionParagraph:
      "Техническая специализация, разработка продукции и устойчивый рост компании получили отраслевое признание в Китае.",
    recognitionLabel: "Признание",
    recognitionItems: [
      {
        title:
          "Национальное специализированное инновационное предприятие",
        description:
          "Признание технической специализации и инновационных разработок.",
      },
      {
        title: "Компания-газель города Шэньчжэнь",
        description:
          "Признание инновационного потенциала и устойчивого роста.",
      },
    ],
  },
};

const SUPPORT_COPY: Record<
  SupportedLocale,
  AdlmSupportCopy
> = {
  "zh-CN": {
    title: "诚邀莅临 4105 展位",
    description:
      "无论您正在寻找微流体核心部件、现有产品的替代方案，还是需要解决材料兼容、产品选型、液路集成及定制开发等问题，都欢迎与恒永达团队现场交流。期待在 ADLM 2026 与您相见。",
    buttonLabel: "联系我们",
    href: "/contact",
  },

  en: {
    title: "Visit FOREACH at Booth 4105",
    description:
      "Whether you are looking for a new fluidic component, an alternative to an existing product, or support with material compatibility and system integration, visit Booth 4105 and discuss your application with our team.",
    buttonLabel: "Contact Us",
    href: "/en/contact",
  },

  es: {
    title: "Visítenos en el stand 4105",
    description:
      "Si busca componentes fluídicos, alternativas para productos existentes o apoyo para la selección de materiales y la integración del sistema, le invitamos a conversar con nuestro equipo en el stand 4105.",
    buttonLabel: "Contactar",
    href: "/es/contact",
  },

  fr: {
    title: "Retrouvez FOREACH au stand 4105",
    description:
      "Que vous recherchiez un composant fluidique, une solution de remplacement ou un accompagnement pour la compatibilité des matériaux et l’intégration du circuit, notre équipe sera disponible au stand 4105.",
    buttonLabel: "Nous contacter",
    href: "/fr/contact",
  },

  ko: {
    title: "부스 4105에서 FOREACH를 만나보세요",
    description:
      "새로운 유체 부품, 기존 제품의 대체품 또는 재질 호환성과 시스템 통합 지원이 필요한 경우 부스 4105에서 FOREACH 엔지니어와 상담해 주십시오.",
    buttonLabel: "문의하기",
    href: "/ko/contact",
  },

  ru: {
    title: "Посетите стенд FOREACH 4105",
    description:
      "Если вам требуется новый компонент, замена существующего изделия или техническая поддержка по совместимости материалов и интеграции системы, обсудите вашу задачу со специалистами FOREACH на стенде 4105.",
    buttonLabel: "Связаться с нами",
    href: "/ru/contact",
  },
};

function normalizeLocale(locale: string): SupportedLocale {
  if (
    locale === "en" ||
    locale === "es" ||
    locale === "fr" ||
    locale === "ko" ||
    locale === "ru"
  ) {
    return locale;
  }

  return "zh-CN";
}

export function getAdlm2026DepartureSupportCopy(
  locale: string
): AdlmSupportCopy {
  return SUPPORT_COPY[normalizeLocale(locale)];
}

type Adlm2026DepartureArticleProps = {
  locale: string;
};

export default function Adlm2026DepartureArticle({
  locale,
}: Adlm2026DepartureArticleProps) {
  const copy = ARTICLE_COPY[normalizeLocale(locale)];

  return (
    <>
      <article className={styles.contentBlock}>
        <h2>{copy.introductionTitle}</h2>

        {copy.introductionParagraphs.map(
          (paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          )
        )}
      </article>

      <article className={styles.contentBlock}>
        <h2>{copy.eventInformationTitle}</h2>

        <div
          className={styles.pagerGrid}
          aria-label={copy.eventInformationTitle}
        >
          {copy.eventInformation.map((item) => (
            <div
              className={styles.pagerCard}
              key={item.label}
            >
              <span>{item.label}</span>
              <strong>{item.value}</strong>
            </div>
          ))}
        </div>
      </article>

      <article className={styles.contentBlock}>
        <h2>{copy.presentationTitle}</h2>

        {copy.presentationParagraphs.map(
          (paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          )
        )}

        <div
          className={styles.pagerGrid}
          aria-label={copy.presentationTitle}
        >
          {copy.presentationItems.map((item) => (
            <div
              className={styles.pagerCard}
              key={item.title}
            >
              <span>{copy.presentationLabel}</span>
              <strong>{item.title}</strong>
              <em>{item.description}</em>
            </div>
          ))}
        </div>
      </article>

      <article className={styles.contentBlock}>
        <h2>{copy.applicationTitle}</h2>

        {copy.applicationParagraphs.map(
          (paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          )
        )}
      </article>

      <article className={styles.contentBlock}>
        <h2>{copy.experienceTitle}</h2>

        {copy.experienceParagraphs.map(
          (paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          )
        )}
      </article>

      <article className={styles.contentBlock}>
        <h2>{copy.recognitionTitle}</h2>
        <p>{copy.recognitionParagraph}</p>

        <div
          className={styles.pagerGrid}
          aria-label={copy.recognitionTitle}
        >
          {copy.recognitionItems.map((item) => (
            <div
              className={styles.pagerCard}
              key={item.title}
            >
              <span>{copy.recognitionLabel}</span>
              <strong>{item.title}</strong>
              <em>{item.description}</em>
            </div>
          ))}
        </div>
      </article>
    </>
  );
}
