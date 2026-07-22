const fs = require("fs");
const path = require("path");

const root = process.cwd();

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

const imageDirectory =
  String.raw`H:\01-官网项目\02_产品中心\fit\Quick connector\快插产品图片 _JPG`;

const reportPath = path.join(
  root,
  "reports",
  "quick-connect-selection-detail-difference.md"
);

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
      ""
    );
  }

  return "";
}

function modelOf(item) {
  return String(
    item?.model ||
    item?.foreachModel ||
    item?.modelCode ||
    item?.displayModel ||
    item?.modelDisplay ||
    localizedText(
      item?.cardTitle
    ) ||
    item?.slug ||
    ""
  ).trim();
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
    .toUpperCase()
    .replace(/×/g, "X")
    .replace(/[‐-‒–—−]/g, "-")
    .replace(/[^A-Z0-9]/g, "");
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

    try {
      const value =
        JSON.parse(
          source.slice(
            arrayStart,
            arrayEnd
          )
        );

      if (Array.isArray(value)) {
        results.push({
          exportName,
          value,
        });
      }
    } catch {
      // 非纯JSON数组跳过。
    }
  }

  return results;
}

const selectionSource =
  read(selectionPath);

const selectionArrays =
  findExportArrays(
    selectionSource
  );

const selectionProducts =
  selectionArrays
    .flatMap(
      (item) =>
        item.value
    )
    .filter(
      (item) =>
        String(
          item?.productTypeId ||
          ""
        ).trim() ===
          "quick-connect-fittings"
    );

const detailProducts =
  JSON.parse(
    read(detailPath)
  ).filter(
    (item) =>
      String(
        item?.productTypeId ||
        ""
      ).trim() ===
        "quick-connect-fittings"
  );

const selectionMap =
  new Map();

for (
  const item
  of selectionProducts
) {
  const key =
    normalizeModel(
      modelOf(item)
    );

  if (!selectionMap.has(key)) {
    selectionMap.set(
      key,
      []
    );
  }

  selectionMap
    .get(key)
    .push(item);
}

const detailMap =
  new Map();

for (
  const item
  of detailProducts
) {
  const key =
    normalizeModel(
      modelOf(item)
    );

  if (!detailMap.has(key)) {
    detailMap.set(
      key,
      []
    );
  }

  detailMap
    .get(key)
    .push(item);
}

const imageFiles =
  walk(imageDirectory)
    .filter(
      (filePath) =>
        /\.(jpg|jpeg|png|webp)$/i.test(
          filePath
        )
    );

const imageKeys =
  new Set(
    imageFiles.map(
      (filePath) =>
        normalizeModel(
          path.parse(filePath).name
        )
    )
  );

const missingInSelection =
  detailProducts.filter(
    (item) =>
      !selectionMap.has(
        normalizeModel(
          modelOf(item)
        )
      )
  );

const missingInDetail =
  selectionProducts.filter(
    (item) =>
      !detailMap.has(
        normalizeModel(
          modelOf(item)
        )
      )
  );

const duplicateSelection =
  [...selectionMap.entries()]
    .filter(
      ([, values]) =>
        values.length > 1
    );

const duplicateDetails =
  [...detailMap.entries()]
    .filter(
      ([, values]) =>
        values.length > 1
    );

const report = [];

report.push(
  "# 快插选型与详情数量差异检查"
);
report.push("");

report.push(
  `生成时间：${new Date().toLocaleString("zh-CN")}`
);
report.push("");

report.push(
  "> 本次只检查，没有修改任何文件。"
);
report.push("");

report.push(
  "## 1. 数量"
);
report.push("");

report.push(
  `- 选型记录：${selectionProducts.length}`
);
report.push(
  `- 详情记录：${detailProducts.length}`
);
report.push(
  `- 选型中缺少的详情型号：${missingInSelection.length}`
);
report.push(
  `- 详情中缺少的选型型号：${missingInDetail.length}`
);
report.push(
  `- 选型重复型号：${duplicateSelection.length}`
);
report.push(
  `- 详情重复型号：${duplicateDetails.length}`
);
report.push("");

report.push(
  "## 2. 详情有、选型没有"
);
report.push("");

if (!missingInSelection.length) {
  report.push("无。");
} else {
  report.push(
    "| 型号 | 商品编码 | 系列 | slug | 源目录有图片 |"
  );
  report.push(
    "|---|---|---|---|---|"
  );

  for (
    const item
    of missingInSelection
  ) {
    const model =
      modelOf(item);

    report.push(
      `| ${model} | ${item.productId || ""} | ${item.seriesId || ""} | ${item.slug || ""} | ${imageKeys.has(normalizeModel(model)) ? "有" : "无"} |`
    );
  }
}

report.push("");

report.push(
  "## 3. 选型有、详情没有"
);
report.push("");

if (!missingInDetail.length) {
  report.push("无。");
} else {
  report.push(
    "| 型号 | 商品编码 | 系列 | 源目录有图片 |"
  );
  report.push(
    "|---|---|---|---|"
  );

  for (
    const item
    of missingInDetail
  ) {
    const model =
      modelOf(item);

    report.push(
      `| ${model} | ${item.productId || ""} | ${item.seriesId || ""} | ${imageKeys.has(normalizeModel(model)) ? "有" : "无"} |`
    );
  }
}

report.push("");

report.push(
  "## 4. 导出数组统计"
);
report.push("");

report.push(
  "| 导出名称 | 数组总数 | 快插记录数 |"
);
report.push(
  "|---|---:|---:|"
);

for (
  const item
  of selectionArrays
) {
  report.push(
    `| ${item.exportName} | ${item.value.length} | ${item.value.filter((product) => String(product?.productTypeId || "").trim() === "quick-connect-fittings").length} |`
  );
}

report.push("");

report.push(
  "## 5. 重复型号"
);
report.push("");

report.push(
  `- 选型重复：${duplicateSelection.map(([key]) => key).join("、") || "无"}`
);
report.push(
  `- 详情重复：${duplicateDetails.map(([key]) => key).join("、") || "无"}`
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
  "快插选型与详情差异检查完成"
);
console.log(
  "============================================"
);
console.log(
  "选型记录：",
  selectionProducts.length
);
console.log(
  "详情记录：",
  detailProducts.length
);
console.log(
  "详情有、选型没有：",
  missingInSelection.length
);
console.log(
  "选型有、详情没有：",
  missingInDetail.length
);
console.log("");
console.log(
  "详情有、选型没有的型号："
);

for (
  const item
  of missingInSelection
) {
  console.log(
    "-",
    modelOf(item),
    "|",
    item.productId || "",
    "| 图片：",
    imageKeys.has(
      normalizeModel(
        modelOf(item)
      )
    )
      ? "有"
      : "无"
  );
}

console.log("");
console.log(
  "报告："
);
console.log(
  reportPath
);
console.log("");
console.log(
  "本次没有修改任何文件。"
);
