import type { LocaleCode } from "@/lib/i18n";

export interface SelectionCartCopy {
  requestQuote: string;
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
    requestQuote: "询价申请",
    headerDescription:
      "确认型号、数量与图纸需求，后续可统一提交或生成资料包。",
    productsCount: "产品数量",
    drawingRequests: "图纸需求",
    itemUnit: "项",
    emptyHint: "可先选择型号并加入清单",
    openDetailsTitle: "新窗口打开详情页",
    noteTitle: "清单说明",
    noteDescription:
      "1、清单保存在当前浏览器，清除数据或更换浏览器后可能丢失。\n2、可按配置选择 2D 尺寸图、3D CAD 模型，也可暂不申请；提交时会一并带上型号、数量和图纸需求。",
    printTitle: "恒永达选型清单",
    printDescription:
      "本清单根据客户选择的型号生成，用于型号确认、报价沟通及内部技术确认。",
    generated: "生成时间",
    number: "序号",
    source: "来源",
    product: "产品信息",
    relatedInformation: "关联信息",
    model: "型号",
    drawing: "图纸需求",
    configuredProduct: "定制选型产品",
    required: "需要",
    notRequired: "暂不需要",
    pdfHeaderAlt: "Foreach PDF 页眉",
    pdfFooterAlt: "Foreach PDF 页脚",
    sourceLabels: {
      products: "产品中心",
      fittingReplacement: "接头替代查询",
    },
  },
  en: {
    requestQuote: "Request a Quote",
    headerDescription:
      "Confirm models, quantities, and drawing requirements before submitting or generating a PDF list.",
    productsCount: "Products",
    drawingRequests: "Drawing Requests",
    itemUnit: "items",
    emptyHint: "Select a model and add it to the list.",
    openDetailsTitle: "Open product details in a new window",
    noteTitle: "List Notes",
    noteDescription:
      "1. The list is saved in the current browser and may be lost if browser data is cleared or a different browser is used.\n2. For each configuration, select a 2D dimension drawing, a 3D CAD model, both, or neither. Your request will include the models, quantities and drawing requirements.",
    printTitle: "Foreach Product Selection List",
    printDescription:
      "This list is generated from the selected models for model confirmation, quotation discussions, and technical review.",
    generated: "Generated",
    number: "No.",
    source: "Source",
    product: "Product",
    relatedInformation: "Related Information",
    model: "Model",
    drawing: "Drawing Requirements",
    configuredProduct: "Configured Product",
    required: "Required",
    notRequired: "Not Required",
    pdfHeaderAlt: "Foreach PDF Header",
    pdfFooterAlt: "Foreach PDF Footer",
    sourceLabels: {
      products: "Products",
      fittingReplacement: "Fitting Replacement Search",
    },
  },
  es: {
    requestQuote: "Solicitar cotización",
    headerDescription:
      "Confirme los modelos, las cantidades y los planos necesarios antes de enviar la solicitud o generar la lista PDF.",
    productsCount: "Productos",
    drawingRequests: "Solicitudes de planos",
    itemUnit: "elementos",
    emptyHint: "Seleccione un modelo y añádalo a la lista.",
    openDetailsTitle: "Abrir los detalles del producto en una ventana nueva",
    noteTitle: "Notas de la lista",
    noteDescription:
      "1. La lista se guarda en el navegador actual y puede perderse si borra los datos o cambia de navegador.\n2. Para cada configuración puede solicitar un plano acotado 2D, un modelo CAD 3D, ambos o ninguno. La solicitud incluirá los modelos, las cantidades y la documentación seleccionada.",
    printTitle: "Lista de selección de productos Foreach",
    printDescription:
      "Esta lista se genera a partir de los modelos seleccionados para confirmar modelos, preparar cotizaciones y realizar revisiones técnicas.",
    generated: "Generado",
    number: "N.º",
    source: "Origen",
    product: "Producto",
    relatedInformation: "Información relacionada",
    model: "Modelo",
    drawing: "Documentación solicitada",
    configuredProduct: "Producto configurado",
    required: "Requerido",
    notRequired: "No requerido",
    pdfHeaderAlt: "Encabezado del PDF de Foreach",
    pdfFooterAlt: "Pie del PDF de Foreach",
    sourceLabels: {
      products: "Productos",
      fittingReplacement: "Búsqueda de racores equivalentes",
    },
  },
  fr: {
    requestQuote: "Demander un devis",
    headerDescription:
      "Confirmez les modèles, les quantités et les plans requis avant d’envoyer la demande ou de générer la liste PDF.",
    productsCount: "Produits",
    drawingRequests: "Demandes de plans",
    itemUnit: "éléments",
    emptyHint: "Sélectionnez un modèle et ajoutez-le à la liste.",
    openDetailsTitle: "Ouvrir les détails du produit dans une nouvelle fenêtre",
    noteTitle: "Notes de la liste",
    noteDescription:
      "1. La liste est enregistrée dans le navigateur actuel et peut être perdue si vous effacez les données ou changez de navigateur.\n2. Pour chaque configuration, vous pouvez demander un plan coté 2D, un modèle CAO 3D, les deux ou aucun. La demande comprendra les modèles, les quantités et les documents souhaités.",
    printTitle: "Liste de sélection de produits Foreach",
    printDescription:
      "Cette liste est générée à partir des modèles sélectionnés pour la confirmation des modèles, les échanges de devis et la revue technique.",
    generated: "Généré",
    number: "N°",
    source: "Source",
    product: "Produit",
    relatedInformation: "Informations associées",
    model: "Modèle",
    drawing: "Plans et modèles souhaités",
    configuredProduct: "Produit configuré",
    required: "Requis",
    notRequired: "Non requis",
    pdfHeaderAlt: "En-tête du PDF Foreach",
    pdfFooterAlt: "Pied de page du PDF Foreach",
    sourceLabels: {
      products: "Produits",
      fittingReplacement: "Recherche de raccords équivalents",
    },
  },
  ko: {
    requestQuote: "견적 요청",
    headerDescription:
      "제출하거나 PDF 목록을 생성하기 전에 모델, 수량 및 도면 요구 사항을 확인하세요.",
    productsCount: "제품",
    drawingRequests: "도면 요청",
    itemUnit: "개",
    emptyHint: "모델을 선택하여 목록에 추가하세요.",
    openDetailsTitle: "새 창에서 제품 상세 정보 열기",
    noteTitle: "목록 안내",
    noteDescription:
      "1. 목록은 현재 브라우저에 저장되며, 데이터를 삭제하거나 다른 브라우저를 사용하면 목록이 사라질 수 있습니다.\n2. 구성별로 2D 치수 도면과 3D CAD 모델을 선택할 수 있으며, 도면 없이도 요청할 수 있습니다. 요청 시 모델, 수량 및 도면 요청 사항이 함께 전달됩니다.",
    printTitle: "Foreach 제품 선택 목록",
    printDescription:
      "이 목록은 모델 확인, 견적 협의 및 기술 검토를 위해 선택한 모델을 기준으로 생성됩니다.",
    generated: "생성 일시",
    number: "번호",
    source: "출처",
    product: "제품 정보",
    relatedInformation: "관련 정보",
    model: "모델",
    drawing: "도면 요청",
    configuredProduct: "구성 제품",
    required: "필요",
    notRequired: "불필요",
    pdfHeaderAlt: "Foreach PDF 머리글",
    pdfFooterAlt: "Foreach PDF 바닥글",
    sourceLabels: {
      products: "제품",
      fittingReplacement: "피팅 대체품 검색",
    },
  },
  ru: {
    requestQuote: "Запросить цену",
    headerDescription:
      "Перед отправкой или созданием PDF-списка проверьте модели, количество и требования к чертежам.",
    productsCount: "Продукты",
    drawingRequests: "Запросы чертежей",
    itemUnit: "поз.",
    emptyHint: "Выберите модель и добавьте её в список.",
    openDetailsTitle: "Открыть сведения о продукте в новом окне",
    noteTitle: "Примечания к списку",
    noteDescription:
      "1. Список сохраняется в текущем браузере и может быть утрачен при очистке данных или использовании другого браузера.\n2. Для каждой конфигурации можно запросить 2D-чертёж с размерами, 3D-модель CAD, оба документа или не запрашивать документацию. В запрос войдут модели, количество и выбранные документы.",
    printTitle: "Список выбранных продуктов Foreach",
    printDescription:
      "Этот список сформирован на основе выбранных моделей для подтверждения, согласования предложения и технической проверки.",
    generated: "Сформировано",
    number: "№",
    source: "Источник",
    product: "Информация о продукте",
    relatedInformation: "Связанная информация",
    model: "Модель",
    drawing: "Запрашиваемая документация",
    configuredProduct: "Настроенный продукт",
    required: "Требуется",
    notRequired: "Не требуется",
    pdfHeaderAlt: "Заголовок PDF Foreach",
    pdfFooterAlt: "Нижний колонтитул PDF Foreach",
    sourceLabels: {
      products: "Продукция",
      fittingReplacement: "Поиск аналогов фитингов",
    },
  },
};

export function getSelectionCartCopy(locale: LocaleCode) {
  return SELECTION_CART_COPY[locale];
}
