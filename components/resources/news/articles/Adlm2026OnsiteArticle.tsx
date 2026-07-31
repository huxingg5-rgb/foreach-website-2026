import Image from "next/image";

import { getAdlm2026OnsiteCopy } from "@/data/resources/news/adlm-2026-onsite";

import styles from "../NewsArticleClient.module.css";

type Adlm2026OnsiteArticleProps = {
  locale: string;
};

export default function Adlm2026OnsiteArticle({
  locale,
}: Adlm2026OnsiteArticleProps) {
  const copy = getAdlm2026OnsiteCopy(locale);

  return (
    <>
      <article className={styles.contentBlock}>
        <h2>{copy.openingTitle}</h2>

        {copy.openingParagraphs.map(
          (paragraph, index) => (
            <p key={index}>{paragraph}</p>
          )
        )}
      </article>

      <figure className={styles.articleMedia}>
        <div className={styles.articleMediaImage}>
          <Image
            src="/images/resources/news/adlm-2026-onsite/002.webp"
            alt={copy.firstImageAlt}
            fill
            sizes="(max-width: 1320px) 100vw, 1280px"
          />
        </div>
        <figcaption>{copy.firstImageCaption}</figcaption>
      </figure>

      <article className={styles.contentBlock}>
        <h2>{copy.teamTitle}</h2>

        {copy.teamParagraphs.map(
          (paragraph, index) => (
            <p key={index}>{paragraph}</p>
          )
        )}
      </article>

      <article className={styles.contentBlock}>
        <h2>{copy.eventTitle}</h2>

        <div
          className={styles.pagerGrid}
          aria-label={copy.eventTitle}
        >
          {copy.eventInformation.map((item) => (
            <div
              className={styles.pagerCard}
              key={item.label}
            >
              <span>{item.label}</span>
              <strong>{item.value}</strong>
            </div>
          ))}
        </div>
      </article>

      <article className={styles.contentBlock}>
        <h2>{copy.discussionTitle}</h2>

        {copy.discussionParagraphs.map(
          (paragraph, index) => (
            <p key={index}>{paragraph}</p>
          )
        )}

        <p>{copy.discussionLead}</p>

        <ul>
          {copy.discussionItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </article>

      <article className={styles.contentBlock}>
        <h2>{copy.meetingTitle}</h2>

        {copy.meetingParagraphs.map(
          (paragraph, index) => (
            <p key={index}>{paragraph}</p>
          )
        )}
      </article>

      <figure className={styles.articleMedia}>
        <div className={styles.articleMediaImage}>
          <Image
            src="/images/resources/news/adlm-2026-onsite/003.webp"
            alt={copy.secondImageAlt}
            fill
            sizes="(max-width: 1320px) 100vw, 1280px"
          />
        </div>
        <figcaption>{copy.secondImageCaption}</figcaption>
      </figure>
    </>
  );
}
