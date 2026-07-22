export type PipettingPumpSelectionCard = {
  model: string;
  slug: string;
  productType: "移液泵";
  pumpType: "SMTP2 可编程气体置换式移液泵" | "SMTP4 气体置换式移液泵";
  volume: "100 μL" | "500 μL" | "1000 μL";
  cardLines: [string, string, string];
  detailHref: string;
  imagePath: string;
  needDrawing: boolean;
  needModel3d: boolean;
};

export const pipettingPumpSelectionIntro = {
  title: "移液泵系列",
  description:
    "恒永达移液泵系列适用于自动化仪器中的样本转移、试剂分配和微量液体处理场景，采用气体置换方式配合一次性吸头使用，可降低样本残留与交叉污染风险。产品包含 SMTP2 可编程气体置换式移液泵和 SMTP4 气体置换式移液泵，覆盖 100 μL、500 μL 和 1000 μL 基础配置。支持主流一次性吸头及定制吸头适配，吸头适配器长度多种可选，可根据客户设备结构和移液场景进行配置确认。",
};

export const pipettingPumpFilters = {
  productTypes: ["移液泵"],
  pumpTypes: [
    "SMTP2 可编程气体置换式移液泵",
    "SMTP4 气体置换式移液泵",
  ],
  volumes: ["100 μL", "500 μL", "1000 μL"],
};

export const pipettingPumpSelectionCards: PipettingPumpSelectionCard[] = [
  {
    model: "SMTP2-1000 μL",
    slug: "smtp2-1000ul",
    productType: "移液泵",
    pumpType: "SMTP2 可编程气体置换式移液泵",
    volume: "1000 μL",
    cardLines: [
      "定量分辨率 0.02 μL/微步",
      "液面检测与堵塞检测",
      "自动脱吸头",
    ],
    detailHref: "/products/pumps/pipetting-pumps/smtp2-1000ul",
    imagePath: "/images/products/pumps/pipetting-pumps/smtp2-1000ul.webp",
    needDrawing: true,
    needModel3d: true,
  },
  {
    model: "SMTP4-100 μL",
    slug: "smtp4-100ul",
    productType: "移液泵",
    pumpType: "SMTP4 气体置换式移液泵",
    volume: "100 μL",
    cardLines: [
      "定量分辨率 0.05 μL/步",
      "吸头配置可定制",
      "自动脱吸头",
    ],
    detailHref: "/products/pumps/pipetting-pumps/smtp4-100ul",
    imagePath: "/images/products/pumps/pipetting-pumps/smtp4-100ul.webp",
    needDrawing: true,
    needModel3d: true,
  },
  {
    model: "SMTP4-500 μL",
    slug: "smtp4-500ul",
    productType: "移液泵",
    pumpType: "SMTP4 气体置换式移液泵",
    volume: "500 μL",
    cardLines: [
      "定量分辨率 0.25 μL/步",
      "吸头配置可定制",
      "自动脱吸头",
    ],
    detailHref: "/products/pumps/pipetting-pumps/smtp4-500ul",
    imagePath: "/images/products/pumps/pipetting-pumps/smtp4-500ul.webp",
    needDrawing: true,
    needModel3d: true,
  },
];

export const pipettingPumpSelectionSummary = {
  productType: "移液泵",
  total: pipettingPumpSelectionCards.length,
  resultText: `已找到 ${pipettingPumpSelectionCards.length} 个基础配置`,
};
