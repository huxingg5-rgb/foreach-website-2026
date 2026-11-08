"use client";

import { fittingView } from "@/components/products/detail/fitting-view";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import styles from "./QuickConnectPairSelector.module.css";

export type QuickConnectModelRow = {
  model: string;
  productCode: string;
  connection: string;
  gender: string;
  panelMount: string;
  valved: string;
  shape: string;
  housingMaterial: string;
  sealingRingMaterial?: string;
  imagePath?: string;
  drawingHref?: string | null;
  detailHref?: string;
};

type Props = {
  open: boolean;
  series: string;
  rows: QuickConnectModelRow[];
  value: string | null;
  locale: string;
  onClose: () => void;
  onConfirm: (model: string) => void;
};

type DimensionKey = "connection" | "gender" | "panel" | "valve" | "shape" | "material";
type Attributes = Record<DimensionKey, string>;
type Entry = { option: QuickConnectModelRow; attrs: Attributes };

const DIMENSIONS: DimensionKey[] = ["connection", "gender", "panel", "valve", "shape", "material"];
const DIMENSION_WEIGHT: Record<DimensionKey, number> = {
  connection: 32,
  gender: 16,
  panel: 8,
  valve: 4,
  shape: 2,
  material: 1,
};
const MAX_LOOKUP_SUGGESTIONS = 6;

const copy = {
  zh: {
    title: (series: string) => `${series} 型号选择`,
    description: "按接口、端别、安装方式、阀门、形状和材质逐项选择，型号自动确定；也可以直接输入型号定位。",
    close: "关闭型号选择",
    current: "当前选择",
    count: (count: number) => `共 ${count} 个在售型号`,
    code: "商品编码",
    heading: "按规格选择",
    lookupLabel: "已知型号？直接输入定位",
    lookupPlaceholder: "例如 Q2002-SNV-LACN",
    lookupFound: "已定位到该型号",
    lookupNotFound: "没有找到这个型号，请检查拼写",
    lookupMore: (count: number) => `共 ${count} 个匹配，继续输入可缩小范围`,
    suggestions: "匹配的型号",
    dimensions: {
      connection: "接口",
      gender: "端别",
      panel: "安装",
      valve: "阀门",
      shape: "形状",
      material: "材质",
    },
    values: {
      gender: { "公端": "公端", "母端": "母端" },
      panel: { "穿板": "穿板", "非穿板": "非穿板" },
      valve: { "带阀": "带阀", "不带阀": "不带阀" },
      shape: { "直通": "直通", "L型": "L型" },
    },
    hint: "虚线选项在当前组合下没有对应型号，点击后会自动调整其他项。",
    adjusted: "已自动调整：",
    separator: "，",
    result: "选择结果",
    model: "型号",
    specs: "规格",
    drawing: "查看二维图纸",
    drawingUnavailable: "该型号网页图纸待补充",
    note: "型号选择用于定位详情页和整理清单；实际介质兼容性、压力和温度请按具体型号资料确认。",
    cancel: "返回",
    confirm: "查看型号详情",
  },
  en: {
    title: (series: string) => `${series} model selector`,
    description: "Choose the interface, end type, mounting, valve, shape and materials; the model resolves automatically, or type a model to locate it.",
    close: "Close model selector",
    current: "Current selection",
    count: (count: number) => `${count} active models`,
    code: "Product code",
    heading: "Choose by specification",
    lookupLabel: "Know the model? Type it to jump",
    lookupPlaceholder: "e.g. Q2002-SNV-LACN",
    lookupFound: "Model found",
    lookupNotFound: "No matching model. Check the spelling.",
    lookupMore: (count: number) => `${count} matches. Keep typing to narrow down.`,
    suggestions: "Matching models",
    dimensions: {
      connection: "Interface",
      gender: "End type",
      panel: "Mounting",
      valve: "Valve",
      shape: "Shape",
      material: "Material",
    },
    values: {
      gender: { "公端": "Male", "母端": "Female", Male: "Male", Female: "Female" },
      panel: { "穿板": "Panel mount", "非穿板": "Non-panel", "Panel mount": "Panel mount", "Non-panel": "Non-panel" },
      valve: { "带阀": "Valved", "不带阀": "Non-valved", Valved: "Valved", "Non-valved": "Non-valved" },
      shape: { "直通": "Straight", "L型": "Elbow", Straight: "Straight", Elbow: "Elbow" },
    },
    hint: "Dashed options have no model with the current combination. Choosing one adjusts the other options.",
    adjusted: "Adjusted: ",
    separator: ", ",
    result: "Selected model",
    model: "Model",
    specs: "Specifications",
    drawing: "View 2D drawing",
    drawingUnavailable: "Web drawing pending",
    note: "Use the selector to locate the detail page and prepare a model list. Confirm fluid compatibility, pressure and temperature against the model documentation.",
    cancel: "Back",
    confirm: "View model detail",
  },
} as const;

type Copy = (typeof copy)[keyof typeof copy];

function attributesOf(row: QuickConnectModelRow): Attributes {
  return {
    connection: row.connection,
    gender: row.gender,
    panel: row.panelMount,
    valve: row.valved,
    shape: row.shape,
    material: [row.housingMaterial, row.sealingRingMaterial].filter(Boolean).join("/"),
  };
}

function valueLabel(localeCopy: Copy, dimension: DimensionKey, value: string) {
  if (dimension === "gender" || dimension === "panel" || dimension === "valve" || dimension === "shape") {
    const labels = localeCopy.values[dimension] as Record<string, string>;
    return labels[value] ?? value;
  }
  return dimension === "material" ? value.replace("/", " / ") : value;
}

function sameExcept(a: Attributes, b: Attributes, skip: DimensionKey) {
  return DIMENSIONS.every(dimension => dimension === skip || a[dimension] === b[dimension]);
}

export default function QuickConnectModelSelector({
  open,
  series,
  rows,
  value,
  locale,
  onClose,
  onConfirm,
}: Props) {
  const localeCopy = copy[locale === "en" ? "en" : "zh"];
  const idPrefix = useId();
  const [choice, setChoice] = useState(value || rows[0]?.model || "");
  const [lookup, setLookup] = useState("");
  const [adjusted, setAdjusted] = useState<DimensionKey[]>([]);
  const dialogRef = useRef<HTMLElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (!open) return;
    // This state reset is tied to opening the modal and its external focus lock.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setChoice(value || rows[0]?.model || "");
    setLookup("");
    setAdjusted([]);
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
        if (event.defaultPrevented) return;
        event.preventDefault();
        onCloseRef.current();
        return;
      }
      if (event.key !== "Tab") return;
      const focusable = dialogRef.current?.querySelectorAll<HTMLElement>("button:not(:disabled), a[href], input");
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
  }, [open, rows, value]);

  const entries = useMemo<Entry[]>(
    () => rows.map(option => ({ option, attrs: attributesOf(option) })),
    [rows],
  );

  const dimensionValues = useMemo(() => {
    const result = {} as Record<DimensionKey, string[]>;
    DIMENSIONS.forEach(dimension => {
      result[dimension] = Array.from(new Set(entries.map(entry => entry.attrs[dimension]).filter(Boolean)));
    });
    return result;
  }, [entries]);

  const selected = entries.find(entry => entry.option.model === choice) || entries[0];
  if (!open || !selected) return null;

  const current = selected.attrs;
  const visibleDimensions = DIMENSIONS.filter(dimension => dimensionValues[dimension].length > 1);
  const normalizedLookup = lookup.trim().toUpperCase();
  const lookupHit = normalizedLookup ? entries.find(entry => entry.option.model.toUpperCase() === normalizedLookup) : undefined;
  const lookupMatches = normalizedLookup && !lookupHit
    ? entries.filter(entry => entry.option.model.toUpperCase().includes(normalizedLookup))
    : [];
  const shownMatches = lookupMatches.slice(0, MAX_LOOKUP_SUGGESTIONS);
  const lookupStatus = !normalizedLookup
    ? { text: "", tone: "neutral" as const }
    : lookupHit
      ? { text: localeCopy.lookupFound, tone: "found" as const }
      : !lookupMatches.length
        ? { text: localeCopy.lookupNotFound, tone: "error" as const }
        : lookupMatches.length > MAX_LOOKUP_SUGGESTIONS
          ? { text: localeCopy.lookupMore(lookupMatches.length), tone: "neutral" as const }
          : { text: "", tone: "neutral" as const };
  const specLine = DIMENSIONS.map(dimension => valueLabel(localeCopy, dimension, current[dimension])).join(" · ");

  function isAvailable(dimension: DimensionKey, candidate: string) {
    return entries.some(entry => entry.attrs[dimension] === candidate && sameExcept(entry.attrs, current, dimension));
  }

  function pick(dimension: DimensionKey, candidate: string) {
    if (current[dimension] === candidate) return;
    let best: Entry | undefined;
    let bestScore = -1;
    entries.forEach(entry => {
      if (entry.attrs[dimension] !== candidate) return;
      const score = DIMENSIONS.reduce(
        (sum, other) => other !== dimension && entry.attrs[other] === current[other] ? sum + DIMENSION_WEIGHT[other] : sum,
        0,
      );
      if (score > bestScore) {
        best = entry;
        bestScore = score;
      }
    });
    if (!best) return;
    setChoice(best.option.model);
    setAdjusted(DIMENSIONS.filter(other => other !== dimension && best!.attrs[other] !== current[other]));
    setLookup("");
  }

  function handleLookup(text: string) {
    setLookup(text);
    const normalized = text.trim().toUpperCase();
    const hit = entries.find(entry => entry.option.model.toUpperCase() === normalized);
    if (hit) {
      setChoice(hit.option.model);
      setAdjusted([]);
    }
  }

  const adjustedText = adjusted.length
    ? localeCopy.adjusted + adjusted
      .map(dimension => `${localeCopy.dimensions[dimension]} → ${valueLabel(localeCopy, dimension, current[dimension])}`)
      .join(localeCopy.separator)
    : "";

  return createPortal(
    fittingView(<div className={styles.overlay}>
      <section
        ref={dialogRef}
        className={styles.dialog}
        lang={locale}
        role="dialog"
        aria-modal="true"
        aria-labelledby={`${idPrefix}-title`}
        aria-describedby={`${idPrefix}-description`}
      >
        <header className={styles.header}>
          <div>
            <h2 id={`${idPrefix}-title`}>{localeCopy.title(series)}</h2>
            <p id={`${idPrefix}-description`}>{localeCopy.description}</p>
          </div>
          <button ref={closeRef} className={styles.close} type="button" aria-label={localeCopy.close} onClick={onClose}>×</button>
        </header>

        <div className={styles.body}>
          <div className={styles.baseStrip}>
            <div className={styles.baseThumb}>
              {selected.option.imagePath ? <img src={selected.option.imagePath} alt={selected.option.model} /> : null}
            </div>
            <div className={styles.baseText}>
              <span className={styles.eyebrow}>{localeCopy.current}</span>
              <strong className={styles.baseModel}>{selected.option.model}</strong>
              <p className={styles.baseMeta}>
                {localeCopy.count(rows.length)}
                <span className={styles.baseCode}>{localeCopy.code}: {selected.option.productCode || "—"}</span>
              </p>
            </div>
          </div>

          <div className={styles.columns}>
            <section className={styles.picker} aria-labelledby={`${idPrefix}-picker`}>
              <span className={styles.eyebrow}>{localeCopy.title(series)}</span>
              <h3 id={`${idPrefix}-picker`} className={styles.pickerTitle}>{localeCopy.heading}</h3>

              <div className={styles.rows}>
                {visibleDimensions.map(dimension => {
                  const labelId = `${idPrefix}-${dimension}`;
                  return (
                    <div key={dimension} className={styles.row} role="group" aria-labelledby={labelId}>
                      <span id={labelId} className={styles.rowLabel}>{localeCopy.dimensions[dimension]}</span>
                      <div className={styles.chips}>
                        {dimensionValues[dimension].map(candidate => {
                          const active = current[dimension] === candidate;
                          const available = active || isAvailable(dimension, candidate);
                          return (
                            <button
                              key={candidate}
                              type="button"
                              aria-pressed={active}
                              title={available ? undefined : localeCopy.hint}
                              className={active ? styles.chipActive : available ? styles.chip : styles.chipUnavailable}
                              onClick={() => pick(dimension, candidate)}
                            >
                              {valueLabel(localeCopy, dimension, candidate)}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>

              <p className={styles.adjusted} aria-live="polite" hidden={!adjustedText}>{adjustedText}</p>
              <p className={styles.hint}>{localeCopy.hint}</p>

              <div className={styles.lookup}>
                <label htmlFor={`${idPrefix}-lookup`}>{localeCopy.lookupLabel}</label>
                <input
                  id={`${idPrefix}-lookup`}
                  type="search"
                  value={lookup}
                  autoComplete="off"
                  spellCheck={false}
                  placeholder={localeCopy.lookupPlaceholder}
                  aria-describedby={`${idPrefix}-lookup-status`}
                  onChange={event => handleLookup(event.target.value)}
                  onKeyDown={event => {
                    if (event.key === "Enter" && lookupMatches.length) {
                      event.preventDefault();
                      handleLookup(lookupMatches[0].option.model);
                    } else if (event.key === "Escape" && lookup) {
                      event.preventDefault();
                      setLookup("");
                    }
                  }}
                />
                {shownMatches.length ? (
                  <div className={styles.suggestions} role="group" aria-label={localeCopy.suggestions}>
                    {shownMatches.map(entry => (
                      <button key={entry.option.model} type="button" className={styles.suggestion} onClick={() => handleLookup(entry.option.model)}>
                        {entry.option.model}
                      </button>
                    ))}
                  </div>
                ) : null}
                <p
                  id={`${idPrefix}-lookup-status`}
                  className={lookupStatus.tone === "error" ? styles.lookupStatusError : lookupStatus.tone === "found" ? styles.lookupStatusFound : styles.lookupStatus}
                  aria-live="polite"
                >
                  {lookupStatus.text}
                </p>
              </div>
            </section>

            <section className={styles.result} aria-labelledby={`${idPrefix}-result`} aria-live="polite">
              <span id={`${idPrefix}-result`} className={styles.eyebrow}>{localeCopy.result}</span>
              <figure className={styles.part}>
                {selected.option.imagePath ? <img src={selected.option.imagePath} alt={selected.option.model} /> : <div className={styles.partBlank} />}
                <figcaption>
                  <span className={styles.partRole}>{localeCopy.model}</span>
                  <span className={styles.partModelActive}>{selected.option.model}</span>
                </figcaption>
              </figure>
              <dl className={styles.details}>
                <div><dt>{localeCopy.model}</dt><dd>{selected.option.model}</dd></div>
                <div><dt>{localeCopy.code}</dt><dd>{selected.option.productCode || "—"}</dd></div>
                <div><dt>{localeCopy.specs}</dt><dd>{specLine}</dd></div>
              </dl>
              {selected.option.drawingHref ? (
                <a className={styles.drawing} href={selected.option.drawingHref} target="_blank" rel="noreferrer">{localeCopy.drawing} ↗</a>
              ) : (
                <span className={styles.unavailable}>{localeCopy.drawingUnavailable}</span>
              )}
            </section>
          </div>
        </div>

        <footer className={styles.footer}>
          <p>{localeCopy.note}</p>
          <div className={styles.actions}>
            <button type="button" className={styles.secondary} onClick={onClose}>{localeCopy.cancel}</button>
            <button type="button" className={styles.primary} onClick={() => onConfirm(selected.option.model)}>{localeCopy.confirm}</button>
          </div>
        </footer>
      </section>
    </div>, locale),
    document.body,
  );
}
