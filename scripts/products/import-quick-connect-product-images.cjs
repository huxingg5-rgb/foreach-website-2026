const fs = require("fs");
const path = require("path");
const ts = require("typescript");

const root = process.cwd();

const sourceDirectory =
  String.raw`H:\01-官网项目\02_产品中心\fit\Quick connector\快插产品图片 _JPG`;

const selectionPath = path.join(
  root,
  "data",
  "products",
  "selection",
  "quick-connect-fitting-selection.generated.ts"
);

const detailPath = path.join(
  root,
  "data",
  "products",
  "generated",
  "fittings",
  "quick-connect-fittings",
  "detail",
  "index.json"
);

const targetDirectory = path.join(
  root,
  "public",
  "images",
  "products",
  "fittings",
  "quick-connect-fittings",
  "products"
);

const mapPath = path.join(
  root,
  "data",
  "products",
  "selection",
  "quick-connect-fitting-image-map.generated.json"
);

const reportPath = path.join(
  root,
  "reports",
  "quick-connect-image-import-report.json"
);

const supportedExtensions =
  new Set([
    ".jpg",
    ".jpeg",
    ".png",
    ".webp",
  ]);

function read(filePath) {
  if (!fs.existsSync(filePath)) {
    throw new Error(
      "未找到文件：" + filePath
    );
  }

  return fs.readFileSync(
    filePath,
    "utf8"
  );
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
    } else if (entry.isFile()) {
      result.push(fullPath);
    }
  }

  return result;
}

function localizedText(value) {
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
      value["zh-CN"] ||
      value.en ||
      Object.values(value).find(
        (item) =>
          typeof item === "string"
      ) ||
      ""
    );
  }

  return "";
}

function normalizeModel(value) {
  return String(value || "")
    .trim()
    .replace(
      /\.(jpg|jpeg|png|webp)$/i,
      ""
    )
    .replace(
      /(?:[-_](?:1|2))$/i,
      ""
    )
    .trim()
    .toUpperCase()
    .replace(/×/g, "X")
    .replace(/[‐-‒–—−]/g, "-")
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

function getSelectionModel(item) {
  return String(
    item?.model ||
    item?.foreachModel ||
    item?.modelCode ||
    item?.displayModel ||
    localizedText(
      item?.cardTitle
    ) ||
    ""
  ).trim();
}

function getDetailModel(item) {
  return String(
    item?.model ||
    item?.foreachModel ||
    item?.modelCode ||
    item?.displayModel ||
    item?.modelDisplay ||
    item?.slug ||
    ""
  ).trim();
}

function findExportArrays(source) {
  const results = [];

  const pattern =
    /export\s+const\s+([A-Za-z0-9_$]+)/g;

  let match;

  while (
    (
      match =
        pattern.exec(source)
    )
  ) {
    const exportName =
      match[1];

    const assignmentIndex =
      source.indexOf(
        "=",
        match.index
      );

    if (assignmentIndex < 0) {
      continue;
    }

    const arrayStart =
      source.indexOf(
        "[",
        assignmentIndex
      );

    if (arrayStart < 0) {
      continue;
    }

    let depth = 0;
    let quote = "";
    let escaped = false;
    let lineComment = false;
    let blockComment = false;
    let arrayEnd = -1;

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
      } else if (char === "]") {
        depth -= 1;

        if (depth === 0) {
          arrayEnd =
            index + 1;
          break;
        }
      }
    }

    if (arrayEnd < 0) {
      continue;
    }

    const arrayText =
      source.slice(
        arrayStart,
        arrayEnd
      );

    try {
      const value =
        JSON.parse(arrayText);

      if (Array.isArray(value)) {
        results.push({
          exportName,
          start:
            arrayStart,
          end:
            arrayEnd,
          value,
        });
      }
    } catch {
      // 非JSON数组跳过。
    }
  }

  return results;
}

function createModelIndex(
  records,
  getModel
) {
  const index =
    new Map();

  records.forEach(
    (record) => {
      const model =
        getModel(record);

      const key =
        normalizeModel(model);

      if (!key) {
        return;
      }

      if (!index.has(key)) {
        index.set(
          key,
          []
        );
      }

      index
        .get(key)
        .push(record);
    }
  );

  return index;
}

function validateTypescript(source) {
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

/* =========================================================
   1. 读取数据
   ========================================================= */

const selectionSource =
  read(selectionPath);

const exportArrays =
  findExportArrays(
    selectionSource
  );

const selectionExport =
  exportArrays.find(
    (item) =>
      item.value.some(
        (product) =>
          String(
            product?.productTypeId ||
            ""
          ).trim() ===
            "quick-connect-fittings"
      )
  );

if (!selectionExport) {
  throw new Error(
    "没有找到快插接头选型产品数组。"
  );
}

const selectionProducts =
  selectionExport.value;

const details =
  JSON.parse(
    read(detailPath)
  );

if (!Array.isArray(details)) {
  throw new Error(
    "快插详情数据不是数组。"
  );
}

const quickSelectionProducts =
  selectionProducts.filter(
    (item) =>
      String(
        item?.productTypeId ||
        ""
      ).trim() ===
        "quick-connect-fittings"
  );

const quickDetails =
  details.filter(
    (item) =>
      String(
        item?.productTypeId ||
        ""
      ).trim() ===
        "quick-connect-fittings"
  );

if (
  quickSelectionProducts.length !== 191
) {
  throw new Error(
    "快插选型数量与检查报告不一致：" +
      quickSelectionProducts.length +
      "/191"
  );
}

if (
  quickDetails.length !== 191
) {
  throw new Error(
    "快插详情数量与检查报告不一致：" +
      quickDetails.length +
      "/191"
  );
}

const selectionIndex =
  createModelIndex(
    quickSelectionProducts,
    getSelectionModel
  );

const detailIndex =
  createModelIndex(
    quickDetails,
    getDetailModel
  );

/* =========================================================
   2. 检查182张源图片
   ========================================================= */

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
  sourceImages.length !== 182
) {
  throw new Error(
    "快插产品图数量与报告不一致：" +
      sourceImages.length +
      "/182"
  );
}

const matchedPlans = [];
const unmatchedImages = [];
const ambiguousImages = [];
const targetNames =
  new Set();

for (
  const sourcePath
  of sourceImages
) {
  const sourceName =
    path.basename(sourcePath);

  const sourceModel =
    path.parse(sourcePath)
      .name
      .trim();

  const modelKey =
    normalizeModel(
      sourceModel
    );

  const selectionMatches =
    selectionIndex.get(
      modelKey
    ) || [];

  const detailMatches =
    detailIndex.get(
      modelKey
    ) || [];

  if (
    selectionMatches.length === 0 ||
    detailMatches.length === 0
  ) {
    unmatchedImages.push({
      sourceName,
      sourceModel,
      modelKey,
      selectionMatches:
        selectionMatches.length,
      detailMatches:
        detailMatches.length,
    });

    continue;
  }

  if (
    selectionMatches.length !== 1 ||
    detailMatches.length !== 1
  ) {
    ambiguousImages.push({
      sourceName,
      sourceModel,
      selectionModels:
        selectionMatches.map(
          getSelectionModel
        ),
      detailModels:
        detailMatches.map(
          getDetailModel
        ),
    });

    continue;
  }

  const selectionRecord =
    selectionMatches[0];

  const detailRecord =
    detailMatches[0];

  const canonicalModel =
    getDetailModel(
      detailRecord
    ) ||
    getSelectionModel(
      selectionRecord
    );

  const slug =
    modelToSlug(
      canonicalModel
    );

  let extension =
    path
      .extname(sourcePath)
      .toLowerCase();

  if (extension === ".jpeg") {
    extension = ".jpg";
  }

  const targetName =
    `${slug}-main${extension}`;

  const targetKey =
    targetName.toLowerCase();

  if (
    targetNames.has(
      targetKey
    )
  ) {
    ambiguousImages.push({
      sourceName,
      reason:
        "生成的目标文件名重复",
      targetName,
    });

    continue;
  }

  targetNames.add(
    targetKey
  );

  const targetPath =
    path.join(
      targetDirectory,
      targetName
    );

  const webPath =
    `/images/products/fittings/quick-connect-fittings/products/${targetName}`;

  matchedPlans.push({
    sourcePath,
    sourceName,
    sourceModel,
    canonicalModel,
    productId:
      String(
        detailRecord?.productId ||
        selectionRecord?.productId ||
        ""
      ).trim(),
    seriesId:
      String(
        detailRecord?.seriesId ||
        selectionRecord?.seriesId ||
        ""
      ).trim(),
    slug:
      String(
        detailRecord?.slug ||
        slug
      ).trim(),
    selectionRecord,
    detailRecord,
    targetName,
    targetPath,
    webPath,
  });
}

if (ambiguousImages.length) {
  console.error(
    JSON.stringify(
      ambiguousImages,
      null,
      2
    )
  );

  throw new Error(
    "存在多匹配图片，本次未写入。"
  );
}

if (
  matchedPlans.length !== 177 ||
  unmatchedImages.length !== 5
) {
  console.error(
    JSON.stringify(
      {
        matched:
          matchedPlans.length,
        unmatchedImages,
      },
      null,
      2
    )
  );

  throw new Error(
    "图片匹配结果与检查报告不一致。"
  );
}

/* =========================================================
   3. 所有匹配验证完成后再备份
   ========================================================= */

const stamp =
  new Date()
    .toISOString()
    .replace(/[-:TZ.]/g, "")
    .slice(0, 14);

const selectionBackup =
  `${selectionPath}.bak_quick_images_${stamp}`;

const detailBackup =
  `${detailPath}.bak_quick_images_${stamp}`;

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
    "quick-connect-images",
    stamp
  );

fs.mkdirSync(
  targetDirectory,
  {
    recursive: true,
  }
);

/* =========================================================
   4. 复制177张图片并更新数据
   ========================================================= */

let overwrittenImages = 0;

for (
  const plan
  of matchedPlans
) {
  if (
    fs.existsSync(
      plan.targetPath
    )
  ) {
    fs.mkdirSync(
      imageBackupDirectory,
      {
        recursive: true,
      }
    );

    fs.copyFileSync(
      plan.targetPath,
      path.join(
        imageBackupDirectory,
        plan.targetName
      )
    );

    overwrittenImages += 1;
  }

  fs.copyFileSync(
    plan.sourcePath,
    plan.targetPath
  );

  plan.selectionRecord.imageCard =
    plan.webPath;

  plan.detailRecord.mainImage =
    plan.webPath;
}

/* =========================================================
   5. 写回选型数据
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
    selectionExport.start
  ) +
  newSelectionArray +
  selectionSource.slice(
    selectionExport.end
  );

validateTypescript(
  newSelectionSource
);

fs.writeFileSync(
  selectionPath,
  newSelectionSource,
  "utf8"
);

/* =========================================================
   6. 写回详情数据
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
   7. 保存图片映射
   ========================================================= */

const imageMap = {
  generatedAt:
    new Date().toISOString(),

  sourceDirectory,

  targetDirectory:
    "public/images/products/fittings/quick-connect-fittings/products",

  productTypeId:
    "quick-connect-fittings",

  sourceImageCount:
    sourceImages.length,

  importedImageCount:
    matchedPlans.length,

  unmatchedImageCount:
    unmatchedImages.length,

  unmatchedImages,

  items:
    Object.fromEntries(
      matchedPlans.map(
        (plan) => [
          plan.canonicalModel,
          {
            productId:
              plan.productId,

            seriesId:
              plan.seriesId,

            slug:
              plan.slug,

            sourceFile:
              plan.sourceName,

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
   8. 最终验证
   ========================================================= */

const missingCopiedFiles =
  matchedPlans.filter(
    (plan) =>
      !fs.existsSync(
        plan.targetPath
      ) ||
      fs.statSync(
        plan.targetPath
      ).size === 0
  );

const incorrectSelectionPaths =
  matchedPlans.filter(
    (plan) =>
      plan.selectionRecord
        .imageCard !==
      plan.webPath
  );

const incorrectDetailPaths =
  matchedPlans.filter(
    (plan) =>
      plan.detailRecord
        .mainImage !==
      plan.webPath
  );

if (
  missingCopiedFiles.length ||
  incorrectSelectionPaths.length ||
  incorrectDetailPaths.length
) {
  throw new Error(
    "图片复制或数据写入验证失败。"
  );
}

const report = {
  generatedAt:
    new Date().toISOString(),

  sourceDirectory,

  sourceImageCount:
    sourceImages.length,

  importedImageCount:
    matchedPlans.length,

  unmatchedImageCount:
    unmatchedImages.length,

  overwrittenImages,

  updatedSelectionCount:
    matchedPlans.length,

  updatedDetailCount:
    matchedPlans.length,

  unmatchedImages,

  backups: {
    selectionBackup,
    detailBackup,
    mapBackup,
    imageBackupDirectory:
      overwrittenImages
        ? imageBackupDirectory
        : "",
  },

  examples:
    matchedPlans
      .slice(0, 12)
      .map(
        (plan) => ({
          model:
            plan.canonicalModel,

          productId:
            plan.productId,

          seriesId:
            plan.seriesId,

          sourceFile:
            plan.sourceName,

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
  "快插接头产品图导入完成"
);
console.log(
  "============================================"
);
console.log(
  "源图片：",
  sourceImages.length
);
console.log(
  "成功匹配并复制：",
  matchedPlans.length
);
console.log(
  "更新选型卡片：",
  matchedPlans.length
);
console.log(
  "更新详情主图：",
  matchedPlans.length
);
console.log(
  "未匹配图片：",
  unmatchedImages.length
);
console.log(
  "覆盖已有目标图片：",
  overwrittenImages
);
console.log("");
console.log(
  "未匹配的5张图片："
);

for (
  const item
  of unmatchedImages
) {
  console.log(
    "-",
    item.sourceName
  );
}

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
  "本步骤没有复制或绑定二维PDF。"
);
console.log("");

