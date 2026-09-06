import { getPistonPumpIntroCopy } from "./piston-pump-series-copy";
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
import { getDiaphragmPumpPath } from "../detail/diaphragm-pump-routes";

function getApplicationPath(locale: SelectionLocale, slug: string) {
  return locale === "zh" ? `/applications/${slug}/` : `/${locale}/applications/${slug}/`;
}

function getTechnicalArticlePath(locale: SelectionLocale, slug: string) {
  const path = `/resources/technical-articles/${slug}/`;
  return locale === "zh" ? path : `/${locale}${path}`;
}

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
    ...getPistonPumpIntroCopy("category", "zh"),
    image: {
      src: "/images/products/pumps/product-types/plunger-pumps/foreach-plunger-pumps-product-type-intro.webp",
      alt: getPistonPumpIntroCopy("category", "zh").imageAlt,
    },
  },

  "pumps:diaphragm-pump": {
    title: "微型隔膜泵",
    paragraphs: [
      "FOREACH微型隔膜泵是用于液体输送、清洗、循环、废液抽吸、真空建立及其他流体处理功能的紧凑型OEM泵，适用于IVD分析仪、实验室仪器、医疗设备和自动化流体系统。产品范围包括面向不同介质与工况的微型液体隔膜泵和微型气液混合隔膜泵。",
      "微型隔膜泵也常根据应用被称为微型液泵。液泵选型应考虑工作流量、压力、自吸条件、管路阻力、接液材质兼容性和电机寿命；当空气可能随液体一起或间歇进入管路时，应选择气液混合隔膜泵，并评估真空度、抽空时间和系统容积。",
      `对于纯液体输送、清洗、试剂输送或循环，请选择[微型液体隔膜泵](${getDiaphragmPumpPath("zh", "liquid-diaphragm-pumps")})；对于废液抽吸、管路抽空或空气与液体可能同时进入的工况，请选择[微型气液混合隔膜泵](${getDiaphragmPumpPath("zh", "gas-liquid-diaphragm-pumps")})。`,
    ],
    image: {
      src: "/images/products/pumps/diaphragm-pumps/series/images/dpl-diaphragm-pump-series-main.webp",
      alt: "FOREACH 微型隔膜泵系列产品图，用于清洗、废液和试剂输送液路",
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
  "pumps:diaphragm-pump": {
    en: {
      title: "Miniature Diaphragm Pumps",
      paragraphs: [
        "FOREACH miniature diaphragm pumps are compact OEM pumps for liquid transfer, washing, circulation, waste aspiration, vacuum generation, and other fluid-handling functions in IVD analyzers, laboratory instruments, medical equipment, and automated fluidic systems. The range includes miniature liquid diaphragm pumps and miniature gas-liquid diaphragm pumps for different media and operating conditions.",
        "Miniature diaphragm pumps are also commonly searched as micro diaphragm pumps or micro liquid pumps, depending on the application. Liquid-pump selection should consider working flow, pressure, self-priming conditions, tubing resistance, wetted-material compatibility, and motor life. For systems where air may enter the tubing together with liquid, use a gas-liquid diaphragm pump and evaluate vacuum level, evacuation time, and system volume.",
        `For liquid-only transfer, washing, reagent delivery, or circulation, select the [Miniature Liquid Diaphragm Pump](${getDiaphragmPumpPath("en", "liquid-diaphragm-pumps")}) range. For waste aspiration, tubing evacuation, or applications where air and liquid may enter together, select the [Miniature Gas-Liquid Diaphragm Pump](${getDiaphragmPumpPath("en", "gas-liquid-diaphragm-pumps")}) range.`,
      ],
      imageAlt:
        "FOREACH miniature diaphragm pump series for wash, waste, and reagent transfer fluidic paths",
    },
    es: {
      title: "Bombas de diafragma en miniatura",
      paragraphs: [
        "Las bombas de diafragma en miniatura FOREACH son bombas OEM compactas para transferencia de líquidos, lavado, circulación, aspiración de residuos, generación de vacío y otras funciones de manejo de fluidos en analizadores IVD, instrumentos de laboratorio, equipos médicos y sistemas fluídicos automatizados. La gama incluye bombas miniatura de diafragma para líquidos y bombas miniatura de diafragma gas-líquido para diferentes medios y condiciones de trabajo.",
        "Según la aplicación, estas bombas también se buscan como microbombas de diafragma o microbombas para líquidos. Para seleccionar una bomba de líquido se deben considerar el caudal de trabajo, la presión, el autocebado, la resistencia de los tubos, la compatibilidad de los materiales en contacto con el fluido y la vida útil del motor. Si puede entrar aire junto con el líquido, utilice una bomba gas-líquido y evalúe el nivel de vacío, el tiempo de evacuación y el volumen del sistema.",
        `Para transferencia de líquido sin aire, lavado, suministro de reactivos o circulación, seleccione la gama de [bombas miniatura de diafragma para líquidos](${getDiaphragmPumpPath("es", "liquid-diaphragm-pumps")}). Para aspiración de residuos, evacuación de tuberías o aplicaciones en las que puedan entrar aire y líquido, seleccione la gama de [bombas miniatura de diafragma gas-líquido](${getDiaphragmPumpPath("es", "gas-liquid-diaphragm-pumps")}).`,
      ],
      imageAlt:
        "Serie de bombas de diafragma en miniatura FOREACH para circuitos de lavado, residuos y transferencia de reactivos",
    },
    fr: {
      title: "Pompes à membrane miniatures",
      paragraphs: [
        "Les pompes à membrane miniatures FOREACH sont des pompes OEM compactes destinées au transfert de liquides, au lavage, à la circulation, à l’aspiration des effluents, à la génération de vide et à d’autres fonctions de gestion des fluides dans les analyseurs IVD, les instruments de laboratoire, les équipements médicaux et les systèmes fluidiques automatisés. La gamme comprend des pompes à membrane miniatures pour liquides et des pompes à membrane miniatures gaz-liquide adaptées à différents fluides et régimes de fonctionnement.",
        "Selon l’application, elles sont également recherchées comme micropompes à membrane ou micropompes pour liquides. Le choix d’une pompe pour liquides doit tenir compte du débit de travail, de la pression, des conditions d’auto-amorçage, de la résistance des tuyaux, de la compatibilité des matériaux en contact avec le fluide et de la durée de vie du moteur. Si de l’air peut entrer avec le liquide, utilisez une pompe gaz-liquide et évaluez le niveau de vide, le temps d’évacuation et le volume du système.",
        `Pour le transfert de liquide seul, le lavage, l’alimentation en réactifs ou la circulation, choisissez la gamme de [pompes à membrane miniatures pour liquides](${getDiaphragmPumpPath("fr", "liquid-diaphragm-pumps")}). Pour l’aspiration des effluents, l’évacuation des conduites ou les applications où l’air et le liquide peuvent entrer ensemble, choisissez la gamme de [pompes à membrane miniatures gaz-liquide](${getDiaphragmPumpPath("fr", "gas-liquid-diaphragm-pumps")}).`,
      ],
      imageAlt:
        "Série de pompes à membrane miniatures FOREACH pour les circuits de lavage, déchets et transfert de réactifs",
    },
    ko: {
      title: "소형 다이어프램 펌프",
      paragraphs: [
        "FOREACH 소형 다이어프램 펌프는 IVD 분석기, 실험실 장비, 의료 장비 및 자동화 유체 시스템에서 액체 이송, 세척, 순환, 폐액 흡인, 진공 형성 등 유체 처리 기능을 수행하는 소형 OEM 펌프입니다. 제품군은 서로 다른 유체와 운전 조건에 맞춘 소형 액체 다이어프램 펌프와 소형 기액 혼합 다이어프램 펌프로 구성됩니다.",
        "용도에 따라 마이크로 다이어프램 펌프 또는 마이크로 액체 펌프로도 검색됩니다. 액체 펌프는 작동 유량, 압력, 자흡 조건, 튜빙 저항, 접액부 재질 호환성 및 모터 수명을 고려해 선정해야 합니다. 액체와 함께 공기가 유입될 수 있는 시스템에는 기액 혼합 펌프를 사용하고 진공도, 배기 시간 및 시스템 용적을 평가하십시오.",
        `액체 전용 이송, 세척, 시약 공급 또는 순환에는 [소형 액체 다이어프램 펌프](${getDiaphragmPumpPath("ko", "liquid-diaphragm-pumps")}) 제품군을 선택하십시오. 폐액 흡인, 배관 배기 또는 공기와 액체가 함께 유입될 수 있는 용도에는 [소형 기액 혼합 다이어프램 펌프](${getDiaphragmPumpPath("ko", "gas-liquid-diaphragm-pumps")}) 제품군을 선택하십시오.`,
      ],
      imageAlt:
        "세척, 폐액 및 시약 이송 유로를 위한 FOREACH 소형 다이어프램 펌프 시리즈",
    },
    ru: {
      title: "Миниатюрные мембранные насосы",
      paragraphs: [
        "Миниатюрные мембранные насосы FOREACH — это компактные OEM-насосы для перекачивания жидкостей, промывки, циркуляции, аспирации отходов, создания вакуума и других задач в анализаторах IVD, лабораторных приборах, медицинском оборудовании и автоматизированных гидравлических системах. Линейка включает миниатюрные жидкостные и газожидкостные мембранные насосы для разных сред и условий работы.",
        "В зависимости от применения такие изделия также ищут как микромембранные насосы или микронасосы для жидкостей. При выборе жидкостного насоса учитывайте рабочий расход, давление, условия самовсасывания, сопротивление трубок, совместимость контактирующих материалов и ресурс двигателя. Если вместе с жидкостью в трубку может попадать воздух, используйте газожидкостный насос и оценивайте вакуум, время откачки и объём системы.",
        `Для перекачивания только жидкости, промывки, подачи реагентов или циркуляции выберите [миниатюрные жидкостные мембранные насосы](${getDiaphragmPumpPath("ru", "liquid-diaphragm-pumps")}). Для аспирации отходов, откачки трубопроводов или процессов с одновременным поступлением воздуха и жидкости выберите [миниатюрные газожидкостные мембранные насосы](${getDiaphragmPumpPath("ru", "gas-liquid-diaphragm-pumps")}).`,
      ],
      imageAlt:
        "Серия миниатюрных мембранных насосов FOREACH для промывки, отвода отходов и переноса реагентов",
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

const diaphragmPumpCategoryIntroMap: Record<
  "liquid" | "gas-liquid",
  Partial<Record<SelectionLocale, ProductTypeIntroContent>>
> = {
  liquid: {
    zh: {
      title: "适用于 600 mL/min 及以下流量的微型液体隔膜泵",
      paragraphs: [
        `FOREACH微型液体隔膜泵（也称微型隔膜液泵）用于紧凑液路中的液体输送、清洗和循环。工作流量需求约为[0–100、100–200和200–300 mL/min](filter:filter03=300%20mL%2Fmin)时，可将DPL30系列作为300 mL/min级候选；约为[300–400、400–500和500–600 mL/min](filter:filter03=600%20mL%2Fmin)时，可考虑DPL60系列作为600 mL/min级候选。`,
        `按所需出口压力选择：[0–100 kPa](filter:filter04=100%20kPa)时，根据所需工作流量选择DPL30或DPL60；[超过100 kPa、最高600 kPa](filter:filter04=600%20kPa)时，评估DPL30H。以上流量为自由流量，实际工作点取决于泵曲线和系统阻力，并会随背压、吸入条件、管路阻力和流体性质变化。`,
        `在[IVD体外诊断](${getApplicationPath("zh", "ivd")})及其他自动化仪器中，这类泵也会按功能称为清洗泵、洗液泵、冲洗泵或液体输送泵；具体术语、流量与压力选型可参考[IVD Cleaning、Wash 与 Rinse Pump 技术指南](${getTechnicalArticlePath("zh", "ivd-cleaning-wash-rinse-pump-diaphragm-pump")})。在喷墨系统中，常见功能名称还包括墨水循环泵、供墨泵和回墨泵；三者的系统功能与隔膜泵候选边界见[Ink Circulation、Supply 与 Return Pump 技术指南](${getTechnicalArticlePath("zh", "ink-circulation-supply-return-pump-diaphragm-pump")})。`,
      ],
      image: {
        src: "/images/resources/technical-articles/dpl60-liquid-diaphragm-pump/dpl60-article-cover.webp",
        alt: "FOREACH DPL30、DPL60和DPL30H微型液体隔膜泵",
      },
    },
    en: {
      title: "Miniature Liquid Diaphragm Pumps for Flow Rates up to 600 mL/min",
      paragraphs: [
        `FOREACH miniature liquid diaphragm pumps, also referred to as micro liquid diaphragm pumps, are used for compact liquid transfer, washing, and circulation. For working-flow requirements of approximately [0–100, 100–200, and 200–300 mL/min](filter:filter03=300%20mL%2Fmin), the DPL30 series can be evaluated as a 300 mL/min-class option. For approximately [300–400, 400–500, and 500–600 mL/min](filter:filter03=600%20mL%2Fmin), consider the DPL60 series as a 600 mL/min-class option.`,
        `Select by required outlet pressure: for [0–100 kPa](filter:filter04=100%20kPa), choose DPL30 or DPL60 according to the required working flow. For pressures [above 100 kPa and up to 600 kPa](filter:filter04=600%20kPa), evaluate DPL30H. The flow values above are free-flow values; the actual operating point depends on the pump curve and system resistance and varies with backpressure, suction conditions, tubing resistance, and fluid properties.`,
        `In [IVD diagnostics](${getApplicationPath("en", "ivd")}) and other automated instruments, these pumps may also be searched by function as a cleaning pump, wash pump, rinse pump, or liquid-transfer pump. See the [IVD cleaning, wash and rinse pump selection guide](${getTechnicalArticlePath("en", "ivd-cleaning-wash-rinse-pump-diaphragm-pump")}) for terminology, flow and pressure selection. In inkjet systems, common functional names include ink circulation pump, ink supply pump, and ink return pump; see the [Ink Circulation, Supply and Return Pump guide](${getTechnicalArticlePath("en", "ink-circulation-supply-return-pump-diaphragm-pump")}) for their system roles and diaphragm-pump candidate boundaries.`,
      ],
      image: {
        src: "/images/resources/technical-articles/dpl60-liquid-diaphragm-pump/dpl60-article-cover.webp",
        alt: "FOREACH DPL30, DPL60 and DPL30H miniature liquid diaphragm pumps",
      },
    },
    es: {
      title: "Bombas miniatura de diafragma para líquidos con caudales de hasta 600 mL/min",
      paragraphs: [
        `Las bombas miniatura de diafragma para líquidos FOREACH, también denominadas microbombas de diafragma para líquidos, se utilizan para transferencia, lavado y circulación compactos. Para caudales de trabajo aproximados de [0–100, 100–200 y 200–300 mL/min](filter:filter03=300%20mL%2Fmin), la serie DPL30 puede evaluarse como opción de la clase de 300 mL/min. Para aproximadamente [300–400, 400–500 y 500–600 mL/min](filter:filter03=600%20mL%2Fmin), considere la serie DPL60 como opción de la clase de 600 mL/min.`,
        `Seleccione según la presión de salida requerida: para [0–100 kPa](filter:filter04=100%20kPa), elija DPL30 o DPL60 según el caudal de trabajo necesario. Para presiones [superiores a 100 kPa y de hasta 600 kPa](filter:filter04=600%20kPa), evalúe DPL30H. Los valores de caudal anteriores corresponden al caudal libre; el punto de funcionamiento real depende de la curva de la bomba y de la resistencia del sistema, y varía con la contrapresión, las condiciones de aspiración, la resistencia de los tubos y las propiedades del fluido.`,
        `En el [diagnóstico IVD](${getApplicationPath("es", "ivd")}) y otros instrumentos automatizados, estas bombas también se buscan por su función como bomba de limpieza, bomba de lavado, bomba de enjuague o bomba de transferencia de líquidos. Consulte la [guía de selección de bombas de limpieza, lavado y enjuague IVD](${getTechnicalArticlePath("es", "ivd-cleaning-wash-rinse-pump-diaphragm-pump")}) para distinguir términos, caudal y presión. En sistemas inkjet son habituales los términos bomba de circulación de tinta, bomba de suministro de tinta y bomba de retorno de tinta.`,
      ],
      image: {
        src: "/images/resources/technical-articles/dpl60-liquid-diaphragm-pump/dpl60-article-cover.webp",
        alt: "Bombas miniatura de diafragma para líquidos FOREACH DPL30, DPL60 y DPL30H",
      },
    },
    fr: {
      title: "Pompes à membrane miniatures pour liquides jusqu’à 600 mL/min",
      paragraphs: [
        `Les pompes à membrane miniatures pour liquides FOREACH, également appelées micropompes à membrane pour liquides, sont destinées au transfert, au lavage et à la circulation dans des circuits compacts. Pour un débit de travail d’environ [0–100, 100–200 ou 200–300 mL/min](filter:filter03=300%20mL%2Fmin), la série DPL30 peut être évaluée comme option de classe 300 mL/min. Pour environ [300–400, 400–500 ou 500–600 mL/min](filter:filter03=600%20mL%2Fmin), envisagez la série DPL60 comme option de classe 600 mL/min.`,
        `Sélectionnez selon la pression de sortie requise : [de 0 à 100 kPa](filter:filter04=100%20kPa), choisissez DPL30 ou DPL60 selon le débit de travail nécessaire. Pour une pression [supérieure à 100 kPa et jusqu’à 600 kPa](filter:filter04=600%20kPa), évaluez DPL30H. Les valeurs de débit ci-dessus correspondent au débit libre ; le point de fonctionnement réel dépend de la courbe de la pompe et de la résistance du système, et varie avec la contre-pression, les conditions d’aspiration, la résistance des tuyaux et les propriétés du fluide.`,
        `Dans le [diagnostic IVD](${getApplicationPath("fr", "ivd")}) et d’autres instruments automatisés, ces pompes sont aussi recherchées par fonction comme pompe de nettoyage, pompe de lavage, pompe de rinçage ou pompe de transfert de liquide. Consultez le [guide de sélection des pompes de nettoyage, lavage et rinçage IVD](${getTechnicalArticlePath("fr", "ivd-cleaning-wash-rinse-pump-diaphragm-pump")}) pour distinguer les termes, le débit et la pression. Dans les systèmes jet d’encre, les termes courants sont pompe de circulation d’encre, pompe d’alimentation en encre et pompe de retour d’encre.`,
      ],
      image: {
        src: "/images/resources/technical-articles/dpl60-liquid-diaphragm-pump/dpl60-article-cover.webp",
        alt: "Pompes à membrane miniatures pour liquides FOREACH DPL30, DPL60 et DPL30H",
      },
    },
    ko: {
      title: "600 mL/min 이하 유량용 소형 액체 다이어프램 펌프",
      paragraphs: [
        `FOREACH 소형 액체 다이어프램 펌프는 마이크로 액체 다이어프램 펌프라고도 하며 소형 액체 이송, 세척 및 순환에 사용됩니다. 약 [0–100, 100–200 및 200–300 mL/min](filter:filter03=300%20mL%2Fmin)의 작동 유량에는 DPL30 시리즈를 300 mL/min급 후보로 평가할 수 있습니다. 약 [300–400, 400–500 및 500–600 mL/min](filter:filter03=600%20mL%2Fmin)에는 DPL60 시리즈를 600 mL/min급 후보로 고려하십시오.`,
        `필요한 토출 압력에 따라 선택하십시오. [0–100 kPa](filter:filter04=100%20kPa)에서는 필요한 작동 유량에 따라 DPL30 또는 DPL60을 선택합니다. [100 kPa 초과 600 kPa 이하](filter:filter04=600%20kPa)에서는 DPL30H를 평가하십시오. 위 유량 값은 자유 유량이며, 실제 작동점은 펌프 곡선과 시스템 저항에 따라 결정되고 배압, 흡입 조건, 튜빙 저항 및 유체 특성에 따라 달라집니다.`,
        `[IVD 체외진단](${getApplicationPath("ko", "ivd")}) 및 기타 자동화 장비에서는 기능에 따라 세정 펌프, 세척 펌프, 린스 펌프 또는 액체 이송 펌프로도 검색됩니다. 용어와 유량·압력 선정을 구분하려면 [IVD cleaning, wash, rinse 펌프 선정 가이드](${getTechnicalArticlePath("ko", "ivd-cleaning-wash-rinse-pump-diaphragm-pump")})를 확인하십시오. 잉크젯 시스템에서는 잉크 순환 펌프, 잉크 공급 펌프 및 잉크 리턴 펌프라는 명칭이 일반적입니다.`,
      ],
      image: {
        src: "/images/resources/technical-articles/dpl60-liquid-diaphragm-pump/dpl60-article-cover.webp",
        alt: "FOREACH DPL30, DPL60 및 DPL30H 소형 액체 다이어프램 펌프",
      },
    },
    ru: {
      title: "Миниатюрные жидкостные мембранные насосы для расхода до 600 mL/min",
      paragraphs: [
        `Миниатюрные жидкостные мембранные насосы FOREACH, также называемые микромембранными насосами для жидкостей, применяются для компактных систем перекачивания, промывки и циркуляции. При требуемом рабочем расходе около [0–100, 100–200 или 200–300 mL/min](filter:filter03=300%20mL%2Fmin) серию DPL30 можно оценивать как вариант класса 300 mL/min. Для диапазонов около [300–400, 400–500 или 500–600 mL/min](filter:filter03=600%20mL%2Fmin) рассмотрите серию DPL60 как вариант класса 600 mL/min.`,
        `Выбирайте насос по требуемому давлению на выходе: при [0–100 kPa](filter:filter04=100%20kPa) выбирайте DPL30 или DPL60 в соответствии с требуемым рабочим расходом. При давлении [свыше 100 kPa и до 600 kPa](filter:filter04=600%20kPa) оцените DPL30H. Приведенные выше значения расхода являются значениями свободного расхода; фактическая рабочая точка зависит от характеристики насоса и сопротивления системы и изменяется в зависимости от противодавления, условий всасывания, сопротивления трубок и свойств жидкости.`,
        `В системах [IVD-диагностики](${getApplicationPath("ru", "ivd")}) и других автоматизированных приборах такие изделия также ищут по функции как насос очистки, промывочный насос, насос ополаскивания или насос перекачивания жидкости. Различия терминов, расхода и давления приведены в [руководстве по выбору насосов очистки, промывки и ополаскивания IVD](${getTechnicalArticlePath("ru", "ivd-cleaning-wash-rinse-pump-diaphragm-pump")}). В струйных системах употребляются названия «насос циркуляции чернил», «насос подачи чернил» и «насос возврата чернил».`,
      ],
      image: {
        src: "/images/resources/technical-articles/dpl60-liquid-diaphragm-pump/dpl60-article-cover.webp",
        alt: "Миниатюрные жидкостные мембранные насосы FOREACH DPL30, DPL60 и DPL30H",
      },
    },
  },
  "gas-liquid": {
    zh: {
      title: "用于废液抽吸和真空处理的微型气液混合隔膜泵",
      paragraphs: [
        `FOREACH微型气液混合隔膜泵专为管路中空气与液体同时或间歇进入的流体系统设计。与常规纯液体泵不同，[DPGL800系列](${getDiaphragmPumpPath("zh", "dpgl800-gas-liquid-diaphragm-pump")})可在介质于气体和气液混合状态之间变化时继续抽吸，适用于废液抽吸、管路抽空和真空建立。`,
        "DPGL800每个泵头的空载气体流量为6 L/min，最大正压约30 kPa，极限真空小于−90 kPa。选型应根据所需真空度、抽空时间、系统容积、管路阻力和实际气液状态进行，不能把6 L/min当作液体流量额定值。",
        `在[IVD体外诊断](${getApplicationPath("zh", "ivd")})和实验室仪器中，这类泵也常按功能称为废液泵、废液抽吸泵、真空抽吸泵或排液泵。在打印及其他混合介质流体系统中，类似气液混合隔膜泵还可用于墨水回收或废墨抽吸，具体取决于实际液路、工况和介质兼容性。`,
        `若要先判断连续液体转移还是会吸入空气的气液混合抽吸，请查看[IVD 废液泵液体与气液混合选型指南](${getTechnicalArticlePath("zh", "ivd-waste-liquid-pump-liquid-vs-gas-liquid-diaphragm-pump")})。`,
      ],
      image: {
        src: "/images/resources/technical-articles/dpgl800-gas-liquid-diaphragm-pump/dpgl800-article-cover.webp",
        alt: "FOREACH DPGL800微型气液混合隔膜泵",
      },
    },
    en: {
      title: "Miniature Gas-Liquid Diaphragm Pumps for Waste Aspiration and Vacuum Handling",
      paragraphs: [
        `FOREACH miniature gas-liquid diaphragm pumps are designed for fluidic systems where air and liquid may enter the tubing together or intermittently. Unlike conventional liquid-only pumps, the [DPGL800 series](${getDiaphragmPumpPath("en", "dpgl800-gas-liquid-diaphragm-pump")}) can continue aspirating when the medium changes between gas and gas-liquid conditions, making it suitable for waste-fluid suction, tubing evacuation, and vacuum-generation duties.`,
        "The DPGL800 delivers a no-load gas flow of 6 L/min per head, maximum positive pressure of approximately 30 kPa, and ultimate vacuum below −90 kPa. Select according to the required vacuum level, evacuation time, system volume, line resistance, and actual gas-liquid condition; do not treat 6 L/min as a liquid-flow rating.",
        `In [IVD diagnostics](${getApplicationPath("en", "ivd")}) and laboratory instruments, this type of pump may also be described by its function as a waste liquid pump, waste aspiration pump, vacuum aspiration pump, or drainage pump. In printing and other mixed-media fluid systems, similar gas-liquid diaphragm pumps may also be used for ink recovery or waste-ink suction, depending on the actual circuit, operating conditions, and media compatibility.`,
        `To decide between continuous liquid transfer and aspiration that ingests air, see the [IVD waste liquid versus gas-liquid pump selection guide](${getTechnicalArticlePath("en", "ivd-waste-liquid-pump-liquid-vs-gas-liquid-diaphragm-pump")}).`,
      ],
      image: {
        src: "/images/resources/technical-articles/dpgl800-gas-liquid-diaphragm-pump/dpgl800-article-cover.webp",
        alt: "FOREACH DPGL800 miniature gas-liquid diaphragm pump",
      },
    },
    es: {
      title: "Bombas miniatura de diafragma gas-líquido para aspiración de residuos y manejo de vacío",
      paragraphs: [
        `Las bombas miniatura de diafragma gas-líquido FOREACH están diseñadas para sistemas fluídicos en los que pueden entrar aire y líquido juntos o de forma intermitente. A diferencia de las bombas convencionales para líquido puro, la [serie DPGL800](${getDiaphragmPumpPath("es", "dpgl800-gas-liquid-diaphragm-pump")}) puede seguir aspirando cuando el medio cambia entre gas y mezcla gas-líquido, por lo que resulta adecuada para aspiración de fluidos residuales, evacuación de tuberías y generación de vacío.`,
        "La DPGL800 ofrece un caudal de gas sin carga de 6 L/min por cabezal, una presión positiva máxima de aproximadamente 30 kPa y un vacío límite inferior a −90 kPa. Seleccione según el nivel de vacío requerido, el tiempo de evacuación, el volumen del sistema, la resistencia de las líneas y el estado gas-líquido real; no interprete 6 L/min como caudal de líquido.",
        `En el [diagnóstico IVD](${getApplicationPath("es", "ivd")}) y los instrumentos de laboratorio, esta bomba también puede denominarse por su función bomba de líquido residual, bomba de aspiración de residuos, bomba de aspiración por vacío o bomba de drenaje. En impresión y otros sistemas con medios mixtos, bombas similares pueden utilizarse para recuperación de tinta o aspiración de tinta residual, según el circuito, las condiciones de trabajo y la compatibilidad del medio.`,
        `Para distinguir la transferencia continua de líquido de la aspiración con entrada de aire, consulte la [guía de selección de bombas de residuos IVD para líquido o gas-líquido](${getTechnicalArticlePath("es", "ivd-waste-liquid-pump-liquid-vs-gas-liquid-diaphragm-pump")}).`,
      ],
      image: {
        src: "/images/resources/technical-articles/dpgl800-gas-liquid-diaphragm-pump/dpgl800-article-cover.webp",
        alt: "Bomba de diafragma en miniatura gas-líquido FOREACH DPGL800",
      },
    },
    fr: {
      title: "Pompes à membrane miniatures gaz-liquide pour l’aspiration des effluents et la gestion du vide",
      paragraphs: [
        `Les pompes à membrane miniatures gaz-liquide FOREACH sont conçues pour les systèmes fluidiques dans lesquels l’air et le liquide peuvent entrer ensemble ou par intermittence. Contrairement aux pompes classiques réservées aux liquides, la [série DPGL800](${getDiaphragmPumpPath("fr", "dpgl800-gas-liquid-diaphragm-pump")}) peut poursuivre l’aspiration lorsque le fluide alterne entre gaz et mélange gaz-liquide ; elle convient donc à l’aspiration des effluents, à l’évacuation des conduites et à la génération de vide.`,
        "La DPGL800 fournit un débit de gaz sans charge de 6 L/min par tête, une pression positive maximale d’environ 30 kPa et un vide limite inférieur à −90 kPa. Sélectionnez selon le niveau de vide requis, le temps d’évacuation, le volume du système, la résistance des conduites et l’état gaz-liquide réel ; ne considérez pas 6 L/min comme un débit de liquide.",
        `Dans le [diagnostic IVD](${getApplicationPath("fr", "ivd")}) et les instruments de laboratoire, ce type de pompe est aussi désigné par sa fonction : pompe d’effluents, pompe d’aspiration des déchets, pompe d’aspiration sous vide ou pompe de vidange. Dans l’impression et d’autres systèmes à fluides mixtes, des pompes comparables peuvent servir à la récupération d’encre ou à l’aspiration des encres usagées, selon le circuit, les conditions de fonctionnement et la compatibilité du fluide.`,
        `Pour distinguer le transfert liquide continu de l’aspiration avec entrée d’air, consultez le [guide de sélection d’une pompe d’effluents IVD liquide ou gaz-liquide](${getTechnicalArticlePath("fr", "ivd-waste-liquid-pump-liquid-vs-gas-liquid-diaphragm-pump")}).`,
      ],
      image: {
        src: "/images/resources/technical-articles/dpgl800-gas-liquid-diaphragm-pump/dpgl800-article-cover.webp",
        alt: "Pompe à membrane miniature gaz-liquide FOREACH DPGL800",
      },
    },
    ko: {
      title: "폐액 흡인 및 진공 처리를 위한 소형 기액 혼합 다이어프램 펌프",
      paragraphs: [
        `FOREACH 소형 기액 혼합 다이어프램 펌프는 공기와 액체가 배관에 함께 또는 간헐적으로 유입되는 유체 시스템용으로 설계되었습니다. 일반적인 액체 전용 펌프와 달리 [DPGL800 시리즈](${getDiaphragmPumpPath("ko", "dpgl800-gas-liquid-diaphragm-pump")})는 유체 상태가 가스와 기액 혼합 사이에서 바뀌어도 흡인을 계속할 수 있어 폐액 흡입, 배관 배기 및 진공 형성에 적합합니다.`,
        "DPGL800의 각 헤드당 무부하 가스 유량은 6 L/min이고 최대 양압은 약 30 kPa이며 도달 진공도는 −90 kPa 미만입니다. 필요한 진공도, 배기 시간, 시스템 용적, 배관 저항 및 실제 기액 상태를 기준으로 선정하고, 6 L/min을 액체 유량 정격으로 해석하지 마십시오.",
        `[IVD 체외진단](${getApplicationPath("ko", "ivd")}) 및 실험실 장비에서는 기능에 따라 폐액 펌프, 폐액 흡인 펌프, 진공 흡인 펌프 또는 배수 펌프로도 부릅니다. 인쇄 및 기타 혼합 유체 시스템에서는 실제 회로, 운전 조건 및 유체 호환성에 따라 잉크 회수나 폐잉크 흡인에도 유사한 기액 혼합 다이어프램 펌프를 사용할 수 있습니다.`,
        `연속 액체 이송과 공기 유입 흡인을 구분하려면 [IVD 폐액용 액체 또는 기액 혼합 펌프 선정 가이드](${getTechnicalArticlePath("ko", "ivd-waste-liquid-pump-liquid-vs-gas-liquid-diaphragm-pump")})를 참조하십시오.`,
      ],
      image: {
        src: "/images/resources/technical-articles/dpgl800-gas-liquid-diaphragm-pump/dpgl800-article-cover.webp",
        alt: "FOREACH DPGL800 소형 기액 혼합 다이어프램 펌프",
      },
    },
    ru: {
      title: "Миниатюрные газожидкостные мембранные насосы для аспирации отходов и вакуумирования",
      paragraphs: [
        `Миниатюрные газожидкостные мембранные насосы FOREACH предназначены для систем, в которых воздух и жидкость могут одновременно или периодически поступать в трубку. В отличие от обычных насосов только для жидкости, [серия DPGL800](${getDiaphragmPumpPath("ru", "dpgl800-gas-liquid-diaphragm-pump")}) продолжает всасывание при переходе среды между газовым и газожидкостным состояниями и подходит для аспирации отходов, откачки трубопроводов и создания вакуума.`,
        "DPGL800 обеспечивает расход газа без нагрузки 6 L/min на каждую головку, максимальное положительное давление около 30 kPa и предельное разрежение ниже −90 kPa. Выбирайте насос с учетом требуемого вакуума, времени откачки, объёма системы, сопротивления линий и фактического газожидкостного состояния; не считайте 6 L/min расходом жидкости.",
        `В системах [IVD-диагностики](${getApplicationPath("ru", "ivd")}) и лабораторных приборах такой насос также называют по функции насосом для отработанной жидкости, насосом аспирации отходов, вакуумным аспирационным или дренажным насосом. В печатных и других системах со смешанными средами аналогичные насосы могут применяться для возврата чернил или аспирации отработанных чернил в зависимости от схемы, условий работы и совместимости среды.`,
        `Чтобы отличить непрерывный перенос жидкости от аспирации с поступлением воздуха, см. [руководство по выбору жидкостного или газожидкостного насоса отходов IVD](${getTechnicalArticlePath("ru", "ivd-waste-liquid-pump-liquid-vs-gas-liquid-diaphragm-pump")}).`,
      ],
      image: {
        src: "/images/resources/technical-articles/dpgl800-gas-liquid-diaphragm-pump/dpgl800-article-cover.webp",
        alt: "Миниатюрный газожидкостный мембранный насос FOREACH DPGL800",
      },
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

  if (key === "pumps:plunger-pump") {
    const copy = getPistonPumpIntroCopy("category", activeLocale);
    return { ...baseIntro, ...copy, image: { ...baseIntro.image, alt: copy.imageAlt } };
  }

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

export function getPlungerPumpCategoryIntro(
  seriesValue: unknown,
  locale: SelectionLocale = "zh"
) {
  const activeLocale = getRuntimeLocale(locale);
  const value = String(seriesValue || "");
  const series = value === "EA 常规柱塞泵"
    ? "ea"
    : value === "SM 微型柱塞泵"
      ? "sm"
      : value === "TM 超微型柱塞泵"
        ? "tm"
        : null;

  if (!series) return null;
  const copy = getPistonPumpIntroCopy(series, activeLocale);
  return { ...copy, image: { ...productTypeIntroMap["pumps:plunger-pump"].image, alt: copy.imageAlt } };
}

export function getDiaphragmPumpCategoryIntro(
  diaphragmType: unknown,
  locale: SelectionLocale = "zh"
) {
  const type = String(diaphragmType || "");
  const category = type === "液体隔膜泵"
    ? "liquid"
    : type === "气液混合隔膜泵"
      ? "gas-liquid"
      : null;

  if (!category) {
    return null;
  }

  const activeLocale = getRuntimeLocale(locale);
  return diaphragmPumpCategoryIntroMap[category][activeLocale] || null;
}
