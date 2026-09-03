import type { DiaphragmPumpEngineeringArticleCopy } from "./diaphragm-pump-engineering-article.types";

const LIQUID_CATEGORY =
  "/products/pumps/miniature-diaphragm-pumps/liquid-diaphragm-pumps/";
const DPL30 =
  "/products/pumps/miniature-diaphragm-pumps/dpl30-liquid-diaphragm-pump/";
const DPL60 =
  "/products/pumps/miniature-diaphragm-pumps/dpl60-liquid-diaphragm-pump/";
const CLUSTER_OVERVIEW =
  "/resources/technical-articles/ink-circulation-supply-return-pump-diaphragm-pump/";
const WHITE_INK_ARTICLE =
  "/resources/technical-articles/white-ink-circulation-pump-selection-sedimentation/";
const GENERIC_300_600 =
  "/resources/technical-articles/300-vs-600-ml-min-diaphragm-pump-selection/";
const FLOW_CURVE_ARTICLE =
  "/resources/technical-articles/diaphragm-pump-flow-pressure-curve-guide/";
const TUBING_ARTICLE =
  "/resources/technical-articles/tube-inner-diameter-affects-diaphragm-pump-flow/";
const SUCTION_DISCHARGE_ARTICLE =
  "/resources/technical-articles/suction-vs-discharge-resistance-diaphragm-pump/";
const IMAGE_BASE =
  "/images/resources/technical-articles/ink-circulation-flow-selection";

export const inkCirculationFlowSelectionCopies = {
  "zh-CN": {
    metadata: {
      title:
        "300 mL/min 还是 600 mL/min？Ink Circulation Pump 和 Ink Return Pump 应该怎么选流量？",
      seoTitle: "300 还是 600 mL/min？Ink Pump 流量选型｜FOREACH",
      seoDescription:
        "按目标工作流量、泵曲线、墨水黏度、过滤器、管径、管长与供回压差，评估 300 或 600 mL/min Ink Circulation / Return Pump。",
      coverImage: `${IMAGE_BASE}/ink-pump-300-vs-600-flow-selection-cover.webp`,
      coverAlt:
        "FOREACH DPL30 与 DPL60 微型液体隔膜泵产品视频对比画面",
    },
    deck:
      "先确定 Ink Circulation 或 Return 回路的目标工作流量，再计算或测量目标流量下的系统压差。DPL30 的 300 mL/min 与 DPL60 的 600 mL/min 都是空载流量等级，不是安装过滤器、管路和打印头后的保证流量。目标越接近标称上限，越需要用泵曲线和整机测试确认余量。",
    leadBlocks: [
      {
        type: "notice",
        label: "快速筛选：",
        text: "目标低于 300 mL/min 时可先评估 DPL30；目标从 300 mL/min 起通常应先评估 DPL60。任何区间都只是 candidate mapping，不是 guaranteed performance。",
      },
      {
        type: "links",
        items: [
          {
            href: CLUSTER_OVERVIEW,
            label: "Ink Supply、Return 与 Circulation Pump 功能区别",
            prefix: "若泵的任务还没有定义，先阅读 ",
            suffix: "。",
          },
        ],
      },
    ],
    sections: [
      {
        title: "1. 300 还是 600 mL/min：先看这张候选映射",
        blocks: [
          {
            type: "table",
            headers: ["目标工作流量", "初步候选", "必须验证"],
            rows: [
              ["0–100 mL/min", "DPL30 candidate", "低速稳定性、脉动、调速与发热"],
              [">100–200 mL/min", "DPL30 candidate", "目标压差下的泵曲线工作点"],
              [">200–<300 mL/min", "DPL30 candidate", "上限余量；必要时同时评估 DPL60"],
              ["300–400 mL/min", "DPL60 candidate", "过滤器、黏度与供回压差"],
              [">400–500 mL/min", "DPL60 candidate", "曲线余量和过滤器加载状态"],
              [">500–600 mL/min", "DPL60 candidate", "非常接近空载上限，必须实测且可能需更大泵"],
            ],
          },
          {
            type: "notice",
            label: "端点说明：",
            text: "如果目标正好是 300 mL/min，不能因为 DPL30 标称 300 mL/min 就默认满足；在存在实际压差时应先把 DPL60 作为候选。",
          },
        ],
      },
      {
        title: "2. Target Working Flow 不等于 Pump Free Flow",
        blocks: [
          {
            type: "paragraph",
            text: "Target Working Flow 是打印、待机或循环任务在真实压差下需要的流量；Pump Free Flow 是特定测试条件下、接近低阻力边界的流量。两者之间还隔着墨水、过滤器、管路、阀、接头、脱气模块和打印头流道。",
          },
          {
            type: "formula",
            expression: "Target working flow ≠ Pump free flow",
            note: "只有泵曲线与系统曲线的交点才是可验证的装机工作点。",
          },
          {
            type: "links",
            items: [
              { href: FLOW_CURVE_ARTICLE, label: "流量—压力曲线读取方法" },
              { href: GENERIC_300_600, label: "通用 300 vs 600 mL/min 选型边界" },
            ],
          },
        ],
      },
      {
        title: "3. 为什么黏度、管径和管长会改变流量？",
        blocks: [
          {
            type: "paragraph",
            text: "在圆形直管、稳态、层流和牛顿流体的理想条件下，Hagen–Poiseuille 关系可用于理解趋势：黏度越高、管路越长、目标流量越大，需要的压差越高；管径的影响尤其强。",
          },
          {
            type: "formula",
            expression: "ΔP ∝ μLQ / D⁴",
            note: "μ 为动态黏度，L 为长度，Q 为流量，D 为内径。这里只解释趋势，不能单独完成 Inkjet Pump 选型。",
          },
          {
            type: "paragraph",
            text: "真实 Inkjet System 还包含过滤器、接头、阀、弯头、脱气器、分支和复杂打印头流道；某些墨水也可能表现出温度相关或非牛顿行为。因此应把公式用于早期敏感度分析，把部件曲线和整机压差用于最终判断。",
          },
          {
            type: "links",
            items: [
              { href: TUBING_ARTICLE, label: "管路内径为什么显著影响隔膜泵流量" },
              { href: SUCTION_DISCHARGE_ARTICLE, label: "吸入阻力与排出阻力的区别" },
            ],
          },
        ],
      },
      {
        title: "4. Filter 不能只按“新滤芯”计算",
        blocks: [
          {
            type: "paragraph",
            text: "过滤器压降随孔径、面积、流量、黏度、温度和污染负载变化。白墨或高颜料墨水还需要关注颗粒分散状态与长期沉积。仅用新滤芯压降筛选泵，可能在运行一段时间后失去流量余量。",
          },
          {
            type: "list",
            items: [
              "记录新滤芯、典型加载和接近更换阈值三种压差。",
              "同步测量泵入口压力、出口压力、流量、电流和墨水温度。",
              "确认过滤器孔径与打印头/墨水供应商要求，不用增加泵压替代正确过滤设计。",
            ],
          },
        ],
      },
      {
        title: "5. Supply 与 Return 的流量不能脱离压力控制",
        blocks: [
          {
            type: "paragraph",
            text: "流通式 DOD 打印头常同时关心供路压力、回路压力、两者压差和喷嘴弯月面压力。提高循环流量通常需要更大供回压差，但若控制和阻尼不足，可能扰动喷嘴压力、产生渗墨、补液不足、气泡或脉动。",
          },
          {
            type: "notice",
            label: "工程原则：",
            text: "Pump selection 必须与 sub-tank、damper、pressure sensor、relief/bypass 和控制策略一起评估，不能把泵的最大压力直接施加到打印头。",
          },
        ],
      },
      {
        title: "6. DPL30 与 DPL60 的已确认边界",
        blocks: [
          {
            type: "table",
            headers: ["项目", "DPL30", "DPL60"],
            rows: [
              ["空载流量等级", "300 mL/min", "600 mL/min"],
              ["额定压力", "100 kPa", "100 kPa"],
              ["自吸高度", "6 mH₂O", "3 mH₂O"],
              ["标准接管", "内径 3.2 mm 软管", "内径 3.2 mm 软管"],
              ["Inkjet 结论", "只作为较低流量候选", "只作为较高流量候选"],
            ],
          },
          {
            type: "links",
            items: [
              { href: DPL30, label: "DPL30 300 mL/min 级产品页" },
              { href: DPL60, label: "DPL60 600 mL/min 级产品页" },
              { href: LIQUID_CATEGORY, label: "微型液体隔膜泵分类" },
            ],
          },
          {
            type: "notice",
            label: "兼容性边界：",
            text: "这张表不证明任何墨水兼容性，也不证明在 100 kPa 时仍能输出空载流量。Specific ink compatibility requires validation.",
          },
        ],
      },
      {
        title: "7. 推荐的台架与整机验证流程",
        blocks: [
          {
            type: "list",
            ordered: true,
            items: [
              "把打印、待机、循环、启动和清洗工况分开定义目标流量与允许压力窗口。",
              "用目标墨水在最低、典型和最高温度测黏度或取得供应商数据。",
              "搭建包含真实管长、管径、过滤器、阀、接头、脱气器和高度差的回路。",
              "从低速启动，逐步记录流量、供压、回压、弯月面、脉动、电流和温升。",
              "用新滤芯、加载滤芯、低液位和部分堵塞条件验证控制余量。",
              "做长时间循环、停机沉降和重启恢复测试，再锁定泵与控制参数。",
            ],
          },
        ],
      },
      {
        title: "8. 何时不应在 DPL30 与 DPL60 中二选一？",
        blocks: [
          {
            type: "paragraph",
            text: "若目标接近或超过 600 mL/min、系统压差使 DPL60 曲线没有余量、打印头要求更低脉动、墨水含易受剪切或磨蚀的颗粒，或必须连续运行很长时间，就应扩大候选范围或改变系统架构，而不是把 DPL60 写成保证方案。",
          },
          {
            type: "links",
            items: [
              {
                href: WHITE_INK_ARTICLE,
                label: "White Ink Circulation Pump 的额外验证项",
                prefix: "对白墨请继续检查 ",
                suffix: "。",
              },
            ],
          },
        ],
      },
    ],
    faqTitle: "300 与 600 mL/min Ink Pump 选型 FAQ",
    faqItems: [
      {
        question: "How do I choose 300 or 600 mL/min for ink circulation?",
        answer:
          "先定义真实目标工作流量和对应系统压差。低于 300 mL/min 可先评估 DPL30；从 300 mL/min 起通常先评估 DPL60，再用曲线和整机测试验证。",
      },
      {
        question: "为什么不能把 Pump Free Flow 当作工作流量？",
        answer:
          "因为过滤器、黏度、管径、管长、阀、接头和打印头流道都会产生压降；装机流量位于泵曲线与系统曲线的交点。",
      },
      {
        question: "目标 250 mL/min，DPL30 一定足够吗？",
        answer:
          "不一定。250 mL/min 已接近 300 mL/min 空载等级，必须检查目标压差下的曲线，并可能同时评估 DPL60。",
      },
      {
        question: "目标正好 300 mL/min，可以选 DPL30 吗？",
        answer:
          "不能仅按标称值选择。真实系统有压降时，DPL30 通常没有足够空载余量，应先评估 DPL60 并实测。",
      },
      {
        question: "DPL60 可以保证 500 mL/min 白墨循环吗？",
        answer:
          "No. 500 mL/min 只是 DPL60 候选区间；实际白墨黏度、过滤器、压差、材料兼容性和长期循环都需要验证。",
      },
      {
        question: "管径为什么比管长更敏感？",
        answer:
          "在理想层流趋势中压降与长度成正比、与内径四次方成反比；但真实 Inkjet 回路还需加入局部阻力和部件曲线。",
      },
      {
        question: "过滤器压降应在什么时候测？",
        answer:
          "至少测新滤芯、典型加载和接近更换阈值三种状态，并在实际墨水温度和目标流量下测量。",
      },
      {
        question: "更高 Pump Pressure 能补偿所有流量不足吗？",
        answer:
          "不能。打印头有弯月面压力边界，过滤器和管路也有额定限制；应重新分配阻力、泵级和压力控制，而不是盲目加压。",
      },
    ],
    cta: {
      title: "把 300/600 mL/min 变成可验证的装机工作点",
      description:
        "请提供目标工作流量、墨水黏度与温度、过滤器压降、管径管长、供回压力以及运行与停机周期。",
      contactLabel: "提交 Inkjet 流量工况",
      productsLabel: "对比 DPL30 与 DPL60",
      productsHref: LIQUID_CATEGORY,
    },
  },
  en: {
    metadata: {
      title:
        "300 or 600 mL/min? How to Select an Ink Circulation or Ink Return Pump",
      seoTitle: "300 vs 600 mL/min Ink Pump Selection | FOREACH",
      seoDescription:
        "Evaluate a 300 or 600 mL/min ink circulation or return pump from target working flow, pump curve, viscosity, filter, tubing and supply-return pressure.",
      coverImage: `${IMAGE_BASE}/ink-pump-300-vs-600-flow-selection-cover.webp`,
      coverAlt:
        "FOREACH DPL30 and DPL60 miniature liquid diaphragm pumps shown in a product video",
    },
    deck:
      "Define the target working flow in the ink circulation or return circuit, then calculate or measure system differential pressure at that flow. The DPL30 300 mL/min and DPL60 600 mL/min values are no-load flow classes, not guaranteed flow after adding ink, filters, tubing and a printhead. The closer the target is to the nominal limit, the more important curve and installed testing become.",
    leadBlocks: [
      {
        type: "notice",
        label: "Quick screen:",
        text: "Below 300 mL/min, evaluate DPL30 first. At 300 mL/min and above, normally evaluate DPL60 first. Every band is candidate mapping, not guaranteed performance.",
      },
      {
        type: "links",
        items: [
          {
            href: CLUSTER_OVERVIEW,
            label: "ink supply, return and circulation pump function guide",
            prefix: "If the pump task is not yet defined, start with the ",
            suffix: ".",
          },
        ],
      },
    ],
    sections: [
      {
        title: "1. 300 or 600 mL/min: start with this candidate map",
        blocks: [
          {
            type: "table",
            headers: ["Target working flow", "Initial candidate", "Verify"],
            rows: [
              ["0–100 mL/min", "DPL30 candidate", "Low-speed stability, pulsation, control and temperature rise"],
              [">100–200 mL/min", "DPL30 candidate", "Pump-curve point at target differential pressure"],
              [">200–<300 mL/min", "DPL30 candidate", "Upper-end margin; evaluate DPL60 in parallel if needed"],
              ["300–400 mL/min", "DPL60 candidate", "Filter, viscosity and supply-return differential pressure"],
              [">400–500 mL/min", "DPL60 candidate", "Curve margin and loaded-filter state"],
              [">500–600 mL/min", "DPL60 candidate", "Very near free-flow limit; test and consider a larger pump"],
            ],
          },
          {
            type: "notice",
            label: "Boundary at 300:",
            text: "If the target is exactly 300 mL/min, do not assume a 300 mL/min-rated DPL30 will deliver it. With real differential pressure, screen DPL60 first.",
          },
        ],
      },
      {
        title: "2. Target working flow is not pump free flow",
        blocks: [
          {
            type: "paragraph",
            text: "Target working flow is the flow needed for printing, standby or circulation at real differential pressure. Pump free flow is measured near a low-resistance boundary under defined test conditions. Ink, filters, tubing, valves, fittings, degassers and printhead passages lie between the two.",
          },
          {
            type: "formula",
            expression: "Target working flow ≠ Pump free flow",
            note: "Only the pump-curve and system-curve intersection is a testable installed operating point.",
          },
          {
            type: "links",
            items: [
              { href: FLOW_CURVE_ARTICLE, label: "flow-pressure curve guide" },
              { href: GENERIC_300_600, label: "general 300 vs 600 mL/min selection boundary" },
            ],
          },
        ],
      },
      {
        title: "3. How do viscosity, tubing ID and length change flow?",
        blocks: [
          {
            type: "paragraph",
            text: "For ideal steady laminar flow of a Newtonian fluid in a round straight tube, the Hagen–Poiseuille relationship explains the trend: higher viscosity, longer tubing and higher target flow require more differential pressure, while bore diameter has an especially strong effect.",
          },
          {
            type: "formula",
            expression: "ΔP ∝ μLQ / D⁴",
            note: "μ is dynamic viscosity, L length, Q flow and D internal diameter. Use this for trends, not as a complete inkjet pump selection model.",
          },
          {
            type: "paragraph",
            text: "A real inkjet system also contains filters, fittings, valves, bends, degassers, branches and complex printhead passages. Some inks can show temperature-dependent or non-Newtonian behavior. Use the equation for early sensitivity checks and component curves plus installed pressure measurements for final decisions.",
          },
          {
            type: "links",
            items: [
              { href: TUBING_ARTICLE, label: "why tubing ID strongly affects diaphragm pump flow" },
              { href: SUCTION_DISCHARGE_ARTICLE, label: "suction versus discharge resistance" },
            ],
          },
        ],
      },
      {
        title: "4. Do not size only with a clean filter",
        blocks: [
          {
            type: "paragraph",
            text: "Filter pressure drop changes with rating, area, flow, viscosity, temperature and contaminant loading. White or highly pigmented ink adds dispersion and long-term deposition concerns. A pump selected only from clean-filter pressure drop may lose margin during operation.",
          },
          {
            type: "list",
            items: [
              "Record differential pressure with a clean filter, typical loading and near the replacement threshold.",
              "Measure pump inlet pressure, outlet pressure, flow, current and ink temperature together.",
              "Follow printhead and ink-supplier filtration requirements; do not use extra pump pressure to compensate for incorrect filtration.",
            ],
          },
        ],
      },
      {
        title: "5. Supply and return flow cannot be separated from pressure control",
        blocks: [
          {
            type: "paragraph",
            text: "A flow-through DOD head can depend on supply pressure, return pressure, their differential and nozzle meniscus pressure. Raising circulation flow normally requires more differential pressure, but inadequate control or damping can disturb the meniscus, cause weeping, restrict refill, ingest air or transmit pulsation.",
          },
          {
            type: "notice",
            label: "Engineering rule:",
            text: "Evaluate the pump with sub-tanks, dampers, pressure sensors, relief or bypass devices and the control strategy. Never apply the pump maximum pressure directly to the printhead by assumption.",
          },
        ],
      },
      {
        title: "6. Verified DPL30 and DPL60 boundaries",
        blocks: [
          {
            type: "table",
            headers: ["Item", "DPL30", "DPL60"],
            rows: [
              ["No-load flow class", "300 mL/min", "600 mL/min"],
              ["Rated pressure", "100 kPa", "100 kPa"],
              ["Self-priming lift", "6 mH₂O", "3 mH₂O"],
              ["Standard connection", "Tubing ID 3.2 mm", "Tubing ID 3.2 mm"],
              ["Inkjet conclusion", "Lower-flow candidate only", "Higher-flow candidate only"],
            ],
          },
          {
            type: "links",
            items: [
              { href: DPL30, label: "DPL30 300 mL/min-class product page" },
              { href: DPL60, label: "DPL60 600 mL/min-class product page" },
              { href: LIQUID_CATEGORY, label: "miniature liquid diaphragm pump category" },
            ],
          },
          {
            type: "notice",
            label: "Compatibility boundary:",
            text: "The table proves neither ink compatibility nor no-load flow at 100 kPa. Specific ink compatibility requires validation.",
          },
        ],
      },
      {
        title: "7. Recommended bench and installed validation",
        blocks: [
          {
            type: "list",
            ordered: true,
            items: [
              "Separate printing, standby, circulation, priming and cleaning modes with their own flow and pressure windows.",
              "Measure viscosity or obtain supplier data at the minimum, nominal and maximum ink temperature.",
              "Build the real tubing, filter, valve, fitting, degasser and elevation configuration.",
              "Start at low speed and log flow, supply pressure, return pressure, meniscus, pulsation, current and temperature rise.",
              "Validate clean and loaded filters, low reservoir level and partial blockage conditions.",
              "Run long-duration circulation, idle settling and restart recovery tests before locking the pump and controls.",
            ],
          },
        ],
      },
      {
        title: "8. When should you look beyond DPL30 and DPL60?",
        blocks: [
          {
            type: "paragraph",
            text: "Expand the candidate set or change the architecture when the target approaches or exceeds 600 mL/min, system differential pressure leaves no DPL60 curve margin, the head needs lower pulsation, the ink contains shear- or abrasion-sensitive particles, or the duty cycle is unusually demanding. Do not turn DPL60 into a guaranteed solution.",
          },
          {
            type: "links",
            items: [
              {
                href: WHITE_INK_ARTICLE,
                label: "additional white ink circulation pump validation",
                prefix: "For white ink, continue with ",
                suffix: ".",
              },
            ],
          },
        ],
      },
    ],
    faqTitle: "300 vs 600 mL/min ink pump selection FAQ",
    faqItems: [
      {
        question: "How do I choose 300 or 600 mL/min for ink circulation?",
        answer:
          "Define target working flow and system differential pressure first. Below 300 mL/min, evaluate DPL30 first; at 300 mL/min and above, normally evaluate DPL60 first, then validate the curve and installed circuit.",
      },
      {
        question: "Why can’t pump free flow be used directly?",
        answer:
          "Filters, viscosity, tubing, valves, fittings and printhead passages create pressure drop. Installed flow occurs where the pump and system curves intersect.",
      },
      {
        question: "Is DPL30 guaranteed to deliver a 250 mL/min target?",
        answer:
          "No. A 250 mL/min target is close to its 300 mL/min no-load class. Check the pump curve at target differential pressure and consider DPL60 in parallel.",
      },
      {
        question: "Can DPL30 be selected when the target is exactly 300 mL/min?",
        answer:
          "Not from the rating alone. Real pressure drop normally removes the free-flow margin, so screen DPL60 first and test the installed circuit.",
      },
      {
        question: "Does DPL60 guarantee 500 mL/min white ink circulation?",
        answer:
          "No. It is only a candidate in that flow band. Actual viscosity, filter, differential pressure, material compatibility and long-term circulation require validation.",
      },
      {
        question: "Why is tubing ID more sensitive than length?",
        answer:
          "In the ideal laminar-flow trend, pressure drop is proportional to length and inversely proportional to the fourth power of ID. Real inkjet circuits also require local-loss and component curves.",
      },
      {
        question: "When should filter pressure drop be measured?",
        answer:
          "Measure at least clean, typical-load and near-replacement states using the actual ink temperature and target flow.",
      },
      {
        question: "Can higher pump pressure compensate for every flow shortfall?",
        answer:
          "No. The printhead has a meniscus-pressure window and components have ratings. Reallocate resistance, pump capacity and pressure control instead of blindly increasing pressure.",
      },
    ],
    cta: {
      title: "Turn 300 or 600 mL/min into a verified operating point",
      description:
        "Share target working flow, ink viscosity and temperature, filter pressure drop, tubing, supply-return pressure, and operating and idle cycles.",
      contactLabel: "Submit inkjet flow conditions",
      productsLabel: "Compare DPL30 and DPL60",
      productsHref: LIQUID_CATEGORY,
    },
  },
} satisfies Record<"zh-CN" | "en", DiaphragmPumpEngineeringArticleCopy>;
