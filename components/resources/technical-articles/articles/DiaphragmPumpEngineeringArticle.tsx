import Image from "next/image";
import Link from "next/link";

import {
  getDiaphragmPumpEngineeringArticleCopy,
} from "@/data/resources/technical-articles/diaphragm-pump-engineering-articles.article";
import type {
  DiaphragmPumpEngineeringArticleSlug,
  EngineeringArticleBlock,
} from "@/data/resources/technical-articles/diaphragm-pump-engineering-article.types";
import type { TechnicalArticleLocale } from "@/data/resources/technical-articles/technical-articles.types";

import newsStyles from "../../news/NewsArticleClient.module.css";
import styles from "./DiaphragmPumpEngineeringArticle.module.css";

type DiaphragmPumpEngineeringArticleProps = {
  articleSlug: DiaphragmPumpEngineeringArticleSlug;
  locale: TechnicalArticleLocale;
};

function ArticleTable({
  headers,
  rows,
}: {
  headers: readonly string[];
  rows: readonly (readonly string[])[];
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
          {rows.map((row, rowIndex) => (
            <tr key={`${row[0]}-${rowIndex}`}>
              {row.map((cell, cellIndex) => (
                <td key={`${rowIndex}-${cellIndex}`}>
                  {cellIndex === 0 ? <strong>{cell}</strong> : cell}
                </td>
              ))}
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
}: Extract<EngineeringArticleBlock, { type: "figure" }>) {
  return (
    <figure className={styles.figure}>
      <Image
        className={styles.photo}
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes="(max-width: 760px) 100vw, 900px"
      />
      <figcaption>{caption}</figcaption>
    </figure>
  );
}

function ArticleBlock({ block }: { block: EngineeringArticleBlock }) {
  if (block.type === "paragraph") {
    return <p>{block.text}</p>;
  }

  if (block.type === "notice") {
    return (
      <div className={newsStyles.technicalNotice}>
        {block.label ? <strong>{block.label} </strong> : null}
        {block.text}
      </div>
    );
  }

  if (block.type === "formula") {
    return (
      <div className={newsStyles.technicalNotice}>
        <code className={styles.formula}>{block.expression}</code>
        {block.note ? <span className={styles.formulaNote}>{block.note}</span> : null}
      </div>
    );
  }

  if (block.type === "table") {
    return <ArticleTable headers={block.headers} rows={block.rows} />;
  }

  if (block.type === "figure") {
    return <ArticleFigure {...block} />;
  }

  if (block.type === "subheading") {
    return <h3 className={styles.sectionSubtitle}>{block.title}</h3>;
  }

  if (block.type === "list") {
    if (block.ordered) {
      return (
        <ol className={newsStyles.technicalRuleList}>
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
      );
    }

    return (
      <ul>
        {block.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    );
  }

  return (
    <div className={styles.linkList}>
      {block.items.map((item) => (
        <p key={`${item.href}-${item.label}`}>
          {item.prefix}
          <Link href={item.href}>{item.label}</Link>
          {item.suffix}
        </p>
      ))}
    </div>
  );
}

export default function DiaphragmPumpEngineeringArticle({
  articleSlug,
  locale,
}: DiaphragmPumpEngineeringArticleProps) {
  const copy = getDiaphragmPumpEngineeringArticleCopy(articleSlug, locale);

  return (
    <div className={newsStyles.technicalArticleBody}>
      <section className={newsStyles.contentBlock}>
        {copy.leadBlocks.map((block, index) => (
          <ArticleBlock block={block} key={`lead-${index}`} />
        ))}
      </section>

      {copy.sections.map((section) => (
        <section className={newsStyles.contentBlock} key={section.title}>
          <h2>{section.title}</h2>
          {section.blocks.map((block, index) => (
            <ArticleBlock block={block} key={`${section.title}-${index}`} />
          ))}
        </section>
      ))}

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
    </div>
  );
}
