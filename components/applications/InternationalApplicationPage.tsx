import 'server-only';
import Link from 'next/link';
import SiteBreadcrumb from '@/components/common/SiteBreadcrumb';
import ApplicationGuideNavigation from './application-guide-navigation/ApplicationGuideNavigation';
import AnalyticalApplicationDocument from './analytical-documents/AnalyticalApplicationDocument';
import RelatedResourcesLoader from '@/components/common/related-resources/RelatedResourcesLoader';
import EnglishReviewQueryBridge from './EnglishReviewQueryBridge';
import { getApplicationIndexData } from '@/data/applications/application-index-locales';
import { ivdUi } from '@/data/applications/ivd-locales/ui';
import { getIvdProductLinkImages, getIvdProductLinkImageScales } from '@/data/applications/ivd-locales/product-card-images';
import { getRelatedResourcesText } from '@/data/resources/related-resources/related-resources.intl';
import type { EnglishApplicationKind } from '@/data/applications/application-english';
import type { ApplicationDocument } from '@/data/applications/analytical-documents/types';
import { localizedApplicationHref, type ApplicationTranslationLocale } from '@/data/applications/international-locales/routes';
import { getLocalizedApplicationBreadcrumbs, getLocalizedApplicationNavigation, getLocalizedApplicationQueryTargets, getLocalizedApplicationFooter, getLocalizedApplicationResources } from '@/services/applications/international-localized';
import { getCanonicalUrl } from '@/lib/seo/site-url';
import styles from './EnglishReviewPage.module.css';
import contentStyles from './ApplicationContentPage.module.css';
import newsStyles from '@/components/resources/news/NewsArticleClient.module.css';

export default async function InternationalApplicationPage({ locale, kind, document }: { locale: ApplicationTranslationLocale; kind: EnglishApplicationKind; document: ApplicationDocument }) {
  const ui = ivdUi[locale];
  const copy = getApplicationIndexData(locale).copy;
  const href = localizedApplicationHref(locale, kind, document.slug);
  const [navigation, breadcrumbs, cta] = await Promise.all([getLocalizedApplicationNavigation(locale, kind, document), getLocalizedApplicationBreadcrumbs(locale, kind, document), getLocalizedApplicationFooter(locale, kind, document)]);
  const displayBreadcrumbs = breadcrumbs.slice(0, 4);
  const parent = breadcrumbs.slice(0, -1).reverse().find(item => item.href)!;
  const schema = { '@context': 'https://schema.org', '@graph': [
    { '@type': document.kind === 'hub' ? 'CollectionPage' : 'TechArticle', '@id': getCanonicalUrl(href), url: getCanonicalUrl(href), name: document.title, headline: document.title, description: document.description, inLanguage: locale, articleSection: document.sections.map(section => section.title), citation: document.references.map(ref => ref.href.startsWith('/') ? getCanonicalUrl(ref.href) : ref.href) },
    { '@type': 'BreadcrumbList', itemListElement: displayBreadcrumbs.map((item, index) => ({ '@type': 'ListItem', position: index + 1, name: item.label, item: getCanonicalUrl(item.href ?? href) })) },
  ] };
  return <div className={`${styles.page} ${contentStyles.page}`} data-application-content-page lang={locale} data-application-locale={locale}>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} />
    <SiteBreadcrumb variant="bar" ariaLabel={copy.breadcrumbAriaLabel} items={displayBreadcrumbs} />
    <div className={`${newsStyles.page} ${styles.reviewStatus}`}><Link className={newsStyles.backLink} href={parent.href!} prefetch={false} aria-label={`${ui.back}: ${parent.label}`} data-application-back-link>{`< ${ui.back}`}</Link></div>
    {document.kind === 'hub' ? <EnglishReviewQueryBridge targets={getLocalizedApplicationQueryTargets(locale, kind)} /> : null}
    <AnalyticalApplicationDocument document={document} embedded locale={locale} labels={ui} hideRelatedResources
      productLinkCards={{ imagesByHref: getIvdProductLinkImages(locale), imageScalesByHref: getIvdProductLinkImageScales(locale), viewDetails: getRelatedResourcesText(locale).viewDetails }}
      navigation={<ApplicationGuideNavigation key={href} id={`${kind}-application-navigation`} ariaLabel={`${copy.areas[kind].title}: ${ui.guide}`} overview={navigation.overview} groups={navigation.groups} currentHref={href} mobileTitle={navigation.overview.label} drawerEyebrow={ui.guide} drawerTitle={navigation.overview.label} browseLabel={ui.browse} closeLabel={ui.close} />} />
    <RelatedResourcesLoader {...await getLocalizedApplicationResources(locale, kind, document)} />
    <section className={styles.contact} id="contact" data-review-contact style={{ backgroundImage: `linear-gradient(105deg, rgba(12, 34, 70, .94), rgba(23, 51, 104, .83)), url(${cta.backgroundImage})` }}>
      <div className={styles.contactInner}><div><h2>{cta.title}</h2><p>{cta.description}</p></div><Link href={cta.href}>{cta.buttonLabel}</Link></div>
    </section>
  </div>;
}
