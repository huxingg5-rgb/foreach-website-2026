import type { ProductConfiguratorConfig, ProductConfiguratorLocale, ProductConfiguratorUiText } from "@/components/products/configurator/product-variant-configurator.types";

// Authored interface copy. Ordering codes, options and engineering values come
// from the same Chinese configuration; localization never creates variants.
const locales = ["en", "es", "fr", "ko", "ru"] as const;
type Translations = readonly [string, string, string, string, string];
const text: Record<string, Translations> = {
  "型号选型": ["Model selection", "Selección de modelo", "Sélection du modèle", "모델 선택", "Подбор модели"],
  "配置查看": ["Configuration details", "Detalles de configuración", "Détails de la configuration", "구성 보기", "Просмотр конфигурации"],
  "请选择配置": ["Select a configuration", "Seleccione una configuración", "Choisir une configuration", "구성을 선택하세요", "Выберите конфигурацию"],
  "当前配置": ["Current configuration", "Configuración actual", "Configuration actuelle", "현재 구성", "Текущая конфигурация"],
  "选型提示：": ["Selection notes:", "Notas de selección:", "Conseils de sélection :", "선정 안내:", "Примечания к выбору:"],
  "可将不同配置分别加入清单。其他排量、接口或安装需求请在询盘中说明，具体配置另行确认。": ["Add each configuration to your list separately. Specify any other displacement, connection or mounting requirements in your inquiry so the configuration can be confirmed.", "Añada cada configuración a la lista por separado. Indique en la consulta si necesita otro desplazamiento, conexión o montaje para que podamos confirmar la configuración.", "Ajoutez chaque configuration séparément à votre liste. Précisez dans votre demande tout autre besoin de cylindrée, de raccordement ou de montage afin de confirmer la configuration.", "서로 다른 구성을 각각 목록에 추가할 수 있습니다. 다른 토출량, 포트 또는 장착 조건이 필요하면 문의 시 알려 주세요. 구체적인 구성은 별도로 확인합니다.", "Добавляйте разные конфигурации в список отдельно. Если нужны другой рабочий объём, присоединения или крепление, укажите это в запросе для согласования конфигурации."],
  "仅显示本款配置，可将不同型号分别加入清单": ["Only configurations for this product are shown. Add different models separately.", "Solo se muestran configuraciones de este producto. Añada cada modelo por separado.", "Seules les configurations de ce produit sont affichées. Ajoutez chaque modèle séparément.", "이 제품에 해당하는 구성만 표시됩니다. 서로 다른 모델을 각각 목록에 추가할 수 있습니다.", "Показаны только конфигурации этого изделия. Разные модели можно добавлять отдельно."],
  "选择单圈排量，查看对应完整型号及商品编码。": ["Select the displacement per revolution to see the complete ordering model and product code.", "Seleccione el desplazamiento por revolución para ver el modelo completo de pedido y el código de producto.", "Choisissez la cylindrée par tour pour afficher la référence de commande complète et le code produit.", "회전당 토출량을 선택하면 전체 주문 모델명과 상품 코드를 확인할 수 있습니다.", "Выберите рабочий объём за оборот, чтобы увидеть полное обозначение для заказа и код изделия."],
  "查看当前系列配置，可加入清单并提交具体排量与驱动需求。": ["Review the series configuration, add it to your list and specify your displacement and drive requirements in the inquiry.", "Revise la configuración de la serie, añádala a la lista e indique el desplazamiento y el accionamiento que necesita.", "Consultez la configuration de la série, ajoutez-la à votre liste et précisez vos besoins de cylindrée et d’entraînement.", "현재 시리즈 구성을 확인하고 목록에 추가한 뒤 필요한 토출량과 구동 조건을 전달해 주세요.", "Ознакомьтесь с конфигурацией серии, добавьте её в список и укажите требования к рабочему объёму и приводу."],
  "查看本款双头泵的配比配置，确认后可加入选型清单。": ["Review the delivery ratio for this dual-head pump and add the configuration to your selection list.", "Revise la relación de dosificación de esta bomba de doble cabezal y añada la configuración a la lista.", "Vérifiez le rapport de dosage de cette pompe à deux têtes, puis ajoutez la configuration à votre liste.", "이 듀얼 헤드 펌프의 배합비 구성을 확인한 뒤 선정 목록에 추가할 수 있습니다.", "Проверьте соотношение подачи двухголовочного насоса и добавьте конфигурацию в список подбора."],
  "配置系列": ["Configuration series", "Serie de configuración", "Série", "구성 시리즈", "Серия"],
  "具体排量与完整订货型号按设备需求确认": ["Confirm the displacement and complete ordering model against your instrument requirements.", "Confirme el desplazamiento y el modelo completo de pedido según los requisitos del equipo.", "La cylindrée et la référence de commande complète sont à confirmer selon les besoins de l’instrument.", "구체적인 토출량과 전체 주문 모델명은 장비 요구사항에 따라 확인합니다.", "Рабочий объём и полное обозначение для заказа согласуются с учётом требований оборудования."],
  "单圈排量": ["Displacement per revolution", "Desplazamiento por revolución", "Cylindrée par tour", "회전당 토출량", "Рабочий объём за оборот"],
  "单圈排量范围": ["Displacement range per revolution", "Rango de desplazamiento por revolución", "Plage de cylindrée par tour", "회전당 토출량 범위", "Диапазон рабочего объёма за оборот"],
  "泵头材料": ["Pump head material", "Material del cabezal", "Matériau de la tête de pompe", "펌프 헤드 재질", "Материал головки насоса"],
  "聚偏二氟乙烯（PVDF）": ["Polyvinylidene fluoride (PVDF)", "Fluoruro de polivinilideno (PVDF)", "Polyfluorure de vinylidène (PVDF)", "폴리비닐리덴 플루오라이드(PVDF)", "Поливинилиденфторид (PVDF)"],
  "陶瓷套件": ["Ceramic set", "Conjunto cerámico", "Ensemble céramique", "세라믹 세트", "Керамический комплект"],
  "氧化锆（ZrO₂）": ["Zirconia (ZrO₂)", "Óxido de circonio (ZrO₂)", "Zircone (ZrO₂)", "산화지르코늄(ZrO₂)", "Диоксид циркония (ZrO₂)"],
  "氧化铝（Al₂O₃）": ["Alumina (Al₂O₃)", "Óxido de aluminio (Al₂O₃)", "Alumine (Al₂O₃)", "산화알루미늄(Al₂O₃)", "Оксид алюминия (Al₂O₃)"],
  "工作液路接口": ["Working-fluid port", "Puerto del fluido de proceso", "Raccord du circuit de procédé", "작동액 포트", "Порт рабочего контура"],
  "清洗液路接口": ["Wash-fluid port", "Puerto de lavado", "Raccord de rinçage", "세척액 포트", "Порт промывочного контура"],
  "浓缩液与稀释液体积比": ["Concentrate-to-diluent volume ratio", "Relación volumétrica concentrado:diluyente", "Rapport volumique concentré:diluant", "농축액:희석액 부피비", "Объёмное соотношение концентрата и разбавителя"],
  "浓缩液名义量": ["Nominal concentrate volume", "Volumen nominal de concentrado", "Volume nominal de concentré", "농축액 공칭 토출량", "Номинальный объём концентрата"],
  "稀释液名义量": ["Nominal diluent volume", "Volumen nominal de diluyente", "Volume nominal de diluant", "희석액 공칭 토출량", "Номинальный объём разбавителя"],
  "试剂 A 工作液路接口": ["Reagent A working-fluid port", "Puerto de proceso del reactivo A", "Raccord de procédé du réactif A", "시약 A 작동액 포트", "Рабочий порт реагента A"],
  "试剂 B 工作液路接口": ["Reagent B working-fluid port", "Puerto de proceso del reactivo B", "Raccord de procédé du réactif B", "시약 B 작동액 포트", "Рабочий порт реагента B"],
  "两路清洗液路接口": ["Wash-fluid ports, both circuits", "Puertos de lavado de ambos circuitos", "Raccords de rinçage des deux circuits", "양쪽 회로의 세척액 포트", "Промывочные порты обоих контуров"],
  "关闭选型": ["Close model selector", "Cerrar selector", "Fermer le sélecteur", "모델 선택 닫기", "Закрыть подбор модели"],
  "当前选型": ["Current selection", "Selección actual", "Sélection actuelle", "현재 선택", "Текущий выбор"],
  "完整订货型号": ["Complete ordering model", "Modelo completo de pedido", "Référence de commande complète", "전체 주문 모델명", "Полное обозначение для заказа"],
  "商品编码": ["Product code", "Código de producto", "Code produit", "상품 코드", "Код изделия"],
  "配置选择": ["Configuration", "Configuración", "Configuration", "구성 선택", "Конфигурация"],
  "匹配型号": ["Matching model", "Modelo seleccionado", "Modèle correspondant", "일치하는 모델", "Подходящая модель"],
  "复制型号": ["Copy model", "Copiar modelo", "Copier la référence", "모델명 복사", "Копировать модель"],
  "已复制": ["Copied", "Copiado", "Copié", "복사됨", "Скопировано"],
  "加入清单": ["Add to list", "Añadir a la lista", "Ajouter à la liste", "목록에 추가", "Добавить в список"],
  "已加入清单": ["Added to list", "Añadido a la lista", "Ajouté à la liste", "목록에 추가됨", "Добавлено в список"],
  "确认并返回": ["Confirm and return", "Confirmar y volver", "Confirmer et revenir", "확인 후 돌아가기", "Подтвердить и вернуться"],
};

export function localizeValvelessPumpConfigurator(config: ProductConfiguratorConfig, locale: string): ProductConfiguratorConfig | undefined {
  if (locale === "zh") return config;
  const index = locales.indexOf(locale as typeof locales[number]);
  if (index < 0) return undefined;
  const translate = (value: string): string => {
    if (text[value]) return text[value][index];
    if (/\p{Script=Han}/u.test(value)) throw new Error(`Missing valveless configurator translation: ${value}`);
    return value;
  };
  const uiText: ProductConfiguratorUiText = {
    closeAriaLabel: translate("关闭选型"), currentSelection: translate("当前选型"),
    finalModel: translate(config.uiText?.finalModel || "完整订货型号"), productCode: translate("商品编码"),
    configuration: translate("配置选择"), selectionHint: translate(config.uiText!.selectionHint!),
    matchedModel: translate("匹配型号"), noMatchedModel: translate("请选择配置"),
    copyModel: translate("复制型号"), copied: translate("已复制"),
    addToList: translate("加入清单"), addedToList: translate("已加入清单"),
    confirmAndReturn: translate("确认并返回"),
    defaultNoticeTitle: translate(config.noticeTitle!), defaultNotice: translate(config.notice!),
  };
  return {
    ...config, localizedLocale: locale as ProductConfiguratorLocale,
    title: `${config.productName} — ${translate(config.dimensions.length ? "型号选型" : "配置查看")}`,
    description: translate(config.description!), emptySelectionText: translate(config.emptySelectionText!),
    noticeTitle: uiText.defaultNoticeTitle, notice: uiText.defaultNotice, uiText,
    dimensions: config.dimensions.map(item => ({ ...item, label: translate(item.label) })),
    fixedSummaryRows: config.fixedSummaryRows?.map(row => ({ label: translate(row.label), value: translate(row.value) })),
  };
}
