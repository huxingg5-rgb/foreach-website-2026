import type { ProductApplicationsContent, ProductDetailFaqItem } from "../product-detail.types";

type Locale = "zh" | "en";
type Localized = Record<Locale, string>;
type Scenario = "reagent" | "sample" | "reaction" | "buffer" | "water";
type Profile = { tasks: Localized; scenarios: Scenario[] };

/** SM: PS-120B-2507-00004-001, pp. 3 and 9, and the SM mechanical drawings.
 * TM: displayed configurations in the pump workbook and capacity-specific drawings.
 * Conflicting SM accuracy figures and unverified TM performance are not promoted.
 * Body, SEO and product FAQs are mirrored to the workbook before data generation.
 * Applications describe selection directions, not validated customer installations.
 */
const PROFILES: Record<string, Profile> = {
  "sm-50-pmma": { tasks: { zh: "微量试剂加注和小体积样本分配", en: "Microliter Reagent Addition and Small-Volume Sample Dispensing" }, scenarios: ["reagent", "sample", "reaction", "water"] },
  "sm-100-pmma": { tasks: { zh: "自动加样和样本稀释", en: "Automated Sampling and Sample Dilution" }, scenarios: ["sample", "reagent", "reaction", "water"] },
  "sm-100-peek": { tasks: { zh: "特殊试剂加注和小体积液体分配", en: "Specialty Reagent Addition and Small-Volume Dispensing" }, scenarios: ["reagent", "reaction", "sample", "water"] },
  "sm-250-pmma": { tasks: { zh: "试剂分配和反应液定量添加", en: "Reagent Dispensing and Metered Reaction-Liquid Addition" }, scenarios: ["reagent", "reaction", "sample", "water"] },
  "sm-250-peek": { tasks: { zh: "特殊试剂分配和反应液添加", en: "Specialty Reagent Dispensing and Reaction-Liquid Addition" }, scenarios: ["reaction", "reagent", "water", "sample"] },
  "sm-500-pmma": { tasks: { zh: "试剂加注和稀释液定量添加", en: "Reagent Addition and Metered Diluent Dosing" }, scenarios: ["reagent", "sample", "buffer", "water"] },
  "sm-1000-pmma": { tasks: { zh: "稀释液添加和缓冲液分配", en: "Diluent Addition and Buffer Dispensing" }, scenarios: ["buffer", "sample", "reagent", "water"] },
  "tm-50-pmma": { tasks: { zh: "紧凑液路中的微量试剂加注", en: "Microliter Reagent Addition in Compact Fluid Paths" }, scenarios: ["reagent", "reaction", "sample", "water"] },
  "tm-100-pmma": { tasks: { zh: "小型检测模块中的样本分配", en: "Sample Dispensing in Small Analytical Modules" }, scenarios: ["sample", "reagent", "reaction", "water"] },
  "tm-250-pmma": { tasks: { zh: "紧凑分析模块中的反应液添加", en: "Reaction-Liquid Addition in Compact Analytical Modules" }, scenarios: ["reaction", "reagent", "sample", "water"] },
  "tm-500-pmma": { tasks: { zh: "模块化液路中的试剂和缓冲液分配", en: "Reagent and Buffer Dispensing in Modular Fluid Paths" }, scenarios: ["buffer", "reagent", "sample", "water"] },
};

const SCENARIOS: Record<Scenario, { title: Localized; tag: Localized; need: Localized; integration: Localized }> = {
  reagent: {
    title: { zh: "生化与免疫分析：试剂加注泵", en: "Clinical chemistry and immunoassay: reagent dispensing pump" },
    tag: { zh: "分析仪试剂加注", en: "Analyzer reagent dispensing" },
    need: { zh: "分析仪需要按程序向反应单元重复加入试剂，重点在于实际加液量的一致性，以及泵、选路阀和加样针的动作配合。", en: "Analyzers repeatedly add programmed reagent doses to reaction units. Selection depends on consistency at the working dose and coordination between the pump, selector valve and dispensing probe." },
    integration: { zh: "可围绕试剂加注配置吸排液行程和阀路，并按试剂成分、温度及清洗流程匹配接液材料。", en: "Aspiration and dispense strokes can be coordinated with reagent-routing valves; wetted materials are selected against reagent composition, temperature and cleaning conditions." },
  },
  sample: {
    title: { zh: "实验室自动化：加样泵与样本稀释泵", en: "Laboratory automation: sampling and sample dilution pump" },
    tag: { zh: "自动加样与样本稀释", en: "Automated sampling and sample dilution" },
    need: { zh: "自动加样和样品前处理需要分别控制样本与稀释液体积，同时处理换样后的残留、管路气泡和阀切换时序。", en: "Automated sampling and sample preparation require separate control of sample and diluent volumes, together with management of carryover, bubbles and valve timing." },
    integration: { zh: "可配合加样针、管路和阀组件组织吸样与排液步骤；稀释比例还需同时验证样本量、稀释液量及混合方式。", en: "The pump can be configured with probes, tubing and valves for sampling and dispensing. Dilution-ratio performance also requires validation of sample volume, diluent volume and mixing." },
  },
  reaction: {
    title: { zh: "生命科学仪器：反应液定量分配泵", en: "Life science instruments: metered reaction-liquid dispensing pump" },
    tag: { zh: "反应液定量添加", en: "Metered reaction-liquid addition" },
    need: { zh: "小体积反应体系需要按顺序加入不同液体，关注单次加液误差、加液后的残滴及换液残留，并需为阀路和检测单元预留空间。", en: "Small-volume reaction systems add different liquids in sequence. Important requirements include dose error, residual droplets, carryover and space for valves and detection components." },
    integration: { zh: "可通过对应容量、步数和控制时序规划分段加液，并匹配阀组件与排液端结构；残滴和残留水平需在完整液路中验证。", en: "Capacity, step count and control timing support staged dosing, with valves and outlet geometry matched to the instrument. Droplet retention and carryover must be tested in the complete fluid path." },
  },
  buffer: {
    title: { zh: "自动化配液模块：稀释液与缓冲液添加泵", en: "Automated liquid preparation: diluent and buffer dosing pump" },
    tag: { zh: "稀释液与缓冲液分配", en: "Diluent and buffer dispensing" },
    need: { zh: "自动化配液与分析模块需要定量补加稀释液或缓冲液，容量选择应兼顾单次液量、补液次数和设备节拍。", en: "Liquid-preparation and analytical modules meter diluents or buffers. Capacity selection must account for dose volume, refill cycles and instrument timing." },
    integration: { zh: "可按一次行程或多次吸排液组织定量添加。输送含盐缓冲液时，需配套停机冲洗和残液处理，减少结晶对运行的影响。", en: "Metered additions can use a single stroke or repeated aspiration and dispense cycles. Saline buffers require shutdown flushing and residual-liquid management to address crystallization." },
  },
  water: {
    title: { zh: "水质与环境分析：试剂计量泵与标准液添加泵", en: "Water and environmental analysis: reagent metering and standard-addition pump" },
    tag: { zh: "水质分析试剂计量", en: "Water-analysis reagent metering" },
    need: { zh: "小型水质分析模块需要向测量单元定量添加试剂或标准液，既要匹配加液范围，也要核对酸碱性、浓度及维护条件。", en: "Small water-analysis modules add defined reagent or standard volumes to measurement cells. Selection depends on the dosing range, fluid chemistry, concentration and maintenance conditions." },
    integration: { zh: "可按测量程序配置加液容量和液路切换，泵头、柱塞、密封及阀件需一起评估；腐蚀性、含颗粒或易结晶介质须单独验证。", en: "Dose capacity and fluid-path switching can be matched to the measurement sequence. The head, piston, seals and valves must be assessed together; corrosive, particulate or crystallization-prone fluids require specific validation." },
  },
};

export const COMPACT_PUMP_MODELS = Object.keys(PROFILES);

export function getCompactPumpContent(slug: string, locale: Locale) {
  const profile = PROFILES[slug];
  if (!profile) return undefined;
  const [series, capacity, material] = slug.split("-");
  const sm = series === "sm";
  const model = slug.toUpperCase();
  const head = material.toUpperCase();
  const volume = capacity === "1000" ? "1 mL" : `${capacity} μL`;
  const steps = sm ? 2000 : 2540;
  const stepVolume = Number((Number(capacity) / steps).toPrecision(5)).toString();
  const type = locale === "zh" ? (sm ? "微型" : "超微型") : (sm ? "Miniature" : "Ultra-Compact");
  const heading = locale === "zh"
    ? `${volume}${type}精密${head === "PMMA" ? "陶瓷" : ""}柱塞泵，用于${profile.tasks.zh}，采用${head}泵头`
    : `${volume} ${type} Precision ${head === "PMMA" ? "Ceramic " : ""}Piston Pump for ${profile.tasks.en}, with a ${head} Pump Head`;
  const port = sm ? "1/4-28 UNF / M6" : "6-40 UNF";
  const materialNote: Localized = head === "PEEK" ? {
    zh: "当前 PEEK 泵头用于匹配试剂的材料需求，仍需核对柱塞、密封、阀件与管路；整条液路的避光需求需单独设计。",
    en: "The PEEK head is a material option for the reagent; piston, seals, valves and tubing must also be checked. Whole-path light protection requires a separate design assessment.",
  } : {
    zh: "当前展示 PMMA 泵头与陶瓷柱塞配置，需按实际液体核对所有接液材料。",
    en: "The displayed configuration uses a PMMA head and ceramic piston. All wetted materials must be checked against the actual fluid.",
  };
  const customization: Localized = sm ? {
    zh: "支持按项目匹配泵头、柱塞及液路组件。SM 系列泵头可选 PMMA、PSU、POM、PEEK 等，柱塞可选陶瓷、不锈钢或 PEEK，并可配置光耦、阀组件、加样针、管路与控制器。材料组合及安装方式按介质和整机需求确定。",
    en: "SM head options include PMMA, PSU, POM and PEEK; piston options include ceramic, stainless steel and PEEK. Optical sensors, valves, probes, tubing and a controller can be matched to the project. Materials and mounting are selected for the fluid and instrument.",
  } : {
    zh: "可围绕安装方式、接管、阀组件与驱动控制开展项目配置。当前展示 PMMA 泵头与陶瓷柱塞；如需其他泵头或柱塞材料，可按试剂成分、密封配合和结构空间评估，具体组合以项目图纸为准。",
    en: "Mounting, tubing connections, valves and drive control can be configured for the project. The displayed version uses a PMMA head and ceramic piston; alternative head or piston materials can be assessed against fluid chemistry, seal design and available space, subject to the project drawing.",
  };
  const description = locale === "zh" ? [
    `${model} 是标称容量 ${volume} 的${type}精密柱塞泵，采用 ${head} 泵头，面向${profile.tasks.zh}。${sm ? "适用于小型自动化仪器及加样机构的液路集成，支持 1/4-28 UNF 或 M6 接口，满量程为 2000 步；规定条件下的满量程重复性为 ≤0.5%。" : "面向安装空间受限的 OEM 分析模块，展示配置采用 6-40 UNF 接口，满量程为 2540 步，便于结合阀路和检测单元规划布局。"}`,
    customization.zh,
  ] : [
    `${model} is a ${volume} ${type.toLowerCase()} precision piston pump with a ${head} head for ${profile.tasks.en.toLowerCase()}. ${sm ? "Designed for integration into small automated instruments and sampling mechanisms, it supports 1/4-28 UNF or M6 ports and 2000 full-stroke steps. Full-stroke repeatability is ≤0.5% under the specified conditions." : "It targets space-constrained OEM analytical modules. The displayed configuration uses 6-40 UNF ports and 2540 full-stroke steps for integration alongside valves and detection components."}`,
    customization.en,
  ];
  const fit: Localized = Number(capacity) <= 100 ? {
    zh: `${volume} 容量可用于规划小体积加液，但标称容量和每步液量均不等于最小可靠分配量。`,
    en: `The ${volume} capacity supports planning small-volume dosing; neither capacity nor nominal volume per step defines the minimum reliable dose.`,
  } : {
    zh: `${volume} 容量需结合单次液量选择；总液量超过单次容量时，应计入补液和阀切换时间。`,
    en: `Select the ${volume} capacity against the working dose. If the total transfer exceeds one stroke, include refill and valve-switching time.`,
  };
  const seriesFit: Localized = sm ? {
    zh: "SM 的微型结构可配合自动加样机构集成，2000 步满量程支持吸排液位置控制；满量程重复性指标不能直接代替小液量下的实测结果。",
    en: "SM supports integration with automated sampling mechanisms; 2000 full-stroke steps provide position control for aspiration and dispensing. Full-stroke repeatability does not establish performance at smaller doses.",
  } : {
    zh: "TM 的超微型结构与 6-40 UNF 接口面向受限空间布局；需根据具体容量图纸预留接头、管路弯曲和拆装空间，并验证实际加液性能。",
    en: "The ultra-compact TM structure and 6-40 UNF ports target restricted installation space. Use the capacity-specific drawing to allow for fittings, tubing bends and service access, then validate dosing performance.",
  };
  const applicationDetails: ProductApplicationsContent = {
    tabLabel: locale === "zh" ? "应用" : "Applications",
    title: locale === "zh" ? `${model} 的应用场景与选型要求` : `${model} applications and selection requirements`,
    intro: locale === "zh" ? [
      `${sm ? "SM 微型" : "TM 超微型"}柱塞泵可围绕生化与免疫分析、实验室自动化、样品前处理、生命科学仪器及水质与环境分析进行液路配置。按设备中的功能，可作为试剂加注泵、自动加样泵、样本稀释泵、反应液分配泵、缓冲液添加泵或标准液计量泵开展选型。`,
      `${model} 重点面向${profile.tasks.zh}。${fit.zh}${materialNote.zh}`,
    ] : [
      `${sm ? "SM miniature" : "TM ultra-compact"} piston pumps can be configured for clinical chemistry, immunoassay, laboratory automation, sample preparation, life science instruments and water or environmental analysis. Depending on the fluidic task, selection may focus on a reagent dispensing pump, sampling pump, sample dilution pump, reaction-liquid dispensing pump, buffer dosing pump or standard-addition pump.`,
      `${model} focuses on ${profile.tasks.en.toLowerCase()}. ${fit.en} ${materialNote.en}`,
    ],
    items: profile.scenarios.map(key => ({ title: SCENARIOS[key].title[locale], paragraphs: [SCENARIOS[key].need[locale], `${model}${locale === "zh" ? "：" : ": "}${SCENARIOS[key].integration[locale]} ${key === profile.scenarios[0] ? seriesFit[locale] : fit[locale]}${key === "water" ? ` ${materialNote[locale]}` : ""}`] })),
    selectionNote: {
      title: locale === "zh" ? "确认实际工况" : "Confirm the working conditions",
      paragraphs: locale === "zh" ? [
        `请提供单次加液量、允许误差、完成时间、介质成分、温度、背压和安装空间。${volume} / ${steps} 步对应基础每步液量约 ${stepVolume} μL，仅为名义换算；最小可靠液量、残留及滴漏需按完整液路验证。`,
        sm ? "SM 规格书中的 500 万次预计寿命对应纯水、常温、50 kPa 背压条件。含盐或易结晶液体需设计停机冲洗与维护流程。" : "TM 的准确性、重复性、工作压力与寿命应结合所选材料、驱动方式和工作液体确认。整机需同时评估阀动作、气泡控制、维护方式与运行节拍。",
      ] : [
        `Provide dose volume, allowed error, timing, fluid composition, temperature, back pressure and mounting space. ${volume} divided by ${steps} steps gives approximately ${stepVolume} μL per step as a nominal calculation only. Validate minimum reliable dose, carryover and dripping in the complete fluid path.`,
        sm ? "The SM specification gives an expected life of five million cycles with pure water at room temperature and 50 kPa back pressure. Saline or crystallization-prone fluids require shutdown flushing and maintenance planning." : "Confirm TM accuracy, repeatability, working pressure and life for the selected materials, drive and fluid. Instrument validation also includes valve operation, bubble management, maintenance and cycle timing.",
      ],
    },
  };
  const faq = (question: Localized, answer: Localized): ProductDetailFaqItem => ({ question: question[locale], answer: answer[locale] });
  const faqs = [
    faq({ zh: `${model} 适合哪些应用？`, en: `Which applications suit ${model}?` }, { zh: `重点为${profile.tasks.zh}，也可按设备流程评估${profile.scenarios.map(k => SCENARIOS[k].tag.zh).join("、")}。${fit.zh}`, en: `It focuses on ${profile.tasks.en.toLowerCase()}. Related selection tasks include ${profile.scenarios.map(k => SCENARIOS[k].tag.en.toLowerCase()).join(", ")}. ${fit.en}` }),
    faq({ zh: `${volume} 是最小加液量吗？`, en: `Is ${volume} the minimum dose?` }, { zh: `不是，${volume} 是标称容量。满量程 ${steps} 步对应基础每步液量约 ${stepVolume} μL，这也不是最小可靠加液量；实际结果取决于液体、背隙、气泡、阀件和管路，需按目标液量测试。`, en: `No. ${volume} is the nominal capacity. ${steps} full-stroke steps give approximately ${stepVolume} μL per step, which is not a validated minimum dose either. Fluid, backlash, bubbles, valves and tubing affect results; test at the intended working volume.` }),
    faq({ zh: "泵头和柱塞可以配置哪些材料？", en: "Which head and piston materials can be configured?" }, { zh: `${materialNote.zh}${customization.zh}`, en: `${materialNote.en} ${customization.en}` }),
    faq({ zh: "集成时需要预留多大空间？", en: "How much installation space is required?" }, { zh: `${seriesFit.zh}${capacity === "100" ? (sm ? "100 μL 基础结构图所示本体约为 28 × 35.4 × 129.5 mm。" : "100 μL 基础结构图所示本体约为 20 × 26.3 × 102 mm。") : "不同容量的外形尺寸请查看本页对应零件图。"}本体尺寸不含外接接头和管路余量，最终以配置图纸为准。`, en: `${seriesFit.en} ${capacity === "100" ? (sm ? "The 100 μL basic drawing shows a body envelope of approximately 28 × 35.4 × 129.5 mm." : "The 100 μL basic drawing shows a body envelope of approximately 20 × 26.3 × 102 mm.") : "See the capacity-specific technical drawing on this page for dimensions."} Body dimensions exclude external fittings and tubing clearance; the selected configuration drawing governs.` }),
    faq({ zh: "如何连接液路并匹配控制系统？", en: "How are fluidic connections and controls configured?" }, { zh: `展示配置采用 ${port} 接口。${sm ? "可匹配初始位置光耦、阀组件及 ISC1000 控制器；控制器可提供 RS-232、RS-485、CAN 接口，需按所选配置确认。" : "请提供驱动器、供电和反馈需求，按项目匹配电机控制及阀动作；控制通信接口不能由液路接口或步数推定。"}接管方案还需结合管径、密封和安装方向确定。`, en: `The displayed configuration uses ${port} ports. ${sm ? "Home-position optical sensors, valves and an ISC1000 controller can be selected; RS-232, RS-485 and CAN options depend on the chosen controller configuration." : "Provide driver, power and feedback requirements to coordinate motor control and valves. Communication interfaces cannot be inferred from fluidic ports or step count."} Tubing diameter, seals and mounting orientation must also be specified.` }),
    faq({ zh: "如何确认准确性、重复性和使用寿命？", en: "How should accuracy, repeatability and service life be confirmed?" }, { zh: sm ? "SM 满量程重复性在规定条件下为 ≤0.5%，不适用于任意小液量。请提供实际液量与允许误差，按所选配置确认准确性。500 万次预计寿命对应纯水、常温和 50 kPa 背压，不是任意试剂下的寿命保证。" : "请提供工作液量、允许误差、试剂、温度、背压及每日运行次数，按所选配置进行加液与循环验证。2540 步描述的是满量程步数，不能直接推定准确性、重复性或寿命。", en: sm ? "SM full-stroke repeatability is ≤0.5% under the specified conditions, not at every small dose. Provide the working volume and allowed error to confirm configuration-specific accuracy. The expected five-million-cycle life uses pure water at room temperature and 50 kPa back pressure; it is not a universal reagent-life guarantee." : "Provide working volume, allowed error, reagent, temperature, back pressure and daily cycle count for dispensing and cycle testing. The 2540 full-stroke steps do not establish accuracy, repeatability or service life." }),
  ];
  const seoTitle = locale === "zh" ? `${model} ${volume} ${head} ${type}柱塞泵 | FOREACH` : `${model} ${volume} ${head} ${type} Piston Pump | FOREACH`;
  const metaDescription = locale === "zh" ? `${model} 为 ${volume} ${head} 泵头${type}柱塞泵，用于${profile.tasks.zh}。查看 ${port} 接口、${steps} 步配置、应用要求及泵头、柱塞与液路集成选项。` : `${model}: ${volume} ${head}-head ${type.toLowerCase()} piston pump for ${profile.tasks.en.toLowerCase()}. Explore ${port} ports, ${steps} steps and OEM integration options.`;
  return { heading, description, commonApplications: profile.scenarios.map(k => SCENARIOS[k].tag[locale]), applicationDetails, faqs, seoTitle, metaDescription };
}
