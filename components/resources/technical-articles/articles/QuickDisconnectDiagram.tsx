import Link from "next/link";
import type { TechnicalArticleLocale } from "@/data/resources/technical-articles/technical-articles.types";
import { quickDisconnectDiagramCopy } from "@/data/resources/technical-articles/quick-disconnect-fitting-locales/diagrams";
import styles from "./QuickDisconnectDiagram.module.css";

const imageRoot = "/images/products/fittings/quick-connect-fittings/products/";
const productRoot = "/products/fittings/quick-connect-fittings/";

function ValveComparison({ copy }: { copy: typeof quickDisconnectDiagramCopy.en }) {
  return <svg className={styles.diagram} viewBox="0 0 1000 1120" role="img" aria-labelledby="quick-valves-title quick-valves-description">
    <title id="quick-valves-title">{copy.valvesTitle}</title>
    <desc id="quick-valves-description">{copy.valvesDescription}</desc>
    <text className={styles.heading} x="250" y="32" textAnchor="middle">{copy.nonValved}</text>
    <text className={styles.model} x="250" y="66" textAnchor="middle">Q2001-SMX-SPPE</text>
    <text className={styles.heading} x="750" y="32" textAnchor="middle">{copy.valved}</text>
    <text className={styles.model} x="750" y="66" textAnchor="middle">Q2001-SMV-SPPE</text>
    <svg x="135" y="80" width="220" height="184" viewBox="0 0 480 400">
      <image href={`${imageRoot}q2001-smx-sppe-main.webp`} width="800" height="800" />
    </svg>
    <svg x="635" y="80" width="220" height="184" viewBox="0 0 480 400">
      <image href={`${imageRoot}q2001-smv-sppe-main.webp`} width="800" height="800" />
    </svg>
    <circle cx="258" cy="169" r="18" fill="none" stroke="#203d72" strokeWidth="2" />
    <circle cx="758" cy="169" r="18" fill="none" stroke="#203d72" strokeWidth="2" />
    <path className={styles.leader} d="M258 187 L420 225 V263 H280 M758 187 L920 225 V263 H780" />
    <text className={styles.label} x="250" y="290" textAnchor="middle">{copy.openDetail}</text>
    <text className={styles.label} x="750" y="290" textAnchor="middle">{copy.closedDetail}</text>
    <path d="M30 320 H970" stroke="#d9d9d9" />
    <text className={styles.heading} x="500" y="362" textAnchor="middle">{copy.statesTitle}</text>
    <text className={styles.label} x="375" y="400" textAnchor="middle">{copy.male}</text>
    <text className={styles.label} x="650" y="400" textAnchor="middle">{copy.female}</text>
    {[
      { y: 420, label: `${copy.connected}: V + V`, maleValved: true, femaleValved: true, femaleModel: "Q2001-SMV-SPPE", femaleShape: copy.shapes[0], connected: true, state: copy.states[0] },
      { y: 580, label: `${copy.disconnected}: X + X`, maleValved: false, femaleValved: false, femaleModel: "Q2002-SNX-SPPE", femaleShape: copy.shapes[1], connected: false, state: copy.states[1] },
      { y: 740, label: `${copy.disconnected}: X + V`, maleValved: false, femaleValved: true, femaleModel: "Q2004-SNV-LPPE", femaleShape: copy.shapes[2], connected: false, state: copy.states[2] },
      { y: 900, label: `${copy.disconnected}: V + V`, maleValved: true, femaleValved: true, femaleModel: "Q2018N-SNV-SPPE", femaleShape: copy.shapes[3], connected: false, state: copy.states[3] },
    ].map(({ y, label, maleValved, femaleValved, femaleModel, femaleShape, connected, state }) => {
      const maleModel = maleValved ? "Q2001-PNV-SPPE" : "Q2001-PNX-SPPE";
      const maleClosed = maleValved && !connected;
      const femaleClosed = femaleValved && !connected;
      return <g key={label}>
        <text className={styles.label} x="30" y={y + 64}>{label}</text>
        <svg x="285" y={y + 15} width="180" height="90" viewBox="0 400 800 400">
          <image href={`${imageRoot}${maleModel.toLowerCase()}-main.webp`} width="800" height="800" transform="translate(800 0) scale(-1 1)" />
        </svg>
        <svg x="590" y={y} width="120" height="120" viewBox="0 0 800 800">
          <image href={`${imageRoot}${femaleModel.toLowerCase()}-main.webp`} width="800" height="800" />
        </svg>
        <text className={styles.sku} x="375" y={y + 138} textAnchor="middle">{maleModel}</text>
        <text className={styles.sku} x="650" y={y + 138} textAnchor="middle">{femaleModel}</text>
        {connected && <text className={styles.small} x="512" y={y + 64} textAnchor="middle">{copy.join}</text>}
        <path d={connected
          ? `M285 ${y + 151} H740`
          : `M285 ${y + 151} H465 M560 ${y + 151} H740`} stroke="#203d72" strokeWidth="3" />
        {maleClosed && <path d={`M465 ${y + 144} V${y + 158}`} stroke="#a74936" strokeWidth="5" />}
        {femaleClosed && <path d={`M560 ${y + 144} V${y + 158}`} stroke="#a74936" strokeWidth="5" />}
        <text className={styles.label} x="790" y={y + 64}>{state}</text>
        <text className={styles.model} x="790" y={y + 94}>{femaleShape}</text>
      </g>;
    })}
    {copy.valveNote.map((line, index) => <text className={styles.small} key={line} x="500" y={1100 - (copy.valveNote.length - 1 - index) * 24} textAnchor="middle">{line}</text>)}
  </svg>;
}

// Original product images are displayed through SVG viewports; no replacement geometry
// is used for the product views. The panel section below is a separate assembly schematic.
export default function QuickDisconnectDiagram({ kind, locale = "zh-CN" }: { kind: "pair" | "valves" | "panel"; locale?: TechnicalArticleLocale }) {
  const copy = quickDisconnectDiagramCopy[locale];
  const localizedProductRoot = `${locale === "zh-CN" ? "" : `/${locale}`}${productRoot}`;
  return <div data-quick-disconnect-diagram={kind} className={locale === "zh-CN" ? undefined : styles.translated}>
    <span className={styles.hint}>{copy.hint}</span>
    <div className={styles.scroll} tabIndex={0} role="region" aria-label={`${copy.regions[kind]}. ${copy.hint}`}>
      {kind === "valves" ? <ValveComparison copy={copy} /> : kind === "pair" ? <svg className={styles.diagram} viewBox="0 0 1000 470" role="img" aria-labelledby="quick-pair-title quick-pair-description">
        <title id="quick-pair-title">{copy.pairTitle}</title>
        <desc id="quick-pair-description">{copy.pairDescription}</desc>
        <defs><marker id="quick-pair-arrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8" fill="none" stroke="#203d72" /></marker></defs>
        <text className={styles.heading} x="230" y="42" textAnchor="middle">{copy.maleHeading}</text>
        <text className={styles.model} x="230" y="76" textAnchor="middle">Q2001-PNV-SPPE · {copy.nonPanel}</text>
        <text className={styles.heading} x="770" y="42" textAnchor="middle">{copy.femaleHeading}</text>
        <text className={styles.model} x="770" y="76" textAnchor="middle">Q2001-SMV-SPPE · {copy.panel}</text>
        <svg x="30" y="130" width="400" height="200" viewBox="0 400 800 400">
          <image href={`${imageRoot}q2001-pnv-sppe-main.webp`} width="800" height="800" transform="translate(800 0) scale(-1 1)" />
        </svg>
        <svg x="570" y="130" width="400" height="200" viewBox="0 400 800 400">
          <image href={`${imageRoot}q2001-smv-sppe-main.webp`} width="800" height="800" />
        </svg>
        <path className={styles.dimension} d="M450 230 H548" markerEnd="url(#quick-pair-arrow)" />
        <text className={styles.label} x="500" y="195" textAnchor="middle">{copy.align}</text>
        <path className={styles.leader} d="M70 232 V355 H40 M410 240 V395 H310 M607 228 V395 H685 M664 272 L730 355 H915 M377 205 V112 H315" />
        <text className={styles.label} x="40" y="383">{copy.tubeEnd}</text>
        <text className={styles.label} x="310" y="425">{copy.insert}</text>
        <text className={styles.label} x="610" y="425">{copy.socket}</text>
        <text className={styles.label} x="740" y="383">{copy.latch}</text>
        <text className={styles.label} x="240" y="100">{copy.seal}</text>
        <text className={styles.label} x="845" y="118">{copy.tubeEnd}</text>
        <path className={styles.leader} d="M935 130 V215" />
      </svg> : <svg className={styles.diagram} viewBox="0 0 1000 680" role="img" aria-labelledby="quick-panel-title quick-panel-description">
        <title id="quick-panel-title">{copy.panelTitle}</title>
        <desc id="quick-panel-description">{copy.panelDescription}</desc>
        <text className={styles.heading} x="500" y="34" textAnchor="middle">{copy.panelHeading}</text>
        <svg x="200" y="65" width="600" height="300" viewBox="0 400 800 400">
          <image href={`${imageRoot}q2001-smv-sppe-main.webp`} width="800" height="800" />
        </svg>
        <path className={styles.leader} d="M65 170 H225 L245 200 M720 83 H860 V140 M605 210 L720 83 M490 200 L715 323 H905" />
        <text className={styles.label} x="25" y="150">{copy.insertHere}</text>
        <text className={styles.label} x="720" y="65">{copy.mountingThread}</text>
        <text className={styles.label} x="720" y="350">{copy.nut}</text>
        <path d="M30 385 H970" stroke="#d9d9d9" />
        <text className={styles.label} x="120" y="425">{copy.outside}</text>
        <text className={styles.label} x="650" y="425">{copy.inside}</text>
        <rect x="450" y="445" width="85" height="155" fill="#dae3ed" stroke="#203d72" />
        <rect x="150" y="495" width="700" height="50" rx="4" fill="#eee9d3" stroke="#555" />
        <rect x="425" y="470" width="25" height="100" fill="#ddd5b6" stroke="#555" />
        <path d="M535 480 L550 465 H580 L595 480 V560 L580 580 H550 L535 560 Z" fill="#d4d4d4" stroke="#555" />
        <path className={styles.leader} d="M365 600 L435 570 M650 600 L565 580" />
        <text className={styles.label} x="265" y="622">{copy.shoulder}</text>
        <text className={styles.label} x="650" y="622">{copy.clamp}</text>
        <path className={styles.dimension} d="M450 610 V638 M535 610 V638 M450 625 H535 M450 625 L459 620 M450 625 L459 630 M535 625 L526 620 M535 625 L526 630" />
        <text className={styles.label} x="492" y="665" textAnchor="middle">{copy.thickness}</text>
      </svg>}
    </div>
    <div className={styles.links}>
      {kind === "pair" && <Link href={`${localizedProductRoot}q2001-pnv-sppe/`}>{copy.viewMale} Q2001-PNV-SPPE</Link>}
      {kind === "valves" && <Link href={`${localizedProductRoot}q2001-smx-sppe/`}>{copy.viewNonValved} Q2001-SMX-SPPE</Link>}
      <Link href={`${localizedProductRoot}q2001-smv-sppe/`}>{kind === "valves" ? copy.viewValved : copy.viewPanel} Q2001-SMV-SPPE</Link>
      {kind === "panel" && <>
        <Link href={`${localizedProductRoot}q4004-smv-sppe/`}>{copy.viewPanel} Q4004-SMV-SPPE</Link>
        <Link href={`${localizedProductRoot}q6006-smv-sppe/`}>{copy.viewPanel} Q6006-SMV-SPPE</Link>
      </>}
    </div>
  </div>;
}
