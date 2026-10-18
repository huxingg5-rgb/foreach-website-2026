import styles from './ApplicationBanner.module.css';

export const applicationBannerImages: Record<string, string> = {
  'ivd-page': '/images/applications/ivd/ivd-hero-bg-1920x800-v001.webp',
  'life-science-page': '/images/applications/life-science/life-science-hero-bg-1920x800-v001.webp',
  'lab-automation-page': '/images/applications/lab-automation/lab-automation-hero-bg-1920x800-v001.webp',
  'analytical-instruments-page': '/images/applications/analytical-instruments/analytical-instruments-hero-bg-1920x800-v001.webp',
  'environmental-monitoring-page': '/images/applications/environmental-monitoring/environmental-monitoring-hero-bg-1920x800-v001.webp',
  'synthetic-biology-page': '/images/applications/synthetic-biology/synthetic-biology-hero-bg-1920x800-v001.webp',
};

type ApplicationBannerProps = {
  title: string;
  highlight: string;
  description: string;
  image?: string;
  titleTag?: 'h1' | 'div';
};

export default function ApplicationBanner({
  title,
  highlight,
  description,
  image = applicationBannerImages['ivd-page'],
  titleTag: Title = 'div',
}: ApplicationBannerProps) {
  return <section className={styles.hero} data-application-banner style={{ backgroundImage: `linear-gradient(90deg, rgba(25, 51, 88, .87), rgba(35, 80, 118, .40)), url(${image})` }}>
    <div className={styles.heroInner}>
      <Title className={styles.heroTitle} data-application-banner-title>{title}<br /><span>{highlight}</span></Title>
      <p className={styles.heroDescription} data-application-banner-description>{description}</p>
    </div>
  </section>;
}
