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

function Backup-External {
  param(
    [Parameter(Mandatory = $true)]
    [string]$Path
  )

  if (-not (Test-Path -LiteralPath $Path)) {
    return
  }

  $relativePath = $Path.Substring($projectRoot.Length).TrimStart('\')
  $backupRoot = Join-Path $projectParent "$projectName-component-repair-backup-$timestamp"
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

  $directory = Split-Path -Parent $Path

  if (-not (Test-Path -LiteralPath $directory)) {
    New-Item -ItemType Directory -Force -Path $directory | Out-Null
  }

  $encoding = New-Object System.Text.UTF8Encoding($false)
  [System.IO.File]::WriteAllText($Path, $Content, $encoding)

  Write-Host "Repaired: $Path" -ForegroundColor Green
}

$siteBreadcrumbPath = Join-Path $projectRoot "components\common\SiteBreadcrumb.tsx"
$breadcrumbPath = Join-Path $projectRoot "components\common\breadcrumb\Breadcrumb.tsx"

Backup-External -Path $siteBreadcrumbPath
Backup-External -Path $breadcrumbPath

$siteBreadcrumbContent = @'
/* =========================================================
   SiteBreadcrumb.tsx
   恒永达官网｜全站通用面包屑组件

   文件路径：
   components/common/SiteBreadcrumb.tsx

   作用：
   1. 统一官网所有页面的面包屑结构
   2. 避免每个页面重复写 nav / Link / 分隔符
   3. 支持中文页面和多语言页面
   4. 支持两种常用视觉：
      - bar：Banner 下方整条白底面包屑，适合资源中心、关于我们
      - inline：内容容器内轻量面包屑，适合详情页

   注意：
   1. 这个组件只负责展示结构
   2. 页面自己传入文案和链接
   3. 中文默认路径不要加 /zh-CN
========================================================= */

import Link from "next/link";

import styles from "./SiteBreadcrumb.module.css";

export type SiteBreadcrumbItem = {
  label: string;
  href?: string;
};

type SiteBreadcrumbVariant = "bar" | "inline";

type SiteBreadcrumbProps = {
  items: SiteBreadcrumbItem[];
  ariaLabel?: string;
  variant?: SiteBreadcrumbVariant;
  className?: string;
};

export default function SiteBreadcrumb({
  items,
  ariaLabel = "Breadcrumb",
  variant = "bar",
  className = "",
}: SiteBreadcrumbProps) {
  if (!items.length) {
    return null;
  }

  return (
    <nav
      className={`${styles.breadcrumb} ${styles[variant]} ${className}`}
      aria-label={ariaLabel}
    >
      <div className={styles.inner}>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <span className={styles.item} key={`${item.label}-${index}`}>
              {item.href && !isLast ? (
                <Link href={item.href}>{item.label}</Link>
              ) : (
                <strong>{item.label}</strong>
              )}

              {!isLast ? (
                <span className={styles.separator} aria-hidden="true">
                  /
                </span>
              ) : null}
            </span>
          );
        })}
      </div>
    </nav>
  );
}
'@

$breadcrumbContent = @'
/* =========================================================
   Breadcrumb.tsx
   恒永达官网｜公共面包屑组件

   文件路径：
   components/common/breadcrumb/Breadcrumb.tsx

   作用：
   1. 统一官网部分页面的面包屑展示
   2. 支持最后一项不可点击
   3. 页面只负责传入 items 数据
========================================================= */

import Link from "next/link";

import styles from "./Breadcrumb.module.css";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export default function Breadcrumb({
  items,
  className,
}: BreadcrumbProps) {
  if (!items.length) {
    return null;
  }

  return (
    <nav
      className={`${styles.breadcrumb}${className ? ` ${className}` : ""}`}
      aria-label="面包屑导航"
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <span
            className={styles.item}
            key={`${item.label}-${index}`}
          >
            {item.href && !isLast ? (
              <Link href={item.href}>{item.label}</Link>
            ) : (
              <span>{item.label}</span>
            )}
          </span>
        );
      })}
    </nav>
  );
}
'@

Write-Utf8NoBomFile -Path $siteBreadcrumbPath -Content $siteBreadcrumbContent
Write-Utf8NoBomFile -Path $breadcrumbPath -Content $breadcrumbContent

# Move any breadcrumb-removal backup folders outside the Next.js project.
$internalBackupRoot = Join-Path $projectRoot "backup"

if (Test-Path -LiteralPath $internalBackupRoot) {
  $folders = Get-ChildItem `
    -LiteralPath $internalBackupRoot `
    -Directory `
    -ErrorAction SilentlyContinue |
    Where-Object {
      $_.Name -like "remove-visible-breadcrumbs-*"
    }

  foreach ($folder in $folders) {
    $destination = Join-Path `
      $projectParent `
      "$projectName-old-$($folder.Name)-$timestamp"

    Move-Item `
      -LiteralPath $folder.FullName `
      -Destination $destination `
      -Force

    Write-Host "Moved internal backup outside project: $destination" -ForegroundColor Yellow
  }

  $remainingItems = Get-ChildItem `
    -LiteralPath $internalBackupRoot `
    -Force `
    -ErrorAction SilentlyContinue

  if (($remainingItems | Measure-Object).Count -eq 0) {
    Remove-Item -LiteralPath $internalBackupRoot -Force
  }
}

$nextPath = Join-Path $projectRoot ".next"

if (Test-Path -LiteralPath $nextPath) {
  Remove-Item -LiteralPath $nextPath -Recurse -Force
  Write-Host "Removed stale .next cache." -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Both breadcrumb components were repaired." -ForegroundColor Cyan
Write-Host "The global font-weight: 400 override was not changed." -ForegroundColor Cyan

if (-not $SkipBuild) {
  Write-Host ""
  Write-Host "Running npm run build..." -ForegroundColor Cyan

  & npm run build

  if ($LASTEXITCODE -ne 0) {
    throw "Components were repaired, but npm run build still failed. Send the complete error output."
  }

  Write-Host ""
  Write-Host "Build passed." -ForegroundColor Green
}
else {
  Write-Host ""
  Write-Host "Build was skipped. Run npm run build manually." -ForegroundColor Yellow
}
