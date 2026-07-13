const fs = require("fs");
const path = require("path");
const vm = require("vm");

const root = process.cwd();

const sourceDirectory =
  String.raw`H:\01-官网项目\02_产品中心\fit\Barbed connector\已压缩_JPG`;

const selectionDirectory = path.join(
  root,
  "data",
  "products",
  "selection"
);

const fittingDetailDirectory = path.join(
  root,
  "data",
  "products",
  "generated",
  "fittings"
);

const publicDirectory = path.join(
  root,
  "public"
);

const reportPath = path.join(
  root,
  "reports",
  "barbed-connector-image-audit.md"
);

const imageExtensions =
  new Set([
    ".jpg",
    ".jpeg",
    ".png",
    ".webp",
  ]);

let sharp = null;

try {
  sharp = require("sharp");
} catch {
  sharp = null;
}

function read(filePath) {
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
      result.push(fullPath);
    }
  }

  return result;
}

function normalizeText(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/×/g, "x")
    .replace(/[‐-‒–—−]/g, "-")
    .replace(/\.(jpg|jpeg|png|webp)$/i, "")
    .replace(
      /(?:[-_\s]+(?:main|mainimage|product|front|thumb|thumbnail|主图|产品图|正面图|已压缩|压缩))$/i,
      ""
    )
    .replace(/[^a-z0-9\u4e00-\u9fff]+/g, "")
    .trim();
}

function getLocalizedText(
  value,
  locale = "zh"
) {
  if (
    value == null
  ) {
    return "";
  }

  if (
    typeof value === "string" ||
    typeof value === "number"
  ) {
    return String(value);
  }

  if (
    typeof value === "object"
  ) {
    return String(
      value[locale] ||
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

function escapeMarkdown(value) {
  return String(value ?? "")
    .replace(/\|/g, "\\|")
    .replace(/\r?\n/g, "<br>");
}

function extractExportArrays(source) {
  const results = [];

  const exportPattern =
    /export\s+const\s+([A-Za-z0-9_$]+)/g;

  let match;

  while (
    (
      match =
        exportPattern.exec(source)
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
        continue;
      }

      if (char === "]") {
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
        results.push({
          exportName,
          value,
        });
      }
    } catch {
      // 当前导出不是纯数据数组时跳过。
    }
  }

  return results;
}

function isBarbedRecord(
  record,
  filePath
) {
  const haystack =
    [
      filePath,
      record?.productTypeId,
      record?.seriesId,
      record?.seriesCode,
      record?.seriesName,
      record?.name,
      record?.title,
      record?.displayName,
      record?.productName,
      record?.model,
      record?.slug,
      getLocalizedText(
        record?.cardTitle,
        "zh"
      ),
      getLocalizedText(
        record?.cardSubtitle,
        "zh"
      ),
      getLocalizedText(
        record?.searchKeywords,
        "zh"
      ),
    ]
      .filter(Boolean)
      .join(" ");

  return /barbed|barb|倒刺|倒钩|软管接头|thread-to-barbed/i.test(
    haystack
  );
}

function buildRecord({
  kind,
  filePath,
  record,
  exportName = "",
}) {
  const model =
    String(
      record?.model ||
      record?.displayModel ||
      record?.foreachModel ||
      record?.modelDisplay ||
      getLocalizedText(
        record?.cardTitle,
        "zh"
      ) ||
      getLocalizedText(
        record?.cardTitle,
        "en"
      ) ||
      record?.title ||
      ""
    ).trim();

  const slug =
    String(
      record?.slug ||
      record?.detailSlug ||
      ""
    ).trim();

  const productId =
    String(
      record?.productId ||
      record?.productCode ||
      record?.code ||
      ""
    ).trim();

  const productTypeId =
    String(
      record?.productTypeId ||
      ""
    ).trim();

  const imageRef =
    String(
      record?.mainImage ||
      record?.imageCard ||
      record?.image ||
      ""
    ).trim();

  const detailHref =
    String(
      record?.detailHref ||
      record?.href ||
      ""
    ).trim();

  const keys =
    [
      model,
      slug,
      productId,
      record?.displayModel,
      record?.foreachModel,
      record?.modelDisplay,
      getLocalizedText(
        record?.cardTitle,
        "zh"
      ),
      getLocalizedText(
        record?.cardTitle,
        "en"
      ),
    ]
      .map(normalizeText)
      .filter(Boolean);

  return {
    kind,
    filePath,
    exportName,
    model,
    slug,
    productId,
    productTypeId,
    imageRef,
    detailHref,
    keys:
      [...new Set(keys)],
    raw:
      record,
  };
}

async function getImageMetadata(
  filePath
) {
  const stat =
    fs.statSync(filePath);

  const base = {
    sizeBytes:
      stat.size,
    width:
      "",
    height:
      "",
    format:
      path
        .extname(filePath)
        .slice(1)
        .toLowerCase(),
  };

  if (!sharp) {
    return base;
  }

  try {
    const metadata =
      await sharp(filePath)
        .metadata();

    return {
      ...base,
      width:
        metadata.width || "",
      height:
        metadata.height || "",
      format:
        metadata.format ||
        base.format,
    };
  } catch {
    return base;
  }
}

function scoreMatch(
  imageKey,
  record
) {
  let best = 0;

  for (
    const key
    of record.keys
  ) {
    if (
      !imageKey ||
      !key
    ) {
      continue;
    }

    if (imageKey === key) {
      best =
        Math.max(
          best,
          100
        );

      continue;
    }

    if (
      imageKey.length >= 5 &&
      key.length >= 5 &&
      (
        imageKey.includes(key) ||
        key.includes(imageKey)
      )
    ) {
      best =
        Math.max(
          best,
          70
        );
    }
  }

  return best;
}

async function main() {
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

  const sourceImagePaths =
    walk(sourceDirectory)
      .filter(
        (filePath) =>
          imageExtensions.has(
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

  const sourceImages = [];

  for (
    const filePath
    of sourceImagePaths
  ) {
    sourceImages.push({
      filePath,
      fileName:
        path.basename(filePath),
      key:
        normalizeText(
          path.basename(filePath)
        ),
      metadata:
        await getImageMetadata(
          filePath
        ),
    });
  }

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

    const exports =
      extractExportArrays(
        source
      );

    for (
      const item
      of exports
    ) {
      for (
        const record
        of item.value
      ) {
        if (
          !record ||
          typeof record !== "object"
        ) {
          continue;
        }

        if (
          !isBarbedRecord(
            record,
            filePath
          )
        ) {
          continue;
        }

        records.push(
          buildRecord({
            kind:
              "selection",
            filePath,
            record,
            exportName:
              item.exportName,
          })
        );
      }
    }
  }

  const detailFiles =
    walk(
      fittingDetailDirectory
    )
      .filter(
        (filePath) =>
          filePath.endsWith(
            `${path.sep}detail${path.sep}index.json`
          )
      );

  for (
    const filePath
    of detailFiles
  ) {
    let value;

    try {
      value =
        JSON.parse(
          read(filePath)
        );
    } catch {
      continue;
    }

    if (!Array.isArray(value)) {
      continue;
    }

    for (
      const record
      of value
    ) {
      if (
        !isBarbedRecord(
          record,
          filePath
        )
      ) {
        continue;
      }

      records.push(
        buildRecord({
          kind:
            "detail",
          filePath,
          record,
        })
      );
    }
  }

  const productTypeCounts = {};

  for (
    const record
    of records
  ) {
    const key =
      record.productTypeId ||
      "(未填写productTypeId)";

    productTypeCounts[key] =
      (productTypeCounts[key] || 0) +
      1;
  }

  const imageMatches =
    sourceImages.map(
      (image) => {
        const matches =
          records
            .map(
              (record) => ({
                record,
                score:
                  scoreMatch(
                    image.key,
                    record
                  ),
              })
            )
            .filter(
              (item) =>
                item.score > 0
            )
            .sort(
              (a, b) =>
                b.score -
                a.score
            );

        const bestScore =
          matches[0]?.score ||
          0;

        return {
          ...image,
          matches:
            matches.filter(
              (item) =>
                item.score ===
                bestScore
            ),
          bestScore,
        };
      }
    );

  const unmatchedImages =
    imageMatches.filter(
      (item) =>
        item.bestScore === 0
    );

  const ambiguousImages =
    imageMatches.filter(
      (item) =>
        item.bestScore > 0 &&
        item.matches.length > 1
    );

  const exactImages =
    imageMatches.filter(
      (item) =>
        item.bestScore === 100 &&
        item.matches.length === 1
    );

  const detailRecords =
    records.filter(
      (record) =>
        record.kind ===
        "detail"
    );

  const recordMatches =
    detailRecords.map(
      (record) => {
        const matches =
          sourceImages
            .map(
              (image) => ({
                image,
                score:
                  scoreMatch(
                    image.key,
                    record
                  ),
              })
            )
            .filter(
              (item) =>
                item.score > 0
            )
            .sort(
              (a, b) =>
                b.score -
                a.score
            );

        const bestScore =
          matches[0]?.score ||
          0;

        return {
          record,
          matches:
            matches.filter(
              (item) =>
                item.score ===
                bestScore
            ),
          bestScore,
        };
      }
    );

  const detailWithoutImage =
    recordMatches.filter(
      (item) =>
        item.bestScore === 0
    );

  const existingReferences =
    records
      .filter(
        (record) =>
          record.imageRef
      )
      .map(
        (record) => {
          const localPath =
            record.imageRef.startsWith("/")
              ? path.join(
                  publicDirectory,
                  record.imageRef.slice(1)
                )
              : path.join(
                  root,
                  record.imageRef
                );

          return {
            record,
            localPath,
            exists:
              fs.existsSync(localPath),
          };
        }
      );

  const destinationDirectories =
    [...new Set(
      existingReferences
        .map(
          (item) =>
            path.dirname(
              item.localPath
            )
        )
    )];

  const report = [];

  report.push(
    "# 倒刺接头产品图片替换检查"
  );
  report.push("");

  report.push(
    `生成时间：${new Date().toLocaleString("zh-CN")}`
  );
  report.push("");

  report.push(
    "> 本次仅检查图片、数据和路径，没有复制、删除或修改任何文件。"
  );
  report.push("");

  report.push(
    "## 1. 图片源目录"
  );
  report.push("");

  report.push(
    `- 目录：\`${sourceDirectory}\``
  );
  report.push(
    `- 图片数量：${sourceImages.length}`
  );
  report.push(
    `- 已启用尺寸读取：${Boolean(sharp)}`
  );
  report.push("");

  report.push(
    "## 2. 检出的倒刺相关产品数据"
  );
  report.push("");

  report.push(
    `- 选型及详情记录总数：${records.length}`
  );
  report.push(
    `- 详情记录数：${detailRecords.length}`
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
    "### 涉及的数据文件"
  );
  report.push("");

  const involvedFiles =
    [...new Set(
      records.map(
        (record) =>
          relative(
            record.filePath
          )
      )
    )];

  for (
    const filePath
    of involvedFiles
  ) {
    report.push(
      `- \`${filePath}\``
    );
  }

  report.push("");

  report.push(
    "## 3. 图片匹配结果"
  );
  report.push("");

  report.push(
    `- 唯一精确匹配：${exactImages.length}`
  );
  report.push(
    `- 一对多或多记录匹配：${ambiguousImages.length}`
  );
  report.push(
    `- 完全无法匹配：${unmatchedImages.length}`
  );
  report.push(
    `- 没找到源图片的详情记录：${detailWithoutImage.length}`
  );
  report.push("");

  report.push(
    "## 4. 源图片逐项检查"
  );
  report.push("");

  report.push(
    "| 图片文件 | 尺寸 | 大小 | 最佳匹配分数 | 匹配型号 | productTypeId | 数据类型 |"
  );
  report.push(
    "|---|---:|---:|---:|---|---|---|"
  );

  for (
    const item
    of imageMatches
  ) {
    const dimension =
      item.metadata.width &&
      item.metadata.height
        ? `${item.metadata.width}×${item.metadata.height}`
        : "未读取";

    const sizeKb =
      (
        item.metadata.sizeBytes /
        1024
      ).toFixed(1) +
      " KB";

    const models =
      item.matches.length
        ? item.matches
            .map(
              (match) =>
                match.record.model ||
                match.record.slug ||
                match.record.productId
            )
            .join(" / ")
        : "未匹配";

    const productTypes =
      item.matches.length
        ? [
            ...new Set(
              item.matches.map(
                (match) =>
                  match.record
                    .productTypeId ||
                  "未填写"
              )
            ),
          ].join(" / ")
        : "-";

    const kinds =
      item.matches.length
        ? [
            ...new Set(
              item.matches.map(
                (match) =>
                  match.record.kind
              )
            ),
          ].join(" / ")
        : "-";

    report.push(
      `| ${escapeMarkdown(item.fileName)} | ${dimension} | ${sizeKb} | ${item.bestScore} | ${escapeMarkdown(models)} | ${escapeMarkdown(productTypes)} | ${kinds} |`
    );
  }

  report.push("");

  report.push(
    "## 5. 完全无法匹配的源图片"
  );
  report.push("");

  if (!unmatchedImages.length) {
    report.push(
      "无。"
    );
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
    "## 6. 存在多个匹配对象的图片"
  );
  report.push("");

  if (!ambiguousImages.length) {
    report.push(
      "无。"
    );
  } else {
    for (
      const item
      of ambiguousImages
    ) {
      report.push(
        `### ${item.fileName}`
      );
      report.push("");

      for (
        const match
        of item.matches
      ) {
        report.push(
          `- ${match.record.kind}｜${match.record.productTypeId || "未填写"}｜${match.record.model || match.record.slug || match.record.productId}｜${relative(match.record.filePath)}`
        );
      }

      report.push("");
    }
  }

  report.push(
    "## 7. 没找到源图片的详情型号"
  );
  report.push("");

  if (!detailWithoutImage.length) {
    report.push(
      "无。"
    );
  } else {
    report.push(
      "| 型号 | slug | productId | productTypeId | 当前主图 |"
    );
    report.push(
      "|---|---|---|---|---|"
    );

    for (
      const item
      of detailWithoutImage
    ) {
      const record =
        item.record;

      report.push(
        `| ${escapeMarkdown(record.model)} | ${escapeMarkdown(record.slug)} | ${escapeMarkdown(record.productId)} | ${escapeMarkdown(record.productTypeId)} | ${escapeMarkdown(record.imageRef || "空")} |`
      );
    }
  }

  report.push("");

  report.push(
    "## 8. 当前官网图片引用"
  );
  report.push("");

  report.push(
    `- 当前有图片引用的记录：${existingReferences.length}`
  );
  report.push(
    `- 引用文件存在：${existingReferences.filter((item) => item.exists).length}`
  );
  report.push(
    `- 引用文件不存在：${existingReferences.filter((item) => !item.exists).length}`
  );
  report.push("");

  report.push(
    "### 当前可能的目标目录"
  );
  report.push("");

  if (!destinationDirectories.length) {
    report.push(
      "没有从现有数据中推断出目标图片目录。"
    );
  } else {
    for (
      const directory
      of destinationDirectories
    ) {
      report.push(
        `- \`${directory}\``
      );
    }
  }

  report.push("");

  report.push(
    "## 9. 当前图片文件列表"
  );
  report.push("");

  report.push(
    "| 文件名 | 尺寸 | 格式 | 大小 |"
  );
  report.push(
    "|---|---:|---|---:|"
  );

  for (
    const image
    of sourceImages
  ) {
    const dimension =
      image.metadata.width &&
      image.metadata.height
        ? `${image.metadata.width}×${image.metadata.height}`
        : "未读取";

    report.push(
      `| ${escapeMarkdown(image.fileName)} | ${dimension} | ${image.metadata.format} | ${(image.metadata.sizeBytes / 1024).toFixed(1)} KB |`
    );
  }

  report.push("");

  report.push(
    "## 10. 下一步判定标准"
  );
  report.push("");

  report.push(
    "只有满足以下条件后才进行图片替换："
  );
  report.push("");

  report.push(
    "1. 确认这批图对应的 productTypeId。"
  );
  report.push(
    "2. 每张图片能唯一匹配一个正式型号。"
  );
  report.push(
    "3. 确认卡片图与详情主图是否使用同一张。"
  );
  report.push(
    "4. 确认目标目录和统一命名规则。"
  );
  report.push(
    "5. 复制前备份已有图片，不删除其他产品资源。"
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
    "倒刺接头产品图片检查完成"
  );
  console.log(
    "============================================"
  );
  console.log(
    "源图片数量：",
    sourceImages.length
  );
  console.log(
    "倒刺相关数据记录：",
    records.length
  );
  console.log(
    "唯一精确匹配：",
    exactImages.length
  );
  console.log(
    "多对象匹配：",
    ambiguousImages.length
  );
  console.log(
    "无法匹配图片：",
    unmatchedImages.length
  );
  console.log(
    "缺少源图片的详情型号：",
    detailWithoutImage.length
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
    "本次未修改或复制任何文件。"
  );
}

main().catch(
  (error) => {
    console.error("");
    console.error(
      error?.stack ||
      error?.message ||
      String(error)
    );

    process.exitCode = 1;
  }
);
