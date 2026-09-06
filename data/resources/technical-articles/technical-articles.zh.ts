/* =========================================================
   technical-articles.zh.ts
   恒永达官网｜中文技术文章数据

   说明：
   1. 当前阶段使用本地静态数据
   2. 后期接 CMS / 后台时，这些字段可以直接迁移
   3. 技术文章用于沉淀产品选型、材料兼容、管路连接、密封方式与应用设计经验
========================================================= */

import { legacyMotionArticleItems } from "./legacy-motion-control-articles.zh";
import type { TechnicalArticlesSourcePageData } from "./technical-articles.types";

const technicalArticlesBannerImage =
  "/images/resources/technical-articles/banner/resources-technical-articles-banner-1920x520-v001.webp";

/* 临时封面图
   说明：
   1. 第一版先统一使用技术文章 Banner 作为文章封面
   2. 后续可逐篇替换为材料图、接头图、泵阀图、应用图
*/
const defaultCoverImage = technicalArticlesBannerImage;

export const technicalArticlesZhData: TechnicalArticlesSourcePageData = {
  locale: "zh-CN",

  hero: {
    title: "技术文章",
    description:
      "围绕微流体系统中的产品选型、材料兼容、管路连接、密封方式与应用设计，分享恒永达在液路系统关键零部件中的技术理解与实践经验。",
    backgroundImage: technicalArticlesBannerImage,
  },

  breadcrumbs: [
    {
      label: "首页",
      href: "/",
    },
    {
      label: "资源中心",
      href: "/resources",
    },
    {
      label: "技术文章",
    },
  ],

  search: {
    placeholder: "请输入关键词",
  },

  sectionTitle: "技术文章",

  articles: [
    ...legacyMotionArticleItems,
    {
      id: "piston-pump-head-material-selection",
      slug: "piston-pump-head-material-selection",
      category: "pumps-valves",
      title: "柱塞泵泵头材料怎么选？常用材料与选型方法",
      summary:
        "柱塞泵泵头材料会影响介质兼容性、结构稳定性、密封、清洗与项目成本。本文对比PMMA、PCTG、PPS、PVDF、PP、PTFE、PEEK、POM和PSU，并说明完整接液路径的验证方法。",
      date: "2026-09-06",
      coverImage:
        "/images/resources/technical-articles/piston-pump/piston-pump-head-material-selection-cover.webp",
      coverAlt: "FOREACH透明柱塞泵泵头材料与接液结构特写",
      content: [
        {
          title: "柱塞泵泵头材料对比",
          content:
            "本文介绍PMMA、PCTG、PPS、PVDF、PP、PTFE、PEEK、POM和PSU的常见选型方向，并说明材料名称不能代替真实介质与工况验证。完整正文由柱塞泵泵头材料技术文章组件渲染。",
        },
        {
          title: "完整接液路径与项目验证",
          content:
            "泵头选材需要同时核对柱塞、密封、阀、管路和接头，并结合介质、浓度、温度、接触时间、压力、清洗方式和目标工作液量完成样件及整机验证。",
        },
      ],
      seoTitle: "柱塞泵泵头材料怎么选？PMMA、PEEK等材料对比 | FOREACH",
      seoDescription:
        "柱塞泵泵头材料怎么选？对比PMMA、PCTG、PPS、PVDF、PP、PTFE、PEEK、POM和PSU的选型方向，了解介质兼容、完整接液路径与验证方法。",
    },
    {
      id: "piston-pump-accuracy-repeatability-resolution",
      slug: "piston-pump-accuracy-repeatability-resolution",
      category: "pumps-valves",
      title: "柱塞泵的准确性、重复性和分辨率有什么区别？",
      summary:
        "柱塞泵分辨率不等于分液准确性。了解准确性、重复性和分辨率的区别，以及步数、行程、气泡、阀门和液体性质对小体积分液结果的影响。",
      date: "2026-09-06",
      coverImage:
        "/images/resources/technical-articles/piston-pump/piston-pump-accuracy-repeatability-resolution-cover.webp",
      coverAlt: "FOREACH SM系列精密柱塞泵实物图",
      content: [
        {
          title: "柱塞泵准确性、重复性和分辨率",
          content:
            "本文解释柱塞泵准确性、重复性和分辨率的区别，并说明为什么理论每步液量不能直接作为最小可靠分液量。完整正文由柱塞泵性能技术文章组件渲染。",
        },
        {
          title: "小体积分液与完整液路验证",
          content:
            "文章结合FOREACH EA-500-PMMA的满量程和2%量程参数，介绍机械背隙、阀门、气泡、介质、控制程序及测试方法对分液结果的影响。",
        },
      ],
      seoTitle: "柱塞泵准确性、重复性与分辨率详解 | FOREACH",
      seoDescription:
        "柱塞泵分辨率不等于分液准确性。本文解释准确性、重复性和分辨率的区别，以及电机步数、工作行程、气泡、阀门和液体性质对小体积分液结果的影响。",
    },
    {
      id: "dpl30-liquid-diaphragm-pump-selection-guide",
      slug: "dpl30-liquid-diaphragm-pump-selection-guide",
      relationKeys: ["series:dpl30"],
      category: "pumps-valves",
      title:
        "300 mL/min液体隔膜泵怎么选？DPL30工作原理与型号选型指南",
      summary: "",
      date: "2026-07-10",

      /*
       * 第一阶段暂时沿用技术文章默认封面。
       * 后续上传DPL30专属封面后，再替换这里。
       */
      coverImage:
        "/images/resources/technical-articles/dpl30-liquid-diaphragm-pump/dpl30-article-cover.webp",

      /*
       * 完整正文由Dpl30LiquidDiaphragmPumpArticle组件渲染。
       * 此处保留基础内容，兼容文章数据结构和后续CMS迁移。
       */
      content: [
        {
          title: "DPL30液体隔膜泵选型指南",
          content:
            "本文介绍DPL30液体隔膜泵的工作原理、技术参数、流量—压力关系、接液材料、有刷与无刷版本差异、型号编码及完整选型步骤。",
        },
      ],

      seoTitle:
        "300 mL/min液体隔膜泵怎么选？DPL30型号解析与选型指南",
      seoDescription:
        "了解恒永达DPL30液体隔膜泵的工作原理、300 mL/min空载流量、100 kPa额定压力、流量压力曲线、接液材料、有刷无刷版本及型号选型方法。",
    },

    {
      id: "cv-kv-correction-for-microfluidics",
      slug: "cv-kv-correction-for-microfluidics",
      category: "pumps-valves",
      title: "工程实践｜微流控与精密节流场景 Cv/Kv 系数计算失真分析与修正指南",
      summary:
        "传统 Cv/Kv 计算通常建立在充分湍流和阻力平方区假设之上。在微小通径、低流速和低雷诺数工况下，直接套用可能明显低估实际压降。本文分析失真原因，并介绍雷诺修正、Churchill 摩擦因子及小孔节流修正方法。",
      date: "2026-07-07",
      coverImage: defaultCoverImage,
      content: [
        {
          title: "传统 Cv/Kv 计算为什么会在微流控中失真",
          content:
            "传统工业计算通常建立在充分发展湍流和阻力平方区假设上。微流控系统常见通径只有 0.1～0.5 mm，工作雷诺数通常处于 10～10⁴，流动可能位于层流区、过渡区或水力光滑紊流区，直接使用传统平方律可能明显低估实际压降。",
        },
        {
          title: "工业经典算法的适用边界",
          content:
            "经典手册本身已经通过液体粘度限制和气体临界压降规则划定了适用范围。当液体粘度高于 300 SSU，约 9°E 时，标称 Cv/Kv 需要重新调整。",
        },
        {
          title: "雷诺修正系数 Fᵣ",
          content:
            "实际流量系数可表示为 Cv（Re）= Cv₀×Fᵣ（Re），实际压降可表示为 ΔPactual=ΔPcalc÷Fᵣ²。Fᵣ 小于 1 时，表示实际流通能力低于标定状态。",
        },
        {
          title: "长微通道与毛细管的 Churchill 修正",
          content:
            "当沿程摩擦为主要阻力来源时，可使用 Churchill 统一摩擦因子覆盖层流、过渡区和紊流。光滑微通道的基准摩擦因子应结合实际可达到的标定雷诺数确定。",
        },
        {
          title: "薄壁小孔和短孔的局部阻力修正",
          content:
            "对局部阻力主导的小孔节流元件，可根据流量系数与雷诺数关系建立连续修正。倒角、圆角、孔长和入口结构都会改变临界雷诺数。",
        },
        {
          title: "工程设计红线",
          content:
            "低雷诺数不能直接使用平方律；光滑微通道不能套用大型工业管道经验值；过渡区应采用稳定的数值求解方法；局部损失必须符合真实几何；外部管路损失不能计入元件本征 Cv/Kv。",
        },
        {
          title: "Python 核心计算实现",
          content:
            "文章提供 Churchill 摩擦因子、微通道标定流速、长通道雷诺修正及小孔节流修正的 Python 核心实现。",
        },
      ],
      seoTitle: "微流控 Cv/Kv 计算失真原因与雷诺修正方法",
      seoDescription:
        "分析 Cv/Kv 公式在微小通径、低流速和低雷诺数工况下的误差来源，并介绍 Churchill 摩擦因子、雷诺修正系数和小孔节流修正方法。",
    },
    {
      id: "selecting-microfluidic-fittings",
      slug: "selecting-microfluidic-fittings",
      category: "fittings-tubing",
      title: "微流体系统中如何选择合适的管路连接件",
      summary:
        "管路连接件不仅影响液路系统的密封性，也会影响装配效率、维护便利性和长期稳定性。选择接头时，需要综合考虑管材尺寸、连接方式、使用压力、介质类型和安装空间。",
      date: "2026-07-04",
      coverImage:
        "/images/resources/technical-articles/covers/selecting-microfluidic-fittings.webp",
      content: [
        {
          title: "管路连接件在系统中的作用",
          content:
            "在微流体系统中，管路连接件承担着液体传输、密封连接和结构固定的作用。不同应用场景对接头的要求并不相同，例如 IVD 设备更关注长期稳定性和批量一致性，实验室自动化设备更关注装配便利性，分析仪器则可能更关注耐腐蚀性和低死体积设计。",
        },
        {
          title: "选型时需要确认的关键因素",
          content:
            "选择接头时，首先需要确认管材外径、内径和接口规格是否匹配。其次需要确认连接方式，例如硬管连接、软管连接、卡环连接、翻边连接或螺纹连接。对于存在压力、腐蚀性介质或频繁维护需求的系统，还需要进一步确认材料、密封方式和长期使用条件。",
        },
      ],
    },
    {
      id: "peek-ptfe-pfa-material-differences",
      slug: "peek-ptfe-pfa-material-differences",
      category: "materials-compatibility",
      title: "PEEK、PTFE、PFA 材料在液路系统中的应用差异",
      summary:
        "PEEK、PTFE、PFA 都是微流体系统中常见的高性能材料，但它们在机械强度、耐化学性、透明度、柔韧性和加工方式上存在明显差异。",
      date: "2026-07-01",
      coverImage:
        "/images/resources/technical-articles/covers/peek-ptfe-pfa-material-differences.webp",
      content: [
        {
          title: "三种材料的主要差异",
          content:
            "PEEK 具有较高的机械强度和耐压能力，常用于对结构强度、尺寸稳定性和耐磨性要求较高的场景。PTFE 具有优异的化学惰性和较低的表面能，适合多种腐蚀性介质，但机械强度相对较低。PFA 兼具较好的耐化学性和一定透明度，适用于需要观察液体状态或对洁净度要求较高的应用。",
        },
        {
          title: "材料兼容需要结合实际工况",
          content:
            "在实际选型中，材料兼容性不能只看材料名称，还需要结合介质浓度、温度、接触时间、压力和清洗方式综合判断。对于混合溶剂、高温条件或长期浸泡工况，建议结合实际样品测试和技术确认后再确定最终材料方案。",
        },
      ],
    },
    {
      id: "low-pressure-vs-high-pressure-fittings",
      slug: "low-pressure-vs-high-pressure-fittings",
      category: "fittings-tubing",
      title: "低压管路连接件和高压管路连接件有什么区别",
      summary:
        "低压连接件更关注装配效率和密封可靠性，高压连接件则更强调结构强度、密封方式和耐压稳定性。两者不能简单互相替代。",
      date: "2026-06-28",
      coverImage:
        "/images/resources/technical-articles/covers/low-pressure-vs-high-pressure-fittings.webp",
      content: [
        {
          title: "使用场景不同",
          content:
            "低压管路连接件通常用于常规液体输送、试剂分配、清洗液路和低压检测系统中。这类应用对接头的要求主要集中在装配便利、密封稳定和材料兼容上。高压管路连接件则常用于分析仪器、高压输液或对压力波动较敏感的系统，对接头结构和密封方式要求更高。",
        },
        {
          title: "不能只看外形判断能否替代",
          content:
            "在选型时，不能只根据外形判断是否可替代。即使接口尺寸相近，不同连接件的耐压等级、密封结构、适用管材和安装方式也可能存在差异。如果系统存在压力要求，应优先确认接头的实际耐压范围和管路整体匹配性。",
        },
      ],
    },
    {
      id: "rigid-tubing-vs-flexible-tubing",
      slug: "rigid-tubing-vs-flexible-tubing",
      category: "fittings-tubing",
      title: "硬管连接和软管连接的主要差异",
      summary:
        "硬管连接更适合尺寸稳定和定位明确的液路结构，软管连接则更适合需要弯曲、缓冲或灵活布管的场景。",
      date: "2026-06-25",
      coverImage:
        "/images/resources/technical-articles/covers/rigid-tubing-vs-flexible-tubing.webp",
      content: [
        {
          title: "硬管与软管的结构特点",
          content:
            "硬管通常具有更好的尺寸稳定性和较低的形变风险，适合对流路路径、体积控制和结构稳定性要求较高的设备。常见硬管材料包括 PEEK、PTFE、PFA 等。软管则具有更好的柔韧性，适合空间受限、需要弯曲布管或存在一定振动的应用。",
        },
        {
          title: "选型需要结合安装空间和维护方式",
          content:
            "选择硬管还是软管，需要结合设备结构、流体压力、安装空间和维护方式判断。硬管连接通常对切口平整度、插入深度和密封结构要求更高；软管连接则需要关注管材弹性、夹持力和长期使用后的老化风险。",
        },
      ],
    },
    {
      id: "common-fitting-sealing-failure-causes",
      slug: "common-fitting-sealing-failure-causes",
      category: "fittings-tubing",
      title: "接头密封失效的常见原因",
      summary:
        "接头漏液不一定是接头本身问题，也可能与管材尺寸、安装方式、切管质量、密封件状态和系统压力有关。",
      date: "2026-06-22",
      coverImage:
        "/images/resources/technical-articles/covers/common-fitting-sealing-failure-causes.webp",
      content: [
        {
          title: "常见密封失效原因",
          content:
            "在液路系统中，接头密封失效常见原因包括管材尺寸不匹配、管口切割不平整、插入深度不足、螺纹未锁紧、密封件损伤、材料不兼容以及系统压力超过使用范围等。对于微流体系统来说，即使是很小的装配误差，也可能导致漏液、气泡进入或流量不稳定。",
        },
        {
          title: "排查时建议的顺序",
          content:
            "排查漏液问题时，建议先确认管材规格和接头规格是否匹配，再检查管口是否平整、密封件是否完好、连接处是否有偏斜或松动。如果系统中存在腐蚀性介质或清洗剂，也需要确认材料是否长期兼容。",
        },
      ],
    },
    {
      id: "micro-plunger-pump-selection",
      slug: "micro-plunger-pump-selection",
      category: "pumps-valves",
      title: "精密柱塞泵是什么？工作原理、优势与应用介绍",
      summary:
        "了解精密柱塞泵的工作原理、主要优势、应用场景及基础选型方法，并认识FOREACH EA、SM和TM柱塞泵系列。",
      date: "2026-06-19",
      coverImage:
        "/images/resources/technical-articles/piston-pump/micro-plunger-pump-selection-cover.webp",
      coverAlt: "FOREACH TM系列超微型精密柱塞泵实物图",
      content: [
        {
          title: "精密柱塞泵如何工作",
          content:
            "精密柱塞泵利用柱塞往复运动完成液体吸取、计量和分配。完整正文由精密柱塞泵技术文章组件渲染。",
        },
        {
          title: "FOREACH柱塞泵系列与选型",
          content:
            "文章介绍EA、SM、TM系列，并从工作液量、准确性、重复性、介质、压力、接口、安装和控制等方面说明基础选型方法。",
        },
      ],
      seoTitle: "精密柱塞泵是什么？工作原理、应用与选型 | FOREACH",
      seoDescription:
        "了解精密柱塞泵的工作原理、主要优势、应用场景及基础选型方法，并认识FOREACH EA、SM和TM柱塞泵系列。",
    },
    {
      id: "solenoid-valves-in-microfluidic-systems",
      slug: "solenoid-valves-in-microfluidic-systems",
      category: "pumps-valves",
      title: "电磁阀在微流体系统中的作用",
      summary:
        "电磁阀用于控制流路通断、切换和分配，是液路系统中实现自动化控制的重要部件。",
      date: "2026-06-16",
      coverImage:
        "/images/resources/technical-articles/covers/solenoid-valves-in-microfluidic-systems.webp",
      content: [
        {
          title: "电磁阀承担流路控制功能",
          content:
            "在微流体系统中，电磁阀常用于控制试剂通断、清洗液切换、废液排放、气液路径切换等功能。根据结构不同，电磁阀可以实现二通、三通或更多复杂流路控制。不同应用场景对阀的响应速度、密封材料、耐腐蚀性和寿命要求不同。",
        },
        {
          title: "选型时关注通道、压力和材料",
          content:
            "选型时，需要确认阀的通道形式、孔径、工作压力、介质类型和密封材料。如果介质具有腐蚀性、结晶风险或颗粒杂质，还需要进一步评估阀体材料和长期使用稳定性。",
        },
      ],
    },
    {
      id: "material-compatibility-table-reference",
      slug: "material-compatibility-table-reference",
      category: "materials-compatibility",
      title: "材料兼容表可以作为最终选型依据吗",
      summary:
        "材料兼容表适合作为初步筛选工具，但不能完全替代实际工况验证。最终选型仍需结合温度、浓度、压力和接触时间判断。",
      date: "2026-06-13",
      coverImage:
        "/images/resources/technical-articles/covers/material-compatibility-table-reference.webp",
      content: [
        {
          title: "材料兼容表适合做初筛",
          content:
            "材料兼容表通常基于常见材料与典型化学介质的兼容性经验，用于帮助客户快速排除明显不适用的材料方向。但实际应用中，液体成分可能是混合体系，且温度、浓度、压力、接触时间和清洗方式都会影响材料表现。",
        },
        {
          title: "复杂工况建议进一步确认",
          content:
            "因此，材料兼容表更适合用于前期判断，而不是最终结论。对于复杂溶剂、高浓度试剂、长期浸泡或高温高压环境，建议提供具体介质信息，由技术团队结合实际应用进一步确认，必要时进行样品测试。",
        },
      ],
    },
    {
      id: "ivd-fluidic-system-selection-parameters",
      slug: "ivd-fluidic-system-selection-parameters",
      category: "applications",
      title: "IVD 设备中液路系统选型需要关注哪些参数",
      summary:
        "IVD 设备液路系统通常需要兼顾精度、稳定性、洁净度、材料兼容和长期维护成本。单个零部件的选择会影响整机液路表现。",
      date: "2026-06-10",
      coverImage:
        "/images/resources/technical-articles/covers/ivd-fluidic-system-selection-parameters.webp",
      content: [
        {
          title: "液路系统由多个部件协同组成",
          content:
            "IVD 设备中的液路系统通常包含泵、阀、管路、接头、针、传感器等多个部件。不同部件之间需要形成稳定配合，才能保证吸液、分配、清洗、反应和废液排放等流程的可靠运行。选型时不能只看单一产品参数，还需要考虑系统整体流路设计。",
        },
        {
          title: "关注参数和长期供应能力",
          content:
            "常见关注点包括分配精度、重复性、材料兼容、气泡控制、死体积、清洗残留、接口一致性和长期使用寿命。对于批量化设备，产品一致性、供应稳定性和技术支持能力同样重要。",
        },
      ],
    },
    {
      id: "pressure-flow-material-compatibility",
      slug: "pressure-flow-material-compatibility",
      category: "applications",
      title: "如何理解液路系统中的耐压、流量与材料兼容",
      summary:
        "耐压、流量和材料兼容是液路系统设计中的三个核心因素，它们相互影响，不能单独判断。",
      date: "2026-06-07",
      coverImage:
        "/images/resources/technical-articles/covers/pressure-flow-material-compatibility.webp",
      content: [
        {
          title: "三个因素需要一起判断",
          content:
            "耐压决定了系统在运行过程中能够承受的压力范围，流量决定了液体输送效率和响应速度，材料兼容则决定了部件与介质长期接触时是否稳定。一个液路系统即使单个部件参数合格，也需要确认整体连接后的系统表现。",
        },
        {
          title: "系统选型不是单点参数最大化",
          content:
            "例如，高流量可能带来更高压力波动，压力升高又会对接头密封、管材强度和泵阀稳定性提出更高要求。如果介质具有腐蚀性，还需要确认所有接液材料是否兼容。液路系统选型的核心不是单点参数最大化，而是让各个部件在实际工况下稳定协同。",
        },
      ],
    },
    {
      id: "why-application-context-matters",
      slug: "why-application-context-matters",
      category: "applications",
      title: "为什么微流体产品选型需要结合应用场景",
      summary:
        "同样的产品在不同应用场景下可能表现不同，因此微流体产品选型必须结合介质、压力、精度、安装空间和维护方式综合判断。",
      date: "2026-06-04",
      coverImage:
        "/images/resources/technical-articles/covers/why-application-context-matters.webp",
      content: [
        {
          title: "不同应用对产品要求不同",
          content:
            "微流体产品广泛应用于 IVD、生命科学、环保监测、分析仪器和实验室自动化等领域。不同场景对产品的要求不同，例如 IVD 设备更关注长期稳定性和批量一致性，分析仪器更关注材料兼容和低残留，实验室自动化设备更关注模块化安装和维护便利性。",
        },
        {
          title: "需求信息越完整，选型越准确",
          content:
            "因此，产品选型不能只看型号或单一参数。客户在提交选型需求时，建议提供使用介质、压力范围、流量范围、连接方式、安装空间和目标应用场景。信息越完整，越容易匹配到合适的产品方案。",
        },
      ],
    },
    {
      id: "fitting-replacement-by-drawings-or-samples",
      slug: "fitting-replacement-by-drawings-or-samples",
      category: "fittings-tubing",
      title: "如何根据图纸或样品进行接头替代选型",
      summary:
        "接头替代选型不仅要看外形尺寸，还要确认接口规格、密封方式、材料、耐压和实际应用条件。",
      date: "2026-06-01",
      coverImage:
        "/images/resources/technical-articles/covers/fitting-replacement-by-drawings-or-samples.webp",
      content: [
        {
          title: "替代选型不能只看外形",
          content:
            "在设备维护、国产替代或供应链优化过程中，客户经常需要根据现有样品或图纸寻找可替代接头。此时需要确认的不只是外形尺寸，还包括螺纹规格、管材尺寸、密封结构、接液材料和使用压力。",
        },
        {
          title: "建议提供图纸、样品和应用条件",
          content:
            "如果只有样品，建议提供清晰照片、关键尺寸、使用管材和介质信息。如果有图纸，建议同时提供接口尺寸、公差要求和安装环境。恒永达可根据这些信息进行初步匹配，并结合实际应用条件确认是否适合作为替代方案。",
        },
      ],
    },
  ],

  bottomBanner: {
    title: "需要进一步确认产品选型或应用条件？",
    description:
      "您可以提交具体介质、压力、管路尺寸、应用场景或图纸信息，由恒永达协助进行产品匹配与技术确认。",
    actions: [
      {
        label: "联系我们",
        href: "/contact",
      },
    ],
  },
};
