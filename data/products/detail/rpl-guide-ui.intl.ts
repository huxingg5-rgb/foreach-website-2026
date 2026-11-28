export type InstrumentCategoryUi = {
  navigation: string;
  product: string;
  selection: string;
  delivery: string;
  drawing: string;
  drawingUnavailable: string;
};

const copy = {
  zh: {
    navigation: "产品内容分类", product: "产品资料", selection: "选型与使用", delivery: "交付与售后",
    drawing: "产品图纸", drawingUnavailable: "当前型号暂无公开 2D 图纸，请联系技术支持确认可提供的图纸。",
    features: "特性与选型方向", enlarge: "查看大图：", tableHint: "左右滑动表格，查看完整的规格与使用说明。",
    headers: ["选择项目", "规格与配置", "选择依据与使用方法"], reading: "延伸阅读：",
  },
  en: {
    navigation: "Product information sections", product: "Product information", selection: "Selection and use", delivery: "Delivery and after-sales",
    drawing: "Product drawing", drawingUnavailable: "A public 2D drawing is not available for this model. Contact technical support to confirm available drawings.",
    features: "Features and selection", enlarge: "View larger image: ", tableHint: "Scroll horizontally to view the complete specifications and operating guidance.",
    headers: ["Selection item", "Specification and configuration", "Selection and operating guidance"], reading: "Further reading: ",
  },
  de: {
    navigation: "Produktinformationen", product: "Zeichnungen und Unterlagen", selection: "Auswahl und Einsatz", delivery: "Lieferung und Service",
    drawing: "Produktzeichnung", drawingUnavailable: "Für dieses Modell steht keine öffentliche 2D-Zeichnung bereit. Fragen Sie beim technischen Support nach verfügbaren Zeichnungen.",
    features: "Merkmale und Auswahl", enlarge: "Abbildung vergrößern: ", tableHint: "Scrollen Sie horizontal, um alle technischen Daten und Hinweise zu sehen.",
    headers: ["Auswahlkriterium", "Spezifikation und Konfiguration", "Hinweise zur Auswahl und Verwendung"], reading: "Weiterführende Informationen: ",
  },
  it: {
    navigation: "Sezioni del prodotto", product: "Disegni e documentazione", selection: "Scelta e utilizzo", delivery: "Consegna e assistenza",
    drawing: "Disegno del prodotto", drawingUnavailable: "Per questo modello non è disponibile un disegno 2D pubblico. Contattate l’assistenza tecnica per verificare quali disegni sono disponibili.",
    features: "Caratteristiche e criteri di scelta", enlarge: "Ingrandisci l’immagine: ", tableHint: "Scorrete orizzontalmente per leggere tutte le specifiche e le istruzioni d’uso.",
    headers: ["Criterio di scelta", "Specifica e configurazione", "Indicazioni di scelta e utilizzo"], reading: "Approfondimenti: ",
  },
  hi: {
    navigation: "उत्पाद जानकारी के भाग", product: "ड्रॉइंग और दस्तावेज़", selection: "चयन और उपयोग", delivery: "डिलीवरी और बिक्री के बाद की सहायता",
    drawing: "उत्पाद की ड्रॉइंग", drawingUnavailable: "इस मॉडल की 2D ड्रॉइंग सार्वजनिक रूप से उपलब्ध नहीं है। उपलब्ध ड्रॉइंग की जानकारी के लिए तकनीकी सहायता से संपर्क करें।",
    features: "विशेषताएँ और चयन", enlarge: "बड़ी तस्वीर देखें ", tableHint: "सभी विनिर्देश और उपयोग निर्देश देखने के लिए तालिका को दाएँ-बाएँ स्क्रॉल करें।",
    headers: ["चयन का आधार", "विनिर्देश और कॉन्फ़िगरेशन", "चयन और संचालन की जानकारी"], reading: "और पढ़ें ",
  },
  es: {
    navigation: "Secciones de información del producto", product: "Información del producto", selection: "Selección y uso", delivery: "Entrega y posventa",
    drawing: "Plano del producto", drawingUnavailable: "Este modelo no dispone de un plano 2D público. Consulte con soporte técnico qué planos están disponibles.",
    features: "Características y selección", enlarge: "Ampliar imagen: ", tableHint: "Deslice la tabla horizontalmente para ver todas las especificaciones e indicaciones de uso.",
    headers: ["Aspecto de selección", "Especificación y configuración", "Criterios de selección y uso"], reading: "Lectura relacionada: ",
  },
  fr: {
    navigation: "Rubriques du produit", product: "Informations produit", selection: "Sélection et utilisation", delivery: "Livraison et SAV",
    drawing: "Plan du produit", drawingUnavailable: "Aucun plan 2D public n’est disponible pour ce modèle. Contactez l’assistance technique pour connaître les plans disponibles.",
    features: "Caractéristiques et sélection", enlarge: "Agrandir l’image : ", tableHint: "Faites défiler le tableau horizontalement pour consulter toutes les caractéristiques et consignes d’utilisation.",
    headers: ["Critère de sélection", "Caractéristique et configuration", "Choix et utilisation"], reading: "Pour en savoir plus : ",
  },
  ko: {
    navigation: "제품 정보 분류", product: "제품 자료", selection: "선정 및 사용", delivery: "납품 및 사후 지원",
    drawing: "제품 도면", drawingUnavailable: "이 모델의 공개 2D 도면은 제공되지 않습니다. 제공 가능한 도면은 기술 지원팀에 문의해 주세요.",
    features: "특징 및 선정 기준", enlarge: "이미지 크게 보기: ", tableHint: "표를 좌우로 스크롤하면 전체 사양과 사용 안내를 볼 수 있습니다.",
    headers: ["선정 항목", "사양 및 구성", "선정 기준과 사용 방법"], reading: "관련 글: ",
  },
  ru: {
    navigation: "Разделы информации об изделии", product: "Информация об изделии", selection: "Выбор и эксплуатация", delivery: "Поставка и поддержка",
    drawing: "Чертёж изделия", drawingUnavailable: "Общедоступный 2D-чертёж этой модели отсутствует. Уточните доступные чертежи в технической поддержке.",
    features: "Особенности и выбор", enlarge: "Увеличить изображение: ", tableHint: "Прокрутите таблицу по горизонтали, чтобы увидеть все характеристики и указания по эксплуатации.",
    headers: ["Параметр выбора", "Характеристика и комплектация", "Рекомендации по выбору и эксплуатации"], reading: "Подробнее: ",
  },
} as const;

export function getRplGuideUi(locale: string) {
  return copy[locale as keyof typeof copy] ?? copy.zh;
}
