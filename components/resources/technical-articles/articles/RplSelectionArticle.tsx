import Image from "next/image";
import Link from "next/link";
import { Fragment, type ReactNode } from "react";
import type {
  DiaphragmPumpEngineeringArticleCopy,
  EngineeringArticleBlock,
  EngineeringArticleFaqItem,
} from "@/data/resources/technical-articles/diaphragm-pump-engineering-article.types";
import { ArticleEnhancements, ArticleShare } from "./RplSelectionArticleControls";
import type { TechnicalArticleLocale } from "@/data/resources/technical-articles/technical-articles.types";
import { rplArticleUi } from "@/data/resources/technical-articles/rpl-selection-locales/ui";
import { getRplSelectionProducts } from "@/data/resources/technical-articles/rpl-valveless-metering-pump-selection.article";
import newsArticleStyles from "@/components/resources/news/NewsArticleClient.module.css";
import styles from "./RplSelectionArticle.module.css";

const sectionIds = ["parameters", "models", "task", "validation", "faq"] as const;

export type RplArticleSectionNavigationItem = {
  id: string;
  label: string;
};

type RplArticleFaq = {
  id: string;
  label: string;
  items: readonly EngineeringArticleFaqItem[];
};

function renderBlock(block: EngineeringArticleBlock, key: number, headerLinks?: ReadonlyMap<string, string>): ReactNode {
  switch (block.type) {
    case "paragraph": return <p key={key}>{block.text}</p>;
    case "subheading": return <h3 className={styles.topicHeading} key={key}><span className={styles.topicMarker} aria-hidden="true" /><span>{block.title}</span></h3>;
    case "formula": return <div className={styles.formula} key={key}><p>{block.expression}</p>{block.note && <p className={styles.note}>{block.note}</p>}</div>;
    case "notice": return <aside className={styles.notice} key={key}>{block.label && <p>{block.label}</p>}<p>{block.text}</p></aside>;
    case "figure": return (
      <figure key={key} data-square={block.width === block.height ? "true" : undefined}>
        <Image
          src={block.src}
          alt={block.alt}
          width={block.width}
          height={block.height}
          sizes={block.width === block.height ? "(max-width: 700px) 100vw, 620px" : "(max-width: 820px) 100vw, 790px"}
        />
        <figcaption>{block.caption}</figcaption>
      </figure>
    );
    case "table": return renderTable(block, key, undefined, headerLinks);
    case "list": {
      const List = block.ordered ? "ol" : "ul";
      return <List className={block.ordered ? styles.numberedList : undefined} key={key}>{block.items.map((item, index) => <li key={index}>{item}</li>)}</List>;
    }
    case "links": {
      if (block.ordered) {
        return <ol className={`${styles.numberedList} ${styles.resourceList}`} key={key}>{block.items.map((item, index) => <li key={index}>{item.prefix}<a href={item.href}>{item.label}</a>{item.suffix}</li>)}</ol>;
      }
      return <p key={key}>{block.items.map((item, index) => <Fragment key={index}>{item.prefix}<a href={item.href}>{item.label}</a>{item.suffix}</Fragment>)}</p>;
    }
  }
}

function renderTable(block: Extract<EngineeringArticleBlock, { type: "table" }>, key: number, caption?: string, headerLinks?: ReadonlyMap<string, string>) {
  return (
    <div className={styles.tableWrap} key={key} tabIndex={0} role="region" aria-label={caption ?? block.headers.join(" / ")}>
      <table>
        {caption && <caption>{caption}</caption>}
        <thead><tr>{block.headers.map((cell, index) => <th scope="col" key={index}>{headerLinks?.has(cell) ? <a href={headerLinks.get(cell)}>{cell}</a> : cell}</th>)}</tr></thead>
        <tbody>{block.rows.map((row, index) => <tr key={index}>{row.map((cell, column) => column === 0
          ? <th scope="row" key={column}>{cell}</th>
          : <td key={column}>{cell}</td>)}</tr>)}</tbody>
      </table>
    </div>
  );
}

function renderBlocks(blocks: readonly EngineeringArticleBlock[], headerLinks?: ReadonlyMap<string, string>) {
  const nodes: ReactNode[] = [];
  for (let index = 0; index < blocks.length; index++) {
    const block = blocks[index];
    const next = blocks[index + 1];
    if (block.type === "paragraph" && next?.type === "table") {
      nodes.push(renderTable(next, index, block.text, headerLinks));
      index++;
    } else if (block.type === "figure") {
      const figures: ReactNode[] = [];
      const start = index;
      while (blocks[index]?.type === "figure") {
        figures.push(renderBlock(blocks[index], index));
        index++;
      }
      nodes.push(<div className={styles.gallery} key={start}>{figures}</div>);
      index--;
    } else {
      nodes.push(renderBlock(block, index, headerLinks));
    }
  }
  return nodes;
}

function renderSection(blocks: readonly EngineeringArticleBlock[], id: string, modelLinks: ReadonlyMap<string, string>) {
  if (id === "faq") {
    return <div className={styles.faq}>{blocks.map((block, index) => {
      const answer = blocks[index + 1];
      return block.type === "subheading" && answer?.type === "paragraph"
        ? <details key={index} open={index === 0}><summary>{block.title}</summary><p>{answer.text}</p></details>
        : null;
    })}</div>;
  }
  if (id === "validation") {
    const firstHeading = blocks.findIndex(block => block.type === "subheading");
    const tableIndex = blocks.findIndex(block => block.type === "table");
    const end = tableIndex - 1; // The paragraph before the table becomes its caption.
    const steps: { heading: string; blocks: EngineeringArticleBlock[] }[] = [];
    for (const block of blocks.slice(firstHeading, end)) {
      if (block.type === "subheading") steps.push({ heading: block.title, blocks: [] });
      else steps[steps.length - 1]?.blocks.push(block);
    }
    return <>
      {renderBlocks(blocks.slice(0, firstHeading))}
      <ol className={styles.steps}>{steps.map(step => <li key={step.heading}><h3>{step.heading}</h3>{renderBlocks(step.blocks)}</li>)}</ol>
      {renderBlocks(blocks.slice(end))}
    </>;
  }
  return renderBlocks(blocks, id === "models" ? modelLinks : undefined);
}

/** Opt-in editorial template first used by the RPL guide and reusable by selected technical articles. */
export default function RplSelectionArticle({
  copy,
  date,
  locale,
  listHref,
  backText,
  articleId = "rpl-selection",
  sectionNavigation: suppliedSectionNavigation,
  faq,
  modelLinks: suppliedModelLinks,
}: {
  copy: DiaphragmPumpEngineeringArticleCopy;
  date: string;
  locale: TechnicalArticleLocale;
  listHref: string;
  backText: string;
  articleId?: string;
  sectionNavigation?: readonly RplArticleSectionNavigationItem[];
  faq?: RplArticleFaq;
  modelLinks?: ReadonlyMap<string, string>;
}) {
  const ui = rplArticleUi[locale];
  const defaultModelLinks = new Map(getRplSelectionProducts(locale).map(product => [product.name, product.href]));
  const modelLinks = suppliedModelLinks ?? defaultModelLinks;
  const defaultSectionNavigation = sectionIds.map((id, index) => ({ id, label: ui.sections[index] }));
  const sectionNavigation = copy.sections.map((section, index) =>
    suppliedSectionNavigation?.[index] ??
      defaultSectionNavigation[index] ?? {
        id: `section-${index + 1}`,
        label: section.title,
      },
  );
  const fullNavigation = faq?.items.length
    ? [...sectionNavigation, { id: faq.id, label: faq.label }]
    : sectionNavigation;
  const titleId = `${articleId}-article-title`;
  const formattedDate = new Intl.DateTimeFormat(locale, { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" }).format(new Date(`${date}T00:00:00Z`));
  return (
    <>
      <div className={`${newsArticleStyles.page} ${styles.backNav}`}>
        <Link className={newsArticleStyles.backLink} href={listHref} data-article-back-link>
          {`< ${backText}`}
        </Link>
      </div>
    <main className={styles.root} id={`${articleId}-article`} data-editorial-article>
      <article className={styles.layout} aria-labelledby={titleId}>
        <header className={styles.header} data-article-header>
          <h1 id={titleId}>{copy.metadata.title}</h1>
          <time className={styles.date} dateTime={date}>{formattedDate}</time>
          <div className={`${styles.meta} ${locale === "zh-CN" ? styles.metaWithoutShare : ""}`}>
            <span className={styles.rule} data-meta-rule aria-hidden="true" />
            {locale !== "zh-CN" && <ArticleShare title={copy.metadata.title} locale={locale} />}
          </div>
          <div className={styles.intro}>{renderBlocks(copy.leadBlocks)}</div>
        </header>
        <aside className={styles.sidebar} data-article-sidebar>
          <nav className={styles.toc} aria-label={ui.contents}>
            <p className={styles.tocLabel} data-toc-label>{ui.contents}</p>
            {fullNavigation.map((item, index) => <a key={item.id} href={`#${item.id}`} data-toc-link aria-current={index === 0 ? "location" : undefined}><span>{String(index + 1).padStart(2, "0")}</span>{item.label}</a>)}
          </nav>
        </aside>
        <div className={styles.body} data-article-body>
          {copy.sections.map((section, index) => {
            const id = sectionNavigation[index].id;
            return <section id={id} key={id} aria-labelledby={`${id}-title`}><h2 className={styles.numberedHeading} id={`${id}-title`}><span className={styles.sectionNumber}>{String(index + 1).padStart(2, "0")}</span><span>{section.title}</span></h2>{renderSection(section.blocks, id, modelLinks)}</section>;
          })}
          {faq?.items.length ? (
            <section id={faq.id} aria-labelledby={`${faq.id}-title`}>
              <h2 className={styles.numberedHeading} id={`${faq.id}-title`}>
                <span className={styles.sectionNumber}>{String(copy.sections.length + 1).padStart(2, "0")}</span>
                <span>{faq.label}</span>
              </h2>
              <div className={styles.faq}>
                {faq.items.map((item, index) => (
                  <details key={item.question} open={index === 0}>
                    <summary>{item.question}</summary>
                    <p>{item.answer}</p>
                  </details>
                ))}
              </div>
            </section>
          ) : null}
        </div>
      </article>
      <ArticleEnhancements articleId={articleId} locale={locale} />
    </main>
    </>
  );
}
