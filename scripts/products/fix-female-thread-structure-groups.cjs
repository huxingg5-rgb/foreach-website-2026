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
  generatorPath +
  ".bak_structure_groups_" +
  stamp;

fs.copyFileSync(
  generatorPath,
  backupPath
);

/* =========================================================
   1. 增加筛选分组映射
   ========================================================= */

if (
  !source.includes(
    "const structureGroupMap ="
  )
) {
  const structureMapPattern =
    /const structureMap = \{[\s\S]*?\};/;

  const match =
    source.match(
      structureMapPattern
    );

  if (!match) {
    throw new Error(
      "没有找到 structureMap。"
    );
  }

  const groupMapCode = `${match[0]}

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
    match[0],
    groupMapCode
  );
}

/* =========================================================
   2. parseModel 增加 structureGroup
   ========================================================= */

if (
  !source.includes(
    "structureGroup:"
  )
) {
  const oldStructure = `    structure:
      structureMap[prefix] ||
      prefix,`;

  const newStructure = `    structure:
      structureMap[prefix] ||
      prefix,

    structureGroup:
      structureGroupMap[prefix] ||
      structureMap[prefix] ||
      prefix,`;

  if (
    !source.includes(
      oldStructure
    )
  ) {
    throw new Error(
      "没有找到 parseModel 中的 structure 返回代码。"
    );
  }

  source = source.replace(
    oldStructure,
    newStructure
  );
}

/* =========================================================
   3. filter01 使用二通 / 三通
   ========================================================= */

if (
  source.includes(
    "filter01:\n        parsed.structure,"
  )
) {
  source = source.replace(
    "filter01:\n        parsed.structure,",
    "filter01:\n        parsed.structureGroup,"
  );
}

/* =========================================================
   4. 最终验证
   ========================================================= */

const checks = {
  groupMap:
    source.includes(
      "const structureGroupMap ="
    ),

  structureGroup:
    source.includes(
      "structureGroup:"
    ),

  filterUsesGroup:
    source.includes(
      "filter01:\n        parsed.structureGroup,"
    ),
};

const failed =
  Object.entries(checks)
    .filter(
      ([, passed]) =>
        !passed
    )
    .map(
      ([name]) =>
        name
    );

if (failed.length) {
  throw new Error(
    "结构筛选修改失败：" +
      failed.join("、")
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
  "正在重新生成内螺纹互转接头数据……"
);

childProcess.execFileSync(
  process.execPath,
  [generatorPath],
  {
    cwd: root,
    stdio: "inherit",
  }
);

/* =========================================================
   5. 验证生成结果
   ========================================================= */

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

const structureValues = Array.from(
  new Set(
    [
      ...generated.matchAll(
        /"filter01":\s*"([^"]+)"/g
      ),
    ].map(
      (match) =>
        match[1]
    )
  )
);

const unexpected =
  structureValues.filter(
    (value) =>
      ![
        "二通",
        "三通",
      ].includes(value)
  );

if (unexpected.length) {
  throw new Error(
    "生成结果仍存在其他连接结构：" +
      unexpected.join("、")
  );
}

console.log("");
console.log(
  "============================================"
);
console.log(
  "连接结构筛选修改完成"
);
console.log(
  "============================================"
);
console.log(
  "筛选项：二通、三通"
);
console.log(
  "卡片标题：仍保留具体结构名称"
);
console.log("");
