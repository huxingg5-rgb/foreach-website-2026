import type { SelectionLocale } from "@/data/products/selection/product-selection.types";

export const DIAPHRAGM_PUMP_NEUTRAL_SERIES_SLUGS = [
  "dpl30-liquid-diaphragm-pump",
  "dpl60-liquid-diaphragm-pump",
  "dpl30h-liquid-diaphragm-pump",
] as const;

export type DiaphragmPumpNeutralSeriesSlug =
  (typeof DIAPHRAGM_PUMP_NEUTRAL_SERIES_SLUGS)[number];

type SeriesFacts = {
  slug: DiaphragmPumpNeutralSeriesSlug;
  model: "DPL30" | "DPL60" | "DPL30H";
  brushedModel: string;
  brushlessModel: string;
  flow: 300 | 600;
  ratedPressure: 100 | 600;
  selfPriming: 3 | 6;
  highPressure: boolean;
};

export type DiaphragmPumpSeriesCopy = {
  seriesSlug: DiaphragmPumpNeutralSeriesSlug;
  title: string;
  seoTitle: string;
  seoDescription: string;
  intro: string;
  applications: string;
  cardParameters: string[];
  faqs: Array<{ question: string; answer: string }>;
  specifications: Array<{ label: string; value: string }>;
  optionsTitle: string;
  optionsIntro: string;
};

const SERIES_FACTS: Record<DiaphragmPumpNeutralSeriesSlug, SeriesFacts> = {
  "dpl30-liquid-diaphragm-pump": {
    slug: "dpl30-liquid-diaphragm-pump",
    model: "DPL30",
    brushedModel: "DPL30-DB",
    brushlessModel: "DPL30-BB",
    flow: 300,
    ratedPressure: 100,
    selfPriming: 6,
    highPressure: false,
  },
  "dpl60-liquid-diaphragm-pump": {
    slug: "dpl60-liquid-diaphragm-pump",
    model: "DPL60",
    brushedModel: "DPL60-DB",
    brushlessModel: "DPL60-BB",
    flow: 600,
    ratedPressure: 100,
    selfPriming: 3,
    highPressure: false,
  },
  "dpl30h-liquid-diaphragm-pump": {
    slug: "dpl30h-liquid-diaphragm-pump",
    model: "DPL30H",
    brushedModel: "DPL30H-DS",
    brushlessModel: "DPL30H-BS",
    flow: 300,
    ratedPressure: 600,
    selfPriming: 3,
    highPressure: true,
  },
};

function buildZh(facts: SeriesFacts): DiaphragmPumpSeriesCopy {
  const title = facts.highPressure
    ? `${facts.model}系列 高压微型液体隔膜泵`
    : `${facts.model}系列 ${facts.flow} mL/min 微型液体隔膜泵`;
  const family = facts.highPressure ? "高压微型液体隔膜泵" : "微型液体隔膜泵";

  return {
    seriesSlug: facts.slug,
    title,
    seoTitle: `${title} | FOREACH`,
    seoDescription: `${facts.model} ${family}系列，空载流量 ${facts.flow} mL/min、额定压力 ${facts.ratedPressure} kPa，提供有刷和无刷电机配置，用于仪器液体输送、清洗和循环液路。`,
    intro: `FOREACH ${facts.model} 系列属于${family}，空载流量为 ${facts.flow} mL/min，额定压力为 ${facts.ratedPressure} kPa，自吸高度为 ${facts.selfPriming} mH₂O。该系列提供 ${facts.brushedModel} 有刷和 ${facts.brushlessModel} 无刷电机配置，可用于仪器内部的液体输送、清洗、管路预充和循环液路。不同配置的电机寿命、接线和产品资源不同，具体参数请进入对应配置页确认。`,
    applications: "液体输送、清洗液输送、管路预充、液体循环和仪器内部液路",
    cardParameters: [
      `空载流量：${facts.flow} mL/min`,
      `额定压力：${facts.ratedPressure} kPa`,
      "电机配置：有刷 / 无刷",
    ],
    faqs: [
      {
        question: `${facts.model} 系列包含哪些电机配置？`,
        answer: `${facts.model} 系列包含 ${facts.brushedModel} 有刷配置和 ${facts.brushlessModel} 无刷配置。两者属于同一流量与压力等级，但电机寿命、接线和具体产品资源不同，应进入对应配置页核对。`,
      },
      {
        question: `${facts.model} 有刷和无刷配置怎么选？`,
        answer: `有刷配置的规定寿命为 3,000 h，无刷配置为 10,000 h，条件均为额定电压、连续运行。实际选型还应结合设备工作周期、启停频率、控制要求、系统阻力和介质兼容性验证。`,
      },
    ],
    specifications: [
      { label: "产品类型", value: `${family}系列` },
      {
        label: "配置",
        value: `${facts.brushedModel} 有刷 / ${facts.brushlessModel} 无刷`,
      },
      { label: "额定电压", value: "DC 12 V ±10% / DC 24 V ±10%" },
      { label: "空载流量", value: `${facts.flow} mL/min` },
      { label: "额定压力", value: `${facts.ratedPressure} kPa` },
      { label: "自吸高度", value: `${facts.selfPriming} mH₂O` },
      {
        label: "工作介质",
        value: "纯化水；其他液体需按实际工况进行材料兼容性与样机测试",
      },
      {
        label: "接液材料",
        value: "PPS 泵头；EPDM / PTFE 膜片；EPDM / FFKM 阀片",
      },
      {
        label: "规定寿命",
        value: "有刷 3,000 h / 无刷 10,000 h（额定电压、连续运行）",
      },
    ],
    optionsTitle: `${facts.model} 系列配置`,
    optionsIntro:
      "根据电机寿命、接线和设备工作周期进入对应配置页查看精确规格、图纸与产品资源。",
  };
}

function buildEn(facts: SeriesFacts): DiaphragmPumpSeriesCopy {
  const title = facts.highPressure
    ? `${facts.model} High-Pressure Miniature Liquid Diaphragm Pump Series`
    : `${facts.model} ${facts.flow} mL/min Miniature Liquid Diaphragm Pump Series`;
  const family = facts.highPressure
    ? "high-pressure miniature liquid diaphragm pump"
    : "miniature liquid diaphragm pump";

  return {
    seriesSlug: facts.slug,
    title,
    seoTitle: `${title} | FOREACH`,
    seoDescription: `${facts.model} ${family} series with ${facts.flow} mL/min no-load flow, ${facts.ratedPressure} kPa rated pressure, and brushed or brushless motor configurations for instrument fluidics.`,
    intro: `The FOREACH ${facts.model} series is a ${family} family with ${facts.flow} mL/min no-load flow, ${facts.ratedPressure} kPa rated pressure, and ${facts.selfPriming} mH₂O self-priming lift. It is available as the brushed ${facts.brushedModel} and brushless ${facts.brushlessModel} for liquid transfer, washing, line priming, and circulation in compact instruments. Motor life, wiring, and product resources vary by configuration; refer to the corresponding configuration page for exact specifications.`,
    applications:
      "Liquid transfer, wash-fluid delivery, line priming, liquid circulation, and instrument fluidics",
    cardParameters: [
      `No-load flow: ${facts.flow} mL/min`,
      `Rated pressure: ${facts.ratedPressure} kPa`,
      "Motor options: brushed / brushless",
    ],
    faqs: [
      {
        question: `Which motor configurations are included in the ${facts.model} series?`,
        answer: `The ${facts.model} series includes the brushed ${facts.brushedModel} and brushless ${facts.brushlessModel}. They share the same flow and pressure class, while motor life, wiring, and product resources differ.`,
      },
      {
        question: `How should I choose between brushed and brushless ${facts.model} configurations?`,
        answer:
          "Specified service life is 3,000 h for the brushed configuration and 10,000 h for the brushless configuration at rated voltage under continuous operation. Final selection should also consider duty cycle, start-stop frequency, control requirements, system resistance, and fluid compatibility.",
      },
    ],
    specifications: [
      { label: "Product type", value: `${family} series` },
      {
        label: "Configurations",
        value: `${facts.brushedModel} brushed / ${facts.brushlessModel} brushless`,
      },
      { label: "Rated voltage", value: "DC 12 V ±10% / DC 24 V ±10%" },
      { label: "No-load flow", value: `${facts.flow} mL/min` },
      { label: "Rated pressure", value: `${facts.ratedPressure} kPa` },
      { label: "Self-priming lift", value: `${facts.selfPriming} mH₂O` },
      {
        label: "Working medium",
        value:
          "Purified water; other liquids require compatibility evaluation and testing under actual conditions",
      },
      {
        label: "Wetted materials",
        value: "PPS pump head; EPDM / PTFE diaphragm; EPDM / FFKM valves",
      },
      {
        label: "Specified service life",
        value:
          "Brushed 3,000 h / brushless 10,000 h (rated voltage, continuous operation)",
      },
    ],
    optionsTitle: `${facts.model} Series Configurations`,
    optionsIntro:
      "Choose a configuration page to review its exact motor life, wiring, drawings, and product resources.",
  };
}

function buildEs(facts: SeriesFacts): DiaphragmPumpSeriesCopy {
  const title = facts.highPressure
    ? `Serie ${facts.model} de bombas de diafragma en miniatura de alta presión para líquidos`
    : `Serie ${facts.model} de bombas de diafragma en miniatura para líquidos de ${facts.flow} mL/min`;
  const family = facts.highPressure
    ? "bombas de diafragma en miniatura de alta presión para líquidos"
    : "bombas de diafragma en miniatura para líquidos";

  return {
    seriesSlug: facts.slug,
    title,
    seoTitle: `${title} | FOREACH`,
    seoDescription: `Serie ${facts.model} de ${family}, con caudal sin carga de ${facts.flow} mL/min, presión nominal de ${facts.ratedPressure} kPa y configuraciones con o sin escobillas.`,
    intro: `La serie FOREACH ${facts.model} es una familia de ${family} con caudal sin carga de ${facts.flow} mL/min, presión nominal de ${facts.ratedPressure} kPa y altura de autocebado de ${facts.selfPriming} mH₂O. Está disponible como ${facts.brushedModel} con escobillas y ${facts.brushlessModel} sin escobillas para transferencia, lavado, cebado y circulación en instrumentos compactos. La vida del motor, el cableado y los recursos varían según la configuración; consulte la página correspondiente para conocer las especificaciones exactas.`,
    applications:
      "Transferencia de líquidos, lavado, cebado de líneas, circulación y circuitos de instrumentos",
    cardParameters: [
      `Caudal sin carga: ${facts.flow} mL/min`,
      `Presión nominal: ${facts.ratedPressure} kPa`,
      "Motores: con / sin escobillas",
    ],
    faqs: [
      {
        question: `¿Qué configuraciones de motor incluye la serie ${facts.model}?`,
        answer: `La serie ${facts.model} incluye ${facts.brushedModel} con escobillas y ${facts.brushlessModel} sin escobillas. Comparten la misma clase de caudal y presión, pero difieren en vida del motor, cableado y recursos del producto.`,
      },
      {
        question: `¿Cómo elegir entre las configuraciones ${facts.model} con y sin escobillas?`,
        answer:
          "La vida útil especificada es de 3.000 h para la versión con escobillas y de 10.000 h para la versión sin escobillas, a tensión nominal y en funcionamiento continuo. La selección final también debe considerar el ciclo de trabajo, los arranques, el control, la resistencia del sistema y la compatibilidad del fluido.",
      },
    ],
    specifications: [
      { label: "Tipo de producto", value: `Serie de ${family}` },
      {
        label: "Configuraciones",
        value: `${facts.brushedModel} con escobillas / ${facts.brushlessModel} sin escobillas`,
      },
      { label: "Tensión nominal", value: "CC 12 V ±10% / CC 24 V ±10%" },
      { label: "Caudal sin carga", value: `${facts.flow} mL/min` },
      { label: "Presión nominal", value: `${facts.ratedPressure} kPa` },
      { label: "Altura de autocebado", value: `${facts.selfPriming} mH₂O` },
      {
        label: "Medio de trabajo",
        value:
          "Agua purificada; otros líquidos requieren evaluación de compatibilidad y pruebas reales",
      },
      {
        label: "Materiales mojados",
        value: "Cabezal PPS; membrana EPDM / PTFE; válvulas EPDM / FFKM",
      },
      {
        label: "Vida útil especificada",
        value:
          "Con escobillas 3.000 h / sin escobillas 10.000 h (tensión nominal, funcionamiento continuo)",
      },
    ],
    optionsTitle: `Configuraciones de la serie ${facts.model}`,
    optionsIntro:
      "Abra la configuración correspondiente para consultar la vida del motor, el cableado, los planos y los recursos exactos.",
  };
}

function buildFr(facts: SeriesFacts): DiaphragmPumpSeriesCopy {
  const title = facts.highPressure
    ? `Série ${facts.model} de pompes à membrane miniatures haute pression pour liquides`
    : `Série ${facts.model} de pompes à membrane miniatures pour liquides de ${facts.flow} mL/min`;
  const family = facts.highPressure
    ? "pompes à membrane miniatures haute pression pour liquides"
    : "pompes à membrane miniatures pour liquides";

  return {
    seriesSlug: facts.slug,
    title,
    seoTitle: `${title} | FOREACH`,
    seoDescription: `Série ${facts.model} de ${family}, avec débit à vide de ${facts.flow} mL/min, pression nominale de ${facts.ratedPressure} kPa et moteurs à balais ou sans balais.`,
    intro: `La série FOREACH ${facts.model} est une famille de ${family} offrant un débit à vide de ${facts.flow} mL/min, une pression nominale de ${facts.ratedPressure} kPa et une hauteur d’auto-amorçage de ${facts.selfPriming} mH₂O. Elle comprend la version à balais ${facts.brushedModel} et la version sans balais ${facts.brushlessModel} pour le transfert, le lavage, l’amorçage et la circulation dans les instruments compacts. La durée de vie du moteur, le câblage et les ressources varient selon la configuration ; consultez la page correspondante pour les spécifications exactes.`,
    applications:
      "Transfert de liquides, lavage, amorçage de lignes, circulation et circuits d’instruments",
    cardParameters: [
      `Débit à vide : ${facts.flow} mL/min`,
      `Pression nominale : ${facts.ratedPressure} kPa`,
      "Moteurs : à balais / sans balais",
    ],
    faqs: [
      {
        question: `Quelles configurations moteur comprend la série ${facts.model} ?`,
        answer: `La série ${facts.model} comprend ${facts.brushedModel} à balais et ${facts.brushlessModel} sans balais. Elles partagent la même classe de débit et de pression, mais diffèrent par la durée de vie du moteur, le câblage et les ressources produit.`,
      },
      {
        question: `Comment choisir entre les configurations ${facts.model} à balais et sans balais ?`,
        answer:
          "La durée de vie spécifiée est de 3 000 h pour la version à balais et de 10 000 h pour la version sans balais, à la tension nominale en fonctionnement continu. Le choix final doit aussi tenir compte du cycle de service, des démarrages, de la commande, de la résistance du circuit et de la compatibilité du fluide.",
      },
    ],
    specifications: [
      { label: "Type de produit", value: `Série de ${family}` },
      {
        label: "Configurations",
        value: `${facts.brushedModel} à balais / ${facts.brushlessModel} sans balais`,
      },
      { label: "Tension nominale", value: "CC 12 V ±10% / CC 24 V ±10%" },
      { label: "Débit à vide", value: `${facts.flow} mL/min` },
      { label: "Pression nominale", value: `${facts.ratedPressure} kPa` },
      { label: "Hauteur d’auto-amorçage", value: `${facts.selfPriming} mH₂O` },
      {
        label: "Fluide de travail",
        value:
          "Eau purifiée ; les autres liquides exigent une évaluation de compatibilité et des essais réels",
      },
      {
        label: "Matériaux mouillés",
        value: "Tête PPS ; membrane EPDM / PTFE ; clapets EPDM / FFKM",
      },
      {
        label: "Durée de vie spécifiée",
        value:
          "À balais 3 000 h / sans balais 10 000 h (tension nominale, fonctionnement continu)",
      },
    ],
    optionsTitle: `Configurations de la série ${facts.model}`,
    optionsIntro:
      "Ouvrez la configuration correspondante pour vérifier la durée de vie du moteur, le câblage, les plans et les ressources exactes.",
  };
}

function buildKo(facts: SeriesFacts): DiaphragmPumpSeriesCopy {
  const title = facts.highPressure
    ? `${facts.model} 시리즈 고압 소형 액체 다이어프램 펌프`
    : `${facts.model} 시리즈 ${facts.flow} mL/min 소형 액체 다이어프램 펌프`;
  const family = facts.highPressure
    ? "고압 소형 액체 다이어프램 펌프"
    : "소형 액체 다이어프램 펌프";

  return {
    seriesSlug: facts.slug,
    title,
    seoTitle: `${title} | FOREACH`,
    seoDescription: `${facts.flow} mL/min 무부하 유량, ${facts.ratedPressure} kPa 정격 압력, 브러시 및 브러시리스 모터 구성을 제공하는 ${facts.model} ${family} 시리즈입니다.`,
    intro: `FOREACH ${facts.model} 시리즈는 무부하 유량 ${facts.flow} mL/min, 정격 압력 ${facts.ratedPressure} kPa, 자흡 높이 ${facts.selfPriming} mH₂O의 ${family} 제품군입니다. 브러시 모터 ${facts.brushedModel}과 브러시리스 모터 ${facts.brushlessModel} 구성을 제공하며 소형 장비의 액체 이송, 세정, 배관 프라이밍 및 순환 회로에 사용할 수 있습니다. 모터 수명, 배선 및 제품 자료는 구성마다 다르므로 정확한 사양은 해당 구성 페이지에서 확인하십시오.`,
    applications:
      "액체 이송, 세정액 공급, 배관 프라이밍, 액체 순환 및 장비 내부 유로",
    cardParameters: [
      `무부하 유량: ${facts.flow} mL/min`,
      `정격 압력: ${facts.ratedPressure} kPa`,
      "모터 구성: 브러시 / 브러시리스",
    ],
    faqs: [
      {
        question: `${facts.model} 시리즈에는 어떤 모터 구성이 포함됩니까?`,
        answer: `${facts.model} 시리즈에는 브러시 모터 ${facts.brushedModel}과 브러시리스 모터 ${facts.brushlessModel}이 포함됩니다. 두 구성은 같은 유량 및 압력 등급을 공유하지만 모터 수명, 배선 및 제품 자료가 다릅니다.`,
      },
      {
        question: `${facts.model} 브러시와 브러시리스 구성은 어떻게 선택합니까?`,
        answer:
          "정격 전압에서 연속 운전할 때의 규정 수명은 브러시 구성이 3,000 h, 브러시리스 구성이 10,000 h입니다. 실제 선정에서는 운전 주기, 기동 빈도, 제어 요구, 시스템 저항 및 유체 호환성도 확인해야 합니다.",
      },
    ],
    specifications: [
      { label: "제품 유형", value: `${family} 시리즈` },
      {
        label: "구성",
        value: `${facts.brushedModel} 브러시 / ${facts.brushlessModel} 브러시리스`,
      },
      { label: "정격 전압", value: "DC 12 V ±10% / DC 24 V ±10%" },
      { label: "무부하 유량", value: `${facts.flow} mL/min` },
      { label: "정격 압력", value: `${facts.ratedPressure} kPa` },
      { label: "자흡 높이", value: `${facts.selfPriming} mH₂O` },
      {
        label: "작동 유체",
        value: "정제수; 기타 액체는 실제 조건에서 재질 호환성 평가와 시험 필요",
      },
      {
        label: "접액 재질",
        value: "PPS 펌프 헤드; EPDM / PTFE 다이어프램; EPDM / FFKM 밸브",
      },
      {
        label: "규정 수명",
        value: "브러시 3,000 h / 브러시리스 10,000 h (정격 전압, 연속 운전)",
      },
    ],
    optionsTitle: `${facts.model} 시리즈 구성`,
    optionsIntro:
      "정확한 모터 수명, 배선, 도면 및 제품 자료는 해당 구성 페이지에서 확인하십시오.",
  };
}

function buildRu(facts: SeriesFacts): DiaphragmPumpSeriesCopy {
  const title = facts.highPressure
    ? `Серия ${facts.model} миниатюрных жидкостных мембранных насосов высокого давления`
    : `Серия ${facts.model} миниатюрных жидкостных мембранных насосов ${facts.flow} mL/min`;
  const family = facts.highPressure
    ? "миниатюрных жидкостных мембранных насосов высокого давления"
    : "миниатюрных жидкостных мембранных насосов";

  return {
    seriesSlug: facts.slug,
    title,
    seoTitle: `${title} | FOREACH`,
    seoDescription: `Серия ${facts.model} ${family}: расход без нагрузки ${facts.flow} mL/min, номинальное давление ${facts.ratedPressure} kPa, щёточные и бесщёточные исполнения.`,
    intro: `FOREACH ${facts.model} — серия ${family} с расходом без нагрузки ${facts.flow} mL/min, номинальным давлением ${facts.ratedPressure} kPa и высотой самовсасывания ${facts.selfPriming} mH₂O. Доступны щёточное исполнение ${facts.brushedModel} и бесщёточное ${facts.brushlessModel} для перекачивания, промывки, заполнения линий и циркуляции в компактных приборах. Ресурс двигателя, подключение и материалы изделия зависят от исполнения; точные характеристики приведены на соответствующей странице конфигурации.`,
    applications:
      "Перекачивание жидкостей, промывка, заполнение линий, циркуляция и внутренние контуры приборов",
    cardParameters: [
      `Расход без нагрузки: ${facts.flow} mL/min`,
      `Номинальное давление: ${facts.ratedPressure} kPa`,
      "Двигатель: щёточный / бесщёточный",
    ],
    faqs: [
      {
        question: `Какие исполнения входят в серию ${facts.model}?`,
        answer: `Серия ${facts.model} включает щёточное исполнение ${facts.brushedModel} и бесщёточное ${facts.brushlessModel}. Они относятся к одному классу расхода и давления, но различаются ресурсом двигателя, подключением и комплектом материалов.`,
      },
      {
        question: `Как выбрать щёточное или бесщёточное исполнение ${facts.model}?`,
        answer:
          "Указанный ресурс при номинальном напряжении и непрерывной работе составляет 3 000 h для щёточного и 10 000 h для бесщёточного исполнения. Также необходимо учитывать рабочий цикл, частоту пусков, требования к управлению, сопротивление системы и совместимость жидкости.",
      },
    ],
    specifications: [
      { label: "Тип изделия", value: `Серия ${family}` },
      {
        label: "Исполнения",
        value: `${facts.brushedModel} щёточное / ${facts.brushlessModel} бесщёточное`,
      },
      { label: "Номинальное напряжение", value: "DC 12 V ±10% / DC 24 V ±10%" },
      { label: "Расход без нагрузки", value: `${facts.flow} mL/min` },
      { label: "Номинальное давление", value: `${facts.ratedPressure} kPa` },
      { label: "Высота самовсасывания", value: `${facts.selfPriming} mH₂O` },
      {
        label: "Рабочая среда",
        value:
          "Очищенная вода; другие жидкости требуют оценки совместимости и испытаний в реальных условиях",
      },
      {
        label: "Смачиваемые материалы",
        value: "Головка PPS; мембрана EPDM / PTFE; клапаны EPDM / FFKM",
      },
      {
        label: "Указанный ресурс",
        value:
          "Щёточный 3 000 h / бесщёточный 10 000 h (номинальное напряжение, непрерывная работа)",
      },
    ],
    optionsTitle: `Исполнения серии ${facts.model}`,
    optionsIntro:
      "Откройте страницу нужного исполнения, чтобы проверить ресурс двигателя, подключение, чертежи и материалы изделия.",
  };
}

function normalizeSeriesSlug(
  value: unknown,
): DiaphragmPumpNeutralSeriesSlug | null {
  const record =
    value && typeof value === "object"
      ? (value as Record<string, unknown>)
      : null;
  const candidates = record
    ? [record.slug, record.detailSlug, record.routeSlug, record.href]
    : [value];

  for (const candidate of candidates) {
    const slug = String(candidate || "")
      .split(/[?#]/, 1)[0]
      .split("/")
      .filter(Boolean)
      .at(-1)
      ?.toLowerCase();

    if (
      slug &&
      DIAPHRAGM_PUMP_NEUTRAL_SERIES_SLUGS.includes(
        slug as DiaphragmPumpNeutralSeriesSlug,
      )
    ) {
      return slug as DiaphragmPumpNeutralSeriesSlug;
    }
  }

  return null;
}

export function getDiaphragmPumpNeutralSeriesSlug(value: unknown) {
  return normalizeSeriesSlug(value);
}

export function getDiaphragmPumpSeriesCopy(
  value: unknown,
  locale: SelectionLocale,
): DiaphragmPumpSeriesCopy | null {
  const slug = normalizeSeriesSlug(value);

  if (!slug) return null;

  const facts = SERIES_FACTS[slug];

  if (locale === "zh") return buildZh(facts);
  if (locale === "es") return buildEs(facts);
  if (locale === "fr") return buildFr(facts);
  if (locale === "ko") return buildKo(facts);
  if (locale === "ru") return buildRu(facts);

  return buildEn(facts);
}
