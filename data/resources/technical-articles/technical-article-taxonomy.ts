import type {
  ClassifiedTechnicalArticleItem,
  TechnicalArticleItem,
  TechnicalArticleLocale,
  TechnicalArticlePrimaryCategory,
  TechnicalArticleSecondaryCategory,
  TechnicalArticleTaxonomyPrimary,
} from "./technical-articles.types";

type LocalizedLabel = Record<TechnicalArticleLocale, string>;

function localized(
  zhCN: string,
  en: string,
  es: string,
  fr: string,
  ko: string,
  ru: string,
): LocalizedLabel {
  return { "zh-CN": zhCN, en, es, fr, ko, ru };
}

const taxonomyStructure: ReadonlyArray<{
  key: TechnicalArticlePrimaryCategory;
  children: readonly TechnicalArticleSecondaryCategory[];
}> = [
  {
    key: "pumps",
    children: [
      "miniature-diaphragm-pumps",
      "plunger-pumps",
      "syringe-pumps",
      "pipetting-pumps",
    ],
  },
  {
    key: "valves",
    children: [
      "solenoid-valves",
      "multi-port-valves",
      "high-pressure-valves",
      "fluid-switching-valves",
    ],
  },
  {
    key: "fittings-tubing",
    children: [
      "fittings",
      "ferrules-connectors",
      "flexible-rigid-tubing",
      "tubing-accessories",
    ],
  },
  {
    key: "fluid-detection-control",
    children: [
      "pressure-detection-control",
      "liquid-level-detection",
      "fluid-state-detection",
      "intelligent-fluid-control",
    ],
  },
  {
    key: "general-fluidics",
    children: [
      "flow-operating-point",
      "pressure-backpressure",
      "self-priming-negative-pressure-vacuum",
      "tubing-resistance-pressure-drop",
      "material-chemical-compatibility",
      "sealing-leakage",
      "bubbles-pulsation",
      "lifetime-reliability",
      "testing-validation",
    ],
  },
  {
    key: "applications-solutions",
    children: [
      "ivd-medical-devices",
      "life-science-synthetic-biology",
      "laboratory-automation",
      "analytical-instruments",
      "cleaning-waste",
      "reagent-sample-handling",
      "oem-fluidic-systems",
    ],
  },
];

const primaryLabels: Record<TechnicalArticlePrimaryCategory, LocalizedLabel> = {
  pumps: localized("泵类", "Pumps", "Bombas", "Pompes", "펌프", "Насосы"),
  valves: localized("阀类", "Valves", "Válvulas", "Vannes", "밸브", "Клапаны"),
  "fittings-tubing": localized(
    "接头与管路",
    "Fittings & Tubing",
    "Racores y tuberías",
    "Raccords et tuyauterie",
    "피팅 및 배관",
    "Фитинги и трубопроводы",
  ),
  "fluid-detection-control": localized(
    "液路检测与控制",
    "Fluid Detection & Control",
    "Detección y control de fluidos",
    "Détection et contrôle des fluides",
    "유로 감지 및 제어",
    "Контроль и мониторинг жидкости",
  ),
  "general-fluidics": localized(
    "通用液路技术",
    "General Fluidics",
    "Tecnología general de fluidos",
    "Technologies fluidiques générales",
    "범용 유체 기술",
    "Общие технологии жидкостных систем",
  ),
  "applications-solutions": localized(
    "应用与解决方案",
    "Applications & Solutions",
    "Aplicaciones y soluciones",
    "Applications et solutions",
    "응용 및 솔루션",
    "Применения и решения",
  ),
};

const secondaryLabels: Record<
  TechnicalArticleSecondaryCategory,
  LocalizedLabel
> = {
  "miniature-diaphragm-pumps": localized("微型隔膜泵", "Miniature Diaphragm Pumps", "Bombas miniatura de diafragma", "Pompes miniatures à membrane", "소형 다이어프램 펌프", "Миниатюрные мембранные насосы"),
  "plunger-pumps": localized("柱塞泵", "Plunger Pumps", "Bombas de émbolo", "Pompes à piston", "플런저 펌프", "Плунжерные насосы"),
  "syringe-pumps": localized("注射泵", "Syringe Pumps", "Bombas de jeringa", "Pompes seringues", "시린지 펌프", "Шприцевые насосы"),
  "pipetting-pumps": localized("移液泵", "Pipetting Pumps", "Bombas de pipeteo", "Pompes de pipetage", "피펫팅 펌프", "Пипетирующие насосы"),
  "solenoid-valves": localized("电磁阀", "Solenoid Valves", "Válvulas solenoides", "Électrovannes", "솔레노이드 밸브", "Электромагнитные клапаны"),
  "multi-port-valves": localized("多通阀", "Multi-port Valves", "Válvulas multivía", "Vannes multivoies", "멀티포트 밸브", "Многоходовые клапаны"),
  "high-pressure-valves": localized("高压阀", "High-pressure Valves", "Válvulas de alta presión", "Vannes haute pression", "고압 밸브", "Клапаны высокого давления"),
  "fluid-switching-valves": localized("液路切换阀", "Fluid Switching Valves", "Válvulas de conmutación de fluidos", "Vannes de commutation fluidique", "유로 전환 밸브", "Переключающие клапаны"),
  fittings: localized("接头", "Fittings", "Racores", "Raccords", "피팅", "Фитинги"),
  "ferrules-connectors": localized("卡环与连接件", "Ferrules & Connectors", "Férulas y conectores", "Bagues et connecteurs", "페룰 및 커넥터", "Феррулы и соединители"),
  "flexible-rigid-tubing": localized("软管与硬管", "Flexible & Rigid Tubing", "Tubos flexibles y rígidos", "Tubes souples et rigides", "연질 및 경질 튜브", "Гибкие и жёсткие трубки"),
  "tubing-accessories": localized("管路附件", "Tubing Accessories", "Accesorios de tubería", "Accessoires de tuyauterie", "배관 액세서리", "Принадлежности для трубопроводов"),
  "pressure-detection-control": localized("压力检测与控制", "Pressure Detection & Control", "Detección y control de presión", "Détection et régulation de pression", "압력 감지 및 제어", "Контроль и измерение давления"),
  "liquid-level-detection": localized("液面检测", "Liquid Level Detection", "Detección de nivel de líquido", "Détection de niveau de liquide", "액면 감지", "Контроль уровня жидкости"),
  "fluid-state-detection": localized("流体状态检测", "Fluid State Detection", "Detección del estado del fluido", "Détection de l’état du fluide", "유체 상태 감지", "Контроль состояния жидкости"),
  "intelligent-fluid-control": localized("智能液路控制", "Intelligent Fluidic Control", "Control inteligente de fluidos", "Contrôle fluidique intelligent", "지능형 유로 제어", "Интеллектуальное управление жидкостным трактом"),
  "flow-operating-point": localized("流量与工作点", "Flow & Operating Point", "Caudal y punto de trabajo", "Débit et point de fonctionnement", "유량 및 작동점", "Расход и рабочая точка"),
  "pressure-backpressure": localized("压力与背压", "Pressure & Backpressure", "Presión y contrapresión", "Pression et contre-pression", "압력 및 배압", "Давление и противодавление"),
  "self-priming-negative-pressure-vacuum": localized("自吸、负压与真空", "Self-priming, Negative Pressure & Vacuum", "Autocebado, presión negativa y vacío", "Auto-amorçage, dépression et vide", "자흡·부압·진공", "Самовсасывание, разрежение и вакуум"),
  "tubing-resistance-pressure-drop": localized("管路阻力与压降", "Tubing Resistance & Pressure Drop", "Resistencia de tuberías y caída de presión", "Résistance de tuyauterie et perte de charge", "배관 저항 및 압력 강하", "Сопротивление трубопровода и перепад давления"),
  "material-chemical-compatibility": localized("材料与化学兼容", "Material & Chemical Compatibility", "Compatibilidad química y de materiales", "Compatibilité des matériaux et chimique", "재료 및 화학적 호환성", "Совместимость материалов и реагентов"),
  "sealing-leakage": localized("密封与泄漏", "Sealing & Leakage", "Sellado y fugas", "Étanchéité et fuites", "밀봉 및 누설", "Герметичность и утечки"),
  "bubbles-pulsation": localized("气泡与脉动", "Bubbles & Pulsation", "Burbujas y pulsación", "Bulles et pulsations", "기포 및 맥동", "Пузырьки и пульсации"),
  "lifetime-reliability": localized("寿命与可靠性", "Lifetime & Reliability", "Vida útil y fiabilidad", "Durée de vie et fiabilité", "수명 및 신뢰성", "Ресурс и надёжность"),
  "testing-validation": localized("测试与验证", "Testing & Validation", "Pruebas y validación", "Essais et validation", "시험 및 검증", "Испытания и валидация"),
  "ivd-medical-devices": localized("IVD与医疗设备", "IVD & Medical Devices", "IVD y dispositivos médicos", "IVD et dispositifs médicaux", "IVD 및 의료기기", "IVD и медицинское оборудование"),
  "life-science-synthetic-biology": localized("生命科学与合成生物", "Life Science & Synthetic Biology", "Ciencias de la vida y biología sintética", "Sciences de la vie et biologie synthétique", "생명과학 및 합성생물학", "Науки о жизни и синтетическая биология"),
  "laboratory-automation": localized("实验室自动化", "Laboratory Automation", "Automatización de laboratorio", "Automatisation de laboratoire", "실험실 자동화", "Лабораторная автоматизация"),
  "analytical-instruments": localized("分析仪器", "Analytical Instruments", "Instrumentos analíticos", "Instruments analytiques", "분석 기기", "Аналитические приборы"),
  "cleaning-waste": localized("清洗与废液", "Cleaning & Waste", "Limpieza y residuos", "Nettoyage et effluents", "세척 및 폐액", "Промывка и отходы"),
  "reagent-sample-handling": localized("试剂与样本处理", "Reagent & Sample Handling", "Manipulación de reactivos y muestras", "Manipulation des réactifs et échantillons", "시약 및 시료 처리", "Работа с реагентами и образцами"),
  "oem-fluidic-systems": localized("OEM液路系统", "OEM Fluidic Systems", "Sistemas de fluidos OEM", "Systèmes fluidiques OEM", "OEM 유로 시스템", "Жидкостные системы OEM"),
};

const tagLabels = {
  selection: localized("选型", "Selection", "Selección", "Sélection", "선정", "Подбор"),
  flow: localized("流量", "Flow", "Caudal", "Débit", "유량", "Расход"),
  "operating-point": localized("工作点", "Operating point", "Punto de trabajo", "Point de fonctionnement", "작동점", "Рабочая точка"),
  pressure: localized("压力", "Pressure", "Presión", "Pression", "압력", "Давление"),
  backpressure: localized("背压", "Backpressure", "Contrapresión", "Contre-pression", "배압", "Противодавление"),
  "tubing-diameter": localized("管径", "Tubing diameter", "Diámetro del tubo", "Diamètre du tube", "튜브 내경", "Диаметр трубки"),
  "pressure-drop": localized("压降", "Pressure drop", "Caída de presión", "Perte de charge", "압력 강하", "Перепад давления"),
  "tubing-resistance": localized("管路阻力", "Tubing resistance", "Resistencia de tuberías", "Résistance de tuyauterie", "배관 저항", "Сопротивление трубопровода"),
  suction: localized("吸入", "Suction", "Aspiración", "Aspiration", "흡입", "Всасывание"),
  discharge: localized("排出", "Discharge", "Descarga", "Refoulement", "토출", "Нагнетание"),
  "rated-pressure": localized("额定压力", "Rated pressure", "Presión nominal", "Pression nominale", "정격 압력", "Номинальное давление"),
  "pressure-budget": localized("压力预算", "Pressure budget", "Presupuesto de presión", "Budget de pression", "압력 예산", "Баланс давления"),
  "motor-life": localized("电机寿命", "Motor life", "Vida del motor", "Durée de vie du moteur", "모터 수명", "Ресурс двигателя"),
  "brushed-motor": localized("有刷电机", "Brushed motor", "Motor con escobillas", "Moteur à balais", "브러시 모터", "Щёточный двигатель"),
  "brushless-motor": localized("无刷电机", "Brushless motor", "Motor sin escobillas", "Moteur sans balais", "브러시리스 모터", "Бесщёточный двигатель"),
  "continuous-duty": localized("连续运行", "Continuous duty", "Servicio continuo", "Service continu", "연속 운전", "Непрерывный режим"),
  "life-science": localized("生命科学", "Life science", "Ciencias de la vida", "Sciences de la vie", "생명과학", "Науки о жизни"),
  "pump-curve": localized("泵曲线", "Pump curve", "Curva de bomba", "Courbe de pompe", "펌프 곡선", "Характеристика насоса"),
  "wiring-control": localized("接线与控制", "Wiring & control", "Cableado y control", "Câblage et commande", "배선 및 제어", "Подключение и управление"),
  "oem-integration": localized("OEM集成", "OEM integration", "Integración OEM", "Intégration OEM", "OEM 통합", "OEM-интеграция"),
  "liquid-pump": localized("液体泵", "Liquid pump", "Bomba de líquido", "Pompe à liquide", "액체 펌프", "Жидкостный насос"),
  "gas-liquid": localized("气液混合", "Gas-liquid", "Gas-líquido", "Gaz-liquide", "기액 혼합", "Газ-жидкость"),
  "self-priming": localized("自吸", "Self-priming", "Autocebado", "Auto-amorçage", "자흡", "Самовсасывание"),
  "waste-handling": localized("废液处理", "Waste handling", "Gestión de residuos", "Gestion des effluents", "폐액 처리", "Работа с отходами"),
  "plunger-pump": localized("柱塞泵", "Plunger pump", "Bomba de émbolo", "Pompe à piston", "플런저 펌프", "Плунжерный насос"),
  dosing: localized("定量输送", "Dosing", "Dosificación", "Dosage", "정량 이송", "Дозирование"),
  precision: localized("精度", "Precision", "Precisión", "Précision", "정밀도", "Точность"),
  "solenoid-valve": localized("电磁阀", "Solenoid valve", "Válvula solenoide", "Électrovanne", "솔레노이드 밸브", "Электромагнитный клапан"),
  "fluid-switching": localized("液路切换", "Fluid switching", "Conmutación de fluidos", "Commutation fluidique", "유로 전환", "Переключение потока"),
  fittings: localized("接头", "Fittings", "Racores", "Raccords", "피팅", "Фитинги"),
  "sealing-leakage": localized("密封与泄漏", "Sealing & leakage", "Sellado y fugas", "Étanchéité et fuites", "밀봉 및 누설", "Герметичность и утечки"),
  troubleshooting: localized("故障排查", "Troubleshooting", "Diagnóstico", "Dépannage", "문제 해결", "Диагностика"),
  replacement: localized("替代选型", "Replacement", "Sustitución", "Remplacement", "대체 선정", "Подбор замены"),
  "drawings-samples": localized("图纸与样品", "Drawings & samples", "Planos y muestras", "Plans et échantillons", "도면 및 샘플", "Чертежи и образцы"),
  tubing: localized("管路", "Tubing", "Tuberías", "Tuyauterie", "배관", "Трубопровод"),
  installation: localized("安装", "Installation", "Instalación", "Installation", "설치", "Монтаж"),
  "material-compatibility": localized("材料兼容", "Material compatibility", "Compatibilidad de materiales", "Compatibilité des matériaux", "재료 호환성", "Совместимость материалов"),
  "testing-validation": localized("测试与验证", "Testing & validation", "Pruebas y validación", "Essais et validation", "시험 및 검증", "Испытания и валидация"),
  ivd: localized("IVD", "IVD", "IVD", "IVD", "IVD", "IVD"),
  "fluidic-system": localized("液路系统", "Fluidic system", "Sistema de fluidos", "Système fluidique", "유로 시스템", "Жидкостная система"),
  cleaning: localized("清洗", "Cleaning", "Limpieza", "Nettoyage", "세척", "Промывка"),
  "application-context": localized("应用场景", "Application context", "Contexto de aplicación", "Contexte d’application", "적용 환경", "Условия применения"),
  "cv-kv": localized("Cv/Kv", "Cv/Kv", "Cv/Kv", "Cv/Kv", "Cv/Kv", "Cv/Kv"),
  calculation: localized("工程计算", "Engineering calculation", "Cálculo de ingeniería", "Calcul d’ingénierie", "엔지니어링 계산", "Инженерный расчёт"),
  "high-pressure": localized("高压", "High pressure", "Alta presión", "Haute pression", "고압", "Высокое давление"),
} satisfies Record<string, LocalizedLabel>;

type TechnicalArticleTagKey = keyof typeof tagLabels;

interface ArticleClassificationDefinition {
  primaryCategory: TechnicalArticlePrimaryCategory;
  secondaryCategory: TechnicalArticleSecondaryCategory;
  tagKeys: readonly TechnicalArticleTagKey[];
  literalTags?: readonly string[];
  relatedProducts: readonly string[];
}

const articleClassifications: Record<string, ArticleClassificationDefinition> = {
  "300-ml-min-micro-liquid-diaphragm-pump-self-priming-loss": { primaryCategory: "pumps", secondaryCategory: "miniature-diaphragm-pumps", tagKeys: ["liquid-pump", "self-priming", "troubleshooting", "sealing-leakage"], literalTags: ["300 mL/min"], relatedProducts: ["DPL30"] },
  "300-ml-min-micro-liquid-diaphragm-pump-motor-runs-no-flow": { primaryCategory: "pumps", secondaryCategory: "miniature-diaphragm-pumps", tagKeys: ["liquid-pump", "troubleshooting", "backpressure", "sealing-leakage"], literalTags: ["300 mL/min"], relatedProducts: ["DPL30"] },
  "300-ml-min-micro-liquid-diaphragm-pump-water-vs-reagent": { primaryCategory: "pumps", secondaryCategory: "miniature-diaphragm-pumps", tagKeys: ["liquid-pump", "flow", "self-priming", "material-compatibility"], literalTags: ["300 mL/min"], relatedProducts: ["DPL30"] },
  "300-ml-min-micro-liquid-diaphragm-pump-epdm-ptfe-ffkm": { primaryCategory: "pumps", secondaryCategory: "miniature-diaphragm-pumps", tagKeys: ["liquid-pump", "material-compatibility", "selection", "testing-validation"], literalTags: ["EPDM", "PTFE", "FFKM"], relatedProducts: ["DPL30"] },
  "300-vs-600-ml-min-diaphragm-pump-selection": { primaryCategory: "pumps", secondaryCategory: "miniature-diaphragm-pumps", tagKeys: ["selection", "flow", "operating-point"], literalTags: ["300 mL/min", "600 mL/min"], relatedProducts: ["DPL30", "DPL60"] },
  "300-ml-min-diaphragm-pump-flow-margin": { primaryCategory: "pumps", secondaryCategory: "miniature-diaphragm-pumps", tagKeys: ["flow", "operating-point", "selection"], literalTags: ["300 mL/min"], relatedProducts: ["DPL30"] },
  "tube-inner-diameter-affects-diaphragm-pump-flow": { primaryCategory: "pumps", secondaryCategory: "miniature-diaphragm-pumps", tagKeys: ["tubing-diameter", "flow", "pressure-drop", "tubing-resistance"], relatedProducts: ["DPL30", "DPL60", "DPL30H"] },
  "suction-vs-discharge-resistance-diaphragm-pump": { primaryCategory: "pumps", secondaryCategory: "miniature-diaphragm-pumps", tagKeys: ["suction", "discharge", "tubing-resistance", "operating-point"], relatedProducts: ["DPL30", "DPL60", "DPL30H"] },
  "diaphragm-pump-pressure-rating-terms": { primaryCategory: "pumps", secondaryCategory: "miniature-diaphragm-pumps", tagKeys: ["pressure", "rated-pressure", "selection", "testing-validation"], relatedProducts: ["DPL30", "DPL60", "DPL30H"] },
  "100-kpa-vs-600-kpa-diaphragm-pump-selection": { primaryCategory: "pumps", secondaryCategory: "miniature-diaphragm-pumps", tagKeys: ["pressure", "backpressure", "selection"], literalTags: ["100 kPa", "600 kPa"], relatedProducts: ["DPL30", "DPL60", "DPL30H"] },
  "high-backpressure-fluid-path-pressure-budget": { primaryCategory: "pumps", secondaryCategory: "miniature-diaphragm-pumps", tagKeys: ["backpressure", "pressure-budget", "operating-point", "high-pressure"], relatedProducts: ["DPL30H"] },
  "brushed-vs-brushless-diaphragm-pump-3000h-10000h": { primaryCategory: "pumps", secondaryCategory: "miniature-diaphragm-pumps", tagKeys: ["brushed-motor", "brushless-motor", "motor-life", "selection"], literalTags: ["3,000 h", "10,000 h"], relatedProducts: ["DPL30", "DPL60"] },
  "life-science-dpl60-600ml-min-diaphragm-pump-selection-guide": { primaryCategory: "pumps", secondaryCategory: "miniature-diaphragm-pumps", tagKeys: ["life-science", "flow", "selection", "operating-point"], literalTags: ["600 mL/min"], relatedProducts: ["DPL60"] },
  "diaphragm-pump-flow-pressure-curve-guide": { primaryCategory: "pumps", secondaryCategory: "miniature-diaphragm-pumps", tagKeys: ["pump-curve", "flow", "pressure", "operating-point"], relatedProducts: ["DPL30", "DPL60", "DPL30H"] },
  "micro-diaphragm-pump-continuous-duty-life": { primaryCategory: "pumps", secondaryCategory: "miniature-diaphragm-pumps", tagKeys: ["continuous-duty", "motor-life", "brushed-motor", "brushless-motor"], relatedProducts: ["DPL30", "DPL60"] },
  "brushless-diaphragm-pump-2-wire-vs-5-wire": { primaryCategory: "pumps", secondaryCategory: "miniature-diaphragm-pumps", tagKeys: ["wiring-control", "brushless-motor", "oem-integration", "selection"], literalTags: ["2-wire", "5-wire"], relatedProducts: ["DPL30", "DPL60", "DPL30H", "DPGL800"] },
  "dpl30h-high-pressure-liquid-diaphragm-pump-selection-guide": { primaryCategory: "pumps", secondaryCategory: "miniature-diaphragm-pumps", tagKeys: ["liquid-pump", "high-pressure", "backpressure", "selection"], relatedProducts: ["DPL30H"] },
  "dpgl800-gas-liquid-diaphragm-pump-selection-guide": { primaryCategory: "pumps", secondaryCategory: "miniature-diaphragm-pumps", tagKeys: ["gas-liquid", "self-priming", "waste-handling", "selection"], relatedProducts: ["DPGL800"] },
  "dpl60-liquid-diaphragm-pump-selection-guide": { primaryCategory: "pumps", secondaryCategory: "miniature-diaphragm-pumps", tagKeys: ["liquid-pump", "flow", "operating-point", "selection"], relatedProducts: ["DPL60"] },
  "dpl30-liquid-diaphragm-pump-selection-guide": { primaryCategory: "pumps", secondaryCategory: "miniature-diaphragm-pumps", tagKeys: ["liquid-pump", "flow", "oem-integration", "selection"], relatedProducts: ["DPL30"] },
  "micro-plunger-pump-selection": { primaryCategory: "pumps", secondaryCategory: "plunger-pumps", tagKeys: ["plunger-pump", "dosing", "precision", "selection"], relatedProducts: [] },
  "solenoid-valves-in-microfluidic-systems": { primaryCategory: "valves", secondaryCategory: "solenoid-valves", tagKeys: ["solenoid-valve", "fluid-switching", "fluidic-system", "selection"], relatedProducts: [] },
  "selecting-microfluidic-fittings": { primaryCategory: "fittings-tubing", secondaryCategory: "fittings", tagKeys: ["fittings", "selection", "sealing-leakage", "tubing"], relatedProducts: [] },
  "low-pressure-vs-high-pressure-fittings": { primaryCategory: "fittings-tubing", secondaryCategory: "fittings", tagKeys: ["fittings", "pressure", "high-pressure", "selection"], relatedProducts: [] },
  "common-fitting-sealing-failure-causes": { primaryCategory: "fittings-tubing", secondaryCategory: "fittings", tagKeys: ["fittings", "sealing-leakage", "troubleshooting", "installation"], relatedProducts: [] },
  "fitting-replacement-by-drawings-or-samples": { primaryCategory: "fittings-tubing", secondaryCategory: "fittings", tagKeys: ["fittings", "replacement", "drawings-samples", "selection"], relatedProducts: [] },
  "rigid-tubing-vs-flexible-tubing": { primaryCategory: "fittings-tubing", secondaryCategory: "flexible-rigid-tubing", tagKeys: ["tubing", "selection", "installation", "sealing-leakage"], relatedProducts: [] },
  "cv-kv-correction-for-microfluidics": { primaryCategory: "general-fluidics", secondaryCategory: "tubing-resistance-pressure-drop", tagKeys: ["cv-kv", "pressure-drop", "tubing-resistance", "calculation"], relatedProducts: [] },
  "peek-ptfe-pfa-material-differences": { primaryCategory: "general-fluidics", secondaryCategory: "material-chemical-compatibility", tagKeys: ["material-compatibility", "selection", "testing-validation"], literalTags: ["PEEK", "PTFE", "PFA"], relatedProducts: [] },
  "material-compatibility-table-reference": { primaryCategory: "general-fluidics", secondaryCategory: "material-chemical-compatibility", tagKeys: ["material-compatibility", "selection", "testing-validation"], relatedProducts: [] },
  "pressure-flow-material-compatibility": { primaryCategory: "general-fluidics", secondaryCategory: "flow-operating-point", tagKeys: ["pressure", "flow", "material-compatibility", "operating-point"], relatedProducts: [] },
  "ivd-fluidic-system-selection-parameters": { primaryCategory: "applications-solutions", secondaryCategory: "ivd-medical-devices", tagKeys: ["ivd", "fluidic-system", "selection", "oem-integration"], relatedProducts: [] },
  "ivd-waste-aspiration-liquid-pump-vs-vacuum-pump": { primaryCategory: "applications-solutions", secondaryCategory: "cleaning-waste", tagKeys: ["ivd", "waste-handling", "self-priming", "selection"], relatedProducts: ["DPGL800"] },
  "lab-liquid-waste-aspiration-troubleshooting": { primaryCategory: "applications-solutions", secondaryCategory: "cleaning-waste", tagKeys: ["waste-handling", "troubleshooting", "cleaning", "self-priming"], relatedProducts: ["DPGL800"] },
  "why-application-context-matters": { primaryCategory: "applications-solutions", secondaryCategory: "oem-fluidic-systems", tagKeys: ["application-context", "fluidic-system", "selection", "oem-integration"], relatedProducts: [] },
};

const primaryBySecondary = new Map<TechnicalArticleSecondaryCategory, TechnicalArticlePrimaryCategory>();

for (const primary of taxonomyStructure) {
  for (const secondary of primary.children) {
    primaryBySecondary.set(secondary, primary.key);
  }
}

export function getTechnicalArticleTaxonomy(
  locale: TechnicalArticleLocale,
): TechnicalArticleTaxonomyPrimary[] {
  return taxonomyStructure.map((primary) => ({
    key: primary.key,
    label: primaryLabels[primary.key][locale],
    children: primary.children.map((secondary) => ({
      key: secondary,
      label: secondaryLabels[secondary][locale],
    })),
  }));
}

export function classifyTechnicalArticles(
  articles: TechnicalArticleItem[],
  locale: TechnicalArticleLocale,
): ClassifiedTechnicalArticleItem[] {
  return articles.map((article) => {
    const classification = articleClassifications[article.slug];

    if (!classification) {
      throw new Error(
        `Missing technical article classification for slug: ${article.slug}`,
      );
    }

    const expectedPrimary = primaryBySecondary.get(
      classification.secondaryCategory,
    );

    if (expectedPrimary !== classification.primaryCategory) {
      throw new Error(
        `Invalid technical article taxonomy path for slug: ${article.slug}`,
      );
    }

    return {
      ...article,
      primaryCategory: classification.primaryCategory,
      secondaryCategory: classification.secondaryCategory,
      tags: [
        ...classification.tagKeys.map((tagKey) => tagLabels[tagKey][locale]),
        ...(classification.literalTags ?? []),
      ],
      relatedProducts: [...classification.relatedProducts],
    };
  });
}

export function getTechnicalArticleCategoryPath(
  locale: TechnicalArticleLocale,
  article: Pick<
    ClassifiedTechnicalArticleItem,
    "primaryCategory" | "secondaryCategory"
  >,
) {
  return `${primaryLabels[article.primaryCategory][locale]} / ${secondaryLabels[article.secondaryCategory][locale]}`;
}
