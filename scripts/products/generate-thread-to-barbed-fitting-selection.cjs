/**
 * 生成螺纹转倒刺接头筛选数据
 *
 * 仅生成：
 * 1. data/products/selection/thread-to-barbed-fitting-selection.generated.ts
 * 2. data/products/selection/thread-to-barbed-fitting-selection.summary.json
 *
 * 不修改：
 * - ProductSelectionClient.tsx
 * - product-route-map.ts
 * - 详情页
 *
 * 使用：
 * node scripts/products/generate-thread-to-barbed-fitting-selection.cjs
 */

const fs = require("fs");
const path = require("path");
const Module = require("module");
const XLSX = require("xlsx");
const ts = require("typescript");

const root = process.cwd();

const PRODUCT_TYPE_ID = "thread-to-barbed-fittings";
const PRODUCT_TYPE_NAME_ZH = "螺纹转倒刺接头";
const PRODUCT_TYPE_NAME_EN = "Thread to Barb Fittings";
const SOURCE_SHEET = "05_螺纹转倒刺接头";
const SELECTION_HREF = "/products/fittings/thread-to-barbed-fittings";

const outputPath = path.join(
  root,
  "data",
  "products",
  "selection",
  "thread-to-barbed-fitting-selection.generated.ts"
);

const summaryPath = path.join(
  root,
  "data",
  "products",
  "selection",
  "thread-to-barbed-fitting-selection.summary.json"
);

const barbedDataPath = path.join(
  root,
  "data",
  "products",
  "selection",
  "barbed-fitting-selection.generated.ts"
);

function text(value) {
  return value == null ? "" : String(value).trim();
}

function localized(zh, en = zh) {
  return {
    zh: text(zh),
    en: text(en),
    es: text(en),
    fr: text(en),
    ko: text(en),
    ru: text(en),
  };
}

function ensureDir(filePath) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
}

function findWorkbook() {
  const cliPath = text(process.argv[2]);

  if (cliPath) {
    const resolved = path.resolve(cliPath);

    if (!fs.existsSync(resolved)) {
      throw new Error(`指定的 Excel 不存在：${resolved}`);
    }

    return resolved;
  }

  const sourceDir = path.join(
    root,
    "data-source",
    "product-center",
    "fittings"
  );

  if (!fs.existsSync(sourceDir)) {
    throw new Error(
      "未找到 data-source/product-center/fittings 目录。"
    );
  }

  const candidates = fs
    .readdirSync(sourceDir)
    .filter(
      (name) =>
        /FRGD-140D-2606-0002_001_cn_连接件标品在售清单.*\.xlsx$/i.test(
          name
        ) && !name.startsWith("~$")
    )
    .map((name) => path.join(sourceDir, name))
    .sort(
      (a, b) =>
        fs.statSync(b).mtimeMs - fs.statSync(a).mtimeMs
    );

  if (candidates.length === 0) {
    throw new Error(
      "未找到连接件标品在售清单 Excel。请把文件放到 data-source/product-center/fittings。"
    );
  }

  return candidates[0];
}

function loadTsModule(filePath) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`未找到参考文件：${filePath}`);
  }

  const source = fs.readFileSync(filePath, "utf8");

  const compiled = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
      esModuleInterop: true,
    },
    fileName: filePath,
  }).outputText;

  const loaded = new Module(filePath, module);
  loaded.filename = filePath;
  loaded.paths = Module._nodeModulePaths(path.dirname(filePath));
  loaded._compile(compiled, filePath);

  return loaded.exports;
}

function stripModelNote(model) {
  return text(model)
    .replace(/[（(][^）)]*[）)]/g, "")
    .trim();
}

function getModelNote(model) {
  const matches =
    text(model).match(/[（(]([^）)]*)[）)]/g) || [];

  return matches
    .map((item) =>
      item
        .replace(/^[（(]|[）)]$/g, "")
        .replace(/o圈/gi, "O型圈")
        .replace(/O圈/g, "O型圈")
        .replace(/带O型圈/g, "带O型圈")
        .trim()
    )
    .filter(Boolean)
    .join("；");
}

const THREAD_MAP = {
  U28: "1/4-28 UNF",
  U32: "10-32 UNF",
  X32: "3.4 锥螺纹",
  M5: "M5×0.8",
  M6: "M6×1",
  "G1/8": "G1/8",
  "1/8NPT": "1/8-27 NPT",
  "1/4NPT": "1/4-18 NPT",
  "3/8NPT": "3/8-18 NPT",
};

const THREAD_EN_MAP = {
  U28: "1/4-28 UNF",
  U32: "10-32 UNF",
  X32: "3.4 Tapered Thread",
  M5: "M5×0.8",
  M6: "M6×1",
  "G1/8": "G1/8",
  "1/8NPT": "1/8-27 NPT",
  "1/4NPT": "1/4-18 NPT",
  "3/8NPT": "3/8-18 NPT",
};

const TUBE_ID_MAP = {
  "16": "1.6 mm",
  "24": "2.4 mm",
  "32": "3.2 mm",
  "40": "4.0 mm",
  "48": "4.8 mm",
  "64": "6.4 mm",
  "79": "7.9 mm",
  "80": "8.0 mm",
  "95": "9.5 mm",
  "127": "12.7 mm",
};

const MATERIAL_MAP = {
  PP: "PP",
  PA: "PA",
  PV: "PVDF",
  AC: "POM",
  PK: "PEEK",
  CU: "铜",
  SS: "不锈钢",
};

const MATERIAL_EN_MAP = {
  PP: "PP",
  PA: "PA",
  PV: "PVDF",
  AC: "POM",
  PK: "PEEK",
  CU: "Copper",
  SS: "Stainless Steel",
};

const COLOR_MAP = {
  N: "本色",
  W: "白色",
  B: "黑色",
  S: "银色",
};

const COLOR_EN_MAP = {
  N: "Natural",
  W: "White",
  B: "Black",
  S: "Silver",
};

const SERIES_META = {
  SA: {
    structureZh: "直通型",
    structureEn: "Straight",
    sealingZh: "螺纹密封",
    sealingEn: "Thread Seal",
    nameZh: "直通螺纹密封螺纹转倒刺接头",
    nameEn: "Straight Thread-Seal Thread to Barb Fitting",
  },
  SAL: {
    structureZh: "L型",
    structureEn: "Elbow",
    sealingZh: "螺纹密封",
    sealingEn: "Thread Seal",
    nameZh: "L型螺纹密封螺纹转倒刺接头",
    nameEn: "Elbow Thread-Seal Thread to Barb Fitting",
  },
  SB: {
    structureZh: "直通型",
    structureEn: "Straight",
    sealingZh: "底面密封",
    sealingEn: "Bottom-Face Seal",
    nameZh: "直通底面密封螺纹转倒刺接头",
    nameEn: "Straight Bottom-Face-Seal Thread to Barb Fitting",
  },
  SBS: {
    structureZh: "直通型",
    structureEn: "Straight",
    sealingZh: "底面密封",
    sealingEn: "Bottom-Face Seal",
    nameZh: "直通底面密封螺纹转倒刺接头",
    nameEn: "Straight Bottom-Face-Seal Thread to Barb Fitting",
  },
  SBR: {
    structureZh: "可旋转直通型",
    structureEn: "Swivel Straight",
    sealingZh: "底面密封",
    sealingEn: "Bottom-Face Seal",
    nameZh: "可旋转式螺纹转倒刺接头",
    nameEn: "Swivel Thread to Barb Fitting",
  },
  SC: {
    structureZh: "直通型",
    structureEn: "Female Thread Straight",
    sealingZh: "内螺纹转倒刺",
    sealingEn: "Female Thread Connection",
    nameZh: "内螺纹转倒刺接头",
    nameEn: "Female Thread to Barb Fitting",
  },
};

function parseModel(rawModel, declaredSeries) {
  const model = text(rawModel);
  const baseModel = stripModelNote(model);
  const note = getModelNote(model);
  const parts = baseModel.split("-").map(text).filter(Boolean);

  const series = text(declaredSeries || parts[0]).toUpperCase();
  const threadCode = text(parts[1]).toUpperCase();
  const tubeToken = text(parts[2]);
  const materialCode = text(parts[3]).toUpperCase();
  const colorCode = text(parts[4]).toUpperCase();

  const tubeCode = tubeToken.replace(/[^0-9]/g, "");
  const meta = SERIES_META[series];

  if (!meta) {
    throw new Error(`未知产品系列：${series}，型号：${model}`);
  }

  const threadZh = THREAD_MAP[threadCode];

  if (!threadZh) {
    throw new Error(`未知螺纹代码：${threadCode}，型号：${model}`);
  }

  const tubeId = TUBE_ID_MAP[tubeCode];

  if (!tubeId) {
    throw new Error(`未知接管内径代码：${tubeCode}，型号：${model}`);
  }

  const materialZh = MATERIAL_MAP[materialCode];

  if (!materialZh) {
    throw new Error(`未知材质代码：${materialCode}，型号：${model}`);
  }

  const colorZh = COLOR_MAP[colorCode];

  if (!colorZh) {
    throw new Error(`未知颜色代码：${colorCode}，型号：${model}`);
  }

  return {
    model,
    baseModel,
    note,
    series,
    threadCode,
    threadZh,
    threadEn: THREAD_EN_MAP[threadCode] || threadZh,
    tubeId,
    materialCode,
    materialZh,
    materialEn: MATERIAL_EN_MAP[materialCode] || materialZh,
    colorCode,
    colorZh,
    colorEn: COLOR_EN_MAP[colorCode] || colorZh,
    meta,
  };
}

function cloneLocalized(baseValue, zh, en) {
  return {
    ...(baseValue && typeof baseValue === "object"
      ? baseValue
      : {}),
    ...localized(zh, en),
  };
}

function cloneTaxonomy(baseItems) {
  const base =
    baseItems.find(
      (item) =>
        text(item.id) === "barbed-fittings" ||
        text(item.productTypeId) === "barbed-fittings"
    ) || {};

  return [
    {
      ...base,
      id: PRODUCT_TYPE_ID,
      parentId: "fittings",
      categoryId: "fittings",
      productTypeId: PRODUCT_TYPE_ID,
      type: base.type || "productType",
      label: cloneLocalized(
        base.label,
        PRODUCT_TYPE_NAME_ZH,
        PRODUCT_TYPE_NAME_EN
      ),
      sortOrder: Number(base.sortOrder || 0) + 1,
    },
  ];
}

function createFilterLabels(baseLabels) {
  const definitions = [
    {
      filterKey: "filter01",
      zh: "连接结构",
      en: "Connection Structure",
      inputType: "single",
    },
    {
      filterKey: "filter02",
      zh: "密封方式",
      en: "Sealing Method",
      inputType: "single",
    },
    {
      filterKey: "filter03",
      zh: "螺纹规格",
      en: "Thread",
      inputType: "single",
    },
    {
      filterKey: "filter04",
      zh: "接管内径",
      en: "Tubing ID",
      inputType: "single",
    },
    {
      filterKey: "filter05",
      zh: "材质",
      en: "Material",
      inputType: "multiple",
    },
    {
      filterKey: "filter06",
      zh: "颜色",
      en: "Color",
      inputType: "multiple",
    },
  ];

  return definitions.map((definition, index) => {
    const base = baseLabels[index] || baseLabels[0] || {};

    return {
      ...base,
      categoryId: "fittings",
      productTypeId: PRODUCT_TYPE_ID,
      filterKey: definition.filterKey,
      label: cloneLocalized(
        base.label,
        definition.zh,
        definition.en
      ),
      inputType: definition.inputType,
      sortOrder:
        definition.filterKey === "filter02"
          ? 10
          : definition.filterKey === "filter01"
            ? 20
            : (index + 1) * 10,
      visible: true,
    };
  });
}

function countBy(items, getter) {
  const result = {};

  for (const item of items) {
    const key = text(getter(item)) || "（空）";
    result[key] = (result[key] || 0) + 1;
  }

  return result;
}

function main() {
  const workbookPath = findWorkbook();
  const workbook = XLSX.readFile(workbookPath, {
    raw: false,
    cellDates: false,
  });

  const sheet = workbook.Sheets[SOURCE_SHEET];

  if (!sheet) {
    throw new Error(`Excel 中未找到工作表：${SOURCE_SHEET}`);
  }

  const rows = XLSX.utils.sheet_to_json(sheet, {
    header: 1,
    defval: "",
    raw: false,
  });

  const records = rows
    .slice(2)
    .map((row, index) => ({
      sourceIndex: index + 1,
      excelRow: index + 3,
      productType: text(row[0]),
      series: text(row[1]).toUpperCase(),
      model: text(row[2]),
      productCode: text(row[3]),
      drawing2d: text(row[9]),
      drawing3d: text(row[10]),
    }))
    .filter((item) => item.model || item.productCode);

  const invalid = records.filter(
    (item) =>
      !item.series || !item.model || !item.productCode
  );

  if (invalid.length > 0) {
    throw new Error(
      invalid
        .map(
          (item) =>
            `Excel 第${item.excelRow}行缺少系列、型号或商品编码`
        )
        .join("\n")
    );
  }

  const barbedModule = loadTsModule(barbedDataPath);
  const baseProducts =
    barbedModule.barbedFittingSelectionProducts || [];
  const baseLabels =
    barbedModule.barbedFittingFilterLabels || [];
  const baseTaxonomy =
    barbedModule.barbedFittingTaxonomyItems || [];

  const baseProduct = baseProducts[0] || {};

  const products = records.map((record, index) => {
    const parsed = parseModel(
      record.model,
      record.series
    );

    const line1Zh = parsed.meta.nameZh;
    const line1En = parsed.meta.nameEn;

    const line2Zh =
      `${parsed.threadZh}｜适配${parsed.tubeId}软管内径`;
    const line2En =
      `${parsed.threadEn} | For ${parsed.tubeId} tubing ID`;

    const line3Zh =
      `${parsed.materialZh}材质｜${parsed.colorZh}` +
      (parsed.note ? `｜${parsed.note}` : "");

    const line3En =
      `${parsed.materialEn} | ${parsed.colorEn}` +
      (parsed.note ? ` | ${parsed.note}` : "");

    return {
      ...baseProduct,

      productId: record.productCode,
      productCode: record.productCode,
      sourceType: "thread-to-barbed-fitting-selection",

      categoryId: "fittings",
      categoryLabel: "接头系列",

      productTypeId: PRODUCT_TYPE_ID,
      productTypeName: PRODUCT_TYPE_NAME_ZH,

      seriesId: parsed.series.toLowerCase(),
      seriesCode: parsed.series,
      seriesName: parsed.meta.nameZh,

      model: parsed.model,
      foreachModel: parsed.model,

      cardTitle: localized(
        parsed.model,
        parsed.model
      ),

      cardSubtitle: localized(
        `${line1Zh}\n${line2Zh}\n${line3Zh}`,
        `${line1En}\n${line2En}\n${line3En}`
      ),

      filters: {
        filter01: parsed.meta.structureZh,
        filter02: parsed.meta.sealingZh,
        filter03: parsed.threadZh,
        filter04: parsed.tubeId,
        filter05: parsed.materialZh,
        filter06: parsed.colorZh,
      },

      connectionStructure:
        parsed.meta.structureZh,
      sealingMethod:
        parsed.meta.sealingZh,
      threadSpecification:
        parsed.threadZh,
      tubingInnerDiameter:
        parsed.tubeId,
      materialCode:
        parsed.materialCode,
      colorCode:
        parsed.colorCode,
      modelNote:
        parsed.note,

      imageCard:
        "/images/logo/foreach-logo-color.svg",

      detailSlug:
        "thread-to-barbed-fittings",
      detailHref:
        SELECTION_HREF,
      selectionHref:
        SELECTION_HREF,

      status: "active",
      sourceIndex: record.sourceIndex,
      sortOrder: 20000 + index,

      searchKeywords: localized(
        [
          parsed.model,
          record.productCode,
          PRODUCT_TYPE_NAME_ZH,
          parsed.meta.nameZh,
          parsed.series,
          parsed.meta.structureZh,
          parsed.meta.sealingZh,
          parsed.threadZh,
          parsed.tubeId,
          parsed.materialZh,
          parsed.colorZh,
          parsed.note,
        ]
          .filter(Boolean)
          .join(" "),
        [
          parsed.model,
          record.productCode,
          PRODUCT_TYPE_NAME_EN,
          parsed.meta.nameEn,
          parsed.series,
          parsed.meta.structureEn,
          parsed.meta.sealingEn,
          parsed.threadEn,
          parsed.tubeId,
          parsed.materialEn,
          parsed.colorEn,
          parsed.note,
        ]
          .filter(Boolean)
          .join(" ")
      ),
    };
  });

  const filterLabels =
    createFilterLabels(baseLabels);
  const taxonomyItems =
    cloneTaxonomy(baseTaxonomy);

  const duplicateModelMap = new Map();

  for (const product of products) {
    const model = product.model;

    if (!duplicateModelMap.has(model)) {
      duplicateModelMap.set(model, []);
    }

    duplicateModelMap
      .get(model)
      .push(product.productCode);
  }

  const duplicateModels = Array.from(
    duplicateModelMap.entries()
  )
    .filter(([, codes]) => codes.length > 1)
    .map(([model, productCodes]) => ({
      model,
      productCodes,
    }));

  const generatedAt =
    new Date().toISOString();

  const generatedSource = `/* =========================================================
   thread-to-barbed-fitting-selection.generated.ts
   来源：${SOURCE_SHEET}
   数量：${products.length}
   自动生成，请勿手工修改
   ========================================================= */

import type {
  ProductSelectionFilterLabel,
  ProductSelectionProduct,
  ProductSelectionTaxonomyItem,
} from "./product-selection.types";

export const threadToBarbedFittingSelectionProducts =
${JSON.stringify(products, null, 2)} as ProductSelectionProduct[];

export const threadToBarbedFittingTaxonomyItems =
${JSON.stringify(taxonomyItems, null, 2)} as ProductSelectionTaxonomyItem[];

export const threadToBarbedFittingFilterLabels =
${JSON.stringify(filterLabels, null, 2)} as ProductSelectionFilterLabel[];
`;

  const summary = {
    generatedAt,
    sourceWorkbook: path.relative(
      root,
      workbookPath
    ),
    sourceSheet: SOURCE_SHEET,
    productTypeId: PRODUCT_TYPE_ID,
    total: products.length,
    seriesCounts: countBy(
      products,
      (item) => item.seriesCode
    ),
    structureCounts: countBy(
      products,
      (item) =>
        item.filters.filter01
    ),
    sealingCounts: countBy(
      products,
      (item) =>
        item.filters.filter02
    ),
    threadCounts: countBy(
      products,
      (item) =>
        item.filters.filter03
    ),
    tubeIdCounts: countBy(
      products,
      (item) =>
        item.filters.filter04
    ),
    materialCounts: countBy(
      products,
      (item) =>
        item.filters.filter05
    ),
    colorCounts: countBy(
      products,
      (item) =>
        item.filters.filter06
    ),
    duplicateModels,
  };

  ensureDir(outputPath);
  ensureDir(summaryPath);

  fs.writeFileSync(
    outputPath,
    generatedSource,
    "utf8"
  );

  fs.writeFileSync(
    summaryPath,
    JSON.stringify(summary, null, 2) + "\n",
    "utf8"
  );

  console.log("");
  console.log("============================================");
  console.log("螺纹转倒刺接头筛选数据生成完成");
  console.log("============================================");
  console.log(`Excel：${workbookPath}`);
  console.log(`工作表：${SOURCE_SHEET}`);
  console.log(`产品数量：${products.length}`);
  console.log(`重复型号组：${duplicateModels.length}`);
  console.log(`数据文件：${outputPath}`);
  console.log(`摘要文件：${summaryPath}`);
  console.log("");
  console.log("本步骤未修改 ProductSelectionClient.tsx。");
  console.log("本步骤未新增页面路由。");
}

main();
