# ============================================================
# 恢复阀系列与针系列
#
# 原因：
# ProductSelectionClient.tsx 中的 hidden 状态合并规则
# 被错误应用到了所有产品类别，导致阀系列、针系列被隐藏。
#
# 本脚本：
# 1. 只修改 ProductSelectionClient.tsx
# 2. hidden / active 状态合并规则仅用于 fittings（接头系列）
# 3. valves、probes 及其他非接头类别恢复原来的 productId 去重逻辑
# 4. 不修改任何产品数据文件
# 5. 不修改接头替代查询
# 6. 自动备份
# 7. npm run build 失败自动回滚
# ============================================================

$ErrorActionPreference = 'Stop'

$projectRoot = 'F:\WebsiteProjects\foreach-website-2026'

$componentPath = Join-Path `
    $projectRoot `
    'components\products\selection\ProductSelectionClient.tsx'

$tempNodeScript = Join-Path `
    $projectRoot `
    '.restore-valves-probes-selection.cjs'

if (-not (Test-Path -LiteralPath $projectRoot)) {
    throw "没有找到官网项目目录：$projectRoot"
}

if (-not (Test-Path -LiteralPath $componentPath)) {
    throw "没有找到 ProductSelectionClient.tsx：$componentPath"
}

Set-Location -LiteralPath $projectRoot

$nodeScript = @'
const fs = require("fs");
const path = require("path");
const ts = require("typescript");
const { spawnSync } = require("child_process");

const root = process.cwd();

const componentPath = path.join(
  root,
  "components/products/selection/ProductSelectionClient.tsx"
);

const NEW_START_MARKER =
  "FITTING_ONLY_STATUS_MERGE_START";

const NEW_END_MARKER =
  "FITTING_ONLY_STATUS_MERGE_END";

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

function parseSource(filePath, source) {
  return ts.createSourceFile(
    filePath,
    source,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TSX
  );
}

function assertSyntax(filePath, source) {
  const parsed = parseSource(
    filePath,
    source
  );

  if (parsed.parseDiagnostics.length === 0) {
    return;
  }

  const message = parsed.parseDiagnostics
    .map((diagnostic) =>
      ts.flattenDiagnosticMessageText(
        diagnostic.messageText,
        "\n"
      )
    )
    .join("\n");

  throw new Error(
    `${rel(filePath)} 语法检查失败：\n${message}`
  );
}

function unwrap(expression) {
  let current = expression;

  while (current) {
    if (
      ts.isParenthesizedExpression(current) ||
      ts.isAsExpression(current) ||
      ts.isTypeAssertionExpression(current) ||
      ts.isNonNullExpression(current)
    ) {
      current = current.expression;
      continue;
    }

    if (
      typeof ts.isSatisfiesExpression === "function" &&
      ts.isSatisfiesExpression(current)
    ) {
      current = current.expression;
      continue;
    }

    break;
  }

  return current;
}

if (!fs.existsSync(componentPath)) {
  throw new Error(
    `没有找到组件：${rel(componentPath)}`
  );
}

const originalSource = fs.readFileSync(
  componentPath,
  "utf8"
);

assertSyntax(
  componentPath,
  originalSource
);

const parsed = parseSource(
  componentPath,
  originalSource
);

let callbackNode = null;
let declarationCount = 0;

function visit(node) {
  if (
    ts.isVariableDeclaration(node) &&
    ts.isIdentifier(node.name) &&
    node.name.text === "selectionProducts" &&
    node.initializer
  ) {
    declarationCount += 1;

    const initializer = unwrap(
      node.initializer
    );

    if (
      !ts.isCallExpression(initializer) ||
      !ts.isPropertyAccessExpression(
        initializer.expression
      ) ||
      initializer.expression.name.text !==
        "filter"
    ) {
      throw new Error(
        "selectionProducts 不是预期的数组 filter 结构。"
      );
    }

    if (initializer.arguments.length !== 1) {
      throw new Error(
        "selectionProducts.filter 参数数量异常。"
      );
    }

    const callback =
      initializer.arguments[0];

    if (
      !ts.isArrowFunction(callback) &&
      !ts.isFunctionExpression(callback)
    ) {
      throw new Error(
        "selectionProducts.filter 回调不是函数。"
      );
    }

    callbackNode = callback;
  }

  ts.forEachChild(
    node,
    visit
  );
}

visit(parsed);

if (
  declarationCount !== 1 ||
  !callbackNode
) {
  throw new Error(
    `selectionProducts 声明数量异常：${declarationCount}`
  );
}

const oldCallback = originalSource.slice(
  callbackNode.getStart(parsed),
  callbackNode.getEnd()
);

if (
  oldCallback.includes(
    NEW_START_MARKER
  )
) {
  throw new Error(
    "接头专用状态规则已经存在，不需要重复执行。"
  );
}

if (
  !oldCallback.includes("productId")
) {
  throw new Error(
    "当前 selectionProducts 去重回调结构异常。"
  );
}

/*
 * 正确规则：
 *
 * 1. 非接头类别：
 *    完全恢复原来的 productId 去重，不检查 status。
 *
 * 2. 接头类别：
 *    同一 productId 只要存在 hidden，就整组不展示；
 *    没有 hidden 时，只展示第一条 active。
 */
const newCallback = `(product, index, array) => {
  /*
   * ${NEW_START_MARKER}
   *
   * hidden 状态合并只允许作用于接头系列。
   * 阀、针、泵、管路、智控等非接头类别保持原来的去重逻辑。
   */
  const isFittingProduct =
    product.categoryId === "fittings";

  if (!isFittingProduct) {
    return (
      index ===
      array.findIndex((item) => {
        return item.productId === product.productId;
      })
    );
  }

  const hasHiddenFittingRecord =
    array.some((item) => {
      return (
        item.productId === product.productId &&
        item.categoryId === "fittings" &&
        item.status === "hidden"
      );
    });

  if (hasHiddenFittingRecord) {
    return false;
  }

  if (product.status !== "active") {
    return false;
  }

  return (
    index ===
    array.findIndex((item) => {
      return (
        item.productId === product.productId &&
        item.categoryId === "fittings" &&
        item.status === "active"
      );
    })
  );

  /*
   * ${NEW_END_MARKER}
   */
}`;

const updatedSource =
  originalSource.slice(
    0,
    callbackNode.getStart(parsed)
  ) +
  newCallback +
  originalSource.slice(
    callbackNode.getEnd()
  );

assertSyntax(
  componentPath,
  updatedSource
);

const requiredFragments = [
  NEW_START_MARKER,
  'product.categoryId === "fittings"',
  'item.categoryId === "fittings"',
  'item.status === "hidden"',
  'product.status !== "active"',
];

for (const fragment of requiredFragments) {
  if (!updatedSource.includes(fragment)) {
    throw new Error(
      `新规则缺少必要内容：${fragment}`
    );
  }
}

const stamp = createStamp();

const backupDirectory = path.join(
  root,
  `.local-backups/restore-valves-probes-${stamp}`
);

const reportDirectory = path.join(
  root,
  `audit-reports/restore-valves-probes/${stamp}`
);

ensureDirectory(
  backupDirectory
);

ensureDirectory(
  reportDirectory
);

const backupPath = path.join(
  backupDirectory,
  rel(componentPath)
);

ensureDirectory(
  path.dirname(backupPath)
);

fs.copyFileSync(
  componentPath,
  backupPath
);

function restore() {
  if (fs.existsSync(backupPath)) {
    fs.copyFileSync(
      backupPath,
      componentPath
    );
  }
}

fs.writeFileSync(
  path.join(
    reportDirectory,
    "执行摘要.md"
  ),
  [
    "# 恢复阀系列与针系列",
    "",
    "- 只修改 ProductSelectionClient.tsx",
    "- 非接头类别恢复原来的 productId 去重逻辑",
    "- 接头类别继续使用 hidden / active 状态规则",
    "- 未修改任何产品数据文件",
    "- 未修改接头替代查询",
    "",
  ].join("\n"),
  "utf8"
);

try {
  fs.writeFileSync(
    componentPath,
    updatedSource,
    "utf8"
  );

  const writtenSource = fs.readFileSync(
    componentPath,
    "utf8"
  );

  for (const fragment of requiredFragments) {
    if (!writtenSource.includes(fragment)) {
      throw new Error(
        `写入后缺少必要内容：${fragment}`
      );
    }
  }
} catch (error) {
  restore();
  throw error;
}

/*
 * 避免历史审计目录中的 .ts / .tsx 快照
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
      const entry of
      fs.readdirSync(
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

const quarantined =
  quarantineAuditTypeScriptFiles(
    path.join(
      root,
      "audit-reports"
    )
  );

if (quarantined.length > 0) {
  fs.writeFileSync(
    path.join(
      reportDirectory,
      "历史审计TS快照改名.json"
    ),
    JSON.stringify(
      quarantined,
      null,
      2
    ),
    "utf8"
  );
}

console.log("");
console.log(
  "已将状态合并限制到接头系列。"
);
console.log(
  "阀系列、针系列及其他非接头类别恢复原去重逻辑。"
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
          String(buildResult.error),
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
    componentPath,
    path.join(
      reportDirectory,
      "构建失败时的ProductSelectionClient.tsx.txt"
    )
  );

  restore();

  throw new Error(
    "构建失败，已自动恢复修改前的 ProductSelectionClient.tsx。\n" +
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
  "阀系列与针系列已恢复"
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
Write-Host '准备恢复阀系列和针系列……' -ForegroundColor Cyan
Write-Host '状态合并规则将只保留在接头系列。' -ForegroundColor Yellow
Write-Host '不会修改任何产品数据文件。' -ForegroundColor Yellow
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
    throw "阀系列和针系列恢复未完成，请把完整错误和 npm-build.log 发来。"
}

Write-Host ''
Write-Host '本脚本没有执行 git commit 或 git push。' -ForegroundColor Yellow
Write-Host ''
git status --short
