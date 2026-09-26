"use client";

import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { useCallback, useEffect, useRef, useState } from "react";

import TutorialVideoCard from "@/components/resources/installation-guide/TutorialVideoCard";
import TutorialVideoPlayerModal, {
  getGuidePlayerSource,
} from "@/components/resources/installation-guide/TutorialVideoPlayerModal";
import TechnicalArticleCard from "@/components/resources/technical-articles/TechnicalArticleCard";
import type { InstallationGuideCard } from "@/data/resources/installation-guide/installation-guide.types";
import { getRelatedResourcesText } from "@/data/resources/related-resources/related-resources.intl";
import { trackResourceView } from "@/lib/analytics/track-event";
import type { RelatedResourcesData } from "./related-resources.types";
import styles from "./RelatedResources.module.css";

type ResourceTrackProps = {
  ariaLabel: string;
  children: ReactNode;
  itemCount: number;
  trackClassName: string;
};

/**
 * 关联资源共用的横向轨道。
 *
 * 左右箭头始终作为轨道边界显示，但只有实际发生溢出时才允许点击；不会为了
 * 激活箭头而制造无意义滚动。ResizeObserver 同时监听轨道和卡片尺寸，确保
 * 初次渲染、窗口变化及数据变化后都能重新计算禁用状态和首尾位置。
 */
function ResourceTrack({
  ariaLabel,
  children,
  itemCount,
  trackClassName,
}: ResourceTrackProps) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [trackState, setTrackState] = useState({
    hasOverflow: false,
    isAtStart: true,
    isAtEnd: true,
  });

  const updateTrackState = useCallback(() => {
    const viewport = viewportRef.current;

    if (!viewport) {
      return;
    }

    const maximumScrollLeft = Math.max(
      0,
      viewport.scrollWidth - viewport.clientWidth,
    );
    const tolerance = 2;
    const nextState = {
      hasOverflow: maximumScrollLeft > tolerance,
      isAtStart: viewport.scrollLeft <= tolerance,
      isAtEnd: viewport.scrollLeft >= maximumScrollLeft - tolerance,
    };

    setTrackState((currentState) => {
      if (
        currentState.hasOverflow === nextState.hasOverflow &&
        currentState.isAtStart === nextState.isAtStart &&
        currentState.isAtEnd === nextState.isAtEnd
      ) {
        return currentState;
      }

      return nextState;
    });
  }, []);

  useEffect(() => {
    const viewport = viewportRef.current;

    if (!viewport) {
      return;
    }

    const resizeObserver = new ResizeObserver(updateTrackState);
    const animationFrame = window.requestAnimationFrame(updateTrackState);

    resizeObserver.observe(viewport);
    Array.from(viewport.children).forEach((child) => {
      resizeObserver.observe(child);
    });
    viewport.addEventListener("scroll", updateTrackState, { passive: true });
    window.addEventListener("resize", updateTrackState);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
      viewport.removeEventListener("scroll", updateTrackState);
      window.removeEventListener("resize", updateTrackState);
    };
  }, [itemCount, updateTrackState]);

  /** 每次点击只移动一张卡片，优先使用相邻卡片的实际起点距离。 */
  function scrollOneCard(direction: -1 | 1) {
    const viewport = viewportRef.current;

    if (!viewport) {
      return;
    }

    const items = Array.from(
      viewport.querySelectorAll<HTMLElement>("[data-related-track-item]"),
    );
    const firstItem = items[0];
    const secondItem = items[1];

    if (!firstItem) {
      return;
    }

    const computedStyle = window.getComputedStyle(viewport);
    const gap = Number.parseFloat(computedStyle.columnGap || computedStyle.gap) || 0;
    const step = secondItem
      ? secondItem.offsetLeft - firstItem.offsetLeft
      : firstItem.getBoundingClientRect().width + gap;

    viewport.scrollBy({
      left: direction * step,
      behavior: "smooth",
    });
  }

  return (
    <div className={styles.trackShell}>
      <button
        type="button"
        className={`${styles.trackButton} ${styles.trackButtonPrevious}`}
        aria-label={`${ariaLabel}: previous`}
        disabled={!trackState.hasOverflow || trackState.isAtStart}
        onClick={() => scrollOneCard(-1)}
      >
        <span aria-hidden="true">‹</span>
      </button>

      <div
        ref={viewportRef}
        className={`${styles.trackViewport} ${trackClassName}`}
        aria-label={ariaLabel}
      >
        {children}
      </div>

      <button
        type="button"
        className={`${styles.trackButton} ${styles.trackButtonNext}`}
        aria-label={`${ariaLabel}: next`}
        disabled={!trackState.hasOverflow || trackState.isAtEnd}
        onClick={() => scrollOneCard(1)}
      >
        <span aria-hidden="true">›</span>
      </button>
    </div>
  );
}

export default function RelatedResourcesClient({
  locale, videos: allRelatedVideos, products: featuredProducts,
  articles: allRelatedArticles, primaryRelationKey,
}: RelatedResourcesData) {
  const [selectedVideo, setSelectedVideo] = useState<InstallationGuideCard | null>(null);
  const [playRequestId, setPlayRequestId] = useState(0);
  const ui = getRelatedResourcesText(locale);
  const localePrefix = locale === "zh-CN" ? "" : `/${locale}`;
  const showVideos = allRelatedVideos.length > 0;
  const showProducts = featuredProducts.length > 0;
  const showArticles = allRelatedArticles.length > 0;
  const resourceGroupLabel = [
    showVideos ? ui.relatedVideos : null,
    showProducts ? ui.relatedProducts : null,
    showArticles ? ui.relatedArticles : null,
  ].filter((label): label is string => Boolean(label)).join(", ");

  function handleVideoSelect(guide: InstallationGuideCard) {
    setSelectedVideo(guide);
    setPlayRequestId((currentId) => currentId + 1);

    const playerSource = getGuidePlayerSource(guide, false);

    if (playerSource.type !== "empty") {
      const sourcePath = playerSource.src.split(/[?#]/)[0];
      const fileType =
        playerSource.type === "video"
          ? sourcePath.split(".").at(-1) || "video"
          : guide.videoPlatform || "embed";

      trackResourceView({
        resourceId: `installation_guide:${guide.id}`,
        resourceType: "installation_guide",
        fileType,
        sourceSection: "related_resources",
        locale,
      });
    }
  }

  return (
    <aside className={styles.root} aria-label={resourceGroupLabel}>
      {showVideos ? (
        <section className={styles.section}>
          <div className={styles.headingRow}>
            <h2>{ui.relatedVideos}</h2>

            {allRelatedVideos.length > 3 && primaryRelationKey ? (
              <Link
                className={styles.viewAll}
                href={`${localePrefix}/resources/installation-guide?relationKey=${encodeURIComponent(
                  primaryRelationKey,
                )}`}
              >
                {ui.viewAll}
              </Link>
            ) : null}
          </div>

          <ResourceTrack
            ariaLabel={ui.relatedVideos}
            itemCount={allRelatedVideos.length}
            trackClassName={styles.videoTrack}
          >
            {allRelatedVideos.map((guide) => (
              <div
                key={guide.id}
                className={styles.trackItem}
                data-related-track-item
              >
                <TutorialVideoCard
                  guide={guide}
                  isSelected={selectedVideo?.id === guide.id}
                  onSelect={handleVideoSelect}
                  variant="related"
                />
              </div>
            ))}
          </ResourceTrack>
        </section>
      ) : null}

      {showProducts ? (
        <section className={styles.section}>
          <div className={styles.headingRow}>
            <h2>{ui.relatedProducts}</h2>
          </div>

          <ResourceTrack
            ariaLabel={ui.relatedProducts}
            itemCount={featuredProducts.length}
            trackClassName={styles.productTrack}
          >
            {featuredProducts.map((product) => {
              const { title, imageSrc, imageAlt } = product;

              return (
                <div
                  key={product.id}
                  className={styles.trackItem}
                  data-related-track-item
                >
                  <Link
                    className={styles.relatedProductCard}
                    href={product.href}
                  >
                    <div className={styles.relatedProductImage}>
                      {imageSrc ? (
                        <Image
                          src={imageSrc}
                          alt={imageAlt}
                          fill
                          sizes="(max-width: 760px) calc(100vw - 52px), (max-width: 1100px) 280px, 300px"
                        />
                      ) : null}
                    </div>

                    <div className={styles.relatedProductBody}>
                      <h3 title={title}>{title}</h3>
                    </div>
                  </Link>
                </div>
              );
            })}
          </ResourceTrack>
        </section>
      ) : null}

      {showArticles ? (
        <section className={styles.section}>
          <div className={styles.headingRow}>
            <h2>{ui.relatedArticles}</h2>
          </div>

          <ResourceTrack
            ariaLabel={ui.relatedArticles}
            itemCount={allRelatedArticles.length}
            trackClassName={styles.articleTrack}
          >
            {allRelatedArticles.map((article) => (
              <div
                key={article.id}
                className={styles.trackItem}
                data-related-track-item
              >
                <TechnicalArticleCard
                  article={article}
                  href={`${localePrefix}/resources/technical-articles/${article.slug}`}
                  locale={locale}
                  detailText={ui.viewDetails}
                  showSummary
                  showDate
                  showTags={false}
                  variant="related"
                />
              </div>
            ))}
          </ResourceTrack>
        </section>
      ) : null}

      {selectedVideo ? (
        <TutorialVideoPlayerModal
          guide={selectedVideo}
          locale={locale}
          playRequestId={playRequestId}
          onClose={() => setSelectedVideo(null)}
        />
      ) : null}
    </aside>
  );
}
