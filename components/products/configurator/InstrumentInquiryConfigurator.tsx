"use client";

import { useEffect, useId, useRef, useState } from "react";
import { getInstrumentInquiryDefaults, getInstrumentInquiryFields, instrumentInquiryNote, instrumentInquiryProductName, instrumentInquiryRows, normalizeInstrumentInquiry, resolveInstrumentInquiry, validateInstrumentInquiry, type InstrumentInquiryConfiguration } from "@/data/products/configurator/instrument-inquiry";
import type { SavedInstrumentInquiry } from "@/data/products/configurator/instrument-inquiry-configurations";
import { instrumentInquiryQuantityLabel, instrumentInquiryText as text } from "@/data/products/configurator/instrument-inquiry.intl";
import { isSyringePumpInquiryFamily } from "@/data/products/configurator/syringe-pump-inquiry";
import { getSelectionWorkspaceCopy } from "@/data/products/detail/selection-workspace-copy";
import { normalizeDrawingTypes, type CadDrawingType } from "@/data/products/detail/drawing-requirements";
import ConfiguratorDialogFrame from "./ConfiguratorDialogFrame";
import ConfiguratorButton from "./ConfiguratorButton";
import DrawingRequirements from "./DrawingRequirements";
import shared from "./product-variant-configurator.module.css";
import fitting from "./HardTubeWasherConfigurator.module.css";
import form from "./FlangedTubingConfigurator.module.css";

type Props = {
  slug: string; locale: string; initial: SavedInstrumentInquiry | null; label: string;
  onClose: () => void;
  onConfirm: (configuration: InstrumentInquiryConfiguration, quantity: number, drawings: CadDrawingType[], addToList: boolean) => void;
};
export default function InstrumentInquiryConfigurator({ slug, locale, initial, label, onClose, onConfirm }: Props) {
  const [configuration, setConfiguration] = useState(() => initial?.configuration || getInstrumentInquiryDefaults(slug));
  const [quantity, setQuantity] = useState(String(initial?.quantity || 1));
  const [drawings, setDrawings] = useState(() => normalizeDrawingTypes(initial ? initial.drawingTypes : ["2d", "3d"]));
  const [error, setError] = useState("");
  const dialogRef = useRef<HTMLElement>(null), closeRef = useRef<HTMLButtonElement>(null), closeCallback = useRef(onClose);
  const prefix = useId(), copy = getSelectionWorkspaceCopy(locale);
  const quantityLabel = instrumentInquiryQuantityLabel(locale);
  const t = (key: Parameters<typeof text>[0]) => text(key, locale);
  const name = instrumentInquiryProductName(configuration.family, locale);
  const syringePump = isSyringePumpInquiryFamily(configuration.family);
  const configureText = t(syringePump ? "syringeConfigure" : "configure");
  useEffect(() => { closeCallback.current = onClose; }, [onClose]);
  useEffect(() => {
    const previousFocus = document.activeElement, overflow = document.body.style.overflow;
    const backdrop = dialogRef.current?.parentElement;
    const background = Array.from(document.body.children).filter((element): element is HTMLElement => element instanceof HTMLElement && element !== backdrop)
      .map(element => ({ element, inert: element.inert }));
    background.forEach(({ element }) => { element.inert = true; });
    document.body.style.overflow = "hidden"; closeRef.current?.focus({ preventScroll: true });
    const handleKey = (event: KeyboardEvent) => {
      if (event.defaultPrevented) return;
      if (event.key === "Escape" && !(event.target instanceof HTMLSelectElement)) { event.preventDefault(); closeCallback.current(); }
      if (event.key !== "Tab") return;
      const controls = Array.from(dialogRef.current?.querySelectorAll<HTMLElement>("button, input, select, textarea, [tabindex]") || [])
        .filter(element => !element.matches(":disabled") && element.tabIndex >= 0 && element.getClientRects().length);
      if (event.shiftKey && document.activeElement === controls[0]) { event.preventDefault(); controls.at(-1)?.focus(); }
      else if (!event.shiftKey && document.activeElement === controls.at(-1)) { event.preventDefault(); controls[0]?.focus(); }
    };
    document.addEventListener("keydown", handleKey);
    return () => { document.removeEventListener("keydown", handleKey); document.body.style.overflow = overflow;
      background.forEach(({ element, inert }) => { element.inert = inert; });
      if (previousFocus instanceof HTMLElement && previousFocus.isConnected) previousFocus.focus({ preventScroll: true }); };
  }, []);
  function confirm(addToList: boolean) {
    const invalid = validateInstrumentInquiry(configuration, Number(quantity));
    if (invalid) { setError(t(invalid)); return; }
    onConfirm(normalizeInstrumentInquiry(configuration), Number(quantity), drawings, addToList);
  }
  function updateChoice(key: string, value: string) {
    setConfiguration(previous => {
      const next = { ...previous, choice: { ...previous.choice, [key]: value } };
      return syringePump ? { ...next, choice: normalizeInstrumentInquiry(next).choice } : next;
    });
    setError("");
  }
  if (typeof document === "undefined") return null;
  return <ConfiguratorDialogFrame dialogRef={dialogRef} closeRef={closeRef} locale={locale} className={fitting.selector}
    titleId={`${prefix}-title`} descriptionId={`${prefix}-description`} title={`${name} · ${configureText}`}
    description={`${label} · ${t("description")}`} closeLabel={t(syringePump ? "syringeClose" : "close")} onClose={onClose}
    notice={error ? <span className={form.error} role="alert">{error}</span> : t("notice")}
    actions={<><ConfiguratorButton onClick={() => confirm(true)}>{copy.addToList}</ConfiguratorButton><ConfiguratorButton variant="primary" onClick={() => confirm(false)}>{t("confirm")}</ConfiguratorButton></>}>
    <div className={`${shared.main} ${fitting.main}`} data-instrument-inquiry-dialog={configuration.family}>
      <aside className={`${shared.summary} ${fitting.summary}`} aria-label={t("configuration")}>
        <div className={shared.summaryTitle}><span>{label}</span><strong>{resolveInstrumentInquiry(configuration).model}</strong><p className={fitting.productName}>{name}</p></div>
        <div className={`${shared.summaryTable} ${fitting.summaryTable}`} aria-live="polite">
          {instrumentInquiryRows(configuration, locale).map(([label, value]) => <div className={shared.summaryRow} key={label}><span>{label}</span><b>{value}</b></div>)}
          <div className={shared.summaryRow}><span>{quantityLabel}</span><b>{quantity || t("pending")}</b></div>
        </div>
      </aside>
      <section className={`${shared.config} ${fitting.config}`}>
        <div className={shared.sectionHead}><h3>{configureText}</h3><span>{t("description")}</span></div>
        <div className={fitting.configBody}>
          <DrawingRequirements locale={locale} value={drawings} onChange={setDrawings} />
          <fieldset className={shared.optionGroup} aria-label={configureText}><div className={fitting.options}><div className={form.endFields}>
            {getInstrumentInquiryFields(configuration.family, locale, configuration.choice).map(field => <div className={form.field} key={field.key}>
              <label htmlFor={`${prefix}-${field.key}`}>{field.label}</label>
              <select id={`${prefix}-${field.key}`} value={configuration.choice[field.key]} onChange={event => updateChoice(field.key, event.target.value)}>
                {field.options.map(([value, label]) => <option key={value} value={value}>{label}</option>)}
              </select>
            </div>)}
            <div className={form.field}><label htmlFor={`${prefix}-quantity`}>{quantityLabel}</label>
              <input id={`${prefix}-quantity`} type="number" min={1} max={1000000} step={1} inputMode="numeric" value={quantity} onChange={event => { setQuantity(event.target.value); setError(""); }} /></div>
          </div><p className={fitting.selectionNote}>{instrumentInquiryNote(configuration.family, locale)}</p></div></fieldset>
          <fieldset className={shared.optionGroup}><legend><label htmlFor={`${prefix}-requirements`}>{t("requirements")}</label></legend>
            <div className={fitting.options}><div className={form.field}><textarea id={`${prefix}-requirements`} rows={4} maxLength={2000} placeholder={t(syringePump ? "syringePlaceholder" : "placeholder")}
              value={configuration.requirements} onChange={event => setConfiguration(previous => ({ ...previous, requirements: event.target.value }))} /></div></div>
          </fieldset>
        </div>
      </section>
    </div>
  </ConfiguratorDialogFrame>;
}
