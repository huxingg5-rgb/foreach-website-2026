# 接头 Mega Menu 点击跳转结构检查

生成时间：2026/7/13 11:51:15

## 一、目标跳转

- 硬管接头 → `/products/fittings/hard-tube-fittings`
- 倒刺接头 → `/products/fittings/barbed-fittings`
- 螺纹转倒刺接头 → `/products/fittings/thread-to-barbed-fittings`
- 鲁尔接头 → `/products/fittings/luer-fittings`
- 快插接头 → `/products/fittings/quick-connect-fittings`
- 内螺纹互转接头 → `/products/fittings/female-thread-adapters`
- 穿板倒刺接头 → `/products/fittings/bulkhead-barbed-fittings`
- 过滤器与单向阀 → `/products/fittings/filters`

## 二、data/navigation.ts 中 productImage 与接头卡片

### 第262行附近

```ts
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
```

### 第403行附近

```ts
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
```

### 第452行附近

```ts

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
```

### 第482行附近

```ts
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
        productImage("/images/products/FIT/For rigid tubing_200x200_01_v001.jpg", t("硬管接头", "Hard Tube Fittings", "Racores para tubos rígidos", "Raccords pour tubes rigides", "경질 튜브 피팅", "Фитинги для жестких трубок"), t("用于硬管连接与精密液路固定", "For rigid tubing connection and precise fluidic assembly", "Para conexión de tubos rígidos y montaje preciso", "Pour connexion de tubes rigides et assemblage fluidique précis", "경질 튜브 연결 및 정밀 유체 조립용", "Для соединения жестких трубок и точной сборки")),
        productImage("/images/products/FIT/Barbed connector_200x200_01_v001.jpg", t("倒刺接头", "Barbed Fittings", "Racores de espiga", "Raccords cannelés", "바브 피팅", "Штуцерные фитинги"), t("用于软管连接与低压液路装配", "For flexible tubing connection and low-pressure fluid paths", "Para conexión de tubos flexibles y líneas de baja presión", "Pour connexion de tubes souples et circuits basse pression", "연질 튜브 연결 및 저압 유로용", "Для соединения гибких трубок и низкого давления")),
        productImage("/images/products/FIT/Thread with barb_200x200_01_v001.jpg", t("螺纹转倒刺接头", "Thread-to-Barbed Fittings", "Adaptadores roscados a espiga", "Raccords filetés vers cannelés", "나사-바브 피팅", "Резьбовые штуцерные переходники"), t("用于螺纹接口与软管之间的液路转接", "For transition between threaded ports and flexible tubing", "Para transición entre puertos roscados y tubos flexibles", "Pour la transition entre ports filetés et tubes souples", "나사 포트와 연질 튜브 사이의 전환 연결", "Для перехода между резьбовыми портами и гибкими трубками")),
        productImage("/images/products/FIT/Luer fitting_200x200_01_v001.jpg", t("鲁尔接头", "Luer Fittings", "Racores Luer", "Raccords Luer", "루어 피팅", "Фитинги Luer"), t("适合标准鲁尔接口连接", "For standard Luer interface connection", "Para conexión de interfaz Luer estándar", "Pour connexion d’interface Luer standard", "표준 루어 인터페이스 연결용", "Для стандартного соединения Luer")),
        productImage("/images/products/FIT/Quick connector_200x200_01_v001.jpg", t("快插接头", "Quick-Connect Fittings", "Racores de conexión rápida", "Raccords rapides", "퀵 커넥트 피팅", "Быстроразъемные фитинги"), t("快速连接与拆卸，提高装配效率", "Quick connection and disconnection for efficient assembly", "Conexión y desconexión rápidas para un montaje eficiente", "Connexion et déconnexion rapides pour un assemblage efficace", "빠른 연결과 분리로 조립 효율 향상", "Быстрое соединение и разъединение для эффективной сборки")),
        productImage("/images/products/FIT/Union_200x200_01_v001.jpg", t("内螺纹互转接头", "Female Thread Adapters", "Adaptadores de rosca hembra", "Adaptateurs à filetage femelle", "암나사 어댑터", "Переходники с внутренней резьбой"), t("用于不同内螺纹接口之间的液路转接", "For fluidic transition between female threaded ports", "Para transición de fluidos entre puertos de rosca hembra", "Pour la transition fluidique entre ports à filetage femelle", "암나사 포트 사이의 유로 전환용", "Для перехода между портами с внутренней резьбой")),
        productImage("/images/products/FIT/Panel mountunion_200x200_01_v001.jpg", t("穿板倒刺接头", "Bulkhead Barbed Fittings", "Racores de espiga para panel", "Raccords cannelés traversée de cloison", "패널 마운트 바브 피팅", "Панельные штуцерные фитинги"), t("用于面板穿板安装与软管连接", "For panel mounting and flexible tubing connection", "Para montaje en panel y conexión de tubos flexibles", "Pour montage sur panneau et connexion de tubes souples", "패널 관통 설치 및 연질 튜브 연결용", "Для панельного монтажа и соединения гибких трубок")),
        productImage("/images/products/FIT/Filter - Check valve_200x200_01_v001.jpg", t("过滤器与单向阀", "Filters & Check Valves", "Filtros y válvulas de retención", "Filtres et clapets anti-retour", "필터 및 체크 밸브", "Фильтры и обратные клапаны"), t("用于颗粒过滤与单向止回控制", "For particle filtration and one-way flow control", "Para filtración de partículas y control de flujo unidireccional", "Pour filtration des particules et contrôle du débit unidirectionnel", "입자 여과 및 단방향 유동 제어용", "Для фильтрации частиц и управления односторонним потоком")),
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
```

### 第493行附近

```ts
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
        productImage("/images/products/FIT/For rigid tubing_200x200_01_v001.jpg", t("硬管接头", "Hard Tube Fittings", "Racores para tubos rígidos", "Raccords pour tubes rigides", "경질 튜브 피팅", "Фитинги для жестких трубок"), t("用于硬管连接与精密液路固定", "For rigid tubing connection and precise fluidic assembly", "Para conexión de tubos rígidos y montaje preciso", "Pour connexion de tubes rigides et assemblage fluidique précis", "경질 튜브 연결 및 정밀 유체 조립용", "Для соединения жестких трубок и точной сборки")),
        productImage("/images/products/FIT/Barbed connector_200x200_01_v001.jpg", t("倒刺接头", "Barbed Fittings", "Racores de espiga", "Raccords cannelés", "바브 피팅", "Штуцерные фитинги"), t("用于软管连接与低压液路装配", "For flexible tubing connection and low-pressure fluid paths", "Para conexión de tubos flexibles y líneas de baja presión", "Pour connexion de tubes souples et circuits basse pression", "연질 튜브 연결 및 저압 유로용", "Для соединения гибких трубок и низкого давления")),
        productImage("/images/products/FIT/Thread with barb_200x200_01_v001.jpg", t("螺纹转倒刺接头", "Thread-to-Barbed Fittings", "Adaptadores roscados a espiga", "Raccords filetés vers cannelés", "나사-바브 피팅", "Резьбовые штуцерные переходники"), t("用于螺纹接口与软管之间的液路转接", "For transition between threaded ports and flexible tubing", "Para transición entre puertos roscados y tubos flexibles", "Pour la transition entre ports filetés et tubes souples", "나사 포트와 연질 튜브 사이의 전환 연결", "Для перехода между резьбовыми портами и гибкими трубками")),
        productImage("/images/products/FIT/Luer fitting_200x200_01_v001.jpg", t("鲁尔接头", "Luer Fittings", "Racores Luer", "Raccords Luer", "루어 피팅", "Фитинги Luer"), t("适合标准鲁尔接口连接", "For standard Luer interface connection", "Para conexión de interfaz Luer estándar", "Pour connexion d’interface Luer standard", "표준 루어 인터페이스 연결용", "Для стандартного соединения Luer")),
        productImage("/images/products/FIT/Quick connector_200x200_01_v001.jpg", t("快插接头", "Quick-Connect Fittings", "Racores de conexión rápida", "Raccords rapides", "퀵 커넥트 피팅", "Быстроразъемные фитинги"), t("快速连接与拆卸，提高装配效率", "Quick connection and disconnection for efficient assembly", "Conexión y desconexión rápidas para un montaje eficiente", "Connexion et déconnexion rapides pour un assemblage efficace", "빠른 연결과 분리로 조립 효율 향상", "Быстрое соединение и разъединение для эффективной сборки")),
        productImage("/images/products/FIT/Union_200x200_01_v001.jpg", t("内螺纹互转接头", "Female Thread Adapters", "Adaptadores de rosca hembra", "Adaptateurs à filetage femelle", "암나사 어댑터", "Переходники с внутренней резьбой"), t("用于不同内螺纹接口之间的液路转接", "For fluidic transition between female threaded ports", "Para transición de fluidos entre puertos de rosca hembra", "Pour la transition fluidique entre ports à filetage femelle", "암나사 포트 사이의 유로 전환용", "Для перехода между портами с внутренней резьбой")),
        productImage("/images/products/FIT/Panel mountunion_200x200_01_v001.jpg", t("穿板倒刺接头", "Bulkhead Barbed Fittings", "Racores de espiga para panel", "Raccords cannelés traversée de cloison", "패널 마운트 바브 피팅", "Панельные штуцерные фитинги"), t("用于面板穿板安装与软管连接", "For panel mounting and flexible tubing connection", "Para montaje en panel y conexión de tubos flexibles", "Pour montage sur panneau et connexion de tubes souples", "패널 관통 설치 및 연질 튜브 연결용", "Для панельного монтажа и соединения гибких трубок")),
        productImage("/images/products/FIT/Filter - Check valve_200x200_01_v001.jpg", t("过滤器与单向阀", "Filters & Check Valves", "Filtros y válvulas de retención", "Filtres et clapets anti-retour", "필터 및 체크 밸브", "Фильтры и обратные клапаны"), t("用于颗粒过滤与单向止回控制", "For particle filtration and one-way flow control", "Para filtración de partículas y control de flujo unidireccional", "Pour filtration des particules et contrôle du débit unidirectionnel", "입자 여과 및 단방향 유동 제어용", "Для фильтрации частиц и управления односторонним потоком")),
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
```

### 第498行附近

```ts
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
        productImage("/images/products/FIT/For rigid tubing_200x200_01_v001.jpg", t("硬管接头", "Hard Tube Fittings", "Racores para tubos rígidos", "Raccords pour tubes rigides", "경질 튜브 피팅", "Фитинги для жестких трубок"), t("用于硬管连接与精密液路固定", "For rigid tubing connection and precise fluidic assembly", "Para conexión de tubos rígidos y montaje preciso", "Pour connexion de tubes rigides et assemblage fluidique précis", "경질 튜브 연결 및 정밀 유체 조립용", "Для соединения жестких трубок и точной сборки")),
        productImage("/images/products/FIT/Barbed connector_200x200_01_v001.jpg", t("倒刺接头", "Barbed Fittings", "Racores de espiga", "Raccords cannelés", "바브 피팅", "Штуцерные фитинги"), t("用于软管连接与低压液路装配", "For flexible tubing connection and low-pressure fluid paths", "Para conexión de tubos flexibles y líneas de baja presión", "Pour connexion de tubes souples et circuits basse pression", "연질 튜브 연결 및 저압 유로용", "Для соединения гибких трубок и низкого давления")),
        productImage("/images/products/FIT/Thread with barb_200x200_01_v001.jpg", t("螺纹转倒刺接头", "Thread-to-Barbed Fittings", "Adaptadores roscados a espiga", "Raccords filetés vers cannelés", "나사-바브 피팅", "Резьбовые штуцерные переходники"), t("用于螺纹接口与软管之间的液路转接", "For transition between threaded ports and flexible tubing", "Para transición entre puertos roscados y tubos flexibles", "Pour la transition entre ports filetés et tubes souples", "나사 포트와 연질 튜브 사이의 전환 연결", "Для перехода между резьбовыми портами и гибкими трубками")),
        productImage("/images/products/FIT/Luer fitting_200x200_01_v001.jpg", t("鲁尔接头", "Luer Fittings", "Racores Luer", "Raccords Luer", "루어 피팅", "Фитинги Luer"), t("适合标准鲁尔接口连接", "For standard Luer interface connection", "Para conexión de interfaz Luer estándar", "Pour connexion d’interface Luer standard", "표준 루어 인터페이스 연결용", "Для стандартного соединения Luer")),
        productImage("/images/products/FIT/Quick connector_200x200_01_v001.jpg", t("快插接头", "Quick-Connect Fittings", "Racores de conexión rápida", "Raccords rapides", "퀵 커넥트 피팅", "Быстроразъемные фитинги"), t("快速连接与拆卸，提高装配效率", "Quick connection and disconnection for efficient assembly", "Conexión y desconexión rápidas para un montaje eficiente", "Connexion et déconnexion rapides pour un assemblage efficace", "빠른 연결과 분리로 조립 효율 향상", "Быстрое соединение и разъединение для эффективной сборки")),
        productImage("/images/products/FIT/Union_200x200_01_v001.jpg", t("内螺纹互转接头", "Female Thread Adapters", "Adaptadores de rosca hembra", "Adaptateurs à filetage femelle", "암나사 어댑터", "Переходники с внутренней резьбой"), t("用于不同内螺纹接口之间的液路转接", "For fluidic transition between female threaded ports", "Para transición de fluidos entre puertos de rosca hembra", "Pour la transition fluidique entre ports à filetage femelle", "암나사 포트 사이의 유로 전환용", "Для перехода между портами с внутренней резьбой")),
        productImage("/images/products/FIT/Panel mountunion_200x200_01_v001.jpg", t("穿板倒刺接头", "Bulkhead Barbed Fittings", "Racores de espiga para panel", "Raccords cannelés traversée de cloison", "패널 마운트 바브 피팅", "Панельные штуцерные фитинги"), t("用于面板穿板安装与软管连接", "For panel mounting and flexible tubing connection", "Para montaje en panel y conexión de tubos flexibles", "Pour montage sur panneau et connexion de tubes souples", "패널 관통 설치 및 연질 튜브 연결용", "Для панельного монтажа и соединения гибких трубок")),
        productImage("/images/products/FIT/Filter - Check valve_200x200_01_v001.jpg", t("过滤器与单向阀", "Filters & Check Valves", "Filtros y válvulas de retención", "Filtres et clapets anti-retour", "필터 및 체크 밸브", "Фильтры и обратные клапаны"), t("用于颗粒过滤与单向止回控制", "For particle filtration and one-way flow control", "Para filtración de partículas y control de flujo unidireccional", "Pour filtration des particules et contrôle du débit unidirectionnel", "입자 여과 및 단방향 유동 제어용", "Для фильтрации частиц и управления односторонним потоком")),
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
```

### 第518行附近

```ts
        productImage("/images/products/FIT/Union_200x200_01_v001.jpg", t("内螺纹互转接头", "Female Thread Adapters", "Adaptadores de rosca hembra", "Adaptateurs à filetage femelle", "암나사 어댑터", "Переходники с внутренней резьбой"), t("用于不同内螺纹接口之间的液路转接", "For fluidic transition between female threaded ports", "Para transición de fluidos entre puertos de rosca hembra", "Pour la transition fluidique entre ports à filetage femelle", "암나사 포트 사이의 유로 전환용", "Для перехода между портами с внутренней резьбой")),
        productImage("/images/products/FIT/Panel mountunion_200x200_01_v001.jpg", t("穿板倒刺接头", "Bulkhead Barbed Fittings", "Racores de espiga para panel", "Raccords cannelés traversée de cloison", "패널 마운트 바브 피팅", "Панельные штуцерные фитинги"), t("用于面板穿板安装与软管连接", "For panel mounting and flexible tubing connection", "Para montaje en panel y conexión de tubos flexibles", "Pour montage sur panneau et connexion de tubes souples", "패널 관통 설치 및 연질 튜브 연결용", "Для панельного монтажа и соединения гибких трубок")),
        productImage("/images/products/FIT/Filter - Check valve_200x200_01_v001.jpg", t("过滤器与单向阀", "Filters & Check Valves", "Filtros y válvulas de retención", "Filtres et clapets anti-retour", "필터 및 체크 밸브", "Фильтры и обратные клапаны"), t("用于颗粒过滤与单向止回控制", "For particle filtration and one-way flow control", "Para filtración de partículas y control de flujo unidireccional", "Pour filtration des particules et contrôle du débit unidirectionnel", "입자 여과 및 단방향 유동 제어용", "Для фильтрации частиц и управления односторонним потоком")),
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
```

### 第615行附近

```ts

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
```

### 第814行附近

```ts
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
```

### 第838行附近

```ts

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
```

### 第957行附近

```ts

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
```

### 第1076行附近

```ts

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
```

### 第1195行附近

```ts

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
```

### 第1314行附近

```ts

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
```

## 三、接头8张卡片当前定义

### 第349行附近

```ts
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
```

### 第499行附近

```ts

    {
      key: "fittings-card",
      categoryKey: "fittings",
      title: t("接头系列", "Fitting Series", "Series de racores", "Séries de raccords", "피팅 시리즈", "Серии фитингов"),
      description: t("接头、转接件、快插连接与定制管路组件", "Connectors, adapters, quick connectors, and custom tubing assemblies", "Conectores, adaptadores, conectores rápidos y conjuntos de tubos personalizados", "Connecteurs, adaptateurs, connecteurs rapides et assemblages de tubes personnalisés", "커넥터, 어댑터, 퀵 커넥터 및 맞춤형 튜빙 어셈블리", "Соединители, адаптеры, быстроразъемные соединители и индивидуальные трубные сборки"),
      href: anchorPath("products"),
      images: [
        productImage("/images/products/FIT/For rigid tubing_200x200_01_v001.jpg", t("硬管接头", "Hard Tube Fittings", "Racores para tubos rígidos", "Raccords pour tubes rigides", "경질 튜브 피팅", "Фитинги для жестких трубок"), t("用于硬管连接与精密液路固定", "For rigid tubing connection and precise fluidic assembly", "Para conexión de tubos rígidos y montaje preciso", "Pour connexion de tubes rigides et assemblage fluidique précis", "경질 튜브 연결 및 정밀 유체 조립용", "Для соединения жестких трубок и точной сборки")),
        productImage("/images/products/FIT/Barbed connector_200x200_01_v001.jpg", t("倒刺接头", "Barbed Fittings", "Racores de espiga", "Raccords cannelés", "바브 피팅", "Штуцерные фитинги"), t("用于软管连接与低压液路装配", "For flexible tubing connection and low-pressure fluid paths", "Para conexión de tubos flexibles y líneas de baja presión", "Pour connexion de tubes souples et circuits basse pression", "연질 튜브 연결 및 저압 유로용", "Для соединения гибких трубок и низкого давления")),
        productImage("/images/products/FIT/Thread with barb_200x200_01_v001.jpg", t("螺纹转倒刺接头", "Thread-to-Barbed Fittings", "Adaptadores roscados a espiga", "Raccords filetés vers cannelés", "나사-바브 피팅", "Резьбовые штуцерные переходники"), t("用于螺纹接口与软管之间的液路转接", "For transition between threaded ports and flexible tubing", "Para transición entre puertos roscados y tubos flexibles", "Pour la transition entre ports filetés et tubes souples", "나사 포트와 연질 튜브 사이의 전환 연결", "Для перехода между резьбовыми портами и гибкими трубками")),
        productImage("/images/products/FIT/Luer fitting_200x200_01_v001.jpg", t("鲁尔接头", "Luer Fittings", "Racores Luer", "Raccords Luer", "루어 피팅", "Фитинги Luer"), t("适合标准鲁尔接口连接", "For standard Luer interface connection", "Para conexión de interfaz Luer estándar", "Pour connexion d’interface Luer standard", "표준 루어 인터페이스 연결용", "Для стандартного соединения Luer")),
        productImage("/images/products/FIT/Quick connector_200x200_01_v001.jpg", t("快插接头", "Quick-Connect Fittings", "Racores de conexión rápida", "Raccords rapides", "퀵 커넥트 피팅", "Быстроразъемные фитинги"), t("快速连接与拆卸，提高装配效率", "Quick connection and disconnection for efficient assembly", "Conexión y desconexión rápidas para un montaje eficiente", "Connexion et déconnexion rapides pour un assemblage efficace", "빠른 연결과 분리로 조립 효율 향상", "Быстрое соединение и разъединение для эффективной сборки")),
        productImage("/images/products/FIT/Union_200x200_01_v001.jpg", t("内螺纹互转接头", "Female Thread Adapters", "Adaptadores de rosca hembra", "Adaptateurs à filetage femelle", "암나사 어댑터", "Переходники с внутренней резьбой"), t("用于不同内螺纹接口之间的液路转接", "For fluidic transition between female threaded ports", "Para transición de fluidos entre puertos de rosca hembra", "Pour la transition fluidique entre ports à filetage femelle", "암나사 포트 사이의 유로 전환용", "Для перехода между портами с внутренней резьбой")),
        productImage("/images/products/FIT/Panel mountunion_200x200_01_v001.jpg", t("穿板倒刺接头", "Bulkhead Barbed Fittings", "Racores de espiga para panel", "Raccords cannelés traversée de cloison", "패널 마운트 바브 피팅", "Панельные штуцерные фитинги"), t("用于面板穿板安装与软管连接", "For panel mounting and flexible tubing connection", "Para montaje en panel y conexión de tubos flexibles", "Pour montage sur panneau et connexion de tubes souples", "패널 관통 설치 및 연질 튜브 연결용", "Для панельного монтажа и соединения гибких трубок")),
        productImage("/images/products/FIT/Filter - Check valve_200x200_01_v001.jpg", t("过滤器与单向阀", "Filters & Check Valves", "Filtros y válvulas de retención", "Filtres et clapets anti-retour", "필터 및 체크 밸브", "Фильтры и обратные клапаны"), t("用于颗粒过滤与单向止回控制", "For particle filtration and one-way flow control", "Para filtración de partículas y control de flujo unidireccional", "Pour filtration des particules et contrôle du débit unidirectionnel", "입자 여과 및 단방향 유동 제어용", "Для фильтрации частиц и управления односторонним потоком")),
      ],
      order: 4,
      enabled: true,
    },

    {
      key: "tubing-card",
      categoryKey: "tubing",
      title: t("管路系列", "Tubing Series", "Series de tubos", "Séries de tubes", "튜빙 시리즈", "Серии трубок"),
```

### 第500行附近

```ts
    {
      key: "fittings-card",
      categoryKey: "fittings",
      title: t("接头系列", "Fitting Series", "Series de racores", "Séries de raccords", "피팅 시리즈", "Серии фитингов"),
      description: t("接头、转接件、快插连接与定制管路组件", "Connectors, adapters, quick connectors, and custom tubing assemblies", "Conectores, adaptadores, conectores rápidos y conjuntos de tubos personalizados", "Connecteurs, adaptateurs, connecteurs rapides et assemblages de tubes personnalisés", "커넥터, 어댑터, 퀵 커넥터 및 맞춤형 튜빙 어셈블리", "Соединители, адаптеры, быстроразъемные соединители и индивидуальные трубные сборки"),
      href: anchorPath("products"),
      images: [
        productImage("/images/products/FIT/For rigid tubing_200x200_01_v001.jpg", t("硬管接头", "Hard Tube Fittings", "Racores para tubos rígidos", "Raccords pour tubes rigides", "경질 튜브 피팅", "Фитинги для жестких трубок"), t("用于硬管连接与精密液路固定", "For rigid tubing connection and precise fluidic assembly", "Para conexión de tubos rígidos y montaje preciso", "Pour connexion de tubes rigides et assemblage fluidique précis", "경질 튜브 연결 및 정밀 유체 조립용", "Для соединения жестких трубок и точной сборки")),
        productImage("/images/products/FIT/Barbed connector_200x200_01_v001.jpg", t("倒刺接头", "Barbed Fittings", "Racores de espiga", "Raccords cannelés", "바브 피팅", "Штуцерные фитинги"), t("用于软管连接与低压液路装配", "For flexible tubing connection and low-pressure fluid paths", "Para conexión de tubos flexibles y líneas de baja presión", "Pour connexion de tubes souples et circuits basse pression", "연질 튜브 연결 및 저압 유로용", "Для соединения гибких трубок и низкого давления")),
        productImage("/images/products/FIT/Thread with barb_200x200_01_v001.jpg", t("螺纹转倒刺接头", "Thread-to-Barbed Fittings", "Adaptadores roscados a espiga", "Raccords filetés vers cannelés", "나사-바브 피팅", "Резьбовые штуцерные переходники"), t("用于螺纹接口与软管之间的液路转接", "For transition between threaded ports and flexible tubing", "Para transición entre puertos roscados y tubos flexibles", "Pour la transition entre ports filetés et tubes souples", "나사 포트와 연질 튜브 사이의 전환 연결", "Для перехода между резьбовыми портами и гибкими трубками")),
        productImage("/images/products/FIT/Luer fitting_200x200_01_v001.jpg", t("鲁尔接头", "Luer Fittings", "Racores Luer", "Raccords Luer", "루어 피팅", "Фитинги Luer"), t("适合标准鲁尔接口连接", "For standard Luer interface connection", "Para conexión de interfaz Luer estándar", "Pour connexion d’interface Luer standard", "표준 루어 인터페이스 연결용", "Для стандартного соединения Luer")),
        productImage("/images/products/FIT/Quick connector_200x200_01_v001.jpg", t("快插接头", "Quick-Connect Fittings", "Racores de conexión rápida", "Raccords rapides", "퀵 커넥트 피팅", "Быстроразъемные фитинги"), t("快速连接与拆卸，提高装配效率", "Quick connection and disconnection for efficient assembly", "Conexión y desconexión rápidas para un montaje eficiente", "Connexion et déconnexion rapides pour un assemblage efficace", "빠른 연결과 분리로 조립 효율 향상", "Быстрое соединение и разъединение для эффективной сборки")),
        productImage("/images/products/FIT/Union_200x200_01_v001.jpg", t("内螺纹互转接头", "Female Thread Adapters", "Adaptadores de rosca hembra", "Adaptateurs à filetage femelle", "암나사 어댑터", "Переходники с внутренней резьбой"), t("用于不同内螺纹接口之间的液路转接", "For fluidic transition between female threaded ports", "Para transición de fluidos entre puertos de rosca hembra", "Pour la transition fluidique entre ports à filetage femelle", "암나사 포트 사이의 유로 전환용", "Для перехода между портами с внутренней резьбой")),
        productImage("/images/products/FIT/Panel mountunion_200x200_01_v001.jpg", t("穿板倒刺接头", "Bulkhead Barbed Fittings", "Racores de espiga para panel", "Raccords cannelés traversée de cloison", "패널 마운트 바브 피팅", "Панельные штуцерные фитинги"), t("用于面板穿板安装与软管连接", "For panel mounting and flexible tubing connection", "Para montaje en panel y conexión de tubos flexibles", "Pour montage sur panneau et connexion de tubes souples", "패널 관통 설치 및 연질 튜브 연결용", "Для панельного монтажа и соединения гибких трубок")),
        productImage("/images/products/FIT/Filter - Check valve_200x200_01_v001.jpg", t("过滤器与单向阀", "Filters & Check Valves", "Filtros y válvulas de retención", "Filtres et clapets anti-retour", "필터 및 체크 밸브", "Фильтры и обратные клапаны"), t("用于颗粒过滤与单向止回控制", "For particle filtration and one-way flow control", "Para filtración de partículas y control de flujo unidireccional", "Pour filtration des particules et contrôle du débit unidirectionnel", "입자 여과 및 단방향 유동 제어용", "Для фильтрации частиц и управления односторонним потоком")),
      ],
      order: 4,
      enabled: true,
    },

    {
      key: "tubing-card",
      categoryKey: "tubing",
      title: t("管路系列", "Tubing Series", "Series de tubos", "Séries de tubes", "튜빙 시리즈", "Серии трубок"),
      description: t("软管、硬管与液路管线", "Flexible tubing, rigid tubing, and fluid lines", "Tubos flexibles, tubos rígidos y líneas de fluido", "Tubes souples, tubes rigides et lignes fluidiques", "플렉시블 튜빙, 리지드 튜빙 및 유체 라인", "Гибкие трубки, жесткие трубки и жидкостные линии"),
```

### 第501行附近

```ts
      key: "fittings-card",
      categoryKey: "fittings",
      title: t("接头系列", "Fitting Series", "Series de racores", "Séries de raccords", "피팅 시리즈", "Серии фитингов"),
      description: t("接头、转接件、快插连接与定制管路组件", "Connectors, adapters, quick connectors, and custom tubing assemblies", "Conectores, adaptadores, conectores rápidos y conjuntos de tubos personalizados", "Connecteurs, adaptateurs, connecteurs rapides et assemblages de tubes personnalisés", "커넥터, 어댑터, 퀵 커넥터 및 맞춤형 튜빙 어셈블리", "Соединители, адаптеры, быстроразъемные соединители и индивидуальные трубные сборки"),
      href: anchorPath("products"),
      images: [
        productImage("/images/products/FIT/For rigid tubing_200x200_01_v001.jpg", t("硬管接头", "Hard Tube Fittings", "Racores para tubos rígidos", "Raccords pour tubes rigides", "경질 튜브 피팅", "Фитинги для жестких трубок"), t("用于硬管连接与精密液路固定", "For rigid tubing connection and precise fluidic assembly", "Para conexión de tubos rígidos y montaje preciso", "Pour connexion de tubes rigides et assemblage fluidique précis", "경질 튜브 연결 및 정밀 유체 조립용", "Для соединения жестких трубок и точной сборки")),
        productImage("/images/products/FIT/Barbed connector_200x200_01_v001.jpg", t("倒刺接头", "Barbed Fittings", "Racores de espiga", "Raccords cannelés", "바브 피팅", "Штуцерные фитинги"), t("用于软管连接与低压液路装配", "For flexible tubing connection and low-pressure fluid paths", "Para conexión de tubos flexibles y líneas de baja presión", "Pour connexion de tubes souples et circuits basse pression", "연질 튜브 연결 및 저압 유로용", "Для соединения гибких трубок и низкого давления")),
        productImage("/images/products/FIT/Thread with barb_200x200_01_v001.jpg", t("螺纹转倒刺接头", "Thread-to-Barbed Fittings", "Adaptadores roscados a espiga", "Raccords filetés vers cannelés", "나사-바브 피팅", "Резьбовые штуцерные переходники"), t("用于螺纹接口与软管之间的液路转接", "For transition between threaded ports and flexible tubing", "Para transición entre puertos roscados y tubos flexibles", "Pour la transition entre ports filetés et tubes souples", "나사 포트와 연질 튜브 사이의 전환 연결", "Для перехода между резьбовыми портами и гибкими трубками")),
        productImage("/images/products/FIT/Luer fitting_200x200_01_v001.jpg", t("鲁尔接头", "Luer Fittings", "Racores Luer", "Raccords Luer", "루어 피팅", "Фитинги Luer"), t("适合标准鲁尔接口连接", "For standard Luer interface connection", "Para conexión de interfaz Luer estándar", "Pour connexion d’interface Luer standard", "표준 루어 인터페이스 연결용", "Для стандартного соединения Luer")),
        productImage("/images/products/FIT/Quick connector_200x200_01_v001.jpg", t("快插接头", "Quick-Connect Fittings", "Racores de conexión rápida", "Raccords rapides", "퀵 커넥트 피팅", "Быстроразъемные фитинги"), t("快速连接与拆卸，提高装配效率", "Quick connection and disconnection for efficient assembly", "Conexión y desconexión rápidas para un montaje eficiente", "Connexion et déconnexion rapides pour un assemblage efficace", "빠른 연결과 분리로 조립 효율 향상", "Быстрое соединение и разъединение для эффективной сборки")),
        productImage("/images/products/FIT/Union_200x200_01_v001.jpg", t("内螺纹互转接头", "Female Thread Adapters", "Adaptadores de rosca hembra", "Adaptateurs à filetage femelle", "암나사 어댑터", "Переходники с внутренней резьбой"), t("用于不同内螺纹接口之间的液路转接", "For fluidic transition between female threaded ports", "Para transición de fluidos entre puertos de rosca hembra", "Pour la transition fluidique entre ports à filetage femelle", "암나사 포트 사이의 유로 전환용", "Для перехода между портами с внутренней резьбой")),
        productImage("/images/products/FIT/Panel mountunion_200x200_01_v001.jpg", t("穿板倒刺接头", "Bulkhead Barbed Fittings", "Racores de espiga para panel", "Raccords cannelés traversée de cloison", "패널 마운트 바브 피팅", "Панельные штуцерные фитинги"), t("用于面板穿板安装与软管连接", "For panel mounting and flexible tubing connection", "Para montaje en panel y conexión de tubos flexibles", "Pour montage sur panneau et connexion de tubes souples", "패널 관통 설치 및 연질 튜브 연결용", "Для панельного монтажа и соединения гибких трубок")),
        productImage("/images/products/FIT/Filter - Check valve_200x200_01_v001.jpg", t("过滤器与单向阀", "Filters & Check Valves", "Filtros y válvulas de retención", "Filtres et clapets anti-retour", "필터 및 체크 밸브", "Фильтры и обратные клапаны"), t("用于颗粒过滤与单向止回控制", "For particle filtration and one-way flow control", "Para filtración de partículas y control de flujo unidireccional", "Pour filtration des particules et contrôle du débit unidirectionnel", "입자 여과 및 단방향 유동 제어용", "Для фильтрации частиц и управления односторонним потоком")),
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
```

### 第502行附近

```ts
      categoryKey: "fittings",
      title: t("接头系列", "Fitting Series", "Series de racores", "Séries de raccords", "피팅 시리즈", "Серии фитингов"),
      description: t("接头、转接件、快插连接与定制管路组件", "Connectors, adapters, quick connectors, and custom tubing assemblies", "Conectores, adaptadores, conectores rápidos y conjuntos de tubos personalizados", "Connecteurs, adaptateurs, connecteurs rapides et assemblages de tubes personnalisés", "커넥터, 어댑터, 퀵 커넥터 및 맞춤형 튜빙 어셈블리", "Соединители, адаптеры, быстроразъемные соединители и индивидуальные трубные сборки"),
      href: anchorPath("products"),
      images: [
        productImage("/images/products/FIT/For rigid tubing_200x200_01_v001.jpg", t("硬管接头", "Hard Tube Fittings", "Racores para tubos rígidos", "Raccords pour tubes rigides", "경질 튜브 피팅", "Фитинги для жестких трубок"), t("用于硬管连接与精密液路固定", "For rigid tubing connection and precise fluidic assembly", "Para conexión de tubos rígidos y montaje preciso", "Pour connexion de tubes rigides et assemblage fluidique précis", "경질 튜브 연결 및 정밀 유체 조립용", "Для соединения жестких трубок и точной сборки")),
        productImage("/images/products/FIT/Barbed connector_200x200_01_v001.jpg", t("倒刺接头", "Barbed Fittings", "Racores de espiga", "Raccords cannelés", "바브 피팅", "Штуцерные фитинги"), t("用于软管连接与低压液路装配", "For flexible tubing connection and low-pressure fluid paths", "Para conexión de tubos flexibles y líneas de baja presión", "Pour connexion de tubes souples et circuits basse pression", "연질 튜브 연결 및 저압 유로용", "Для соединения гибких трубок и низкого давления")),
        productImage("/images/products/FIT/Thread with barb_200x200_01_v001.jpg", t("螺纹转倒刺接头", "Thread-to-Barbed Fittings", "Adaptadores roscados a espiga", "Raccords filetés vers cannelés", "나사-바브 피팅", "Резьбовые штуцерные переходники"), t("用于螺纹接口与软管之间的液路转接", "For transition between threaded ports and flexible tubing", "Para transición entre puertos roscados y tubos flexibles", "Pour la transition entre ports filetés et tubes souples", "나사 포트와 연질 튜브 사이의 전환 연결", "Для перехода между резьбовыми портами и гибкими трубками")),
        productImage("/images/products/FIT/Luer fitting_200x200_01_v001.jpg", t("鲁尔接头", "Luer Fittings", "Racores Luer", "Raccords Luer", "루어 피팅", "Фитинги Luer"), t("适合标准鲁尔接口连接", "For standard Luer interface connection", "Para conexión de interfaz Luer estándar", "Pour connexion d’interface Luer standard", "표준 루어 인터페이스 연결용", "Для стандартного соединения Luer")),
        productImage("/images/products/FIT/Quick connector_200x200_01_v001.jpg", t("快插接头", "Quick-Connect Fittings", "Racores de conexión rápida", "Raccords rapides", "퀵 커넥트 피팅", "Быстроразъемные фитинги"), t("快速连接与拆卸，提高装配效率", "Quick connection and disconnection for efficient assembly", "Conexión y desconexión rápidas para un montaje eficiente", "Connexion et déconnexion rapides pour un assemblage efficace", "빠른 연결과 분리로 조립 효율 향상", "Быстрое соединение и разъединение для эффективной сборки")),
        productImage("/images/products/FIT/Union_200x200_01_v001.jpg", t("内螺纹互转接头", "Female Thread Adapters", "Adaptadores de rosca hembra", "Adaptateurs à filetage femelle", "암나사 어댑터", "Переходники с внутренней резьбой"), t("用于不同内螺纹接口之间的液路转接", "For fluidic transition between female threaded ports", "Para transición de fluidos entre puertos de rosca hembra", "Pour la transition fluidique entre ports à filetage femelle", "암나사 포트 사이의 유로 전환용", "Для перехода между портами с внутренней резьбой")),
        productImage("/images/products/FIT/Panel mountunion_200x200_01_v001.jpg", t("穿板倒刺接头", "Bulkhead Barbed Fittings", "Racores de espiga para panel", "Raccords cannelés traversée de cloison", "패널 마운트 바브 피팅", "Панельные штуцерные фитинги"), t("用于面板穿板安装与软管连接", "For panel mounting and flexible tubing connection", "Para montaje en panel y conexión de tubos flexibles", "Pour montage sur panneau et connexion de tubes souples", "패널 관통 설치 및 연질 튜브 연결용", "Для панельного монтажа и соединения гибких трубок")),
        productImage("/images/products/FIT/Filter - Check valve_200x200_01_v001.jpg", t("过滤器与单向阀", "Filters & Check Valves", "Filtros y válvulas de retención", "Filtres et clapets anti-retour", "필터 및 체크 밸브", "Фильтры и обратные клапаны"), t("用于颗粒过滤与单向止回控制", "For particle filtration and one-way flow control", "Para filtración de partículas y control de flujo unidireccional", "Pour filtration des particules et contrôle du débit unidirectionnel", "입자 여과 및 단방향 유동 제어용", "Для фильтрации частиц и управления односторонним потоком")),
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
```

### 第503行附近

```ts
      title: t("接头系列", "Fitting Series", "Series de racores", "Séries de raccords", "피팅 시리즈", "Серии фитингов"),
      description: t("接头、转接件、快插连接与定制管路组件", "Connectors, adapters, quick connectors, and custom tubing assemblies", "Conectores, adaptadores, conectores rápidos y conjuntos de tubos personalizados", "Connecteurs, adaptateurs, connecteurs rapides et assemblages de tubes personnalisés", "커넥터, 어댑터, 퀵 커넥터 및 맞춤형 튜빙 어셈블리", "Соединители, адаптеры, быстроразъемные соединители и индивидуальные трубные сборки"),
      href: anchorPath("products"),
      images: [
        productImage("/images/products/FIT/For rigid tubing_200x200_01_v001.jpg", t("硬管接头", "Hard Tube Fittings", "Racores para tubos rígidos", "Raccords pour tubes rigides", "경질 튜브 피팅", "Фитинги для жестких трубок"), t("用于硬管连接与精密液路固定", "For rigid tubing connection and precise fluidic assembly", "Para conexión de tubos rígidos y montaje preciso", "Pour connexion de tubes rigides et assemblage fluidique précis", "경질 튜브 연결 및 정밀 유체 조립용", "Для соединения жестких трубок и точной сборки")),
        productImage("/images/products/FIT/Barbed connector_200x200_01_v001.jpg", t("倒刺接头", "Barbed Fittings", "Racores de espiga", "Raccords cannelés", "바브 피팅", "Штуцерные фитинги"), t("用于软管连接与低压液路装配", "For flexible tubing connection and low-pressure fluid paths", "Para conexión de tubos flexibles y líneas de baja presión", "Pour connexion de tubes souples et circuits basse pression", "연질 튜브 연결 및 저압 유로용", "Для соединения гибких трубок и низкого давления")),
        productImage("/images/products/FIT/Thread with barb_200x200_01_v001.jpg", t("螺纹转倒刺接头", "Thread-to-Barbed Fittings", "Adaptadores roscados a espiga", "Raccords filetés vers cannelés", "나사-바브 피팅", "Резьбовые штуцерные переходники"), t("用于螺纹接口与软管之间的液路转接", "For transition between threaded ports and flexible tubing", "Para transición entre puertos roscados y tubos flexibles", "Pour la transition entre ports filetés et tubes souples", "나사 포트와 연질 튜브 사이의 전환 연결", "Для перехода между резьбовыми портами и гибкими трубками")),
        productImage("/images/products/FIT/Luer fitting_200x200_01_v001.jpg", t("鲁尔接头", "Luer Fittings", "Racores Luer", "Raccords Luer", "루어 피팅", "Фитинги Luer"), t("适合标准鲁尔接口连接", "For standard Luer interface connection", "Para conexión de interfaz Luer estándar", "Pour connexion d’interface Luer standard", "표준 루어 인터페이스 연결용", "Для стандартного соединения Luer")),
        productImage("/images/products/FIT/Quick connector_200x200_01_v001.jpg", t("快插接头", "Quick-Connect Fittings", "Racores de conexión rápida", "Raccords rapides", "퀵 커넥트 피팅", "Быстроразъемные фитинги"), t("快速连接与拆卸，提高装配效率", "Quick connection and disconnection for efficient assembly", "Conexión y desconexión rápidas para un montaje eficiente", "Connexion et déconnexion rapides pour un assemblage efficace", "빠른 연결과 분리로 조립 효율 향상", "Быстрое соединение и разъединение для эффективной сборки")),
        productImage("/images/products/FIT/Union_200x200_01_v001.jpg", t("内螺纹互转接头", "Female Thread Adapters", "Adaptadores de rosca hembra", "Adaptateurs à filetage femelle", "암나사 어댑터", "Переходники с внутренней резьбой"), t("用于不同内螺纹接口之间的液路转接", "For fluidic transition between female threaded ports", "Para transición de fluidos entre puertos de rosca hembra", "Pour la transition fluidique entre ports à filetage femelle", "암나사 포트 사이의 유로 전환용", "Для перехода между портами с внутренней резьбой")),
        productImage("/images/products/FIT/Panel mountunion_200x200_01_v001.jpg", t("穿板倒刺接头", "Bulkhead Barbed Fittings", "Racores de espiga para panel", "Raccords cannelés traversée de cloison", "패널 마운트 바브 피팅", "Панельные штуцерные фитинги"), t("用于面板穿板安装与软管连接", "For panel mounting and flexible tubing connection", "Para montaje en panel y conexión de tubos flexibles", "Pour montage sur panneau et connexion de tubes souples", "패널 관통 설치 및 연질 튜브 연결용", "Для панельного монтажа и соединения гибких трубок")),
        productImage("/images/products/FIT/Filter - Check valve_200x200_01_v001.jpg", t("过滤器与单向阀", "Filters & Check Valves", "Filtros y válvulas de retención", "Filtres et clapets anti-retour", "필터 및 체크 밸브", "Фильтры и обратные клапаны"), t("用于颗粒过滤与单向止回控制", "For particle filtration and one-way flow control", "Para filtración de partículas y control de flujo unidireccional", "Pour filtration des particules et contrôle du débit unidirectionnel", "입자 여과 및 단방향 유동 제어용", "Для фильтрации частиц и управления односторонним потоком")),
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
```

### 第504行附近

```ts
      description: t("接头、转接件、快插连接与定制管路组件", "Connectors, adapters, quick connectors, and custom tubing assemblies", "Conectores, adaptadores, conectores rápidos y conjuntos de tubos personalizados", "Connecteurs, adaptateurs, connecteurs rapides et assemblages de tubes personnalisés", "커넥터, 어댑터, 퀵 커넥터 및 맞춤형 튜빙 어셈블리", "Соединители, адаптеры, быстроразъемные соединители и индивидуальные трубные сборки"),
      href: anchorPath("products"),
      images: [
        productImage("/images/products/FIT/For rigid tubing_200x200_01_v001.jpg", t("硬管接头", "Hard Tube Fittings", "Racores para tubos rígidos", "Raccords pour tubes rigides", "경질 튜브 피팅", "Фитинги для жестких трубок"), t("用于硬管连接与精密液路固定", "For rigid tubing connection and precise fluidic assembly", "Para conexión de tubos rígidos y montaje preciso", "Pour connexion de tubes rigides et assemblage fluidique précis", "경질 튜브 연결 및 정밀 유체 조립용", "Для соединения жестких трубок и точной сборки")),
        productImage("/images/products/FIT/Barbed connector_200x200_01_v001.jpg", t("倒刺接头", "Barbed Fittings", "Racores de espiga", "Raccords cannelés", "바브 피팅", "Штуцерные фитинги"), t("用于软管连接与低压液路装配", "For flexible tubing connection and low-pressure fluid paths", "Para conexión de tubos flexibles y líneas de baja presión", "Pour connexion de tubes souples et circuits basse pression", "연질 튜브 연결 및 저압 유로용", "Для соединения гибких трубок и низкого давления")),
        productImage("/images/products/FIT/Thread with barb_200x200_01_v001.jpg", t("螺纹转倒刺接头", "Thread-to-Barbed Fittings", "Adaptadores roscados a espiga", "Raccords filetés vers cannelés", "나사-바브 피팅", "Резьбовые штуцерные переходники"), t("用于螺纹接口与软管之间的液路转接", "For transition between threaded ports and flexible tubing", "Para transición entre puertos roscados y tubos flexibles", "Pour la transition entre ports filetés et tubes souples", "나사 포트와 연질 튜브 사이의 전환 연결", "Для перехода между резьбовыми портами и гибкими трубками")),
        productImage("/images/products/FIT/Luer fitting_200x200_01_v001.jpg", t("鲁尔接头", "Luer Fittings", "Racores Luer", "Raccords Luer", "루어 피팅", "Фитинги Luer"), t("适合标准鲁尔接口连接", "For standard Luer interface connection", "Para conexión de interfaz Luer estándar", "Pour connexion d’interface Luer standard", "표준 루어 인터페이스 연결용", "Для стандартного соединения Luer")),
        productImage("/images/products/FIT/Quick connector_200x200_01_v001.jpg", t("快插接头", "Quick-Connect Fittings", "Racores de conexión rápida", "Raccords rapides", "퀵 커넥트 피팅", "Быстроразъемные фитинги"), t("快速连接与拆卸，提高装配效率", "Quick connection and disconnection for efficient assembly", "Conexión y desconexión rápidas para un montaje eficiente", "Connexion et déconnexion rapides pour un assemblage efficace", "빠른 연결과 분리로 조립 효율 향상", "Быстрое соединение и разъединение для эффективной сборки")),
        productImage("/images/products/FIT/Union_200x200_01_v001.jpg", t("内螺纹互转接头", "Female Thread Adapters", "Adaptadores de rosca hembra", "Adaptateurs à filetage femelle", "암나사 어댑터", "Переходники с внутренней резьбой"), t("用于不同内螺纹接口之间的液路转接", "For fluidic transition between female threaded ports", "Para transición de fluidos entre puertos de rosca hembra", "Pour la transition fluidique entre ports à filetage femelle", "암나사 포트 사이의 유로 전환용", "Для перехода между портами с внутренней резьбой")),
        productImage("/images/products/FIT/Panel mountunion_200x200_01_v001.jpg", t("穿板倒刺接头", "Bulkhead Barbed Fittings", "Racores de espiga para panel", "Raccords cannelés traversée de cloison", "패널 마운트 바브 피팅", "Панельные штуцерные фитинги"), t("用于面板穿板安装与软管连接", "For panel mounting and flexible tubing connection", "Para montaje en panel y conexión de tubos flexibles", "Pour montage sur panneau et connexion de tubes souples", "패널 관통 설치 및 연질 튜브 연결용", "Для панельного монтажа и соединения гибких трубок")),
        productImage("/images/products/FIT/Filter - Check valve_200x200_01_v001.jpg", t("过滤器与单向阀", "Filters & Check Valves", "Filtros y válvulas de retención", "Filtres et clapets anti-retour", "필터 및 체크 밸브", "Фильтры и обратные клапаны"), t("用于颗粒过滤与单向止回控制", "For particle filtration and one-way flow control", "Para filtración de partículas y control de flujo unidireccional", "Pour filtration des particules et contrôle du débit unidirectionnel", "입자 여과 및 단방향 유동 제어용", "Для фильтрации частиц и управления односторонним потоком")),
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
```

### 第505行附近

```ts
      href: anchorPath("products"),
      images: [
        productImage("/images/products/FIT/For rigid tubing_200x200_01_v001.jpg", t("硬管接头", "Hard Tube Fittings", "Racores para tubos rígidos", "Raccords pour tubes rigides", "경질 튜브 피팅", "Фитинги для жестких трубок"), t("用于硬管连接与精密液路固定", "For rigid tubing connection and precise fluidic assembly", "Para conexión de tubos rígidos y montaje preciso", "Pour connexion de tubes rigides et assemblage fluidique précis", "경질 튜브 연결 및 정밀 유체 조립용", "Для соединения жестких трубок и точной сборки")),
        productImage("/images/products/FIT/Barbed connector_200x200_01_v001.jpg", t("倒刺接头", "Barbed Fittings", "Racores de espiga", "Raccords cannelés", "바브 피팅", "Штуцерные фитинги"), t("用于软管连接与低压液路装配", "For flexible tubing connection and low-pressure fluid paths", "Para conexión de tubos flexibles y líneas de baja presión", "Pour connexion de tubes souples et circuits basse pression", "연질 튜브 연결 및 저압 유로용", "Для соединения гибких трубок и низкого давления")),
        productImage("/images/products/FIT/Thread with barb_200x200_01_v001.jpg", t("螺纹转倒刺接头", "Thread-to-Barbed Fittings", "Adaptadores roscados a espiga", "Raccords filetés vers cannelés", "나사-바브 피팅", "Резьбовые штуцерные переходники"), t("用于螺纹接口与软管之间的液路转接", "For transition between threaded ports and flexible tubing", "Para transición entre puertos roscados y tubos flexibles", "Pour la transition entre ports filetés et tubes souples", "나사 포트와 연질 튜브 사이의 전환 연결", "Для перехода между резьбовыми портами и гибкими трубками")),
        productImage("/images/products/FIT/Luer fitting_200x200_01_v001.jpg", t("鲁尔接头", "Luer Fittings", "Racores Luer", "Raccords Luer", "루어 피팅", "Фитинги Luer"), t("适合标准鲁尔接口连接", "For standard Luer interface connection", "Para conexión de interfaz Luer estándar", "Pour connexion d’interface Luer standard", "표준 루어 인터페이스 연결용", "Для стандартного соединения Luer")),
        productImage("/images/products/FIT/Quick connector_200x200_01_v001.jpg", t("快插接头", "Quick-Connect Fittings", "Racores de conexión rápida", "Raccords rapides", "퀵 커넥트 피팅", "Быстроразъемные фитинги"), t("快速连接与拆卸，提高装配效率", "Quick connection and disconnection for efficient assembly", "Conexión y desconexión rápidas para un montaje eficiente", "Connexion et déconnexion rapides pour un assemblage efficace", "빠른 연결과 분리로 조립 효율 향상", "Быстрое соединение и разъединение для эффективной сборки")),
        productImage("/images/products/FIT/Union_200x200_01_v001.jpg", t("内螺纹互转接头", "Female Thread Adapters", "Adaptadores de rosca hembra", "Adaptateurs à filetage femelle", "암나사 어댑터", "Переходники с внутренней резьбой"), t("用于不同内螺纹接口之间的液路转接", "For fluidic transition between female threaded ports", "Para transición de fluidos entre puertos de rosca hembra", "Pour la transition fluidique entre ports à filetage femelle", "암나사 포트 사이의 유로 전환용", "Для перехода между портами с внутренней резьбой")),
        productImage("/images/products/FIT/Panel mountunion_200x200_01_v001.jpg", t("穿板倒刺接头", "Bulkhead Barbed Fittings", "Racores de espiga para panel", "Raccords cannelés traversée de cloison", "패널 마운트 바브 피팅", "Панельные штуцерные фитинги"), t("用于面板穿板安装与软管连接", "For panel mounting and flexible tubing connection", "Para montaje en panel y conexión de tubos flexibles", "Pour montage sur panneau et connexion de tubes souples", "패널 관통 설치 및 연질 튜브 연결용", "Для панельного монтажа и соединения гибких трубок")),
        productImage("/images/products/FIT/Filter - Check valve_200x200_01_v001.jpg", t("过滤器与单向阀", "Filters & Check Valves", "Filtros y válvulas de retención", "Filtres et clapets anti-retour", "필터 및 체크 밸브", "Фильтры и обратные клапаны"), t("用于颗粒过滤与单向止回控制", "For particle filtration and one-way flow control", "Para filtración de partículas y control de flujo unidireccional", "Pour filtration des particules et contrôle du débit unidirectionnel", "입자 여과 및 단방향 유동 제어용", "Для фильтрации частиц и управления односторонним потоком")),
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
```

### 第506行附近

```ts
      images: [
        productImage("/images/products/FIT/For rigid tubing_200x200_01_v001.jpg", t("硬管接头", "Hard Tube Fittings", "Racores para tubos rígidos", "Raccords pour tubes rigides", "경질 튜브 피팅", "Фитинги для жестких трубок"), t("用于硬管连接与精密液路固定", "For rigid tubing connection and precise fluidic assembly", "Para conexión de tubos rígidos y montaje preciso", "Pour connexion de tubes rigides et assemblage fluidique précis", "경질 튜브 연결 및 정밀 유체 조립용", "Для соединения жестких трубок и точной сборки")),
        productImage("/images/products/FIT/Barbed connector_200x200_01_v001.jpg", t("倒刺接头", "Barbed Fittings", "Racores de espiga", "Raccords cannelés", "바브 피팅", "Штуцерные фитинги"), t("用于软管连接与低压液路装配", "For flexible tubing connection and low-pressure fluid paths", "Para conexión de tubos flexibles y líneas de baja presión", "Pour connexion de tubes souples et circuits basse pression", "연질 튜브 연결 및 저압 유로용", "Для соединения гибких трубок и низкого давления")),
        productImage("/images/products/FIT/Thread with barb_200x200_01_v001.jpg", t("螺纹转倒刺接头", "Thread-to-Barbed Fittings", "Adaptadores roscados a espiga", "Raccords filetés vers cannelés", "나사-바브 피팅", "Резьбовые штуцерные переходники"), t("用于螺纹接口与软管之间的液路转接", "For transition between threaded ports and flexible tubing", "Para transición entre puertos roscados y tubos flexibles", "Pour la transition entre ports filetés et tubes souples", "나사 포트와 연질 튜브 사이의 전환 연결", "Для перехода между резьбовыми портами и гибкими трубками")),
        productImage("/images/products/FIT/Luer fitting_200x200_01_v001.jpg", t("鲁尔接头", "Luer Fittings", "Racores Luer", "Raccords Luer", "루어 피팅", "Фитинги Luer"), t("适合标准鲁尔接口连接", "For standard Luer interface connection", "Para conexión de interfaz Luer estándar", "Pour connexion d’interface Luer standard", "표준 루어 인터페이스 연결용", "Для стандартного соединения Luer")),
        productImage("/images/products/FIT/Quick connector_200x200_01_v001.jpg", t("快插接头", "Quick-Connect Fittings", "Racores de conexión rápida", "Raccords rapides", "퀵 커넥트 피팅", "Быстроразъемные фитинги"), t("快速连接与拆卸，提高装配效率", "Quick connection and disconnection for efficient assembly", "Conexión y desconexión rápidas para un montaje eficiente", "Connexion et déconnexion rapides pour un assemblage efficace", "빠른 연결과 분리로 조립 효율 향상", "Быстрое соединение и разъединение для эффективной сборки")),
        productImage("/images/products/FIT/Union_200x200_01_v001.jpg", t("内螺纹互转接头", "Female Thread Adapters", "Adaptadores de rosca hembra", "Adaptateurs à filetage femelle", "암나사 어댑터", "Переходники с внутренней резьбой"), t("用于不同内螺纹接口之间的液路转接", "For fluidic transition between female threaded ports", "Para transición de fluidos entre puertos de rosca hembra", "Pour la transition fluidique entre ports à filetage femelle", "암나사 포트 사이의 유로 전환용", "Для перехода между портами с внутренней резьбой")),
        productImage("/images/products/FIT/Panel mountunion_200x200_01_v001.jpg", t("穿板倒刺接头", "Bulkhead Barbed Fittings", "Racores de espiga para panel", "Raccords cannelés traversée de cloison", "패널 마운트 바브 피팅", "Панельные штуцерные фитинги"), t("用于面板穿板安装与软管连接", "For panel mounting and flexible tubing connection", "Para montaje en panel y conexión de tubos flexibles", "Pour montage sur panneau et connexion de tubes souples", "패널 관통 설치 및 연질 튜브 연결용", "Для панельного монтажа и соединения гибких трубок")),
        productImage("/images/products/FIT/Filter - Check valve_200x200_01_v001.jpg", t("过滤器与单向阀", "Filters & Check Valves", "Filtros y válvulas de retención", "Filtres et clapets anti-retour", "필터 및 체크 밸브", "Фильтры и обратные клапаны"), t("用于颗粒过滤与单向止回控制", "For particle filtration and one-way flow control", "Para filtración de partículas y control de flujo unidireccional", "Pour filtration des particules et contrôle du débit unidirectionnel", "입자 여과 및 단방향 유동 제어용", "Для фильтрации частиц и управления односторонним потоком")),
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
```

## 四、Mega Menu 渲染候选文件

### components/layout/SiteHeader.tsx

- 相关命中：6

#### 第426行附近

```tsx
    return canHover && isWideScreen;
  }

  /**
   * 判断某个导航是否为当前选中状态
   *
   * 说明：
   * 1. 所有页面都会先去掉语言前缀再比较
   * 2. /en/about/history 会识别为 /about/history
   * 3. About / Products / Applications 等栏目都能正常高亮
   */
  function isNavActive(item: NavigationItem) {
    const itemHref = getLocalizedHref(item.href, currentLocale);

    const itemPathWithoutLocale = stripLocalePrefixFromPath(itemHref);

    const normalizedItemPathWithoutLocale =
      itemPathWithoutLocale !== "/"
        ? itemPathWithoutLocale.replace(/\/+$/, "")
        : itemPathWithoutLocale;

    if (item.key === "home") {
      return normalizedPathWithoutLocale === "/";
    }

    if (
      !normalizedItemPathWithoutLocale ||
      normalizedItemPathWithoutLocale === "/"
    ) {
      return false;
    }

    return (
      normalizedPathWithoutLocale === normalizedItemPathWithoutLocale ||
      normalizedPathWithoutLocale.startsWith(
        `${normalizedItemPathWithoutLocale}/`,
      )
    );
}
    /**
     * 页面滚动监听
     *
     * 作用：
```

#### 第625行附近

```tsx
    /**
     * PC 端鼠标离开语言栏时关闭
     */
    function handleLanguageMouseLeave() {
      if (isPcHoverDevice()) {
        setOpenPanel("none");
      }
    }

    /**
     * 点击语言按钮时执行
     */
    function handleLanguageButtonClick(event: MouseEvent<HTMLButtonElement>) {
      event.preventDefault();

      setIsSearchOpen(false);

      setDesktopMegaKey(null);

      setActiveMegaCategoryKey(null);

      setOpenPanel((currentPanel) =>
        currentPanel === "language" ? "none" : "language",
      );
    }

    /**
     * 点击手机端三横菜单按钮时执行
     */
    function handleMobileMenuClick(event: MouseEvent<HTMLButtonElement>) {
      event.preventDefault();

      setIsSearchOpen(false);

      setOpenPanel((currentPanel) =>
        currentPanel === "mobileNav" ? "none" : "mobileNav",
      );
    }

    /**
     * 关闭所有顶部展开内容
     */
    function closeAllPanels() {
```

#### 第676行附近

```tsx
      // 关闭手机端已展开的折叠菜单
      setOpenMobileSectionKey(null);
    }

    /**
     * 点击 PC 端搜索图标按钮时执行
     *
     * 说明：
     * 1. 打开搜索模式时，关闭 Mega Menu 和语言菜单
     * 2. 再次点击搜索图标，可以退出搜索模式
     * 3. 打开后自动聚焦输入框
     */
    function handleSearchButtonClick(event: MouseEvent<HTMLButtonElement>) {
      event.preventDefault();

      event.stopPropagation();

      setDesktopMegaKey(null);

      setActiveMegaCategoryKey(null);

      setOpenPanel("none");

      setIsSearchOpen((currentValue) => {
        const nextValue = !currentValue;

        if (nextValue) {
          window.setTimeout(() => {
            searchInputRef.current?.focus();
          }, 80);
        } else {
          searchInputRef.current?.blur();
        }

        return nextValue;
      });
    }

    /**
     * 点击语言选项时执行
     *
     * 说明：
     * 1. 写入 localStorage，方便前端组件读取语言偏好
```

#### 第779行附近

```tsx
        className={`site-header ${headerLocaleClass} ${shouldUseSolidHeader ? "site-header-scrolled" : ""
          } ${isFittingReplacementDetailPage || isNewsArticlePage || isProductCenterPage
            ? "site-header-solid-page"
            : ""
          } ${openPanel !== "none" || desktopMegaKey ? "header-panel-open" : ""
          } ${isLanguageOpen ? "language-panel-open" : ""} ${isMobileMenuOpen ? "mobile-nav-open" : ""
          } ${isSearchOpen ? "site-header-search-open" : ""}`}
        onMouseLeave={handleHeaderMouseLeave}
      >
        {/* Top 栏内部容器 */}
        <div className="site-header-inner">
          {/* Logo 区域 */}
          <Link
            className="site-logo"
            href={getLocaleHomePath(currentLocale)}
            aria-label={headerText.logoAriaLabel}
            onClick={closeAllPanels}
          >
            {/* 白色 Logo：透明 Top 栏状态下显示 */}
            <img
              className="site-logo-white"
              src="/images/logo/foreach-logo-color.svg"
              alt=""
              aria-hidden="true"
            />

            {/* 彩色 Logo：滚动后、hover 后、菜单展开后显示 */}
            <img
              className="site-logo-color"
              src="/images/logo/foreach-logo-color.svg"
              alt="FOREACH"
            />
          </Link>

          {/* PC 端中间区域：默认显示导航，搜索模式下切换为搜索框 */}
          <div className="site-header-center">
            {/* PC 端主导航 */}
            <nav className="site-nav" aria-label={headerText.navAriaLabel}>
              {navigationItems.map((item) => {
                const navLabel = getLocalizedText(item.label, currentLocale);

                const navHref = getLocalizedHref(item.href, currentLocale);

```

#### 第781行附近

```tsx
            ? "site-header-solid-page"
            : ""
          } ${openPanel !== "none" || desktopMegaKey ? "header-panel-open" : ""
          } ${isLanguageOpen ? "language-panel-open" : ""} ${isMobileMenuOpen ? "mobile-nav-open" : ""
          } ${isSearchOpen ? "site-header-search-open" : ""}`}
        onMouseLeave={handleHeaderMouseLeave}
      >
        {/* Top 栏内部容器 */}
        <div className="site-header-inner">
          {/* Logo 区域 */}
          <Link
            className="site-logo"
            href={getLocaleHomePath(currentLocale)}
            aria-label={headerText.logoAriaLabel}
            onClick={closeAllPanels}
          >
            {/* 白色 Logo：透明 Top 栏状态下显示 */}
            <img
              className="site-logo-white"
              src="/images/logo/foreach-logo-color.svg"
              alt=""
              aria-hidden="true"
            />

            {/* 彩色 Logo：滚动后、hover 后、菜单展开后显示 */}
            <img
              className="site-logo-color"
              src="/images/logo/foreach-logo-color.svg"
              alt="FOREACH"
            />
          </Link>

          {/* PC 端中间区域：默认显示导航，搜索模式下切换为搜索框 */}
          <div className="site-header-center">
            {/* PC 端主导航 */}
            <nav className="site-nav" aria-label={headerText.navAriaLabel}>
              {navigationItems.map((item) => {
                const navLabel = getLocalizedText(item.label, currentLocale);

                const navHref = getLocalizedHref(item.href, currentLocale);

                // 判断是否是产品中心 / 关于我们这种复杂 Mega 下拉
                const hasMegaDropdown =
```

#### 第783行附近

```tsx
          } ${openPanel !== "none" || desktopMegaKey ? "header-panel-open" : ""
          } ${isLanguageOpen ? "language-panel-open" : ""} ${isMobileMenuOpen ? "mobile-nav-open" : ""
          } ${isSearchOpen ? "site-header-search-open" : ""}`}
        onMouseLeave={handleHeaderMouseLeave}
      >
        {/* Top 栏内部容器 */}
        <div className="site-header-inner">
          {/* Logo 区域 */}
          <Link
            className="site-logo"
            href={getLocaleHomePath(currentLocale)}
            aria-label={headerText.logoAriaLabel}
            onClick={closeAllPanels}
          >
            {/* 白色 Logo：透明 Top 栏状态下显示 */}
            <img
              className="site-logo-white"
              src="/images/logo/foreach-logo-color.svg"
              alt=""
              aria-hidden="true"
            />

            {/* 彩色 Logo：滚动后、hover 后、菜单展开后显示 */}
            <img
              className="site-logo-color"
              src="/images/logo/foreach-logo-color.svg"
              alt="FOREACH"
            />
          </Link>

          {/* PC 端中间区域：默认显示导航，搜索模式下切换为搜索框 */}
          <div className="site-header-center">
            {/* PC 端主导航 */}
            <nav className="site-nav" aria-label={headerText.navAriaLabel}>
              {navigationItems.map((item) => {
                const navLabel = getLocalizedText(item.label, currentLocale);

                const navHref = getLocalizedHref(item.href, currentLocale);

                // 判断是否是产品中心 / 关于我们这种复杂 Mega 下拉
                const hasMegaDropdown =
                  item.dropdownType === "mega" && Boolean(item.megaDropdown);

```

#### 第808行附近

```tsx
              src="/images/logo/foreach-logo-color.svg"
              alt="FOREACH"
            />
          </Link>

          {/* PC 端中间区域：默认显示导航，搜索模式下切换为搜索框 */}
          <div className="site-header-center">
            {/* PC 端主导航 */}
            <nav className="site-nav" aria-label={headerText.navAriaLabel}>
              {navigationItems.map((item) => {
                const navLabel = getLocalizedText(item.label, currentLocale);

                const navHref = getLocalizedHref(item.href, currentLocale);

                // 判断是否是产品中心 / 关于我们这种复杂 Mega 下拉
                const hasMegaDropdown =
                  item.dropdownType === "mega" && Boolean(item.megaDropdown);

                // 判断是否是资源中心 / 联系与合作这种简单下拉
                const hasSimpleDropdown =
                  item.dropdownType === "simple" &&
                  Boolean(item.mobileChildren?.length);

                // simple 下拉栏的数据
                const simpleChildren =
                  item.mobileChildren
                    ?.filter((child) => child.enabled)
                    .sort((a, b) => a.order - b.order) ?? [];

                // 当前 simple 下拉是否打开
                const isSimpleDropdownOpen =
                  desktopMegaKey === item.key && hasSimpleDropdown;

                return (
                  <div
                    key={item.key}
                    className={`site-nav-item ${hasMegaDropdown || hasSimpleDropdown
                      ? "site-nav-item-has-dropdown"
                      : ""
                      } ${hasSimpleDropdown
                        ? "site-nav-item-has-simple-dropdown"
                        : ""
                      } ${isSimpleDropdownOpen ? "site-nav-item-simple-open" : ""
```

#### 第856行附近

```tsx
                      /*
                         重点：
                         1. 只要鼠标离开当前 simple 菜单区域，就关闭 simple 下拉栏
                         2. 这样 Resources 和 Contact & Partnership 不会同时保持打开
                         3. 产品中心 / 关于我们 Mega Menu 不在这里处理
                      */
                      if (hasSimpleDropdown) {
                        setDesktopMegaKey(null);
                        setActiveMegaCategoryKey(null);
                      }
                    }}
                  >
                    <Link
                      href={navHref}
                      className={`site-nav-link ${isNavActive(item) ? "site-nav-link-active" : ""
                        }`}
                      onClick={closeAllPanels}
                    >
                      {navLabel}
                    </Link>

                    {/* ================================
                      PC 端 simple 简单下拉栏

                      说明：
                      1. 只在当前 simple 菜单打开时渲染
                      2. 不打开时页面里没有这个下拉 DOM
                      3. 这样可以彻底避免两个下拉栏同时显示
                  ================================ */}
                    {isSimpleDropdownOpen ? (
                      <div
                        className="site-nav-simple-dropdown site-nav-simple-dropdown-open"
                        onMouseEnter={() => {
                          setDesktopMegaKey(item.key);
                          setActiveMegaCategoryKey(null);
                        }}
                      >
                        {simpleChildren.map((child) => (
                          <Link
                            key={child.key}
                            href={getLocalizedHref(child.href, currentLocale)}
                            className="site-nav-simple-dropdown-link"                        onClick={closeAllPanels}
                          >
```

#### 第857行附近

```tsx
                         重点：
                         1. 只要鼠标离开当前 simple 菜单区域，就关闭 simple 下拉栏
                         2. 这样 Resources 和 Contact & Partnership 不会同时保持打开
                         3. 产品中心 / 关于我们 Mega Menu 不在这里处理
                      */
                      if (hasSimpleDropdown) {
                        setDesktopMegaKey(null);
                        setActiveMegaCategoryKey(null);
                      }
                    }}
                  >
                    <Link
                      href={navHref}
                      className={`site-nav-link ${isNavActive(item) ? "site-nav-link-active" : ""
                        }`}
                      onClick={closeAllPanels}
                    >
                      {navLabel}
                    </Link>

                    {/* ================================
                      PC 端 simple 简单下拉栏

                      说明：
                      1. 只在当前 simple 菜单打开时渲染
                      2. 不打开时页面里没有这个下拉 DOM
                      3. 这样可以彻底避免两个下拉栏同时显示
                  ================================ */}
                    {isSimpleDropdownOpen ? (
                      <div
                        className="site-nav-simple-dropdown site-nav-simple-dropdown-open"
                        onMouseEnter={() => {
                          setDesktopMegaKey(item.key);
                          setActiveMegaCategoryKey(null);
                        }}
                      >
                        {simpleChildren.map((child) => (
                          <Link
                            key={child.key}
                            href={getLocalizedHref(child.href, currentLocale)}
                            className="site-nav-simple-dropdown-link"                        onClick={closeAllPanels}
                          >
                            {getLocalizedText(child.label, currentLocale)}
```

#### 第860行附近

```tsx
                         3. 产品中心 / 关于我们 Mega Menu 不在这里处理
                      */
                      if (hasSimpleDropdown) {
                        setDesktopMegaKey(null);
                        setActiveMegaCategoryKey(null);
                      }
                    }}
                  >
                    <Link
                      href={navHref}
                      className={`site-nav-link ${isNavActive(item) ? "site-nav-link-active" : ""
                        }`}
                      onClick={closeAllPanels}
                    >
                      {navLabel}
                    </Link>

                    {/* ================================
                      PC 端 simple 简单下拉栏

                      说明：
                      1. 只在当前 simple 菜单打开时渲染
                      2. 不打开时页面里没有这个下拉 DOM
                      3. 这样可以彻底避免两个下拉栏同时显示
                  ================================ */}
                    {isSimpleDropdownOpen ? (
                      <div
                        className="site-nav-simple-dropdown site-nav-simple-dropdown-open"
                        onMouseEnter={() => {
                          setDesktopMegaKey(item.key);
                          setActiveMegaCategoryKey(null);
                        }}
                      >
                        {simpleChildren.map((child) => (
                          <Link
                            key={child.key}
                            href={getLocalizedHref(child.href, currentLocale)}
                            className="site-nav-simple-dropdown-link"                        onClick={closeAllPanels}
                          >
                            {getLocalizedText(child.label, currentLocale)}
                          </Link>
                        ))}
                      </div>
```

#### 第882行附近

```tsx
                      2. 不打开时页面里没有这个下拉 DOM
                      3. 这样可以彻底避免两个下拉栏同时显示
                  ================================ */}
                    {isSimpleDropdownOpen ? (
                      <div
                        className="site-nav-simple-dropdown site-nav-simple-dropdown-open"
                        onMouseEnter={() => {
                          setDesktopMegaKey(item.key);
                          setActiveMegaCategoryKey(null);
                        }}
                      >
                        {simpleChildren.map((child) => (
                          <Link
                            key={child.key}
                            href={getLocalizedHref(child.href, currentLocale)}
                            className="site-nav-simple-dropdown-link"                        onClick={closeAllPanels}
                          >
                            {getLocalizedText(child.label, currentLocale)}
                          </Link>
                        ))}
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </nav>

            {/* PC 端搜索模式：点击右侧搜索图标后显示 */}
            <form
              ref={searchModeRef}
              className="site-search-mode-form"
              action={
                currentLocale === "zh-CN"
                  ? "/search"
                  : `/${currentLocale}/search`
              }
              method="get"
            >
              <label className="site-search-mode-box">
                <span className="site-search-icon" aria-hidden="true" />

                <input
                  ref={searchInputRef}
```

#### 第884行附近

```tsx
                  ================================ */}
                    {isSimpleDropdownOpen ? (
                      <div
                        className="site-nav-simple-dropdown site-nav-simple-dropdown-open"
                        onMouseEnter={() => {
                          setDesktopMegaKey(item.key);
                          setActiveMegaCategoryKey(null);
                        }}
                      >
                        {simpleChildren.map((child) => (
                          <Link
                            key={child.key}
                            href={getLocalizedHref(child.href, currentLocale)}
                            className="site-nav-simple-dropdown-link"                        onClick={closeAllPanels}
                          >
                            {getLocalizedText(child.label, currentLocale)}
                          </Link>
                        ))}
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </nav>

            {/* PC 端搜索模式：点击右侧搜索图标后显示 */}
            <form
              ref={searchModeRef}
              className="site-search-mode-form"
              action={
                currentLocale === "zh-CN"
                  ? "/search"
                  : `/${currentLocale}/search`
              }
              method="get"
            >
              <label className="site-search-mode-box">
                <span className="site-search-icon" aria-hidden="true" />

                <input
                  ref={searchInputRef}
                  className="site-search-mode-input"
                  type="search"
```

#### 第885行附近

```tsx
                    {isSimpleDropdownOpen ? (
                      <div
                        className="site-nav-simple-dropdown site-nav-simple-dropdown-open"
                        onMouseEnter={() => {
                          setDesktopMegaKey(item.key);
                          setActiveMegaCategoryKey(null);
                        }}
                      >
                        {simpleChildren.map((child) => (
                          <Link
                            key={child.key}
                            href={getLocalizedHref(child.href, currentLocale)}
                            className="site-nav-simple-dropdown-link"                        onClick={closeAllPanels}
                          >
                            {getLocalizedText(child.label, currentLocale)}
                          </Link>
                        ))}
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </nav>

            {/* PC 端搜索模式：点击右侧搜索图标后显示 */}
            <form
              ref={searchModeRef}
              className="site-search-mode-form"
              action={
                currentLocale === "zh-CN"
                  ? "/search"
                  : `/${currentLocale}/search`
              }
              method="get"
            >
              <label className="site-search-mode-box">
                <span className="site-search-icon" aria-hidden="true" />

                <input
                  ref={searchInputRef}
                  className="site-search-mode-input"
                  type="search"
                  name="q"
```

#### 第932行附近

```tsx
            </form>
          </div>

          {/* 右侧工具区：搜索栏、语言栏、手机菜单按钮 */}
          <div className="site-header-actions">
            {/* PC 端搜索按钮：点击后中间导航区域切换为搜索模式 */}
            <button
              ref={searchTriggerRef}
              className="site-search-trigger"
              type="button"
              aria-label={headerText.searchButtonAriaLabel}
              aria-expanded={isSearchOpen}
              onClick={handleSearchButtonClick}
            >
              <span className="site-search-icon" aria-hidden="true" />
            </button>

            {/* 语言栏 */}
            <div
              className={`language-switcher ${isLanguageOpen ? "language-switcher-open" : ""
                }`}
              onMouseEnter={handleLanguageMouseEnter}
              onMouseLeave={handleLanguageMouseLeave}
            >
              <button
                className="language-summary"
                type="button"
                aria-label={headerText.languageAriaLabel}
                aria-expanded={isLanguageOpen}
                onClick={handleLanguageButtonClick}
                title={headerText.languageSwitchTitle}
              >
                {/* 语言栏固定显示英文单词 Language */}
                <span className="language-summary-label">Language</span>

                <span className="language-summary-arrow" aria-hidden="true">
                  ▾
                </span>
              </button>

              <div className="language-details-menu">
                {languageItems.map((language) => (
                  <a
```

#### 第949行附近

```tsx
            {/* 语言栏 */}
            <div
              className={`language-switcher ${isLanguageOpen ? "language-switcher-open" : ""
                }`}
              onMouseEnter={handleLanguageMouseEnter}
              onMouseLeave={handleLanguageMouseLeave}
            >
              <button
                className="language-summary"
                type="button"
                aria-label={headerText.languageAriaLabel}
                aria-expanded={isLanguageOpen}
                onClick={handleLanguageButtonClick}
                title={headerText.languageSwitchTitle}
              >
                {/* 语言栏固定显示英文单词 Language */}
                <span className="language-summary-label">Language</span>

                <span className="language-summary-arrow" aria-hidden="true">
                  ▾
                </span>
              </button>

              <div className="language-details-menu">
                {languageItems.map((language) => (
                  <a
                    key={language.code}
                    href={language.href}
                    className={`language-details-item ${language.code === currentLocale
                      ? "language-details-item-active"
                      : ""
                      }`}
                    onClick={(event) =>
                      handleLanguageItemClick(event, language.code, language.href)
                    }
                  >
                    {language.label}
                  </a>
                ))}
              </div>
            </div>

            {/* 手机端导航栏：按钮 + 下拉菜单 */}
```

#### 第964行附近

```tsx
                {/* 语言栏固定显示英文单词 Language */}
                <span className="language-summary-label">Language</span>

                <span className="language-summary-arrow" aria-hidden="true">
                  ▾
                </span>
              </button>

              <div className="language-details-menu">
                {languageItems.map((language) => (
                  <a
                    key={language.code}
                    href={language.href}
                    className={`language-details-item ${language.code === currentLocale
                      ? "language-details-item-active"
                      : ""
                      }`}
                    onClick={(event) =>
                      handleLanguageItemClick(event, language.code, language.href)
                    }
                  >
                    {language.label}
                  </a>
                ))}
              </div>
            </div>

            {/* 手机端导航栏：按钮 + 下拉菜单 */}
            <div
              className={`mobile-nav-switcher ${isMobileMenuOpen ? "mobile-nav-switcher-open" : ""
                }`}
            >
              <button
                className="mobile-menu-btn"
                type="button"
                aria-label={headerText.mobileMenuAriaLabel}
                aria-expanded={isMobileMenuOpen}
                onClick={handleMobileMenuClick}
              >
                <svg
                  className="mobile-menu-icon"
                  viewBox="0 0 1024 1024"
                  aria-hidden="true"
```

#### 第969行附近

```tsx
                </span>
              </button>

              <div className="language-details-menu">
                {languageItems.map((language) => (
                  <a
                    key={language.code}
                    href={language.href}
                    className={`language-details-item ${language.code === currentLocale
                      ? "language-details-item-active"
                      : ""
                      }`}
                    onClick={(event) =>
                      handleLanguageItemClick(event, language.code, language.href)
                    }
                  >
                    {language.label}
                  </a>
                ))}
              </div>
            </div>

            {/* 手机端导航栏：按钮 + 下拉菜单 */}
            <div
              className={`mobile-nav-switcher ${isMobileMenuOpen ? "mobile-nav-switcher-open" : ""
                }`}
            >
              <button
                className="mobile-menu-btn"
                type="button"
                aria-label={headerText.mobileMenuAriaLabel}
                aria-expanded={isMobileMenuOpen}
                onClick={handleMobileMenuClick}
              >
                <svg
                  className="mobile-menu-icon"
                  viewBox="0 0 1024 1024"
                  aria-hidden="true"
                >
                  <rect
                    className="mobile-menu-line mobile-menu-line-top"
                    x="180"
                    y="255"
```

#### 第989行附近

```tsx
            </div>

            {/* 手机端导航栏：按钮 + 下拉菜单 */}
            <div
              className={`mobile-nav-switcher ${isMobileMenuOpen ? "mobile-nav-switcher-open" : ""
                }`}
            >
              <button
                className="mobile-menu-btn"
                type="button"
                aria-label={headerText.mobileMenuAriaLabel}
                aria-expanded={isMobileMenuOpen}
                onClick={handleMobileMenuClick}
              >
                <svg
                  className="mobile-menu-icon"
                  viewBox="0 0 1024 1024"
                  aria-hidden="true"
                >
                  <rect
                    className="mobile-menu-line mobile-menu-line-top"
                    x="180"
                    y="255"
                    width="664"
                    height="72"
                    rx="36"
                    fill="currentColor"
                  />

                  <rect
                    className="mobile-menu-line mobile-menu-line-middle"
                    x="180"
                    y="476"
                    width="664"
                    height="72"
                    rx="36"
                    fill="currentColor"
                  />

                  <rect
                    className="mobile-menu-line mobile-menu-line-bottom"
                    x="180"
                    y="697"
```

#### 第1035行附近

```tsx
                    fill="currentColor"
                  />
                </svg>
              </button>

              <nav
                className="mobile-nav"
                aria-label={headerText.mobileNavAriaLabel}
              >
                {navigationItems.map((item) => {
                  const navLabel = getLocalizedText(item.label, currentLocale);

                  const navHref = getLocalizedHref(item.href, currentLocale);

                  const mobileChildren = (item.mobileChildren || [])
                    .filter((child) => child.enabled)
                    .sort((a, b) => a.order - b.order);

                  const hasMobileChildren = mobileChildren.length > 0;

                  if (hasMobileChildren) {
                    return (
                      <details
                        className="mobile-nav-section"
                        key={item.key}
                        open={openMobileSectionKey === item.key}
                      >
                        <summary
                          className="mobile-nav-summary"
                          onClick={(event) => {
                            event.preventDefault();

                            setOpenMobileSectionKey((currentKey) =>
                              currentKey === item.key ? null : item.key,
                            );
                          }}
                        >
                          <span className="mobile-nav-summary-text">
                            {navLabel}
                          </span>
                        </summary>

                        <div className="mobile-nav-submenu">
```

#### 第1052行附近

```tsx

                  const hasMobileChildren = mobileChildren.length > 0;

                  if (hasMobileChildren) {
                    return (
                      <details
                        className="mobile-nav-section"
                        key={item.key}
                        open={openMobileSectionKey === item.key}
                      >
                        <summary
                          className="mobile-nav-summary"
                          onClick={(event) => {
                            event.preventDefault();

                            setOpenMobileSectionKey((currentKey) =>
                              currentKey === item.key ? null : item.key,
                            );
                          }}
                        >
                          <span className="mobile-nav-summary-text">
                            {navLabel}
                          </span>
                        </summary>

                        <div className="mobile-nav-submenu">
                          {mobileChildren.map((child) => (
                            <Link
                              key={child.key}
                              href={getLocalizedHref(child.href, currentLocale)}
                              className="mobile-nav-submenu-link"                        onClick={closeAllPanels}
                            >
                              {getLocalizedText(child.label, currentLocale)}
                            </Link>
                          ))}
                        </div>
                      </details>
                    );
                  }

                  return (
                    <Link
                      key={item.key}
```

#### 第1067行附近

```tsx
                            setOpenMobileSectionKey((currentKey) =>
                              currentKey === item.key ? null : item.key,
                            );
                          }}
                        >
                          <span className="mobile-nav-summary-text">
                            {navLabel}
                          </span>
                        </summary>

                        <div className="mobile-nav-submenu">
                          {mobileChildren.map((child) => (
                            <Link
                              key={child.key}
                              href={getLocalizedHref(child.href, currentLocale)}
                              className="mobile-nav-submenu-link"                        onClick={closeAllPanels}
                            >
                              {getLocalizedText(child.label, currentLocale)}
                            </Link>
                          ))}
                        </div>
                      </details>
                    );
                  }

                  return (
                    <Link
                      key={item.key}
                      href={navHref}
                      className={`mobile-nav-link ${isNavActive(item) ? "mobile-nav-link-active" : ""
                        }`}
                      onClick={closeAllPanels}
                    >
                      {navLabel}
                    </Link>
                  );
                })}
              </nav>
            </div>
          </div>
        </div>

        {/* PC 端 Mega 下拉面板 */}
```

#### 第1069行附近

```tsx
                            );
                          }}
                        >
                          <span className="mobile-nav-summary-text">
                            {navLabel}
                          </span>
                        </summary>

                        <div className="mobile-nav-submenu">
                          {mobileChildren.map((child) => (
                            <Link
                              key={child.key}
                              href={getLocalizedHref(child.href, currentLocale)}
                              className="mobile-nav-submenu-link"                        onClick={closeAllPanels}
                            >
                              {getLocalizedText(child.label, currentLocale)}
                            </Link>
                          ))}
                        </div>
                      </details>
                    );
                  }

                  return (
                    <Link
                      key={item.key}
                      href={navHref}
                      className={`mobile-nav-link ${isNavActive(item) ? "mobile-nav-link-active" : ""
                        }`}
                      onClick={closeAllPanels}
                    >
                      {navLabel}
                    </Link>
                  );
                })}
              </nav>
            </div>
          </div>
        </div>

        {/* PC 端 Mega 下拉面板 */}
        {activeMegaItem?.megaDropdown && (
          <div
```

#### 第1070行附近

```tsx
                          }}
                        >
                          <span className="mobile-nav-summary-text">
                            {navLabel}
                          </span>
                        </summary>

                        <div className="mobile-nav-submenu">
                          {mobileChildren.map((child) => (
                            <Link
                              key={child.key}
                              href={getLocalizedHref(child.href, currentLocale)}
                              className="mobile-nav-submenu-link"                        onClick={closeAllPanels}
                            >
                              {getLocalizedText(child.label, currentLocale)}
                            </Link>
                          ))}
                        </div>
                      </details>
                    );
                  }

                  return (
                    <Link
                      key={item.key}
                      href={navHref}
                      className={`mobile-nav-link ${isNavActive(item) ? "mobile-nav-link-active" : ""
                        }`}
                      onClick={closeAllPanels}
                    >
                      {navLabel}
                    </Link>
                  );
                })}
              </nav>
            </div>
          </div>
        </div>

        {/* PC 端 Mega 下拉面板 */}
        {activeMegaItem?.megaDropdown && (
          <div
            className={`site-nav-mega site-nav-mega-open site-nav-mega-${activeMegaItem.key}`}
```

#### 第1081行附近

```tsx
                              href={getLocalizedHref(child.href, currentLocale)}
                              className="mobile-nav-submenu-link"                        onClick={closeAllPanels}
                            >
                              {getLocalizedText(child.label, currentLocale)}
                            </Link>
                          ))}
                        </div>
                      </details>
                    );
                  }

                  return (
                    <Link
                      key={item.key}
                      href={navHref}
                      className={`mobile-nav-link ${isNavActive(item) ? "mobile-nav-link-active" : ""
                        }`}
                      onClick={closeAllPanels}
                    >
                      {navLabel}
                    </Link>
                  );
                })}
              </nav>
            </div>
          </div>
        </div>

        {/* PC 端 Mega 下拉面板 */}
        {activeMegaItem?.megaDropdown && (
          <div
            className={`site-nav-mega site-nav-mega-open site-nav-mega-${activeMegaItem.key}`}
            onMouseEnter={() => {
              if (activeMegaItem) {
                setDesktopMegaKey(activeMegaItem.key);
              }
            }}
          >
            <div className="site-nav-mega-inner">
              {/* 左侧分类区 */}
              <div className="site-nav-mega-sidebar">
                {activeMegaCategories.map((category) => {
                  /**
```

#### 第1083行附近

```tsx
                            >
                              {getLocalizedText(child.label, currentLocale)}
                            </Link>
                          ))}
                        </div>
                      </details>
                    );
                  }

                  return (
                    <Link
                      key={item.key}
                      href={navHref}
                      className={`mobile-nav-link ${isNavActive(item) ? "mobile-nav-link-active" : ""
                        }`}
                      onClick={closeAllPanels}
                    >
                      {navLabel}
                    </Link>
                  );
                })}
              </nav>
            </div>
          </div>
        </div>

        {/* PC 端 Mega 下拉面板 */}
        {activeMegaItem?.megaDropdown && (
          <div
            className={`site-nav-mega site-nav-mega-open site-nav-mega-${activeMegaItem.key}`}
            onMouseEnter={() => {
              if (activeMegaItem) {
                setDesktopMegaKey(activeMegaItem.key);
              }
            }}
          >
            <div className="site-nav-mega-inner">
              {/* 左侧分类区 */}
              <div className="site-nav-mega-sidebar">
                {activeMegaCategories.map((category) => {
                  /**
                   * 查找当前左侧栏目对应的右侧 card
                   *
```

#### 第1086行附近

```tsx
                          ))}
                        </div>
                      </details>
                    );
                  }

                  return (
                    <Link
                      key={item.key}
                      href={navHref}
                      className={`mobile-nav-link ${isNavActive(item) ? "mobile-nav-link-active" : ""
                        }`}
                      onClick={closeAllPanels}
                    >
                      {navLabel}
                    </Link>
                  );
                })}
              </nav>
            </div>
          </div>
        </div>

        {/* PC 端 Mega 下拉面板 */}
        {activeMegaItem?.megaDropdown && (
          <div
            className={`site-nav-mega site-nav-mega-open site-nav-mega-${activeMegaItem.key}`}
            onMouseEnter={() => {
              if (activeMegaItem) {
                setDesktopMegaKey(activeMegaItem.key);
              }
            }}
          >
            <div className="site-nav-mega-inner">
              {/* 左侧分类区 */}
              <div className="site-nav-mega-sidebar">
                {activeMegaCategories.map((category) => {
                  /**
                   * 查找当前左侧栏目对应的右侧 card
                   *
                   * 说明：
                   * 1. 左侧栏目本身 categories 没有 href
                   * 2. 真正的跳转链接在 cards 里面
```

#### 第1169行附近

```tsx
                        className="site-nav-mega-category-arrow"
                        aria-hidden="true"
                      />
                    </>
                  );

                  /**
                   * 有 href 的栏目渲染成 Link
                   * 例如：恒永达文化 → /about/culture
                   */
                  if (categoryHref) {
                    return (
                      <Link
                        key={category.key}
                        href={getLocalizedHref(categoryHref, currentLocale)}
                        className={`site-nav-mega-category ${currentMegaCategoryKey === category.key
                          ? "site-nav-mega-category-active"
                          : ""
                          }`}
                        onMouseEnter={() =>
                          setActiveMegaCategoryKey(category.key)
                        }                        onClick={closeAllPanels}
                      >
                        {categoryContent}
                      </Link>
                    );
                  }

                  /**
                   * 没有 href 的栏目只做 hover 切换
                   */
                  return (
                    <div
                      key={category.key}
                      className={`site-nav-mega-category ${currentMegaCategoryKey === category.key
                        ? "site-nav-mega-category-active"
                        : ""
                        }`}
                      onMouseEnter={() => setActiveMegaCategoryKey(category.key)}
                    >
                      {categoryContent}
                    </div>
                  );
```

#### 第1171行附近

```tsx
                      />
                    </>
                  );

                  /**
                   * 有 href 的栏目渲染成 Link
                   * 例如：恒永达文化 → /about/culture
                   */
                  if (categoryHref) {
                    return (
                      <Link
                        key={category.key}
                        href={getLocalizedHref(categoryHref, currentLocale)}
                        className={`site-nav-mega-category ${currentMegaCategoryKey === category.key
                          ? "site-nav-mega-category-active"
                          : ""
                          }`}
                        onMouseEnter={() =>
                          setActiveMegaCategoryKey(category.key)
                        }                        onClick={closeAllPanels}
                      >
                        {categoryContent}
                      </Link>
                    );
                  }

                  /**
                   * 没有 href 的栏目只做 hover 切换
                   */
                  return (
                    <div
                      key={category.key}
                      className={`site-nav-mega-category ${currentMegaCategoryKey === category.key
                        ? "site-nav-mega-category-active"
                        : ""
                        }`}
                      onMouseEnter={() => setActiveMegaCategoryKey(category.key)}
                    >
                      {categoryContent}
                    </div>
                  );
                })}
              </div>
```

#### 第1178行附近

```tsx
                   */
                  if (categoryHref) {
                    return (
                      <Link
                        key={category.key}
                        href={getLocalizedHref(categoryHref, currentLocale)}
                        className={`site-nav-mega-category ${currentMegaCategoryKey === category.key
                          ? "site-nav-mega-category-active"
                          : ""
                          }`}
                        onMouseEnter={() =>
                          setActiveMegaCategoryKey(category.key)
                        }                        onClick={closeAllPanels}
                      >
                        {categoryContent}
                      </Link>
                    );
                  }

                  /**
                   * 没有 href 的栏目只做 hover 切换
                   */
                  return (
                    <div
                      key={category.key}
                      className={`site-nav-mega-category ${currentMegaCategoryKey === category.key
                        ? "site-nav-mega-category-active"
                        : ""
                        }`}
                      onMouseEnter={() => setActiveMegaCategoryKey(category.key)}
                    >
                      {categoryContent}
                    </div>
                  );
                })}
              </div>

              {/* 右侧内容区 */}
              <div className="site-nav-mega-main" style={{ gridTemplateRows: "1fr", gap: 0, alignContent: "start" }}>
                {/* 右侧顶部说明区 */}
                <div className="site-nav-mega-heading" style={{ display: "none" }}>
                  <p>
                    {getLocalizedText(
```

#### 第1222行附近

```tsx
                        activeMegaCards[0]?.description
                        ? activeMegaCards[0].description
                        : activeMegaCategory?.description ??
                        activeMegaItem.megaDropdown.description,
                      currentLocale,
                    )}
                  </p>
                </div>

                {/* 产品 / 图片入口区域 */}
                <div className="site-nav-mega-product-area">
                  {activeMegaCards.map((card) => {
                    const cardImages = card.images || []; // 读取当前分类下的产品图片列表

                    const mainImage = card.image; // 读取单张主图，兼容旧数据结构

                    const displayProductImages = cardImages;

                    return (
                      <div key={card.key} className="site-nav-mega-product-group">
                        {displayProductImages.length > 0 ? (
                          <div className="site-nav-mega-product-grid">
                            {displayProductImages.map((cardImage) => {
                              const fallbackProductMeta =
                                getProductImageDisplayMeta(
                                  cardImage.src,
                                  currentLocale,
                                );

                              const productMeta = {
                                title: cardImage.title
                                  ? getLocalizedText(
                                    cardImage.title,
                                    currentLocale,
                                  )
                                  : fallbackProductMeta.title,

                                description: cardImage.description
                                  ? getLocalizedText(
                                    cardImage.description,
                                    currentLocale,
                                  )
                                  : fallbackProductMeta.description,
```

### data/navigation.ts

- 相关命中：3

## 五、项目内已有可点击图片卡片示例

- 没有找到明显的可点击图片数组示例

## 六、下一步需要确认

- productImage返回对象当前是否包含href
- Mega Menu图片卡片是否已经支持Link
- 如果未支持，只给图片卡片增加href，不改布局与CSS
- 点击后是否需要自动关闭Mega Menu

