"use client";

import DrawingRequirements from "./DrawingRequirements";
import { getDrawingTypes, getDrawingRequirementsCopy, normalizeDrawingTypes, type CadDrawingType } from "@/data/products/detail/drawing-requirements";
import { useModelDrawingRequirements } from "@/data/products/configurator/model-drawing-requirements";
import { fittingView } from "@/components/products/detail/fitting-view";
import { fittingText } from "@/data/products/detail/fitting-ui.intl";
import { useEffect, useId, useRef, useState } from "react";
import { useSelectionCart } from "@/components/selection-cart/SelectionCartProvider";
import type { SelectionCartSourceType } from "@/components/selection-cart/selection-cart.types";
import { getStandaloneDimensionValues, loadStandaloneFittingSelection, pickStandaloneDimension,
  type StandaloneFittingOption, type StandaloneFittingSelection, type StandaloneFittingFamily } from "@/data/products/configurator/standalone-fitting-selection";
import ConfiguratorDialogFrame from "./ConfiguratorDialogFrame";
import ConfiguratorButton from "./ConfiguratorButton";
import shared from "./QuickConnectPairSelector.module.css";
import styles from "./StandaloneFittingSelector.module.css";

type Props = {
  locale?: string;
  productTypeId: StandaloneFittingFamily; model: string; sourceType: SelectionCartSourceType;
  onClose: () => void; onConfirm: (option: StandaloneFittingOption) => void;
};

export default function StandaloneFittingSelector({ locale = "zh", productTypeId, model, sourceType, onClose, onConfirm }: Props) {
  const [config, setConfig] = useState<StandaloneFittingSelection | null>(null);
  const [choice, setChoice] = useState(model);
  const [lookup, setLookup] = useState("");
  const [adjusted, setAdjusted] = useState("");
  const [error, setError] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const [drawingChoices, setDrawingChoices] = useState<Record<string, CadDrawingType[]>>({});
  const { getItem, addItem, setDrawingTypes } = useSelectionCart();
  const dialog = useRef<HTMLElement>(null), closeButton = useRef<HTMLButtonElement>(null), id = useId();
  const close = useRef(onClose);
  useEffect(() => { close.current = onClose; }, [onClose]);
  useEffect(() => {
    let active = true;
    loadStandaloneFittingSelection(productTypeId).then(value => {
      if (active) {setConfig(value); setError(!value.options.length);}
    }).catch(() => {if (active) setError(true);});
    return () => {active = false;};
  }, [productTypeId, attempt]);
  useEffect(() => {
    const previous = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const overflow = document.body.style.overflow, backdrop = dialog.current?.parentElement;
    const background = Array.from(document.body.children)
      .filter((element): element is HTMLElement => element instanceof HTMLElement && element !== backdrop)
      .map(element => ({element, inert: element.inert}));
    background.forEach(({element}) => {element.inert = true;});
    document.body.style.overflow = "hidden"; closeButton.current?.focus();
    const keydown = (event: KeyboardEvent) => {
      if (event.defaultPrevented) return;
      if (event.key === "Escape") {event.preventDefault(); close.current();}
      if (event.key !== "Tab") return;
      const elements = dialog.current?.querySelectorAll<HTMLElement>('button:not(:disabled), a[href], input:not(:disabled)');
      if (!elements?.length) return;
      const first = elements[0], last = elements[elements.length - 1];
      if (event.shiftKey && document.activeElement === first) {event.preventDefault(); last.focus();}
      else if (!event.shiftKey && document.activeElement === last) {event.preventDefault(); first.focus();}
    };
    document.addEventListener("keydown", keydown);
    return () => {
      document.removeEventListener("keydown", keydown); document.body.style.overflow = overflow;
      background.forEach(({element, inert}) => {element.inert = inert;});
      if (previous?.isConnected) previous.focus();
    };
  }, []);
  const selected = config?.options.find(option => option.model === choice) || config?.options[0];
  const pickerConfig = config ? {...config, dimensions: config.dimensions.filter(field =>
    !["profile", "shape"].includes(field.key) && field.label !== "密封方式")} : null;
  const normalized = lookup.trim().toUpperCase();
  const exact = config?.options.find(option => option.model === normalized || option.productCode === normalized);
  const matches = normalized ? config?.options.filter(option => option.model.includes(normalized) || option.productCode.includes(normalized)) || [] : [];
  const existing = selected ? getItem(sourceType, selected.productCode) : undefined;
  const [savedDrawings, saveDrawings] = useModelDrawingRequirements(`${productTypeId}:${selected?.model || model}`);
  const drawings = selected ? drawingChoices[selected.productCode] ?? savedDrawings : [];
  const needDrawing = drawings.length > 0;
  const added = Boolean(existing && JSON.stringify(getDrawingTypes(existing)) === JSON.stringify(drawings));
  function locate(text: string) {
    setLookup(text);
    const query = text.trim().toUpperCase();
    const hit = config?.options.find(option => option.model === query || option.productCode === query);
    if (hit) {setChoice(hit.model); setAdjusted("");}
  }
  function pick(key: string, value: string) {
    if (!pickerConfig || !selected || selected.attributes[key] === value) return;
    const next = pickStandaloneDimension(pickerConfig, selected, key, value);
    const changes = pickerConfig.dimensions.filter(field => field.key !== key && next.attributes[field.key] !== selected.attributes[field.key]);
    setChoice(next.model); setLookup("");
    const summary = changes.map(field => `${fittingText(field.label, locale)} ${fittingText(next.attributes[field.key] || "—", locale)}`)
      .join(locale === "zh" ? "、" : ", ");
    setAdjusted(changes.length ? `已同步匹配：${summary}` : "");
  }
  function addSelection() {
    if (!selected || !config) return;
    saveDrawings(drawings);
    if (existing) {setDrawingTypes(existing.id, drawings); return;}
    addItem({sourceType, sourceLabel: fittingText("产品详情页", locale), productName: fittingText(config.name, locale), productCode: selected.productCode,
      foreachModel: selected.model, competitorModels: [], quantity: 1, needDrawing, drawingTypes: normalizeDrawingTypes(drawings),
      imagePath: selected.imagePath, detailHref: locale === "zh" ? selected.detailHref : `/${locale}${selected.detailHref}`});
  }
  return fittingView(<ConfiguratorDialogFrame
    dialogRef={dialog} closeRef={closeButton} locale={locale} titleId={`${id}-title`} descriptionId={`${id}-description`}
    title={`${config?.name || "接头"}选型`} description="在当前页面选择规格，查看对应型号并加入清单。"
    closeLabel="关闭接头选型" onClose={onClose} className={`${shared.compact} ${styles.dialog}`}
    notice="单件选购，每种型号 1 件；数量可在清单中调整。"
    actions={<>
      <ConfiguratorButton onClick={addSelection} disabled={!selected || added} active={added}>{added ? "已加入清单" : existing ? getDrawingRequirementsCopy(locale).update : "加入清单"}</ConfiguratorButton>
      <ConfiguratorButton variant="primary" disabled={!selected} onClick={() => {if (selected) { saveDrawings(drawings); onConfirm(selected); }}}>确认选型</ConfiguratorButton>
    </>}
  >
    <div className={shared.body} data-standalone-fitting-selector={productTypeId}>
      {!pickerConfig || !selected ? <div className={styles.loading} role="status">
        <p>{error ? "选型数据加载失败，请重试。" : "正在加载选型规格…"}</p>
        {error ? <ConfiguratorButton onClick={() => {setError(false); setAttempt(value => value + 1);}}>重新加载</ConfiguratorButton> : null}
      </div> : <div className={shared.columns}>
        <section className={shared.picker} aria-labelledby={`${id}-picker`}>
          <h3 id={`${id}-picker`} className={shared.pickerTitle}>选择规格</h3>
          <div className={shared.rows}>
            {pickerConfig.dimensions.map(field => {
              const values = getStandaloneDimensionValues(pickerConfig, selected, field.key);
              if (!values.length) return null;
              return <div className={shared.row} key={field.key} role="group" aria-label={field.label}>
                <span className={shared.rowLabel}>{field.label}</span>
                <div className={shared.chips}>{values.map(value => <button type="button" key={value}
                  aria-pressed={selected.attributes[field.key] === value}
                  className={selected.attributes[field.key] === value ? shared.chipActive : shared.chip}
                  onClick={() => pick(field.key, value)}>{value}</button>)}</div>
              </div>;
            })}
          </div>
          <p className={shared.adjusted} aria-live="polite" hidden={!adjusted}>{adjusted}</p>
          <div className={shared.lookup}>
            <label htmlFor={`${id}-lookup`}>已知型号或商品编码？直接输入定位</label>
            <input id={`${id}-lookup`} type="search" value={lookup} autoComplete="off" spellCheck={false}
              placeholder={`例如 ${model}`} onChange={event => locate(event.target.value)}
              aria-describedby={`${id}-lookup-status`}
              onKeyDown={event => {
                if (event.key === "Enter" && matches.length) {event.preventDefault(); locate(matches[0].model);}
                if (event.key === "Escape" && lookup) {event.preventDefault(); setLookup("");}
              }} />
            {normalized && !exact && matches.length ? <div className={shared.suggestions} role="group" aria-label="匹配的型号">
              {matches.slice(0, 6).map(option => <button className={shared.suggestion} key={option.model} type="button" onClick={() => locate(option.model)}>{option.model}</button>)}
            </div> : null}
            <p id={`${id}-lookup-status`} aria-live="polite" className={normalized && !matches.length ? shared.lookupStatusError : shared.lookupStatusFound}>
              {normalized ? exact ? "已定位到该型号" : matches.length ? `找到 ${matches.length} 个匹配，可继续输入或点击型号。` : "未找到该型号或商品编码，当前选型未改变。" : ""}
            </p>
          </div>
          <p className={styles.status}>共 {pickerConfig.options.length} 个可选型号；后续选项随前面的规格更新。</p>
        </section>
        <section className={shared.result} aria-labelledby={`${id}-result`}>
          <h3 id={`${id}-result`} className={shared.pickerTitle}>选型结果</h3>
          {/* Published static product images load directly; this selector never initializes CAD. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className={styles.preview} src={selected.imagePath} alt={selected.model} />
          <dl className={styles.specs} aria-label="选型规格" aria-live="polite">
            <div><dt>型号</dt><dd>{selected.model}</dd></div>
            <div><dt>商品编码</dt><dd>{selected.productCode}</dd></div>
          </dl>
          <DrawingRequirements locale={locale} value={drawings}
            onChange={value => setDrawingChoices(current => ({ ...current, [selected.productCode]: value }))} />
        </section>
      </div>}
    </div>
  </ConfiguratorDialogFrame>, locale);
}
