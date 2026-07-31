/* =========================================================
   datasheets.zh.ts
   恒永达官网｜资源中心｜规格书下载｜中文数据

   文件路径：
   data/resources/datasheets.zh.ts

   作用：
   1. 存放中文规格书下载页面的所有数据
   2. 包括：页面文案、Banner 图片、筛选分类、规格书列表
   3. 页面结构和交互不写在这里
   4. 后续新增规格书时，优先修改这个文件
========================================================= */

/* ================================
   分类类型
================================ */

export type DatasheetCategoryValue =
  | "all"
  | "pump"
  | "valve"
  | "needle"
  | "tubing"
  | "smart";

export type DatasheetItemCategory = Exclude<DatasheetCategoryValue, "all">;

export type DatasheetActionType = "download" | "custom";

/* ================================
   筛选按钮数据类型
================================ */

export type DatasheetFilterOption = {
  label: string;
  value: DatasheetCategoryValue;
};

/* ================================
   规格书单条数据类型
================================ */

export type DatasheetItem = {
  id: string;
  category: DatasheetItemCategory;
  keywords: string;
  title: string;
  label: string;
  language: string;
  version: string;
  update: string;
  description: string;
  image: string;
  productHref: string;
  downloadHref: string;
  actionType: DatasheetActionType;
};

/* ================================
   页面基础文案
================================ */

export const datasheetsZhPageText = {
  seo: {
    title: "规格书下载｜资源中心｜恒永达",
    description:
      "恒永达规格书下载页面，提供微流体泵、阀、管路及连接件、智控模块等产品规格书，帮助客户快速了解产品参数、材料、接口与应用信息。",
  },

  hero: {
    title: "规格书下载",
    description:
      "查找并下载恒永达泵、阀、管路与连接件及智控模块等产品规格书，快速了解产品参数、材料、接口与应用信息。",

    // Banner 图片路径
    // 图片真实位置：
    // public/images/resource/datasheets/banner/resource-datasheet-banner-1920x800-v001.webp
    // 页面引用时不写 public
    image:
      "/images/resource/datasheets/banner/resource-datasheet-banner-1920x800-v001.webp",

    // Banner 图片 alt，用于 SEO / GEO / 无障碍识别
    imageAlt: "恒永达资源中心规格书下载页面 Banner",
  },

  breadcrumb: {
    home: "首页",
    resources: "资源中心",
    current: "规格书下载",
  },

  search: {
    placeholder:
      "搜索产品名称或关键词，例如 柱塞泵、旋转阀、压力传感器、管路及连接件",
    buttonText: "搜索",
  },

  section: {
    title: "产品规格书",
    description:
      "当前收录已具备中文资料的产品规格书与产品目录；针系列暂无规格书，支持来图定制。",
    resultPrefix: "共",
    resultSuffix: "条资料",
    emptyTitle: "没有找到匹配的资料",
    emptyDescription:
      "可以尝试搜索产品名称、关键词或切换产品分类。若仍未找到，请提交资料需求，我们会协助您获取对应资料。",
  },

  labels: {
    language: "语言",
    version: "版本",
    update: "更新",
    viewProduct: "查看产品",
    download: "下载规格书",
    custom: "来图定制",
  },

  support: {
    kicker: "Need Support",
    title: "没有找到需要的规格书？",
    description:
      "提交产品名称、应用场景或资料需求，我们将协助您获取对应产品规格书，并提供必要的选型建议与技术支持。",
    buttonText: "提交资料需求",
    buttonHref: "/contact?type=datasheet",
  },
};

/* ================================
   筛选按钮数据
================================ */

export const datasheetZhFilterOptions: DatasheetFilterOption[] = [
  { label: "全部", value: "all" },
  { label: "泵系列", value: "pump" },
  { label: "阀系列", value: "valve" },
  { label: "针系列", value: "needle" },
  { label: "管路及连接件系列", value: "tubing" },
];

/* ================================
   中文规格书列表数据
================================ */

export const datasheetZhItems: DatasheetItem[] = [
  {
    id: "sm-piston-pump",
    category: "pump",
    keywords: "SM 柱塞泵 微型柱塞泵 piston pump 精密定量 自动化仪器",
    title: "SM 柱塞泵规格书",
    label: "泵系列",
    language: "中文",
    version: "001",
    update: "2020-08",
    description: "SM 微型柱塞泵适用于紧凑型自动化仪器中的微量液体定量、分配与试剂加注。",
    image:
      "/images/products/pumps/plunger-pump/sm/pump-sm-1000ul-pmma.webp",
    productHref: "/products/pumps/plunger-pumps/sm-miniature-piston-pumps",
    downloadHref:
      "/downloads/resources/datasheets/zh-CN/Pumps/ps-120b-013-001-cn-sm-piston-pump.pdf",
    actionType: "download",
  },
  {
    id: "rpl-p635-valveless-pump",
    category: "pump",
    keywords: "RPL-P6.35 无阀泵 valveless pump 微量定量 液体输送",
    title: "RPL-P6.35 系列无阀泵规格书",
    label: "泵系列",
    language: "中文",
    version: "A01",
    update: "2022-03",
    description: "RPL-P6.35 系列无阀泵适用于自动化分析仪器中的微量定量、加样、滴定与液体输送。",
    image:
      "/images/products/pumps/valveless-pumps/foreach-rpl-p635-valveless-pump.webp",
    productHref: "/products/pumps/valveless-pumps",
    downloadHref:
      "/downloads/resources/datasheets/zh-CN/Pumps/ps-121b-011-a01-cn-rpl-p635-valveless-pump.pdf",
    actionType: "download",
  },
  {
    id: "hmd3-syringe-pump",
    category: "pump",
    keywords: "HMD3 注射泵 电磁阀 syringe pump 30mm 定量 分配",
    title: "HMD3 电磁阀注射泵规格书",
    label: "泵系列",
    language: "中文",
    version: "003",
    update: "2022-08",
    description: "HMD3 电磁阀注射泵采用30 mm行程，适用于自动化仪器中的高精度定量、分配与多通道液体处理。",
    image:
      "/images/products/pumps/syringe-pumps/foreach-hmd3-solenoid-valve-syringe-pump.webp",
    productHref: "/products/pumps/syringe-pumps",
    downloadHref:
      "/downloads/resources/datasheets/zh-CN/Pumps/ps-sdrv-007-003-cn-hmd3-syringe-pump.pdf",
    actionType: "download",
  },
  {
    id: "hmd6-syringe-pump",
    category: "pump",
    keywords: "HMD6 注射泵 电磁阀 syringe pump 60mm 定量 分配",
    title: "HMD6 电磁阀注射泵规格书",
    label: "泵系列",
    language: "中文",
    version: "007",
    update: "2022-08",
    description: "HMD6 电磁阀注射泵采用60 mm行程，适用于自动化仪器中的微升至毫升级定量与多通道液体操作。",
    image:
      "/images/products/pumps/syringe-pumps/foreach-hmd6-solenoid-valve-syringe-pump.webp",
    productHref: "/products/pumps/syringe-pumps",
    downloadHref:
      "/downloads/resources/datasheets/zh-CN/Pumps/ps-sdrv-001-007-cn-hmd6-syringe-pump.pdf",
    actionType: "download",
  },
  {
    id: "dpl30-diaphragm-pump",
    category: "pump",
    keywords: "DPL30 隔膜泵 diaphragm pump 自吸 供液 清洗液",
    title: "DPL30 隔膜泵规格书",
    label: "泵系列",
    language: "中文",
    version: "A03",
    update: "2026-03",
    description: "DPL30 隔膜泵适用于自动化仪器中的液体供给、自吸输送、清洗循环与废液处理。",
    image:
      "/images/products/pumps/diaphragm-pumps/dpl30/images/dpl30-brushed-liquid-diaphragm-pump-main.webp",
    productHref: "/products/pumps/diaphragm-pumps/liquid-diaphragm-pumps",
    downloadHref:
      "/downloads/resources/datasheets/zh-CN/Pumps/ps-150b-2412-00001-a03-cn-dpl30-diaphragm-pump.pdf",
    actionType: "download",
  },
  {
    id: "hp-2-position-6-port-high-pressure-valve",
    category: "valve",
    keywords: "HP 二位六通 带排气 高压旋转阀 高压阀 流路切换",
    title: "HP 二位六通带排气高压阀规格书",
    label: "阀系列",
    language: "中文",
    version: "A00",
    update: "2026-06",
    description: "HP二位六通带排气高压阀适用于高压液路切换、排气控制与精密流体管理。",
    image:
      "/images/products/valves/high-pressure-valves/foreach-high-pressure-valve-main.webp",
    productHref: "/products/valves/high-pressure-valves",
    downloadHref:
      "/downloads/resources/datasheets/zh-CN/Valves/ps-120c-2604-00001-a00-cn-hp-2-position-6-port-high-pressure-valve.pdf",
    actionType: "download",
  },
  {
    id: "fittings-and-tubing-catalog",
    category: "tubing",
    keywords: "连接件 橡塑管 管路 接头 tubing fittings catalog",
    title: "连接件及橡塑管产品目录",
    label: "管路及连接件系列",
    language: "中文",
    version: "A02",
    update: "2026-07",
    description: "涵盖恒永达连接件、接头、橡塑管及常用管路组件的中文产品目录。",
    image:
      "/images/resource/datasheets/thumbnails/resource-datasheet-thumb-tubing-fitting-v002.webp",
    productHref: "/products/fittings",
    downloadHref:
      "/downloads/resources/datasheets/zh-CN/Tubing-and-Fittings/foreach-fittings-and-elastomer-tubing-catalog-a02-cn.pdf",
    actionType: "download",
  },
  {
    id: "sample-probe",
    category: "needle",
    keywords: "针系列 sample probe 来图定制 定制 采样针 加样针",
    title: "针系列",
    label: "针系列",
    language: "—",
    version: "—",
    update: "—",
    description: "暂无规格书，支持根据图纸或样品进行定制沟通。",
    image:
      "/images/resource/datasheets/thumbnails/resource-datasheet-thumb-sample-probe-v001.webp",
    productHref: "/products/probes",
    downloadHref: "/contact?type=custom-probe",
    actionType: "custom",
  },
];
