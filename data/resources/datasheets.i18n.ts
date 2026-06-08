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
   4. 产品链接继续沿用英文产品路径
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
    const localizedText = itemTextMap[item.id];

    const nextItem = localizedText
      ? {
          ...item,
          ...localizedText,
        }
      : item;

    if (nextItem.actionType === "custom") {
      return {
        ...nextItem,
        downloadHref: `/${locale}/contact?type=custom-probe`,
      };
    }

    return nextItem;
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