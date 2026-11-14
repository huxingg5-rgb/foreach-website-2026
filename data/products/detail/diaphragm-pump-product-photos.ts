import type { DiaphragmPumpReferenceCopyKey } from "@/data/products/detail/diaphragm-pump-reference-models";

type ProductPhoto = {
  src: string;
  alt: { zh: string; en: string };
};

// Approved application-based descriptions for the real product photos.
// Application descriptions follow the approved Chinese copy in all six locales.
const PRODUCT_PHOTOS: Partial<Record<DiaphragmPumpReferenceCopyKey, ProductPhoto[]>> = {
  "dpgl800-brushless": [
    {
      "src": "/images/products/pumps/diaphragm-pumps/dpgl800/images/foreach-dpgl800-6l-min-gas-brushless-diaphragm-vacuum-pump.webp",
      "alt": {
        "zh": "Foreach DPGL800 无刷微型隔膜真空泵，单头空载气体流量 6 L/min，用于仪器负压建立",
        "en": "Foreach DPGL800 brushless miniature diaphragm vacuum pump with 6 L/min no-load gas flow per head for vacuum generation in instruments"
      }
    },
    {
      "src": "/images/products/pumps/diaphragm-pumps/dpgl800/images/foreach-dpgl800-6l-min-gas-brushless-diaphragm-waste-aspiration-pump.webp",
      "alt": {
        "zh": "Foreach DPGL800 无刷隔膜废液抽吸泵，单头空载气体流量 6 L/min，用于生化分析仪含气废液抽吸",
        "en": "Foreach DPGL800 brushless diaphragm waste aspiration pump with 6 L/min no-load gas flow per head for gas-liquid waste handling in chemistry analyzers"
      }
    },
    {
      "src": "/images/products/pumps/diaphragm-pumps/dpgl800/images/foreach-dpgl800-6l-min-gas-brushless-gas-liquid-diaphragm-pump.webp",
      "alt": {
        "zh": "Foreach DPGL800 无刷微型气液混合隔膜泵，单头空载气体流量 6 L/min，用于实验室自动化设备残液抽吸",
        "en": "Foreach DPGL800 brushless miniature gas-liquid diaphragm pump with 6 L/min no-load gas flow per head for residual liquid aspiration in laboratory automation"
      }
    },
    {
      "src": "/images/products/pumps/diaphragm-pumps/dpgl800/images/foreach-dpgl800-6l-min-gas-brushless-diaphragm-tubing-evacuation-pump.webp",
      "alt": {
        "zh": "Foreach DPGL800 无刷隔膜管路排空泵，单头空载气体流量 6 L/min，用于清除仪器管路中的空气和残液",
        "en": "Foreach DPGL800 brushless diaphragm evacuation pump with 6 L/min no-load gas flow per head for removing air and residual liquid from instrument tubing"
      }
    }
  ],
  "dpl30h-brushless": [
    {
      "src": "/images/products/pumps/diaphragm-pumps/dpl30h/images/foreach-dpl30h-300ml-min-brushless-diaphragm-analyzer-wash-pump.webp",
      "alt": {
        "zh": "Foreach DPL30H 无刷高压隔膜清洗液泵，空载流量 300 mL/min，用于生化分析仪高阻力清洗液路",
        "en": "Foreach DPL30H brushless high-pressure diaphragm wash pump with 300 mL/min free-flow capacity for high-resistance wash circuits in chemistry analyzers"
      }
    },
    {
      "src": "/images/products/pumps/diaphragm-pumps/dpl30h/images/foreach-dpl30h-300ml-min-brushless-diaphragm-liquid-supply-pump.webp",
      "alt": {
        "zh": "Foreach DPL30H 无刷高背压隔膜供液泵，空载流量 300 mL/min，用于实验室自动化设备多阀液路供液",
        "en": "Foreach DPL30H brushless diaphragm liquid supply pump with 300 mL/min free-flow capacity for elevated-backpressure circuits with multiple valves in laboratory automation"
      }
    },
    {
      "src": "/images/products/pumps/diaphragm-pumps/dpl30h/images/foreach-dpl30h-300ml-min-brushless-diaphragm-flow-cell-feed-pump.webp",
      "alt": {
        "zh": "Foreach DPL30H 无刷高压隔膜辅助供液泵，空载流量 300 mL/min，用于分析仪器流通池前端供液",
        "en": "Foreach DPL30H brushless high-pressure diaphragm feed pump with 300 mL/min free-flow capacity for auxiliary liquid supply to analyzer flow cells"
      }
    },
    {
      "src": "/images/products/pumps/diaphragm-pumps/dpl30h/images/foreach-dpl30h-300ml-min-brushless-diaphragm-liquid-circulation-pump.webp",
      "alt": {
        "zh": "Foreach DPL30H 无刷隔膜液体循环泵，空载流量 300 mL/min，用于仪器高背压液路循环",
        "en": "Foreach DPL30H brushless diaphragm liquid circulation pump with 300 mL/min free-flow capacity for instrument circuits with elevated backpressure"
      }
    }
  ],
  "dpl30h-brushed": [
    {
      "src": "/images/products/pumps/diaphragm-pumps/dpl30h/images/foreach-dpl30h-300ml-min-brushed-diaphragm-probe-wash-pump.webp",
      "alt": {
        "zh": "Foreach DPL30H 有刷高压隔膜探针冲洗泵，空载流量 300 mL/min，用于分析仪器探针清洗供液",
        "en": "Foreach DPL30H brushed high-pressure diaphragm probe wash pump with 300 mL/min free-flow capacity for probe cleaning in analytical instruments"
      }
    },
    {
      "src": "/images/products/pumps/diaphragm-pumps/dpl30h/images/foreach-dpl30h-300ml-min-brushed-diaphragm-pressurized-liquid-transfer-pump.webp",
      "alt": {
        "zh": "Foreach DPL30H 有刷高压隔膜输液泵，空载流量 300 mL/min，用于小内径管路加压输液",
        "en": "Foreach DPL30H brushed high-pressure diaphragm liquid transfer pump with 300 mL/min free-flow capacity for pressurized delivery through small-bore tubing"
      }
    },
    {
      "src": "/images/products/pumps/diaphragm-pumps/dpl30h/images/foreach-dpl30h-300ml-min-brushed-diaphragm-filter-feed-pump.webp",
      "alt": {
        "zh": "Foreach DPL30H 有刷高压隔膜辅助供液泵，空载流量 300 mL/min，用于仪器过滤器前端供液",
        "en": "Foreach DPL30H brushed high-pressure diaphragm feed pump with 300 mL/min free-flow capacity for auxiliary liquid supply upstream of instrument filters"
      }
    },
    {
      "src": "/images/products/pumps/diaphragm-pumps/dpl30h/images/foreach-dpl30h-300ml-min-brushed-diaphragm-fluid-circuit-flushing-pump.webp",
      "alt": {
        "zh": "Foreach DPL30H 有刷高压隔膜冲洗泵，空载流量 300 mL/min，用于自动化设备高阻力液路冲洗",
        "en": "Foreach DPL30H brushed high-pressure diaphragm flushing pump with 300 mL/min free-flow capacity for high-resistance fluid circuits in automated equipment"
      }
    }
  ]
};

const localizedPhotoAlts: Record<string, Partial<Record<DiaphragmPumpReferenceCopyKey, readonly string[]>>> = {
  es: {
    "dpgl800-brushless": [
      "Bomba de vacío de membrana miniatura Foreach DPGL800 sin escobillas, caudal de gas sin carga de 6 L/min por cabezal, para generar vacío en instrumentos",
      "Bomba de membrana Foreach DPGL800 sin escobillas para aspirar residuos con aire en analizadores bioquímicos, caudal de gas sin carga de 6 L/min por cabezal",
      "Bomba de membrana miniatura Foreach DPGL800 sin escobillas para mezclas de gas y líquido y aspiración de líquido residual en automatización de laboratorio, 6 L/min de gas sin carga por cabezal",
      "Bomba de membrana Foreach DPGL800 sin escobillas para evacuar aire y líquido residual de los tubos de instrumentos, caudal de gas sin carga de 6 L/min por cabezal",
    ],
    "dpl30h-brushless": [
      "Bomba de membrana de alta presión Foreach DPL30H sin escobillas para circuitos de lavado de alta resistencia en analizadores bioquímicos, caudal libre de 300 mL/min",
      "Bomba de membrana Foreach DPL30H sin escobillas para alimentar circuitos con varias válvulas y alta contrapresión en automatización de laboratorio, caudal libre de 300 mL/min",
      "Bomba de membrana de alta presión Foreach DPL30H sin escobillas para alimentación auxiliar de celdas de flujo de analizadores, caudal libre de 300 mL/min",
      "Bomba de membrana Foreach DPL30H sin escobillas para recirculación de líquido en circuitos de instrumentos con alta contrapresión, caudal libre de 300 mL/min",
    ],
    "dpl30h-brushed": [
      "Bomba de membrana de alta presión Foreach DPL30H con escobillas para suministrar líquido de lavado a sondas de instrumentos analíticos, caudal libre de 300 mL/min",
      "Bomba de membrana de alta presión Foreach DPL30H con escobillas para impulsar líquido por tubos de diámetro interior pequeño, caudal libre de 300 mL/min",
      "Bomba de membrana de alta presión Foreach DPL30H con escobillas para alimentación auxiliar aguas arriba de filtros de instrumentos, caudal libre de 300 mL/min",
      "Bomba de membrana de alta presión Foreach DPL30H con escobillas para enjuagar circuitos de alta resistencia en equipos automatizados, caudal libre de 300 mL/min",
    ],
  },
  fr: {
    "dpgl800-brushless": [
      "Pompe à vide à membrane miniature Foreach DPGL800 sans balais, débit de gaz à vide de 6 L/min par tête, pour créer une dépression dans les instruments",
      "Pompe à membrane Foreach DPGL800 sans balais pour aspirer les effluents contenant de l’air dans les analyseurs de biochimie, débit de gaz à vide de 6 L/min par tête",
      "Pompe à membrane miniature Foreach DPGL800 sans balais pour mélanges gaz-liquide et aspiration de liquide résiduel en automatisation de laboratoire, débit de gaz à vide de 6 L/min par tête",
      "Pompe à membrane Foreach DPGL800 sans balais pour évacuer l’air et le liquide résiduel des tubes d’instruments, débit de gaz à vide de 6 L/min par tête",
    ],
    "dpl30h-brushless": [
      "Pompe à membrane haute pression Foreach DPL30H sans balais pour les circuits de lavage à forte résistance des analyseurs de biochimie, débit libre de 300 mL/min",
      "Pompe à membrane Foreach DPL30H sans balais pour alimenter les circuits à plusieurs vannes et forte contre-pression en automatisation de laboratoire, débit libre de 300 mL/min",
      "Pompe à membrane haute pression Foreach DPL30H sans balais pour l’alimentation auxiliaire des cellules de mesure en flux des analyseurs, débit libre de 300 mL/min",
      "Pompe à membrane Foreach DPL30H sans balais pour la recirculation de liquide dans les circuits d’instruments à forte contre-pression, débit libre de 300 mL/min",
    ],
    "dpl30h-brushed": [
      "Pompe à membrane haute pression Foreach DPL30H à balais pour alimenter le lavage des sondes d’instruments analytiques, débit libre de 300 mL/min",
      "Pompe à membrane haute pression Foreach DPL30H à balais pour transférer du liquide sous pression dans des tubes de faible diamètre intérieur, débit libre de 300 mL/min",
      "Pompe à membrane haute pression Foreach DPL30H à balais pour l’alimentation auxiliaire en amont des filtres d’instruments, débit libre de 300 mL/min",
      "Pompe à membrane haute pression Foreach DPL30H à balais pour rincer les circuits à forte résistance des équipements automatisés, débit libre de 300 mL/min",
    ],
  },
  ko: {
    "dpgl800-brushless": [
      "계측기 내부 진공 형성용 Foreach DPGL800 무브러시 소형 다이어프램 진공 펌프, 헤드당 무부하 기체 유량 6 L/min",
      "생화학 분석기의 공기 혼입 폐액 흡인용 Foreach DPGL800 무브러시 다이어프램 펌프, 헤드당 무부하 기체 유량 6 L/min",
      "실험실 자동화 장비의 잔류 액체 흡인용 Foreach DPGL800 무브러시 소형 기액 혼합 다이어프램 펌프, 헤드당 무부하 기체 유량 6 L/min",
      "계측기 튜브의 공기와 잔류 액체 배출용 Foreach DPGL800 무브러시 다이어프램 펌프, 헤드당 무부하 기체 유량 6 L/min",
    ],
    "dpl30h-brushless": [
      "생화학 분석기의 유로 저항이 큰 세척 회로용 Foreach DPL30H 무브러시 고압 다이어프램 세척액 펌프, 무부하 유량 300 mL/min",
      "실험실 자동화 장비의 다중 밸브·고배압 유로 공급용 Foreach DPL30H 무브러시 다이어프램 펌프, 무부하 유량 300 mL/min",
      "분석기 플로 셀의 보조 액체 공급용 Foreach DPL30H 무브러시 고압 다이어프램 펌프, 무부하 유량 300 mL/min",
      "계측기 고배압 유로의 액체 순환용 Foreach DPL30H 무브러시 다이어프램 펌프, 무부하 유량 300 mL/min",
    ],
    "dpl30h-brushed": [
      "분석기 프로브 세척액 공급용 Foreach DPL30H 브러시형 고압 다이어프램 펌프, 무부하 유량 300 mL/min",
      "내경이 작은 튜브의 가압 이송용 Foreach DPL30H 브러시형 고압 다이어프램 액체 펌프, 무부하 유량 300 mL/min",
      "계측기 필터 상류의 보조 액체 공급용 Foreach DPL30H 브러시형 고압 다이어프램 펌프, 무부하 유량 300 mL/min",
      "자동화 장비의 유로 저항이 큰 회로 세척용 Foreach DPL30H 브러시형 고압 다이어프램 펌프, 무부하 유량 300 mL/min",
    ],
  },
  ru: {
    "dpgl800-brushless": [
      "Миниатюрный мембранный вакуумный насос Foreach DPGL800 с бесщёточным двигателем для создания разрежения в приборах, расход газа без нагрузки 6 L/min на головку",
      "Мембранный насос Foreach DPGL800 с бесщёточным двигателем для аспирации отходов с воздухом в биохимических анализаторах, расход газа без нагрузки 6 L/min на головку",
      "Миниатюрный мембранный насос Foreach DPGL800 с бесщёточным двигателем для газожидкостных смесей и аспирации остатков жидкости в лабораторной автоматизации, расход газа без нагрузки 6 L/min на головку",
      "Мембранный насос Foreach DPGL800 с бесщёточным двигателем для удаления воздуха и остатков жидкости из трубок приборов, расход газа без нагрузки 6 L/min на головку",
    ],
    "dpl30h-brushless": [
      "Мембранный насос высокого давления Foreach DPL30H с бесщёточным двигателем для промывочных контуров биохимических анализаторов с высоким сопротивлением, расход без нагрузки 300 mL/min",
      "Мембранный насос Foreach DPL30H с бесщёточным двигателем для подачи жидкости в многоклапанные контуры лабораторной автоматизации с высоким противодавлением, расход без нагрузки 300 mL/min",
      "Мембранный насос высокого давления Foreach DPL30H с бесщёточным двигателем для вспомогательной подачи жидкости к проточным ячейкам анализаторов, расход без нагрузки 300 mL/min",
      "Мембранный насос Foreach DPL30H с бесщёточным двигателем для циркуляции жидкости в контурах приборов с высоким противодавлением, расход без нагрузки 300 mL/min",
    ],
    "dpl30h-brushed": [
      "Мембранный насос высокого давления Foreach DPL30H с коллекторным двигателем для подачи промывочной жидкости к зондам аналитических приборов, расход без нагрузки 300 mL/min",
      "Мембранный насос высокого давления Foreach DPL30H с коллекторным двигателем для подачи жидкости под давлением по трубкам малого внутреннего диаметра, расход без нагрузки 300 mL/min",
      "Мембранный насос высокого давления Foreach DPL30H с коллекторным двигателем для вспомогательной подачи жидкости перед фильтрами приборов, расход без нагрузки 300 mL/min",
      "Мембранный насос высокого давления Foreach DPL30H с коллекторным двигателем для промывки контуров автоматизированного оборудования с высоким сопротивлением, расход без нагрузки 300 mL/min",
    ],
  },
};

export function getDiaphragmPumpProductPhotos(
  copyKey: DiaphragmPumpReferenceCopyKey | undefined,
  locale: string,
) {
  const photos = copyKey ? PRODUCT_PHOTOS[copyKey] : undefined;
  const lang = locale.toLowerCase().split("-")[0];
  return photos?.map(({ src, alt }, index) => ({
    src,
    alt: lang === "zh" ? alt.zh : (copyKey && localizedPhotoAlts[lang]?.[copyKey]?.[index]) || alt.en,
  }));
}
