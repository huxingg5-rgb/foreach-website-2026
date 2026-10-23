import type { ProductConfiguratorConfig, ProductConfiguratorLocale, ProductConfiguratorUiText } from "@/components/products/configurator/product-variant-configurator.types";

type Copy = {
  title: string;
  description: string;
  barbedDescription: string;
  viewConfiguration: string;
  empty: string;
  hint: string;
  noticeTitle: string;
  notice: string;
  labels: string[];
  values: string[];
  ui: string[];
};

const labelKeys = ["使用电压", "膜片材质", "底板材质", "节能回路", "接口类型", "通道数", "阀形式", "通径", "螺纹接口", "阀座材质"];
const valueKeys = ["标准型（无节能回路）", "带节能回路（Y）", "三通", "二通常开", "二通常闭", "P · 基板型", "B16 · 倒刺（宝塔）", "无", "1/4-28 UNF（U28）"];
const uiKeys = ["closeAriaLabel", "currentSelection", "finalModel", "productCode", "configuration", "matchedModel", "copyModel", "copied", "addToList", "addedToList", "confirmAndReturn"] as const;

const translations: Record<Exclude<ProductConfiguratorLocale, "zh">, Copy> = {
  en: {
    title: "Model Selection",
    description: "Select a configuration for this valve to view the complete model number and product code.",
    barbedDescription: "Select the voltage, diaphragm material, base-plate material and power-saving option to build the complete barbed valve model number.",
    viewConfiguration: "View Configuration", empty: "Select a configuration",
    hint: "Only configurations for this valve are shown. Add different configurations separately.",
    noticeTitle: "Selection list:",
    notice: "You can select and add multiple configurations to your list. Choose a different configuration each time; there is no need to add the same configuration again.",
    labels: ["Rated Voltage", "Diaphragm Material", "Base-Plate Material", "Power-Saving Circuit", "Connection Type", "Number of Ports", "Valve Function", "Orifice Diameter", "Threaded Port", "Valve-Seat Material"],
    values: ["Standard (no power-saving circuit)", "With power-saving circuit (Y)", "3-way", "2-way normally open", "2-way normally closed", "P · Base mounted", "B16 · Barbed ports", "None", "1/4-28 UNF (U28)"],
    ui: ["Close model selector", "Current Selection", "Model Number", "Product Code", "Configuration", "Matching Model", "Copy Model", "Copied", "Add to List", "Added to List", "Confirm and Return"],
  },
  es: {
    title: "Selección de modelo",
    description: "Seleccione la configuración de esta válvula para ver el modelo completo y su código de producto.",
    barbedDescription: "Seleccione la tensión, los materiales del diafragma y de la base y el circuito de ahorro de energía para obtener el modelo completo de la válvula con espigas.",
    viewConfiguration: "Ver configuración", empty: "Seleccione una configuración",
    hint: "Solo se muestran configuraciones de esta válvula. Añada cada configuración por separado.",
    noticeTitle: "Lista de selección:",
    notice: "Puede seleccionar y añadir varias configuraciones a la lista. Elija una configuración diferente cada vez; no es necesario añadir la misma de nuevo.",
    labels: ["Tensión nominal", "Material del diafragma", "Material de la base", "Circuito de ahorro de energía", "Tipo de conexión", "Número de vías", "Función de la válvula", "Diámetro del orificio", "Conexión roscada", "Material del asiento"],
    values: ["Estándar (sin circuito de ahorro)", "Con circuito de ahorro de energía (Y)", "3 vías", "2 vías normalmente abierta", "2 vías normalmente cerrada", "P · Montaje en base", "B16 · Conexiones de espiga", "Ninguno", "1/4-28 UNF (U28)"],
    ui: ["Cerrar selector de modelo", "Selección actual", "Modelo completo", "Código de producto", "Configuración", "Modelo coincidente", "Copiar modelo", "Copiado", "Añadir a la lista", "Añadido a la lista", "Confirmar y volver"],
  },
  fr: {
    title: "Sélection du modèle",
    description: "Sélectionnez une configuration de cette électrovanne pour afficher la référence complète et le code produit.",
    barbedDescription: "Choisissez la tension, les matériaux de la membrane et de l’embase ainsi que le circuit d’économie d’énergie pour obtenir la référence complète de la vanne à embouts cannelés.",
    viewConfiguration: "Voir la configuration", empty: "Choisir une configuration",
    hint: "Seules les configurations de cette vanne sont affichées. Ajoutez chaque configuration séparément.",
    noticeTitle: "Liste de sélection :",
    notice: "Vous pouvez sélectionner et ajouter plusieurs configurations à votre liste. Choisissez une configuration différente à chaque ajout ; il est inutile d’ajouter deux fois la même.",
    labels: ["Tension nominale", "Matériau de la membrane", "Matériau de l’embase", "Circuit d’économie d’énergie", "Type de raccordement", "Nombre de voies", "Fonction de la vanne", "Diamètre de l’orifice", "Port fileté", "Matériau du siège"],
    values: ["Standard (sans circuit d’économie)", "Avec circuit d’économie d’énergie (Y)", "3 voies", "2 voies normalement ouverte", "2 voies normalement fermée", "P · Montage sur embase", "B16 · Embouts cannelés", "Aucun", "1/4-28 UNF (U28)"],
    ui: ["Fermer le sélecteur de modèle", "Sélection actuelle", "Référence complète", "Code produit", "Configuration", "Modèle correspondant", "Copier la référence", "Copié", "Ajouter à la liste", "Ajouté à la liste", "Confirmer et revenir"],
  },
  ko: {
    title: "모델 선택",
    description: "이 밸브의 구성을 선택하면 전체 모델명과 제품 코드를 확인할 수 있습니다.",
    barbedDescription: "전압, 다이어프램 재질, 베이스 재질, 절전 회로를 선택하여 바브형 밸브의 전체 모델명을 확인하세요.",
    viewConfiguration: "구성 보기", empty: "구성을 선택하세요",
    hint: "해당 밸브의 구성만 표시됩니다. 서로 다른 구성은 각각 목록에 추가할 수 있습니다.",
    noticeTitle: "선택 목록 안내:",
    notice: "여러 구성을 선택하여 목록에 추가할 수 있습니다. 추가할 때마다 다른 구성을 선택하세요. 같은 구성은 중복 추가할 필요가 없습니다.",
    labels: ["정격 전압", "다이어프램 재질", "베이스 재질", "절전 회로", "연결 방식", "포트 수", "밸브 기능", "오리피스 직경", "나사 포트", "밸브 시트 재질"],
    values: ["표준형(절전 회로 없음)", "절전 회로 포함(Y)", "3방향", "2방향 상시 열림", "2방향 상시 닫힘", "P · 베이스 장착형", "B16 · 바브 포트", "없음", "1/4-28 UNF (U28)"],
    ui: ["모델 선택 닫기", "현재 선택", "전체 모델명", "제품 코드", "구성 선택", "일치 모델", "모델명 복사", "복사됨", "목록에 추가", "목록에 추가됨", "확인 후 돌아가기"],
  },
  ru: {
    title: "Подбор модели",
    description: "Выберите конфигурацию клапана, чтобы увидеть полное обозначение модели и код изделия.",
    barbedDescription: "Выберите напряжение, материалы мембраны и основания, а также энергосберегающую схему, чтобы получить полное обозначение клапана со штуцерами под шланг.",
    viewConfiguration: "Конфигурация", empty: "Выберите конфигурацию",
    hint: "Показаны только конфигурации этого клапана. Разные конфигурации можно добавить отдельно.",
    noticeTitle: "Список подбора:",
    notice: "В список можно добавить несколько конфигураций. Каждый раз выбирайте другую конфигурацию; повторно добавлять одинаковую не требуется.",
    labels: ["Номинальное напряжение", "Материал мембраны", "Материал основания", "Энергосберегающая схема", "Тип соединения", "Число портов", "Функция клапана", "Диаметр отверстия", "Резьбовой порт", "Материал седла"],
    values: ["Стандартная (без энергосбережения)", "С энергосберегающей схемой (Y)", "Трёхходовой", "Двухходовой нормально открытый", "Двухходовой нормально закрытый", "P · Монтаж на коллектор", "B16 · Штуцеры под шланг", "Нет", "1/4-28 UNF (U28)"],
    ui: ["Закрыть подбор модели", "Текущий выбор", "Полное обозначение", "Код изделия", "Конфигурация", "Подходящая модель", "Копировать модель", "Скопировано", "Добавить в список", "Добавлено в список", "Подтвердить и вернуться"],
  },
};

export function getSolenoidViewConfigurationText(locale: ProductConfiguratorLocale) {
  return locale === "zh" ? "查看配置" : translations[locale].viewConfiguration;
}

export function localizeSolenoidConfigurator(config: ProductConfiguratorConfig, locale: ProductConfiguratorLocale): ProductConfiguratorConfig {
  if (locale === "zh") return config;
  const text = translations[locale];
  const labels = Object.fromEntries(labelKeys.map((key, i) => [key, text.labels[i]]));
  const values = Object.fromEntries(valueKeys.map((key, i) => [key, text.values[i]]));
  const translateValue = (value: string | number) => typeof value === "string" ? values[value] ?? value : value;
  const uiText: ProductConfiguratorUiText = {
    ...Object.fromEntries(uiKeys.map((key, i) => [key, text.ui[i]])) as Pick<ProductConfiguratorUiText, typeof uiKeys[number]>,
    selectionHint: text.hint, noMatchedModel: text.empty,
    defaultNoticeTitle: text.noticeTitle, defaultNotice: text.notice,
  };
  return {
    ...config, localizedLocale: locale,
    title: `${config.productName} · ${text.title}`,
    description: config.id.includes("barbed") ? text.barbedDescription : text.description,
    emptySelectionText: text.empty, noticeTitle: text.noticeTitle, notice: text.notice, uiText,
    dimensions: config.dimensions.map(dimension => ({
      ...dimension, label: labels[dimension.label] ?? dimension.label,
      order: dimension.order?.map(translateValue),
    })),
    variants: config.variants.map(variant => ({
      ...variant,
      attributes: Object.fromEntries(Object.entries(variant.attributes).map(([key, value]) => [key, translateValue(value)])),
    })),
    fixedSummaryRows: config.fixedSummaryRows?.map(row => ({
      label: labels[row.label] ?? row.label, value: String(translateValue(row.value)),
    })),
  };
}
