param(
  [switch]$SkipBuild
)

$ErrorActionPreference = "Stop"

$projectRoot = (Get-Location).Path
$projectParent = Split-Path $projectRoot -Parent
$projectName = Split-Path $projectRoot -Leaf
$timestamp = Get-Date -Format "yyyyMMdd-HHmmss"
$backupRoot = Join-Path $projectParent "$projectName-breadcrumb-style-backup-$timestamp"

if (-not (Test-Path -LiteralPath (Join-Path $projectRoot "package.json"))) {
  throw "package.json was not found. Run this script from the project root."
}

function Backup-External {
  param(
    [Parameter(Mandatory = $true)]
    [string]$Path
  )

  if (-not (Test-Path -LiteralPath $Path)) {
    throw "File not found: $Path"
  }

  $relativePath = $Path.Substring($projectRoot.Length).TrimStart('\')
  $targetPath = Join-Path $backupRoot $relativePath
  $targetDirectory = Split-Path -Parent $targetPath

  New-Item -ItemType Directory -Force -Path $targetDirectory | Out-Null
  Copy-Item -LiteralPath $Path -Destination $targetPath -Force

  Write-Host "External backup created: $targetPath" -ForegroundColor Yellow
}

function Write-Utf8NoBomFile {
  param(
    [Parameter(Mandatory = $true)]
    [string]$Path,

    [Parameter(Mandatory = $true)]
    [string]$Content
  )

  $encoding = New-Object System.Text.UTF8Encoding($false)
  [System.IO.File]::WriteAllText($Path, $Content, $encoding)

  Write-Host "Updated: $Path" -ForegroundColor Green
}

$siteCssPath = Join-Path $projectRoot "components\common\SiteBreadcrumb.module.css"
$legacyCssPath = Join-Path $projectRoot "components\common\breadcrumb\Breadcrumb.module.css"

Backup-External -Path $siteCssPath
Backup-External -Path $legacyCssPath

$siteCssContent = @'
/* =========================================================
   SiteBreadcrumb.module.css
   恒永达官网｜全站通用面包屑样式

   统一规则：
   1. 上下保留呼吸空间
   2. 顶部和底部各一条 100% 浏览器宽度横线
   3. bar / inline 统一使用同一种表现
   4. 所有面包屑文字统一为常规字重
========================================================= */

.breadcrumb {
  width: 100vw;
  margin-left: calc(50% - 50vw);
  padding: 18px 0;
  border-top: 1px solid #e3e9f1;
  border-bottom: 1px solid #e3e9f1;
  background: #ffffff;
  color: #7b8798;
  font-size: 14px;
  line-height: 1.6;
  box-sizing: border-box;
}

/*
 * bar 与 inline 统一。
 * 页面仍可继续传 variant，但视觉保持一致。
 */
.bar,
.inline {
  background: #ffffff;
}

.inner {
  display: flex;
  width: min(1600px, calc(100% - 64px));
  min-height: 24px;
  margin: 0 auto;
  align-items: center;
  flex-wrap: wrap;
  gap: 0;
}

.item {
  display: inline-flex;
  align-items: center;
  color: #7b8798;
  font-weight: 400;
}

.item a {
  color: #7b8798;
  font-weight: 400;
  text-decoration: none;
  transition: color 0.18s ease;
}

.item a:hover {
  color: #173368;
}

.item strong {
  color: #173368;
  font-weight: 400;
}

.separator {
  margin: 0 10px;
  color: #b3bdca;
  font-weight: 400;
}

@media (max-width: 900px) {
  .breadcrumb {
    padding: 15px 0;
  }

  .inner {
    width: min(100% - 32px, 1600px);
  }
}
'@

$legacyCssContent = @'
/* =========================================================
   Breadcrumb.module.css
   恒永达官网｜公共面包屑兼容样式

   与 SiteBreadcrumb 保持一致：
   1. 上下保留呼吸空间
   2. 顶部和底部各一条 100% 浏览器宽度横线
   3. 所有文字使用常规字重
========================================================= */

.breadcrumb {
  display: flex;
  width: 100vw;
  min-height: 24px;
  margin-left: calc(50% - 50vw);
  padding:
    18px
    max(32px, calc((100vw - 1600px) / 2));
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  border-top: 1px solid #e3e9f1;
  border-bottom: 1px solid #e3e9f1;
  background: #ffffff;
  color: #7b8798;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.6;
  box-sizing: border-box;
}

.item {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: #7b8798;
  font-weight: 400;
}

.item:not(:last-child)::after {
  content: "/";
  color: #b3bdca;
  font-weight: 400;
}

.item a {
  color: #7b8798;
  font-weight: 400;
  text-decoration: none;
  transition: color 0.18s ease;
}

.item a:hover {
  color: #173368;
}

.item span {
  color: #173368;
  font-weight: 400;
}

@media (max-width: 900px) {
  .breadcrumb {
    padding: 15px 16px;
  }
}
'@

Write-Utf8NoBomFile -Path $siteCssPath -Content $siteCssContent
Write-Utf8NoBomFile -Path $legacyCssPath -Content $legacyCssContent

$nextPath = Join-Path $projectRoot ".next"

if (Test-Path -LiteralPath $nextPath) {
  Remove-Item -LiteralPath $nextPath -Recurse -Force
  Write-Host "Removed stale .next cache." -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Breadcrumb public styles were unified." -ForegroundColor Cyan
Write-Host "Top and bottom borders are full viewport width." -ForegroundColor Cyan
Write-Host "Vertical padding: 18px desktop / 15px mobile." -ForegroundColor Cyan
Write-Host "All breadcrumb text uses font-weight: 400." -ForegroundColor Cyan
Write-Host ""
Write-Host "External backup directory:"
Write-Host $backupRoot -ForegroundColor Yellow

if (-not $SkipBuild) {
  Write-Host ""
  Write-Host "Running npm run build..." -ForegroundColor Cyan

  & npm run build

  if ($LASTEXITCODE -ne 0) {
    throw "Breadcrumb styles were updated, but npm run build failed. Send the complete error output."
  }

  Write-Host ""
  Write-Host "Build passed." -ForegroundColor Green
}
else {
  Write-Host ""
  Write-Host "Build was skipped. Run npm run build manually." -ForegroundColor Yellow
}
