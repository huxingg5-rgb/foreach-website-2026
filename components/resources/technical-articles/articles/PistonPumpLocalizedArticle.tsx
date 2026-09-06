import Image from "next/image";
import Link from "next/link";

import type {
  PistonPumpArticleCopy,
  PistonPumpArticleLink,
  PistonPumpArticlePart,
} from "@/data/resources/technical-articles/piston-pump-articles.types";
import type { TechnicalArticleLocale } from "@/data/resources/technical-articles/technical-articles.types";
import newsStyles from "../../news/NewsArticleClient.module.css";
import styles from "./DiaphragmPumpEngineeringArticle.module.css";

function getLocalizedHref(href: string, locale: TechnicalArticleLocale) {
  if (!href.startsWith("/") || locale === "zh-CN") return href;
  return `/${locale}${href}`;
}

function ArticleLinks({
  items,
  locale,
}: {
  items: readonly PistonPumpArticleLink[];
  locale: TechnicalArticleLocale;
}) {
  return (
    <div className={styles.linkList}>
      {items.map((item) => (
        <p key={`${item.href}-${item.label}`}>
          {item.prefix}
          {item.href.startsWith("/") ? (
            <Link href={getLocalizedHref(item.href, locale)}>{item.label}</Link>
          ) : (
            <a href={item.href} rel="noreferrer" target="_blank">
              {item.label}
            </a>
          )}
          {item.suffix}
        </p>
      ))}
    </div>
  );
}

function ArticlePart({
  part,
  locale,
}: {
  part: PistonPumpArticlePart;
  locale: TechnicalArticleLocale;
}) {
  if (part.type === "paragraph") return <p>{part.text}</p>;

  if (part.type === "notice") {
    return (
      <div className={newsStyles.technicalNotice}>
        {part.label ? <strong>{part.label}</strong> : null}
        {part.text}
      </div>
    );
  }

  if (part.type === "formula") {
    return (
      <div className={newsStyles.technicalNotice}>
        <code className={styles.formula}>{part.expression}</code>
        <span className={styles.formulaNote}>{part.note}</span>
      </div>
    );
  }

  if (part.type === "bullets") {
    return (
      <ul>
        {part.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    );
  }

  if (part.type === "steps") {
    return (
      <ol className={newsStyles.technicalRuleList}>
        {part.items.map((item) => (
          <li key={`${item.label}-${item.text}`}>
            <strong>{item.label}:</strong> {item.text}
          </li>
        ))}
      </ol>
    );
  }

  if (part.type === "table") {
    return (
      <div className={newsStyles.technicalTableWrap}>
        <table className={newsStyles.technicalTable}>
          <thead>
            <tr>
              {part.headers.map((header) => (
                <th key={header} scope="col">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {part.rows.map((row, rowIndex) => (
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

  if (part.type === "subsections") {
    return (
      <>
        {part.items.map((item, index) => (
          <div key={item.title}>
            <h3 className={styles.sectionSubtitle}>
              {index + 1}. {item.title}
            </h3>
            {item.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        ))}
      </>
    );
  }

  if (part.type === "figures") {
    return (
      <>
        {part.items.map((item) => (
          <figure className={styles.figure} key={item.src}>
            <Image
              alt={item.alt}
              className={styles.photo}
              height={item.height}
              sizes="(max-width: 760px) 100vw, 900px"
              src={item.src}
              width={item.width}
            />
            <figcaption>{item.caption}</figcaption>
          </figure>
        ))}
      </>
    );
  }

  return <ArticleLinks items={part.items} locale={locale} />;
}

function ArticleParts({
  parts,
  locale,
}: {
  parts: readonly PistonPumpArticlePart[];
  locale: TechnicalArticleLocale;
}) {
  return parts.map((part, index) => (
    <ArticlePart
      key={`${part.type}-${index}`}
      locale={locale}
      part={part}
    />
  ));
}

export default function PistonPumpLocalizedArticle({
  copy,
  locale,
}: {
  copy: PistonPumpArticleCopy;
  locale: TechnicalArticleLocale;
}) {
  return (
    <div className={newsStyles.technicalArticleBody} lang={locale}>
      <section className={newsStyles.contentBlock}>
        <ArticleParts locale={locale} parts={copy.intro} />
      </section>

      {copy.sections.map((section, sectionIndex) => (
        <section className={newsStyles.contentBlock} key={section.title}>
          <h2>
            {sectionIndex + 1}. {section.title}
          </h2>
          <ArticleParts locale={locale} parts={section.parts} />
        </section>
      ))}

      {copy.faq?.length ? (
        <section className={newsStyles.contentBlock}>
          <h2>{copy.faqTitle ?? "FAQ"}</h2>
          <div className={styles.faqList}>
            {copy.faq.map((item) => (
              <article className={styles.faqItem} key={item.question}>
                <h3>{item.question}</h3>
                <p>{item.answer}</p>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      {copy.conclusion ? (
        <section className={newsStyles.contentBlock}>
          <h2>{copy.conclusion.title}</h2>
          <ArticleParts locale={locale} parts={copy.conclusion.parts} />
        </section>
      ) : null}

      {copy.references?.length ? (
        <section className={newsStyles.contentBlock}>
          <h2>{copy.referencesTitle ?? "References"}</h2>
          <ArticleLinks items={copy.references} locale={locale} />
        </section>
      ) : null}
    </div>
  );
}
