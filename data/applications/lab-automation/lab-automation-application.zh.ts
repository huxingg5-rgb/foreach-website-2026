/* =========================================================
   lab-automation-application.zh.ts
   恒永达官网｜实验室自动化应用领域中文数据

   文件路径：
   data/applications/lab-automation/lab-automation-application.zh.ts

   说明：
   1. 数据由实验室自动化 H5 成品内容迁移
   2. 页面样式复用 IVD / 生命科学应用页模板
   3. 后续新增设备类型 / 液路部位 / 产品能力，优先改这里
========================================================= */

import type { LabAutomationApplicationPageData } from "./lab-automation-application.types";

export const labAutomationApplicationZhData: LabAutomationApplicationPageData = {
  breadcrumb: [
    { label: "首页", href: "/" },
    { label: "应用领域" },
    { label: "实验室自动化" },
  ],

  hero: {
    title: "面向实验室自动化的",
    highlight: "精密液路集成方案",
    description: "服务移液、分液、清洗、排废与多工位液路集成场景。",
    panelTitle: "",
    panelItems: [],
  },

  applicationSection: {
    title: "自动化设备类型",
    description:
      "选择具体实验室自动化应用后，下方内容会同步展示该场景的液路关注重点、关键部位和对应产品能力。",
  },

  focusKicker: "当前设备关注重点",

  moduleSection: {
    title: "关键液路部位与产品能力",
    description:
      "选择液路部位后，只展示该部位相关产品。点击产品可展开参数、优势和解决问题。",
  },

  cta: {
    title: "有实验室自动化设备液路设计或国产替代需求？",
    description:
      "可提交自动化设备类型、液体介质、目标流量、压力范围、管路尺寸、空间限制和当前问题，由恒永达工程团队协助评估泵阀管路组合、材料兼容性与液路集成方案。",
    buttonLabel: "提交应用需求",
    href: "/contact",
  },

  productHref: "/products",
  contactHref: "/contact",

  products: {
    syringePump: {
      name: "注射泵",
      ability: "微量吸取、保持与推出的一体化液体处理",
      params: ["25 μL–25 mL", "30 / 60 mm 行程", "1–8 通道", "分配误差 ≤1%", "压力 0.4 MPa", "可级联 16 台"],
      advantage:
        "适合样本转移、试剂加入、洗脱液分配、多通道液体处理和小体积取样等需要“吸取—保持—推出”完整动作控制的场景。",
      solves:
        "用于降低微量吸取偏差、不同通道转移不一致、空吸后动作失控和样本损失等问题。",
    },

    pistonPump: {
      name: "柱塞泵",
      ability: "高频重复定量分配与体积一致性控制",
      params: ["50 μL–20 mL", "ACC＜0.5%", "CV＜0.5%", "压力 0.3 MPa", "寿命 500 万次", "1/4-28 UNF / M6"],
      advantage:
        "适合缓冲液、清洗液、培养基、洗脱液和常用试剂的重复定量加入。",
      solves:
        "用于减少重复分配波动、不同周期加液量不一致和长期运行后分配稳定性下降等问题。",
    },

    sampleNeedle: {
      name: "移液针 / 取样针",
      ability: "样本吸取前端与液面接触位置控制",
      params: ["适配样本吸取", "可配合液位检测", "支持定制化沟通"],
      advantage:
        "用于样本管、孔板、反应腔、试剂瓶和工艺容器等取样与分液前端。",
      solves:
        "用于改善取样位置偏差、挂液残留、针外壁污染、吸样深度不稳定和不同容器适配困难等问题。",
    },

    solenoidValve: {
      name: "电磁阀",
      ability: "试剂、缓冲液、清洗液与废液通道的快速通断控制",
      params: ["二通 / 三通", "CV 0.03", "-75 kPa–0.25 MPa", "响应时间 ≤30 ms", "EPDM / FKM / FFKM"],
      advantage:
        "适合试剂、缓冲液、清洗液、废液和气液混合路径的快速开关控制。",
      solves:
        "用于减少通断响应慢、路径误通、阀位不稳定、介质兼容不足导致的漏液、残留、污染和维护风险。",
    },

    rotaryValve: {
      name: "旋转阀",
      ability: "多试剂、多缓冲液、多废液路径集中切换",
      params: ["10 / 12 / 24 通", "寿命 100 万次", "适合多路径集中管理"],
      advantage:
        "适合多试剂、多缓冲液、多清洗流程和多废液路径集中管理。",
      solves:
        "用于降低多通道液路连接复杂度、减少接头数量、降低误接和路径切换不稳定风险。",
    },

    pinchValve: {
      name: "夹管阀",
      ability: "软管液路的非接触式通断控制",
      params: ["2 位 3 通", "响应时间 ≤200 ms", "压力 ≤150 kPa"],
      advantage:
        "适合清洗液、废液、培养基和特定软管路径，液体只接触软管。",
      solves:
        "用于降低液体污染阀体、腐蚀阀体、阀腔残留和维护复杂度。",
    },

    diaphragmPump: {
      name: "隔膜泵",
      ability: "清洗液输送、废液抽排与较大流量液体搬运",
      params: ["300 / 600 mL/min", "自吸 5 m / 3 m", "压力 100 kPa", "无刷电机寿命 10000 h"],
      advantage:
        "适合清洗液供给、废液抽排、管路冲洗等不以微量精密分配为主的位置。",
      solves:
        "用于改善清洗液供给不足、废液排放不彻底、自吸不稳定和长时间运行流量衰减等问题。",
    },

    fittingsTubing: {
      name: "接头与管材",
      ability: "泵、阀、针、传感器之间的连接密封与材料适配",
      params: ["管外径 1.6–19.0 mm", "NPT / UNF", "Q20 / Q40 / Q60", "鲁尔接头", "PTFE / PFA / FEP / PEEK"],
      advantage:
        "用于设备内部管路连接、转接、密封和不同材料适配。",
      solves:
        "用于降低接头漏液、管路松脱、死体积偏大、材料不兼容、样本吸附和拆装维护困难等问题。",
    },

    sensors: {
      name: "压力 / 液位 / 气泡检测",
      ability: "关键液路状态识别与异常反馈",
      params: ["压力 ≤2000 kPa", "液位 1 fF / 50 μL / 1 ms", "气泡检测管外径 1.6–6.4 mm", "电导率 0.01–5 μS/cm"],
      advantage:
        "用于样本、试剂、缓冲液、清洗液和废液通道的状态监测。",
      solves:
        "用于提升设备对气泡、堵塞、空吸、液位不足和压力波动等异常状态的识别能力。",
    },

    checkFilter: {
      name: "止回阀 / 过滤器",
      ability: "防回流、颗粒过滤与关键液路保护",
      params: ["适配防回流场景", "适配过滤场景", "可配合接头管材使用"],
      advantage:
        "可布置在试剂路径、清洗路径、取样路径或废液路径关键位置。",
      solves:
        "用于降低液体回流、颗粒堵塞、杂质进入泵阀和异常液路污染对系统稳定性的影响。",
    },
  },

  applications: [
    {
      key: "samplePrep",
      index: "01",
      title: "样本制备工作站",
      summary: "样本前处理、试剂加入、清洗、洗脱与废液排放。",
      focusTitle: "样本前处理、试剂加入与清洗洗脱液路",
      focusSummary:
        "样本制备工作站通常需要完成样本转移、试剂加入、混合、清洗、洗脱和废液排放。液路系统需要兼顾小体积分配一致性、低残留、防污染、路径切换稳定和异常状态识别。",
      focusPoints: [
        "样本转移、试剂加入与小体积分配一致性",
        "清洗、洗脱、废液抽排与残留控制",
        "多试剂、多缓冲液与多路径切换稳定性",
        "液位、气泡、空吸、堵塞和压力状态识别",
      ],
      modules: [
        {
          key: "pipetting",
          index: "01",
          navLabel: "样本转移",
          navSubtitle: "样本吸取 / 试剂加入 / 小体积",
          title: "样本转移",
          description:
            "用于样本、裂解液、结合液、清洗液和洗脱液在样本管、孔板、反应腔和储液容器之间的转移与分配，重点关注小体积分配一致性、低残留和流程稳定。",
          tags: ["样本转移", "小体积一致性", "低残留", "流程稳定"],
          products: ["syringePump", "pistonPump", "sampleNeedle", "sensors"],
        },
        {
          key: "washing",
          index: "02",
          navLabel: "清洗洗脱",
          navSubtitle: "清洗液 / 洗脱液 / 废液",
          title: "清洗洗脱",
          description:
            "用于清洗液供给、洗脱液加入、残液抽排和废液排放，重点控制清洗充分性、洗脱体积一致性、废液排放稳定性和气泡影响。",
          tags: ["清洗液供给", "洗脱体积", "废液抽排", "气泡识别"],
          products: ["pistonPump", "diaphragmPump", "solenoidValve", "sensors"],
        },
        {
          key: "switching",
          index: "03",
          navLabel: "路径切换",
          navSubtitle: "试剂 / 清洗 / 洗脱 / 废液",
          title: "路径切换",
          description:
            "用于多试剂、多清洗液、洗脱液和废液路径之间的切换，重点降低路径误通、试剂残留、交叉污染和紧凑空间内的管路复杂度。",
          tags: ["多路径切换", "防误通", "残留控制", "空间紧凑"],
          products: ["rotaryValve", "solenoidValve", "pinchValve"],
        },
        {
          key: "connection",
          index: "04",
          navLabel: "管路连接",
          navSubtitle: "低死体积 / 密封 / 材料兼容",
          title: "管路连接",
          description:
            "用于泵、阀、针、传感器、试剂瓶、反应腔和废液通道之间的连接，重点关注密封可靠、低死体积、材料兼容和维护便利。",
          tags: ["低死体积", "密封连接", "材料兼容", "维护便利"],
          products: ["fittingsTubing", "checkFilter", "sensors"],
        },
      ],
    },

    {
      key: "pipetting",
      index: "02",
      title: "自动移液平台",
      summary: "孔板、试管与反应腔之间的微量液体转移。",
      focusTitle: "微量移液、多通道分液与针路清洗液路",
      focusSummary:
        "自动移液平台需要在孔板、试管、样本管和反应腔之间完成微量液体转移。液路系统重点关注吸液与排液动作稳定、多通道同步、液面识别、针路清洗和残留控制。",
      focusPoints: [
        "小体积吸取、保持与推出动作稳定",
        "多通道同步分液与重复一致性",
        "不同容器高度和液面变化下的取样可靠性",
        "针路清洗、挂液残留和空吸异常识别",
      ],
      modules: [
        {
          key: "pipetting",
          index: "01",
          navLabel: "微量移液",
          navSubtitle: "吸取 / 保持 / 推出",
          title: "微量移液",
          description:
            "用于样本、试剂和缓冲液在孔板、试管、样本管和反应腔之间的微量转移，重点关注吸取动作稳定、小体积分配一致性和多通道同步。",
          tags: ["微量移液", "多通道同步", "小体积一致性", "动作稳定"],
          products: ["syringePump", "sampleNeedle", "sensors"],
        },
        {
          key: "dispensing",
          index: "02",
          navLabel: "分液控制",
          navSubtitle: "多通道 / 重复分配 / 节拍",
          title: "分液控制",
          description:
            "用于多孔位、多通道和批量分液场景，重点关注重复分配一致性、节拍稳定和长时间运行后的分配精度保持。",
          tags: ["重复分配", "节拍稳定", "多通道", "长期运行"],
          products: ["pistonPump", "syringePump", "solenoidValve"],
        },
        {
          key: "needleWash",
          index: "03",
          navLabel: "针路清洗",
          navSubtitle: "挂液 / 残留 / 废液",
          title: "针路清洗",
          description:
            "用于移液针、取样针和管路清洗，重点控制挂液、交叉污染、废液抽排和维护便利性。",
          tags: ["针路清洗", "挂液控制", "废液抽排", "降低污染"],
          products: ["diaphragmPump", "solenoidValve", "sensors"],
        },
      ],
    },

    {
      key: "microplate",
      index: "03",
      title: "微孔板处理设备",
      summary: "孔板加液、洗板、残液抽排与清洗废液处理。",
      focusTitle: "微孔板加液、洗板、残液抽排与废液处理液路",
      focusSummary:
        "微孔板处理设备通常涉及孔板加液、洗板、分液、反应体系构建、残液抽排和废液排放。液路系统重点关注分配均一性、清洗充分性、残留控制、废液抽排稳定和维护效率。",
      focusPoints: [
        "孔板加液、洗板和多孔位分配一致性",
        "清洗液供给、残液抽排与废液排放稳定性",
        "针路、洗头和管路残留控制",
        "液位、气泡、堵塞和排废异常识别",
      ],
      modules: [
        {
          key: "plateDispensing",
          index: "01",
          navLabel: "孔板加液",
          navSubtitle: "多孔位 / 分配一致性",
          title: "孔板加液",
          description:
            "用于微孔板、深孔板和反应板中的试剂、缓冲液和样本分配，重点关注多孔位体积一致性和节拍稳定。",
          tags: ["孔板加液", "多孔位", "体积一致", "节拍稳定"],
          products: ["pistonPump", "syringePump", "solenoidValve"],
        },
        {
          key: "plateWash",
          index: "02",
          navLabel: "洗板排废",
          navSubtitle: "清洗液 / 残液 / 废液",
          title: "洗板排废",
          description:
            "用于清洗液供给、洗板、残液抽排和废液排放，重点关注清洗充分性、废液排放稳定和堵塞识别。",
          tags: ["洗板", "残液抽排", "废液处理", "堵塞识别"],
          products: ["diaphragmPump", "solenoidValve", "sensors"],
        },
        {
          key: "connection",
          index: "03",
          navLabel: "洗头连接",
          navSubtitle: "管路 / 接头 / 过滤保护",
          title: "洗头连接",
          description:
            "用于洗头、针路、泵阀模块和废液通道之间的连接，重点关注密封、过滤、防堵和维护效率。",
          tags: ["密封连接", "过滤保护", "防堵", "维护效率"],
          products: ["fittingsTubing", "checkFilter", "sensors"],
        },
      ],
    },

    {
      key: "reagentDispensing",
      index: "04",
      title: "试剂分装与分配设备",
      summary: "缓冲液、清洗液、培养基与添加液重复定量分配。",
      focusTitle: "试剂分装、重复定量分配与长期运行液路",
      focusSummary:
        "试剂分装与分配设备通常需要对缓冲液、培养基、清洗液、添加液和其他实验试剂进行重复定量分配。液路系统重点关注体积一致性、长期运行稳定、介质兼容和维护便利。",
      focusPoints: [
        "试剂、缓冲液和培养基重复定量分配",
        "长时间运行中的分配稳定性和寿命表现",
        "不同介质下的密封、材料兼容和残留控制",
        "管路连接、过滤保护和异常状态反馈",
      ],
      modules: [
        {
          key: "dispensing",
          index: "01",
          navLabel: "重复分配",
          navSubtitle: "定量 / 批量 / 长期运行",
          title: "重复分配",
          description:
            "用于试剂、缓冲液、培养基和清洗液的重复定量分配，重点关注体积一致性、长期运行稳定和寿命表现。",
          tags: ["定量分配", "批量重复", "长期运行", "体积一致"],
          products: ["pistonPump", "syringePump", "solenoidValve"],
        },
        {
          key: "compatibility",
          index: "02",
          navLabel: "介质兼容",
          navSubtitle: "材料 / 密封 / 残留",
          title: "介质兼容",
          description:
            "用于不同试剂、缓冲液、清洗液和培养基的管路材料与密封件选择，重点关注材料耐受、低吸附和低残留。",
          tags: ["材料兼容", "密封可靠", "低吸附", "低残留"],
          products: ["fittingsTubing", "checkFilter", "solenoidValve"],
        },
        {
          key: "monitoring",
          index: "03",
          navLabel: "状态监测",
          navSubtitle: "液位 / 压力 / 气泡",
          title: "状态监测",
          description:
            "用于重复分配、试剂瓶切换和长时间运行过程中的液位、压力、气泡和堵塞状态反馈。",
          tags: ["液位检测", "压力反馈", "气泡识别", "堵塞判断"],
          products: ["sensors", "checkFilter"],
        },
      ],
    },

    {
      key: "systemIntegration",
      index: "05",
      title: "自动化系统集成",
      summary: "多模块、多工位、多路径液路集成与状态监测。",
      focusTitle: "多模块、多工位与多路径液路系统集成",
      focusSummary:
        "自动化实验系统集成通常涉及多泵、多阀、多试剂瓶、多工作位和多废液路径组合。液路设计重点在于路径管理、空间布局、模块化连接、维护便利和状态监测。",
      focusPoints: [
        "多工位试剂、清洗和废液路径集中管理",
        "泵、阀、针、传感器与管路模块化集成",
        "紧凑空间内的密封连接、低死体积和维护便利",
        "空吸、气泡、堵塞、压力和液位异常反馈",
      ],
      modules: [
        {
          key: "pathManagement",
          index: "01",
          navLabel: "路径管理",
          navSubtitle: "多试剂 / 多工位 / 多废液",
          title: "路径管理",
          description:
            "用于多试剂、多工位、多清洗和多废液路径的集中管理，重点关注路径切换稳定、空间紧凑和误通风险控制。",
          tags: ["多路径", "多工位", "防误通", "空间紧凑"],
          products: ["rotaryValve", "solenoidValve", "pinchValve"],
        },
        {
          key: "moduleConnection",
          index: "02",
          navLabel: "模块连接",
          navSubtitle: "泵 / 阀 / 针 / 传感器",
          title: "模块连接",
          description:
            "用于泵、阀、针、传感器和不同功能模块之间的连接，重点关注标准化连接、密封可靠和维护便利。",
          tags: ["模块化连接", "密封可靠", "标准化", "易维护"],
          products: ["fittingsTubing", "checkFilter", "sensors"],
        },
        {
          key: "monitoring",
          index: "03",
          navLabel: "异常反馈",
          navSubtitle: "空吸 / 气泡 / 堵塞 / 压力",
          title: "异常反馈",
          description:
            "用于多模块自动化系统中的液位、压力、气泡、堵塞和空吸状态监测，帮助设备识别异常并降低流程失败风险。",
          tags: ["空吸判断", "气泡识别", "堵塞监测", "压力反馈"],
          products: ["sensors", "checkFilter"],
        },
      ],
    },
  ],
};