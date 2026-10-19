import Image from "next/image";
import Link from "next/link";
import type { HomeApplicationsSectionData } from "@/data/home-applications.intl";
import styles from "./EnglishHomeSections.module.css";
import HomeSectionMoreLink from "./HomeSectionMoreLink";

export default function HomeApplicationsSection({ data }: { data: HomeApplicationsSectionData }) {
  const { locale, copy, applications, tasks } = data;

  return (
    <section id="applications" className={styles.section} data-locale={locale} aria-labelledby="home-applications-title">
      <div className={`${styles.container} ${styles.applicationLayout} home-company-about-main`}>
        <div className={`${styles.applicationTitle} home-company-about-left`}>
          <h2 id="home-applications-title" className="home-company-about-title">
            {copy.title}
            <span>{copy.subtitle}</span>
          </h2>
          <div className={`${styles.applicationVisual} home-company-video-wrap`}>
            <Image src="/images/applications/application-lab-automation-960.webp"
              alt={copy.imageAlt} fill
              sizes="(max-width: 1280px) 92vw, (max-width: 1600px) 45vw, 710px" />
          </div>
        </div>
        <div className={`${styles.applicationCopy} home-company-about-right`}>
          <h3 className="home-company-intro-title">{copy.industryTitle}</h3>
          <div className={styles.applicationDetails}>
            <p className="home-company-intro-copy">{copy.introduction}</p>
            <div id="home-application-list" className={styles.applicationRows}>
              {applications.slice(0, 4).map((application, index) => (
                <Link key={application.slug} href={application.href} prefetch={false} className={styles.applicationRow}>
                  <span className={styles.number} aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                  <span><strong>{application.name}</strong><small>{application.description}</small></span>
                  <span aria-hidden="true">↗</span>
                </Link>
              ))}
            </div>
            <div className="home-company-about-actions">
              <HomeSectionMoreLink href={data.allApplicationsHref}>
                {copy.allApplications}
              </HomeSectionMoreLink>
            </div>
          </div>
        </div>
      </div>
      <div className={`${styles.container} ${styles.taskGrid}`} role="list" aria-label={copy.tasksAriaLabel}>
        {tasks.map((task) => (
          <div key={task.key} className={styles.taskCard} role="listitem">
            <h3>{task.title}</h3>
            <p>{task.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
