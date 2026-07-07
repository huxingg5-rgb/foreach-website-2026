const XLSX = require("xlsx");
const path = require("path");

const output = path.join(
  process.cwd(),
  "data-source/product-center/pumps/FOREACH_移液泵系列_产品数据源.xlsx"
);

const rows = [
  {
    productId: "pipetting-smtp2-1000ul",
    categoryId: "pumps",
    productTypeId: "pipette-pump",
    productTypeSlug: "pipetting-pumps",
    productTypeNameZh: "移液泵",
    productTypeNameEn: "Pipetting Pumps",
    seriesId: "smtp2-programmable-gas-displacement-pipetting-pump",
    seriesSlug: "smtp2-programmable-gas-displacement-pipetting-pump",
    seriesNameZh: "SMTP2 可编程气体置换式移液泵",
    seriesNameEn: "SMTP2 Programmable Gas Displacement Pipetting Pump",
    model: "SMTP2-1000 μL",
    detailSlug: "smtp2-1000ul",
    pumpType: "SMTP2 可编程气体置换式移液泵",
    volume: "1000 μL",
    cardLine1Zh: "定量分辨率 0.02 μL/微步",
    cardLine2Zh: "液面检测与堵塞检测",
    cardLine3Zh: "自动脱吸头",
    cardLine1En: "Resolution 0.02 μL/microstep",
    cardLine2En: "LLD and clog detection",
    cardLine3En: "Automatic tip ejection",
    imageAltZh: "SMTP2 可编程气体置换式移液泵",
    imageAltEn: "SMTP2 programmable gas displacement pipetting pump",
    tagsZh: "1000 μL|0.02 μL/微步|液面检测|堵塞检测|自动脱吸头",
    tagsEn: "1000 μL|0.02 μL/microstep|LLD|clog detection|automatic tip ejection",
    needDrawing: "TRUE",
    needModel3d: "TRUE",
    sortOrder: 10,
    enabled: "TRUE",
  },
  {
    productId: "pipetting-smtp4-100ul",
    categoryId: "pumps",
    productTypeId: "pipette-pump",
    productTypeSlug: "pipetting-pumps",
    productTypeNameZh: "移液泵",
    productTypeNameEn: "Pipetting Pumps",
    seriesId: "smtp4-gas-displacement-pipetting-pump",
    seriesSlug: "smtp4-gas-displacement-pipetting-pump",
    seriesNameZh: "SMTP4 气体置换式移液泵",
    seriesNameEn: "SMTP4 Gas Displacement Pipetting Pump",
    model: "SMTP4-100 μL",
    detailSlug: "smtp4-100ul",
    pumpType: "SMTP4 气体置换式移液泵",
    volume: "100 μL",
    cardLine1Zh: "定量分辨率 0.05 μL/步",
    cardLine2Zh: "吸头配置可定制",
    cardLine3Zh: "自动脱吸头",
    cardLine1En: "Resolution 0.05 μL/step",
    cardLine2En: "Custom tip configuration",
    cardLine3En: "Automatic tip ejection",
    imageAltZh: "SMTP4 气体置换式移液泵 100 μL",
    imageAltEn: "SMTP4 gas displacement pipetting pump 100 μL",
    tagsZh: "100 μL|0.05 μL/步|吸头配置可定制|自动脱吸头",
    tagsEn: "100 μL|0.05 μL/step|custom tip configuration|automatic tip ejection",
    needDrawing: "TRUE",
    needModel3d: "TRUE",
    sortOrder: 20,
    enabled: "TRUE",
  },
  {
    productId: "pipetting-smtp4-500ul",
    categoryId: "pumps",
    productTypeId: "pipette-pump",
    productTypeSlug: "pipetting-pumps",
    productTypeNameZh: "移液泵",
    productTypeNameEn: "Pipetting Pumps",
    seriesId: "smtp4-gas-displacement-pipetting-pump",
    seriesSlug: "smtp4-gas-displacement-pipetting-pump",
    seriesNameZh: "SMTP4 气体置换式移液泵",
    seriesNameEn: "SMTP4 Gas Displacement Pipetting Pump",
    model: "SMTP4-500 μL",
    detailSlug: "smtp4-500ul",
    pumpType: "SMTP4 气体置换式移液泵",
    volume: "500 μL",
    cardLine1Zh: "定量分辨率 0.25 μL/步",
    cardLine2Zh: "吸头配置可定制",
    cardLine3Zh: "自动脱吸头",
    cardLine1En: "Resolution 0.25 μL/step",
    cardLine2En: "Custom tip configuration",
    cardLine3En: "Automatic tip ejection",
    imageAltZh: "SMTP4 气体置换式移液泵 500 μL",
    imageAltEn: "SMTP4 gas displacement pipetting pump 500 μL",
    tagsZh: "500 μL|0.25 μL/步|吸头配置可定制|自动脱吸头",
    tagsEn: "500 μL|0.25 μL/step|custom tip configuration|automatic tip ejection",
    needDrawing: "TRUE",
    needModel3d: "TRUE",
    sortOrder: 30,
    enabled: "TRUE",
  },
];

const intro = [
  {
    productTypeId: "pipette-pump",
    productTypeSlug: "pipetting-pumps",
    titleZh: "移液泵系列",
    titleEn: "Pipetting Pumps",
    descriptionZh:
      "恒永达移液泵系列适用于自动化仪器中的样本转移、试剂分配和微量液体处理场景，采用气体置换方式配合一次性吸头使用，可降低样本残留与交叉污染风险。产品包含 SMTP2 可编程气体置换式移液泵和 SMTP4 气体置换式移液泵，覆盖 100 μL、500 μL 和 1000 μL 基础配置。支持主流一次性吸头及定制吸头适配，吸头适配器长度多种可选，可根据客户设备结构和移液场景进行配置确认。",
    descriptionEn:
      "FOREACH pipetting pumps are designed for automated sample transfer, reagent dispensing, and micro-volume liquid handling. They use gas displacement with disposable tips to help reduce sample residue and cross-contamination. The range includes SMTP2 programmable gas displacement pipetting pumps and SMTP4 gas displacement pipetting pumps, covering 100 μL, 500 μL, and 1000 μL configurations. Mainstream disposable tips and custom tip configurations are supported, with multiple adapter lengths available for application-specific integration.",
  },
];

const wb = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(rows), "selection");
XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(intro), "product_type_intro");

XLSX.writeFile(wb, output);
console.log("created:", output);

