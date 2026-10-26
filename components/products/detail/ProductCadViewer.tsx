"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import LoadingProgress from "@/components/common/LoadingProgress";
import styles from "./ProductCadViewer.module.css";

type CadViewerProps = { modelId: string; title: string; locale: string; active: boolean; headMaterial?: "pmma" | "peek" };
const loadingCopy = {
  zh: ["3D 模型加载中", "3D 模型加载失败，请重试。", "重新加载"],
  en: ["Loading 3D model", "The 3D model could not load. Please try again.", "Retry"],
  es: ["Cargando modelo 3D", "No se pudo cargar el modelo 3D. Inténtelo de nuevo.", "Reintentar"],
  fr: ["Chargement du modèle 3D", "Le modèle 3D n’a pas pu être chargé. Veuillez réessayer.", "Réessayer"],
  ko: ["3D 모델 로딩 중", "3D 모델을 불러오지 못했습니다. 다시 시도해 주세요.", "다시 시도"],
  ru: ["Загрузка 3D-модели", "Не удалось загрузить 3D-модель. Повторите попытку.", "Повторить"],
};

/** Shared CAD viewer for prepared product display models. */
export default function ProductCadViewer(props: CadViewerProps) {
  return <LoadedCadViewer key={`${props.modelId}:${props.locale}:${props.headMaterial || ""}`} {...props} />;
}

function LoadedCadViewer(props: CadViewerProps) {
  const [attempt, setAttempt] = useState(0);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const text = loadingCopy[props.locale === "zh-CN" ? "zh" : props.locale as keyof typeof loadingCopy] || loadingCopy.en;
  const onState = useCallback((next: "ready" | "error") => {
    // A late completion must not silently dismiss a timed-out error.
    setStatus(current => current === "error" ? current : next);
  }, []);
  useEffect(() => {
    if (status !== "loading" || !props.active) return;
    const timer = window.setTimeout(() => setStatus("error"), 60000);
    return () => window.clearTimeout(timer);
  }, [status, props.active, attempt]);
  return <div className={styles.frame} data-cad-model-status={status} data-rpl-model-status={["rpl-p4", "rpl-p635", "rpl-p15", "drpl-0109"].includes(props.modelId) ? status : undefined} aria-busy={status === "loading"}>
    <div inert={status !== "ready"}>
      <CadFrame key={attempt} {...props} attempt={attempt} onState={onState} />
    </div>
    <LoadingProgress active={status === "loading"} label={text[0]} />
    {status === "error" && <div className={styles.error} role="status">
      <p>{text[1]}</p>
      <button type="button" onClick={() => { setStatus("loading"); setAttempt(value => value + 1); }}>{text[2]}</button>
    </div>}
  </div>;
}

function CadFrame({ modelId, title, locale, active, headMaterial, attempt = 0, onState }: CadViewerProps & {
  attempt?: number;
  onState?: (status: "ready" | "error") => void;
}) {
  const frame = useRef<HTMLIFrameElement>(null);
  useEffect(() => {
    const send = () => frame.current?.contentWindow?.postMessage({ type: "solenoid-active", active }, window.location.origin);
    const ready = (event: MessageEvent) => {
      if (event.origin !== window.location.origin || event.source !== frame.current?.contentWindow) return;
      if (event.data?.type === "solenoid-ready") send();
      if (event.data?.type === "cad-rendered") onState?.("ready");
      if (event.data?.type === "cad-error") onState?.("error");
    };
    send(); window.addEventListener("message", ready);
    return () => window.removeEventListener("message", ready);
  }, [active, modelId, onState]);
  return <iframe ref={frame} key={modelId}
    src={`/models/valves/6010/viewer.html?v=fcadl01-20261026&loader=parent&model=${encodeURIComponent(modelId)}&lang=${encodeURIComponent(locale)}${headMaterial ? `&head=${headMaterial}` : ""}${attempt ? `&retry=${attempt}` : ""}`}
    onError={() => onState?.("error")}
    title={`${title} 3D`} allow="fullscreen"
    style={{ display: "block", width: "100%", height: "min(680px, 75svh)", minHeight: 440, border: 0, borderRadius: 12 }} />;
}
