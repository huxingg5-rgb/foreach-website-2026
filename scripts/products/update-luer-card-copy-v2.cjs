const fs = require("fs");
const path = require("path");
const childProcess = require("child_process");

const root = process.cwd();

const generatorPath = path.join(
  root,
  "scripts",
  "products",
  "generate-luer-fitting-selection-and-assets.cjs"
);

const generatedPath = path.join(
  root,
  "data",
  "products",
  "selection",
  "luer-fitting-selection.generated.ts"
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

function checkNodeSyntax(filePath) {
  const result =
    childProcess.spawnSync(
      process.execPath,
      [
        "--check",
        filePath,
      ],
      {
        cwd: root,
        encoding: "utf8",
      }
    );

  return {
    valid:
      result.status === 0,

    message:
      String(
        result.stderr ||
        result.stdout ||
        ""
      ).trim(),
  };
}

/*
 * 正确寻找函数范围：
 *
 * 1. 先找到 function name(
 * 2. 平衡圆括号，找到参数结束位置
 * 3. 再找到真正的函数体 {
 * 4. 平衡大括号，找到函数体结束位置
 */
function findFunctionRange(
  source,
  functionName
) {
  const functionPattern =
    new RegExp(
      `function\\s+${functionName}\\s*\\(`
    );

  const match =
    source.match(
      functionPattern
    );

  if (
    !match ||
    match.index == null
  ) {
    throw new Error(
      `没有找到函数：${functionName}`
    );
  }

  const start =
    match.index;

  const parameterStart =
    source.indexOf(
      "(",
      start
    );

  if (parameterStart < 0) {
    throw new Error(
      `${functionName} 没有找到参数起点。`
    );
  }

  let parameterDepth = 0;
  let parameterEnd = -1;

  let quote = "";
  let escaped = false;
  let lineComment = false;
  let blockComment = false;

  for (
    let index = parameterStart;
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

    if (char === "(") {
      parameterDepth += 1;
      continue;
    }

    if (char === ")") {
      parameterDepth -= 1;

      if (parameterDepth === 0) {
        parameterEnd =
          index;
        break;
      }
    }
  }

  if (parameterEnd < 0) {
    throw new Error(
      `${functionName} 参数没有正常结束。`
    );
  }

  const bodyStart =
    source.indexOf(
      "{",
      parameterEnd
    );

  if (bodyStart < 0) {
    throw new Error(
      `${functionName} 没有找到函数体。`
    );
  }

  let bodyDepth = 0;

  quote = "";
  escaped = false;
  lineComment = false;
  blockComment = false;

  for (
    let index = bodyStart;
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

    if (char === "{") {
      bodyDepth += 1;
      continue;
    }

    if (char === "}") {
      bodyDepth -= 1;

      if (bodyDepth === 0) {
        return {
          start,
          end:
            index + 1,
        };
      }
    }
  }

  throw new Error(
    `${functionName} 函数体没有正常结束。`
  );
}

function extractJsonArray(
  source,
  exportName
) {
  const marker =
    `export const ${exportName}`;

  const markerIndex =
    source.indexOf(
      marker
    );

  if (markerIndex < 0) {
    throw new Error(
      `生成数据中没有找到：${exportName}`
    );
  }

  const arrayStart =
    source.indexOf(
      "[",
      markerIndex
    );

  if (arrayStart < 0) {
    throw new Error(
      `${exportName} 没有找到数组起点。`
    );
  }

  let depth = 0;
  let quote = "";
  let escaped = false;

  for (
    let index = arrayStart;
    index < source.length;
    index += 1
  ) {
    const char =
      source[index];

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
      char === '"' ||
      char === "'"
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
        return JSON.parse(
          source.slice(
            arrayStart,
            index + 1
          )
        );
      }
    }
  }

  throw new Error(
    `${exportName} 数组没有正常结束。`
  );
}

/* =========================================================
   1. 修改前检查
   ========================================================= */

const beforeSyntax =
  checkNodeSyntax(
    generatorPath
  );

if (!beforeSyntax.valid) {
  console.error(
    beforeSyntax.message
  );

  throw new Error(
    "当前鲁尔生成脚本语法不正常，本次未修改。"
  );
}

let source =
  read(generatorPath);

const stamp = new Date()
  .toISOString()
  .replace(/[-:TZ.]/g, "")
  .slice(0, 14);

const backupPath =
  `${generatorPath}.bak_card_copy_v2_${stamp}`;

fs.copyFileSync(
  generatorPath,
  backupPath
);

/* =========================================================
   2. 准备新的卡片描述函数
   ========================================================= */

const newFunction = [
  "function createCardSubtitle({",
  "  series,",
  "  tubeInnerDiameter,",
  "  thread,",
  "  material,",
  "  color,",
  "}) {",
  '  const productNameMap = {',
  '    LSL: "固定公鲁尔芯子",',
  '    LRL: "旋转公鲁尔芯子",',
  '    LPR: "旋转锁圈公鲁尔接头",',
  '    LPS: "固定锁圈公鲁尔接头",',
  '    LP: "一体式公鲁尔接头",',
  '    LS: "母鲁尔接头",',
  '    PMLS: "穿板母鲁尔接头",',
  '    LCR: "鲁尔接头识别色环",',
  '    LPT: "鲁尔内螺纹套",',
  '    LNS: "鲁尔滚花螺母",',
  "  };",
  "",
  "  const structureName =",
  "    productNameMap[series] ||",
  '    `${series}鲁尔接头`;',
  "",
  "  const compactTubeDiameter =",
  "    String(",
  '      tubeInnerDiameter || ""',
  "    ).replace(",
  "      /\\s+/g,",
  '      ""',
  "    );",
  "",
  "  const materialLine =",
  "    material",
  "      ? `${String(material).toUpperCase()}材质`",
  '      : "材质信息待确认";',
  "",
  "  const regularConnectionLine =",
  "    thread &&",
  "    compactTubeDiameter",
  "      ? `${thread}螺纹｜适配${compactTubeDiameter}内径软管`",
  "      : thread",
  "        ? `${thread}螺纹连接`",
  "        : compactTubeDiameter",
  "          ? `适配${compactTubeDiameter}内径软管`",
  '          : "鲁尔接口连接";',
  "",
  '  if (series === "LCR") {',
  "    return [",
  "      structureName,",
  '      "用于鲁尔接头颜色区分",',
  "      [",
  "        materialLine,",
  "        color,",
  "      ]",
  "        .filter(Boolean)",
  '        .join("｜"),',
  '    ].join("\\n");',
  "  }",
  "",
  '  if (series === "PMLS") {',
  "    const connectionLine =",
  "      thread &&",
  "      compactTubeDiameter",
  "        ? `${thread}穿板连接｜适配${compactTubeDiameter}内径软管`",
  "        : thread",
  "          ? `${thread}穿板连接`",
  "          : compactTubeDiameter",
  "            ? `穿板连接｜适配${compactTubeDiameter}内径软管`",
  '            : "穿板式连接";',
  "",
  "    return [",
  "      structureName,",
  "      connectionLine,",
  "      materialLine,",
  '    ].join("\\n");',
  "  }",
  "",
  '  if (series === "LPT") {',
  "    return [",
  "      structureName,",
  "      thread",
  "        ? `${thread}螺纹连接`",
  '        : "鲁尔内螺纹连接",',
  "      materialLine,",
  '    ].join("\\n");',
  "  }",
  "",
  '  if (series === "LNS") {',
  "    return [",
  "      structureName,",
  "      thread",
  "        ? `${thread}螺纹连接`",
  '        : "鲁尔接头配套螺母",',
  "      materialLine,",
  '    ].join("\\n");',
  "  }",
  "",
  "  return [",
  "    structureName,",
  "    regularConnectionLine,",
  "    materialLine,",
  '  ].join("\\n");',
  "}",
].join("\n");

const functionRange =
  findFunctionRange(
    source,
    "createCardSubtitle"
  );

source =
  source.slice(
    0,
    functionRange.start
  ) +
  newFunction +
  source.slice(
    functionRange.end
  );

/* =========================================================
   3. 获取当前型号变量
   ========================================================= */

const parseCallMatch =
  source.match(
    /const\s+parsed\s*=\s*parseModel\(\s*([A-Za-z_$][A-Za-z0-9_$]*(?:\.[A-Za-z_$][A-Za-z0-9_$]*)?)\s*\)\s*;/
  );

if (!parseCallMatch) {
  fs.copyFileSync(
    backupPath,
    generatorPath
  );

  throw new Error(
    "没有找到 parseModel 调用中的型号变量。"
  );
}

const modelExpression =
  parseCallMatch[1];

console.log(
  "识别到型号变量：" +
    modelExpression
);

/* =========================================================
   4. 标题改为完整型号
   ========================================================= */

const titlePattern =
  /cardTitle\s*:\s*\{\s*zh\s*:\s*productName\s*,\s*en\s*:\s*productName\s*,?\s*\}/;

if (!titlePattern.test(source)) {
  fs.copyFileSync(
    backupPath,
    generatorPath
  );

  throw new Error(
    "没有找到当前 cardTitle 产品名称代码。"
  );
}

source = source.replace(
  titlePattern,
  [
    "cardTitle: {",
    `      zh: ${modelExpression},`,
    `      en: ${modelExpression},`,
    "    }",
  ].join("\n")
);

/* =========================================================
   5. 修改后语法检查
   ========================================================= */

fs.writeFileSync(
  generatorPath,
  source,
  "utf8"
);

const afterSyntax =
  checkNodeSyntax(
    generatorPath
  );

if (!afterSyntax.valid) {
  console.error(
    afterSyntax.message
  );

  fs.copyFileSync(
    backupPath,
    generatorPath
  );

  throw new Error(
    "修改后语法检查失败，已恢复原脚本。"
  );
}

console.log("");
console.log(
  "生成脚本修改完成。"
);
console.log(
  "Node语法检查：通过"
);
console.log(
  "正在重新生成鲁尔接头数据……"
);

/* =========================================================
   6. 重新生成
   ========================================================= */

childProcess.execFileSync(
  process.execPath,
  [
    generatorPath,
  ],
  {
    cwd: root,
    stdio: "inherit",
  }
);

/* =========================================================
   7. 验证生成结果
   ========================================================= */

const generatedSource =
  read(generatedPath);

const products =
  extractJsonArray(
    generatedSource,
    "luerFittingSelectionProducts"
  );

if (products.length !== 151) {
  throw new Error(
    `产品数量错误：${products.length}/151`
  );
}

const modelPattern =
  /^[A-Z0-9]+(?:-[A-Z0-9]+)+$/;

const invalidTitles =
  products.filter(
    (product) =>
      !modelPattern.test(
        String(
          product.cardTitle?.zh ||
          ""
        )
      )
  );

if (invalidTitles.length) {
  throw new Error(
    `仍有${invalidTitles.length}个标题不是完整型号。`
  );
}

const invalidLineCounts =
  products.filter(
    (product) =>
      String(
        product.cardSubtitle?.zh ||
        ""
      ).split("\n").length !== 3
  );

if (invalidLineCounts.length) {
  throw new Error(
    `仍有${invalidLineCounts.length}个卡片描述不是三行。`
  );
}

const ordinaryColorWords = [
  "黑色",
  "黄色",
  "蓝色",
  "红色",
  "橙色",
  "绿色",
  "白色",
  "本色",
];

const ordinaryProductsWithColor =
  products.filter(
    (product) => {
      if (
        product.seriesId ===
        "lcr"
      ) {
        return false;
      }

      const subtitle =
        String(
          product.cardSubtitle?.zh ||
          ""
        );

      return ordinaryColorWords.some(
        (color) =>
          subtitle.includes(
            color
          )
      );
    }
  );

if (
  ordinaryProductsWithColor.length
) {
  throw new Error(
    `仍有${ordinaryProductsWithColor.length}个普通产品显示颜色。`
  );
}

const sampleSeries = [
  "lsl",
  "lpr",
  "pmls",
  "lcr",
  "lpt",
  "lns",
];

console.log("");
console.log(
  "============================================"
);
console.log(
  "鲁尔接头卡片文案修改完成"
);
console.log(
  "============================================"
);
console.log(
  `产品数量：${products.length}`
);
console.log(
  "型号式标题：151/151"
);
console.log(
  "普通产品颜色：已移除"
);
console.log(
  "LCR色环颜色：已保留"
);
console.log(
  "筛选和联动置灰：未修改"
);
console.log(
  "详情链接：未修改"
);

for (
  const seriesId
  of sampleSeries
) {
  const product =
    products.find(
      (item) =>
        item.seriesId ===
        seriesId
    );

  if (!product) {
    continue;
  }

  console.log("");
  console.log(
    product.cardTitle.zh
  );
  console.log(
    product.cardSubtitle.zh
  );
}

console.log("");
console.log(
  "备份："
);
console.log(
  backupPath
);
console.log("");
