import type {
  ProductSelectionProduct,
  SelectionI18nText,
  SelectionLocale,
} from "./product-selection.types";

type ValveCardCopy = { model: string; name: string; heading: string };

// Uses the existing model + descriptive heading card layout.
// Share card H2 descriptions with the corresponding product-detail H1s.
// Sources: HP PS-120C-2604-00001-001 pp. 4, 6; SV10 PS-122A-003 A02 pp. 3–5.
const valveCards: Record<SelectionLocale, Record<"hp" | "two" | "three", ValveCardCopy>> = {
  zh: {
    hp: {
      model: "HP",
      name: "二位六通带排气高压旋转阀",
      heading: "二位六通带排气高压旋转阀，配合定量环完成 HPLC 装样与进样切换，并提供独立排气通路。",
    },
    two: {
      model: "SV10-2",
      name: "二通微型隔膜电磁阀",
      heading: "二通微型隔膜电磁阀，用于稀释液、清洗液等介质的通断控制，提供常闭和常开型号。",
    },
    three: {
      model: "SV10-3",
      name: "三通微型隔膜电磁阀",
      heading: "三通微型隔膜电磁阀，用于公共口与两条支路之间的流路切换。",
    },
  },
  en: {
    hp: {
      model: "HP",
      name: "2-Position, 6-Port High-Pressure Rotary Valve with Vent",
      heading: "2-position, 6-port high-pressure rotary valve for HPLC sample-loop loading and injection, with a separate vent path.",
    },
    two: {
      model: "SV10-2",
      name: "2-Way Miniature Diaphragm Solenoid Valve",
      heading: "2-way miniature diaphragm solenoid valve for diluent and wash-fluid on/off control, with normally closed or normally open variants.",
    },
    three: {
      model: "SV10-3",
      name: "3-Way Miniature Diaphragm Solenoid Valve",
      heading: "3-way miniature diaphragm solenoid valve for switching a common port between two flow paths.",
    },
  },
  es: {
    hp: {
      model: "HP",
      name: "Válvula rotativa de alta presión de 2 posiciones y 6 puertos con venteo",
      heading: "Válvula rotativa de alta presión de 2 posiciones y 6 puertos para carga e inyección mediante un bucle de muestra HPLC, con una vía de venteo independiente.",
    },
    two: {
      model: "SV10-2",
      name: "Electroválvula miniatura de diafragma de 2 vías",
      heading: "Electroválvula miniatura de diafragma de 2 vías para abrir y cerrar el paso de diluyentes y líquidos de lavado, con versiones normalmente cerradas o abiertas.",
    },
    three: {
      model: "SV10-3",
      name: "Electroválvula miniatura de diafragma de 3 vías",
      heading: "Electroválvula miniatura de diafragma de 3 vías para conmutar un puerto común entre dos circuitos.",
    },
  },
  fr: {
    hp: {
      model: "HP",
      name: "Vanne rotative haute pression à 2 positions et 6 voies avec évent",
      heading: "Vanne rotative haute pression à 2 positions et 6 voies pour le chargement et l’injection par boucle d’échantillonnage HPLC, avec évent indépendant.",
    },
    two: {
      model: "SV10-2",
      name: "Électrovanne miniature à membrane à 2 voies",
      heading: "Électrovanne miniature à membrane à 2 voies pour ouvrir et fermer le passage des diluants et liquides de rinçage, en versions normalement fermées ou ouvertes.",
    },
    three: {
      model: "SV10-3",
      name: "Électrovanne miniature à membrane à 3 voies",
      heading: "Électrovanne miniature à membrane à 3 voies pour commuter un orifice commun entre deux circuits.",
    },
  },
  ko: {
    hp: {
      model: "HP",
      name: "벤트 기능이 있는 2포지션 6포트 고압 로터리 밸브",
      heading: "시료 루프와 함께 HPLC 시료 로딩 및 주입 유로를 전환하는 2포지션 6포트 고압 로터리 밸브로, 독립 배기 유로를 제공합니다.",
    },
    two: {
      model: "SV10-2",
      name: "2방향 소형 다이어프램 솔레노이드 밸브",
      heading: "희석액 및 세척액의 흐름을 열고 닫는 2방향 소형 다이어프램 솔레노이드 밸브로, 상시 닫힘 및 상시 열림 모델을 제공합니다.",
    },
    three: {
      model: "SV10-3",
      name: "3방향 소형 다이어프램 솔레노이드 밸브",
      heading: "공통 포트를 두 분기 유로 사이에서 전환하는 3방향 소형 다이어프램 솔레노이드 밸브입니다.",
    },
  },
  ru: {
    hp: {
      model: "HP",
      name: "Роторный клапан высокого давления: 2 положения, 6 портов и отвод воздуха",
      heading: "Роторный клапан высокого давления с 2 положениями и 6 портами для загрузки и ввода пробы через петлю ВЭЖХ, с отдельным каналом отвода воздуха.",
    },
    two: {
      model: "SV10-2",
      name: "Двухходовой миниатюрный мембранный электромагнитный клапан",
      heading: "Двухходовой миниатюрный мембранный электромагнитный клапан для подачи и отсечения разбавителей и промывочных жидкостей, в нормально закрытом или открытом исполнении.",
    },
    three: {
      model: "SV10-3",
      name: "Трёхходовой миниатюрный мембранный электромагнитный клапан",
      heading: "Трёхходовой миниатюрный мембранный электромагнитный клапан для переключения общего порта между двумя линиями.",
    },
  },
};

const mrv3Cards: Record<SelectionLocale, { name: string; heading: string }> = {
  zh: {
    name: "{channels}通道陶瓷旋转阀",
    heading: "{channels}通道陶瓷旋转阀，用于试剂选择与清洗路径切换。",
  },
  en: {
    name: "{channels}-Channel Ceramic Rotary Selector Valve",
    heading: "{channels}-channel ceramic rotary selector valve for reagent selection and wash-path switching.",
  },
  es: {
    name: "Válvula selectora rotativa cerámica de {channels} canales",
    heading: "Válvula selectora rotativa cerámica de {channels} canales para selección de reactivos y conmutación del circuito de lavado.",
  },
  fr: {
    name: "Vanne de sélection rotative en céramique à {channels} voies",
    heading: "Vanne de sélection rotative en céramique à {channels} voies pour la sélection des réactifs et la commutation du circuit de rinçage.",
  },
  ko: {
    name: "{channels}채널 세라믹 로터리 셀렉터 밸브",
    heading: "시약 선택 및 세척 유로 전환용 {channels}채널 세라믹 로터리 셀렉터 밸브.",
  },
  ru: {
    name: "{channels}-канальный керамический роторный клапан-селектор",
    heading: "{channels}-канальный керамический роторный клапан-селектор для выбора реагентов и переключения на промывку.",
  },
};

export function getValveCardCopy(
  product: Pick<ProductSelectionProduct, "productId" | "seriesId">,
  locale: SelectionLocale,
): ValveCardCopy | undefined {
  const mrv3Channels = product.seriesId === "MRV3"
    ? /^mrv3-d(10|16|24)$/.exec(product.productId)?.[1]
    : undefined;
  if (mrv3Channels) {
    const copy = mrv3Cards[locale];
    return {
      model: product.productId.toUpperCase(),
      name: copy.name.replace("{channels}", mrv3Channels),
      heading: copy.heading.replace("{channels}", mrv3Channels),
    };
  }
  if (product.productId === "hp-3-position-7-port-high-pressure-valve") return valveCards[locale].hp;
  if (product.seriesId === "6010") {
    if (product.productId === "2-way") return valveCards[locale].two;
    if (product.productId === "3-way") return valveCards[locale].three;
  }
  return undefined;
}

export function getValveDetailHeading(slug: string, locale: SelectionLocale): string | undefined {
  if (/^mrv3-d(10|16|24)$/.test(slug)) {
    return getValveCardCopy({ productId: slug, seriesId: "MRV3" }, locale)?.heading;
  }
  if (slug === "2-way" || slug === "3-way") {
    return getValveCardCopy({ productId: slug, seriesId: "6010" }, locale)?.heading;
  }
  if (slug === "high-pressure-valves") {
    return getValveCardCopy({ productId: "hp-3-position-7-port-high-pressure-valve" }, locale)?.heading;
  }
  return undefined;
}

export function getHpValveCardText(field: "title" | "subtitle"): SelectionI18nText {
  return Object.fromEntries(Object.entries(valveCards).map(([locale, { hp }]) => [
    locale,
    field === "title" ? `${hp.model} ${hp.name}` : hp.heading,
  ])) as SelectionI18nText;
}
