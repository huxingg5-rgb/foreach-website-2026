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

if (!fs.existsSync(generatorPath)) {
  throw new Error(
    "未找到生成脚本：" +
      generatorPath
  );
}

let source = fs.readFileSync(
  generatorPath,
  "utf8"
);

const stamp = new Date()
  .toISOString()
  .replace(/[-:TZ.]/g, "")
  .slice(0, 14);

const backupPath =
  `${generatorPath}.bak_force_filter01_${stamp}`;

fs.copyFileSync(
  generatorPath,
  backupPath
);

/* =========================================================
   1. 增加连接结构筛选分组函数

   不依赖 structureMap 的写法和位置。
   ========================================================= */

const helperName =
  "getFemaleThreadStructureGroup";

if (
  !source.includes(
    `function ${helperName}(`
  )
) {
  const parseModelPattern =
    /function\s+parseModel\s*\(\s*model\s*\)\s*\{/;

  const match =
    source.match(
      parseModelPattern
    );

  if (
    !match ||
    match.index == null
  ) {
    throw new Error(
      "没有找到 function parseModel(model)。"
    );
  }

  const helperCode = `function getFemaleThreadStructureGroup(prefix) {
  const twoWayPrefixes = new Set([
    "US",
    "PMU",
    "U",
    "PMBSN",
    "PU",
  ]);

  const threeWayPrefixes = new Set([
    "UT",
    "UY",
    "PUT",
  ]);

  if (
    twoWayPrefixes.has(prefix)
  ) {
    return "二通";
  }

  if (
    threeWayPrefixes.has(prefix)
  ) {
    return "三通";
  }

  throw new Error(
    "无法识别连接结构前缀：" +
      prefix
  );
}

`;

  source =
    source.slice(
      0,
      match.index
    ) +
    helperCode +
    source.slice(
      match.index
    );
}

/* =========================================================
   2. 强制修改产品 filters.filter01

   无论当前使用：
   parsed.structure
   parsed.structureGroup
   还是之前的其他表达式，
   都统一改为根据型号前缀生成二通/三通。
   ========================================================= */

const filtersPattern =
  /(const\s+filters\s*=\s*\{[\s\S]*?filter01\s*:\s*)([^,\r\n]+)(,)/;

const filtersMatch =
  source.match(
    filtersPattern
  );

if (!filtersMatch) {
  throw new Error(
    "没有找到 const filters 中的 filter01。"
  );
}

source = source.replace(
  filtersPattern,
  `$1getFemaleThreadStructureGroup(parsed.prefix)$3`
);

/* =========================================================
   3. 验证生成脚本修改结果
   ========================================================= */

if (
  !source.includes(
    "filter01:\n        getFemaleThreadStructureGroup(parsed.prefix),"
  ) &&
  !/filter01\s*:\s*getFemaleThreadStructureGroup\(parsed\.prefix\)/.test(
    source
  )
) {
  throw new Error(
    "filter01 修改验证失败。"
  );
}

fs.writeFileSync(
  generatorPath,
  source,
  "utf8"
);

console.log("");
console.log(
  "生成脚本修改完成。"
);
console.log(
  "备份：" + backupPath
);
console.log("");
console.log(
  "正在重新生成数据……"
);

/* =========================================================
   4. 重新生成
   ========================================================= */

childProcess.execFileSync(
  process.execPath,
  [generatorPath],
  {
    cwd: root,
    stdio: "inherit",
  }
);

/* =========================================================
   5. 验证生成文件
   ========================================================= */

const generatedPath = path.join(
  root,
  "data",
  "products",
  "selection",
  "female-thread-adapter-selection.generated.ts"
);

if (!fs.existsSync(generatedPath)) {
  throw new Error(
    "重新生成后未找到数据文件。"
  );
}

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

const correct =
  values.length === 2 &&
  values.includes("二通") &&
  values.includes("三通");

if (!correct) {
  throw new Error(
    "生成结果仍不正确：" +
      values.join("、")
  );
}

/* 验证具体卡片名称仍然存在 */
const detailedTitles = [
  "方形二通",
  "穿板二通",
  "直通二通",
  "T型三通",
  "Y型三通",
  "高压二通",
  "高压T型三通",
];

const titleCount =
  detailedTitles.filter(
    (title) =>
      generated.includes(
        `"zh": "${title}"`
      )
  ).length;

console.log("");
console.log(
  "============================================"
);
console.log(
  "连接结构筛选修改成功"
);
console.log(
  "============================================"
);
console.log(
  "筛选项：二通、三通"
);
console.log(
  `保留具体卡片名称：${titleCount} 种`
);
console.log("");
