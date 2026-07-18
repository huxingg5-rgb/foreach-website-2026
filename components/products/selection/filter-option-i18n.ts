export type ProductFilterLocale = "zh" | "zh-CN" | "en" | "es" | "fr" | "ko" | "ru";

type FilterOptionLabelMap = Partial<Record<ProductFilterLocale, string>>;

const FILTER_OPTION_LABELS: Record<string, FilterOptionLabelMap> = {
  "柱塞泵": {
    zh: "柱塞泵",
    en: "Plunger Pump",
    es: "Bomba de émbolo",
    fr: "Pompe à piston",
    ko: "플런저 펌프",
    ru: "Плунжерный насос",
  },
  "隔膜泵": {
    zh: "隔膜泵",
    en: "Diaphragm Pump",
    es: "Bomba de diafragma",
    fr: "Pompe à membrane",
    ko: "다이어프램 펌프",
    ru: "Мембранный насос",
  },
  "移液泵": {
    zh: "移液泵",
    en: "Pipetting Pump",
    es: "Bomba de pipeteo",
    fr: "Pompe de pipetage",
    ko: "피펫팅 펌프",
    ru: "Пипетирующий насос",
  },
  "无阀泵": {
    zh: "无阀泵",
    en: "Valveless Pump",
    es: "Bomba sin válvulas",
    fr: "Pompe sans valve",
    ko: "밸브리스 펌프",
    ru: "Бесклапанный насос",
  },
  "注射泵": {
    zh: "注射泵",
    en: "Syringe Pump",
    es: "Bomba de jeringa",
    fr: "Pompe seringue",
    ko: "시린지 펌프",
    ru: "Шприцевой насос",
  },

  "EA 常规柱塞泵": {
    zh: "EA 常规柱塞泵",
    en: "EA Standard Plunger Pump",
    es: "Bomba de émbolo estándar EA",
    fr: "Pompe à piston standard EA",
    ko: "EA 표준 플런저 펌프",
    ru: "Стандартный плунжерный насос EA",
  },
  "SM 微型柱塞泵": {
    zh: "SM 微型柱塞泵",
    en: "SM Miniature Plunger Pump",
    es: "Bomba de émbolo miniatura SM",
    fr: "Pompe à piston miniature SM",
    ko: "SM 소형 플런저 펌프",
    ru: "Миниатюрный плунжерный насос SM",
  },
  "TM 超微型柱塞泵": {
    zh: "TM 超微型柱塞泵",
    en: "TM Ultra-Compact Plunger Pump",
    es: "Bomba de émbolo ultracompacta TM",
    fr: "Pompe à piston ultra-compacte TM",
    ko: "TM 초소형 플런저 펌프",
    ru: "Сверхкомпактный плунжерный насос TM",
  },

  "DPL 液体隔膜泵": {
    zh: "DPL 液体隔膜泵",
    en: "DPL Liquid Diaphragm Pump",
    es: "Bomba de diafragma para líquidos DPL",
    fr: "Pompe à membrane liquide DPL",
    ko: "DPL 액체 다이어프램 펌프",
    ru: "Мембранный насос DPL для жидкостей",
  },
  "DPL 气体隔膜泵": {
    zh: "DPL 气体隔膜泵",
    en: "DPL Gas Diaphragm Pump",
    es: "Bomba de diafragma para gas DPL",
    fr: "Pompe à membrane gaz DPL",
    ko: "DPL 가스 다이어프램 펌프",
    ru: "Мембранный насос DPL для газа",
  },
  "DPL 气液隔膜泵": {
    zh: "DPL 气液隔膜泵",
    en: "DPL Gas-Liquid Diaphragm Pump",
    es: "Bomba de diafragma gas-líquido DPL",
    fr: "Pompe à membrane gaz-liquide DPL",
    ko: "DPL 기체-액체 다이어프램 펌프",
    ru: "Мембранный насос DPL для газа и жидкости",
  },

  "液泵": {
    zh: "液泵",
    en: "Liquid Pump",
    es: "Bomba para líquidos",
    fr: "Pompe pour liquides",
    ko: "액체 펌프",
    ru: "Жидкостный насос",
  },
  "气液混合泵": {
    zh: "气液混合泵",
    en: "Gas-Liquid Mixing Pump",
    es: "Bomba de mezcla gas-líquido",
    fr: "Pompe de mélange gaz-liquide",
    ko: "기액 혼합 펌프",
    ru: "Насос для газожидкостной смеси",
  },
  "有刷电机": {
    zh: "有刷电机",
    en: "Brushed Motor",
    es: "Motor con escobillas",
    fr: "Moteur à balais",
    ko: "브러시 모터",
    ru: "Щёточный двигатель",
  },
  "无刷电机": {
    zh: "无刷电机",
    en: "Brushless Motor",
    es: "Motor sin escobillas",
    fr: "Moteur sans balais",
    ko: "브러시리스 모터",
    ru: "Бесщёточный двигатель",
  },
  "SMTP2 可编程气体置换式移液泵": {
    zh: "SMTP2 可编程气体置换式移液泵",
    en: "SMTP2 Programmable Gas Displacement Pipetting Pump",
    es: "Bomba de pipeteo por desplazamiento de aire programable SMTP2",
    fr: "Pompe de pipetage à déplacement d’air programmable SMTP2",
    ko: "SMTP2 프로그래머블 공기 치환식 피펫팅 펌프",
    ru: "Программируемый пипетирующий насос SMTP2 с воздушным вытеснением",
  },
  "SMTP4 气体置换式移液泵": {
    zh: "SMTP4 气体置换式移液泵",
    en: "SMTP4 Gas Displacement Pipetting Pump",
    es: "Bomba de pipeteo por desplazamiento de aire SMTP4",
    fr: "Pompe de pipetage à déplacement d’air SMTP4",
    ko: "SMTP4 공기 치환식 피펫팅 펌프",
    ru: "Пипетирующий насос SMTP4 с воздушным вытеснением",
  },

  "HMD 电磁阀系列注射泵": {
    zh: "HMD 电磁阀系列注射泵",
    en: "HMD Solenoid Valve Syringe Pump",
    es: "Bomba de jeringa con válvula solenoide HMD",
    fr: "Pompe seringue à électrovanne HMD",
    ko: "HMD 솔레노이드 밸브 시린지 펌프",
    ru: "Шприцевой насос HMD с электромагнитным клапаном",
  },
  "HLD 旋转阀系列注射泵": {
    zh: "HLD 旋转阀系列注射泵",
    en: "HLD Rotary Valve Syringe Pump",
    es: "Bomba de jeringa con válvula rotativa HLD",
    fr: "Pompe seringue à vanne rotative HLD",
    ko: "HLD 로터리 밸브 시린지 펌프",
    ru: "Шприцевой насос HLD с поворотным клапаном",
  },

  "RPL 单头无阀泵": {
    zh: "RPL 单头无阀泵",
    en: "RPL Single-Head Valveless Pump",
    es: "Bomba sin válvulas de un cabezal RPL",
    fr: "Pompe sans valve mono-tête RPL",
    ko: "RPL 단일 헤드 밸브리스 펌프",
    ru: "Одноголовочный бесклапанный насос RPL",
  },
  "DRPL 双头无阀泵": {
    zh: "DRPL 双头无阀泵",
    en: "DRPL Dual-Head Valveless Pump",
    es: "Bomba sin válvulas de doble cabezal DRPL",
    fr: "Pompe sans valve double tête DRPL",
    ko: "DRPL 듀얼 헤드 밸브리스 펌프",
    ru: "Двухголовочный бесклапанный насос DRPL",
  },

  "多通道旋转阀": {
    zh: "多通道旋转阀",
    en: "Multi-Channel Rotary Valve",
    es: "Válvula rotativa multicanal",
    fr: "Vanne rotative multicanal",
    ko: "다채널 로터리 밸브",
    ru: "Многоканальный поворотный клапан",
  },
  "高压旋转阀": {
    zh: "高压旋转阀",
    en: "High-Pressure Rotary Valve",
    es: "Válvula rotativa de alta presión",
    fr: "Vanne rotative haute pression",
    ko: "고압 로터리 밸브",
    ru: "Поворотный клапан высокого давления",
  },
  "电磁阀": {
    zh: "电磁阀",
    en: "Solenoid Valve",
    es: "Válvula solenoide",
    fr: "Électrovanne",
    ko: "솔레노이드 밸브",
    ru: "Электромагнитный клапан",
  },
  "阀系列": {
    es: "Serie de válvulas",
    fr: "Série de vannes",
    ko: "밸브 시리즈",
    ru: "Серия клапанов",
  },

  "针系列": {
    zh: "针系列",
    en: "Probe Series",
    es: "Serie de sondas",
    fr: "Série de sondes",
    ko: "프로브 시리즈",
    ru: "Серия зондов",
  },
  "采样针": {
    zh: "采样针",
    en: "Sampling Probe",
    es: "Sonda de muestreo",
    fr: "Sonde d’échantillonnage",
    ko: "샘플링 프로브",
    ru: "Пробоотборная игла",
  },
  "刺穿针": {
    zh: "刺穿针",
    en: "Piercing Probe",
    es: "Sonda de perforación",
    fr: "Sonde de perçage",
    ko: "피어싱 프로브",
    ru: "Прокалывающая игла",
  },
  "清洗针": {
    zh: "清洗针",
    en: "Wash Probe",
    es: "Sonda de lavado",
    fr: "Sonde de lavage",
    ko: "세척 프로브",
    ru: "Промывочная игла",
  },
  "搅拌杆": {
    zh: "搅拌杆",
    en: "Stirring Paddle",
    es: "Paleta agitadora",
    fr: "Palette d’agitation",
    ko: "교반 패들",
    ru: "Мешалка",
  },

  "智控模块": {
    zh: "智控模块",
    en: "Smart Control Module",
    es: "Módulo de control inteligente",
    fr: "Module de contrôle intelligent",
    ko: "스마트 제어 모듈",
    ru: "Интеллектуальный модуль управления",
  },
  "压力检测模块": {
    zh: "压力检测模块",
    en: "Pressure Monitoring Module",
    es: "Módulo de monitoreo de presión",
    fr: "Module de surveillance de pression",
    ko: "압력 모니터링 모듈",
    ru: "Модуль контроля давления",
  },
  "气泡检测模块": {
    zh: "气泡检测模块",
    en: "Air Bubble Detection Module",
    es: "Módulo de detección de burbujas de aire",
    fr: "Module de détection de bulles d’air",
    ko: "기포 감지 모듈",
    ru: "Модуль обнаружения пузырьков воздуха",
  },

  "标滚平底接头": {
    zh: "标滚平底接头",
    en: "Standard Flanged Fittings",
    es: "Racores con brida estándar",
    fr: "Raccords à collerette standard",
    ko: "표준 플랜지 피팅",
    ru: "Стандартные фланцевые фитинги",
  },

  "标准平底接头": {
    zh: "标准平底接头",
    en: "Standard Flanged Fittings",
    es: "Racores con brida estándar",
    fr: "Raccords à collerette standard",
    ko: "표준 플랜지 피팅",
    ru: "Стандартные фланцевые фитинги",
  },

  "紧凑平底接头": {
    zh: "紧凑平底接头",
    en: "Compact Flanged Fittings",
    es: "Racores con brida compactos",
    fr: "Raccords à collerette compacts",
    ko: "컴팩트 플랜지 피팅",
    ru: "Компактные фланцевые фитинги",
  },

  "标滚卡箍接头": {
    zh: "标滚卡箍接头",
    en: "Standard Ferrule Fittings",
    es: "Racores con férula estándar",
    fr: "Raccords à bague standard",
    ko: "표준 페룰 피팅",
    ru: "Стандартные фитинги с обжимной втулкой",
  },

  "标准卡箍接头": {
    zh: "标准卡箍接头",
    en: "Standard Ferrule Fittings",
    es: "Racores con férula estándar",
    fr: "Raccords à bague standard",
    ko: "표준 페룰 피팅",
    ru: "Стандартные фитинги с обжимной втулкой",
  },

  "紧凑卡箍接头": {
    zh: "紧凑卡箍接头",
    en: "Compact Ferrule Fittings",
    es: "Racores con férula compactos",
    fr: "Raccords à bague compacts",
    ko: "컴팩트 페룰 피팅",
    ru: "Компактные фитинги с обжимной втулкой",
  },

  "卡环接头": {
    zh: "卡环接头",
    en: "Snap Ring Fittings",
    es: "Racores con anillo elástico",
    fr: "Raccords à bague d'arrêt",
    ko: "스냅 링 피팅",
    ru: "Фитинги со стопорным кольцом",
  },

  "高压接头": {
    zh: "高压接头",
    en: "High-Pressure Fittings",
    es: "Racores de alta presión",
    fr: "Raccords haute pression",
    ko: "고압 피팅",
    ru: "Фитинги высокого давления",
  },

  "本色": {
    zh: "本色",
    en: "Natural",
    es: "Natural",
    fr: "Naturel",
    ko: "내추럴",
    ru: "Натуральный",
  },

  "黑色": {
    zh: "黑色",
    en: "Black",
    es: "Negro",
    fr: "Noir",
    ko: "검정",
    ru: "Черный",
  },

  "蓝色": {
    zh: "蓝色",
    en: "Blue",
    es: "Azul",
    fr: "Bleu",
    ko: "파랑",
    ru: "Синий",
  },
  "直通型": {
    zh: "直通型",
    en: "Straight Through",
    es: "Recto",
    fr: "Droit",
    ko: "스트레이트형",
    ru: "Прямой",
  },

  "L型": {
    zh: "L型",
    en: "Elbow",
    es: "Codo",
    fr: "Coude",
    ko: "엘보형",
    ru: "Угловой",
  },

  "T型": {
    zh: "T型",
    en: "Tee",
    es: "En T",
    fr: "En T",
    ko: "T형",
    ru: "Т-образный",
  },

  "Y型": {
    zh: "Y型",
    en: "Y",
    es: "En Y",
    fr: "En Y",
    ko: "Y형",
    ru: "Y-образный",
  },

  "π型": {
    zh: "π型",
    en: "π-Type",
    es: "Tipo π",
    fr: "Type π",
    ko: "π형",
    ru: "π-образный",
  },

  "十字型": {
    zh: "十字型",
    en: "Cross",
    es: "En cruz",
    fr: "En croix",
    ko: "크로스형",
    ru: "Крестообразный",
  },

  "倒刺堵头": {
    zh: "倒刺堵头",
    en: "Barbed Plug",
    es: "Tapón de espiga",
    fr: "Bouchon cannelé",
    ko: "바브 플러그",
    ru: "Штуцерная заглушка",
  },

  "白色": {
    zh: "白色",
    en: "White",
    es: "Blanco",
    fr: "Blanc",
    ko: "흰색",
    ru: "Белый",
  },

  "螺纹密封": {
    zh: "螺纹密封",
    en: "Thread Seal",
    es: "Sellado de rosca",
    fr: "Étanchéité par filetage",
    ko: "나사 밀봉",
    ru: "Резьбовое уплотнение",
  },

  "底面密封": {
    zh: "底面密封",
    en: "Bottom-Face Seal",
    es: "Sellado por cara inferior",
    fr: "Étanchéité par face d'appui",
    ko: "바닥면 밀봉",
    ru: "Уплотнение по торцевой поверхности",
  },

  "内螺纹转倒刺": {
    zh: "内螺纹转倒刺",
    en: "Female Thread to Barb",
    es: "Rosca hembra a espiga",
    fr: "Filetage femelle vers cannelure",
    ko: "암나사-바브 변환",
    ru: "Переход с внутренней резьбы на штуцер",
  },

  "可旋转直通型": {
    zh: "可旋转直通型",
    en: "Rotary Straight Through",
    es: "Recto giratorio",
    fr: "Droit orientable",
    ko: "회전 스트레이트형",
    ru: "Поворотный прямой",
  },

  "3.4 锥螺纹": {
    zh: "3.4 锥螺纹",
    en: "3.4 Tapered Thread",
    es: "Rosca cónica 3.4",
    fr: "Filetage conique 3.4",
    ko: "3.4 테이퍼 나사",
    ru: "Коническая резьба 3.4",
  },

  "LSL 固定芯子": {
    zh: "LSL 固定芯子",
    en: "Male Luer Stationary Lock",
    es: "Cierre Luer macho fijo LSL",
    fr: "Verrou Luer mâle fixe LSL",
    ko: "LSL 수 Luer 고정 잠금",
    ru: "Неподвижный фиксатор Luer male LSL",
  },

  "LRL 旋转芯子": {
    zh: "LRL 旋转芯子",
    en: "Male Luer Rotating Lock",
    es: "Cierre Luer macho giratorio LRL",
    fr: "Verrou Luer mâle rotatif LRL",
    ko: "LRL 수 Luer 회전 잠금",
    ru: "Поворотный фиксатор Luer male LRL",
  },

  "LPR 旋转锁圈": {
    zh: "LPR 旋转锁圈",
    en: "Male Luer Rotating Lock Ring Fitting",
    es: "Racor Luer macho con anillo giratorio LPR",
    fr: "Raccord Luer mâle à bague rotative LPR",
    ko: "LPR 수 Luer 회전 잠금 링 피팅",
    ru: "Фитинг Luer male с поворотным стопорным кольцом LPR",
  },

  "LPS 固定锁圈": {
    zh: "LPS 固定锁圈",
    en: "Male Luer Stationary Lock Ring Fitting",
    es: "Racor Luer macho con anillo fijo LPS",
    fr: "Raccord Luer mâle à bague fixe LPS",
    ko: "LPS 수 Luer 고정 잠금 링 피팅",
    ru: "Фитинг Luer male с неподвижным стопорным кольцом LPS",
  },

  "LP 一体式": {
    zh: "LP 一体式",
    en: "Male Luer Integral Lock Ring Fitting",
    es: "Racor Luer macho con anillo integrado LP",
    fr: "Raccord Luer mâle à bague intégrée LP",
    ko: "LP 수 Luer 일체형 잠금 링 피팅",
    ru: "Фитинг Luer male со встроенным стопорным кольцом LP",
  },

  "LS 母鲁尔": {
    zh: "LS 母鲁尔",
    en: "Female Luer Integral Fitting",
    es: "Racor Luer hembra integral LS",
    fr: "Raccord Luer femelle monobloc LS",
    ko: "LS 암 Luer 일체형 피팅",
    ru: "Цельный фитинг Luer female LS",
  },

  "PMLS 穿板母鲁尔": {
    zh: "PMLS 穿板母鲁尔",
    en: "Female Luer Panel Mount Fitting",
    es: "Racor Luer hembra para panel PMLS",
    fr: "Raccord Luer femelle traversée de panneau PMLS",
    ko: "PMLS 패널 장착형 암 Luer 피팅",
    ru: "Панельный фитинг Luer female PMLS",
  },

  "LCR 色环": {
    zh: "LCR 色环",
    en: "Color Coding Ring",
    es: "Anillo de identificación por color LCR",
    fr: "Bague de repérage couleur LCR",
    ko: "LCR 컬러 코딩 링",
    ru: "Цветовое маркировочное кольцо LCR",
  },

  "LPT 内螺纹套": {
    zh: "LPT 内螺纹套",
    en: "Luer Lock Ring",
    es: "Anillo de bloqueo Luer LPT",
    fr: "Bague de verrouillage Luer LPT",
    ko: "LPT Luer 잠금 링",
    ru: "Стопорное кольцо Luer LPT",
  },

  "LNS 滚花螺母": {
    zh: "LNS 滚花螺母",
    en: "Panel Mount Lock Nut",
    es: "Tuerca de bloqueo para panel LNS",
    fr: "Écrou de blocage pour panneau LNS",
    ko: "LNS 패널 장착 잠금 너트",
    ru: "Панельная стопорная гайка LNS",
  },

  "N - 本色": {
    zh: "N - 本色",
    en: "Natural",
    es: "N - Natural",
    fr: "N - Naturel",
    ko: "N - 내추럴",
    ru: "N - Натуральный",
  },

  "W - 白色": {
    zh: "W - 白色",
    en: "White",
    es: "W - Blanco",
    fr: "W - Blanc",
    ko: "W - 흰색",
    ru: "W - Белый",
  },

  "B - 黑色": {
    zh: "B - 黑色",
    en: "Black",
    es: "B - Negro",
    fr: "B - Noir",
    ko: "B - 검정",
    ru: "B - Черный",
  },

  "R - 红色": {
    zh: "R - 红色",
    en: "Red",
    es: "R - Rojo",
    fr: "R - Rouge",
    ko: "R - 빨강",
    ru: "R - Красный",
  },

  "G - 绿色": {
    zh: "G - 绿色",
    en: "Green",
    es: "G - Verde",
    fr: "G - Vert",
    ko: "G - 초록",
    ru: "G - Зеленый",
  },

  "U - 蓝色": {
    zh: "U - 蓝色",
    en: "Blue",
    es: "U - Azul",
    fr: "U - Bleu",
    ko: "U - 파랑",
    ru: "U - Синий",
  },

  "O - 橙色": {
    zh: "O - 橙色",
    en: "Orange",
    es: "O - Naranja",
    fr: "O - Orange",
    ko: "O - 주황",
    ru: "O - Оранжевый",
  },

  "Y - 黄色": {
    zh: "Y - 黄色",
    en: "Yellow",
    es: "Y - Amarillo",
    fr: "Y - Jaune",
    ko: "Y - 노랑",
    ru: "Y - Желтый",
  },

  "公端": {
    zh: "公端",
    en: "Male",
    es: "Macho",
    fr: "Mâle",
    ko: "수형",
    ru: "Штыревой",
  },

  "母端": {
    zh: "母端",
    en: "Female",
    es: "Hembra",
    fr: "Femelle",
    ko: "암형",
    ru: "Гнездовой",
  },

  "穿板": {
    zh: "穿板",
    en: "Panel Mount",
    es: "Montaje en panel",
    fr: "Montage sur panneau",
    ko: "패널 장착",
    ru: "Панельный монтаж",
  },

  "非穿板": {
    zh: "非穿板",
    en: "Non-Panel Mount",
    es: "Sin montaje en panel",
    fr: "Sans montage sur panneau",
    ko: "비패널 장착",
    ru: "Без панельного монтажа",
  },

  "带阀": {
    zh: "带阀",
    en: "Valved",
    es: "Con válvula",
    fr: "Avec clapet",
    ko: "밸브형",
    ru: "С клапаном",
  },

  "不带阀": {
    zh: "不带阀",
    en: "Non-Valved",
    es: "Sin válvula",
    fr: "Sans clapet",
    ko: "무밸브형",
    ru: "Без клапана",
  },

  "直通": {
    zh: "直通",
    en: "In-line",
    es: "En línea",
    fr: "En ligne",
    ko: "인라인",
    ru: "Прямоточный",
  },

  "弯头": {
    zh: "弯头",
    en: "Elbow",
    es: "Codo",
    fr: "Coude",
    ko: "엘보",
    ru: "Угловой",
  },

  "弯头型": {
    zh: "弯头型",
    en: "Elbow",
    es: "Codo",
    fr: "Coude",
    ko: "엘보형",
    ru: "Угловой",
  },

  "二通": {
    zh: "二通",
    en: "2-Way",
    es: "2 vías",
    fr: "2 voies",
    ko: "2포트",
    ru: "2-ходовой",
  },

  "三通": {
    zh: "三通",
    en: "3-Way",
    es: "3 vías",
    fr: "3 voies",
    ko: "3포트",
    ru: "3-ходовой",
  },

  "穿板倒刺接头": {
    zh: "穿板倒刺接头",
    en: "Bulkhead Barbed Fitting",
    es: "Racor de espiga pasamuros",
    fr: "Raccord cannelé traversée de cloison",
    ko: "벌크헤드 바브 피팅",
    ru: "Панельный штуцерный фитинг",
  },

  "六角螺母": {
    zh: "六角螺母",
    en: "Hex Nut",
    es: "Tuerca hexagonal",
    fr: "Écrou hexagonal",
    ko: "육각 너트",
    ru: "Шестигранная гайка",
  },

  "过滤器": {
    zh: "过滤器",
    en: "Filters",
    es: "Filtros",
    fr: "Filtres",
    ko: "필터",
    ru: "Фильтры",
  },

  "单向阀": {
    zh: "单向阀",
    en: "Check Valves",
    es: "Válvulas de retención",
    fr: "Clapets anti-retour",
    ko: "체크 밸브",
    ru: "Обратные клапаны",
  },
  "过滤器与单向阀": {
    es: "Filtros y válvulas de retención",
    fr: "Filtres et clapets anti-retour",
    ko: "필터 및 체크 밸브",
    ru: "Фильтры и обратные клапаны",
  },

};

function normalizeProductFilterLocale(locale?: string): ProductFilterLocale {
  if (locale === "zh-CN") return "zh";
  if (locale === "en" || locale === "es" || locale === "fr" || locale === "ko" || locale === "ru") {
    return locale;
  }
  return "zh";
}

export function getLocalizedFilterOptionLabel(value: string | number | null | undefined, locale?: string): string {
  const rawValue = String(value ?? "");
  const normalizedLocale = normalizeProductFilterLocale(locale);
  const localized = FILTER_OPTION_LABELS[rawValue];

  if (!localized) {
    return rawValue;
  }

  return localized[normalizedLocale] ?? localized.en ?? rawValue;
}
