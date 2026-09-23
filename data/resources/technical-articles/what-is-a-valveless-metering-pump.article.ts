import type {
  DiaphragmPumpEngineeringArticleCopy,
  EngineeringArticleBlock,
} from "./diaphragm-pump-engineering-article.types";
import type {
  TechnicalArticleItem,
  TechnicalArticleLocale,
} from "./technical-articles.types";
import { valvelessMeteringPumpOverviewEs } from "./what-is-a-valveless-metering-pump-locales/es";
import { valvelessMeteringPumpOverviewFr } from "./what-is-a-valveless-metering-pump-locales/fr";
import { valvelessMeteringPumpOverviewKo } from "./what-is-a-valveless-metering-pump-locales/ko";
import { valvelessMeteringPumpOverviewRu } from "./what-is-a-valveless-metering-pump-locales/ru";
import {
  getValvelessMeteringPumpOverviewArticleHref,
  getValvelessMeteringPumpOverviewProductHref,
  valvelessMeteringPumpOverviewCoverImage,
} from "./what-is-a-valveless-metering-pump-locales/shared";

export const valvelessMeteringPumpOverviewSlug =
  "what-is-a-valveless-metering-pump";

const coverImage = valvelessMeteringPumpOverviewCoverImage;

const articleHref = (slug: string) =>
  getValvelessMeteringPumpOverviewArticleHref("zh-CN", slug);
const productHref = (slug?: string) =>
  getValvelessMeteringPumpOverviewProductHref("zh-CN", slug);
const enArticleHref = (slug: string) =>
  getValvelessMeteringPumpOverviewArticleHref("en", slug);
const enProductHref = (slug?: string) =>
  getValvelessMeteringPumpOverviewProductHref("en", slug);

const sectionNavigation = {
  "zh-CN": [
    { id: "working-principle", label: "工作原理" },
    { id: "parameters", label: "参数区别" },
    { id: "benefits-limits", label: "优势与边界" },
    { id: "applications", label: "应用与型号" },
    { id: "selection", label: "选型步骤" },
    { id: "installation", label: "安装与维护" },
    { id: "resources", label: "产品与资料" },
  ],
  en: [
    { id: "working-principle", label: "Working principle" },
    { id: "parameters", label: "Key parameters" },
    { id: "benefits-limits", label: "Benefits and limits" },
    { id: "applications", label: "Applications and models" },
    { id: "selection", label: "Selection steps" },
    { id: "installation", label: "Installation and maintenance" },
    { id: "resources", label: "Products and guides" },
  ],
  es: [
    { id: "working-principle", label: "Principio de funcionamiento" },
    { id: "parameters", label: "Parámetros clave" },
    { id: "benefits-limits", label: "Ventajas y límites" },
    { id: "applications", label: "Aplicaciones y modelos" },
    { id: "selection", label: "Pasos de selección" },
    { id: "installation", label: "Instalación y mantenimiento" },
    { id: "resources", label: "Productos y guías" },
  ],
  fr: [
    { id: "working-principle", label: "Principe de fonctionnement" },
    { id: "parameters", label: "Paramètres clés" },
    { id: "benefits-limits", label: "Avantages et limites" },
    { id: "applications", label: "Applications et modèles" },
    { id: "selection", label: "Étapes de sélection" },
    { id: "installation", label: "Installation et maintenance" },
    { id: "resources", label: "Produits et guides" },
  ],
  ko: [
    { id: "working-principle", label: "작동 원리" },
    { id: "parameters", label: "핵심 파라미터" },
    { id: "benefits-limits", label: "장점과 한계" },
    { id: "applications", label: "적용 분야와 모델" },
    { id: "selection", label: "선정 단계" },
    { id: "installation", label: "설치 및 유지보수" },
    { id: "resources", label: "제품 및 가이드" },
  ],
  ru: [
    { id: "working-principle", label: "Принцип работы" },
    { id: "parameters", label: "Ключевые параметры" },
    { id: "benefits-limits", label: "Преимущества и ограничения" },
    { id: "applications", label: "Применение и модели" },
    { id: "selection", label: "Этапы выбора" },
    { id: "installation", label: "Монтаж и обслуживание" },
    { id: "resources", label: "Продукты и руководства" },
  ],
} as const;

export function getValvelessMeteringPumpOverviewNavigation(
  locale: TechnicalArticleLocale,
) {
  return sectionNavigation[locale];
}

const zhCopy = {
  metadata: {
    title: "什么是无阀计量泵？工作原理、应用与选型要点",
    seoTitle: "什么是无阀计量泵？工作原理、应用与选型 | 恒永达",
    seoDescription:
      "了解无阀计量泵的旋转与往复工作原理、单圈排量和流量计算、适用场景、局限，以及 RPL 与 DRPL 系列的选型方法。",
    coverImage,
    coverAlt: "FOREACH RPL 与 DRPL 陶瓷柱塞无阀计量泵",
  },
  deck:
    "无阀计量泵是一种通过柱塞的旋转与轴向往复运动完成流路切换、吸液和排液的容积式泵。其泵送机构不依赖传统吸入阀和排出阀，适合试剂分配、滴定、灌装和双液路比例加液，但实际计量表现仍需结合介质、背压、管路、驱动和清洗条件验证。",
  leadBlocks: [
    {
      type: "paragraph",
      text:
        "无阀计量泵是一种通过柱塞的旋转与轴向往复运动完成流路切换、吸液和排液的容积式泵。其泵送机构不依赖传统吸入阀和排出阀，适合试剂分配、滴定、灌装和双液路比例加液，但实际计量表现仍需结合介质、背压、管路、驱动和清洗条件验证。",
    },
    {
      type: "notice",
      label: "先明确一个边界：",
      text:
        "“无阀”是指泵送机构内不使用传统单向阀，并不表示整台设备一定不需要切换阀、隔离阀或其他液路控制部件。",
    },
  ],
  sections: [
    {
      title: "无阀计量泵如何工作？",
      blocks: [
        {
          type: "paragraph",
          text:
            "陶瓷柱塞同时进行旋转和轴向往复运动。柱塞的旋转使内部计量腔交替对准入口与出口，轴向位移则改变计量腔容积。两种运动按固定相位配合，形成连续重复的吸液与排液循环。",
        },
        {
          type: "figure",
          src:
            "/images/resources/technical-articles/what-is-a-valveless-metering-pump/valveless-metering-pump-working-cycle-zh.png",
          alt:
            "无阀计量泵陶瓷柱塞旋转与往复吸液、排液四阶段工作原理图",
          width: 1390,
          height: 646,
          caption:
            "无阀计量泵工作循环：柱塞旋转完成入口与出口切换，轴向往复完成吸液与排液。",
        },
        {
          type: "table",
          headers: ["阶段", "柱塞与流路状态", "液体动作"],
          rows: [
            ["吸液准备", "计量腔转向入口，柱塞开始后退", "入口与计量腔连通"],
            ["吸液", "柱塞继续后退，计量腔容积增大", "液体被吸入计量腔"],
            ["流路切换", "柱塞旋转，使计量腔由入口转向出口", "入口关闭，出口准备连通"],
            ["排液", "柱塞前进，计量腔容积减小", "液体从出口排出"],
          ],
        },
        {
          type: "paragraph",
          text:
            "实际产品的端口几何、相位关系和排量调节方式由泵头结构决定。理解上述循环有助于选型，但不能替代型号规格书和实机验证。",
        },
      ],
    },
    {
      title: "单圈排量、单次加液量与平均流量有什么区别？",
      blocks: [
        {
          type: "paragraph",
          text:
            "无阀计量泵常用 μL/rev 表示单圈排量，即在当前排量设置下完成一个完整旋转周期时的名义输送体积。单次加液量还取决于转数，平均流量还取决于转速。三者不能混为同一个参数。",
        },
        {
          type: "formula",
          expression: "单次加液量 = 单圈排量 × 转数",
          note: "体积单位应保持一致，公式适用于完整周期的名义估算。",
        },
        {
          type: "formula",
          expression: "平均流量 = 单圈排量 × 转速",
          note: "若单圈排量使用 μL/rev、转速使用 rev/min，则结果为 μL/min。",
        },
        {
          type: "figure",
          src:
            "/images/resources/technical-articles/what-is-a-valveless-metering-pump/rpl-manual-flow-adjustment.webp",
          alt: "FOREACH RPL 无阀计量泵手动流量调节旋钮特写",
          width: 1200,
          height: 1200,
          caption:
            "RPL 无阀计量泵手动流量调节结构：旋转调节旋钮改变机械排量设置。",
        },
        {
          type: "notice",
          text:
            "单圈排量范围的下限不等于最小可靠加液量。小体积输出还受到驱动定位、回差、介质、气泡、管路弹性、针尖挂液和测量方法影响，应在目标工况下验证准确性与重复性。",
        },
      ],
    },
    {
      title: "无阀结构的优势与边界",
      blocks: [
        {
          type: "table",
          headers: ["工程关注点", "可能带来的价值", "需要同时核对的边界"],
          rows: [
            ["泵送机构不设传统单向阀", "减少阀片卡滞或阀座密封对泵送循环的影响", "颗粒、结晶或沉积仍可能影响陶瓷配合面和端口"],
            ["旋转与往复联动", "可将流路切换与容积计量合并在一个泵头中", "需要匹配驱动定位、相位和完整工作周期"],
            ["陶瓷柱塞组件", "适合重复计量，并可按介质核对接液材料", "材料兼容性必须结合浓度、温度、接触时间和清洗液确认"],
            ["机械排量与转速调节", "可从单次体积和节拍两个方向匹配任务", "设定值仍需通过实际液路称重或体积法校准"],
          ],
        },
        {
          type: "paragraph",
          text:
            "无阀结构不自动等于无脉动、可干转、不会堵塞、适合任意粘度或任意背压。入口供液不足、气泡、出口阻力、介质沉积和不合适的清洗方式，仍会改变输出稳定性和使用寿命。",
        },
      ],
    },
    {
      title: "无阀计量泵适合哪些应用？",
      blocks: [
        {
          type: "paragraph",
          text:
            "常见任务包括试剂分配、滴定剂加液、校准液或缓冲液添加、定量灌装，以及两路液体的比例输送。应用名称描述的是设备中的任务；它并不意味着所有同类设备都必须采用无阀泵。",
        },
        {
          type: "table",
          headers: ["FOREACH 系列", "当前展示配置", "典型任务"],
          rows: [
            ["RPL-P4", "12–80 μL/rev，单头", "小体积试剂加注、滴定和重复分装"],
            ["RPL-P6.35", "50–300 μL/rev，单头", "试剂分配、滴定、定量灌装"],
            ["RPL-P15", "300–1200 μL/rev，单头", "较大体积加液、缓冲液添加和定量输送"],
            ["DRPL-0109", "双头，1:9；100 μL + 900 μL", "浓缩液与稀释液的比例输送"],
            ["DRPL-0119", "双头，1:19；60 μL + 1140 μL", "更高稀释比的双液路比例加液"],
          ],
        },
        {
          type: "notice",
          text:
            "DRPL 双头泵负责两路定量输送，下游是否混合均匀还取决于汇流位置、混合结构、管路体积和控制时序。",
        },
      ],
    },
    {
      title: "怎样选择无阀计量泵？",
      blocks: [
        {
          type: "list",
          ordered: true,
          items: [
            "先定义任务：是单次加液、滴定、灌装、连续供液，还是双液路比例输送。",
            "明确目标单次体积、允许加液时间、日循环次数和可接受误差，再换算所需排量、转数与转速。",
            "记录介质名称、浓度、粘度、颗粒或结晶风险、工作温度，以及清洗液和停机时间。",
            "核对入口液位、吸液高度、管路长度与内径，以及过滤器、针头、混合器等产生的出口阻力。",
            "确认接液材料、工作接口、清洗接口、安装方向、电机与控制方式，并区分标准展示配置与项目定制项。",
            "在真实液路中测量单次输出、重复性、节拍、气泡、泄漏和清洗恢复情况，再确定量产参数。",
          ],
        },
      ],
    },
    {
      title: "安装、调试与维护时要注意什么？",
      blocks: [
        {
          type: "figure",
          src:
            "/images/resources/technical-articles/what-is-a-valveless-metering-pump/valveless-metering-pump-installation-orientation.png",
          alt: "FOREACH 无阀计量泵允许与禁止安装方向示意图",
          width: 2113,
          height: 1024,
          caption:
            "无阀计量泵安装方向示意：按照绿色对勾所示方向安装，避免采用红色叉号所示方向；具体要求以对应型号的安装说明为准。",
        },
        {
          type: "list",
          ordered: true,
          items: [
            "初次运行前排尽吸液管和泵腔中的空气，避免将气泡造成的体积误差误判为泵的计量误差。",
            "让储液容器、吸液管和泵入口保持稳定供液，避免过高吸程、细长软管或堵塞过滤器造成入口压降。",
            "不要把耐压值直接当作允许连续工作背压；工作点应按规格定义和实际液路测试确认。",
            "易结晶、易沉积或更换介质的应用，应制定停机冲洗、清洗液兼容性和废液处理流程。",
            "精度验收应记录介质、温度、排量设置、转速、背压、循环数和测量方法，保证结果可以复现。",
          ],
        },
      ],
    },
    {
      title: "继续查看产品与选型资料",
      blocks: [
        {
          type: "links",
          ordered: true,
          items: [
            { href: productHref(), label: "查看无阀计量泵产品分类" },
            {
              href: articleHref("rpl-valveless-metering-pump-selection-guide"),
              label: "阅读 RPL 单头无阀计量泵选型指南",
            },
          ],
        },
      ],
    },
  ],
  faqTitle: "无阀计量泵常见问题",
  faqItems: [
    {
      question: "无阀计量泵与普通计量泵有什么区别？",
      answer:
        "区别主要在泵送与换向方式。无阀计量泵通过柱塞的旋转与往复运动完成入口、出口切换和容积变化，不依赖传统吸入阀与排出阀；其他计量泵可能使用单向阀、隔膜或其他机构。最终选型仍要看体积、压力、介质和控制要求。",
    },
    {
      question: "无阀计量泵的单圈排量越小，最小加液量就越小吗？",
      answer:
        "不能直接这样判断。单圈排量是完整周期的名义输出参数，最小可靠加液量还取决于电机定位、回差、液体、管路、气泡、针尖和测量方法，应通过目标工况下的重复加液测试确认。",
    },
    {
      question: "无阀结构是否意味着整台设备完全不需要阀？",
      answer:
        "不是。无阀描述的是泵送机构。整机是否需要切换阀、隔离阀、止回部件或安全控制阀，取决于供液、清洗、回流和安全方案。",
    },
    {
      question: "RPL 与 DRPL 应该怎样区分？",
      answer:
        "RPL 是单头无阀计量泵，用于单一路径的定量输送；DRPL 是双头配置，用于两路液体按指定体积比例输送。双头定量与下游混合是两个环节，均需单独验证。",
    },
  ],
  cta: {
    title: "需要核对无阀计量泵的实际工况？",
    description:
      "请提供目标单次体积或平均流量、允许时间、介质、入口与出口条件、接口和控制方式，由恒永达协助核对 RPL 或 DRPL 配置与验证条件。",
    contactLabel: "咨询技术选型",
    productsLabel: "查看无阀计量泵",
    productsHref: productHref(),
  },
} satisfies DiaphragmPumpEngineeringArticleCopy;

const enCopy = {
  metadata: {
    title:
      "What Is a Valveless Metering Pump? Working Principle, Applications and Selection",
    seoTitle:
      "What Is a Valveless Metering Pump? How It Works | FOREACH",
    seoDescription:
      "Learn how a valveless metering pump uses rotary and reciprocating piston motion, how displacement and flow are calculated, where it is used, and how to select RPL or DRPL pumps.",
    coverImage,
    coverAlt: "FOREACH RPL and DRPL ceramic-piston valveless metering pumps",
  },
  deck:
    "A valveless metering pump is a positive-displacement pump that combines rotary and axial reciprocating piston motion to switch the fluid path, draw liquid in and discharge it. Its pumping mechanism does not rely on conventional inlet and outlet check valves. It can serve reagent dispensing, titration, filling and two-fluid proportional delivery, but metering performance still has to be verified with the actual fluid, pressure, tubing, drive and cleaning conditions.",
  leadBlocks: [
    {
      type: "paragraph",
      text:
        "A valveless metering pump is a positive-displacement pump that combines rotary and axial reciprocating piston motion to switch the fluid path, draw liquid in and discharge it. Its pumping mechanism does not rely on conventional inlet and outlet check valves. It can serve reagent dispensing, titration, filling and two-fluid proportional delivery, but metering performance still has to be verified with the actual fluid, pressure, tubing, drive and cleaning conditions.",
    },
    {
      type: "notice",
      label: "Important boundary:",
      text:
        "valveless describes the pumping mechanism. It does not mean that the complete instrument can never require a switching valve, isolation valve or another fluid-control component.",
    },
  ],
  sections: [
    {
      title: "How does a valveless metering pump work?",
      blocks: [
        {
          type: "paragraph",
          text:
            "The ceramic piston rotates while moving axially. Rotation alternately aligns the metering chamber with the inlet and outlet, while axial motion changes chamber volume. With the two motions held in the required phase relationship, the pump repeats a suction-and-discharge cycle.",
        },
        {
          type: "figure",
          src:
            "/images/resources/technical-articles/what-is-a-valveless-metering-pump/valveless-metering-pump-working-cycle-en.webp",
          alt: "Four-stage valveless metering pump suction and discharge working cycle",
          width: 1390,
          height: 646,
          caption:
            "Valveless metering pump working cycle: piston rotation switches between inlet and outlet, while axial reciprocation draws in and discharges liquid.",
        },
        {
          type: "table",
          headers: ["Stage", "Piston and port state", "Fluid action"],
          rows: [
            ["Prepare to aspirate", "The chamber turns toward the inlet and the piston begins to retract", "The inlet connects to the chamber"],
            ["Aspirate", "The piston continues retracting and chamber volume increases", "Liquid enters the chamber"],
            ["Switch the path", "The piston rotates the chamber from inlet toward outlet", "The inlet closes and the outlet prepares to open"],
            ["Dispense", "The piston advances and chamber volume decreases", "Liquid leaves through the outlet"],
          ],
        },
        {
          type: "paragraph",
          text:
            "Port geometry, motion phase and displacement adjustment depend on the pump-head design. This cycle explains the principle, but the model specification and system test remain the selection authority.",
        },
      ],
    },
    {
      title: "Displacement per revolution, dose volume and average flow",
      blocks: [
        {
          type: "paragraph",
          text:
            "Valveless metering pumps commonly express displacement in μL/rev: the nominal volume delivered during one complete rotational cycle at the current setting. Dose volume also depends on the number of revolutions, while average flow also depends on rotational speed. These are three different quantities.",
        },
        {
          type: "formula",
          expression: "Dose volume = displacement per revolution × revolutions",
          note: "Keep volume units consistent. This is a nominal estimate for complete cycles.",
        },
        {
          type: "formula",
          expression: "Average flow = displacement per revolution × rotational speed",
          note: "Using μL/rev and rev/min gives μL/min.",
        },
        {
          type: "figure",
          src:
            "/images/resources/technical-articles/what-is-a-valveless-metering-pump/rpl-manual-flow-adjustment.webp",
          alt: "FOREACH RPL valveless metering pump manual flow adjustment knob",
          width: 1200,
          height: 1200,
          caption:
            "Manual flow adjustment on an RPL valveless metering pump: turning the knob changes the mechanical displacement setting.",
        },
        {
          type: "notice",
          text:
            "The lower end of a displacement range is not the minimum reliable dose. Small-volume results also depend on drive positioning, backlash, fluid, bubbles, tubing compliance, liquid retained at the needle tip and the measurement method. Validate accuracy and repeatability under the target conditions.",
        },
      ],
    },
    {
      title: "Benefits and limits of the valveless mechanism",
      blocks: [
        {
          type: "table",
          headers: ["Engineering point", "Potential value", "Boundary to check"],
          rows: [
            ["No conventional check valves in the pumping mechanism", "Reduces dependence on valve seating and valve-element motion during each pumping cycle", "Particles, crystallization and deposits can still affect ceramic fits and ports"],
            ["Coupled rotary and reciprocating motion", "Combines path switching and positive displacement in one pump head", "Requires correct drive positioning, phase and complete working cycles"],
            ["Ceramic piston assembly", "Supports repeatable metering with wetted materials selected for the fluid", "Compatibility depends on concentration, temperature, exposure time and cleaning fluid"],
            ["Mechanical displacement and speed adjustment", "Matches both dose volume and process timing", "Settings still require gravimetric or volumetric calibration in the real fluid path"],
          ],
        },
        {
          type: "paragraph",
          text:
            "Valveless does not automatically mean pulsation-free, dry-running capable, clog-proof or suitable for any viscosity or backpressure. Poor inlet supply, bubbles, outlet resistance, deposits and an unsuitable cleaning method can still change delivery stability and service life.",
        },
      ],
    },
    {
      title: "Where are valveless metering pumps used?",
      blocks: [
        {
          type: "paragraph",
          text:
            "Common duties include reagent dispensing, titrant addition, calibration or buffer addition, quantitative filling and proportional delivery of two liquids. These application names describe the task in an instrument; they do not mean every instrument performing that task must use a valveless pump.",
        },
        {
          type: "table",
          headers: ["FOREACH series", "Current shown configuration", "Typical duty"],
          rows: [
            ["RPL-P4", "12–80 μL/rev, single head", "Small-volume reagent addition, titration and repeated dispensing"],
            ["RPL-P6.35", "50–300 μL/rev, single head", "Reagent dispensing, titration and quantitative filling"],
            ["RPL-P15", "300–1200 μL/rev, single head", "Larger liquid additions, buffer addition and metered transfer"],
            ["DRPL-0109", "Dual head, 1:9; 100 μL + 900 μL", "Proportional delivery of concentrate and diluent"],
            ["DRPL-0119", "Dual head, 1:19; 60 μL + 1140 μL", "Two-fluid delivery at a higher dilution ratio"],
          ],
        },
        {
          type: "notice",
          text:
            "A DRPL pump meters two fluid streams. Final mixing uniformity also depends on the junction, mixer, downstream volume and control timing.",
        },
      ],
    },
    {
      title: "How to select a valveless metering pump",
      blocks: [
        {
          type: "list",
          ordered: true,
          items: [
            "Define the duty first: discrete dosing, titration, filling, continuous supply or proportional delivery of two liquids.",
            "Set the target dose, allowed delivery time, daily cycle count and acceptable error, then calculate the required displacement, revolutions and speed.",
            "Record fluid identity, concentration, viscosity, particle or crystallization risk, working temperature, cleaning fluid and idle time.",
            "Record reservoir level, suction lift, tubing length and bore, plus outlet restrictions from filters, needles, mixers and other components.",
            "Confirm wetted materials, working and wash ports, mounting, motor and control method, separating the shown configuration from project-specific options.",
            "Measure dose output, repeatability, timing, bubbles, leakage and cleaning recovery in the actual fluid path before freezing production settings.",
          ],
        },
      ],
    },
    {
      title: "Installation, commissioning and maintenance checks",
      blocks: [
        {
          type: "figure",
          src:
            "/images/resources/technical-articles/what-is-a-valveless-metering-pump/valveless-metering-pump-installation-orientation.png",
          alt: "FOREACH valveless metering pump permitted and prohibited installation orientations",
          width: 2113,
          height: 1024,
          caption:
            "Valveless metering pump installation orientations: use the orientations marked with a green check and avoid the orientation marked with a red X. Follow the model-specific installation instructions.",
        },
        {
          type: "list",
          ordered: true,
          items: [
            "Remove air from the inlet tube and pump chamber before evaluating dose accuracy, so bubble volume is not mistaken for pump error.",
            "Maintain stable inlet supply and avoid excessive lift, long narrow tubing or a blocked filter that creates excessive inlet pressure drop.",
            "Do not treat a pressure-withstand value as the permitted continuous working backpressure; use the specification definition and a real fluid-path test.",
            "For crystallizing, depositing or frequently changed fluids, define shutdown flushing, cleaning-fluid compatibility and waste handling.",
            "Document fluid, temperature, displacement setting, speed, backpressure, cycle count and measurement method so the acceptance result can be reproduced.",
          ],
        },
      ],
    },
    {
      title: "Products and further selection guidance",
      blocks: [
        {
          type: "links",
          ordered: true,
          items: [
            {
              href: enProductHref(),
              label: "View valveless metering pumps",
            },
            {
              href: enArticleHref("rpl-valveless-metering-pump-selection-guide"),
              label: "Read the RPL single-head valveless metering pump selection guide",
            },
          ],
        },
      ],
    },
  ],
  faqTitle: "Valveless metering pump FAQ",
  faqItems: [
    {
      question:
        "How is a valveless metering pump different from another metering pump?",
      answer:
        "The main difference is the pumping and switching mechanism. A valveless metering pump uses rotary and reciprocating piston motion to switch between inlet and outlet while changing chamber volume, without conventional inlet and outlet check valves. Other metering pumps may use check valves, diaphragms or different mechanisms. Selection still depends on dose, pressure, fluid and control requirements.",
    },
    {
      question:
        "Does a lower displacement per revolution always mean a smaller minimum dose?",
      answer:
        "No. Displacement per revolution is the nominal output for a complete cycle. The minimum reliable dose also depends on motor positioning, backlash, fluid, tubing, bubbles, the needle tip and measurement method. Confirm it with repeated-dose testing under the target conditions.",
    },
    {
      question:
        "Does valveless mean the complete instrument never needs a valve?",
      answer:
        "No. Valveless describes the pumping mechanism. The complete system may still require switching, isolation, backflow-control or safety valves depending on supply, cleaning, return and safety functions.",
    },
    {
      question: "What is the difference between RPL and DRPL?",
      answer:
        "RPL is a single-head valveless metering pump for one metered fluid path. DRPL is a dual-head configuration for delivering two liquids at a specified volume ratio. Two-stream metering and downstream mixing are separate functions and should be validated separately.",
    },
  ],
  cta: {
    title: "Need to review a real valveless metering-pump duty?",
    description:
      "Share the target dose or average flow, allowed time, fluid, inlet and outlet conditions, interfaces and control method with FOREACH to review an RPL or DRPL configuration and validation conditions.",
    contactLabel: "Discuss the application",
    productsLabel: "View valveless metering pumps",
    productsHref: enProductHref(),
  },
} satisfies DiaphragmPumpEngineeringArticleCopy;

const copies: Partial<
  Record<TechnicalArticleLocale, DiaphragmPumpEngineeringArticleCopy>
> = {
  "zh-CN": zhCopy,
  en: enCopy,
  es: valvelessMeteringPumpOverviewEs,
  fr: valvelessMeteringPumpOverviewFr,
  ko: valvelessMeteringPumpOverviewKo,
  ru: valvelessMeteringPumpOverviewRu,
};

const overviewProductModels = [
  {
    name: "RPL-P4",
    slug: "rpl-p4",
    image: "/images/products/pumps/valveless-pumps/foreach-rpl-p4-valveless-pump.webp",
  },
  {
    name: "RPL-P6.35",
    slug: "rpl-p635",
    image: "/images/products/pumps/valveless-pumps/foreach-rpl-p635-valveless-pump.webp",
  },
  {
    name: "RPL-P15",
    slug: "rpl-p15",
    image: "/images/products/pumps/valveless-pumps/foreach-rpl-p15-valveless-pump.webp",
  },
  {
    name: "DRPL-0109",
    slug: "drpl-0109",
    image: "/images/products/pumps/valveless-pumps/foreach-drpl-0109-dual-head-valveless-pump.webp",
  },
  {
    name: "DRPL-0119",
    slug: "drpl-0119",
    image: "/images/products/pumps/valveless-pumps/foreach-drpl-0119-dual-head-valveless-pump.webp",
  },
] as const;

const overviewProductAlt: Record<TechnicalArticleLocale, string> = {
  "zh-CN": "无阀计量泵产品外观",
  en: "valveless metering pump",
  es: "bomba dosificadora sin válvulas",
  fr: "pompe doseuse sans clapet",
  ko: "무밸브 정량펌프",
  ru: "бесклапанный дозирующий насос",
};

export function getValvelessMeteringPumpOverviewProducts(
  locale: TechnicalArticleLocale,
) {
  return overviewProductModels.map((product) => ({
    ...product,
    href: getValvelessMeteringPumpOverviewProductHref(locale, product.slug),
    alt: `${product.name} ${overviewProductAlt[locale]}`,
  }));
}

export function getValvelessMeteringPumpOverviewCopy(
  slug: string,
  locale: TechnicalArticleLocale,
) {
  if (slug !== valvelessMeteringPumpOverviewSlug) return null;
  return copies[locale] ?? null;
}

function blockText(block: EngineeringArticleBlock): string {
  switch (block.type) {
    case "paragraph":
      return block.text;
    case "notice":
      return [block.label, block.text].filter(Boolean).join(" ");
    case "formula":
      return [block.expression, block.note].filter(Boolean).join(" ");
    case "table":
      return [block.headers, ...block.rows]
        .map((row) => row.join(" | "))
        .join("\n");
    case "figure":
      return block.caption;
    case "subheading":
      return block.title;
    case "list":
      return block.items.join("\n");
    case "links":
      return block.items.map((item) => item.label).join("\n");
  }
}

export function getValvelessMeteringPumpOverviewArticles(
  locale: TechnicalArticleLocale,
): TechnicalArticleItem[] {
  const copy = copies[locale];
  if (!copy) return [];

  return [
    {
      id: valvelessMeteringPumpOverviewSlug,
      slug: valvelessMeteringPumpOverviewSlug,
      category: "pumps-valves",
      ...copy.metadata,
      summary: copy.deck,
      date: "2026-09-21",
      relationKeys: ["series:rpl", "series:drpl"],
      relationPriority: 150,
      content: [
        {
          title: "",
          content: copy.leadBlocks.map(blockText).join("\n\n"),
        },
        ...copy.sections.map((section) => ({
          title: section.title,
          content: section.blocks.map(blockText).join("\n"),
        })),
        {
          title: copy.faqTitle,
          content: copy.faqItems
            .map((item) => `${item.question}\n${item.answer}`)
            .join("\n\n"),
        },
      ],
    },
  ];
}
