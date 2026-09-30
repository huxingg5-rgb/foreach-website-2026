import Link from "next/link";
import SiteBreadcrumb from "@/components/common/SiteBreadcrumb";
import RelatedResources from "@/components/common/related-resources/RelatedResources";
import LegacyTechnicalArticleLayout from "@/components/resources/technical-articles/articles/LegacyTechnicalArticleLayout";
import editorial from "@/components/resources/technical-articles/articles/RplSelectionArticle.module.css";
import styles from "@/components/resources/technical-articles/articles/TechnicalArticleBody.module.css";
import { sv10EnglishGuide, sv10Video } from "@/data/resources/installation-guide/installation-guide.sv10.en";
import { getCanonicalUrl } from "@/lib/seo/site-url";
import "@/app/resources/technical-articles/technical-articles.css";
import "@/app/resources/news/news.css";

export default function Sv10VideoPage() {
  const url = getCanonicalUrl(sv10Video.detailHref);
  const videoSchema = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: sv10Video.title,
    description: sv10Video.description,
    thumbnailUrl: [sv10Video.thumbnail],
    uploadDate: sv10Video.uploadDate,
    duration: sv10Video.duration,
    embedUrl: sv10Video.embedUrl,
    url,
    inLanguage: "en",
    publisher: { "@type": "Organization", name: "FOREACH", url: "https://www.foreachtek.com/" },
  };
  const breadcrumbs = [
    { name: "Home", item: getCanonicalUrl("/en/") },
    { name: "Video Guides", item: getCanonicalUrl("/en/resources/installation-guide/") },
    { name: sv10Video.title, item: url },
  ];

  return <div className={`newsArticleDetailPage ${editorial.pageSurface}`} data-locale="en" data-article-slug={sv10Video.id} lang="en">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([
      videoSchema,
      { "@context": "https://schema.org", "@type": "BreadcrumbList",
        itemListElement: breadcrumbs.map((item, index) => ({ "@type": "ListItem", position: index + 1, ...item })) },
    ]).replace(/</g, "\\u003c") }} />
    <div className="newsArticleBreadcrumbShell">
      <SiteBreadcrumb items={[
        { label: "Home", href: "/en/" },
        { label: "Video Guides", href: "/en/resources/installation-guide/" },
        { label: "SV10 Solenoid Valves" },
      ]} />
    </div>
    <LegacyTechnicalArticleLayout
      articleId={sv10Video.id}
      locale="en"
      showPager={false}
      afterContent={
        <RelatedResources
          sourceType="video"
          sourceId={sv10Video.id}
          relationKeys={sv10EnglishGuide.relationKeys}
          featuredProductIds={["6010-solenoid-valve"]}
          locale="en"
        />
      }
      article={{ title: sv10Video.title, date: sv10Video.uploadDate, summary: sv10Video.description }}
      pageData={{
        listHref: "/en/resources/installation-guide/",
        backText: "Back",
        bottomBanner: {
          title: "Choosing a valve for your fluid system?",
          description: "Share your medium, switching function and connection requirements with our team.",
          actions: [{ label: "Contact technical support", href: "/en/contact/" }],
        },
      }}
    >
      <section className={styles.contentBlock} aria-labelledby="sv10-video">
        <h2 id="sv10-video">Watch the SV10 video</h2>
        <figure className={styles.figure}>
          <iframe src={sv10Video.embedUrl} title={sv10Video.title}
            style={{ display: "block", width: "100%", aspectRatio: "16 / 9", border: 0 }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen referrerPolicy="strict-origin-when-cross-origin" />
          <figcaption>SV10 series product overview · {sv10Video.durationLabel} · FOREACH</figcaption>
        </figure>
        <p><a href={sv10Video.watchUrl} target="_blank" rel="noopener noreferrer">Watch on YouTube ↗</a></p>
      </section>
      <section className={styles.contentBlock} aria-labelledby="sv10-overview">
        <h2 id="sv10-overview">Video highlights</h2>
        <p>{sv10Video.highlightsIntroduction}</p>
        <ul>
          {sv10Video.highlights.map(highlight => <li key={highlight.start}>
            <p>
              <a href={`${sv10Video.watchUrl}&t=${highlight.start}s`} target="_blank" rel="noopener noreferrer"
                aria-label={`Watch ${highlight.title.toLowerCase()} at ${highlight.time} on YouTube`}>
                {highlight.time}
              </a>{" — "}<strong>{highlight.title}</strong>
              <br />{highlight.description}
            </p>
          </li>)}
        </ul>
      </section>
      <section className={styles.contentBlock} aria-labelledby="sv10-products">
        <h2 id="sv10-products">Explore SV10 solenoid valves</h2>
        <p>{sv10Video.productIntroduction}</p>
        <div className={styles.linkList}>
          {sv10Video.products.map(product => <p key={product.href}>
            <Link href={product.href}>{product.title}</Link>
          </p>)}
          <p><Link href="/en/products/valves/solenoid-valves/">View the SV10 series →</Link></p>
        </div>
      </section>
    </LegacyTechnicalArticleLayout>
  </div>;
}
