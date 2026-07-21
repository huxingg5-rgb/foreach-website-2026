import type {
  ProductConfiguratorConfig,
  ProductConfiguratorVariant,
} from "@/components/products/configurator";

/*
 * PFA管尺寸选型
 *
 * 型号与商品编码以型号编码表为准，
 * 内径、外径及包装由规格表补充。
 *
 * 最终对应：
 * SF403002 = 0.5 × 1.6 mm
 * SF403003 = 0.8 × 1.6 mm
 * SF403004 = 1.0 × 1.6 mm
 */
export const pfaTubingVariants:
  ProductConfiguratorVariant[] = [
  {
    id: "439081",
    model: "SF403002",
    productCode: "439081",
    attributes: {
      innerDiameter: 0.5,
      outerDiameter: 1.6,
    },
    result: {
      packaging: "100米/卷",
    },
  },
  {
    id: "439082",
    model: "SF403003",
    productCode: "439082",
    attributes: {
      innerDiameter: 0.8,
      outerDiameter: 1.6,
    },
    result: {
      packaging: "100米/卷",
    },
  },
  {
    id: "439080",
    model: "SF403004",
    productCode: "439080",
    attributes: {
      innerDiameter: 1.0,
      outerDiameter: 1.6,
    },
    result: {
      packaging: "100米/卷",
    },
  },
];

export const pfaTubingConfigurator:
  ProductConfiguratorConfig = {
  id: "pfa-tubing",

  title: "PFA管尺寸选型",

  description:
    "选择内径和外径，自动匹配对应型号，用于初步报价、技术沟通和产品确认。",

  productName: "PFA管",

  showProductNameInSelection: false,

  emptyInitialSelection: true,

  autoSelectFollowingDimensions: false,

  emptySelectionText: "未选中状态",

  dimensions: [
    {
      key: "innerDiameter",
      label: "内径尺寸",
      unit: "mm",
      precision: 1,
      columns: 1,
    },
    {
      key: "outerDiameter",
      label: "外径尺寸",
      unit: "mm",
      precision: 1,
      columns: 1,
    },
  ],

  variants: pfaTubingVariants,

  fixedSummaryRows: [
    {
      label: "材质",
      value: "PFA",
    },
  ],

  resultSummaryRows: [
    {
      key: "packaging",
      label: "包装",
    },
  ],

  noticeTitle:
    "批量定制说明：",

  notice:
    "如采购数量较大，可支持特殊内外径、单卷长度及其他规格定制，具体起订量与交期请联系我们确认。",

  uiText: {
    selectionHint:
      "选择内径和外径，可将不同型号分别加入清单",
  },
};

export const pfaTubingConfiguratorEn:
  ProductConfiguratorConfig = {
  ...pfaTubingConfigurator,

  id: "pfa-tubing-en",

  title:
    "PFA Tubing Size Selector",

  description:
    "Select the inner and outer diameters to match the corresponding model for preliminary quotation and product confirmation.",

  productName:
    "PFA Tubing",

  emptySelectionText:
    "No selection",

  dimensions: [
    {
      ...pfaTubingConfigurator
        .dimensions[0],
      label: "Inner Diameter",
    },
    {
      ...pfaTubingConfigurator
        .dimensions[1],
      label: "Outer Diameter",
    },
  ],

  variants:
    pfaTubingVariants.map(
      (variant) => ({
        ...variant,

        result: {
          ...variant.result,

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
      value: "PFA",
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
    "For higher-volume orders, special inner and outer diameters, roll lengths, and other specifications can be customized. Please contact us to confirm MOQ and lead time.",

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
      "Select the inner and outer diameters, then add different models to your list",

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