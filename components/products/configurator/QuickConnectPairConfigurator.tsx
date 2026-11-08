"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { QuickConnectPairConfig } from "@/data/products/configurator/quick-connect-pairing";
import styles from "./QuickConnectPairConfigurator.module.css";

type Props = {
  open: boolean;
  config: QuickConnectPairConfig;
  value: string | null;
  onClose: () => void;
  onConfirm: (model: string) => void;
  onAdd: (model: string) => void;
  isAdded: (model: string) => boolean;
};

const copy = {
  zh: {
    title: "Q20 公母端配对选型",
    description: "另一端可在已发布的 Q20 母端中切换；公母端的管径、安装方式、阀门和材质可以按设备两侧分别选择。",
    close: "关闭配对选型",
    base: "当前公端",
    mate: "选择母端",
    select: "母端型号",
    preview: "配对预览",
    code: "商品编码",
    specs: "规格",
    drawing: "查看图纸",
    drawingUnavailable: "网页图纸待补充",
    note: "配对组合用于页面选型和清单整理；实际介质兼容性、压力和温度请按两端材料与工况确认。",
    add: "加入配对清单",
    added: "已加入清单",
    confirm: "确认配对",
  },
  en: {
    title: "Q20 male/female mating selector",
    description: "Switch the mating end among published Q20 female fittings. Tube size, mounting, valve and material can be chosen independently for each side.",
    close: "Close mating selector",
    base: "Current male end",
    mate: "Select female end",
    select: "Female model",
    preview: "Pair preview",
    code: "Product code",
    specs: "Specifications",
    drawing: "View drawing",
    drawingUnavailable: "Web drawing pending",
    note: "The pairing supports page selection and inquiry-list preparation. Confirm fluid compatibility, pressure and temperature for both material sets before use.",
    add: "Add pair to list",
    added: "Added to list",
    confirm: "Confirm pair",
  },
} as const;

export default function QuickConnectPairConfigurator({
  open,
  config,
  value,
  onClose,
  onConfirm,
  onAdd,
  isAdded,
}: Props) {
  const localeCopy = copy[config.locale];
  const [choice, setChoice] = useState(value || config.defaultModel);
  const [filter, setFilter] = useState("");
  const dialogRef = useRef<HTMLElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (!open) return;
    setChoice(value || config.defaultModel);
    setFilter("");
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    const backdrop = dialogRef.current?.parentElement;
    const background = Array.from(document.body.children)
      .filter((element): element is HTMLElement => element instanceof HTMLElement && element !== backdrop)
      .map(element => ({ element, inert: element.inert }));
    background.forEach(({ element }) => { element.inert = true; });
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onCloseRef.current();
        return;
      }
      if (event.key !== "Tab") return;
      const focusable = dialogRef.current?.querySelectorAll<HTMLElement>("button:not(:disabled), a[href], input, select");
      if (!focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      background.forEach(({ element, inert }) => { element.inert = inert; });
      previousFocus?.focus();
    };
  }, [config.defaultModel, open, value]);

  const selected = config.options.find(option => option.model === choice) || config.options[0];
  const filteredOptions = useMemo(() => {
    const normalized = filter.trim().toLowerCase();
    if (!normalized) return config.options;
    return config.options.filter(option => `${option.model} ${option.description}`.toLowerCase().includes(normalized));
  }, [config.options, filter]);

  if (!open || !selected) return null;

  return createPortal(
    <div className={styles.overlay}>
      <section ref={dialogRef} className={styles.dialog} lang={config.locale} role="dialog" aria-modal="true" aria-labelledby="quick-connect-pair-title" aria-describedby="quick-connect-pair-description">
        <header className={styles.header}>
          <div>
            <h2 id="quick-connect-pair-title">{localeCopy.title}</h2>
            <p id="quick-connect-pair-description">{localeCopy.description}</p>
          </div>
          <button ref={closeRef} className={styles.close} type="button" aria-label={localeCopy.close} onClick={onClose}>×</button>
        </header>

        <div className={styles.body}>
          <aside className={styles.basePanel}>
            <span className={styles.eyebrow}>{localeCopy.base}</span>
            <strong>{config.baseModel}</strong>
            <div className={styles.imageFrame}>
              {config.baseImagePath ? <img src={config.baseImagePath} alt={config.baseModel} /> : null}
            </div>
            <p>{config.baseDescription}</p>
            <small>{localeCopy.code}：{config.baseProductCode || "—"}</small>
          </aside>

          <section className={styles.selectionPanel}>
            <div className={styles.sectionHeading}>
              <div>
                <span className={styles.eyebrow}>{localeCopy.mate}</span>
                <h3>{localeCopy.preview}</h3>
              </div>
              {selected.drawingHref ? (
                <a href={selected.drawingHref} target="_blank" rel="noreferrer">{localeCopy.drawing} ↗</a>
              ) : (
                <span className={styles.unavailable}>{localeCopy.drawingUnavailable}</span>
              )}
            </div>
            <label className={styles.label} htmlFor="quick-connect-mate-select">{localeCopy.select}</label>
            <select id="quick-connect-mate-select" className={styles.select} value={choice} onChange={event => setChoice(event.target.value)}>
              {config.options.map(option => <option key={option.model} value={option.model}>{option.model} · {option.description}</option>)}
            </select>
            <label className={styles.filterLabel} htmlFor="quick-connect-mate-filter">{config.locale === "zh" ? "筛选型号" : "Filter models"}</label>
            <input id="quick-connect-mate-filter" className={styles.filter} type="search" value={filter} onChange={event => setFilter(event.target.value)} placeholder={config.locale === "zh" ? "输入型号、管径或材质" : "Model, tube size or material"} />
            <div className={styles.optionList} role="listbox" aria-label={localeCopy.select}>
              {filteredOptions.map(option => (
                <button key={option.model} type="button" role="option" aria-selected={choice === option.model} className={choice === option.model ? styles.optionActive : styles.option} onClick={() => setChoice(option.model)}>
                  <span>{option.model}</span>
                  <small>{option.description}</small>
                </button>
              ))}
            </div>
            <div className={styles.pairPreview}>
              <div className={styles.previewPart}>
                <span>{config.baseModel}</span>
                {config.baseImagePath ? <img src={config.baseImagePath} alt="" /> : null}
              </div>
              <span className={styles.joiner} aria-hidden="true">↔</span>
              <div className={styles.previewPart}>
                <span>{selected.model}</span>
                <img src={selected.imagePath} alt="" />
              </div>
            </div>
            <dl className={styles.details}>
              <div><dt>{localeCopy.code}</dt><dd>{selected.productCode}</dd></div>
              <div><dt>{localeCopy.specs}</dt><dd>{selected.description}</dd></div>
            </dl>
          </section>
        </div>

        <footer className={styles.footer}>
          <p>{localeCopy.note}</p>
          <div className={styles.actions}>
            <button type="button" className={styles.secondary} disabled={isAdded(selected.model)} onClick={() => onAdd(selected.model)}>{isAdded(selected.model) ? localeCopy.added : localeCopy.add}</button>
            <button type="button" className={styles.primary} onClick={() => onConfirm(selected.model)}>{localeCopy.confirm}</button>
          </div>
        </footer>
      </section>
    </div>,
    document.body,
  );
}
