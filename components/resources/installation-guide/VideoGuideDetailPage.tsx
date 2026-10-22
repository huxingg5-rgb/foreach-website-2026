import Link from "next/link";
import SiteBreadcrumb from "@/components/common/SiteBreadcrumb";
import RelatedResourcesLoader from "@/components/common/related-resources/RelatedResourcesLoader";
import ArticleRelatedProducts from "@/components/resources/technical-articles/ArticleRelatedProducts";
import { getRelatedResourcesData } from "@/services/resources/getRelatedResourcesData";
import { getVideoGuideRelatedProducts } from "@/services/resources/installation-guide/getVideoGuideRelatedProducts";
import LegacyTechnicalArticleLayout from "@/components/resources/technical-articles/articles/LegacyTechnicalArticleLayout";
import editorial from "@/components/resources/technical-articles/articles/RplSelectionArticle.module.css";
import styles from "@/components/resources/technical-articles/articles/TechnicalArticleBody.module.css";
import videoLayout from "./VideoGuideDetailPage.module.css";
import type { VideoGuideDetail } from "@/data/resources/installation-guide/video-guide-detail.types";
import { getCanonicalUrl } from "@/lib/seo/site-url";
import { HOME_SITE_IDENTITY, SITE_ORGANIZATION_ID } from "@/lib/seo/site-identity";
import "@/app/resources/technical-articles/technical-articles.css";
import "@/app/resources/news/news.css";

export default function VideoGuideDetailPage({ video }: { video: VideoGuideDetail }) {
  const useUpdatedLayout = !["sv10-solenoid-valve-overview", "youtube-syringe-installation"].includes(video.id);
  const products = getVideoGuideRelatedProducts(video.id);
  const footerProducts = getVideoGuideRelatedProducts(video.id, "footer");
  const relatedResources = getRelatedResourcesData({
    sourceType: "video", sourceId: video.id, relationKeys: video.relationKeys, locale: "en",
  });
  const url = getCanonicalUrl(video.detailHref);
  const videoSchema = {
    "@type": "VideoObject",
    name: video.title,
    description: video.description,
    thumbnailUrl: [video.thumbnail],
    uploadDate: video.uploadDate,
    duration: video.duration,
    embedUrl: video.embedUrl,
    url,
    inLanguage: "en",
    publisher: { "@id": SITE_ORGANIZATION_ID },
  };
  const breadcrumbs = [
    { name: "Home", item: getCanonicalUrl("/en/") },
    { name: "Video Guides", item: getCanonicalUrl("/en/resources/installation-guide/") },
    { name: video.title, item: url },
  ];

  return <div className={`newsArticleDetailPage ${editorial.pageSurface} ${useUpdatedLayout ? videoLayout.page : ""}`} data-video-guide-detail data-show-footer-products data-locale={video.locale} data-article-slug={video.id} lang="en">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [...HOME_SITE_IDENTITY["@graph"], videoSchema,
      { "@type": "BreadcrumbList",
        itemListElement: breadcrumbs.map((item, index) => ({ "@type": "ListItem", position: index + 1, ...item })) },
      ],
    }).replace(/</g, "\\u003c") }} />
    <div className="newsArticleBreadcrumbShell">
      <SiteBreadcrumb items={[
        { label: "Home", href: "/en/" },
        { label: "Video Guides", href: "/en/resources/installation-guide/" },
        { label: video.breadcrumbLabel },
      ]} />
    </div>
    <LegacyTechnicalArticleLayout
      articleId={video.id}
      locale="en"
      showPager={false}
      relatedProducts={products.length ? <ArticleRelatedProducts products={products} locale="en" /> : null}
      afterContent={
        <RelatedResourcesLoader {...relatedResources} products={footerProducts} />
      }
      article={{ title: video.title, date: video.uploadDate.slice(0, 10), summary: video.description }}
      pageData={{
        listHref: "/en/resources/installation-guide/",
        backText: "Back",
        bottomBanner: {
          title: video.support.title,
          description: video.support.description,
          actions: [{ label: "Contact technical support", href: "/en/contact/" }],
        },
      }}
    >
      <section className={styles.contentBlock} aria-labelledby={`${video.sectionId}-video`}>
        <h2 id={`${video.sectionId}-video`}>{video.watchHeading}</h2>
        <figure className={styles.figure}>
          <iframe src={video.embedUrl} title={video.title}
            style={{ display: "block", width: "100%", aspectRatio: "16 / 9", border: 0 }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen referrerPolicy="strict-origin-when-cross-origin" />
          <figcaption>{video.caption} · {video.durationLabel} · FOREACH</figcaption>
        </figure>
        <p><a href={video.watchUrl} target="_blank" rel="noopener noreferrer">Watch on YouTube ↗</a></p>
      </section>
      <section className={styles.contentBlock} aria-labelledby={`${video.sectionId}-overview`}>
        <h2 id={`${video.sectionId}-overview`}>{video.highlightsHeading ?? "Video highlights"}</h2>
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
  </div>;
}
