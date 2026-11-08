"use client";

import { fittingView } from "@/components/products/detail/fitting-view";
import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { describeLuerPart, getLuerPlugChoice, resolveLuerPair, type LuerCombinationType, type LuerPairChoice, type LuerPairConfig, type LuerPart } from "@/data/products/configurator/luer-pairing";
import { getLuerRole } from "@/data/products/configurator/luer-combination";
import styles from "./QuickConnectPairSelector.module.css";
import local from "./LuerPairSelector.module.css";
import LuerAssemblyPreview from "./LuerAssemblyPreview";
import LuerEndPicker, { type LuerEndDraft } from "./LuerEndPicker";
import ConfiguratorDialogFrame from "./ConfiguratorDialogFrame";
import ConfiguratorButton from "./ConfiguratorButton";

type Props = {
  locale?: string;
  config: LuerPairConfig; value: LuerPairChoice | null; needDrawing: boolean;
  presentation?: "standard" | "compact";
  onClose: () => void; onConfirm: (choice: LuerPairChoice) => void;
  onAdd: (choice: LuerPairChoice) => void; isAdded: (choice: LuerPairChoice) => boolean;
};
type PairChoice = Extract<LuerPairChoice, {mode: "pair"}>;

export default function LuerPairSelector({ locale = "zh", config, value, needDrawing, presentation = "standard", onClose, onConfirm, onAdd, isAdded }: Props) {
  const isCompact = presentation === "compact";
  const coreSelection = config.allowCoreAssembly;
  const unified = config.unifiedSelection;
  const singleName = config.baseRole === "core" ? "鲁尔芯子" : config.base.name;
  const typeLabels: Record<LuerCombinationType, string> = {
    single: `单独${singleName}`, core: "芯子＋锁圈组合", panel: "穿板鲁尔组合", inline: "非穿板鲁尔组合", plug: "堵头封堵组合",
  };
  const initial = value || config.defaultChoice;
  const [mode, setMode] = useState(initial.mode);
  const [form, setForm] = useState<PairChoice>(() => initial.mode === "pair" ? initial : {
    ...config.defaultPairChoice,
    ...(initial.mode === "core" ? {maleModel: initial.maleModel ?? config.defaultPairChoice.maleModel, collarModel: initial.collarModel} : {}),
  });
  const [sealing, setSealing] = useState(() => config.baseRole === "plug" ||
    (initial.mode === "pair" && config.males.some(p => p.model === initial.maleModel && p.family === "LPBL")));
  const plugChoice = getLuerPlugChoice(config);
  const [femaleDraft, setFemaleDraft] = useState<LuerEndDraft>(() => {
    const part = config.females.find(p => p.model === form.femaleModel) || config.females[0];
    return {family: part.family, tube: part.tube, material: part.material, color: part.colorCode};
  });
  const id = useId(), dialog = useRef<HTMLElement>(null), closeButton = useRef<HTMLButtonElement>(null);
  const closeRef = useRef(onClose);
  useEffect(() => { closeRef.current = onClose; }, [onClose]);
  useEffect(() => {
    const focus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const overflow = document.body.style.overflow;
    const backdrop = dialog.current?.parentElement;
    const background = Array.from(document.body.children)
      .filter((element): element is HTMLElement => element instanceof HTMLElement && element !== backdrop)
      .map(element => ({ element, inert: element.inert }));
    background.forEach(({ element }) => { element.inert = true; });
    document.body.style.overflow = "hidden"; closeButton.current?.focus();
    const handleKey = (event: KeyboardEvent) => {
      if (event.defaultPrevented) return;
      if (event.key === "Escape") { event.preventDefault(); closeRef.current(); }
      if (event.key !== "Tab") return;
      const elements = dialog.current?.querySelectorAll<HTMLElement>("button:not(:disabled), a[href], input:not(:disabled), select:not(:disabled)");
      if (!elements?.length) return;
      const first = elements[0], last = elements[elements.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("keydown", handleKey); document.body.style.overflow = overflow;
      background.forEach(({ element, inert }) => { element.inert = inert; });
      if (focus?.isConnected) focus.focus();
    };
  }, []);

  const male = config.males.find(p => p.model === form.maleModel);
  const female = config.females.find(p => p.model === form.femaleModel);
  const panel = unified ? femaleDraft.family === "PMLS" : female?.family === "PMLS";
  const combinationType: LuerCombinationType = mode === "pair" ? sealing ? "plug" : panel ? "panel" : "inline" : mode;
  const maleOptions = config.males.filter(p => sealing ? p.family === "LPBL" : p.family !== "LPBL");
  const femaleOptions = unified ? config.females.filter(p => p.family === femaleDraft.family) : config.females;
  const needsCollar = male && getLuerRole(male.family) === "core";
  const choice: LuerPairChoice = mode === "single" ? {mode: "single"}
    : mode === "core" ? {mode: "core", maleModel: form.maleModel, collarModel: form.collarModel} : {...form,
    collarModel: needsCollar ? form.collarModel : null,
    ringModel: panel ? form.ringModel : null, nutModel: panel ? form.nutModel : null};
  const parts = resolveLuerPair(config, choice), added = isAdded(choice);
  const currentNote = config.baseRole === "core" ? "当前芯子 · 组合时需搭配锁圈"
    : config.baseRole === "male" && config.base.family !== "LP" ? "当前公端 · 已含锁圈"
    : config.baseRole === "plug" ? "当前堵头 · 用于母鲁尔口封堵" : "当前型号 · 组合中保留此零件";
  function selectPairMode(plug: boolean) {
    if (plug && !plugChoice) return;
    if (plug !== sealing) setForm(current => ({...current,
      maleModel: (plug ? plugChoice! : config.defaultPairChoice).maleModel,
      collarModel: plug ? null : config.defaultPairChoice.collarModel}));
    setSealing(plug); setMode("pair");
  }
  function selectCombinationType(type: LuerCombinationType) {
    if (!config.combinationTypes.includes(type)) return;
    if (type === "single" || type === "core") { setMode(type); return; }
    if (type === "plug") { selectPairMode(true); return; }
    const next = {...femaleDraft, family: type === "panel" ? "PMLS" : "LS"};
    const match = config.females.find(p => p.family === next.family && p.tube === next.tube
      && p.material === next.material && p.colorCode === next.color);
    setFemaleDraft(next);
    setForm(current => ({...current, femaleModel: match?.model || null,
      maleModel: sealing ? config.defaultPairChoice.maleModel : current.maleModel}));
    setSealing(false);
    setMode("pair");
  }
  function image(part: LuerPart) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={part.imagePath} alt={`${part.name} ${part.model}`} />;
  }
  function accessory(label: string, key: "collarModel" | "ringModel" | "nutModel", options: LuerPart[], required = false) {
    const fixed = options.some(p => p.model === config.base.model);
    const selected = form[key], defaultModel = key === "ringModel" ? config.defaultRing : key === "nutModel" ? config.defaultNut : options[0].model;
    const current = options.find(p => p.model === (selected || defaultModel)) || options[0];
    const colorOptions = fixed ? options.filter(p => p.model === config.base.model) : options;
    const inactive = !required && !selected;
    return <div className={local.accessory}>
      <label>{!required && !fixed ? <input type="checkbox" checked={Boolean(selected)} onChange={e => setForm(current => ({...current, [key]: e.target.checked ? defaultModel : null}))} /> : null}{label}{fixed ? "（当前型号）" : required ? "（必配）" : ""}</label>
      <div className={`${local.accessoryOptions}${inactive ? ` ${local.accessoryInactive}` : ""}`}>
        <div className={styles.chips} role="group" aria-label={`${label}颜色`} aria-disabled={fixed || inactive}>
          {colorOptions.map(p => <button key={p.model} type="button" aria-pressed={current.model === p.model}
            className={current.model === p.model ? styles.chipActive : styles.chip}
            title={`${p.material} · ${p.model}`} disabled={fixed || inactive}
            onClick={() => setForm(current => ({...current, [key]: p.model}))}>{p.color}</button>)}
        </div>
        <p className={styles.hint}>{current.material} · {current.model}</p>
      </div>
    </div>;
  }
  const pairAccessories = panel || (unified && needsCollar) ? <div className={local.accessories}><h4>{panel ? "穿板配套附件" : "配套附件"}</h4>
    {panel && <p className={styles.hint}>{isCompact ? "面板厚度 ≤3.5 mm；已有色环或螺母时可取消选购。" : "面板厚度 ≤3.5 mm，开孔按穿板母鲁尔与色环配合尺寸加工。已有对应附件时可取消选购。"}</p>}
    {unified && needsCollar && accessory("配套锁圈", "collarModel", config.collars, true)}
    {panel && <>
      {accessory("识别色环", "ringModel", config.rings)}{accessory("固定螺母", "nutModel", config.nuts)}
      {!form.ringModel || !form.nutModel ? <p className={styles.hint}>本次未加入{[!form.ringModel ? "色环" : "", !form.nutModel ? "螺母" : ""].filter(Boolean).join("和")}，请确认已备好所需配套件。</p> : null}
    </>}
  </div> : null;
  const modeSwitch = <div className={isCompact ? styles.selectionMode : `${styles.row} ${local.row}`} role="group" aria-label={isCompact ? "选型方式" : "选购方式"}>
    <span className={styles.rowLabel}>{isCompact ? "选型方式" : "选购方式"}</span><div className={styles.chips}>
      {config.baseRole !== "plug" && <button type="button" aria-pressed={mode === "pair" && !sealing} className={mode === "pair" && !sealing ? styles.chipActive : styles.chip} onClick={() => selectPairMode(false)}>公母端组合</button>}
      {plugChoice && <button type="button" aria-pressed={mode === "pair" && sealing} className={mode === "pair" && sealing ? styles.chipActive : styles.chip} onClick={() => selectPairMode(true)}>堵头封堵</button>}
      <button type="button" aria-pressed={mode === "single"} className={mode === "single" ? styles.chipActive : styles.chip} onClick={() => setMode("single")}>{config.baseRole === "core" ? "仅选当前芯子" : isCompact ? "仅选当前接头" : "仅当前接头"}</button>
      {coreSelection && <button type="button" aria-pressed={mode === "core"} className={mode === "core" ? styles.chipActive : styles.chip} onClick={() => setMode("core")}>芯子＋锁圈组合</button>}
    </div>
  </div>;
  const combinationSwitch = <div className={styles.selectionMode} role="group" aria-label="组合类型">
    <span className={styles.rowLabel}>组合类型</span><div className={styles.chips}>
      {config.combinationTypes.map(type => <button key={type} type="button" aria-pressed={combinationType === type}
        className={combinationType === type ? styles.chipActive : styles.chip}
        onClick={() => selectCombinationType(type)}>{typeLabels[type]}</button>)}
    </div>
  </div>;
  const body = <div className={styles.body} data-luer-pair-selector="true" data-luer-selection-mode={mode} data-luer-combination-type={unified ? combinationType : undefined}>
        {!isCompact && <div className={styles.baseStrip}><div className={styles.baseThumb}>{image(config.base)}</div><div className={styles.baseText}>
          <span className={styles.eyebrow}>{currentNote}</span><strong className={styles.baseModel}>{config.base.model}</strong>
          <p className={styles.baseMeta}>{describeLuerPart(config.base)}<span className={styles.baseCode}>商品编码：{config.base.productCode}</span></p>
        </div></div>}
        {unified ? combinationSwitch : isCompact && modeSwitch}
        <div className={styles.columns}>
          <section className={styles.picker} aria-label="组合规格">
            {unified ? mode === "single" && <div className={local.flowHeading}>
              <h4>当前{singleName}</h4>
            </div> : !isCompact && <><h3 className={styles.pickerTitle}>按规格选择</h3>{modeSwitch}</>}
            {mode !== "single" ? <>
              {maleOptions.length > 1 ? <LuerEndPicker locale={locale} key={sealing ? "plug" : "male"} compact={isCompact} label={sealing ? "堵头" : unified && config.baseRole === "collar" ? "芯子" : "公端"} parts={maleOptions} value={form.maleModel} onChange={maleModel => setForm(current => ({...current, maleModel}))} /> : null}
              {needsCollar && (!unified || mode === "core") ? <div className={unified ? local.entryCollar : local.accessories}>
                {!unified && <><h4>芯子配套锁圈</h4><p className={styles.hint}>{config.baseRole === "core" ? `${config.base.model} 芯子搭配 LPT 锁圈组成${config.base.family === "LRL" ? "旋转" : "固定"}锁圈公端，两件分别列入清单。` : "LSL 与 LPT 组成固定锁圈结构，LRL 与 LPT 组成旋转锁圈结构；此处按分件加入清单。"}</p></>}
                {accessory("配套锁圈", "collarModel", config.collars, true)}
              </div> : null}
              {mode === "pair" && <>
              {config.females.length > 1 ? <LuerEndPicker locale={locale} key={unified ? femaleDraft.family : undefined} compact={isCompact} label="母端" parts={femaleOptions}
                draftState={unified ? {value: femaleDraft, onChange: setFemaleDraft} : undefined}
                value={form.femaleModel} onChange={femaleModel => setForm(current => ({...current, femaleModel}))}>{isCompact && pairAccessories}</LuerEndPicker> : <p className={styles.hint}>配合母端：{female?.model || "请选择有效母端"}</p>}
              {(!isCompact || config.females.length <= 1) && pairAccessories}
              <p className={styles.hint}>{sealing ? "LPBL 用于封堵母鲁尔接口，堵头无软管连接端；母端管径按所连接软管选择。" : isCompact ? "两端软管内径可分别选择；开孔与安装要求见「选型与使用」。" : "管径指各端连接软管的内径。配对后核对两端材料、流道变化与安装空间。"}</p>
              </>}
            </> : isCompact ? <>
              {!unified && <span className={styles.eyebrow}>{coreSelection ? "当前芯子" : "当前接头"}</span>}
              <div className={styles.singleChoice}><p>{config.base.model}</p><p>{config.baseRole === "core" ? "仅选择当前芯子，适用于已有配套锁圈的情况。" : unified ? "仅选择当前零件，不包含其他配套件。" : "仅选择当前型号，不包含配套接头及附件。"}</p></div>
            </> : <p className={styles.hint}>仅将 {config.base.model} 加入清单，适用于已有配套件的情况。{config.baseRole === "core" ? "芯子需与锁圈组装后使用。" : ""}</p>}
          </section>
          <section className={`${styles.result} ${local.result}`} aria-label="组合结果" aria-live="polite">
            <span className={styles.eyebrow}>{isCompact ? mode === "single" ? "选型结果" : "组合结果" : mode === "single" ? "单件选购" : "装配组合预览"}</span><LuerAssemblyPreview locale={locale} parts={parts} imageOnly assembleCore singleImage={mode === "single"} />
            {parts ? isCompact ? <>
              <p className={local.previewNote}>{mode === "single" ? "单件示意；尺寸以对应零件图为准。" : "组合示意；尺寸以对应零件图为准。"}</p>
              <table className={local.partsTable} aria-label="选型零件明细"><thead><tr><th scope="col">零件</th><th scope="col">型号</th><th scope="col">商品编码</th></tr></thead>
                <tbody>{parts.map(p => <tr key={p.model}><td>{p.name}</td><td>{p.model}</td><td>{p.productCode}</td></tr>)}</tbody>
              </table>
            </> : <ul className={local.summary} aria-label="组合零件明细">{parts.map(p => <li key={p.model}>{image(p)}<div>
              <strong>{p.model}</strong><small>{p.name} · {p.material} · {p.color}</small><small>商品编码：{p.productCode}</small>
              {p.drawingHref ? <a href={p.drawingHref} target="_blank" rel="noreferrer">查看图纸</a> : null}
            </div><span className={local.quantity}>× 1</span></li>)}</ul> : <p className={local.error} role="status">请选定有效的配合端规格后确认组合。</p>}
            {!isCompact && mode === "pair" && male && female ? <p className={styles.hint}>{male.tube ? `公端：${male.tube} mm 内径软管；` : "公端：封堵用途；"}母端：{female.tube} mm 内径软管。</p> : null}
          </section>
        </div>
      </div>;
  if (isCompact) return fittingView(<ConfiguratorDialogFrame dialogRef={dialog} closeRef={closeButton} locale={locale}
    className={`${styles.compact} ${local.compact}`} titleId={`${id}-title`} descriptionId={`${id}-description`}
    title={!unified && mode === "single" ? "鲁尔接头选型" : "鲁尔接头组合选型"}
    description={mode === "single" ? "确认选型后，可在「产品资料」中点击「3D 模型」，查看当前零件及尺寸。" : "确认组合后，可在「产品资料」中点击「3D 模型」，查看组合效果及尺寸。"}
    closeLabel="关闭组合选型" onClose={onClose}
    notice={parts ? `本次包含 ${parts.length} 种零件，每种 1 件；数量可在清单调整。` : "未找到合适型号？可联系我们确认适配型号及供货情况。"}
    actions={<>
      <ConfiguratorButton variant="secondary" active={added} disabled={!parts || (added && !needDrawing)} onClick={() => { if (parts) onAdd(choice); }}>{needDrawing ? "加入清单并申请图纸" : added ? "已加入清单" : mode === "single" ? "加入清单" : "加入组合清单"}</ConfiguratorButton>
      <ConfiguratorButton variant="primary" disabled={!parts} onClick={() => { if (parts) onConfirm(choice); }}>{needDrawing ? "确认并添加图纸" : mode === "single" ? "确认选型" : "确认组合"}</ConfiguratorButton>
    </>}>{body}</ConfiguratorDialogFrame>, locale);
  return createPortal(fittingView(<div className={styles.overlay}>
    <section ref={dialog} className={`${styles.dialog} ${local.dialog}`} role="dialog" aria-modal="true" aria-labelledby={`${id}-title`} aria-describedby={`${id}-description`} lang="zh-CN">
      <header className={styles.header}><div><h2 id={`${id}-title`}>鲁尔接头组合选型</h2>
        <p id={`${id}-description`}>为当前型号选择配合端和附件。两端软管内径可分别选择；穿板组合可继续配置色环与固定螺母。</p>
      </div><button ref={closeButton} type="button" className={styles.close} aria-label="关闭组合选型" onClick={onClose}>×</button></header>
      {body}
      <footer className={styles.footer}><p>{parts ? `本次包含 ${parts.length} 种零件，每种 1 件；数量可在清单调整。` : "请先选定有效规格。"}介质、温度和使用压力需结合完整组合确认。</p>
        <div className={`${styles.actions} ${local.footActions}`}>
          <button className={styles.secondary} type="button" disabled={!parts || (added && !needDrawing)} onClick={() => { if (parts) onAdd(choice); }}>{needDrawing ? "加入清单并申请图纸" : added ? "已加入清单" : mode === "single" ? "加入单件清单" : "加入组合清单"}</button>
          <button className={styles.primary} type="button" disabled={!parts} onClick={() => { if (parts) onConfirm(choice); }}>{needDrawing ? "确认并添加图纸" : mode === "single" ? "确认单件" : "确认组合"}</button>
        </div>
      </footer>
    </section>
  </div>, locale), document.body);
}
