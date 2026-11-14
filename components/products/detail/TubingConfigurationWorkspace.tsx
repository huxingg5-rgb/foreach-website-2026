"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import ProductVariantConfigurator from "@/components/products/configurator/ProductVariantConfigurator";
import ConfiguratorButton from "@/components/products/configurator/ConfiguratorButton";
import { formatConfiguratorValue } from "@/components/products/configurator/product-variant-configurator.engine";
import { localizeProductConfiguratorConfig, localizeProductConfiguratorValue } from "@/components/products/configurator/product-variant-configurator.i18n";
import type { ProductConfiguratorConfig, ProductConfiguratorLocale, ProductConfiguratorVariant } from "@/components/products/configurator/product-variant-configurator.types";
import { removeTubingConfiguration, upsertTubingConfiguration, type TubingConfigurations } from "@/data/products/configurator/tubing-configurations";
import { formatTubingConfigurationCopy, getSavedConfigurationText, getTubingConfigurationCopy } from "@/data/products/tubing/configuration-ui.intl";
import buttonStyles from "@/components/products/configurator/ConfiguratorButton.module.css";
import shared from "@/components/products/tubing-assemblies/FlangedTubingWorkspace.module.css";
import layout from "./EaPumpInquirySummary.module.css";
import styles from "./TubingConfigurationWorkspace.module.css";

type Props = {
  config: ProductConfiguratorConfig;
  material: string;
  locale: ProductConfiguratorLocale;
  collection: TubingConfigurations;
  onChange: (change: (current: TubingConfigurations) => TubingConfigurations) => void;
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
  isAdded: (variant: ProductConfiguratorVariant) => boolean;
  onAdd: (variant: ProductConfiguratorVariant) => void;
};

export default function TubingConfigurationWorkspace({ config: sourceConfig, material, locale, collection, onChange, open, onOpen, onClose, isAdded, onAdd }: Props) {
  const copy = getTubingConfigurationCopy(locale);
  const selectionHelp = material === "PVC" ? copy.pvcEmpty : copy.empty;
  const text = (template: string, values: Record<string, string | number> = {}) => formatTubingConfigurationCopy(template, values);
  const rootRef = useRef<HTMLElement>(null);
  const panelId = useId();
  const [pinnedId, setPinnedId] = useState<string | null>(null);
  const [previewId, setPreviewId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const expandedId = previewId ?? pinnedId;
  const expandedIndex = collection.configurations.findIndex(item => item.id === expandedId);
  const expanded = collection.configurations[expandedIndex];
  const variant = sourceConfig.variants.find(item => item.id === expanded?.variantId);
  const editingIndex = collection.configurations.findIndex(item => item.id === editingId);
  const editing = collection.configurations[editingIndex];
  const config = useMemo(() => {
    const localized = localizeProductConfiguratorConfig(sourceConfig, locale);
    return { ...localized, localizedLocale: locale,
      title: formatTubingConfigurationCopy(editing ? copy.editTitle : copy.createTitle, { number: editing ? editingIndex + 1 : collection.configurations.length + 1 }),
      uiText: { ...localized.uiText, confirmAndReturn: copy.save, selectionHint: selectionHelp },
    };
  }, [sourceConfig, locale, copy, selectionHelp, editing, editingIndex, collection.configurations.length]);

  useEffect(() => {
    if (!expandedId) return;
    const closeOutside = (event: PointerEvent) => {
      if (event.target instanceof Node && !rootRef.current?.contains(event.target)) {
        setPinnedId(null); setPreviewId(null); setDeleteId(null);
      }
    };
    document.addEventListener("pointerdown", closeOutside);
    return () => document.removeEventListener("pointerdown", closeOutside);
  }, [expandedId]);

  const rows = variant ? [
    ...config.dimensions.map(dimension => [dimension.label, localizeProductConfiguratorValue(formatConfiguratorValue(variant.attributes[dimension.key], dimension.unit, dimension.precision), locale)]),
    ...(config.resultSummaryRows ?? []).map(row => [row.label, localizeProductConfiguratorValue(formatConfiguratorValue(variant.result?.[row.key], row.unit, row.precision), locale)]),
  ] : [];

  function collapse() { setPinnedId(null); setPreviewId(null); setDeleteId(null); }

  return <section ref={rootRef} className={`${shared.workspace} ${layout.workspace} ${styles.workspace} ${buttonStyles.blueWhite}`} data-tubing-configuration-workspace="true" aria-label={text(copy.title, { material })}
    onPointerLeave={() => { if (!pinnedId) setPreviewId(null); }}
    onBlur={event => { if (!pinnedId && !event.currentTarget.contains(event.relatedTarget)) setPreviewId(null); }}
    onKeyDown={event => {
      if (event.key === "Escape" && expandedId) {
        event.preventDefault(); event.stopPropagation();
        rootRef.current?.querySelector<HTMLButtonElement>('button[aria-expanded="true"]')?.focus();
        collapse();
      }
    }}>
    <div className={shared.workspaceHeading}><div>
      <h3 className={styles.title}>{text(copy.title, { material })}</h3>
      <p>{collection.configurations.length ? getSavedConfigurationText(locale, collection.configurations.length) : selectionHelp}</p>
    </div></div>
    <div className={layout.buttons} role="group" aria-label={copy.group}>
      {collection.configurations.map((item, index) => <ConfiguratorButton key={item.id}
        variant={expandedId === item.id ? "primary" : "secondary"} aria-expanded={expandedId === item.id} aria-controls={panelId}
        onPointerEnter={event => { if (event.pointerType === "mouse" && !pinnedId) { setPreviewId(item.id); setDeleteId(null); } }}
        onClick={() => { setPinnedId(item.id); setPreviewId(null); setDeleteId(null); onChange(current => ({ ...current, activeId: item.id })); }}
      >{text(copy.configuration, { number: index + 1 })}</ConfiguratorButton>)}
      <ConfiguratorButton onClick={() => { setEditingId(null); setDeleteId(null); onOpen(); }}>{copy.add}</ConfiguratorButton>
    </div>
    <div id={panelId} className={shared.configurationList} hidden={!expanded || !variant}>
      {expanded && variant ? <article className={shared.configuration} data-active="true" aria-label={text(copy.configuration, { number: expandedIndex + 1 })}>
        <div className={styles.summary}>
          <strong>{text(copy.configuration, { number: expandedIndex + 1 })} · {variant.model}</strong>
          <p>{copy.code}{locale === "zh" ? "：" : ": "}{variant.productCode}</p>
          <p>{rows.map(([label, value]) => `${label}${locale === "zh" ? "：" : ": "}${value}`).join(" · ")}</p>
        </div>
        <div className={shared.configurationActions}>
          <ConfiguratorButton onClick={() => { setEditingId(expanded.id); onOpen(); }}>{copy.edit}</ConfiguratorButton>
          <ConfiguratorButton onClick={() => onAdd(variant)}>{isAdded(variant) ? copy.viewList : copy.addToList}</ConfiguratorButton>
          <ConfiguratorButton onClick={() => setDeleteId(expanded.id)}>{copy.remove}</ConfiguratorButton>
        </div>
        {deleteId === expanded.id ? <div className={shared.deleteConfirmation}>
          <span>{text(copy.confirmRemove, { number: expandedIndex + 1 })}</span>
          <ConfiguratorButton onClick={() => { onChange(current => removeTubingConfiguration(current, expanded.id)); collapse(); }}>{copy.confirm}</ConfiguratorButton>
          <ConfiguratorButton onClick={() => setDeleteId(null)}>{copy.cancel}</ConfiguratorButton>
        </div> : null}
      </article> : null}
    </div>
    <ProductVariantConfigurator locale={locale} config={config} open={open}
      value={sourceConfig.variants.find(item => item.id === editing?.variantId) ?? null}
      onClose={onClose}
      onConfirm={selected => {
        const id = editing?.id ?? `tubing-config-${collection.nextNumber}`;
        onChange(current => upsertTubingConfiguration(current, selected.id, editingId));
        setPinnedId(id); setPreviewId(null); setDeleteId(null); onClose();
      }} />
  </section>;
}
