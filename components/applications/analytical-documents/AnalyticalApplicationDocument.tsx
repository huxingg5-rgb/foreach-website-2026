import "server-only";

import Link from "next/link";
import { Fragment, type ReactNode } from "react";
import SiteBreadcrumb from "@/components/common/SiteBreadcrumb";
import RelatedResourcesLoader from "@/components/common/related-resources/RelatedResourcesLoader";
import {
  analyticalDocumentHref,
  analyticalDocuments,
} from "@/data/applications/analytical-documents/registry";
import { isLiquidChromatographySlug, liquidChromatographyDocuments } from "@/data/applications/analytical-documents/liquid-chromatography";
import { getEnglishAnalyticalInstrumentLinks } from "@/data/applications/analytical-instruments/navigation";
import {
  isPistonApplicationSlug,
  PISTON_APPLICATION_RELATION_KEYS,
} from "@/data/applications/analytical-documents/piston-link-network";
import type {
  ApplicationBlock,
  ApplicationDocument,
  ApplicationInlineLink,
  ApplicationLink,
  ApplicationReference,
} from "@/data/applications/analytical-documents/types";
import { getRelatedResourcesData } from "@/services/resources/getRelatedResourcesData";
import { getLiquidChromatographyResources } from "@/services/applications/liquid-chromatography-resources";
import ApplicationGuideNavigation, {
  type ApplicationGuideNavigationGroup,
} from "@/components/applications/application-guide-navigation/ApplicationGuideNavigation";
import DocumentEnhancements from "./DocumentEnhancements";
import styles from "./AnalyticalApplicationDocument.module.css";

type ReferenceMap = ReadonlyMap<string, { reference: ApplicationReference; number: number }>;

function ContentLink({
  href,
  children,
  className,
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  if (/^https?:\/\//i.test(href) || /\.pdf(?:[?#]|$)/i.test(href)) {
    return <a className={className} href={href} target="_blank" rel="noopener noreferrer">{children}</a>;
  }
  if (href.startsWith("#")) return <a className={className} href={href}>{children}</a>;
  return <Link className={className} href={href} prefetch={false}>{children}</Link>;
}

function Citations({ ids, referenceMap }: { ids?: readonly string[]; referenceMap: ReferenceMap }) {
  if (!ids?.length) return null;
  return (
    <sup className={styles.citations}>
      {ids.map((id) => {
        const entry = referenceMap.get(id);
        if (!entry) throw new Error(`Unknown analytical application reference: ${id}`);
        return (
          <a
            key={id}
            href={`#ref-${id}`}
            data-application-reference
            aria-label={`Reference ${entry.number}: ${entry.reference.title}`}
          >
            [{entry.number}]
          </a>
        );
      })}
    </sup>
  );
}

function LinkList({ items }: { items: readonly ApplicationLink[] }) {
  return (
    <ul className={styles.linkList}>
      {items.map((item) => (
        <li key={`${item.href}-${item.label}`}>
          <ContentLink href={item.href}>{item.label}</ContentLink>
          {item.description ? <p>{item.description}</p> : null}
        </li>
      ))}
    </ul>
  );
}

function InlineLinkedText({
  text,
  links = [],
}: {
  text: string;
  links?: readonly ApplicationInlineLink[];
}) {
  if (!links.length) return text;

  function findWholePhrase(phrase: string) {
    let searchFrom = 0;
    const phraseStartsWithWord = /^[A-Za-z0-9]/.test(phrase);
    const phraseEndsWithWord = /[A-Za-z0-9]$/.test(phrase);

    while (searchFrom <= text.length - phrase.length) {
      const start = text.indexOf(phrase, searchFrom);
      if (start < 0) return -1;

      const before = start > 0 ? text[start - 1] : "";
      const after = start + phrase.length < text.length
        ? text[start + phrase.length]
        : "";
      const hasStartBoundary = !phraseStartsWithWord || !/[A-Za-z0-9]/.test(before);
      const hasEndBoundary = !phraseEndsWithWord || !/[A-Za-z0-9]/.test(after);

      if (hasStartBoundary && hasEndBoundary) return start;
      searchFrom = start + 1;
    }

    return -1;
  }

  const matches = links
    .map((link, sourceIndex) => ({
      link,
      sourceIndex,
      start: findWholePhrase(link.text),
    }))
    .map((match) => {
      if (match.start < 0) {
        throw new Error(`Inline analytical application link text not found: ${match.link.text}`);
      }
      return { ...match, end: match.start + match.link.text.length };
    })
    .sort((first, second) => first.start - second.start || first.sourceIndex - second.sourceIndex);

  for (let index = 1; index < matches.length; index += 1) {
    if (matches[index].start < matches[index - 1].end) {
      throw new Error(
        `Overlapping analytical application inline links: ${matches[index - 1].link.text} / ${matches[index].link.text}`,
      );
    }
  }

  const output: ReactNode[] = [];
  let cursor = 0;

  matches.forEach(({ link, start, end }) => {
    if (start > cursor) output.push(text.slice(cursor, start));
    output.push(
      <ContentLink className={styles.inlineLink} key={`${start}-${link.href}`} href={link.href}>
        <span title={link.title}>{link.text}</span>
      </ContentLink>,
    );
    cursor = end;
  });

  if (cursor < text.length) output.push(text.slice(cursor));
  return <>{output}</>;
}

function Block({ block, referenceMap }: { block: ApplicationBlock; referenceMap: ReferenceMap }) {
  const citations = <Citations ids={block.references} referenceMap={referenceMap} />;
  switch (block.type) {
    case "paragraph":
      return <p><InlineLinkedText text={block.text} links={block.inlineLinks} />{citations}</p>;
    case "subheading":
      return <h3 className={styles.topicHeading}><span className={styles.topicMarker} aria-hidden="true" /><span>{block.title}{citations}</span></h3>;
    case "table":
      return (
        <div>
          <div className={styles.tableScroll} role="region" aria-label={block.caption} tabIndex={0}>
            <table>
              <caption>{block.caption}{citations}</caption>
              <thead><tr>{block.headers.map((header, index) => <th scope="col" key={index}>{header}</th>)}</tr></thead>
              <tbody>
                {block.rows.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {row.map((cell, cellIndex) => cellIndex === 0
                      ? <th scope="row" key={cellIndex}>{cell}</th>
                      : <td key={cellIndex}>{cell}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {block.note ? <p className={styles.note}>{block.note}</p> : null}
        </div>
      );
    case "list": {
      const List = block.ordered ? "ol" : "ul";
      return (
        <div className={styles.listBlock}>
          <List>{block.items.map((item, index) => <li key={index}>{item}</li>)}</List>
          {block.references?.length ? <p className={styles.citationRow}><span className={styles.visuallyHidden}>Sources:</span>{citations}</p> : null}
        </div>
      );
    }
    case "flow":
      return (
        <figure className={styles.flow}>
          <div className={styles.flowDiagram} data-node-count={block.nodes.length} role="list" aria-label={block.caption}>
            {block.nodes.map((node, index) => (
              <Fragment key={index}>
                {index > 0 ? <span className={styles.flowArrow} aria-hidden="true">→</span> : null}
                <span className={`${styles.flowNode}${index === block.focusIndex ? ` ${styles.flowFocus}` : ""}`} role="listitem">{node}</span>
              </Fragment>
            ))}
          </div>
          <figcaption>{block.caption}{citations}</figcaption>
          {block.note ? <p className={styles.note}>{block.note}</p> : null}
        </figure>
      );
    case "callout":
      return (
        <aside className={styles.callout}>
          {block.title ? <strong>{block.title}</strong> : null}
          <p><InlineLinkedText text={block.text} links={block.inlineLinks} />{citations}</p>
        </aside>
      );
    case "links":
      return (
        <div>
          <LinkList items={block.items} />
          {block.references?.length ? <p className={styles.citationRow}><span className={styles.visuallyHidden}>Sources:</span>{citations}</p> : null}
        </div>
      );
    default: {
      const exhaustive: never = block;
      throw new Error(`Unsupported analytical application block: ${JSON.stringify(exhaustive)}`);
    }
  }
}

function DocumentNavigation({ currentSlug }: { currentSlug: string }) {
  if (!currentSlug) {
    const instruments = getEnglishAnalyticalInstrumentLinks();
    return <ApplicationGuideNavigation
      id="analytical-application-guide-navigation"
      ariaLabel="Analytical instrument categories"
      overview={{ label: "Analytical Instruments", href: analyticalDocumentHref("") }}
      groups={instruments.map((item, index) => ({
        id: `instrument-${index}`,
        label: item.label,
        overview: { label: item.label, href: item.href },
        children: [],
      }))}
      currentHref={analyticalDocumentHref("")}
      mobileTitle="Analytical instrument categories"
      mobileMeta={`${instruments.length} instrument categories`}
      drawerEyebrow="Applications"
      drawerTitle="Analytical Instruments"
    />;
  }
  const isLc = isLiquidChromatographySlug(currentSlug);
  const overview = isLc ? liquidChromatographyDocuments[0] : analyticalDocuments[0];
  const parents = analyticalDocuments.filter((entry) => entry.kind === "overview"
    && (isLc ? isLiquidChromatographySlug(entry.slug) && entry.slug !== "liquid-chromatography" : !isLiquidChromatographySlug(entry.slug)));
  const groups: ApplicationGuideNavigationGroup[] = parents.map((parent) => ({
    id: parent.slug,
    label: parent.navLabel,
    overview: {
      label: parent.navLabel,
      href: analyticalDocumentHref(parent.slug),
    },
    children: analyticalDocuments
      .filter((entry) => entry.kind === "task" && entry.group === parent.slug)
      .map((entry) => ({
        label: entry.navLabel,
        href: analyticalDocumentHref(entry.slug),
      })),
  }));
  const currentGroup = groups.find((group) => (
    group.overview.href === analyticalDocumentHref(currentSlug)
    || group.children.some((entry) => entry.href === analyticalDocumentHref(currentSlug))
  ));
  const compactGroupTitle = currentGroup
    ? `${currentGroup.label.replace(/ in analytical instruments$/i, "")} application guides`
    : isLc ? "Liquid chromatography application guides" : "Analytical instrument application guides";

  return (
    <ApplicationGuideNavigation
      key={currentSlug}
      id="analytical-application-guide-navigation"
      ariaLabel={isLc ? "Liquid chromatography application guides" : "Analytical instrument application guides"}
      overview={{
        label: overview.navLabel,
        href: analyticalDocumentHref(overview.slug),
      }}
      groups={groups}
      currentHref={analyticalDocumentHref(currentSlug)}
      mobileTitle={compactGroupTitle}
      mobileMeta={currentGroup
        ? `${currentGroup.children.length} guide${currentGroup.children.length === 1 ? "" : "s"} in this series`
        : `${groups.length} guide series`}
      drawerEyebrow="Application guides"
      drawerTitle={isLc ? "Liquid chromatography" : "Analytical instruments"}
    />
  );
}

function Outline({ document }: { document: ApplicationDocument }) {
  return (
    <nav aria-label="On this page" className={styles.outlineNavigation}>
      <p className={styles.outlineTitle}>ON THIS PAGE</p>
      <div className={styles.outlineLinks}>
        {document.sections.map((section) => (
          <a key={section.id} href={`#${section.id}`} data-outline-link={section.id}>
            {section.title}
          </a>
        ))}
        {document.references.length ? <a href="#references" data-outline-link="references">References</a> : null}
        {document.related?.length ? <a href="#related-guides" data-outline-link="related-guides">Related guides</a> : null}
      </div>
    </nav>
  );
}

export default function AnalyticalApplicationDocument({
  document,
  embedded = false,
}: {
  document: ApplicationDocument;
  embedded?: boolean;
}) {
  const referenceMap: ReferenceMap = new Map(document.references.map((reference, index) => [reference.id, { reference, number: index + 1 }]));
  const rootId = "analytical-application-document";
  const isHub = document.kind === "hub";
  const breadcrumbItems = [
    { label: "Home", href: "/en/" },
    { label: "Analytical instruments", href: isHub ? undefined : analyticalDocumentHref("") },
    ...(!isHub ? [{ label: document.navLabel }] : []),
  ];
  const relatedResources = isLiquidChromatographySlug(document.slug)
    ? getLiquidChromatographyResources(document.slug)
    : isPistonApplicationSlug(document.slug)
    ? getRelatedResourcesData({
        sourceType: "application",
        sourceId: `analytical-application:${document.slug}`,
        sourceSlug: document.slug,
        relationKeys: PISTON_APPLICATION_RELATION_KEYS,
        locale: "en",
      })
    : null;
  const documentRelatedResources = relatedResources
    ? { ...relatedResources, videos: [] }
    : null;

  return (
    <div className={`${styles.page}${embedded ? ` ${styles.embeddedPage}` : ""}`} id={rootId} lang="en">
      {!embedded ? (
        <SiteBreadcrumb
          ariaLabel="Breadcrumb"
          items={breadcrumbItems}
          className={styles.analyticalBreadcrumb}
        />
      ) : null}

      <div className={styles.root}>
        <main className={styles.layout}>
          <header className={styles.articleHeader}>
            <h1 id="application-document-title">{document.title}</h1>
            <span className={styles.documentType}>{document.eyebrow}</span>
            <div className={styles.meta}><span className={styles.headerRule} aria-hidden="true" /></div>
            <div className={styles.intro}>
              {document.intro.map((block, index) => <Block key={index} block={block} referenceMap={referenceMap} />)}
            </div>
          </header>

          <aside className={styles.sidebar}>
            <DocumentNavigation currentSlug={document.slug} />
          </aside>

          <aside className={styles.outline}>
            <Outline document={document} />
          </aside>

          <article
            className={styles.articleBody}
            aria-labelledby="application-document-title"
          >
          {document.sections.map((section, index) => (
            <section key={section.id} id={section.id} data-document-section className={styles.documentSection} aria-labelledby={`${section.id}-heading`}>
              <h2 id={`${section.id}-heading`} className={styles.numberedHeading}>
                <span className={styles.sectionNumber} aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                <span>{section.title}</span>
              </h2>
              {section.blocks.map((block, blockIndex) => <Block key={blockIndex} block={block} referenceMap={referenceMap} />)}
            </section>
          ))}

          {document.references.length ? <section id="references" className={styles.documentSection} data-document-section aria-labelledby="references-heading">
            <h2 id="references-heading">References</h2>
            <details className={styles.referenceDisclosure} data-reference-disclosure>
              <summary>View references ({document.references.length})</summary>
              <ol className={styles.referenceList}>
                {document.references.map((reference, index) => (
                  <li key={reference.id} id={`ref-${reference.id}`} tabIndex={-1} data-reference-item>
                    <span className={styles.referenceNumber}>[{index + 1}]</span>
                    <ContentLink href={reference.href}>{reference.title}</ContentLink>
                  </li>
                ))}
              </ol>
            </details>
          </section> : null}

          {document.related?.length ? <section id="related-guides" className={styles.documentSection} data-document-section aria-labelledby="related-guides-heading">
            <h2 id="related-guides-heading">Related guides</h2>
            <LinkList items={document.related} />
          </section> : null}
          </article>
        </main>
        <DocumentEnhancements rootId={rootId} documentSlug={document.slug} />
      </div>
      {documentRelatedResources &&
      (documentRelatedResources.products.length || documentRelatedResources.articles.length) ? (
        <RelatedResourcesLoader {...documentRelatedResources} />
      ) : null}
    </div>
  );
}
