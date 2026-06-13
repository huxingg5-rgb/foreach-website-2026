$ErrorActionPreference = "Stop"
Set-StrictMode -Version Latest

$root = (Get-Location).Path

$packagePath = Join-Path $root "package.json"
$lockPath = Join-Path $root "package-lock.json"
$viewerPath = Join-Path $root "components\products\detail\ProductModelViewer.tsx"
$cssPath = Join-Path $root "components\products\detail\ProductModelViewer.module.css"

foreach ($requiredPath in @($packagePath, $viewerPath, $cssPath)) {
  if (-not (Test-Path -LiteralPath $requiredPath)) {
    throw "没有找到必要文件：$requiredPath"
  }
}

$stamp = Get-Date -Format "yyyyMMdd-HHmmss"

$viewerBackup = $viewerPath + "." + $stamp + ".bak"
$cssBackup = $cssPath + "." + $stamp + ".bak"
$packageBackup = $packagePath + "." + $stamp + ".bak"
$lockBackup = $lockPath + "." + $stamp + ".bak"

$lockExisted = Test-Path -LiteralPath $lockPath

Copy-Item -LiteralPath $viewerPath -Destination $viewerBackup -Force
Copy-Item -LiteralPath $cssPath -Destination $cssBackup -Force
Copy-Item -LiteralPath $packagePath -Destination $packageBackup -Force

if ($lockExisted) {
  Copy-Item -LiteralPath $lockPath -Destination $lockBackup -Force
}

Write-Host ""
Write-Host "已创建备份：" -ForegroundColor Yellow
Write-Host "  $viewerBackup"
Write-Host "  $cssBackup"

$viewerCode = @'
"use client";

/* =========================================================
   ProductModelViewer.tsx
   恒永达官网｜产品详情页 GLB 在线预览

   功能：
   1. 拖动旋转
   2. 滚轮或双指缩放
   3. 正视图
   4. 侧视图
   5. 俯视图
   6. 重置视角
   7. 自动旋转开关
   8. 全屏查看
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

type ModelViewerElement = HTMLElement & {
  loaded?: boolean;
  jumpCameraToGoal?: () => void;
};

const DEFAULT_CAMERA_ORBIT = "0deg 75deg 105%";
const FRONT_CAMERA_ORBIT = "0deg 75deg 105%";
const SIDE_CAMERA_ORBIT = "90deg 75deg 105%";
const TOP_CAMERA_ORBIT = "0deg 0deg 105%";

function getPublicModelSrc(slug: string) {
  const normalizedSlug = slug.trim().toLowerCase();
  const eaMatch = normalizedSlug.match(/^ea-(\d+)/);

  if (!eaMatch) {
    return null;
  }

  return (
    "/assets/products/ea/3d-models/ea-" +
    eaMatch[1] +
    ".glb"
  );
}

export default function ProductModelViewer({
  slug,
  modelName,
}: ProductModelViewerProps) {
  const viewerRef = useRef<ModelViewerElement | null>(null);
  const frameRef = useRef<HTMLDivElement | null>(null);

  const [componentReady, setComponentReady] = useState(false);
  const [status, setStatus] = useState<ViewerStatus>("loading");
  const [isAutoRotate, setIsAutoRotate] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

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

    function handleLoad() {
      setStatus("ready");
    }

    function handleError() {
      setStatus("error");
    }

    if (viewer.loaded) {
      setStatus("ready");
    } else {
      setStatus("loading");
    }

    viewer.addEventListener("load", handleLoad);
    viewer.addEventListener("error", handleError);

    return () => {
      viewer.removeEventListener("load", handleLoad);
      viewer.removeEventListener("error", handleError);
    };
  }, [componentReady, modelSrc]);

  useEffect(() => {
    const viewer = viewerRef.current;

    if (!viewer) {
      return;
    }

    if (isAutoRotate) {
      viewer.setAttribute("auto-rotate", "");
    } else {
      viewer.removeAttribute("auto-rotate");
    }
  }, [isAutoRotate, componentReady]);

  useEffect(() => {
    function handleFullscreenChange() {
      setIsFullscreen(
        document.fullscreenElement === frameRef.current,
      );
    }

    document.addEventListener(
      "fullscreenchange",
      handleFullscreenChange,
    );

    return () => {
      document.removeEventListener(
        "fullscreenchange",
        handleFullscreenChange,
      );
    };
  }, []);

  function changeCameraView(cameraOrbit: string) {
    const viewer = viewerRef.current;

    if (!viewer) {
      return;
    }

    viewer.setAttribute("camera-target", "auto auto auto");
    viewer.setAttribute("camera-orbit", cameraOrbit);
    viewer.jumpCameraToGoal?.();
  }

  function handleFrontView() {
    setIsAutoRotate(false);
    changeCameraView(FRONT_CAMERA_ORBIT);
  }

  function handleSideView() {
    setIsAutoRotate(false);
    changeCameraView(SIDE_CAMERA_ORBIT);
  }

  function handleTopView() {
    setIsAutoRotate(false);
    changeCameraView(TOP_CAMERA_ORBIT);
  }

  function handleResetView() {
    const viewer = viewerRef.current;

    if (!viewer) {
      return;
    }

    viewer.setAttribute("camera-target", "auto auto auto");
    viewer.setAttribute("field-of-view", "30deg");
    viewer.setAttribute(
      "camera-orbit",
      DEFAULT_CAMERA_ORBIT,
    );

    viewer.jumpCameraToGoal?.();
  }

  function handleToggleRotate() {
    setIsAutoRotate((currentValue) => !currentValue);
  }

  async function handleToggleFullscreen() {
    const frame = frameRef.current;

    if (!frame) {
      return;
    }

    try {
      if (document.fullscreenElement === frame) {
        await document.exitFullscreen();
      } else {
        await frame.requestFullscreen();
      }
    } catch (error: unknown) {
      console.error("Fullscreen request failed:", error);
    }
  }

  if (!modelSrc) {
    return (
      <div className={styles.emptyState}>
        当前产品尚未配置公开3D预览模型。
      </div>
    );
  }

  const viewerElement = createElement(
    "model-viewer",
    {
      ref: viewerRef,
      src: modelSrc,
      alt: modelName + " 3D模型",
      className: styles.viewer,
      "camera-controls": "",
      "camera-orbit": DEFAULT_CAMERA_ORBIT,
      "camera-target": "auto auto auto",
      "field-of-view": "30deg",
      "min-camera-orbit": "auto auto 60%",
      "max-camera-orbit": "auto auto 220%",
      "rotation-per-second": "16deg",
      "shadow-intensity": "0.7",
      "interaction-prompt": "none",
      exposure: "1",
      loading: "eager",
      reveal: "auto",
      "auto-rotate": isAutoRotate ? "" : undefined,
    } as Record<string, unknown>,
  );

  const controlsDisabled = status !== "ready";

  return (
    <div
      ref={frameRef}
      className={styles.viewerFrame}
    >
      {viewerElement}

      <div
        className={styles.controlBar}
        aria-label="3D模型查看控制"
      >
        <button
          className={styles.controlButton}
          type="button"
          disabled={controlsDisabled}
          onClick={handleFrontView}
        >
          正视图
        </button>

        <button
          className={styles.controlButton}
          type="button"
          disabled={controlsDisabled}
          onClick={handleSideView}
        >
          侧视图
        </button>

        <button
          className={styles.controlButton}
          type="button"
          disabled={controlsDisabled}
          onClick={handleTopView}
        >
          俯视图
        </button>

        <button
          className={styles.controlButton}
          type="button"
          disabled={controlsDisabled}
          onClick={handleResetView}
        >
          重置视角
        </button>

        <button
          className={[
            styles.controlButton,
            isAutoRotate
              ? styles.controlButtonActive
              : "",
          ]
            .filter(Boolean)
            .join(" ")}
          type="button"
          disabled={controlsDisabled}
          aria-pressed={isAutoRotate}
          onClick={handleToggleRotate}
        >
          {isAutoRotate
            ? "停止旋转"
            : "自动旋转"}
        </button>

        <button
          className={styles.controlButton}
          type="button"
          disabled={controlsDisabled}
          onClick={handleToggleFullscreen}
        >
          {isFullscreen
            ? "退出全屏"
            : "全屏"}
        </button>
      </div>

      {status === "loading" ? (
        <div className={styles.statusLayer}>
          3D模型加载中…
        </div>
      ) : null}

      {status === "error" ? (
        <div className={styles.errorLayer}>
          3D模型读取失败，请检查GLB文件是否完整。
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

$cssCode = @'
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

/* =========================================================
   3D控制按钮
========================================================= */

.controlBar {
  position: absolute;
  top: 14px;
  right: 14px;
  z-index: 4;

  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 8px;

  max-width: calc(100% - 28px);
}

.controlButton {
  display: inline-flex;
  min-width: 72px;
  height: 36px;
  padding: 0 12px;

  align-items: center;
  justify-content: center;

  border: 1px solid rgba(23, 51, 104, 0.22);
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.94);
  color: #173368;

  font-size: 13px;
  line-height: 1;
  font-weight: 500;
  white-space: nowrap;

  cursor: pointer;

  transition:
    border-color 0.18s ease,
    background-color 0.18s ease,
    color 0.18s ease;
}

.controlButton:hover,
.controlButton:focus-visible {
  border-color: #173368;
  background: #173368;
  color: #09e9b4;
  outline: none;
}

.controlButtonActive,
.controlButtonActive:hover,
.controlButtonActive:focus-visible {
  border-color: #173368;
  background: #173368;
  color: #09e9b4;
}

.controlButton:disabled {
  border-color: rgba(23, 51, 104, 0.12);
  background: rgba(255, 255, 255, 0.72);
  color: rgba(23, 51, 104, 0.34);
  cursor: not-allowed;
}

/* =========================================================
   加载与提示
========================================================= */

.statusLayer,
.errorLayer {
  position: absolute;
  inset: 0;
  z-index: 2;

  display: flex;
  padding: 24px;

  align-items: center;
  justify-content: center;

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
  padding: 24px;

  align-items: center;
  justify-content: center;

  color: rgba(23, 51, 104, 0.66);
  font-size: 15px;
  text-align: center;
}

/* =========================================================
   全屏模式
========================================================= */

.viewerFrame:fullscreen {
  width: 100vw;
  height: 100vh;
  min-height: 100vh;
  background: #ffffff;
}

.viewerFrame:fullscreen .viewer {
  width: 100%;
  height: 100vh;
}

.viewerFrame:fullscreen .controlBar {
  top: 20px;
  right: 20px;
}

.viewerFrame:fullscreen .viewerHint {
  right: 20px;
  bottom: 20px;
}

/* =========================================================
   手机端
========================================================= */

@media (max-width: 680px) {
  .viewerFrame {
    min-height: 420px;
  }

  .viewer {
    height: 420px;
  }

  .controlBar {
    top: 10px;
    right: 10px;
    left: 10px;

    display: grid;
    grid-template-columns:
      repeat(3, minmax(0, 1fr));

    max-width: none;
    gap: 6px;
  }

  .controlButton {
    width: 100%;
    min-width: 0;
    height: 34px;
    padding: 0 6px;
    font-size: 12px;
  }

  .viewerHint {
    right: 10px;
    bottom: 10px;
    font-size: 11px;
  }

  .emptyState {
    min-height: 360px;
  }

  .viewerFrame:fullscreen .viewer {
    height: 100vh;
  }

  .viewerFrame:fullscreen .controlBar {
    top: 10px;
    right: 10px;
    left: 10px;
  }
}
'@

try {
  $packageContent = Get-Content -LiteralPath $packagePath -Raw -Encoding UTF8

  if ($packageContent -notmatch '"@google/model-viewer"') {
    Write-Host ""
    Write-Host "正在安装 @google/model-viewer……" -ForegroundColor Cyan

    & npm install "@google/model-viewer"

    if ($LASTEXITCODE -ne 0) {
      throw "@google/model-viewer 安装失败。"
    }
  }

  $utf8 = New-Object System.Text.UTF8Encoding($false)

  [System.IO.File]::WriteAllText($viewerPath, $viewerCode, $utf8)
  [System.IO.File]::WriteAllText($cssPath, $cssCode, $utf8)

  Write-Host ""
  Write-Host "3D模型控制按钮已写入。" -ForegroundColor Green

  $nextPath = Join-Path $root ".next"

  if (Test-Path -LiteralPath $nextPath) {
    Remove-Item -LiteralPath $nextPath -Recurse -Force
    Write-Host "已清理 .next 缓存。" -ForegroundColor Yellow
  }

  Write-Host ""
  Write-Host "正在运行 npm run build……" -ForegroundColor Cyan

  & npm run build

  if ($LASTEXITCODE -ne 0) {
    throw "构建失败。"
  }

  Write-Host ""
  Write-Host "执行完成：" -ForegroundColor Green
  Write-Host " - 正视图"
  Write-Host " - 侧视图"
  Write-Host " - 俯视图"
  Write-Host " - 重置视角"
  Write-Host " - 自动旋转 / 停止旋转"
  Write-Host " - 全屏 / 退出全屏"
  Write-Host " - npm run build 已通过"
}
catch {
  Write-Host ""
  Write-Host "执行失败：$($_.Exception.Message)" -ForegroundColor Red
  Write-Host "正在恢复备份……" -ForegroundColor Yellow

  if (Test-Path -LiteralPath $viewerBackup) {
    Copy-Item -LiteralPath $viewerBackup -Destination $viewerPath -Force
  }

  if (Test-Path -LiteralPath $cssBackup) {
    Copy-Item -LiteralPath $cssBackup -Destination $cssPath -Force
  }

  if (Test-Path -LiteralPath $packageBackup) {
    Copy-Item -LiteralPath $packageBackup -Destination $packagePath -Force
  }

  if ($lockExisted) {
    if (Test-Path -LiteralPath $lockBackup) {
      Copy-Item -LiteralPath $lockBackup -Destination $lockPath -Force
    }
  }
  elseif (Test-Path -LiteralPath $lockPath) {
    Remove-Item -LiteralPath $lockPath -Force
  }

  Write-Host "文件已恢复。" -ForegroundColor Yellow
  throw
}
