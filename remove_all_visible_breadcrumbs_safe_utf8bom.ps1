param(
  [switch]$SkipBuild
)

$ErrorActionPreference = "Stop"

$projectRoot = (Get-Location).Path

if (-not (Test-Path -LiteralPath (Join-Path $projectRoot "package.json"))) {
  throw "package.json was not found. Run this script from the project root."
}

$timestamp = Get-Date -Format "yyyyMMdd-HHmmss"
$backupRoot = Join-Path $projectRoot "backup\remove-visible-breadcrumbs-$timestamp"
$workerPath = Join-Path $projectRoot "scripts\remove-visible-breadcrumbs-$timestamp.cjs"

New-Item -ItemType Directory -Force -Path $backupRoot | Out-Null
New-Item -ItemType Directory -Force -Path (Split-Path -Parent $workerPath) | Out-Null

function Restore-FromBackup {
  param(
    [Parameter(Mandatory = $true)]
    [string]$BackupDirectory
  )

  if (-not (Test-Path -LiteralPath $BackupDirectory)) {
    return
  }

  Write-Host ""
  Write-Host "Restoring files from backup..." -ForegroundColor Yellow

  Get-ChildItem -LiteralPath $BackupDirectory -Recurse -File | ForEach-Object {
    $relativePath = $_.FullName.Substring($BackupDirectory.Length).TrimStart('\')
    $targetPath = Join-Path $projectRoot $relativePath
    $targetDirectory = Split-Path -Parent $targetPath

    if (-not (Test-Path -LiteralPath $targetDirectory)) {
      New-Item -ItemType Directory -Force -Path $targetDirectory | Out-Null
    }

    Copy-Item -LiteralPath $_.FullName -Destination $targetPath -Force
  }

  Write-Host "Source files were restored." -ForegroundColor Green
}

$workerContent = @'
const fs = require("fs");
const path = require("path");

const projectRoot = process.argv[2];
const backupRoot = process.argv[3];

const ts = require(path.join(projectRoot, "node_modules", "typescript"));
const postcss = require(path.join(projectRoot, "node_modules", "postcss"));

const sourceRoots = [
  path.join(projectRoot, "app"),
  path.join(projectRoot, "components"),
];

const codeExtensions = new Set([".ts", ".tsx", ".js", ".jsx"]);
const cssExtensions = new Set([".css"]);

const modifiedFiles = [];
const deletedFiles = [];
const remainingVisibleReferences = [];

function walk(directory, result = []) {
  if (!fs.existsSync(directory)) {
    return result;
  }

  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (
      entry.name === "node_modules" ||
      entry.name === ".next" ||
      entry.name === "backup"
    ) {
      continue;
    }

    const fullPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      walk(fullPath, result);
    } else {
      result.push(fullPath);
    }
  }

  return result;
}

function relative(filePath) {
  return path.relative(projectRoot, filePath);
}

function backupFile(filePath) {
  if (!fs.existsSync(filePath)) {
    return;
  }

  const targetPath = path.join(backupRoot, relative(filePath));

  fs.mkdirSync(path.dirname(targetPath), { recursive: true });
  fs.copyFileSync(filePath, targetPath);
}

function getScriptKind(filePath) {
  if (filePath.endsWith(".tsx")) return ts.ScriptKind.TSX;
  if (filePath.endsWith(".jsx")) return ts.ScriptKind.JSX;
  if (filePath.endsWith(".js")) return ts.ScriptKind.JS;
  return ts.ScriptKind.TS;
}

function getJsxTagName(node, sourceFile) {
  if (ts.isJsxElement(node)) {
    return node.openingElement.tagName.getText(sourceFile);
  }

  if (ts.isJsxSelfClosingElement(node)) {
    return node.tagName.getText(sourceFile);
  }

  return "";
}

function getJsxClassText(node, sourceFile) {
  const attributes = ts.isJsxElement(node)
    ? node.openingElement.attributes.properties
    : node.attributes.properties;

  for (const attribute of attributes) {
    if (!ts.isJsxAttribute(attribute)) {
      continue;
    }

    if (attribute.name.getText(sourceFile) !== "className") {
      continue;
    }

    return attribute.initializer
      ? attribute.initializer.getText(sourceFile)
      : "";
  }

  return "";
}

function mergeRanges(ranges) {
  const sorted = [...ranges].sort((left, right) => {
    if (left.start !== right.start) {
      return left.start - right.start;
    }

    return right.end - left.end;
  });

  const result = [];

  for (const current of sorted) {
    const isInsideExisting = result.some(
      (existing) =>
        current.start >= existing.start &&
        current.end <= existing.end,
    );

    if (!isInsideExisting) {
      result.push(current);
    }
  }

  return result;
}

function removeVisibleBreadcrumbsFromCode(filePath) {
  const original = fs.readFileSync(filePath, "utf8");

  let sourceFile;

  try {
    sourceFile = ts.createSourceFile(
      filePath,
      original,
      ts.ScriptTarget.Latest,
      true,
      getScriptKind(filePath),
    );
  } catch {
    return;
  }

  const removalRanges = [];

  function addRemoval(node) {
    removalRanges.push({
      start: node.getFullStart(),
      end: node.getEnd(),
    });
  }

  function visit(node) {
    /*
     * 删除 SiteBreadcrumb / Breadcrumb 组件导入。
     */
    if (ts.isImportDeclaration(node)) {
      const modulePath = String(node.moduleSpecifier.text || "");

      if (
        /SiteBreadcrumb/i.test(modulePath) ||
        /common[\\/]+breadcrumb/i.test(modulePath)
      ) {
        addRemoval(node);
        return;
      }
    }

    /*
     * 删除类似：
     * const BreadcrumbComponent = SiteBreadcrumb as ComponentType<...>
     */
    if (ts.isVariableStatement(node)) {
      const statementText = node.getText(sourceFile);

      if (
        /\bBreadcrumbComponent\b/.test(statementText) &&
        /\b(?:SiteBreadcrumb|Breadcrumb)\b/.test(statementText)
      ) {
        addRemoval(node);
        return;
      }
    }

    /*
     * 删除所有可见面包屑 JSX：
     * - <SiteBreadcrumb />
     * - <Breadcrumb />
     * - <BreadcrumbComponent />
     * - className 含 breadcrumb 的手写容器
     */
    if (ts.isJsxElement(node) || ts.isJsxSelfClosingElement(node)) {
      const tagName = getJsxTagName(node, sourceFile);
      const classText = getJsxClassText(node, sourceFile);

      const isBreadcrumbComponent =
        /breadcrumb/i.test(tagName);

      const isManualBreadcrumbContainer =
        /breadcrumb/i.test(classText);

      if (isBreadcrumbComponent || isManualBreadcrumbContainer) {
        addRemoval(node);
        return;
      }
    }

    ts.forEachChild(node, visit);
  }

  visit(sourceFile);

  if (removalRanges.length === 0) {
    return;
  }

  const normalizedRanges = mergeRanges(removalRanges);
  let next = original;

  normalizedRanges
    .sort((left, right) => right.start - left.start)
    .forEach(({ start, end }) => {
      next = next.slice(0, start) + next.slice(end);
    });

  next = next
    .replace(/[ \t]+\r?\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n");

  if (next === original) {
    return;
  }

  backupFile(filePath);
  fs.writeFileSync(filePath, next, "utf8");
  modifiedFiles.push(relative(filePath));
}

function removeBreadcrumbCss(filePath) {
  const original = fs.readFileSync(filePath, "utf8");

  let root;

  try {
    root = postcss.parse(original, {
      from: filePath,
    });
  } catch {
    console.warn(`Skipped CSS parse error: ${relative(filePath)}`);
    return;
  }

  let changed = false;

  root.walkRules((rule) => {
    if (/breadcrumb/i.test(rule.selector || "")) {
      rule.remove();
      changed = true;
    }
  });

  root.walkComments((comment) => {
    if (/breadcrumb|面包屑/i.test(comment.text || "")) {
      comment.remove();
      changed = true;
    }
  });

  /*
   * 删除已经变空的媒体查询等容器。
   */
  root.walkAtRules((atRule) => {
    if (!atRule.nodes || atRule.nodes.length === 0) {
      atRule.remove();
      changed = true;
    }
  });

  if (!changed) {
    return;
  }

  const next = root
    .toString()
    .replace(/\n{3,}/g, "\n\n");

  backupFile(filePath);
  fs.writeFileSync(filePath, next, "utf8");
  modifiedFiles.push(relative(filePath));
}

const allFiles = sourceRoots.flatMap((root) => walk(root));

for (const filePath of allFiles) {
  const extension = path.extname(filePath).toLowerCase();

  if (codeExtensions.has(extension)) {
    removeVisibleBreadcrumbsFromCode(filePath);
    continue;
  }

  if (cssExtensions.has(extension)) {
    removeBreadcrumbCss(filePath);
  }
}

/*
 * 删除两套公共面包屑组件。
 * 其引用已经在上面统一移除。
 */
const componentFilesToDelete = [
  path.join(projectRoot, "components", "common", "SiteBreadcrumb.tsx"),
  path.join(projectRoot, "components", "common", "SiteBreadcrumb.module.css"),
  path.join(
    projectRoot,
    "components",
    "common",
    "breadcrumb",
    "Breadcrumb.tsx",
  ),
  path.join(
    projectRoot,
    "components",
    "common",
    "breadcrumb",
    "Breadcrumb.module.css",
  ),
  path.join(
    projectRoot,
    "components",
    "common",
    "breadcrumb",
    "index.ts",
  ),
];

for (const filePath of componentFilesToDelete) {
  if (!fs.existsSync(filePath)) {
    continue;
  }

  backupFile(filePath);
  fs.unlinkSync(filePath);
  deletedFiles.push(relative(filePath));
}

const breadcrumbFolder = path.join(
  projectRoot,
  "components",
  "common",
  "breadcrumb",
);

if (
  fs.existsSync(breadcrumbFolder) &&
  fs.readdirSync(breadcrumbFolder).length === 0
) {
  fs.rmdirSync(breadcrumbFolder);
}

/*
 * 最后只检查可见引用。
 * breadcrumb 数据字段、类型和多语言文案允许保留，
 * 因为它们不会再渲染到页面。
 */
const filesAfterRemoval = sourceRoots.flatMap((root) => walk(root));

for (const filePath of filesAfterRemoval) {
  const extension = path.extname(filePath).toLowerCase();

  if (!codeExtensions.has(extension)) {
    continue;
  }

  const content = fs.readFileSync(filePath, "utf8");

  if (
    /<\s*(?:SiteBreadcrumb|Breadcrumb|BreadcrumbComponent)\b/i.test(content) ||
    /className\s*=\s*(?:["'][^"']*breadcrumb|{[^}]*breadcrumb)/i.test(content)
  ) {
    remainingVisibleReferences.push(relative(filePath));
  }
}

console.log("");
console.log("Visible breadcrumb removal completed.");
console.log(`Modified files: ${modifiedFiles.length}`);

for (const file of modifiedFiles) {
  console.log(`  MODIFIED  ${file}`);
}

console.log(`Deleted component files: ${deletedFiles.length}`);

for (const file of deletedFiles) {
  console.log(`  DELETED   ${file}`);
}

console.log(`Backup directory: ${backupRoot}`);

if (remainingVisibleReferences.length > 0) {
  console.log("");
  console.log("Remaining possible visible breadcrumb references:");

  for (const file of remainingVisibleReferences) {
    console.log(`  CHECK     ${file}`);
  }
}
'@

$utf8NoBom = New-Object System.Text.UTF8Encoding($false)
[System.IO.File]::WriteAllText($workerPath, $workerContent, $utf8NoBom)

Write-Host ""
Write-Host "Removing all visible breadcrumbs..." -ForegroundColor Cyan
Write-Host "Backup directory: $backupRoot" -ForegroundColor Yellow
Write-Host ""

try {
  & node $workerPath $projectRoot $backupRoot

  if ($LASTEXITCODE -ne 0) {
    throw "The breadcrumb removal worker failed."
  }

  if (-not $SkipBuild) {
    Write-Host ""
    Write-Host "Running npm run build..." -ForegroundColor Cyan

    & npm run build

    if ($LASTEXITCODE -ne 0) {
      throw "Build failed after breadcrumb removal."
    }

    Write-Host ""
    Write-Host "Build passed." -ForegroundColor Green
  }
  else {
    Write-Host ""
    Write-Host "Build was skipped. Run npm run build manually." -ForegroundColor Yellow
  }
}
catch {
  Restore-FromBackup -BackupDirectory $backupRoot

  Write-Host ""
  Write-Host "The breadcrumb removal was rolled back because an error occurred." -ForegroundColor Red
  throw
}
finally {
  if (Test-Path -LiteralPath $workerPath) {
    Remove-Item -LiteralPath $workerPath -Force
  }
}

Write-Host ""
Write-Host "All visible breadcrumbs and both breadcrumb component implementations were removed." -ForegroundColor Green
Write-Host "Breadcrumb data fields were kept because they may still support locale and route logic." -ForegroundColor Yellow
