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

import { usePathname } from "next/navigation";
import { VALVELESS_PUMP_MODEL_SLUGS } from "@/data/products/selection/valveless-pump-routes";
import styles from "./ProductPageSkeleton.module.css";
import { resolveProductSkeletonRoute } from "./product-skeleton-route";

type ProductPageSkeletonProps = {
  variant: "selection" | "detail";
  routeSelectionPaths?: readonly string[];
  englishSelectionPaths?: readonly string[];
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
  routeSelectionPaths,
  englishSelectionPaths,
}: ProductPageSkeletonProps) {
  const pathname = usePathname();
  const route = resolveProductSkeletonRoute(pathname, variant, routeSelectionPaths, englishSelectionPaths);
  // Preserve the more specific valveless selection layout at Suspense boundaries.
  const valvelessRoute = pathname?.match(
    /^\/(?:(?:en|es|fr|ko|ru)\/)?products\/pumps\/valveless-metering-pump(?:\/([^/]+))?\/?$/,
  );
  const childSlug = valvelessRoute?.[1];
  const isValvelessSelection = Boolean(valvelessRoute)
    && (!childSlug || childSlug === "rpl" || childSlug === "drpl");
  const isValvelessDetail = Boolean(valvelessRoute)
    && VALVELESS_PUMP_MODEL_SLUGS.some((slug) => slug === childSlug);
  const resolvedVariant = isValvelessSelection ? "selection" : isValvelessDetail ? "detail" : route.variant;
  const cardCount = isValvelessSelection ? (childSlug === "rpl" ? 3 : childSlug === "drpl" ? 2 : 5) : 8;

  return (
    <section
      className={[styles.shell, isValvelessSelection ? styles.valvelessSelection : "", resolvedVariant === "detail" ? styles.detailShell : ""].filter(Boolean).join(" ")}
      data-product-skeleton={isValvelessSelection ? "valveless-selection" : resolvedVariant}
      data-skeleton-locale={route.locale}
      aria-busy="true"
      aria-hidden="true"
    >
      <div className={styles.breadcrumbBar}>
        <div className={styles.container}>
          <SkeletonBlock className={styles.breadcrumbLine} />
        </div>
      </div>

      {resolvedVariant === "selection" ? (
        <>
          <div className={styles.searchBand}>
            <SkeletonBlock className={styles.searchBox} />
          </div>

          <div className={[styles.container, isValvelessSelection ? styles.valvelessContent : ""].filter(Boolean).join(" ")}>
            <div className={styles.categoryTabs}>
              {Array.from({ length: isValvelessSelection ? 7 : 6 }).map((_, index) => (
                <SkeletonBlock
                  key={index}
                  className={styles.categoryTab}
                />
              ))}
            </div>

            {isValvelessSelection ? (
              <div className={styles.valvelessIntro}>
                <SkeletonBlock className={styles.valvelessIntroImage} />
                <div className={styles.valvelessIntroCopy}>
                  <SkeletonBlock className={styles.valvelessIntroTitle} />
                  {Array.from({ length: 6 }).map((_, index) => (
                    <SkeletonBlock key={index} className={styles.valvelessIntroLine} />
                  ))}
                  <SkeletonBlock className={styles.valvelessIntroMore} />
                </div>
              </div>
            ) : null}

            <div className={styles.selectionLayout}>
              <aside className={styles.filterPanel}>
                {isValvelessSelection ? (
                  <>
                    <SkeletonBlock className={styles.filterLabel} />
                    <div className={styles.valvelessTypeOptions}>
                      {Array.from({ length: 5 }).map((_, index) => (
                        <SkeletonBlock key={index} className={styles.valvelessFilterOption} />
                      ))}
                    </div>
                    <div className={styles.filterGroup}>
                      <SkeletonBlock className={styles.filterLabel} />
                      <SkeletonBlock className={styles.valvelessFilterOption} />
                      <SkeletonBlock className={styles.valvelessFilterOption} />
                    </div>
                  </>
                ) : (
                  <>
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
                  </>
                )}
              </aside>

              <div className={styles.selectionMain}>
                <div className={styles.toolbar}>
                  <SkeletonBlock className={styles.toolbarTitle} />
                  <SkeletonBlock className={styles.toolbarButton} />
                </div>

                <div className={styles.cardGrid}>
                  {Array.from({ length: cardCount }).map((_, index) => (
                    <article
                      key={index}
                      className={styles.productCard}
                    >
                      <SkeletonBlock className={styles.cardImage} />
                      <SkeletonBlock className={styles.cardTitle} />
                      <SkeletonBlock className={styles.cardMeta} />
                      {isValvelessSelection ? (
                        <div className={styles.valvelessCardActions}>
                          <SkeletonBlock className={styles.cardButton} />
                          <SkeletonBlock className={styles.cardButton} />
                        </div>
                      ) : <SkeletonBlock className={styles.cardButton} />}
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
                {/* The gallery count is unknown until product data resolves. */}
                <SkeletonBlock className={styles.galleryTrack} />
              </div>
            </div>

            <div className={styles.detailInfo}>
              <SkeletonBlock className={styles.detailTitle} />
              <SkeletonBlock className={styles.detailTitleShort} />

              <div className={styles.detailTextGroup}>
                {Array.from({ length: 3 }).map((_, index) => (
                  <div className={styles.detailParagraph} key={index}>
                    <SkeletonBlock className={styles.detailText} />
                    <SkeletonBlock className={styles.detailText} />
                    <SkeletonBlock className={styles.detailTextShort} />
                  </div>
                ))}
              </div>

              <div className={styles.detailModelRow}>
                <SkeletonBlock className={styles.detailModel} />
                <SkeletonBlock className={styles.detailConfigButton} />
              </div>

              <div className={styles.detailActionRow}>
                {/* Requests depend on product flags as well as locale. Reserve
                    the region without inventing a fixed number of buttons. */}
                <SkeletonBlock className={styles.detailActionsPlaceholder} />
              </div>
            </div>
          </div>

          <div className={styles.detailTabs}>
            <SkeletonBlock className={styles.detailTabsPlaceholder} />
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
