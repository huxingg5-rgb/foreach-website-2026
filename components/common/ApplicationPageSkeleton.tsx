"use client";

/* =========================================================
   ApplicationPageSkeleton.tsx
   恒永达官网｜应用领域页面加载骨架

   说明：
   1. 用于 IVD、实验室自动化、生命科学、分析仪器、
      环保监测、合成生物等应用领域页面
   2. 页面切换时先显示结构框架
   3. 防止正文暂时为空时 Footer 提前顶上来
========================================================= */

import styles from "./ApplicationPageSkeleton.module.css";

function SkeletonBlock({
  className = "",
}: {
  className?: string;
}) {
  return (
    <div
      className={[styles.block, className]
        .filter(Boolean)
        .join(" ")}
    />
  );
}

export default function ApplicationPageSkeleton() {
  return (
    <section
      className={styles.page}
      aria-label="应用领域页面加载中"
      aria-busy="true"
    >
      <div className={styles.banner}>
        <div className={styles.bannerOverlay}>
          <div className={styles.container}>
            <SkeletonBlock className={styles.bannerTitle} />
            <SkeletonBlock className={styles.bannerSubtitle} />
          </div>
        </div>
      </div>

      <div className={styles.navBand}>
        <div className={styles.container}>
          <div className={styles.navItems}>
            {Array.from({ length: 6 }).map((_, index) => (
              <SkeletonBlock
                key={index}
                className={styles.navItem}
              />
            ))}
          </div>
        </div>
      </div>

      <div className={styles.container}>
        <section className={styles.introSection}>
          <SkeletonBlock className={styles.sectionEyebrow} />
          <SkeletonBlock className={styles.sectionTitle} />

          <div className={styles.introLines}>
            <SkeletonBlock className={styles.introLine} />
            <SkeletonBlock className={styles.introLine} />
            <SkeletonBlock className={styles.introLineShort} />
          </div>
        </section>

        <section className={styles.featureGrid}>
          {Array.from({ length: 3 }).map((_, index) => (
            <article
              key={index}
              className={styles.featureCard}
            >
              <SkeletonBlock className={styles.featureImage} />
              <div className={styles.featureContent}>
                <SkeletonBlock className={styles.featureNumber} />
                <SkeletonBlock className={styles.featureTitle} />
                <SkeletonBlock className={styles.featureText} />
                <SkeletonBlock className={styles.featureTextShort} />
              </div>
            </article>
          ))}
        </section>

        <section className={styles.sceneSection}>
          <SkeletonBlock className={styles.sectionEyebrow} />
          <SkeletonBlock className={styles.sectionTitleWide} />

          <div className={styles.sceneGrid}>
            {Array.from({ length: 6 }).map((_, index) => (
              <article
                key={index}
                className={styles.sceneCard}
              >
                <SkeletonBlock className={styles.sceneImage} />
                <div className={styles.sceneContent}>
                  <SkeletonBlock className={styles.sceneIndex} />
                  <SkeletonBlock className={styles.sceneTitle} />
                  <SkeletonBlock className={styles.sceneText} />
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}
