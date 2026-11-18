import Image from "next/image";
import type { ReactNode } from "react";
import { getCompactInstrumentGuideUi } from "@/data/products/detail/compact-instrument-guide-ui.intl";
import figureSizes from "@/data/products/detail/instrument-guide-figures.generated.json";
import localizedFigureSizes from "@/data/products/detail/instrument-guide-figures.intl.generated.json";
import type { GuideFigure, GuideSection } from "@/data/products/detail/instrument-product-guides.zh";
import styles from "./CompactInstrumentGuide.module.css";

function SelectionFigure({ figure, locale }: { figure: GuideFigure; locale: string }) {
  const chinese = locale === "zh" || locale === "zh-CN";
  const sizes: Record<string, { width: number; height: number }> = chinese ? figureSizes : localizedFigureSizes;
  const size = sizes[figure.file];
  if (!size) return null;

  const source = `/images/products/detail-guides/${chinese ? "zh" : "instrument-intl"}/${figure.file}`;
  const { enlarge } = getCompactInstrumentGuideUi(locale);
  return (
    <figure className={styles.figure}>
      <Image src={source} alt={figure.alt} width={size.width} height={size.height} />
      <figcaption>
        {figure.caption}{" "}
        <a href={source} target="_blank" rel="noreferrer" aria-label={`${enlarge} · ${figure.alt}`}>{enlarge}</a>
      </figcaption>
    </figure>
  );
}

export function GuideBlock({
  section,
  number,
  heading: Heading = "h3",
  children,
  columns,
  locale = "zh",
}: {
  section: GuideSection;
  number: string;
  heading?: "h2" | "h3";
  children?: ReactNode;
  columns?: readonly [string, string];
  locale?: string;
}) {
  const { id, title, intro, figure, rows, steps, note, links } = section;
  const chinese = locale === "zh" || locale === "zh-CN";
  const { symptom, action } = getCompactInstrumentGuideUi(locale);
  const tableHeaders = columns ?? (id === "care" ? [symptom, action] : undefined);
  const labelSeparator = chinese ? "：" : locale === "fr" ? "\u00a0: " : ": ";
  const detail = (value: string, text: string) => {
    const punctuation = /[.!?…。！？]$/.test(value) ? "" : chinese ? "。" : ".";
    return value + punctuation + (chinese ? "" : " ") + text;
  };
  return (
    <section
      className={Heading === "h2" ? styles.phase : styles.subsection}
      data-instrument-guide-section={id}
    >
      <Heading>{number} {title}</Heading>
      <p>{intro}</p>
      {figure && <SelectionFigure figure={figure} locale={locale} />}
      {children}
      {rows && (tableHeaders ? (
        <table className={styles.table} aria-label={title}>
          <thead><tr><th scope="col">{tableHeaders[0]}</th><th scope="col">{tableHeaders[1]}</th></tr></thead>
          <tbody>{rows.map(([label, value, text]) => (
            <tr key={label}><th scope="row">{label}</th><td>{detail(value, text)}</td></tr>
          ))}</tbody>
        </table>
      ) : rows.map(([label, value, text]) => (
        <p key={label}>{label}{labelSeparator}{detail(value, text)}</p>
      )))}
      {steps && (
        <ol className={styles.steps}>
          {steps.map(([label, text]) => (
            <li key={label}>{label}{labelSeparator}{text}</li>
          ))}
        </ol>
      )}
      {note && <p className={styles.note}>{note}</p>}
      {links?.length ? (
        <ul className={styles.links}>
          {links.map(link => <li key={link.href}><a href={link.href}>{link.label}</a></li>)}
        </ul>
      ) : null}
    </section>
  );
}
