/* =========================================================
   q20.page.intl.ts
   恒永达官网｜接头替代查询｜快插接头 Q20 首页多语言文案

   文件路径：
   data/resources/fitting-replacement/fittings/quick-connect/q20/q20.page.intl.ts

   作用：
   1. 存放 Q20 接头替代查询首页多语言文案
   2. 服务中文和外语路径
   3. 不存放产品数据
   4. 产品数据来自 q20.zh.ts
   5. 后续 Q40 / Q60 / 硬管 / 倒刺接头可按同样结构新增

   当前支持语言：
   zh 中文
   en 英文
   es 西班牙语
   fr 法语
   ko 韩语
   ru 俄语
========================================================= */

export type FittingReplacementLocale = "zh" | "en" | "es" | "fr" | "ko" | "ru";

/* =========================================================
   Q20 首页多语言文案
========================================================= */
export const fittingReplacementQuickConnectQ20PageIntl = {
  zh: {
    banner: {
      title: "接头替代查询",
      description:
        "输入竞品编码、商品编码或恒永达型号，快速查找 Q20 快插接头对应产品，并查看型号解析信息。",
    },

    breadcrumbs: [
      {
        label: "首页",
        href: "/",
      },
      {
        label: "资源中心",
        href: "/resources",
      },
      {
        label: "接头替代查询",
        href: "/resources/selection-support/fitting-replacement",
      },
    ],

    search: {
      placeholder: "请输入竞品编码、商品编码或恒永达型号",
      buttonText: "搜索",
    },

    homeText: {
      tabs: {
        replace: "产品替换表",
        guide: "接头选型指引",
      },

      history: {
        label: "最近搜索",
      },

      guide: {
        title: "接头选型指引",
        description:
          "按照管路尺寸、接口形式、安装方式、阀结构和材质逐步选择，系统会自动筛选匹配型号。",
        clearButton: "清空选择",
        resultTitle: "匹配结果",
        emptyBeforeSelection: "请选择上方条件，系统会自动筛选推荐型号。",
        selectedResultTemplate:
          "当前已选择 {selectedCount} 个条件，匹配到 {matchCount} 个型号。",
        noMatchText: "暂未找到完全匹配的型号，可以减少筛选条件后再试。",
      },

      productSection: {
        title: "产品替换表",
        description: "可直接查看对应型号，也可以先加入选型清单。",
        countTemplate: "当前展示 {start}–{end} / 共 {total} 个型号",
      },

      productCard: {
        productName: "FOREACH 接头",
        productCode: "商品编码：",
        foreachModel: "恒永达型号：",
        compatibleModels: "兼容编码：",
        viewDetail: "查看详情",
        addToCart: "加入清单",
        addedToCart: "已加入清单",
      },

      emptyResult: {
        title: "暂未找到对应型号",
        description:
          "可以提交现用型号、BOM、图纸或样品照片，由工程师进一步确认。",
      },

      pagination: {
        previous: "上一页",
        next: "下一页",
      },
    },
  },

  en: {
    banner: {
      title: "Fitting Replacement Search",
      description:
        "Enter a competitor model, product code, or FOREACH model to quickly find matching Q20 quick-connect fittings and model details.",
    },

    breadcrumbs: [
      {
        label: "Home",
        href: "/en",
      },
      {
        label: "Resources",
        href: "/en/resources",
      },
      {
        label: "Fitting Replacement",
        href: "/en/resources/selection-support/fitting-replacement",
      },
    ],

    search: {
      placeholder: "Competitor model, product code, or FOREACH model",
      buttonText: "Search",
    },

    homeText: {
      tabs: {
        replace: "Replacement List",
        guide: "Selection Guide",
      },

      history: {
        label: "Recent searches",
      },

      guide: {
        title: "Fitting Selection Guide",
        description:
          "Select tube size, interface type, mounting method, valve structure, and material step by step. The system will automatically filter matching models.",
        clearButton: "Clear selections",
        resultTitle: "Matching Results",
        emptyBeforeSelection:
          "Select conditions above and the system will recommend matching models automatically.",
        selectedResultTemplate:
          "{selectedCount} conditions selected, {matchCount} matching models found.",
        noMatchText:
          "No exact matching model found. Try reducing the selected conditions.",
      },

      productSection: {
        title: "Product Replacement List",
        description:
          "View matching models directly or add them to your selection list first.",
        countTemplate: "Showing {start}–{end} of {total} models",
      },

      productCard: {
        productName: "FOREACH Fitting",
        productCode: "Product Code:",
        foreachModel: "FOREACH Model:",
        compatibleModels: "Compatible Models:",
        viewDetail: "View Details",
        addToCart: "Add to List",
        addedToCart: "Added",
      },

      emptyResult: {
        title: "No matching model found",
        description:
          "You can submit your current model, BOM, drawing, or sample photo for engineering confirmation.",
      },

      pagination: {
        previous: "Previous",
        next: "Next",
      },
    },
  },

  es: {
    banner: {
      title: "Búsqueda de sustitución de conectores",
      description:
        "Introduzca un modelo de la competencia, código de producto o modelo FOREACH para encontrar rápidamente conectores rápidos Q20 equivalentes y sus detalles.",
    },

    breadcrumbs: [
      {
        label: "Inicio",
        href: "/es",
      },
      {
        label: "Recursos",
        href: "/es/resources",
      },
      {
        label: "Sustitución de conectores",
        href: "/es/resources/selection-support/fitting-replacement",
      },
    ],

    search: {
      placeholder: "Modelo, código de producto o modelo FOREACH",
      buttonText: "Buscar",
    },

    homeText: {
      tabs: {
        replace: "Lista de sustitución",
        guide: "Guía de selección",
      },

      history: {
        label: "Búsquedas recientes",
      },

      guide: {
        title: "Guía de selección de conectores",
        description:
          "Seleccione paso a paso el tamaño del tubo, el tipo de interfaz, el método de montaje, la estructura de válvula y el material. El sistema filtrará automáticamente los modelos correspondientes.",
        clearButton: "Borrar selección",
        resultTitle: "Resultados coincidentes",
        emptyBeforeSelection:
          "Seleccione las condiciones anteriores y el sistema recomendará automáticamente los modelos correspondientes.",
        selectedResultTemplate:
          "{selectedCount} condiciones seleccionadas, {matchCount} modelos coincidentes encontrados.",
        noMatchText:
          "No se encontró un modelo completamente coincidente. Intente reducir las condiciones seleccionadas.",
      },

      productSection: {
        title: "Lista de sustitución de productos",
        description:
          "Vea los modelos correspondientes o añádalos a la lista.",
        countTemplate: "Mostrando {start}–{end} de {total} modelos",
      },

      productCard: {
        productName: "Racor FOREACH",
        productCode: "Código:",
        foreachModel: "Modelo:",
        compatibleModels: "Compatibles:",
        viewDetail: "Detalles",
        addToCart: "Añadir",
        addedToCart: "Añadido",
      },

      emptyResult: {
        title: "No se encontró un modelo correspondiente",
        description:
          "Puede enviar su modelo actual, lista de materiales, plano o foto de muestra para que nuestro equipo técnico lo confirme.",
      },

      pagination: {
        previous: "Anterior",
        next: "Siguiente",
      },
    },
  },

  fr: {
    banner: {
      title: "Recherche de remplacement de raccords",
      description:
        "Saisissez une référence concurrente, un code produit ou un modèle FOREACH pour trouver rapidement les raccords rapides Q20 correspondants et leurs détails.",
    },

    breadcrumbs: [
      {
        label: "Accueil",
        href: "/fr",
      },
      {
        label: "Ressources",
        href: "/fr/resources",
      },
      {
        label: "Remplacement de raccords",
        href: "/fr/resources/selection-support/fitting-replacement",
      },
    ],

    search: {
      placeholder: "Référence, code produit ou modèle FOREACH",
      buttonText: "Rechercher",
    },

    homeText: {
      tabs: {
        replace: "Liste de remplacement",
        guide: "Guide de sélection",
      },

      history: {
        label: "Recherches récentes",
      },

      guide: {
        title: "Guide de sélection des raccords",
        description:
          "Sélectionnez progressivement la taille du tube, le type d’interface, le mode de montage, la structure de vanne et le matériau. Le système filtrera automatiquement les modèles correspondants.",
        clearButton: "Réinitialiser",
        resultTitle: "Résultats correspondants",
        emptyBeforeSelection:
          "Sélectionnez les conditions ci-dessus et le système recommandera automatiquement les modèles correspondants.",
        selectedResultTemplate:
          "{selectedCount} conditions sélectionnées, {matchCount} modèles correspondants trouvés.",
        noMatchText:
          "Aucun modèle parfaitement correspondant n’a été trouvé. Essayez de réduire les conditions sélectionnées.",
      },

      productSection: {
        title: "Liste de remplacement",
        description:
          "Consultez les modèles correspondants ou ajoutez-les à votre liste.",
        countTemplate: "Affichage de {start}–{end} sur {total} modèles",
      },

      productCard: {
        productName: "Raccord FOREACH",
        productCode: "Code :",
        foreachModel: "Modèle :",
        compatibleModels: "Compatibles :",
        viewDetail: "Détails",
        addToCart: "Ajouter",
        addedToCart: "Ajouté",
      },

      emptyResult: {
        title: "Aucun modèle correspondant trouvé",
        description:
          "Vous pouvez soumettre votre modèle actuel, votre nomenclature, votre plan ou une photo d’échantillon pour une confirmation technique.",
      },

      pagination: {
        previous: "Précédent",
        next: "Suivant",
      },
    },
  },

  ko: {
    banner: {
      title: "피팅 대체 조회",
      description:
        "경쟁사 모델, 제품 코드 또는 FOREACH 모델을 입력하여 Q20 퀵 커넥트 피팅의 대응 제품과 모델 정보를 빠르게 확인할 수 있습니다.",
    },

    breadcrumbs: [
      {
        label: "홈",
        href: "/ko",
      },
      {
        label: "자료실",
        href: "/ko/resources",
      },
      {
        label: "피팅 대체 조회",
        href: "/ko/resources/selection-support/fitting-replacement",
      },
    ],

    search: {
      placeholder: "경쟁사 모델, 제품 코드 또는 FOREACH 모델을 입력하세요",
      buttonText: "검색",
    },

    homeText: {
      tabs: {
        replace: "제품 대체표",
        guide: "피팅 선정 가이드",
      },

      history: {
        label: "최근 검색",
      },

      guide: {
        title: "피팅 선정 가이드",
        description:
          "튜브 크기, 인터페이스 형식, 설치 방식, 밸브 구조 및 재질을 단계적으로 선택하면 시스템이 자동으로 적합한 모델을 필터링합니다.",
        clearButton: "선택 초기화",
        resultTitle: "매칭 결과",
        emptyBeforeSelection:
          "위 조건을 선택하면 시스템이 자동으로 추천 모델을 필터링합니다.",
        selectedResultTemplate:
          "{selectedCount}개 조건 선택, {matchCount}개 모델 매칭",
        noMatchText:
          "완전히 일치하는 모델을 찾을 수 없습니다. 선택 조건을 줄여 다시 시도해 주세요.",
      },

      productSection: {
        title: "제품 대체표",
        description:
          "해당 모델을 바로 확인하거나 먼저 선정 목록에 추가할 수 있습니다.",
        countTemplate: "{total}개 모델 중 {start}–{end} 표시",
      },

      productCard: {
        productName: "FOREACH 피팅",
        productCode: "제품 코드:",
        foreachModel: "FOREACH 모델:",
        compatibleModels: "호환 코드:",
        viewDetail: "상세 보기",
        addToCart: "목록에 추가",
        addedToCart: "추가됨",
      },

      emptyResult: {
        title: "일치하는 모델을 찾을 수 없습니다",
        description:
          "현재 사용 중인 모델, BOM, 도면 또는 샘플 사진을 제출하시면 엔지니어가 추가로 확인할 수 있습니다.",
      },

      pagination: {
        previous: "이전",
        next: "다음",
      },
    },
  },

  ru: {
    banner: {
      title: "Поиск аналогов фитингов",
      description:
        "Введите модель конкурента, код изделия или модель FOREACH, чтобы быстро найти соответствующие быстросъемные фитинги Q20 и информацию о модели.",
    },

    breadcrumbs: [
      {
        label: "Главная",
        href: "/ru",
      },
      {
        label: "Ресурсы",
        href: "/ru/resources",
      },
      {
        label: "Поиск аналогов фитингов",
        href: "/ru/resources/selection-support/fitting-replacement",
      },
    ],

    search: {
      placeholder: "Артикул, код или модель FOREACH",
      buttonText: "Поиск",
    },

    homeText: {
      tabs: {
        replace: "Список замен",
        guide: "Руководство по подбору",
      },

      history: {
        label: "Недавние поиски",
      },

      guide: {
        title: "Руководство по подбору фитингов",
        description:
          "Пошагово выберите размер трубки, тип интерфейса, способ монтажа, конструкцию клапана и материал. Система автоматически отфильтрует подходящие модели.",
        clearButton: "Сбросить выбор",
        resultTitle: "Результаты подбора",
        emptyBeforeSelection:
          "Выберите параметры выше, и система автоматически подберет подходящие модели.",
        selectedResultTemplate:
          "Выбрано условий: {selectedCount}, найдено моделей: {matchCount}.",
        noMatchText:
          "Полностью совпадающая модель не найдена. Попробуйте уменьшить количество условий.",
      },

      productSection: {
        title: "Список замен",
        description: "Просмотрите подходящие модели или добавьте их в список.",
        countTemplate: "Показано {start}–{end} из {total} моделей",
      },

      productCard: {
        productName: "Фитинг FOREACH",
        productCode: "Код:",
        foreachModel: "Модель:",
        compatibleModels: "Аналоги:",
        viewDetail: "Детали",
        addToCart: "Добавить",
        addedToCart: "Добавлено",
      },

      emptyResult: {
        title: "Соответствующая модель не найдена",
        description:
          "Вы можете отправить текущую модель, BOM, чертеж или фото образца для дополнительной проверки инженером.",
      },

      pagination: {
        previous: "Назад",
        next: "Далее",
      },
    },
  },
} as const;

/* =========================================================
   获取 Q20 首页指定语言文案

   说明：
   1. 如果传入语言不存在，默认返回英文
   2. 中文页面建议传 zh
   3. 外语页面传 en / es / fr / ko / ru
========================================================= */
export function getFittingReplacementQuickConnectQ20PageIntl(
  locale: string = "zh"
) {
  if (locale in fittingReplacementQuickConnectQ20PageIntl) {
    return fittingReplacementQuickConnectQ20PageIntl[
      locale as FittingReplacementLocale
    ];
  }

  return fittingReplacementQuickConnectQ20PageIntl.en;
}
