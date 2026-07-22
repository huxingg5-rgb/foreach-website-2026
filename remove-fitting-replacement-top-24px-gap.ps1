# ============================================================
# 接头兼容型号查询页面：
# 删除 Banner 与面包屑之间多余的 24px 空白
#
# 只修改：
# app/resources/selection-support/fitting-replacement/fitting-replacement.css
#
# 原样式：
# .frp-main {
#   padding: 24px 0 110px;
# }
#
# 修改后：
# .fitting-replacement-page .frp-main {
#   padding-top: 0;
# }
#
# 说明：
# - 只覆盖接头替代查询页面
# - 不影响复用 frp-* 样式的安装教程、材料兼容页面
# - 不修改 Breadcrumb 公共组件
# - 不修改搜索区、产品卡片和其他页面
# - 构建失败自动回滚
# ============================================================

$ErrorActionPreference = 'Stop'

$projectRoot = 'F:\WebsiteProjects\foreach-website-2026'

$cssFile = Join-Path `
    $projectRoot `
    'app\resources\selection-support\fitting-replacement\fitting-replacement.css'

$tempNodeScript = Join-Path `
    $projectRoot `
    '.remove-fitting-replacement-top-gap.cjs'

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
  "FITTING_REPLACEMENT_REMOVE_TOP_GAP_START";

const END_MARKER =
  "FITTING_REPLACEMENT_REMOVE_TOP_GAP_END";

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

if (
  originalSource.includes(
    START_MARKER
  )
) {
  throw new Error(
    "顶部 24px 空白修复已经存在，不需要重复执行。"
  );
}

const frpMainPattern =
  /\.frp-main\s*\{[\s\S]*?padding\s*:\s*24px\s+0\s+110px\s*;[\s\S]*?\}/;

const match = originalSource.match(
  frpMainPattern
);

if (!match) {
  throw new Error(
    "没有找到 .frp-main 中的 padding: 24px 0 110px，脚本已停止。"
  );
}

/*
 * 不直接改公共 .frp-main 原规则，
 * 因为 fitting-replacement.css 还被其他资源页面复用。
 *
 * 只在文件末尾追加更高优先级的页面限定覆盖。
 */
const overrideBlock = `

/* =========================================================
   接头兼容型号查询页面｜删除 Banner 下方多余 24px 空白

   说明：
   1. 原 .frp-main 使用 padding: 24px 0 110px
   2. 顶部 24px 会在 Banner 与面包屑之间形成多余空白
   3. 只限制在 .fitting-replacement-page，避免影响其他复用页面
========================================================= */
/* ${START_MARKER} */
.fitting-replacement-page .frp-main {
  padding-top: 0;
}
/* ${END_MARKER} */
`;

const updatedSource =
  originalSource.replace(
    /\s*$/,
    ""
  ) +
  overrideBlock +
  "\n";

if (
  !updatedSource.includes(
    START_MARKER
  ) ||
  !updatedSource.includes(
    ".fitting-replacement-page .frp-main"
  ) ||
  !updatedSource.includes(
    "padding-top: 0;"
  )
) {
  throw new Error(
    "新样式生成后验证失败。"
  );
}

const stamp = createStamp();

const backupDirectory = path.join(
  root,
  `.local-backups/fitting-replacement-top-gap-${stamp}`
);

const reportDirectory = path.join(
  root,
  `audit-reports/fitting-replacement-top-gap/${stamp}`
);

ensureDirectory(
  backupDirectory
);

ensureDirectory(
  reportDirectory
);

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
    "# 接头兼容型号查询顶部空白修复",
    "",
    "- 修改文件：app/resources/selection-support/fitting-replacement/fitting-replacement.css",
    "- 原因：.frp-main 顶部 padding 为 24px",
    "- 修复：仅对 .fitting-replacement-page 设置 padding-top: 0",
    "- 保留原来的 110px 底部留白",
    "- 未修改 Breadcrumb 公共组件",
    "- 未影响安装教程、材料兼容等复用页面",
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
      ".fitting-replacement-page .frp-main"
    ) ||
    !writtenSource.includes(
      "padding-top: 0;"
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

/*
 * 避免 audit-reports 中历史 TypeScript 快照
 * 被 Next.js 纳入类型检查。
 */
function quarantineAuditTypeScriptFiles(
  directory
) {
  if (!fs.existsSync(directory)) {
    return [];
  }

  const renamed = [];

  function walk(currentDirectory) {
    for (
      const entry of fs.readdirSync(
        currentDirectory,
        {
          withFileTypes: true,
        }
      )
    ) {
      const fullPath = path.join(
        currentDirectory,
        entry.name
      );

      if (entry.isDirectory()) {
        walk(fullPath);
        continue;
      }

      if (
        !entry.isFile() ||
        !/\.(ts|tsx)$/i.test(
          entry.name
        )
      ) {
        continue;
      }

      const targetPath =
        `${fullPath}.txt`;

      if (fs.existsSync(targetPath)) {
        fs.rmSync(
          targetPath,
          {
            force: true,
          }
        );
      }

      fs.renameSync(
        fullPath,
        targetPath
      );

      renamed.push({
        from: rel(fullPath),
        to: rel(targetPath),
      });
    }
  }

  walk(directory);
  return renamed;
}

const renamedAuditFiles =
  quarantineAuditTypeScriptFiles(
    path.join(
      root,
      "audit-reports"
    )
  );

if (renamedAuditFiles.length > 0) {
  fs.writeFileSync(
    path.join(
      reportDirectory,
      "历史审计TS快照改名.json"
    ),
    JSON.stringify(
      renamedAuditFiles,
      null,
      2
    ),
    "utf8"
  );
}

console.log("");
console.log(
  "已删除接头兼容型号查询页面顶部多余的 24px 空白。"
);
console.log(
  "保留底部 110px 留白，未修改公共 Breadcrumb。"
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

const launchError =
  buildResult.error
    ? [
        "构建进程启动异常：",
        buildResult.error.stack ||
          buildResult.error.message ||
          String(
            buildResult.error
          ),
      ].join("\n")
    : "";

const buildOutput = [
  buildResult.stdout || "",
  buildResult.stderr || "",
  launchError,
  `构建退出码：${
    buildResult.status === null ||
    buildResult.status === undefined
      ? "null"
      : buildResult.status
  }`,
  `构建信号：${
    buildResult.signal || "无"
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
  fs.copyFileSync(
    cssPath,
    path.join(
      reportDirectory,
      "构建失败时的fitting-replacement.css.txt"
    )
  );

  restore();

  throw new Error(
    "构建失败，已自动恢复 fitting-replacement.css。\n" +
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
  "接头兼容型号查询顶部空白修复完成"
);
console.log(
  "============================================"
);
console.log(
  "已删除顶部：24px"
);
console.log(
  "保留底部：110px"
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
Write-Host '准备删除 Banner 与面包屑之间多余的 24px 空白……' -ForegroundColor Cyan
Write-Host '只覆盖接头兼容型号查询页面，不修改公共 Breadcrumb。' -ForegroundColor Yellow
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
    throw "接头兼容型号查询顶部空白修复未完成，请把完整错误和 npm-build.log 发来。"
}

Write-Host ''
Write-Host '本脚本没有执行 git commit 或 git push。' -ForegroundColor Yellow
Write-Host ''
git status --short
