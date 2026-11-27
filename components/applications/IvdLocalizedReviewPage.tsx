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
import { addClinicalDegassingReview } from '@/data/applications/english-locales/degassing-review';
import { addEnglishTaskParagraphLinks } from '@/data/applications/english-locales/task-contextual-links';
import { ivdDocumentHref, type IvdLocale } from '@/data/applications/ivd-locales/routes';
import { ivdUi } from '@/data/applications/ivd-locales/ui';
import { reviewDomains } from '@/data/applications/english-review';
import { getIvdProductLinkImages, getIvdProductLinkImageScales } from '@/data/applications/ivd-locales/product-card-images';
import { getRelatedResourcesText } from '@/data/resources/related-resources/related-resources.intl';
import { getApplicationIndexData } from '@/data/applications/application-index-locales';
import { getIvdBreadcrumbs, getIvdNavigation, getIvdQueryTargets, getLocalizedIvdResources } from '@/services/applications/ivd-localized';
import { getHindiIvdPresentation } from '@/services/applications/ivd-hindi';
import { getItalianIvdPresentation } from '@/services/applications/ivd-italian';
import { getHindiDraftLink, getItalianDraftLink, hindiEnglishFallbackSuffix, italianEnglishFallbackSuffix } from '@/lib/i18n/draft-languages';
import { getGermanIvdPresentation } from '@/services/applications/ivd-german';
import { getCanonicalUrl } from '@/lib/seo/site-url';
import styles from './EnglishReviewPage.module.css';
import newsStyles from '@/components/resources/news/NewsArticleClient.module.css';

export default async function IvdLocalizedReviewPage({ locale, document }: { locale: IvdLocale | 'de' | 'it' | 'hi'; document: ApplicationDocument }) {
  const sourceLocale = locale === 'de' || locale === 'it' || locale === 'hi' ? 'en' : locale;
  const localized = locale === 'de' ? await getGermanIvdPresentation(document) : locale === 'it' ? await getItalianIvdPresentation(document) : locale === 'hi' ? await getHindiIvdPresentation(document) : undefined;
  const article = localized?.article ?? (locale === 'en' ? addEnglishTaskParagraphLinks(addClinicalDegassingReview(document), 'ivd') : document);
  const ui = localized?.ui ?? ivdUi[sourceLocale];
  const copy = getApplicationIndexData(locale).copy;
  const productLinkCards = localized?.productLinkCards ?? {
    imagesByHref: getIvdProductLinkImages(sourceLocale),
    imageScalesByHref: getIvdProductLinkImageScales(sourceLocale),
    viewDetails: getRelatedResourcesText(sourceLocale).viewDetails,
  };
  const href = localized?.href ?? ivdDocumentHref(sourceLocale, document.slug);
  const [navigation, breadcrumbs] = localized
    ? [localized.navigation, localized.breadcrumbs]
    : await Promise.all([getIvdNavigation(sourceLocale, document), getIvdBreadcrumbs(sourceLocale, document)]);
  const displayBreadcrumbs = breadcrumbs.slice(0, 4);
  const parent = breadcrumbs.slice(0, -1).reverse().find(item => item.href)!;
  const contact = locale === 'it' ? getItalianDraftLink('/en/contact/') : locale === 'hi' ? getHindiDraftLink('/en/contact/') : { href: `/${locale}/contact/` };
  const structuredData = {
    '@context': 'https://schema.org', '@graph': [
      { '@type': 'WebPage', '@id': getCanonicalUrl(href), url: getCanonicalUrl(href), name: document.title, description: document.description, inLanguage: locale === 'it' ? 'it-IT' : locale === 'hi' ? 'hi-IN' : locale },
      { '@type': 'BreadcrumbList', itemListElement: displayBreadcrumbs.map((item, index) => ({ '@type': 'ListItem', position: index + 1, name: item.label, item: getCanonicalUrl(item.href ?? href) })) },
    ],
  };
  return <div className={`${styles.page} ${contentStyles.page}`} data-application-content-page lang={locale === 'hi' ? 'hi-IN' : locale} data-ivd-locale={locale}>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }} />
    <SiteBreadcrumb variant="bar" ariaLabel={copy.breadcrumbAriaLabel} items={displayBreadcrumbs} />
    <div className={`${newsStyles.page} ${styles.reviewStatus}`}>
      <Link className={newsStyles.backLink} href={parent.href!} prefetch={false} aria-label={`${ui.back}: ${parent.label}`} data-application-back-link>{`< ${ui.back}`}</Link>
    </div>
    {document.kind === 'hub' ? <EnglishReviewQueryBridge targets={localized?.queryTargets ?? getIvdQueryTargets(sourceLocale)} /> : null}
    <AnalyticalApplicationDocument document={article} embedded locale={locale === 'hi' ? 'hi-IN' : locale} labels={ui} hideRelatedResources productLinkCards={productLinkCards} navigation={<ApplicationGuideNavigation
      key={href} id="ivd-application-navigation" ariaLabel={ui.navigation} overview={navigation.overview} groups={navigation.groups} currentHref={href}
      mobileTitle={navigation.overview.label} drawerEyebrow={ui.guide} drawerTitle={navigation.overview.label} browseLabel={ui.browse} closeLabel={ui.close} tasksLabel={locale === 'it' ? 'attività' : locale === 'hi' ? 'कार्य' : undefined}
    />} />
    <RelatedResourcesLoader {...(localized?.resources ?? getLocalizedIvdResources(sourceLocale, document))} />
    <section className={styles.contact} id="contact" data-review-contact style={{ backgroundImage: `linear-gradient(105deg, rgba(12, 34, 70, .94), rgba(23, 51, 104, .83)), url(${reviewDomains.ivd.image})` }}>
      <div className={styles.contactInner}><div><h2>{ui.contactTitle}</h2><p>{ui.contactDescription}</p></div><BottomCtaButton href={contact.href}>{ui.contactButton}{'hrefLang' in contact && contact.hrefLang === 'en' ? (locale === 'hi' ? hindiEnglishFallbackSuffix : italianEnglishFallbackSuffix) : ''}</BottomCtaButton></div>
    </section>
  </div>;
}
