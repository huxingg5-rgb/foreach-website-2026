// 这是关于 data/home-news.ts 的文件：用于管理首页第五屏「资讯中心」数据
// 这个文件的作用：统一管理首页新闻模块的标题、分类、主推新闻、公告卡片、新闻列表、图片和跳转链接
// 后端预留说明：后期接后台 / CMS 时，可以把这里的数据替换成接口返回数据
// 图片预留说明：当前 image 使用 public 目录下的本地图片路径，后期可以替换为后端返回的图片 URL

import type { LocaleCode } from "@/lib/i18n"; // 引入官网支持的语言代码类型，例如 zh-CN、en、es、fr、ko、ru

/* ================================
   多语言文本类型
================================ */

export type HomeNewsText = Partial<Record<LocaleCode, string>>; // 定义多语言文本类型，每种语言都可以单独配置文字

/* ================================
   多语言链接类型

   说明：
   1. 中文新闻路径可以是 /news
   2. 英文新闻路径可以是 /en/news
   3. 后期如果新闻详情页还没做，可以先统一跳 /news 或对应语言新闻列表
================================ */

export type HomeNewsHref = Partial<Record<LocaleCode, string>>; // 定义多语言链接类型，每种语言都可以单独配置链接

/* ================================
   新闻分类类型
================================ */

export type HomeNewsTab = {
  key: string; // 分类唯一标识，前端筛选和后端数据匹配时使用，不使用中文
  label: HomeNewsText; // 分类显示文字，支持多语言
};

/* ================================
   新闻卡片类型
================================ */

export type HomeNewsItem = {
  key: string; // 新闻唯一标识，用于 React key 和后端数据匹配
  categoryKey: string; // 对应分类 key，例如 company-news、announcements、knowledge
  categoryLabel: HomeNewsText; // 分类显示文字，支持多语言
  date: string; // 新闻日期
  title: HomeNewsText; // 新闻标题，支持多语言
  description?: HomeNewsText; // 新闻说明，可选，支持多语言
  image?: string; // 新闻图片路径，可选，后期可以替换为后端 / CMS 返回的图片 URL
  href: HomeNewsHref; // 新闻链接，支持多语言路径
};

/* ================================
   首页资讯中心数据
================================ */

export const homeNewsData = {
  /* ================================
     模块基础文案
  ================================ */

  sectionId: "news", // 首页新闻模块锚点 id

  title: {
    "zh-CN": "资讯中心",
    en: "News Center",
    es: "Centro de noticias",
    fr: "Centre d’actualités",
    ko: "뉴스 센터",
    ru: "Центр новостей",
  }, // 新闻模块标题

  tabsAriaLabel: {
    "zh-CN": "资讯分类切换",
    en: "News category switching",
    es: "Cambio de categoría de noticias",
    fr: "Changement de catégorie d’actualités",
    ko: "뉴스 카테고리 전환",
    ru: "Переключение категорий новостей",
  }, // 顶部分类按钮区域无障碍说明

  newsListAriaLabel: {
    "zh-CN": "新闻列表",
    en: "News list",
    es: "Lista de noticias",
    fr: "Liste des actualités",
    ko: "뉴스 목록",
    ru: "Список новостей",
  }, // 右侧新闻列表无障碍说明

  moreNewsLabel: {
    "zh-CN": "更多新闻",
    en: "More News",
    es: "Más noticias",
    fr: "Plus d’actualités",
    ko: "더 많은 뉴스",
    ru: "Больше новостей",
  }, // 查看更多新闻按钮文字

  viewDetailLabel: {
    "zh-CN": "查看详情",
    en: "View Details",
    es: "Ver detalles",
    fr: "Voir les détails",
    ko: "자세히 보기",
    ru: "Подробнее",
  }, // 查看详情按钮文字

  viewAnnouncementAriaLabel: {
    "zh-CN": "查看公告详情",
    en: "View announcement details",
    es: "Ver detalles del anuncio",
    fr: "Voir les détails de l’annonce",
    ko: "공지 상세 보기",
    ru: "Подробнее об объявлении",
  }, // 中间公告卡片查看详情的无障碍说明

  viewNewsAriaLabel: {
    "zh-CN": "查看详情",
    en: "View details",
    es: "Ver detalles",
    fr: "Voir les détails",
    ko: "자세히 보기",
    ru: "Подробнее",
  }, // 普通新闻查看详情的无障碍说明

  moreNewsHref: {
    "zh-CN": "/news",
    en: "/en/news",
    es: "/es/news",
    fr: "/fr/news",
    ko: "/ko/news",
    ru: "/ru/news",
  }, // 查看更多新闻的多语言跳转链接

  /* ================================
     顶部分类按钮
  ================================ */

  tabs: [
    {
      key: "company-news", // 公司动态分类 key
      label: {
        "zh-CN": "公司动态",
        en: "Company News",
        es: "Noticias de la empresa",
        fr: "Actualités de l’entreprise",
        ko: "회사 소식",
        ru: "Новости компании",
      }, // 公司动态分类文字
    },
    {
      key: "announcements", // 通知公告分类 key
      label: {
        "zh-CN": "通知公告",
        en: "Announcements",
        es: "Anuncios",
        fr: "Annonces",
        ko: "공지사항",
        ru: "Объявления",
      }, // 通知公告分类文字
    },
    {
      key: "knowledge", // 知识分享分类 key
      label: {
        "zh-CN": "知识分享",
        en: "Knowledge Sharing",
        es: "Recursos técnicos",
        fr: "Partage de connaissances",
        ko: "기술 자료",
        ru: "Технические материалы",
      }, // 知识分享分类文字
    },
  ] satisfies HomeNewsTab[], // 限定 tabs 必须符合 HomeNewsTab 数组类型

  /* ================================
     左侧主推新闻卡片
  ================================ */

  featureNews: {
    key: "company-fluidic-capability", // 左侧主推新闻 key
    categoryKey: "company-news", // 左侧主推新闻所属分类
    categoryLabel: {
      "zh-CN": "公司动态",
      en: "Company News",
      es: "Noticias de la empresa",
      fr: "Actualités de l’entreprise",
      ko: "회사 소식",
      ru: "Новости компании",
    }, // 左侧主推新闻分类文字
    date: "2026/05/16", // 左侧主推新闻日期
    image: "/images/home/news/news-feature-01.webp", // 左侧主推新闻图片，后期可替换为后端图片 URL
    title: {
      "zh-CN":
        "恒永达持续推进微流体系统核心零部件与液路方案能力建设，为 IVD、生命科学与实验室自动化客户提供稳定的产品支持。",
      en:
        "FOREACH continues to strengthen its core microfluidic component and fluidic solution capabilities, providing stable product support for IVD, life sciences, and laboratory automation customers.",
      es:
        "FOREACH continúa fortaleciendo sus capacidades en componentes microfluídicos clave y soluciones fluídicas, ofreciendo soporte estable para clientes de IVD, ciencias de la vida y automatización de laboratorios.",
      fr:
        "FOREACH continue de renforcer ses capacités en composants microfluidiques clés et solutions fluidiques, afin d’offrir un support produit stable aux clients IVD, sciences de la vie et automatisation de laboratoire.",
      ko:
        "FOREACH는 마이크로플루이딕 핵심 부품과 유체 솔루션 역량을 지속적으로 강화하여 IVD, 생명과학 및 실험실 자동화 고객에게 안정적인 제품 지원을 제공합니다.",
      ru:
        "FOREACH продолжает развивать возможности в области ключевых микрофлюидных компонентов и жидкостных решений, обеспечивая стабильную продуктовую поддержку клиентов в IVD, науках о жизни и лабораторной автоматизации.",
    }, // 左侧主推新闻标题
    description: {
      "zh-CN":
        "围绕泵、阀、传感器、管路连接件和采样针等核心部件，持续完善面向自动化分析仪器的液路系统支持能力，帮助客户更高效地完成样本处理、试剂分配、清洗废液及多通道流路控制。",
      en:
        "Focused on pumps, valves, sensors, fittings, tubing, and sampling probes, FOREACH continues to improve fluidic system support for automated analytical instruments.",
      es:
        "Centrada en bombas, válvulas, sensores, conectores, tubos y agujas de muestreo, FOREACH sigue mejorando el soporte de sistemas fluídicos para instrumentos analíticos automatizados.",
      fr:
        "Axée sur les pompes, vannes, capteurs, raccords, tubes et aiguilles de prélèvement, FOREACH continue d’améliorer le support des systèmes fluidiques pour les instruments d’analyse automatisés.",
      ko:
        "FOREACH는 펌프, 밸브, 센서, 피팅, 튜빙 및 샘플링 프로브를 중심으로 자동화 분석 장비를 위한 유체 시스템 지원 역량을 지속적으로 향상하고 있습니다.",
      ru:
        "FOREACH продолжает развивать поддержку жидкостных систем для автоматизированных аналитических приборов, уделяя внимание насосам, клапанам, датчикам, фитингам, трубкам и пробоотборным иглам.",
    }, // 左侧主推新闻描述
    href: {
      "zh-CN": "/news",
      en: "/en/news",
      es: "/es/news",
      fr: "/fr/news",
      ko: "/ko/news",
      ru: "/ru/news",
    }, // 左侧主推新闻链接
  } satisfies HomeNewsItem, // 限定 featureNews 必须符合 HomeNewsItem 类型

  /* ================================
     中间公告卡片
  ================================ */

  highlightNews: {
    key: "website-upgrade-project", // 中间公告新闻 key
    categoryKey: "announcements", // 中间公告所属分类
    categoryLabel: {
      "zh-CN": "通知公告",
      en: "Announcements",
      es: "Anuncios",
      fr: "Annonces",
      ko: "공지사항",
      ru: "Объявления",
    }, // 中间公告分类文字
    date: "2026/05/16", // 中间公告日期
    image: "", // 中间公告当前不使用图片，后期如果设计需要可以补图片
    title: {
      "zh-CN":
        "恒永达官网升级项目启动，将围绕产品展示、技术内容、询盘承接与后续优化持续完善。",
      en:
        "FOREACH has launched its website upgrade project, focusing on product presentation, technical content, inquiry conversion, and continuous optimization.",
      es:
        "FOREACH ha iniciado el proyecto de actualización de su sitio web, centrado en la presentación de productos, contenido técnico, gestión de consultas y mejora continua.",
      fr:
        "FOREACH a lancé son projet de mise à niveau du site web, axé sur la présentation des produits, le contenu technique, la gestion des demandes et l’optimisation continue.",
      ko:
        "FOREACH는 제품 전시, 기술 콘텐츠, 문의 접수 및 지속적인 최적화를 중심으로 공식 웹사이트 업그레이드 프로젝트를 시작했습니다.",
      ru:
        "FOREACH запустила проект обновления сайта, уделяя особое внимание презентации продукции, техническому контенту, обработке запросов и дальнейшей оптимизации.",
    }, // 中间公告标题
    description: {
      "zh-CN":
        "本次升级将重点优化首页信息结构、产品中心、应用领域、技术文章与联系我们模块，提升客户获取资料、了解产品与提交询盘的效率，并为多语言内容和后续运营预留空间。",
      en:
        "This upgrade will optimize the homepage structure, product center, application pages, technical articles, and contact modules, helping customers access information, understand products, and submit inquiries more efficiently while preparing for multilingual content and future operations.",
      es:
        "Esta actualización optimizará la estructura de la página principal, el centro de productos, las áreas de aplicación, los artículos técnicos y los módulos de contacto, ayudando a los clientes a obtener información, conocer productos y enviar consultas con mayor eficiencia.",
      fr:
        "Cette mise à niveau optimisera la structure de la page d’accueil, le centre produits, les domaines d’application, les articles techniques et les modules de contact, afin d’aider les clients à accéder plus efficacement aux informations, comprendre les produits et envoyer des demandes.",
      ko:
        "이번 업그레이드는 홈페이지 정보 구조, 제품 센터, 응용 분야, 기술 문서 및 문의 모듈을 최적화하여 고객이 자료를 확인하고 제품을 이해하며 문의를 제출하는 효율을 높입니다.",
      ru:
        "Обновление оптимизирует структуру главной страницы, центр продукции, области применения, технические статьи и контактные модули, помогая клиентам быстрее получать информацию, понимать продукты и отправлять запросы.",
    }, // 中间公告描述
    href: {
      "zh-CN": "/news",
      en: "/en/news",
      es: "/es/news",
      fr: "/fr/news",
      ko: "/ko/news",
      ru: "/ru/news",
    }, // 中间公告链接
  } satisfies HomeNewsItem, // 限定 highlightNews 必须符合 HomeNewsItem 类型

  /* ================================
     右侧新闻列表
  ================================ */

  newsList: [
    {
      key: "pump-valve-sensor-fluidic-system", // 第一条新闻 key
      categoryKey: "knowledge", // 第一条新闻分类 key
      categoryLabel: {
        "zh-CN": "知识分享",
        en: "Knowledge Sharing",
        es: "Recursos técnicos",
        fr: "Partage de connaissances",
        ko: "기술 자료",
        ru: "Технические материалы",
      }, // 第一条新闻分类文字
      date: "2026/05/16", // 第一条新闻日期
      image: "/images/home/news/news-side-01.webp", // 第一条新闻缩略图
      title: {
        "zh-CN": "微流体液路系统中泵阀传感器如何协同工作？",
        en: "How do pumps, valves, and sensors work together in a microfluidic system?",
        es: "¿Cómo trabajan juntos bombas, válvulas y sensores en un sistema microfluídico?",
        fr: "Comment les pompes, vannes et capteurs fonctionnent-ils ensemble dans un système microfluidique ?",
        ko: "마이크로플루이딕 시스템에서 펌프, 밸브, 센서는 어떻게 함께 작동할까요?",
        ru: "Как насосы, клапаны и датчики работают вместе в микрофлюидной системе?",
      }, // 第一条新闻标题
      description: {
        "zh-CN":
          "从样本处理、试剂分配、清洗废液和多通道切换场景，理解核心部件的系统价值。",
        en:
          "Understand the system value of core components through sample processing, reagent dispensing, washing, waste handling, and multi-channel switching scenarios.",
        es:
          "Comprenda el valor sistémico de los componentes clave en escenarios de procesamiento de muestras, distribución de reactivos, lavado, manejo de residuos y conmutación multicanal.",
        fr:
          "Comprendre la valeur système des composants clés à travers le traitement des échantillons, la distribution de réactifs, le lavage, la gestion des déchets et la commutation multicanal.",
        ko:
          "시료 처리, 시약 분주, 세척, 폐액 처리 및 다채널 전환 시나리오를 통해 핵심 부품의 시스템 가치를 이해합니다.",
        ru:
          "Понять системную ценность ключевых компонентов через обработку образцов, дозирование реагентов, промывку, удаление отходов и многоканальное переключение.",
      }, // 第一条新闻描述
      href: {
        "zh-CN": "/news",
        en: "/en/news",
        es: "/es/news",
        fr: "/fr/news",
        ko: "/ko/news",
        ru: "/ru/news",
      }, // 第一条新闻链接
    },
    {
      key: "diaphragm-pump-selection", // 第二条新闻 key
      categoryKey: "knowledge", // 第二条新闻分类 key
      categoryLabel: {
        "zh-CN": "知识分享",
        en: "Knowledge Sharing",
        es: "Recursos técnicos",
        fr: "Partage de connaissances",
        ko: "기술 자료",
        ru: "Технические материалы",
      }, // 第二条新闻分类文字
      date: "2026/05/15", // 第二条新闻日期
      image: "/images/home/news/news-side-02.webp", // 第二条新闻缩略图
      title: {
        "zh-CN": "如何为自动化分析仪器选择合适的隔膜泵？",
        en: "How to select a suitable diaphragm pump for automated analytical instruments?",
        es: "¿Cómo seleccionar una bomba de diafragma adecuada para instrumentos analíticos automatizados?",
        fr: "Comment choisir une pompe à membrane adaptée aux instruments d’analyse automatisés ?",
        ko: "자동화 분석 장비에 적합한 다이어프램 펌프는 어떻게 선택할까요?",
        ru: "Как выбрать подходящий мембранный насос для автоматизированных аналитических приборов?",
      }, // 第二条新闻标题
      description: {
        "zh-CN":
          "围绕流量、压力、寿命、介质兼容性和噪音等因素，梳理常见选型维度。",
        en:
          "Review common selection factors such as flow rate, pressure, lifetime, media compatibility, and noise.",
        es:
          "Revise factores comunes de selección como caudal, presión, vida útil, compatibilidad de medios y ruido.",
        fr:
          "Passer en revue les critères de sélection courants tels que le débit, la pression, la durée de vie, la compatibilité des fluides et le bruit.",
        ko:
          "유량, 압력, 수명, 매체 호환성 및 소음 등 일반적인 선정 요소를 정리합니다.",
        ru:
          "Обзор ключевых факторов выбора: расход, давление, срок службы, совместимость сред и уровень шума.",
      }, // 第二条新闻描述
      href: {
        "zh-CN": "/news",
        en: "/en/news",
        es: "/es/news",
        fr: "/fr/news",
        ko: "/ko/news",
        ru: "/ru/news",
      }, // 第二条新闻链接
    },
    {
      key: "high-pressure-rotary-valve-selection", // 第三条新闻 key
      categoryKey: "knowledge", // 第三条新闻分类 key
      categoryLabel: {
        "zh-CN": "知识分享",
        en: "Knowledge Sharing",
        es: "Recursos técnicos",
        fr: "Partage de connaissances",
        ko: "기술 자료",
        ru: "Технические материалы",
      }, // 第三条新闻分类文字
      date: "2026/05/14", // 第三条新闻日期
      image: "/images/home/news/news-side-03.webp", // 第三条新闻缩略图
      title: {
        "zh-CN": "高压流体控制场景下旋转阀的关键选型因素",
        en: "Key selection factors for rotary valves in high-pressure fluid control",
        es: "Factores clave para seleccionar válvulas rotativas en control de fluidos de alta presión",
        fr: "Facteurs clés de sélection des vannes rotatives pour le contrôle des fluides haute pression",
        ko: "고압 유체 제어에서 로터리 밸브 선정의 핵심 요소",
        ru: "Ключевые факторы выбора поворотных клапанов для управления жидкостями высокого давления",
      }, // 第三条新闻标题
      description: {
        "zh-CN":
          "关注耐压、内腔体积、接口形式、通道数量与长期稳定性，辅助系统方案判断。",
        en:
          "Focus on pressure rating, internal volume, interface type, number of ports, and long-term stability to support system-level decisions.",
        es:
          "Considere presión nominal, volumen interno, tipo de interfaz, número de canales y estabilidad a largo plazo para apoyar decisiones de sistema.",
        fr:
          "Examiner la tenue en pression, le volume interne, le type d’interface, le nombre de voies et la stabilité à long terme pour guider les décisions système.",
        ko:
          "내압, 내부 체적, 인터페이스 형식, 포트 수 및 장기 안정성을 고려하여 시스템方案 판단을 지원합니다.",
        ru:
          "Учитывайте рабочее давление, внутренний объем, тип интерфейса, количество каналов и долговременную стабильность для выбора системного решения.",
      }, // 第三条新闻描述
      href: {
        "zh-CN": "/news",
        en: "/en/news",
        es: "/es/news",
        fr: "/fr/news",
        ko: "/ko/news",
        ru: "/ru/news",
      }, // 第三条新闻链接
    },
    {
      key: "fittings-fluidic-system-stability", // 第四条新闻 key
      categoryKey: "knowledge", // 第四条新闻分类 key
      categoryLabel: {
        "zh-CN": "知识分享",
        en: "Knowledge Sharing",
        es: "Recursos técnicos",
        fr: "Partage de connaissances",
        ko: "기술 자료",
        ru: "Технические материалы",
      }, // 第四条新闻分类文字
      date: "2026/05/13", // 第四条新闻日期
      image: "/images/home/news/news-side-04.webp", // 第四条新闻缩略图
      title: {
        "zh-CN": "管路连接件在微流体系统稳定性中的作用",
        en: "The role of fittings in microfluidic system stability",
        es: "El papel de los conectores en la estabilidad de sistemas microfluídicos",
        fr: "Le rôle des raccords dans la stabilité des systèmes microfluidiques",
        ko: "마이크로플루이딕 시스템 안정성에서 피팅의 역할",
        ru: "Роль фитингов в стабильности микрофлюидных систем",
      }, // 第四条新闻标题
      description: {
        "zh-CN":
          "从密封、死体积、材料兼容性和安装一致性等角度，理解连接件对整机液路可靠性的影响。",
        en:
          "Understand how sealing, dead volume, material compatibility, and installation consistency affect overall fluidic reliability.",
        es:
          "Comprenda cómo el sellado, el volumen muerto, la compatibilidad de materiales y la consistencia de instalación afectan la fiabilidad fluídica.",
        fr:
          "Comprendre comment l’étanchéité, le volume mort, la compatibilité des matériaux et la constance d’installation influencent la fiabilité fluidique.",
        ko:
          "밀봉, 데드 볼륨, 재료 호환성 및 설치 일관성이 전체 유체 신뢰성에 미치는 영향을 이해합니다.",
        ru:
          "Понять, как герметичность, мертвый объем, совместимость материалов и стабильность монтажа влияют на надежность жидкостной системы.",
      }, // 第四条新闻描述
      href: {
        "zh-CN": "/news",
        en: "/en/news",
        es: "/es/news",
        fr: "/fr/news",
        ko: "/ko/news",
        ru: "/ru/news",
      }, // 第四条新闻链接
    },
  ] satisfies HomeNewsItem[], // 限定 newsList 必须符合 HomeNewsItem 数组类型
}; // 首页资讯中心数据结束

/* ================================
   多语言文本读取函数
================================ */

export function getHomeNewsText(text: HomeNewsText, locale: LocaleCode) {
  return text[locale] || text["zh-CN"] || text.en || ""; // 优先读取当前语言，没有则回退中文，再回退英文，最后返回空字符串
}

/* ================================
   多语言链接读取函数
================================ */

export function getHomeNewsHref(href: HomeNewsHref, locale: LocaleCode) {
  return href[locale] || href["zh-CN"] || href.en || "/news"; // 优先读取当前语言链接，没有则回退中文，再回退英文，最后回到 /news
}