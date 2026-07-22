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

/*
 * 修改前先确认生成脚本语法正常。
 */
const beforeCheck =
  childProcess.spawnSync(
    process.execPath,
    [
      "--check",
      generatorPath,
    ],
    {
      cwd: root,
      encoding: "utf8",
    }
  );

if (beforeCheck.status !== 0) {
  console.error(
    beforeCheck.stderr ||
      beforeCheck.stdout
  );

  throw new Error(
    "当前生成脚本仍有语法错误，本次未修改。"
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
  `${generatorPath}.bak_card_copy_${stamp}`;

fs.copyFileSync(
  generatorPath,
  backupPath
);

/* =========================================================
   1. 重写卡片三行文案
   ========================================================= */

const subtitlePattern =
  /function createCardSubtitle\(parsed\) \{[\s\S]*?\n\}\n\nconst workbookPath/;

if (!subtitlePattern.test(source)) {
  throw new Error(
    "没有找到 createCardSubtitle 函数。"
  );
}

const subtitleCode = `function createCardSubtitle(parsed) {
  const threadText =
    parsed.threads.length > 1
      ? parsed.threads.join("转")
      : parsed.threads[0] || "";

  const line1 = [
    parsed.structureGroup,
    threadText
      ? \`\${threadText}螺纹互转\`
      : "",
  ]
    .filter(Boolean)
    .join("");

  const compactDiameter =
    String(
      parsed.diameter || ""
    ).replace(
      /\\s+/g,
      ""
    );

  const line2 =
    compactDiameter
      ? \`通径为\${compactDiameter}\`
      : "";

  const line3 =
    parsed.material
      ? \`\${String(parsed.material).toUpperCase()}材质\`
      : "";

  return [
    line1,
    line2,
    line3,
  ]
    .filter(Boolean)
    .join("\\n");
}

const workbookPath`;

source = source.replace(
  subtitlePattern,
  subtitleCode
);

/* =========================================================
   2. 卡片标题改为完整型号
   ========================================================= */

const titlePattern =
  /cardTitle:\s*\{\s*zh:\s*parsed\.structure,\s*en:\s*parsed\.structure,\s*\}/;

if (!titlePattern.test(source)) {
  throw new Error(
    "没有找到当前卡片标题代码。"
  );
}

source = source.replace(
  titlePattern,
  `cardTitle: {
        zh:
          model,

        en:
          model,
      }`
);

/* =========================================================
   3. 修改后语法检查
   ========================================================= */

fs.writeFileSync(
  generatorPath,
  source,
  "utf8"
);

const afterCheck =
  childProcess.spawnSync(
    process.execPath,
    [
      "--check",
      generatorPath,
    ],
    {
      cwd: root,
      encoding: "utf8",
    }
  );

if (afterCheck.status !== 0) {
  console.error(
    afterCheck.stderr ||
      afterCheck.stdout
  );

  fs.copyFileSync(
    backupPath,
    generatorPath
  );

  throw new Error(
    "修改后语法检查失败，已自动恢复备份。"
  );
}

/* =========================================================
   4. 重新生成数据
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

const checks = [
  generated.includes(
    '"zh": "UT-U28-15-PP-N"'
  ),

  generated.includes(
    "三通1/4-28 UNF螺纹互转"
  ),

  generated.includes(
    "通径为1.5mm"
  ),

  generated.includes(
    "PP材质"
  ),
];

if (
  checks.some(
    (passed) =>
      !passed
  )
) {
  throw new Error(
    "生成后的卡片文案验证失败。"
  );
}

console.log("");
console.log(
  "============================================"
);
console.log(
  "内螺纹互转卡片文案修改完成"
);
console.log(
  "============================================"
);
console.log(
  "标题：完整型号"
);
console.log(
  "第一行：二通/三通 + 螺纹互转"
);
console.log(
  "第二行：通径为Xmm"
);
console.log(
  "第三行：XX材质"
);
console.log(
  "颜色：仅保留在筛选中"
);
console.log("");
console.log(
  "示例："
);
console.log(
  "UT-U28-15-PP-N"
);
console.log(
  "三通1/4-28 UNF螺纹互转"
);
console.log(
  "通径为1.5mm"
);
console.log(
  "PP材质"
);
console.log("");
