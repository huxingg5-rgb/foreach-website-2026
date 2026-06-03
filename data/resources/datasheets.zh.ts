/* =========================================================
   datasheets.zh.ts
   恒永达官网｜资源中心｜规格书下载｜中文数据

   文件路径：
   data/resources/datasheets.zh.ts

   作用：
   1. 存放中文规格书下载页面的所有数据
   2. 包括：页面文案、筛选分类、规格书列表
   3. 页面结构和交互不写在这里
   4. 后续新增规格书时，优先修改这个文件

   命名说明：
   1. datasheets = 规格书下载
   2. zh = 中文数据
   3. 当前只服务中文路径 /resources/datasheets
========================================================= */

/* =========================================================
   分类类型
   说明：
   1. all 只用于筛选按钮
   2. 真实规格书条目不使用 all
========================================================= */

export type DatasheetCategoryValue =
  | "all"
  | "pump"
  | "valve"
  | "needle"
  | "tubing"
  | "smart";

/* =========================================================
   规格书条目分类类型
   说明：
   这里排除了 all，因为 all 只是筛选按钮，不是真实分类
========================================================= */

export type DatasheetItemCategory = Exclude<DatasheetCategoryValue, "all">;

/* =========================================================
   规格书按钮类型
   download = 下载规格书
   custom = 来图定制
========================================================= */

export type DatasheetActionType = "download" | "custom";

/* =========================================================
   筛选按钮数据类型
========================================================= */

export type DatasheetFilterOption = {
  label: string;
  value: DatasheetCategoryValue;
};

/* =========================================================
   规格书单条数据类型
========================================================= */

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

/* =========================================================
   页面基础文案
   说明：
   这里放 Banner、标题、说明、底部支持区等文案
========================================================= */

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
      "当前页面仅收录产品规格书；针系列暂无规格书，支持来图定制；产品图纸建议在对应产品详情页获取。",
    resultSuffix: "条资料",
    emptyTitle: "没有找到匹配的资料",
    emptyDescription:
      "可以尝试搜索产品名称、关键词或切换产品分类。若仍未找到，请提交资料需求，我们会协助您获取对应资料。",
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

/* =========================================================
   筛选按钮数据
   说明：
   1. value 用于前端筛选逻辑
   2. label 用于页面显示
========================================================= */

export const datasheetZhFilterOptions: DatasheetFilterOption[] = [
  { label: "全部", value: "all" },
  { label: "泵系列", value: "pump" },
  { label: "阀系列", value: "valve" },
  { label: "针系列", value: "needle" },
  { label: "管路及连接件系列", value: "tubing" },
  { label: "智控模块系列", value: "smart" },
];

/* =========================================================
   中文规格书列表数据
   说明：
   1. image 为缩略图路径
   2. downloadHref 为 PDF 下载路径
   3. 中文 PDF 当前采用：中文文件夹 + 中文 PDF 文件名
   4. 网页路径从 /downloads/... 开始，不写 public
   5. 针系列暂无规格书，所以 actionType 为 custom
========================================================= */

export const datasheetZhItems: DatasheetItem[] = [
  {
    id: "plunger-pump",
    category: "pump",
    keywords: "柱塞泵 plunger pump 高精度 定量 输送",
    title: "柱塞泵系列规格书",
    label: "泵系列",
    language: "中文",
    version: "A01",
    update: "2026-05",
    description: "适用于高精度定量输送、分配与自动化分析仪器液路系统。",
    image:
      "/images/resource/datasheets/thumbnails/resource-datasheet-thumb-plunger-pump-v001.webp",
    productHref: "#",
    downloadHref:
      "/downloads/resources/datasheets/zh-CN/泵系列/柱塞泵系列规格书_A01_恒永达.pdf",
    actionType: "download",
  },
  {
    id: "valveless-pump",
    category: "pump",
    keywords: "无阀泵 valveless pump 微量 定量",
    title: "无阀泵规格书",
    label: "泵系列",
    language: "中文",
    version: "A01",
    update: "2026-05",
    description: "适用于减少阀件数量、提升系统可靠性的微量定量液体应用。",
    image:
      "/images/resource/datasheets/thumbnails/resource-datasheet-thumb-valveless-pump-v001.webp",
    productHref: "#",
    downloadHref:
      "/downloads/resources/datasheets/zh-CN/泵系列/无阀泵规格书_A01_恒永达.pdf",
    actionType: "download",
  },
  {
    id: "diaphragm-pump",
    category: "pump",
    keywords: "隔膜泵 diaphragm pump 自吸 供液",
    title: "隔膜泵规格书",
    label: "泵系列",
    language: "中文",
    version: "A01",
    update: "2026-05",
    description: "适用于小流量供液、自吸输送、清洗液输送与自动化液路集成。",
    image:
      "/images/resource/datasheets/thumbnails/resource-datasheet-thumb-diaphragm-pump-v001.webp",
    productHref: "#",
    downloadHref:
      "/downloads/resources/datasheets/zh-CN/泵系列/隔膜泵规格书_A01_恒永达.pdf",
    actionType: "download",
  },
  {
    id: "high-pressure-pump",
    category: "pump",
    keywords: "高压泵 high pressure pump 耐压 精密输送",
    title: "高压泵规格书",
    label: "泵系列",
    language: "中文",
    version: "A01",
    update: "2026-05",
    description: "适用于高压流体控制、精密输送和特殊耐压液路场景。",
    image:
      "/images/resource/datasheets/thumbnails/resource-datasheet-thumb-high-pressure-pump-v001.webp",
    productHref: "#",
    downloadHref:
      "/downloads/resources/datasheets/zh-CN/泵系列/高压泵规格书_A01_恒永达.pdf",
    actionType: "download",
  },
  {
    id: "syringe-pump",
    category: "pump",
    keywords: "注射泵 syringe pump 多通道 定量 分配",
    title: "注射泵规格书",
    label: "泵系列",
    language: "中文",
    version: "A01",
    update: "2026-05",
    description: "适用于 μL–mL 级高精度定量、分配与多通道液体操作。",
    image:
      "/images/resource/datasheets/thumbnails/resource-datasheet-thumb-syringe-pump-v001.webp",
    productHref: "#",
    downloadHref:
      "/downloads/resources/datasheets/zh-CN/泵系列/注射泵规格书_A01_恒永达.pdf",
    actionType: "download",
  },
  {
    id: "rotary-valve",
    category: "valve",
    keywords: "旋转阀 rotary valve 多通道 流路切换",
    title: "旋转阀规格书",
    label: "阀系列",
    language: "中文",
    version: "A01",
    update: "2026-05",
    description: "适用于多通道流路切换、试剂分配与复杂液路系统集成。",
    image:
      "/images/resource/datasheets/thumbnails/resource-datasheet-thumb-rotary-valve-v001.webp",
    productHref: "#",
    downloadHref:
      "/downloads/resources/datasheets/zh-CN/阀系列/旋转阀规格书_A01_恒永达.pdf",
    actionType: "download",
  },
  {
    id: "high-pressure-valve",
    category: "valve",
    keywords: "高压阀 high pressure valve 耐压 流路切换",
    title: "高压阀规格书",
    label: "阀系列",
    language: "中文",
    version: "A01",
    update: "2026-05",
    description: "适用于高压液路切换、耐压控制与精密流体管理场景。",
    image:
      "/images/resource/datasheets/thumbnails/resource-datasheet-thumb-high-pressure-valve-v001.webp",
    productHref: "#",
    downloadHref:
      "/downloads/resources/datasheets/zh-CN/阀系列/高压阀规格书_A01_恒永达.pdf",
    actionType: "download",
  },
  {
    id: "solenoid-valve",
    category: "valve",
    keywords: "电磁阀 solenoid valve 通断控制 切换",
    title: "电磁阀规格书",
    label: "阀系列",
    language: "中文",
    version: "A01",
    update: "2026-05",
    description: "适用于样本、试剂和清洗液等微流体通断控制与切换。",
    image:
      "/images/resource/datasheets/thumbnails/resource-datasheet-thumb-solenoid-valve-v001.webp",
    productHref: "#",
    downloadHref:
      "/downloads/resources/datasheets/zh-CN/阀系列/电磁阀规格书_A01_恒永达.pdf",
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
    description: "暂无规格书，支持来图定制，可根据图纸或样品进行定制沟通。",
    image:
      "/images/resource/datasheets/thumbnails/resource-datasheet-thumb-sample-probe-v001.webp",
    productHref: "#",
    downloadHref: "/contact?type=custom-probe",
    actionType: "custom",
  },
  {
    id: "tubing-fitting",
    category: "tubing",
    keywords: "管路 连接件 tubing fitting 接头 组件 卡环接头 硬管 软管",
    title: "管路及连接件规格书",
    label: "管路及连接件系列",
    language: "中文",
    version: "A01",
    update: "2026-05",
    description: "适用于微流体系统中的管路连接、硬管/软管组件与常用接头方案。",
    image:
      "/images/resource/datasheets/thumbnails/resource-datasheet-thumb-tubing-fitting-v001.webp",
    productHref: "#",
    downloadHref:
      "/downloads/resources/datasheets/zh-CN/管路及连接件系列/管路及连接件规格书_A01_恒永达.pdf",
    actionType: "download",
  },
  {
    id: "pressure-sensor",
    category: "smart",
    keywords: "压力传感器 pressure sensor 智控模块 监测 压力检测",
    title: "压力传感器规格书",
    label: "智控模块系列",
    language: "中文",
    version: "A01",
    update: "2026-05",
    description: "用于液路压力监测、系统状态反馈与自动化控制集成。",
    image:
      "/images/resource/datasheets/thumbnails/resource-datasheet-thumb-pressure-sensor-v001.webp",
    productHref: "#",
    downloadHref:
      "/downloads/resources/datasheets/zh-CN/智控模块系列/压力传感器规格书_A01_恒永达.pdf",
    actionType: "download",
  },
  {
    id: "bubble-detector",
    category: "smart",
    keywords: "气泡检测 模块 bubble detector 智控模块 气泡检测器",
    title: "气泡检测模块规格书",
    label: "智控模块系列",
    language: "中文",
    version: "A01",
    update: "2026-05",
    description: "用于液路中的气泡识别、异常监测与系统安全控制。",
    image:
      "/images/resource/datasheets/thumbnails/resource-datasheet-thumb-bubble-detector-v001.webp",
    productHref: "#",
    downloadHref:
      "/downloads/resources/datasheets/zh-CN/智控模块系列/气泡检测模块规格书_A01_恒永达.pdf",
    actionType: "download",
  },
]; 