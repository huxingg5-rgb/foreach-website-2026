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

    function setPhase(
      phase: 0 | 1 | 2
    ) {
      desktopHeroPhaseRef.current =
        phase;

      setDesktopHeroPhase(
        phase
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

      const heroIsActive =
        rect.top <= 4 &&
        rect.bottom >=
          window.innerHeight * 0.72;

      if (!heroIsActive) {
        return;
      }

      /*
       * 动画播放期间继续锁住滚轮，
       * 避免触控板惯性直接把页面带到第二屏。
       */
      if (
        desktopHeroPhaseRef.current ===
        1
      ) {
        event.preventDefault();
        return;
      }

      /*
       * 只响应第一次向下滚动。
       */
      if (
        desktopHeroPhaseRef.current !==
          0 ||
        event.deltaY <= 0
      ) {
        return;
      }

      event.preventDefault();

      /*
       * 第一阶段：
       * 立即显示网页字幕。
       */
      setPhase(1);

      if (
        desktopHeroTimerRef.current !==
        null
      ) {
        window.clearTimeout(
          desktopHeroTimerRef.current
        );
      }

      /*
       * 第二阶段：
       * 1.2 秒后自动切换静态图，
       * 并隐藏网页字幕，避免与图片内文字重叠。
       */
      desktopHeroTimerRef.current =
        window.setTimeout(() => {
          setPhase(2);
          desktopHeroTimerRef.current =
            null;
        }, 1200);
    }

    function handleMediaChange() {
      if (
        !desktopMedia.matches
      ) {
        if (
          desktopHeroTimerRef.current !==
          null
        ) {
          window.clearTimeout(
            desktopHeroTimerRef.current
          );

          desktopHeroTimerRef.current =
            null;
        }

        setPhase(0);
      }
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

      if (
        desktopHeroTimerRef.current !==
        null
      ) {
        window.clearTimeout(
          desktopHeroTimerRef.current
        );
      }
    };
  }, []);

  const showDesktopHeroContent =
    desktopHeroPhase === 1;

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
      desktopHeroPhase === 1
        ? "0.56"
        : desktopHeroPhase === 2
          ? "0.02"
          : "0.08",

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
