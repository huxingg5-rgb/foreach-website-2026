"use client";

import { useEffect, useRef, useState } from "react";
import { describeFlangedEndFinish, endConnection, normalizeFlangedChoice, type FlangedEnd, type FlangedTubingChoice } from "@/data/products/configurator/flanged-tubing";
import { assemblyFittingAccessories, getAssemblyFitting, getAssemblyTube } from "@/data/products/configurator/tubing-assembly-catalog";
import { assemblyPreviewAsset, assemblyExteriorPreviewAsset } from "@/data/products/configurator/tubing-assembly-preview";
import { assemblyView } from "../tubing-assemblies/assembly-view";
import { assemblyText } from "@/data/products/configurator/tubing-assembly.intl";
import styles from "./FlangedTubingAssemblyPreview.module.css";

type RenderEnd = FlangedEnd & { enabled: boolean; cadUrl?: string; exteriorSourceModel?: string; accessoryCadUrl?: string; accessoryColor?: string; accessoryMissing?: boolean };
type RenderConfig = { mode: string; inner: number; outer: number; tubeColor: string; tubeMaterial: string; labelA: boolean; labelB: boolean; a: RenderEnd; b: RenderEnd };
type Renderer = { render: (config: RenderConfig) => Promise<void>; dispose: () => void };
type Panel = "tube" | "a" | "b" | "extra";
type Callout = { part: number; panel: Panel; x: number; y: number; path: string; title: string; detail?: string; anchor?: "start" | "middle" | "end" };

function short(text: string, max = 24) { return text.length > max ? `${text.slice(0, max)}…` : text; }

export default function FlangedTubingAssemblyPreview({ locale = "zh", choice: inputChoice, activePart, dimensionNotice, onSelectPanel }: {
  locale?: string; choice: FlangedTubingChoice; activePart: number | null; dimensionNotice?: string; onSelectPanel: (panel: Panel, part?: number) => void;
}) {
  const t = (text: string) => assemblyText(text, locale);
  const choice = normalizeFlangedChoice(inputChoice);
  const tube = getAssemblyTube(choice.tubeModel)!;
  const canvas = useRef<HTMLCanvasElement>(null);
  const instance = useRef<Promise<Renderer> | null>(null);
  const [renderedKey, setRenderedKey] = useState("");
  const [errorKey, setErrorKey] = useState<string | null>(null);
  const renderEnd = (end: FlangedEnd): RenderEnd => {
    const f = getAssemblyFitting(end.fittingModel);
    const accessory = assemblyFittingAccessories(f, endConnection(end), tube.outer).find(a => a.productCode === end.accessoryCode);
    const enabled = Boolean(f?.family === end.series && accessory);
    const preview = enabled ? assemblyPreviewAsset(end, tube.outer) : null;
    const exterior = enabled && !preview ? assemblyExteriorPreviewAsset(end, tube.outer) : null;
    return { ...end, enabled, connection: endConnection(end), cadUrl: preview?.url || exterior?.url, exteriorSourceModel: exterior?.sourceModel,
      accessoryCadUrl: enabled && accessory?.tubeOuterDiameters.includes(tube.outer) ? accessory.cadUrl : undefined, accessoryColor: accessory?.color,
      accessoryMissing: Boolean(enabled && accessory?.tubeOuterDiameters.includes(tube.outer) && !accessory.cadUrl) };
  };
  const config: RenderConfig = {
    mode: choice.mode, inner: tube.inner, outer: tube.outer, tubeColor: tube.color, tubeMaterial: tube.material, labelA: choice.labelA, labelB: choice.labelB,
    a: renderEnd(choice.a), b: renderEnd(choice.b),
  };
  const renderKey = JSON.stringify(config);
  const error = errorKey === renderKey;
  const dimensionLabel = `L = ${choice.length || t("待填写")} mm${choice.tolerance ? ` ±${choice.tolerance} mm` : ""}`;
  const dimensionLabelWidth = [...dimensionLabel].reduce((width, char) => width + (/[\u0000-\u00ff]/.test(char) ? 9 : 15), 24);
  useEffect(() => {
    const target = canvas.current!;
    let released = false;
    const moduleUrl = "/models/products/tubing-assemblies/flanged-assembly-renderer.mjs?v=16-hsf-exact-cad";
    const pending: Promise<Renderer> = import(/* webpackIgnore: true */ moduleUrl).then(module => {
      // Do not create a second WebGL renderer on a canvas released during a
      // pending import (including React's development effect replay).
      if (released) throw new Error("Preview released before initialization");
      return module.createFlangedAssemblyRenderer(target);
    });
    instance.current = pending;
    return () => { released = true; void pending.then(renderer => renderer.dispose()).catch(() => undefined); if (instance.current === pending) instance.current = null; };
  }, []);
  useEffect(() => {
    let canceled = false;
    void instance.current?.then(renderer => renderer.render(JSON.parse(renderKey))).then(() => { if (!canceled) { setErrorKey(null); setRenderedKey(renderKey); } }).catch(() => { if (!canceled) setErrorKey(renderKey); });
    return () => { canceled = true; };
  }, [renderKey]);

  const summaryY = 205;
  const callouts: Callout[] = [
    { part: 2, panel: "a", x: 28, y: 164, anchor: "start", path: "M69 118V149", title: !config.a.enabled ? "配套件待匹配" : endConnection(choice.a) === "翻边" ? `${choice.a.washer || "待选"} 垫片` : endConnection(choice.a) === "卡箍" ? `${config.a.accessoryColor && config.a.accessoryColor !== "本色" ? `${config.a.accessoryColor} ` : ""}${choice.a.washer || "待选"} 卡箍` : "SUS + PEEK 卡环" },
    { part: 4, panel: "a", x: 170, y: summaryY, path: "M170 126V186", title: config.a.enabled ? `A 端 ${choice.a.series} · ${choice.a.thread}` : "A 端接头待匹配", detail: config.a.enabled ? describeFlangedEndFinish(choice.a) : `接管 OD ${tube.outer} mm` },
    { part: 1, panel: "tube", x: 510, y: summaryY, path: "M510 113V186", title: `${tube.material} 管 · ID ${tube.inner} × OD ${tube.outer} mm`, detail: [tube.color, tube.hardness].filter(Boolean).join(" · ") },
  ];
  if (config.a.enabled && choice.a.stop !== "无") callouts.push({ part: 3, panel: "a", x: 329, y: 154, path: "M329 113V136", title: `${choice.a.stop}限位` });
  const tagY = dimensionNotice ? 70 : 53;
  if (choice.labelA) callouts.push({ part: 5, panel: "extra", x: 372, y: tagY, path: `M372 ${tagY + 11}V102`, title: `${t("A 侧管标")} : ${choice.textA || t("待填写")}` });
  if (choice.labelB) callouts.push({ part: 9, panel: "extra", x: 648, y: tagY, path: `M648 ${tagY + 11}V102`, title: `${t("B 侧管标")} : ${choice.textB || t("待填写")}` });
  if (choice.mode === "double") {
    callouts.push(
      { part: 6, panel: "b", x: 992, y: 164, anchor: "end", path: "M951 118V149", title: !config.b.enabled ? "配套件待匹配" : endConnection(choice.b) === "翻边" ? `${choice.b.washer || "待选"} 垫片` : endConnection(choice.b) === "卡箍" ? `${config.b.accessoryColor && config.b.accessoryColor !== "本色" ? `${config.b.accessoryColor} ` : ""}${choice.b.washer || "待选"} 卡箍` : "SUS + PEEK 卡环" },
      { part: 8, panel: "b", x: 850, y: summaryY, path: "M850 126V186", title: config.b.enabled ? `B 端 ${choice.b.series} · ${choice.b.thread}` : "B 端接头待匹配", detail: config.b.enabled ? describeFlangedEndFinish(choice.b) : `接管 OD ${tube.outer} mm` },
    );
    if (config.b.enabled && choice.b.stop !== "无") callouts.push({ part: 7, panel: "b", x: 691, y: 154, path: "M691 113V136", title: `${choice.b.stop}限位` });
  } else callouts.push({ part: 6, panel: "b", x: 980, y: summaryY, anchor: "end", path: "M978 113V186", title: "B 端 · 自由管端" });

  return assemblyView(<figure className={styles.figure} data-flanged-cad-preview="true" data-exterior-source-a={config.a.exteriorSourceModel} data-exterior-source-b={choice.mode === "double" ? config.b.exteriorSourceModel : undefined} data-render-ready={String(renderedKey === renderKey && !error)}>
    <div className={styles.graphViewport}><div className={styles.stage}>
      <canvas ref={canvas} className={styles.canvas} role="img" aria-label={`${t("管组件渲染预览")} · ${tube.material} · A: ${config.a.enabled ? choice.a.series : t("待匹配")} · B: ${choice.mode === "double" ? config.b.enabled ? choice.b.series : t("待匹配") : t("自由管端")}`} />
      {renderedKey !== renderKey || error ? <div className={styles.status} role="status">{error ? "预览暂时无法加载，请重新打开选型。" : "正在加载组件预览…"}</div> : null}
      <svg className={styles.annotations} viewBox="0 0 1020 220" aria-label="管组件直接参数标注" role="group">
        <text className={styles.calloutTitle} x="170" y="57" textAnchor="middle" data-end-label="a">A 端</text>
        <text className={styles.calloutTitle} x={choice.mode === "double" ? 850 : 978} y="57" textAnchor={choice.mode === "double" ? "middle" : "end"} data-end-label="b">B 端</text>
        {(["a", ...(choice.mode === "double" ? ["b"] : [])] as ("a" | "b")[]).map(side => {
          if (config[side].cadUrl) return null;
          if (!config[side].enabled) return <text key={side} x={side === "a" ? 170 : 850} y="95" textAnchor="middle" fontSize="11" fill="#667085">接头待匹配 · OD {tube.outer} mm</text>;
          return <text key={side} x={side === "a" ? 170 : 850} y="95" textAnchor="middle" fontSize="11" fill="#667085">该型号渲染资料待补充</text>;
        })}
        <g className={`${styles.dimension} ${activePart === 10 ? styles.dimensionSelected : ""}`} data-flanged-preview-part={10} role="button" tabIndex={0} aria-label="成品长度与公差，点击修改" onClick={() => onSelectPanel("tube", 10)} onKeyDown={event => { if (["Enter", " "].includes(event.key)) { event.preventDefault(); onSelectPanel("tube", 10); } }}>
          <defs><marker id="flanged-dimension-arrow" viewBox="0 0 8 8" refX="4" refY="4" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M1 1L7 4L1 7" fill="none" stroke="currentColor" /></marker></defs>
          <path d="M43 10V31M977 10V31M43 21H977" /><path d="M47 21H973" markerStart="url(#flanged-dimension-arrow)" markerEnd="url(#flanged-dimension-arrow)" /><rect x={510 - dimensionLabelWidth / 2} y="9" width={dimensionLabelWidth} height="24" fill="#fff" stroke="none" /><text x="510" y="21" textAnchor="middle" dominantBaseline="central">{dimensionLabel}</text>
        </g>
        {dimensionNotice ? <text className={styles.dimensionNotice} x="510" y="46" textAnchor="middle" role="status">{dimensionNotice}</text> : null}
        {callouts.map(item => {
          const anchor = item.anchor || "middle", left = anchor === "start" ? item.x : anchor === "end" ? item.x - 240 : item.x - 120;
          const inlineDetail = item.part === 1 || item.part === 4 || item.part === 8;
          const accessoryMissing = item.part === 2 ? config.a.accessoryMissing : item.part === 6 && choice.mode === "double" ? config.b.accessoryMissing : false;
          const userLabel = item.part === 5 || item.part === 9;
          const caption = (userLabel ? item.title : t(item.title.replace(/^[AB] 端\s*/, ""))) + (accessoryMissing ? ` (${t("暂无3D模型")})` : "");
          const label = inlineDetail && item.detail ? `${caption}${locale === "zh" ? "（" : " ("}${t(item.detail)}${locale === "zh" ? "）" : ")"}` : caption;
          const maxWidth = inlineDetail ? 325 : 250;
          const labelWidth = [...label].reduce((sum, char) => sum + (/\p{Script=Han}|\p{Script=Hangul}/u.test(char) ? 14 : 7.2), 0);
          const detail = inlineDetail ? undefined : item.detail;
          return <g key={item.part} data-assembly-user-text={item.part === 5 || item.part === 9 ? true : undefined} className={`${styles.calloutGroup} ${activePart === item.part ? styles.selected : ""}`} data-flanged-preview-part={item.part}>
            <path className={styles.leader} d={item.path} />
            <g className={styles.callout} role="button" tabIndex={0} aria-label={`${userLabel ? item.title : t(item.title)}${item.detail ? `, ${t(item.detail)}` : ""}, ${t("点击修改")}`} onClick={() => onSelectPanel(item.panel, item.part)} onKeyDown={event => { if (["Enter", " "].includes(event.key)) { event.preventDefault(); onSelectPanel(item.panel, item.part); } }}>
              <title>{userLabel ? item.title : t(item.title)}{item.detail ? ` · ${t(item.detail)}` : ""}</title><rect x={left} y={item.y - 15} width={240} height={detail ? 42 : 24} fill="transparent" />
              <text className={styles.calloutTitle} x={item.x} y={item.y} textAnchor={anchor} fontSize={Math.min(14, 14 * maxWidth / Math.max(maxWidth, labelWidth))} style={{ fontSize: `${Math.min(14, 14 * maxWidth / Math.max(maxWidth, labelWidth))}px` }}>{label}</text>
              {detail ? <text className={styles.calloutDetail} x={item.x} y={item.y + 18} textAnchor={anchor}>{short(detail)}</text> : null}
            </g>
          </g>;
        })}
      </svg>
    </div></div>
  </figure>, locale);
}
