import Link from "next/link";
import SitePageShell from "@/components/layout/SitePageShell";
import RelatedResourcesLoader from "@/components/common/related-resources/RelatedResourcesLoader";
import ArticleRelatedProducts from "@/components/resources/technical-articles/ArticleRelatedProducts";
import { getRelatedResourcesData } from "@/services/resources/getRelatedResourcesData";
import { getVideoGuideRelatedProducts } from "@/services/resources/installation-guide/getVideoGuideRelatedProducts";
import LegacyTechnicalArticleLayout from "@/components/resources/technical-articles/articles/LegacyTechnicalArticleLayout";
import editorial from "@/components/resources/technical-articles/articles/RplSelectionArticle.module.css";
import styles from "@/components/resources/technical-articles/articles/TechnicalArticleBody.module.css";
import videoLayout from "./VideoGuideDetailPage.module.css";
import type { VideoGuideDetail } from "@/data/resources/installation-guide/video-guide-detail.types";
import { videoGuideUi } from "@/data/resources/installation-guide/product-video-copy";
import { getCanonicalUrl } from "@/lib/seo/site-url";
import { HOME_SITE_IDENTITY, SITE_ORGANIZATION_ID } from "@/lib/seo/site-identity";
import "@/app/resources/technical-articles/technical-articles.css";
import "@/app/resources/news/news.css";

export default function VideoGuideDetailPage({ video }: { video: VideoGuideDetail }) {
  const locale = video.locale;
  const ui = videoGuideUi[locale];
  const prefix = locale === "zh-CN" ? "" : `/${locale}`;
  const useUpdatedLayout = !["sv10-solenoid-valve-overview", "youtube-syringe-installation"].includes(video.id);
  const products = getVideoGuideRelatedProducts(video.id, "sidebar", locale);
  const footerProducts = getVideoGuideRelatedProducts(video.id, "footer", locale);
  const relatedResources = getRelatedResourcesData({
    sourceType: "video", sourceId: video.id, relationKeys: video.relationKeys, locale,
  });
  const url = getCanonicalUrl(video.detailHref);
  const videoSchema = {
    "@type": "VideoObject",
    "@id": `${url}#video`,
    name: video.media?.title ?? video.title,
    description: video.media?.description ?? video.description,
    thumbnailUrl: [video.thumbnail],
    uploadDate: video.uploadDate,
    duration: video.duration,
    embedUrl: video.embedUrl,
    url,
    inLanguage: "en",
    publisher: { "@id": SITE_ORGANIZATION_ID },
  };
  const breadcrumbItems = [
    { label: ui.home, href: `${prefix}/` },
    { label: ui.guides, href: `${prefix}/resources/installation-guide/` },
    { label: video.breadcrumbLabel },
  ];

  return <div className={`newsArticleDetailPage ${editorial.pageSurface} ${useUpdatedLayout ? videoLayout.page : ""}`} data-video-guide-detail data-show-footer-products data-locale={video.locale} data-article-slug={video.id} lang={locale}>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [...HOME_SITE_IDENTITY["@graph"], videoSchema,
      ...(video.leadParagraphs ? [{ "@type": "WebPage", "@id": url,
        url, name: video.title, description: video.description, inLanguage: locale,
        mainEntity: { "@id": `${url}#video` }, publisher: { "@id": SITE_ORGANIZATION_ID },
      }] : []),
      { "@type": "BreadcrumbList",
        itemListElement: breadcrumbItems.map((item, index) => ({
          "@type": "ListItem", position: index + 1, name: item.label,
          item: item.href ? getCanonicalUrl(item.href) : url,
        })) },
      ],
    }).replace(/</g, "\\u003c") }} />
    <SitePageShell breadcrumbItems={breadcrumbItems}>
    <LegacyTechnicalArticleLayout
      articleId={video.id}
      locale={locale}
      showPager={false}
      relatedProducts={products.length ? <ArticleRelatedProducts products={products} locale={locale} /> : null}
      afterContent={
        <RelatedResourcesLoader {...relatedResources} products={footerProducts} />
      }
      article={{ title: video.title, date: video.uploadDate.slice(0, 10), summary: video.lead ?? video.description, summaryParagraphs: video.leadParagraphs }}
      pageData={{
        listHref: `${prefix}/resources/installation-guide/`,
        backText: ui.back,
        bottomBanner: {
          title: video.support.title,
          description: video.support.description,
          actions: [{ label: ui.contact, href: `${prefix}/contact/` }],
        },
      }}
    >
      <section className={styles.contentBlock} aria-labelledby={`${video.sectionId}-video`}>
        <h2 id={`${video.sectionId}-video`}>{video.watchHeading}</h2>
        <figure className={styles.figure}>
          <iframe src={video.embedUrl} title={video.media?.title ?? video.title}
            style={{ display: "block", width: "100%", aspectRatio: "16 / 9", border: 0 }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen referrerPolicy="strict-origin-when-cross-origin" />
          <figcaption>{video.caption} · {video.durationLabel} · FOREACH</figcaption>
        </figure>
        <p><a href={video.watchUrl} target="_blank" rel="noopener noreferrer">{ui.watch} ↗</a></p>
      </section>
      <section className={styles.contentBlock} aria-labelledby={`${video.sectionId}-overview`}>
        <h2 id={`${video.sectionId}-overview`}>{video.highlightsHeading ?? ui.highlights}</h2>
        <p>{video.highlightsIntroduction}</p>
        <ul>
          {video.highlights.map(highlight => <li key={highlight.title}>
            <p>
              {highlight.start !== undefined && highlight.time ? <><a href={`${video.watchUrl}&t=${highlight.start}s`} target="_blank" rel="noopener noreferrer"
                aria-label={`Watch ${highlight.title.toLowerCase()} at ${highlight.time} on YouTube`}>
                {highlight.time}
              </a>{" — "}</> : null}<strong>{highlight.title}</strong>
              <br />{highlight.description}
            </p>
          </li>)}
        </ul>
      </section>
      {video.sections?.map(section => <section className={styles.contentBlock}
        key={section.id} aria-labelledby={`${video.sectionId}-${section.id}`}>
        <h2 id={`${video.sectionId}-${section.id}`}>{section.title}</h2>
        {section.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
        {section.links?.map(link => <p key={link.href}><Link href={link.href}>{link.title}</Link></p>)}
      </section>)}
      <section className={styles.contentBlock} aria-labelledby={`${video.sectionId}-products`}>
        <h2 id={`${video.sectionId}-products`}>{video.productHeading}</h2>
        <p>{video.productIntroduction}</p>
        <div className={styles.linkList}>
          {video.products.map(product => <p key={product.href}>
            <Link href={product.href}>{product.title}</Link>
          </p>)}
          {video.seriesLink ? <p><Link href={video.seriesLink.href}>{video.seriesLink.title}</Link></p> : null}
        </div>
      </section>
    </LegacyTechnicalArticleLayout>
    </SitePageShell>
  </div>;
}
