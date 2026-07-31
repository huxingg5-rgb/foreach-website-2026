import { localizeProductDetailData } from "@/data/products/detail/product-detail.intl";

export const HARD_TUBE_TARGET_LOCALES = ["es", "fr", "ko", "ru"] as const;

export type HardTubeTargetLocale = (typeof HARD_TUBE_TARGET_LOCALES)[number];

type DetailRecord = Record<string, any>;

type DetailCopy = {
  breadcrumb: string;
  home: string;
  products: string;
  gallery: string;
  thumbnails: string;
  previous: string;
  next: string;
  frontView: string;
  sideView: string;
  portDetail: string;
  applications: string;
  model: string;
  configurator: string;
  datasheet: string;
  drawing: string;
  drawingAdded: string;
  request3d: string;
  addToList: string;
  addedToList: string;
  tabs: string;
  specifications: string;
  model3d: string;
  technicalDrawing: string;
  noDrawing: string;
  completeModels: string;
  foreachModel: string;
  productCode: string;
  connection: string;
  gender: string;
  mounting: string;
  valved: string;
  shape: string;
  housingMaterial: string;
  faq: string;
  selectModel: string;
  reselect: string;
  detailSourceLabel: string;
  no2d: string;
  no2dYet: string;
  requestDrawing: string;
  drawingLoading: string;
  drawingPreview: string;
  drawingDescription: (model: string) => string;
};

export const HARD_TUBE_DETAIL_COPY: Record<HardTubeTargetLocale, DetailCopy> = {
  es: {
    breadcrumb: "Navegación de migas de pan",
    home: "Inicio",
    products: "Productos",
    gallery: "Galería del producto",
    thumbnails: "Miniaturas del producto",
    previous: "Imagen anterior",
    next: "Imagen siguiente",
    frontView: "Vista frontal",
    sideView: "Vista lateral",
    portDetail: "Detalle de la conexión",
    applications: "Aplicaciones habituales:",
    model: "Modelo:",
    configurator: "Configurar",
    datasheet: "Añadir ficha técnica",
    drawing: "Añadir plano",
    drawingAdded: "Plano añadido",
    request3d: "Solicitar archivo 3D",
    addToList: "Añadir a la lista",
    addedToList: "Añadido a la lista",
    tabs: "Recursos del producto",
    specifications: "Especificaciones",
    model3d: "Modelo 3D",
    technicalDrawing: "Plano técnico",
    noDrawing: "No hay un plano técnico público disponible para este producto.",
    completeModels: "Modelos completos",
    foreachModel: "Modelo FOREACH",
    productCode: "Código de producto",
    connection: "Diámetro interior del tubo o rosca",
    gender: "Tipo de conexión",
    mounting: "Tipo de montaje",
    valved: "Configuración de válvula",
    shape: "Forma",
    housingMaterial: "Material del cuerpo",
    faq: "Preguntas frecuentes",
    selectModel: "Seleccionar modelo",
    reselect: "Volver a seleccionar",
    detailSourceLabel: "Página de detalle del producto",
    no2d: "Sin plano 2D",
    no2dYet: "Plano 2D aún no disponible",
    requestDrawing: "Para solicitar el plano 2D de este producto, pulse «Añadir plano» arriba.",
    drawingLoading: "Cargando plano...",
    drawingPreview: "Ver plano",
    drawingDescription: (model) => `Consulte el plano técnico de ${model}.`,
  },
  fr: {
    breadcrumb: "Fil d’Ariane",
    home: "Accueil",
    products: "Produits",
    gallery: "Galerie du produit",
    thumbnails: "Vignettes du produit",
    previous: "Image précédente",
    next: "Image suivante",
    frontView: "Vue de face",
    sideView: "Vue latérale",
    portDetail: "Détail du raccordement",
    applications: "Applications courantes :",
    model: "Modèle :",
    configurator: "Configurer",
    datasheet: "Ajouter la fiche technique",
    drawing: "Ajouter le plan",
    drawingAdded: "Plan ajouté",
    request3d: "Demander le fichier 3D",
    addToList: "Ajouter à la liste",
    addedToList: "Ajouté à la liste",
    tabs: "Ressources produit",
    specifications: "Caractéristiques techniques",
    model3d: "Modèle 3D",
    technicalDrawing: "Plan technique",
    noDrawing: "Aucun plan technique public n’est disponible pour ce produit.",
    completeModels: "Références complètes",
    foreachModel: "Modèle FOREACH",
    productCode: "Code produit",
    connection: "Diamètre intérieur du tube ou filetage",
    gender: "Type de raccord",
    mounting: "Type de montage",
    valved: "Configuration de vanne",
    shape: "Forme",
    housingMaterial: "Matériau du corps",
    faq: "Questions fréquentes",
    selectModel: "Sélectionner un modèle",
    reselect: "Modifier la sélection",
    detailSourceLabel: "Page de détail du produit",
    no2d: "Aucun plan 2D",
    no2dYet: "Plan 2D pas encore disponible",
    requestDrawing: "Pour demander le plan 2D de ce produit, cliquez sur « Ajouter le plan » ci-dessus.",
    drawingLoading: "Chargement du plan...",
    drawingPreview: "Afficher le plan",
    drawingDescription: (model) => `Consultez le plan technique de ${model}.`,
  },
  ko: {
    breadcrumb: "이동 경로",
    home: "홈",
    products: "제품",
    gallery: "제품 이미지",
    thumbnails: "제품 썸네일",
    previous: "이전 이미지",
    next: "다음 이미지",
    frontView: "정면도",
    sideView: "측면도",
    portDetail: "연결부 상세",
    applications: "주요 적용 분야:",
    model: "모델:",
    configurator: "구성 선택",
    datasheet: "데이터시트 추가",
    drawing: "도면 추가",
    drawingAdded: "도면 추가됨",
    request3d: "3D 파일 요청",
    addToList: "목록에 추가",
    addedToList: "목록에 추가됨",
    tabs: "제품 자료",
    specifications: "사양",
    model3d: "3D 모델",
    technicalDrawing: "기술 도면",
    noDrawing: "이 제품에 공개된 기술 도면이 없습니다.",
    completeModels: "전체 모델",
    foreachModel: "FOREACH 모델",
    productCode: "제품 코드",
    connection: "튜브 내경 또는 나사",
    gender: "연결 타입",
    mounting: "장착 방식",
    valved: "밸브 구성",
    shape: "형상",
    housingMaterial: "본체 재질",
    faq: "자주 묻는 질문",
    selectModel: "모델 선택",
    reselect: "다시 선택",
    detailSourceLabel: "제품 상세 페이지",
    no2d: "2D 도면 없음",
    no2dYet: "2D 도면 준비 중",
    requestDrawing: "이 제품의 2D 도면이 필요하면 위의 ‘도면 추가’를 눌러 요청해 주세요.",
    drawingLoading: "도면 불러오는 중...",
    drawingPreview: "도면 보기",
    drawingDescription: (model) => `${model}의 기술 도면을 확인합니다.`,
  },
  ru: {
    breadcrumb: "Навигационная цепочка",
    home: "Главная",
    products: "Продукция",
    gallery: "Галерея продукта",
    thumbnails: "Миниатюры продукта",
    previous: "Предыдущее изображение",
    next: "Следующее изображение",
    frontView: "Вид спереди",
    sideView: "Вид сбоку",
    portDetail: "Детали подключения",
    applications: "Типичные области применения:",
    model: "Модель:",
    configurator: "Настроить",
    datasheet: "Добавить техническое описание",
    drawing: "Добавить чертёж",
    drawingAdded: "Чертёж добавлен",
    request3d: "Запросить 3D-файл",
    addToList: "Добавить в список",
    addedToList: "Добавлено в список",
    tabs: "Материалы по продукту",
    specifications: "Технические характеристики",
    model3d: "3D-модель",
    technicalDrawing: "Технический чертёж",
    noDrawing: "Для этого продукта нет общедоступного технического чертежа.",
    completeModels: "Полный перечень моделей",
    foreachModel: "Модель FOREACH",
    productCode: "Код продукта",
    connection: "Внутренний диаметр трубки или резьба",
    gender: "Тип соединения",
    mounting: "Способ монтажа",
    valved: "Конфигурация клапана",
    shape: "Форма",
    housingMaterial: "Материал корпуса",
    faq: "Часто задаваемые вопросы",
    selectModel: "Выбрать модель",
    reselect: "Выбрать заново",
    detailSourceLabel: "Страница продукта",
    no2d: "Нет 2D-чертежа",
    no2dYet: "2D-чертёж пока недоступен",
    requestDrawing: "Чтобы запросить 2D-чертёж этого продукта, нажмите «Добавить чертёж» выше.",
    drawingLoading: "Загрузка чертежа...",
    drawingPreview: "Открыть чертёж",
    drawingDescription: (model) => `Просмотр технического чертежа ${model}.`,
  },
};

const SERIES_NAMES: Record<HardTubeTargetLocale, Record<string, string>> = {
  es: {
    "standard-flat-bottom-fitting": "racor estándar moleteado de fondo plano",
    "compact-flat-bottom-fitting": "racor compacto moleteado de fondo plano",
    "standard-ferrule-fitting": "racor estándar con férula",
    "compact-ferrule-fitting": "racor compacto con férula",
    "retaining-ring-fitting": "racor con anillo de retención",
    "high-pressure-fitting": "racor de alta presión",
  },
  fr: {
    "standard-flat-bottom-fitting": "raccord standard moleté à fond plat",
    "compact-flat-bottom-fitting": "raccord compact moleté à fond plat",
    "standard-ferrule-fitting": "raccord standard à bague",
    "compact-ferrule-fitting": "raccord compact à bague",
    "retaining-ring-fitting": "raccord à anneau de retenue",
    "high-pressure-fitting": "raccord haute pression",
  },
  ko: {
    "standard-flat-bottom-fitting": "표준 널링 평저 피팅",
    "compact-flat-bottom-fitting": "컴팩트 널링 평저 피팅",
    "standard-ferrule-fitting": "표준 페룰 피팅",
    "compact-ferrule-fitting": "컴팩트 페룰 피팅",
    "retaining-ring-fitting": "리테이닝 링 피팅",
    "high-pressure-fitting": "고압 피팅",
  },
  ru: {
    "standard-flat-bottom-fitting": "стандартный накатной фитинг с плоским дном",
    "compact-flat-bottom-fitting": "компактный накатной фитинг с плоским дном",
    "standard-ferrule-fitting": "стандартный фитинг с феррулой",
    "compact-ferrule-fitting": "компактный фитинг с феррулой",
    "retaining-ring-fitting": "фитинг со стопорным кольцом",
    "high-pressure-fitting": "фитинг высокого давления",
  },
};

const SEALING_NAMES: Record<HardTubeTargetLocale, Record<string, string>> = {
  es: {
    flat: "sellado inferior mediante junta de brida",
    ferrule: "sellado mediante férula",
    retaining: "sellado mediante anillo de retención",
    pressure: "estructura de conexión para alta presión",
  },
  fr: {
    flat: "étanchéité inférieure par joint de bride",
    ferrule: "étanchéité par bague",
    retaining: "étanchéité par anneau de retenue",
    pressure: "structure de raccordement haute pression",
  },
  ko: {
    flat: "플랜지 개스킷 하부 밀봉",
    ferrule: "페룰 밀봉",
    retaining: "리테이닝 링 밀봉",
    pressure: "고압 연결 구조",
  },
  ru: {
    flat: "нижнее уплотнение фланцевой прокладкой",
    ferrule: "уплотнение феррулой",
    retaining: "уплотнение стопорным кольцом",
    pressure: "конструкция для соединений высокого давления",
  },
};

const SPEC_LABELS: Record<HardTubeTargetLocale, Record<string, string>> = {
  es: {
    "Product Model": "Modelo de producto",
    "Product Code": "Código de producto",
    "Product Series": "Serie de producto",
    "Sealing Method": "Método de sellado",
    "Thread Size": "Tamaño de rosca",
    "Tube OD": "Diámetro exterior del tubo",
    "Flow Path ID": "Diámetro interior del paso de flujo",
    "Body Material": "Material del cuerpo",
    Color: "Color",
    "Rated Pressure": "Presión nominal",
    "Pressure Rating": "Presión nominal",
  },
  fr: {
    "Product Model": "Modèle de produit",
    "Product Code": "Code produit",
    "Product Series": "Série de produits",
    "Sealing Method": "Méthode d’étanchéité",
    "Thread Size": "Dimension du filetage",
    "Tube OD": "Diamètre extérieur du tube",
    "Flow Path ID": "Diamètre intérieur du passage de fluide",
    "Body Material": "Matériau du corps",
    Color: "Couleur",
    "Rated Pressure": "Pression nominale",
    "Pressure Rating": "Pression nominale",
  },
  ko: {
    "Product Model": "제품 모델",
    "Product Code": "제품 코드",
    "Product Series": "제품 시리즈",
    "Sealing Method": "밀봉 방식",
    "Thread Size": "나사 규격",
    "Tube OD": "튜브 외경",
    "Flow Path ID": "유로 내경",
    "Body Material": "본체 재질",
    Color: "색상",
    "Rated Pressure": "정격 압력",
    "Pressure Rating": "정격 압력",
  },
  ru: {
    "Product Model": "Модель продукта",
    "Product Code": "Код продукта",
    "Product Series": "Серия продукта",
    "Sealing Method": "Способ уплотнения",
    "Thread Size": "Размер резьбы",
    "Tube OD": "Наружный диаметр трубки",
    "Flow Path ID": "Внутренний диаметр проточного канала",
    "Body Material": "Материал корпуса",
    Color: "Цвет",
    "Rated Pressure": "Номинальное давление",
    "Pressure Rating": "Номинальное давление",
  },
};

const COLOR_NAMES: Record<HardTubeTargetLocale, Record<string, string>> = {
  es: { Natural: "Natural", Black: "Negro", Blue: "Azul" },
  fr: { Natural: "Naturel", Black: "Noir", Blue: "Bleu" },
  ko: { Natural: "내추럴", Black: "검정", Blue: "파랑" },
  ru: { Natural: "Натуральный", Black: "Чёрный", Blue: "Синий" },
};

function titleCaseFirst(value: string) {
  return value ? `${value[0]?.toUpperCase() || ""}${value.slice(1)}` : value;
}

function getSealKey(seriesId: string) {
  if (seriesId.includes("ferrule")) return "ferrule";
  if (seriesId.includes("retaining")) return "retaining";
  if (seriesId.includes("pressure")) return "pressure";
  return "flat";
}

function getSpecValue(specs: Array<{ label: string; value: string }>, labels: string[]) {
  return specs.find((item) => labels.includes(item.label))?.value || "";
}


/* HIGH_PRESSURE_DIMENSION_NARRATIVE_START */

function buildLocalizedNarrative(
  locale: HardTubeTargetLocale,
  values: {
    model: string;
    series: string;
    dimensionValue: string;
    dimensionType: "od" | "id";
    thread: string;
    material: string;
    sealing: string;
    pressure: string;
  },
) {
  const {
    model,
    series,
    dimensionValue,
    dimensionType,
    thread,
    material,
    sealing,
    pressure,
  } = values;

  const isFlowPathId =
    dimensionType === "id";

  if (locale === "es") {
    const dimensionCopy =
      isFlowPathId
        ? `con un diámetro interior del paso de flujo de ${dimensionValue}`
        : `para tubos rígidos con un diámetro exterior de ${dimensionValue}`;

    return `${model} es un ${series} ${dimensionCopy}. Incorpora una rosca ${thread}, un cuerpo de ${material} y ${sealing}.${pressure ? ` Su presión nominal es de ${pressure}.` : ""} Está diseñado para conexiones de microfluidos, equipos de diagnóstico in vitro (IVD), instrumentos analíticos y sistemas de automatización de laboratorio.`;
  }

  if (locale === "fr") {
    const dimensionCopy =
      isFlowPathId
        ? `avec un diamètre intérieur du passage de fluide de ${dimensionValue}`
        : `destiné aux tubes rigides de diamètre extérieur ${dimensionValue}`;

    return `${model} est un ${series} ${dimensionCopy}. Il associe un filetage ${thread}, un corps en ${material} et une ${sealing}.${pressure ? ` Sa pression nominale est de ${pressure}.` : ""} Il convient aux circuits microfluidiques, aux équipements de diagnostic in vitro (IVD), aux instruments d’analyse et aux systèmes d’automatisation de laboratoire.`;
  }

  if (locale === "ko") {
    const dimensionCopy =
      isFlowPathId
        ? `유로 내경 ${dimensionValue}`
        : `외경 ${dimensionValue}의 경질 튜브용`;

    return `${model} 모델은 ${dimensionCopy} ${series}입니다. ${thread} 나사, ${material} 본체 및 ${sealing} 구조를 적용했습니다.${pressure ? ` 정격 압력은 ${pressure}입니다.` : ""} 미세유체 연결, 체외진단(IVD) 장비, 분석기기 및 실험실 자동화 시스템에 적합합니다.`;
  }

  const dimensionCopy =
    isFlowPathId
      ? `с внутренним диаметром проточного канала ${dimensionValue}`
      : `для жёстких трубок с наружным диаметром ${dimensionValue}`;

  return `${model} — ${series} ${dimensionCopy}. Модель оснащена резьбой ${thread} и корпусом из ${material}; способ уплотнения — ${sealing}.${pressure ? ` Номинальное давление — ${pressure}.` : ""} Подходит для микрофлюидных трактов, оборудования IVD, аналитических приборов и систем лабораторной автоматизации.`;
}

/* HIGH_PRESSURE_DIMENSION_NARRATIVE_END */

function buildApplications(locale: HardTubeTargetLocale) {
  const values: Record<HardTubeTargetLocale, string[]> = {
    es: ["Conexiones de microfluidos", "Conexiones entre bombas y válvulas", "Conexiones a colectores fluídicos", "Equipos IVD e instrumentos analíticos"],
    fr: ["Raccordements microfluidiques", "Liaisons entre pompes et vannes", "Raccordement aux collecteurs fluidiques", "Équipements IVD et instruments d’analyse"],
    ko: ["미세유체 연결", "펌프·밸브 인터페이스 연결", "유로 매니폴드 연결", "IVD 및 분석기기"],
    ru: ["Микрофлюидные соединения", "Соединения насосов и клапанов", "Подключение к флюидным коллекторам", "Оборудование IVD и аналитические приборы"],
  };

  return values[locale];
}


/* HIGH_PRESSURE_DIMENSION_FAQ_START */

function buildFaqs(
  locale: HardTubeTargetLocale,
  model: string,
  dimensionValue: string,
  dimensionType: "od" | "id",
  thread: string,
  material: string,
  series: string,
) {
  const isFlowPathId =
    dimensionType === "id";

  if (locale === "es") {
    const dimensionFaq =
      isFlowPathId
        ? {
            question:
              `¿Cuál es el diámetro interior del paso de flujo de ${model}?`,
            answer:
              `El diámetro interior del paso de flujo de ${model} es de ${dimensionValue}. Al seleccionar el producto, confirme también la presión, la rosca y la compatibilidad del fluido.`,
          }
        : {
            question:
              `¿Para qué diámetro exterior de tubo está diseñado ${model}?`,
            answer:
              `${model} es adecuado para tubos rígidos con un diámetro exterior de ${dimensionValue}. Antes de seleccionar el modelo, confirme también la tolerancia del tubo y la preparación de su extremo.`,
          };

    return [
      dimensionFaq,
      {
        question:
          `¿Qué rosca utiliza ${model}?`,
        answer:
          `Este modelo utiliza una rosca ${thread}. Antes del montaje, compruebe que la rosca del puerto y la estructura de sellado sean compatibles.`,
      },
      {
        question:
          `¿Cómo se verifica la compatibilidad química del ${material}?`,
        answer:
          `Compruebe la compatibilidad del ${material} teniendo en cuenta el fluido, la concentración, la temperatura, el tiempo de contacto y el método de limpieza.`,
      },
      {
        question:
          `¿Qué debe revisarse al instalar este ${series}?`,
        answer:
          "Revise la rosca, el elemento de sellado y la superficie del puerto. Todos deben estar limpios e intactos; evite un apriete excesivo.",
      },
      {
        question:
          `¿Se puede solicitar un plano 2D de ${model}?`,
        answer:
          "Sí. Añada el modelo a la lista e indique que necesita el plano; el equipo de ingeniería confirmará la versión aplicable.",
      },
    ];
  }

  if (locale === "fr") {
    const dimensionFaq =
      isFlowPathId
        ? {
            question:
              `Quel est le diamètre intérieur du passage de fluide du modèle ${model} ?`,
            answer:
              `Le diamètre intérieur du passage de fluide du modèle ${model} est de ${dimensionValue}. Vérifiez également la pression, le filetage et la compatibilité du fluide.`,
          }
        : {
            question:
              `Pour quel diamètre extérieur de tube le modèle ${model} est-il prévu ?`,
            answer:
              `${model} convient aux tubes rigides de diamètre extérieur ${dimensionValue}. Avant la sélection, vérifiez également la tolérance du tube et la préparation de son extrémité.`,
          };

    return [
      dimensionFaq,
      {
        question:
          `Quel filetage le modèle ${model} utilise-t-il ?`,
        answer:
          `Ce modèle utilise un filetage ${thread}. Avant le montage, vérifiez la compatibilité du filetage du port et de la structure d’étanchéité.`,
      },
      {
        question:
          `Comment vérifier la compatibilité chimique du ${material} ?`,
        answer:
          `Vérifiez la compatibilité du ${material} selon le fluide, sa concentration, la température, la durée de contact et la méthode de nettoyage.`,
      },
      {
        question:
          `Quels points contrôler lors du montage de ce ${series} ?`,
        answer:
          "Contrôlez le filetage, l’élément d’étanchéité et la face du port. Ils doivent être propres et intacts ; évitez tout serrage excessif.",
      },
      {
        question:
          `Peut-on demander un plan 2D pour ${model} ?`,
        answer:
          "Oui. Ajoutez le modèle à votre liste et indiquez le besoin de plan ; l’équipe d’ingénierie confirmera la version applicable.",
      },
    ];
  }

  if (locale === "ko") {
    const dimensionFaq =
      isFlowPathId
        ? {
            question:
              `${model}의 유로 내경은 얼마입니까?`,
            answer:
              `${model}의 유로 내경은 ${dimensionValue}입니다. 제품 선정 시 압력, 나사 규격 및 유체 적합성도 함께 확인하십시오.`,
          }
        : {
            question:
              `${model}은 어떤 튜브 외경에 적합합니까?`,
            answer:
              `${model}은 외경 ${dimensionValue}의 경질 튜브에 적합합니다. 선정 전 튜브 외경 공차와 단면 가공 상태도 확인해야 합니다.`,
          };

    return [
      dimensionFaq,
      {
        question:
          `${model}에 적용된 나사 규격은 무엇입니까?`,
        answer:
          `이 모델은 ${thread} 나사를 사용합니다. 설치 전 장비 포트의 나사와 밀봉 구조가 호환되는지 확인하십시오.`,
      },
      {
        question:
          `${material}의 유체 적합성은 어떻게 확인합니까?`,
        answer:
          `유체 종류, 농도, 온도, 접촉 시간 및 세척 방법을 기준으로 ${material}의 적합성을 확인하십시오.`,
      },
      {
        question:
          `${series} 설치 시 무엇을 점검해야 합니까?`,
        answer:
          "나사, 밀봉 부품 및 포트 접촉면이 깨끗하고 손상되지 않았는지 확인하고 과도한 조임을 피하십시오.",
      },
      {
        question:
          `${model}의 2D 도면을 요청할 수 있습니까?`,
        answer:
          "가능합니다. 모델을 목록에 추가하고 도면 필요 여부를 표시하면 엔지니어가 적용 가능한 버전을 확인합니다.",
      },
    ];
  }

  const dimensionFaq =
    isFlowPathId
      ? {
          question:
            `Каков внутренний диаметр проточного канала модели ${model}?`,
          answer:
            `Внутренний диаметр проточного канала модели ${model} составляет ${dimensionValue}. При выборе также проверьте давление, резьбу и совместимость с рабочей жидкостью.`,
        }
      : {
          question:
            `Для какого наружного диаметра трубки предназначена модель ${model}?`,
          answer:
            `${model} подходит для жёстких трубок с наружным диаметром ${dimensionValue}. Перед выбором также проверьте допуск наружного диаметра и качество обработки торца трубки.`,
        };

  return [
    dimensionFaq,
    {
      question:
        `Какая резьба используется в модели ${model}?`,
      answer:
        `В этой модели используется резьба ${thread}. Перед монтажом убедитесь, что резьба порта и конструкция уплотнения совместимы.`,
    },
    {
      question:
        `Как проверить химическую совместимость материала ${material}?`,
      answer:
        `Оцените совместимость ${material} с учётом рабочей жидкости, её концентрации, температуры, времени контакта и способа очистки.`,
    },
    {
      question:
        `Что следует проверить при установке этого изделия серии «${series}»?`,
      answer:
        "Проверьте резьбу, уплотнительный элемент и поверхность порта. Они должны быть чистыми и неповреждёнными; не допускайте чрезмерной затяжки.",
    },
    {
      question:
        `Можно ли запросить 2D-чертёж модели ${model}?`,
      answer:
        "Да. Добавьте модель в список и укажите необходимость чертежа; инженеры подтвердят применимую версию.",
    },
  ];
}

/* HIGH_PRESSURE_DIMENSION_FAQ_END */

export function isHardTubeTargetLocale(value: string): value is HardTubeTargetLocale {
  return HARD_TUBE_TARGET_LOCALES.includes(value as HardTubeTargetLocale);
}


/* HIGH_PRESSURE_DIMENSION_LOCALIZATION_START */

export function localizeHardTubeFittingDetailData<T extends DetailRecord>(
  sourceData: T,
  locale: HardTubeTargetLocale,
): T {
  const english =
    localizeProductDetailData(
      sourceData
    ) as DetailRecord;

  const sourceSpecs =
    Array.isArray(english.specs)
      ? english.specs
      : Array.isArray(
          english.specifications
        )
        ? english.specifications
        : [];

  const seriesId =
    String(
      sourceData.seriesId ||
      english.seriesId ||
      "standard-flat-bottom-fitting"
    );

  const model =
    String(
      english.model ||
      sourceData.model ||
      ""
    );

  const series =
    SERIES_NAMES[locale][seriesId] ||
    SERIES_NAMES[locale][
      "standard-flat-bottom-fitting"
    ];

  const sealing =
    SEALING_NAMES[locale][
      getSealKey(seriesId)
    ];

  const tubeOd =
    getSpecValue(
      sourceSpecs,
      ["Tube OD"]
    );

  const flowPathId =
    getSpecValue(
      sourceSpecs,
      [
        "Flow Path ID",
        "Flow path ID",
        "Flow Path Diameter",
        "Channel ID",
      ]
    );

  const dimensionValue =
    tubeOd ||
    flowPathId ||
    "";

  const dimensionType:
    "od" | "id" =
      tubeOd
        ? "od"
        : "id";

  const dimensionLabel =
    dimensionType === "id"
      ? SPEC_LABELS[locale][
          "Flow Path ID"
        ]
      : SPEC_LABELS[locale][
          "Tube OD"
        ];

  const thread =
    getSpecValue(
      sourceSpecs,
      [
        "Thread Size",
        "Thread",
      ]
    );

  const material =
    getSpecValue(
      sourceSpecs,
      [
        "Body Material",
        "Housing Material",
        "Material",
      ]
    );

  const pressure =
    getSpecValue(
      sourceSpecs,
      [
        "Rated Pressure",
        "Pressure Rating",
      ]
    );

  const description =
    buildLocalizedNarrative(
      locale,
      {
        model,
        series,
        dimensionValue,
        dimensionType,
        thread,
        material,
        sealing,
        pressure,
      }
    );

  const localizedSeries =
    titleCaseFirst(series);

  const localizedSpecs =
    sourceSpecs.map(
      (
        item: {
          label: string;
          value: string;
        }
      ) => {
        let value =
          item.value;

        if (
          item.label ===
          "Product Series"
        ) {
          value =
            localizedSeries;
        }

        if (
          item.label ===
          "Sealing Method"
        ) {
          value =
            titleCaseFirst(
              sealing
            );
        }

        if (
          item.label ===
          "Color"
        ) {
          value =
            COLOR_NAMES[
              locale
            ][item.value] ||
            item.value;
        }

        return {
          ...item,
          label:
            SPEC_LABELS[
              locale
            ][item.label] ||
            item.label,
          value,
        };
      }
    );

  const localized = {
    ...english,

    __locale:
      locale,

    categoryLabel:
      locale === "es"
        ? "Racores"
        : locale === "fr"
          ? "Raccords"
          : locale === "ko"
            ? "피팅"
            : "Фитинги",

    productTypeName:
      localizedSeries,

    seriesName:
      localizedSeries,

    name:
      localizedSeries,

    title:
      model,

    imageAlt:
      `${model} ${localizedSeries} ${material}`,

    imageAltEn:
      `${model} ${localizedSeries} ${material}`,

    mainImageAlt:
      `${model} ${localizedSeries} ${material}`,

    description,

    advantages: [
      `${dimensionLabel}: ${dimensionValue}`,
      `${SPEC_LABELS[locale]["Thread Size"]}: ${thread}`,
      `${SPEC_LABELS[locale]["Body Material"]}: ${material}`,
      pressure
        ? `${SPEC_LABELS[locale]["Rated Pressure"]}: ${pressure}`
        : `${SPEC_LABELS[locale]["Sealing Method"]}: ${titleCaseFirst(sealing)}`,
    ],

    commonApplications:
      buildApplications(
        locale
      ),

    specs:
      localizedSpecs,

    specifications:
      localizedSpecs,

    faqs:
      buildFaqs(
        locale,
        model,
        dimensionValue,
        dimensionType,
        thread,
        material,
        series
      ),

    detailHref:
      `/${locale}/products/fittings/hard-tube-fittings/${sourceData.slug || english.slug}`,

    href:
      `/${locale}/products/fittings/hard-tube-fittings/${sourceData.slug || english.slug}`,

    selectionHref:
      `/${locale}/products/?category=fittings&productType=hard-tube-fittings`,

    bottomCtaTitle:
      locale === "es"
        ? "Racores para pedidos por volumen y aplicaciones personalizadas"
        : locale === "fr"
          ? "Raccords pour commandes en volume et applications sur mesure"
          : locale === "ko"
            ? "대량 주문 및 맞춤 응용을 위한 피팅"
            : "Фитинги для серийных заказов и нестандартных применений",

    bottomCtaDescription:
      locale === "es"
        ? "FOREACH ofrece selección, suministro por volumen y personalización de racores según el tipo de conexión, el tamaño del tubo, el material, el elemento de sellado, el montaje y las condiciones de trabajo."
        : locale === "fr"
          ? "FOREACH assure la sélection, la fourniture en volume et la personnalisation des raccords selon le type de port, le diamètre du tube, le matériau, l’élément d’étanchéité, le montage et les conditions d’utilisation."
          : locale === "ko"
            ? "FOREACH는 포트 형식, 튜브 규격, 재질, 밀봉 부품, 장착 구조 및 사용 조건에 따라 피팅 선정, 대량 공급 및 맞춤 제작을 지원합니다."
            : "FOREACH помогает с подбором, серийной поставкой и изготовлением фитингов по требованиям к типу порта, размеру трубки, материалу, уплотнению, монтажной конструкции и условиям эксплуатации.",

    bottomCtaButtonText:
      locale === "es"
        ? "Contactar"
        : locale === "fr"
          ? "Nous contacter"
          : locale === "ko"
            ? "문의하기"
            : "Связаться с нами",

    bottomCtaHref:
      `/${locale}/contact`,

    seo: {
      title:
        `${model} ${localizedSeries} | FOREACH`,
      description,
    },
  } as DetailRecord;

  return localized as T;
}

/* HIGH_PRESSURE_DIMENSION_LOCALIZATION_END */

export function getHardTubeDetailMetadataCopy(model: string, locale: HardTubeTargetLocale) {
  const productName = locale === "es" ? "racor para tubo rígido" : locale === "fr" ? "raccord pour tube rigide" : locale === "ko" ? "경질 튜브 피팅" : "фитинг для жёстких трубок";
  const descriptions: Record<HardTubeTargetLocale, string> = {
    es: `Consulte las especificaciones, materiales, rosca, sellado y aplicaciones del ${productName} ${model} de FOREACH.`,
    fr: `Consultez les caractéristiques, les matériaux, le filetage, l’étanchéité et les applications du ${productName} ${model} de FOREACH.`,
    ko: `FOREACH ${model} ${productName}의 사양, 재질, 나사, 밀봉 방식 및 적용 분야를 확인하십시오.`,
    ru: `Характеристики, материалы, резьба, уплотнение и области применения модели FOREACH ${model} — ${productName}.`,
  };

  return {
    title: `${model} ${titleCaseFirst(productName)} | FOREACH`,
    description: descriptions[locale],
  };
}
