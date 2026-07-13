const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

const root = process.cwd();

const generatorPath = path.join(
  root,
  "scripts",
  "products",
  "generate-and-connect-quick-connect-selection.cjs"
);

const generatedPath = path.join(
  root,
  "data",
  "products",
  "selection",
  "quick-connect-fitting-selection.generated.ts"
);

const stamp = new Date()
  .toISOString()
  .replace(/[-:T.Z]/g, "")
  .slice(0, 14);

function ensureFile(filePath) {
  if (!fs.existsSync(filePath)) {
    throw new Error(
      "找不到文件：" +
      path.relative(root, filePath)
    );
  }
}

function backup(filePath, label) {
  const backupPath =
    filePath +
    ".bak_" +
    label +
    "_" +
    stamp;

  fs.copyFileSync(
    filePath,
    backupPath
  );

  return backupPath;
}

ensureFile(generatorPath);

backup(
  generatorPath,
  "quick_connect_card_copy"
);

let source = fs.readFileSync(
  generatorPath,
  "utf8"
);

/* =========================================================
   1. 修改卡片三行文案
========================================================= */

const cardFunctionPattern =
  /function\s+makeCardSubtitle\s*\([\s\S]*?\n\}\s*\n\s*function\s+backupFile/;

if (!cardFunctionPattern.test(source)) {
  throw new Error(
    "没有找到makeCardSubtitle函数。"
  );
}

const newCardFunction = `function isMetricTubeSize(value) {
  return /^\\\\d+(?:\\\\.\\\\d+)?\\\\s*mm$/i.test(
    String(value || "").trim()
  );
}

function compactMetricTubeSize(value) {
  return String(value || "")
    .trim()
    .replace(/\\\\s+mm$/i, "mm");
}

function makeCardSubtitle(
  parsed
) {
  /*
   * 快插接头卡片固定三行：
   *
   * 第一行：
   * Q20公端直通带阀快插接头
   *
   * 第二行：
   * 适配1.6mm接管内径
   * 或
   * 适配1/8"-27 NPT螺纹接口
   *
   * 第三行：
   * POM材质，可穿板
   */
  const line1 =
    [
      parsed.series,
      parsed.gender,
      parsed.shape,
      parsed.valved,
      "快插接头",
    ]
      .filter(Boolean)
      .join("");

  const line2 =
    isMetricTubeSize(
      parsed.tubeOrThread
    )
      ? "适配" +
        compactMetricTubeSize(
          parsed.tubeOrThread
        ) +
        "接管内径"
      : "适配" +
        parsed.tubeOrThread +
        "螺纹接口";

  const mountingText =
    parsed.panelMount === "穿板"
      ? "可穿板"
      : "非穿板";

  const line3 =
    parsed.housingMaterial +
    "材质，" +
    mountingText;

  return {
    zh: [
      line1,
      line2,
      line3,
    ].join("\\\\n"),

    en: [
      line1,
      line2,
      line3,
    ].join("\\\\n"),
  };
}

function backupFile`;

source = source.replace(
  cardFunctionPattern,
  newCardFunction
);

/* =========================================================
   2. 从产品筛选值中移除filter08

   密封圈解析数据继续保留，
   但不参与产品中心筛选。
========================================================= */

source = source.replace(
  /\n\s*filter08:\s*parsed\.sealingRingMaterial,\s*/g,
  "\n"
);

/* =========================================================
   3. 从筛选标签数组中删除密封圈材质

   使用数组过滤而不是依赖具体排版，
   避免误删其他筛选项。
========================================================= */

const filterMarker =
  "QUICK_CONNECT_REMOVE_SEAL_FILTER";

if (!source.includes(filterMarker)) {
  const taxonomyMarker =
    "const taxonomyItems = [";

  if (!source.includes(taxonomyMarker)) {
    throw new Error(
      "没有找到taxonomyItems位置。"
    );
  }

  const removeFilterCode = `
/* QUICK_CONNECT_REMOVE_SEAL_FILTER
 *
 * 密封圈材质继续保留在型号解析数据中，
 * 但不在产品中心筛选栏显示。
 */
for (
  let index =
    filterLabels.length - 1;
  index >= 0;
  index -= 1
) {
  if (
    filterLabels[index].filterKey ===
    "filter08"
  ) {
    filterLabels.splice(
      index,
      1
    );
  }
}

`;

  source = source.replace(
    taxonomyMarker,
    removeFilterCode +
    taxonomyMarker
  );
}

fs.writeFileSync(
  generatorPath,
  source,
  "utf8"
);

/* =========================================================
   4. 重新生成快插接头数据
========================================================= */

execFileSync(
  process.execPath,
  [
    generatorPath,
  ],
  {
    cwd: root,
    stdio: "inherit",
  }
);

ensureFile(generatedPath);

const generated = fs.readFileSync(
  generatedPath,
  "utf8"
);

/* =========================================================
   5. 验证结果
========================================================= */

const requiredTexts = [
  "Q20公端直通带阀快插接头",
  "适配1.6mm接管内径",
  "POM材质，可穿板",
];

for (
  const requiredText of
  requiredTexts
) {
  if (
    !generated.includes(
      requiredText
    )
  ) {
    throw new Error(
      "生成结果中缺少：" +
      requiredText
    );
  }
}

if (
  generated.includes(
    '"filterKey": "filter08"'
  )
) {
  throw new Error(
    "密封圈材质筛选仍然存在。"
  );
}

console.log("");
console.log(
  "快插接头卡片文案修改完成。"
);

console.log(
  "第一行：系列+公母端+形状+阀门配置+快插接头"
);

console.log(
  "第二行：适配接管内径或完整螺纹接口"
);

console.log(
  "第三行：本体材质+是否可穿板"
);

console.log(
  "密封圈材质已从筛选页面删除。"
);

console.log(
  "密封圈底层数据仍然保留。"
);

console.log(
  "未新增或修改任何CSS。"
);