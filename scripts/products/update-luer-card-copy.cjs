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
      "未找到文件：" +
        filePath
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

function findFunctionRange(
  source,
  functionName
) {
  const startMarker =
    `function ${functionName}(`;

  const start =
    source.indexOf(
      startMarker
    );

  if (start < 0) {
    throw new Error(
      `没有找到函数：${functionName}`
    );
  }

  const openBrace =
    source.indexOf(
      "{",
      start +
        startMarker.length
    );

  if (openBrace < 0) {
    throw new Error(
      `${functionName} 没有找到起始大括号。`
    );
  }

  let depth = 0;
  let quote = "";
  let escaped = false;
  let lineComment = false;
  let blockComment = false;

  for (
    let index = openBrace;
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
      depth += 1;
      continue;
    }

    if (char === "}") {
      depth -= 1;

      if (depth === 0) {
        return {
          start,
          end:
            index + 1,
        };
      }
    }
  }

  throw new Error(
    `${functionName} 没有找到结束位置。`
  );
}

function extractJsonArray(
  source,
  exportName
) {
  const marker =
    `export const ${exportName}`;

  const markerIndex =
    source.indexOf(marker);

  if (markerIndex < 0) {
    throw new Error(
      `生成文件没有找到：${exportName}`
    );
  }

  const arrayStart =
    source.indexOf(
      "[",
      markerIndex
    );

  if (arrayStart < 0) {
    throw new Error(
      `${exportName} 没有找到数组。`
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
    `${exportName} 数组不完整。`
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
    "当前鲁尔生成脚本存在语法错误，本次未修改。"
  );
}

let source =
  read(generatorPath);

const stamp = new Date()
  .toISOString()
  .replace(/[-:TZ.]/g, "")
  .slice(0, 14);

const backupPath =
  `${generatorPath}.bak_card_copy_${stamp}`;

fs.copyFileSync(
  generatorPath,
  backupPath
);

/* =========================================================
   2. 重写鲁尔卡片描述函数
   ========================================================= */

const functionRange =
  findFunctionRange(
    source,
    "createCardSubtitle"
  );

const newFunction = `function createCardSubtitle({
  series,
  tubeInnerDiameter,
  thread,
  material,
  color,
}) {
  const productNameMap = {
    LSL: "固定公鲁尔芯子",
    LRL: "旋转公鲁尔芯子",
    LPR: "旋转锁圈公鲁尔接头",
    LPS: "固定锁圈公鲁尔接头",
    LP: "一体式公鲁尔接头",
    LS: "母鲁尔接头",
    PMLS: "穿板母鲁尔接头",
    LCR: "鲁尔接头识别色环",
    LPT: "鲁尔内螺纹套",
    LNS: "鲁尔滚花螺母",
  };

  const structureName =
    productNameMap[series] ||
    \`\${series}鲁尔接头\`;

  const compactTubeDiameter =
    String(
      tubeInnerDiameter || ""
    ).replace(
      /\\\\s+/g,
      ""
    );

  const materialLine =
    material
      ? \`\${String(material).toUpperCase()}材质\`
      : "材质信息待确认";

  const regularConnectionLine =
    thread &&
    compactTubeDiameter
      ? \`\${thread}螺纹｜适配\${compactTubeDiameter}内径软管\`
      : thread
        ? \`\${thread}螺纹连接\`
        : compactTubeDiameter
          ? \`适配\${compactTubeDiameter}内径软管\`
          : "鲁尔接口连接";

  /*
   * LCR色环：
   * 颜色属于核心识别属性，需要保留。
   */
  if (series === "LCR") {
    return [
      structureName,
      "用于鲁尔接头颜色区分",
      [
        materialLine,
        color,
      ]
        .filter(Boolean)
        .join("｜"),
    ].join("\\\\n");
  }

  /*
   * PMLS穿板母鲁尔接头。
   */
  if (series === "PMLS") {
    const connectionLine =
      thread &&
      compactTubeDiameter
        ? \`\${thread}穿板连接｜适配\${compactTubeDiameter}内径软管\`
        : thread
          ? \`\${thread}穿板连接\`
          : compactTubeDiameter
            ? \`穿板连接｜适配\${compactTubeDiameter}内径软管\`
            : "穿板式连接";

    return [
      structureName,
      connectionLine,
      materialLine,
    ].join("\\\\n");
  }

  /*
   * LPT内螺纹套。
   */
  if (series === "LPT") {
    return [
      structureName,
      thread
        ? \`\${thread}螺纹连接\`
        : "鲁尔内螺纹连接",
      materialLine,
    ].join("\\\\n");
  }

  /*
   * LNS滚花螺母。
   */
  if (series === "LNS") {
    return [
      structureName,
      thread
        ? \`\${thread}螺纹连接\`
        : "鲁尔接头配套螺母",
      materialLine,
    ].join("\\\\n");
  }

  /*
   * 普通鲁尔接头：
   * 结构名称 / 接管或螺纹规格 / 材质。
   * 颜色只保留在筛选中。
   */
  return [
    structureName,
    regularConnectionLine,
    materialLine,
  ].join("\\\\n");
}`;

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
   3. 卡片标题改成完整型号
   ========================================================= */

const parseCallMatch =
  source.match(
    /const\s+parsed\s*=\s*parseModel\(\s*([A-Za-z_$][A-Za-z0-9_$]*)\s*\)\s*;/
  );

if (!parseCallMatch) {
  throw new Error(
    "没有找到 parseModel 调用及型号变量。"
  );
}

const modelVariable =
  parseCallMatch[1];

const titlePattern =
  /cardTitle:\s*\{\s*zh:\s*productName,\s*en:\s*productName,\s*\}/;

if (!titlePattern.test(source)) {
  throw new Error(
    "没有找到当前 cardTitle 产品名称代码。"
  );
}

source = source.replace(
  titlePattern,
  `cardTitle: {
      zh: ${modelVariable},
      en: ${modelVariable},
    }`
);

/* =========================================================
   4. 修改后语法检查
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
  "生成脚本修改完成，Node语法检查通过。"
);
console.log(
  "正在重新生成鲁尔接头数据……"
);

/* =========================================================
   5. 重新生成
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
   6. 验证151个卡片
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
    `鲁尔接头数量应为151，当前为${products.length}。`
  );
}

const modelPattern =
  /^[A-Z0-9]+(?:-[A-Z0-9]+)+$/;

const invalidTitles =
  products.filter(
    (product) =>
      !modelPattern.test(
        product.cardTitle?.zh || ""
      )
  );

if (invalidTitles.length) {
  throw new Error(
    `仍有${invalidTitles.length}个卡片标题不是完整型号。`
  );
}

const wrongLineCount =
  products.filter(
    (product) =>
      String(
        product.cardSubtitle?.zh || ""
      ).split("\n").length !== 3
  );

if (wrongLineCount.length) {
  throw new Error(
    `有${wrongLineCount.length}个卡片描述不是三行。`
  );
}

const colorWords = [
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
        product.cardSubtitle?.zh ||
        "";

      return colorWords.some(
        (color) =>
          subtitle.includes(color)
      );
    }
  );

if (
  ordinaryProductsWithColor.length
) {
  throw new Error(
    `仍有${ordinaryProductsWithColor.length}个普通产品在卡片中显示颜色。`
  );
}

const requiredSeriesCopy = {
  lcr:
    "鲁尔接头识别色环",

  lpt:
    "鲁尔内螺纹套",

  lns:
    "鲁尔滚花螺母",
};

for (
  const [
    seriesId,
    requiredText,
  ]
  of Object.entries(
    requiredSeriesCopy
  )
) {
  const matchingProducts =
    products.filter(
      (product) =>
        product.seriesId ===
        seriesId
    );

  if (!matchingProducts.length) {
    throw new Error(
      `没有找到${seriesId.toUpperCase()}系列。`
    );
  }

  if (
    matchingProducts.some(
      (product) =>
        !String(
          product.cardSubtitle?.zh ||
          ""
        ).includes(
          requiredText
        )
    )
  ) {
    throw new Error(
      `${seriesId.toUpperCase()}系列专属文案验证失败。`
    );
  }
}

const samples = [
  products.find(
    (product) =>
      product.seriesId ===
      "lsl"
  ),

  products.find(
    (product) =>
      product.seriesId ===
      "lpr"
  ),

  products.find(
    (product) =>
      product.seriesId ===
      "pmls"
  ),

  products.find(
    (product) =>
      product.seriesId ===
      "lcr"
  ),

  products.find(
    (product) =>
      product.seriesId ===
      "lpt"
  ),

  products.find(
    (product) =>
      product.seriesId ===
      "lns"
  ),
].filter(Boolean);

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
  `型号式标题：${products.length}/${products.length}`
);
console.log(
  "普通产品颜色：已从卡片中移除"
);
console.log(
  "LCR颜色：保留"
);
console.log(
  "筛选与联动置灰：未修改"
);
console.log(
  "详情链接：未修改"
);
console.log("");
console.log(
  "卡片示例："
);

for (
  const product
  of samples
) {
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
  "生成脚本备份："
);
console.log(
  backupPath
);
console.log("");
