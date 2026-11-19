"use client";

import { trackInteraction } from "@/lib/analytics/track-event";

import { drawingRequirementsLine, type CadDrawingType } from "@/data/products/detail/drawing-requirements";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import ConfiguratorButton from "@/components/products/configurator/ConfiguratorButton";
import buttonStyles from "@/components/products/configurator/ConfiguratorButton.module.css";
import FlangedTubingConfigurator from "@/components/products/configurator/FlangedTubingConfigurator";
import { scheduleFlangedAssemblyPreview } from "@/components/products/configurator/flanged-tubing-preview-loader";
import { defaultAssemblyChoice, endConnection, normalizeFlangedChoice, validateFlangedChoice, type FlangedTubingChoice } from "@/data/products/configurator/flanged-tubing";
import { getAssemblyTube } from "@/data/products/configurator/tubing-assembly-catalog";
import { assemblyChoiceMatchesEntry } from "@/data/products/configurator/tubing-assembly-entry";
import { deleteFlangedConfiguration, FLANGED_CONFIGURATION_STORAGE_KEY, parseFlangedConfigurationStore, saveFlangedConfiguration, type FlangedConfiguration } from "@/data/products/configurator/flanged-tubing-configurations";
import { flangedWorkspaceRequest, readFlangedWorkspace, type FlangedWorkspaceEditor } from "@/data/products/configurator/flanged-tubing-workspace-state";
import FlangedTubingDrawingDialog from "./FlangedTubingDrawingDialog";
import { assemblyView } from "./assembly-view";
import { assemblyText, assemblyFormat, assemblyHtmlLocale } from "@/data/products/configurator/tubing-assembly.intl";
import styles from "./FlangedTubingWorkspace.module.css";
import { getSelectionWorkspacePresentation } from "@/data/products/detail/selection-workspace-copy";

type Props = { locale?: string; compact?: boolean; open: boolean; requestDrawing: boolean; entrySlug: string; onClose: () => void; onChoiceChange: (choice: FlangedTubingChoice | null) => void; onAdd: (record: FlangedConfiguration) => Promise<void> };
export default function FlangedTubingWorkspace({ locale = "zh", compact = false, open, requestDrawing, entrySlug, onClose, onChoiceChange, onAdd }: Props) {
  const presentation = getSelectionWorkspacePresentation(locale, "assembly");
  // ProductDetailClient loads this workspace with ssr:false. The initializer
  // reads once per mount, with no write or migration of saved configurations.
  const [workspace, setWorkspace] = useState(() => readFlangedWorkspace(() => typeof window === "undefined" ? null : window.localStorage.getItem(FLANGED_CONFIGURATION_STORAGE_KEY)));
  const { store, error } = workspace;
  const setStore = (next: typeof store) => setWorkspace(current => ({ ...current, store: next }));
  const setError = (next: string) => setWorkspace(current => ({ ...current, error: next }));
  const panelId = useId();
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [editor, setEditor] = useState<FlangedWorkspaceEditor | null>(null);
  const [drawing, setDrawing] = useState<FlangedConfiguration | null>(null);
  const [pendingDeletion, setPendingDeletion] = useState<FlangedConfiguration | null>(null);
  const externalRequest = useMemo(() => open ? flangedWorkspaceRequest(store, entrySlug, requestDrawing, locale) : null, [open, store, entrySlug, requestDrawing, locale]);
  const activeEditor = editor ?? externalRequest?.editor ?? null;
  const activeDrawing = drawing ?? (editor ? null : externalRequest?.drawing) ?? null;
  const editorOpen = Boolean(activeEditor);
  const trackedEditor = useRef(false);
  useEffect(() => {
    if (editorOpen && !trackedEditor.current) {
      trackInteraction("configurator_open", {
        locale, sourceSection: "flanged_tubing_workspace", configurationType: "flanged_tubing",
      });
    }
    trackedEditor.current = editorOpen;
  }, [editorOpen, locale]);
  const [adding, setAdding] = useState<string | null>(null), [feedback, setFeedback] = useState("");
  const addInProgress = useRef(false);
  useEffect(() => scheduleFlangedAssemblyPreview(defaultAssemblyChoice(entrySlug)), [entrySlug]);
  async function add(record: FlangedConfiguration) {
    if (addInProgress.current) return;
    addInProgress.current = true; setAdding(record.id); setError(""); setFeedback("");
    try { await onAdd(record); setFeedback(assemblyFormat("{name} · R{revision} 及 PDF 图纸已加入清单。", locale, {name:record.name,revision:record.revision})); }
    catch (cause) { setError(cause instanceof Error ? cause.message : "配置图纸加入清单失败，请重试。"); }
    finally { addInProgress.current = false; setAdding(null); }
  }
  useEffect(() => {
    const active = store.configurations.find(r => r.id === store.activeId);
    onChoiceChange(active && assemblyChoiceMatchesEntry(active.choice, entrySlug) ? active.choice : null);
  }, [store, entrySlug, onChoiceChange]);
  function closeEditor() { setEditor(null); onClose(); }
  function newConfiguration() {
    setError(""); setFeedback(""); setPendingDeletion(null);
    setEditor({ record: null, choice: defaultAssemblyChoice(entrySlug), name: `${assemblyText("配置", locale)} ${store.nextNumber}` });
  }
  function save(choice: FlangedTubingChoice, asNew = false, drawings?: CadDrawingType[]) {
    if (!activeEditor) return null;
    try {
      // Re-read before saving so another tab's newer configuration is preserved.
      const latest = parseFlangedConfigurationStore(window.localStorage.getItem(FLANGED_CONFIGURATION_STORAGE_KEY));
      if (!asNew && activeEditor.record) {
        const current = latest.configurations.find(r => r.id === activeEditor.record!.id);
        if (current && current.revision !== activeEditor.record.revision) throw new Error("此配置已在其他窗口更新，请重新打开后编辑。");
      }
      const name = asNew && activeEditor.name === activeEditor.record?.name ? `${assemblyText("配置", locale)} ${latest.nextNumber}` : activeEditor.name;
      const result = saveFlangedConfiguration(latest, choice, name, asNew ? null : activeEditor.record?.id || null, undefined, undefined, drawings);
      window.localStorage.setItem(FLANGED_CONFIGURATION_STORAGE_KEY, JSON.stringify(result.store));
      trackInteraction("configurator_confirm", {
        locale, sourceSection: "flanged_tubing_workspace", configurationType: "flanged_tubing",
        action: asNew ? "save_as" : "save",
      });
      setStore(result.store); setError(""); if (compact) setExpandedId(result.record.id); onChoiceChange(result.record.choice); closeEditor(); return result.record;
    } catch (cause) { setError(cause instanceof DOMException ? "配置保存失败，请检查浏览器存储权限或可用空间。" : cause instanceof Error ? cause.message : "配置保存失败，请检查浏览器存储权限。"); return null; }
  }
  function remove(record: FlangedConfiguration) {
    if (addInProgress.current) return;
    try {
      const latest = parseFlangedConfigurationStore(window.localStorage.getItem(FLANGED_CONFIGURATION_STORAGE_KEY));
      const next = deleteFlangedConfiguration(latest, record.id, record.revision);
      window.localStorage.setItem(FLANGED_CONFIGURATION_STORAGE_KEY, JSON.stringify(next));
      setStore(next); setPendingDeletion(null); setError(""); setFeedback(assemblyFormat("已删除“{name}”。", locale, {name:record.name}));
      if (expandedId === record.id) setExpandedId(null);
      if (editor?.record?.id === record.id) closeEditor();
      if (drawing?.id === record.id) setDrawing(null);
    } catch (cause) {
      setError(cause instanceof DOMException ? "配置删除失败，请检查浏览器存储权限或可用空间。配置未被删除。" : cause instanceof Error ? cause.message : "配置删除失败，请重试。");
    }
  }
  const activeId = store.activeId;
  const expanded = store.configurations.find(record => record.id === expandedId);
  const visibleConfigurations = compact ? expanded ? [expanded] : [] : store.configurations;
  return assemblyView(<section lang={assemblyHtmlLocale(locale)} className={`${styles.workspace}${compact ? ` ${styles.compactWorkspace} ${buttonStyles.blueWhite}` : ""}`} data-flanged-configuration-workspace="true" data-compact={compact || undefined} aria-label="管组件已保存配置">
    <div className={styles.workspaceHeading}><div><h3>{presentation.title}</h3><p>{compact
      ? store.configurations.length ? "保存在当前浏览器，点击编号查看，再次点击收起。" : presentation.description
      : "保存在当前浏览器，可重新进入修改或另存配置。"}</p></div></div>
    {compact ? <div className={styles.configurationTabs} role="group" aria-label="已保存的配置">
      {store.configurations.map(record => <ConfiguratorButton key={record.id}
        variant={expandedId === record.id ? "primary" : "secondary"} title={record.name}
        aria-expanded={expandedId === record.id} aria-controls={panelId}
        onClick={() => { setExpandedId(current => current === record.id ? null : record.id); setPendingDeletion(null); }}>配置{record.number}</ConfiguratorButton>)}
      <ConfiguratorButton onClick={newConfiguration}>新增配置</ConfiguratorButton>
    </div> : null}
    {error ? <p className={styles.error} role="alert">{error}</p> : null}
    {feedback ? <p role="status" translate="no">{feedback}</p> : null}
    {!compact && !store.configurations.length ? <p className={styles.empty}>设置管径、长度和两端配件，保存配置后可生成二维图纸或加入清单。</p> : <div id={panelId} className={styles.configurationList} hidden={compact && !expanded}>{visibleConfigurations.map(record => { const tube = getAssemblyTube(record.choice.tubeModel), invalid = validateFlangedChoice(normalizeFlangedChoice(record.choice)); return <article className={styles.configuration} key={record.id} data-active={compact || activeId === record.id} aria-label={compact ? `配置${record.number}详情` : undefined}>
      <div><strong translate="no">{record.name}</strong><span className={styles.revision}>R{record.revision}</span><p>{record.choice.mode === "double" ? `双端 · ${endConnection(record.choice.a)} + ${endConnection(record.choice.b)}` : `单端 · ${endConnection(record.choice.a)}`} · {tube?.material} · {tube?.color}{tube?.hardness ? ` · ${tube.hardness}` : ""} · ID {tube?.inner} × OD {tube?.outer} mm · L {record.choice.length} ±{record.choice.tolerance} mm</p><p translate="no">{drawingRequirementsLine(record, locale)}</p><small>更新于 {new Date(record.updatedAt).toLocaleString(assemblyHtmlLocale(locale))}</small></div>
      <div className={styles.configurationActions}><button type="button" onClick={() => { setEditor({ record, choice: record.choice, name: record.name }); setError(""); }}>进入配置</button><button type="button" disabled={Boolean(invalid)} title={invalid || undefined} onClick={() => setDrawing(record)}>生成2D图纸</button><button type="button" disabled={adding !== null || Boolean(invalid)} title={invalid || undefined} onClick={() => add(record)}>{adding === record.id ? "正在附加PDF…" : "加入清单"}</button><button type="button" disabled={adding !== null} aria-expanded={pendingDeletion?.id === record.id} aria-controls={`delete-configuration-${record.id}`} onClick={() => { setPendingDeletion(record); setError(""); setFeedback(""); }}>删除</button></div>
      {invalid ? <p className={styles.error}>此配置需要重新匹配：{invalid} 请进入配置修改。</p> : null}
      {pendingDeletion?.id === record.id ? <div className={styles.deleteConfirmation} id={`delete-configuration-${record.id}`} role="group">
        <span translate="no">{assemblyFormat("确定删除“{name}”？清单中的副本及 PDF 仍会保留。", locale, {name:record.name})}</span>
        <button type="button" disabled={adding !== null} onClick={() => remove(pendingDeletion)}>确认删除</button>
        <button type="button" disabled={adding !== null} onClick={() => setPendingDeletion(null)}>取消</button>
      </div> : null}
    </article>; })}</div>}
    {activeEditor ? <FlangedTubingConfigurator locale={locale} value={activeEditor.choice} needDrawing={false} initialDrawingTypes={activeEditor.record?.drawingTypes} configurationName={activeEditor.name} onNameChange={name => setEditor({ ...activeEditor, name })} saveLabel="保存配置" saveError={error}
      onClose={closeEditor} onConfirm={(choice, drawings) => { const record = save(choice, false, drawings); if (record && requestDrawing && open) setDrawing(record); }} onSaveAs={activeEditor.record ? (choice, drawings) => { save(choice, true, drawings); } : undefined}
      onGenerateDrawing={(choice, drawings) => { const record = save(choice, false, drawings); if (record) setDrawing(record); }} onAdd={(choice, drawings) => { const record = save(choice, false, drawings); if (record) void add(record); }} isAdded={() => false} /> : null}
    {activeDrawing ? <FlangedTubingDrawingDialog locale={locale} record={activeDrawing} onClose={() => { setDrawing(null); if (externalRequest?.drawing) onClose(); }} /> : null}
  </section>, locale);
}
