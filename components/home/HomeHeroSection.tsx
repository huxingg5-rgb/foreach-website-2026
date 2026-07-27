"use client";

﻿
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";
// 杩欐槸鍏充簬 components/home/HomeHeroSection.tsx 鐨勬枃浠讹細鐢ㄤ簬绠＄悊棣栭〉绗竴灞?Hero 棣栧睆鍐呭
// 杩欎釜鏂囦欢鐨勪綔鐢細鎶婇椤甸灞忎粠 HomePageContent.tsx 涓媶鍑烘潵锛屾柟渚垮悗缁淮鎶?

import Image from "next/image";
import Link from "next/link";

import {
  getLocaleAnchorPath,
  homeI18n,
  type LocaleCode,
} from "@/lib/i18n";

type HomeHeroSectionProps = {
  locale: LocaleCode;
};

export default function HomeHeroSection({
  locale,
}: HomeHeroSectionProps) {
  const homeText = homeI18n[locale];
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
  const [videoVisible, setVideoVisible] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
  const posterRef = useRef<HTMLImageElement>(null);
  const videoLoadScheduledRef = useRef(false);

  const productsHref = locale === "zh-CN" ? "/products" : `/${locale}/products`;
  const contactHref = locale === "zh-CN" ? "/contact" : `/${locale}/contact`;

  
  /* HOME_DESKTOP_SCROLL_HERO_COMPONENT_START */
  const scrollShellRef =
    useRef<HTMLDivElement>(null);

  const [
    desktopHeroActive,
    setDesktopHeroActive,
  ] = useState(false);

  const desktopHeroActiveRef =
    useRef(false);

  useEffect(() => {
    const desktopMedia =
      window.matchMedia(
        "(min-width: 1001px)"
      );

    function setActive(
      active: boolean
    ) {
      desktopHeroActiveRef.current =
        active;

      setDesktopHeroActive(
        active
      );
    }

    function handleDesktopWheel(
      event: WheelEvent
    ) {
      if (
        !desktopMedia.matches
      ) {
        return;
      }

      const shell =
        scrollShellRef.current;

      if (!shell) {
        return;
      }

      const rect =
        shell.getBoundingClientRect();

      /*
       * 只在首屏已经回到顶部时，
       * 接管首屏动画状态。
       */
      const heroAtTop =
        Math.abs(rect.top) <= 5 &&
        rect.bottom >=
          window.innerHeight * 0.9;

      if (!heroAtTop) {
        return;
      }

      /*
       * 第一次向下滚轮：
       * 静态图和网页文字同时出现。
       */
      if (
        event.deltaY > 0 &&
        !desktopHeroActiveRef.current
      ) {
        event.preventDefault();
        setActive(true);
        return;
      }

      /*
       * 已经显示静态图和文字时，
       * 再向下滚动则正常进入第二屏。
       */
      if (
        event.deltaY > 0 &&
        desktopHeroActiveRef.current
      ) {
        return;
      }

      /*
       * 在首屏向上滚动：
       * 静态图和文字同时消失，
       * 返回视频无文字状态。
       */
      if (
        event.deltaY < 0 &&
        desktopHeroActiveRef.current
      ) {
        event.preventDefault();
        setActive(false);
      }
    }

    function handleMediaChange() {
      if (
        desktopMedia.matches
      ) {
        return;
      }

      setActive(false);
    }

    window.addEventListener(
      "wheel",
      handleDesktopWheel,
      {
        passive: false,
      }
    );

    desktopMedia.addEventListener(
      "change",
      handleMediaChange
    );

    return () => {
      window.removeEventListener(
        "wheel",
        handleDesktopWheel
      );

      desktopMedia.removeEventListener(
        "change",
        handleMediaChange
      );
    };
  }, []);

  const handlePosterLoad = useCallback(() => {
    if (videoLoadScheduledRef.current) {
      return;
    }

    videoLoadScheduledRef.current = true;

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setShouldLoadVideo(true);
      });
    });
  }, []);

  useEffect(() => {
    const poster = posterRef.current;

    if (
      poster?.complete &&
      poster.naturalWidth > 0
    ) {
      handlePosterLoad();
    }
  }, [handlePosterLoad]);

  const handleVideoPlaying = (
    event: React.SyntheticEvent<HTMLVideoElement>
  ) => {
    const video = event.currentTarget;
    const revealVideo = () => {
      setVideoVisible(true);
    };

    if ("requestVideoFrameCallback" in video) {
      video.requestVideoFrameCallback(() => {
        revealVideo();
      });
      return;
    }

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        revealVideo();
      });
    });
  };

  const handleVideoError = () => {
    setVideoVisible(false);
    setVideoFailed(true);
  };

  const heroStyle = {
    "--home-hero-title-opacity":
      desktopHeroActive
        ? "1"
        : "0",

    "--home-hero-subtitle-opacity":
      desktopHeroActive
        ? "1"
        : "0",

    "--home-hero-actions-opacity":
      desktopHeroActive
        ? "1"
        : "0",

    "--home-hero-static-opacity":
      desktopHeroActive
        ? "1"
        : "0",

    "--home-hero-video-opacity":
      desktopHeroActive ||
      !videoVisible ||
      videoFailed
        ? "0"
        : "1",

    "--home-hero-overlay-opacity":
      desktopHeroActive
        ? "0.42"
        : "0.08",

    "--home-hero-video-scale":
      "1",

    "--home-hero-title-shift":
      desktopHeroActive
        ? "0px"
        : "24px",

    "--home-hero-subtitle-shift":
      desktopHeroActive
        ? "0px"
        : "24px",

    "--home-hero-actions-shift":
      desktopHeroActive
        ? "0px"
        : "24px",

    "--home-hero-content-pointer-events":
      desktopHeroActive
        ? "auto"
        : "none",
  } as CSSProperties;
  /* HOME_DESKTOP_SCROLL_HERO_COMPONENT_END */

return (
    <div ref={scrollShellRef} className="home-hero-scroll-shell">
      <section
      className="home-hero"
      id="home"
    
        style={heroStyle}
        data-desktop-hero-active={
          desktopHeroActive
            ? "true"
            : "false"
        }>
      <Image
        ref={posterRef}
        className={
          videoFailed
            ? "home-hero-poster home-hero-poster-restored"
            : videoVisible
              ? "home-hero-poster home-hero-poster-hidden"
              : "home-hero-poster"
        }
        src="/images/home/hero/foreach-company-intro-main.webp"
        alt=""
        fill
        sizes="100vw"
        loading="eager"
        fetchPriority="high"
        onLoad={handlePosterLoad}
        aria-hidden="true"
      />

      {shouldLoadVideo && !videoFailed && (
        <video
          className="home-hero-video"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onPlaying={handleVideoPlaying}
          onError={handleVideoError}
          aria-hidden="true"
          tabIndex={-1}
          disablePictureInPicture
        >
          <source
            src="/images/home/home-banner-desktop.mp4?v=20260613"
            type="video/mp4"
          />
        </video>
      )}

        <img
          className="home-hero-static-image"
          src="/images/home/eas-home-scroll-static.webp"
          alt=""
          aria-hidden="true"
          loading="eager"
          decoding="async"
        />

      <div
        className="home-hero-overlay"
        aria-hidden="true"
      />

      <div className="home-hero-inner">
        <h1 className="home-hero-title" data-home-hero-title="true">
          {homeText.heroTitleLine1}

          <br />

          {homeText.heroTitleLine2}
        </h1>

        <p className="home-hero-subtitle" data-home-hero-subtitle="true">
          {homeText.heroSubtitle}
        </p>

        <div className="home-hero-actions">
          <Link
            href={productsHref}
            className="home-hero-btn home-hero-btn-primary"
          >
            {homeText.productButton}
          </Link>

          <Link
            href={contactHref}
            className="home-hero-btn home-hero-btn-secondary"
          >
            {homeText.contactButton}
          </Link>
        </div>
      </div>
    </section>
    </div>
  );
}
