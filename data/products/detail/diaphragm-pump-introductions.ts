import type { SelectionLocale } from "@/data/products/selection/product-selection.types";
import type { DiaphragmPumpReferenceCopyKey } from "./diaphragm-pump-reference-models";

export type DiaphragmPumpIntroduction = readonly [string, string, string];
type ModelIntroductions = Record<DiaphragmPumpReferenceCopyKey, DiaphragmPumpIntroduction>;

// Authored in each locale: identity/application/design, configuration, OEM adaptation.
// Product facts follow FOREACH specifications. Terminology and presentation were
// reviewed against KNF's official EN/FR/ES/KO/RU pages (2026-10-27); competitor
// performance, certifications and service-life claims are not carried over.
const INTRODUCTIONS: Record<SelectionLocale, ModelIntroductions> = {
  zh: {
    "dpl30-brushed": [
      "DPL30-DB 是一款直流有刷驱动的自吸式微型液体隔膜泵，适用于 IVD、分析仪器和实验室设备中的清洗液输送、试剂转移及管路预充。通过膜片往复运动与进出口单向阀配合完成吸液和排液，输送液体与电机驱动机构隔离。",
      "提供 12 V / 24 V 配置，空载流量为 300 mL/min，额定压力为 100 kPa，自吸高度为 6 mH₂O。接液部分采用 PPS 泵头，可选 EPDM 膜片＋EPDM 阀片，或 PTFE 膜片＋FFKM 阀片组合。有刷版本规格寿命为 3000 h，对应额定电压、连续运行条件。",
      "支持 OEM 配套及目标寿命定制，可围绕线束、接口方向和安装要求开展适配。根据输送介质、工作背压、启停频率及每日运行时间匹配材料与驱动方案，并通过约定工况下的耐久测试确认寿命目标。"
    ],
    "dpl30-brushless": [
      "DPL30-BB 是一款采用两线供电无刷电机的自吸式微型液体隔膜泵，适用于自动化仪器中的供液、清洗液补充和小流量液体循环。膜片与进出口单向阀构成输送机构，将接液腔与驱动部分隔开，两线配置便于接入设备电源与启停控制。",
      "提供 12 V / 24 V 配置，空载流量为 300 mL/min，额定压力为 100 kPa，自吸高度为 6 mH₂O。接液部分采用 PPS 泵头，可选 EPDM 膜片＋EPDM 阀片，或 PTFE 膜片＋FFKM 阀片组合。无刷版本规格寿命为 10000 h，对应额定电压、连续运行条件。",
      "支持线束、接口适配及目标寿命定制，可根据设备工作周期和维护要求匹配配置。针对独立调速或转速反馈需求，可进一步选配相应驱动与引线方案，并结合实际介质、负载和启停条件开展寿命验证。"
    ],
    "dpl60-brushed": [
      "DPL60-DB 是一款直流有刷驱动的自吸式液体隔膜泵，适用于自动化设备中输送量较大的清洗、补液、排液和循环任务。采用膜片往复驱动与进出口单向阀结构，可作为 OEM 仪器内部的液体输送部件，通过电源启停配合设备工作流程。",
      "提供 12 V / 24 V 配置，空载流量为 600 mL/min，额定压力为 100 kPa，自吸高度为 3 mH₂O。接液部分采用 PPS 泵头，可选 EPDM 膜片＋EPDM 阀片，或 PTFE 膜片＋FFKM 阀片组合。有刷版本规格寿命为 3000 h，对应额定电压、连续运行条件。",
      "支持 OEM 安装适配、线束及接口方向调整，并支持目标寿命定制。可结合设备换液量、运行节拍、输送介质和背压确定配置，通过实际工作流量测试与耐久验证确认配套方案。"
    ],
    "dpl60-brushless": [
      "DPL60-BB 是一款无刷电机驱动的自吸式液体隔膜泵，适用于分析仪器和实验室自动化设备中的清洗液输送、补液及液体循环。采用隔膜式输送结构，液体与驱动机构隔离；选配调速配置后，可由设备控制板按不同工作阶段调整泵速。",
      "提供 12 V / 24 V 配置，空载流量为 600 mL/min，额定压力为 100 kPa，自吸高度为 3 mH₂O，可选配五线 PWM 调速接口。接液部分采用 PPS 泵头，可选 EPDM 膜片＋EPDM 阀片，或 PTFE 膜片＋FFKM 阀片组合。无刷版本规格寿命为 10000 h，对应额定电压、连续运行条件。",
      "支持控制接口、线束、安装适配及目标寿命定制。可根据清洗、补液或循环任务匹配调速与反馈配置，并结合实际转速范围、背压、介质和运行周期开展性能及寿命验证。"
    ],
    "dpl30h-brushed": [
      "DPL30H-DS 是一款直流有刷驱动的高压自吸式液体隔膜泵，面向含过滤器、细径管路或多个阀件的高背压液路，适用于 OEM 仪器中的供液、过滤输送和清洗任务。采用膜片与单向阀配合的容积式输送结构，可通过电源启停接入设备控制流程。",
      "提供 12 V / 24 V 配置，空载流量为 300 mL/min，额定压力为 600 kPa，自吸高度为 3 mH₂O。接液部分采用 PPS 泵头，可选 EPDM 膜片＋EPDM 阀片，或 PTFE 膜片＋FFKM 阀片组合。有刷版本规格寿命为 3000 h，对应额定电压、连续运行条件。",
      "支持 OEM 接口与安装适配、线束调整及目标寿命定制。可依据目标背压、实际供液量、介质和启停周期匹配方案，并通过对应液路中的流量测试与耐久验证确认配置。"
    ],
    "dpl30h-brushless": [
      "DPL30H-BS 是一款无刷电机驱动的高压自吸式液体隔膜泵，适用于分析仪器、IVD 和实验室自动化设备中的高背压供液、清洗液输送及液体循环。采用隔膜式输送结构，将接液腔与驱动机构隔离，可针对含过滤器、细径管路或阀组的液路进行选型。",
      "提供 12 V / 24 V 配置，空载流量为 300 mL/min，额定压力为 600 kPa，自吸高度为 3 mH₂O，可选配 PWM 或 0–5 V 调速配置。接液部分采用 PPS 泵头，可选 EPDM 膜片＋EPDM 阀片，或 PTFE 膜片＋FFKM 阀片组合。无刷版本规格寿命为 10000 h，对应额定电压、连续运行条件。",
      "支持调速与反馈配置、线束及安装适配，并支持目标寿命定制。可根据设备的高背压工作点、运行时间和维护周期匹配材料与驱动方案，通过实际介质及工作周期下的性能、温升和耐久测试确认定制要求。"
    ],
    "dpgl800-brushless": [
      "DPGL800-BS 是一款采用无刷电机驱动的双泵头气液隔膜泵，适用于自动化仪器中的含气废液抽吸、负压建立和管路排空。通过隔膜往复运动完成气体及气液混合介质的抽排，为 OEM 设备提供真空抽吸与废液回收配套方案。",
      "采用 24 V 供电，单泵头空载气体流量为 6 L/min，最大正压为 30 kPa，最大负压为＜−90 kPa。介质接触部分采用 PPS 泵头，可选 EPDM 膜片＋EPDM 阀片，或 PTFE 膜片＋FFKM 阀片组合，配备 G1/8 内螺纹接口。规格寿命为 10000 h，对应额定电压、连续运行条件。",
      "支持 OEM 接口方向、线束及安装适配，并支持目标寿命定制。可根据气液比例、目标负压、抽吸节拍和介质条件匹配方案，通过实际系统中的抽吸性能与耐久测试确认定制配置。"
    ]
  },
  en: {
    "dpl30-brushed": [
      "DPL30-DB is a self-priming miniature liquid diaphragm pump with a brushed DC motor for wash-fluid delivery, reagent transfer and line priming in IVD, analytical and laboratory instruments. A reciprocating diaphragm and inlet and outlet check valves move the liquid, while the diaphragm separates the wetted chamber from the motor drive.",
      "Available in 12 V and 24 V versions, the pump has a free-flow rate of 300 mL/min, a rated pressure of 100 kPa and a self-priming suction height of 6 mH₂O. Wetted-material options pair a PPS pump head with either an EPDM diaphragm and EPDM valves, or a PTFE diaphragm and FFKM valves. Specified service life is 3,000 h at rated voltage in continuous operation.",
      "OEM adaptation covers wiring, port orientation and installation requirements, with development available for project-specific service-life targets. Materials and drive configuration are matched to the fluid, backpressure, start-stop frequency and daily operating hours; endurance testing under agreed conditions validates the target."
    ],
    "dpl30-brushless": [
      "DPL30-BB is a self-priming miniature liquid diaphragm pump with a two-wire brushless DC motor for liquid supply, wash-fluid replenishment and low-flow recirculation in automated instruments. The diaphragm and check valves form the pumping mechanism, isolating the wetted chamber from the drive. Two-wire power connection supports straightforward integration with the instrument's power and on/off control.",
      "Choose a 12 V or 24 V version with a free-flow rate of 300 mL/min, a rated pressure of 100 kPa and a self-priming suction height of 6 mH₂O. The PPS pump head is available with an EPDM diaphragm and EPDM valves, or a PTFE diaphragm and FFKM valves. Specified brushless service life is 10,000 h at rated voltage in continuous operation.",
      "Wiring, connections and service-life targets can be tailored to the instrument's duty cycle and maintenance requirements. Projects requiring a separate speed-control input or speed feedback can specify a suitable drive and lead configuration. Service-life validation uses the intended fluid, load and start-stop cycle."
    ],
    "dpl60-brushed": [
      "DPL60-DB is a self-priming liquid diaphragm pump with a brushed DC motor for washing, replenishment, draining and recirculation duties requiring higher liquid throughput. Its reciprocating diaphragm and inlet and outlet check valves provide liquid transfer within OEM instruments, with power-switched on/off control to follow the equipment sequence.",
      "Available in 12 V and 24 V versions, it provides a free-flow rate of 600 mL/min, a rated pressure of 100 kPa and a self-priming suction height of 3 mH₂O. A PPS pump head is combined with either an EPDM diaphragm and EPDM valves, or a PTFE diaphragm and FFKM valves. Specified brushed service life is 3,000 h at rated voltage in continuous operation.",
      "OEM options include installation adaptation, wiring and port orientation, alongside development for a defined service-life target. The configuration is selected around exchange volume, cycle time, fluid and backpressure, then validated through flow and endurance testing in the intended fluid circuit."
    ],
    "dpl60-brushless": [
      "DPL60-BB is a self-priming liquid diaphragm pump with a brushless DC motor for wash-fluid delivery, replenishment and recirculation in analytical instruments and laboratory automation. The diaphragm separates the liquid from the drive. With the optional speed-control configuration, the instrument controller can adjust pump speed for each operating stage.",
      "Available in 12 V and 24 V versions, it has a free-flow rate of 600 mL/min, a rated pressure of 100 kPa and a self-priming suction height of 3 mH₂O. A five-wire PWM speed-control interface is optional. Wetted materials comprise a PPS pump head with either an EPDM diaphragm and EPDM valves, or a PTFE diaphragm and FFKM valves. Specified service life is 10,000 h at rated voltage in continuous operation.",
      "Control interfaces, wiring and mounting can be adapted for OEM integration, with service-life targets addressed through project development. Speed control and feedback options are matched to washing, replenishment or circulation duties; performance and endurance are verified over the intended speed range, backpressure, fluid and duty cycle."
    ],
    "dpl30h-brushed": [
      "DPL30H-DS is a self-priming high-pressure liquid diaphragm pump with a brushed DC motor for OEM liquid supply, filtration and washing duties. It is intended for fluid circuits with higher backpressure from filters, narrow-bore tubing or multiple valves. The positive-displacement diaphragm and check-valve mechanism integrates with equipment sequences through power-switched on/off control.",
      "Choose a 12 V or 24 V version with a free-flow rate of 300 mL/min, a rated pressure of 600 kPa and a self-priming suction height of 3 mH₂O. Wetted-material combinations use a PPS pump head with an EPDM diaphragm and EPDM valves, or a PTFE diaphragm and FFKM valves. Specified brushed service life is 3,000 h at rated voltage in continuous operation.",
      "OEM adaptation includes connections, mounting and wiring, with development available for application-specific service-life targets. The configuration is matched to target backpressure, required delivery, fluid and start-stop cycle, then confirmed by flow and endurance testing in the corresponding fluid circuit."
    ],
    "dpl30h-brushless": [
      "DPL30H-BS is a self-priming high-pressure liquid diaphragm pump with a brushless DC motor for liquid supply against backpressure, wash-fluid transfer and recirculation in analytical, IVD and laboratory automation equipment. Its diaphragm separates the wetted chamber from the drive, making it a candidate for circuits incorporating filters, narrow-bore tubing or valve manifolds.",
      "Available in 12 V and 24 V versions, the pump has a free-flow rate of 300 mL/min, a rated pressure of 600 kPa and a self-priming suction height of 3 mH₂O. PWM or 0–5 V speed-control configurations are available as options. The PPS pump head can be paired with an EPDM diaphragm and EPDM valves, or a PTFE diaphragm and FFKM valves. Specified service life is 10,000 h at rated voltage in continuous operation.",
      "Speed control, feedback, wiring and installation can be adapted for the OEM system, with development to agreed service-life targets. Materials and drive configuration are selected for the operating point, running hours and maintenance interval, then evaluated for performance, temperature rise and endurance using the intended fluid and duty cycle."
    ],
    "dpgl800-brushless": [
      "DPGL800-BS is a dual-head gas-liquid diaphragm pump with a brushless DC motor for air-containing waste aspiration, vacuum generation and line evacuation in automated instruments. Reciprocating diaphragms handle gases and gas-liquid mixtures, providing an OEM component for vacuum aspiration and waste recovery.",
      "The pump operates at 24 V, with a single-head free-flow gas rate of 6 L/min, maximum positive pressure of 30 kPa and maximum negative pressure below −90 kPa. Wetted materials combine PPS pump heads with EPDM diaphragms and EPDM valves, or PTFE diaphragms and FFKM valves. Connections are G1/8 female threads. Specified service life is 10,000 h at rated voltage in continuous operation.",
      "OEM adaptation covers port orientation, wiring and installation, with development available for defined service-life targets. The solution is matched to the gas-liquid ratio, target vacuum, aspiration cycle and fluid conditions, then verified through aspiration and endurance testing in the actual system."
    ]
  },
  es: {
    "dpl30-brushed": [
      "DPL30-DB es una microbomba de diafragma autocebante para líquidos, accionada por un motor de CC con escobillas. Está pensada para suministrar líquido de lavado, transferir reactivos y cebar circuitos en equipos de diagnóstico in vitro, instrumentos analíticos y equipos de laboratorio. El movimiento alternativo del diafragma, junto con las válvulas de retención de entrada y salida, impulsa el líquido y mantiene la cámara húmeda separada del accionamiento.",
      "Se ofrece en versiones de 12 V y 24 V, con un caudal libre de 300 mL/min, una presión nominal de 100 kPa y una altura de aspiración autocebante de 6 mH₂O. El cabezal de PPS se combina con diafragma y válvulas de EPDM, o con diafragma de PTFE y válvulas de FFKM. La vida útil especificada es de 3000 h a tensión nominal y en funcionamiento continuo.",
      "La adaptación OEM abarca cableado, orientación de las conexiones y montaje, además del desarrollo para objetivos de vida útil definidos por el proyecto. Los materiales y el accionamiento se seleccionan según el fluido, la contrapresión, la frecuencia de arranque y las horas de uso diarias; el objetivo se valida mediante ensayos de durabilidad en las condiciones acordadas."
    ],
    "dpl30-brushless": [
      "DPL30-BB es una microbomba de diafragma autocebante para líquidos con motor de CC sin escobillas y alimentación de dos hilos. Se integra en instrumentos automatizados para suministro de líquido, reposición de solución de lavado y recirculación de bajo caudal. El diafragma y las válvulas de retención forman el mecanismo de bombeo, mientras la cámara húmeda queda separada del motor. La conexión de dos hilos facilita la alimentación y el control de marcha y paro.",
      "Disponible en 12 V y 24 V, ofrece un caudal libre de 300 mL/min, una presión nominal de 100 kPa y una altura de aspiración autocebante de 6 mH₂O. Las partes en contacto con el fluido incluyen un cabezal de PPS y dos combinaciones: diafragma y válvulas de EPDM, o diafragma de PTFE y válvulas de FFKM. La vida útil especificada es de 10 000 h a tensión nominal y en funcionamiento continuo.",
      "El cableado, las conexiones y el objetivo de vida útil pueden adaptarse al ciclo de trabajo y al plan de mantenimiento del equipo. Para regulación independiente de velocidad o señal de realimentación, se seleccionan el accionamiento y la configuración de hilos correspondientes. La durabilidad se verifica con el fluido, la carga y los ciclos de arranque previstos."
    ],
    "dpl60-brushed": [
      "DPL60-DB es una bomba de diafragma autocebante para líquidos con motor de CC con escobillas, destinada a lavado, llenado, drenaje y recirculación con mayor volumen de trasvase. El diafragma alternativo y las válvulas de retención de entrada y salida realizan el bombeo dentro del instrumento OEM. La conexión y desconexión de la alimentación permiten coordinar su funcionamiento con la secuencia del equipo.",
      "Las versiones de 12 V y 24 V ofrecen un caudal libre de 600 mL/min, una presión nominal de 100 kPa y una altura de aspiración autocebante de 3 mH₂O. El cabezal de PPS admite diafragma y válvulas de EPDM, o diafragma de PTFE y válvulas de FFKM. La vida útil especificada de la versión con escobillas es de 3000 h a tensión nominal y en funcionamiento continuo.",
      "Se contemplan adaptaciones OEM de montaje, cableado y orientación de conexiones, así como desarrollos para un objetivo de vida útil concreto. La configuración se define a partir del volumen de renovación, el tiempo de ciclo, el fluido y la contrapresión, y se verifica mediante ensayos de caudal y durabilidad en el circuito previsto."
    ],
    "dpl60-brushless": [
      "DPL60-BB es una bomba de diafragma autocebante para líquidos con motor de CC sin escobillas. Está orientada al suministro de líquido de lavado, la reposición y la recirculación en instrumentos analíticos y automatización de laboratorio. El diafragma separa el líquido del accionamiento; con la opción de regulación, la electrónica del equipo puede ajustar la velocidad de la bomba en cada fase de trabajo.",
      "Disponible en 12 V y 24 V, ofrece un caudal libre de 600 mL/min, una presión nominal de 100 kPa y una altura de aspiración autocebante de 3 mH₂O. Puede incorporar una interfaz PWM de cinco hilos. El cabezal de PPS se combina con diafragma y válvulas de EPDM, o con diafragma de PTFE y válvulas de FFKM. La vida útil especificada es de 10 000 h a tensión nominal y en funcionamiento continuo.",
      "Las interfaces de control, el cableado y el montaje pueden adaptarse al equipo OEM, incluyendo el desarrollo para objetivos de vida útil acordados. La regulación y las señales de realimentación se seleccionan según la tarea de lavado, reposición o circulación. El rendimiento y la durabilidad se validan con el intervalo de velocidades, la contrapresión, el fluido y el ciclo de trabajo previstos."
    ],
    "dpl30h-brushed": [
      "DPL30H-DS es una bomba de diafragma autocebante de alta presión para líquidos, accionada por un motor de CC con escobillas. Se destina al suministro, la transferencia a través de filtros y el lavado en instrumentos OEM con contrapresión elevada por filtros, tubos de pequeño diámetro o varias válvulas. Su mecanismo volumétrico de diafragma y válvulas de retención se integra en el control de marcha y paro del equipo.",
      "Se ofrece en 12 V y 24 V, con un caudal libre de 300 mL/min, una presión nominal de 600 kPa y una altura de aspiración autocebante de 3 mH₂O. El cabezal de PPS puede equiparse con diafragma y válvulas de EPDM, o con diafragma de PTFE y válvulas de FFKM. La vida útil especificada es de 3000 h a tensión nominal y en funcionamiento continuo.",
      "Las opciones de adaptación OEM abarcan conexiones, montaje y cableado, con desarrollo para objetivos de vida útil específicos. La selección se basa en la contrapresión prevista, el caudal requerido, el fluido y los ciclos de arranque y paro. Los ensayos de caudal y durabilidad en el circuito correspondiente permiten confirmar la configuración."
    ],
    "dpl30h-brushless": [
      "DPL30H-BS es una bomba de diafragma autocebante de alta presión para líquidos con motor de CC sin escobillas. Está diseñada para suministro contra contrapresión, transferencia de líquido de lavado y recirculación en instrumentos analíticos, equipos IVD y automatización de laboratorio. El diafragma separa la cámara húmeda del accionamiento, para su integración en circuitos con filtros, tubos de pequeño diámetro o bloques de válvulas.",
      "Disponible en 12 V y 24 V, tiene un caudal libre de 300 mL/min, una presión nominal de 600 kPa y una altura de aspiración autocebante de 3 mH₂O. La regulación por PWM o señal de 0–5 V se ofrece como opción. El cabezal de PPS se combina con diafragma y válvulas de EPDM, o con diafragma de PTFE y válvulas de FFKM. La vida útil especificada es de 10 000 h a tensión nominal y en funcionamiento continuo.",
      "La regulación, las señales de realimentación, el cableado y el montaje pueden adaptarse a la integración OEM, con desarrollo para una vida útil objetivo. Los materiales y el accionamiento se seleccionan según el punto de trabajo, las horas de funcionamiento y el intervalo de mantenimiento. La configuración se valida mediante ensayos de rendimiento, calentamiento y durabilidad con el fluido y el ciclo reales."
    ],
    "dpgl800-brushless": [
      "DPGL800-BS es una bomba de diafragma de doble cabezal para gases y mezclas gas-líquido, accionada por un motor sin escobillas. Se integra en instrumentos automatizados para aspirar residuos líquidos con aire, generar vacío y evacuar conductos. El movimiento alternativo de los diafragmas permite extraer gases y mezclas gas-líquido en sistemas OEM de aspiración y recogida de residuos.",
      "Funciona a 24 V y ofrece un caudal libre de gas de 6 L/min por cabezal, una presión positiva máxima de 30 kPa y una presión negativa máxima inferior a −90 kPa. Los cabezales de PPS se combinan con diafragmas y válvulas de EPDM, o con diafragmas de PTFE y válvulas de FFKM. Incorpora conexiones de rosca hembra G1/8. La vida útil especificada es de 10 000 h a tensión nominal y en funcionamiento continuo.",
      "Se ofrecen adaptaciones OEM de orientación de conexiones, cableado y montaje, además de desarrollos para objetivos de vida útil definidos. La solución se configura según la proporción gas-líquido, el vacío requerido, el ciclo de aspiración y las condiciones del fluido, y se confirma mediante ensayos de aspiración y durabilidad en el sistema real."
    ]
  },
  fr: {
    "dpl30-brushed": [
      "DPL30-DB est une micropompe à membrane auto-amorçante pour liquides, entraînée par un moteur à courant continu à balais. Elle assure l'alimentation en liquide de lavage, le transfert de réactifs et l'amorçage des circuits dans les équipements de diagnostic in vitro, d'analyse et de laboratoire. Le mouvement alternatif de la membrane et les clapets d'admission et de refoulement assurent le transfert, tout en séparant le liquide du mécanisme d'entraînement.",
      "Disponible en 12 V ou 24 V, elle présente un débit à écoulement libre de 300 mL/min, une pression nominale de 100 kPa et une hauteur d'aspiration en auto-amorçage de 6 mH₂O. La tête en PPS s'associe soit à une membrane et des clapets en EPDM, soit à une membrane en PTFE et des clapets en FFKM. La durée de vie spécifiée est de 3 000 h à la tension nominale, en fonctionnement continu.",
      "L'adaptation OEM porte sur le câblage, l'orientation des raccordements et le montage, avec un développement possible selon l'objectif de durée de vie du projet. Les matériaux et l'entraînement sont définis en fonction du fluide, de la contre-pression, de la fréquence des démarrages et du temps de fonctionnement quotidien. Des essais d'endurance dans les conditions convenues valident l'objectif."
    ],
    "dpl30-brushless": [
      "DPL30-BB est une micropompe à membrane auto-amorçante pour liquides, équipée d'un moteur à courant continu sans balais avec alimentation à deux fils. Elle convient à l'alimentation en liquide, à l'appoint de solution de lavage et à la recirculation à faible débit dans les instruments automatisés. La membrane et les clapets assurent le pompage en séparant la chambre en contact avec le fluide de l'entraînement. Le raccordement à deux fils facilite l'intégration de l'alimentation et de la commande marche/arrêt.",
      "Les versions 12 V et 24 V offrent un débit à écoulement libre de 300 mL/min, une pression nominale de 100 kPa et une hauteur d'aspiration en auto-amorçage de 6 mH₂O. Les pièces en contact avec le fluide comprennent une tête en PPS, associée à une membrane et des clapets en EPDM, ou à une membrane en PTFE et des clapets en FFKM. La durée de vie spécifiée est de 10 000 h à la tension nominale, en fonctionnement continu.",
      "Le câblage, les raccordements et l'objectif de durée de vie peuvent être adaptés au cycle de service et aux besoins de maintenance de l'instrument. Une entrée de commande de vitesse indépendante ou un retour de vitesse peut être prévu avec une configuration d'entraînement et de fils adaptée. L'endurance est vérifiée avec le fluide, la charge et les cycles de démarrage prévus."
    ],
    "dpl60-brushed": [
      "DPL60-DB est une pompe à membrane auto-amorçante pour liquides, entraînée par un moteur à courant continu à balais. Elle répond aux besoins de lavage, de remplissage, de vidange et de recirculation nécessitant un volume de transfert plus important. La membrane à mouvement alternatif et les clapets d'admission et de refoulement assurent le pompage dans l'instrument OEM, avec une commande marche/arrêt par l'alimentation.",
      "Disponible en 12 V ou 24 V, elle présente un débit à écoulement libre de 600 mL/min, une pression nominale de 100 kPa et une hauteur d'aspiration en auto-amorçage de 3 mH₂O. La tête en PPS est proposée avec une membrane et des clapets en EPDM, ou avec une membrane en PTFE et des clapets en FFKM. La durée de vie spécifiée du modèle à balais est de 3 000 h à la tension nominale, en fonctionnement continu.",
      "Les adaptations OEM concernent le montage, le câblage et l'orientation des raccordements, ainsi que le développement pour un objectif de durée de vie défini. La configuration est choisie selon le volume à renouveler, le temps de cycle, le fluide et la contre-pression. Les essais de débit et d'endurance dans le circuit prévu permettent de valider la solution."
    ],
    "dpl60-brushless": [
      "DPL60-BB est une pompe à membrane auto-amorçante pour liquides avec moteur à courant continu sans balais, destinée au lavage, à l'appoint de liquide et à la recirculation dans les instruments d'analyse et les systèmes d'automatisation de laboratoire. La membrane isole le liquide de l'entraînement. L'option de variation de vitesse permet à la carte de commande de l'équipement d'adapter le régime de la pompe à chaque phase du procédé.",
      "Les versions 12 V et 24 V présentent un débit à écoulement libre de 600 mL/min, une pression nominale de 100 kPa et une hauteur d'aspiration en auto-amorçage de 3 mH₂O. Une interface de commande PWM à cinq fils est proposée en option. La tête en PPS reçoit une membrane et des clapets en EPDM, ou une membrane en PTFE et des clapets en FFKM. La durée de vie spécifiée est de 10 000 h à la tension nominale, en fonctionnement continu.",
      "Les interfaces de commande, le câblage et le montage peuvent être adaptés au système OEM, avec un développement selon la durée de vie visée. Les options de variation et de retour de vitesse sont choisies en fonction des tâches de lavage, d'appoint ou de circulation. Performances et endurance sont vérifiées sur la plage de vitesse, à la contre-pression et avec le fluide et le cycle de service prévus."
    ],
    "dpl30h-brushed": [
      "DPL30H-DS est une pompe à membrane auto-amorçante haute pression pour liquides, entraînée par un moteur à courant continu à balais. Elle est destinée à l'alimentation, au transfert à travers des filtres et au lavage dans les instruments OEM dont le circuit comporte une contre-pression élevée liée aux filtres, aux tubes de faible diamètre ou aux vannes. Le mécanisme volumétrique à membrane et clapets s'intègre aux séquences de marche/arrêt de l'équipement.",
      "Proposée en 12 V ou 24 V, elle offre un débit à écoulement libre de 300 mL/min, une pression nominale de 600 kPa et une hauteur d'aspiration en auto-amorçage de 3 mH₂O. La tête en PPS s'associe à une membrane et des clapets en EPDM, ou à une membrane en PTFE et des clapets en FFKM. La durée de vie spécifiée est de 3 000 h à la tension nominale, en fonctionnement continu.",
      "L'intégration OEM peut faire l'objet d'adaptations des raccordements, du montage et du câblage, ainsi que d'un développement pour une durée de vie cible. La solution est définie selon la contre-pression, le débit requis, le fluide et les cycles de démarrage. Des essais de débit et d'endurance dans le circuit correspondant permettent de confirmer la configuration."
    ],
    "dpl30h-brushless": [
      "DPL30H-BS est une pompe à membrane auto-amorçante haute pression pour liquides avec moteur à courant continu sans balais. Elle assure l'alimentation sous contre-pression, le transfert de liquide de lavage et la recirculation dans les instruments d'analyse, de diagnostic in vitro et d'automatisation de laboratoire. Sa membrane sépare la chambre en contact avec le fluide de l'entraînement, pour une intégration dans les circuits comportant filtres, tubes de faible diamètre ou blocs de vannes.",
      "Disponible en 12 V ou 24 V, elle présente un débit à écoulement libre de 300 mL/min, une pression nominale de 600 kPa et une hauteur d'aspiration en auto-amorçage de 3 mH₂O. Des configurations de variation de vitesse par PWM ou signal 0–5 V sont proposées en option. La tête en PPS reçoit une membrane et des clapets en EPDM, ou une membrane en PTFE et des clapets en FFKM. La durée de vie spécifiée est de 10 000 h à la tension nominale, en fonctionnement continu.",
      "La commande de vitesse, le retour d'information, le câblage et le montage peuvent être adaptés au projet OEM, avec un développement selon la durée de vie recherchée. Les matériaux et l'entraînement sont choisis en fonction du point de fonctionnement, du temps d'utilisation et de l'intervalle de maintenance. Les essais avec le fluide et le cycle réels portent sur les performances, l'échauffement et l'endurance."
    ],
    "dpgl800-brushless": [
      "DPGL800-BS est une pompe à membrane à double tête pour gaz et mélanges gaz-liquide, entraînée par un moteur sans balais. Elle convient à l'aspiration d'effluents contenant de l'air, à la mise sous vide et à l'évacuation des conduites dans les instruments automatisés. Le mouvement alternatif des membranes assure le transfert des gaz et mélanges gaz-liquide, pour les systèmes OEM d'aspiration et de collecte des effluents.",
      "Alimentée en 24 V, elle présente un débit de gaz à écoulement libre de 6 L/min par tête, une pression positive maximale de 30 kPa et une pression négative maximale inférieure à −90 kPa. Les têtes en PPS sont associées à des membranes et clapets en EPDM, ou à des membranes en PTFE et clapets en FFKM. Les raccordements sont taraudés G1/8. La durée de vie spécifiée est de 10 000 h à la tension nominale, en fonctionnement continu.",
      "L'adaptation OEM couvre l'orientation des raccordements, le câblage et le montage, avec un développement possible pour une durée de vie cible. La configuration tient compte de la proportion de gaz et de liquide, du niveau de vide recherché, du cycle d'aspiration et des conditions du fluide. Elle est validée par des essais d'aspiration et d'endurance dans le système réel."
    ]
  },
  ko: {
    "dpl30-brushed": [
      "DPL30-DB는 브러시 DC 모터로 구동하는 자흡식 소형 액체 다이어프램 펌프입니다. 체외진단(IVD) 장비, 분석기기 및 실험실 장비의 세척액 공급, 시약 이송, 배관 프라이밍에 사용합니다. 다이어프램의 왕복 운동과 흡입·토출 체크 밸브가 액체를 이송하며, 다이어프램은 접액 챔버와 모터 구동부를 분리합니다.",
      "전원은 12 V 또는 24 V를 선택할 수 있습니다. 무부하 유량은 300 mL/min, 정격 압력은 100 kPa, 자흡 높이는 6 mH₂O입니다. 접액부는 PPS 펌프 헤드에 EPDM 다이어프램과 EPDM 밸브를 조합하거나, PTFE 다이어프램과 FFKM 밸브를 조합합니다. 사양 수명은 정격 전압에서 연속 운전 시 3,000 h입니다.",
      "OEM 적용을 위한 배선, 포트 방향 및 장착 조건 조정과 목표 수명에 따른 맞춤 개발을 지원합니다. 이송 유체, 배압, 기동·정지 빈도와 일일 운전 시간을 바탕으로 재질과 구동 사양을 선정하고, 합의한 조건의 내구 시험으로 목표 수명을 검증합니다."
    ],
    "dpl30-brushless": [
      "DPL30-BB는 2선식 전원을 사용하는 브러시리스 DC 모터 구동 자흡식 소형 액체 다이어프램 펌프입니다. 자동화 장비의 액체 공급, 세척액 보충 및 소유량 순환에 적합합니다. 다이어프램과 체크 밸브가 펌핑 기구를 구성하고 접액 챔버를 구동부와 분리합니다. 2선식 구성으로 장비 전원과 기동·정지 제어에 연결할 수 있습니다.",
      "12 V 또는 24 V 사양을 제공하며, 무부하 유량은 300 mL/min, 정격 압력은 100 kPa, 자흡 높이는 6 mH₂O입니다. PPS 펌프 헤드에 EPDM 다이어프램·EPDM 밸브 또는 PTFE 다이어프램·FFKM 밸브를 선택할 수 있습니다. 브러시리스 사양의 수명은 정격 전압에서 연속 운전 시 10,000 h입니다.",
      "장비 운전 주기와 유지보수 요구에 맞춘 배선, 연결부 및 목표 수명 맞춤 개발을 지원합니다. 별도의 속도 제어 입력이나 회전수 피드백이 필요한 경우 해당 기능에 맞는 드라이브와 배선 구성을 선택할 수 있습니다. 실제 유체, 부하 및 기동·정지 조건으로 수명을 검증합니다."
    ],
    "dpl60-brushed": [
      "DPL60-DB는 브러시 DC 모터로 구동하는 자흡식 액체 다이어프램 펌프로, 이송량이 큰 세척, 보충, 배액 및 순환 작업에 사용합니다. 왕복 운동하는 다이어프램과 흡입·토출 체크 밸브가 OEM 장비 내부의 액체를 이송하며, 전원 기동·정지 제어로 장비의 작업 순서에 맞춰 운전할 수 있습니다.",
      "12 V와 24 V 사양을 제공하며, 무부하 유량은 600 mL/min, 정격 압력은 100 kPa, 자흡 높이는 3 mH₂O입니다. 접액부는 PPS 펌프 헤드와 EPDM 다이어프램·EPDM 밸브, 또는 PPS 펌프 헤드와 PTFE 다이어프램·FFKM 밸브의 조합으로 구성됩니다. 브러시 사양의 수명은 정격 전압에서 연속 운전 시 3,000 h입니다.",
      "OEM 장착 조건, 배선 및 포트 방향 조정과 목표 수명에 따른 맞춤 개발을 지원합니다. 장비의 액체 교환량, 작업 주기, 유체 및 배압을 기준으로 사양을 정하고, 적용 유로에서 실제 유량과 내구 성능을 확인합니다."
    ],
    "dpl60-brushless": [
      "DPL60-BB는 브러시리스 DC 모터를 탑재한 자흡식 액체 다이어프램 펌프로, 분석기기와 실험실 자동화 장비의 세척액 공급, 보충 및 액체 순환에 적합합니다. 다이어프램 구조가 액체와 구동부를 분리하며, 속도 제어 옵션을 선택하면 장비 제어 보드에서 작업 단계별로 펌프 회전수를 조절할 수 있습니다.",
      "12 V 또는 24 V를 선택할 수 있으며, 무부하 유량은 600 mL/min, 정격 압력은 100 kPa, 자흡 높이는 3 mH₂O입니다. 5선식 PWM 속도 제어 인터페이스를 옵션으로 제공합니다. 접액부는 PPS 펌프 헤드에 EPDM 다이어프램·EPDM 밸브 또는 PTFE 다이어프램·FFKM 밸브를 조합합니다. 사양 수명은 정격 전압에서 연속 운전 시 10,000 h입니다.",
      "OEM 장비에 맞춘 제어 인터페이스, 배선, 장착 구성 및 목표 수명 맞춤 개발을 지원합니다. 세척, 보충, 순환 작업에 필요한 속도 제어와 피드백 구성을 선정한 후, 실제 회전수 범위, 배압, 유체 및 운전 주기에 맞춰 성능과 수명을 검증합니다."
    ],
    "dpl30h-brushed": [
      "DPL30H-DS는 브러시 DC 모터로 구동하는 고압 자흡식 액체 다이어프램 펌프입니다. 필터, 소구경 배관 또는 여러 밸브로 인해 배압이 높아지는 OEM 장비 유로의 액체 공급, 여과 이송 및 세척에 사용합니다. 다이어프램과 체크 밸브를 이용하는 용적식 구조로, 전원 기동·정지 제어를 통해 장비 운전 순서에 맞춰 작동합니다.",
      "12 V와 24 V 사양을 제공하며, 무부하 유량은 300 mL/min, 정격 압력은 600 kPa, 자흡 높이는 3 mH₂O입니다. PPS 펌프 헤드에 EPDM 다이어프램·EPDM 밸브 또는 PTFE 다이어프램·FFKM 밸브를 선택할 수 있습니다. 브러시 사양의 수명은 정격 전압에서 연속 운전 시 3,000 h입니다.",
      "OEM 연결부와 장착 조건, 배선 및 목표 수명에 대한 맞춤 개발을 지원합니다. 목표 배압, 요구 공급량, 유체와 기동·정지 주기에 맞춰 구성을 정하고, 해당 유로에서 유량 시험과 내구 시험을 수행해 적용 사양을 확인합니다."
    ],
    "dpl30h-brushless": [
      "DPL30H-BS는 브러시리스 DC 모터로 구동하는 고압 자흡식 액체 다이어프램 펌프입니다. 분석기기, 체외진단(IVD) 및 실험실 자동화 장비의 고배압 액체 공급, 세척액 이송과 순환에 적합합니다. 다이어프램이 접액 챔버와 구동부를 분리하며, 필터, 소구경 배관 또는 밸브 매니폴드가 포함된 유로에 적용할 수 있습니다.",
      "12 V 또는 24 V 사양으로 제공되며, 무부하 유량은 300 mL/min, 정격 압력은 600 kPa, 자흡 높이는 3 mH₂O입니다. PWM 또는 0–5 V 속도 제어 구성을 옵션으로 선택할 수 있습니다. PPS 펌프 헤드에 EPDM 다이어프램·EPDM 밸브 또는 PTFE 다이어프램·FFKM 밸브를 조합합니다. 사양 수명은 정격 전압에서 연속 운전 시 10,000 h입니다.",
      "속도 제어와 피드백, 배선, 장착 구성 및 목표 수명에 대한 OEM 맞춤 개발을 지원합니다. 고배압 운전점, 가동 시간과 유지보수 주기를 기준으로 재질과 구동 사양을 선정하고, 실제 유체 및 운전 주기에서 성능, 온도 상승과 내구성을 검증합니다."
    ],
    "dpgl800-brushless": [
      "DPGL800-BS는 브러시리스 모터로 구동하는 듀얼 헤드 기액 혼합 다이어프램 펌프입니다. 자동화 장비에서 공기가 섞인 폐액을 흡입하거나 진공을 형성하고 배관을 비우는 데 사용합니다. 다이어프램의 왕복 운동으로 기체와 기액 혼합물을 이송하여 OEM 장비의 진공 흡입 및 폐액 회수 시스템에 적용할 수 있습니다.",
      "24 V 전원을 사용하며, 단일 헤드의 무부하 기체 유량은 6 L/min, 최대 양압은 30 kPa, 최대 음압은 −90 kPa 미만입니다. 접액부는 PPS 펌프 헤드에 EPDM 다이어프램·EPDM 밸브 또는 PTFE 다이어프램·FFKM 밸브를 조합하며, G1/8 암나사 포트를 사용합니다. 사양 수명은 정격 전압에서 연속 운전 시 10,000 h입니다.",
      "OEM 장비에 맞춘 포트 방향, 배선 및 장착 조건 조정과 목표 수명 맞춤 개발을 지원합니다. 기액 비율, 목표 진공도, 흡입 주기와 유체 조건에 따라 구성을 선정하고, 실제 시스템에서 흡입 성능과 내구성을 검증합니다."
    ]
  },
  ru: {
    "dpl30-brushed": [
      "DPL30-DB — самовсасывающий миниатюрный мембранный насос для жидкостей со щёточным двигателем постоянного тока. Он предназначен для подачи промывочной жидкости, переноса реагентов и первоначального заполнения жидкостных линий в оборудовании для диагностики in vitro, аналитических и лабораторных приборах. Возвратно-поступательное движение мембраны и обратные клапаны на входе и выходе обеспечивают перекачивание; мембрана отделяет рабочую камеру от привода.",
      "Доступны исполнения на 12 и 24 В. Подача при свободном изливе составляет 300 мл/мин, номинальное давление — 100 кПа, высота самовсасывания — 6 м вод. ст. Головка из PPS комплектуется мембраной и клапанами из EPDM либо мембраной из PTFE и клапанами из FFKM. Ресурс по спецификации — 3000 ч при номинальном напряжении и непрерывной работе.",
      "Для OEM-проектов предусмотрена адаптация проводки, ориентации патрубков и крепления, а также разработка исполнения под целевой ресурс. Материалы и привод подбираются с учётом жидкости, противодавления, частоты пусков и ежедневной наработки. Целевой ресурс подтверждается испытаниями на долговечность в согласованных условиях."
    ],
    "dpl30-brushless": [
      "DPL30-BB — самовсасывающий миниатюрный мембранный насос для жидкостей с бесщёточным двигателем постоянного тока и двухпроводным питанием. Он применяется для подачи жидкости, пополнения промывочного раствора и циркуляции с небольшим расходом в автоматизированных приборах. Мембрана и обратные клапаны образуют насосный механизм, отделяя смачиваемую камеру от привода. Два провода позволяют подключить питание и управление включением и выключением.",
      "Предлагаются варианты на 12 и 24 В с подачей при свободном изливе 300 мл/мин, номинальным давлением 100 кПа и высотой самовсасывания 6 м вод. ст. Головка из PPS сочетается с мембраной и клапанами из EPDM либо с мембраной из PTFE и клапанами из FFKM. Ресурс бесщёточного исполнения по спецификации — 10 000 ч при номинальном напряжении и непрерывной работе.",
      "Проводка, присоединения и целевой ресурс могут быть адаптированы к рабочему циклу и требованиям к обслуживанию прибора. Для отдельного входа регулирования скорости или обратной связи по частоте вращения подбираются соответствующие привод и схема подключения. Ресурс проверяется на рабочей жидкости при заданной нагрузке и циклах пуска и остановки."
    ],
    "dpl60-brushed": [
      "DPL60-DB — самовсасывающий мембранный насос для жидкостей со щёточным двигателем постоянного тока для промывки, заполнения, слива и циркуляции при повышенном объёме перекачивания. Мембрана и обратные клапаны на входе и выходе обеспечивают транспортировку жидкости внутри OEM-прибора. Управление включением питания позволяет согласовать работу насоса с последовательностью операций оборудования.",
      "Исполнения на 12 и 24 В имеют подачу при свободном изливе 600 мл/мин, номинальное давление 100 кПа и высоту самовсасывания 3 м вод. ст. Головка из PPS предлагается с мембраной и клапанами из EPDM либо с мембраной из PTFE и клапанами из FFKM. Ресурс щёточного исполнения по спецификации — 3000 ч при номинальном напряжении и непрерывной работе.",
      "Доступна OEM-адаптация крепления, проводки и ориентации патрубков, а также разработка под заданный ресурс. Конфигурация определяется объёмом сменяемой жидкости, длительностью цикла, рабочей средой и противодавлением. Соответствие требованиям подтверждается испытаниями подачи и долговечности в предусмотренном жидкостном контуре."
    ],
    "dpl60-brushless": [
      "DPL60-BB — самовсасывающий мембранный насос для жидкостей с бесщёточным двигателем постоянного тока, предназначенный для подачи промывочной жидкости, заполнения и циркуляции в аналитических приборах и системах лабораторной автоматизации. Мембрана отделяет жидкость от привода. Опциональное регулирование позволяет плате управления прибора изменять скорость насоса на разных этапах рабочего цикла.",
      "Доступны варианты на 12 и 24 В. Подача при свободном изливе — 600 мл/мин, номинальное давление — 100 кПа, высота самовсасывания — 3 м вод. ст. Пятипроводное подключение с ШИМ-регулированием скорости предлагается как опция. Головка из PPS комплектуется мембраной и клапанами из EPDM либо мембраной из PTFE и клапанами из FFKM. Ресурс по спецификации — 10 000 ч при номинальном напряжении и непрерывной работе.",
      "Интерфейсы управления, проводка и крепление адаптируются к OEM-системе; возможна разработка исполнения под целевой ресурс. Регулирование и обратная связь подбираются под задачи промывки, заполнения или циркуляции. Рабочие характеристики и долговечность проверяются в заданном диапазоне скоростей, при рабочем противодавлении, на выбранной жидкости и с учётом режима эксплуатации."
    ],
    "dpl30h-brushed": [
      "DPL30H-DS — самовсасывающий мембранный насос высокого давления для жидкостей со щёточным двигателем постоянного тока. Он предназначен для подачи жидкости, перекачивания через фильтры и промывки в OEM-приборах с повышенным противодавлением из-за фильтров, трубок малого диаметра или нескольких клапанов. Объёмный механизм с мембраной и обратными клапанами работает в составе системы включения и выключения оборудования.",
      "Предлагаются исполнения на 12 и 24 В с подачей при свободном изливе 300 мл/мин, номинальным давлением 600 кПа и высотой самовсасывания 3 м вод. ст. Головка из PPS комплектуется мембраной и клапанами из EPDM либо мембраной из PTFE и клапанами из FFKM. Ресурс по спецификации — 3000 ч при номинальном напряжении и непрерывной работе.",
      "OEM-адаптация включает присоединения, крепление и проводку, а также разработку под требуемый ресурс. Решение подбирается по целевому противодавлению, необходимой подаче, рабочей жидкости и циклам пуска и остановки. Конфигурация подтверждается испытаниями подачи и долговечности в соответствующем жидкостном контуре."
    ],
    "dpl30h-brushless": [
      "DPL30H-BS — самовсасывающий мембранный насос высокого давления для жидкостей с бесщёточным двигателем постоянного тока. Он используется для подачи против повышенного давления, перекачивания промывочной жидкости и циркуляции в аналитических приборах, IVD-оборудовании и системах лабораторной автоматизации. Мембрана отделяет смачиваемую камеру от привода; насос подбирается для контуров с фильтрами, трубками малого диаметра или клапанными блоками.",
      "Доступны варианты на 12 и 24 В с подачей при свободном изливе 300 мл/мин, номинальным давлением 600 кПа и высотой самовсасывания 3 м вод. ст. В качестве опции предлагается регулирование скорости сигналом ШИМ или 0–5 В. Головка из PPS сочетается с мембраной и клапанами из EPDM либо с мембраной из PTFE и клапанами из FFKM. Ресурс по спецификации — 10 000 ч при номинальном напряжении и непрерывной работе.",
      "Возможна адаптация регулирования скорости, обратной связи, проводки и крепления для OEM-проекта, включая разработку под заданный ресурс. Материалы и привод выбираются по рабочей точке, наработке и интервалу обслуживания. Рабочие характеристики, нагрев и долговечность проверяются на используемой жидкости с учётом фактического рабочего цикла."
    ],
    "dpgl800-brushless": [
      "DPGL800-BS — двухголовочный газожидкостный мембранный насос с бесщёточным двигателем для откачивания отходов с воздушной фазой, создания разрежения и опорожнения линий в автоматизированных приборах. Возвратно-поступательное движение мембран обеспечивает перекачивание газов и газожидкостных смесей в OEM-системах вакуумной аспирации и сбора жидких отходов.",
      "Насос питается от 24 В. Расход газа одной головки без нагрузки составляет 6 л/мин, максимальное положительное давление — 30 кПа, максимальное отрицательное давление — ниже −90 кПа. Головки из PPS комплектуются мембранами и клапанами из EPDM либо мембранами из PTFE и клапанами из FFKM. Присоединения имеют внутреннюю резьбу G1/8. Ресурс по спецификации — 10 000 ч при номинальном напряжении и непрерывной работе.",
      "Предусмотрена OEM-адаптация ориентации патрубков, проводки и крепления, а также разработка под целевой ресурс. Конфигурация определяется соотношением газа и жидкости, требуемым разрежением, циклом аспирации и условиями рабочей среды. Испытания аспирации и долговечности в реальной системе подтверждают выбранное исполнение."
    ]
  },
};

export function getDiaphragmPumpIntroduction(
  key: DiaphragmPumpReferenceCopyKey,
  locale: SelectionLocale,
): DiaphragmPumpIntroduction {
  return INTRODUCTIONS[locale][key];
}
