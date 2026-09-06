import Image from "next/image";
import Link from "next/link";

import { legacyMotionArticles } from "@/data/resources/technical-articles/legacy-motion-control-articles.zh";
import { motionReadingLinks, motionFormulaBlocks, motionImageSizes } from "@/data/resources/technical-articles/legacy-motion-control-layout.zh";
import newsStyles from "../../news/NewsArticleClient.module.css";
import styles from "./DiaphragmPumpEngineeringArticle.module.css";

export default function LegacyMotionControlArticle({ slug }: { slug: string }) {
  const article = legacyMotionArticles.find((item) => item.slug === slug);
  if (!article) return null;

  const chineseSectionNumbers = ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十"];

  return (
    <div className={newsStyles.technicalArticleBody}>
      {article.sections.map((section, sectionIndex) => (
        <section className={newsStyles.contentBlock} key={section.title}>
          <h2>{`${chineseSectionNumbers[sectionIndex] ?? sectionIndex + 1}、${section.title}`}</h2>
          {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          {motionFormulaBlocks[section.title]?.map((formula) => (
            <div className={newsStyles.technicalNotice} key={formula.expression}>
              <code className={styles.formula}>{formula.expression}</code>
              <span className={styles.formulaNote}>{formula.note}</span>
            </div>
          ))}
          {section.table && (
            <div className={newsStyles.technicalTableWrap}>
              <table className={newsStyles.technicalTable}>
                <thead><tr>{section.table.headers.map((header) => <th key={header} scope="col">{header}</th>)}</tr></thead>
                <tbody>{section.table.rows.map((row, index) => (
                  <tr key={index}>{row.map((cell, cellIndex) => <td key={cellIndex}>{cellIndex === 0 ? <strong>{cell}</strong> : cell}</td>)}</tr>
                ))}</tbody>
              </table>
            </div>
          )}
          {section.figures?.map((figure) => (
            <figure className={styles.figure} key={figure.src}>
              <Image className={styles.photo} src={figure.src} alt={figure.alt}
                width={motionImageSizes[figure.src].width} height={motionImageSizes[figure.src].height}
                sizes="(max-width: 760px) 100vw, 900px" />
              <figcaption>{figure.caption}</figcaption>
            </figure>
          ))}
          {motionReadingLinks[slug]?.filter((link) => link.after === section.title).map((link) => (
            <div className={styles.linkList} key={link.target}>
              <p>{link.prefix}<Link href={`/resources/technical-articles/${link.target}/`}>{link.label}</Link>{link.suffix}</p>
            </div>
          ))}
        </section>
      ))}
      {article.refs.length > 0 && (
        <section className={newsStyles.contentBlock}>
          <h2>参考资料</h2>
          <div className={styles.linkList}>
            {article.refs.map((reference) => <p key={reference.href}><a href={reference.href} target="_blank" rel="noreferrer">{reference.label}</a></p>)}
          </div>
        </section>
      )}
    </div>
  );
}
