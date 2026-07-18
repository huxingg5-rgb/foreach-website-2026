import type {
  ProductConfiguratorConfig,
  ProductConfiguratorVariant,
} from "@/components/products/configurator";

/*
 * PTFE管尺寸选型
 *
 * 数据以第二张PTFE表格为最终依据。
 *
 * 颜色代码：
 * B = 黑色
 * N = 本色
 * T = 透明
 *
 * 第二表中的25行全部保留，包括重复商品编码。
 */
export const ptfeTubingVariants:
  ProductConfiguratorVariant[] = [
  {
    id: "436013-th1",
    model: "TH1-PTFE-N-08-16-100FT",
    productCode: "436013",
    attributes: {
      innerDiameter: 0.8,
      outerDiameter: 1.6,
      color: "本色",
    },
    result: {
      packaging: "100英尺/卷",
    },
  },
  {
    id: "436011-th1",
    model: "TH1-PTFE-B-08-16-100M",
    productCode: "436011",
    attributes: {
      innerDiameter: 0.8,
      outerDiameter: 1.6,
      color: "黑色",
    },
    result: {
      packaging: "100米/卷",
    },
  },
  {
    id: "436022-th1",
    model: "TH1-PTFE-N-10-20-100M",
    productCode: "436022",
    attributes: {
      innerDiameter: 1.0,
      outerDiameter: 2.0,
      color: "本色",
    },
    result: {
      packaging: "100米/卷",
    },
  },
  {
    id: "436020-th1",
    model: "TH1-PTFE-B-10-20-100M",
    productCode: "436020",
    attributes: {
      innerDiameter: 1.0,
      outerDiameter: 2.0,
      color: "黑色",
    },
    result: {
      packaging: "100米/卷",
    },
  },
  {
    id: "436027-th1",
    model: "TH1-PTFE-N-15-25-100M",
    productCode: "436027",
    attributes: {
      innerDiameter: 1.5,
      outerDiameter: 2.5,
      color: "本色",
    },
    result: {
      packaging: "100米/卷",
    },
  },
  {
    id: "436036-th1",
    model: "TH1-PTFE-N-16-32-100M",
    productCode: "436036",
    attributes: {
      innerDiameter: 1.6,
      outerDiameter: 3.2,
      color: "本色",
    },
    result: {
      packaging: "100米/卷",
    },
  },
  {
    id: "436024-th2",
    model: "TH2-PTFE-N-12-20-100M",
    productCode: "436024",
    attributes: {
      innerDiameter: 1.2,
      outerDiameter: 2.0,
      color: "本色",
    },
    result: {
      packaging: "100米/卷",
    },
  },
  {
    id: "436034-th2",
    model: "TH2-PTFE-N-20-30-100M",
    productCode: "436034",
    attributes: {
      innerDiameter: 2.0,
      outerDiameter: 3.0,
      color: "本色",
    },
    result: {
      packaging: "100米/卷",
    },
  },
  {
    id: "436035-th1",
    model: "TH1-PTFE-B-16-32-100M",
    productCode: "436035",
    attributes: {
      innerDiameter: 1.6,
      outerDiameter: 3.2,
      color: "黑色",
    },
    result: {
      packaging: "100米/卷",
    },
  },
  {
    id: "436017-th2",
    model: "TH2-PTFE-N-10-16-100M",
    productCode: "436017",
    attributes: {
      innerDiameter: 1.0,
      outerDiameter: 1.6,
      color: "本色",
    },
    result: {
      packaging: "100米/卷",
    },
  },
  {
    id: "436028-th2",
    model: "TH2-PTFE-N-15-25-100M",
    productCode: "436028",
    attributes: {
      innerDiameter: 1.5,
      outerDiameter: 2.5,
      color: "本色",
    },
    result: {
      packaging: "100米/卷",
    },
  },
  {
    id: "436023-th2",
    model: "TH2-PTFE-N-10-20-100M",
    productCode: "436023",
    attributes: {
      innerDiameter: 1.0,
      outerDiameter: 2.0,
      color: "本色",
    },
    result: {
      packaging: "100米/卷",
    },
  },
  {
    id: "436033-th2",
    model: "TH2-PTFE-B-20-30-100M",
    productCode: "436033",
    attributes: {
      innerDiameter: 2.0,
      outerDiameter: 3.0,
      color: "黑色",
    },
    result: {
      packaging: "100米/卷",
    },
  },
  {
    id: "436021-th2",
    model: "TH2-PTFE-B-10-20-100M",
    productCode: "436021",
    attributes: {
      innerDiameter: 1.0,
      outerDiameter: 2.0,
      color: "黑色",
    },
    result: {
      packaging: "100米/卷",
    },
  },
  {
    id: "436093-th1",
    model: "TH1-PTFE-N-32-48-100M",
    productCode: "436093",
    attributes: {
      innerDiameter: 3.2,
      outerDiameter: 4.8,
      color: "本色",
    },
    result: {
      packaging: "100米/卷",
    },
  },
  {
    id: "436094-th2",
    model: "TH2-PTFE-N-05-16-100M",
    productCode: "436094",
    attributes: {
      innerDiameter: 0.5,
      outerDiameter: 1.6,
      color: "本色",
    },
    result: {
      packaging: "100米/卷",
    },
  },
  {
    id: "436102-th1",
    model: "TH1-PTFE-B-15-25-100M",
    productCode: "436102",
    attributes: {
      innerDiameter: 1.5,
      outerDiameter: 2.5,
      color: "黑色",
    },
    result: {
      packaging: "100米/卷",
    },
  },
  {
    id: "436121-th1",
    model: "TH1-PTFE-N-20-30-100M",
    productCode: "436121",
    attributes: {
      innerDiameter: 2.0,
      outerDiameter: 3.0,
      color: "本色",
    },
    result: {
      packaging: "100米/卷",
    },
  },
  {
    id: "436122-th2",
    model: "TH2-PTFE-N-30-40-100M",
    productCode: "436122",
    attributes: {
      innerDiameter: 3.0,
      outerDiameter: 4.0,
      color: "本色",
    },
    result: {
      packaging: "100米/卷",
    },
  },
  {
    id: "436136-th2",
    model: "TH2-PTFE-N-17-25-100M",
    productCode: "436136",
    attributes: {
      innerDiameter: 1.7,
      outerDiameter: 2.5,
      color: "本色",
    },
    result: {
      packaging: "100米/卷",
    },
  },
  {
    id: "436102-th2",
    model: "TH2-PTFE-B-15-25-100M",
    productCode: "436102",
    attributes: {
      innerDiameter: 1.5,
      outerDiameter: 2.5,
      color: "黑色",
    },
    result: {
      packaging: "100米/卷",
    },
  },
  {
    id: "439136-th2",
    model: "TH2-PTFE-N-16-32-100M",
    productCode: "439136",
    attributes: {
      innerDiameter: 1.6,
      outerDiameter: 3.2,
      color: "本色",
    },
    result: {
      packaging: "100米/卷",
    },
  },
  {
    id: "436137-th2",
    model: "TH2-PTFE-N-16-32-100M",
    productCode: "436137",
    attributes: {
      innerDiameter: 1.6,
      outerDiameter: 3.2,
      color: "本色",
    },
    result: {
      packaging: "100米/卷",
    },
  },
  {
    id: "439093-th2",
    model: "TH2-PTFE-N-40-60-100M",
    productCode: "439093",
    attributes: {
      innerDiameter: 4.0,
      outerDiameter: 6.0,
      color: "本色",
    },
    result: {
      packaging: "100米/卷",
    },
  },
  {
    id: "436145-th2",
    model: "TH2-PTFE-T-16-32-100M",
    productCode: "436145",
    attributes: {
      innerDiameter: 1.6,
      outerDiameter: 3.2,
      color: "透明",
    },
    result: {
      packaging: "100米/卷",
    },
  },
];

export const ptfeTubingConfigurator:
  ProductConfiguratorConfig = {
  id: "ptfe-tubing",

  title: "PTFE管尺寸选型",

  description:
    "选择内径、外径和颜色，自动匹配对应型号，用于初步报价、技术沟通和产品确认。",

  productName: "PTFE管",

  showProductNameInSelection: false,

  emptyInitialSelection: true,

  autoSelectFollowingDimensions: false,

  emptySelectionText: "未选中状态",

  variantChoiceLabel:
    "请选择具体型号",

  variantChoiceHint:
    "当前规格对应多个型号，请根据最终型号和商品编码选择。",

  dimensions: [
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
      order: [
        "本色",
        "黑色",
        "透明",
      ],
    },
  ],

  variants: ptfeTubingVariants,

  fixedSummaryRows: [
    {
      label: "材质",
      value: "PTFE",
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
    "如采购数量较大，可支持特殊内外径、颜色、单卷长度及其他规格定制，具体起订量与交期请联系我们确认。",

  uiText: {
    selectionHint:
      "选择内径、外径和颜色，可将不同型号分别加入清单",
  },
};

const ptfeColorEnglishMap:
  Record<string, string> = {
  本色: "Natural",
  黑色: "Black",
  透明: "Transparent",
};

export const ptfeTubingConfiguratorEn:
  ProductConfiguratorConfig = {
  ...ptfeTubingConfigurator,

  id: "ptfe-tubing-en",

  title:
    "PTFE Tubing Size Selector",

  description:
    "Select the inner diameter, outer diameter, and color to match the corresponding model.",

  productName:
    "PTFE Tubing",

  emptySelectionText:
    "No selection",

  variantChoiceLabel:
    "Select a Model",

  variantChoiceHint:
    "This specification matches multiple models. Select the required model and product code.",

  dimensions: [
    {
      ...ptfeTubingConfigurator
        .dimensions[0],
      label: "Inner Diameter",
    },
    {
      ...ptfeTubingConfigurator
        .dimensions[1],
      label: "Outer Diameter",
    },
    {
      ...ptfeTubingConfigurator
        .dimensions[2],
      label: "Color",
      order: [
        "Natural",
        "Black",
        "Transparent",
      ],
    },
  ],

  variants:
    ptfeTubingVariants.map(
      (variant) => ({
        ...variant,

        attributes: {
          ...variant.attributes,

          color:
            ptfeColorEnglishMap[
              String(
                variant.attributes.color ||
                ""
              )
            ] ||
            variant.attributes.color,
        },

        result: {
          ...variant.result,

          packaging:
            String(
              variant.result
                ?.packaging ||
              ""
            )
              .replace(
                "100英尺/卷",
                "100 ft/roll"
              )
              .replace(
                "100米/卷",
                "100 m/roll"
              ),
        },
      })
    ),

  fixedSummaryRows: [
    {
      label: "Material",
      value: "PTFE",
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
    "For higher-volume orders, special inner and outer diameters, colors, roll lengths, and other specifications can be customized. Please contact us to confirm MOQ and lead time.",

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
      "Select the inner diameter, outer diameter, and color, then add different models to your list",

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