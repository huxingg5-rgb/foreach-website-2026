param(
  [switch]$SkipBuild
)

$ErrorActionPreference = "Stop"

$projectRoot = (Get-Location).Path
$projectParent = Split-Path $projectRoot -Parent
$projectName = Split-Path $projectRoot -Leaf
$timestamp = Get-Date -Format "yyyyMMdd-HHmmss"

if (-not (Test-Path -LiteralPath (Join-Path $projectRoot "package.json"))) {
  throw "package.json was not found. Run this script from the project root."
}

$backupRoot = Join-Path $projectParent "$projectName-products-shell-backup-$timestamp"
$workerPath = Join-Path $env:TEMP "install-products-shell-$timestamp.cjs"

$selectionClientPath = Join-Path $projectRoot "components\products\selection\ProductSelectionClient.tsx"
$detailClientPath = Join-Path $projectRoot "components\products\detail\ProductDetailClient.tsx"
$productsCssPath = Join-Path $projectRoot "app\products\products.css"
$detailCssPath = Join-Path $projectRoot "components\products\detail\product-detail.module.css"
$shellComponentPath = Join-Path $projectRoot "components\layout\SitePageShell.tsx"
$shellCssPath = Join-Path $projectRoot "components\layout\SitePageShell.module.css"
$siteBreadcrumbPath = Join-Path $projectRoot "components\common\SiteBreadcrumb.tsx"

$requiredFiles = @(
  $selectionClientPath,
  $detailClientPath,
  $productsCssPath,
  $detailCssPath,
  $siteBreadcrumbPath
)

foreach ($filePath in $requiredFiles) {
  if (-not (Test-Path -LiteralPath $filePath)) {
    throw "Required file not found: $filePath"
  }
}

$shellComponentExisted = Test-Path -LiteralPath $shellComponentPath
$shellCssExisted = Test-Path -LiteralPath $shellCssPath

function Backup-External {
  param(
    [Parameter(Mandatory = $true)]
    [string]$Path
  )

  if (-not (Test-Path -LiteralPath $Path)) {
    return
  }

  $relativePath = $Path.Substring($projectRoot.Length).TrimStart('\')
  $targetPath = Join-Path $backupRoot $relativePath
  $targetDirectory = Split-Path -Parent $targetPath

  New-Item -ItemType Directory -Force -Path $targetDirectory | Out-Null
  Copy-Item -LiteralPath $Path -Destination $targetPath -Force
}

function Restore-Backup {
  if (-not (Test-Path -LiteralPath $backupRoot)) {
    return
  }

  Write-Host ""
  Write-Host "Restoring original files..." -ForegroundColor Yellow

  Get-ChildItem -LiteralPath $backupRoot -Recurse -File | ForEach-Object {
    $relativePath = $_.FullName.Substring($backupRoot.Length).TrimStart('\')
    $targetPath = Join-Path $projectRoot $relativePath
    $targetDirectory = Split-Path -Parent $targetPath

    if (-not (Test-Path -LiteralPath $targetDirectory)) {
      New-Item -ItemType Directory -Force -Path $targetDirectory | Out-Null
    }

    Copy-Item -LiteralPath $_.FullName -Destination $targetPath -Force
  }

  if (-not $shellComponentExisted -and (Test-Path -LiteralPath $shellComponentPath)) {
    Remove-Item -LiteralPath $shellComponentPath -Force
  }

  if (-not $shellCssExisted -and (Test-Path -LiteralPath $shellCssPath)) {
    Remove-Item -LiteralPath $shellCssPath -Force
  }

  Write-Host "Rollback completed." -ForegroundColor Green
}

function Write-Utf8NoBomFile {
  param(
    [Parameter(Mandatory = $true)]
    [string]$Path,

    [Parameter(Mandatory = $true)]
    [string]$Content
  )

  $directory = Split-Path -Parent $Path

  if (-not (Test-Path -LiteralPath $directory)) {
    New-Item -ItemType Directory -Force -Path $directory | Out-Null
  }

  $encoding = New-Object System.Text.UTF8Encoding($false)
  [System.IO.File]::WriteAllText($Path, $Content, $encoding)

  Write-Host "Updated: $Path" -ForegroundColor Green
}

function Remove-MarkedBlock {
  param(
    [Parameter(Mandatory = $true)]
    [string]$Content,

    [Parameter(Mandatory = $true)]
    [string]$StartMarker,

    [Parameter(Mandatory = $true)]
    [string]$EndMarker
  )

  $pattern =
    [Regex]::Escape($StartMarker) +
    '(?s).*?' +
    [Regex]::Escape($EndMarker)

  return [System.Text.RegularExpressions.Regex]::Replace(
    $Content,
    $pattern,
    ""
  )
}

foreach ($path in @(
  $selectionClientPath,
  $detailClientPath,
  $productsCssPath,
  $detailCssPath,
  $shellComponentPath,
  $shellCssPath
)) {
  Backup-External -Path $path
}

$shellComponentContent = @'
/* =========================================================
   SitePageShell.tsx
   恒永达官网｜无 Banner 页面公共框架

   当前接入：
   1. 产品中心
   2. 产品详情页

   后续新建的无 Banner 页面可继续复用。
   之前已经完成的其他页面暂不修改。
========================================================= */

import type { ReactNode } from "react";

import SiteBreadcrumb, {
  type SiteBreadcrumbItem,
} from "@/components/common/SiteBreadcrumb";

import styles from "./SitePageShell.module.css";

type SitePageShellProps = {
  children: ReactNode;
  breadcrumbItems: SiteBreadcrumbItem[];
  breadcrumbAriaLabel?: string;
  className?: string;
};

export default function SitePageShell({
  children,
  breadcrumbItems,
  breadcrumbAriaLabel = "Breadcrumb",
  className = "",
}: SitePageShellProps) {
  return (
    <div
      className={[styles.shell, className]
        .filter(Boolean)
        .join(" ")}
    >
      <SiteBreadcrumb
        items={breadcrumbItems}
        ariaLabel={breadcrumbAriaLabel}
        variant="bar"
        className={styles.shellBreadcrumb}
      />

      <div className={styles.content}>{children}</div>
    </div>
  );
}
'@

$shellCssContent = @'
/* =========================================================
   SitePageShell.module.css
   恒永达官网｜产品中心与产品详情公共页面框架

   桌面：
   1. 固定 Top 栏占位 82px
   2. 面包屑文字上方增加 32px
   3. 面包屑下方不再额外增加正文间距

   移动：
   1. 固定 Top 栏占位 70px
   2. 面包屑文字上方增加 24px
========================================================= */

.shell {
  width: 100%;
  min-width: 0;
  padding-top: 82px;
}

/*
 * 公共面包屑默认上下各 18px。
 * 将原本正文前的 32px 移到文字上方：
 * 18px + 32px = 50px。
 */
.shellBreadcrumb {
  padding-top: 50px !important;
  padding-bottom: 18px !important;
}

.content {
  min-width: 0;
  padding-top: 0;
}

@media (max-width: 900px) {
  .shell {
    padding-top: 70px;
  }

  .shellBreadcrumb {
    padding-top: 39px !important;
    padding-bottom: 15px !important;
  }
}
'@

Write-Utf8NoBomFile -Path $shellComponentPath -Content $shellComponentContent
Write-Utf8NoBomFile -Path $shellCssPath -Content $shellCssContent

$workerContent = @'
const fs = require("fs");
const path = require("path");

const projectRoot = process.argv[2];
const selectionPath = process.argv[3];
const detailPath = process.argv[4];

const ts = require(path.join(projectRoot, "node_modules", "typescript"));

function getTagName(node, sourceFile) {
  if (ts.isJsxElement(node)) {
    return node.openingElement.tagName.getText(sourceFile);
  }

  if (ts.isJsxSelfClosingElement(node)) {
    return node.tagName.getText(sourceFile);
  }

  return "";
}

function getClassText(node, sourceFile) {
  const attributes = ts.isJsxElement(node)
    ? node.openingElement.attributes.properties
    : node.attributes.properties;

  for (const attribute of attributes) {
    if (!ts.isJsxAttribute(attribute)) continue;
    if (attribute.name.getText(sourceFile) !== "className") continue;

    return attribute.initializer
      ? attribute.initializer.getText(sourceFile)
      : "";
  }

  return "";
}

function findRootMain(sourceFile, kind) {
  let result = null;

  function visit(node) {
    if (result) return;

    if (ts.isJsxElement(node)) {
      const tagName = getTagName(node, sourceFile);
      const classText = getClassText(node, sourceFile);

      const isSelection =
        kind === "selection" &&
        tagName === "main" &&
        /products-selection-page/.test(classText);

      const isDetail =
        kind === "detail" &&
        tagName === "main" &&
        /styles\.page/.test(classText);

      if (isSelection || isDetail) {
        result = node;
        return;
      }
    }

    ts.forEachChild(node, visit);
  }

  visit(sourceFile);
  return result;
}

function findBreadcrumbNodes(rootNode, sourceFile) {
  const matches = [];

  function visit(node) {
    if (
      node !== rootNode &&
      (ts.isJsxElement(node) || ts.isJsxSelfClosingElement(node))
    ) {
      const tagName = getTagName(node, sourceFile);
      const classText = getClassText(node, sourceFile);

      if (
        /breadcrumb/i.test(tagName) ||
        /breadcrumb/i.test(classText)
      ) {
        matches.push(node);
        return;
      }
    }

    ts.forEachChild(node, visit);
  }

  visit(rootNode);

  return matches.filter((candidate) => {
    return !matches.some((other) => {
      return (
        other !== candidate &&
        candidate.getStart(sourceFile) >= other.getStart(sourceFile) &&
        candidate.getEnd() <= other.getEnd()
      );
    });
  });
}

function stripBreadcrumbs(rootNode, sourceFile, sourceText) {
  const rootStart = rootNode.getStart(sourceFile);
  let rootText = sourceText.slice(rootStart, rootNode.getEnd());

  const ranges = findBreadcrumbNodes(rootNode, sourceFile)
    .map((node) => ({
      start: node.getFullStart() - rootStart,
      end: node.getEnd() - rootStart,
    }))
    .sort((left, right) => right.start - left.start);

  for (const range of ranges) {
    rootText =
      rootText.slice(0, range.start) +
      rootText.slice(range.end);
  }

  return rootText.replace(/\n{3,}/g, "\n\n");
}

function removeOldBreadcrumbImports(sourceText) {
  return sourceText.replace(
    /(?:^|\r?\n)\s*import\s+[^;]*\s+from\s+["'][^"']*(?:SiteBreadcrumb|common\/breadcrumb\/Breadcrumb)["'];?\s*/g,
    "\n",
  );
}

function ensureShellImport(sourceText) {
  const shellImport =
    'import SitePageShell from "@/components/layout/SitePageShell";';

  if (sourceText.includes(shellImport)) {
    return sourceText;
  }

  const firstImport = sourceText.match(/^import\s/m);

  if (firstImport && typeof firstImport.index === "number") {
    return (
      sourceText.slice(0, firstImport.index) +
      shellImport +
      "\n" +
      sourceText.slice(firstImport.index)
    );
  }

  return shellImport + "\n\n" + sourceText;
}

function transformFile(filePath, kind) {
  const original = fs.readFileSync(filePath, "utf8");

  /*
   * 已接入时不重复包裹。
   */
  if (
    original.includes("<SitePageShell") &&
    original.includes(
      'import SitePageShell from "@/components/layout/SitePageShell";',
    )
  ) {
    console.log(`Already integrated: ${path.relative(projectRoot, filePath)}`);
    return;
  }

  const sourceFile = ts.createSourceFile(
    filePath,
    original,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TSX,
  );

  const rootMain = findRootMain(sourceFile, kind);

  if (!rootMain) {
    throw new Error(
      `Could not find root main in ${path.relative(projectRoot, filePath)}`,
    );
  }

  const rootStart = rootMain.getStart(sourceFile);
  const rootEnd = rootMain.getEnd();

  const cleanedMain = stripBreadcrumbs(
    rootMain,
    sourceFile,
    original,
  );

  const opening =
    kind === "selection"
      ? `<SitePageShell
      breadcrumbAriaLabel={
        locale === "zh" ? "面包屑导航" : "Breadcrumb"
      }
      breadcrumbItems={[
        {
          label: pageText.breadcrumbHome,
          href: locale === "zh" ? "/" : \`/\${locale}\`,
        },
        {
          label: pageText.breadcrumbCurrent,
        },
      ]}
    >`
      : `<SitePageShell
      breadcrumbAriaLabel="面包屑导航"
      breadcrumbItems={[
        {
          label: "首页",
          href: "/",
        },
        {
          label: "产品中心",
          href: "/products/",
        },
        {
          label: data.model,
        },
      ]}
    >`;

  const wrapped =
    `${opening}\n      ${cleanedMain}\n    </SitePageShell>`;

  let next =
    original.slice(0, rootStart) +
    wrapped +
    original.slice(rootEnd);

  next = removeOldBreadcrumbImports(next);
  next = ensureShellImport(next);
  next = next.replace(/\n{3,}/g, "\n\n");

  fs.writeFileSync(filePath, next, "utf8");

  console.log(`Integrated: ${path.relative(projectRoot, filePath)}`);
}

transformFile(selectionPath, "selection");
transformFile(detailPath, "detail");
'@

$encoding = New-Object System.Text.UTF8Encoding($false)
[System.IO.File]::WriteAllText($workerPath, $workerContent, $encoding)

try {
  Write-Host ""
  Write-Host "Integrating only product center and product detail..." -ForegroundColor Cyan

  & node $workerPath $projectRoot $selectionClientPath $detailClientPath

  if ($LASTEXITCODE -ne 0) {
    throw "TSX integration worker failed."
  }

  # ---------------------------------------------------------
  # 产品中心：移除之前针对顶部和面包屑正文间距的临时补丁。
  # ---------------------------------------------------------

  $productsCss = Get-Content -LiteralPath $productsCssPath -Raw -Encoding UTF8

  $productsCss = Remove-MarkedBlock `
    -Content $productsCss `
    -StartMarker "/* FOREACH_PRODUCTS_TOP_OFFSET_START */" `
    -EndMarker "/* FOREACH_PRODUCTS_TOP_OFFSET_END */"

  $productsCss = Remove-MarkedBlock `
    -Content $productsCss `
    -StartMarker "/* FOREACH_PRODUCT_CENTER_BREADCRUMB_CONTENT_GAP_START */" `
    -EndMarker "/* FOREACH_PRODUCT_CENTER_BREADCRUMB_CONTENT_GAP_END */"

  $productsCss = Remove-MarkedBlock `
    -Content $productsCss `
    -StartMarker "/* SITE_PAGE_SHELL_PRODUCT_CENTER_RESET_START */" `
    -EndMarker "/* SITE_PAGE_SHELL_PRODUCT_CENTER_RESET_END */"

  $productsReset = @'

/* SITE_PAGE_SHELL_PRODUCT_CENTER_RESET_START */
/* 产品中心顶部结构改由 SitePageShell 统一控制 */
.products-selection-page {
  padding-top: 0 !important;
}

@media (max-width: 760px) {
  .products-selection-page {
    padding-top: 0 !important;
  }
}
/* SITE_PAGE_SHELL_PRODUCT_CENTER_RESET_END */
'@

  $productsCss = $productsCss.TrimEnd() + "`r`n" + $productsReset + "`r`n"
  Write-Utf8NoBomFile -Path $productsCssPath -Content $productsCss

  # ---------------------------------------------------------
  # 产品详情：停用此前单独添加的顶部偏移和 productTop 间距。
  # ---------------------------------------------------------

  $detailCss = Get-Content -LiteralPath $detailCssPath -Raw -Encoding UTF8

  $detailCss = Remove-MarkedBlock `
    -Content $detailCss `
    -StartMarker "/* SITE_PAGE_SHELL_PRODUCT_DETAIL_RESET_START */" `
    -EndMarker "/* SITE_PAGE_SHELL_PRODUCT_DETAIL_RESET_END */"

  $detailReset = @'

/* SITE_PAGE_SHELL_PRODUCT_DETAIL_RESET_START */
/* 产品详情顶部结构改由 SitePageShell 统一控制 */
.page {
  padding-top: 0 !important;
}

.productTop {
  margin-top: 0 !important;
}

@media (max-width: 760px) {
  .page {
    padding-top: 0 !important;
  }
}

@media (max-width: 680px) {
  .page {
    padding-top: 0 !important;
  }
}
/* SITE_PAGE_SHELL_PRODUCT_DETAIL_RESET_END */
'@

  $detailCss = $detailCss.TrimEnd() + "`r`n" + $detailReset + "`r`n"
  Write-Utf8NoBomFile -Path $detailCssPath -Content $detailCss

  $nextPath = Join-Path $projectRoot ".next"

  if (Test-Path -LiteralPath $nextPath) {
    Remove-Item -LiteralPath $nextPath -Recurse -Force
    Write-Host "Removed stale .next cache." -ForegroundColor Yellow
  }

  if (-not $SkipBuild) {
    Write-Host ""
    Write-Host "Running npm run build..." -ForegroundColor Cyan

    & npm run build

    if ($LASTEXITCODE -ne 0) {
      throw "Build failed after product page shell integration."
    }

    Write-Host ""
    Write-Host "Build passed." -ForegroundColor Green
  }
  else {
    Write-Host ""
    Write-Host "Build was skipped. Run npm run build manually." -ForegroundColor Yellow
  }

  Write-Host ""
  Write-Host "Completed." -ForegroundColor Green
  Write-Host "Changed now:" -ForegroundColor Cyan
  Write-Host "  /products"
  Write-Host "  /products/[category]/[slug]"
  Write-Host ""
  Write-Host "Existing other pages were not modified." -ForegroundColor Cyan
  Write-Host "Future no-banner pages can reuse SitePageShell." -ForegroundColor Cyan
  Write-Host ""
  Write-Host "External backup directory:" -ForegroundColor Yellow
  Write-Host $backupRoot
}
catch {
  Restore-Backup
  throw
}
finally {
  if (Test-Path -LiteralPath $workerPath) {
    Remove-Item -LiteralPath $workerPath -Force
  }
}
