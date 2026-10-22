"use client";
import {useEffect, useRef, useState} from "react";
import {getSolenoidConfiguration, getSolenoidDrawingAsset, solenoidConfigurationName} from "@/data/products/detail/solenoid-configurations";
const labels = {
  zh: ["常闭 NC", "常开 NO", "该配置的 3D 模型暂未提供", "暂时没有图纸", "阀形式"],
  en: ["Normally closed (NC)", "Normally open (NO)", "3D model not yet available for this configuration", "Drawing not yet available for this configuration", "Valve function"],
  es: ["Normalmente cerrada (NC)", "Normalmente abierta (NO)", "Modelo 3D aún no disponible para esta configuración", "Plano aún no disponible para esta configuración", "Función"],
  fr: ["Normalement fermée (NC)", "Normalement ouverte (NO)", "Modèle 3D non disponible pour cette configuration", "Plan non disponible pour cette configuration", "Fonction"],
  ko: ["상시 닫힘 (NC)", "상시 열림 (NO)", "이 구성의 3D 모델은 아직 제공되지 않습니다", "이 구성의 도면은 아직 제공되지 않습니다", "밸브 기능"],
  ru: ["Нормально закрытый (NC)", "Нормально открытый (NO)", "3D-модель этой конфигурации пока недоступна", "Чертёж этой конфигурации пока недоступен", "Функция клапана"],
};
export default function SolenoidAssets({slug, locale, mode, active, variant, onVariant}: {
  slug: string; locale: string; mode: "3d" | "drawing"; active: boolean; variant: number; onVariant: (value: number) => void;
}) {
  const config = getSolenoidConfiguration(slug);
  const text = labels[locale as keyof typeof labels] || labels.en;
  const frame = useRef<HTMLIFrameElement>(null);
  const [failedDrawing, setFailedDrawing] = useState<string>();
  const id = mode === "drawing" ? getSolenoidDrawingAsset(slug, variant) : config?.assets[variant as 0 | 1] || config?.assets[0];
  useEffect(() => {
    const send = () => frame.current?.contentWindow?.postMessage({type: "solenoid-active", active}, window.location.origin);
    const ready = (event: MessageEvent) => {if (event.origin === window.location.origin && event.source === frame.current?.contentWindow && event.data?.type === "solenoid-ready") send();};
    send(); window.addEventListener("message", ready);
    return () => window.removeEventListener("message", ready);
  }, [active, id]);
  if (!config) return null;
  return <div data-solenoid-assets={mode}>
    {config.key === "two" && !config.state && <div style={{display: "flex", justifyContent: "flex-end", padding: "8px 0 16px"}}>
      <select aria-label={text[4]} value={variant} onChange={e => onVariant(Number(e.target.value))} style={{padding: "9px 14px", border: "1px solid #dce3ed", borderRadius: 8, color: "#173368", background: "white", maxWidth: "100%"}}>
        <option value={0}>{text[0]}</option><option value={1}>{text[1]}</option>
      </select>
    </div>}
    {!id || (mode === "drawing" && failedDrawing === id) ? <div role="status" style={{minHeight: 300, display: "grid", placeItems: "center", textAlign: "center", color: "#637087"}}>{text[mode === "3d" ? 2 : 3]}</div>
      : mode === "drawing" ? <img key={id} loading="lazy" src={`/models/valves/6010/${id}.png`} onError={() => setFailedDrawing(id)} alt={`${solenoidConfigurationName(slug, locale)} ${config.key === "two" ? text[config.state === "no" ? 1 : config.state === "nc" ? 0 : variant] : ""}`} style={{display: "block", width: "100%", maxHeight: 720, objectFit: "contain"}} />
      : <iframe ref={frame} key={id} src={`/models/valves/6010/viewer.html?model=${id}&lang=${locale}`} title={`${solenoidConfigurationName(slug, locale)} 3D`} allow="fullscreen" style={{display: "block", width: "100%", height: "min(680px, 75svh)", minHeight: 440, border: 0, borderRadius: 12}} />}
  </div>;
}
