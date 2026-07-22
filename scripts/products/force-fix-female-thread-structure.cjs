const fs = require("fs");
const path = require("path");
const childProcess = require("child_process");

const root = process.cwd();

const generatorPath = path.join(
  root,
  "scripts",
  "products",
  "generate-female-thread-adapter-selection-and-assets.cjs"
);

let source = fs.readFileSync(
  generatorPath,
  "utf8"
);

const stamp = new Date()
  .toISOString()
  .replace(/[-:TZ.]/g, "")
  .slice(0, 14);

fs.copyFileSync(
  generatorPath,
  `${generatorPath}.bak_force_structure_${stamp}`
);

/*
 * 删除已有的旧分组映射，避免重复或内容错误。
 */
source = source.replace(
  /\nconst structureGroupMap = \{[\s\S]*?\};\n/g,
  "\n"
);

/*
 * 在 structureMap 后重新插入正确分组。
 */
const structureMapMatch =
  source.match(
    /const structureMap = \{[\s\S]*?\};/
  );

if (!structureMapMatch) {
  throw new Error(
    "没有找到 structureMap。"
  );
}

const groupMap = `${structureMapMatch[0]}

const structureGroupMap = {
  US: "二通",
  PMU: "二通",
  U: "二通",
  PMBSN: "二通",
  PU: "二通",

  UT: "三通",
  UY: "三通",
  PUT: "三通",
};`;

source = source.replace(
  structureMapMatch[0],
  groupMap
);

/*
 * 清除可能已经插入的旧 structureGroup 字段。
 */
source = source.replace(
  /\n\s*structureGroup:\s*\n?\s*structureGroupMap\[prefix\]\s*\|\|\s*\n?\s*structureMap\[prefix\]\s*\|\|\s*\n?\s*prefix,/g,
  ""
);

/*
 * 在 parseModel 返回值中重新加入 structureGroup。
 */
source = source.replace(
  /(\s+structure:\s*\n\s*structureMap\[prefix\]\s*\|\|\s*\n\s*prefix,)/,
  `$1

    structureGroup:
      structureGroupMap[prefix] ||
      structureMap[prefix] ||
      prefix,`
);

/*
 * 强制将产品筛选 filter01 改成结构分组。
 */
source = source.replace(
  /filter01:\s*\n\s*parsed\.structure(?:Group)?,/,
  `filter01:
        parsed.structureGroup,`
);

const checks = [
  source.includes(
    'US: "二通"'
  ),
  source.includes(
    'UT: "三通"'
  ),
  source.includes(
    "structureGroup:"
  ),
  /filter01:\s*\n\s*parsed\.structureGroup,/.test(
    source
  ),
];

if (checks.some((item) => !item)) {
  throw new Error(
    "生成脚本修改验证失败。"
  );
}

fs.writeFileSync(
  generatorPath,
  source,
  "utf8"
);

childProcess.execFileSync(
  process.execPath,
  [generatorPath],
  {
    cwd: root,
    stdio: "inherit",
  }
);

const generatedPath = path.join(
  root,
  "data",
  "products",
  "selection",
  "female-thread-adapter-selection.generated.ts"
);

const generated =
  fs.readFileSync(
    generatedPath,
    "utf8"
  );

const values = Array.from(
  new Set(
    [...generated.matchAll(
      /"filter01":\s*"([^"]+)"/g
    )].map(
      (match) =>
        match[1]
    )
  )
);

console.log("");
console.log(
  "当前连接结构筛选：",
  values
);

if (
  values.length !== 2 ||
  !values.includes("二通") ||
  !values.includes("三通")
) {
  throw new Error(
    "生成结果仍不正确：" +
      values.join("、")
  );
}

console.log("");
console.log(
  "连接结构筛选已成功改为：二通、三通"
);
