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