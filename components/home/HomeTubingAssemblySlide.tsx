"use client";

import Link from "next/link";
import { useEffect, useState, type CSSProperties } from "react";
import { replacePathLocale, type LocaleCode } from "@/lib/i18n";
import { homeHeroText } from "@/data/home-hero.intl";
import styles from "./HomeTubingAssemblySlide.module.css";

const DEMO_TEXT = "FEP · 500 mm";

function useSelectedPart(selected: boolean, reduceMotion: boolean) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(selected), selected && !reduceMotion ? 180 : 0);
    return () => window.clearTimeout(timer);
  }, [reduceMotion, selected]);
  return reduceMotion ? selected : visible;
}

function position(x: number, y: number, width?: number): CSSProperties {
  return { left: `${(x - 100) / 390 * 100}%`, top: `${(y - 336) / 374 * 100}%`, ...(width ? { width: `${width / 390 * 100}%` } : {}) };
}

export default function HomeTubingAssemblySlide({ locale, active, reduceMotion, onInteraction }: {
  locale: LocaleCode; active: boolean; reduceMotion: boolean; onInteraction: () => void;
}) {
  const copy = homeHeroText[locale].tubing;
  const [ring, setRing] = useState(false);
  const [washer, setWasher] = useState(false);
  const [tag, setTag] = useState(false);
  const [value, setValue] = useState("");
  const [manual, setManual] = useState(false);
  const [step, setStep] = useState(0);
  const finished = step >= DEMO_TEXT.length + 3;
  const washerVisible = useSelectedPart(washer, reduceMotion);
  const ringVisible = useSelectedPart(ring, reduceMotion);
  const tagVisible = useSelectedPart(tag, reduceMotion);

  useEffect(() => {
    if (!active || reduceMotion || manual || finished) return;
    const timer = window.setTimeout(() => {
      if (step === 0) setWasher(true);
      else if (step === 1) setRing(true);
      else if (step === 2) setTag(true);
      else setValue(DEMO_TEXT.slice(0, step - 2));
      setStep(current => current + 1);
    }, step === 0 ? 1500 : step < 3 ? 1100 : step === 3 ? 900 : 125);
    return () => window.clearTimeout(timer);
  }, [active, finished, manual, reduceMotion, step]);

  function interact() { setManual(true); onInteraction(); }
  const units = Array.from(value || copy.placeholder).reduce((total, char) => total + (/[^\u0000-\u00ff]/.test(char) ? 1 : 0.62), 0);
  const labelSize = Math.min(10, 73 / Math.max(units, 1));
  const inputSize = Math.min(13, 78 / Math.max(units, 1));

  return <div className={styles.slide} data-home-tubing-demo="true" data-demo-finished={finished} data-demo-manual={manual} data-home-tubing-stage={step}>
    <div className={styles.copy}>
      <h2>{copy.titleLine1}<br />{copy.titleLine2}</h2>
      <p>{copy.descriptionLine1}{locale === "zh-CN" ? null : " "}{copy.descriptionLine2}</p>
      <Link className={styles.cta} data-analytics-section="home_hero_tubing_assembly" data-analytics-hero-action="tubing_assembly_cta" href={replacePathLocale("/products/tubing-assemblies/flanged-tubing/details/", locale)}>{copy.button}</Link>
    </div>
    <div className={styles.visual}>
      <div className={styles.artwork} role="group" aria-label={copy.drawingLabel} onFocusCapture={interact}>
        <svg className={styles.drawing} viewBox="100 336 390 374" aria-hidden="true">
          <image href="/images/home/tubing-assembly-hero-base.svg" x="100" y="336" width="390" height="374" />
          <g className={`${styles.part} ${styles.insertedPart}`} data-visible={washerVisible} opacity={washerVisible ? 1 : 0} data-home-tubing-washer="true">
            <image href="/images/home/tubing-assembly-hero-washer.svg" x="100" y="336" width="390" height="374" />
          </g>
          <g>
            <path d="M148 402V453L125 502V518" fill="none" stroke="#111" strokeWidth="1" />
            <circle cx="148" cy="390" r="11.5" fill="#111" /><text x="148" y="394" fontSize="13" textAnchor="middle" fill="#fff">2</text>
            <text x="220" y="427" fontSize="14">{copy.material}SUS</text>
          </g>
          <g data-home-tubing-fitting-callout="true">
            <path d="M250 652V565.5" fill="none" stroke="#111" strokeWidth="1" />
            <circle cx="250" cy="664" r="11.5" fill="#111" /><text x="250" y="668" fontSize="13" textAnchor="middle" fill="#fff">4</text>
            <rect x="269" y="653" width="20" height="20" fill="#fff" stroke="#111" />
            <path d="M272 663l5 6l10 -13" fill="none" stroke="#111" strokeWidth="1.8" />
            <text x="298" y="669" fontSize="15" textLength={locale === "zh-CN" ? undefined : 43} lengthAdjust="spacingAndGlyphs">{copy.fitting}</text><text className={styles.threadValue} x="346" y="668" fontSize="14">1/4-28 UNF</text><text x="299" y="700" fontSize="14">{copy.endA}</text>
          </g>
          <g className={`${styles.part} ${styles.insertedPart}`} data-visible={ringVisible} opacity={ringVisible ? 1 : 0} data-home-tubing-ring="true" data-enabled={ring}>
            <rect x="312" y="525" width="6" height="30" fill="#111" />
          </g>
          <g className={`${styles.part} ${styles.tagPart}`} data-visible={tagVisible} opacity={tagVisible ? 1 : 0} data-home-tubing-tag="true" data-enabled={tag}>
            <rect x="360" y="525" width="86" height="30" fill="#fff" stroke="#111" strokeWidth="1" />
            <text x="365" y="545" fontSize={labelSize} fill="#111" data-home-tubing-label="true">{value}</text>
          </g>
          <g>
            <path d="M297 613V581L315 558" fill="none" stroke="#111" strokeWidth="1" />
            <circle cx="297" cy="625" r="11.5" fill="#111" /><text x="297" y="629" fontSize="13" textAnchor="middle" fill="#fff">3</text>
          </g>
          <g>
            <path d="M350 407V480L403 522" fill="none" stroke="#111" strokeWidth="1" />
            <circle cx="350" cy="395" r="11.5" fill="#111" /><text x="350" y="399" fontSize="13" textAnchor="middle" fill="#fff">5</text>
            <text x="397" y="429" fontSize="14" fill={tag ? "#111" : "#82909b"}>{copy.text}</text>
          </g>
        </svg>
        <label className={styles.control} style={position(167, 379)}>
          <input type="checkbox" aria-label={copy.washer} checked={washer} onChange={event => { interact(); setWasher(event.target.checked); }} /><span>{copy.washer}</span>
        </label>
        <label className={`${styles.control} ${styles.ringControl}`} style={position(316, 614)}>
          <input type="checkbox" aria-label={copy.ring} checked={ring} onChange={event => { interact(); setRing(event.target.checked); }} /><span>{copy.ring}</span>
        </label>
        <label className={styles.control} style={position(370, 384)}>
          <input type="checkbox" aria-label={copy.tag} checked={tag} onChange={event => { interact(); setTag(event.target.checked); }} /><span>{copy.tag}</span>
        </label>
        <input className={styles.labelInput} style={{ ...position(397, 438, 83), fontSize: `max(16px, ${inputSize / 390 * 100}cqw)` }} aria-label={copy.labelText} placeholder={copy.placeholder}
          disabled={!tag} maxLength={12} value={value} autoComplete="off" spellCheck={false}
          onChange={event => { interact(); setValue(event.target.value); }} />
      </div>
    </div>
  </div>;
}
