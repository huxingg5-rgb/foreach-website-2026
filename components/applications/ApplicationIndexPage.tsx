import 'server-only';
import Image from 'next/image';
import Link from 'next/link';
import SiteBreadcrumb from '@/components/common/SiteBreadcrumb';
import ApplicationBanner from './ApplicationBanner';
import { getApplicationIndexData, type ApplicationIndexLocale } from '@/data/applications/application-index-locales';
import reviewStyles from './EnglishReviewPage.module.css';
import styles from './ApplicationIndexPage.module.css';
import { getCanonicalUrl } from '@/lib/seo/site-url';

export default function ApplicationIndexPage({ locale }: { locale: ApplicationIndexLocale }) {
  const { copy, areas, choices, homeHref, contactHref } = getApplicationIndexData(locale);
  const isEnglish = locale === 'en';
  const Heading = 'h2';
  const schema = { '@context': 'https://schema.org', '@graph': [
    { '@type': 'CollectionPage', '@id': getCanonicalUrl(`/${locale}/applications/`), url: getCanonicalUrl(`/${locale}/applications/`), name: copy.seoTitle, description: copy.seoDescription, inLanguage: locale, mainEntity: { '@type': 'ItemList', itemListElement: areas.map((area, index) => ({ '@type': 'ListItem', position: index + 1, name: area.title, url: getCanonicalUrl(area.href) })) } },
    { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: copy.breadcrumbHome, item: getCanonicalUrl(homeHref) }, { '@type': 'ListItem', position: 2, name: copy.breadcrumbCurrent, item: getCanonicalUrl(`/${locale}/applications/`) }] },
  ] };
  return <div className={reviewStyles.page} lang={locale} data-application-index-locale={locale}>
    {<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} />}
    <ApplicationBanner titleTag="h1" title={copy.heroTitle} highlight={copy.heroHighlight} description={copy.heroDescription} />
    <SiteBreadcrumb variant="bar" ariaLabel={copy.breadcrumbAriaLabel} items={[{ label: copy.breadcrumbHome, href: homeHref }, { label: copy.breadcrumbCurrent }]} />
    <main className={styles.main}>
      <section aria-labelledby="application-areas-heading">
        <div className={styles.intro}>
          <Heading id="application-areas-heading">{copy.heading}</Heading>
          <p>{copy.intro}</p>
        </div>
        <div className={styles.grid}>
          {areas.map(area => <article className={styles.card} key={area.kind} aria-labelledby={`area-${area.kind}`}>
            <div className={styles.scene}>
              <Image src={isEnglish && area.kind === 'environmental-monitoring' ? '/images/applications/environmental-monitoring/environmental-monitoring-hero-bg-1920x800-v001.webp' : area.image} alt={area.imageAlt} fill sizes="(max-width: 600px) calc(100vw - 40px), (max-width: 960px) 46vw, 31vw" />
            </div>
            <div className={styles.cardContent}>
              <h2 id={`area-${area.kind}`} title={area.title}><Link href={area.href} prefetch={false}>{area.title}</Link></h2>
              <p className={styles.description} title={area.description}>{area.description}</p>
              <nav className={styles.topicNav} aria-label={copy.topicNavLabel.replace('{area}', area.title)}>
                <ul className={styles.topics}>{area.topics.map(item => <li key={item.href}><Link className={`${styles.topicLink} brand-navy-button-motion`} title={item.label} href={item.href} prefetch={false}><span className={styles.topicLabel}>{item.label}</span></Link></li>)}</ul>
              </nav>
              <Link className={`${styles.domainLink} site-footer__contact-link`} href={area.href} prefetch={false} aria-label={copy.detailsAriaLabel.replace('{area}', area.title)}>{copy.detailsLabel.replace('{area}', area.title)}</Link>
            </div>
          </article>)}
        </div>
      </section>
      <section className={styles.guidance} aria-labelledby="application-choice-heading">
        <h2 id="application-choice-heading">{copy.guidanceHeading}</h2>
        <p className={styles.guidanceIntro}>{copy.guidanceIntro}</p>
        <div className={styles.choices}>
          {choices.map(choice => <div className={styles.choice} key={choice.title}>
            <h3>{choice.title}</h3>
            <ul>{choice.routes.map(route => <li key={route.kind}>
              <span>{route.label}</span>
              <Link className="site-footer__contact-link" href={route.href} prefetch={false}>{route.domain}</Link>
            </li>)}</ul>
          </div>)}
        </div>
      </section>
    </main>
    <section className={reviewStyles.contact} aria-labelledby="application-contact-heading" style={{ backgroundImage: 'linear-gradient(105deg, rgba(12, 34, 70, .94), rgba(23, 51, 104, .83)), url(/images/applications/lab-automation/lab-automation-cta-bg-1920x520-v001.webp)' }}>
      <div className={reviewStyles.contactInner}>
        <div><h2 id="application-contact-heading">{copy.contactHeading}</h2><p>{copy.contactDescription}</p></div>
        <Link href={contactHref}>{copy.contactLabel}</Link>
      </div>
    </section>
  </div>;
}
