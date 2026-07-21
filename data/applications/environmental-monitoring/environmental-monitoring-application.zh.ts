/* =========================================================
   environmental-monitoring-application.zh.ts
   恒永达官网｜环保监测应用领域中文数据
========================================================= */

import type { EnvironmentalMonitoringApplicationPageData } from "./environmental-monitoring-application.types";

export const environmentalMonitoringApplicationZhData: EnvironmentalMonitoringApplicationPageData = {
  breadcrumb: [
    { label: "首页", href: "/" },
    { label: "应用领域" },
    { label: "环保监测" },
  ],

  hero: {
    title: "面向环保监测设备的",
    highlight: "可靠液路控制方案",
    description: "服务取样、试剂、清洗、排废与长期在线监测场景。",
    panelTitle: "",
    panelItems: [],
  },

  applicationSection: {
    title: "环保监测类型",
    description:
      "选择具体环保监测应用后，下方内容会同步展示该场景的液路关注重点、关键部位和对应产品能力。",
  },

  focusKicker: "当前设备关注重点",

  moduleSection: {
    title: "关键液路部位与产品能力",
    description:
      "选择液路部位后，只展示该部位相关产品。点击产品可展开参数、优势和解决问题。",
  },

  cta: {
    title: "有环保设备液路设计或国产替代需求？",
    description:
      "可提交环保类型、液体介质、目标流量、压力范围、管路尺寸、空间限制和当前问题，由恒永达工程团队协助评估泵阀管路组合、材料兼容性与环保监测液路方案。",
    buttonLabel: "提交应用需求",
    href: "/contact",
  },

  productHref: "/products",
  contactHref: "/contact",

  products: {
    syringePump: {
      name: "注射泵",
      ability: "样品、试剂和标定液的精密吸取与定量推出",
      params: ["25 μL–25 mL", "30 / 60 mm 行程", "1–8 通道", "分配误差 ≤1%", "压力 0.4 MPa", "可级联 16 台"],
      advantage:
        "适合水样、标定液、显色试剂、氧化剂和小体积反应液的定量转移，可用于需要“吸取—保持—推出”动作控制的取样和加液位置。",
      solves:
        "用于降低小体积取样偏差、标定液加入不稳定、多通道转移不一致和空吸后动作失控等问题。",
    },

    pistonPump: {
      name: "柱塞泵",
      ability: "试剂、清洗液、标定液的重复定量分配",
      params: ["50 μL–20 mL", "ACC＜0.5%", "CV＜0.5%", "压力 0.3 MPa", "寿命 500 万次", "1/4-28 UNF / M6"],
      advantage:
        "适合显色试剂、缓冲液、清洗液、标定液和常用反应试剂的重复定量加入，重点用于需要长期在线和体积一致的分配位置。",
      solves:
        "用于减少长时间运行后的加液量波动、不同周期分配不一致和在线监测结果重复性下降等问题。",
    },

    sampleNeedle: {
      name: "取样针 / 进样针",
      ability: "水样、标定液和试剂取样前端控制",
      params: ["适配样品吸取", "可配合液位检测", "支持定制化沟通"],
      advantage:
        "用于样品杯、试剂瓶、标定液瓶、反应腔等取样与加液前端，可与注射泵、液位检测和清洗结构配合。",
      solves:
        "用于改善取样位置偏差、挂液残留、针外壁污染、吸样深度不稳定和不同容器适配困难等问题。",
    },

    solenoidValve: {
      name: "电磁阀",
      ability: "水样、试剂、清洗液与废液通道的快速通断控制",
      params: ["二通 / 三通", "CV 0.03", "-75 kPa–0.25 MPa", "响应时间 ≤30 ms", "EPDM / FKM / FFKM"],
      advantage:
        "适合水样、试剂液、标定液、清洗液、废液和气液混合路径的快速开关控制，可根据酸碱、氧化剂和清洗液类型选择密封材料。",
      solves:
        "用于减少路径误通、阀位不稳定、通断响应慢和介质兼容不足导致的漏液、残留、腐蚀和维护风险。",
    },

    rotaryValve: {
      name: "旋转阀",
      ability: "多水样、多试剂、多清洗和多废液路径集中切换",
      params: ["10 / 12 / 24 通", "寿命 100 万次", "适合多路径集中管理"],
      advantage:
        "适合多试剂瓶、标定液、清洗液、反应液和废液路径集中管理，可减少复杂阀组数量。",
      solves:
        "用于降低多路径液路连接复杂度、减少接头数量、降低误接风险，并节省在线监测设备内部空间。",
    },

    pinchValve: {
      name: "夹管阀",
      ability: "软管液路的非接触式通断控制",
      params: ["2 位 3 通", "响应时间 ≤200 ms", "压力 ≤150 kPa"],
      advantage:
        "适合废液、冷凝液、清洗液和污染风险较高的软管路径，液体只接触软管，不直接接触阀体。",
      solves:
        "用于降低液体污染阀体、腐蚀阀体、阀腔残留和维护复杂度，便于现场软管更换和维护。",
    },

    diaphragmPump: {
      name: "隔膜泵",
      ability: "水样取送、清洗液输送、废液抽排与较大流量搬运",
      params: ["300 / 600 mL/min", "自吸 5 m / 3 m", "压力 100 kPa", "无刷电机寿命 10000 h"],
      advantage:
        "适合水样取送、清洗液供给、冷凝液排放、废液抽排和管路冲洗等位置，适合需要自吸和稳定流量的场景。",
      solves:
        "用于改善取样不足、废液排放不彻底、自吸不稳定、长期运行流量衰减和现场维护频繁等问题。",
    },

    fittingsTubing: {
      name: "接头与管材",
      ability: "泵、阀、针、传感器之间的连接密封与材料适配",
      params: ["管外径 1.6–19.0 mm", "NPT / UNF", "Q20 / Q40 / Q60", "鲁尔接头", "PTFE / PFA / FEP / PEEK"],
      advantage:
        "适合环保监测设备内部管路连接、转接、密封和不同材料适配，可根据管径、压力、酸碱介质、氧化剂、死体积要求和维护方式选择。",
      solves:
        "用于降低接头漏液、管路松脱、材料不兼容、腐蚀、沉积残留和拆装维护困难等问题。",
    },

    sensors: {
      name: "压力 / 液位 / 气泡检测",
      ability: "关键液路状态识别与异常反馈",
      params: ["压力 ≤2000 kPa", "液位 1 fF / 50 μL / 1 ms", "气泡检测管外径 1.6–6.4 mm", "电导率 0.01–5 μS/cm"],
      advantage:
        "用于水样、试剂、标定液、清洗液、冷凝液和废液通道的状态监测，可识别空吸、气泡、堵塞、液位不足和压力波动。",
      solves:
        "用于减少取样、加液、反应、清洗和排废过程中因气泡、堵塞、空吸或排废异常造成的监测流程中断。",
    },

    checkFilter: {
      name: "止回阀 / 过滤器",
      ability: "防回流、颗粒过滤与关键液路保护",
      params: ["适配防回流场景", "适配过滤场景", "可配合接头管材使用"],
      advantage:
        "可布置在水样入口、试剂路径、泵阀入口、清洗路径和废液路径关键位置，用于减少回流、颗粒进入和液路污染风险。",
      solves:
        "用于降低液体回流、颗粒堵塞、沉积物进入泵阀和异常污染对在线监测系统稳定性的影响。",
    },
  },

  applications: [
    {
      key: "waterQuality",
      index: "01",
      title: "水质在线监测设备",
      summary: "取样、试剂分配、反应检测、清洗与排废。",
      focusTitle: "水样取样、试剂分配、反应检测与清洗排废液路",
      focusSummary:
        "水质在线监测设备通常需要完成水样取样、试剂定量加入、反应液混合、标定液切换、清洗和废液排放。液路系统需要重点关注长期在线运行、抗污染、试剂兼容、排废稳定和维护便利。",
      focusPoints: [
        "水样、标定液和试剂的长期稳定取送",
        "多试剂定量分配、反应混合和清洗排废",
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
            "用于水样、标定液和质控液的取样与输送，重点关注长期在线运行、颗粒污染、取样稳定和液位异常识别。",
          tags: ["水样取样", "长期在线", "颗粒污染", "液位识别"],
          products: ["diaphragmPump", "syringePump", "checkFilter", "sensors"],
        },
        {
          key: "reagent",
          index: "02",
          navLabel: "试剂分配",
          navSubtitle: "试剂 / 标定液 / 反应液",
          title: "试剂分配",
          description:
            "用于检测项目中的试剂、标定液、显色液和反应液定量加入，重点关注重复分配一致性、试剂兼容和长期运行稳定。",
          tags: ["试剂定量", "标定液", "重复一致", "长期稳定"],
          products: ["pistonPump", "syringePump", "solenoidValve"],
        },
        {
          key: "reaction",
          index: "03",
          navLabel: "反应与切换",
          navSubtitle: "多试剂 / 清洗 / 废液",
          title: "反应与路径切换",
          description:
            "用于多试剂、多清洗液、反应腔和废液路径之间的切换，重点控制路径误通、残留、阀位稳定和空间布局。",
          tags: ["多试剂", "路径切换", "残留控制", "阀位稳定"],
          products: ["rotaryValve", "solenoidValve", "pinchValve"],
        },
        {
          key: "washWaste",
          index: "04",
          navLabel: "清洗排废",
          navSubtitle: "清洗液 / 废液 / 抗污染",
          title: "清洗排废",
          description:
            "用于反应腔清洗、管路冲洗和废液排放，重点关注抗污染、废液抽排稳定性、自吸能力和维护便利。",
          tags: ["清洗排废", "抗污染", "自吸能力", "维护便利"],
          products: ["diaphragmPump", "solenoidValve", "sensors"],
        },
        {
          key: "protection",
          index: "05",
          navLabel: "液路保护",
          navSubtitle: "过滤 / 防回流 / 堵塞判断",
          title: "液路保护",
          description:
            "用于水样入口、试剂路径、泵阀入口和传感器前端保护，重点降低颗粒、沉积、回流和污染对系统稳定性的影响。",
          tags: ["过滤保护", "防回流", "堵塞判断", "系统保护"],
          products: ["checkFilter", "fittingsTubing", "sensors"],
        },
      ],
    },

    {
      key: "wastewater",
      index: "02",
      title: "废水 / 工业过程水监测",
      summary: "复杂水样取送、过滤保护、试剂反应与排液维护。",
      focusTitle: "复杂水样取送、过滤保护与反应排液液路",
      focusSummary:
        "废水和工业过程水监测设备常面对悬浮物、沉积物、腐蚀性介质和现场工况波动。液路系统重点在于取样稳定、过滤保护、防堵维护、试剂反应和长期运行可靠。",
      focusPoints: [
        "复杂水样取送、预过滤和泵阀前端保护",
        "强酸强碱、氧化剂等试剂介质兼容",
        "反应液、清洗液和废液路径稳定切换",
        "堵塞、液位、压力和排废异常识别",
      ],
      modules: [
        {
          key: "sampling",
          index: "01",
          navLabel: "复杂水样取送",
          navSubtitle: "悬浮物 / 沉积 / 长期在线",
          title: "复杂水样取送",
          description:
            "用于工业废水、过程水和含颗粒水样的取样与输送，重点关注自吸能力、抗污染、取样稳定和长期在线运行。",
          tags: ["复杂水样", "自吸能力", "抗污染", "长期在线"],
          products: ["diaphragmPump", "checkFilter", "sensors"],
        },
        {
          key: "filtration",
          index: "02",
          navLabel: "过滤保护",
          navSubtitle: "颗粒 / 防堵 / 泵阀保护",
          title: "过滤保护",
          description:
            "用于颗粒过滤、防堵和泵阀前端保护，重点降低悬浮物、沉积物和杂质进入关键液路元件的风险。",
          tags: ["颗粒过滤", "防堵", "泵阀保护", "维护便利"],
          products: ["checkFilter", "fittingsTubing", "sensors"],
        },
        {
          key: "reagent",
          index: "03",
          navLabel: "试剂反应",
          navSubtitle: "酸碱 / 氧化剂 / 显色液",
          title: "试剂反应",
          description:
            "用于酸碱试剂、氧化剂、显色液和反应液的定量加入与路径控制，重点关注介质兼容和分配一致性。",
          tags: ["酸碱试剂", "氧化剂", "定量分配", "材料兼容"],
          products: ["pistonPump", "syringePump", "solenoidValve"],
        },
        {
          key: "drainage",
          index: "04",
          navLabel: "排液维护",
          navSubtitle: "废液 / 清洗 / 防堵",
          title: "排液维护",
          description:
            "用于反应后废液、清洗液和污染液体排放，重点关注排废稳定、自吸能力、防堵维护和现场更换便利。",
          tags: ["废液排放", "防堵维护", "自吸能力", "现场维护"],
          products: ["diaphragmPump", "pinchValve", "sensors"],
        },
      ],
    },

    {
      key: "gasPretreatment",
      index: "03",
      title: "烟气 / 气体预处理设备",
      summary: "冷凝液排放、吸收液输送、清洗与防堵保护。",
      focusTitle: "烟气预处理中的冷凝液、吸收液与清洗排液液路",
      focusSummary:
        "烟气和气体预处理设备通常涉及冷凝液排放、吸收液输送、清洗液供给、排液维护和防堵保护。液路系统重点在于耐腐蚀、抗污染、自吸排液、长期运行和维护便利。",
      focusPoints: [
        "冷凝液、吸收液和清洗液稳定输送",
        "低压软管路径通断与废液排放控制",
        "酸性冷凝液和污染介质下的材料兼容",
        "堵塞、液位、气泡和排液异常反馈",
      ],
      modules: [
        {
          key: "condensate",
          index: "01",
          navLabel: "冷凝液排放",
          navSubtitle: "冷凝液 / 酸性液 / 自吸",
          title: "冷凝液排放",
          description:
            "用于烟气预处理中的冷凝液、酸性冷凝液和污染液体排放，重点关注自吸能力、耐腐蚀和长期运行可靠性。",
          tags: ["冷凝液", "酸性介质", "自吸排液", "长期运行"],
          products: ["diaphragmPump", "pinchValve", "sensors"],
        },
        {
          key: "absorption",
          index: "02",
          navLabel: "吸收液输送",
          navSubtitle: "吸收液 / 清洗液 / 试剂",
          title: "吸收液输送",
          description:
            "用于吸收液、清洗液和维护液体的输送与分配，重点关注流量稳定、介质兼容和通断控制。",
          tags: ["吸收液", "清洗液", "流量稳定", "通断控制"],
          products: ["pistonPump", "diaphragmPump", "solenoidValve"],
        },
        {
          key: "tubeControl",
          index: "03",
          navLabel: "软管通断",
          navSubtitle: "软管 / 非接触 / 防污染",
          title: "软管通断",
          description:
            "用于污染风险较高或维护频繁的软管路径，重点减少液体对阀体污染和腐蚀。",
          tags: ["软管通断", "非接触", "防污染", "易维护"],
          products: ["pinchValve", "fittingsTubing"],
        },
        {
          key: "protection",
          index: "04",
          navLabel: "防堵保护",
          navSubtitle: "过滤 / 液位 / 压力",
          title: "防堵保护",
          description:
            "用于冷凝液、吸收液、废液和清洗液路径中的过滤保护与异常识别，降低堵塞和排液异常风险。",
          tags: ["防堵", "过滤保护", "液位识别", "压力反馈"],
          products: ["checkFilter", "sensors", "fittingsTubing"],
        },
      ],
    },

    {
      key: "samplingPrep",
      index: "04",
      title: "环境采样与样品前处理",
      summary: "样品转移、稀释、过滤、混合与废液排放。",
      focusTitle: "环境采样、稀释、过滤、混合与废液排放液路",
      focusSummary:
        "环境采样与样品前处理设备通常需要完成样品转移、稀释、试剂加入、过滤、混合、清洗和废液排放。液路系统重点在于样品代表性、低残留、过滤保护和批量处理稳定。",
      focusPoints: [
        "样品转移、稀释与试剂分配一致性",
        "过滤、防堵和泵阀前端保护",
        "多试剂、多清洗液和废液路径切换",
        "清洗残留、废液排放和状态监测",
      ],
      modules: [
        {
          key: "transfer",
          index: "01",
          navLabel: "样品转移",
          navSubtitle: "采样 / 转移 / 代表性",
          title: "样品转移",
          description:
            "用于环境样品在采样容器、前处理单元和检测单元之间的转移，重点关注样品代表性、取样稳定和低残留。",
          tags: ["样品转移", "样品代表性", "低残留", "取样稳定"],
          products: ["syringePump", "diaphragmPump", "sampleNeedle", "sensors"],
        },
        {
          key: "dilution",
          index: "02",
          navLabel: "稀释加液",
          navSubtitle: "稀释液 / 试剂 / 定量",
          title: "稀释加液",
          description:
            "用于样品稀释、试剂加入和反应液配置，重点关注定量分配一致性和介质兼容。",
          tags: ["样品稀释", "试剂加入", "定量一致", "介质兼容"],
          products: ["pistonPump", "syringePump", "solenoidValve"],
        },
        {
          key: "filtration",
          index: "03",
          navLabel: "过滤防堵",
          navSubtitle: "过滤 / 防堵 / 泵阀保护",
          title: "过滤防堵",
          description:
            "用于前处理过程中的颗粒过滤、防堵和泵阀保护，重点降低杂质进入关键液路元件的风险。",
          tags: ["颗粒过滤", "防堵", "泵阀保护", "维护便利"],
          products: ["checkFilter", "fittingsTubing", "sensors"],
        },
        {
          key: "waste",
          index: "04",
          navLabel: "清洗排废",
          navSubtitle: "清洗 / 废液 / 状态监测",
          title: "清洗排废",
          description:
            "用于样品前处理后的清洗液供给、管路冲洗和废液排放，重点关注排废稳定、残留控制和异常监测。",
          tags: ["清洗", "废液排放", "残留控制", "异常监测"],
          products: ["diaphragmPump", "solenoidValve", "sensors"],
        },
      ],
    },

    {
      key: "systemIntegration",
      index: "05",
      title: "环保在线系统集成",
      summary: "多试剂、多通道、多废液路径的长期在线液路集成。",
      focusTitle: "环保在线系统中的多试剂、多通道与长期运行液路集成",
      focusSummary:
        "环保在线系统集成通常涉及多泵、多阀、多试剂瓶、标定液、清洗液和多废液路径组合。液路设计重点在于长期稳定、路径管理、抗污染、模块化维护和异常状态反馈。",
      focusPoints: [
        "多试剂、标定液、清洗液和废液路径集中管理",
        "泵、阀、传感器、接头与管材模块化集成",
        "现场工况下的耐介质、抗污染和易维护设计",
        "液位、气泡、堵塞、压力和排废异常反馈",
      ],
      modules: [
        {
          key: "pathManagement",
          index: "01",
          navLabel: "路径管理",
          navSubtitle: "多试剂 / 标定液 / 废液",
          title: "路径管理",
          description:
            "用于多试剂、标定液、清洗液和废液路径的集中管理，重点降低误通风险、减少阀组复杂度并提升维护效率。",
          tags: ["多路径", "多试剂", "防误通", "维护效率"],
          products: ["rotaryValve", "solenoidValve", "pinchValve"],
        },
        {
          key: "fluidDrive",
          index: "02",
          navLabel: "液体驱动",
          navSubtitle: "取样 / 加液 / 清洗 / 排废",
          title: "液体驱动",
          description:
            "用于环保在线系统中的水样取送、试剂分配、清洗液输送和废液抽排，重点关注泵型组合和长期运行稳定。",
          tags: ["水样取送", "试剂分配", "清洗输送", "废液抽排"],
          products: ["diaphragmPump", "pistonPump", "syringePump"],
        },
        {
          key: "moduleConnection",
          index: "03",
          navLabel: "模块化连接",
          navSubtitle: "泵阀管路 / 密封 / 快速维护",
          title: "模块化连接",
          description:
            "用于泵、阀、试剂瓶、清洗液瓶、废液瓶、传感器和检测模块之间的管路连接，重点关注密封可靠、材料兼容和快速维护。",
          tags: ["模块化连接", "密封可靠", "材料兼容", "快速维护"],
          products: ["fittingsTubing", "checkFilter", "sensors"],
        },
        {
          key: "monitoring",
          index: "04",
          navLabel: "异常反馈",
          navSubtitle: "液位 / 气泡 / 压力 / 堵塞",
          title: "异常反馈",
          description:
            "用于长期在线运行中的液位、气泡、堵塞、压力和排废异常识别，帮助系统快速定位液路问题。",
          tags: ["液位检测", "气泡识别", "压力反馈", "异常定位"],
          products: ["sensors", "checkFilter"],
        },
      ],
    },
  ],
};