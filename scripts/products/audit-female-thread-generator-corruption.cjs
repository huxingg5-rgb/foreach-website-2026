const fs = require("fs");
const path = require("path");
const childProcess = require("child_process");

const root = process.cwd();

const scriptsDir = path.join(
  root,
  "scripts",
  "products"
);

const generatorName =
  "generate-female-thread-adapter-selection-and-assets.cjs";

const generatorPath = path.join(
  scriptsDir,
  generatorName
);

const reportPath = path.join(
  root,
  "reports",
  "female-thread-generator-corruption-audit.md"
);

function read(filePath) {
  return fs.readFileSync(
    filePath,
    "utf8"
  );
}

function escapeMarkdown(value) {
  return String(value)
    .replace(/`/g, "\\`")
    .replace(/\|/g, "\\|");
}

function checkSyntax(filePath) {
  const result =
    childProcess.spawnSync(
      process.execPath,
      [
        "--check",
        filePath,
      ],
      {
        encoding: "utf8",
      }
    );

  return {
    valid:
      result.status === 0,

    status:
      result.status,

    stdout:
      String(
        result.stdout || ""
      ).trim(),

    stderr:
      String(
        result.stderr || ""
      ).trim(),
  };
}

function getContext(
  source,
  lineNumber,
  before = 12,
  after = 18
) {
  const lines =
    source.split(/\r?\n/);

  const index =
    Math.max(
      0,
      lineNumber - 1
    );

  const start =
    Math.max(
      0,
      index - before
    );

  const end =
    Math.min(
      lines.length - 1,
      index + after
    );

  return lines
    .slice(
      start,
      end + 1
    )
    .map(
      (line, offset) =>
        `${String(
          start +
            offset +
            1
        ).padStart(5, " ")} | ${line}`
    )
    .join("\n");
}

function findSuspiciousLines(
  source
) {
  const suspiciousPatterns = [
    {
      label:
        "PowerShell 变量",
      regex:
        /\$[a-zA-Z_][a-zA-Z0-9_.]*/,
    },
    {
      label:
        "PowerShell Here-String 开始",
      regex:
        /@['"]/,
    },
    {
      label:
        "PowerShell Set-Content",
      regex:
        /\bSet-Content\b/,
    },
    {
      label:
        "PowerShell Replace 回调",
      regex:
        /\$m\.Value/,
    },
    {
      label:
        "PowerShell 参数",
      regex:
        /-(LiteralPath|Encoding|Value|Destination)\b/,
    },
    {
      label:
        "PowerShell Write-Host",
      regex:
        /\bWrite-Host\b/,
    },
  ];

  const lines =
    source.split(/\r?\n/);

  const result = [];

  lines.forEach(
    (line, index) => {
      for (
        const pattern
        of suspiciousPatterns
      ) {
        if (
          pattern.regex.test(line)
        ) {
          result.push({
            lineNumber:
              index + 1,
            label:
              pattern.label,
            content:
              line,
          });

          break;
        }
      }
    }
  );

  return result;
}

if (!fs.existsSync(generatorPath)) {
  throw new Error(
    "未找到当前生成脚本：" +
      generatorPath
  );
}

const currentSource =
  read(generatorPath);

const currentSyntax =
  checkSyntax(generatorPath);

const suspiciousLines =
  findSuspiciousLines(
    currentSource
  );

const backupFiles =
  fs.readdirSync(scriptsDir)
    .filter(
      (fileName) =>
        fileName.startsWith(
          generatorName +
            ".bak_"
        )
    )
    .map(
      (fileName) => {
        const filePath =
          path.join(
            scriptsDir,
            fileName
          );

        const stat =
          fs.statSync(
            filePath
          );

        const syntax =
          checkSyntax(
            filePath
          );

        const source =
          read(filePath);

        return {
          fileName,
          filePath,
          modifiedAt:
            stat.mtime,
          size:
            stat.size,
          syntax,
          suspiciousCount:
            findSuspiciousLines(
              source
            ).length,
        };
      }
    )
    .sort(
      (a, b) =>
        b.modifiedAt.getTime() -
        a.modifiedAt.getTime()
    );

const validBackups =
  backupFiles.filter(
    (item) =>
      item.syntax.valid
  );

const newestValidBackup =
  validBackups[0] || null;

const report = [];

report.push(
  "# 内螺纹互转生成脚本污染检查"
);
report.push("");

report.push(
  `生成时间：${new Date().toLocaleString("zh-CN")}`
);
report.push("");

report.push(
  "> 本次只检查，没有修改或恢复任何文件。"
);
report.push("");

report.push(
  "## 1. 当前生成脚本"
);
report.push("");

report.push(
  `- 文件：\`${generatorPath}\``
);
report.push(
  `- 文件大小：${Buffer.byteLength(currentSource, "utf8")} bytes`
);
report.push(
  `- 总行数：${currentSource.split(/\r?\n/).length}`
);
report.push(
  `- Node 语法检查：${currentSyntax.valid ? "✅ 通过" : "❌ 失败"}`
);
report.push(
  `- 可疑 PowerShell 内容：${suspiciousLines.length} 处`
);
report.push("");

if (!currentSyntax.valid) {
  report.push(
    "### Node 语法错误"
  );
  report.push("");
  report.push("```text");
  report.push(
    currentSyntax.stderr ||
      currentSyntax.stdout ||
      "无错误信息"
  );
  report.push("```");
  report.push("");
}

report.push(
  "## 2. 第 235 行附近"
);
report.push("");
report.push("```text");
report.push(
  getContext(
    currentSource,
    235,
    20,
    30
  )
);
report.push("```");
report.push("");

report.push(
  "## 3. 可疑内容"
);
report.push("");

if (!suspiciousLines.length) {
  report.push(
    "未发现典型 PowerShell 代码。"
  );
  report.push("");
} else {
  report.push(
    "| 行号 | 类型 | 内容 |"
  );
  report.push(
    "|---:|---|---|"
  );

  for (
    const item
    of suspiciousLines
  ) {
    report.push(
      `| ${item.lineNumber} | ${escapeMarkdown(item.label)} | \`${escapeMarkdown(item.content.trim())}\` |`
    );
  }

  report.push("");
}

report.push(
  "## 4. 现有备份语法检查"
);
report.push("");

if (!backupFiles.length) {
  report.push(
    "没有找到生成脚本备份。"
  );
  report.push("");
} else {
  report.push(
    "| 备份文件 | 修改时间 | 大小 | Node语法 | 可疑内容 |"
  );
  report.push(
    "|---|---|---:|---|---:|"
  );

  for (
    const item
    of backupFiles
  ) {
    report.push(
      `| ${escapeMarkdown(item.fileName)} | ${item.modifiedAt.toLocaleString("zh-CN")} | ${item.size} | ${item.syntax.valid ? "✅ 通过" : "❌ 失败"} | ${item.suspiciousCount} |`
    );
  }

  report.push("");
}

report.push(
  "## 5. 最近的有效备份"
);
report.push("");

if (newestValidBackup) {
  report.push(
    `- 文件：\`${newestValidBackup.filePath}\``
  );
  report.push(
    `- 修改时间：${newestValidBackup.modifiedAt.toLocaleString("zh-CN")}`
  );
  report.push(
    `- 文件大小：${newestValidBackup.size}`
  );
  report.push(
    `- 可疑内容：${newestValidBackup.suspiciousCount} 处`
  );
} else {
  report.push(
    "未找到通过 Node 语法检查的备份。"
  );
}

report.push("");

report.push(
  "## 6. 检查结论"
);
report.push("");

if (
  !currentSyntax.valid &&
  newestValidBackup
) {
  report.push(
    "当前生成脚本已损坏，但存在语法正常的备份。下一步应对比当前文件和最近有效备份，只恢复损坏段落，不直接覆盖现有有效修改。"
  );
} else if (
  !currentSyntax.valid
) {
  report.push(
    "当前生成脚本已损坏，并且没有找到语法正常的备份，需要根据脚本结构重建损坏区域。"
  );
} else {
  report.push(
    "当前生成脚本语法正常，问题需要继续检查生成逻辑。"
  );
}

report.push("");

fs.mkdirSync(
  path.dirname(reportPath),
  {
    recursive: true,
  }
);

fs.writeFileSync(
  reportPath,
  report.join("\n") + "\n",
  "utf8"
);

console.log("");
console.log(
  "============================================"
);
console.log(
  "生成脚本污染检查完成"
);
console.log(
  "============================================"
);
console.log(
  `当前语法：${currentSyntax.valid ? "通过" : "失败"}`
);
console.log(
  `可疑内容：${suspiciousLines.length} 处`
);
console.log(
  `备份数量：${backupFiles.length}`
);
console.log(
  `有效备份：${validBackups.length}`
);

if (newestValidBackup) {
  console.log(
    "最近有效备份："
  );
  console.log(
    newestValidBackup.filePath
  );
}

console.log("");
console.log(
  `报告：${reportPath}`
);
console.log("");
console.log(
  "本次未修改任何项目文件。"
);
