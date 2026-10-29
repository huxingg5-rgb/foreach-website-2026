import BottomCtaButton from "@/components/common/BottomCtaButton";
import 'server-only';
import Link from 'next/link';
import type { Metadata } from 'next';
import SiteBreadcrumb from '@/components/common/SiteBreadcrumb';
import contentStyles from './ApplicationContentPage.module.css';
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
import { getEnglishApplicationDocument, getEnglishApplicationMetadata, getEnglishApplicationSchema, translateApplicationEnglish } from '@/services/applications/english-localized';
import { refineEnglishGuideCta } from '@/data/applications/english-locales/refine-guides';

export function reviewMetadata(document: ApplicationDocument, kind: EnglishApplicationKind): Metadata {
  return getEnglishApplicationMetadata(document, kind);
}

export default function EnglishReviewPage({ kind, document: source = getReviewHub(kind), currentHref = reviewBase(kind) }: {
  kind: EnglishApplicationKind; document?: ApplicationDocument; currentHref?: string;
}) {
  const document = getEnglishApplicationDocument(source, kind);
  const domain = translateApplicationEnglish(reviewDomains[kind]);
  const isHub = source.kind === 'hub';
  const isLc = source.slug === 'liquid-chromatography' || source.slug.startsWith('lc-');
  const hierarchyNavigation = translateApplicationEnglish(getReviewHierarchyNavigation(kind, source));
  const navigation = translateApplicationEnglish(isLc ? getReviewLcNav() : getReviewNav(kind, source));
  const { cta: sourceCta } = translateApplicationEnglish(getReviewFooterPlan(kind, source));
  const cta = refineEnglishGuideCta(sourceCta, document, kind);
  const resources = getEnglishReviewResources(kind, source);
  const breadcrumbs = translateApplicationEnglish(getReviewBreadcrumb(kind, source, currentHref));
  const hasInstrument = getReviewHierarchyTrail(kind, source) !== undefined || reviewGroupFromSlug(kind, source.slug) !== undefined;
  const displayBreadcrumbs = breadcrumbs.slice(0, hasInstrument ? 4 : 3);
  const parent = breadcrumbs.slice(0, -1).reverse().find(item => item.href && item.href !== currentHref);
  const structuredData = getEnglishApplicationSchema(document, currentHref, breadcrumbs);
  return <div className={`${styles.page} ${contentStyles.page}`} data-application-content-page lang="en" data-review-locale="en">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }} />
    <SiteBreadcrumb variant="bar" ariaLabel="Application navigation" items={displayBreadcrumbs} />
    <div className={`${newsStyles.page} ${styles.reviewStatus}`}>
      <Link className={newsStyles.backLink} href={parent?.href ?? '/en/applications/'} prefetch={false} aria-label={`Back to ${parent?.label ?? 'Applications'}`} data-application-back-link>{'< Back'}</Link>
    </div>
    {isHub ? <EnglishReviewQueryBridge targets={getReviewQueryLinks(kind)} /> : null}
    <AnalyticalApplicationDocument document={document} embedded locale="en" hideRelatedResources navigation={<ApplicationGuideNavigation
      key={currentHref}
      id={`review-${kind}-navigation`} ariaLabel={`${domain.title} application guides`}
      overview={hierarchyNavigation?.overview ?? (isLc ? { label: 'Liquid Chromatography', href: '/en/applications/analytical-instruments/liquid-chromatography/' } : { label: `${domain.title} Overview`, href: reviewBase(kind) })} groups={navigation} currentHref={currentHref}
      mobileTitle={hierarchyNavigation?.title ?? `${domain.title} Guides`} drawerEyebrow="Application guides" drawerTitle={hierarchyNavigation?.title ?? domain.title}
      browseLabel="Browse guides" closeLabel="Close guide navigation"
    />} />
    <RelatedResourcesLoader {...resources} />
    <section className={styles.contact} id="contact" data-review-contact style={{ backgroundImage: `linear-gradient(105deg, rgba(12, 34, 70, .94), rgba(23, 51, 104, .83)), url(${cta.backgroundImage})` }}>
      <div className={styles.contactInner}><div><h2>{cta.title}</h2><p>{cta.description}</p></div><BottomCtaButton href={cta.href}>{cta.buttonLabel}</BottomCtaButton></div>
    </section>
  </div>;
}
