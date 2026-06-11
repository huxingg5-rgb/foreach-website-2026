/* =========================================================
   synthetic-biology-application.zh.ts
   恒永达官网｜合成生物应用领域中文数据
========================================================= */

import type { SyntheticBiologyApplicationPageData } from "./synthetic-biology-application.types";

export const syntheticBiologyApplicationZhData: SyntheticBiologyApplicationPageData = {
  breadcrumb: [
    { label: "首页", href: "/" },
    { label: "应用领域" },
    { label: "合成生物" },
  ],

  hero: {
    title: "面向合成生物系统的",
    highlight: "稳定液路控制方案",
    description: "服务补料、取样、排液、清洗与过程状态监测场景。",
    panelTitle: "",
    panelItems: [],
  },

  applicationSection: {
    title: "合成生物类型",
    description:
      "选择具体合成生物应用后，下方内容会同步展示该场景的液路关注重点、关键部位和对应产品能力。",
  },

  focusKicker: "当前设备关注重点",

  moduleSection: {
    title: "关键液路部位与产品能力",
    description:
      "选择液路部位后，只展示该部位相关产品。点击产品可展开参数、优势和解决问题。",
  },

  cta: {
    title: "有合成生物设备液路设计或国产替代需求？",
    description:
      "可提交合成生物类型、液体介质、目标流量、压力范围、管路尺寸、空间限制和当前问题，由恒永达工程团队协助评估泵阀管路组合、材料兼容性与合成生物液路方案。",
    buttonLabel: "提交应用需求",
    href: "/contact",
  },

  productHref: "/products",
  contactHref: "/contact",

  products: {
    syringePump: {
      name: "注射泵",
      ability: "微量取样、定量转移与精密推出控制",
      params: ["25 μL–25 mL", "30 / 60 mm 行程", "1–8 通道", "分配误差 ≤1%", "压力 0.4 MPa", "可级联 16 台"],
      advantage:
        "适合在线取样、样品转移、诱导剂加入、小体积试剂分配和高通量筛选中的微量液体处理，可实现“吸取—保持—推出”的完整动作控制。",
      solves:
        "用于降低微量取样偏差、不同通道转移不一致、空吸后动作失控和样品损失等问题。",
    },

    pistonPump: {
      name: "柱塞泵",
      ability: "培养基、诱导剂、缓冲液和添加液的重复定量补加",
      params: ["50 μL–20 mL", "ACC＜0.5%", "CV＜0.5%", "压力 0.3 MPa", "寿命 500 万次", "1/4-28 UNF / M6"],
      advantage:
        "适合培养基、碳源、诱导剂、pH 调节液、缓冲液和清洗液的重复定量加入，重点用于需要长期稳定和体积一致的补料位置。",
      solves:
        "用于减少长周期运行中的补料波动、不同批次加液量不一致和培养过程控制稳定性下降等问题。",
    },

    sampleNeedle: {
      name: "取样针 / 加液针",
      ability: "取样与加液前端位置控制",
      params: ["适配样品吸取", "可配合液位检测", "支持定制化沟通"],
      advantage:
        "用于培养容器、反应腔、孔板、试剂瓶和样品管等取样与加液前端，可与注射泵、液位检测和清洗结构配合。",
      solves:
        "用于改善取样位置偏差、挂液残留、针外壁污染、吸样深度不稳定和不同容器适配困难等问题。",
    },

    solenoidValve: {
      name: "电磁阀",
      ability: "培养基、缓冲液、清洗液与废液通道的快速通断控制",
      params: ["二通 / 三通", "CV 0.03", "-75 kPa–0.25 MPa", "响应时间 ≤30 ms", "EPDM / FKM / FFKM"],
      advantage:
        "适合培养基、缓冲液、诱导剂、清洗液、废液和气液混合路径的快速开关控制，可根据介质特性选择密封材料。",
      solves:
        "用于减少路径误通、阀位不稳定、通断响应慢和介质兼容不足导致的漏液、残留和污染风险。",
    },

    rotaryValve: {
      name: "旋转阀",
      ability: "多补料、多取样、多清洗和多废液路径集中切换",
      params: ["10 / 12 / 24 通", "寿命 100 万次", "适合多路径集中管理"],
      advantage:
        "适合多种培养基、诱导剂、缓冲液、清洗液、取样路径和废液路径集中管理，可减少复杂阀组数量。",
      solves:
        "用于降低多路径液路连接复杂度、减少接头数量、降低误接风险，并节省设备内部空间。",
    },

    pinchValve: {
      name: "夹管阀",
      ability: "软管液路的非接触式通断控制",
      params: ["2 位 3 通", "响应时间 ≤200 ms", "压力 ≤150 kPa"],
      advantage:
        "适合细胞悬液、培养基、清洗液、废液和污染控制要求较高的软管路径，液体只接触软管，不直接接触阀体。",
      solves:
        "用于降低液体污染阀体、腐蚀阀体、阀腔残留和维护复杂度，适合封闭式转移和易维护软管液路。",
    },

    diaphragmPump: {
      name: "隔膜泵",
      ability: "培养基转移、清洗液输送、废液抽排与较大流量搬运",
      params: ["300 / 600 mL/min", "自吸 5 m / 3 m", "压力 100 kPa", "无刷电机寿命 10000 h"],
      advantage:
        "适合培养基转移、清洗液供给、废液抽排、管路冲洗和反应体系排液等需要稳定流量和自吸能力的位置。",
      solves:
        "用于改善补液不足、废液排放不彻底、自吸不稳定、长时间运行后流量衰减和维护频繁等问题。",
    },

    fittingsTubing: {
      name: "接头与管材",
      ability: "泵、阀、针、传感器之间的连接密封与材料适配",
      params: ["管外径 1.6–19.0 mm", "NPT / UNF", "Q20 / Q40 / Q60", "鲁尔接头", "PTFE / PFA / FEP / PEEK"],
      advantage:
        "适合合成生物设备内部管路连接、转接、密封和不同材料适配，可根据管径、压力、介质兼容性、吸附风险、死体积要求和维护方式选择。",
      solves:
        "用于降低接头漏液、管路松脱、死体积偏大、材料不兼容、样品吸附和拆装维护困难等问题。",
    },

    sensors: {
      name: "压力 / 液位 / 气泡检测",
      ability: "关键液路状态识别与异常反馈",
      params: ["压力 ≤2000 kPa", "液位 1 fF / 50 μL / 1 ms", "气泡检测管外径 1.6–6.4 mm", "电导率 0.01–5 μS/cm"],
      advantage:
        "用于培养基、缓冲液、诱导剂、清洗液、样品液和废液通道的状态监测，可识别空吸、气泡、堵塞、液位不足和压力波动。",
      solves:
        "用于减少补料、取样、清洗、排液和路径切换过程中因气泡、堵塞、空吸或液位异常造成的流程中断。",
    },

    checkFilter: {
      name: "止回阀 / 过滤器",
      ability: "防回流、颗粒过滤与关键液路保护",
      params: ["适配防回流场景", "适配过滤场景", "可配合接头管材使用"],
      advantage:
        "可布置在补料路径、取样路径、清洗路径、废液路径和传感器前端，用于减少回流、颗粒进入和液路污染风险。",
      solves:
        "用于降低液体回流、颗粒堵塞、杂质进入泵阀和异常污染对合成生物设备稳定性的影响。",
    },
  },

  applications: [
    {
      key: "microBioreactor",
      index: "01",
      title: "微型生物反应器",
      summary: "补料、取样、排液、清洗与过程状态监测。",
      focusTitle: "补料、取样、排液与过程状态监测液路",
      focusSummary:
        "微型生物反应器通常需要完成培养基补料、诱导剂加入、在线取样、排液、清洗和过程状态监测。液路系统需要重点关注长期运行稳定、低污染风险、介质兼容、管路密封和维护便利。",
      focusPoints: [
        "培养基、诱导剂和缓冲液稳定补加",
        "在线取样、排液和防回流控制",
        "长期运行中的密封、材料兼容和易维护",
        "液位、压力、气泡和堵塞状态识别",
      ],
      modules: [
        {
          key: "feeding",
          index: "01",
          navLabel: "补料加液",
          navSubtitle: "培养基 / 诱导剂 / 缓冲液",
          title: "补料加液",
          description:
            "用于培养基、碳源、诱导剂、缓冲液、pH 调节液和其他添加液的稳定补加，重点关注长周期运行、重复加液一致性和介质兼容。",
          tags: ["稳定补料", "重复加液", "介质兼容", "长期运行"],
          products: ["pistonPump", "syringePump", "solenoidValve"],
        },
        {
          key: "sampling",
          index: "02",
          navLabel: "在线取样",
          navSubtitle: "取样 / 防回流 / 防污染",
          title: "在线取样",
          description:
            "用于生物反应过程中的周期性取样、样本转移和防回流控制，重点关注取样一致性、污染风险和管路维护。",
          tags: ["在线取样", "防回流", "防污染", "维护便利"],
          products: ["syringePump", "sampleNeedle", "checkFilter", "sensors"],
        },
        {
          key: "switching",
          index: "03",
          navLabel: "路径切换",
          navSubtitle: "补料 / 取样 / 清洗 / 废液",
          title: "路径切换",
          description:
            "用于补料、取样、清洗和废液路径之间的切换，重点降低路径误通、残留、死体积和多管路连接复杂度。",
          tags: ["多路径切换", "残留控制", "低死体积", "空间紧凑"],
          products: ["rotaryValve", "solenoidValve", "pinchValve"],
        },
        {
          key: "waste",
          index: "04",
          navLabel: "排液与清洗",
          navSubtitle: "废液抽排 / 管路冲洗 / 自吸",
          title: "排液与清洗",
          description:
            "用于废液抽排、管路冲洗、清洗液供给和维护流程，重点关注自吸能力、排液稳定性和长时间运行可靠性。",
          tags: ["废液抽排", "管路冲洗", "自吸能力", "长期可靠"],
          products: ["diaphragmPump", "solenoidValve", "sensors"],
        },
        {
          key: "monitoring",
          index: "05",
          navLabel: "过程监测",
          navSubtitle: "液位 / 压力 / 气泡 / 堵塞",
          title: "过程监测",
          description:
            "用于补料、取样、排液和清洗过程中的状态识别，重点判断液位、压力、气泡、堵塞和异常流动状态。",
          tags: ["液位检测", "压力反馈", "气泡识别", "堵塞判断"],
          products: ["sensors", "checkFilter"],
        },
      ],
    },

    {
      key: "biofoundry",
      index: "02",
      title: "自动化构建与筛选平台",
      summary: "菌株构建、试剂分配、移液、清洗与高通量筛选。",
      focusTitle: "自动化构建、移液、分液与高通量筛选液路",
      focusSummary:
        "自动化构建与筛选平台通常涉及菌株构建、试剂分配、样品转移、培养体系加液、孔板处理和清洗排废。液路系统需要重点关注微量分配一致性、多通道同步、低残留和高通量运行稳定。",
      focusPoints: [
        "微量移液、试剂分配和多通道同步",
        "孔板加液、清洗和废液抽排稳定性",
        "低残留、低污染和不同试剂路径切换",
        "空吸、液位、气泡和堵针异常识别",
      ],
      modules: [
        {
          key: "pipetting",
          index: "01",
          navLabel: "移液与分液",
          navSubtitle: "试剂 / 样本 / 孔板",
          title: "移液与分液",
          description:
            "用于菌株构建、试剂分配、样品转移、孔板加液和高通量筛选流程，重点关注小体积分配一致性、多通道同步和节拍稳定。",
          tags: ["微量移液", "多通道同步", "小体积一致", "节拍稳定"],
          products: ["syringePump", "pistonPump", "sampleNeedle", "sensors"],
        },
        {
          key: "reagent",
          index: "02",
          navLabel: "试剂分配",
          navSubtitle: "酶液 / 缓冲液 / 添加液",
          title: "试剂分配",
          description:
            "用于酶液、缓冲液、培养基、诱导剂和其他试剂的重复定量分配，重点关注体积一致性、低残留和介质兼容。",
          tags: ["试剂分配", "重复一致", "低残留", "介质兼容"],
          products: ["pistonPump", "syringePump", "solenoidValve"],
        },
        {
          key: "plate",
          index: "03",
          navLabel: "孔板处理",
          navSubtitle: "加液 / 洗板 / 废液",
          title: "孔板处理",
          description:
            "用于孔板加液、洗板、残液抽排和清洗废液处理，重点关注多孔位一致性、残液控制和清洗效率。",
          tags: ["孔板加液", "洗板", "残液抽排", "清洗效率"],
          products: ["sampleNeedle", "diaphragmPump", "sensors"],
        },
        {
          key: "pathManagement",
          index: "04",
          navLabel: "路径管理",
          navSubtitle: "多试剂 / 多清洗 / 废液",
          title: "路径管理",
          description:
            "用于多试剂、多清洗液、多废液路径集中管理，重点减少阀组复杂度、误通风险和维护难度。",
          tags: ["多路径", "防误通", "空间紧凑", "维护便利"],
          products: ["rotaryValve", "solenoidValve", "pinchValve"],
        },
      ],
    },

    {
      key: "feedingControl",
      index: "03",
      title: "补料与培养控制系统",
      summary: "培养基、诱导剂、缓冲液和添加液稳定补加。",
      focusTitle: "培养基、诱导剂、缓冲液与添加液稳定补加液路",
      focusSummary:
        "补料与培养控制系统通常需要对培养基、碳源、诱导剂、缓冲液、pH 调节液和其他添加液进行稳定补加。液路系统需要重点关注长周期运行、分配一致性、介质兼容和防回流保护。",
      focusPoints: [
        "培养基、碳源、诱导剂和调节液稳定补加",
        "长周期运行中的分配一致性和寿命表现",
        "不同介质下的密封、材料兼容和低残留",
        "防回流、液位、压力和堵塞异常反馈",
      ],
      modules: [
        {
          key: "feeding",
          index: "01",
          navLabel: "连续补料",
          navSubtitle: "培养基 / 碳源 / 诱导剂",
          title: "连续补料",
          description:
            "用于培养基、碳源、诱导剂、缓冲液和添加液的稳定补加，重点关注分配一致性、长周期稳定和低维护需求。",
          tags: ["连续补料", "分配一致", "长周期", "低维护"],
          products: ["pistonPump", "solenoidValve", "sensors"],
        },
        {
          key: "switching",
          index: "02",
          navLabel: "介质切换",
          navSubtitle: "培养基 / 缓冲液 / 清洗液",
          title: "介质切换",
          description:
            "用于不同培养基、缓冲液、诱导剂、清洗液和废液路径之间的切换，重点关注路径防误通和残留控制。",
          tags: ["介质切换", "防误通", "残留控制", "阀位稳定"],
          products: ["rotaryValve", "solenoidValve", "fittingsTubing"],
        },
        {
          key: "protection",
          index: "03",
          navLabel: "防回流保护",
          navSubtitle: "止回 / 过滤 / 防污染",
          title: "防回流保护",
          description:
            "用于补料路径、取样路径和传感器前端保护，降低液体回流、颗粒堵塞和污染进入关键元件的风险。",
          tags: ["防回流", "过滤保护", "防污染", "系统保护"],
          products: ["checkFilter", "fittingsTubing", "sensors"],
        },
        {
          key: "monitoring",
          index: "04",
          navLabel: "状态反馈",
          navSubtitle: "液位 / 压力 / 气泡",
          title: "状态反馈",
          description:
            "用于补料、介质切换和排液过程中的液位、压力、气泡和堵塞状态识别，帮助系统判断异常。",
          tags: ["液位", "压力", "气泡", "堵塞"],
          products: ["sensors", "checkFilter"],
        },
      ],
    },

    {
      key: "onlineSampling",
      index: "04",
      title: "在线取样 / 过程分析系统",
      summary: "在线取样、样品转移、过滤保护与分析前处理。",
      focusTitle: "在线取样、过滤保护与过程分析前处理液路",
      focusSummary:
        "在线取样和过程分析系统通常需要从培养体系中周期性取样，并完成样品转移、过滤、稀释、清洗和废液排放。液路系统需要重点关注取样代表性、防污染、防堵保护和分析前处理稳定。",
      focusPoints: [
        "在线取样、样品转移和取样一致性",
        "过滤保护、防回流和污染风险控制",
        "稀释、清洗和废液排放稳定性",
        "堵塞、气泡、液位和压力状态识别",
      ],
      modules: [
        {
          key: "sampling",
          index: "01",
          navLabel: "在线取样",
          navSubtitle: "取样 / 转移 / 代表性",
          title: "在线取样",
          description:
            "用于从培养体系中周期性取样并转移至分析单元，重点关注取样代表性、低污染风险和体积一致性。",
          tags: ["在线取样", "样品代表性", "低污染", "体积一致"],
          products: ["syringePump", "sampleNeedle", "sensors"],
        },
        {
          key: "filtration",
          index: "02",
          navLabel: "过滤保护",
          navSubtitle: "过滤 / 防堵 / 泵阀保护",
          title: "过滤保护",
          description:
            "用于在线取样路径中的过滤、防堵和泵阀前端保护，降低颗粒、细胞团和杂质进入关键元件的风险。",
          tags: ["过滤", "防堵", "泵阀保护", "维护便利"],
          products: ["checkFilter", "fittingsTubing", "sensors"],
        },
        {
          key: "pretreatment",
          index: "03",
          navLabel: "分析前处理",
          navSubtitle: "稀释 / 清洗 / 废液",
          title: "分析前处理",
          description:
            "用于样品稀释、清洗液加入、管路冲洗和废液排放，重点关注前处理稳定性、低残留和排废可靠。",
          tags: ["稀释", "清洗", "废液排放", "低残留"],
          products: ["pistonPump", "diaphragmPump", "solenoidValve"],
        },
        {
          key: "tubeControl",
          index: "04",
          navLabel: "软管通断",
          navSubtitle: "封闭转移 / 防污染",
          title: "软管通断",
          description:
            "用于污染风险较高或维护频繁的软管路径，重点减少液体对阀体污染和腐蚀，适合封闭式转移。",
          tags: ["软管", "封闭转移", "防污染", "易维护"],
          products: ["pinchValve", "fittingsTubing"],
        },
      ],
    },

    {
      key: "bioProcessIntegration",
      index: "05",
      title: "小型生物工艺系统集成",
      summary: "多泵、多阀、多路径液路集成与长期运行维护。",
      focusTitle: "小型生物工艺中的多泵、多阀与多路径液路集成",
      focusSummary:
        "小型生物工艺系统通常涉及多种补料液、取样路径、清洗路径、排液路径和检测模块组合。液路设计重点在于路径管理、空间布局、模块化连接、长期运行稳定和维护便利。",
      focusPoints: [
        "多补料、多取样、多清洗和多废液路径集中管理",
        "泵、阀、传感器、接头与管材模块化集成",
        "紧凑空间内的密封、低死体积和维护便利",
        "液位、气泡、堵塞、压力和排废异常反馈",
      ],
      modules: [
        {
          key: "pathManagement",
          index: "01",
          navLabel: "路径管理",
          navSubtitle: "补料 / 取样 / 清洗 / 废液",
          title: "路径管理",
          description:
            "用于多补料、多取样、多清洗和多废液路径集中管理，重点降低误通风险、减少阀组复杂度并提升维护效率。",
          tags: ["多路径", "防误通", "维护效率", "空间紧凑"],
          products: ["rotaryValve", "solenoidValve", "pinchValve"],
        },
        {
          key: "fluidDrive",
          index: "02",
          navLabel: "液体驱动",
          navSubtitle: "补料 / 取样 / 排液",
          title: "液体驱动",
          description:
            "用于系统中的补料、取样、清洗液输送和废液抽排，重点关注泵型组合和长期运行稳定。",
          tags: ["补料", "取样", "清洗", "排液"],
          products: ["pistonPump", "syringePump", "diaphragmPump"],
        },
        {
          key: "moduleConnection",
          index: "03",
          navLabel: "模块化连接",
          navSubtitle: "泵阀管路 / 密封 / 维护",
          title: "模块化连接",
          description:
            "用于泵、阀、培养容器、试剂瓶、废液瓶、传感器和检测模块之间的管路连接，重点关注密封可靠、材料兼容和快速维护。",
          tags: ["模块化", "密封可靠", "材料兼容", "快速维护"],
          products: ["fittingsTubing", "checkFilter", "sensors"],
        },
        {
          key: "monitoring",
          index: "04",
          navLabel: "异常反馈",
          navSubtitle: "液位 / 气泡 / 压力 / 堵塞",
          title: "异常反馈",
          description:
            "用于长期运行中的液位、气泡、堵塞、压力和排废异常识别，帮助系统快速定位液路问题。",
          tags: ["液位检测", "气泡识别", "压力反馈", "异常定位"],
          products: ["sensors", "checkFilter"],
        },
      ],
    },
  ],
};