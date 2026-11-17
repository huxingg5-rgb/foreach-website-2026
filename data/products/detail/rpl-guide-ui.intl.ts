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
