/* =========================================================
   probe-selection.generated.ts
   FOREACH 官网｜针系列产品中心卡片数据

   说明：
   1. 针系列全部按来图定制展示
   2. 产品类型分为：采样针 / 穿刺针 / 清洗针 / 搅拌桨
   3. productTypeId 使用中文，便于前台筛选显示
   4. slug / detailSlug / routeSlug 使用英文，避免生成 undefined 路径
========================================================= */

import type { ProductSelectionProduct } from "./product-selection.types";

export const probeFilterLabels = [
  "针系列",
] as const;

const probeProducts = [
  {
    id: "sampling-probes",
    slug: "sampling-probes",
    detailSlug: "sampling-probes",
    routeSlug: "sampling-probes",
    seriesSlug: "sampling-probes",
    productTypeSlug: "sampling-probes",

    productId: "sampling-probes",
    productCode: "Custom Sampling Probe",
    code: "Custom Sampling Probe",

    categoryId: "needles",
    category: "needles",
    categoryLabel: "针系列",

    productTypeId: "针系列",
    productTypeLabel: "针系列",

    model: "采样针系列",
    title: "采样针系列",
    name: "采样针系列",
    productName: "采样针系列",

    cardTitle: {
      zh: "采样针系列",
      en: "Sampling Probe Series",
      es: "Serie de agujas de muestreo",
      fr: "Série d'aiguilles de prélèvement",
      ko: "샘플링 프로브 시리즈",
      ru: "Серия пробоотборных игл",
    },

    cardSubtitle: {
      zh: "用于试剂、样本吸取与分配\n可做针尖、侧孔、弯折和长度定制\n支持内壁抛光与液位检测适配",
      en: "For reagent and sample aspiration and dispensing\nCustom tip, side hole, bending and length options\nInner-wall polishing and liquid level detection support",
      es: "Para aspiración y dosificación de reactivos y muestras\nOpciones personalizadas de punta, orificio lateral, curvado y longitud\nSoporte para pulido interno y detección de nivel de líquido",
      fr: "Pour aspiration et distribution de réactifs et d'échantillons\nOptions personnalisées de pointe, trou latéral, cintrage et longueur\nPrise en charge du polissage interne et de la détection de niveau liquide",
      ko: "시약 및 샘플 흡입/분주용\n팁, 측면 홀, 굽힘 및 길이 맞춤 옵션\n내벽 연마 및 액면 감지 지원",
      ru: "Для аспирации и дозирования реагентов и образцов\nПользовательские варианты наконечника, бокового отверстия, изгиба и длины\nПоддержка полировки внутренней стенки и определения уровня жидкости",
    },

    image: "/images/products/probes/sampling-probes/foreach-sampling-probe-main.webp",
    imagePath: "/images/products/probes/sampling-probes/foreach-sampling-probe-main.webp",

    imageCard: "/images/products/probes/sampling-probes/foreach-sampling-probe-main.webp",
    imageUrl: "/images/products/probes/sampling-probes/foreach-sampling-probe-main.webp",
    imageAlt: "采样针系列",

    subtitle: "用于试剂、样本吸取与分配，支持来图定制",
    description:
      "采样针系列用于自动化分析仪器中的试剂吸取、样本吸取、液体分配和定量转移，可根据仪器结构、液体类型、目标容量和液位检测方式进行来图定制。",

    summary:
      "试剂吸取、样本吸取、液体分配，支持针尖、侧孔、弯折、内壁抛光和液位检测适配。",

    tags: ["样本吸取", "试剂分配", "内壁抛光", "来图定制"],

    specs: [
      { label: "定制方式", value: "来图定制" },
      { label: "典型任务", value: "试剂吸取 / 样本吸取 / 液体分配" },
      { label: "可选工艺", value: "内壁抛光 / 侧孔加工 / 涂层处理" },
    ],

    filter01: "针系列",
    filter02: "试剂 / 样本吸取",
    filter03: "内壁抛光",
    filter04: "来图定制",

    filters: {
      filter01: "针系列",
      filter02: "试剂 / 样本吸取",
      filter03: "内壁抛光",
      filter04: "来图定制",
    },

    href: "/products/probes/sampling-probes",
    detailHref: "/products/probes/sampling-probes",
    selectionHref: "/products",
    sourceType: "probe-selection",
  },

  {
    id: "piercing-probes",
    slug: "piercing-probes",
    detailSlug: "piercing-probes",
    routeSlug: "piercing-probes",
    seriesSlug: "piercing-probes",
    productTypeSlug: "piercing-probes",

    productId: "piercing-probes",
    productCode: "Custom Piercing Probe",
    code: "Custom Piercing Probe",

    categoryId: "needles",
    category: "needles",
    categoryLabel: "针系列",

    productTypeId: "针系列",
    productTypeLabel: "针系列",

    model: "穿刺针系列",
    title: "穿刺针系列",
    name: "穿刺针系列",
    productName: "穿刺针系列",

    cardTitle: {
      zh: "穿刺针系列",
      en: "Piercing Probe Series",
      es: "Serie de agujas de perforación",
      fr: "Série d'aiguilles de perçage",
      ko: "피어싱 프로브 시리즈",
      ru: "Серия прокалывающих игл",
    },

    cardSubtitle: {
      zh: "用于封膜、瓶塞和耗材穿刺取液\n针管、针尖和排气结构可定制\n适用于试剂仓、样本仓和封闭耗材",
      en: "For piercing sealed films, stoppers and consumables\nCustom tube, tip and venting structures\nFor reagent chambers, sample chambers and closed consumables",
      es: "Para perforar films sellados, tapones y consumibles\nEstructuras personalizadas de tubo, punta y ventilación\nPara cámaras de reactivo, cámaras de muestra y consumibles cerrados",
      fr: "Pour perçage de films scellés, bouchons et consommables\nStructures personnalisées de tube, pointe et évent\nPour chambres de réactif, chambres d'échantillon et consommables fermés",
      ko: "밀봉 필름, 마개 및 소모품 천공용\n튜브, 팁 및 배기 구조 맞춤 가능\n시약 챔버, 샘플 챔버 및 밀폐 소모품용",
      ru: "Для прокалывания герметичных пленок, пробок и расходников\nПользовательские структуры трубки, наконечника и вентиляции\nДля камер реагентов, камер образцов и закрытых расходников",
    },

    image: "/images/products/probes/piercing-probes/foreach-piercing-probe-main.webp",
    imagePath: "/images/products/probes/piercing-probes/foreach-piercing-probe-main.webp",

    imageCard: "/images/products/probes/piercing-probes/foreach-piercing-probe-main.webp",
    imageUrl: "/images/products/probes/piercing-probes/foreach-piercing-probe-main.webp",
    imageAlt: "穿刺针系列",

    subtitle: "用于封膜、瓶塞和耗材穿刺取液，支持来图定制",
    description:
      "穿刺针系列用于自动化仪器中封膜、瓶塞、试剂仓、样本仓和密闭耗材的穿刺取液场景，可根据穿刺对象、穿刺深度、液体路径和排气需求进行定制。",

    summary:
      "封膜穿刺、瓶塞穿刺、密闭耗材取液，支持针尖、排气、侧孔和安装端定制。",

    tags: ["穿刺取液", "排气结构", "针尖定制", "来图定制"],

    specs: [
      { label: "定制方式", value: "来图定制" },
      { label: "典型任务", value: "封膜穿刺 / 瓶塞穿刺 / 密闭耗材取液" },
      { label: "可选结构", value: "穿刺针尖 / 排气口 / 侧孔 / 折弯结构" },
    ],

    filter01: "针系列",
    filter02: "穿刺取液",
    filter03: "排气结构",
    filter04: "来图定制",

    filters: {
      filter01: "针系列",
      filter02: "穿刺取液",
      filter03: "排气结构",
      filter04: "来图定制",
    },

    href: "/products/probes/piercing-probes",
    detailHref: "/products/probes/piercing-probes",
    selectionHref: "/products",
    sourceType: "probe-selection",
  },

  {
    id: "wash-probes",
    slug: "wash-probes",
    detailSlug: "wash-probes",
    routeSlug: "wash-probes",
    seriesSlug: "wash-probes",
    productTypeSlug: "wash-probes",

    productId: "wash-probes",
    productCode: "Custom Wash Probe",
    code: "Custom Wash Probe",

    categoryId: "needles",
    category: "needles",
    categoryLabel: "针系列",

    productTypeId: "针系列",
    productTypeLabel: "针系列",

    model: "清洗针系列",
    title: "清洗针系列",
    name: "清洗针系列",
    productName: "清洗针系列",

    cardTitle: {
      zh: "清洗针系列",
      en: "Wash Probe Series",
      es: "Serie de agujas de lavado",
      fr: "Série d'aiguilles de lavage",
      ko: "세척 프로브 시리즈",
      ru: "Серия промывочных игл",
    },

    cardSubtitle: {
      zh: "用于针外壁清洗、废液排出和残液处理\n可做单头、双头、多头和侧孔结构\n适配清洗站与自动化液路模块",
      en: "For outer-wall washing, waste removal and residual liquid handling\nSingle-head, dual-head, multi-head and side-hole options\nFor wash stations and automated fluidic modules",
      es: "Para lavado de pared exterior, eliminación de residuos y manejo de líquido residual\nOpciones de cabezal simple, doble, múltiple y orificio lateral\nPara estaciones de lavado y módulos fluídicos automatizados",
      fr: "Pour lavage de paroi externe, évacuation des déchets et gestion des liquides résiduels\nOptions simple tête, double tête, multi-tête et trou latéral\nPour stations de lavage et modules fluidiques automatisés",
      ko: "외벽 세척, 폐액 제거 및 잔류액 처리용\n싱글 헤드, 듀얼 헤드, 멀티 헤드 및 측면 홀 옵션\n세척 스테이션 및 자동화 유체 모듈용",
      ru: "Для промывки наружной стенки, удаления отходов и работы с остаточной жидкостью\nВарианты с одной, двумя, несколькими головками и боковым отверстием\nДля промывочных станций и автоматизированных жидкостных модулей",
    },

    image: "/images/products/probes/wash-probes/foreach-wash-probe-main.webp",
    imagePath: "/images/products/probes/wash-probes/foreach-wash-probe-main.webp",

    imageCard: "/images/products/probes/wash-probes/foreach-wash-probe-main.webp",
    imageUrl: "/images/products/probes/wash-probes/foreach-wash-probe-main.webp",
    imageAlt: "清洗针系列",

    subtitle: "用于清洗排废与残液处理，支持清洗站适配",
    description:
      "清洗针系列用于自动化分析仪器中的针外壁清洗、针内壁冲洗、废液排出和残液处理，可根据清洗站结构、清洗液路径、废液路径和喷孔方向进行定制。",

    summary:
      "针外壁清洗、针内壁冲洗、废液抽排，支持单头、双头、多头和侧孔结构。",

    tags: ["清洗排废", "多头结构", "侧孔加工", "来图定制"],

    specs: [
      { label: "定制方式", value: "来图定制" },
      { label: "典型任务", value: "针外壁清洗 / 针内壁冲洗 / 废液抽排" },
      { label: "可选结构", value: "单头 / 双头 / 多头 / 侧孔喷洗" },
    ],

    filter01: "针系列",
    filter02: "清洗 / 排废",
    filter03: "侧孔加工",
    filter04: "来图定制",

    filters: {
      filter01: "针系列",
      filter02: "清洗 / 排废",
      filter03: "侧孔加工",
      filter04: "来图定制",
    },

    href: "/products/probes/wash-probes",
    detailHref: "/products/probes/wash-probes",
    selectionHref: "/products",
    sourceType: "probe-selection",
  },

  {
    id: "stirring-paddles",
    slug: "stirring-paddles",
    detailSlug: "stirring-paddles",
    routeSlug: "stirring-paddles",
    seriesSlug: "stirring-paddles",
    productTypeSlug: "stirring-paddles",

    productId: "stirring-paddles",
    productCode: "Custom Stirring Paddle",
    code: "Custom Stirring Paddle",

    categoryId: "needles",
    category: "needles",
    categoryLabel: "针系列",

    productTypeId: "针系列",
    productTypeLabel: "针系列",

    model: "搅拌桨系列",
    title: "搅拌桨系列",
    name: "搅拌桨系列",
    productName: "搅拌桨系列",

    cardTitle: {
      zh: "搅拌桨系列",
      en: "Stirring Paddle Series",
      es: "Serie de paletas agitadoras",
      fr: "Série de pales d'agitation",
      ko: "교반 패들 시리즈",
      ru: "Серия мешалок",
    },

    cardSubtitle: {
      zh: "用于样本、试剂和反应液混匀\n支持平板、螺旋、90度角叶片等结构\n可按杯型、转速和混匀效果定制",
      en: "For sample, reagent and reaction-liquid mixing\nFlat, spiral and 90-degree blade options\nCustomizable by cup geometry, speed and mixing effect",
      es: "Para mezcla de muestras, reactivos y líquidos de reacción\nOpciones de palas planas, espirales y de 90 grados\nPersonalizable según geometría del vaso, velocidad y efecto de mezcla",
      fr: "Pour mélange d'échantillons, réactifs et liquides de réaction\nOptions de pales plates, spirales et à 90 degrés\nPersonnalisation selon géométrie de cuve, vitesse et effet de mélange",
      ko: "샘플, 시약 및 반응액 혼합용\n평판, 나선형 및 90도 블레이드 옵션\n컵 형상, 속도 및 혼합 효과에 맞춤 가능",
      ru: "Для перемешивания образцов, реагентов и реакционных жидкостей\nПлоские, спиральные и 90-градусные лопасти\nНастройка по геометрии чашки, скорости и эффекту перемешивания",
    },

    image: "/images/products/probes/stirring-paddles/foreach-stirring-paddle-main.webp",
    imagePath: "/images/products/probes/stirring-paddles/foreach-stirring-paddle-main.webp",

    imageCard: "/images/products/probes/stirring-paddles/foreach-stirring-paddle-main.webp",
    imageUrl: "/images/products/probes/stirring-paddles/foreach-stirring-paddle-main.webp",
    imageAlt: "搅拌桨系列",

    subtitle: "用于杯内混匀与反应液搅拌，支持来图定制",
    description:
      "搅拌桨系列用于自动化分析仪器中的样本、试剂、稀释液和反应液混匀场景，可根据反应杯结构、目标液量、搅拌空间、转速范围和混匀效果进行来图定制。",

    summary:
      "样本混匀、试剂混匀、反应液混匀，支持平板、螺旋、90度角叶片和涂层处理。",

    tags: ["混匀搅拌", "叶片定制", "涂层可选", "来图定制"],

    specs: [
      { label: "定制方式", value: "来图定制" },
      { label: "典型任务", value: "样本混匀 / 试剂混匀 / 反应液混匀" },
      { label: "可选结构", value: "平板 / 螺旋 / 90度角叶片 / 表面涂层" },
    ],

    filter01: "针系列",
    filter02: "搅拌 / 混匀",
    filter03: "涂层处理",
    filter04: "来图定制",

    filters: {
      filter01: "针系列",
      filter02: "搅拌 / 混匀",
      filter03: "涂层处理",
      filter04: "来图定制",
    },

    href: "/products/probes/stirring-paddles",
    detailHref: "/products/probes/stirring-paddles",
    selectionHref: "/products",
    sourceType: "probe-selection",
  },
] as const;

export const probeSelectionProducts =
  probeProducts as unknown as ProductSelectionProduct[];
