import type { DiaphragmPumpEngineeringArticleCopy } from "./diaphragm-pump-engineering-article.types";

const LIQUID_CATEGORY =
  "/products/pumps/miniature-diaphragm-pumps/liquid-diaphragm-pumps/";
const DPL30 =
  "/products/pumps/miniature-diaphragm-pumps/dpl30-liquid-diaphragm-pump/";
const DPL60 =
  "/products/pumps/miniature-diaphragm-pumps/dpl60-liquid-diaphragm-pump/";
const WIRING_ARTICLE =
  "/resources/technical-articles/brushless-diaphragm-pump-2-wire-vs-5-wire/";
const FLOW_CURVE_ARTICLE =
  "/resources/technical-articles/diaphragm-pump-flow-pressure-curve-guide/";
const FLOW_SELECTION_ARTICLE =
  "/resources/technical-articles/300-vs-600-ml-min-ink-circulation-return-pump-selection/";
const WHITE_INK_ARTICLE =
  "/resources/technical-articles/white-ink-circulation-pump-selection-sedimentation/";
const IMAGE_BASE =
  "/images/resources/technical-articles/ink-circulation-supply-return-pump";

export const inkCirculationSupplyReturnPumpCopies = {
  "zh-CN": {
    metadata: {
      title:
        "Ink Circulation Pump、Ink Supply Pump 和 Ink Return Pump 有什么区别？为什么喷墨液路会使用微型隔膜泵？",
      seoTitle: "Ink Circulation、Supply 与 Return Pump 区别｜FOREACH",
      seoDescription:
        "解释喷墨液路中 Ink Supply Pump、Ink Return Pump 与 Ink Circulation Pump 的功能边界、常见系统架构、喷头负压、工作流量和隔膜泵选型验证。",
      coverImage: `${IMAGE_BASE}/ink-supply-return-circulation-cover.webp`,
      coverAlt:
        "FOREACH DPL 系列微型液体隔膜泵产品视频画面",
    },
    deck:
      "Ink Supply Pump、Ink Return Pump 和 Ink Circulation Pump 是液路功能名称，不是三种固定的机械泵。供墨泵把墨水送往副墨箱或打印头，回墨泵把未喷出的墨水带回储液端，循环泵则描述闭合回路中的持续或间歇流动。是否需要三台独立泵，取决于打印头、主墨箱/副墨箱、重力或真空控制、过滤器和供回路架构。",
    leadBlocks: [
      {
        type: "notice",
        label: "先给结论：",
        text: "不要按名称先决定泵的数量。先画出 Reservoir → Supply → Sub Tank / Damper → Printhead → Return 的真实路径，再确认每段的流量、压力、空气状态和介质兼容性。",
      },
      {
        type: "links",
        items: [
          {
            href: LIQUID_CATEGORY,
            label: "微型液体隔膜泵分类",
            prefix: "查看可进一步评估的 ",
            suffix: "。",
          },
        ],
      },
    ],
    sections: [
      {
        title: "1. 三个 Pump 名称分别表示什么？",
        blocks: [
          {
            type: "table",
            headers: ["功能名称", "典型任务", "不应直接推断"],
            rows: [
              [
                "Ink Supply Pump",
                "从主墨箱向副墨箱、稳压单元或打印头供墨",
                "不等于必须直接给打印头加压",
              ],
              [
                "Ink Return Pump",
                "把未喷出的墨水从回路下游送回副墨箱或主墨箱",
                "不等于所有系统都需要一台独立回墨泵",
              ],
              [
                "Ink Circulation Pump",
                "维持储液端、管路、过滤器和/或打印头之间的循环",
                "不等于一个固定泵型或固定安装位置",
              ],
            ],
          },
          {
            type: "paragraph",
            text: "同一台泵可能同时承担供墨和循环功能；两台泵也可能分别调节供、回流量。还有一些系统依靠副墨箱液位、重力、气路负压、阀和阻尼器形成工作点。因此这些名称用于描述系统任务，而不能单独确定机械结构。",
          },
        ],
      },
      {
        title: "2. Supply 与 Return 是否一定使用独立泵？",
        blocks: [
          {
            type: "paragraph",
            text: "不一定。双泵架构可以通过供墨泵与回墨泵的相对转速建立循环压差；传统架构也可能使用供、回副墨箱，并通过液位差和气路真空维持打印头弯月面。某些非流通式打印头只需要补墨与维护回路，并不持续让墨水穿过打印头。",
          },
          {
            type: "notice",
            label: "系统边界：",
            text: "文章中的典型框图用于说明任务，不代表所有 DOD、CIJ、扫描式或单程喷墨设备都采用同一架构。",
          },
        ],
      },
      {
        title: "3. 为什么部分喷墨系统需要墨水循环？",
        blocks: [
          {
            type: "list",
            items: [
              "让易沉降的颜料持续经过有效流动区，减小局部浓度分层风险。",
              "在支持流通的打印头中，把流动带到喷嘴附近，帮助降低干燥、沉积或滞留造成的喷射不稳定。",
              "配合脱气、过滤和温控，使进入打印头的墨水状态更一致。",
              "在启动、补墨或维护时帮助排出循环路径中的空气。",
            ],
          },
          {
            type: "paragraph",
            text: "但不是所有喷墨系统都需要持续循环。染料墨水、非流通式打印头、短管路或由墨盒/副墨箱直接补墨的设备，可能采用间歇循环、仅白墨循环或完全不同的维护方式。应以墨水配方、打印头说明和整机架构为准。",
          },
          {
            type: "links",
            items: [
              {
                href: WHITE_INK_ARTICLE,
                label: "白墨循环泵、颜料沉降与死区选型指南",
                prefix: "白墨问题详见 ",
                suffix: "。",
              },
            ],
          },
        ],
      },
      {
        title: "4. 为什么喷墨液路会使用微型隔膜泵？",
        blocks: [
          {
            type: "paragraph",
            text: "在空间受限的 OEM 液路中，微型隔膜液泵可提供紧凑、自吸的液体输送能力，并可通过电机转速或系统控制改变输出。它可作为主墨箱补液、低压供液、回墨或外部循环的候选。",
          },
          {
            type: "notice",
            label: "不能泛化：",
            text: "低脉动、可干转、耐磨、耐特定溶剂或适合长期白墨循环都必须落实到具体型号和测试条件。FOREACH 当前公开参数不能自动证明 DPL30 或 DPL60 适配某一种墨水。",
          },
        ],
      },
      {
        title: "5. 为什么不能只看 Pump Free Flow？",
        blocks: [
          {
            type: "paragraph",
            text: "Free-flow 是低阻力测试边界，不是装机工作点。墨水黏度、过滤器压降、脱气模块、管径、管长、接头、阀、打印头流道和高度差共同形成系统阻力；实际流量由泵曲线与系统曲线的交点决定。",
          },
          {
            type: "formula",
            expression: "Installed operating point = Pump curve ∩ System curve",
            note: "必须使用目标墨水和完整液路进行测量。",
          },
          {
            type: "links",
            items: [
              {
                href: FLOW_CURVE_ARTICLE,
                label: "隔膜泵流量—压力曲线读取指南",
              },
              {
                href: FLOW_SELECTION_ARTICLE,
                label: "300 与 600 mL/min Ink Pump 选型指南",
              },
            ],
          },
        ],
      },
      {
        title: "6. 为什么打印头附近的压力不能越高越好？",
        blocks: [
          {
            type: "paragraph",
            text: "DOD 打印头通常需要受控的弯月面压力。压力过高可能使喷嘴渗墨或滴墨；负压过大又可能使弯月面缩回、补液不足或引入空气。循环所需的供回压差与喷嘴处的弯月面压力是相关但不同的控制量。",
          },
          {
            type: "notice",
            label: "DPL30H 边界：",
            text: "600 kPa 高压能力不能被解释为更适合直接给打印头供墨。只有在隔离于打印头敏感压力区域的高阻力输送段，并完成压力调节、泄压与故障工况验证后，才应评估高压泵。",
          },
        ],
      },
      {
        title: "7. DPL30 与 DPL60 可怎样作为候选？",
        blocks: [
          {
            type: "table",
            headers: ["FOREACH 系列", "已确认产品边界", "Inkjet 评估方式"],
            rows: [
              [
                "DPL30",
                "300 mL/min 级空载流量；100 kPa 额定压力；内径 3.2 mm 软管",
                "作为较低工作流量的供墨、回墨或外部循环候选，读取曲线并装机验证",
              ],
              [
                "DPL60",
                "600 mL/min 级空载流量；100 kPa 额定压力；内径 3.2 mm 软管",
                "作为更高目标流量或更大阻力余量的候选，验证过滤器与墨水黏度影响",
              ],
            ],
          },
          {
            type: "links",
            items: [
              { href: DPL30, label: "DPL30 产品页" },
              { href: DPL60, label: "DPL60 产品页" },
            ],
          },
        ],
      },
      {
        title: "8. 介质兼容性必须单独验证",
        blocks: [
          {
            type: "paragraph",
            text: "水性、溶剂型、UV 固化、颜料型墨水在溶剂、单体、分散剂、颗粒、黏度和温度上差异很大。材料名称相同也不能替代浓度、温度、浸泡时间、动态循环、启停和析出测试。",
          },
          {
            type: "notice",
            label: "明确答案：",
            text: "DPL30 或 DPL60 不会因为流量等级合适就自动兼容白墨、UV 墨水或溶剂墨水。Specific ink compatibility requires validation.",
          },
        ],
      },
      {
        title: "9. Inkjet Pump 的系统级选型清单",
        blocks: [
          {
            type: "list",
            ordered: true,
            items: [
              "确认 DOD 或 CIJ、打印头是否支持流通，以及打印头允许的供压、回压和弯月面窗口。",
              "画出主墨箱、副墨箱、阻尼器、脱气、过滤器、阀、供路与回路。",
              "分别定义打印、待机、启动、清洗、排气和停机后的目标工作流量。",
              "用实际墨水温度与黏度估算阻力，再读取正式泵曲线筛选候选。",
              "验证脉动、气泡、过滤器加载、死区、液位变化和压力传感器故障工况。",
              "完成接液材料浸泡与长期动态循环测试，再确认寿命和维护周期。",
            ],
          },
          {
            type: "links",
            items: [
              {
                href: WIRING_ARTICLE,
                label: "2 线与 5 线无刷隔膜泵控制接口指南",
                prefix: "控制集成可继续查看 ",
                suffix: "。",
              },
            ],
          },
        ],
      },
    ],
    faqTitle: "Ink Circulation、Supply 与 Return Pump 常见问题",
    faqItems: [
      {
        question: "What is an ink circulation pump?",
        answer:
          "它是维持墨水在储液端、管路、过滤器和/或流通式打印头之间循环的功能名称，不限定某一种机械泵或安装位置。",
      },
      {
        question: "What is an ink return pump?",
        answer:
          "它把未喷出的墨水从回路下游送回副墨箱或储墨箱；是否需要独立回墨泵取决于供回压差、液位、真空和打印头架构。",
      },
      {
        question: "Ink supply pump 和 circulation pump 是同一台泵吗？",
        answer:
          "可能是，也可能不是。一台供墨泵可以同时形成循环；双泵系统则可能分别控制供路与回路。必须按真实液路判断。",
      },
      {
        question: "所有 Inkjet 系统都需要持续循环吗？",
        answer:
          "不需要。循环方式取决于墨水、打印头是否支持流通、待机策略和整机维护架构；有些系统只对白墨或特定工况间歇循环。",
      },
      {
        question: "为什么打印头前不能直接提高 Pump Pressure？",
        answer:
          "打印头喷嘴需要稳定弯月面压力。过高供压可能渗墨，过强负压可能造成补液不足，因此必须按打印头允许窗口闭环控制。",
      },
      {
        question: "DPL30 和 DPL60 的 300/600 mL/min 是实际循环流量吗？",
        answer:
          "不是。它们是空载流量等级；装机流量由泵曲线、墨水黏度、过滤器、管路和供回压差共同决定。",
      },
      {
        question: "DPL30 自动兼容白墨吗？",
        answer:
          "No. DPL30 只能按流量与压力作为候选；白墨的化学相容性、颗粒、沉降、长期循环和停机重启都需要验证。",
      },
      {
        question: "DPL30H 高压更高，是否更适合打印头供墨？",
        answer:
          "不能这样判断。DPL30H 的 600 kPa 定位用于高阻力液路，高压并不等于更适合打印头敏感压力区。",
      },
    ],
    cta: {
      title: "按真实供回路筛选 Inkjet Pump",
      description:
        "请提供墨水类型、黏度/温度、目标工作流量、打印头压力窗口、过滤器、管径管长、泵的位置以及启动与停机策略。",
      contactLabel: "提交 Inkjet 液路工况",
      productsLabel: "查看液体隔膜泵",
      productsHref: LIQUID_CATEGORY,
    },
  },
  en: {
    metadata: {
      title:
        "What Is the Difference Between an Ink Circulation Pump, Ink Supply Pump and Ink Return Pump?",
      seoTitle: "Ink Circulation, Supply & Return Pumps Explained | FOREACH",
      seoDescription:
        "Understand ink supply, return and circulation pump functions, common inkjet architectures, printhead pressure, installed flow and diaphragm pump validation.",
      coverImage: `${IMAGE_BASE}/ink-supply-return-circulation-cover.webp`,
      coverAlt:
        "FOREACH DPL series miniature liquid diaphragm pump shown in a product video",
    },
    deck:
      "Ink supply pump, ink return pump and ink circulation pump are fluidic functions, not three fixed mechanical pump types. A supply pump moves ink toward a sub-tank or printhead, a return pump moves unused ink back toward a reservoir, and a circulation pump maintains flow around a loop. Whether those functions need one, two or several pumps depends on the printhead, reservoirs, gravity or vacuum control, filters and supply-return architecture.",
    leadBlocks: [
      {
        type: "notice",
        label: "Short answer:",
        text: "Do not choose the pump count from the function names. Draw the real Reservoir → Supply → Sub-tank / Damper → Printhead → Return path, then define flow, pressure, air state and material compatibility for each segment.",
      },
      {
        type: "links",
        items: [
          {
            href: LIQUID_CATEGORY,
            label: "miniature liquid diaphragm pump category",
            prefix: "See the ",
            suffix: " for candidates to evaluate.",
          },
        ],
      },
    ],
    sections: [
      {
        title: "1. What do the three pump names mean?",
        blocks: [
          {
            type: "table",
            headers: ["Function name", "Typical task", "Do not assume"],
            rows: [
              [
                "Ink Supply Pump",
                "Moves ink from a main tank to a sub-tank, pressure-control stage or printhead",
                "It does not always pressurize the printhead directly",
              ],
              [
                "Ink Return Pump",
                "Moves non-jetted ink from the downstream path back to a sub-tank or main reservoir",
                "Every system does not require a separate return pump",
              ],
              [
                "Ink Circulation Pump",
                "Maintains continuous or intermittent flow through a tank, filter, tubing and/or printhead",
                "It is not one fixed pump technology or location",
              ],
            ],
          },
          {
            type: "paragraph",
            text: "One pump can provide both supply and circulation. Two pumps can control supply and return independently. Other systems use sub-tank level, gravity, pneumatic vacuum, valves and dampers to establish the operating point. The names describe system tasks; they do not define a mechanical architecture.",
          },
        ],
      },
      {
        title: "2. Do supply and return always require separate pumps?",
        blocks: [
          {
            type: "paragraph",
            text: "No. A two-pump architecture can use relative supply and return speeds to establish circulation differential pressure. A traditional architecture may use supply and return header tanks while liquid level and pneumatic vacuum maintain the printhead meniscus. Some non-flow-through printheads need replenishment and maintenance but do not continuously pass ink through the head.",
          },
          {
            type: "notice",
            label: "Architecture boundary:",
            text: "The schematic explains functions. It is not a universal layout for every DOD, CIJ, scanning or single-pass printer.",
          },
        ],
      },
      {
        title: "3. Why do some inkjet systems circulate ink?",
        blocks: [
          {
            type: "list",
            items: [
              "Keep settling-prone pigments moving through effective flow regions and reduce local concentration gradients.",
              "In flow-through heads, bring flow close to the nozzles to reduce risks from drying, precipitation or stagnation.",
              "Work with degassing, filtration and temperature control to make ink condition more consistent at the printhead.",
              "Help remove air from the circulation path during priming, replenishment or maintenance.",
            ],
          },
          {
            type: "paragraph",
            text: "Continuous circulation is not required in every inkjet system. Dye inks, non-flow-through heads, short paths or cartridge/sub-tank replenishment systems may use intermittent circulation, white-only circulation or a different maintenance architecture. Follow the ink and printhead requirements.",
          },
          {
            type: "links",
            items: [
              {
                href: WHITE_INK_ARTICLE,
                label: "white ink circulation, pigment settling and dead-zone selection guide",
                prefix: "For white ink, read the ",
                suffix: ".",
              },
            ],
          },
        ],
      },
      {
        title: "4. Why are miniature diaphragm pumps used in inkjet fluidics?",
        blocks: [
          {
            type: "paragraph",
            text: "In space-constrained OEM fluidics, a miniature liquid diaphragm pump can provide compact, self-priming liquid transfer and adjustable output through motor or system control. It can be evaluated for bulk replenishment, low-pressure supply, return or external circulation.",
          },
          {
            type: "notice",
            label: "Model-specific claims:",
            text: "Low pulsation, dry-running capability, abrasion resistance, solvent resistance and suitability for long-term white ink circulation must be proven for the exact model and test conditions. Current FOREACH public data does not automatically prove that DPL30 or DPL60 fits a particular ink.",
          },
        ],
      },
      {
        title: "5. Why is pump free flow not enough?",
        blocks: [
          {
            type: "paragraph",
            text: "Free flow is a low-resistance test boundary, not the installed operating point. Ink viscosity, filter pressure drop, degassing modules, tubing ID and length, fittings, valves, printhead passages and elevation combine into system resistance. Installed flow is set by the intersection of the pump and system curves.",
          },
          {
            type: "formula",
            expression: "Installed operating point = Pump curve ∩ System curve",
            note: "Measure it with the target ink and the complete fluid path.",
          },
          {
            type: "links",
            items: [
              {
                href: FLOW_CURVE_ARTICLE,
                label: "diaphragm pump flow-pressure curve guide",
              },
              {
                href: FLOW_SELECTION_ARTICLE,
                label: "300 vs 600 mL/min ink pump selection guide",
              },
            ],
          },
        ],
      },
      {
        title: "6. Why is more pump pressure not better near the printhead?",
        blocks: [
          {
            type: "paragraph",
            text: "DOD printheads normally require a controlled meniscus condition. Excessive positive pressure can cause weeping or dripping, while excessive vacuum can retract the meniscus, restrict refill or ingest air. Circulation differential pressure and nozzle meniscus pressure are related but distinct control variables.",
          },
          {
            type: "notice",
            label: "DPL30H boundary:",
            text: "A 600 kPa high-pressure capability does not make a pump more suitable for direct printhead supply. Evaluate a high-pressure pump only in a high-resistance transfer stage isolated from the sensitive printhead pressure zone, with regulation, relief and fault testing.",
          },
        ],
      },
      {
        title: "7. How can DPL30 and DPL60 be screened as candidates?",
        blocks: [
          {
            type: "table",
            headers: ["FOREACH series", "Verified product boundary", "Inkjet evaluation"],
            rows: [
              [
                "DPL30",
                "300 mL/min-class no-load flow; 100 kPa rated pressure; tubing ID 3.2 mm",
                "Candidate for lower-flow supply, return or external circulation; read the curve and validate installed performance",
              ],
              [
                "DPL60",
                "600 mL/min-class no-load flow; 100 kPa rated pressure; tubing ID 3.2 mm",
                "Candidate for higher target flow or resistance margin; verify filter and viscosity effects",
              ],
            ],
          },
          {
            type: "links",
            items: [
              { href: DPL30, label: "DPL30 product page" },
              { href: DPL60, label: "DPL60 product page" },
            ],
          },
        ],
      },
      {
        title: "8. Specific ink compatibility requires separate validation",
        blocks: [
          {
            type: "paragraph",
            text: "Aqueous, solvent, UV-curable and pigmented inks differ in solvents, monomers, dispersants, particles, viscosity and temperature. Material names alone cannot replace concentration, temperature, soak time, dynamic circulation, start-stop and precipitation tests.",
          },
          {
            type: "notice",
            label: "Direct answer:",
            text: "DPL30 or DPL60 is not automatically compatible with white, UV or solvent ink because its flow class looks suitable. Specific ink compatibility requires validation.",
          },
        ],
      },
      {
        title: "9. System-level inkjet pump selection checklist",
        blocks: [
          {
            type: "list",
            ordered: true,
            items: [
              "Confirm DOD or CIJ, flow-through capability, and the printhead supply, return and meniscus pressure limits.",
              "Map the main tank, sub-tank, damper, degasser, filter, valves, supply line and return line.",
              "Define working flow for printing, standby, priming, cleaning, air removal and post-idle restart.",
              "Estimate resistance at actual ink viscosity and temperature, then screen the formal pump curve.",
              "Validate pulsation, bubbles, filter loading, dead zones, liquid-level change and pressure-sensor fault cases.",
              "Complete wetted-material soak and long-term dynamic circulation tests before confirming life and maintenance intervals.",
            ],
          },
          {
            type: "links",
            items: [
              {
                href: WIRING_ARTICLE,
                label: "2-wire vs 5-wire brushless diaphragm pump control guide",
                prefix: "For control integration, see the ",
                suffix: ".",
              },
            ],
          },
        ],
      },
    ],
    faqTitle: "Ink circulation, supply and return pump FAQ",
    faqItems: [
      {
        question: "What is an ink circulation pump?",
        answer:
          "It is a functional name for a pump that maintains ink flow through a reservoir, tubing, filter and/or flow-through printhead. It does not define one mechanical pump type or location.",
      },
      {
        question: "What is an ink return pump?",
        answer:
          "It moves non-jetted ink from the downstream path back to a sub-tank or reservoir. A separate return pump is used only when the architecture needs it.",
      },
      {
        question: "Are the ink supply pump and circulation pump the same pump?",
        answer:
          "They can be. One supply pump may create circulation, while a dual-pump system may control supply and return separately. Decide from the actual circuit.",
      },
      {
        question: "Does every inkjet system need continuous circulation?",
        answer:
          "No. The need depends on ink formulation, flow-through printhead capability, standby strategy and maintenance architecture. Some systems circulate only white ink or only at intervals.",
      },
      {
        question: "Why not simply increase pump pressure before the printhead?",
        answer:
          "Printhead nozzles require a stable meniscus. Too much supply pressure may cause weeping, while excessive vacuum may restrict refill or ingest air.",
      },
      {
        question: "Are DPL30 and DPL60 ratings the installed circulation flow?",
        answer:
          "No. The 300 and 600 mL/min values are no-load flow classes. Installed flow depends on the pump curve, viscosity, filter, tubing and supply-return pressure difference.",
      },
      {
        question: "Is DPL30 automatically compatible with white ink?",
        answer:
          "No. DPL30 can only be screened by flow and pressure first. Chemical compatibility, particles, settling, long-term circulation and restart after idle time require validation.",
      },
      {
        question: "Does DPL30H suit printhead supply better because it has higher pressure?",
        answer:
          "That cannot be assumed. DPL30H is positioned for high-resistance fluid paths; high pressure is not inherently suitable for a pressure-sensitive printhead zone.",
      },
    ],
    cta: {
      title: "Screen an inkjet pump from the real supply-return circuit",
      description:
        "Share ink type, viscosity and temperature, target working flow, printhead pressure window, filter, tubing, pump location, and priming and shutdown strategy.",
      contactLabel: "Submit inkjet fluidic conditions",
      productsLabel: "View liquid diaphragm pumps",
      productsHref: LIQUID_CATEGORY,
    },
  },
} satisfies Record<"zh-CN" | "en", DiaphragmPumpEngineeringArticleCopy>;
