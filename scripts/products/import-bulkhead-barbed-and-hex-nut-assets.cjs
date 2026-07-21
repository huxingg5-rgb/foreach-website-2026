const fs = require("fs");
const path = require("path");
const ts = require("typescript");

const root = process.cwd();

const productTypeId = "bulkhead-barbed-fittings";
const selectionHref = "/products/fittings/bulkhead-barbed-fittings";
const placeholderImage = "/images/logo/foreach-logo-color.svg";

const imageSourceDirectory =
  "H:\\01-官网项目\\02_产品中心\\fit\\Panel mount union\\穿版倒刺接头产品图_JPG\\新建文件夹";

const drawingSourceDirectory =
  "H:\\01-官网项目\\02_产品中心\\fit\\Panel mount union\\穿版倒刺接头2D_PDF";

const imagePublicDirectory = path.join(
  root,
  "public",
  "images",
  "products",
  "fittings",
  "bulkhead-barbed-fittings",
  "products"
);

const drawingPublicDirectory = path.join(
  root,
  "public",
  "assets",
  "products",
  "fittings",
  "bulkhead-barbed-fittings",
  "2d-drawings"
);

const selectionPath = path.join(
  root,
  "data",
  "products",
  "selection",
  "bulkhead-barbed-fitting-selection.generated.ts"
);

const detailPath = path.join(
  root,
  "data",
  "products",
  "generated",
  "fittings",
  "bulkhead-barbed-fittings",
  "detail",
  "index.json"
);

const routeMapPath = path.join(
  root,
  "data",
  "products",
  "selection",
  "product-route-map.ts"
);

const reportPath = path.join(
  root,
  "reports",
  "bulkhead-barbed-and-nut-import-report.md"
);

/*
 * 9个PMB来自权威Excel。
 * 2个PMBSN来自用户提供的正式资料页。
 *
 * drawingCode只填写已经通过资源检查精确匹配的PDF。
 * 两个未归属PDF不在本次自动绑定，避免错误挂图。
 */
const sourceRecords = [
  {
    source: "权威Excel",
    structure: "穿板倒刺接头",
    model: "PMB-U28-24D-PP-N",
    productCode: "809462",
    internalCode: "443-02-00039",
    drawingCode: "443-02-00039",
  },
  {
    source: "权威Excel",
    structure: "穿板倒刺接头",
    model: "PMB-U28-32D-PP-N",
    productCode: "809463",
    internalCode: "443-02-00040",
    drawingCode: "443-02-00040",
  },
  {
    source: "权威Excel",
    structure: "穿板倒刺接头",
    model: "PMB-U28-24D-PA-W",
    productCode: "809496",
    internalCode: "443-02-00073",
    drawingCode: "443-02-00073",
  },
  {
    source: "权威Excel",
    structure: "穿板倒刺接头",
    model: "PMB-U28-32D-PA-W",
    productCode: "809497",
    internalCode: "443-02-00074",
    drawingCode: "443-02-00074",
  },
  {
    source: "权威Excel",
    structure: "穿板倒刺接头",
    model: "PMB-U28-16D-PP-N",
    productCode: "809304",
    internalCode: "443-02-00323",
    drawingCode: "443-02-00323",
  },
  {
    source: "权威Excel",
    structure: "穿板倒刺接头",
    model: "PMB-U28-16D-PA-W",
    productCode: "809517",
    internalCode: "443-02-00470",
    drawingCode: "443-02-00470",
  },
  {
    source: "权威Excel",
    structure: "穿板倒刺接头",
    model: "PMB-M6-40-PP-N",
    productCode: "806233",
    internalCode: "382-19-00400",
    drawingCode: "",
  },
  {
    source: "权威Excel",
    structure: "穿板倒刺接头",
    model: "PMB-M10-64-PP-N",
    productCode: "806235",
    internalCode: "382-19-00402",
    drawingCode: "",
  },
  {
    source: "权威Excel",
    structure: "穿板倒刺接头",
    model: "PMB-M12-79-PP-N",
    productCode: "806236",
    internalCode: "382-19-00403",
    drawingCode: "",
  },
  {
    source: "用户正式资料页",
    structure: "六角螺母",
    model: "PMBSN-U28-PA-W",
    productCode: "809498",
    internalCode: "",
    drawingCode: "",
  },
  {
    source: "用户正式资料页",
    structure: "六角螺母",
    model: "PMBSN-U28-PP-N",
    productCode: "809464",
    internalCode: "",
    drawingCode: "",
  },
];

function text(value) {
  return String(value ?? "").trim();
}

function multilingual(zh, en) {
  return {
    zh,
    en,
    es: en,
    fr: en,
    ko: en,
    ru: en,
  };
}

function slugifyModel(model) {
  return text(model)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function parseModel(model) {
  const pmbMatch = text(model)
    .toUpperCase()
    .match(/^PMB-(U28|M6|M10|M12)-(\d+D?)-(PP|PA)-(N|W)$/);

  if (pmbMatch) {
    const [, threadCode, tubeCodeRaw, material, colorCode] = pmbMatch;

    const threadMap = {
      U28: "1/4-28 UNF",
      M6: "M6",
      M10: "M10",
      M12: "M12",
    };

    const tubeMap = {
      "16": "1.6 mm",
      "24": "2.4 mm",
      "32": "3.2 mm",
      "40": "4.0 mm",
      "64": "6.4 mm",
      "79": "7.9 mm",
    };

    const tubeCode = tubeCodeRaw.replace(/D$/, "");
    const thread = threadMap[threadCode];
    const tubeId = tubeMap[tubeCode];
    const color = colorCode === "N" ? "本色" : "白色";

    if (!thread || !tubeId) {
      throw new Error(`PMB型号解析不完整：${model}`);
    }

    return {
      structure: "穿板倒刺接头",
      thread,
      tubeId,
      material,
      color,
    };
  }

  const nutMatch = text(model)
    .toUpperCase()
    .match(/^PMBSN-(U28)-(PP|PA)-(N|W)$/);

  if (nutMatch) {
    const [, threadCode, material, colorCode] = nutMatch;

    return {
      structure: "六角螺母",
      thread: threadCode === "U28" ? "1/4-28 UNF" : "",
      tubeId: "",
      material,
      color: colorCode === "N" ? "本色" : "白色",
    };
  }

  throw new Error(`无法解析型号：${model}`);
}

function resolveImage(record) {
  const sourcePath = path.join(
    imageSourceDirectory,
    `${record.model}.jpg`
  );

  if (!fs.existsSync(sourcePath)) {
    return {
      sourcePath: "",
      publicPath: "",
      url: placeholderImage,
    };
  }

  const filename = `${record.slug}-main.jpg`;
  const publicPath = path.join(imagePublicDirectory, filename);

  return {
    sourcePath,
    publicPath,
    url:
      `/images/products/fittings/bulkhead-barbed-fittings/products/${filename}`,
  };
}

function resolveDrawing(record) {
  if (!record.drawingCode) {
    return {
      sourcePath: "",
      publicPath: "",
      url: "",
    };
  }

  const sourcePath = path.join(
    drawingSourceDirectory,
    `${record.drawingCode}.pdf`
  );

  if (!fs.existsSync(sourcePath)) {
    return {
      sourcePath: "",
      publicPath: "",
      url: "",
    };
  }

  const filename = `${record.slug}.pdf`;
  const publicPath = path.join(drawingPublicDirectory, filename);

  return {
    sourcePath,
    publicPath,
    url:
      `/assets/products/fittings/bulkhead-barbed-fittings/2d-drawings/${filename}`,
  };
}

function buildRecords() {
  return sourceRecords.map((source, index) => {
    const slug = slugifyModel(source.model);
    const parsed = parseModel(source.model);

    const record = {
      ...source,
      slug,
      parsed,
      sortOrder: index + 1,
    };

    return {
      ...record,
      imageResource: resolveImage(record),
      drawingResource: resolveDrawing(record),
    };
  });
}

function createSelectionProduct(record) {
  const { parsed } = record;
  const detailHref = `${selectionHref}/${record.slug}`;

  const zhLines =
    record.structure === "六角螺母"
      ? [
          "六角螺母",
          `${parsed.thread}螺纹，螺母材质为${parsed.material}`,
          "用于穿板接头安装固定",
        ]
      : [
          "穿板倒刺接头",
          `${parsed.thread}螺纹，壳体材质为${parsed.material}`,
          `适配${parsed.tubeId}接管内径`,
        ];

  const enLines =
    record.structure === "六角螺母"
      ? [
          "Hex Nut",
          `${parsed.thread} thread, ${parsed.material} material`,
          "For bulkhead fitting installation",
        ]
      : [
          "Bulkhead Barbed Fitting",
          `${parsed.thread} thread, ${parsed.material} housing`,
          `For ${parsed.tubeId} tube ID`,
        ];

  const filters = {
    filter01: record.structure,
    filter02: parsed.thread,
    filter04: parsed.material,
    filter05: parsed.color,
  };

  if (parsed.tubeId) {
    filters.filter03 = parsed.tubeId;
  }

  return {
    productId: record.productCode,
    productCode: record.productCode,
    categoryId: "fittings",
    category: "fittings",
    productTypeId,
    productType: productTypeId,
    seriesId:
      record.structure === "六角螺母"
        ? "pmbsn"
        : "pmb",
    seriesName: multilingual(
      record.structure,
      record.structure === "六角螺母"
        ? "Hex Nut"
        : "PMB Bulkhead Barbed Fitting"
    ),
    model: record.model,
    displayModel: record.model,
    name: multilingual(
      record.structure,
      record.structure === "六角螺母"
        ? "Hex Nut"
        : "Bulkhead Barbed Fitting"
    ),
    title: multilingual(
      record.structure,
      record.structure === "六角螺母"
        ? "Hex Nut"
        : "Bulkhead Barbed Fitting"
    ),
    displayName: multilingual(
      record.structure,
      record.structure === "六角螺母"
        ? "Hex Nut"
        : "Bulkhead Barbed Fitting"
    ),
    cardTitle: multilingual(record.model, record.model),
    cardSubtitle: multilingual(
      zhLines.join("\n"),
      enLines.join("\n")
    ),
    image: record.imageResource.url,
    imagePath: record.imageResource.url,
    imageUrl: record.imageResource.url,
    imageAlt: multilingual(
      `${record.model} ${record.structure}`,
      `${record.model} ${
        record.structure === "六角螺母"
          ? "hex nut"
          : "bulkhead barbed fitting"
      }`
    ),
    filters,
    detailHref,
    href: detailHref,
    selectionHref,
    searchKeywords: multilingual(
      [
        record.model,
        record.productCode,
        record.structure,
        parsed.thread,
        parsed.tubeId,
        parsed.material,
        parsed.color,
      ]
        .filter(Boolean)
        .join(" "),
      [
        record.model,
        record.productCode,
        record.structure === "六角螺母"
          ? "hex nut"
          : "bulkhead barbed fitting",
        parsed.thread,
        parsed.tubeId,
        parsed.material,
        parsed.color,
      ]
        .filter(Boolean)
        .join(" ")
    ),
    sortOrder: record.sortOrder,
  };
}

function createFaqs(record) {
  const { parsed } = record;

  if (record.structure === "六角螺母") {
    return [
      {
        question: `${record.model}的螺纹规格是什么？`,
        answer: `该型号采用${parsed.thread}螺纹。`,
      },
      {
        question: `${record.model}的材质是什么？`,
        answer: `该型号的螺母材质为${parsed.material}。`,
      },
      {
        question: `${record.model}的颜色是什么？`,
        answer: `该型号的颜色为${parsed.color}。`,
      },
      {
        question: "六角螺母用于什么位置？",
        answer:
          "六角螺母用于穿板接头安装固定，装配前需要确认螺纹规格和面板安装空间。",
      },
      {
        question: `${record.model}是否有二维图纸？`,
        answer:
          "当前官网未直接挂载该型号二维图纸，可以提交型号和商品编码申请确认。",
      },
    ];
  }

  return [
    {
      question: `${record.model}的螺纹规格是什么？`,
      answer:
        `该型号采用${parsed.thread}螺纹。安装前应结合面板厚度和安装空间核对装配尺寸。`,
    },
    {
      question: `${record.model}适配多大接管内径？`,
      answer:
        `该型号适配${parsed.tubeId}接管内径，装配时应同时确认软管材质和尺寸公差。`,
    },
    {
      question: `${record.model}的壳体材质是什么？`,
      answer:
        `该型号的壳体材质为${parsed.material}，介质兼容性应结合温度和工况确认。`,
    },
    {
      question: "穿板倒刺接头适合什么安装方式？",
      answer:
        "适用于仪器面板、设备壳体或隔板穿板安装，用于连接面板两侧的软管液路。",
    },
    {
      question: `${record.model}是否有二维图纸？`,
      answer: record.drawingResource.url
        ? "该型号详情页已提供二维图纸预览。"
        : "当前官网未直接挂载该型号二维图纸，可以提交型号和商品编码申请确认。",
    },
  ];
}

function createDetail(record) {
  const { parsed } = record;
  const detailHref = `${selectionHref}/${record.slug}`;

  const description =
    record.structure === "六角螺母"
      ? `${record.model}是一款${parsed.thread}六角螺母，` +
        `材质为${parsed.material}，颜色为${parsed.color}，` +
        "用于穿板接头安装固定。"
      : `${record.model}是一款穿板倒刺接头，` +
        `采用${parsed.thread}螺纹，` +
        `适配${parsed.tubeId}接管内径，` +
        `壳体材质为${parsed.material}。` +
        "适用于仪器面板、设备壳体或隔板两侧的软管连接。";

  const specs = [
    {
      label: "型号",
      value: record.model,
    },
    {
      label: "商品编码",
      value: record.productCode,
    },
    {
      label: "产品结构",
      value: record.structure,
    },
    {
      label: "螺纹规格",
      value: parsed.thread,
    },
  ];

  if (parsed.tubeId) {
    specs.push({
      label: "接管内径",
      value: parsed.tubeId,
    });
  }

  specs.push(
    {
      label:
        record.structure === "六角螺母"
          ? "螺母材质"
          : "壳体材质",
      value: parsed.material,
    },
    {
      label: "颜色",
      value: parsed.color,
    }
  );

  const faqs = createFaqs(record);

  return {
    sourceType: "fitting-detail",
    category: "fittings",
    categoryId: "fittings",
    categoryLabel: "接头系列",
    productTypeId,
    productTypeName: "穿板倒刺接头",
    productTypeLabel: "穿板倒刺接头",
    productId: record.productCode,
    productCode: record.productCode,
    productIds: [record.productCode],
    productCodes: [record.productCode],
    internalCodes: record.internalCode
      ? [record.internalCode]
      : [],
    seriesId:
      record.structure === "六角螺母"
        ? "pmbsn"
        : "pmb",
    seriesName:
      record.structure === "六角螺母"
        ? "PMBSN六角螺母"
        : "PMB穿板倒刺接头",
    slug: record.slug,
    model: record.model,
    hasStandardModel: true,
    name: record.structure,
    title: record.structure,
    displayName: record.structure,
    productName: record.structure,
    modelDisplay: record.model,
    displayModel: record.model,
    foreachModel: record.model,
    description,
    shortDescription: description,
    heroDescription: description,
    advantages:
      record.structure === "六角螺母"
        ? [
            `${parsed.thread}螺纹`,
            `${parsed.material}螺母材质`,
            `${parsed.color}外观`,
            "用于穿板接头安装固定",
          ]
        : [
            `${parsed.thread}穿板螺纹`,
            `适配${parsed.tubeId}接管内径`,
            `${parsed.material}壳体材质`,
            "用于面板或隔板穿板连接",
          ],
    commonApplications:
      record.structure === "六角螺母"
        ? [
            "穿板接头安装固定",
            "仪器面板装配",
            "设备壳体液路组件固定",
          ]
        : [
            "IVD仪器内部软管连接",
            "分析仪器面板穿板连接",
            "设备壳体内外液路连接",
            "实验室自动化设备管路集成",
          ],
    mainImage: record.imageResource.url,
    image: record.imageResource.url,
    imagePath: record.imageResource.url,
    imageUrl: record.imageResource.url,
    heroImage: record.imageResource.url,
    imageCard: record.imageResource.url,
    additionalImages: [],
    images: [],
    thumbnails: [],
    imageAlt: `${record.model} ${record.structure}`,
    mainImageAlt: `${record.model} ${record.structure}`,
    detailMode: "standard_model",
    hideModelAction: false,
    showConfigurator: false,
    showDatasheetRequest: false,
    showDrawingRequest: true,
    show3DRequest: false,
    drawing2dUrl: record.drawingResource.url,
    drawingPdfUrl: record.drawingResource.url,
    resources: record.drawingResource.url
      ? {
          drawing2d: record.drawingResource.url,
        }
      : {},
    specs,
    specifications: specs,
    specGroups: [
      {
        title: "技术参数",
        items: specs,
      },
    ],
    faqs,
    faq: faqs,
    detailHref,
    href: detailHref,
    selectionHref,
    contactHref: "/contact",
    bottomCta: {
      title:
        record.structure === "六角螺母"
          ? "需要确认六角螺母规格？"
          : "需要确认穿板倒刺接头规格？",
      description:
        record.structure === "六角螺母"
          ? "提交螺纹规格、材质和配套接头型号，由工程师协助确认适用配置。"
          : "提交螺纹规格、接管内径、软管材质、介质和安装空间，由工程师协助确认适用型号。",
      buttonText: "联系工程师",
      href: "/contact",
    },
    seo: {
      title: `${record.model} ${record.structure} | FOREACH`,
      description,
    },
    sectionTitleMap: {
      specification: "规格参数",
      applications: "常见应用",
      faq: "常见问题",
    },
    sourceRows: [],
    sourceIndex: record.sortOrder,
    sourceLabel: record.source,
  };
}

function createSelectionSource(products) {
  const taxonomyItems = [
    {
      id: "fittings:bulkhead-barbed-fittings",
      categoryId: "fittings",
      categoryLabel: multilingual("接头系列", "Fittings"),
      productTypeId,
      productTypeLabel: multilingual(
        "穿板倒刺接头",
        "Bulkhead Barbed Fittings"
      ),
      label: multilingual(
        "穿板倒刺接头",
        "Bulkhead Barbed Fittings"
      ),
      sortOrder: 65,
      visible: true,
    },
  ];

  const filterLabels = [
    {
      categoryId: "fittings",
      productTypeId,
      filterKey: "filter01",
      label: multilingual("产品结构", "Product Structure"),
      inputType: "multiple",
      sortOrder: 10,
      visible: true,
    },
    {
      categoryId: "fittings",
      productTypeId,
      filterKey: "filter02",
      label: multilingual("螺纹规格", "Thread Size"),
      inputType: "multiple",
      sortOrder: 20,
      visible: true,
    },
    {
      categoryId: "fittings",
      productTypeId,
      filterKey: "filter03",
      label: multilingual("接管内径", "Tube ID"),
      inputType: "multiple",
      sortOrder: 30,
      visible: true,
    },
    {
      categoryId: "fittings",
      productTypeId,
      filterKey: "filter04",
      label: multilingual("材质", "Material"),
      inputType: "multiple",
      sortOrder: 40,
      visible: true,
    },
    {
      categoryId: "fittings",
      productTypeId,
      filterKey: "filter05",
      label: multilingual("颜色", "Color"),
      inputType: "multiple",
      sortOrder: 50,
      visible: true,
    },
  ];

  return `/* =========================================================
   穿板倒刺接头与六角螺母选型数据
   PMB：权威Excel 08_穿板倒刺接头
   PMBSN：用户提供的正式资料页
========================================================= */

export const bulkheadBarbedFittingSelectionProducts =
${JSON.stringify(products, null, 2)} as any[];

export const bulkheadBarbedFittingTaxonomyItems =
${JSON.stringify(taxonomyItems, null, 2)} as any[];

export const bulkheadBarbedFittingFilterLabels =
${JSON.stringify(filterLabels, null, 2)} as any[];
`;
}

function updateRouteMap(source) {
  const start = source.indexOf(
    '    "bulkhead-barbed-fittings": {'
  );

  if (start < 0) {
    throw new Error(
      "product-route-map.ts中没有找到bulkhead-barbed-fittings。"
    );
  }

  const nextEntry = source.indexOf(
    '    "luer-fittings": {',
    start
  );

  if (nextEntry < 0) {
    throw new Error(
      "无法定位穿板倒刺接头路由配置结束位置。"
    );
  }

  const replacement = `    "bulkhead-barbed-fittings": {
      category: "fittings",
      categoryId: "fittings",
      productTypeId: "bulkhead-barbed-fittings",
      label: "穿板倒刺接头",
      title: "穿板倒刺接头 | FOREACH",
      description:
        "穿板倒刺接头系列包含PMB穿板倒刺接头和PMBSN六角螺母，可根据产品结构、螺纹规格、接管内径、材质和颜色进行选型。",
    },

`;

  return (
    source.slice(0, start) +
    replacement +
    source.slice(nextEntry)
  );
}

function assertTsSyntax(fileName, source) {
  const result = ts.transpileModule(source, {
    compilerOptions: {
      target: ts.ScriptTarget.ES2022,
      module: ts.ModuleKind.ESNext,
      jsx: ts.JsxEmit.Preserve,
    },
    reportDiagnostics: true,
    fileName,
  });

  const errors = (result.diagnostics || []).filter(
    (diagnostic) =>
      diagnostic.category === ts.DiagnosticCategory.Error
  );

  if (errors.length) {
    throw new Error(
      `${fileName}语法检查失败：\n` +
        errors
          .map((diagnostic) =>
            ts.flattenDiagnosticMessageText(
              diagnostic.messageText,
              "\n"
            )
          )
          .join("\n")
    );
  }
}

if (!fs.existsSync(selectionPath)) {
  throw new Error(`未找到现有选型数据：${selectionPath}`);
}

if (!fs.existsSync(detailPath)) {
  throw new Error(`未找到现有详情数据：${detailPath}`);
}

if (!fs.existsSync(routeMapPath)) {
  throw new Error(`未找到产品路由映射：${routeMapPath}`);
}

const records = buildRecords();

if (records.length !== 11) {
  throw new Error(`型号数量异常：${records.length}/11`);
}

if (
  new Set(records.map((record) => record.model)).size !== 11 ||
  new Set(records.map((record) => record.productCode)).size !== 11
) {
  throw new Error("型号或商品编码存在重复。");
}

const selectionProducts = records.map(createSelectionProduct);
const details = records.map(createDetail);
const selectionSource = createSelectionSource(selectionProducts);

const originalRouteMap = fs.readFileSync(routeMapPath, "utf8");
const routeMapSource = updateRouteMap(originalRouteMap);

assertTsSyntax(
  "bulkhead-barbed-fitting-selection.generated.ts",
  selectionSource
);
assertTsSyntax(
  "product-route-map.ts",
  routeMapSource
);

const stamp = new Date()
  .toISOString()
  .replace(/[-:TZ.]/g, "")
  .slice(0, 14);

for (const filePath of [selectionPath, detailPath, routeMapPath]) {
  fs.copyFileSync(
    filePath,
    `${filePath}.bak_import_assets_nut_${stamp}`
  );
}

fs.mkdirSync(imagePublicDirectory, {
  recursive: true,
});
fs.mkdirSync(drawingPublicDirectory, {
  recursive: true,
});
fs.mkdirSync(path.dirname(reportPath), {
  recursive: true,
});

let copiedImages = 0;
let copiedDrawings = 0;

for (const record of records) {
  if (
    record.imageResource.sourcePath &&
    record.imageResource.publicPath
  ) {
    fs.copyFileSync(
      record.imageResource.sourcePath,
      record.imageResource.publicPath
    );
    copiedImages += 1;
  }

  if (
    record.drawingResource.sourcePath &&
    record.drawingResource.publicPath
  ) {
    fs.copyFileSync(
      record.drawingResource.sourcePath,
      record.drawingResource.publicPath
    );
    copiedDrawings += 1;
  }
}

fs.writeFileSync(selectionPath, selectionSource, "utf8");
fs.writeFileSync(
  detailPath,
  JSON.stringify(details, null, 2) + "\n",
  "utf8"
);
fs.writeFileSync(routeMapPath, routeMapSource, "utf8");

const unresolvedDrawings = [
  "443-02-00041.pdf",
  "443-02-00075.pdf",
];

const report = [
  "# 穿板倒刺接头与六角螺母导入结果",
  "",
  `生成时间：${new Date().toLocaleString("zh-CN")}`,
  "",
  "## 数据",
  "",
  `- 总型号：${records.length}`,
  `- PMB穿板倒刺接头：${
    records.filter((record) => record.structure === "穿板倒刺接头").length
  }`,
  `- PMBSN六角螺母：${
    records.filter((record) => record.structure === "六角螺母").length
  }`,
  `- 复制产品图：${copiedImages}`,
  `- 复制2D PDF：${copiedDrawings}`,
  "",
  "## 筛选字段",
  "",
  "- 产品结构",
  "- 螺纹规格",
  "- 接管内径",
  "- 材质",
  "- 颜色",
  "",
  "## 未自动绑定的PDF",
  "",
  ...unresolvedDrawings.map(
    (filename) =>
      `- ${path.join(drawingSourceDirectory, filename)}`
  ),
  "",
  "这两个PDF没有在现有数据中找到明确料号映射，本次未猜测绑定。",
  "",
  "## 型号资源",
  "",
  ...records.map(
    (record) =>
      `- ${record.model}｜${record.productCode}｜` +
      `图片：${record.imageResource.sourcePath ? "已导入" : "占位图"}｜` +
      `2D：${record.drawingResource.sourcePath ? "已导入" : "未挂载"}`
  ),
  "",
];

fs.writeFileSync(
  reportPath,
  report.join("\n"),
  "utf8"
);

console.log("");
console.log("============================================");
console.log("穿板倒刺接头与六角螺母导入完成");
console.log("============================================");
console.log("总型号：", records.length);
console.log("PMB：", records.filter(
  (record) => record.structure === "穿板倒刺接头"
).length);
console.log("PMBSN：", records.filter(
  (record) => record.structure === "六角螺母"
).length);
console.log("复制产品图：", copiedImages);
console.log("复制2D PDF：", copiedDrawings);
console.log("");
console.log("报告：");
console.log(reportPath);
console.log("");
