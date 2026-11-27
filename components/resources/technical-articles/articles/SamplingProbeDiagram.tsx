import Image from "next/image";
import type { CSSProperties } from "react";

import type { TechnicalArticleLocale } from "@/data/resources/technical-articles/technical-articles.types";

import { samplingProbeDiagramCopy } from "./sampling-probe-diagram-copy";
import { samplingProbeLabelLayouts, type SamplingProbeDiagramKind, type SamplingProbeLabelBox } from "./sampling-probe-diagram-layout";
import styles from "./SamplingProbeDiagram.module.css";

const colors = {
  title: "#18426a",
  strong: "#263345",
  muted: "#56616d",
  accent: "#a34f22",
};

export default function SamplingProbeDiagram({
  kind, locale, src, alt, width, height,
}: {
  kind: SamplingProbeDiagramKind;
  locale: Exclude<TechnicalArticleLocale, "zh-CN"> | "de" | "it" | "hi";
  src: string;
  alt: string;
  width: number;
  height: number;
}) {
  const labels: Record<string, string> = samplingProbeDiagramCopy[locale][kind];
  const layout: Record<string, SamplingProbeLabelBox> = samplingProbeLabelLayouts[kind];
  return (
    <div className={styles.viewport} tabIndex={0}>
      <div className={styles.diagram} data-localized-probe-diagram={kind} style={{ aspectRatio: `${width} / ${height}` }}>
        <Image src={src} alt={alt} width={width} height={height} sizes="(max-width: 800px) 720px, 900px" />
        {Object.entries(layout).map(([id, box]) => {
          const [x, y, boxWidth, boxHeight, fontSize, tone, align = "left", background = "#fff"] = box;
          const style: CSSProperties = {
            left: `${100 * x / width}%`,
            top: `${100 * y / height}%`,
            width: `${100 * boxWidth / width}%`,
            height: `${100 * boxHeight / height}%`,
            fontSize: `${100 * fontSize / width}cqw`,
            color: tone ? colors[tone] : "#263345",
            fontWeight: tone === "title" || tone === "strong" || tone === "accent" ? 700 : 400,
            textAlign: align,
            backgroundColor: background,
          };
          return <span key={id} className={styles.label} style={style} data-probe-label={id}>{labels[id]}</span>;
        })}
      </div>
    </div>
  );
}
