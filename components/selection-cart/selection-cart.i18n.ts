import type { LocaleCode } from "@/lib/i18n";

export interface SelectionCartCopy {
  headerDescription: string;
  productsCount: string;
  drawingRequests: string;
  itemUnit: string;
  emptyHint: string;
  openDetailsTitle: string;
  noteTitle: string;
  noteDescription: string;
  printTitle: string;
  printDescription: string;
  generated: string;
  number: string;
  source: string;
  product: string;
  relatedInformation: string;
  model: string;
  drawing: string;
  configuredProduct: string;
  required: string;
  notRequired: string;
  pdfHeaderAlt: string;
  pdfFooterAlt: string;
  sourceLabels: {
    products: string;
    fittingReplacement: string;
  };
}

const SELECTION_CART_COPY: Record<LocaleCode, SelectionCartCopy> = {
  "zh-CN": {
    headerDescription:
      "确认型号、数量与图纸需求，后续可统一提交或生成资料包。",
    productsCount: "产品数量",
    drawingRequests: "图纸需求",
    itemUnit: "项",
    emptyHint: "可先选择型号并加入清单",
    openDetailsTitle: "新窗口打开详情页",
    noteTitle: "清单说明",
    noteDescription:
      "产品加入清单后不会默认发送图纸。需要图纸的型号，可在详情页或清单中切换。后续提交需求时，只会把标记“需要图纸”的型号纳入图纸发送范围。",
    printTitle: "恒永达选型清单",
    printDescription:
      "本清单根据客户选择的型号生成，用于型号确认、报价沟通及内部技术确认。",
    generated: "生成时间",
    number: "序号",
    source: "来源",
    product: "产品信息",
    relatedInformation: "关联信息",
    model: "型号",
    drawing: "2D 图纸",
    configuredProduct: "定制选型产品",
    required: "需要",
    notRequired: "暂不需要",
    pdfHeaderAlt: "FOREACH PDF 页眉",
    pdfFooterAlt: "FOREACH PDF 页脚",
    sourceLabels: {
      products: "产品中心",
      fittingReplacement: "接头替代查询",
    },
  },
  en: {
    headerDescription:
      "Confirm models, quantities, and drawing requirements before submitting or generating a PDF list.",
    productsCount: "Products",
    drawingRequests: "Drawing Requests",
    itemUnit: "items",
    emptyHint: "Select a model and add it to the list.",
    openDetailsTitle: "Open product details in a new window",
    noteTitle: "List Notes",
    noteDescription:
      "Adding a product does not automatically request a drawing. Mark the required models here or on the product page; only marked models will be included in the drawing request.",
    printTitle: "FOREACH Product Selection List",
    printDescription:
      "This list is generated from the selected models for model confirmation, quotation discussions, and technical review.",
    generated: "Generated",
    number: "No.",
    source: "Source",
    product: "Product",
    relatedInformation: "Related Information",
    model: "Model",
    drawing: "2D Drawing",
    configuredProduct: "Configured Product",
    required: "Required",
    notRequired: "Not Required",
    pdfHeaderAlt: "FOREACH PDF Header",
    pdfFooterAlt: "FOREACH PDF Footer",
    sourceLabels: {
      products: "Products",
      fittingReplacement: "Fitting Replacement Search",
    },
  },
  es: {
    headerDescription:
      "Confirme los modelos, las cantidades y los planos necesarios antes de enviar la solicitud o generar la lista PDF.",
    productsCount: "Productos",
    drawingRequests: "Solicitudes de planos",
    itemUnit: "elementos",
    emptyHint: "Seleccione un modelo y añádalo a la lista.",
    openDetailsTitle: "Abrir los detalles del producto en una ventana nueva",
    noteTitle: "Notas de la lista",
    noteDescription:
      "Añadir un producto no solicita automáticamente su plano. Marque aquí o en la página del producto los modelos cuyos planos necesita; solo los modelos marcados se incluirán en la solicitud.",
    printTitle: "Lista de selección de productos FOREACH",
    printDescription:
      "Esta lista se genera a partir de los modelos seleccionados para confirmar modelos, preparar cotizaciones y realizar revisiones técnicas.",
    generated: "Generado",
    number: "N.º",
    source: "Origen",
    product: "Producto",
    relatedInformation: "Información relacionada",
    model: "Modelo",
    drawing: "Plano 2D",
    configuredProduct: "Producto configurado",
    required: "Requerido",
    notRequired: "No requerido",
    pdfHeaderAlt: "Encabezado del PDF de FOREACH",
    pdfFooterAlt: "Pie del PDF de FOREACH",
    sourceLabels: {
      products: "Productos",
      fittingReplacement: "Búsqueda de racores equivalentes",
    },
  },
  fr: {
    headerDescription:
      "Confirmez les modèles, les quantités et les plans requis avant d’envoyer la demande ou de générer la liste PDF.",
    productsCount: "Produits",
    drawingRequests: "Demandes de plans",
    itemUnit: "éléments",
    emptyHint: "Sélectionnez un modèle et ajoutez-le à la liste.",
    openDetailsTitle: "Ouvrir les détails du produit dans une nouvelle fenêtre",
    noteTitle: "Notes de la liste",
    noteDescription:
      "L’ajout d’un produit ne demande pas automatiquement son plan. Marquez ici ou sur la page du produit les modèles dont le plan est requis ; seuls les modèles marqués seront inclus dans la demande de plans.",
    printTitle: "Liste de sélection de produits FOREACH",
    printDescription:
      "Cette liste est générée à partir des modèles sélectionnés pour la confirmation des modèles, les échanges de devis et la revue technique.",
    generated: "Généré",
    number: "N°",
    source: "Source",
    product: "Produit",
    relatedInformation: "Informations associées",
    model: "Modèle",
    drawing: "Plan 2D",
    configuredProduct: "Produit configuré",
    required: "Requis",
    notRequired: "Non requis",
    pdfHeaderAlt: "En-tête du PDF FOREACH",
    pdfFooterAlt: "Pied de page du PDF FOREACH",
    sourceLabels: {
      products: "Produits",
      fittingReplacement: "Recherche de raccords équivalents",
    },
  },
  ko: {
    headerDescription:
      "제출하거나 PDF 목록을 생성하기 전에 모델, 수량 및 도면 요구 사항을 확인하세요.",
    productsCount: "제품",
    drawingRequests: "도면 요청",
    itemUnit: "개",
    emptyHint: "모델을 선택하여 목록에 추가하세요.",
    openDetailsTitle: "새 창에서 제품 상세 정보 열기",
    noteTitle: "목록 안내",
    noteDescription:
      "제품을 목록에 추가해도 도면이 자동으로 요청되지는 않습니다. 필요한 모델을 여기 또는 제품 페이지에서 표시하세요. 표시된 모델만 도면 요청에 포함됩니다.",
    printTitle: "FOREACH 제품 선택 목록",
    printDescription:
      "이 목록은 모델 확인, 견적 협의 및 기술 검토를 위해 선택한 모델을 기준으로 생성됩니다.",
    generated: "생성 일시",
    number: "번호",
    source: "출처",
    product: "제품 정보",
    relatedInformation: "관련 정보",
    model: "모델",
    drawing: "2D 도면",
    configuredProduct: "구성 제품",
    required: "필요",
    notRequired: "불필요",
    pdfHeaderAlt: "FOREACH PDF 머리글",
    pdfFooterAlt: "FOREACH PDF 바닥글",
    sourceLabels: {
      products: "제품",
      fittingReplacement: "피팅 대체품 검색",
    },
  },
  ru: {
    headerDescription:
      "Перед отправкой или созданием PDF-списка проверьте модели, количество и требования к чертежам.",
    productsCount: "Продукты",
    drawingRequests: "Запросы чертежей",
    itemUnit: "поз.",
    emptyHint: "Выберите модель и добавьте её в список.",
    openDetailsTitle: "Открыть сведения о продукте в новом окне",
    noteTitle: "Примечания к списку",
    noteDescription:
      "Добавление продукта в список не означает автоматический запрос чертежа. Отметьте нужные модели здесь или на странице продукта; в запрос чертежей будут включены только отмеченные модели.",
    printTitle: "Список выбранных продуктов FOREACH",
    printDescription:
      "Этот список сформирован на основе выбранных моделей для подтверждения, согласования предложения и технической проверки.",
    generated: "Сформировано",
    number: "№",
    source: "Источник",
    product: "Информация о продукте",
    relatedInformation: "Связанная информация",
    model: "Модель",
    drawing: "2D-чертёж",
    configuredProduct: "Настроенный продукт",
    required: "Требуется",
    notRequired: "Не требуется",
    pdfHeaderAlt: "Заголовок PDF FOREACH",
    pdfFooterAlt: "Нижний колонтитул PDF FOREACH",
    sourceLabels: {
      products: "Продукция",
      fittingReplacement: "Поиск аналогов фитингов",
    },
  },
};

export function getSelectionCartCopy(locale: LocaleCode) {
  return SELECTION_CART_COPY[locale];
}
