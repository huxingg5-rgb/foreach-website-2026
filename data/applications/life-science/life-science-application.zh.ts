/* =========================================================
   life-science-application.zh.ts
   恒永达官网｜生命科学应用领域中文数据

   文件路径：
   data/applications/life-science/life-science-application.zh.ts

   说明：
   1. 数据由生命科学 H5 成品内容迁移
   2. 后续新增应用类型 / 液路部位 / 产品能力，优先改这里
========================================================= */

import type { LifeScienceApplicationPageData } from "./life-science-application.types";

export const lifeScienceApplicationZhData: LifeScienceApplicationPageData = {
  breadcrumb: [
    { label: "首页", href: "/" },
    { label: "应用领域" },
    { label: "生命科学" },
  ],

  hero: {
    title: "面向生命科学实验的",
    highlight: "自动化液体处理方案",
    description:
      "服务样本制备、移液分液、细胞培养与实验自动化场景。",
    panelTitle: "",
    panelItems: [],
  },

  applicationSection: {
    title: "应用类型",
    description:
      "选择具体生命科学应用后，下方内容会同步展示该场景的液路关注重点、关键部位和对应产品能力。",
  },

  focusKicker: "当前应用关注重点",

  moduleSection: {
    title: "关键液路部位与产品能力",
    description:
      "选择液路部位后，只展示该部位相关产品。点击产品可展开参数、优势和解决问题。",
  },

  cta: {
    title: "有生命科学设备液路设计或国产替代需求？",
    description:
      "可提交应用类型、液体介质、目标流量、压力范围、管路尺寸、空间限制和当前问题，由恒永达工程团队协助评估泵阀管路组合、材料兼容性与实验液路方案。",
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
        "适合培养基、缓冲液、清洗液、洗脱液、底物和常用试剂的重复定量加入。",
      solves:
        "用于减少重复分配波动、不同周期加液量不一致、长期运行后分配稳定性下降等问题。",
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
        "适合细胞悬液、培养基、清洗液、废液和特定软管路径，液体只接触软管。",
      solves:
        "用于降低液体污染阀体、腐蚀阀体、阀腔残留和维护复杂度。",
    },

    diaphragmPump: {
      name: "隔膜泵",
      ability: "清洗液输送、废液抽排与较大流量液体搬运",
      params: ["300 / 600 mL/min", "自吸 6 mH₂O / 3 mH₂O", "压力 100 kPa", "无刷电机寿命 10000 h"],
      advantage:
        "适合清洗液供给、培养基转移、废液抽排、管路冲洗等不以微量精密分配为主的位置。",
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
        "用于样本、试剂、缓冲液、清洗液、培养基和废液通道的状态监测。",
      solves:
        "用于提升设备对气泡、堵塞、空吸、液位不足和压力波动等异常状态的识别能力。",
    },

    checkFilter: {
      name: "止回阀 / 过滤器",
      ability: "防回流、颗粒过滤与关键液路保护",
      params: ["适配防回流场景", "适配过滤场景", "可配合接头管材使用"],
      advantage:
        "可布置在试剂路径、培养基路径、清洗路径、取样路径或废液路径关键位置。",
      solves:
        "用于降低液体回流、颗粒堵塞、杂质进入泵阀和异常液路污染对系统稳定性的影响。",
    },
  },

  applications: [
    {
      key: "genomics",
      index: "01",
      title: "基因测序 / 样本制备",
      summary: "裂解、结合、清洗、洗脱与低残留液路。",
      focusTitle: "核酸样本制备中的裂解、结合、清洗与洗脱液路",
      focusSummary:
        "面向基因测序、核酸提取和分子检测前处理设备，液路需要在有限空间内完成样本裂解、试剂加入、磁珠清洗、洗脱、转移和废液排放。",
      focusPoints: [
        "裂解液、结合液、清洗液和洗脱液的稳定定量加入",
        "磁珠清洗、废液抽排和残留控制",
        "低死体积、低吸附与耐化学介质连接",
        "气泡、空吸、堵塞和液位异常识别",
      ],
      modules: [
        {
          key: "samplePrep",
          index: "01",
          navLabel: "样本前处理",
          navSubtitle: "裂解 / 结合 / 试剂加入",
          title: "样本前处理",
          description:
            "用于样本裂解、结合液加入、磁珠试剂加入和中间液体转移，重点关注小体积分配一致性、介质兼容、低残留和流程自动化稳定。",
          tags: ["裂解加液", "结合液加入", "低残留", "流程稳定"],
          products: ["syringePump", "pistonPump", "sampleNeedle", "sensors"],
        },
        {
          key: "washElution",
          index: "02",
          navLabel: "清洗与洗脱",
          navSubtitle: "清洗液 / 洗脱液 / 废液",
          title: "清洗与洗脱",
          description:
            "用于磁珠清洗、洗脱液加入、清洗废液排出和管路冲洗，重点控制清洗充分性、洗脱体积一致性、废液排放稳定性和气泡影响。",
          tags: ["磁珠清洗", "洗脱体积", "废液抽排", "气泡识别"],
          products: ["pistonPump", "diaphragmPump", "solenoidValve", "sensors"],
        },
        {
          key: "switching",
          index: "03",
          navLabel: "路径切换",
          navSubtitle: "裂解 / 清洗 / 洗脱",
          title: "路径切换",
          description:
            "用于裂解液、结合液、清洗液、洗脱液和废液路径之间的切换，降低路径误通、试剂残留和交叉污染风险。",
          tags: ["多路径切换", "防误通", "低残留", "防污染"],
          products: ["rotaryValve", "solenoidValve", "pinchValve"],
        },
        {
          key: "connection",
          index: "04",
          navLabel: "低残留连接",
          navSubtitle: "低死体积 / 材料兼容",
          title: "低残留连接",
          description:
            "用于泵、阀、试剂瓶、反应腔、传感器和废液通道之间的连接，重点关注密封可靠、低死体积、低吸附和易维护。",
          tags: ["低死体积", "低吸附", "材料兼容", "密封连接"],
          products: ["fittingsTubing", "checkFilter", "sensors"],
        },
      ],
    },

    {
      key: "cellCulture",
      index: "02",
      title: "细胞培养 / 细胞治疗",
      summary: "培养基补液、缓冲液切换与封闭式转移。",
      focusTitle: "细胞培养与细胞治疗中的封闭式液体转移液路",
      focusSummary:
        "面向细胞培养、细胞处理和细胞治疗自动化设备，液路涉及培养基补液、缓冲液切换、细胞悬液转移、清洗和废液排放。",
      focusPoints: [
        "培养基、缓冲液和功能试剂的稳定补加",
        "细胞悬液温和转移与低剪切控制",
        "封闭式管路连接和污染风险降低",
        "液位、压力、气泡和堵塞状态监测",
      ],
      modules: [
        {
          key: "media",
          index: "01",
          navLabel: "培养基补液",
          navSubtitle: "培养基 / 缓冲液 / 试剂补加",
          title: "培养基补液",
          description:
            "用于培养基、缓冲液、营养液、诱导剂和辅助试剂的稳定补加，重点关注长期运行稳定、流量一致性、介质兼容和污染风险控制。",
          tags: ["稳定补液", "长期运行", "介质兼容", "污染控制"],
          products: ["pistonPump", "syringePump", "solenoidValve"],
        },
        {
          key: "transfer",
          index: "02",
          navLabel: "细胞液转移",
          navSubtitle: "温和输送 / 封闭转移",
          title: "细胞液转移",
          description:
            "用于细胞悬液、培养液和中间液体的转移，重点关注温和输送、低剪切、封闭式管路和减少污染风险。",
          tags: ["温和输送", "封闭转移", "低剪切", "降低污染"],
          products: ["pinchValve", "diaphragmPump", "fittingsTubing", "sensors"],
        },
        {
          key: "monitoring",
          index: "03",
          navLabel: "状态监测",
          navSubtitle: "液位 / 压力 / 气泡",
          title: "状态监测",
          description:
            "用于培养基补液、细胞液转移和废液排放过程中的液位、压力、气泡和堵塞状态识别。",
          tags: ["液位检测", "压力反馈", "气泡识别", "堵塞判断"],
          products: ["sensors", "checkFilter"],
        },
      ],
    },

    {
      key: "automation",
      index: "03",
      title: "实验室自动化工作站",
      summary: "移液、分液、清洗与多工位液路集成。",
      focusTitle: "实验室自动化工作站中的移液、分液与清洗液路",
      focusSummary:
        "面向样本制备工作站、移液平台、微孔板处理设备和自动化实验系统，液路需要完成样本转移、试剂分配、针路清洗、多工位切换和废液排放。",
      focusPoints: [
        "多通道移液、分液与小体积分配一致性",
        "多工位试剂路径、清洗路径和废液路径切换",
        "针路清洗、残留控制和维护效率",
        "模块化管路连接、液位检测和异常反馈",
      ],
      modules: [
        {
          key: "pipetting",
          index: "01",
          navLabel: "移液与分液",
          navSubtitle: "样本 / 试剂 / 小体积",
          title: "移液与分液",
          description:
            "用于样本、试剂和缓冲液的小体积吸取、保持与推出，重点关注分配一致性、节拍稳定和液位识别。",
          tags: ["小体积分配", "移液一致性", "液位检测", "节拍稳定"],
          products: ["syringePump", "pistonPump", "sampleNeedle", "sensors"],
        },
        {
          key: "washing",
          index: "02",
          navLabel: "清洗与废液",
          navSubtitle: "针路清洗 / 废液排放",
          title: "清洗与废液",
          description:
            "用于针路清洗、微孔板清洗、废液抽排和管路维护，重点关注清洗充分性、废液排放稳定和残留控制。",
          tags: ["针路清洗", "废液排放", "残留控制", "维护效率"],
          products: ["diaphragmPump", "solenoidValve", "sensors"],
        },
        {
          key: "connection",
          index: "03",
          navLabel: "模块化连接",
          navSubtitle: "泵 / 阀 / 针 / 传感器",
          title: "模块化连接",
          description:
            "用于泵、阀、针、传感器和多工位模块之间的连接，重点关注快速维护、管径适配、密封可靠和材料兼容。",
          tags: ["模块化连接", "快速维护", "管径适配", "密封可靠"],
          products: ["fittingsTubing", "rotaryValve", "checkFilter"],
        },
      ],
    },

    {
      key: "protein",
      index: "04",
      title: "蛋白 / 抗体分析",
      summary: "样本进样、缓冲液切换与低吸附流路。",
      focusTitle: "蛋白与抗体分析中的低吸附、低残留流路",
      focusSummary:
        "面向蛋白、抗体、生物大分子和分析仪器液路，系统常涉及样本进样、缓冲液切换、洗脱、清洗和废液排放。",
      focusPoints: [
        "蛋白、抗体和生物大分子样本稳定进样",
        "缓冲液、洗脱液、清洗液和废液路径切换",
        "低吸附、低死体积和材料兼容",
        "压力、气泡、堵塞和液位异常识别",
      ],
      modules: [
        {
          key: "sample",
          index: "01",
          navLabel: "样本进样",
          navSubtitle: "蛋白 / 抗体 / 大分子",
          title: "样本进样",
          description:
            "用于蛋白、抗体和生物大分子的稳定进样和小体积转移，重点关注低吸附、低残留和分配一致性。",
          tags: ["样本进样", "低吸附", "低残留", "分配一致"],
          products: ["syringePump", "sampleNeedle", "fittingsTubing", "sensors"],
        },
        {
          key: "buffer",
          index: "02",
          navLabel: "缓冲液切换",
          navSubtitle: "缓冲液 / 洗脱液 / 清洗液",
          title: "缓冲液切换",
          description:
            "用于缓冲液、洗脱液、清洗液和废液路径切换，重点降低残留、误通和管路复杂度。",
          tags: ["路径切换", "洗脱液", "清洗液", "低残留"],
          products: ["rotaryValve", "solenoidValve", "fittingsTubing"],
        },
        {
          key: "monitoring",
          index: "03",
          navLabel: "状态监测",
          navSubtitle: "压力 / 气泡 / 堵塞",
          title: "状态监测",
          description:
            "用于样本进样、缓冲液输送、流路切换和废液排放过程中的压力、气泡、堵塞和液位状态识别。",
          tags: ["压力反馈", "气泡识别", "堵塞判断", "液位检测"],
          products: ["sensors", "checkFilter"],
        },
      ],
    },

    {
      key: "bioProcess",
      index: "05",
      title: "合成生物学 / 生物工艺",
      summary: "补料、取样、排液与过程状态监测。",
      focusTitle: "合成生物学与小型生物工艺中的补料、取样与排液液路",
      focusSummary:
        "面向合成生物学、微型生物反应和小型生物工艺设备，液路通常涉及培养基补料、诱导剂加入、在线取样、清洗、排液和状态监测。",
      focusPoints: [
        "培养基、诱导剂、缓冲液和添加液稳定补加",
        "在线取样、排液和防回流控制",
        "长期运行中的密封、材料兼容和维护便利",
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
            "用于培养基、诱导剂、缓冲液、碳源或其他添加液的稳定补加，重点关注长期运行、重复加液一致性和介质兼容。",
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
          key: "waste",
          index: "03",
          navLabel: "排液与清洗",
          navSubtitle: "废液抽排 / 管路冲洗",
          title: "排液与清洗",
          description:
            "用于废液抽排、管路冲洗、清洗液供给和维护流程，重点关注自吸能力、排液稳定性和长时间运行可靠性。",
          tags: ["废液抽排", "管路冲洗", "自吸能力", "长期可靠"],
          products: ["diaphragmPump", "solenoidValve", "sensors"],
        },
      ],
    },
  ],
};
