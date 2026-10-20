"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import type { TechnicalArticleItem } from "@/data/resources/technical-articles/technical-articles.types";

import styles from "./TechnicalArticleListItem.module.css";
import { rememberArticleSource } from "./articleNavigation";

type TechnicalArticleListItemProps = {
  article: Pick<TechnicalArticleItem, "title" | "summary" | "date" | "coverAlt"> & {
    coverImage?: string | null;
  };
  categoryLabel: string;
  tags: string[];
  href: string;
};

export default function TechnicalArticleListItem({
  article,
  categoryLabel,
  tags,
  href,
}: TechnicalArticleListItemProps) {
  const [failedImage, setFailedImage] = useState<string | null>(null);
  const coverImage = article.coverImage?.trim();
  const showImage = Boolean(coverImage && failedImage !== coverImage);
  const isQuickDisconnectPhoto = coverImage?.includes("/quick-disconnect-fitting/");
  const preserveFullCover = coverImage?.endsWith("/barb-expansion-comparison-cover.webp")
    || coverImage?.endsWith("/fitting-materials-and-connection-types-cover.webp");

  return (
    <Link
      className={`${styles.row}${showImage ? "" : ` ${styles.withoutImage}`}`}
      href={href}
      onNavigate={() => rememberArticleSource(href)}
    >
      {showImage && coverImage ? (
        <div className={`${styles.thumbnail}${isQuickDisconnectPhoto ? ` ${styles.quickDisconnectPhoto}` : ""}${preserveFullCover ? ` ${styles.diagramCover}` : ""}`}>
          <Image
            src={coverImage}
            alt={article.coverAlt ?? article.title}
            fill
            sizes="(max-width: 600px) 96px, (max-width: 1280px) 148px, 180px"
            onError={() => setFailedImage(coverImage)}
          />
        </div>
      ) : null}

      <div className={styles.body}>
        <div className={styles.meta}>
          <span>{categoryLabel}</span>
          {article.date ? <time dateTime={article.date}>{article.date}</time> : null}
        </div>
        <h2 className={styles.title}>{article.title}</h2>
        {article.summary ? <p className={styles.summary}>{article.summary}</p> : null}
        {tags.length > 0 ? (
          <div className={styles.tags}>
            {tags.map((tag) => <span key={tag} className={styles.tag}>{tag}</span>)}
          </div>
        ) : null}
      </div>

    </Link>
  );
}
