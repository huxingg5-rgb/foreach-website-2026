export const pipettingPumpIntroductions: Record<string, Record<string, string[]>> = {
  zh: {
    "smtp2-1000ul": [
      "恒永达 SMTP2-1000 μL 是一款集成驱动控制的可编程气体置换式移液泵，标称容量为 1000 μL。产品配合一次性吸头完成样本转移、试剂分配与分装，可集成到自动化分析仪器、样本前处理设备和实验室移液工作站，用于将液体从样本管或试剂容器转移至反应管、样品杯及微孔板。",
      "针对自动移液过程中液面位置变化、吸头堵塞和吸头缺失等情况，SMTP2 支持液面检测、尖端堵塞检测与吸头有无检测，并具备自动脱吸头功能。检测信息可供设备控制程序判断移液状态，配合运动轴定位及异常处理流程，完成吸液、转移、排液和换吸头等操作。",
      "产品支持 RS232、RS485 和 CAN 通讯，便于与仪器控制系统连接。集成选型时，应结合实际工作液量、液体性质、吸头规格和移液节拍，确认吸排液参数与检测配置；移液准确性和重复性需在目标液体及实际设备条件下验证。",
    ],
    "smtp4-100ul": [
      "恒永达 SMTP4-100 μL 是一款面向自动化仪器集成的气体置换式移液泵，标称容量为 100 μL。产品配合一次性吸头完成样本吸取、转移和试剂添加，可用于样本前处理设备、自动化分析仪器及实验室工作站中的小体积液体处理工位。",
      "针对样本向反应管、样品杯或微孔板转移，以及反应体系中的定量加液需求，SMTP4-100 μL 可配合设备运动轴完成吸液与排液，并支持自动脱吸头。吸头规格及适配方式需结合容器尺寸、取液位置和换吸头流程确认。",
      "产品由设备方配套驱动与流程控制，液面及异常吸液监测需结合项目配置检测方案。选型时应明确最小、常用和最大工作液量，并结合液体性质、吸头规格与移液节拍验证实际表现；0.05 μL/步为驱动分辨率，不代表最小可靠移液量或移液准确性。",
    ],
    "smtp4-500ul": [
      "恒永达 SMTP4-500 μL 是一款面向自动化仪器集成的气体置换式移液泵，标称容量为 500 μL。产品配合一次性吸头完成样本转移、分装、稀释液添加与试剂分配，可用于样本前处理设备、自动加样单元及实验室液体处理工作站。",
      "对于单次液量较大的样本转移和加液任务，SMTP4-500 μL 可作为容量选型的候选配置，配合设备运动轴在源容器与目标容器之间完成液体转移，并支持自动脱吸头。样本分装所需的吸排液次数、动作顺序和吸头更换方式，应按实际液量与流程要求确定。",
      "产品由设备方配套驱动与流程控制，液面及异常吸液监测需结合项目配置检测方案。选型时应结合常用工作液量、液体性质、容器及吸头规格，确认吸排液参数与节拍；0.25 μL/步为驱动分辨率，移液准确性和重复性需在实际使用条件下验证。",
    ],
  },
  en: {
    "smtp2-1000ul": [
      "FOREACH SMTP2-1000 μL is a programmable air displacement pipetting pump with integrated drive and control and a nominal capacity of 1000 μL. It uses disposable tips for sample transfer, reagent dispensing and aliquoting. Designed for integration into automated analyzers, sample preparation equipment and laboratory pipetting workstations, it transfers liquids from sample tubes or reagent containers to reaction tubes, sample cups and microplates.",
      "SMTP2 supports liquid level, tip blockage and tip presence detection, together with automatic tip ejection, to address changing liquid levels, blocked tips and missing tips during automated pipetting. The instrument control program can use this feedback to assess pipetting status and coordinate positioning axes and exception handling during aspiration, transfer, dispensing and tip changes.",
      "RS232, RS485 and CAN communication support connection to the instrument controller. Integration requires aspiration and dispensing parameters and detection configurations to be matched to actual working volumes, liquid properties, tip specifications and cycle times. Pipetting accuracy and repeatability must be verified with the intended liquids under actual equipment operating conditions.",
    ],
    "smtp4-100ul": [
      "FOREACH SMTP4-100 μL is an air displacement pipetting pump with a nominal capacity of 100 μL, designed for integration into automated instruments. It uses disposable tips for sample aspiration, transfer and reagent addition in small-volume liquid handling stations within sample preparation equipment, automated analyzers and laboratory workstations.",
      "SMTP4-100 μL works with the instrument’s positioning axes to aspirate and dispense liquids for sample transfer into reaction tubes, sample cups or microplates and for measured additions to reaction mixtures. It supports automatic tip ejection. Tip specifications and compatibility must be confirmed against container dimensions, aspiration positions and the tip-changing sequence.",
      "The equipment integrator supplies drive and process control; liquid level and abnormal aspiration monitoring require a project-specific detection solution. Define minimum, routine and maximum working volumes, then validate performance with the intended liquids, tips and cycle times. The 0.05 μL/step drive resolution does not specify the minimum reliable pipetting volume or pipetting accuracy.",
    ],
    "smtp4-500ul": [
      "FOREACH SMTP4-500 μL is an air displacement pipetting pump with a nominal capacity of 500 μL, designed for integration into automated instruments. Disposable tips support sample transfer, aliquoting, diluent addition and reagent dispensing in sample preparation equipment, automated pipetting units and laboratory liquid handling workstations.",
      "SMTP4-500 μL is a capacity option for sample transfer and liquid addition tasks requiring larger individual volumes. It works with the instrument’s positioning axes to transfer liquids between source and destination containers and supports automatic tip ejection. Aspiration and dispensing cycles, motion sequences and tip changes for aliquoting must be defined according to actual volumes and workflow requirements.",
      "The equipment integrator supplies drive and process control; liquid level and abnormal aspiration monitoring require a project-specific detection solution. Match aspiration and dispensing parameters and cycle times to routine working volumes, liquid properties, containers and tips. The 0.25 μL/step specification is drive resolution; pipetting accuracy and repeatability must be verified under actual operating conditions.",
    ],
  },
  es: {
    "smtp2-1000ul": [
      "FOREACH SMTP2-1000 μL es una bomba de pipeteo programable por desplazamiento de aire, con accionamiento y control integrados y una capacidad nominal de 1000 μL. Utiliza puntas desechables para transferir muestras, dispensar reactivos y preparar alícuotas. Se integra en analizadores automatizados, equipos de preparación de muestras y estaciones de pipeteo para transferir líquidos desde tubos de muestras o recipientes de reactivos a tubos de reacción, cubetas de muestras y microplacas.",
      "SMTP2 incorpora detección de nivel de líquido, obstrucción y presencia de punta, además de expulsión automática de puntas. Estas funciones proporcionan información ante cambios de nivel, puntas obstruidas o ausencia de punta. El programa del instrumento puede utilizarla para evaluar el estado del pipeteo y coordinar los ejes de posicionamiento y la gestión de incidencias durante la aspiración, transferencia, dispensación y cambio de punta.",
      "Las interfaces RS232, RS485 y CAN permiten la conexión al controlador del instrumento. Durante la integración deben ajustarse los parámetros de aspiración y dispensación y la configuración de detección a los volúmenes de trabajo, las propiedades del líquido, las puntas y los tiempos de ciclo. La exactitud y la repetibilidad del pipeteo deben verificarse con los líquidos previstos y en las condiciones reales del equipo.",
    ],
    "smtp4-100ul": [
      "FOREACH SMTP4-100 μL es una bomba de pipeteo por desplazamiento de aire con una capacidad nominal de 100 μL, diseñada para integrarse en instrumentos automatizados. Utiliza puntas desechables para aspirar y transferir muestras y añadir reactivos en puestos de manipulación de pequeños volúmenes de equipos de preparación de muestras, analizadores automatizados y estaciones de laboratorio.",
      "SMTP4-100 μL trabaja con los ejes de posicionamiento del instrumento para aspirar y dispensar líquidos al transferir muestras a tubos de reacción, cubetas o microplacas y al realizar adiciones dosificadas a mezclas de reacción. Admite la expulsión automática de puntas. Las especificaciones y la compatibilidad de las puntas deben confirmarse según las dimensiones de los recipientes, las posiciones de aspiración y la secuencia de cambio de punta.",
      "El integrador del equipo proporciona el accionamiento y el control del proceso; la supervisión del nivel y de anomalías de aspiración requiere una solución de detección adaptada al proyecto. Deben definirse los volúmenes mínimo, habitual y máximo y validar el funcionamiento con los líquidos, puntas y tiempos de ciclo previstos. La resolución de accionamiento de 0,05 μL/paso no indica el volumen mínimo de pipeteo fiable ni su exactitud.",
    ],
    "smtp4-500ul": [
      "FOREACH SMTP4-500 μL es una bomba de pipeteo por desplazamiento de aire con una capacidad nominal de 500 μL, diseñada para integrarse en instrumentos automatizados. Utiliza puntas desechables para transferir y alicuotar muestras, añadir diluyente y dispensar reactivos en equipos de preparación de muestras, unidades de pipeteo automatizado y estaciones de manipulación de líquidos.",
      "SMTP4-500 μL es una opción de capacidad para transferencias y adiciones que requieren volúmenes mayores por operación. Trabaja con los ejes de posicionamiento del equipo para transferir líquidos entre los recipientes de origen y destino y admite la expulsión automática de puntas. El número de ciclos de aspiración y dispensación, la secuencia de movimientos y los cambios de punta deben definirse según los volúmenes reales y el procedimiento de alicuotado.",
      "El integrador del equipo proporciona el accionamiento y el control del proceso; la supervisión del nivel y de anomalías de aspiración requiere una solución de detección adaptada al proyecto. Los parámetros y tiempos de aspiración y dispensación deben ajustarse al volumen habitual, las propiedades del líquido, los recipientes y las puntas. Los 0,25 μL/paso corresponden a la resolución de accionamiento; la exactitud y la repetibilidad deben verificarse en condiciones reales de uso.",
    ],
  },
  fr: {
    "smtp2-1000ul": [
      "FOREACH SMTP2-1000 μL est une pompe de pipetage programmable à déplacement d’air, avec entraînement et commande intégrés et une capacité nominale de 1000 μL. Elle utilise des embouts jetables pour le transfert d’échantillons, la distribution de réactifs et l’aliquotage. Elle s’intègre aux analyseurs automatisés, aux équipements de préparation d’échantillons et aux stations de pipetage pour transférer les liquides des tubes d’échantillons ou récipients de réactifs vers des tubes de réaction, des godets et des microplaques.",
      "SMTP2 prend en charge la détection du niveau de liquide, des obstructions et de la présence d’embout, ainsi que l’éjection automatique des embouts. Ces fonctions fournissent des informations sur les variations de niveau, les embouts obstrués ou absents. Le programme de commande de l’instrument peut utiliser ces signaux pour évaluer l’état du pipetage et coordonner les axes de positionnement et la gestion des anomalies pendant l’aspiration, le transfert, la distribution et le changement d’embout.",
      "Les interfaces RS232, RS485 et CAN permettent la connexion à la commande de l’instrument. L’intégration exige d’adapter les paramètres d’aspiration et de distribution et la configuration de détection aux volumes de travail, aux propriétés des liquides, aux embouts et aux temps de cycle. L’exactitude et la répétabilité du pipetage doivent être vérifiées avec les liquides prévus dans les conditions réelles de fonctionnement de l’équipement.",
    ],
    "smtp4-100ul": [
      "FOREACH SMTP4-100 μL est une pompe de pipetage à déplacement d’air d’une capacité nominale de 100 μL, conçue pour l’intégration dans des instruments automatisés. Elle utilise des embouts jetables pour l’aspiration et le transfert d’échantillons et l’ajout de réactifs aux postes de manipulation de petits volumes des équipements de préparation d’échantillons, des analyseurs automatisés et des stations de laboratoire.",
      "SMTP4-100 μL fonctionne avec les axes de positionnement de l’instrument pour aspirer et distribuer les liquides lors du transfert d’échantillons vers des tubes de réaction, des godets ou des microplaques et lors d’ajouts dosés aux mélanges réactionnels. Elle prend en charge l’éjection automatique des embouts. Leurs spécifications et leur compatibilité doivent être confirmées selon les dimensions des récipients, les positions d’aspiration et la séquence de changement d’embout.",
      "L’intégrateur fournit l’entraînement et la commande du processus ; la surveillance du niveau et des anomalies d’aspiration nécessite une solution de détection adaptée au projet. Définir les volumes minimal, habituel et maximal, puis valider les performances avec les liquides, les embouts et les temps de cycle prévus. La résolution d’entraînement de 0,05 μL/pas ne représente ni le volume minimal de pipetage fiable ni l’exactitude du pipetage.",
    ],
    "smtp4-500ul": [
      "FOREACH SMTP4-500 μL est une pompe de pipetage à déplacement d’air d’une capacité nominale de 500 μL, conçue pour l’intégration dans des instruments automatisés. Elle utilise des embouts jetables pour le transfert et l’aliquotage d’échantillons, l’ajout de diluant et la distribution de réactifs dans les équipements de préparation d’échantillons, les unités de pipetage automatisé et les stations de manipulation de liquides.",
      "SMTP4-500 μL constitue une option de capacité pour les transferts d’échantillons et les ajouts de liquides nécessitant un volume plus élevé par opération. Elle fonctionne avec les axes de positionnement de l’instrument pour transférer les liquides entre les récipients source et destination et prend en charge l’éjection automatique des embouts. Le nombre de cycles d’aspiration et de distribution, l’ordre des mouvements et les changements d’embout doivent être définis selon les volumes réels et le protocole d’aliquotage.",
      "L’intégrateur fournit l’entraînement et la commande du processus ; la surveillance du niveau et des anomalies d’aspiration nécessite une solution de détection adaptée au projet. Les paramètres et les temps de cycle doivent être adaptés aux volumes habituels, aux propriétés des liquides, aux récipients et aux embouts. La valeur de 0,25 μL/pas correspond à la résolution d’entraînement ; l’exactitude et la répétabilité doivent être vérifiées dans les conditions réelles d’utilisation.",
    ],
  },
  ko: {
    "smtp2-1000ul": [
      "FOREACH SMTP2-1000 μL는 구동과 제어를 통합한 프로그래머블 공기 치환식 피펫팅 펌프로, 공칭 용량은 1000 μL입니다. 일회용 팁을 사용하여 시료 이송, 시약 분주 및 시료 분할 분주를 수행합니다. 자동 분석기, 시료 전처리 장비 및 실험실 피펫팅 워크스테이션에 통합하여 시료 튜브나 시약 용기의 액체를 반응 튜브, 시료 컵 및 마이크로플레이트로 옮길 수 있습니다.",
      "SMTP2는 자동 피펫팅 중 액면 변화, 팁 막힘 및 팁 누락에 대응할 수 있도록 액면 감지, 팁 막힘 감지, 팁 유무 감지와 자동 팁 배출을 지원합니다. 장비 제어 프로그램은 이 정보를 바탕으로 피펫팅 상태를 판단하고 위치 제어 축 및 이상 처리 절차와 연계하여 흡입, 이송, 분주 및 팁 교체를 수행할 수 있습니다.",
      "RS232, RS485 및 CAN 통신을 지원하여 장비 제어 시스템에 연결할 수 있습니다. 통합 시 실제 작업 액량, 액체 특성, 팁 사양 및 처리 주기에 맞춰 흡입·분주 매개변수와 감지 구성을 정해야 합니다. 피펫팅 정확도와 반복성은 대상 액체와 실제 장비 운전 조건에서 검증해야 합니다.",
    ],
    "smtp4-100ul": [
      "FOREACH SMTP4-100 μL는 자동화 장비 통합용 공기 치환식 피펫팅 펌프로, 공칭 용량은 100 μL입니다. 일회용 팁을 사용하여 시료 흡입과 이송, 시약 첨가를 수행하며 시료 전처리 장비, 자동 분석기 및 실험실 워크스테이션의 소량 액체 처리 공정에 사용할 수 있습니다.",
      "SMTP4-100 μL는 장비의 위치 제어 축과 연동하여 시료를 반응 튜브, 시료 컵 또는 마이크로플레이트로 옮기거나 반응 혼합물에 정해진 양의 액체를 첨가하기 위한 흡입과 분주를 수행하며, 자동 팁 배출을 지원합니다. 팁 사양과 호환성은 용기 크기, 흡입 위치 및 팁 교체 순서에 맞춰 확인해야 합니다.",
      "장비 통합업체가 구동 및 공정 제어를 구성하며, 액면 및 비정상 흡입 감지에는 프로젝트에 맞는 별도의 감지 구성이 필요합니다. 최소·일반·최대 작업 액량을 정하고 액체 특성, 팁 사양 및 처리 주기에 따라 실제 성능을 검증해야 합니다. 0.05 μL/스텝은 구동 분해능이며 최소 신뢰 가능 피펫팅 용량이나 피펫팅 정확도를 의미하지 않습니다.",
    ],
    "smtp4-500ul": [
      "FOREACH SMTP4-500 μL는 자동화 장비 통합용 공기 치환식 피펫팅 펌프로, 공칭 용량은 500 μL입니다. 일회용 팁을 사용하여 시료 이송과 분할 분주, 희석액 첨가 및 시약 분주를 수행하며 시료 전처리 장비, 자동 피펫팅 유닛 및 실험실 액체 처리 워크스테이션에 사용할 수 있습니다.",
      "SMTP4-500 μL는 1회 처리 액량이 비교적 큰 시료 이송 및 액체 첨가 작업에서 용량 선택 후보가 될 수 있습니다. 장비의 위치 제어 축과 연동하여 원래 용기에서 대상 용기로 액체를 이송하고 자동 팁 배출을 지원합니다. 시료 분할 분주에 필요한 흡입·분주 횟수, 동작 순서 및 팁 교체 방식은 실제 액량과 공정 요구사항에 따라 정해야 합니다.",
      "장비 통합업체가 구동 및 공정 제어를 구성하며, 액면 및 비정상 흡입 감지에는 프로젝트에 맞는 별도의 감지 구성이 필요합니다. 일반 작업 액량, 액체 특성, 용기 및 팁 사양에 맞춰 흡입·분주 매개변수와 처리 주기를 정해야 합니다. 0.25 μL/스텝은 구동 분해능이며 피펫팅 정확도와 반복성은 실제 사용 조건에서 검증해야 합니다.",
    ],
  },
  ru: {
    "smtp2-1000ul": [
      "FOREACH SMTP2-1000 μL — программируемый пипетирующий насос с воздушным вытеснением, встроенным приводом и управлением, номинальным объёмом 1000 мкл. Он использует одноразовые наконечники для переноса и аликвотирования образцов и дозирования реагентов. Насос предназначен для интеграции в автоматические анализаторы, оборудование пробоподготовки и станции пипетирования для переноса жидкостей из пробирок или ёмкостей с реагентами в реакционные пробирки, чашечки для образцов и микропланшеты.",
      "SMTP2 поддерживает обнаружение уровня жидкости, закупорки и наличия наконечника, а также автоматический сброс наконечников. Эти функции предоставляют информацию об изменениях уровня, закупорке или отсутствии наконечника. Программа прибора может использовать её для оценки состояния пипетирования и согласования осей позиционирования с обработкой нештатных ситуаций при аспирации, переносе, дозировании и смене наконечников.",
      "Интерфейсы RS232, RS485 и CAN обеспечивают подключение к контроллеру прибора. При интеграции параметры аспирации и дозирования и конфигурацию обнаружения необходимо согласовать с рабочими объёмами, свойствами жидкостей, наконечниками и временем цикла. Точность и повторяемость пипетирования следует проверять с целевыми жидкостями в реальных условиях работы оборудования.",
    ],
    "smtp4-100ul": [
      "FOREACH SMTP4-100 μL — пипетирующий насос с воздушным вытеснением и номинальным объёмом 100 мкл для интеграции в автоматизированные приборы. Одноразовые наконечники используются для аспирации и переноса образцов и добавления реагентов на участках обработки малых объёмов в оборудовании пробоподготовки, автоматических анализаторах и лабораторных станциях.",
      "SMTP4-100 μL работает совместно с осями позиционирования прибора для аспирации и дозирования при переносе образцов в реакционные пробирки, чашечки или микропланшеты и при дозированном добавлении жидкостей в реакционные смеси. Поддерживается автоматический сброс наконечников. Их характеристики и совместимость необходимо подтвердить с учётом размеров ёмкостей, положения при аспирации и последовательности смены наконечников.",
      "Привод и управление процессом обеспечивает интегратор оборудования; контроль уровня и нарушений аспирации требует отдельного решения по обнаружению с учётом проекта. Следует определить минимальный, типичный и максимальный рабочие объёмы и проверить работу с выбранными жидкостями, наконечниками и временем цикла. Разрешение привода 0,05 мкл/шаг не определяет минимальный надёжно дозируемый объём или точность пипетирования.",
    ],
    "smtp4-500ul": [
      "FOREACH SMTP4-500 μL — пипетирующий насос с воздушным вытеснением и номинальным объёмом 500 мкл для интеграции в автоматизированные приборы. Одноразовые наконечники используются для переноса и аликвотирования образцов, добавления разбавителя и дозирования реагентов в оборудовании пробоподготовки, автоматических модулях пипетирования и лабораторных станциях обработки жидкостей.",
      "SMTP4-500 μL можно рассматривать как вариант по объёму для переноса образцов и добавления жидкости, когда за одну операцию требуется больший объём. Насос работает совместно с осями позиционирования прибора для переноса жидкости между исходной и целевой ёмкостями и поддерживает автоматический сброс наконечников. Число циклов аспирации и дозирования, последовательность движений и смену наконечников при аликвотировании определяют по фактическим объёмам и требованиям процесса.",
      "Привод и управление процессом обеспечивает интегратор оборудования; контроль уровня и нарушений аспирации требует отдельного решения по обнаружению с учётом проекта. Параметры аспирации и дозирования и время цикла следует согласовать с типичными объёмами, свойствами жидкостей, ёмкостями и наконечниками. Значение 0,25 мкл/шаг обозначает разрешение привода; точность и повторяемость пипетирования необходимо проверить в реальных условиях эксплуатации.",
    ],
  },
};

const applicationLabels: Record<string, { tab: string; tags: string[][] }> = {
  zh: { tab: "应用", tags: [["样本转移", "试剂分配", "自动加样"], ["小体积样本转移", "反应体系加液", "试剂添加"], ["样本分装", "稀释液添加", "试剂转移"]] },
  en: { tab: "Applications", tags: [["Sample transfer", "Reagent dispensing", "Automated pipetting"], ["Small-volume sample transfer", "Reaction setup", "Reagent addition"], ["Sample aliquoting", "Diluent addition", "Reagent transfer"]] },
  es: { tab: "Aplicaciones", tags: [["Transferencia de muestras", "Dispensación de reactivos", "Pipeteo automatizado"], ["Transferencia de muestras de pequeño volumen", "Preparación de mezclas de reacción", "Adición de reactivos"], ["Alicuotado de muestras", "Adición de diluyente", "Transferencia de reactivos"]] },
  fr: { tab: "Applications", tags: [["Transfert d’échantillons", "Distribution de réactifs", "Pipetage automatisé"], ["Transfert de petits volumes d’échantillons", "Préparation de mélanges réactionnels", "Ajout de réactifs"], ["Aliquotage d’échantillons", "Ajout de diluant", "Transfert de réactifs"]] },
  ko: { tab: "응용 분야", tags: [["시료 이송", "시약 분주", "자동 피펫팅"], ["소량 시료 이송", "반응 혼합물 준비", "시약 첨가"], ["시료 분할 분주", "희석액 첨가", "시약 이송"]] },
  ru: { tab: "Применение", tags: [["Перенос образцов", "Дозирование реагентов", "Автоматическое пипетирование"], ["Перенос малых объёмов образцов", "Подготовка реакционных смесей", "Добавление реагентов"], ["Аликвотирование образцов", "Добавление разбавителя", "Перенос реагентов"]] },
};

export function applyPipettingPumpIntroduction<T extends Record<string, any>>(data: T, locale: string): T {
  const lang = locale === "zh-CN" ? "zh" : locale;
  const pipettingIntroductionParagraphs = pipettingPumpIntroductions[lang]?.[data.slug];
  if (!pipettingIntroductionParagraphs) return data;
  const description = pipettingIntroductionParagraphs.join("\n\n");
  const labels = applicationLabels[lang];
  const index = ["smtp2-1000ul", "smtp4-100ul", "smtp4-500ul"].indexOf(data.slug);
  return {
    ...data, description, summary: description, overview: description, pipettingIntroductionParagraphs,
    commonApplications: labels.tags[index],
    ...(data.applicationDetails ? { applicationDetails: { ...data.applicationDetails, tabLabel: labels.tab } } : {}),
  };
}
