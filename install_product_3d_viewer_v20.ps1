param(
  [switch]$SkipInstall,
  [switch]$SkipBuild
)

$ErrorActionPreference = "Stop"
Set-StrictMode -Version Latest

$projectRoot = (Get-Location).Path

$packagePath = Join-Path $projectRoot "package.json"
$lockPath = Join-Path $projectRoot "package-lock.json"

$clientPath = Join-Path `
  $projectRoot `
  "components\products\detail\ProductDetailClient.tsx"

$viewerPath = Join-Path `
  $projectRoot `
  "components\products\detail\ProductModelViewer.tsx"

$viewerCssPath = Join-Path `
  $projectRoot `
  "components\products\detail\ProductModelViewer.module.css"

$modelPath = Join-Path `
  $projectRoot `
  "public\assets\products\ea\3d-models\ea-100.glb"

foreach ($requiredPath in @($packagePath, $clientPath)) {
  if (-not (Test-Path -LiteralPath $requiredPath)) {
    throw "Required file not found: $requiredPath"
  }
}

$timestamp = Get-Date -Format "yyyyMMdd-HHmmss"
$backupMap = @{}
$createdPaths = New-Object System.Collections.Generic.List[string]

function Backup-File {
  param(
    [Parameter(Mandatory = $true)]
    [string]$Path
  )

  if (-not (Test-Path -LiteralPath $Path)) {
    return
  }

  $backupPath = "$Path.$timestamp.bak"
  Copy-Item -LiteralPath $Path -Destination $backupPath -Force
  $script:backupMap[$Path] = $backupPath

  Write-Host "Backup created: $backupPath" -ForegroundColor Yellow
}

function Write-Utf8NoBom {
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
}

try {
  Backup-File -Path $packagePath
  Backup-File -Path $lockPath
  Backup-File -Path $clientPath
  Backup-File -Path $viewerPath
  Backup-File -Path $viewerCssPath

  if (-not (Test-Path -LiteralPath $viewerPath)) {
    [void]$createdPaths.Add($viewerPath)
  }

  if (-not (Test-Path -LiteralPath $viewerCssPath)) {
    [void]$createdPaths.Add($viewerCssPath)
  }

  if (-not $SkipInstall) {
    Write-Host ""
    Write-Host "Installing @google/model-viewer..." -ForegroundColor Cyan

    & npm install @google/model-viewer

    if ($LASTEXITCODE -ne 0) {
      throw "npm install @google/model-viewer failed."
    }
  }
  else {
    Write-Host ""
    Write-Host "Dependency installation skipped." -ForegroundColor Yellow
  }

  $viewerContent = @'
"use client";

/* =========================================================
   ProductModelViewer.tsx
   恒永达官网｜产品详情页公开 GLB 预览组件

   规则：
   1. EA-100-PMMA 等材质型号统一读取 ea-100.glb
   2. GLB 只用于网页公开预览
   3. STEP / STP 等工程文件仍通过“申请3D文件”获取
========================================================= */

import {
  createElement,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import styles from "./ProductModelViewer.module.css";

type ProductModelViewerProps = {
  slug: string;
  modelName: string;
};

type ViewerStatus = "loading" | "ready" | "error";

function getPublicModelSrc(slug: string) {
  const normalizedSlug = slug.trim().toLowerCase();

  const eaMatch = normalizedSlug.match(/^ea-(\d+)/);

  if (eaMatch) {
    return `/assets/products/ea/3d-models/ea-${eaMatch[1]}.glb`;
  }

  return null;
}

export default function ProductModelViewer({
  slug,
  modelName,
}: ProductModelViewerProps) {
  const viewerRef = useRef<HTMLElement | null>(null);

  const [componentReady, setComponentReady] = useState(false);
  const [status, setStatus] = useState<ViewerStatus>("loading");

  const modelSrc = useMemo(() => {
    return getPublicModelSrc(slug);
  }, [slug]);

  useEffect(() => {
    let cancelled = false;

    import("@google/model-viewer")
      .then(() => {
        if (!cancelled) {
          setComponentReady(true);
        }
      })
      .catch((error: unknown) => {
        console.error("3D viewer initialization failed:", error);

        if (!cancelled) {
          setStatus("error");
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const viewer = viewerRef.current;

    if (!componentReady || !viewer || !modelSrc) {
      return;
    }

    setStatus("loading");

    function handleLoad() {
      setStatus("ready");
    }

    function handleError() {
      setStatus("error");
    }

    viewer.addEventListener("load", handleLoad);
    viewer.addEventListener("error", handleError);

    return () => {
      viewer.removeEventListener("load", handleLoad);
      viewer.removeEventListener("error", handleError);
    };
  }, [componentReady, modelSrc]);

  if (!modelSrc) {
    return (
      <div className={styles.emptyState}>
        当前产品尚未配置公开 3D 预览模型。
      </div>
    );
  }

  const viewer = createElement(
    "model-viewer",
    {
      ref: viewerRef,
      src: modelSrc,
      alt: `${modelName} 3D模型`,
      className: styles.viewer,

      "camera-controls": "",
      "auto-rotate": "",
      "rotation-per-second": "16deg",
      "shadow-intensity": "0.7",
      "interaction-prompt": "none",

      exposure: "1",
      loading: "eager",
      reveal: "auto",
    } as Record<string, unknown>,
  );

  return (
    <div className={styles.viewerFrame}>
      {viewer}

      {status === "loading" ? (
        <div className={styles.statusLayer}>3D模型加载中…</div>
      ) : null}

      {status === "error" ? (
        <div className={styles.errorLayer}>
          3D模型读取失败，请检查 GLB 文件是否完整。
        </div>
      ) : null}

      {status === "ready" ? (
        <div className={styles.viewerHint}>
          拖动旋转 · 滚轮或双指缩放
        </div>
      ) : null}
    </div>
  );
}
'@

  $viewerCssContent = @'
/* =========================================================
   ProductModelViewer.module.css
   恒永达官网｜产品详情页 GLB 在线预览
========================================================= */

.viewerFrame {
  position: relative;
  width: 100%;
  min-height: 520px;
  overflow: hidden;
  border: 0;
  background: #ffffff;
}

.viewer {
  display: block;
  width: 100%;
  height: 520px;
  border: 0;
  background: #ffffff;

  --poster-color: #ffffff;
  --progress-bar-color: #09e9b4;
}

.statusLayer,
.errorLayer {
  position: absolute;
  inset: 0;
  z-index: 2;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 24px;
  background: rgba(255, 255, 255, 0.9);
  color: #173368;
  font-size: 15px;
  line-height: 1.6;
  text-align: center;
  pointer-events: none;
}

.errorLayer {
  color: #8f2d2d;
}

.viewerHint {
  position: absolute;
  right: 16px;
  bottom: 14px;
  z-index: 3;

  padding: 6px 10px;
  border: 1px solid rgba(23, 51, 104, 0.14);
  background: rgba(255, 255, 255, 0.92);
  color: rgba(23, 51, 104, 0.72);
  font-size: 12px;
  line-height: 1;
  pointer-events: none;
}

.emptyState {
  display: flex;
  width: 100%;
  min-height: 420px;
  align-items: center;
  justify-content: center;

  padding: 24px;
  color: rgba(23, 51, 104, 0.66);
  font-size: 15px;
  text-align: center;
}

@media (max-width: 680px) {
  .viewerFrame,
  .viewer {
    min-height: 420px;
    height: 420px;
  }

  .viewerHint {
    right: 10px;
    bottom: 10px;
  }

  .emptyState {
    min-height: 360px;
  }
}
'@

  Write-Utf8NoBom -Path $viewerPath -Content $viewerContent
  Write-Utf8NoBom -Path $viewerCssPath -Content $viewerCssContent

  $clientContent = Get-Content `
    -LiteralPath $clientPath `
    -Raw `
    -Encoding UTF8

  if ($clientContent -notmatch 'import ProductModelViewer from "\./ProductModelViewer";') {
    $stylesImport = 'import styles from "./product-detail.module.css";'

    if (-not $clientContent.Contains($stylesImport)) {
      throw "Could not find the product detail CSS import."
    }

    $replacementImport = @'
import ProductModelViewer from "./ProductModelViewer";
import styles from "./product-detail.module.css";
'@

    $clientContent = $clientContent.Replace(
      $stylesImport,
      $replacementImport.Trim()
    )
  }

  $viewerReplacement = @'
<div className={styles.panelBox}>
                <ProductModelViewer
                  slug={data.slug}
                  modelName={data.model}
                />
              </div>
'@

  $emptyViewerPattern = @'
(?s)<div\s+className=\{styles\.panelBox\}>\s*<div\s+aria-label=["']3D\s*模型预览区域["']\s*/>\s*</div>
'@

  if ([Regex]::IsMatch($clientContent, $emptyViewerPattern)) {
    $clientContent = [Regex]::Replace(
      $clientContent,
      $emptyViewerPattern,
      $viewerReplacement.Trim(),
      1
    )
  }
  elseif ($clientContent -notmatch '<ProductModelViewer\b') {
    throw @"
Could not find the empty 3D preview placeholder.

Expected structure:
<div className={styles.panelBox}>
  <div aria-label="3D 模型预览区域" />
</div>
"@
  }

  Write-Utf8NoBom -Path $clientPath -Content $clientContent

  Write-Host ""
  Write-Host "3D viewer component created." -ForegroundColor Green
  Write-Host "ProductDetailClient.tsx updated." -ForegroundColor Green

  if (Test-Path -LiteralPath $modelPath) {
    Write-Host "GLB model found: $modelPath" -ForegroundColor Green
  }
  else {
    Write-Host "Warning: GLB model was not found at:" -ForegroundColor Yellow
    Write-Host "  $modelPath" -ForegroundColor Yellow
  }

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
      throw "Build failed."
    }

    Write-Host ""
    Write-Host "Build passed." -ForegroundColor Green
  }
  else {
    Write-Host ""
    Write-Host "Build skipped. Run npm run build manually." -ForegroundColor Yellow
  }

  Write-Host ""
  Write-Host "Completed:" -ForegroundColor Green
  Write-Host " - EA-100-PMMA now loads /assets/products/ea/3d-models/ea-100.glb"
  Write-Host " - Visitors can rotate and zoom the model in the 3D tab"
  Write-Host " - The public GLB remains separate from requested engineering files"
}
catch {
  Write-Host ""
  Write-Host "Update failed: $($_.Exception.Message)" -ForegroundColor Red
  Write-Host "Restoring backups..." -ForegroundColor Yellow

  foreach ($path in $backupMap.Keys) {
    $backupPath = $backupMap[$path]

    if (Test-Path -LiteralPath $backupPath) {
      Copy-Item `
        -LiteralPath $backupPath `
        -Destination $path `
        -Force
    }
  }

  foreach ($createdPath in $createdPaths) {
    if (
      (Test-Path -LiteralPath $createdPath) -and
      -not $backupMap.ContainsKey($createdPath)
    ) {
      Remove-Item -LiteralPath $createdPath -Force
    }
  }

  Write-Host "Source files were restored." -ForegroundColor Yellow
  throw
}
