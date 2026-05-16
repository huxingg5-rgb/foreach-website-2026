// data/home-application-flow.ts
// 首页第二屏「应用领域 × 核心部件」数据配置文件
//
// 说明：
// 1. 这一文件专门管理首页第二屏的文字、标签和图片路径
// 2. 后期你要改卡片文字、标签、图片、电视机背景图，只改这里即可
// 3. 组件只负责渲染和交互，不直接写死大量内容
// 4. 当前先以中文为主，结构已支持多语言；后期可以逐步补英文、西语、法语、韩语、俄语
// 5. PC 端继续使用 applicationCards 里的 5 个应用卡片
// 6. 手机端新增 mobileApplicationCards，支持 6 个应用按钮，包括“微流体领域”

import type { LocaleCode } from "@/lib/i18n";

/* ================================
   多语言文本类型

   说明：
   1. key 是语言代码，例如 zh-CN / en / es / fr / ko / ru
   2. value 是对应语言文字
   3. 如果某个语言没写，会自动回退到中文
================================ */
export type HomeFlowText = Partial<Record<LocaleCode, string>>;

/* ================================
   标签类型
================================ */
export type HomeFlowTag = {
  key: string; // 标签唯一标识，方便 React 渲染列表
  label: HomeFlowText; // 标签文字，支持多语言
};

/* ================================
   应用卡片类型

   注意：
   className 主要是给 PC 端漂浮卡片控制位置用。
   PC 端暂时只使用 5 个应用卡片，不加“微流体领域”，避免破坏原来的桌面端布局。
================================ */
export type HomeFlowApplicationCard = {
  key: string; // 卡片唯一标识
  className: "medical" | "synbio" | "lab" | "analysis" | "ivd"; // 用于控制 PC 端卡片位置
  title: HomeFlowText; // 卡片标题
  description: HomeFlowText; // 卡片说明
  image: string; // 卡片顶部图片路径
  imageAlt: HomeFlowText; // 图片说明文字
  tags: HomeFlowTag[]; // 卡片标签
};

/* ================================
   手机端应用按钮类型

   说明：
   这个类型专门给手机端用。
   手机端不需要 className，因为不再使用 PC 的漂浮卡片位置。
================================ */
export type HomeFlowMobileApplicationCard = {
  key: string;
  title: HomeFlowText;
  description: HomeFlowText;
  image: string;
  imageAlt: HomeFlowText;
  tags: HomeFlowTag[];
};

/* ================================
   底部流程卡片类型
================================ */
export type HomeFlowProcessCard = {
  key: string;
  title: HomeFlowText;
  description: HomeFlowText;
};

/* ================================
   首页第二屏数据
================================ */
export const homeApplicationFlowData = {
  sectionId: "applications",

  titleLine1: {
    "zh-CN": "一套液路系统",
  },

  titleLine2: {
    "zh-CN": "让复杂流动更简单",
  },

  description: {
    "zh-CN":
      "面向 IVD、生命科学、合成生物、高端分析仪器与实验室自动化设备，恒永达提供泵、阀、传感器、管路、连接件、采样针等核心液路组合支持。",
  },

  capabilityTags: [
    {
      key: "precision-pump",
      label: {
        "zh-CN": "精密泵",
      },
    },
    {
      key: "fluid-control-valve",
      label: {
        "zh-CN": "流体控制阀",
      },
    },
    {
      key: "sensor",
      label: {
        "zh-CN": "传感器",
      },
    },
    {
      key: "tubing-component",
      label: {
        "zh-CN": "管路组件",
      },
    },
    {
      key: "fluidic-connection",
      label: {
        "zh-CN": "流体连接",
      },
    },
  ],

  actions: {
    applicationsLabel: {
      "zh-CN": "应用领域",
    },
    productsLabel: {
      "zh-CN": "产品中心",
    },
  },

  tv: {
    // 电视机里面的背景图
    // 图片实际位置：public/images/home/application-flow/tv-bg.jpg
    image: "/images/home/application-flow/tv-bg.jpg",

    sloganPrefix: "MAKE",
    sloganHighlight: "FLOW",
    sloganSuffix: "EASY",
  },

  /* ================================
     PC 端应用卡片数据

     说明：
     1. 这里继续保留 5 个应用卡片
     2. 不在这里新增“微流体领域”
     3. 这样可以避免 PC 端原来的五张漂浮卡片布局被破坏
  ================================ */
  applicationCards: [
    {
      key: "life-science",
      className: "medical",
      title: {
        "zh-CN": "生命科学",
      },
      description: {
        "zh-CN": "支持样本制备、微量液体转移、试剂制作与自动化实验流程。",
      },
      image: "/images/home/application-flow/life-science.jpg",
      imageAlt: {
        "zh-CN": "生命科学液路应用场景",
      },
      tags: [
        {
          key: "syringe-pump",
          label: {
            "zh-CN": "注射泵",
          },
        },
        {
          key: "pipetting-pump",
          label: {
            "zh-CN": "移液泵",
          },
        },
        {
          key: "rotary-valve",
          label: {
            "zh-CN": "旋转阀",
          },
        },
        {
          key: "sampling-probe",
          label: {
            "zh-CN": "采样针",
          },
        },
      ],
    },

    {
      key: "synthetic-biology",
      className: "synbio",
      title: {
        "zh-CN": "合成生物",
      },
      description: {
        "zh-CN": "支持多通道试剂分配、连续流体控制、培养液路与流路切换。",
      },
      image: "/images/home/application-flow/synthetic-biology.jpg",
      imageAlt: {
        "zh-CN": "合成生物液路应用场景",
      },
      tags: [
        {
          key: "multi-channel-pump",
          label: {
            "zh-CN": "多通道泵",
          },
        },
        {
          key: "rotary-valve",
          label: {
            "zh-CN": "旋转阀",
          },
        },
        {
          key: "solenoid-valve",
          label: {
            "zh-CN": "电磁阀",
          },
        },
        {
          key: "tubing-component",
          label: {
            "zh-CN": "管路组件",
          },
        },
      ],
    },

    {
      key: "lab-automation",
      className: "lab",
      title: {
        "zh-CN": "实验室自动化",
      },
      description: {
        "zh-CN": "面向自动加样、液体转移、废液处理与模块化液路集成。",
      },
      image: "/images/home/application-flow/lab-automation.jpg",
      imageAlt: {
        "zh-CN": "实验室自动化液路应用场景",
      },
      tags: [
        {
          key: "diaphragm-pump",
          label: {
            "zh-CN": "隔膜泵",
          },
        },
        {
          key: "pinch-valve",
          label: {
            "zh-CN": "夹管阀",
          },
        },
        {
          key: "sensor",
          label: {
            "zh-CN": "传感器",
          },
        },
        {
          key: "tubing-component",
          label: {
            "zh-CN": "管路组件",
          },
        },
      ],
    },

    {
      key: "analytical-instruments",
      className: "analysis",
      title: {
        "zh-CN": "高端分析仪器",
      },
      description: {
        "zh-CN": "用于高压进样、流路切换、压力监测和检测前处理。",
      },
      image: "/images/home/application-flow/analytical-instruments.jpg",
      imageAlt: {
        "zh-CN": "高端分析仪器液路应用场景",
      },
      tags: [
        {
          key: "high-pressure-valve",
          label: {
            "zh-CN": "高压阀",
          },
        },
        {
          key: "piston-pump",
          label: {
            "zh-CN": "柱塞泵",
          },
        },
        {
          key: "pressure-sensor",
          label: {
            "zh-CN": "压力传感器",
          },
        },
        {
          key: "peek-tubing",
          label: {
            "zh-CN": "PEEK 管路",
          },
        },
      ],
    },

    {
      key: "ivd",
      className: "ivd",
      title: {
        "zh-CN": "IVD 体外诊断",
      },
      description: {
        "zh-CN": "用于样本处理、试剂分配、清洗废液、流路切换与状态监测。",
      },
      image: "/images/home/application-flow/ivd.jpg",
      imageAlt: {
        "zh-CN": "IVD 体外诊断液路应用场景",
      },
      tags: [
        {
          key: "solenoid-valve",
          label: {
            "zh-CN": "电磁阀",
          },
        },
        {
          key: "pinch-valve",
          label: {
            "zh-CN": "夹管阀",
          },
        },
        {
          key: "bubble-detector",
          label: {
            "zh-CN": "气泡检测器",
          },
        },
        {
          key: "pressure-sensor",
          label: {
            "zh-CN": "压力传感器",
          },
        },
      ],
    },
  ] satisfies HomeFlowApplicationCard[],

  /* ================================
     手机端应用按钮数据

     说明：
     1. 手机端使用这组数据
     2. 顺序按 H5 预览版本排列
     3. 比 PC 端多一个“微流体领域”
     4. 当前微流体领域先复用 tv-bg.jpg 作为占位图，避免因为图片不存在导致显示异常
  ================================ */
  mobileApplicationCards: [
    {
      key: "analytical-instruments",
      title: {
        "zh-CN": "高端分析仪器",
      },
      description: {
        "zh-CN": "用于高压进样、流路切换、压力监测和检测前处理。",
      },
      image: "/images/home/application-flow/analytical-instruments.jpg",
      imageAlt: {
        "zh-CN": "高端分析仪器液路应用场景",
      },
      tags: [
        {
          key: "high-pressure-valve",
          label: {
            "zh-CN": "高压阀",
          },
        },
        {
          key: "piston-pump",
          label: {
            "zh-CN": "柱塞泵",
          },
        },
        {
          key: "pressure-sensor",
          label: {
            "zh-CN": "压力传感器",
          },
        },
        {
          key: "peek-tubing",
          label: {
            "zh-CN": "PEEK 管路",
          },
        },
      ],
    },

    {
      key: "life-science",
      title: {
        "zh-CN": "生命科学",
      },
      description: {
        "zh-CN": "支持样本制备、微量液体转移、试剂制作与自动化实验流程。",
      },
      image: "/images/home/application-flow/life-science.jpg",
      imageAlt: {
        "zh-CN": "生命科学液路应用场景",
      },
      tags: [
        {
          key: "syringe-pump",
          label: {
            "zh-CN": "注射泵",
          },
        },
        {
          key: "pipetting-pump",
          label: {
            "zh-CN": "移液泵",
          },
        },
        {
          key: "rotary-valve",
          label: {
            "zh-CN": "旋转阀",
          },
        },
        {
          key: "sampling-probe",
          label: {
            "zh-CN": "采样针",
          },
        },
      ],
    },

    {
      key: "synthetic-biology",
      title: {
        "zh-CN": "合成生物",
      },
      description: {
        "zh-CN": "支持多通道试剂分配、连续流体控制、培养液路与流路切换。",
      },
      image: "/images/home/application-flow/synthetic-biology.jpg",
      imageAlt: {
        "zh-CN": "合成生物液路应用场景",
      },
      tags: [
        {
          key: "multi-channel-pump",
          label: {
            "zh-CN": "多通道泵",
          },
        },
        {
          key: "rotary-valve",
          label: {
            "zh-CN": "旋转阀",
          },
        },
        {
          key: "solenoid-valve",
          label: {
            "zh-CN": "电磁阀",
          },
        },
        {
          key: "tubing-component",
          label: {
            "zh-CN": "管路组件",
          },
        },
      ],
    },

    {
      key: "lab-automation",
      title: {
        "zh-CN": "实验室自动化",
      },
      description: {
        "zh-CN": "面向自动加样、液体转移、废液处理与模块化液路集成。",
      },
      image: "/images/home/application-flow/lab-automation.jpg",
      imageAlt: {
        "zh-CN": "实验室自动化液路应用场景",
      },
      tags: [
        {
          key: "diaphragm-pump",
          label: {
            "zh-CN": "隔膜泵",
          },
        },
        {
          key: "pinch-valve",
          label: {
            "zh-CN": "夹管阀",
          },
        },
        {
          key: "sensor",
          label: {
            "zh-CN": "传感器",
          },
        },
        {
          key: "tubing-component",
          label: {
            "zh-CN": "管路组件",
          },
        },
      ],
    },

    {
      key: "ivd",
      title: {
        "zh-CN": "IVD 体外诊断",
      },
      description: {
        "zh-CN": "用于样本处理、试剂分配、清洗废液、流路切换与状态监测。",
      },
      image: "/images/home/application-flow/ivd.jpg",
      imageAlt: {
        "zh-CN": "IVD 体外诊断液路应用场景",
      },
      tags: [
        {
          key: "solenoid-valve",
          label: {
            "zh-CN": "电磁阀",
          },
        },
        {
          key: "pinch-valve",
          label: {
            "zh-CN": "夹管阀",
          },
        },
        {
          key: "bubble-detector",
          label: {
            "zh-CN": "气泡检测器",
          },
        },
        {
          key: "pressure-sensor",
          label: {
            "zh-CN": "压力传感器",
          },
        },
      ],
    },

    {
      key: "microfluidics",
      title: {
        "zh-CN": "微流体领域",
      },
      description: {
        "zh-CN":
          "面向微量液体控制、精密分配、低内腔体积流路与模块化微流体系统集成。",
      },
      image: "/images/home/application-flow/tv-bg.jpg",
      imageAlt: {
        "zh-CN": "微流体领域液路应用场景",
      },
      tags: [
        {
          key: "micro-dispensing",
          label: {
            "zh-CN": "微量分配",
          },
        },
        {
          key: "low-internal-volume",
          label: {
            "zh-CN": "低内腔体积",
          },
        },
        {
          key: "precision-fluid-control",
          label: {
            "zh-CN": "精密流控",
          },
        },
        {
          key: "system-integration",
          label: {
            "zh-CN": "系统集成",
          },
        },
      ],
    },
  ] satisfies HomeFlowMobileApplicationCard[],

  processCards: [
    {
      key: "sample-processing",
      title: {
        "zh-CN": "样本处理",
      },
      description: {
        "zh-CN": "样本吸取、转移、混合、预处理与检测前液路控制。",
      },
    },
    {
      key: "reagent-dispensing",
      title: {
        "zh-CN": "试剂分配",
      },
      description: {
        "zh-CN": "微量定量、多通道加样、连续供液与稳定分配。",
      },
    },
    {
      key: "fluid-path-switching",
      title: {
        "zh-CN": "流路切换",
      },
      description: {
        "zh-CN": "多试剂、多样本、多检测通道之间的精准切换。",
      },
    },
    {
      key: "status-monitoring",
      title: {
        "zh-CN": "状态检测",
      },
      description: {
        "zh-CN": "压力、气泡、电导率等关键液路状态监测与反馈。",
      },
    },
  ] satisfies HomeFlowProcessCard[],
};

/* ================================
   多语言读取函数

   说明：
   1. 优先读取当前语言
   2. 如果当前语言没有，就回退中文
   3. 如果中文也没有，就回退英文
   4. 最后返回空字符串
================================ */
export function getHomeFlowText(text: HomeFlowText, locale: LocaleCode) {
  return text[locale] || text["zh-CN"] || text.en || "";
} 