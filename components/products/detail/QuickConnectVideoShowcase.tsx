"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent as ReactKeyboardEvent,
  type PointerEvent as ReactPointerEvent,
} from "react";
import styles from "./QuickConnectVideoShowcase.module.css";

/**
 * 产品详情页的“演示视频”区（参考 Keyto 产品页）：
 * 标题右侧切换“产品视频 / 工厂视频”，下方居中大视频，左右露出相邻视频，循环切换。
 * 切换方式：鼠标或手指左右拖动、点击两侧露出的视频、键盘左右方向键。
 * 只有点击播放时才加载 YouTube 或 MP4，避免拖慢页面。
 */

export type ShowcaseVideo = {
  id: string;
  title: string;
  cover: string;
  kind: "youtube" | "file";
  src: string;
};

export type ShowcaseGroup = {
  key: string;
  label: string;
  videos: ShowcaseVideo[];
  emptyText?: string;
  emptyLink?: { href: string; label: string };
};

type ShowcaseLabels = { play: string; select: string; carousel: string; previous: string; next: string };
const DEFAULT_LABELS: ShowcaseLabels = {
  play: "播放视频", select: "切换视频", carousel: "左右拖动或按方向键切换视频", previous: "上一个视频", next: "下一个视频",
};

// 与 CSS 里 .track 的 transition 时长一致，动画结束后把位置拉回中间那组。
const SLIDE_MS = 450;
// 拖动超过这个距离才算开始拖动，避免影响普通点击。
const DRAG_START_PX = 6;
// 松手时拖动距离超过 min(80px, 主视频宽度 15%) 就切换到相邻视频，否则弹回。
const SWIPE_MAX_PX = 80;
const SWIPE_RATIO = 0.15;

function withAutoplay(src: string) {
  return `${src}${src.includes("?") ? "&" : "?"}autoplay=1`;
}

type DragState = { pointerId: number; startX: number; startY: number; active: boolean };

export default function QuickConnectVideoShowcase({ title, groups, labels = DEFAULT_LABELS, onPlay }: {
  title: string; groups: ShowcaseGroup[]; labels?: ShowcaseLabels; onPlay?: (video: ShowcaseVideo) => void;
}) {
  const sectionId = useId();
  const visibleGroups = groups.filter(group => group.videos.length > 0 || group.emptyText);
  const initialGroup = visibleGroups.find(item => item.videos.length > 0) ?? visibleGroups[0];
  const [groupKey, setGroupKey] = useState(initialGroup?.key ?? "");
  const group = visibleGroups.find(item => item.key === groupKey) ?? visibleGroups[0];
  const videos = group?.videos ?? [];
  const count = videos.length;
  const loop = count > 1;

  // 循环：视频列表复制成三份，始终停在中间那份；走到两侧的复制品后，无动画地跳回中间对应位置。
  const [pos, setPos] = useState(initialGroup && initialGroup.videos.length > 1 ? initialGroup.videos.length : 0);
  const [animate, setAnimate] = useState(false);
  const [playingPos, setPlayingPos] = useState<number | null>(null);
  const [dragX, setDragX] = useState(0);
  const [dragging, setDragging] = useState(false);
  const busyRef = useRef(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dragRef = useRef<DragState | null>(null);

  useEffect(() => () => {
    if (timerRef.current) clearTimeout(timerRef.current);
  }, []);

  if (!group) return null;

  const slides = loop ? [...videos, ...videos, ...videos] : videos;

  function go(delta: number) {
    if (!loop || busyRef.current || delta === 0) return;
    busyRef.current = true;
    setPlayingPos(null);
    setAnimate(true);
    setPos(current => current + delta);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setAnimate(false);
      setPos(current => count + (((current - count) % count) + count) % count);
      busyRef.current = false;
    }, SLIDE_MS);
  }

  function switchGroup(key: string) {
    if (key === group?.key) return;
    const nextCount = visibleGroups.find(item => item.key === key)?.videos.length ?? 0;
    if (timerRef.current) clearTimeout(timerRef.current);
    busyRef.current = false;
    dragRef.current = null;
    setDragging(false);
    setDragX(0);
    setGroupKey(key);
    setAnimate(false);
    setPos(nextCount > 1 ? nextCount : 0);
    setPlayingPos(null);
  }

  function handlePointerDown(event: ReactPointerEvent<HTMLDivElement>) {
    if (!loop || busyRef.current) return;
    if (event.pointerType === "mouse" && event.button !== 0) return;
    // 正在播放的视频区域交给播放器自己处理（进度条、音量等）。
    if ((event.target as HTMLElement).closest("video, iframe")) return;
    dragRef.current = { pointerId: event.pointerId, startX: event.clientX, startY: event.clientY, active: false };
  }

  function handlePointerMove(event: ReactPointerEvent<HTMLDivElement>) {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    const dx = event.clientX - drag.startX;
    const dy = event.clientY - drag.startY;
    if (!drag.active) {
      if (Math.abs(dx) < DRAG_START_PX) return;
      // 竖向移动更多时当作页面滚动，不拖视频。
      if (Math.abs(dy) > Math.abs(dx)) {
        dragRef.current = null;
        return;
      }
      drag.active = true;
      setDragging(true);
      setPlayingPos(null);
      // 开始拖动后捕获指针：松手时的点击落在视频区本身，不会误触发播放或切换。
      event.currentTarget.setPointerCapture(event.pointerId);
    }
    setDragX(dx);
  }

  function handlePointerEnd(event: ReactPointerEvent<HTMLDivElement>) {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    dragRef.current = null;
    if (!drag.active) return;
    const dx = event.clientX - drag.startX;
    const activeWidth = event.currentTarget.querySelector<HTMLElement>("[data-active-slide]")?.offsetWidth ?? 0;
    const threshold = Math.min(SWIPE_MAX_PX, activeWidth * SWIPE_RATIO || SWIPE_MAX_PX);
    setDragging(false);
    setDragX(0);
    if (Math.abs(dx) > threshold) {
      go(dx < 0 ? 1 : -1);
    } else {
      setAnimate(true); // 距离不够，平滑弹回当前视频
    }
  }

  function handleKeyDown(event: ReactKeyboardEvent<HTMLDivElement>) {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      go(-1);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      go(1);
    }
  }

  return (
    <section className={styles.section} aria-labelledby={`${sectionId}-title`} data-product-videos data-active-video-group={group.key}>
      <div className={styles.head}>
        <h2 id={`${sectionId}-title`}>{title}</h2>
        {visibleGroups.length > 1 ? (
          <div className={styles.tabs} role="tablist" aria-label={title}>
            {visibleGroups.map(item => (
              <button
                key={item.key}
                type="button"
                role="tab"
                id={`${sectionId}-${item.key}-tab`}
                aria-controls={`${sectionId}-panel`}
                aria-selected={item.key === group.key}
                className={item.key === group.key ? styles.tabActive : styles.tab}
                onClick={() => switchGroup(item.key)}
              >
                {item.label}
              </button>
            ))}
          </div>
        ) : null}
      </div>

      <div
        id={`${sectionId}-panel`}
        role={visibleGroups.length > 1 ? "tabpanel" : loop ? "region" : undefined}
        aria-labelledby={visibleGroups.length > 1 ? `${sectionId}-${group.key}-tab` : undefined}
        className={styles.viewport}
        style={{ "--i": pos, "--drag": `${dragX}px` } as CSSProperties}
        data-draggable={loop || undefined}
        data-dragging={dragging || undefined}
        aria-label={loop ? `${group.label}. ${labels.carousel}` : undefined}
        tabIndex={loop ? 0 : undefined}
        onKeyDown={loop ? handleKeyDown : undefined}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerEnd}
        onPointerCancel={handlePointerEnd}
        onDragStart={event => event.preventDefault()}
      >
        {count === 0 ? <div className={styles.empty}>
          <p>{group.emptyText}</p>
          {group.emptyLink ? <a href={group.emptyLink.href}>{group.emptyLink.label}</a> : null}
        </div> : null}
        <div className={styles.track} data-static={animate && !dragging ? undefined : true}>
          {slides.map((video, slideIndex) => {
            const active = slideIndex === pos;
            const playing = active && playingPos === pos;
            return (
              <div
                key={`${Math.floor(slideIndex / Math.max(count, 1))}-${video.id}`}
                className={active ? styles.slideActive : styles.slide}
                data-active-slide={active || undefined}
                aria-hidden={!active}
              >
                {playing ? (
                  video.kind === "youtube" ? (
                    <iframe
                      src={withAutoplay(video.src)}
                      title={video.title}
                      allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                      allowFullScreen
                      referrerPolicy="strict-origin-when-cross-origin"
                    />
                  ) : (
                    <video src={video.src} poster={video.cover} controls autoPlay playsInline preload="metadata" />
                  )
                ) : (
                  <button
                    type="button"
                    className={styles.cover}
                    tabIndex={active ? 0 : -1}
                    aria-label={`${active ? labels.play : labels.select}: ${video.title}`}
                    onClick={() => {
                      if (active) { setPlayingPos(pos); onPlay?.(video); }
                      else go(slideIndex - pos);
                    }}
                  >
                    {video.cover ? <img src={video.cover} alt="" loading="lazy" decoding="async" draggable={false} /> : null}
                    {active ? <span className={styles.play} aria-hidden="true" /> : null}
                    <span className={styles.caption}>{video.title}</span>
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
      {loop ? <div className={styles.navigation}>
        <button type="button" aria-label={labels.previous} onClick={() => go(-1)}>‹</button>
        <span aria-live="polite" aria-atomic="true">{((pos % count) + count) % count + 1} / {count}</span>
        <button type="button" aria-label={labels.next} onClick={() => go(1)}>›</button>
      </div> : null}
    </section>
  );
}
