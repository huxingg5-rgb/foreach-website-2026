import 'server-only';
import Link from 'next/link';
import type { Metadata } from 'next';
import SiteBreadcrumb from '@/components/common/SiteBreadcrumb';
import ApplicationGuideNavigation from '@/components/applications/application-guide-navigation/ApplicationGuideNavigation';
import AnalyticalApplicationDocument from '@/components/applications/analytical-documents/AnalyticalApplicationDocument';
import EnglishReviewQueryBridge from './EnglishReviewQueryBridge';
import type { ApplicationDocument } from '@/data/applications/analytical-documents/types';
import type { EnglishApplicationKind } from '@/data/applications/application-english';
import { getReviewHub, getReviewNav, getReviewLcNav, getReviewQueryLinks, getReviewBreadcrumb, reviewGroupFromSlug, reviewBase, reviewDomains } from '@/data/applications/english-review';
import styles from './EnglishReviewPage.module.css';
import newsStyles from '@/components/resources/news/NewsArticleClient.module.css';
import RelatedResourcesLoader from '@/components/common/related-resources/RelatedResourcesLoader';
import { getEnglishReviewResources } from '@/services/applications/english-review-resources';
import { getReviewFooterPlan } from '@/data/applications/english-review-resources';
import { getReviewHierarchyNavigation, getReviewHierarchyTrail } from '@/data/applications/english-review-hierarchy';

export function reviewMetadata(document: ApplicationDocument): Metadata {
  return { title: document.seoTitle, description: document.description, robots: { index: false, follow: false } };
}
export default function EnglishReviewPage({ kind, document = getReviewHub(kind), currentHref = reviewBase(kind) }: {
  kind: EnglishApplicationKind; document?: ApplicationDocument; currentHref?: string;
}) {
  const domain = reviewDomains[kind];
  const isHub = document.kind === 'hub';
  const isLc = document.slug === 'liquid-chromatography' || document.slug.startsWith('lc-');
  const hierarchyNavigation=getReviewHierarchyNavigation(kind,document);
  const navigation = isLc ? getReviewLcNav() : getReviewNav(kind,document);
  const hero=document.reviewContext?.hero;
  const {cta} = getReviewFooterPlan(kind,document);
  const resources = getEnglishReviewResources(kind,document);
  const breadcrumbs = getReviewBreadcrumb(kind,document,currentHref);
  const hasInstrument = getReviewHierarchyTrail(kind,document) !== undefined || reviewGroupFromSlug(kind,document.slug) !== undefined;
  const parent = breadcrumbs.slice(0, -1).reverse().find(item => item.href && item.href !== currentHref);
  return <div className={styles.page} lang="zh-CN" data-review-locale="en">
    <section className={styles.hero} style={{ backgroundImage: `linear-gradient(90deg, rgba(25, 51, 88, .87), rgba(35, 80, 118, .40)), url(${domain.image})` }}>
      <div className={styles.heroInner}>
        <p className={styles.eyebrow}>FOREACH · 应用领域</p>
        <div className={styles.heroTitle}>液路元件与任务指南<br /><span>{hero?.highlight ?? (isHub ? domain.title : document.title.split('：')[0])}</span></div>
        <p>{hero?.description ?? document.description}</p>
      </div>
    </section>
    <SiteBreadcrumb variant="bar" ariaLabel="应用领域位置" items={breadcrumbs.slice(0, hasInstrument ? 4 : 3)} />
    <div className={`${newsStyles.page} ${styles.reviewStatus}`}>
      <Link className={newsStyles.backLink} href={parent?.href ?? '/en/applications/'} prefetch={false} aria-label={`返回${parent?.label ?? '应用领域'}`} data-application-back-link>{'< 返回'}</Link>
    </div>
    {isHub ? <EnglishReviewQueryBridge targets={getReviewQueryLinks(kind)} /> : null}
    <AnalyticalApplicationDocument document={document} embedded reviewChinese navigation={<ApplicationGuideNavigation
      key={currentHref}
      id={`review-${kind}-navigation`} ariaLabel={`${domain.title}专题导航`}
      overview={hierarchyNavigation?.overview ?? (isLc ? { label: '液相色谱液路总览', href: '/en/applications/analytical-instruments/liquid-chromatography/' } : { label: `${domain.title}总览`, href: reviewBase(kind) })} groups={navigation} currentHref={currentHref}
      mobileTitle={hierarchyNavigation?.title ?? `${domain.title}专题导航`} drawerEyebrow="应用指南" drawerTitle={hierarchyNavigation?.title ?? domain.title}
      browseLabel="浏览专题" closeLabel="关闭专题导航"
    />} />
    <RelatedResourcesLoader {...resources} />
    <section className={styles.contact} id="contact" data-review-contact style={{backgroundImage:`linear-gradient(105deg, rgba(12, 34, 70, .94), rgba(23, 51, 104, .83)), url(${cta.backgroundImage})`}}>
      <div className={styles.contactInner}><div><h2>{cta.title}</h2><p>{cta.description}</p></div><Link href={cta.href}>{cta.buttonLabel}</Link></div>
    </section>
  </div>;
}
