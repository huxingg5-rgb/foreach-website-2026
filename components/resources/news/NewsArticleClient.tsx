/* =========================================================
   NewsArticleClient.tsx
   恒永达官网｜公司新闻详情页组件

   说明：
   1. 展示新闻标题、日期、封面图和正文内容
   2. 面包屑和底部 CTA 使用已有共用组件
   3. 不在这里写搜索逻辑
========================================================= */

import type { ComponentType } from "react";

import Image from "next/image";
import Link from "next/link";

import SiteBreadcrumb from "@/components/common/SiteBreadcrumb";
import ResourceSupportCta from "@/components/resources/ResourceSupportCta";

import type {
  NewsArticle,
  NewsPageData,
} from "@/data/resources/news/news.types";

interface NewsArticleClientProps {
  pageData: NewsPageData;
  article: NewsArticle;
}

type SharedComponentProps = Record<string, unknown>;

const BreadcrumbComponent =
  SiteBreadcrumb as ComponentType<SharedComponentProps>;

const SupportCtaComponent =
  ResourceSupportCta as ComponentType<SharedComponentProps>;

function isChinesePage(locale: string) {
  return locale === "zh-CN";
}

function getNewsListHref(locale: string) {
  if (isChinesePage(locale)) {
    return "/resources/news";
  }

  return `/${locale}/resources/news`;
}

export default function NewsArticleClient({
  pageData,
  article,
}: NewsArticleClientProps) {
  const newsListHref = getNewsListHref(pageData.locale);

  const breadcrumbs = pageData.breadcrumbs.map((item, index) => {
    const isLastItem = index === pageData.breadcrumbs.length - 1;

    if (isLastItem) {
      return {
        ...item,
        href: newsListHref,
      };
    }

    return item;
  });

  const articleBreadcrumbs = [
    ...breadcrumbs,
    {
      label: article.title,
    },
  ];

  return (
    <main className="newsPage">
      <BreadcrumbComponent
        items={articleBreadcrumbs}
        breadcrumbs={articleBreadcrumbs}
        breadcrumbItems={articleBreadcrumbs}
      />

      <article className="newsArticle">
        <div className="newsArticle__header">
          <Link className="newsArticle__back" href={newsListHref}>
            返回新闻列表
          </Link>

          <h1 className="newsArticle__title">{article.title}</h1>
          <time className="newsArticle__date">{article.date}</time>
          <p className="newsArticle__summary">{article.summary}</p>
        </div>

        <div className="newsArticle__cover">
          <Image
            src={article.coverImage}
            alt={article.title}
            fill
            sizes="(max-width: 1200px) 100vw, 1200px"
            priority
          />
        </div>

        <div className="newsArticle__content">
          {article.content.map((block) => (
            <section key={block.title} className="newsArticle__block">
              <h2>{block.title}</h2>
              <p>{block.content}</p>
            </section>
          ))}
        </div>
      </article>

      <SupportCtaComponent
        title={pageData.bottomBanner.title}
        description={pageData.bottomBanner.description}
        buttonText={pageData.bottomBanner.actions[0]?.label ?? "联系我们"}
        href={pageData.bottomBanner.actions[0]?.href ?? "/contact"}
      />
    </main>
  );
} 