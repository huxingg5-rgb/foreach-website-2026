import type {SelectionLocale} from "../selection/product-selection.types";
import {getSolenoidConfiguration, solenoidConfigurations} from "./solenoid-configurations";

// Order: three-way connections, then normally closed, then normally open.
const copy = {
  "zh": {
    "names": [
      "三通基板式微型隔膜电磁阀",
      "三通倒刺式微型隔膜电磁阀",
      "三通螺纹式微型隔膜电磁阀",
      "二通基板式微型隔膜电磁阀",
      "二通倒刺式微型隔膜电磁阀",
      "二通螺纹式微型隔膜电磁阀",
      "二通常开基板式微型隔膜电磁阀",
      "二通常开倒刺式微型隔膜电磁阀",
      "二通常开螺纹式微型隔膜电磁阀"
    ],
    "descriptions": [
      "采用 PEEK 底板，可直接安装于液路板，用于 OEM 仪器中试剂与清洗液的流路切换。",
      "通过倒刺（宝塔）接口直连软管，用于试剂供液与管路清洗之间的路径切换。",
      "提供 M6 或 1/4-28 UNF 接口，阀座可选 PEEK、PTFE、PVDF 等材料，用于公共管路在两条液路之间切换。",
      "采用 PEEK 底板集成于液路板，断电时关闭，用于多阀液路模块中的试剂供液控制。",
      "可直接连接软管，用于需要断电关闭的试剂与清洗液管路。",
      "通过 M6 或 1/4-28 UNF 接口连接管路，膜片可选 EPDM、FKM 或 FFKM，用于不同试剂管路的通断控制。",
      "可直接安装于液路板，断电时保持连通、通电时关闭，适用于需要默认连通的仪器液路。",
      "采用 PEEK 底板和倒刺软管接口，用于需要保持连通、按控制信号暂时关闭的供液管路。",
      "提供 M6 或 1/4-28 UNF 接口，用于断电保持连通的试剂或清洗管路。"
    ],
    "separator": "，",
    "nc": {
      "label": "二通常闭（NC）",
      "operation": "常闭型断电时关闭、通电时打开，用于需要在断电后关闭连接的液路。阀控制通断，液体由泵或压差推动。"
    },
    "no": {
      "label": "二通常开（NO）",
      "operation": "常开型断电时打开、通电时关闭，用于需要在断电后保持连通的液路。阀控制通断，液体由泵或压差推动。"
    },
    "legacyNames": [
      "二通基板式微型隔膜电磁阀",
      "二通倒刺式微型隔膜电磁阀",
      "二通螺纹式微型隔膜电磁阀"
    ]
  },
  "en": {
    "names": [
      "3-way manifold-mount miniature diaphragm solenoid valve",
      "3-way barbed miniature diaphragm solenoid valve",
      "3-way threaded miniature diaphragm solenoid valve",
      "2-way manifold-mount miniature diaphragm solenoid valve",
      "2-way barbed miniature diaphragm solenoid valve",
      "2-way threaded miniature diaphragm solenoid valve",
      "2-way normally open manifold-mount miniature diaphragm solenoid valve",
      "2-way normally open barbed miniature diaphragm solenoid valve",
      "2-way normally open threaded miniature diaphragm solenoid valve"
    ],
    "descriptions": [
      "with a PEEK base for direct manifold integration and switching between reagent and wash-fluid paths in OEM instruments.",
      "with barbed ports for direct tubing connection, enabling switching between reagent supply and line washing.",
      "with M6 or 1/4-28 UNF ports and valve-seat options including PEEK, PTFE and PVDF, for switching a common line between two fluid paths.",
      "with a PEEK base for manifold integration, closing when de-energized to control reagent supply in multi-valve fluidic modules.",
      "for direct tubing connection to reagent and wash-fluid lines that must close when power is off.",
      "with M6 or 1/4-28 UNF ports and EPDM, FKM or FFKM diaphragm options, for on/off control of different reagent lines.",
      "for direct manifold integration, remaining open when de-energized and closing when energized, for instrument circuits requiring a default open path.",
      "with a PEEK base and barbed tubing ports, for supply lines that remain open and close temporarily on a control signal.",
      "with M6 or 1/4-28 UNF ports, for reagent or wash-fluid lines that remain open when power is off."
    ],
    "separator": " ",
    "nc": {
      "label": "2-way normally closed (NC)",
      "operation": "The normally closed valve is closed when de-energized and opens when energized. Use it for fluid paths that must close when power is off. The valve controls the connection; a pump or pressure difference drives the liquid."
    },
    "no": {
      "label": "2-way normally open (NO)",
      "operation": "The normally open valve is open when de-energized and closes when energized. Use it for fluid paths that must remain open when power is off. The valve controls the connection; a pump or pressure difference drives the liquid."
    },
    "legacyNames": [
      "2-way manifold-mount miniature diaphragm solenoid valve",
      "2-way barbed miniature diaphragm solenoid valve",
      "2-way threaded miniature diaphragm solenoid valve"
    ]
  },
  "es": {
    "names": [
      "Electroválvula miniatura de diafragma de 3 vías para montaje en colector",
      "Electroválvula miniatura de diafragma de 3 vías con espigas",
      "Electroválvula miniatura de diafragma de 3 vías con conexiones roscadas",
      "Electroválvula miniatura de diafragma de 2 vías para montaje en colector",
      "Electroválvula miniatura de diafragma de 2 vías con espigas",
      "Electroválvula miniatura de diafragma de 2 vías con conexiones roscadas",
      "Electroválvula miniatura de diafragma de 2 vías normalmente abierta para montaje en colector",
      "Electroválvula miniatura de diafragma de 2 vías normalmente abierta con espigas",
      "Electroválvula miniatura de diafragma de 2 vías normalmente abierta con conexiones roscadas"
    ],
    "descriptions": [
      "con base de PEEK para integración directa en el colector y conmutación entre reactivos y líquidos de lavado en instrumentos OEM.",
      "para conectar directamente tubos flexibles y conmutar entre el suministro de reactivos y el lavado de líneas.",
      "M6 o 1/4-28 UNF, con asientos disponibles en PEEK, PTFE, PVDF y otros materiales, para conmutar una línea común entre dos circuitos.",
      "con base de PEEK para integración en el colector; se cierra sin alimentación para controlar el suministro de reactivos en módulos de varias válvulas.",
      "para conexión directa a tubos flexibles en líneas de reactivos y lavado que deben cerrarse sin alimentación.",
      "M6 o 1/4-28 UNF y diafragmas disponibles en EPDM, FKM o FFKM, para abrir y cerrar líneas de distintos reactivos.",
      "para integración directa en el colector; permanece abierta sin alimentación y se cierra al energizarse, en circuitos que requieren una conexión abierta por defecto.",
      "con base de PEEK para líneas de suministro que permanecen abiertas y se cierran temporalmente mediante una señal de control.",
      "M6 o 1/4-28 UNF, para líneas de reactivos o lavado que permanecen abiertas sin alimentación."
    ],
    "separator": " ",
    "nc": {
      "label": "2 vías normalmente cerrada (NC)",
      "operation": "La válvula normalmente cerrada permanece cerrada sin alimentación y se abre al energizarse. Se utiliza en circuitos que deben cerrarse al cortar la alimentación. La válvula controla la conexión; una bomba o diferencia de presión impulsa el líquido."
    },
    "no": {
      "label": "2 vías normalmente abierta (NO)",
      "operation": "La válvula normalmente abierta permanece abierta sin alimentación y se cierra al energizarse. Se utiliza en circuitos que deben permanecer abiertos al cortar la alimentación. La válvula controla la conexión; una bomba o diferencia de presión impulsa el líquido."
    },
    "legacyNames": [
      "Electroválvula miniatura de diafragma de 2 vías para montaje en colector",
      "Electroválvula miniatura de diafragma de 2 vías con espigas",
      "Electroválvula miniatura de diafragma de 2 vías con conexiones roscadas"
    ]
  },
  "fr": {
    "names": [
      "Électrovanne miniature à membrane à 3 voies pour montage sur collecteur",
      "Électrovanne miniature à membrane à 3 voies avec embouts cannelés",
      "Électrovanne miniature à membrane à 3 voies avec raccordements filetés",
      "Électrovanne miniature à membrane à 2 voies pour montage sur collecteur",
      "Électrovanne miniature à membrane à 2 voies avec embouts cannelés",
      "Électrovanne miniature à membrane à 2 voies avec raccordements filetés",
      "Électrovanne miniature à membrane à 2 voies normalement ouverte pour montage sur collecteur",
      "Électrovanne miniature à membrane à 2 voies normalement ouverte avec embouts cannelés",
      "Électrovanne miniature à membrane à 2 voies normalement ouverte avec raccordements filetés"
    ],
    "descriptions": [
      "avec embase en PEEK pour intégration directe au collecteur et commutation entre réactifs et liquides de rinçage dans les instruments OEM.",
      "pour raccordement direct de tuyaux souples et commutation entre alimentation en réactifs et rinçage des conduites.",
      "M6 ou 1/4-28 UNF, avec sièges disponibles notamment en PEEK, PTFE ou PVDF, pour commuter une conduite commune entre deux circuits.",
      "avec embase en PEEK pour intégration au collecteur ; se ferme hors tension pour commander l’alimentation en réactifs des modules à plusieurs vannes.",
      "pour raccordement direct de tuyaux souples dans les circuits de réactifs et de rinçage devant se fermer hors tension.",
      "M6 ou 1/4-28 UNF et membranes au choix en EPDM, FKM ou FFKM, pour commander le passage de différents réactifs.",
      "pour intégration directe au collecteur ; reste ouverte hors tension et se ferme sous tension, dans les circuits nécessitant une connexion ouverte par défaut.",
      "avec embase en PEEK pour les conduites d’alimentation restant ouvertes et se fermant temporairement sur un signal de commande.",
      "M6 ou 1/4-28 UNF, pour les circuits de réactifs ou de rinçage restant ouverts hors tension."
    ],
    "separator": " ",
    "nc": {
      "label": "2 voies normalement fermée (NC)",
      "operation": "La vanne normalement fermée est fermée hors tension et s’ouvre sous tension. Elle convient aux circuits devant se fermer à la coupure de courant. La vanne commande la connexion ; une pompe ou une différence de pression entraîne le liquide."
    },
    "no": {
      "label": "2 voies normalement ouverte (NO)",
      "operation": "La vanne normalement ouverte est ouverte hors tension et se ferme sous tension. Elle convient aux circuits devant rester ouverts à la coupure de courant. La vanne commande la connexion ; une pompe ou une différence de pression entraîne le liquide."
    },
    "legacyNames": [
      "Électrovanne miniature à membrane à 2 voies pour montage sur collecteur",
      "Électrovanne miniature à membrane à 2 voies avec embouts cannelés",
      "Électrovanne miniature à membrane à 2 voies avec raccordements filetés"
    ]
  },
  "ko": {
    "names": [
      "3방향 매니폴드 장착형 소형 다이어프램 솔레노이드 밸브",
      "3방향 바브 연결형 소형 다이어프램 솔레노이드 밸브",
      "3방향 나사 연결형 소형 다이어프램 솔레노이드 밸브",
      "2방향 매니폴드 장착형 소형 다이어프램 솔레노이드 밸브",
      "2방향 바브 연결형 소형 다이어프램 솔레노이드 밸브",
      "2방향 나사 연결형 소형 다이어프램 솔레노이드 밸브",
      "2방향 상시 열림 매니폴드 장착형 소형 다이어프램 솔레노이드 밸브",
      "2방향 상시 열림 바브 연결형 소형 다이어프램 솔레노이드 밸브",
      "2방향 상시 열림 나사 연결형 소형 다이어프램 솔레노이드 밸브"
    ],
    "descriptions": [
      "PEEK 베이스로 매니폴드에 직접 장착하여 OEM 기기의 시약 및 세척액 유로를 전환합니다.",
      "바브 포트에 연질 튜브를 직접 연결하여 시약 공급과 배관 세척 사이의 유로 전환에 사용합니다.",
      "M6 또는 1/4-28 UNF 포트와 PEEK, PTFE, PVDF 등의 밸브 시트 재질 옵션을 제공하며 공통 배관을 두 유로 사이에서 전환합니다.",
      "PEEK 베이스로 매니폴드에 통합되며 전원 차단 시 닫혀 다중 밸브 유체 모듈의 시약 공급을 제어합니다.",
      "연질 튜브를 직접 연결하며 전원 차단 시 닫혀야 하는 시약 및 세척액 배관에 사용합니다.",
      "M6 또는 1/4-28 UNF 포트와 EPDM, FKM 또는 FFKM 다이어프램 옵션을 제공하여 다양한 시약 배관의 개폐를 제어합니다.",
      "매니폴드에 직접 장착되며 전원 차단 시 열리고 통전 시 닫혀 기본적으로 연결 상태를 유지해야 하는 기기 유로에 적합합니다.",
      "PEEK 베이스와 바브 튜브 포트를 갖추어 평상시 열린 상태를 유지하다가 제어 신호에 따라 일시적으로 닫혀야 하는 공급 배관에 사용합니다.",
      "M6 또는 1/4-28 UNF 포트를 제공하며 전원 차단 시에도 열려 있어야 하는 시약 또는 세척 배관에 사용합니다."
    ],
    "separator": "는 ",
    "nc": {
      "label": "2방향 상시 닫힘(NC)",
      "operation": "상시 닫힘 밸브는 전원이 꺼지면 닫히고 전원을 인가하면 열립니다. 전원 차단 시 닫혀야 하는 유로에 사용합니다. 밸브는 연결 상태를 제어하며 액체는 펌프 또는 압력차로 이동합니다."
    },
    "no": {
      "label": "2방향 상시 열림(NO)",
      "operation": "상시 열림 밸브는 전원이 꺼지면 열리고 전원을 인가하면 닫힙니다. 전원 차단 시에도 열려 있어야 하는 유로에 사용합니다. 밸브는 연결 상태를 제어하며 액체는 펌프 또는 압력차로 이동합니다."
    },
    "legacyNames": [
      "2방향 매니폴드 장착형 소형 다이어프램 솔레노이드 밸브",
      "2방향 바브 연결형 소형 다이어프램 솔레노이드 밸브",
      "2방향 나사 연결형 소형 다이어프램 솔레노이드 밸브"
    ]
  },
  "ru": {
    "names": [
      "Трёхходовой миниатюрный мембранный электромагнитный клапан для монтажа на коллектор",
      "Трёхходовой миниатюрный мембранный электромагнитный клапан со штуцерами под шланг",
      "Трёхходовой миниатюрный мембранный электромагнитный клапан с резьбовыми портами",
      "Двухходовой миниатюрный мембранный электромагнитный клапан для монтажа на коллектор",
      "Двухходовой миниатюрный мембранный электромагнитный клапан со штуцерами под шланг",
      "Двухходовой миниатюрный мембранный электромагнитный клапан с резьбовыми портами",
      "Двухходовой нормально открытый миниатюрный мембранный электромагнитный клапан для монтажа на коллектор",
      "Двухходовой нормально открытый миниатюрный мембранный электромагнитный клапан со штуцерами под шланг",
      "Двухходовой нормально открытый миниатюрный мембранный электромагнитный клапан с резьбовыми портами"
    ],
    "descriptions": [
      "с основанием из PEEK для прямой установки на коллектор и переключения линий реагентов и промывки в OEM-приборах.",
      "для прямого подключения гибких трубок и переключения между подачей реагентов и промывкой линий.",
      "M6 или 1/4-28 UNF, с вариантами седла из PEEK, PTFE, PVDF и других материалов, для переключения общей линии между двумя жидкостными трактами.",
      "с основанием из PEEK для установки на коллектор; закрывается без питания и управляет подачей реагентов в многоклапанных жидкостных модулях.",
      "для прямого подключения гибких трубок в линиях реагентов и промывки, закрывающихся без питания.",
      "M6 или 1/4-28 UNF и вариантами мембраны из EPDM, FKM или FFKM, для открытия и перекрытия линий различных реагентов.",
      "для прямой установки на коллектор; открыт без питания и закрывается при подаче напряжения, для линий приборов с открытым состоянием по умолчанию.",
      "с основанием из PEEK для линий подачи, которые остаются открытыми и временно закрываются по управляющему сигналу.",
      "M6 или 1/4-28 UNF, для линий реагентов или промывки, остающихся открытыми без питания."
    ],
    "separator": " ",
    "nc": {
      "label": "Двухходовой нормально закрытый (NC)",
      "operation": "Нормально закрытый клапан закрыт без питания и открывается при подаче напряжения. Он предназначен для линий, которые должны закрываться при отключении питания. Клапан управляет соединением; жидкость перемещается насосом или перепадом давления."
    },
    "no": {
      "label": "Двухходовой нормально открытый (NO)",
      "operation": "Нормально открытый клапан открыт без питания и закрывается при подаче напряжения. Он предназначен для линий, которые должны оставаться открытыми при отключении питания. Клапан управляет соединением; жидкость перемещается насосом или перепадом давления."
    },
    "legacyNames": [
      "Двухходовой миниатюрный мембранный электромагнитный клапан для монтажа на коллектор",
      "Двухходовой миниатюрный мембранный электромагнитный клапан со штуцерами под шланг",
      "Двухходовой миниатюрный мембранный электромагнитный клапан с резьбовыми портами"
    ]
  }
} as const;

// Shared selection-card H2 and detail-page H1 copy. Keep short names
// separate so this copy update does not rename URLs or metadata titles.
const chineseConfigurationHeadings: Record<string, string> = {
  "3-way-base": "二位三通微型隔膜电磁阀 SV10-P-3，底座安装式，可多阀集成于液路板，响应≤15 ms。",
  "3-way-barbed": "三通微型电磁阀管路型 SV10-B16-3，倒刺接口，适用于医疗和实验室仪器。",
  "3-way-threaded": "三通微型螺纹电磁阀 SV10-M6/U28-3，提供 M6 或 1/4-28 UNF 接口，快速响应。",
  "2-way-nc-base": "二位二通常闭微型隔膜电磁阀 SV10-P-2NC，底座安装式，用于采样与清洗液控制。",
  "2-way-nc-barbed": "二通常闭微型隔膜电磁阀 SV10-B16-2NC，倒刺接口，结构紧凑。",
  "2-way-nc-threaded": "螺纹二通微型电磁阀 SV10-M6/U28-2NC，膜片可选 FKM、FFKM，可提供 OEM 解决方案。",
  "2-way-no-base": "二通常开微型隔膜电磁阀 SV10-P-2NO，基板安装，低死容积摇臂结构。",
  "2-way-no-barbed": "二通常开微型隔膜电磁阀 SV10-B16-2NO，宝塔接口，适用于医疗和实验室仪器。",
  "2-way-no-threaded": "二通常开微型电磁阀 SV10-M6/U28-2NO，螺纹接口，适用于采样和清洗。",
};

// Use natural industry terminology in each market; model identities and claims
// match the approved Chinese copy. Micro and miniature are distributed by model.
const localizedConfigurationHeadings: Record<Exclude<SelectionLocale, "zh">, Record<string, string>> = {
  en: {
    "3-way-base": "Miniature 3-Way Diaphragm Solenoid Valve SV10-P-3, Base Mounted for Manifold Integration, ≤15 ms Response",
    "3-way-barbed": "3-Way Micro Diaphragm Solenoid Valve SV10-B16-3 with Barbed Ports for Medical and Laboratory Instruments",
    "3-way-threaded": "Threaded 3-Way Miniature Diaphragm Solenoid Valve SV10-M6/U28-3, M6 or 1/4-28 UNF Ports, Fast Response",
    "2-way-nc-base": "2-Way Normally Closed Micro Diaphragm Solenoid Valve SV10-P-2NC, Base Mounted for Sampling and Wash-Fluid Control",
    "2-way-nc-barbed": "Compact 2-Way Normally Closed Miniature Diaphragm Solenoid Valve SV10-B16-2NC with Barbed Ports",
    "2-way-nc-threaded": "Threaded 2-Way Micro Diaphragm Solenoid Valve SV10-M6/U28-2NC, FKM or FFKM Diaphragms for OEM Integration",
    "2-way-no-base": "2-Way Normally Open Miniature Diaphragm Solenoid Valve SV10-P-2NO, Base-Mounted Rocker Design with Low Dead Volume",
    "2-way-no-barbed": "Normally Open 2-Way Micro Diaphragm Solenoid Valve SV10-B16-2NO, Barbed Ports for Medical and Laboratory Instruments",
    "2-way-no-threaded": "Threaded 2-Way Normally Open Miniature Diaphragm Solenoid Valve SV10-M6/U28-2NO for Sampling and Rinsing",
  },
  es: {
    "3-way-base": "Electroválvula miniatura de diafragma de 3 vías SV10-P-3, montaje en base para integración en colector, respuesta ≤15 ms",
    "3-way-barbed": "Microelectroválvula de diafragma de 3 vías SV10-B16-3, conexiones de espiga para equipos médicos y de laboratorio",
    "3-way-threaded": "Electroválvula miniatura de diafragma de 3 vías SV10-M6/U28-3, conexiones roscadas M6 o 1/4-28 UNF y respuesta rápida",
    "2-way-nc-base": "Electroválvula miniatura de diafragma de 2 vías normalmente cerrada SV10-P-2NC, montaje en base para muestreo y control del líquido de lavado",
    "2-way-nc-barbed": "Microelectroválvula de diafragma de 2 vías normalmente cerrada SV10-B16-2NC, diseño compacto con conexiones de espiga",
    "2-way-nc-threaded": "Electroválvula miniatura de diafragma de 2 vías SV10-M6/U28-2NC, conexiones roscadas y diafragmas FKM o FFKM para integración OEM",
    "2-way-no-base": "Electroválvula miniatura de diafragma de 2 vías normalmente abierta SV10-P-2NO, montaje en base y mecanismo basculante de bajo volumen muerto",
    "2-way-no-barbed": "Microelectroválvula de diafragma de 2 vías normalmente abierta SV10-B16-2NO, conexiones de espiga para equipos médicos y de laboratorio",
    "2-way-no-threaded": "Electroválvula miniatura de diafragma de 2 vías normalmente abierta SV10-M6/U28-2NO, conexiones roscadas para muestreo y lavado",
  },
  fr: {
    "3-way-base": "Électrovanne miniature à membrane 3 voies SV10-P-3, montage sur embase pour intégration au collecteur, réponse ≤15 ms",
    "3-way-barbed": "Micro-électrovanne à membrane 3 voies SV10-B16-3, embouts cannelés pour instruments médicaux et de laboratoire",
    "3-way-threaded": "Électrovanne miniature à membrane 3 voies SV10-M6/U28-3, ports filetés M6 ou 1/4-28 UNF et réponse rapide",
    "2-way-nc-base": "Électrovanne miniature à membrane 2 voies normalement fermée SV10-P-2NC, montage sur embase pour échantillonnage et commande du liquide de rinçage",
    "2-way-nc-barbed": "Micro-électrovanne à membrane 2 voies normalement fermée SV10-B16-2NC, conception compacte avec embouts cannelés",
    "2-way-nc-threaded": "Électrovanne miniature à membrane 2 voies SV10-M6/U28-2NC, ports filetés et membranes FKM ou FFKM pour intégration OEM",
    "2-way-no-base": "Électrovanne miniature à membrane 2 voies normalement ouverte SV10-P-2NO, montage sur embase et mécanisme à bascule à faible volume mort",
    "2-way-no-barbed": "Micro-électrovanne à membrane 2 voies normalement ouverte SV10-B16-2NO, embouts cannelés pour instruments médicaux et de laboratoire",
    "2-way-no-threaded": "Électrovanne miniature à membrane 2 voies normalement ouverte SV10-M6/U28-2NO, ports filetés pour échantillonnage et rinçage",
  },
  ko: {
    "3-way-base": "매니폴드 통합용 베이스 장착형 3방향 소형 다이어프램 솔레노이드 밸브 SV10-P-3, 응답 시간 ≤15 ms",
    "3-way-barbed": "의료 및 실험실 기기용 3방향 마이크로 다이어프램 솔레노이드 밸브 SV10-B16-3, 바브 포트",
    "3-way-threaded": "3방향 소형 다이어프램 솔레노이드 밸브 SV10-M6/U28-3, M6 또는 1/4-28 UNF 나사 포트, 빠른 응답",
    "2-way-nc-base": "샘플링 및 세척액 제어용 2방향 상시 닫힘 다이어프램 솔레노이드 밸브 SV10-P-2NC, 소형 베이스 장착형",
    "2-way-nc-barbed": "2방향 상시 닫힘 소형 다이어프램 솔레노이드 밸브 SV10-B16-2NC, 바브 포트와 콤팩트한 구조",
    "2-way-nc-threaded": "OEM 통합용 나사 연결형 2방향 소형 다이어프램 솔레노이드 밸브 SV10-M6/U28-2NC, FKM·FFKM 다이어프램 옵션",
    "2-way-no-base": "2방향 상시 열림 소형 다이어프램 솔레노이드 밸브 SV10-P-2NO, 베이스 장착형, 낮은 데드 볼륨의 로커 구조",
    "2-way-no-barbed": "의료 및 실험실 기기용 2방향 상시 열림 마이크로 다이어프램 솔레노이드 밸브 SV10-B16-2NO, 바브 포트",
    "2-way-no-threaded": "샘플링 및 세척용 2방향 상시 열림 소형 다이어프램 솔레노이드 밸브 SV10-M6/U28-2NO, 나사 포트",
  },
  ru: {
    "3-way-base": "Миниатюрный трёхходовой мембранный электромагнитный клапан SV10-P-3 для монтажа на коллектор, время срабатывания ≤15 мс",
    "3-way-barbed": "Трёхходовой миниатюрный мембранный электромагнитный клапан SV10-B16-3 со штуцерами под шланг для медицинских и лабораторных приборов",
    "3-way-threaded": "Трёхходовой миниатюрный мембранный электромагнитный клапан SV10-M6/U28-3, резьбовые порты M6 или 1/4-28 UNF, быстрое срабатывание",
    "2-way-nc-base": "Двухходовой нормально закрытый миниатюрный мембранный электромагнитный клапан SV10-P-2NC для монтажа на коллектор, отбора проб и управления промывкой",
    "2-way-nc-barbed": "Двухходовой нормально закрытый миниатюрный мембранный электромагнитный клапан SV10-B16-2NC, компактный корпус со штуцерами под шланг",
    "2-way-nc-threaded": "Двухходовой миниатюрный мембранный электромагнитный клапан SV10-M6/U28-2NC с резьбовыми портами, мембраны FKM или FFKM для OEM-интеграции",
    "2-way-no-base": "Двухходовой нормально открытый миниатюрный мембранный электромагнитный клапан SV10-P-2NO для монтажа на коллектор, коромысловая конструкция с малым мёртвым объёмом",
    "2-way-no-barbed": "Двухходовой нормально открытый миниатюрный мембранный электромагнитный клапан SV10-B16-2NO со штуцерами под шланг для медицинских и лабораторных приборов",
    "2-way-no-threaded": "Двухходовой нормально открытый миниатюрный мембранный электромагнитный клапан SV10-M6/U28-2NO с резьбовыми портами для отбора проб и промывки",
  },
};

export function getSolenoidStateCopy(locale: SelectionLocale, state: "nc" | "no") {
  return copy[locale][state];
}
export function getSolenoidCardCopy(slug: string, locale: SelectionLocale) {
  const index = solenoidConfigurations.findIndex(c => c.slug === slug);
  const configuration = getSolenoidConfiguration(slug);
  if (!configuration) return undefined;
  const text = copy[locale];
  const connectionIndex = ["base", "barbed", "threaded"].indexOf(configuration.connection);
  const name = index < 0 ? text.legacyNames[connectionIndex] : text.names[index];
  const description = text.descriptions[index < 0 ? 3 + connectionIndex : index];
  const heading = (locale === "zh" ? chineseConfigurationHeadings[slug] : localizedConfigurationHeadings[locale][slug])
    ?? name + text.separator + description;
  return {model: configuration.model, name, description, heading};
}
