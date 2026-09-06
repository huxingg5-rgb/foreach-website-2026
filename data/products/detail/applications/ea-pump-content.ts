import type {
  ProductApplicationItem,
  ProductApplicationsContent,
  ProductDetailFaqItem,
} from "../product-detail.types";

type Locale = "zh" | "en";
type Material = "PMMA" | "PEEK";
type Localized = Record<Locale, string>;
type Scenario = "reagent" | "dilution" | "water" | "biology" | "dispensing" | "wash" | "filling" | "industrial";
type CapacityProfile = {
  volume: string;
  steps: string;
  stepVolume: string;
  tasks: Localized;
  fit: Localized;
  scenarios: Scenario[];
};

/**
 * EA content authoring catalog, based on the EA specification (pp. 4, 15)
 * and the pump source workbook. Only the 14 listed display configurations
 * are supported. Body and product-scoped FAQ copies are mirrored to the
 * workbook before running build:pump-series-data; applications use this file.
 * Application suitability is a selection direction, not a customer case.
 */
const PROFILES: Record<string, CapacityProfile> = {
  "100": {
    volume: "100 μL", steps: "2000", stepVolume: "0.05",
    tasks: { zh: "生化与免疫分析仪的微量试剂加注、实验室的小体积样本处理及生命科学实验的反应液补加", en: "microliter reagent addition in clinical chemistry and immunoassay analyzers, small-volume sample handling and reaction-liquid addition in life science instruments" },
    fit: { zh: "100 μL 容量和较小的基础每步液量，可用于规划小体积吸排液与分步加液程序。", en: "The 100 μL capacity and smaller nominal volume per step support the design of small-volume aspiration and staged dispensing sequences." },
    scenarios: ["reagent", "dilution", "biology", "water"],
  },
  "250": {
    volume: "250 μL", steps: "2000", stepVolume: "0.125",
    tasks: { zh: "生化分析仪的试剂分配、自动化样品前处理的样本稀释及实验室反应液定量添加", en: "reagent dispensing in clinical chemistry analyzers, sample dilution in automated preparation systems and metered reaction-liquid addition" },
    fit: { zh: "250 μL 容量可围绕中小体积样本与试剂处理配置，在单次液量和步进控制之间匹配实际需求。", en: "The 250 μL capacity can be configured for small and intermediate sample or reagent volumes, matching the required dose to the available step control." },
    scenarios: ["reagent", "dilution", "water", "dispensing"],
  },
  "500": {
    volume: "500 μL", steps: "2000", stepVolume: "0.25",
    tasks: { zh: "生化与免疫分析仪的试剂加注、实验室自动化的样本稀释、缓冲液分配及水质分析设备的标准液添加", en: "reagent addition in clinical chemistry and immunoassay analyzers, automated sample dilution, buffer dispensing and standard-solution addition in water analyzers" },
    fit: { zh: "500 μL 容量可围绕试剂分配、稀释液添加和缓冲液处理配置，配合阀路组织不同加液步骤。", en: "The 500 μL capacity can be configured for reagent, diluent and buffer handling, with valves coordinating the different dispensing steps." },
    scenarios: ["reagent", "dilution", "water", "biology", "dispensing"],
  },
  "1000": {
    volume: "1 mL", steps: "2000", stepVolume: "0.5",
    tasks: { zh: "诊断分析仪的毫升级试剂输送、样品前处理的稀释液添加及实验室缓冲液配液", en: "milliliter-scale reagent transfer in diagnostic analyzers, diluent addition in sample preparation and automated buffer preparation" },
    fit: { zh: "1 mL 容量可承接毫升级定量转移。根据总加液量安排吸排液次数，并核对程序节拍。", en: "The 1 mL capacity supports planning milliliter-scale transfers. Aspiration and dispense cycles should be matched to the total dose and instrument timing." },
    scenarios: ["reagent", "dilution", "water", "dispensing", "biology"],
  },
  "2500": {
    volume: "2.5 mL", steps: "2000 / 2236", stepVolume: "1.25 / ≈1.118",
    tasks: { zh: "实验室自动化的缓冲液配液、样品前处理的稀释液添加及分析仪器的定量清洗液补充", en: "automated buffer preparation, diluent addition in sample preparation and metered wash-liquid replenishment in analytical instruments" },
    fit: { zh: "2.5 mL 容量面向较大单次液量。满量程步数有 2000 或 2236 步配置，需按实际导程与行程确认。", en: "The 2.5 mL capacity targets larger individual doses. Full-stroke options of 2000 or 2236 steps must be matched to the actual screw lead and stroke." },
    scenarios: ["dilution", "dispensing", "water", "wash", "filling"],
  },
  "5000": {
    volume: "5 mL", steps: "2000", stepVolume: "2.5",
    tasks: { zh: "实验室自动化设备的缓冲液输送、分析仪器的清洗液定量添加及样品前处理液路的预充", en: "buffer transfer in laboratory automation, metered wash-liquid addition in analyzers and priming of sample-preparation fluid paths" },
    fit: { zh: "5 mL 容量可用于较大单次定量供液、配液及预充流程。输出速度仍取决于驱动和完整液路。", en: "The 5 mL capacity supports larger metered doses, solution preparation and priming sequences. Delivery speed depends on the drive and complete fluid path." },
    scenarios: ["dispensing", "wash", "water", "filling"],
  },
  "10000": {
    volume: "10 mL", steps: "4000", stepVolume: "2.5",
    tasks: { zh: "分析仪器的较大单次清洗液输送、系统定量冲洗、实验室自动配液及管路预充", en: "larger wash-liquid transfers, metered system rinsing, automated solution preparation and instrument fluid-path priming" },
    fit: { zh: "10 mL 容量可减少较大液量转移中的补液次数。其基础每步液量与 5 mL 配置同为 2.5 μL，增加容量不等于提高分配精细程度。", en: "The 10 mL capacity can reduce refills during larger transfers. Its nominal 2.5 μL per step matches the 5 mL configuration; greater capacity does not imply finer dispensing." },
    scenarios: ["wash", "dispensing", "filling", "industrial"],
  },
};

const SCENARIOS: Record<Scenario, { title: Localized; requirement: Localized; response: Localized; tag: Localized }> = {
  reagent: {
    title: { zh: "生化与免疫分析仪中的试剂加注泵", en: "Reagent dispensing pumps for clinical chemistry and immunoassay analyzers" },
    tag: { zh: "试剂定量加注", en: "Reagent dosing" },
    requirement: { zh: "生化与免疫分析仪需要按检测程序向反应单元加入规定体积的试剂。试剂泵或试剂加注泵需要保持重复加液的一致性，并与切换阀、加液针和仪器控制程序配合。", en: "Clinical chemistry and immunoassay analyzers add defined reagent volumes to reaction units. A reagent dispensing pump must support consistent repeated doses and coordinated operation with selector valves, dispensing probes and instrument controls." },
    response: { zh: "规格书给出的满量程准确性和重复性均为 ≤0.5%，可作为对应测试条件下的选型依据。电机、初始位置光耦和阀组件可按项目匹配；实际试剂的小液量分配性能需按工作点验证。", en: "Specified full-stroke accuracy and repeatability are both ≤0.5% under the stated test conditions. Motor, home-position optical sensor and valve options support integration; small-dose performance must be verified using the actual reagent and working volume." },
  },
  dilution: {
    title: { zh: "自动化样品前处理中的样本稀释泵", en: "Sample dilution pumps for automated sample preparation" },
    tag: { zh: "样本稀释", en: "Sample dilution" },
    requirement: { zh: "样品前处理设备需要分别控制样本和稀释液的添加量，实现程序设定的稀释比例。样本稀释泵或稀释液添加泵还需配合多次吸排液、液路切换和样本间清洗。", en: "Sample-preparation instruments control sample and diluent volumes separately to achieve a programmed dilution ratio. A sample dilution or diluent dosing pump must coordinate repeated aspiration, dispensing, valve switching and between-sample washing." },
    response: { zh: "1/4-28 UNF 或 M6 接口可连接仪器管路，配合阀组件与控制器组织吸排液。单泵的满量程指标不等于整机稀释比例精度，需同时核对实际液量、背隙补偿、管路残留与混合方式。", en: "1/4-28 UNF or M6 ports connect to the instrument fluid path, with valves and a controller coordinating aspiration and dispensing. Pump full-stroke specifications are not a guarantee of dilution-ratio accuracy; working volumes, backlash compensation, residual liquid and mixing must also be assessed." },
  },
  water: {
    title: { zh: "水质分析仪中的试剂计量泵与标准液加标泵", en: "Reagent metering and standard-addition pumps for water analyzers" },
    tag: { zh: "试剂计量与加标", en: "Reagent metering and standard addition" },
    requirement: { zh: "水质与环境分析设备需要定量添加试剂、标准液或稀释液。作为试剂计量泵、加标泵或标准液添加泵，既要控制添加量，也要匹配试剂的成分、浓度和清洗条件。", en: "Water and environmental analyzers meter reagents, standards or diluents. A reagent metering or standard-addition pump must control dose volume while matching reagent composition, concentration and cleaning conditions." },
    response: { zh: "泵头、柱塞和阀组件可按介质匹配；对易结晶液体，EA 系列规格书列有密封冲洗选项，可结合项目设计维护流程。该选项不代表任意试剂均兼容，也不能代替实际介质和循环测试。", en: "Pump-head, piston and valve materials can be matched to the fluid. The EA specification includes an optional seal-wash arrangement for maintenance planning with crystallization-prone liquids. This option does not establish universal reagent compatibility or replace fluid and cycling tests." },
  },
  biology: {
    title: { zh: "生命科学与组学设备中的缓冲液分配泵", en: "Buffer dispensing pumps for life science and omics instruments" },
    tag: { zh: "缓冲液与反应液添加", en: "Buffer and reaction-liquid addition" },
    requirement: { zh: "生命科学实验和组学设备的样品准备流程可能需要分步添加缓冲液、试剂或反应液。缓冲液分配泵与反应液加注泵需要按程序控制液量，并配合阀路完成试剂切换和清洗。", en: "Sample preparation in life science and omics instruments can require staged buffer, reagent and reaction-liquid addition. Buffer dispensing and reagent pumps must follow programmed doses while coordinating fluid switching and cleaning." },
    response: { zh: "可按项目匹配接液材料、阀组件和控制方式，规划定量添加单元。组学应用需进一步验证残留、吸附与携带污染；含细胞或颗粒的样液还需单独评估，不能仅以柱塞材料判断适用性。", en: "Wetted-material, valve and control options support the design of a metered addition unit. Omics applications need additional residual-volume, adsorption and carryover validation; cell- or particle-containing samples require separate assessment." },
  },
  dispensing: {
    title: { zh: "自动加样与配液设备中的定量分配泵", en: "Metered dispensing pumps for automated sampling and solution preparation" },
    tag: { zh: "自动加样与配液", en: "Automated sampling and solution preparation" },
    requirement: { zh: "自动加样和配液设备需要将试剂、稀释液或缓冲液按程序送至指定容器。定量分配泵与自动配液泵需要兼顾单次液量、处理节拍以及阀路和整机控制的配合。", en: "Automated sampling and solution-preparation equipment delivers reagents, diluents or buffers to selected containers. The dispensing pump must match the dose volume, sequence timing, valves and instrument controls." },
    response: { zh: "EA 可匹配电机、光耦反馈和阀组件。规格书列有 ISC1000 集成驱动器选项及 RS-232、RS-485、CAN 接口，通信能力属于配套驱动器；整机加样定位与完成时间需结合运动机构和实际液路确认。", en: "EA supports motor, optical feedback and valve configuration. The specification lists an optional ISC1000 integrated driver with RS-232, RS-485 and CAN interfaces; these are driver capabilities, not interfaces built into the bare pump. Positioning and cycle time depend on the instrument motion system and fluid path." },
  },
  wash: {
    title: { zh: "分析仪器中的定量清洗液泵与管路预充泵", en: "Metered wash-liquid and priming pumps for analytical instruments" },
    tag: { zh: "定量清洗与预充", en: "Metered washing and priming" },
    requirement: { zh: "分析仪器在开机、换液或维护时，可能需要添加规定体积的清洗液、置换管路液体并完成预充。清洗液添加泵或预充泵需配合阀路及排气流程，按设备要求控制供液量。", en: "Startup, fluid changes and maintenance can require defined wash-liquid volumes, liquid replacement and priming. A wash-liquid dosing or priming pump must coordinate delivery with valves and an air-clearing procedure." },
    response: { zh: "可根据单次清洗液量选择容量，并匹配阀组件、管路和控制方式。较大容量有助于减少补液次数，但不保证更快冲洗；预充效果、排气时间和清洗残留应在完整系统中验证。", en: "Capacity can be selected for the required wash volume, with matched valves, tubing and controls. A larger capacity can reduce refills but does not guarantee faster rinsing. Priming, air clearance and wash carryover require complete-system validation." },
  },
  filling: {
    title: { zh: "诊断试剂生产中的小体积定量分装", en: "Small-volume reagent filling in diagnostic reagent production" },
    tag: { zh: "试剂定量分装", en: "Metered reagent filling" },
    requirement: { zh: "诊断试剂分装需要向容器加入规定体积的液体，关注分装一致性、灌装节拍和停止加液后的滴漏。试剂分装泵或小容量灌装泵必须与阀和灌装针共同设计。", en: "Diagnostic reagent filling requires defined doses with consistent fill volumes, suitable timing and controlled dripping after dispensing stops. Reagent filling pumps must be designed together with valves and filling nozzles." },
    response: { zh: "该容量可作为相应单次分装量的选型起点，材料、阀组件和控制方式可按项目配置。此场景属于项目验证方向，实际灌装精度、速度、滴漏和洁净要求需用试剂及分装系统验证。", en: "This capacity provides a starting point for matching the individual fill volume, with project-specific materials, valves and controls. This is an application-development direction: fill accuracy, speed, dripping and cleanliness require tests with the reagent and filling system." },
  },
  industrial: {
    title: { zh: "工业自动化设备中的工艺液定量添加", en: "Metered process-liquid addition in industrial automation" },
    tag: { zh: "工艺液定量添加", en: "Metered process-liquid addition" },
    requirement: { zh: "部分自动化设备需要向处理单元加入规定体积的工艺液、稀释液或维护液。添加剂定量泵与工艺液加液泵需配合设备动作，并满足介质、压力和单次液量要求。", en: "Some automated equipment adds defined process-liquid, diluent or maintenance-liquid volumes. A process-liquid dosing pump must synchronize with the equipment and meet fluid, pressure and dose-volume requirements." },
    response: { zh: "可按具体液体和加液程序配置泵头、柱塞、阀与控制系统。此应用需逐项目验证黏度、颗粒、温度和运行负载，不将一般工业应用扩展为高压或任意介质输送能力。", en: "Pump head, piston, valves and controls can be configured for the specific liquid and dosing sequence. Viscosity, particles, temperature and duty must be validated per project; this does not establish high-pressure or universal-fluid capability." },
  },
};

export const EA_PUMP_MODELS = Object.keys(PROFILES).flatMap((capacity) =>
  (["PMMA", "PEEK"] as const).map((material) => `ea-${capacity}-${material.toLowerCase()}`),
);

function identity(slug: string) {
  if (!EA_PUMP_MODELS.includes(slug.toLowerCase())) return null;
  const [, capacity, material] = slug.toLowerCase().split("-");
  return { profile: PROFILES[capacity], model: slug.toUpperCase(), material: material.toUpperCase() as Material, capacity };
}

function materialCopy(material: Material, locale: Locale) {
  if (locale === "en") return material === "PMMA"
    ? "Pump heads can be selected from PMMA, PCTG, PEEK and other project-assessed materials. Piston options include zirconia ceramic, alumina ceramic, PEEK and sapphire. Ports, motor, optical feedback, valves and controller can be configured for fluid compatibility, mounting space and system integration."
    : "The displayed PEEK pump head can be replaced by a project-matched PMMA or PCTG option. Piston choices include zirconia ceramic, alumina ceramic, PEEK and sapphire. Ports, motor, optical feedback, valves and controls can be configured to the instrument. All wetted materials must be assessed against reagent composition and operating conditions.";
  return material === "PMMA"
    ? "支持按项目定制泵头、柱塞及控制配置。泵头材料可选 PMMA、PCTG、PEEK 等，柱塞材料可选氧化锆陶瓷、氧化铝陶瓷、PEEK 或蓝宝石，并可匹配接口、电机、光耦反馈、阀组件和控制器。具体组合根据介质兼容性、安装空间及液路需求确定。"
    : "支持按介质匹配泵头与柱塞材料。除当前 PEEK 泵头外，可选 PMMA、PCTG 等方案；柱塞材料可选氧化锆陶瓷、氧化铝陶瓷、PEEK 或蓝宝石。接口、电机、光耦反馈、阀组件及控制方式可按整机需求配置，具体接液材料组合根据试剂成分和使用条件确定。";
}

export function getEaPumpContent(slug: string, locale: Locale) {
  const id = identity(slug);
  if (!id) return undefined;
  const { profile: p, material, model, capacity } = id;
  const description = locale === "zh" ? [
    `${model} 采用 ${material} 泵头${material === "PMMA" ? "与陶瓷柱塞" : ""}，标称容量为 ${p.volume}，面向${p.tasks.zh}。支持 1/4-28 UNF 或 M6 接口，满量程${capacity === "2500" ? "按配置" : ""}为 ${p.steps} 步；在规定测试条件下，100% 量程的准确性和重复性均为 ≤0.5%。`,
    materialCopy(material, locale),
  ] : [
    `${model} is a ${p.volume} precision ${material === "PMMA" ? "ceramic " : ""}piston pump with a ${material} pump head for ${p.tasks.en}. It supports 1/4-28 UNF or M6 ports and ${p.steps} full-stroke steps${capacity === "2500" ? ", depending on the configuration" : ""}. Accuracy and repeatability at 100% full stroke are both ≤0.5% under the specified test conditions.`,
    materialCopy(material, locale),
  ];
  const materialNote = locale === "zh"
    ? material === "PMMA"
      ? "当前展示 PMMA 泵头配置，按实际液体核对泵头、柱塞、密封和阀件的兼容性。"
      : "当前展示 PEEK 泵头配置，可围绕特殊试剂的材料需求选型；PEEK 泵头不代表全部接液部件均兼容，也不能单独保证整条液路避光。"
    : material === "PMMA"
      ? "The displayed configuration uses a PMMA head; compatibility must be checked for the head, piston, seals and valves with the actual fluid."
      : "The displayed PEEK head is a material option for specialty reagents. It does not establish compatibility of all wetted parts or light protection for the entire fluid path.";
  const items: ProductApplicationItem[] = p.scenarios.map((key, index) => ({
    title: `${index + 1}. ${SCENARIOS[key].title[locale]}`,
    paragraphs: [SCENARIOS[key].requirement[locale], `${model}${locale === "zh" ? "：" : ": "}${SCENARIOS[key].response[locale]}${key === "water" ? ` ${materialNote}` : ""}`],
  }));
  const applicationDetails: ProductApplicationsContent = {
    tabLabel: locale === "zh" ? "应用" : "Applications",
    title: locale === "zh" ? `${p.volume} ${material} 泵头精密柱塞泵的典型应用` : `Typical applications of the ${p.volume} ${material}-head precision piston pump`,
    intro: locale === "zh" ? [
      "EA 系列面向生化与免疫分析、实验室自动化、样品前处理、水质与环境分析中的定量液体处理，也可围绕生命科学与组学、诊断试剂分装及工业工艺液添加开展项目配置。任务包括试剂加注、样本稀释、标准液加标、缓冲液分配、反应液补加、自动配液、定量清洗和预充。按液路功能，客户也会将其称为试剂泵、稀释泵、加标泵、定量分配泵或试剂分装泵。滴定液添加需进一步验证最小可靠加液量。",
      `${model} 的应用重点为${p.tasks.zh}。${p.fit.zh}${materialNote}下列场景说明设备要求与可匹配能力，实际适配性按工况验证。`,
    ] : [
      "EA supports metered liquid handling in clinical chemistry, immunoassay, laboratory automation, sample preparation and water or environmental analysis. Project configurations can also be assessed for life science and omics instruments, diagnostic reagent filling and industrial liquid dosing. Tasks include reagent addition, dilution, standard addition, buffer dispensing, reaction-liquid addition, solution preparation, metered washing and priming. Depending on its role, it may be described as a reagent, dilution, standard-addition, dispensing or reagent-filling pump. Titrant addition requires additional minimum-dose validation.",
      `${model} focuses on ${p.tasks.en}. ${p.fit.en} ${materialNote} The scenarios below connect instrument requirements with configurable capabilities; suitability is subject to application validation.`,
    ],
    items,
    selectionNote: {
      title: locale === "zh" ? "应用选型说明" : "Application selection guidance",
      paragraphs: locale === "zh" ? [
        `${p.volume} 是标称容量，基础每步液量约为 ${p.stepVolume} μL，均不代表最小可靠分配量。请提供实际单次液量、允许误差、完成时间、试剂成分、温度与背压，按对应配置验证吸排液。2% 行程指标的规格书注释为位移测试方法，不应直接等同实际试剂的加液性能。`,
        "系列规格书中的 500 万次预计寿命对应纯水、常温、50 kPa 背压条件；含盐或易结晶液体需设计维护流程。压力、密封冲洗、反馈和驱动器等配置按正式规格与项目确认。组学、滴定及分装应用需另行验证残留、最小加液量、滴漏或其他工艺要求。",
      ] : [
        `${p.volume} is the nominal capacity; nominal volume per step is approximately ${p.stepVolume} μL. Neither is a validated minimum dose. Provide working volume, allowed error, timing, reagent, temperature and back pressure for configuration-specific testing. The specification footnotes describe the 2% stroke figures as displacement tests, not direct measurements of reagent dispensing.`,
        "The specified expected life of five million cycles uses pure water at room temperature and 50 kPa back pressure. Saline or crystallization-prone fluids require a maintenance procedure. Pressure, seal wash, feedback and driver options follow the formal specification and project configuration. Omics, titration and filling require further carryover, minimum-dose, dripping or process validation.",
      ],
    },
  };
  const faq = (zhQ: string, zhA: string, enQ: string, enA: string): ProductDetailFaqItem => ({ question: locale === "zh" ? zhQ : enQ, answer: locale === "zh" ? zhA : enA });
  const faqs: ProductDetailFaqItem[] = [
    faq(`${model} 适合哪些定量液体处理任务？`, `该型号面向${p.tasks.zh}。${p.fit.zh}具体适配性结合介质、单次液量与设备节拍确定。`, `Which liquid-handling tasks suit ${model}?`, `This configuration targets ${p.tasks.en}. ${p.fit.en} Suitability depends on the fluid, working volume and instrument timing.`),
    faq(`${p.volume} 容量和每步液量是否代表最小加液量？`, `不是。满量程为 ${p.steps} 步，基础每步液量约 ${p.stepVolume} μL，是容量除以步数的名义关系。实际最小可靠加液量还受背隙、阀动作、气泡、液体和管路影响，需要实测。`, `Do ${p.volume} capacity and volume per step define the minimum dose?`, `No. The ${p.steps} full-stroke steps give a nominal ${p.stepVolume} μL per step. This is capacity divided by steps. The minimum reliable dose also depends on backlash, valves, bubbles, fluid and tubing and requires testing.`),
    faq("准确性和重复性 ≤0.5% 适用于所有加液量吗？", "不是。该指标对应规格书中的满量程测试条件。2% 行程的准确性和重复性分别为 ≤2.0% 和 ≤1.5%，且注释说明采用位移测试方法，不能直接作为实际试剂在任意小液量下的分配保证。", "Does ≤0.5% accuracy and repeatability apply at every dose?", "No. These figures apply at full stroke under the specified conditions. The 2% stroke figures are ≤2.0% accuracy and ≤1.5% repeatability; the footnotes describe displacement testing, not a guarantee of reagent performance at arbitrary small doses."),
    faq("PMMA 与 PEEK 泵头如何选择，柱塞能否定制？", `${materialNote}泵头可选 PMMA、PCTG、PEEK 等，柱塞可选氧化锆陶瓷、氧化铝陶瓷、PEEK 或蓝宝石；最终组合需同时匹配密封和其他接液部件。`, "How should PMMA and PEEK heads be selected, and can the piston be customized?", `${materialNote} Head options include PMMA, PCTG and PEEK. Piston options include zirconia ceramic, alumina ceramic, PEEK and sapphire. Seals and other wetted parts must be considered together.`),
    faq("可以匹配阀、光耦反馈和控制器吗？", "可以按项目匹配电机、初始位置光耦、阀组件及控制方式。规格书另列闭环反馈和 ISC1000 集成驱动器选项，驱动器可提供 RS-232、RS-485、CAN；初始位置检测与运动反馈应按实际配置区分。", "Can valves, optical feedback and a controller be integrated?", "Motor, home-position optical sensing, valves and controls can be configured for the project. Closed-loop feedback and an ISC1000 integrated driver are listed options; the driver supports RS-232, RS-485 and CAN. Home sensing and motion feedback are distinct functions."),
    faq("输送含盐或易结晶试剂时需要注意什么？", "需按试剂成分、浓度和温度核对全部接液材料，并设计停机冲洗和残液处理。EA 规格书列有密封冲洗选项。500 万次预计寿命采用纯水、常温、50 kPa 背压条件，不是任意试剂下的寿命保证。", "What is required for saline or crystallization-prone reagents?", "Check all wetted materials against composition, concentration and temperature and plan shutdown flushing and residual-liquid handling. Seal wash is a listed EA option. The expected five-million-cycle life uses pure water at room temperature and 50 kPa back pressure and is not a universal reagent-life guarantee."),
    faq("如何提交定制与应用选型需求？", `请提供 ${model} 或目标容量、单次加液量、允许误差、完成时间、介质成分、温度、背压、安装空间及控制需求。页面型号标识展示配置，最终材料、接口和部件组合按项目确定。`, "What information is needed for application selection and customization?", `Provide ${model} or the target capacity, dose volume, allowed error, timing, fluid composition, temperature, back pressure, mounting space and control requirements. The page model identifies a display configuration; final materials, ports and assemblies are project-specific.`),
  ];
  if (capacity === "2500") faqs.splice(2, 0, faq("2.5 mL 为什么有 2000 和 2236 两种步数？", "正式基础容量表列 2000 步、1.42 mm 导程，型号数据另列 2236 步及 1.27 mm 导程选项。应依据实际行程、导程和图纸确认配置，不将两套步数同时用于同一控制程序。", "Why are 2000 and 2236 steps listed for 2.5 mL?", "The basic capacity table lists 2000 steps with a 1.42 mm lead; the model data also lists a 2236-step option with a 1.27 mm lead. Confirm the actual stroke, lead and drawing and use the matching values in the controller."));
  if (capacity === "5000" || capacity === "10000") faqs.splice(2, 0, faq("5 mL 与 10 mL 柱塞泵如何选择？", "基础配置中，5 mL 为 2000 步，10 mL 为 4000 步，两者每步液量均为 2.5 μL。10 mL 增加单次容量，可减少较大液量转移中的补液次数，但不代表更精细或必然更快；还需核对行程、安装空间及阀路节拍。", "How do the 5 mL and 10 mL pumps differ?", "The basic 5 mL configuration uses 2000 steps and 10 mL uses 4000; both provide a nominal 2.5 μL per step. The 10 mL version increases single-stroke capacity and may reduce refills, but does not guarantee finer or faster dispensing. Check stroke, mounting space and valve timing."));
  return { description, commonApplications: p.scenarios.map((key) => SCENARIOS[key].tag[locale]), applicationDetails, faqs };
}
