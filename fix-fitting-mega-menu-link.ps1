# ============================================================
# 修复顶部产品中心 Mega Menu：
# “接头系列”点击后跳转到 /products/fittings
#
# 只修改：
# data/navigation.ts
#
# 原错误：
# href: anchorPath("products")
#
# 正确地址：
# href: localizedPath("/products/fittings")
#
# 不修改：
# - 右侧各接头分类卡片
# - 产品中心页面
# - 产品数据
# - 其他导航栏目
#
# 构建失败自动回滚。
# ============================================================

$ErrorActionPreference = 'Stop'

$projectRoot = 'F:\WebsiteProjects\foreach-website-2026'
$navigationFile = Join-Path $projectRoot 'data\navigation.ts'
$tempNodeScript = Join-Path $projectRoot '.fix-fitting-mega-menu-link.cjs'

if (-not (Test-Path -LiteralPath $projectRoot)) {
    throw "没有找到官网项目目录：$projectRoot"
}

if (-not (Test-Path -LiteralPath $navigationFile)) {
    throw "没有找到导航数据文件：$navigationFile"
}

Set-Location -LiteralPath $projectRoot

$nodeScript = @'
const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");

const root = process.cwd();

const navigationPath = path.join(
  root,
  "data/navigation.ts"
);

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

if (!fs.existsSync(navigationPath)) {
  throw new Error(
    `没有找到导航文件：${rel(navigationPath)}`
  );
}

const originalSource = fs.readFileSync(
  navigationPath,
  "utf8"
);

/*
 * 只截取 fittings-card 对象附近的代码，
 * 避免误改其他栏目中相同的 anchorPath("products")。
 */
const cardStartToken =
  'key: "fittings-card"';

const nextCardToken =
  'key: "tubing-card"';

const cardStart =
  originalSource.indexOf(cardStartToken);

if (cardStart < 0) {
  throw new Error(
    '没有找到 key: "fittings-card"。'
  );
}

const nextCardStart =
  originalSource.indexOf(
    nextCardToken,
    cardStart
  );

if (nextCardStart < 0) {
  throw new Error(
    '无法定位 fittings-card 的结束位置。'
  );
}

const fittingBlock =
  originalSource.slice(
    cardStart,
    nextCardStart
  );

const oldHref =
  'href: anchorPath("products")';

const newHref =
  'href: localizedPath("/products/fittings")';

const oldHrefCount =
  fittingBlock.split(oldHref).length - 1;

if (oldHrefCount === 0) {
  if (fittingBlock.includes(newHref)) {
    throw new Error(
      "接头系列链接已经是 /products/fittings，不需要重复执行。"
    );
  }

  throw new Error(
    "fittings-card 中没有找到预期旧链接，脚本已停止。"
  );
}

if (oldHrefCount !== 1) {
  throw new Error(
    `fittings-card 中旧链接出现 ${oldHrefCount} 次，脚本已停止。`
  );
}

const updatedBlock =
  fittingBlock.replace(
    oldHref,
    newHref
  );

const updatedSource =
  originalSource.slice(0, cardStart) +
  updatedBlock +
  originalSource.slice(nextCardStart);

if (
  !updatedBlock.includes(
    'key: "fittings-card"'
  ) ||
  !updatedBlock.includes(newHref)
) {
  throw new Error(
    "接头系列新链接生成失败。"
  );
}

/*
 * 确认只发生一次目标替换。
 */
const beforeOldCount =
  originalSource.split(oldHref).length - 1;

const afterOldCount =
  updatedSource.split(oldHref).length - 1;

const beforeNewCount =
  originalSource.split(newHref).length - 1;

const afterNewCount =
  updatedSource.split(newHref).length - 1;

if (
  afterOldCount !== beforeOldCount - 1 ||
  afterNewCount !== beforeNewCount + 1
) {
  throw new Error(
    "链接替换数量验证失败。"
  );
}

const stamp = createStamp();

const backupDirectory = path.join(
  root,
  `.local-backups/fitting-mega-menu-link-${stamp}`
);

const reportDirectory = path.join(
  root,
  `audit-reports/fitting-mega-menu-link/${stamp}`
);

ensureDirectory(backupDirectory);
ensureDirectory(reportDirectory);

const backupPath = path.join(
  backupDirectory,
  "data/navigation.ts"
);

ensureDirectory(
  path.dirname(backupPath)
);

fs.copyFileSync(
  navigationPath,
  backupPath
);

function restore() {
  if (fs.existsSync(backupPath)) {
    fs.copyFileSync(
      backupPath,
      navigationPath
    );
  }
}

fs.writeFileSync(
  path.join(
    reportDirectory,
    "执行摘要.md"
  ),
  [
    "# 接头系列 Mega Menu 跳转修复",
    "",
    "- 修改文件：data/navigation.ts",
    '- 修改栏目：key: "fittings-card"',
    '- 原地址：anchorPath("products")',
    '- 新地址：localizedPath("/products/fittings")',
    "- 未修改其他导航栏目",
    "- 未修改产品数据",
    "",
  ].join("\n"),
  "utf8"
);

try {
  fs.writeFileSync(
    navigationPath,
    updatedSource,
    "utf8"
  );

  const writtenSource =
    fs.readFileSync(
      navigationPath,
      "utf8"
    );

  const writtenCardStart =
    writtenSource.indexOf(
      cardStartToken
    );

  const writtenNextCardStart =
    writtenSource.indexOf(
      nextCardToken,
      writtenCardStart
    );

  const writtenBlock =
    writtenSource.slice(
      writtenCardStart,
      writtenNextCardStart
    );

  if (
    !writtenBlock.includes(newHref) ||
    writtenBlock.includes(oldHref)
  ) {
    throw new Error(
      "写入后接头系列链接验证失败。"
    );
  }
} catch (error) {
  restore();
  throw error;
}

/*
 * 避免 audit-reports 内的历史 TypeScript 快照
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
  "接头系列 Mega Menu 链接已修改："
);
console.log(
  '- 原地址：anchorPath("products")'
);
console.log(
  '- 新地址：localizedPath("/products/fittings")'
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
    navigationPath,
    path.join(
      reportDirectory,
      "构建失败时的navigation.ts.txt"
    )
  );

  restore();

  throw new Error(
    "构建失败，已自动恢复 data/navigation.ts。\n" +
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
  "接头系列 Mega Menu 跳转修复完成"
);
console.log(
  "============================================"
);
console.log(
  "目标地址：/products/fittings"
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
Write-Host '准备修复“接头系列”Mega Menu 跳转……' -ForegroundColor Cyan
Write-Host '只修改 data/navigation.ts 中 fittings-card 的链接。' -ForegroundColor Yellow
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
    throw "接头系列 Mega Menu 跳转修复未完成，请把完整错误和 npm-build.log 发来。"
}

Write-Host ''
Write-Host '本脚本没有执行 git commit 或 git push。' -ForegroundColor Yellow
Write-Host ''
git status --short
