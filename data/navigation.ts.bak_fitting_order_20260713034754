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

export type DropdownType = "none" | "mega" | "simple";

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
  href?: LocalizedHref; // 图片点击链接，用于 Mega Menu 中单张图片跳转
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

  /*
     指定哪些语言显示这一项

     说明：
     1. 不写 visibleLocales 时，默认所有语言都显示
     2. 写了 visibleLocales 时，只在指定语言显示
     3. 用于实现：
        - 中文站只显示「联系我们」
        - 外语站显示「Contact Us」和「Become a Distributor」
  */
  visibleLocales?: string[];
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
  description: LocalizedText,
  href?: LocalizedHref
): NavigationImage {
  return {
    src,
    alt: title,
    title,
    description,
    href,
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
      title: t("泵系列", "Pump Series", "Series de bombas", "Séries de pompes", "펌프 시리즈", "Серии насосов"),
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
      title: t("阀系列", "Valve Series", "Series de válvulas", "Séries de vannes", "밸브 시리즈", "Серии клапанов"),
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
      key: "probes",
      title: t("针系列", "Probe Series", "Series de sondas", "Séries de sondes", "프로브 시리즈", "Серии зондов"),
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
      key: "fittings",
      title: t("接头系列", "Fitting Series", "Series de racores", "Séries de raccords", "피팅 시리즈", "Серии фитингов"),
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
      key: "tubing",
      title: t("管路系列", "Tubing Series", "Series de tubos", "Séries de tubes", "튜빙 시리즈", "Серии трубок"),
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
      key: "control",
      title: t("智控系列", "Smart Control Series", "Serie de control inteligente", "Série de contrôle intelligent", "스마트 제어 시리즈", "Серия интеллектуального управления"),
      description: t(
        "液路压力监测、气泡检测与系统保护",
        "Fluid pressure monitoring, bubble detection, and system protection",
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
      title: t("泵系列", "Pump Series", "Series de bombas", "Séries de pompes", "펌프 시리즈", "Серии насосов"),
      description: t(
        "定量、供液、移液与废液处理",
        "Metering, supply, pipetting, and waste handling",
        "Dosificación, suministro, pipeteo y gestión de residuos",
        "Dosage, alimentation, pipetage et gestion des déchets",
        "정량, 공급, 피펫팅 및 폐액 처리",
        "Дозирование, подача, пипетирование и обращение с отходами"
      ),
      href: localizedPath("/products/pumps"),
      images: [
        productImage(
          "/images/products/pumps/piston-pump.jpg",
          t("柱塞泵", "Piston Pump", "Bomba de pistón", "Pompe à piston", "피스톤 펌프", "Поршневой насос"),
          t("稳定计量与重复性液体输送", "Stable metering and repeatable transfer", "Medición estable y transferencia repetible", "Dosage stable et transfert répétable", "안정적인 계량 및 반복 이송", "Стабильное дозирование и повторяемая передача жидкости"),
          localizedPath("/products/pumps/plunger-pumps")
        ),
        productImage(
          "/images/products/pumps/syringe-pump.jpg",
          t("注射泵", "Syringe Pump", "Bomba de jeringa", "Pompe seringue", "시린지 펌프", "Шприцевой насос"),
          t("μL–mL 级高精度定量分配", "High-precision μL–mL dispensing", "Dosificación precisa de μL a mL", "Distribution précise de μL à mL", "μL–mL 고정밀 분주", "Высокоточное дозирование от μL до mL"),
          localizedPath("/products/pumps/syringe-pumps")
        ),
        productImage(
          "/images/products/pumps/rotary-pump.jpg",
          t("无阀泵", "Valveless Pump", "Bomba sin válvula", "Pompe sans clapet", "무밸브 펌프", "Бесклапанный насос"),
          t("连续定量输送与比例加液", "Continuous metering and proportional dispensing", "Dosificación continua y dispensación proporcional", "Dosage continu et distribution proportionnelle", "연속 정량 이송 및 비례 분주", "Непрерывное дозирование и пропорциональная подача"),
          localizedPath("/products/pumps/valveless-pumps")
        ),
        productImage(
          "/images/products/pumps/diaphragm-pump.jpg",
          t("隔膜泵", "Diaphragm Pump", "Bomba de diafragma", "Pompe à membrane", "다이어프램 펌프", "Мембранный насос"),
          t("连续供液、清洗与废液处理", "Continuous supply, washing, and waste handling", "Suministro continuo, lavado y gestión de residuos", "Alimentation continue, lavage et gestion des déchets", "연속 공급, 세척 및 폐액 처리", "Непрерывная подача, промывка и обработка отходов"),
          localizedPath("/products/pumps/diaphragm-pumps")
        ),
        productImage(
          "/images/products/pumps/pipetting-pump.jpg",
          t("移液泵", "Pipetting Pump", "Bomba de pipeteo", "Pompe de pipetage", "피펫팅 펌프", "Пипеточный насос"),
          t("连续定量输送与比例加液", "Automated pipetting and dispensing", "Pipeteo y dispensación automatizados", "Pipetage et distribution automatisés", "자동 피펫팅 및 분주", "Автоматическое пипетирование и дозирование"),
          localizedPath("/products/pumps/pipetting-pumps")
        ),
      ],
      order: 1,
      enabled: true,
    },

    {
      key: "valves-card",
      categoryKey: "valves",
      title: t("阀系列", "Valve Series", "Series de válvulas", "Séries de vannes", "밸브 시리즈", "Серии клапанов"),
      description: t(
        "流路切换、通断控制与高压控制",
        "Flow path switching, on/off control, and high-pressure control",
        "Conmutación de flujo, control de apertura/cierre y alta presión",
        "Commutation fluidique, commande marche/arrêt et contrôle haute pression",
        "유로 전환, 온오프 제어 및 고압 제어",
        "Переключение потоков, управление вкл./выкл. и высокое давление"
      ),
      href: localizedPath("/products/valves"),
      images: [
        productImage(
          "/images/products/valves/rotary-valves/foreach-rotary-valve-main.webp",
          t("旋转阀", "Rotary Valve", "Válvula rotativa", "Vanne rotative", "로터리 밸브", "Роторный клапан"),
          t("多通道流路选择与切换", "Multi-port flow path selection and switching", "Selección y conmutación de rutas multicanal", "Sélection et commutation de voies multicanaux", "다중 포트 유로 선택 및 전환", "Выбор и переключение многоканальных потоков"),
          localizedPath("/products/valves/rotary-valves")
        ),
        productImage(
          "/images/products/valves/high-pressure-valves/foreach-high-pressure-valve-main.webp",
          t("高压阀", "High Pressure Valve", "Válvula de alta presión", "Vanne haute pression", "고압 밸브", "Клапан высокого давления"),
          t("适用于高压流路切换与精密控制", "For high-pressure flow switching and precise control", "Para conmutación de flujo de alta presión y control preciso", "Pour commutation de flux haute pression et contrôle précis", "고압 유로 전환 및 정밀 제어용", "Для переключения потоков высокого давления и точного управления"),
          localizedPath("/products/valves/high-pressure-valves")
        ),
        productImage(
          "/images/products/valves/solenoid-valves/foreach-solenoid-valve-main.webp",
          t("电磁阀", "Solenoid Valve", "Válvula solenoide", "Électrovanne", "솔레노이드 밸브", "Соленоидный клапан"),
          t("流路通断控制与精密切换", "On/off control and precise flow switching", "Control de apertura/cierre y conmutación precisa", "Commande marche/arrêt et commutation précise", "유로 온오프 제어 및 정밀 전환", "Управление вкл./выкл. и точное переключение потока"),
          localizedPath("/products/valves/solenoid-valves")
        ),
      ],
      order: 2,
      enabled: true,
    },

    {
      key: "probes-card",
      categoryKey: "probes",
      title: t("针系列", "Probe Series", "Series de sondas", "Séries de sondes", "프로브 시리즈", "Серии зондов"),
      description: t("样本针、清洗针、穿刺针、搅拌针与定制针组件", "Sampling probes, rinsing probes, puncturing probes, stirrers, and custom probe assemblies", "Sondas de muestreo, sondas de enjuague, sondas de perforación, agitadores y conjuntos de sondas personalizados", "Sondes d’échantillonnage, sondes de rinçage, sondes de perçage, agitateurs et assemblages de sondes personnalisés", "샘플링 프로브, 린싱 프로브, 피어싱 프로브, 교반기 및 맞춤형 프로브 어셈블리", "Пробоотборные зонды, промывочные зонды, прокалывающие зонды, мешалки и индивидуальные узлы зондов"),
      href: localizedPath("/products/probes"),
      images: [
        productImage("/images/products/PROBE/Sampling probe_200x200_01_v001.jpg", t("采样针", "Sampling Probe", "Sonda de muestreo", "Sonde d’échantillonnage", "샘플링 프로브", "Пробоотборный зонд"), t("用于样本吸取、转移与加样", "For sample aspiration, transfer, and dispensing", "Para aspiración, transferencia y dispensación de muestras", "Pour aspiration, transfert et distribution d’échantillons", "샘플 흡입, 이송 및 분주용", "Для аспирации, переноса и дозирования образцов"), localizedPath("/products/probes/sampling-probes")),
        productImage("/images/products/PROBE/Puncturing probe_200x200_01_v001.jpg", t("穿刺针", "Puncturing Probe", "Sonda de perforación", "Sonde de perçage", "피어싱 프로브", "Прокалывающий зонд"), t("用于封膜穿刺与样本处理", "For film puncturing and sample handling", "Para perforación de film y manejo de muestras", "Pour perçage de film et traitement d’échantillons", "필름 천공 및 샘플 처리용", "Для прокалывания пленки и обработки образцов"), localizedPath("/products/probes/piercing-probes")),
        productImage("/images/products/PROBE/Rinsing probe_200x200_01_v001.jpg", t("清洗针", "Rinsing Probe", "Sonda de enjuague", "Sonde de rinçage", "린싱 프로브", "Промывочный зонд"), t("用于清洗、冲洗与液路维护", "For washing, rinsing, and fluid path maintenance", "Para lavado, enjuague y mantenimiento de rutas fluidas", "Pour lavage, rinçage et maintenance des circuits fluidiques", "세척, 린싱 및 유로 유지보수용", "Для промывки, ополаскивания и обслуживания жидкостных линий"), localizedPath("/products/probes/wash-probes")),
        productImage("/images/products/PROBE/Stirrer_200x200_01_v001.jpg", t("搅拌针", "Stirrer", "Agitador", "Agitateur", "교반기", "Мешалка"), t("用于样本混匀与试剂处理", "For sample mixing and reagent handling", "Para mezcla de muestras y manejo de reactivos", "Pour mélange d’échantillons et traitement des réactifs", "샘플 혼합 및 시약 처리용", "Для смешивания образцов и работы с реагентами"), localizedPath("/products/probes/stirring-paddles")),
      ],
      order: 3,
      enabled: true,
    },

    {
      key: "fittings-card",
      categoryKey: "fittings",
      title: t("接头系列", "Fitting Series", "Series de racores", "Séries de raccords", "피팅 시리즈", "Серии фитингов"),
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
      key: "tubing-card",
      categoryKey: "tubing",
      title: t("管路系列", "Tubing Series", "Series de tubos", "Séries de tubes", "튜빙 시리즈", "Серии трубок"),
      description: t("软管、硬管与液路管线", "Flexible tubing, rigid tubing, and fluid lines", "Tubos flexibles, tubos rígidos y líneas de fluido", "Tubes souples, tubes rigides et lignes fluidiques", "플렉시블 튜빙, 리지드 튜빙 및 유체 라인", "Гибкие трубки, жесткие трубки и жидкостные линии"),
      href: localizedPath("/products/tubing"),
      images: [
        productImage(
          "/images/products/TUBING/pvc-tubing/pvc-tubing-main.webp",
          t("PVC 管", "PVC Tubing", "Tubo PVC", "Tube PVC", "PVC 튜빙", "Трубка PVC"),
          t(
            "适合体外诊断与实验室液路",
            "Suitable for IVD and laboratory fluid paths",
            "Adecuado para circuitos de diagnóstico in vitro y laboratorio",
            "Adapté aux circuits de diagnostic in vitro et de laboratoire",
            "체외진단 및 실험실 유로에 적합",
            "Подходит для жидкостных линий IVD и лабораторий"
          ),
          localizedPath("/products/tubing/pvc-tubing")
        ),
        productImage(
          "/images/products/TUBING/tpu-tubing/tpu-tubing-main.webp",
          t("TPU 管", "TPU Tubing", "Tubo TPU", "Tube TPU", "TPU 튜빙", "Трубка TPU"),
          t(
            "柔韧耐用，适合动态液路",
            "Flexible and durable for dynamic fluid paths",
            "Flexible y duradero para circuitos de fluidos dinámicos",
            "Souple et durable pour les circuits fluidiques dynamiques",
            "유연하고 내구성이 뛰어나 동적 유로에 적합",
            "Гибкая и долговечная трубка для динамических жидкостных линий"
          ),
          localizedPath("/products/tubing/tpu-tubing")
        ),
        productImage(
          "/images/products/TUBING/fep-tubing/fep-tubing-main.webp",
          t("FEP 管", "FEP Tubing", "Tubo FEP", "Tube FEP", "FEP 튜빙", "Трубка FEP"),
          t(
            "透明度高，适合可视化液路",
            "High transparency for visual fluid lines",
            "Alta transparencia para líneas de fluido visibles",
            "Haute transparence pour les circuits fluidiques visibles",
            "가시 유로에 적합한 고투명 튜빙",
            "Высокая прозрачность для визуального контроля потока"
          ),
          localizedPath("/products/tubing/fep-tubing")
        ),
        productImage(
          "/images/products/TUBING/ptfe-tubing/ptfe-tubing-main.webp",
          t("PTFE 管", "PTFE Tubing", "Tubo PTFE", "Tube PTFE", "PTFE 튜빙", "Трубка PTFE"),
          t(
            "耐腐蚀，适合多种试剂输送",
            "Corrosion-resistant tubing for reagent transfer",
            "Tubo resistente a la corrosión para transferencia de reactivos",
            "Tube résistant à la corrosion pour le transfert de réactifs",
            "다양한 시약 이송에 적합한 내식성 튜빙",
            "Коррозионностойкая трубка для подачи реагентов"
          ),
          localizedPath("/products/tubing/ptfe-tubing")
        ),
        productImage(
          "/images/products/TUBING/peek-tubing/peek-tubing-main.webp",
          t("PEEK 管", "PEEK Tubing", "Tubo PEEK", "Tube PEEK", "PEEK 튜빙", "Трубка PEEK"),
          t(
            "高强度，适合高性能流体系统",
            "High-strength tubing for demanding fluidic systems",
            "Tubo de alta resistencia para sistemas fluídicos exigentes",
            "Tube haute résistance pour les systèmes fluidiques exigeants",
            "고성능 유체 시스템용 고강도 튜빙",
            "Высокопрочная трубка для требовательных жидкостных систем"
          ),
          localizedPath("/products/tubing/peek-tubing")
        ),
        productImage(
          "/images/products/TUBING/pfa-tubing/pfa-tubing-main.webp",
          t("PFA 管", "PFA Tubing", "Tubo PFA", "Tube PFA", "PFA 튜빙", "Трубка PFA"),
          t(
            "高纯度、耐腐蚀，适合高要求液路",
            "High-purity, corrosion-resistant tubing for demanding fluid paths",
            "Tubo de alta pureza y resistente a la corrosión para circuitos exigentes",
            "Tube haute pureté et résistant à la corrosion pour circuits exigeants",
            "고순도·내식성이 요구되는 유로에 적합",
            "Высокочистая коррозионностойкая трубка для требовательных линий"
          ),
          localizedPath("/products/tubing/pfa-tubing")
        ),
      ],
      order: 5,
      enabled: true,
    },

    {
      key: "sensors-card",
      categoryKey: "control",
      href: localizedPath("/products?category=control"),
      title: t("智控系列", "Smart Control Series", "Serie de control inteligente", "Série de contrôle intelligent", "스마트 제어 시리즈", "Серия интеллектуального управления"),
      description: t(
        "液路压力监测、气泡检测与系统保护",
        "Fluid pressure monitoring, bubble detection, and system protection",
        "Monitoreo de presión de fluido, detección de burbujas y protección del sistema",
        "Surveillance de la pression fluidique, détection de bulles et protection du système",
        "유체 압력 모니터링, 기포 감지 및 시스템 보호",
        "Мониторинг давления жидкости, обнаружение пузырьков и защита системы"
      ),
      images: [
        productImage(
          "/images/products/control/foreach-abd-air-bubble-detector.webp",
          t("ABD 气泡检测模块", "ABD Air Bubble Detector", "Detector de burbujas ABD", "Détecteur de bulles ABD", "ABD 기포 감지 모듈", "Детектор пузырьков ABD"),
          t("用于透明管路气泡与液滴检测", "For bubble and droplet detection in transparent tubing", "Para detectar burbujas y gotas en tubos transparentes", "Pour détecter les bulles et gouttelettes dans les tubes transparents", "투명 튜빙 내 기포 및 액적 감지용", "Для обнаружения пузырьков и капель в прозрачных трубках"),
          localizedPath("/products?category=control")
        ),
        productImage(
          "/images/products/control/foreach-pdm5-pressure-sensor.webp",
          t("PDM5 压力检测模块", "PDM5 Pressure Sensor", "Sensor de presión PDM5", "Capteur de pression PDM5", "PDM5 압력 감지 모듈", "Датчик давления PDM5"),
          t("用于液路压力监测与堵塞预警", "For fluid pressure monitoring and blockage warning", "Para monitoreo de presión de fluido y alerta de obstrucción", "Pour surveillance de pression fluidique et alerte de colmatage", "유체 압력 모니터링 및 막힘 경고용", "Для мониторинга давления жидкости и предупреждения о засоре"),
          localizedPath("/products?category=control")
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

  footerHref: localizedPath("/products"),
};

/* ===== APPLICATION MEGA MENU DATA START ===== */

/* ================================
   应用领域图片辅助函数

   说明：
   1. 用于顶部导航「应用领域」Mega Menu
   2. 图片放在 public/images/applications/mega-menu/
   3. 代码路径不要写 public
   4. 后续你只需要替换同名 webp 图片，不需要改代码
================================ */

function applicationSceneImage(
  src: string,
  title: LocalizedText,
  description: LocalizedText,
  href?: LocalizedHref
): NavigationImage {
  return {
    src,
    alt: title,
    title,
    description,
    href,
    width: 1200,
    height: 760,
  };
}

/* ================================
   应用领域 Mega Menu 数据

   说明：
   1. 左侧 categories 是应用行业分类
   2. 右侧 cards 是当前行业的典型仪器 / 场景入口
   3. IVD 已有正式页面，href 指向 /applications/ivd
   4. 其他应用领域页面后续再建立，当前先指向首页 applications 锚点，避免 404
================================ */

const applicationMegaDropdown: MegaDropdown = {
  heading: t(
    "应用领域",
    "Applications",
    "Aplicaciones",
    "Applications",
    "응용 분야",
    "Области применения"
  ),

  description: t(
    "按应用行业、典型仪器和液路需求快速了解恒永达在微流体系统中的产品支持能力。",
    "Explore FOREACH fluidic component capabilities by application, instrument type, and fluidic requirements.",
    "Explore las capacidades de componentes fluídicos de FOREACH por aplicación, tipo de instrumento y requisitos de fluido.",
    "Découvrez les capacités des composants fluidiques FOREACH par application, type d’instrument et besoins fluidiques.",
    "응용 분야, 장비 유형 및 유체 요구 사항에 따라 FOREACH 유체 부품 역량을 확인하세요.",
    "Ознакомьтесь с возможностями жидкостных компонентов FOREACH по областям применения, типам приборов и требованиям к жидкостным трактам."
  ),

  categories: [
    {
      key: "ivd",
      title: t("IVD 体外诊断", "IVD Diagnostics", "Diagnóstico IVD", "Diagnostic IVD", "IVD 체외진단", "IVD диагностика"),
      description: t(
        "样本、试剂、清洗、废液与状态监测液路",
        "Samples, reagents, washing, waste, and status monitoring",
        "Muestras, reactivos, lavado, residuos y monitoreo",
        "Échantillons, réactifs, lavage, déchets et surveillance",
        "샘플, 시약, 세척, 폐액 및 상태 모니터링",
        "Образцы, реагенты, промывка, отходы и контроль состояния"
      ),
      order: 1,
      enabled: true,
    },
    {
      key: "life-science",
      title: t("生命科学", "Life Sciences", "Ciencias de la vida", "Sciences de la vie", "생명과학", "Науки о жизни"),
      description: t(
        "样本处理、反应、分离与检测前处理液路",
        "Sample handling, reaction, separation, and pre-analytical fluidics",
        "Manejo de muestras, reacción, separación y pretratamiento",
        "Traitement d’échantillons, réaction, séparation et prétraitement",
        "샘플 처리, 반응, 분리 및 분석 전 처리",
        "Обработка образцов, реакции, разделение и пробоподготовка"
      ),
      order: 2,
      enabled: true,
    },
    {
      key: "laboratory-automation",
      title: t("实验室自动化", "Laboratory Automation", "Automatización de laboratorio", "Automatisation de laboratoire", "실험실 자동화", "Лабораторная автоматизация"),
      description: t(
        "自动加样、移液、清洗、转移与联机系统",
        "Automated dispensing, pipetting, washing, transfer, and integration",
        "Dispensación, pipeteo, lavado, transferencia e integración",
        "Distribution, pipetage, lavage, transfert et intégration",
        "자동 분주, 피펫팅, 세척, 이송 및 통합",
        "Автоматическое дозирование, пипетирование, промывка, перенос и интеграция"
      ),
      order: 3,
      enabled: true,
    },
    {
      key: "analytical-instruments",
      title: t("分析仪器", "Analytical Instruments", "Instrumentos analíticos", "Instruments analytiques", "분석 장비", "Аналитические приборы"),
      description: t(
        "连续进样、试剂输送、流路切换与管路连接",
        "Sampling, reagent delivery, flow switching, and tubing connections",
        "Muestreo, reactivos, conmutación de flujo y conexiones",
        "Échantillonnage, réactifs, commutation et raccordements",
        "샘플링, 시약 이송, 유로 전환 및 튜빙 연결",
        "Отбор проб, подача реагентов, переключение потоков и соединения"
      ),
      order: 4,
      enabled: true,
    },
    {
      key: "environmental-monitoring",
      title: t("环保监测", "Environmental Monitoring", "Monitoreo ambiental", "Surveillance environnementale", "환경 모니터링", "Экологический мониторинг"),
      description: t(
        "水质、废水、气体预处理、采样前处理与在线液路",
        "Water, gas, online sampling, pretreatment, and testing fluidics",
        "Agua, gas, muestreo en línea, pretratamiento y detección",
        "Eau, gaz, échantillonnage en ligne, prétraitement et détection",
        "수질, 가스, 온라인 샘플링, 전처리 및 검출",
        "Вода, газ, онлайн-отбор, подготовка и измерение"
      ),
      order: 5,
      enabled: true,
    },
    {
      key: "synthetic-biology",
      title: t("合成生物", "Synthetic Biology", "Biología sintética", "Biologie synthétique", "합성생물학", "Синтетическая биология"),
      description: t(
        "培养、补液、取样、换液与连续流控制",
        "Culture, feeding, sampling, media exchange, and continuous flow",
        "Cultivo, alimentación, muestreo, cambio de medio y flujo continuo",
        "Culture, alimentation, prélèvement, renouvellement et flux continu",
        "배양, 보충, 샘플링, 배지 교환 및 연속 흐름",
        "Культивирование, подпитка, отбор проб, замена среды и непрерывный поток"
      ),
      order: 6,
      enabled: true,
    },
  ],

  cards: [
    {
      key: "ivd-card",
      categoryKey: "ivd",
      title: t("IVD 体外诊断", "IVD Diagnostics", "Diagnóstico IVD", "Diagnostic IVD", "IVD 체외진단", "IVD диагностика"),
      description: t(
        "面向 IVD 体外诊断仪器中的样本吸取、试剂分配、清洗废液、液路切换、管路连接与状态监测需求。",
        "For sample aspiration, reagent dispensing, washing, waste handling, switching, tubing connections, and status monitoring in IVD instruments.",
        "Para aspiración de muestras, dispensación de reactivos, lavado, residuos, conmutación, conexiones y monitoreo en instrumentos IVD.",
        "Pour aspiration d’échantillons, distribution de réactifs, lavage, déchets, commutation, raccordements et surveillance dans les instruments IVD.",
        "IVD 장비의 샘플 흡입, 시약 분주, 세척, 폐액, 유로 전환, 튜빙 연결 및 상태 모니터링.",
        "Для аспирации образцов, дозирования реагентов, промывки, отходов, переключения, соединений и контроля состояния."
      ),
      href: localizedPath("/applications/analytical-instruments"),
      images: [
        applicationSceneImage("/images/applications/mega-menu/ivd-biochemistry.webp", t("生化分析仪", "Clinical Chemistry Analyzer", "Analizador bioquímico", "Analyseur de biochimie", "생화학 분석기", "Биохимический анализатор"), t("样本、试剂、清洗与废液处理液路", "Sample, reagent, washing, and waste fluidics", "Muestra, reactivo, lavado y residuos", "Échantillon, réactif, lavage et déchets", "샘플, 시약, 세척 및 폐액 유로", "Образцы, реагенты, промывка и отходы"), localizedPath("/applications/ivd?instrument=clinical")),
        applicationSceneImage("/images/applications/mega-menu/ivd-immunoassay.webp", t("化学发光 / 免疫分析仪", "CLIA / Immunoassay Analyzer", "Analizador CLIA / inmunoensayo", "Analyseur CLIA / immunoessai", "화학발광 / 면역 분석기", "Хемилюминесцентный / иммунологический анализатор"), t("多试剂分配、磁珠清洗与底物添加液路", "Multi-reagent dispensing, bead washing, and substrate addition", "Reactivos, lavado de perlas y sustrato", "Réactifs, billes magnétiques et substrat", "다중 시약, 비드 세척 및 기질 첨가", "Реагенты, промывка частиц и субстрат"), localizedPath("/applications/ivd?instrument=immunoassay")),
        applicationSceneImage("/images/applications/mega-menu/ivd-hematology.webp", t("血液分析仪", "Hematology Analyzer", "Analizador hematológico", "Analyseur d’hématologie", "혈액 분석기", "Гематологический анализатор"), t("血样稀释、溶血剂添加与废液排放液路", "Blood dilution, lysing reagent addition, and waste discharge", "Dilución de sangre, lisante y residuos", "Dilution du sang, lyseur et déchets", "혈액 희석, 용혈제 및 폐액 배출", "Разбавление крови, лизирующий реагент и отходы"), localizedPath("/applications/ivd?instrument=hematology")),
        applicationSceneImage("/images/applications/mega-menu/ivd-coagulation.webp", t("凝血分析仪", "Coagulation Analyzer", "Analizador de coagulación", "Analyseur de coagulation", "혈액응고 분석기", "Коагулометр"), t("小体积样本与凝血试剂稳定分配", "Stable dispensing of small-volume samples and coagulation reagents", "Muestras pequeñas y reactivos de coagulación", "Petits échantillons et réactifs de coagulation", "소량 샘플 및 응고 시약 분주", "Малые образцы и реагенты коагуляции"), localizedPath("/applications/ivd?instrument=coagulation")),
        applicationSceneImage("/images/applications/mega-menu/ivd-molecular.webp", t("分子诊断 / PCR", "Molecular Diagnostics / PCR", "Diagnóstico molecular / PCR", "Diagnostic moléculaire / PCR", "분자진단 / PCR", "Молекулярная диагностика / PCR"), t("核酸提取、清洗、洗脱与防污染液路", "Nucleic acid extraction, washing, elution, and contamination control", "Extracción, lavado, elución y control de contaminación", "Extraction, lavage, élution et contrôle de contamination", "핵산 추출, 세척, 용출 및 오염 제어", "Экстракция, промывка, элюирование и контроль загрязнения"), localizedPath("/applications/ivd?instrument=molecular")),
      ],
      order: 1,
      enabled: true,
    },

    {
      key: "life-science-card",
      categoryKey: "life-science",
      title: t("生命科学", "Life Sciences", "Ciencias de la vida", "Sciences de la vie", "생명과학", "Науки о жизни"),
      description: t(
        "面向生命科学设备中的样本处理、试剂加入、反应控制、分离清洗和检测前处理流程。",
        "For sample handling, reagent addition, reaction control, separation washing, and pre-analytical processing.",
        "Para manejo de muestras, reactivos, reacción, separación y pretratamiento.",
        "Pour traitement d’échantillons, réactifs, réaction, séparation et prétraitement.",
        "샘플 처리, 시약 첨가, 반응 제어, 분리 세척 및 전처리.",
        "Для обработки образцов, реагентов, реакций, разделения и подготовки."
      ),
      href: localizedPath("/applications/life-science"),
      images: [
        applicationSceneImage(
          "/images/applications/mega-menu/life-nucleic-acid.webp",
          t(
            "基因测序 / 样本制备",
            "Genomics / Sample Preparation",
            "Genomics / Sample Preparation",
            "Genomics / Sample Preparation",
            "Genomics / Sample Preparation",
            "Genomics / Sample Preparation",
          ),
          t(
            "裂解、结合、清洗、洗脱与低残留液路",
            "Lysis, binding, washing, elution and low-residue fluidic paths",
            "Lysis, binding, washing, elution and low-residue fluidic paths",
            "Lysis, binding, washing, elution and low-residue fluidic paths",
            "Lysis, binding, washing, elution and low-residue fluidic paths",
            "Lysis, binding, washing, elution and low-residue fluidic paths",
          ),
          localizedPath("/applications/life-science?application=genomics"),
        ),
        applicationSceneImage(
          "/images/applications/mega-menu/life-cell-analysis.webp",
          t(
            "细胞培养 / 细胞治疗",
            "Cell Culture / Cell Therapy",
            "Cell Culture / Cell Therapy",
            "Cell Culture / Cell Therapy",
            "Cell Culture / Cell Therapy",
            "Cell Culture / Cell Therapy",
          ),
          t(
            "培养基补液、缓冲液切换与封闭式转移",
            "Media replenishment, buffer switching and closed fluid transfer",
            "Media replenishment, buffer switching and closed fluid transfer",
            "Media replenishment, buffer switching and closed fluid transfer",
            "Media replenishment, buffer switching and closed fluid transfer",
            "Media replenishment, buffer switching and closed fluid transfer",
          ),
          localizedPath("/applications/life-science?application=cellCulture"),
        ),
        applicationSceneImage(
          "/images/applications/mega-menu/life-sample-prep.webp",
          t(
            "实验室自动化工作站",
            "Laboratory Automation Workstation",
            "Laboratory Automation Workstation",
            "Laboratory Automation Workstation",
            "Laboratory Automation Workstation",
            "Laboratory Automation Workstation",
          ),
          t(
            "移液、分液、清洗与多工位液路集成",
            "Pipetting, dispensing, washing and multi-station fluidic integration",
            "Pipetting, dispensing, washing and multi-station fluidic integration",
            "Pipetting, dispensing, washing and multi-station fluidic integration",
            "Pipetting, dispensing, washing and multi-station fluidic integration",
            "Pipetting, dispensing, washing and multi-station fluidic integration",
          ),
          localizedPath("/applications/life-science?application=automation"),
        ),
        applicationSceneImage(
          "/images/applications/mega-menu/life-protein-analysis.webp",
          t(
            "蛋白 / 抗体分析",
            "Protein / Antibody Analysis",
            "Protein / Antibody Analysis",
            "Protein / Antibody Analysis",
            "Protein / Antibody Analysis",
            "Protein / Antibody Analysis",
          ),
          t(
            "样本进样、缓冲液切换与低吸附流路",
            "Sample injection, buffer switching and low-adsorption flow paths",
            "Sample injection, buffer switching and low-adsorption flow paths",
            "Sample injection, buffer switching and low-adsorption flow paths",
            "Sample injection, buffer switching and low-adsorption flow paths",
            "Sample injection, buffer switching and low-adsorption flow paths",
          ),
          localizedPath("/applications/life-science?application=protein"),
        ),
        applicationSceneImage(
          "/images/applications/mega-menu/life-microfluidic-platform.webp",
          t(
            "合成生物学 / 生物工艺",
            "Synthetic Biology / Bioprocess",
            "Synthetic Biology / Bioprocess",
            "Synthetic Biology / Bioprocess",
            "Synthetic Biology / Bioprocess",
            "Synthetic Biology / Bioprocess",
          ),
          t(
            "补料、取样、排液与过程状态监测",
            "Feeding, sampling, drainage and process status monitoring",
            "Feeding, sampling, drainage and process status monitoring",
            "Feeding, sampling, drainage and process status monitoring",
            "Feeding, sampling, drainage and process status monitoring",
            "Feeding, sampling, drainage and process status monitoring",
          ),
          localizedPath("/applications/life-science?application=bioProcess"),
        ),
      ],
      order: 2,
      enabled: true,
    },

    {
      key: "laboratory-automation-card",
      categoryKey: "laboratory-automation",
      title: t("实验室自动化", "Laboratory Automation", "Automatización de laboratorio", "Automatisation de laboratoire", "실험실 자동화", "Лабораторная автоматизация"),
      description: t(
        "面向实验室自动化系统中的自动移液、样本转移、微孔板处理、清洗排废和多模块联机液路。",
        "For automated pipetting, sample transfer, microplate handling, washing, waste handling, and integrated fluidics.",
        "Para pipeteo, transferencia, microplacas, lavado, residuos y fluidos integrados.",
        "Pour pipetage, transfert, microplaques, lavage, déchets et fluidique intégrée.",
        "자동 피펫팅, 샘플 이송, 마이크로플레이트, 세척, 폐액 및 통합 유로.",
        "Для пипетирования, переноса, микропланшетов, промывки, отходов и интеграции."
      ),
      href: localizedPath("/applications/lab-automation"),
      images: [
        applicationSceneImage(
          "/images/applications/mega-menu/lab-sample-processing.webp",
          t(
            "样本制备工作站",
            "Sample Preparation Workstation",
            "Sample Preparation Workstation",
            "Sample Preparation Workstation",
            "Sample Preparation Workstation",
            "Sample Preparation Workstation",
          ),
          t(
            "样本前处理、试剂加入、清洗、洗脱与废液排放",
            "Sample pretreatment, reagent dosing, washing, elution and waste drainage",
            "Sample pretreatment, reagent dosing, washing, elution and waste drainage",
            "Sample pretreatment, reagent dosing, washing, elution and waste drainage",
            "Sample pretreatment, reagent dosing, washing, elution and waste drainage",
            "Sample pretreatment, reagent dosing, washing, elution and waste drainage",
          ),
          localizedPath("/applications/lab-automation?application=samplePrep"),
        ),
        applicationSceneImage(
          "/images/applications/mega-menu/lab-pipetting-workstation.webp",
          t(
            "自动移液平台",
            "Automated Pipetting Platform",
            "Automated Pipetting Platform",
            "Automated Pipetting Platform",
            "Automated Pipetting Platform",
            "Automated Pipetting Platform",
          ),
          t(
            "孔板、试管与反应腔之间的微量液体转移",
            "Micro-volume liquid transfer between plates, tubes and reaction chambers",
            "Micro-volume liquid transfer between plates, tubes and reaction chambers",
            "Micro-volume liquid transfer between plates, tubes and reaction chambers",
            "Micro-volume liquid transfer between plates, tubes and reaction chambers",
            "Micro-volume liquid transfer between plates, tubes and reaction chambers",
          ),
          localizedPath("/applications/lab-automation?application=pipetting"),
        ),
        applicationSceneImage(
          "/images/applications/mega-menu/lab-microplate-processing.webp",
          t(
            "微孔板处理设备",
            "Microplate Processing Systems",
            "Microplate Processing Systems",
            "Microplate Processing Systems",
            "Microplate Processing Systems",
            "Microplate Processing Systems",
          ),
          t(
            "孔板加液、洗板、残液抽排与清洗废液处理",
            "Plate dosing, washing, residual liquid aspiration and waste handling",
            "Plate dosing, washing, residual liquid aspiration and waste handling",
            "Plate dosing, washing, residual liquid aspiration and waste handling",
            "Plate dosing, washing, residual liquid aspiration and waste handling",
            "Plate dosing, washing, residual liquid aspiration and waste handling",
          ),
          localizedPath("/applications/lab-automation?application=microplate"),
        ),
        applicationSceneImage(
          "/images/applications/mega-menu/lab-reagent-dispensing.webp",
          t(
            "试剂分装与分配设备",
            "Reagent Dispensing Systems",
            "Reagent Dispensing Systems",
            "Reagent Dispensing Systems",
            "Reagent Dispensing Systems",
            "Reagent Dispensing Systems",
          ),
          t(
            "缓冲液、清洗液、培养基与添加液重复定量分配",
            "Repeatable dosing of buffers, wash solutions, media and additives",
            "Repeatable dosing of buffers, wash solutions, media and additives",
            "Repeatable dosing of buffers, wash solutions, media and additives",
            "Repeatable dosing of buffers, wash solutions, media and additives",
            "Repeatable dosing of buffers, wash solutions, media and additives",
          ),
          localizedPath("/applications/lab-automation?application=reagentDispensing"),
        ),
        applicationSceneImage(
          "/images/applications/mega-menu/lab-integrated-system.webp",
          t(
            "自动化系统集成",
            "Automation System Integration",
            "Automation System Integration",
            "Automation System Integration",
            "Automation System Integration",
            "Automation System Integration",
          ),
          t(
            "多模块、多工位、多路径液路集成与状态监测",
            "Multi-module, multi-station and multi-path fluidic integration with status monitoring",
            "Multi-module, multi-station and multi-path fluidic integration with status monitoring",
            "Multi-module, multi-station and multi-path fluidic integration with status monitoring",
            "Multi-module, multi-station and multi-path fluidic integration with status monitoring",
            "Multi-module, multi-station and multi-path fluidic integration with status monitoring",
          ),
          localizedPath("/applications/lab-automation?application=systemIntegration"),
        ),
      ],
      order: 3,
      enabled: true,
    },

    {
      key: "analytical-instruments-card",
      categoryKey: "analytical-instruments",
      title: t("分析仪器", "Analytical Instruments", "Instrumentos analíticos", "Instruments analytiques", "분석 장비", "Аналитические приборы"),
      description: t(
        "面向分析仪器中的试剂输送、连续进样、流路切换、样本池清洗和精密管路连接需求。",
        "For reagent delivery, continuous sampling, flow switching, cuvette washing, and precision tubing connections.",
        "Para reactivos, muestreo continuo, conmutación, lavado y conexiones precisas.",
        "Pour réactifs, échantillonnage continu, commutation, lavage et raccordements précis.",
        "시약 이송, 연속 샘플링, 유로 전환, 셀 세척 및 정밀 연결.",
        "Для реагентов, непрерывного отбора, переключения, промывки и соединений."
      ),
      href: localizedPath("/applications/analytical-instruments"),
      images: [
        applicationSceneImage(
          "/images/applications/mega-menu/analytical-chromatography.webp",
          t(
            "色谱 / 自动进样系统",
            "Chromatography / Autosampler",
            "Chromatography / Autosampler",
            "Chromatography / Autosampler",
            "Chromatography / Autosampler",
            "Chromatography / Autosampler",
          ),
          t(
            "样品进样、溶剂切换、清洗排废与低残留流路",
            "Sample injection, solvent switching, washing, waste drainage and low-residue flow paths",
            "Sample injection, solvent switching, washing, waste drainage and low-residue flow paths",
            "Sample injection, solvent switching, washing, waste drainage and low-residue flow paths",
            "Sample injection, solvent switching, washing, waste drainage and low-residue flow paths",
            "Sample injection, solvent switching, washing, waste drainage and low-residue flow paths",
          ),
          localizedPath("/applications/analytical-instruments?application=chromatography"),
        ),
        applicationSceneImage(
          "/images/applications/mega-menu/analytical-spectroscopy.webp",
          t(
            "光谱 / 元素分析仪器",
            "Spectroscopy / Elemental Analysis",
            "Spectroscopy / Elemental Analysis",
            "Spectroscopy / Elemental Analysis",
            "Spectroscopy / Elemental Analysis",
            "Spectroscopy / Elemental Analysis",
          ),
          t(
            "样品输送、试剂加入、清洗与废液排放",
            "Sample delivery, reagent dosing, washing and waste drainage",
            "Sample delivery, reagent dosing, washing and waste drainage",
            "Sample delivery, reagent dosing, washing and waste drainage",
            "Sample delivery, reagent dosing, washing and waste drainage",
            "Sample delivery, reagent dosing, washing and waste drainage",
          ),
          localizedPath("/applications/analytical-instruments?application=spectroscopy"),
        ),
        applicationSceneImage(
          "/images/applications/mega-menu/analytical-titration.webp",
          t(
            "水质 / 环境监测设备",
            "Water Quality / Environmental Monitoring",
            "Water Quality / Environmental Monitoring",
            "Water Quality / Environmental Monitoring",
            "Water Quality / Environmental Monitoring",
            "Water Quality / Environmental Monitoring",
          ),
          t(
            "取样、试剂分配、反应检测、清洗与排废",
            "Sampling, reagent dosing, reaction detection, washing and waste drainage",
            "Sampling, reagent dosing, reaction detection, washing and waste drainage",
            "Sampling, reagent dosing, reaction detection, washing and waste drainage",
            "Sampling, reagent dosing, reaction detection, washing and waste drainage",
            "Sampling, reagent dosing, reaction detection, washing and waste drainage",
          ),
          localizedPath("/applications/analytical-instruments?application=waterQuality"),
        ),
        applicationSceneImage(
          "/images/applications/mega-menu/analytical-ms-pretreatment.webp",
          t(
            "样品前处理设备",
            "Sample Preparation Systems",
            "Sample Preparation Systems",
            "Sample Preparation Systems",
            "Sample Preparation Systems",
            "Sample Preparation Systems",
          ),
          t(
            "稀释、萃取、混合、过滤与多路径液路控制",
            "Dilution, extraction, mixing, filtration and multi-path fluidic control",
            "Dilution, extraction, mixing, filtration and multi-path fluidic control",
            "Dilution, extraction, mixing, filtration and multi-path fluidic control",
            "Dilution, extraction, mixing, filtration and multi-path fluidic control",
            "Dilution, extraction, mixing, filtration and multi-path fluidic control",
          ),
          localizedPath("/applications/analytical-instruments?application=samplePrep"),
        ),
        applicationSceneImage(
          "/images/applications/mega-menu/analytical-online-system.webp",
          t(
            "实验室分析系统集成",
            "Laboratory Analyzer System Integration",
            "Laboratory Analyzer System Integration",
            "Laboratory Analyzer System Integration",
            "Laboratory Analyzer System Integration",
            "Laboratory Analyzer System Integration",
          ),
          t(
            "多模块、多试剂、多检测路径的液路系统集成",
            "Fluidic system integration for multi-module, multi-reagent and multi-detection paths",
            "Fluidic system integration for multi-module, multi-reagent and multi-detection paths",
            "Fluidic system integration for multi-module, multi-reagent and multi-detection paths",
            "Fluidic system integration for multi-module, multi-reagent and multi-detection paths",
            "Fluidic system integration for multi-module, multi-reagent and multi-detection paths",
          ),
          localizedPath("/applications/analytical-instruments?application=labAnalyzer"),
        ),
      ],
      order: 4,
      enabled: true,
    },

    {
      key: "environmental-monitoring-card",
      categoryKey: "environmental-monitoring",
      title: t("环保监测", "Environmental Monitoring", "Monitoreo ambiental", "Surveillance environnementale", "환경 모니터링", "Экологический мониторинг"),
      description: t(
        "面向环保监测设备中的水样采集、试剂加入、在线预处理、清洗排废和异常状态监测。",
        "For water sampling, reagent addition, online pretreatment, washing, waste handling, and status monitoring.",
        "Para muestreo de agua, reactivos, pretratamiento, lavado, residuos y monitoreo.",
        "Pour prélèvement d’eau, réactifs, prétraitement, lavage, déchets et surveillance.",
        "수질 샘플링, 시약, 전처리, 세척, 폐액 및 상태 모니터링.",
        "Для отбора воды, реагентов, подготовки, промывки, отходов и контроля."
      ),
      href: localizedPath("/applications/environmental-monitoring"),
      images: [
        applicationSceneImage(
          "/images/applications/mega-menu/environment-water-monitoring.webp",
          t(
            "水质在线监测",
            "Water Quality Monitoring",
            "Water Quality Monitoring",
            "Water Quality Monitoring",
            "Water Quality Monitoring",
            "Water Quality Monitoring",
          ),
          t(
            "取样、试剂分配、反应检测、清洗与排废",
            "Sampling, reagent dosing, reaction detection, washing and waste drainage",
            "Sampling, reagent dosing, reaction detection, washing and waste drainage",
            "Sampling, reagent dosing, reaction detection, washing and waste drainage",
            "Sampling, reagent dosing, reaction detection, washing and waste drainage",
            "Sampling, reagent dosing, reaction detection, washing and waste drainage",
          ),
          localizedPath("/applications/environmental-monitoring?application=waterQuality"),
        ),
        applicationSceneImage(
          "/images/applications/mega-menu/environment-pretreatment.webp",
          t(
            "废水 / 工业过程水",
            "Wastewater / Process Water",
            "Wastewater / Process Water",
            "Wastewater / Process Water",
            "Wastewater / Process Water",
            "Wastewater / Process Water",
          ),
          t(
            "复杂水样取送、过滤保护、试剂反应与排液维护",
            "Complex water sampling, filtration protection, reagent reaction and drainage maintenance",
            "Complex water sampling, filtration protection, reagent reaction and drainage maintenance",
            "Complex water sampling, filtration protection, reagent reaction and drainage maintenance",
            "Complex water sampling, filtration protection, reagent reaction and drainage maintenance",
            "Complex water sampling, filtration protection, reagent reaction and drainage maintenance",
          ),
          localizedPath("/applications/environmental-monitoring?application=wastewater"),
        ),
        applicationSceneImage(
          "/images/applications/mega-menu/environment-gas-analysis.webp",
          t(
            "烟气 / 气体预处理",
            "Flue Gas / Gas Pretreatment",
            "Flue Gas / Gas Pretreatment",
            "Flue Gas / Gas Pretreatment",
            "Flue Gas / Gas Pretreatment",
            "Flue Gas / Gas Pretreatment",
          ),
          t(
            "冷凝液排放、吸收液输送、清洗与防堵保护",
            "Condensate drainage, absorbent delivery, washing and anti-clogging protection",
            "Condensate drainage, absorbent delivery, washing and anti-clogging protection",
            "Condensate drainage, absorbent delivery, washing and anti-clogging protection",
            "Condensate drainage, absorbent delivery, washing and anti-clogging protection",
            "Condensate drainage, absorbent delivery, washing and anti-clogging protection",
          ),
          localizedPath("/applications/environmental-monitoring?application=gasPretreatment"),
        ),
        applicationSceneImage(
          "/images/applications/mega-menu/environment-auto-sampling.webp",
          t(
            "环境采样与前处理",
            "Environmental Sampling & Pretreatment",
            "Environmental Sampling & Pretreatment",
            "Environmental Sampling & Pretreatment",
            "Environmental Sampling & Pretreatment",
            "Environmental Sampling & Pretreatment",
          ),
          t(
            "样品转移、稀释、过滤、混合与废液排放",
            "Sample transfer, dilution, filtration, mixing and waste drainage",
            "Sample transfer, dilution, filtration, mixing and waste drainage",
            "Sample transfer, dilution, filtration, mixing and waste drainage",
            "Sample transfer, dilution, filtration, mixing and waste drainage",
            "Sample transfer, dilution, filtration, mixing and waste drainage",
          ),
          localizedPath("/applications/environmental-monitoring?application=samplingPrep"),
        ),
        applicationSceneImage(
          "/images/applications/mega-menu/environment-portable-device.webp",
          t(
            "环保在线系统集成",
            "Online Environmental System Integration",
            "Online Environmental System Integration",
            "Online Environmental System Integration",
            "Online Environmental System Integration",
            "Online Environmental System Integration",
          ),
          t(
            "多试剂、多通道、多废液路径的长期在线液路集成",
            "Long-term online fluidic integration for multi-reagent, multi-channel and waste paths",
            "Long-term online fluidic integration for multi-reagent, multi-channel and waste paths",
            "Long-term online fluidic integration for multi-reagent, multi-channel and waste paths",
            "Long-term online fluidic integration for multi-reagent, multi-channel and waste paths",
            "Long-term online fluidic integration for multi-reagent, multi-channel and waste paths",
          ),
          localizedPath("/applications/environmental-monitoring?application=systemIntegration"),
        ),
      ],
      order: 5,
      enabled: true,
    },

    {
      key: "synthetic-biology-card",
      categoryKey: "synthetic-biology",
      title: t("合成生物", "Synthetic Biology", "Biología sintética", "Biologie synthétique", "합성생물학", "Синтетическая биология"),
      description: t(
        "面向合成生物设备中的培养补液、自动取样、换液、连续流控制和反应过程液路管理。",
        "For culture feeding, automated sampling, media exchange, continuous flow control, and process fluidics.",
        "Para cultivo, alimentación, muestreo, cambio de medio, flujo continuo y proceso.",
        "Pour culture, alimentation, prélèvement, renouvellement, flux continu et procédé.",
        "배양 보충, 자동 샘플링, 배지 교환, 연속 흐름 및 공정 유로.",
        "Для подпитки, отбора проб, замены среды, непрерывного потока и процесса."
      ),
      href: localizedPath("/applications/synthetic-biology"),
      images: [
        applicationSceneImage(
          "/images/applications/mega-menu/synthetic-bioreactor.webp",
          t(
            "微型生物反应器",
            "Micro Bioreactor",
            "Micro Bioreactor",
            "Micro Bioreactor",
            "Micro Bioreactor",
            "Micro Bioreactor",
          ),
          t(
            "补料、取样、排液、清洗与过程状态监测",
            "Feeding, sampling, drainage, washing and process status monitoring",
            "Feeding, sampling, drainage, washing and process status monitoring",
            "Feeding, sampling, drainage, washing and process status monitoring",
            "Feeding, sampling, drainage, washing and process status monitoring",
            "Feeding, sampling, drainage, washing and process status monitoring",
          ),
          localizedPath("/applications/synthetic-biology?application=microBioreactor"),
        ),
        applicationSceneImage(
          "/images/applications/mega-menu/synthetic-high-throughput.webp",
          t(
            "自动化构建与筛选平台",
            "Automated Build & Screening Platform",
            "Automated Build & Screening Platform",
            "Automated Build & Screening Platform",
            "Automated Build & Screening Platform",
            "Automated Build & Screening Platform",
          ),
          t(
            "菌株构建、试剂分配、移液、清洗与高通量筛选",
            "Strain construction, reagent dispensing, pipetting, washing and high-throughput screening",
            "Strain construction, reagent dispensing, pipetting, washing and high-throughput screening",
            "Strain construction, reagent dispensing, pipetting, washing and high-throughput screening",
            "Strain construction, reagent dispensing, pipetting, washing and high-throughput screening",
            "Strain construction, reagent dispensing, pipetting, washing and high-throughput screening",
          ),
          localizedPath("/applications/synthetic-biology?application=biofoundry"),
        ),
        applicationSceneImage(
          "/images/applications/mega-menu/synthetic-auto-culture.webp",
          t(
            "补料与培养控制系统",
            "Feeding & Culture Control System",
            "Feeding & Culture Control System",
            "Feeding & Culture Control System",
            "Feeding & Culture Control System",
            "Feeding & Culture Control System",
          ),
          t(
            "培养基、诱导剂、缓冲液和添加液稳定补加",
            "Stable feeding of media, inducers, buffers and additives",
            "Stable feeding of media, inducers, buffers and additives",
            "Stable feeding of media, inducers, buffers and additives",
            "Stable feeding of media, inducers, buffers and additives",
            "Stable feeding of media, inducers, buffers and additives",
          ),
          localizedPath("/applications/synthetic-biology?application=feedingControl"),
        ),
        applicationSceneImage(
          "/images/applications/mega-menu/synthetic-microfluidic-platform.webp",
          t(
            "在线取样 / 过程分析系统",
            "Online Sampling / Process Analysis",
            "Online Sampling / Process Analysis",
            "Online Sampling / Process Analysis",
            "Online Sampling / Process Analysis",
            "Online Sampling / Process Analysis",
          ),
          t(
            "在线取样、样品转移、过滤保护与分析前处理",
            "Online sampling, sample transfer, filtration protection and analytical pretreatment",
            "Online sampling, sample transfer, filtration protection and analytical pretreatment",
            "Online sampling, sample transfer, filtration protection and analytical pretreatment",
            "Online sampling, sample transfer, filtration protection and analytical pretreatment",
            "Online sampling, sample transfer, filtration protection and analytical pretreatment",
          ),
          localizedPath("/applications/synthetic-biology?application=onlineSampling"),
        ),
        applicationSceneImage(
          "/images/applications/mega-menu/synthetic-continuous-flow.webp",
          t(
            "小型生物工艺系统集成",
            "Compact Bioprocess System Integration",
            "Compact Bioprocess System Integration",
            "Compact Bioprocess System Integration",
            "Compact Bioprocess System Integration",
            "Compact Bioprocess System Integration",
          ),
          t(
            "多泵、多阀、多路径液路集成与长期运行维护",
            "Multi-pump, multi-valve and multi-path fluidic integration for long-term operation",
            "Multi-pump, multi-valve and multi-path fluidic integration for long-term operation",
            "Multi-pump, multi-valve and multi-path fluidic integration for long-term operation",
            "Multi-pump, multi-valve and multi-path fluidic integration for long-term operation",
            "Multi-pump, multi-valve and multi-path fluidic integration for long-term operation",
          ),
          localizedPath("/applications/synthetic-biology?application=bioProcessIntegration"),
        ),
      ],
      order: 6,
      enabled: true,
    },
  ],

  footerText: t(
    "按应用场景、典型仪器和液路需求快速了解恒永达产品支持能力。",
    "Explore FOREACH product support by application scenario, instrument type, and fluidic requirement.",
    "Explore el soporte de productos FOREACH por aplicación, instrumento y requisito fluídico.",
    "Découvrez le support produit FOREACH par application, instrument et besoin fluidique.",
    "응용 분야, 장비 유형 및 유체 요구에 따른 FOREACH 제품 지원을 확인하세요.",
    "Изучайте поддержку продукции FOREACH по применению, приборам и жидкостным требованиям."
  ),

  footerLinkLabel: t(
    "查看全部应用领域 →",
    "View all applications →",
    "Ver todas las aplicaciones →",
    "Voir toutes les applications →",
    "전체 응용 분야 보기 →",
    "Все области применения →"
  ),

  footerHref: anchorPath("applications"),
};

/* ===== APPLICATION MEGA MENU DATA END ===== */

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

/* ================================
   联系与合作下拉栏数据

   说明：
   1. 中文站不显示这个下拉栏，只显示「联系我们」
   2. 外语站显示「Contact & Partnership」下拉栏
   3. 下拉栏包含：
      - Contact Us
      - Become a Distributor
================================ */

const contactPartnershipMegaDropdown: MegaDropdown = {
  heading: t(
    "联系与合作",
    "Contact & Partnership",
    "Contacto y cooperación",
    "Contact et partenariat",
    "문의 및 협력",
    "Контакты и сотрудничество"
  ),

  description: t(
    "联系恒永达，获取产品咨询、技术支持或合作机会。",
    "Contact FOREACH for product inquiries, technical support, or partnership opportunities.",
    "Contacte con FOREACH para consultas de productos, soporte técnico u oportunidades de cooperación.",
    "Contactez FOREACH pour vos demandes produits, votre support technique ou vos opportunités de partenariat.",
    "제품 문의, 기술 지원 또는 협력 기회를 위해 FOREACH에 문의하세요.",
    "Свяжитесь с FOREACH по вопросам продукции, технической поддержки или партнерства."
  ),

  categories: [
    {
      key: "contact-us",
      title: t(
        "联系我们",
        "Contact Us",
        "Contáctenos",
        "Contactez-nous",
        "문의하기",
        "Свяжитесь с нами"
      ),
      description: t(
        "产品咨询、技术支持、样品申请与项目沟通",
        "Product inquiries, technical support, sample requests, and project consultation",
        "Consultas de productos, soporte técnico, solicitudes de muestras y proyectos",
        "Demandes produits, support technique, échantillons et projets",
        "제품 문의, 기술 지원, 샘플 요청 및 프로젝트 상담",
        "Запросы по продукции, техническая поддержка, образцы и проекты"
      ),
      order: 1,
      enabled: true,
    },
    {
      key: "distributors",
      title: t(
        "经销商招募",
        "Become a Distributor",
        "Convertirse en distribuidor",
        "Devenir distributeur",
        "대리점 파트너십",
        "Стать дистрибьютором"
      ),
      description: t(
        "面向海外渠道伙伴、代理商与本地服务合作伙伴",
        "For overseas channel partners, distributors, and local service partners",
        "Para socios de canal, distribuidores y socios de servicio locales",
        "Pour les partenaires de distribution, revendeurs et services locaux",
        "해외 채널 파트너, 대리점 및 현지 서비스 파트너 대상",
        "Для зарубежных партнеров, дистрибьюторов и локальных сервисных партнеров"
      ),
      order: 2,
      enabled: true,
    },
  ],

  cards: [
    {
      key: "contact-us-card",
      categoryKey: "contact-us",
      title: t(
        "联系我们",
        "Contact Us",
        "Contáctenos",
        "Contactez-nous",
        "문의하기",
        "Свяжитесь с нами"
      ),
      description: t(
        "提交产品咨询、技术支持、样品申请、图纸或 BOM 需求。",
        "Submit product inquiries, technical support requests, sample requests, drawings, or BOM requirements.",
        "Envíe consultas de productos, soporte técnico, muestras, planos o requisitos de BOM.",
        "Envoyez vos demandes produits, support technique, échantillons, plans ou BOM.",
        "제품 문의, 기술 지원, 샘플 요청, 도면 또는 BOM 요구사항을 제출하세요.",
        "Отправьте запросы по продукции, поддержке, образцам, чертежам или BOM."
      ),
      href: t(
        "/contact",
        "/en/contact",
        "/es/contact",
        "/fr/contact",
        "/ko/contact",
        "/ru/contact"
      ),
      order: 1,
      enabled: true,
    },
    {
      key: "distributors-card",
      categoryKey: "distributors",
      title: t(
        "经销商招募",
        "Become a Distributor",
        "Convertirse en distribuidor",
        "Devenir distributeur",
        "대리점 파트너십",
        "Стать дистрибьютором"
      ),
      description: t(
        "了解恒永达海外渠道合作、代理支持与本地市场协同机会。",
        "Explore FOREACH distributor partnerships, channel support, and local market cooperation.",
        "Explore asociaciones de distribución, soporte de canal y cooperación local con FOREACH.",
        "Découvrez les partenariats distributeurs, le support réseau et la coopération locale avec FOREACH.",
        "FOREACH 대리점 파트너십, 채널 지원 및 현지 시장 협력 기회를 확인하세요.",
        "Узнайте о партнерстве с дистрибьюторами, поддержке каналов и локальном сотрудничестве FOREACH."
      ),
      href: t(
        "/contact",
        "/en/contact/distributor",
        "/es/contact/distributor",
        "/fr/contact/distributor",
        "/ko/contact/distributor",
        "/ru/contact/distributor"
      ),
      order: 2,
      enabled: true,
    },
  ],

  footerText: t(
    "选择合适的联系入口，恒永达团队将尽快跟进。",
    "Choose the right contact option and the FOREACH team will follow up shortly.",
    "Elija la opción de contacto adecuada y el equipo de FOREACH le responderá pronto.",
    "Choisissez l’option adaptée et l’équipe FOREACH vous répondra rapidement.",
    "적절한 문의 항목을 선택하시면 FOREACH 팀이 빠르게 연락드리겠습니다.",
    "Выберите подходящий способ связи, и команда FOREACH свяжется с вами."
  ),

  footerLinkLabel: t(
    "提交需求 →",
    "Submit an Inquiry →",
    "Enviar consulta →",
    "Envoyer une demande →",
    "문의 제출 →",
    "Отправить запрос →"
  ),

  footerHref: t(
    "/contact",
    "/en/contact",
    "/es/contact",
    "/fr/contact",
    "/ko/contact",
    "/ru/contact"
  ),
};

const contactPartnershipMobileChildren: MobileNavChild[] = [
  {
    key: "mobile-contact-us",
    label: t(
      "联系我们",
      "Contact Us",
      "Contáctenos",
      "Contactez-nous",
      "문의하기",
      "Свяжитесь с нами"
    ),
    href: t(
      "/contact",
      "/en/contact",
      "/es/contact",
      "/fr/contact",
      "/ko/contact",
      "/ru/contact"
    ),
    order: 1,
    enabled: true,
  },
  {
    key: "mobile-distributors",
    label: t(
      "经销商招募",
      "Become a Distributor",
      "Convertirse en distribuidor",
      "Devenir distributeur",
      "대리점 파트너십",
      "Стать дистрибьютором"
    ),
    href: t(
      "/contact",
      "/en/contact/distributor",
      "/es/contact/distributor",
      "/fr/contact/distributor",
      "/ko/contact/distributor",
      "/ru/contact/distributor"
    ),
    order: 2,
    enabled: true,
  },
];

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
    href: localizedPath("/products"),
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
    href: localizedPath("/applications/ivd"),
    order: 3,
    enabled: true,
    dropdownType: "mega",
    megaDropdown: applicationMegaDropdown,
    mobileChildren: createMobileChildrenFromMegaCategories(
      applicationMegaDropdown,
      "applications",
      "mobile-applications"
    ),
  },
  {
    key: "resources",
    label: t(
      "资源中心",
      "Resources",
      "Recursos",
      "Ressources",
      "자료실",
      "Ресурсы"
    ),

    /*
       资源中心一级入口

       说明：
       1. 当前资源中心首页如果还没完全做好，可以先指向规格书下载页
       2. 这样点击「资源中心」本身不会进入空页面或 404
       3. 后续资源中心首页 app/resources/page.tsx 完整做好后，
          可以改成 localizedPath("/resources")
    */
    href: localizedPath("/resources/datasheets"),

    order: 4,
    enabled: true,

    /*
       simple 表示使用简单下拉栏
       资源中心不使用产品中心那种 Mega Menu
    */
    dropdownType: "simple",

    /*
   资源中心下拉菜单

   重点：
   1. 这里不能再用 anchorPath("resources")
   2. 必须使用 localizedPath("/resources/xxx")
   3. 这样中文、英文、西语、法语、韩语、俄语都会生成正确路径
   4. 当前 simple 下拉栏只有一层，所以“接头替代查询”先直接作为入口展示
*/
    mobileChildren: [
      {
        key: "mobile-resource-datasheets",
        label: t(
          "规格书下载",
          "Datasheets",
          "Fichas técnicas",
          "Fiches techniques",
          "사양서 다운로드",
          "Спецификации"
        ),
        href: localizedPath("/resources/datasheets"),
        order: 1,
        enabled: true,
      },

      /* =========================================================
         接头替代查询
         说明：
         1. 作为资源中心下拉入口
         2. 当前 simple 下拉栏只有一层，所以直接显示
         3. 点击进入接头替代查询页面
         4. 后续如果做完整“选型支持”总页，可以再新增：
            /resources/selection-support
      ========================================================= */
      {
        key: "mobile-resource-fitting-replacement",
        label: t(
          "接头替代查询",
          "Fitting Replacement",
          "Sustitución de conectores",
          "Remplacement de raccords",
          "피팅 대체 조회",
          "Поиск аналогов фитингов"
        ),
        href: localizedPath("/resources/selection-support/fitting-replacement"),
        order: 2,
        enabled: true,
      },

      {
        key: "mobile-resource-installation-guide",
        label: t(
          "安装教程",
          "Installation Guides",
          "Guías de instalación",
          "Guides d’installation",
          "설치 가이드",
          "Инструкции по установке"
        ),
        href: localizedPath("/resources/installation-guide"),
        order: 3,
        enabled: true,
      },

      {
        key: "mobile-resource-material-compatibility",
        label: t(
          "材料兼容",
          "Material Compatibility",
          "Compatibilidad de materiales",
          "Compatibilité des matériaux",
          "소재 호환성",
          "Совместимость материалов"
        ),
        href: localizedPath("/resources/material-compatibility"),
        order: 4,
        enabled: true,
      },

      {
        key: "mobile-resource-faq",
        label: t(
          "技术文章",
          "Technical Articles",
          "Preguntas frecuentes",
          "Technical Articles",
          "자주 묻는 질문",
          "Часто задаваемые вопросы"
        ),
        href: localizedPath("/resources/technical-articles"),
        order: 5,
        enabled: true,
      },

      {
        key: "mobile-resource-news",
        label: t(
          "公司新闻",
          "Company News",
          "Noticias de la empresa",
          "Actualités de l’entreprise",
          "회사 뉴스",
          "Новости компании"
        ),
        href: localizedPath("/resources/news"),
        order: 6,
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
    href: {
      "zh-CN": "/about/foreach",
      en: "/en/about/foreach",
      es: "/es/about/foreach",
      fr: "/fr/about/foreach",
      ko: "/ko/about/foreach",
      ru: "/ru/about/foreach",
    },
    order: 5,
    enabled: true,

    // 说明：
    // 1. 这里改成 mega，PC 端顶部导航才会显示“关于我们”下拉栏
    // 2. 关于我们下拉栏的右侧样式由 app/globals.css 里的 .site-nav-mega-about 控制
    dropdownType: "mega",

    megaDropdown: {
      heading: t(
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
            "质量体系与合规认证",
            "Quality System and Compliance",
            "Sistema de calidad y certificaciones",
            "Système qualité et certifications",
            "품질 시스템 및 인증",
            "Система качества и сертификация"
          ),
          description: t(
            "质量体系、检测验证与合规认证",
            "Quality system, inspection validation and compliance certification",
            "Sistema de calidad, validación de inspección y certificaciones",
            "Système qualité, validation d’inspection et certifications",
            "품질 시스템, 검사 검증 및 인증",
            "Система качества, проверка и сертификация"
          ),
          order: 4,
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
          href: {
            "zh-CN": "/about/foreach",
            en: "/about/foreach?lang=en",
            es: "/about/foreach?lang=es",
            fr: "/about/foreach?lang=fr",
            ko: "/about/foreach?lang=ko",
            ru: "/about/foreach?lang=ru",
          },
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

          /*
            这里原来是 anchorPath("about")，表示跳到首页 about 锚点。
            现在要进入独立页面，所以改成研发与制造能力页面路径。
          */
          href: localizedPath("/about/research-manufacturing"),

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
            "质量体系与合规认证",
            "Quality System and Compliance",
            "Sistema de calidad y certificaciones",
            "Système qualité et certifications",
            "품질 시스템 및 인증",
            "Система качества и сертификация"
          ),
          description: t(
            "质量体系、检测验证与合规认证",
            "Quality system, inspection validation and compliance certification",
            "Sistema de calidad, validación de inspección y certificaciones",
            "Système qualité, validation d’inspection et certifications",
            "품질 시스템, 검사 검증 및 인증",
            "Система качества, проверка и сертификация"
          ),
          href: {
            "zh-CN": "/about/quality",
            en: "/en/about/quality",
            es: "/es/about/quality",
            fr: "/fr/about/quality",
            ko: "/ko/about/quality",
            ru: "/ru/about/quality",
          },
          order: 4,
          enabled: true,
          image: {
            src: "/images/about/quality-management.webp",
            alt: t(
              "恒永达质量体系与合规认证",
              "FOREACH quality system and compliance",
              "Sistema de calidad y certificaciones de FOREACH",
              "Système qualité et certifications de FOREACH",
              "FOREACH 품질 시스템 및 인증",
              "Система качества и сертификация FOREACH"
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
          // 说明：
          // 1. 发展历程页面已经单独建立
          // 2. 当前多语言详情页还没全部完成
          // 3. 所以所有语言暂时统一跳中文页面 /about/history
          href: {
            "zh-CN": "/about/history",
            en: "/en/about/history",
            es: "/es/about/history",
            fr: "/fr/about/history",
            ko: "/ko/about/history",
            ru: "/ru/about/history",
          },
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
        href: {
          "zh-CN": "/about/history",
          en: "/en/about/history",
          es: "/es/about/history",
          fr: "/fr/about/history",
          ko: "/ko/about/history",
          ru: "/ru/about/history",
        },
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
    label: t(
      "联系我们",
      "Contact & Partnership",
      "Contacto y cooperación",
      "Contact et partenariat",
      "문의 및 협력",
      "Контакты и сотрудничество"
    ),
    href: t(
      "/contact",
      "/en/contact",
      "/es/contact",
      "/fr/contact",
      "/ko/contact",
      "/ru/contact"
    ),
    order: 6,
    enabled: true,

    /*
       默认写 none。
       真正是否显示下拉，在 getVisibleNavigationItems(locale) 里根据语言动态处理：
       - 中文：none
       - 外语：mega
    */
    dropdownType: "none",
  },
];

export function getVisibleNavigationItems(locale = "zh-CN") {
  return navigationItems
    .filter((item) => item.enabled)
    .map((item) => {
      /*
         联系与合作特殊逻辑：

         中文站：
         - 顶部显示「联系我们」
         - 不显示下拉
         - 点击直接进入 /contact

         外语站：
         - 顶部显示「Contact & Partnership」
         - 显示下拉
         - 下拉包含 Contact Us 和 Become a Distributor
      */
      if (item.key !== "contact") {
        return item;
      }

      if (locale === "zh-CN") {
        return {
          ...item,
          dropdownType: "none" as const,
          megaDropdown: undefined,
          mobileChildren: undefined,
        };
      }

      return {
        ...item,
        dropdownType: "simple" as const,
        megaDropdown: undefined,
        mobileChildren: contactPartnershipMobileChildren,
      };
    })
    .sort((a, b) => a.order - b.order);
}

/* ================================
   统一导航语言代码

   作用：
   1. 有些地方传进来的语言可能是 es-ES / fr-FR / ko-KR / ru-RU
   2. 但 navigation.ts 里的 key 是 es / fr / ko / ru
   3. 所以这里统一转换一次
   4. 避免西语、法语、韩语、俄语拿不到 href 后回退到英文
================================ */

function normalizeNavigationLocale(locale: string) {
  const localeCode = String(locale || "").toLowerCase();

  if (
    localeCode === "zh-cn" ||
    localeCode === "zh" ||
    localeCode.startsWith("zh-")
  ) {
    return "zh-CN";
  }

  if (localeCode === "en" || localeCode.startsWith("en-")) {
    return "en";
  }

  if (localeCode === "es" || localeCode.startsWith("es-")) {
    return "es";
  }

  if (localeCode === "fr" || localeCode.startsWith("fr-")) {
    return "fr";
  }

  if (localeCode === "ko" || localeCode.startsWith("ko-")) {
    return "ko";
  }

  if (localeCode === "ru" || localeCode.startsWith("ru-")) {
    return "ru";
  }

  return "en";
}

/* ================================
   读取当前语言文本

   说明：
   这里不要直接用 text[locale]，
   要先把 es-ES / fr-FR 等转换成 es / fr。
================================ */

export function getLocalizedText(text: LocalizedText, locale: string) {
  const normalizedLocale = normalizeNavigationLocale(locale);

  return text[normalizedLocale] ?? text.en ?? text["zh-CN"] ?? "";
}

/* ================================
   读取当前语言链接

   说明：
   这里是资源中心跳转问题的关键。
   如果 locale 是 fr-FR，但 href 里只有 fr，
   不转换就会回退到英文。
================================ */

export function getLocalizedHref(href: LocalizedHref, locale: string) {
  const normalizedLocale = normalizeNavigationLocale(locale);

  return href[normalizedLocale] ?? href.en ?? href["zh-CN"] ?? "/";
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
        : "连续定量输送与比例加液",
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
      title: useEnglish ? "Valveless Pump" : "无阀泵",
      description: useEnglish
        ? "Continuous metering and proportional dispensing"
        : "连续定量输送与比例加液",
    };
  }

  return {
    title: useEnglish ? "Product" : "产品",
    description: useEnglish
      ? "Fluidic component for microfluidic systems"
      : "用于微流体液路系统的核心部件",
  };
}
