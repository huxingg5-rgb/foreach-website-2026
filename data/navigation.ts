/* ================================
   navigation.ts
   官网顶部导航数据配置文件

   说明：
   1. 这个文件只负责存放导航数据，不负责写样式
   2. SiteHeader.tsx 只负责读取这里的数据并渲染导航和下拉栏
   3. app/globals.css 负责控制 Top 栏、Mega Menu、移动端菜单等样式
   4. 后续如果接后端 / CMS，可以让后端返回同样的数据结构

   当前 Mega Menu 支持：
   - 左侧分类
   - 右侧按 categoryKey 对应分类显示内容
   - 图片
   - 标题
   - 简短说明
   - 底部入口按钮
   - 中文、英文、西班牙语、法语、韩语、俄语

   当前已规划的下拉栏：
   - 产品中心：展示产品分类、产品图片、产品名称和简短说明
   - 应用领域：展示应用分类和应用说明
   - 资源中心：展示资料、目录、选型指南、技术文章、新闻动态等入口
   - 关于我们：展示公司介绍、研发制造、质量资质、发展历程、企业文化

   手机端说明：
   - 手机端菜单会优先复用 PC 端导航数据
   - 产品、应用、资源、关于我们等栏目尽量从同一份数据生成
   - 避免 PC 端和移动端重复维护两套导航内容
================================ */

/* ================================
   多语言文本类型
================================ */

export type LocalizedText = {
  "zh-CN": string; // 简体中文
  en: string; // 英文
  es?: string; // 西班牙语
  fr?: string; // 法语
  ko?: string; // 韩语
  ru?: string; // 俄语
  [locale: string]: string | undefined; // 允许后续扩展更多语言
};

/* ================================
   多语言链接类型
================================ */

export type LocalizedHref = {
  "zh-CN": string; // 中文路径
  en: string; // 英文路径
  es?: string; // 西班牙语路径
  fr?: string; // 法语路径
  ko?: string; // 韩语路径
  ru?: string; // 俄语路径
  [locale: string]: string | undefined; // 允许后续扩展更多语言路径
};

/* ================================
   一级导航 key 类型
================================ */

export type NavigationKey =
  | "home"
  | "products"
  | "applications"
  | "resources"
  | "about"
  | "contact";

/* ================================
   下拉菜单类型
================================ */

export type DropdownType = "none" | "mega";

/* ================================
   导航图片类型

   说明：
   1. 图片放在 public 目录下时，代码里不要写 public
   2. 例如：
      public/images/products/pumps/syringe-pump.jpg
      代码里写：
      /images/products/pumps/syringe-pump.jpg
================================ */

export type NavigationImage = {
  src: string; // 图片路径
  alt: LocalizedText; // 图片 alt，用于 SEO / GEO / 无障碍识别
  title?: LocalizedText; // 图片下方产品名称
  description?: LocalizedText; // 图片下方产品说明
  width?: number; // 图片原始宽度
  height?: number; // 图片原始高度
};

/* ================================
   手机端二级导航类型
================================ */

export type MobileNavChild = {
  key: string; // 手机端二级菜单唯一 key
  label: LocalizedText; // 手机端显示名称
  href: LocalizedHref; // 手机端跳转路径
  order: number; // 排序
  enabled: boolean; // 是否启用
};

/* ================================
   Mega 菜单左侧分类类型
================================ */

export type MegaCategoryItem = {
  key: string; // 分类 key，例如 pumps
  title: LocalizedText; // 分类标题
  description: LocalizedText; // 分类说明
  order: number; // 排序
  enabled: boolean; // 是否启用
};

/* ================================
   Mega 菜单右侧卡片类型
================================ */

export type MegaCardItem = {
  key: string; // 卡片 key
  categoryKey?: string; // 对应左侧分类 key
  title: LocalizedText; // 卡片标题
  description: LocalizedText; // 卡片说明
  image?: NavigationImage; // 单张图片，兼容旧结构
  images?: NavigationImage[]; // 多张产品图片
  href: LocalizedHref; // 点击路径
  order: number; // 排序
  enabled: boolean; // 是否启用
};

/* ================================
   Mega 下拉菜单完整类型
================================ */

export type MegaDropdown = {
  heading: LocalizedText; // Mega 菜单标题
  description: LocalizedText; // Mega 菜单说明
  categories: MegaCategoryItem[]; // 左侧分类
  cards: MegaCardItem[]; // 右侧卡片
  footerText: LocalizedText; // 底部说明
  footerLinkLabel: LocalizedText; // 底部链接文字
  footerHref: LocalizedHref; // 底部链接路径
};

/* ================================
   一级导航类型
================================ */

export type NavigationItem = {
  key: NavigationKey; // 一级导航 key
  label: LocalizedText; // 一级导航显示名称
  href: LocalizedHref; // 一级导航链接
  order: number; // 排序
  enabled: boolean; // 是否启用
  dropdownType: DropdownType; // 是否有下拉
  megaDropdown?: MegaDropdown; // Mega 下拉数据
  mobileChildren?: MobileNavChild[]; // 手机端二级导航
};

/* ================================
   多语言文本辅助函数

   说明：
   1. 为了避免每次都写完整对象，这里用 t() 函数统一生成多语言对象
   2. 参数顺序固定为：
      中文、英文、西班牙语、法语、韩语、俄语
================================ */

function t(
  zhCN: string,
  en: string,
  es: string,
  fr: string,
  ko: string,
  ru: string
): LocalizedText {
  return {
    "zh-CN": zhCN,
    en,
    es,
    fr,
    ko,
    ru,
  };
}

/* ================================
   多语言路径辅助函数

   说明：
   1. 中文默认根路径 /
   2. 英文 /en
   3. 西班牙语 /es
   4. 法语 /fr
   5. 韩语 /ko
   6. 俄语 /ru
================================ */

function localizedPath(path: string): LocalizedHref {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  return {
    "zh-CN": normalizedPath,
    en: `/en${normalizedPath === "/" ? "" : normalizedPath}`,
    es: `/es${normalizedPath === "/" ? "" : normalizedPath}`,
    fr: `/fr${normalizedPath === "/" ? "" : normalizedPath}`,
    ko: `/ko${normalizedPath === "/" ? "" : normalizedPath}`,
    ru: `/ru${normalizedPath === "/" ? "" : normalizedPath}`,
  };
}

/* ================================
   首页锚点路径辅助函数

   说明：
   1. 当前第一阶段官网很多栏目还在首页内
   2. 所以先使用 /#products 这种锚点路径
   3. 后续产品中心独立页面做好后，可以改成 /products
================================ */

function anchorPath(anchor: string): LocalizedHref {
  return {
    "zh-CN": `/#${anchor}`,
    en: `/en#${anchor}`,
    es: `/es#${anchor}`,
    fr: `/fr#${anchor}`,
    ko: `/ko#${anchor}`,
    ru: `/ru#${anchor}`,
  };
}

/* ================================
   产品图片辅助函数

   说明：
   1. 用这个函数减少重复代码
   2. title 用于图片下方产品名称
   3. description 用于图片下方产品说明
   4. alt 用于图片 SEO / GEO 识别
================================ */

function productImage(
  src: string,
  title: LocalizedText,
  description: LocalizedText
): NavigationImage {
  return {
    src,
    alt: title,
    title,
    description,
    width: 600,
    height: 380,
  };
}

/* ================================
   产品中心 Mega 下拉菜单数据
================================ */

const productMegaDropdown: MegaDropdown = {
  heading: t(
    "产品中心",
    "Product Center",
    "Centro de productos",
    "Centre de produits",
    "제품 센터",
    "Центр продуктов"
  ),

  description: t(
    "覆盖泵、阀、管路、连接件、采样针和传感器等微流体系统核心零部件。",
    "Core microfluidic components including pumps, valves, tubing, fittings, probes, and sensors.",
    "Componentes microfluídicos clave, incluidas bombas, válvulas, tubos, conectores, sondas y sensores.",
    "Composants microfluidiques clés, notamment pompes, vannes, tubes, raccords, sondes et capteurs.",
    "펌프, 밸브, 튜빙, 피팅, 프로브 및 센서를 포함한 핵심 미세유체 부품.",
    "Ключевые микрофлюидные компоненты, включая насосы, клапаны, трубки, фитинги, зонды и датчики."
  ),

  categories: [
    {
      key: "pumps",
      title: t("泵类", "Pumps", "Bombas", "Pompes", "펌프", "Насосы"),
      description: t(
        "精密定量、连续供液、自动移液与稳定输送",
        "Precision metering, continuous supply, automated pipetting, and stable transfer",
        "Dosificación precisa, suministro continuo, pipeteo automatizado y transferencia estable",
        "Dosage précis, alimentation continue, pipetage automatisé et transfert stable",
        "정밀 정량, 연속 공급, 자동 피펫팅 및 안정적인 이송",
        "Точное дозирование, непрерывная подача, автоматическое пипетирование и стабильная передача"
      ),
      order: 1,
      enabled: true,
    },
    {
      key: "valves",
      title: t("阀类", "Valves", "Válvulas", "Vannes", "밸브", "Клапаны"),
      description: t(
        "流路通断、夹管控制与多通道切换",
        "On/off control, tubing shutoff, and multi-channel switching",
        "Control de apertura/cierre, cierre de tubos y conmutación multicanal",
        "Commande marche/arrêt, fermeture de tubes et commutation multicanal",
        "온오프 제어, 튜빙 차단 및 다중 채널 전환",
        "Управление вкл./выкл., перекрытие трубок и многоканальное переключение"
      ),
      order: 2,
      enabled: true,
    },
    {
      key: "tubing",
      title: t("管路", "Tubing", "Tubos", "Tubes", "튜빙", "Трубки"),
      description: t(
        "多材料软管、硬管与透明液路管线",
        "Multi-material flexible tubing, rigid tubing, and transparent fluid lines",
        "Tubos flexibles multimaterial, tubos rígidos y líneas de fluido transparentes",
        "Tubes souples multi-matériaux, tubes rigides et lignes fluidiques transparentes",
        "다중 소재 플렉시블 튜빙, 리지드 튜빙 및 투명 유체 라인",
        "Многоматериальные гибкие трубки, жесткие трубки и прозрачные жидкостные линии"
      ),
      order: 3,
      enabled: true,
    },
    {
      key: "fittings",
      title: t("连接件", "Fittings", "Conectores", "Raccords", "피팅", "Фитинги"),
      description: t(
        "软管接头、硬管接头、鲁尔接头、快插连接与定制管路组件",
        "Tubing connectors, rigid tubing fittings, luer fittings, quick connectors, and custom tubing assemblies",
        "Conectores para tubos, racores para tubos rígidos, racores Luer, conectores rápidos y conjuntos de tubos personalizados",
        "Connecteurs pour tubes, raccords pour tubes rigides, raccords Luer, connecteurs rapides et assemblages de tubes personnalisés",
        "튜빙 커넥터, 리지드 튜빙 피팅, 루어 피팅, 퀵 커넥터 및 맞춤형 튜빙 어셈블리",
        "Соединители для трубок, фитинги для жестких трубок, фитинги Luer, быстроразъемные соединители и индивидуальные трубные сборки"
      ),
      order: 4,
      enabled: true,
    },
    {
      key: "probes",
      title: t("采样针", "Probes", "Sondas", "Sondes", "프로브", "Зонды"),
      description: t(
        "样本针、清洗针、穿刺针、搅拌针与定制针组件",
        "Sampling probes, rinsing probes, puncturing probes, stirrers, and custom probe assemblies",
        "Sondas de muestreo, sondas de enjuague, sondas de perforación, agitadores y conjuntos de sondas personalizados",
        "Sondes d’échantillonnage, sondes de rinçage, sondes de perçage, agitateurs et assemblages de sondes personnalisés",
        "샘플링 프로브, 린싱 프로브, 피어싱 프로브, 교반기 및 맞춤형 프로브 어셈블리",
        "Пробоотборные зонды, промывочные зонды, прокалывающие зонды, мешалки и индивидуальные узлы зондов"
      ),
      order: 5,
      enabled: true,
    },
    {
      key: "sensors",
      title: t("传感器", "Sensors", "Sensores", "Capteurs", "센서", "Датчики"),
      description: t(
        "液路压力监测、状态检测与系统保护",
        "Fluid pressure monitoring, status detection, and system protection",
        "Monitoreo de presión de fluido, detección de estado y protección del sistema",
        "Surveillance de la pression fluidique, détection d’état et protection du système",
        "유체 압력 모니터링, 상태 감지 및 시스템 보호",
        "Мониторинг давления жидкости, контроль состояния и защита системы"
      ),
      order: 6,
      enabled: true,
    },
  ],

  cards: [
    {
      key: "pumps-card",
      categoryKey: "pumps",
      title: t("泵类产品", "Pumps", "Bombas", "Pompes", "펌프", "Насосы"),
      description: t(
        "定量、供液、移液与废液处理",
        "Metering, supply, pipetting, and waste handling",
        "Dosificación, suministro, pipeteo y gestión de residuos",
        "Dosage, alimentation, pipetage et gestion des déchets",
        "정량, 공급, 피펫팅 및 폐액 처리",
        "Дозирование, подача, пипетирование и обращение с отходами"
      ),
      href: anchorPath("products"),
      images: [
        productImage(
          "/images/products/pumps/syringe-pump.jpg",
          t("注射泵", "Syringe Pump", "Bomba de jeringa", "Pompe seringue", "시린지 펌프", "Шприцевой насос"),
          t("μL–mL 级高精度定量分配", "High-precision μL–mL dispensing", "Dosificación precisa de μL a mL", "Distribution précise de μL à mL", "μL–mL 고정밀 분주", "Высокоточное дозирование от μL до mL")
        ),
        productImage(
          "/images/products/pumps/diaphragm-pump.jpg",
          t("隔膜泵", "Diaphragm Pump", "Bomba de diafragma", "Pompe à membrane", "다이어프램 펌프", "Мембранный насос"),
          t("连续供液、清洗与废液处理", "Continuous supply, washing, and waste handling", "Suministro continuo, lavado y gestión de residuos", "Alimentation continue, lavage et gestion des déchets", "연속 공급, 세척 및 폐액 처리", "Непрерывная подача, промывка и обработка отходов")
        ),
        productImage(
          "/images/products/pumps/pipetting-pump.jpg",
          t("移液泵", "Pipetting Pump", "Bomba de pipeteo", "Pompe de pipetage", "피펫팅 펌프", "Пипеточный насос"),
          t("自动化移液、加样与分液", "Automated pipetting and dispensing", "Pipeteo y dispensación automatizados", "Pipetage et distribution automatisés", "자동 피펫팅 및 분주", "Автоматическое пипетирование и дозирование")
        ),
        productImage(
          "/images/products/pumps/piston-pump.jpg",
          t("柱塞泵", "Piston Pump", "Bomba de pistón", "Pompe à piston", "피스톤 펌프", "Поршневой насос"),
          t("稳定计量与重复性液体输送", "Stable metering and repeatable transfer", "Medición estable y transferencia repetible", "Dosage stable et transfert répétable", "안정적인 계량 및 반복 이송", "Стабильное дозирование и повторяемая передача жидкости")
        ),
        productImage(
          "/images/products/pumps/rotary-pump.jpg",
          t("旋转泵", "Rotary Pump", "Bomba rotativa", "Pompe rotative", "로터리 펌프", "Роторный насос"),
          t("多通道液路切换与定量输送", "Multi-channel switching and metering", "Conmutación multicanal y dosificación", "Commutation multicanal et dosage", "다중 채널 전환 및 계량", "Многоканальное переключение и дозирование")
        ),
      ],
      order: 1,
      enabled: true,
    },

    {
      key: "valves-card",
      categoryKey: "valves",
      title: t("阀类产品", "Valves", "Válvulas", "Vannes", "밸브", "Клапаны"),
      description: t(
        "流路切换、通断控制与高压控制",
        "Flow path switching, on/off control, and high-pressure control",
        "Conmutación de flujo, control de apertura/cierre y alta presión",
        "Commutation fluidique, commande marche/arrêt et contrôle haute pression",
        "유로 전환, 온오프 제어 및 고압 제어",
        "Переключение потоков, управление вкл./выкл. и высокое давление"
      ),
      href: anchorPath("products"),
      images: [
        productImage(
          "/images/products/VALVE/Solenoid valve_200x200_01_v001.jpg",
          t("电磁阀", "Solenoid Valve", "Válvula solenoide", "Électrovanne", "솔레노이드 밸브", "Соленоидный клапан"),
          t("流路通断控制与精密切换", "On/off control and precise flow switching", "Control de apertura/cierre y conmutación precisa", "Commande marche/arrêt et commutation précise", "유로 온오프 제어 및 정밀 전환", "Управление вкл./выкл. и точное переключение потока")
        ),
        productImage(
          "/images/products/VALVE/Pinch valve_200x200_01_v001.jpg",
          t("夹管阀", "Pinch Valve", "Válvula de pinza", "Vanne à pincement", "핀치 밸브", "Пережимной клапан"),
          t("零死体积，适合软管液路控制", "Zero-dead-volume control for flexible tubing", "Control sin volumen muerto para tubos flexibles", "Contrôle sans volume mort pour tubes souples", "플렉시블 튜빙용 무사각 체적 제어", "Управление гибкими трубками без мертвого объема")
        ),
        productImage(
          "/images/products/VALVE/Rotary valve_200x200_01_v001.jpg",
          t("旋转阀", "Rotary Valve", "Válvula rotativa", "Vanne rotative", "로터리 밸브", "Роторный клапан"),
          t("多通道流路选择与切换", "Multi-port flow path selection and switching", "Selección y conmutación de rutas multicanal", "Sélection et commutation de voies multicanaux", "다중 포트 유로 선택 및 전환", "Выбор и переключение многоканальных потоков")
        ),
      ],
      order: 2,
      enabled: true,
    },

    {
      key: "tubing-card",
      categoryKey: "tubing",
      title: t("管路产品", "Tubing", "Tubos", "Tubes", "튜빙", "Трубки"),
      description: t("软管、硬管与液路管线", "Flexible tubing, rigid tubing, and fluid lines", "Tubos flexibles, tubos rígidos y líneas de fluido", "Tubes souples, tubes rigides et lignes fluidiques", "플렉시블 튜빙, 리지드 튜빙 및 유체 라인", "Гибкие трубки, жесткие трубки и жидкостные линии"),
      href: anchorPath("products"),
      images: [
        productImage("/images/products/TUBING/ETFE_200x200_01_v001.JPG", t("ETFE 管", "ETFE Tubing", "Tubo ETFE", "Tube ETFE", "ETFE 튜빙", "Трубка ETFE"), t("耐化学腐蚀，适合精密液路", "Chemical-resistant tubing for precision fluidics", "Tubo resistente a químicos para fluidos de precisión", "Tube résistant aux produits chimiques pour fluidique de précision", "정밀 유체용 내화학 튜빙", "Химически стойкая трубка для точной флюидики")),
        productImage("/images/products/TUBING/FEP_200x200_01_v001.JPG", t("FEP 管", "FEP Tubing", "Tubo FEP", "Tube FEP", "FEP 튜빙", "Трубка FEP"), t("透明度高，适合可视化液路", "High transparency for visual fluid lines", "Alta transparencia para líneas de fluido visibles", "Haute transparence pour lignes fluidiques visibles", "시각 유로용 고투명 튜빙", "Высокая прозрачность для визуальных жидкостных линий")),
        productImage("/images/products/TUBING/PEEK_200x200_01_v001.JPG", t("PEEK 管", "PEEK Tubing", "Tubo PEEK", "Tube PEEK", "PEEK 튜빙", "Трубка PEEK"), t("高强度，适合高性能流体系统", "High-strength tubing for demanding fluidic systems", "Tubo de alta resistencia para sistemas fluidos exigentes", "Tube haute résistance pour systèmes fluidiques exigeants", "고성능 유체 시스템용 고강도 튜빙", "Высокопрочная трубка для сложных жидкостных систем")),
        productImage("/images/products/TUBING/PTFE_200x200_01_v001.JPG", t("PTFE 管", "PTFE Tubing", "Tubo PTFE", "Tube PTFE", "PTFE 튜빙", "Трубка PTFE"), t("耐腐蚀，适合多种试剂输送", "Corrosion-resistant tubing for reagent transfer", "Tubo resistente a la corrosión para transferencia de reactivos", "Tube anticorrosion pour transfert de réactifs", "시약 이송용 내식성 튜빙", "Коррозионностойкая трубка для подачи реагентов")),
        productImage("/images/products/TUBING/PU_200x200_01_v001.JPG", t("PU 管", "PU Tubing", "Tubo PU", "Tube PU", "PU 튜빙", "Трубка PU"), t("柔韧性好，适合通用液路", "Flexible tubing for general fluidic use", "Tubo flexible para uso fluidico general", "Tube flexible pour usage fluidique général", "일반 유체용 플렉시블 튜빙", "Гибкая трубка для общего применения")),
        productImage("/images/products/TUBING/PVC_200x200_01_v001.JPG", t("PVC 管", "PVC Tubing", "Tubo PVC", "Tube PVC", "PVC 튜빙", "Трубка PVC"), t("适合体外诊断与实验室液路", "Tubing for IVD and laboratory fluidics", "Tubo para IVD y fluidos de laboratorio", "Tube pour IVD et fluidique de laboratoire", "IVD 및 실험실 유체용 튜빙", "Трубка для IVD и лабораторной флюидики")),
        productImage("/images/products/TUBING/TPU_200x200_01_v001.JPG", t("TPU 管", "TPU Tubing", "Tubo TPU", "Tube TPU", "TPU 튜빙", "Трубка TPU"), t("柔韧耐用，适合动态液路", "Durable flexible tubing for dynamic fluid paths", "Tubo flexible y duradero para rutas fluidas dinámicas", "Tube flexible durable pour circuits fluidiques dynamiques", "동적 유로용 내구성 플렉시블 튜빙", "Прочная гибкая трубка для динамических жидкостных линий")),
      ],
      order: 3,
      enabled: true,
    },

    {
      key: "fittings-card",
      categoryKey: "fittings",
      title: t("连接件与管路组件", "Fittings & Tubing Assemblies", "Conectores y conjuntos de tubos", "Raccords et assemblages de tubes", "피팅 및 튜빙 어셈블리", "Фитинги и трубные сборки"),
      description: t("接头、转接件、快插连接与定制管路组件", "Connectors, adapters, quick connectors, and custom tubing assemblies", "Conectores, adaptadores, conectores rápidos y conjuntos de tubos personalizados", "Connecteurs, adaptateurs, connecteurs rapides et assemblages de tubes personnalisés", "커넥터, 어댑터, 퀵 커넥터 및 맞춤형 튜빙 어셈블리", "Соединители, адаптеры, быстроразъемные соединители и индивидуальные трубные сборки"),
      href: anchorPath("products"),
      images: [
        productImage("/images/products/FIT/Barbed connector_200x200_01_v001.jpg", t("倒钩接头", "Barbed Connector", "Conector de espiga", "Connecteur cannelé", "바브 커넥터", "Штуцерный соединитель"), t("用于软管连接与低压液路装配", "For flexible tubing connection and low-pressure fluid paths", "Para conexión de tubos flexibles y líneas de baja presión", "Pour connexion de tubes souples et circuits basse pression", "플렉시블 튜빙 연결 및 저압 유로용", "Для соединения гибких трубок и низкого давления")),
        productImage("/images/products/FIT/Filter - Check valve_200x200_01_v001.jpg", t("过滤止回阀", "Filter & Check Valve", "Filtro y válvula de retención", "Filtre et clapet anti-retour", "필터 및 체크 밸브", "Фильтр и обратный клапан"), t("集成过滤与单向止回功能", "Integrated filtration and check-valve function", "Filtración integrada y función antirretorno", "Filtration intégrée et fonction anti-retour", "필터링 및 역류 방지 기능 통합", "Интегрированная фильтрация и обратный клапан")),
        productImage("/images/products/FIT/For rigid tubing_200x200_01_v001.jpg", t("硬管接头", "Rigid Tubing Fitting", "Racor para tubo rígido", "Raccord pour tube rigide", "리지드 튜빙 피팅", "Фитинг для жесткой трубки"), t("用于硬管连接与精密液路固定", "For rigid tubing connection and precise fluidic assembly", "Para conexión de tubos rígidos y montaje preciso", "Pour connexion de tubes rigides et assemblage fluidique précis", "리지드 튜빙 연결 및 정밀 유체 조립용", "Для соединения жестких трубок и точной сборки")),
        productImage("/images/products/FIT/Luer fitting_200x200_01_v001.jpg", t("鲁尔接头", "Luer Fitting", "Racor Luer", "Raccord Luer", "루어 피팅", "Фитинг Luer"), t("适合标准鲁尔接口连接", "For standard luer interface connection", "Para conexión de interfaz Luer estándar", "Pour connexion d’interface Luer standard", "표준 루어 인터페이스 연결용", "Для стандартного соединения Luer")),
        productImage("/images/products/FIT/Panel mountunion_200x200_01_v001.jpg", t("面板安装接头", "Panel Mount Union", "Unión de montaje en panel", "Union à montage panneau", "패널 마운트 유니온", "Панельный соединитель"), t("用于面板穿墙与管路固定", "For panel-mounted fluidic connection", "Para conexión fluidica montada en panel", "Pour connexion fluidique montée sur panneau", "패널 장착 유체 연결용", "Для панельного жидкостного соединения")),
        productImage("/images/products/FIT/Quick connector_200x200_01_v001.jpg", t("快插接头", "Quick Connector", "Conector rápido", "Connecteur rapide", "퀵 커넥터", "Быстроразъемный соединитель"), t("快速连接与拆卸，提高装配效率", "Quick connection and disconnection for efficient assembly", "Conexión y desconexión rápidas para montaje eficiente", "Connexion et déconnexion rapides pour assemblage efficace", "효율적인 조립을 위한 빠른 연결 및 분리", "Быстрое соединение и разъединение для эффективной сборки")),
        productImage("/images/products/FIT/Thread with barb_200x200_01_v001.jpg", t("螺纹倒钩接头", "Thread with Barb", "Rosca con espiga", "Filetage avec cannelure", "나사형 바브", "Резьба со штуцером"), t("螺纹固定与软管连接结合", "Combines threaded mounting with barb connection", "Combina montaje roscado con conexión de espiga", "Combine montage fileté et connexion cannelée", "나사 고정과 바브 연결 결합", "Сочетает резьбовое крепление и штуцерное соединение")),
        productImage("/images/products/FIT/Union_200x200_01_v001.jpg", t("直通接头", "Union Fitting", "Racor recto", "Raccord union", "유니온 피팅", "Прямой соединитель"), t("用于管路延长与直通连接", "For tubing extension and straight-through connection", "Para extensión de tubos y conexión directa", "Pour prolongement de tube et connexion directe", "튜빙 연장 및 직선 연결용", "Для удлинения трубок и прямого соединения")),
      ],
      order: 4,
      enabled: true,
    },

    {
      key: "probes-card",
      categoryKey: "probes",
      title: t("采样针与定制针组件", "Probes & Custom Probe Assemblies", "Sondas y conjuntos personalizados", "Sondes et assemblages personnalisés", "프로브 및 맞춤형 프로브 어셈블리", "Зонды и индивидуальные узлы зондов"),
      description: t("样本针、清洗针、穿刺针、搅拌针与定制针组件", "Sampling probes, rinsing probes, puncturing probes, stirrers, and custom probe assemblies", "Sondas de muestreo, sondas de enjuague, sondas de perforación, agitadores y conjuntos de sondas personalizados", "Sondes d’échantillonnage, sondes de rinçage, sondes de perçage, agitateurs et assemblages de sondes personnalisés", "샘플링 프로브, 린싱 프로브, 피어싱 프로브, 교반기 및 맞춤형 프로브 어셈블리", "Пробоотборные зонды, промывочные зонды, прокалывающие зонды, мешалки и индивидуальные узлы зондов"),
      href: anchorPath("products"),
      images: [
        productImage("/images/products/PROBE/Puncturing probe_200x200_01_v001.jpg", t("穿刺针", "Puncturing Probe", "Sonda de perforación", "Sonde de perçage", "피어싱 프로브", "Прокалывающий зонд"), t("用于封膜穿刺与样本处理", "For film puncturing and sample handling", "Para perforación de film y manejo de muestras", "Pour perçage de film et traitement d’échantillons", "필름 천공 및 샘플 처리용", "Для прокалывания пленки и обработки образцов")),
        productImage("/images/products/PROBE/Rinsing probe_200x200_01_v001.jpg", t("清洗针", "Rinsing Probe", "Sonda de enjuague", "Sonde de rinçage", "린싱 프로브", "Промывочный зонд"), t("用于清洗、冲洗与液路维护", "For washing, rinsing, and fluid path maintenance", "Para lavado, enjuague y mantenimiento de rutas fluidas", "Pour lavage, rinçage et maintenance des circuits fluidiques", "세척, 린싱 및 유로 유지보수용", "Для промывки, ополаскивания и обслуживания жидкостных линий")),
        productImage("/images/products/PROBE/Sampling probe_200x200_01_v001.jpg", t("采样针", "Sampling Probe", "Sonda de muestreo", "Sonde d’échantillonnage", "샘플링 프로브", "Пробоотборный зонд"), t("用于样本吸取、转移与加样", "For sample aspiration, transfer, and dispensing", "Para aspiración, transferencia y dispensación de muestras", "Pour aspiration, transfert et distribution d’échantillons", "샘플 흡입, 이송 및 분주용", "Для аспирации, переноса и дозирования образцов")),
        productImage("/images/products/PROBE/Stirrer_200x200_01_v001.jpg", t("搅拌针", "Stirrer", "Agitador", "Agitateur", "교반기", "Мешалка"), t("用于样本混匀与试剂处理", "For sample mixing and reagent handling", "Para mezcla de muestras y manejo de reactivos", "Pour mélange d’échantillons et traitement des réactifs", "샘플 혼합 및 시약 처리용", "Для смешивания образцов и работы с реагентами")),
      ],
      order: 5,
      enabled: true,
    },

    {
      key: "sensors-card",
      categoryKey: "sensors",
      title: t("传感与检测", "Sensors & Detection", "Sensores y detección", "Capteurs et détection", "센서 및 감지", "Датчики и детектирование"),
      description: t("压力、气泡、电导率等液路状态监测", "Pressure, bubble, conductivity, and fluid status monitoring", "Monitoreo de presión, burbujas, conductividad y estado del fluido", "Surveillance de la pression, des bulles, de la conductivité et de l’état fluidique", "압력, 기포, 전도도 및 유체 상태 모니터링", "Мониторинг давления, пузырьков, проводимости и состояния жидкости"),
      href: anchorPath("products"),
      images: [
        productImage(
          "/images/products/Sensor/Pressure sensor_200x200_01_v001.jpg",
          t("压力传感器", "Pressure Sensor", "Sensor de presión", "Capteur de pression", "압력 센서", "Датчик давления"),
          t("用于液路压力监测与系统保护", "For fluid pressure monitoring and system protection", "Para monitoreo de presión de fluido y protección del sistema", "Pour surveillance de la pression fluidique et protection du système", "유체 압력 모니터링 및 시스템 보호용", "Для мониторинга давления жидкости и защиты системы")
        ),
      ],
      order: 6,
      enabled: true,
    },
  ],

  footerText: t(
    "按产品类型、应用场景和系统参数快速了解恒永达产品矩阵。",
    "Explore FOREACH products by product type, application scenario, and system requirements.",
    "Explore los productos FOREACH por tipo, escenario de aplicación y requisitos del sistema.",
    "Découvrez les produits FOREACH par type, application et exigences système.",
    "제품 유형, 적용 분야 및 시스템 요구사항별로 FOREACH 제품을 살펴보세요.",
    "Изучайте продукты FOREACH по типу, применению и системным требованиям."
  ),

  footerLinkLabel: t(
    "查看全部产品 →",
    "View all products →",
    "Ver todos los productos →",
    "Voir tous les produits →",
    "전체 제품 보기 →",
    "Смотреть все продукты →"
  ),

  footerHref: anchorPath("products"),
};

/* ================================
   根据 Mega 分类生成手机端二级导航

   说明：
   1. PC 端产品中心使用 productMegaDropdown.categories
   2. 手机端产品中心使用 mobileChildren
   3. 为了避免 PC 和手机端分类重复维护，这里自动从 Mega 分类生成手机端菜单
   4. 后续只要修改 productMegaDropdown.categories，手机端产品菜单会自动同步
================================ */

function createMobileChildrenFromMegaCategories(
  megaDropdown: MegaDropdown,
  anchor: string,
  keyPrefix: string
): MobileNavChild[] {
  return megaDropdown.categories
    .filter((category) => category.enabled)
    .sort((a, b) => a.order - b.order)
    .map((category) => ({
      key: `${keyPrefix}-${category.key}`,
      label: category.title,
      href: anchorPath(anchor),
      order: category.order,
      enabled: category.enabled,
    }));
}

/* ================================
   官网一级导航数据
================================ */

const navigationItems: NavigationItem[] = [
  {
    key: "home",
    label: t("首页", "Home", "Inicio", "Accueil", "홈", "Главная"),
    href: localizedPath("/"),
    order: 1,
    enabled: true,
    dropdownType: "none",
  },
  {
    key: "products",
    label: t("产品中心", "Products", "Productos", "Produits", "제품", "Продукты"),
    href: anchorPath("products"),
    order: 2,
    enabled: true,
    dropdownType: "mega",
    megaDropdown: productMegaDropdown,
    mobileChildren: createMobileChildrenFromMegaCategories(
      productMegaDropdown,
      "products",
      "mobile-products"
    ),
  },
  {
    key: "applications",
    label: t("应用领域", "Applications", "Aplicaciones", "Applications", "응용 분야", "Применения"),
    href: anchorPath("applications"),
    order: 3,
    enabled: true,
    dropdownType: "none",
    mobileChildren: [
      {
        key: "mobile-application-ivd",
        label: t("IVD 体外诊断", "IVD", "IVD", "IVD", "IVD", "IVD"),
        href: anchorPath("applications"),
        order: 1,
        enabled: true,
      },
      {
        key: "mobile-application-life-science",
        label: t("生命科学", "Life Sciences", "Ciencias de la vida", "Sciences de la vie", "생명과학", "Науки о жизни"),
        href: anchorPath("applications"),
        order: 2,
        enabled: true,
      },
      {
        key: "mobile-application-synthetic-biology",
        label: t("合成生物", "Synthetic Biology", "Biología sintética", "Biologie synthétique", "합성생물학", "Синтетическая биология"),
        href: anchorPath("applications"),
        order: 3,
        enabled: true,
      },
      {
        key: "mobile-application-analytical",
        label: t("高端分析仪器", "Analytical Instruments", "Instrumentos analíticos", "Instruments analytiques", "분석 장비", "Аналитические приборы"),
        href: anchorPath("applications"),
        order: 4,
        enabled: true,
      },
      {
        key: "mobile-application-lab-automation",
        label: t("实验室自动化", "Laboratory Automation", "Automatización de laboratorio", "Automatisation de laboratoire", "실험실 자동화", "Лабораторная автоматизация"),
        href: anchorPath("applications"),
        order: 5,
        enabled: true,
      },
    ],
  },
  {
    key: "resources",
    label: t("资源中心", "Resources", "Recursos", "Ressources", "자료실", "Ресурсы"),
    href: anchorPath("resources"),
    order: 4,
    enabled: true,
    dropdownType: "none",
    mobileChildren: [
      {
        key: "mobile-resource-catalogs",
        label: t("产品目录", "Product Catalogs", "Catálogos de productos", "Catalogues produits", "제품 카탈로그", "Каталоги продуктов"),
        href: anchorPath("resources"),
        order: 1,
        enabled: true,
      },
      {
        key: "mobile-resource-guides",
        label: t("选型指南", "Selection Guides", "Guías de selección", "Guides de sélection", "선정 가이드", "Руководства по выбору"),
        href: anchorPath("resources"),
        order: 2,
        enabled: true,
      },
      {
        key: "mobile-resource-news",
        label: t("技术文章 / 新闻", "Articles / News", "Artículos / Noticias", "Articles / Actualités", "기술 문서 / 뉴스", "Статьи / Новости"),
        href: anchorPath("resources"),
        order: 3,
        enabled: true,
      },
    ],
  },

{
  key: "about",
  label: t(
    "关于我们",
    "About Us",
    "Sobre nosotros",
    "À propos",
    "회사 소개",
    "О нас"
  ),
  href: anchorPath("about"),
  order: 5,
  enabled: true,

  // 说明：
  // 1. 这里改成 mega，PC 端顶部导航才会显示“关于我们”下拉栏
  // 2. 关于我们下拉栏的右侧样式由 app/globals.css 里的 .site-nav-mega-about 控制
  dropdownType: "mega",

  megaDropdown: {
    title: t(
      "关于我们",
      "About Us",
      "Sobre nosotros",
      "À propos",
      "회사 소개",
      "О нас"
    ),

    description: t(
      "了解恒永达的公司定位、研发制造能力、质量体系、发展历程与恒永达文化。",
      "Learn about FOREACH, including our company profile, R&D and manufacturing capabilities, quality system, milestones, and culture.",
      "Conozca FOREACH, incluyendo nuestro perfil corporativo, capacidades de I+D y fabricación, sistema de calidad, hitos y cultura.",
      "Découvrez FOREACH, son profil d’entreprise, ses capacités de R&D et de fabrication, son système qualité, ses jalons et sa culture.",
      "FOREACH의 회사 소개, 연구개발 및 제조 역량, 품질 시스템, 연혁과 기업 문화를 확인하세요.",
      "Узнайте о FOREACH: профиль компании, возможности R&D и производства, система качества, история развития и корпоративная культура."
    ),

    footerText: t(
      "进入关于我们页面，进一步了解恒永达。",
      "Visit the About Us page to learn more about FOREACH.",
      "Visite la página Sobre nosotros para conocer más sobre FOREACH.",
      "Accédez à la page À propos pour en savoir plus sur FOREACH.",
      "회사 소개 페이지에서 FOREACH에 대해 자세히 알아보세요.",
      "Перейдите на страницу «О нас», чтобы узнать больше о FOREACH."
    ),

    footerLinkLabel: t(
      "查看关于恒永达 →",
      "View About FOREACH →",
      "Ver sobre FOREACH →",
      "Voir à propos de FOREACH →",
      "FOREACH 소개 보기 →",
      "Подробнее о FOREACH →"
    ),

    footerHref: anchorPath("about"),

    /* ================================
       PC 端关于我们左侧栏目
       说明：
       1. categories 主要用于左侧栏目
       2. description 尽量短，不要写成长句
       3. 右侧中间长文案从 cards.description 读取
    ================================ */
    categories: [
      {
        key: "about-company",
        title: t(
          "关于恒永达",
          "About FOREACH",
          "Sobre FOREACH",
          "À propos de FOREACH",
          "FOREACH 소개",
          "О FOREACH"
        ),
        description: t(
          "公司定位、服务行业与核心能力",
          "Profile, industries and capabilities",
          "Perfil, sectores y capacidades",
          "Profil, secteurs et capacités",
          "회사 소개와 핵심 역량",
          "Профиль и возможности"
        ),
        order: 1,
        enabled: true,
      },
      {
        key: "rd-manufacturing",
        title: t(
          "研发与制造能力",
          "R&D and Manufacturing",
          "I+D y fabricación",
          "R&D et fabrication",
          "R&D 및 제조 역량",
          "НИОКР и производство"
        ),
        description: t(
          "研发设计、精密制造与系统支持",
          "R&D, manufacturing and support",
          "I+D, fabricación y soporte",
          "R&D, fabrication et support",
          "연구개발, 제조 및 지원",
          "НИОКР, производство и поддержка"
        ),
        order: 2,
        enabled: true,
      },
      {
        key: "quality-qualification",
        title: t(
          "质量体系与企业资质",
          "Quality System and Qualifications",
          "Sistema de calidad y certificaciones",
          "Système qualité et qualifications",
          "품질 시스템 및 인증",
          "Система качества и квалификации"
        ),
        description: t(
          "质量、资质与可靠性保障",
          "Quality, qualifications and reliability",
          "Calidad, certificaciones y fiabilidad",
          "Qualité, qualifications et fiabilité",
          "품질, 인증 및 신뢰성",
          "Качество, квалификации и надежность"
        ),
        order: 3,
        enabled: true,
      },
      {
        key: "milestones",
        title: t(
          "发展历程",
          "Milestones",
          "Hitos",
          "Jalons",
          "연혁",
          "История развития"
        ),
        description: t(
          "从 2012 年起的关键发展节点",
          "Key milestones since 2012",
          "Hitos clave desde 2012",
          "Jalons clés depuis 2012",
          "2012년부터의 주요 과정",
          "Ключевые этапы с 2012 года"
        ),
        order: 4,
        enabled: true,
      },
      {
        key: "culture",
        title: t(
          "恒永达文化",
          "FOREACH Culture",
          "Cultura de FOREACH",
          "Culture FOREACH",
          "FOREACH 문화",
          "Культура FOREACH"
        ),
        description: t(
          "团队协同、客户价值与长期主义",
          "Teamwork, customer value and long-term commitment",
          "Colaboración, valor al cliente y visión a largo plazo",
          "Collaboration, valeur client et vision à long terme",
          "협업, 고객 가치 및 장기주의",
          "Команда, ценность для клиента и долгосрочный подход"
        ),
        order: 5,
        enabled: true,
      },
    ],

    /* ================================
       PC 端关于我们右侧图片与正式说明
       说明：
       1. 每个 card 通过 categoryKey 对应左侧栏目
       2. image.src 对应 public/images/about/ 下的图片
       3. 后续你只要替换同名图片即可自动适配
    ================================ */
    cards: [
      {
        key: "about-company-image",
        categoryKey: "about-company",
        title: t(
          "关于恒永达",
          "About FOREACH",
          "Sobre FOREACH",
          "À propos de FOREACH",
          "FOREACH 소개",
          "О FOREACH"
        ),
        description: t(
          "专注微流体系统核心零部件与液路解决方案，服务 IVD、生命科学、高端分析仪器、合成生物与实验室自动化客户。",
          "Focused on microfluidic core components and liquid path solutions for IVD, life sciences, analytical instruments, synthetic biology, and laboratory automation.",
          "Componentes microfluídicos y soluciones de fluidos para IVD, ciencias de la vida, instrumentos analíticos, biología sintética y automatización de laboratorio.",
          "Composants microfluidiques et solutions fluidiques pour l’IVD, les sciences de la vie, les instruments analytiques, la biologie synthétique et l’automatisation de laboratoire.",
          "IVD, 생명과학, 분석 장비, 합성생물학 및 실험실 자동화를 위한 미세유체 핵심 부품과 유로 솔루션에 집중합니다.",
          "Микрофлюидные компоненты и решения для IVD, наук о жизни, аналитических приборов, синтетической биологии и лабораторной автоматизации."
        ),
        href: anchorPath("about"),
        order: 1,
        enabled: true,
        image: {
          src: "/images/about/about-company.webp",
          alt: t(
            "恒永达公司形象",
            "FOREACH company profile",
            "Perfil corporativo de FOREACH",
            "Profil de FOREACH",
            "FOREACH 회사 이미지",
            "Профиль компании FOREACH"
          ),
          width: 900,
          height: 520,
        },
      },
      {
        key: "rd-manufacturing-image",
        categoryKey: "rd-manufacturing",
        title: t(
          "研发与制造能力",
          "R&D and Manufacturing",
          "I+D y fabricación",
          "R&D et fabrication",
          "R&D 및 제조 역량",
          "НИОКР и производство"
        ),
        description: t(
          "围绕研发设计、精密制造、装配测试与工程验证，支持客户从产品选型到系统级液路方案落地。",
          "Supporting customers from product selection to system-level liquid path implementation through R&D, precision manufacturing, assembly, testing, and engineering validation.",
          "Soporte desde la selección de productos hasta la implementación de soluciones de fluidos mediante I+D, fabricación de precisión, montaje, pruebas y validación de ingeniería.",
          "Accompagnement du choix produit à l’intégration de solutions fluidiques grâce à la R&D, la fabrication de précision, l’assemblage, les tests et la validation d’ingénierie.",
          "연구개발, 정밀 제조, 조립, 테스트 및 엔지니어링 검증을 통해 제품 선정부터 시스템 유로 구현까지 지원합니다.",
          "Поддержка от подбора изделий до реализации системного жидкостного тракта через НИОКР, точное производство, сборку, испытания и инженерную проверку."
        ),
        href: anchorPath("about"),
        order: 2,
        enabled: true,
        image: {
          src: "/images/about/rd-manufacturing.webp",
          alt: t(
            "恒永达研发与制造能力",
            "FOREACH R&D and manufacturing capability",
            "Capacidad de I+D y fabricación de FOREACH",
            "Capacité R&D et fabrication de FOREACH",
            "FOREACH R&D 및 제조 역량",
            "НИОКР и производственные возможности FOREACH"
          ),
          width: 900,
          height: 520,
        },
      },
      {
        key: "quality-qualification-image",
        categoryKey: "quality-qualification",
        title: t(
          "质量体系与企业资质",
          "Quality System and Qualifications",
          "Sistema de calidad y certificaciones",
          "Système qualité et qualifications",
          "품질 시스템 및 인증",
          "Система качества и квалификации"
        ),
        description: t(
          "以质量管理、过程控制、可靠性验证和企业资质为基础，建立长期稳定、可信赖的供应链形象。",
          "Building long-term supplier trust through quality management, process control, reliability validation, and corporate qualifications.",
          "Construcción de confianza a largo plazo mediante gestión de calidad, control de procesos, validación de fiabilidad y certificaciones corporativas.",
          "Construction d’une confiance durable grâce à la gestion qualité, au contrôle des processus, à la validation de fiabilité et aux qualifications de l’entreprise.",
          "품질 관리, 공정 제어, 신뢰성 검증 및 기업 인증을 기반으로 장기적인 공급 신뢰를 구축합니다.",
          "Формирование долгосрочного доверия к поставщику за счет управления качеством, контроля процессов, проверки надежности и корпоративных квалификаций."
        ),
        href: anchorPath("about"),
        order: 3,
        enabled: true,
        image: {
          src: "/images/about/quality-qualification.webp",
          alt: t(
            "恒永达质量体系与企业资质",
            "FOREACH quality system and qualifications",
            "Sistema de calidad y certificaciones de FOREACH",
            "Système qualité et qualifications de FOREACH",
            "FOREACH 품질 시스템 및 인증",
            "Система качества и квалификации FOREACH"
          ),
          width: 900,
          height: 520,
        },
      },
      {
        key: "milestones-image",
        categoryKey: "milestones",
        title: t(
          "发展历程",
          "Milestones",
          "Hitos",
          "Jalons",
          "연혁",
          "История развития"
        ),
        description: t(
          "自 2012 年成立以来，持续积累产品、技术、制造与市场服务能力，形成面向多行业客户的长期支持。",
          "Since 2012, FOREACH has continued to build product, technology, manufacturing, and market service capabilities for long-term support across industries.",
          "Desde 2012, FOREACH ha desarrollado capacidades en productos, tecnología, fabricación y servicio para apoyar a clientes de múltiples sectores.",
          "Depuis 2012, FOREACH développe ses capacités produits, technologies, fabrication et services afin d’accompagner durablement plusieurs secteurs.",
          "2012년 이후 제품, 기술, 제조 및 시장 서비스 역량을 지속적으로 축적하여 다양한 산업 고객을 장기적으로 지원합니다.",
          "С 2012 года FOREACH развивает продуктовые, технологические, производственные и сервисные возможности для долгосрочной поддержки разных отраслей."
        ),
        href: anchorPath("about"),
        order: 4,
        enabled: true,
        image: {
          src: "/images/about/milestones.webp",
          alt: t(
            "恒永达发展历程",
            "FOREACH milestones",
            "Hitos de FOREACH",
            "Jalons de FOREACH",
            "FOREACH 연혁",
            "История развития FOREACH"
          ),
          width: 900,
          height: 520,
        },
      },
      {
        key: "culture-image",
        categoryKey: "culture",
        title: t(
          "恒永达文化",
          "FOREACH Culture",
          "Cultura de FOREACH",
          "Culture FOREACH",
          "FOREACH 문화",
          "Культура FOREACH"
        ),
        description: t(
          "以技术创新和客户价值为导向，重视团队协同、持续学习、工程实践与社会责任。",
          "Driven by technical innovation and customer value, FOREACH values teamwork, continuous learning, engineering practice, and social responsibility.",
          "Impulsada por la innovación técnica y el valor para el cliente, FOREACH valora el trabajo en equipo, el aprendizaje continuo, la práctica de ingeniería y la responsabilidad social.",
          "Portée par l’innovation technique et la valeur client, FOREACH valorise la collaboration, l’apprentissage continu, la pratique d’ingénierie et la responsabilité sociale.",
          "기술 혁신과 고객 가치를 중심으로 팀워크, 지속 학습, 엔지니어링 실천 및 사회적 책임을 중시합니다.",
          "Ориентируясь на технические инновации и ценность для клиента, FOREACH ценит командную работу, постоянное обучение, инженерную практику и социальную ответственность."
        ),

        // 说明：
        // 1. 恒永达文化页面已经单独建立
        // 2. 当前多语言详情页还没全部完成
        // 3. 所以所有语言暂时统一跳中文页面 /about/culture
        href: {
          "zh-CN": "/about/culture",
          en: "/about/culture",
          es: "/about/culture",
          fr: "/about/culture",
          ko: "/about/culture",
          ru: "/about/culture",
        },

        order: 5,
        enabled: true,
        image: {
          src: "/images/about/culture.webp",
          alt: t(
            "恒永达文化",
            "FOREACH culture",
            "Cultura de FOREACH",
            "Culture FOREACH",
            "FOREACH 문화",
            "Культура FOREACH"
          ),
          width: 900,
          height: 520,
        },
      },
    ],
  },

  /* ================================
     手机端关于我们子菜单
     说明：
     1. PC 端关于我们下拉栏读取 megaDropdown
     2. 手机端 Top 栏读取 mobileChildren
     3. 所以这里必须单独配置手机端子菜单入口
  ================================ */
  mobileChildren: [
    {
      key: "about-company-mobile",
      label: t(
        "关于恒永达",
        "About FOREACH",
        "Sobre FOREACH",
        "À propos de FOREACH",
        "FOREACH 소개",
        "О FOREACH"
      ),
      href: anchorPath("about"),
      order: 1,
      enabled: true,
    },
    {
      key: "rd-manufacturing-mobile",
      label: t(
        "研发与制造能力",
        "R&D and Manufacturing",
        "I+D y fabricación",
        "R&D et fabrication",
        "R&D 및 제조 역량",
        "НИОКР и производство"
      ),
      href: anchorPath("about"),
      order: 2,
      enabled: true,
    },
    {
      key: "quality-qualification-mobile",
      label: t(
        "质量体系与企业资质",
        "Quality System and Qualifications",
        "Sistema de calidad y certificaciones",
        "Système qualité et qualifications",
        "품질 시스템 및 인증",
        "Система качества и квалификации"
      ),
      href: anchorPath("about"),
      order: 3,
      enabled: true,
    },
    {
      key: "milestones-mobile",
      label: t(
        "发展历程",
        "Milestones",
        "Hitos",
        "Jalons",
        "연혁",
        "История развития"
      ),
      href: anchorPath("about"),
      order: 4,
      enabled: true,
    },
    {
      key: "culture-mobile",
      label: t(
        "恒永达文化",
        "FOREACH Culture",
        "Cultura de FOREACH",
        "Culture FOREACH",
        "FOREACH 문화",
        "Культура FOREACH"
      ),

      // 当前多语言详情页还没全部完成，所以所有语言先统一跳中文页面
      href: {
        "zh-CN": "/about/culture",
        en: "/about/culture",
        es: "/about/culture",
        fr: "/about/culture",
        ko: "/about/culture",
        ru: "/about/culture",
      },

      order: 5,
      enabled: true,
    },
  ],
},

  {
    key: "contact",
    label: t("联系我们", "Contact Us", "Contáctenos", "Contactez-nous", "문의하기", "Свяжитесь с нами"),
    href: anchorPath("contact"),
    order: 6,
    enabled: true,
    dropdownType: "none",
  },
];

/* ================================
   获取当前可显示导航
================================ */

export function getVisibleNavigationItems() {
  return navigationItems
    .filter((item) => item.enabled)
    .sort((a, b) => a.order - b.order);
}

/* ================================
   读取当前语言文本
================================ */

export function getLocalizedText(text: LocalizedText, locale: string) {
  return text[locale] ?? text.en ?? text["zh-CN"] ?? "";
}

/* ================================
   读取当前语言链接
================================ */

export function getLocalizedHref(href: LocalizedHref, locale: string) {
  return href[locale] ?? href.en ?? href["zh-CN"] ?? "/";
}

/* ================================
   导航栏后端接口路径预留

   说明：
   1. 当前第一阶段导航数据仍然使用本地 navigation.ts
   2. 后期如果接 CMS / 后端，可以通过这个函数统一生成导航接口地址
   3. SiteHeader.tsx 未来可以从 /api/navigation?locale=zh-CN 读取导航数据
   4. 现在只是预留，不影响当前页面功能
================================ */

export function getNavigationApiPath(locale: string) {
  return `/api/navigation?locale=${encodeURIComponent(locale)}`;
}

/* ================================
   产品图片兜底显示文案

   说明：
   1. 这是导航栏 Mega Menu 产品图片的兜底逻辑
   2. 如果 navigation.ts 的图片数据里已经配置了 title / description，会优先使用配置内容
   3. 如果某张图片没有配置 title / description，才会使用这里的默认内容
   4. SiteHeader.tsx 只负责渲染，不再写产品业务文案
================================ */

export function getProductImageDisplayMeta(src: string, locale: string) {
  const useEnglish = locale !== "zh-CN";

  if (src.includes("syringe-pump")) {
    return {
      title: useEnglish ? "Syringe Pump" : "注射泵",
      description: useEnglish
        ? "High-precision μL–mL dispensing"
        : "μL–mL 级高精度定量分配",
    };
  }

  if (src.includes("diaphragm-pump")) {
    return {
      title: useEnglish ? "Diaphragm Pump" : "隔膜泵",
      description: useEnglish
        ? "Continuous supply, washing, and waste handling"
        : "连续供液、清洗与废液处理",
    };
  }

  if (src.includes("pipetting-pump")) {
    return {
      title: useEnglish ? "Pipetting Pump" : "移液泵",
      description: useEnglish
        ? "Automated pipetting and dispensing"
        : "自动化移液、加样与分液",
    };
  }

  if (src.includes("piston-pump")) {
    return {
      title: useEnglish ? "Piston Pump" : "柱塞泵",
      description: useEnglish
        ? "Stable metering and repeatable transfer"
        : "稳定计量与重复性液体输送",
    };
  }

  if (src.includes("rotary-pump")) {
    return {
      title: useEnglish ? "Rotary Pump" : "旋转泵",
      description: useEnglish
        ? "Multi-channel switching and metering"
        : "多通道液路切换与定量输送",
    };
  }

  return {
    title: useEnglish ? "Product" : "产品",
    description: useEnglish
      ? "Fluidic component for microfluidic systems"
      : "用于微流体液路系统的核心部件",
  };
}