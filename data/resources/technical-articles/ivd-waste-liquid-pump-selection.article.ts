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
const DPGL800 =
  "/products/pumps/miniature-diaphragm-pumps/dpgl800-gas-liquid-diaphragm-pump/";
const IVD_APPLICATION = "/applications/ivd/";
const CLEANING_ARTICLE =
  "/resources/technical-articles/ivd-cleaning-wash-rinse-pump-diaphragm-pump/";
const DIRECT_VS_VACUUM_ARTICLE =
  "/resources/technical-articles/ivd-waste-aspiration-liquid-pump-vs-vacuum-pump/";
const DPGL800_ARTICLE =
  "/resources/technical-articles/dpgl800-gas-liquid-diaphragm-pump-selection-guide/";
const IMAGE_BASE =
  "/images/resources/technical-articles/ivd-waste-liquid-pump-selection";

export const ivdWasteLiquidPumpSelectionCopies = {
  "zh-CN": {
    metadata: {
      title: "IVD 废液泵怎么选？液体隔膜泵还是气液混合隔膜泵？",
      seoTitle:
        "IVD 废液泵选型：液体隔膜泵还是气液混合隔膜泵？｜FOREACH",
      seoDescription:
        "按空气是否进入废液管路、真空度、系统容积、排空时间、管路阻力和介质兼容性，判断 IVD 废液抽吸应选液体隔膜泵还是气液混合隔膜泵。",
      coverImage: `${IMAGE_BASE}/ivd-waste-aspiration-pump-selection-cover.webp`,
      coverAlt: "IVD 洗针位经气液混合隔膜泵连接至密闭废液瓶的废液抽吸路径",
    },
    deck:
      "IVD 废液泵不能只按 mL/min 选。若废液管路保持满液并连续输送，可先评估液体隔膜泵；若抽吸针会在液面变化时吸入空气，介质在液体与空气之间反复切换，应优先评估气液混合隔膜泵，并同时验证真空度、系统容积和排空时间。",
    leadBlocks: [
      {
        type: "paragraph",
        text: "典型废液路径是 Wash Well → Aspiration Needle → Waste Tube → Waste Pump。一个清洗周期内，泵入口可能经历 Liquid → Air → Liquid → Air。这里最先要问的不是“需要多少 mL/min”，而是“空气会不会进入泵”。",
      },
      {
        type: "notice",
        label: "30 秒答案：",
        text: "连续、稳定、基本不吸气的废液转移，按液体流量、压力与材料评估液体隔膜泵；会吸空、需要抽净管路或建立负压的废液抽吸，按气液状态、目标真空、系统容积、排空时间与阻力评估气液混合隔膜泵。两类额定流量不能直接比较。",
      },
      {
        type: "links",
        items: [
          {
            href: IVD_APPLICATION,
            label: "IVD 诊断应用与液路任务",
            prefix: "先把泵放回完整的 ",
            suffix: " 中判断。",
          },
        ],
      },
    ],
    sections: [
      {
        title: "1. Waste Liquid Pump、Waste Aspiration Pump 和 Vacuum Aspiration Pump 是什么？",
        blocks: [
          {
            type: "paragraph",
            text: "Waste liquid pump、waste pump、waste aspiration pump、vacuum aspiration pump 和 drainage pump 多数是功能名称，不代表固定的泵结构。工程选型仍要确认是连续还是间歇排液、是否吸入空气、是否需要抽空和真空、系统容积与允许排空时间，以及全部接液材料的兼容性。",
          },
          {
            type: "table",
            headers: ["名称", "常见含义", "不能直接推出"],
            rows: [
              ["Waste liquid pump / drainage pump", "废液转移或排放功能", "一定是纯液体工况"],
              ["Waste aspiration pump", "从反应位、洗针位或管路抽走废液", "一定是液泵或一定是真空泵"],
              ["Vacuum aspiration pump", "利用负压完成抽吸或排空", "最大真空就是实际抽吸速度"],
            ],
          },
        ],
      },
      {
        title: "2. Cleaning Supply 与 Waste Aspiration 为什么不能共用一套选型逻辑？",
        blocks: [
          {
            type: "paragraph",
            text: "清洗供液常见路径是清洗液瓶 → 液体泵 → 阀 → 清洗针，重点是液体工作流量、压力、自吸与材料。废液端则从洗针位或反应位经抽吸针和废液管路排出，重点是空气是否进入、所需真空、抽空时间、系统容积与阻力。",
          },
          {
            type: "links",
            items: [
              {
                href: CLEANING_ARTICLE,
                label: "IVD Cleaning、Wash 与 Rinse Pump 技术指南",
                prefix: "清洗供液侧的术语、流量和压力逻辑请查看 ",
                suffix: "。",
              },
            ],
          },
        ],
      },
      {
        title: "3. 什么时候标准液体隔膜泵可以处理 IVD 废液？",
        blocks: [
          {
            type: "paragraph",
            text: "当管路基本保持满液、任务是连续或相对稳定地把废液从 A 点送到 B 点、吸气很少，且泵允许接触该介质时，可先评估液体隔膜泵。此时应以真实工作流量、出口背压、自吸、重新吸液和接液材料为主线，而不是以最大真空为主线。",
          },
          {
            type: "paragraph",
            text: "DPL30 是 300 mL/min 级、DPL60 是 600 mL/min 级液体隔膜泵，两者额定压力均为 100 kPa，可分别作为较低和较高连续液体流量需求的候选。它们的空载流量不等于装机工作流量，废液介质仍须实际验证。",
          },
          {
            type: "links",
            items: [
              { href: LIQUID_CATEGORY, label: "微型液体隔膜泵" },
              { href: DPL30, label: "DPL30 300 mL/min 级液体隔膜泵" },
              { href: DPL60, label: "DPL60 600 mL/min 级液体隔膜泵" },
            ],
          },
        ],
      },
      {
        title: "4. 什么时候应优先评估气液混合隔膜泵？",
        blocks: [
          {
            type: "paragraph",
            text: "当抽吸针随液面下降而吸入空气、泵在排完液体后仍要继续运行、管路需要周期性抽空，或入口反复出现液体、气泡、液塞和空气时，应优先评估气液混合隔膜泵。它的核心价值是处理介质状态切换并建立负压，而不是提供“更大的液体流量”。",
          },
          {
            type: "links",
            items: [
              { href: GAS_LIQUID_CATEGORY, label: "微型气液混合隔膜泵" },
            ],
          },
        ],
      },
      {
        title: "5. 为什么 Waste Aspiration Pump 不能只看流量，还要看真空？",
        blocks: [
          {
            type: "paragraph",
            text: "抽吸针、液面高度、细管、阀、接头、过滤器和漏气都会消耗可用压差。泵必须在目标时间内克服这些条件，既把液体带入管路，又在吸空阶段继续排出气体。最大真空只说明极限能力，不说明到达目标真空需要多久。",
          },
          {
            type: "formula",
            expression: "Required Pump Capability = Target Vacuum + Line Resistance + Height Difference + Aspiration Requirement",
            note: "这是选型检查关系，不是可直接相加的通用计算公式；各项需换算到同一压力与时间边界后用整机试验确认。",
          },
        ],
      },
      {
        title: "6. 为什么系统容积会改变排空时间？",
        blocks: [
          {
            type: "paragraph",
            text: "即使两台泵都能达到低于 -90 kPa 的最大负压，也不代表它们对同一系统的建压时间相同。腔体和管路的有效气相容积越大，要移走的气体越多；细长管路、阀和过滤器的阻力、漏气以及目标真空越深，也会延长排空。",
          },
          {
            type: "list",
            items: [
              "记录腔体、集液瓶、管路、阀和过滤器构成的有效系统容积。",
              "给出管径、管长、阀孔、过滤压降、漏率与高度差。",
              "同时写明目标真空和仪器周期允许的排空时间。",
              "用真实介质和最差支路验证压力—时间曲线、残液量与重新吸液。",
            ],
          },
        ],
      },
      {
        title: "7. DPL60 的 600 mL/min 与 DPGL800 的 6 L/min 为什么不能直接比较？",
        blocks: [
          {
            type: "table",
            headers: ["项目", "DPL60", "DPGL800"],
            rows: [
              ["泵型", "液体隔膜泵", "气体/气液混合隔膜泵"],
              ["标称流量", "600 mL/min 级液体流量", "6 L/min 单泵头空载气体流量"],
              ["主要任务", "液体输送、清洗、循环或连续排液", "废液抽吸、真空建立、管路抽空和气液混合处理"],
              ["主要验证", "工作流量、压力、材料、自吸", "目标真空、系统容积、排空时间、阻力和气液状态"],
            ],
          },
          {
            type: "notice",
            label: "明确结论：",
            text: "DPGL800 的 6 L/min 不是液体流量，也不是废液处理能力，不能写成“DPGL800 流量是 DPL60 的 10 倍”。",
          },
        ],
      },
      {
        title: "8. 如何正确理解 DPGL800 的参数？",
        blocks: [
          {
            type: "paragraph",
            text: "DPGL800 是 24 V 无刷气体/气液混合隔膜泵。其单泵头空载气体流量为 6 L/min，最大正压约 +30 kPa，最大负压低于 -90 kPa。是否适合某个 IVD 废液任务，还要结合系统容积、目标真空、允许排空时间、管路阻力、介质状态和材料兼容性验证。",
          },
          {
            type: "links",
            items: [
              { href: DPGL800, label: "DPGL800 气液混合隔膜泵产品页" },
              { href: DPGL800_ARTICLE, label: "DPGL800 参数与系统选型指南" },
            ],
          },
        ],
      },
      {
        title: "9. IVD 废液的材料兼容性应检查哪些部件？",
        blocks: [
          {
            type: "paragraph",
            text: "废液可能混合样本、试剂、清洗液、缓冲液、表面活性剂、生物残留以及酸碱成分。不能仅用“IVD 废液”判断材料，也不存在通用兼容组合。应检查泵头、膜片、阀片、密封、软管、接头、过滤器与集液容器的完整接触路径。",
          },
          {
            type: "list",
            items: [
              "记录各成分、浓度、pH、温度、接触时间和清洗周期。",
              "评估泡沫、颗粒、结晶、蛋白沉积和消毒剂的长期影响。",
              "用真实最差介质做浸泡、启停、吸空、重新吸液、泄漏和寿命试验。",
            ],
          },
        ],
      },
      {
        title: "10. 同一台泵可以同时做 Cleaning Supply 和 Waste Aspiration 吗？",
        blocks: [
          {
            type: "paragraph",
            text: "某些简单系统可以评估同一类泵，但不应作为默认方案。清洗供液强调连续液体的流量、压力和洁净度；废液抽吸强调负压、气液切换、排空和污染风险。两条路径的介质、材料、控制目标和维护边界不同，通常应分别定义需求和验证矩阵。",
          },
          {
            type: "links",
            items: [
              {
                href: CLEANING_ARTICLE,
                label: "Cleaning Pump 与 Waste Pump 的任务边界",
              },
            ],
          },
        ],
      },
      {
        title: "11. Liquid 还是 Gas-Liquid：快速决策树",
        blocks: [
          {
            type: "list",
            ordered: true,
            items: [
              "若管路保持满液且目标是连续液体转移，评估液体隔膜泵。",
              "若入口会出现吸空、液塞、泡沫或气液交替，评估气液混合隔膜泵。",
              "若通过集液瓶间接抽吸，先定义气相容积、漏气、过滤和防溢流，再评估真空源。",
              "无论采用哪种泵，都验证真实介质、工作点、周期时间、残液量、温升、噪声和寿命。",
            ],
          },
          {
            type: "links",
            items: [
              {
                href: DIRECT_VS_VACUUM_ARTICLE,
                label: "IVD 废液直抽与真空间接抽吸架构指南",
                prefix: "若还要决定废液是否经过泵，请继续查看 ",
                suffix: "。",
              },
            ],
          },
        ],
      },
      {
        title: "12. 六个常见选型错误",
        blocks: [
          {
            type: "table",
            headers: ["错误", "正确处理"],
            rows: [
              ["只按液体流量选废液泵", "先确认空气是否进入和介质状态如何变化"],
              ["把 DPGL800 6 L/min 与 DPL60 600 mL/min 做倍数比较", "分别按空载气体流量与液体流量等级理解"],
              ["只看最大真空", "同时验证系统容积、目标真空与排空时间"],
              ["忽略吸空和重新吸液", "测试完整 Liquid → Air → Liquid 周期"],
              ["只检查泵内材料", "覆盖泵、管、阀、接头、过滤和容器"],
              ["把清洗供液与废液抽吸视为同一任务", "分别建立供液和排废的需求与验收条件"],
            ],
          },
        ],
      },
      {
        title: "结论：空气是否进入，通常比名义 mL/min 更先决定泵型",
        blocks: [
          {
            type: "paragraph",
            text: "IVD 废液管路若保持连续液体状态，可从 DPL30、DPL60 等液体隔膜泵候选开始；若会吸入空气、需要抽空或建立真空，则应评估气液混合隔膜泵。DPGL800 是 FOREACH 当前可评估的一款 24 V 无刷气体/气液混合候选，但必须用真实系统容积、目标真空、排空时间、阻力和废液介质完成验证。",
          },
        ],
      },
    ],
    faqTitle: "IVD 废液泵选型常见问题",
    faqItems: [
      { question: "什么是 IVD waste liquid pump？", answer: "它是 IVD 仪器中执行废液转移、排放或抽吸任务的功能名称。泵型可能是液体隔膜泵、气液混合隔膜泵或真空架构中的气泵，应按实际介质路径选择。" },
      { question: "Waste liquid pump 与 waste aspiration pump 有什么区别？", answer: "Waste liquid pump 更强调废液输送；waste aspiration pump 更强调从反应位、洗针位或管路抽走介质。名称可能重叠，关键是废液是否经过泵以及空气是否进入。" },
      { question: "标准液体隔膜泵可以处理 IVD 废液吗？", answer: "可以，但条件是工况以连续液体为主、吸气很少、泵能重新吸液且全部接液材料与真实废液兼容。" },
      { question: "什么时候应使用气液混合隔膜泵进行 IVD 废液抽吸？", answer: "当抽吸针会吸入空气、介质在液体与空气间切换、需要吸空管路或建立负压时，应优先评估气液混合隔膜泵。" },
      { question: "为什么 IVD 废液管路会进入空气？", answer: "抽吸针会随液面下降露出液面，阀切换和间歇排液也会形成气泡、液塞和吸空阶段，所以入口常呈 Liquid → Air → Liquid 的变化。" },
      { question: "为什么废液抽吸泵需要关注真空？", answer: "真空提供克服高度差、管路、阀、过滤和漏气阻力的压差，并影响抽吸启动与残液排空；但最大真空不能单独代表排空速度。" },
      { question: "为什么系统容积会影响排空时间？", answer: "有效气相容积越大，需要移走的气体越多。管路阻力、漏气、过滤压降和目标真空也会改变压力—时间曲线。" },
      { question: "DPGL800 的 6 L/min 是液体流量吗？", answer: "不是。6 L/min 是单泵头空载气体流量，不是液体流量，也不是废液处理能力。" },
      { question: "同一台泵可以同时用于 IVD 清洗供液和废液抽吸吗？", answer: "某些简单系统可以评估，但不应默认可共用。供液和排废的介质状态、压力目标、污染风险与验证要求不同。" },
      { question: "选择 IVD 废液泵前要检查什么？", answer: "至少检查气液状态、目标真空、系统容积、排空时间、管路阻力、液位和高度差、泡沫颗粒、材料兼容性、吸空后重新吸液、控制节拍和寿命。" },
    ],
    cta: {
      title: "需要核对 IVD 废液抽吸的泵型与排空时间？",
      description: "提交单周期废液量、空气进入方式、系统容积、目标真空、允许时间、管路阀件、泡沫颗粒和介质成分，以便缩小液体泵或气液混合泵候选范围。",
      contactLabel: "提交应用需求",
      productsLabel: "查看气液混合隔膜泵",
      productsHref: GAS_LIQUID_CATEGORY,
    },
  },
  en: {
    metadata: {
      title:
        "How to Select an IVD Waste Liquid Pump: Liquid or Gas-Liquid Diaphragm Pump?",
      seoTitle:
        "IVD Waste Liquid Pump: Liquid vs Gas-Liquid | FOREACH",
      seoDescription:
        "Select an IVD waste liquid pump by air ingestion, vacuum, system volume, evacuation time, line resistance, medium state and material compatibility.",
      coverImage: `${IMAGE_BASE}/ivd-waste-aspiration-pump-selection-cover.webp`,
      coverAlt:
        "IVD waste aspiration path from probe wash well through a gas-liquid diaphragm pump to a sealed waste bottle",
    },
    deck:
      "Do not select an IVD waste pump from mL/min alone. If the line remains liquid-filled and transfers waste continuously, evaluate a liquid diaphragm pump. If the aspiration needle ingests air and the inlet alternates between liquid and gas, evaluate a gas-liquid diaphragm pump together with vacuum, system volume and evacuation time.",
    leadBlocks: [
      {
        type: "paragraph",
        text: "A typical path is Wash Well → Aspiration Needle → Waste Tube → Waste Pump. During one cleaning cycle, the inlet can see Liquid → Air → Liquid → Air. The first selection question is therefore often “Will air enter the pump?” rather than “How many mL/min are required?”",
      },
      {
        type: "notice",
        label: "30-second answer:",
        text: "For continuous, stable waste-liquid transfer with negligible air, select a liquid diaphragm pump by operating flow, pressure and materials. For dry aspiration, tubing evacuation, vacuum generation or alternating gas and liquid, select a gas-liquid diaphragm pump by medium state, target vacuum, system volume, evacuation time and resistance. Do not compare their flow ratings directly.",
      },
      {
        type: "links",
        items: [
          {
            href: IVD_APPLICATION,
            label: "IVD diagnostics applications and fluidic duties",
            prefix: "First place the pump in the complete ",
            suffix: ".",
          },
        ],
      },
    ],
    sections: [
      {
        title: "1. What Do Waste Liquid Pump, Waste Aspiration Pump and Vacuum Aspiration Pump Mean?",
        blocks: [
          {
            type: "paragraph",
            text: "Waste liquid pump, waste pump, waste aspiration pump, vacuum aspiration pump and drainage pump are usually functional names, not fixed mechanisms. Selection still requires the liquid duty, air ingestion, evacuation or vacuum task, system volume, permitted evacuation time and compatibility of the complete wetted path.",
          },
          {
            type: "table",
            headers: ["Term", "Typical meaning", "What it does not prove"],
            rows: [
              ["Waste liquid pump / drainage pump", "Waste transfer or drainage function", "A liquid-only inlet at all times"],
              ["Waste aspiration pump", "Removes waste from a well, probe or tube", "A specific liquid-pump or vacuum-pump architecture"],
              ["Vacuum aspiration pump", "Uses negative pressure for aspiration or evacuation", "Maximum vacuum equals installed aspiration speed"],
            ],
          },
        ],
      },
      {
        title: "2. Why Do Cleaning Supply and Waste Aspiration Need Different Selection Logic?",
        blocks: [
          {
            type: "paragraph",
            text: "A cleaning circuit commonly runs Cleaning Bottle → Liquid Pump → Valve → Wash Probe and is governed by liquid operating flow, pressure, priming and materials. The waste side removes fluid from a wash well or reaction position through an aspiration needle and tubing, so air ingestion, vacuum, evacuation time, system volume and resistance become decisive.",
          },
          {
            type: "links",
            items: [
              {
                href: CLEANING_ARTICLE,
                label: "IVD cleaning, wash and rinse pump guide",
                prefix: "For supply-side terminology, flow and pressure, see the ",
                suffix: ".",
              },
            ],
          },
        ],
      },
      {
        title: "3. When Can a Standard Liquid Diaphragm Pump Handle IVD Waste?",
        blocks: [
          {
            type: "paragraph",
            text: "Evaluate a liquid diaphragm pump when the tubing remains substantially liquid-filled, the task is continuous or stable A-to-B waste transfer, little air enters, and the pump can contact the medium. Size from actual operating flow, discharge backpressure, priming, repriming and wetted materials rather than from maximum vacuum.",
          },
          {
            type: "paragraph",
            text: "DPL30 is a 300 mL/min-class and DPL60 a 600 mL/min-class liquid diaphragm pump; both have a 100 kPa rated-pressure class. They are candidates for lower or higher continuous-liquid demand, not guaranteed installed flow values. Validate the real waste medium and circuit.",
          },
          {
            type: "links",
            items: [
              { href: LIQUID_CATEGORY, label: "Miniature Liquid Diaphragm Pump" },
              { href: DPL30, label: "DPL30 300 mL/min-class liquid diaphragm pump" },
              { href: DPL60, label: "DPL60 600 mL/min-class liquid diaphragm pump" },
            ],
          },
        ],
      },
      {
        title: "4. When Should a Gas-Liquid Diaphragm Pump Be Evaluated First?",
        blocks: [
          {
            type: "paragraph",
            text: "Evaluate a gas-liquid diaphragm pump when the aspiration needle ingests air as the level falls, the pump runs after liquid removal, the line must be evacuated, or liquid, bubbles, slugs and air repeatedly alternate at the inlet. Its core value is handling state transitions and creating vacuum, not delivering a larger liquid flow.",
          },
          {
            type: "links",
            items: [
              { href: GAS_LIQUID_CATEGORY, label: "Miniature Gas-Liquid Diaphragm Pump" },
            ],
          },
        ],
      },
      {
        title: "5. Why Does a Waste Aspiration Pump Need Vacuum as Well as Flow?",
        blocks: [
          {
            type: "paragraph",
            text: "Aspiration needles, liquid height, narrow tubing, valves, fittings, filters and leakage consume the available pressure difference. The pump must overcome these conditions in the required time, initiate aspiration and continue removing gas during dry aspiration. Maximum vacuum is an ultimate capability, not an evacuation-time value.",
          },
          {
            type: "formula",
            expression: "Required Pump Capability = Target Vacuum + Line Resistance + Height Difference + Aspiration Requirement",
            note: "This is a selection relationship, not a universal arithmetic formula. Put the inputs on consistent pressure and time boundaries, then verify the complete system.",
          },
        ],
      },
      {
        title: "6. Why Does System Volume Change Evacuation Time?",
        blocks: [
          {
            type: "paragraph",
            text: "Two pumps that can both reach below -90 kPa do not necessarily evacuate the same system in the same time. A larger effective gas volume contains more gas to remove. Narrow lines, valves, filter resistance, leakage and a deeper target vacuum also lengthen the process.",
          },
          {
            type: "list",
            items: [
              "Record the effective volume of chambers, collection bottles, tubing, valves and filters.",
              "State tube bore and length, valve openings, filter drop, leak rate and elevation.",
              "Specify both target vacuum and the evacuation time allowed by the instrument cycle.",
              "Measure the pressure-time curve, residual liquid and repriming in the worst real branch and medium.",
            ],
          },
        ],
      },
      {
        title: "7. Why Are DPL60 600 mL/min and DPGL800 6 L/min Not Directly Comparable?",
        blocks: [
          {
            type: "table",
            headers: ["Item", "DPL60", "DPGL800"],
            rows: [
              ["Pump type", "Liquid diaphragm pump", "Gas/gas-liquid diaphragm pump"],
              ["Published flow", "600 mL/min-class liquid flow", "6 L/min single-head no-load gas flow"],
              ["Primary duty", "Liquid transfer, washing, circulation or continuous drainage", "Waste aspiration, vacuum generation, line evacuation and mixed-phase handling"],
              ["Primary validation", "Operating flow, pressure, materials and priming", "Target vacuum, system volume, evacuation time, resistance and medium state"],
            ],
          },
          {
            type: "notice",
            label: "Direct answer:",
            text: "DPGL800 6 L/min is not liquid flow and not waste-liquid capacity. Do not state that DPGL800 has ten times the flow of DPL60.",
          },
        ],
      },
      {
        title: "8. How Should DPGL800 Specifications Be Interpreted?",
        blocks: [
          {
            type: "paragraph",
            text: "DPGL800 is a 24 V brushless gas/gas-liquid diaphragm pump. Its single-head no-load gas flow is 6 L/min, maximum positive pressure is approximately +30 kPa, and maximum vacuum is below -90 kPa. Suitability for an IVD waste duty still depends on system volume, target vacuum, permitted evacuation time, line resistance, medium state and material compatibility.",
          },
          {
            type: "links",
            items: [
              { href: DPGL800, label: "DPGL800 Gas-Liquid Diaphragm Pump product page" },
              { href: DPGL800_ARTICLE, label: "DPGL800 specification and system-selection guide" },
            ],
          },
        ],
      },
      {
        title: "9. Which Wetted Parts Need a Waste-Media Compatibility Review?",
        blocks: [
          {
            type: "paragraph",
            text: "IVD waste can combine samples, reagents, cleaners, buffers, surfactants, biological residue and acidic or alkaline components. “IVD waste” does not define compatibility, and no material set is universal. Review the pump head, diaphragm, valves, seals, tubing, fittings, filter and collection vessel as one contact path.",
          },
          {
            type: "list",
            items: [
              "Record each component, concentration, pH, temperature, contact time and cleaning cycle.",
              "Assess foam, particles, crystallization, protein deposits and disinfectants over time.",
              "Use the worst real medium for soak, cycling, dry-aspiration, repriming, leakage and life tests.",
            ],
          },
        ],
      },
      {
        title: "10. Can One Pump Serve Both Cleaning Supply and Waste Aspiration?",
        blocks: [
          {
            type: "paragraph",
            text: "One pump class may be evaluated for a simple system, but sharing should not be the default. Cleaning supply emphasizes continuous-liquid flow, pressure and cleanliness; waste aspiration emphasizes vacuum, gas-liquid transitions, evacuation and contamination risk. Define separate requirements and validation matrices for the two paths.",
          },
          {
            type: "links",
            items: [
              { href: CLEANING_ARTICLE, label: "cleaning-pump and waste-pump duty boundaries" },
            ],
          },
        ],
      },
      {
        title: "11. Quick Decision Tree: Liquid or Gas-Liquid?",
        blocks: [
          {
            type: "list",
            ordered: true,
            items: [
              "If the line remains liquid-filled and the duty is continuous transfer, evaluate a liquid diaphragm pump.",
              "If the inlet sees dry aspiration, liquid slugs, foam or alternating phases, evaluate a gas-liquid diaphragm pump.",
              "For indirect aspiration through a collection bottle, define gas volume, leakage, filtration and overflow protection before selecting the vacuum source.",
              "For either pump type, verify the real medium, operating point, cycle time, residual liquid, temperature rise, noise and life.",
            ],
          },
          {
            type: "links",
            items: [
              {
                href: DIRECT_VS_VACUUM_ARTICLE,
                label: "IVD direct liquid pumping versus indirect vacuum aspiration guide",
                prefix: "If you must also decide whether waste passes through the pump, continue with the ",
                suffix: ".",
              },
            ],
          },
        ],
      },
      {
        title: "12. Six Common Selection Mistakes",
        blocks: [
          {
            type: "table",
            headers: ["Mistake", "Correct approach"],
            rows: [
              ["Selecting from liquid flow alone", "First define air ingestion and medium-state transitions"],
              ["Dividing DPGL800 6 L/min by DPL60 600 mL/min", "Treat no-load gas flow and liquid-flow class as separate metrics"],
              ["Checking only maximum vacuum", "Validate system volume, target vacuum and evacuation time together"],
              ["Ignoring dry aspiration and repriming", "Test the complete Liquid → Air → Liquid cycle"],
              ["Reviewing only pump materials", "Cover pump, tubing, valves, fittings, filter and vessel"],
              ["Treating cleaning supply and waste aspiration as one duty", "Create separate requirements and acceptance criteria"],
            ],
          },
        ],
      },
      {
        title: "Conclusion: Air Ingestion Often Determines Pump Type Before Nominal mL/min",
        blocks: [
          {
            type: "paragraph",
            text: "If an IVD waste line remains continuously liquid-filled, start with liquid diaphragm pump candidates such as DPL30 or DPL60. If it ingests air, evacuates tubing or creates vacuum, evaluate a gas-liquid diaphragm pump. DPGL800 is one current FOREACH 24 V brushless gas/gas-liquid candidate, but it must be validated against real system volume, target vacuum, evacuation time, resistance and waste medium.",
          },
        ],
      },
    ],
    faqTitle: "IVD waste-pump selection FAQ",
    faqItems: [
      { question: "What is an IVD waste liquid pump?", answer: "It is a functional name for a pump that transfers, drains or aspirates waste in an IVD instrument. The mechanism may be a liquid diaphragm pump, a gas-liquid diaphragm pump or a gas pump in a vacuum architecture, depending on the medium path." },
      { question: "What is the difference between a waste liquid pump and a waste aspiration pump?", answer: "Waste liquid pump emphasizes liquid transfer, while waste aspiration pump emphasizes removal from a well, probe or tube. The names overlap; the decisive questions are whether waste passes through the pump and whether air enters." },
      { question: "Can a standard liquid diaphragm pump handle IVD waste?", answer: "Yes, when the duty is predominantly continuous liquid transfer, air ingestion is negligible, the pump can reprime, and every wetted material is compatible with the real waste." },
      { question: "When should I use a gas-liquid diaphragm pump for IVD waste aspiration?", answer: "Use it as a candidate when the needle ingests air, the inlet alternates between liquid and gas, the line must be evacuated, or vacuum must be created." },
      { question: "Why does air enter an IVD waste line?", answer: "As the liquid level falls, the aspiration needle becomes exposed. Valve switching and intermittent drainage also create bubbles, liquid slugs and dry-aspiration stages." },
      { question: "Why is vacuum important for a waste aspiration pump?", answer: "Vacuum supplies the pressure difference needed to overcome elevation, tubing, valves, filters and leakage and affects aspiration startup and residual evacuation. Maximum vacuum alone does not define speed." },
      { question: "Why does system volume affect evacuation time?", answer: "A larger effective gas volume contains more gas to remove. Tubing restriction, leakage, filter drop and target vacuum also shape the pressure-time curve." },
      { question: "Is DPGL800 6 L/min a liquid-flow rating?", answer: "No. It is single-head no-load gas flow, not liquid flow and not waste-liquid capacity." },
      { question: "Can the same pump be used for IVD cleaning supply and waste aspiration?", answer: "It may be evaluated in a simple system, but it should not be assumed. The two duties have different medium states, pressure goals, contamination risks and validation requirements." },
      { question: "What should be checked before selecting an IVD waste pump?", answer: "Check gas-liquid state, target vacuum, system volume, evacuation time, line resistance, elevation, foam and particles, material compatibility, repriming after dry aspiration, control timing and life." },
    ],
    cta: {
      title: "Need to check pump type and evacuation time for IVD waste aspiration?",
      description: "Share waste volume per cycle, how air enters, system volume, target vacuum, permitted time, tubing and valves, foam or particles, and medium composition to narrow liquid or gas-liquid pump candidates.",
      contactLabel: "Submit an application request",
      productsLabel: "View gas-liquid diaphragm pumps",
      productsHref: GAS_LIQUID_CATEGORY,
    },
  },
  es: {
    metadata: {
      title: "Cómo seleccionar una bomba de residuos IVD: ¿diafragma para líquido o gas-líquido?",
      seoTitle: "Selección de bomba de residuos IVD: líquido vs gas-líquido | FOREACH",
      seoDescription: "Seleccione una bomba de residuos o aspiración IVD según la entrada de aire, vacío, volumen del sistema, tiempo de evacuación, resistencia y compatibilidad.",
      coverImage: `${IMAGE_BASE}/ivd-waste-aspiration-pump-selection-cover.webp`,
      coverAlt: "Ruta de aspiración de residuos IVD desde el pozo de lavado, a través de una bomba de diafragma gas-líquido, hasta una botella sellada",
    },
    deck: "Una bomba de residuos IVD no se selecciona solo por mL/min. Si la línea permanece llena y transfiere líquido de forma continua, evalúe una bomba de diafragma para líquidos. Si la aguja aspira aire y la entrada alterna entre líquido y gas, evalúe una bomba gas-líquido junto con vacío, volumen y tiempo de evacuación.",
    leadBlocks: [
      { type: "paragraph", text: "Una ruta típica es Wash Well → Aspiration Needle → Waste Tube → Waste Pump. En un ciclo, la entrada puede recibir Liquid → Air → Liquid → Air. Por eso la primera pregunta suele ser «¿entrará aire en la bomba?» y no «¿cuántos mL/min necesito?»." },
      { type: "notice", label: "Respuesta en 30 segundos:", text: "Para transferencia continua y estable de residuos líquidos con poco aire, seleccione por caudal de trabajo, presión y materiales. Para aspiración en seco, evacuación de tubos, generación de vacío o alternancia gas-líquido, seleccione por estado del medio, vacío objetivo, volumen, tiempo y resistencia. No compare directamente ambas cifras de caudal." },
      { type: "links", items: [{ href: IVD_APPLICATION, label: "aplicaciones de diagnóstico IVD y tareas fluídicas", prefix: "Sitúe primero la bomba dentro de las ", suffix: "." }] },
    ],
    sections: [
      { title: "1. ¿Qué significan waste liquid pump, waste aspiration pump y vacuum aspiration pump?", blocks: [
        { type: "paragraph", text: "Waste liquid pump, waste pump, waste aspiration pump, vacuum aspiration pump y drainage pump suelen ser nombres funcionales, no mecanismos fijos. La selección exige definir si la descarga es continua o intermitente, si entra aire, si se necesita evacuación o vacío, el volumen del sistema, el tiempo permitido y toda la compatibilidad del recorrido mojado." },
        { type: "table", headers: ["Término", "Significado habitual", "Lo que no demuestra"], rows: [["Waste liquid pump / drainage pump", "Transferencia o drenaje de residuos", "Entrada siempre de líquido puro"], ["Waste aspiration pump", "Retirada desde un pocillo, aguja o tubo", "Arquitectura concreta de bomba"], ["Vacuum aspiration pump", "Aspiración mediante presión negativa", "Que el vacío máximo sea la velocidad instalada"]] },
      ] },
      { title: "2. ¿Por qué el suministro de lavado y la aspiración de residuos requieren lógicas distintas?", blocks: [
        { type: "paragraph", text: "El suministro sigue normalmente Botella → Bomba de líquido → Válvula → Aguja y se rige por caudal, presión, cebado y materiales. El lado de residuos aspira desde un pocillo o posición de reacción, por lo que la entrada de aire, el vacío, el tiempo de evacuación, el volumen y la resistencia resultan decisivos." },
        { type: "links", items: [{ href: CLEANING_ARTICLE, label: "guía de bombas de limpieza, lavado y enjuague IVD", prefix: "Para la terminología y selección del lado de suministro, consulte la ", suffix: "." }] },
      ] },
      { title: "3. ¿Cuándo puede una bomba de diafragma para líquidos manejar residuos IVD?", blocks: [
        { type: "paragraph", text: "Evalúela cuando el tubo permanece prácticamente lleno, la tarea es una transferencia continua o estable de A a B, entra poco aire y la bomba puede contactar el medio. Dimensione por caudal real, contrapresión, cebado, re-cebado y materiales, no por vacío máximo." },
        { type: "paragraph", text: "DPL30 pertenece a la clase de 300 mL/min y DPL60 a la de 600 mL/min; ambas son bombas de diafragma para líquidos de 100 kPa de presión nominal. Son candidatas para distintas demandas de líquido continuo, no garantías de caudal instalado. Valide el residuo real." },
        { type: "links", items: [{ href: LIQUID_CATEGORY, label: "Bomba Miniatura de Diafragma para Líquidos" }, { href: DPL30, label: "DPL30 de clase 300 mL/min" }, { href: DPL60, label: "DPL60 de clase 600 mL/min" }] },
      ] },
      { title: "4. ¿Cuándo conviene evaluar primero una bomba gas-líquido?", blocks: [
        { type: "paragraph", text: "Evalúela cuando la aguja toma aire al bajar el nivel, la bomba sigue funcionando después de retirar el líquido, el tubo debe evacuarse o la entrada alterna entre líquido, burbujas, tapones y aire. Su valor es manejar cambios de fase y crear vacío, no aportar un caudal líquido mayor." },
        { type: "links", items: [{ href: GAS_LIQUID_CATEGORY, label: "Bomba Miniatura de Diafragma Gas-Líquido" }] },
      ] },
      { title: "5. ¿Por qué una bomba de aspiración necesita vacío además de caudal?", blocks: [
        { type: "paragraph", text: "La aguja, la altura, los tubos estrechos, válvulas, racores, filtros y fugas consumen diferencia de presión. La bomba debe vencerlos dentro del tiempo disponible, iniciar la aspiración y retirar gas durante la fase seca. El vacío máximo es un límite, no un tiempo de evacuación." },
        { type: "formula", expression: "Required Pump Capability = Target Vacuum + Line Resistance + Height Difference + Aspiration Requirement", note: "Es una relación de comprobación, no una fórmula aritmética universal. Exprese los límites de presión y tiempo de forma coherente y valide el sistema completo." },
      ] },
      { title: "6. ¿Por qué el volumen del sistema cambia el tiempo de evacuación?", blocks: [
        { type: "paragraph", text: "Dos bombas capaces de alcanzar menos de -90 kPa no evacúan necesariamente el mismo sistema en el mismo tiempo. Un mayor volumen gaseoso contiene más gas; tubos estrechos, válvulas, filtros, fugas y un vacío objetivo más profundo prolongan el proceso." },
        { type: "list", items: ["Registre el volumen efectivo de cámaras, botella, tubos, válvulas y filtros.", "Indique diámetro y longitud, pasos de válvula, caída del filtro, fugas y altura.", "Especifique el vacío objetivo y el tiempo permitido por el ciclo.", "Mida la curva presión-tiempo, residuo y re-cebado con la rama y el medio más desfavorables."] },
      ] },
      { title: "7. ¿Por qué no se comparan directamente DPL60 600 mL/min y DPGL800 6 L/min?", blocks: [
        { type: "table", headers: ["Elemento", "DPL60", "DPGL800"], rows: [["Tipo", "Bomba para líquidos", "Bomba de gas/gas-líquido"], ["Caudal publicado", "Clase líquida 600 mL/min", "6 L/min de gas sin carga, un cabezal"], ["Tarea", "Transferencia, lavado, circulación o drenaje continuo", "Aspiración, vacío, evacuación y mezcla"], ["Validación", "Caudal, presión, materiales y cebado", "Vacío, volumen, tiempo, resistencia y estado del medio"]] },
        { type: "notice", label: "Respuesta directa:", text: "Los 6 L/min de DPGL800 no son caudal líquido ni capacidad de residuos. No afirme que DPGL800 tiene diez veces el caudal de DPL60." },
      ] },
      { title: "8. ¿Cómo deben interpretarse las especificaciones de DPGL800?", blocks: [
        { type: "paragraph", text: "DPGL800 es una bomba de diafragma sin escobillas de 24 V para gas y mezclas gas-líquido. Ofrece 6 L/min de caudal de gas sin carga por cabezal, presión positiva máxima aproximada de +30 kPa y vacío máximo inferior a -90 kPa. La idoneidad depende además de volumen, vacío objetivo, tiempo, resistencia, medio y materiales." },
        { type: "links", items: [{ href: DPGL800, label: "página de producto DPGL800" }, { href: DPGL800_ARTICLE, label: "guía de especificaciones y selección DPGL800" }] },
      ] },
      { title: "9. ¿Qué piezas mojadas necesitan una revisión de compatibilidad?", blocks: [
        { type: "paragraph", text: "Los residuos IVD pueden combinar muestras, reactivos, limpiadores, tampones, tensioactivos, restos biológicos y componentes ácidos o alcalinos. No existe un material universal. Revise como un solo recorrido el cabezal, diafragma, válvulas, juntas, tubos, racores, filtro y recipiente." },
        { type: "list", items: ["Registre composición, concentración, pH, temperatura, contacto y ciclo.", "Evalúe espuma, partículas, cristalización, proteínas y desinfectantes.", "Pruebe inmersión, ciclos, aspiración seca, re-cebado, fugas y vida con el peor medio real."] },
      ] },
      { title: "10. ¿Una bomba puede servir para suministro de limpieza y aspiración de residuos?", blocks: [
        { type: "paragraph", text: "Puede evaluarse en un sistema sencillo, pero no debe asumirse. El suministro prioriza caudal líquido, presión y limpieza; los residuos priorizan vacío, transiciones de fase, evacuación y contaminación. Defina requisitos y matrices de validación separadas." },
        { type: "links", items: [{ href: CLEANING_ARTICLE, label: "límites entre la bomba de limpieza y la bomba de residuos" }] },
      ] },
      { title: "11. Árbol rápido de decisión: ¿líquido o gas-líquido?", blocks: [
        { type: "list", ordered: true, items: ["Si la línea permanece llena y transfiere líquido, evalúe una bomba para líquidos.", "Si hay aspiración seca, tapones, espuma o fases alternas, evalúe una bomba gas-líquido.", "En aspiración indirecta, defina volumen gaseoso, fugas, filtración y protección antes de elegir la fuente de vacío.", "Valide medio, punto de trabajo, ciclo, residuo, temperatura, ruido y vida."] },
        { type: "links", items: [{ href: DIRECT_VS_VACUUM_ARTICLE, label: "guía de bombeo directo frente a aspiración indirecta por vacío", prefix: "Para decidir además si los residuos atraviesan la bomba, consulte la ", suffix: "." }] },
      ] },
      { title: "12. Seis errores frecuentes de selección", blocks: [
        { type: "table", headers: ["Error", "Enfoque correcto"], rows: [["Elegir solo por caudal líquido", "Definir primero la entrada de aire y los cambios de fase"], ["Dividir 6 L/min entre 600 mL/min", "Separar caudal de gas sin carga y clase líquida"], ["Mirar solo el vacío máximo", "Validar volumen, vacío objetivo y tiempo"], ["Ignorar aspiración seca y re-cebado", "Probar Liquid → Air → Liquid"], ["Revisar solo materiales de la bomba", "Cubrir bomba, tubos, válvulas, racores, filtro y recipiente"], ["Tratar limpieza y residuos como una tarea", "Separar requisitos y aceptación"]] },
      ] },
      { title: "Conclusión: la entrada de aire suele decidir el tipo antes que los mL/min nominales", blocks: [
        { type: "paragraph", text: "Si la línea de residuos permanece llena, empiece por candidatas para líquido como DPL30 o DPL60. Si entra aire, se evacua el tubo o se genera vacío, evalúe una bomba gas-líquido. DPGL800 es una candidata FOREACH actual de 24 V sin escobillas, pero debe validarse con volumen, vacío, tiempo, resistencia y residuos reales." },
      ] },
    ],
    faqTitle: "Preguntas frecuentes sobre bombas de residuos IVD",
    faqItems: [
      { question: "¿Qué es una bomba de residuos líquidos IVD?", answer: "Es el nombre funcional de una bomba que transfiere, drena o aspira residuos en un instrumento IVD. El mecanismo depende del recorrido y del medio." },
      { question: "¿Qué diferencia hay entre waste liquid pump y waste aspiration pump?", answer: "La primera expresión enfatiza transferencia líquida y la segunda retirada por aspiración. Pueden solaparse; determine si los residuos atraviesan la bomba y si entra aire." },
      { question: "¿Puede una bomba de diafragma estándar manejar residuos IVD?", answer: "Sí, si domina la transferencia líquida continua, entra poco aire, la bomba puede re-cebarse y todos los materiales son compatibles." },
      { question: "¿Cuándo usar una bomba gas-líquido para aspirar residuos IVD?", answer: "Cuando la aguja toma aire, la entrada alterna fases, el tubo debe evacuarse o se necesita generar vacío." },
      { question: "¿Por qué entra aire en una línea de residuos IVD?", answer: "La aguja queda expuesta al bajar el nivel; la conmutación de válvulas y la descarga intermitente también crean burbujas y fases secas." },
      { question: "¿Por qué importa el vacío?", answer: "Aporta la diferencia de presión para vencer altura, tubos, válvulas, filtros y fugas, pero el vacío máximo por sí solo no define la velocidad." },
      { question: "¿Por qué el volumen afecta al tiempo de evacuación?", answer: "Un volumen gaseoso mayor contiene más gas que retirar; la restricción, fugas, filtros y vacío objetivo también cambian la curva temporal." },
      { question: "¿Los 6 L/min de DPGL800 son caudal líquido?", answer: "No. Son caudal de gas sin carga de un cabezal, no caudal líquido ni capacidad de residuos." },
      { question: "¿Puede usarse la misma bomba para limpieza y residuos?", answer: "Puede evaluarse, pero no debe asumirse: los estados del medio, objetivos de presión, contaminación y validación son distintos." },
      { question: "¿Qué revisar antes de seleccionar?", answer: "Estado gas-líquido, vacío, volumen, tiempo, resistencia, altura, espuma, partículas, materiales, re-cebado, control y vida." },
    ],
    cta: { title: "¿Necesita revisar el tipo de bomba y el tiempo de evacuación?", description: "Comparta volumen de residuos por ciclo, entrada de aire, volumen del sistema, vacío objetivo, tiempo, tubos, válvulas, espuma, partículas y composición.", contactLabel: "Enviar requisitos", productsLabel: "Ver bombas gas-líquido", productsHref: GAS_LIQUID_CATEGORY },
  },
  fr: {
    metadata: {
      title: "Comment choisir une pompe d’effluents IVD : membrane liquide ou gaz-liquide ?",
      seoTitle: "Pompe d’effluents IVD : liquide ou gaz-liquide | FOREACH",
      seoDescription: "Choisissez une pompe d’effluents ou d’aspiration IVD selon l’entrée d’air, le vide, le volume, le temps d’évacuation, les pertes de charge et la compatibilité.",
      coverImage: `${IMAGE_BASE}/ivd-waste-aspiration-pump-selection-cover.webp`,
      coverAlt: "Circuit d’aspiration des effluents IVD reliant le puits de lavage à un flacon fermé via une pompe à membrane gaz-liquide",
    },
    deck: "Une pompe d’effluents IVD ne se choisit pas uniquement en mL/min. Si la conduite reste remplie et transfère le liquide en continu, évaluez une pompe à membrane pour liquides. Si l’aiguille aspire de l’air et que l’entrée alterne liquide et gaz, évaluez une pompe gaz-liquide avec le vide, le volume et le temps d’évacuation.",
    leadBlocks: [
      { type: "paragraph", text: "Un trajet type est Wash Well → Aspiration Needle → Waste Tube → Waste Pump. Pendant un cycle, l’entrée peut voir Liquid → Air → Liquid → Air. La première question est donc souvent « de l’air entrera-t-il dans la pompe ? » plutôt que « combien de mL/min ? »." },
      { type: "notice", label: "Réponse en 30 secondes :", text: "Pour un transfert continu et stable d’effluent liquide avec très peu d’air, choisissez selon le débit de travail, la pression et les matériaux. Pour l’aspiration à sec, l’évacuation, la création de vide ou l’alternance gaz-liquide, choisissez selon l’état du fluide, le vide cible, le volume, le temps et la résistance. Ne comparez pas directement les débits publiés." },
      { type: "links", items: [{ href: IVD_APPLICATION, label: "applications de diagnostic IVD et tâches fluidiques", prefix: "Replacez d’abord la pompe dans les ", suffix: "." }] },
    ],
    sections: [
      { title: "1. Que signifient waste liquid pump, waste aspiration pump et vacuum aspiration pump ?", blocks: [
        { type: "paragraph", text: "Waste liquid pump, waste pump, waste aspiration pump, vacuum aspiration pump et drainage pump sont généralement des noms de fonction et non des mécanismes fixes. Il faut encore définir fonctionnement continu ou intermittent, entrée d’air, évacuation ou vide, volume du système, temps disponible et compatibilité de tout le chemin mouillé." },
        { type: "table", headers: ["Terme", "Sens habituel", "Ce qu’il ne prouve pas"], rows: [["Waste liquid pump / drainage pump", "Transfert ou vidange des effluents", "Une entrée toujours en liquide pur"], ["Waste aspiration pump", "Retrait depuis un puits, une aiguille ou une conduite", "Une architecture de pompe précise"], ["Vacuum aspiration pump", "Aspiration par pression négative", "Que le vide maximal égale la vitesse réelle"]] },
      ] },
      { title: "2. Pourquoi l’alimentation de lavage et l’aspiration des effluents suivent-elles des logiques différentes ?", blocks: [
        { type: "paragraph", text: "L’alimentation suit généralement Flacon → Pompe à liquide → Vanne → Aiguille et dépend du débit, de la pression, de l’amorçage et des matériaux. Le côté effluents aspire depuis un puits ou une position de réaction : entrée d’air, vide, temps d’évacuation, volume et résistance deviennent déterminants." },
        { type: "links", items: [{ href: CLEANING_ARTICLE, label: "guide des pompes de nettoyage, lavage et rinçage IVD", prefix: "Pour la terminologie et la sélection côté alimentation, consultez le ", suffix: "." }] },
      ] },
      { title: "3. Quand une pompe à membrane pour liquides peut-elle traiter les effluents IVD ?", blocks: [
        { type: "paragraph", text: "Évaluez-la lorsque la conduite reste presque pleine, que la tâche est un transfert continu ou stable de A vers B, que peu d’air entre et que la pompe peut toucher le fluide. Dimensionnez selon le débit réel, la contre-pression, l’amorçage, le réamorçage et les matériaux, non selon le vide maximal." },
        { type: "paragraph", text: "DPL30 appartient à la classe 300 mL/min et DPL60 à la classe 600 mL/min ; ces pompes à liquide ont une pression nominale de 100 kPa. Ce sont des candidates pour différents besoins de liquide continu, pas des débits installés garantis. Validez l’effluent réel." },
        { type: "links", items: [{ href: LIQUID_CATEGORY, label: "Pompe à Membrane Miniature pour Liquides" }, { href: DPL30, label: "DPL30 classe 300 mL/min" }, { href: DPL60, label: "DPL60 classe 600 mL/min" }] },
      ] },
      { title: "4. Quand faut-il d’abord évaluer une pompe à membrane gaz-liquide ?", blocks: [
        { type: "paragraph", text: "Évaluez-la lorsque l’aiguille prend de l’air avec la baisse du niveau, que la pompe continue après retrait du liquide, que la conduite doit être évacuée ou que liquide, bulles, bouchons et air alternent. Sa valeur est de gérer les transitions et de créer le vide, pas de fournir un débit liquide supérieur." },
        { type: "links", items: [{ href: GAS_LIQUID_CATEGORY, label: "Pompe à Membrane Miniature Gaz-Liquide" }] },
      ] },
      { title: "5. Pourquoi une pompe d’aspiration doit-elle fournir du vide en plus du débit ?", blocks: [
        { type: "paragraph", text: "L’aiguille, la hauteur, les tubes étroits, vannes, raccords, filtres et fuites consomment la différence de pression disponible. La pompe doit les vaincre dans le temps requis, amorcer l’aspiration et retirer le gaz pendant la phase sèche. Le vide maximal est une limite, pas un temps d’évacuation." },
        { type: "formula", expression: "Required Pump Capability = Target Vacuum + Line Resistance + Height Difference + Aspiration Requirement", note: "Il s’agit d’une relation de contrôle, pas d’une formule arithmétique universelle. Harmonisez les limites de pression et de temps, puis validez le système complet." },
      ] },
      { title: "6. Pourquoi le volume du système modifie-t-il le temps d’évacuation ?", blocks: [
        { type: "paragraph", text: "Deux pompes capables d’atteindre moins de -90 kPa n’évacuent pas forcément le même système au même rythme. Un volume gazeux supérieur contient plus de gaz ; les conduites étroites, vannes, filtres, fuites et un vide cible plus profond ralentissent aussi le processus." },
        { type: "list", items: ["Relevez le volume effectif des chambres, du flacon, des tubes, vannes et filtres.", "Précisez diamètre et longueur, orifices, perte du filtre, fuite et hauteur.", "Indiquez le vide cible et le temps permis par le cycle.", "Mesurez la courbe pression-temps, le résidu et le réamorçage dans le cas le plus défavorable."] },
      ] },
      { title: "7. Pourquoi DPL60 600 mL/min et DPGL800 6 L/min ne sont-ils pas directement comparables ?", blocks: [
        { type: "table", headers: ["Élément", "DPL60", "DPGL800"], rows: [["Type", "Pompe à liquide", "Pompe gaz/gaz-liquide"], ["Débit publié", "Classe liquide 600 mL/min", "6 L/min de gaz à vide, une tête"], ["Tâche", "Transfert, lavage, circulation ou vidange continue", "Aspiration, vide, évacuation et phases mélangées"], ["Validation", "Débit, pression, matériaux, amorçage", "Vide, volume, temps, résistance et état du fluide"]] },
        { type: "notice", label: "Réponse directe :", text: "Les 6 L/min du DPGL800 ne sont ni un débit liquide ni une capacité d’effluents. N’affirmez pas que son débit est dix fois celui du DPL60." },
      ] },
      { title: "8. Comment interpréter les caractéristiques du DPGL800 ?", blocks: [
        { type: "paragraph", text: "DPGL800 est une pompe à membrane sans balais 24 V pour gaz et mélanges gaz-liquide. Son débit de gaz à vide par tête est de 6 L/min, sa pression positive maximale d’environ +30 kPa et son vide maximal inférieur à -90 kPa. L’adéquation dépend aussi du volume, du vide cible, du temps, de la résistance, du fluide et des matériaux." },
        { type: "links", items: [{ href: DPGL800, label: "page produit DPGL800" }, { href: DPGL800_ARTICLE, label: "guide des caractéristiques et de sélection DPGL800" }] },
      ] },
      { title: "9. Quelles pièces mouillées faut-il vérifier ?", blocks: [
        { type: "paragraph", text: "Les effluents IVD peuvent mélanger échantillons, réactifs, nettoyants, tampons, tensioactifs, résidus biologiques et composants acides ou alcalins. Aucun ensemble de matériaux n’est universel. Vérifiez ensemble tête, membrane, clapets, joints, tubes, raccords, filtre et récipient." },
        { type: "list", items: ["Relevez composition, concentration, pH, température, contact et cycle.", "Évaluez mousse, particules, cristallisation, protéines et désinfectants.", "Testez immersion, cycles, aspiration sèche, réamorçage, fuite et durée de vie avec le pire fluide réel."] },
      ] },
      { title: "10. Une même pompe peut-elle alimenter le lavage et aspirer les effluents ?", blocks: [
        { type: "paragraph", text: "Cela peut être évalué sur un système simple, mais ne doit pas être supposé. L’alimentation privilégie débit liquide, pression et propreté ; les effluents privilégient vide, transitions de phase, évacuation et contamination. Définissez des exigences et validations séparées." },
        { type: "links", items: [{ href: CLEANING_ARTICLE, label: "limites entre pompe de nettoyage et pompe d’effluents" }] },
      ] },
      { title: "11. Arbre de décision rapide : liquide ou gaz-liquide ?", blocks: [
        { type: "list", ordered: true, items: ["Conduite pleine et transfert continu : évaluez une pompe à liquide.", "Aspiration sèche, bouchons, mousse ou phases alternées : évaluez une pompe gaz-liquide.", "Aspiration indirecte : définissez volume gazeux, fuite, filtration et anti-débordement avant la source de vide.", "Validez fluide, point de travail, cycle, résidu, température, bruit et durée de vie."] },
        { type: "links", items: [{ href: DIRECT_VS_VACUUM_ARTICLE, label: "guide du pompage direct et de l’aspiration indirecte par vide", prefix: "Pour décider aussi si les effluents traversent la pompe, consultez le ", suffix: "." }] },
      ] },
      { title: "12. Six erreurs fréquentes de sélection", blocks: [
        { type: "table", headers: ["Erreur", "Bonne approche"], rows: [["Choisir seulement par débit liquide", "Définir d’abord l’entrée d’air et les transitions"], ["Diviser 6 L/min par 600 mL/min", "Séparer débit de gaz à vide et classe liquide"], ["Ne lire que le vide maximal", "Valider volume, vide cible et temps"], ["Ignorer aspiration sèche et réamorçage", "Tester Liquid → Air → Liquid"], ["Vérifier seulement la pompe", "Inclure tubes, vannes, raccords, filtre et récipient"], ["Confondre lavage et effluents", "Séparer exigences et acceptation"]] },
      ] },
      { title: "Conclusion : l’entrée d’air détermine souvent le type avant les mL/min nominaux", blocks: [
        { type: "paragraph", text: "Si la conduite reste pleine, commencez par DPL30 ou DPL60 comme candidates liquides. Si elle aspire de l’air, évacue la conduite ou crée du vide, évaluez une pompe gaz-liquide. DPGL800 est une candidate FOREACH actuelle, 24 V sans balais, à valider avec le volume, le vide, le temps, la résistance et l’effluent réels." },
      ] },
    ],
    faqTitle: "FAQ sur les pompes d’effluents IVD",
    faqItems: [
      { question: "Qu’est-ce qu’une IVD waste liquid pump ?", answer: "C’est le nom fonctionnel d’une pompe qui transfère, vidange ou aspire les effluents d’un instrument IVD. Le mécanisme dépend du trajet et du fluide." },
      { question: "Quelle différence entre waste liquid pump et waste aspiration pump ?", answer: "La première expression insiste sur le transfert liquide et la seconde sur le retrait par aspiration. Elles peuvent se recouper ; vérifiez le passage des effluents et l’entrée d’air." },
      { question: "Une pompe à membrane liquide standard peut-elle traiter des effluents IVD ?", answer: "Oui, si le transfert est surtout liquide et continu, que peu d’air entre, que la pompe se réamorce et que tous les matériaux sont compatibles." },
      { question: "Quand utiliser une pompe gaz-liquide pour l’aspiration IVD ?", answer: "Lorsque l’aiguille prend de l’air, que l’entrée alterne les phases, que la conduite doit être évacuée ou qu’un vide doit être créé." },
      { question: "Pourquoi de l’air entre-t-il dans une conduite d’effluents IVD ?", answer: "L’aiguille est exposée quand le niveau baisse ; les vannes et la vidange intermittente créent aussi bulles, bouchons et phases sèches." },
      { question: "Pourquoi le vide est-il important ?", answer: "Il fournit la différence de pression contre la hauteur, les tubes, vannes, filtres et fuites, mais le vide maximal seul ne définit pas la vitesse." },
      { question: "Pourquoi le volume influence-t-il le temps d’évacuation ?", answer: "Un plus grand volume gazeux contient plus de gaz à retirer ; restriction, fuites, filtres et vide cible modifient aussi la courbe temporelle." },
      { question: "Les 6 L/min du DPGL800 sont-ils un débit liquide ?", answer: "Non. C’est le débit de gaz à vide d’une tête, pas un débit liquide ni une capacité d’effluents." },
      { question: "La même pompe peut-elle servir au lavage et aux effluents ?", answer: "Elle peut être évaluée, mais cela ne doit pas être supposé : état du fluide, pression, contamination et validation diffèrent." },
      { question: "Que vérifier avant la sélection ?", answer: "État gaz-liquide, vide, volume, temps, résistance, hauteur, mousse, particules, matériaux, réamorçage, commande et durée de vie." },
    ],
    cta: { title: "Besoin de vérifier le type de pompe et le temps d’évacuation ?", description: "Indiquez volume d’effluents par cycle, entrée d’air, volume du système, vide cible, temps, tubes, vannes, mousse, particules et composition.", contactLabel: "Soumettre les exigences", productsLabel: "Voir les pompes gaz-liquide", productsHref: GAS_LIQUID_CATEGORY },
  },
  ko: {
    metadata: {
      title: "IVD 폐액 펌프 선정: 액체용 또는 기액 혼합 다이어프램 펌프?",
      seoTitle: "IVD 폐액 펌프 선정: 액체용 vs 기액 혼합 | FOREACH",
      seoDescription: "공기 유입, 진공도, 시스템 체적, 배기 시간, 배관 저항과 재질 호환성을 기준으로 IVD 폐액 및 흡인 펌프를 선정합니다.",
      coverImage: `${IMAGE_BASE}/ivd-waste-aspiration-pump-selection-cover.webp`,
      coverAlt: "프로브 세척조에서 기액 혼합 다이어프램 펌프를 거쳐 밀폐 폐액병으로 이어지는 IVD 폐액 흡인 유로",
    },
    deck: "IVD 폐액 펌프는 mL/min만으로 선정할 수 없습니다. 배관이 액체로 채워진 채 연속 이송한다면 액체용 다이어프램 펌프를 검토하고, 흡인 니들로 공기가 들어와 입구가 액체와 기체 사이를 반복한다면 진공도, 시스템 체적 및 배기 시간과 함께 기액 혼합 다이어프램 펌프를 검토해야 합니다.",
    leadBlocks: [
      { type: "paragraph", text: "일반적인 경로는 Wash Well → Aspiration Needle → Waste Tube → Waste Pump입니다. 한 세척 주기에서 입구는 Liquid → Air → Liquid → Air를 경험할 수 있습니다. 따라서 첫 질문은 ‘몇 mL/min인가?’보다 ‘공기가 펌프로 들어오는가?’인 경우가 많습니다." },
      { type: "notice", label: "30초 답변:", text: "공기 유입이 거의 없는 안정적인 연속 폐액 이송은 작동 유량, 압력 및 재질을 기준으로 액체용 펌프를 검토합니다. 흡기 운전, 배관 배기, 진공 형성 또는 기액 교대가 있으면 매질 상태, 목표 진공, 체적, 배기 시간과 저항을 기준으로 기액 혼합 펌프를 검토합니다. 두 유량 표기를 직접 비교하면 안 됩니다." },
      { type: "links", items: [{ href: IVD_APPLICATION, label: "IVD 진단 응용 및 유로 작업", prefix: "먼저 전체 ", suffix: " 안에서 펌프의 역할을 확인하십시오." }] },
    ],
    sections: [
      { title: "1. Waste Liquid Pump, Waste Aspiration Pump, Vacuum Aspiration Pump는 무엇인가?", blocks: [
        { type: "paragraph", text: "Waste liquid pump, waste pump, waste aspiration pump, vacuum aspiration pump, drainage pump는 대개 기능명이지 고정된 펌프 구조가 아닙니다. 연속 또는 간헐 배액, 공기 유입, 배기나 진공 필요 여부, 시스템 체적, 허용 시간 및 전체 접액 경로의 호환성을 정의해야 합니다." },
        { type: "table", headers: ["용어", "일반적 의미", "용어만으로 알 수 없는 것"], rows: [["Waste liquid pump / drainage pump", "폐액 이송 또는 배출", "항상 순수 액체만 유입되는지"], ["Waste aspiration pump", "웰, 니들 또는 배관에서 폐액 제거", "특정 액체 또는 진공 펌프 구조인지"], ["Vacuum aspiration pump", "음압으로 흡인 또는 배기", "최대 진공이 실제 흡인 속도인지"]] },
      ] },
      { title: "2. 세척액 공급과 폐액 흡인의 선정 논리가 다른 이유", blocks: [
        { type: "paragraph", text: "공급 경로는 보통 세척액 병 → 액체 펌프 → 밸브 → 세척 니들이며 액체 작동 유량, 압력, 자흡 및 재질이 핵심입니다. 폐액 측은 세척 웰이나 반응 위치에서 흡인하므로 공기 유입, 진공, 배기 시간, 체적 및 저항이 중요합니다." },
        { type: "links", items: [{ href: CLEANING_ARTICLE, label: "IVD cleaning, wash, rinse 펌프 가이드", prefix: "공급 측 용어와 유량·압력 선정은 ", suffix: "를 참조하십시오." }] },
      ] },
      { title: "3. 표준 액체용 다이어프램 펌프가 IVD 폐액을 처리할 수 있는 조건", blocks: [
        { type: "paragraph", text: "배관이 대부분 액체로 채워지고 A에서 B로 연속 또는 안정적으로 이송하며 공기 유입이 적고 펌프가 실제 매질과 접촉할 수 있을 때 검토합니다. 최대 진공보다 실제 유량, 토출 배압, 자흡, 재자흡 및 접액 재질을 기준으로 선정합니다." },
        { type: "paragraph", text: "DPL30은 300 mL/min급, DPL60은 600 mL/min급 액체용 다이어프램 펌프이며 두 시리즈의 정격 압력은 100 kPa입니다. 연속 액체 요구량에 따른 후보이지 장착 후 유량 보증값이 아닙니다. 실제 폐액과 유로로 검증하십시오." },
        { type: "links", items: [{ href: LIQUID_CATEGORY, label: "소형 액체용 다이어프램 펌프" }, { href: DPL30, label: "DPL30 300 mL/min급" }, { href: DPL60, label: "DPL60 600 mL/min급" }] },
      ] },
      { title: "4. 기액 혼합 다이어프램 펌프를 먼저 검토해야 하는 조건", blocks: [
        { type: "paragraph", text: "액면이 내려가며 니들이 공기를 흡입하거나, 액체 제거 후에도 펌프가 계속 작동하거나, 배관을 주기적으로 비워야 하거나, 액체·기포·슬러그·공기가 반복될 때 검토합니다. 핵심은 상태 전환과 진공 형성이며 더 큰 액체 유량이 아닙니다." },
        { type: "links", items: [{ href: GAS_LIQUID_CATEGORY, label: "소형 기액 혼합 다이어프램 펌프" }] },
      ] },
      { title: "5. 폐액 흡인에서 유량과 함께 진공이 중요한 이유", blocks: [
        { type: "paragraph", text: "흡인 니들, 높이 차, 가는 배관, 밸브, 피팅, 필터와 누설은 가용 압력차를 소비합니다. 펌프는 주기 내에 이를 극복하고 흡인을 시작하며 흡기 단계에서도 기체를 제거해야 합니다. 최대 진공은 한계 성능이지 배기 시간이 아닙니다." },
        { type: "formula", expression: "Required Pump Capability = Target Vacuum + Line Resistance + Height Difference + Aspiration Requirement", note: "보편적인 산술식이 아니라 선정 점검 관계입니다. 압력과 시간 경계를 일관되게 정의한 뒤 전체 시스템으로 검증하십시오." },
      ] },
      { title: "6. 시스템 체적이 배기 시간을 바꾸는 이유", blocks: [
        { type: "paragraph", text: "두 펌프가 모두 -90 kPa 미만에 도달할 수 있어도 같은 시스템의 배기 시간이 같지는 않습니다. 유효 기체 체적이 크면 제거할 기체가 많고, 가는 배관, 밸브, 필터, 누설 및 더 깊은 목표 진공도 시간을 늘립니다." },
        { type: "list", items: ["챔버, 폐액병, 배관, 밸브와 필터의 유효 체적을 기록합니다.", "내경과 길이, 밸브 개구, 필터 압력 강하, 누설률과 높이를 제시합니다.", "목표 진공과 장비 주기가 허용하는 시간을 함께 정의합니다.", "최악의 실제 분기와 매질로 압력-시간 곡선, 잔액 및 재자흡을 측정합니다."] },
      ] },
      { title: "7. DPL60 600 mL/min과 DPGL800 6 L/min을 직접 비교할 수 없는 이유", blocks: [
        { type: "table", headers: ["항목", "DPL60", "DPGL800"], rows: [["펌프 유형", "액체용 다이어프램", "기체/기액 혼합 다이어프램"], ["표기 유량", "600 mL/min급 액체 유량", "단일 헤드 6 L/min 무부하 기체 유량"], ["주요 작업", "액체 이송, 세척, 순환, 연속 배액", "폐액 흡인, 진공 형성, 배기, 혼합상 처리"], ["검증", "작동 유량, 압력, 재질, 자흡", "진공, 체적, 시간, 저항, 매질 상태"]] },
        { type: "notice", label: "명확한 답:", text: "DPGL800의 6 L/min은 액체 유량도 폐액 처리 용량도 아닙니다. DPL60보다 유량이 10배라고 표현하면 안 됩니다." },
      ] },
      { title: "8. DPGL800 사양을 올바르게 해석하는 방법", blocks: [
        { type: "paragraph", text: "DPGL800은 24 V 무브러시 기체/기액 혼합 다이어프램 펌프입니다. 단일 헤드 무부하 기체 유량은 6 L/min, 최대 양압은 약 +30 kPa, 최대 진공은 -90 kPa 미만입니다. 적용성은 체적, 목표 진공, 허용 시간, 저항, 매질 상태 및 재질까지 검증해야 합니다." },
        { type: "links", items: [{ href: DPGL800, label: "DPGL800 제품 페이지" }, { href: DPGL800_ARTICLE, label: "DPGL800 사양 및 시스템 선정 가이드" }] },
      ] },
      { title: "9. 폐액 호환성 검토가 필요한 접액 부품", blocks: [
        { type: "paragraph", text: "IVD 폐액에는 검체, 시약, 세척액, 버퍼, 계면활성제, 생물학적 잔류물과 산·알칼리 성분이 섞일 수 있습니다. 보편적인 재질 조합은 없습니다. 펌프 헤드, 다이어프램, 밸브, 씰, 배관, 피팅, 필터와 용기를 하나의 접촉 경로로 검토하십시오." },
        { type: "list", items: ["조성, 농도, pH, 온도, 접촉 시간과 세척 주기를 기록합니다.", "거품, 입자, 결정화, 단백질 침전과 소독제의 장기 영향을 평가합니다.", "최악의 실제 매질로 침지, 반복, 흡기, 재자흡, 누설 및 수명을 시험합니다."] },
      ] },
      { title: "10. 한 펌프를 세척액 공급과 폐액 흡인에 함께 사용할 수 있는가?", blocks: [
        { type: "paragraph", text: "단순 시스템에서 검토할 수는 있지만 기본 가정으로 삼으면 안 됩니다. 공급은 연속 액체 유량, 압력과 청정도를 중시하고 폐액은 진공, 기액 전환, 배기와 오염 위험을 중시합니다. 두 경로의 요구사항과 검증표를 분리하십시오." },
        { type: "links", items: [{ href: CLEANING_ARTICLE, label: "세척 펌프와 폐액 펌프의 작업 경계" }] },
      ] },
      { title: "11. 빠른 결정 트리: 액체용 또는 기액 혼합?", blocks: [
        { type: "list", ordered: true, items: ["배관이 액체로 채워지고 연속 이송한다면 액체용 펌프를 검토합니다.", "흡기, 슬러그, 거품 또는 상 교대가 있으면 기액 혼합 펌프를 검토합니다.", "간접 흡인에서는 진공원 선정 전 체적, 누설, 필터와 넘침 보호를 정의합니다.", "매질, 작동점, 주기, 잔액, 온도, 소음과 수명을 검증합니다."] },
        { type: "links", items: [{ href: DIRECT_VS_VACUUM_ARTICLE, label: "직접 액체 이송과 간접 진공 흡인 가이드", prefix: "폐액이 펌프를 통과할지도 결정해야 한다면 ", suffix: "를 참조하십시오." }] },
      ] },
      { title: "12. 여섯 가지 일반적인 선정 오류", blocks: [
        { type: "table", headers: ["오류", "올바른 접근"], rows: [["액체 유량만으로 선정", "공기 유입과 상태 전환을 먼저 정의"], ["6 L/min을 600 mL/min과 나눔", "무부하 기체 유량과 액체 등급 분리"], ["최대 진공만 확인", "체적, 목표 진공과 시간을 함께 검증"], ["흡기와 재자흡 무시", "Liquid → Air → Liquid 주기 시험"], ["펌프 재질만 검토", "배관, 밸브, 피팅, 필터와 용기 포함"], ["세척과 폐액을 같은 작업으로 취급", "요구사항과 합격 기준 분리"]] },
      ] },
      { title: "결론: 공기 유입 여부가 공칭 mL/min보다 먼저 펌프 유형을 결정한다", blocks: [
        { type: "paragraph", text: "폐액 배관이 계속 액체로 채워지면 DPL30 또는 DPL60 같은 액체용 후보부터 검토합니다. 공기를 흡입하거나 배관을 비우고 진공을 만들면 기액 혼합 펌프를 검토합니다. DPGL800은 FOREACH의 현재 24 V 무브러시 후보 중 하나지만 실제 체적, 진공, 시간, 저항과 폐액으로 검증해야 합니다." },
      ] },
    ],
    faqTitle: "IVD 폐액 펌프 선정 FAQ",
    faqItems: [
      { question: "IVD waste liquid pump란 무엇입니까?", answer: "IVD 장비에서 폐액을 이송, 배출 또는 흡인하는 기능명입니다. 실제 구조는 매질 경로에 따라 달라집니다." },
      { question: "Waste liquid pump와 waste aspiration pump의 차이는 무엇입니까?", answer: "전자는 액체 이송을, 후자는 흡인 제거를 강조합니다. 용어는 겹칠 수 있으므로 폐액의 펌프 통과와 공기 유입을 확인하십시오." },
      { question: "표준 액체용 다이어프램 펌프로 IVD 폐액을 처리할 수 있습니까?", answer: "예. 연속 액체 이송이 주이고 공기 유입이 적으며 재자흡과 전체 재질 호환성이 확인된 경우 가능합니다." },
      { question: "언제 기액 혼합 펌프를 사용합니까?", answer: "니들이 공기를 흡입하거나 입구 상이 교대하고 배관 배기 또는 진공 형성이 필요할 때 후보로 사용합니다." },
      { question: "IVD 폐액 배관에 공기가 들어오는 이유는 무엇입니까?", answer: "액면이 낮아지며 니들이 노출되고 밸브 전환과 간헐 배액도 기포, 슬러그 및 흡기 구간을 만듭니다." },
      { question: "진공이 중요한 이유는 무엇입니까?", answer: "높이, 배관, 밸브, 필터와 누설을 극복할 압력차를 만들지만 최대 진공만으로 속도를 알 수는 없습니다." },
      { question: "시스템 체적이 배기 시간에 영향을 주는 이유는 무엇입니까?", answer: "기체 체적이 크면 제거할 기체가 많고 저항, 누설, 필터와 목표 진공도 시간 곡선을 바꿉니다." },
      { question: "DPGL800의 6 L/min은 액체 유량입니까?", answer: "아닙니다. 단일 헤드 무부하 기체 유량이며 액체 유량이나 폐액 처리 용량이 아닙니다." },
      { question: "같은 펌프를 세척 공급과 폐액 흡인에 사용할 수 있습니까?", answer: "검토는 가능하지만 기본으로 가정하면 안 됩니다. 매질, 압력, 오염과 검증 요구가 다릅니다." },
      { question: "선정 전에 무엇을 확인해야 합니까?", answer: "기액 상태, 진공, 체적, 시간, 저항, 높이, 거품, 입자, 재질, 재자흡, 제어와 수명을 확인합니다." },
    ],
    cta: { title: "펌프 유형과 배기 시간을 검토해야 합니까?", description: "주기당 폐액량, 공기 유입, 시스템 체적, 목표 진공, 시간, 배관과 밸브, 거품·입자 및 조성을 공유하십시오.", contactLabel: "적용 요구 제출", productsLabel: "기액 혼합 펌프 보기", productsHref: GAS_LIQUID_CATEGORY },
  },
  ru: {
    metadata: {
      title: "Как выбрать насос отходов IVD: жидкостный или газожидкостный мембранный?",
      seoTitle: "Насос отходов IVD: жидкостный или газожидкостный | FOREACH",
      seoDescription: "Выбор насоса отходов и аспирации IVD по поступлению воздуха, вакууму, объёму, времени откачки, сопротивлению и совместимости материалов.",
      coverImage: `${IMAGE_BASE}/ivd-waste-aspiration-pump-selection-cover.webp`,
      coverAlt: "Контур аспирации отходов IVD от промывочной ванны зонда через газожидкостный мембранный насос к герметичной ёмкости",
    },
    deck: "Насос отходов IVD нельзя выбирать только по mL/min. Если линия заполнена жидкостью и перенос непрерывен, оценивают жидкостный мембранный насос. Если игла захватывает воздух и на входе чередуются жидкость и газ, оценивают газожидкостный насос вместе с вакуумом, объёмом системы и временем откачки.",
    leadBlocks: [
      { type: "paragraph", text: "Типичный тракт: Wash Well → Aspiration Needle → Waste Tube → Waste Pump. За один цикл на входе возможна последовательность Liquid → Air → Liquid → Air. Поэтому первый вопрос часто звучит «попадёт ли в насос воздух?», а не «сколько нужно mL/min?»." },
      { type: "notice", label: "Ответ за 30 секунд:", text: "Для стабильного непрерывного переноса жидких отходов почти без воздуха выбирайте по рабочему расходу, давлению и материалам. Для сухого всасывания, опорожнения трубок, создания вакуума или чередования газа и жидкости — по состоянию среды, целевому вакууму, объёму, времени и сопротивлению. Напрямую сравнивать расходы нельзя." },
      { type: "links", items: [{ href: IVD_APPLICATION, label: "применение в IVD-диагностике и задачи жидкостного тракта", prefix: "Сначала определите роль насоса в разделе ", suffix: "." }] },
    ],
    sections: [
      { title: "1. Что означают Waste Liquid Pump, Waste Aspiration Pump и Vacuum Aspiration Pump?", blocks: [
        { type: "paragraph", text: "Waste liquid pump, waste pump, waste aspiration pump, vacuum aspiration pump и drainage pump обычно обозначают функцию, а не фиксированный механизм. Нужно определить непрерывный или прерывистый слив, поступление воздуха, необходимость откачки или вакуума, объём системы, допустимое время и совместимость всего смачиваемого тракта." },
        { type: "table", headers: ["Термин", "Обычный смысл", "Чего он не доказывает"], rows: [["Waste liquid pump / drainage pump", "Перенос или слив отходов", "Что на входе всегда чистая жидкость"], ["Waste aspiration pump", "Удаление из лунки, иглы или трубки", "Конкретную архитектуру насоса"], ["Vacuum aspiration pump", "Аспирация за счёт разрежения", "Что предельный вакуум равен реальной скорости"]] },
      ] },
      { title: "2. Почему подача промывки и аспирация отходов требуют разной логики?", blocks: [
        { type: "paragraph", text: "Подача обычно идёт по схеме Бутыль → Жидкостный насос → Клапан → Игла и определяется расходом, давлением, самовсасыванием и материалами. На стороне отходов важны поступление воздуха, вакуум, время откачки, объём и сопротивление." },
        { type: "links", items: [{ href: CLEANING_ARTICLE, label: "руководство по насосам очистки, промывки и ополаскивания IVD", prefix: "Термины и выбор на стороне подачи приведены в ", suffix: "." }] },
      ] },
      { title: "3. Когда стандартный жидкостный мембранный насос может работать с отходами IVD?", blocks: [
        { type: "paragraph", text: "Когда линия в основном заполнена, требуется непрерывный или стабильный перенос жидкости из A в B, воздуха мало, а насос может контактировать со средой. Выбирайте по реальному расходу, противодавлению, самовсасыванию, повторному заполнению и материалам, а не по предельному вакууму." },
        { type: "paragraph", text: "DPL30 относится к классу 300 mL/min, DPL60 — 600 mL/min; номинальное давление обоих жидкостных насосов составляет 100 kPa. Это кандидаты для разных потребностей непрерывной жидкости, а не гарантия расхода в системе. Испытайте реальные отходы." },
        { type: "links", items: [{ href: LIQUID_CATEGORY, label: "Миниатюрный Жидкостный Мембранный Насос" }, { href: DPL30, label: "DPL30 класса 300 mL/min" }, { href: DPL60, label: "DPL60 класса 600 mL/min" }] },
      ] },
      { title: "4. Когда сначала следует оценивать газожидкостный мембранный насос?", blocks: [
        { type: "paragraph", text: "Когда игла захватывает воздух при падении уровня, насос работает после удаления жидкости, линию нужно опорожнять либо на входе чередуются жидкость, пузырьки, пробки и воздух. Его ценность — работа при смене фаз и создание вакуума, а не повышенный жидкостный расход." },
        { type: "links", items: [{ href: GAS_LIQUID_CATEGORY, label: "Миниатюрный Газожидкостный Мембранный Насос" }] },
      ] },
      { title: "5. Почему насосу аспирации нужен вакуум наряду с расходом?", blocks: [
        { type: "paragraph", text: "Игла, перепад высоты, узкие трубки, клапаны, фитинги, фильтры и утечки расходуют доступный перепад давления. Насос должен преодолеть их за заданное время, запустить аспирацию и удалять газ на сухой стадии. Предельный вакуум — это предел, а не время откачки." },
        { type: "formula", expression: "Required Pump Capability = Target Vacuum + Line Resistance + Height Difference + Aspiration Requirement", note: "Это проверочная зависимость, а не универсальная арифметическая формула. Согласуйте границы давления и времени и испытайте полную систему." },
      ] },
      { title: "6. Почему объём системы меняет время откачки?", blocks: [
        { type: "paragraph", text: "Два насоса, способные достичь ниже -90 kPa, не обязательно откачают одну систему за одинаковое время. Больший газовый объём содержит больше газа; узкие линии, клапаны, фильтры, утечки и более глубокий целевой вакуум также увеличивают время." },
        { type: "list", items: ["Укажите эффективный объём камер, бутыли, трубок, клапанов и фильтров.", "Задайте диаметр и длину, проходы клапанов, потери фильтра, утечки и высоту.", "Укажите целевой вакуум и время, доступное в цикле прибора.", "Измерьте кривую давление-время, остаток и повторное заполнение в худшем реальном контуре."] },
      ] },
      { title: "7. Почему DPL60 600 mL/min и DPGL800 6 L/min нельзя сравнивать напрямую?", blocks: [
        { type: "table", headers: ["Пункт", "DPL60", "DPGL800"], rows: [["Тип", "Жидкостный мембранный", "Газовый/газожидкостный мембранный"], ["Расход", "Класс жидкости 600 mL/min", "6 L/min газа без нагрузки, одна головка"], ["Задача", "Перенос, промывка, циркуляция, непрерывный слив", "Аспирация, вакуум, опорожнение и смешанные фазы"], ["Проверка", "Расход, давление, материалы, самовсасывание", "Вакуум, объём, время, сопротивление и состояние среды"]] },
        { type: "notice", label: "Прямой ответ:", text: "6 L/min DPGL800 — не расход жидкости и не производительность по отходам. Нельзя говорить, что его расход в десять раз больше DPL60." },
      ] },
      { title: "8. Как правильно понимать характеристики DPGL800?", blocks: [
        { type: "paragraph", text: "DPGL800 — бесщёточный мембранный насос 24 V для газа и газожидкостных смесей. Расход газа одной головки без нагрузки — 6 L/min, максимальное положительное давление около +30 kPa, максимальный вакуум ниже -90 kPa. Пригодность зависит также от объёма, целевого вакуума, времени, сопротивления, среды и материалов." },
        { type: "links", items: [{ href: DPGL800, label: "страница продукта DPGL800" }, { href: DPGL800_ARTICLE, label: "руководство по характеристикам и выбору DPGL800" }] },
      ] },
      { title: "9. Какие смачиваемые детали нужно проверить?", blocks: [
        { type: "paragraph", text: "Отходы IVD могут содержать образцы, реагенты, моющие растворы, буферы, ПАВ, биологические остатки, кислоты и щёлочи. Универсального материала нет. Рассматривайте головку, мембрану, клапаны, уплотнения, трубки, фитинги, фильтр и сосуд как единый контактный тракт." },
        { type: "list", items: ["Запишите состав, концентрацию, pH, температуру, время контакта и цикл.", "Оцените пену, частицы, кристаллизацию, белковые отложения и дезинфектанты.", "Проведите замачивание, циклы, сухое всасывание, повторное заполнение, проверку утечек и ресурса с худшей реальной средой."] },
      ] },
      { title: "10. Может ли один насос подавать промывку и аспирировать отходы?", blocks: [
        { type: "paragraph", text: "Для простой системы это можно оценить, но не следует принимать по умолчанию. Подача требует жидкостного расхода, давления и чистоты; отходы — вакуума, смены фаз, откачки и контроля загрязнения. Задайте отдельные требования и матрицы испытаний." },
        { type: "links", items: [{ href: CLEANING_ARTICLE, label: "границы задач насоса промывки и насоса отходов" }] },
      ] },
      { title: "11. Быстрое дерево решений: жидкостный или газожидкостный?", blocks: [
        { type: "list", ordered: true, items: ["Линия заполнена и перенос непрерывен — оцените жидкостный насос.", "Есть сухое всасывание, пробки, пена или смена фаз — оцените газожидкостный насос.", "При косвенной аспирации сначала задайте газовый объём, утечки, фильтрацию и защиту от переполнения.", "Испытайте среду, рабочую точку, цикл, остаток, температуру, шум и ресурс."] },
        { type: "links", items: [{ href: DIRECT_VS_VACUUM_ARTICLE, label: "руководство по прямой перекачке и косвенной вакуумной аспирации", prefix: "Если нужно решить, проходят ли отходы через насос, см. ", suffix: "." }] },
      ] },
      { title: "12. Шесть распространённых ошибок выбора", blocks: [
        { type: "table", headers: ["Ошибка", "Правильный подход"], rows: [["Выбор только по расходу жидкости", "Сначала определить воздух и смену фаз"], ["Деление 6 L/min на 600 mL/min", "Разделять газовый расход без нагрузки и класс жидкости"], ["Учёт только предельного вакуума", "Совместно проверить объём, целевой вакуум и время"], ["Игнорирование сухого всасывания", "Испытать Liquid → Air → Liquid"], ["Проверка только материалов насоса", "Включить трубки, клапаны, фитинги, фильтр и сосуд"], ["Смешение промывки и отходов", "Разделить требования и критерии"]] },
      ] },
      { title: "Вывод: поступление воздуха часто определяет тип раньше номинального mL/min", blocks: [
        { type: "paragraph", text: "Если линия остаётся заполненной, начните с жидкостных кандидатов DPL30 или DPL60. Если она захватывает воздух, опорожняется или создаёт вакуум, оцените газожидкостный насос. DPGL800 — один из текущих бесщёточных кандидатов FOREACH на 24 V, но его нужно проверить с реальным объёмом, вакуумом, временем, сопротивлением и отходами." },
      ] },
    ],
    faqTitle: "FAQ по выбору насоса отходов IVD",
    faqItems: [
      { question: "Что такое IVD waste liquid pump?", answer: "Это функциональное название насоса, который переносит, сливает или аспирирует отходы в приборе IVD. Механизм зависит от тракта и среды." },
      { question: "Чем waste liquid pump отличается от waste aspiration pump?", answer: "Первый термин подчёркивает перенос жидкости, второй — удаление аспирацией. Они могут пересекаться; проверьте прохождение отходов через насос и поступление воздуха." },
      { question: "Может ли стандартный жидкостный мембранный насос работать с отходами IVD?", answer: "Да, если преобладает непрерывная жидкость, воздуха мало, насос повторно заполняется и все материалы совместимы." },
      { question: "Когда применять газожидкостный насос для аспирации IVD?", answer: "Когда игла захватывает воздух, фазы чередуются, линию нужно опорожнять или создавать вакуум." },
      { question: "Почему в линию отходов IVD попадает воздух?", answer: "При снижении уровня игла открывается воздуху; переключение клапанов и прерывистый слив также создают пузырьки, пробки и сухие стадии." },
      { question: "Почему важен вакуум?", answer: "Он даёт перепад давления против высоты, трубок, клапанов, фильтров и утечек, но один предельный вакуум не задаёт скорость." },
      { question: "Почему объём влияет на время откачки?", answer: "В большем газовом объёме больше газа; сопротивление, утечки, фильтры и целевой вакуум также меняют временную кривую." },
      { question: "6 L/min DPGL800 — это расход жидкости?", answer: "Нет. Это расход газа одной головки без нагрузки, не расход жидкости и не производительность по отходам." },
      { question: "Можно ли применять один насос для промывки и отходов?", answer: "Можно оценить, но нельзя предполагать: различаются состояния среды, цели давления, загрязнение и испытания." },
      { question: "Что проверить перед выбором?", answer: "Состояние газ-жидкость, вакуум, объём, время, сопротивление, высоту, пену, частицы, материалы, повторное заполнение, управление и ресурс." },
    ],
    cta: { title: "Нужно проверить тип насоса и время откачки?", description: "Укажите объём отходов за цикл, поступление воздуха, объём системы, целевой вакуум, время, трубки, клапаны, пену, частицы и состав.", contactLabel: "Отправить требования", productsLabel: "Смотреть газожидкостные насосы", productsHref: GAS_LIQUID_CATEGORY },
  },
} as const satisfies Record<
  TechnicalArticleLocale,
  DiaphragmPumpEngineeringArticleCopy
>;
