export const HARD_TUBE_ACCESSORY_LOCALES = ["zh", "en", "es", "fr", "ko", "ru"] as const;
export type HardTubeAccessoryLocale = typeof HARD_TUBE_ACCESSORY_LOCALES[number];

// Product names come from the localized detail data. These are interface labels.
// English follows the existing product-detail term “Clamp Fitting”.
const zh = {
  washer: "垫片", ferrule: "卡箍", fitting: "接头", natural: "本色", black: "黑色", yellow: "黄色", steel: "SUS 不锈钢",
  configure: "搭配选型", reselect: "重新选择", option: "选配1：", optional: "可选配套的{kind}", paired: "配套{kind}", without: "不配购{kind}", fittingOnly: "仅购买接头",
  title: "硬管接头与{kind}选型", description: "每次选型搭配一种{kind}。如需其他搭配，请先加入清单，再选择下一组。", close: "关闭选型",
  current: "当前接头", code: "商品编码", thread: "螺纹规格", tube: "接管外径", bodyMaterial: "接头材质", bodyColor: "接头颜色", material: "材质", color: "颜色",
  chooseMaterial: "请选择{kind}材质", chooseOne: "每次选择一种配套{kind}", noneThisTime: "本次不配购{kind}", configuration: "配置选择", compatibility: "适配 {thread} 螺纹 · {diameters} 管外径",
  pairing: "配套方式", withAccessory: "接头＋{kind}", materialSingle: "{kind}材质（单选）", fitsTube: "适配 {diameters} 管外径", tubeFit: "适配管外径", specs: "{kind}规格",
  outer: "外径", inner: "内径", height: "高度", thickness: "厚度", tubeOd: "管外径", dimensionsNote: "尺寸随适配型号确定",
  selectionNote: "一次搭配一种{kind}；如需其他材质或管径，请先将当前组合加入清单，再重新选择。", fittingOnlyNote: "仅购买接头表示本次不配购{kind}，装配时仍需使用匹配的{kind}。",
  selected: "已选组合", copy: "复制选型", copied: "已复制", copyFailed: "复制失败，请重试", notIncluded: "不配购", pendingCode: "待确认",
  supportBefore: "如需选型支持，请", contact: "联系我们", supportAfter: "，我们的技术人员可协助您选择合适的接头与{kind}。",
  add: "加入清单", added: "已加入清单", confirm: "确认并返回", source: "硬管接头配套选型", accessoryProduct: "{material} {kind}（配套 {model}）",
};
type Copy = Record<keyof typeof zh, string>;
const copies: Record<HardTubeAccessoryLocale, Copy> = {
  zh,
  en: {
    washer: "Washer", ferrule: "Clamp", fitting: "Fitting", natural: "Natural", black: "Black", yellow: "Yellow", steel: "SUS Stainless Steel",
    configure: "Select Accessories", reselect: "Change Selection", option: "Option 1:", optional: "Compatible {kind} available", paired: "Matching {kind}", without: "Without {kind}", fittingOnly: "Fitting Only",
    title: "Rigid Tube Fitting & {kind} Selection", description: "Select one matching {kind} per configuration. Add the current combination to your list before choosing another.", close: "Close Selection",
    current: "Current Fitting", code: "Product Code", thread: "Thread Size", tube: "Tube OD", bodyMaterial: "Body Material", bodyColor: "Color", material: "Material", color: "Color",
    chooseMaterial: "Select {kind} material", chooseOne: "Select one matching {kind}", noneThisTime: "No {kind} included", configuration: "Configuration", compatibility: "Fits {thread} threads · {diameters} tube OD",
    pairing: "Combination", withAccessory: "Fitting + {kind}", materialSingle: "{kind} Material (Select One)", fitsTube: "For {diameters} tube OD", tubeFit: "Compatible Tube OD", specs: "{kind} Specifications",
    outer: "Outer Diameter", inner: "Inner Diameter", height: "Height", thickness: "Thickness", tubeOd: "Tube OD", dimensionsNote: "Dimensions depend on the selected model.",
    selectionNote: "Choose one {kind} at a time. For another material or tube size, add the current combination to your list first.", fittingOnlyNote: "Fitting Only excludes the {kind} from this selection. A compatible {kind} is still required for assembly.",
    selected: "Selected Combination", copy: "Copy Selection", copied: "Copied", copyFailed: "Copy failed. Try again.", notIncluded: "Not Included", pendingCode: "To Be Confirmed",
    supportBefore: "For selection support, ", contact: "contact us", supportAfter: ". Our technical team can help you select a suitable fitting and {kind}.",
    add: "Add to List", added: "Added to List", confirm: "Confirm and Return", source: "Rigid Tube Fitting Accessory Selection", accessoryProduct: "{material} {kind} (for {model})",
  },
  es: {
    washer: "Arandela", ferrule: "Férula", fitting: "Racor", natural: "Natural", black: "Negro", yellow: "Amarillo", steel: "Acero inoxidable SUS",
    configure: "Elegir accesorios", reselect: "Cambiar selección", option: "Opción 1:", optional: "Accesorio compatible disponible: {kind}", paired: "Accesorio: {kind}", without: "Sin {kind}", fittingOnly: "Solo racor",
    title: "Selección de racor para tubo rígido y {kind}", description: "Seleccione un accesorio por combinación. Añada la combinación actual a la lista antes de elegir otra.", close: "Cerrar selección",
    current: "Racor actual", code: "Código de producto", thread: "Tamaño de rosca", tube: "DE del tubo", bodyMaterial: "Material del cuerpo", bodyColor: "Color", material: "Material", color: "Color",
    chooseMaterial: "Seleccione el material: {kind}", chooseOne: "Seleccione un accesorio compatible: {kind}", noneThisTime: "Sin {kind} en esta selección", configuration: "Configuración", compatibility: "Rosca {thread} · DE del tubo: {diameters}",
    pairing: "Combinación", withAccessory: "Racor + {kind}", materialSingle: "Material: {kind} (una opción)", fitsTube: "Para tubo de {diameters} de DE", tubeFit: "DE del tubo compatible", specs: "Especificaciones: {kind}",
    outer: "Diámetro exterior", inner: "Diámetro interior", height: "Altura", thickness: "Espesor", tubeOd: "DE del tubo", dimensionsNote: "Las dimensiones dependen del modelo seleccionado.",
    selectionNote: "Seleccione un accesorio cada vez. Para otro material o diámetro de tubo, añada primero la combinación actual a la lista.", fittingOnlyNote: "«Solo racor» excluye el accesorio de esta selección. El montaje sigue requiriendo un accesorio compatible: {kind}.",
    selected: "Combinación seleccionada", copy: "Copiar selección", copied: "Copiado", copyFailed: "No se pudo copiar. Inténtelo de nuevo.", notIncluded: "No incluido", pendingCode: "Por confirmar",
    supportBefore: "Si necesita ayuda, ", contact: "contáctenos", supportAfter: ". Nuestro equipo técnico le ayudará a seleccionar el racor y el accesorio compatible.",
    add: "Añadir a la lista", added: "Añadido a la lista", confirm: "Confirmar y volver", source: "Selección de accesorios para racores de tubo rígido", accessoryProduct: "{kind} de {material} (para {model})",
  },
  fr: {
    washer: "Rondelle", ferrule: "Bague", fitting: "Raccord", natural: "Naturel", black: "Noir", yellow: "Jaune", steel: "Acier inoxydable SUS",
    configure: "Choisir les accessoires", reselect: "Modifier la sélection", option: "Option 1 :", optional: "Accessoire compatible disponible : {kind}", paired: "Accessoire : {kind}", without: "Sans {kind}", fittingOnly: "Raccord seul",
    title: "Sélection du raccord pour tube rigide et de la {kind}", description: "Sélectionnez un accessoire par combinaison. Ajoutez la combinaison actuelle à la liste avant d’en choisir une autre.", close: "Fermer la sélection",
    current: "Raccord actuel", code: "Code produit", thread: "Dimension du filetage", tube: "DE du tube", bodyMaterial: "Matériau du corps", bodyColor: "Couleur", material: "Matériau", color: "Couleur",
    chooseMaterial: "Choisir le matériau : {kind}", chooseOne: "Sélectionner un accessoire compatible : {kind}", noneThisTime: "Sans {kind} dans cette sélection", configuration: "Configuration", compatibility: "Filetage {thread} · DE du tube : {diameters}",
    pairing: "Combinaison", withAccessory: "Raccord + {kind}", materialSingle: "Matériau : {kind} (un choix)", fitsTube: "Pour tube de {diameters} de DE", tubeFit: "DE du tube compatible", specs: "Caractéristiques : {kind}",
    outer: "Diamètre extérieur", inner: "Diamètre intérieur", height: "Hauteur", thickness: "Épaisseur", tubeOd: "DE du tube", dimensionsNote: "Les dimensions dépendent du modèle sélectionné.",
    selectionNote: "Sélectionnez un seul accessoire à la fois. Pour un autre matériau ou diamètre de tube, ajoutez d’abord la combinaison actuelle à la liste.", fittingOnlyNote: "« Raccord seul » exclut l’accessoire de cette sélection. Le montage nécessite toujours un accessoire compatible : {kind}.",
    selected: "Combinaison sélectionnée", copy: "Copier la sélection", copied: "Copié", copyFailed: "Échec de la copie. Réessayez.", notIncluded: "Non inclus", pendingCode: "À confirmer",
    supportBefore: "Pour obtenir de l’aide, ", contact: "contactez-nous", supportAfter: ". Notre équipe technique vous aidera à choisir le raccord et l’accessoire adaptés.",
    add: "Ajouter à la liste", added: "Ajouté à la liste", confirm: "Confirmer et revenir", source: "Sélection d’accessoires pour raccords de tube rigide", accessoryProduct: "{kind} en {material} (pour {model})",
  },
  ko: {
    washer: "와셔", ferrule: "페룰", fitting: "피팅", natural: "내추럴", black: "검정", yellow: "노랑", steel: "SUS 스테인리스강",
    configure: "액세서리 선택", reselect: "선택 변경", option: "옵션 1:", optional: "호환 {kind} 선택 가능", paired: "호환 {kind}", without: "{kind} 제외", fittingOnly: "피팅만 선택",
    title: "경질 튜브 피팅 및 {kind} 선택", description: "구성마다 호환 액세서리 하나를 선택하세요. 다른 구성을 선택하려면 현재 구성을 먼저 목록에 추가하세요.", close: "선택 창 닫기",
    current: "현재 피팅", code: "제품 코드", thread: "나사 규격", tube: "튜브 외경", bodyMaterial: "본체 재질", bodyColor: "색상", material: "재질", color: "색상",
    chooseMaterial: "{kind} 재질 선택", chooseOne: "호환 {kind} 하나 선택", noneThisTime: "이번 선택에서 {kind} 제외", configuration: "구성 선택", compatibility: "{thread} 나사 · 튜브 외경 {diameters}",
    pairing: "구성 방식", withAccessory: "피팅 + {kind}", materialSingle: "{kind} 재질 (단일 선택)", fitsTube: "외경 {diameters} 튜브용", tubeFit: "호환 튜브 외경", specs: "{kind} 사양",
    outer: "외경", inner: "내경", height: "높이", thickness: "두께", tubeOd: "튜브 외경", dimensionsNote: "치수는 선택한 모델에 따라 결정됩니다.",
    selectionNote: "액세서리는 한 번에 하나씩 선택하세요. 다른 재질이나 튜브 외경을 선택하려면 현재 구성을 먼저 목록에 추가하세요.", fittingOnlyNote: "‘피팅만 선택’은 이번 구성에서 {kind}을(를) 제외합니다. 조립할 때는 호환 {kind}이(가) 필요합니다.",
    selected: "선택한 구성", copy: "선택 내용 복사", copied: "복사됨", copyFailed: "복사하지 못했습니다. 다시 시도하세요.", notIncluded: "미포함", pendingCode: "확인 필요",
    supportBefore: "선정 지원이 필요하면 ", contact: "문의해 주세요", supportAfter: ". 기술팀이 적합한 피팅과 액세서리 선정을 도와드립니다.",
    add: "목록에 추가", added: "목록에 추가됨", confirm: "확인 후 돌아가기", source: "경질 튜브 피팅 액세서리 선택", accessoryProduct: "{material} {kind} ({model}용)",
  },
  ru: {
    washer: "Шайба", ferrule: "Феррула", fitting: "Фитинг", natural: "Натуральный", black: "Чёрный", yellow: "Жёлтый", steel: "Нержавеющая сталь SUS",
    configure: "Подобрать комплект", reselect: "Изменить выбор", option: "Опция 1:", optional: "Доступный совместимый компонент: {kind}", paired: "Компонент: {kind}", without: "Без компонента: {kind}", fittingOnly: "Только фитинг",
    title: "Подбор фитинга для жёсткой трубки и компонента: {kind}", description: "Выберите один совместимый компонент для комплекта. Перед выбором другого комплекта добавьте текущий в список.", close: "Закрыть подбор",
    current: "Текущий фитинг", code: "Код продукта", thread: "Размер резьбы", tube: "Наружный диаметр трубки", bodyMaterial: "Материал корпуса", bodyColor: "Цвет", material: "Материал", color: "Цвет",
    chooseMaterial: "Выберите материал: {kind}", chooseOne: "Выберите один совместимый компонент: {kind}", noneThisTime: "Компонент не включён: {kind}", configuration: "Конфигурация", compatibility: "Резьба {thread} · Наружный диаметр трубки: {diameters}",
    pairing: "Комплект", withAccessory: "Фитинг + {kind}", materialSingle: "Материал: {kind} (один вариант)", fitsTube: "Для трубки с наружным диаметром {diameters}", tubeFit: "Совместимый наружный диаметр трубки", specs: "Характеристики: {kind}",
    outer: "Наружный диаметр", inner: "Внутренний диаметр", height: "Высота", thickness: "Толщина", tubeOd: "Наружный диаметр трубки", dimensionsNote: "Размеры зависят от выбранной модели.",
    selectionNote: "Выбирайте по одному компоненту. Для другого материала или диаметра трубки сначала добавьте текущий комплект в список.", fittingOnlyNote: "Вариант «Только фитинг» не включает дополнительный компонент. Для сборки по-прежнему требуется совместимый компонент: {kind}.",
    selected: "Выбранный комплект", copy: "Копировать выбор", copied: "Скопировано", copyFailed: "Не удалось скопировать. Повторите попытку.", notIncluded: "Не включено", pendingCode: "Уточняется",
    supportBefore: "Для помощи с подбором ", contact: "свяжитесь с нами", supportAfter: ". Наши специалисты помогут выбрать подходящий фитинг и совместимый компонент.",
    add: "Добавить в список", added: "Добавлено в список", confirm: "Подтвердить и вернуться", source: "Подбор компонентов для фитинга жёсткой трубки", accessoryProduct: "{kind}, {material} (для {model})",
  },
};

export function getHardTubeAccessoryCopy(locale: string = "zh") {
  return copies[locale as HardTubeAccessoryLocale] || copies.zh;
}
export function formatHardTubeCopy(template: string, values: Record<string, string | number>) {
  return template.replace(/\{(\w+)\}/g, (placeholder, key: string) => String(values[key] ?? placeholder));
}
export function getHardTubeAccessoryKindLabel(kind: string, locale = "zh") {
  const copy = getHardTubeAccessoryCopy(locale);
  return kind === "垫片" || kind === "washer" ? copy.washer : copy.ferrule;
}
export function getHardTubeColorLabel(color: string, locale = "zh") {
  const copy = getHardTubeAccessoryCopy(locale);
  return ({ 本色: copy.natural, 黑色: copy.black, 黄色: copy.yellow } as Record<string, string>)[color] || color;
}
export function getHardTubeMaterialLabel(material: string, locale = "zh") {
  return material === "SUS" ? getHardTubeAccessoryCopy(locale).steel : material;
}
