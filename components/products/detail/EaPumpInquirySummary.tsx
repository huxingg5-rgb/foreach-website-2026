"use client";

import { drawingRequirementsLine } from "@/data/products/detail/drawing-requirements";
import { getProductDetailResourceCopy, type ProductDetailResourceLocale } from "@/data/products/detail/product-detail-resources";
import { pistonView } from "./piston-view";
import { pistonText } from "@/data/products/detail/piston-pump-ui.intl";
import { useEffect, useId, useRef, useState } from "react";
import {
  eaPumpInquiryRows, getEaPumpInquiryTarget,
  type EaPumpInquiryConfiguration,
} from "@/data/products/configurator/ea-pump-inquiry";
import type { SavedEaPumpConfiguration } from "@/data/products/configurator/ea-pump-inquiry-configurations";
import ConfiguratorButton from "@/components/products/configurator/ConfiguratorButton";
import buttonStyles from "@/components/products/configurator/ConfiguratorButton.module.css";
import styles from "@/components/products/tubing-assemblies/FlangedTubingWorkspace.module.css";
import layout from "./EaPumpInquirySummary.module.css";
import { getSelectionWorkspacePresentation } from "@/data/products/detail/selection-workspace-copy";

type Props = {
  locale?: string;
  series: "EA" | "SM" | "TM";
  configuration: EaPumpInquiryConfiguration | null;
  quantity: number;
  showDrawing: boolean;
  drawingSelected: boolean;
  addedToList: boolean;
  onEdit: () => void;
  onDrawing: () => void;
  onRequestCad?: (id: string) => void;
  onAdd: () => void;
  savedConfigurations?: SavedEaPumpConfiguration[];
  expandedId?: string | null;
  pinnedId?: string | null;
  onSelect?: (id: string) => void;
  onPreview?: (id: string | null) => void;
  onCollapse?: () => void;
  onNew?: () => void;
  onDelete?: (id: string) => void;
};

export default function EaPumpInquirySummary({
  locale = "zh", series, configuration, quantity, showDrawing, drawingSelected, addedToList,
  onEdit, onDrawing, onAdd, onRequestCad,
  savedConfigurations, expandedId, pinnedId, onSelect, onPreview, onCollapse, onNew, onDelete,
}: Props) {
  const panelId = useId();
  const presentation = getSelectionWorkspacePresentation(locale, "piston", series);
  const rootRef = useRef<HTMLElement>(null);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [confirmationFor, setConfirmationFor] = useState(expandedId);
  if (confirmationFor !== expandedId) {
    setConfirmationFor(expandedId);
    setConfirmDelete(false);
  }
  useEffect(() => {
    if (!expandedId || !onCollapse) return;
    const closeOutside = (event: MouseEvent) => {
      if (event.target instanceof Node && !rootRef.current?.contains(event.target)) onCollapse();
    };
    document.addEventListener("click", closeOutside);
    return () => document.removeEventListener("click", closeOutside);
  }, [expandedId, onCollapse]);
  // Visible labels follow the current list; saved IDs remain stable after deletion.
  const expandedIndex = savedConfigurations?.findIndex(item => item.id === expandedId) ?? -1;
  const expanded = savedConfigurations?.[expandedIndex];
  const expandedNumber = expandedIndex + 1;
  const target = configuration ? getEaPumpInquiryTarget(configuration.choice) : undefined;
  const rows = configuration ? eaPumpInquiryRows(configuration, locale) : [];
  const summary = (labels: string[]) => rows.filter(([label]) => labels.map(value => pistonText(value, locale)).includes(label))
    .map(([label, value]) => `${label}${locale === "zh" ? "：" : ": "}${value}`).join(" · ");

  return pistonView(<section ref={rootRef} className={`${styles.workspace} ${layout.workspace} ${buttonStyles.blueWhite}`} data-ea-inquiry-summary="true" aria-label={`${series} 柱塞泵已选配置`}
    onPointerLeave={() => { if (!pinnedId) onPreview?.(null); }}
    onBlur={(event) => {
      if (!pinnedId && !event.currentTarget.contains(event.relatedTarget)) onPreview?.(null);
    }}
    onKeyDown={(event) => {
      if (event.key === "Escape" && expandedId) {
        event.preventDefault();
        event.stopPropagation();
        const trigger = rootRef.current?.querySelector<HTMLButtonElement>('button[aria-expanded="true"]');
        onCollapse?.();
        trigger?.focus();
      }
    }}>
    <div className={styles.workspaceHeading}>
      <div><h3>{presentation.title}</h3><p>{savedConfigurations ? savedConfigurations.length
        ? `已保存 ${savedConfigurations.length} 个配置。悬停预览，点击保持展开，点击区域外收起。`
        : presentation.description
        : "已保存本次选型，可进入配置修改或加入询价清单。"}</p></div>
    </div>
    {savedConfigurations ? <div className={layout.buttons} role="group" aria-label="已保存的配置">
      {savedConfigurations.map((item, index) => <ConfiguratorButton key={item.id}
        variant={expandedId === item.id ? "primary" : "secondary"}
        aria-expanded={expandedId === item.id} aria-controls={panelId}
        onPointerEnter={(event) => {
          if (event.pointerType === "mouse" && !pinnedId) onPreview?.(item.id);
        }}
        onClick={() => onSelect?.(item.id)}>{`配置${index + 1}`}</ConfiguratorButton>)}
      <ConfiguratorButton onClick={onNew}>新增配置</ConfiguratorButton>
    </div> : null}
    <div id={panelId} className={styles.configurationList} hidden={Boolean(savedConfigurations) && !expanded}>
      {configuration && (!savedConfigurations || expanded) ? <article className={styles.configuration} data-active="true" aria-label={expanded ? `配置${expandedNumber}详情` : undefined}>
        <div className={styles.requestConfiguration}>
          <strong>{expanded ? `配置${expandedNumber} · ` : ""}{target?.model || `${series} 柱塞泵意向配置`}</strong>
          <span className={styles.revision}>{`询价数量：${quantity} 台`}</span>
          <p translate="no">{summary(["标称容量", "泵头材质", "配置形式", "光耦"])}</p>
          <p translate="no">{summary(["液路接口", "电机步距角", "满行程步数", "通信接口"])}</p>
          {rows.filter(([label]) => ["阀路要求", "补充需求"].map(value => pistonText(value, locale)).includes(label))
            .map(([label, value]) => <pre translate="no" key={label}>{label}{locale === "zh" ? "：" : ": "}{value}</pre>)}
          <p translate="no">{drawingRequirementsLine(expanded || {}, locale)}</p>
          <small>{target ? "供货配置待技术确认。" : "该配置暂无对应详情页，已保留在当前页，供货配置待技术确认。"}</small>
        </div>
        <div className={styles.configurationActions}>
          <ConfiguratorButton onClick={onEdit}>进入配置</ConfiguratorButton>
          {showDrawing ? <ConfiguratorButton aria-pressed={drawingSelected} onClick={onDrawing}>{drawingSelected ? "已添加图纸" : "添加图纸"}</ConfiguratorButton> : null}
          {onRequestCad && expanded ? <ConfiguratorButton aria-haspopup="dialog" onClick={() => onRequestCad(expanded.id)}>{getProductDetailResourceCopy((locale === "zh-CN" ? "zh" : locale) as ProductDetailResourceLocale).requestCad}</ConfiguratorButton> : null}
          <ConfiguratorButton onClick={onAdd}>{addedToList ? "查看清单" : "加入清单"}</ConfiguratorButton>
          {expanded && onDelete ? <ConfiguratorButton onClick={() => setConfirmDelete(true)}>删除配置</ConfiguratorButton> : null}
        </div>
        {confirmDelete && expanded ? <div className={styles.deleteConfirmation}>
          <span>{`删除配置${expandedNumber}？询价清单中的记录会保留。`}</span>
          <ConfiguratorButton onClick={() => { onDelete?.(expanded.id); setConfirmDelete(false); }}>确认删除</ConfiguratorButton>
          <ConfiguratorButton onClick={() => setConfirmDelete(false)}>取消</ConfiguratorButton>
        </div> : null}
      </article> : null}
    </div>
  </section>, locale);
}
