"use client";

import Image from "next/image";
import Link from "next/link";
import { useLayoutEffect, useRef, useState } from "react";
import type { HomeApplicationsSectionData } from "@/data/home-applications.intl";
import styles from "./EnglishHomeSections.module.css";
import HomeSectionMoreLink from "./HomeSectionMoreLink";

type ApplicationListLimit = { visibleCount: number; height: number };

export default function HomeApplicationsSection({ data }: { data: HomeApplicationsSectionData }) {
  const { locale, copy, applications, tasks } = data;
  const visualRef = useRef<HTMLDivElement>(null);
  const introductionRef = useRef<HTMLParagraphElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const [listLimit, setListLimit] = useState<ApplicationListLimit | null>(null);

  useLayoutEffect(() => {
    const visual = visualRef.current;
    const introduction = introductionRef.current;
    const list = listRef.current;
    if (!visual || !introduction || !list) return;

    const desktop = window.matchMedia("(min-width: 1181px)");
    const rows = Array.from(list.children);

    const fitRows = () => {
      if (!desktop.matches) {
        setListLimit(null);
        return;
      }

      const imageBottom = visual.getBoundingClientRect().bottom;
      const listTop = list.getBoundingClientRect().top;
      let visibleCount = 0;
      let visibleBottom = listTop;
      let needsLimit = false;

      for (const row of rows) {
        const rowBottom = row.getBoundingClientRect().bottom;
        if (rowBottom > imageBottom) {
          needsLimit = true;
          // The last link can lose trailing padding if its content still fits.
          const trailingPadding = parseFloat(getComputedStyle(row).paddingBlockEnd);
          if (rowBottom - trailingPadding > imageBottom) break;
        }
        visibleCount += 1;
        visibleBottom = Math.min(rowBottom, imageBottom);
      }

      const height = visibleBottom - listTop;
      setListLimit((current) => {
        if (!needsLimit) return null;
        if (current?.visibleCount === visibleCount && current.height === height) return current;
        return { visibleCount, height };
      });
    };

    fitRows();
    const observer = new ResizeObserver(fitRows);
    observer.observe(visual);
    observer.observe(introduction);
    rows.forEach((row) => observer.observe(row));
    window.addEventListener("resize", fitRows);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", fitRows);
    };
  }, [applications]);

  return (
    <section id="applications" className={styles.section} data-locale={locale} aria-labelledby="home-applications-title">
      <div className={`${styles.container} ${styles.applicationLayout} home-company-about-main`}>
        <div className={`${styles.applicationTitle} home-company-about-left`}>
          <h2 id="home-applications-title" className="home-company-about-title">
            {copy.title}
            <span>{copy.subtitle}</span>
          </h2>
          <div ref={visualRef} className={`${styles.applicationVisual} home-company-video-wrap`}>
            <Image src="/images/home/company-bottom-bg.webp"
              alt={copy.imageAlt} fill
              sizes="(max-width: 1280px) 92vw, (max-width: 1600px) 45vw, 710px" />
          </div>
        </div>
        <div className={`${styles.applicationCopy} home-company-about-right`}>
          <h3 className="home-company-intro-title">{copy.industryTitle}</h3>
          <div className={styles.applicationDetails}>
            <p ref={introductionRef} className="home-company-intro-copy">{copy.introduction}</p>
            <div ref={listRef} id="home-application-list" className={styles.applicationRows}
              data-limited={listLimit ? "" : undefined} style={listLimit ? { maxHeight: listLimit.height } : undefined}>
              {applications.slice(0, 4).map((application, index) => (
                <Link key={application.slug} href={application.href} prefetch={false} className={styles.applicationRow}
                  data-overflow={listLimit && index >= listLimit.visibleCount ? "" : undefined}>
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
