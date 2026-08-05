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
      "恒永达隔膜泵涵盖**液体、气体及气液混合**类型，适用于液体输送、气体抽吸、清洗循环、废液排放及气液混合等场景。",
      "选型时可根据**输送介质、目标流量、工作压力或真空度、自吸高度、电机类型、接液材质、接口形式及安装空间**进行筛选。隔膜泵包括 **DPL30 300 mL/min、DPL60 600 mL/min**、DPGL800 6 L/min 等型号，可面向 IVD、实验室分析及医疗设备液路进行选型。",
      "产品卡片展示常用配置，完整参数、尺寸图及规格书请进入产品详情页查看；如无法确定型号，可提交实际工况获取选型建议。",
    ],
    image: {
      src: "/images/products/pumps/diaphragm-pumps/series/images/dpl-diaphragm-pump-series-main.webp",
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
        "La serie incluye las plataformas EA estándar, SM miniatura y TM ultracompacta. La selección se realiza según el espacio disponible, el volumen de dosificación, el material del cabezal, el puerto fluídico y los requisitos de integración del sistema.",
        "Las tarjetas muestran modelos base habituales. Para especificaciones completas, curvas de rendimiento y configuraciones opcionales, consulte la página de detalle o envíe una solicitud de selección para confirmación de ingeniería.",
      ],
      imageAlt:
        "Serie de bombas de émbolo FOREACH para manipulación precisa de líquidos en instrumentos IVD, ciencias de la vida y automatización de laboratorio",
    },
    fr: {
      title: "Série de pompes à piston",
      paragraphs: [
        "Les pompes à piston FOREACH sont conçues pour la manipulation précise de liquides dans les instruments d'analyse automatisés, l'IVD, les sciences de la vie, l'automatisation de laboratoire et les systèmes de test analytique.",
        "La gamme comprend les plateformes EA standard, SM miniature et TM ultra-compacte. La sélection s'effectue selon l'espace disponible, le volume de dosage, le matériau de la tête de pompe, le raccord fluidique et les besoins d'intégration du système.",
        "Les cartes produits présentent les modèles de base courants. Pour les spécifications complètes, les courbes de performance et les options, consultez la page de détail ou envoyez une demande de sélection pour validation technique.",
      ],
      imageAlt:
        "Série de pompes à piston FOREACH pour la manipulation précise de liquides dans l'IVD, les sciences de la vie et l'automatisation de laboratoire",
    },
    ko: {
      title: "플런저 펌프 시리즈",
      paragraphs: [
        "FOREACH 플런저 펌프는 IVD, 생명과학, 실험실 자동화 및 분석 장비의 정밀 액체 처리 공정에 맞춰 설계되었습니다.",
        "EA 표준형, SM 소형 및 TM 초소형 플런저 펌프 플랫폼을 제공하며 장비 공간, 분주 용량, 펌프 헤드 소재, 유체 포트 및 시스템 통합 조건에 따라 선택할 수 있습니다.",
        "제품 카드는 일반적인 기본 모델을 보여줍니다. 전체 사양, 성능 곡선, 선택 구성을 확인하려면 상세 페이지를 보거나 엔지니어링 확인을 위해 선정 요청을 제출하십시오.",
      ],
      imageAlt:
        "IVD, 생명과학 및 실험실 자동화 장비의 정밀 액체 처리를 위한 FOREACH 플런저 펌프 시리즈",
    },
    ru: {
      title: "Серия плунжерных насосов",
      paragraphs: [
        "Плунжерные насосы FOREACH предназначены для точной работы с жидкостями в автоматизированных аналитических приборах, системах IVD, биологических исследований и лабораторной автоматизации.",
        "Линейка включает стандартную платформу EA, миниатюрную SM и сверхкомпактную TM. Подбор выполняется по месту установки, объему дозирования, материалу головки, типу гидравлического порта и требованиям системной интеграции.",
        "Карточки показывают распространенные базовые модели. Полные спецификации, кривые производительности и опции доступны на странице деталей либо через запрос подбора для инженерного подтверждения.",
      ],
      imageAlt:
        "Серия плунжерных насосов FOREACH для точной работы с жидкостями в системах IVD, биологических исследований и лабораторной автоматизации",
    },
  },

  "pumps:diaphragm-pump": {
    en: {
      title: "Diaphragm Pump Series",
      paragraphs: [
        "FOREACH diaphragm pumps are available in **liquid, gas, and gas-liquid configurations** for liquid transfer, gas aspiration, wash circulation, waste-fluid discharge, and gas-liquid media handling.",
        "Selection can be filtered by **pumped medium, target flow rate, operating pressure or vacuum level, self-priming lift, motor type, wetted materials, port configuration, and available installation space**. Diaphragm pump models include the **DPL30 at 300 mL/min and DPL60 at 600 mL/min**, as well as the DPGL800 at 6 L/min, for fluidic systems in IVD, laboratory analysis, and medical equipment.",
        "Product cards show commonly specified configurations. For complete specifications, dimensional drawings, and datasheets, open the product detail page. If you are unsure which model to choose, submit your actual operating conditions for a selection recommendation.",
      ],
      imageAlt:
        "FOREACH diaphragm pump series for wash, waste, and reagent transfer fluidic paths",
    },
    es: {
      title: "Serie de bombas de diafragma",
      paragraphs: [
        "Las bombas de diafragma FOREACH se ofrecen en versiones para **líquidos, gases y mezclas gas-líquido**, destinadas a la transferencia de líquidos, la aspiración de gases, la circulación de lavado, la evacuación de líquidos residuales y el manejo de mezclas gas-líquido.",
        "La selección puede filtrarse por **fluido bombeado, caudal objetivo, presión de trabajo o nivel de vacío, altura de autocebado, tipo de motor, materiales en contacto con el fluido, tipo de conexión y espacio de instalación disponible**. La gama de bombas de diafragma incluye la **DPL30 de 300 mL/min y la DPL60 de 600 mL/min**, además de la DPGL800 de 6 L/min, para circuitos fluídicos de equipos IVD, análisis de laboratorio y dispositivos médicos.",
        "Las tarjetas de producto muestran las configuraciones habituales. Para consultar las especificaciones completas, los planos dimensionales y las fichas técnicas, acceda a la página de detalle del producto. Si no está seguro del modelo, envíe las condiciones reales de funcionamiento para recibir una recomendación de selección.",
      ],
      imageAlt:
        "Serie de bombas de diafragma FOREACH para circuitos de lavado, residuos y transferencia de reactivos",
    },
    fr: {
      title: "Série de pompes à membrane",
      paragraphs: [
        "Les pompes à membrane FOREACH sont proposées en versions pour **liquides, gaz et mélanges gaz-liquide**, destinées au transfert de liquides, à l'aspiration de gaz, à la circulation de lavage, à l'évacuation des liquides usagés et au traitement des mélanges gaz-liquide.",
        "La sélection peut être filtrée selon **le fluide véhiculé, le débit cible, la pression de service ou le niveau de vide, la hauteur d'auto-amorçage, le type de moteur, les matériaux en contact avec le fluide, le type de raccordement et l'espace d'installation disponible**. La gamme de pompes à membrane comprend la **DPL30 de 300 mL/min et la DPL60 de 600 mL/min**, ainsi que la DPGL800 de 6 L/min, pour les circuits fluidiques des équipements IVD, des systèmes d'analyse de laboratoire et des dispositifs médicaux.",
        "Les cartes produits présentent les configurations courantes. Pour consulter les caractéristiques complètes, les plans d'encombrement et les fiches techniques, ouvrez la page de détail du produit. Si le choix du modèle reste incertain, transmettez les conditions réelles de fonctionnement afin d'obtenir une recommandation de sélection.",
      ],
      imageAlt:
        "Série de pompes à membrane FOREACH pour les circuits de lavage, déchets et transfert de réactifs",
    },
    ko: {
      title: "다이어프램 펌프 시리즈",
      paragraphs: [
        "FOREACH 다이어프램 펌프는 **액체용, 가스용 및 기액 혼합용** 제품으로 구성되며 액체 이송, 가스 흡입, 세척액 순환, 폐액 배출 및 기액 혼합 유체 처리에 적용할 수 있습니다.",
        "선정 시 **이송 유체, 목표 유량, 작동 압력 또는 진공도, 자흡 높이, 모터 유형, 접액부 재질, 포트 형식 및 설치 공간**을 기준으로 필터링할 수 있습니다. 다이어프램 펌프에는 **DPL30 300 mL/min 및 DPL60 600 mL/min**과 DPGL800 6 L/min 등이 있으며 IVD, 실험실 분석 및 의료기기 유로용으로 선정할 수 있습니다.",
        "제품 카드에는 일반적으로 사용되는 구성이 표시됩니다. 전체 사양, 외형 치수도 및 데이터시트는 제품 상세 페이지에서 확인하십시오. 모델을 결정하기 어려운 경우 실제 사용 조건을 제출하면 선정 제안을 받을 수 있습니다.",
      ],
      imageAlt:
        "세척, 폐액 및 시약 이송 유로를 위한 FOREACH 다이어프램 펌프 시리즈",
    },
    ru: {
      title: "Серия мембранных насосов",
      paragraphs: [
        "Мембранные насосы FOREACH выпускаются в исполнениях **для жидкостей, газов и газожидкостных сред** и применяются для перекачивания жидкостей, аспирации газов, циркуляции промывочной жидкости, отвода отработанной жидкости и работы с газожидкостными смесями.",
        "Подбор можно выполнять по следующим параметрам: **перекачиваемая среда, требуемый расход, рабочее давление или степень вакуума, высота самовсасывания, тип двигателя, материалы, контактирующие с рабочей средой, тип присоединения и доступное монтажное пространство**. В линейку мембранных насосов входят **DPL30 с расходом 300 мл/мин и DPL60 с расходом 600 мл/мин**, а также DPGL800 с расходом 6 л/мин; модели можно подбирать для жидкостных трактов оборудования IVD, лабораторных анализаторов и медицинских приборов.",
        "В карточках изделий приведены распространённые конфигурации. Полные характеристики, габаритные чертежи и технические описания доступны на странице изделия. Если выбор модели вызывает затруднения, укажите фактические условия эксплуатации, чтобы получить рекомендацию по подбору.",
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
        "La serie incluye la bomba de pipeteo programable por desplazamiento de aire SMTP2 y la bomba de pipeteo por desplazamiento de aire SMTP4, con configuraciones base de 100 μL, 500 μL y 1000 μL.",
        "Se admiten puntas desechables estándar y adaptadores personalizados, con varias longitudes de adaptador para confirmar la estructura del equipo y el flujo de pipeteo.",
      ],
      imageAlt:
        "Serie de bombas de pipeteo FOREACH para pipeteo automatizado, dispensación y manejo de muestras",
    },
    fr: {
      title: "Série de pompes de pipetage",
      paragraphs: [
        "Les pompes de pipetage FOREACH servent au transfert d'échantillons, à la distribution de réactifs et à la manipulation de micro-volumes dans les instruments automatisés, avec déplacement d'air et embouts jetables pour réduire les résidus et la contamination croisée.",
        "La gamme comprend la pompe de pipetage programmable à déplacement d'air SMTP2 et la pompe de pipetage à déplacement d'air SMTP4, proposées en configurations de base de 100 μL, 500 μL et 1000 μL.",
        "Les embouts jetables courants et les adaptateurs personnalisés sont pris en charge, avec plusieurs longueurs d'adaptateur pour valider la structure de l'instrument et le flux de pipetage.",
      ],
      imageAlt:
        "Série de pompes de pipetage FOREACH pour pipetage automatisé, distribution et traitement d'échantillons",
    },
    ko: {
      title: "피펫팅 펌프 시리즈",
      paragraphs: [
        "FOREACH 피펫팅 펌프는 자동화 장비의 샘플 이송, 시약 분주 및 미량 액체 처리에 사용되며 일회용 팁과 공기 치환 방식을 통해 잔류와 교차 오염 위험을 줄입니다.",
        "SMTP2 프로그래머블 공기 치환식 피펫팅 펌프와 SMTP4 공기 치환식 피펫팅 펌프를 제공하며 100 μL, 500 μL 및 1000 μL 기본 구성을 지원합니다.",
        "일반 일회용 팁과 맞춤형 팁 어댑터를 지원하며 여러 어댑터 길이를 선택해 장비 구조와 피펫팅 공정을 확인할 수 있습니다.",
      ],
      imageAlt:
        "자동 피펫팅, 분주 및 샘플 처리를 위한 FOREACH 피펫팅 펌프 시리즈",
    },
    ru: {
      title: "Серия пипетирующих насосов",
      paragraphs: [
        "Пипетирующие насосы FOREACH применяются для переноса образцов, дозирования реагентов и работы с микролитровыми объемами в автоматизированных приборах, используя воздушное вытеснение и одноразовые наконечники для снижения переноса и перекрестного загрязнения.",
        "Линейка включает программируемый пипетирующий насос SMTP2 с воздушным вытеснением и пипетирующий насос SMTP4 с воздушным вытеснением в базовых конфигурациях 100 μL, 500 μL и 1000 μL.",
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
        "La selección se realiza según el tamaño de la jeringa, la resolución de carrera, el rango de velocidad, el modo de control y el espacio de instalación disponible.",
        "La capacidad, el puerto fluídico, el puerto de lavado y el método de montaje se confirman de acuerdo con los requisitos del proyecto.",
      ],
      imageAlt:
        "Serie de bombas de jeringa FOREACH para inyección de alta precisión, suministro de líquidos y flujo estable",
    },
    fr: {
      title: "Série de pompes seringues",
      paragraphs: [
        "Les pompes seringues FOREACH sont utilisées pour l'injection haute précision, l'alimentation en liquide, le contrôle de gradient et une sortie de débit stable.",
        "La sélection s'effectue selon la taille de la seringue, la résolution de course, la plage de vitesse, le mode de commande et l'espace d'installation disponible.",
        "La capacité, le raccord fluidique, le port de lavage et le mode de montage sont validés selon les exigences du projet.",
      ],
      imageAlt:
        "Série de pompes seringues FOREACH pour injection haute précision, alimentation en liquide et débit stable",
    },
    ko: {
      title: "시린지 펌프 시리즈",
      paragraphs: [
        "FOREACH 시린지 펌프는 고정밀 주입, 액체 공급, 그래디언트 제어 및 안정적인 유량 출력에 사용됩니다.",
        "시린지 규격, 스트로크 분해능, 속도 범위, 제어 방식 및 설치 공간에 따라 제품을 선택할 수 있습니다.",
        "용량, 유체 포트, 세척 포트 및 장착 방식은 프로젝트 요구사항에 따라 확정합니다.",
      ],
      imageAlt:
        "고정밀 주입, 액체 공급 및 안정적인 유량 출력을 위한 FOREACH 시린지 펌프 시리즈",
    },
    ru: {
      title: "Серия шприцевых насосов",
      paragraphs: [
        "Шприцевые насосы FOREACH применяются для высокоточного ввода, подачи жидкости, градиентного управления и стабильного выходного потока.",
        "Подбор выполняется по размеру шприца, разрешению хода, диапазону скорости, способу управления и доступному монтажному пространству.",
        "Рабочий объем, гидравлический порт, промывочный порт и способ монтажа согласовываются с учетом требований проекта.",
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
        "Las bombas sin válvulas FOREACH permiten realizar muestreo, titulación, llenado, dosificación y suministro proporcional en instrumentos analíticos automatizados, reduciendo el uso de electroválvulas externas y la complejidad del circuito fluídico.",
        "La serie cubre plataformas de 12–80 μL/rev, 50–250 μL/rev y 300–1200 μL/rev, con opciones de entrega proporcional de doble cabezal de 1:9 a 1:19.",
        "Todas las bombas sin válvulas se configuran según el proyecto. El desplazamiento, el puerto fluídico, el puerto de lavado y el método de montaje se confirman de acuerdo con la aplicación.",
      ],
      imageAlt:
        "Serie de bombas sin válvulas FOREACH para manipulación precisa de líquidos en instrumentos compactos",
    },
    fr: {
      title: "Série de pompes sans valve",
      paragraphs: [
        "Les pompes sans clapet FOREACH assurent l'échantillonnage, le titrage, le remplissage, le dosage et la distribution proportionnelle dans les instruments d'analyse automatisés, tout en réduisant le recours aux électrovannes externes et la complexité du circuit fluidique.",
        "La gamme couvre les plateformes 12–80 μL/rev, 50–250 μL/rev et 300–1200 μL/rev, avec des options de distribution proportionnelle à double tête de 1:9 à 1:19.",
        "Toutes les pompes sans clapet sont configurées selon le projet. La cylindrée, le raccord fluidique, le port de lavage et le mode de montage sont validés en fonction de l'application.",
      ],
      imageAlt:
        "Série de pompes sans valve FOREACH pour la manipulation précise de liquides dans les instruments compacts",
    },
    ko: {
      title: "밸브리스 펌프 시리즈",
      paragraphs: [
        "FOREACH 밸브리스 펌프는 자동 분석 장비의 샘플링, 적정, 충전, 정량 이송 및 비례 이송을 지원하며 외부 솔레노이드 밸브 사용과 유로 복잡도를 줄입니다.",
        "12–80 μL/rev, 50–250 μL/rev, 300–1200 μL/rev 배출량 플랫폼과 1:9~1:19 듀얼 헤드 비례 이송 옵션을 제공합니다.",
        "모든 밸브리스 펌프는 프로젝트 요구사항에 맞춰 구성됩니다. 배기량, 유체 포트, 세척 포트 및 장착 방식은 적용 조건에 따라 확정합니다.",
      ],
      imageAlt:
        "컴팩트 장비의 정밀 액체 처리를 위한 FOREACH 밸브리스 펌프 시리즈",
    },
    ru: {
      title: "Серия бесклапанных насосов",
      paragraphs: [
        "Бесклапанные насосы FOREACH обеспечивают отбор проб, титрование, наполнение, дозирование и пропорциональную подачу в автоматизированных аналитических приборах, уменьшая потребность во внешних электромагнитных клапанах и упрощая гидравлический тракт.",
        "Линейка охватывает платформы 12–80 μL/rev, 50–250 μL/rev и 300–1200 μL/rev, а также варианты двухголовочной пропорциональной подачи от 1:9 до 1:19.",
        "Все бесклапанные насосы конфигурируются под требования проекта. Рабочий объем, гидравлический порт, промывочный порт и способ монтажа согласовываются с учетом условий применения.",
      ],
      imageAlt:
        "Серия бесклапанных насосов FOREACH для точной работы с жидкостями в компактных приборах",
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
        "Las bombas de alta presión FOREACH se utilizan en circuitos fluídicos de instrumentos analíticos que requieren presión estable, resistencia a la presión y suministro continuo.",
        "La serie está diseñada para plataformas que necesitan una salida de presión estable, control preciso del caudal y suministro fiable de líquidos.",
        "La configuración se define según el rango de presión, los requisitos de caudal, la compatibilidad de materiales y la interfaz del sistema.",
      ],
      imageAlt:
        "Serie de bombas de alta presión FOREACH para suministro estable en circuitos fluídicos de instrumentos analíticos",
    },
    fr: {
      title: "Série de pompes haute pression",
      paragraphs: [
        "Les pompes haute pression FOREACH sont destinées aux circuits fluidiques d'instruments d'analyse nécessitant une pression stable, une bonne tenue en pression et une alimentation continue.",
        "La série répond aux plateformes qui exigent une pression de sortie stable, un contrôle précis du débit et une alimentation en liquide fiable.",
        "La configuration est définie selon la plage de pression, le débit requis, la compatibilité des matériaux et l'interface du système.",
      ],
      imageAlt:
        "Série de pompes haute pression FOREACH pour une alimentation stable dans les circuits fluidiques d'instruments d'analyse",
    },
    ko: {
      title: "고압 펌프 시리즈",
      paragraphs: [
        "FOREACH 고압 펌프는 안정적인 압력, 내압 성능 및 연속 이송이 필요한 분석 장비 유로에 사용됩니다.",
        "안정적인 압력 출력, 정밀 유량 제어 및 신뢰성 높은 액체 이송이 필요한 장비 플랫폼에 적합합니다.",
        "압력 범위, 요구 유량, 재질 호환성 및 시스템 인터페이스에 따라 구성을 확정합니다.",
      ],
      imageAlt:
        "분석 장비 유로에서 안정적인 고압 이송을 제공하는 FOREACH 고압 펌프 시리즈",
    },
    ru: {
      title: "Серия насосов высокого давления",
      paragraphs: [
        "Насосы высокого давления FOREACH применяются в гидравлических трактах аналитических приборов, где требуются стабильное давление, стойкость к давлению и непрерывная подача.",
        "Серия предназначена для платформ, которым необходимы стабильное выходное давление, точное регулирование расхода и надежная подача жидкости.",
        "Конфигурация определяется по диапазону давления, требуемому расходу, совместимости материалов и системному интерфейсу.",
      ],
      imageAlt:
        "Серия насосов высокого давления FOREACH для стабильной подачи в гидравлических трактах аналитических приборов",
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
