"use client";

import { drawingRequirementsLine, normalizeDrawingTypes, type CadDrawingType } from "@/data/products/detail/drawing-requirements";
import { useEffect, useId, useRef, useState } from "react";
import ConfiguratorDialogFrame from "./ConfiguratorDialogFrame";
import ConfiguratorButton from "./ConfiguratorButton";
import FlangedTubingAssemblyPreview from "./FlangedTubingAssemblyPreview";
import buttonStyles from "./ConfiguratorButton.module.css";
import { assemblyCompatibilityWarnings, assemblySizeError, compatibleAssemblyTubes, assemblyEndFinishes, assemblyEndFinishLabel, defaultFlangedTubingChoice, endConnection, reconcileAssemblyEnd, selectAssemblyConnection, selectAssemblyEndAttribute, selectAssemblyEndFinish, flangedTubingBom, normalizeFlangedChoice, validateFlangedChoice, type FlangedEnd, type FlangedTubingChoice } from "@/data/products/configurator/flanged-tubing";
import { assemblyConnections, assemblyFamilies, assemblyFamilyAvailability, assemblyFamilyLabel, assemblyFittingAccessories, compatibleAssemblyFittings, assemblyTubeSizeKey, assemblyTubeSizes, getAssemblyFitting, getAssemblyTube, selectAssemblyTubeAttribute, selectAssemblyTubeSize, type AssemblyTube } from "@/data/products/configurator/tubing-assembly-catalog";
import { assemblyVectorPaths, getAssemblyFittingVector } from "@/data/products/configurator/tubing-assembly-vectors";
import styles from "./FlangedTubingConfigurator.module.css";
import { assemblyView } from "../tubing-assemblies/assembly-view";
import { assemblyText, assemblyHtmlLocale } from "@/data/products/configurator/tubing-assembly.intl";
import { localizedAssemblySummary } from "@/data/products/configurator/tubing-assembly-presentation";

type Props = {
  locale?: string;
  value: FlangedTubingChoice | null;
  needDrawing: boolean;
  initialDrawingTypes?: CadDrawingType[];
  onClose: () => void;
  onConfirm: (value: FlangedTubingChoice, drawingTypes: CadDrawingType[]) => void;
  onAdd: (value: FlangedTubingChoice, drawingTypes: CadDrawingType[]) => void;
  isAdded: (value: FlangedTubingChoice) => boolean;
  configurationName?: string;
  onNameChange?: (name: string) => void;
  saveLabel?: string;
  saveError?: string;
  onSaveAs?: (value: FlangedTubingChoice, drawingTypes: CadDrawingType[]) => void;
  onGenerateDrawing?: (value: FlangedTubingChoice, drawingTypes: CadDrawingType[]) => void;
};

function ChoiceField<T extends string>({ label, name, options, value, part, onChange, className, locale = "zh" }: {
  label: string; name: string; options: readonly T[]; value: T; part: number; onChange: (value: T) => void; className?: string; locale?: string;
}) {
  return assemblyView(<div className={[styles.choiceField, className].filter(Boolean).join(" ")} role="group" aria-label={name} data-flanged-part={part}><span>{label}</span>
    <div className={styles.choiceOptions}>{options.map(option => <button key={option} type="button" className={styles.choiceOption} aria-pressed={value === option} onClick={() => { if (value !== option) onChange(option); }}>{option}</button>)}</div>
  </div>, locale);
}

function SelectField({ label, name, options, value, part, onChange, emptyLabel = "当前管径暂无规格", optionLabel = option => option, optionDisabled, locale = "zh" }: {
  label: string; name: string; options: readonly string[]; value: string; part: number; onChange: (value: string) => void; emptyLabel?: string; optionLabel?: (option: string) => string; optionDisabled?: (option: string) => boolean; locale?: string;
}) {
  const valid = options.includes(value);
  return assemblyView(<label className={styles.field} data-flanged-part={part}><span>{label}</span><select aria-label={name} value={valid ? value : ""} disabled={!options.length} onChange={event => onChange(event.target.value)}>
    {!valid ? <option value="" disabled>{options.length ? "请选择" : emptyLabel}</option> : null}
    {options.map(option => <option key={option} value={option} disabled={optionDisabled?.(option)}>{optionLabel(option)}</option>)}
  </select></label>, locale);
}

export default function FlangedTubingConfigurator({ locale = "zh", value, needDrawing, initialDrawingTypes, onClose, onConfirm, onAdd, isAdded, configurationName, onNameChange, saveLabel, saveError, onSaveAs, onGenerateDrawing }: Props) {
  const drawings = normalizeDrawingTypes(initialDrawingTypes);
  const [form, setForm] = useState<FlangedTubingChoice>(() => normalizeFlangedChoice(value || defaultFlangedTubingChoice()));
  const [activePart, setActivePart] = useState<number | null>(null);
  const [feedback, setFeedback] = useState(value && assemblySizeError(value) ? "旧配置已按当前管外径重新核对，请完成两端选项后保存。" : "");
  const id = useId();
  const dialog = useRef<HTMLElement>(null), closeButton = useRef<HTMLButtonElement>(null);
  const closeRef = useRef(onClose);
  useEffect(() => { closeRef.current = onClose; }, [onClose]);
  useEffect(() => {
    const focus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const overflow = document.body.style.overflow;
    const backdrop = dialog.current?.parentElement;
    const background = Array.from(document.body.children).filter((e): e is HTMLElement => e instanceof HTMLElement && e !== backdrop).map(element => ({ element, inert: element.inert }));
    background.forEach(({ element }) => { element.inert = true; });
    document.body.style.overflow = "hidden";
    closeButton.current?.focus();
    function keydown(event: KeyboardEvent) {
      if (event.defaultPrevented) return;
      if (event.key === "Escape" && !(event.target instanceof HTMLSelectElement)) { event.preventDefault(); closeRef.current(); }
      if (event.key !== "Tab") return;
      const elements = dialog.current?.querySelectorAll<HTMLElement>("button:not(:disabled), a[href], input:not(:disabled), select:not(:disabled), textarea:not(:disabled), summary");
      if (!elements?.length) return;
      const first = elements[0], last = elements[elements.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }
    document.addEventListener("keydown", keydown);
    return () => { document.removeEventListener("keydown", keydown); document.body.style.overflow = overflow; background.forEach(({ element, inert }) => { element.inert = inert; }); if (focus?.isConnected) focus.focus(); };
  }, []);

  function update<K extends keyof FlangedTubingChoice>(key: K, next: FlangedTubingChoice[K]) { setForm(current => ({ ...current, [key]: next })); setFeedback(""); }
  const choice = normalizeFlangedChoice(form);
  const tube = getAssemblyTube(form.tubeModel)!;
  const availableTubes = compatibleAssemblyTubes(choice);
  const availableMaterials = [...new Set(availableTubes.map(t=>t.material))];
  const materialTubes = availableTubes.filter(t => t.material === tube.material);
  const sizeTubes = materialTubes.filter(t => t.outer === tube.outer && t.inner === tube.inner);
  const tubeVariants = sizeTubes.filter(t => t.color === tube.color && t.hardness === tube.hardness);
  const warnings = assemblyCompatibilityWarnings(choice);
  const referenceFittings = (form.mode === "double" ? [form.a, form.b] : [form.a]).flatMap(e => { const fitting = getAssemblyFitting(e.fittingModel); return fitting?.outerDiameters.includes(tube.outer) ? [fitting] : []; });
  function changeTube(model: string) {
    const next = getAssemblyTube(model)!;
    setForm(current => ({ ...current, tubeModel: next.key, a: reconcileAssemblyEnd(current.a, next.outer), b: reconcileAssemblyEnd(current.b, next.outer) }));
    setFeedback(next.outer === tube.outer ? `管材规格已更新，接头与配套件按 OD ${next.outer} mm 匹配。` : `已按管外径 OD ${next.outer} mm 重新匹配。无对应规格的选项需重新选择。`);
  }
  function changeTubeAttribute(key: "material" | "color" | "hardness", value: string) {
    const selected = selectAssemblyTubeAttribute(tube, key, value, availableTubes);
    if (selected) changeTube(selected.key);
  }
  const tubeOptions = (rows: AssemblyTube[], key: "color" | "hardness") => [...new Set(rows.map(t => String(t[key])))];
  const error = configurationName !== undefined && !configurationName.trim() ? "请填写配置名称。" : validateFlangedChoice(choice), added = isAdded(choice);
  const dimensionError = error && (error.includes("成品长度") || error.includes("长度公差")) ? error.replace(/。$/, "") : undefined;
  function focusPart(part = 1) {
    setActivePart(part);
    const control = dialog.current?.querySelector<HTMLElement>(`[data-flanged-part="${part}"] button[aria-pressed="true"], [data-flanged-part="${part}"] select, [data-flanged-part="${part}"] input, [data-flanged-part="${part}"] textarea`);
    control?.focus();
  }
  function endFields(side: "a" | "b") {
    const end = form[side], prefix = side.toUpperCase(), fittingPart = side === "a" ? 4 : 8;
    const connection = endConnection(end), selectedFitting = getAssemblyFitting(end.fittingModel);
    const fitting = selectedFitting?.family === end.series && selectedFitting.connections.includes(connection) && selectedFitting.outerDiameters.includes(tube.outer) ? selectedFitting : undefined;
    const familyAvailability = assemblyFamilyAvailability(connection, tube.outer);
    const families = connection === "卡环" ? familyAvailability.map(option => option.family) : assemblyFamilies(connection, tube.outer);
    const candidates = compatibleAssemblyFittings(tube.outer, { connection, family: end.series });
    const threads = [...new Set(candidates.map(f => f.thread))];
    const finishes = assemblyEndFinishes(end, tube.outer);
    const selectedFinish = finishes.find(finish => finish.material === end.material && finish.color === end.color);
    const finishKey = (finish: { material: string; color: string }) => JSON.stringify([finish.material, finish.color]);
    const accessories = assemblyFittingAccessories(fitting,connection,tube.outer);
    function change<K extends keyof FlangedEnd>(key: K, next: FlangedEnd[K]) { update(side, { ...end, [key]: next }); }
    function selectAttribute(key: "series" | "thread", next: string) {
      update(side, selectAssemblyEndAttribute(end, key, next, tube.outer));
    }
    return <section className={styles.endCard} aria-label={`${prefix} 端配置`}>
      <div className={styles.cardHeading}><h3>{prefix} 端 · {connection}连接</h3>{side === "b" ? <button type="button" className={styles.copyEnd} onClick={() => update("b", { ...form.a })}>与 A 端相同</button> : null}</div>
      <div className={styles.endFields}>
        <label className={styles.field} data-flanged-part={fittingPart}><span>连接方式</span><select aria-label={`${prefix} 端连接方式`} value={connection} onChange={event => update(side, selectAssemblyConnection(end, event.target.value as typeof connection, tube.outer))}>{assemblyConnections.map(c => <option key={c} value={c}>{c}</option>)}</select></label>
        <SelectField locale={locale} label="接头系列" name={`${prefix} 端接头系列`} part={fittingPart} options={families} value={end.series}
          optionLabel={family => {
            const available = familyAvailability.find(option => option.family === family);
            return connection === "卡环" && available && !available.available ? `${assemblyFamilyLabel(family)}（适配 OD ${available.outerDiameters.join(" / ")} mm）` : assemblyFamilyLabel(family);
          }} optionDisabled={family => connection === "卡环" && !familyAvailability.find(option => option.family === family)?.available}
          onChange={next => selectAttribute("series", next)} />
        <SelectField locale={locale} label="接口螺纹" name={`${prefix} 端接口螺纹`} part={fittingPart} options={threads} value={end.thread} emptyLabel={families.length ? "请先选择接头系列" : "当前管径暂无规格"} onChange={next => selectAttribute("thread", next)} />
        <label className={styles.field} data-flanged-part={fittingPart}><span>接头材质</span><select aria-label={`${prefix} 端接头材质`} value={selectedFinish ? finishKey(selectedFinish) : ""} disabled={!finishes.length} onChange={event => {
          const finish = finishes.find(option => finishKey(option) === event.target.value);
          if (finish) update(side, selectAssemblyEndFinish(end, finish, tube.outer));
        }}>
          {!selectedFinish ? <option value="" disabled>{finishes.length ? "请选择材质" : "请先匹配管径与螺纹"}</option> : null}
          {finishes.map(finish => <option key={finishKey(finish)} value={finishKey(finish)}>{assemblyEndFinishLabel(finish)}</option>)}
        </select></label>
        <div className={styles.accessoryRow}>
        <label className={styles.field} data-flanged-part={side === "a" ? 2 : 6}><span>{connection === "翻边" ? "支撑垫片" : connection === "卡箍" ? "配套卡箍" : "卡环组件"}</span>{connection === "卡环" ? <span className={styles.readonlyValue}>{accessories[0]?.material || (fitting ? "对应套件规格待补充" : "请先匹配接头")}</span> : <select aria-label={`${prefix} 端配套部件`} value={end.accessoryCode || ""} disabled={!accessories.length} onChange={event => { const accessory = accessories.find(a => a.productCode === event.target.value); update(side, { ...end, accessoryCode: event.target.value, washer: accessory?.material || "" }); }}><option value="" disabled>{accessories.length ? "请选择配套件" : fitting ? "当前管径暂无配套件" : "请先匹配接头"}</option>{accessories.map(a => <option key={a.productCode} value={a.productCode}>{a.material}{a.color !== "本色" ? ` · ${a.color}` : ""}</option>)}</select>}</label>
          <ChoiceField locale={locale} label="限位件" name={`${prefix} 侧限位件`} part={side === "a" ? 3 : 7} options={["无", "O 型圈", "硅胶管"]} value={end.stop} onChange={next => change("stop", next)} />
        </div>
      </div>
      <p className={styles.matchedModel} aria-label={`${prefix} 端接头型号`}>{fitting && fitting.outerDiameters.includes(tube.outer) ? `接头型号：${fitting.model}` : "暂无对应接头型号，请调整管径或接头选项。"}</p>
      {connection === "卡环" ? <>
        {familyAvailability.some(option => !option.available) ? <p className={styles.matchedModel}>灰色系列适配其他管径，切换管径后可选。</p> : null}
        {accessories[0] ? <p className={styles.matchedModel}>{`配套卡环：${accessories[0].model} · 商品编码 ${accessories[0].productCode} · 接管 OD ${tube.outer} mm`}</p> : null}
        {fitting?.drawingUrl && fitting.outerDiameters.includes(tube.outer) ? <p className={styles.matchedModel}><a className={styles.copyEnd} href={fitting.drawingUrl} target="_blank" rel="noopener noreferrer">查看接头原始2D图纸</a></p> : null}
      </> : null}
    </section>;
  }
  async function copy() {
    try { await navigator.clipboard.writeText(`${localizedAssemblySummary(choice, locale)}\n${drawingRequirementsLine({ drawingTypes: drawings }, locale)}`); setFeedback("已复制当前配置需求。"); }
    catch { setFeedback("复制未完成，请重试或确认配置后加入清单。"); }
  }

  return assemblyView(<ConfiguratorDialogFrame locale={assemblyHtmlLocale(locale)} dialogRef={dialog} closeRef={closeButton} className={`${styles.dialog} ${buttonStyles.blueWhite}`}
    titleId={`${id}-title`} descriptionId={`${id}-description`} title="管组件搭配选型"
    description="选择管材，两端独立搭配翻边、卡箍或卡环连接。保存后可重新编辑或生成二维图纸。" closeLabel="关闭管组件选型" onClose={onClose}
    notice={<><span>配置保存在当前浏览器 · 支持再次编辑</span><br />按原图结构组合生成矢量图纸。</>}
    actions={<><ConfiguratorButton onClick={copy}>复制配置</ConfiguratorButton>{onGenerateDrawing ? <ConfiguratorButton disabled={Boolean(error)} onClick={() => onGenerateDrawing(choice, drawings)}>生成2D图纸</ConfiguratorButton> : <ConfiguratorButton disabled={Boolean(error) || added} active={added} onClick={() => onAdd(choice, drawings)}>{added ? "已加入清单" : needDrawing ? "加入清单并申请图纸" : "加入清单"}</ConfiguratorButton>}{onSaveAs ? <ConfiguratorButton disabled={Boolean(error)} onClick={() => onSaveAs(choice, drawings)}>另存为新配置</ConfiguratorButton> : null}<ConfiguratorButton className={styles.saveButton} variant="primary" disabled={Boolean(error)} onClick={() => onConfirm(choice, drawings)}>{saveLabel || "保存配置"}</ConfiguratorButton></>}>
    <div className={styles.body} data-flanged-tubing-configurator="true" onFocusCapture={event => {
      const part = event.target instanceof Element ? event.target.closest<HTMLElement>("[data-flanged-part]")?.dataset.flangedPart : undefined;
      if (part) setActivePart(Number(part));
    }}>
      <div className={styles.configurationIdentity}>
        {configurationName !== undefined ? <label><span className={styles.sectionTitle}>配置名称</span><input aria-label="管组件配置名称" maxLength={40} value={configurationName} onChange={event => onNameChange?.(event.target.value)} /></label> : null}
        <div className={styles.mode}><span className={styles.sectionTitle}>管端形式</span><div className={styles.modeButtons} role="group" aria-label="管端形式">
          <button type="button" className={form.mode === "single" ? styles.modeActive : styles.modeButton} aria-pressed={form.mode === "single"} onClick={() => update("mode", "single")}>单端</button>
          <button type="button" className={form.mode === "double" ? styles.modeActive : styles.modeButton} aria-pressed={form.mode === "double"} onClick={() => update("mode", "double")}>双端</button>
        </div></div>
      </div>
      {saveError ? <p className={styles.error} role="alert">{saveError}</p> : null}
      {!dimensionError || feedback ? <p className={`${styles.feedback} ${error && !dimensionError ? styles.error : ""}`} role="status">{[feedback, dimensionError ? "" : error].filter(Boolean).join(" ") || "选择下方参数，实时查看组合。"}</p> : null}
      <div className={styles.selectionSheet}>
        <FlangedTubingAssemblyPreview locale={locale} choice={form} activePart={activePart} dimensionNotice={dimensionError ? assemblyText(dimensionError, locale) : undefined} onSelectPanel={(_panel, part) => focusPart(part)} />
        <div className={styles.controls}>
          {endFields("a")}
          <section className={styles.tubeCard} aria-label="管材与尺寸"><div className={styles.cardHeading}><h3>管材与尺寸</h3></div>
            <SelectField locale={locale} label="管材" name="管材" part={1} options={availableMaterials} value={tube.material} onChange={next => changeTubeAttribute("material", next)} />
            <div className={styles.tubeDimensions}>
              <label className={styles.field} data-flanged-part={1}><span title="外径 × 内径，单位 mm">管径 OD×ID</span><select aria-label="管径（外径 × 内径，mm）" title="外径 × 内径（mm）" value={assemblyTubeSizeKey(tube)} onChange={event=>{const next=selectAssemblyTubeSize(tube,event.target.value,availableTubes);if(next)changeTube(next.key);}}>{!assemblyTubeSizes(tube.material,availableTubes).includes(assemblyTubeSizeKey(tube)) ? <option value={assemblyTubeSizeKey(tube)} disabled>{assemblyTubeSizeKey(tube)}（无配套）</option> : null}{assemblyTubeSizes(tube.material,availableTubes).map(size=><option key={size}>{size}</option>)}</select></label>
            </div>
            <div className={styles.tubeDimensions}>
              <SelectField locale={locale} label="管材颜色" name="管材颜色" part={1} options={tubeOptions(sizeTubes, "color")} value={tube.color} onChange={next=>changeTubeAttribute("color",next)} />
              {tube.hardness ? <SelectField locale={locale} label="管材硬度" name="管材硬度" part={1} options={tubeOptions(sizeTubes.filter(t=>t.color===tube.color), "hardness")} value={tube.hardness} onChange={next=>changeTubeAttribute("hardness",next)} /> : null}
            </div>
            {tubeVariants.length > 1 ? <label className={styles.field} data-flanged-part={1}><span>管材物料编码</span><select aria-label="管材物料编码" value={tube.key} onChange={event=>changeTube(event.target.value)}>{tubeVariants.map(t=><option key={t.key} value={t.key}>{t.code}</option>)}</select></label> : null}
            <div className={styles.tubeDimensions}>
              <label className={styles.field} data-flanged-part={10}><span>长度 L（mm）</span><input aria-label="成品长度 L" type="number" min="0.01" step="any" value={form.length} placeholder="填写长度" onChange={event => update("length", event.target.value)} /></label>
              <label className={styles.field} data-flanged-part={10}><span>公差 ±（mm）</span><input aria-label="长度公差" type="number" min="0" step="any" value={form.tolerance} onChange={event => update("tolerance", event.target.value)} /></label>
            </div>
          </section>
          {form.mode === "double" ? endFields("b") : <section className={styles.endCard} aria-label="B 端用途"><div className={styles.cardHeading}><h3>B 端 · 自由管端</h3></div>
            <p className={styles.field}>单端配置仅在 A 端安装接头；需要两端分别配件时请选择“双端”。</p>
            <label className={styles.field} data-flanged-part={6}><span>配套说明</span><textarea aria-label="B 端配套说明" value={form.freeEndNote} maxLength={300} placeholder="填写接口或针规格等要求" onChange={event => update("freeEndNote", event.target.value)} /></label>
          </section>}
        </div>
        <div className={styles.tags}>
          {(["A", "B"] as const).map(side => { const enabled = side === "A" ? form.labelA : form.labelB; return <div className={styles.tagField} key={side} data-flanged-part={side === "A" ? 5 : 9}>
            <label className={styles.tagToggle}><input type="checkbox" checked={enabled} onChange={event => update(side === "A" ? "labelA" : "labelB", event.target.checked)} />{side} 侧管标</label>
            <input aria-label={`${side} 侧管标文本`} disabled={!enabled} value={side === "A" ? form.textA : form.textB} maxLength={80} placeholder={enabled ? "填写管标文本" : "勾选后填写"} onChange={event => update(side === "A" ? "textA" : "textB", event.target.value)} />
          </div>; })}
        </div>
      </div>
      {warnings.length ? <div className={styles.compatibility} role="status">{warnings.map(w => <p key={w}>{w}</p>)}</div> : null}
      <div className={styles.more}>
        <section className={styles.requirementsSection} aria-label="公司、图纸信息与特殊要求"><div className={styles.cardHeading}><h3>公司、图纸信息与特殊要求</h3></div><div className={styles.requirements}>
          <label className={styles.field}><span>公司</span><input aria-label="图纸公司名称" maxLength={120} value={form.company || ""} onChange={event => update("company", event.target.value)} /></label>
          <label className={styles.field}><span>联系人</span><input aria-label="图纸联系人" maxLength={120} value={form.contact || ""} onChange={event => update("contact", event.target.value)} /></label>
          <label className={styles.field}><span>客户零件号</span><input aria-label="图纸客户零件号" maxLength={120} value={form.customerPart || ""} onChange={event => update("customerPart", event.target.value)} /></label>
          <label className={styles.field}><span>应用机型</span><input aria-label="应用机型" maxLength={120} value={form.application} onChange={event => update("application", event.target.value)} /></label>
          <label className={`${styles.field} ${styles.requirementsNotes}`}><span>特殊要求</span><textarea aria-label="特殊要求" maxLength={800} value={form.notes} placeholder="管标位置、限位尺寸或检验要求" onChange={event => update("notes", event.target.value)} /></label>
        </div></section>
        <details><summary>部件用量明细（{flangedTubingBom(choice).length} 项）</summary><table className={styles.bom} aria-label="管组件配置明细"><thead><tr><th>部件</th><th>配置要求</th><th>数量</th></tr></thead><tbody>{flangedTubingBom(choice).map(row => <tr key={row.part}><td>{row.part}</td><td translate={/管标/.test(row.part) || row.part === "B 端" ? "no" : undefined}>{/管标/.test(row.part) ? row.specification : row.part === "B 端" ? `${assemblyText("自由管端", locale)}${choice.freeEndNote ? ` · ${choice.freeEndNote}` : ""}` : row.specification}</td><td>{row.quantity}</td></tr>)}</tbody></table></details>
        <details><summary>实物与外形参考</summary><p>接头及配套件引用对应产品图、CAD 或正式二维图纸。</p><div className={styles.referencePhotos}>
          {referenceFittings.length ? referenceFittings.map((f,i) => { const vector = getAssemblyFittingVector(f.model); return <figure key={`${i}-${f.model}`}>
            {f.image && !f.image.includes("/logo/") ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={f.image} alt={`${f.model} ${f.connection}接头产品图`} />
            ) : vector ? <svg viewBox="0 0 260 180" role="img" aria-label={`${f.model} 原图轮廓`}>{assemblyVectorPaths(vector,130,90,230,130).map((d,j)=><path key={j} d={d} fill="none" stroke="#172033" strokeWidth=".7" />)}</svg> : <p>此型号外形资料待补充</p>}
            <figcaption>{f.model}</figcaption>
          </figure>; }) : <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/products/tubing-assemblies/flanged-tubing/fep/flanged-tube-fitting-washer-layout.webp" alt="翻边管组件接头、支撑环件与管端翻边的实物展开参考" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/products/tubing-assemblies/flanged-tubing/fep/flanged-tubing-support-washers.webp" alt="翻边管组件配套垫片与垫圈的实物参考" />
          </>}
        </div></details>
      </div>
    </div>
  </ConfiguratorDialogFrame>, locale);
}
