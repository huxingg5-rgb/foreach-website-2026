import Link from "next/link";

import type { ProductApplicationsContent } from "@/data/products/detail/product-detail.types";

import styles from "./ProductApplicationsPanel.module.css";

type ProductApplicationsPanelProps = {
  content: ProductApplicationsContent;
};

export default function ProductApplicationsPanel({
  content,
}: ProductApplicationsPanelProps) {
  return (
    <section
      className={styles.applications}
      data-product-applications="true"
    >
      <header className={styles.header}>
        <h2>{content.title}</h2>

        <div className={styles.intro}>
          {content.intro.map((paragraph, index) => (
            <p key={`${index}-${paragraph}`}>{paragraph}</p>
          ))}
        </div>
      </header>

      <div className={styles.grid}>
        {content.items.map((item) => (
          <article className={styles.item} key={item.title}>
            <h3>{item.title}</h3>

            {item.paragraphs.map((paragraph, index) => (
              <p key={`${index}-${paragraph}`}>{paragraph}</p>
            ))}
          </article>
        ))}
      </div>

      {content.motorComparison ? (
        <section
          className={styles.motorComparison}
          data-product-motor-comparison="true"
        >
          <h2>{content.motorComparison.title}</h2>

          <div className={styles.motorComparisonGrid}>
            <div className={styles.motorComparisonColumn}>
              <h3>{content.motorComparison.brushed.title}</h3>

              {content.motorComparison.brushed.paragraphs.map(
                (paragraph, index) => (
                  <p key={`${index}-${paragraph}`}>{paragraph}</p>
                ),
              )}
            </div>

            <div className={styles.motorComparisonColumn}>
              <h3>{content.motorComparison.brushless.title}</h3>

              {content.motorComparison.brushless.paragraphs.map(
                (paragraph, index) => (
                  <p key={`${index}-${paragraph}`}>{paragraph}</p>
                ),
              )}
            </div>
          </div>

          {content.motorComparison.counterpartHref &&
          content.motorComparison.counterpartLinkText ? (
            <Link
              className={styles.articleLink}
              href={content.motorComparison.counterpartHref}
            >
              {content.motorComparison.counterpartLinkText}
            </Link>
          ) : null}
        </section>
      ) : null}

      <section className={styles.selectionNote}>
        <h3>{content.selectionNote.title}</h3>

        {content.selectionNote.paragraphs.map((paragraph, index) => (
          <p key={`${index}-${paragraph}`}>{paragraph}</p>
        ))}

        {content.selectionNote.articleHref &&
        content.selectionNote.linkText ? (
          <Link
            className={styles.articleLink}
            href={content.selectionNote.articleHref}
          >
            {content.selectionNote.linkText}
          </Link>
        ) : null}
      </section>
    </section>
  );
}
