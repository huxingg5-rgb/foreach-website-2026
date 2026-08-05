import Image from "next/image";
import Link from "next/link";

import type { TechnicalArticleItem } from "@/data/resources/technical-articles/technical-articles.types";

import "@/app/resources/technical-articles/technical-articles.css";

type TechnicalArticleCardProps = {
  article: TechnicalArticleItem;
  categoryLabel: string;
  tags?: string[];
  href: string;
  locale: string;
  categoryText?: string;
  detailText?: string;
  tagsText?: string;
  showSummary?: boolean;
  showDate?: boolean;
  showTags?: boolean;
  /**
   * `related` 使用无封面、无摘要的紧凑文字结构；默认列表卡片保持原样。
   */
  variant?: "default" | "related";
};

function isChinesePage(locale: string) {
  return locale === "zh-CN";
}

export default function TechnicalArticleCard({
  article,
  categoryLabel,
  tags = [],
  href,
  locale,
  categoryText,
  detailText,
  tagsText,
  showSummary = false,
  showDate = false,
  showTags = true,
  variant = "default",
}: TechnicalArticleCardProps) {
  /*
   * 关联资源卡片不渲染封面节点，直接使用标题、两行摘要和底部操作栏。
   * 所有文字仍来自文章数据和当前语言文案，标题与摘要截断由专用样式控制。
   */
  if (variant === "related") {
    return (
      <Link
        className="technicalArticleCard technicalArticleCard--related"
        href={href}
      >
        <h3 className="technicalArticleCard__title">{article.title}</h3>

        {showSummary && article.summary ? (
          <p className="technicalArticleCard__relatedSummary">
            {article.summary}
          </p>
        ) : null}

        <div className="technicalArticleCard__relatedFooter">
          {showDate ? (
            <time dateTime={article.date}>{article.date}</time>
          ) : (
            <span />
          )}

          <span className="technicalArticleCard__relatedAction">
            {detailText ?? "View details"}
          </span>
        </div>
      </Link>
    );
  }

  return (
    <Link className="technicalArticleCard" href={href}>
      <div className="technicalArticleCard__image">
        <Image
          src={article.coverImage}
          alt={article.title}
          fill
          sizes="(max-width: 760px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      <div className="technicalArticleCard__body">
        <h3 className="technicalArticleCard__title">{article.title}</h3>

        <div className="technicalArticleCard__meta">
          <span>
            {categoryText ?? (isChinesePage(locale) ? "分类：" : "Category:")}
          </span>
          <strong>{categoryLabel}</strong>
        </div>

        {showSummary && article.summary ? (
          <p className="technicalArticleCard__summary">{article.summary}</p>
        ) : null}

        {showDate ? (
          <time className="technicalArticleCard__date" dateTime={article.date}>
            {article.date}
          </time>
        ) : null}

        {showTags && tags.length > 0 ? (
          <div className="technicalArticleCard__tags">
            <span>{tagsText ?? (isChinesePage(locale) ? "标签：" : "Tags:")}</span>
            <div className="technicalArticleCard__tagList">
              {tags.map((tag) => (
                <span key={tag} className="technicalArticleCard__tag">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </Link>
  );
}
