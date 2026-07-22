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
  `${targetPath}.bak_remove_model3DUrl_${stamp}`;

fs.copyFileSync(
  targetPath,
  backupPath
);

/*
 * 删除仅大小写不同的重复别名：
 *
 * model3dUrl  保留
 * model3DUrl  删除
 * modelUrl    暂时保留兼容
 */
const duplicatePattern =
  /\n\s*model3DUrl\s*:\s*\n\s*model3dUrl\s*,/g;

const matches =
  source.match(
    duplicatePattern
  ) || [];

if (matches.length !== 1) {
  throw new Error(
    "预期找到1处 model3DUrl 重复字段，实际找到：" +
      matches.length
  );
}

source = source.replace(
  duplicatePattern,
  ""
);

if (
  /\bmodel3DUrl\s*:/.test(
    source
  )
) {
  throw new Error(
    "删除后生成脚本中仍存在 model3DUrl。"
  );
}

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
    "修改后语法检查失败，已自动恢复备份。"
  );
}

console.log("");
console.log(
  "============================================"
);
console.log(
  "重复3D字段清理完成"
);
console.log(
  "============================================"
);
console.log(
  "保留：model3dUrl"
);
console.log(
  "删除：model3DUrl"
);
console.log(
  "保留兼容字段：modelUrl"
);
console.log(
  "Node语法检查：通过"
);
console.log(
  "备份：" + backupPath
);
console.log("");
