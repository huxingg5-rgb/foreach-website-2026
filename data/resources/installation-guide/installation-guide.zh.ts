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
      id: "zh-tutorial-001-6cadad8155",
      title: "隔膜泵安装方式以及注意事项",
      category: "pumps",
      series: "diaphragm-pump",
      tags: ["隔膜泵","安装","注意事项"],
      description: "隔膜泵安装方式以及注意事项视频教程。",
      keywords: ["隔膜泵安装方式以及注意事项","隔膜泵","安装","注意事项","pumps","diaphragm-pump"],
      thumbnail: "/images/resources/installation-guide/zh/zh-tutorial-001-6cadad8155.png",
      videoPlatform: "none",
      videoUrl: "/videos/installation-guide/zh/zh-tutorial-001-6cadad8155.mp4",
      steps: [],
    },
    {
      id: "zh-tutorial-002-a92d2b71b4",
      title: "实测30H系列隔膜泵最高耐压",
      category: "pumps",
      series: "diaphragm-pump",
      tags: ["隔膜泵","耐压测试"],
      description: "实测30H系列隔膜泵最高耐压视频教程。",
      keywords: ["实测30H系列隔膜泵最高耐压","隔膜泵","耐压测试","pumps","diaphragm-pump"],
      thumbnail: "/images/resources/installation-guide/zh/zh-tutorial-002-a92d2b71b4.png",
      videoPlatform: "none",
      videoUrl: "/videos/installation-guide/zh/zh-tutorial-002-a92d2b71b4.mp4",
      steps: [],
    },
    {
      id: "zh-tutorial-003-57a6bc1c94",
      title: "实测60系列隔膜泵最高耐压",
      category: "pumps",
      series: "diaphragm-pump",
      tags: ["隔膜泵","耐压测试"],
      description: "实测60系列隔膜泵最高耐压视频教程。",
      keywords: ["实测60系列隔膜泵最高耐压","隔膜泵","耐压测试","pumps","diaphragm-pump"],
      thumbnail: "/images/resources/installation-guide/zh/zh-tutorial-003-57a6bc1c94.png",
      videoPlatform: "none",
      videoUrl: "/videos/installation-guide/zh/zh-tutorial-003-57a6bc1c94.mp4",
      steps: [],
    },
    {
      id: "zh-tutorial-004-5733a4bdad",
      title: "一句话教你如何选择隔膜泵",
      category: "pumps",
      series: "diaphragm-pump",
      tags: ["隔膜泵","选型"],
      description: "一句话教你如何选择隔膜泵视频教程。",
      keywords: ["一句话教你如何选择隔膜泵","隔膜泵","选型","pumps","diaphragm-pump"],
      thumbnail: "/images/resources/installation-guide/zh/zh-tutorial-004-5733a4bdad.png",
      videoPlatform: "none",
      videoUrl: "/videos/installation-guide/zh/zh-tutorial-004-5733a4bdad.mp4",
      steps: [],
    },
    {
      id: "zh-tutorial-005-c4e9e2aa2a",
      title: "有刷与无刷隔膜泵区别不只是寿命",
      category: "pumps",
      series: "diaphragm-pump",
      tags: ["隔膜泵","有刷与无刷"],
      description: "有刷与无刷隔膜泵区别不只是寿命视频教程。",
      keywords: ["有刷与无刷隔膜泵区别不只是寿命","隔膜泵","有刷与无刷","pumps","diaphragm-pump"],
      thumbnail: "/images/resources/installation-guide/zh/zh-tutorial-005-c4e9e2aa2a.png",
      videoPlatform: "none",
      videoUrl: "/videos/installation-guide/zh/zh-tutorial-005-c4e9e2aa2a.mp4",
      steps: [],
    }
  ],
};
