import { getLocalizedTechnicalFormula } from "@/data/resources/technical-articles/localized-formula-text";
import Image from "next/image";
import Link from "next/link";

import {
  getDiaphragmPumpEngineeringArticleCopy,
} from "@/data/resources/technical-articles/diaphragm-pump-engineering-articles.article";
import type {
  DiaphragmPumpEngineeringArticleSlug,
  EngineeringArticleBlock,
  DiaphragmPumpEngineeringArticleCopy,
} from "@/data/resources/technical-articles/diaphragm-pump-engineering-article.types";
import type { TechnicalArticleLocale } from "@/data/resources/technical-articles/technical-articles.types";
import { getLocalizedInternalHref } from "@/lib/seo/site-url";
import { getHindiDraftLink, getItalianDraftLink, hindiEnglishFallbackSuffix, italianEnglishFallbackSuffix } from "@/lib/i18n/draft-languages";
import { getGermanArticleDestination } from "@/lib/i18n/german-article-link";

import newsStyles from "./TechnicalArticleBody.module.css";
import styles from "./TechnicalArticleBody.module.css";
import SamplingProbeDiagram from "./SamplingProbeDiagram";

type EngineeringArticleLocale = TechnicalArticleLocale | "de" | "it" | "hi";

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

const germanArticleDiagrams: Readonly<Partial<Record<string, string>>> = {
  "/images/resources/technical-articles/pump-application-guides/wash-branches-en.svg":
    "/images/resources/technical-articles/pump-application-guides/wash-branches-de.svg",
  "/images/resources/technical-articles/pump-application-guides/reservoir-vent-en.svg":
    "/images/resources/technical-articles/pump-application-guides/reservoir-vent-de.svg",
  "/images/resources/technical-articles/diaphragm-pump-rd/en/02.svg":
    "/images/resources/technical-articles/diaphragm-pump-rd/de/02.svg",
  "/images/resources/technical-articles/diaphragm-pump-rd/en/03.svg":
    "/images/resources/technical-articles/diaphragm-pump-rd/de/03.svg",
  "/images/resources/technical-articles/pump-application-guides/piston-cycle-en.svg":
    "/images/resources/technical-articles/pump-application-guides/piston-cycle-de.svg",
  "/images/resources/technical-articles/diaphragm-pump-rd/en/04.svg":
    "/images/resources/technical-articles/diaphragm-pump-rd/de/04.svg",
};

function ArticleFigure({
  src: originalSrc,
  alt,
  width,
  height,
  caption,
  samplingProbeDiagram,
  locale,
}: Extract<EngineeringArticleBlock, { type: "figure" }> & { locale: EngineeringArticleLocale }) {
  const src = locale === "de" ? germanArticleDiagrams[originalSrc] ?? originalSrc : originalSrc;
  return (
    <figure className={styles.figure}>
      {samplingProbeDiagram && locale !== "zh-CN" && locale !== "hi"
        ? <SamplingProbeDiagram kind={samplingProbeDiagram} locale={locale} src={src} alt={alt} width={width} height={height} />
        : <Image className={styles.photo} src={src} alt={alt} width={width} height={height}
            sizes="(max-width: 760px) 100vw, 900px" />}
      <figcaption>
        {caption}
        {src.includes("/pump-application-guides/") || src.includes("/pump-diagnostics/") ? (
          <> <a href={src} target="_blank" rel="noreferrer">{{ "zh-CN": "查看大图", en: "Open diagram", es: "Abrir diagrama", fr: "Ouvrir le schéma", ko: "도식 크게 보기", ru: "Открыть схему", de: "Schaubild öffnen", it: "Apri lo schema", hi: "आरेख खोलें" }[locale]}</a></>
        ) : null}
      </figcaption>
    </figure>
  );
}

export function ArticleBlock({
  block,
  locale,
}: {
  block: EngineeringArticleBlock;
  locale: EngineeringArticleLocale;
}) {
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
        <code className={styles.formula}>{getLocalizedTechnicalFormula(block.expression, locale)}</code>
        {block.note ? <span className={styles.formulaNote}>{block.note}</span> : null}
      </div>
    );
  }

  if (block.type === "table") {
    return <ArticleTable headers={block.headers} rows={block.rows} />;
  }

  if (block.type === "figure") {
    return <ArticleFigure {...block} locale={locale} />;
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
      {block.items.map((item) => {
        const localizedHref = getLocalizedInternalHref(item.href, locale === "de" || locale === "it" || locale === "hi" ? "en" : locale);
        const localizedLink = locale === "it" ? getItalianDraftLink(localizedHref) : locale === "hi" ? getHindiDraftLink(localizedHref) : undefined;
        const destination = locale === "de" ? getGermanArticleDestination(localizedHref) : { href: localizedLink?.href ?? localizedHref, destinationLanguage: localizedLink?.hrefLang };
        return (
          <p key={`${item.href}-${item.label}`}>
            {item.prefix}
            <Link href={destination.href} hrefLang={destination.destinationLanguage}>
              {item.label}{destination.destinationLanguage === "en" && locale === "hi" ? hindiEnglishFallbackSuffix : destination.destinationLanguage === "en" && locale === "it" ? italianEnglishFallbackSuffix : destination.destinationLanguage === "en" && !item.label.endsWith("(Englisch)") ? " (Englisch)" : null}
            </Link>
            {item.suffix}
          </p>
        );
      })}
    </div>
  );
}

export default function DiaphragmPumpEngineeringArticle({
  articleSlug,
  locale,
}: DiaphragmPumpEngineeringArticleProps) {
  const copy = getDiaphragmPumpEngineeringArticleCopy(articleSlug, locale);
  return <EngineeringArticleContent copy={copy} locale={locale}
    useShortTocLabels={articleSlug === "ink-starvation-inkjet-troubleshooting" ||
      articleSlug === "inkjet-printer-pumps-micro-diaphragm-pumps"} />;
}

export function EngineeringArticleContent({
  copy,
  locale,
  useShortTocLabels = false,
  sectionIds,
}: {
  copy: DiaphragmPumpEngineeringArticleCopy;
  locale: EngineeringArticleLocale;
  useShortTocLabels?: boolean;
  sectionIds?: readonly string[];
}) {
  return (
    <div className={newsStyles.technicalArticleBody}>
      <section className={newsStyles.contentBlock}>
        {copy.leadBlocks.map((block, index) => (
          <ArticleBlock block={block} locale={locale} key={`lead-${index}`} />
        ))}
      </section>

      {copy.sections.map((section, index) => (
        <section className={newsStyles.contentBlock} key={section.title}>
          <h2 id={sectionIds?.[index]} data-toc-label={useShortTocLabels ? section.tocLabel : undefined}>{section.title}</h2>
          {section.blocks.map((block, index) => (
            <ArticleBlock
              block={block}
              locale={locale}
              key={`${section.title}-${index}`}
            />
          ))}
        </section>
      ))}

      {copy.faqItems.length > 0 && (
      <section className={newsStyles.contentBlock}>
        <h2 id={sectionIds ? "faq" : undefined}>{copy.faqTitle}</h2>
        <div className={styles.faqList}>
          {copy.faqItems.map((item, index) => (
            <details className={styles.faqItem} key={item.question} open={index === 0}>
              <summary><h3>{item.question}</h3></summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </section>
      )}
    </div>
  );
}
