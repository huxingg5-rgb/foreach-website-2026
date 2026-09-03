import type { DiaphragmPumpEngineeringArticleCopy } from "./diaphragm-pump-engineering-article.types";

const LIQUID_CATEGORY =
  "/products/pumps/miniature-diaphragm-pumps/liquid-diaphragm-pumps/";
const DPL30 =
  "/products/pumps/miniature-diaphragm-pumps/dpl30-liquid-diaphragm-pump/";
const DPL60 =
  "/products/pumps/miniature-diaphragm-pumps/dpl60-liquid-diaphragm-pump/";
const CLUSTER_OVERVIEW =
  "/resources/technical-articles/ink-circulation-supply-return-pump-diaphragm-pump/";
const FLOW_SELECTION_ARTICLE =
  "/resources/technical-articles/300-vs-600-ml-min-ink-circulation-return-pump-selection/";
const MATERIAL_ARTICLE =
  "/resources/technical-articles/300-ml-min-micro-liquid-diaphragm-pump-epdm-ptfe-ffkm/";
const IMAGE_BASE =
  "/images/resources/technical-articles/white-ink-circulation-pump";

export const whiteInkCirculationPumpCopies = {
  "zh-CN": {
    metadata: {
      title:
        "为什么白墨循环比普通墨水更难？White Ink Circulation Pump 应该怎么选？",
      seoTitle: "White Ink Circulation Pump 选型与白墨沉降｜FOREACH",
      seoDescription:
        "解释 TiO₂ 白色颜料沉降、循环路径与速度、死区、过滤器、黏度、压力和停机重启，并谨慎评估 DPL30 / DPL60 候选。",
      coverImage: `${IMAGE_BASE}/white-ink-circulation-dead-zone-cover.webp`,
      coverAlt:
        "白墨循环回路，包含储墨罐、隔膜泵、过滤器和低位死区支路",
    },
    deck:
      "白墨通常依靠高折射率、高比重的白色颜料获得遮盖力；TiO₂ 是常见选择，但其颗粒与载液存在密度差，分散、团聚和长期静置都会影响沉降。循环的目标不是单纯追求更大的泵流量，而是让储液端、管路、过滤器和打印头附近形成可控且覆盖死区的流动，同时保持打印头压力、墨水状态和材料兼容性。",
    leadBlocks: [
      {
        type: "notice",
        label: "先给结论：",
        text: "White Ink Circulation Pump 必须与墨水配方、打印头流通结构、循环路径、过滤器和停机策略一起选。DPL30 / DPL60 只能作为 flow-class candidates；Specific ink compatibility requires validation.",
      },
      {
        type: "links",
        items: [
          {
            href: CLUSTER_OVERVIEW,
            label: "Ink Supply、Return 与 Circulation Pump 功能架构",
            prefix: "先确认泵的任务：",
            suffix: "。",
          },
        ],
      },
    ],
    sections: [
      {
        title: "1. 为什么白墨比普通墨水更容易出现沉降问题？",
        blocks: [
          {
            type: "paragraph",
            text: "白墨需要在深色或透明基材上形成遮盖力，常使用 TiO₂ 等无机白色颜料。TiO₂ 颗粒密度较高；当颗粒与载液存在明显密度差时，重力沉降趋势增强。颗粒尺寸、团聚、分散剂、固含量、载液黏度、温度和静置时间都会改变实际稳定性。",
          },
          {
            type: "notice",
            label: "不是所有白墨相同：",
            text: "不同水性、溶剂型或 UV 白墨的颜料、粒径分布、分散体系和流变特性不同。不能用“白墨一定高黏”或一个固定沉降速度概括所有配方。",
          },
        ],
      },
      {
        title: "2. Stokes settling concept 能解释什么？",
        blocks: [
          {
            type: "formula",
            expression: "Vₛ ∝ (ρp − ρf)d² / μ",
            note: "趋势上，密度差或颗粒/团聚体尺寸增大使沉降更快，提高连续相黏度可减慢沉降。",
          },
          {
            type: "paragraph",
            text: "该关系针对理想化颗粒和稀悬浮条件。真实高浓度白墨可能存在粒径分布、颗粒相互作用、絮凝、触变、非牛顿流动和受阻沉降，因此 Stokes 概念只能帮助解释趋势，不能直接计算 White Ink Circulation Flow，也不能替代墨水供应商数据和循环试验。",
          },
        ],
      },
      {
        title: "3. White Ink Circulation 的目的是什么？",
        blocks: [
          {
            type: "list",
            items: [
              "降低储墨箱、管路和打印头流道中的局部浓度分层。",
              "在支持流通的打印头中，让易沉降或快干介质持续经过喷嘴附近。",
              "配合搅拌、温控、脱气和过滤，使长期运行时的墨水状态更一致。",
              "改善停机后的重新均匀化和启动恢复，但不能保证所有硬沉积都可被重新分散。",
            ],
          },
          {
            type: "paragraph",
            text: "循环能减轻沉降风险，却不能修复不稳定的配方、错误过滤、长期形成的硬沉积或完全不流动的死区。储墨搅拌与外部管路循环也不是同一个任务，可能需要不同执行元件。",
          },
        ],
      },
      {
        title: "4. 为什么 Dead Zone 比单一 Pump Flow 更重要？",
        blocks: [
          {
            type: "paragraph",
            text: "循环主干达到目标流量时，支路末端、阀腔、接头台阶、储墨箱角落、低点、过大容积和旁路仍可能接近静止。设计时应缩短盲支、减少滞留体积、避免沉积低点，并确认循环是否真正经过需要保护的打印头区域。",
          },
        ],
      },
      {
        title: "5. 为什么不能盲目提高 White Ink Flow？",
        blocks: [
          {
            type: "paragraph",
            text: "更高流量可增强部分位置的更新，却同时提高过滤器和细管压降。供回控制不充分时，压力波动可能传到打印头弯月面；过高速度还可能加剧脉动、起泡、气体析出、温升或颗粒/接液件磨损。对 UV 墨水还应按供应商要求控制光、温度和材料暴露。",
          },
          {
            type: "notice",
            label: "正确目标：",
            text: "寻找覆盖关键路径、满足打印头压力窗口且具有过滤器加载余量的最低有效循环工况，而不是最大泵速。",
          },
        ],
      },
      {
        title: "6. Filter、viscosity、pressure 与 pigment 如何联动？",
        blocks: [
          {
            type: "table",
            headers: ["变量", "对白墨循环的影响", "验证方法"],
            rows: [
              ["黏度与温度", "改变管路压降、泵曲线工作点和喷射状态", "在温度上下限测黏度、流量和压力"],
              ["过滤器", "压降随流量、黏度和加载增加；孔径还受打印头要求限制", "新滤芯、典型加载和更换阈值测试"],
              ["颜料/团聚体", "影响沉降、堵塞和磨蚀风险", "粒径/分散状态、沉降与长期循环观察"],
              ["供回压力", "决定循环压差并影响打印头弯月面", "同时测供压、回压、差压和喷头状态"],
              ["管径/路径", "决定流速分布、压降与死区", "透明样路、分段压差和流量平衡验证"],
            ],
          },
        ],
      },
      {
        title: "7. DPL30 / DPL60 能否作为 White Ink Pump？",
        blocks: [
          {
            type: "paragraph",
            text: "可以先按目标流量和 100 kPa 压力等级把 DPL30 或 DPL60列入候选，但不能直接称为 white ink pump。DPL30 为 300 mL/min 级，DPL60 为 600 mL/min 级；两者的数值都是空载流量，不是白墨装机流量。",
          },
          {
            type: "table",
            headers: ["候选", "可用于早期筛选的事实", "仍需确认"],
            rows: [
              ["DPL30", "300 mL/min 级；100 kPa", "工作点、低速稳定、脉动、颗粒和接液材料"],
              ["DPL60", "600 mL/min 级；100 kPa", "工作点、过滤器余量、长期循环和材料"],
              ["DPL30H", "300 mL/min 级；600 kPa 高压定位", "不因高压而默认适合打印头；通常不作为本主题首选"],
            ],
          },
          {
            type: "links",
            items: [
              { href: DPL30, label: "DPL30 产品页" },
              { href: DPL60, label: "DPL60 产品页" },
              { href: FLOW_SELECTION_ARTICLE, label: "300 vs 600 mL/min Ink Pump 流量选型" },
              { href: LIQUID_CATEGORY, label: "微型液体隔膜泵分类" },
            ],
          },
          {
            type: "notice",
            label: "必须回答 No：",
            text: "DPL30 不是自动兼容白墨，DPL60 也不是默认白墨泵。Specific ink compatibility requires validation.",
          },
        ],
      },
      {
        title: "8. 为什么长期循环与停机重启都要测试？",
        blocks: [
          {
            type: "paragraph",
            text: "短时间水测无法覆盖白墨颗粒、溶剂/单体、分散剂和温度的长期作用。动态循环应观察流量、压差、脉动、电流、温升、材料变化、颗粒沉积和过滤器加载；停机测试则要覆盖颜料沉降、低点积聚、阀片粘附和重新均匀化时间。",
          },
          {
            type: "list",
            items: [
              "设定代表真实设备的运行、待机和断电周期。",
              "记录停机前后各取样点的浓度或光学指标，而不只看储墨箱。",
              "验证重启顺序、搅拌/循环时间、排气、过滤器压差和打印头状态。",
              "检查软管、泵头、膜片、阀片、密封和粘接件的尺寸、硬度、膨胀、裂纹或析出。",
            ],
          },
          {
            type: "links",
            items: [
              {
                href: MATERIAL_ARTICLE,
                label: "EPDM、PTFE 与 FFKM 材料验证方法",
                prefix: "材料筛选可参考 ",
                suffix: "。",
              },
            ],
          },
        ],
      },
      {
        title: "9. White Ink Circulation Pump 选型清单",
        blocks: [
          {
            type: "list",
            ordered: true,
            items: [
              "向墨水供应商确认颜料体系、黏度—温度数据、建议过滤和允许剪切/循环条件。",
              "确认打印头是否支持流通、允许压差和弯月面压力窗口。",
              "标出储墨箱搅拌区、主循环、支路、打印头、低点和所有死区。",
              "用泵曲线筛选 DPL30 / DPL60 或其他候选，不把空载流量当工作点。",
              "验证新/加载过滤器、液位变化、气泡、压力故障和不同温度。",
              "完成长期循环、停机沉降、重启恢复与接液材料试验后再定型。",
            ],
          },
        ],
      },
    ],
    faqTitle: "White Ink Circulation Pump 常见问题",
    faqItems: [
      {
        question: "Why is white ink circulated?",
        answer:
          "白墨循环用于减轻高比重颜料在储液、管路和支持流通的打印头中的局部沉降与浓度分层，并配合温控、过滤和排气维持墨水状态。",
      },
      {
        question: "TiO₂ 为什么容易沉降？",
        answer:
          "TiO₂ 颗粒与载液密度差较大；颗粒或团聚体越大，理想趋势中的沉降越快。真实速度还取决于分散、固含量和流变。",
      },
      {
        question: "循环可以完全阻止 White Ink Sedimentation 吗？",
        answer:
          "不能保证。循环可减轻有效流动区的沉降，但不稳定配方、硬沉积和死区仍可能产生问题。",
      },
      {
        question: "White Ink Circulation Flow 越高越好吗？",
        answer:
          "不是。过高流量会增加压降，并可能扰动打印头压力、增加脉动、起泡、温升或磨损；应验证最低有效工况。",
      },
      {
        question: "Dead Zone 是什么？",
        answer:
          "它是循环回路中流速很低或近乎静止的区域，例如盲支、低点、阀腔、储墨箱角落或未被流通的打印头通道。",
      },
      {
        question: "Stokes 公式能直接算出白墨循环流量吗？",
        answer:
          "不能。它只解释理想沉降趋势；高浓度白墨的颗粒相互作用、团聚和非牛顿流变使实际系统复杂得多。",
      },
      {
        question: "DPL30 是否自动兼容白墨？",
        answer:
          "不会。DPL30 只能作为 300 mL/min 级候选；白墨材料兼容、颗粒、过滤、长期循环和重启性能必须验证。",
      },
      {
        question: "停机后只启动循环泵就够了吗？",
        answer:
          "不一定。可能还需储墨搅拌、分阶段低速循环、排气和打印头维护；具体顺序应由墨水与整机试验确定。",
      },
    ],
    cta: {
      title: "用真实白墨验证循环泵与回路",
      description:
        "请提供墨水体系、颜料/粒径信息、黏度—温度数据、打印头压力窗口、循环路径、过滤器和停机周期。",
      contactLabel: "提交白墨循环工况",
      productsLabel: "查看液体隔膜泵",
      productsHref: LIQUID_CATEGORY,
    },
  },
  en: {
    metadata: {
      title:
        "Why Is White Ink Recirculation More Difficult, and How Should a White Ink Circulation Pump Be Selected?",
      seoTitle: "White Ink Circulation Pump & Sedimentation | FOREACH",
      seoDescription:
        "Understand TiO₂ pigment settling, circulation path and rate, dead zones, filters, viscosity, pressure and restart before screening DPL30 or DPL60.",
      coverImage: `${IMAGE_BASE}/white-ink-circulation-dead-zone-cover.webp`,
      coverAlt:
        "White ink circulation loop with reservoir, diaphragm pump, filter and low dead-zone branch",
    },
    deck:
      "White ink normally uses high-refractive-index, high-specific-gravity pigment for opacity. TiO₂ is common, but density difference, dispersion, agglomeration and idle time affect settling. The objective is not simply a larger pump flow. The reservoir, tubing, filter and printhead region need controlled flow that reaches critical dead zones while respecting printhead pressure, ink condition and material compatibility.",
    leadBlocks: [
      {
        type: "notice",
        label: "Short answer:",
        text: "Select a white ink circulation pump together with the ink formulation, flow-through printhead, circulation path, filter and shutdown strategy. DPL30 and DPL60 are only flow-class candidates. Specific ink compatibility requires validation.",
      },
      {
        type: "links",
        items: [
          {
            href: CLUSTER_OVERVIEW,
            label: "ink supply, return and circulation pump architecture",
            prefix: "First define the pump task with the ",
            suffix: ".",
          },
        ],
      },
    ],
    sections: [
      {
        title: "1. Why is settling more difficult with white ink?",
        blocks: [
          {
            type: "paragraph",
            text: "White ink needs opacity on dark or transparent substrates and commonly uses inorganic white pigments such as TiO₂. TiO₂ has high density; a large density difference between pigment and carrier increases gravitational settling tendency. Particle size, agglomeration, dispersant, solids loading, carrier viscosity, temperature and idle time all change real stability.",
          },
          {
            type: "notice",
            label: "Not all white inks are identical:",
            text: "Aqueous, solvent and UV white inks use different pigments, size distributions, dispersion systems and rheology. Do not assume every white ink is high-viscosity or has one fixed settling rate.",
          },
        ],
      },
      {
        title: "2. What does the Stokes settling concept explain?",
        blocks: [
          {
            type: "formula",
            expression: "Vₛ ∝ (ρp − ρf)d² / μ",
            note: "As a trend, larger density difference or particle/agglomerate size increases settling, while higher continuous-phase viscosity reduces it.",
          },
          {
            type: "paragraph",
            text: "This relationship assumes ideal particles and a dilute suspension. Concentrated white ink can have particle-size distributions, interactions, flocculation, thixotropy, non-Newtonian flow and hindered settling. Use Stokes only to explain trends—not to calculate white ink circulation flow or replace ink-supplier data and loop testing.",
          },
        ],
      },
      {
        title: "3. What is white ink circulation intended to do?",
        blocks: [
          {
            type: "list",
            items: [
              "Reduce local pigment concentration gradients in tanks, tubing and printhead passages.",
              "In flow-through heads, keep settling-prone or fast-drying fluids moving close to the nozzles.",
              "Work with agitation, temperature control, degassing and filtration to maintain a more consistent ink state.",
              "Improve re-homogenization and restart after idle time, without assuming every hard deposit can be redispersed.",
            ],
          },
          {
            type: "paragraph",
            text: "Circulation can reduce settling risk but cannot repair an unstable formulation, incorrect filtration, hard long-term deposits or stagnant dead zones. Reservoir agitation and external loop circulation are also different tasks and may need different actuators.",
          },
        ],
      },
      {
        title: "4. Why are dead zones more important than one pump-flow number?",
        blocks: [
          {
            type: "paragraph",
            text: "Even when the main loop reaches target flow, branch ends, valve cavities, fitting steps, reservoir corners, low points, oversized volumes and bypasses can remain nearly stagnant. Shorten blind branches, reduce hold-up volume, avoid collection low points and confirm that flow reaches the printhead region that needs protection.",
          },
        ],
      },
      {
        title: "5. Why not simply increase white ink flow?",
        blocks: [
          {
            type: "paragraph",
            text: "Higher flow can increase renewal in some locations but also raises pressure drop across filters and small tubing. Without adequate supply-return control, pressure disturbances can reach the meniscus. Excessive velocity can also increase pulsation, foaming, gas release, temperature rise or wear of particles and wetted parts. Follow ink-supplier limits for light, temperature and material exposure with UV inks.",
          },
          {
            type: "notice",
            label: "Correct objective:",
            text: "Find the lowest effective circulation condition that covers critical paths, respects the printhead pressure window and retains margin for filter loading—not the maximum pump speed.",
          },
        ],
      },
      {
        title: "6. How do filter, viscosity, pressure and pigment interact?",
        blocks: [
          {
            type: "table",
            headers: ["Variable", "Effect on white ink circulation", "Validation"],
            rows: [
              ["Viscosity and temperature", "Change tubing pressure drop, pump operating point and jetting state", "Measure viscosity, flow and pressure across the temperature range"],
              ["Filter", "Pressure drop rises with flow, viscosity and loading; rating also follows head requirements", "Test clean, typical-load and replacement-threshold states"],
              ["Pigment/agglomerates", "Affect settling, blockage and abrasion risk", "Observe size/dispersion, settling and long-duration circulation"],
              ["Supply-return pressure", "Sets circulation differential and affects the meniscus", "Measure supply, return, differential pressure and head condition together"],
              ["Tubing/path", "Set velocity distribution, pressure drop and dead zones", "Use a transparent test path, sectional pressure and flow-balance checks"],
            ],
          },
        ],
      },
      {
        title: "7. Can DPL30 or DPL60 be used as a white ink pump?",
        blocks: [
          {
            type: "paragraph",
            text: "DPL30 or DPL60 can enter an early candidate list based on target flow and the 100 kPa pressure class, but neither should be called a validated white ink pump. DPL30 is 300 mL/min-class and DPL60 600 mL/min-class; both values are no-load flow, not installed white ink flow.",
          },
          {
            type: "table",
            headers: ["Candidate", "Verified early-screen fact", "Still verify"],
            rows: [
              ["DPL30", "300 mL/min-class; 100 kPa", "Operating point, low-speed stability, pulsation, particles and wetted materials"],
              ["DPL60", "600 mL/min-class; 100 kPa", "Operating point, filter margin, long-duration circulation and materials"],
              ["DPL30H", "300 mL/min-class; 600 kPa high-pressure position", "High pressure does not imply printhead suitability; not a default candidate here"],
            ],
          },
          {
            type: "links",
            items: [
              { href: DPL30, label: "DPL30 product page" },
              { href: DPL60, label: "DPL60 product page" },
              { href: FLOW_SELECTION_ARTICLE, label: "300 vs 600 mL/min ink pump flow selection" },
              { href: LIQUID_CATEGORY, label: "miniature liquid diaphragm pump category" },
            ],
          },
          {
            type: "notice",
            label: "Required No:",
            text: "DPL30 is not automatically compatible with white ink, and DPL60 is not a default white ink pump. Specific ink compatibility requires validation.",
          },
        ],
      },
      {
        title: "8. Why test both long circulation and restart after shutdown?",
        blocks: [
          {
            type: "paragraph",
            text: "A short water test cannot represent long-term exposure to pigment, solvent or monomer, dispersant and temperature. Dynamic testing should track flow, differential pressure, pulsation, current, temperature rise, material change, deposits and filter loading. Idle testing must cover settling, low-point accumulation, valve adhesion and re-homogenization time.",
          },
          {
            type: "list",
            items: [
              "Use operating, standby and power-off cycles representative of the printer.",
              "Compare concentration or optical indicators at multiple sampling points before and after idle time.",
              "Validate restart sequence, agitation/circulation time, air removal, filter differential pressure and head condition.",
              "Inspect tubing, pump head, diaphragm, valves, seals and bonded parts for dimensional, hardness, swelling, cracking or extraction changes.",
            ],
          },
          {
            type: "links",
            items: [
              {
                href: MATERIAL_ARTICLE,
                label: "EPDM, PTFE and FFKM material validation guide",
                prefix: "For material screening, see the ",
                suffix: ".",
              },
            ],
          },
        ],
      },
      {
        title: "9. White ink circulation pump selection checklist",
        blocks: [
          {
            type: "list",
            ordered: true,
            items: [
              "Ask the ink supplier for pigment system, viscosity-temperature data, filtration and permitted shear/circulation conditions.",
              "Confirm printhead flow-through capability, allowed differential pressure and meniscus window.",
              "Mark reservoir agitation, the main loop, branches, printhead, low points and all dead zones.",
              "Screen DPL30, DPL60 or other candidates from pump curves; never use free flow as the operating point.",
              "Validate clean and loaded filters, level change, bubbles, pressure faults and temperature range.",
              "Complete long-duration circulation, idle settling, restart recovery and wetted-material tests before release.",
            ],
          },
        ],
      },
    ],
    faqTitle: "White ink circulation pump FAQ",
    faqItems: [
      {
        question: "Why is white ink circulated?",
        answer:
          "Circulation helps reduce local settling and concentration gradients of high-specific-gravity pigment in reservoirs, tubing and flow-through printheads, while supporting temperature control, filtration and air removal.",
      },
      {
        question: "Why does TiO₂ tend to settle?",
        answer:
          "TiO₂ particles have a substantial density difference from the carrier. Larger particles or agglomerates settle faster in the ideal trend, while dispersion, solids loading and rheology change real behavior.",
      },
      {
        question: "Can circulation completely stop white ink sedimentation?",
        answer:
          "It cannot be guaranteed. Circulation can reduce settling in effective flow regions, but unstable formulation, hard deposits and dead zones can still cause problems.",
      },
      {
        question: "Is a higher white ink circulation flow always better?",
        answer:
          "No. Higher flow raises pressure drop and can disturb the printhead, pulsation, foaming, temperature or wear. Validate the lowest effective condition.",
      },
      {
        question: "What is a dead zone in a white ink loop?",
        answer:
          "It is a low-flow or stagnant region such as a blind branch, low point, valve cavity, reservoir corner or printhead passage not reached by recirculation.",
      },
      {
        question: "Can Stokes’ law directly set white ink circulation flow?",
        answer:
          "No. It explains an ideal settling trend. Concentrated white ink can have interactions, agglomeration and non-Newtonian rheology that require testing.",
      },
      {
        question: "Is DPL30 automatically compatible with white ink?",
        answer:
          "No. DPL30 is only a 300 mL/min-class candidate. Material compatibility, particles, filtration, long-duration circulation and restart performance require validation.",
      },
      {
        question: "Is restarting the circulation pump enough after shutdown?",
        answer:
          "Not always. Reservoir agitation, staged low-speed circulation, air removal and printhead maintenance may also be required. Determine the sequence through ink and system testing.",
      },
    ],
    cta: {
      title: "Validate the pump and loop with the real white ink",
      description:
        "Share ink chemistry, pigment and particle information, viscosity-temperature data, printhead pressure window, circulation path, filter and idle cycle.",
      contactLabel: "Submit white ink circulation conditions",
      productsLabel: "View liquid diaphragm pumps",
      productsHref: LIQUID_CATEGORY,
    },
  },
} satisfies Record<"zh-CN" | "en", DiaphragmPumpEngineeringArticleCopy>;
