import Image from "next/image";

import {
  getDpl30ArticleCopy,
  getDpl30ArticleFaq,
  type Dpl30FaqItem,
  type Dpl30SpecificationRow,
  type Dpl30ThreeColumnRow,
  type Dpl30TwoColumnRow,
} from "@/data/resources/technical-articles/dpl30-liquid-diaphragm-pump.article";
import type { TechnicalArticleLocale } from "@/data/resources/technical-articles/technical-articles.types";

import styles from "../../news/NewsArticleClient.module.css";

interface Dpl30LiquidDiaphragmPumpArticleProps {
  locale?: TechnicalArticleLocale;
}

const ASSET_BASE =
  "/images/resources/technical-articles/dpl30-liquid-diaphragm-pump";

type ArticleFigureProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption: string;
};

function ArticleFigure({
  src,
  alt,
  width,
  height,
  caption,
}: ArticleFigureProps) {
  return (
    <figure style={{ margin: "30px 0" }}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes="(max-width: 760px) 100vw, 1280px"
        style={{
          display: "block",
          width: "100%",
          height: "auto",
          objectFit: "contain",
        }}
      />
      <figcaption
        style={{
          marginTop: 12,
          color: "#8b96a8",
          fontSize: 13,
          lineHeight: 1.65,
          textAlign: "center",
        }}
      >
        {caption}
      </figcaption>
    </figure>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3
      style={{
        margin: "30px 0 14px",
        color: "#173368",
        fontSize: "22px",
        lineHeight: 1.4,
        fontWeight: 800,
      }}
    >
      {children}
    </h3>
  );
}

function ArticleFaq({ items }: { items: readonly Dpl30FaqItem[] }) {
  if (items.length === 0) {
    return null;
  }

  return (
    <section className={styles.contentBlock} aria-labelledby="dpl30-faq-title">
      <h2 id="dpl30-faq-title">常见问题</h2>
      <div style={{ display: "grid", gap: 12 }}>
        {items.map((item) => (
          <details
            key={item.question}
            style={{
              border: "1px solid rgba(23, 51, 104, 0.14)",
              borderRadius: 8,
              padding: "0 18px",
              background: "#ffffff",
            }}
          >
            <summary
              style={{
                padding: "16px 0",
                color: "#173368",
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              {item.question}
            </summary>
            <p style={{ margin: "0 0 18px" }}>{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

function ThreeColumnTable({
  headers,
  rows,
}: {
  headers: Dpl30ThreeColumnRow;
  rows: readonly Dpl30ThreeColumnRow[];
}) {
  return (
    <div className={styles.technicalTableWrap}>
      <table className={styles.technicalTable}>
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={header}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={`${row[0]}-${rowIndex}`}>
              {row.map((cell, cellIndex) => (
                <td key={`${rowIndex}-${cellIndex}`}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function TwoColumnTable({
  headers,
  rows,
}: {
  headers: Dpl30TwoColumnRow;
  rows: readonly Dpl30TwoColumnRow[];
}) {
  return (
    <div className={styles.technicalTableWrap}>
      <table className={styles.technicalTable}>
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={header}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={`${row[0]}-${rowIndex}`}>
              <td>{row[0]}</td>
              <td>{row[1]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function SpecificationTable({
  headers,
  rows,
}: {
  headers: Dpl30ThreeColumnRow;
  rows: readonly Dpl30SpecificationRow[];
}) {
  return (
    <div className={styles.technicalTableWrap}>
      <table className={styles.technicalTable}>
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={header}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.label}>
              <td>{row.label}</td>
              {row.value !== undefined ? (
                <td colSpan={2}>{row.value}</td>
              ) : (
                <>
                  <td>{row.brushed}</td>
                  <td>{row.brushless}</td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function WorkingPrincipleDiagram({
  copy,
}: {
  copy: ReturnType<typeof getDpl30ArticleCopy>["diagram"];
}) {
  return (
    <figure style={{ width: "100%", maxWidth: 1280, margin: "30px auto" }}>
      <svg
        viewBox="0 0 1120 470"
        role="img"
        aria-label={copy.ariaLabel}
        style={{
          display: "block",
          width: "100%",
          height: "auto",
          padding: "24px 0",
          borderTop: "1px solid rgba(23, 51, 104, 0.14)",
          borderBottom: "1px solid rgba(23, 51, 104, 0.14)",
        }}
      >
        <defs>
          <marker id="dpl30ArrowBlue" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
            <path d="M0 0 L0 6 L9 3 Z" fill="#173368" />
          </marker>
          <marker id="dpl30ArrowGreen" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
            <path d="M0 0 L0 6 L9 3 Z" fill="#0b9e7d" />
          </marker>
        </defs>
        <line x1="560" y1="24" x2="560" y2="438" stroke="#e3e7ec" />
        <text x="270" y="55" textAnchor="middle" fontSize="25" fontWeight="700" fill="#173368">{copy.suctionTitle}</text>
        <text x="850" y="55" textAnchor="middle" fontSize="25" fontWeight="700" fill="#173368">{copy.dischargeTitle}</text>
        <g transform="translate(0,10)">
          <rect x="110" y="160" width="320" height="125" rx="18" fill="#ffffff" stroke="#aeb7c2" strokeWidth="3" />
          <path d="M175 160 C215 112 325 112 365 160" fill="none" stroke="#173368" strokeWidth="9" />
          <line x1="270" y1="88" x2="270" y2="142" stroke="#173368" strokeWidth="4" markerEnd="url(#dpl30ArrowBlue)" />
          <line x1="58" y1="222" x2="110" y2="222" stroke="#0b9e7d" strokeWidth="8" />
          <line x1="430" y1="222" x2="482" y2="222" stroke="#a5aeb9" strokeWidth="8" />
          <path d="M68 222 H145" stroke="#0b9e7d" strokeWidth="4" markerEnd="url(#dpl30ArrowGreen)" />
          <path d="M142 247 C205 275 335 275 398 247" fill="none" stroke="#74bde7" strokeWidth="18" opacity="0.5" />
          <text x="70" y="330" fontSize="17" fill="#0b9e7d">{copy.inletOpen}</text>
          <text x="360" y="330" fontSize="17" fill="#7d8691">{copy.outletClosed}</text>
          <text x="270" y="375" textAnchor="middle" fontSize="16" fill="#596471">{copy.suctionDescription}</text>
        </g>
        <g transform="translate(580,10)">
          <rect x="110" y="160" width="320" height="125" rx="18" fill="#ffffff" stroke="#aeb7c2" strokeWidth="3" />
          <path d="M175 160 C215 202 325 202 365 160" fill="none" stroke="#173368" strokeWidth="9" />
          <line x1="270" y1="88" x2="270" y2="142" stroke="#173368" strokeWidth="4" markerEnd="url(#dpl30ArrowBlue)" />
          <line x1="58" y1="222" x2="110" y2="222" stroke="#a5aeb9" strokeWidth="8" />
          <line x1="430" y1="222" x2="482" y2="222" stroke="#0b9e7d" strokeWidth="8" />
          <path d="M400 222 H475" stroke="#0b9e7d" strokeWidth="4" markerEnd="url(#dpl30ArrowGreen)" />
          <path d="M142 247 C205 275 335 275 398 247" fill="none" stroke="#74bde7" strokeWidth="18" opacity="0.5" />
          <text x="70" y="330" fontSize="17" fill="#7d8691">{copy.inletClosed}</text>
          <text x="360" y="330" fontSize="17" fill="#0b9e7d">{copy.outletOpen}</text>
          <text x="270" y="375" textAnchor="middle" fontSize="16" fill="#596471">{copy.dischargeDescription}</text>
        </g>
      </svg>
      <figcaption
        style={{
          marginTop: 12,
          color: "#8b96a8",
          fontSize: 13,
          lineHeight: 1.65,
          textAlign: "center",
        }}
      >
        {copy.caption}
      </figcaption>
    </figure>
  );
}

export default function Dpl30LiquidDiaphragmPumpArticle({
  locale = "zh-CN",
}: Dpl30LiquidDiaphragmPumpArticleProps) {
  const copy = getDpl30ArticleCopy(locale);
  const faqItems = getDpl30ArticleFaq(locale);

  return (
    <div className={styles.technicalArticleBody}>
      <section className={styles.contentBlock}>
        <h2>{copy.section1.title}</h2>
        <p>{copy.section1.paragraphs[0]}</p>
        <p>{copy.section1.paragraphs[1]}</p>
        <WorkingPrincipleDiagram copy={copy.diagram} />
        <p>{copy.section1.paragraphs[2]}</p>
        <p>{copy.section1.paragraphs[3]}</p>
      </section>

      <section className={styles.contentBlock}>
        <h2>{copy.section2.title}</h2>
        <p>{copy.section2.intro}</p>
        <ThreeColumnTable headers={copy.section2.headers} rows={copy.section2.rows} />
      </section>

      <section className={styles.contentBlock}>
        <h2>{copy.section3.title}</h2>
        <p>{copy.section3.paragraphs[0]}</p>
        <div className={styles.technicalNotice}>
          <strong>{copy.section3.noticeStrong}</strong>
          <br />
          {copy.section3.noticeText}
        </div>
        <p>{copy.section3.paragraphs[1]}</p>
        <p>{copy.section3.paragraphs[2]}</p>
      </section>

      <section className={styles.contentBlock}>
        <h2>{copy.section4.title}</h2>
        <p>{copy.section4.intro}</p>
        <SpecificationTable headers={copy.section4.headers} rows={copy.section4.rows} />
      </section>

      <section className={styles.contentBlock}>
        <h2>{copy.section5.title}</h2>
        <p>{copy.section5.paragraphs[0]}</p>
        <ArticleFigure src={`${ASSET_BASE}/dpl30-flow-pressure.jpg`} alt={copy.section5.figureAlt} width={750} height={610} caption={copy.section5.figureCaption} />
        <p>{copy.section5.paragraphs[1]}</p>
        <div className={styles.technicalNotice}>{copy.section5.notice}</div>
      </section>

      <section className={styles.contentBlock}>
        <h2>{copy.section6.title}</h2>
        <p>{copy.section6.intro}</p>
        <ThreeColumnTable headers={copy.section6.headers} rows={copy.section6.rows} />
        <SectionTitle>{copy.section6.epTitle}</SectionTitle>
        <p>{copy.section6.epText}</p>
        <SectionTitle>{copy.section6.ffTitle}</SectionTitle>
        <p>{copy.section6.ffText}</p>
        <div className={styles.technicalNotice}>
          <strong>{copy.section6.noticeStrong}</strong>
          <br />
          {copy.section6.noticeText}
        </div>
      </section>

      <section className={styles.contentBlock}>
        <h2>{copy.section7.title}</h2>
        <p>{copy.section7.intro}</p>
        <ThreeColumnTable headers={copy.section7.headers} rows={copy.section7.rows} />
        <p>{copy.section7.afterTable}</p>
        <SectionTitle>{copy.section7.brushedTitle}</SectionTitle>
        <ArticleFigure src={`${ASSET_BASE}/dpl30-brushed-dimensions.webp`} alt={copy.section7.brushedAlt} width={1250} height={1120} caption={copy.section7.brushedCaption} />
        <p>{copy.section7.brushedText}</p>
        <SectionTitle>{copy.section7.brushlessTitle}</SectionTitle>
        <ArticleFigure src={`${ASSET_BASE}/dpl30-brushless-dimensions.webp`} alt={copy.section7.brushlessAlt} width={1270} height={1050} caption={copy.section7.brushlessCaption} />
        <p>{copy.section7.brushlessText}</p>
      </section>

      <section className={styles.contentBlock}>
        <h2>{copy.section8.title}</h2>
        <p>{copy.section8.intro}</p>
        <div className={styles.technicalNotice}>
          <strong>{copy.section8.noticeStrong}</strong>
          <br />
          {copy.section8.noticeText}
        </div>
        <ThreeColumnTable headers={copy.section8.headers} rows={copy.section8.rows} />
        <SectionTitle>{copy.section8.exampleTitle}</SectionTitle>
        <p>{copy.section8.exampleText}</p>
        <div className={styles.technicalNotice}>{copy.section8.notice}</div>
      </section>

      <section className={styles.contentBlock}>
        <h2>{copy.section9.title}</h2>
        <ol className={styles.technicalRuleList}>
          {copy.section9.steps.map(([title, description]) => (
            <li key={title}>
              <strong>{title}</strong>
              <p>{description}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className={styles.contentBlock}>
        <h2>{copy.section10.title}</h2>
        <p>{copy.section10.intro}</p>
        <TwoColumnTable headers={copy.section10.headers} rows={copy.section10.rows} />
      </section>

      <section className={styles.contentBlock}>
        <h2>{copy.section11.title}</h2>
        <p>{copy.section11.paragraphs[0]}</p>
        <p>{copy.section11.paragraphs[1]}</p>
      </section>

      <ArticleFaq items={faqItems} />
    </div>
  );
}
