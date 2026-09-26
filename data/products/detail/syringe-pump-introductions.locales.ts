export const syringePumpIntroductions: Record<string, Record<string, string[]>> = {
  "zh": {
    "hmd3-30mm-solenoid-syringe-pump": [
      "恒永达 HMD3 是一款 30 mm 行程的单通道电磁阀注射泵，集成玻璃注射器计量机构与电磁阀液路切换机构，可配置 50 μL–5 mL 玻璃注射器，用于自动化分析仪器的试剂定量加液、样本稀释和缓冲液分配。电磁阀配置与连接方式可根据吸液端、输出端及清洗路径需求定制。",
      "HMD3 通过注射器完成液体吸取与定量排出，配合电磁阀切换储液与输出路径，适合单个计量通道承担重复加液的仪器模块。提供 RS-232、RS-485 和 CAN 通讯配置，可结合单次加液量、补液频次、动作节拍及安装空间确认具体方案，集成到 IVD 分析仪、实验室仪器和自动化液体处理设备。"
    ],
    "hmd6-60mm-solenoid-syringe-pump": [
      "恒永达 HMD6 是一款 60 mm 行程的电磁阀注射泵，提供单通道及 2、3、4、6、8 通道配置，通过玻璃注射器计量与电磁阀切换液路，用于试剂定量加液、样本稀释和多通道缓冲液分配。系列可配置 25 μL–25 mL 玻璃注射器，其中 10 mL、25 mL 注射器用于单通道配置；电磁阀配置与流路连接方式支持按设备需求定制。",
      "HMD6 可根据加液位置数量、各路目标液量和设备节拍配置计量通道，满足单路加液或多个液路的定量分配需求。提供 RS-232、RS-485 和 CAN 通讯配置，各通道同步或独立动作的要求需结合驱动与控制方案确认。配置时可同时考虑针间距、安装宽度、补液与清洗顺序，便于集成到多针加液工位及自动化分析设备。"
    ],
    "hld3-30mm-rotary-valve-syringe-pump": [
      "恒永达 HLD3 是一款 30 mm 行程的旋转阀注射泵，集成玻璃注射器计量机构与多通旋转阀选路机构，可配置 50 μL–5 mL 玻璃注射器，提供 3 通、9 通等旋转阀配置，用于多试剂选择、样本稀释和定量分配。阀通数与连接方式可根据液源数量、输出方向及清洗路径需求定制。",
      "HLD3 通过旋转阀依次选择试剂、稀释液、清洗液或输出路径，由注射器完成吸取与定量排出，适合需要在多个液体路径之间顺序切换的仪器模块。提供 RS-232、RS-485 和 CAN 通讯配置，可结合目标加液量、选路顺序、清洗置换要求及安装空间确认具体方案，用于自动化分析和实验室液体处理。"
    ],
    "hld6-60mm-rotary-valve-syringe-pump": [
      "恒永达 HLD6 是一款 60 mm 行程的旋转阀注射泵，集成玻璃注射器计量机构与多通旋转阀选路机构，可配置 25 μL–25 mL 玻璃注射器，提供 3 通、5 通、9 通等旋转阀配置，用于多试剂定量分配、稀释液添加和清洗液输送。阀通数与连接方式可根据客户液路需求定制。",
      "HLD6 通过旋转阀连接并选择不同液源与输出路径，由注射器完成顺序吸取和定量排出，适用于多步骤加液、重复分配及清洗液切换流程。提供 RS-232、RS-485 和 CAN 通讯配置，可结合单次加液量、批次总液量、补液频次、阀切换顺序及安装空间确定配置，集成到 IVD 分析仪、实验室仪器和自动化液体处理系统。"
    ]
  },
  "en": {
    "hmd3-30mm-solenoid-syringe-pump": [
      "FOREACH HMD3 is a single-channel syringe pump with a 30 mm stroke and solenoid valves. It integrates glass-syringe metering with fluid-path switching and accepts 50 μL–5 mL glass syringes for reagent dispensing, sample dilution and buffer dispensing in automated analytical instruments. Solenoid-valve configurations and connections can be customized for aspiration, delivery and washing paths.",
      "HMD3 aspirates and dispenses measured volumes through the syringe while solenoid valves switch between supply and delivery paths. It suits modules using a single metering channel for repeated dispensing. RS-232, RS-485 and CAN communication options support integration into IVD analyzers, laboratory instruments and automated liquid handling equipment. Select the configuration according to dispense volume, refill frequency, cycle time and installation space."
    ],
    "hmd6-60mm-solenoid-syringe-pump": [
      "FOREACH HMD6 is a 60 mm stroke syringe pump with solenoid valves, available in single-channel and 2-, 3-, 4-, 6- or 8-channel configurations. Glass-syringe metering and valve switching support reagent dispensing, sample dilution and multichannel buffer dispensing. The series accepts 25 μL–25 mL glass syringes; 10 mL and 25 mL syringes are limited to single-channel configurations. Valve configurations and fluid connections can be customized for the instrument.",
      "Configure HMD6 metering channels according to dispensing positions, target volume per channel and instrument cycle time. RS-232, RS-485 and CAN communication options are available. Simultaneous or independent channel operation must be confirmed against the drive and control configuration. Consider needle spacing, installation width, refilling and washing sequences together for integration into multi-needle dispensing stations and automated analytical instruments."
    ],
    "hld3-30mm-rotary-valve-syringe-pump": [
      "FOREACH HLD3 is a 30 mm stroke rotary-valve syringe pump integrating glass-syringe metering with multi-way fluid-path selection. It accepts 50 μL–5 mL glass syringes and offers rotary-valve configurations including 3-way and 9-way options for reagent selection, sample dilution and metered dispensing. Valve configurations and connections can be customized for the liquid sources, delivery directions and washing paths.",
      "HLD3 selects reagent, diluent, wash-liquid or delivery paths sequentially through the rotary valve, while the syringe aspirates and dispenses measured volumes. It suits modules requiring sequential switching between multiple fluid paths. RS-232, RS-485 and CAN communication options are available. Select the configuration according to dispense volume, routing sequence, flushing requirements and installation space for automated analysis and laboratory liquid handling."
    ],
    "hld6-60mm-rotary-valve-syringe-pump": [
      "FOREACH HLD6 is a 60 mm stroke rotary-valve syringe pump integrating glass-syringe metering with multi-way fluid-path selection. It accepts 25 μL–25 mL glass syringes and offers configurations including 3-way, 5-way and 9-way rotary valves for reagent dispensing, diluent addition and wash-liquid transfer. Valve configurations and connections can be customized to suit the required fluid circuit.",
      "HLD6 connects and selects liquid sources and delivery paths through the rotary valve, while the syringe performs sequential aspiration and metered dispensing. It supports multistep liquid addition, repeated dispensing and wash-liquid switching. RS-232, RS-485 and CAN options support integration into IVD analyzers, laboratory instruments and automated liquid handling systems. Select the configuration according to dispense volume, batch volume, refill frequency, valve sequence and installation space."
    ]
  },
  "es": {
    "hmd3-30mm-solenoid-syringe-pump": [
      "FOREACH HMD3 es una bomba de jeringa monocanal con carrera de 30 mm y electroválvulas. Integra dosificación por jeringa de vidrio y conmutación de vías, y admite jeringas de 50 μL–5 mL para dosificar reactivos, diluir muestras y dispensar soluciones tampón. Las electroválvulas y conexiones pueden personalizarse para aspiración, salida y lavado en instrumentos analíticos automatizados.",
      "HMD3 aspira y dispensa volúmenes dosificados, mientras las electroválvulas conmutan entre suministro y salida. Es adecuada para módulos con un canal de dosificación repetida. Ofrece RS-232, RS-485 y CAN para integración en analizadores IVD, instrumentos de laboratorio y equipos automatizados. La configuración se define según dosis, frecuencia de recarga, tiempo de ciclo y espacio disponible."
    ],
    "hmd6-60mm-solenoid-syringe-pump": [
      "FOREACH HMD6 es una bomba de jeringa con carrera de 60 mm y electroválvulas, disponible con uno, 2, 3, 4, 6 u 8 canales. Combina dosificación por jeringa de vidrio y conmutación de vías para dispensar reactivos, diluir muestras y distribuir tampón en varios canales. Admite jeringas de 25 μL–25 mL; las de 10 y 25 mL se limitan a configuraciones monocanal. Las válvulas y conexiones se personalizan según el equipo.",
      "Los canales HMD6 se configuran según las posiciones de dispensación, la dosis por canal y el tiempo de ciclo. Ofrece RS-232, RS-485 y CAN. El funcionamiento simultáneo o independiente debe confirmarse según el accionamiento y el control. La separación entre agujas, el ancho de instalación y las secuencias de recarga y lavado se evalúan para estaciones de varias agujas e instrumentos analíticos automatizados."
    ],
    "hld3-30mm-rotary-valve-syringe-pump": [
      "FOREACH HLD3 es una bomba de jeringa con válvula rotativa y carrera de 30 mm, que integra dosificación por jeringa de vidrio y selección entre varias vías. Admite jeringas de 50 μL–5 mL y válvulas de 3 y 9 vías, entre otras configuraciones, para seleccionar reactivos, diluir muestras y dosificar líquidos. Las vías y conexiones se personalizan según fuentes, direcciones de salida y lavado.",
      "HLD3 selecciona secuencialmente reactivos, diluyentes, líquidos de lavado o salidas mediante la válvula rotativa; la jeringa aspira y dispensa volúmenes dosificados. Es adecuada para módulos con conmutación secuencial entre varias rutas. Ofrece RS-232, RS-485 y CAN. La configuración considera dosis, secuencia de selección, lavado y espacio para análisis automatizado y manipulación de líquidos en laboratorio."
    ],
    "hld6-60mm-rotary-valve-syringe-pump": [
      "FOREACH HLD6 es una bomba de jeringa con válvula rotativa y carrera de 60 mm, que integra dosificación por jeringa de vidrio y selección entre varias vías. Admite jeringas de 25 μL–25 mL y válvulas de 3, 5 y 9 vías, entre otras configuraciones, para dosificar reactivos, añadir diluyente y transferir líquido de lavado. Las válvulas y conexiones se personalizan según el circuito requerido.",
      "HLD6 selecciona fuentes y salidas mediante la válvula rotativa; la jeringa realiza aspiración secuencial y dispensación dosificada. Permite adición por etapas, dispensación repetida y cambio a líquido de lavado. Ofrece RS-232, RS-485 y CAN para analizadores IVD, instrumentos de laboratorio y sistemas automatizados. La configuración considera dosis, volumen del lote, recargas, secuencia de válvula y espacio."
    ]
  },
  "fr": {
    "hmd3-30mm-solenoid-syringe-pump": [
      "FOREACH HMD3 est une pompe à seringue monocanal avec course de 30 mm et électrovannes, associant dosage par seringue en verre et commutation des voies. Elle accepte des seringues de 50 μL à 5 mL pour le dosage de réactifs, la dilution d’échantillons et la distribution de tampons dans les instruments d’analyse automatisés. Les électrovannes et raccordements sont adaptés aux chemins d’aspiration, de sortie et de lavage.",
      "HMD3 aspire et distribue des volumes dosés par la seringue ; les électrovannes commutent les chemins d’alimentation et de sortie. Elle convient aux modules utilisant un canal pour des distributions répétées. RS-232, RS-485 et CAN permettent l’intégration aux analyseurs IVD, aux instruments de laboratoire et aux systèmes automatisés. La configuration tient compte de la dose, des remplissages, du temps de cycle et de l’espace disponible."
    ],
    "hmd6-60mm-solenoid-syringe-pump": [
      "FOREACH HMD6 est une pompe à seringue avec course de 60 mm et électrovannes, disponible avec 1, 2, 3, 4, 6 ou 8 canaux pour distribuer des réactifs, diluer des échantillons et distribuer du tampon sur plusieurs canaux. Elle associe dosage par seringue en verre et commutation des voies. La série accepte des seringues de 25 μL à 25 mL ; celles de 10 et 25 mL sont réservées aux configurations monocanal. Les vannes et raccordements sont personnalisables.",
      "Les canaux HMD6 sont configurés selon les positions de distribution, le volume par canal et le temps de cycle. RS-232, RS-485 et CAN sont proposés. Le fonctionnement simultané ou indépendant doit être confirmé selon l’entraînement et la commande. L’entraxe des aiguilles, la largeur de montage et les séquences de remplissage et de lavage sont étudiés ensemble pour les stations multi-aiguilles et les instruments automatisés."
    ],
    "hld3-30mm-rotary-valve-syringe-pump": [
      "FOREACH HLD3 est une pompe à seringue avec vanne rotative et course de 30 mm, associant dosage par seringue en verre et sélection de plusieurs voies. Elle accepte des seringues de 50 μL à 5 mL et propose notamment des vannes à 3 ou 9 voies pour sélectionner des réactifs, diluer des échantillons et distribuer des volumes dosés. Les voies et raccordements sont adaptés aux sources, aux sorties et au lavage.",
      "HLD3 sélectionne successivement les chemins de réactif, de diluant, de lavage ou de sortie par la vanne rotative ; la seringue assure l’aspiration et le dosage. Elle convient aux modules nécessitant une commutation séquentielle. RS-232, RS-485 et CAN sont proposés. La configuration tient compte de la dose, de la séquence de sélection, du rinçage et de l’espace disponible pour l’analyse automatisée et les opérations de laboratoire."
    ],
    "hld6-60mm-rotary-valve-syringe-pump": [
      "FOREACH HLD6 est une pompe à seringue avec vanne rotative et course de 60 mm, associant dosage par seringue en verre et sélection de plusieurs voies. Elle accepte des seringues de 25 μL à 25 mL et propose notamment des vannes à 3, 5 ou 9 voies pour distribuer des réactifs, ajouter du diluant et transférer du liquide de lavage. Les vannes et raccordements sont personnalisés selon le circuit demandé.",
      "HLD6 sélectionne les sources et les sorties par la vanne rotative ; la seringue assure l’aspiration séquentielle et le dosage. Elle convient à l’ajout en plusieurs étapes, à la distribution répétée et à la commutation du lavage. RS-232, RS-485 et CAN facilitent l’intégration aux analyseurs IVD, aux instruments de laboratoire et aux systèmes automatisés. La configuration tient compte de la dose, du volume du lot, des remplissages, de la séquence de vanne et de l’espace."
    ]
  },
  "ko": {
    "hmd3-30mm-solenoid-syringe-pump": [
      "FOREACH HMD3는 30 mm 스트로크의 단일 채널 솔레노이드 밸브 시린지 펌프로, 유리 시린지 정량 기구와 유로 전환 기구를 통합합니다. 50 μL–5 mL 유리 시린지를 장착하여 자동 분석 장비의 시약 정량 분주, 시료 희석 및 완충액 분주에 사용할 수 있습니다. 솔레노이드 밸브와 연결 방식은 흡입, 토출 및 세척 경로에 맞춰 구성할 수 있습니다.",
      "HMD3는 시린지로 액체를 흡입하고 정량 토출하며 솔레노이드 밸브로 공급 및 토출 경로를 전환합니다. 단일 채널로 반복 분주하는 장비 모듈에 적합합니다. RS-232, RS-485 및 CAN 통신 옵션을 제공하며 1회 분주량, 보충 빈도, 사이클 시간과 설치 공간에 맞춰 IVD 분석기, 실험실 장비 및 자동 액체 처리 장비에 통합할 수 있습니다."
    ],
    "hmd6-60mm-solenoid-syringe-pump": [
      "FOREACH HMD6는 60 mm 스트로크의 솔레노이드 밸브 시린지 펌프로, 단일 채널과 2, 3, 4, 6, 8채널 구성을 제공합니다. 유리 시린지 정량과 밸브 유로 전환을 통해 시약 분주, 시료 희석 및 다중 채널 완충액 분주에 사용됩니다. 25 μL–25 mL 유리 시린지를 장착할 수 있으며 10 mL 및 25 mL 시린지는 단일 채널에만 적용됩니다. 밸브와 연결 방식은 장비에 맞춰 구성할 수 있습니다.",
      "HMD6의 정량 채널은 분주 위치 수, 채널별 목표 액량 및 장비 사이클에 따라 구성합니다. RS-232, RS-485 및 CAN 통신 옵션을 제공하며 동시 또는 독립 동작은 구동 및 제어 구성에 따라 확인해야 합니다. 니들 간격, 설치 폭, 보충 및 세척 순서를 함께 검토하여 다중 니들 분주 공정과 자동 분석 장비에 통합할 수 있습니다."
    ],
    "hld3-30mm-rotary-valve-syringe-pump": [
      "FOREACH HLD3는 30 mm 스트로크의 로터리 밸브 시린지 펌프로, 유리 시린지 정량 기구와 다방향 유로 선택 기구를 통합합니다. 50 μL–5 mL 유리 시린지와 3방향, 9방향 등 밸브 구성을 제공하여 다중 시약 선택, 시료 희석 및 정량 분주에 사용됩니다. 밸브 방향 수와 연결 방식은 액체 공급원, 토출 방향 및 세척 경로에 맞춰 구성할 수 있습니다.",
      "HLD3는 로터리 밸브로 시약, 희석액, 세척액 또는 토출 경로를 순서대로 선택하고 시린지로 흡입과 정량 토출을 수행합니다. 여러 유로 사이의 순차 전환이 필요한 모듈에 적합합니다. RS-232, RS-485 및 CAN 통신 옵션을 제공하며 목표 분주량, 선택 순서, 세척 치환 요구사항과 설치 공간을 고려하여 자동 분석 및 실험실 액체 처리에 적용할 수 있습니다."
    ],
    "hld6-60mm-rotary-valve-syringe-pump": [
      "FOREACH HLD6는 60 mm 스트로크의 로터리 밸브 시린지 펌프로, 유리 시린지 정량 기구와 다방향 유로 선택 기구를 통합합니다. 25 μL–25 mL 유리 시린지와 3방향, 5방향, 9방향 등 밸브 구성을 제공하여 시약 정량 분주, 희석액 추가 및 세척액 이송에 사용됩니다. 밸브 방향 수와 연결 방식은 고객 유로에 맞춰 구성할 수 있습니다.",
      "HLD6는 로터리 밸브로 공급원과 토출 경로를 선택하고 시린지로 순차 흡입 및 정량 토출을 수행합니다. 다단계 가액, 반복 분주 및 세척액 전환 공정에 적합합니다. RS-232, RS-485 및 CAN 통신 옵션을 제공하며 1회 분주량, 배치 총량, 보충 빈도, 밸브 순서와 설치 공간에 따라 IVD 분석기, 실험실 장비 및 자동 액체 처리 시스템에 통합할 수 있습니다."
    ]
  },
  "ru": {
    "hmd3-30mm-solenoid-syringe-pump": [
      "FOREACH HMD3 — одноканальный шприцевой насос с ходом 30 мм и электромагнитными клапанами, объединяющий дозирование стеклянным шприцем и переключение путей. Шприцы 50 мкл–5 мл применяются для дозирования реагентов, разведения образцов и подачи буфера в автоматизированных аналитических приборах. Клапаны и соединения адаптируются под всасывание, выдачу и промывку.",
      "HMD3 всасывает и дозирует жидкость шприцем, а клапаны переключают пути подачи из емкости и выдачи. Насос подходит для модулей с одним каналом повторного дозирования. RS-232, RS-485 и CAN обеспечивают интеграцию в анализаторы IVD, лабораторные приборы и автоматизированные системы. Конфигурацию выбирают по дозе, частоте заполнения, времени цикла и монтажному пространству."
    ],
    "hmd6-60mm-solenoid-syringe-pump": [
      "FOREACH HMD6 — шприцевой насос с ходом 60 мм и электромагнитными клапанами, доступный с 1, 2, 3, 4, 6 или 8 каналами. Дозирование стеклянными шприцами и переключение путей обеспечивают подачу реагентов, разведение образцов и многоканальную подачу буфера. Серия допускает шприцы 25 мкл–25 мл; шприцы 10 и 25 мл применяются только в одноканальной конфигурации. Клапаны и соединения адаптируются под прибор.",
      "Каналы HMD6 выбирают по числу позиций дозирования, объему каждого канала и времени цикла. Предлагаются RS-232, RS-485 и CAN. Одновременную или независимую работу подтверждают по конфигурации привода и управления. При интеграции в многоигольные станции и аналитические приборы учитывают расстояние между иглами, монтажную ширину, заполнение и промывку."
    ],
    "hld3-30mm-rotary-valve-syringe-pump": [
      "FOREACH HLD3 — шприцевой насос с поворотным клапаном и ходом 30 мм, объединяющий дозирование стеклянным шприцем и выбор путей. Предлагаются шприцы 50 мкл–5 мл и, в частности, 3- и 9-ходовые клапаны для выбора реагентов, разведения образцов и дозирования. Число ходов и соединения адаптируются под источники, направления выдачи и промывку.",
      "HLD3 последовательно выбирает пути реагента, разбавителя, промывки или выдачи поворотным клапаном; шприц выполняет всасывание и дозирование. Насос подходит для модулей с последовательным переключением нескольких путей. Предлагаются RS-232, RS-485 и CAN. Конфигурацию определяют по дозе, последовательности выбора, промывке и монтажному пространству для автоматизированного анализа и лабораторных систем."
    ],
    "hld6-60mm-rotary-valve-syringe-pump": [
      "FOREACH HLD6 — шприцевой насос с поворотным клапаном и ходом 60 мм, объединяющий дозирование стеклянным шприцем и выбор путей. Предлагаются шприцы 25 мкл–25 мл и, в частности, 3-, 5- и 9-ходовые клапаны для дозирования реагентов, добавления разбавителя и переноса промывочной жидкости. Клапаны и соединения адаптируются под требуемую схему.",
      "HLD6 выбирает источники и выходные пути поворотным клапаном; шприц выполняет последовательное всасывание и дозирование. Насос подходит для многоэтапного добавления, повторного дозирования и переключения промывки. RS-232, RS-485 и CAN обеспечивают интеграцию в анализаторы IVD, лабораторные приборы и автоматизированные системы. Конфигурацию выбирают по дозе, объему партии, частоте заполнения, последовательности клапана и монтажному пространству."
    ]
  }
};
