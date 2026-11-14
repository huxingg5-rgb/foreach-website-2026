"use client";

import { useEffect, useState } from "react";
import type { FlangedConfiguration } from "@/data/products/configurator/flanged-tubing-configurations";
import { readPdfAttachment, type GeneratedPdfAttachment } from "@/lib/inquiry/pdf-attachments";
import { prepareFlangedPdfAttachment } from "./flanged-tubing-attachments";
import { downloadDrawingFile } from "./flanged-tubing-drawing";
import FlangedTubingDrawingDialog from "./FlangedTubingDrawingDialog";
import styles from "./ConfigurationPdfAttachments.module.css";
import { assemblyView } from "./assembly-view";
import { assemblyLocale, assemblyText } from "@/data/products/configurator/tubing-assembly.intl";

export function useFlangedPdfAttachment(record: FlangedConfiguration, locale = "zh") {
  const signature = JSON.stringify({ record, locale: assemblyLocale(locale) });
  const [attempt, setAttempt] = useState(0);
  const [state, setState] = useState<{ signature: string; attachment?: GeneratedPdfAttachment; error?: string }>({ signature: "" });
  useEffect(() => {
    let current = true;
    // Avoid exporting a PDF for every keystroke in the request's part-number field.
    const timer = window.setTimeout(() => {
      const requested = JSON.parse(signature);
      prepareFlangedPdfAttachment(requested.record, requested.locale).then(
        attachment => { if (current) setState({ signature, attachment }); },
        cause => { if (current) setState({ signature, error: assemblyText(cause instanceof Error ? cause.message : "配置图纸准备失败，请重试。", locale) }); },
      );
    }, 250);
    return () => { current = false; window.clearTimeout(timer); };
  }, [signature, attempt, locale]);
  const attachment = state.signature === signature ? state.attachment : undefined;
  const error = state.signature === signature ? state.error : undefined;
  return { attachment, error, pending: !attachment && !error, retry: () => { setState({ signature: "" }); setAttempt(value => value + 1); } };
}

export default function ConfigurationPdfAttachments({ entries, pending, error, onRetry, disabled = false, international = false, packageFile, locale = international ? "en" : "zh" }: {
  entries: { record: FlangedConfiguration; attachment: GeneratedPdfAttachment }[];
  pending?: boolean; error?: string; onRetry?: () => void; disabled?: boolean; international?: boolean;
  packageFile?: File; locale?: string;
}) {
  const [preview, setPreview] = useState<{ record: FlangedConfiguration; locale: string } | null>(null);
  const [downloadError, setDownloadError] = useState("");
  async function download(attachment: GeneratedPdfAttachment) {
    setDownloadError("");
    try { downloadDrawingFile(await readPdfAttachment(attachment), attachment.name); }
    catch (cause) { setDownloadError(assemblyText(cause instanceof Error ? cause.message : "附件读取失败，请重试。", locale)); }
  }
  return assemblyView(<section className={styles.field} aria-label="配置图纸附件">
    <strong>配置图纸（自动附加）</strong>
    {pending ? <p role="status">正在准备配置 PDF…</p> : null}
    {entries.map(({ record, attachment }) => <div className={styles.file} key={attachment.key}>
      <div><span translate="no">{attachment.name}</span><small><span translate="no">{record.name}</span> · R{record.revision} · {attachment.pageCount} 页 · {(attachment.size / 1024).toFixed(1)} KB</small></div>
      <div className={styles.actions}><button type="button" disabled={disabled} onClick={() => setPreview({ record, locale: attachment.key.match(/^tubing-vector-v\d+-localized:(zh|en|es|fr|ko|ru):/)?.[1] || "zh" })}>预览图纸</button><button type="button" disabled={disabled} onClick={() => download(attachment)}>下载PDF</button></div>
    </div>)}
    {error || downloadError ? <p className={styles.error} role="alert"><span translate="no">{error || downloadError}</span> {onRetry ? <button type="button" disabled={disabled} onClick={onRetry}>重试</button> : null}</p> : null}
    {entries.length > 1 ? <p>提交时会合并为一个 PDF 图纸包，保留各配置的全部页面。</p> : null}
    {entries.length > 1 && packageFile ? <div className={styles.file}><div><span>提交附件：<span translate="no">{packageFile.name}</span></span><small>{(packageFile.size / 1024).toFixed(1)} KB</small></div><button type="button" disabled={disabled} onClick={() => downloadDrawingFile(packageFile, packageFile.name)}>下载图纸包</button></div> : null}
    {preview ? <FlangedTubingDrawingDialog locale={preview.locale} record={preview.record} onClose={() => setPreview(null)} /> : null}
  </section>, locale);
}
