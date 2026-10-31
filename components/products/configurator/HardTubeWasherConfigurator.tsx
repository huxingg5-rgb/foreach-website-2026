"use client";

import { useEffect, useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { getHardTubeAccessory, hardTubeProductCodeText, describeHardTubeAccessory, formatTubeDiameters, type HardTubeAccessoryConfig, type HardTubeAccessoryChoice } from "@/data/products/configurator/hard-tube-accessories";
import { getHardTubeAccessoryCopy, getHardTubeAccessoryKindLabel, getHardTubeMaterialLabel, getHardTubeColorLabel, formatHardTubeCopy } from "@/data/products/configurator/hard-tube-accessories.intl";
import shared from "./product-variant-configurator.module.css";
import styles from "./HardTubeWasherConfigurator.module.css";

type Props = {
  config: HardTubeAccessoryConfig;
  value: HardTubeAccessoryChoice | null;
  onClose: () => void;
  onConfirm: (choice: HardTubeAccessoryChoice) => void;
  onAdd: (choice: HardTubeAccessoryChoice) => void;
  isAdded: (choice: HardTubeAccessoryChoice) => boolean;
};

// Mounted only while open, so reopening starts from the last confirmed choice.
export default function HardTubeWasherConfigurator({ config, value, onClose, onConfirm, onAdd, isAdded }: Props) {
  const [choice, setChoice] = useState<HardTubeAccessoryChoice | null>(value);
  const [copyStatus, setCopyStatus] = useState("");
  const dialogRef = useRef<HTMLElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const onCloseRef = useRef(onClose);
  const washer = getHardTubeAccessory(config, choice);
  const kind = config.accessoryKind;
  const locale = config.locale;
  const copy = getHardTubeAccessoryCopy(locale);
  const kindLabel = getHardTubeAccessoryKindLabel(kind, locale);
  const text = (template: string, values: Record<string, string | number> = {}) => formatHardTubeCopy(template, { kind: kindLabel, ...values });
  const accessoryCode = (item: NonNullable<typeof washer>) => hardTubeProductCodeText(item, copy.pendingCode);
  const accessoryDescription = (item: NonNullable<typeof washer>) => describeHardTubeAccessory(item, locale);
  const [tubeDiameter, setTubeDiameter] = useState(() => config.tubeOuterDiameters.find(diameter => getHardTubeAccessory(config, value)?.tubeOuterDiameters.includes(diameter)) ?? config.tubeOuterDiameters[0]);
  const availableAccessories = config.accessories.filter(item => item.tubeOuterDiameters.includes(tubeDiameter));
  const diameterLabel = formatTubeDiameters(config.tubeOuterDiameters);
  const withWasher = choice !== "none";
  const ready = choice === "none" || Boolean(washer);
  const added = ready && choice !== null && isAdded(choice);

  useEffect(() => { onCloseRef.current = onClose; }, [onClose]);
  useEffect(() => {
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    const backdrop = dialogRef.current?.parentElement;
    const background = Array.from(document.body.children)
      .filter((element): element is HTMLElement => element instanceof HTMLElement && element !== backdrop)
      .map(element => ({ element, inert: element.inert }));
    background.forEach(({ element }) => { element.inert = true; });
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") { event.preventDefault(); onCloseRef.current(); }
      if (event.key !== "Tab") return;
      const focusable = dialogRef.current?.querySelectorAll<HTMLElement>("button:not(:disabled), a[href]");
      if (!focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = previousOverflow;
      background.forEach(({ element, inert }) => { element.inert = inert; });
      previousFocus?.focus();
    };
  }, []);

  function select(next: HardTubeAccessoryChoice | null) {
    setChoice(next);
    setCopyStatus("");
  }

  function handleMaterialKey(event: ReactKeyboardEvent<HTMLButtonElement>, index: number) {
    let nextIndex = index;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") nextIndex = (index + 1) % availableAccessories.length;
    else if (event.key === "ArrowLeft" || event.key === "ArrowUp") nextIndex = (index + availableAccessories.length - 1) % availableAccessories.length;
    else if (event.key === "Home") nextIndex = 0;
    else if (event.key === "End") nextIndex = availableAccessories.length - 1;
    else return;
    event.preventDefault();
    select(availableAccessories[nextIndex].productCode);
    event.currentTarget.closest("fieldset")?.querySelectorAll<HTMLButtonElement>('[role="radio"]')[nextIndex]?.focus();
  }

  async function copySelection() {
    if (!ready) return;
    const selectionText = [
      `${copy.fitting}: ${config.model} · ${copy.code}: ${config.productCode} · ${config.material} · ${config.thread} · ${copy.tubeFit} ${diameterLabel}`,
      washer ? `${text(copy.paired)}: ${washer.model} · ${copy.code}: ${accessoryCode(washer)} · ${accessoryDescription(washer)}` : `${copy.fittingOnly} · ${text(copy.without)}`,
    ].join("\n");
    try {
      await navigator.clipboard.writeText(selectionText);
      setCopyStatus(copy.copied);
    } catch {
      setCopyStatus(copy.copyFailed);
    }
  }

  const optionClass = (active: boolean) => [shared.option, shared.single, active ? shared.active : ""].filter(Boolean).join(" ");

  return createPortal(
    <div className={`${shared.overlay} ${styles.overlay}`}>
      <section ref={dialogRef} className={`${shared.selector} ${styles.selector}`} lang={locale} role="dialog" aria-modal="true" aria-labelledby="hfl-washer-title" aria-describedby="hfl-washer-description">
        <header className={shared.header}>
          <div className={shared.headerText}>
            <h2 id="hfl-washer-title">{text(copy.title)}</h2>
            <p id="hfl-washer-description">{text(copy.description)}</p>
          </div>
          <button ref={closeRef} className={shared.closeButton} type="button" aria-label={copy.close} onClick={onClose}>×</button>
        </header>

        <div className={`${shared.main} ${styles.main}`}>
          <aside className={`${shared.summary} ${styles.summary}`}>
            <div className={shared.summaryTitle}>
              <span>{copy.current}</span>
              <strong>{config.model}</strong>
              <p className={styles.productName}>{config.productName}</p>
            </div>
            <div className={`${shared.summaryTable} ${styles.summaryTable}`}>
              {[[copy.code, config.productCode], [copy.thread, config.thread], [copy.tube, diameterLabel], [copy.bodyMaterial, config.material], [copy.bodyColor, config.color]].map(([label, text]) => (
                <div className={shared.summaryRow} key={label}><span>{label}</span><b>{text}</b></div>
              ))}
            </div>
            <div className={styles.washerSummary} aria-live="polite">
              <span className={styles.eyebrow}>{text(copy.paired)}</span>
              <strong>{washer?.model || (withWasher ? text(copy.chooseMaterial) : copy.fittingOnly)}</strong>
              <p>{washer ? `${accessoryDescription(washer)} · ${copy.code} ${accessoryCode(washer)}` : text(withWasher ? copy.chooseOne : copy.noneThisTime)}</p>
            </div>
          </aside>

          <section className={`${shared.config} ${styles.config}`}>
            <div className={shared.sectionHead}>
              <h3>{copy.configuration}</h3><span>{text(copy.compatibility, { thread: config.thread, diameters: diameterLabel })}</span>
            </div>
            <div className={styles.configBody}>
              <div className={`${styles.optionGrid} ${config.tubeOuterDiameters.length > 1 ? styles.optionGridWithTube : ""}`}>
                <fieldset className={shared.optionGroup}>
                  <legend>{copy.pairing}</legend>
                  <div className={styles.options}>
                    <button type="button" disabled={!config.accessories.length} className={optionClass(withWasher)} aria-pressed={withWasher} onClick={() => { if (!withWasher) select(null); }}><span className={shared.check} aria-hidden="true" /><span>{text(copy.withAccessory)}</span></button>
                    <button type="button" className={optionClass(!withWasher)} aria-pressed={!withWasher} onClick={() => select("none")}><span className={shared.check} aria-hidden="true" /><span>{copy.fittingOnly}</span></button>
                  </div>
                </fieldset>
                {config.tubeOuterDiameters.length > 1 && (
                  <fieldset className={`${shared.optionGroup} ${styles.tubeOptions}`}>
                    <legend>{copy.tube}</legend>
                    <div className={styles.options} role="radiogroup" aria-label={copy.tube}>
                      {config.tubeOuterDiameters.map(diameter => <button key={diameter} type="button" role="radio" aria-checked={tubeDiameter === diameter} className={optionClass(tubeDiameter === diameter)} onClick={() => {
                        setTubeDiameter(diameter);
                        if (choice !== "none") select(null);
                      }}><span className={shared.check} aria-hidden="true" />{diameter.toFixed(1)} mm</button>)}
                    </div>
                  </fieldset>
                )}
                <fieldset className={`${shared.optionGroup} ${styles.materialGroup}`} role="radiogroup" aria-label={text(copy.materialSingle)} disabled={!withWasher}>
                  <legend>{text(copy.materialSingle)}</legend>
                  <div className={styles.options}>
                    {availableAccessories.map((item, index) => (
                      <button key={item.productCode} type="button" role="radio" disabled={!withWasher} className={`${optionClass(choice === item.productCode)} ${styles.materialOption}`} aria-checked={choice === item.productCode} tabIndex={choice === item.productCode || (!washer && index === 0) ? 0 : -1} onClick={() => select(item.productCode)} onKeyDown={event => handleMaterialKey(event, index)}>
                        <span className={shared.check} aria-hidden="true" />
                        <span>{getHardTubeMaterialLabel(item.material, locale)}{kind === "卡箍" ? ` · ${getHardTubeColorLabel(item.color, locale)}` : ""}<small>{kind === "垫片" ? `${copy.thickness} ${item.thickness} mm` : text(copy.fitsTube, { diameters: `${tubeDiameter.toFixed(1)} mm` })}</small></span>
                      </button>
                    ))}
                  </div>
                </fieldset>
                <div className={styles.dimensions}>
                  <h4>{text(copy.specs)}</h4>
                  <dl>{kind === "垫片" ? <>
                    <div><dt>{copy.outer}</dt><dd>{washer ? `${washer.outerDiameter} mm` : "—"}</dd></div>
                    <div><dt>{copy.inner}</dt><dd>{washer ? `${washer.innerDiameter} mm` : "—"}</dd></div>
                    <div><dt>{copy.thickness}</dt><dd>{washer ? `${washer.thickness} mm` : "—"}</dd></div>
                  </> : <>
                    <div><dt>{copy.outer}</dt><dd>{washer?.outerDiameter ? `${washer.outerDiameter} mm` : "—"}</dd></div>
                    <div><dt>{copy.inner}</dt><dd>{washer?.innerDiameter ? `${washer.innerDiameter} mm` : "—"}</dd></div>
                    <div><dt>{copy.height}</dt><dd>{washer?.height ? `${washer.height} mm` : "—"}</dd></div>
                    <div><dt>{copy.tubeOd}</dt><dd>{washer ? formatTubeDiameters(washer.tubeOuterDiameters) : "—"}</dd></div>
                  </>}</dl>
                  <p>{copy.dimensionsNote}</p>
                </div>
              </div>

              <p className={styles.selectionNote}>{text(withWasher ? copy.selectionNote : copy.fittingOnlyNote)}</p>

              <div className={styles.result} aria-live="polite">
                <div className={styles.resultHeader}><span>{copy.selected}</span><button className={shared.copyButton} type="button" disabled={!ready} onClick={copySelection}>{copyStatus || copy.copy}</button></div>
                <div className={styles.resultRow}><span>{copy.fitting}</span><div><strong>{config.model}</strong><small>{copy.code} {config.productCode} · {config.material}</small></div></div>
                <div className={styles.resultRow}><span>{kindLabel}</span><div><strong className={!washer ? styles.pending : undefined}>{washer?.model || (withWasher ? text(copy.chooseMaterial) : copy.notIncluded)}</strong>{washer && <small>{copy.code} {accessoryCode(washer)} · {accessoryDescription(washer)}</small>}</div></div>
              </div>
            </div>
          </section>
        </div>

        <footer className={`${shared.footer} ${styles.footer}`}>
          <div className={`${shared.notice} ${styles.supportNotice}`}>{copy.supportBefore}<Link href={`${locale === "zh" ? "" : `/${locale}`}/contact/#form`}>{copy.contact}</Link>{text(copy.supportAfter)}</div>
          <div className={shared.actions}>
            <button className={`${shared.listButton} ${added ? shared.listButtonActive : ""}`} type="button" disabled={!ready || added} onClick={() => { if (ready && choice !== null) onAdd(choice); }}>{added ? copy.added : copy.add}</button>
            <button className={shared.primaryButton} type="button" disabled={!ready} onClick={() => { if (ready && choice !== null) onConfirm(choice); }}>{copy.confirm}</button>
          </div>
        </footer>
      </section>
    </div>, document.body,
  );
}
