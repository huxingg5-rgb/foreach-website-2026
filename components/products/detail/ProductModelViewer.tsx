"use client";

import { createElement, useEffect, useRef, useState } from "react";
import styles from "./product-detail.module.css";

type ProductModelViewerProps = {
  slug?: string;
  modelName?: string;
  productModel?: string;
  modelUrl?: string;
  locale?: "zh" | "en";
  isActive?: boolean;
};

export default function ProductModelViewer({ slug, modelName, productModel, modelUrl, locale = "zh", isActive = true }: ProductModelViewerProps) {
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [attempt, setAttempt] = useState(0);
  const [errorKind, setErrorKind] = useState<"library" | "model">("library");
  const modelRef = useRef<HTMLElement | null>(null);
  const finalProductName = productModel || modelName || slug || "Product";

  useEffect(() => {
    if (!modelUrl) return;
    let active = true;
    const timer = window.setTimeout(() => {
      if (active) { active = false; setErrorKind("library"); setStatus("error"); }
    }, 30000);
    // Parent mounts this component only after the first 3D tab activation.
    import("@google/model-viewer").then(() => {
      if (active) { window.clearTimeout(timer); setStatus("ready"); }
    }).catch(error => {
      if (active) { window.clearTimeout(timer); setErrorKind("library"); setStatus("error"); }
      console.error("3D viewer could not load", error);
    });
    return () => { active = false; window.clearTimeout(timer); };
  }, [modelUrl, attempt]);

  useEffect(() => {
    const model = modelRef.current;
    if (status !== "ready" || !model) return;
    const timer = window.setTimeout(() => { setErrorKind("model"); setStatus("error"); }, 45000);
    const loaded = () => window.clearTimeout(timer);
    const failed = () => { window.clearTimeout(timer); setErrorKind("model"); setStatus("error"); };
    model.addEventListener("load", loaded);
    model.addEventListener("error", failed);
    // Cached models can finish before this effect attaches the load listener.
    if ((model as HTMLElement & { loaded?: boolean }).loaded) loaded();
    return () => {
      window.clearTimeout(timer);
      model.removeEventListener("load", loaded);
      model.removeEventListener("error", failed);
    };
  }, [status, attempt]);

  if (!modelUrl) return <div className={styles.modelViewerFallback}>{locale === "en" ? "No public 3D model is available for this product." : "暂未配置 3D 模型文件"}</div>;
  if (status === "error") return (
    <div className={styles.modelViewerFallback} role="status">
      <div className={styles.modelViewerError}>
        <p>{locale === "en" ? "The 3D preview could not load. You can still view the specifications and drawings." : "3D 预览加载失败，仍可查看产品参数与图纸。"}</p>
        <button type="button" className={styles.button} onClick={() => {
          // A failed bundled import is cached by the runtime until the document reloads.
          if (errorKind === "library") { window.location.reload(); return; }
          setStatus("loading"); setAttempt(Date.now());
        }}>{errorKind === "library" ? (locale === "en" ? "Reload page" : "刷新页面") : (locale === "en" ? "Retry 3D preview" : "重新加载 3D")}</button>
      </div>
    </div>
  );
  if (status !== "ready") return <div className={styles.modelViewerFallback} role="status">{locale === "en" ? "Loading 3D model..." : "3D 模型加载中..."}</div>;
  // Use a fresh cache key after a failed GLB request; model-viewer also caches loader failures.
  const [modelPath, modelHash] = modelUrl.split("#");
  const source = attempt ? `${modelPath}${modelPath.includes("?") ? "&" : "?"}__foreach_3d_retry=${attempt}${modelHash ? `#${modelHash}` : ""}` : modelUrl;
  return <div className={styles.modelViewerCanvasWrap}>
    {createElement("model-viewer", {
      ref: modelRef, key: attempt, src: source, alt: `${finalProductName} 3D model`,
      cameraControls: true, autoRotate: isActive, shadowIntensity: "0.35", exposure: "0.9",
      ar: false, loading: "eager", className: styles.modelViewerCanvas,
      style: { display: "block", width: "100%", height: "100%", minHeight: "100%" },
    })}
  </div>;
}
