import type {
  ProductConfiguratorConfig,
  ProductConfiguratorLocale,
  ProductConfiguratorUiText,
} from "./product-variant-configurator.types";

type TargetConfiguratorLocale = Exclude<
  ProductConfiguratorLocale,
  "zh" | "en"
>;

type DimensionSet =
  | "hardness"
  | "color"
  | "diameters";

type ProductConfiguratorLocaleCopy = {
  title: (material: string) => string;
  productName: (material: string) => string;
  description: Record<DimensionSet, string>;
  selectionHint: Record<DimensionSet, string>;
  dimensionLabels: Record<string, string>;
  material: string;
  packaging: string;
  noSelection: string;
  variantChoiceLabel: string;
  variantChoiceHint: string;
  noticeTitle: string;
  notice: Record<"pvc" | "tpu" | "ptfe" | "standard", string>;
  uiText: Omit<ProductConfiguratorUiText, "selectionHint">;
  values: Record<string, string>;
  roll: string;
};

const TARGET_CONFIGURATOR_COPY: Record<
  TargetConfiguratorLocale,
  ProductConfiguratorLocaleCopy
> = {
  es: {
    title: (material) => `Selector de dimensiones de tubo ${material}`,
    productName: (material) => `Tubo de ${material}`,
    description: {
      hardness:
        "Seleccione la dureza, el diámetro interior y el diámetro exterior para encontrar automáticamente el modelo correspondiente.",
      color:
        "Seleccione el diámetro interior, el diámetro exterior y el color para encontrar automáticamente el modelo correspondiente.",
      diameters:
        "Seleccione el diámetro interior y el diámetro exterior para encontrar automáticamente el modelo correspondiente.",
    },
    selectionHint: {
      hardness:
        "Seleccione la dureza y los diámetros; puede añadir distintos modelos a la lista",
      color:
        "Seleccione los diámetros y el color; puede añadir distintos modelos a la lista",
      diameters:
        "Seleccione los diámetros; puede añadir distintos modelos a la lista",
    },
    dimensionLabels: {
      hardness: "Dureza",
      innerDiameter: "Diámetro interior",
      outerDiameter: "Diámetro exterior",
      color: "Color",
    },
    material: "Material",
    packaging: "Embalaje",
    noSelection: "Sin selección",
    variantChoiceLabel: "Seleccionar un modelo",
    variantChoiceHint:
      "Esta especificación coincide con varios modelos. Seleccione el modelo y el código de producto requeridos.",
    noticeTitle: "Personalización por volumen:",
    notice: {
      pvc:
        "Para pedidos de mayor volumen, se pueden personalizar la dureza, los diámetros interior y exterior, la longitud del rollo y otras especificaciones. Contáctenos para confirmar la cantidad mínima y el plazo de entrega.",
      tpu:
        "Para pedidos de mayor volumen, se pueden personalizar la dureza, los diámetros interior y exterior, el color, la longitud del rollo y otras especificaciones. Contáctenos para confirmar la cantidad mínima y el plazo de entrega.",
      ptfe:
        "Para pedidos de mayor volumen, se pueden personalizar los diámetros interior y exterior, el color, la longitud del rollo y otras especificaciones. Contáctenos para confirmar la cantidad mínima y el plazo de entrega.",
      standard:
        "Para pedidos de mayor volumen, se pueden personalizar los diámetros interior y exterior, la longitud del rollo y otras especificaciones. Contáctenos para confirmar la cantidad mínima y el plazo de entrega.",
    },
    uiText: {
      closeAriaLabel: "Cerrar el selector de dimensiones",
      currentSelection: "Selección actual",
      finalModel: "Modelo coincidente",
      productCode: "Código de producto",
      configuration: "Seleccionar configuración",
      matchedModel: "Modelo coincidente",
      noMatchedModel: "No hay un modelo coincidente",
      copyModel: "Copiar modelo",
      copied: "Copiado",
      addToList: "Añadir a la lista",
      addedToList: "Añadido a la lista",
      confirmAndReturn: "Confirmar y volver",
      defaultNoticeTitle: "Personalización por volumen:",
      defaultNotice:
        "Se pueden personalizar las especificaciones para pedidos de mayor volumen. Contáctenos para confirmar la cantidad mínima y el plazo de entrega.",
    },
    values: {
      Natural: "Natural",
      Black: "Negro",
      Transparent: "Transparente",
      Blue: "Azul",
      Red: "Rojo",
    },
    roll: "rollo",
  },
  fr: {
    title: (material) => `Sélecteur de dimensions du tube en ${material}`,
    productName: (material) => `Tube en ${material}`,
    description: {
      hardness:
        "Sélectionnez la dureté, le diamètre intérieur et le diamètre extérieur pour identifier automatiquement le modèle correspondant.",
      color:
        "Sélectionnez le diamètre intérieur, le diamètre extérieur et la couleur pour identifier automatiquement le modèle correspondant.",
      diameters:
        "Sélectionnez le diamètre intérieur et le diamètre extérieur pour identifier automatiquement le modèle correspondant.",
    },
    selectionHint: {
      hardness:
        "Sélectionnez la dureté et les diamètres, puis ajoutez différents modèles à la liste",
      color:
        "Sélectionnez les diamètres et la couleur, puis ajoutez différents modèles à la liste",
      diameters:
        "Sélectionnez les diamètres, puis ajoutez différents modèles à la liste",
    },
    dimensionLabels: {
      hardness: "Dureté",
      innerDiameter: "Diamètre intérieur",
      outerDiameter: "Diamètre extérieur",
      color: "Couleur",
    },
    material: "Matériau",
    packaging: "Conditionnement",
    noSelection: "Aucune sélection",
    variantChoiceLabel: "Sélectionner un modèle",
    variantChoiceHint:
      "Cette spécification correspond à plusieurs modèles. Sélectionnez le modèle et le code produit requis.",
    noticeTitle: "Personnalisation en volume :",
    notice: {
      pvc:
        "Pour les commandes en volume, la dureté, les diamètres intérieur et extérieur, la longueur du rouleau et d’autres spécifications peuvent être personnalisés. Contactez-nous pour confirmer la quantité minimale et le délai.",
      tpu:
        "Pour les commandes en volume, la dureté, les diamètres intérieur et extérieur, la couleur, la longueur du rouleau et d’autres spécifications peuvent être personnalisés. Contactez-nous pour confirmer la quantité minimale et le délai.",
      ptfe:
        "Pour les commandes en volume, les diamètres intérieur et extérieur, la couleur, la longueur du rouleau et d’autres spécifications peuvent être personnalisés. Contactez-nous pour confirmer la quantité minimale et le délai.",
      standard:
        "Pour les commandes en volume, les diamètres intérieur et extérieur, la longueur du rouleau et d’autres spécifications peuvent être personnalisés. Contactez-nous pour confirmer la quantité minimale et le délai.",
    },
    uiText: {
      closeAriaLabel: "Fermer le sélecteur de dimensions",
      currentSelection: "Sélection actuelle",
      finalModel: "Modèle correspondant",
      productCode: "Code produit",
      configuration: "Choisir une configuration",
      matchedModel: "Modèle correspondant",
      noMatchedModel: "Aucun modèle correspondant",
      copyModel: "Copier le modèle",
      copied: "Copié",
      addToList: "Ajouter à la liste",
      addedToList: "Ajouté à la liste",
      confirmAndReturn: "Confirmer et revenir",
      defaultNoticeTitle: "Personnalisation en volume :",
      defaultNotice:
        "Des spécifications personnalisées sont disponibles pour les commandes en volume. Contactez-nous pour confirmer la quantité minimale et le délai.",
    },
    values: {
      Natural: "Naturel",
      Black: "Noir",
      Transparent: "Transparent",
      Blue: "Bleu",
      Red: "Rouge",
    },
    roll: "rouleau",
  },
  ko: {
    title: (material) => `${material} 튜브 규격 선택`,
    productName: (material) => `${material} 튜브`,
    description: {
      hardness:
        "경도, 내경 및 외경을 선택하면 해당 모델이 자동으로 매칭됩니다.",
      color:
        "내경, 외경 및 색상을 선택하면 해당 모델이 자동으로 매칭됩니다.",
      diameters:
        "내경과 외경을 선택하면 해당 모델이 자동으로 매칭됩니다.",
    },
    selectionHint: {
      hardness:
        "경도와 내·외경을 선택하고 서로 다른 모델을 목록에 추가할 수 있습니다",
      color:
        "내·외경과 색상을 선택하고 서로 다른 모델을 목록에 추가할 수 있습니다",
      diameters:
        "내·외경을 선택하고 서로 다른 모델을 목록에 추가할 수 있습니다",
    },
    dimensionLabels: {
      hardness: "경도",
      innerDiameter: "내경",
      outerDiameter: "외경",
      color: "색상",
    },
    material: "재질",
    packaging: "포장",
    noSelection: "선택 없음",
    variantChoiceLabel: "모델 선택",
    variantChoiceHint:
      "선택한 사양에 여러 모델이 있습니다. 필요한 모델과 제품 코드를 선택하세요.",
    noticeTitle: "대량 맞춤 제작 안내:",
    notice: {
      pvc:
        "대량 주문 시 특수 경도, 내·외경, 롤 길이 및 기타 사양을 맞춤 제작할 수 있습니다. 최소 주문 수량과 납기는 문의해 주세요.",
      tpu:
        "대량 주문 시 특수 경도, 내·외경, 색상, 롤 길이 및 기타 사양을 맞춤 제작할 수 있습니다. 최소 주문 수량과 납기는 문의해 주세요.",
      ptfe:
        "대량 주문 시 특수 내·외경, 색상, 롤 길이 및 기타 사양을 맞춤 제작할 수 있습니다. 최소 주문 수량과 납기는 문의해 주세요.",
      standard:
        "대량 주문 시 특수 내·외경, 롤 길이 및 기타 사양을 맞춤 제작할 수 있습니다. 최소 주문 수량과 납기는 문의해 주세요.",
    },
    uiText: {
      closeAriaLabel: "규격 선택 닫기",
      currentSelection: "현재 선택",
      finalModel: "일치 모델",
      productCode: "제품 코드",
      configuration: "사양 선택",
      matchedModel: "일치 모델",
      noMatchedModel: "일치하는 모델 없음",
      copyModel: "모델 복사",
      copied: "복사됨",
      addToList: "목록에 추가",
      addedToList: "목록에 추가됨",
      confirmAndReturn: "확인 후 돌아가기",
      defaultNoticeTitle: "대량 맞춤 제작 안내:",
      defaultNotice:
        "대량 주문 시 맞춤 사양을 제공할 수 있습니다. 최소 주문 수량과 납기는 문의해 주세요.",
    },
    values: {
      Natural: "내추럴",
      Black: "검은색",
      Transparent: "투명",
      Blue: "파란색",
      Red: "빨간색",
    },
    roll: "롤",
  },
  ru: {
    title: (material) => `Подбор размеров трубки ${material}`,
    productName: (material) => `Трубка ${material}`,
    description: {
      hardness:
        "Выберите твёрдость, внутренний и наружный диаметры, чтобы автоматически подобрать соответствующую модель.",
      color:
        "Выберите внутренний и наружный диаметры и цвет, чтобы автоматически подобрать соответствующую модель.",
      diameters:
        "Выберите внутренний и наружный диаметры, чтобы автоматически подобрать соответствующую модель.",
    },
    selectionHint: {
      hardness:
        "Выберите твёрдость и диаметры; разные модели можно добавить в список",
      color:
        "Выберите диаметры и цвет; разные модели можно добавить в список",
      diameters:
        "Выберите диаметры; разные модели можно добавить в список",
    },
    dimensionLabels: {
      hardness: "Твёрдость",
      innerDiameter: "Внутренний диаметр",
      outerDiameter: "Наружный диаметр",
      color: "Цвет",
    },
    material: "Материал",
    packaging: "Упаковка",
    noSelection: "Не выбрано",
    variantChoiceLabel: "Выберите модель",
    variantChoiceHint:
      "Этим параметрам соответствуют несколько моделей. Выберите нужную модель и код изделия.",
    noticeTitle: "Изготовление под заказ:",
    notice: {
      pvc:
        "Для крупных заказов возможен выбор специальной твёрдости, внутреннего и наружного диаметров, длины рулона и других параметров. Свяжитесь с нами для уточнения минимального заказа и срока поставки.",
      tpu:
        "Для крупных заказов возможен выбор специальной твёрдости, внутреннего и наружного диаметров, цвета, длины рулона и других параметров. Свяжитесь с нами для уточнения минимального заказа и срока поставки.",
      ptfe:
        "Для крупных заказов возможен выбор специальных внутреннего и наружного диаметров, цвета, длины рулона и других параметров. Свяжитесь с нами для уточнения минимального заказа и срока поставки.",
      standard:
        "Для крупных заказов возможен выбор специальных внутреннего и наружного диаметров, длины рулона и других параметров. Свяжитесь с нами для уточнения минимального заказа и срока поставки.",
    },
    uiText: {
      closeAriaLabel: "Закрыть подбор размера",
      currentSelection: "Текущая конфигурация",
      finalModel: "Подходящая модель",
      productCode: "Код изделия",
      configuration: "Выбор конфигурации",
      matchedModel: "Подходящая модель",
      noMatchedModel: "Подходящая модель не найдена",
      copyModel: "Копировать модель",
      copied: "Скопировано",
      addToList: "Добавить в список",
      addedToList: "Добавлено в список",
      confirmAndReturn: "Подтвердить и вернуться",
      defaultNoticeTitle: "Изготовление под заказ:",
      defaultNotice:
        "Для крупных заказов доступны нестандартные параметры. Свяжитесь с нами для уточнения минимального заказа и срока поставки.",
    },
    values: {
      Natural: "Натуральный",
      Black: "Чёрный",
      Transparent: "Прозрачный",
      Blue: "Синий",
      Red: "Красный",
    },
    roll: "рулон",
  },
};

function getDimensionSet(
  config: ProductConfiguratorConfig
): DimensionSet {
  if (
    config.dimensions.some(
      (dimension) => dimension.key === "hardness"
    )
  ) {
    return "hardness";
  }

  if (
    config.dimensions.some(
      (dimension) => dimension.key === "color"
    )
  ) {
    return "color";
  }

  return "diameters";
}

function getNoticeType(
  config: ProductConfiguratorConfig
): "pvc" | "tpu" | "ptfe" | "standard" {
  const id = config.id.toLowerCase();

  if (id.startsWith("pvc-")) return "pvc";
  if (id.startsWith("tpu-")) return "tpu";
  if (id.startsWith("ptfe-")) return "ptfe";

  return "standard";
}

function getMaterialName(
  config: ProductConfiguratorConfig
): string {
  const fromProductName = config.productName
    .replace(/\s*Tubing$/i, "")
    .trim();

  if (fromProductName) {
    return fromProductName;
  }

  return config.id
    .replace(/-tubing(?:-en)?$/i, "")
    .toUpperCase();
}

export function localizeProductConfiguratorConfig(
  config: ProductConfiguratorConfig,
  locale: ProductConfiguratorLocale
): ProductConfiguratorConfig {
  if (locale === "zh" || locale === "en") {
    return config;
  }

  const copy = TARGET_CONFIGURATOR_COPY[locale];
  const dimensionSet = getDimensionSet(config);
  const material = getMaterialName(config);

  return {
    ...config,
    title: copy.title(material),
    description: copy.description[dimensionSet],
    productName: copy.productName(material),
    emptySelectionText: copy.noSelection,
    variantChoiceLabel: copy.variantChoiceLabel,
    variantChoiceHint: config.variantChoiceHint
      ? copy.variantChoiceHint
      : undefined,
    dimensions: config.dimensions.map((dimension) => ({
      ...dimension,
      label:
        copy.dimensionLabels[dimension.key] ||
        dimension.label,
    })),
    fixedSummaryRows: config.fixedSummaryRows?.map((row) => ({
      ...row,
      label: row.label === "Material" ? copy.material : row.label,
    })),
    resultSummaryRows: config.resultSummaryRows?.map((row) => ({
      ...row,
      label: row.label === "Packaging" ? copy.packaging : row.label,
    })),
    noticeTitle: copy.noticeTitle,
    notice: copy.notice[getNoticeType(config)],
    uiText: {
      ...config.uiText,
      ...copy.uiText,
      selectionHint: copy.selectionHint[dimensionSet],
    },
  };
}

export function localizeProductConfiguratorValue(
  value: string,
  locale: ProductConfiguratorLocale
): string {
  if (locale === "zh" || locale === "en") {
    return value;
  }

  const copy = TARGET_CONFIGURATOR_COPY[locale];
  const directValue = copy.values[value];

  if (directValue) {
    return directValue;
  }

  return value.replace(
    /\b(m|ft)\/roll\b/gi,
    (_match, unit: string) =>
      `${unit}/${copy.roll}`
  );
}
