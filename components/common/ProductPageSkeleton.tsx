"use client";

/* =========================================================
   ProductPageSkeleton.tsx
   恒永达官网｜产品中心与产品详情页加载骨架

   说明：
   1. 页面切换时先显示结构占位
   2. 防止正文为空时 Footer 提前顶上来
   3. selection 用于产品中心
   4. detail 用于产品详情页
========================================================= */

import styles from "./ProductPageSkeleton.module.css";

type ProductPageSkeletonProps = {
  variant: "selection" | "detail";
};

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

export default function ProductPageSkeleton({
  variant,
}: ProductPageSkeletonProps) {
  return (
    <section
      className={styles.shell}
      aria-busy="true"
      aria-hidden="true"
    >
      <div className={styles.breadcrumbBar}>
        <div className={styles.container}>
          <SkeletonBlock className={styles.breadcrumbLine} />
        </div>
      </div>

      {variant === "selection" ? (
        <>
          <div className={styles.searchBand}>
            <SkeletonBlock className={styles.searchBox} />
          </div>

          <div className={styles.container}>
            <div className={styles.categoryTabs}>
              {Array.from({ length: 6 }).map((_, index) => (
                <SkeletonBlock
                  key={index}
                  className={styles.categoryTab}
                />
              ))}
            </div>

            <div className={styles.selectionLayout}>
              <aside className={styles.filterPanel}>
                <SkeletonBlock className={styles.filterTitle} />

                {Array.from({ length: 5 }).map((_, index) => (
                  <div
                    key={index}
                    className={styles.filterGroup}
                  >
                    <SkeletonBlock className={styles.filterLabel} />
                    <SkeletonBlock className={styles.filterOption} />
                    <SkeletonBlock className={styles.filterOptionShort} />
                  </div>
                ))}
              </aside>

              <div className={styles.selectionMain}>
                <div className={styles.toolbar}>
                  <SkeletonBlock className={styles.toolbarTitle} />
                  <SkeletonBlock className={styles.toolbarButton} />
                </div>

                <div className={styles.cardGrid}>
                  {Array.from({ length: 8 }).map((_, index) => (
                    <article
                      key={index}
                      className={styles.productCard}
                    >
                      <SkeletonBlock className={styles.cardImage} />
                      <SkeletonBlock className={styles.cardTitle} />
                      <SkeletonBlock className={styles.cardMeta} />
                      <SkeletonBlock className={styles.cardButton} />
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className={styles.container}>
          <div className={styles.detailHero}>
            <div className={styles.detailMedia}>
              <SkeletonBlock className={styles.detailImage} />

              <div className={styles.thumbnailRow}>
                {Array.from({ length: 4 }).map((_, index) => (
                  <SkeletonBlock
                    key={index}
                    className={styles.thumbnail}
                  />
                ))}
              </div>
            </div>

            <div className={styles.detailInfo}>
              <SkeletonBlock className={styles.detailEyebrow} />
              <SkeletonBlock className={styles.detailTitle} />
              <SkeletonBlock className={styles.detailTitleShort} />

              <div className={styles.detailTextGroup}>
                <SkeletonBlock className={styles.detailText} />
                <SkeletonBlock className={styles.detailText} />
                <SkeletonBlock className={styles.detailTextShort} />
              </div>

              <div className={styles.detailModelRow}>
                <SkeletonBlock className={styles.detailModel} />
                <SkeletonBlock className={styles.detailConfigButton} />
              </div>

              <div className={styles.detailActionRow}>
                <SkeletonBlock className={styles.detailAction} />
                <SkeletonBlock className={styles.detailAction} />
                <SkeletonBlock className={styles.detailActionWide} />
              </div>
            </div>
          </div>

          <div className={styles.detailTabs}>
            {Array.from({ length: 4 }).map((_, index) => (
              <SkeletonBlock
                key={index}
                className={styles.detailTab}
              />
            ))}
          </div>

          <div className={styles.detailPanel}>
            <SkeletonBlock className={styles.panelHeading} />

            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className={styles.specRow}
              >
                <SkeletonBlock className={styles.specLabel} />
                <SkeletonBlock className={styles.specValue} />
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
