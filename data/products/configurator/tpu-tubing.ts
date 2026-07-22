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
    model: "BU902S06",
    productCode: "436037",
    attributes: {
      series: "T",
      hardness: "95A",
      innerDiameter: 2.5,
      outerDiameter: 4.0,
      color: "本色",
    },
    result: {
      packaging: "30米/卷",
    },
  },
  {
    id: "436103",
    model: "BU502S04",
    productCode: "436103",
    attributes: {
      series: "T",
      hardness: "85A",
      innerDiameter: 2.0,
      outerDiameter: 3.5,
      color: "本色",
    },
    result: {
      packaging: "30米/卷",
    },
  },
  {
    id: "436105",
    model: "BU902004",
    productCode: "436105",
    attributes: {
      series: "T",
      hardness: "95A",
      innerDiameter: 2.4,
      outerDiameter: 4.0,
      color: "本色",
    },
    result: {
      packaging: "30米/卷",
    },
  },
  {
    id: "436106",
    model: "BU0U02S08",
    productCode: "436106",
    attributes: {
      series: "U",
      hardness: "80A",
      innerDiameter: 4.0,
      outerDiameter: 5.7,
      color: "蓝色",
    },
    result: {
      packaging: "30米/卷",
    },
  },
  {
    id: "436107",
    model: "BU0U02S09",
    productCode: "436107",
    attributes: {
      series: "U",
      hardness: "80A",
      innerDiameter: 6.4,
      outerDiameter: 8.6,
      color: "蓝色",
    },
    result: {
      packaging: "30米/卷",
    },
  },
  {
    id: "436108",
    model: "BU502007",
    productCode: "436108",
    attributes: {
      series: "T",
      hardness: "85A",
      innerDiameter: 3.2,
      outerDiameter: 6.4,
      color: "本色",
    },
    result: {
      packaging: "30米/卷",
    },
  },
  {
    id: "436113",
    model: "BU902C09",
    productCode: "436113",
    attributes: {
      series: "T",
      hardness: "95A",
      innerDiameter: 6.0,
      outerDiameter: 8.0,
      color: "本色",
    },
    result: {
      packaging: "30米/卷",
    },
  },
  {
    id: "436010",
    model: "BU902C05",
    productCode: "436010",
    attributes: {
      series: "T",
      hardness: "95A",
      innerDiameter: 4.0,
      outerDiameter: 6.0,
      color: "本色",
    },
    result: {
      packaging: "30米/卷",
    },
  },
  {
    id: "436104",
    model: "BU502004",
    productCode: "436104",
    attributes: {
      series: "T",
      hardness: "85A",
      innerDiameter: 2.4,
      outerDiameter: 4.0,
      color: "本色",
    },
    result: {
      packaging: "30米/卷",
    },
  },
  {
    id: "436114",
    model: "BU902002",
    productCode: "436114",
    attributes: {
      series: "T",
      hardness: "95A",
      innerDiameter: 1.6,
      outerDiameter: 3.2,
      color: "本色",
    },
    result: {
      packaging: "30米/卷",
    },
  },
  {
    id: "436115",
    model: "BUR900163",
    productCode: "436115",
    attributes: {
      series: "T",
      hardness: "95A",
      innerDiameter: 3.2,
      outerDiameter: 6.4,
      color: "红色",
    },
    result: {
      packaging: "30米/卷",
    },
  },
  {
    id: "436116",
    model: "BU902C11",
    productCode: "436116",
    attributes: {
      series: "T",
      hardness: "95A",
      innerDiameter: 7.0,
      outerDiameter: 10.0,
      color: "本色",
    },
    result: {
      packaging: "30米/卷",
    },
  },
];

/* TPU_SIMPLIFIED_DUPLICATE_SELECTION_START */

export const tpuTubingConfigurator:
  ProductConfiguratorConfig = {
  id: "tpu-tubing",

  title: "TPU管尺寸选型",

  description:
    "选择硬度、内径和外径，自动匹配对应型号，用于初步报价、技术沟通和产品确认。",

  productName: "TPU管",

  showProductNameInSelection: false,

  emptyInitialSelection: true,

  autoSelectFollowingDimensions: false,

  emptySelectionText: "未选中状态",

  variantChoiceLabel:
    "请选择具体型号",

  /*
   * TPU筛选顺序：
   * 硬度 → 内径 → 外径
   */
  dimensions: [
    {
      key: "hardness",
      label: "硬度",
      columns: 3,
      order: [
        "80A",
        "85A",
        "95A",
      ],
    },
    {
      key: "innerDiameter",
      label: "内径尺寸",
      unit: "mm",
      precision: 1,
      columns: 3,
    },
    {
      key: "outerDiameter",
      label: "外径尺寸",
      unit: "mm",
      precision: 1,
      columns: 3,
    },
  ],

  variants: tpuTubingVariants,

  fixedSummaryRows: [
    {
      label: "材质",
      value: "TPU",
    },
  ],

  /*
   * 颜色不参与筛选，
   * 只在最终匹配结果里显示。
   */
  resultSummaryRows: [
    {
      key: "packaging",
      label: "包装",
    },
  ],

  noticeTitle:
    "批量定制说明：",

  notice:
    "如采购数量较大，可支持特殊硬度、内外径、颜色、单卷长度及其他规格定制，具体起订量与交期请联系我们确认。",

  uiText: {
    selectionHint:
      "选择硬度、内径和外径，可将不同型号分别加入清单",
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

  title:
    "TPU Tubing Size Selector",

  description:
    "Select the hardness, inner diameter, and outer diameter to match the corresponding model.",

  productName:
    "TPU Tubing",

  emptySelectionText:
    "No selection",

  variantChoiceLabel:
    "Select a Model",

  dimensions: [
    {
      ...tpuTubingConfigurator
        .dimensions[0],
      label: "Hardness",
    },
    {
      ...tpuTubingConfigurator
        .dimensions[1],
      label: "Inner Diameter",
    },
    {
      ...tpuTubingConfigurator
        .dimensions[2],
      label: "Outer Diameter",
    },
  ],

  variants:
    tpuTubingVariants.map(
      (variant) => ({
        ...variant,

        result: {
          ...variant.result,

          color:
            tpuColorEnglishMap[
              String(
                variant.result?.color ||
                ""
              )
            ] ||
            variant.result?.color ||
            "",

          packaging:
            String(
              variant.result
                ?.packaging ||
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
      "Select hardness, inner diameter, and outer diameter, then add different models to your list",

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

/* TPU_SIMPLIFIED_DUPLICATE_SELECTION_END */
