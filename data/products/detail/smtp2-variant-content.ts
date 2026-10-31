import catalog from "./smtp2-configurations.json";

export const smtp2Variants = catalog.variants.map(item => ({ ...item, slug: item.model.toLowerCase() }));
export function getSmtp2Variant(slug: string) { return smtp2Variants.find(item => item.slug === slug); }

// Different keyword and application emphases share the same capacity and sensing capabilities.
// FAQ intent: product question bank P06-02/P06-04; lengths and codes: Table 19.
const text = {
  zh: {
    names: ["小型分析仪器用紧凑型移液模块", "自动加样用可编程移液模块", "OEM集成用气体置换式移液器"],
    intents: [
      "面向安装空间受限、希望缩短泵体下方适配器伸出长度的自动加样单元。采用短适配器时，应把一次性吸头的实际长度、装卸吸头行程和容器口位置一起纳入安装设计。",
      "面向需要增加泵体与容器口之间距离的样本转移单元。45 mm 适配器是 8 mm 与 72 mm 之间的长度配置，可结合管架、试剂容器和吸头安装高度评估是否合适。",
      "面向需要较长适配器伸入空间的容器取液设计。可将 72 mm 配置纳入较深容器或较高管架的集成评估，同时检查容器口径、运动避让和有效取液位置。",
    ],
    integration: "产品集成驱动控制、pLLD/cLLD/hLLD 液面检测、堵塞检测、吸头有无检测和自动脱吸头，支持 RS232、RS485、CAN 通讯。仪器需配套定位运动、一次性吸头及实际液体的吸排液参数。",
    boundary: "适配器长度不等于可到达液深，也不改变 1000 μL 标称容量。实际取液深度取决于吸头长度、安装位置、容器几何和运动行程；移液准确性及重复性需按目标液体、吸头和工作液量验证。",
    applicationTitles: ["紧凑型自动加样单元的安装评估", "带管架的样本转移与试剂添加", "较深容器取液的伸入与避让评估"],
    faqQuestions: ["8 mm 短适配器可以直接判断整机安装高度吗？", "45 mm 适配器适合哪一种容器高度？", "72 mm 适配器是否代表能吸取 72 mm 深处的液体？"],
    faqAnswers: [
      "不能。8 mm 是 LTE008 的适配器长度。整机需要的空间还包括泵体、所选吸头、装卸吸头动作与定位行程。先核对容器口和目标液面位置，再检查最上端与最下端运动位置的干涉。",
      "不能仅按 45 mm 判断容器高度。应叠加吸头有效长度和泵体安装位置，核对容器口、液面、底部形状以及装卸吸头动作；若伸入不足或安装余量不合适，再对比 LTE008 和 LTE072。",
      "不能。72 mm 是 LTE072 的适配器长度，并非保证的取液深度。请将吸头有效长度、容器口径、安装基准与定位行程叠加校核，确认液面检测位置、吸液深度和容器底部的避让余量。",
    ],
    adapter: "吸头适配器", applications: "应用", typical: "典型应用", selection: "安装选型信息",
  },
  en: {
    names: ["Compact Pipetting Module for Small Analytical Instruments", "Programmable Pipetting Module for Automated Sample Dispensing", "Air Displacement Pipettor for OEM Integration"],
    intents: [
      "For automated pipetting units where installation space below the pump is limited and a short adapter projection is preferred. Include the disposable tip length, tip loading and ejection travel, and vessel rim position in the installation design.",
      "For sample transfer units that need additional separation between the pump body and the vessel opening. The 45 mm adapter provides a length option between 8 and 72 mm; assess it against tube racks, reagent vessels and tip mounting height.",
      "For vessel access layouts requiring a longer adapter projection. Assess the 72 mm configuration for deeper vessels or taller tube racks, checking opening diameter, collision clearance and the intended aspiration position.",
    ],
    integration: "Integrated drive and control support pLLD/cLLD/hLLD liquid-level detection, blockage and tip-presence detection, automatic tip ejection, and RS232, RS485 and CAN communication. The instrument supplies positioning motion, disposable tips and liquid-specific aspiration and dispense settings.",
    boundary: "Adapter length is not a guaranteed aspiration depth and does not change the 1000 μL nominal capacity. Actual reach depends on the tip, mounting position, vessel geometry and positioning travel. Validate accuracy and repeatability with the intended liquid, tip and working volumes.",
    applicationTitles: ["Installation in compact automated pipetting units", "Sample transfer and reagent addition around tube racks", "Reach and clearance assessment for deeper vessels"],
    faqQuestions: ["Does the 8 mm adapter define the total installation height?", "Which vessel height fits the 45 mm adapter?", "Does a 72 mm adapter guarantee aspiration at a depth of 72 mm?"],
    faqAnswers: [
      "No. 8 mm describes the LTE008 adapter. Allow space for the pump body, selected tip, tip loading and ejection, and positioning travel. Check the vessel rim and target liquid level, then evaluate interference at both ends of the movement.",
      "Vessel height cannot be selected from 45 mm alone. Combine the effective tip length and pump mounting position, then check the vessel rim, liquid level, bottom geometry and tip handling motions. Compare LTE008 and LTE072 if the reach or clearance is unsuitable.",
      "No. 72 mm describes the LTE072 adapter, not a guaranteed aspiration depth. Check the effective tip length, vessel opening, mounting reference and positioning travel together, including level detection, aspiration position and clearance above the vessel bottom.",
    ],
    adapter: "Tip adapter", applications: "Applications", typical: "Typical applications", selection: "Installation selection inputs",
  },
  es: {
    names: ["Módulo de pipeteo compacto para pequeños instrumentos analíticos", "Módulo de pipeteo programable para dispensación automática de muestras", "Pipeteador por desplazamiento de aire para integración OEM"],
    intents: [
      "Para unidades automáticas con espacio limitado bajo la bomba que requieren un adaptador corto. El montaje debe incluir la longitud de la punta desechable, los recorridos de carga y expulsión y la posición de la boca del recipiente.",
      "Para unidades de transferencia que necesitan más separación entre la bomba y la boca del recipiente. El adaptador de 45 mm ofrece una opción entre 8 y 72 mm; evalúelo según las gradillas, los recipientes de reactivos y la altura de montaje de la punta.",
      "Para diseños que necesitan mayor prolongación del adaptador. Evalúe la configuración de 72 mm con recipientes más profundos o gradillas más altas, comprobando el diámetro de apertura, las holguras y la posición de aspiración.",
    ],
    integration: "Integra accionamiento y control, detección de nivel pLLD/cLLD/hLLD, obstrucciones y presencia de punta, expulsión automática y comunicación RS232, RS485 y CAN. El instrumento aporta el posicionamiento, las puntas y los parámetros de aspiración y dispensación según el líquido.",
    boundary: "La longitud del adaptador no garantiza una profundidad de aspiración ni modifica la capacidad nominal de 1000 μL. El alcance depende de la punta, el montaje, la geometría del recipiente y el recorrido. Valide exactitud y repetibilidad con el líquido, las puntas y los volúmenes de trabajo reales.",
    applicationTitles: ["Integración en unidades compactas de pipeteo", "Transferencia de muestras y adición de reactivos con gradillas", "Evaluación del alcance en recipientes profundos"],
    faqQuestions: ["¿El adaptador de 8 mm define la altura total de instalación?", "¿Qué altura de recipiente admite el adaptador de 45 mm?", "¿El adaptador de 72 mm garantiza aspirar a 72 mm de profundidad?"],
    faqAnswers: [
      "No. 8 mm es la longitud del LTE008. Reserve espacio para la bomba, la punta y los movimientos de carga, expulsión y posicionamiento. Compruebe la boca del recipiente, el nivel objetivo y las interferencias en los extremos del recorrido.",
      "No puede determinarse solo a partir de 45 mm. Combine la longitud útil de la punta y el montaje de la bomba; compruebe la boca, el nivel, el fondo y los movimientos de la punta. Compare LTE008 y LTE072 si el alcance o la holgura no son adecuados.",
      "No. 72 mm es la longitud del LTE072. Compruebe conjuntamente la punta, la apertura del recipiente, el montaje y el recorrido, incluida la detección de nivel, la posición de aspiración y la distancia al fondo.",
    ],
    adapter: "Adaptador de punta", applications: "Aplicaciones", typical: "Aplicaciones típicas", selection: "Datos para seleccionar la instalación",
  },
  fr: {
    names: ["Module de pipetage compact pour petits instruments d’analyse", "Module de pipetage programmable pour la distribution automatique d’échantillons", "Pipeteur à déplacement d’air pour intégration OEM"],
    intents: [
      "Pour les unités automatisées où l’espace sous la pompe est limité et un adaptateur court est souhaité. Intégrez la longueur de l’embout jetable, les courses de chargement et d’éjection et la position du bord du récipient.",
      "Pour le transfert d’échantillons nécessitant davantage d’espace entre la pompe et l’ouverture du récipient. L’adaptateur de 45 mm constitue une option entre 8 et 72 mm, à évaluer selon les portoirs, les récipients et la hauteur de montage de l’embout.",
      "Pour les configurations nécessitant une projection plus longue de l’adaptateur. Évaluez la version 72 mm avec des récipients plus profonds ou des portoirs plus hauts, en vérifiant le diamètre d’ouverture, les dégagements et la position d’aspiration.",
    ],
    integration: "La commande et l’entraînement intégrés prennent en charge la détection de niveau pLLD/cLLD/hLLD, des obstructions et de présence d’embout, l’éjection automatique et les communications RS232, RS485 et CAN. L’instrument fournit le positionnement, les embouts et les paramètres adaptés au liquide.",
    boundary: "La longueur de l’adaptateur ne garantit pas une profondeur d’aspiration et ne modifie pas la capacité nominale de 1000 μL. La portée dépend de l’embout, du montage, du récipient et de la course. Validez justesse et répétabilité avec le liquide, l’embout et les volumes de travail réels.",
    applicationTitles: ["Montage dans une unité de pipetage compacte", "Transfert et ajout de réactifs avec portoirs", "Évaluation de la portée dans les récipients profonds"],
    faqQuestions: ["L’adaptateur de 8 mm définit-il la hauteur totale de montage ?", "Quelle hauteur de récipient convient à l’adaptateur de 45 mm ?", "L’adaptateur de 72 mm garantit-il une aspiration à 72 mm de profondeur ?"],
    faqAnswers: [
      "Non. 8 mm désigne la longueur du LTE008. Prévoyez l’espace nécessaire pour la pompe, l’embout et les mouvements de chargement, d’éjection et de positionnement. Contrôlez le bord du récipient, le niveau visé et les interférences aux extrémités de course.",
      "La hauteur ne se déduit pas des seuls 45 mm. Combinez longueur utile de l’embout et montage de la pompe, puis vérifiez le bord, le niveau, le fond et les mouvements. Comparez LTE008 et LTE072 si la portée ou le dégagement ne convient pas.",
      "Non. 72 mm désigne le LTE072. Vérifiez ensemble l’embout, l’ouverture, le montage et la course, en incluant la détection de niveau, la position d’aspiration et le dégagement au-dessus du fond.",
    ],
    adapter: "Adaptateur d’embout", applications: "Applications", typical: "Applications typiques", selection: "Données de sélection du montage",
  },
  ko: {
    names: ["소형 분석 기기용 컴팩트 피펫팅 모듈", "자동 시료 분주용 프로그래머블 피펫팅 모듈", "OEM 통합용 공기 치환식 피펫터"],
    intents: [
      "펌프 하부 공간이 제한되어 짧은 어댑터 돌출 길이가 필요한 자동 피펫팅 장치의 후보입니다. 일회용 팁 길이, 팁 장착·배출 이동 거리와 용기 입구 위치를 설치 설계에 포함하세요.",
      "펌프 본체와 용기 입구 사이에 추가 간격이 필요한 시료 이송 장치용 구성입니다. 45 mm 어댑터는 8 mm와 72 mm 사이의 선택지이며 튜브 랙, 시약 용기 및 팁 설치 높이에 따라 검토하세요.",
      "더 긴 어댑터 돌출 길이가 필요한 용기 접근 설계용 구성입니다. 깊은 용기나 높은 튜브 랙에 72 mm 구성을 검토하면서 입구 지름, 충돌 여유 및 흡입 위치를 확인하세요.",
    ],
    integration: "구동·제어를 통합하며 pLLD/cLLD/hLLD 액면 감지, 막힘·팁 유무 감지, 자동 팁 배출 및 RS232, RS485, CAN 통신을 지원합니다. 장비에는 위치 제어 축, 일회용 팁과 액체별 흡입·분주 설정이 필요합니다.",
    boundary: "어댑터 길이는 보장 흡입 깊이가 아니며 공칭 용량 1000 μL를 바꾸지 않습니다. 실제 도달 범위는 팁, 설치 위치, 용기 형상 및 이동 거리에 따라 달라집니다. 실제 액체, 팁과 작업 액량으로 정확도와 반복성을 검증하세요.",
    applicationTitles: ["컴팩트 자동 피펫팅 장치의 설치 검토", "튜브 랙 주변의 시료 이송과 시약 첨가", "깊은 용기의 접근 거리와 간섭 검토"],
    faqQuestions: ["8 mm 어댑터로 전체 설치 높이를 정할 수 있나요?", "45 mm 어댑터에 맞는 용기 높이는 얼마인가요?", "72 mm 어댑터는 72 mm 깊이의 흡입을 보장하나요?"],
    faqAnswers: [
      "아니요. 8 mm는 LTE008 어댑터 길이입니다. 펌프, 팁 및 장착·배출·위치 제어 동작 공간을 포함해야 합니다. 용기 입구와 목표 액면을 확인한 뒤 이동 범위 양 끝에서 간섭을 점검하세요.",
      "45 mm만으로 판단할 수 없습니다. 팁 유효 길이와 펌프 설치 위치를 합쳐 용기 입구, 액면, 바닥과 팁 동작을 확인하세요. 거리나 여유 공간이 맞지 않으면 LTE008과 LTE072를 비교하세요.",
      "아니요. 72 mm는 LTE072의 길이입니다. 팁 유효 길이, 용기 입구, 설치 기준과 이동 거리를 함께 확인하고 액면 감지 위치, 흡입 위치 및 바닥과의 여유를 검토하세요.",
    ],
    adapter: "팁 어댑터", applications: "응용 분야", typical: "주요 응용 분야", selection: "설치 선택 정보",
  },
  ru: {
    names: ["Компактный модуль пипетирования для малогабаритных аналитических приборов", "Программируемый модуль пипетирования для автоматического дозирования образцов", "Пипетатор с воздушным вытеснением для OEM-интеграции"],
    intents: [
      "Для автоматических узлов с ограниченным пространством под насосом и коротким выступом адаптера. Учитывайте длину одноразового наконечника, перемещения при его установке и сбросе и положение края ёмкости.",
      "Для переноса образцов с увеличенным расстоянием между корпусом насоса и горловиной ёмкости. Адаптер 45 мм — вариант между 8 и 72 мм; оцените его относительно штативов, ёмкостей реагентов и высоты установки наконечника.",
      "Для компоновок, которым нужен более длинный выступ адаптера. Оцените конфигурацию 72 мм для глубоких ёмкостей или высоких штативов, проверяя диаметр горловины, отсутствие столкновений и положение аспирации.",
    ],
    integration: "Встроенные привод и управление поддерживают pLLD/cLLD/hLLD, обнаружение засорения и наличия наконечника, автоматический сброс и связь RS232, RS485 и CAN. Прибор обеспечивает позиционирование, наконечники и настройки аспирации и дозирования для конкретной жидкости.",
    boundary: "Длина адаптера не гарантирует глубину аспирации и не меняет номинальный объём 1000 μL. Доступ зависит от наконечника, монтажа, геометрии ёмкости и хода позиционирования. Проверяйте точность и повторяемость с реальными жидкостями, наконечниками и рабочими объёмами.",
    applicationTitles: ["Монтаж в компактном узле пипетирования", "Перенос образцов и реагентов в зоне штативов", "Проверка доступа к глубоким ёмкостям"],
    faqQuestions: ["Определяет ли адаптер 8 мм полную высоту монтажа?", "Для какой высоты ёмкости подходит адаптер 45 мм?", "Гарантирует ли адаптер 72 мм аспирацию на глубине 72 мм?"],
    faqAnswers: [
      "Нет. 8 мм — длина LTE008. Учтите насос, наконечник, установку, сброс и позиционирование. Проверьте край ёмкости, целевой уровень жидкости и возможные столкновения в крайних положениях.",
      "Одних 45 мм недостаточно. Сопоставьте полезную длину наконечника и монтаж насоса с горловиной, уровнем жидкости, дном и перемещениями наконечника. При недостаточном доступе или зазоре сравните LTE008 и LTE072.",
      "Нет. 72 мм — длина LTE072. Совместно проверьте наконечник, горловину, монтажную базу и ход, включая обнаружение уровня, положение аспирации и зазор над дном.",
    ],
    adapter: "Адаптер наконечника", applications: "Применение", typical: "Типичные применения", selection: "Данные для выбора монтажа",
  },
};

export function getSmtp2VariantCopy(slug: string, locale: string) {
  const variant = getSmtp2Variant(slug);
  const lang = (locale === "zh-CN" ? "zh" : locale) as keyof typeof text;
  const copy = text[lang];
  if (!variant || !copy) return undefined;
  const index = smtp2Variants.indexOf(variant);
  const heading = copy.names[index];
  const identity = `${variant.model} · 1000 μL · ${copy.adapter} ${variant.adapter} (${variant.lengthMm} mm).`;
  const paragraphs = [`${identity} ${copy.intents[index]}`, copy.integration, copy.boundary];
  return {
    ...variant, heading, keyword: copy.names[index],
    title: `${variant.model} ${copy.names[index]} | FOREACH`,
    meta: `${variant.model} ${copy.names[index]} — 1000 μL, ${copy.adapter} ${variant.adapter} (${variant.lengthMm} mm).`,
    paragraphs, imageAlt: `FOREACH ${variant.model} ${copy.names[index]}, ${variant.adapter} (${variant.lengthMm} mm)`,
    application: { title: copy.applicationTitles[index], paragraphs: [copy.intents[index], copy.boundary] },
    labels: copy,
    faq: { question: copy.faqQuestions[index], answer: copy.faqAnswers[index] },
  };
}
