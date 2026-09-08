"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { captureReactDiagnostic } from "@/lib/diagnostics/client-capture";

const button: CSSProperties = {
  padding: "10px 16px", border: "1px solid #d8d8d8", borderRadius: 6,
  background: "#fff", color: "#171717", fontSize: 15, cursor: "pointer",
};

export default function GlobalError({ error }: { error: Error & { digest?: string } }) {
  const [report, setReport] = useState("");
  const [copyStatus, setCopyStatus] = useState("");
  const textarea = useRef<HTMLTextAreaElement>(null);
  const details = useRef<HTMLDetailsElement>(null);
  useEffect(() => {
    const capture = captureReactDiagnostic(error);
    // Read after the current error handlers and resource events finish.
    const timer = window.setTimeout(() => {
      const report = capture?.snapshot();
      if (report) setReport(JSON.stringify(report, null, 2));
    }, 0);
    return () => window.clearTimeout(timer);
  }, [error]);
  async function copyReport() {
    const latest = captureReactDiagnostic(error)?.snapshot();
    const text = latest ? JSON.stringify(latest, null, 2) : report;
    setReport(text);
    try {
      await navigator.clipboard.writeText(text);
      setCopyStatus("Copied / 已复制");
    } catch {
      if (details.current) details.current.open = true;
      textarea.current?.focus();
      textarea.current?.select();
      setCopyStatus("Select and copy the text below / 请复制下方已选中的文字");
    }
  }
  return (
    <html lang="en">
      <body style={{ margin: 0, background: "#fff", color: "#171717", fontFamily: "system-ui, sans-serif" }}>
        <main style={{ minHeight: "100vh", display: "grid", alignContent: "center", maxWidth: 680, margin: "auto", padding: "24px", boxSizing: "border-box" }}>
          <div aria-hidden="true" style={{ fontSize: 36 }}>⚠</div>
          <h1 style={{ fontSize: 26, lineHeight: 1.3 }}>This page couldn’t load</h1>
          <p>{error.digest ? "A server error occurred. Reload to try again." : "Reload to try again, or go back."}</p>
          <div style={{ display: "flex", gap: 10 }}>
            <button style={{ ...button, background: "#171717", color: "#fff" }} onClick={() => window.location.reload()}>Reload</button>
            <button style={button} onClick={() => { if (window.history.length > 1) window.history.back(); else window.location.href = "/"; }}>Back</button>
          </div>
          {report ? (
            <section aria-label="Diagnostic report" style={{ marginTop: 24 }}>
              <p style={{ fontSize: 14 }}>Diagnostic mode / 临时诊断模式</p>
              <button style={button} onClick={() => { void copyReport(); }}>Copy diagnostic report / 复制诊断信息</button>
              <p role="status" style={{ fontSize: 13 }}>{copyStatus}</p>
              <details ref={details}>
                <summary>View diagnostic report / 查看诊断信息</summary>
                <textarea ref={textarea} aria-label="Diagnostic report text" readOnly value={report} style={{ width: "100%", height: 220, boxSizing: "border-box", marginTop: 12, fontSize: 12 }} />
              </details>
            </section>
          ) : null}
        </main>
      </body>
    </html>
  );
}
