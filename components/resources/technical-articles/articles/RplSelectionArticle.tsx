import Image from "next/image";
import Link from "next/link";
import { Fragment, type ReactNode } from "react";
import type {
  DiaphragmPumpEngineeringArticleCopy,
  EngineeringArticleBlock,
} from "@/data/resources/technical-articles/diaphragm-pump-engineering-article.types";
import { ArticleEnhancements, ArticleShare } from "./RplSelectionArticleControls";
import type { TechnicalArticleLocale } from "@/data/resources/technical-articles/technical-articles.types";
import { rplArticleUi } from "@/data/resources/technical-articles/rpl-selection-locales/ui";
import { getRplSelectionProducts } from "@/data/resources/technical-articles/rpl-valveless-metering-pump-selection.article";
import newsArticleStyles from "@/components/resources/news/NewsArticleClient.module.css";
import styles from "./RplSelectionArticle.module.css";

const sectionIds = ["parameters", "models", "task", "validation", "faq"] as const;

function renderBlock(block: EngineeringArticleBlock, key: number, headerLinks?: ReadonlyMap<string, string>): ReactNode {
  switch (block.type) {
    case "paragraph": return <p key={key}>{block.text}</p>;
    case "subheading": return <h3 className={styles.topicHeading} key={key}><span className={styles.topicMarker} aria-hidden="true" /><span>{block.title}</span></h3>;
    case "formula": return <div className={styles.formula} key={key}><p>{block.expression}</p>{block.note && <p className={styles.note}>{block.note}</p>}</div>;
    case "notice": return <aside className={styles.notice} key={key}>{block.label && <p>{block.label}</p>}<p>{block.text}</p></aside>;
    case "figure": return (
      <figure key={key}>
        <Image src={block.src} alt={block.alt} width={block.width} height={block.height} sizes="(max-width: 600px) 28vw, 255px" />
        <figcaption>{block.caption}</figcaption>
      </figure>
    );
    case "table": return renderTable(block, key, undefined, headerLinks);
    case "list": {
      const List = block.ordered ? "ol" : "ul";
      return <List key={key}>{block.items.map((item, index) => <li key={index}>{item}</li>)}</List>;
    }
    case "links": return <p key={key}>{block.items.map((item, index) => <Fragment key={index}>{item.prefix}<a href={item.href}>{item.label}</a>{item.suffix}</Fragment>)}</p>;
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

/** Opt-in template for this RPL article in six languages. Other article layouts remain intact. */
export default function RplSelectionArticle({ copy, date, locale, listHref, backText }: {
  copy: DiaphragmPumpEngineeringArticleCopy;
  date: string;
  locale: TechnicalArticleLocale;
  listHref: string;
  backText: string;
}) {
  const ui = rplArticleUi[locale];
  const modelLinks = new Map(getRplSelectionProducts(locale).map(product => [product.name, product.href]));
  const sectionNavigation = sectionIds.map((id, index) => ({ id, label: ui.sections[index] }));
  const formattedDate = new Intl.DateTimeFormat(locale, { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" }).format(new Date(`${date}T00:00:00Z`));
  return (
    <>
      <div className={`${newsArticleStyles.page} ${styles.backNav}`}>
        <Link className={newsArticleStyles.backLink} href={listHref} data-article-back-link>
          {`< ${backText}`}
        </Link>
      </div>
    <main className={styles.root} id="rpl-selection-article" data-editorial-article>
      <article className={styles.layout} aria-labelledby="rpl-article-title">
        <header className={styles.header} data-article-header>
          <h1 id="rpl-article-title">{copy.metadata.title}</h1>
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
            {sectionNavigation.map((item, index) => <a key={item.id} href={`#${item.id}`} data-toc-link aria-current={index === 0 ? "location" : undefined}><span>{String(index + 1).padStart(2, "0")}</span>{item.label}</a>)}
          </nav>
        </aside>
        <div className={styles.body} data-article-body>
          {copy.sections.map((section, index) => {
            const id = sectionNavigation[index].id;
            return <section id={id} key={id} aria-labelledby={`${id}-title`}><h2 className={styles.numberedHeading} id={`${id}-title`}><span className={styles.sectionNumber}>{String(index + 1).padStart(2, "0")}</span><span>{section.title}</span></h2>{renderSection(section.blocks, id, modelLinks)}</section>;
          })}
        </div>
      </article>
      <ArticleEnhancements />
    </main>
    </>
  );
}
