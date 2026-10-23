"use client";

import { useEffect, useRef } from "react";

/** Shared CAD viewer for externally released product models. */
export default function ProductCadViewer({ modelId, title, locale, active }: {
  modelId: string; title: string; locale: string; active: boolean;
}) {
  const frame = useRef<HTMLIFrameElement>(null);
  useEffect(() => {
    const send = () => frame.current?.contentWindow?.postMessage({ type: "solenoid-active", active }, window.location.origin);
    const ready = (event: MessageEvent) => {
      if (event.origin === window.location.origin && event.source === frame.current?.contentWindow && event.data?.type === "solenoid-ready") send();
    };
    send(); window.addEventListener("message", ready);
    return () => window.removeEventListener("message", ready);
  }, [active, modelId]);
  return <iframe ref={frame} key={modelId}
    src={`/models/valves/6010/viewer.html?model=${encodeURIComponent(modelId)}&lang=${encodeURIComponent(locale)}`}
    title={`${title} 3D`} allow="fullscreen"
    style={{ display: "block", width: "100%", height: "min(680px, 75svh)", minHeight: 440, border: 0, borderRadius: 12 }} />;
}
