import type {
  NewsArticle,
  NewsLocale,
} from "./news.types";

type EventInformationItem = {
  label: string;
  value: string;
};

export type Adlm2026OnsiteSupportCopy = {
  kicker: string;
  title: string;
  description: string;
  buttonLabel: string;
  href: string;
};

export type Adlm2026OnsiteCopy = {
  title: string;
  summary: string;
  seoTitle: string;
  seoDescription: string;
  coverAlt: string;
  openingTitle: string;
  openingParagraphs: string[];
  firstImageAlt: string;
  firstImageCaption: string;
  teamTitle: string;
  teamParagraphs: string[];
  eventTitle: string;
  eventInformation: EventInformationItem[];
  discussionTitle: string;
  discussionParagraphs: string[];
  discussionLead: string;
  discussionItems: string[];
  meetingTitle: string;
  meetingParagraphs: string[];
  secondImageAlt: string;
  secondImageCaption: string;
  support: Adlm2026OnsiteSupportCopy;
};

const ADLM_2026_ONSITE_COPY: Record<
  NewsLocale,
  Adlm2026OnsiteCopy
> = {
  "zh-CN": {
    title:
      "ADLM 2026现场直击｜恒永达亮相4105号展位",
    summary:
      "ADLM 2026在美国加利福尼亚州阿纳海姆正式举行。恒永达团队已在4105号展位准备就绪，期待与全球临床诊断、生命科学、分析仪器及实验室自动化领域的行业伙伴现场交流。",
    seoTitle:
      "ADLM 2026现场直击｜恒永达4105号展位｜FOREACH",
    seoDescription:
      "恒永达亮相美国阿纳海姆ADLM 2026，欢迎莅临4105号展位，围绕精密流体控制部件、产品选型、兼容替代及OEM液路解决方案进行交流。",
    coverAlt:
      "ADLM 2026美国阿纳海姆会展中心现场",
    openingTitle: "ADLM 2026正式启幕",
    openingParagraphs: [
      "ADLM 2026在美国加利福尼亚州阿纳海姆正式举行。来自全球临床诊断、实验室医学、生命科学、分析仪器及实验室自动化领域的设备制造商、工程师和行业伙伴齐聚现场，共同交流诊断技术、仪器开发及实验室解决方案的最新进展。",
      "恒永达团队已完成展会报到、展位布置和产品准备工作，正式亮相4105号展位。展会期间，我们将围绕仪器设备中的精准液体输送、流路切换、流体连接、液路监测及系统集成，与现场客户和工程师展开交流。",
    ],
    firstImageAlt:
      "ADLM 2026阿纳海姆会展中心及展会入口",
    firstImageCaption: "ADLM 2026展会现场",
    teamTitle: "恒永达团队已在4105号展位就位",
    teamParagraphs: [
      "本次展会，恒永达重点展示面向仪器设备应用的微流体核心部件与液路解决方案，覆盖泵、阀、接头、管路、针组件以及压力和气泡检测等产品。",
      "从微升级液体吸取与定量分配，到复杂流路切换、不同材料和接口的连接，再到现有流体部件的兼容替代，恒永达团队将结合客户的实际设备需求，提供产品选型与工程应用建议。",
    ],
    eventTitle: "展会信息",
    eventInformation: [
      {
        label: "展会",
        value: "ADLM 2026",
      },
      {
        label: "时间",
        value: "2026年7月26日至30日",
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
    discussionTitle: "围绕实际项目展开交流",
    discussionParagraphs: [
      "每一套诊断设备都有不同的液路结构、介质条件、性能指标和安装空间。相比单纯展示产品，恒永达更期待与客户围绕具体项目展开交流。",
    ],
    discussionLead: "现场可以交流的方向包括：",
    discussionItems: [
      "精准液体输送与微升级定量分配",
      "泵、阀、接头、管路及针组件选型",
      "不同介质条件下的材料兼容性",
      "现有流体部件的兼容与替代",
      "特殊接口、流道和安装结构定制",
      "OEM流体组件及液路系统集成",
    ],
    meetingTitle: "期待在4105号展位与您相见",
    meetingParagraphs: [
      "无论您正在开发新的诊断设备，还是正在寻找更加稳定、精准和适配的流体控制部件，都欢迎莅临恒永达4105号展位。",
      "恒永达团队期待与您围绕产品选型、液路优化、兼容替代及定制化开发进行面对面交流，共同探索更适合设备应用的流体控制解决方案。",
    ],
    secondImageAlt:
      "恒永达团队在ADLM 2026 4105号展位",
    secondImageCaption:
      "恒永达团队在ADLM 2026 4105号展位现场",
    support: {
      kicker: "MEET FOREACH AT ADLM 2026",
      title: "欢迎莅临4105号展位",
      description:
        "无论您正在寻找新的流体控制部件、现有产品的替代方案，还是需要材料兼容、产品选型及液路系统集成支持，都欢迎与恒永达团队进行交流。",
      buttonLabel: "联系我们",
      href: "/contact",
    },
  },
  en: {
    title:
      "Live from ADLM 2026 | Meet FOREACH at Booth 4105",
    summary:
      "ADLM 2026 is underway in Anaheim, California. The FOREACH team is ready at Booth 4105 to meet professionals from clinical diagnostics, life science, analytical instrumentation, and laboratory automation.",
    seoTitle:
      "Live from ADLM 2026 | FOREACH at Booth 4105",
    seoDescription:
      "Meet FOREACH at Booth 4105 during ADLM 2026 in Anaheim to discuss precision fluid control components, product selection, compatible alternatives, and OEM fluidic solutions.",
    coverAlt:
      "ADLM 2026 at the Anaheim Convention Center in California",
    openingTitle: "ADLM 2026 Is Now Underway",
    openingParagraphs: [
      "ADLM 2026 is now underway in Anaheim, California. Instrument manufacturers, engineers, and industry partners from clinical diagnostics, laboratory medicine, life science, analytical instrumentation, and laboratory automation have gathered to exchange the latest developments in diagnostic technologies, instrument development, and laboratory solutions.",
      "FOREACH has completed event check-in, booth setup, and product preparation and is now welcoming visitors at Booth 4105. During the exhibition, we will meet with customers and engineers to discuss precision liquid handling, flow-path switching, fluid connections, fluidic circuit monitoring, and system integration for instruments.",
    ],
    firstImageAlt:
      "Anaheim Convention Center and the entrance to ADLM 2026",
    firstImageCaption: "At ADLM 2026 in Anaheim",
    teamTitle:
      "The FOREACH Team Is Ready at Booth 4105",
    teamParagraphs: [
      "At this exhibition, FOREACH is presenting core microfluidic components and fluidic solutions for instrument applications, including pumps, valves, fittings, tubing, needle assemblies, pressure sensing, and bubble detection products.",
      "From microliter-scale liquid aspiration and quantitative dispensing to complex flow-path switching, connections for different materials and interfaces, and compatible replacements for existing fluidic components, the FOREACH team will provide product-selection and engineering application guidance based on customers’ actual instrument requirements.",
    ],
    eventTitle: "Event Information",
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
    discussionTitle:
      "Discuss Your Application with Us",
    discussionParagraphs: [
      "Every diagnostic instrument has its own fluidic circuit, media conditions, performance targets, and installation space. Beyond displaying products, FOREACH looks forward to discussing specific projects with customers.",
    ],
    discussionLead:
      "Topics available for discussion at the booth include:",
    discussionItems: [
      "Precision liquid handling and microliter-scale dispensing",
      "Selection of pumps, valves, fittings, tubing, and needle assemblies",
      "Material compatibility under different media conditions",
      "Compatible alternatives for existing fluidic components",
      "Custom interfaces, flow paths, and mounting structures",
      "OEM fluidic assemblies and fluidic system integration",
    ],
    meetingTitle:
      "We Look Forward to Meeting You at Booth 4105",
    meetingParagraphs: [
      "Whether you are developing a new diagnostic instrument or looking for fluid control components that offer greater stability, precision, and application fit, you are welcome to visit FOREACH at Booth 4105.",
      "The FOREACH team looks forward to discussing product selection, fluidic circuit optimization, compatible alternatives, and custom development with you in person, and to exploring a fluid control solution suited to your instrument application.",
    ],
    secondImageAlt:
      "The FOREACH team at Booth 4105 during ADLM 2026",
    secondImageCaption:
      "The FOREACH team at Booth 4105 during ADLM 2026",
    support: {
      kicker: "MEET FOREACH AT ADLM 2026",
      title: "Visit Us at Booth 4105",
      description:
        "Whether you need new fluid control components, alternatives to existing products, or support with material compatibility, product selection, and fluidic system integration, the FOREACH team is ready to discuss your application.",
      buttonLabel: "Contact Us",
      href: "/en/contact",
    },
  },
  es: {
    title:
      "En directo desde ADLM 2026 | Visite a FOREACH en el stand 4105",
    summary:
      "ADLM 2026 ya está en marcha en Anaheim, California. El equipo de FOREACH le espera en el stand 4105 para conversar con profesionales del diagnóstico clínico, las ciencias de la vida, la instrumentación analítica y la automatización de laboratorios.",
    seoTitle:
      "En directo desde ADLM 2026 | FOREACH en el stand 4105",
    seoDescription:
      "Visite a FOREACH en el stand 4105 de ADLM 2026 en Anaheim para hablar sobre componentes de control preciso de fluidos, selección de productos, alternativas compatibles y soluciones fluídicas OEM.",
    coverAlt:
      "ADLM 2026 en el Centro de Convenciones de Anaheim, California",
    openingTitle: "ADLM 2026 abre sus puertas",
    openingParagraphs: [
      "ADLM 2026 se celebra en Anaheim, California. Fabricantes de equipos, ingenieros y profesionales del diagnóstico clínico, la medicina de laboratorio, las ciencias de la vida, la instrumentación analítica y la automatización de laboratorios se reúnen para compartir los últimos avances en tecnologías de diagnóstico, desarrollo de instrumentos y soluciones de laboratorio.",
      "El equipo de FOREACH ya ha completado el registro, el montaje del stand y la preparación de los productos, y está listo para recibir a los visitantes en el stand 4105. Durante la feria, hablaremos con clientes e ingenieros sobre el transporte preciso de líquidos, la conmutación de circuitos, las conexiones de fluidos, la monitorización de circuitos fluídicos y la integración de sistemas en instrumentos.",
    ],
    firstImageAlt:
      "Centro de Convenciones de Anaheim y entrada de ADLM 2026",
    firstImageCaption: "ADLM 2026 en Anaheim",
    teamTitle:
      "El equipo de FOREACH ya está en el stand 4105",
    teamParagraphs: [
      "En esta feria, FOREACH presenta componentes microfluídicos esenciales y soluciones para circuitos fluídicos destinados a instrumentos, entre ellos bombas, válvulas, racores, tubos, conjuntos de agujas, sensores de presión y detectores de burbujas.",
      "Desde la aspiración y la dosificación cuantitativa de líquidos a escala microlitro hasta la conmutación de circuitos complejos, la conexión de distintos materiales e interfaces y la sustitución compatible de componentes fluídicos existentes, el equipo de FOREACH ofrece orientación sobre selección de productos y aplicaciones de ingeniería según las necesidades reales de cada equipo.",
    ],
    eventTitle: "Información de la feria",
    eventInformation: [
      {
        label: "Feria",
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
    discussionTitle:
      "Conversemos sobre su proyecto",
    discussionParagraphs: [
      "Cada equipo de diagnóstico tiene una arquitectura fluídica, unas condiciones de medio, unos objetivos de rendimiento y un espacio de instalación propios. Más allá de mostrar productos, FOREACH desea conversar con los clientes sobre proyectos concretos.",
    ],
    discussionLead:
      "En el stand podemos abordar, entre otros, los siguientes temas:",
    discussionItems: [
      "Transporte preciso de líquidos y dosificación a escala microlitro",
      "Selección de bombas, válvulas, racores, tubos y conjuntos de agujas",
      "Compatibilidad de materiales con distintos medios",
      "Alternativas compatibles para componentes fluídicos existentes",
      "Personalización de interfaces, canales de flujo y estructuras de montaje",
      "Conjuntos fluídicos OEM e integración de sistemas fluídicos",
    ],
    meetingTitle:
      "Esperamos verle en el stand 4105",
    meetingParagraphs: [
      "Tanto si está desarrollando un nuevo equipo de diagnóstico como si busca componentes de control de fluidos más estables, precisos y adaptados a su aplicación, le invitamos a visitar a FOREACH en el stand 4105.",
      "El equipo de FOREACH espera conversar con usted sobre selección de productos, optimización de circuitos fluídicos, alternativas compatibles y desarrollos personalizados, y explorar una solución de control de fluidos adecuada para su equipo.",
    ],
    secondImageAlt:
      "Equipo de FOREACH en el stand 4105 de ADLM 2026",
    secondImageCaption:
      "Equipo de FOREACH en el stand 4105 de ADLM 2026",
    support: {
      kicker: "FOREACH EN ADLM 2026",
      title: "Visítenos en el stand 4105",
      description:
        "Si busca nuevos componentes de control de fluidos, alternativas a productos existentes o apoyo en compatibilidad de materiales, selección de productos e integración de sistemas fluídicos, el equipo de FOREACH está a su disposición.",
      buttonLabel: "Contactar",
      href: "/es/contact",
    },
  },
  fr: {
    title:
      "En direct de l’ADLM 2026 | Retrouvez FOREACH au stand 4105",
    summary:
      "L’ADLM 2026 se tient actuellement à Anaheim, en Californie. L’équipe FOREACH vous accueille au stand 4105 pour échanger avec les professionnels du diagnostic clinique, des sciences de la vie, de l’instrumentation analytique et de l’automatisation des laboratoires.",
    seoTitle:
      "En direct de l’ADLM 2026 | FOREACH au stand 4105",
    seoDescription:
      "Rencontrez FOREACH au stand 4105 de l’ADLM 2026 à Anaheim pour discuter de composants de contrôle précis des fluides, de sélection de produits, d’alternatives compatibles et de solutions fluidiques OEM.",
    coverAlt:
      "ADLM 2026 au centre des congrès d’Anaheim, en Californie",
    openingTitle: "L’ADLM 2026 ouvre ses portes",
    openingParagraphs: [
      "L’ADLM 2026 se tient à Anaheim, en Californie. Des fabricants d’équipements, des ingénieurs et des professionnels du diagnostic clinique, de la médecine de laboratoire, des sciences de la vie, de l’instrumentation analytique et de l’automatisation des laboratoires sont réunis pour échanger sur les dernières avancées en matière de technologies de diagnostic, de développement d’instruments et de solutions de laboratoire.",
      "L’équipe FOREACH a terminé l’enregistrement, l’installation du stand et la préparation des produits, et accueille désormais les visiteurs au stand 4105. Pendant le salon, nous échangerons avec les clients et les ingénieurs sur le transfert précis de liquides, la commutation des circuits, les raccordements fluidiques, la surveillance des circuits et l’intégration de systèmes pour les instruments.",
    ],
    firstImageAlt:
      "Centre des congrès d’Anaheim et entrée de l’ADLM 2026",
    firstImageCaption: "L’ADLM 2026 à Anaheim",
    teamTitle:
      "L’équipe FOREACH vous attend au stand 4105",
    teamParagraphs: [
      "À l’occasion de ce salon, FOREACH présente des composants microfluidiques essentiels et des solutions de circuits fluidiques destinés aux instruments, notamment des pompes, des vannes, des raccords, des tubulures, des ensembles d’aiguilles, des capteurs de pression et des détecteurs de bulles.",
      "De l’aspiration et du dosage quantitatif à l’échelle du microlitre à la commutation de circuits complexes, en passant par le raccordement de différents matériaux et interfaces et le remplacement compatible de composants fluidiques existants, l’équipe FOREACH propose des conseils de sélection et d’application technique adaptés aux besoins réels des équipements.",
    ],
    eventTitle: "Informations sur le salon",
    eventInformation: [
      {
        label: "Salon",
        value: "ADLM 2026",
      },
      {
        label: "Dates",
        value: "26–30 juillet 2026",
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
    discussionTitle:
      "Échangeons autour de votre projet",
    discussionParagraphs: [
      "Chaque instrument de diagnostic possède une architecture fluidique, des conditions de milieu, des objectifs de performance et un espace d’installation qui lui sont propres. Au-delà de la présentation de produits, FOREACH souhaite échanger avec ses clients sur leurs projets concrets.",
    ],
    discussionLead:
      "Les sujets pouvant être abordés sur le stand comprennent :",
    discussionItems: [
      "Transfert précis de liquides et dosage à l’échelle du microlitre",
      "Sélection de pompes, vannes, raccords, tubulures et ensembles d’aiguilles",
      "Compatibilité des matériaux selon les milieux utilisés",
      "Alternatives compatibles aux composants fluidiques existants",
      "Personnalisation des interfaces, canaux et structures de montage",
      "Sous-ensembles fluidiques OEM et intégration de systèmes fluidiques",
    ],
    meetingTitle:
      "Nous vous attendons au stand 4105",
    meetingParagraphs: [
      "Que vous développiez un nouvel instrument de diagnostic ou recherchiez des composants de contrôle des fluides plus stables, plus précis et mieux adaptés à votre application, venez rencontrer FOREACH au stand 4105.",
      "L’équipe FOREACH sera heureuse d’échanger avec vous sur la sélection des produits, l’optimisation des circuits fluidiques, les alternatives compatibles et le développement sur mesure, afin d’explorer une solution de contrôle des fluides adaptée à votre instrument.",
    ],
    secondImageAlt:
      "L’équipe FOREACH au stand 4105 de l’ADLM 2026",
    secondImageCaption:
      "L’équipe FOREACH au stand 4105 de l’ADLM 2026",
    support: {
      kicker: "FOREACH À L’ADLM 2026",
      title: "Retrouvez-nous au stand 4105",
      description:
        "Si vous recherchez de nouveaux composants de contrôle des fluides, des alternatives à des produits existants ou un accompagnement pour la compatibilité des matériaux, la sélection et l’intégration de systèmes fluidiques, l’équipe FOREACH est à votre écoute.",
      buttonLabel: "Nous contacter",
      href: "/fr/contact",
    },
  },
  ko: {
    title:
      "ADLM 2026 현장 소식 | FOREACH 부스 4105를 만나보세요",
    summary:
      "ADLM 2026이 미국 캘리포니아 애너하임에서 진행 중입니다. FOREACH 팀은 부스 4105에서 임상 진단, 생명과학, 분석 기기 및 실험실 자동화 분야의 전문가들과 만날 준비를 마쳤습니다.",
    seoTitle:
      "ADLM 2026 현장 소식 | FOREACH 부스 4105",
    seoDescription:
      "애너하임 ADLM 2026의 부스 4105에서 FOREACH를 만나 정밀 유체 제어 부품, 제품 선정, 호환 대체품 및 OEM 유로 솔루션에 대해 상담해 보세요.",
    coverAlt:
      "미국 캘리포니아 애너하임 컨벤션 센터의 ADLM 2026 현장",
    openingTitle: "ADLM 2026 개막",
    openingParagraphs: [
      "ADLM 2026이 미국 캘리포니아 애너하임에서 열리고 있습니다. 임상 진단, 검사실 의학, 생명과학, 분석 기기 및 실험실 자동화 분야의 장비 제조사, 엔지니어와 업계 관계자들이 진단 기술, 기기 개발 및 실험실 솔루션의 최신 동향을 공유하기 위해 한자리에 모였습니다.",
      "FOREACH 팀은 등록, 부스 설치 및 제품 준비를 마치고 부스 4105에서 방문객을 맞이하고 있습니다. 전시 기간에는 기기 내 정밀 액체 이송, 유로 전환, 유체 연결, 유로 모니터링 및 시스템 통합을 중심으로 고객 및 엔지니어와 상담할 예정입니다.",
    ],
    firstImageAlt:
      "애너하임 컨벤션 센터와 ADLM 2026 전시장 입구",
    firstImageCaption: "애너하임 ADLM 2026 현장",
    teamTitle:
      "FOREACH 팀이 부스 4105에서 기다립니다",
    teamParagraphs: [
      "이번 전시회에서 FOREACH는 기기 응용을 위한 핵심 미세유체 부품과 유로 솔루션을 선보입니다. 전시 품목에는 펌프, 밸브, 피팅, 튜빙, 니들 어셈블리, 압력 감지 및 기포 감지 제품이 포함됩니다.",
      "마이크로리터 단위의 액체 흡입과 정량 분주부터 복잡한 유로 전환, 다양한 재질과 인터페이스의 연결, 기존 유체 부품의 호환 대체까지 FOREACH 팀은 고객 장비의 실제 요구에 맞춰 제품 선정과 엔지니어링 적용 방안을 제안합니다.",
    ],
    eventTitle: "전시회 정보",
    eventInformation: [
      {
        label: "전시회",
        value: "ADLM 2026",
      },
      {
        label: "기간",
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
    discussionTitle:
      "실제 프로젝트를 함께 논의해 보세요",
    discussionParagraphs: [
      "진단 장비마다 유로 구조, 사용 유체 조건, 성능 지표와 설치 공간이 다릅니다. FOREACH는 제품을 전시하는 데 그치지 않고 고객의 구체적인 프로젝트를 중심으로 상담하기를 기대합니다.",
    ],
    discussionLead:
      "현장에서 상담할 수 있는 주요 내용은 다음과 같습니다.",
    discussionItems: [
      "정밀 액체 이송 및 마이크로리터 단위 정량 분주",
      "펌프, 밸브, 피팅, 튜빙 및 니들 어셈블리 선정",
      "다양한 유체 조건에서의 재질 호환성",
      "기존 유체 부품의 호환 및 대체",
      "특수 인터페이스, 유로 및 장착 구조 맞춤 설계",
      "OEM 유체 어셈블리 및 유로 시스템 통합",
    ],
    meetingTitle:
      "부스 4105에서 만나 뵙기를 기대합니다",
    meetingParagraphs: [
      "새로운 진단 장비를 개발하고 있거나 더욱 안정적이고 정밀하며 응용 환경에 적합한 유체 제어 부품을 찾고 계신다면 FOREACH 부스 4105를 방문해 주세요.",
      "FOREACH 팀은 제품 선정, 유로 최적화, 호환 대체 및 맞춤 개발에 대해 직접 상담하고 장비 응용에 적합한 유체 제어 솔루션을 함께 모색하기를 기대합니다.",
    ],
    secondImageAlt:
      "ADLM 2026 부스 4105의 FOREACH 팀",
    secondImageCaption:
      "ADLM 2026 부스 4105 현장의 FOREACH 팀",
    support: {
      kicker: "ADLM 2026에서 FOREACH를 만나보세요",
      title: "부스 4105를 방문해 주세요",
      description:
        "새로운 유체 제어 부품, 기존 제품의 대체품 또는 재질 호환성, 제품 선정 및 유로 시스템 통합 지원이 필요하다면 FOREACH 팀과 상담해 주세요.",
      buttonLabel: "문의하기",
      href: "/ko/contact",
    },
  },
  ru: {
    title:
      "ADLM 2026: репортаж с выставки | FOREACH на стенде 4105",
    summary:
      "Выставка ADLM 2026 проходит в Анахайме, штат Калифорния. Команда FOREACH ждет специалистов в области клинической диагностики, наук о жизни, аналитического приборостроения и автоматизации лабораторий на стенде 4105.",
    seoTitle:
      "ADLM 2026: репортаж с выставки | FOREACH, стенд 4105",
    seoDescription:
      "Посетите стенд FOREACH 4105 на выставке ADLM 2026 в Анахайме, чтобы обсудить компоненты точного управления жидкостями, подбор изделий, совместимые аналоги и OEM-решения для гидравлических контуров.",
    coverAlt:
      "Выставка ADLM 2026 в конференц-центре Анахайма, штат Калифорния",
    openingTitle: "Выставка ADLM 2026 открылась",
    openingParagraphs: [
      "Выставка ADLM 2026 проходит в Анахайме, штат Калифорния. Производители оборудования, инженеры и специалисты в области клинической диагностики, лабораторной медицины, наук о жизни, аналитического приборостроения и автоматизации лабораторий собрались, чтобы обсудить последние достижения в диагностических технологиях, разработке приборов и лабораторных решениях.",
      "Команда FOREACH завершила регистрацию, подготовку стенда и продукции и принимает посетителей на стенде 4105. Во время выставки мы обсудим с заказчиками и инженерами точную подачу жидкостей, переключение каналов, соединение компонентов, мониторинг гидравлических контуров и системную интеграцию в приборах.",
    ],
    firstImageAlt:
      "Конференц-центр Анахайма и вход на выставку ADLM 2026",
    firstImageCaption:
      "Выставка ADLM 2026 в Анахайме",
    teamTitle:
      "Команда FOREACH готова встретить вас на стенде 4105",
    teamParagraphs: [
      "На выставке FOREACH представляет основные микрофлюидные компоненты и решения для гидравлических контуров приборов: насосы, клапаны, фитинги, трубки, игольные узлы, датчики давления и детекторы пузырьков.",
      "От забора и дозирования жидкостей в микролитровом диапазоне до переключения сложных каналов, соединения различных материалов и интерфейсов, а также совместимой замены имеющихся компонентов — команда FOREACH предлагает рекомендации по подбору изделий и их инженерному применению с учетом реальных требований оборудования заказчика.",
    ],
    eventTitle: "Информация о выставке",
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
        value: "Анахайм, штат Калифорния, США",
      },
      {
        label: "Стенд",
        value: "4105",
      },
    ],
    discussionTitle:
      "Обсудим вашу практическую задачу",
    discussionParagraphs: [
      "Каждый диагностический прибор имеет собственную структуру гидравлического контура, рабочие среды, требования к характеристикам и ограничения по монтажному пространству. Помимо демонстрации продукции, FOREACH рассчитывает обсудить с заказчиками конкретные проекты.",
    ],
    discussionLead:
      "На стенде можно обсудить следующие вопросы:",
    discussionItems: [
      "Точная подача жидкостей и дозирование в микролитровом диапазоне",
      "Подбор насосов, клапанов, фитингов, трубок и игольных узлов",
      "Совместимость материалов с различными рабочими средами",
      "Совместимые аналоги имеющихся компонентов",
      "Разработка специальных интерфейсов, каналов и монтажных конструкций",
      "OEM-узлы и интеграция гидравлических систем",
    ],
    meetingTitle:
      "Ждем вас на стенде 4105",
    meetingParagraphs: [
      "Если вы разрабатываете новый диагностический прибор или ищете более стабильные, точные и подходящие для вашей задачи компоненты управления жидкостями, посетите стенд FOREACH 4105.",
      "Команда FOREACH будет рада лично обсудить подбор изделий, оптимизацию гидравлического контура, совместимые аналоги и индивидуальную разработку, чтобы вместе определить решение, подходящее для вашего прибора.",
    ],
    secondImageAlt:
      "Команда FOREACH на стенде 4105 выставки ADLM 2026",
    secondImageCaption:
      "Команда FOREACH на стенде 4105 выставки ADLM 2026",
    support: {
      kicker: "FOREACH НА ADLM 2026",
      title: "Посетите стенд 4105",
      description:
        "Если вам нужны новые компоненты управления жидкостями, аналоги существующих изделий или поддержка по совместимости материалов, подбору продукции и интеграции гидравлических систем, обсудите задачу с командой FOREACH.",
      buttonLabel: "Связаться с нами",
      href: "/ru/contact",
    },
  },
};

function normalizeLocale(locale: string): NewsLocale {
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

export function getAdlm2026OnsiteCopy(
  locale: string
): Adlm2026OnsiteCopy {
  return ADLM_2026_ONSITE_COPY[normalizeLocale(locale)];
}

export function getAdlm2026OnsiteArticle(
  locale: NewsLocale
): NewsArticle {
  const copy = getAdlm2026OnsiteCopy(locale);

  return {
    id: "adlm-2026-onsite",
    slug: "adlm-2026-onsite",
    category: "exhibition",
    title: copy.title,
    summary: copy.summary,
    date: "2026-07-30",
    coverImage:
      "/images/resources/news/adlm-2026-onsite/001.webp",
    coverAlt: copy.coverAlt,
    content: [
      {
        title: copy.openingTitle,
        content: copy.openingParagraphs.join("\n\n"),
      },
      {
        title: copy.teamTitle,
        content: copy.teamParagraphs.join("\n\n"),
      },
      {
        title: copy.eventTitle,
        content: copy.eventInformation
          .map((item) => `${item.label}: ${item.value}`)
          .join("\n"),
      },
      {
        title: copy.discussionTitle,
        content: [
          ...copy.discussionParagraphs,
          copy.discussionLead,
          ...copy.discussionItems,
        ].join("\n"),
      },
      {
        title: copy.meetingTitle,
        content: copy.meetingParagraphs.join("\n\n"),
      },
    ],
    seoTitle: copy.seoTitle,
    seoDescription: copy.seoDescription,
  };
}

