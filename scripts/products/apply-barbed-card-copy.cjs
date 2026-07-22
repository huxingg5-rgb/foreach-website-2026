const fs = require("fs");
const path = require("path");

const root = process.cwd();

const generatedPath = path.join(
  root,
  "data",
  "products",
  "selection",
  "barbed-fitting-selection.generated.ts"
);

if (!fs.existsSync(generatedPath)) {
  throw new Error(
    `File not found: ${generatedPath}`
  );
}

const stamp = new Date()
  .toISOString()
  .replace(/[-:T.Z]/g, "")
  .slice(0, 14);

const backupPath =
  `${generatedPath}.bak_card_copy_${stamp}`;

fs.copyFileSync(
  generatedPath,
  backupPath
);

let content = fs
  .readFileSync(generatedPath, "utf8")
  .replace(/\r\n/g, "\n");

/*
 * 左侧筛选标题：
 * 主体材质 → 材质
 */
content = content.replace(
  /主体材质/g,
  "材质"
);

/*
 * 同时兼容：
 * 1. TS字符串中的 \n
 * 2. 模板字符串中的真实换行
 */
const separator =
  String.raw`(?:\\n|\n)`;

const cardPattern = new RegExp(
  [
    "(",
    "直通型倒刺接头",
    "|L型倒刺接头",
    "|T型倒刺接头",
    "|Y型倒刺接头",
    "|π型倒刺接头",
    "|十字型倒刺接头",
    "|倒刺堵头",
    ")",
    separator,
    "接管内径：\\s*",
    "([^\"\\r\\n]+?)",
    separator,
    "(PP|PA|PVDF|AC)",
    "\\s*主体\\s*[｜|]\\s*",
    "(本色|白色)"
  ].join(""),
  "g"
);

const nameMap = {
  "直通型倒刺接头": "直通",
  "L型倒刺接头": "L型",
  "T型倒刺接头": "T型",
  "Y型倒刺接头": "Y型",
  "π型倒刺接头": "π型四通",
  "十字型倒刺接头": "十字型四通",
  "倒刺堵头": "倒刺堵头",
};

let replacedCount = 0;

content = content.replace(
  cardPattern,
  (
    fullText,
    oldName,
    diameterText,
    material,
    color
  ) => {
    replacedCount += 1;

    const newline =
      fullText.includes("\\n")
        ? "\\n"
        : "\n";

    const diameters =
      diameterText.match(
        /\d+(?:\.\d+)?/g
      ) || [];

    const uniqueDiameters = [
      ...new Set(diameters),
    ];

    const baseName =
      nameMap[oldName] || oldName;

    const isReducer =
      uniqueDiameters.length > 1;

    let productName;

    if (baseName === "倒刺堵头") {
      productName =
        "倒刺堵头";
    } else {
      productName =
        `${baseName}${
          isReducer ? "异径" : ""
        }倒刺接头`;
    }

    let tubeDescription;

    if (diameters.length === 0) {
      tubeDescription =
        `适用${diameterText.trim()}内径软管`;
    } else if (
      uniqueDiameters.length === 1
    ) {
      tubeDescription =
        `适用${uniqueDiameters[0]} mm内径软管`;
    } else if (
      oldName === "直通型倒刺接头" ||
      oldName === "L型倒刺接头"
    ) {
      tubeDescription =
        `适用${diameters[0]} mm转${
          diameters[diameters.length - 1]
        } mm内径软管`;
    } else {
      tubeDescription =
        `适用${diameters.join(
          " / "
        )} mm内径软管`;
    }

    const materialDescription =
      `${material}材质，${color}`;

    return [
      productName,
      tubeDescription,
      materialDescription,
    ].join(newline);
  }
);

if (replacedCount === 0) {
  throw new Error(
    "No barbed fitting card descriptions were matched. The generated file format may have changed."
  );
}

fs.writeFileSync(
  generatedPath,
  content,
  "utf8"
);

console.log("");
console.log(
  `Updated card descriptions: ${replacedCount}`
);
console.log(
  "Filter label updated: 主体材质 -> 材质"
);
console.log(
  `Backup: ${path.relative(
    root,
    backupPath
  )}`
);
console.log("");
console.log("Update completed.");