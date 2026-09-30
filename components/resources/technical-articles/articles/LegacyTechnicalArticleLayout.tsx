import Image from "next/image";
import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import ResourceSupportCta from "@/components/resources/ResourceSupportCta";
import { NewsArticlePager } from "@/components/resources/news/NewsArticleClient";
import newsStyles from "@/components/resources/news/NewsArticleClient.module.css";
import type { TechnicalArticleLocale } from "@/data/resources/technical-articles/technical-articles.types";
import LegacyTechnicalArticleContents from "./LegacyTechnicalArticleContents";
import editorial from "./RplSelectionArticle.module.css";
import styles from "./TechnicalArticleBody.module.css";

type PagerItem = ComponentProps<typeof NewsArticlePager>["previousArticle"];

/** Keep the original body and footer data; only replace the legacy news layout. */
export default function LegacyTechnicalArticleLayout({
  articleId, locale, article, pageData, previousArticle, nextArticle, showPager = true, children, afterContent,
}: {
  articleId: string;
  locale: TechnicalArticleLocale;
  article: { title: string; date: string; summary?: string; coverImage?: string; coverAlt?: string };
  pageData: {
    listHref: string;
    backText: string;
    bottomBanner: { title: string; description: string; actions?: { label: string; href: string }[] };
  };
  previousArticle?: PagerItem;
  nextArticle?: PagerItem;
  showPager?: boolean;
  children: ReactNode;
  afterContent?: ReactNode;
}) {
  const primary = pageData.bottomBanner.actions?.[0];
  const fallbackContact = { "zh-CN": "联系我们", en: "Contact Us", es: "Contactar", fr: "Nous contacter", ko: "문의하기", ru: "Связаться" }[locale];
  return <>
    <div className={`${newsStyles.page} ${editorial.backNav}`}>
      <Link className={newsStyles.backLink} href={pageData.listHref}>{`< ${pageData.backText}`}</Link>
    </div>
    <main className={`${editorial.root} ${styles.root}`} id={`${articleId}-article`} data-editorial-article data-legacy-editorial>
      <article className={editorial.layout}>
        <header className={editorial.header} data-article-header>
          <h1>{article.title}</h1>
          <time className={editorial.date} dateTime={article.date}>{article.date}</time>
          <div className={`${editorial.meta} ${editorial.metaWithoutShare}`} aria-hidden="true"><span className={editorial.rule} /></div>
          <div className={editorial.intro}>
            {article.summary ? <p>{article.summary}</p> : null}
            {article.coverImage ? <figure className={`${newsStyles.cover} ${styles.cover}`}>
              <Image src={article.coverImage} alt={article.coverAlt ?? article.title} fill priority sizes="(max-width: 900px) 100vw, 800px" />
            </figure> : null}
          </div>
        </header>
        <aside className={editorial.sidebar} data-article-sidebar>
          <LegacyTechnicalArticleContents articleId={articleId} locale={locale} />
        </aside>
        <div className={`${editorial.body} ${styles.body}`} data-article-body>{children}</div>
      </article>
    </main>
    <div className={newsStyles.page} data-legacy-article-footer>
      {afterContent}
      {showPager && <NewsArticlePager locale={locale} previousArticle={previousArticle} nextArticle={nextArticle} contentType="article" />}
      <section className={newsStyles.supportSection}>
        <ResourceSupportCta title={pageData.bottomBanner.title} description={pageData.bottomBanner.description}
          actions={pageData.bottomBanner.actions ?? []} buttonText={primary?.label ?? fallbackContact}
          href={primary?.href ?? `${locale === "zh-CN" ? "" : `/${locale}`}/contact`} />
      </section>
    </div>
  </>;
}
