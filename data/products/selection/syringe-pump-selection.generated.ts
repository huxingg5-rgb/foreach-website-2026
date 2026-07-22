import type {
  ProductSelectionFilterLabel,
  ProductSelectionProduct,
} from "./types";

export const syringePumpFilterLabels: ProductSelectionFilterLabel[] = [
  {
    categoryId: "pumps",
    productTypeId: "syringe-pump",
    filterKey: "filter01",
    label: {
      zh: "产品类型",
      en: "Product Type",
      es: "Tipo de producto",
      fr: "Type de produit",
      ko: "제품 유형",
      ru: "Тип продукта",
    },
    inputType: "single",
    sortOrder: 10,
    visible: true,
  },
  {
    categoryId: "pumps",
    productTypeId: "syringe-pump",
    filterKey: "filter02",
    label: {
      zh: "行程",
      en: "Stroke",
      es: "Carrera",
      fr: "Course",
      ko: "스트로크",
      ru: "Ход",
    },
    inputType: "single",
    sortOrder: 20,
    visible: true,
  },
];

export const syringePumpSelectionProducts: ProductSelectionProduct[] = [
  {
    productId: "hmd3-30mm-solenoid-syringe-pump",
    categoryId: "pumps",
    productTypeId: "syringe-pump",
    cardTitle: {
      zh: "HMD3 电磁阀注射泵",
      en: "HMD3 Solenoid Valve Syringe Pump",
      es: "Bomba de jeringa HMD3 con válvula solenoide",
      fr: "Pompe seringue HMD3 avec électrovanne",
      ko: "HMD3 솔레노이드 밸브 시린지 펌프",
      ru: "Шприцевой насос HMD3 с электромагнитным клапаном",
    },
    cardSubtitle: {
      zh: "50 μL–5 mL 小体积精密加液\n30mm 行程，单通道配置\n支持 2端口、3端口及分配阀配置",
      en: "50 μL–5 mL small-volume precision dispensing\n30 mm stroke, single-channel configuration\nSupports 2-port, 3-port and dispensing valve options",
      es: "Dosificación precisa de pequeño volumen 50 μL–5 mL\nCarrera de 30 mm, configuración de un canal\nAdmite válvulas de 2 puertos, 3 puertos y dosificación",
      fr: "Dosage précis de petit volume 50 μL–5 mL\nCourse 30 mm, configuration monocanal\nPrend en charge les vannes 2 ports, 3 ports et de distribution",
      ko: "50 μL–5 mL 소용량 정밀 분주\n30 mm 스트로크, 단일 채널 구성\n2포트, 3포트 및 분주 밸브 옵션 지원",
      ru: "Точное дозирование малых объемов 50 μL–5 mL\nХод 30 mm, одноканальная конфигурация\nПоддержка 2-портовых, 3-портовых и дозирующих клапанов",
    },
    filters: {
      filter01: "HMD 电磁阀系列注射泵",
      filter02: "30mm",
    },
    imagePath: "/images/products/pumps/syringe-pumps/foreach-hmd3-solenoid-valve-syringe-pump.webp",

    imageCard: "/images/products/pumps/syringe-pumps/foreach-hmd3-solenoid-valve-syringe-pump.webp",
    detailSlug: "hmd3-30mm-solenoid-syringe-pump",
    sortOrder: 1201,
  },
  {
    productId: "hmd6-60mm-solenoid-syringe-pump",
    categoryId: "pumps",
    productTypeId: "syringe-pump",
    cardTitle: {
      zh: "HMD6 电磁阀注射泵",
      en: "HMD6 Solenoid Valve Syringe Pump",
      es: "Bomba de jeringa HMD6 con válvula solenoide",
      fr: "Pompe seringue HMD6 avec électrovanne",
      ko: "HMD6 솔레노이드 밸브 시린지 펌프",
      ru: "Шприцевой насос HMD6 с электромагнитным клапаном",
    },
    cardSubtitle: {
      zh: "25 μL–25 mL 中大量程输送\n60mm 行程，支持 1–8 通道配置\n支持端口形式与注射器量程定制",
      en: "25 μL–25 mL mid-to-large volume dispensing\n60 mm stroke, supports 1–8 channel configurations\nCustom port options and syringe volume ranges",
      es: "Dosificación de volumen medio a alto 25 μL–25 mL\nCarrera de 60 mm, admite configuraciones de 1–8 canales\nOpciones personalizadas de puertos y rangos de jeringa",
      fr: "Dosage de moyen à grand volume 25 μL–25 mL\nCourse 60 mm, configurations 1–8 canaux prises en charge\nOptions personnalisées de ports et de volumes de seringue",
      ko: "25 μL–25 mL 중대용량 분주\n60 mm 스트로크, 1–8 채널 구성 지원\n맞춤 포트 옵션 및 시린지 용량 범위",
      ru: "Дозирование средних и больших объемов 25 μL–25 mL\nХод 60 mm, поддержка конфигураций 1–8 каналов\nПользовательские порты и диапазоны объема шприца",
    },
    filters: {
      filter01: "HMD 电磁阀系列注射泵",
      filter02: "60mm",
    },
    imagePath: "/images/products/pumps/syringe-pumps/foreach-hmd6-solenoid-valve-syringe-pump.webp",

    imageCard: "/images/products/pumps/syringe-pumps/foreach-hmd6-solenoid-valve-syringe-pump.webp",
    detailSlug: "hmd6-60mm-solenoid-syringe-pump",
    sortOrder: 1202,
  },
  {
    productId: "hld3-30mm-rotary-valve-syringe-pump",
    categoryId: "pumps",
    productTypeId: "syringe-pump",
    cardTitle: {
      zh: "HLD3 旋转阀注射泵",
      en: "HLD3 Rotary Valve Syringe Pump",
      es: "Bomba de jeringa HLD3 con válvula rotativa",
      fr: "Pompe seringue HLD3 avec valve rotative",
      ko: "HLD3 로터리 밸브 시린지 펌프",
      ru: "Шприцевой насос HLD3 с поворотным клапаном",
    },
    cardSubtitle: {
      zh: "50 μL–5 mL 小体积定量分配\n30mm 行程，支持多端口切换\n支持 3通、9通旋转阀配置",
      en: "50 μL–5 mL small-volume quantitative dispensing\n30 mm stroke, supports multi-port switching\nSupports 3-way and 9-way rotary valve options",
      es: "Dosificación cuantitativa de pequeño volumen 50 μL–5 mL\nCarrera de 30 mm, admite conmutación multipuerto\nAdmite válvulas rotativas de 3 y 9 vías",
      fr: "Dosage quantitatif de petit volume 50 μL–5 mL\nCourse 30 mm, commutation multiport prise en charge\nOptions de valves rotatives 3 voies et 9 voies",
      ko: "50 μL–5 mL 소용량 정량 분주\n30 mm 스트로크, 멀티 포트 전환 지원\n3방향 및 9방향 로터리 밸브 옵션 지원",
      ru: "Количественное дозирование малых объемов 50 μL–5 mL\nХод 30 mm, поддержка многопортового переключения\nВарианты поворотных клапанов 3-way и 9-way",
    },
    filters: {
      filter01: "HLD 旋转阀系列注射泵",
      filter02: "30mm",
    },
    imagePath: "/images/products/pumps/syringe-pumps/foreach-hld3-rotary-valve-syringe-pump.webp",

    imageCard: "/images/products/pumps/syringe-pumps/foreach-hld3-rotary-valve-syringe-pump.webp",
    detailSlug: "hld3-30mm-rotary-valve-syringe-pump",
    sortOrder: 1203,
  },
  {
    productId: "hld6-60mm-rotary-valve-syringe-pump",
    categoryId: "pumps",
    productTypeId: "syringe-pump",
    cardTitle: {
      zh: "HLD6 旋转阀注射泵",
      en: "HLD6 Rotary Valve Syringe Pump",
      es: "Bomba de jeringa HLD6 con válvula rotativa",
      fr: "Pompe seringue HLD6 avec valve rotative",
      ko: "HLD6 로터리 밸브 시린지 펌프",
      ru: "Шприцевой насос HLD6 с поворотным клапаном",
    },
    cardSubtitle: {
      zh: "25 μL–25 mL 大量程定量输送\n60mm 行程，支持多端口切换\n支持 3通、5通、9通旋转阀配置",
      en: "25 μL–25 mL large-volume quantitative dispensing\n60 mm stroke, supports multi-port switching\nSupports 3-way, 5-way and 9-way rotary valve options",
      es: "Dosificación cuantitativa de gran volumen 25 μL–25 mL\nCarrera de 60 mm, admite conmutación multipuerto\nAdmite válvulas rotativas de 3, 5 y 9 vías",
      fr: "Dosage quantitatif de grand volume 25 μL–25 mL\nCourse 60 mm, commutation multiport prise en charge\nOptions de valves rotatives 3 voies, 5 voies et 9 voies",
      ko: "25 μL–25 mL 대용량 정량 분주\n60 mm 스트로크, 멀티 포트 전환 지원\n3방향, 5방향 및 9방향 로터리 밸브 옵션 지원",
      ru: "Количественное дозирование больших объемов 25 μL–25 mL\nХод 60 mm, поддержка многопортового переключения\nВарианты поворотных клапанов 3-way, 5-way и 9-way",
    },
    filters: {
      filter01: "HLD 旋转阀系列注射泵",
      filter02: "60mm",
    },
    imagePath: "/images/products/pumps/syringe-pumps/foreach-hld6-rotary-valve-syringe-pump.webp",

    imageCard: "/images/products/pumps/syringe-pumps/foreach-hld6-rotary-valve-syringe-pump.webp",
    detailSlug: "hld6-60mm-rotary-valve-syringe-pump",
    sortOrder: 1204,
  },
];
