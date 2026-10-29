import BottomCtaButton from "@/components/common/BottomCtaButton";
import 'server-only';
import Link from 'next/link';
import SiteBreadcrumb from '@/components/common/SiteBreadcrumb';
import contentStyles from './ApplicationContentPage.module.css';
import ApplicationGuideNavigation from '@/components/applications/application-guide-navigation/ApplicationGuideNavigation';
import AnalyticalApplicationDocument from '@/components/applications/analytical-documents/AnalyticalApplicationDocument';
import RelatedResourcesLoader from '@/components/common/related-resources/RelatedResourcesLoader';
import EnglishReviewQueryBridge from './EnglishReviewQueryBridge';
import type { ApplicationDocument } from '@/data/applications/analytical-documents/types';
import { ivdDocumentHref, type IvdLocale } from '@/data/applications/ivd-locales/routes';
import { ivdUi } from '@/data/applications/ivd-locales/ui';
import { reviewDomains } from '@/data/applications/english-review';
import { getIvdProductLinkImages, getIvdProductLinkImageScales } from '@/data/applications/ivd-locales/product-card-images';
import { getRelatedResourcesText } from '@/data/resources/related-resources/related-resources.intl';
import { getApplicationIndexData } from '@/data/applications/application-index-locales';
import { getIvdBreadcrumbs, getIvdNavigation, getIvdQueryTargets, getLocalizedIvdResources } from '@/services/applications/ivd-localized';
import { getCanonicalUrl } from '@/lib/seo/site-url';
import styles from './EnglishReviewPage.module.css';
import newsStyles from '@/components/resources/news/NewsArticleClient.module.css';

export default async function IvdLocalizedReviewPage({ locale, document }: { locale: IvdLocale; document: ApplicationDocument }) {
  const ui = ivdUi[locale];
  const copy = getApplicationIndexData(locale).copy;
  const productLinkCards = {
    imagesByHref: getIvdProductLinkImages(locale),
    imageScalesByHref: getIvdProductLinkImageScales(locale),
    viewDetails: getRelatedResourcesText(locale).viewDetails,
  };
  const href = ivdDocumentHref(locale, document.slug);
  const [navigation, breadcrumbs] = await Promise.all([getIvdNavigation(locale, document), getIvdBreadcrumbs(locale, document)]);
  const displayBreadcrumbs = breadcrumbs.slice(0, 4);
  const parent = breadcrumbs.slice(0, -1).reverse().find(item => item.href)!;
  const structuredData = {
    '@context': 'https://schema.org', '@graph': [
      { '@type': 'WebPage', '@id': getCanonicalUrl(href), url: getCanonicalUrl(href), name: document.title, description: document.description, inLanguage: locale },
      { '@type': 'BreadcrumbList', itemListElement: displayBreadcrumbs.map((item, index) => ({ '@type': 'ListItem', position: index + 1, name: item.label, item: getCanonicalUrl(item.href ?? href) })) },
    ],
  };
  return <div className={`${styles.page} ${contentStyles.page}`} data-application-content-page lang={locale} data-ivd-locale={locale}>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }} />
    <SiteBreadcrumb variant="bar" ariaLabel={copy.breadcrumbAriaLabel} items={displayBreadcrumbs} />
    <div className={`${newsStyles.page} ${styles.reviewStatus}`}>
      <Link className={newsStyles.backLink} href={parent.href!} prefetch={false} aria-label={`${ui.back}: ${parent.label}`} data-application-back-link>{`< ${ui.back}`}</Link>
    </div>
    {document.kind === 'hub' ? <EnglishReviewQueryBridge targets={getIvdQueryTargets(locale)} /> : null}
    <AnalyticalApplicationDocument document={document} embedded locale={locale} labels={ui} hideRelatedResources productLinkCards={productLinkCards} navigation={<ApplicationGuideNavigation
      key={href} id="ivd-application-navigation" ariaLabel={ui.navigation} overview={navigation.overview} groups={navigation.groups} currentHref={href}
      mobileTitle={navigation.overview.label} drawerEyebrow={ui.guide} drawerTitle={navigation.overview.label} browseLabel={ui.browse} closeLabel={ui.close}
    />} />
    <RelatedResourcesLoader {...getLocalizedIvdResources(locale, document)} />
    <section className={styles.contact} id="contact" data-review-contact style={{ backgroundImage: `linear-gradient(105deg, rgba(12, 34, 70, .94), rgba(23, 51, 104, .83)), url(${reviewDomains.ivd.image})` }}>
      <div className={styles.contactInner}><div><h2>{ui.contactTitle}</h2><p>{ui.contactDescription}</p></div><BottomCtaButton href={`/${locale}/contact/`}>{ui.contactButton}</BottomCtaButton></div>
    </section>
  </div>;
}
