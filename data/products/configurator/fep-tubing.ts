import type {
  ProductConfiguratorConfig,
  ProductConfiguratorVariant,
} from "@/components/products/configurator";

/*
 * FEP管尺寸选型
 *
 * 当前录入8条已确认型号。
 * 最终型号直接使用BFT型号。
 */
export const fepTubingVariants:
  ProductConfiguratorVariant[] = [
  {
    id: "439072",
    model: "BFT03001",
    productCode: "439072",
    attributes: {
      innerDiameter: 0.3,
      outerDiameter: 1.6,
    },
    result: {
      packaging: "100米/卷",
    },
  },
  {
    id: "439069",
    model: "BFT03002",
    productCode: "439069",
    attributes: {
      innerDiameter: 0.5,
      outerDiameter: 1.6,
    },
    result: {
      packaging: "100米/卷",
    },
  },
  {
    id: "439062",
    model: "BFT03003",
    productCode: "439062",
    attributes: {
      innerDiameter: 0.8,
      outerDiameter: 1.6,
    },
    result: {
      packaging: "100米/卷",
    },
  },
  {
    id: "439070",
    model: "BFT03004",
    productCode: "439070",
    attributes: {
      innerDiameter: 1.0,
      outerDiameter: 1.6,
    },
    result: {
      packaging: "100米/卷",
    },
  },
  {
    id: "439063",
    model: "BFT03007",
    productCode: "439063",
    attributes: {
      innerDiameter: 1.0,
      outerDiameter: 2.0,
    },
    result: {
      packaging: "100米/卷",
    },
  },
  {
    id: "439064",
    model: "BFT03008",
    productCode: "439064",
    attributes: {
      innerDiameter: 1.5,
      outerDiameter: 2.5,
    },
    result: {
      packaging: "100米/卷",
    },
  },
  {
    id: "439066",
    model: "BFT03010",
    productCode: "439066",
    attributes: {
      innerDiameter: 1.6,
      outerDiameter: 3.2,
    },
    result: {
      packaging: "100米/卷",
    },
  },
  {
    id: "439065",
    model: "BFT03009",
    productCode: "439065",
    attributes: {
      innerDiameter: 2.0,
      outerDiameter: 3.0,
    },
    result: {
      packaging: "100米/卷",
    },
  },
];

export const fepTubingConfigurator:
  ProductConfiguratorConfig = {
  id: "fep-tubing",

  title: "FEP管尺寸选型",

  description:
    "选择内径和外径，自动匹配对应型号，用于初步报价、技术沟通和产品确认。",

  productName: "FEP管",

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

  variants: fepTubingVariants,

  fixedSummaryRows: [
    {
      label: "材质",
      value: "FEP",
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

export const fepTubingConfiguratorEn:
  ProductConfiguratorConfig = {
  ...fepTubingConfigurator,

  id: "fep-tubing-en",

  title:
    "FEP Tubing Size Selector",

  description:
    "Select the inner and outer diameters to match the corresponding model for preliminary quotation and product confirmation.",

  productName:
    "FEP Tubing",

  emptySelectionText:
    "No selection",

  dimensions: [
    {
      ...fepTubingConfigurator
        .dimensions[0],
      label: "Inner Diameter",
    },
    {
      ...fepTubingConfigurator
        .dimensions[1],
      label: "Outer Diameter",
    },
  ],

  variants:
    fepTubingVariants.map(
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
      value: "FEP",
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