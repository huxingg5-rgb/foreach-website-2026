import Image from "next/image";
import Link from "next/link";

import {
  getDpl30ArticleCopy,
  getDpl30ArticleFaqCopy,
  type Dpl30ArticleCopy,
  type Dpl30FaqItem,
  type Dpl30SpecificationRow,
  type Dpl30ThreeColumnRow,
  type Dpl30TwoColumnRow,
} from "@/data/resources/technical-articles/dpl30-liquid-diaphragm-pump.article";
import {
  getDpl60ArticleCopy,
  getDpl60ArticleFaqCopy,
} from "@/data/resources/technical-articles/dpl60-liquid-diaphragm-pump.article";
import type { Dpl60ArticleCopy } from "@/data/resources/technical-articles/dpl60-liquid-diaphragm-pump.types";
import {
  getDpgl800ArticleCopy,
  type Dpgl800ArticleCopy,
} from "@/data/resources/technical-articles/dpgl800-gas-liquid-diaphragm-pump.article";
import {
  getDpl30hArticleCopy,
  type Dpl30hArticleCopy,
} from "@/data/resources/technical-articles/dpl30h-high-pressure-liquid-diaphragm-pump.article";
import type { TechnicalArticleLocale } from "@/data/resources/technical-articles/technical-articles.types";

import styles from "../../news/NewsArticleClient.module.css";

interface Dpl30LiquidDiaphragmPumpArticleProps {
  locale?: TechnicalArticleLocale;
  articleSeries?: "dpl30" | "dpl30h" | "dpl60" | "dpgl800";
}

const DPL30_ASSET_BASE =
  "/images/resources/technical-articles/dpl30-liquid-diaphragm-pump";
const DPL60_ASSET_BASE =
  "/images/resources/technical-articles/dpl60-liquid-diaphragm-pump";
const DPL60_CURVE =
  "/images/products/pumps/diaphragm-pumps/dpl60/curves/dpl60-liquid-diaphragm-pump-flow-pressure-curve.webp";
const DPGL800_ASSET_BASE =
  "/images/resources/technical-articles/dpgl800-gas-liquid-diaphragm-pump";
const DPL30H_ASSET_BASE =
  "/images/resources/technical-articles/dpl30h-high-pressure-liquid-diaphragm-pump";

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

function ArticleFaq({
  title,
  items,
}: {
  title: string;
  items: readonly Dpl30FaqItem[];
}) {
  if (items.length === 0) {
    return null;
  }

  return (
    <section className={styles.contentBlock} aria-labelledby="liquid-diaphragm-pump-faq-title">
      <h2 id="liquid-diaphragm-pump-faq-title">{title}</h2>
      <div>
        {items.map((item, index) => (
          <div
            key={item.question}
            style={{ marginTop: index === 0 ? 0 : 28 }}
          >
            <h3
              style={{
                margin: "0 0 10px",
                color: "#173368",
                fontSize: "22px",
                lineHeight: 1.4,
                fontWeight: 800,
              }}
            >
              {item.question}
            </h3>
            <p style={{ margin: 0 }}>{item.answer}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function MultiColumnTable({
  headers,
  rows,
}: {
  headers: readonly string[];
  rows: readonly (readonly string[])[];
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

function InternalArticleLink({
  prefix,
  label,
  suffix,
  href,
}: {
  prefix: string;
  label: string;
  suffix: string;
  href: string;
}) {
  return (
    <p>
      {prefix}{" "}
      <Link
        href={href}
        style={{ color: "#173368", fontWeight: 700, textDecoration: "underline" }}
      >
        {label}
      </Link>
      {suffix}
    </p>
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

function Dpgl800ArticleContent({
  copy,
  localePrefix,
}: {
  copy: Dpgl800ArticleCopy;
  localePrefix: string;
}) {
  return (
    <div className={styles.technicalArticleBody}>
      <section className={styles.contentBlock}>
        <h2>{copy.section1.title}</h2>
        {copy.section1.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </section>

      <section className={styles.contentBlock}>
        <h2>{copy.section2.title}</h2>
        <p>{copy.section2.intro}</p>
        <MultiColumnTable headers={copy.section2.headers} rows={copy.section2.rows} />
      </section>

      <section className={styles.contentBlock}>
        <h2>{copy.section3.title}</h2>
        {copy.section3.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
        <div className={styles.technicalNotice}>
          <strong>{copy.section3.noticeStrong}</strong>
          <br />
          {copy.section3.noticeText}
        </div>
      </section>

      <section className={styles.contentBlock}>
        <h2>{copy.section4.title}</h2>
        <p>{copy.section4.intro}</p>
        <MultiColumnTable headers={copy.section4.headers} rows={copy.section4.rows} />
      </section>

      <section className={styles.contentBlock}>
        <h2>{copy.section5.title}</h2>
        {copy.section5.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
        <ArticleFigure
          src={`${DPGL800_ASSET_BASE}/dpgl800-gas-flow-pressure-curve.webp`}
          alt={copy.section5.figureAlt}
          width={2363}
          height={1100}
          caption={copy.section5.figureCaption}
        />
        <div className={styles.technicalNotice}>{copy.section5.notice}</div>
      </section>

      <section className={styles.contentBlock}>
        <h2>{copy.section6.title}</h2>
        {copy.section6.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
        <ArticleFigure
          src={`${DPGL800_ASSET_BASE}/dpgl800-5l-vacuum-build-up-time-curve.webp`}
          alt={copy.section6.figureAlt}
          width={2367}
          height={1025}
          caption={copy.section6.figureCaption}
        />
        <div className={styles.technicalNotice}>{copy.section6.notice}</div>
      </section>

      <section className={styles.contentBlock}>
        <h2>{copy.section7.title}</h2>
        {copy.section7.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
        <InternalArticleLink
          prefix={copy.section7.dpl60Prefix}
          label={copy.section7.dpl60Label}
          suffix={copy.section7.dpl60Suffix}
          href={`${localePrefix}/resources/technical-articles/dpl60-liquid-diaphragm-pump-selection-guide`}
        />
      </section>

      <section className={styles.contentBlock}>
        <h2>{copy.section8.title}</h2>
        {copy.section8.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
        <ArticleFigure
          src={`${DPGL800_ASSET_BASE}/dpgl800-dimensions.webp`}
          alt={copy.section8.figureAlt}
          width={3148}
          height={1420}
          caption={copy.section8.figureCaption}
        />
        <MultiColumnTable headers={copy.section8.headers} rows={copy.section8.rows} />
      </section>

      <section className={styles.contentBlock}>
        <h2>{copy.section9.title}</h2>
        <p>{copy.section9.intro}</p>
        <div className={styles.technicalNotice}>
          <strong>{copy.section9.modelCode}</strong>
          <br />
          {copy.section9.modelCodeDescription}
        </div>
        <MultiColumnTable headers={copy.section9.headers} rows={copy.section9.rows} />
        <SectionTitle>{copy.section9.exampleTitle}</SectionTitle>
        <p>{copy.section9.exampleText}</p>
        <SectionTitle>{copy.section9.standardModelsTitle}</SectionTitle>
        <p>{copy.section9.standardModelsIntro}</p>
        <MultiColumnTable
          headers={copy.section9.standardModelHeaders}
          rows={copy.section9.standardModelRows}
        />
        <div className={styles.technicalNotice}>{copy.section9.notice}</div>
      </section>

      <section className={styles.contentBlock}>
        <h2>{copy.section10.title}</h2>
        <ol className={styles.technicalRuleList}>
          {copy.section10.steps.map(([title, description]) => (
            <li key={title}>
              <strong>{title}</strong>
              <p>{description}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className={styles.contentBlock}>
        <h2>{copy.section11.title}</h2>
        <p>{copy.section11.intro}</p>
        <MultiColumnTable headers={copy.section11.headers} rows={copy.section11.rows} />
      </section>

      <section className={styles.contentBlock}>
        <h2>{copy.conclusion.title}</h2>
        {copy.conclusion.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
        <InternalArticleLink
          prefix={copy.internalLinks.productPrefix}
          label={copy.internalLinks.productLabel}
          suffix={copy.internalLinks.productSuffix}
          href={`${localePrefix}/products/pumps/diaphragm-pumps/dpgl800-gas-liquid-diaphragm-pump`}
        />
        <InternalArticleLink
          prefix={copy.internalLinks.categoryPrefix}
          label={copy.internalLinks.categoryLabel}
          suffix={copy.internalLinks.categorySuffix}
          href={`${localePrefix}/products/pumps/diaphragm-pumps`}
        />
      </section>
    </div>
  );
}

function Dpl30hArticleContent({
  copy,
  localePrefix,
}: {
  copy: Dpl30hArticleCopy;
  localePrefix: string;
}) {
  return (
    <div className={styles.technicalArticleBody}>
      <section className={styles.contentBlock}>
        <h2>{copy.section1.title}</h2>
        {copy.section1.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </section>

      <section className={styles.contentBlock}>
        <h2>{copy.section2.title}</h2>
        <p>{copy.section2.intro}</p>
        <MultiColumnTable headers={copy.section2.headers} rows={copy.section2.rows} />
      </section>

      <section className={styles.contentBlock}>
        <h2>{copy.section3.title}</h2>
        {copy.section3.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
        <div className={styles.technicalNotice}>
          <strong>{copy.section3.noticeStrong}</strong>
          <br />
          {copy.section3.noticeText}
        </div>
      </section>

      <section className={styles.contentBlock}>
        <h2>{copy.section4.title}</h2>
        <p>{copy.section4.intro}</p>
        <MultiColumnTable headers={copy.section4.headers} rows={copy.section4.rows} />
      </section>

      <section className={styles.contentBlock}>
        <h2>{copy.section5.title}</h2>
        {copy.section5.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
        <MultiColumnTable headers={copy.section5.headers} rows={copy.section5.rows} />
        <InternalArticleLink
          prefix={copy.section5.dpl30Prefix}
          label={copy.section5.dpl30Label}
          suffix={copy.section5.dpl30Suffix}
          href={`${localePrefix}/resources/technical-articles/dpl30-liquid-diaphragm-pump-selection-guide`}
        />
      </section>

      <section className={styles.contentBlock}>
        <h2>{copy.section6.title}</h2>
        {copy.section6.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
        <ArticleFigure
          src={`${DPL30H_ASSET_BASE}/dpl30h-flow-pressure-curve.webp`}
          alt={copy.section6.figureAlt}
          width={2354}
          height={715}
          caption={copy.section6.figureCaption}
        />
        <div className={styles.technicalNotice}>{copy.section6.notice}</div>
      </section>

      <section className={styles.contentBlock}>
        <h2>{copy.section7.title}</h2>
        {copy.section7.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
        <div className={styles.technicalNotice}>
          <strong>{copy.section7.noticeStrong}</strong>
          <br />
          {copy.section7.noticeText}
        </div>
      </section>

      <section className={styles.contentBlock}>
        <h2>{copy.section8.title}</h2>
        {copy.section8.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
        <ArticleFigure
          src={`${DPL30H_ASSET_BASE}/dpl30h-brushed-dimensions.webp`}
          alt={copy.section8.brushedFigureAlt}
          width={2365}
          height={1272}
          caption={copy.section8.brushedFigureCaption}
        />
        <ArticleFigure
          src={`${DPL30H_ASSET_BASE}/dpl30h-brushless-dimensions.webp`}
          alt={copy.section8.brushlessFigureAlt}
          width={2364}
          height={1290}
          caption={copy.section8.brushlessFigureCaption}
        />
        <MultiColumnTable
          headers={copy.section8.motorHeaders}
          rows={copy.section8.motorRows}
        />
        <SectionTitle>{copy.section8.wiringTitle}</SectionTitle>
        <p>{copy.section8.wiringIntro}</p>
        <MultiColumnTable
          headers={copy.section8.wiringHeaders}
          rows={copy.section8.wiringRows}
        />
        <ul className={styles.technicalRuleList}>
          {copy.section8.wiringNotes.map((note) => (
            <li key={note}>{note}</li>
          ))}
        </ul>
      </section>

      <section className={styles.contentBlock}>
        <h2>{copy.section9.title}</h2>
        <p>{copy.section9.intro}</p>
        <MultiColumnTable headers={copy.section9.headers} rows={copy.section9.rows} />
        <div className={styles.technicalNotice}>
          <strong>{copy.section9.noticeStrong}</strong>
          <br />
          {copy.section9.noticeText}
        </div>
      </section>

      <section className={styles.contentBlock}>
        <h2>{copy.section10.title}</h2>
        <p>{copy.section10.intro}</p>
        <div className={styles.technicalNotice}>
          <strong>{copy.section10.modelCode}</strong>
          <br />
          {copy.section10.modelCodeDescription}
        </div>
        <MultiColumnTable headers={copy.section10.headers} rows={copy.section10.rows} />
        <SectionTitle>{copy.section10.standardModelsTitle}</SectionTitle>
        <p>{copy.section10.standardModelsIntro}</p>
        <MultiColumnTable
          headers={copy.section10.standardModelHeaders}
          rows={copy.section10.standardModelRows}
        />
        <div className={styles.technicalNotice}>{copy.section10.notice}</div>
        <SectionTitle>{copy.section10.stepsTitle}</SectionTitle>
        <ol className={styles.technicalRuleList}>
          {copy.section10.steps.map(([title, description]) => (
            <li key={title}>
              <strong>{title}</strong>
              <p>{description}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className={styles.contentBlock}>
        <h2>{copy.conclusion.title}</h2>
        {copy.conclusion.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
        <InternalArticleLink
          prefix={copy.internalLinks.dpl60Prefix}
          label={copy.internalLinks.dpl60Label}
          suffix={copy.internalLinks.dpl60Suffix}
          href={`${localePrefix}/resources/technical-articles/dpl60-liquid-diaphragm-pump-selection-guide`}
        />
        <InternalArticleLink
          prefix={copy.internalLinks.productPrefix}
          label={copy.internalLinks.productLabel}
          suffix={copy.internalLinks.productSuffix}
          href={`${localePrefix}/products/pumps/diaphragm-pumps/dpl30h-liquid-diaphragm-pump`}
        />
        <InternalArticleLink
          prefix={copy.internalLinks.categoryPrefix}
          label={copy.internalLinks.categoryLabel}
          suffix={copy.internalLinks.categorySuffix}
          href={`${localePrefix}/products/pumps/diaphragm-pumps`}
        />
      </section>
    </div>
  );
}

export default function Dpl30LiquidDiaphragmPumpArticle({
  locale = "zh-CN",
  articleSeries = "dpl30",
}: Dpl30LiquidDiaphragmPumpArticleProps) {
  const localePrefix = locale === "zh-CN" ? "" : `/${locale}`;

  if (articleSeries === "dpl30h") {
    return (
      <Dpl30hArticleContent
        copy={getDpl30hArticleCopy(locale)}
        localePrefix={localePrefix}
      />
    );
  }

  if (articleSeries === "dpgl800") {
    return (
      <Dpgl800ArticleContent
        copy={getDpgl800ArticleCopy(locale)}
        localePrefix={localePrefix}
      />
    );
  }

  const dpl60Copy: Dpl60ArticleCopy | null =
    articleSeries === "dpl60" ? getDpl60ArticleCopy(locale) : null;
  const copy: Dpl30ArticleCopy =
    dpl60Copy ?? getDpl30ArticleCopy(locale);
  const faqCopy = dpl60Copy
    ? getDpl60ArticleFaqCopy(locale)
    : getDpl30ArticleFaqCopy(locale);
  const assetBase = dpl60Copy ? DPL60_ASSET_BASE : DPL30_ASSET_BASE;

  return (
    <div className={styles.technicalArticleBody}>
      <section className={styles.contentBlock}>
        <h2>{copy.section1.title}</h2>
        <p>{copy.section1.paragraphs[0]}</p>
        <p>{copy.section1.paragraphs[1]}</p>
        {dpl60Copy ? null : <WorkingPrincipleDiagram copy={copy.diagram} />}
        <p>{copy.section1.paragraphs[2]}</p>
        <p>{copy.section1.paragraphs[3]}</p>
        {dpl60Copy ? (
          <InternalArticleLink
            prefix={dpl60Copy.internalLinks.dpl30Prefix}
            label={dpl60Copy.internalLinks.dpl30Label}
            suffix={dpl60Copy.internalLinks.dpl30Suffix}
            href={`${localePrefix}/resources/technical-articles/dpl30-liquid-diaphragm-pump-selection-guide`}
          />
        ) : null}
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
        <ArticleFigure
          src={dpl60Copy ? DPL60_CURVE : `${assetBase}/dpl30-flow-pressure.jpg`}
          alt={copy.section5.figureAlt}
          width={dpl60Copy ? 2366 : 750}
          height={dpl60Copy ? 778 : 610}
          caption={copy.section5.figureCaption}
        />
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
        <ArticleFigure
          src={`${assetBase}/${dpl60Copy ? "dpl60" : "dpl30"}-brushed-dimensions.webp`}
          alt={copy.section7.brushedAlt}
          width={dpl60Copy ? 2363 : 1250}
          height={dpl60Copy ? 1224 : 1120}
          caption={copy.section7.brushedCaption}
        />
        <p>{copy.section7.brushedText}</p>
        <SectionTitle>{copy.section7.brushlessTitle}</SectionTitle>
        <ArticleFigure
          src={`${assetBase}/${dpl60Copy ? "dpl60" : "dpl30"}-brushless-dimensions.webp`}
          alt={copy.section7.brushlessAlt}
          width={dpl60Copy ? 2383 : 1270}
          height={dpl60Copy ? 1281 : 1050}
          caption={copy.section7.brushlessCaption}
        />
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
        {dpl60Copy ? (
          <TwoColumnTable
            headers={dpl60Copy.section8.exampleHeaders}
            rows={dpl60Copy.section8.exampleRows}
          />
        ) : null}
        <div className={styles.technicalNotice}>{copy.section8.notice}</div>
        {dpl60Copy ? (
          <>
            <SectionTitle>{dpl60Copy.section8.standardModelsTitle}</SectionTitle>
            <p>{dpl60Copy.section8.standardModelsIntro}</p>
            <MultiColumnTable
              headers={dpl60Copy.section8.standardModelHeaders}
              rows={dpl60Copy.section8.standardModelRows}
            />
          </>
        ) : null}
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
        {dpl60Copy ? (
          <>
            <InternalArticleLink
              prefix={dpl60Copy.internalLinks.productPrefix}
              label={dpl60Copy.internalLinks.productLabel}
              suffix={dpl60Copy.internalLinks.productSuffix}
              href={`${localePrefix}/products/pumps/diaphragm-pumps/dpl60-liquid-diaphragm-pump`}
            />
            <InternalArticleLink
              prefix={dpl60Copy.internalLinks.categoryPrefix}
              label={dpl60Copy.internalLinks.categoryLabel}
              suffix={dpl60Copy.internalLinks.categorySuffix}
              href={`${localePrefix}/products/pumps/diaphragm-pumps`}
            />
          </>
        ) : null}
      </section>

      <ArticleFaq title={faqCopy.title} items={faqCopy.items} />
    </div>
  );
}
