"use client";

import { useEffect, useRef, useState } from "react";
import LoadingProgress from "@/components/common/LoadingProgress";
import styles from "./ProductCadViewer.module.css";
import { fittingView } from "@/components/products/detail/fitting-view";
import { fittingText } from "@/data/products/detail/fitting-ui.intl";

/** Exact Luer CAD, including the reviewed pilot assembly. No fallback models. */
export default function LuerCadViewer({ locale = "zh", parts, active, preview = false, externalResourceTabs = false }: { locale?: string; parts: { model: string }[]; active: boolean; preview?: boolean; externalResourceTabs?: boolean }) {
  const frame = useRef<HTMLIFrameElement>(null);
  const modelKey = parts.map(part => part.model).join("|");
  const [initialKey] = useState(modelKey);
  const viewerVersion = "fitting-locales-20261108-2";
  const latest = useRef({ modelKey, active });
  const [attempt, setAttempt] = useState(0);
  const [result, setResult] = useState({ key: modelKey, status: "loading" });
  const status = result.key === modelKey ? result.status : "loading";

  useEffect(() => {
    latest.current = { modelKey, active };
    const send = () => frame.current?.contentWindow?.postMessage({
      type: "luer-selection", models: latest.current.modelKey.split("|"), active: latest.current.active,
    }, window.location.origin);
    const receive = (event: MessageEvent) => {
      if (event.origin !== window.location.origin || event.source !== frame.current?.contentWindow) return;
      if (event.data?.type === "luer-ready") send();
      if (event.data?.key !== latest.current.modelKey) return;
      if (event.data?.type === "luer-rendered") setResult(current => current.key === modelKey && current.status === "error" ? current : { key: modelKey, status: "ready" });
      if (event.data?.type === "luer-error") setResult({ key: modelKey, status: "error" });
    };
    window.addEventListener("message", receive);
    send();
    return () => window.removeEventListener("message", receive);
  }, [modelKey, active, attempt]);

  useEffect(() => {
    if (status !== "loading" || !active) return;
    const timer = window.setTimeout(() => setResult({ key: modelKey, status: "error" }), 60000);
    return () => window.clearTimeout(timer);
  }, [status, modelKey, active, attempt]);

  return fittingView(<div className={styles.frame} data-luer-cad-status={status} data-luer-cad-preview={String(preview)} aria-busy={status === "loading"}>
    <div inert={status !== "ready"}>
      <iframe ref={frame} key={attempt}
        src={`/models/products/fittings/luer-fittings/viewer${locale === "zh" ? "" : `.${locale}`}.html?v=${viewerVersion}&lang=${locale}&models=${encodeURIComponent(initialKey)}&preview=${preview ? "1" : "0"}${externalResourceTabs ? "&resources=external" : ""}&retry=${attempt}`}
        title={parts.length > 1 ? "鲁尔接头组合 3D 模型与 2D 图纸" : `${parts[0]?.model} 3D 模型与 2D 图纸`} allow="fullscreen"
        onError={() => setResult({ key: modelKey, status: "error" })}
        style={{ display: "block", width: "100%", height: preview ? 290 : "min(680px, 75svh)", minHeight: preview ? 220 : 640, border: 0, borderRadius: preview ? 0 : 12 }} />
    </div>
    <LoadingProgress active={status === "loading"} label={fittingText(parts.length > 1 ? "鲁尔组合 3D 模型加载中" : "鲁尔 3D 模型加载中", locale)} />
    {status === "error" && <div className={styles.error} role="status">
      <p>鲁尔 3D 模型加载失败，请重试。</p>
      <button type="button" onClick={() => { setResult({ key: modelKey, status: "loading" }); setAttempt(value => value + 1); }}>重新加载</button>
    </div>}
  </div>, locale);
}
