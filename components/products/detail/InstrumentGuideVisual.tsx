import type { ReactNode } from "react";
import type { InstrumentProductGuide } from "@/data/products/detail/instrument-product-guides.zh";
import { instrumentVisualText, type InstrumentVisualTextKey } from "@/data/products/detail/instrument-guide-visual-copy";
import styles from "./InstrumentGuideVisual.module.css";

/** These manual-page images are replaced with native text, tables and functional diagrams. */
const replacedFigures = new Set([
  "sv10-structure.webp", "smtp2-adapter.webp", "smtp4-optocoupler.webp", "hmd-valve-paths.webp",
  "mrv3-controller.webp", "hp-flow-paths.webp", "abd-pinout.webp", "pdm5-pinout.webp",
  "drpl-working-cycle.webp", "drpl-dimensions-ports.webp", "drpl-motor-wiring.webp", "drpl-optocoupler-wiring.webp",
]);
export const isNativeInstrumentFigure = (file: string) => replacedFigures.has(file);

function Panel({ title, children }: { title: string; children: ReactNode }) {
  return <div className={styles.panel}><h3>{title}</h3>{children}</div>;
}

function PinTable({ title, labels, rows }: { title: string; labels: readonly string[]; rows: readonly (readonly string[])[] }) {
  return <div className={styles.tableWrap}>
    <table className={styles.table}>
      <caption>{title}</caption>
      <thead><tr>{labels.map(label => <th scope="col" key={label}>{label}</th>)}</tr></thead>
      <tbody>{rows.map(([pin, ...cells]) => <tr key={pin}><th scope="row">{pin}</th>{cells.map((cell, index) => <td key={index}>{cell}</td>)}</tr>)}</tbody>
    </table>
  </div>;
}

function HpPosition({ mode, title }: { mode: "home" | "working" | "vent"; title: string }) {
  const point = (degrees: number, radius = 68) => [120 + Math.cos(degrees * Math.PI / 180) * radius, 118 + Math.sin(degrees * Math.PI / 180) * radius];
  const arcs = mode === "home" ? [[60, 120], [-60, 0], [-180, -120]] : mode === "working" ? [[0, 60], [-120, -60], [120, 180]] : [];
  const end = point(0);
  const connection = mode === "home" ? "1 ↔ 2 · 3 ↔ 4 · 5 ↔ 6" : mode === "working" ? "1 ↔ 6 · 2 ↔ 3 · 4 ↔ 5" : "3 ↔ 7";
  const ink = "#000";
  return <div className={styles.position}>
    <h4>{title}</h4>
    <svg viewBox="0 0 240 240" role="img" aria-label={`${title}: ${connection}`} style={{ fill: ink }}>
      <circle cx="120" cy="118" r="94" fill="white" stroke="#bcbcbc" strokeWidth="2" />
      {arcs.map(([start, finish]) => { const a = point(start); const b = point(finish); return <path key={start} d={`M ${a.join(" ")} A 68 68 0 0 1 ${b.join(" ")}`} stroke={ink} strokeWidth="3" strokeLinecap="round" fill="none" />; })}
      {mode === "vent" && <path d={`M 120 118 L ${end.join(" ")}`} stroke={ink} strokeWidth="3" strokeLinecap="round" />}
      {[120, 60, 0, -60, -120, 180].map((degrees, index) => { const p = point(degrees); const label = point(degrees, 87); return <g key={index}>
        <circle cx={p[0]} cy={p[1]} r="7" fill="white" stroke={ink} strokeWidth="2" />
        <text x={label[0]} y={label[1]} textAnchor="middle" dominantBaseline="central">{index + 1}</text>
      </g>; })}
      <circle cx="120" cy="118" r="7" fill="white" stroke={ink} strokeWidth="2" />
      <text x="120" y="98" textAnchor="middle">7</text>
    </svg>
    <p className={styles.connectionLabel}>{connection}</p>
  </div>;
}

export default function InstrumentGuideVisual({ family, section, locale = "zh", model }: {
  family: InstrumentProductGuide["family"]; section: string; locale?: string; model: string;
}) {
  const t = (key: InstrumentVisualTextKey) => instrumentVisualText(locale, key);
  const labels = [t("pin"), t("signal")];
  let content: ReactNode = null;

  // SV10 port states are already complete in the section's selection table.
  // PS-122A-003_A02_cn pp. 3–4: material combinations and lead polarity.
  if (family === "sv10" && section === "materials") content = <>
    <div className={styles.tableWrap} tabIndex={0} role="region" aria-label={t("materials")}>
      <table className={`${styles.table} ${styles.materialTable}`}>
        <caption>{t("materials")}</caption>
        <thead><tr><th scope="col">{t("component")}</th>{["EPDM", "FKM", "FFKM"].map(material => <th scope="col" key={material}>{material}</th>)}</tr></thead>
        <tbody>
          <tr><th scope="row">{t("seat")}</th><td colSpan={3}>PVDF · PTFE · PMMA · POM · PEEK · PFA</td></tr>
          <tr><th scope="row">{t("oring")}</th><td>EPDM</td><td>FKM</td><td>FFKM</td></tr>
          <tr><th scope="row">{t("diaphragm")}</th><td>EPDM</td><td>FKM</td><td>FFKM</td></tr>
          <tr><th scope="row">{t("base")}</th><td colSpan={3}>PEEK · PFA</td></tr>
        </tbody>
      </table>
    </div><p className={styles.note}>{t("materialNote")}</p>
  </>;
  if (family === "sv10" && section === "electrical") content = <div className={styles.facts}>
    <p><strong>{t("leads")} · 300 mm</strong><span>{t("redPositive")} / {t("blackNegative")}</span></p>
  </div>;
  if (family === "sv10" && section === "installation") content = <p className={styles.note}>{t("mounting")}</p>;

  // PS-SMTP-011_A08_cn p. 4. This is the LTE045 example, not a scaled installation drawing.
  if (family === "smtp2" && section === "tips") content = <Panel title={t("adapterExample")}>
    <dl className={styles.definitions}>
      <div><dt>A · {t("adapter")}</dt><dd>45 mm</dd></div>
      <div><dt>B</dt><dd>{t("tip")}</dd></div>
      <div><dt>A + B</dt><dd>{t("total")}</dd></div>
    </dl><p className={styles.note}>{t("adapterNote")}</p>
  </Panel>;

  // PS-130A-003_002_cn p. 4. Two separate sides; no galvanic wire across the optical gap.
  if (family === "smtp4" && section === "control") content = <Panel title={t("opto")}>
    <dl className={styles.definitions}>
      <div><dt>{t("led")}</dt><dd>+24 V → Rf → A; K → GND</dd></div>
      <div><dt>{t("receiver")}</dt><dd>+24 V → RL → C / Output; E → GND</dd></div>
    </dl><p className={styles.note}>{t("resistor")}</p>
  </Panel>;

  // PS-SDRV-007_003_cn p. 6. HLD has a rotary valve and does not use these HMD examples.
  if (family === "syringe" && section === "valves" && model.startsWith("HMD")) content = <>
    <div className={styles.twoColumns}>{[2, 3].map(count => <PinTable key={count}
      title={count === 2 ? t("twoPorts") : t("threePorts")}
      labels={[t("command"), t("workingPorts")]}
      rows={[["I", "S ↔ IN"], ["O", "S ↔ OUT"], ...(count === 3 ? [["B", "S ↔ Bypass"]] : [])]} />)}
    </div><p className={styles.note}>{t("hmdNote")}</p>
  </>;

  // UM-120C-2411-00001_001_cn p. 7. Pin 8 is only named Output; do not invent an electrical function.
  if (family === "mrv3" && section === "control") content = <>
    <div className={styles.twoColumns}>
      <PinTable title={`J1 · ${t("pins")}`} labels={labels} rows={[["1", `VCC · 24 VDC · ${t("supply")}`], ["2", `GND · ${t("ground")}`]]} />
      <PinTable title={`J2 · ${t("pins")}`} labels={labels} rows={[["1", "RS485-A"], ["2", "RS485-B"], ["3", "RS485-A"], ["4", "RS485-B"], ["5", "RS232-RX"], ["6", "RS232-TX"], ["7", "GND"], ["8", t("mrvOutput")]]} />
    </div><p className={styles.note}>{t("schematic")}</p>
  </>;

  // PS-120C-2604-00001_A02_cn p. 5: stator-face view, original three groove positions.
  if (family === "hp" && section === "paths") content = <>
    <div className={styles.positions}>
      <HpPosition mode="home" title={t("hpInject")} />
      <HpPosition mode="working" title={t("hpLoad")} />
      <HpPosition mode="vent" title={t("hpVent")} />
    </div>
    <p className={styles.note}>{t("hpFlowNote")}</p>
  </>;

  // PS-110B-2407-00002_A01_cn p. 3. Dimensions remain in the product's 2D viewer.
  if (family === "abd" && section === "wiring") content = <>
    <PinTable title={`S6B-ZR-SM4A-TF · ${t("pins")}`} labels={labels} rows={[
      ["1", `+5 VDC · ${t("supply")}`], ["2", `GND · ${t("ground")}`], ["3", `0–5 V · ${t("analog")}`],
      ["4", "Rx · TTL"], ["5", "Tx · TTL"], ["6", t("alarm")],
    ]} /><p className={styles.note}>{t("abdLimit")}</p><p className={styles.note}>{t("schematic")}</p>
  </>;

  // PS-110B-2508-00001_A02_cn p. 4. Logical pin list, not an inferred physical connector orientation.
  if (family === "pdm5" && section === "wiring") content = <>
    <PinTable title={`PDM5 · ${t("pins")}`} labels={labels} rows={[
      ["1", `VCC · ${t("supply")}`], ["2", `GND · ${t("ground")}`], ["3", `GND · ${t("ground")}`],
      ["4", `SCLK · ${t("clock")}`], ["5", `SDA · ${t("data")}`], ["6", t("unused")],
    ]} /><p className={styles.note}>{t("schematic")}</p>
  </>;

  // RD-121B-0048_001_cn pp. 3–6: replace raster instructions, retain actual product photographs.
  if (family === "drpl" && section === "principle") content = <Panel title={t("cycle")}>
    <ol className={styles.cycle}>{([ ["aspiration", "inletOpen"], ["aspirationEnd", "rotateOut"], ["discharge", "outletOpen"], ["dischargeEnd", "nextCycle"] ] as const).map(([title, body]) =>
      <li key={title}><strong>{t(title)}</strong><span>{t(body)}</span></li>)}
    </ol>
  </Panel>;
  if (family === "drpl" && section === "materials") content = <>
    <div className={styles.twoColumns}>{["A", "B"].map(head => <Panel key={head} title={`DRPL · ${head}`}>
      <div className={styles.portRow}><span>{t("workingPorts")}</span><strong>I{head} / O{head}</strong><span>{head === "A" ? "1/4-28 UNF-2B" : "G1/8"}</span></div>
      <div className={styles.portRow}><span>{t("rinsePorts")}</span><strong>RI{head} / RO{head}</strong><span>1/4-28 UNF-2B</span></div>
    </Panel>)}</div><p className={styles.note}>{t("portNote")}</p>
  </>;
  if (family === "drpl" && section === "control") content = <div className={styles.twoColumns}>
    <div><PinTable title={`${t("windings")} · JST S6B-PH-K-S`} labels={[t("pins"), t("wire")]} rows={[
      ["A / C", `${t("red")} / ${t("green")}`], ["B / D", `${t("yellow")} / ${t("blue")}`],
    ]} /><p className={styles.note}>{t("schematic")}</p></div>
    <div><PinTable title={t("opto")} labels={[t("wire"), t("signal")]} rows={[
      [t("brown"), "5–24 VDC ±10%"], [t("blue"), "0 V"], [t("black"), t("lightOn")], [t("white"), t("darkOn")],
    ]} /><p className={styles.note}>{t("insulate")}</p></div>
  </div>;

  return content ? <div className={styles.visual} data-instrument-native-visual={`${family}-${section}`}>{content}</div> : null;
}
