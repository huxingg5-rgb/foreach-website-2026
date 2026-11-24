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
import { ivdUi } from '@/data/applications/ivd-locales/ui';
import {
  inkjetContactZh,
  inkjetProductImagesByHref,
  inkjetPumpGuideLinkZh,
  type InkjetApplicationPage,
} from '@/data/applications/industrial-inkjet-printing.zh';
import { inkStarvationTroubleshootingSlug } from '@/data/resources/technical-articles/ink-starvation-troubleshooting.article';
import { getCanonicalUrl, getLocalizedSiteHref } from '@/lib/seo/site-url';
import { getDiaphragmPumpPath } from '@/data/products/detail/diaphragm-pump-routes';
import { getTechnicalArticlesPageData } from '@/services/resources/technical-articles/getTechnicalArticlesPageData';

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

export function getInkjetPageMetadata({ document, href, image, contentLocale }: InkjetApplicationPage): Metadata {
  const canonical = getCanonicalUrl(href);
  const key = getInkjetRouteKey(href);
  if (!key) throw new Error(`Unknown inkjet route: ${href}`);
  const counterparts = inkjetLocales;
  const languages = Object.fromEntries([
    ...counterparts.map(code => [code, getCanonicalUrl(getInkjetPageHref(code, key))]),
    ['x-default', getCanonicalUrl(getInkjetPageHref('en', key))],
  ]);
  const ogLocales = { en: 'en_US', 'zh-CN': 'zh_CN', es: 'es_ES', fr: 'fr_FR', ko: 'ko_KR', ru: 'ru_RU' };
  return {
    title: { absolute: document.seoTitle },
    description: document.description,
    alternates: { canonical, languages },
    openGraph: {
      type: 'website', siteName: 'FOREACH', title: document.seoTitle, description: document.description,
      locale: ogLocales[contentLocale ?? 'zh-CN'], url: canonical, images: [image],
    },
    twitter: { card: 'summary_large_image', title: document.seoTitle, description: document.description, images: [image] },
  };
}

export default function IndustrialInkjetReviewPage({ page }: { page: InkjetApplicationPage }) {
  const { href, image, document } = page;
  const locale = page.contentLocale ?? 'zh-CN';
  const siteLocale = locale;
  const ui = inkjetUi[locale];
  const nav = locale === 'zh-CN' ? undefined : getInkjetNav(locale);
  const key = getInkjetRouteKey(href);
  if (!key) throw new Error(`Unknown inkjet route: ${href}`);
  const pageLink = (target: InkjetRouteKey) => ({
    label: nav?.labels[target] ?? document.navLabel,
    href: getInkjetPageHref(locale, target),
  });
  const applicationsLink = {
    label: ui.applications,
    href: locale === 'zh-CN' ? '/#applications' : getLocalizedSiteHref('/applications/', locale),
  };
  const isHub = key === 'hub';
  const isConnectionPage = inkjetRoutes[key].startsWith(inkjetRoutes.connectionGuide);
  const trail = nav
    ? inkjetRouteKeys.filter(target => inkjetRoutes[key].startsWith(inkjetRoutes[target]))
      .sort((a, b) => inkjetRoutes[a].length - inkjetRoutes[b].length).map(pageLink)
    : [{ label: document.navLabel, href }];
  const parent = trail.at(-2) ?? applicationsLink;
  const breadcrumbs = [
    { label: ui.home, href: getLocalizedSiteHref('/', locale) },
    applicationsLink,
    ...trail.map(item => ({ label: item.label, href: item.href === href ? undefined : item.href })),
  ];
  const canonical = getCanonicalUrl(href);
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'WebPage', '@id': canonical, url: canonical, name: document.title, description: document.description, inLanguage: locale },
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
      .map(([url, imageSrc]) => [getLocalizedSiteHref(url, locale), imageSrc])),
    ...Object.fromEntries((page.relatedProducts ?? []).map(product => [product.href, product.imageSrc])),
  };
  const groups = nav ? (isHub ? [{
    id: 'inkjet-printer', label: nav.labels.guide, overview: pageLink('guide'), children: [],
  }] : [{
    id: 'inkjet-diaphragm-pumps', label: nav.pumpGroup, defaultExpanded: key === 'guide',
    children: inkjetSceneKeys.map(pageLink),
  }, {
    id: 'inkjet-tubing-and-fittings', label: nav.labels.connectionGuide, overview: pageLink('connectionGuide'),
    children: [pageLink('fixedInkLines'), pageLink('inkTankQuickDisconnects')],
  }, {
    id: 'inkjet-filtration-and-flow-control', label: nav.labels.flowControlGuide, overview: pageLink('flowControlGuide'),
    children: [pageLink('inkFiltration'), pageLink('cleaningFluidSwitching')],
  }]) : companion ? [{
    id: companion.slug, label: companion.title,
    overview: { label: companion.title, href: getLocalizedSiteHref(`/resources/technical-articles/${companion.slug}/`, locale) },
    children: [],
  }] : [];
  return (
    <div className={`${reviewStyles.page} ${contentStyles.page}`} lang={locale} data-application-content-page data-review-locale={page.contentLocale ? undefined : locale}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} />
      <SiteBreadcrumb variant="bar" ariaLabel={ui.breadcrumb} items={breadcrumbs} />
      <div className={`${newsStyles.page} ${reviewStyles.reviewStatus}`}>
        <Link className={newsStyles.backLink} href={parent.href} prefetch={false} aria-label={`${ui.back} ${parent.label}`} data-application-back-link>{`< ${ui.back}`}</Link>
      </div>
      <AnalyticalApplicationDocument
        document={document}
        embedded
        locale={locale}
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
        />}
      />
      <div id="inkjet-selection-guides">
        {page.relatedProducts
          ? <RelatedProducts locale={siteLocale} products={page.relatedProducts} />
          : <RelatedResourcesLoader locale={siteLocale} uiLocale={locale} products={relatedProducts} articles={articles} videos={[]} />}
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
          <BottomCtaButton href={getLocalizedSiteHref('/contact/', siteLocale)}>{ui.contactButton}</BottomCtaButton>
        </div>
      </section>
    </div>
  );
}
