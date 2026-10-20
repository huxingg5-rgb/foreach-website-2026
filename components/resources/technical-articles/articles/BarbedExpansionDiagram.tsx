import styles from "./BarbedExpansionDiagram.module.css";
import { barbDiagramCopy } from "@/data/resources/technical-articles/fitting-selection-locales/diagrams";
import type { TechnicalArticleLocale } from "@/data/resources/technical-articles/technical-articles.types";

const profileImage = "/images/resources/technical-articles/barbed-fitting-expansion-ratio/barb-profiles-c-f-d-v-x.webp";
const ink = "#203d72";
const blue = "#168bb7";
const tubeFill = "#ddf3fc";

// Display the original catalogue bitmap through a viewport. Never redraw, warp,
// recolour or regenerate the fitting. Only the separate tubing/annotation layers vary.
export function OriginalProfile({ profile, x, y, scale = 1 }: {
  profile: "C" | "F" | "D" | "V" | "X"; x: number; y: number; scale?: number;
}) {
  const cropX = { C: 0, F: 150, D: 300, V: 450, X: 600 }[profile];
  return <svg x={x} y={y} width={150 * scale} height={285 * scale}
    viewBox={`${cropX} 0 150 285`}
    overflow="hidden" preserveAspectRatio="xMidYMid meet" data-original-barb-profile={profile}>
    <image href={profileImage} x="0" y="0" width="750" height="285" />
  </svg>;
}

function Dimension({ x1, x2, y, label }: {
  x1: number; x2: number; y: number; label: string;
}) {
  return <g fill="none" stroke={ink} strokeWidth="1.5">
    <path d={`M${x1} ${y - 10} V${y + 10} M${x2} ${y - 10} V${y + 10} M${x1} ${y} H${x2}`} />
    <path d={`M${x1 + 7} ${y - 4} L${x1} ${y} L${x1 + 7} ${y + 4} M${x2 - 7} ${y - 4} L${x2} ${y} L${x2 - 7} ${y + 4}`} />
    <text x={(x1 + x2) / 2} y={y - 17} textAnchor="middle" fill={ink} stroke="none" fontSize={label.length > 20 ? 14 : 18}>{label}</text>
  </g>;
}

export function BarbAssemblyStage({ stage, locale = "zh-CN" }: { stage: 0 | 1 | 2; locale?: TechnicalArticleLocale }) {
  const c = barbDiagramCopy[locale];
  const descriptions = [`${c.stages[0]}: ${c.initial}; ${c.crest}`, c.expand, c.conform];
  return <svg viewBox="0 0 330 535" className={styles.svg} role="img"
    aria-labelledby={`barb-stage-${stage}-title`} xmlns="http://www.w3.org/2000/svg">
    <title id={`barb-stage-${stage}-title`}>{descriptions[stage]}</title>
    <OriginalProfile profile="F" x={90} y={190} />
    {/* The white opening is kept clear; blue walls are outside the original silhouette. */}
    {stage === 0 ? <g fill={tubeFill} stroke={blue} strokeWidth="2">
      <path d="M102 55 H116 V158 H102 Z M214 55 H228 V158 H214 Z" />
      <path d="M116 55 H214 M116 158 H214" fill="none" strokeDasharray="4 5" />
    </g> : <g fill={tubeFill} stroke={blue} strokeWidth="2">
      {stage === 1 ? <>
        <path d="M102 55 H116 V285 L104 318 H90 L102 285 Z" />
        <path d="M214 55 H228 V285 L240 318 H226 L214 285 Z" />
      </> : <>
        <path d="M102 55 H116 V285 L104 318 Q110 333 111 345 V418 H97 V345 Q96 333 90 318 L102 285 Z" />
        <path d="M214 55 H228 V285 L240 318 Q234 333 233 345 V418 H219 V345 Q220 333 226 318 L214 285 Z" />
      </>}
      <path d="M116 55 H214" fill="none" strokeDasharray="4 5" />
    </g>}
    {stage === 0 ? <>
      <Dimension x1={116} x2={214} y={109} label={c.initial} />
      <path d="M104 318 V506 M226 318 V506" fill="none" stroke={ink} strokeWidth="1.2" />
      <Dimension x1={104} x2={226} y={506} label={c.crest} />
    </> : <>
      <path d="M165 101 V160 M156 148 L165 160 L174 148" fill="none" stroke={blue} strokeWidth="3" />
      <text x="165" y="86" textAnchor="middle" fill={blue} fontSize="18">{c.insert}</text>
      {stage === 1
        ? <g fill="none" stroke={blue} strokeWidth="2">
          <path d="M89 310 H58 M58 310 L66 304 M58 310 L66 316 M241 310 H272 M272 310 L264 304 M272 310 L264 316" />
          <text x="165" y="496" textAnchor="middle" fill={ink} stroke="none" fontSize={locale === "zh-CN" ? 18 : 15}>{c.expand}</text>
        </g>
        : <g fill="none" stroke={blue} strokeWidth="2">
          <path d="M61 383 H109 M61 383 V456 H97" />
          <circle cx="110" cy="383" r="3" fill={blue} />
          <text x="165" y="496" textAnchor="middle" fill={ink} stroke="none" fontSize={locale === "zh-CN" ? 18 : 15}>{c.conform}</text>
        </g>}
    </>}
  </svg>;
}

export function BarbRatioComparison({ profile, locale = "zh-CN" }: { profile: "F" | "D"; locale?: TechnicalArticleLocale }) {
  // Uniform scaling preserves the original outline. Normalize the two crest
  // widths to the 4.0 : 4.5 example; other lengths are not product dimensions.
  const isF = profile === "F";
  const scale = isF ? 1 : 1.125;
  const halfCrest = 61 * scale;
  const crestY = 175 + 128 * scale;
  return <svg viewBox="0 0 340 615" className={styles.svg} role="img"
    aria-labelledby={`barb-ratio-${profile}-title`} xmlns="http://www.w3.org/2000/svg">
    <title id={`barb-ratio-${profile}-title`}>{`${profile}: d = 3.2 mm; Db = ${isF ? "4.0" : "4.5"} mm; ${barbDiagramCopy[locale].expansion} = ${isF ? "25%" : "≈ 40.6%"}`}</title>
    <g fill={tubeFill} stroke={blue} strokeWidth="2">
      <path d="M108 45 H121 V134 H108 Z M219 45 H232 V134 H219 Z" />
      <path d="M121 45 H219 M121 134 H219" fill="none" strokeDasharray="4 5" />
    </g>
    <Dimension x1={121} x2={219} y={99} label="d = 3.2 mm" />
    <path d="M170 142 V168 M164 160 L170 168 L176 160" fill="none" stroke={blue} strokeWidth="2" />
    <OriginalProfile profile={profile} x={170 - 75 * scale} y={175} scale={scale} />
    <path d={`M${170 - halfCrest} ${crestY} V543 M${170 + halfCrest} ${crestY} V543`}
      fill="none" stroke={ink} strokeWidth="1.2" />
    <Dimension x1={170 - halfCrest} x2={170 + halfCrest} y={543} label={`Db = ${isF ? "4.0" : "4.5"} mm`} />
    <text x="170" y="599" textAnchor="middle" fill={ink} fontSize="31" fontWeight="700">{isF ? "25%" : "≈ 40.6%"}</text>
  </svg>;
}

export default function BarbedExpansionDiagram({ kind, locale = "zh-CN" }: { kind: "assembly" | "comparison" | "profiles"; locale?: TechnicalArticleLocale }) {
  const c = barbDiagramCopy[locale];
  if (kind === "profiles") {
    const profiles = ["C", "F", "D", "V", "X"] as const;
    const ranges = ["42%–69%", "25%–32%", "24%–50%", "32%–60%", "32%–50%"];
    const series = [c.classic, "400", "200", "500", "600"];
    return <div className={styles.profiles} data-barb-expansion-diagram={kind}>
      {profiles.map((profile, index) => <div className={styles.profileCard} key={profile}>
        <p className={styles.heading}>{profile}</p>
        <svg viewBox="0 0 150 285" className={styles.svg} role="img" aria-label={`${profile} ${c.profile}`}>
          <OriginalProfile profile={profile} x={0} y={0} />
        </svg>
        <p>{c.expansion}<br /><strong>{ranges[index]}</strong></p>
        <p>{c.series}: {series[index]}</p>
      </div>)}
    </div>;
  }
  return <div className={styles.root} data-barb-expansion-diagram={kind}>
    {kind === "assembly" ? <>
      <div className={styles.threeSteps}>
        {c.stages.map((label, index) =>
          <div className={styles.panel} key={label}>
            <p className={styles.heading}><span>{String(index + 1).padStart(2, "0")}</span>{label}</p>
            <BarbAssemblyStage stage={index as 0 | 1 | 2} locale={locale} />
          </div>)}
      </div>
      <p className={styles.note}>{c.assemblyNote}</p>
    </> : <>
      <p className={styles.intro}>{c.intro}</p>
      <div className={styles.comparison}>
        {(["F", "D"] as const).map(profile => <div className={styles.panel} key={profile}>
          <p className={styles.heading}>{profile} {c.profile}</p>
          <p className={styles.model}>{`BL-32${profile}-PP-N · ${c.example}`}</p>
          <BarbRatioComparison profile={profile} locale={locale} />
          <p className={styles.formula}>{profile === "F" ? "(4.0 − 3.2) ÷ 3.2 × 100%" : "(4.5 − 3.2) ÷ 3.2 × 100%"}</p>
        </div>)}
      </div>
      <p className={styles.note}>{c.comparisonNote}</p>
    </>}
  </div>;
}
