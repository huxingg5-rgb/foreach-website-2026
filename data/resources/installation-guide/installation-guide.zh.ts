/* =========================================================
   installation-guide.zh.ts
   恒永达官网｜中文安装教程页面数据

   文件路径：
   data/resources/installation-guide/installation-guide.zh.ts

   作用：
   1. 当前阶段先使用本地静态数据
   2. 后期接后端 / CMS 时，数据结构保持一致
   3. 页面和组件不需要大改
========================================================= */

import type { InstallationGuidePageData } from "./installation-guide.types";

export const installationGuideZhData: InstallationGuidePageData = {
  locale: "zh-CN",

  hero: {
    kicker: "INSTALLATION GUIDE",
    title: "产品安装与使用教程",
    description:
      "查看 FOREACH 微流体产品的安装步骤、调试说明、校准方法与常见问题处理建议。",
  },

  search: {
    placeholder: "请输入产品",
    buttonText: "搜索",
    recentLabel: "最近搜索",
    recentKeywords: ["柱塞泵", "Q20", "电磁阀", "高压阀", "压力传感器"],
  },

  sidebar: {
    title: "产品系列",
    tree: [
      {
        id: "all",
        type: "all",
        name: "全部教程",
        children: [],
      },
      {
        id: "fittings",
        type: "category",
        name: "接头及管路连接件",
        children: [],
      },
      {
        id: "pumps",
        type: "category",
        name: "泵类产品",
        children: [
          { id: "plunger-pump", name: "柱塞泵" },
          { id: "diaphragm-pump", name: "隔膜泵" },
          { id: "valveless-pump", name: "无阀泵" },
          { id: "syringe-pump", name: "注射泵" },
          { id: "high-pressure-pump", name: "高压泵" },
        ],
      },
      {
        id: "valves",
        type: "category",
        name: "阀类产品",
        children: [
          { id: "rotary-valve", name: "旋转阀" },
          { id: "solenoid-valve", name: "电磁阀" },
          { id: "high-pressure-valve", name: "高压阀" },
          { id: "pinch-valve", name: "夹管阀" },
        ],
      },
      {
        id: "sensors",
        type: "category",
        name: "传感器",
        children: [],
      },
      {
        id: "quality-control",
        type: "category",
        name: "质控",
        children: [],
      },
      {
        id: "needles",
        type: "category",
        name: "针",
        children: [],
      },
    ],
  },

  support: {
    title: "没有找到对应教程？",
    description:
      "如果您不确定产品安装方式、参数设置或校准方法，可以提交产品型号、应用场景或图纸资料，FOREACH 技术团队将为您提供支持。",
    buttonText: "联系技术支持",
    href: "/contact",
  },

  guides: [
    {
      id: "hard-tube-fitting-guide",
      title: "硬管接头安装教程超级长的标题测试这个有多大硬管接头安装教程超级长的标题测试这个有多大",
      category: "fittings",
      series: "fittings",
      tags: ["接头", "管路", "密封"],
      description: "适用于硬管连接场景，说明管材插入、锁紧与密封检查方法。",
      keywords: ["硬管", "接头", "Q20", "Q40", "Q60", "管路", "密封"],
      videoPlatform: "bilibili",
      steps: [
        {
          title: "准备接头与管材",
          description: "确认管材外径与接头规格匹配，检查管口是否平整。",
        },
        {
          title: "插入管路",
          description: "将管材沿轴向插入接头，避免斜插或强行挤压。",
        },
        {
          title: "锁紧并检查",
          description: "完成锁紧后检查管路是否松动，再进行通液测试。",
        },
      ],
    },
    {
      id: "plunger-pump-install-guide",
      title: "柱塞泵安装与管路连接说明",
      category: "pumps",
      series: "plunger-pump",
      tags: ["电机", "接电", "调试"],
      description: "说明柱塞泵固定、进出口连接、管路方向与初步运行检查。",
      keywords: ["柱塞泵", "电机", "接电", "安装", "调试", "管路"],
      videoPlatform: "bilibili",
      steps: [
        {
          title: "确认安装方向",
          description: "根据设备结构确认泵体固定方向和进出口位置。",
        },
        {
          title: "连接管路",
          description: "连接进液和出液管路，确认接头规格匹配。",
        },
        {
          title: "运行检查",
          description: "低速运行观察是否存在气泡、漏液或异常声音。",
        },
      ],
    },
    {
      id: "diaphragm-pump-guide",
      title: "隔膜泵安装与管路连接说明",
      category: "pumps",
      series: "diaphragm-pump",
      tags: ["隔膜泵", "管路", "固定"],
      description: "说明隔膜泵安装方向、进出口连接、固定方式与运行检查。",
      keywords: ["隔膜泵", "DPL", "安装", "管路", "连接"],
      videoPlatform: "bilibili",
      steps: [
        {
          title: "确认安装方向",
          description: "根据泵体标识确认进液口、出液口与安装方向。",
        },
        {
          title: "连接管路",
          description: "连接进出口管路，并检查接头锁紧状态。",
        },
        {
          title: "运行检查",
          description: "短时间运行观察吸液、排液和振动状态。",
        },
      ],
    },
    {
      id: "solenoid-valve-guide",
      title: "电磁阀管路连接说明",
      category: "valves",
      series: "solenoid-valve",
      tags: ["阀体", "接电", "动作测试"],
      description: "说明电磁阀接口识别、管路连接、通断测试与注意事项。",
      keywords: ["电磁阀", "6010", "接电", "阀体", "动作测试"],
      videoPlatform: "bilibili",
      steps: [
        {
          title: "识别接口",
          description: "确认进液口、出液口和排液口方向。",
        },
        {
          title: "连接管路",
          description: "按照流向连接管路，避免方向接反。",
        },
        {
          title: "动作测试",
          description: "上电后执行通断测试，确认动作正常。",
        },
      ],
    },
    {
      id: "pressure-sensor-guide",
      title: "压力传感器安装说明",
      category: "sensors",
      series: "sensors",
      tags: ["信号", "接线", "检测"],
      description: "说明压力传感器安装方向、接口连接与初始读数检查。",
      keywords: ["压力传感器", "信号", "接线", "检测"],
      videoPlatform: "bilibili",
      steps: [
        {
          title: "确认安装方向",
          description: "根据液路方向确认传感器安装位置。",
        },
        {
          title: "连接接口",
          description: "连接管路接口和信号线缆。",
        },
        {
          title: "读取信号",
          description: "上电后读取初始信号，确认无异常波动。",
        },
      ],
    },
  ],
}; 