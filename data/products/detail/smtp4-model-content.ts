import type { ProductApplicationsContent } from "./product-detail.types";

// Task emphasis distinguishes the pages; applications are not exclusive to a capacity.
// Numeric specifications remain in the existing datasheet-backed specification source.
const slugs = ["smtp4-100ul", "smtp4-250ul", "smtp4-500ul"] as const;
type Three = [string, string, string];
type QA = [string, string];
type Copy = {
  names: Three; titles: Three; metas: Three; intros: Three; tags: [Three, Three, Three];
  taskTitles: Three; tasks: Three; setupTitles: Three; setups: Three;
  integration: string; assembly: string; selection: string;
  labels: { tab: string; title: string; assembly: string; selection: string };
  faq250: [QA, QA, QA];
};

const copy: Record<string, Copy> = {
  zh: {
    names: ["小体积样本转移用气体置换式移液泵", "反应体系加液用 OEM 移液模块", "样本分装用自动脱吸头移液模块"],
    titles: ["小体积样本转移用气体置换式移液泵", "反应体系加液用 OEM 移液模块", "样本分装用自动脱吸头移液模块"],
    tags: [["小体积样本转移", "样本前处理", "一次性吸头"], ["反应体系加液", "试剂添加", "OEM集成"], ["样本分装", "稀释液添加", "自动脱吸头"]],
    metas: [
      "SMTP4-100 μL 气体置换式移液泵，用于小体积样本转移，支持一次性吸头与自动脱吸头。了解工作液量、吸头适配和设备驱动集成要求。",
      "SMTP4-250 μL OEM 移液模块，用于试剂加入与反应体系加液，支持自动脱吸头。查看容量、步进分辨率及运动轴与加液流程的集成要求。",
      "SMTP4-500 μL 移液模块，用于样本分装、稀释液添加与试剂转移，支持自动脱吸头。了解分装流程、可用容量和设备控制配套要求。",
    ],
    intros: [
      "SMTP4-100 μL 是用于小体积样本转移的气体置换式移液泵，标称容量为 100 μL。可作为样本前处理设备和自动化分析仪器的移液组件，将样本从样本管转移至反应管、样品杯或微孔板。",
      "SMTP4-250 μL 是用于反应体系加液的 OEM 移液模块，采用气体置换方式，标称容量为 250 μL。可集成于自动化分析仪器和实验室工作站，配合设备程序向反应管或微孔板加入试剂，组织多步加液流程。",
      "SMTP4-500 μL 是用于样本分装的气体置换式移液模块，标称容量为 500 μL。可集成于样本前处理设备和自动加样单元，完成样本向多个目标容器的转移，也可用于稀释液添加和试剂分配。",
    ],
    taskTitles: ["样本前处理：小体积样本转移", "反应体系：试剂加入与顺序加液", "样本前处理：样本分装"],
    tasks: [
      "从样本管吸取目标液量，再配合运动轴转移至反应管、样品杯或板孔。设备程序应协调吸液深度、吸排速度、等待时间和排液位置；以实际进入目标容器的液量评估转移结果。",
      "按反应流程依次取用试剂，并加入指定反应管或板孔。每一步应明确试剂来源、目标液量、加液顺序和换吸头时机，配合运动轴完成定位；若涉及多种试剂，应分别设置适合其性质的吸排液参数。",
      "把样本按目标份数和体积转移至多个容器。可按设备流程逐份吸排；若采用一次吸液后多次分配，需核对程序、可用行程以及总液量和方法余量，并分别验证首份、中间份和末份的交付液量。",
    ],
    setupTitles: ["目标容器：小液量排液位置", "板孔加液：液滴交付与后续混匀", "稀释流程：稀释液与缓冲液添加"],
    setups: [
      "针对反应管、样品杯和微孔板，结合容器开口、底部形状及吸头长度确定排液高度和退出动作。检查吸头残留与外壁带液，并按实际液体确认是否采用接触式排液。",
      "反应体系加液需关注真正进入板孔的液量，以及吸头残留和容器挂壁。额外吹出或吸排混匀需要设备程序与可用行程配合；加入试剂不等于已经完成混匀，应按具体反应流程单独确认。",
      "按配方将稀释液或缓冲液加入样本容器，协调样本与稀释液的加入次序。稀释比例取决于实际交付体积，混匀由设备流程另行安排；换液体或吸头后应复核相应参数。",
    ],
    integration: "产品配合一次性吸头使用，支持自动脱吸头。驱动电路、运动轴与流程控制由设备方配套；液面、堵塞或吸头状态监测需求应另行配置检测方案。",
    assembly: "根据吸头料号、吸头架位置及容器布局，匹配装吸头、移液和脱吸头的动作路径。自动脱吸头仍需设备运动轴配合；吸头适配应检查密封、装卸力和机构行程。",
    selection: "请提供最小、常用和最大工作液量，液体、吸头料号、容器与目标节拍，再确认驱动和检测方案。按对应型号的分辨率和可用容量选型，并在实际工况下验证准确性与重复性；步进分辨率不等于最小可靠移液量或准确性。",
    labels: { tab: "应用", title: "典型应用", assembly: "设备集成：吸头装卸与运动轴配合", selection: "应用选型信息" },
    faq250: [
      ["SMTP4-250 μL 的容量和 0.125 μL/步分别代表什么？", "250 μL 是标称容量，0.125 μL/步是驱动分辨率，不是最小可靠移液量或准确性。反应体系各步的工作液量应结合吸头容量、方法余量和目标液体验证。"],
      ["反应体系加液的准确性和重复性如何确认？", "按各步实际液量、试剂、吸头和设备动作测量交付体积。规格书中的 SMTP4 性能表未按泵容量型号拆分，不能把全部数据直接用作 SMTP4-250 μL 的性能保证，应确认对应配置与测试条件。"],
      ["加入试剂后，SMTP4-250 μL 能直接完成混匀吗？", "试剂加入与混匀是不同的流程步骤。如需通过吸排液混匀，应由设备程序配置循环、液量和位置，并检查可用行程及液体条件；不能把加液动作直接视为已完成混匀。"],
    ],
  },
  en: {
    names: ["Air Displacement Pipetting Pump for Small-Volume Sample Transfer", "OEM Pipetting Module for Reaction Setup", "Pipetting Module with Automatic Tip Ejection for Sample Aliquoting"],
    titles: ["Small-Volume Sample Transfer Pump", "OEM Pipetting Module for Reaction Setup", "Sample Aliquoting Module with Tip Ejection"],
    tags: [["Small-volume sample transfer", "Sample preparation", "Disposable tips"], ["Reaction setup", "Reagent addition", "OEM integration"], ["Sample aliquoting", "Diluent addition", "Automatic tip ejection"]],
    metas: [
      "SMTP4-100 μL air displacement pump for small-volume sample transfer. Review disposable tips, automatic tip ejection and instrument drive integration.",
      "SMTP4-250 μL OEM pipetting module for reagent addition and reaction setup. Review automatic tip ejection, resolution and instrument integration.",
      "SMTP4-500 μL pipetting module for sample aliquoting and diluent addition. Review automatic tip ejection, usable capacity and host control requirements.",
    ],
    intros: [
      "SMTP4-100 μL is an air displacement pipetting pump for small-volume sample transfer, with a nominal capacity of 100 μL. It can serve as a pipetting component in sample preparation equipment and automated analyzers, transferring samples from tubes into reaction tubes, sample cups or microplates.",
      "SMTP4-250 μL is an OEM pipetting module for reaction setup, using air displacement with a nominal capacity of 250 μL. It can be integrated into automated analyzers and laboratory workstations to add reagents to reaction tubes or microplates as part of an instrument-controlled sequence.",
      "SMTP4-500 μL is an air displacement pipetting module for sample aliquoting, with a nominal capacity of 500 μL. It can be integrated into sample preparation equipment and automated dispensing units for transfer to multiple vessels, diluent addition and reagent dispensing.",
    ],
    taskTitles: ["Sample preparation: small-volume sample transfer", "Reaction setup: reagent addition and sequencing", "Sample preparation: sample aliquoting"],
    tasks: [
      "Aspirate the target volume from a sample tube and use the positioning axes to transfer it to a reaction tube, sample cup or well. Coordinate immersion depth, aspiration and dispense speeds, delays and dispense position. Evaluate the volume actually delivered to the destination vessel.",
      "Aspirate reagents in the required sequence and add them to the designated reaction tube or well. Define the source, target volume, order and tip-change point for each step, coordinating axis positioning. Set aspiration and dispense parameters for each reagent's properties.",
      "Transfer the sample into multiple vessels according to the target aliquot count and volume. The host can implement separate aspiration and dispense cycles; one aspiration followed by multiple dispenses requires checking the program, available travel, total delivery and method allowances. Verify first, intermediate and final aliquots separately.",
    ],
    setupTitles: ["Destination vessels: small-volume dispense positioning", "Microplate dispensing: droplet delivery and subsequent mixing", "Dilution workflows: diluent and buffer addition"],
    setups: [
      "Use the vessel opening, bottom geometry and tip length to define dispense height and withdrawal for tubes, sample cups and microplates. Check residual liquid and liquid carried on the tip exterior, and assess contact dispensing with the intended liquid.",
      "Reaction setup requires checking the volume delivered into the well, tip residue and liquid retained on vessel walls. Extra blowout or aspirate/dispense mixing requires host programming and available travel. Reagent addition does not establish that mixing is complete; assess mixing as a separate workflow step.",
      "Add diluent or buffer to the sample vessel according to the recipe, coordinating sample and diluent addition. The dilution ratio depends on delivered volumes; mixing is a separate instrument step. Recheck parameters after changing liquids or tips.",
    ],
    integration: "The product uses disposable tips and supports automatic tip ejection. The integrator supplies drive electronics, positioning axes and process control. Specify a separate sensing arrangement if liquid-level, blockage or tip-status monitoring is required.",
    assembly: "Match tip loading, pipetting and ejection paths to the tip part number, rack position and vessel layout. Automatic tip ejection still requires coordinated instrument motion. Confirm sealing, loading and ejection forces, and mechanical travel for the selected tips.",
    selection: "Provide minimum, routine and maximum working volumes, liquids, tip part numbers, vessels and target cycle time, then define drive and sensing arrangements. Select against the model's resolution and usable capacity and validate accuracy and repeatability under actual conditions. Drive resolution is not a minimum reliable transfer volume or an accuracy specification.",
    labels: { tab: "Applications", title: "Typical applications", assembly: "Instrument integration: tip handling and axis motion", selection: "Application selection inputs" },
    faq250: [
      ["What do the capacity and 0.125 μL/step of SMTP4-250 μL mean?", "250 μL is nominal capacity; 0.125 μL/step is drive resolution, not minimum reliable volume or accuracy. Validate each reaction step's working volume against tip capacity, method allowances and the intended liquid."],
      ["How should reaction-setup accuracy and repeatability be confirmed?", "Measure delivered volume for each actual volume, reagent, tip and instrument sequence. The SMTP4 performance table is not separated by pump capacity. Its full set of results is not a performance guarantee for SMTP4-250 μL; confirm the relevant configuration and test conditions."],
      ["Does SMTP4-250 μL complete mixing when it adds a reagent?", "Reagent addition and mixing are separate steps. Aspirate/dispense mixing requires host-programmed cycles, volumes and positions, with checks of available travel and liquid conditions. Adding a reagent alone does not establish that mixing is complete."],
    ],
  },
  es: {
    names: ["Bomba de pipeteo por desplazamiento de aire para transferencia de muestras de pequeño volumen", "Módulo de pipeteo OEM para preparación de mezclas de reacción", "Módulo de pipeteo con expulsión automática de puntas para alicuotado de muestras"],
    titles: ["Bomba para transferir muestras de pequeño volumen", "Pipeteo OEM para mezclas de reacción", "Alicuotado con expulsión automática de puntas"],
    tags: [["Transferencia de pequeños volúmenes", "Preparación de muestras", "Puntas desechables"], ["Mezclas de reacción", "Adición de reactivos", "Integración OEM"], ["Alicuotado de muestras", "Adición de diluyente", "Expulsión automática de puntas"]],
    metas: [
      "SMTP4-100 μL para transferir muestras de pequeño volumen. Consulte puntas desechables, expulsión automática e integración del accionamiento.",
      "Módulo OEM SMTP4-250 μL para añadir reactivos y preparar mezclas de reacción. Consulte expulsión de puntas, resolución e integración.",
      "SMTP4-500 μL para alicuotado y adición de diluyente. Consulte expulsión automática de puntas, capacidad útil y control del equipo.",
    ],
    intros: [
      "SMTP4-100 μL es una bomba de pipeteo por desplazamiento de aire para transferir muestras de pequeño volumen, con capacidad nominal de 100 μL. Puede integrarse en equipos de preparación de muestras y analizadores automáticos para transferir desde tubos de muestra a tubos de reacción, cubetas o microplacas.",
      "SMTP4-250 μL es un módulo OEM de pipeteo para preparar mezclas de reacción, por desplazamiento de aire y con capacidad nominal de 250 μL. Puede integrarse en analizadores automáticos y estaciones de laboratorio para añadir reactivos a tubos o microplacas dentro de una secuencia controlada por el equipo.",
      "SMTP4-500 μL es un módulo de pipeteo por desplazamiento de aire para alicuotado de muestras, con capacidad nominal de 500 μL. Puede integrarse en equipos de preparación de muestras y unidades automáticas de dispensación para transferir a varios recipientes, añadir diluyente y dispensar reactivos.",
    ],
    taskTitles: ["Preparación de muestras: transferencia de pequeños volúmenes", "Mezclas de reacción: adición secuencial de reactivos", "Preparación de muestras: alicuotado"],
    tasks: [
      "Aspire el volumen objetivo del tubo y utilice los ejes de posicionamiento para transferirlo al tubo de reacción, cubeta o pocillo. Coordine profundidad de inmersión, velocidades, esperas y posición de dispensación. Evalúe el volumen realmente entregado al recipiente.",
      "Tome los reactivos en el orden requerido y añádalos al tubo o pocillo asignado. Defina origen, volumen, orden y cambio de punta de cada paso, coordinando los ejes. Ajuste aspiración y dispensación a las propiedades de cada reactivo.",
      "Transfiera la muestra a varios recipientes según el número y volumen de alícuotas. El equipo puede ejecutar ciclos separados; una aspiración seguida de varias dispensaciones exige comprobar programa, recorrido útil, volumen total y márgenes del método. Verifique por separado las primeras, intermedias y últimas alícuotas.",
    ],
    setupTitles: ["Recipientes: posición de dispensación de pequeños volúmenes", "Microplacas: entrega de líquido y mezcla posterior", "Dilución: adición de diluyente y tampón"],
    setups: [
      "Defina altura de dispensación y retirada según la abertura, el fondo y la longitud de la punta para tubos, cubetas y microplacas. Compruebe residuos y líquido en el exterior de la punta; evalúe la dispensación por contacto con el líquido previsto.",
      "Compruebe el volumen entregado al pocillo, los residuos en la punta y el líquido retenido en las paredes. El soplado adicional o la mezcla por aspiración y dispensación requieren programación y recorrido disponible. Añadir reactivo no confirma una mezcla completa; evalúela como paso independiente.",
      "Añada diluyente o tampón según la receta y coordine el orden de adición. La proporción de dilución depende de los volúmenes entregados; la mezcla es un paso separado del equipo. Revise los parámetros al cambiar líquidos o puntas.",
    ],
    integration: "Utiliza puntas desechables y admite expulsión automática. El integrador aporta electrónica de accionamiento, ejes y control del proceso. La supervisión de nivel, obstrucciones o estado de la punta requiere un sistema de detección definido por separado.",
    assembly: "Adapte los recorridos de carga, pipeteo y expulsión a la referencia de punta, gradilla y disposición de recipientes. La expulsión automática sigue requiriendo movimiento coordinado del equipo. Confirme sellado, fuerzas de carga y expulsión y recorrido mecánico.",
    selection: "Indique volúmenes mínimo, habitual y máximo, líquidos, referencias de punta, recipientes y tiempo de ciclo; después defina accionamiento y detección. Seleccione según resolución y capacidad útil, y valide exactitud y repetibilidad en condiciones reales. La resolución no equivale al volumen mínimo fiable ni a la exactitud.",
    labels: { tab: "Aplicaciones", title: "Aplicaciones típicas", assembly: "Integración: manejo de puntas y movimiento de ejes", selection: "Datos para seleccionar la aplicación" },
    faq250: [
      ["¿Qué significan la capacidad y los 0.125 μL/paso del SMTP4-250 μL?", "250 μL es la capacidad nominal; 0.125 μL/paso es la resolución del accionamiento, no el volumen mínimo fiable ni la exactitud. Valide cada volumen de reacción considerando punta, márgenes del método y líquido."],
      ["¿Cómo confirmar exactitud y repetibilidad al preparar mezclas de reacción?", "Mida el volumen entregado con cada volumen, reactivo, punta y secuencia reales. La tabla de rendimiento SMTP4 no está separada por capacidad de bomba. Sus resultados completos no garantizan el rendimiento del SMTP4-250 μL; confirme configuración y condiciones de ensayo."],
      ["¿El SMTP4-250 μL completa la mezcla al añadir reactivo?", "Adición y mezcla son pasos distintos. Mezclar por aspiración y dispensación exige programar ciclos, volúmenes y posiciones, comprobando recorrido y líquido. La adición por sí sola no confirma una mezcla completa."],
    ],
  },
  fr: {
    names: ["Pompe de pipetage à déplacement d’air pour le transfert de petits volumes d’échantillons", "Module de pipetage OEM pour la préparation de mélanges réactionnels", "Module de pipetage à éjection automatique des embouts pour l’aliquotage d’échantillons"],
    titles: ["Pompe pour le transfert de petits volumes", "Pipetage OEM pour mélanges réactionnels", "Aliquotage avec éjection automatique des embouts"],
    tags: [["Transfert de petits volumes", "Préparation d’échantillons", "Embouts jetables"], ["Mélanges réactionnels", "Ajout de réactifs", "Intégration OEM"], ["Aliquotage d’échantillons", "Ajout de diluant", "Éjection automatique des embouts"]],
    metas: [
      "SMTP4-100 μL pour le transfert de petits volumes. Consultez les embouts jetables, leur éjection automatique et l’intégration de l’entraînement.",
      "Module OEM SMTP4-250 μL pour l’ajout de réactifs et les mélanges réactionnels. Consultez l’éjection des embouts, la résolution et l’intégration.",
      "SMTP4-500 μL pour l’aliquotage et l’ajout de diluant. Consultez l’éjection automatique des embouts, la capacité utile et la commande de l’instrument.",
    ],
    intros: [
      "SMTP4-100 μL est une pompe de pipetage à déplacement d’air pour le transfert de petits volumes d’échantillons, d’une capacité nominale de 100 μL. Elle peut s’intégrer aux équipements de préparation d’échantillons et aux analyseurs automatiques pour transférer des tubes sources vers des tubes de réaction, des godets ou des microplaques.",
      "SMTP4-250 μL est un module de pipetage OEM pour la préparation de mélanges réactionnels, à déplacement d’air et d’une capacité nominale de 250 μL. Il peut s’intégrer aux analyseurs automatiques et aux stations de laboratoire pour ajouter des réactifs aux tubes ou microplaques selon une séquence pilotée par l’instrument.",
      "SMTP4-500 μL est un module de pipetage à déplacement d’air pour l’aliquotage d’échantillons, d’une capacité nominale de 500 μL. Il peut s’intégrer aux équipements de préparation et aux unités de distribution automatisées pour transférer vers plusieurs récipients, ajouter du diluant et distribuer des réactifs.",
    ],
    taskTitles: ["Préparation d’échantillons : transfert de petits volumes", "Mélanges réactionnels : ajout séquentiel de réactifs", "Préparation d’échantillons : aliquotage"],
    tasks: [
      "Aspirez le volume cible dans le tube source, puis utilisez les axes pour le transférer vers le tube de réaction, le godet ou le puits. Coordonnez profondeur d’immersion, vitesses, attentes et position de distribution. Évaluez le volume réellement délivré dans le récipient cible.",
      "Prélevez les réactifs dans l’ordre requis et ajoutez-les au tube ou au puits désigné. Définissez source, volume, ordre et changement d’embout à chaque étape, en coordonnant les axes. Adaptez les paramètres d’aspiration et de distribution aux propriétés de chaque réactif.",
      "Transférez l’échantillon dans plusieurs récipients selon le nombre et le volume des aliquotes. L’instrument peut effectuer des cycles séparés ; une aspiration suivie de plusieurs distributions nécessite de vérifier programme, course utile, volume total et marges de méthode. Contrôlez séparément les premières, intermédiaires et dernières aliquotes.",
    ],
    setupTitles: ["Récipients cibles : position de distribution des petits volumes", "Microplaques : délivrance du liquide et mélange ultérieur", "Dilution : ajout de diluant et de tampon"],
    setups: [
      "Définissez hauteur de distribution et retrait selon l’ouverture, le fond et la longueur de l’embout pour les tubes, godets et microplaques. Contrôlez les résidus et le liquide à l’extérieur de l’embout ; évaluez la distribution par contact avec le liquide prévu.",
      "Contrôlez le volume délivré dans le puits, les résidus dans l’embout et le liquide retenu sur les parois. Soufflage supplémentaire et mélange par aspiration-distribution nécessitent programmation et course disponible. L’ajout de réactif ne garantit pas un mélange achevé ; évaluez cette étape séparément.",
      "Ajoutez diluant ou tampon selon la formulation, en coordonnant l’ordre des ajouts. Le rapport de dilution dépend des volumes délivrés ; le mélange relève d’une étape distincte de l’instrument. Revérifiez les paramètres après un changement de liquide ou d’embout.",
    ],
    integration: "Le produit utilise des embouts jetables et permet leur éjection automatique. L’intégrateur fournit électronique d’entraînement, axes et commande du procédé. La surveillance du niveau, des obstructions ou de l’état de l’embout nécessite un dispositif de détection distinct.",
    assembly: "Adaptez les trajectoires de chargement, pipetage et éjection à la référence d’embout, au portoir et aux récipients. L’éjection automatique nécessite toujours des mouvements coordonnés de l’instrument. Confirmez étanchéité, forces de chargement et d’éjection et course mécanique.",
    selection: "Précisez volumes minimal, courant et maximal, liquides, références d’embouts, récipients et temps de cycle, puis définissez entraînement et détection. Sélectionnez selon résolution et capacité utile, et validez justesse et répétabilité en conditions réelles. La résolution n’est ni un volume minimal fiable ni une spécification de justesse.",
    labels: { tab: "Applications", title: "Applications typiques", assembly: "Intégration : manipulation des embouts et mouvement des axes", selection: "Données de sélection pour l’application" },
    faq250: [
      ["Que signifient la capacité et les 0.125 μL/pas du SMTP4-250 μL ?", "250 μL est la capacité nominale ; 0.125 μL/pas est la résolution de l’entraînement, ni le volume minimal fiable ni la justesse. Validez chaque volume de réaction selon l’embout, les marges de méthode et le liquide."],
      ["Comment confirmer justesse et répétabilité des ajouts réactionnels ?", "Mesurez le volume délivré pour chaque volume, réactif, embout et séquence réels. Le tableau de performances SMTP4 ne distingue pas les capacités de pompe. L’ensemble de ses résultats ne garantit pas les performances du SMTP4-250 μL ; confirmez configuration et conditions d’essai."],
      ["Le SMTP4-250 μL achève-t-il le mélange en ajoutant le réactif ?", "Ajout et mélange sont deux étapes distinctes. Le mélange par aspiration-distribution exige des cycles, volumes et positions programmés, ainsi qu’une vérification de la course et du liquide. L’ajout seul ne confirme pas un mélange achevé."],
    ],
  },
  ko: {
    names: ["소량 시료 이송용 공기 치환식 피펫팅 펌프", "반응 혼합물 준비용 OEM 피펫팅 모듈", "시료 분할 분주용 자동 팁 배출 피펫팅 모듈"],
    titles: ["소량 시료 이송용 공기 치환식 피펫팅 펌프", "반응 혼합물 준비용 OEM 피펫팅 모듈", "시료 분할 분주용 자동 팁 배출 모듈"],
    tags: [["소량 시료 이송", "시료 전처리", "일회용 팁"], ["반응 혼합물 준비", "시약 첨가", "OEM 통합"], ["시료 분할 분주", "희석액 첨가", "자동 팁 배출"]],
    metas: [
      "소량 시료 이송용 SMTP4-100 μL 공기 치환식 펌프. 일회용 팁, 자동 팁 배출 및 장비 구동 통합 조건을 확인하세요.",
      "시약 첨가와 반응 혼합물 준비용 SMTP4-250 μL OEM 피펫팅 모듈. 자동 팁 배출, 분해능 및 장비 통합 조건을 확인하세요.",
      "시료 분할 분주 및 희석액 첨가용 SMTP4-500 μL 피펫팅 모듈. 자동 팁 배출, 가용 용량 및 장비 제어 조건을 확인하세요.",
    ],
    intros: [
      "SMTP4-100 μL는 소량 시료 이송용 공기 치환식 피펫팅 펌프로 공칭 용량은 100 μL입니다. 시료 전처리 장비와 자동 분석기의 구성품으로 통합하여 시료 튜브에서 반응 튜브, 시료 컵 또는 마이크로플레이트로 시료를 옮길 수 있습니다.",
      "SMTP4-250 μL는 반응 혼합물 준비용 OEM 피펫팅 모듈로 공기 치환 방식을 사용하며 공칭 용량은 250 μL입니다. 자동 분석기와 실험실 워크스테이션에 통합하여 장비가 제어하는 순서에 따라 반응 튜브나 마이크로플레이트에 시약을 첨가할 수 있습니다.",
      "SMTP4-500 μL는 시료 분할 분주용 공기 치환식 피펫팅 모듈로 공칭 용량은 500 μL입니다. 시료 전처리 장비와 자동 분주 장치에 통합하여 여러 용기로 시료를 옮기거나 희석액 첨가 및 시약 분주에 사용할 수 있습니다.",
    ],
    taskTitles: ["시료 전처리: 소량 시료 이송", "반응 혼합물 준비: 시약 첨가 순서", "시료 전처리: 분할 분주"],
    tasks: [
      "시료 튜브에서 목표 액량을 흡입한 후 위치 제어 축을 이용해 반응 튜브, 시료 컵 또는 웰로 옮깁니다. 침지 깊이, 흡입·분주 속도, 대기 시간 및 분주 위치를 조정하고 목표 용기에 실제 전달된 액량으로 결과를 평가하세요.",
      "필요한 순서로 시약을 취해 지정된 튜브나 웰에 첨가합니다. 각 단계의 시약 공급원, 목표 액량, 첨가 순서와 팁 교체 시점을 정하고 축 위치를 조정하세요. 시약별 특성에 맞게 흡입·분주 조건을 설정하세요.",
      "목표 분주 횟수와 액량에 따라 시료를 여러 용기로 옮깁니다. 장비는 개별 흡입·분주 주기를 실행할 수 있습니다. 한 번 흡입한 뒤 여러 번 분주하려면 프로그램, 가용 이동 거리, 총 액량과 방법 여유량을 확인하고 첫·중간·마지막 분주량을 각각 검증하세요.",
    ],
    setupTitles: ["목표 용기: 소량 분주 위치", "플레이트 분주: 액체 전달과 후속 혼합", "희석 과정: 희석액 및 완충액 첨가"],
    setups: [
      "튜브, 시료 컵 및 마이크로플레이트의 입구, 바닥 형상과 팁 길이에 따라 분주 높이와 후퇴 동작을 정하세요. 팁 내부 잔류액과 외벽 액체를 확인하고 실제 액체에 접촉식 분주를 적용할지 평가하세요.",
      "웰에 실제 전달된 액량, 팁 잔류액과 용기 벽면의 액체를 확인하세요. 추가 블로아웃이나 흡입·분주 혼합에는 장비 프로그램과 가용 이동 거리가 필요합니다. 시약 첨가만으로 혼합 완료를 판단할 수 없으며 혼합은 별도 단계로 평가해야 합니다.",
      "배합에 따라 희석액이나 완충액을 첨가하고 시료와 희석액의 투입 순서를 조정하세요. 희석 비율은 실제 전달 액량에 따라 결정되며 혼합은 별도의 장비 동작입니다. 액체나 팁 변경 후에는 조건을 다시 확인하세요.",
    ],
    integration: "일회용 팁을 사용하며 자동 팁 배출을 지원합니다. 구동 회로, 위치 제어 축 및 공정 제어는 장비 통합 업체가 구성합니다. 액면, 막힘 또는 팁 상태 감시가 필요하면 별도의 감지 구성을 마련해야 합니다.",
    assembly: "팁 품번, 랙 위치와 용기 배치에 맞게 팁 장착, 피펫팅 및 배출 경로를 구성하세요. 자동 팁 배출에도 장비의 축 동작 협조가 필요합니다. 선택한 팁의 밀봉, 장착·배출 힘과 기계적 이동 거리를 확인하세요.",
    selection: "최소·일반·최대 작업 액량, 액체, 팁 품번, 용기 및 목표 주기를 제공한 뒤 구동·감지 구성을 정하세요. 모델의 분해능과 가용 용량을 기준으로 선택하고 실제 조건에서 정확도와 반복성을 검증하세요. 구동 분해능은 최소 신뢰 이송량이나 정확도 수치가 아닙니다.",
    labels: { tab: "응용 분야", title: "주요 응용 분야", assembly: "장비 통합: 팁 처리 및 축 동작", selection: "응용 선택 정보" },
    faq250: [
      ["SMTP4-250 μL의 용량과 0.125 μL/스텝은 무엇을 의미하나요?", "250 μL는 공칭 용량이고 0.125 μL/스텝은 구동 분해능입니다. 최소 신뢰 액량이나 정확도가 아닙니다. 각 반응 단계의 액량은 팁 용량, 방법 여유량과 실제 액체를 고려하여 검증하세요."],
      ["반응 혼합물 준비 시 정확도와 반복성을 어떻게 확인하나요?", "각 단계의 실제 액량, 시약, 팁과 장비 동작으로 전달 액량을 측정하세요. SMTP4 성능표는 펌프 용량별로 구분되지 않습니다. 전체 결과를 SMTP4-250 μL의 성능 보증으로 적용할 수 없으며 해당 구성과 시험 조건을 확인해야 합니다."],
      ["SMTP4-250 μL로 시약을 첨가하면 혼합도 완료되나요?", "시약 첨가와 혼합은 별도 단계입니다. 흡입·분주 혼합에는 장비가 설정한 반복 횟수, 액량과 위치가 필요하며 가용 이동 거리와 액체 조건을 확인해야 합니다. 첨가만으로 혼합 완료가 확인되지는 않습니다."],
    ],
  },
  ru: {
    names: ["Пипетирующий насос с воздушным вытеснением для переноса малых объёмов образцов", "OEM-модуль пипетирования для приготовления реакционных смесей", "Модуль пипетирования с автоматическим сбросом наконечников для аликвотирования образцов"],
    titles: ["Насос для переноса малых объёмов образцов", "OEM-пипетирование для реакционных смесей", "Аликвотирование со сбросом наконечников"],
    tags: [["Перенос малых объёмов", "Пробоподготовка", "Одноразовые наконечники"], ["Реакционные смеси", "Внесение реагентов", "OEM-интеграция"], ["Аликвотирование образцов", "Добавление разбавителя", "Автоматический сброс наконечников"]],
    metas: [
      "SMTP4-100 мкл для переноса малых объёмов образцов. Одноразовые наконечники, автоматический сброс и требования к интеграции привода.",
      "OEM-модуль SMTP4-250 мкл для внесения реагентов и приготовления реакционных смесей. Сброс наконечников, разрешение и интеграция в прибор.",
      "SMTP4-500 мкл для аликвотирования и добавления разбавителя. Автоматический сброс наконечников, доступный объём и управление со стороны прибора.",
    ],
    intros: [
      "SMTP4-100 мкл — пипетирующий насос с воздушным вытеснением для переноса малых объёмов образцов, номинальной ёмкостью 100 мкл. Он может использоваться в оборудовании пробоподготовки и автоматических анализаторах для переноса из пробирок в реакционные пробирки, стаканчики или микропланшеты.",
      "SMTP4-250 мкл — OEM-модуль пипетирования для приготовления реакционных смесей, с воздушным вытеснением и номинальной ёмкостью 250 мкл. Он может интегрироваться в автоматические анализаторы и лабораторные станции для внесения реагентов в пробирки или микропланшеты по программе прибора.",
      "SMTP4-500 мкл — модуль пипетирования с воздушным вытеснением для аликвотирования образцов, номинальной ёмкостью 500 мкл. Он может интегрироваться в оборудование пробоподготовки и автоматические дозирующие узлы для переноса в несколько сосудов, добавления разбавителя и дозирования реагентов.",
    ],
    taskTitles: ["Пробоподготовка: перенос малых объёмов образцов", "Реакционные смеси: последовательное внесение реагентов", "Пробоподготовка: аликвотирование образцов"],
    tasks: [
      "Аспирируйте целевой объём из пробирки и с помощью осей позиционирования перенесите его в реакционную пробирку, стаканчик или лунку. Согласуйте глубину погружения, скорости, выдержки и позицию выдачи. Оценивайте объём, фактически поступивший в целевой сосуд.",
      "Отбирайте реагенты в нужной последовательности и вносите в назначенную пробирку или лунку. Для каждого шага задайте источник, объём, порядок и момент смены наконечника, согласовав движение осей. Настройте аспирацию и выдачу под свойства каждого реагента.",
      "Переносите образец в несколько сосудов согласно числу и объёму аликвот. Прибор может выполнять отдельные циклы аспирации и выдачи. Одна аспирация с несколькими выдачами требует проверки программы, доступного хода, суммарного объёма и запасов метода. Проверяйте первую, промежуточные и последнюю аликвоты отдельно.",
    ],
    setupTitles: ["Целевые сосуды: позиция выдачи малых объёмов", "Микропланшеты: доставка жидкости и последующее смешивание", "Разведение: добавление разбавителя и буфера"],
    setups: [
      "Задайте высоту выдачи и движение отвода с учётом отверстия, формы дна и длины наконечника для пробирок, стаканчиков и микропланшетов. Проверьте остаток внутри и жидкость снаружи наконечника; оцените контактную выдачу с рабочей жидкостью.",
      "Проверяйте объём, поступивший в лунку, остаток в наконечнике и удержание жидкости на стенках. Дополнительная продувка или смешивание аспирацией и выдачей требуют программы и доступного хода. Внесение реагента не подтверждает завершение смешивания; оценивайте его как отдельный этап.",
      "Добавляйте разбавитель или буфер по рецептуре, согласуя порядок внесения образца и разбавителя. Степень разведения зависит от выданных объёмов; смешивание выполняется отдельным этапом прибора. После смены жидкости или наконечников перепроверьте параметры.",
    ],
    integration: "Изделие работает с одноразовыми наконечниками и поддерживает их автоматический сброс. Интегратор предоставляет электронику привода, оси позиционирования и управление процессом. Контроль уровня, закупорки или состояния наконечника требует отдельной системы датчиков.",
    assembly: "Согласуйте траектории установки, пипетирования и сброса с артикулом наконечника, положением штатива и сосудов. Автоматический сброс также требует согласованных движений прибора. Проверьте герметичность, усилия установки и сброса и механический ход.",
    selection: "Укажите минимальный, обычный и максимальный объёмы, жидкости, артикулы наконечников, сосуды и время цикла, затем определите привод и датчики. Выбирайте по разрешению и доступному объёму модели, проверяя погрешность и повторяемость в реальных условиях. Разрешение привода не является минимальным надёжным объёмом или показателем точности.",
    labels: { tab: "Применение", title: "Типичные задачи", assembly: "Интеграция: работа с наконечниками и движение осей", selection: "Данные для подбора по задаче" },
    faq250: [
      ["Что означают ёмкость и 0.125 мкл/шаг у SMTP4-250 мкл?", "250 мкл — номинальная ёмкость; 0.125 мкл/шаг — разрешение привода, а не минимальный надёжный объём или точность. Проверяйте рабочий объём каждого шага реакции с учётом наконечника, запасов метода и жидкости."],
      ["Как подтвердить точность и повторяемость внесения реагентов?", "Измеряйте выданный объём для каждого рабочего объёма, реагента, наконечника и последовательности прибора. Таблица характеристик SMTP4 не разделена по ёмкостям насосов. Все её результаты нельзя считать гарантией для SMTP4-250 мкл; подтвердите конфигурацию и условия испытаний."],
      ["Завершает ли SMTP4-250 мкл смешивание при внесении реагента?", "Внесение и смешивание — разные этапы. Смешивание аспирацией и выдачей требует заданных программой циклов, объёмов и позиций, с проверкой хода и свойств жидкости. Само внесение реагента не подтверждает завершение смешивания."],
    ],
  },
};

export function getSmtp4ModelCopy(slug: string, locale: string) {
  const index = slugs.indexOf(slug as typeof slugs[number]);
  const lang = locale === "zh-CN" ? "zh" : locale;
  const text = copy[lang];
  if (index < 0 || !text) return undefined;
  const capacity = [100, 250, 500][index];
  const model = `SMTP4-${capacity} ${lang === "ru" ? "мкл" : "μL"}`;
  const heading = text.names[index];
  const applicationDetails: ProductApplicationsContent = {
    tabLabel: text.labels.tab, title: text.labels.title,
    intro: [text.intros[index]],
    items: [
      { title: text.taskTitles[index], paragraphs: [text.tasks[index]] },
      { title: text.setupTitles[index], paragraphs: [text.setups[index]] },
      { title: text.labels.assembly, paragraphs: [text.assembly] },
    ],
    selectionNote: { title: text.labels.selection, paragraphs: [text.selection] },
  };
  return {
    model, heading, title: `${text.titles[index]} | SMTP4-${capacity} | FOREACH`, meta: text.metas[index],
    paragraphs: [text.intros[index], text.integration], applicationDetails,
    tags: text.tags[index],
    faq250: text.faq250.map(([question, answer]) => ({ question, answer })),
  };
}
