/* =========================================================
   analytical-instruments-application.zh.ts
   恒永达官网｜分析仪器应用领域中文数据
========================================================= */

import type { AnalyticalInstrumentsApplicationPageData } from "./analytical-instruments-application.types";

export const analyticalInstrumentsApplicationZhData: AnalyticalInstrumentsApplicationPageData = {
  breadcrumb: [
    { label: "首页", href: "/" },
    { label: "应用领域" },
    { label: "分析仪器" },
  ],

  hero: {
    title: "面向分析检测设备的",
    highlight: "精密液路控制方案",
    description: "服务进样、试剂、清洗、排废与低残留液路场景。",
    panelTitle: "",
    panelItems: [],
  },

  applicationSection: {
    title: "分析仪器类型",
    description:
      "选择具体分析仪器应用后，下方内容会同步展示该场景的液路关注重点、关键部位和对应产品能力。",
  },

  focusKicker: "当前仪器关注重点",

  moduleSection: {
    title: "关键液路部位与产品能力",
    description:
      "选择液路部位后，只展示该部位相关产品。点击产品可展开参数、优势和解决问题。",
  },

  cta: {
    title: "有分析仪器设备液路设计或国产替代需求？",
    description:
      "可提交分析仪器类型、液体介质、目标流量、压力范围、管路尺寸、空间限制和当前问题，由恒永达工程团队协助评估泵阀管路组合、材料兼容性与分析液路集成方案。",
    buttonLabel: "提交应用需求",
    href: "/contact",
  },

  productHref: "/products",
  contactHref: "/contact",

  products: {
    syringePump: {
      name: "注射泵",
      ability: "样品吸取、定量进样与精密推出控制",
      params: ["25 μL–25 mL", "30 / 60 mm 行程", "1–8 通道", "分配误差 ≤1%", "压力 0.4 MPa", "可级联 16 台"],
      advantage:
        "适合样品吸取、自动进样、试剂转移和小体积定量分配等需要“吸取—保持—推出”完整动作控制的场景。",
      solves:
        "用于降低进样体积偏差、小体积吸取不稳定、多通道转移不一致和空吸后动作失控等问题。",
    },

    pistonPump: {
      name: "柱塞泵",
      ability: "试剂、流动相、清洗液的重复定量分配",
      params: ["50 μL–20 mL", "ACC＜0.5%", "CV＜0.5%", "压力 0.3 MPa", "寿命 500 万次", "1/4-28 UNF / M6"],
      advantage:
        "适合试剂、缓冲液、清洗液、标定液和部分流动相的重复定量加入，重点用于需要体积一致和长期稳定运行的位置。",
      solves:
        "用于减少重复分配波动、长期运行后分配量漂移和不同批次加液量不一致等问题。",
    },

    sampleNeedle: {
      name: "进样针 / 取样针",
      ability: "样品取样前端与液面接触位置控制",
      params: ["适配样品吸取", "可配合液位检测", "支持定制化沟通"],
      advantage:
        "用于样品瓶、样品杯、试管、孔板和反应腔等取样前端，可与注射泵、液位检测和清洗结构配合。",
      solves:
        "用于改善取样位置偏差、挂液残留、针外壁污染、吸样深度不稳定和不同容器适配困难等问题。",
    },

    solenoidValve: {
      name: "电磁阀",
      ability: "样品、试剂、清洗液与废液通道的快速通断控制",
      params: ["二通 / 三通", "CV 0.03", "-75 kPa–0.25 MPa", "响应时间 ≤30 ms", "EPDM / FKM / FFKM"],
      advantage:
        "适合样品液、试剂液、清洗液、废液和气液混合路径的快速开关控制，可根据介质特性选择密封材料。",
      solves:
        "用于减少路径误通、阀位不稳定、通断响应慢和介质兼容不足导致的漏液、残留和污染风险。",
    },

    rotaryValve: {
      name: "旋转阀",
      ability: "多样品、多试剂、多清洗液路径集中切换",
      params: ["10 / 12 / 24 通", "寿命 100 万次", "适合多路径集中管理"],
      advantage:
        "适合多样品、多试剂、多清洗液、多标定液和多废液路径集中管理，可减少复杂阀组数量。",
      solves:
        "用于降低多路径液路连接复杂度、减少接头数量、降低误接风险，并节省设备内部空间。",
    },

    pinchValve: {
      name: "夹管阀",
      ability: "软管液路的非接触式通断控制",
      params: ["2 位 3 通", "响应时间 ≤200 ms", "压力 ≤150 kPa"],
      advantage:
        "适合清洗液、废液、低压样品路径或污染控制要求较高的软管液路，液体只接触软管，不直接接触阀体。",
      solves:
        "用于降低液体污染阀体、腐蚀阀体、阀腔残留和维护复杂度，便于软管维护和更换。",
    },

    diaphragmPump: {
      name: "隔膜泵",
      ability: "清洗液输送、废液抽排与较大流量液体搬运",
      params: ["300 / 600 mL/min", "自吸 6 mH₂O / 3 mH₂O", "压力 100 kPa", "无刷电机寿命 10000 h"],
      advantage:
        "适合清洗液供给、样品液转移、废液抽排、管路冲洗和在线监测设备中的长期液体搬运位置。",
      solves:
        "用于改善清洗液供给不足、废液排放不彻底、自吸不稳定和长时间运行后流量衰减等问题。",
    },

    fittingsTubing: {
      name: "接头与管材",
      ability: "泵、阀、针、传感器之间的连接密封与材料适配",
      params: ["管外径 1.6–19.0 mm", "NPT / UNF", "Q20 / Q40 / Q60", "鲁尔接头", "PTFE / PFA / FEP / PEEK"],
      advantage:
        "适合分析仪器内部管路连接、转接、密封和不同材料适配，可根据管径、压力、溶剂兼容性、死体积要求和维护方式选择。",
      solves:
        "用于降低接头漏液、管路松脱、死体积偏大、材料不兼容、样品残留和拆装维护困难等问题。",
    },

    sensors: {
      name: "压力 / 液位 / 气泡检测",
      ability: "关键液路状态识别与异常反馈",
      params: ["压力 ≤2000 kPa", "液位 1 fF / 50 μL / 1 ms", "气泡检测管外径 1.6–6.4 mm", "电导率 0.01–5 μS/cm"],
      advantage:
        "用于样品液、试剂液、清洗液、标定液和废液通道的状态监测，可识别空吸、气泡、堵塞、液位不足和压力波动。",
      solves:
        "用于减少进样、分配、清洗、排废和路径切换过程中因气泡、堵塞、空吸造成的流程异常。",
    },

    checkFilter: {
      name: "止回阀 / 过滤器",
      ability: "防回流、颗粒过滤与关键液路保护",
      params: ["适配防回流场景", "适配过滤场景", "可配合接头管材使用"],
      advantage:
        "可布置在样品路径、试剂路径、清洗路径和废液路径关键位置，用于减少回流、颗粒进入和液路污染风险。",
      solves:
        "用于降低液体回流、颗粒堵塞、杂质进入泵阀和异常污染对分析系统稳定性的影响。",
    },
  },

  applications: [
    {
      key: "chromatography",
      index: "01",
      title: "色谱 / 自动进样系统",
      summary: "样品进样、溶剂切换、清洗排废与低残留流路。",
      focusTitle: "样品进样、溶剂切换与低残留清洗液路",
      focusSummary:
        "色谱和自动进样系统通常需要完成样品吸取、进样、溶剂切换、针路清洗、废液排放和多样品路径管理。液路系统需要重点控制进样重复性、低残留、耐溶剂、低死体积和长期运行稳定性。",
      focusPoints: [
        "样品进样重复性、低死体积和低残留控制",
        "溶剂、流动相和清洗液路径切换稳定性",
        "耐有机溶剂、密封可靠与材料兼容",
        "气泡、堵塞、压力波动和废液排放异常识别",
      ],
      modules: [
        {
          key: "injection",
          index: "01",
          navLabel: "样品进样",
          navSubtitle: "样品吸取 / 定量进样 / 低残留",
          title: "样品进样",
          description:
            "用于样品瓶、样品杯、孔板或进样位之间的样品吸取与定量进样，重点关注进样体积重复性、低残留、低死体积和针路污染控制。",
          tags: ["定量进样", "低残留", "低死体积", "重复一致性"],
          products: ["syringePump", "sampleNeedle", "sensors"],
        },
        {
          key: "solvent",
          index: "02",
          navLabel: "溶剂切换",
          navSubtitle: "流动相 / 清洗液 / 废液",
          title: "溶剂与清洗路径切换",
          description:
            "用于流动相、清洗液、冲洗液、废液和不同样品路径之间的切换，重点关注耐溶剂、路径防误通、阀位稳定和残留控制。",
          tags: ["溶剂切换", "路径防误通", "耐溶剂", "残留控制"],
          products: ["rotaryValve", "solenoidValve", "fittingsTubing"],
        },
        {
          key: "wash",
          index: "03",
          navLabel: "针路清洗",
          navSubtitle: "清洗液 / 残留 / 废液抽排",
          title: "针路清洗",
          description:
            "用于进样针内外壁清洗、管路冲洗和废液抽排，重点降低样品残留、交叉污染和长期运行中的清洗维护难度。",
          tags: ["针路清洗", "残留控制", "废液抽排", "维护效率"],
          products: ["diaphragmPump", "solenoidValve", "sensors"],
        },
        {
          key: "connection",
          index: "04",
          navLabel: "低残留连接",
          navSubtitle: "低死体积 / 密封 / 材料兼容",
          title: "低残留连接",
          description:
            "用于泵、阀、针、传感器和分析流路之间的连接，重点关注低死体积、材料耐受、密封可靠和拆装维护便利。",
          tags: ["低死体积", "材料兼容", "密封连接", "维护便利"],
          products: ["fittingsTubing", "checkFilter", "sensors"],
        },
      ],
    },

    {
      key: "spectroscopy",
      index: "02",
      title: "光谱 / 元素分析仪器",
      summary: "样品输送、试剂加入、清洗与废液排放。",
      focusTitle: "样品输送、试剂加入与清洗排废液路",
      focusSummary:
        "光谱、元素分析和理化分析设备常涉及样品输送、试剂加入、反应混合、雾化前供液、清洗和废液排放。液路系统需要兼顾定量分配、介质兼容、清洗效率和异常状态反馈。",
      focusPoints: [
        "样品液、试剂液和缓冲液稳定输送",
        "反应液、清洗液和废液路径快速切换",
        "酸碱、有机溶剂等介质下的材料兼容",
        "液位、气泡、堵塞和压力状态识别",
      ],
      modules: [
        {
          key: "sampling",
          index: "01",
          navLabel: "样品输送",
          navSubtitle: "样品液 / 试剂液 / 反应液",
          title: "样品输送",
          description:
            "用于样品液、试剂液和反应液在样品池、反应腔、雾化前端或检测模块之间的输送，重点关注流量稳定、介质兼容和进液一致性。",
          tags: ["样品输送", "流量稳定", "介质兼容", "进液一致"],
          products: ["syringePump", "pistonPump", "solenoidValve", "sensors"],
        },
        {
          key: "reagent",
          index: "02",
          navLabel: "试剂加入",
          navSubtitle: "试剂 / 缓冲液 / 标定液",
          title: "试剂加入",
          description:
            "用于分析试剂、缓冲液、标定液和清洗液的定量加入，重点关注重复分配一致性、长期运行稳定和不同介质下的密封可靠。",
          tags: ["试剂定量", "标定液", "重复分配", "密封可靠"],
          products: ["pistonPump", "syringePump", "solenoidValve"],
        },
        {
          key: "switching",
          index: "03",
          navLabel: "路径切换",
          navSubtitle: "样品 / 试剂 / 清洗 / 废液",
          title: "路径切换",
          description:
            "用于样品、试剂、清洗液、标定液和废液路径之间的切换，重点降低路径误通、残留污染和多通道连接复杂度。",
          tags: ["多路径切换", "防误通", "残留控制", "空间紧凑"],
          products: ["rotaryValve", "solenoidValve", "pinchValve"],
        },
      ],
    },

    {
      key: "waterQuality",
      index: "03",
      title: "水质 / 环境监测设备",
      summary: "取样、试剂分配、反应检测、清洗与排废。",
      focusTitle: "水样取样、试剂分配、反应检测与排废液路",
      focusSummary:
        "水质和环境监测设备通常需要完成水样取样、试剂定量加入、反应液混合、清洗、标定液切换和废液排放。液路系统重点关注长期在线运行、抗污染、试剂兼容和维护便利。",
      focusPoints: [
        "水样、标定液和试剂的长期稳定取送",
        "多试剂路径切换、反应液混合和清洗排废",
        "颗粒、沉积、腐蚀介质下的液路保护",
        "液位、堵塞、气泡和排废异常状态识别",
      ],
      modules: [
        {
          key: "sampling",
          index: "01",
          navLabel: "水样取样",
          navSubtitle: "水样 / 标定液 / 长期在线",
          title: "水样取样",
          description:
            "用于水样、标定液和清洗液在取样口、反应单元和检测单元之间的输送，重点关注长期在线运行和抗污染能力。",
          tags: ["水样取样", "长期在线", "抗污染", "取送稳定"],
          products: ["diaphragmPump", "pistonPump", "sensors"],
        },
        {
          key: "reagent",
          index: "02",
          navLabel: "试剂分配",
          navSubtitle: "试剂 / 标定液 / 反应液",
          title: "试剂分配",
          description:
            "用于检测反应中的试剂、标定液、缓冲液和清洗液定量加入，重点关注重复分配一致性和介质兼容。",
          tags: ["试剂定量", "标定液", "反应液", "重复一致"],
          products: ["pistonPump", "syringePump", "solenoidValve"],
        },
        {
          key: "protection",
          index: "03",
          navLabel: "液路保护",
          navSubtitle: "过滤 / 防回流 / 防堵塞",
          title: "液路保护",
          description:
            "用于水样路径、试剂路径和废液路径关键位置，重点降低颗粒堵塞、回流和沉积污染对系统稳定性的影响。",
          tags: ["颗粒过滤", "防回流", "防堵塞", "系统保护"],
          products: ["checkFilter", "fittingsTubing", "sensors"],
        },
      ],
    },

    {
      key: "samplePrep",
      index: "04",
      title: "样品前处理设备",
      summary: "稀释、萃取、混合、过滤与多路径液路控制。",
      focusTitle: "稀释、萃取、混合、过滤与样品前处理液路",
      focusSummary:
        "样品前处理设备通常需要完成样品稀释、试剂加入、萃取、混合、过滤、转移和废液排放。液路系统重点关注路径切换、材料兼容、低残留、过滤保护和批量处理一致性。",
      focusPoints: [
        "样品稀释、试剂加入和重复分配一致性",
        "萃取、混合、转移和过滤路径控制",
        "低残留、耐腐蚀和低死体积连接",
        "过滤保护、堵塞判断和压力反馈",
      ],
      modules: [
        {
          key: "dilution",
          index: "01",
          navLabel: "稀释分配",
          navSubtitle: "样品 / 试剂 / 定量加入",
          title: "稀释分配",
          description:
            "用于样品稀释、试剂加入和缓冲液分配，重点关注定量一致性、混合前后残留控制和流程重复性。",
          tags: ["样品稀释", "试剂加入", "定量一致", "低残留"],
          products: ["syringePump", "pistonPump", "solenoidValve"],
        },
        {
          key: "extraction",
          index: "02",
          navLabel: "萃取转移",
          navSubtitle: "萃取 / 混合 / 转移",
          title: "萃取转移",
          description:
            "用于萃取液、样品液和反应液在不同容器之间的转移与路径切换，重点关注介质兼容、低吸附和转移稳定。",
          tags: ["萃取转移", "混合流程", "介质兼容", "转移稳定"],
          products: ["syringePump", "rotaryValve", "fittingsTubing"],
        },
        {
          key: "filtration",
          index: "03",
          navLabel: "过滤保护",
          navSubtitle: "过滤 / 防堵 / 压力反馈",
          title: "过滤保护",
          description:
            "用于前处理液路中的颗粒过滤、防堵保护和压力反馈，重点降低颗粒进入泵阀和后端检测模块的风险。",
          tags: ["过滤保护", "防堵", "压力反馈", "系统稳定"],
          products: ["checkFilter", "sensors", "fittingsTubing"],
        },
      ],
    },

    {
      key: "labAnalyzer",
      index: "05",
      title: "实验室分析系统集成",
      summary: "多模块、多试剂、多检测路径的液路系统集成。",
      focusTitle: "多模块、多试剂与多检测路径液路系统集成",
      focusSummary:
        "实验室分析系统集成通常涉及多泵、多阀、多试剂瓶、多个检测模块和多废液路径组合。液路设计重点在于路径管理、空间布局、模块化维护、材料兼容和状态监测。",
      focusPoints: [
        "多试剂、多清洗、多废液路径集中管理",
        "泵、阀、传感器、接头与管材模块化集成",
        "复杂介质下的密封、材料兼容和维护便利",
        "空吸、气泡、堵塞、压力和液位异常反馈",
      ],
      modules: [
        {
          key: "pathManagement",
          index: "01",
          navLabel: "路径管理",
          navSubtitle: "多样品 / 多试剂 / 多废液",
          title: "路径管理",
          description:
            "用于多样品、多试剂、多清洗液和多废液路径的集中管理，重点关注路径切换稳定、空间紧凑和误通风险控制。",
          tags: ["多路径", "多试剂", "防误通", "空间紧凑"],
          products: ["rotaryValve", "solenoidValve", "pinchValve"],
        },
        {
          key: "fluidDrive",
          index: "02",
          navLabel: "液体驱动",
          navSubtitle: "进样 / 分配 / 清洗 / 排废",
          title: "液体驱动",
          description:
            "用于系统中不同功能模块的液体驱动，包括样品进样、试剂分配、清洗液输送和废液抽排，重点关注各类泵的组合使用。",
          tags: ["样品进样", "试剂分配", "清洗输送", "废液抽排"],
          products: ["syringePump", "pistonPump", "diaphragmPump"],
        },
        {
          key: "moduleConnection",
          index: "03",
          navLabel: "模块化连接",
          navSubtitle: "泵阀管路 / 快速维护 / 密封",
          title: "模块化连接",
          description:
            "用于泵、阀、针、传感器、试剂瓶、清洗液瓶、废液瓶和检测模块之间的管路连接，重点关注快速维护、密封可靠、材料兼容和低死体积。",
          tags: ["模块化连接", "快速维护", "密封可靠", "低死体积"],
          products: ["fittingsTubing", "checkFilter", "sensors"],
        },
      ],
    },
  ],
};
