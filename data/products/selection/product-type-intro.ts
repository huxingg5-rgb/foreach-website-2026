/* =========================================================
   product-type-intro.ts
   恒永达官网｜产品中心产品种类介绍数据

   说明：
   1. 这里管理泵类产品类型页面顶部的介绍横幅内容
   2. 每个产品类型都有独立标题、说明段落、图片路径和 alt
   3. 图片统一放在 public/images/products/pumps/product-types/
   4. 后续替换真实图片时，只需要同名覆盖 webp 文件即可
========================================================= */

import type { SelectionLocale } from "./product-selection.types";

export type ProductTypeIntroContent = {
  imagePath?: string;
  title: string;
  paragraphs: string[];
  image: {
    src: string;
    alt: string;
  };
};

type ProductTypeIntroLocalizedCopy = {
  title: string;
  paragraphs: string[];
  imageAlt: string;
};

type ProductTypeIntroLocaleMap = Partial<
  Record<Exclude<SelectionLocale, "zh">, ProductTypeIntroLocalizedCopy>
>;

const PRODUCT_TYPE_INTRO_LOCALES: SelectionLocale[] = [
  "zh",
  "en",
  "es",
  "fr",
  "ko",
  "ru",
];

export const productTypeIntroMap: Record<string, ProductTypeIntroContent> = {
  "pumps:plunger-pump": {
    title: "柱塞泵系列",
    paragraphs: [
      "恒永达柱塞泵系列专为自动化分析仪器中的精密液体处理而设计，适用于体外诊断、生命科学、实验室自动化及分析检测设备中的试剂加注、样本分配、定量输送和微量液体控制场景。",
      "产品覆盖 EA 常规柱塞泵、SM 微型柱塞泵和 TM 超微型柱塞泵等平台，可根据仪器空间、加液量程、泵头材质、接口方式和系统集成需求进行选型。",
      "产品卡片展示常用基础型号，完整规格参数、性能曲线和可选配置可进入详情页查看；如有特殊工况或非标需求，可通过选型清单提交给工程师进一步确认。",
    ],
    image: {
      src: "/images/products/pumps/product-types/plunger-pumps/foreach-plunger-pumps-product-type-intro.webp",
      alt: "FOREACH 柱塞泵系列产品图，用于 IVD、生命科学和实验室自动化设备中的精密液体处理",
    },
  },

  "pumps:diaphragm-pump": {
    title: "隔膜泵系列",
    paragraphs: [
      "恒永达隔膜泵系列适用于自动化仪器中的气体抽吸、液体输送、清洗循环、废液排放和气液混合介质抽排等场景。",
      "产品按应用介质和工况分为气体隔膜泵、液体隔膜泵和气液混合隔膜泵三类，可根据流量、耐压、自吸能力、膜片材质、阀片材质和安装空间进行选型。",
      "产品卡片仅展示常用基础配置，完整参数与型号组合请进入详情页查看或提交选型需求确认。",
    ],
    image: {
      src: "/images/products/pumps/product-types/diaphragm-pumps/foreach-diaphragm-pumps-product-type-intro.webp",
      alt: "FOREACH 隔膜泵系列产品图，用于清洗、废液和试剂输送液路",
    },
  },

  "pumps:pipette-pump": {
    title: "移液泵系列",
    paragraphs: [
      "恒永达移液泵系列适用于自动化仪器中的样本转移、试剂分配和微量液体处理场景，采用气体置换方式配合一次性吸头使用，可降低样本残留与交叉污染风险。",
      "产品包含 SMTP2 可编程气体置换式移液泵和 SMTP4 气体置换式移液泵，覆盖 100 μL、500 μL 和 1000 μL 基础配置。",
      "支持主流一次性吸头及定制吸头适配，吸头适配器长度多种可选，可根据客户设备结构和移液场景进行配置确认。",
    ],
    image: {
      src: "/images/products/pumps/product-types/pipetting-pumps/foreach-pipetting-pumps-product-type-intro.webp",
      alt: "FOREACH 移液泵系列产品图，用于自动化移液、加样和样本处理",
    },
  },

  "pumps:syringe-pump": {
    imagePath: "/images/products/pumps/syringe-pumps/foreach-syringe-pump-series.webp",
    title: "注射泵系列",
    paragraphs: [
      "恒永达注射泵系列适用于高精度进样、注液、梯度控制和稳定流量输出。",
      "注射泵可根据注射器规格、行程分辨率、速度范围、控制方式和系统安装空间进行选型。",
      "所有无阀泵均按项目需求定制，具体排量、接口、清洗口和安装方式可进一步确认。",
    ],
    image: {
      src: "/images/products/pumps/product-types/syringe-pumps/foreach-syringe-pumps-product-type-intro.webp",
      alt: "FOREACH 注射泵系列产品图，用于高精度进样、注液和稳定流量输出",
    },
  },

  "pumps:valveless-pump": {
    title: "无阀泵系列",
    paragraphs: [
      "恒永达无阀泵系列适用于自动化分析仪器中的加样、滴定、灌装、定量输送和比例输送场景，可减少外置电磁阀使用，降低液路复杂度。",
      "产品覆盖 12–80 μL/rev、50–250 μL/rev、300–1200 μL/rev 单圈排量，并支持 1:9 至 1:19 双头比例输送配置。",
      "所有无阀泵均按项目需求定制，具体排量、接口、清洗口和安装方式可进一步确认。",
    ],
    image: {
      src: "/images/products/pumps/product-types/valveless-pumps/foreach-valveless-pumps-product-type-intro.webp",
      alt: "FOREACH 无阀泵系列产品图，用于紧凑型仪器中的精密液体处理",
    },
  },

  "pumps:high-pressure-pump": {
    title: "高压泵系列",
    paragraphs: [
      "恒永达高压泵系列适用于对压力稳定性、耐压能力和连续输送性能要求较高的分析仪器液路场景。",
      "该系列可用于需要稳定压力输出、精密流量控制和高可靠性液体输送的仪器平台。",
      "所有无阀泵均按项目需求定制，具体排量、接口、清洗口和安装方式可进一步确认。",
    ],
    image: {
      src: "/images/products/pumps/product-types/high-pressure-pumps/foreach-high-pressure-pumps-product-type-intro.webp",
      alt: "FOREACH 高压泵系列产品图，用于高压力稳定输送和分析仪器液路",
    },
  },
};

const productTypeIntroI18nMap: Record<string, ProductTypeIntroLocaleMap> = {
  "pumps:plunger-pump": {
    en: {
      title: "Plunger Pump Series",
      paragraphs: [
        "FOREACH plunger pumps are designed for precision liquid handling in automated analytical instruments, including IVD, life science, laboratory automation, and analytical testing systems.",
        "The range covers EA standard plunger pumps, SM miniature plunger pumps, and TM ultra-compact plunger pumps, supporting selection by instrument space, dispensing volume, pump head material, fluidic port, and system integration needs.",
        "Product cards show common base models. For full specifications, performance curves, and optional configurations, open the detail page or submit a selection request for engineering confirmation.",
      ],
      imageAlt:
        "FOREACH plunger pump series for precision liquid handling in IVD, life science, and laboratory automation instruments",
    },
    es: {
      title: "Serie de bombas de émbolo",
      paragraphs: [
        "Las bombas de émbolo FOREACH están diseñadas para manipulación precisa de líquidos en instrumentos analíticos automatizados, IVD, ciencias de la vida, automatización de laboratorio y equipos de análisis.",
        "La serie cubre bombas de émbolo EA Standard, SM Miniature y TM Ultra-Compact, con selección según espacio del instrumento, volumen de dosificación, material del cabezal, fluidic port e integración del sistema.",
        "Las tarjetas muestran modelos base habituales. Para especificaciones completas, curvas de rendimiento y configuraciones opcionales, consulte la página de detalle o envíe una solicitud de selección para confirmación de ingeniería.",
      ],
      imageAlt:
        "Serie de bombas de émbolo FOREACH para manipulación precisa de líquidos en instrumentos IVD, ciencias de la vida y automatización de laboratorio",
    },
    fr: {
      title: "Série de pompes à piston",
      paragraphs: [
        "Les pompes à piston FOREACH sont conçues pour la manipulation précise de liquides dans les instruments d'analyse automatisés, l'IVD, les sciences de la vie, l'automatisation de laboratoire et les systèmes de test analytique.",
        "La gamme couvre les pompes à piston EA Standard, SM Miniature et TM Ultra-Compact, avec une sélection selon l'espace disponible, le volume de dosage, le matériau de tête de pompe, le fluidic port et les besoins d'intégration système.",
        "Les cartes produits présentent les modèles de base courants. Pour les spécifications complètes, les courbes de performance et les options, consultez la page de détail ou envoyez une demande de sélection pour validation technique.",
      ],
      imageAlt:
        "Série de pompes à piston FOREACH pour la manipulation précise de liquides dans l'IVD, les sciences de la vie et l'automatisation de laboratoire",
    },
    ko: {
      title: "플런저 펌프 시리즈",
      paragraphs: [
        "FOREACH 플런저 펌프는 IVD, 생명과학, 실험실 자동화 및 분석 장비의 정밀 액체 처리 공정에 맞춰 설계되었습니다.",
        "EA Standard, SM Miniature, TM Ultra-Compact 플런저 펌프 플랫폼을 포함하며 장비 공간, 분주 용량, 펌프 헤드 소재, fluidic port, 시스템 통합 조건에 따라 선택할 수 있습니다.",
        "제품 카드는 일반적인 기본 모델을 보여줍니다. 전체 사양, 성능 곡선, 선택 구성을 확인하려면 상세 페이지를 보거나 엔지니어링 확인을 위해 선정 요청을 제출하십시오.",
      ],
      imageAlt:
        "IVD, 생명과학 및 실험실 자동화 장비의 정밀 액체 처리를 위한 FOREACH 플런저 펌프 시리즈",
    },
    ru: {
      title: "Серия плунжерных насосов",
      paragraphs: [
        "Плунжерные насосы FOREACH предназначены для точной работы с жидкостями в автоматизированных аналитических приборах, IVD, системах life science, лабораторной автоматизации и аналитического тестирования.",
        "Линейка включает платформы EA Standard, SM Miniature и TM Ultra-Compact с подбором по месту установки, объему дозирования, материалу головки, fluidic port и требованиям системной интеграции.",
        "Карточки показывают распространенные базовые модели. Полные спецификации, кривые производительности и опции доступны на странице деталей либо через запрос подбора для инженерного подтверждения.",
      ],
      imageAlt:
        "Серия плунжерных насосов FOREACH для точной работы с жидкостями в IVD, life science и лабораторной автоматизации",
    },
  },

  "pumps:diaphragm-pump": {
    en: {
      title: "Diaphragm Pump Series",
      paragraphs: [
        "FOREACH diaphragm pumps support gas aspiration, liquid transfer, wash circulation, waste discharge, and gas-liquid media handling inside automated instruments.",
        "The range includes gas diaphragm pumps, liquid diaphragm pumps, and gas-liquid diaphragm pumps. Selection can be based on flow rate, pressure resistance, self-priming performance, diaphragm material, valve material, and installation space.",
        "Product cards show common base configurations. For full parameters and model combinations, open the detail page or submit a selection request.",
      ],
      imageAlt:
        "FOREACH diaphragm pump series for wash, waste, and reagent transfer fluidic paths",
    },
    es: {
      title: "Serie de bombas de diafragma",
      paragraphs: [
        "Las bombas de diafragma FOREACH se utilizan para aspiración de gas, transferencia de líquidos, ciclos de lavado, descarga de residuos y manejo de medios gas-líquido en instrumentos automatizados.",
        "La serie incluye bombas de diafragma para gas, para líquido y para gas-líquido. La selección puede basarse en flow rate, pressure resistance, self-priming, diaphragm material, valve material y espacio de instalación.",
        "Las tarjetas muestran configuraciones base habituales. Para parámetros completos y combinaciones de modelo, consulte la página de detalle o envíe una solicitud de selección.",
      ],
      imageAlt:
        "Serie de bombas de diafragma FOREACH para circuitos de lavado, residuos y transferencia de reactivos",
    },
    fr: {
      title: "Série de pompes à membrane",
      paragraphs: [
        "Les pompes à membrane FOREACH prennent en charge l'aspiration de gaz, le transfert de liquides, les cycles de lavage, l'évacuation des déchets et la gestion de milieux gaz-liquide dans les instruments automatisés.",
        "La gamme comprend des pompes à membrane pour gaz, liquides et gaz-liquide. La sélection peut se faire selon flow rate, pressure resistance, self-priming, diaphragm material, valve material et l'espace d'installation.",
        "Les cartes produits présentent les configurations de base courantes. Pour les paramètres complets et les combinaisons de modèles, consultez la page de détail ou envoyez une demande de sélection.",
      ],
      imageAlt:
        "Série de pompes à membrane FOREACH pour les circuits de lavage, déchets et transfert de réactifs",
    },
    ko: {
      title: "다이어프램 펌프 시리즈",
      paragraphs: [
        "FOREACH 다이어프램 펌프는 자동화 장비 내부의 가스 흡입, 액체 이송, 세척 순환, 폐액 배출 및 기액 혼합 매체 처리에 사용됩니다.",
        "가스 다이어프램 펌프, 액체 다이어프램 펌프, 기액 혼합 다이어프램 펌프로 구성되며 flow rate, pressure resistance, self-priming, diaphragm material, valve material, 설치 공간에 따라 선택할 수 있습니다.",
        "제품 카드는 일반적인 기본 구성을 보여줍니다. 전체 파라미터와 모델 조합은 상세 페이지에서 확인하거나 선정 요청을 제출하십시오.",
      ],
      imageAlt:
        "세척, 폐액 및 시약 이송 유로를 위한 FOREACH 다이어프램 펌프 시리즈",
    },
    ru: {
      title: "Серия мембранных насосов",
      paragraphs: [
        "Мембранные насосы FOREACH применяются для аспирации газа, переноса жидкостей, промывочных циклов, отвода отходов и работы с газожидкостными средами в автоматизированных приборах.",
        "Линейка включает газовые, жидкостные и газожидкостные мембранные насосы. Подбор выполняется по flow rate, pressure resistance, self-priming, diaphragm material, valve material и монтажному пространству.",
        "Карточки показывают распространенные базовые конфигурации. Полные параметры и комбинации моделей доступны на странице деталей или через запрос подбора.",
      ],
      imageAlt:
        "Серия мембранных насосов FOREACH для промывки, отвода отходов и переноса реагентов",
    },
  },

  "pumps:pipette-pump": {
    en: {
      title: "Pipetting Pump Series",
      paragraphs: [
        "FOREACH pipetting pumps are used for sample transfer, reagent dispensing, and micro-volume liquid handling in automated instruments, using air displacement with disposable tips to reduce carryover and cross-contamination risk.",
        "The range includes SMTP2 programmable gas displacement pipetting pumps and SMTP4 gas displacement pipetting pumps, covering 100 μL, 500 μL, and 1000 μL base configurations.",
        "Mainstream disposable tips and custom tip adapters are supported, with multiple adapter lengths available for instrument structure and pipetting workflow confirmation.",
      ],
      imageAlt:
        "FOREACH pipetting pump series for automated pipetting, dispensing, and sample handling",
    },
    es: {
      title: "Serie de bombas de pipeteo",
      paragraphs: [
        "Las bombas de pipeteo FOREACH se usan para transferencia de muestras, dispensación de reactivos y manejo de microlíquidos en instrumentos automatizados, con desplazamiento de aire y puntas desechables para reducir residuos y contaminación cruzada.",
        "La serie incluye bombas SMTP2 programmable gas displacement pipetting pump y SMTP4 gas displacement pipetting pump, con configuraciones base de 100 μL, 500 μL y 1000 μL.",
        "Se admiten puntas desechables estándar y adaptadores personalizados, con varias longitudes de adaptador para confirmar la estructura del equipo y el flujo de pipeteo.",
      ],
      imageAlt:
        "Serie de bombas de pipeteo FOREACH para pipeteo automatizado, dispensación y manejo de muestras",
    },
    fr: {
      title: "Série de pompes de pipetage",
      paragraphs: [
        "Les pompes de pipetage FOREACH servent au transfert d'échantillons, à la distribution de réactifs et à la manipulation de micro-volumes dans les instruments automatisés, avec déplacement d'air et embouts jetables pour réduire les résidus et la contamination croisée.",
        "La gamme comprend les pompes SMTP2 programmable gas displacement pipetting pump et SMTP4 gas displacement pipetting pump, couvrant les configurations de base 100 μL, 500 μL et 1000 μL.",
        "Les embouts jetables courants et les adaptateurs personnalisés sont pris en charge, avec plusieurs longueurs d'adaptateur pour valider la structure de l'instrument et le flux de pipetage.",
      ],
      imageAlt:
        "Série de pompes de pipetage FOREACH pour pipetage automatisé, distribution et traitement d'échantillons",
    },
    ko: {
      title: "피펫팅 펌프 시리즈",
      paragraphs: [
        "FOREACH 피펫팅 펌프는 자동화 장비의 샘플 이송, 시약 분주 및 미량 액체 처리에 사용되며 일회용 팁과 공기 치환 방식을 통해 잔류와 교차 오염 위험을 줄입니다.",
        "SMTP2 programmable gas displacement pipetting pump와 SMTP4 gas displacement pipetting pump를 포함하며 100 μL, 500 μL, 1000 μL 기본 구성을 지원합니다.",
        "일반 일회용 팁과 맞춤형 팁 어댑터를 지원하며 여러 어댑터 길이를 선택해 장비 구조와 피펫팅 공정을 확인할 수 있습니다.",
      ],
      imageAlt:
        "자동 피펫팅, 분주 및 샘플 처리를 위한 FOREACH 피펫팅 펌프 시리즈",
    },
    ru: {
      title: "Серия пипетирующих насосов",
      paragraphs: [
        "Пипетирующие насосы FOREACH применяются для переноса образцов, дозирования реагентов и работы с микролитровыми объемами в автоматизированных приборах, используя воздушное вытеснение и одноразовые наконечники для снижения переноса и перекрестного загрязнения.",
        "Линейка включает SMTP2 programmable gas displacement pipetting pump и SMTP4 gas displacement pipetting pump с базовыми конфигурациями 100 μL, 500 μL и 1000 μL.",
        "Поддерживаются распространенные одноразовые наконечники и пользовательские адаптеры с несколькими вариантами длины для подтверждения конструкции прибора и сценария пипетирования.",
      ],
      imageAlt:
        "Серия пипетирующих насосов FOREACH для автоматического пипетирования, дозирования и обработки образцов",
    },
  },

  "pumps:syringe-pump": {
    en: {
      title: "Syringe Pump Series",
      paragraphs: [
        "FOREACH syringe pumps are used for high-precision injection, liquid delivery, gradient control, and stable flow output.",
        "Syringe pump selection can be based on syringe size, stroke resolution, speed range, control mode, and available installation space.",
        "Configurations are confirmed by project requirements, including volume, port, wash port, and mounting method.",
      ],
      imageAlt:
        "FOREACH syringe pump series for high-precision injection, liquid delivery, and stable flow output",
    },
    es: {
      title: "Serie de bombas de jeringa",
      paragraphs: [
        "Las bombas de jeringa FOREACH se usan para inyección de alta precisión, suministro de líquidos, control de gradiente y salida de flujo estable.",
        "La selección puede basarse en syringe size, stroke resolution, speed range, control mode y espacio de instalación disponible.",
        "Las configuraciones se confirman según los requisitos del proyecto, incluidos volume, port, wash port y mounting method.",
      ],
      imageAlt:
        "Serie de bombas de jeringa FOREACH para inyección de alta precisión, suministro de líquidos y flujo estable",
    },
    fr: {
      title: "Série de pompes seringues",
      paragraphs: [
        "Les pompes seringues FOREACH sont utilisées pour l'injection haute précision, l'alimentation en liquide, le contrôle de gradient et une sortie de débit stable.",
        "La sélection peut se faire selon syringe size, stroke resolution, speed range, control mode et l'espace d'installation disponible.",
        "Les configurations sont confirmées selon les exigences du projet, notamment volume, port, wash port et mounting method.",
      ],
      imageAlt:
        "Série de pompes seringues FOREACH pour injection haute précision, alimentation en liquide et débit stable",
    },
    ko: {
      title: "시린지 펌프 시리즈",
      paragraphs: [
        "FOREACH 시린지 펌프는 고정밀 주입, 액체 공급, 그래디언트 제어 및 안정적인 유량 출력에 사용됩니다.",
        "syringe size, stroke resolution, speed range, control mode, 설치 공간에 따라 선택할 수 있습니다.",
        "volume, port, wash port, mounting method를 포함한 구성은 프로젝트 요구사항에 따라 확인됩니다.",
      ],
      imageAlt:
        "고정밀 주입, 액체 공급 및 안정적인 유량 출력을 위한 FOREACH 시린지 펌프 시리즈",
    },
    ru: {
      title: "Серия шприцевых насосов",
      paragraphs: [
        "Шприцевые насосы FOREACH применяются для высокоточного ввода, подачи жидкости, градиентного управления и стабильного выходного потока.",
        "Подбор может выполняться по syringe size, stroke resolution, speed range, control mode и доступному монтажному пространству.",
        "Конфигурации подтверждаются по требованиям проекта, включая volume, port, wash port и mounting method.",
      ],
      imageAlt:
        "Серия шприцевых насосов FOREACH для высокоточного ввода, подачи жидкости и стабильного потока",
    },
  },

  "pumps:valveless-pump": {
    en: {
      title: "Valveless Pump Series",
      paragraphs: [
        "FOREACH valveless pumps support sampling, titration, filling, metering, and proportional delivery in automated analytical instruments while reducing external solenoid valve usage and fluidic path complexity.",
        "The range covers 12–80 μL/rev, 50–250 μL/rev, and 300–1200 μL/rev displacement platforms, with 1:9 to 1:19 dual-head proportional delivery options.",
        "All valveless pumps are customized by project requirements. Displacement, port, wash port, and mounting method can be confirmed further.",
      ],
      imageAlt:
        "FOREACH valveless pump series for precision liquid handling in compact instruments",
    },
    es: {
      title: "Serie de bombas sin válvulas",
      paragraphs: [
        "Las bombas sin válvulas FOREACH admiten muestreo, titulación, llenado, dosificación y entrega proporcional en instrumentos analíticos automatizados, reduciendo el uso de solenoid valves externas y la complejidad del fluidic path.",
        "La serie cubre plataformas de 12–80 μL/rev, 50–250 μL/rev y 300–1200 μL/rev, con opciones de entrega proporcional de doble cabezal de 1:9 a 1:19.",
        "Todas las bombas sin válvulas se personalizan según el proyecto. Displacement, port, wash port y mounting method pueden confirmarse posteriormente.",
      ],
      imageAlt:
        "Serie de bombas sin válvulas FOREACH para manipulación precisa de líquidos en instrumentos compactos",
    },
    fr: {
      title: "Série de pompes sans valve",
      paragraphs: [
        "Les pompes sans valve FOREACH prennent en charge l'échantillonnage, la titration, le remplissage, le dosage et la distribution proportionnelle dans les instruments analytiques automatisés, tout en réduisant l'usage de solenoid valves externes et la complexité du fluidic path.",
        "La gamme couvre les plateformes 12–80 μL/rev, 50–250 μL/rev et 300–1200 μL/rev, avec des options de distribution proportionnelle à double tête de 1:9 à 1:19.",
        "Toutes les pompes sans valve sont personnalisées selon le projet. Displacement, port, wash port et mounting method peuvent être confirmés ensuite.",
      ],
      imageAlt:
        "Série de pompes sans valve FOREACH pour la manipulation précise de liquides dans les instruments compacts",
    },
    ko: {
      title: "밸브리스 펌프 시리즈",
      paragraphs: [
        "FOREACH 밸브리스 펌프는 자동화 분석 장비의 샘플링, 적정, 충전, 정량 이송 및 비례 이송을 지원하며 외부 solenoid valve 사용과 fluidic path 복잡도를 줄입니다.",
        "12–80 μL/rev, 50–250 μL/rev, 300–1200 μL/rev 배출량 플랫폼과 1:9~1:19 듀얼 헤드 비례 이송 옵션을 제공합니다.",
        "모든 밸브리스 펌프는 프로젝트 요구사항에 따라 맞춤 구성됩니다. Displacement, port, wash port, mounting method는 추가 확인할 수 있습니다.",
      ],
      imageAlt:
        "컴팩트 장비의 정밀 액체 처리를 위한 FOREACH 밸브리스 펌프 시리즈",
    },
    ru: {
      title: "Серия безклапанных насосов",
      paragraphs: [
        "Безклапанные насосы FOREACH поддерживают отбор проб, титрование, наполнение, дозирование и пропорциональную подачу в автоматизированных аналитических приборах, снижая потребность во внешних solenoid valves и сложность fluidic path.",
        "Линейка охватывает платформы 12–80 μL/rev, 50–250 μL/rev и 300–1200 μL/rev, а также варианты двухголовочной пропорциональной подачи от 1:9 до 1:19.",
        "Все безклапанные насосы настраиваются под требования проекта. Displacement, port, wash port и mounting method могут быть подтверждены дополнительно.",
      ],
      imageAlt:
        "Серия безклапанных насосов FOREACH для точной работы с жидкостями в компактных приборах",
    },
  },

  "pumps:high-pressure-pump": {
    en: {
      title: "High Pressure Pump Series",
      paragraphs: [
        "FOREACH high pressure pumps are used in analytical instrument fluidic paths that require stable pressure, pressure resistance, and continuous delivery performance.",
        "The series supports instrument platforms that need stable pressure output, precision flow control, and reliable liquid delivery.",
        "Configurations can be confirmed by pressure range, flow requirements, material compatibility, and system interface.",
      ],
      imageAlt:
        "FOREACH high pressure pump series for stable high-pressure delivery in analytical instrument fluidic paths",
    },
    es: {
      title: "Serie de bombas de alta presión",
      paragraphs: [
        "Las bombas de alta presión FOREACH se usan en fluidic paths de instrumentos analíticos que requieren presión estable, pressure resistance y entrega continua.",
        "La serie admite plataformas que necesitan salida de presión estable, precision flow control y liquid delivery confiable.",
        "Las configuraciones pueden confirmarse por pressure range, flow requirements, material compatibility y system interface.",
      ],
      imageAlt:
        "Serie de bombas de alta presión FOREACH para suministro estable a alta presión en fluidic paths de instrumentos analíticos",
    },
    fr: {
      title: "Série de pompes haute pression",
      paragraphs: [
        "Les pompes haute pression FOREACH sont utilisées dans les fluidic paths d'instruments analytiques exigeant une pression stable, pressure resistance et une distribution continue.",
        "La série prend en charge les plateformes nécessitant une sortie de pression stable, precision flow control et liquid delivery fiable.",
        "Les configurations peuvent être confirmées selon pressure range, flow requirements, material compatibility et system interface.",
      ],
      imageAlt:
        "Série de pompes haute pression FOREACH pour une distribution stable à haute pression dans les fluidic paths d'instruments analytiques",
    },
    ko: {
      title: "고압 펌프 시리즈",
      paragraphs: [
        "FOREACH 고압 펌프는 안정적인 압력, pressure resistance, 연속 이송 성능이 필요한 분석 장비 fluidic path에 사용됩니다.",
        "안정적인 압력 출력, precision flow control, 신뢰성 높은 liquid delivery가 필요한 장비 플랫폼을 지원합니다.",
        "pressure range, flow requirements, material compatibility, system interface에 따라 구성을 확인할 수 있습니다.",
      ],
      imageAlt:
        "분석 장비 fluidic path의 안정적인 고압 이송을 위한 FOREACH 고압 펌프 시리즈",
    },
    ru: {
      title: "Серия насосов высокого давления",
      paragraphs: [
        "Насосы высокого давления FOREACH используются в fluidic paths аналитических приборов, где требуется стабильное давление, pressure resistance и непрерывная подача.",
        "Серия поддерживает платформы, которым необходимы стабильный выход давления, precision flow control и надежная liquid delivery.",
        "Конфигурации могут подтверждаться по pressure range, flow requirements, material compatibility и system interface.",
      ],
      imageAlt:
        "Серия насосов высокого давления FOREACH для стабильной высоконапорной подачи в fluidic paths аналитических приборов",
    },
  },
};

function getRuntimeLocale(defaultLocale: SelectionLocale): SelectionLocale {
  if (defaultLocale !== "zh") {
    return defaultLocale;
  }

  if (typeof window === "undefined") {
    return defaultLocale;
  }

  const firstSegment = window.location.pathname.split("/").filter(Boolean)[0];

  return PRODUCT_TYPE_INTRO_LOCALES.includes(firstSegment as SelectionLocale)
    ? (firstSegment as SelectionLocale)
    : defaultLocale;
}

export function getProductTypeIntroByIds(
  categoryId: string,
  productTypeId: string,
  locale: SelectionLocale = "zh"
) {
  const key = `${categoryId}:${productTypeId}`;
  const baseIntro = productTypeIntroMap[key];

  if (!baseIntro) {
    return null;
  }

  const activeLocale = getRuntimeLocale(locale);

  if (activeLocale === "zh") {
    return baseIntro;
  }

  const localizedCopy =
    productTypeIntroI18nMap[key]?.[activeLocale] || productTypeIntroI18nMap[key]?.en;

  if (!localizedCopy) {
    return baseIntro;
  }

  return {
    ...baseIntro,
    title: localizedCopy.title,
    paragraphs: localizedCopy.paragraphs,
    image: {
      ...baseIntro.image,
      alt: localizedCopy.imageAlt,
    },
  };
}


