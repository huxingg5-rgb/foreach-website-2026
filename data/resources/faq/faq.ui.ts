import type { LocaleCode } from "@/lib/i18n";

export const faqLocales = ["zh-CN", "en", "es", "fr", "ko", "ru"] as const;
export const faqPath = (locale: LocaleCode) => `${locale === "zh-CN" ? "" : `/${locale}`}/resources/faq/`;
export const faqTitles: Record<LocaleCode, string> = {
  "zh-CN": "常见问题", en: "Frequently Asked Questions", es: "Preguntas frecuentes",
  fr: "Questions fréquentes", ko: "자주 묻는 질문", ru: "Часто задаваемые вопросы",
};

export type FaqUi = {
  description: string; home: string; resources: string; breadcrumb: string;
  all: string; categories: string; products: string; services: string;
  searchPlaceholder: string; search: string; pagination: string; previous: string; next: string;
  emptyTitle: string; emptyDescription: string; clear: string;
  ctaTitle: string; ctaDescription: string; contact: string; readMore: string;
};

export const faqUi: Record<LocaleCode, FaqUi> = {
  "zh-CN": {
    description: "按产品分类查找泵、阀、针、管路、接头和检测模块的常见问题，直接查看选型、安装、密封、质量检验与售后支持解答。",
    home: "首页", resources: "资源中心", breadcrumb: "面包屑", all: "全部问题", categories: "问题分类", products: "产品问题", services: "服务与支持",
    searchPlaceholder: "输入产品名称、型号或遇到的问题", search: "搜索", pagination: "常见问题分页", previous: "上一页", next: "下一页",
    emptyTitle: "没有找到匹配的问题", emptyDescription: "试试产品名称、型号或简短的故障关键词，也可以清除分类和搜索条件后重新查找。", clear: "查看全部问题",
    ctaTitle: "还没有找到答案？", ctaDescription: "请提供产品型号、介质、运行条件和问题现象，便于我们协助核对选型或排查原因。",
    contact: "联系技术支持", readMore: "查看详细说明",
  },
  en: {
    description: "Find answers about pumps, valves, probes, tubing, fittings and fluid sensing modules. Browse product selection, installation, sealing, inspection and technical support questions.",
    home: "Home", resources: "Resources", breadcrumb: "Breadcrumb", all: "All questions", categories: "Question categories", products: "Product questions", services: "Service & support",
    searchPlaceholder: "Search by product, model or question", search: "Search", pagination: "FAQ pagination", previous: "Previous", next: "Next",
    emptyTitle: "No matching questions", emptyDescription: "Try a product name, model or a short description of the issue, or clear the category and search filters.", clear: "View all questions",
    ctaTitle: "Still need help?", ctaDescription: "Tell us the product model, fluid, operating conditions and symptoms so we can help with selection or troubleshooting.",
    contact: "Contact technical support", readMore: "View details",
  },
  es: {
    description: "Consulte preguntas sobre bombas, válvulas, sondas, tubos, racores y módulos de detección. Encuentre respuestas sobre selección, instalación, sellado, inspección y soporte técnico.",
    home: "Inicio", resources: "Recursos", breadcrumb: "Ruta de navegación", all: "Todas las preguntas", categories: "Categorías de preguntas", products: "Preguntas de productos", services: "Servicio y soporte",
    searchPlaceholder: "Busque por producto, modelo o pregunta", search: "Buscar", pagination: "Paginación de preguntas frecuentes", previous: "Anterior", next: "Siguiente",
    emptyTitle: "No se encontraron preguntas", emptyDescription: "Pruebe con el nombre del producto, el modelo o una breve descripción del problema, o borre los filtros de categoría y búsqueda.", clear: "Ver todas las preguntas",
    ctaTitle: "¿Todavía necesita ayuda?", ctaDescription: "Indique el modelo, el fluido, las condiciones de funcionamiento y los síntomas para que podamos ayudarle con la selección o el diagnóstico.",
    contact: "Contactar con soporte técnico", readMore: "Ver detalles",
  },
  fr: {
    description: "Retrouvez les réponses sur les pompes, vannes, sondes, tubes, raccords et modules de détection : choix des produits, installation, étanchéité, contrôle qualité et assistance technique.",
    home: "Accueil", resources: "Ressources", breadcrumb: "Fil d’Ariane", all: "Toutes les questions", categories: "Catégories de questions", products: "Questions produits", services: "Service et assistance",
    searchPlaceholder: "Rechercher un produit, un modèle ou une question", search: "Rechercher", pagination: "Pagination des questions fréquentes", previous: "Précédent", next: "Suivant",
    emptyTitle: "Aucune question correspondante", emptyDescription: "Essayez un nom de produit, un modèle ou une brève description du problème, ou effacez les filtres de catégorie et de recherche.", clear: "Voir toutes les questions",
    ctaTitle: "Besoin d’aide supplémentaire ?", ctaDescription: "Précisez le modèle, le fluide, les conditions de fonctionnement et les symptômes pour faciliter le choix du produit ou le diagnostic.",
    contact: "Contacter l’assistance technique", readMore: "Voir les détails",
  },
  ko: {
    description: "펌프, 밸브, 프로브, 튜브, 피팅 및 유체 감지 모듈에 관한 자주 묻는 질문을 확인하세요. 제품 선정, 설치, 밀봉, 품질 검사 및 기술 지원 정보를 제공합니다.",
    home: "홈", resources: "자료", breadcrumb: "탐색 경로", all: "전체 질문", categories: "질문 분류", products: "제품 관련 질문", services: "서비스 및 지원",
    searchPlaceholder: "제품명, 모델 또는 질문을 입력하세요", search: "검색", pagination: "자주 묻는 질문 페이지", previous: "이전", next: "다음",
    emptyTitle: "일치하는 질문이 없습니다", emptyDescription: "제품명, 모델 또는 간단한 증상으로 검색하거나 분류 및 검색 조건을 초기화해 보세요.", clear: "전체 질문 보기",
    ctaTitle: "답변을 찾지 못하셨나요?", ctaDescription: "제품 선정이나 문제 진단을 도와드릴 수 있도록 제품 모델, 유체, 운전 조건 및 증상을 알려 주세요.",
    contact: "기술 지원 문의", readMore: "상세 설명 보기",
  },
  ru: {
    description: "Ответы на вопросы о насосах, клапанах, иглах, трубках, фитингах и модулях контроля жидкости: подбор, монтаж, герметизация, проверка качества и техническая поддержка.",
    home: "Главная", resources: "Ресурсы", breadcrumb: "Навигационная цепочка", all: "Все вопросы", categories: "Категории вопросов", products: "Вопросы о продукции", services: "Сервис и поддержка",
    searchPlaceholder: "Введите название, модель или вопрос", search: "Поиск", pagination: "Страницы вопросов и ответов", previous: "Назад", next: "Далее",
    emptyTitle: "Подходящие вопросы не найдены", emptyDescription: "Попробуйте название изделия, модель или краткое описание неисправности либо сбросьте категорию и поисковый запрос.", clear: "Показать все вопросы",
    ctaTitle: "Не нашли ответ?", ctaDescription: "Укажите модель, рабочую среду, условия эксплуатации и признаки неисправности, чтобы мы могли помочь с подбором или диагностикой.",
    contact: "Техническая поддержка", readMore: "Подробнее",
  },
};
