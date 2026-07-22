# ============================================================
# 接头兼容型号查询页面：
# 在搜索区域与“兼容产品”标题之间增加 24px 空白
#
# 只修改：
# app/resources/selection-support/fitting-replacement/fitting-replacement.css
#
# 新增规则：
# .fitting-replacement-page .frp-card-section {
#   padding-top: 24px;
# }
#
# 不修改：
# - Banner 与面包屑间距
# - 搜索栏尺寸
# - 产品卡片
# - 公共 Breadcrumb
# - 其他资源页面
#
# 构建失败自动回滚。
# ============================================================

$ErrorActionPreference = 'Stop'

$projectRoot = 'F:\WebsiteProjects\foreach-website-2026'

$cssFile = Join-Path `
    $projectRoot `
    'app\resources\selection-support\fitting-replacement\fitting-replacement.css'

$tempNodeScript = Join-Path `
    $projectRoot `
    '.add-fitting-card-section-top-gap.cjs'

if (-not (Test-Path -LiteralPath $projectRoot)) {
    throw "没有找到官网项目目录：$projectRoot"
}

if (-not (Test-Path -LiteralPath $cssFile)) {
    throw "没有找到样式文件：$cssFile"
}

Set-Location -LiteralPath $projectRoot

$nodeScript = @'
const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");

const root = process.cwd();

const cssPath = path.join(
  root,
  "app/resources/selection-support/fitting-replacement/fitting-replacement.css"
);

const START_MARKER =
  "FITTING_REPLACEMENT_CARD_SECTION_TOP_GAP_START";

const END_MARKER =
  "FITTING_REPLACEMENT_CARD_SECTION_TOP_GAP_END";

function rel(filePath) {
  return path
    .relative(root, filePath)
    .replace(/\\/g, "/");
}

function ensureDirectory(directory) {
  fs.mkdirSync(directory, {
    recursive: true,
  });
}

function createStamp() {
  const now = new Date();
  const pad = (value) =>
    String(value).padStart(2, "0");

  return [
    now.getFullYear(),
    pad(now.getMonth() + 1),
    pad(now.getDate()),
    "-",
    pad(now.getHours()),
    pad(now.getMinutes()),
    pad(now.getSeconds()),
  ].join("");
}

if (!fs.existsSync(cssPath)) {
  throw new Error(
    `没有找到样式文件：${rel(cssPath)}`
  );
}

const originalSource = fs.readFileSync(
  cssPath,
  "utf8"
);

let updatedSource = originalSource;

const existingBlockPattern = new RegExp(
  `/\\* ${START_MARKER} \\*/[\\s\\S]*?/\\* ${END_MARKER} \\*/`,
  "m"
);

const newBlock = `/* ${START_MARKER} */
.fitting-replacement-page .frp-card-section {
  padding-top: 24px;
}
/* ${END_MARKER} */`;

if (existingBlockPattern.test(updatedSource)) {
  updatedSource = updatedSource.replace(
    existingBlockPattern,
    newBlock
  );
} else {
  updatedSource =
    updatedSource.replace(
      /\s*$/,
      ""
    ) +
    `

/* =========================================================
   接头兼容型号查询页面｜兼容产品区域顶部增加 24px 空白

   说明：
   1. 搜索区域结束后增加一段清晰的白色留白
   2. “兼容产品”标题整体向下移动 24px
   3. 只作用于接头兼容型号查询页面
========================================================= */
${newBlock}
`;
}

if (
  !updatedSource.includes(
    ".fitting-replacement-page .frp-card-section"
  ) ||
  !updatedSource.includes(
    "padding-top: 24px;"
  )
) {
  throw new Error(
    "新样式生成失败。"
  );
}

const stamp = createStamp();

const backupDirectory = path.join(
  root,
  `.local-backups/fitting-card-section-gap-${stamp}`
);

const reportDirectory = path.join(
  root,
  `audit-reports/fitting-card-section-gap/${stamp}`
);

ensureDirectory(backupDirectory);
ensureDirectory(reportDirectory);

const backupPath = path.join(
  backupDirectory,
  rel(cssPath)
);

ensureDirectory(
  path.dirname(backupPath)
);

fs.copyFileSync(
  cssPath,
  backupPath
);

function restore() {
  if (fs.existsSync(backupPath)) {
    fs.copyFileSync(
      backupPath,
      cssPath
    );
  }
}

fs.writeFileSync(
  path.join(
    reportDirectory,
    "执行摘要.md"
  ),
  [
    "# 兼容产品区域顶部间距",
    "",
    "- 修改文件：app/resources/selection-support/fitting-replacement/fitting-replacement.css",
    "- 修改位置：.fitting-replacement-page .frp-card-section",
    "- 新增顶部空白：24px",
    "- 未修改 Banner、面包屑、搜索栏和产品卡片",
    "",
  ].join("\n"),
  "utf8"
);

try {
  fs.writeFileSync(
    cssPath,
    updatedSource,
    "utf8"
  );

  const writtenSource = fs.readFileSync(
    cssPath,
    "utf8"
  );

  if (
    !writtenSource.includes(
      START_MARKER
    ) ||
    !writtenSource.includes(
      ".fitting-replacement-page .frp-card-section"
    ) ||
    !writtenSource.includes(
      "padding-top: 24px;"
    )
  ) {
    throw new Error(
      "写入后样式验证失败。"
    );
  }
} catch (error) {
  restore();
  throw error;
}

console.log("");
console.log(
  "已在搜索区域与“兼容产品”标题之间增加 24px 空白。"
);
console.log("");
console.log(
  "开始执行 npm run build……"
);

const buildCommand =
  process.platform === "win32"
    ? {
        command:
          process.env.ComSpec ||
          "cmd.exe",
        args: [
          "/d",
          "/s",
          "/c",
          "npm run build",
        ],
      }
    : {
        command: "npm",
        args: ["run", "build"],
      };

const buildResult = spawnSync(
  buildCommand.command,
  buildCommand.args,
  {
    cwd: root,
    encoding: "utf8",
    shell: false,
    windowsHide: false,
    maxBuffer:
      1024 * 1024 * 100,
  }
);

const buildOutput = [
  buildResult.stdout || "",
  buildResult.stderr || "",
  buildResult.error
    ? buildResult.error.stack ||
      buildResult.error.message ||
      String(buildResult.error)
    : "",
  `构建退出码：${
    buildResult.status === null ||
    buildResult.status === undefined
      ? "null"
      : buildResult.status
  }`,
]
  .filter(Boolean)
  .join("\n");

fs.writeFileSync(
  path.join(
    reportDirectory,
    "npm-build.log"
  ),
  buildOutput,
  "utf8"
);

if (buildOutput.trim()) {
  process.stdout.write(
    buildOutput + "\n"
  );
}

if (
  buildResult.error ||
  buildResult.status !== 0
) {
  restore();

  throw new Error(
    "构建失败，已自动恢复修改前的 CSS。\n" +
    `完整日志：${rel(
      path.join(
        reportDirectory,
        "npm-build.log"
      )
    )}`
  );
}

console.log("");
console.log(
  "============================================"
);
console.log(
  "兼容产品区域顶部 24px 空白已增加"
);
console.log(
  "============================================"
);
console.log(
  `备份目录：${rel(backupDirectory)}`
);
console.log(
  `报告目录：${rel(reportDirectory)}`
);
'@

[System.IO.File]::WriteAllText(
    $tempNodeScript,
    $nodeScript,
    [System.Text.UTF8Encoding]::new($false)
)

Write-Host ''
Write-Host '准备给“兼容产品”区域顶部增加 24px 空白……' -ForegroundColor Cyan
Write-Host '只修改 frp-card-section，不影响其他区域。' -ForegroundColor Yellow
Write-Host ''

$nodeExitCode = 0

try {
    node $tempNodeScript
    $nodeExitCode = $LASTEXITCODE
}
finally {
    Remove-Item `
        -LiteralPath $tempNodeScript `
        -Force `
        -ErrorAction SilentlyContinue
}

if ($nodeExitCode -ne 0) {
    throw "兼容产品区域顶部间距修改未完成，请把完整错误和 npm-build.log 发来。"
}

Write-Host ''
Write-Host '本脚本没有执行 git commit 或 git push。' -ForegroundColor Yellow
Write-Host ''
git status --short
