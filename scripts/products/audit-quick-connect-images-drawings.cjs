const fs = require("fs");
const path = require("path");
const vm = require("vm");

const root = process.cwd();

const imageSourceDirectory =
  String.raw`H:\01-官网项目\02_产品中心\fit\Quick connector\快插产品图片 _JPG`;

const drawingSourceDirectory =
  String.raw`H:\01-官网项目\02_产品中心\fit\Quick connector\快插2D图纸_PDF`;

const selectionDirectory = path.join(
  root,
  "data",
  "products",
  "selection"
);

const generatedFittingsDirectory = path.join(
  root,
  "data",
  "products",
  "generated",
  "fittings"
);

const clientPath = path.join(
  root,
  "components",
  "products",
  "selection",
  "ProductSelectionClient.tsx"
);

const publicDirectory = path.join(
  root,
  "public"
);

const reportPath = path.join(
  root,
  "reports",
  "quick-connect-image-drawing-audit.md"
);

let sharp = null;

try {
  sharp = require("sharp");
} catch {
  sharp = null;
}

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

function normalizeKey(value) {
  return String(value || "")
    .trim()
    .toUpperCase()
    .replace(/\.(JPG|JPEG|PNG|WEBP|PDF)$/i, "")
    .replace(
      /(?:[-_\s]+(?:MAIN|IMAGE|DRAWING|2D|产品图|主图|二维图|图纸))$/i,
      ""
    )
    .replace(/×/g, "X")
    .replace(/[‐-‒–—−]/g, "-")
    .replace(/[^A-Z0-9]/g, "");
}

function fileBaseKey(filePath) {
  return normalizeKey(
    path.parse(filePath).name
  );
}

function extractTokens(value) {
  const source =
    localizedText(value);

  return source
    .match(
      /[A-Za-z0-9]+(?:[-_][A-Za-z0-9]+){1,}/g
    ) || [];
}

function extractExportArrays(source) {
  const result = [];

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

    const arraySource =
      source.slice(
        arrayStart,
        arrayEnd
      );

    try {
      const value =
        vm.runInNewContext(
          `(${arraySource})`,
          {},
          {
            timeout: 3000,
          }
        );

      if (Array.isArray(value)) {
        result.push({
          exportName,
          value,
        });
      }
    } catch {
      // 非纯数据数组时跳过。
    }
  }

  return result;
}

function isQuickConnectRecord(
  record,
  filePath
) {
  const text = [
    filePath,
    record?.productTypeId,
    record?.sourceType,
    record?.seriesId,
    record?.seriesCode,
    record?.seriesName,
    record?.model,
    record?.slug,
    localizedText(
      record?.cardTitle
    ),
    localizedText(
      record?.cardSubtitle
    ),
    localizedText(
      record?.searchKeywords
    ),
  ]
    .filter(Boolean)
    .join(" ");

  return /quick-connect|quick connector|快插接头|快插|Q20|Q40|Q60/i.test(
    text
  );
}

function buildRecord(
  record,
  filePath,
  sourceType
) {
  const model =
    String(
      record?.model ||
      record?.displayModel ||
      record?.foreachModel ||
      record?.modelDisplay ||
      localizedText(
        record?.cardTitle
      ) ||
      ""
    ).trim();

  const productId =
    String(
      record?.productId ||
      record?.productCode ||
      record?.code ||
      record?.sku ||
      ""
    ).trim();

  const slug =
    String(
      record?.slug ||
      record?.detailSlug ||
      ""
    ).trim();

  const candidates = [
    model,
    productId,
    slug,
    record?.displayModel,
    record?.foreachModel,
    record?.modelDisplay,
    localizedText(
      record?.cardTitle
    ),
    ...extractTokens(
      record?.searchKeywords
    ),
  ]
    .map(normalizeKey)
    .filter(Boolean);

  const identity =
    normalizeKey(
      model ||
      productId ||
      slug
    );

  return {
    sourceType,
    filePath,
    model,
    productId,
    slug,
    identity,
    candidates:
      [...new Set(candidates)],

    productTypeId:
      String(
        record?.productTypeId ||
        ""
      ).trim(),

    seriesId:
      String(
        record?.seriesId ||
        record?.seriesCode ||
        ""
      ).trim(),

    imageRef:
      String(
        record?.imageCard ||
        record?.mainImage ||
        record?.image ||
        ""
      ).trim(),

    drawingRef:
      String(
        record?.drawingPdfUrl ||
        record?.drawingUrl ||
        record?.drawingPdf ||
        record?.pdfUrl ||
        ""
      ).trim(),

    detailHref:
      String(
        record?.detailHref ||
        record?.href ||
        ""
      ).trim(),

    record,
  };
}

function collapseMatches(matches) {
  const groups =
    new Map();

  for (
    const match
    of matches
  ) {
    const identity =
      match.record.identity ||
      `${match.record.model}|${match.record.productId}|${match.record.slug}`;

    if (!groups.has(identity)) {
      groups.set(
        identity,
        {
          identity,
          model:
            match.record.model,
          productId:
            match.record.productId,
          slug:
            match.record.slug,
          seriesId:
            match.record.seriesId,
          productTypeId:
            match.record.productTypeId,
          score:
            match.score,
          records: [],
        }
      );
    }

    groups
      .get(identity)
      .records
      .push(match.record);
  }

  return Array.from(
    groups.values()
  );
}

function matchFile(
  filePath,
  records
) {
  const key =
    fileBaseKey(filePath);

  const matches = [];

  for (
    const record
    of records
  ) {
    let score = 0;

    if (
      record.candidates.includes(
        key
      )
    ) {
      score = 100;
    } else {
      const partial =
        record.candidates.some(
          (candidate) =>
            key.length >= 5 &&
            candidate.length >= 5 &&
            (
              key.includes(candidate) ||
              candidate.includes(key)
            )
        );

      if (partial) {
        score = 70;
      }
    }

    if (score) {
      matches.push({
        score,
        record,
      });
    }
  }

  const bestScore =
    matches.length
      ? Math.max(
          ...matches.map(
            (item) =>
              item.score
          )
        )
      : 0;

  const bestMatches =
    matches.filter(
      (item) =>
        item.score ===
        bestScore
    );

  return {
    filePath,
    fileName:
      path.basename(filePath),
    key,
    bestScore,
    products:
      collapseMatches(
        bestMatches
      ),
  };
}

async function imageMetadata(
  filePath
) {
  const stat =
    fs.statSync(filePath);

  if (!sharp) {
    return {
      width: "",
      height: "",
      sizeBytes:
        stat.size,
    };
  }

  try {
    const metadata =
      await sharp(filePath)
        .metadata();

    return {
      width:
        metadata.width || "",
      height:
        metadata.height || "",
      sizeBytes:
        stat.size,
    };
  } catch {
    return {
      width: "",
      height: "",
      sizeBytes:
        stat.size,
    };
  }
}

function markdownEscape(value) {
  return String(value ?? "")
    .replace(/\|/g, "\\|")
    .replace(/\r?\n/g, "<br>");
}

function getContext(
  source,
  keyword,
  before = 8,
  after = 24
) {
  const index =
    source.indexOf(keyword);

  if (index < 0) {
    return "";
  }

  const lines =
    source.split(/\r?\n/);

  const lineNumber =
    source
      .slice(0, index)
      .split(/\r?\n/)
      .length;

  const start =
    Math.max(
      0,
      lineNumber -
        before -
        1
    );

  const end =
    Math.min(
      lines.length,
      lineNumber +
        after
    );

  return lines
    .slice(
      start,
      end
    )
    .map(
      (line, offset) =>
        `${String(
          start +
          offset +
          1
        ).padStart(5, " ")} | ${line}`
    )
    .join("\n");
}

async function main() {
  if (
    !fs.existsSync(
      imageSourceDirectory
    )
  ) {
    throw new Error(
      "未找到快插产品图片目录：" +
      imageSourceDirectory
    );
  }

  if (
    !fs.existsSync(
      drawingSourceDirectory
    )
  ) {
    throw new Error(
      "未找到快插二维图目录：" +
      drawingSourceDirectory
    );
  }

  const imageFiles =
    walk(imageSourceDirectory)
      .filter(
        (filePath) =>
          /\.(jpg|jpeg|png|webp)$/i.test(
            filePath
          )
      )
      .sort();

  const drawingFiles =
    walk(drawingSourceDirectory)
      .filter(
        (filePath) =>
          /\.pdf$/i.test(
            filePath
          )
      )
      .sort();

  const records = [];

  const selectionFiles =
    walk(selectionDirectory)
      .filter(
        (filePath) =>
          filePath.endsWith(".ts")
      );

  for (
    const filePath
    of selectionFiles
  ) {
    const source =
      read(filePath);

    for (
      const exported
      of extractExportArrays(
        source
      )
    ) {
      for (
        const record
        of exported.value
      ) {
        if (
          record &&
          typeof record === "object" &&
          isQuickConnectRecord(
            record,
            filePath
          )
        ) {
          records.push(
            buildRecord(
              record,
              filePath,
              "selection"
            )
          );
        }
      }
    }
  }

  const detailJsonFiles =
    walk(
      generatedFittingsDirectory
    )
      .filter(
        (filePath) =>
          filePath.endsWith(
            `${path.sep}detail${path.sep}index.json`
          )
      );

  for (
    const filePath
    of detailJsonFiles
  ) {
    let items;

    try {
      items =
        JSON.parse(
          read(filePath)
        );
    } catch {
      continue;
    }

    if (!Array.isArray(items)) {
      continue;
    }

    for (
      const record
      of items
    ) {
      if (
        isQuickConnectRecord(
          record,
          filePath
        )
      ) {
        records.push(
          buildRecord(
            record,
            filePath,
            "detail"
          )
        );
      }
    }
  }

  const imageMatches = [];

  for (
    const filePath
    of imageFiles
  ) {
    imageMatches.push({
      ...matchFile(
        filePath,
        records
      ),
      metadata:
        await imageMetadata(
          filePath
        ),
    });
  }

  const drawingMatches =
    drawingFiles.map(
      (filePath) => ({
        ...matchFile(
          filePath,
          records
        ),
        sizeBytes:
          fs.statSync(
            filePath
          ).size,
      })
    );

  const uniqueProducts =
    new Map();

  for (
    const record
    of records
  ) {
    const key =
      record.identity ||
      `${record.model}|${record.productId}|${record.slug}`;

    if (!uniqueProducts.has(key)) {
      uniqueProducts.set(
        key,
        {
          model:
            record.model,
          productId:
            record.productId,
          slug:
            record.slug,
          seriesId:
            record.seriesId,
          productTypeId:
            record.productTypeId,
          imageRef:
            record.imageRef,
          drawingRef:
            record.drawingRef,
          detailHref:
            record.detailHref,
          records: [],
        }
      );
    }

    uniqueProducts
      .get(key)
      .records
      .push(record);
  }

  const unmatchedImages =
    imageMatches.filter(
      (item) =>
        item.bestScore === 0
    );

  const ambiguousImages =
    imageMatches.filter(
      (item) =>
        item.products.length > 1
    );

  const matchedImages =
    imageMatches.filter(
      (item) =>
        item.bestScore > 0 &&
        item.products.length === 1
    );

  const unmatchedDrawings =
    drawingMatches.filter(
      (item) =>
        item.bestScore === 0
    );

  const ambiguousDrawings =
    drawingMatches.filter(
      (item) =>
        item.products.length > 1
    );

  const matchedDrawings =
    drawingMatches.filter(
      (item) =>
        item.bestScore > 0 &&
        item.products.length === 1
    );

  const currentImageDirectories =
    [...new Set(
      records
        .map(
          (record) =>
            record.imageRef
        )
        .filter(Boolean)
        .map(
          (webPath) =>
            path.posix.dirname(
              webPath.replace(
                /\\/g,
                "/"
              )
            )
        )
    )];

  const currentDrawingDirectories =
    [...new Set(
      records
        .map(
          (record) =>
            record.drawingRef
        )
        .filter(Boolean)
        .map(
          (webPath) =>
            path.posix.dirname(
              webPath.replace(
                /\\/g,
                "/"
              )
            )
        )
    )];

  const dataFiles =
    [...new Set(
      records.map(
        (record) =>
          relative(
            record.filePath
          )
      )
    )];

  const productTypeCounts = {};
  const seriesCounts = {};

  for (
    const product
    of uniqueProducts.values()
  ) {
    const productType =
      product.productTypeId ||
      "(未填写)";

    const series =
      product.seriesId ||
      "(未填写)";

    productTypeCounts[productType] =
      (productTypeCounts[productType] || 0) +
      1;

    seriesCounts[series] =
      (seriesCounts[series] || 0) +
      1;
  }

  const clientSource =
    fs.existsSync(clientPath)
      ? read(clientPath)
      : "";

  const report = [];

  report.push(
    "# 快插接头产品图与二维图检查"
  );
  report.push("");

  report.push(
    `生成时间：${new Date().toLocaleString("zh-CN")}`
  );
  report.push("");

  report.push(
    "> 本次仅检查，没有复制、删除或修改任何文件。"
  );
  report.push("");

  report.push(
    "## 1. 源资料"
  );
  report.push("");

  report.push(
    `- 产品图目录：\`${imageSourceDirectory}\``
  );
  report.push(
    `- 产品图数量：${imageFiles.length}`
  );
  report.push(
    `- 二维图目录：\`${drawingSourceDirectory}\``
  );
  report.push(
    `- PDF数量：${drawingFiles.length}`
  );
  report.push("");

  report.push(
    "## 2. 当前官网快插数据"
  );
  report.push("");

  report.push(
    `- 检出的数据记录：${records.length}`
  );
  report.push(
    `- 去重后的产品数量：${uniqueProducts.size}`
  );
  report.push("");

  report.push(
    "### productTypeId统计"
  );
  report.push("");
  report.push("```json");
  report.push(
    JSON.stringify(
      productTypeCounts,
      null,
      2
    )
  );
  report.push("```");
  report.push("");

  report.push(
    "### 系列统计"
  );
  report.push("");
  report.push("```json");
  report.push(
    JSON.stringify(
      seriesCounts,
      null,
      2
    )
  );
  report.push("```");
  report.push("");

  report.push(
    "### 涉及的数据文件"
  );
  report.push("");

  for (
    const filePath
    of dataFiles
  ) {
    report.push(
      `- \`${filePath}\``
    );
  }

  report.push("");

  report.push(
    "## 3. 产品图片匹配"
  );
  report.push("");

  report.push(
    `- 唯一匹配：${matchedImages.length}`
  );
  report.push(
    `- 匹配多个产品：${ambiguousImages.length}`
  );
  report.push(
    `- 无法匹配：${unmatchedImages.length}`
  );
  report.push("");

  report.push(
    "| 图片 | 尺寸 | 大小 | 分数 | 匹配型号 | 商品编码 | 系列 |"
  );
  report.push(
    "|---|---:|---:|---:|---|---|---|"
  );

  for (
    const item
    of imageMatches
  ) {
    const dimensions =
      item.metadata.width &&
      item.metadata.height
        ? `${item.metadata.width}×${item.metadata.height}`
        : "未读取";

    const models =
      item.products.length
        ? item.products
            .map(
              (product) =>
                product.model ||
                product.slug
            )
            .join(" / ")
        : "未匹配";

    const productIds =
      item.products.length
        ? item.products
            .map(
              (product) =>
                product.productId
            )
            .filter(Boolean)
            .join(" / ")
        : "-";

    const series =
      item.products.length
        ? item.products
            .map(
              (product) =>
                product.seriesId
            )
            .filter(Boolean)
            .join(" / ")
        : "-";

    report.push(
      `| ${markdownEscape(item.fileName)} | ${dimensions} | ${(item.metadata.sizeBytes / 1024).toFixed(1)} KB | ${item.bestScore} | ${markdownEscape(models)} | ${markdownEscape(productIds)} | ${markdownEscape(series)} |`
    );
  }

  report.push("");

  report.push(
    "## 4. 二维PDF匹配"
  );
  report.push("");

  report.push(
    `- 唯一匹配：${matchedDrawings.length}`
  );
  report.push(
    `- 匹配多个产品：${ambiguousDrawings.length}`
  );
  report.push(
    `- 无法匹配：${unmatchedDrawings.length}`
  );
  report.push("");

  report.push(
    "| PDF文件 | 大小 | 分数 | 匹配型号 | 商品编码 | 系列 |"
  );
  report.push(
    "|---|---:|---:|---|---|---|"
  );

  for (
    const item
    of drawingMatches
  ) {
    const models =
      item.products.length
        ? item.products
            .map(
              (product) =>
                product.model ||
                product.slug
            )
            .join(" / ")
        : "未匹配";

    const productIds =
      item.products.length
        ? item.products
            .map(
              (product) =>
                product.productId
            )
            .filter(Boolean)
            .join(" / ")
        : "-";

    const series =
      item.products.length
        ? item.products
            .map(
              (product) =>
                product.seriesId
            )
            .filter(Boolean)
            .join(" / ")
        : "-";

    report.push(
      `| ${markdownEscape(item.fileName)} | ${(item.sizeBytes / 1024).toFixed(1)} KB | ${item.bestScore} | ${markdownEscape(models)} | ${markdownEscape(productIds)} | ${markdownEscape(series)} |`
    );
  }

  report.push("");

  report.push(
    "## 5. 无法匹配的文件"
  );
  report.push("");

  report.push(
    "### 无法匹配的产品图"
  );
  report.push("");

  if (!unmatchedImages.length) {
    report.push("无。");
  } else {
    for (
      const item
      of unmatchedImages
    ) {
      report.push(
        `- \`${item.fileName}\``
      );
    }
  }

  report.push("");

  report.push(
    "### 无法匹配的二维PDF"
  );
  report.push("");

  if (!unmatchedDrawings.length) {
    report.push("无。");
  } else {
    for (
      const item
      of unmatchedDrawings
    ) {
      report.push(
        `- \`${item.fileName}\``
      );
    }
  }

  report.push("");

  report.push(
    "## 6. 多产品匹配文件"
  );
  report.push("");

  for (
    const item
    of [
      ...ambiguousImages,
      ...ambiguousDrawings,
    ]
  ) {
    report.push(
      `### ${item.fileName}`
    );
    report.push("");

    for (
      const product
      of item.products
    ) {
      report.push(
        `- ${product.model || product.slug}｜商品编码：${product.productId || "未填写"}｜系列：${product.seriesId || "未填写"}`
      );
    }

    report.push("");
  }

  if (
    !ambiguousImages.length &&
    !ambiguousDrawings.length
  ) {
    report.push("无。");
    report.push("");
  }

  report.push(
    "## 7. 当前资源路径"
  );
  report.push("");

  report.push(
    "### 当前产品图目录"
  );
  report.push("");

  if (!currentImageDirectories.length) {
    report.push(
      "当前快插数据没有产品图路径。"
    );
  } else {
    for (
      const directory
      of currentImageDirectories
    ) {
      report.push(
        `- \`${directory}\``
      );
    }
  }

  report.push("");

  report.push(
    "### 当前二维图目录"
  );
  report.push("");

  if (!currentDrawingDirectories.length) {
    report.push(
      "当前快插数据没有二维图路径。"
    );
  } else {
    for (
      const directory
      of currentDrawingDirectories
    ) {
      report.push(
        `- \`${directory}\``
      );
    }
  }

  report.push("");

  report.push(
    "## 8. 当前卡片跳转逻辑"
  );
  report.push("");

  report.push("```tsx");
  report.push(
    getContext(
      clientSource,
      "QUICK_CONNECT_DETAIL_HREF_PRIORITY",
      10,
      70
    ) ||
    getContext(
      clientSource,
      "quick-connect-fittings",
      10,
      70
    ) ||
    "未找到快插接头跳转逻辑。"
  );
  report.push("```");
  report.push("");

  report.push(
    "## 9. 下一步"
  );
  report.push("");

  report.push(
    "确认报告后，再决定以下接入方式："
  );
  report.push("");

  report.push(
    "1. 图片按具体型号或商品编码复制。"
  );
  report.push(
    "2. 二维PDF按具体型号绑定，或按共用图纸建立一对多映射。"
  );
  report.push(
    "3. 保留Q20、Q40、Q60现有详情路由结构。"
  );
  report.push(
    "4. 同时更新选型卡片图片和详情页资源字段。"
  );
  report.push(
    "5. 无法唯一匹配的文件不自动写入。"
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
    "快插接头产品图和二维图检查完成"
  );
  console.log(
    "============================================"
  );
  console.log(
    "产品图：",
    imageFiles.length
  );
  console.log(
    "产品图唯一匹配：",
    matchedImages.length
  );
  console.log(
    "产品图无法匹配：",
    unmatchedImages.length
  );
  console.log(
    "二维PDF：",
    drawingFiles.length
  );
  console.log(
    "二维PDF唯一匹配：",
    matchedDrawings.length
  );
  console.log(
    "二维PDF无法匹配：",
    unmatchedDrawings.length
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
    "本次未修改任何项目文件。"
  );
}

main().catch(
  (error) => {
    console.error(
      error?.stack ||
      error?.message ||
      String(error)
    );

    process.exitCode = 1;
  }
);
