"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import ConfiguratorButton from "../configurator/ConfiguratorButton";
import buttonStyles from "../configurator/ConfiguratorButton.module.css";
import frameStyles from "../configurator/ConfiguratorDialogFrame.module.css";
import shared from "../configurator/product-variant-configurator.module.css";
import type { FlangedConfiguration } from "@/data/products/configurator/flanged-tubing-configurations";
import { normalizeFlangedChoice, validateFlangedChoice } from "@/data/products/configurator/flanged-tubing";
import { buildFlangedDrawingSheets, createFlangedDrawingPdf, downloadDrawingFile, getFlangedDrawingTemplate } from "./flanged-tubing-drawing";
import { assemblyView } from "./assembly-view";
import { assemblyText, assemblyHtmlLocale } from "@/data/products/configurator/tubing-assembly.intl";
import styles from "./FlangedTubingWorkspace.module.css";

export default function FlangedTubingDrawingDialog({ record, onClose, locale = "zh" }: { locale?: string; record: FlangedConfiguration; onClose: () => void }) {
  const [page, setPage] = useState(0), [busy, setBusy] = useState(false), [error, setError] = useState("");
  const ref = useRef<HTMLDialogElement>(null), closeRef = useRef<HTMLButtonElement>(null);
  const invalid = validateFlangedChoice(normalizeFlangedChoice(record.choice));
  const sheets = invalid ? [] : buildFlangedDrawingSheets(record, locale);
  const template = getFlangedDrawingTemplate(record.choice);
  const filename = `${record.name}-R${record.revision}-${assemblyText("管组件矢量选型图", locale)}`;
  useEffect(() => {
    const focus = document.activeElement as HTMLElement | null, overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    ref.current?.showModal(); closeRef.current?.focus();
    return () => { document.body.style.overflow = overflow; if (focus?.isConnected) focus.focus(); };
  }, []);
  async function pdf() {
    if (invalid) { setError(invalid); return; }
    setBusy(true); setError("");
    try { const bytes = await createFlangedDrawingPdf(sheets, filename); downloadDrawingFile(new Blob([new Uint8Array(bytes)], { type: "application/pdf" }), `${filename}.pdf`); }
    catch (error) { console.error("Flanged vector PDF export failed", error); setError("矢量 PDF 生成失败，请重试。"); }
    finally { setBusy(false); }
  }
  return createPortal(assemblyView(<dialog ref={ref} lang={assemblyHtmlLocale(locale)} className={`${styles.drawingDialog} ${shared.theme} ${frameStyles.dialog} ${buttonStyles.blueWhite}`} aria-label={assemblyText("2D 图纸", locale)} onCancel={event => { event.preventDefault(); onClose(); }}>
    <header className={shared.header}><div className={shared.headerText}><h2><span translate="no">{record.name}</span> · 2D 图纸</h2><p>R{record.revision} · {template.label} · 按原始零件图纸生成</p></div><ConfiguratorButton ref={closeRef} variant="close" aria-label="关闭2D图纸" onClick={onClose} /></header>
    <div className={styles.drawingToolbar}><div role="group" aria-label="图纸页面">{sheets.map((_, i) => <ConfiguratorButton key={i} active={page === i} aria-pressed={page === i} onClick={() => setPage(i)}>{i === 0 ? "选型图纸" : `补充说明 ${i}`}</ConfiguratorButton>)}</div><span>{invalid ? "需要重新匹配配置" : `第 ${page + 1} / ${sheets.length} 页`}</span></div>
    {invalid ? <p className={styles.error} role="alert">{invalid} 请返回配置重新匹配接头与管径。</p> : <div className={styles.drawingViewport} data-flanged-generated-drawing="true" dangerouslySetInnerHTML={{ __html: sheets[page] }} />}
    <footer className={`${shared.footer} ${frameStyles.footer}`}><div className={`${shared.notice} ${frameStyles.notice}`} role="status">{error || invalid || "接头外形引用对应原始零件图。管长、规格及物料随当前配置更新；工程签核栏保留。"}</div><div className={shared.actions}><ConfiguratorButton disabled={busy || Boolean(invalid)} onClick={pdf}>{busy ? "正在导出…" : "下载PDF"}</ConfiguratorButton></div></footer>
  </dialog>, locale), document.body);
}
