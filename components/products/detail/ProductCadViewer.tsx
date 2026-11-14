"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import LoadingProgress from "@/components/common/LoadingProgress";
import styles from "./ProductCadViewer.module.css";
import type { FittingCadFinish } from "@/data/products/detail/flat-bottom-fitting-cad-assets";

type CadViewerProps = {
  modelId?: string;
  title: string;
  locale: string;
  active: boolean;
  drawingUrl?: string;
  previewImageUrl?: string;
  productFamily?: "quick-connect" | "fitting";
  headMaterial?: "pmma" | "peek";
  fittingFinish?: FittingCadFinish;
  fittingProduct?: string;
  fittingAccessory?: string;
  quickConnectMate?: string;
  externalResourceTabs?: boolean;
};
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
  return <LoadedCadViewer key={`${props.modelId || "placeholder"}:${props.locale}:${props.drawingUrl || ""}:${props.previewImageUrl || ""}:${props.productFamily || ""}:${props.headMaterial || ""}:${props.fittingFinish || ""}:${props.fittingProduct || ""}`} {...props} />;
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
  return <div className={styles.frame} data-cad-model-status={status} data-rpl-model-status={props.modelId && ["rpl-p4", "rpl-p635", "rpl-p15", "drpl-0109"].includes(props.modelId) ? status : undefined} aria-busy={status === "loading"}>
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

function CadFrame({ modelId, title, locale, active, drawingUrl, productFamily, headMaterial, fittingFinish, fittingProduct, fittingAccessory, quickConnectMate, externalResourceTabs, attempt = 0, onState }: CadViewerProps & {
  attempt?: number;
  onState?: (status: "ready" | "error") => void;
}) {
  const viewerModelId = modelId || "base-2nc";
  const isQuickConnect = productFamily === "quick-connect";
  const placeholder = !modelId;
  const frame = useRef<HTMLIFrameElement>(null);
  const [initialAccessory] = useState(fittingAccessory);
  const latestAccessory = useRef(fittingAccessory);
  const [initialMate] = useState(quickConnectMate);
  const latestMate = useRef(quickConnectMate);
  useEffect(() => {
    latestMate.current = quickConnectMate;
    if (quickConnectMate) frame.current?.contentWindow?.postMessage({ type: "quick-connect-mate", slug: quickConnectMate }, window.location.origin);
  }, [quickConnectMate]);
  useEffect(() => {
    latestAccessory.current = fittingAccessory;
    if (fittingAccessory) frame.current?.contentWindow?.postMessage({ type: "fitting-accessory", code: fittingAccessory }, window.location.origin);
  }, [fittingAccessory]);
  useEffect(() => {
    const send = () => frame.current?.contentWindow?.postMessage({ type: "solenoid-active", active }, window.location.origin);
    const ready = (event: MessageEvent) => {
      if (event.origin !== window.location.origin || event.source !== frame.current?.contentWindow) return;
      if (event.data?.type === "solenoid-ready") {
        send();
        if (latestMate.current) frame.current?.contentWindow?.postMessage({ type: "quick-connect-mate", slug: latestMate.current }, window.location.origin);
        if (latestAccessory.current) frame.current?.contentWindow?.postMessage({ type: "fitting-accessory", code: latestAccessory.current }, window.location.origin);
      }
      if (event.data?.type === "cad-rendered") onState?.("ready");
      if (event.data?.type === "cad-error") onState?.("error");
    };
    send(); window.addEventListener("message", ready);
    return () => window.removeEventListener("message", ready);
  }, [active, modelId, onState]);
  return <iframe ref={frame} key={viewerModelId}
    src={`/models/valves/6010/viewer.html?v=fitting-plugs-20261111-1&loader=parent&model=${encodeURIComponent(viewerModelId)}&lang=${encodeURIComponent(locale)}${externalResourceTabs ? "&resources=external" : ""}${placeholder ? "&placeholder=true" : ""}${drawingUrl ? `&drawing=${encodeURIComponent(drawingUrl)}` : ""}${initialMate ? `&mate=${encodeURIComponent(initialMate)}` : ""}${headMaterial ? `&head=${headMaterial}` : ""}${fittingFinish ? `&finish=${fittingFinish}` : ""}${fittingProduct ? `&product=${encodeURIComponent(fittingProduct)}` : ""}${initialAccessory ? `&accessory=${encodeURIComponent(initialAccessory)}` : ""}${attempt ? `&retry=${attempt}` : ""}`}
    onError={() => onState?.("error")}
    title={`${title} 3D`} allow="fullscreen"
    style={{ display: "block", width: "100%", height: "min(680px, 75svh)", minHeight: isQuickConnect ? 640 : 440, border: 0, borderRadius: 12 }} />;
}
