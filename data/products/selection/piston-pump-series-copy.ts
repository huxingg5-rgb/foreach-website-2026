import type { SelectionLocale } from "./product-selection.types";

export type PistonSeriesKey = "category" | "ea" | "sm" | "tm";
type IntroCopy = { title: string; paragraphs: string[]; imageAlt: string };

/** Series-specific authoring. Capacities are not validated minimum doses. */
const copy: Record<SelectionLocale, Record<PistonSeriesKey, IntroCopy>> = {
  zh: {
    category: {
      title: "精密柱塞泵可用于微量至毫升级液体定量与分配",
      paragraphs: [
        "FOREACH 柱塞泵包括 EA 精密柱塞泵、SM 微型柱塞泵和 TM 超微型柱塞泵，用于自动化仪器中的液体吸取、定量、分配与加注。EA 系列容量覆盖 50 μL–20 mL；当前 SM 展示 50 μL–1 mL，TM 展示 50–500 μL 配置。容量和每步液量均不代表最小可靠加液量。",
        "在生化与免疫分析、实验室自动化、样品前处理、生命科学及水质与环境分析中，可按液路任务作为试剂加注泵、采样泵、样本稀释泵、缓冲液分配泵、反应液添加泵或标准液加标泵选型。具体适配性需结合实际液体与整机流程验证。",
        "EA 在规定测试条件下的满量程准确性和重复性均为 ≤0.5%；SM 的满量程重复性为 ≤0.5%，准确性需按配置确认。TM 的准确性、重复性、压力和寿命按所选配置与工况验证，不套用其他系列指标。",
        "EA 泵头可选 PMMA、PCTG、PEEK 等，柱塞可选氧化锆陶瓷、氧化铝陶瓷、PEEK 或蓝宝石。SM 泵头可选 PMMA、PSU、POM、PEEK，柱塞可选陶瓷、不锈钢或 PEEK。TM 当前展示 PMMA 泵头与陶瓷柱塞，其他材料按项目评估。泵头、柱塞、密封及阀件应整体核对兼容性；整条液路的避光需单独设计。可进一步了解[柱塞泵泵头材料的差异与选型方法](/resources/technical-articles/piston-pump-head-material-selection/)。",
        "EA、SM 支持 1/4-28 UNF 或 M6 液路接口，TM 展示配置采用 6-40 UNF。阀、反馈、驱动控制、接管与安装方式按项目匹配，安装空间需包含接头、管路弯曲和维护余量。",
        "按所承担的液路任务，精密柱塞泵可作为采样泵、试剂分配泵、计量泵或定量加注泵选型。请提供单次加液量、目标节拍、试剂成分、背压和安装尺寸，用于确认对应的容量、接液材料和控制配置。",
      ], imageAlt: "FOREACH EA、SM、TM 精密柱塞泵系列",
    },
    ea: {
      title: "EA精密柱塞泵适用于50 μL至20 mL液体定量与分配",
      paragraphs: [
        "FOREACH EA 系列是面向微量至毫升级精密液体处理的宽量程柱塞泵平台，容量覆盖 50 μL–20 mL，包括 50 μL、100 μL、250 μL、500 μL、1 mL、1.2 mL、2.5 mL、5 mL、6 mL、7.5 mL、10 mL 和 20 mL 等规格，可根据设备常用加液体积选择相应容量。",
        "EA 在规定测试条件下的满量程准确性和重复性均为 ≤0.5%。500 万次预计寿命对应纯水、常温和 50 kPa 背压。可围绕生化与免疫分析、样品前处理、实验室自动化及水质分析，配置试剂加注、样本稀释、缓冲液分配、标准液添加、定量清洗与预充液路；小液量性能需另行实测。",
        "泵头可选 PMMA、PCTG、PEEK 等，柱塞可选氧化锆陶瓷、氧化铝陶瓷、PEEK 或蓝宝石，其他工程材料按介质、结构与项目要求评估。应同时核对密封和阀件；PEEK 泵头不能单独保证全部接液部件兼容或整条液路避光。",
        "EA 支持 1/4-28 UNF 或 M6 平底液路接口，可按项目匹配电机、光耦反馈、阀组件及控制器。2.5 mL 的 2000 / 2236 步配置需依据实际导程与图纸确认；5 mL 和 10 mL 的基础每步液量均为 2.5 μL，增大容量不等于提高分配精细程度。",
      ], imageAlt: "FOREACH EA 精密柱塞泵用于试剂、稀释液与缓冲液定量处理",
    },
    sm: {
      title: "SM微型柱塞泵适用于紧凑设备中的微量液体定量与分配",
      paragraphs: [
        "FOREACH SM 微型柱塞泵覆盖 50 μL、100 μL、250 μL、500 μL 和 1 mL，面向小型自动化仪器及加样机构中的试剂加注、自动加样、样本稀释和缓冲液分配。可围绕生化与免疫分析、实验室自动化、生命科学及水质分析配置液路。",
        "SM 系列基础配置为 2000 步满量程，规定条件下的满量程重复性为 ≤0.5%。容量和每步液量不代表最小可靠加液量，准确性需按实际工作液量和所选配置确认。500 万次预计寿命对应纯水、常温、50 kPa 背压条件。",
        "当前展示 PMMA 和 PEEK 泵头配置。系列泵头可选 PMMA、PSU、POM、PEEK 等，柱塞可选陶瓷、不锈钢或 PEEK；泵头、柱塞、密封和阀件需按介质整体匹配，整条液路的避光要求需单独设计。",
        "SM 支持 1/4-28 UNF 或 M6 液路接口，可按项目匹配光耦、阀组件、加样针、管路及控制器。安装空间按对应容量图纸核对，并预留接头、管路和维护余量。",
      ], imageAlt: "FOREACH SM 微型柱塞泵用于自动加样和样本稀释",
    },
    tm: {
      title: "TM超微型柱塞泵适用于超紧凑液路中的精密液体处理",
      paragraphs: [
        "FOREACH TM 超微型柱塞泵展示 50 μL、100 μL、250 μL 和 500 μL 的 PMMA 泵头配置，面向安装空间受限的 OEM 分析模块，用于微量试剂加注、样本分配、反应液添加及缓冲液定量输送。",
        "TM 的选型重点是泵、阀、管路和检测单元在有限空间内的布局。展示配置采用 6-40 UNF 接口及 2540 步满量程；不同容量的本体尺寸应查看对应图纸，并计入接头、管路弯曲和拆装空间。",
        "可围绕生化与免疫分析、样品前处理、生命科学仪器及水质分析开展液路配置，按功能作为试剂加注泵、加样泵、反应液分配泵或缓冲液添加泵选型。实际适配性需结合工作液量、节拍、材料兼容性与完整液路确认。",
        "当前展示 PMMA 泵头与陶瓷柱塞；其他材料可按试剂成分、密封配合及结构空间评估。安装、接管、阀组件与驱动控制可按项目匹配，准确性、重复性、工作压力和寿命以所选配置及实际工况验证为准。",
      ], imageAlt: "FOREACH TM 超微型柱塞泵用于受限空间分析模块",
    },
  },
  en: {
    category: {
      title: "Precision Piston Pump for Microliter-to-Milliliter Liquid Metering and Dispensing",
      paragraphs: [
        "FOREACH offers EA precision, SM miniature and TM ultra-compact piston pumps for aspiration, metering, dispensing and dosing in automated instruments. The EA series covers 50 μL–20 mL; displayed SM configurations cover 50 μL–1 mL and TM configurations cover 50–500 μL. Neither capacity nor nominal volume per step defines the minimum reliable dose.",
        "For clinical chemistry, immunoassay, laboratory automation, sample preparation, life science and water or environmental analysis, selection can focus on a reagent dispensing pump, sampling pump, sample dilution pump, buffer dispensing pump, reaction-liquid dosing pump or standard-addition pump. Suitability requires validation with the actual fluid and instrument process.",
        "EA full-stroke accuracy and repeatability are both ≤0.5% under the specified test conditions. SM full-stroke repeatability is ≤0.5%; accuracy is configuration-specific. TM accuracy, repeatability, pressure and life require testing of the selected configuration and working conditions; other series ratings do not apply.",
        "EA head options include PMMA, PCTG and PEEK; piston options include zirconia ceramic, alumina ceramic, PEEK and sapphire. SM head options include PMMA, PSU, POM and PEEK; piston options include ceramic, stainless steel and PEEK. TM displays a PMMA head and ceramic piston, with other materials assessed per project. Check heads, pistons, seals and valves together; whole-path light protection needs a separate design assessment. Learn more in the [piston-pump head material selection guide](/en/resources/technical-articles/piston-pump-head-material-selection/).",
        "EA and SM support 1/4-28 UNF or M6 fluidic ports; displayed TM configurations use 6-40 UNF. Valves, feedback, drive controls, tubing and mounting are matched to the project. Allow for fittings, tubing bends and service access in the installation envelope.",
        "A precision piston pump can serve as a sampling pump, dispensing pump, metering pump or dosing pump within an instrument. Share the single-dose volume, target cycle time, fluid composition, backpressure and installation dimensions to define capacity, wetted materials and controls.",
      ], imageAlt: "FOREACH EA, SM and TM precision piston pump series",
    },
    ea: {
      title: "EA Precision Piston Pump for 50 μL to 20 mL Liquid Metering and Dispensing",
      paragraphs: [
        "FOREACH EA is a wide-capacity piston pump platform for microliter-to-milliliter precision liquid handling. The series covers 50 μL–20 mL, including 50 μL, 100 μL, 250 μL, 500 μL, 1 mL, 1.2 mL, 2.5 mL, 5 mL, 6 mL, 7.5 mL, 10 mL and 20 mL, allowing capacity selection against the instrument’s usual dose.",
        "EA full-stroke accuracy and repeatability are both ≤0.5% under specified test conditions. The expected five-million-cycle life uses pure water at room temperature and 50 kPa back pressure. Reagent addition, dilution, buffer dispensing, standard addition, metered washing and priming can be configured for clinical chemistry, immunoassay, sample preparation, laboratory automation and water analysis. Small-dose performance requires separate testing.",
        "Head options include PMMA, PCTG and PEEK; piston options include zirconia ceramic, alumina ceramic, PEEK and sapphire. Other engineering materials are assessed against fluid, structural and project requirements. Check seals and valves together; a PEEK head alone does not guarantee compatibility of all wetted parts or light protection for the entire fluid path.",
        "EA supports 1/4-28 UNF or M6 flat-bottom ports, with project-matched motors, optical feedback, valves and controllers. The 2.5 mL options of 2000 / 2236 steps must follow the actual lead and drawing. Basic 5 mL and 10 mL configurations both provide a nominal 2.5 μL per step; greater capacity does not imply finer dispensing.",
      ], imageAlt: "FOREACH EA precision piston pump for metered reagent, diluent and buffer handling",
    },
    sm: {
      title: "SM Miniature Piston Pump for Microliter Metering and Dispensing in Compact Instruments",
      paragraphs: [
        "FOREACH SM miniature piston pumps cover 50 μL, 100 μL, 250 μL, 500 μL and 1 mL for reagent addition, automated sampling, sample dilution and buffer dispensing in small automated instruments and sampling mechanisms. Fluid paths can be configured for clinical chemistry, immunoassay, laboratory automation, life science and water analysis.",
        "The basic SM configuration uses 2000 full-stroke steps with full-stroke repeatability ≤0.5% under specified conditions. Capacity and nominal volume per step are not minimum reliable doses; accuracy must be confirmed at the actual working volume. The expected five-million-cycle life uses pure water at room temperature and 50 kPa back pressure.",
        "Displayed configurations use PMMA or PEEK heads. Head options include PMMA, PSU, POM and PEEK; piston options include ceramic, stainless steel and PEEK. Heads, pistons, seals and valves must be matched together to the fluid. Whole-path light protection requires a separate design assessment.",
        "SM supports 1/4-28 UNF or M6 ports with project-matched optical sensors, valves, probes, tubing and controllers. Check the capacity-specific drawing and allow for fittings, tubing and maintenance access.",
      ], imageAlt: "FOREACH SM miniature piston pump for automated sampling and sample dilution",
    },
    tm: {
      title: "TM Ultra-Compact Piston Pump for Precision Liquid Handling in Restricted Spaces",
      paragraphs: [
        "FOREACH TM ultra-compact piston pumps display PMMA-head configurations of 50 μL, 100 μL, 250 μL and 500 μL for space-constrained OEM analytical modules. Tasks include microliter reagent addition, sample dispensing, reaction-liquid addition and metered buffer transfer.",
        "TM selection focuses on fitting the pump, valves, tubing and detection components into limited space. Displayed configurations use 6-40 UNF ports and 2540 full-stroke steps. Check each capacity’s drawing and include fittings, tubing bends and service access.",
        "Fluid paths can be assessed for clinical chemistry, immunoassay, sample preparation, life science and water analysis. Functional selection terms include reagent dispensing pump, sampling pump, reaction-liquid dispensing pump and buffer dosing pump. Suitability depends on working dose, timing, material compatibility and the complete fluid path.",
        "The displayed version uses a PMMA head and ceramic piston. Other materials are assessed against reagent chemistry, seals and structural space. Mounting, tubing, valves and drive control are project-specific; accuracy, repeatability, working pressure and life require validation of the selected configuration and actual conditions.",
      ], imageAlt: "FOREACH TM ultra-compact piston pump for space-constrained analytical modules",
    },
  },
  es: {
    category: {
      title: "Bomba de pistón de precisión para dosificación de microlitros a mililitros",
      paragraphs: [
        "FOREACH ofrece las series EA de precisión, SM en miniatura y TM ultracompacta para aspiración, dosificación y dispensación en instrumentos automatizados. EA cubre 50 μL–20 mL; las configuraciones SM mostradas cubren 50 μL–1 mL y TM, 50–500 μL. Ni la capacidad ni el volumen nominal por paso determinan la dosis mínima fiable.",
        "Para química clínica, inmunoensayo, automatización de laboratorio, preparación de muestras, ciencias de la vida y análisis de agua o ambiental, puede seleccionarse una bomba de reactivos, muestreo, dilución, tampón, líquido de reacción o adición de patrones. La idoneidad se valida con el fluido y el proceso reales.",
        "EA ofrece exactitud y repetibilidad a carrera completa ≤0.5 % en las condiciones especificadas. La repetibilidad SM a carrera completa es ≤0.5 %; la exactitud depende de la configuración. La exactitud, repetibilidad, presión y vida TM deben ensayarse en las condiciones seleccionadas, sin aplicar valores de otras series.",
        "EA admite cabezales PMMA, PCTG y PEEK, y pistones de zirconia, alúmina, PEEK o zafiro. SM admite cabezales PMMA, PSU, POM y PEEK, y pistones de cerámica, acero inoxidable o PEEK. TM muestra cabezal PMMA y pistón cerámico; otros materiales se evalúan por proyecto. Verifique juntos cabezal, pistón, juntas y válvulas; la protección de todo el circuito frente a la luz requiere diseño específico. Consulte la [guía de selección de materiales del cabezal de la bomba de pistón](/es/resources/technical-articles/piston-pump-head-material-selection/).",
        "EA y SM admiten puertos 1/4-28 UNF o M6; TM utiliza 6-40 UNF en las configuraciones mostradas. Las válvulas, realimentación, control, tubos y montaje se adaptan al proyecto. Reserve espacio para racores, curvas de tubo y mantenimiento.",
        "Según su función en el instrumento, una bomba de pistón de precisión puede utilizarse como bomba de muestreo, dispensación o dosificación. Indique el volumen por dosis, el tiempo de ciclo, la composición del fluido, la contrapresión y las dimensiones de montaje para definir la capacidad, los materiales en contacto con el fluido y el control.",
      ], imageAlt: "Series de bombas de pistón de precisión FOREACH EA, SM y TM",
    },
    ea: {
      title: "Bomba de pistón de precisión EA para dosificación de 50 μL a 20 mL",
      paragraphs: [
        "FOREACH EA es una plataforma de amplio rango para líquidos de microlitros a mililitros. Cubre 50 μL–20 mL, con capacidades de 50 μL, 100 μL, 250 μL, 500 μL, 1 mL, 1.2 mL, 2.5 mL, 5 mL, 6 mL, 7.5 mL, 10 mL y 20 mL, seleccionadas según la dosis habitual del instrumento.",
        "La exactitud y repetibilidad EA a carrera completa son ≤0.5 % en condiciones especificadas. La vida prevista de cinco millones de ciclos corresponde a agua pura, temperatura ambiente y 50 kPa de contrapresión. Pueden configurarse adición de reactivos, dilución, tampones, patrones, lavado dosificado y cebado para química clínica, inmunoensayo, preparación de muestras, laboratorio y análisis de agua. Las dosis pequeñas requieren ensayos adicionales.",
        "Los cabezales pueden ser PMMA, PCTG o PEEK, y los pistones, zirconia, alúmina, PEEK o zafiro. Otros materiales técnicos se evalúan según fluido, estructura y proyecto. Compruebe también juntas y válvulas; un cabezal PEEK no garantiza la compatibilidad de todas las piezas ni la protección de todo el circuito frente a la luz.",
        "EA admite puertos planos 1/4-28 UNF o M6 y configuración de motor, realimentación óptica, válvulas y controlador. Los 2000 / 2236 pasos de 2.5 mL deben corresponder al avance y plano reales. Las versiones básicas de 5 mL y 10 mL ofrecen ambas 2.5 μL nominales por paso; mayor capacidad no implica dosificación más fina.",
      ], imageAlt: "Bomba de pistón de precisión FOREACH EA para reactivos, diluyentes y tampones",
    },
    sm: {
      title: "Bomba de pistón SM en miniatura para dosificación microlítica en equipos compactos",
      paragraphs: [
        "FOREACH SM cubre 50 μL, 100 μL, 250 μL, 500 μL y 1 mL para adición de reactivos, muestreo automático, dilución y tampones en instrumentos pequeños y mecanismos de muestreo. Puede configurarse para química clínica, inmunoensayo, laboratorio, ciencias de la vida y análisis de agua.",
        "La configuración básica SM utiliza 2000 pasos por carrera completa y repetibilidad ≤0.5 % en condiciones especificadas. La capacidad y el volumen por paso no son dosis mínimas fiables; la exactitud se confirma con el volumen real. La vida prevista de cinco millones de ciclos corresponde a agua pura, temperatura ambiente y 50 kPa de contrapresión.",
        "Se muestran cabezales PMMA y PEEK. Las opciones incluyen PMMA, PSU, POM y PEEK para el cabezal, y cerámica, acero inoxidable o PEEK para el pistón. Seleccione juntos cabezal, pistón, juntas y válvulas según el fluido; diseñe por separado la protección de todo el circuito frente a la luz.",
        "SM admite puertos 1/4-28 UNF o M6 y sensores ópticos, válvulas, sondas, tubos y controladores adaptados al proyecto. Consulte el plano de cada capacidad y reserve espacio para racores, tubos y mantenimiento.",
      ], imageAlt: "Bomba de pistón FOREACH SM en miniatura para muestreo automático y dilución",
    },
    tm: {
      title: "Bomba de pistón TM ultracompacta para líquidos en espacios limitados",
      paragraphs: [
        "FOREACH TM muestra configuraciones con cabezal PMMA de 50 μL, 100 μL, 250 μL y 500 μL para módulos analíticos OEM con espacio limitado. Sus tareas incluyen adición microlítica de reactivos, dispensación de muestras, líquido de reacción y transferencia dosificada de tampón.",
        "La selección TM se centra en la disposición de bomba, válvulas, tubos y detectores. Las configuraciones mostradas utilizan puertos 6-40 UNF y 2540 pasos por carrera completa. Consulte el plano de cada capacidad y prevea racores, curvas de tubo y acceso de mantenimiento.",
        "Pueden evaluarse circuitos para química clínica, inmunoensayo, preparación de muestras, ciencias de la vida y análisis de agua. Según su función, se selecciona como bomba de reactivos, muestreo, líquido de reacción o tampón. La idoneidad depende de dosis, tiempo, compatibilidad y circuito completo.",
        "La versión mostrada utiliza cabezal PMMA y pistón cerámico. Otros materiales se evalúan según reactivo, juntas y espacio estructural. El montaje, tubos, válvulas y control se definen por proyecto; exactitud, repetibilidad, presión y vida útil requieren validar la configuración y las condiciones reales.",
      ], imageAlt: "Bomba de pistón FOREACH TM ultracompacta para módulos analíticos de espacio limitado",
    },
  },
  fr: {
    category: {
      title: "Pompe à piston de précision pour dosage du microlitre au millilitre",
      paragraphs: [
        "FOREACH propose les séries EA de précision, SM miniature et TM ultra-compacte pour l’aspiration, le dosage et la distribution dans les instruments automatisés. EA couvre 50 μL–20 mL ; les configurations SM présentées couvrent 50 μL–1 mL et TM, 50–500 μL. Ni la capacité ni le volume nominal par pas ne définissent la dose minimale fiable.",
        "En chimie clinique, immunoanalyse, automatisation de laboratoire, préparation d’échantillons, sciences de la vie et analyse de l’eau ou de l’environnement, le choix peut porter sur une pompe à réactifs, de prélèvement, de dilution, de tampon, de liquide réactionnel ou d’ajout d’étalons. L’adéquation se valide avec le fluide et le procédé réels.",
        "L’exactitude et la répétabilité EA sur la course complète sont ≤0.5 % dans les conditions spécifiées. La répétabilité SM sur la course complète est ≤0.5 % ; l’exactitude dépend de la configuration. L’exactitude, la répétabilité, la pression et la durée de vie TM doivent être testées pour la configuration et les conditions retenues, sans appliquer les valeurs d’autres séries.",
        "EA propose des têtes en PMMA, PCTG ou PEEK et des pistons en zircone, alumine, PEEK ou saphir. SM propose des têtes en PMMA, PSU, POM ou PEEK et des pistons en céramique, acier inoxydable ou PEEK. TM présente une tête en PMMA et un piston céramique ; les autres matériaux sont évalués par projet. Vérifiez ensemble tête, piston, joints et vannes ; la protection de tout le circuit contre la lumière nécessite une conception spécifique. Consultez le [guide de sélection des matériaux de tête de pompe à piston](/fr/resources/technical-articles/piston-pump-head-material-selection/).",
        "EA et SM acceptent des raccordements 1/4-28 UNF ou M6 ; TM utilise 6-40 UNF dans les configurations présentées. Vannes, retour d’information, commande, tuyaux et montage sont adaptés au projet. Prévoyez les raccords, les courbures des tuyaux et l’accès de maintenance.",
        "Selon sa fonction dans l’instrument, une pompe à piston de précision peut servir au prélèvement, à la distribution ou au dosage. Précisez le volume par dose, le temps de cycle, la composition du fluide, la contre-pression et les dimensions de montage pour définir la capacité, les matériaux en contact avec le fluide et la commande.",
      ], imageAlt: "Séries de pompes à piston de précision FOREACH EA, SM et TM",
    },
    ea: {
      title: "Pompe à piston de précision EA pour dosage de 50 μL à 20 mL",
      paragraphs: [
        "FOREACH EA est une plateforme à large gamme de capacités pour les liquides du microlitre au millilitre. Elle couvre 50 μL–20 mL, avec 50 μL, 100 μL, 250 μL, 500 μL, 1 mL, 1.2 mL, 2.5 mL, 5 mL, 6 mL, 7.5 mL, 10 mL et 20 mL, à sélectionner selon la dose habituelle de l’instrument.",
        "L’exactitude et la répétabilité EA sur la course complète sont ≤0.5 % dans les conditions spécifiées. La durée de vie prévue de cinq millions de cycles concerne l’eau pure à température ambiante sous 50 kPa de contre-pression. Ajout de réactifs, dilution, tampons, étalons, lavage dosé et amorçage peuvent être configurés pour la chimie clinique, l’immunoanalyse, la préparation d’échantillons, le laboratoire et l’analyse de l’eau. Les petites doses nécessitent des essais distincts.",
        "Les têtes peuvent être en PMMA, PCTG ou PEEK et les pistons en zircone, alumine, PEEK ou saphir. Les autres matériaux techniques sont évalués selon le fluide, la structure et le projet. Vérifiez aussi joints et vannes ; une tête en PEEK ne garantit pas la compatibilité de toutes les pièces ni la protection de tout le circuit contre la lumière.",
        "EA accepte des raccordements à fond plat 1/4-28 UNF ou M6, avec moteurs, retour optique, vannes et contrôleurs adaptés au projet. Les 2000 / 2236 pas de 2.5 mL doivent correspondre à l’avance et au plan réels. Les versions de base de 5 mL et 10 mL donnent toutes deux 2.5 μL nominaux par pas ; une capacité supérieure ne signifie pas un dosage plus fin.",
      ], imageAlt: "Pompe à piston de précision FOREACH EA pour réactifs, diluants et tampons",
    },
    sm: {
      title: "Pompe à piston miniature SM pour dosage microlitrique dans les instruments compacts",
      paragraphs: [
        "FOREACH SM couvre 50 μL, 100 μL, 250 μL, 500 μL et 1 mL pour l’ajout de réactifs, le prélèvement automatique, la dilution et les tampons dans de petits instruments et mécanismes de prélèvement. Elle peut être configurée pour la chimie clinique, l’immunoanalyse, le laboratoire, les sciences de la vie et l’analyse de l’eau.",
        "La configuration SM de base utilise 2000 pas sur la course complète et une répétabilité ≤0.5 % dans les conditions spécifiées. La capacité et le volume par pas ne constituent pas des doses minimales fiables ; l’exactitude se confirme au volume réel. La durée de vie prévue de cinq millions de cycles concerne l’eau pure à température ambiante sous 50 kPa de contre-pression.",
        "Les configurations présentées utilisent des têtes en PMMA ou PEEK. Les options comprennent PMMA, PSU, POM et PEEK pour la tête, et céramique, acier inoxydable ou PEEK pour le piston. Choisissez ensemble tête, piston, joints et vannes selon le fluide ; concevez séparément la protection de tout le circuit contre la lumière.",
        "SM accepte des raccordements 1/4-28 UNF ou M6 et des capteurs optiques, vannes, aiguilles, tuyaux et contrôleurs adaptés au projet. Consultez le plan de chaque capacité et prévoyez l’espace pour les raccords, les tuyaux et la maintenance.",
      ], imageAlt: "Pompe à piston miniature FOREACH SM pour prélèvement automatique et dilution",
    },
    tm: {
      title: "Pompe à piston ultra-compacte TM pour liquides dans les espaces restreints",
      paragraphs: [
        "FOREACH TM présente des configurations à tête PMMA de 50 μL, 100 μL, 250 μL et 500 μL pour les modules d’analyse OEM à espace limité. Les tâches incluent l’ajout microlitrique de réactifs, la distribution d’échantillons, l’ajout de liquide réactionnel et le transfert dosé de tampon.",
        "Le choix TM porte sur l’agencement de la pompe, des vannes, des tuyaux et des détecteurs. Les configurations présentées utilisent des raccordements 6-40 UNF et 2540 pas sur la course complète. Consultez le plan de chaque capacité et prévoyez les raccords, les courbures et l’accès de maintenance.",
        "Des circuits peuvent être évalués pour la chimie clinique, l’immunoanalyse, la préparation d’échantillons, les sciences de la vie et l’analyse de l’eau. Selon sa fonction, la pompe est choisie pour réactifs, prélèvement, liquide réactionnel ou tampon. L’adéquation dépend de la dose, du délai, de la compatibilité et du circuit complet.",
        "La version présentée utilise une tête en PMMA et un piston céramique. Les autres matériaux sont évalués selon le réactif, les joints et l’espace structurel. Montage, tuyaux, vannes et commande sont définis par projet ; exactitude, répétabilité, pression et durée de vie nécessitent la validation de la configuration et des conditions réelles.",
      ], imageAlt: "Pompe à piston ultra-compacte FOREACH TM pour modules d’analyse à espace limité",
    },
  },
  ko: {
    category: {
      title: "마이크로리터부터 밀리리터까지 정량 주입 및 분주용 정밀 피스톤 펌프",
      paragraphs: [
        "FOREACH는 자동화 장비의 흡입, 계량, 분주 및 주입을 위한 EA 정밀, SM 소형, TM 초소형 피스톤 펌프를 제공합니다. EA 시리즈는 50 μL–20 mL, 현재 표시된 SM 구성은 50 μL–1 mL, TM 구성은 50–500 μL를 지원합니다. 용량이나 스텝당 명목 액량이 최소 신뢰 분주량을 의미하지는 않습니다.",
        "임상화학, 면역분석, 실험실 자동화, 샘플 전처리, 생명과학, 수질 및 환경 분석에서 유로 기능에 따라 시약 주입, 샘플링, 샘플 희석, 완충액 분주, 반응액 첨가 또는 표준액 첨가 펌프로 선정할 수 있습니다. 적합성은 실제 유체와 장비 공정으로 검증해야 합니다.",
        "EA는 지정 시험 조건에서 전체 행정 정확도와 반복성이 모두 ≤0.5%입니다. SM의 전체 행정 반복성은 ≤0.5%이며 정확도는 구성별로 확인합니다. TM의 정확도, 반복성, 압력 및 수명은 선택한 구성과 조건에서 검증해야 하며 다른 시리즈의 수치를 적용하지 않습니다.",
        "EA 헤드는 PMMA, PCTG, PEEK, 피스톤은 지르코니아 세라믹, 알루미나 세라믹, PEEK 또는 사파이어를 선택할 수 있습니다. SM 헤드는 PMMA, PSU, POM, PEEK, 피스톤은 세라믹, 스테인리스강 또는 PEEK를 선택할 수 있습니다. TM은 PMMA 헤드와 세라믹 피스톤을 표시하며 다른 재료는 프로젝트별로 평가합니다. 헤드, 피스톤, 씰 및 밸브를 함께 확인하고 전체 유로 차광은 별도로 설계해야 합니다. 자세한 내용은 [피스톤 펌프 헤드 재질 선정 가이드](/ko/resources/technical-articles/piston-pump-head-material-selection/)를 참조하십시오.",
        "EA와 SM은 1/4-28 UNF 또는 M6 유체 포트를 지원하며, 표시된 TM 구성은 6-40 UNF를 사용합니다. 밸브, 피드백, 구동 제어, 배관 및 설치 방식을 프로젝트에 맞춥니다. 피팅, 배관 굽힘 및 유지보수 공간을 확보해야 합니다.",
        "정밀 피스톤 펌프는 장비에서 샘플링 펌프, 분주 펌프 또는 정량 주입 펌프로 사용할 수 있습니다. 1회 주입량, 목표 사이클 시간, 유체 성분, 배압 및 설치 치수를 알려 주시면 용량, 접액 소재와 제어 구성을 선정할 수 있습니다.",
      ], imageAlt: "FOREACH EA, SM, TM 정밀 피스톤 펌프 시리즈",
    },
    ea: {
      title: "50 μL–20 mL 액체 정량 주입 및 분주용 EA 정밀 피스톤 펌프",
      paragraphs: [
        "FOREACH EA는 마이크로리터부터 밀리리터까지 정밀 액체 처리를 위한 광범위 용량 플랫폼입니다. 50 μL–20 mL 범위에서 50 μL, 100 μL, 250 μL, 500 μL, 1 mL, 1.2 mL, 2.5 mL, 5 mL, 6 mL, 7.5 mL, 10 mL 및 20 mL 등을 제공하며 장비의 주 사용 액량에 맞춰 선택합니다.",
        "EA의 전체 행정 정확도와 반복성은 지정 조건에서 모두 ≤0.5%입니다. 예상 수명 500만 회는 순수, 상온 및 50 kPa 배압 조건입니다. 임상화학, 면역분석, 샘플 전처리, 실험실 자동화 및 수질 분석을 위해 시약 첨가, 희석, 완충액 분주, 표준액 첨가, 정량 세척 및 프라이밍 유로를 구성할 수 있습니다. 소량 분주 성능은 별도 시험이 필요합니다.",
        "헤드는 PMMA, PCTG, PEEK, 피스톤은 지르코니아 세라믹, 알루미나 세라믹, PEEK 또는 사파이어를 선택할 수 있습니다. 기타 엔지니어링 재료는 유체, 구조 및 프로젝트 요구로 평가합니다. 씰과 밸브도 함께 확인해야 하며, PEEK 헤드만으로 모든 접액 부품의 호환성이나 전체 유로 차광을 보장할 수 없습니다.",
        "EA는 1/4-28 UNF 또는 M6 평저 포트를 지원하며 모터, 광학 피드백, 밸브 및 컨트롤러를 구성할 수 있습니다. 2.5 mL의 2000 / 2236스텝 옵션은 실제 리드와 도면에 따라 확인합니다. 기본 5 mL 및 10 mL 구성의 스텝당 명목 액량은 모두 2.5 μL로, 용량 증가가 더 세밀한 분주를 의미하지는 않습니다.",
      ], imageAlt: "시약, 희석액 및 완충액 정량 처리용 FOREACH EA 정밀 피스톤 펌프",
    },
    sm: {
      title: "소형 장비의 미량 정량 주입 및 분주용 SM 소형 피스톤 펌프",
      paragraphs: [
        "FOREACH SM은 50 μL, 100 μL, 250 μL, 500 μL 및 1 mL 용량으로 소형 자동화 장비와 샘플링 기구의 시약 첨가, 자동 샘플링, 샘플 희석 및 완충액 분주에 활용합니다. 임상화학, 면역분석, 실험실, 생명과학 및 수질 분석용 유로를 구성할 수 있습니다.",
        "SM 기본 구성은 전체 행정 2000스텝이며 지정 조건에서 반복성은 ≤0.5%입니다. 용량과 스텝당 액량은 최소 신뢰 주입량이 아니며 정확도는 실제 액량에서 확인해야 합니다. 예상 수명 500만 회는 순수, 상온 및 50 kPa 배압 조건입니다.",
        "현재 PMMA 및 PEEK 헤드 구성을 표시합니다. 헤드는 PMMA, PSU, POM, PEEK, 피스톤은 세라믹, 스테인리스강 또는 PEEK를 선택할 수 있습니다. 헤드, 피스톤, 씰 및 밸브를 유체에 맞게 함께 선정하고 전체 유로의 차광은 별도로 설계합니다.",
        "SM은 1/4-28 UNF 또는 M6 포트를 지원하며 광센서, 밸브, 프로브, 배관 및 컨트롤러를 프로젝트에 맞춰 구성할 수 있습니다. 해당 용량 도면을 확인하고 피팅, 배관 및 유지보수 공간을 확보하십시오.",
      ], imageAlt: "자동 샘플링 및 샘플 희석용 FOREACH SM 소형 피스톤 펌프",
    },
    tm: {
      title: "제한된 공간의 정밀 액체 처리용 TM 초소형 피스톤 펌프",
      paragraphs: [
        "FOREACH TM은 공간이 제한된 OEM 분석 모듈을 위해 50 μL, 100 μL, 250 μL 및 500 μL PMMA 헤드 구성을 표시합니다. 미량 시약 첨가, 샘플 분주, 반응액 첨가 및 완충액 정량 이송에 활용할 수 있습니다.",
        "TM 선정에서는 제한된 공간의 펌프, 밸브, 배관 및 검출부 배치가 중요합니다. 표시 구성은 6-40 UNF 포트와 전체 행정 2540스텝을 사용합니다. 각 용량 도면을 확인하고 피팅, 배관 굽힘 및 유지보수 공간을 고려하십시오.",
        "임상화학, 면역분석, 샘플 전처리, 생명과학 및 수질 분석용 유로를 평가할 수 있습니다. 기능에 따라 시약 주입, 샘플링, 반응액 분주 또는 완충액 첨가 펌프로 선정합니다. 적합성은 실제 액량, 시간, 재료 호환성 및 전체 유로에 따라 확인합니다.",
        "표시 제품은 PMMA 헤드와 세라믹 피스톤을 사용합니다. 다른 재료는 시약 성분, 씰 및 구조 공간을 기준으로 평가합니다. 설치, 배관, 밸브 및 구동 제어는 프로젝트별로 결정하며 정확도, 반복성, 작동 압력 및 수명은 해당 구성과 실제 조건에서 검증해야 합니다.",
      ], imageAlt: "제한된 공간의 분석 모듈용 FOREACH TM 초소형 피스톤 펌프",
    },
  },
  ru: {
    category: {
      title: "Прецизионный поршневой насос для дозирования от микролитров до миллилитров",
      paragraphs: [
        "FOREACH предлагает прецизионную серию EA, миниатюрную SM и ультракомпактную TM для всасывания, дозирования и подачи жидкостей в автоматизированных приборах. EA охватывает 50 μL–20 mL; представленные SM — 50 μL–1 mL, TM — 50–500 μL. Ни номинальный объём, ни объём на шаг не определяют минимальную надёжную дозу.",
        "Для клинической химии, иммуноанализа, автоматизации лабораторий, пробоподготовки, наук о жизни, анализа воды и окружающей среды насос подбирают по функции: реагенты, отбор проб, разведение, буферы, реакционные жидкости или стандартные растворы. Пригодность проверяют с фактической жидкостью и процессом прибора.",
        "Точность и повторяемость EA на полном ходе составляют ≤0.5% в заданных условиях. Повторяемость SM на полном ходе — ≤0.5%; точность зависит от конфигурации. Точность, повторяемость, давление и ресурс TM проверяют для выбранной конфигурации и условий, без переноса показателей других серий.",
        "Для головок EA доступны PMMA, PCTG и PEEK, для поршней — циркониевая и алюмооксидная керамика, PEEK и сапфир. Для головок SM доступны PMMA, PSU, POM и PEEK, для поршней — керамика, нержавеющая сталь и PEEK. TM представлен с головкой из PMMA и керамическим поршнем; другие материалы оценивают по проекту. Головку, поршень, уплотнения и клапаны проверяют совместно; защита всего тракта от света требует отдельного проектирования. Подробнее см. [руководство по выбору материала головки поршневого насоса](/ru/resources/technical-articles/piston-pump-head-material-selection/).",
        "EA и SM поддерживают порты 1/4-28 UNF или M6; представленные TM используют 6-40 UNF. Клапаны, обратную связь, привод, трубки и монтаж подбирают под проект. Предусмотрите фитинги, изгибы трубок и доступ для обслуживания.",
        "В зависимости от задачи прибора прецизионный поршневой насос можно использовать для отбора проб, распределения или дозирования жидкости. Укажите объём одной дозы, время цикла, состав жидкости, противодавление и монтажные размеры для подбора вместимости, смачиваемых материалов и управления.",
      ], imageAlt: "Серии прецизионных поршневых насосов FOREACH EA, SM и TM",
    },
    ea: {
      title: "Прецизионный поршневой насос EA для дозирования от 50 μL до 20 mL",
      paragraphs: [
        "FOREACH EA — платформа с широким диапазоном объёмов для прецизионной работы с жидкостями от микролитров до миллилитров. Диапазон 50 μL–20 mL включает 50 μL, 100 μL, 250 μL, 500 μL, 1 mL, 1.2 mL, 2.5 mL, 5 mL, 6 mL, 7.5 mL, 10 mL и 20 mL; выбор определяется типичной дозой прибора.",
        "Точность и повторяемость EA на полном ходе составляют ≤0.5% в заданных условиях. Ожидаемые пять миллионов циклов относятся к чистой воде при комнатной температуре и противодавлении 50 kPa. Можно конфигурировать реагенты, разведение, буферы, стандартные растворы, дозированную промывку и заполнение тракта для клинической химии, иммуноанализа, пробоподготовки, лабораторий и анализа воды. Малые дозы требуют отдельных испытаний.",
        "Для головки доступны PMMA, PCTG и PEEK; для поршня — циркониевая и алюмооксидная керамика, PEEK и сапфир. Другие конструкционные материалы оценивают по жидкости, конструкции и требованиям проекта. Проверяйте также уплотнения и клапаны: головка из PEEK сама по себе не гарантирует совместимость всех деталей или защиту всего тракта от света.",
        "EA поддерживает порты с плоским дном 1/4-28 UNF или M6 и подбор двигателя, оптической обратной связи, клапанов и контроллера. Варианты 2000 / 2236 шагов для 2.5 mL должны соответствовать фактическому ходу винта и чертежу. Базовые версии 5 mL и 10 mL обе дают номинальные 2.5 μL на шаг; больший объём не означает более тонкого дозирования.",
      ], imageAlt: "Прецизионный поршневой насос FOREACH EA для реагентов, разбавителей и буферов",
    },
    sm: {
      title: "Миниатюрный поршневой насос SM для микролитрового дозирования в компактных приборах",
      paragraphs: [
        "FOREACH SM охватывает 50 μL, 100 μL, 250 μL, 500 μL и 1 mL для добавления реагентов, автоматического отбора проб, разведения и распределения буферов в небольших приборах и механизмах отбора. Возможна конфигурация для клинической химии, иммуноанализа, лабораторий, наук о жизни и анализа воды.",
        "Базовый SM использует 2000 шагов на полный ход с повторяемостью ≤0.5% в заданных условиях. Номинальный объём и объём на шаг не являются минимальными надёжными дозами; точность подтверждают при фактическом объёме. Ожидаемые пять миллионов циклов относятся к чистой воде при комнатной температуре и противодавлении 50 kPa.",
        "Представлены головки из PMMA и PEEK. Для головок доступны PMMA, PSU, POM и PEEK; для поршней — керамика, нержавеющая сталь и PEEK. Головку, поршень, уплотнения и клапаны подбирают совместно под жидкость; защиту всего тракта от света проектируют отдельно.",
        "SM поддерживает порты 1/4-28 UNF или M6 и подбор оптических датчиков, клапанов, зондов, трубок и контроллеров. Проверьте чертёж нужного объёма и предусмотрите пространство для фитингов, трубок и обслуживания.",
      ], imageAlt: "Миниатюрный поршневой насос FOREACH SM для автоматического отбора и разведения образцов",
    },
    tm: {
      title: "Ультракомпактный поршневой насос TM для работы с жидкостями в ограниченном пространстве",
      paragraphs: [
        "FOREACH TM представлен с головками из PMMA объёмом 50 μL, 100 μL, 250 μL и 500 μL для OEM-модулей анализа с ограниченным пространством. Задачи включают микролитровое добавление реагентов, дозирование образцов, добавление реакционной жидкости и дозированный перенос буфера.",
        "При подборе TM важна компоновка насоса, клапанов, трубок и детекторов. Представленные конфигурации используют порты 6-40 UNF и 2540 шагов на полный ход. Проверьте чертёж каждого объёма с учётом фитингов, изгибов трубок и доступа для обслуживания.",
        "Возможна оценка трактов для клинической химии, иммуноанализа, пробоподготовки, наук о жизни и анализа воды. По функции насос подбирают для реагентов, отбора проб, реакционной жидкости или буфера. Пригодность зависит от дозы, времени, совместимости материалов и полного тракта.",
        "Представленная версия использует головку из PMMA и керамический поршень. Другие материалы оценивают по реагенту, уплотнениям и конструктивному пространству. Монтаж, трубки, клапаны и привод определяются проектом; точность, повторяемость, рабочее давление и ресурс проверяют для выбранной конфигурации в фактических условиях.",
      ], imageAlt: "Ультракомпактный поршневой насос FOREACH TM для аналитических модулей с ограниченным пространством",
    },
  },
};

export function getPistonPumpIntroCopy(series: PistonSeriesKey, locale: SelectionLocale) {
  return copy[locale][series];
}

export const PISTON_SERIES_SLUGS: Record<string, PistonSeriesKey> = {
  "standard-piston-pump": "ea", "miniature-piston-pump": "sm", "ultra-compact-piston-pump": "tm",
};
