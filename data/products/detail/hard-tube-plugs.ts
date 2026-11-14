// Catalogue identities come from 01_硬管接头. Geometry comes from each exact STEP.
// A plug has four model segments and no tubing-OD selection field.
export type HardTubePlugLocale = "zh" | "en" | "es" | "fr" | "ko" | "ru";
export const hardTubePlugFamilies = {
  HBL: "standard-threaded-plug",
  HBL6: "compact-threaded-plug",
  HBL6X: "slotted-fitting-plug",
} as const;
type PlugFamily = keyof typeof hardTubePlugFamilies;
type Identity = Record<string, unknown>;
type Spec = { label: string; value: string };
type Copy = {
  names: [string, string, string];
  fields: [string, string, string, string, string, string, string];
  colors: [string, string];
  description: string;
  purpose: string;
  applications: string[];
  selection: string;
  coding: string;
  meaning: string;
  port: string;
  portText: string;
  space: string;
  spaceText: string;
  medium: string;
  mediumText: string;
  installation: string;
  steps: string[];
  validation: string;
  validationText: string;
  faq: [string, string][];
  allProducts: string;
  drawing: string;
  request: string;
  requestText: string;
  contact: string;
  image: string;
};

export const hardTubePlugCopy: Record<HardTubePlugLocale, Copy> = {
  zh: {
    names: ["标滚螺纹堵头", "紧凑螺纹堵头", "顶丝堵头"],
    fields: ["产品型号", "商品编码", "产品系列", "螺纹规格", "主体材质", "颜色", "料号"],
    colors: ["本色", "黑色"],
    description: "{model} 是一款{material}{name}，采用 {thread} 螺纹，用于匹配端口或接头的液路封堵。选型时需同时核对接收端的密封结构、有效螺纹与安装深度。",
    purpose: "液路端口封堵",
    applications: ["仪器闲置端口封堵", "液路支路配置", "设备维护与接口管理"],
    selection: "选型与安装", coding: "四段型号编码", meaning: "含义",
    port: "先核对接收端口",
    portText: "按 M6×1 或 1/4-28 UNF 螺纹及对应密封结构选择。螺纹相同仍需核对孔深、密封面和有效配合长度；堵头不按通管接头的接管外径选择。",
    space: "确认安装空间",
    spaceText: "HBL 为标滚螺纹堵头，HBL6 为较细握持段的紧凑结构，HBL6X 采用顶丝式外形。分别核对本型号图纸和工具操作空间，不能仅按系列名称判断长短。",
    medium: "核对接液条件",
    mediumText: "结合工作液、清洗液、浓度、温度和接触时间核对 PVDF 或 PPS 的适用性，并检查接收端与其他接液零件。压力与安装扭矩按实际配合和工况确认。",
    installation: "安装与拆卸",
    steps: ["停止供液并释放压力，妥善处理残液，检查螺纹和密封面是否洁净完整。", "将堵头与匹配端口对正，确认旋入顺畅后按本型号要求锁紧，避免斜牙和过度拧紧。", "重新运行后检查封堵处的密封状态。拆下重装前检查磨损与变形，受损零件应先更换。"],
    validation: "在实际工况下检查",
    validationText: "检查应覆盖实际介质、温度、压力及设备启停。发现渗漏时先停机泄压，排查端口配合、密封面和零件状态，再重新装配验证。",
    faq: [["堵头需要选择接管外径吗？", "按螺纹和匹配密封结构选择。堵头承担封堵作用，不能沿用通管接头的接管外径或卡箍选型规则。"], ["同一种螺纹能直接互换吗？", "还需核对接收端口的密封结构、孔深和有效配合长度。仅有相同螺纹不能证明装配兼容。"], ["可以直接沿用其他接头的耐压或扭矩吗？", "应按本型号、配合端口、材料与实际工况确认，不直接套用其他系列的耐压或锁紧扭矩。"]],
    allProducts: "查看硬管接头型号", drawing: "查看本型号 2D 图纸",
    request: "确认堵头与接收端口", requestText: "将型号加入清单，并提供端口图纸、介质、温度、压力及拆装要求，便于确认配合。", contact: "联系工程师", image: "产品渲染图",
  },
  en: {
    names: ["Standard Threaded Plug", "Compact Threaded Plug", "Slotted Fitting Plug"],
    fields: ["Model", "Item code", "Series", "Thread", "Body material", "Color", "Part number"], colors: ["Natural", "Black"],
    description: "{model} is a {material} {name} with a {thread} thread for closing a matching fluidic port or fitting. Check the receiving seal geometry, effective thread engagement and installation depth together.",
    purpose: "Fluidic port closure", applications: ["Unused instrument ports", "Fluidic branch configuration", "Equipment maintenance and port management"],
    selection: "Selection and installation", coding: "Four-part model code", meaning: "Meaning",
    port: "Check the receiving port", portText: "Select M6×1 or 1/4-28 UNF together with the matching sealing structure. Check port depth, sealing surfaces and effective engagement even when the threads match. A plug is not selected by the tubing OD of a through fitting.",
    space: "Allow installation space", spaceText: "HBL is the standard threaded plug; HBL6 has a narrower grip; HBL6X has a slotted screw-style body. Check each model drawing and tool clearance. The series name alone does not determine overall length.",
    medium: "Check fluid exposure", mediumText: "Assess PVDF or PPS against the working and cleaning fluids, concentration, temperature and exposure time, including the receiving port and other wetted parts. Confirm pressure and installation torque for the actual assembly and conditions.",
    installation: "Installation and removal", steps: ["Stop flow and release pressure. Handle residual liquid and inspect clean, undamaged threads and sealing surfaces.", "Align the plug with the matching port. Confirm smooth engagement and tighten to the model-specific requirement without cross-threading or overtightening.", "Check the closure after restarting. Inspect wear and deformation before reassembly and replace damaged parts."],
    validation: "Check under operating conditions", validationText: "Cover the actual fluid, temperature, pressure and equipment start/stop cycle. If leakage occurs, stop and depressurize, inspect the mating port, seal and parts, then reassemble and verify.",
    faq: [["Do I select a tubing OD for this plug?", "Select the thread and matching seal geometry. A plug closes a fluid path; the tubing-OD and ferrule rules for a through fitting do not apply."], ["Are matching threads sufficient for interchangeability?", "Also check the receiving seal geometry, port depth and effective engagement. A matching thread alone does not establish assembly compatibility."], ["Can another fitting's pressure or torque be used?", "Confirm these for this model, mating port, materials and operating conditions. Do not transfer another series' pressure or tightening torque." ]],
    allProducts: "View hard-tube fitting models", drawing: "View this model's 2D drawing", request: "Confirm the plug and receiving port", requestText: "Add the model to your list with the port drawing, fluid, temperature, pressure and servicing requirements for mating confirmation.", contact: "Contact engineering", image: "Product rendering",
  },
  es: {
    names: ["Tapón roscado estándar", "Tapón roscado compacto", "Tapón roscado ranurado"],
    fields: ["Modelo", "Código de artículo", "Serie", "Rosca", "Material del cuerpo", "Color", "Número de pieza"], colors: ["Natural", "Negro"],
    description: "{model} es un {name} de {material} con rosca {thread} para cerrar un puerto o racor de fluido compatible. Compruebe la geometría de sellado, el acoplamiento efectivo y la profundidad de instalación del puerto receptor.",
    purpose: "Cierre de puertos de fluido", applications: ["Puertos de instrumentos sin utilizar", "Configuración de ramales de fluido", "Mantenimiento y gestión de puertos"],
    selection: "Selección e instalación", coding: "Código de modelo de cuatro partes", meaning: "Significado",
    port: "Compruebe el puerto receptor", portText: "Seleccione la rosca M6×1 o 1/4-28 UNF junto con el sellado correspondiente. Verifique profundidad, superficies de sellado y acoplamiento efectivo aunque coincida la rosca. El tapón no se selecciona por el diámetro exterior del tubo de un racor pasante.",
    space: "Prevea espacio de montaje", spaceText: "HBL es el tapón estándar; HBL6 tiene una zona de agarre más estrecha; HBL6X presenta un cuerpo roscado ranurado. Consulte el plano de cada modelo y el espacio para la herramienta. El nombre de la serie no determina la longitud total.",
    medium: "Compruebe los fluidos", mediumText: "Evalúe PVDF o PPS según fluido de trabajo y limpieza, concentración, temperatura y tiempo de contacto, incluido el puerto y las demás piezas mojadas. Confirme presión y par para el montaje y las condiciones reales.",
    installation: "Instalación y desmontaje", steps: ["Detenga el flujo y despresurice. Gestione el líquido residual y compruebe que roscas y superficies estén limpias e intactas.", "Alinee el tapón con el puerto compatible. Compruebe que enrosca suavemente y apriete según el modelo, sin cruzar la rosca ni excederse.", "Compruebe el cierre al reiniciar. Antes de reutilizar, revise desgaste y deformación y sustituya las piezas dañadas."],
    validation: "Verifique en condiciones de servicio", validationText: "Incluya fluido, temperatura, presión y ciclos de arranque y parada reales. Ante una fuga, detenga y despresurice, revise puerto, sellado y piezas, y vuelva a montar y verificar.",
    faq: [["¿Debo elegir un diámetro exterior de tubo?", "Elija la rosca y la geometría de sellado compatible. El tapón cierra un circuito; no se aplican las reglas de tubo y férula de un racor pasante."], ["¿Una rosca igual garantiza el intercambio?", "Compruebe también el sellado receptor, la profundidad y el acoplamiento efectivo. La coincidencia de rosca no basta."], ["¿Puedo usar la presión o el par de otro racor?", "Confírmelos para este modelo, puerto, materiales y condiciones. No transfiera valores de otra serie."]],
    allProducts: "Ver modelos para tubo rígido", drawing: "Ver plano 2D de este modelo", request: "Confirme tapón y puerto receptor", requestText: "Añada el modelo a la lista con el plano del puerto, fluido, temperatura, presión y requisitos de mantenimiento.", contact: "Contactar con ingeniería", image: "Renderizado del producto",
  },
  fr: {
    names: ["Bouchon fileté standard", "Bouchon fileté compact", "Bouchon fileté fendu"],
    fields: ["Modèle", "Code article", "Série", "Filetage", "Matériau du corps", "Couleur", "Référence de pièce"], colors: ["Naturel", "Noir"],
    description: "{model} est un {name} en {material}, à filetage {thread}, destiné à obturer un port ou un raccord fluidique compatible. Vérifiez la géométrie d’étanchéité, l’engagement effectif et la profondeur de montage du port récepteur.",
    purpose: "Obturation de ports fluidiques", applications: ["Ports d’instrument inutilisés", "Configuration de branches fluidiques", "Maintenance et gestion des ports"],
    selection: "Choix et montage", coding: "Code modèle en quatre parties", meaning: "Signification",
    port: "Vérifiez le port récepteur", portText: "Choisissez le filetage M6×1 ou 1/4-28 UNF avec la structure d’étanchéité correspondante. Vérifiez profondeur, surfaces et engagement même si le filetage correspond. Le bouchon ne se choisit pas selon le diamètre extérieur du tube d’un raccord traversant.",
    space: "Prévoyez l’espace de montage", spaceText: "HBL est le bouchon standard ; HBL6 possède une prise plus étroite ; HBL6X présente un corps fileté fendu. Consultez le plan de chaque modèle et le dégagement de l’outil. Le nom de la série ne détermine pas la longueur totale.",
    medium: "Vérifiez les fluides", mediumText: "Évaluez le PVDF ou le PPS selon les fluides de travail et de nettoyage, leur concentration, la température et la durée de contact, y compris le port et les autres pièces mouillées. Confirmez pression et couple pour l’assemblage et les conditions réels.",
    installation: "Montage et démontage", steps: ["Arrêtez le débit et dépressurisez. Traitez le liquide résiduel et contrôlez la propreté et l’intégrité des filetages et surfaces.", "Alignez le bouchon avec le port compatible. Vérifiez un vissage libre et serrez selon les exigences du modèle, sans croiser le filetage ni serrer excessivement.", "Contrôlez l’obturation au redémarrage. Avant remontage, inspectez usure et déformation et remplacez les pièces endommagées."],
    validation: "Contrôlez en conditions de service", validationText: "Couvrez le fluide, la température, la pression et les cycles de marche et d’arrêt réels. En cas de fuite, arrêtez et dépressurisez, inspectez port, étanchéité et pièces, puis remontez et vérifiez.",
    faq: [["Faut-il choisir un diamètre extérieur de tube ?", "Choisissez le filetage et la géométrie d’étanchéité compatible. Le bouchon obture un circuit ; les règles de tube et de bague d’un raccord traversant ne s’appliquent pas."], ["Un filetage identique suffit-il pour l’interchangeabilité ?", "Vérifiez aussi l’étanchéité du port récepteur, sa profondeur et l’engagement effectif. Le filetage seul ne suffit pas."], ["Peut-on reprendre la pression ou le couple d’un autre raccord ?", "Confirmez-les pour ce modèle, le port, les matériaux et les conditions réelles, sans reprendre les valeurs d’une autre série."]],
    allProducts: "Voir les modèles pour tubes rigides", drawing: "Voir le plan 2D de ce modèle", request: "Confirmez le bouchon et le port récepteur", requestText: "Ajoutez le modèle à la liste avec le plan du port, le fluide, la température, la pression et les exigences de maintenance.", contact: "Contacter l’ingénierie", image: "Rendu du produit",
  },
  ko: {
    names: ["표준 나사 플러그", "컴팩트 나사 플러그", "일자 홈 피팅 플러그"],
    fields: ["모델", "품목 코드", "시리즈", "나사", "본체 재질", "색상", "부품 번호"], colors: ["내추럴", "검정"],
    description: "{model}은(는) {thread} 나사가 적용된 {material} {name}로, 호환되는 유체 포트 또는 피팅을 막는 데 사용합니다. 상대 포트의 밀봉 구조, 유효 나사 체결 길이와 설치 깊이를 함께 확인하십시오.",
    purpose: "유체 포트 밀폐", applications: ["사용하지 않는 계측기 포트", "유체 분기 구성", "장비 유지보수 및 포트 관리"],
    selection: "선정 및 설치", coding: "네 부분으로 구성된 모델 코드", meaning: "의미",
    port: "상대 포트 확인", portText: "M6×1 또는 1/4-28 UNF 나사와 해당 밀봉 구조를 함께 선택하십시오. 나사가 같아도 포트 깊이, 밀봉면과 유효 체결 길이를 확인해야 합니다. 관통형 피팅의 튜브 외경 기준을 플러그에 적용하지 마십시오.",
    space: "설치 공간 확인", spaceText: "HBL은 표준형이며 HBL6는 손잡이 부분이 더 가늘고 HBL6X는 일자 홈 나사형입니다. 각 모델 도면과 공구 작업 공간을 확인하십시오. 시리즈 이름만으로 전체 길이를 판단하지 마십시오.",
    medium: "접액 조건 확인", mediumText: "작동액과 세척액, 농도, 온도, 접촉 시간에 따라 PVDF 또는 PPS의 적합성을 평가하고 상대 포트와 다른 접액 부품도 확인하십시오. 압력과 체결 토크는 실제 조립체 및 조건에 맞게 확인해야 합니다.",
    installation: "설치 및 분리", steps: ["유체 공급을 중단하고 압력을 해제하십시오. 잔류액을 처리하고 나사와 밀봉면의 청결 및 손상 여부를 확인하십시오.", "플러그를 호환 포트에 정렬하고 부드럽게 체결되는지 확인한 후 모델별 요구 사항에 따라 조이십시오. 나사 엇물림과 과도한 조임을 피하십시오.", "재가동 후 밀폐 상태를 확인하십시오. 재조립 전에 마모와 변형을 점검하고 손상된 부품을 교체하십시오."],
    validation: "실제 운전 조건에서 확인", validationText: "실제 유체, 온도, 압력 및 장비 기동·정지를 포함해 확인하십시오. 누설이 발생하면 정지 후 감압하고 포트, 밀봉면과 부품 상태를 점검한 뒤 재조립하여 검증하십시오.",
    faq: [["튜브 외경을 선택해야 하나요?", "나사와 호환 밀봉 구조를 선택하십시오. 플러그는 유로를 막는 부품이므로 관통형 피팅의 튜브 외경 및 페룰 선정 규칙을 적용하지 않습니다."], ["나사가 같으면 서로 바꿔 쓸 수 있나요?", "상대 포트의 밀봉 구조, 깊이와 유효 체결 길이도 확인해야 합니다. 나사 일치만으로 조립 호환성을 확인할 수 없습니다."], ["다른 피팅의 압력이나 토크를 적용해도 되나요?", "해당 모델, 상대 포트, 재질과 운전 조건에 맞게 확인하십시오. 다른 시리즈의 정격 압력이나 토크를 그대로 적용하지 마십시오."]],
    allProducts: "경질 튜브 피팅 모델 보기", drawing: "이 모델의 2D 도면 보기", request: "플러그와 상대 포트 확인", requestText: "모델을 목록에 추가하고 포트 도면, 유체, 온도, 압력 및 유지보수 요구 사항을 제공하십시오.", contact: "엔지니어 문의", image: "제품 렌더링",
  },
  ru: {
    names: ["Стандартная резьбовая заглушка", "Компактная резьбовая заглушка", "Резьбовая заглушка со шлицем"],
    fields: ["Модель", "Код изделия", "Серия", "Резьба", "Материал корпуса", "Цвет", "Номер детали"], colors: ["Натуральный", "Чёрный"],
    description: "{model} — {name} из {material} с резьбой {thread} для закрытия совместимого жидкостного порта или фитинга. Проверьте геометрию уплотнения, рабочую длину зацепления и глубину установки в ответном порте.",
    purpose: "Закрытие жидкостных портов", applications: ["Неиспользуемые порты приборов", "Конфигурация ответвлений жидкостной системы", "Обслуживание оборудования и портов"],
    selection: "Подбор и монтаж", coding: "Код модели из четырёх частей", meaning: "Значение",
    port: "Проверьте ответный порт", portText: "Подбирайте резьбу M6×1 или 1/4-28 UNF вместе с соответствующим уплотнением. Даже при одинаковой резьбе проверьте глубину порта, уплотняемые поверхности и рабочую длину зацепления. Заглушку не подбирают по наружному диаметру трубки проходного фитинга.",
    space: "Предусмотрите место для монтажа", spaceText: "HBL — стандартная заглушка; HBL6 имеет более узкую рукоятку; HBL6X — резьбовой корпус со шлицем. Проверьте чертёж каждой модели и место для инструмента. Название серии не определяет общую длину.",
    medium: "Проверьте контакт со средой", mediumText: "Оцените PVDF или PPS с учётом рабочей и промывочной жидкости, концентрации, температуры и времени контакта, включая ответный порт и остальные смачиваемые детали. Давление и момент затяжки подтверждают для фактического узла и условий.",
    installation: "Монтаж и демонтаж", steps: ["Остановите подачу и сбросьте давление. Удалите остатки жидкости и проверьте чистоту и целостность резьбы и уплотняемых поверхностей.", "Совместите заглушку с подходящим портом. Убедитесь в свободном вкручивании и затяните по требованиям модели, без перекоса и чрезмерного усилия.", "После запуска проверьте герметичность. Перед повторным монтажом проверьте износ и деформацию и замените повреждённые детали."],
    validation: "Проверяйте в рабочих условиях", validationText: "Учитывайте фактическую жидкость, температуру, давление и пуски и остановки оборудования. При утечке остановите систему и сбросьте давление, проверьте порт, уплотнение и детали, затем соберите и проверьте повторно.",
    faq: [["Нужно ли выбирать наружный диаметр трубки?", "Выбирайте резьбу и совместимую геометрию уплотнения. Заглушка закрывает жидкостный тракт; правила выбора трубки и феррулы проходного фитинга к ней не относятся."], ["Достаточно ли одинаковой резьбы для взаимозаменяемости?", "Проверьте также уплотнение ответного порта, его глубину и рабочую длину зацепления. Одной резьбы недостаточно."], ["Можно ли использовать давление или момент другого фитинга?", "Подтвердите их для этой модели, ответного порта, материалов и условий работы. Не переносите значения другой серии."]],
    allProducts: "Модели фитингов для жёстких трубок", drawing: "Чертёж 2D этой модели", request: "Согласуйте заглушку и ответный порт", requestText: "Добавьте модель в список и приложите чертёж порта, жидкость, температуру, давление и требования к обслуживанию.", contact: "Связаться с инженером", image: "Визуализация изделия",
  },
};

export function hardTubePlugLocale(locale: string): HardTubePlugLocale {
  return Object.hasOwn(hardTubePlugCopy, locale) ? locale as HardTubePlugLocale : "zh";
}
export function hardTubePlugModel(data: Identity): string {
  const title = data.cardTitle && typeof data.cardTitle === "object" ? data.cardTitle as Record<string, unknown> : null;
  return String(data.foreachModel || data.model || data.slug || title?.zh || title?.en || "").trim().toUpperCase();
}
export function isHardTubePlug(data: Identity): boolean {
  return /^HBL(?:6X|6)?-(M6|U28)-(PV|PS)-(N|B)$/.test(hardTubePlugModel(data));
}
export function getHardTubePlugPresentation(data: Identity, locale = "zh") {
  const model = hardTubePlugModel(data);
  const [family, threadCode, materialCode, colorCode] = model.split("-");
  const lang = hardTubePlugLocale(locale);
  const copy = hardTubePlugCopy[lang];
  const index = family === "HBL" ? 0 : family === "HBL6" ? 1 : 2;
  const name = copy.names[index];
  const thread = threadCode === "M6" ? "M6×1" : "1/4-28 UNF";
  const material = materialCode === "PV" ? "PVDF" : "PPS";
  const color = copy.colors[colorCode === "B" ? 1 : 0];
  const description = copy.description.replace(/\{(model|material|name|thread)\}/g, (_, key: string) => ({model,material,name,thread})[key as "model"]);
  return {model,family:family as PlugFamily,threadCode,materialCode,colorCode,locale:lang,copy,name,thread,material,color,description};
}

export function applyHardTubePlugCopy<T extends Identity>(data: T, locale: string): T {
  if (!isHardTubePlug(data)) return data;
  const p = getHardTubePlugPresentation(data, locale);
  const sourceSpecs = (Array.isArray(data.specs) ? data.specs : []) as Spec[];
  const sourceValue = (label: string) => sourceSpecs.find(row => row.label === label)?.value || "";
  const values = [p.model,String(data.productCode || data.productId || ""),p.name,p.thread,p.material,p.color,String(data.sourcePart || sourceValue("料号"))];
  const specs = p.copy.fields.flatMap((label,index) => values[index] ? [{label,value:values[index]}] : []);
  const prefix = p.locale === "zh" ? "" : `/${p.locale}`;
  const href = `${prefix}/products/fittings/hard-tube-fittings/${p.model.toLowerCase()}/`;
  const mainImage = String(data.plugMainImage || data.mainImage || "");
  return {
    ...data, __locale:p.locale, productTypeName:p.name,seriesName:p.name,name:p.name,title:p.model,
    description:p.description,shortDescription:p.description,
    model:p.model,foreachModel:p.model,modelDisplay:p.model,displayModel:p.model,
    mainImage,image:mainImage,heroImage:mainImage,
    imageAlt:`${p.model} ${p.name} — ${p.material} ${p.color} — ${p.copy.image}`,
    imageAltEn:`${p.model} ${hardTubePlugCopy.en.names[p.family === "HBL" ? 0 : p.family === "HBL6" ? 1 : 2]} — ${p.material}`,
    additionalImages:[],additionalImageAlts:[],images:[mainImage],
    advantages:[p.copy.purpose,`${p.copy.fields[3]}: ${p.thread}`,`${p.copy.fields[4]}: ${p.material}`],
    commonApplications:p.copy.applications,specs,specifications:specs,
    faqs:p.copy.faq.map(([question,answer])=>({question,answer})),
    bottomCtaTitle:p.copy.request,bottomCtaDescription:p.copy.requestText,bottomCtaButtonText:p.copy.contact,
    bottomCtaHref:`${prefix}/contact/`,detailHref:href,href,selectionHref:`${prefix}/products/fittings/hard-tube-fittings/`,
    seo:{title:`${p.model} ${p.name} | FOREACH`,description:p.description},
  } as T;
}

export function buildHardTubePlugSelection(row: {model:string;productCode:string;part:string}, sortOrder: number) {
  const base = {model:row.model};
  const p = getHardTubePlugPresentation(base);
  const cardTitle = Object.fromEntries(Object.keys(hardTubePlugCopy).map(locale=>[locale,row.model]));
  const cardSubtitle = Object.fromEntries(Object.keys(hardTubePlugCopy).map(locale=>{
    const x = getHardTubePlugPresentation(base,locale);
    return [locale,`${x.copy.purpose}\n${x.copy.fields[3]}: ${x.thread}\n${x.copy.fields[4]}: ${x.material}`];
  }));
  const searchKeywords = Object.fromEntries(Object.keys(hardTubePlugCopy).map(locale=>{
    const x = getHardTubePlugPresentation(base,locale);
    return [locale,[x.name,row.model,row.productCode,row.part,x.thread,x.material,x.color,x.copy.purpose].join(" ")];
  }));
  return {productId:row.productCode,sourcePart:row.part,categoryId:"fittings",productTypeId:"hard-tube-fittings",productType:"堵头",productTypeName:p.name,productSeries:p.name,
    seriesId:hardTubePlugFamilies[p.family],cardTitle,cardSubtitle,
    filters:{filter01:p.name,filter02:p.thread,filter03:"",filter04:p.material,filter05:p.color},
    imageCard:`/images/products/fittings/hard-tube-fittings/plugs/${row.model.toLowerCase()}-card.webp`,
    detailSlug:row.model.toLowerCase(),status:"active",sortOrder,searchKeywords};
}

export function buildHardTubePlugDetail(row: {model:string;productCode:string;part:string}) {
  const p = getHardTubePlugPresentation({model:row.model});
  const slug = row.model.toLowerCase();
  const main = `/images/products/fittings/hard-tube-fittings/plugs/${slug}-main.webp`;
  const base = {sourceType:"fitting-detail",category:"fittings",categoryId:"fittings",categoryLabel:"接头系列",
    productTypeId:"hard-tube-fittings",productTypeName:p.name,productId:row.productCode,productCode:row.productCode,
    seriesId:hardTubePlugFamilies[p.family],slug,model:row.model,sourcePart:row.part,detailMode:"standard_model",
    imageCard:`/images/products/fittings/hard-tube-fittings/plugs/${slug}-card.webp`,plugMainImage:main,mainImage:main,
    hideModelAction:false,showConfigurator:false,showDatasheetRequest:false,showDrawingRequest:true,show3DRequest:false,
    drawing2dUrl:`/downloads/products/fittings/2d-drawings/01/${row.part.toLowerCase()}-c.pdf`,
    drawingPdfUrl:`/downloads/products/fittings/2d-drawings/01/${row.part.toLowerCase()}-c.pdf`,
    specs:[{label:"料号",value:row.part}],sectionTitleMap:{applications:"常见应用",faq:"常见问题"}};
  return applyHardTubePlugCopy(base,"zh");
}

export function getHardTubePlugTaxonomy() {
  return Object.values(hardTubePlugFamilies).map((id,index)=>({type:"series",id,
    label:Object.fromEntries(Object.entries(hardTubePlugCopy).map(([locale,copy])=>[locale,copy.names[index]])),
    sortOrder:426+index}));
}
