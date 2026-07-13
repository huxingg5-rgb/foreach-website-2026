const fs = require("fs");
const path = require("path");
const vm = require("vm");

const root = process.cwd();

const selectionDirectory = path.join(
  root,
  "data",
  "products",
  "selection"
);

const generatedDirectory = path.join(
  root,
  "data",
  "products",
  "generated",
  "fittings"
);

const routeMapPath = path.join(
  selectionDirectory,
  "product-route-map.ts"
);

const selectionClientPath = path.join(
  root,
  "components",
  "products",
  "selection",
  "ProductSelectionClient.tsx"
);

const dynamicRoutePath = path.join(
  root,
  "app",
  "products",
  "[category]",
  "[slug]",
  "[seriesSlug]",
  "page.tsx"
);

const publicDirectory = path.join(
  root,
  "public"
);

const reportPath = path.join(
  root,
  "reports",
  "filter-check-valve-current-state-audit.md"
);

const targetTypes = new Set([
  "filters",
  "check-valves",
]);

function read(filePath) {
  if (!fs.existsSync(filePath)) {
    return "";
  }

  return fs.readFileSync(
    filePath,
    "utf8"
  );
}

function relative(filePath) {
  return path
    .relative(root, filePath)
    .replace(/\\/g, "/");
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
    const fullPath = path.join(
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

function modelOf(record) {
  return String(
    record?.model ||
    record?.foreachModel ||
    record?.modelCode ||
    record?.displayModel ||
    record?.modelDisplay ||
    localizedText(
      record?.cardTitle
    ) ||
    ""
  ).trim();
}

function productIdOf(record) {
  return String(
    record?.productId ||
    record?.productCode ||
    record?.code ||
    record?.sku ||
    ""
  ).trim();
}

function slugOf(record) {
  return String(
    record?.slug ||
    record?.detailSlug ||
    ""
  ).trim();
}

function imageOf(record) {
  return String(
    record?.mainImage ||
    record?.imageCard ||
    record?.image ||
    ""
  ).trim();
}

function normalizeKey(value) {
  return String(value || "")
    .trim()
    .toUpperCase()
    .replace(/×/g, "X")
    .replace(/[‐-‒–—−]/g, "-")
    .replace(/[^A-Z0-9]/g, "");
}

function extractExportArrays(source) {
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

    const equalIndex =
      source.indexOf(
        "=",
        match.index
      );

    if (equalIndex < 0) {
      continue;
    }

    const arrayStart =
      source.indexOf(
        "[",
        equalIndex
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
        vm.runInNewContext(
          `(${arrayText})`,
          {},
          {
            timeout: 3000,
          }
        );

      if (Array.isArray(value)) {
        results.push({
          exportName,
          value,
        });
      }
    } catch {
      // 不是纯数据数组则跳过。
    }
  }

  return results;
}

function createSummary(
  records
) {
  const modelCounts =
    new Map();

  for (
    const item
    of records
  ) {
    const key =
      normalizeKey(
        modelOf(item.record)
      );

    if (!key) {
      continue;
    }

    modelCounts.set(
      key,
      (modelCounts.get(key) || 0) + 1
    );
  }

  return {
    count:
      records.length,

    emptyModel:
      records.filter(
        (item) =>
          !modelOf(item.record)
      ).length,

    emptyProductId:
      records.filter(
        (item) =>
          !productIdOf(item.record)
      ).length,

    emptySlug:
      records.filter(
        (item) =>
          !slugOf(item.record)
      ).length,

    withImage:
      records.filter(
        (item) =>
          imageOf(item.record)
      ).length,

    duplicateModels:
      [...modelCounts.entries()]
        .filter(
          ([, count]) =>
            count > 1
        )
        .map(
          ([model, count]) => ({
            model,
            count,
          })
        ),
  };
}

function imageExists(
  webPath
) {
  if (
    !webPath ||
    !webPath.startsWith("/")
  ) {
    return false;
  }

  return fs.existsSync(
    path.join(
      publicDirectory,
      webPath.slice(1)
    )
  );
}

function markdownEscape(value) {
  return String(value ?? "")
    .replace(/\|/g, "\\|")
    .replace(/\r?\n/g, "<br>");
}

/* =========================================================
   1. 查选型数据
   ========================================================= */

const selectionRecords = [];

for (
  const filePath
  of walk(selectionDirectory)
    .filter(
      (item) =>
        item.endsWith(".ts")
    )
) {
  const source =
    read(filePath);

  for (
    const exported
    of extractExportArrays(source)
  ) {
    for (
      const record
      of exported.value
    ) {
      if (
        !record ||
        typeof record !== "object"
      ) {
        continue;
      }

      const productTypeId =
        String(
          record.productTypeId ||
          ""
        ).trim();

      if (
        !targetTypes.has(
          productTypeId
        )
      ) {
        continue;
      }

      selectionRecords.push({
        sourceType:
          "selection",

        productTypeId,
        filePath,
        exportName:
          exported.exportName,
        record,
      });
    }
  }
}

/* =========================================================
   2. 查详情数据
   ========================================================= */

const detailRecords = [];

for (
  const filePath
  of walk(generatedDirectory)
    .filter(
      (item) =>
        item.endsWith(
          `${path.sep}detail${path.sep}index.json`
        )
    )
) {
  let values;

  try {
    values =
      JSON.parse(
        read(filePath)
      );
  } catch {
    continue;
  }

  if (!Array.isArray(values)) {
    continue;
  }

  for (
    const record
    of values
  ) {
    const productTypeId =
      String(
        record?.productTypeId ||
        ""
      ).trim();

    if (
      !targetTypes.has(
        productTypeId
      )
    ) {
      continue;
    }

    detailRecords.push({
      sourceType:
        "detail",

      productTypeId,
      filePath,
      exportName:
        "",
      record,
    });
  }
}

/* =========================================================
   3. 按类型统计
   ========================================================= */

const allRecords = [
  ...selectionRecords,
  ...detailRecords,
];

const typeStats = {};

for (
  const productTypeId
  of targetTypes
) {
  const selection =
    selectionRecords.filter(
      (item) =>
        item.productTypeId ===
        productTypeId
    );

  const details =
    detailRecords.filter(
      (item) =>
        item.productTypeId ===
        productTypeId
    );

  typeStats[productTypeId] = {
    selection:
      createSummary(selection),

    detail:
      createSummary(details),
  };
}

/* =========================================================
   4. 查资源、路由和合并入口
   ========================================================= */

const routeMapSource =
  read(routeMapPath);

const selectionClientSource =
  read(selectionClientPath);

const dynamicRouteSource =
  read(dynamicRoutePath);

const routeChecks = {
  mergedLabel:
    routeMapSource.includes(
      "过滤器与单向阀"
    ),

  filtersRouteEntry:
    routeMapSource.includes(
      '"filters"'
    ),

  standaloneCheckValveRouteEntry:
    routeMapSource.includes(
      '"check-valves": {'
    ),

  standalonePlugRouteEntry:
    routeMapSource.includes(
      '"plugs": {'
    ),

  clientMergedHelper:
    selectionClientSource.includes(
      "FITTING_FILTER_CHECK_VALVE_MERGE_HELPER"
    ),

  clientMatchesFilters:
    selectionClientSource.includes(
      '"filters"'
    ),

  clientMatchesCheckValves:
    selectionClientSource.includes(
      '"check-valves"'
    ),

  dynamicRouteMentionsFilters:
    dynamicRouteSource.includes(
      '"filters"'
    ),

  dynamicRouteMentionsCheckValves:
    dynamicRouteSource.includes(
      '"check-valves"'
    ),
};

const involvedFiles =
  [...new Set(
    allRecords.map(
      (item) =>
        relative(
          item.filePath
        )
    )
  )];

const imageRecords =
  allRecords.filter(
    (item) =>
      imageOf(item.record)
  );

const existingImages =
  imageRecords.filter(
    (item) =>
      imageExists(
        imageOf(item.record)
      )
  );

const missingImages =
  imageRecords.filter(
    (item) =>
      !imageExists(
        imageOf(item.record)
      )
  );

/* =========================================================
   5. 输出报告
   ========================================================= */

const report = [];

report.push(
  "# 过滤器与单向阀当前状态检查"
);
report.push("");

report.push(
  `生成时间：${new Date().toLocaleString("zh-CN")}`
);
report.push("");

report.push(
  "> 本次只检查，没有修改任何项目文件。"
);
report.push("");

report.push(
  "## 1. 总体数量"
);
report.push("");

report.push(
  `- 过滤器选型记录：${typeStats.filters.selection.count}`
);
report.push(
  `- 过滤器详情记录：${typeStats.filters.detail.count}`
);
report.push(
  `- 单向阀选型记录：${typeStats["check-valves"].selection.count}`
);
report.push(
  `- 单向阀详情记录：${typeStats["check-valves"].detail.count}`
);
report.push("");

report.push(
  "## 2. 数据完整度"
);
report.push("");

report.push(
  "| 类型 | 数据位置 | 数量 | 空型号 | 空商品编码 | 空slug | 有图片路径 | 重复型号 |"
);
report.push(
  "|---|---|---:|---:|---:|---:|---:|---:|"
);

for (
  const productTypeId
  of targetTypes
) {
  for (
    const sourceType
    of [
      "selection",
      "detail",
    ]
  ) {
    const item =
      typeStats[
        productTypeId
      ][sourceType];

    report.push(
      `| ${productTypeId} | ${sourceType} | ${item.count} | ${item.emptyModel} | ${item.emptyProductId} | ${item.emptySlug} | ${item.withImage} | ${item.duplicateModels.length} |`
    );
  }
}

report.push("");

report.push(
  "## 3. 涉及的数据文件"
);
report.push("");

if (!involvedFiles.length) {
  report.push(
    "未找到过滤器或单向阀选型、详情数据。"
  );
} else {
  for (
    const filePath
    of involvedFiles
  ) {
    report.push(
      `- \`${filePath}\``
    );
  }
}

report.push("");

report.push(
  "## 4. 图片路径检查"
);
report.push("");

report.push(
  `- 有图片引用的记录：${imageRecords.length}`
);
report.push(
  `- 图片文件真实存在：${existingImages.length}`
);
report.push(
  `- 图片路径存在但文件缺失：${missingImages.length}`
);
report.push("");

if (missingImages.length) {
  report.push(
    "| 类型 | 型号 | 当前图片路径 | 数据文件 |"
  );
  report.push(
    "|---|---|---|---|"
  );

  for (
    const item
    of missingImages.slice(
      0,
      100
    )
  ) {
    report.push(
      `| ${item.productTypeId} | ${markdownEscape(modelOf(item.record))} | ${markdownEscape(imageOf(item.record))} | ${relative(item.filePath)} |`
    );
  }

  report.push("");
}

report.push(
  "## 5. 路由与合并入口"
);
report.push("");

report.push("```json");
report.push(
  JSON.stringify(
    routeChecks,
    null,
    2
  )
);
report.push("```");
report.push("");

report.push(
  "## 6. 产品样本"
);
report.push("");

report.push(
  "| 类型 | 数据位置 | 型号 | 商品编码 | slug | 图片 |"
);
report.push(
  "|---|---|---|---|---|---|"
);

for (
  const item
  of allRecords.slice(
    0,
    40
  )
) {
  report.push(
    `| ${item.productTypeId} | ${item.sourceType} | ${markdownEscape(modelOf(item.record))} | ${markdownEscape(productIdOf(item.record))} | ${markdownEscape(slugOf(item.record))} | ${markdownEscape(imageOf(item.record))} |`
  );
}

report.push("");

report.push(
  "## 7. 重复型号"
);
report.push("");

for (
  const productTypeId
  of targetTypes
) {
  report.push(
    `### ${productTypeId}`
  );
  report.push("");

  const duplicates = [
    ...typeStats[
      productTypeId
    ].selection
      .duplicateModels,

    ...typeStats[
      productTypeId
    ].detail
      .duplicateModels,
  ];

  if (!duplicates.length) {
    report.push("无。");
  } else {
    for (
      const item
      of duplicates
    ) {
      report.push(
        `- ${item.model}：${item.count}条`
      );
    }
  }

  report.push("");
}

report.push(
  "## 8. 下一步判定"
);
report.push("");

report.push(
  "根据报告决定后续路径："
);
report.push("");

report.push(
  "1. 已有完整选型和详情数据：直接检查图片、文案和页面。"
);
report.push(
  "2. 只有选型数据：先生成详情JSON和静态路由。"
);
report.push(
  "3. 没有数据：从权威Excel重新生成选型与详情。"
);
report.push(
  "4. 有图片路径但文件缺失：先导入产品图。"
);
report.push(
  "5. 过滤器与单向阀继续使用两个内部productTypeId，仅在页面入口合并。"
);
report.push("");

fs.mkdirSync(
  path.dirname(reportPath),
  {
    recursive: true,
  }
);

fs.writeFileSync(
  reportPath,
  report.join("\n") + "\n",
  "utf8"
);

console.log("");
console.log(
  "============================================"
);
console.log(
  "过滤器与单向阀当前状态检查完成"
);
console.log(
  "============================================"
);
console.log(
  "过滤器选型：",
  typeStats.filters.selection.count
);
console.log(
  "过滤器详情：",
  typeStats.filters.detail.count
);
console.log(
  "单向阀选型：",
  typeStats["check-valves"].selection.count
);
console.log(
  "单向阀详情：",
  typeStats["check-valves"].detail.count
);
console.log(
  "有效图片文件：",
  existingImages.length
);
console.log(
  "缺失图片文件：",
  missingImages.length
);
console.log("");
console.log(
  "报告："
);
console.log(
  reportPath
);
console.log("");
console.log(
  "本次没有修改任何项目文件。"
);
