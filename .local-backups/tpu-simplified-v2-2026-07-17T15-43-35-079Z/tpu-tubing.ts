import type {
  ProductConfiguratorConfig,
  ProductConfiguratorVariant,
} from "@/components/products/configurator";

/*
 * TPU管选型数据
 *
 * 当前仅录入第三张最终表中已经确认的13条。
 * 最终对外型号、内外径和卷长以第三张表为准。
 * 内部BU型号、硬度和颜色由前两张表补充。
 */

export const tpuTubingVariants:
  ProductConfiguratorVariant[] = [
  {
    id: "436037",
    model: "TS2-TPU-T-25-40-30M",
    productCode: "436037",
    attributes: {
      series: "T",
      hardness: "95A",
      innerDiameter: 2.5,
      outerDiameter: 4.0,
      color: "本色",
    },
    result: {
      internalModel: "BU902S06",
      packaging: "30米/卷",
    },
  },
  {
    id: "436075",
    model: "TS2-TPU-B-24-40",
    productCode: "436075",
    attributes: {
      series: "B",
      hardness: "95A",
      innerDiameter: 2.4,
      outerDiameter: 4.0,
      color: "本色",
    },
    result: {
      internalModel: "BU9B02004",
      packaging: "30米/卷",
    },
  },
  {
    id: "436103",
    model: "TS2-TPU-T-20-35-30M",
    productCode: "436103",
    attributes: {
      series: "T",
      hardness: "85A",
      innerDiameter: 2.0,
      outerDiameter: 3.5,
      color: "本色",
    },
    result: {
      internalModel: "BU502S04",
      packaging: "30米/卷",
    },
  },
  {
    id: "436105",
    model: "TS2-TPU-T-24-40-30M",
    productCode: "436105",
    attributes: {
      series: "T",
      hardness: "95A",
      innerDiameter: 2.4,
      outerDiameter: 4.0,
      color: "本色",
    },
    result: {
      internalModel: "BU902004",
      packaging: "30米/卷",
    },
  },
  {
    id: "436106",
    model: "TS2-TPU-U-40-57-30M",
    productCode: "436106",
    attributes: {
      series: "U",
      hardness: "80A",
      innerDiameter: 4.0,
      outerDiameter: 5.7,
      color: "蓝色",
    },
    result: {
      internalModel: "BU0U02S08",
      packaging: "30米/卷",
    },
  },
  {
    id: "436107",
    model: "TS2-TPU-U-64-86-30M",
    productCode: "436107",
    attributes: {
      series: "U",
      hardness: "80A",
      innerDiameter: 6.4,
      outerDiameter: 8.6,
      color: "蓝色",
    },
    result: {
      internalModel: "BU0U02S09",
      packaging: "30米/卷",
    },
  },
  {
    id: "436108",
    model: "TS2-TPU-T-32-64-30M",
    productCode: "436108",
    attributes: {
      series: "T",
      hardness: "85A",
      innerDiameter: 3.2,
      outerDiameter: 6.4,
      color: "本色",
    },
    result: {
      internalModel: "BU502007",
      packaging: "30米/卷",
    },
  },
  {
    id: "436113",
    model: "TS2-TPU-T-60-80-30M",
    productCode: "436113",
    attributes: {
      series: "T",
      hardness: "95A",
      innerDiameter: 6.0,
      outerDiameter: 8.0,
      color: "本色",
    },
    result: {
      internalModel: "BU902C09",
      packaging: "30米/卷",
    },
  },
  {
    id: "436010",
    model: "TS2-TPU-T-40-60-30M",
    productCode: "436010",
    attributes: {
      series: "T",
      hardness: "95A",
      innerDiameter: 4.0,
      outerDiameter: 6.0,
      color: "本色",
    },
    result: {
      internalModel: "BU902C05",
      packaging: "30米/卷",
    },
  },
  {
    id: "436104",
    model: "TS2-TPU-T-24-40-30M",
    productCode: "436104",
    attributes: {
      series: "T",
      hardness: "85A",
      innerDiameter: 2.4,
      outerDiameter: 4.0,
      color: "本色",
    },
    result: {
      internalModel: "BU502004",
      packaging: "30米/卷",
    },
  },
  {
    id: "436114",
    model: "TS2-TPU-T-16-32-30M",
    productCode: "436114",
    attributes: {
      series: "T",
      hardness: "95A",
      innerDiameter: 1.6,
      outerDiameter: 3.2,
      color: "本色",
    },
    result: {
      internalModel: "BU902002",
      packaging: "30米/卷",
    },
  },
  {
    id: "436115",
    model: "TS2-TPU-T-32-64-30M",
    productCode: "436115",
    attributes: {
      series: "T",
      hardness: "95A",
      innerDiameter: 3.2,
      outerDiameter: 6.4,
      color: "红色",
    },
    result: {
      internalModel: "BUR900163",
      packaging: "30米/卷",
    },
  },
  {
    id: "436116",
    model: "TS2-TPU-T-70-100-30M",
    productCode: "436116",
    attributes: {
      series: "T",
      hardness: "95A",
      innerDiameter: 7.0,
      outerDiameter: 10.0,
      color: "本色",
    },
    result: {
      internalModel: "BU902C11",
      packaging: "30米/卷",
    },
  },
];

export const tpuTubingConfigurator:
  ProductConfiguratorConfig = {
  id: "tpu-tubing",

  title: "TPU管尺寸选型",

  description:
    "选择完整规格，自动匹配对应型号，用于初步报价、技术沟通和产品确认。",

  productName: "TPU管",

  showProductNameInSelection: false,

  emptyInitialSelection: true,

  autoSelectFollowingDimensions: false,

  emptySelectionText: "未选中状态",

  dimensions: [
    {
      key: "series",
      label: "规格系列",
      columns: 1,
      order: ["T", "B", "U"],
    },
    {
      key: "hardness",
      label: "硬度",
      columns: 1,
      order: ["80A", "85A", "95A"],
    },
    {
      key: "innerDiameter",
      label: "内径尺寸",
      unit: "mm",
      precision: 1,
      columns: 2,
    },
    {
      key: "outerDiameter",
      label: "外径尺寸",
      unit: "mm",
      precision: 1,
      columns: 2,
    },
    {
      key: "color",
      label: "颜色",
      columns: 1,
      order: ["本色", "蓝色", "红色"],
    },
  ],

  variants: tpuTubingVariants,

  fixedSummaryRows: [
    {
      label: "材质",
      value: "TPU",
    },
  ],

  resultSummaryRows: [
    {
      key: "internalModel",
      label: "内部型号",
    },
    {
      key: "packaging",
      label: "包装",
    },
  ],

  noticeTitle: "批量定制说明：",

  notice:
    "如采购数量较大，可支持特殊硬度、内外径、颜色、单卷长度及其他规格定制，具体起订量与交期请联系我们确认。",

  uiText: {
    selectionHint:
      "可调整规格组合，并将不同型号分别加入清单",
  },
};

const tpuColorEnglishMap:
  Record<string, string> = {
  本色: "Natural",
  蓝色: "Blue",
  红色: "Red",
};

export const tpuTubingConfiguratorEn:
  ProductConfiguratorConfig = {
  ...tpuTubingConfigurator,

  id: "tpu-tubing-en",

  title: "TPU Tubing Size Selector",

  description:
    "Select a complete specification to automatically match the corresponding model for preliminary quotation, technical discussion, and product confirmation.",

  productName: "TPU Tubing",

  emptySelectionText: "No selection",

  dimensions: [
    {
      ...tpuTubingConfigurator.dimensions[0],
      label: "Series",
    },
    {
      ...tpuTubingConfigurator.dimensions[1],
      label: "Hardness",
    },
    {
      ...tpuTubingConfigurator.dimensions[2],
      label: "Inner Diameter",
    },
    {
      ...tpuTubingConfigurator.dimensions[3],
      label: "Outer Diameter",
    },
    {
      ...tpuTubingConfigurator.dimensions[4],
      label: "Color",
      order: ["Natural", "Blue", "Red"],
    },
  ],

  variants: tpuTubingVariants.map(
    (variant) => ({
      ...variant,

      attributes: {
        ...variant.attributes,

        color:
          tpuColorEnglishMap[
            String(
              variant.attributes.color ||
              ""
            )
          ] ||
          variant.attributes.color,
      },

      result: {
        ...variant.result,

        packaging: String(
          variant.result?.packaging ||
          ""
        ).replace(
          "米/卷",
          " m/roll"
        ),
      },
    })
  ),

  fixedSummaryRows: [
    {
      label: "Material",
      value: "TPU",
    },
  ],

  resultSummaryRows: [
    {
      key: "internalModel",
      label: "Internal Model",
    },
    {
      key: "packaging",
      label: "Packaging",
    },
  ],

  noticeTitle:
    "Bulk customization:",

  notice:
    "For higher-volume orders, special hardness, inner and outer diameters, colors, roll lengths, and other specifications can be customized. Please contact us to confirm MOQ and lead time.",

  uiText: {
    closeAriaLabel:
      "Close size selector",

    currentSelection:
      "Current Selection",

    finalModel:
      "Matched Model",

    productCode:
      "Product Code",

    configuration:
      "Select a Configuration",

    selectionHint:
      "Adjust the specification combination and add multiple models to your list",

    matchedModel:
      "Matched Model",

    noMatchedModel:
      "No matching model",

    copyModel:
      "Copy Model",

    copied:
      "Copied",

    addToList:
      "Add to List",

    addedToList:
      "Added to List",

    confirmAndReturn:
      "Confirm and Return",

    defaultNoticeTitle:
      "Bulk customization:",

    defaultNotice:
      "For higher-volume orders, customized specifications are available. Please contact us to confirm MOQ and lead time.",
  },
};
