"use client";

import { fittingView } from "@/components/products/detail/fitting-view";
import { Fragment, useEffect, useId, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { QuickConnectPairConfig, QuickConnectPairOption } from "@/data/products/configurator/quick-connect-pairing";
import ConfiguratorButton from "./ConfiguratorButton";
import ConfiguratorDialogFrame from "./ConfiguratorDialogFrame";
import styles from "./QuickConnectPairSelector.module.css";

/**
 * Attribute-based Q20/Q40/Q60 mating selector.
 *
 * Replaces the long scrolling card list of QuickConnectPairConfigurator: every
 * published opposite-gender end is a unique combination of interface, mounting,
 * valve, shape and material, so the visitor picks those five attributes and
 * the model resolves itself. The old component is kept untouched for rollback.
 */

type Props = {
  locale?: string;
  open: boolean;
  config: QuickConnectPairConfig;
  presentation?: "standard" | "compact";
  value: string | null;
  lastPairModel?: string | null;
  onClose: () => void;
  onConfirm: (model: string) => void;
  onAdd: (model: string) => void;
  isAdded: (model: string) => boolean;
};

type DimensionKey = "tube" | "panel" | "valve" | "shape" | "material";
type Attributes = Record<DimensionKey, string>;
type Entry = { option: QuickConnectPairOption; attrs: Attributes };

const DIMENSIONS: DimensionKey[] = ["tube", "panel", "valve", "shape", "material"];

// When a chip forces other attributes to change, earlier dimensions are kept first.
const DIMENSION_WEIGHT: Record<DimensionKey, number> = { tube: 16, panel: 8, valve: 4, shape: 2, material: 1 };

// Model code: Q{series}{tube/thread}-[PS]{M|N}{V|X}-{S|L}{housing}{seal}.
const MODEL_PATTERN = /^Q(?:20|40|60)[0-9A-Z]+-[PS]([MN])([VX])-([SL])/;

// Model lookup shows a short in-dialog suggestion list instead of the native <datalist> popup.
const MAX_LOOKUP_SUGGESTIONS = 6;

const copy = {
  zh: {
    title: "Q20 公母端配对选型",
    description: "按管径、安装方式、阀门、形状和材质逐项选择母端，型号自动确定；公母两端可以按设备两侧分别选择。",
    close: "关闭配对选型",
    base: "当前公端",
    code: "商品编码",
    mate: "选择母端",
    heading: "按规格选择",
    lookupLabel: "已知型号？直接输入定位",
    lookupPlaceholder: "例如 Q2002-SNV-LACN",
    lookupFound: "已定位到该型号",
    lookupNotFound: "没有找到这个型号，请检查拼写",
    lookupMore: (count: number) => `共 ${count} 个匹配，继续输入可缩小范围`,
    suggestions: "匹配的型号",
    dimensions: { tube: "管径", panel: "安装", valve: "阀门", shape: "形状", material: "材质" },
    values: {
      panel: { M: "穿板", N: "非穿板" },
      valve: { V: "带阀", X: "不带阀" },
      shape: { S: "直通", L: "L型" },
    },
    unavailableTitle: "当前组合没有这个选项，点击后会自动调整其他项",
    hint: "虚线选项在当前组合下没有对应型号，点击后会自动调整其他项。",
    adjusted: "已自动调整：",
    separator: "，",
    result: "配对结果",
    male: "公端",
    female: "母端",
    femaleModel: "母端型号",
    specs: "规格",
    drawing: "查看母端图纸",
    drawingUnavailable: "该母端网页图纸待补充",
    note: "配对组合用于页面选型和清单整理；实际介质兼容性、压力和温度请按两端材料与工况确认。",
    add: "加入配对清单",
    added: "已加入清单",
    confirm: "确认配对",
  },
  en: {
    title: "Q20 male/female mating selector",
    description: "Pick the female end by tube size, mounting, valve, shape and material; the model resolves automatically. Each side of the equipment can use different specs.",
    close: "Close mating selector",
    base: "Current male end",
    code: "Product code",
    mate: "Select female end",
    heading: "Choose by specification",
    lookupLabel: "Know the model? Type it to jump",
    lookupPlaceholder: "e.g. Q2002-SNV-LACN",
    lookupFound: "Model found",
    lookupNotFound: "No matching model. Check the spelling.",
    lookupMore: (count: number) => `${count} matches. Keep typing to narrow down.`,
    suggestions: "Matching models",
    dimensions: { tube: "Tube", panel: "Mounting", valve: "Valve", shape: "Shape", material: "Material" },
    values: {
      panel: { M: "Panel mount", N: "Non-panel" },
      valve: { V: "Valved", X: "Non-valved" },
      shape: { S: "Straight", L: "Elbow" },
    },
    unavailableTitle: "Not available with the current combination; other options will adjust",
    hint: "Dashed options have no model with the current combination. Choosing one adjusts the other options.",
    adjusted: "Adjusted: ",
    separator: ", ",
    result: "Pair result",
    male: "Male",
    female: "Female",
    femaleModel: "Female model",
    specs: "Specifications",
    drawing: "View female drawing",
    drawingUnavailable: "Web drawing pending",
    note: "The pairing supports page selection and inquiry-list preparation. Confirm fluid compatibility, pressure and temperature for both material sets before use.",
    add: "Add pair to list",
    added: "Added to list",
    confirm: "Confirm pair",
  },
} as const;

type Copy = (typeof copy)[keyof typeof copy];

function attributesOf(option: QuickConnectPairOption): Attributes {
  const match = option.model.trim().toUpperCase().match(MODEL_PATTERN);
  return {
    tube: option.tubeOrThread,
    panel: match?.[1] ?? (option.panelMount === "穿板" ? "M" : "N"),
    valve: match?.[2] ?? (option.valved === "带阀" ? "V" : "X"),
    shape: match?.[3] ?? "S",
    material: `${option.housingMaterial}/${option.sealingRingMaterial}`,
  };
}

function valueLabel(localeCopy: Pick<Copy, "values">, dimension: DimensionKey, value: string) {
  if (dimension === "panel" || dimension === "valve" || dimension === "shape") {
    const labels = localeCopy.values[dimension] as Record<string, string>;
    return labels[value] ?? value;
  }
  if (dimension === "material") return value.replace("/", " / ");
  return value;
}

function sameExcept(a: Attributes, b: Attributes, skip: DimensionKey) {
  return DIMENSIONS.every(dimension => dimension === skip || a[dimension] === b[dimension]);
}

export default function QuickConnectPairSelector({
  locale = "zh",
  open,
  config,
  presentation = "standard",
  value,
  lastPairModel,
  onClose,
  onConfirm,
  onAdd,
  isAdded,
}: Props) {
  const isCompact = presentation === "compact";
  const originalCopy = copy[config.locale];
  const isChinese = config.locale === "zh";
  const canSelectSingle = isCompact;
  const [singleOnly, setSingleOnly] = useState(canSelectSingle && value === "none");
  const baseRole = config.baseGender === "P" ? (isChinese ? "公端" : "male end") : (isChinese ? "母端" : "female end");
  const mateRole = config.baseGender === "P" ? (isChinese ? "母端" : "female end") : (isChinese ? "公端" : "male end");
  const localeCopy = {
    ...originalCopy,
    note: isCompact && isChinese
      ? "未找到合适型号？部分规格资料可能尚未展示，可联系我们确认适配型号及供货情况。"
      : originalCopy.note,
    dimensions: config.showModelGuidance ? { ...originalCopy.dimensions, tube: "管径 / 螺纹" } : originalCopy.dimensions,
    title: singleOnly ? `${config.series} 接头选型` : isChinese ? `${config.series} 公母端配对选型` : `${config.series} male/female mating selector`,
    description: singleOnly
      ? "确认选型后，可在「产品资料」中点击「3D 模型」，查看当前接头及尺寸。"
      : isCompact && isChinese
      ? "确认配对后，可在「产品资料」中点击「3D 模型」，查看公母端组合效果及尺寸。"
      : config.showModelGuidance ? `保留当前${baseRole}，选择同系列 ${config.series} ${mateRole}。两侧管径或螺纹分别选择，断开状态与安装要求随组合更新。` : isChinese ? `按管径、安装方式、阀门、形状和材质逐项选择${mateRole}，型号自动确定；公母两端可按设备两侧分别选择。` : `Choose the ${mateRole} by tube size, mounting, valve, shape and material. Both ends belong to ${config.series}.`,
    base: isChinese ? `当前${baseRole}` : `Current ${baseRole}`,
    mate: isChinese ? `选择${mateRole}` : `Select ${mateRole}`,
    male: isChinese ? baseRole : baseRole === "male end" ? "Male" : "Female",
    female: isChinese ? mateRole : mateRole === "male end" ? "Male" : "Female",
    femaleModel: isChinese ? `${mateRole}型号` : `Mating ${mateRole} model`,
    drawing: isChinese ? `查看${mateRole}图纸` : `View ${mateRole} drawing`,
    drawingUnavailable: isChinese ? `该${mateRole}网页图纸待补充` : `Drawing pending for this ${mateRole}`,
    lookupPlaceholder: config.options[0]?.model || originalCopy.lookupPlaceholder,
  };
  const idPrefix = useId();
  const [choice, setChoice] = useState(value && value !== "none" ? value : lastPairModel || config.defaultModel);
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
    setChoice(previous => value === "none" ? previous : value || config.defaultModel);
    setSingleOnly(canSelectSingle && value === "none");
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
        // Escape inside a filled model lookup clears the lookup instead of closing the dialog.
        // The lookup's own handler may run first and call preventDefault, so honour that too.
        if (event.defaultPrevented) return;
        if (event.target instanceof HTMLInputElement && event.target.type === "search" && event.target.value) return;
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
  }, [canSelectSingle, config.defaultModel, open, value]);

  const entries = useMemo<Entry[]>(
    () => config.options.map(option => ({ option, attrs: attributesOf(option) })),
    [config.options],
  );

  // Values per dimension in data order; dimensions with a single value are not shown.
  const dimensionValues = useMemo(() => {
    const result = {} as Record<DimensionKey, string[]>;
    DIMENSIONS.forEach(dimension => {
      result[dimension] = Array.from(new Set(entries.map(entry => entry.attrs[dimension])));
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
  // "none" is an explicit single fitting, distinct from an unconfirmed pairing.
  const selection = singleOnly ? "none" : selected.option.model;
  const added = isAdded(selection);

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
        (sum, other) => (other !== dimension && entry.attrs[other] === current[other] ? sum + DIMENSION_WEIGHT[other] : sum),
        0,
      );
      if (score > bestScore) {
        best = entry;
        bestScore = score;
      }
    });
    if (!best) return;
    const next = best;
    setChoice(next.option.model);
    setAdjusted(DIMENSIONS.filter(other => other !== dimension && next.attrs[other] !== current[other]));
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

  const body = (
    <div className={styles.body} data-quick-connect-selection-mode={singleOnly ? "single" : "pair"}>
      {!isCompact ? <div className={styles.baseStrip}>
        <div className={styles.baseThumb}>
          {config.baseImagePath ? <img src={config.baseImagePath} alt={config.baseModel} /> : null}
        </div>
        <div className={styles.baseText}>
          <span className={styles.eyebrow}>{localeCopy.base}</span>
          <strong className={styles.baseModel}>{config.baseModel}</strong>
          <p className={styles.baseMeta}>
            {config.baseDescription}
            <span className={styles.baseCode}>{localeCopy.code}：{config.baseProductCode || "—"}</span>
          </p>
        </div>
      </div> : null}

      {canSelectSingle && <div className={styles.selectionMode} role="group" aria-label="选型方式">
        <span className={styles.rowLabel}>选型方式</span>
        <div className={styles.chips}>
          <button type="button" className={singleOnly ? styles.chip : styles.chipActive} aria-pressed={!singleOnly} onClick={() => setSingleOnly(false)}>公母端配对</button>
          <button type="button" className={singleOnly ? styles.chipActive : styles.chip} aria-pressed={singleOnly} onClick={() => setSingleOnly(true)}>仅选当前接头</button>
        </div>
      </div>}

      <div className={styles.columns}>
        <section className={styles.picker} aria-labelledby={`${idPrefix}-picker`}>
          <span id={isCompact ? `${idPrefix}-picker` : undefined} className={styles.eyebrow}>{singleOnly ? "当前接头" : localeCopy.mate}</span>
          {!isCompact ? <h3 id={`${idPrefix}-picker`} className={styles.pickerTitle}>{localeCopy.heading}</h3> : null}

          {singleOnly ? <div className={styles.singleChoice}>
            <p>{config.baseModel}</p>
            <p>仅选择当前型号，不包含配套{mateRole}。</p>
          </div> : <>
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
                          title={available ? undefined : localeCopy.unavailableTitle}
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
          {!isCompact && config.showModelGuidance && <p className={styles.hint}>mm 表示软管内径；NPT 表示设备螺纹接口。配合端无需与当前端使用相同的管路接口。</p>}

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
                  <button
                    key={entry.option.model}
                    type="button"
                    className={styles.suggestion}
                    onClick={() => handleLookup(entry.option.model)}
                  >
                    {entry.option.model}
                  </button>
                ))}
              </div>
            ) : null}
            <p
              id={`${idPrefix}-lookup-status`}
              className={
                lookupStatus.tone === "error"
                  ? styles.lookupStatusError
                  : lookupStatus.tone === "found"
                    ? styles.lookupStatusFound
                    : styles.lookupStatus
              }
              aria-live="polite"
            >
              {lookupStatus.text}
            </p>
          </div>
          </>}
        </section>

        <section className={styles.result} aria-labelledby={`${idPrefix}-result`} aria-live="polite">
          <span id={`${idPrefix}-result`} className={styles.eyebrow}>{singleOnly ? "选型结果" : localeCopy.result}</span>
          <div className={`${styles.pair} ${singleOnly ? styles.singlePart : ""}`}>
            {(["P", "S"] as const).filter(gender => !singleOnly || gender === config.baseGender).map((gender, index) => {
              const isBase = config.baseGender === gender;
              const model = isBase ? config.baseModel : selected.option.model;
              const image = isBase ? config.baseImagePath : selected.option.imagePath;
              return <Fragment key={gender}>{index === 1 && !isCompact ? <span className={styles.joiner} aria-hidden="true">↔</span> : null}
              <figure className={styles.part}>
                {image ? <img className={gender === "P" ? styles.mirror : undefined} src={image} alt={config.showModelGuidance ? `${model} ${gender === "P" ? "公端" : "母端"}` : ""} /> : <div className={styles.partBlank} />}
                <figcaption><span className={styles.partRole}>{gender === "P" ? originalCopy.male : originalCopy.female}</span><span className={isBase ? styles.partModel : styles.partModelActive}>{model}</span></figcaption>
              </figure></Fragment>;
            })}
          </div>
          <dl className={styles.details}>
            <div><dt>{singleOnly ? "接头型号" : localeCopy.femaleModel}</dt><dd>{singleOnly ? config.baseModel : selected.option.model}</dd></div>
            <div><dt>{localeCopy.code}</dt><dd>{(singleOnly ? config.baseProductCode : selected.option.productCode) || "—"}</dd></div>
            {!isCompact ? <div><dt>{localeCopy.specs}</dt><dd>{specLine}</dd></div> : null}
            {!isCompact && config.showModelGuidance && <>
              <div data-quick-connect-pair-state="true"><dt>断开状态</dt><dd>{selected.option.valvePair}</dd></div>
              <div><dt>当前端安装</dt><dd>{config.baseInstallation}</dd></div>
              <div><dt>配合端安装</dt><dd>{selected.option.installation}</dd></div>
            </>}
          </dl>
          {!isCompact ? selected.option.drawingHref ? (
            <a className={styles.drawing} href={selected.option.drawingHref} target="_blank" rel="noreferrer">{localeCopy.drawing} ↗</a>
          ) : (
            <span className={styles.unavailable}>{localeCopy.drawingUnavailable}</span>
          ) : null}
        </section>
      </div>
    </div>
  );

  if (isCompact) {
    return (
      fittingView(<ConfiguratorDialogFrame
        dialogRef={dialogRef}
        closeRef={closeRef}
        locale={locale}
        className={styles.compact}
        titleId={`${idPrefix}-title`}
        descriptionId={`${idPrefix}-description`}
        title={localeCopy.title}
        description={localeCopy.description}
        closeLabel={localeCopy.close}
        onClose={onClose}
        notice={localeCopy.note}
        actions={<>
          <ConfiguratorButton variant="secondary" active={added} disabled={added} onClick={() => onAdd(selection)}>
            {added ? localeCopy.added : singleOnly ? "加入清单" : localeCopy.add}
          </ConfiguratorButton>
          <ConfiguratorButton variant="primary" onClick={() => onConfirm(selection)}>{singleOnly ? "确认选型" : localeCopy.confirm}</ConfiguratorButton>
        </>}
      >
        {body}
      </ConfiguratorDialogFrame>, locale)
    );
  }

  return createPortal(
    fittingView(<div className={styles.overlay}>
      <section
        ref={dialogRef}
        className={styles.dialog}
        lang={config.locale}
        role="dialog"
        aria-modal="true"
        aria-labelledby={`${idPrefix}-title`}
        aria-describedby={`${idPrefix}-description`}
      >
        <header className={styles.header}>
          <div>
            <h2 id={`${idPrefix}-title`}>{localeCopy.title}</h2>
            <p id={`${idPrefix}-description`}>{localeCopy.description}</p>
          </div>
          <button ref={closeRef} className={styles.close} type="button" aria-label={localeCopy.close} onClick={onClose}>×</button>
        </header>
        {body}
        <footer className={styles.footer}>
          <p>{localeCopy.note}</p>
          <div className={styles.actions}>
            <button type="button" className={styles.secondary} disabled={added} onClick={() => onAdd(selected.option.model)}>
              {added ? localeCopy.added : localeCopy.add}
            </button>
            <button type="button" className={styles.primary} onClick={() => onConfirm(selected.option.model)}>{localeCopy.confirm}</button>
          </div>
        </footer>
      </section>
    </div>, locale),
    document.body,
  );
}
