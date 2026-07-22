const fs = require("fs");
const path = require("path");
const XLSX = require("xlsx");
const ts = require("typescript");

const root = process.cwd();

const workbookPath = path.join(
  root,
  "data-source",
  "product-center",
  "fittings",
  "FRGD-140D-2606-0002_001_cn_连接件标品在售清单.xlsx"
);

const sheetName =
  "06_单向阀、过滤器";

const assetRoot =
  String.raw`H:\01-官网项目\02_产品中心\fit`;

const selectionPath = path.join(
  root,
  "data",
  "products",
  "selection",
  "filter-check-valve-selection.generated.ts"
);

const filterDetailPath = path.join(
  root,
  "data",
  "products",
  "generated",
  "fittings",
  "filters",
  "detail",
  "index.json"
);

const checkValveDetailPath = path.join(
  root,
  "data",
  "products",
  "generated",
  "fittings",
  "check-valves",
  "detail",
  "index.json"
);

const imageRoot = path.join(
  root,
  "public",
  "images",
  "products",
  "fittings"
);

const drawingRoot = path.join(
  root,
  "public",
  "resources",
  "drawings",
  "fittings"
);

const reportPath = path.join(
  root,
  "reports",
  "filter-check-valve-generation-report.md"
);

const jsonReportPath = path.join(
  root,
  "reports",
  "filter-check-valve-generation-report.json"
);

const supportedImageExtensions =
  new Set([
    ".jpg",
    ".jpeg",
    ".png",
    ".webp",
  ]);

const supportedAssetExtensions =
  new Set([
    ...supportedImageExtensions,
    ".pdf",
  ]);

function text(value) {
  return String(value ?? "")
    .replace(/\u00a0/g, " ")
    .trim();
}

function normalize(value) {
  return text(value)
    .toUpperCase()
    .replace(/×/g, "X")
    .replace(/[‐-‒–—−]/g, "-")
    .replace(/[^A-Z0-9]/g, "");
}

function slugify(value) {
  return text(value)
    .toLowerCase()
    .replace(/×/g, "x")
    .replace(/[‐-‒–—−]/g, "-")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function unique(values) {
  return [
    ...new Set(
      values
        .map(text)
        .filter(Boolean)
    ),
  ];
}

function escapeMarkdown(value) {
  return text(value)
    .replace(/\|/g, "\\|")
    .replace(/\r?\n/g, "<br>");
}

function walk(directory) {
  if (!fs.existsSync(directory)) {
    return [];
  }

  const result = [];

  let entries;

  try {
    entries = fs.readdirSync(
      directory,
      {
        withFileTypes: true,
      }
    );
  } catch {
    return [];
  }

  for (const entry of entries) {
    const fullPath = path.join(
      directory,
      entry.name
    );

    if (entry.isDirectory()) {
      result.push(
        ...walk(fullPath)
      );

      continue;
    }

    if (
      entry.isFile() &&
      supportedAssetExtensions.has(
        path
          .extname(entry.name)
          .toLowerCase()
      )
    ) {
      result.push(fullPath);
    }
  }

  return result;
}

function extractModel(
  productName,
  category
) {
  const source = text(productName)
    .toUpperCase()
    .replace(/[‐-‒–—−]/g, "-");

  const pattern =
    category === "单向阀"
      ? /\bCV-[A-Z0-9]+(?:-[A-Z0-9]+){2,}\b/
      : /\b(?:G|F)-[A-Z0-9]+(?:-[A-Z0-9]+){2,}\b/;

  return (
    source.match(pattern)?.[0] ||
    ""
  );
}

function sizeCodeToLabel(value) {
  const raw = text(value)
    .toUpperCase();

  if (!raw) {
    return "";
  }

  const isDType =
    raw.endsWith("D");

  const numeric =
    raw.replace(/D$/, "");

  if (!/^\d+$/.test(numeric)) {
    return raw;
  }

  const result =
    `${Number(numeric) / 10} mm`;

  return isDType
    ? `${result}（D型）`
    : result;
}

function materialCodeToLabel(value) {
  const code = text(value)
    .toUpperCase();

  const map = {
    PP: "PP",
    PV: "PVDF",
    PA: "PA",
    POM: "POM",
    AC: "AC",
  };

  return map[code] || code;
}

function colorCodeToLabel(value) {
  const code = text(value)
    .toUpperCase();

  const map = {
    N: "本色",
    W: "白色",
  };

  return map[code] || (
    code
      ? `${code}色代码`
      : ""
  );
}

function parseComponentInfo(productName) {
  const dimension =
    text(productName).match(
      /(\d+(?:\.\d+)?)\s*[x×]\s*(\d+(?:\.\d+)?)/i
    );

  const material =
    text(productName).match(
      /\b(POM|PP|PVDF|PV|PA|AC)\b/i
    );

  return {
    dimension:
      dimension
        ? `${dimension[1]} × ${dimension[2]} mm`
        : "",

    materialCode:
      material?.[1]?.toUpperCase() ||
      "",
  };
}

function parseProductModel(
  category,
  model,
  productName,
  series
) {
  if (!model) {
    const component =
      parseComponentInfo(
        productName
      );

    return {
      seriesCode:
        series || "F",

      structureCode:
        "COMPONENT",

      structureName:
        "水循环过滤器组件",

      specificationCode:
        component.dimension,

      portSize:
        component.dimension,

      materialCode:
        component.materialCode,

      materialLabel:
        materialCodeToLabel(
          component.materialCode
        ),

      colorCode:
        productName.includes("本色")
          ? "N"
          : "",

      colorLabel:
        productName.includes("本色")
          ? "本色"
          : "",
    };
  }

  const parts =
    model.split("-");

  if (category === "单向阀") {
    const structureCode =
      parts[1] || "";

    const structureMap = {
      DE: "鸭嘴式单向阀",
      BV: "膜片式单向阀",
      BE: "膜片式单向阀",
      BF: "膜片式单向阀",
    };

    const materialCode =
      parts[3] || "";

    const colorCode =
      parts[4] || "";

    return {
      seriesCode:
        "CV",

      structureCode,

      structureName:
        structureMap[
          structureCode
        ] ||
        "单向阀",

      specificationCode:
        structureCode,

      portSize:
        sizeCodeToLabel(
          parts[2]
        ),

      materialCode,

      materialLabel:
        materialCodeToLabel(
          materialCode
        ),

      colorCode,

      colorLabel:
        colorCodeToLabel(
          colorCode
        ),
    };
  }

  if (parts[0] === "G") {
    const materialCode =
      parts[3] || "";

    const colorCode =
      parts[4] || "";

    return {
      seriesCode:
        "G",

      structureCode:
        "G",

      structureName:
        "G系列过滤器",

      specificationCode:
        parts[1] || "",

      portSize:
        sizeCodeToLabel(
          parts[2]
        ),

      materialCode,

      materialLabel:
        materialCodeToLabel(
          materialCode
        ),

      colorCode,

      colorLabel:
        colorCodeToLabel(
          colorCode
        ),
    };
  }

  const mediaCode =
    parts[1] || "";

  const materialCode =
    parts[4] || "";

  const colorCode =
    parts[5] || "";

  const isWaterFilter =
    text(productName).includes(
      "水循环过滤器"
    );

  return {
    seriesCode:
      "F",

    structureCode:
      mediaCode,

    structureName:
      isWaterFilter
        ? "水循环过滤器"
        : `${mediaCode}系列过滤器`,

    specificationCode:
      parts[2] || "",

    portSize:
      sizeCodeToLabel(
        parts[3]
      ),

    materialCode,

    materialLabel:
      materialCodeToLabel(
        materialCode
      ),

    colorCode,

    colorLabel:
      colorCodeToLabel(
        colorCode
      ),
  };
}

function multilingual(
  zh,
  en = zh
) {
  return {
    zh,
    en,
    es: en,
    fr: en,
    ko: en,
    ru: en,
  };
}

function isFlagEnabled(value) {
  return [
    "√",
    "YES",
    "TRUE",
    "1",
  ].includes(
    text(value).toUpperCase()
  );
}

function validateTypescript(
  source
) {
  const result =
    ts.transpileModule(
      source,
      {
        fileName:
          selectionPath,

        reportDiagnostics:
          true,

        compilerOptions: {
          target:
            ts.ScriptTarget.ES2022,

          module:
            ts.ModuleKind.ESNext,

          moduleResolution:
            ts.ModuleResolutionKind.Bundler,

          resolveJsonModule:
            true,

          esModuleInterop:
            true,

          allowSyntheticDefaultImports:
            true,
        },
      }
    );

  const errors =
    (result.diagnostics || [])
      .filter(
        (diagnostic) =>
          diagnostic.category ===
          ts.DiagnosticCategory.Error
      );

  if (!errors.length) {
    return;
  }

  throw new Error(
    errors
      .map(
        (diagnostic) =>
          ts.flattenDiagnosticMessageText(
            diagnostic.messageText,
            "\n"
          )
      )
      .join("\n")
  );
}

function backupIfExists(
  filePath,
  stamp
) {
  if (!fs.existsSync(filePath)) {
    return "";
  }

  const backupPath =
    `${filePath}.bak_filter_check_valve_${stamp}`;

  fs.copyFileSync(
    filePath,
    backupPath
  );

  return backupPath;
}

function chooseBestAsset(
  candidates,
  category
) {
  return [
    ...candidates,
  ].sort(
    (current, next) => {
      function score(filePath) {
        const lower =
          filePath.toLowerCase();

        let result = 0;

        if (
          category === "过滤器" &&
          (
            lower.includes("filter") ||
            lower.includes("过滤")
          )
        ) {
          result += 20;
        }

        if (
          category === "单向阀" &&
          (
            lower.includes("check") ||
            lower.includes("单向阀")
          )
        ) {
          result += 20;
        }

        if (
          lower.includes(
            "quick connector"
          ) ||
          lower.includes(
            "luer"
          )
        ) {
          result -= 20;
        }

        result -=
          filePath.length / 10000;

        return result;
      }

      return (
        score(next) -
        score(current)
      );
    }
  )[0] || "";
}

/* =========================================================
   1. 读取权威Excel
   ========================================================= */

if (!fs.existsSync(workbookPath)) {
  throw new Error(
    "未找到权威Excel：" +
      workbookPath
  );
}

const workbook =
  XLSX.readFile(
    workbookPath,
    {
      raw: false,
      cellFormula: false,
      cellDates: false,
    }
  );

const worksheet =
  workbook.Sheets[
    sheetName
  ];

if (!worksheet) {
  throw new Error(
    "未找到Sheet：" +
      sheetName
  );
}

const rows =
  XLSX.utils.sheet_to_json(
    worksheet,
    {
      header: 1,
      defval: "",
      raw: false,
      blankrows: false,
    }
  );

const rawProducts =
  rows
    .slice(2)
    .map(
      (row, index) => {
        const category =
          text(row[0]);

        const productName =
          text(row[3]);

        const productId =
          text(row[4]);

        return {
          excelRow:
            index + 3,

          category,

          series:
            text(row[1]),

          internalCode:
            text(row[2]),

          productName,

          productId,

          competitorModels:
            unique(
              [
                row[5],
                row[6],
                row[7],
                row[8],
                row[9],
              ]
            ),

          drawingFlag:
            isFlagEnabled(
              row[10]
            ),

          model3dFlag:
            isFlagEnabled(
              row[11]
            ),

          model:
            extractModel(
              productName,
              category
            ),
        };
      }
    )
    .filter(
      (item) =>
        (
          item.category ===
            "过滤器" ||
          item.category ===
            "单向阀"
        ) &&
        item.productId
    );

if (rawProducts.length !== 38) {
  throw new Error(
    "权威Excel产品数量异常：" +
      rawProducts.length +
      "/38"
  );
}

/* =========================================================
   2. 计算36个商业SKU、34个型号页面
   ========================================================= */

const businessSkuMap =
  new Map();

for (const item of rawProducts) {
  const stableIdentifier =
    item.model ||
    `PRODUCT-${item.productId}`;

  const key = [
    item.category,
    normalize(
      stableIdentifier
    ),
    normalize(
      item.productId
    ),
  ].join("|");

  if (!businessSkuMap.has(key)) {
    businessSkuMap.set(
      key,
      item
    );
  }
}

const businessSkus = [
  ...businessSkuMap.values(),
];

if (businessSkus.length !== 36) {
  throw new Error(
    "去重后的商业SKU数量异常：" +
      businessSkus.length +
      "/36"
  );
}

const pageGroupMap =
  new Map();

for (const item of rawProducts) {
  const stableIdentifier =
    item.model ||
    `PRODUCT-${item.productId}`;

  const key = [
    item.category,
    normalize(
      stableIdentifier
    ),
  ].join("|");

  if (!pageGroupMap.has(key)) {
    pageGroupMap.set(
      key,
      []
    );
  }

  pageGroupMap
    .get(key)
    .push(item);
}

const pageGroups =
  [...pageGroupMap.values()]
    .sort(
      (current, next) =>
        current[0].excelRow -
        next[0].excelRow
    );

if (pageGroups.length !== 34) {
  throw new Error(
    "型号页面数量异常：" +
      pageGroups.length +
      "/34"
  );
}

/* =========================================================
   3. 精确扫描图片与PDF
   ========================================================= */

const assetFiles =
  walk(assetRoot);

const imageAssets =
  assetFiles
    .filter(
      (filePath) =>
        supportedImageExtensions.has(
          path
            .extname(filePath)
            .toLowerCase()
        )
    )
    .map(
      (filePath) => ({
        filePath,

        stem:
          path.parse(
            filePath
          ).name,

        normalizedStem:
          normalize(
            path.parse(
              filePath
            ).name
          ),
      })
    );

const pdfAssets =
  assetFiles
    .filter(
      (filePath) =>
        path
          .extname(filePath)
          .toLowerCase() ===
        ".pdf"
    )
    .map(
      (filePath) => ({
        filePath,

        stem:
          path.parse(
            filePath
          ).name,

        normalizedStem:
          normalize(
            path.parse(
              filePath
            ).name
          ),
      })
    );

/* =========================================================
   4. 生成页面基础记录
   ========================================================= */

const generatedItems =
  pageGroups.map(
    (
      sourceRows,
      pageIndex
    ) => {
      const primary =
        sourceRows[0];

      const productTypeId =
        primary.category ===
          "过滤器"
          ? "filters"
          : "check-valves";

      const standardModel =
        primary.model;

      const productIds =
        unique(
          sourceRows.map(
            (item) =>
              item.productId
          )
        );

      const internalCodes =
        unique(
          sourceRows.map(
            (item) =>
              item.internalCode
          )
        );

      const competitorModels =
        unique(
          sourceRows.flatMap(
            (item) =>
              item.competitorModels
          )
        );

      const displayIdentifier =
        standardModel ||
        productIds[0];

      const slug =
        standardModel
          ? slugify(
              standardModel
            )
          : `filter-component-${slugify(
              productIds[0]
            )}`;

      const parsed =
        parseProductModel(
          primary.category,
          standardModel,
          primary.productName,
          primary.series
        );

      const exactImageCandidates =
        imageAssets
          .filter(
            (asset) =>
              asset.normalizedStem ===
                normalize(
                  standardModel
                ) ||
              (
                !standardModel &&
                asset.normalizedStem ===
                  normalize(
                    productIds[0]
                  )
              )
          )
          .map(
            (asset) =>
              asset.filePath
          );

      const selectedImage =
        chooseBestAsset(
          exactImageCandidates,
          primary.category
        );

      const exactPdfCandidates =
        pdfAssets.filter(
          (asset) =>
            internalCodes.some(
              (internalCode) => {
                const code =
                  normalize(
                    internalCode
                  );

                if (!code) {
                  return false;
                }

                const suffix =
                  asset.normalizedStem
                    .slice(
                      code.length
                    );

                return (
                  asset.normalizedStem
                    .startsWith(
                      code
                    ) &&
                  (
                    suffix === "" ||
                    /^[A-Z]{1,3}$/.test(
                      suffix
                    )
                  )
                );
              }
            )
        );

      const productName =
        parsed.structureName;

      const cardTitle =
        standardModel ||
        `${productIds[0]} 水循环过滤器组件`;

      const productCodeText =
        productIds.join(" / ");

      const internalCodeText =
        internalCodes.join(" / ");

      const typeLabel =
        primary.category;

      const selectionHref =
        "/products/fittings/filters";

      const detailHref =
        `/products/fittings/${productTypeId}/${slug}`;

      return {
        sourceRows,
        pageIndex,
        primary,
        productTypeId,
        typeLabel,
        standardModel,
        displayIdentifier,
        slug,
        parsed,
        productName,
        cardTitle,
        productIds,
        productCodeText,
        internalCodes,
        internalCodeText,
        competitorModels,
        drawingFlag:
          sourceRows.some(
            (item) =>
              item.drawingFlag
          ),
        model3dFlag:
          sourceRows.some(
            (item) =>
              item.model3dFlag
          ),
        selectedImage,
        imageCandidates:
          exactImageCandidates,
        exactPdfCandidates,
        selectionHref,
        detailHref,
      };
    }
  );

const filterItems =
  generatedItems.filter(
    (item) =>
      item.productTypeId ===
      "filters"
  );

const checkValveItems =
  generatedItems.filter(
    (item) =>
      item.productTypeId ===
      "check-valves"
  );

if (
  filterItems.length !== 18 ||
  checkValveItems.length !== 16
) {
  throw new Error(
    "分类详情数量异常：" +
      `过滤器${filterItems.length}/18，` +
      `单向阀${checkValveItems.length}/16`
  );
}

/* =========================================================
   5. 备份并复制精确资源
   ========================================================= */

const stamp =
  new Date()
    .toISOString()
    .replace(/[-:TZ.]/g, "")
    .slice(0, 14);

const backups = {
  selection:
    backupIfExists(
      selectionPath,
      stamp
    ),

  filterDetails:
    backupIfExists(
      filterDetailPath,
      stamp
    ),

  checkValveDetails:
    backupIfExists(
      checkValveDetailPath,
      stamp
    ),
};

let copiedImages = 0;
let copiedPdfs = 0;

for (const item of generatedItems) {
  const targetImageDirectory =
    path.join(
      imageRoot,
      item.productTypeId,
      "products"
    );

  const targetDrawingDirectory =
    path.join(
      drawingRoot,
      item.productTypeId
    );

  fs.mkdirSync(
    targetImageDirectory,
    {
      recursive: true,
    }
  );

  fs.mkdirSync(
    targetDrawingDirectory,
    {
      recursive: true,
    }
  );

  item.mainImage =
    "/images/logo/foreach-logo-color.svg";

  if (item.selectedImage) {
    let extension =
      path
        .extname(
          item.selectedImage
        )
        .toLowerCase();

    if (extension === ".jpeg") {
      extension = ".jpg";
    }

    const targetName =
      `${item.slug}-main${extension}`;

    const targetPath =
      path.join(
        targetImageDirectory,
        targetName
      );

    fs.copyFileSync(
      item.selectedImage,
      targetPath
    );

    item.mainImage =
      `/images/products/fittings/${item.productTypeId}/products/${targetName}`;

    copiedImages += 1;
  }

  item.drawingResources = [];

  for (
    const pdfAsset
    of item.exactPdfCandidates
  ) {
    const matchedInternalCode =
      item.internalCodes.find(
        (internalCode) => {
          const code =
            normalize(
              internalCode
            );

          return (
            pdfAsset.normalizedStem ===
              code ||
            pdfAsset.normalizedStem
              .startsWith(
                code
              )
          );
        }
      ) ||
      item.internalCodes[0];

    const targetName =
      `${item.slug}-${slugify(
        matchedInternalCode
      )}-drawing.pdf`;

    const targetPath =
      path.join(
        targetDrawingDirectory,
        targetName
      );

    fs.copyFileSync(
      pdfAsset.filePath,
      targetPath
    );

    const webPath =
      `/resources/drawings/fittings/${item.productTypeId}/${targetName}`;

    if (
      !item.drawingResources.some(
        (resource) =>
          resource.href ===
          webPath
      )
    ) {
      item.drawingResources.push({
        label:
          `二维图纸 ${matchedInternalCode}`,

        href:
          webPath,
      });

      copiedPdfs += 1;
    }
  }

  item.drawingPdfUrl =
    item.drawingResources[0]?.href ||
    "";
}

/* =========================================================
   6. 生成选型卡片
   ========================================================= */

function createCardSubtitle(
  item
) {
  const secondLine =
    item.parsed.portSize
      ? `接口规格 ${item.parsed.portSize}`
      : (
          item.parsed.specificationCode
            ? `规格 ${item.parsed.specificationCode}`
            : "标准液路组件"
        );

  const thirdLineParts =
    [
      item.parsed.materialLabel
        ? `${item.parsed.materialLabel}材质`
        : "",

      `商品编码 ${item.productCodeText}`,
    ].filter(Boolean);

  return [
    item.productName,
    secondLine,
    thirdLineParts.join("，"),
  ].join("\n");
}

function createEnglishSubtitle(
  item
) {
  const categoryName =
    item.typeLabel === "过滤器"
      ? "Fluid Filter"
      : "Check Valve";

  return [
    `${item.productName} | ${categoryName}`,

    item.parsed.portSize
      ? `Port size: ${item.parsed.portSize}`
      : "Fluid-path component",

    `Product code: ${item.productCodeText}`,
  ].join("\n");
}

const selectionProducts =
  generatedItems.map(
    (
      item,
      index
    ) => ({
      productId:
        item.productIds[0],

      productCode:
        item.productIds[0],

      productCodes:
        item.productIds,

      internalCodes:
        item.internalCodes,

      sourceType:
        "filter-check-valve-selection",

      categoryId:
        "fittings",

      categoryLabel:
        "接头系列",

      productTypeId:
        item.productTypeId,

      productTypeName:
        item.typeLabel,

      seriesId:
        item.parsed.seriesCode
          .toLowerCase(),

      seriesCode:
        item.parsed.seriesCode,

      seriesName:
        item.parsed.structureName,

      model:
        item.displayIdentifier,

      foreachModel:
        item.standardModel || "",

      hasStandardModel:
        Boolean(
          item.standardModel
        ),

      competitorModels:
        item.competitorModels,

      cardTitle:
        multilingual(
          item.cardTitle,
          item.cardTitle
        ),

      cardSubtitle:
        multilingual(
          createCardSubtitle(
            item
          ),
          createEnglishSubtitle(
            item
          )
        ),

      filters: {
        filter01:
          item.typeLabel,

        filter02:
          item.parsed.structureName,

        filter03:
          item.parsed.seriesCode,

        filter04:
          item.parsed.portSize,

        filter05:
          item.parsed.materialLabel,

        filter06:
          item.parsed.colorLabel,
      },

      structureCode:
        item.parsed.structureCode,

      specificationCode:
        item.parsed.specificationCode,

      portSize:
        item.parsed.portSize,

      materialCode:
        item.parsed.materialCode,

      colorCode:
        item.parsed.colorCode,

      imageCard:
        item.mainImage,

      detailSlug:
        item.slug,

      detailHref:
        item.detailHref,

      href:
        item.detailHref,

      selectionHref:
        item.selectionHref,

      needDrawing:
        item.drawingFlag,

      needModel3d:
        item.model3dFlag,

      status:
        "active",

      sourceIndex:
        item.primary.excelRow,

      sortOrder:
        470000 + index,

      searchKeywords:
        multilingual(
          [
            "过滤器与单向阀",
            item.typeLabel,
            item.productName,
            item.standardModel,
            ...item.productIds,
            ...item.internalCodes,
            ...item.competitorModels,
            item.parsed.portSize,
            item.parsed.materialLabel,
          ]
            .filter(Boolean)
            .join(" "),

          [
            "filters check valves",
            item.typeLabel,
            item.productName,
            item.standardModel,
            ...item.productIds,
            ...item.internalCodes,
            ...item.competitorModels,
            item.parsed.portSize,
            item.parsed.materialLabel,
          ]
            .filter(Boolean)
            .join(" ")
        ),
    })
  );

const filterLabelsTemplate = [
  {
    filterKey:
      "filter01",

    zh:
      "产品类型",

    en:
      "Product Type",

    sortOrder:
      10,

    inputType:
      "single",
  },
  {
    filterKey:
      "filter02",

    zh:
      "产品结构",

    en:
      "Structure",

    sortOrder:
      20,

    inputType:
      "multiple",
  },
  {
    filterKey:
      "filter03",

    zh:
      "产品系列",

    en:
      "Series",

    sortOrder:
      30,

    inputType:
      "multiple",
  },
  {
    filterKey:
      "filter04",

    zh:
      "接口规格",

    en:
      "Port Size",

    sortOrder:
      40,

    inputType:
      "multiple",
  },
  {
    filterKey:
      "filter05",

    zh:
      "主体材质",

    en:
      "Body Material",

    sortOrder:
      50,

    inputType:
      "multiple",
  },
  {
    filterKey:
      "filter06",

    zh:
      "颜色",

    en:
      "Color",

    sortOrder:
      60,

    inputType:
      "multiple",
  },
];

const filterLabels =
  [
    "filters",
    "check-valves",
  ].flatMap(
    (productTypeId) =>
      filterLabelsTemplate.map(
        (item) => ({
          categoryId:
            "fittings",

          productTypeId,

          filterKey:
            item.filterKey,

          label:
            multilingual(
              item.zh,
              item.en
            ),

          inputType:
            item.inputType,

          sortOrder:
            item.sortOrder,

          visible:
            true,
        })
      )
  );

const taxonomyItems = [
  {
    type:
      "productType",

    id:
      "filters",

    label:
      multilingual(
        "过滤器与单向阀",
        "Filters & Check Valves"
      ),

    sortOrder:
      470,
  },
  {
    type:
      "productType",

    id:
      "check-valves",

    label:
      multilingual(
        "单向阀",
        "Check Valves"
      ),

    sortOrder:
      471,
  },
];

const selectionSource = `/*
 * AUTO-GENERATED FILE.
 * 数据源：
 * ${workbookPath}
 *
 * Sheet：
 * ${sheetName}
 *
 * 请修改权威Excel后重新运行生成脚本，
 * 不要直接手工修改本文件。
 */

export const filterCheckValveSelectionProducts =
${JSON.stringify(
  selectionProducts,
  null,
  2
)};

export const filterCheckValveFilterLabels =
${JSON.stringify(
  filterLabels,
  null,
  2
)};

export const filterCheckValveTaxonomyItems =
${JSON.stringify(
  taxonomyItems,
  null,
  2
)};
`;

validateTypescript(
  selectionSource
);

/* =========================================================
   7. 生成详情数据
   ========================================================= */

function createDescription(
  item
) {
  if (
    !item.standardModel
  ) {
    return (
      `商品编码${item.productCodeText}为${item.productName}` +
      (
        item.parsed.portSize
          ? `，组件规格为${item.parsed.portSize}`
          : ""
      ) +
      (
        item.parsed.materialLabel
          ? `，采用${item.parsed.materialLabel}材质`
          : ""
      ) +
      "。适用于仪器水循环或液路系统中的过滤组件配置。实际选型时应结合介质、流量、压力、温度、安装空间和过滤要求确认。"
    );
  }

  if (
    item.typeLabel ===
    "过滤器"
  ) {
    return (
      `${item.standardModel}是一款${item.productName}` +
      (
        item.parsed.portSize
          ? `，接口规格为${item.parsed.portSize}`
          : ""
      ) +
      (
        item.parsed.specificationCode
          ? `，过滤规格代码为${item.parsed.specificationCode}`
          : ""
      ) +
      (
        item.parsed.materialLabel
          ? `，主体材质为${item.parsed.materialLabel}`
          : ""
      ) +
      "。适用于仪器液路中的颗粒拦截、流体预过滤和泵阀等关键部件保护。实际选型时应结合介质、过滤要求、流量、压力和温度确认。"
    );
  }

  return (
    `${item.standardModel}是一款${item.productName}` +
    (
      item.parsed.portSize
        ? `，接口规格为${item.parsed.portSize}`
        : ""
    ) +
    (
      item.parsed.materialLabel
        ? `，主体材质为${item.parsed.materialLabel}`
        : ""
    ) +
    "。用于限制流体反向流动、降低回流风险并保持液路方向稳定。实际选型时应结合介质、流量、开启条件、工作压力、温度和安装方向确认。"
  );
}

function createApplications(
  item
) {
  if (
    item.typeLabel ===
    "过滤器"
  ) {
    return [
      "IVD设备试剂液路过滤",
      "分析仪器流体预过滤",
      "泵阀前端颗粒拦截",
      "仪器水循环与冷却液路",
    ];
  }

  return [
    "泵出口防回流",
    "试剂液路单向控制",
    "分析仪器流路方向控制",
    "液路模块压力保持",
  ];
}

function createFaqs(
  item
) {
  const identifier =
    item.standardModel ||
    item.productIds[0];

  if (
    item.typeLabel ===
    "过滤器"
  ) {
    return [
      {
        question:
          `${identifier}属于哪类过滤器？`,

        answer:
          `该产品属于${item.productName}。选型时应进一步确认过滤要求、接口规格和使用工况。`,
      },
      {
        question:
          `${identifier}的接口规格是什么？`,

        answer:
          item.parsed.portSize
            ? `当前记录的接口规格为${item.parsed.portSize}。实际装配前还应核对配套管路尺寸和连接方式。`
            : "该组件未在型号中单独标注标准接口尺寸，需根据商品编码和装配资料确认。",
      },
      {
        question:
          `${identifier}的过滤规格如何确认？`,

        answer:
          item.parsed.specificationCode
            ? `型号中的过滤规格代码为${item.parsed.specificationCode}。具体过滤精度和性能应以正式技术资料或工程确认结果为准。`
            : "当前清单未提供独立过滤精度参数，需根据实际过滤要求由工程师确认。",
      },
      {
        question:
          `${item.parsed.materialLabel || "当前"}材质是否适合目标介质？`,

        answer:
          "需要结合介质成分、温度、压力、清洁要求和使用寿命综合确认，无法确定时请提交工况。",
      },
      {
        question:
          `${identifier}是否可以申请二维图纸？`,

        answer:
          item.drawingPdfUrl
            ? "当前型号已有可关联的二维图纸，页面将显示对应资料；正式使用前仍应核对图纸版本。"
            : "可以将当前产品加入清单并添加图纸需求，由工程师根据商品编码和料号核对资料版本。",
      },
    ];
  }

  return [
    {
      question:
        `${identifier}采用什么单向阀结构？`,

      answer:
        `该产品为${item.productName}。不同结构在开启特性、流量和介质适配方面可能存在差异。`,
    },
    {
      question:
        `${identifier}的接口规格是什么？`,

      answer:
        item.parsed.portSize
          ? `当前记录的接口规格为${item.parsed.portSize}，装配前还需要确认配套管路尺寸。`
          : "当前清单未提供可直接转换的接口规格，需要根据料号和装配资料确认。",
    },
    {
      question:
        "单向阀安装时是否需要注意流向？",

      answer:
        "需要。安装时应按照产品标识或图纸确认入口和出口方向，反向安装可能导致液路无法正常工作。",
    },
    {
      question:
        `${item.parsed.materialLabel || "当前"}材质是否适合目标介质？`,

      answer:
        "需要结合介质成分、温度、压力、清洁要求和寿命要求综合确认。",
    },
    {
      question:
        `${identifier}是否可以申请二维图纸？`,

      answer:
        item.drawingPdfUrl
          ? "当前型号已有可关联的二维图纸，正式使用前应核对商品编码和图纸版本。"
          : "可以将当前产品加入清单并添加图纸需求，由工程师根据商品编码和料号核对资料版本。",
    },
  ];
}

function createSpecs(
  item
) {
  const specs = [
    {
      label:
        "型号",

      value:
        item.standardModel ||
        "未单独命名",
    },
    {
      label:
        "商品编码",

      value:
        item.productCodeText,
    },
    {
      label:
        "料号",

      value:
        item.internalCodeText,
    },
    {
      label:
        "产品类别",

      value:
        item.typeLabel,
    },
    {
      label:
        "产品结构",

      value:
        item.productName,
    },
    {
      label:
        "产品系列",

      value:
        item.parsed.seriesCode,
    },
  ];

  if (item.parsed.portSize) {
    specs.push({
      label:
        "接口规格",

      value:
        item.parsed.portSize,
    });
  }

  if (
    item.typeLabel ===
      "过滤器" &&
    item.parsed.specificationCode
  ) {
    specs.push({
      label:
        "过滤规格代码",

      value:
        item.parsed.specificationCode,
    });
  }

  if (item.parsed.materialLabel) {
    specs.push({
      label:
        "主体材质",

      value:
        item.parsed.materialLabel,
    });
  }

  if (item.parsed.colorLabel) {
    specs.push({
      label:
        "颜色",

      value:
        item.parsed.colorLabel,
    });
  }

  if (
    item.competitorModels.length
  ) {
    specs.push({
      label:
        "关联型号",

      value:
        item.competitorModels.join(
          " / "
        ),
    });
  }

  return specs;
}

function createDetail(
  item
) {
  const description =
    createDescription(
      item
    );

  const specs =
    createSpecs(
      item
    );

  const faqs =
    createFaqs(
      item
    );

  const displayModel =
    item.standardModel ||
    item.productIds[0];

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
      item.productTypeId,

    productTypeName:
      item.productName,

    productTypeLabel:
      item.typeLabel,

    productId:
      item.productIds[0],

    productCode:
      item.productIds[0],

    productIds:
      item.productIds,

    productCodes:
      item.productIds,

    internalCodes:
      item.internalCodes,

    seriesId:
      item.parsed.seriesCode
        .toLowerCase(),

    seriesName:
      item.parsed.structureName,

    slug:
      item.slug,

    model:
      displayModel,

    hasStandardModel:
      Boolean(
        item.standardModel
      ),

    name:
      item.productName,

    title:
      item.productName,

    displayName:
      item.productName,

    productName:
      item.productName,

    modelDisplay:
      displayModel,

    displayModel,
    foreachModel:
      item.standardModel || "",

    description,
    shortDescription:
      description,

    heroDescription:
      description,

    advantages: [
      item.productName,
      item.parsed.portSize
        ? `接口规格 ${item.parsed.portSize}`
        : "液路组件结构",

      item.parsed.materialLabel
        ? `${item.parsed.materialLabel}材质`
        : "多种工况可选",

      item.typeLabel ===
        "过滤器"
        ? "用于颗粒拦截与部件保护"
        : "用于液路防回流",
    ],

    commonApplications:
      createApplications(
        item
      ),

    mainImage:
      item.mainImage,

    image:
      item.mainImage,

    imagePath:
      item.mainImage,

    imageUrl:
      item.mainImage,

    heroImage:
      item.mainImage,

    imageCard:
      item.mainImage,

    additionalImages: [],
    images: [],
    thumbnails: [],

    imageAlt:
      `${displayModel} ${item.productName}`,

    mainImageAlt:
      `${displayModel} ${item.productName}`,

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
      item.drawingPdfUrl,

    drawingPdfUrl:
      item.drawingPdfUrl,

    resources:
      item.drawingResources.length
        ? {
            drawings:
              item.drawingResources,
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

    faqs,
    faq:
      faqs,

    detailHref:
      item.detailHref,

    href:
      item.detailHref,

    selectionHref:
      item.selectionHref,

    contactHref:
      "/contact",

    bottomCta: {
      title:
        item.typeLabel ===
          "过滤器"
          ? "需要确认过滤器规格？"
          : "需要确认单向阀规格？",

      description:
        item.typeLabel ===
          "过滤器"
          ? "提交过滤要求、接口规格、流量、压力、介质和温度，由工程师协助确认适用产品。"
          : "提交接口规格、介质、流量、压力、开启条件和安装方向，由工程师协助确认适用产品。",

      buttonText:
        "联系工程师",

      href:
        "/contact",
    },

    seo: {
      title:
        `${displayModel} ${item.productName} | FOREACH`,

      description,
    },

    sectionTitleMap: {
      specification:
        "规格参数",

      applications:
        "常见应用",

      faq:
        "常见问题",
    },

    sourceRows:
      item.sourceRows.map(
        (source) =>
          source.excelRow
      ),

    sourceIndex:
      item.primary.excelRow,
  };
}

const filterDetails =
  filterItems.map(
    createDetail
  );

const checkValveDetails =
  checkValveItems.map(
    createDetail
  );

const allDetailSlugs =
  [
    ...filterDetails.map(
      (item) =>
        `filters/${item.slug}`
    ),

    ...checkValveDetails.map(
      (item) =>
        `check-valves/${item.slug}`
    ),
  ];

if (
  new Set(
    allDetailSlugs
  ).size !==
  allDetailSlugs.length
) {
  throw new Error(
    "生成的详情slug存在重复。"
  );
}

if (
  new Set(
    selectionProducts.map(
      (item) =>
        item.productId
    )
  ).size !==
  selectionProducts.length
) {
  throw new Error(
    "生成的选型卡片productId存在重复。"
  );
}

/* =========================================================
   8. 写入生成文件
   ========================================================= */

fs.mkdirSync(
  path.dirname(
    selectionPath
  ),
  {
    recursive: true,
  }
);

fs.mkdirSync(
  path.dirname(
    filterDetailPath
  ),
  {
    recursive: true,
  }
);

fs.mkdirSync(
  path.dirname(
    checkValveDetailPath
  ),
  {
    recursive: true,
  }
);

fs.writeFileSync(
  selectionPath,
  selectionSource,
  "utf8"
);

fs.writeFileSync(
  filterDetailPath,
  JSON.stringify(
    filterDetails,
    null,
    2
  ) + "\n",
  "utf8"
);

fs.writeFileSync(
  checkValveDetailPath,
  JSON.stringify(
    checkValveDetails,
    null,
    2
  ) + "\n",
  "utf8"
);

/* =========================================================
   9. 生成检查报告
   ========================================================= */

const report = [];

report.push(
  "# 过滤器与单向阀数据生成报告"
);
report.push("");

report.push(
  `生成时间：${new Date().toLocaleString("zh-CN")}`
);
report.push("");

report.push(
  "## 1. 数量"
);
report.push("");

report.push(
  `- Excel原始记录：${rawProducts.length}`
);
report.push(
  `- 去除完全重复后的商业SKU：${businessSkus.length}`
);
report.push(
  `- 生成选型卡片：${selectionProducts.length}`
);
report.push(
  `- 过滤器详情：${filterDetails.length}`
);
report.push(
  `- 单向阀详情：${checkValveDetails.length}`
);
report.push(
  `- 详情总数：${filterDetails.length + checkValveDetails.length}`
);
report.push("");

report.push(
  "## 2. 精确资源"
);
report.push("");

report.push(
  `- 复制产品图片：${copiedImages}`
);
report.push(
  `- 复制二维PDF：${copiedPdfs}`
);
report.push(
  "- 未绑定“一体式公鲁尔集合-C.pdf”等模糊结果。"
);
report.push("");

report.push(
  "## 3. 生成文件"
);
report.push("");

report.push(
  `- \`${selectionPath}\``
);
report.push(
  `- \`${filterDetailPath}\``
);
report.push(
  `- \`${checkValveDetailPath}\``
);
report.push("");

report.push(
  "## 4. 产品列表"
);
report.push("");

report.push(
  "| 类型 | 页面标识 | 商品编码 | 料号 | 结构 | 接口规格 | 图片 | PDF |"
);
report.push(
  "|---|---|---|---|---|---|---|---:|"
);

for (const item of generatedItems) {
  report.push(
    `| ${item.typeLabel} | ${escapeMarkdown(item.displayIdentifier)} | ${escapeMarkdown(item.productCodeText)} | ${escapeMarkdown(item.internalCodeText)} | ${escapeMarkdown(item.productName)} | ${escapeMarkdown(item.parsed.portSize)} | ${item.selectedImage ? "有" : "无"} | ${item.drawingResources.length} |`
  );
}

report.push("");

report.push(
  "## 5. 下一步"
);
report.push("");

report.push(
  "1. 将生成的选型数据导入 `ProductSelectionClient.tsx`。"
);
report.push(
  "2. 将两个详情JSON导入三级动态路由。"
);
report.push(
  "3. 向 `generateStaticParams()` 增加34个静态详情路径。"
);
report.push(
  "4. 构建并检查筛选、卡片详情链接和详情页面。"
);
report.push("");

fs.mkdirSync(
  path.dirname(
    reportPath
  ),
  {
    recursive: true,
  }
);

fs.writeFileSync(
  reportPath,
  report.join("\n") + "\n",
  "utf8"
);

const jsonReport = {
  generatedAt:
    new Date().toISOString(),

  workbookPath,
  sheetName,

  counts: {
    rawRows:
      rawProducts.length,

    businessSkus:
      businessSkus.length,

    selectionCards:
      selectionProducts.length,

    filterDetails:
      filterDetails.length,

    checkValveDetails:
      checkValveDetails.length,

    copiedImages,
    copiedPdfs,
  },

  backups,

  items:
    generatedItems.map(
      (item) => ({
        type:
          item.typeLabel,

        productTypeId:
          item.productTypeId,

        model:
          item.standardModel,

        displayIdentifier:
          item.displayIdentifier,

        productIds:
          item.productIds,

        internalCodes:
          item.internalCodes,

        slug:
          item.slug,

        detailHref:
          item.detailHref,

        image:
          item.mainImage,

        drawings:
          item.drawingResources,

        sourceRows:
          item.sourceRows.map(
            (source) =>
              source.excelRow
          ),
      })
    ),
};

fs.writeFileSync(
  jsonReportPath,
  JSON.stringify(
    jsonReport,
    null,
    2
  ) + "\n",
  "utf8"
);

console.log("");
console.log(
  "============================================"
);
console.log(
  "过滤器与单向阀数据生成完成"
);
console.log(
  "============================================"
);
console.log(
  "Excel原始记录：",
  rawProducts.length
);
console.log(
  "商业SKU：",
  businessSkus.length
);
console.log(
  "选型卡片：",
  selectionProducts.length
);
console.log(
  "过滤器详情：",
  filterDetails.length
);
console.log(
  "单向阀详情：",
  checkValveDetails.length
);
console.log(
  "复制产品图片：",
  copiedImages
);
console.log(
  "复制二维PDF：",
  copiedPdfs
);
console.log("");
console.log(
  "生成报告："
);
console.log(
  reportPath
);
console.log("");
console.log(
  "本步骤尚未修改页面和路由。"
);
console.log("");
