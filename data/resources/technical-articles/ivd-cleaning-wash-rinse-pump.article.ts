import type { TechnicalArticleLocale } from "./technical-articles.types";
import type { DiaphragmPumpEngineeringArticleCopy } from "./diaphragm-pump-engineering-article.types";

const LIQUID_CATEGORY =
  "/products/pumps/miniature-diaphragm-pumps/liquid-diaphragm-pumps/";
const GAS_LIQUID_CATEGORY =
  "/products/pumps/miniature-diaphragm-pumps/gas-liquid-diaphragm-pumps/";
const DPL30 =
  "/products/pumps/miniature-diaphragm-pumps/dpl30-liquid-diaphragm-pump/";
const DPL60 =
  "/products/pumps/miniature-diaphragm-pumps/dpl60-liquid-diaphragm-pump/";
const DPL30H =
  "/products/pumps/miniature-diaphragm-pumps/dpl30h-liquid-diaphragm-pump/";
const DPGL800 =
  "/products/pumps/miniature-diaphragm-pumps/dpgl800-gas-liquid-diaphragm-pump/";
const IVD_APPLICATION = "/applications/ivd/";
const WIRING_ARTICLE =
  "/resources/technical-articles/brushless-diaphragm-pump-2-wire-vs-5-wire/";
const WASTE_ARTICLE =
  "/resources/technical-articles/ivd-waste-liquid-pump-liquid-vs-gas-liquid-diaphragm-pump/";
const COVER_IMAGE =
  "/images/resources/technical-articles/ivd-cleaning-wash-rinse-pump/ivd-cleaning-wash-rinse-pump-cover.webp";

export const ivdCleaningWashRinsePumpCopies = {
  "zh-CN": {
    metadata: {
      title:
        "IVD 中的 Cleaning Pump、Wash Pump 和 Rinse Pump 有什么区别？为什么清洗液路常用微型隔膜泵？",
      seoTitle:
        "IVD Cleaning、Wash 与 Rinse Pump：为何使用微型隔膜泵？｜FOREACH 恒永达",
      seoDescription:
        "了解 IVD 液路中的 Cleaning Pump、Wash Pump 和 Rinse Pump 如何工作、为何常用微型隔膜泵，以及如何按流量、压力、介质和泵型进行选型。",
      coverImage: COVER_IMAGE,
      coverAlt: "IVD 清洗液从储液瓶经微型隔膜泵、过滤器和歧管输送至冲洗喷嘴",
    },
    deck:
      "Cleaning Pump、Wash Pump 与 Rinse Pump 通常描述清洗流程中的不同液路职责，并非三种固定泵结构。选型应从清洗体积、循环频率、管路阻力、接液材料和供液或废液任务出发，再确定液体泵、高压液体泵或气液混合泵。",
    leadBlocks: [
      {
        type: "paragraph",
        text: "在生化、免疫、血液、凝血和分子诊断设备中，清洗液路会冲洗反应杯、针路、比色杯、流通池或管路。名称相近不代表工况相同：供给清洗液、完成洗涤循环与末端漂洗可能共用一类泵，也可能因压力、介质状态和控制要求而分开。",
      },
      {
        type: "links",
        items: [
          {
            href: IVD_APPLICATION,
            label: "IVD 应用与液路解决方案",
            prefix: "先查看 ",
            suffix: "，再把泵的参数放回整机流程中评估。",
          },
        ],
      },
    ],
    sections: [
      {
        title: "1. Cleaning Pump、Wash Pump 与 Rinse Pump 分别指什么？",
        blocks: [
          {
            type: "table",
            headers: ["名称", "常见职责", "选型关注点"],
            rows: [
              ["Cleaning Pump", "清洗液输送或清洗程序的总称", "覆盖范围、流量、压力与介质"],
              ["Wash Pump", "向清洗位或洗涤腔供液", "循环节拍、喷射效果与工作流量"],
              ["Rinse Pump", "末端漂洗、置换残液或降低交叉污染", "残留量、排空能力与材料相容性"],
            ],
          },
          {
            type: "notice",
            label: "术语边界",
            text: "这些名称定义的是系统任务，不是泵的机械原理。同一台微型隔膜泵可以承担其中一种或多种任务，但必须按实际工况验证。",
          },
          {
            type: "links",
            items: [
              { href: LIQUID_CATEGORY, label: "微型液体隔膜泵分类" },
            ],
          },
        ],
      },
      {
        title: "2. 为什么 IVD 清洗需求不同于精密加样？",
        blocks: [
          {
            type: "paragraph",
            text: "样本或试剂加样通常强调微量体积精度、重复性和闭环校准；清洗则更关注在限定时间内完成足够的体积交换、克服流阻、稳定自吸并降低残留。清洗泵可以通过运行时间或转速调节影响输送量，但不能因此被当作精密闭环计量泵。",
          },
        ],
      },
      {
        title: "3. 先用 Q = V × N 估算平均清洗流量",
        blocks: [
          {
            type: "formula",
            expression: "Q = V × N = 1.2 mL/次 × 100 次/min = 120 mL/min",
            note: "Q 是平均需求流量，V 是单次清洗体积，N 是每分钟清洗次数。",
          },
          {
            type: "paragraph",
            text: "120 mL/min 只是理论平均值。选型还要加入启动、充管、阀切换、管路损失、介质黏度、老化和制造公差所需余量，并用实机液路验证工作点。",
          },
        ],
      },
      {
        title: "4. 工作需求 100–200 mL/min，为什么可先从 DPL30 的 300 mL/min 档评估？",
        blocks: [
          {
            type: "paragraph",
            text: "若系统工作需求约为 100–200 mL/min，300 mL/min 级别提供的是抵消流阻与工况偏差的候选余量，不表示装机后一定输出 300 mL/min。DPL30 的 300 mL/min 是空载流量等级，实际工作流量由泵曲线和系统阻力共同决定。",
          },
          { type: "links", items: [{ href: DPL30, label: "DPL30 300 mL/min 微型液体隔膜泵" }] },
        ],
      },
      {
        title: "5. 什么时候应评估 DPL60 的 600 mL/min 档？",
        blocks: [
          {
            type: "paragraph",
            text: "当设计要求更短的清洗节拍、更大的单次清洗体积、多支路同时供液，或 300 mL/min 级别在实际流阻下余量不足时，可评估 DPL60。它的空载流量等级为 600 mL/min；300–600 mL/min 是选型档位区间，不是保证的任意工作点。",
          },
          { type: "links", items: [{ href: DPL60, label: "DPL60 600 mL/min 微型液体隔膜泵" }] },
        ],
      },
      {
        title: "6. 清洗液路的实际流量为什么低于空载流量？",
        blocks: [
          {
            type: "formula",
            expression: "ΔP系统 = ΔP管路 + ΔP阀 + ΔP接头 + ΔP喷嘴/针 + ΔP过滤器 + ΔP高度",
            note: "泵的实际工作点是泵曲线与系统阻力曲线的交点。",
          },
          {
            type: "list",
            items: [
              "细长软管、缩径接头和小孔喷嘴会增加压降。",
              "电磁阀、过滤器、歧管与高度差会继续消耗压力预算。",
              "黏度、温度、气泡与污染状态也会改变实测流量。",
            ],
          },
        ],
      },
      {
        title: "7. DPL30H 适合高阻力清洗液路，但不是为了更大流量",
        blocks: [
          {
            type: "paragraph",
            text: "当管路、阀、过滤器或喷嘴造成较高背压时，应从压力预算判断是否需要 DPL30H。该系列面向最高 600 kPa 的高压液体输送，重点是克服 300–600 kPa 级压力需求，而不是把流量从 300 mL/min 提升到 600 mL/min。",
          },
          { type: "links", items: [{ href: DPL30H, label: "DPL30H 最高 600 kPa 高压液体隔膜泵" }] },
        ],
      },
      {
        title: "8. 为什么清洗供液常用微型隔膜泵？",
        blocks: [
          {
            type: "list",
            items: [
              "自吸能力便于从清洗液瓶取液并恢复断液后的输送。",
              "泵腔与驱动机构隔离，接液路径可围绕介质相容性配置。",
              "体积紧凑，适合仪器内部多模块集成。",
              "可通过启停、运行时间或适用电机版本的转速调节配合清洗节拍。",
            ],
          },
          {
            type: "notice",
            label: "工程验证",
            text: "自吸、流量、压力、寿命、噪声和脉动均会受系统条件影响，最终方案应在目标液路和目标清洗液上验证。",
          },
        ],
      },
      {
        title: "9. 清洗液与接液材料如何匹配？",
        blocks: [
          {
            type: "paragraph",
            text: "不能仅凭“清洗液”这一名称选择材料。应确认配方、浓度、pH、表面活性剂、氧化剂或消毒剂、温度、浸泡时间和冲洗周期，再核对膜片、阀片、泵头、密封件与管路材料。材料表只能作为初筛，需用真实介质进行浸泡、流量、泄漏和寿命验证。",
          },
        ],
      },
      {
        title: "10. 2 线、5 线和无刷配置会怎样影响清洗控制？",
        blocks: [
          {
            type: "paragraph",
            text: "部分 5 线版本可通过电机转速调节改变输出，适合需要分档或动态清洗节拍的系统；2 线版本和当前无刷配置默认不具备相同的控制接口。接口能力必须按具体型号与线束确认，不能表述为所有 5 线泵都支持同一种 PWM 控制。即使可调速，隔膜泵也不等同于精密闭环计量系统。",
          },
          { type: "links", items: [{ href: WIRING_ARTICLE, label: "无刷隔膜泵 2 线与 5 线接线和控制说明" }] },
        ],
      },
      {
        title: "11. IVD 不同液路任务对应哪些泵型？",
        blocks: [
          {
            type: "table",
            headers: ["液路任务", "主要目标", "常见泵型方向", "关键验证"],
            rows: [
              ["样本处理", "小体积吸取与转移", "注射泵、柱塞泵或移液机构", "体积精度与重复性"],
              ["试剂输送", "定量或定时供液", "计量机构或液体泵", "剂量、相容性与脉动"],
              ["清洗/漂洗供液", "快速体积交换与冲洗", "微型液体隔膜泵", "工作流量、压力、自吸与残留"],
              ["废液抽吸", "排空气体、液体或气液混合物", "液体泵或气液混合隔膜泵", "介质状态、真空度与抽空时间"],
            ],
          },
        ],
      },
      {
        title: "12. 清洗供液与废液抽吸不能使用同一套选型逻辑",
        blocks: [
          {
            type: "paragraph",
            text: "清洗供液通常是连续液体输送，应优先评估液体隔膜泵；废液端若会吸入空气、泡沫或气液混合介质，则需评估气液混合隔膜泵。DPGL800 是 24 V 无刷气体/气液混合泵，单泵头空载气体流量为 6 L/min，最大正压约 +30 kPa，最大负压低于 -90 kPa；6 L/min 绝不能写成液体流量。",
          },
          {
            type: "links",
            items: [
              { href: GAS_LIQUID_CATEGORY, label: "微型气液混合隔膜泵分类" },
              { href: DPGL800, label: "DPGL800 气体/气液混合隔膜泵" },
              { href: WASTE_ARTICLE, label: "IVD 废液泵：液体隔膜泵还是气液混合隔膜泵" },
            ],
          },
        ],
      },
      {
        title: "13. IVD 清洗泵快速选型表",
        blocks: [
          {
            type: "table",
            headers: ["已知需求", "优先评估", "仍需确认"],
            rows: [
              ["工作需求约 100–200 mL/min、常规液路阻力", "DPL30 300 mL/min 档", "实际工作点与流量余量"],
              ["更短节拍、更大体积或更高流量余量", "DPL60 600 mL/min 档", "管路压降与运行占空比"],
              ["高阻力液路，压力需求进入 300–600 kPa", "DPL30H 高压档", "连续工作压力与安全余量"],
              ["废液侧会吸入空气或气液混合物", "DPGL800 或气液混合泵", "真空度、抽空时间与介质状态"],
            ],
          },
        ],
      },
      {
        title: "结论：先定义液路任务，再选流量档、压力档和泵型",
        blocks: [
          {
            type: "paragraph",
            text: "Cleaning、Wash 和 Rinse 说明的是流程职责。可靠选型应依次确认供液或废液、Q = V × N 的平均需求、系统压力预算、介质与接液材料、控制接口和寿命要求，再选择 DPL30、DPL60、DPL30H 或 DPGL800 等候选，并通过整机液路测试定型。",
          },
        ],
      },
    ],
    faqTitle: "IVD 清洗泵常见问题",
    faqItems: [
      { question: "Cleaning Pump、Wash Pump 和 Rinse Pump 是三种不同结构的泵吗？", answer: "不一定。这些词通常描述清洗流程中的职责，而不是固定机械结构；同一台泵可承担一种或多种职责，仍需按工况验证。" },
      { question: "工作需求 120 mL/min，可以直接选择 120 mL/min 的泵吗？", answer: "不建议只按平均值等额选择。还要考虑管路压降、充管、阀切换、介质、老化和制造公差，并根据泵曲线保留合理余量。" },
      { question: "DPL30 的 300 mL/min 是实际工作流量吗？", answer: "不是。300 mL/min 是空载流量等级，实际工作流量取决于泵曲线与系统阻力的交点。" },
      { question: "DPL60 适合哪些 IVD 清洗场景？", answer: "当清洗节拍更短、单次体积更大、多支路并行或 DPL30 在实际流阻下余量不足时，可评估 600 mL/min 级 DPL60。" },
      { question: "DPL30H 为什么不等于更大流量？", answer: "DPL30H 的定位是克服较高背压，最高压力为 600 kPa。它解决的是压力预算问题，不是把流量等级提升到 600 mL/min。" },
      { question: "所有 5 线隔膜泵都支持 PWM 调速吗？", answer: "不能这样概括。部分 5 线版本可通过电机转速调节输出，但具体接口和信号必须按型号确认；2 线和当前无刷配置默认不具备相同接口。" },
      { question: "DPGL800 的 6 L/min 能用于计算清洗液流量吗？", answer: "不能。6 L/min 是单泵头空载气体流量，不是液体流量。DPGL800 用于气体或气液混合抽吸时，还应按真空度、抽空时间和实际介质状态选型。" },
      { question: "清洗液材料相容性只看 pH 可以吗？", answer: "不够。还应确认配方、浓度、温度、表面活性剂、氧化剂、浸泡时间和循环方式，并对全部接液材料做真实介质验证。" },
    ],
    cta: {
      title: "需要评估 IVD 清洗液路的流量和压力预算？",
      description: "提交单次清洗体积、节拍、管路尺寸、阀与喷嘴、清洗液配方和供液/废液任务，便于工程团队缩小候选范围。",
      contactLabel: "提交应用需求",
      productsLabel: "查看微型液体隔膜泵",
      productsHref: LIQUID_CATEGORY,
    },
  },
  en: {
    metadata: {
      title: "What Are Cleaning, Wash and Rinse Pumps in IVD Systems, and Why Are Miniature Diaphragm Pumps Used?",
      seoTitle: "IVD Cleaning, Wash & Rinse Pumps: Why Use Diaphragm Pumps? | FOREACH",
      seoDescription: "Learn how cleaning, wash and rinse pumps work in IVD fluidic systems, why miniature diaphragm pumps are commonly used, and how to select flow, pressure and pump type.",
      coverImage: COVER_IMAGE,
      coverAlt: "IVD cleaning-fluid supply path with a miniature diaphragm pump, filter, manifold and rinse nozzles",
    },
    deck: "Cleaning pump, wash pump and rinse pump usually name different duties within an IVD cleaning sequence, not three fixed pump mechanisms. Selection starts with wash volume, cycle rate, line resistance, wetted materials, and whether the duty is liquid supply or waste aspiration.",
    leadBlocks: [
      { type: "paragraph", text: "In chemistry, immunoassay, hematology, coagulation and molecular diagnostic analyzers, cleaning circuits flush probes, cuvettes, flow cells and tubing. Similar names can hide different operating points: supplying wash solution, running a wash cycle and performing a final rinse may use one pump class or separate pumps." },
      { type: "links", items: [{ href: IVD_APPLICATION, label: "IVD applications and fluidic solutions", prefix: "Review ", suffix: " to place pump specifications in the complete instrument workflow." }] },
    ],
    sections: [
      { title: "1. What do cleaning, wash and rinse pump mean?", blocks: [
        { type: "table", headers: ["Term", "Typical duty", "Selection focus"], rows: [
          ["Cleaning pump", "General cleaning-fluid delivery or cleaning-program duty", "Coverage, flow, pressure and medium"],
          ["Wash pump", "Feeds a wash station, chamber or probe", "Cycle time, jet effect and operating flow"],
          ["Rinse pump", "Final rinse, residual-fluid displacement or carryover reduction", "Residual volume, drainage and material compatibility"],
        ] },
        { type: "notice", label: "Terminology", text: "These terms describe system duties rather than pump mechanisms. One miniature diaphragm pump may cover one or more duties, subject to application validation." },
        { type: "links", items: [{ href: LIQUID_CATEGORY, label: "miniature liquid diaphragm pumps" }] },
      ] },
      { title: "2. Why is IVD cleaning different from precision dosing?", blocks: [
        { type: "paragraph", text: "Sample or reagent dosing emphasizes small-volume accuracy, repeatability and calibration. Cleaning emphasizes sufficient volume exchange within a defined time, overcoming fluidic resistance, reliable priming and low residual carryover. Run time or motor speed can influence delivery, but that does not make the pump a precision closed-loop metering device." },
      ] },
      { title: "3. Estimate average wash flow with Q = V × N", blocks: [
        { type: "formula", expression: "Q = V × N = 1.2 mL/cycle × 100 cycles/min = 120 mL/min", note: "Q is average demand, V is wash volume per cycle, and N is cycles per minute." },
        { type: "paragraph", text: "The calculated 120 mL/min is only a theoretical average. Add appropriate margin for priming, valve switching, line losses, viscosity, aging and production tolerances, then verify the operating point in the real fluid path." },
      ] },
      { title: "4. Why can a 100–200 mL/min duty start with the DPL30 300 mL/min class?", blocks: [
        { type: "paragraph", text: "For an operating demand around 100–200 mL/min, the 300 mL/min class offers candidate margin for line resistance and operating variation. It does not mean the installed pump always delivers 300 mL/min. DPL30 is rated by no-load flow class; actual flow is set by the pump curve and system resistance." },
        { type: "links", items: [{ href: DPL30, label: "DPL30 300 mL/min miniature liquid diaphragm pump" }] },
      ] },
      { title: "5. When should the DPL60 600 mL/min class be evaluated?", blocks: [
        { type: "paragraph", text: "Evaluate DPL60 when the design calls for a shorter wash cycle, a larger wash volume, simultaneous branches, or when a 300 mL/min-class pump lacks margin at the real resistance. Its no-load flow class is 600 mL/min; the 300–600 mL/min range denotes selection classes, not a guaranteed arbitrary operating point." },
        { type: "links", items: [{ href: DPL60, label: "DPL60 600 mL/min miniature liquid diaphragm pump" }] },
      ] },
      { title: "6. Why is actual flow below no-load flow?", blocks: [
        { type: "formula", expression: "ΔPsystem = ΔPtubing + ΔPvalves + ΔPfittings + ΔPnozzle/probe + ΔPfilter + ΔPelevation", note: "The operating point is where the pump curve meets the system resistance curve." },
        { type: "list", items: ["Long narrow tubing, reducers and small nozzles increase pressure drop.", "Valves, filters, manifolds and elevation consume pressure budget.", "Viscosity, temperature, bubbles and contamination also change measured flow."] },
      ] },
      { title: "7. DPL30H is for high-resistance cleaning paths, not higher flow", blocks: [
        { type: "paragraph", text: "When tubing, valves, filters or nozzles create high backpressure, use the pressure budget to determine whether DPL30H is required. The series supports high-pressure liquid transfer up to 600 kPa. Its role is to overcome a 300–600 kPa pressure demand, not to raise the flow class from 300 to 600 mL/min." },
        { type: "links", items: [{ href: DPL30H, label: "DPL30H liquid diaphragm pump up to 600 kPa" }] },
      ] },
      { title: "8. Why are miniature diaphragm pumps common for wash-solution supply?", blocks: [
        { type: "list", items: ["Self-priming supports bottle draw and recovery after an empty line.", "The wetted path is separated from the drive and can be configured for media compatibility.", "Compact packaging supports integration inside analyzers.", "On/off timing, run time or speed control on applicable motor versions can coordinate the wash sequence."] },
        { type: "notice", label: "Validation", text: "Priming, flow, pressure, life, noise and pulsation depend on the system and should be validated with the target fluid path and cleaning solution." },
      ] },
      { title: "9. How should cleaning solution and wetted materials be matched?", blocks: [
        { type: "paragraph", text: "Do not select materials from the label “cleaning solution” alone. Confirm formulation, concentration, pH, surfactants, oxidizers or disinfectants, temperature, soak time and rinse schedule. Compatibility charts are a screening tool; validate every wetted material with the real medium through soak, flow, leakage and life tests." },
      ] },
      { title: "10. How do 2-wire, 5-wire and brushless configurations affect control?", blocks: [
        { type: "paragraph", text: "Some 5-wire versions can vary output through motor-speed regulation, which can support stepped or dynamic wash cycles. Two-wire versions and current brushless configurations do not provide the same control interface by default. Confirm signals by exact model and harness; do not claim that every 5-wire pump uses the same PWM control. Adjustable speed still does not make a diaphragm pump a precision closed-loop metering system." },
        { type: "links", items: [{ href: WIRING_ARTICLE, label: "2-wire vs 5-wire brushless diaphragm pump wiring and control guide" }] },
      ] },
      { title: "11. Which pump types fit different IVD fluidic duties?", blocks: [
        { type: "table", headers: ["Fluidic duty", "Primary goal", "Typical pump direction", "Key validation"], rows: [
          ["Sample handling", "Small-volume aspiration and transfer", "Syringe, plunger or pipetting mechanism", "Volume accuracy and repeatability"],
          ["Reagent delivery", "Metered or timed liquid delivery", "Metering mechanism or liquid pump", "Dose, compatibility and pulsation"],
          ["Cleaning/rinse supply", "Fast volume exchange and flushing", "Miniature liquid diaphragm pump", "Operating flow, pressure, priming and residue"],
          ["Waste aspiration", "Evacuate gas, liquid or mixed phases", "Liquid or gas-liquid diaphragm pump", "Medium state, vacuum and evacuation time"],
        ] },
      ] },
      { title: "12. Cleaning supply and waste aspiration need different selection logic", blocks: [
        { type: "paragraph", text: "Cleaning supply is usually continuous liquid transfer, so begin with a liquid diaphragm pump. If the waste side ingests air, foam or gas-liquid mixtures, evaluate a gas-liquid diaphragm pump. DPGL800 is a 24 V brushless gas/gas-liquid pump with 6 L/min single-head no-load gas flow, about +30 kPa maximum positive pressure and below -90 kPa maximum negative pressure. The 6 L/min value must never be stated as liquid flow." },
        { type: "links", items: [{ href: GAS_LIQUID_CATEGORY, label: "miniature gas-liquid diaphragm pumps" }, { href: DPGL800, label: "DPGL800 gas/gas-liquid diaphragm pump" }, { href: WASTE_ARTICLE, label: "IVD waste pump: liquid or gas-liquid diaphragm pump" }] },
      ] },
      { title: "13. Quick IVD cleaning-pump selection table", blocks: [
        { type: "table", headers: ["Known demand", "Evaluate first", "Still confirm"], rows: [
          ["About 100–200 mL/min at conventional line resistance", "DPL30 300 mL/min class", "Operating point and flow margin"],
          ["Shorter cycle, larger volume or more flow margin", "DPL60 600 mL/min class", "Pressure drop and duty cycle"],
          ["High-resistance path requiring 300–600 kPa", "DPL30H high-pressure class", "Continuous pressure and safety margin"],
          ["Waste side ingests air or mixed phases", "DPGL800 or gas-liquid pump", "Vacuum, evacuation time and medium state"],
        ] },
      ] },
      { title: "Conclusion: define the fluidic duty before choosing flow class, pressure class and pump type", blocks: [
        { type: "paragraph", text: "Cleaning, wash and rinse identify process duties. A defensible selection defines supply versus waste, average Q = V × N demand, system pressure budget, medium and wetted materials, control interface and life requirement. Then shortlist DPL30, DPL60, DPL30H or DPGL800 and validate the complete instrument fluid path." },
      ] },
    ],
    faqTitle: "IVD cleaning-pump FAQ",
    faqItems: [
      { question: "Are cleaning, wash and rinse pumps three different pump mechanisms?", answer: "Not necessarily. The terms usually describe duties in a cleaning sequence, not fixed mechanisms. One pump may cover one or more duties after application validation." },
      { question: "Can a 120 mL/min demand use a pump rated exactly 120 mL/min?", answer: "Do not select from the average alone. Account for line pressure drop, priming, valve switching, fluid properties, aging and tolerances, then retain justified margin from the pump curve." },
      { question: "Is DPL30's 300 mL/min its actual operating flow?", answer: "No. It is a no-load flow class. Actual operating flow is the intersection of the pump curve and system resistance curve." },
      { question: "When does DPL60 suit an IVD cleaning circuit?", answer: "Evaluate the 600 mL/min-class DPL60 for shorter cycles, larger wash volumes, parallel branches, or when DPL30 lacks margin at the real system resistance." },
      { question: "Why does DPL30H not mean higher flow?", answer: "DPL30H is positioned to overcome higher backpressure, with a maximum pressure of 600 kPa. It addresses pressure budget rather than a 600 mL/min flow class." },
      { question: "Do all 5-wire diaphragm pumps support PWM speed control?", answer: "No broad claim is valid. Some 5-wire versions allow motor-speed regulation, but the interface depends on the exact model. Two-wire and current brushless configurations do not provide the same interface by default." },
      { question: "Can DPGL800's 6 L/min be used as cleaning-liquid flow?", answer: "No. The value is single-head no-load gas flow, not liquid flow. For gas or gas-liquid aspiration, select by vacuum, evacuation time and actual medium state." },
      { question: "Is pH alone enough to approve a cleaning solution?", answer: "No. Review formulation, concentration, temperature, surfactants, oxidizers, soak time and cycles, then test all wetted materials with the real medium." },
    ],
    cta: {
      title: "Need to review the flow and pressure budget of an IVD cleaning circuit?",
      description: "Share wash volume per cycle, cycle rate, tubing, valves, nozzles, cleaning-fluid formulation, and supply or waste duty to narrow the candidate range.",
      contactLabel: "Submit an application request",
      productsLabel: "View miniature liquid diaphragm pumps",
      productsHref: LIQUID_CATEGORY,
    },
  },
  es: {
    metadata: {
      title: "¿Qué son las bombas de limpieza, lavado y enjuague en los sistemas IVD y por qué se utilizan bombas miniatura de diafragma?",
      seoTitle: "Bombas de limpieza, lavado y enjuague IVD: guía de selección | FOREACH",
      seoDescription: "Conozca la función de las bombas de limpieza, lavado y enjuague en sistemas fluídicos IVD y cómo seleccionar caudal, presión, materiales y tipo de bomba.",
      coverImage: COVER_IMAGE,
      coverAlt: "Circuito de suministro de líquido de limpieza IVD con bomba miniatura de diafragma, filtro, colector y boquillas de enjuague",
    },
    deck: "Cleaning pump, wash pump y rinse pump suelen nombrar funciones distintas de una secuencia de limpieza IVD, no tres mecanismos fijos. La selección parte del volumen, la frecuencia, la resistencia del circuito, los materiales mojados y la diferencia entre suministro y aspiración de residuos.",
    leadBlocks: [
      { type: "paragraph", text: "En analizadores bioquímicos, inmunológicos, hematológicos, de coagulación y diagnóstico molecular, el circuito limpia sondas, cubetas, celdas de flujo y tuberías. Suministrar solución, ejecutar el lavado y realizar el enjuague final pueden exigir puntos de trabajo diferentes." },
      { type: "links", items: [{ href: IVD_APPLICATION, label: "aplicaciones IVD y soluciones fluídicas", prefix: "Consulte las ", suffix: " para evaluar la bomba dentro del flujo completo del instrumento." }] },
    ],
    sections: [
      { title: "1. ¿Qué significan cleaning pump, wash pump y rinse pump?", blocks: [
        { type: "table", headers: ["Término", "Función habitual", "Criterio principal"], rows: [["Cleaning pump", "Suministro general para el programa de limpieza", "Cobertura, caudal, presión y medio"], ["Wash pump", "Alimenta la estación o cámara de lavado", "Tiempo de ciclo y caudal de trabajo"], ["Rinse pump", "Enjuague final y desplazamiento de residuos", "Volumen residual y compatibilidad"]] },
        { type: "notice", label: "Límite del término", text: "Los nombres describen tareas del sistema, no principios mecánicos. Una bomba puede cubrir varias tareas si se valida en la aplicación." },
        { type: "links", items: [{ href: LIQUID_CATEGORY, label: "bombas miniatura de diafragma para líquidos" }] },
      ] },
      { title: "2. ¿Por qué la limpieza IVD no equivale a dosificación de precisión?", blocks: [{ type: "paragraph", text: "La dosificación de muestras o reactivos prioriza exactitud volumétrica y repetibilidad; la limpieza prioriza renovar suficiente volumen a tiempo, vencer la resistencia, cebar con fiabilidad y reducir residuos. Variar tiempo o velocidad cambia el suministro, pero no convierte la bomba en un sistema de dosificación en lazo cerrado." }] },
      { title: "3. Estimación del caudal medio con Q = V × N", blocks: [{ type: "formula", expression: "Q = V × N = 1,2 mL/ciclo × 100 ciclos/min = 120 mL/min", note: "Q es la demanda media, V el volumen por ciclo y N los ciclos por minuto." }, { type: "paragraph", text: "Los 120 mL/min son un promedio teórico. Añada margen por cebado, válvulas, pérdidas, viscosidad, envejecimiento y tolerancias, y valide el punto real." }] },
      { title: "4. Para 100–200 mL/min, ¿por qué evaluar primero DPL30 de 300 mL/min?", blocks: [{ type: "paragraph", text: "La clase de 300 mL/min ofrece margen frente a la resistencia y las variaciones; no garantiza 300 mL/min instalada. DPL30 se clasifica por caudal sin carga y el caudal real depende de la curva de la bomba y del sistema." }, { type: "links", items: [{ href: DPL30, label: "DPL30 de 300 mL/min" }] }] },
      { title: "5. ¿Cuándo evaluar DPL60 de 600 mL/min?", blocks: [{ type: "paragraph", text: "Considere DPL60 si se necesita un ciclo más corto, mayor volumen, ramas simultáneas o si la clase de 300 mL/min carece de margen. Los 600 mL/min son caudal sin carga; 300–600 mL/min son clases de selección, no cualquier punto garantizado." }, { type: "links", items: [{ href: DPL60, label: "DPL60 de 600 mL/min" }] }] },
      { title: "6. ¿Por qué el caudal real es menor que el caudal sin carga?", blocks: [{ type: "formula", expression: "ΔPsistema = ΔPtubería + ΔPválvulas + ΔPracores + ΔPboquilla/sonda + ΔPfiltro + ΔPaltura", note: "El punto de trabajo es la intersección entre la curva de la bomba y la resistencia del sistema." }, { type: "list", items: ["Tubos largos y estrechos y boquillas pequeñas elevan la pérdida.", "Válvulas, filtros, colectores y altura consumen presión.", "Viscosidad, temperatura, burbujas y contaminación cambian el caudal."] }] },
      { title: "7. DPL30H es para circuitos de alta resistencia, no para más caudal", blocks: [{ type: "paragraph", text: "Si tubos, válvulas, filtros o boquillas generan contrapresión alta, calcule el presupuesto de presión. DPL30H transfiere líquidos hasta 600 kPa y atiende demandas de 300–600 kPa; no eleva la clase de caudal de 300 a 600 mL/min." }, { type: "links", items: [{ href: DPL30H, label: "DPL30H hasta 600 kPa" }] }] },
      { title: "8. ¿Por qué se usan bombas miniatura de diafragma?", blocks: [{ type: "list", items: ["El autocebado ayuda a aspirar desde el depósito y recuperar una línea vacía.", "El recorrido mojado puede configurarse según la compatibilidad.", "El tamaño compacto facilita la integración.", "El encendido, el tiempo o la regulación disponible coordinan el ciclo."] }, { type: "notice", label: "Validación", text: "Cebado, caudal, presión, vida, ruido y pulsación dependen del sistema y deben validarse con el circuito y el líquido reales." }] },
      { title: "9. Compatibilidad entre solución de limpieza y materiales mojados", blocks: [{ type: "paragraph", text: "Confirme formulación, concentración, pH, tensioactivos, oxidantes o desinfectantes, temperatura, inmersión y ciclos. Una tabla solo sirve como filtro inicial; pruebe membranas, válvulas, cabezal, juntas y tubos con el medio real." }] },
      { title: "10. Control con configuraciones de 2 hilos, 5 hilos y sin escobillas", blocks: [{ type: "paragraph", text: "Algunas versiones de 5 hilos regulan la salida mediante la velocidad del motor. Las versiones de 2 hilos y las configuraciones sin escobillas actuales no incluyen por defecto la misma interfaz. Confirme modelo y mazo; no afirme que todas las bombas de 5 hilos usan el mismo PWM. La regulación no equivale a dosificación precisa en lazo cerrado." }, { type: "links", items: [{ href: WIRING_ARTICLE, label: "guía de 2 hilos frente a 5 hilos" }] }] },
      { title: "11. Tipos de bomba según la tarea fluídica IVD", blocks: [{ type: "table", headers: ["Tarea", "Objetivo", "Dirección habitual", "Validación"], rows: [["Muestra", "Aspiración y transferencia pequeña", "Jeringa, émbolo o pipeteo", "Exactitud y repetibilidad"], ["Reactivo", "Suministro medido o temporizado", "Mecanismo dosificador o bomba de líquido", "Dosis y compatibilidad"], ["Limpieza/enjuague", "Renovación rápida de volumen", "Diafragma para líquidos", "Caudal, presión, cebado y residuo"], ["Residuos", "Evacuar gas, líquido o mezcla", "Bomba de líquido o gas-líquido", "Estado del medio, vacío y tiempo"]] }] },
      { title: "12. El suministro de limpieza y la aspiración de residuos se seleccionan de forma distinta", blocks: [{ type: "paragraph", text: "Para suministrar líquido continuo, empiece por una bomba de diafragma para líquidos. Si los residuos contienen aire, espuma o mezcla gas-líquido, evalúe una bomba gas-líquido. DPGL800 es una bomba sin escobillas de 24 V para gas/mezcla, con 6 L/min de gas sin carga por cabezal, aproximadamente +30 kPa y menos de -90 kPa. Nunca presente 6 L/min como caudal de líquido." }, { type: "links", items: [{ href: GAS_LIQUID_CATEGORY, label: "bombas miniatura gas-líquido" }, { href: DPGL800, label: "DPGL800 para gas/mezcla gas-líquido" }, { href: WASTE_ARTICLE, label: "bomba de residuos IVD: diafragma para líquido o gas-líquido" }] }] },
      { title: "13. Tabla rápida de selección", blocks: [{ type: "table", headers: ["Demanda conocida", "Evaluar primero", "Confirmar"], rows: [["100–200 mL/min y resistencia convencional", "DPL30, clase 300 mL/min", "Punto real y margen"], ["Ciclo corto, mayor volumen o margen", "DPL60, clase 600 mL/min", "Pérdida y ciclo de trabajo"], ["Circuito de 300–600 kPa", "DPL30H de alta presión", "Presión continua y seguridad"], ["Residuos con aire o mezcla", "DPGL800 o bomba gas-líquido", "Vacío, tiempo y estado"]] }] },
      { title: "Conclusión: defina la tarea antes del caudal, la presión y el tipo de bomba", blocks: [{ type: "paragraph", text: "Defina suministro o residuos, Q = V × N, presupuesto de presión, medio, materiales, interfaz y vida. Después compare DPL30, DPL60, DPL30H o DPGL800 y valide el circuito completo." }] },
    ],
    faqTitle: "Preguntas frecuentes sobre bombas de limpieza IVD",
    faqItems: [
      { question: "¿Cleaning pump, wash pump y rinse pump son tres mecanismos distintos?", answer: "No necesariamente. Son nombres de funciones dentro del proceso; una bomba puede cubrir varias tras la validación." },
      { question: "¿Una demanda de 120 mL/min permite elegir exactamente 120 mL/min?", answer: "No solo con ese promedio. Incluya pérdidas, cebado, conmutación, propiedades del fluido, envejecimiento y tolerancias." },
      { question: "¿Los 300 mL/min de DPL30 son caudal real?", answer: "No. Son una clase de caudal sin carga; el punto real depende de la curva de la bomba y del sistema." },
      { question: "¿Cuándo conviene DPL60?", answer: "Para ciclos más cortos, más volumen, ramas paralelas o cuando DPL30 no conserva margen bajo la resistencia real." },
      { question: "¿Por qué DPL30H no significa mayor caudal?", answer: "Porque está orientada a vencer contrapresión hasta 600 kPa, no a una clase de 600 mL/min." },
      { question: "¿Todas las bombas de 5 hilos admiten PWM?", answer: "No. Algunas permiten regulación de velocidad, pero hay que confirmar la interfaz por modelo; 2 hilos y las configuraciones sin escobillas actuales no ofrecen la misma interfaz por defecto." },
      { question: "¿Los 6 L/min de DPGL800 son caudal de líquido?", answer: "No. Son caudal de gas sin carga por cabezal. La aspiración gas-líquido se selecciona por vacío, tiempo y estado del medio." },
      { question: "¿Basta el pH para aprobar el líquido de limpieza?", answer: "No. Revise toda la formulación, concentración, temperatura, aditivos, exposición y ciclos, y pruebe los materiales mojados." },
    ],
    cta: { title: "¿Necesita revisar caudal y presión para una limpieza IVD?", description: "Comparta volumen por ciclo, frecuencia, tubería, válvulas, boquillas, formulación y función de suministro o residuos.", contactLabel: "Enviar requisitos", productsLabel: "Ver bombas para líquidos", productsHref: LIQUID_CATEGORY },
  },
  fr: {
    metadata: {
      title: "Que sont les pompes de nettoyage, de lavage et de rinçage dans les systèmes IVD, et pourquoi utiliser des pompes miniatures à membrane ?",
      seoTitle: "Pompes de nettoyage, lavage et rinçage IVD : guide de sélection | FOREACH",
      seoDescription: "Comprendre le rôle des pompes de nettoyage, lavage et rinçage dans un circuit IVD et choisir débit, pression, matériaux et type de pompe.",
      coverImage: COVER_IMAGE,
      coverAlt: "Circuit d’alimentation en liquide de nettoyage IVD avec pompe miniature à membrane, filtre, collecteur et buses de rinçage",
    },
    deck: "Cleaning pump, wash pump et rinse pump désignent généralement des fonctions d’une séquence de nettoyage IVD, et non trois mécanismes imposés. Le choix dépend du volume, de la cadence, des pertes de charge, des matériaux en contact et de la fonction alimentation ou aspiration des effluents.",
    leadBlocks: [
      { type: "paragraph", text: "Dans les analyseurs de biochimie, immunoanalyse, hématologie, coagulation et diagnostic moléculaire, le circuit rince aiguilles, cuves, cellules et tubulures. L’alimentation de lavage, le cycle de nettoyage et le rinçage final peuvent demander des points de fonctionnement distincts." },
      { type: "links", items: [{ href: IVD_APPLICATION, label: "applications IVD et solutions fluidiques", prefix: "Consultez les ", suffix: " pour replacer les caractéristiques de la pompe dans le cycle complet de l’instrument." }] },
    ],
    sections: [
      { title: "1. Que signifient cleaning pump, wash pump et rinse pump ?", blocks: [{ type: "table", headers: ["Terme", "Fonction courante", "Critère principal"], rows: [["Cleaning pump", "Alimentation générale du programme de nettoyage", "Couverture, débit, pression et fluide"], ["Wash pump", "Alimente la station ou la chambre de lavage", "Cadence et débit réel"], ["Rinse pump", "Rinçage final et déplacement des résidus", "Volume résiduel et compatibilité"]] }, { type: "notice", label: "Vocabulaire", text: "Ces noms décrivent des fonctions système, pas des principes mécaniques. Une pompe peut en couvrir plusieurs après validation." }, { type: "links", items: [{ href: LIQUID_CATEGORY, label: "pompes miniatures à membrane pour liquides" }] }] },
      { title: "2. Pourquoi le nettoyage IVD diffère-t-il du dosage de précision ?", blocks: [{ type: "paragraph", text: "Le dosage d’échantillon ou de réactif privilégie exactitude volumique, répétabilité et étalonnage. Le nettoyage vise un échange de volume suffisant dans le temps imparti, malgré les pertes de charge, avec amorçage fiable et peu de résidus. Temps ou vitesse peuvent agir sur le débit sans créer un dosage précis en boucle fermée." }] },
      { title: "3. Estimer le débit moyen avec Q = V × N", blocks: [{ type: "formula", expression: "Q = V × N = 1,2 mL/cycle × 100 cycles/min = 120 mL/min", note: "Q est la demande moyenne, V le volume par cycle et N le nombre de cycles par minute." }, { type: "paragraph", text: "120 mL/min reste une moyenne théorique. Ajoutez une marge justifiée pour l’amorçage, les vannes, les pertes, la viscosité, le vieillissement et les tolérances, puis validez le point réel." }] },
      { title: "4. Pour 100–200 mL/min, pourquoi commencer par la classe DPL30 300 mL/min ?", blocks: [{ type: "paragraph", text: "La classe 300 mL/min apporte une marge candidate face aux résistances et variations, sans garantir 300 mL/min dans l’instrument. Le DPL30 est classé par débit à vide ; le débit réel dépend de la courbe de pompe et du réseau." }, { type: "links", items: [{ href: DPL30, label: "DPL30 300 mL/min" }] }] },
      { title: "5. Quand évaluer la classe DPL60 600 mL/min ?", blocks: [{ type: "paragraph", text: "Évaluez le DPL60 pour une cadence plus courte, un volume plus grand, des branches simultanées ou un manque de marge de la classe 300 mL/min. 600 mL/min est un débit à vide ; 300–600 mL/min représente des classes de choix, pas tout point garanti." }, { type: "links", items: [{ href: DPL60, label: "DPL60 600 mL/min" }] }] },
      { title: "6. Pourquoi le débit réel est-il inférieur au débit à vide ?", blocks: [{ type: "formula", expression: "ΔPsystème = ΔPtubes + ΔPvannes + ΔPraccords + ΔPbuse/aiguille + ΔPfiltre + ΔPhauteur", note: "Le point de fonctionnement se trouve à l’intersection de la courbe de pompe et de la courbe de résistance." }, { type: "list", items: ["Les tubes longs et fins et les petites buses augmentent les pertes.", "Vannes, filtres, collecteurs et hauteur consomment le budget de pression.", "Viscosité, température, bulles et contamination modifient le débit."] }] },
      { title: "7. DPL30H convient aux circuits résistifs, pas à un débit supérieur", blocks: [{ type: "paragraph", text: "Lorsque tubes, vannes, filtres ou buses créent une forte contre-pression, calculez le budget de pression. Le DPL30H transfère des liquides jusqu’à 600 kPa et répond aux besoins de 300–600 kPa ; il ne transforme pas la classe 300 mL/min en 600 mL/min." }, { type: "links", items: [{ href: DPL30H, label: "DPL30H jusqu’à 600 kPa" }] }] },
      { title: "8. Pourquoi employer une pompe miniature à membrane ?", blocks: [{ type: "list", items: ["L’auto-amorçage facilite l’aspiration depuis le bidon et le redémarrage.", "Le circuit mouillé peut être adapté au fluide.", "Le format compact facilite l’intégration.", "Marche/arrêt, durée ou vitesse disponible peuvent piloter la séquence."] }, { type: "notice", label: "Validation", text: "Amorçage, débit, pression, durée de vie, bruit et pulsations dépendent du système ; validez-les avec le circuit et la solution réels." }] },
      { title: "9. Compatibilité de la solution et des matériaux en contact", blocks: [{ type: "paragraph", text: "Vérifiez formulation, concentration, pH, tensioactifs, oxydants ou désinfectants, température, durée d’exposition et cycles. Un tableau n’est qu’un présélection ; testez membranes, clapets, tête, joints et tubes avec le fluide réel." }] },
      { title: "10. Effet des configurations 2 fils, 5 fils et sans balais sur la commande", blocks: [{ type: "paragraph", text: "Certaines versions 5 fils modulent la sortie par la vitesse moteur. Les versions 2 fils et les configurations sans balais actuelles n’ont pas par défaut la même interface. Confirmez modèle et faisceau ; n’affirmez pas que toutes les versions 5 fils utilisent le même PWM. La variation de vitesse ne constitue pas un dosage précis en boucle fermée." }, { type: "links", items: [{ href: WIRING_ARTICLE, label: "guide de câblage 2 fils ou 5 fils" }] }] },
      { title: "11. Types de pompe selon la tâche fluidique IVD", blocks: [{ type: "table", headers: ["Tâche", "Objectif", "Orientation courante", "Validation"], rows: [["Échantillon", "Petite aspiration et transfert", "Seringue, piston ou pipetage", "Exactitude et répétabilité"], ["Réactif", "Alimentation dosée ou temporisée", "Dosage ou pompe liquide", "Dose et compatibilité"], ["Lavage/rinçage", "Échange rapide de volume", "Membrane pour liquides", "Débit, pression, amorçage, résidus"], ["Effluents", "Évacuer gaz, liquide ou mélange", "Pompe liquide ou gaz-liquide", "État du fluide, vide et temps"]] }] },
      { title: "12. Alimentation de lavage et aspiration des effluents exigent deux logiques", blocks: [{ type: "paragraph", text: "Pour une alimentation liquide continue, commencez par une pompe à membrane pour liquides. Si les effluents contiennent air, mousse ou mélange gaz-liquide, évaluez une pompe gaz-liquide. DPGL800 est une pompe 24 V sans balais pour gaz/mélange : débit de gaz à vide 6 L/min par tête, pression positive maximale environ +30 kPa et dépression inférieure à -90 kPa. 6 L/min ne doit jamais être présenté comme débit de liquide." }, { type: "links", items: [{ href: GAS_LIQUID_CATEGORY, label: "pompes miniatures gaz-liquide" }, { href: DPGL800, label: "DPGL800 gaz/gaz-liquide" }, { href: WASTE_ARTICLE, label: "pompe d’effluents IVD : membrane liquide ou gaz-liquide" }] }] },
      { title: "13. Tableau de sélection rapide", blocks: [{ type: "table", headers: ["Besoin connu", "Évaluer d’abord", "Confirmer"], rows: [["100–200 mL/min, résistance classique", "DPL30 classe 300 mL/min", "Point réel et marge"], ["Cycle court, volume ou marge supérieurs", "DPL60 classe 600 mL/min", "Pertes et facteur de marche"], ["Circuit nécessitant 300–600 kPa", "DPL30H haute pression", "Pression continue et sécurité"], ["Effluents avec air ou mélange", "DPGL800 ou pompe gaz-liquide", "Vide, temps et état"]] }] },
      { title: "Conclusion : définir la tâche avant le débit, la pression et le type de pompe", blocks: [{ type: "paragraph", text: "Définissez alimentation ou effluents, Q = V × N, budget de pression, fluide, matériaux, interface et durée de vie. Comparez ensuite DPL30, DPL60, DPL30H ou DPGL800 et validez le circuit complet." }] },
    ],
    faqTitle: "FAQ sur les pompes de nettoyage IVD",
    faqItems: [
      { question: "Cleaning pump, wash pump et rinse pump sont-elles trois mécaniques distinctes ?", answer: "Pas nécessairement. Ces termes décrivent des fonctions ; une pompe peut en assurer plusieurs après validation." },
      { question: "Pour 120 mL/min, peut-on choisir exactement 120 mL/min ?", answer: "Pas sur cette moyenne seule. Intégrez pertes, amorçage, commutation, propriétés du fluide, vieillissement et tolérances." },
      { question: "Les 300 mL/min du DPL30 sont-ils le débit réel ?", answer: "Non. C’est une classe à vide ; le point réel dépend de la courbe de pompe et du réseau." },
      { question: "Quand choisir le DPL60 ?", answer: "Pour une cadence plus courte, un volume plus grand, des branches parallèles ou lorsque le DPL30 manque de marge sous la résistance réelle." },
      { question: "Pourquoi DPL30H ne signifie-t-il pas plus de débit ?", answer: "Il vise la contre-pression jusqu’à 600 kPa, pas une classe de débit de 600 mL/min." },
      { question: "Toutes les pompes 5 fils acceptent-elles le PWM ?", answer: "Non. Certaines autorisent une régulation de vitesse, mais l’interface dépend du modèle ; les versions 2 fils et sans balais actuelles n’offrent pas la même interface par défaut." },
      { question: "Les 6 L/min du DPGL800 sont-ils un débit de liquide ?", answer: "Non. C’est le débit de gaz à vide par tête. Pour une aspiration gaz-liquide, retenez le vide, le temps et l’état du fluide." },
      { question: "Le pH suffit-il pour accepter une solution de nettoyage ?", answer: "Non. Examinez formulation, concentration, température, additifs, exposition et cycles, puis testez tous les matériaux en contact." },
    ],
    cta: { title: "Besoin d’évaluer le débit et la pression d’un lavage IVD ?", description: "Indiquez volume par cycle, cadence, tubes, vannes, buses, formulation et fonction alimentation ou effluents.", contactLabel: "Soumettre le besoin", productsLabel: "Voir les pompes pour liquides", productsHref: LIQUID_CATEGORY },
  },
  ko: {
    metadata: {
      title: "IVD 시스템의 Cleaning Pump, Wash Pump, Rinse Pump는 무엇이며 왜 소형 다이어프램 펌프를 사용할까요?",
      seoTitle: "IVD 세척·워시·린스 펌프 선정 가이드 | FOREACH",
      seoDescription: "IVD 유로에서 cleaning, wash, rinse 펌프의 역할과 소형 다이어프램 펌프를 사용하는 이유, 유량·압력·재질·펌프 유형 선정 방법을 알아봅니다.",
      coverImage: COVER_IMAGE,
      coverAlt: "소형 다이어프램 펌프, 필터, 매니폴드 및 린스 노즐이 있는 IVD 세척액 공급 유로",
    },
    deck: "Cleaning pump, wash pump, rinse pump는 대개 세척 시퀀스의 서로 다른 역할을 뜻하며 고정된 세 가지 펌프 구조를 뜻하지 않습니다. 세척 체적, 주기, 유로 저항, 접액 재질, 공급과 폐액 흡인 역할을 기준으로 선정해야 합니다.",
    leadBlocks: [{ type: "paragraph", text: "생화학, 면역, 혈액, 응고 및 분자진단 장비의 세척 유로는 프로브, 큐벳, 플로 셀과 튜브를 세정합니다. 세척액 공급, 세척 사이클, 최종 린스는 서로 다른 운전점을 요구할 수 있습니다." }, { type: "links", items: [{ href: IVD_APPLICATION, label: "IVD 응용 및 유로 솔루션", prefix: "전체 장비 흐름에서 펌프 사양을 검토하려면 ", suffix: "을 확인하십시오." }] }],
    sections: [
      { title: "1. Cleaning Pump, Wash Pump, Rinse Pump의 의미", blocks: [{ type: "table", headers: ["용어", "일반 역할", "선정 초점"], rows: [["Cleaning Pump", "세척액 공급 또는 세척 프로그램의 총칭", "범위, 유량, 압력, 유체"], ["Wash Pump", "세척 위치나 챔버에 액체 공급", "사이클 시간과 실제 유량"], ["Rinse Pump", "최종 린스 및 잔류액 치환", "잔류량과 재질 호환성"]] }, { type: "notice", label: "용어 범위", text: "이 명칭은 시스템 역할이지 기계 원리가 아닙니다. 적용 검증 후 한 펌프가 여러 역할을 담당할 수 있습니다." }, { type: "links", items: [{ href: LIQUID_CATEGORY, label: "소형 액체 다이어프램 펌프" }] }] },
      { title: "2. IVD 세척이 정밀 정량과 다른 이유", blocks: [{ type: "paragraph", text: "시료·시약 정량은 소량 정확도, 반복성과 보정을 중시합니다. 세척은 정해진 시간 안의 충분한 체적 교환, 유로 저항 극복, 안정적 자흡과 낮은 잔류를 중시합니다. 운전 시간이나 속도 조절은 토출량에 영향을 주지만 정밀 폐루프 정량을 의미하지 않습니다." }] },
      { title: "3. Q = V × N으로 평균 세척 유량 계산", blocks: [{ type: "formula", expression: "Q = V × N = 1.2 mL/회 × 100 회/min = 120 mL/min", note: "Q는 평균 요구 유량, V는 회당 세척 체적, N은 분당 횟수입니다." }, { type: "paragraph", text: "120 mL/min은 이론 평균입니다. 프라이밍, 밸브 전환, 압력 손실, 점도, 노화와 공차 여유를 더한 뒤 실제 유로에서 운전점을 검증하십시오." }] },
      { title: "4. 100–200 mL/min 요구에서 DPL30 300 mL/min급을 먼저 검토하는 이유", blocks: [{ type: "paragraph", text: "300 mL/min급은 유로 저항과 편차를 위한 후보 여유를 제공할 뿐 설치 후 항상 300 mL/min을 보장하지 않습니다. DPL30의 값은 무부하 유량급이며 실제 유량은 펌프 곡선과 시스템 저항으로 정해집니다." }, { type: "links", items: [{ href: DPL30, label: "DPL30 300 mL/min급" }] }] },
      { title: "5. DPL60 600 mL/min급을 검토할 때", blocks: [{ type: "paragraph", text: "세척 시간이 더 짧거나 체적이 크고, 여러 분기를 동시에 공급하거나 300 mL/min급의 실제 여유가 부족할 때 DPL60을 검토합니다. 600 mL/min은 무부하 유량급이며 300–600 mL/min은 선정 등급이지 임의의 보증 운전점이 아닙니다." }, { type: "links", items: [{ href: DPL60, label: "DPL60 600 mL/min급" }] }] },
      { title: "6. 실제 유량이 무부하 유량보다 낮은 이유", blocks: [{ type: "formula", expression: "ΔP시스템 = ΔP튜브 + ΔP밸브 + ΔP피팅 + ΔP노즐/프로브 + ΔP필터 + ΔP높이", note: "운전점은 펌프 곡선과 시스템 저항 곡선의 교점입니다." }, { type: "list", items: ["길고 가는 튜브와 작은 노즐은 압력 손실을 키웁니다.", "밸브, 필터, 매니폴드와 높이 차가 압력 예산을 소모합니다.", "점도, 온도, 기포와 오염도 실측 유량을 바꿉니다."] }] },
      { title: "7. DPL30H는 고저항 세척 유로용이며 더 큰 유량용이 아닙니다", blocks: [{ type: "paragraph", text: "튜브, 밸브, 필터 또는 노즐의 배압이 높으면 압력 예산으로 DPL30H 필요 여부를 판단합니다. 최대 600 kPa 고압 액체 이송용으로 300–600 kPa 압력 요구를 해결하며, 유량급을 300에서 600 mL/min으로 높이는 제품이 아닙니다." }, { type: "links", items: [{ href: DPL30H, label: "DPL30H 최대 600 kPa" }] }] },
      { title: "8. 소형 다이어프램 펌프를 자주 사용하는 이유", blocks: [{ type: "list", items: ["자흡으로 세척액 용기 흡입과 빈 유로 복구가 쉽습니다.", "구동부와 분리된 접액 경로를 유체 호환성에 맞출 수 있습니다.", "소형 구조로 분석기 내부 통합이 쉽습니다.", "해당 모터 버전은 켜짐/꺼짐, 시간 또는 속도로 시퀀스에 맞출 수 있습니다."] }, { type: "notice", label: "검증", text: "자흡, 유량, 압력, 수명, 소음과 맥동은 시스템에 따라 달라지므로 실제 유로와 세척액으로 검증해야 합니다." }] },
      { title: "9. 세척액과 접액 재질 호환성", blocks: [{ type: "paragraph", text: "배합, 농도, pH, 계면활성제, 산화제·소독제, 온도, 침지 시간과 사이클을 확인하십시오. 호환성 표는 1차 선별 도구이며 실제 유체로 다이어프램, 밸브, 펌프 헤드, 씰과 튜브를 시험해야 합니다." }] },
      { title: "10. 2선, 5선 및 브러시리스 구성의 제어 차이", blocks: [{ type: "paragraph", text: "일부 5선 버전은 모터 속도 조절로 출력을 바꿀 수 있습니다. 2선 버전과 현재 브러시리스 구성은 기본적으로 같은 제어 인터페이스를 제공하지 않습니다. 모델과 하네스별로 신호를 확인하고 모든 5선 펌프가 같은 PWM을 지원한다고 표현하지 마십시오. 속도 조절도 정밀 폐루프 정량은 아닙니다." }, { type: "links", items: [{ href: WIRING_ARTICLE, label: "브러시리스 다이어프램 펌프 2선·5선 가이드" }] }] },
      { title: "11. IVD 유로 작업별 펌프 유형", blocks: [{ type: "table", headers: ["작업", "목표", "일반 펌프 방향", "핵심 검증"], rows: [["시료", "소량 흡입과 이송", "시린지·플런저·피펫팅", "체적 정확도와 반복성"], ["시약", "정량 또는 시간 기반 공급", "정량 기구 또는 액체 펌프", "용량과 호환성"], ["세척/린스", "빠른 체적 교환", "소형 액체 다이어프램", "유량, 압력, 자흡, 잔류"], ["폐액", "가스·액체·혼합상 배출", "액체 또는 기액 다이어프램", "유체 상태, 진공도, 시간"]] }] },
      { title: "12. 세척액 공급과 폐액 흡인은 선정 논리가 다릅니다", blocks: [{ type: "paragraph", text: "연속 액체 공급은 액체 다이어프램 펌프부터 검토합니다. 폐액에 공기, 거품 또는 기액 혼합물이 들어오면 기액 혼합 펌프를 검토합니다. DPGL800은 24 V 브러시리스 가스/기액 혼합 펌프로 헤드당 무부하 가스 유량 6 L/min, 최대 양압 약 +30 kPa, 최대 음압 -90 kPa 미만입니다. 6 L/min을 액체 유량으로 표기하면 안 됩니다." }, { type: "links", items: [{ href: GAS_LIQUID_CATEGORY, label: "소형 기액 혼합 다이어프램 펌프" }, { href: DPGL800, label: "DPGL800 가스/기액 혼합 펌프" }, { href: WASTE_ARTICLE, label: "IVD 폐액 펌프: 액체용 또는 기액 혼합" }] }] },
      { title: "13. IVD 세척 펌프 빠른 선정표", blocks: [{ type: "table", headers: ["확인된 요구", "우선 검토", "추가 확인"], rows: [["100–200 mL/min, 일반 저항", "DPL30 300 mL/min급", "운전점과 유량 여유"], ["짧은 사이클, 큰 체적 또는 여유", "DPL60 600 mL/min급", "압력 손실과 듀티"], ["300–600 kPa 고저항 유로", "DPL30H 고압급", "연속 압력과 안전 여유"], ["공기 또는 혼합상을 포함한 폐액", "DPGL800 또는 기액 펌프", "진공도, 배출 시간, 상태"]] }] },
      { title: "결론: 유로 역할을 먼저 정의한 뒤 유량·압력 등급과 펌프 유형을 선택하십시오", blocks: [{ type: "paragraph", text: "공급과 폐액, Q = V × N, 압력 예산, 유체와 재질, 제어 인터페이스와 수명을 정의하십시오. 이후 DPL30, DPL60, DPL30H 또는 DPGL800을 비교하고 전체 장비 유로에서 검증합니다." }] },
    ],
    faqTitle: "IVD 세척 펌프 FAQ",
    faqItems: [
      { question: "Cleaning, wash, rinse pump는 서로 다른 펌프 구조입니까?", answer: "반드시 그렇지는 않습니다. 세척 과정의 역할을 뜻하며 검증 후 한 펌프가 여러 역할을 수행할 수 있습니다." },
      { question: "120 mL/min 요구에 정확히 120 mL/min 펌프를 쓰면 됩니까?", answer: "평균값만으로 선정하지 마십시오. 압력 손실, 프라이밍, 전환, 유체, 노화와 공차 여유가 필요합니다." },
      { question: "DPL30의 300 mL/min이 실제 유량입니까?", answer: "아닙니다. 무부하 유량급이며 실제 운전점은 펌프 곡선과 시스템 저항으로 정해집니다." },
      { question: "DPL60은 언제 적합합니까?", answer: "더 짧은 주기, 더 큰 체적, 병렬 분기 또는 DPL30의 실제 여유가 부족할 때 검토합니다." },
      { question: "DPL30H가 더 큰 유량을 뜻하지 않는 이유는 무엇입니까?", answer: "최대 600 kPa 배압을 극복하는 압력용이지 600 mL/min 유량급이 아니기 때문입니다." },
      { question: "모든 5선 펌프가 PWM을 지원합니까?", answer: "아닙니다. 일부만 속도 조절이 가능하며 모델별 인터페이스 확인이 필요합니다. 2선과 현재 브러시리스 구성은 기본적으로 같은 인터페이스가 아닙니다." },
      { question: "DPGL800의 6 L/min은 액체 유량입니까?", answer: "아닙니다. 헤드당 무부하 가스 유량입니다. 기액 흡인은 진공도, 배출 시간과 실제 상태로 선정합니다." },
      { question: "세척액은 pH만 확인하면 됩니까?", answer: "아닙니다. 전체 배합, 농도, 온도, 첨가제, 노출 시간과 사이클을 확인하고 모든 접액 재질을 시험해야 합니다." },
    ],
    cta: { title: "IVD 세척 유로의 유량과 압력 예산 검토가 필요하십니까?", description: "회당 체적, 주기, 튜브, 밸브, 노즐, 세척액 배합과 공급/폐액 역할을 공유해 주십시오.", contactLabel: "응용 요구 제출", productsLabel: "액체 펌프 보기", productsHref: LIQUID_CATEGORY },
  },
  ru: {
    metadata: {
      title: "Что такое Cleaning Pump, Wash Pump и Rinse Pump в системах IVD и почему применяют миниатюрные мембранные насосы?",
      seoTitle: "Насосы очистки, промывки и ополаскивания IVD: выбор | FOREACH",
      seoDescription: "Различия между насосами очистки, промывки и ополаскивания в IVD, причины применения мембранных насосов и выбор расхода, давления и материалов.",
      coverImage: COVER_IMAGE,
      coverAlt: "Контур подачи промывочной жидкости IVD с миниатюрным мембранным насосом, фильтром, коллектором и форсунками",
    },
    deck: "Cleaning pump, wash pump и rinse pump обычно обозначают разные функции цикла очистки IVD, а не три фиксированные конструкции. Выбор начинается с объёма, частоты, сопротивления линии, смачиваемых материалов и различия между подачей и откачкой отходов.",
    leadBlocks: [{ type: "paragraph", text: "В биохимических, иммунологических, гематологических, коагулологических и молекулярно-диагностических анализаторах промываются зонды, кюветы, проточные ячейки и трубки. Подача раствора, цикл мойки и финальное ополаскивание могут требовать разных рабочих точек." }, { type: "links", items: [{ href: IVD_APPLICATION, label: "применения IVD и решения для жидкостных трактов", prefix: "См. ", suffix: ", чтобы оценивать насос в полном рабочем процессе прибора." }] }],
    sections: [
      { title: "1. Что означают Cleaning Pump, Wash Pump и Rinse Pump?", blocks: [{ type: "table", headers: ["Термин", "Типичная функция", "Критерий выбора"], rows: [["Cleaning Pump", "Общая подача для программы очистки", "Охват, расход, давление и среда"], ["Wash Pump", "Подача в моечную станцию или камеру", "Такт и рабочий расход"], ["Rinse Pump", "Финальное ополаскивание и вытеснение остатков", "Остаточный объём и совместимость"]] }, { type: "notice", label: "Граница терминов", text: "Названия описывают системные функции, а не механические принципы. Один насос может выполнять несколько функций после проверки." }, { type: "links", items: [{ href: LIQUID_CATEGORY, label: "миниатюрные жидкостные мембранные насосы" }] }] },
      { title: "2. Почему очистка IVD отличается от точного дозирования?", blocks: [{ type: "paragraph", text: "Для проб и реагентов важны точность малого объёма, повторяемость и калибровка. Для очистки — достаточный обмен объёма за заданное время, преодоление сопротивления, надёжное самовсасывание и низкий остаток. Время или скорость влияют на подачу, но не превращают насос в точный замкнутый дозатор." }] },
      { title: "3. Оценка среднего расхода по Q = V × N", blocks: [{ type: "formula", expression: "Q = V × N = 1,2 mL/цикл × 100 циклов/min = 120 mL/min", note: "Q — средняя потребность, V — объём на цикл, N — циклы в минуту." }, { type: "paragraph", text: "120 mL/min — теоретическое среднее. Добавьте обоснованный запас на заполнение, клапаны, потери, вязкость, старение и допуски, затем проверьте рабочую точку." }] },
      { title: "4. Почему для 100–200 mL/min сначала оценивают DPL30 класса 300 mL/min?", blocks: [{ type: "paragraph", text: "Класс 300 mL/min даёт возможный запас на сопротивление и отклонения, но не гарантирует 300 mL/min после установки. DPL30 классифицируется по расходу без нагрузки; фактический расход задаётся кривой насоса и системы." }, { type: "links", items: [{ href: DPL30, label: "DPL30 класса 300 mL/min" }] }] },
      { title: "5. Когда оценивать DPL60 класса 600 mL/min?", blocks: [{ type: "paragraph", text: "Рассмотрите DPL60 при более коротком цикле, большем объёме, одновременных ветвях или недостаточном запасе класса 300 mL/min. 600 mL/min — расход без нагрузки; 300–600 mL/min — классы выбора, а не любая гарантированная точка." }, { type: "links", items: [{ href: DPL60, label: "DPL60 класса 600 mL/min" }] }] },
      { title: "6. Почему фактический расход ниже расхода без нагрузки?", blocks: [{ type: "formula", expression: "ΔPсистемы = ΔPтрубок + ΔPклапанов + ΔPфитингов + ΔPсопла/зонда + ΔPфильтра + ΔPвысоты", note: "Рабочая точка — пересечение кривой насоса и кривой сопротивления системы." }, { type: "list", items: ["Длинные узкие трубки и малые сопла повышают потери.", "Клапаны, фильтры, коллекторы и высота расходуют давление.", "Вязкость, температура, пузырьки и загрязнение меняют расход."] }] },
      { title: "7. DPL30H предназначен для высокого сопротивления, а не для большего расхода", blocks: [{ type: "paragraph", text: "При высокой противодавлении от трубок, клапанов, фильтров или сопел рассчитайте бюджет давления. DPL30H перекачивает жидкости при давлении до 600 kPa и решает задачи 300–600 kPa; он не повышает класс расхода с 300 до 600 mL/min." }, { type: "links", items: [{ href: DPL30H, label: "DPL30H до 600 kPa" }] }] },
      { title: "8. Почему применяют миниатюрные мембранные насосы?", blocks: [{ type: "list", items: ["Самовсасывание помогает забирать раствор из ёмкости и восстанавливать пустую линию.", "Смачиваемый тракт можно подобрать по совместимости.", "Компактность упрощает интеграцию.", "Включение, время или доступная регулировка скорости согласуют цикл."] }, { type: "notice", label: "Проверка", text: "Самовсасывание, расход, давление, ресурс, шум и пульсации зависят от системы; проверяйте их на реальном тракте и растворе." }] },
      { title: "9. Совместимость раствора и смачиваемых материалов", blocks: [{ type: "paragraph", text: "Уточните состав, концентрацию, pH, ПАВ, окислители или дезинфицирующие вещества, температуру, время контакта и циклы. Таблица пригодна только для первичного отбора; проверяйте мембрану, клапаны, головку, уплотнения и трубки с реальной средой." }] },
      { title: "10. Управление в 2-проводных, 5-проводных и бесщёточных конфигурациях", blocks: [{ type: "paragraph", text: "Некоторые 5-проводные версии изменяют подачу регулировкой скорости двигателя. 2-проводные и текущие бесщёточные конфигурации по умолчанию не имеют такого же интерфейса. Проверяйте модель и жгут; нельзя утверждать, что все 5-проводные насосы используют один PWM. Регулировка скорости не равна точному замкнутому дозированию." }, { type: "links", items: [{ href: WIRING_ARTICLE, label: "руководство по 2- и 5-проводному подключению" }] }] },
      { title: "11. Типы насосов для задач тракта IVD", blocks: [{ type: "table", headers: ["Задача", "Цель", "Типичное направление", "Проверка"], rows: [["Проба", "Малый объём и перенос", "Шприцевой, плунжерный или пипетирующий", "Точность и повторяемость"], ["Реагент", "Дозированная или временная подача", "Дозатор или жидкостный насос", "Доза и совместимость"], ["Мойка/ополаскивание", "Быстрый обмен объёма", "Жидкостный мембранный", "Расход, давление, запуск, остаток"], ["Отходы", "Удаление газа, жидкости или смеси", "Жидкостный или газожидкостный", "Состояние, вакуум и время"]] }] },
      { title: "12. Подача промывки и откачка отходов требуют разной логики", blocks: [{ type: "paragraph", text: "Для непрерывной подачи жидкости начните с жидкостного мембранного насоса. При воздухе, пене или газожидкостной смеси в отходах оцените газожидкостный насос. DPGL800 — 24 V бесщёточный насос для газа/смеси: расход газа без нагрузки 6 L/min на головку, максимальное положительное давление около +30 kPa и разрежение ниже -90 kPa. 6 L/min нельзя указывать как расход жидкости." }, { type: "links", items: [{ href: GAS_LIQUID_CATEGORY, label: "миниатюрные газожидкостные мембранные насосы" }, { href: DPGL800, label: "DPGL800 для газа/газожидкостной смеси" }, { href: WASTE_ARTICLE, label: "насос отходов IVD: жидкостный или газожидкостный" }] }] },
      { title: "13. Таблица быстрого выбора", blocks: [{ type: "table", headers: ["Известное требование", "Сначала оценить", "Подтвердить"], rows: [["100–200 mL/min, обычное сопротивление", "DPL30 класса 300 mL/min", "Рабочую точку и запас"], ["Короткий цикл, больший объём или запас", "DPL60 класса 600 mL/min", "Потери и режим работы"], ["Тракт с потребностью 300–600 kPa", "DPL30H высокого давления", "Непрерывное давление и запас"], ["Отходы с воздухом или смесью", "DPGL800 или газожидкостный", "Вакуум, время и состояние"]] }] },
      { title: "Вывод: сначала определите функцию, затем класс расхода, давления и тип насоса", blocks: [{ type: "paragraph", text: "Определите подачу или отходы, Q = V × N, бюджет давления, среду, материалы, интерфейс и ресурс. Затем сравните DPL30, DPL60, DPL30H или DPGL800 и проверьте полный тракт прибора." }] },
    ],
    faqTitle: "Частые вопросы о насосах очистки IVD",
    faqItems: [
      { question: "Cleaning, wash и rinse pump — три разные конструкции?", answer: "Не обязательно. Это названия функций процесса; один насос может выполнять несколько после проверки." },
      { question: "Для 120 mL/min можно выбрать насос ровно на 120 mL/min?", answer: "Не по одному среднему значению. Учтите потери, заполнение, переключение, свойства среды, старение и допуски." },
      { question: "300 mL/min у DPL30 — фактический расход?", answer: "Нет. Это класс без нагрузки; фактическая точка зависит от кривой насоса и сопротивления системы." },
      { question: "Когда подходит DPL60?", answer: "При более коротком цикле, большем объёме, параллельных ветвях или недостаточном запасе DPL30." },
      { question: "Почему DPL30H не означает больший расход?", answer: "Он предназначен для преодоления противодавления до 600 kPa, а не для класса 600 mL/min." },
      { question: "Все 5-проводные насосы поддерживают PWM?", answer: "Нет. Некоторые регулируют скорость, но интерфейс зависит от модели; 2-проводные и текущие бесщёточные версии по умолчанию отличаются." },
      { question: "6 L/min у DPGL800 — расход жидкости?", answer: "Нет. Это расход газа без нагрузки на головку. Для газожидкостной аспирации важны вакуум, время и состояние среды." },
      { question: "Достаточно ли pH для одобрения раствора?", answer: "Нет. Проверьте состав, концентрацию, температуру, добавки, контакт и циклы, затем испытайте все смачиваемые материалы." },
    ],
    cta: { title: "Нужно оценить расход и давление в контуре очистки IVD?", description: "Укажите объём цикла, частоту, трубки, клапаны, сопла, состав раствора и функцию подачи или отходов.", contactLabel: "Отправить требования", productsLabel: "Смотреть жидкостные насосы", productsHref: LIQUID_CATEGORY },
  },
} satisfies Record<TechnicalArticleLocale, DiaphragmPumpEngineeringArticleCopy>;
