/* =========================================================
   about-research-manufacturing.ts
   恒永达官网｜关于我们 / 研发与制造能力页面数据

   文件路径：
   data/about-research-manufacturing.ts

   说明：
   1. 这个文件只放“数据”
   2. 包括：图片路径、多语言文案、SEO 信息、卡片数据、流程数据
   3. 页面组件 ResearchManufacturingPageContent.tsx 只负责渲染和交互
   4. app/about/research-manufacturing/page.tsx 只负责中文页面入口和 SEO
   5. app/[locale]/about/research-manufacturing/page.tsx 只负责多语言页面入口和 SEO


banner.webp                         1920 × 620

intro/rd-manufacturing-intro.webp   1200 × 760

ability/research-center.webp        1200 × 760
ability/machining-center.webp       1200 × 760
ability/extrusion-center.webp       1200 × 760

process/project-process-bg.webp     1920 × 760

applications/ivd-diagnostics.webp         1000 × 720
applications/life-science.webp            1000 × 720
applications/analytical-instrument.webp   1000 × 720
applications/synthetic-biology.webp       1000 × 720
applications/lab-automation.webp          1000 × 720

why/why-choose-bg.webp              1920 × 720
cta/contact-bg.webp                 1920 × 520

public/
└─ images/
   └─ about/
      └─ research-manufacturing/
         ├─ banner.webp
         ├─ intro/
         │  └─ rd-manufacturing-intro.webp
         ├─ ability/
         │  ├─ research-center.webp
         │  ├─ machining-center.webp
         │  └─ extrusion-center.webp
         ├─ process/
         │  └─ project-process-bg.webp
         ├─ applications/
         │  ├─ ivd-diagnostics.webp
         │  ├─ life-science.webp
         │  ├─ analytical-instrument.webp
         │  ├─ synthetic-biology.webp
         │  └─ lab-automation.webp
         ├─ why/
         │  └─ why-choose-bg.webp
         └─ cta/
            └─ contact-bg.webp

========================================================= */

/* =========================================================
   1. 官网支持的语言类型
   说明：
   zh-CN：中文默认语言，不走 /zh 路径
   en / es / fr / ko / ru：走 /en、/es、/fr、/ko、/ru 路径
========================================================= */
export const RESEARCH_MANUFACTURING_LOCALES = [
  "zh-CN",
  "en",
  "es",
  "fr",
  "ko",
  "ru",
] as const;

export type ResearchManufacturingLocale =
  (typeof RESEARCH_MANUFACTURING_LOCALES)[number];

/* =========================================================
   2. 非中文语言列表
   说明：
   多语言动态路由 app/[locale]/about/research-manufacturing/page.tsx
   只需要生成这些路径：
   /en/about/research-manufacturing
   /es/about/research-manufacturing
   /fr/about/research-manufacturing
   /ko/about/research-manufacturing
   /ru/about/research-manufacturing
========================================================= */
export const RESEARCH_MANUFACTURING_ROUTE_LOCALES = [
  "en",
  "es",
  "fr",
  "ko",
  "ru",
] as const;

export type ResearchManufacturingRouteLocale =
  (typeof RESEARCH_MANUFACTURING_ROUTE_LOCALES)[number];

/* =========================================================
   3. 图片路径统一管理
   说明：
   1. 图片真实位置放在 public/images/about/research-manufacturing/
   2. 代码引用 public 下面资源时，不需要写 public
   3. 后续你只要替换同名图片，不需要改代码
========================================================= */
export const researchManufacturingImages = {
  banner: "/images/about/research-manufacturing/banner.webp",

  intro:
    "/images/about/research-manufacturing/intro/rd-manufacturing-intro.webp",

  ability: {
    researchCenter:
      "/images/about/research-manufacturing/ability/research-center.webp",
    machiningCenter:
      "/images/about/research-manufacturing/ability/machining-center.webp",
    extrusionCenter:
      "/images/about/research-manufacturing/ability/extrusion-center.webp",
  },

  process:
    "/images/about/research-manufacturing/process/project-process-bg.webp",

  applications: {
    ivd:
      "/images/about/research-manufacturing/applications/ivd-diagnostics.webp",
    lifeScience:
      "/images/about/research-manufacturing/applications/life-science.webp",
    analyticalInstrument:
      "/images/about/research-manufacturing/applications/analytical-instrument.webp",
    syntheticBiology:
      "/images/about/research-manufacturing/applications/synthetic-biology.webp",
    labAutomation:
      "/images/about/research-manufacturing/applications/lab-automation.webp",
  },

  why: "/images/about/research-manufacturing/why/why-choose-bg.webp",

  cta: "/images/about/research-manufacturing/cta/contact-bg.webp",
};

/* =========================================================
   4. 页面数据类型
   说明：
   定义清楚数据结构，后续组件调用时更稳定
========================================================= */
export type ResearchManufacturingAbilityCard = {
  title: string;
  alt: string;
  points: string[];
};

export type ResearchManufacturingProcessStep = {
  no: string;
  title: string;
  points: string[];
};

export type ResearchManufacturingApplicationCard = {
  title: string;
  alt: string;
  desc: string;
};

export type ResearchManufacturingWhyCard = {
  title: string;
  desc: string;
};

export type ResearchManufacturingPageText = {
  hero: {
    title: string;
    desc: string;
    alt: string;
  };

  intro: {
    imageMark: string;
    title: string;
    desc: string;
    alt: string;
  };

  abilityTitle: string;
  abilityCards: ResearchManufacturingAbilityCard[];

  processDefault: string;
  processAlt: string;
  processSteps: ResearchManufacturingProcessStep[];

  applications: {
    title: string;
    desc: string;
    cards: ResearchManufacturingApplicationCard[];
  };

  why: {
    title: string;
    subtitle: string;
    alt: string;
    cards: ResearchManufacturingWhyCard[];
  };

  cta: {
    title: string;
    desc: string;
    button: string;
    alt: string;
  };
};

/* =========================================================
   5. SEO 数据类型
========================================================= */
export type ResearchManufacturingSeo = {
  title: string;
  description: string;
};

/* =========================================================
   6. 页面 SEO 多语言数据
   说明：
   这里用于 page.tsx / generateMetadata
========================================================= */
export const researchManufacturingSeoMap: Record<
  ResearchManufacturingLocale,
  ResearchManufacturingSeo
> = {
  "zh-CN": {
    title: "研发与制造能力｜恒永达微流体核心零部件与液路解决方案",
    description:
      "恒永达围绕泵、阀、传感器、管路、连接件、采样针及驱动控制模块，构建研发中心、机加中心、挤塑中心与工程验证能力，支撑微流体核心零部件从产品设计到稳定交付。",
  },

  en: {
    title:
      "R&D and Manufacturing Capabilities | FOREACH Microfluidic Components",
    description:
      "FOREACH builds R&D, precision machining, extrusion manufacturing and engineering validation capabilities for pumps, valves, sensors, tubing, fittings, sampling probes and drive control modules.",
  },

  es: {
    title:
      "Capacidades de I+D y fabricación | Componentes microfluídicos FOREACH",
    description:
      "FOREACH desarrolla capacidades de I+D, mecanizado de precisión, extrusión y validación de ingeniería para bombas, válvulas, sensores, tubos, conectores, agujas de muestreo y módulos de control.",
  },

  fr: {
    title:
      "Capacités R&D et fabrication | Composants microfluidiques FOREACH",
    description:
      "FOREACH développe des capacités de R&D, d’usinage de précision, d’extrusion et de validation d’ingénierie pour pompes, vannes, capteurs, tubes, raccords, aiguilles de prélèvement et modules de commande.",
  },

  ko: {
    title: "연구개발 및 제조 역량 | FOREACH 미세유체 핵심 부품",
    description:
      "FOREACH는 펌프, 밸브, 센서, 튜빙, 피팅, 샘플링 프로브 및 구동 제어 모듈을 위한 연구개발, 정밀 가공, 압출 제조 및 엔지니어링 검증 역량을 구축합니다.",
  },

  ru: {
    title:
      "Возможности НИОКР и производства | Микрофлюидные компоненты FOREACH",
    description:
      "FOREACH развивает возможности НИОКР, точной механообработки, экструзии и инженерной валидации для насосов, клапанов, датчиков, трубок, фитингов, пробоотборных игл и модулей управления.",
  },
};

/* =========================================================
   7. 页面多语言文案
   说明：
   所有正文、标题、卡片、流程、按钮文字都放这里
========================================================= */
export const researchManufacturingTextMap: Record<
  ResearchManufacturingLocale,
  ResearchManufacturingPageText
> = {
  "zh-CN": {
    hero: {
      title: "研发与制造能力",
      desc: "围绕微流体系统核心零部件，构建从产品研发、精密机加、挤塑制造到工程验证的全流程能力",
      alt: "恒永达研发与制造能力页面 Banner",
    },

    intro: {
      imageMark: "", 
      title: "从产品设计到稳定交付",
      desc: "恒永达研发与工程团队长期聚焦微流体系统核心零部件及液路应用技术，围绕泵、阀、传感器、管路、连接件、采样针及驱动控制模块开展产品开发与工程转化。团队由产品研发、结构设计、工艺验证、项目支持等职能协同组成，总人力 60+ 人，具备从需求分析、方案设计、样品试制、测试验证到量产导入的完整研发支持能力，为公司产品可靠性、技术迭代和客户项目交付提供持续支撑。",
      alt: "恒永达研发、制造、验证与交付协同能力",
    },

    abilityTitle: "研发与制造实力",

    abilityCards: [
      {
        title: "研发中心",
        alt: "恒永达研发中心，微流体核心零部件研发与工程团队",
        points: [
          "总人力 60+ 人，覆盖产品研发、结构设计、工艺验证与项目支持等职能。",
          "围绕泵、阀、传感器、管路、连接件、采样针及驱动控制模块开展产品开发。",
          "支持客户从需求分析、方案设计、样品试制到测试验证和量产导入。",
        ],
      },
      {
        title: "机加中心",
        alt: "恒永达机加中心，核心零件加工与结构件制造",
        points: [
          "配备经验丰富的机加工艺人员与一线技术人员。",
          "围绕泵阀结构件、连接件、采样针及相关核心零件开展加工制造。",
          "重点保障产品结构实现、尺寸一致性、表面质量与装配适配。",
        ],
      },
      {
        title: "挤塑中心",
        alt: "恒永达挤塑中心，微流体管路与橡塑件制造",
        points: [
          "围绕微流体管路、橡塑件及相关流体组件配套需求建设挤塑制造能力。",
          "开展管路挤出、材料适配、尺寸控制与组件化配套工作。",
          "提升液路产品供应完整性、项目响应效率和批量交付稳定性。",
        ],
      },
    ],

    processDefault:
      "从客户需求到批量交付，贯通研发、机加、挤塑、验证与交付流程",

    processAlt: "恒永达从客户需求到批量交付的研发制造流程背景图",

    processSteps: [
      {
        no: "01",
        title: "需求理解",
        points: [
          "确认目标流量范围、精度要求与运行节拍",
          "明确压力范围、背压条件与耐压需求",
          "识别接触介质、腐蚀性与材料兼容性",
          "评估安装空间、接口方向与整机布局限制",
          "了解寿命周期、使用频次与维护要求",
          "确认控制方式、电气接口与系统联动逻辑",
        ],
      },
      {
        no: "02",
        title: "方案设计",
        points: [
          "根据工况选择泵、阀、传感器、管路与连接件组合",
          "确认流路连接方式、接口规格与安装方向",
          "评估是否需要定制结构、特殊材料或组件化配套",
          "匹配驱动控制方式、信号接口与整机控制逻辑",
          "预留后续样品验证、装配测试和量产导入要求",
        ],
      },
      {
        no: "03",
        title: "样品开发",
        points: [
          "完成产品结构、核心零件和管路组件样品准备",
          "结合机加、挤塑与装配要求进行样品试制",
          "进行初步装配、通液测试和运行调试",
          "记录样品问题、尺寸偏差与装配反馈",
          "根据测试结果优化结构、材料或工艺参数",
        ],
      },
      {
        no: "04",
        title: "测试验证",
        points: [
          "验证流量输出、压力稳定性与重复性表现",
          "确认密封性能、气密性和连接可靠性",
          "评估材料兼容性、接液风险与长期稳定性",
          "开展寿命、循环运行和极限工况测试",
          "形成测试记录，为客户导入和内部优化提供依据",
        ],
      },
      {
        no: "05",
        title: "小批量导入",
        points: [
          "配合客户完成小批量样品确认与装机验证",
          "跟踪实际应用中的流量、压力、密封和装配反馈",
          "根据客户问题进行结构、工艺或材料调整",
          "固化关键工艺、检测项目和出厂确认标准",
          "为后续批量交付建立稳定的制造与质量控制基础",
        ],
      },
      {
        no: "06",
        title: "批量交付",
        points: [
          "根据客户订单和项目节奏组织稳定生产",
          "依托机加、挤塑、装配与测试流程保障交付一致性",
          "执行过程检验、出厂测试和质量追溯要求",
          "持续跟踪客户使用反馈，支持产品改进与版本迭代",
          "为长期项目配套提供稳定供应和工程支持",
        ],
      },
    ],

    applications: {
      title: "产品应用与验证场景",
      desc: "恒永达微流体核心零部件可应用于 IVD、生命科学、高端分析仪器、合成生物和实验室自动化等设备场景，并在客户项目中持续完成选型、验证与导入。",
      cards: [
        {
          title: "IVD 体外诊断设备",
          alt: "IVD 体外诊断设备液路系统应用场景",
          desc: "用于样本处理、试剂分配、清洗废液、流路切换等液路模块，支撑诊断设备稳定运行。",
        },
        {
          title: "生命科学设备",
          alt: "生命科学设备液体处理与样本前处理应用场景",
          desc: "面向移液、分液、反应体系构建与样本前处理等场景，支持精密液体操作和系统集成。",
        },
        {
          title: "高端分析仪器",
          alt: "高端分析仪器精密进样与流路切换应用场景",
          desc: "用于精密进样、流路切换、高压流体控制和检测前处理等场景，满足分析仪器液路要求。",
        },
        {
          title: "合成生物设备",
          alt: "合成生物设备自动化生物制造液路应用场景",
          desc: "支持培养基、试剂、样本和反应液的定量输送、分配与切换，服务自动化生物制造流程。",
        },
        {
          title: "实验室自动化",
          alt: "实验室自动化移液加样与多通道流路管理应用场景",
          desc: "应用于自动移液、加样、清洗、废液处理与多通道流路管理，提升实验流程自动化水平。",
        },
      ],
    },

    why: {
      title: "为什么选择恒永达",
      subtitle: "研发 · 制造 · 服务",
      alt: "恒永达研发制造与工程服务背景图",
      cards: [
        {
          title: "研发前置",
          desc: "在客户项目早期参与需求分析、产品选型、结构评估与样品验证，帮助液路方案更快进入可制造阶段。",
        },
        {
          title: "定制与灵活配套",
          desc: "结合泵、阀、传感器、管路、连接件、采样针及驱动控制模块，支持不同流量、压力、介质与安装空间需求。",
        },
        {
          title: "工程服务支持",
          desc: "从样品确认、小批量导入到批量交付，持续提供问题反馈、测试验证和方案优化支持。",
        },
      ],
    },

    cta: {
      title: "需要液路产品与方案支持？",
      desc: "恒永达可协助客户完成产品选型、机加与挤塑配套、样品验证、定制开发与项目导入。",
      button: "联系恒永达",
      alt: "恒永达液路产品与方案支持背景图",
    },
  },

  en: {
    hero: {
      title: "R&D and Manufacturing Capabilities",
      desc: "Building full-process capabilities from product development, precision machining and extrusion manufacturing to engineering validation for microfluidic core components.",
      alt: "FOREACH R&D and manufacturing capabilities banner",
    },

    intro: {
      imageMark: " ",
      title: "From Product Design to Stable Delivery",
      desc: "FOREACH’s R&D and engineering teams focus on microfluidic core components and fluidic application technologies, covering pumps, valves, sensors, tubing, fittings, sampling probes and drive control modules. With 60+ R&D and engineering personnel across product development, structural design, process validation and project support, FOREACH supports the full process from requirement analysis and concept design to prototyping, testing, validation and production introduction.",
      alt: "FOREACH R&D, manufacturing, validation and delivery capabilities",
    }, 

    abilityTitle: "R&D and Manufacturing Strengths",

    abilityCards: [
      {
        title: "R&D Center",
        alt: "FOREACH R&D center for microfluidic core components",
        points: [
          "60+ R&D and engineering personnel covering product development, structural design, process validation and project support.",
          "Focused development of pumps, valves, sensors, tubing, fittings, sampling probes and drive control modules.",
          "Supporting customers from requirement analysis and solution design to prototyping, testing and production introduction.",
        ],
      },
      {
        title: "Machining Center",
        alt: "FOREACH machining center for core parts and structural components",
        points: [
          "Experienced machining technicians and frontline process specialists.",
          "Manufacturing structural parts for pumps, valves, fittings, sampling probes and related core components.",
          "Ensuring structural realization, dimensional consistency, surface quality and assembly compatibility.",
        ],
      },
      {
        title: "Extrusion Center",
        alt: "FOREACH extrusion center for microfluidic tubing and elastomer components",
        points: [
          "Extrusion capability for microfluidic tubing, elastomer parts and related fluidic assemblies.",
          "Supporting tubing extrusion, material matching, dimensional control and assembly integration.",
          "Improving supply completeness, project response efficiency and stable batch delivery.",
        ],
      },
    ],

    processDefault:
      "From customer requirements to batch delivery, integrating R&D, machining, extrusion, validation and delivery processes.",

    processAlt: "FOREACH R&D and manufacturing process background",

    processSteps: [
      {
        no: "01",
        title: "Requirement Analysis",
        points: [
          "Confirm target flow range, accuracy requirements and operating rhythm",
          "Define pressure range, back-pressure conditions and pressure resistance",
          "Identify wetted media, corrosion risks and material compatibility",
          "Evaluate installation space, interface direction and instrument layout limits",
          "Understand lifetime, usage frequency and maintenance requirements",
          "Confirm control method, electrical interface and system logic",
        ],
      },
      {
        no: "02",
        title: "Solution Design",
        points: [
          "Select pumps, valves, sensors, tubing and fittings based on working conditions",
          "Confirm fluidic connection method, interface specifications and installation direction",
          "Evaluate customized structure, special materials or assembly requirements",
          "Match drive control methods, signal interfaces and system control logic",
          "Reserve requirements for later validation, assembly testing and production introduction",
        ],
      },
      {
        no: "03",
        title: "Prototype Development",
        points: [
          "Prepare product structures, core parts and tubing assembly samples",
          "Build prototypes based on machining, extrusion and assembly requirements",
          "Conduct preliminary assembly, fluid testing and operation adjustment",
          "Record prototype issues, dimensional deviations and assembly feedback",
          "Optimize structure, materials or process parameters based on test results",
        ],
      },
      {
        no: "04",
        title: "Testing and Validation",
        points: [
          "Validate flow output, pressure stability and repeatability",
          "Confirm sealing performance, air tightness and connection reliability",
          "Assess material compatibility, wetted risks and long-term stability",
          "Conduct lifetime, cyclic operation and limit-condition tests",
          "Generate test records for customer introduction and internal optimization",
        ],
      },
      {
        no: "05",
        title: "Pilot Introduction",
        points: [
          "Support customer pilot sample confirmation and installation validation",
          "Track flow, pressure, sealing and assembly feedback in real applications",
          "Adjust structure, process or material based on customer feedback",
          "Solidify key process steps, inspection items and outgoing standards",
          "Build a stable manufacturing and quality basis for batch delivery",
        ],
      },
      {
        no: "06",
        title: "Batch Delivery",
        points: [
          "Organize stable production according to customer orders and project timelines",
          "Ensure delivery consistency through machining, extrusion, assembly and testing processes",
          "Execute in-process inspection, outgoing testing and quality traceability",
          "Track customer feedback for product improvement and version iteration",
          "Provide stable supply and engineering support for long-term projects",
        ],
      },
    ],

    applications: {
      title: "Product Application and Validation Scenarios",
      desc: "FOREACH microfluidic core components are applied in IVD, life science, high-end analytical instruments, synthetic biology and laboratory automation equipment, supporting selection, validation and project introduction.",
      cards: [
        {
          title: "IVD Diagnostic Equipment",
          alt: "Fluidic system application scenario for IVD diagnostic equipment",
          desc: "Used in sample processing, reagent dispensing, washing, waste handling and flow path switching modules to support stable diagnostic equipment operation.",
        },
        {
          title: "Life Science Equipment",
          alt: "Liquid handling and sample preparation scenarios for life science equipment",
          desc: "Supporting pipetting, dispensing, reaction system building and sample preparation for precise liquid handling and system integration.",
        },
        {
          title: "High-end Analytical Instruments",
          alt: "Precision injection and flow path switching scenarios for analytical instruments",
          desc: "Used in precision injection, flow path switching, high-pressure fluid control and pre-detection processing.",
        },
        {
          title: "Synthetic Biology Equipment",
          alt: "Automated bio-manufacturing fluidic application scenarios",
          desc: "Supporting quantitative delivery, dispensing and switching of media, reagents, samples and reaction liquids.",
        },
        {
          title: "Laboratory Automation",
          alt: "Laboratory automation scenarios for pipetting, dispensing and multi-channel flow management",
          desc: "Applied in automated pipetting, dispensing, washing, waste handling and multi-channel flow management.",
        },
      ],
    },

    why: {
      title: "Why Choose FOREACH",
      subtitle: "R&D · Manufacturing · Service",
      alt: "FOREACH R&D, manufacturing and engineering service background",
      cards: [
        {
          title: "Early R&D Involvement",
          desc: "Participating in requirement analysis, product selection, structural evaluation and prototype validation at the early stage of customer projects.",
        },
        {
          title: "Customization and Flexibility",
          desc: "Supporting different flow, pressure, media and installation space requirements with pumps, valves, sensors, tubing, fittings, sampling probes and control modules.",
        },
        {
          title: "Engineering Support",
          desc: "Providing continuous issue feedback, testing, validation and solution optimization from prototype confirmation to batch delivery.",
        },
      ],
    },

    cta: {
      title: "Need Fluidic Product and Solution Support?",
      desc: "FOREACH can support product selection, machining and extrusion matching, prototype validation, customized development and project introduction.",
      button: "Contact FOREACH",
      alt: "FOREACH fluidic product and solution support background",
    },
  },

  es: {
    hero: {
      title: "Capacidades de I+D y fabricación",
      desc: "Desarrollamos capacidades integradas desde el desarrollo de producto, mecanizado de precisión y extrusión hasta la validación de ingeniería para componentes microfluídicos.",
      alt: "Banner de capacidades de I+D y fabricación de FOREACH",
    },
    intro: {
      imageMark: " ", 
      title: "Del diseño del producto a la entrega estable",
      desc: "El equipo de I+D e ingeniería de FOREACH se centra en componentes microfluídicos clave y tecnologías de aplicación fluídica, incluyendo bombas, válvulas, sensores, tubos, conectores, agujas de muestreo y módulos de control. Con más de 60 personas en I+D e ingeniería, apoyamos el proceso completo desde el análisis de requisitos y diseño de soluciones hasta el prototipo, las pruebas, la validación y la introducción a producción.",
      alt: "Capacidades de I+D, fabricación, validación y entrega de FOREACH",
    },
    abilityTitle: "Fortalezas de I+D y fabricación",
    abilityCards: [
      {
        title: "Centro de I+D",
        alt: "Centro de I+D de FOREACH para componentes microfluídicos",
        points: [
          "Más de 60 personas cubren desarrollo de producto, diseño estructural, validación de procesos y soporte de proyectos.",
          "Desarrollo enfocado en bombas, válvulas, sensores, tubos, conectores, agujas de muestreo y módulos de control.",
          "Soporte desde el análisis de requisitos y diseño de soluciones hasta el prototipo, prueba e introducción a producción.",
        ],
      },
      {
        title: "Centro de mecanizado",
        alt: "Centro de mecanizado de FOREACH para piezas clave",
        points: [
          "Técnicos de mecanizado y especialistas de proceso con experiencia.",
          "Fabricación de piezas estructurales para bombas, válvulas, conectores, agujas de muestreo y componentes clave.",
          "Garantiza realización estructural, consistencia dimensional, calidad superficial y compatibilidad de montaje.",
        ],
      },
      {
        title: "Centro de extrusión",
        alt: "Centro de extrusión de FOREACH para tubos microfluídicos",
        points: [
          "Capacidad de extrusión para tubos microfluídicos, piezas elastoméricas y ensamblajes fluídicos.",
          "Soporte en extrusión de tubos, selección de materiales, control dimensional e integración de ensamblajes.",
          "Mejora la integridad del suministro, la respuesta del proyecto y la estabilidad de entrega por lotes.",
        ],
      },
    ],
    processDefault:
      "De los requisitos del cliente a la entrega por lotes, integrando I+D, mecanizado, extrusión, validación y entrega.",
    processAlt: "Fondo del proceso de I+D y fabricación de FOREACH",
    processSteps: [
      {
        no: "01",
        title: "Análisis de requisitos",
        points: [
          "Confirmar rango de caudal, precisión requerida y ritmo de operación",
          "Definir rango de presión, contrapresión y resistencia a presión",
          "Identificar medios en contacto, riesgo de corrosión y compatibilidad de materiales",
          "Evaluar espacio de instalación, dirección de interfaces y limitaciones del equipo",
          "Comprender vida útil, frecuencia de uso y requisitos de mantenimiento",
          "Confirmar método de control, interfaz eléctrica y lógica del sistema",
        ],
      },
      {
        no: "02",
        title: "Diseño de solución",
        points: [
          "Seleccionar bombas, válvulas, sensores, tubos y conectores según las condiciones",
          "Confirmar método de conexión fluídica, especificaciones de interfaz e instalación",
          "Evaluar estructura personalizada, materiales especiales o requisitos de ensamblaje",
          "Adaptar métodos de control, interfaces de señal y lógica del sistema",
          "Reservar requisitos para validación, pruebas de montaje e introducción a producción",
        ],
      },
      {
        no: "03",
        title: "Desarrollo de prototipos",
        points: [
          "Preparar estructuras de producto, piezas clave y muestras de conjuntos de tubos",
          "Construir prototipos según requisitos de mecanizado, extrusión y montaje",
          "Realizar montaje preliminar, pruebas de fluido y ajuste operativo",
          "Registrar problemas, desviaciones dimensionales y retroalimentación de montaje",
          "Optimizar estructura, materiales o parámetros de proceso según los resultados",
        ],
      },
      {
        no: "04",
        title: "Pruebas y validación",
        points: [
          "Validar salida de caudal, estabilidad de presión y repetibilidad",
          "Confirmar sellado, hermeticidad y confiabilidad de conexión",
          "Evaluar compatibilidad de materiales, riesgos de contacto y estabilidad a largo plazo",
          "Realizar pruebas de vida útil, ciclos y condiciones límite",
          "Generar registros de prueba para introducción del cliente y optimización interna",
        ],
      },
      {
        no: "05",
        title: "Introducción piloto",
        points: [
          "Apoyar confirmación de muestras piloto y validación de instalación",
          "Seguir retroalimentación de caudal, presión, sellado y montaje en aplicaciones reales",
          "Ajustar estructura, proceso o material según la retroalimentación del cliente",
          "Consolidar procesos clave, elementos de inspección y estándares de salida",
          "Crear una base estable de fabricación y calidad para entrega por lotes",
        ],
      },
      {
        no: "06",
        title: "Entrega por lotes",
        points: [
          "Organizar producción estable según pedidos y cronograma del proyecto",
          "Asegurar consistencia mediante mecanizado, extrusión, montaje y pruebas",
          "Ejecutar inspección en proceso, pruebas de salida y trazabilidad de calidad",
          "Seguir retroalimentación del cliente para mejora e iteración del producto",
          "Proporcionar suministro estable y soporte de ingeniería para proyectos a largo plazo",
        ],
      },
    ],
    applications: {
      title: "Escenarios de aplicación y validación",
      desc: "Los componentes microfluídicos de FOREACH se aplican en IVD, ciencias de la vida, instrumentos analíticos de alta gama, biología sintética y automatización de laboratorio, apoyando la selección, validación e introducción de proyectos.",
      cards: [
        {
          title: "Equipos IVD",
          alt: "Escenario de sistema fluídico para equipos IVD",
          desc: "Usado en procesamiento de muestras, dispensación de reactivos, lavado, residuos y conmutación de rutas fluídicas.",
        },
        {
          title: "Equipos de ciencias de la vida",
          alt: "Escenarios de manejo de líquidos y preparación de muestras",
          desc: "Soporta pipeteo, dispensación, construcción de sistemas de reacción y preparación de muestras.",
        },
        {
          title: "Instrumentos analíticos",
          alt: "Escenarios de inyección precisa y conmutación fluídica",
          desc: "Aplicado en inyección precisa, conmutación de rutas, control de fluidos de alta presión y pretratamiento.",
        },
        {
          title: "Equipos de biología sintética",
          alt: "Escenarios fluídicos para biofabricación automatizada",
          desc: "Soporta entrega cuantitativa, dispensación y conmutación de medios, reactivos, muestras y líquidos de reacción.",
        },
        {
          title: "Automatización de laboratorio",
          alt: "Escenarios de pipeteo, dispensación y gestión multicanal",
          desc: "Aplicado en pipeteo automático, dispensación, lavado, residuos y gestión de flujo multicanal.",
        },
      ],
    },
    why: {
      title: "Por qué elegir FOREACH",
      subtitle: "I+D · Fabricación · Servicio",
      alt: "Fondo de I+D, fabricación y servicio de ingeniería de FOREACH",
      cards: [
        {
          title: "I+D desde la etapa inicial",
          desc: "Participamos en análisis de requisitos, selección de productos, evaluación estructural y validación de prototipos en fases tempranas.",
        },
        {
          title: "Personalización y flexibilidad",
          desc: "Apoyamos diferentes requisitos de caudal, presión, medios y espacio de instalación con módulos fluídicos clave.",
        },
        {
          title: "Soporte de ingeniería",
          desc: "Proporcionamos retroalimentación, pruebas, validación y optimización desde la muestra hasta la entrega por lotes.",
        },
      ],
    },
    cta: {
      title: "¿Necesita soporte para productos y soluciones fluídicas?",
      desc: "FOREACH puede apoyar la selección de productos, validación de muestras, desarrollo personalizado e introducción de proyectos.",
      button: "Contactar con FOREACH",
      alt: "Fondo de soporte de productos y soluciones fluídicas de FOREACH",
    },
  },

  fr: {
    hero: {
      title: "Capacités R&D et fabrication",
      desc: "Des capacités intégrées allant du développement produit, de l’usinage de précision et de l’extrusion à la validation d’ingénierie pour les composants microfluidiques.",
      alt: "Bannière des capacités R&D et fabrication de FOREACH",
    },
    intro: {
      imageMark: " ", 
      title: "De la conception produit à la livraison stable",
      desc: "Les équipes R&D et ingénierie de FOREACH se concentrent sur les composants microfluidiques clés et les technologies d’application fluidique, couvrant pompes, vannes, capteurs, tubes, raccords, aiguilles de prélèvement et modules de commande. Avec plus de 60 personnes en R&D et ingénierie, FOREACH accompagne l’analyse des besoins, la conception, le prototypage, les tests, la validation et l’introduction en production.",
      alt: "Capacités R&D, fabrication, validation et livraison de FOREACH",
    },
    abilityTitle: "Forces R&D et fabrication",
    abilityCards: [
      {
        title: "Centre R&D",
        alt: "Centre R&D FOREACH pour composants microfluidiques",
        points: [
          "Plus de 60 personnes couvrent le développement produit, la conception structurelle, la validation des procédés et le support projet.",
          "Développement de pompes, vannes, capteurs, tubes, raccords, aiguilles de prélèvement et modules de commande.",
          "Support de l’analyse des besoins à la conception, au prototypage, aux tests et à l’introduction en production.",
        ],
      },
      {
        title: "Centre d’usinage",
        alt: "Centre d’usinage FOREACH pour pièces clés",
        points: [
          "Techniciens expérimentés en usinage et spécialistes de procédés.",
          "Fabrication de pièces structurelles pour pompes, vannes, raccords, aiguilles de prélèvement et composants clés.",
          "Garantie de la réalisation structurelle, de la cohérence dimensionnelle, de la qualité de surface et de l’adaptation d’assemblage.",
        ],
      },
      {
        title: "Centre d’extrusion",
        alt: "Centre d’extrusion FOREACH pour tubes microfluidiques",
        points: [
          "Capacité d’extrusion pour tubes microfluidiques, pièces élastomères et assemblages fluidiques.",
          "Support de l’extrusion, de l’adaptation matière, du contrôle dimensionnel et de l’intégration d’assemblage.",
          "Amélioration de la complétude d’approvisionnement, de la réactivité projet et de la stabilité de livraison.",
        ],
      },
    ],
    processDefault:
      "Des besoins client à la livraison en série, en intégrant R&D, usinage, extrusion, validation et livraison.",
    processAlt: "Fond du processus R&D et fabrication de FOREACH",
    processSteps: [
      {
        no: "01",
        title: "Analyse des besoins",
        points: [
          "Confirmer la plage de débit, la précision requise et le rythme de fonctionnement",
          "Définir la plage de pression, les conditions de contre-pression et la résistance",
          "Identifier les milieux en contact, les risques de corrosion et la compatibilité matière",
          "Évaluer l’espace d’installation, l’orientation des interfaces et les limites d’intégration",
          "Comprendre la durée de vie, la fréquence d’utilisation et les besoins de maintenance",
          "Confirmer le mode de commande, l’interface électrique et la logique système",
        ],
      },
      {
        no: "02",
        title: "Conception de solution",
        points: [
          "Sélectionner pompes, vannes, capteurs, tubes et raccords selon les conditions",
          "Confirmer les connexions fluidiques, les interfaces et le sens d’installation",
          "Évaluer les besoins de structure personnalisée, matériaux spéciaux ou assemblage",
          "Adapter les modes de commande, interfaces de signal et logique système",
          "Prévoir les exigences de validation, test d’assemblage et introduction en production",
        ],
      },
      {
        no: "03",
        title: "Développement prototype",
        points: [
          "Préparer les structures produit, pièces clés et échantillons d’assemblage de tubes",
          "Réaliser des prototypes selon les exigences d’usinage, d’extrusion et d’assemblage",
          "Effectuer l’assemblage préliminaire, les essais fluidiques et les ajustements",
          "Enregistrer les problèmes, écarts dimensionnels et retours d’assemblage",
          "Optimiser la structure, les matériaux ou paramètres de procédé selon les résultats",
        ],
      },
      {
        no: "04",
        title: "Tests et validation",
        points: [
          "Valider le débit, la stabilité de pression et la répétabilité",
          "Confirmer l’étanchéité, la fiabilité des connexions et l’absence de fuite",
          "Évaluer la compatibilité matière, les risques de contact et la stabilité long terme",
          "Réaliser des essais de durée de vie, cycles et conditions limites",
          "Former des enregistrements de test pour l’introduction client et l’optimisation interne",
        ],
      },
      {
        no: "05",
        title: "Introduction pilote",
        points: [
          "Soutenir la confirmation d’échantillons pilotes et la validation d’installation",
          "Suivre les retours de débit, pression, étanchéité et assemblage en application réelle",
          "Ajuster la structure, le procédé ou le matériau selon les retours client",
          "Stabiliser les procédés clés, les contrôles et les standards de sortie",
          "Créer une base stable de fabrication et qualité pour la livraison en série",
        ],
      },
      {
        no: "06",
        title: "Livraison en série",
        points: [
          "Organiser une production stable selon les commandes et le calendrier projet",
          "Assurer la cohérence par l’usinage, l’extrusion, l’assemblage et les tests",
          "Exécuter les contrôles en cours, tests de sortie et traçabilité qualité",
          "Suivre les retours clients pour l’amélioration et l’itération produit",
          "Fournir un approvisionnement stable et un support ingénierie long terme",
        ],
      },
    ],
    applications: {
      title: "Scénarios d’application et de validation",
      desc: "Les composants microfluidiques FOREACH sont utilisés dans l’IVD, les sciences de la vie, les instruments analytiques haut de gamme, la biologie synthétique et l’automatisation de laboratoire.",
      cards: [
        {
          title: "Équipements IVD",
          alt: "Scénario de système fluidique pour équipements IVD",
          desc: "Utilisés pour le traitement d’échantillons, la distribution de réactifs, le lavage, les déchets et la commutation de voies fluidiques.",
        },
        {
          title: "Équipements sciences de la vie",
          alt: "Scénarios de manipulation de liquides et préparation d’échantillons",
          desc: "Support du pipetage, de la distribution, de la construction de systèmes de réaction et de la préparation d’échantillons.",
        },
        {
          title: "Instruments analytiques",
          alt: "Scénarios d’injection précise et de commutation fluidique",
          desc: "Applications en injection précise, commutation de voies, contrôle haute pression et prétraitement.",
        },
        {
          title: "Équipements de biologie synthétique",
          alt: "Scénarios fluidiques pour biofabrication automatisée",
          desc: "Support du dosage, de la distribution et de la commutation de milieux, réactifs, échantillons et liquides réactionnels.",
        },
        {
          title: "Automatisation de laboratoire",
          alt: "Scénarios de pipetage, distribution et gestion multicanal",
          desc: "Applications en pipetage automatique, distribution, lavage, déchets et gestion de flux multicanaux.",
        },
      ],
    },
    why: {
      title: "Pourquoi choisir FOREACH",
      subtitle: "R&D · Fabrication · Service",
      alt: "Fond R&D, fabrication et service d’ingénierie FOREACH",
      cards: [
        {
          title: "R&D en amont",
          desc: "Participation précoce à l’analyse des besoins, au choix produit, à l’évaluation structurelle et à la validation des prototypes.",
        },
        {
          title: "Personnalisation et flexibilité",
          desc: "Support des besoins de débit, pression, fluide et espace d’installation avec des modules fluidiques clés.",
        },
        {
          title: "Support d’ingénierie",
          desc: "Retour d’expérience, tests, validation et optimisation de solution de l’échantillon à la livraison en série.",
        },
      ],
    },
    cta: {
      title: "Besoin de support pour vos produits et solutions fluidiques ?",
      desc: "FOREACH peut accompagner la sélection produit, la validation d’échantillons, le développement personnalisé et l’introduction projet.",
      button: "Contacter FOREACH",
      alt: "Fond de support produit et solution fluidique FOREACH",
    },
  },

  ko: {
    hero: {
      title: "연구개발 및 제조 역량",
      desc: "미세유체 핵심 부품을 위해 제품 개발, 정밀 가공, 압출 제조부터 엔지니어링 검증까지 전 과정 역량을 구축합니다.",
      alt: "FOREACH 연구개발 및 제조 역량 배너",
    },
    intro: {
      imageMark: " ",
      title: "제품 설계부터 안정적인 납품까지",
      desc: "FOREACH는 펌프, 밸브, 센서, 튜빙, 피팅, 샘플링 프로브 및 구동 제어 모듈을 포함한 미세유체 핵심 부품과 유로 응용 기술에 집중합니다. 60명 이상의 연구개발 및 엔지니어링 인력을 바탕으로 요구 분석, 설계, 시제품 제작, 테스트 검증 및 양산 도입을 지원합니다.",
      alt: "FOREACH 연구개발, 제조, 검증 및 납품 역량",
    },
    abilityTitle: "연구개발 및 제조 강점",
    abilityCards: [
      {
        title: "연구개발 센터",
        alt: "FOREACH 미세유체 핵심 부품 연구개발 센터",
        points: [
          "60명 이상의 인력이 제품 개발, 구조 설계, 공정 검증 및 프로젝트 지원을 담당합니다.",
          "펌프, 밸브, 센서, 튜빙, 피팅, 샘플링 프로브 및 제어 모듈 개발에 집중합니다.",
          "요구 분석부터 설계, 시제품 제작, 테스트 및 양산 도입까지 지원합니다.",
        ],
      },
      {
        title: "정밀 가공 센터",
        alt: "FOREACH 핵심 부품 정밀 가공 센터",
        points: [
          "풍부한 경험을 갖춘 가공 기술자와 현장 공정 인력을 보유하고 있습니다.",
          "펌프, 밸브, 피팅, 샘플링 프로브 및 핵심 구조 부품을 제조합니다.",
          "구조 구현, 치수 일관성, 표면 품질 및 조립 적합성을 보장합니다.",
        ],
      },
      {
        title: "압출 센터",
        alt: "FOREACH 미세유체 튜빙 및 탄성 부품 압출 센터",
        points: [
          "미세유체 튜빙, 탄성 부품 및 관련 유체 어셈블리 압출 역량을 구축합니다.",
          "튜빙 압출, 소재 매칭, 치수 관리 및 어셈블리 통합을 지원합니다.",
          "공급 완성도, 프로젝트 대응 속도 및 대량 납품 안정성을 향상합니다.",
        ],
      },
    ],
    processDefault:
      "고객 요구부터 대량 납품까지 연구개발, 가공, 압출, 검증 및 납품 프로세스를 통합합니다.",
    processAlt: "FOREACH 연구개발 및 제조 프로세스 배경",
    processSteps: [
      {
        no: "01",
        title: "요구 분석",
        points: [
          "목표 유량 범위, 정밀도 요구 및 운전 리듬 확인",
          "압력 범위, 배압 조건 및 내압 요구 정의",
          "접액 매체, 부식 위험 및 소재 호환성 확인",
          "설치 공간, 인터페이스 방향 및 장비 레이아웃 제한 평가",
          "수명, 사용 빈도 및 유지보수 요구 파악",
          "제어 방식, 전기 인터페이스 및 시스템 연동 로직 확인",
        ],
      },
      {
        no: "02",
        title: "솔루션 설계",
        points: [
          "작동 조건에 따라 펌프, 밸브, 센서, 튜빙 및 피팅 조합 선정",
          "유로 연결 방식, 인터페이스 규격 및 설치 방향 확인",
          "맞춤 구조, 특수 소재 또는 어셈블리 요구 평가",
          "구동 제어 방식, 신호 인터페이스 및 시스템 제어 로직 매칭",
          "후속 검증, 조립 테스트 및 양산 도입 요구 반영",
        ],
      },
      {
        no: "03",
        title: "시제품 개발",
        points: [
          "제품 구조, 핵심 부품 및 튜빙 어셈블리 샘플 준비",
          "가공, 압출 및 조립 요구에 따라 시제품 제작",
          "초기 조립, 유체 테스트 및 운전 조정 수행",
          "시제품 문제, 치수 편차 및 조립 피드백 기록",
          "테스트 결과에 따라 구조, 소재 또는 공정 파라미터 최적화",
        ],
      },
      {
        no: "04",
        title: "테스트 및 검증",
        points: [
          "유량 출력, 압력 안정성 및 반복성 검증",
          "밀봉 성능, 기밀성 및 연결 신뢰성 확인",
          "소재 호환성, 접액 위험 및 장기 안정성 평가",
          "수명, 반복 운전 및 한계 조건 테스트 수행",
          "고객 도입 및 내부 최적화를 위한 테스트 기록 형성",
        ],
      },
      {
        no: "05",
        title: "소량 도입",
        points: [
          "고객의 소량 샘플 확인 및 장착 검증 지원",
          "실제 적용 중 유량, 압력, 밀봉 및 조립 피드백 추적",
          "고객 피드백에 따라 구조, 공정 또는 소재 조정",
          "핵심 공정, 검사 항목 및 출하 기준 안정화",
          "대량 납품을 위한 안정적인 제조 및 품질 기반 구축",
        ],
      },
      {
        no: "06",
        title: "대량 납품",
        points: [
          "고객 주문 및 프로젝트 일정에 따라 안정적인 생산 조직",
          "가공, 압출, 조립 및 테스트 프로세스로 납품 일관성 보장",
          "공정 검사, 출하 테스트 및 품질 추적성 실행",
          "고객 피드백을 추적하여 제품 개선 및 버전 반복 지원",
          "장기 프로젝트를 위한 안정적인 공급 및 엔지니어링 지원 제공",
        ],
      },
    ],
    applications: {
      title: "제품 적용 및 검증 시나리오",
      desc: "FOREACH 미세유체 핵심 부품은 IVD, 생명과학, 고급 분석기기, 합성생물학 및 실험실 자동화 장비에 적용됩니다.",
      cards: [
        {
          title: "IVD 진단 장비",
          alt: "IVD 진단 장비 유체 시스템 적용 시나리오",
          desc: "샘플 처리, 시약 분주, 세척, 폐액 처리 및 유로 전환 모듈에 사용됩니다.",
        },
        {
          title: "생명과학 장비",
          alt: "생명과학 장비의 액체 처리 및 샘플 전처리 시나리오",
          desc: "피펫팅, 분주, 반응 시스템 구성 및 샘플 전처리를 지원합니다.",
        },
        {
          title: "고급 분석기기",
          alt: "정밀 주입 및 유로 전환 분석기기 시나리오",
          desc: "정밀 주입, 유로 전환, 고압 유체 제어 및 검출 전처리에 적용됩니다.",
        },
        {
          title: "합성생물학 장비",
          alt: "자동화 바이오 제조 유체 적용 시나리오",
          desc: "배지, 시약, 샘플 및 반응액의 정량 이송, 분주 및 전환을 지원합니다.",
        },
        {
          title: "실험실 자동화",
          alt: "자동 피펫팅, 분주 및 다채널 유로 관리 시나리오",
          desc: "자동 피펫팅, 분주, 세척, 폐액 처리 및 다채널 유로 관리에 적용됩니다.",
        },
      ],
    },
    why: {
      title: "FOREACH를 선택해야 하는 이유",
      subtitle: "연구개발 · 제조 · 서비스",
      alt: "FOREACH 연구개발 제조 및 엔지니어링 서비스 배경",
      cards: [
        {
          title: "초기 단계 연구개발 참여",
          desc: "고객 프로젝트 초기부터 요구 분석, 제품 선정, 구조 평가 및 샘플 검증에 참여합니다.",
        },
        {
          title: "맞춤화와 유연한 구성",
          desc: "유량, 압력, 매체 및 설치 공간 요구에 맞춘 핵심 유체 모듈 구성을 지원합니다.",
        },
        {
          title: "엔지니어링 지원",
          desc: "샘플 확인부터 대량 납품까지 피드백, 테스트, 검증 및 솔루션 최적화를 제공합니다.",
        },
      ],
    },
    cta: {
      title: "유체 제품 및 솔루션 지원이 필요하신가요?",
      desc: "FOREACH는 제품 선정, 샘플 검증, 맞춤 개발 및 프로젝트 도입을 지원합니다.",
      button: "FOREACH 문의하기",
      alt: "FOREACH 유체 제품 및 솔루션 지원 배경",
    },
  },

  ru: {
    hero: {
      title: "Возможности НИОКР и производства",
      desc: "Комплексные возможности от разработки продукции, точной механообработки и экструзии до инженерной валидации микрофлюидных компонентов.",
      alt: "Баннер возможностей НИОКР и производства FOREACH",
    },
    intro: {
      imageMark: " ",
      title: "От проектирования продукта до стабильной поставки",
      desc: "FOREACH сосредоточена на ключевых микрофлюидных компонентах и технологиях жидкостных систем, включая насосы, клапаны, датчики, трубки, фитинги, пробоотборные иглы и модули управления. Команда НИОКР и инженерии численностью более 60 человек поддерживает анализ требований, проектирование, прототипирование, испытания, валидацию и внедрение в производство.",
      alt: "Возможности FOREACH в НИОКР, производстве, валидации и поставке",
    },
    abilityTitle: "Сильные стороны НИОКР и производства",
    abilityCards: [
      { 
        title: "Центр НИОКР",
        alt: "Центр НИОКР FOREACH для микрофлюидных компонентов",
        points: [
          "Более 60 специалистов в разработке продукции, проектировании, валидации процессов и поддержке проектов.",
          "Разработка насосов, клапанов, датчиков, трубок, фитингов, пробоотборных игл и модулей управления.",
          "Поддержка от анализа требований до проектирования, прототипирования, испытаний и внедрения в производство.",
        ],
      },
      {
        title: "Центр механообработки",
        alt: "Центр механообработки FOREACH для ключевых деталей",
        points: [
          "Опытные специалисты по механообработке и технологическим процессам.",
          "Производство конструктивных деталей для насосов, клапанов, фитингов, пробоотборных игл и ключевых компонентов.",
          "Обеспечение реализации конструкции, стабильности размеров, качества поверхности и совместимости сборки.",
        ],
      },
      {
        title: "Центр экструзии",
        alt: "Центр экструзии FOREACH для микрофлюидных трубок",
        points: [
          "Экструзия микрофлюидных трубок, эластомерных деталей и жидкостных сборок.",
          "Поддержка экструзии трубок, подбора материалов, контроля размеров и интеграции сборок.",
          "Повышение полноты поставки, скорости реакции проекта и стабильности серийной поставки.",
        ],
      },
    ],
    processDefault:
      "От требований клиента до серийной поставки с интеграцией НИОКР, механообработки, экструзии, валидации и поставки.",
    processAlt: "Фон процесса НИОКР и производства FOREACH",
    processSteps: [
      {
        no: "01",
        title: "Анализ требований",
        points: [
          "Подтвердить диапазон расхода, требования к точности и рабочий ритм",
          "Определить диапазон давления, условия противодавления и стойкость к давлению",
          "Определить контактные среды, риски коррозии и совместимость материалов",
          "Оценить монтажное пространство, направление интерфейсов и ограничения компоновки",
          "Понять срок службы, частоту использования и требования к обслуживанию",
          "Подтвердить способ управления, электрический интерфейс и логику системы",
        ],
      },
      {
        no: "02",
        title: "Проектирование решения",
        points: [
          "Выбрать насосы, клапаны, датчики, трубки и фитинги по условиям работы",
          "Подтвердить способ жидкостного соединения, интерфейсы и направление установки",
          "Оценить потребность в индивидуальной конструкции, специальных материалах или сборке",
          "Согласовать управление, сигнальные интерфейсы и системную логику",
          "Учесть требования к последующей валидации, сборочным испытаниям и внедрению",
        ],
      },
      {
        no: "03",
        title: "Разработка прототипа",
        points: [
          "Подготовить конструкции продукта, ключевые детали и образцы трубных сборок",
          "Изготовить прототипы с учетом механообработки, экструзии и сборки",
          "Провести предварительную сборку, жидкостные испытания и настройку",
          "Зафиксировать проблемы, размерные отклонения и отзывы по сборке",
          "Оптимизировать конструкцию, материалы или параметры процесса по результатам",
        ],
      },
      {
        no: "04",
        title: "Испытания и валидация",
        points: [
          "Проверить расход, стабильность давления и повторяемость",
          "Подтвердить герметичность, воздухонепроницаемость и надежность соединений",
          "Оценить совместимость материалов, риски контакта и долгосрочную стабильность",
          "Провести ресурсные, циклические и предельные испытания",
          "Сформировать протоколы испытаний для внедрения у клиента и внутренней оптимизации",
        ],
      },
      {
        no: "05",
        title: "Пилотное внедрение",
        points: [
          "Поддержать подтверждение пилотных образцов и проверку установки",
          "Отслеживать расход, давление, герметичность и сборочные отзывы в реальном применении",
          "Корректировать конструкцию, процесс или материал по обратной связи клиента",
          "Закрепить ключевые процессы, контрольные пункты и стандарты выпуска",
          "Создать стабильную производственную и качественную базу для серии",
        ],
      },
      {
        no: "06",
        title: "Серийная поставка",
        points: [
          "Организовать стабильное производство согласно заказам и графику проекта",
          "Обеспечить стабильность поставки через механообработку, экструзию, сборку и испытания",
          "Выполнять контроль в процессе, выходные испытания и прослеживаемость качества",
          "Отслеживать отзывы клиента для улучшения и обновления продукта",
          "Обеспечивать стабильные поставки и инженерную поддержку долгосрочных проектов",
        ],
      },
    ],
    applications: {
      title: "Сценарии применения и валидации",
      desc: "Микрофлюидные компоненты FOREACH применяются в IVD, науках о жизни, аналитических приборах, синтетической биологии и лабораторной автоматизации.",
      cards: [
        {
          title: "IVD-оборудование",
          alt: "Сценарий жидкостной системы для IVD-оборудования",
          desc: "Используется для обработки образцов, дозирования реагентов, промывки, отходов и переключения потоков.",
        },
        {
          title: "Оборудование для наук о жизни",
          alt: "Сценарии обработки жидкостей и подготовки образцов",
          desc: "Поддерживает пипетирование, дозирование, создание реакционных систем и подготовку образцов.",
        },
        {
          title: "Аналитические приборы",
          alt: "Сценарии точного ввода и переключения потоков",
          desc: "Применяется для точного ввода, переключения потоков, контроля высокого давления и предварительной обработки.",
        },
        {
          title: "Оборудование синтетической биологии",
          alt: "Жидкостные сценарии автоматизированного биопроизводства",
          desc: "Поддерживает количественную подачу, дозирование и переключение сред, реагентов, образцов и реакционных жидкостей.",
        },
        {
          title: "Лабораторная автоматизация",
          alt: "Сценарии автоматического пипетирования и многоканального управления потоками",
          desc: "Применяется в автоматическом пипетировании, дозировании, промывке, удалении отходов и многоканальном управлении потоками.",
        },
      ],
    },
    why: {
      title: "Почему выбирают FOREACH",
      subtitle: "НИОКР · Производство · Сервис",
      alt: "Фон НИОКР, производства и инженерного сервиса FOREACH",
      cards: [
        {
          title: "Раннее участие НИОКР",
          desc: "Участие в анализе требований, выборе продукта, оценке конструкции и валидации образцов на ранней стадии проекта.",
        },
        {
          title: "Кастомизация и гибкость",
          desc: "Поддержка различных требований по расходу, давлению, среде и монтажному пространству с помощью ключевых жидкостных модулей.",
        },
        {
          title: "Инженерная поддержка",
          desc: "Обратная связь, испытания, валидация и оптимизация решений от образца до серийной поставки.",
        },
      ],
    },
    cta: {
      title: "Нужна поддержка по жидкостным продуктам и решениям?",
      desc: "FOREACH поддерживает выбор продуктов, валидацию образцов, индивидуальную разработку и внедрение проектов.",
      button: "Связаться с FOREACH",
      alt: "Фон поддержки жидкостных продуктов и решений FOREACH",
    },
  },
};

/* =========================================================
   8. 语言判断函数
========================================================= */
export function isResearchManufacturingRouteLocale(
  locale: string
): locale is ResearchManufacturingRouteLocale {
  return RESEARCH_MANUFACTURING_ROUTE_LOCALES.includes(
    locale as ResearchManufacturingRouteLocale
  );
}

/* =========================================================
   9. 语言标准化函数
   说明：
   1. 中文默认 zh-CN
   2. 如果传入非法语言，默认回退英文
========================================================= */
export function normalizeResearchManufacturingLocale(
  locale?: string
): ResearchManufacturingLocale {
  if (!locale || locale === "zh" || locale === "zh-CN") {
    return "zh-CN";
  }

  if (
    RESEARCH_MANUFACTURING_LOCALES.includes(
      locale as ResearchManufacturingLocale
    )
  ) {
    return locale as ResearchManufacturingLocale;
  }

  return "en";
}

/* =========================================================
   10. 获取页面正文数据
========================================================= */
export function getResearchManufacturingText(
  locale?: string
): ResearchManufacturingPageText {
  const safeLocale = normalizeResearchManufacturingLocale(locale);
  return researchManufacturingTextMap[safeLocale];
}

/* =========================================================
   11. 获取页面 SEO 数据
========================================================= */
export function getResearchManufacturingSeo(
  locale?: string
): ResearchManufacturingSeo {
  const safeLocale = normalizeResearchManufacturingLocale(locale);
  return researchManufacturingSeoMap[safeLocale];
}   