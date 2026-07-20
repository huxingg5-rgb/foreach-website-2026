/* =========================================================
   TechnicalArticleDetail.tsx
   恒永达官网｜技术文章详情页组件

   说明：
   1. 展示技术文章标题、日期、封面图和正文内容
   2. 面包屑和底部 CTA 使用已有共用组件
========================================================= */

import type { ComponentType } from "react";

import Image from "next/image";
import Link from "next/link";

import SiteBreadcrumb from "@/components/common/SiteBreadcrumb";
import ResourceSupportCta from "@/components/resources/ResourceSupportCta";

import type {
  TechnicalArticleItem,
  TechnicalArticlesPageData,
} from "@/data/resources/technical-articles/technical-articles.types";

interface TechnicalArticleDetailProps {
  pageData: TechnicalArticlesPageData;
  article: TechnicalArticleItem;
}

type SharedComponentProps = Record<string, unknown>;

const BreadcrumbComponent =
  SiteBreadcrumb as ComponentType<SharedComponentProps>;

const SupportCtaComponent =
  ResourceSupportCta as ComponentType<SharedComponentProps>;

function isChinesePage(locale: string) {
  return locale === "zh-CN";
}

function getArticleListHref(locale: string) {
  if (isChinesePage(locale)) {
    return "/resources/technical-articles";
  }

  return `/${locale}/resources/technical-articles`;
}

const technicalDetailUi: Record<string, { back: string; contact: string }> = {
  es: { back: "Volver a los artículos técnicos", contact: "Contactar" },
  fr: { back: "Retour aux articles techniques", contact: "Nous contacter" },
  ko: { back: "기술 자료 목록으로", contact: "문의하기" },
  ru: { back: "Вернуться к техническим статьям", contact: "Связаться" },
};

export default function TechnicalArticleDetail({
  pageData,
  article,
}: TechnicalArticleDetailProps) {
  const listHref = getArticleListHref(pageData.locale);
  const ui = technicalDetailUi[pageData.locale];

  const breadcrumbs = pageData.breadcrumbs.map((item, index) => {
    const isLastItem = index === pageData.breadcrumbs.length - 1;

    if (isLastItem) {
      return {
        ...item,
        href: listHref,
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
    <main className="technicalArticlesPage">
      <BreadcrumbComponent
        items={articleBreadcrumbs}
        breadcrumbs={articleBreadcrumbs}
        breadcrumbItems={articleBreadcrumbs}
      />

      <article className="technicalArticleDetail">
        <div className="technicalArticleDetail__header">
          <Link className="technicalArticleDetail__back" href={listHref}>
            {ui?.back ?? (isChinesePage(pageData.locale)
              ? "返回技术文章列表"
              : "Back to Technical Articles")}
          </Link>

          <h1 className="technicalArticleDetail__title">{article.title}</h1>
          <time className="technicalArticleDetail__date">{article.date}</time>
          <p className="technicalArticleDetail__summary">{article.summary}</p>
        </div>

        <div className="technicalArticleDetail__cover">
          <Image
            src={article.coverImage}
            alt={article.title}
            fill
            sizes="(max-width: 1200px) 100vw, 1200px"
            priority
          />
        </div>

        <div className="technicalArticleDetail__content">
          {article.content.map((block) => (
            <section key={block.title} className="technicalArticleDetail__block">
              <h2>{block.title}</h2>
              <p>{block.content}</p>
            </section>
          ))}
        </div>
      </article>

      <SupportCtaComponent
        title={pageData.bottomBanner.title}
        description={pageData.bottomBanner.description}
        buttonText={
          pageData.bottomBanner.actions[0]?.label ??
          (ui?.contact ?? (isChinesePage(pageData.locale) ? "联系我们" : "Contact Us"))
        }
        href={pageData.bottomBanner.actions[0]?.href ?? "/contact"}
      />
    </main>
  );
}
