"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import ConfiguratorButton from "../configurator/ConfiguratorButton";
import buttonStyles from "../configurator/ConfiguratorButton.module.css";
import frameStyles from "../configurator/ConfiguratorDialogFrame.module.css";
import shared from "../configurator/product-variant-configurator.module.css";
import type { FlangedTubingChoice } from "@/data/products/configurator/flanged-tubing";
import styles from "./FlangedTubingWorkspace.module.css";

export default function FlangedTubingModelDialog({ choice, name, onClose }: { choice: FlangedTubingChoice; name: string; onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null), close = useRef<HTMLButtonElement>(null), frame = useRef<HTMLIFrameElement>(null);
  const key = JSON.stringify(choice);
  const [status, setStatus] = useState("loading"), [missing, setMissing] = useState<string[]>([]), [canExport, setCanExport] = useState(false);
  const [exporting, setExporting] = useState(false), [error, setError] = useState("");
  const latest = useRef({ choice, name, key });
  useEffect(() => {
    const focused = document.activeElement as HTMLElement | null, overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden"; dialog.current?.showModal(); close.current?.focus();
    return () => { document.body.style.overflow = overflow; if (focused?.isConnected) focused.focus(); };
  }, []);
  useEffect(() => {
    latest.current = { choice, name, key };
    const send = () => frame.current?.contentWindow?.postMessage({ type: "tubing-3d-selection", ...latest.current, active: true }, window.location.origin);
    function receive(event: MessageEvent) {
      if (event.origin !== window.location.origin || event.source !== frame.current?.contentWindow) return;
      if (event.data?.type === "tubing-3d-ready") { send(); return; }
      if (event.data?.type === "tubing-3d-error" && (!event.data.key || event.data.key === latest.current.key)) { setStatus("error"); setCanExport(false); return; }
      if (event.data?.key !== latest.current.key) return;
      if (event.data?.type === "tubing-3d-rendered") {
        setStatus("ready"); setMissing((event.data.missing || []).map((part: { label: string }) => part.label)); setCanExport(Boolean(event.data.canExport));
      }
      if (event.data?.type === "tubing-3d-exported") {
        setExporting(false);
        if (!(event.data.bytes instanceof ArrayBuffer)) { setError("3D 文件导出失败，请重试。"); return; }
        const href = URL.createObjectURL(new Blob([event.data.bytes], { type: "model/gltf-binary" })), link = document.createElement("a");
        link.href = href; link.download = `${latest.current.name.replace(/[<>:"/\\|?*]/g, "-")}-管组件.glb`;
        document.body.appendChild(link); link.click(); link.remove(); window.setTimeout(() => URL.revokeObjectURL(href), 60000); setError("");
      }
      if (event.data?.type === "tubing-3d-export-error") { setExporting(false); setError("3D 文件导出失败，请重试。"); }
    }
    window.addEventListener("message", receive); send();
    return () => window.removeEventListener("message", receive);
  }, [choice, name, key]);
  useEffect(() => {
    if (status !== "loading") return;
    const timer = window.setTimeout(() => setStatus("error"), 60000);
    return () => window.clearTimeout(timer);
  }, [status]);
  return createPortal(<dialog ref={dialog} data-tubing-3d-dialog="true" data-tubing-3d-status={status} className={`${styles.drawingDialog} ${shared.theme} ${frameStyles.dialog} ${buttonStyles.blueWhite}`} aria-label={`${name} 的 3D 模型`} onCancel={event => { event.preventDefault(); onClose(); }}>
    <header className={shared.header}><div className={shared.headerText}><h2>{name} · 3D 模型</h2><p>直管展示 · 接头与管径保持实际尺寸比例</p></div><ConfiguratorButton ref={close} variant="close" aria-label="关闭3D模型" onClick={onClose} /></header>
    <div className={styles.modelViewport}>
      <iframe ref={frame} title="管组件交互式3D模型" src="/models/products/tubing-assemblies/interactive/viewer.html?v=tubing-assembly-2" allow="fullscreen" onError={() => setStatus("error")} />
      {status === "error" ? <div className={styles.modelError} role="alert">3D 模型加载失败，请关闭后重试。</div> : null}
    </div>
    <footer className={`${shared.footer} ${frameStyles.footer}`}><div className={`${shared.notice} ${frameStyles.notice}`} role="status">{error || (missing.length ? missing.join("；") : "管子长度按 L 标注，3D 中使用固定展示长度。下载格式：GLB。")}</div><div className={shared.actions}><ConfiguratorButton disabled={status !== "ready" || !canExport || exporting} title={missing.length ? "请补齐对应零件的 3D 文件后下载完整组件" : !canExport ? "请先填写有效的成品长度" : undefined} onClick={() => {
      setExporting(true); setError(""); frame.current?.contentWindow?.postMessage({ type: "tubing-3d-export", key }, window.location.origin);
    }}>{exporting ? "正在导出…" : "下载3D文件"}</ConfiguratorButton></div></footer>
  </dialog>, document.body);
}
