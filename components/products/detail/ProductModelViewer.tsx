"use client";

import { createElement, useEffect, useId, useRef, useState } from "react";
import styles from "./product-detail.module.css";
import dimensionStyles from "./ProductModelDimensions.module.css";
import ProductModelFeatureDimensions, { FITTING_DIMENSION_ORBIT, FITTING_DIMENSION_TARGET, fittingFeatureHotspots, hasFittingFeatureDimensions, type DimensionModelElement } from "./ProductModelFeatureDimensions";

type Vector = { x: number; y: number; z: number };
type ModelElement = DimensionModelElement & {
  loaded?: boolean;
  getDimensions(): Vector;
  getBoundingBoxCenter(): Vector;
  queryHotspot(name: string): { canvasPosition: { x: number; y: number } } | null;
};
type Measurement = { size: Vector; center: Vector };
const AXES = ["x", "y", "z"] as const;
const dimensionText = (meters: number) => (meters * 1000).toFixed(2);

type ProductModelViewerProps = {
  slug?: string;
  modelName?: string;
  productModel?: string;
  modelUrl?: string;
  locale?: "zh" | "en";
  isActive?: boolean;
};

export default function ProductModelViewer(props: ProductModelViewerProps) {
  return <ProductModelViewerCanvas {...props} />;
}

function ProductModelViewerCanvas({ slug, modelName, productModel, modelUrl, locale = "zh", isActive = true }: ProductModelViewerProps) {
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [attempt, setAttempt] = useState(0);
  const [errorKind, setErrorKind] = useState<"library" | "model">("library");
  const [stepError, setStepError] = useState("");
  const [stepSource, setStepSource] = useState("");
  const [measurement, setMeasurement] = useState<Measurement | null>(null);
  const [showDimensions, setShowDimensions] = useState(true);
  const modelRef = useRef<ModelElement | null>(null);
  const lineRefs = useRef<(SVGLineElement | null)[]>([]);
  const labelRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const markerId = useId().replace(/:/g, "");
  const finalProductName = productModel || modelName || slug || "Product";
  const isStep = /\.(stp|step)$/i.test((modelUrl || "").split(/[?#]/)[0]);
  const isTestPreview = modelUrl?.includes("#test-preview") || false;
  const hasFeatures = hasFittingFeatureDimensions(modelUrl);
  const fileName = (modelUrl || "").split(/[?#]/)[0].split("/").at(-1) || "";

  useEffect(() => {
    if (!modelUrl) return;
    let active = true;
    const controller = new AbortController();
    let worker: Worker | undefined;
    let objectUrl = "";
    const timer = window.setTimeout(() => {
      if (active) {
        active = false; controller.abort(); worker?.terminate();
        setErrorKind(isStep ? "model" : "library"); setStatus("error");
      }
    }, isStep ? 90000 : 30000);
    // Parent mounts this component only after the first 3D tab activation.
    const library = import("@google/model-viewer").catch(error => {
      if (active) setErrorKind("library");
      throw error;
    });
    const convertStep = async () => {
      if (!isStep) return;
      const path = modelUrl.split("#")[0];
      const url = attempt ? `${path}${path.includes("?") ? "&" : "?"}__foreach_3d_retry=${attempt}` : path;
      const response = await fetch(url, { signal: controller.signal });
      if (!response.ok) throw new Error(`STEP_HTTP_${response.status}`);
      const buffer = await response.arrayBuffer();
      const header = new TextDecoder().decode(buffer.slice(0, 8192));
      if (!header.includes("ISO-10303-21")) {
        throw new Error(header.includes("effsoft") ? "STEP_ENCRYPTED" : "STEP_INVALID");
      }
      if (!active) return;
      worker = new Worker("/vendor/occt/step-to-glb.worker.js");
      const glb = await new Promise<ArrayBuffer>((resolve, reject) => {
        worker!.onmessage = event => {
          if (event.data.error) reject(new Error(event.data.error));
          else resolve(event.data.glb);
        };
        worker!.onerror = () => reject(new Error("STEP_IMPORT_FAILED"));
        controller.signal.addEventListener("abort", () => reject(new Error("STEP_CANCELLED")), { once: true });
        worker!.postMessage(buffer, [buffer]);
      });
      worker.terminate();
      if (!active) return;
      objectUrl = URL.createObjectURL(new Blob([glb], { type: "model/gltf-binary" }));
      setStepSource(objectUrl);
    };
    Promise.all([library, convertStep().catch(error => {
      if (active) {
        setErrorKind("model");
        setStepError(error instanceof Error ? error.message : "STEP_IMPORT_FAILED");
      }
      throw error;
    })]).then(() => {
      if (active) { window.clearTimeout(timer); setStatus("ready"); }
    }).catch(error => {
      // Unmounts and React's development effect check intentionally cancel imports.
      if (!active) return;
      window.clearTimeout(timer); controller.abort(); worker?.terminate(); setStatus("error");
      console.error("3D viewer could not load", error);
    });
    return () => {
      active = false; window.clearTimeout(timer); controller.abort(); worker?.terminate();
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [modelUrl, attempt, isStep]);

  useEffect(() => {
    const model = modelRef.current;
    if (status !== "ready" || !model) return;
    const timer = window.setTimeout(() => { setErrorKind("model"); setStatus("error"); }, 45000);
    const loaded = () => {
      window.clearTimeout(timer);
      if (isStep) {
        const size = model.getDimensions();
        if (AXES.every(axis => Number.isFinite(size[axis]) && size[axis] > 0)) {
          setMeasurement({ size, center: model.getBoundingBoxCenter() });
        }
      }
    };
    const failed = () => { window.clearTimeout(timer); setErrorKind("model"); setStatus("error"); };
    model.addEventListener("load", loaded);
    model.addEventListener("error", failed);
    // Cached models can finish before this effect attaches the load listener.
    if (model.loaded) loaded();
    return () => {
      window.clearTimeout(timer);
      model.removeEventListener("load", loaded);
      model.removeEventListener("error", failed);
    };
  }, [status, attempt, isStep]);

  useEffect(() => {
    if (!measurement || !showDimensions || !isActive || hasFeatures) return;
    let frame = 0;
    const updateLines = () => {
      AXES.forEach((axis, index) => {
        const start = modelRef.current?.queryHotspot(`hotspot-${axis}-start`);
        const end = modelRef.current?.queryHotspot(`hotspot-${axis}-end`);
        const line = lineRefs.current[index];
        if (!start || !end || !line) return;
        line.setAttribute("x1", String(start.canvasPosition.x));
        line.setAttribute("y1", String(start.canvasPosition.y));
        line.setAttribute("x2", String(end.canvasPosition.x));
        line.setAttribute("y2", String(end.canvasPosition.y));
        const middle = modelRef.current?.queryHotspot(`hotspot-${axis}-label`);
        const label = labelRefs.current[index];
        if (middle && label) {
          label.style.left = `${middle.canvasPosition.x}px`;
          label.style.top = `${middle.canvasPosition.y}px`;
        }
      });
      frame = requestAnimationFrame(updateLines);
    };
    frame = requestAnimationFrame(updateLines);
    return () => cancelAnimationFrame(frame);
  }, [measurement, showDimensions, isActive, hasFeatures]);

  if (!modelUrl) return <div className={styles.modelViewerFallback}>{locale === "en" ? "No public 3D model is available for this product." : "暂未配置 3D 模型文件"}</div>;
  if (status === "error") return (
    <div className={styles.modelViewerFallback} role="status">
      <div className={styles.modelViewerError}>
        <p>{stepError === "STEP_ENCRYPTED"
          ? (locale === "en" ? "This STEP file is encrypted. Export a web-readable copy through your authorized CAD software." : "当前读取到的是加密文件，请通过已授权的 CAD 软件导出网页可读取的版本。")
          : (locale === "en" ? "The 3D preview could not load. You can still view the specifications and drawings." : "3D 预览加载失败，仍可查看产品参数与图纸。")}</p>
        <button type="button" className={styles.button} onClick={() => {
          // A failed bundled import is cached by the runtime until the document reloads.
          if (errorKind === "library") { window.location.reload(); return; }
          setStatus("loading"); setStepError(""); setMeasurement(null); setAttempt(Date.now());
        }}>{errorKind === "library" ? (locale === "en" ? "Reload page" : "刷新页面") : (locale === "en" ? "Retry 3D preview" : "重新加载 3D")}</button>
      </div>
    </div>
  );
  if (status !== "ready") return <div className={styles.modelViewerFallback} role="status">{isStep
    ? (locale === "en" ? "Reading STEP model..." : "正在读取 STP 模型...")
    : (locale === "en" ? "Loading 3D model..." : "3D 模型加载中...")}</div>;
  // Use a fresh cache key after a failed GLB request; model-viewer also caches loader failures.
  const [modelPath, modelHash] = modelUrl.split("#");
  const source = attempt ? `${modelPath}${modelPath.includes("?") ? "&" : "?"}__foreach_3d_retry=${attempt}${modelHash ? `#${modelHash}` : ""}` : modelUrl;
  const rankedAxes = measurement ? [...AXES].sort((a, b) => measurement.size[b] - measurement.size[a]) : [];
  const labels = locale === "en" ? ["Length", "Width", "Height"] : ["长", "宽", "高"];
  const hotspotChildren = hasFeatures ? fittingFeatureHotspots() : measurement ? AXES.flatMap(axis => {
    const { size, center } = measurement;
    const padding = Math.max(size.x, size.y, size.z) * 0.16;
    const minimum: Vector = { x: center.x - size.x / 2, y: center.y - size.y / 2, z: center.z - size.z / 2 };
    const start: Vector = { x: minimum.x - padding, y: minimum.y - padding, z: minimum.z - padding };
    start[axis] = minimum[axis];
    const end = { ...start, [axis]: minimum[axis] + size[axis] };
    const middle = { ...start, [axis]: center[axis] };
    const position = (point: Vector) => `${point.x}m ${point.y}m ${point.z}m`;
    return [
      createElement("span", { key: `${axis}-start`, slot: `hotspot-${axis}-start`, "data-position": position(start), "data-normal": "0 1 0", className: dimensionStyles.anchor }),
      createElement("span", { key: `${axis}-end`, slot: `hotspot-${axis}-end`, "data-position": position(end), "data-normal": "0 1 0", className: dimensionStyles.anchor }),
      createElement("span", { key: `${axis}-label`, slot: `hotspot-${axis}-label`, "data-position": position(middle), "data-normal": "0 1 0", className: dimensionStyles.anchor, "aria-hidden": true }),
    ];
  }) : [];
  return <div className={`${styles.modelViewerCanvasWrap} ${isStep ? dimensionStyles.frame : ""}`} data-step-preview={isStep || undefined}>
    {createElement("model-viewer", {
      ref: modelRef, key: attempt, src: isStep ? stepSource : source, alt: isTestPreview ? `${fileName} local CAD test model` : `${finalProductName} 3D model`,
      cameraControls: true, autoRotate: isActive && !isStep, shadowIntensity: "0.35", exposure: "0.9",
      ...(isStep ? { cameraOrbit: hasFeatures ? FITTING_DIMENSION_ORBIT : "35deg 65deg 135%" } : {}),
      ...(hasFeatures ? { cameraTarget: FITTING_DIMENSION_TARGET, minCameraOrbit: "auto auto 35%", maxCameraOrbit: "auto auto 230%", interactionPrompt: "none" } : {}),
      ar: false, loading: "eager", className: styles.modelViewerCanvas,
      style: { display: "block", width: "100%", height: "100%", minHeight: "100%" },
    }, ...hotspotChildren)}
    {isStep && !hasFeatures && <div className={dimensionStyles.toolbar}>
      <div className={dimensionStyles.summary}>
        <strong>{locale === "en" ? "Model overall dimensions · mm" : "模型外形尺寸 · mm"}</strong>
        {measurement && showDimensions && !hasFeatures && <div data-model-dimensions="true">{rankedAxes.map((axis, i) => `${labels[i]} ${dimensionText(measurement.size[axis])}`).join(" × ")}</div>}
        <div className={dimensionStyles.file}>{isTestPreview ? (locale === "en" ? "Test file: " : "测试文件：") : ""}{fileName}</div>
      </div>
      {measurement && !hasFeatures && <button type="button" className={dimensionStyles.toggle} aria-pressed={showDimensions} onClick={() => setShowDimensions(value => !value)}>
        {showDimensions ? (locale === "en" ? "Hide dimensions" : "隐藏尺寸") : (locale === "en" ? "Show dimensions" : "显示尺寸")}
      </button>}
    </div>}
    {hasFeatures && measurement && <ProductModelFeatureDimensions modelRef={modelRef} locale={locale} isActive={isActive} />}
    {isStep && !hasFeatures && measurement && showDimensions && <svg className={dimensionStyles.overlay} aria-hidden="true">
      <defs><marker id={markerId} viewBox="0 0 6 6" refX="3" refY="3" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
        <path d="M 6 0 L 0 3 L 6 6" fill="none" stroke="#173368" strokeWidth="1" />
      </marker></defs>
      {AXES.map((axis, index) => <line key={axis} ref={line => { lineRefs.current[index] = line; }} className={dimensionStyles.line} markerStart={`url(#${markerId})`} markerEnd={`url(#${markerId})`} />)}
    </svg>}
    {isStep && !hasFeatures && measurement && showDimensions && AXES.map((axis, index) => <span key={axis} ref={label => { labelRefs.current[index] = label; }} className={dimensionStyles.label}>
      {labels[rankedAxes.indexOf(axis)]} {dimensionText(measurement.size[axis])} mm
    </span>)}
  </div>;
}
