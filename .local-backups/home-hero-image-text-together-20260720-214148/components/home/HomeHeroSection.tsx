"use client";

﻿
import { useEffect, useRef, useState, type CSSProperties } from "react";
// 杩欐槸鍏充簬 components/home/HomeHeroSection.tsx 鐨勬枃浠讹細鐢ㄤ簬绠＄悊棣栭〉绗竴灞?Hero 棣栧睆鍐呭
// 杩欎釜鏂囦欢鐨勪綔鐢細鎶婇椤甸灞忎粠 HomePageContent.tsx 涓媶鍑烘潵锛屾柟渚垮悗缁淮鎶?

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

  const productsHref = locale === "zh-CN" ? "/products" : `/${locale}/products`;
  const contactHref = locale === "zh-CN" ? "/contact" : `/${locale}/contact`;

  
  /* HOME_DESKTOP_SCROLL_HERO_COMPONENT_START */
  const scrollShellRef =
    useRef<HTMLDivElement>(null);

  const [
    desktopHeroPhase,
    setDesktopHeroPhase,
  ] = useState<0 | 1 | 2>(0);

  const desktopHeroPhaseRef =
    useRef<0 | 1 | 2>(0);

  const desktopHeroTimerRef =
    useRef<number | null>(null);

  useEffect(() => {
    const desktopMedia =
      window.matchMedia(
        "(min-width: 1001px)"
      );

    function clearPhaseTimer() {
      if (
        desktopHeroTimerRef.current ===
        null
      ) {
        return;
      }

      window.clearTimeout(
        desktopHeroTimerRef.current
      );

      desktopHeroTimerRef.current =
        null;
    }

    function setPhase(
      phase: 0 | 1 | 2
    ) {
      desktopHeroPhaseRef.current =
        phase;

      setDesktopHeroPhase(
        phase
      );
    }

    function scheduleStaticImage() {
      clearPhaseTimer();

      desktopHeroTimerRef.current =
        window.setTimeout(() => {
          if (
            desktopHeroPhaseRef.current ===
            1
          ) {
            setPhase(2);
          }

          desktopHeroTimerRef.current =
            null;
        }, 900);
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
       * 只在首屏已经完整回到顶部时接管动画状态。
       * 从第二屏向上滚动时先允许浏览器正常返回首屏，
       * 不会在半路拦住滚动。
       */
      const heroAtTop =
        Math.abs(rect.top) <= 5 &&
        rect.bottom >=
          window.innerHeight * 0.9;

      if (!heroAtTop) {
        return;
      }

      const currentPhase =
        desktopHeroPhaseRef.current;

      /*
       * 向下滚动：
       * 0 -> 1，并自动在 0.9 秒后进入 2。
       * 1 状态期间继续锁住惯性滚动。
       * 2 状态允许正常进入第二屏。
       */
      if (event.deltaY > 0) {
        if (currentPhase === 0) {
          event.preventDefault();

          setPhase(1);
          scheduleStaticImage();
          return;
        }

        if (currentPhase === 1) {
          event.preventDefault();
          return;
        }

        return;
      }

      /*
       * 向上滚动：
       * 2 -> 1
       * 1 -> 0
       * 实现完整反向切换。
       */
      if (event.deltaY < 0) {
        if (currentPhase === 2) {
          event.preventDefault();

          clearPhaseTimer();
          setPhase(1);
          return;
        }

        if (currentPhase === 1) {
          event.preventDefault();

          clearPhaseTimer();
          setPhase(0);
        }
      }
    }

    function handleMediaChange() {
      if (
        desktopMedia.matches
      ) {
        return;
      }

      clearPhaseTimer();
      setPhase(0);
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

      clearPhaseTimer();
    };
  }, []);

  /*
   * 第 1、2 阶段都保留网页文字。
   * 静态图出现后不再把标题隐藏。
   */
  const showDesktopHeroContent =
    desktopHeroPhase >= 1;

  const showDesktopStaticImage =
    desktopHeroPhase === 2;

  const heroStyle = {
    "--home-hero-title-opacity":
      showDesktopHeroContent
        ? "1"
        : "0",

    "--home-hero-subtitle-opacity":
      showDesktopHeroContent
        ? "1"
        : "0",

    "--home-hero-actions-opacity":
      showDesktopHeroContent
        ? "1"
        : "0",

    "--home-hero-static-opacity":
      showDesktopStaticImage
        ? "1"
        : "0",

    "--home-hero-video-opacity":
      showDesktopStaticImage
        ? "0"
        : "1",

    "--home-hero-overlay-opacity":
      desktopHeroPhase === 0
        ? "0.08"
        : desktopHeroPhase === 1
          ? "0.56"
          : "0.42",

    "--home-hero-video-scale":
      "1",

    "--home-hero-title-shift":
      showDesktopHeroContent
        ? "0px"
        : "28px",

    "--home-hero-subtitle-shift":
      showDesktopHeroContent
        ? "0px"
        : "24px",

    "--home-hero-actions-shift":
      showDesktopHeroContent
        ? "0px"
        : "20px",

    "--home-hero-content-pointer-events":
      showDesktopHeroContent
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
        data-desktop-hero-phase={
          desktopHeroPhase
        }>
      <video
        className="home-hero-video"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
        tabIndex={-1}
        disablePictureInPicture
      >
        <source
          src="/images/home/home-banner-desktop.mp4?v=20260613"
          type="video/mp4"
        />
      </video>

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
        <h1 className="home-hero-title">
          {homeText.heroTitleLine1}

          <br />

          {homeText.heroTitleLine2}
        </h1>

        <p className="home-hero-subtitle">
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
