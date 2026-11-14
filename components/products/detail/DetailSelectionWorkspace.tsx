"use client";

import { drawingRequirementsLine } from "@/data/products/detail/drawing-requirements";
import { useEffect, useId, useRef, useState, useSyncExternalStore } from "react";
import ConfiguratorButton from "@/components/products/configurator/ConfiguratorButton";
import buttonStyles from "@/components/products/configurator/ConfiguratorButton.module.css";
import { getSelectionWorkspaceCopy } from "@/data/products/detail/selection-workspace-copy";
import type { CadRequestConfiguration } from "@/data/products/detail/cad-request";
import styles from "@/components/products/tubing-assemblies/FlangedTubingWorkspace.module.css";
import layout from "./EaPumpInquirySummary.module.css";

const touchInputQuery = "(hover: none), (pointer: coarse)";
function subscribeToTouchInput(onChange: () => void) {
  const media = window.matchMedia(touchInputQuery);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}
const getTouchInput = () => window.matchMedia(touchInputQuery).matches;
const getServerTouchInput = () => false;

type Props = {
  locale: string; title: string; configurations: CadRequestConfiguration[];
  onSelect: (id: string) => void; onNew?: () => void; newLabel?: string;
  onEdit?: (id: string) => void; onDelete?: (id: string) => void;
  onAdd: (id: string) => void; isAdded: (id: string) => boolean;
  onDrawing?: (id: string) => void; drawingLabel?: string;
  fixed?: boolean; helperText?: string;
  defaultSelection?: { label: string; configuration: CadRequestConfiguration; added: boolean; onToggle: () => void; cancelLabel: string; touchHelperText?: string };
};

/** Shared outer presentation; each product retains its own selection and cart rules. */
export default function DetailSelectionWorkspace({ locale, title, configurations, onSelect, onNew, newLabel,
  onEdit, onDelete, onAdd, isAdded, onDrawing, drawingLabel, fixed = false, helperText, defaultSelection }: Props) {
  const copy = getSelectionWorkspaceCopy(locale), panelId = useId();
  const root = useRef<HTMLElement>(null);
  const defaultPointer = useRef<string | null>(null);
  const touchInput = useSyncExternalStore(subscribeToTouchInput, getTouchInput, getServerTouchInput);
  const [previewId, setPreviewId] = useState<string | null>(null);
  const [pinnedId, setPinnedId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const expanded = [ ...(defaultSelection ? [defaultSelection.configuration] : []), ...configurations ]
    .find(item => item.id === (previewId || pinnedId));
  const isDefaultExpanded = Boolean(expanded && defaultSelection && expanded.id === defaultSelection.configuration.id);
  useEffect(() => {
    if (!pinnedId) return;
    const closeOutside = (event: MouseEvent) => {
      // Collapse after the outside control completes its click, so its position stays stable.
      if (event.target instanceof Node && !root.current?.contains(event.target)) {
        setPinnedId(null); setPreviewId(null); setDeletingId(null);
      }
    };
    document.addEventListener("click", closeOutside);
    return () => document.removeEventListener("click", closeOutside);
  }, [pinnedId]);

  return <section ref={root} className={`${styles.workspace} ${styles.compactWorkspace} ${layout.workspace} ${buttonStyles.blueWhite}`}
    data-detail-selection-workspace="true" onPointerLeave={() => setPreviewId(null)}
    onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) setPreviewId(null); }}
    onKeyDown={event => {
      if (event.key === "Escape") {
        event.stopPropagation();
        root.current?.querySelector<HTMLButtonElement>('button[aria-expanded="true"]')?.focus();
        setPinnedId(null); setPreviewId(null); setDeletingId(null);
      }
    }}>
    <div className={styles.workspaceHeading}><div><h3>{title}</h3>
      <p>{(touchInput && defaultSelection?.touchHelperText) || helperText || (configurations.length ? fixed ? copy.fixed : copy.saved(configurations.length) : copy.empty)}</p>
    </div></div>
    <div className={layout.buttons}>
      {defaultSelection ? <ConfiguratorButton
        variant={defaultSelection.added ? "primary" : "secondary"}
        aria-pressed={defaultSelection.added} aria-expanded={isDefaultExpanded} aria-controls={panelId}
        onPointerDown={event => { defaultPointer.current = event.pointerType; }}
        onKeyDown={() => { defaultPointer.current = "keyboard"; }}
        onPointerEnter={event => { if (event.pointerType === "mouse") setPreviewId(defaultSelection.configuration.id); }}
        onFocus={() => {
          if (defaultPointer.current !== "touch" && defaultPointer.current !== "pen") setPreviewId(defaultSelection.configuration.id);
        }}
        onClick={event => {
          const pointer = defaultPointer.current;
          defaultPointer.current = null;
          setDeletingId(null);
          // A touch opens details without changing the inquiry list; mouse/keyboard retain the desktop toggle.
          if (pointer === "touch" || pointer === "pen" || (!pointer && event.detail > 0 && touchInput)) {
            setPreviewId(null);
            setPinnedId(current => current === defaultSelection.configuration.id ? null : defaultSelection.configuration.id);
            return;
          }
          setPinnedId(null); setPreviewId(defaultSelection.configuration.id); defaultSelection.onToggle();
        }}>
        {defaultSelection.label}
      </ConfiguratorButton> : null}
      {configurations.map((item, index) => <ConfiguratorButton key={item.id}
        variant={expanded?.id === item.id ? "primary" : "secondary"}
        aria-expanded={expanded?.id === item.id} aria-controls={panelId}
        onPointerEnter={event => { if (event.pointerType === "mouse" && !pinnedId) setPreviewId(item.id); }}
        onClick={() => { setPinnedId(pinnedId === item.id ? null : item.id); setPreviewId(null); setDeletingId(null); onSelect(item.id); }}>
        {copy.configuration(index + 1)}
      </ConfiguratorButton>)}
      {onNew ? <ConfiguratorButton onClick={() => { setPinnedId(null); setPreviewId(null); setDeletingId(null); onNew(); }}>{newLabel || copy.add}</ConfiguratorButton> : null}
    </div>
    <div id={panelId} className={styles.configurationList} hidden={!expanded}>
      {expanded ? <article className={styles.configuration} data-active="true">
        <div><strong translate="no">{expanded.model}</strong>
          {expanded.drawingTypes ? <p translate="no">{drawingRequirementsLine(expanded, locale)}</p> : null}
          {expanded.rows.map(([label, value], index) => <p key={`${index}:${label}`}>{label}: <span>{value}</span></p>)}
        </div>
        <div className={styles.configurationActions}>
          {!isDefaultExpanded && onEdit ? <ConfiguratorButton onClick={() => { setPinnedId(null); setPreviewId(null); onEdit(expanded.id); }}>{copy.edit}</ConfiguratorButton> : null}
          {!isDefaultExpanded && onDrawing ? <ConfiguratorButton onClick={() => onDrawing(expanded.id)}>{drawingLabel}</ConfiguratorButton> : null}
          <ConfiguratorButton onClick={() => isDefaultExpanded ? defaultSelection?.onToggle() : onAdd(expanded.id)}>{isDefaultExpanded
            ? defaultSelection?.added ? defaultSelection.cancelLabel : copy.addToList
            : isAdded(expanded.id) ? copy.viewList : copy.addToList}</ConfiguratorButton>
          {!isDefaultExpanded && onDelete ? <ConfiguratorButton onClick={() => setDeletingId(expanded.id)}>{copy.remove}</ConfiguratorButton> : null}
        </div>
        {!isDefaultExpanded && onDelete && deletingId === expanded.id ? <div className={styles.deleteConfirmation}>
          <span>{copy.removeQuestion}</span>
          <ConfiguratorButton onClick={() => { onDelete(expanded.id); setDeletingId(null); setPinnedId(null); setPreviewId(null); }}>{copy.removeConfirm}</ConfiguratorButton>
          <ConfiguratorButton onClick={() => setDeletingId(null)}>{copy.cancel}</ConfiguratorButton>
        </div> : null}
      </article> : null}
    </div>
  </section>;
}
