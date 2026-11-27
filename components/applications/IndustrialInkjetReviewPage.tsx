import 'server-only';

import type { Metadata } from 'next';
import Link from 'next/link';
import AnalyticalApplicationDocument from '@/components/applications/analytical-documents/AnalyticalApplicationDocument';
import ApplicationGuideNavigation from '@/components/applications/application-guide-navigation/ApplicationGuideNavigation';
import contentStyles from '@/components/applications/ApplicationContentPage.module.css';
import reviewStyles from '@/components/applications/EnglishReviewPage.module.css';
import BottomCtaButton from '@/components/common/BottomCtaButton';
import SiteBreadcrumb from '@/components/common/SiteBreadcrumb';
import RelatedProducts from '@/components/common/related-resources/RelatedProducts';
import RelatedResourcesLoader from '@/components/common/related-resources/RelatedResourcesLoader';
import newsStyles from '@/components/resources/news/NewsArticleClient.module.css';
import { getInkjetNav, inkjetSceneKeys, type InkjetRouteKey } from '@/data/applications/inkjet-guide-navigation';
import { getInkjetPageHref, getInkjetRouteKey, inkjetLocales, inkjetRouteKeys } from '@/data/applications/industrial-inkjet-localized';
import inkjetRoutes from '@/data/applications/industrial-inkjet-routes.json';
import { germanInkjetGuideLabel, germanInkjetHubUi, getGermanInkjetDraftLink } from '@/data/applications/industrial-inkjet-hub.de';
import { germanEnglishFallbackSuffix, getDraftHrefForEnglish, getHindiDraftLink, getItalianDraftLink, hindiEnglishFallbackSuffix, italianEnglishFallbackSuffix } from '@/lib/i18n/draft-languages';
import { getGermanReviewResources, translateGermanApplication, type GermanApplicationCopy } from '@/services/applications/german-review';
import { ivdUi } from '@/data/applications/ivd-locales/ui';
import {
  inkjetContactZh,
  inkjetProductImagesByHref,
  inkjetPumpGuideLinkZh,
  type InkjetApplicationPage,
} from '@/data/applications/industrial-inkjet-printing.zh';
import { getEnabledLocaleCodes } from '@/data/languages';
import { inkStarvationTroubleshootingSlug } from '@/data/resources/technical-articles/ink-starvation-troubleshooting.article';
import { getCanonicalUrl, getLocalizedSiteHref } from '@/lib/seo/site-url';
import { getDiaphragmPumpPath } from '@/data/products/detail/diaphragm-pump-routes';
import { getTechnicalArticlesPageData } from '@/services/resources/technical-articles/getTechnicalArticlesPageData';
import { getGermanRelatedArticles } from '@/services/resources/technical-articles/getGermanRelatedArticles';

import { hindiIvdUi } from '@/data/applications/ivd-locales/hi';
import { getHindiApplicationResources, getHindiApplicationTranslation, type HindiApplicationCopy } from '@/services/applications/hindi-application';
import { italianInkjetUi } from '@/data/applications/industrial-inkjet-hub.it';
import { getItalianReviewResources, translateItalianApplication, type ItalianApplicationCopy } from '@/services/applications/italian-review';

const inkjetUi = {
  en: {
    ...ivdUi.en,
    home: 'Home', applications: 'Applications', breadcrumb: 'Breadcrumb',
    navigation: 'Industrial inkjet application guides', overview: 'Industrial inkjet printing overview',
    pumpGroup: 'Diaphragm pump selection', viewDetails: 'View product details',
    contactTitle: 'Discuss your ink circuit',
    contactDescription: 'Share the printer model, ink and cleaning fluid, target flow, temperature, and operating pressure.',
    connectionContactDescription: 'Share the tube dimensions, end connections, ink and cleaning fluid, and the required flow and pressure.',
  },
  es: {
    ...ivdUi.es, home: 'Inicio', applications: 'Aplicaciones', breadcrumb: 'Ruta de navegación',
    navigation: 'Guías de impresión por inyección de tinta industrial', viewDetails: 'Ver detalles del producto',
    contactTitle: 'Consulte sobre su circuito de tinta',
    contactDescription: 'Indique el modelo de impresora, la tinta y el líquido de limpieza, el caudal necesario, la temperatura y la presión de trabajo.',
    connectionContactDescription: 'Indique las dimensiones del tubo, las conexiones en ambos extremos, los fluidos y el caudal y la presión de trabajo.',
  },
  fr: {
    ...ivdUi.fr, home: 'Accueil', applications: 'Applications', breadcrumb: 'Fil d’Ariane',
    navigation: 'Guides d’impression jet d’encre industrielle', viewDetails: 'Voir la fiche produit',
    contactTitle: 'Parlons de votre circuit d’encre',
    contactDescription: 'Précisez le modèle d’imprimante, l’encre, le liquide de nettoyage, le débit requis, la température et la pression de service.',
    connectionContactDescription: 'Précisez les dimensions du tube, les raccords aux deux extrémités, les fluides, le débit et la pression de service.',
  },
  ko: {
    ...ivdUi.ko, home: '홈', applications: '응용 분야', breadcrumb: '현재 위치',
    navigation: '산업용 잉크젯 인쇄 가이드', viewDetails: '제품 상세 보기',
    contactTitle: '잉크 공급 회로 상담',
    contactDescription: '프린터 모델, 잉크와 세척액의 종류, 목표 유량, 사용 온도와 압력을 알려 주세요.',
    connectionContactDescription: '튜브 치수와 양쪽 연결 방식, 잉크와 세척액의 종류, 필요한 유량과 압력을 알려 주세요.',
  },
  ru: {
    ...ivdUi.ru, home: 'Главная', applications: 'Области применения', breadcrumb: 'Навигационная цепочка',
    navigation: 'Руководства по промышленной струйной печати', viewDetails: 'Подробнее о продукте',
    contactTitle: 'Обсудите с нами контур подачи чернил',
    contactDescription: 'Укажите модель принтера, чернила и промывочную жидкость, требуемый расход, рабочую температуру и давление.',
    connectionContactDescription: 'Укажите размеры трубки, соединения с обеих сторон, рабочие жидкости, требуемый расход и давление.',
  },
  'zh-CN': {
    home: '首页', applications: '应用领域', breadcrumb: '应用导航', back: '返回',
    guide: '应用指南', navigation: '工业喷墨应用指南', overview: '工业喷墨印刷概览',
    browse: '查看', close: '关闭应用指南', pumpGroup: inkjetPumpGuideLinkZh.label,
    onThisPage: '本页目录', references: '参考资料', viewReferences: '查看参考资料',
    related: '相关指南', sources: '来源', reference: '参考资料', viewDetails: '查看产品详情',
    contactTitle: inkjetContactZh.title, contactDescription: inkjetContactZh.description, contactButton: inkjetContactZh.button,
    connectionContactDescription: '请提供墨路图、管内外径、两端接口、油墨与清洗液，以及实际流量、温度、压力和拆装要求，便于核对管组件和接头配置。',
  },
} as const;

const hindiInkjetUi = {
  ...hindiIvdUi,
  home: 'मुखपृष्ठ', applications: 'अनुप्रयोग', breadcrumb: 'पृष्ठ का नेविगेशन पथ',
  navigation: 'औद्योगिक इंकजेट की अनुप्रयोग मार्गदर्शिकाएँ',
  overview: 'औद्योगिक इंकजेट प्रिंटिंग का अवलोकन',
  pumpGroup: 'डायाफ्राम पंप का चयन', viewDetails: 'उत्पाद का विवरण देखें',
  contactTitle: 'अपने स्याही सर्किट पर चर्चा करें',
  contactDescription: 'प्रिंटर का मॉडल, स्याही और सफ़ाई का तरल, लक्ष्य प्रवाह, तापमान और संचालन दाब बताएँ।',
  connectionContactDescription: 'ट्यूब के आयाम, सिरों के कनेक्शन, स्याही और सफ़ाई का तरल तथा आवश्यक प्रवाह और दाब बताएँ।',
};

export function getInkjetPageMetadata({ document, href, image, contentLocale }: InkjetApplicationPage, germanDraft = false, italianDraft = false, hindiDraft = false): Metadata {
  const canonical = getCanonicalUrl(germanDraft ? getDraftHrefForEnglish(href, 'de') : italianDraft ? getDraftHrefForEnglish(href, 'it') : hindiDraft ? getDraftHrefForEnglish(href, 'hi') : href);
  const key = getInkjetRouteKey(href);
  if (!key) throw new Error(`Unknown inkjet route: ${href}`);
  const counterparts = key === 'inkFiltration' ? getEnabledLocaleCodes() : inkjetLocales;
  const languages = Object.fromEntries([
    ...counterparts.map(code => [code, getCanonicalUrl(getInkjetPageHref(code, key))]),
    ['x-default', getCanonicalUrl(getInkjetPageHref('en', key))],
  ]);
  const ogLocales = { en: 'en_US', 'zh-CN': 'zh_CN', es: 'es_ES', fr: 'fr_FR', ko: 'ko_KR', ru: 'ru_RU' };
  return {
    title: { absolute: document.seoTitle },
    description: document.description,
    alternates: germanDraft || italianDraft || hindiDraft ? { canonical } : { canonical, languages },
    ...(germanDraft || italianDraft || hindiDraft ? { robots: { index: false } } : {}),
    openGraph: {
      type: 'website', siteName: 'FOREACH', title: document.seoTitle, description: document.description,
      locale: germanDraft ? 'de_DE' : italianDraft ? 'it_IT' : hindiDraft ? 'hi_IN' : ogLocales[contentLocale ?? 'zh-CN'], url: canonical, images: [image],
    },
    twitter: { card: 'summary_large_image', title: document.seoTitle, description: document.description, images: [image] },
  };
}

export default function IndustrialInkjetReviewPage({ page, germanHub = false, germanCopy, italianCopy, hindiCopy }: {
  page: InkjetApplicationPage;
  germanHub?: boolean;
  germanCopy?: GermanApplicationCopy;
  italianCopy?: ItalianApplicationCopy;
  hindiCopy?: HindiApplicationCopy;
}) {
  const germanDraft = germanHub || Boolean(germanCopy);
  const { image, document } = page;
  const href = germanDraft ? getDraftHrefForEnglish(page.href, 'de') : italianCopy ? getDraftHrefForEnglish(page.href, 'it') : hindiCopy ? getDraftHrefForEnglish(page.href, 'hi') : page.href;
  const locale = page.contentLocale ?? 'zh-CN';
  const siteLocale = locale;
  const ui = germanDraft ? germanInkjetHubUi : italianCopy ? italianInkjetUi : hindiCopy ? hindiInkjetUi : inkjetUi[locale];
  const contentLanguage = germanDraft ? 'de' : italianCopy ? 'it' : hindiCopy ? 'hi' : locale;
  const nav = locale === 'zh-CN' ? undefined : getInkjetNav(locale);
  const translateHindi = (text: string) => getHindiApplicationTranslation(hindiCopy ?? {}, text, document.slug);
  const labelFor = (label: string) => germanCopy ? translateGermanApplication(label, germanCopy) : italianCopy ? translateItalianApplication(label, italianCopy) : hindiCopy ? translateHindi(label) : label;
  const key = getInkjetRouteKey(page.href);
  if (!key) throw new Error(`Unknown inkjet route: ${page.href}`);
  const pageLink = (target: InkjetRouteKey, labelOverride?: string) => {
    const targetHref = getInkjetPageHref(locale, target);
    const label = labelOverride ?? (germanDraft && target === key ? document.navLabel
      : germanDraft && target === 'guide' ? germanInkjetGuideLabel : labelFor(nav?.labels[target] ?? document.navLabel));
    if (italianCopy) {
      const destination = target === key ? { href, hrefLang: 'it' as const } : getItalianDraftLink(targetHref);
      return { ...destination, label: label + (destination.hrefLang === 'en' ? italianEnglishFallbackSuffix : '') };
    }
    if (hindiCopy) {
      const destination = target === key ? { href, hrefLang: 'hi' as const } : getHindiDraftLink(targetHref);
      return { ...destination, label: label + (destination.hrefLang === 'en' ? hindiEnglishFallbackSuffix : '') };
    }
    if (!germanDraft) return { label, href: targetHref };

    const destination = target === key ? { href, hrefLang: 'de' as const } : getGermanInkjetDraftLink(targetHref);
    return { ...destination, label: label + (destination.hrefLang === 'en' ? germanEnglishFallbackSuffix : '') };
  };
  const hindiBreadcrumbLink = (href: string, label: string) => {
    const target = getHindiDraftLink(href);
    return { ...target, label: label + (target.hrefLang === 'en' ? hindiEnglishFallbackSuffix : '') };
  };
  const applicationsLink = hindiCopy ? hindiBreadcrumbLink('/en/applications/', ui.applications) : {
    label: ui.applications,
    href: germanDraft ? '/de/applications/' : italianCopy ? getItalianDraftLink('/en/applications/').href : locale === 'zh-CN' ? '/#applications' : getLocalizedSiteHref('/applications/', locale),
  };
  const isHub = key === 'hub';
  const isConnectionPage = inkjetRoutes[key].startsWith(inkjetRoutes.connectionGuide);
  const trail = nav
    ? inkjetRouteKeys.filter(target => inkjetRoutes[key].startsWith(inkjetRoutes[target]))
      .sort((a, b) => inkjetRoutes[a].length - inkjetRoutes[b].length).map(target => pageLink(target))
    : [{ label: document.navLabel, href }];
  const parent = trail.at(-2) ?? applicationsLink;
  const breadcrumbs = [
    hindiCopy ? hindiBreadcrumbLink('/en/', ui.home) : { label: ui.home, href: germanDraft ? '/de/' : italianCopy ? getItalianDraftLink('/en/').href : getLocalizedSiteHref('/', locale) },
    applicationsLink,
    ...trail.map(item => ({ label: item.label, href: item.href === href ? undefined : item.href, ...(hindiCopy && 'hrefLang' in item ? { hrefLang: item.hrefLang } : {}) })),
  ];
  const canonical = getCanonicalUrl(href);
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'WebPage', '@id': canonical, url: canonical, name: document.title, description: document.description, inLanguage: hindiCopy ? 'hi-IN' : contentLanguage },
      {
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbs.map((item, index) => ({
          '@type': 'ListItem', position: index + 1, name: item.label,
          item: getCanonicalUrl(item.href ?? href),
        })),
      },
    ],
  };

  const relatedProducts = page.pumps.flatMap(pump => {
    const href = getDiaphragmPumpPath(locale, pump.slug);
    const imageSrc = inkjetProductImagesByHref[getDiaphragmPumpPath('en', pump.slug)];
    return imageSrc ? [{ id: pump.productId, title: pump.title, href, imageSrc, imageAlt: pump.title }] : [];
  });
  const articleLibrary = getTechnicalArticlesPageData(locale).articles;
  const articles = page.articles.flatMap(reading => {
    const article = articleLibrary.find(item => item.slug === reading.slug);
    return article ? [{ id: article.id, slug: article.slug, date: article.date, coverImage: article.coverImage, title: article.title, summary: article.summary }] : [];
  });
  const companion = !nav ? articleLibrary.find(item => item.slug === inkStarvationTroubleshootingSlug) : undefined;
  const navOverview = nav ? pageLink(isHub ? 'hub' : 'guide') : { label: document.navLabel, href };
  const productImages = {
    ...Object.fromEntries(Object.entries(nav ? inkjetProductImagesByHref : {})
      .map(([url, imageSrc]) => [germanDraft ? getGermanInkjetDraftLink(url).href : italianCopy ? getItalianDraftLink(url).href : hindiCopy ? getHindiDraftLink(url).href : getLocalizedSiteHref(url, locale), imageSrc])),
    ...Object.fromEntries((page.relatedProducts ?? []).map(product => [germanDraft ? getGermanInkjetDraftLink(product.href).href : italianCopy ? getItalianDraftLink(product.href).href : hindiCopy ? getHindiDraftLink(product.href).href : product.href, product.imageSrc])),
  };
  const groups = nav ? (isHub ? [{
    id: 'inkjet-printer', label: pageLink('guide').label, overview: pageLink('guide'), children: [],
  }] : [{
    id: 'inkjet-diaphragm-pumps', label: labelFor(nav.pumpGroup), defaultExpanded: key === 'guide',
    children: inkjetSceneKeys.map(target => pageLink(target)),
  }, {
    id: 'inkjet-tubing-and-fittings', label: labelFor(nav.labels.connectionGuide),
    children: [pageLink('connectionGuide', labelFor(nav.groupOverview)), pageLink('fixedInkLines'), pageLink('inkTankQuickDisconnects')],
  }, {
    id: 'inkjet-filtration-and-flow-control', label: labelFor(nav.labels.flowControlGuide),
    children: [pageLink('flowControlGuide', labelFor(nav.groupOverview)), pageLink('inkFiltration'), pageLink('cleaningFluidSwitching')],
  }]) : companion ? [{
    id: companion.slug, label: companion.title,
    overview: { label: companion.title, href: getLocalizedSiteHref(`/resources/technical-articles/${companion.slug}/`, locale) },
    children: [],
  }] : [];

  const germanRelated = germanCopy ? getGermanReviewResources({
    locale: siteLocale, products: page.relatedProducts ?? relatedProducts, articles, videos: [],
  }, germanCopy) : undefined;
  const italianRelated = italianCopy ? getItalianReviewResources({
    locale: siteLocale, products: page.relatedProducts ?? relatedProducts, articles, videos: [],
  }, italianCopy) : undefined;
  const hindiRelated = hindiCopy ? getHindiApplicationResources({
    locale: siteLocale, products: page.relatedProducts ?? relatedProducts, articles, videos: [],
  }, translateHindi) : undefined;
  const localizedResources = germanRelated ?? italianRelated ?? hindiRelated;
  const contact = italianCopy ? getItalianDraftLink('/en/contact/') : hindiCopy ? getHindiDraftLink('/en/contact/') : undefined;
  return (
    <div className={`${reviewStyles.page} ${contentStyles.page}`} lang={hindiCopy ? 'hi-IN' : contentLanguage} data-application-content-page data-review-locale={germanDraft ? 'de' : italianCopy ? 'it' : hindiCopy ? 'hi' : page.contentLocale ? undefined : locale}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} />
      <SiteBreadcrumb
        variant="bar"
        ariaLabel={ui.breadcrumb}
        items={breadcrumbs}
        singleLine={locale === 'en' ? { overflowLabel: germanDraft ? 'Weitere Breadcrumb-Links anzeigen' : italianCopy ? 'Mostra altri livelli di navigazione' : hindiCopy ? 'नेविगेशन के और लिंक दिखाएँ' : 'Show more breadcrumb links' } : undefined}
      />
      <div className={`${newsStyles.page} ${reviewStyles.reviewStatus}`}>
        <Link className={newsStyles.backLink} href={parent.href} prefetch={false} aria-label={`${ui.back} ${parent.label}`} data-application-back-link>{`< ${ui.back}`}</Link>
      </div>
      <AnalyticalApplicationDocument
        document={document}
        embedded
        locale={hindiCopy ? 'hi-IN' : contentLanguage}
        labels={ui}
        productLinkCards={{ imagesByHref: productImages, viewDetails: ui.viewDetails }}
        hideRelatedResources
        navigation={<ApplicationGuideNavigation
          key={href}
          id="inkjet-application-navigation"
          desktopGroupToggles={Boolean(nav)}
          ariaLabel={ui.navigation}
          overview={navOverview}
          groups={groups}
          currentHref={href}
          mobileTitle={nav ? navOverview.label : ui.navigation}
          drawerEyebrow={ui.guide}
          drawerTitle={nav ? navOverview.label : ui.navigation}
          browseLabel={ui.browse}
          closeLabel={ui.close}
          tasksLabel={germanDraft ? 'Aufgaben' : italianCopy ? 'attività' : hindiCopy ? 'कार्य' : undefined}
        />}
      />
      <div id="inkjet-selection-guides">
        {page.relatedProducts
          ? <RelatedProducts locale={siteLocale} uiLocale={contentLanguage} products={localizedResources?.products ?? page.relatedProducts} />
          : localizedResources ? <RelatedResourcesLoader {...localizedResources} />
            : <RelatedResourcesLoader locale={siteLocale} uiLocale={contentLanguage} products={relatedProducts} articles={germanHub ? getGermanRelatedArticles(articles) : articles} videos={[]} />}
      </div>
      <section
        className={reviewStyles.contact}
        id="inkjet-contact"
        aria-labelledby="inkjet-contact-heading"
        data-review-contact
        style={{ backgroundImage: `linear-gradient(105deg, rgba(12, 34, 70, .94), rgba(23, 51, 104, .83)), url(${image})` }}
      >
        <div className={reviewStyles.contactInner}>
          <div>
            <h2 id="inkjet-contact-heading">{ui.contactTitle}</h2>
            <p>{page.contactDescription ?? (isConnectionPage ? ui.connectionContactDescription : ui.contactDescription)}</p>
          </div>
          <BottomCtaButton href={germanDraft ? '/de/contact/' : contact?.href ?? getLocalizedSiteHref('/contact/', siteLocale)}>{ui.contactButton}{contact?.hrefLang === 'en' ? (hindiCopy ? hindiEnglishFallbackSuffix : italianEnglishFallbackSuffix) : ''}</BottomCtaButton>
        </div>
      </section>
    </div>
  );
}
