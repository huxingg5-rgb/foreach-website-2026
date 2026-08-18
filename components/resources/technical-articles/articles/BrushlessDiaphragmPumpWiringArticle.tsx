import Image from "next/image";
import Link from "next/link";

import {
  brushlessWiringArticleImages,
  getBrushlessWiringArticleCopy,
} from "@/data/resources/technical-articles/brushless-diaphragm-pump-2-wire-vs-5-wire.article";
import type {
  BrushlessWiringArticleCopy,
  BrushlessWiringComparisonRow,
  BrushlessWiringDiagramCopy,
  BrushlessWiringTableRow,
} from "@/data/resources/technical-articles/brushless-diaphragm-pump-2-wire-vs-5-wire.types";
import type { TechnicalArticleLocale } from "@/data/resources/technical-articles/technical-articles.types";

import newsStyles from "../../news/NewsArticleClient.module.css";
import styles from "./BrushlessDiaphragmPumpWiringArticle.module.css";

type BrushlessDiaphragmPumpWiringArticleProps = {
  locale?: TechnicalArticleLocale;
};

function TwoColumnTable({
  headers,
  rows,
}: {
  headers: readonly [string, string];
  rows: readonly BrushlessWiringTableRow[];
}) {
  return (
    <div className={newsStyles.technicalTableWrap}>
      <table className={newsStyles.technicalTable}>
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={header}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map(([label, value]) => (
            <tr key={label}>
              <td>
                <strong>{label}</strong>
              </td>
              <td>{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ComparisonTable({
  headers,
  rows,
}: {
  headers: readonly [string, string, string];
  rows: readonly BrushlessWiringComparisonRow[];
}) {
  return (
    <div className={newsStyles.technicalTableWrap}>
      <table className={newsStyles.technicalTable}>
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={header}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map(([label, twoWire, fiveWire]) => (
            <tr key={label}>
              <td>
                <strong>{label}</strong>
              </td>
              <td>{twoWire}</td>
              <td>{fiveWire}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ArticleFigure({
  src,
  alt,
  width,
  height,
  caption,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption: string;
}) {
  return (
    <figure className={styles.figure}>
      <Image
        className={styles.photo}
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes="(max-width: 760px) 100vw, 1280px"
      />
      <figcaption>{caption}</figcaption>
    </figure>
  );
}

function WiringDiagram({ copy }: { copy: BrushlessWiringDiagramCopy }) {
  return (
    <figure className={styles.figure}>
      <svg
        className={styles.wiringDiagram}
        viewBox="0 0 920 470"
        role="img"
        aria-label={copy.ariaLabel}
      >
        <rect x="18" y="24" width="425" height="395" rx="18" fill="#fff" stroke="#d9e1ea" />
        <text x="48" y="70" fill="#173368" fontSize="26" fontWeight="700">
          {copy.twoWireTitle}
        </text>
        <text x="48" y="97" fill="#667085" fontSize="13">
          {copy.twoWireSubtitle}
        </text>

        <rect x="48" y="127" width="174" height="126" rx="16" fill="#173368" />
        <text x="135" y="176" textAnchor="middle" fill="#fff" fontSize="18" fontWeight="700">
          {copy.motor}
        </text>
        <text x="135" y="207" textAnchor="middle" fill="#dce7f5" fontSize="13">
          {copy.integratedDriver}
        </text>

        <circle cx="222" cy="157" r="5" fill="#e53935" />
        <line x1="227" y1="157" x2="326" y2="157" stroke="#e53935" strokeWidth="7" strokeLinecap="round" />
        <circle cx="222" cy="215" r="5" fill="#1f2937" />
        <line x1="227" y1="215" x2="326" y2="215" stroke="#1f2937" strokeWidth="7" strokeLinecap="round" />

        <text x="338" y="153" fill="#173368" fontSize="14" fontWeight="700">VCC</text>
        <text x="338" y="173" fill="#667085" fontSize="11">{copy.redPower}</text>
        <text x="338" y="211" fill="#173368" fontSize="14" fontWeight="700">GND</text>
        <text x="338" y="231" fill="#667085" fontSize="11">{copy.blackGround}</text>

        <rect x="48" y="284" width="365" height="108" rx="12" fill="#f5f8fb" />
        <text x="66" y="312" fill="#173368" fontSize="14" fontWeight="700">
          {copy.typicalUse}
        </text>
        {copy.twoWireUses.map((item, index) => (
          <text key={item} x="66" y={338 + index * 22} fill="#667085" fontSize="12">
            {`• ${item}`}
          </text>
        ))}

        <rect x="477" y="24" width="425" height="395" rx="18" fill="#fff" stroke="#d9e1ea" />
        <text x="507" y="70" fill="#173368" fontSize="26" fontWeight="700">
          {copy.fiveWireTitle}
        </text>
        <text x="507" y="97" fill="#667085" fontSize="13">
          {copy.fiveWireSubtitle}
        </text>

        <rect x="507" y="122" width="174" height="154" rx="16" fill="#173368" />
        <text x="594" y="177" textAnchor="middle" fill="#fff" fontSize="18" fontWeight="700">
          {copy.motor}
        </text>
        <text x="594" y="208" textAnchor="middle" fill="#dce7f5" fontSize="13">
          {copy.controlInterface}
        </text>

        {[
          ["VCC", "#e53935", 139, false],
          ["GND", "#1f2937", 171, false],
          ["PWM", "#2563eb", 203, true],
          ["DIR", "#f0b429", 235, true],
          ["FG", "#16a36a", 267, true],
        ].map(([label, color, y, optional]) => (
          <g key={String(label)}>
            <circle cx="681" cy={Number(y)} r="5" fill={String(color)} />
            <line
              x1="686"
              y1={Number(y)}
              x2="786"
              y2={Number(y)}
              stroke={String(color)}
              strokeWidth="7"
              strokeLinecap="round"
            />
            <text x="800" y={Number(y) + 5} fill="#173368" fontSize="13" fontWeight="700">
              {String(label)}
            </text>
            {optional ? (
              <text x="842" y={Number(y) + 5} fill="#667085" fontSize="10">
                {copy.optional}
              </text>
            ) : null}
          </g>
        ))}

        <rect x="507" y="298" width="365" height="94" rx="12" fill="#f5f8fb" />
        <text x="525" y="326" fill="#173368" fontSize="14" fontWeight="700">
          {copy.typicalUse}
        </text>
        <text x="525" y="351" fill="#667085" fontSize="11.5">
          {`• ${copy.fiveWireUses[0]}　• ${copy.fiveWireUses[1]}`}
        </text>
        <text x="525" y="376" fill="#667085" fontSize="11.5">
          {`• ${copy.fiveWireUses[2]}　• ${copy.fiveWireUses[3]}`}
        </text>

        <rect x="178" y="436" width="564" height="24" rx="12" fill="#e7fff8" />
        <text x="460" y="453" textAnchor="middle" fill="#173368" fontSize="11" fontWeight="700">
          {copy.footer}
        </text>
      </svg>
      <figcaption>{copy.caption}</figcaption>
    </figure>
  );
}

function SectionSubtitle({ children }: { children: string }) {
  return <h3 className={styles.sectionSubtitle}>{children}</h3>;
}

function ExpandedFaq({ copy }: { copy: BrushlessWiringArticleCopy }) {
  return (
    <section className={newsStyles.contentBlock}>
      <h2>{copy.faqTitle}</h2>
      <div className={styles.faqList}>
        {copy.faqItems.map((item) => (
          <article className={styles.faqItem} key={item.question}>
            <h3>{item.question}</h3>
            <p>{item.answer}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default function BrushlessDiaphragmPumpWiringArticle({
  locale = "zh-CN",
}: BrushlessDiaphragmPumpWiringArticleProps) {
  const copy = getBrushlessWiringArticleCopy(locale);
  const localePrefix = locale === "zh-CN" ? "" : `/${locale}`;

  return (
    <div className={newsStyles.technicalArticleBody}>
      <section className={newsStyles.contentBlock}>
        <h2>{copy.conclusion.title}</h2>
        <div className={newsStyles.technicalNotice}>
          <strong>{copy.conclusion.label}</strong> {copy.conclusion.text}
        </div>
      </section>

      <section className={newsStyles.contentBlock}>
        <h2>{copy.twoWire.title}</h2>
        <p>{copy.twoWire.intro}</p>
        <TwoColumnTable headers={copy.twoWire.headers} rows={copy.twoWire.rows} />
        {copy.twoWire.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
        <ArticleFigure
          src={brushlessWiringArticleImages.twoWire}
          alt={copy.twoWire.figureAlt}
          width={1021}
          height={683}
          caption={copy.twoWire.figureCaption}
        />
        <SectionSubtitle>{copy.twoWire.selectionTitle}</SectionSubtitle>
        <p>{copy.twoWire.selectionIntro}</p>
        <ul>
          {copy.twoWire.selectionItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p>{copy.twoWire.closing}</p>
      </section>

      <section className={newsStyles.contentBlock}>
        <h2>{copy.fiveWire.title}</h2>
        <p>{copy.fiveWire.intro}</p>
        <p>{copy.fiveWire.exampleIntro}</p>
        <TwoColumnTable headers={copy.fiveWire.headers} rows={copy.fiveWire.rows} />
        {copy.fiveWire.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
        <ArticleFigure
          src={brushlessWiringArticleImages.fiveWire}
          alt={copy.fiveWire.figureAlt}
          width={1017}
          height={615}
          caption={copy.fiveWire.figureCaption}
        />
        <SectionSubtitle>{copy.fiveWire.selectionTitle}</SectionSubtitle>
        <p>{copy.fiveWire.selectionIntro}</p>
        <ul>
          {copy.fiveWire.selectionItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p>{copy.fiveWire.closing}</p>
      </section>

      <section className={newsStyles.contentBlock}>
        <h2>{copy.diagramSectionTitle}</h2>
        <WiringDiagram copy={copy.diagram} />
      </section>

      <section className={newsStyles.contentBlock}>
        <h2>{copy.comparison.title}</h2>
        <ComparisonTable headers={copy.comparison.headers} rows={copy.comparison.rows} />
        <p>
          <strong>{copy.comparison.conclusion}</strong>
        </p>
      </section>

      <section className={newsStyles.contentBlock}>
        <h2>{copy.selection.title}</h2>
        <p>{copy.selection.intro}</p>
        <SectionSubtitle>{copy.selection.twoWireTitle}</SectionSubtitle>
        <p>{copy.selection.twoWireIntro}</p>
        <div className={newsStyles.technicalNotice}>
          <strong>{copy.selection.twoWireLogicTitle}</strong>
          <br />
          {copy.selection.twoWireLogic}
        </div>
        <p>{copy.selection.twoWireClosing}</p>
        <SectionSubtitle>{copy.selection.fiveWireTitle}</SectionSubtitle>
        <p>{copy.selection.fiveWireIntro}</p>
        <div className={newsStyles.technicalNotice}>
          <strong>{copy.selection.fiveWireLogicTitle}</strong>
          <br />
          {copy.selection.fiveWireLogic}
        </div>
        <p>{copy.selection.fiveWireClosing}</p>
        <p>{copy.selection.decision}</p>
        <p>{copy.selection.fixedSpeedCaution}</p>
        <p>{copy.selection.futureControl}</p>
        <div className={newsStyles.technicalNotice}>
          <strong>{copy.selection.confusionTitle}</strong>
          <br />
          {copy.selection.confusionText}
        </div>
      </section>

      <section className={newsStyles.contentBlock}>
        <h2>{copy.products.title}</h2>
        <p>{copy.products.intro}</p>
        <div className={styles.productGrid}>
          {copy.products.cards.map((card) => (
            <Link
              className={styles.productCard}
              href={`${localePrefix}/products/pumps/diaphragm-pumps/${card.slug}`}
              key={card.model}
            >
              <span>{card.label}</span>
              <strong>{card.model}</strong>
              <small>{card.note}</small>
            </Link>
          ))}
        </div>
        {copy.products.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </section>

      <ExpandedFaq copy={copy} />

      <aside className={`${newsStyles.technicalNotice} ${styles.sourceNote}`}>
        {copy.sourceNote}
      </aside>
    </div>
  );
}
