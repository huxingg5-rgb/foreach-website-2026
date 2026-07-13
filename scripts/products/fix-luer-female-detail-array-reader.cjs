const fs = require("fs");
const path = require("path");
const childProcess = require("child_process");

const root = process.cwd();

const targetPath = path.join(
  root,
  "scripts",
  "products",
  "generate-luer-female-thread-detail-data.cjs"
);

if (!fs.existsSync(targetPath)) {
  throw new Error(
    "未找到详情生成脚本：" +
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
  `${targetPath}.bak_array_reader_${stamp}`;

fs.copyFileSync(
  targetPath,
  backupPath
);

/*
 * 旧逻辑：
 * 从导出名称后直接寻找第一个 [
 *
 * 问题：
 * 会匹配 ProductSelectionProduct[] 类型声明，
 * 从而解析成空数组。
 */
const oldCode = `  const arrayStart =
    source.indexOf(
      "[",
      markerIndex
    );

  if (arrayStart < 0) {
    throw new Error(
      \`\${exportName} 没有数组起点。\`
    );
  }`;

/*
 * 新逻辑：
 * 先定位赋值符号 =，
 * 再从 = 后寻找真正的数据数组 [。
 */
const newCode = `  const assignmentIndex =
    source.indexOf(
      "=",
      markerIndex
    );

  if (assignmentIndex < 0) {
    throw new Error(
      \`\${exportName} 没有找到赋值符号。\`
    );
  }

  const arrayStart =
    source.indexOf(
      "[",
      assignmentIndex
    );

  if (arrayStart < 0) {
    throw new Error(
      \`\${exportName} 没有数组起点。\`
    );
  }`;

if (!source.includes(oldCode)) {
  throw new Error(
    "没有找到旧的数组起点读取代码，本次未修改。"
  );
}

source = source.replace(
  oldCode,
  newCode
);

fs.writeFileSync(
  targetPath,
  source,
  "utf8"
);

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

  fs.copyFileSync(
    backupPath,
    targetPath
  );

  throw new Error(
    "修改后语法检查失败，已恢复原文件。"
  );
}

console.log("");
console.log(
  "============================================"
);
console.log(
  "详情数据数组读取器修复完成"
);
console.log(
  "============================================"
);
console.log(
  "Node语法检查：通过"
);
console.log(
  "现在会跳过 ProductSelectionProduct[] 类型声明"
);
console.log(
  "并读取等号后的真实产品数组"
);
console.log(
  "备份：" + backupPath
);
console.log("");
