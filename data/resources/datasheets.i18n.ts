/* =========================================================
   datasheets.i18n.ts
   恒永达官网｜规格书下载页面多语言数据聚合文件

   文件路径：
   data/resources/datasheets.i18n.ts

   说明：
   1. 这个文件专门负责规格书下载页的多语言数据
   2. 中文数据来自 datasheets.zh.ts
   3. 英文数据来自 datasheets.en.ts
   4. 西班牙语、法语、韩语、俄语当前先基于英文数据结构做多语言覆盖
   5. 后期接后端时，可以把这个文件替换为 CMS / 数据库返回的数据

   本次调整：
   1. 中文按钮：查看产品 / 下载
   2. 英文按钮：View Product / Download
   3. 西语按钮：Ver producto / Descargar
   4. 法语按钮：Voir le produit / Télécharger
   5. 韩语按钮：제품 보기 / 다운로드
   6. 俄语按钮：Смотреть продукт / Скачать
   7. “查看产品”必须保留产品含义，避免客户误解为预览规格书
========================================================= */

import {
  datasheetZhFilterOptions,
  datasheetZhItems,
  datasheetsZhPageText,
} from "@/data/resources/datasheets.zh";

import {
  datasheetEnFilterOptions,
  datasheetEnItems,
  datasheetsEnPageText,
} from "@/data/resources/datasheets.en";

import type {
  DatasheetFilterOption,
  DatasheetItem,
  DatasheetLocale,
  DatasheetsPageData,
  DatasheetsPageText,
} from "@/data/resources/datasheets.types";

/* =========================================================
   外语规格书页面文案

   说明：
   1. 英文直接复用 datasheets.en.ts，但在 getDatasheetsStaticPageText 中覆盖按钮文案
   2. 西班牙语、法语、韩语、俄语只覆盖页面文字
   3. Banner 图片继续复用英文页面图片
   4. 下载按钮不写“下载规格书”，避免按钮过长
   5. 查看产品按钮必须带“产品”含义，避免客户误解为预览规格书
========================================================= */

const foreignPageTextMap: Record<
  Exclude<DatasheetLocale, "zh-CN" | "en">,
  DatasheetsPageText
> = {
  es: {
    seo: {
      title: "Fichas técnicas | Recursos | FOREACH",
      description:
        "Descargue fichas técnicas de productos FOREACH, incluidas bombas, válvulas, tubos y conectores, sondas, sensores y módulos de control.",
    },
    hero: {
      title: "Fichas técnicas",
      description:
        "Busque y descargue fichas técnicas de productos FOREACH para revisar rápidamente parámetros, materiales, interfaces e información de aplicación.",
      image: datasheetsEnPageText.hero.image,
      imageAlt: "Banner de la página de fichas técnicas de FOREACH",
    },
    breadcrumb: {
      home: "Inicio",
      homeHref: "/es",
      resources: "Recursos",
      resourcesHref: "/es/resources",
      current: "Fichas técnicas",
    },
    search: {
      placeholder:
        "Buscar por nombre de producto o palabra clave, por ejemplo bomba de émbolo, válvula rotativa, sensor de presión, tubos y conectores",
      buttonText: "Buscar",
    },
    section: {
      title: "Fichas técnicas de productos",
      description:
        "Esta página incluye únicamente fichas técnicas de productos. La serie de sondas aún no dispone de ficha técnica y admite solicitudes personalizadas. Se recomienda obtener los planos desde la página de detalle del producto correspondiente.",
      resultPrefix: "Total",
      resultSuffix: "recursos",
      emptyTitle: "No se encontraron recursos coincidentes",
      emptyDescription:
        "Intente buscar por nombre de producto, palabra clave o categoría. Si aún no encuentra el archivo necesario, envíe una solicitud y le ayudaremos a obtener el recurso adecuado.",
    },
    labels: {
      language: "Idioma",
      version: "Versión",
      update: "Actualización",
      viewProduct: "Ver producto",
      download: "Descargar",
      custom: "Personalizar",
    },
    support: {
      kicker: "Soporte",
      title: "¿No encuentra la ficha técnica que necesita?",
      description:
        "Envíe el nombre del producto, el escenario de aplicación o la solicitud de documentación, y le ayudaremos a obtener la ficha técnica correspondiente junto con el soporte de selección necesario.",
      buttonText: "Enviar solicitud",
      buttonHref: "/es/contact?type=datasheet",
    },
  },

  fr: {
    seo: {
      title: "Fiches techniques | Ressources | FOREACH",
      description:
        "Téléchargez les fiches techniques des produits FOREACH, notamment les pompes, vannes, tubes et raccords, sondes, capteurs et modules de contrôle.",
    },
    hero: {
      title: "Fiches techniques",
      description:
        "Recherchez et téléchargez les fiches techniques des produits FOREACH afin de consulter rapidement les paramètres, matériaux, interfaces et informations d’application.",
      image: datasheetsEnPageText.hero.image,
      imageAlt: "Bannière de la page des fiches techniques FOREACH",
    },
    breadcrumb: {
      home: "Accueil",
      homeHref: "/fr",
      resources: "Ressources",
      resourcesHref: "/fr/resources",
      current: "Fiches techniques",
    },
    search: {
      placeholder:
        "Rechercher par nom de produit ou mot-clé, par exemple pompe à piston, vanne rotative, capteur de pression, tubes et raccords",
      buttonText: "Rechercher",
    },
    section: {
      title: "Fiches techniques produits",
      description:
        "Cette page regroupe uniquement les fiches techniques produits. Les sondes ne disposent pas encore de fiche technique et peuvent faire l’objet d’une demande personnalisée. Les plans produits sont recommandés sur les pages de détail correspondantes.",
      resultPrefix: "Total",
      resultSuffix: "ressources",
      emptyTitle: "Aucune ressource correspondante trouvée",
      emptyDescription:
        "Essayez de rechercher par nom de produit, mot-clé ou catégorie. Si vous ne trouvez toujours pas le document souhaité, envoyez une demande et nous vous aiderons à obtenir la ressource adaptée.",
    },
    labels: {
      language: "Langue",
      version: "Version",
      update: "Mise à jour",
      viewProduct: "Voir le produit",
      download: "Télécharger",
      custom: "Sur mesure",
    },
    support: {
      kicker: "Support",
      title: "Vous ne trouvez pas la fiche technique recherchée ?",
      description:
        "Indiquez le nom du produit, le scénario d’application ou votre besoin documentaire, et nous vous aiderons à obtenir la fiche technique correspondante avec le support de sélection nécessaire.",
      buttonText: "Envoyer une demande",
      buttonHref: "/fr/contact?type=datasheet",
    },
  },

  ko: {
    seo: {
      title: "사양서 다운로드 | 자료실 | FOREACH",
      description:
        "FOREACH의 펌프, 밸브, 튜빙 및 피팅, 프로브, 센서, 제어 모듈 관련 제품 사양서를 다운로드할 수 있습니다.",
    },
    hero: {
      title: "사양서 다운로드",
      description:
        "FOREACH 제품 사양서를 검색하고 다운로드하여 제품 파라미터, 소재, 인터페이스 및 적용 정보를 빠르게 확인할 수 있습니다.",
      image: datasheetsEnPageText.hero.image,
      imageAlt: "FOREACH 자료실 사양서 다운로드 페이지 배너",
    },
    breadcrumb: {
      home: "홈",
      homeHref: "/ko",
      resources: "자료실",
      resourcesHref: "/ko/resources",
      current: "사양서 다운로드",
    },
    search: {
      placeholder:
        "제품명 또는 키워드로 검색하세요. 예: 플런저 펌프, 로터리 밸브, 압력 센서, 튜빙 및 피팅",
      buttonText: "검색",
    },
    section: {
      title: "제품 사양서",
      description:
        "이 페이지에는 제품 사양서만 포함됩니다. 프로브 시리즈는 현재 사양서가 없으며 맞춤 요청을 지원합니다. 제품 도면은 해당 제품 상세 페이지에서 확인하는 것을 권장합니다.",
      resultPrefix: "총",
      resultSuffix: "개 자료",
      emptyTitle: "일치하는 자료를 찾을 수 없습니다",
      emptyDescription:
        "제품명, 키워드 또는 제품 카테고리로 다시 검색해 보세요. 필요한 파일을 찾지 못한 경우 자료 요청을 제출하시면 적합한 자료를 안내해 드립니다.",
    },
    labels: {
      language: "언어",
      version: "버전",
      update: "업데이트",
      viewProduct: "제품 보기",
      download: "다운로드",
      custom: "맞춤 요청",
    },
    support: {
      kicker: "지원 필요",
      title: "필요한 사양서를 찾지 못하셨나요?",
      description:
        "제품명, 적용 시나리오 또는 자료 요청 내용을 제출해 주시면 해당 제품 사양서와 필요한 선정 지원을 제공해 드립니다.",
      buttonText: "자료 요청 제출",
      buttonHref: "/ko/contact?type=datasheet",
    },
  },

  ru: {
    seo: {
      title: "Спецификации | Ресурсы | FOREACH",
      description:
        "Скачайте спецификации продукции FOREACH, включая насосы, клапаны, трубки и фитинги, зонды, датчики и модули управления.",
    },
    hero: {
      title: "Спецификации",
      description:
        "Найдите и скачайте спецификации продукции FOREACH, чтобы быстро ознакомиться с параметрами, материалами, интерфейсами и областями применения.",
      image: datasheetsEnPageText.hero.image,
      imageAlt: "Баннер страницы спецификаций FOREACH",
    },
    breadcrumb: {
      home: "Главная",
      homeHref: "/ru",
      resources: "Ресурсы",
      resourcesHref: "/ru/resources",
      current: "Спецификации",
    },
    search: {
      placeholder:
        "Поиск по названию продукта или ключевому слову, например плунжерный насос, роторный клапан, датчик давления, трубки и фитинги",
      buttonText: "Поиск",
    },
    section: {
      title: "Спецификации продукции",
      description:
        "На этой странице размещены только спецификации продукции. Для серии зондов спецификации пока отсутствуют, доступна индивидуальная заявка. Чертежи рекомендуется получать на соответствующих страницах продуктов.",
      resultPrefix: "Всего",
      resultSuffix: "материалов",
      emptyTitle: "Подходящие материалы не найдены",
      emptyDescription:
        "Попробуйте выполнить поиск по названию продукта, ключевому слову или категории. Если нужный файл не найден, отправьте запрос, и мы поможем получить соответствующий материал.",
    },
    labels: {
      language: "Язык",
      version: "Версия",
      update: "Обновлено",
      viewProduct: "Смотреть продукт",
      download: "Скачать",
      custom: "Под заказ",
    },
    support: {
      kicker: "Поддержка",
      title: "Не нашли нужную спецификацию?",
      description:
        "Отправьте название продукта, сценарий применения или запрос на документацию, и мы поможем получить соответствующую спецификацию и рекомендации по подбору.",
      buttonText: "Отправить запрос",
      buttonHref: "/ru/contact?type=datasheet",
    },
  },
};

/* =========================================================
   外语筛选按钮文案

   说明：
   1. value 必须保持不变
   2. 因为 DatasheetsClient.tsx 的筛选逻辑依赖 value
   3. 这里只改 label
========================================================= */

const foreignFilterLabelMap: Record<
  Exclude<DatasheetLocale, "zh-CN" | "en">,
  Record<string, string>
> = {
  es: {
    all: "Todo",
    pump: "Bombas",
    valve: "Válvulas",
    needle: "Sondas",
    tubing: "Tubos y conectores",
    smart: "Módulos de control",
  },
  fr: {
    all: "Tous",
    pump: "Pompes",
    valve: "Vannes",
    needle: "Sondes",
    tubing: "Tubes et raccords",
    smart: "Modules de contrôle",
  },
  ko: {
    all: "전체",
    pump: "펌프",
    valve: "밸브",
    needle: "프로브",
    tubing: "튜빙 및 피팅",
    smart: "제어 모듈",
  },
  ru: {
    all: "Все",
    pump: "Насосы",
    valve: "Клапаны",
    needle: "Зонды",
    tubing: "Трубки и фитинги",
    smart: "Модули управления",
  },
};

/* =========================================================
   外语卡片文案覆盖

   说明：
   1. id 必须和 datasheets.en.ts 里的 item.id 一致
   2. downloadHref 继续沿用英文 PDF
   3. productHref 继续沿用英文产品路径
========================================================= */

const foreignItemTextMap: Record<
  Exclude<DatasheetLocale, "zh-CN" | "en">,
  Record<
    string,
    Pick<
      DatasheetItem,
      "title" | "label" | "language" | "description" | "keywords"
    >
  >
> = {
  es: {
    "plunger-pump": {
      title: "Ficha técnica de la serie de bombas de émbolo",
      label: "Bombas",
      language: "PDF en inglés",
      description:
        "Para dosificación precisa, distribución y sistemas fluídicos de instrumentos analíticos automatizados.",
      keywords: "bomba de émbolo dosificación precisa plunger pump",
    },
    "valveless-pump": {
      title: "Ficha técnica de bomba sin válvulas",
      label: "Bombas",
      language: "PDF en inglés",
      description:
        "Para aplicaciones de microdosificación que reducen el número de válvulas y mejoran la fiabilidad del sistema.",
      keywords: "bomba sin válvulas micro dosificación valveless pump",
    },
    "diaphragm-pump": {
      title: "Ficha técnica de bomba de diafragma",
      label: "Bombas",
      language: "PDF en inglés",
      description:
        "Para suministro de bajo caudal, transferencia autocebante, suministro de líquidos de lavado e integración fluídica automatizada.",
      keywords: "bomba de diafragma autocebado suministro lavado",
    },
    "high-pressure-pump": {
      title: "Ficha técnica de bomba de alta presión",
      label: "Bombas",
      language: "PDF en inglés",
      description:
        "Para control de fluidos a alta presión, transferencia precisa y aplicaciones fluídicas resistentes a la presión.",
      keywords: "bomba de alta presión resistencia presión transferencia",
    },
    "syringe-pump": {
      title: "Ficha técnica de bomba de jeringa",
      label: "Bombas",
      language: "PDF en inglés",
      description:
        "Para dosificación de alta precisión de μL a mL, distribución y manejo de líquidos multicanal.",
      keywords: "bomba de jeringa multicanal dosificación syringe pump",
    },
    "rotary-valve": {
      title: "Ficha técnica de válvula rotativa",
      label: "Válvulas",
      language: "PDF en inglés",
      description:
        "Para conmutación de flujo multicanal, distribución de reactivos e integración de sistemas fluídicos complejos.",
      keywords: "válvula rotativa multicanal conmutación de flujo",
    },
    "high-pressure-valve": {
      title: "Ficha técnica de válvula de alta presión",
      label: "Válvulas",
      language: "PDF en inglés",
      description:
        "Para conmutación de fluidos a alta presión, control resistente a la presión y gestión precisa de fluidos.",
      keywords: "válvula de alta presión conmutación resistencia presión",
    },
    "solenoid-valve": {
      title: "Ficha técnica de válvula solenoide",
      label: "Válvulas",
      language: "PDF en inglés",
      description:
        "Para control de apertura/cierre y conmutación microfluídica de muestras, reactivos y líquidos de lavado.",
      keywords: "válvula solenoide control conmutación solenoid valve",
    },
    "sample-probe": {
      title: "Sondas",
      label: "Sondas",
      language: "—",
      description:
        "Actualmente no hay ficha técnica estándar. Se admiten solicitudes personalizadas basadas en planos o muestras.",
      keywords: "sonda de muestreo sonda personalizada probe",
    },
    "tubing-fitting": {
      title: "Ficha técnica de tubos y conectores",
      label: "Tubos y conectores",
      language: "PDF en inglés",
      description:
        "Para conexión de tubos, conjuntos de tubos rígidos o flexibles y soluciones de conectores en sistemas microfluídicos.",
      keywords: "tubos conectores fitting tubing fitting",
    },
    "pressure-sensor": {
      title: "Ficha técnica de sensor de presión",
      label: "Módulos de control",
      language: "PDF en inglés",
      description:
        "Para monitoreo de presión en sistemas fluídicos, retroalimentación del estado del sistema e integración de control automatizado.",
      keywords: "sensor de presión módulo de control",
    },
    "bubble-detector": {
      title: "Ficha técnica del módulo de detección de burbujas",
      label: "Módulos de control",
      language: "PDF en inglés",
      description:
        "Para identificación de burbujas, monitoreo de condiciones anormales y control de seguridad en sistemas fluídicos.",
      keywords: "detector de burbujas módulo de control",
    },
  },

  fr: {
    "plunger-pump": {
      title: "Fiche technique de la série de pompes à piston",
      label: "Pompes",
      language: "PDF en anglais",
      description:
        "Pour le dosage de haute précision, la distribution et les systèmes fluidiques d’instruments d’analyse automatisés.",
      keywords: "pompe à piston dosage précis plunger pump",
    },
    "valveless-pump": {
      title: "Fiche technique de pompe sans vanne",
      label: "Pompes",
      language: "PDF en anglais",
      description:
        "Pour les applications de microdosage réduisant le nombre de vannes et améliorant la fiabilité du système.",
      keywords: "pompe sans vanne micro dosage valveless pump",
    },
    "diaphragm-pump": {
      title: "Fiche technique de pompe à membrane",
      label: "Pompes",
      language: "PDF en anglais",
      description:
        "Pour l’alimentation à faible débit, le transfert auto-amorçant, l’acheminement de liquides de lavage et l’intégration fluidique automatisée.",
      keywords: "pompe à membrane auto-amorçage lavage",
    },
    "high-pressure-pump": {
      title: "Fiche technique de pompe haute pression",
      label: "Pompes",
      language: "PDF en anglais",
      description:
        "Pour le contrôle fluidique haute pression, le transfert précis et les applications fluidiques résistantes à la pression.",
      keywords: "pompe haute pression résistance pression",
    },
    "syringe-pump": {
      title: "Fiche technique de pompe seringue",
      label: "Pompes",
      language: "PDF en anglais",
      description:
        "Pour le dosage de haute précision de μL à mL, la distribution et la manipulation de liquides multicanal.",
      keywords: "pompe seringue multicanal dosage",
    },
    "rotary-valve": {
      title: "Fiche technique de vanne rotative",
      label: "Vannes",
      language: "PDF en anglais",
      description:
        "Pour la commutation de voies fluidiques multicanal, la distribution de réactifs et l’intégration de systèmes fluidiques complexes.",
      keywords: "vanne rotative multicanal commutation",
    },
    "high-pressure-valve": {
      title: "Fiche technique de vanne haute pression",
      label: "Vannes",
      language: "PDF en anglais",
      description:
        "Pour la commutation fluidique haute pression, le contrôle résistant à la pression et la gestion précise des fluides.",
      keywords: "vanne haute pression commutation pression",
    },
    "solenoid-valve": {
      title: "Fiche technique d’électrovanne",
      label: "Vannes",
      language: "PDF en anglais",
      description:
        "Pour le contrôle marche/arrêt et la commutation microfluidique des échantillons, réactifs et liquides de lavage.",
      keywords: "électrovanne contrôle commutation solenoid valve",
    },
    "sample-probe": {
      title: "Sondes",
      label: "Sondes",
      language: "—",
      description:
        "Aucune fiche technique standard n’est disponible pour le moment. Les demandes personnalisées sont prises en charge à partir de plans ou d’échantillons.",
      keywords: "sonde prélèvement sonde personnalisée sample probe",
    },
    "tubing-fitting": {
      title: "Fiche technique tubes et raccords",
      label: "Tubes et raccords",
      language: "PDF en anglais",
      description:
        "Pour la connexion de tubes, les assemblages de tubes rigides ou souples et les solutions de raccords dans les systèmes microfluidiques.",
      keywords: "tubes raccords fittings tubing fitting",
    },
    "pressure-sensor": {
      title: "Fiche technique de capteur de pression",
      label: "Modules de contrôle",
      language: "PDF en anglais",
      description:
        "Pour la surveillance de pression fluidique, le retour d’état du système et l’intégration de contrôle automatisé.",
      keywords: "capteur de pression module de contrôle",
    },
    "bubble-detector": {
      title: "Fiche technique du module de détection de bulles",
      label: "Modules de contrôle",
      language: "PDF en anglais",
      description:
        "Pour l’identification des bulles, la surveillance des anomalies et le contrôle de sécurité dans les systèmes fluidiques.",
      keywords: "détecteur de bulles module de contrôle",
    },
  },

  ko: {
    "plunger-pump": {
      title: "플런저 펌프 시리즈 사양서",
      label: "펌프",
      language: "영어 PDF",
      description:
        "고정밀 정량 이송, 분주 및 자동화 분석 장비의 유체 시스템에 적합합니다.",
      keywords: "플런저 펌프 정밀 정량 분주 plunger pump",
    },
    "valveless-pump": {
      title: "무밸브 펌프 사양서",
      label: "펌프",
      language: "영어 PDF",
      description:
        "밸브 수를 줄이고 시스템 신뢰성을 높이는 미량 정량 액체 응용에 적합합니다.",
      keywords: "무밸브 펌프 미량 정량 valveless pump",
    },
    "diaphragm-pump": {
      title: "다이어프램 펌프 사양서",
      label: "펌프",
      language: "영어 PDF",
      description:
        "소유량 공급, 자흡 이송, 세척액 공급 및 자동화 유체 시스템 통합에 적합합니다.",
      keywords: "다이어프램 펌프 자흡 공급 세척",
    },
    "high-pressure-pump": {
      title: "고압 펌프 사양서",
      label: "펌프",
      language: "영어 PDF",
      description:
        "고압 유체 제어, 정밀 이송 및 특수 내압 유로 응용에 적합합니다.",
      keywords: "고압 펌프 내압 정밀 이송",
    },
    "syringe-pump": {
      title: "시린지 펌프 사양서",
      label: "펌프",
      language: "영어 PDF",
      description:
        "μL–mL급 고정밀 정량, 분주 및 다중 채널 액체 처리에 적합합니다.",
      keywords: "시린지 펌프 다중 채널 정량 분주",
    },
    "rotary-valve": {
      title: "로터리 밸브 사양서",
      label: "밸브",
      language: "영어 PDF",
      description:
        "다중 채널 유로 전환, 시약 분배 및 복잡한 유체 시스템 통합에 적합합니다.",
      keywords: "로터리 밸브 다중 채널 유로 전환",
    },
    "high-pressure-valve": {
      title: "고압 밸브 사양서",
      label: "밸브",
      language: "영어 PDF",
      description:
        "고압 유로 전환, 내압 제어 및 정밀 유체 관리에 적합합니다.",
      keywords: "고압 밸브 내압 유로 전환",
    },
    "solenoid-valve": {
      title: "솔레노이드 밸브 사양서",
      label: "밸브",
      language: "영어 PDF",
      description:
        "샘플, 시약 및 세척액의 미세유체 온오프 제어와 전환에 적합합니다.",
      keywords: "솔레노이드 밸브 온오프 제어 전환",
    },
    "sample-probe": {
      title: "프로브",
      label: "프로브",
      language: "—",
      description:
        "현재 표준 사양서는 없으며, 도면 또는 샘플 기반 맞춤 요청을 지원합니다.",
      keywords: "프로브 샘플링 프로브 맞춤 프로브",
    },
    "tubing-fitting": {
      title: "튜빙 및 피팅 사양서",
      label: "튜빙 및 피팅",
      language: "영어 PDF",
      description:
        "마이크로플루이딕 시스템의 튜빙 연결, 리지드/플렉시블 튜빙 어셈블리 및 일반 피팅 솔루션에 적합합니다.",
      keywords: "튜빙 피팅 커넥터 튜빙 어셈블리",
    },
    "pressure-sensor": {
      title: "압력 센서 사양서",
      label: "제어 모듈",
      language: "영어 PDF",
      description:
        "유로 압력 모니터링, 시스템 상태 피드백 및 자동화 제어 통합에 사용됩니다.",
      keywords: "압력 센서 제어 모듈 압력 모니터링",
    },
    "bubble-detector": {
      title: "기포 감지 모듈 사양서",
      label: "제어 모듈",
      language: "영어 PDF",
      description:
        "유로 내 기포 식별, 이상 상태 모니터링 및 시스템 안전 제어에 사용됩니다.",
      keywords: "기포 감지 모듈 기포 검출",
    },
  },

  ru: {
    "plunger-pump": {
      title: "Спецификация серии плунжерных насосов",
      label: "Насосы",
      language: "PDF на английском",
      description:
        "Для высокоточного дозирования, распределения и жидкостных систем автоматизированных аналитических приборов.",
      keywords: "плунжерный насос точное дозирование plunger pump",
    },
    "valveless-pump": {
      title: "Спецификация безклапанного насоса",
      label: "Насосы",
      language: "PDF на английском",
      description:
        "Для микродозирования, где требуется сократить количество клапанов и повысить надежность системы.",
      keywords: "безклапанный насос микро дозирование",
    },
    "diaphragm-pump": {
      title: "Спецификация мембранного насоса",
      label: "Насосы",
      language: "PDF на английском",
      description:
        "Для подачи малых объемов, самовсасывающей передачи, подачи промывочных жидкостей и интеграции в автоматизированные жидкостные системы.",
      keywords: "мембранный насос самовсасывание подача",
    },
    "high-pressure-pump": {
      title: "Спецификация насоса высокого давления",
      label: "Насосы",
      language: "PDF на английском",
      description:
        "Для управления жидкостями под высоким давлением, точной передачи и специальных напорных жидкостных применений.",
      keywords: "насос высокого давления устойчивость давление",
    },
    "syringe-pump": {
      title: "Спецификация шприцевого насоса",
      label: "Насосы",
      language: "PDF на английском",
      description:
        "Для высокоточного дозирования от μL до mL, распределения и многоканальной работы с жидкостями.",
      keywords: "шприцевой насос многоканальный дозирование",
    },
    "rotary-valve": {
      title: "Спецификация роторного клапана",
      label: "Клапаны",
      language: "PDF на английском",
      description:
        "Для многоканального переключения потоков, распределения реагентов и интеграции сложных жидкостных систем.",
      keywords: "роторный клапан многоканальное переключение",
    },
    "high-pressure-valve": {
      title: "Спецификация клапана высокого давления",
      label: "Клапаны",
      language: "PDF на английском",
      description:
        "Для переключения потоков под высоким давлением, напорного управления и точного управления жидкостями.",
      keywords: "клапан высокого давления переключение потоков",
    },
    "solenoid-valve": {
      title: "Спецификация соленоидного клапана",
      label: "Клапаны",
      language: "PDF на английском",
      description:
        "Для микрофлюидного включения/выключения и переключения проб, реагентов и промывочных жидкостей.",
      keywords: "соленоидный клапан переключение",
    },
    "sample-probe": {
      title: "Зонды",
      label: "Зонды",
      language: "—",
      description:
        "Стандартная спецификация пока недоступна. Возможны индивидуальные запросы по чертежам или образцам.",
      keywords: "зонд пробоотборный зонд индивидуальный",
    },
    "tubing-fitting": {
      title: "Спецификация трубок и фитингов",
      label: "Трубки и фитинги",
      language: "PDF на английском",
      description:
        "Для соединения трубок, сборок жестких или гибких трубок и стандартных фитинговых решений в микрофлюидных системах.",
      keywords: "трубки фитинги соединители",
    },
    "pressure-sensor": {
      title: "Спецификация датчика давления",
      label: "Модули управления",
      language: "PDF на английском",
      description:
        "Для мониторинга давления в жидкостных системах, обратной связи по состоянию системы и интеграции автоматизированного управления.",
      keywords: "датчик давления модуль управления",
    },
    "bubble-detector": {
      title: "Спецификация модуля обнаружения пузырьков",
      label: "Модули управления",
      language: "PDF на английском",
      description:
        "Для обнаружения пузырьков, мониторинга аномальных состояний и безопасного управления жидкостными системами.",
      keywords: "детектор пузырьков модуль управления",
    },
  },
};

const currentItemGenericKey: Record<string, string> = {
  "ea-piston-pump": "plunger-pump",
  "eas-piston-pump": "plunger-pump",
  "sm-piston-pump": "plunger-pump",
  "rpl-p635-p15-valveless-pump": "valveless-pump",
  "smtp2-smtp4-pipetting-pump": "syringe-pump",
  "hld3-syringe-pump": "syringe-pump",
  "hld6-syringe-pump": "syringe-pump",
  "hmd3-syringe-pump": "syringe-pump",
  "hmd6-syringe-pump": "syringe-pump",
  "dpl30-diaphragm-pump": "diaphragm-pump",
  "dpl60-diaphragm-pump": "diaphragm-pump",
  "dpgl800-diaphragm-pump": "diaphragm-pump",
  "mrv3-multi-channel-rotary-valve": "rotary-valve",
  "hp-2-position-6-port-high-pressure-valve": "high-pressure-valve",
  "6010-solenoid-valve": "solenoid-valve",
  "fittings-and-tubing-catalog": "tubing-fitting",
  "abd-air-bubble-detector": "bubble-detector",
  "pdm5-pressure-sensor": "pressure-sensor",
};

const currentItemTranslations: Record<
  Exclude<DatasheetLocale, "zh-CN" | "en">,
  Record<string, Pick<DatasheetItem, "title" | "description">>
> = {
  es: {
    "ea-piston-pump": { title: "Ficha técnica de la bomba de émbolo EA", description: "Bombas de émbolo EA para medición precisa, dosificación y manipulación automatizada de líquidos, con capacidades de 50 µL a 20 mL." },
    "eas-piston-pump": { title: "Ficha técnica de la bomba de émbolo EAS", description: "Bombas de émbolo EAS de desaireación sencilla para manipulación precisa de líquidos cuando se requiere cebado rápido y eliminación eficaz de burbujas." },
    "sm-piston-pump": { title: "Ficha técnica de la bomba de émbolo SM", description: "Bombas de émbolo SM compactas para dosificación precisa de pequeños volúmenes e integración en instrumentos automatizados miniaturizados." },
    "rpl-p635-p15-valveless-pump": { title: "Ficha técnica de las bombas sin válvulas RPL-P6.35 / RPL-P15", description: "Ficha conjunta de las bombas sin válvulas RPL-P6.35 y RPL-P15, con rangos de dosificación precisa de 50 µL a 1200 µL." },
    "smtp2-smtp4-pipetting-pump": { title: "Ficha técnica de las bombas de pipeteo SMTP2 / SMTP4", description: "Ficha conjunta de las bombas de pipeteo por desplazamiento de aire SMTP2 y SMTP4 para la manipulación automatizada de muestras y reactivos." },
    "hld3-syringe-pump": { title: "Ficha técnica de la bomba de jeringa HLD3 con válvula rotativa", description: "Bomba de jeringa HLD3 con carrera de 30 mm y configuraciones de válvula rotativa para manipulación precisa de líquidos." },
    "hld6-syringe-pump": { title: "Ficha técnica de la bomba de jeringa HLD6 con válvula rotativa", description: "Bomba de jeringa HLD6 con carrera de 60 mm y configuraciones de válvula rotativa para manipulación de líquidos de µL a mL." },
    "hmd3-syringe-pump": { title: "Ficha técnica de la bomba de jeringa HMD3 con electroválvula", description: "Bomba de jeringa HMD3 con carrera de 30 mm y electroválvula integrada para dosificación automatizada." },
    "hmd6-syringe-pump": { title: "Ficha técnica de la bomba de jeringa HMD6 con electroválvula", description: "Bomba de jeringa HMD6 con carrera de 60 mm y electroválvulas integradas para manipulación multicanal de líquidos." },
    "dpl30-diaphragm-pump": { title: "Ficha técnica de la bomba de diafragma DPL30", description: "Bomba de diafragma DPL30 para transferencia compacta de líquidos, con caudales de hasta 300 mL/min." },
    "dpl60-diaphragm-pump": { title: "Ficha técnica de la bomba de diafragma DPL60", description: "Bomba de diafragma DPL60 para suministro y transferencia de líquidos, con caudales de hasta 600 mL/min." },
    "dpgl800-diaphragm-pump": { title: "Ficha técnica de la bomba de diafragma gas-líquido DPGL800", description: "Bomba DPGL800 para aspiración de gas y mezclas gas-líquido, generación de vacío y evacuación de residuos líquidos." },
    "mrv3-multi-channel-rotary-valve": { title: "Ficha técnica de la válvula rotativa multicanal MRV3", description: "Válvula rotativa multicanal MRV3 para conmutación multipuerto, distribución de reactivos e integración fluídica." },
    "hp-2-position-6-port-high-pressure-valve": { title: "Ficha técnica de la válvula de alta presión HP de 2 posiciones y 6 puertos con venteo", description: "Válvula HP de alta presión, 2 posiciones y 6 puertos, con vía de venteo para conmutación de circuitos resistentes a la presión." },
    "6010-solenoid-valve": { title: "Ficha técnica de la electroválvula 6010", description: "Configuraciones de sustrato, roscadas y con espiga de la electroválvula 6010 para control de 2 y 3 vías." },
    "fittings-and-tubing-catalog": { title: "Catálogo de racores y tubos", description: "Catálogo conjunto en inglés de racores, conectores, tubos rígidos y flexibles y conjuntos de tubos FOREACH." },
    "abd-air-bubble-detector": { title: "Ficha técnica del detector de burbujas de aire ABD", description: "Detector ABD sin contacto de burbujas de aire y líquido para tubos transparentes, compatible con comunicación TTL y Modbus RTU." },
    "pdm5-pressure-sensor": { title: "Manual de usuario del sensor de presión PDM5", description: "Manual del sensor PDM5 sobre instalación, comunicación I2C, especificaciones y supervisión de la presión del fluido." },
  },
  fr: {
    "ea-piston-pump": { title: "Fiche technique de la pompe à piston EA", description: "Pompes à piston EA pour le dosage précis et la manipulation automatisée des liquides, avec des capacités de 50 µL à 20 mL." },
    "eas-piston-pump": { title: "Fiche technique de la pompe à piston EAS", description: "Pompes à piston EAS à désaération facilitée pour une manipulation précise nécessitant un amorçage rapide et une élimination efficace des bulles." },
    "sm-piston-pump": { title: "Fiche technique de la pompe à piston SM", description: "Pompes à piston SM compactes pour le dosage précis de petits volumes et l’intégration dans des instruments automatisés miniatures." },
    "rpl-p635-p15-valveless-pump": { title: "Fiche technique des pompes sans clapet RPL-P6.35 / RPL-P15", description: "Fiche commune des pompes RPL-P6.35 et RPL-P15 couvrant des plages de dosage précis de 50 µL à 1200 µL." },
    "smtp2-smtp4-pipetting-pump": { title: "Fiche technique des pompes de pipetage SMTP2 / SMTP4", description: "Fiche commune des pompes de pipetage à déplacement d’air SMTP2 et SMTP4 pour la manipulation automatisée d’échantillons et de réactifs." },
    "hld3-syringe-pump": { title: "Fiche technique de la pompe à seringue HLD3 avec vanne rotative", description: "Pompe à seringue HLD3 avec course de 30 mm et configurations à vanne rotative pour la manipulation précise des liquides." },
    "hld6-syringe-pump": { title: "Fiche technique de la pompe à seringue HLD6 avec vanne rotative", description: "Pompe à seringue HLD6 avec course de 60 mm et configurations à vanne rotative pour la manipulation de µL à mL." },
    "hmd3-syringe-pump": { title: "Fiche technique de la pompe à seringue HMD3 avec électrovanne", description: "Pompe à seringue HMD3 avec course de 30 mm et électrovanne intégrée pour le dosage automatisé." },
    "hmd6-syringe-pump": { title: "Fiche technique de la pompe à seringue HMD6 avec électrovanne", description: "Pompe à seringue HMD6 avec course de 60 mm et électrovannes intégrées pour la manipulation multicanal des liquides." },
    "dpl30-diaphragm-pump": { title: "Fiche technique de la pompe à membrane DPL30", description: "Pompe à membrane DPL30 pour les applications compactes de transfert de liquides, avec un débit maximal de 300 mL/min." },
    "dpl60-diaphragm-pump": { title: "Fiche technique de la pompe à membrane DPL60", description: "Pompe à membrane DPL60 pour l’alimentation et le transfert de liquides, avec un débit maximal de 600 mL/min." },
    "dpgl800-diaphragm-pump": { title: "Fiche technique de la pompe à membrane gaz-liquide DPGL800", description: "Pompe DPGL800 pour l’aspiration de gaz et de mélanges gaz-liquide, la création de vide et l’évacuation des effluents." },
    "mrv3-multi-channel-rotary-valve": { title: "Fiche technique de la vanne rotative multicanal MRV3", description: "Vanne rotative multicanal MRV3 pour la commutation multipport, la distribution de réactifs et l’intégration fluidique." },
    "hp-2-position-6-port-high-pressure-valve": { title: "Fiche technique de la vanne haute pression HP 2 positions, 6 voies avec évent", description: "Vanne HP haute pression à 2 positions et 6 voies avec évent pour la commutation de circuits résistants à la pression." },
    "6010-solenoid-valve": { title: "Fiche technique de l’électrovanne 6010", description: "Configurations sur embase, filetées et cannelées de l’électrovanne 6010 pour la commande 2 et 3 voies." },
    "fittings-and-tubing-catalog": { title: "Catalogue des raccords et tubes", description: "Catalogue commun en anglais des raccords, connecteurs, tubes rigides et souples et ensembles de tubes FOREACH." },
    "abd-air-bubble-detector": { title: "Fiche technique du détecteur de bulles d’air ABD", description: "Détecteur ABD sans contact de bulles d’air et de liquide pour tubes transparents, avec communication TTL et prise en charge de Modbus RTU." },
    "pdm5-pressure-sensor": { title: "Manuel d’utilisation du capteur de pression PDM5", description: "Manuel PDM5 couvrant l’installation, la communication I2C, les spécifications et la surveillance de la pression du fluide." },
  },
  ru: {
    "ea-piston-pump": { title: "Техническое описание плунжерного насоса EA", description: "Насосы EA для точного дозирования и автоматизированной работы с жидкостями, объём от 50 µL до 20 mL." },
    "eas-piston-pump": { title: "Техническое описание плунжерного насоса EAS", description: "Насосы EAS с удобным удалением воздуха для точной подачи, быстрого заполнения и эффективного удаления пузырьков." },
    "sm-piston-pump": { title: "Техническое описание плунжерного насоса SM", description: "Компактные насосы SM для точного дозирования малых объёмов и установки в миниатюрные автоматизированные приборы." },
    "rpl-p635-p15-valveless-pump": { title: "Техническое описание бесклапанных насосов RPL-P6.35 / RPL-P15", description: "Общее описание насосов RPL-P6.35 и RPL-P15 с диапазоном точного дозирования от 50 µL до 1200 µL." },
    "smtp2-smtp4-pipetting-pump": { title: "Техническое описание пипеточных насосов SMTP2 / SMTP4", description: "Общее описание воздушно-вытеснительных насосов SMTP2 и SMTP4 для автоматической работы с образцами и реагентами." },
    "hld3-syringe-pump": { title: "Техническое описание шприцевого насоса HLD3 с поворотным клапаном", description: "Насос HLD3 с ходом 30 mm и поворотным клапаном для точной работы с жидкостями." },
    "hld6-syringe-pump": { title: "Техническое описание шприцевого насоса HLD6 с поворотным клапаном", description: "Насос HLD6 с ходом 60 mm и поворотным клапаном для работы с объёмами от µL до mL." },
    "hmd3-syringe-pump": { title: "Техническое описание шприцевого насоса HMD3 с электромагнитным клапаном", description: "Насос HMD3 с ходом 30 mm и встроенным электромагнитным клапаном для автоматического дозирования." },
    "hmd6-syringe-pump": { title: "Техническое описание шприцевого насоса HMD6 с электромагнитным клапаном", description: "Насос HMD6 с ходом 60 mm и встроенными электромагнитными клапанами для многоканальной подачи." },
    "dpl30-diaphragm-pump": { title: "Техническое описание мембранного насоса DPL30", description: "Насос DPL30 для компактных систем перекачивания жидкости с расходом до 300 mL/min." },
    "dpl60-diaphragm-pump": { title: "Техническое описание мембранного насоса DPL60", description: "Насос DPL60 для подачи и перекачивания жидкости с расходом до 600 mL/min." },
    "dpgl800-diaphragm-pump": { title: "Техническое описание газожидкостного мембранного насоса DPGL800", description: "Насос DPGL800 для аспирации газа и газожидкостных смесей, создания вакуума и удаления отработанной жидкости." },
    "mrv3-multi-channel-rotary-valve": { title: "Техническое описание многоканального поворотного клапана MRV3", description: "Клапан MRV3 для многопортового переключения потоков, распределения реагентов и интеграции гидравлической системы." },
    "hp-2-position-6-port-high-pressure-valve": { title: "Техническое описание клапана высокого давления HP: 2 положения, 6 портов и сброс", description: "Клапан HP с 2 положениями, 6 портами и каналом сброса для переключения жидкостных трактов высокого давления." },
    "6010-solenoid-valve": { title: "Техническое описание электромагнитного клапана 6010", description: "Исполнения клапана 6010 на подложке, с резьбой и штуцерами для 2- и 3-ходового управления." },
    "fittings-and-tubing-catalog": { title: "Каталог фитингов и трубок", description: "Общий каталог на английском языке: фитинги, соединители, жёсткие и гибкие трубки и трубные сборки FOREACH." },
    "abd-air-bubble-detector": { title: "Техническое описание датчика пузырьков воздуха ABD", description: "Бесконтактный датчик ABD для пузырьков воздуха и жидкости в прозрачных трубках с TTL и Modbus RTU." },
    "pdm5-pressure-sensor": { title: "Руководство пользователя датчика давления PDM5", description: "Руководство PDM5 по монтажу, связи I2C, характеристикам и контролю давления жидкости." },
  },
  ko: {
    "ea-piston-pump": { title: "EA 플런저 펌프 데이터시트", description: "50 µL~20 mL 용량 범위에서 정밀 계량, 분주 및 자동 액체 처리를 지원하는 EA 플런저 펌프입니다." },
    "eas-piston-pump": { title: "EAS 플런저 펌프 데이터시트", description: "빠른 프라이밍과 효율적인 기포 제거가 필요한 정밀 액체 처리를 위한 간편 탈기형 EAS 플런저 펌프입니다." },
    "sm-piston-pump": { title: "SM 플런저 펌프 데이터시트", description: "소용량 정밀 분주와 소형 자동화 장비 통합을 위한 콤팩트 SM 플런저 펌프입니다." },
    "rpl-p635-p15-valveless-pump": { title: "RPL-P6.35 / RPL-P15 무밸브 펌프 데이터시트", description: "50 µL~1200 µL 정밀 계량 범위를 지원하는 RPL-P6.35 및 RPL-P15 무밸브 펌프 통합 데이터시트입니다." },
    "smtp2-smtp4-pipetting-pump": { title: "SMTP2 / SMTP4 피펫팅 펌프 데이터시트", description: "샘플과 시약의 자동 처리를 위한 SMTP2 및 SMTP4 공기 치환식 피펫팅 펌프 통합 데이터시트입니다." },
    "hld3-syringe-pump": { title: "로터리 밸브형 HLD3 시린지 펌프 데이터시트", description: "정밀 액체 처리를 위한 30 mm 스트로크 및 로터리 밸브 구성의 HLD3 시린지 펌프입니다." },
    "hld6-syringe-pump": { title: "로터리 밸브형 HLD6 시린지 펌프 데이터시트", description: "µL~mL 액체 처리를 위한 60 mm 스트로크 및 로터리 밸브 구성의 HLD6 시린지 펌프입니다." },
    "hmd3-syringe-pump": { title: "솔레노이드 밸브형 HMD3 시린지 펌프 데이터시트", description: "자동 분주를 위한 30 mm 스트로크와 통합 솔레노이드 밸브 구성의 HMD3 시린지 펌프입니다." },
    "hmd6-syringe-pump": { title: "솔레노이드 밸브형 HMD6 시린지 펌프 데이터시트", description: "다채널 액체 처리를 위한 60 mm 스트로크와 통합 솔레노이드 밸브 구성의 HMD6 시린지 펌프입니다." },
    "dpl30-diaphragm-pump": { title: "DPL30 다이어프램 펌프 데이터시트", description: "최대 300 mL/min 유량을 지원하는 콤팩트 액체 이송용 DPL30 다이어프램 펌프입니다." },
    "dpl60-diaphragm-pump": { title: "DPL60 다이어프램 펌프 데이터시트", description: "최대 600 mL/min 유량을 지원하는 액체 공급 및 이송용 DPL60 다이어프램 펌프입니다." },
    "dpgl800-diaphragm-pump": { title: "DPGL800 기액 혼합 다이어프램 펌프 데이터시트", description: "기체 및 기액 혼합물 흡인, 진공 형성, 폐액 배출용 DPGL800 다이어프램 펌프입니다." },
    "mrv3-multi-channel-rotary-valve": { title: "MRV3 다채널 로터리 밸브 데이터시트", description: "다중 포트 유로 전환, 시약 분배 및 유체 시스템 통합을 위한 MRV3 다채널 로터리 밸브입니다." },
    "hp-2-position-6-port-high-pressure-valve": { title: "벤트형 HP 2포지션 6포트 고압 밸브 데이터시트", description: "내압 유로 전환을 위한 벤트 유로 포함 HP 2포지션 6포트 고압 밸브입니다." },
    "6010-solenoid-valve": { title: "6010 솔레노이드 밸브 데이터시트", description: "2방향 및 3방향 제어를 위한 6010 솔레노이드 밸브의 기판형, 나사형 및 바브형 구성을 다룹니다." },
    "fittings-and-tubing-catalog": { title: "피팅 및 튜빙 카탈로그", description: "FOREACH 피팅, 커넥터, 경질·연질 튜빙 및 튜빙 어셈블리를 수록한 영문 통합 카탈로그입니다." },
    "abd-air-bubble-detector": { title: "ABD 기포 감지기 데이터시트", description: "투명 튜빙용 비접촉식 공기 기포 및 액체 감지기로 TTL 통신과 Modbus RTU를 지원합니다." },
    "pdm5-pressure-sensor": { title: "PDM5 압력 센서 사용자 설명서", description: "설치, I2C 통신, 사양 및 유체 압력 모니터링을 다루는 PDM5 압력 센서 사용자 설명서입니다." },
  },
};

/* =========================================================
   localizeFilterOptions
   根据语言生成筛选按钮

   说明：
   1. 中文和英文继续使用原始数据
   2. 西班牙语、法语、韩语、俄语使用当前文件中的短标签
   3. value 不能修改，否则筛选逻辑会失效
========================================================= */

function localizeFilterOptions(
  locale: DatasheetLocale,
): DatasheetFilterOption[] {
  if (locale === "zh-CN") {
    return datasheetZhFilterOptions;
  }

  if (locale === "en") {
    return datasheetEnFilterOptions;
  }

  const labelMap = foreignFilterLabelMap[locale];

  return datasheetEnFilterOptions.map((option) => ({
    ...option,
    label: labelMap[option.value] ?? option.label,
  }));
}

/* =========================================================
   localizeItems
   根据语言生成规格书卡片

   说明：
   1. 中文和英文继续使用原始卡片数据
   2. 外语页面使用英文卡片结构，只替换标题、标签、语言、描述、关键词
   3. PDF 下载链接继续沿用英文 PDF
   4. 产品链接自动切换为当前语言路径
   5. probe / needle 这种暂无规格书的项目，跳转到对应语言联系页
========================================================= */

function localizeItems(locale: DatasheetLocale): DatasheetItem[] {
  if (locale === "zh-CN") {
    return datasheetZhItems;
  }

  if (locale === "en") {
    return datasheetEnItems;
  }

  const itemTextMap = foreignItemTextMap[locale];

  return datasheetEnItems.map((item) => {
    const genericText = itemTextMap[currentItemGenericKey[item.id]];
    const currentText = currentItemTranslations[locale][item.id];
    const localizedText = currentText
      ? { ...genericText, ...currentText }
      : itemTextMap[item.id];

    const nextItem = localizedText
      ? {
          ...item,
          ...localizedText,
        }
      : item;

    if (nextItem.actionType === "custom") {
      return {
        ...nextItem,
        productHref: nextItem.productHref?.replace(/^\/en(?=\/|$)/, `/${locale}`),
        downloadHref: `/${locale}/contact?type=custom-probe`,
      };
    }

    return {
      ...nextItem,
      productHref: nextItem.productHref?.replace(/^\/en(?=\/|$)/, `/${locale}`),
    };
  });
}

/* =========================================================
   getDatasheetsStaticPageText
   根据语言生成页面文案

   说明：
   1. 中文数据来自 datasheets.zh.ts，但这里统一覆盖按钮文字
   2. 英文数据来自 datasheets.en.ts，但这里统一覆盖按钮文字
   3. 外语数据来自当前文件 foreignPageTextMap
   4. 这样只改当前聚合文件，也能统一按钮文案
========================================================= */

function getDatasheetsStaticPageText(
  locale: DatasheetLocale,
): DatasheetsPageText {
  if (locale === "zh-CN") {
    return {
      ...datasheetsZhPageText,
      labels: {
        ...datasheetsZhPageText.labels,
        viewProduct: "查看产品",
        download: "下载",
        custom: "来图定制",
      },
    };
  }

  if (locale === "en") {
    return {
      ...datasheetsEnPageText,
      labels: {
        ...datasheetsEnPageText.labels,
        viewProduct: "View Product",
        download: "Download",
        custom: "Custom Request",
      },
    };
  }

  return foreignPageTextMap[locale];
}

/* =========================================================
   getDatasheetsStaticPageData
   对外统一导出页面数据

   说明：
   1. service 层会调用这个函数
   2. page.tsx 不直接调用这个文件
   3. 后期接后端时，优先改 service 层
========================================================= */

export function getDatasheetsStaticPageData(
  locale: DatasheetLocale,
): DatasheetsPageData {
  return {
    pageText: getDatasheetsStaticPageText(locale),
    filterOptions: localizeFilterOptions(locale),
    datasheetItems: localizeItems(locale),
  };
}
