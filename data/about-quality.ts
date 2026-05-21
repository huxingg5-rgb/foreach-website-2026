/* ================================
   data/about-quality.ts
   质量体系与合规认证页面数据文件

   作用：
   1. 统一管理质量页面 6 种语言内容
   2. 中文页面 /about/quality 和多语言页面 /en/about/quality 等共用同一份数据
   3. 页面结构统一由 components/about/QualityPageContent.tsx 渲染
   4. 后期对接后台时，可以把这里的数据替换成接口数据
================================ */

/* ================================
   1. 页面支持语言
================================ */

export const aboutQualityLocales = [
  "zh-CN",
  "en",
  "es",
  "fr",
  "ko",
  "ru",
] as const;

export type AboutQualityLocale = (typeof aboutQualityLocales)[number];

/* ================================
   2. 数据类型定义
================================ */

export type QualityPathStep = {
  index: string;
  title: string;
  description: string;
};

export type QualityEquipmentItem = {
  name: string;
  description: string;
  image: string;
  alt: string;
  parametersTitle: string;
  parameters: string[];
};

export type QualityCertificateItem = {
  name: string;
  description: string;
  image: string;
  alt: string;
};

export type AboutQualityPageData = {
  metadataTitle: string;
  metadataDescription: string;

  heroTitle: string;
  heroSubtitle: string;

  lifeTitle: string;
  lifeTextBeforeStrong: string;
  lifeTextStrong: string;
  lifeTextAfterStrong: string;
  lifeSubtext: string;

  pathTitle: string;
  pathSummary: string;
  pathSteps: QualityPathStep[];
  loopTitle: string;
  loopText: string;

  equipmentTitle: string;
  equipmentIntro: string[];
  equipmentItems: QualityEquipmentItem[];
  equipmentNote: string;

  certTitle: string;
  certSummary: string;
  certItems: QualityCertificateItem[];
};

/* ================================
   3. 图片路径统一管理

   说明：
   1. 所有图片都放在 public/images/about/ 下面
   2. 后续替换图片时，只要保持文件名一致，代码不用改
================================ */

export const aboutQualityImages = {
  heroBanner: "/images/about/quality-banner.webp",
  qualityManagement: "/images/about/quality-management.webp",
  qualityPathBg: "/images/about/quality-path-bg.webp",
  qualityCertBg: "/images/about/quality-cert-bg.webp",

  equipmentCmm:
    "/images/about/quality-equipment/coordinate-measuring-machine.webp",
  equipmentImageMeasuring:
    "/images/about/quality-equipment/image-measuring-instrument.webp",
  equipmentVision:
    "/images/about/quality-equipment/vision-measuring-machine.webp",
  equipmentConfocal:
    "/images/about/quality-equipment/confocal-microscope.webp",

  certificateIso13485: "/images/about/quality-certificates/iso-13485.webp",
  certificateIso9001: "/images/about/quality-certificates/iso-9001.webp",
};

/* ================================
   4. 多语言页面链接
================================ */

export const aboutQualityLinks: Record<AboutQualityLocale, string> = {
  "zh-CN": "/about/quality",
  en: "/en/about/quality",
  es: "/es/about/quality",
  fr: "/fr/about/quality",
  ko: "/ko/about/quality",
  ru: "/ru/about/quality",
};

/* ================================
   5. 判断是否为质量页面支持语言
================================ */

export function isAboutQualityLocale(
  locale: string
): locale is AboutQualityLocale {
  return aboutQualityLocales.includes(locale as AboutQualityLocale);
}

/* ================================
   6. 质量页面多语言内容

   说明：
   1. 每种语言结构完全一致
   2. 后期要改某一段文字，可以直接横向对照修改
   3. 图片路径统一引用 aboutQualityImages，避免每个语言重复写路径
================================ */

export const aboutQualityContent: Record<
  AboutQualityLocale,
  AboutQualityPageData
> = {
  /* ================================
     中文 zh-CN
  ================================ */
  "zh-CN": {
    metadataTitle: "质量体系与合规认证 | 恒永达",
    metadataDescription:
      "恒永达围绕微流体核心零部件的研发、制造、检测和交付，构建可追溯、可验证、可改进的质量管理体系。",

    heroTitle: "质量源于全过程管控",
    heroSubtitle: "以可追溯、可验证、可改进的体系支撑稳定交付",

    lifeTitle: "以质量作为企业长期发展的生命线",
    lifeTextBeforeStrong: "恒永达始终将",
    lifeTextStrong: "产品质量视为企业发展的生命线",
    lifeTextAfterStrong:
      "，围绕微流体系统核心零部件的研发制造需求，将品质保障落实到供应链管理、研发验证、生产制造、出厂检验及售后服务的全生命周期中。",
    lifeSubtext:
      "通过 PDM、ERP、MES、SVN 等电子化数据平台，对关键物料、工艺过程、检验记录、版本文件和交付信息进行记录、流转与更新，持续提升产品从物料、制造、检测到交付全过程的可追溯性、可验证性与持续改进能力。",

    pathTitle: "全生命周期质量路径",
    pathSummary:
      "恒永达将质量管理贯穿供应链、研发验证、来料确认、过程制造、终检放行和客户反馈全过程，以标准化流程和数据化记录支撑产品质量的可追溯、可验证与持续改进。",
    pathSteps: [
      {
        index: "01",
        title: "供应链保障",
        description:
          "对供应商、关键物料和外协部件进行准入、评估与来料确认，从源头降低质量风险。",
      },
      {
        index: "02",
        title: "研发验证",
        description:
          "在产品设计阶段进行结构、材料、性能和应用适配验证，保障方案具备长期使用基础。",
      },
      {
        index: "03",
        title: "来料与首样确认",
        description:
          "对关键物料、首件、首批或变更产品进行检验与文件确认，降低批量制造前的不确定性。",
      },
      {
        index: "04",
        title: "过程控制",
        description:
          "通过标准化作业、工序检查和过程记录，对装配、调试、洁净处理等关键环节进行管控。",
      },
      {
        index: "05",
        title: "终检放行",
        description:
          "围绕功能、密封性、压力、流量、电气性能等关键指标进行出厂前检测与质量确认。",
      },
      {
        index: "06",
        title: "交付与反馈",
        description:
          "完成包装运输、交付记录、客户反馈和售后响应，让质量信息持续回流到产品与流程改进中。",
      },
    ],
    loopTitle: "异常处理与持续改进",
    loopText:
      "当来料、过程、终检或客户使用环节出现异常时，质量信息将进入不合格品控制、纠正措施、复检确认和反馈改进流程，推动问题闭环处理，避免质量问题停留在单点处理。",

    equipmentTitle: "检测设备与质量验证能力",
    equipmentIntro: [
      "恒永达配置多类精密检测设备与验证手段，用于产品功能、关键尺寸、外观结构及密封性确认",
      "通过设备检测、测试工装和数据记录，为核心流体零部件的质量一致性提供依据",
    ],
    equipmentItems: [
      {
        name: "三坐标测量仪",
        description:
          "用于关键零件的空间尺寸、形位公差和装配基准检测，为精密零部件加工与装配一致性提供数据依据。",
        image: aboutQualityImages.equipmentCmm,
        alt: "恒永达三坐标测量仪",
        parametersTitle: "设备关键参数",
        parameters: [
          "最大允许示值误差：1.5 + L / 350 μm",
          "最大允许探测误差：1.8 μm",
        ],
      },
      {
        name: "影像测量仪",
        description:
          "用于细小结构、外形尺寸、轮廓边界和局部特征检测，适合微流体零部件的精密测量与过程确认。",
        image: aboutQualityImages.equipmentImageMeasuring,
        alt: "恒永达影像测量仪",
        parametersTitle: "设备关键参数",
        parameters: ["有效像素：2048 × 1536", "适用于细小结构与局部特征测量"],
      },
      {
        name: "视觉测量设备",
        description:
          "用于产品外观、结构特征、装配状态和关键测量点的快速检测，提升检测效率与过程判断一致性。",
        image: aboutQualityImages.equipmentVision,
        alt: "恒永达视觉测量设备",
        parametersTitle: "设备关键参数",
        parameters: ["重复性精度：±0.5 μm 至 ±1.5 μm", "测量精度：±2σ"],
      },
      {
        name: "共聚焦显微镜",
        description:
          "用于微小表面形貌、局部高度差、精细结构和表面质量检测，支持高精密部件的质量验证。",
        image: aboutQualityImages.equipmentConfocal,
        alt: "恒永达共聚焦显微镜",
        parametersTitle: "设备关键参数",
        parameters: ["高度测量精度：±(0.2 + L / 100) μm", "宽度测量精度：±2%"],
      },
    ],
    equipmentNote:
      "通过检测设备、测试工装、验证流程和数据记录的协同，恒永达持续提升泵、阀、传感器、管路连接件等产品在关键尺寸、功能表现和长期运行中的稳定性与一致性。",

    certTitle: "质量体系与合规认证",
    certSummary: "以标准化质量管理体系支撑产品研发、制造、检测与交付全过程",
    certItems: [
      {
        name: "ISO 13485 医疗器械质量管理体系认证",
        description:
          "面向医疗器械相关产品和服务过程的质量管理体系要求，为客户项目导入和质量审核提供体系依据。",
        image: aboutQualityImages.certificateIso13485,
        alt: "恒永达 ISO 13485 医疗器械质量管理体系认证",
      },
      {
        name: "ISO 9001 质量管理体系认证",
        description: "支撑研发、制造、检测、交付和持续改进过程的标准化管理。",
        image: aboutQualityImages.certificateIso9001,
        alt: "恒永达 ISO 9001 质量管理体系认证",
      },
    ],
  },

  /* ================================
     英文 en
  ================================ */
  en: {
    metadataTitle: "Quality System and Compliance | FOREACH",
    metadataDescription:
      "FOREACH builds a traceable, verifiable and continuously improving quality management system for microfluidic core components.",

    heroTitle: "Quality starts with end-to-end control",
    heroSubtitle:
      "Supporting stable delivery through a traceable, verifiable and continuously improving system",

    lifeTitle: "Quality as a foundation for long-term development",
    lifeTextBeforeStrong: "FOREACH regards ",
    lifeTextStrong: "product quality as a core foundation of long-term development",
    lifeTextAfterStrong:
      ", and integrates quality assurance into supply chain management, R&D validation, manufacturing, final inspection and after-sales service across the full product lifecycle.",
    lifeSubtext:
      "Through digital platforms such as PDM, ERP, MES and SVN, key materials, process data, inspection records, version files and delivery information are recorded, transferred and updated to enhance traceability, verification and continuous improvement.",

    pathTitle: "Lifecycle Quality Path",
    pathSummary:
      "FOREACH applies quality management across supplier control, R&D validation, incoming material confirmation, manufacturing, final release and customer feedback, using standardized processes and digital records to support traceable, verifiable and continuously improving quality.",
    pathSteps: [
      {
        index: "01",
        title: "Supply Chain Assurance",
        description:
          "Supplier qualification, key material control and incoming material confirmation help reduce quality risks from the source.",
      },
      {
        index: "02",
        title: "R&D Validation",
        description:
          "Structure, material, performance and application validation are carried out during product design to support long-term reliability.",
      },
      {
        index: "03",
        title: "Incoming and First Article Confirmation",
        description:
          "Key materials, first articles, first batches and product changes are inspected and confirmed before batch production.",
      },
      {
        index: "04",
        title: "Process Control",
        description:
          "Standardized operations, process inspection and production records are used to control assembly, adjustment and key manufacturing steps.",
      },
      {
        index: "05",
        title: "Final Inspection and Release",
        description:
          "Functional performance, sealing, pressure, flow and electrical characteristics are verified before delivery.",
      },
      {
        index: "06",
        title: "Delivery and Feedback",
        description:
          "Packaging, delivery records, customer feedback and after-sales response allow quality information to flow back into improvement.",
      },
    ],
    loopTitle: "Abnormality Handling and Continuous Improvement",
    loopText:
      "When abnormalities occur during incoming inspection, production, final inspection or customer use, quality information enters nonconforming product control, corrective action, re-inspection and feedback improvement processes to close the loop.",

    equipmentTitle: "Inspection Equipment and Quality Validation",
    equipmentIntro: [
      "FOREACH is equipped with precision inspection equipment and validation methods for product function, key dimensions, appearance, structure and sealing confirmation",
      "Equipment testing, test fixtures and data records provide evidence for quality consistency of core fluidic components",
    ],
    equipmentItems: [
      {
        name: "Coordinate Measuring Machine",
        description:
          "Used for spatial dimensions, geometric tolerances and assembly reference inspection of key parts.",
        image: aboutQualityImages.equipmentCmm,
        alt: "FOREACH coordinate measuring machine",
        parametersTitle: "Key Parameters",
        parameters: [
          "Maximum permissible indication error: 1.5 + L / 350 μm",
          "Maximum permissible probing error: 1.8 μm",
        ],
      },
      {
        name: "Image Measuring Instrument",
        description:
          "Used for small structures, external dimensions, contours and local feature inspection of microfluidic components.",
        image: aboutQualityImages.equipmentImageMeasuring,
        alt: "FOREACH image measuring instrument",
        parametersTitle: "Key Parameters",
        parameters: [
          "Effective pixels: 2048 × 1536",
          "Suitable for small structures and local feature measurement",
        ],
      },
      {
        name: "Vision Measuring Equipment",
        description:
          "Used for appearance, structural features, assembly status and key measurement points to improve inspection consistency.",
        image: aboutQualityImages.equipmentVision,
        alt: "FOREACH vision measuring equipment",
        parametersTitle: "Key Parameters",
        parameters: [
          "Repeatability accuracy: ±0.5 μm to ±1.5 μm",
          "Measurement accuracy: ±2σ",
        ],
      },
      {
        name: "Confocal Microscope",
        description:
          "Used for micro surface morphology, local height difference, fine structures and surface quality verification.",
        image: aboutQualityImages.equipmentConfocal,
        alt: "FOREACH confocal microscope",
        parametersTitle: "Key Parameters",
        parameters: [
          "Height measurement accuracy: ±(0.2 + L / 100) μm",
          "Width measurement accuracy: ±2%",
        ],
      },
    ],
    equipmentNote:
      "Through the collaboration of inspection equipment, test fixtures, validation processes and data records, FOREACH continuously improves dimensional accuracy, functional performance and long-term stability of pumps, valves, sensors, tubing assemblies and connectors.",

    certTitle: "Quality System and Compliance Certification",
    certSummary:
      "Supporting R&D, manufacturing, inspection and delivery through standardized quality management systems",
    certItems: [
      {
        name: "ISO 13485 Medical Device Quality Management System Certification",
        description:
          "Supports quality management requirements for medical device-related products and services, providing a basis for customer project introduction and quality audits.",
        image: aboutQualityImages.certificateIso13485,
        alt: "FOREACH ISO 13485 quality management system certification",
      },
      {
        name: "ISO 9001 Quality Management System Certification",
        description:
          "Supports standardized management across R&D, manufacturing, inspection, delivery and continuous improvement.",
        image: aboutQualityImages.certificateIso9001,
        alt: "FOREACH ISO 9001 quality management system certification",
      },
    ],
  },

  /* ================================
     西班牙语 es
  ================================ */
  es: {
    metadataTitle: "Sistema de calidad y certificaciones | FOREACH",
    metadataDescription:
      "FOREACH construye un sistema de gestión de calidad trazable, verificable y de mejora continua para componentes microfluídicos.",

    heroTitle: "La calidad nace del control integral",
    heroSubtitle:
      "Un sistema trazable, verificable y mejorable que respalda entregas estables",

    lifeTitle: "La calidad como base del desarrollo a largo plazo",
    lifeTextBeforeStrong: "FOREACH considera ",
    lifeTextStrong:
      "la calidad del producto como base esencial del desarrollo a largo plazo",
    lifeTextAfterStrong:
      ", e integra la garantía de calidad en la cadena de suministro, la validación de I+D, la fabricación, la inspección final y el servicio posventa.",
    lifeSubtext:
      "Mediante plataformas digitales como PDM, ERP, MES y SVN, se registran y actualizan materiales clave, datos de proceso, registros de inspección, archivos de versión e información de entrega para mejorar la trazabilidad, la verificación y la mejora continua.",

    pathTitle: "Ruta de calidad del ciclo de vida",
    pathSummary:
      "FOREACH aplica la gestión de calidad en proveedores, validación de I+D, confirmación de materiales, fabricación, liberación final y retroalimentación del cliente, con procesos estandarizados y registros digitales.",
    pathSteps: [
      {
        index: "01",
        title: "Garantía de suministro",
        description:
          "La evaluación de proveedores, el control de materiales clave y la confirmación de entradas reducen riesgos desde el origen.",
      },
      {
        index: "02",
        title: "Validación de I+D",
        description:
          "La estructura, los materiales, el rendimiento y la aplicación se validan durante el diseño del producto.",
      },
      {
        index: "03",
        title: "Confirmación de entrada y primera muestra",
        description:
          "Los materiales clave, primeras piezas, primeros lotes y cambios se inspeccionan antes de la producción en serie.",
      },
      {
        index: "04",
        title: "Control de proceso",
        description:
          "Operaciones estandarizadas, inspecciones de proceso y registros controlan el montaje, el ajuste y los pasos críticos.",
      },
      {
        index: "05",
        title: "Inspección final",
        description:
          "Se verifican función, estanqueidad, presión, caudal y características eléctricas antes de la entrega.",
      },
      {
        index: "06",
        title: "Entrega y retroalimentación",
        description:
          "El embalaje, los registros de entrega, la retroalimentación del cliente y el servicio posventa impulsan la mejora.",
      },
    ],
    loopTitle: "Gestión de anomalías y mejora continua",
    loopText:
      "Cuando se detectan anomalías en entradas, proceso, inspección final o uso del cliente, la información entra en control de no conformidades, acciones correctivas, reinspección y mejora.",

    equipmentTitle: "Equipos de inspección y validación de calidad",
    equipmentIntro: [
      "FOREACH cuenta con equipos de inspección de precisión para confirmar función, dimensiones clave, apariencia, estructura y estanqueidad",
      "Las pruebas, los utillajes y los registros de datos respaldan la consistencia de calidad de los componentes fluídicos",
    ],
    equipmentItems: [
      {
        name: "Máquina de medición por coordenadas",
        description:
          "Para medir dimensiones espaciales, tolerancias geométricas y referencias de montaje de piezas clave.",
        image: aboutQualityImages.equipmentCmm,
        alt: "Máquina de medición por coordenadas FOREACH",
        parametersTitle: "Parámetros clave",
        parameters: [
          "Error máximo permisible de indicación: 1.5 + L / 350 μm",
          "Error máximo permisible de palpado: 1.8 μm",
        ],
      },
      {
        name: "Instrumento de medición por imagen",
        description:
          "Para inspeccionar estructuras pequeñas, dimensiones, contornos y características locales.",
        image: aboutQualityImages.equipmentImageMeasuring,
        alt: "Instrumento de medición por imagen FOREACH",
        parametersTitle: "Parámetros clave",
        parameters: [
          "Píxeles efectivos: 2048 × 1536",
          "Adecuado para medición de estructuras pequeñas",
        ],
      },
      {
        name: "Equipo de medición visual",
        description:
          "Para apariencia, características estructurales, estado de montaje y puntos clave de medición.",
        image: aboutQualityImages.equipmentVision,
        alt: "Equipo de medición visual FOREACH",
        parametersTitle: "Parámetros clave",
        parameters: [
          "Precisión de repetibilidad: ±0.5 μm a ±1.5 μm",
          "Precisión de medición: ±2σ",
        ],
      },
      {
        name: "Microscopio confocal",
        description:
          "Para morfología superficial, diferencias de altura, estructuras finas y calidad superficial.",
        image: aboutQualityImages.equipmentConfocal,
        alt: "Microscopio confocal FOREACH",
        parametersTitle: "Parámetros clave",
        parameters: [
          "Precisión de altura: ±(0.2 + L / 100) μm",
          "Precisión de anchura: ±2%",
        ],
      },
    ],
    equipmentNote:
      "Mediante equipos de inspección, utillajes de prueba, procesos de validación y registros de datos, FOREACH mejora continuamente la estabilidad dimensional, funcional y de funcionamiento a largo plazo de bombas, válvulas, sensores, tubos y conectores.",

    certTitle: "Sistema de calidad y certificaciones",
    certSummary:
      "Sistemas de gestión de calidad estandarizados para I+D, fabricación, inspección y entrega",
    certItems: [
      {
        name: "Certificación ISO 13485 de gestión de calidad para dispositivos médicos",
        description:
          "Apoya los requisitos de gestión de calidad para productos y servicios relacionados con dispositivos médicos.",
        image: aboutQualityImages.certificateIso13485,
        alt: "Certificación ISO 13485 de FOREACH",
      },
      {
        name: "Certificación ISO 9001 de gestión de calidad",
        description:
          "Respalda la gestión estandarizada de I+D, fabricación, inspección, entrega y mejora continua.",
        image: aboutQualityImages.certificateIso9001,
        alt: "Certificación ISO 9001 de FOREACH",
      },
    ],
  },

  /* ================================
     法语 fr
  ================================ */
  fr: {
    metadataTitle: "Système qualité et certifications | FOREACH",
    metadataDescription:
      "FOREACH met en place un système qualité traçable, vérifiable et en amélioration continue pour les composants microfluidiques.",

    heroTitle: "La qualité commence par le contrôle global",
    heroSubtitle:
      "Un système traçable, vérifiable et améliorable pour soutenir une livraison stable",

    lifeTitle: "La qualité comme fondement du développement durable",
    lifeTextBeforeStrong: "FOREACH considère ",
    lifeTextStrong:
      "la qualité produit comme un fondement essentiel du développement à long terme",
    lifeTextAfterStrong:
      ", et intègre l’assurance qualité dans la chaîne d’approvisionnement, la validation R&D, la fabrication, l’inspection finale et le service après-vente.",
    lifeSubtext:
      "Grâce aux plateformes PDM, ERP, MES et SVN, les matériaux clés, données de procédé, rapports d’inspection, fichiers de version et informations de livraison sont enregistrés et mis à jour pour améliorer la traçabilité, la vérification et l’amélioration continue.",

    pathTitle: "Parcours qualité du cycle de vie",
    pathSummary:
      "FOREACH applique la gestion qualité à la chaîne d’approvisionnement, à la validation R&D, à la confirmation des matériaux, à la fabrication, à la libération finale et aux retours clients.",
    pathSteps: [
      {
        index: "01",
        title: "Assurance chaîne d’approvisionnement",
        description:
          "Qualification des fournisseurs, contrôle des matériaux clés et confirmation des entrées pour réduire les risques qualité.",
      },
      {
        index: "02",
        title: "Validation R&D",
        description:
          "Validation de la structure, des matériaux, des performances et des applications dès la phase de conception.",
      },
      {
        index: "03",
        title: "Confirmation entrée et premier article",
        description:
          "Inspection des matériaux clés, premiers articles, premiers lots et changements avant la production en série.",
      },
      {
        index: "04",
        title: "Contrôle de processus",
        description:
          "Opérations standardisées, inspections de processus et enregistrements pour contrôler les étapes clés.",
      },
      {
        index: "05",
        title: "Inspection finale",
        description:
          "Vérification de la fonction, de l’étanchéité, de la pression, du débit et des performances électriques avant livraison.",
      },
      {
        index: "06",
        title: "Livraison et retour d’information",
        description:
          "Les données de livraison, les retours clients et le service après-vente alimentent l’amélioration continue.",
      },
    ],
    loopTitle: "Traitement des anomalies et amélioration continue",
    loopText:
      "Lorsqu’une anomalie apparaît lors de la réception, du processus, de l’inspection finale ou de l’utilisation client, elle entre dans un processus de contrôle des non-conformités, d’action corrective, de recontrôle et d’amélioration.",

    equipmentTitle: "Équipements d’inspection et validation qualité",
    equipmentIntro: [
      "FOREACH dispose d’équipements d’inspection de précision pour vérifier la fonction, les dimensions clés, l’apparence, la structure et l’étanchéité",
      "Les essais, outillages et enregistrements de données soutiennent la constance qualité des composants fluidiques",
    ],
    equipmentItems: [
      {
        name: "Machine de mesure tridimensionnelle",
        description:
          "Pour mesurer les dimensions spatiales, tolérances géométriques et références d’assemblage.",
        image: aboutQualityImages.equipmentCmm,
        alt: "Machine de mesure tridimensionnelle FOREACH",
        parametersTitle: "Paramètres clés",
        parameters: [
          "Erreur maximale admissible d’indication : 1.5 + L / 350 μm",
          "Erreur maximale admissible de palpage : 1.8 μm",
        ],
      },
      {
        name: "Instrument de mesure par image",
        description:
          "Pour inspecter petites structures, dimensions, contours et caractéristiques locales.",
        image: aboutQualityImages.equipmentImageMeasuring,
        alt: "Instrument de mesure par image FOREACH",
        parametersTitle: "Paramètres clés",
        parameters: [
          "Pixels effectifs : 2048 × 1536",
          "Adapté aux petites structures et détails locaux",
        ],
      },
      {
        name: "Équipement de mesure visuelle",
        description:
          "Pour l’apparence, les caractéristiques structurelles, l’état d’assemblage et les points de mesure clés.",
        image: aboutQualityImages.equipmentVision,
        alt: "Équipement de mesure visuelle FOREACH",
        parametersTitle: "Paramètres clés",
        parameters: [
          "Répétabilité : ±0.5 μm à ±1.5 μm",
          "Précision de mesure : ±2σ",
        ],
      },
      {
        name: "Microscope confocal",
        description:
          "Pour la morphologie de surface, les différences de hauteur, les structures fines et la qualité de surface.",
        image: aboutQualityImages.equipmentConfocal,
        alt: "Microscope confocal FOREACH",
        parametersTitle: "Paramètres clés",
        parameters: [
          "Précision hauteur : ±(0.2 + L / 100) μm",
          "Précision largeur : ±2%",
        ],
      },
    ],
    equipmentNote:
      "Grâce aux équipements d’inspection, outillages d’essai, processus de validation et enregistrements, FOREACH améliore continuellement la stabilité dimensionnelle, fonctionnelle et à long terme des pompes, vannes, capteurs, tubes et connecteurs.",

    certTitle: "Système qualité et certifications",
    certSummary:
      "Des systèmes qualité standardisés pour soutenir la R&D, la fabrication, l’inspection et la livraison",
    certItems: [
      {
        name: "Certification ISO 13485 pour dispositifs médicaux",
        description:
          "Soutient les exigences de gestion qualité pour les produits et services liés aux dispositifs médicaux.",
        image: aboutQualityImages.certificateIso13485,
        alt: "Certification ISO 13485 FOREACH",
      },
      {
        name: "Certification ISO 9001 de gestion qualité",
        description:
          "Soutient la gestion standardisée de la R&D, de la fabrication, de l’inspection, de la livraison et de l’amélioration continue.",
        image: aboutQualityImages.certificateIso9001,
        alt: "Certification ISO 9001 FOREACH",
      },
    ],
  },

  /* ================================
     韩语 ko
  ================================ */
  ko: {
    metadataTitle: "품질 시스템 및 인증 | FOREACH",
    metadataDescription:
      "FOREACH는 미세유체 핵심 부품을 위해 추적 가능하고 검증 가능하며 지속적으로 개선되는 품질 관리 체계를 구축합니다.",

    heroTitle: "품질은 전 과정 관리에서 시작됩니다",
    heroSubtitle:
      "추적 가능하고 검증 가능하며 개선 가능한 체계로 안정적인 납품을 지원합니다",

    lifeTitle: "장기적인 성장을 위한 품질 중심 원칙",
    lifeTextBeforeStrong: "FOREACH는 ",
    lifeTextStrong: "제품 품질을 장기적인 기업 발전의 핵심 기반",
    lifeTextAfterStrong:
      "으로 보고, 공급망 관리, 연구개발 검증, 제조, 출하 검사 및 사후 서비스 전 과정에 품질 보증을 적용합니다.",
    lifeSubtext:
      "PDM, ERP, MES, SVN 등의 전자 데이터 플랫폼을 통해 주요 자재, 공정 데이터, 검사 기록, 버전 파일 및 납품 정보를 기록하고 갱신하여 추적성과 지속 개선 역량을 높입니다.",

    pathTitle: "제품 전주기 품질 경로",
    pathSummary:
      "FOREACH는 공급망, 연구개발 검증, 입고 확인, 제조 공정, 최종 검사 및 고객 피드백 전 과정에 품질 관리를 적용하고 표준화된 프로세스와 데이터 기록으로 품질을 지원합니다.",
    pathSteps: [
      {
        index: "01",
        title: "공급망 품질 보증",
        description:
          "공급업체 평가, 핵심 자재 관리 및 입고 확인을 통해 품질 리스크를 원천적으로 줄입니다.",
      },
      {
        index: "02",
        title: "연구개발 검증",
        description:
          "제품 설계 단계에서 구조, 재료, 성능 및 적용 적합성을 검증하여 장기 사용 기반을 확보합니다.",
      },
      {
        index: "03",
        title: "입고 및 초도 확인",
        description:
          "핵심 자재, 초도품, 초도 로트 및 변경 제품을 검사하고 문서로 확인합니다.",
      },
      {
        index: "04",
        title: "공정 관리",
        description:
          "표준 작업, 공정 검사 및 기록을 통해 조립, 조정, 세정 등 주요 공정을 관리합니다.",
      },
      {
        index: "05",
        title: "최종 검사 및 출하",
        description:
          "기능, 밀봉성, 압력, 유량 및 전기적 성능 등 주요 지표를 출하 전에 검증합니다.",
      },
      {
        index: "06",
        title: "납품 및 피드백",
        description:
          "포장, 납품 기록, 고객 피드백 및 사후 대응을 통해 품질 정보를 개선 과정에 반영합니다.",
      },
    ],
    loopTitle: "이상 처리와 지속 개선",
    loopText:
      "입고, 공정, 최종 검사 또는 고객 사용 중 이상이 발생하면 부적합품 관리, 시정 조치, 재검사 및 피드백 개선 프로세스로 연결되어 문제를 폐쇄적으로 관리합니다.",

    equipmentTitle: "검사 장비 및 품질 검증 역량",
    equipmentIntro: [
      "FOREACH는 제품 기능, 핵심 치수, 외관 구조 및 밀봉성 확인을 위한 정밀 검사 장비와 검증 수단을 갖추고 있습니다",
      "장비 검사, 테스트 지그 및 데이터 기록을 통해 핵심 유체 부품의 품질 일관성을 뒷받침합니다",
    ],
    equipmentItems: [
      {
        name: "3차원 측정기",
        description:
          "핵심 부품의 공간 치수, 형상 공차 및 조립 기준을 검사하는 데 사용됩니다.",
        image: aboutQualityImages.equipmentCmm,
        alt: "FOREACH 3차원 측정기",
        parametersTitle: "주요 장비 사양",
        parameters: [
          "최대 허용 지시 오차: 1.5 + L / 350 μm",
          "최대 허용 프로빙 오차: 1.8 μm",
        ],
      },
      {
        name: "영상 측정기",
        description:
          "소형 구조, 외형 치수, 윤곽 및 국부 특징을 정밀하게 측정하는 데 사용됩니다.",
        image: aboutQualityImages.equipmentImageMeasuring,
        alt: "FOREACH 영상 측정기",
        parametersTitle: "주요 장비 사양",
        parameters: ["유효 픽셀: 2048 × 1536", "소형 구조 및 국부 특징 측정에 적합"],
      },
      {
        name: "비전 측정 장비",
        description:
          "외관, 구조 특징, 조립 상태 및 주요 측정 지점을 빠르게 검사합니다.",
        image: aboutQualityImages.equipmentVision,
        alt: "FOREACH 비전 측정 장비",
        parametersTitle: "주요 장비 사양",
        parameters: ["반복 정밀도: ±0.5 μm ~ ±1.5 μm", "측정 정밀도: ±2σ"],
      },
      {
        name: "공초점 현미경",
        description:
          "미세 표면 형상, 국부 높이 차, 정밀 구조 및 표면 품질 검증에 사용됩니다.",
        image: aboutQualityImages.equipmentConfocal,
        alt: "FOREACH 공초점 현미경",
        parametersTitle: "주요 장비 사양",
        parameters: ["높이 측정 정밀도: ±(0.2 + L / 100) μm", "폭 측정 정밀도: ±2%"],
      },
    ],
    equipmentNote:
      "검사 장비, 테스트 지그, 검증 프로세스 및 데이터 기록을 통해 FOREACH는 펌프, 밸브, 센서, 튜빙 조립체 및 커넥터의 치수 안정성, 기능 성능 및 장기 안정성을 지속적으로 향상시킵니다.",

    certTitle: "품질 시스템 및 인증",
    certSummary:
      "표준화된 품질 관리 체계로 연구개발, 제조, 검사 및 납품 전 과정을 지원합니다",
    certItems: [
      {
        name: "ISO 13485 의료기기 품질경영시스템 인증",
        description:
          "의료기기 관련 제품과 서비스 과정의 품질 관리 요구를 지원합니다.",
        image: aboutQualityImages.certificateIso13485,
        alt: "FOREACH ISO 13485 인증",
      },
      {
        name: "ISO 9001 품질경영시스템 인증",
        description:
          "연구개발, 제조, 검사, 납품 및 지속 개선 과정의 표준화 관리를 지원합니다.",
        image: aboutQualityImages.certificateIso9001,
        alt: "FOREACH ISO 9001 인증",
      },
    ],
  },

  /* ================================
     俄语 ru
  ================================ */
  ru: {
    metadataTitle: "Система качества и сертификация | FOREACH",
    metadataDescription:
      "FOREACH формирует прослеживаемую, проверяемую и постоянно улучшаемую систему качества для микрофлюидных компонентов.",

    heroTitle: "Качество начинается с контроля всего процесса",
    heroSubtitle:
      "Прослеживаемая, проверяемая и улучшаемая система для стабильных поставок",

    lifeTitle: "Качество как основа долгосрочного развития",
    lifeTextBeforeStrong: "FOREACH рассматривает ",
    lifeTextStrong: "качество продукции как основу долгосрочного развития",
    lifeTextAfterStrong:
      " и внедряет управление качеством в цепочку поставок, НИОКР, производство, финальную проверку и сервисную поддержку.",
    lifeSubtext:
      "С помощью PDM, ERP, MES и SVN фиксируются ключевые материалы, данные процессов, записи проверок, версии документов и информация о поставках, что повышает прослеживаемость, проверяемость и возможность улучшения.",

    pathTitle: "Путь качества на всем жизненном цикле",
    pathSummary:
      "FOREACH применяет управление качеством на этапах поставок, проверки НИОКР, входного контроля, производства, финальной приемки и обратной связи клиентов.",
    pathSteps: [
      {
        index: "01",
        title: "Обеспечение поставок",
        description:
          "Оценка поставщиков, контроль ключевых материалов и входное подтверждение снижают риски качества.",
      },
      {
        index: "02",
        title: "Валидация НИОКР",
        description:
          "На этапе разработки проверяются конструкция, материалы, характеристики и пригодность к применению.",
      },
      {
        index: "03",
        title: "Входной и первичный контроль",
        description:
          "Ключевые материалы, первые образцы, первые партии и изменения проверяются до серийного производства.",
      },
      {
        index: "04",
        title: "Контроль процесса",
        description:
          "Стандартизированные операции, контроль процессов и записи помогают управлять сборкой и ключевыми этапами.",
      },
      {
        index: "05",
        title: "Финальная проверка",
        description:
          "Перед поставкой проверяются функция, герметичность, давление, расход и электрические характеристики.",
      },
      {
        index: "06",
        title: "Поставка и обратная связь",
        description:
          "Упаковка, записи поставки, отзывы клиентов и сервис помогают возвращать данные качества в улучшения.",
      },
    ],
    loopTitle: "Управление отклонениями и улучшение",
    loopText:
      "При отклонениях на входном контроле, в процессе, при финальной проверке или у клиента информация проходит через контроль несоответствий, корректирующие действия, повторную проверку и улучшение.",

    equipmentTitle: "Измерительное оборудование и проверка качества",
    equipmentIntro: [
      "FOREACH использует точное измерительное оборудование для проверки функций, ключевых размеров, внешнего вида, структуры и герметичности",
      "Испытания, оснастка и записи данных подтверждают стабильность качества ключевых жидкостных компонентов",
    ],
    equipmentItems: [
      {
        name: "Координатно-измерительная машина",
        description:
          "Используется для измерения пространственных размеров, геометрических допусков и баз сборки.",
        image: aboutQualityImages.equipmentCmm,
        alt: "Координатно-измерительная машина FOREACH",
        parametersTitle: "Ключевые параметры",
        parameters: [
          "Макс. допустимая погрешность индикации: 1.5 + L / 350 μm",
          "Макс. допустимая погрешность зондирования: 1.8 μm",
        ],
      },
      {
        name: "Оптический измерительный прибор",
        description:
          "Используется для малых структур, размеров, контуров и локальных элементов.",
        image: aboutQualityImages.equipmentImageMeasuring,
        alt: "Оптический измерительный прибор FOREACH",
        parametersTitle: "Ключевые параметры",
        parameters: [
          "Эффективные пиксели: 2048 × 1536",
          "Подходит для измерения малых структур",
        ],
      },
      {
        name: "Визуальное измерительное оборудование",
        description:
          "Используется для внешнего вида, структурных особенностей, состояния сборки и ключевых точек измерения.",
        image: aboutQualityImages.equipmentVision,
        alt: "Визуальное измерительное оборудование FOREACH",
        parametersTitle: "Ключевые параметры",
        parameters: [
          "Повторяемость: ±0.5 μm до ±1.5 μm",
          "Точность измерения: ±2σ",
        ],
      },
      {
        name: "Конфокальный микроскоп",
        description:
          "Используется для микрорельефа поверхности, локальной высоты, тонких структур и качества поверхности.",
        image: aboutQualityImages.equipmentConfocal,
        alt: "Конфокальный микроскоп FOREACH",
        parametersTitle: "Ключевые параметры",
        parameters: [
          "Точность по высоте: ±(0.2 + L / 100) μm",
          "Точность по ширине: ±2%",
        ],
      },
    ],
    equipmentNote:
      "С помощью измерительного оборудования, испытательной оснастки, процессов валидации и записей данных FOREACH повышает стабильность размеров, функций и долгосрочной работы насосов, клапанов, датчиков, трубок и соединителей.",

    certTitle: "Система качества и сертификация",
    certSummary:
      "Стандартизированные системы качества поддерживают НИОКР, производство, проверку и поставку",
    certItems: [
      {
        name: "Сертификация ISO 13485 для медицинских изделий",
        description:
          "Поддерживает требования к управлению качеством для продуктов и услуг, связанных с медицинскими изделиями.",
        image: aboutQualityImages.certificateIso13485,
        alt: "Сертификация ISO 13485 FOREACH",
      },
      {
        name: "Сертификация ISO 9001 системы менеджмента качества",
        description:
          "Поддерживает стандартизированное управление НИОКР, производством, проверкой, поставкой и улучшением.",
        image: aboutQualityImages.certificateIso9001,
        alt: "Сертификация ISO 9001 FOREACH",
      },
    ],
  },
};

/* ================================
   7. 获取当前语言内容

   说明：
   1. 传入 zh-CN 返回中文
   2. 传入 en / es / fr / ko / ru 返回对应语言
   3. 如果传入异常语言，默认回到中文
================================ */

export function getAboutQualityContent(locale: string): AboutQualityPageData {
  if (isAboutQualityLocale(locale)) {
    return aboutQualityContent[locale];
  }

  return aboutQualityContent["zh-CN"];
}  