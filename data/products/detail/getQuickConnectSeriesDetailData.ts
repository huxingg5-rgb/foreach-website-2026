import quickConnectRowsJson from "@/data/products/generated/fittings/quick-connect-fittings/index.json";
import {
  quickConnectFittingSelectionProducts,
} from "@/data/products/selection/quick-connect-fitting-selection.generated";
import {
  isPublishedFittingProduct,
  isPublishedFittingProductCode,
} from "@/data/products/selection/fitting-publication.generated";

export type QuickConnectSeries =
  | "Q20"
  | "Q40"
  | "Q60";

type QuickConnectRow = {
  sourceType?: string;
  productId?: string;
  productType?: string;
  series?: string;
  foreachModel?: string;
  productCode?: string;
  competitorModels?: string[];
  modelSeries?: string;
  tubeCode?: string;
  tubeOrThread?: string;
  genderCode?: string;
  gender?: string;
  panelCode?: string;
  panelMount?: string;
  valvedCode?: string;
  valved?: string;
  shapeCode?: string;
  shape?: string;
  housingCode?: string;
  housingMaterial?: string;
  sealCode?: string;
  sealingRingMaterial?: string;
  hasDrawing2d?: boolean;
  hasModel3d?: boolean;
  drawing2dCode?: string;
  model3dCode?: string;
  detailHref?: string;
  selectionHref?: string;
  sourceRow?: number;
};

const allRows =
  (quickConnectRowsJson as QuickConnectRow[]).filter(
    (row) =>
      isPublishedFittingProductCode(row.productCode)
  );

const publishedQuickConnectProducts =
  quickConnectFittingSelectionProducts.filter(
    (product) =>
      isPublishedFittingProduct(product)
  );

const supportedSeries =
  new Set<string>([
    "Q20",
    "Q40",
    "Q60",
  ]);

function cleanText(
  value: unknown
) {
  return String(
    value ?? ""
  ).trim();
}

function uniqueValues(
  values: unknown[]
) {
  return Array.from(
    new Set(
      values
        .map(cleanText)
        .filter(Boolean)
    )
  );
}

function normalizeConnection(
  value: unknown
) {
  const text =
    cleanText(value);

  const metricMatch =
    text.match(
      /[（(]\s*(\d+(?:\.\d+)?)\s*mm\s*[）)]/i
    );

  if (
    metricMatch
  ) {
    return (
      metricMatch[1] +
      " mm"
    );
  }

  return text;
}

function sortConnections(
  values: string[]
) {
  return [
    ...values,
  ].sort(
    (
      left,
      right
    ) => {
      const leftMetric =
        left.match(
          /^(\d+(?:\.\d+)?)\s*mm$/i
        );

      const rightMetric =
        right.match(
          /^(\d+(?:\.\d+)?)\s*mm$/i
        );

      if (
        leftMetric &&
        rightMetric
      ) {
        return (
          Number(
            leftMetric[1]
          ) -
          Number(
            rightMetric[1]
          )
        );
      }

      if (
        leftMetric
      ) {
        return -1;
      }

      if (
        rightMetric
      ) {
        return 1;
      }

      return left.localeCompare(
        right,
        "zh-CN"
      );
    }
  );
}

function joinValues(
  values: string[]
) {
  return values.length
    ? values.join("、")
    : "以具体型号为准";
}

function normalizeSeries(
  value: string
): QuickConnectSeries | null {
  const series =
    cleanText(value)
      .toUpperCase();

  if (
    !supportedSeries.has(
      series
    )
  ) {
    return null;
  }

  return series as QuickConnectSeries;
}

export function getQuickConnectSeriesRows(
  seriesInput: string
) {
  const series =
    normalizeSeries(
      seriesInput
    );

  if (
    !series
  ) {
    return [];
  }

  return allRows.filter(
    (item) =>
      cleanText(
        item.series ||
        item.modelSeries
      )
        .toUpperCase() ===
      series
  );
}

export function getQuickConnectSeriesDetailData(
  seriesInput: string
) {
  const series =
    normalizeSeries(
      seriesInput
    );

  if (
    !series
  ) {
    return null;
  }

  const rows =
    getQuickConnectSeriesRows(
      series
    );

  if (
    rows.length ===
    0
  ) {
    return null;
  }

  const slug =
    series.toLowerCase();

  const selectionHref =
    "/products/fittings/quick-connect-fittings";

  const detailHref =
    selectionHref +
    "/" +
    slug;

  const connections =
    sortConnections(
      uniqueValues(
        rows.map(
          (item) =>
            normalizeConnection(
              item.tubeOrThread
            )
        )
      )
    );

  const genders =
    uniqueValues(
      rows.map(
        (item) =>
          item.gender
      )
    );

  const panelMounts =
    uniqueValues(
      rows.map(
        (item) =>
          item.panelMount
      )
    );

  const valveOptions =
    uniqueValues(
      rows.map(
        (item) =>
          item.valved
      )
    );

  const shapes =
    uniqueValues(
      rows.map(
        (item) =>
          item.shape
      )
    );

  const housingMaterials =
    uniqueValues(
      rows.map(
        (item) =>
          item.housingMaterial
      )
    );

  const sealMaterials =
    uniqueValues(
      rows.map(
        (item) =>
          item.sealingRingMaterial
      )
    );

  const drawingCount =
    rows.filter(
      (item) =>
        item.hasDrawing2d
    ).length;

  const model3dCount =
    rows.filter(
      (item) =>
        item.hasModel3d
    ).length;

  const images =
    uniqueValues(
      publishedQuickConnectProducts
        .filter(
          (product) =>
            cleanText(product.seriesId).toUpperCase() ===
            series
        )
        .map((product) => product.imageCard)
    ).slice(0, 4);
  /* QUICK_CONNECT_SERIES_MODEL_ROWS
   *
   * 系列详情页完整型号表。
   * 商品编码同时作为页面锚点，
   * 用于承接筛选卡片中的#商品编码链接。
   */
  const modelRows = rows.map(
    (item) => ({
      productCode:
        cleanText(
          item.productCode
        ),

      model:
        cleanText(
          item.foreachModel
        ),

      connection:
        normalizeConnection(
          item.tubeOrThread
        ),

      gender:
        cleanText(
          item.gender
        ),

      panelMount:
        cleanText(
          item.panelMount
        ),

      valved:
        cleanText(
          item.valved
        ),

      shape:
        cleanText(
          item.shape
        ),

      housingMaterial:
        cleanText(
          item.housingMaterial
        ),
    })
  );


  const specs = [
    {
      label:
        "在售型号数量",

      value:
        `${rows.length}个`,
    },
    {
      label:
        "接管内径或螺纹",

      value:
        joinValues(
          connections
        ),
    },
    {
      label:
        "公母端",

      value:
        joinValues(
          genders
        ),
    },
    {
      label:
        "安装方式",

      value:
        joinValues(
          panelMounts
        ),
    },
    {
      label:
        "阀门配置",

      value:
        joinValues(
          valveOptions
        ),
    },
    {
      label:
        "形状",

      value:
        joinValues(
          shapes
        ),
    },
    {
      label:
        "外壳材质",

      value:
        joinValues(
          housingMaterials
        ),
    },
    {
      label:
        "密封圈材质",

      value:
        joinValues(
          sealMaterials
        ),
    },
    {
      label:
        "二维图纸",

      value:
        `${drawingCount}个型号已配置`,
    },
    {
      label:
        "三维模型",

      value:
        `${model3dCount}个型号已配置`,
    },
  ];

  const faqs = [
    {
      question:
        `${series}系列目前有多少个在售型号？`,

      answer:
        `当前在售清单共收录${rows.length}个${series}快插接头型号，可根据接管内径或螺纹、公母端、安装方式、阀门配置、形状和外壳材质进行筛选。`,
    },
    {
      question:
        `${series}快插接头如何选择公端和母端？`,

      answer:
        "公端与母端需要配套连接。选型时先确认设备端和管路端所需的连接角色，再确定接口尺寸、阀门配置和安装方式。",
    },
    {
      question:
        "带阀和不带阀有什么区别？",

      answer:
        "带阀型号在接头断开时可以关闭流路，适用于需要减少液体泄漏或空气进入的液路；不带阀型号结构更直接，应根据系统断开方式和流路要求选择。",
    },
    {
      question:
        "穿板型号适合什么安装方式？",

      answer:
        "穿板型号适用于安装在设备面板、机壳或固定支架上；非穿板型号通常用于管路中的直接连接。",
    },
    {
      question:
        `${series}系列有哪些外形结构？`,

      answer:
        `当前在售型号包含${joinValues(
          shapes
        )}结构，具体可选组合以产品筛选结果为准。`,
    },
    {
      question:
        "如何获取具体型号的二维图或三维模型？",

      answer:
        "先在快插接头筛选页面确定具体型号并加入清单，再提交图纸、三维模型或技术资料需求。不同型号的资料配置情况可能不同。",
    },
  ];

  return {
    sourceType:
      "quick-connect-series-detail",

    category:
      "fittings",

    categoryId:
      "fittings",

    categoryLabel:
      "接头系列",

    productTypeId:
      "quick-connect-fittings",

    productTypeName:
      "快插接头",

    productTypeLabel:
      "快插接头",

    productId:
      `quick-connect-${slug}`,

    productCode:
      series,

    seriesId:
      slug,

    seriesName:
      series,

    slug,

    detailSlug:
      slug,

    model:
      `${series} 快插接头系列`,

    modelDisplay:
      `${series}系列｜${rows.length}个在售型号`,

    displayModel:
      `${series}系列｜${rows.length}个在售型号`,

    foreachModel:
      series,

    name:
      `${series}快插接头`,

    title:
      `${series} 快插接头系列`,

    description:
      `${series}快插接头系列目前包含${rows.length}个在售型号，可组合接管或螺纹接口、公端或母端、带阀或不带阀、穿板或非穿板，以及不同外形和外壳材质。用户可根据液路接口、设备安装空间和断开方式完成型号筛选。`,

    advantages: [
      `${rows.length}个在售型号`,
      "公端与母端可选",
      "带阀与不带阀可选",
      "多种安装结构可选",
    ],

    commonApplications: [
      "微流体液路",
      "IVD设备",
      "分析仪器",
      "实验室自动化",
    ],

    mainImage:
      images[0],

    image:
      images[0],

    heroImage:
      images[0],

    imageCard:
      images[0],

    additionalImages:
      images.slice(1),

    imageAlt:
      `${series}快插接头系列`,

    mainImageAlt:
      `${series}快插接头系列`,

    detailMode:
      "selection",

    hideModelAction:
      false,

    showConfigurator:
      true,

    showDatasheetRequest:
      false,

    showDrawingRequest:
      false,

    show3DRequest:
      false,

    drawing2dUrl:
      "",

    drawingPdfUrl:
      "",

    model3dUrl:
      "",

    resources: {},

    specSeriesKey:
      `quick-connect-${slug}`,

    specs,

    specifications:
      specs,

    /* QUICK_CONNECT_SERIES_MODEL_TABLE_DATA */
    modelRows,

    modelTableTitle:
      `${series}系列完整型号`,

    modelTableDescription:
      `当前共${rows.length}个在售型号。点击筛选页面中的查看详情，可直接定位到对应型号。`,
    faqs,
    detailHref,

    href:
      detailHref,

    selectionHref,

    modelSelectionHref:
      selectionHref,

    breadcrumbs: [
      {
        label:
          "首页",

        href:
          "/",
      },
      {
        label:
          "产品中心",

        href:
          "/products",
      },
      {
        label:
          "接头系列",

        href:
          "/products/fittings",
      },
      {
        label:
          "快插接头",

        href:
          selectionHref,
      },
      {
        label:
          `${series}系列`,

        href:
          detailHref,
      },
    ],

    seo: {
      title:
        `${series} 快插接头系列｜FOREACH 恒永达`,

      description:
        `${series}快插接头系列共${rows.length}个在售型号，支持不同接口、公母端、阀门配置、安装方式、形状和外壳材质组合。`,
    },

    sectionTitleMap: {
      spec:
        `${series}系列选型范围`,

      faq:
        `${series}快插接头常见问题`,
    },
  };
}

export function getQuickConnectSeriesMetadata(
  seriesInput: string
) {
  const detail =
    getQuickConnectSeriesDetailData(
      seriesInput
    );

  if (
    !detail
  ) {
    return {
      title:
        "快插接头｜FOREACH 恒永达",
    };
  }

  return {
    title:
      detail.seo.title,

    description:
      detail.seo.description,
  };
}