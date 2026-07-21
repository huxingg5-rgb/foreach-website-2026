import type {
  ProductConfiguratorConfig,
  ProductConfiguratorVariant,
} from "@/components/products/configurator";

/*
 * PEEK管尺寸选型
 *
 * 当前录入2条已确认型号。
 * 最终型号直接使用TH2-PEEK型号。
 */
export const peekTubingVariants:
  ProductConfiguratorVariant[] = [
  {
    id: "436111",
    model: "TH2-PEEK-N-02-08",
    productCode: "436111",
    attributes: {
      innerDiameter: 0.2,
      outerDiameter: 0.8,
    },
    result: {
      packaging: "30米/卷",
    },
  },
  {
    id: "436112",
    model: "TH2-PEEK-N-08-16",
    productCode: "436112",
    attributes: {
      innerDiameter: 0.8,
      outerDiameter: 1.6,
    },
    result: {
      packaging: "30米/卷",
    },
  },
];

export const peekTubingConfigurator:
  ProductConfiguratorConfig = {
  id: "peek-tubing",

  title: "PEEK管尺寸选型",

  description:
    "选择内径和外径，自动匹配对应型号，用于初步报价、技术沟通和产品确认。",

  productName: "PEEK管",

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

  variants: peekTubingVariants,

  fixedSummaryRows: [
    {
      label: "材质",
      value: "PEEK",
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

export const peekTubingConfiguratorEn:
  ProductConfiguratorConfig = {
  ...peekTubingConfigurator,

  id: "peek-tubing-en",

  title:
    "PEEK Tubing Size Selector",

  description:
    "Select the inner and outer diameters to match the corresponding model for preliminary quotation and product confirmation.",

  productName:
    "PEEK Tubing",

  emptySelectionText:
    "No selection",

  dimensions: [
    {
      ...peekTubingConfigurator
        .dimensions[0],
      label: "Inner Diameter",
    },
    {
      ...peekTubingConfigurator
        .dimensions[1],
      label: "Outer Diameter",
    },
  ],

  variants:
    peekTubingVariants.map(
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
      value: "PEEK",
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