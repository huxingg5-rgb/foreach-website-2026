"use client";

import { fittingView } from "@/components/products/detail/fitting-view";
import { useId, useState, type ReactNode } from "react";
import { LUER_COLOR_NAMES, type LuerPart } from "@/data/products/configurator/luer-pairing";
import styles from "./QuickConnectPairSelector.module.css";
import local from "./LuerPairSelector.module.css";

export type LuerEndDraft = { family: string; tube: string; material: string; color: string };
const familyLabels: Record<string, string> = { LPR: "旋转锁圈 LPR", LPS: "固定锁圈 LPS", LP: "一体式 LP",
  LSL: "固定式芯子 LSL", LRL: "旋转式芯子 LRL", LPBL: "鲁尔堵头 LPBL", LS: "普通母端 LS", PMLS: "穿板母端 PMLS" };
const familyOrder = ["LPR", "LPS", "LP", "LSL", "LRL", "LPBL", "LS", "PMLS"];
const colorOrder = ["R", "G", "U", "O", "Y", "B", "W", "N"];
const draftOf = (part: LuerPart): LuerEndDraft => ({family: part.family, tube: part.tube, material: part.material, color: part.colorCode});

export default function LuerEndPicker({ locale = "zh", label, parts, value, onChange, compact = false, children, draftState }: {
  locale?: string;
  label: "公端" | "母端" | "芯子" | "堵头"; parts: LuerPart[]; value: string | null; onChange: (model: string | null) => void;
  compact?: boolean; children?: ReactNode;
  draftState?: { value: LuerEndDraft; onChange: (draft: LuerEndDraft) => void };
}) {
  const initial = parts.find(p => p.model === value) || parts[0];
  const [localDraft, setLocalDraft] = useState(() => draftOf(initial));
  const draft = draftState?.value || localDraft;
  const setDraft = draftState?.onChange || setLocalDraft;
  const [lookup, setLookup] = useState("");
  const id = useId();
  const families = familyOrder.filter(f => parts.some(p => p.family === f));
  const inFamily = parts.filter(p => p.family === draft.family);
  const sizes = [...new Set(inFamily.map(p => p.tube).filter(Boolean))].sort();
  const selected = parts.find(p => p.model === value);
  const colors = colorOrder.filter(c => inFamily.some(p => p.tube === draft.tube && p.material === draft.material && p.colorCode === c));
  function change(patch: Partial<LuerEndDraft>) {
    const next = {...draft, ...patch};
    const familyParts = parts.filter(p => p.family === next.family);
    if (familyParts.every(p => !p.tube)) next.tube = "";
    else if (!next.tube) next.tube = "1.6";
    const available = familyParts.filter(p => p.tube === next.tube && p.material === next.material);
    if (available.length && !available.some(p => p.colorCode === next.color)) next.color = available.find(p => ["N", "W"].includes(p.colorCode))?.colorCode || available[0].colorCode;
    const match = available.find(p => p.colorCode === next.color);
    setDraft(next); setLookup(""); onChange(match?.model || null);
  }
  function choose(part: LuerPart) { setDraft(draftOf(part)); setLookup(part.model); onChange(part.model); }
  const matches = lookup.trim() ? parts.filter(p => p.model.includes(lookup.trim().toUpperCase())).slice(0, 6) : [];
  function row(title: string, values: { value: string; label: string }[], current: string, select: (value: string) => void) {
    return <div className={`${styles.row} ${local.row}`} role="group" aria-label={title}>
      <span className={styles.rowLabel}>{title}</span><div className={styles.chips}>{values.map(option =>
        <button type="button" key={option.value} aria-pressed={current === option.value}
          className={current === option.value ? styles.chipActive : styles.chip} onClick={() => select(option.value)}>{option.label}</button>)}</div>
    </div>;
  }
  return fittingView(<section className={local.endPicker} aria-label={`${label}选型`}>
    <h4>选择{label}</h4>
    <div className={styles.rows}>
      {families.length > 1 ? row(`${label}${label === "母端" ? "安装" : "结构"}`, families.map(f => ({value: f, label: familyLabels[f]})), draft.family, family => change({family})) : null}
      {sizes.length ? row(`${label}管径`, sizes.map(tube => ({value: tube, label: `${tube} mm`})), draft.tube, tube => change({tube})) : null}
      {row(`${label}材质`, ["PP", "PA"].map(material => ({value: material, label: ["母端", "堵头"].includes(label) ? material === "PP" ? "PP · 本色" : "PA · 白色" : material})), draft.material, material => change({material}))}
      {label !== "母端" && colors.length > 1 ? row(`${label}颜色`, colors.map(color => ({value: color, label: LUER_COLOR_NAMES[color]})), draft.color, color => change({color})) : null}
    </div>
    {!selected ? <p className={local.error} role="status">{compact ? "当前网站暂未找到符合所选条件的型号，可联系我们确认。" : <>暂无 {draft.family}、{draft.tube ? `${draft.tube} mm、` : ""}{draft.material}、{LUER_COLOR_NAMES[draft.color]} 的在售型号，请调整规格。</>}</p> : !compact ? <p className={styles.hint}>已选：{selected.model}{selected.tube ? ` · 软管内径 ${selected.tube} mm` : " · 用于母鲁尔口封堵"}</p> : null}
    {children}
    <div className={styles.lookup}>
      <label htmlFor={`${id}-model`}>已知{label}型号？直接输入定位</label>
      <input id={`${id}-model`} type="search" value={lookup} autoComplete="off" spellCheck={false} placeholder={`例如 ${initial.model}`}
        onChange={e => { const text = e.target.value; setLookup(text); const exact = parts.find(p => p.model === text.trim().toUpperCase()); if (exact) choose(exact); }}
        onKeyDown={e => { if (e.key === "Enter" && matches.length) { e.preventDefault(); choose(matches[0]); } else if (e.key === "Escape" && lookup) { e.preventDefault(); setLookup(""); } }} />
      {matches.length ? <div className={styles.suggestions}>{matches.map(p => <button className={styles.suggestion} key={p.model} type="button" onClick={() => choose(p)}>{p.model}</button>)}</div> : null}
      {lookup.trim() && !matches.length ? <p className={styles.lookupStatusError} role="status">未找到可选{label}型号，请检查拼写。</p> : null}
    </div>
  </section>, locale);
}
