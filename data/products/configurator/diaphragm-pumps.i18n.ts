import type {
  ProductConfiguratorLocale,
  ProductConfiguratorUiText,
} from "@/components/products/configurator/product-variant-configurator.types";

type DiaphragmPumpConfiguratorCopy = {
  title: string;
  description: string;
  empty: string;
  noticeTitle: string;
  notice: string;
  summaryLabels: {
    motorConnection: string;
    wettedMaterials: string;
    diaphragm: string;
    valvePlate: string;
    pumpHead: string;
  };
  labels: {
    motor: string;
    voltage: string;
    material: string;
    direction: string;
    connection: string;
    pumpHead: string;
    wiring: string;
    diaphragm: string;
    valvePlate: string;
  };
  values: {
    brushed: string;
    brushless: string;
    barbed: string;
    threaded: string;
    twoWire: string;
    upward: string;
    downward: string;
  };
  ui: ProductConfiguratorUiText;
};

const copy: Record<ProductConfiguratorLocale, DiaphragmPumpConfiguratorCopy> = {
  zh: {
    summaryLabels: { motorConnection: "电机与接口", wettedMaterials: "接液材质", diaphragm: "膜片", valvePlate: "阀片", pumpHead: "泵头" },
    title: "型号选型",
    description: "按标准选型表选择配置，查看完整订货型号和商品编码。仅显示当前产品对应的标准配置。",
    empty: "请选择配置",
    noticeTitle: "选型说明：",
    notice: "以上为常规配置，可按需选择并加入清单。如需特殊配置，请联系我们确认。",
    labels: { motor: "电机类型", voltage: "额定电压", material: "材料组合", direction: "接口朝向", connection: "接口类型", pumpHead: "泵头材质", wiring: "电机出线", diaphragm: "膜片材质", valvePlate: "阀片材质" },
    values: { brushed: "D · 直流有刷电机", brushless: "B · 直流无刷电机", barbed: "B · 倒刺端口", threaded: "S · 螺纹端口", twoWire: "2线", upward: "C · 向上", downward: "6 · 向下" },
    ui: {
      closeAriaLabel: "关闭选型", currentSelection: "当前选型", finalModel: "完整订货型号", productCode: "商品编码", configuration: "配置选择", selectionHint: "请选择全部配置项；不同标准型号可分别加入清单", matchedModel: "匹配型号", noMatchedModel: "请选择配置", copyModel: "复制型号", copied: "已复制", addToList: "加入清单", addedToList: "已加入清单", confirmAndReturn: "确认并返回", defaultNoticeTitle: "选型说明：", defaultNotice: "以上为常规配置，可按需选择并加入清单。如需特殊配置，请联系我们确认。",
    },
  },
  en: {
    summaryLabels: { motorConnection: "Motor and connection", wettedMaterials: "Wetted materials", diaphragm: "Diaphragm", valvePlate: "Valve plate", pumpHead: "Pump head" },
    title: "Model Selection",
    description: "Select a configuration from the standard ordering table to view its complete model and product code. Only standard configurations for this product are shown.",
    empty: "Select a configuration",
    noticeTitle: "Selection notes:",
    notice: "The configurations above are standard options. Select as needed and add them to your list. For special configurations, please contact us to confirm.",
    labels: { motor: "Motor type", voltage: "Rated voltage", material: "Material combination", direction: "Port direction", connection: "Connection type", pumpHead: "Pump head material", wiring: "Motor leads", diaphragm: "Diaphragm material", valvePlate: "Valve plate material" },
    values: { brushed: "D · Brushed DC motor", brushless: "B · Brushless DC motor", barbed: "B · Barbed ports", threaded: "S · Threaded ports", twoWire: "Two wires", upward: "C · Upward", downward: "6 · Downward" },
    ui: {
      closeAriaLabel: "Close model selector", currentSelection: "Current selection", finalModel: "Complete ordering model", productCode: "Product code", configuration: "Configuration", selectionHint: "Select every configuration field; add different standard models separately", matchedModel: "Matching model", noMatchedModel: "Select a configuration", copyModel: "Copy model", copied: "Copied", addToList: "Add to list", addedToList: "Added to list", confirmAndReturn: "Confirm and return", defaultNoticeTitle: "Selection notes:", defaultNotice: "The configurations above are standard options. Select as needed and add them to your list. For special configurations, please contact us to confirm.",
    },
  },
  es: {
    summaryLabels: { motorConnection: "Motor y conexión", wettedMaterials: "Materiales en contacto con el fluido", diaphragm: "Membrana", valvePlate: "Placa de válvula", pumpHead: "Cabezal" },
    title: "Selección de modelo",
    description: "Seleccione una configuración de la tabla de pedidos estándar para ver el modelo completo y su código de producto. Solo se muestran configuraciones estándar de este producto.",
    empty: "Seleccione una configuración",
    noticeTitle: "Notas de selección:",
    notice: "Las configuraciones anteriores son opciones estándar. Seleccione las que necesite y añádalas a la lista. Si necesita una configuración especial, póngase en contacto con nosotros para confirmarla.",
    labels: { motor: "Tipo de motor", voltage: "Tensión nominal", material: "Combinación de materiales", direction: "Orientación de los puertos", connection: "Tipo de conexión", pumpHead: "Material del cabezal", wiring: "Cables del motor", diaphragm: "Material de la membrana", valvePlate: "Material de la placa de válvula" },
    values: { brushed: "D · Motor CC con escobillas", brushless: "B · Motor CC sin escobillas", barbed: "B · Puertos de espiga", threaded: "S · Puertos roscados", twoWire: "Dos cables", upward: "C · Hacia arriba", downward: "6 · Hacia abajo" },
    ui: {
      closeAriaLabel: "Cerrar selector de modelo", currentSelection: "Selección actual", finalModel: "Modelo completo de pedido", productCode: "Código de producto", configuration: "Configuración", selectionHint: "Seleccione todos los campos; añada cada modelo estándar por separado", matchedModel: "Modelo coincidente", noMatchedModel: "Seleccione una configuración", copyModel: "Copiar modelo", copied: "Copiado", addToList: "Añadir a la lista", addedToList: "Añadido a la lista", confirmAndReturn: "Confirmar y volver", defaultNoticeTitle: "Notas de selección:", defaultNotice: "Las configuraciones anteriores son opciones estándar. Seleccione las que necesite y añádalas a la lista. Si necesita una configuración especial, póngase en contacto con nosotros para confirmarla.",
    },
  },
  fr: {
    summaryLabels: { motorConnection: "Moteur et raccordement", wettedMaterials: "Matériaux en contact avec le fluide", diaphragm: "Membrane", valvePlate: "Plaque de clapet", pumpHead: "Tête" },
    title: "Sélection du modèle",
    description: "Choisissez une configuration dans le tableau de commande standard pour afficher sa référence complète et son code produit. Seules les configurations standard de ce produit sont proposées.",
    empty: "Choisir une configuration",
    noticeTitle: "Notes de sélection :",
    notice: "Les configurations ci-dessus sont des options standard. Sélectionnez celles dont vous avez besoin et ajoutez-les à votre liste. Pour une configuration spéciale, contactez-nous pour la confirmer.",
    labels: { motor: "Type de moteur", voltage: "Tension nominale", material: "Combinaison de matériaux", direction: "Orientation des ports", connection: "Type de raccordement", pumpHead: "Matériau de la tête", wiring: "Fils du moteur", diaphragm: "Matériau de la membrane", valvePlate: "Matériau de la plaque de clapet" },
    values: { brushed: "D · Moteur CC à balais", brushless: "B · Moteur CC sans balais", barbed: "B · Embouts cannelés", threaded: "S · Ports filetés", twoWire: "Deux fils", upward: "C · Vers le haut", downward: "6 · Vers le bas" },
    ui: {
      closeAriaLabel: "Fermer le sélecteur de modèle", currentSelection: "Sélection actuelle", finalModel: "Référence complète de commande", productCode: "Code produit", configuration: "Configuration", selectionHint: "Choisissez tous les paramètres ; ajoutez chaque modèle standard séparément", matchedModel: "Modèle correspondant", noMatchedModel: "Choisir une configuration", copyModel: "Copier la référence", copied: "Copié", addToList: "Ajouter à la liste", addedToList: "Ajouté à la liste", confirmAndReturn: "Confirmer et revenir", defaultNoticeTitle: "Notes de sélection :", defaultNotice: "Les configurations ci-dessus sont des options standard. Sélectionnez celles dont vous avez besoin et ajoutez-les à votre liste. Pour une configuration spéciale, contactez-nous pour la confirmer.",
    },
  },
  ko: {
    summaryLabels: { motorConnection: "모터 및 연결 방식", wettedMaterials: "접액 재질", diaphragm: "다이어프램", valvePlate: "밸브판", pumpHead: "펌프 헤드" },
    title: "모델 선택",
    description: "표준 주문표에서 구성을 선택하면 전체 주문 모델명과 제품 코드를 확인할 수 있습니다. 해당 제품의 표준 구성만 표시됩니다.",
    empty: "구성을 선택하세요",
    noticeTitle: "선택 안내:",
    notice: "위 구성은 표준 구성입니다. 필요에 따라 선택하여 목록에 추가하세요. 특수 구성이 필요한 경우 당사에 문의하여 확인해 주세요.",
    labels: { motor: "모터 종류", voltage: "정격 전압", material: "재질 조합", direction: "포트 방향", connection: "연결 방식", pumpHead: "펌프 헤드 재질", wiring: "모터 배선", diaphragm: "다이어프램 재질", valvePlate: "밸브판 재질" },
    values: { brushed: "D · 브러시 DC 모터", brushless: "B · 브러시리스 DC 모터", barbed: "B · 바브 포트", threaded: "S · 나사 포트", twoWire: "2선", upward: "C · 위쪽", downward: "6 · 아래쪽" },
    ui: {
      closeAriaLabel: "모델 선택 닫기", currentSelection: "현재 선택", finalModel: "전체 주문 모델명", productCode: "제품 코드", configuration: "구성 선택", selectionHint: "모든 구성 항목을 선택하세요. 서로 다른 표준 모델은 각각 추가할 수 있습니다", matchedModel: "일치 모델", noMatchedModel: "구성을 선택하세요", copyModel: "모델명 복사", copied: "복사됨", addToList: "목록에 추가", addedToList: "목록에 추가됨", confirmAndReturn: "확인 후 돌아가기", defaultNoticeTitle: "선택 안내:", defaultNotice: "위 구성은 표준 구성입니다. 필요에 따라 선택하여 목록에 추가하세요. 특수 구성이 필요한 경우 당사에 문의하여 확인해 주세요.",
    },
  },
  ru: {
    summaryLabels: { motorConnection: "Двигатель и соединение", wettedMaterials: "Материалы, контактирующие со средой", diaphragm: "Мембрана", valvePlate: "Клапанная пластина", pumpHead: "Головка" },
    title: "Подбор модели",
    description: "Выберите конфигурацию из стандартной таблицы заказа, чтобы увидеть полное обозначение модели и код изделия. Показаны только стандартные конфигурации этого изделия.",
    empty: "Выберите конфигурацию",
    noticeTitle: "Примечания к выбору:",
    notice: "Выше представлены стандартные конфигурации. Выберите нужные и добавьте их в список. Если требуется специальная конфигурация, свяжитесь с нами для согласования.",
    labels: { motor: "Тип двигателя", voltage: "Номинальное напряжение", material: "Сочетание материалов", direction: "Направление портов", connection: "Тип соединения", pumpHead: "Материал головки", wiring: "Провода двигателя", diaphragm: "Материал мембраны", valvePlate: "Материал клапанной пластины" },
    values: { brushed: "D · Щёточный двигатель постоянного тока", brushless: "B · Бесщёточный двигатель постоянного тока", barbed: "B · Штуцеры под шланг", threaded: "S · Резьбовые порты", twoWire: "Два провода", upward: "C · Вверх", downward: "6 · Вниз" },
    ui: {
      closeAriaLabel: "Закрыть подбор модели", currentSelection: "Текущий выбор", finalModel: "Полное обозначение для заказа", productCode: "Код изделия", configuration: "Конфигурация", selectionHint: "Выберите все параметры; разные стандартные модели добавляются отдельно", matchedModel: "Подходящая модель", noMatchedModel: "Выберите конфигурацию", copyModel: "Копировать модель", copied: "Скопировано", addToList: "Добавить в список", addedToList: "Добавлено в список", confirmAndReturn: "Подтвердить и вернуться", defaultNoticeTitle: "Примечания к выбору:", defaultNotice: "Выше представлены стандартные конфигурации. Выберите нужные и добавьте их в список. Если требуется специальная конфигурация, свяжитесь с нами для согласования.",
    },
  },
};

export function getDiaphragmPumpConfiguratorCopy(locale: ProductConfiguratorLocale) {
  return copy[locale];
}
