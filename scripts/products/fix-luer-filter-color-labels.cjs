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

if (!fs.existsSync(generatorPath)) {
  throw new Error(
    "未找到鲁尔接头生成脚本：" +
      generatorPath
  );
}

const stamp = new Date()
  .toISOString()
  .replace(/[-:TZ.]/g, "")
  .slice(0, 14);

const backupPath =
  generatorPath +
  ".bak_filter_color_labels_" +
  stamp;

fs.copyFileSync(
  generatorPath,
  backupPath
);

let source = fs.readFileSync(
  generatorPath,
  "utf8"
);

/*
 * 卡片显示普通中文颜色；
 * 筛选项显示颜色代码和中文名称。
 */
const colorMapCode = `const colorMap = {
  B: "黑色",
  Y: "黄色",
  U: "蓝色",
  R: "红色",
  O: "橙色",
  G: "绿色",
  W: "白色",
  N: "本色",
};

const colorFilterMap = {
  B: "B - 黑色",
  Y: "Y - 黄色",
  U: "U - 蓝色",
  R: "R - 红色",
  O: "O - 橙色",
  G: "G - 绿色",
  W: "W - 白色",
  N: "N - 本色",
};`;

const colorMapPattern =
  /const colorMap = \{[\s\S]*?\};(?:\s*const colorFilterMap = \{[\s\S]*?\};)?/;

if (!colorMapPattern.test(source)) {
  throw new Error(
    "没有找到 colorMap。"
  );
}

source = source.replace(
  colorMapPattern,
  colorMapCode
);

/*
 * 为型号解析结果增加筛选专用颜色。
 */
if (
  !source.includes(
    "colorFilter:"
  )
) {
  const colorParsePattern =
    /color:\s*colorMap\[colorCode\]\s*\|\|\s*colorCode,/;

  if (
    !colorParsePattern.test(source)
  ) {
    throw new Error(
      "没有找到颜色解析代码。"
    );
  }

  source = source.replace(
    colorParsePattern,
    `color:
      colorMap[colorCode] ||
      colorCode,
    colorFilter:
      colorFilterMap[colorCode] ||
      colorCode,`
  );
}

/*
 * filter06 改用带编码的筛选名称。
 */
source = source.replace(
  /filter06:\s*parsed\.color,/g,
  "filter06: parsed.colorFilter,"
);

if (
  !source.includes(
    "filter06: parsed.colorFilter,"
  )
) {
  throw new Error(
    "filter06 修改失败。"
  );
}

fs.writeFileSync(
  generatorPath,
  source,
  "utf8"
);

console.log(
  "生成脚本颜色规则修改完成。"
);
console.log(
  "正在重新生成鲁尔接头数据……"
);

childProcess.execFileSync(
  process.execPath,
  [generatorPath],
  {
    cwd: root,
    stdio: "inherit",
  }
);

/*
 * 验证最终生成文件。
 */
const generatedSource =
  fs.readFileSync(
    generatedPath,
    "utf8"
  );

const requiredLabels = [
  "B - 黑色",
  "Y - 黄色",
  "U - 蓝色",
  "R - 红色",
  "O - 橙色",
  "G - 绿色",
  "W - 白色",
  "N - 本色",
];

const missingLabels =
  requiredLabels.filter(
    (label) =>
      !generatedSource.includes(
        `"filter06": "${label}"`
      )
  );

if (missingLabels.length) {
  throw new Error(
    "生成数据仍缺少颜色：" +
      missingLabels.join("、")
  );
}

console.log("");
console.log("============================================");
console.log("鲁尔接头筛选颜色修改完成");
console.log("============================================");
console.log("B - 黑色");
console.log("Y - 黄色");
console.log("U - 蓝色");
console.log("R - 红色");
console.log("O - 橙色");
console.log("G - 绿色");
console.log("W - 白色");
console.log("N - 本色");
console.log("");
console.log(
  "卡片仍显示普通中文颜色，不显示编码。"
);
