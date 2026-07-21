const fs = require("fs");
const path = require("path");
const Module = require("module");
const XLSX = require("xlsx");
const ts = require("typescript");

const root = process.cwd();

const PRODUCT_TYPE_ID =
  "thread-to-barbed-fittings";

const SOURCE_SHEET =
  "05_螺纹转倒刺接头";

const selectionPath = path.join(
  root,
  "data",
  "products",
  "selection",
  "thread-to-barbed-fitting-selection.generated.ts"
);

const detailOutputPath = path.join(
  root,
  "data",
  "products",
  "generated",
  "fittings",
  PRODUCT_TYPE_ID,
  "detail",
  "index.json"
);

const reportPath = path.join(
  root,
  "reports",
  "thread-to-barbed-detail-generation-report.json"
);

const jpgSourceDir =
  String.raw`H:\01-官网项目\02_产品中心\fit\Thread with barb\螺纹转倒刺2D图_JPG`;

const pdfSourceDir =
  String.raw`H:\01-官网项目\02_产品中心\fit\Thread with barb\螺纹转倒刺2D图纸_PDF`;

const jpgTargetDir = path.join(
  root,
  "public",
  "images",
  "products",
  "fittings",
  PRODUCT_TYPE_ID,
  "details"
);

const pdfTargetDir = path.join(
  root,
  "public",
  "documents",
  "products",
  "fittings",
  PRODUCT_TYPE_ID,
  "drawings"
);

const excludedImageModels = new Set([
  "SA-U32-24F-PP-N",
  "SA-U32-24F-PA-W",
  "SA-U32-16F-PA-W",
]);

function text(value) {
  return value == null
    ? ""
    : String(value).trim();
}

function ensureDir(targetPath) {
  fs.mkdirSync(
    targetPath,
    {
      recursive: true,
    }
  );
}

function localizedText(
  value,
  fallback = ""
) {
  if (
    value &&
    typeof value === "object"
  ) {
    return text(
      value.zh ||
      value["zh-CN"] ||
      value.en ||
      fallback
    );
  }

  return text(value || fallback);
}

function stripModelNote(value) {
  return text(value)
    .replace(
      /[（(][^）)]*[）)]/g,
      ""
    )
    .trim();
}

function getModelNote(value) {
  const match = text(value).match(
    /[（(]([^）)]*)[）)]/
  );

  return match
    ? text(match[1])
    : "";
}

function normalizeModelAssetKey(value) {
  return stripModelNote(value)
    .toUpperCase()
    .replace(
      /1\/8NPT/g,
      "18NPT"
    )
    .replace(
      /1\/4NPT/g,
      "14NPT"
    )
    .replace(
      /3\/8NPT/g,
      "38NPT"
    )
    .replace(
      /\.[A-Z0-9]+$/i,
      ""
    )
    .replace(
      /[^A-Z0-9]+/g,
      ""
    );
}

function slugify(value) {
  return text(value)
    .toLowerCase()
    .replace(/μ/g, "u")
    .replace(
      /[^a-z0-9]+/g,
      "-"
    )
    .replace(
      /^-+|-+$/g,
      ""
    );
}

function noteToSlug(note) {
  const normalized = text(note)
    .toLowerCase()
    .replace(/o型圈/g, "o-ring")
    .replace(/o圈/g, "o-ring")
    .replace(/带/g, "")
    .replace(/氟橡胶/g, "fkm")
    .replace(
      /[^a-z0-9]+/g,
      "-"
    )
    .replace(
      /^-+|-+$/g,
      ""
    );

  return normalized;
}

function createBaseSlug(model) {
  const baseSlug =
    slugify(
      stripModelNote(model)
    );

  const noteSlug =
    noteToSlug(
      getModelNote(model)
    );

  return noteSlug
    ? `${baseSlug}-${noteSlug}`
    : baseSlug;
}

function normalizeDrawingExact(value) {
  return text(value)
    .toUpperCase()
    .replace(/\.PDF$/i, "")
    .replace(/\s+/g, "")
    .replace(/_/g, "-");
}

function normalizeDrawingBase(value) {
  return normalizeDrawingExact(value)
    .replace(
      /-[A-Z]$/i,
      ""
    );
}

function extractDrawingCodes(value) {
  const raw = text(value);

  if (!raw) {
    return [];
  }

  const matches = raw.match(
    /\d{3}-\d{2}-\d{5}(?:-[A-Z])?/gi
  );

  if (matches?.length) {
    return matches;
  }

  return raw
    .split(/[\n\r,，;；|]+/)
    .map(text)
    .filter(Boolean);
}

function loadTsModule(filePath) {
  const source = fs.readFileSync(
    filePath,
    "utf8"
  );

  const compiled =
    ts.transpileModule(
      source,
      {
        compilerOptions: {
          module:
            ts.ModuleKind.CommonJS,
          target:
            ts.ScriptTarget.ES2020,
          esModuleInterop: true,
        },
        fileName: filePath,
      }
    ).outputText;

  const loaded = new Module(
    filePath,
    module
  );

  loaded.filename = filePath;

  loaded.paths =
    Module._nodeModulePaths(
      path.dirname(filePath)
    );

  loaded._compile(
    compiled,
    filePath
  );

  return loaded.exports;
}

function findWorkbook() {
  const sourceDir = path.join(
    root,
    "data-source",
    "product-center",
    "fittings"
  );

  if (!fs.existsSync(sourceDir)) {
    throw new Error(
      "未找到连接件数据源目录。"
    );
  }

  const files = fs
    .readdirSync(sourceDir)
    .filter(
      (name) =>
        name.endsWith(".xlsx") &&
        name.includes(
          "连接件标品在售清单"
        ) &&
        !name.startsWith("~$")
    )
    .map((name) =>
      path.join(sourceDir, name)
    )
    .sort(
      (a, b) =>
        fs.statSync(b).mtimeMs -
        fs.statSync(a).mtimeMs
    );

  if (!files.length) {
    throw new Error(
      "未找到连接件标品在售清单 Excel。"
    );
  }

  return files[0];
}

function listFiles(
  directory,
  extensions
) {
  if (!fs.existsSync(directory)) {
    return [];
  }

  return fs
    .readdirSync(directory)
    .filter((fileName) =>
      extensions.some((extension) =>
        fileName
          .toLowerCase()
          .endsWith(extension)
      )
    );
}

function getProductName(seriesCode) {
  const names = {
    SA:
      "直通螺纹密封螺纹转倒刺接头",

    SAL:
      "L型螺纹密封螺纹转倒刺接头",

    SB:
      "直通底面密封螺纹转倒刺接头",

    SBS:
      "直通底面密封螺纹转倒刺接头",

    SBR:
      "可旋转底面密封螺纹转倒刺接头",

    SC:
      "直通内螺纹转倒刺接头",
  };

  return (
    names[seriesCode] ||
    "螺纹转倒刺接头"
  );
}

function getApplications() {
  return [
    "仪器内部液路转接",
    "泵阀螺纹接口与软管连接",
    "IVD与分析仪器流路",
    "实验室自动化设备液路",
  ];
}

function createFaqs({
  model,
  thread,
  tubeId,
  material,
  sealing,
  drawingUrl,
}) {
  return [
    {
      question:
        `${model}适配什么螺纹和软管？`,

      answer:
        `该型号适配${thread}螺纹，并连接${tubeId}内径软管。`,
    },
    {
      question:
        "倒刺尺寸对应软管内径还是外径？",

      answer:
        `该页面中的${tubeId}表示适配软管内径。实际装配时还需要结合软管材质、壁厚和硬度确认。`,
    },
    {
      question:
        "螺纹密封与底面密封有什么区别？",

      answer:
        "螺纹密封主要依靠螺纹连接区域形成密封；底面密封通过端面密封结构实现密封。选型时应与设备接口结构保持一致。",
    },
    {
      question:
        `${material}材质是否适合当前介质？`,

      answer:
        `需要结合实际介质、温度、压力和清洁要求确认${material}的化学兼容性。`,
    },
    {
      question:
        "是否可以查看二维尺寸图？",

      answer: drawingUrl
        ? "该型号已配置二维尺寸图，可在详情页的二维图纸区域查看。"
        : "当前未匹配到公开二维图纸，可通过需求提交表单联系工程师确认。",
    },
  ];
}

if (!fs.existsSync(selectionPath)) {
  throw new Error(
    `未找到筛选数据：${selectionPath}`
  );
}

const workbookPath =
  findWorkbook();

const workbook =
  XLSX.readFile(
    workbookPath,
    {
      raw: false,
      cellDates: false,
    }
  );

const sheet =
  workbook.Sheets[SOURCE_SHEET];

if (!sheet) {
  throw new Error(
    `Excel 中未找到工作表：${SOURCE_SHEET}`
  );
}

const rows =
  XLSX.utils.sheet_to_json(
    sheet,
    {
      header: 1,
      defval: "",
      raw: false,
    }
  );

const excelRecords = rows
  .slice(2)
  .map((row, index) => ({
    excelRow: index + 3,
    seriesCode:
      text(row[1]).toUpperCase(),
    model:
      text(row[2]),
    productCode:
      text(row[3]),
    drawing2d:
      text(row[9]),
    drawing3d:
      text(row[10]),
  }))
  .filter(
    (item) =>
      item.model &&
      item.productCode
  );

const excelByProductCode =
  new Map(
    excelRecords.map((item) => [
      item.productCode,
      item,
    ])
  );

const selectionModule =
  loadTsModule(selectionPath);

const products =
  selectionModule
    .threadToBarbedFittingSelectionProducts ||
  [];

const jpgFiles =
  listFiles(
    jpgSourceDir,
    [
      ".jpg",
      ".jpeg",
      ".png",
      ".webp",
    ]
  );

const jpgMap = new Map();

for (const fileName of jpgFiles) {
  const key =
    normalizeModelAssetKey(fileName);

  if (!jpgMap.has(key)) {
    jpgMap.set(
      key,
      fileName
    );
  }
}

const pdfFiles =
  listFiles(
    pdfSourceDir,
    [".pdf"]
  );

const pdfExactMap =
  new Map();

const pdfBaseMap =
  new Map();

for (const fileName of pdfFiles) {
  pdfExactMap.set(
    normalizeDrawingExact(fileName),
    fileName
  );

  const baseKey =
    normalizeDrawingBase(fileName);

  if (!pdfBaseMap.has(baseKey)) {
    pdfBaseMap.set(
      baseKey,
      fileName
    );
  }
}

const provisional = products.map(
  (product) => {
    const model =
      text(
        product.model ||
        product.foreachModel ||
        localizedText(
          product.cardTitle
        )
      );

    return {
      product,
      model,
      baseSlug:
        createBaseSlug(model),
    };
  }
);

const slugCounts = new Map();

for (const item of provisional) {
  slugCounts.set(
    item.baseSlug,
    (
      slugCounts.get(
        item.baseSlug
      ) || 0
    ) + 1
  );
}

ensureDir(
  path.dirname(detailOutputPath)
);

ensureDir(
  path.dirname(reportPath)
);

ensureDir(jpgTargetDir);
ensureDir(pdfTargetDir);

const copiedJpg = [];
const copiedPdf = [];
const missingJpg = [];
const missingPdf = [];

const details = provisional.map(
  ({
    product,
    model,
    baseSlug,
  }) => {
    const productCode =
      text(
        product.productCode ||
        product.productId
      );

    const excel =
      excelByProductCode.get(
        productCode
      ) || {};

    const seriesCode =
      text(
        product.seriesCode ||
        excel.seriesCode ||
        model.split("-")[0]
      ).toUpperCase();

    const filters =
      product.filters || {};

    const structure =
      text(
        filters.filter01 ||
        product.connectionStructure
      );

    const sealing =
      text(
        filters.filter02 ||
        product.sealingMethod
      );

    const thread =
      text(
        filters.filter03 ||
        product.threadSpecification
      );

    const tubeId =
      text(
        filters.filter04 ||
        product.tubingInnerDiameter
      );

    const material =
      text(
        filters.filter05 ||
        product.materialCode
      );

    const color =
      text(
        filters.filter06 ||
        product.colorCode
      );

    const modelNote =
      getModelNote(model);

    const slug =
      slugCounts.get(baseSlug) > 1
        ? `${baseSlug}-${slugify(productCode)}`
        : baseSlug;

    const productName =
      getProductName(seriesCode);

    let mainImage = "";

    const modelAssetKey =
      normalizeModelAssetKey(model);

    const excluded =
      excludedImageModels.has(
        stripModelNote(model).toUpperCase()
      );

    if (
      !excluded &&
      jpgMap.has(modelAssetKey)
    ) {
      const sourceFileName =
        jpgMap.get(modelAssetKey);

      const extension =
        path.extname(
          sourceFileName
        ).toLowerCase();

      const targetFileName =
        `${slug}${extension}`;

      fs.copyFileSync(
        path.join(
          jpgSourceDir,
          sourceFileName
        ),
        path.join(
          jpgTargetDir,
          targetFileName
        )
      );

      mainImage =
        `/images/products/fittings/${PRODUCT_TYPE_ID}/details/${targetFileName}`;

      copiedJpg.push({
        model,
        sourceFileName,
        targetFileName,
      });
    } else {
      missingJpg.push({
        model,
        productCode,
        excluded,
      });
    }

    let drawingPdfUrl = "";
    let drawingSourceFile = "";

    const drawingCodes =
      extractDrawingCodes(
        excel.drawing2d
      );

    for (
      const drawingCode
      of drawingCodes
    ) {
      const exactKey =
        normalizeDrawingExact(
          drawingCode
        );

      const baseKey =
        normalizeDrawingBase(
          drawingCode
        );

      const matchedPdf =
        pdfExactMap.get(exactKey) ||
        pdfBaseMap.get(baseKey);

      if (matchedPdf) {
        drawingSourceFile =
          matchedPdf;
        break;
      }
    }

    if (drawingSourceFile) {
      const targetPdfName =
        drawingSourceFile
          .toLowerCase();

      fs.copyFileSync(
        path.join(
          pdfSourceDir,
          drawingSourceFile
        ),
        path.join(
          pdfTargetDir,
          targetPdfName
        )
      );

      drawingPdfUrl =
        `/documents/products/fittings/${PRODUCT_TYPE_ID}/drawings/${targetPdfName}`;

      copiedPdf.push({
        model,
        productCode,
        drawingCode:
          excel.drawing2d || "",
        sourceFileName:
          drawingSourceFile,
      });
    } else {
      missingPdf.push({
        model,
        productCode,
        drawingCode:
          excel.drawing2d || "",
      });
    }

    const description =
      `${model}是一款${productName}，适配${thread}螺纹与${tubeId}内径软管，用于设备螺纹接口与软管液路之间的转接。采用${material}材质，密封方式为${sealing}，颜色为${color}。选型时应结合螺纹标准、软管材质与硬度、介质兼容性及装配空间确认匹配性。`;

    const specs = [
      {
        label: "型号",
        value: model,
      },
      {
        label: "商品编码",
        value: productCode,
      },
      {
        label: "产品类别",
        value:
          "螺纹转倒刺接头",
      },
      {
        label: "产品系列",
        value: seriesCode,
      },
      {
        label: "密封方式",
        value: sealing,
      },
      {
        label: "连接结构",
        value: structure,
      },
      {
        label: "螺纹规格",
        value: thread,
      },
      {
        label: "接管内径",
        value: tubeId,
      },
      {
        label: "材质",
        value: material,
      },
      {
        label: "颜色",
        value: color,
      },
    ];

    if (modelNote) {
      specs.push({
        label: "附加配置",
        value: modelNote,
      });
    }

    const commonApplications =
      getApplications();

    const advantages = [
      `${thread}转${tubeId}内径软管`,
      sealing,
      structure,
      `${material}材质`,
    ].filter(Boolean);

    const detailHref =
      `/products/fittings/${PRODUCT_TYPE_ID}/${slug}`;

    const selectionHref =
      `/products/fittings/${PRODUCT_TYPE_ID}`;

    return {
      sourceType:
        "fitting-detail",

      category:
        "fittings",

      categoryId:
        "fittings",

      categoryLabel:
        "接头系列",

      productTypeId:
        PRODUCT_TYPE_ID,

      productTypeName:
        productName,

      productTypeLabel:
        "螺纹转倒刺接头",

      productId:
        productCode,

      productCode,

      seriesId:
        seriesCode.toLowerCase(),

      seriesCode,

      seriesName:
        productName,

      slug,

      model,

      name:
        productName,

      title:
        productName,

      displayName:
        productName,

      productName,

      modelDisplay:
        model,

      displayModel:
        model,

      foreachModel:
        model,

      description,

      shortDescription:
        description,

      heroDescription:
        description,

      advantages,

      commonApplications,

      mainImage,

      image:
        mainImage,

      imagePath:
        mainImage,

      imageUrl:
        mainImage,

      heroImage:
        mainImage,

      imageCard:
        mainImage,

      additionalImages: [],

      images: [],

      thumbnails: [],

      imageAlt:
        `${model} ${productName}`,

      mainImageAlt:
        `${model} ${productName}`,

      detailMode:
        "standard_model",

      hideModelAction:
        false,

      showConfigurator:
        false,

      showDatasheetRequest:
        false,

      showDrawingRequest:
        true,

      show3DRequest:
        false,

      drawing2dUrl:
        drawingPdfUrl,

      drawingPdfUrl,

      resources:
        drawingPdfUrl
          ? {
              drawing2d:
                drawingPdfUrl,
            }
          : {},

      specs,

      specifications:
        specs,

      specGroups: [
        {
          title:
            "技术参数",
          items:
            specs,
        },
      ],

      faqs:
        createFaqs({
          model,
          thread,
          tubeId,
          material,
          sealing,
          drawingUrl:
            drawingPdfUrl,
        }),

      detailHref,

      selectionHref,

      seo: {
        title:
          `${model} ${productName} | FOREACH`,

        description:
          `${model}适配${thread}螺纹与${tubeId}内径软管，采用${material}材质，密封方式为${sealing}。`,
      },
    };
  }
);

const duplicateSlugCheck =
  new Map();

for (const detail of details) {
  if (
    duplicateSlugCheck.has(
      detail.slug
    )
  ) {
    throw new Error(
      `详情 slug 仍然重复：${detail.slug}`
    );
  }

  duplicateSlugCheck.set(
    detail.slug,
    detail.productCode
  );
}

fs.writeFileSync(
  detailOutputPath,
  JSON.stringify(
    details,
    null,
    2
  ) + "\n",
  "utf8"
);

const report = {
  generatedAt:
    new Date().toISOString(),

  sourceWorkbook:
    workbookPath,

  sourceSheet:
    SOURCE_SHEET,

  selectionCount:
    products.length,

  excelRecordCount:
    excelRecords.length,

  generatedDetailCount:
    details.length,

  copiedJpgCount:
    copiedJpg.length,

  missingJpgCount:
    missingJpg.length,

  copiedPdfCount:
    copiedPdf.length,

  missingPdfCount:
    missingPdf.length,

  detailOutputPath,

  jpgTargetDir,

  pdfTargetDir,

  copiedJpg,

  missingJpg,

  copiedPdf,

  missingPdf,

  examples:
    details.slice(0, 5).map(
      (item) => ({
        model:
          item.model,
        slug:
          item.slug,
        mainImage:
          item.mainImage,
        drawingPdfUrl:
          item.drawingPdfUrl,
      })
    ),
};

fs.writeFileSync(
  reportPath,
  JSON.stringify(
    report,
    null,
    2
  ) + "\n",
  "utf8"
);

console.log("");
console.log("============================================");
console.log("螺纹转倒刺详情数据生成完成");
console.log("============================================");
console.log(
  `详情数量：${details.length}`
);
console.log(
  `JPG 已匹配：${copiedJpg.length}`
);
console.log(
  `JPG 未匹配：${missingJpg.length}`
);
console.log(
  `PDF 已匹配：${copiedPdf.length}`
);
console.log(
  `PDF 未匹配：${missingPdf.length}`
);
console.log(
  `详情数据：${detailOutputPath}`
);
console.log(
  `生成报告：${reportPath}`
);
console.log("");
console.log(
  "本步骤未创建页面路由。"
);
console.log(
  "本步骤未修改筛选卡片链接。"
);
