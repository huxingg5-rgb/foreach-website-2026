"use strict";

const fs = require("fs");
const path = require("path");
const Module = require("module");

const projectPath = path.resolve(
  process.argv[2]
);

const reportDirectory = path.resolve(
  process.argv[3]
);

const ts = require(
  path.join(
    projectPath,
    "node_modules",
    "typescript",
    "lib",
    "typescript.js"
  )
);

const generatedRoot = path.join(
  projectPath,
  "data",
  "products",
  "generated"
);

const englishIntlPath = path.join(
  projectPath,
  "data",
  "products",
  "detail",
  "product-detail.intl.ts"
);

const targetIntlPath = path.join(
  projectPath,
  "data",
  "products",
  "detail",
  "product-detail.target.intl.ts"
);

const plungerDataPath = path.join(
  projectPath,
  "data",
  "products",
  "detail",
  "plunger-pump-detail.generated.ts"
);

const controlDataPath = path.join(
  projectPath,
  "data",
  "products",
  "control-modules",
  "control-module-detail.generated.ts"
);

/* ============================================================
 * 一、通用工具
 * ============================================================ */

function normalizeSlash(value) {
  return String(value || "")
    .replace(/\\/g, "/");
}

function normalizeText(value) {
  return String(value || "")
    .replace(/\s+/g, " ")
    .trim();
}

function normalizeCompare(value) {
  return normalizeText(value)
    .toLowerCase()
    .replace(/[‐-‒–—−]/g, "-")
    .replace(/\s+/g, "");
}

function relativePath(filePath) {
  return normalizeSlash(
    path.relative(projectPath, filePath)
  );
}

function readText(filePath) {
  return fs
    .readFileSync(filePath, "utf8")
    .replace(/^\uFEFF/, "");
}

function deepClone(value) {
  return JSON.parse(
    JSON.stringify(value)
  );
}

function walkFiles(directoryPath) {
  if (!fs.existsSync(directoryPath)) {
    return [];
  }

  const output = [];
  const stack = [directoryPath];

  while (stack.length > 0) {
    const currentDirectory = stack.pop();

    const entries = fs.readdirSync(
      currentDirectory,
      {
        withFileTypes: true,
      }
    );

    for (const entry of entries) {
      const fullPath = path.join(
        currentDirectory,
        entry.name
      );

      if (entry.isDirectory()) {
        stack.push(fullPath);
        continue;
      }

      if (entry.isFile()) {
        output.push(fullPath);
      }
    }
  }

  return output;
}

function csvEscape(value) {
  const text = String(
    value === undefined ||
    value === null
      ? ""
      : value
  );

  if (
    text.includes(",") ||
    text.includes('"') ||
    text.includes("\r") ||
    text.includes("\n")
  ) {
    return `"${text.replace(/"/g, '""')}"`;
  }

  return text;
}

function writeCsv(
  filePath,
  rows,
  columns
) {
  const lines = [];

  lines.push(
    columns
      .map((column) =>
        csvEscape(column.title)
      )
      .join(",")
  );

  for (const row of rows) {
    lines.push(
      columns
        .map((column) =>
          csvEscape(row[column.key])
        )
        .join(",")
    );
  }

  fs.writeFileSync(
    filePath,
    "\uFEFF" +
      lines.join("\r\n") +
      "\r\n",
    "utf8"
  );
}

/* ============================================================
 * 二、TypeScript 模块加载器
 * ============================================================ */

const moduleCache = new Map();

function resolveProjectModule(
  request,
  parentFilename
) {
  let basePath;

  if (request.startsWith("@/")) {
    basePath = path.join(
      projectPath,
      request.slice(2)
    );
  } else if (request.startsWith(".")) {
    basePath = path.resolve(
      path.dirname(parentFilename),
      request
    );
  } else {
    return null;
  }

  const candidates = [
    basePath,
    `${basePath}.ts`,
    `${basePath}.tsx`,
    `${basePath}.js`,
    `${basePath}.cjs`,
    `${basePath}.json`,
    path.join(basePath, "index.ts"),
    path.join(basePath, "index.tsx"),
    path.join(basePath, "index.js"),
    path.join(basePath, "index.json"),
  ];

  for (const candidate of candidates) {
    if (
      fs.existsSync(candidate) &&
      fs.statSync(candidate).isFile()
    ) {
      return candidate;
    }
  }

  throw new Error(
    [
      `无法解析模块：${request}`,
      `引用文件：${parentFilename}`,
    ].join("\n")
  );
}

function loadProjectModule(filePath) {
  const resolvedPath = path.resolve(
    filePath
  );

  if (moduleCache.has(resolvedPath)) {
    return moduleCache.get(
      resolvedPath
    ).exports;
  }

  const extension = path
    .extname(resolvedPath)
    .toLowerCase();

  if (extension === ".json") {
    const value = JSON.parse(
      readText(resolvedPath)
    );

    moduleCache.set(resolvedPath, {
      exports: value,
    });

    return value;
  }

  if (
    extension === ".js" ||
    extension === ".cjs"
  ) {
    return require(resolvedPath);
  }

  if (
    extension !== ".ts" &&
    extension !== ".tsx"
  ) {
    throw new Error(
      `不支持加载：${resolvedPath}`
    );
  }

  const sourceCode = readText(
    resolvedPath
  );

  const outputCode = ts.transpileModule(
    sourceCode,
    {
      compilerOptions: {
        module: ts.ModuleKind.CommonJS,
        target: ts.ScriptTarget.ES2020,
        esModuleInterop: true,
        allowSyntheticDefaultImports: true,
        resolveJsonModule: true,
        jsx: ts.JsxEmit.ReactJSX,
      },
      fileName: resolvedPath,
      reportDiagnostics: false,
    }
  ).outputText;

  const loadedModule = new Module(
    resolvedPath,
    module.parent
  );

  moduleCache.set(
    resolvedPath,
    loadedModule
  );

  loadedModule.filename =
    resolvedPath;

  loadedModule.paths =
    Module._nodeModulePaths(
      path.dirname(resolvedPath)
    );

  const nativeRequire =
    loadedModule.require.bind(
      loadedModule
    );

  loadedModule.require =
    function customRequire(request) {
      const localPath =
        resolveProjectModule(
          request,
          resolvedPath
        );

      if (localPath) {
        return loadProjectModule(
          localPath
        );
      }

      return nativeRequire(request);
    };

  loadedModule._compile(
    outputCode,
    resolvedPath
  );

  return loadedModule.exports;
}

/* ============================================================
 * 三、提取普通泵和三款阀
 * ============================================================ */

function looksLikeProductRecord(value) {
  if (
    !value ||
    typeof value !== "object" ||
    Array.isArray(value)
  ) {
    return false;
  }

  const hasIdentity = Boolean(
    value.slug ||
      value.productId ||
      value.productCode ||
      value.foreachModel
  );

  const hasTitle = Boolean(
    value.model ||
      value.title ||
      value.name
  );

  const hasDetailContent = Boolean(
    value.description ||
      value.specs ||
      value.mainImage ||
      value.image ||
      value.seriesSlug
  );

  return (
    hasIdentity &&
    hasTitle &&
    hasDetailContent
  );
}

function collectProductRecords(
  value,
  sourceFile,
  output,
  visited
) {
  if (
    value === null ||
    value === undefined ||
    typeof value !== "object"
  ) {
    return;
  }

  if (visited.has(value)) {
    return;
  }

  visited.add(value);

  if (looksLikeProductRecord(value)) {
    output.push({
      record: value,
      sourceFile,
    });
  }

  if (Array.isArray(value)) {
    for (const child of value) {
      collectProductRecords(
        child,
        sourceFile,
        output,
        visited
      );
    }

    return;
  }

  for (
    const child
    of Object.values(value)
  ) {
    collectProductRecords(
      child,
      sourceFile,
      output,
      visited
    );
  }
}

const allowedValveSlugs = new Set([
  "rotary-valves",
  "high-pressure-valves",
  "solenoid-valves",
]);

function classifyOrdinaryRecord(
  record,
  sourceFile
) {
  const source = relativePath(
    sourceFile
  ).toLowerCase();

  if (
    source.includes(
      "data/products/generated/fittings/"
    ) ||
    source.includes(
      "data/products/generated/tubing/"
    )
  ) {
    return null;
  }

  if (
    source.startsWith(
      "data/products/generated/pumps/"
    )
  ) {
    return {
      category: "泵",
      type: "普通泵",
    };
  }

  if (
    source.startsWith(
      "data/products/generated/valves/"
    )
  ) {
    const slug = normalizeText(
      record.slug
    ).toLowerCase();

    if (!allowedValveSlugs.has(slug)) {
      return null;
    }

    return {
      category: "阀",
      type: "阀",
    };
  }

  return null;
}

const detailJsonFiles = walkFiles(
  generatedRoot
).filter((filePath) => {
  const source = relativePath(
    filePath
  ).toLowerCase();

  return (
    path.extname(filePath)
      .toLowerCase() === ".json" &&
    source.includes("/detail/")
  );
});

const rawOrdinaryRecords = [];

for (
  const jsonFile
  of detailJsonFiles
) {
  const jsonValue = JSON.parse(
    readText(jsonFile)
  );

  collectProductRecords(
    jsonValue,
    jsonFile,
    rawOrdinaryRecords,
    new WeakSet()
  );
}

const ordinaryMap = new Map();

for (
  const item
  of rawOrdinaryRecords
) {
  const classification =
    classifyOrdinaryRecord(
      item.record,
      item.sourceFile
    );

  if (!classification) {
    continue;
  }

  const identity = normalizeCompare(
    item.record.slug ||
      item.record.productId ||
      item.record.productCode ||
      item.record.foreachModel
  );

  const key =
    `${classification.category}:${identity}`;

  if (!ordinaryMap.has(key)) {
    ordinaryMap.set(key, {
      ...item,
      ...classification,
    });
  }
}

const ordinaryProducts =
  Array.from(
    ordinaryMap.values()
  );

const ordinaryPumps =
  ordinaryProducts.filter(
    (item) =>
      item.category === "泵"
  );

const valves =
  ordinaryProducts.filter(
    (item) =>
      item.category === "阀"
  );

/* ============================================================
 * 四、加载柱塞泵和智控
 * ============================================================ */

const plungerModule =
  loadProjectModule(
    plungerDataPath
  );

const controlModule =
  loadProjectModule(
    controlDataPath
  );

const plungerPumpDetails =
  plungerModule.plungerPumpDetails;

const controlModuleDetails =
  controlModule.controlModuleDetails;

if (
  !Array.isArray(
    plungerPumpDetails
  )
) {
  throw new Error(
    "没有读取到 plungerPumpDetails。"
  );
}

if (
  !Array.isArray(
    controlModuleDetails
  )
) {
  throw new Error(
    "没有读取到 controlModuleDetails。"
  );
}

/* ============================================================
 * 五、加载真实本地化函数
 * ============================================================ */

const englishModule =
  loadProjectModule(
    englishIntlPath
  );

const targetModule =
  loadProjectModule(
    targetIntlPath
  );

const localizeEnglish =
  englishModule
    .localizeProductDetailData;

const localizeTarget =
  targetModule
    .localizeTargetProductDetailData;

if (
  typeof localizeEnglish !==
  "function"
) {
  throw new Error(
    "没有读取到英文详情本地化函数。"
  );
}

if (
  typeof localizeTarget !==
  "function"
) {
  throw new Error(
    "没有读取到目标语言详情本地化函数。"
  );
}

/* ============================================================
 * 六、标题工具
 * ============================================================ */

function chooseTitle(record) {
  return normalizeText(
    record.model ||
      record.title ||
      record.name ||
      ""
  );
}

function chooseLocalizedTitle(record) {
  return normalizeText(
    record.model ||
      record.displayTitle ||
      record.localizedTitle ||
      record.title ||
      record.name ||
      ""
  );
}

function extractModelCode(
  record,
  title
) {
  const candidates = [
    record.foreachModel,
    record.productCode,
    record.modelCode,
    record.displayModel,
    record.internalModelRef,
  ]
    .map(normalizeText)
    .filter(Boolean);

  if (candidates.length > 0) {
    return candidates[0];
  }

  const firstToken = normalizeText(
    title
  ).split(" ")[0];

  if (
    /^[A-Z0-9]+(?:[-./][A-Z0-9.]+)+$/i.test(
      firstToken
    )
  ) {
    return firstToken;
  }

  return "";
}

function localizeTitles(
  sourceData,
  pathname
) {
  const englishData =
    localizeEnglish(
      deepClone(sourceData)
    );

  const targetData = {};

  for (
    const locale
    of ["es", "fr", "ko", "ru"]
  ) {
    targetData[locale] =
      localizeTarget(
        deepClone(sourceData),
        locale,
        `/${locale}${pathname}`
      );
  }

  return {
    en: chooseLocalizedTitle(
      englishData
    ),
    es: chooseLocalizedTitle(
      targetData.es
    ),
    fr: chooseLocalizedTitle(
      targetData.fr
    ),
    ko: chooseLocalizedTitle(
      targetData.ko
    ),
    ru: chooseLocalizedTitle(
      targetData.ru
    ),
  };
}

/* ============================================================
 * 七、生成普通泵和阀记录
 * ============================================================ */

const rows = [];

for (
  const item
  of ordinaryProducts
) {
  const sourceData = deepClone(
    item.record
  );

  const slug = normalizeText(
    sourceData.slug ||
      sourceData.productId
  );

  const zhTitle = chooseTitle(
    sourceData
  );

  const modelCode =
    extractModelCode(
      sourceData,
      zhTitle
    );

  const pathname =
    item.category === "阀"
      ? `/products/valves/${slug}/`
      : (
          sourceData.detailHref ||
          `/products/pumps/${sourceData.productTypeId || sourceData.seriesSlug || "detail"}/${slug}/`
        );

  const localized =
    localizeTitles(
      sourceData,
      pathname
    );

  rows.push({
    产品系列: item.category,
    产品类型: item.type,
    子系列:
      normalizeText(
        sourceData.productTypeName ||
          sourceData.seriesName ||
          sourceData.productTypeId ||
          sourceData.seriesSlug
      ),
    产品Slug: slug,
    产品型号: modelCode,
    中文完整标题: zhTitle,
    英文完整标题: localized.en,
    当前西班牙语标题: localized.es,
    当前法语标题: localized.fr,
    当前韩语标题: localized.ko,
    当前俄语标题: localized.ru,
    数据源文件: relativePath(
      item.sourceFile
    ),
  });
}

/* ============================================================
 * 八、生成柱塞泵记录
 * ============================================================ */

for (
  const detail
  of plungerPumpDetails
) {
  const modelCode = normalizeText(
    detail.model
  );

  const zhTitle = normalizeText(
    detail.title ||
      `${modelCode} 柱塞泵`
  );

  const sourceData = {
    ...deepClone(detail),

    model: zhTitle,
    title: zhTitle,
    name: zhTitle,

    displayModel: modelCode,
    foreachModel: modelCode,
    productCode: modelCode,

    category: "pumps",
    categoryId: "pumps",
    productCategory: "pumps",

    productTypeId: "plunger-pumps",
    productTypeName: "柱塞泵",

    detailHref:
      `/products/pumps/plunger-pumps/${detail.slug}/`,
  };

  const localized =
    localizeTitles(
      sourceData,
      sourceData.detailHref
    );

  rows.push({
    产品系列: "泵",
    产品类型: "柱塞泵",
    子系列:
      normalizeText(
        detail.seriesName ||
          detail.seriesCode
      ),
    产品Slug:
      normalizeText(detail.slug),
    产品型号: modelCode,
    中文完整标题: zhTitle,
    英文完整标题: localized.en,
    当前西班牙语标题: localized.es,
    当前法语标题: localized.fr,
    当前韩语标题: localized.ko,
    当前俄语标题: localized.ru,
    数据源文件:
      relativePath(
        plungerDataPath
      ),
  });
}

/* ============================================================
 * 九、生成智控记录
 * ============================================================ */

for (
  const detail
  of controlModuleDetails
) {
  const zhTitle = normalizeText(
    detail.title
  );

  const modelCode =
    zhTitle.split(" ")[0];

  const sourceData = {
    ...deepClone(detail),

    model: zhTitle,
    title: zhTitle,
    name: zhTitle,

    displayModel: modelCode,
    foreachModel: modelCode,
    productCode: modelCode,

    category: "control",
    categoryId: "control",
    productCategory: "control",

    productTypeId: "control",
    productTypeName: "智控模块",
    categoryLabel: "智控系列",

    detailHref:
      `/products/control/${detail.slug}/`,
  };

  const localized =
    localizeTitles(
      sourceData,
      sourceData.detailHref
    );

  rows.push({
    产品系列: "智控",
    产品类型: "智控",
    子系列:
      normalizeText(
        detail.categoryLabel
      ),
    产品Slug:
      normalizeText(detail.slug),
    产品型号: modelCode,
    中文完整标题: zhTitle,
    英文完整标题: localized.en,
    当前西班牙语标题: localized.es,
    当前法语标题: localized.fr,
    当前韩语标题: localized.ko,
    当前俄语标题: localized.ru,
    数据源文件:
      relativePath(
        controlDataPath
      ),
  });
}

/* ============================================================
 * 十、数量强制校验
 * ============================================================ */

const countSummary = {
  ordinaryPumps:
    ordinaryPumps.length,
  plungerPumps:
    plungerPumpDetails.length,
  valves:
    valves.length,
  control:
    controlModuleDetails.length,
  total:
    rows.length,
};

const expected = {
  ordinaryPumps: 28,
  plungerPumps: 25,
  valves: 3,
  control: 2,
  total: 58,
};

for (
  const key
  of Object.keys(expected)
) {
  if (
    countSummary[key] !==
    expected[key]
  ) {
    throw new Error(
      [
        "产品数量校验失败，已停止生成正式底表。",
        "",
        `项目：${key}`,
        `实际：${countSummary[key]}`,
        `预期：${expected[key]}`,
      ].join("\n")
    );
  }
}

/*
 * 确认没有针、接头和管路。
 */
for (const row of rows) {
  const sourceText = [
    row.产品系列,
    row.产品类型,
    row.数据源文件,
  ]
    .join(" ")
    .toLowerCase();

  if (
    /fittings?|connector|接头|tubing|管路|probes?|needles?|针系列/.test(
      sourceText
    )
  ) {
    throw new Error(
      `发现不应纳入的产品：${row.产品Slug}`
    );
  }
}

/* ============================================================
 * 十一、排序与输出
 * ============================================================ */

const categoryOrder = {
  泵: 1,
  阀: 2,
  智控: 3,
};

const typeOrder = {
  柱塞泵: 1,
  普通泵: 2,
  阀: 3,
  智控: 4,
};

rows.sort((left, right) => {
  const categoryDifference =
    categoryOrder[left.产品系列] -
    categoryOrder[right.产品系列];

  if (categoryDifference !== 0) {
    return categoryDifference;
  }

  const typeDifference =
    typeOrder[left.产品类型] -
    typeOrder[right.产品类型];

  if (typeDifference !== 0) {
    return typeDifference;
  }

  return String(
    left.产品型号 ||
      left.产品Slug
  ).localeCompare(
    String(
      right.产品型号 ||
        right.产品Slug
    ),
    "zh-CN"
  );
});

const columns = [
  ["产品系列", "产品系列"],
  ["产品类型", "产品类型"],
  ["子系列", "子系列"],
  ["产品Slug", "产品Slug"],
  ["产品型号", "产品型号"],

  [
    "中文完整标题",
    "中文完整标题",
  ],
  [
    "英文完整标题",
    "英文完整标题",
  ],

  [
    "当前西班牙语标题",
    "当前西班牙语标题",
  ],
  [
    "当前法语标题",
    "当前法语标题",
  ],
  [
    "当前韩语标题",
    "当前韩语标题",
  ],
  [
    "当前俄语标题",
    "当前俄语标题",
  ],

  [
    "数据源文件",
    "数据源文件",
  ],
].map(([key, title]) => ({
  key,
  title,
}));

const csvPath = path.join(
  reportDirectory,
  "01_泵阀智控58个产品_中英完整标题底表.csv"
);

writeCsv(
  csvPath,
  rows,
  columns
);

const jsonPath = path.join(
  reportDirectory,
  "02_泵阀智控58个产品_标题底表.json"
);

fs.writeFileSync(
  jsonPath,
  JSON.stringify(
    rows,
    null,
    2
  ),
  "utf8"
);

const summaryLines = [
  "泵、阀、智控正式多语言标题底表",
  `生成时间：${new Date().toLocaleString("zh-CN")}`,
  "",
  `普通泵：${countSummary.ordinaryPumps}`,
  `柱塞泵：${countSummary.plungerPumps}`,
  `泵合计：${countSummary.ordinaryPumps + countSummary.plungerPumps}`,
  `阀：${countSummary.valves}`,
  `智控：${countSummary.control}`,
  `总计：${countSummary.total}`,
  "",
  "明确排除：针、接头、管路。",
  "",
  "本次只生成翻译底表，没有修改任何网站源码。",
];

const summaryPath = path.join(
  reportDirectory,
  "03_标题底表生成摘要.txt"
);

fs.writeFileSync(
  summaryPath,
  "\uFEFF" +
    summaryLines.join("\r\n") +
    "\r\n",
  "utf8"
);

console.log("");
console.log("标题底表生成完成。");
console.log("");
console.log(
  `普通泵：${countSummary.ordinaryPumps}`
);
console.log(
  `柱塞泵：${countSummary.plungerPumps}`
);
console.log(
  `阀：${countSummary.valves}`
);
console.log(
  `智控：${countSummary.control}`
);
console.log(
  `合计：${countSummary.total}`
);
console.log("");
console.log(csvPath);
console.log(jsonPath);
console.log(summaryPath);
console.log("");