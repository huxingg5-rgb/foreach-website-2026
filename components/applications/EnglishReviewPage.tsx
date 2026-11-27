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
import { addEnglishTaskParagraphLinks } from '@/data/applications/english-locales/task-contextual-links';
import { getDraftHrefForEnglish, getItalianDraftLink, hindiEnglishFallbackSuffix } from '@/lib/i18n/draft-languages';
import { germanApplicationLabels, germanApplicationMetadata, getGermanApplicationSchema, getGermanReviewResources, translateGermanApplication, type GermanApplicationCopy } from '@/services/applications/german-review';

import { getHindiApplicationResources, getHindiApplicationSchema, getHindiApplicationTranslation, hindiApplicationLabels, hindiApplicationLink, localizeHindiApplication, translateHindiApplication, type HindiApplicationCopy } from '@/services/applications/hindi-application';
import { getItalianApplicationSchema, getItalianReviewResources, italianApplicationLabels, localizeItalianApplicationDocument, translateItalianApplication, type ItalianApplicationCopy } from '@/services/applications/italian-review';

export function reviewMetadata(document: ApplicationDocument, kind: EnglishApplicationKind): Metadata {
  return getEnglishApplicationMetadata(document, kind);
}

export function germanReviewMetadata(
  document: ApplicationDocument,
  kind: EnglishApplicationKind,
  copy: GermanApplicationCopy,
  currentHref = reviewBase(kind),
): Metadata {
  return germanApplicationMetadata(reviewMetadata(document, kind), kind, copy, currentHref);
}

export default function EnglishReviewPage({ kind, document: source = getReviewHub(kind), currentHref = reviewBase(kind), germanCopy, italianCopy, hindiCopy }: {
  kind: EnglishApplicationKind;
  document?: ApplicationDocument;
  currentHref?: string;
  germanCopy?: GermanApplicationCopy;
  italianCopy?: ItalianApplicationCopy;
  hindiCopy?: HindiApplicationCopy;
}) {
  const translateHindi = (text: string) => getHindiApplicationTranslation(hindiCopy ?? {}, text, source.slug || kind);
  const localize = <T,>(value: T) => germanCopy ? translateGermanApplication(value, germanCopy) : italianCopy ? translateItalianApplication(value, italianCopy) : hindiCopy ? translateHindiApplication(value, translateHindi) : value;
  const locale = germanCopy ? 'de' : italianCopy ? 'it' : hindiCopy ? 'hi' : 'en';
  const pageHref = locale === 'en' ? currentHref : getDraftHrefForEnglish(currentHref, locale);
  const originalDocument = addEnglishTaskParagraphLinks(getEnglishApplicationDocument(source, kind), kind);
  const document = italianCopy ? localizeItalianApplicationDocument(originalDocument, italianCopy) : hindiCopy ? localizeHindiApplication(originalDocument, translateHindi) : localize(originalDocument);
  const domain = localize(translateApplicationEnglish(reviewDomains[kind]));
  const isHub = source.kind === 'hub';
  const isLc = source.slug === 'liquid-chromatography' || source.slug.startsWith('lc-');
  const hierarchyNavigation = localize(translateApplicationEnglish(getReviewHierarchyNavigation(kind, source)));
  const navigation = localize(translateApplicationEnglish(isLc ? getReviewLcNav() : getReviewNav(kind, source)));
  const { cta: sourceCta } = translateApplicationEnglish(getReviewFooterPlan(kind, source));
  const cta = localize(refineEnglishGuideCta(sourceCta, originalDocument, kind));
  const originalResources = getEnglishReviewResources(kind, source);
  const resources = germanCopy ? getGermanReviewResources(originalResources, germanCopy) : italianCopy ? getItalianReviewResources(originalResources, italianCopy) : hindiCopy ? getHindiApplicationResources(originalResources, translateHindi) : originalResources;
  const breadcrumbs = localize(translateApplicationEnglish(getReviewBreadcrumb(kind, source, currentHref)));
  const hasInstrument = getReviewHierarchyTrail(kind, source) !== undefined || reviewGroupFromSlug(kind, source.slug) !== undefined;
  const displayBreadcrumbs = breadcrumbs.slice(0, hasInstrument ? 4 : 3);
  const parent = breadcrumbs.slice(0, -1).reverse().find(item => item.href && item.href !== pageHref);
  const structuredData = germanCopy ? getGermanApplicationSchema(document, pageHref, breadcrumbs)
    : italianCopy ? getItalianApplicationSchema(document, pageHref, breadcrumbs) : hindiCopy ? getHindiApplicationSchema(document, pageHref, breadcrumbs) : getEnglishApplicationSchema(document, currentHref, breadcrumbs);
  const hindiOverview = hindiCopy ? hindiApplicationLink(reviewBase(kind)) : undefined;
  const displayLocale = hindiCopy ? 'hi-IN' : locale;
  return <div className={`${styles.page} ${contentStyles.page}`} data-application-content-page lang={displayLocale} data-review-locale={locale}>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }} />
    <SiteBreadcrumb variant="bar" ariaLabel={germanCopy ? 'Navigation im Anwendungsbereich' : italianCopy ? 'Navigazione tra le applicazioni' : hindiCopy ? 'अनुप्रयोगों का नेविगेशन' : 'Application navigation'} items={displayBreadcrumbs} />
    <div className={`${newsStyles.page} ${styles.reviewStatus}`}>
      <Link className={newsStyles.backLink} href={parent?.href ?? `/${locale}/applications/`} prefetch={false}
        aria-label={germanCopy ? `Zurück zu ${parent?.label ?? 'Anwendungen'}` : italianCopy ? `Torna a ${parent?.label ?? 'Applicazioni'}` : hindiCopy ? `${parent?.label ?? 'अनुप्रयोग'} पर वापस जाएँ` : `Back to ${parent?.label ?? 'Applications'}`}
        data-application-back-link>{germanCopy ? '< Zurück' : italianCopy ? '< Indietro' : hindiCopy ? '< वापस जाएँ' : '< Back'}</Link>
    </div>
    {isHub ? <EnglishReviewQueryBridge targets={localize(getReviewQueryLinks(kind))} /> : null}
    <AnalyticalApplicationDocument document={document} embedded locale={displayLocale} labels={germanCopy ? germanApplicationLabels : italianCopy ? italianApplicationLabels : hindiCopy ? hindiApplicationLabels : undefined} hideRelatedResources navigation={<ApplicationGuideNavigation
      key={pageHref}
      id={`review-${kind}-navigation`} ariaLabel={germanCopy ? `Anwendungsleitfäden für ${domain.title}` : italianCopy ? `Guide applicative: ${domain.title}` : hindiCopy ? `${domain.title} की अनुप्रयोग मार्गदर्शिकाएँ` : `${domain.title} application guides`}
      overview={hierarchyNavigation?.overview ?? (isLc
        ? localize({ label: 'Liquid Chromatography', href: '/en/applications/analytical-instruments/liquid-chromatography/' })
        : hindiOverview ? { ...hindiOverview, label: `${domain.title} का अवलोकन${hindiOverview.hrefLang === 'en' ? hindiEnglishFallbackSuffix : ''}` }
        : { label: germanCopy ? `Übersicht: ${domain.title}` : italianCopy ? `Panoramica: ${domain.title}` : `${domain.title} Overview`, href: germanCopy ? getDraftHrefForEnglish(reviewBase(kind), 'de') : italianCopy ? getItalianDraftLink(reviewBase(kind)).href : reviewBase(kind) })}
      groups={navigation} currentHref={pageHref}
      mobileTitle={hierarchyNavigation?.title ?? (germanCopy ? `Leitfäden: ${domain.title}` : italianCopy ? `Guide: ${domain.title}` : hindiCopy ? `${domain.title} की मार्गदर्शिकाएँ` : `${domain.title} Guides`)}
      drawerEyebrow={germanCopy ? 'Anwendungsleitfäden' : italianCopy ? 'Guide applicative' : hindiCopy ? 'अनुप्रयोग मार्गदर्शिकाएँ' : 'Application guides'} drawerTitle={hierarchyNavigation?.title ?? domain.title}
      browseLabel={germanCopy ? 'Leitfäden ansehen' : italianCopy ? 'Sfoglia le guide' : hindiCopy ? 'मार्गदर्शिकाएँ देखें' : 'Browse guides'} closeLabel={germanCopy ? 'Leitfadennavigation schließen' : italianCopy ? 'Chiudi la navigazione delle guide' : hindiCopy ? 'मार्गदर्शिका नेविगेशन बंद करें' : 'Close guide navigation'}
      tasksLabel={germanCopy ? 'Aufgaben' : italianCopy ? 'attività' : hindiCopy ? 'कार्य' : undefined}
    />} />
    <RelatedResourcesLoader {...resources} />
    <section className={styles.contact} id="contact" data-review-contact style={{ backgroundImage: `linear-gradient(105deg, rgba(12, 34, 70, .94), rgba(23, 51, 104, .83)), url(${cta.backgroundImage})` }}>
      <div className={styles.contactInner}><div><h2>{cta.title}</h2><p>{cta.description}</p></div><BottomCtaButton href={cta.href}>{cta.buttonLabel}</BottomCtaButton></div>
    </section>
  </div>;
}
