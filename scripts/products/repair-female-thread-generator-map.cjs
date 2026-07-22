const fs = require("fs");
const path = require("path");
const childProcess = require("child_process");

const root = process.cwd();

const targetPath = path.join(
  root,
  "scripts",
  "products",
  "generate-female-thread-adapter-selection-and-assets.cjs"
);

if (!fs.existsSync(targetPath)) {
  throw new Error(
    "未找到目标文件：" +
      targetPath
  );
}

let source = fs.readFileSync(
  targetPath,
  "utf8"
);

const stamp = new Date()
  .toISOString()
  .replace(/[-:TZ.]/g, "")
  .slice(0, 14);

const backupPath =
  `${targetPath}.bak_before_map_repair_${stamp}`;

fs.copyFileSync(
  targetPath,
  backupPath
);

/*
 * 当前损坏段落形态：
 *
 * param($m)
 * $m.Value + @'
 *
 * const structureGroupMap = {
 *   ...
 * };
 * '@
 *
 * 将整个损坏段落替换为合法 JavaScript。
 */
const corruptedPattern =
  /\s*param\(\$m\)[\s\S]*?\$m\.Value\s*\+\s*@'[\s\S]*?const\s+structureGroupMap\s*=\s*\{[\s\S]*?\};\s*'@\s*/;

if (!corruptedPattern.test(source)) {
  throw new Error(
    "没有找到已知的 PowerShell 污染段落，未修改文件。"
  );
}

const replacement = `

/*
 * 卡片保留具体连接结构名称。
 */
const structureMap = {
  US: "方形二通",
  PMU: "穿板二通",
  U: "直通二通",
  UT: "T型三通",
  UY: "Y型三通",
  PMBSN: "六角螺母",
  PU: "高压二通",
  PUT: "高压T型三通",
};

/*
 * 左侧筛选只显示二通、三通。
 */
const structureGroupMap = {
  US: "二通",
  PMU: "二通",
  U: "二通",
  PMBSN: "二通",
  PU: "二通",

  UT: "三通",
  UY: "三通",
  PUT: "三通",
};

`;

source = source.replace(
  corruptedPattern,
  replacement
);

/*
 * 确认污染代码已被彻底删除。
 */
const pollutionPatterns = [
  "param($m)",
  "$m.Value",
  "@'",
];

const remainingPollution =
  pollutionPatterns.filter(
    (value) =>
      source.includes(value)
  );

if (remainingPollution.length) {
  throw new Error(
    "文件中仍有污染代码：" +
      remainingPollution.join("、")
  );
}

/*
 * 确认两个映射都存在。
 */
if (
  !source.includes(
    "const structureMap ="
  )
) {
  throw new Error(
    "structureMap 重建失败。"
  );
}

if (
  !source.includes(
    "const structureGroupMap ="
  )
) {
  throw new Error(
    "structureGroupMap 重建失败。"
  );
}

fs.writeFileSync(
  targetPath,
  source,
  "utf8"
);

/*
 * Node 语法检查。
 */
const syntaxResult =
  childProcess.spawnSync(
    process.execPath,
    [
      "--check",
      targetPath,
    ],
    {
      cwd: root,
      encoding: "utf8",
    }
  );

if (syntaxResult.status !== 0) {
  console.error(
    syntaxResult.stderr ||
      syntaxResult.stdout
  );

  throw new Error(
    "重建映射后，生成脚本仍存在其他语法错误。"
  );
}

console.log("");
console.log(
  "============================================"
);
console.log(
  "生成脚本污染段落修复完成"
);
console.log(
  "============================================"
);
console.log(
  "Node 语法检查：通过"
);
console.log(
  "structureMap：已恢复"
);
console.log(
  "structureGroupMap：已恢复"
);
console.log(
  "备份：" + backupPath
);
console.log("");
