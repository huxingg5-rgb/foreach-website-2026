const fs = require("fs");
const path = require("path");
const ts = require("typescript");

const root = process.cwd();

const sourceDirectory =
  String.raw`H:\01-官网项目\02_产品中心\fit\Barbed connector\已压缩_JPG`;

const selectionPath = path.join(
  root,
  "data",
  "products",
  "selection",
  "barbed-fitting-selection.generated.ts"
);

const detailPath = path.join(
  root,
  "data",
  "products",
  "generated",
  "fittings",
  "barbed-fittings",
  "detail",
  "index.json"
);

const targetDirectory = path.join(
  root,
  "public",
  "images",
  "products",
  "fittings",
  "barbed-fittings",
  "products"
);

const mapPath = path.join(
  root,
  "data",
  "products",
  "selection",
  "barbed-fitting-image-map.generated.json"
);

const reportPath = path.join(
  root,
  "reports",
  "barbed-fitting-image-import-report.json"
);

const supportedExtensions =
  new Set([
    ".jpg",
    ".jpeg",
    ".png",
    ".webp",
  ]);

function ensureFile(filePath) {
  if (!fs.existsSync(filePath)) {
    throw new Error(
      "未找到文件：" + filePath
    );
  }
}

function read(filePath) {
  return fs.readFileSync(
    filePath,
    "utf8"
  );
}

function normalizeModel(value) {
  return String(value || "")
    .trim()
    .replace(
      /\.(jpg|jpeg|png|webp)$/i,
      ""
    )
    .trim()
    .toUpperCase()
    .replace(
      /[^A-Z0-9]/g,
      ""
    );
}

function modelToSlug(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/×/g, "x")
    .replace(
      /[‐-‒–—−]/g,
      "-"
    )
    .replace(
      /[^a-z0-9]+/g,
      "-"
    )
    .replace(
      /^-+|-+$/g,
      ""
    );
}

function getLocalizedText(value) {
  if (
    typeof value === "string" ||
    typeof value === "number"
  ) {
    return String(value);
  }

  if (
    value &&
    typeof value === "object"
  ) {
    return String(
      value.zh ||
      value.en ||
      Object.values(value)
        .find(
          (item) =>
            typeof item === "string"
        ) ||
      ""
    );
  }

  return "";
}

function getSelectionModel(item) {
  return String(
    item?.model ||
    item?.modelCode ||
    item?.displayModel ||
    getLocalizedText(
      item?.cardTitle
    ) ||
    ""
  ).trim();
}

function getDetailModel(item) {
  return String(
    item?.model ||
    item?.modelCode ||
    item?.displayModel ||
    item?.foreachModel ||
    item?.modelDisplay ||
    item?.slug ||
    ""
  ).trim();
}

function walk(directory) {
  if (!fs.existsSync(directory)) {
    return [];
  }

  const result = [];

  for (
    const entry
    of fs.readdirSync(
      directory,
      {
        withFileTypes: true,
      }
    )
  ) {
    const fullPath =
      path.join(
        directory,
        entry.name
      );

    if (entry.isDirectory()) {
      result.push(
        ...walk(fullPath)
      );

      continue;
    }

    if (entry.isFile()) {
      result.push(
        fullPath
      );
    }
  }

  return result;
}

function findExportArrayRange(
  source,
  exportName
) {
  const pattern =
    new RegExp(
      `export\\s+const\\s+${exportName}\\b`
    );

  const match =
    source.match(pattern);

  if (
    !match ||
    match.index == null
  ) {
    throw new Error(
      "没有找到导出：" +
        exportName
    );
  }

  const assignmentIndex =
    source.indexOf(
      "=",
      match.index
    );

  if (assignmentIndex < 0) {
    throw new Error(
      exportName +
        " 没有找到赋值符号。"
    );
  }

  const arrayStart =
    source.indexOf(
      "[",
      assignmentIndex
    );

  if (arrayStart < 0) {
    throw new Error(
      exportName +
        " 没有找到数组起点。"
    );
  }

  let depth = 0;
  let quote = "";
  let escaped = false;
  let lineComment = false;
  let blockComment = false;

  for (
    let index = arrayStart;
    index < source.length;
    index += 1
  ) {
    const char =
      source[index];

    const next =
      source[index + 1];

    if (lineComment) {
      if (char === "\n") {
        lineComment = false;
      }

      continue;
    }

    if (blockComment) {
      if (
        char === "*" &&
        next === "/"
      ) {
        blockComment = false;
        index += 1;
      }

      continue;
    }

    if (quote) {
      if (escaped) {
        escaped = false;
        continue;
      }

      if (char === "\\") {
        escaped = true;
        continue;
      }

      if (char === quote) {
        quote = "";
      }

      continue;
    }

    if (
      char === "/" &&
      next === "/"
    ) {
      lineComment = true;
      index += 1;
      continue;
    }

    if (
      char === "/" &&
      next === "*"
    ) {
      blockComment = true;
      index += 1;
      continue;
    }

    if (
      char === '"' ||
      char === "'" ||
      char === "`"
    ) {
      quote = char;
      continue;
    }

    if (char === "[") {
      depth += 1;
      continue;
    }

    if (char === "]") {
      depth -= 1;

      if (depth === 0) {
        return {
          start:
            arrayStart,

          end:
            index + 1,
        };
      }
    }
  }

  throw new Error(
    exportName +
      " 数组没有正常结束。"
  );
}

function buildModelIndex(
  records,
  getModel
) {
  const result =
    new Map();

  records.forEach(
    (record, index) => {
      const model =
        getModel(record);

      const key =
        normalizeModel(model);

      if (!key) {
        return;
      }

      if (!result.has(key)) {
        result.set(
          key,
          []
        );
      }

      result
        .get(key)
        .push({
          record,
          index,
          model,
        });
    }
  );

  return result;
}

function validateSelectionTsx(
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

ensureFile(selectionPath);
ensureFile(detailPath);

if (
  !fs.existsSync(
    sourceDirectory
  )
) {
  throw new Error(
    "未找到图片源目录：" +
      sourceDirectory
  );
}

const selectionSource =
  read(selectionPath);

const arrayRange =
  findExportArrayRange(
    selectionSource,
    "barbedFittingSelectionProducts"
  );

const selectionProducts =
  JSON.parse(
    selectionSource.slice(
      arrayRange.start,
      arrayRange.end
    )
  );

const details =
  JSON.parse(
    read(detailPath)
  );

if (!Array.isArray(selectionProducts)) {
  throw new Error(
    "倒刺接头选型数据不是数组。"
  );
}

if (!Array.isArray(details)) {
  throw new Error(
    "倒刺接头详情数据不是数组。"
  );
}

const barbedSelection =
  selectionProducts.filter(
    (item) =>
      String(
        item?.productTypeId ||
        ""
      ).trim() ===
        "barbed-fittings"
  );

const barbedDetails =
  details.filter(
    (item) =>
      String(
        item?.productTypeId ||
        ""
      ).trim() ===
        "barbed-fittings"
  );

const selectionIndex =
  buildModelIndex(
    barbedSelection,
    getSelectionModel
  );

const detailIndex =
  buildModelIndex(
    barbedDetails,
    getDetailModel
  );

const sourceImages =
  walk(sourceDirectory)
    .filter(
      (filePath) =>
        supportedExtensions.has(
          path
            .extname(filePath)
            .toLowerCase()
        )
    )
    .sort(
      (a, b) =>
        a.localeCompare(
          b,
          "zh-CN"
        )
    );

if (
  sourceImages.length !== 144
) {
  throw new Error(
    "源图片数量与检查报告不一致：" +
      sourceImages.length +
      "/144"
  );
}

const problems = [];
const plans = [];
const destinationNames =
  new Set();

for (
  const sourcePath
  of sourceImages
) {
  /*
   * 处理以下特殊文件名：
   *
   * BA-64C-PP-N .jpg
   * BL-16d-PP-N.jpg
   * BA-16F-24F-Pv-N.jpg
   */
  const sourceModel =
    path
      .parse(sourcePath)
      .name
      .trim();

  const key =
    normalizeModel(
      sourceModel
    );

  const selectionMatches =
    selectionIndex.get(key) ||
    [];

  const detailMatches =
    detailIndex.get(key) ||
    [];

  if (
    selectionMatches.length !== 1 ||
    detailMatches.length !== 1
  ) {
    problems.push({
      sourceFile:
        path.basename(sourcePath),

      sourceModel,

      selectionMatches:
        selectionMatches.map(
          (item) =>
            item.model
        ),

      detailMatches:
        detailMatches.map(
          (item) =>
            item.model
        ),
    });

    continue;
  }

  const selectionMatch =
    selectionMatches[0];

  const detailMatch =
    detailMatches[0];

  const canonicalModel =
    getDetailModel(
      detailMatch.record
    ) ||
    getSelectionModel(
      selectionMatch.record
    );

  const slug =
    modelToSlug(
      canonicalModel
    );

  if (!slug) {
    problems.push({
      sourceFile:
        path.basename(sourcePath),

      reason:
        "无法生成目标文件名",
    });

    continue;
  }

  let extension =
    path
      .extname(sourcePath)
      .toLowerCase();

  if (extension === ".jpeg") {
    extension = ".jpg";
  }

  const destinationName =
    `${slug}-main${extension}`;

  const destinationKey =
    destinationName.toLowerCase();

  if (
    destinationNames.has(
      destinationKey
    )
  ) {
    problems.push({
      sourceFile:
        path.basename(sourcePath),

      reason:
        "目标文件名重复",

      destinationName,
    });

    continue;
  }

  destinationNames.add(
    destinationKey
  );

  const destinationPath =
    path.join(
      targetDirectory,
      destinationName
    );

  const webPath =
    `/images/products/fittings/barbed-fittings/products/${destinationName}`;

  plans.push({
    sourcePath,
    sourceFile:
      path.basename(sourcePath),

    sourceModel,
    canonicalModel,

    productId:
      String(
        detailMatch.record
          ?.productId ||
        selectionMatch.record
          ?.productId ||
        ""
      ).trim(),

    slug:
      String(
        detailMatch.record
          ?.slug ||
        slug
      ).trim(),

    selectionRecord:
      selectionMatch.record,

    detailRecord:
      detailMatch.record,

    destinationName,
    destinationPath,
    webPath,
  });
}

if (problems.length) {
  console.error(
    JSON.stringify(
      problems.slice(0, 30),
      null,
      2
    )
  );

  throw new Error(
    "图片匹配检查未通过，共有问题：" +
      problems.length
  );
}

if (
  plans.length !== 144
) {
  throw new Error(
    "安全导入计划数量错误：" +
      plans.length +
      "/144"
  );
}

/* =========================================================
   所有144张均完成唯一型号预匹配后，
   才开始备份和写入。
   ========================================================= */

const stamp =
  new Date()
    .toISOString()
    .replace(/[-:TZ.]/g, "")
    .slice(0, 14);

const selectionBackup =
  `${selectionPath}.bak_barbed_images_${stamp}`;

const detailBackup =
  `${detailPath}.bak_barbed_images_${stamp}`;

fs.copyFileSync(
  selectionPath,
  selectionBackup
);

fs.copyFileSync(
  detailPath,
  detailBackup
);

let mapBackup = "";

if (fs.existsSync(mapPath)) {
  mapBackup =
    `${mapPath}.bak_${stamp}`;

  fs.copyFileSync(
    mapPath,
    mapBackup
  );
}

const imageBackupDirectory =
  path.join(
    root,
    "backups",
    "barbed-fitting-images",
    stamp
  );

fs.mkdirSync(
  targetDirectory,
  {
    recursive: true,
  }
);

let overwrittenImageCount = 0;

for (
  const plan
  of plans
) {
  if (
    fs.existsSync(
      plan.destinationPath
    )
  ) {
    fs.mkdirSync(
      imageBackupDirectory,
      {
        recursive: true,
      }
    );

    fs.copyFileSync(
      plan.destinationPath,
      path.join(
        imageBackupDirectory,
        plan.destinationName
      )
    );

    overwrittenImageCount += 1;
  }

  fs.copyFileSync(
    plan.sourcePath,
    plan.destinationPath
  );

  plan.selectionRecord.imageCard =
    plan.webPath;

  plan.detailRecord.mainImage =
    plan.webPath;
}

/* =========================================================
   写入选型数据
   ========================================================= */

const newSelectionArray =
  JSON.stringify(
    selectionProducts,
    null,
    2
  );

const newSelectionSource =
  selectionSource.slice(
    0,
    arrayRange.start
  ) +
  newSelectionArray +
  selectionSource.slice(
    arrayRange.end
  );

validateSelectionTsx(
  newSelectionSource
);

fs.writeFileSync(
  selectionPath,
  newSelectionSource,
  "utf8"
);

/* =========================================================
   写入详情数据
   ========================================================= */

fs.writeFileSync(
  detailPath,
  JSON.stringify(
    details,
    null,
    2
  ) + "\n",
  "utf8"
);

/* =========================================================
   写入可重复使用的图片映射
   ========================================================= */

const imageMap = {
  generatedAt:
    new Date().toISOString(),

  sourceDirectory,

  targetDirectory:
    "public/images/products/fittings/barbed-fittings/products",

  productTypeId:
    "barbed-fittings",

  totalSourceImages:
    sourceImages.length,

  matchedImages:
    plans.length,

  items:
    Object.fromEntries(
      plans.map(
        (plan) => [
          plan.canonicalModel,
          {
            productId:
              plan.productId,

            slug:
              plan.slug,

            sourceFile:
              plan.sourceFile,

            imageCard:
              plan.webPath,

            mainImage:
              plan.webPath,
          },
        ]
      )
    ),
};

fs.writeFileSync(
  mapPath,
  JSON.stringify(
    imageMap,
    null,
    2
  ) + "\n",
  "utf8"
);

/* =========================================================
   最终验证
   ========================================================= */

const copiedMissing =
  plans.filter(
    (plan) =>
      !fs.existsSync(
        plan.destinationPath
      ) ||
      fs.statSync(
        plan.destinationPath
      ).size === 0
  );

const selectionMismatch =
  plans.filter(
    (plan) =>
      plan.selectionRecord
        .imageCard !==
      plan.webPath
  );

const detailMismatch =
  plans.filter(
    (plan) =>
      plan.detailRecord
        .mainImage !==
      plan.webPath
  );

if (
  copiedMissing.length ||
  selectionMismatch.length ||
  detailMismatch.length
) {
  throw new Error(
    "写入后的图片或数据验证失败。"
  );
}

const remainingSelectionWithoutImportedImage =
  barbedSelection.filter(
    (item) =>
      !String(
        item?.imageCard ||
        ""
      ).startsWith(
        "/images/products/fittings/barbed-fittings/products/"
      )
  ).length;

const remainingDetailWithoutImportedImage =
  barbedDetails.filter(
    (item) =>
      !String(
        item?.mainImage ||
        ""
      ).startsWith(
        "/images/products/fittings/barbed-fittings/products/"
      )
  ).length;

const report = {
  generatedAt:
    new Date().toISOString(),

  sourceDirectory,

  targetDirectory,

  sourceImageCount:
    sourceImages.length,

  importedImageCount:
    plans.length,

  overwrittenImageCount,

  selectionProductCount:
    barbedSelection.length,

  detailProductCount:
    barbedDetails.length,

  updatedSelectionCount:
    plans.length,

  updatedDetailCount:
    plans.length,

  remainingSelectionWithoutProvidedImage:
    remainingSelectionWithoutImportedImage,

  remainingDetailWithoutProvidedImage:
    remainingDetailWithoutImportedImage,

  backups: {
    selectionBackup,
    detailBackup,
    mapBackup,
    imageBackupDirectory:
      overwrittenImageCount
        ? imageBackupDirectory
        : "",
  },

  examples:
    plans
      .slice(0, 10)
      .map(
        (plan) => ({
          model:
            plan.canonicalModel,

          productId:
            plan.productId,

          sourceFile:
            plan.sourceFile,

          webPath:
            plan.webPath,
        })
      ),
};

fs.mkdirSync(
  path.dirname(reportPath),
  {
    recursive: true,
  }
);

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
console.log(
  "============================================"
);
console.log(
  "倒刺接头产品图导入完成"
);
console.log(
  "============================================"
);
console.log(
  "源图片：",
  sourceImages.length
);
console.log(
  "复制图片：",
  plans.length
);
console.log(
  "更新选型卡片：",
  plans.length
);
console.log(
  "更新详情主图：",
  plans.length
);
console.log(
  "覆盖旧目标图片：",
  overwrittenImageCount
);
console.log(
  "未提供图片的选型型号：",
  remainingSelectionWithoutImportedImage
);
console.log(
  "未提供图片的详情型号：",
  remainingDetailWithoutImportedImage
);
console.log("");
console.log(
  "图片目录："
);
console.log(
  targetDirectory
);
console.log("");
console.log(
  "图片映射："
);
console.log(
  mapPath
);
console.log("");
console.log(
  "导入报告："
);
console.log(
  reportPath
);
console.log("");
console.log(
  "选型数据备份："
);
console.log(
  selectionBackup
);
console.log("");
console.log(
  "详情数据备份："
);
console.log(
  detailBackup
);
console.log("");
